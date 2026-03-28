---
title: Kaizen Auditoría 2026-03-23
description: Implementación de type guards en bloques catch de los route handlers listados en la auditoría.
status: in_progress
type: automatic_task
process_ref: SddIA/process/automatic-task
---

# Spec

## Requisitos de Arquitectura
- El backend frontend (`src/app/api`) no debe exponer ni loguear objetos de error directos como `console.error("...", error)`.
- Se debe extraer un type guard estricto: `const message = error instanceof Error ? error.message : String(error);`.

## Scope de Cambios
- `src/app/api/admin/dashboard/summary/route.ts`
- `src/app/api/companies/[id]/route.ts` (GET, PUT, DELETE)
- `src/app/api/companies/route.ts` (POST)