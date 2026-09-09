import { motion } from 'framer-motion';
import { contactHero } from '../../../data/contact';
import { fadeUp, usePrefersReducedMotion } from '../../../lib/aboutMotion';

export function ContactHero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="abt-hero ctc-hero">
      <motion.div
        className="abt-hero__inner"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: reduced ? 0 : 0.09 } },
        }}
      >
        <motion.p className="abt-eyebrow" variants={fadeUp} custom={0}>
          {contactHero.eyebrow}
        </motion.p>
        <motion.h1 className="abt-hero__title serif-display" variants={fadeUp} custom={1}>
          {contactHero.title} <em>{contactHero.titleEm}</em>
        </motion.h1>
        <motion.p className="ctc-hero__availability" variants={fadeUp} custom={2}>
          <span className="ctc-hero__pulse" aria-hidden="true" />
          {contactHero.availability}
        </motion.p>
      </motion.div>
    </section>
  );
}
