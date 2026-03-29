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

## [2026-03-29] [automatic-task/kaizen-config-edge-cleanup] Refactorización de Edge Runtime config.ts

**Estado:** Completado (En PR). Proceso cerrado en tarea automática.

**Resumen:** Refactorización de la función `loadConfig` en `src/lib/config.ts` para eliminar por completo la lectura dinámica de variables del disco local mediante `fs` y `path`. La configuración de la aplicación ahora recae estrictamente en variables de entorno a través de `getDefaultConfig()`, solucionando fallos de ejecución en Edge Runtime detectados en la auditoría técnica.

**Documentación:** [docs/features/kaizen-config-edge-cleanup/](../features/kaizen-config-edge-cleanup/)
