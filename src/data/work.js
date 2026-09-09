export const workHero = {
  eyebrow: 'Our work',
  title: 'Restaurant growth,',
  titleEm: 'measured in covers.',
};

export const workSections = {
  featured: {
    label: 'Featured outcome',
    title: 'One partner for social, reviews and reporting.',
    ctaPrimary: 'See the services behind this',
    ctaSecondary: 'Browse all outcomes',
  },
  grid: {
    label: 'Case studies',
    title: 'Every venue, different menu.',
    titleEm: 'Same honest reporting.',
    empty: 'No results in this category yet. Try another filter or view all outcomes.',
  },
};

export const workFilters = [
  { id: 'all', label: 'All results' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'operations', label: 'Operations' },
  { id: 'reputation', label: 'Reputation' },
];

/** @typedef {'marketing' | 'operations' | 'reputation'} WorkCategory */

export const workCases = [
  {
    id: 'copper-room-group',
    featured: true,
    name: 'Independent restaurant group',
    location: 'London & Surrey',
    category: 'marketing',
    timeframe: '16 weeks',
    headline: '+38% seated covers',
    summary:
      'We merged social, review management and weekly reporting into one rhythm, without adding marketing headcount.',
    quote:
      'We went from scattered marketing to one system that fills tables. Bookings picked up within weeks, and we finally have one team looking after the whole picture.',
    attribution: 'James R. · Owner',
    image: '/images/work/featured-restaurant-group.jpg',
    imageAlt: 'Independent restaurant dining room with warm lighting and set tables, London evening service',
    services: ['Social media marketing', 'Reviews monitoring', 'Weekly performance insights'],
    serviceSlugs: [
      'social-media-marketing',
      'reviews-monitoring',
      'weekly-performance-insights',
    ],
    metrics: [
      { value: '+38%', label: 'Seated covers' },
      { value: '2.1×', label: 'Social engagement' },
      { value: '4.8', label: 'Google rating' },
    ],
  },
  {
    id: 'market-street-bistro',
    featured: false,
    name: 'Town-centre bistro',
    location: 'Manchester',
    category: 'marketing',
    timeframe: '12 weeks',
    headline: '+52% Maps direction requests',
    summary:
      'Local SEO, Google Business Profile updates and lunch-time call cover brought high-intent diners nearby and cut missed calls by a third.',
    image: '/images/social/post-chefs-table.jpg',
    imageAlt: 'Fine dining table setting',
    services: ['SEO optimization', 'Call handling'],
    serviceSlugs: ['seo-optimization', 'call-handling'],
    metrics: [
      { value: '+52%', label: 'Direction requests' },
      { value: '-34%', label: 'Missed calls' },
    ],
  },
  {
    id: 'firestone-pizza',
    featured: false,
    name: 'Multi-site pizza group',
    location: 'Leeds & Bradford',
    category: 'operations',
    timeframe: '10 weeks',
    headline: '+28% delivery AOV',
    summary:
      'Menu tweaks, aligned promos and consistent Deliveroo and Uber Eats listings raised average order value by 28% without discounting core dishes.',
    image: '/images/design/menu-spread.jpg',
    imageAlt: 'Restaurant menu layout design',
    services: ['Menu optimization', 'Third-party platforms'],
    serviceSlugs: ['menu-optimization', 'third-party-platforms'],
    metrics: [
      { value: '+28%', label: 'Delivery AOV' },
      { value: '+19%', label: 'Platform orders' },
    ],
  },
  {
    id: 'riverside-brasserie',
    featured: false,
    name: 'City-centre brasserie',
    location: 'Bristol',
    category: 'operations',
    timeframe: '9 weeks',
    headline: '+22% phone bookings',
    summary:
      'Peak-time call scripts, overflow routing and booking handoffs cut missed calls by 41% and brought back lunch covers without extra front-of-house staff.',
    image: '/images/social/post-kitchen.jpg',
    imageAlt: 'Restaurant kitchen during service',
    services: ['Call handling', 'Weekly performance insights'],
    serviceSlugs: ['call-handling', 'weekly-performance-insights'],
    metrics: [
      { value: '+22%', label: 'Phone bookings' },
      { value: '-41%', label: 'Missed calls' },
    ],
  },
  {
    id: 'north-lane-kitchen',
    featured: false,
    name: 'Fine-dining kitchen',
    location: 'Edinburgh',
    category: 'marketing',
    timeframe: '8 weeks',
    headline: 'Sold-out tasting nights',
    summary:
      'Story-led social posts and premium menu assets sold out two new midweek tasting nights in the first launch cycle.',
    image: '/images/design/story-frame.jpg',
    imageAlt: 'Social story design mockup for restaurant',
    services: ['Social media marketing', 'Graphic designing'],
    serviceSlugs: ['social-media-marketing', 'graphic-designing'],
    metrics: [
      { value: '100%', label: 'Event capacity' },
      { value: '3.4×', label: 'Story saves' },
    ],
  },
  {
    id: 'harbour-family',
    featured: false,
    name: 'Suburban family restaurant',
    location: 'Birmingham',
    category: 'marketing',
    timeframe: '14 weeks',
    headline: '+41% repeat visits',
    summary:
      'SMS and email journeys built on first-party guest data revived quiet Tuesdays and reduced reliance on paid ads.',
    image: '/images/social/post-roast.jpg',
    imageAlt: 'Roast dinner on a restaurant table',
    services: ['SMS / Email marketing', 'Customer database growth'],
    serviceSlugs: ['sms-email-marketing', 'customer-database-growth'],
    metrics: [
      { value: '+41%', label: 'Repeat visits' },
      { value: '12k', label: 'Owned contacts' },
    ],
  },
  {
    id: 'coastal-seafood',
    featured: false,
    name: 'Coastal seafood restaurant',
    location: 'Brighton',
    category: 'reputation',
    timeframe: '6 weeks',
    headline: '4.2 → 4.7 Google rating',
    summary:
      'Review alerts, response playbooks and fixes from guest feedback lifted the Google rating from 4.2 to 4.7 in six weeks.',
    image: '/images/social/post-wine.jpg',
    imageAlt: 'Wine cellar dining atmosphere',
    services: ['Reviews monitoring', 'Weekly performance insights'],
    serviceSlugs: ['reviews-monitoring', 'weekly-performance-insights'],
    metrics: [
      { value: '4.7', label: 'Google rating' },
      { value: '+64%', label: 'Review velocity' },
    ],
  },
];

export const workProof = {
  label: 'Weekly reporting',
  title: 'Numbers you can act on',
  titleEm: 'every week, not once a quarter.',
  lead:
    'Every partner gets a plain-English snapshot: covers, bookings, reviews and channel performance, plus what we changed that week. No slide deck. No waiting three months to spot a dip.',
  items: [
    {
      metric: '+31%',
      label: 'Direct bookings',
      detail: 'Independent London group · SEO and social · 8 weeks',
    },
    {
      metric: '-42%',
      label: 'Cost per reservation',
      detail: 'Multi-site casual dining · paid and organic · 6 weeks',
    },
    {
      metric: '50+',
      label: 'UK restaurants supported',
      detail: 'Launch, Growth and Scale partners nationwide',
    },
  ],
  footnote:
    'Sample outcomes from active partner accounts. Your weekly report tracks the metrics that matter to your venue.',
  cta: {
    label: 'See what’s in your weekly report',
    href: '/services/weekly-performance-insights',
  },
};

export const workFeaturedCase = workCases.find((item) => item.featured) ?? workCases[0];

export const workGridCases = workCases.filter((item) => !item.featured);
