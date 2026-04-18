---
constraints:
- Cola, ACTIVE, DONE, KAIZEN y CLARIFY solo bajo paths.tasksPath (Cúmulo); no mezclar con rutas literales.
- Operaciones git según SddIA/norms/git-via-skills-or-process.md (skills, acciones o proceso).
- Por defecto el ciclo de implementación delega en el proceso feature; documentación de feature en paths.featurePath.
contract_ref: paths.processPath/process-contract.md
default_delegate_process: feature
default_delegate_ref: paths.processPath/feature/
description: Procesa una unidad de tarea del backlog (fichero o carpeta-tarea) con triaje, activación, ejecución y archivo.
name: Automatic Task
paths:
  evolution_ref: paths.evolutionPath y paths.evolutionLogFile (Cúmulo)
  featurePath_ref: paths.featurePath/<nombre_feature> (ciclo feature por defecto)
  tasksPath_ref: paths.tasksPath (Cúmulo)
persist_ref: paths.tasksPath
phases:
- description: Candidatos en raíz de paths.tasksPath y KAIZEN/; prioridad, fecha o indicación del usuario; sin colisión con ACTIVE/.
  id: '1'
  name: Identificación y triaje
- description: Rama feat/ o fix/; mover unidad a paths.tasksPath/ACTIVE/; commit y push (vía skill/proceso).
  id: '2'
  name: Activación y bloqueo
- description: Ejecutar proceso objetivo (por defecto feature); leer carpeta-tarea si existe spec/plan; generar artefactos en paths.featurePath si aplica.
  id: '3'
  name: Ejecución
- description: Mover unidad a DONE/; Evolution Log; finalize.md cuando aplique.
  id: '4'
  name: Finalización y archivo
principles_ref: paths.principlesPath
process_id: automatic_task
process_interface_compliance: >-
  Unidades carpeta-tarea o documentación generada bajo paths.featurePath cumplen process_interface: .md con frontmatter YAML
  (objectives, spec, clarify, plan, implementation, execution, validacion). Sin .json separados en esa ruta. Patrón:
  SddIA/norms/features-documentation-pattern.md.
related_actions:
- triage
- activation
- execution
- finalization
related_skills:
- iniciar-rama
- finalizar-git
- invoke-command
spec_version: 1.3.1
---

# Proceso: Automatic Task

Este documento define el **proceso de tarea** para que una unidad de ejecución SDDIA procese una tarea del backlog de forma autónoma. Está ubicado en paths.processPath/automatic_task/ (Cúmulo). Asegura la integridad del repositorio y la visibilidad del progreso. Las rutas de cola y estados se obtienen de **Cúmulo** (paths.tasksPath); el ciclo de implementación por defecto usa paths.featurePath y el proceso **feature** (paths.processPath/feature/).

**Interfaz de proceso:** Las unidades **carpeta-tarea** bajo paths.tasksPath y la documentación generada al ejecutar el proceso **feature** cumplen la interfaz en Cúmulo (`process_interface`): artefactos **`.md`** con frontmatter YAML donde aplique el ciclo estándar. Patrón: SddIA/norms/features-documentation-pattern.md.

**Rutas de carpetas:** usar siempre la ruta de tareas del Cúmulo (`paths.tasksPath`), no literales fijos en documentación nueva. En disco, la carpeta puede coincidir con `docs/tasks/` o `docs/TASKS/` según el sistema de archivos; resolver siempre la ruta del contrato (paths.tasksPath).

## Unidad de tarea

## Fases del Proceso

### 1. Identificación y Triaje (Triage)
Localiza en `docs/TASKS/` el archivo `.md` con la prioridad más alta, el que el usuario indique o el de fecha más antigua.
- Verifica que cumple con un Análisis suficiente para poder realizar la tarea.
- Si la tarea no tiene un ID único (ej. T-26-001), asígnale uno basado en la fecha actual en el nombre del fichero o en su contenido.
- Comprueba que la tarea no está ya en ejecución (no existe en `docs/TASKS/ACTIVE/`).
- **Acción Alternativa (Kaizen):** Si no hay tareas disponibles en `docs/TASKS/`, analiza el proyecto en busca de posibles acciones de mejora continua (Kaizen). Elige una de estas acciones y regístrala como una nueva tarea en un archivo `.md` dentro del directorio `docs/TASKS/` (por ejemplo, `docs/TASKS/Kaizen_YYYY_MM_DD.md`), procediendo a ejecutarla.

### 2. Activación y Bloqueo (Activation)
Transición a estado `ACTIVE` para evitar colisiones con otras IAs (Jules/Cursor).
- Crea una nueva rama `feat/<nombre_feature>` o `fix/<nombre_fix>`.
- Mueve el archivo de la tarea de `docs/TASKS/` a `docs/TASKS/ACTIVE/`.
- **Sincronización Inmediata**: Realiza el primer commit con la reubicación del archivo de la tarea a su nueva ubicación `ACTIVE/` y haz push a origin en la rama actual. Esto bloquea el TODO.

### 3. Ejecución (Execution)
Inicia y continúa las instrucciones definidas en el proceso correspondiente, por defecto el proceso `feature` (definido en `SddIA/process/feature/spec.md`).
- Esto implica generar la documentación de la tarea (objectives, spec, clarify, plan, implementation, execution, validacion) en `paths.featurePath/<nombre_feature>`.

### 4. Finalización y Archivo (Finalization)
Transición a estado `DONE` tras el cumplimiento del proceso.
- Mueve el archivo de la tarea de `docs/TASKS/ACTIVE/` a `docs/TASKS/DONE/`.
- Actualiza `docs/EVOLUTION_LOG.md` con un resumen de la intervención, enlazando al archivo en `DONE/`.
- Genera la documentación de finalización del proceso feature (`finalize.md`).

## Estructura de Carpetas Requerida
Para el correcto funcionamiento de este proceso, el repositorio debe mantener la siguiente jerarquía:
- `docs/TASKS/` -> Tareas pendientes (ficheros individuales).
- `docs/TASKS/ACTIVE/` -> Tareas en ejecución en la rama actual.
- `docs/TASKS/CLARIFY/` -> Tareas en ejecución en la rama actual que necesitan aclaración por parte de usuario.
- `docs/TASKS/DONE/` -> Histórico de éxito.

## Particularidades del proceso
- Trabajar de la forma más autónoma posible, con el fin de obtener la éjecución de la tarea sin supervisión del usuario. En caso de no ser posible este resultado, mover a ruta de documentos a clarificar.

## Historial de versión del spec

- **1.3.1:** Frontmatter alineado con process-contract (contract_ref, principles_ref, persist_ref, phases, paths, process_interface_compliance, related_skills); introducción estándar con ubicación e interfaz de proceso.
- **1.0.0:** Especificación inicial del proceso Automatic Task.
