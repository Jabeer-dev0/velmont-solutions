export const HERO_CHART_SCROLL_RANGE = {
  desktop: 440,
  mobile: 300,
};

/** Ascending bar heights as % of chart track (left → right = growth). */
export const heroChartBars = [
  14, 22, 30, 38, 46, 54, 62, 70, 78, 86, 93, 100,
];

/** Clamp and ease a 0–1 value (fast start, soft landing). */
export function easeOutCubic(t) {
  const x = Math.max(0, Math.min(1, t));
  return 1 - (1 - x) ** 3;
}

/**
 * Per-bar fill (0–1) for global scroll progress.
 * Bars fill left → right; a tiny overlap keeps handoffs from feeling stepped.
 */
export function getHeroBarFill(index, barCount, progress) {
  if (progress <= 0) return 0;
  if (progress >= 1) return 1;
  if (barCount <= 0) return 0;

  const segment = 1 / barCount;
  const overlap = segment * 0.12;
  const start = Math.max(0, index * segment - overlap);
  const end = Math.min(1, (index + 1) * segment);
  const span = end - start;
  if (span <= 0) return progress >= end ? 1 : 0;

  const t = (progress - start) / span;
  return easeOutCubic(t);
}

/** Apply fill values to chart bar elements. */
export function applyHeroBarFills(bars, progress) {
  const count = bars.length;
  bars.forEach((bar, index) => {
    bar.style.setProperty('--bar-fill', getHeroBarFill(index, count, progress).toFixed(4));
  });
}
