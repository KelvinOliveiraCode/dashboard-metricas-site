import { describe, test, expect } from "vitest";
import {
  generateDashboardMetrics,
  generateVisits,
  type MetricSeries,
} from "../../src/data/metrics";

describe("generateDashboardMetrics", () => {
  test("retorna as três séries esperadas: visitas, conversão e rejeição", () => {
    const m = generateDashboardMetrics();
    expect(Object.keys(m)).toEqual(["visits", "conversion", "bounce"]);
  });

  test("usa 30 pontos por padrão em cada série", () => {
    const m = generateDashboardMetrics();
    expect(m.visits.points).toHaveLength(30);
    expect(m.conversion.points).toHaveLength(30);
    expect(m.bounce.points).toHaveLength(30);
  });

  test("aceita quantidade personalizada de dias", () => {
    const m = generateDashboardMetrics(7);
    expect(m.visits.points).toHaveLength(7);
    expect(m.conversion.points).toHaveLength(7);
    expect(m.bounce.points).toHaveLength(7);
  });

  test("datas começam na época fixa (2026-01-01) e avançam um dia por ponto", () => {
    const m = generateDashboardMetrics(5);
    const esperado = ["2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04", "2026-01-05"];
    m.visits.points.forEach((p, i) => {
      expect(p.date).toBe(esperado[i]);
    });
  });

  test("é determinístico: duas chamadas iguais retornam o mesmo dado", () => {
    const a = generateDashboardMetrics(30);
    const b = generateDashboardMetrics(30);
    expect(a).toEqual(b);
  });

  test("visitas ficam entre 1000 e 1300", () => {
    const m = generateDashboardMetrics();
    m.visits.points.forEach((p) => {
      expect(p.value).toBeGreaterThanOrEqual(1000);
      expect(p.value).toBeLessThanOrEqual(1300);
    });
  });

  test("conversão fica entre 3.5% e 5.0%", () => {
    const m = generateDashboardMetrics();
    m.conversion.points.forEach((p) => {
      expect(p.value).toBeGreaterThanOrEqual(3.5);
      expect(p.value).toBeLessThanOrEqual(5.0);
    });
  });

  test("taxa de rejeição fica entre 45% e 55%", () => {
    const m = generateDashboardMetrics();
    m.bounce.points.forEach((p) => {
      expect(p.value).toBeGreaterThanOrEqual(45);
      expect(p.value).toBeLessThanOrEqual(55);
    });
  });

  test("cada série tem rótulo e chave próprios", () => {
    const visitas: MetricSeries = generateVisits();
    expect(visitas.key).toBe("visits");
    expect(visitas.label).toBe("Visitas");
  });
});
