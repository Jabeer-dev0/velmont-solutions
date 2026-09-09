import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NavBrand } from './NavLogo';
import { PillButton } from '../ui/PillButton';
import { scrollToSection } from '../../lib/scrollTo';
import { useNavScroll } from '../../lib/useNavScroll';
import { PRIMARY_CTA } from '../../data/seo';

const links = [
  { label: 'Services', to: '/services', route: true },
  { label: 'About', to: '/about', route: true },
  { label: 'Work', to: '/work', route: true },
  { label: 'Pricing', to: '/pricing', route: true },
];

export function SiteNav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(location.pathname);

  if (location.pathname !== menuPath) {
    setMenuPath(location.pathname);
    setOpen(false);
  }

  const navigate = useNavigate();
  const onHome = location.pathname === '/';
  const onServices = location.pathname === '/services' || location.pathname.startsWith('/services/');
  const onWork = location.pathname === '/work';
  const onPricing = location.pathname === '/pricing';
  const onContact = location.pathname === '/contact';
  const onInterior = !onHome;
  const { isSticky, isHidden, scrollLocked, navExpanded, revealFromLogo } = useNavScroll({
    overlay: true,
    menuOpen: open,
  });

  const expanded = open || navExpanded;
  const compactLogo = !scrollLocked && isHidden && !open && !navExpanded;
  const onHeroOverlay = !scrollLocked && !isSticky && !open;
  const onDarkHero = onHome && onHeroOverlay;
  const contactVariant = scrollLocked || onHeroOverlay ? 'nav' : 'primary';

  const closeMenu = () => setOpen(false);

  const handleHashClick = (event, hash, homeOnly = false) => {
    event.preventDefault();
    closeMenu();

    if (homeOnly && !onHome) {
      navigate(`/#${hash}`);
      return;
    }

    if (onHome || (onInterior && hash === 'contact')) {
      scrollToSection(hash);
      return;
    }

    if (onServices && hash === 'faq') {
      scrollToSection(hash);
      return;
    }

    if (onPricing && (hash === 'faq' || hash === 'contact' || hash === 'plans')) {
      scrollToSection(hash);
      return;
    }

    if (onContact && (hash === 'faq' || hash === 'form')) {
      scrollToSection(hash);
      return;
    }

    navigate(`/#${hash}`);
  };

  const renderLink = (link) => {
    if (link.route) {
      const active =
        link.to === '/services'
          ? onServices
          : link.to === '/work'
            ? onWork
            : location.pathname === link.to;

      return (
        <Link
          key={link.label}
          to={link.to}
          className={active ? 'is-active' : undefined}
          onClick={closeMenu}
        >
          {link.label}
        </Link>
      );
    }

    const href = link.homeOnly ? `/#${link.hash}` : `#${link.hash}`;

    return (
      <a
        key={link.label}
        href={href}
        onClick={(event) => handleHashClick(event, link.hash, link.homeOnly)}
      >
        {link.label}
      </a>
    );
  };

  const goContact = () => {
    closeMenu();
    if (location.pathname === '/contact') {
      scrollToSection('form');
      return;
    }
    navigate('/contact');
  };

  const navClass = [
    'v2-nav',
    scrollLocked ? 'v2-nav--scroll-locked' : '',
    onHeroOverlay ? 'v2-nav--overlay' : '',
    onDarkHero ? 'v2-nav--on-dark' : '',
    !scrollLocked && isSticky && !open ? 'v2-nav--sticky' : '',
    !scrollLocked && isHidden && !expanded ? 'v2-nav--hidden' : '',
    !scrollLocked && expanded ? 'v2-nav--revealed' : '',
    open ? 'v2-nav--menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={navClass}>
      <div className="v2-nav__shell">
        <div className="v2-nav__inner">
          <NavBrand
            onNavigate={closeMenu}
            compact={compactLogo}
            onCompactClick={revealFromLogo}
          />
          <nav className="v2-nav__links" aria-label="Main navigation">
            {links.map(renderLink)}
          </nav>
          <div className="v2-nav__cta">
            <PillButton variant={contactVariant} icon={ArrowUpRight} onClick={goContact}>
              {PRIMARY_CTA}
            </PillButton>
          </div>
          <button
            type="button"
            className="v2-nav__burger"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="v2-nav__mobile">
          {links.map(renderLink)}
          <PillButton variant="primary" icon={ArrowUpRight} onClick={goContact}>
            {PRIMARY_CTA}
          </PillButton>
        </div>
      )}
    </header>
  );
}
