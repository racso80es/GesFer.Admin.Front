@echo off
setlocal enabledelayedexpansion
set "SCRIPT_DIR=%~dp0"
for %%I in ("%~dp0..\..\..") do set "REPO_ROOT=%%~fI"
cd /d "%REPO_ROOT%"
set "GESFER_REPO_ROOT=%REPO_ROOT%"

echo [prepare-frontend-env] Prepara entorno: npm install + verificacion .env
echo [prepare-frontend-env] El resultado se emite en JSON al finalizar.
echo.

where npm >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [prepare-frontend-env] ERROR: npm no encontrado.
    echo   Necesario: Node.js 20+ con npm. Instale desde https://nodejs.org/
    exit /b 1
)

if exist "%SCRIPT_DIR%prepare_frontend_env.exe" (
    "%SCRIPT_DIR%prepare_frontend_env.exe" %*
    exit /b !ERRORLEVEL!
)

set "PS_SCRIPT=%SCRIPT_DIR%Prepare-FrontendEnv.ps1"
if not exist "%PS_SCRIPT%" (
    echo [prepare-frontend-env] ERROR: prepare_frontend_env.exe y Prepare-FrontendEnv.ps1 no encontrados.
    echo   Ejecute: .\scripts\tools-rs\install.ps1
    exit /b 1
)

where pwsh >nul 2>&1
if %ERRORLEVEL% equ 0 (
    pwsh -NoProfile -ExecutionPolicy Bypass -File "%PS_SCRIPT%" %*
) else (
    powershell -NoProfile -ExecutionPolicy Bypass -File "%PS_SCRIPT%" %*
)
exit /b !ERRORLEVEL!
endlocal
