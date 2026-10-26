# Script de Limpeza e Reinício do Servidor
# Use este script quando a página estiver em branco

Write-Host "🧹 Limpando cache e reiniciando servidor..." -ForegroundColor Cyan

# 1. Parar processos na porta 3000
Write-Host "`n1️⃣ Verificando processos na porta 3000..." -ForegroundColor Yellow
$proc = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($proc) {
    Stop-Process -Id $proc -Force
    Write-Host "✓ Processo finalizado (PID: $proc)" -ForegroundColor Green
} else {
    Write-Host "✓ Nenhum processo rodando na porta 3000" -ForegroundColor Green
}

# 2. Limpar cache do node_modules
Write-Host "`n2️⃣ Limpando cache do webpack..." -ForegroundColor Yellow
if (Test-Path "node_modules\.cache") {
    Remove-Item -Path "node_modules\.cache" -Recurse -Force
    Write-Host "✓ Cache do webpack limpo" -ForegroundColor Green
} else {
    Write-Host "✓ Nenhum cache encontrado" -ForegroundColor Green
}

# 3. Limpar build anterior
Write-Host "`n3️⃣ Removendo build anterior..." -ForegroundColor Yellow
if (Test-Path "build") {
    Remove-Item -Path "build" -Recurse -Force
    Write-Host "✓ Build anterior removido" -ForegroundColor Green
} else {
    Write-Host "✓ Nenhum build anterior encontrado" -ForegroundColor Green
}

# 4. Aguardar um momento
Write-Host "`n⏳ Aguardando 2 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

# 5. Iniciar servidor
Write-Host "`n5️⃣ Iniciando servidor de desenvolvimento..." -ForegroundColor Yellow
Write-Host "   Servidor será aberto em: http://localhost:3000" -ForegroundColor Cyan
Write-Host "   Aguarde a mensagem 'Compiled successfully!'" -ForegroundColor Cyan
Write-Host "`n📝 INSTRUÇÕES NO NAVEGADOR:" -ForegroundColor Magenta
Write-Host "   1. Pressione Ctrl + Shift + R (forçar atualização)" -ForegroundColor White
Write-Host "   2. Ou abra DevTools (F12) > Network > Marque 'Disable cache'" -ForegroundColor White
Write-Host "   3. Se ainda estiver em branco, pressione F12 e veja erros no Console" -ForegroundColor White
Write-Host "`n🚀 Iniciando..." -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Gray

npm start
