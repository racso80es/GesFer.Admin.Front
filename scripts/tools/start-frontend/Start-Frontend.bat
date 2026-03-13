@echo off
setlocal
set "SCRIPT_DIR=%~dp0"
for %%I in ("%~dp0..\..\..") do set "REPO_ROOT=%%~fI"
cd /d "%REPO_ROOT%\src"

echo [start-frontend] Iniciando dev server Next.js en src/ ...
npm run dev
endlocal
