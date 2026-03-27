# Objetivos de la corrección según auditoría

**Fecha de la Auditoría:** 2026-03-20

## 1. Hallazgos Consolidados

### Hallazgo 1: Manejo Inseguro de Excepciones (Type Safety en Catch Blocks)
**Prioridad:** Media
- **Descripción:** En varios bloques `catch`, el objeto `error` (inferred `unknown`) es pasado directamente a console.error sin un type check (ej. `error instanceof Error`).
- **Archivos Afectados:**
  - `src/app/api/companies/[id]/route.ts`
  - `src/app/api/companies/route.ts`
  - `src/app/companies/new/page.tsx`
  - `src/app/companies/[id]/edit/page.tsx`

### Hallazgo 2: Falta de Feedbacks Visuales por Errores en Formularios (UI)
**Prioridad:** Media
- **Descripción:** En las páginas de creación y edición, los errores se ignoran visualmente limitándose a comentarios de código `// Handle error (e.g., show toast)`.
- **Archivos Afectados:**
  - `src/app/companies/new/page.tsx`
  - `src/app/companies/[id]/edit/page.tsx`

## 2. Alcance y Criterios de Cierre

### Alcance
- Refactorizar todos los bloques catch involucrados.
- Añadir estados visuales de error `errorMsg` en los formularios `new` y `edit`.

### Definition of Done (DoD)
- [ ] Ningún `catch` en las API routes usa `console.error(error)` directamente sin chequear el tipo de `Error`.
- [ ] Los formularios de creación/edición de compañías muestran feedback visual del error capturado.
- [ ] No existen comentarios de tipo `// Handle error (e.g., show toast)` en dichos archivos.
- [ ] Los tests compilan y corren exitosamente.