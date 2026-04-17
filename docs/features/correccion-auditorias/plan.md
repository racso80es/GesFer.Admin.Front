---
title: Plan - Corrección Auditorías
date: "2026-04-15"
---

# Plan de Ejecución

1. Modificar `src/app/companies/new/page.tsx`:
   - Encontrar el bloque de captura de excepciones.
   - Extraer mensaje.
2. Modificar `src/app/companies/[id]/edit/page.tsx`:
   - Corregir el primer bloque catch en `fetchCompany`.
   - Corregir el segundo bloque catch en `onSubmit`.
3. Compilar usando `cd src && npm run build` e inicializar el servidor de forma silenciosa para testar el build.
4. Ejecutar tests con `cd src && npm run test`.
5. Ejecutar pasos previos al commit y registrar hallazgos en validacion.md.