/**
 * Dashboard de métricas de site: cards resumo + três gráficos.
 */

import { MetricCard } from "./components/MetricCard";
import { VisitsChart } from "./components/VisitsChart";
import { ConversionChart } from "./components/ConversionChart";
import { BounceChart } from "./components/BounceChart";
import { generateVisits, generateConversion, generateBounce } from "./data/metrics";

const HOJE = 30; // últimos 30 dias

export function App() {
  const visitas = generateVisits(HOJE);
  const conversao = generateConversion(HOJE);
  const rejeicao = generateBounce(HOJE);

  const ultimo = (n: number) => Number(n.toFixed(2));
  const deltaVisitas = { value: 5, label: "+5% vs período anterior" };
  const deltaConversao = { value: 0.3, label: "+0,3 pp vs período anterior" };
  const deltaRejeicao = { value: -1.2, label: "-1,2 pp vs período anterior" };

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Métricas do site</h1>
        <p className="dashboard-subtitle">
          Últimos {HOJE} dias · dados sintéticos determinísticos
        </p>
      </header>

      <div className="metrics-grid">
        <MetricCard title="Visitas" value={ultimo(visitas.points[visitas.points.length - 1].value)} delta={deltaVisitas} />
        <MetricCard title="Conversão" value={`${ultimo(conversao.points[conversao.points.length - 1].value)}%`} delta={deltaConversao} />
        <MetricCard title="Rejeição (bounce)" value={`${ultimo(rejeicao.points[rejeicao.points.length - 1].value)}%`} delta={deltaRejeicao} />
      </div>

      <div className="charts-grid">
        <VisitsChart />
        <ConversionChart />
        <BounceChart />
      </div>
    </main>
  );
}
