---
title: "Actualizacion de Readme - Implementación"
type: "feature-implementation"
---

# Implementación: Actualizacion de Readme

## Resumen de Cambios
1. Se unificó el contenido de `README.md` de la raíz del repositorio y de `src/README.md`.
2. Se reescribió la información clave en `README.md` raíz, incluyendo Arquitectura (con menciones al patrón SddIA), Configuración y Entorno (variables de entorno), Desarrollo (uso de `cd src`) y Testing.
3. Se eliminó `src/README.md`.

## Decisiones Técnicas
- Mantener toda la documentación en un solo punto en la raíz promueve la SSOT (Single Source of Truth), evitando la confusión sobre qué `README.md` leer.
- Se explicitaron los comandos de ejecución necesarios para el entorno que se ejecuta desde la carpeta `src`.
