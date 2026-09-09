/** Unique mini-chart shapes per case study — paths in 64×48 viewBox */

export const workCaseSparklines = {
  'market-street-bistro': {
    variant: 'marketing',
    progress: 86,
    path: 'M4 42 L14 36 L24 28 L36 18 L48 12 L56 6',
    fill: 'M4 42 L14 36 L24 28 L36 18 L48 12 L56 6 L56 46 L4 46 Z',
    start: [4, 42],
    end: [56, 6],
  },
  'firestone-pizza': {
    variant: 'operations',
    progress: 92,
    path: 'M4 40 L18 40 L18 30 L32 30 L32 20 L46 20 L46 12 L56 12',
    fill: 'M4 40 L18 40 L18 30 L32 30 L32 20 L46 20 L46 12 L56 12 L56 46 L4 46 Z',
    start: [4, 40],
    end: [56, 12],
  },
  'riverside-brasserie': {
    variant: 'operations',
    progress: 81,
    path: 'M4 38 L12 34 L22 28 L32 24 L42 18 L52 14 L56 12',
    fill: 'M4 38 L12 34 L22 28 L32 24 L42 18 L52 14 L56 12 L56 46 L4 46 Z',
    start: [4, 38],
    end: [56, 12],
  },
  'north-lane-kitchen': {
    variant: 'marketing',
    progress: 74,
    path: 'M4 36 L20 35 L32 34 L40 30 L46 14 L56 4',
    fill: 'M4 36 L20 35 L32 34 L40 30 L46 14 L56 4 L56 46 L4 46 Z',
    start: [4, 36],
    end: [56, 4],
  },
  'harbour-family': {
    variant: 'marketing',
    progress: 88,
    path: 'M4 40 L10 38 L16 36 L22 32 L28 30 L34 26 L40 22 L46 18 L52 14 L56 10',
    fill: 'M4 40 L10 38 L16 36 L22 32 L28 30 L34 26 L40 22 L46 18 L52 14 L56 10 L56 46 L4 46 Z',
    start: [4, 40],
    end: [56, 10],
  },
  'coastal-seafood': {
    variant: 'reputation',
    progress: 68,
    path: 'M4 26 L12 30 L20 36 L28 34 L38 26 L48 16 L56 10',
    fill: 'M4 26 L12 30 L20 36 L28 34 L38 26 L48 16 L56 10 L56 46 L4 46 Z',
    start: [4, 26],
    end: [56, 10],
    mid: [20, 36],
  },
};

export function getCaseSparkline(caseId) {
  return workCaseSparklines[caseId] ?? workCaseSparklines['market-street-bistro'];
}
