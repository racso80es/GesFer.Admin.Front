# Implementación: Type Guards en Catch Blocks Globales

## Cambios Realizados

1. **`src/components/shared/DestructiveActionConfirm.tsx`**:
   - Se modificó el bloque `catch (error)` en la función `handleConfirm`.
   - Se añadió el type guard `const message = error instanceof Error ? error.message : String(error);`.
   - Se actualizó el log `console.error("Error al ejecutar acción destructiva:", message);`.

2. **`src/app/dashboard/page.tsx`**:
   - Se modificó el bloque `catch (err)` en la función `fetchSummary`.
   - Se añadió el type guard `const message = err instanceof Error ? err.message : String(err);`.
   - Se actualizó el log `console.error("Error al cargar el resumen:", message);`.

3. **`src/app/login/page.tsx`**:
   - Se modificó el bloque `catch (err)` en la función `onSubmit`.
   - Se añadió el type guard `const message = err instanceof Error ? err.message : String(err);`.
   - Se actualizó el log `console.error("Error en login administrativo:", message);`.

Todos estos cambios aseguran que ninguna variable `unknown` sea pasada directamente a `console.error`, previniendo potenciales vulnerabilidades o errores en el stack de logging.
