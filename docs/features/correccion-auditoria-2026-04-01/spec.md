---
type: "specification"
feature: "correccion-auditoria-2026-04-01"
status: "active"
---

# Especificación Técnica - Corrección de Auditoría 2026-04-01

Esta especificación detalla las modificaciones a realizar en los archivos reportados por la auditoría de Frontend debido a la violación de la regla `Import Integrity`.

## Archivos Afectados

1.  `src/app/companies/new/page.tsx`
2.  `src/app/companies/[id]/edit/page.tsx`
3.  `src/components/companies/company-form.tsx`

## Modificaciones

-   **En `app/companies/new/page.tsx`:** Cambiar `import { CompanyForm } from "../../../components/companies/company-form";` por `import { CompanyForm } from "@/components/companies/company-form";`.
-   **En `app/companies/[id]/edit/page.tsx`:** Cambiar `import { CompanyForm } from "../../../../components/companies/company-form";` por `import { CompanyForm } from "@/components/companies/company-form";`.
-   **En `components/companies/company-form.tsx`:** Cambiar imports relativos como `import { Button } from "../ui/button";` a sus equivalentes usando el alias `@/components/ui/button`. Repetir para `Input`, `Label` y `ErrorMessage`.
