import { motion } from 'framer-motion';
import { aboutHero } from '../../../data/about';
import { fadeUp } from '../../../lib/aboutMotion';

export function AboutHero() {
  return (
    <section className="abt-hero">
      <motion.div
        className="abt-hero__inner"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
      >
        <motion.p className="abt-eyebrow" variants={fadeUp} custom={0}>
          {aboutHero.eyebrow}
        </motion.p>
        <motion.h1 className="abt-hero__title serif-display" variants={fadeUp} custom={1}>
          {aboutHero.title} <em>{aboutHero.titleEm}</em>
        </motion.h1>
      </motion.div>
    </section>
  );
}
