#!/usr/bin/env pwsh
$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Ejecutando Tests GesFer.Admin.Front" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$RootPath = Resolve-Path "$PSScriptRoot/.."
$SrcPath = Join-Path $RootPath "src"

if (-not (Test-Path (Join-Path $SrcPath "package.json"))) {
    Write-Error "No se encontró package.json en $SrcPath"
}

Write-Host "`n[1/1] Ejecutando Tests Frontend (npm run test)..." -ForegroundColor Yellow

Push-Location $SrcPath
try {
    npm run test
    if ($LASTEXITCODE -ne 0) {
        throw "Fallaron los tests del frontend."
    }
    Write-Host "Tests Frontend Exitosos." -ForegroundColor Green
}
catch {
    Write-Error "$_"
}
finally {
    Pop-Location
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "EJECUCION FINALIZADA CON EXITO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
