# run-tests-frontend

Herramienta SddIA que ejecuta tests (unitarios, E2E, build, lint) del frontend en condiciones de validacion local. No invocar `npm test` directamente desde el agente; usar esta herramienta (norma commands-via-skills-or-tools).

## Uso

Desde la raiz del repositorio:

```powershell
.\scripts\tools\run-tests-frontend\Run-Tests-Frontend.bat
```

Parametros (via .ps1 o cuando se invoque la capsula):

- **TestScope** — `unit`, `e2e`, `build`, `lint`, `all` (por defecto `all`).
- **OnlyTests** — Solo ejecutar tests (sin npm install previo).
- **BaseUrl** — URL base del frontend para E2E (por defecto http://localhost:3001).
- **OutputPath** — Fichero donde escribir el resultado JSON.
- **Quiet** — Suprimir salida JSON por stdout (por defecto: se emite).

## Implementación

Ejecutable Rust `run_tests_frontend.exe` en la ruta de la tool. Launcher `.bat` invoca el .exe; fallback a `.ps1` si no existe. Compilación: `scripts/tools-rs/install.ps1`.

## Salida

JSON por stdout por defecto. Cumple SddIA/tools/tools-contract.json: toolId, exitCode, success, timestamp, message, feedback[], data (scope, lint_exit, build_exit, unit_exit, e2e_exit), duration_ms. Especificación: `SddIA/tools/run-tests-frontend/output-salida-json.md`.

## Definicion

paths.toolsDefinitionPath/run-tests-frontend/ (spec.md, spec.json). Implementacion: paths.toolCapsules.run-tests-frontend (Cumulo).
