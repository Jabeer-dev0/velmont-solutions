import { Zap, TrendingUp, HeartHandshake, Layers, Radio, Headphones } from 'lucide-react';

export const aboutHero = {
  eyebrow: 'About us',
  title: 'We turn ambition into',
  titleEm: 'measurable momentum.',
};

export const aboutProblem = {
  eyebrow: 'The problem',
  title: 'Growth shouldn’t feel',
  titleEm: 'fragmented.',
  lead:
    'Most restaurants are brilliant at hospitality, but their digital stack was never designed as one system.',
  pains: [
    {
      title: 'Too many vendors',
      body: 'Social, SEO, ads, reviews and delivery each owned by someone different, with no shared plan.',
    },
    {
      title: 'No single source of truth',
      body: 'Owners bounce between dashboards that never tell the full story of what drives bookings.',
    },
    {
      title: 'Reactive support',
      body: 'Calls, enquiries and reputation issues get handled late, when the damage is already done.',
    },
    {
      title: 'Marketing without ops',
      body: 'Campaigns launch without the systems behind them to capture, convert and retain guests.',
    },
  ],
  counter: {
    value: 68,
    suffix: '%',
    label: 'of UK owners we spoke with felt their growth tools were disconnected',
  },
};

export const aboutTimeline = [
  {
    year: '01',
    phase: 'The insight',
    title: 'One partner beats five vendors',
    body: 'We saw restaurants paying for overlapping services with no unified strategy or reporting.',
  },
  {
    year: '02',
    phase: 'The build',
    title: 'Systems before campaigns',
    body: 'We designed playbooks for marketing, support and retention that work together, not in silos.',
  },
  {
    year: '03',
    phase: 'The launch',
    title: 'Restaurant-only focus',
    body: 'Every process, metric and recommendation tuned for hospitality, not generic small business advice.',
  },
  {
    year: '04',
    phase: 'Today',
    title: 'Weekly momentum',
    body: 'Partners get clear insight every week, so growth compounds instead of resetting each month.',
  },
];

export const aboutValues = [
  {
    icon: Zap,
    artKey: 'execution',
    title: 'Fast execution',
    kicker: 'Velocity without the chaos.',
    body: 'We ship improvements quickly and integrate them without disrupting service, so momentum never stalls between campaigns.',
    size: 'lg',
    gridArea: 'feat',
    theme: 'dark',
  },
  {
    icon: TrendingUp,
    artKey: 'growth',
    title: 'Growth focused',
    body: 'Every decision ties back to bookings, revenue and repeat visits.',
    size: 'sm',
    gridArea: 'stack1',
  },
  {
    icon: HeartHandshake,
    artKey: 'support',
    title: 'Dedicated support',
    body: 'You work with a team that knows your restaurant, not a ticket queue.',
    size: 'sm',
    gridArea: 'stack2',
  },
  {
    icon: Layers,
    artKey: 'systems',
    title: 'Systems thinking',
    body: 'Marketing, ops and data designed as one stack.',
    size: 'sm',
    gridArea: 'base1',
  },
  {
    icon: Radio,
    artKey: 'reporting',
    title: 'Transparent reporting',
    body: 'Weekly insight you can act on, not vanity metrics.',
    size: 'sm',
    gridArea: 'base2',
  },
];

export const aboutArchitecture = {
  eyebrow: 'How we’re built',
  title: 'One partner.',
  titleEm: 'Three layers of expertise.',
  lead: 'Hover or select a layer to see how strategy, execution and support connect under one roof.',
  bgImage: '/images/how-were-built.webp',
  layers: [
    {
      id: 'strategy',
      label: '01: Strategy',
      title: 'Growth leadership',
      body: 'Roadmaps, priorities and weekly reviews aligned to your revenue goals.',
      icon: TrendingUp,
    },
    {
      id: 'marketing',
      label: '02: Execution',
      title: 'Channel specialists',
      body: 'Social, search, creative, platforms and campaigns run day to day.',
      icon: Layers,
    },
    {
      id: 'support',
      label: '03: Operations',
      title: 'Guest-facing support',
      body: 'Calls, enquiries, reviews and the systems guests interact with.',
      icon: Headphones,
    },
  ],
};
