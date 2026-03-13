@echo off
setlocal
set "SCRIPT_DIR=%~dp0"
for %%I in ("%~dp0..\..\..") do set "REPO_ROOT=%%~fI"
cd /d "%REPO_ROOT%\src"

echo [prepare-frontend-env] Instalando dependencias npm...
npm install
if %ERRORLEVEL% neq 0 (
    echo [prepare-frontend-env] ERROR: npm install fallo.
    exit /b %ERRORLEVEL%
)

if not exist ".env.local" (
    if exist ".env.example" (
        echo [prepare-frontend-env] Copiando .env.example a .env.local...
        copy ".env.example" ".env.local"
    ) else (
        echo [prepare-frontend-env] AVISO: No existe .env.example ni .env.local
    )
) else (
    echo [prepare-frontend-env] .env.local ya existe.
)

echo [prepare-frontend-env] Entorno frontend preparado.
endlocal
