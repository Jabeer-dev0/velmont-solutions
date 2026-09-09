import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { SectionLabel } from '../../ui/SectionLabel';
import { SocialIcon } from '../../ui/SocialIcon';
import { ExpandMap } from '../../ui/ExpandMap';
import { LocationTag } from '../../ui/LocationTag';
import {
  reachIntro,
  contactChannels,
  socialLinks,
  presence,
  presenceHq,
  presenceMeta,
} from '../../../data/contact';
import { regionalClock } from '../../../lib/regionalTime';
import { fadeUp, fadeUpSm, slideLeft, staggerVisible, viewOnce } from '../../../lib/aboutMotion';

const channelOrder = ['email', 'whatsapp', 'phone'];

function ChannelCell({ channel, motionIndex = 0 }) {
  const [copied, setCopied] = useState(false);
  const Icon = channel.icon;
  const isCopy = channel.copy;

  const copyValue = async (event) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(channel.value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = channel.href;
    }
  };

  const handleClick = (event) => {
    if (isCopy && !event.metaKey && !event.ctrlKey) {
      copyValue(event);
    }
  };

  const value = isCopy && copied ? channel.ctaDone : channel.value;
  const cta = isCopy && copied ? channel.ctaDone : channel.cta;

  return (
    <motion.a
      className={[
        'ctc-reach__channel',
        channel.featured ? 'ctc-reach__channel--featured' : '',
        channel.accent ? `ctc-reach__channel--${channel.accent}` : '',
      ]
        .filter(Boolean)
        .join(' ')}
      href={channel.href}
      target={channel.external ? '_blank' : undefined}
      rel={channel.external ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      variants={fadeUpSm}
      custom={motionIndex}
    >
      <span className="ctc-reach__channel-icon" aria-hidden="true">
        <Icon size={18} strokeWidth={2} />
      </span>
      <span className="ctc-reach__channel-label" aria-hidden="true">{channel.label}</span>
      <span className="ctc-reach__channel-value">{value}</span>
      <span className="ctc-reach__channel-cta" aria-hidden="true">
        {cta}
        {isCopy ? (
          copied ? (
            <Check size={12} strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <Copy size={12} strokeWidth={2.5} aria-hidden="true" />
          )
        ) : (
          <ArrowUpRight size={12} strokeWidth={2.25} aria-hidden="true" />
        )}
      </span>
    </motion.a>
  );
}

export function ContactReach() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const hqClock = regionalClock(presenceHq.timeZone, now);
  const orderedChannels = channelOrder
    .map((id) => contactChannels.find((channel) => channel.id === id))
    .filter(Boolean);

  return (
    <section className="ctc-reach">
      <motion.div
        className="ctc-reach__inner"
        initial="hidden"
        whileInView="visible"
        viewport={viewOnce}
        variants={staggerVisible(0.08)}
      >
        <motion.header className="ctc-reach__head" variants={fadeUp} custom={0}>
          <SectionLabel>{reachIntro.eyebrow}</SectionLabel>
          <h2 className="serif-display ctc-reach__title">
            {reachIntro.title} <em>{reachIntro.titleEm}</em>
          </h2>
          <p className="ctc-reach__sub">{reachIntro.subtitle}</p>
        </motion.header>

        <motion.div
          className="ctc-reach__main"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } } }}
        >
          <motion.div className="ctc-reach__aside" variants={fadeUpSm}>
            <motion.div
              className="ctc-reach__info"
              variants={staggerVisible(0.06, 0.02)}
              initial="hidden"
              whileInView="visible"
              viewport={viewOnce}
            >
              <motion.ul className="ctc-reach__meta" variants={staggerVisible(0.05)}>
                {presenceMeta.map(({ icon: Icon, label, value }, index) => (
                  <motion.li key={label} variants={fadeUpSm} custom={index}>
                    <Icon size={16} strokeWidth={2} aria-hidden="true" />
                    <div>
                      <span>{label}</span>
                      <p>{value}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div className="ctc-reach__zones" variants={fadeUpSm}>
                <div className="ctc-reach__tags-head">
                  <p className="ctc-reach__tags-label">{presence.tagsLabel}</p>
                  <p className="ctc-reach__tags-hint">{presence.tagsHint}</p>
                </div>
                <div className="ctc-reach__tags-list" role="list">
                  {presence.regions.map((region) => (
                    <div key={region.id} className="ctc-reach__tags-item" role="listitem">
                      <LocationTag
                        city={region.city}
                        country={region.country}
                        timeZone={region.timeZone}
                        isPrimary={region.isPrimary}
                        now={now.getTime()}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="ctc-reach__connect" variants={fadeUpSm}>
              <p className="ctc-reach__panel-label">{reachIntro.channelsLabel}</p>

              <motion.div
                className="ctc-reach__channel-band"
                variants={staggerVisible(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={viewOnce}
              >
                {orderedChannels.map((channel, index) => (
                  <ChannelCell key={channel.id} channel={channel} motionIndex={index} />
                ))}
              </motion.div>

              <motion.div
                className="ctc-reach__orbit"
                variants={staggerVisible(0.05)}
                initial="hidden"
                whileInView="visible"
                viewport={viewOnce}
              >
                <p className="ctc-reach__orbit-label">{reachIntro.orbitLabel}</p>
                <div className="ctc-reach__orbit-links">
                  {socialLinks.map(({ label, href, id }, index) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ctc-reach__orbit-link"
                      variants={fadeUpSm}
                      custom={index}
                    >
                      <SocialIcon name={id} size={15} />
                      <span>{label}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div className="ctc-reach__map-col" variants={slideLeft}>
            <ExpandMap
              className="expand-map--dark"
              location={presenceHq.location}
              coordinates={presenceHq.coordinates}
              time={`${hqClock.time} ${hqClock.zone}`}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
