# Objetivos

- **Objetivo**: Corregir el manejo de errores en los bloques `catch` identificados en la auditoría para usar un type guard adecuado.
- **Hallazgos consolidados**:
  - `src/app/companies/page.tsx`
  - `src/app/api/companies/[id]/route.ts`
- **Prioridades**: Media.
- **Criterios de Cierre**:
  - Los logs en los archivos identificados no envían objetos `unknown` (`error`) a la consola.
  - Se extrae el mensaje de forma segura.