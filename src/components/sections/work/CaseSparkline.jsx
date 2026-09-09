import { getCaseSparkline } from '../../../data/workCaseSparklines';

export function CaseSparkline({ caseId }) {
  const chart = getCaseSparkline(caseId);

  return (
    <svg
      viewBox="0 0 64 48"
      aria-hidden="true"
      className={`wrk-card__spark wrk-card__spark--${chart.variant}`}
    >
      <path d={chart.fill} className="wrk-card__spark-fill" />
      <path
        d={chart.path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={chart.start[0]}
        cy={chart.start[1]}
        r="2.5"
        className="wrk-card__spark-dot wrk-card__spark-dot--start"
      />
      {chart.mid && (
        <circle
          cx={chart.mid[0]}
          cy={chart.mid[1]}
          r="2"
          className="wrk-card__spark-dot wrk-card__spark-dot--mid"
        />
      )}
      <circle cx={chart.end[0]} cy={chart.end[1]} r="3" className="wrk-card__spark-dot wrk-card__spark-dot--end" />
    </svg>
  );
}
