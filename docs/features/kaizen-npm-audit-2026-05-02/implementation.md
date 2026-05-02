# Implementation
- Se ejecutó una mitigación táctica para contener vulnerabilidades en dependencias usando overrides sin forzar un "breaking change" de versión mayor de Next.js.
- Se redujeron las vulnerabilidades totales de 9 a 3, bloqueando aquellas en `glob` y `postcss` a través de overrides de dependencias internas.
- Se documentan explícitamente 3 fallas remanentes en Next.js (Denial of Service HTTP request deserialization, Unbounded disk cache growth, y DoS con Server Components) cuyo arreglo está condicionado a una migración forzada a Next.js 15.
- La resolución final de las 3 vulnerabilidades de Next.js se derivan a una Tarea Épica dedicada en `docs/TASKS/Pendiente_Migracion_Next15.md` para evitar entropía en el sistema.