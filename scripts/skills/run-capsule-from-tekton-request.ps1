#Requires -Version 5.1
<#
.SYNOPSIS
  Invoca cápsulas Rust (.exe) leyendo la petición desde un archivo en la raíz del repo,
  evitando stdin colgante en runners IDE (GESFER_CAPSULE_REQUEST / archivo temporal).

.DESCRIPTION
  Lee `.tekton_request.json` en la raíz del repositorio (o ruta indicada con -RequestPath).

  Modos:
  1) Cápsula JSON v2 — preferir `capsuleRequestRaw` (string JSON ya compacto para GESFER_CAPSULE_REQUEST).
     Alternativa: `capsuleEnvelope` como objeto; en Windows PowerShell 5.1 la serialización puede alterar
     mayúsculas: use `capsuleRequestRaw` si el .exe rechaza el envelope.
     Se expone en la variable de entorno GESFER_CAPSULE_REQUEST
     (misma semántica que scripts/skills-rs/src/capsule_json.rs).
  2) Registro evolución SddIA — propiedad `evolutionRegister` con el cuerpo del request
     (claves camelCase: descripcionBreve, tipoOperacion, …). Se escribe un JSON temporal
     y se invoca el .exe con `--input <temp>`.

  Tras la ejecución se elimina el archivo de petición salvo `deleteRequestFile: false`.

  Contrato mínimo del JSON:
  {
    "executable": "ruta/relativa/al/repo/mi.exe",
    "capsuleEnvelope": { "meta": {...}, "request": {...} }   // opcional si hay evolutionRegister
    "evolutionRegister": { ... }                              // opcional; implica --input temp
    "argumentList": [ "--extra" ],                             // opcional; se añaden al final
    "deleteRequestFile": true
  }

.NOTES
  Cápsula canónica: paths.skillCapsules (Cúmulo). Norma: SddIA/norms/commands-via-skills-or-tools.md
#>
[CmdletBinding()]
param(
    [Parameter()]
    [string] $RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path,

    [Parameter()]
    [string] $RequestFileName = '.tekton_request.json'
)

Set-StrictMode -Version 3
$ErrorActionPreference = 'Stop'

$requestPath = Join-Path $RepoRoot $RequestFileName
if (-not (Test-Path -LiteralPath $requestPath)) {
    throw "No existe el archivo de petición: $requestPath"
}

$raw = Get-Content -LiteralPath $requestPath -Raw -Encoding UTF8
$doc = $raw | ConvertFrom-Json

$exeProp = $doc.PSObject.Properties['executable']
if ($null -eq $exeProp -or [string]::IsNullOrWhiteSpace([string]$exeProp.Value)) {
    throw "El JSON de petición debe incluir la propiedad 'executable' (ruta al .exe relativa al repo o absoluta)."
}

$exePath = [string]$exeProp.Value
if (-not [System.IO.Path]::IsPathRooted($exePath)) {
    $exePath = Join-Path $RepoRoot $exePath
}
if (-not (Test-Path -LiteralPath $exePath)) {
    throw "Ejecutable no encontrado: $exePath"
}

$deleteRequest = $true
$propDel = $doc.PSObject.Properties['deleteRequestFile']
if ($null -ne $propDel -and $propDel.Value -eq $false) {
    $deleteRequest = $false
}

$argExtra = @()
$argListProp = $doc.PSObject.Properties['argumentList']
if ($null -ne $argListProp -and $null -ne $argListProp.Value) {
    foreach ($a in $argListProp.Value) {
        $argExtra += [string]$a
    }
}

$tempEvo = $null
try {
    Push-Location $RepoRoot

    $pRaw = $doc.PSObject.Properties['capsuleRequestRaw']
    $pEnv = $doc.PSObject.Properties['capsuleEnvelope']
    $evoProp = $doc.PSObject.Properties['evolutionRegister']
    $hasCapsuleRaw = $null -ne $pRaw -and -not [string]::IsNullOrWhiteSpace([string]$pRaw.Value)
    $hasCapsuleObj = $null -ne $pEnv -and $null -ne $pEnv.Value

    if (($hasCapsuleRaw -or $hasCapsuleObj) -and $null -ne $evoProp -and $null -ne $evoProp.Value) {
        throw "No puede coexistir petición de cápsula (capsuleRequestRaw/capsuleEnvelope) y 'evolutionRegister'."
    }

    if ($hasCapsuleRaw) {
        $env:GESFER_CAPSULE_REQUEST = [string]$pRaw.Value
    }
    elseif ($hasCapsuleObj) {
        $envelopeJson = ($pEnv.Value | ConvertTo-Json -Depth 100 -Compress)
        $env:GESFER_CAPSULE_REQUEST = $envelopeJson
    }

    if ($null -ne $evoProp -and $null -ne $evoProp.Value) {
        $tempEvo = [System.IO.Path]::ChangeExtension([System.IO.Path]::GetTempFileName(), 'json')
        $evoJson = ($evoProp.Value | ConvertTo-Json -Depth 100 -Compress)
        [System.IO.File]::WriteAllText($tempEvo, $evoJson, [System.Text.UTF8Encoding]::new($false))
        $allArgs = @('--input', $tempEvo) + $argExtra
        & $exePath @allArgs
    }
    else {
        & $exePath @argExtra
    }

    $exitCode = $LASTEXITCODE
}
finally {
    Remove-Item Env:GESFER_CAPSULE_REQUEST -ErrorAction SilentlyContinue
    if ($null -ne $tempEvo -and (Test-Path -LiteralPath $tempEvo)) {
        Remove-Item -LiteralPath $tempEvo -Force -ErrorAction SilentlyContinue
    }
    Pop-Location

    if ($deleteRequest -and (Test-Path -LiteralPath $requestPath)) {
        Remove-Item -LiteralPath $requestPath -Force -ErrorAction SilentlyContinue
    }
}

exit $exitCode
