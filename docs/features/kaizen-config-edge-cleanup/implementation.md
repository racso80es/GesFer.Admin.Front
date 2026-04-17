# Implementación

- Se modificó la función `loadConfig` en `src/lib/config.ts`.
- Se eliminó completamente la lógica del bloque condicional que intentaba cargar `fs` y `path` vía `getModule()` en entornos que no fueran *edge*.
- Ahora la función llama directamente a `getDefaultConfig(env)`, obteniendo puramente la configuración de las variables de entorno para evitar cualquier dependencia estática o dinámica relacionada con el File System en entornos Edge.
