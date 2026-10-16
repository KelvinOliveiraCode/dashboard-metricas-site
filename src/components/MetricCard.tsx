/**
 * Cartão métrica: título, valor grande e variação opcional.
 */

export interface Delta {
  value: number;
  label: string;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  delta?: Delta;
}

export function MetricCard({ title, value, delta }: MetricCardProps) {
  return (
    <article className="metric-card">
      <h3 className="metric-title">{title}</h3>
      <div className="metric-value">{value}</div>
      {delta && (
        <span className={`metric-delta ${delta.value >= 0 ? "delta-up" : "delta-down"}`}>
          {delta.label}
        </span>
      )}
    </article>
  );
}
