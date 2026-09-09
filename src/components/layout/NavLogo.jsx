import { Link } from 'react-router-dom';
import { site } from '../../data/site';

export function NavLogo() {
  return (
    <div className="v2-nav__brand-logos">
      <img
        src={site.images.logoDark}
        alt="Velmont Solutions"
        className="v2-nav__logo v2-nav__logo--dark"
        width={40}
        height={40}
        decoding="async"
      />
      <img
        src={site.images.logoLight}
        alt="Velmont Solutions"
        className="v2-nav__logo v2-nav__logo--light"
        width={40}
        height={40}
        decoding="async"
      />
      <img
        src={site.images.logoLightWhite}
        alt="Velmont Solutions"
        className="v2-nav__logo v2-nav__logo--white"
        width={40}
        height={40}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function NavBrand({ onNavigate, compact, onCompactClick }) {
  if (compact && onCompactClick) {
    return (
      <a
        className="v2-nav__brand"
        href="/"
        aria-label="Show navigation"
        onClick={onCompactClick}
      >
        <NavLogo />
      </a>
    );
  }

  return (
    <Link
      className="v2-nav__brand"
      to="/"
      aria-label="Velmont Solutions home"
      onClick={onNavigate}
    >
      <NavLogo />
    </Link>
  );
}
