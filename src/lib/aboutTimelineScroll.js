import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { buildSnakePath } from './aboutTimelinePath';

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * SVG track (full path) + SVG fill (scroll progress) + dot.
 * @param {HTMLElement} root - .abt-timeline
 */
export function initAboutTimelineScroll(root) {
  if (!root) return () => {};

  const outer = root.querySelector('.abt-timeline__outer') ?? root;
  const trackSvg = outer.querySelector('.abt-timeline__svg--track');
  const progressSvg = outer.querySelector('.abt-timeline__svg--progress');
  const track = outer.querySelector('.abt-timeline__track');
  const fill = outer.querySelector('.abt-timeline__fill');
  const dot = outer.querySelector('.abt-timeline__dot');

  if (!outer || !trackSvg || !progressSvg || !track || !fill || !dot) return () => {};

  const state = { progress: 0 };
  let scrollTween = null;
  let resizeObserver = null;
  let pathLength = 0;

  const applyProgress = (progress) => {
    const p = Math.max(0, Math.min(1, progress));
    const drawn = pathLength * p;
    fill.style.strokeDashoffset = String(pathLength - drawn);
    const point = fill.getPointAtLength(drawn);
    dot.setAttribute('cx', String(point.x));
    dot.setAttribute('cy', String(point.y));
    dot.style.opacity = p > 0.002 ? '1' : '0';
  };

  const layout = () => {
    const cards = [...outer.querySelectorAll('.abt-timeline__card')];
    if (!cards.length) return;

    const width = outer.offsetWidth;
    const height = outer.offsetHeight;
    const pathD = buildSnakePath(cards, outer);

    for (const svg of [trackSvg, progressSvg]) {
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svg.setAttribute('width', String(width));
      svg.setAttribute('height', String(height));
    }
    track.setAttribute('d', pathD);
    fill.setAttribute('d', pathD);

    pathLength = fill.getTotalLength();
    fill.style.strokeDasharray = String(pathLength);
    applyProgress(state.progress);

    root.classList.add('abt-timeline--active');
  };

  const bindScroll = () => {
    scrollTween?.scrollTrigger?.kill();
    scrollTween?.kill();

    if (prefersReducedMotion()) {
      state.progress = 1;
      applyProgress(1);
      return;
    }

    scrollTween = gsap.to(state, {
      progress: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top 75%',
        end: 'bottom 20%',
        /* true = locked to scroll; numeric scrub lags and yanks when scrolling resumes */
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          state.progress = self.progress;
          applyProgress(self.progress);
        },
      },
    });

    const st = scrollTween.scrollTrigger;
    if (st) {
      state.progress = st.progress;
      applyProgress(st.progress);
    }
  };

  let lastOuterW = 0;
  let lastOuterH = 0;

  const remeasure = () => {
    layout();
    bindScroll();
    lastOuterW = outer.offsetWidth;
    lastOuterH = outer.offsetHeight;
  };

  remeasure();

  resizeObserver = new ResizeObserver(() => {
    const w = outer.offsetWidth;
    const h = outer.offsetHeight;
    if (w === lastOuterW && h === lastOuterH) return;
    lastOuterW = w;
    lastOuterH = h;
    requestAnimationFrame(remeasure);
  });
  resizeObserver.observe(outer);

  const onLoad = () => remeasure();
  window.addEventListener('load', onLoad);

  return () => {
    window.removeEventListener('load', onLoad);
    resizeObserver?.disconnect();
    scrollTween?.scrollTrigger?.kill();
    scrollTween?.kill();
    root.classList.remove('abt-timeline--active');
  };
}
