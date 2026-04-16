# Objectives

Eliminar el uso de sistema de archivos (`fs`, `path`) en el entorno isomórfico dentro de `src/lib/config.ts`. La configuración del sistema debe recaer estricta y puramente en las variables de entorno inyectadas al proceso mediante el método `getDefaultConfig`.
