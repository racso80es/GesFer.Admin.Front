---
id: correccion-auditorias-20260326
title: Corrección de Auditoría Frontend 2026-03-26
status: planning
process_ref: paths.processPath/correccion-auditorias
---

# Especificación: Corrección de Auditoría Frontend 2026-03-26

## 1. Resumen
Modificar las referencias relativas a módulos internos que escapan de las fronteras lógicas y arquitectónicas, reemplazándolas por alias `@/`. Esto permite mantener los principios Testability y Resiliencia en un proyecto que requiere un 100% de calidad estructural.

## 2. Componentes Afectados y Modificaciones Necesarias

### 2.1. `src/components/companies/company-form.tsx`
- **Cambio:** Convertir `import { Button } from "../ui/button";` a `import { Button } from "@/components/ui/button";`
- **Cambio:** Convertir `import { Input } from "../ui/input";` a `import { Input } from "@/components/ui/input";`
- **Cambio:** Convertir `import { Label } from "../ui/label";` a `import { Label } from "@/components/ui/label";`
- **Cambio:** Convertir `import { ErrorMessage } from "../ui/error-message";` a `import { ErrorMessage } from "@/components/ui/error-message";`

### 2.2. `src/app/companies/page.tsx`
- **Cambio:** Convertir `import { Button } from "../../components/ui/button";` a `import { Button } from "@/components/ui/button";`

### 2.3. `src/app/companies/new/page.tsx`
- **Cambio:** Convertir `import { CompanyForm } from "../../../components/companies/company-form";` a `import { CompanyForm } from "@/components/companies/company-form";`

### 2.4. `src/app/companies/[id]/edit/page.tsx`
- **Cambio:** Convertir `import { CompanyForm } from "../../../../components/companies/company-form";` a `import { CompanyForm } from "@/components/companies/company-form";`

## 3. Riesgos y Mitigación
- **Riesgo:** Un error tipográfico en la ruta del alias podría romper la compilación.
- **Mitigación:** Después de los reemplazos, la fase obligatoria exige la ejecución de `npx tsc --noEmit`, garantizando validación estricta de TypeScript.

## 4. Dependencias SddIA
- `paths.auditsPath`
- `paths.processPath/correccion-auditorias`
- Reglas: *Layer Leakage* e *Import Integrity*.