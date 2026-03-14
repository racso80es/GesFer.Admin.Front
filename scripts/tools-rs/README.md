# GesFer Tools (Rust)

Implementación por defecto en Rust de las herramientas del contrato `SddIA/tools/tools-contract.json`.

## Requisitos

- [Rust](https://www.rust-lang.org/) (rustup, cargo) instalado.
- **Windows (target msvc):** [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) con la carga de trabajo **Desktop development with C++** (para `link.exe`). Si falta, la compilación falla con `linker 'link.exe' not found`.

## Compilar

Desde esta carpeta o desde la raíz del repo:

```powershell
cd scripts/tools-rs
cargo build --release
```

El script `install.ps1` compila y **copia los ejecutables a la ruta de cada cápsula** (rutas canónicas: Cúmulo **paths.toolCapsules**, `SddIA/agents/cumulo.json`):

- **paths.toolCapsules['start-frontend']** + `start_frontend.exe` — Start-Frontend (dev server Next.js)
- **paths.toolCapsules['prepare-frontend-env']** + `prepare_frontend_env.exe` — Prepare-FrontendEnv (npm install + .env)
- **paths.toolCapsules['run-tests-frontend']** + `run_tests_frontend.exe` — Run-Tests-Frontend (lint, build, unit, e2e)

## Uso

Los launchers `.bat` en **paths.toolsPath** (Cúmulo) son wrappers que delegan a la cápsula correspondiente. Dentro de cada cápsula (**paths.toolCapsules[&lt;tool-id&gt;]**), el `.bat` invoca el `.exe` en la misma carpeta; si no existe, usa el script PowerShell de la cápsula.

Variables de entorno opcionales:

- `TOOLS_OUTPUT_JSON=1` — Emite el resultado JSON por stdout.
- `GESFER_REPO_ROOT` — Raíz del repositorio (para invoke_mysql_seeds; por defecto el directorio actual).

Argumentos:

- `--output-path <ruta>` — Escribe el JSON de resultado en el fichero indicado.

## Estructura

- `src/lib.rs` — Tipos del contrato (`ToolResult`, `FeedbackEntry`, `to_contract_json`).
- `src/bin/start_frontend.rs` — Herramienta start-frontend.
- `src/bin/prepare_frontend_env.rs` — Herramienta prepare-frontend-env.
- `src/bin/run_tests_frontend.rs` — Herramienta run-tests-frontend.

Referencia: `SddIA/tools/tools-contract.json`, `SddIA/agents/security-engineer.json`.
