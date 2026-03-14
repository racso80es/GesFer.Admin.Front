@echo off
setlocal enabledelayedexpansion
set "SCRIPT_DIR=%~dp0"
for %%I in ("%~dp0..\..\..") do set "REPO_ROOT=%%~fI"
cd /d "%REPO_ROOT%"
set "GESFER_REPO_ROOT=%REPO_ROOT%"

echo [start-frontend] Levanta el dev server Next.js (npm run dev, puerto 3001^)
echo [start-frontend] El resultado se emite en JSON al finalizar.
echo.

where npm >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [start-frontend] ERROR: npm no encontrado.
    echo   Necesario: Node.js 20+ con npm. Instale desde https://nodejs.org/
    exit /b 1
)

if not exist "%SCRIPT_DIR%start_frontend.exe" (
    echo [start-frontend] ERROR: start_frontend.exe no encontrado.
    echo   Ejecute: .\scripts\tools-rs\install.ps1
    echo   Requiere Rust instalado. Si falta: https://www.rust-lang.org/tools/install
    exit /b 1
)

"%SCRIPT_DIR%start_frontend.exe" %*
exit /b !ERRORLEVEL!
endlocal
