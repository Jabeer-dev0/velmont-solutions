import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { formatRegionalTime, timezoneLabel } from '../../lib/regionalTime';

function useFinePointerHover() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return enabled;
}

export function LocationTag({
  city = 'Crawley',
  country = 'UK',
  timeZone = 'Europe/London',
  isPrimary = false,
  className = '',
  now,
}) {
  const hoverEnabled = useFinePointerHover();
  const [isHovered, setIsHovered] = useState(false);
  const [liveTick, setLiveTick] = useState(() => Date.now());

  useEffect(() => {
    if (now != null) return undefined;

    const interval = window.setInterval(() => setLiveTick(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [now, timeZone]);

  const clock = new Date(now ?? liveTick);
  const currentTime = formatRegionalTime(timeZone, clock, { hour12: false });
  const tz = timezoneLabel(timeZone, clock);

  return (
    <button
      type="button"
      className={[
        'location-tag',
        isPrimary ? 'location-tag--primary' : '',
        !hoverEnabled ? 'location-tag--touch' : '',
        hoverEnabled && isHovered ? 'is-hovered' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseEnter={hoverEnabled ? () => setIsHovered(true) : undefined}
      onMouseLeave={hoverEnabled ? () => setIsHovered(false) : undefined}
      onFocus={hoverEnabled ? () => setIsHovered(true) : undefined}
      onBlur={hoverEnabled ? () => setIsHovered(false) : undefined}
    >
      <span className="location-tag__pulse" aria-hidden="true">
        <span className="location-tag__ping" />
        <span className="location-tag__dot" />
      </span>

      <span className="location-tag__text">
        <span className="location-tag__place">
          {city}, {country}
        </span>
        <time className="location-tag__time" dateTime={clock.toISOString()}>
          {currentTime} {tz}
        </time>
      </span>

      <ArrowUpRight
        size={12}
        strokeWidth={2}
        className="location-tag__arrow"
        aria-hidden="true"
      />
    </button>
  );
}
