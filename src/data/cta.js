export const homeCta = {
  title: 'Ready to grow your restaurant',
  titleEm: 'with one partner?',
  lead:
    'Book a free discovery call. We review your channels, flag quick wins, and recommend the fastest path to fuller tables.',
  trust: '50+ UK restaurants · 98% satisfaction · 24h support response',
};

export const workCta = {
  title: 'Want results like these',
  titleEm: 'in your restaurant?',
  lead:
    'Book a free discovery call. We review your channels, point to relevant case patterns and map a practical 90-day plan.',
  trust: '50+ UK restaurants · Weekly reporting · No obligation',
};

export const aboutCta = {
  title: 'Ready to replace the patchwork',
  titleEm: 'with one growth partner?',
  lead:
    'Book a free discovery call. We’ll audit your channels and map a practical 90-day plan.',
  trust: '50+ UK restaurants · 98% satisfaction · 24h support response',
};

export const servicesCta = {
  title: 'Need help choosing',
  titleEm: 'the right services?',
  lead:
    'Book a free discovery call. We audit your restaurant, map the right mix of channels, and quote against our Launch, Growth and Scale plans.',
  trust: '10 services · One partner · Clear weekly reporting',
};

/** @param {{ name: string }} service */
export function serviceDetailCta(service) {
  return {
    title: 'Add',
    titleEm: `${service.name.toLowerCase()} to your stack`,
    lead:
      'Book a free discovery call. We map the right mix of services for your venue and quote against our Launch, Growth and Scale plans.',
    trust: 'UK restaurants · One partner · Weekly clarity',
  };
}
