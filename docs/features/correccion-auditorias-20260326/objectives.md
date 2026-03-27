# Objetivos: Corrección de Auditoría Frontend 2026-03-26

**Feature/Fix:** correccion-auditorias-20260326
**Basado en:** docs/audits/AUDITORIA_2026_03_26.md

## Propósito
Abordar los hallazgos críticos de la última auditoría frontend para garantizar la mantenibilidad, escalabilidad y la adherencia estricta a las reglas de integridad y alias (`@/`) del Multi-Agent System (SddIA).

## Hallazgos Priorizados

1. **🔴 Violación de Integridad de Imports (Rutas Relativas)**
   - **Descripción:** Múltiples componentes en el frontend están utilizando rutas relativas para importar módulos en lugar de usar el alias de Path Mapping configurado (`@/`). Esto cruza las fronteras de las capas y rompe la arquitectura estricta (no testable, no fácilmente refactorizable).
   - **Alcance de corrección:**
     - `src/components/companies/company-form.tsx`
     - `src/app/companies/page.tsx`
     - `src/app/companies/new/page.tsx`
     - `src/app/companies/[id]/edit/page.tsx`

## Criterios de Cierre (DoD)
- [ ] No existen referencias relativas (`../`) a componentes o liberías internas en los archivos modificados.
- [ ] Todo import de UI/Components se hace a través del alias `@/components/...` o `@/lib/...`.
- [ ] `cd src && npx tsc --noEmit` y `npm run build` terminan sin errores.
- [ ] `cd src && npm run test` pasa sin problemas, demostrando Testability & Resilencia.
- [ ] Documentación técnica completada bajo `docs/features/correccion-auditorias-20260326/` (`spec.md`, `spec.json`, `validacion.md`).