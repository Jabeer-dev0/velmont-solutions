export const serviceSlugs = [
  'call-handling',
  'social-media-marketing',
  'sms-email-marketing',
  'graphic-designing',
  'menu-optimization',
  'third-party-platforms',
  'customer-database-growth',
  'reviews-monitoring',
  'weekly-performance-insights',
  'seo-optimization',
];

export const staticPaths = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  ...serviceSlugs.map((slug) => ({
    path: `/services/${slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  { path: '/work', priority: '0.75', changefreq: 'monthly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
];

/** @returns {string[]} */
export function getAllPrerenderRoutes() {
  return staticPaths.map(({ path }) => path);
}

export function getBaseUrl() {
  return (
    process.env.SITE_URL ||
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    'https://velmontsolutionsgroup.com'
  ).replace(/\/$/, '');
}

/** @param {string} route */
export function routeToDistFile(distDir, route) {
  if (route === '/') return `${distDir}/index.html`;
  return `${distDir}${route}/index.html`;
}
