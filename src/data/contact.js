import { Mail, Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { site } from './site';

export const contactHero = {
  eyebrow: 'Contact',
  title: 'Let’s start a',
  titleEm: 'conversation.',
  availability: 'Typically replies within one business day',
};

export const contactForm = {
  eyebrow: 'Send a message',
  title: 'Tell us what you',
  titleEm: 'need.',
  subtitle:
    'A short form is all it takes. We read every message personally and reply with clear, actionable next steps.',
  cardTitle: 'Contact form',
  cardLead: 'Required fields are marked. We typically respond within one business day.',
  privacy:
    'Your details are only used to respond to this inquiry. See our privacy policy for how we handle personal data.',
  cta: 'Send message',
  trust: [
    { value: '24h', label: 'Average response time' },
    { value: 'Free', label: 'Discovery call · no obligation' },
    { value: '100%', label: 'Human review, no bots' },
  ],
};

export const topicOptions = [
  'General inquiry',
  'New project',
  'Partnership',
  'Support',
  'Something else',
];

export const reachIntro = {
  eyebrow: 'Reach us',
  title: 'UK-based team,',
  titleEm: 'available worldwide.',
  subtitle:
    'Registered in Crawley with coverage across the UK, Europe and North America. Async by default, live when it matters.',
  channelsLabel: 'Choose a channel',
  officeLabel: 'Registered office',
  orbitLabel: 'Or orbit us on social',
};

export const contactChannels = [
  {
    id: 'email',
    label: 'Email',
    lane: 'Deep dive',
    value: site.email,
    hint: 'Briefs & attachments',
    response: '~24h',
    href: `mailto:${site.email}`,
    icon: Mail,
    copy: true,
    featured: true,
    cta: 'Copy',
    ctaDone: 'Copied',
  },
  {
    id: 'phone',
    label: 'Phone',
    lane: 'Quick sync',
    value: site.phone,
    hint: 'Mon–Fri · 9–6',
    response: 'Same day',
    href: site.phoneHref,
    icon: Phone,
    cta: 'Call',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    lane: 'Right now',
    value: 'Open chat',
    hint: 'Quick pings',
    response: 'Hours',
    href: site.whatsappHref,
    icon: MessageCircle,
    external: true,
    accent: 'green',
    cta: 'Chat',
  },
];

export const socialLinks = [
  { label: 'Instagram', href: site.social.instagram, id: 'instagram' },
  { label: 'Facebook', href: site.social.facebook, id: 'facebook' },
  { label: 'Threads', href: site.social.threads, id: 'threads' },
];

export const presenceHq = {
  location: site.locationLabel,
  address: site.address,
  coordinates: site.coordinates,
  detail: 'Registered office',
  timeZone: 'Europe/London',
};

export const presence = {
  eyebrow: 'Where we are',
  title: 'UK-first,',
  titleEm: 'internationally available.',
  lead: 'We are headquartered in the UK and align support hours to your timezone for international partners.',
  address: site.address,
  hours: 'Mon–Fri · 9:00–18:00 (local)',
  tagsLabel: 'Coverage zones',
  tagsHint: 'Hover a zone for live local time',
  regions: [
    {
      id: 'uk',
      city: 'Crawley',
      country: 'UK',
      timeZone: 'Europe/London',
      coverage: 'UK & Europe',
      isPrimary: true,
    },
    {
      id: 'na',
      city: 'New York',
      country: 'USA',
      timeZone: 'America/New_York',
      coverage: 'North America',
    },
    {
      id: 'global',
      city: 'Global',
      country: 'Remote',
      timeZone: 'UTC',
      coverage: 'Worldwide async',
    },
  ],
};

export const nextSteps = [
  {
    num: '01',
    title: 'We read your message',
    detail: 'Every submission is reviewed by a real person, not an auto-responder.',
  },
  {
    num: '02',
    title: 'You get a thoughtful reply',
    detail: 'Within one business day, with clear next steps, call, brief, or resources.',
  },
  {
    num: '03',
    title: 'We schedule if it fits',
    detail: 'If a live conversation makes sense, we’ll send a calendar link. No pressure.',
  },
  {
    num: '04',
    title: 'You leave with clarity',
    detail: 'A clear recommendation, scoped proposal, phased plan, or honest redirect.',
  },
];

export const contactFaqs = [
  {
    question: 'How quickly will I hear back?',
    answer: 'We aim to reply within one business day. Urgent items via phone or WhatsApp often get same-day attention.',
  },
  {
    question: 'Is the discovery call really free?',
    answer: 'Yes. It’s a short conversation to understand your goals and recommend the right path, no obligation to proceed.',
  },
  {
    question: 'What should I include in my message?',
    answer: 'Your business name, what you’re trying to achieve, and any timelines help us respond with useful specifics. Short messages are fine too.',
  },
  {
    question: 'Do you work with businesses outside the UK?',
    answer:
      'Yes. We partner with restaurants outside the UK. We remain UK-based; pricing stays in GBP and we align reporting and support hours to your timezone where needed.',
  },
];

export const presenceMeta = [
  { icon: MapPin, label: 'Registered address', value: site.address },
  { icon: Clock, label: 'Office hours', value: 'Mon–Fri · 9:00–18:00' },
];
