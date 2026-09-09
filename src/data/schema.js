import { site } from './site';
import { absoluteUrl } from './seo';

function localBusiness() {
  return {
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    image: `${site.url}/og-image.svg`,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.addressStructured.streetAddress,
      addressLocality: site.addressStructured.addressLocality,
      postalCode: site.addressStructured.postalCode,
      addressCountry: site.addressStructured.addressCountry,
    },
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Place', name: 'Europe' },
    ],
    priceRange: '££',
    sameAs: [site.social.instagram, site.social.facebook, site.social.threads],
  };
}

function webPage({ path, name, description }) {
  return {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { '@id': `${site.url}/#organization` },
    inLanguage: 'en-GB',
  };
}

function faqPage(faqs, path) {
  if (!faqs?.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

function breadcrumb(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** @param {{ path: string, title: string, description: string, faqs?: { question: string, answer: string }[] }} config */
export function buildPageSchema({ path, title, description, faqs }) {
  const graph = [
    localBusiness(),
    webPage({ path, name: title, description }),
  ];
  const faq = faqPage(faqs, path);
  if (faq) graph.push(faq);
  return { '@context': 'https://schema.org', '@graph': graph };
}

/** @param {import('./serviceDetails').getServiceDetail extends (slug: string) => infer R ? R : never} service */
export function buildServicePageSchema(service) {
  const path = `/services/${service.slug}`;
  const graph = [
    localBusiness(),
    webPage({
      path,
      name: service.metaTitle,
      description: service.metaDescription,
    }),
    {
      '@type': 'Service',
      '@id': `${absoluteUrl(path)}#service`,
      name: service.name,
      description: service.metaDescription,
      provider: { '@id': `${site.url}/#organization` },
      areaServed: { '@type': 'Country', name: 'United Kingdom' },
      serviceType: service.name,
      url: absoluteUrl(path),
    },
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: service.name, path },
    ]),
  ];
  return { '@context': 'https://schema.org', '@graph': graph };
}
