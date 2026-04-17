---
type: "process"
name: "Corrección Auditoría 2026-04-03"
description: "Resolución de problemas de nomenclatura de importación."
---

# Especificación Técnica

## Contexto
El Agente Auditor detectó importaciones relativas (`../../..`) cruzando límites entre la carpeta de rutas `app` y la carpeta `components`. La convención del proyecto requiere que estos accesos se realicen exclusivamente a través del alias `@/`.

## Cambios Requeridos

### Archivo 1: `src/app/companies/new/page.tsx`
*   **Actual:** `import { CompanyForm } from "../../../components/companies/company-form";`
*   **Nuevo:** `import { CompanyForm } from "@/components/companies/company-form";`

### Archivo 2: `src/app/companies/[id]/edit/page.tsx`
*   **Actual:** `import { CompanyForm } from "../../../../components/companies/company-form";`
*   **Nuevo:** `import { CompanyForm } from "@/components/companies/company-form";`

## Restricciones
- Solo se deben modificar las líneas afectadas.
- No se introducen nuevas dependencias.
- No se cambia la funcionalidad, solo el mapeo del import.