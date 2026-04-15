---
title: Kaizen - Manejo de errores estricto en API (Auditoría 2026-03-23)
type: kaizen
status: open
---

# Objetivos

- Mejorar el manejo de errores en los route handlers de Next.js (`src/app/api/companies/[id]/route.ts` y `src/app/api/companies/route.ts`).
- Cumplir con la directiva estricta de TypeScript: Nunca loguear ni devolver el tipo `unknown` de un error en el bloque `catch`.
- Implementar "string guards" (`error instanceof Error`) para extraer los mensajes de forma segura.
- Asegurar que el objeto original `error` no se pasa directamente a las funciones `console.error()`.