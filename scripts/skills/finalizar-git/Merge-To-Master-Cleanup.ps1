<#
.SYNONOPSIS
    Fase post_pr de finalizar-git: checkout main, pull, eliminar rama local y opcionalmente remota.
.PARAMETER BranchName
    Rama a eliminar (ej. feat/audit-inicial-admin-front).
.PARAMETER DeleteRemote
    Eliminar también la rama remota.
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string] $BranchName,

    [Parameter(Mandatory = $false)]
    [switch] $DeleteRemote
)

$ErrorActionPreference = "Stop"
$scriptDir = $PSScriptRoot
$repoRoot = (Resolve-Path (Join-Path $scriptDir "..\..\..")).Path
Push-Location $repoRoot
try {
    $baseBranch = if (git rev-parse --verify main 2>$null) { "main" } else { "master" }
    Write-Host "[Finalizar-Git] Checkout $baseBranch" -ForegroundColor Cyan
    git checkout $baseBranch
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

    Write-Host "[Finalizar-Git] Pull origin $baseBranch" -ForegroundColor Cyan
    git pull origin $baseBranch
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

    Write-Host "[Finalizar-Git] Eliminar rama local $BranchName" -ForegroundColor Cyan
    git branch -d $BranchName
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

    if ($DeleteRemote) {
        Write-Host "[Finalizar-Git] Eliminar rama remota $BranchName" -ForegroundColor Cyan
        git push origin --delete $BranchName
        if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    }

    Write-Host "[Finalizar-Git] Proceso completado. Rama actual: $baseBranch" -ForegroundColor Green
    git status
} finally {
    Pop-Location
}
