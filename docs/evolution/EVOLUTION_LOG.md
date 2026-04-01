# Evolution Log

Registro de evolución del proyecto GesFer.Admin.Front.

---

## [2026-03-28] [feat/actualizacion-readme] Actualizacion de Readme

**Estado:** Completado (En PR). Proceso cerrado en tarea automática.

**Resumen:** Unificación del archivo `README.md` principal con `src/README.md`. Se eliminó el archivo `src/README.md` para mantener una única fuente de verdad (SSOT). La documentación se consolidó en la raíz del repositorio, especificando claramente la configuración, entorno y comandos de ejecución (`cd src && npm install`).

**Documentación:** [docs/features/Actualizacion_Readme/](../features/Actualizacion_Readme/)

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
- 2026-03-28 05:05:20 UTC - Unificación del README.md raíz con src/README.md completada bajo el proceso `automatic-task`.

## [2026-04-01] Kaizen: Fix Error Handling in Route Handlers
- **Proceso:** automatic-task / correccion-auditorias
- **Rama:** feat/kaizen-fix-error-logs
- **Resumen:** Se refactorizó el manejo de excepciones en `src/app/api/companies/route.ts` y `src/app/api/companies/[id]/route.ts` para evitar pasar objetos `unknown` a `console.error`, usando type guards para extraer el mensaje, resolviendo hallazgos críticos de auditorías previas.
