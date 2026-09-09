/** @typedef {{ text: string, em?: boolean }} HeroHeadlinePart */

/** @typedef {HeroHeadlinePart[]} HeroHeadline */

export const heroHeadlines = [
  [
    { text: 'We build smart systems that grow ' },
    { text: 'modern', em: true },
    { text: ' restaurants with complete confidence.' },
  ],
  [
    { text: 'We turn marketing, reviews and ops into ' },
    { text: 'real', em: true },
    { text: ' sustainable restaurant growth.' },
  ],
];

/** @param {HeroHeadline} headline */
export function headlineToPlainText(headline) {
  return headline.map((part) => part.text).join('');
}
