/**
 * Gráfico de linha: taxa de rejeição (bounce, %).
 */

import { Line } from "react-chartjs-2";
import { generateBounce } from "../data/metrics";
import { toLineDataset, CHART_COLORS } from "../lib/chartUtils";
import "../lib/chartRegistry";
import { ChartCard } from "./ChartCard";

export function BounceChart() {
  const series = generateBounce(30);
  return (
    <ChartCard title={series.label}>
      <Line
        data={{
          labels: series.points.map((p) => p.date),
          datasets: [toLineDataset(series.label, series.points, CHART_COLORS.bounce)],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
        }}
      />
    </ChartCard>
  );
}
