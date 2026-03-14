---
id: create-tool-start-frontend-spec
action_id: spec
feature_id: create-tool-start-frontend
title: "Especificación técnica — start-frontend Rust"
date: "2026-03-14"
status: draft
scope:
  - Implementación Rust de start-frontend
  - Contrato tools-contract.json
  - Config start-frontend-config.json
acceptance_criteria:
  - El binario start_frontend.exe compila sin errores
  - Ejecuta npm run dev en src/, healthcheck en localhost:3001
  - Emite JSON según contrato (toolId, exitCode, success, feedback, data)
  - Launcher .bat invoca bin/start_frontend.exe
  - install.ps1 copia el .exe a la cápsula
contract_ref: SddIA/tools/tools-contract.json
tool_spec_ref: SddIA/tools/start-frontend/spec.md
---

# Especificación técnica — start-frontend (Rust)

## 1. Contexto

La tool **start-frontend** existe en SddIA/tools/start-frontend/ con spec.md que define:

- **Objetivo:** Levantar el dev server Next.js (`npm run dev` en `src/`), comprobar puerto 3001 y validar health en `http://localhost:3001`.
- **Implementación actual:** Solo `Start-Frontend.bat` que ejecuta `npm run dev` sin healthcheck ni salida JSON contractual.
- **Implementación objetivo:** Ejecutable Rust (.exe) que cumple tools-contract.json.

## 2. Entradas (CLI)

| Argumento | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `--port` | u16 | 3001 (o config) | Puerto del dev server |
| `--config-path` | string | start-frontend-config.json | Ruta al config (relativa a repo o absoluta) |
| `--output-path` | string | - | Fichero donde escribir resultado JSON |
| `--output-json` | flag | false | Emitir JSON por stdout |
| `--port-blocked` | fail \| kill | fail | Si puerto ocupado: fail=error, kill=liberar proceso |

Variables de entorno:

- `TOOLS_OUTPUT_JSON=1` → equivalente a `--output-json`
- `GESFER_REPO_ROOT` (opcional) → raíz del repo; si no existe, usar `current_dir`

## 3. Configuración (start-frontend-config.json)

Estructura actual (mantener compatibilidad):

```json
{
  "frontendWorkingDir": "src",
  "command": "npm run dev",
  "defaultPort": 3001,
  "healthUrl": "http://localhost:3001",
  "healthCheckTimeoutSeconds": 30
}
```

El binario Rust debe buscar el config en:

1. `{repo_root}/{config_path}`
2. `{repo_root}/scripts/tools/start-frontend/{config_path}`

## 4. Flujo de ejecución

1. **init** — Cargar config, validar directorio `frontendWorkingDir`.
2. **port-check** — Comprobar si el puerto está libre. Si ocupado: según `--port-blocked` (fail → exit 2; kill → liberar y continuar).
3. **launch** — Ejecutar `npm run dev` en `frontendWorkingDir` como proceso hijo (background). Capturar PID.
4. **healthcheck** — Polling cada 2s hasta `healthCheckTimeoutSeconds`. GET a `healthUrl`. Si HTTP 200 → éxito.
5. **done** — Emitir ToolResult con success=true, data: { url_base, port, pid }.
6. **error** — En cualquier fallo: ToolResult con success=false y exitCode apropiado.

## 5. Códigos de salida

| exitCode | Situación |
|----------|-----------|
| 0 | Éxito: frontend responde |
| 1 | Config no encontrado o inválido |
| 2 | Puerto ocupado (--port-blocked fail) |
| 3 | No se pudo liberar puerto (--port-blocked kill) |
| 4 | Directorio frontend no encontrado |
| 6 | Error al lanzar npm run dev |
| 7 | Health no respondió a tiempo |

## 6. Salida JSON (contrato)

Cumplir `SddIA/tools/tools-contract.json`:

```json
{
  "toolId": "start-frontend",
  "exitCode": 0,
  "success": true,
  "timestamp": "2026-03-14T12:00:00Z",
  "message": "Frontend levantado; health OK",
  "feedback": [
    { "phase": "init", "level": "info", "message": "...", "timestamp": "..." },
    ...
  ],
  "data": {
    "url_base": "http://localhost:3001",
    "port": 3001,
    "pid": 12345
  },
  "duration_ms": 8500
}
```

## 7. Artefactos a crear/modificar

| Artefacto | Acción |
|-----------|--------|
| `scripts/tools-rs/src/bin/start_frontend.rs` | **Crear** — Implementación Rust |
| `scripts/tools-rs/Cargo.toml` | **Modificar** — Añadir `[[bin]] name = "start_frontend"` |
| `scripts/tools-rs/install.ps1` | **Modificar** — Añadir start-frontend a capsules; copiar .exe a ruta de la tool (sin bin/) |
| `scripts/tools/start-frontend/start_frontend.exe` | **Generado** — En la ruta de la tool, junto al .bat |
| `scripts/tools/start-frontend/Start-Frontend.bat` | **Modificar** — Invocar `start_frontend.exe` en lugar de npm |
| `scripts/tools/start-frontend/manifest.json` | **Revisar** — Asegurar launcher_bat apunta al .bat |
| `SddIA/tools/start-frontend/spec.md` | **Actualizar** — Sección Implementación: Rust .exe en ruta de la tool |

## 8. Referencia: start_api.rs

La implementación debe seguir el patrón de `scripts/tools-rs/src/bin/start_api.rs`:

- Uso de `gesfer_tools::{FeedbackEntry, ToolResult, to_contract_json}`
- Clap para argumentos
- `port_in_use()`, `kill_process_on_port()` (Windows: netstat + taskkill)
- Proceso hijo con `Command::new("npm").args(["run", "dev"])` en `frontendWorkingDir`
- Healthcheck con `reqwest::blocking::Client`
- Sin build previo (Next.js no requiere dotnet build)

## 9. Criterios de aceptación

- [ ] `cargo build --release` en tools-rs produce `start_frontend.exe`
- [ ] `install.ps1` copia el .exe a `scripts/tools/start-frontend/` (ruta de la tool, sin bin/)
- [ ] `Start-Frontend.bat` invoca `start_frontend.exe` y devuelve exitCode
- [ ] Con frontend ya corriendo en 3001, la tool detecta health OK (o puerto ocupado según --port-blocked)
- [ ] Salida JSON cumple tools-contract.json
- [ ] Eliminada la lógica que ejecutaba npm directamente desde el .bat
