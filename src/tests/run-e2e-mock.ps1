# Run E2E tests con Mock API (Windows PowerShell)
# Uso: desde src/ ejecutar: pwsh tests/run-e2e-mock.ps1

$mockProcess = $null
$exitCode = 1
try {
    # Iniciar Mock API en segundo plano
    $mockProcess = Start-Process -FilePath "node" -ArgumentList "tests/mock-api.js" -PassThru -WindowStyle Hidden -RedirectStandardOutput "mock.log" -RedirectStandardError "mock-err.log"
    Write-Host "Mock API started with PID $($mockProcess.Id)"
    Start-Sleep -Seconds 2

    # Puerto dedicado para tests con mock (evita conflicto con dev en 3001)
    $testPort = "3002"
    $env:E2E_MOCK = "1"
    $env:E2E_MOCK_PORT = $testPort
    $env:ADMIN_API_URL = "http://localhost:5050"
    $env:NEXT_PUBLIC_ADMIN_API_URL = "http://localhost:5050"
    $env:NEXT_PUBLIC_API_URL = "http://localhost:5050"
    $env:NEXTAUTH_URL = "http://localhost:$testPort"
    $env:CLIENT_URL = "http://localhost:$testPort"
    $env:AUTH_SECRET = "secret-for-testing"
    $env:AUDIT_USER = "admin"
    $env:AUDIT_PASS = "password"
    $env:E2E_ADMIN_USER = "admin"
    $env:E2E_ADMIN_PASSWORD = "password"

    # Ejecutar Playwright
    & npx playwright test
    $exitCode = $LASTEXITCODE
}
finally {
    if ($null -ne $mockProcess -and -not $mockProcess.HasExited) {
        Stop-Process -Id $mockProcess.Id -Force -ErrorAction SilentlyContinue
        Write-Host "Mock API stopped"
    }
}
exit $exitCode
