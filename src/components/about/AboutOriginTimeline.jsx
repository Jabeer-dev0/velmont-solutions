import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { aboutTimeline } from '../../data/about';
import { initAboutTimelineScroll } from '../../lib/aboutTimelineScroll';
import { refreshScrollTriggers } from '../../lib/scrollReveal';
import { viewOnce } from '../../lib/aboutMotion';

export function AboutOriginTimeline() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return undefined;

    let cleanup = () => {};
    let frame2 = 0;

    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        cleanup = initAboutTimelineScroll(root) ?? (() => {});
        refreshScrollTriggers();
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
      cleanup();
    };
  }, []);

  return (
    <div className="abt-timeline" ref={timelineRef} role="list" aria-label="Velmont origin milestones">
      <div className="abt-timeline__outer">
        <svg className="abt-timeline__svg abt-timeline__svg--track" aria-hidden="true">
          <path className="abt-timeline__track" fill="none" />
        </svg>
        <svg className="abt-timeline__svg abt-timeline__svg--progress" aria-hidden="true">
          <path className="abt-timeline__fill" fill="none" />
          <circle className="abt-timeline__dot" r="7" />
        </svg>
        {aboutTimeline.map((step, i) => (
          <motion.div
            key={step.year}
            className={[
              'abt-timeline__card',
              i % 2 === 0 ? 'abt-timeline__card--odd' : 'abt-timeline__card--even',
              i === 0 ? 'abt-timeline__card--first' : '',
              i === aboutTimeline.length - 1 ? 'abt-timeline__card--last' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            role="listitem"
            data-year={step.year}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewOnce}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="abt-timeline__info">
              <p className="abt-timeline__phase">{step.phase}</p>
              <h3 className="abt-timeline__title">
                <span className="sr-only">{step.year}. </span>
                {step.title}
              </h3>
              <p className="abt-timeline__text">{step.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
