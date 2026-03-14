# Prepare-FrontendEnv — Preparar entorno frontend

Herramienta para dejar listo el entorno de desarrollo del frontend: instala dependencias npm y verifica que exista configuracion de entorno (.env).

## Requisitos

- **Windows 11** con **PowerShell 7+**.
- **Node.js 20+** y **npm**.

## Uso

Desde la **raiz del repositorio**:

```powershell
.\scripts\tools\prepare-frontend-env\Prepare-FrontendEnv.bat
```

## Implementación

Ejecutable Rust `prepare_frontend_env.exe` en la ruta de la tool. Launcher `.bat` invoca el .exe; fallback a `.ps1` si no existe. Compilación: `scripts/tools-rs/install.ps1`.

## Que hace

1. Ejecuta `npm install` en `src/`.
2. Verifica que exista `src/.env.local` (o lo copia desde `src/.env.example` si no existe).
3. Reporta estado de las dependencias.

## Salida JSON (contrato tools)

JSON por stdout por defecto. Cumple `SddIA/tools/tools-contract.json`: toolId, exitCode, success, timestamp, message, feedback[], data (env_local_exists, env_created), duration_ms. Use `-Quiet` para suprimir; `-OutputPath` para fichero. Especificación: `SddIA/tools/prepare-frontend-env/output-salida-json.md`.
