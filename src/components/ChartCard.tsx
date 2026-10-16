/**
 * Card que envolve um gráfico: título de seção + área do canvas.
 */

import { type ReactNode } from "react";

export interface ChartCardProps {
  title: string;
  children: ReactNode;
}

export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <section aria-label={title} className="chart-card">
      <h3 className="chart-title">{title}</h3>
      <div className="chart-wrap">{children}</div>
    </section>
  );
}
