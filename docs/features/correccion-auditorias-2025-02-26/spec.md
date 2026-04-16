---
contract_ref: paths.processPath/process-contract.json
input_ref: paths.auditsPath
name: Corrección según Auditoría 2025-02-26
persist_ref: paths.featurePath/correccion-auditorias-2025-02-26
phases:
  - description: Revisar últimos informes en paths.auditsPath; consolidar hallazgos (críticos/medios/bajos).
    id: '0'
    name: Análisis de auditorías
  - description: objectives.md con hallazgos priorizados y criterios de cierre.
    id: '1'
    name: Documentación de objetivos
  - description: Acción spec; spec.md, spec.json.
    id: '2'
    name: Especificación
  - description: Acción clarify si aplica; clarify.md, clarify.json.
    id: '3'
    name: Clarificación
  - description: Acción planning; plan.
    id: '4'
    name: Planificación
  - description: Acción implementation; implementation.md, implementation.json.
    id: '5'
    name: Implementación (doc)
  - description: Acción execution; execution.json.
    id: '6'
    name: Ejecución
  - description: Acción validate; validacion.json.
    id: '7'
    name: Validar
  - description: Acción finalize; Evolution Logs, PR.
    id: '8'
    name: Finalizar
principles_ref: paths.principlesPath
process_id: correccion-auditorias
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
  - documentation
  - security-audit
spec_version: 1.0.0
---
# Especificación: Corrección Auditoría 2025-02-26

Este documento detalla la especificación técnica para la implementación de las correcciones identificadas en el reporte de auditoría del 2025-02-26.

## Análisis de Requerimientos
1.  **Importaciones:** La base de código usa importaciones relativas (`../../../`, `../../../../`) que cruzan las fronteras de los módulos. Estas deben actualizarse a importaciones absolutas usando el alias `@/`.
2.  **Manejo de Errores:** Los bloques `catch` usan `error` directamente, lo cual es de tipo `unknown`. Se deben agregar guards de tipo (`error instanceof Error`) para extraer el mensaje.

## Alcance Técnico
-   `src/app/companies/new/page.tsx`: Actualizar importación de `CompanyForm` y corregir bloque `catch`.
-   `src/app/companies/[id]/edit/page.tsx`: Actualizar importación de `CompanyForm` y corregir bloques `catch`.

## Consideraciones
*   La funcionalidad existente no debe alterarse.
*   El rendimiento y el comportamiento deben permanecer idénticos.
