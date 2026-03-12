<#
.SYNOPSIS
    Valida la ejecucion del frontend: hace ping al dev server y revisa logs.
.DESCRIPTION
    Opcion A: Si el frontend ya esta en marcha, solo ejecuta health check y muestra ultimas lineas de logs.
    Opcion B: Con -StartService, inicia el dev server en background, espera, hace health check y muestra logs.
.PARAMETER StartService
    Si se especifica, inicia el dev server en background antes del health check.
#>
[CmdletBinding()]
param(
    [switch] $StartService
)

$ErrorActionPreference = "SilentlyContinue"
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$logsDir = Join-Path $projectRoot "logs\services"
$srcPath = Join-Path $projectRoot "src"

$endpoints = @(
    @{ Service = "AdminFront"; Url = "http://localhost:3001" }
)

function Get-HealthStatus {
    param([string]$Url, [int]$TimeoutSec = 8)
    try {
        $r = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec $TimeoutSec
        return @{ StatusCode = $r.StatusCode; OK = $true }
    } catch {
        $code = if ($_.Exception.Response) { $_.Exception.Response.StatusCode.value__ } else { $null }
        return @{ StatusCode = $code; OK = $false; Error = $_.Exception.Message }
    }
}

if ($StartService) {
    Write-Host "Iniciando AdminFront en background..." -ForegroundColor Cyan
    $runScript = Join-Path $PSScriptRoot "run-service-with-log.ps1"
    $jobFront = Start-Job -ScriptBlock {
        param($script, $name, $dir, $cmd)
        & $script -ServiceName $name -WorkingDir $dir -Command $cmd
    } -ArgumentList $runScript, "AdminFront", $srcPath, "npm run dev"
    Write-Host "Esperando 15 segundos para que el frontend enlace..." -ForegroundColor Yellow
    Start-Sleep -Seconds 15
}

Write-Host "`n=== Health checks ===" -ForegroundColor Green
$healthResults = @()
foreach ($ep in $endpoints) {
    $result = Get-HealthStatus -Url $ep.Url
    $healthResults += [PSCustomObject]@{
        Servicio   = $ep.Service
        Endpoint   = $ep.Url
        StatusCode = if ($result.OK) { $result.StatusCode } else { "N/A" }
        Estado     = if ($result.OK) { "OK" } else { $result.Error }
    }
    $color = if ($result.OK) { "Green" } else { "Red" }
    $msg = if ($result.OK) { "$($ep.Service): $($ep.Url) -> $($result.StatusCode)" } else { "$($ep.Service): $($ep.Url) -> Error" }
    Write-Host $msg -ForegroundColor $color
}
$healthResults | Format-Table -AutoSize

Write-Host "`n=== Ultimas lineas de logs (cola) ===" -ForegroundColor Green
foreach ($name in @("AdminFront")) {
    $logFile = Join-Path $logsDir "$name.log"
    if (Test-Path $logFile) {
        Write-Host "--- $name.log (ultimas 12 lineas) ---" -ForegroundColor Cyan
        Get-Content $logFile -Tail 12 -ErrorAction SilentlyContinue
        Write-Host ""
    }
}

if ($StartService) {
    Write-Host "El trabajo de AdminFront sigue en ejecucion. Para detenerlo: Get-Job | Stop-Job; Get-Job | Remove-Job" -ForegroundColor Yellow
}

return $healthResults
