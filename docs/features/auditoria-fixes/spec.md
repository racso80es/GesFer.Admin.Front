---
process_id: auditoria-fixes
name: Aplicar correcciones de auditorías acumuladas
description: Tarea automática para sanear hallazgos críticos y medios detectados en las últimas auditorías pendientes.
---

# Especificación

Aplicación de refactorizaciones y correcciones sobre elementos aún pendientes en main:
1. `src/app/api/companies/route.ts`, `src/app/api/companies/[id]/route.ts`: Asegurar el uso de `const message = error instanceof Error ? error.message : String(error);` en lugar de loguear directamente el objeto `error` en `console.error`.
2. `src/lib/config.ts`: Modificar `loadConfig` para que devuelva solo `getDefaultConfig(env)` sin condicionales isomorficos que utilicen el filesystem.
3. `src/lib/api/server-fetch.ts`: Cambiar la inyección de `https` por `typeof (globalThis as any).__non_webpack_require__ !== 'undefined' ? (globalThis as any).__non_webpack_require__('h' + 'ttps') : (typeof require !== 'undefined' ? require('h' + 'ttps') : null);` implementando el workaround dictado.

Nota: Tareas listadas en auditorías previas como la configuración de `tsconfig.json`, `jest.config.js`, `dynamic = "force-dynamic"`, y data fetching en `companies/page.tsx` fueron verificadas como ya aplicadas.
