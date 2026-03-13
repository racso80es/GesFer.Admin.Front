<#
.SYNOPSIS
    Instala dependencias npm del proyecto GesFer.Admin.Front.
.DESCRIPTION
    Ejecuta npm install en src/.
    Usar antes de la primera ejecucion o si faltan node_modules.
#>
[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$srcPath = Join-Path $projectRoot "src"

if (-not (Test-Path (Join-Path $srcPath "package.json"))) {
    Write-Error "No se encontro package.json en $srcPath"
    exit 1
}

Write-Host "[AdminFront] npm install en $srcPath" -ForegroundColor Cyan
Push-Location $srcPath
try {
    npm install
    if ($LASTEXITCODE -ne 0) { throw "npm install fallo con codigo $LASTEXITCODE" }
    Write-Host "[AdminFront] OK" -ForegroundColor Green
} finally {
    Pop-Location
}

Write-Host "Dependencias del frontend instaladas." -ForegroundColor Green
