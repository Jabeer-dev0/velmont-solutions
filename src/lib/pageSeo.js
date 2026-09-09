import { absoluteUrl, OG_IMAGE } from '../data/seo';

function upsertMeta(selector, createAttrs, content) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    Object.entries(createAttrs).forEach(([key, value]) => el.setAttribute(key, value));
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** @param {{ title: string, description: string, path: string }} seo */
export function applyPageSeo({ title, description, path }) {
  const url = absoluteUrl(path);

  document.title = title;

  upsertMeta('meta[name="description"]', { name: 'description' }, description);
  upsertLink('canonical', url);

  upsertMeta('meta[property="og:type"]', { property: 'og:type' }, 'website');
  upsertMeta('meta[property="og:title"]', { property: 'og:title' }, title);
  upsertMeta('meta[property="og:description"]', { property: 'og:description' }, description);
  upsertMeta('meta[property="og:url"]', { property: 'og:url' }, url);
  upsertMeta('meta[property="og:image"]', { property: 'og:image' }, OG_IMAGE);
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, 'Velmont Solutions');

  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, title);
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description);
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, OG_IMAGE);
}
