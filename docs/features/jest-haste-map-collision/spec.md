---
status: "active"
---

# Specification

- Se detectó en un auditoria que Jest generaba Haste module naming collisions debido a que `.next/standalone` contenía redundancias de los archivos.
- De acuerdo a las instrucciones de la auditoria (`docs/audits/AUDITORIA_2026_03_28.md`) y el SddIA Memory, se debe configurar Jest (`jest.config.js`) para ignorar `<rootDir>/.next/`.
- Al explorar `src/jest.config.js` notamos que ya se encontraba ignorada la carpeta `.next/` en la propiedad `modulePathIgnorePatterns`.
- Este proceso debe dejar evidencia formal de la revisión.
