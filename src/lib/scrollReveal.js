import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { formatParsedStat, parseStatValue, snapStepForParsed } from './statValue';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ limitCallbacks: true });

function resolveStaggerTargets(container, targets) {
  if (targets == null) return [...container.children];
  if (typeof targets === 'string') return [...container.querySelectorAll(targets)];
  return Array.from(targets);
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** GPU-friendly reveal presets - opacity + transform only. */
export const REVEAL = {
  'fade-up': { y: 28, autoAlpha: 0 },
  'fade-up-sm': { y: 16, autoAlpha: 0 },
  'fade-in': { autoAlpha: 0 },
  'slide-left': { x: -36, autoAlpha: 0 },
  'slide-right': { x: 36, autoAlpha: 0 },
  'scale-up': { scale: 0.97, autoAlpha: 0 },
  'scale-in': { scale: 0.97, autoAlpha: 0 },
};

const EASE = 'power2.out';
const playedRevealKeys = new Set();

function scrollTriggerConfig(trigger, start = 'top 85%') {
  return {
    trigger,
    start,
    once: true,
    fastScrollEnd: true,
  };
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

function setRevealInitial(el, variant) {
  const preset = REVEAL[variant] ?? REVEAL['fade-up'];
  gsap.set(el, preset);
}

/** Single element - reveals once when scrolled into view. */
export function revealFrom(el, options = {}) {
  if (!el || prefersReducedMotion()) return () => {};

  const {
    variant = 'fade-up',
    delay = 0,
    duration = 0.72,
    start = 'top 85%',
    rememberKey,
  } = options;

  if (rememberKey && playedRevealKeys.has(rememberKey)) {
    gsap.set(el, { x: 0, y: 0, scale: 1, autoAlpha: 1 });
    return () => {};
  }

  const ctx = gsap.context(() => {
    setRevealInitial(el, variant);
    gsap.to(el, {
      y: 0,
      x: 0,
      scale: 1,
      autoAlpha: 1,
      duration,
      delay,
      ease: EASE,
      onComplete: () => {
        if (rememberKey) playedRevealKeys.add(rememberKey);
      },
      scrollTrigger: scrollTriggerConfig(el, start),
    });
  }, el);

  return () => ctx.revert();
}

/** Stagger children (or explicit targets) inside a container. */
export function revealStagger(container, options = {}) {
  if (!container || prefersReducedMotion()) return () => {};

  const {
    variant = 'fade-up',
    stagger = 0.08,
    duration = 0.68,
    start = 'top 84%',
    targets,
    rememberKey,
  } = options;

  const elements = resolveStaggerTargets(container, targets);
  if (!elements.length) return () => {};

  if (rememberKey && playedRevealKeys.has(rememberKey)) {
    gsap.set(elements, { x: 0, y: 0, scale: 1, autoAlpha: 1 });
    return () => {};
  }

  const ctx = gsap.context(() => {
    elements.forEach((el) => setRevealInitial(el, variant));
    gsap.to(elements, {
      y: 0,
      x: 0,
      scale: 1,
      autoAlpha: 1,
      duration,
      stagger,
      ease: EASE,
      onComplete: () => {
        if (rememberKey) playedRevealKeys.add(rememberKey);
      },
      scrollTrigger: scrollTriggerConfig(container, start),
    });
  }, container);

  return () => ctx.revert();
}

/** Count-up for metric numbers inside a container. */
export function animateStatCounters(container, options = {}) {
  if (!container) return () => {};

  const { start = 'top 85%', stagger = 0.12 } = options;
  const nodes = [...container.querySelectorAll('[data-stat-value]')];
  if (!nodes.length) return () => {};

  if (prefersReducedMotion()) {
    nodes.forEach((el) => {
      const parsed = parseStatValue(el.getAttribute('data-stat-value') ?? '');
      el.textContent = formatParsedStat(parsed);
    });
    return () => {};
  }

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: scrollTriggerConfig(container, start),
    });

    nodes.forEach((el, index) => {
      const raw = el.getAttribute('data-stat-value') ?? '';
      const parsed = parseStatValue(raw);
      const metric = el.closest('.v2-show__metric') ?? el.closest('.sd-partner__metric');

      if (parsed.kind === 'text') {
        gsap.set(el, { autoAlpha: 0, y: 12 });
        tl.to(
          el,
          { autoAlpha: 1, y: 0, duration: 0.55, ease: EASE },
          index * stagger,
        );
        tl.call(() => {
          el.textContent = parsed.display;
        }, null, index * stagger);
        if (metric) {
          tl.fromTo(metric, { autoAlpha: 0.6 }, { autoAlpha: 1, duration: 0.4 }, index * stagger);
        }
        return;
      }

      const counter = { value: 0 };
      gsap.set(el, { autoAlpha: 0, y: 14 });
      if (metric) gsap.set(metric, { autoAlpha: 0.85 });

      tl.to(
        el,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: EASE,
        },
        index * stagger,
      );

      tl.to(
        counter,
        {
          value: parsed.end,
          duration: 1.35,
          ease: 'power2.out',
          snap: { value: snapStepForParsed(parsed) },
          onUpdate: () => {
            el.textContent = formatParsedStat(parsed, counter.value);
          },
        },
        index * stagger + 0.05,
      );

      if (metric) {
        tl.to(metric, { autoAlpha: 1, duration: 0.35 }, index * stagger);
      }
    });
  }, container);

  return () => ctx.revert();
}

const PROCESS_DESKTOP = '(min-width: 921px)';

function clearProcessSegments(cols) {
  cols.slice(0, -1).forEach((col) => col.style.removeProperty('--process-seg-scale'));
}

/** Same motion language as revealStagger - segment draw + column fade-up. */
export function animateProcessTimeline(section, grid) {
  if (!section || !grid) return () => {};

  const cols = [...grid.querySelectorAll('.v2-process__col')];
  if (!cols.length) return () => {};

  const segmentCols = cols.slice(0, -1);

  if (prefersReducedMotion()) {
    grid.classList.add('is-complete');
    return () => {};
  }

  const isDesktop = () => window.matchMedia(PROCESS_DESKTOP).matches;

  const ctx = gsap.context(() => {
    let subCleanup = () => {};

    const build = () => {
      subCleanup();
      subCleanup = () => {};
      grid.classList.remove('is-complete');
      gsap.killTweensOf(cols);
      ScrollTrigger.getById('process-timeline')?.kill();

      const cardTargets = cols
        .map((col) => col.querySelector('.v2-process__step'))
        .filter(Boolean);

      if (!isDesktop()) {
        clearProcessSegments(cols);
        subCleanup = revealStagger(grid, {
          targets: cardTargets,
          variant: 'fade-up-sm',
          stagger: 0.1,
          start: 'top 85%',
          duration: 0.72,
        });
        return;
      }

      clearProcessSegments(cols);
      segmentCols.forEach((col) => col.style.setProperty('--process-seg-scale', '0'));
      cols.forEach((col) => setRevealInitial(col, 'fade-up-sm'));

      const tl = gsap.timeline({
        scrollTrigger: {
          ...scrollTriggerConfig(grid, 'top 85%'),
          id: 'process-timeline',
        },
        onComplete: () => {
          grid.classList.add('is-complete');
          gsap.set(cols, { clearProps: 'transform,opacity,visibility' });
          clearProcessSegments(cols);
        },
      });

      if (segmentCols.length) {
        tl.to(
          segmentCols,
          {
            '--process-seg-scale': 1,
            duration: 0.82,
            stagger: 0.08,
            ease: 'power2.inOut',
          },
          0,
        );
      }

      tl.to(
        cols,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.72,
          stagger: 0.1,
          ease: EASE,
        },
        segmentCols.length ? 0.08 : 0,
      );

      subCleanup = () => {
        ScrollTrigger.getById('process-timeline')?.kill();
        tl.kill();
        grid.classList.remove('is-complete');
      };
    };

    build();

    const mm = window.matchMedia(PROCESS_DESKTOP);
    const onChange = () => {
      build();
      refreshScrollTriggers();
    };
    mm.addEventListener('change', onChange);

    return () => {
      mm.removeEventListener('change', onChange);
      subCleanup();
    };
  }, section);

  return () => ctx.revert();
}

/** Services hero metric cards - staggered entrance, accent draw, count-up. */
export function animateSvcHeroMetrics(container, options = {}) {
  if (!container) return () => {};

  const { delay = 0.52, stagger = 0.085 } = options;
  const cards = [...container.querySelectorAll('.svc-hero__metric')];
  if (!cards.length) return () => {};

  const valueNodes = [...container.querySelectorAll('[data-stat-value]')];

  if (prefersReducedMotion()) {
    valueNodes.forEach((el) => {
      const parsed = parseStatValue(el.getAttribute('data-stat-value') ?? '');
      el.textContent = formatParsedStat(parsed);
    });
    gsap.set(cards, { autoAlpha: 1, y: 0, scale: 1 });
    cards.forEach((card) => {
      const accent = card.querySelector('.svc-hero__metric-accent');
      const label = card.querySelector('.svc-hero__metric-label');
      if (accent) gsap.set(accent, { scaleX: 1 });
      if (label) gsap.set(label, { autoAlpha: 1, y: 0 });
      gsap.set(card.querySelector('.svc-hero__metric-value'), { autoAlpha: 1, y: 0 });
    });
    return () => {};
  }

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ delay, defaults: { ease: EASE } });

    cards.forEach((card, index) => {
      const accent = card.querySelector('.svc-hero__metric-accent');
      const label = card.querySelector('.svc-hero__metric-label');
      const valueEl = card.querySelector('[data-stat-value]');
      const at = index * stagger;

      gsap.set(card, { autoAlpha: 0, y: 26, scale: 0.94 });
      if (accent) gsap.set(accent, { scaleX: 0, transformOrigin: 'left center' });
      if (label) gsap.set(label, { autoAlpha: 0, y: 6 });
      if (valueEl) gsap.set(valueEl, { autoAlpha: 0, y: 12 });

      tl.to(
        card,
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.62 },
        at,
      );

      if (accent) {
        tl.to(accent, { scaleX: 1, duration: 0.38, ease: 'power2.out' }, at + 0.08);
      }

      if (valueEl) {
        const parsed = parseStatValue(valueEl.getAttribute('data-stat-value') ?? '');
        tl.to(valueEl, { autoAlpha: 1, y: 0, duration: 0.42 }, at + 0.1);

        if (parsed.kind === 'number') {
          const counter = { value: 0 };
          tl.to(
            counter,
            {
              value: parsed.end,
              duration: 1.15,
              ease: 'power2.out',
              snap: { value: snapStepForParsed(parsed) },
              onUpdate: () => {
                valueEl.textContent = formatParsedStat(parsed, counter.value);
              },
            },
            at + 0.14,
          );
        } else {
          tl.call(() => {
            valueEl.textContent = parsed.display;
          }, null, at + 0.14);
        }
      }

      if (label) {
        tl.to(label, { autoAlpha: 1, y: 0, duration: 0.38 }, at + 0.32);
      }
    });
  }, container);

  return () => ctx.revert();
}

/** Above-the-fold hero entrance - time-based, not scroll. */
export function heroEntrance(root, steps) {
  if (!root || prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: EASE } });
    steps.forEach(({ el, variant = 'fade-up-sm', duration = 0.72, at = 0 }) => {
      if (!el) return;
      setRevealInitial(el, variant);
      tl.to(
        el,
        { y: 0, x: 0, scale: 1, autoAlpha: 1, duration },
        at,
      );
    });
  }, root);

  return () => ctx.revert();
}

/** Subtle scroll-linked parallax for backgrounds. */
export function parallaxY(el, options = {}) {
  if (!el || prefersReducedMotion()) return () => {};

  const { y = 28, trigger, start = 'top bottom', end = 'bottom top' } = options;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      el,
      { y: -y * 0.25 },
      {
        y: y * 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger ?? el.parentElement ?? el,
          start,
          end,
          scrub: 1.1,
          fastScrollEnd: true,
        },
      },
    );
  }, el);

  return () => ctx.revert();
}
