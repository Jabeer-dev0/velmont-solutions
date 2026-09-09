import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { fadeUp, viewOnce } from '../../lib/aboutMotion';

/**
 * Sticky problem / challenge block - shared by About and service detail pages.
 */
export function ProblemSection({
  id = 'problem',
  className = 'abt-problem v2-section',
  eyebrow,
  title,
  titleEm,
  lead,
  counter,
  pains,
}) {
  const lineRef = useRef(null);
  const inView = useInView(lineRef, viewOnce);

  return (
    <section className={className} id={id}>
      <div className="abt-problem__layout">
        <motion.aside
          className="abt-problem__sticky"
          initial="hidden"
          whileInView="visible"
          viewport={viewOnce}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.p className="abt-eyebrow" variants={fadeUp} custom={0}>
            {eyebrow}
          </motion.p>
          <motion.h2 className="abt-problem__title serif-display" variants={fadeUp} custom={1}>
            {title} <em>{titleEm}</em>
          </motion.h2>
          <motion.p className="abt-problem__lead" variants={fadeUp} custom={2}>
            {lead}
          </motion.p>
          {counter && (
            <motion.div className="abt-problem__stat" variants={fadeUp} custom={3}>
              <AnimatedCounter value={counter.value} suffix={counter.suffix} />
              <span className="abt-problem__stat-label">{counter.label}</span>
            </motion.div>
          )}
        </motion.aside>

        <div className="abt-problem__stream">
          <div className="abt-problem__line" aria-hidden="true" ref={lineRef}>
            <motion.span
              className="abt-problem__line-fill"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
            />
          </div>
          {pains.map((pain, i) => (
            <motion.article
              className="abt-pain"
              key={pain.title}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewOnce}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <span className="abt-pain__index">{String(i + 1).padStart(2, '0')}</span>
              <div className="abt-pain__body">
                <h3>{pain.title}</h3>
                <p>{pain.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
