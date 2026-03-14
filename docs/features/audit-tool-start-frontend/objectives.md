---
id: audit-tool-start-frontend-objectives
action_id: spec
feature_id: audit-tool-start-frontend
title: "Objetivos — Auditoría tool start-frontend"
date: "2026-03-14"
branch: feat/audit-tool-start-frontend
paths_ref: Cúmulo paths.featurePath, paths.auditsPath/tools/start-frontend
---

# Objetivos — audit-tool-start-frontend

## Contexto

La tool **start-frontend** (paths.toolCapsules.start-frontend) actualmente:
- No realiza correctamente su función desde el launcher .bat
- No informa de lo sucedido al usuario (salida silenciosa)
- La salida del .exe no cumple las necesidades de posibles clientes (CI/CD, otras tools, humanos)

## Criterios de éxito

| ID | Criterio | Validación |
|----|----------|------------|
| C1 | El .bat invoca el .exe y propaga exitCode | Ejecución manual; exitCode visible |
| C2 | El .exe emite JSON contractual por stdout por defecto | Salida visible con toolId, exitCode, success, message, feedback |
| C3 | El frontend se levanta y responde en http://localhost:3001 | Health check HTTP 200 |
| C4 | La salida cumple tools-contract.json | Campos required_fields presentes |
| C5 | Errores (npm no encontrado, puerto ocupado, etc.) se reportan claramente | Mensaje y feedback en JSON |

## Entregables

- Informe: paths.auditsPath/tools/start-frontend/audit-report-YYYY-MM-DD.md
- Resultado: paths.auditsPath/tools/start-frontend/audit-result-YYYY-MM-DD.json
