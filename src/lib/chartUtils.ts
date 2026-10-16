/**
 * Utilitários puros para transformar séries de métricas em datasets do Chart.js.
 * Sem efeitos colaterais, sem dependência de DOM ou de Chart.js aqui dentro.
 */

import type { MetricPoint } from "../data/metrics";

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
  tension: number;
  pointRadius: number;
  pointHoverRadius: number;
}

export const CHART_COLORS = {
  visits: "#2563eb",      // azul
  conversion: "#16a34a",  // verde
  bounce: "#dc2626",      // vermelho
} as const;

export function extractValues(points: readonly MetricPoint[]): number[] {
  return points.map((p) => p.value);
}

export function toLineDataset(
  label: string,
  points: readonly MetricPoint[],
  color: string,
): ChartDataset {
  return {
    label,
    data: extractValues(points),
    borderColor: color,
    backgroundColor: `${color}20`, // mesmo tom com 12,5% de opacidade
    fill: true,
    tension: 0.3,
    pointRadius: 3,
    pointHoverRadius: 6,
  };
}
