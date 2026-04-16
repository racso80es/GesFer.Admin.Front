# Validacion

## Procedimiento de Validación
1. Confirmación de modificación en `config.ts`.
2. Ejecución exitosa de `cd src && npx tsc --noEmit`.
3. Ejecución exitosa de `cd src && npm run test`.
4. Compilación limpia a través de `cd src && npm run build` (sin errores de Next.js Edge ni referenciando a `fs`/`path`).