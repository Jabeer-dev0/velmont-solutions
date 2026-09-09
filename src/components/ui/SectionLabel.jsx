export function SectionLabel({ children, light }) {
  return (
    <div className={`v2-label${light ? ' v2-label--light' : ''}`}>
      <span className="v2-label__rule" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
