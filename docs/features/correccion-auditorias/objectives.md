---
title: Objectives - Corrección Auditorías
feature_id: correccion-auditorias
date: "2026-04-15"
---

# Objetivos: Corrección de Auditorías S+

## Objetivo principal

Corregir los hallazgos de auditoría (marzo–abril de 2026) sobre manejo estricto de errores en rutas API y en las páginas de organizaciones (“companies”).

## Objetivos específicos

- Refactorizar `src/app/api/companies/route.ts` y `src/app/api/companies/[id]/route.ts` con type guards en los bloques `catch`.
- Aplicar el mismo patrón en `src/app/companies/new/page.tsx` y `src/app/companies/[id]/edit/page.tsx`.
- Extraer mensajes seguros con `error instanceof Error ? error.message : String(error)`.
- Evitar que el valor `unknown` del `catch` se pase directamente a `console.error`, `setError` o `setSubmitError`.
- Cumplir la directiva SddIA de código estricto (Testability, Audit & Judge).
