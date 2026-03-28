# Automatic Task Process

**Propósito:** Este proceso define el ciclo de vida para la ejecución automática de tareas de la backlog, desde su selección hasta su cierre y actualización de bitácora.

## Fases

1. **Análisis de Backlog**: Revisar `docs/TASKS/` buscando tareas. Si no hay tareas, iniciar una acción Kaizen de mejora continua.
2. **Activación de Tarea**: Mover la tarea seleccionada a `docs/TASKS/ACTIVE/` y crear una rama de trabajo.
3. **Planificación y Especificación**: Crear estructura en `docs/features/<feature-name>/` (objectives.md, spec.md, spec.json, plan.md, clarify.md).
4. **Implementación y Verificación**: Ejecutar la tarea según el plan, documentando en `implementation.md` y `validacion.md`.
5. **Cierre**: Mover la tarea a `docs/TASKS/DONE/`, actualizar `docs/evolution/EVOLUTION_LOG.md` y generar un informe `finalize.md`.

## Alcance
Aplica a cualquier tarea no interactiva que el sistema deba procesar de forma autónoma basándose en la backlog.

## Ruta de Persistencia
`paths.featurePath` o `paths.fixPath` según corresponda la tarea.