---
title: Kaizen Error Handling in companies/[id]
type: Process Task
status: Active
---

# Especificación Técnica

## Tarea
Implementar Type Guards en los bloques `catch` dentro de los route handlers de `src/app/api/companies/[id]/route.ts`.

## Motivación
La auditoría del proyecto S+ indica que existe un dolor crítico por no aislar adecuadamente los mensajes de error devueltos, pasando el objeto raw `error` directamente al logger. Es imperativo acatar los estándares de Clean Code del proyecto mediante la inyección del guardia de tipos de TypeScript.

## Detalle Técnico
1. Localizar los tres métodos HTTP expuestos en el route handler:
   - `export async function GET`
   - `export async function PUT`
   - `export async function DELETE`
2. Identificar el bloque `catch (error) { ... }` en cada uno de ellos.
3. Modificar el bloque para asignar una constante `message` usando un chequeo `instanceof`:
   ```typescript
   catch (error) {
     const message = error instanceof Error ? error.message : String(error);
     console.error(`Error <contexto>:`, message);
     return NextResponse.json( ... );
   }
   ```
4. Confirmar la ausencia de referencias al objeto `error` en los argumentos de `console.error`.

## Definition of Done (DoD)
- Ningún archivo de la ruta especificada usa `console.error(..., error)`.
- Uso consistente de `const message = error instanceof Error ? error.message : String(error);`.
- `npx tsc --noEmit` exitoso.
- Ejecución correcta en el CI pipeline local.
