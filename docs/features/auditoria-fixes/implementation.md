# Implementación

- **Refactorización de Route Handlers (`src/app/api/companies/[id]/route.ts` y `src/app/api/companies/route.ts`):**
  - Se sustituyeron los pases de objetos de error directos a `console.error` por type guards que extraen la propiedad de mensaje explícitamente (`const message = error instanceof Error ? error.message : String(error);`).

- **Saneamiento isomorfico en Configuración (`src/lib/config.ts`):**
  - Se removió la resolución de archivos locales en la función `loadConfig`, erradicando el uso del módulo `fs` y garantizando que el origen de la configuración dependa estrictamente de las variables de entorno inyectadas en la aplicación y retornadas por `getDefaultConfig`.

- **Estabilidad de Patrones en Fetch Server-Side (`src/lib/api/server-fetch.ts`):**
  - La importación del módulo HTTPS ha sido sustituida por el patrón robusto dictado por Cúmulo/SddIA: `typeof (globalThis as any).__non_webpack_require__ !== 'undefined' ? (globalThis as any).__non_webpack_require__('h' + 'ttps') : (typeof require !== 'undefined' ? require('h' + 'ttps') : null);`. Este cambio remueve el hacking e implementa una validación segura que elide el análisis estático en Webpack sin poner en riesgo la ejecución ni romper las directrices de Cúmulo.
