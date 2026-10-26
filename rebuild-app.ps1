# Script para recompilar o executável
Write-Host "🔄 Fechando aplicativo..."
Get-Process | Where-Object {$_.ProcessName -like "*Anamnese*"} | Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 3

Write-Host "🗑️ Limpando pasta antiga..."
Remove-Item "dist\win-unpacked" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "📦 Reconstruindo executável..."
$env:CSC_IDENTITY_AUTO_DISCOVERY="false"
npx electron-builder build --win --x64 --config electron-builder.json --dir

if (Test-Path "dist\win-unpacked\Anamnese Integrativa.exe") {
    Write-Host ""
    Write-Host "✅ EXECUTÁVEL CRIADO COM SUCESSO!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📦 Criando ZIP final..."
    Compress-Archive -Path "dist\win-unpacked\*" -DestinationPath "dist\Anamnese-Integrativa-v2.1.0-FUNCIONANDO.zip" -Force
    
    $zipInfo = Get-Item "dist\Anamnese-Integrativa-v2.1.0-FUNCIONANDO.zip"
    $sizeMB = [math]::Round($zipInfo.Length/1MB,2)
    
    Write-Host ""
    Write-Host "✅ ZIP CRIADO: Anamnese-Integrativa-v2.1.0-FUNCIONANDO.zip ($sizeMB MB)" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Testando executável..."
    Start-Process "dist\win-unpacked\Anamnese Integrativa.exe"
} else {
    Write-Host ""
    Write-Host "❌ ERRO: Executável não foi criado" -ForegroundColor Red
}
