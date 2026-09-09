import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp } from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import { GlassBadge } from '../ui/GlassBadge';
import { ChipIcon } from '../ui/ChipIcon';
import { SectionImage } from '../ui/SectionImage';
import { services, bentoCards, miniRowIndices } from '../../data/services';
import { site } from '../../data/site';
import { useScrollReveal, useScrollRevealStagger } from '../../lib/useScrollReveal';

const featured = services.find((s) => s.featured);

export function ServicesBento() {
  const headLeftRef = useRef(null);
  const headRightRef = useRef(null);
  const bentoRef = useRef(null);
  const miniRef = useRef(null);

  useScrollReveal(headLeftRef, { variant: 'slide-left', start: 'top 90%' });
  useScrollReveal(headRightRef, { variant: 'slide-right', delay: 0.08, start: 'top 90%' });
  useScrollRevealStagger(bentoRef, { variant: 'scale-up', stagger: 0.1, start: 'top 88%' });
  useScrollRevealStagger(miniRef, { variant: 'fade-up-sm', stagger: 0.07, start: 'top 92%' });

  return (
    <section className="v2-section" id="services">
      <div className="v2-shead">
        <div ref={headLeftRef}>
          <SectionLabel>What we do</SectionLabel>
          <h2 className="serif-display v2-shead__title">
            Complete growth solutions, <em>under one roof.</em>
          </h2>
        </div>
        <p className="v2-shead__sub" ref={headRightRef}>
          We design and run the systems that bring restaurants more customers, more revenue
          and a stronger digital presence.
        </p>
      </div>

      <div className="v2-bento" ref={bentoRef}>
        <Link to={`/services/${featured.slug}`} className="v2-bento__feature v2-bento__feature--link">
          <SectionImage
            src={site.images.servicesFeature}
            alt="Social media marketing for restaurants: plated dish in warm dining light"
            className="v2-bento__img"
            loading="eager"
            fetchPriority="high"
            width={1400}
            height={933}
          />
          <div className="v2-bento__feature-body">
            <GlassBadge icon={ThumbsUp}>Most requested</GlassBadge>
            <h3>{featured.name}</h3>
            <p>{featured.featureDescription}</p>
          </div>
        </Link>

        {bentoCards.map(({ index, slot }) => {
          const svc = services[index];
          return (
            <Link
              key={svc.slug}
              to={`/services/${svc.slug}`}
              className={`v2-bento__card v2-bento__card--${slot}${svc.bentoNavy ? ' v2-bento__card--navy' : ''} v2-bento__card--link`}
            >
              <ChipIcon icon={svc.icon} tone={svc.bentoNavy ? 'light' : 'blue'} />
              <h3>{svc.name}</h3>
              <p>{svc.description}</p>
            </Link>
          );
        })}
      </div>

      <div className="v2-mini" ref={miniRef}>
        {miniRowIndices.map((index) => {
          const svc = services[index];
          return (
            <Link to={`/services/${svc.slug}`} className="v2-mini__item v2-mini__item--link" key={svc.slug}>
              <ChipIcon icon={svc.icon} size={42} tone="soft" />
              <span>{svc.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
