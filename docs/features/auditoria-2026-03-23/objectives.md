---
id: auditoria-2026-03-23
title: Correcciones Auditoria 2026-03-23
type: feature
status: in_progress
created_at: 2026-03-23
updated_at: 2026-03-23
---

# Correcciones Auditoria 2026-03-23

## Objetivo Principal
Resolver los pain points detectados en el reporte de auditoría del 2026-03-23.

## Objetivos Específicos
- Refactorizar los route handlers en `src/app/api/companies/[id]/route.ts` y `src/app/api/companies/route.ts` para usar type guards en los bloques catch (`console.error`).
- Refactorizar el data fetching en `src/app/companies/page.tsx` para usar `getAdminApiWithToken` y evitar fetch local a proxy interno con cookies.
- Refactorizar `src/components/companies/company-form.tsx` moviendo arrays de idioma fuera de la función de render.
