# Objetivos: Corrección de Importaciones Relativas

## Objetivo Principal
Corregir las importaciones relativas largas (`../../../` y `../../../../`) en los archivos del frontend, reemplazándolas por el alias absoluto `@/` para cumplir con las convenciones de integridad arquitectónica del proyecto Next.js.

## Hallazgos Consolidados
* **🔴 Crítico:** Importaciones relativas inválidas que rompen la integridad estructural de Next.js.
  * **Ubicación 1:** `src/app/companies/new/page.tsx:3` (`import { CompanyForm } from "../../../components/companies/company-form";`)
  * **Ubicación 2:** `src/app/companies/[id]/edit/page.tsx:3` (`import { CompanyForm } from "../../../../components/companies/company-form";`)

## Criterios de Cierre (Definition of Done)
1. Los archivos mencionados usan `@/components/...` en lugar de paths relativos.
2. La ejecución de `cd src && npx tsc --noEmit` es exitosa.
3. La ejecución de `cd src && npm run build` compila correctamente.
4. Las pruebas unitarias/E2E pasan correctamente (`npm run test`).
