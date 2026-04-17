---
name: "Kaizen Fix Error Logs"
description: "Corrige el manejo de excepciones en endpoints de la API reemplazando el paso directo de error a console.error por type guards."
process_id: "correccion-auditorias"
---

# Kaizen Fix Error Logs - Especificación

## Contexto
El código de la API no cumplía con los estándares de TypeScript para manejo seguro de excepciones, lo cual ocasiona que `console.error` reciba variables desconocidas (`unknown`).

## Especificación Técnica
En los siguientes archivos, se deben interceptar las excepciones en los bloques `try/catch`:
- `src/app/api/companies/route.ts` (método `POST`)
- `src/app/api/companies/[id]/route.ts` (métodos `GET`, `PUT`, `DELETE`)

El patrón de refactorización requerido es:
```typescript
catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Mensaje especifico del log:", message);
  // ... resto del bloque, ej. NextResponse.json(...)
}
```