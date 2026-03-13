# Corrección según Auditoría (2026-03-13)

## Objetivos
1. Resolver tests E2E y unitarios que rompen el pipeline de CI, restaurando la Integridad Estructural del código (The Wall) pero respetando la deuda técnica y evitando atajos.
2. Arreglar los warnings de Accesibilidad (A11y) en el componente Select (`src/components/ui/select.tsx`) usando identificadores dinámicos.

## Hallazgos Consolidados
1. **[CRÍTICO]** Tests fallidos: Jest estaba intentando correr archivos de Playwright (`tests/*.spec.ts`). Además de un error en `config.test.ts` de Jest por no tener tests.
2. **[MEDIO]** Lint warnings: `aria-controls` y `aria-selected` faltantes en `src/components/ui/select.tsx`.

## Criterios de Cierre
1. `npm run test` corre exitosamente sin ignorar tests unitarios (se arregla el setup).
2. `npm run lint` pasa sin advertencias relacionadas con A11y de ARIA y usando `React.useId` para evitar deuda técnica.
