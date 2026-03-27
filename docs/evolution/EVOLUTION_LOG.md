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

## [2026-03-27] [feat/kaizen-accessibility] Kaizen: Accesibilidad en Input compartido

**Estado:** Mergeado en main. Proceso automático cerrado.

**Resumen:** Se añadió soporte para `hasError` y `errorMessageId` en el componente `Input` compartido, mapeándolo a los atributos ARIA correspondientes para mejorar la accesibilidad de formularios con errores.

**Documentación:** [docs/features/kaizen-accessibility/](../features/kaizen-accessibility/)
**Tarea de origen:** [docs/TASKS/DONE/Kaizen_2026_03_27.md](../TASKS/DONE/Kaizen_2026_03_27.md)

## [2026-03-27] [feat/kaizen-npm-audit] Kaizen: Auditoría y Corrección de Vulnerabilidades NPM

**Estado:** Completado (Ejecución automática).

**Resumen:** Tarea automática tipo Kaizen para auditar las dependencias del frontend. Se ejecutó `npm audit fix` reduciendo el número de vulnerabilidades en `src/package-lock.json` de 13 a 8. Las 8 restantes requieren cambios de compatibilidad mayores (breaking changes) en dependencias críticas como `next` y `jest-environment-jsdom`, por lo que se mantienen para asegurar la compatibilidad con Edge Runtime.

**Documentación:** [docs/features/kaizen-npm-audit/](../features/kaizen-npm-audit/)
**Tarea de origen:** [docs/TASKS/DONE/Kaizen_npm_audit_2026_03_27.md](../TASKS/DONE/Kaizen_npm_audit_2026_03_27.md)
