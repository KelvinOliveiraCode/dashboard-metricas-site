/**
 * Dados sintéticos e determinísticos do dashboard de métricas de site.
 *
 * Regras:
 * - Sem Math.random() nem Date.now(): tudo deriva de semente fixa + índice.
 * - Época fixa (2026-01-01), então as datas nunca mudam entre execuções.
 * - Valores arredondados a 2 casas decimais.
 */

export interface MetricPoint {
  date: string; // YYYY-MM-DD
  value: number;
}

export interface MetricSeries {
  key: "visits" | "conversion" | "bounce";
  label: string;
  points: MetricPoint[];
}

/** Época fixa: todas as séries começam em 2026-01-01. */
const EPOCH = new Date(Date.UTC(2026, 0, 1));

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const result = new Date(d);
  result.setUTCDate(result.getUTCDate() + n);
  return result;
}

/**
 * Valor determinístico em [0, 1) a partir de semente e índice.
 * Multiplicação de 32 bits + deslocamento à direita (>>> 0) = unsigned.
 */
function seededValue(seed: number, index: number): number {
  return ((seed * 2654435761 + index * 7919) >>> 0) / 4294967296;
}

function stringHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return h;
}

function series(
  key: MetricSeries["key"],
  label: string,
  base: number,
  amplitude: number,
  days: number,
): MetricSeries {
  const seed = stringHash(key);
  const points: MetricPoint[] = [];
  for (let i = 0; i < days; i++) {
    const date = formatDate(addDays(EPOCH, i));
    const value = Number((base + seededValue(seed, i) * amplitude).toFixed(2));
    points.push({ date, value });
  }
  return { key, label, points };
}

/** Visitas diárias: entre 1000 e 1300. */
export function generateVisits(days = 30): MetricSeries {
  return series("visits", "Visitas", 1000, 300, days);
}

/** Taxa de conversão (%): entre 3.5 e 5.0. */
export function generateConversion(days = 30): MetricSeries {
  return series("conversion", "Conversão", 3.5, 1.5, days);
}

/** Taxa de rejeição/bounce (%): entre 45 e 55. */
export function generateBounce(days = 30): MetricSeries {
  return series("bounce", "Taxa de rejeição", 45, 10, days);
}

export interface DashboardMetrics {
  visits: MetricSeries;
  conversion: MetricSeries;
  bounce: MetricSeries;
}

/** Gera o conjunto completo de métricas com a mesma quantidade de dias. */
export function generateDashboardMetrics(days = 30): DashboardMetrics {
  return {
    visits: generateVisits(days),
    conversion: generateConversion(days),
    bounce: generateBounce(days),
  };
}
