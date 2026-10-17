/**
 * One-off verification for the scroll FX work (parallax, word reveal, tilt).
 * Run with the preview server up: node scripts/verify-fx.mjs
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:4173';
const out = { pass: [], fail: [] };
const check = (name, ok, detail = '') => (ok ? out.pass : out.fail).push(`${name}${detail ? ` — ${detail}` : ''}`);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(2400); // hero entrance

// --- 1. Hero scroll exit: content drifts up + fades, chart lags ---
await page.evaluate(() => window.scrollTo({ top: 430, behavior: 'instant' }));
await page.waitForTimeout(1300);
const hero = await page.evaluate(() => {
  const inner = document.querySelector('.v2-hero__inner');
  const chart = document.querySelector('.v2-hero__chart');
  return {
    innerOpacity: parseFloat(getComputedStyle(inner).opacity),
    innerY: new DOMMatrix(getComputedStyle(inner).transform).m42,
    chartY: new DOMMatrix(getComputedStyle(chart).transform).m42,
  };
});
check('hero fades on scroll', hero.innerOpacity < 0.85, `opacity=${hero.innerOpacity.toFixed(2)}`);
check('hero content drifts up', hero.innerY < -20, `y=${hero.innerY.toFixed(1)}`);
check('hero chart lags behind', hero.chartY > 2, `y=${hero.chartY.toFixed(1)}`);
await page.screenshot({ path: 'fx-1-hero-exit.jpeg', type: 'jpeg', quality: 72 });

// --- 2. Word-by-word heading reveal ---
await page.evaluate(() => document.querySelector('#services').scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(1600);
const words = await page.evaluate(() => {
  const spans = [...document.querySelectorAll('#services .v2-shead__title [data-word]')];
  return {
    total: spans.length,
    visible: spans.filter((s) => parseFloat(getComputedStyle(s).opacity) > 0.95).length,
    hiddenBefore: spans.some((s) => getComputedStyle(s).visibility === 'hidden'),
  };
});
check('word reveal completed', words.total > 0 && words.visible === words.total, `${words.visible}/${words.total}`);
await page.screenshot({ path: 'fx-2-bento.jpeg', type: 'jpeg', quality: 72 });

// --- 3. Parallax mosaic: columns drift in opposite directions ---
await page.evaluate(() => document.querySelector('.v2-pxl__grid').scrollIntoView({ behavior: 'instant', block: 'center' }));
await page.waitForTimeout(1400);
const driftA = await page.evaluate(() =>
  [...document.querySelectorAll('.v2-pxl__col')].map((c) => new DOMMatrix(getComputedStyle(c).transform).m42),
);
await page.evaluate(() => window.scrollBy({ top: 320, behavior: 'instant' }));
await page.waitForTimeout(1400);
const driftB = await page.evaluate(() =>
  [...document.querySelectorAll('.v2-pxl__col')].map((c) => new DOMMatrix(getComputedStyle(c).transform).m42),
);
const opposite = driftA.length >= 2
  && Math.sign(driftB[0] - driftA[0]) === -Math.sign(driftB[1] - driftA[1])
  && driftB[0] !== driftA[0];
check('columns drift opposite ways', opposite, `col0 ${driftA[0]?.toFixed(1)}→${driftB[0]?.toFixed(1)}, col1 ${driftA[1]?.toFixed(1)}→${driftB[1]?.toFixed(1)}`);
check('columns actually moved', Math.abs(driftA[0] - driftB[0]) > 20, `delta=${Math.abs(driftA[0] - driftB[0]).toFixed(1)}px`);
await page.screenshot({ path: 'fx-3-parallax.jpeg', type: 'jpeg', quality: 72 });

// --- 4. 3D tilt + glare on bento cards ---
const tilt = await page.evaluate(() => {
  const card = document.querySelector('.v2-bento__card[data-tilt]');
  const rect = card.getBoundingClientRect();
  const ev = new PointerEvent('pointermove', {
    clientX: rect.left + rect.width * 0.8,
    clientY: rect.top + rect.height * 0.2,
    bubbles: true,
  });
  card.dispatchEvent(ev);
  return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => {
    const cs = card.getAttribute('style') ?? '';
    resolve({ style: cs, tilting: card.classList.contains('is-tilting') });
  })));
});
check('tilt applies perspective transform', /perspective/.test(tilt.style), tilt.style.slice(0, 90));
check('tilt adds glare state', tilt.tilting === true);

// --- 5. 3D scroll stage: device starts tilted, rotates flat on scroll ---
// rotateX drives m23/m32 (-sin / sin); m.b (m12) is always 0 for pure rotateX.
await page.evaluate(() => document.querySelector('.v3-stage').scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(600);
const stageTilted = await page.evaluate(() => {
  const card = document.querySelector('[data-stage3d-card]');
  const m = new DOMMatrix(getComputedStyle(card).transform);
  return Math.round(Math.abs(m.m23) * 1000) / 1000; // |sin(rotateX)|
});
await page.evaluate(() => window.scrollBy({ top: 700, behavior: 'instant' }));
await page.waitForTimeout(1200);
const stageFlat = await page.evaluate(() => {
  const card = document.querySelector('[data-stage3d-card]');
  const m = new DOMMatrix(getComputedStyle(card).transform);
  return Math.round(Math.abs(m.m23) * 1000) / 1000;
});
check('3D stage starts tilted', stageTilted > 0.2, `sinX=${stageTilted}`);
check('3D stage rotates flat on scroll', stageFlat < stageTilted - 0.1, `sinX ${stageTilted}→${stageFlat}`);
await page.screenshot({ path: 'fx-4-stage3d.jpeg', type: 'jpeg', quality: 72 });

// --- 6. Work page title word reveal ---
await page.goto(`${BASE}/work`, { waitUntil: 'networkidle' });
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
const workHidden = await page.evaluate(() =>
  [...document.querySelectorAll('#wrk-grid-title [data-word]')].every((s) => parseFloat(getComputedStyle(s).opacity) < 0.5),
);
await page.evaluate(() => document.querySelector('#wrk-grid-title').scrollIntoView({ behavior: 'instant', block: 'center' }));
await page.waitForTimeout(1500);
const workShown = await page.evaluate(() =>
  [...document.querySelectorAll('#wrk-grid-title [data-word]')].every((s) => parseFloat(getComputedStyle(s).opacity) > 0.95),
);
check('work title hidden before view', workHidden === true);
check('work title revealed in view', workShown === true);

// --- 6. Mobile sanity: no errors, mosaic stacked to 2 cols ---
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
const mobileErrors = [];
mobile.on('pageerror', (err) => mobileErrors.push(String(err)));
await mobile.goto(BASE, { waitUntil: 'networkidle' });
await mobile.evaluate(() => document.querySelector('.v2-pxl__grid').scrollIntoView({ behavior: 'instant' }));
await mobile.waitForTimeout(1200);
const mobileCols = await mobile.evaluate(() => {
  const cols = [...document.querySelectorAll('.v2-pxl__col')];
  return { shown: cols.filter((c) => getComputedStyle(c).display !== 'none').length, total: cols.length };
});
check('mobile shows 2 mosaic columns', mobileCols.shown === 2, `${mobileCols.shown}/${mobileCols.total}`);
check('no mobile page errors', mobileErrors.length === 0, mobileErrors[0] ?? '');

check('no console errors (desktop)', consoleErrors.length === 0, consoleErrors[0] ?? '');

await browser.close();

console.log('\nPASS:');
out.pass.forEach((p) => console.log(`  ok  ${p}`));
console.log('\nFAIL:');
if (out.fail.length === 0) console.log('  (none)');
out.fail.forEach((f) => console.log(`  XX  ${f}`));
process.exit(out.fail.length ? 1 : 0);
