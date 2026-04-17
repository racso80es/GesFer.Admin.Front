---
type: "feature"
feature_id: "kaizen-jest-haste-map"
title: "Fix Jest Haste Map Collision"
status: "active"
---

# Especificaciones Técnicas

## Requerimiento
Añadir el directorio `.next/` a la propiedad `modulePathIgnorePatterns` en el archivo `src/jest.config.js` para que `jest-haste-map` ignore los archivos redundantes de standalone generados por Next.js.

## Condiciones de Aceptación (DoD)
El comando `cd src && npm run test` debe ejecutarse limpiamente, sin mostrar el warning de "*jest-haste-map: Haste module naming collision*".
