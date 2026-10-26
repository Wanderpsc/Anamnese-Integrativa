# Script de Deploy para Vercel
# Anamnese Integrativa - Wander Pires

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Deploy Anamnese Integrativa - Vercel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se está no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erro: Execute este script na raiz do projeto!" -ForegroundColor Red
    exit 1
}

# Verificar se Vercel CLI está instalado
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "📦 Vercel CLI não encontrado. Instalando..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao instalar Vercel CLI" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Vercel CLI instalado!" -ForegroundColor Green
}

# Menu de opções
Write-Host "Escolha uma opção:" -ForegroundColor Yellow
Write-Host "1. Deploy de Desenvolvimento (Preview)" -ForegroundColor White
Write-Host "2. Deploy de Produção" -ForegroundColor White
Write-Host "3. Build Local (sem deploy)" -ForegroundColor White
Write-Host "4. Configurar Vercel" -ForegroundColor White
Write-Host "5. Sair" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Digite o número da opção"

switch ($choice) {
    "1" {
        Write-Host "🚀 Iniciando deploy de desenvolvimento..." -ForegroundColor Cyan
        npm run build
        if ($LASTEXITCODE -eq 0) {
            vercel
        } else {
            Write-Host "❌ Erro no build" -ForegroundColor Red
            exit 1
        }
    }
    "2" {
        Write-Host "🚀 Iniciando deploy de PRODUÇÃO..." -ForegroundColor Cyan
        Write-Host "⚠️  Isso atualizará o site em produção!" -ForegroundColor Yellow
        $confirm = Read-Host "Confirma? (s/n)"
        if ($confirm -eq "s" -or $confirm -eq "S") {
            npm run build
            if ($LASTEXITCODE -eq 0) {
                vercel --prod
                Write-Host ""
                Write-Host "✅ Deploy concluído!" -ForegroundColor Green
                Write-Host "🌐 Acesse seu site em: https://seu-projeto.vercel.app" -ForegroundColor Cyan
            } else {
                Write-Host "❌ Erro no build" -ForegroundColor Red
                exit 1
            }
        } else {
            Write-Host "❌ Deploy cancelado" -ForegroundColor Yellow
        }
    }
    "3" {
        Write-Host "🔨 Gerando build local..." -ForegroundColor Cyan
        npm run build
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Build gerado em ./build/" -ForegroundColor Green
            Write-Host "Para testar localmente:" -ForegroundColor Yellow
            Write-Host "  npm install -g serve" -ForegroundColor White
            Write-Host "  serve -s build" -ForegroundColor White
        } else {
            Write-Host "❌ Erro no build" -ForegroundColor Red
            exit 1
        }
    }
    "4" {
        Write-Host "⚙️  Configurando Vercel..." -ForegroundColor Cyan
        vercel login
    }
    "5" {
        Write-Host "👋 Até logo!" -ForegroundColor Cyan
        exit 0
    }
    default {
        Write-Host "❌ Opção inválida!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Operação concluída!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
