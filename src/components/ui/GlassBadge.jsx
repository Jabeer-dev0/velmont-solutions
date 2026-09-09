export function GlassBadge({ children, icon: Icon }) {
  return (
    <span className="v2-glass">
      {Icon && (
        <span className="vx-icon">
          <Icon size={16} strokeWidth={2.25} aria-hidden="true" />
        </span>
      )}
      {children}
    </span>
  );
}
