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

Launcher `.bat` que ejecuta `npm run dev` en `src/` y realiza healthcheck. Implementación simplificada respecto al tooling .NET anterior.
