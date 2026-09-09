import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PillButton } from '../ui/PillButton';
import { fadeUp } from '../../lib/aboutMotion';

const burst = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  angle: (360 / 8) * i,
}));

export function SuccessState({ name, onReset, dark = false }) {
  return (
    <motion.div
      className={`ctc-success${dark ? ' ctc-success--dark' : ''}`}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <div className="ctc-success__burst" aria-hidden="true">
        {burst.map(({ id, angle }) => (
          <motion.span
            key={id}
            className="ctc-success__particle"
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0.4],
              x: Math.cos((angle * Math.PI) / 180) * 52,
              y: Math.sin((angle * Math.PI) / 180) * 52,
            }}
            transition={{ duration: 0.85, delay: 0.15 + id * 0.03, ease: [0.22, 0.61, 0.36, 1] }}
          />
        ))}
      </div>

      <motion.div
        className="ctc-success__icon"
        variants={fadeUp}
        custom={0}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 360, damping: 22, delay: 0.05 }}
      >
        <Check size={32} strokeWidth={2.5} aria-hidden="true" />
      </motion.div>

      <motion.h3 variants={fadeUp} custom={1}>
        Message sent{name ? `, ${name}` : ''}!
      </motion.h3>
      <motion.p variants={fadeUp} custom={2}>
        We&apos;ve got your note and will reply within one business day with clear next steps.
      </motion.p>
      <motion.div variants={fadeUp} custom={3}>
        <PillButton variant={dark ? 'ghost-on-dark' : 'ghost'} onClick={onReset}>
          Send another message
        </PillButton>
      </motion.div>
    </motion.div>
  );
}
