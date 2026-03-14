@echo off
setlocal enabledelayedexpansion
set "SCRIPT_DIR=%~dp0"
for %%I in ("%~dp0..\..\..") do set "REPO_ROOT=%%~fI"
cd /d "%REPO_ROOT%"
set "GESFER_REPO_ROOT=%REPO_ROOT%"

if not exist "%SCRIPT_DIR%start_frontend.exe" (
    echo [start-frontend] ERROR: start_frontend.exe no encontrado. Ejecute install.ps1 en scripts/tools-rs/
    exit /b 1
)

"%SCRIPT_DIR%start_frontend.exe" %*
exit /b !ERRORLEVEL!
endlocal
