import { useLayoutEffect } from 'react';
import { prefersReducedMotion } from './scrollReveal';

const MOVE_EASING = 'transform .16s ease-out';
const RESET_EASING = 'transform .55s cubic-bezier(.22,.61,.36,1)';

/**
 * 3D tilt + glare on hover for cards inside a container.
 * Mark targets with [data-tilt]; this hook listens on the container
 * so cards rendered in a map don't need individual refs.
 * Fine pointers only - touch and reduced-motion users keep the static design.
 */
export function useTilt3d(ref, options = {}) {
  const { selector = '[data-tilt]', max = 6, lift = 4 } = options;

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer || prefersReducedMotion()) return undefined;

    let frame = 0;
    let active = null;

    const onMove = (event) => {
      const el = event.target?.closest?.(selector);
      if (!el || !root.contains(el)) return;

      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rotateY = (px - 0.5) * max * 2;
        const rotateX = (0.5 - py) * max * 2;
        el.style.transition = MOVE_EASING;
        el.style.transform =
          `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) ` +
          `rotateY(${rotateY.toFixed(2)}deg) translateY(-${lift}px)`;
        el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
        el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
        el.classList.add('is-tilting');
        active = el;
      });
    };

    const release = () => {
      cancelAnimationFrame(frame);
      if (!active) return;
      active.style.transition = RESET_EASING;
      active.style.removeProperty('transform');
      active.classList.remove('is-tilting');
      active = null;
    };

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', release);

    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', release);
      release();
    };
  }, [ref, selector, max, lift]);
}
