import {
  Headphones,
  ThumbsUp,
  Mail,
  PenLine,
  ClipboardList,
  Store,
  Users,
  Star,
  BarChart3,
  Search,
  Zap,
  TrendingUp,
  HeartHandshake,
} from 'lucide-react';

export const servicesHero = {
  eyebrow: 'Services',
  title: 'Complete digital growth solutions for',
  titleEm: 'restaurants.',
};

export const services = [
  {
    slug: 'call-handling',
    name: 'Call handling',
    description: 'Professional customer communication & order handling support.',
    outcome: 'Never miss high-intent booking and order calls during peak hours.',
    icon: Headphones,
  },
  {
    slug: 'social-media-marketing',
    name: 'Social media marketing',
    description: 'Instagram & Facebook growth campaigns built for restaurants.',
    outcome: 'Turn local reach into measurable bookings, walk-ins and repeat visits.',
    icon: ThumbsUp,
    featured: true,
    featureDescription:
      'Instagram & Facebook growth campaigns built to fill tables and drive orders.',
  },
  {
    slug: 'sms-email-marketing',
    name: 'SMS / Email marketing',
    description: 'Automated campaigns that turn one-time diners into regulars.',
    outcome: 'Bring diners back with timely offers, reminders and retention journeys.',
    icon: Mail,
  },
  {
    slug: 'graphic-designing',
    name: 'Graphic designing',
    description: 'Modern visuals, menus & branding assets that look as good as you taste.',
    outcome: 'Present a premium brand experience across digital and in-store touchpoints.',
    icon: PenLine,
  },
  {
    slug: 'menu-optimization',
    name: 'Menu optimization',
    description: 'Better menu structure & pricing to improve conversions.',
    outcome: 'Increase average order value with clearer structure and smarter pricing.',
    icon: ClipboardList,
  },
  {
    slug: 'third-party-platforms',
    name: 'Third-party platforms',
    description: 'End-to-end management for delivery & restaurant platforms.',
    outcome: 'Improve visibility and consistency across all delivery marketplaces.',
    icon: Store,
  },
  {
    slug: 'customer-database-growth',
    name: 'Customer database growth',
    description: 'Build strong, first-party customer lists for future marketing.',
    outcome: 'Own your customer data so growth is not dependent on ad platforms.',
    icon: Users,
  },
  {
    slug: 'reviews-monitoring',
    name: 'Reviews monitoring',
    description: 'Track and manage customer reviews across every platform.',
    outcome: 'Protect reputation and convert positive sentiment into more bookings.',
    icon: Star,
  },
  {
    slug: 'weekly-performance-insights',
    name: 'Weekly performance insights',
    description: 'Detailed weekly reports & clear growth recommendations.',
    outcome: 'Know exactly what is working and what to improve every single week.',
    icon: BarChart3,
  },
  {
    slug: 'seo-optimization',
    name: 'SEO optimization',
    description: 'Climb Google and attract more local diners through search.',
    outcome: 'Capture high-intent local searches and convert them into reservations.',
    icon: Search,
    bentoNavy: true,
  },
];

/** Bento grid cards on the home page (excluding the featured tile). */
export const bentoCards = [
  { index: 0, slot: 'call' },
  { index: 9, slot: 'seo' },
  { index: 7, slot: 'reviews' },
  { index: 4, slot: 'menu' },
];

/** Indices into `services` for the compact mini row below the bento. */
export const miniRowIndices = [2, 3, 5, 6, 8];

export const whyPoints = [
  {
    icon: Zap,
    title: 'Launched in weeks',
    description: 'Campaigns, scripts and automations go live without disrupting service.',
  },
  {
    icon: TrendingUp,
    title: 'Tied to covers and revenue',
    description: 'We track bookings, orders and repeat visits, not vanity metrics alone.',
  },
  {
    icon: HeartHandshake,
    title: 'One partner, one plan',
    description: 'A team that knows your restaurant, not a rotating ticket queue.',
  },
];

export const servicesHeroProof = [
  { value: '50+', label: 'Restaurants supported' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '24h', label: 'Support response' },
];

export const servicesProcess = [
  {
    phase: 'Week 1',
    title: 'Audit & growth plan',
    detail:
      'We benchmark your channels, identify revenue leaks, then deliver a focused 90-day plan.',
  },
  {
    phase: 'Weeks 2-3',
    title: 'Build & launch',
    detail:
      'We implement campaigns, automations and platform improvements with clear ownership.',
  },
  {
    phase: 'Ongoing',
    title: 'Weekly optimization',
    detail:
      'You get weekly performance insights, rapid iteration and direct partner support.',
  },
];

export const servicesProof = [
  {
    metric: '+31%',
    title: 'Increase in direct bookings',
    timeframe: 'within 8 weeks',
    context: 'Independent London restaurant group',
  },
  {
    metric: '-42%',
    title: 'Lower cost per reservation',
    timeframe: 'within 6 weeks',
    context: 'Multi-location casual dining brand',
  },
];
