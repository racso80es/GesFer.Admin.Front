# Plan de Implementación

1. **Modificar `src/components/shared/DestructiveActionConfirm.tsx`**:
   - Reemplazar el bloque `catch (error)` en `handleConfirm` para extraer el mensaje usando `error instanceof Error ? error.message : String(error)`.
2. **Modificar `src/app/dashboard/page.tsx`**:
   - Reemplazar el bloque `catch (err)` en `fetchSummary` para extraer el mensaje.
3. **Modificar `src/app/login/page.tsx`**:
   - Reemplazar el bloque `catch (err)` en `onSubmit` para extraer el mensaje.
4. **Verificación**:
   - Compilar el proyecto con `cd src && npx tsc --noEmit` y `cd src && npm run build`.
   - Ejecutar pruebas con `cd src && npm run test`.
