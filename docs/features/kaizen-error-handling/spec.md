---
type: process
status: active
name: Kaizen Error Handling
description: Implementation of strict TypeScript error handling with type guards for route handlers.
---

# Specification

## 1. Contexto
En la auditoría del `2026-03-23`, se identificaron varios **Pain Points Críticos** relacionados con el manejo de excepciones en la capa de API (Route Handlers) del proyecto Next.js. Se detectó que se estaban pasando objetos de error capturados (con tipo inferido `unknown`) directamente al log a través de `console.error` o no se estaban utilizando Type Guards estrictos (`error instanceof Error`).

## 2. Alcance (Scope)
El alcance de esta refactorización está limitado a los siguientes archivos identificados:
- `src/app/api/companies/[id]/route.ts`
- `src/app/api/companies/route.ts`

(Nota: `src/app/api/admin/dashboard/summary/route.ts` ya se encontraba refactorizado y en cumplimiento).

## 3. Requerimientos Técnicos
- Todos los bloques `catch (error)` dentro del alcance deben incluir la siguiente línea para extraer de forma segura el mensaje de error:
  `const message = error instanceof Error ? error.message : String(error);`
- La instrucción `console.error(...)` solo debe recibir literales de cadena (strings) generados o constantes y la variable `message` tipada de forma segura. Bajo ninguna circunstancia se debe pasar la variable original `error`.
- Se debe asegurar que las respuestas devueltas por `NextResponse.json(...)` tampoco expongan objetos no serializados en sus campos de detalle (detail), utilizando también la variable `message` extraída de forma segura.
