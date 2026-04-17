---
title: Correcciones Auditorías
status: Implementation
type: Refactorization
---

# Technical Specification: Correcciones de Auditoría

## Contexto
Durante la auditoría `AUDITORIA_2026_03_23.md`, se identificaron varios problemas en el manejo de logs de error en componentes del servidor y handlers de API. Específicamente, se estaban pasando objetos `error` crudos al log `console.error` en lugar de mensajes sanitizados con guards de tipo estricto en Typescript, y variables constantes se estaban inicializando en cada ciclo de render del componente.

## Alcance Técnico
- `src/app/api/companies/[id]/route.ts`:
  - `console.error("Error fetching company...", error)` -> extraer mensaje
  - `console.error("Error updating company...", error)` -> extraer mensaje
  - `console.error("Error deleting company...", error)` -> extraer mensaje
- `src/app/api/companies/route.ts`:
  - Asegurar que la creación/fetching de compañías usa un string estricto.
- `src/app/companies/page.tsx`:
  - Remocionar el objeto de error crudo expuesto: `console.error("Error fetching companies:", message, error);` a `console.error("Error fetching companies:", message);`.
- `src/components/companies/company-form.tsx`:
  - Asegurar que las variables estáticas y opciones de idioma se encuentran definidas a nivel de módulo, no instanciadas al invocar el componente `CompanyForm`.