import { motion } from 'framer-motion';
import { privacyMeta } from '../../../data/privacy';
import { fadeUp, fadeUpSm } from '../../../lib/aboutMotion';

export function PrivacyHero() {
  return (
    <section className="abt-hero leg-hero">
      <motion.div
        className="abt-hero__inner"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
      >
        <motion.p className="abt-eyebrow" variants={fadeUpSm} custom={0}>
          {privacyMeta.eyebrow}
        </motion.p>
        <motion.h1 className="abt-hero__title serif-display" variants={fadeUp} custom={1}>
          {privacyMeta.title} <em>{privacyMeta.titleEm}</em>
        </motion.h1>
        <motion.p className="leg-hero__meta" variants={fadeUpSm} custom={2}>
          Effective {privacyMeta.effectiveDate} · Last reviewed {privacyMeta.lastReviewed}
        </motion.p>
      </motion.div>
    </section>
  );
}
