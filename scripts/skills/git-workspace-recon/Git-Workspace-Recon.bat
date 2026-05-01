@echo off
setlocal
REM paths.skillCapsules.git-workspace-recon
set "SCRIPT_DIR=%~dp0"
set "REPO_ROOT=%SCRIPT_DIR%..\..\..\"
cd /d "%REPO_ROOT%"
set "RUST_EXE=%SCRIPT_DIR%bin\git_workspace_recon.exe"
if exist "%RUST_EXE%" (
    "%RUST_EXE%" %*
    endlocal
    exit /b %ERRORLEVEL%
)
echo git_workspace_recon.exe no encontrado. Ejecute scripts/skills-rs/install.ps1
endlocal
exit /b 1
