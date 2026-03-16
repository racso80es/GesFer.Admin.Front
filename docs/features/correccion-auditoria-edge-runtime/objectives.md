# Objetivos
Corregir la advertencia y potencial error de compatibilidad del runtime Edge provocado por el uso del módulo de Node.js `https` en el archivo `src/lib/api/server-fetch.ts`.

## Meta
Alcanzar un log limpio ("Compiled successfully") sin warnings sobre carga de módulos incompatibles al ejecutar `npm run build`.

## Justificación
La importación del módulo `https` interfiere con el entorno Edge (Route Handlers, Middleware, Edge functions en Next.js). Como regla establecida en las métricas de salud (85% Estabilidad Async), se debe garantizar que el proyecto se pueda construir limpiamente.