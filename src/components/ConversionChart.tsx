/**
 * Gráfico de linha: taxa de conversão (%).
 */

import { Line } from "react-chartjs-2";
import { generateConversion } from "../data/metrics";
import { toLineDataset, CHART_COLORS } from "../lib/chartUtils";
import "../lib/chartRegistry";
import { ChartCard } from "./ChartCard";

export function ConversionChart() {
  const series = generateConversion(30);
  return (
    <ChartCard title={series.label}>
      <Line
        data={{
          labels: series.points.map((p) => p.date),
          datasets: [
            toLineDataset(series.label, series.points, CHART_COLORS.conversion),
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
