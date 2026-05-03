@echo off
setlocal
set "SCRIPT_DIR=%~dp0"
set "REPO_ROOT=%SCRIPT_DIR%..\..\..\"
cd /d "%REPO_ROOT%"
set "RUST_EXE=%SCRIPT_DIR%bin\git_sync_remote.exe"
if exist "%RUST_EXE%" (
    "%RUST_EXE%" %*
    endlocal
    exit /b %ERRORLEVEL%
)
echo git_sync_remote.exe no encontrado. Ejecute scripts/skills-rs/install.ps1
endlocal
exit /b 1
