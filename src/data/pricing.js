export const pricingHero = {
  eyebrow: 'Pricing',
  title: 'Clear retainers for every stage of',
  titleEm: 'restaurant growth.',
};

export const pricingIntro = {
  sub: 'Transparent monthly retainers built around how restaurants actually grow, from getting online to running the full growth stack.',
  footnote: 'Prices in GBP · Scoped on your free discovery call · No hidden setup fees',
};

export const plans = [
  {
    id: 'launch',
    name: 'Launch',
    audience: 'Single-site independents',
    price: '£299',
    priceNote: 'per month',
    note: 'Get visible, credible and measurable, the essentials handled for you.',
    features: [
      'Consistent social presence across key channels',
      'Reviews monitored and responded to',
      'Menu and brand graphics that look premium',
      'Monthly performance report with clear next steps',
      'Email support · 24h response',
    ],
    cta: 'Start with Launch',
    featured: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    audience: 'Restaurants ready to scale',
    price: '£499',
    priceNote: 'per month',
    note: 'Our recommended plan, marketing, support and automation working as one system.',
    features: [
      'Everything in Launch',
      'SMS & email journeys that bring diners back',
      'Professional call handling during peak hours',
      'SEO and menu optimization for more local demand',
      'Weekly analytics and growth recommendations',
    ],
    cta: 'Book a free discovery call',
    featured: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    audience: 'Multi-site & high-growth brands',
    price: '£699',
    priceNote: 'per month',
    note: 'Full-stack growth, strategy, platforms, database building and dedicated support.',
    features: [
      'Everything in Growth',
      'Third-party delivery platform management',
      'Customer database and retention campaigns',
      'Dedicated account team',
      'Priority same-day support',
    ],
    cta: 'Talk to our team',
    featured: false,
  },
];

export const pricingAssurances = [
  'Free discovery call before you commit',
  'Tailored to your menu, channels & goals',
  'Change or cancel with 30 days notice',
];

/** Grouped comparison rows, boolean = included, string = tier-specific detail */
export const comparisonCategories = [
  {
    name: 'Marketing & brand',
    rows: [
      { feature: 'Social media management', launch: true, growth: true, scale: true },
      { feature: 'Graphic design & menu visuals', launch: true, growth: true, scale: true },
      { feature: 'SMS & email automation', launch: false, growth: true, scale: true },
      { feature: 'SEO & menu optimization', launch: false, growth: true, scale: true },
    ],
  },
  {
    name: 'Operations & reputation',
    rows: [
      { feature: 'Reviews monitoring', launch: true, growth: true, scale: true },
      { feature: 'Professional call handling', launch: false, growth: true, scale: true },
      { feature: 'Third-party platform management', launch: false, growth: false, scale: true },
      { feature: 'Customer database & retention', launch: false, growth: false, scale: true },
    ],
  },
  {
    name: 'Reporting & support',
    rows: [
      { feature: 'Performance reporting', launch: 'Monthly', growth: 'Weekly', scale: 'Weekly + strategy' },
      { feature: 'Support response', launch: '24h email', growth: 'Priority', scale: 'Same-day' },
      { feature: 'Account team', launch: 'Shared', growth: 'Shared', scale: 'Dedicated' },
    ],
  },
];

export const pricingFaqs = [
  {
    question: 'Is there a setup fee or contract lock-in?',
    answer:
      'No hidden setup fees on any plan. Every plan starts with a free discovery call so scope is clear upfront. You can change or cancel with 30 days notice, we earn retention through results, not long contracts.',
  },
  {
    question: 'How do I know which plan is right for me?',
    answer:
      'Most single-site restaurants start on Launch if they mainly need presence and reporting, or Growth if they want automation, call handling and weekly optimization. Scale is for multi-site brands or operators who need dedicated support and custom SLAs. We will recommend the right fit on your discovery call.',
  },
  {
    question: 'Can I upgrade or downgrade later?',
    answer:
      'Yes. As your restaurant grows, we adjust the plan and scope with you. Upgrades can usually start within the next billing cycle; downgrades take effect after the current month with 30 days notice.',
  },
  {
    question: 'What happens on the free discovery call?',
    answer:
      'We review your current channels, reviews, menus and goals, then map which plan and services will move the needle fastest. You leave with a clear recommendation, no obligation to sign up.',
  },
  {
    question: 'Do you work with restaurants outside the UK?',
    answer:
      'Yes. We partner with restaurants internationally. Pricing stays in GBP; we align reporting and support hours to your timezone where needed.',
  },
  {
    question: 'What does Scale include at £699 per month?',
    answer:
      'Scale adds third-party platform management, customer database and retention campaigns, a dedicated account team and same-day priority support on top of everything in Growth. It is built for multi-site and high-growth brands that need a full-stack partner.',
  },
];

export const pricingCta = {
  title: 'Not sure which plan fits?',
  titleEm: 'Start with a call.',
  lead: 'Book a free 20-minute discovery call. We will audit where you are today and recommend the smallest plan that still moves the needle.',
  trust: 'Free · No obligation · Tailored to your restaurant',
};
