import { describe, test, expect } from "vitest";
import {
  toLineDataset,
  type ChartDataset,
} from "../../src/lib/chartUtils";
import type { MetricPoint } from "../../src/data/metrics";

const pontos: MetricPoint[] = [
  { date: "2026-01-01", value: 100 },
  { date: "2026-01-02", value: 200 },
  { date: "2026-01-03", value: 150 },
];

describe("toLineDataset", () => {
  test("monta dataset de linha com rótulo, valores e cor esperados", () => {
    const ds: ChartDataset = toLineDataset("Visitas", pontos, "#2563eb");
    expect(ds.label).toBe("Visitas");
    expect(ds.data).toEqual([100, 200, 150]);
    expect(ds.borderColor).toBe("#2563eb");
  });

  test("preenche valores padrão de estilo (não vazio)", () => {
    const ds: ChartDataset = toLineDataset("X", pontos, "#000000");
    expect(ds.backgroundColor).toBe("#00000020");
    expect(typeof ds.tension).toBe("number");
    expect(ds.pointRadius).toBeGreaterThan(0);
  });

  test("não muta o array de pontos de entrada", () => {
    const antes = [...pontos.map((p) => p.value)];
    toLineDataset("Visitas", pontos, "#2563eb");
    expect(pontos.map((p) => p.value)).toEqual(antes);
  });
});
