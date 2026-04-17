# Objectives: Eliminar dependencia de fs en config.ts

## Propósito General
Solucionar un hallazgo crítico identificado en la auditoría del 2026-03-21, que detectó el uso inapropiado del módulo `fs` y `path` de Node en un entorno isomórfico (Edge/Browser) dentro del archivo de configuración `src/lib/config.ts`.

## Objetivos Específicos
1. Refactorizar la función `loadConfig` en `src/lib/config.ts`.
2. Remover las inyecciones dinámicas de `fs` y `path`.
3. Garantizar que la lectura y asignación de variables dependan única y exclusivamente del paso de variables de entorno (utilizando `getDefaultConfig`).
4. Evitar que la compilación y ejecución de Next.js en Edge Runtime sufra de fallos relacionados a estas importaciones estáticas fallidas.
5. Asegurar que las variables de configuración críticas (`DB_SERVER`, etc.) sigan inyectándose correctamente durante la fase de despliegue.
