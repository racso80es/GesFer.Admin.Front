---
id: create-tool-start-frontend-clarify
action_id: clarify
feature_id: create-tool-start-frontend
title: "Clarificaciones — start-frontend Rust"
date: "2026-03-14"
status: draft
decisions:
  - id: D01
    topic: Estructura del binario
    decision: "Nombre del ejecutable: start_frontend (snake_case). Ubicación: scripts/tools/start-frontend/bin/start_frontend.exe. Launcher .bat invoca bin\\start_frontend.exe pasando argumentos."
  - id: D02
    topic: Config existente
    decision: "Mantener start-frontend-config.json sin cambios. El Rust debe mapear frontendWorkingDir, command, defaultPort, healthUrl, healthCheckTimeoutSeconds (camelCase en JSON)."
  - id: D03
    topic: Comando npm
    decision: "Ejecutar 'npm run dev' (no 'npx' ni 'node'). Working directory: repo_root/frontendWorkingDir (por defecto src/)."
  - id: D04
    topic: Health URL
    decision: "Next.js dev server responde en la raíz. healthUrl por defecto http://localhost:3001. No hay endpoint /health explícito; la raíz debe devolver 200."
  - id: D05
    topic: Proceso en background
    decision: "El binario lanza npm run dev como proceso hijo, espera healthcheck y termina. El proceso npm queda en segundo plano (no se mata al salir). Comportamiento análogo a start_api."
  - id: D06
    topic: install.ps1 y Cúmulo
    decision: "Añadir start_frontend a la lista de capsules en install.ps1. Destino: scripts/tools/start-frontend/bin/start_frontend.exe. Actualizar Cúmulo si paths.toolCapsules ya incluye start-frontend (ya está)."
clarify_pending: []
clarify_resolved:
  - id: P01
    topic: Next.js health en raíz
    resolution: "Sí. La raíz devuelve HTTP 200 en modo dev."
  - id: P02
    topic: Repo root
    resolution: "El .bat se invoca desde la ruta de la tool (scripts/tools/start-frontend/). El .bat hace cd a repo root y establece GESFER_REPO_ROOT antes de invocar el .exe."
  - id: P03
    topic: Coexistencia start_api
    resolution: "La parte backend está fuera de este contexto. Se es conocedor, pero nada más. start_api no se modifica ni elimina en este proyecto."
  - id: P04
    topic: Ubicación del .exe
    resolution: "El .exe se genera en la ruta de la tool directamente (scripts/tools/start-frontend/start_frontend.exe), sin carpeta bin/. Mismo patrón que start-api."
---

# Clarificaciones — create-tool-start-frontend

## Decisiones tomadas

| ID | Tema | Decisión |
|----|------|----------|
| D01 | Estructura binario | `start_frontend.exe` en `bin/`. Launcher .bat invoca binario con args. |
| D02 | Config | Mantener start-frontend-config.json. Mapear camelCase en Rust. |
| D03 | Comando | `npm run dev` en `frontendWorkingDir` (src/). |
| D04 | Health URL | Raíz http://localhost:3001. Verificar que devuelve 200. |
| D05 | Proceso background | npm queda en segundo plano; binario termina tras healthcheck OK. |
| D06 | install.ps1 | Añadir start_frontend a capsules; destino bin/start_frontend.exe. |

## Pendientes de confirmación

| ID | Pregunta | Propuesta |
|----|----------|-----------|
| P01 | ¿Health en raíz 200? | Verificar con `npm run dev` en src/. |
| P02 | ¿Desde dónde se invoca? | .bat hace cd a repo root; .exe usa current_dir o GESFER_REPO_ROOT. |
| P03 | start_api en tools-rs | No bloquea. Mantener si crate compartido; eliminar en futura limpieza si no. |
| P04 | Fallback sin .exe | .bat solo invoca .exe. Sin .exe = fallo hasta ejecutar install.ps1. |

## Resumen para el usuario

**Listo para implementación** con las decisiones anteriores. Los puntos P01–P04 pueden resolverse durante la implementación (P01: verificación empírica; P02–P04: propuestas aceptables). Si el usuario confirma o matiza P01–P04, se actualiza clarify.md antes de continuar con planning/implementation.
