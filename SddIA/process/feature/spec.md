---
contract_ref: paths.processPath/process-contract.json
name: Feature
persist_ref: paths.featurePath/<nombre_feature>
phases:
  - description: Rama feat desde master; skill iniciar-rama.
    id: '0'
    name: Preparar entorno
  - description: objectives.md en carpeta de la tarea.
    id: '1'
    name: Documentación con objetivos
  - description: Acción spec; salida spec.md (YAML Frontmatter).
    id: '2'
    name: Especificación
  - description: Acción clarify; clarify.md (YAML Frontmatter).
    id: '3'
    name: Clarificación
  - description: Acción planning; plan.md (YAML Frontmatter).
    id: '4'
    name: Planificación
  - description: Acción implementation; implementation.md (YAML Frontmatter).
    id: '5'
    name: Implementación (doc)
  - description: Acción execution; execution.md (YAML Frontmatter).
    id: '6'
    name: Ejecución
  - description: Acción validate; validacion.md (YAML Frontmatter).
    id: '7'
    name: Validar
  - description: Acción finalize; Evolution Logs, PR.
    id: '8'
    name: Finalizar
principles_ref: paths.principlesPath
process_id: feature
related_actions:
  - spec
  - clarify
  - planning
  - implementation
  - execution
  - validate
  - finalize
related_skills:
  - iniciar-rama
  - finalizar-git
spec_version: 1.0.0
---
# Proceso: Feature

Este documento define el **proceso de tarea** para desarrollar una funcionalidad. Está ubicado en paths.processPath/feature/ (Cúmulo). Las acciones que orquesta están en paths.actionsPath (Cúmulo). La ruta de persistencia se obtiene de **Cúmulo** (paths.featurePath/<nombre_feature>).

**Interfaz de proceso:** Cumple la interfaz en Cúmulo (`process_interface`): solicita/genera en la carpeta de la tarea (Cúmulo) un **`.md` por acción** con **YAML Frontmatter** (objectives.md, spec.md, clarify.md, plan.md, implementation.md, execution.md, validacion.md, finalize.md). No ficheros .json separados. Norma: SddIA/norms/features-documentation-frontmatter.md.

## Propósito

El proceso **feature** define el procedimiento formal de ciclo completo para desarrollar una funcionalidad o tarea: desde la creación de la rama hasta el cierre y la apertura del Pull Request. Orquesta las acciones **spec**, **clarify**, **planning**, **implementation**, **execution**, **validate** y **finalize** en secuencia, fija la ubicación de la documentación de la tarea y garantiza trazabilidad en los logs de evolución.

Proporciona un flujo repetible y auditado, alineado con las Leyes Universales (soberanía documental en AGENTE_CUMULO, no commits en `master`).

## Alcance del procedimiento

Ruta de la tarea: Cúmulo (paths.featurePath/<nombre_feature>).

| Fase | Nombre | Descripción |
| :--- | :--- | :--- |
| **0** | Preparar entorno | Crear rama feat/<nombre_feature> (o `fix/` si aplica) desde `master` actualizado. No trabajar en `master`. **Skill:** iniciar-rama — invocar según contrato (paths.skillsDefinitionPath/iniciar-rama/). Tekton invoca la implementación (paths.skillCapsules[\"iniciar-rama\"]). Parámetros: BranchType feat, BranchName <nombre_feature>. |
| **1** | Documentación con objetivos | Documentar objetivo, alcance y ley aplicada. La documentación de la tarea se ubica en la carpeta de la tarea (Cúmulo)/objectives.md. |
| **2** | Especificación | Ejecutar o generar SPEC (acción **spec**). Entrada: requerimiento o borrador, carpeta de la tarea (Cúmulo)/objectives.md; salida: especificación técnica en paths.actionsPath (spec/) y copia/canon en carpeta de la tarea (Cúmulo)/spec.md (YAML Frontmatter) |
| **3** | Clarificación | Ejecutar o generar clarificaciones (acción **clarify**). Especificación técnica: paths.actionsPath/clarify/. Entrada: carpeta de la tarea (Cúmulo)/objectives.md, spec.md; salida: carpeta de la tarea (Cúmulo)/clarify.md (YAML Frontmatter) |
| **4** | Planificación | Ejecutar o generar plan (acción **plan**). Entrada: Especificación, Clarificación. Salida: carpeta de la tarea (Cúmulo)/plan.md (YAML Frontmatter). |
| **5** | Implementación | Generar documento de implementación. Especificación técnica: paths.actionsPath/implementation/. Entrada: carpeta de la tarea (Cúmulo)/objectives.md, spec.md, clarify.md; salida: carpeta de la tarea (Cúmulo)/implementation.md (YAML Frontmatter) |
| **6** | Ejecución | Aplicar el plan al código (Tekton Developer). Especificación técnica: paths.actionsPath/execution/. Entrada: carpeta de la tarea (Cúmulo)/implementation.md; salida: carpeta de la tarea (Cúmulo)/execution.md (YAML Frontmatter) |
| **7** | Validar | Ejecutar validación pre-PR. Especificación técnica: paths.actionsPath/validate/. Entrada: carpeta de la tarea (Cúmulo); salida: carpeta de la tarea (Cúmulo)/validacion.md (YAML Frontmatter) |
| **8** | Finalizar | Cierre y PR. Especificación técnica: paths.actionsPath/finalize/. Entrada: carpeta de la tarea (Cúmulo); salida: Evolution Logs y Pull Request. |

## Implementación

Este proceso se implementa como **procedimiento** que combina:

*   **Skills y agentes** para spec, clarify y plan (cuando se requiera trazabilidad con token de auditor), según las acciones definidas en paths.actionsPath (Cúmulo).
*   **Ubicación obligatoria de la documentación de la tarea:** paths.featurePath/<nombre_feature>/ (Cúmulo).

### Contenido mínimo de la carpeta de la tarea (Cúmulo: paths.featurePath/<nombre_feature>/)

| Documento | Contenido |
| :--- | :--- |
| **objectives.md** | Objetivo, alcance, ley aplicada (YAML Frontmatter + contenido MD). |
| **spec.md** | Especificación técnica (YAML Frontmatter + contenido MD). |
| **clarify.md** | Clarificaciones y decisiones (YAML Frontmatter + contenido MD). |
| **plan.md** | Plan de implementación / task roadmap (YAML Frontmatter + contenido MD). |
| **implementation.md** | Touchpoints y ítems de implementación (YAML Frontmatter + contenido MD). |
| **execution.md** | Registro de ítems aplicados (YAML Frontmatter + contenido MD). |
| **validacion.md** | Resultado de validación pre-PR (YAML Frontmatter + contenido MD). |
| **finalize.md** | Cierre, PR, Evolution Logs (YAML Frontmatter + contenido MD). |

### Actualización de Evolution Logs

Al cierre de la feature (fase 8):

*   **paths.evolutionPath + paths.evolutionLogFile:** Añadir una línea con formato `[YYYY-MM-DD] [feat/<nombre>] [Descripción breve del resultado.] [Estado].`
*   **paths.evolutionPath + paths.evolutionLogFile:** Añadir una sección con fecha y título de la feature, resumen y referencia a la carpeta de la tarea (Cúmulo)/objectives.md.

## Integración con Agentes

*   **Arquitecto / Spec Architect:** Puede iniciar el procedimiento y asegurar que la fase 1 y la ubicación paths.featurePath/<nombre_feature>/ (Cúmulo) se respeten.
*   **Clarifier:** Responsable de la fase 3 (clarificación) y de persistir decisiones en el SPEC y en la carpeta de la feature.
*   **Tekton Developer:** Ejecuta las fases 4 (plan), 5 (implementación), 6 (ejecución), 7 (validación) y 8 (cierre/PR); aplica la SPEC como marco legal.
*   **Cúmulo:** Valida que la documentación de la tarea esté en paths.featurePath/<nombre_feature>/ como SSOT para esa feature.

## Dependencias con otras acciones

*   El proceso **feature** invoca o utiliza los resultados de las acciones **spec**, **clarify**, **plan**, **implementation**, **execution**, **validate** y **finalize** en paths.actionsPath (Cúmulo).
*   La **documentación de la tarea** (objetivo, spec, clarifications, plan, validacion) debe residir en **paths.featurePath/<nombre_feature>/** (Cúmulo) para aprobación y revisión humana.

## Estándares de Calidad

*   **Grado S+:** Trazabilidad desde el objetivo hasta el PR: rama → paths.featurePath → spec/clarify/plan → implementación → execution → validación → Evolution Logs → PR.
*   **Ley GIT:** Ningún commit en `master`; todo el trabajo en rama `feat/` o `fix/` con documentación en paths.featurePath/<nombre_feature>/ (Cúmulo).
*   **Single Source of Truth:** Para cada feature, la documentación canónica de la tarea es paths.featurePath/<nombre_feature>/ (Cúmulo); la referencia en PR y en Evolution Log es esa ruta.

## Alcance para Fix (bug)

El mismo patrón de persistencia se aplica a correcciones de bugs mediante el proceso **bug-fix**. La ubicación de la documentación se obtiene del agente Cúmulo (paths.fixPath/<nombre_fix>). Ver paths.processPath/bug-fix/.

## Referencia de ejecución

Procedimiento aplicado en la rama **feat/e2e-product-back-mocked** (2026-02-10). Documentación de la tarea: paths.featurePath/<nombre_feature>/. Acciones relacionadas: paths.actionsPath (spec/, clarify/, planning/, execution/, validate/, finalize/).
