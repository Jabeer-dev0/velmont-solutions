import { Map } from 'lucide-react';
import { motion } from 'framer-motion';

export function ExpandMap({
  location = 'Crawley, UK',
  coordinates = '51.109° N, 0.188° W',
  time,
  detail,
  className = '',
}) {
  return (
    <div className={`expand-map ${className}`.trim()}>
      <div className="expand-map__panel expand-map__panel--open" aria-label={location}>
        <div className="expand-map__sheen" aria-hidden="true" />

        <div className="expand-map__streets" aria-hidden="true">
          <div className="expand-map__streets-bg" />

          <svg className="expand-map__streets-svg" preserveAspectRatio="none">
            <motion.line
              x1="0%"
              y1="35%"
              x2="100%"
              y2="35%"
              className="expand-map__road expand-map__road--main"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.line
              x1="0%"
              y1="65%"
              x2="100%"
              y2="65%"
              className="expand-map__road expand-map__road--main"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.line
              x1="30%"
              y1="0%"
              x2="30%"
              y2="100%"
              className="expand-map__road expand-map__road--secondary"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.line
              x1="70%"
              y1="0%"
              x2="70%"
              y2="100%"
              className="expand-map__road expand-map__road--secondary"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />
            {[20, 50, 80].map((y, index) => (
              <motion.line
                key={`h-${y}`}
                x1="0%"
                y1={`${y}%`}
                x2="100%"
                y2={`${y}%`}
                className="expand-map__road expand-map__road--minor"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              />
            ))}
            {[15, 45, 55, 85].map((x, index) => (
              <motion.line
                key={`v-${x}`}
                x1={`${x}%`}
                y1="0%"
                x2={`${x}%`}
                y2="100%"
                className="expand-map__road expand-map__road--minor"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              />
            ))}
          </svg>

          <motion.div
            className="expand-map__building expand-map__building--1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          />
          <motion.div
            className="expand-map__building expand-map__building--2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          />
          <motion.div
            className="expand-map__building expand-map__building--3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          />
          <motion.div
            className="expand-map__building expand-map__building--4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.55 }}
          />
          <motion.div
            className="expand-map__building expand-map__building--5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.65 }}
          />
          <motion.div
            className="expand-map__building expand-map__building--6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.75 }}
          />

          <motion.div
            className="expand-map__pin"
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.3 }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="var(--blue-500)"
              />
              <circle cx="12" cy="9" r="2.5" fill="#fff" />
            </svg>
          </motion.div>

          <div className="expand-map__fade" aria-hidden="true" />
        </div>

        <div className="expand-map__content">
          <div className="expand-map__top">
            <div className="expand-map__icon">
              <Map size={18} strokeWidth={2} aria-hidden="true" />
            </div>

            <div className="expand-map__live">
              <span className="expand-map__live-dot" aria-hidden="true" />
              <span>Live</span>
            </div>
          </div>

          <div className="expand-map__bottom">
            <p className="expand-map__location">{location}</p>

            {time && (
              <strong className="expand-map__time serif-display" aria-live="polite">
                {time}
              </strong>
            )}

            <p className="expand-map__coords">{coordinates}</p>

            {detail && <span className="expand-map__detail">{detail}</span>}

            <div className="expand-map__rule" />
          </div>
        </div>
      </div>
    </div>
  );
}
