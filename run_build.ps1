Set-Location "e:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO 2\anamnese-app"
$env:CI = "false"
$result = & cmd /c "npm run build 2>&1"
$result | Out-File -FilePath "build_capture.txt" -Encoding UTF8
Write-Host "Exit: $LASTEXITCODE"
Write-Host "=== RESULT (last 80 lines) ==="
$result | Select-Object -Last 80
