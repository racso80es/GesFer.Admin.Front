# Plan: Corrección Edge config

## Contexto
Resolver la violación de las leyes universales de SddIA respecto al entorno isomorfico/Edge (Edge Runtime), donde los módulos fs/path no están disponibles en tiempo de construcción del Next.js Edge.

## Acciones

1.  **Refactorización config.ts (Implementación)**
    - Reemplazar bloque `if (typeof window === 'undefined' ...)` por una simple invocación a `getDefaultConfig(env)`.
    - Eliminar toda referencia explícita a `fs`, `path`, `globalThis.__non_webpack_require__` en `src/lib/config.ts`.

2. **Verificación de Integridad de la Compilación (Testability & Audit)**
    - `cd src && npm install`
    - `cd src && npx tsc --noEmit`
    - `cd src && npm run build`
    - `cd src && npm run test`

3. **Cierre del Kaizen**
    - Registrar en `implementation.md` el proceso de modificación.
    - Registrar en `validacion.md` el output de los tests y compilación.
    - Cierre final en `finalize.md`.
    - Registrar en `EVOLUTION_LOG.md`.