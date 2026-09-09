import { motion } from 'framer-motion';
import { workHero } from '../../../data/work';
import { fadeUp } from '../../../lib/aboutMotion';

export function WorkHero() {
  return (
    <section className="abt-hero">
      <motion.div
        className="abt-hero__inner"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
      >
        <motion.p className="abt-eyebrow" variants={fadeUp} custom={0}>
          {workHero.eyebrow}
        </motion.p>
        <motion.h1 className="abt-hero__title serif-display" variants={fadeUp} custom={1}>
          {workHero.title} <em>{workHero.titleEm}</em>
        </motion.h1>
      </motion.div>
    </section>
  );
}
