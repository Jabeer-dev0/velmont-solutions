import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { usePrefersReducedMotion, viewOnce } from '../../lib/aboutMotion';

export function AnimatedCounter({ value, suffix, className = 'abt-problem__stat-value' }) {
  const ref = useRef(null);
  const inView = useInView(ref, viewOnce);
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return undefined;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  const shown = reduced ? value : display;

  return (
    <span ref={ref} className={className}>
      {shown}
      {suffix}
    </span>
  );
}
