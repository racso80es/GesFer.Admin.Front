# Implementación

- **Archivo Modificado:** `src/lib/config.ts`
- **Acción:** Se eliminó por completo el bloque condicional que intentaba cargar los módulos `fs` y `path` mediante `__non_webpack_require__` y evaluar si existía un archivo local en la carpeta `config`.
- **Justificación:** La arquitectura SddIA y el uso de Next.js Edge Runtime no permiten la inclusión estática o dinámica de dependencias vinculadas al disco local (sistema de archivos). Se simplificó la función `loadConfig` para que invoque y retorne el resultado de `getDefaultConfig(env)`, apoyándose enteramente en las variables de entorno inyectadas.
- **DoD Completado:**
  - [x] Sin referencias a `fs` y `path` en `config.ts`.
  - [x] `loadConfig()` se basa en `getDefaultConfig(env)`.