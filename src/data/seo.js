import { site } from './site';
import { faqs } from './faqs';
import { pricingFaqs } from './pricing';
import { contactFaqs } from './contact';
import { getServiceDetail } from './serviceDetails';
import {
  buildPageSchema,
  buildServicePageSchema,
} from './schema';

export const OG_IMAGE = `${site.url}/og-image.svg`;
export const PRIMARY_CTA = 'Book a free discovery call';

const STATIC = {
  home: {
    title: 'Restaurant Growth Partner UK | Velmont Solutions',
    description:
      'One UK partner for restaurant marketing, call handling, SEO and weekly reporting. Fuller tables, steadier revenue. Book a free discovery call.',
    path: '/',
    faqs,
  },
  services: {
    title: 'Restaurant Growth Services | Velmont Solutions',
    description:
      'Explore Velmont services for UK restaurants: social, SEO, call handling, reviews, automation and weekly optimization to grow bookings and revenue.',
    path: '/services',
    faqs,
  },
  about: {
    title: 'About Velmont Solutions | Restaurant Growth Partner',
    description:
      'How Velmont helps UK restaurants replace fragmented vendors with one growth system: our story, values and the team structure behind measurable results.',
    path: '/about',
  },
  work: {
    title: 'Restaurant Case Studies & Results | Velmont Solutions',
    description:
      'See how UK restaurants grew covers, bookings, delivery AOV, retention and Google ratings with Velmont — one partner, weekly reporting.',
    path: '/work',
  },
  pricing: {
    title: 'Restaurant Marketing Pricing from £299/mo | Velmont',
    description:
      'Transparent monthly retainers for UK restaurants: Launch from £299, Growth £499 and Scale £699 per month, with clear inclusions, comparison table and free discovery call.',
    path: '/pricing',
    faqs: pricingFaqs,
  },
  contact: {
    title: 'Book a Free Discovery Call | Velmont Solutions',
    description:
      'Contact Velmont Solutions via form, phone, WhatsApp and email. UK-based team, replies within one business day. Free discovery call, no obligation.',
    path: '/contact',
    faqs: contactFaqs,
  },
  privacy: {
    title: 'Privacy Policy | Velmont Solutions',
    description:
      'How Velmont Solutions handles your personal data: what we collect, why we use it, your UK GDPR rights, cookies and how to contact us or the ICO.',
    path: '/privacy',
  },
};

function buildServiceSeo(service) {
  const path = `/services/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    path,
    schema: () => buildServicePageSchema(service),
  };
}

function buildStaticSeo(key) {
  const entry = STATIC[key];
  return {
    ...entry,
    schema: () =>
      buildPageSchema({
        path: entry.path,
        title: entry.title,
        description: entry.description,
        faqs: entry.faqs,
      }),
  };
}

/** @param {string} pathname */
export function getSeoForPath(pathname) {
  if (pathname === '/') return buildStaticSeo('home');
  if (pathname === '/services') return buildStaticSeo('services');
  if (pathname === '/about') return buildStaticSeo('about');
  if (pathname === '/work') return buildStaticSeo('work');
  if (pathname === '/pricing') return buildStaticSeo('pricing');
  if (pathname === '/contact') return buildStaticSeo('contact');
  if (pathname === '/privacy') return buildStaticSeo('privacy');

  const match = pathname.match(/^\/services\/([^/]+)$/);
  if (match) {
    const service = getServiceDetail(match[1]);
    if (service) return buildServiceSeo(service);
  }

  return buildStaticSeo('home');
}

export function absoluteUrl(path) {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}
