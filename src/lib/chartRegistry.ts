/**
 * Registra os elementos do Chart.js usados pelos gráficos do dashboard.
 * Builds ESM do Chart.js não auto-registram controllers/escalas, então isso
 * é necessário tanto na aplicação quanto nos testes.
 */

import {
  Chart,
  CategoryScale,
  Filler,
  LinearScale,
  Legend,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);
