import { services } from './services';
import { getServiceTheme } from './serviceThemes';

/**
 * Extended editorial content per service, how Velmont scopes and delivers each offer.
 * Grounded in common restaurant-agency practice (human + systems, weekly rhythm, UK focus).
 */
const DETAILS = {
  'call-handling': {
    accent: '#1A52C0',
    metaTitle: 'Restaurant Call Handling | Velmont Solutions',
    metaDescription:
      'Professional call handling for restaurants: reservations, orders and enquiries answered with your brand voice, peak-hour coverage without missing revenue.',
    heroLead:
      'Every unanswered ring is a table you did not fill. We answer, qualify and route calls so your team stays on the floor.',
    challenge:
      'Friday service should not depend on whoever is free to grab the phone. Busy signals, rushed answers and wrong orders erode trust fast.',
    challengeTitle: 'Every ring shouldn\u2019t depend on',
    challengeTitleEm: 'who\u2019s free.',
    challengeCounter: {
      value: 34,
      suffix: '%',
      label: 'of restaurant calls go unanswered during peak service hours',
    },
    challengePoints: [
      {
        title: 'Peak-hour overflow',
        body: 'Front-of-house is slammed and phones ring through unanswered.',
      },
      {
        title: 'After-hours gaps',
        body: 'Enquiries and delivery orders go straight to voicemail.',
      },
      {
        title: 'Inconsistent scripts',
        body: 'Upsells and allergy checks get skipped under pressure.',
      },
      {
        title: 'No call log',
        body: 'Nothing captures what callers actually asked for.',
      },
    ],
    approach:
      'Velmont treats call handling as revenue infrastructure, not a generic answering service. We learn your menu, hours, booking rules and tone, then represent you on every inbound call with clear escalation paths back to your team.',
    deliverables: [
      { title: 'Brand-trained scripts', detail: 'Greetings, FAQs, allergy prompts, upsell cues and handoff rules written for your venue.' },
      { title: 'Reservation & enquiry capture', detail: 'Bookings, callbacks and special requests logged in your agreed format, same day.' },
      { title: 'Order support', detail: 'Takeaway and delivery order intake with item confirmation; complex mods escalated to site staff.' },
      { title: 'Coverage windows', detail: 'Peak, close and overflow blocks scheduled around your service times, UK & international hours available.' },
      { title: 'Weekly call insights', detail: 'Volume, missed-call reduction and recurring themes surfaced in your performance review.' },
    ],
    phases: [
      { phase: 'Week 1', title: 'Discovery & routing map', detail: 'We document menu edge cases, POS flow, escalation contacts and tone references.' },
      { phase: 'Week 2', title: 'Live with shadowing', detail: 'Agents go live with QA listening; scripts refined from real caller patterns.' },
      { phase: 'Ongoing', title: 'Optimise & protect revenue', detail: 'Script updates for promos, seasonal menus and recurring objection handling.' },
    ],
    included: ['Dedicated account contact', 'Call logs & summaries', 'Script updates for menu changes', 'Integration with your booking tool or CRM'],
    metrics: [
      { value: '24/7', label: 'Coverage options' },
      { value: '<30s', label: 'Target answer time' },
      { value: '100%', label: 'Calls logged' },
    ],
    related: ['reviews-monitoring', 'weekly-performance-insights', 'customer-database-growth'],
  },

  'social-media-marketing': {
    accent: '#2680EB',
    metaTitle: 'Restaurant Social Media Marketing | Velmont Solutions',
    metaDescription:
      'Instagram and Facebook growth for restaurants: strategy, content, community management and reporting tied to bookings, not vanity likes.',
    heroLead:
      'Social should fill tables, not just feed the algorithm. We plan, produce and publish with hospitality KPIs in mind.',
    challenge:
      'Posting when you have time leads to inconsistent grids, quiet DMs and ads that boost reach but not covers.',
    challengeTitle: 'Your feed shouldn\u2019t run on',
    challengeTitleEm: 'spare moments.',
    challengeCounter: {
      value: 71,
      suffix: '%',
      label: 'of diners check social before choosing where to eat',
    },
    challengePoints: [
      {
        title: 'No content calendar',
        body: 'Posts aren\u2019t aligned to service periods, events or offers.',
      },
      {
        title: 'Generic creative',
        body: 'Reels and stories look templated \u2014 not like your dining room.',
      },
      {
        title: 'Slow community response',
        body: 'Comments and booking DMs get answered late or not at all.',
      },
      {
        title: 'Boosts without conversion',
        body: 'Paid posts lift reach but don\u2019t link to reservations or orders.',
      },
    ],
    approach:
      'Platform-native planning for Instagram and Facebook (and TikTok where it fits your audience). We pair brand storytelling with local discovery tactics, geo tags, offer posts, UGC-style reels, and report on actions that matter: profile visits, direction clicks and enquiry volume.',
    deliverables: [
      { title: 'Monthly content strategy', detail: 'Calendar mapped to lunch, dinner, events and slow nights with clear post objectives.' },
      { title: 'Creative production', detail: 'Photography briefs, reel edits, story templates and promo graphics on-brand.' },
      { title: 'Publishing & scheduling', detail: 'Consistent cadence with approval workflow before anything goes live.' },
      { title: 'Community management', detail: 'Comment and DM workflows with escalation rules for complaints and bookings.' },
      { title: 'Performance reporting', detail: 'Reach, engagement and conversion proxies reviewed weekly with next actions.' },
    ],
    phases: [
      { phase: 'Week 1', title: 'Brand & competitor audit', detail: 'Tone, visual gaps and local set benchmarks for content pillars.' },
      { phase: 'Weeks 2–4', title: 'Launch cadence', detail: 'First month of content goes live; community playbooks activated.' },
      { phase: 'Ongoing', title: 'Test & double down', detail: 'Double down on formats that drive saves, shares and booking intent.' },
    ],
    included: ['Content calendar access', 'Asset library delivery', 'Hashtag & location strategy', 'Optional paid social add-on'],
    metrics: [
      { value: '15–20+', label: 'Content pieces / mo' },
      { value: '2', label: 'Core platforms' },
      { value: 'Weekly', label: 'Optimisation cycle' },
    ],
    related: ['graphic-designing', 'seo-optimization', 'weekly-performance-insights'],
  },

  'sms-email-marketing': {
    accent: '#1565A8',
    metaTitle: 'Restaurant SMS & Email Marketing | Velmont Solutions',
    metaDescription:
      'Retention marketing for restaurants: SMS and email journeys that bring guests back, fill quiet nights and grow first-party data you own.',
    heroLead:
      'One-time diners become regulars when you reach them on the channels they actually open.',
    challenge:
      'Relying only on delivery apps and social reach means you rent your audience. Without owned lists, every promotion starts from zero.',
    challengeTitle: 'Growth shouldn\u2019t rent',
    challengeTitleEm: 'your audience.',
    challengeCounter: {
      value: 58,
      suffix: '%',
      label: 'higher return rate when guests receive personalised offers',
    },
    challengePoints: [
      {
        title: 'No capture flow',
        body: 'Booking, checkout and in-venue moments never build your list.',
      },
      {
        title: 'Weak email sends',
        body: 'Blast emails with poor subject lines and no segmentation.',
      },
      {
        title: 'SMS underused',
        body: 'Text used only for confirmations \u2014 not retention or win-backs.',
      },
      {
        title: 'No repeat tracking',
        body: 'Campaigns run without measuring return visit rate.',
      },
    ],
    approach:
      'We build compliant opt-in paths, segment guests by behaviour (new, lapsed, VIP) and run journeys that feel personal: slow Tuesday invites, birthday offers, new menu previews, with clear unsubscribe and UK GDPR-aware practices.',
    deliverables: [
      { title: 'List growth architecture', detail: 'QR, web forms, reservation follow-ups and staff prompts to grow opt-ins.' },
      { title: 'Email template system', detail: 'Modular designs for promos, events and reactivation sequences.' },
      { title: 'SMS campaign calendar', detail: 'Timed sends around service patterns with character-count discipline.' },
      { title: 'Automation flows', detail: 'Welcome, win-back and review-request sequences where appropriate.' },
      { title: 'Revenue attribution', detail: 'Track clicks, redemptions and direction requests from each send.' },
    ],
    phases: [
      { phase: 'Week 1', title: 'Data audit & compliance', detail: 'Clean lists, consent records and platform setup (ESP/SMS).' },
      { phase: 'Week 2–3', title: 'Journey build', detail: 'Core automations and first campaign calendar approved.' },
      { phase: 'Ongoing', title: 'Send & refine', detail: 'A/B subjects, offer tests and segment expansion monthly.' },
    ],
    included: ['Campaign copywriting', 'Send scheduling', 'List hygiene guidance', 'Monthly performance summary'],
    metrics: [
      { value: '3–5', label: 'Core journeys' },
      { value: 'UK', label: 'GDPR-aware setup' },
      { value: 'Weekly', label: 'Send rhythm' },
    ],
    related: ['customer-database-growth', 'graphic-designing', 'weekly-performance-insights'],
  },

  'graphic-designing': {
    accent: '#2D4A9A',
    metaTitle: 'Restaurant Graphic Design | Velmont Solutions',
    metaDescription:
      'Menus, promos and brand assets for UK restaurants: premium design for screens, print and delivery platforms that matches your kitchen quality.',
    heroLead:
      'Guests eat with their eyes first. We design assets that match the quality of what leaves your kitchen.',
    challenge:
      'Mixed fonts, cropped logos and rushed Canva posts signal “amateur” before anyone tastes the food.',
    challengeTitle: 'Your brand shouldn\u2019t look',
    challengeTitleEm: 'rushed.',
    challengeCounter: {
      value: 94,
      suffix: '%',
      label: 'of first impressions are design-driven before a guest ever tastes the food',
    },
    challengePoints: [
      {
        title: 'Inconsistent visuals',
        body: 'Mixed fonts and crops across Instagram, Google and print.',
      },
      {
        title: 'Promo mismatch',
        body: 'Offer creatives don\u2019t match menu pricing or brand tone.',
      },
      {
        title: 'Low-res channel assets',
        body: 'Delivery thumbnails and story stickers look blurry or off-brand.',
      },
      {
        title: 'No brand kit',
        body: 'Staff and partners have nothing consistent to reuse.',
      },
    ],
    approach:
      'Hospitality-first design: legible menus, appetite-led photography direction, promo systems for offers and events, plus export packs sized for each channel you use.',
    deliverables: [
      { title: 'Brand kit refresh', detail: 'Logo usage, colour, type and layout rules for internal and partner use.' },
      { title: 'Menu & price assets', detail: 'Print-ready and digital menu boards with hierarchy for upsells.' },
      { title: 'Social & ad creatives', detail: 'Story frames, carousels and paid ad sizes in batch sets.' },
      { title: 'In-venue & print', detail: 'Table tents, posters and QR collateral aligned to campaigns.' },
      { title: 'Delivery marketplace art', detail: 'Hero images and promo banners for aggregator profiles.' },
    ],
    phases: [
      { phase: 'Week 1', title: 'Creative direction', detail: 'Mood, references and asset priority list signed off.' },
      { phase: 'Weeks 2–3', title: 'Production sprints', detail: 'Batch delivery with revision rounds per agreed scope.' },
      { phase: 'Ongoing', title: 'Campaign support', detail: 'Rapid-turn promo art for seasonal pushes.' },
    ],
    included: ['Source files on request', 'Channel-specific exports', 'Revision policy per tier', 'Asset naming & handoff'],
    metrics: [
      { value: '48h', label: 'Rush promo option' },
      { value: 'Multi', label: 'Channel formats' },
      { value: '1', label: 'Brand system' },
    ],
    related: ['social-media-marketing', 'menu-optimization', 'third-party-platforms'],
  },

  'menu-optimization': {
    accent: '#1A52C0',
    metaTitle: 'Restaurant Menu Optimization | Velmont Solutions',
    metaDescription:
      'Menu engineering and pricing structure for restaurants: improve average order value and clarity across dine-in, takeaway and delivery.',
    heroLead:
      'A clearer menu sells more. We structure categories, naming and price architecture for conversion.',
    challenge:
      'Too many items, buried margins and confusing modifiers slow decisions and increase order errors.',
    challengeTitle: 'Your menu shouldn\u2019t slow',
    challengeTitleEm: 'decisions.',
    challengeCounter: {
      value: 23,
      suffix: 's',
      label: 'average scan time on a menu \u2014 every item and price counts',
    },
    challengePoints: [
      {
        title: 'Hero items buried',
        body: 'Signature dishes sit below the fold on delivery apps.',
      },
      {
        title: 'Confusing modifiers',
        body: 'Combo trees confuse staff and guests at checkout.',
      },
      {
        title: 'Misaligned pricing',
        body: 'Prices don\u2019t reflect food cost or local positioning.',
      },
      {
        title: 'No profit testing',
        body: 'No read on which items drive margin vs popularity.',
      },
    ],
    approach:
      'We combine menu psychology (anchors, bundles, decoys) with operational reality: what your kitchen can execute consistently, then roll changes across print, web and aggregator listings.',
    deliverables: [
      { title: 'Menu audit', detail: 'Item-level review of margin proxies, complexity and placement.' },
      { title: 'Category architecture', detail: 'Cleaner groupings, naming and visual hierarchy for scanability.' },
      { title: 'Pricing & bundle strategy', detail: 'Bundles, add-ons and limited offers that lift average ticket.' },
      { title: 'Cross-channel sync', detail: 'Aligned listings on web, POS and delivery where you operate.' },
      { title: 'Before/after tracking', detail: 'Baseline vs post-change basket and item mix in reporting.' },
    ],
    phases: [
      { phase: 'Week 1', title: 'Data & kitchen review', detail: 'Sales mix, prep constraints and guest feedback synthesized.' },
      { phase: 'Week 2', title: 'Redesign & approval', detail: 'Stakeholder sign-off on structure and price moves.' },
      { phase: 'Week 3+', title: 'Rollout & measure', detail: 'Publish updates and monitor conversion for 30 days.' },
    ],
    included: ['Written recommendations doc', 'Design support for menu boards', 'Staff cheat-sheet for upsells', 'Quarterly refresh option'],
    metrics: [
      { value: '+AOV', label: 'Target outcome' },
      { value: '3', label: 'Channel alignment' },
      { value: '30d', label: 'Review window' },
    ],
    related: ['graphic-designing', 'third-party-platforms', 'weekly-performance-insights'],
  },

  'third-party-platforms': {
    accent: '#0E2148',
    metaTitle: 'Delivery Platform Management | Velmont Solutions',
    metaDescription:
      'Manage Deliveroo, Uber Eats, Just Eat and restaurant platforms, listings, promos, ratings and ops consistency under one partner.',
    heroLead:
      'Aggregators are a sales channel, not a side chore. We run listings so margins and reviews stay under control.',
    challenge:
      'Each platform has different fees, promo rules and image specs. Owners lose hours toggling dashboards instead of leading service.',
    challengeTitle: 'Delivery shouldn\u2019t feel like',
    challengeTitleEm: 'side work.',
    challengeCounter: {
      value: 41,
      suffix: '%',
      label: 'of UK restaurant orders now come through delivery apps',
    },
    challengePoints: [
      {
        title: 'Stale listings',
        body: 'Menus and hours stay wrong after schedule changes.',
      },
      {
        title: 'Unclear promo ROI',
        body: 'Discount spend with no read on incrementality.',
      },
      {
        title: 'Rating dips',
        body: 'Delivery experience issues nobody tracked until scores slip.',
      },
      {
        title: 'Weak item presentation',
        body: 'Photography and descriptions under-sell signature dishes.',
      },
    ],
    approach:
      'Centralised ownership: listing hygiene, offer calendar, fee-aware promotions and review response coordination with your kitchen and call teams.',
    deliverables: [
      { title: 'Listing management', detail: 'Menus, hours, holidays and item availability synced per platform.' },
      { title: 'Visual & copy optimisation', detail: 'Hero items, descriptions and allergen info platform-compliant.' },
      { title: 'Promo calendar', detail: 'Fee-aware discounts tied to capacity and margin guardrails.' },
      { title: 'Rating & issue tracking', detail: 'Monitor scores; flag operational patterns hurting delivery CSAT.' },
      { title: 'Performance rollup', detail: 'Orders, AOV and promo ROI in your weekly Velmont report.' },
    ],
    phases: [
      { phase: 'Week 1', title: 'Platform audit', detail: 'Baseline scores, listing errors and fee structure documented.' },
      { phase: 'Week 2', title: 'Optimise & standardise', detail: 'Creative and menu parity applied across active apps.' },
      { phase: 'Ongoing', title: 'Operate & adjust', detail: 'Weekly promo and availability tweaks from trade data.' },
    ],
    included: ['Multi-platform dashboard summary', 'Escalation for order issues', 'Seasonal campaign support', 'Coordination with menu team'],
    metrics: [
      { value: '3+', label: 'Platforms supported' },
      { value: 'Weekly', label: 'Listing checks' },
      { value: '1', label: 'Owner of channel' },
    ],
    related: ['menu-optimization', 'reviews-monitoring', 'call-handling'],
  },

  'customer-database-growth': {
    accent: '#4FA9F9',
    metaTitle: 'Restaurant Customer Database Growth | Velmont Solutions',
    metaDescription:
      'Build first-party guest lists for UK restaurants: capture, segment and activate customer data you own for retention and marketing campaigns.',
    heroLead:
      'Your guest list is an asset. We help you capture it legally and use it across every campaign.',
    challenge:
      'Guests book via Google, walk in once, or order on apps. You never get an email or number to invite them back.',
    challengeTitle: 'Guest data shouldn\u2019t stay',
    challengeTitleEm: 'in silos.',
    challengeCounter: {
      value: 80,
      suffix: '%',
      label: 'of revenue can come from repeat guests you already know',
    },
    challengePoints: [
      {
        title: 'Dirty exports',
        body: 'POS and reservation tools don\u2019t export marketing-ready fields.',
      },
      {
        title: 'Missed opt-in moments',
        body: 'Staff aren\u2019t trained on quick, compliant capture prompts.',
      },
      {
        title: 'No unified view',
        body: 'Dine-in and delivery guests live in separate systems.',
      },
      {
        title: 'Lists sitting idle',
        body: 'First-party data unused while paid ad costs keep rising.',
      },
    ],
    approach:
      'Practical capture mechanics (QR, receipt, booking follow-up), CRM hygiene and segments that plug straight into Velmont SMS/email and reporting.',
    deliverables: [
      { title: 'Capture playbook', detail: 'Staff scripts, signage and digital forms with incentive testing.' },
      { title: 'CRM setup & fields', detail: 'Tags for visit frequency, spend band and dietary flags where relevant.' },
      { title: 'Integration mapping', detail: 'Connect reservation, POS or forms to your marketing tools.' },
      { title: 'Segmentation model', detail: 'New, active, lapsed and VIP tiers with recommended actions.' },
      { title: 'Growth reporting', detail: 'List size, opt-in rate and reactivation performance monthly.' },
    ],
    phases: [
      { phase: 'Week 1', title: 'Systems & gaps', detail: 'Map data sources and consent paths; fix broken handoffs.' },
      { phase: 'Week 2–3', title: 'Launch capture', detail: 'In-venue and digital capture live with staff briefing.' },
      { phase: 'Ongoing', title: 'Activate & grow', detail: 'Campaigns fired to segments; hygiene and re-permission as needed.' },
    ],
    included: ['GDPR guidance (UK)', 'Quarterly segment review', 'Import/export support', 'Handoff to SMS/email team'],
    metrics: [
      { value: '1st', label: 'Party data goal' },
      { value: '4+', label: 'Capture touchpoints' },
      { value: 'Monthly', label: 'List health check' },
    ],
    related: ['sms-email-marketing', 'weekly-performance-insights', 'social-media-marketing'],
  },

  'reviews-monitoring': {
    accent: '#1A52C0',
    metaTitle: 'Restaurant Reviews Monitoring | Velmont Solutions',
    metaDescription:
      'Monitor and respond to restaurant reviews on Google, TripAdvisor and delivery apps, protect reputation and turn feedback into fixes.',
    heroLead:
      'A one-star trend costs covers. We watch, respond and route feedback so issues do not fester online.',
    challenge:
      'Owners see a bad Google review days late, while delivery ratings slip from bag seal or timing problems nobody tracked.',
    challengeTitle: 'Reputation shouldn\u2019t be',
    challengeTitleEm: 'reactive.',
    challengeCounter: {
      value: 72,
      suffix: '%',
      label: 'of diners trust online reviews as much as personal recommendations',
    },
    challengePoints: [
      {
        title: 'Scattered feedback',
        body: 'No unified inbox for Google, TripAdvisor and aggregators.',
      },
      {
        title: 'Off-brand replies',
        body: 'Generic or defensive responses that hurt your tone.',
      },
      {
        title: 'Repeating issues',
        body: 'Operational problems show up in reviews without internal alerts.',
      },
      {
        title: 'Missed loyalty moments',
        body: 'Positive reviews left unthanked \u2014 guests never feel seen.',
      },
    ],
    approach:
      'Always-on monitoring with hospitality-appropriate responses, sentiment themes for ops, and coordination with call and delivery teams when patterns emerge.',
    deliverables: [
      { title: 'Multi-platform monitoring', detail: 'Google Business, TripAdvisor and key delivery profiles watched daily.' },
      { title: 'Response drafting & posting', detail: 'On-brand replies within agreed SLAs; escalations for legal/sensitive.' },
      { title: 'Issue tagging', detail: 'Categories (wait time, food temp, staff) fed into weekly partner review.' },
      { title: 'Rating dashboards', detail: 'Score trends and competitor benchmarks where available.' },
      { title: 'Recovery outreach', detail: 'Optional follow-up paths for resolved complaints.' },
    ],
    phases: [
      { phase: 'Week 1', title: 'Tone & escalation', detail: 'Response templates and owner approval rules set.' },
      { phase: 'Week 2', title: 'Live monitoring', detail: 'All profiles connected; backlog cleared.' },
      { phase: 'Ongoing', title: 'Protect & improve', detail: 'Weekly theme report to GM/owner with suggested ops fixes.' },
    ],
    included: ['Daily monitoring window', 'Crisis escalation contact', 'Monthly reputation summary', 'Coordination with marketing'],
    metrics: [
      { value: '<24h', label: 'Response target' },
      { value: 'All', label: 'Key platforms' },
      { value: 'Weekly', label: 'Theme digest' },
    ],
    related: ['call-handling', 'third-party-platforms', 'weekly-performance-insights'],
  },

  'weekly-performance-insights': {
    accent: '#15315F',
    metaTitle: 'Weekly Restaurant Performance Reports | Velmont Solutions',
    metaDescription:
      'Weekly performance insights for restaurants: one clear report on what drove bookings, orders and revenue, with actions not vanity metrics.',
    heroLead:
      'You should not dig through five dashboards to know if last week worked. We deliver one honest readout.',
    challenge:
      'Data lives in Meta, Google, POS and delivery apps. Owners get charts but not decisions.',
    challengeTitle: 'Decisions shouldn\u2019t wait on',
    challengeTitleEm: 'dashboards.',
    challengeCounter: {
      value: 5,
      suffix: '+',
      label: 'tools owners juggle before knowing if last week actually worked',
    },
    challengePoints: [
      {
        title: 'Late reporting',
        body: 'Monthly agency PDFs arrive too late to fix anything.',
      },
      {
        title: 'Vanity metrics',
        body: 'Charts look good while covers and revenue stay flat.',
      },
      {
        title: 'Siloed teams',
        body: 'Marketing and ops never share one view of performance.',
      },
      {
        title: 'No next steps',
        body: 'The team is unclear on what to do differently next week.',
      },
    ],
    approach:
      'Velmont’s weekly insight is the glue across services we run for you: traffic, campaigns, calls, reviews and orders in plain English with three prioritised actions.',
    deliverables: [
      { title: 'Unified weekly report', detail: 'PDF/summary with highlights, risks and wins, readable in 10 minutes.' },
      { title: 'KPI scorecard', detail: 'Bookings proxy, ad spend, social actions, review score, list growth as relevant.' },
      { title: 'Action list', detail: 'Max three prioritised moves for the coming week with owners assigned.' },
      { title: 'Live review call', detail: 'Optional 20-min walkthrough on Business tier and above.' },
      { title: 'Historical archive', detail: 'Trend lines so you see compound progress, not one-off spikes.' },
    ],
    phases: [
      { phase: 'Week 1', title: 'Metric map', detail: 'Agree sources, definitions and what “good” means for your venue.' },
      { phase: 'Week 2', title: 'First report', detail: 'Baseline issued; action items triaged with your GM.' },
      { phase: 'Ongoing', title: 'Rhythm & accountability', detail: 'Same day each week; actions tracked to completion.' },
    ],
    included: ['Cross-channel rollup', 'Plain-language commentary', 'Action tracking', 'Export for stakeholders'],
    metrics: [
      { value: '7d', label: 'Report cadence' },
      { value: '3', label: 'Priority actions' },
      { value: '1', label: 'Source of truth' },
    ],
    related: ['seo-optimization', 'social-media-marketing', 'sms-email-marketing'],
  },

  'seo-optimization': {
    accent: '#0F47A8',
    metaTitle: 'Restaurant SEO & Local Search | Velmont Solutions',
    metaDescription:
      'Local SEO for restaurants: Google Business Profile, local search rankings and website optimisation to capture high-intent diners nearby.',
    heroLead:
      'When someone searches “best Italian near me”, you should be in that decision set. We earn the visibility.',
    challenge:
      'Beautiful websites that rank nowhere, outdated Google hours, and competitors winning the local pack.',
    challengeTitle: 'Local search shouldn\u2019t bypass',
    challengeTitleEm: 'your venue.',
    challengeCounter: {
      value: 46,
      suffix: '%',
      label: 'of Google searches for restaurants have local intent',
    },
    challengePoints: [
      {
        title: 'Incomplete GBP',
        body: 'Google Business Profile missing fields or inconsistent NAP.',
      },
      {
        title: 'Unindexed content',
        body: 'No location pages or menu content search engines can read.',
      },
      {
        title: 'Slow mobile site',
        body: 'Page speed hurts rankings and direct booking conversion.',
      },
      {
        title: 'Low review velocity',
        body: 'Competitors outpace you on fresh reviews and local signals.',
      },
    ],
    approach:
      'Local SEO programme: technical health, on-page menu and location content, GBP optimisation, citation consistency and content that matches how diners search in your area.',
    deliverables: [
      { title: 'Local audit', detail: 'Rankings snapshot, GBP health, site speed and competitor gap analysis.' },
      { title: 'On-page optimisation', detail: 'Titles, schema, menu pages and internal linking for local intent.' },
      { title: 'Google Business Profile', detail: 'Posts, photos, services, Q&A and review growth coordination.' },
      { title: 'Citation & NAP', detail: 'Directory consistency for name, address, phone across the web.' },
      { title: 'Monthly rank & traffic report', detail: 'Keyword movement, calls-from-search and direction requests.' },
    ],
    phases: [
      { phase: 'Month 1', title: 'Fix foundations', detail: 'Technical fixes, GBP completion and quick-win pages.' },
      { phase: 'Months 2–3', title: 'Content & authority', detail: 'Local content, backlinks where appropriate, review cadence.' },
      { phase: 'Ongoing', title: 'Defend & expand', detail: 'Monitor algorithm and competitor moves; adjust quarterly.' },
    ],
    included: ['Keyword tracking set', 'GBP post support', 'Coordination with reviews team', 'Quarterly strategy refresh'],
    metrics: [
      { value: 'Local', label: 'Search focus' },
      { value: 'GBP', label: 'Profile owned' },
      { value: 'Monthly', label: 'Rank reporting' },
    ],
    related: ['reviews-monitoring', 'social-media-marketing', 'weekly-performance-insights'],
  },
};

export function getServiceDetail(slug) {
  const base = services.find((s) => s.slug === slug);
  const detail = DETAILS[slug];
  if (!base || !detail) return null;
  const theme = getServiceTheme(slug);
  return { ...base, ...detail, theme };
}

export function getAllServiceSlugs() {
  return services.map((s) => s.slug);
}

export function serviceHeroTitle(name) {
  if (/^restaurant\b/i.test(name)) return name;
  return `Restaurant ${name.charAt(0).toLowerCase()}${name.slice(1)}`;
}

export function getRelatedServices(slugs) {
  return slugs.map((slug) => getServiceDetail(slug)).filter(Boolean);
}
