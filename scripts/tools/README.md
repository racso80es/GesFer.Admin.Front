# Herramientas (paths.toolsPath)

Este directorio es **paths.toolsPath** (Cúmulo, `SddIA/agents/cumulo.json`). Contiene el índice de herramientas y las cápsulas de implementación.

## Listado de herramientas

El listado canónico de herramientas existentes se obtiene de:

- **Índice (Cúmulo):** **paths.toolsIndexPath** — fichero `index.json` en la raíz de tools; array `tools` con `toolId`, `path`, `manifest`, `wrapper_bat`, `description`.
- **Fuente de verdad de rutas:** Cúmulo **paths.toolCapsules** (`SddIA/agents/cumulo.json`).

| toolId | Descripción breve | Launcher (wrapper) |
|--------|-------------------|-------------------|
| **start-frontend** | Dev server Next.js (npm run dev, puerto 3001). | `start-frontend/Start-Frontend.bat` |
| **run-tests-frontend** | Tests frontend (unit, e2e, build, lint). | `run-tests-frontend/Run-Tests-Frontend.bat` |
| **prepare-frontend-env** | npm install + verificación .env. | `prepare-frontend-env/Prepare-FrontendEnv.bat` |

Cada herramienta reside en una **cápsula** **paths.toolCapsules[&lt;tool-id&gt;]** con `manifest.json`, scripts, config y documentación.

## Uso del índice

Para listar las herramientas de forma programática (scripts, agentes, CI):

- Leer `scripts/tools/index.json` y usar el array `tools`.
- O consultar Cúmulo `paths.toolCapsules` para las rutas canónicas de cada cápsula.

Contrato de herramientas: `SddIA/tools/tools-contract.json`.
