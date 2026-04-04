---
name: Corrección de Auditoría S+
date: 2026-04-04
type: correccion-auditorias
status: draft
---

# Especificación de Corrección SddIA

## Descripción General
Esta especificación detalla las modificaciones exactas requeridas para subsanar los hallazgos descritos en el informe del auditor correspondiente a la fecha 2026-04-04.

## Tareas de Refactorización

### 1. `src/lib/config.ts`
- Se debe eliminar la sección que intenta leer archivos `.json` locales mediante módulos de Node (`fs`, `path`).
- En su lugar, `loadConfig()` debe apoyarse directamente en `getDefaultConfig(env)`, que a su vez se basa en variables de entorno.

### 2. Integridad de Imports
- `src/app/companies/new/page.tsx`: Modificar la línea `import { CompanyForm } from "../../../components/companies/company-form";` por `import { CompanyForm } from "@/components/companies/company-form";`.
- `src/app/companies/[id]/edit/page.tsx`: Modificar la línea `import { CompanyForm } from "../../../../components/companies/company-form";` por `import { CompanyForm } from "@/components/companies/company-form";`.

### 3. Tipado en Bloques Catch
- Implementar validación estricta de tipo en todos los bloques `catch (error)` indicados por la auditoría.
- Archivos afectados:
  - `src/app/api/companies/[id]/route.ts`
  - `src/app/companies/new/page.tsx`
  - `src/app/companies/[id]/edit/page.tsx`
  - `src/components/shared/DestructiveActionConfirm.tsx`
  - `src/components/companies/company-form.tsx`
- Patrón a aplicar:
  ```typescript
  catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Contexto:", message);
  }
  ```
