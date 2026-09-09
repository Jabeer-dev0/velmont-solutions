import { useEffect, useState } from 'react';

export const EASE_OUT = [0.22, 0.61, 0.36, 1];
export const EASE_SPRING = { type: 'spring', stiffness: 380, damping: 28 };

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: EASE_OUT },
  }),
};

export const fadeUpSm = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.06, ease: EASE_OUT },
  }),
};

export const slideLeft = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const staggerVisible = (stagger = 0.08, delayChildren = 0.04) => ({
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

export const viewOnce = { once: true, margin: '-8% 0px -8% 0px' };
