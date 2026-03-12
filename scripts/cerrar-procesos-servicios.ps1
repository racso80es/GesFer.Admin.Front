#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Cierra procesos que ocupan el puerto del frontend (3001).
.DESCRIPTION
    Busca procesos escuchando en el puerto 3001 (dev server Next.js) y los cierra.
    Util para liberar el puerto antes de re-arrancar el dev server.
#>

$ErrorActionPreference = "Continue"

$ports = @(3001)

Write-Host "[1/1] Cerrando procesos en puertos $($ports -join ', ')..."
foreach ($port in $ports) {
    $connections = netstat -ano 2>$null | Select-String ":$port\s+.*LISTENING"
    foreach ($conn in $connections) {
        $parts = ($conn -split '\s+')
        $processId = $parts[-1]
        if ($processId -match '^\d+$') {
            Write-Host "  Cerrando proceso en puerto $port (PID: $processId)..."
            taskkill /PID $processId /F 2>$null
        }
    }
}

Start-Sleep -Seconds 2
Write-Host "Verificacion completada." -ForegroundColor Green
