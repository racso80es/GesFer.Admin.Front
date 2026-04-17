# Objectives

The objective of this Kaizen task is to address critical error handling issues identified in the audit `AUDITORIA_2026_03_23.md`. Specifically, it fixes instances where `console.error` exposes the `error` object directly in API routes (`src/app/api/`), violating the strict TypeScript error handling directive.

The task will inject explicit type guards (`instanceof Error`) in catch blocks to extract a safe string message and prevent logging `unknown` types directly.

## Scope

*   `src/app/api/companies/[id]/route.ts`
*   `src/app/api/companies/route.ts`
