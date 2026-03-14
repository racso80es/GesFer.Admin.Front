# start-frontend

**toolId:** start-frontend
**Cápsula:** paths.toolCapsules.start-frontend (Cúmulo)

## Objetivo

Levanta el dev server del proyecto GesFer.Admin.Front (Next.js). Ejecuta `npm run dev` en `src/`, comprueba que el puerto 3001 esté disponible y considera **éxito** si `http://localhost:3001` responde (HTTP 200).

## Uso

Desde la raíz del repositorio:

```powershell
.\scripts\tools\start-frontend\Start-Frontend.bat
```

## Salida

JSON según SddIA/tools/tools-contract.json: toolId, exitCode, success, timestamp, message, feedback[], data (url_base, port, pid), duration_ms.

## Implementación

Ejecutable Rust `start_frontend.exe` en la ruta de la tool. Launcher `.bat` invoca el .exe. El binario ejecuta `npm run dev` en `src/`, comprueba puerto y realiza healthcheck en `http://localhost:3001`. **Salida:** JSON por stdout por defecto (según tools-contract.json). Use `--quiet` para suprimir salida; `--output-path` para escribir a fichero. Especificación detallada: `SddIA/tools/start-frontend/output-salida-json.md`.

**Compilación:** Ejecutar `install.ps1` en `scripts/tools-rs/` para compilar y copiar el .exe a la cápsula.
