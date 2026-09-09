import { site } from './site';

export const privacyMeta = {
  eyebrow: 'Legal',
  title: 'Privacy',
  titleEm: 'policy.',
  effectiveDate: '4 June 2026',
  lastReviewed: '4 June 2026',
};

export const privacySections = [
  {
    id: 'who-we-are',
    num: '01',
    title: 'Who we are',
    paragraphs: [
      `${site.legalName} ("Velmont Solutions", "Velmont", "we", "us") is the data controller for personal data described in this policy. We are a UK restaurant growth partner based at ${site.address}.`,
      `For any privacy question, email ${site.email} or call ${site.phone}. We do not have a dedicated Data Protection Officer; our team handles requests directly.`,
    ],
  },
  {
    id: 'what-we-collect',
    num: '02',
    title: 'What personal data we collect',
    paragraphs: ['We collect personal data in these situations:'],
    bullets: [
      'Contact form: name, email, phone (optional), business name, topic and message.',
      'Email, phone or WhatsApp: whatever you choose to share when you get in touch.',
      'Discovery calls: notes about your restaurant, goals and channels to prepare a useful reply or proposal.',
      'Client work: account contacts, campaign assets and reporting data needed to deliver agreed services.',
      'Website: essential technical data (such as server logs) required to keep the site secure and running.',
    ],
    footnote: 'We do not intentionally collect special category data (such as health information) through this website.',
  },
  {
    id: 'how-we-use',
    num: '03',
    title: 'How and why we use your data',
    paragraphs: ['We use personal data for specific purposes and only where we have a lawful basis:'],
    table: [
      {
        purpose: 'Respond to enquiries and schedule discovery calls',
        basis: 'Legitimate interest: answering requests from people who contact us',
      },
      {
        purpose: 'Prepare proposals and deliver contracted services',
        basis: 'Contract: steps before a contract and performance of our agreement',
      },
      {
        purpose: 'Keep business records and improve how we work',
        basis: 'Legitimate interest: limited internal record-keeping and service improvement',
      },
      {
        purpose: 'Comply with law (e.g. tax or accounting)',
        basis: 'Legal obligation',
      },
      {
        purpose: 'Marketing emails you explicitly opt into',
        basis: 'Consent: you can withdraw at any time',
      },
    ],
  },
  {
    id: 'sharing',
    num: '04',
    title: 'Who we share data with',
    paragraphs: [
      'We do not sell personal data. We use suppliers who process data on our instructions, such as website hosting, email delivery, form handling, CRM or project tools.',
      'Those suppliers must protect your data and only use it for the services they provide to us. We assess providers before we use them and use contracts where required by UK GDPR.',
      'If we are legally required to disclose information (for example by court order), we will do so only to the extent required.',
    ],
  },
  {
    id: 'retention',
    num: '05',
    title: 'How long we keep data',
    paragraphs: ['We keep personal data only as long as necessary for the purpose we collected it:'],
    bullets: [
      'General enquiries: up to 24 months after our last meaningful contact, unless you become a client.',
      'Clients: for the duration of the contract and up to 7 years after where needed for tax, accounting or legal claims.',
      'Marketing consent: until you withdraw consent or we no longer use that channel.',
      'Server logs: typically up to 90 days for security and troubleshooting.',
    ],
  },
  {
    id: 'security',
    num: '06',
    title: 'How we protect data',
    paragraphs: [
      'We use appropriate technical and organisational measures, access controls, secure hosting, staff confidentiality and limited access to client data.',
      'No online transmission is completely risk-free. Please avoid sending sensitive information through the contact form; use email or phone if you need a more secure channel.',
    ],
  },
  {
    id: 'your-rights',
    num: '07',
    title: 'Your rights',
    paragraphs: [
      'Under UK GDPR you have the right to access your personal data, correct inaccurate data, request deletion, restrict or object to certain processing, and data portability where it applies.',
      'If we rely on consent, you can withdraw it at any time without affecting processing that already happened lawfully.',
      `To exercise any right, email ${site.email}. We respond within one month in most cases.`,
    ],
  },
  {
    id: 'complaints',
    num: '08',
    title: 'Complaints',
    paragraphs: [
      'If you are unhappy with how we handle your data, contact us first so we can try to resolve it.',
      'You also have the right to complain to the Information Commissioner\'s Office (ICO), the UK supervisory authority for data protection: ico.org.uk/make-a-complaint.',
    ],
  },
  {
    id: 'cookies',
    num: '09',
    title: 'Cookies and similar technologies',
    paragraphs: [
      'This website currently uses essential cookies and local storage only for basic functionality (for example keeping the site working securely). We do not use analytics or advertising cookies at present.',
      'If that changes, we will update this policy and, where required, ask for your consent before non-essential cookies are set.',
    ],
  },
  {
    id: 'changes',
    num: '10',
    title: 'Changes to this policy',
    paragraphs: [
      'We review this policy at least once a year and whenever our processing changes in a meaningful way. The effective date at the top of this page shows the latest version.',
      'For significant changes, we will update this page and adjust the effective date. Continued use of the site after changes means you accept the updated policy.',
    ],
  },
];

export const privacyCta = {
  title: 'Questions about your',
  titleEm: 'data?',
  lead: 'Email us with your request. We respond personally, usually within one business day.',
  trust: 'UK-based · Plain English · No mailing lists without consent',
};
