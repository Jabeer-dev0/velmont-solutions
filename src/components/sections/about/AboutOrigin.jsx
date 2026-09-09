import { motion } from 'framer-motion';
import { AboutOriginTimeline } from '../../about/AboutOriginTimeline';
import { fadeUp, viewOnce } from '../../../lib/aboutMotion';

export function AboutOrigin() {
  return (
    <section className="abt-origin v2-section v2-section--band" id="origin">
      <motion.div
        className="abt-origin__head"
        initial="hidden"
        whileInView="visible"
        viewport={viewOnce}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.p className="abt-eyebrow" variants={fadeUp} custom={0}>
          Origin story
        </motion.p>
        <motion.h2 className="abt-origin__title serif-display" variants={fadeUp} custom={1}>
          How Velmont <em>came to be.</em>
        </motion.h2>
        <motion.p className="abt-origin__lead" variants={fadeUp} custom={2}>
          Four milestones on one spine. From the first insight to the weekly rhythm partners rely on today.
        </motion.p>
      </motion.div>

      <div className="abt-origin__timeline-wrap">
        <AboutOriginTimeline />
      </div>
    </section>
  );
}
