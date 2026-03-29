---
title: Especificación de la Tarea Kaizen - Manejo de Errores (Auditoría 2026-03-23)
type: specification
status: draft
---

# Especificación

## Detalles del Hallazgo
En `src/app/api/companies/[id]/route.ts` y `src/app/api/companies/route.ts` se están interceptando errores usando bloques `catch(error)`. Actualmente se imprimen dichos errores de la siguiente manera:
- `console.error("Error creating company:", error);` o similar.

Esto es problemático y rompe los estándares de codificación (type-safety, fuga de variables desconocidas a logs) del proyecto (detallados en `docs/audits/AUDITORIA_2026_03_23.md` y `AGENTS.md`).

## Solución Propuesta
Refactorizar cada uno de los bloques catch referenciados:
1. Declarar un string explícito extraído: `const message = error instanceof Error ? error.message : String(error);`
2. Usarlo en `console.error` de forma segura.

Endpoints impactados:
- `GET`, `PUT`, `DELETE` en `src/app/api/companies/[id]/route.ts`
- `POST` en `src/app/api/companies/route.ts` (GET ya estaba refactorizado)