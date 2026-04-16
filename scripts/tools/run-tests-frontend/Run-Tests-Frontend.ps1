<#
.SYNOPSIS
    Ejecuta tests (unit, e2e, build, lint) del frontend en condiciones de validacion local.
.PARAMETER TestScope
    unit | e2e | build | lint | all (por defecto all).
.PARAMETER OnlyTests
    Solo ejecutar tests (sin npm install previo).
.PARAMETER BaseUrl
    URL base del frontend para E2E (por defecto http://localhost:3001).
.PARAMETER OutputPath
    Fichero donde escribir el resultado JSON.
.PARAMETER OutputJson
    Emitir resultado JSON por stdout.
#>
[CmdletBinding()]
param(
    [ValidateSet("unit", "e2e", "build", "lint", "all")]
    [string] $TestScope = "all",
    [switch] $OnlyTests,
    [string] $BaseUrl = "http://localhost:3001",
    [string] $OutputPath,
    [switch] $OutputJson
)

$ErrorActionPreference = "Stop"
$scriptDir = $PSScriptRoot
$repoRoot = (Resolve-Path (Join-Path $scriptDir "..\..\..")).Path
$srcPath = Join-Path $repoRoot "src"
$startTime = Get-Date
$toolId = "run-tests-frontend"
$feedbackList = [System.Collections.Generic.List[object]]::new()

function Add-Feedback {
    param([string]$Phase, [string]$Level, [string]$Message, [int]$DurationMs = $null)
    $entry = @{ phase = $Phase; level = $Level; message = $Message; timestamp = (Get-Date -Format "o") }
    if ($null -ne $DurationMs) { $entry.duration_ms = $DurationMs }
    $feedbackList.Add($entry) | Out-Null
    $color = switch ($Level) { "error" { "Red" } "warning" { "Yellow" } default { "White" } }
    Write-Host $Message -ForegroundColor $color
}

function Write-Result {
    param([bool]$Success, [int]$ExitCode, [string]$Message, [object]$Data = @{})
    $endTime = Get-Date
    $durationMs = [int](($endTime - $startTime).TotalMilliseconds)
    $result = @{
        toolId      = $toolId
        exitCode    = $ExitCode
        success     = $Success
        timestamp   = $endTime.ToUniversalTime().ToString("o")
        message     = $Message
        feedback    = @($feedbackList)
        data        = $Data
        duration_ms = $durationMs
    }
    $json = $result | ConvertTo-Json -Depth 8 -Compress
    if ($OutputPath) {
        $dir = Split-Path -Parent $OutputPath
        if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
        $json | Set-Content -Path $OutputPath -Encoding UTF8 -NoNewline
    }
    if ($OutputJson) { Write-Output $json }
    exit $ExitCode
}

Add-Feedback -Phase "init" -Level "info" -Message "Iniciando $toolId (TestScope=$TestScope)"

Push-Location $srcPath
try {
    if (-not $OnlyTests) {
        Add-Feedback -Phase "install" -Level "info" -Message "npm install..."
        $t = Get-Date
        npm install 2>&1 | Out-Null
        Add-Feedback -Phase "install" -Level "info" -Message "npm install finalizado" -DurationMs ([int]((Get-Date) - $t).TotalMilliseconds)
        if ($LASTEXITCODE -ne 0) {
            Add-Feedback -Phase "install" -Level "error" -Message "npm install fallo"
            Write-Result -Success $false -ExitCode 1 -Message "npm install fallo"
        }
    }

    $overallExit = 0
    $data = @{ scope = $TestScope }

    $runStep = {
        param([string]$StepName, [string]$Cmd)
        Add-Feedback -Phase $StepName -Level "info" -Message "Ejecutando $StepName..."
        $t = Get-Date
        Invoke-Expression $Cmd
        $ec = $LASTEXITCODE
        $dur = [int]((Get-Date) - $t).TotalMilliseconds
        Add-Feedback -Phase $StepName -Level $(if ($ec -eq 0) { "info" } else { "error" }) -Message "$StepName finalizado (exitCode=$ec)" -DurationMs $dur
        return $ec
    }

    if ($TestScope -eq "all" -or $TestScope -eq "lint") {
        $ec = & $runStep "lint" "npm run lint"
        if ($ec -ne 0) { $overallExit = $ec; $data.lint_exit = $ec }
    }

    if ($TestScope -eq "all" -or $TestScope -eq "build") {
        $ec = & $runStep "build" "npm run build"
        if ($ec -ne 0) { $overallExit = $ec; $data.build_exit = $ec }
    }

    if ($TestScope -eq "all" -or $TestScope -eq "unit") {
        $ec = & $runStep "unit" "npm run test"
        if ($ec -ne 0) { $overallExit = $ec; $data.unit_exit = $ec }
    }

    if ($TestScope -eq "all" -or $TestScope -eq "e2e") {
        $env:BASE_URL = $BaseUrl
        $ec = & $runStep "e2e" "npm run test:e2e"
        if ($ec -ne 0) { $overallExit = $ec; $data.e2e_exit = $ec }
    }

    if ($overallExit -ne 0) {
        Add-Feedback -Phase "done" -Level "warning" -Message "Tests finalizados con fallos"
        Write-Result -Success $false -ExitCode $overallExit -Message "Tests con fallos" -Data $data
    }
    Add-Feedback -Phase "done" -Level "info" -Message "Tests completados correctamente"
    Write-Result -Success $true -ExitCode 0 -Message "Tests completados correctamente" -Data $data
} catch {
    Add-Feedback -Phase "error" -Level "error" -Message "Excepcion no controlada: $($_.Exception.Message)"
    Write-Result -Success $false -ExitCode 1 -Message "Error: $($_.Exception.Message)" -Data @{ scope = $TestScope }
} finally {
    Pop-Location
}
