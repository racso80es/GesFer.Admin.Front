<#
.SYNOPSIS
    Fase pre_pr de finalizar-git: push de la rama y creación del PR hacia main/master.
.DESCRIPTION
    Hace git push origin <rama> y, si gh está instalado, gh pr create. Si no, muestra URL para crear PR manualmente.
.PARAMETER Persist
    Ruta de la carpeta de la feature (ej. docs/features/audit-inicial-admin-front/)
.PARAMETER BranchName
    Rama a pushear (por defecto: rama actual).
.PARAMETER Title
    Título del PR (opcional).
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string] $Persist,

    [Parameter(Mandatory = $false)]
    [string] $BranchName,

    [Parameter(Mandatory = $false)]
    [string] $Title
)

$ErrorActionPreference = "Stop"
$scriptDir = $PSScriptRoot
$repoRoot = (Resolve-Path (Join-Path $scriptDir "..\..\..")).Path
Push-Location $repoRoot
try {
    $branch = if ($BranchName) { $BranchName } else { (git branch --show-current).Trim() }
    if ([string]::IsNullOrWhiteSpace($branch)) {
        Write-Error "No se pudo obtener la rama. Especifique -BranchName o ejecute desde una rama feat/fix."
        exit 1
    }

    # Push (idempotente)
    Write-Host "[Finalizar-Git] Push origin $branch" -ForegroundColor Cyan
    git push origin $branch
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

    # Base branch (main o master)
    $baseBranch = if (git rev-parse --verify main 2>$null) { "main" } else { "master" }

    # gh pr create
    $gh = Get-Command gh -ErrorAction SilentlyContinue
    if ($gh) {
        $prTitle = if ($Title) { $Title } else { $branch -replace "^feat/|^fix/", "" -replace "-", " " }
        $prBody = "Documentación: $Persist`n`nRef: docs/features/audit-inicial-admin-front/objectives.md"
        Write-Host "[Finalizar-Git] Creando PR hacia $baseBranch..." -ForegroundColor Cyan
        gh pr create --base $baseBranch --head $branch --title $prTitle --body $prBody
        $exitCode = $LASTEXITCODE
    } else {
        Write-Host "[Finalizar-Git] gh no instalado. Crear PR manualmente:" -ForegroundColor Yellow
        $repo = (git config --get remote.origin.url) -replace "\.git$", "" -replace "git@github.com:", "https://github.com/" -replace "https://github.com/", "https://github.com/"
        Write-Host "  $repo/compare/$baseBranch...$branch" -ForegroundColor White
        $exitCode = 0
    }
} finally {
    Pop-Location
}
exit $exitCode
