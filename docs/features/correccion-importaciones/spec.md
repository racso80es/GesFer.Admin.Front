---
name: "Corrección de Importaciones Relativas"
process_id: "correccion-auditorias"
description: "Reemplazo de importaciones relativas largas por alias absolutos (@/) en los componentes de empresas."
related_actions:
  - "spec"
  - "implementation"
  - "validate"
---

# Especificación Técnica

## Requisitos
Se deben reemplazar las importaciones relativas (`../../../` y `../../../../`) que rompen la integridad del frontend y violan las leyes de la arquitectura (uso obligatorio del alias `@/` para cruzar límites).

## Cambios Propuestos
1. `src/app/companies/new/page.tsx`:
   - Modificar: `import { CompanyForm } from "../../../components/companies/company-form";`
   - Por: `import { CompanyForm } from "@/components/companies/company-form";`
2. `src/app/companies/[id]/edit/page.tsx`:
   - Modificar: `import { CompanyForm } from "../../../../components/companies/company-form";`
   - Por: `import { CompanyForm } from "@/components/companies/company-form";`

## Impacto
Estos cambios solo modifican las rutas de importación, no alteran el comportamiento en tiempo de ejecución, pero garantizan la correcta resolución de módulos bajo las configuraciones de Next.js.
