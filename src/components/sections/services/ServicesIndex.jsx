import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ChipIcon } from '../../ui/ChipIcon';
import { services } from '../../../data/services';
import { useScrollRevealStagger } from '../../../lib/useScrollReveal';

export function ServicesIndex() {
  const indexRef = useRef(null);

  useScrollRevealStagger(indexRef, {
    variant: 'fade-up',
    stagger: 0.07,
    start: 'top 92%',
    duration: 0.7,
  });

  return (
    <section className="svc-index" id="index" ref={indexRef}>
      {services.map((service, index) => (
        <Link
          to={`/services/${service.slug}`}
          className="svc-item"
          key={service.slug}
        >
          <div className="svc-item__num">{String(index + 1).padStart(2, '0')}</div>
          <div className="svc-item__body">
            <div className="svc-item__head">
              <h3 className="serif-display">{service.name}</h3>
              <ChipIcon icon={service.icon} size={48} tone="soft" />
            </div>
            <p className="svc-item__desc">{service.description}</p>
            <p className="svc-item__outcome">{service.outcome}</p>
            <span className="svc-item__explore">
              Explore service
              <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
