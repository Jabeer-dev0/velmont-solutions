import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { getAllPrerenderRoutes, routeToDistFile } from './routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const distDir = resolve(rootDir, 'dist');
const PORT = 4173;
const PREVIEW_URL = `http://127.0.0.1:${PORT}`;

const MIN_WORD_COUNT = 50;

function sleep(ms) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

async function launchBrowser() {
  const launchOptions = { headless: true };

  try {
    return await chromium.launch(launchOptions);
  } catch (error) {
    const executablePath = findChromiumExecutable();
    if (!executablePath) throw error;

    console.warn(`Using Chromium at ${executablePath}`);
    return chromium.launch({ ...launchOptions, executablePath });
  }
}

function findChromiumExecutable() {
  const roots = [
    process.env.PLAYWRIGHT_BROWSERS_PATH,
    join(homedir(), 'AppData', 'Local', 'ms-playwright'),
    join(rootDir, 'node_modules', 'playwright-core', '.local-browsers'),
  ].filter(Boolean);

  for (const root of roots) {
    if (!existsSync(root)) continue;

    for (const entry of readdirSync(root)) {
      if (!entry.startsWith('chromium-')) continue;

      const candidates = [
        join(root, entry, 'chrome-win64', 'chrome.exe'),
        join(root, entry, 'chrome-linux', 'chrome'),
        join(root, entry, 'chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium'),
      ];

      for (const candidate of candidates) {
        if (existsSync(candidate)) return candidate;
      }
    }
  }

  return null;
}

async function waitForServer(timeoutMs = 90000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(PREVIEW_URL);
      if (response.ok) return;
    } catch {
      // preview not ready yet
    }
    await sleep(500);
  }
  throw new Error(`Preview server did not start at ${PREVIEW_URL}`);
}

function startPreviewServer() {
  const viteBin = resolve(rootDir, 'node_modules/vite/bin/vite.js');
  const child = spawn(process.execPath, [viteBin, 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'], {
    cwd: rootDir,
    stdio: 'pipe',
    env: { ...process.env, BROWSER: 'none' },
  });

  child.stdout?.on('data', (chunk) => {
    process.stderr.write(chunk);
  });

  child.stderr?.on('data', (chunk) => {
    process.stderr.write(chunk);
  });

  child.on('error', (error) => {
    console.error('Preview server failed to start:', error);
  });

  return child;
}

async function stopPreviewServer(child) {
  if (!child || child.killed) return;

  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(child.pid), '/f', '/t'], { shell: true });
  } else {
    child.kill('SIGTERM');
  }

  await sleep(1000);
}

function canonicalMatchesRoute(href, route) {
  if (!href) return false;
  try {
    const url = new URL(href);
    const path = url.pathname.replace(/\/$/, '') || '/';
    const expected = route.replace(/\/$/, '') || '/';
    return path === expected;
  } catch {
    return false;
  }
}

async function prerenderRoute(page, route) {
  const targetUrl = route === '/' ? `${PREVIEW_URL}/` : `${PREVIEW_URL}${route}`;

  await page.goto(targetUrl, {
    waitUntil: 'networkidle',
    timeout: 120000,
  });

  await page.waitForSelector('main#main-content', { timeout: 45000 });
  await page.waitForSelector('main#main-content h1, main#main-content h2', {
    timeout: 45000,
  });
  await page.waitForSelector('#velmont-jsonld', { timeout: 45000, state: 'attached' });

  await page.waitForFunction(
    (expectedRoute) => {
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      if (!canonical) return false;
      try {
        const path = new URL(canonical).pathname.replace(/\/$/, '') || '/';
        const expected = expectedRoute.replace(/\/$/, '') || '/';
        return path === expected;
      } catch {
        return false;
      }
    },
    route,
    { timeout: 45000 },
  );

  const html = await page.content();
  const wordCount = await page.evaluate(() => {
    const main = document.querySelector('main#main-content');
    if (!main) return 0;
    return main.innerText.split(/\s+/).filter(Boolean).length;
  });

  const title = await page.title();
  const canonical = await page.evaluate(
    () => document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
  );

  if (!canonicalMatchesRoute(canonical, route)) {
    throw new Error(`Canonical mismatch for ${route}: ${canonical}`);
  }

  if (wordCount < MIN_WORD_COUNT) {
    throw new Error(`Thin content for ${route}: ${wordCount} words (min ${MIN_WORD_COUNT})`);
  }

  return { html, wordCount, title };
}

function writeRouteHtml(route, html) {
  const outputPath = routeToDistFile(distDir, route);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html, 'utf8');
  return outputPath;
}

async function main() {
  if (!existsSync(distDir)) {
    console.error('dist/ not found. Run vite build first.');
    process.exit(1);
  }

  const routes = getAllPrerenderRoutes();
  let preview = null;
  let browser = null;

  try {
    preview = startPreviewServer();
    await waitForServer();

    browser = await launchBrowser();
    const context = await browser.newContext({
      reducedMotion: 'reduce',
    });

    await context.addInitScript(() => {
      window.__PRERENDER__ = true;
    });

    const page = await context.newPage();
    const results = [];

    for (const route of routes) {
      process.stdout.write(`Prerendering ${route} ... `);
      const { html, wordCount, title } = await prerenderRoute(page, route);
      const outputPath = writeRouteHtml(route, html);
      results.push({ route, wordCount, title, outputPath });
      process.stdout.write(`ok (${wordCount} words)\n`);
    }

    console.log('\nPre-render complete:');
    for (const { route, wordCount, title } of results) {
      console.log(`  ${route} — ${wordCount} words — "${title}"`);
    }
  } finally {
    if (browser) await browser.close();
    if (preview) await stopPreviewServer(preview);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
