import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { ImageLogo } from '../ui/ImageLogo';
import { SocialIcon } from '../ui/SocialIcon';
import { PillButton } from '../ui/PillButton';
import { site } from '../../data/site';
import { services } from '../../data/services';
import { PRIMARY_CTA } from '../../data/seo';
import { useScrollReveal } from '../../lib/useScrollReveal';

const companyLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Our work', to: '/work' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy', to: '/privacy' },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  const innerRef = useRef(null);
  const { pathname } = useLocation();

  useScrollReveal(innerRef, {
    variant: 'fade-up-sm',
    start: 'top 96%',
    duration: 0.72,
    rememberKey: `footer:${pathname}`,
  });

  return (
    <footer className="v2-footer">
      <div className="v2-footer__glow" aria-hidden="true" />
      <div className="v2-footer__line" aria-hidden="true" />

      <div className="v2-footer__inner" ref={innerRef}>
        <div className="v2-footer__top">
          <div className="v2-footer__brand">
            <Link to="/" className="v2-footer__logo" aria-label={`${site.name} home`}>
              <ImageLogo variant="lightWhite" height={48} />
            </Link>
            <p className="v2-footer__eyebrow">UK restaurant growth partner</p>
            <p className="v2-footer__desc">
              Marketing, customer support and automation built for restaurants that want
              fuller tables and steadier revenue.
            </p>
            <PillButton
              variant="ghost-on-dark"
              icon={ArrowUpRight}
              to="/contact"
              className="v2-footer__cta"
            >
              {PRIMARY_CTA}
            </PillButton>
          </div>

          <nav className="v2-footer__nav" aria-label="Footer">
            <div className="v2-footer__col">
              <h3 className="v2-footer__col-title">Services</h3>
              <ul className="v2-footer__links">
                <li>
                  <Link to="/services">All services</Link>
                </li>
                {services.map(({ name, slug }) => (
                  <li key={slug}>
                    <Link to={`/services/${slug}`}>{name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="v2-footer__col">
              <h3 className="v2-footer__col-title">Company</h3>
              <ul className="v2-footer__links">
                {companyLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="v2-footer__col">
              <h3 className="v2-footer__col-title">Get in touch</h3>
              <ul className="v2-footer__contact">
                <li>
                  <a href={`mailto:${site.email}`} className="v2-footer__contact-item">
                    <Mail size={16} strokeWidth={2} aria-hidden="true" />
                    <span>{site.email}</span>
                  </a>
                </li>
                <li>
                  <a href={site.phoneHref} className="v2-footer__contact-item">
                    <Phone size={16} strokeWidth={2} aria-hidden="true" />
                    <span>{site.phone}</span>
                  </a>
                </li>
                <li>
                  <span className="v2-footer__contact-item">
                    <MapPin size={16} strokeWidth={2} aria-hidden="true" />
                    <span>{site.address}</span>
                  </span>
                </li>
              </ul>
              <div className="v2-footer__social" aria-label="Social media">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <SocialIcon name="instagram" />
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <SocialIcon name="facebook" />
                </a>
                <a
                  href={site.social.threads}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Threads"
                >
                  <SocialIcon name="threads" />
                </a>
              </div>
            </div>
          </nav>
        </div>

        <div className="v2-footer__bar">
          <p className="v2-footer__copy">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="v2-footer__tagline">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
