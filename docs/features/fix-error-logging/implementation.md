# Implementación
- Se modificó `src/app/api/companies/[id]/route.ts`.
- Se modificó `src/app/api/companies/route.ts`.
- En todos los bloques `catch (error)` que mostraban el error en consola, se agregó `const message = error instanceof Error ? error.message : String(error);`.
- La llamada de `console.error` fue sustituida por `console.error(..., message)`.
