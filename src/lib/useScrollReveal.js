import { useLayoutEffect } from 'react';
import {
  animateProcessTimeline,
  animateStatCounters,
  parallaxY,
  revealFrom,
  revealStagger,
} from './scrollReveal';

export function useScrollReveal(ref, options = {}) {
  const { variant, delay, duration, start, rememberKey, enabled = true } = options;

  useLayoutEffect(() => {
    if (!enabled || !ref.current) return undefined;
    return revealFrom(ref.current, { variant, delay, duration, start, rememberKey });
  }, [ref, variant, delay, duration, start, rememberKey, enabled]);
}

export function useScrollRevealStagger(ref, options = {}) {
  const { variant, stagger, duration, start, targets, rememberKey, enabled = true } = options;

  useLayoutEffect(() => {
    if (!enabled || !ref.current) return undefined;
    return revealStagger(ref.current, { variant, stagger, duration, start, targets, rememberKey });
  }, [ref, variant, stagger, duration, start, targets, rememberKey, enabled]);
}

export function useParallax(ref, options = {}) {
  const { y, triggerRef, start, end, enabled = true } = options;

  useLayoutEffect(() => {
    if (!enabled || !ref.current) return undefined;
    const trigger =
      triggerRef?.current ?? ref.current.parentElement ?? ref.current;
    return parallaxY(ref.current, { y, trigger, start, end });
  }, [ref, triggerRef, y, start, end, enabled]);
}

export function useStatCounters(ref, options = {}) {
  const { start, stagger, enabled = true } = options;

  useLayoutEffect(() => {
    if (!enabled || !ref.current) return undefined;
    return animateStatCounters(ref.current, { start, stagger });
  }, [ref, start, stagger, enabled]);
}

export function useProcessTimeline(sectionRef, gridRef, enabled = true) {
  useLayoutEffect(() => {
    if (!enabled || !sectionRef.current || !gridRef.current) return undefined;
    return animateProcessTimeline(sectionRef.current, gridRef.current);
  }, [sectionRef, gridRef, enabled]);
}
