# Brief — dashboard-metricas-site

**Projeto:** dashboard-metricas-site  
**Área:** Frontend  
**Autor:** Kelvin Oliveira  
**Destinatário:** workflow manager (validação)

## O que foi entregue

Dashboard de métricas de site de página única (React 18 + TypeScript strict + Chart.js), construído com Vite e testado com Vitest.

**Escopo MVP (conforme PLANO_50_PROJETOS.md):**
- Métricas de site: visitas, taxa de conversão, taxa de rejeição (bounce)
- Três gráficos de linha (últimos 30 dias) + cartões resumo com o último valor de cada métrica
- Dados sintéticos determinísticos: época fixa (2026-01-01), geração por semente + índice; sem `Math.random()` nem `Date.now()`

**Critérios de aceitação — todos atendidos:**
1. Gráficos renderizam (visitas, conversão, bounce) — componente `VisitsChart` testado com render real de canvas via Chart.js + jsdom
2. Testes que passam — 13/13, 3 arquivos de teste
3. README PT-BR + EN completo (título, descrição, stack, como usar, testes, licença MIT, autor)

## Arquivos criados

Raiz:
- `package.json` — dependências e scripts (npm, `"type": "module"`)
- `tsconfig.json` — `strict: true`
- `vite.config.ts` — Vite + Vitest (jsdom, globals)
- `index.html`
- `README.md` — bilíngue PT-BR / EN
- `BRIEF.md` — este arquivo

`src/`:
- `main.tsx` — ponto de entrada (React 18 createRoot)
- `App.tsx` — layout do dashboard (header, 3 cards, 3 gráficos)
- `index.css` — estilos base
- `data/metrics.ts` — gerador de métricas sintéticas determinísticas
- `lib/chartUtils.ts` — conversão de séries em datasets do Chart.js (puro)
- `lib/chartRegistry.ts` — registro dos controllers/escalas do Chart.js
- `components/ChartCard.tsx`, `components/MetricCard.tsx`
- `components/VisitsChart.tsx`, `components/ConversionChart.tsx`, `components/BounceChart.tsx`

`test/`:
- `setup.ts` — shims jsdom (canvas 2D, ResizeObserver)
- `data/metrics.test.ts` — 9 testes
- `lib/chartUtils.test.ts` — 3 testes
- `components/VisitsChart.test.tsx` — 1 teste

`dist/` — build de produção (gerado por `npm run build`).

## Como verificar

```bash
cd C:\Users\Kelvin\AppData\Local\Temp\opencode\github-staging\projects\dashboard-metricas-site
npm install
npm run build      # tsc --noEmit + vite build (deve sair limpo)
npm test           # vitest run (resultado esperado: 13 passed, 0 failed)
```

Resultado da última verificação (esta sessão):
- `npm run build`: aprovado — TypeScript sem erros, build de produção gerado em `dist/`
- `npm test`: aprovado — Test Files 3 passed, Tests 13 passed

Caminhos dos documentos:
- README: `...\dashboard-metricas-site\README.md`
- BRIEF: `...\dashboard-metricas-site\BRIEF.md`

Licença: MIT.
