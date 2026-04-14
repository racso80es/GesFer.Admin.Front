# Auditoría GesFer Admin (2026-03-23)

## 1. Métricas de Salud (0-100%)
- Arquitectura: 80%
- Nomenclatura: 90%
- Estabilidad Async: 85%

## 2. Pain Points (🔴 Críticos / 🟡 Medios)

- 🟡 **Medio:** Hallazgo: Lógica de negocio de idiomas ("hardcoded" `languageOptions` y `languageNames`) acoplada al render del componente en lugar de estar extraída fuera.
  - Ubicación: `src/components/companies/company-form.tsx` (líneas 29-48).

- 🟡 **Medio:** Hallazgo: Llamada inestable a la API en un componente de servidor mediante `fetch` local al route handler que requiere pasar cookies en lugar de usar Server Actions o el proxy interno.
  - Ubicación: `src/app/companies/page.tsx` (líneas 19-45).

- 🔴 **Crítico:** Hallazgo: Uso de `console.error` pasando directamente el objeto `error` original junto al message extraído.
  - Ubicación: `src/app/api/admin/dashboard/summary/route.ts` (línea 19).

- 🔴 **Crítico:** Hallazgo: Uso de `console.error` pasando el objeto de error sin extraer un string seguro usando type guard, violando la directiva de código estricto.
  - Ubicación: `src/app/api/companies/[id]/route.ts` (líneas 27, 46, 64).

- 🔴 **Crítico:** Hallazgo: Uso de `console.error` pasando el objeto de error original, o sin extraer un type guard en el endpoint de POST.
  - Ubicación: `src/app/api/companies/route.ts` (líneas 17, 36).

## 3. Acciones Kaizen (Hoja de Ruta para el Executor)

- **Instrucción 1:** Modificar los route handlers listados para implementar type guards estrictos de TypeScript:
  ```typescript
  catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Mensaje de error:", message); // SIN pasar `error` al final
    // ...
  }
  ```
  - **DoD:** Ningún archivo en `src/app/api/` usa `console.error` con el objeto `error` expuesto directamente; todos usan el string guard.

- **Instrucción 2:** Refactorizar el data fetching en `companies/page.tsx`.
  - Reemplazar el bloque try-catch que hace `fetch` local a `/api/companies` por una llamada limpia usando `getAdminApiWithToken`.
  - **DoD:** La tabla de empresas carga usando proxy interno.

- **Instrucción 3:** Refactorizar `company-form.tsx`.
  - Extraer los arrays constantes `languageOptions` y `languageNames` al root de este archivo.
  - **DoD:** La función render del componente `CompanyForm` no re-crea estos diccionarios en cada ciclo.
