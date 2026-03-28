# Objetivos de Corrección (Auditoría 2026-03-28)

## 1. Contexto
Se ha realizado una auditoría (ref: `docs/audits/AUDITORIA_2026_03_28.md`) y se ha detectado un Pain Point de prioridad media: una colisión de nombres de módulos en `jest-haste-map` causada por la generación del directorio `.next/standalone/`.

## 2. Hallazgos Consolidados
1. **[MEDIO] Haste module naming collision en Jest**
   - **Descripción:** Jest reporta colisiones al indexar múltiples archivos `package.json` (el de la raíz y el generado en la compilación standalone).
   - **Impacto:** Logs sucios y posible inestabilidad en la resolución de módulos de Jest.
   - **Ubicación:** `src/jest.config.js`.

## 3. Alcance y Criterios de Cierre
- Modificar la configuración de Jest para que el `modulePathIgnorePatterns` evite procesar la carpeta `.next/`.
- **Cierre:** Al ejecutar `cd src && npm run test`, los logs deben estar limpios sin advertencias de colisión de haste-map.
