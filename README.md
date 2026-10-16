# Dashboard de Métricas de Site / Site Metrics Dashboard

Dashboard de métricas de site com React 18, TypeScript e Chart.js. Mostra três gráficos de linha: visitas, taxa de conversão e taxa de rejeição (bounce). Os dados são sintéticos e determinísticos: a mesma versão produz sempre os mesmos valores e datas (não há `Math.random()` nem `Date.now()`), o que torna o comportamento previsível em testes e em novas compilações.

## PT-BR

### Descrição

Aplicação de front-end de página única que exibe cartões resumo (visitas, conversão, rejeição) e três gráficos de linha com os últimos 30 dias de métricas de um site. Útil como base para dashboards reais substituindo o gerador de dados por uma API.

### Stack

- React 18 + TypeScript (strict)
- Chart.js + react-chartjs-2
- Vite (build e dev server)
- Vitest + jsdom (testes)

### Como usar

```bash
npm install
npm run dev        # servidor de desenvolvimento
npm run build      # tsc --noEmit + build de produção
npm test           # suíte de testes (vitest run)
npm run preview    # pré-visualiza o build
```

### Testes

13 testes em 3 arquivos, cobrindo geração de dados, montagem de datasets do Chart.js e renderização do componente `VisitsChart`:

- `test/data/metrics.test.ts` — 9 testes
- `test/lib/chartUtils.test.ts` — 3 testes
- `test/components/VisitsChart.test.tsx` — 1 teste

Todos determinísticos; não há mocks de API nem dependência de rede.

### Licença

MIT

### Autor

Kelvin Oliveira

---

## EN

### Description

Single-page front-end application that shows summary cards (visits, conversion, bounce) and three line charts with the last 30 days of site metrics. Useful as a base for real dashboards; replace the synthetic data generator with an API.

### Stack

- React 18 + TypeScript (strict)
- Chart.js + react-chartjs-2
- Vite (dev server and production build)
- Vitest + jsdom (tests)

### How to use

```bash
npm install
npm run dev        # development server
npm run build      # tsc --noEmit + production build
npm test           # test suite (vitest run)
npm run preview    # preview the production build
```

### Tests

13 tests in 3 files, covering data generation, Chart.js dataset building, and `VisitsChart` component rendering:

- `test/data/metrics.test.ts` — 9 tests
- `test/lib/chartUtils.test.ts` — 3 tests
- `test/components/VisitsChart.test.tsx` — 1 test

All deterministic; no API mocks, no network dependency.

### License

MIT

### Author

Kelvin Oliveira
