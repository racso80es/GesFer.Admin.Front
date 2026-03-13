<#
.SYNOPSIS
    Ejecuta pruebas E2E en local con Playwright contra el frontend Next.js.
.DESCRIPTION
    Orquesta: (1) npm install si faltan dependencias, (2) arranque del dev server si no responde,
    (3) npm run test:e2e (Playwright).
    Ejecutar desde la raíz del repositorio. Requiere PowerShell 7+.
.PARAMETER SkipInstall
    No ejecutar npm install (asume node_modules ya presentes).
.PARAMETER SkipDevServer
    No intentar arrancar el dev server; falla si localhost:3001 no responde.
.PARAMETER BaseUrl
    URL base del frontend (por defecto http://localhost:3001).
.PARAMETER OnlyTests
    Solo ejecutar los tests E2E (sin install ni dev server).
#>
[CmdletBinding()]
param(
    [switch] $SkipInstall,
    [switch] $SkipDevServer,
    [string] $BaseUrl = "http://localhost:3001",
    [switch] $OnlyTests
)

$ErrorActionPreference = "Stop"
$repoRoot = $PSScriptRoot | Split-Path -Parent
if (-not $repoRoot) { $repoRoot = (Get-Location).Path }
$srcPath = Join-Path $repoRoot "src"

function Test-FrontendUrl {
    param([string]$Url, [int]$TimeoutSec = 5)
    try {
        $r = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec $TimeoutSec -ErrorAction Stop
        return $r.StatusCode -eq 200
    } catch {
        return $false
    }
}

Push-Location $srcPath
try {
    if (-not $OnlyTests -and -not $SkipInstall) {
        Write-Host "Paso 1/3: npm install..." -ForegroundColor Yellow
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Error "npm install fallo con codigo $LASTEXITCODE"
            exit $LASTEXITCODE
        }
    }

    if (-not $OnlyTests -and -not $SkipDevServer) {
        $frontendOk = Test-FrontendUrl -Url $BaseUrl
        if (-not $frontendOk) {
            Write-Host "Paso 2/3: Iniciando dev server en background..." -ForegroundColor Yellow
            $devJob = Start-Job -ScriptBlock {
                param($dir)
                Set-Location $dir
                npm run dev
            } -ArgumentList $srcPath

            $waitSec = 30
            $attempt = 0
            while ($attempt -lt $waitSec) {
                Start-Sleep -Seconds 1
                $attempt++
                if (Test-FrontendUrl -Url $BaseUrl -TimeoutSec 2) {
                    Write-Host "Frontend respondiendo en $BaseUrl" -ForegroundColor Green
                    break
                }
            }
            if ($attempt -ge $waitSec) {
                Write-Warning "Frontend no respondio en $waitSec s. Los tests E2E pueden fallar."
            }
        } else {
            Write-Host "Frontend ya respondiendo en $BaseUrl" -ForegroundColor Green
        }
    }

    Write-Host "Paso 3/3: Ejecutando pruebas E2E (Playwright)..." -ForegroundColor Yellow
    $env:BASE_URL = $BaseUrl
    npm run test:e2e
    $testExit = $LASTEXITCODE

    if ($testExit -eq 0) {
        Write-Host "E2E completados correctamente." -ForegroundColor Green
    } else {
        Write-Error "E2E fallaron con codigo $testExit"
    }
    exit $testExit
} finally {
    Pop-Location
}
