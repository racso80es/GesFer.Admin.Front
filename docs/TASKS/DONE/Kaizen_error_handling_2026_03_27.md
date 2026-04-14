# Kaizen: Manejo de Errores Inseguro en Bloques Catch (Falta Type Guard)

**ID Tarea:** Kaizen_error_handling_2026_03_27
**Origen:** docs/audits/AUDITORIA_2026_03_27.md

## Descripción
El código está registrando o utilizando el objeto de error inferido como `unknown` en bloques `catch` de forma directa (`console.error(err)` o `console.error(error)`), sin extraer el mensaje utilizando un type guard (`instanceof Error`), lo cual incumple la directiva estricta de TypeScript: "Strict TypeScript error handling is required. Inside `catch (error)` blocks, never log or use the inferred `unknown` error object directly".

## Ubicaciones
- `src/app/dashboard/page.tsx:57`
- `src/app/login/page.tsx:57`
- `src/app/companies/page.tsx:35`
- `src/app/companies/new/page.tsx:31`
- `src/app/companies/[id]/edit/page.tsx:29`
- `src/components/shared/DestructiveActionConfirm.tsx:56`
- `src/components/companies/company-form.tsx:113`
- `src/lib/api/admin-api-server.ts:36`
- `src/lib/config.ts:94`
- `src/components/ui/overlay-fix.tsx:59`

## Acción
1. Navegar a cada uno de los archivos listados.
2. Localizar el bloque `catch (err)` o `catch (error)`.
3. Inyectar: `const message = error instanceof Error ? error.message : String(error);`
4. Reemplazar uso de `err`/`error` directo por `message` en `console.error`.
