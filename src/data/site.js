export const site = {
  name: 'Velmont Solutions',
  legalName: 'Velmont Solutions Group',
  tagline: 'Elevating Businesses. Delivering Results.',
  description:
    'Velmont Solutions is a UK restaurant growth partner for marketing, customer support and automation built to fill tables and protect revenue.',
  url: import.meta.env.VITE_SITE_URL,
  email: 'info@velmontsolutionsgroup.com',
  phone: '07342 173787',
  phoneHref: 'tel:+447342173787',
  whatsapp: '+44 7342 173787',
  whatsappHref: 'https://wa.me/447342173787',
  address: '1A Gossops Parade, Crawley, RH11 8HH',
  addressStructured: {
    streetAddress: '1A Gossops Parade',
    addressLocality: 'Crawley',
    postalCode: 'RH11 8HH',
    addressCountry: 'GB',
  },
  locationLabel: 'Crawley, UK',
  coordinates: '51.109° N, 0.188° W',
  social: {
    instagram: 'https://www.instagram.com/velmontsolutions?igsh=aWI2bDRzaGJzaXRt',
    facebook: 'https://www.facebook.com/share/18DmfApvE5/',
    threads: 'https://www.threads.com/@velmontsolutions',
    handle: '@velmontsolutions',
  },
  stats: [
    { value: '50+', label: 'UK restaurants supported' },
    { value: '98%', label: 'Client satisfaction' },
    { value: '24h', label: 'Support response' },
    { value: 'UK', label: 'Based in the UK, globally available' },
  ],
  hero: {
    badge: 'Avg. +32% online orders',
    statValue: '24h',
    statLabel: 'Support response time',
    trustLine: 'Trusted by 50+ UK restaurants, 98% client satisfaction',
  },
  showcase: {
    trustLine: 'Trusted by 50+ independent restaurants across the UK',
  },
  images: {
    logo: '/images/logo-light-white.png',
    logoDark: '/images/logo-dark.png',
    logoLight: '/images/logo-light.png',
    logoLightWhite: '/images/logo-light-white.png',
    logoMark: '/images/logo-mark.png',
    servicesFeature: '/images/social-bento.jpg',
    showcaseBg: '/images/showcase-bg.svg',
  },
};

export const processSteps = [
  {
    num: '01',
    phase: 'Kickoff',
    title: 'Discovery call',
    description: 'We learn your restaurant, your goals and where you are today.',
    icon: 'PhoneCall',
  },
  {
    num: '02',
    phase: 'Audit',
    title: 'Growth audit',
    description: 'We review your platforms, reviews, menus and marketing for quick wins.',
    icon: 'SearchCheck',
  },
  {
    num: '03',
    phase: 'Execution',
    title: 'Build & launch',
    description: 'We set up the campaigns, automations and support that do the work.',
    icon: 'Rocket',
  },
  {
    num: '04',
    phase: 'Momentum',
    title: 'Optimize weekly',
    description: 'We report, refine and scale whatever is driving the most growth.',
    icon: 'LineChart',
    capstone: true,
  },
];
