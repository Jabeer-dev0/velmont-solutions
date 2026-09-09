import { motion } from 'framer-motion';
import { ChipIcon } from '../../ui/ChipIcon';
import { TiltCard } from '../../about/TiltCard';
import { ValueCardArt } from '../../about/ValueCardArt';
import { aboutValues } from '../../../data/about';
import { fadeUp, viewOnce } from '../../../lib/aboutMotion';

export function AboutValues() {
  return (
    <section className="abt-values v2-section" id="values">
      <motion.div
        className="abt-values__head"
        initial="hidden"
        whileInView="visible"
        viewport={viewOnce}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.p className="abt-eyebrow" variants={fadeUp} custom={0}>
          Core values
        </motion.p>
        <motion.h2 className="abt-values__title serif-display" variants={fadeUp} custom={1}>
          What guides every <em>partnership.</em>
        </motion.h2>
      </motion.div>

      <div className="abt-values__bento">
        {aboutValues.map((item, i) => (
          <motion.div
            key={item.title}
            className={[
              'abt-values__cell',
              `abt-values__cell--${item.size}`,
              `abt-values__cell--${item.gridArea}`,
            ].join(' ')}
            style={{ gridArea: item.gridArea }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewOnce}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <TiltCard
              className={[
                'abt-values__tile',
                `abt-values__tile--${item.size}`,
                item.theme === 'dark' ? 'abt-values__tile--dark' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <ValueCardArt artKey={item.artKey} />
              <div className="abt-values__content">
                <div className="abt-values__icon-wrap">
                  <ChipIcon
                    icon={item.icon}
                    size={item.size === 'lg' ? 52 : 44}
                    tone={item.theme === 'dark' ? 'light' : 'soft'}
                  />
                </div>
                {item.kicker ? <p className="abt-values__kicker">{item.kicker}</p> : null}
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
