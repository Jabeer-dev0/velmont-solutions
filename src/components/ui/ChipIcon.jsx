export function ChipIcon({ icon: Icon, size = 56, tone = 'blue' }) {
  return (
    <span
      className={`v2-chip v2-chip--${tone}`}
      style={{ width: size, height: size }}
    >
      <Icon size={Math.round(size * 0.4)} strokeWidth={2} aria-hidden="true" />
    </span>
  );
}
