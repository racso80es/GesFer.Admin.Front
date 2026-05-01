---
action_id: finalize-process
contract_ref: actions-contract.json
flow_steps:
  - Precondiciones (rama feat/fix, objectives.md, validacion.md pass)
  - Commits atómicos vía skill git-save-snapshot o invoke-commit
  - Si mutó SddIA — sddia_evolution_register + snapshot de consolidación
  - Evolution Logs (paths.evolutionPath + paths.evolutionLogFile, contrato)
  - Skill git-sync-remote (push/publicación)
  - Skill git-create-pr (PR con cuerpo desde objectives.md / validacion.md)
  - Opcional — finalize-process.md en carpeta de tarea (frontmatter)
inputs:
  - Carpeta feature o fix (Cúmulo)
  - Rama feat/ o fix/
name: Finalize process
outputs:
  - Rama en origin
  - Evolution Logs
  - PR
  - finalize-process.md opcional (YAML Frontmatter)
orchestrated_skills:
  - git-save-snapshot
  - invoke-commit
  - sddia-evolution-register
  - git-sync-remote
  - git-create-pr
optional_pre_pr_checks:
  - verify-pr-protocol
---
# Action: finalize-process

## Propósito

La acción **finalize-process** cierra el **proceso o la tarea** de desarrollo (feature, fix, refactor documentada, etc.): consolida commits, actualiza Evolution Logs cuando corresponde, cumple la **Evaluación de Impacto SddIA** (registro de evolución obligatorio si hubo mutación bajo `SddIA/`), **publica la rama** en el remoto y **abre el Pull Request**. Solo debe ejecutarse cuando la validación ha pasado; si no, debe bloquearse o advertir.

**Disparadores semánticos (referencia para agentes y normas):** «proceso finalizado», «tarea finalizada», «cierre S+», «publicar rama tras validar», «abrir PR de cierre».

## Alcance de ejecución (contrato de acción)

Esta acción **no** ejecuta scripts del sistema (`.ps1`, `.bat`, `cmd`, shell) ni comandos del SO como pasos normativos. **Solo orquesta** skills y herramientas **registradas** en el Cúmulo (`paths.skillCapsules`, `paths.toolsDefinitionPath`, `paths.skillsRustPath` según norma). El ejecutor invoca cada skill mediante su cápsula o el mecanismo estándar del proyecto (p. ej. `GESFER_CAPSULE_REQUEST`, `scripts/skills/run-capsule-from-tekton-request.ps1`).

## Orquestación obligatoria (orden lógico)

1. **Precondiciones:** Rama distinta de `main`/`master`; existen `objectives.md` y `validacion.md` en la carpeta de la tarea (Cúmulo); resultado global de validación apto para cierre.
2. **Snapshots:** Pendientes de commit → skills **git-save-snapshot** o **invoke-commit** (cápsulas en Cúmulo).
3. **Impacto SddIA:** Si el workspace mutó `SddIA/`, invocar **sddia_evolution_register** (cápsula `scripts/skills/sddia-evolution/`) y un **snapshot adicional** que consolide el registro, **antes** de publicar la rama (proceso feature fase 8).
4. **Evolution Logs** en `paths.evolutionPath` según contrato (`evolution_contract.md`).
5. **Publicación:** skill **git-sync-remote** con `push: true` (tras fetch/pull según política del request).
6. **Pull Request:** skill **git-create-pr** con título y cuerpo que incorporen resumen de `objectives.md` y `validacion.md`.
7. **Artefacto opcional:** `finalize-process.md` en la carpeta de la tarea (YAML Frontmatter: `action_id: finalize-process`, `pr_url`, `branch`, `timestamp`).

## Verificación pre-PR (opcional / según política del repo)

Si el proceso exige el binario **verify-pr-protocol** (`scripts/skills-rs`), debe invocarse como **skill ejecutable catalogada** (cápsula o binario en `paths.skillsRustPath`), **no** mediante `cargo run` ni comandos crudos en la especificación de esta acción.

## Integración

- **Procesos:** última fase del ciclo (p. ej. feature v2.0.0 fase 8). Especificación técnica: `paths.actionsPath/finalize-process/`.
- **Ley COMANDOS y GIT:** toda interacción con git/`gh` a través de las skills indicadas, no en línea de comando directa del agente.

---
*Acción de cierre de proceso. Sustituye el identificador histórico `finalize`.*
