# Plan

1. Modificar `src/lib/config.ts`: Quitar el bloque que evalúa `if (typeof window === 'undefined' && ...)` e invoca a `fs` y `path`.
2. Actualizar el retorno de `loadConfig()` para que devuelva el resultado de `getDefaultConfig(env)`.
3. Validar con TypeScript (`npx tsc --noEmit`), build y test.