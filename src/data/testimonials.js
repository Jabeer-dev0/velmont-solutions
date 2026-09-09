/**
 * Client testimonials for the homepage showcase carousel.
 * Warm, grateful B2B tone. Varied brand naming across reviews.
 */
export const showcaseTestimonials = [
  {
    id: 'james-r-copper-room',
    quote:
      'We view Velmont Solutions as an extension of our group and truly feel they are invested in filling our tables. The attention across social, reviews and reporting is unmatched, and we could not be happier with the partnership.',
    name: 'James R.',
    role: 'Owner',
    venue: 'Independent restaurant group',
    location: 'London & Surrey',
  },
  {
    id: 'priya-m-grill',
    quote:
      'Velmont stepped in when we were missing calls at the busiest times and treated every booking like their own. They listen, they follow through, and we are genuinely thankful for the difference it has made to our weekend service.',
    name: 'Priya M.',
    role: 'Owner',
    venue: 'Neighbourhood grill',
    location: 'Bristol',
  },
  {
    id: 'marco-t-italian',
    quote:
      'We could not have rebuilt our local visibility without a partner who cared as much as we did. Velmont Solutions treated our Google presence like a priority, and we honestly feel they want our restaurant to succeed as much as we do.',
    name: 'Marco T.',
    role: 'General Manager',
    venue: 'City-centre Italian',
    location: 'Manchester',
  },
  {
    id: 'helen-w-gastropub',
    quote:
      'What stood out from day one was how personally Velmont\'s team looked after our reputation. They helped us respond with care and consistency, and we are grateful every week that someone competent is watching our reviews.',
    name: 'Helen W.',
    role: 'Co-owner',
    venue: 'Gastropub',
    location: 'Leeds',
  },
  {
    id: 'daniel-k-pizza',
    quote:
      'Velmont feels like part of our operations team. The weekly insight is clear and practical, and we could not be happier with how they support every site in our group.',
    name: 'Daniel K.',
    role: 'Operations lead',
    venue: 'Multi-site pizza group',
    location: 'Birmingham',
  },
];

export function formatTestimonialAttribution({ name, role, venue, location }) {
  return `${name} · ${role}, ${venue.toLowerCase()} · ${location}`;
}
