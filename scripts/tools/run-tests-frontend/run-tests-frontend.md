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
- **OutputJson** — Emitir resultado JSON por stdout.

## Salida

Cumple SddIA/tools/tools-contract.json: JSON con toolId, exitCode, success, timestamp, message, feedback[], data (tests_summary, duration_ms).

## Definicion

paths.toolsDefinitionPath/run-tests-frontend/ (spec.md, spec.json). Implementacion: paths.toolCapsules.run-tests-frontend (Cumulo).
