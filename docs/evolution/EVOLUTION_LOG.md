# Evolution Log

Registro de evolución del proyecto GesFer.Admin.Front.

---

## [2026-03-27] [fix/kaizen-error-handling] Type Guards en Bloques Catch (Kaizen)

**Estado:** Completado (En PR). Proceso cerrado en tarea automática.

**Resumen:** Refactorización transversal en el frontend para asegurar el manejo correcto de errores arrojados en los bloques `catch`. Se inyectaron explícitamente *type guards* (`instanceof Error`) para extraer el string del mensaje, cumpliendo con la directiva arquitectónica que prohíbe el uso o registro directo del tipo `unknown`.

**Documentación:** [docs/features/kaizen-error-handling/](../features/kaizen-error-handling/)

---

## [2026-03-13] [feat/audit-inicial-admin-front] Auditoría inicial y saneamiento

**Estado:** Mergeado en main (PR #1). Proceso cerrado.

**Resumen:** Saneamiento y adaptación del proyecto frontend Next.js extraído del monorepo GesFer. Incluye: actualización de agentes SddIA al contexto frontend, constituciones, documentación, scripts, tools, workflow CI/CD (pr-validation.yml), internalización de Shared, Dockerfile standalone y unificación de URLs.

**Documentación:** [docs/features/audit-inicial-admin-front/](../features/audit-inicial-admin-front/)
