/**
 * Per-service accents on top of Velmont global tokens (navy / blue / paper).
 * Typography stays Newsreader + Montserrat + Source Sans, site-wide.
 */
const VELMONT = {
  '--sd-bg': 'var(--paper)',
  '--sd-surface': 'var(--white)',
  '--sd-surface-2': 'var(--mist)',
  '--sd-fg': 'var(--navy-800)',
  '--sd-fg-muted': 'var(--gray-600)',
  '--sd-accent': 'var(--blue-600)',
  '--sd-accent-2': 'var(--navy-800)',
  '--sd-accent-soft': 'var(--blue-100)',
  '--sd-border': 'var(--line)',
  '--sd-display': 'var(--font-display)',
  '--sd-head': 'var(--font-head)',
  '--sd-body': 'var(--font-body)',
  '--sd-hero-bg': 'linear-gradient(165deg, var(--white) 0%, var(--blue-50) 55%, var(--paper) 100%)',
  '--sd-vis-accent': 'var(--blue-600)',
  '--sd-vis-accent-2': 'var(--blue-400)',
  '--sd-vis-accent-soft': 'var(--blue-50)',
};

export const SERVICE_THEMES = {
  'call-handling': {
    id: 'call-handling',
    vibe: 'Every call answered',
    scrollTitle: 'From missed rings to captured revenue',
    darkHero: false,
    cssVars: {
      ...VELMONT,
      '--sd-accent': '#1F9D57',
      '--sd-vis-accent': '#1F9D57',
      '--sd-vis-accent-2': '#D64545',
      '--sd-vis-accent-soft': '#EAF7F0',
    },
  },
  'social-media-marketing': {
    id: 'social-media-marketing',
    vibe: 'Feed that fills tables',
    scrollTitle: 'Scroll the story your guests see',
    darkHero: false,
    cssVars: {
      ...VELMONT,
      '--sd-accent': '#E1306C',
      '--sd-vis-accent': '#E1306C',
      '--sd-vis-accent-2': '#833AB4',
      '--sd-vis-accent-soft': '#FDF2F8',
    },
  },
  'sms-email-marketing': {
    id: 'sms-email-marketing',
    vibe: 'Owned audience',
    scrollTitle: 'Turn one visit into a journey',
    darkHero: false,
    cssVars: {
      ...VELMONT,
      '--sd-accent': '#7C3AED',
      '--sd-vis-accent': '#7C3AED',
      '--sd-vis-accent-2': '#1F9D57',
      '--sd-vis-accent-soft': '#F3EEFF',
    },
  },
  'graphic-designing': {
    id: 'graphic-designing',
    vibe: 'Brand you can taste',
    scrollTitle: 'Layers that stay on-brand',
    darkHero: false,
    cssVars: {
      ...VELMONT,
      '--sd-accent': '#9333EA',
      '--sd-vis-accent': '#9333EA',
      '--sd-vis-accent-2': '#EC4899',
      '--sd-vis-accent-soft': '#F6EEFF',
    },
  },
  'menu-optimization': {
    id: 'menu-optimization',
    vibe: 'Menu engineering',
    scrollTitle: 'Simplify the choice, raise the ticket',
    darkHero: false,
    cssVars: {
      ...VELMONT,
      '--sd-accent': '#D97706',
      '--sd-vis-accent': '#D97706',
      '--sd-vis-accent-2': '#1A52C0',
      '--sd-vis-accent-soft': '#FFF7ED',
    },
  },
  'third-party-platforms': {
    id: 'third-party-platforms',
    vibe: 'Platforms in sync',
    scrollTitle: 'One ops view across apps',
    darkHero: false,
    cssVars: {
      ...VELMONT,
      '--sd-accent': '#F97316',
      '--sd-vis-accent': '#F97316',
      '--sd-vis-accent-2': '#1F9D57',
      '--sd-vis-accent-soft': '#FFF4ED',
    },
  },
  'customer-database-growth': {
    id: 'customer-database-growth',
    vibe: 'First-party data',
    scrollTitle: 'Grow the list you own',
    darkHero: false,
    cssVars: {
      ...VELMONT,
      '--sd-accent': '#059669',
      '--sd-vis-accent': '#059669',
      '--sd-vis-accent-2': '#2680EB',
      '--sd-vis-accent-soft': '#ECFDF5',
    },
  },
  'reviews-monitoring': {
    id: 'reviews-monitoring',
    vibe: 'Reputation guard',
    scrollTitle: 'Stars climb as issues close',
    darkHero: false,
    cssVars: {
      ...VELMONT,
      '--sd-accent': '#F59E0B',
      '--sd-vis-accent': '#F59E0B',
      '--sd-vis-accent-2': '#1F9D57',
      '--sd-vis-accent-soft': '#FFFBEB',
    },
  },
  'weekly-performance-insights': {
    id: 'weekly-performance-insights',
    vibe: 'Weekly clarity',
    scrollTitle: 'One readout, three actions',
    darkHero: false,
    cssVars: {
      ...VELMONT,
      '--sd-accent': '#2680EB',
      '--sd-vis-accent': '#2680EB',
      '--sd-vis-accent-2': '#1F9D57',
      '--sd-vis-accent-soft': '#EEF5FF',
    },
  },
  'seo-optimization': {
    id: 'seo-optimization',
    vibe: 'Local discovery',
    scrollTitle: 'Climb the map pack',
    darkHero: false,
    cssVars: {
      ...VELMONT,
      '--sd-accent': '#0F47A8',
      '--sd-vis-accent': '#0F47A8',
      '--sd-vis-accent-2': '#F59E0B',
      '--sd-vis-accent-soft': '#EEF3FF',
    },
  },
};

export function getServiceTheme(slug) {
  return SERVICE_THEMES[slug] ?? SERVICE_THEMES['call-handling'];
}
