import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  applyHeroBarFills,
  HERO_CHART_SCROLL_RANGE,
} from '../data/heroChart';
import { prefersReducedMotion } from './scrollReveal';
import { MQ_TABLET_MAX } from './breakpoints';

gsap.registerPlugin(ScrollTrigger);

const MOBILE_QUERY = MQ_TABLET_MAX;

const SCRUB_SMOOTH = {
  desktop: 1.35,
  mobile: 1.05,
};

function readChartRange() {
  return window.matchMedia(MOBILE_QUERY).matches
    ? HERO_CHART_SCROLL_RANGE.mobile
    : HERO_CHART_SCROLL_RANGE.desktop;
}

function readChartScrub() {
  return window.matchMedia(MOBILE_QUERY).matches
    ? SCRUB_SMOOTH.mobile
    : SCRUB_SMOOTH.desktop;
}

/**
 * Scroll-scrubbed hero chart fills via GSAP (smooth, no React re-render per frame).
 * @param {React.RefObject<HTMLElement | null>} chartRef
 */
export function useHeroChartScroll(chartRef) {
  useLayoutEffect(() => {
    const chart = chartRef.current;
    if (!chart) return undefined;

    const hero = chart.closest('.v2-hero');
    if (!hero) return undefined;

    const bars = [...chart.querySelectorAll('.v2-hero__chart-bar')];
    if (!bars.length) return undefined;

    if (prefersReducedMotion()) {
      applyHeroBarFills(bars, 1);
      return undefined;
    }

    applyHeroBarFills(bars, 0);

    let trigger = null;
    const mobileQuery = window.matchMedia(MOBILE_QUERY);

    const bind = () => {
      trigger?.kill();
      trigger = ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: () => `+=${readChartRange()}`,
        scrub: readChartScrub(),
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          applyHeroBarFills(bars, self.progress);
        },
      });
      applyHeroBarFills(bars, trigger.progress);
    };

    bind();

    const onBreakpointChange = () => {
      bind();
      ScrollTrigger.refresh();
    };

    mobileQuery.addEventListener('change', onBreakpointChange);

    return () => {
      mobileQuery.removeEventListener('change', onBreakpointChange);
      trigger?.kill();
    };
  }, [chartRef]);
}
