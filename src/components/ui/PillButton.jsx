import { Link } from 'react-router-dom';

export function PillButton({
  variant = 'primary',
  children,
  icon: Icon,
  onClick,
  to,
  href,
  type,
  className = '',
}) {
  const cls = [
    'v2-pill',
    `v2-pill--${variant}`,
    Icon ? 'v2-pill--has-icon' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      <span className="v2-pill__label">{children}</span>
      {Icon && (
        <span className="v2-pill__icon-wrap" aria-hidden="true">
          <span className="v2-pill__icon v2-pill__icon--current">
            <Icon size={variant === 'nav' ? 14 : 16} strokeWidth={2.25} />
          </span>
          <span className="v2-pill__icon v2-pill__icon--next">
            <Icon size={variant === 'nav' ? 14 : 16} strokeWidth={2.25} />
          </span>
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link className={cls} to={to} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <button className={cls} onClick={onClick} type={type || 'button'}>
      {inner}
    </button>
  );
}
