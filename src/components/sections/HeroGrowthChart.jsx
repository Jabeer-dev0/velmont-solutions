import { useRef } from 'react';
import { heroChartBars } from '../../data/heroChart';
import { useHeroChartScroll } from '../../lib/useHeroChartScroll';

export function HeroGrowthChart() {
  const chartRef = useRef(null);
  useHeroChartScroll(chartRef);

  return (
    <div className="v2-hero__chart" aria-hidden="true" ref={chartRef}>
      <div className="v2-hero__chart-inner">
        <div className="v2-hero__chart-track">
          {heroChartBars.map((height, index) => (
            <div
              key={index}
              className="v2-hero__chart-bar"
              style={{ '--bar-h': `${height}%` }}
            >
              <span className="v2-hero__chart-bar-fill" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
