# Objetivos: Fix API Error Logging

- Aplicar type guards estrictos de TypeScript (`error instanceof Error`) en todos los bloques `catch` de la ruta `src/app/api/companies/[id]/route.ts`.
- Asegurar que `console.error` solo reciba strings seguros (ej. el mensaje del error) y nunca el objeto `error` directamente, según la convención del proyecto y la directiva Kaizen en `docs/audits/AUDITORIA_2026_03_23.md`.
