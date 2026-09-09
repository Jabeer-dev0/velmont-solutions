export function TextLogo({ light, compact, className = '' }) {
  if (compact) {
    return (
      <div
        className={`vx-logo vx-logo--compact${light ? ' vx-logo--light' : ''} ${className}`.trim()}
      >
        <span className="vx-logo__mark">
          V<span className="vx-logo__mark2">V</span>
        </span>
      </div>
    );
  }

  return (
    <div className={`vx-logo${light ? ' vx-logo--light' : ''} ${className}`.trim()}>
      <span className="vx-logo__mark">
        V<span className="vx-logo__mark2">V</span>
      </span>
      <span className="vx-logo__words">
        <span className="vx-logo__name">VELMONT</span>
        <span className="vx-logo__sub">SOLUTIONS</span>
      </span>
    </div>
  );
}
