import gsap from 'gsap';
import { prefersReducedMotion } from './scrollReveal';

export const HERO_OPEN_EVENT = 'hero-open-complete';

/** Orchestrated above-the-fold entrance for the home hero. */
export function runHomeHeroOpening(section) {
  if (!section || prefersReducedMotion()) {
    section?.classList.add('is-open');
    section?.dispatchEvent(new CustomEvent(HERO_OPEN_EVENT));
    return () => {};
  }

  const label = section.querySelector('.v2-label');
  const currentLine = section.querySelector('.v2-hero__text-line.is-current');
  const chars = currentLine ? [...currentLine.querySelectorAll('.v2-hero__char')] : [];
  const actions = section.querySelector('.v2-hero__actions');
  const trust = section.querySelector('.v2-hero__trust');
  const avatars = [...section.querySelectorAll('.v2-hero__avatars span')];
  const bars = [...section.querySelectorAll('.v2-hero__chart-bar')];
  const chart = section.querySelector('.v2-hero__chart');

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        section.classList.add('is-open');
        section.dispatchEvent(new CustomEvent(HERO_OPEN_EVENT));
      },
    });

    if (chart) {
      gsap.set(chart, { y: 20, autoAlpha: 0 });
      tl.to(chart, { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out' }, 0.38);
    }

    bars.forEach((bar) => {
      gsap.set(bar, { '--bar-fill': 0 });
    });

    if (label) {
      gsap.set(label, { y: 18, autoAlpha: 0 });
      tl.to(label, { y: 0, autoAlpha: 1, duration: 0.62 }, 0.18);
    }

    if (chars.length) {
      gsap.set(chars, {
        opacity: 0,
        yPercent: 48,
        xPercent: () => gsap.utils.random(-12, 12),
        transformOrigin: '50% 100%',
      });
      tl.to(
        chars,
        {
          opacity: 1,
          yPercent: 0,
          xPercent: 0,
          duration: 0.52,
          stagger: { each: 0.016, from: 'start' },
          ease: 'power4.out',
        },
        0.3,
      );
    }

    if (actions) {
      gsap.set(actions, { y: 24, autoAlpha: 0 });
      tl.to(actions, { y: 0, autoAlpha: 1, duration: 0.72 }, 0.78);
    }

    if (trust) {
      gsap.set(trust, { y: 16, autoAlpha: 0 });
      tl.to(trust, { y: 0, autoAlpha: 1, duration: 0.65 }, 0.92);
    }

    if (avatars.length) {
      gsap.set(avatars, { scale: 0.55, autoAlpha: 0, transformOrigin: '50% 50%' });
      tl.to(avatars, { scale: 1, autoAlpha: 1, duration: 0.42, stagger: 0.07 }, 1);
    }
  }, section);

  return () => ctx.revert();
}
