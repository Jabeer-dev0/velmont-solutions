import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PillButton } from '../ui/PillButton';
import { PRIMARY_CTA } from '../../data/seo';
import { fadeUp, viewOnce } from '../../lib/aboutMotion';

export function PageCta({ content, className = '' }) {
  const sectionClass = ['abt-cta', className].filter(Boolean).join(' ');

  return (
    <section className={sectionClass}>
      <div className="abt-cta__glow" aria-hidden="true" />
      <motion.div
        className="abt-cta__inner"
        initial="hidden"
        whileInView="visible"
        viewport={viewOnce}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.h2 className="abt-cta__title serif-display" variants={fadeUp} custom={0}>
          {content.title} <em>{content.titleEm}</em>
        </motion.h2>
        <motion.p className="abt-cta__lead" variants={fadeUp} custom={1}>
          {content.lead}
        </motion.p>
        <motion.p className="abt-cta__trust" variants={fadeUp} custom={2}>
          {content.trust}
        </motion.p>
        <motion.div className="abt-cta__actions" variants={fadeUp} custom={3}>
          <PillButton variant="light" icon={ArrowUpRight} to="/contact">
            {PRIMARY_CTA}
          </PillButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
