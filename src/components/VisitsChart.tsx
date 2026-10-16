/**
 * Gráfico de linha: visitas diárias.
 */

import { Line } from "react-chartjs-2";
import { generateVisits } from "../data/metrics";
import { toLineDataset, CHART_COLORS } from "../lib/chartUtils";
import "../lib/chartRegistry";
import { ChartCard } from "./ChartCard";

export function VisitsChart() {
  const series = generateVisits(30);
  return (
    <ChartCard title={series.label}>
      <Line
        data={{
          labels: series.points.map((p) => p.date),
          datasets: [
            toLineDataset(series.label, series.points, CHART_COLORS.visits),
          ],
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
