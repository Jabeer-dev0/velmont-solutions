import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './scrollReveal';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky 3D scroll stage (a la Macbook Scroll / Container Scroll).
 *
 * Pins a stage for a stretch of scroll and drives a 3D transform on the
 * card: starts tilted back in perspective, rotates flat + rises as you
 * scroll, then the inner screen content lifts into place. Pure scrub, so it
 * tracks the wheel exactly and reverses cleanly.
 *
 * Elements (scoped inside `section`):
 *   [data-stage3d]        - the pinned wrapper (gets the perspective)
 *   [data-stage3d-card]   - the rotating device/card
 *   [data-stage3d-lid]    - optional "lid"/top half that opens
 *   [data-stage3d-screen] - optional inner content that scales in
 */
export function animateStage3d(section, options = {}) {
  if (!section || prefersReducedMotion()) return () => {};

  const {
    pin = true,
    tilt = 42,
    end = '+=140%',
    start = 'top top',
  } = options;

  const stage = section.querySelector('[data-stage3d]');
  const card = section.querySelector('[data-stage3d-card]');
  const lid = section.querySelector('[data-stage3d-lid]');
  const screen = section.querySelector('[data-stage3d-screen]');
  if (!stage || !card) return () => {};

  const mm = gsap.matchMedia();

  mm.add(
    { isDesktop: '(min-width: 921px) and (pointer: fine)', reduce: '(prefers-reduced-motion: reduce)' },
    (ctx) => {
      const { isDesktop, reduce } = ctx.conditions;
      if (reduce) return undefined;

      const ctx2 = gsap.context(() => {
        gsap.set(card, {
          rotateX: isDesktop ? tilt : tilt * 0.5,
          transformPerspective: 1400,
          transformOrigin: '50% 100%',
          force3D: true,
        });
        if (lid) gsap.set(lid, { rotateX: 0, transformOrigin: '50% 100%', transformPerspective: 1400 });
        if (screen) gsap.set(screen, { scale: 1.08, autoAlpha: 0.35 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start,
            end,
            scrub: 0.8,
            pin: pin ? stage : false,
            pinSpacing: pin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Card rotates from tilted-back to face-on.
        tl.to(card, { rotateX: 0, ease: 'none', duration: 1 }, 0);

        // Lid/screen content lifts and settles.
        if (lid) tl.to(lid, { rotateX: -12, ease: 'none', duration: 0.7 }, 0.15);
        if (screen) tl.to(screen, { scale: 1, autoAlpha: 1, ease: 'none', duration: 0.8 }, 0.2);
      }, section);

      return () => ctx2.revert();
    },
  );

  return () => mm.revert();
}
