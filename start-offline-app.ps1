# Script de Inicialização do App Anamnese Offline-First
# Verifica dependências, inicia extração de PDFs (se necessário) e roda servidor

Write-Host ""
Write-Host "=" -ForegroundColor Cyan -NoNewline
Write-Host "=" * 78 -ForegroundColor Cyan
Write-Host "  ANAMNESE INTEGRATIVA - INICIALIZAÇÃO OFFLINE-FIRST" -ForegroundColor Green
Write-Host "=" -ForegroundColor Cyan -NoNewline
Write-Host "=" * 78 -ForegroundColor Cyan
Write-Host ""

$APP_DIR = "E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app"
$THERAPEUTIC_DATA_DIR = "$APP_DIR\src\assets\therapeutic-data"
$EXTRACTED_DATA_DIR = "$APP_DIR\src\data\therapeutic-extracted"
$EXTRACTION_SCRIPT = "$APP_DIR\extract_therapeutic_batch.py"

# Navega para diretório do app
Set-Location $APP_DIR

Write-Host "📁 Diretório: $APP_DIR" -ForegroundColor Yellow
Write-Host ""

# Verifica espaço em disco
Write-Host "💾 Verificando espaço em disco..." -ForegroundColor Cyan
$freeSpaceGB = [math]::Round((Get-PSDrive C).Free / 1GB, 2)
Write-Host "   Espaço livre no C: $freeSpaceGB GB" -ForegroundColor $(if ($freeSpaceGB -lt 2) { "Red" } else { "Green" })

if ($freeSpaceGB -lt 2) {
    Write-Host "   ⚠️ AVISO: Espaço em disco baixo! Recomendado mínimo 5 GB." -ForegroundColor Yellow
    Write-Host ""
}

# Verifica Node.js
Write-Host "🔍 Verificando Node.js..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    Write-Host "   ✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Node.js não encontrado!" -ForegroundColor Red
    exit 1
}

# Verifica Python
Write-Host "🔍 Verificando Python..." -ForegroundColor Cyan
try {
    $pythonVersion = python --version
    Write-Host "   ✅ Python: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Python não encontrado!" -ForegroundColor Red
    Write-Host "   Instale Python 3.9+ em: https://www.python.org/" -ForegroundColor Yellow
    exit 1
}

# Verifica bibliotecas Python
Write-Host "🔍 Verificando bibliotecas Python..." -ForegroundColor Cyan
$pythonLibs = @("PyMuPDF", "pdfplumber", "pytesseract", "pdf2image", "Pillow")
$missingLibs = @()

foreach ($lib in $pythonLibs) {
    try {
        python -c "import $(if ($lib -eq 'PyMuPDF') { 'fitz' } elseif ($lib -eq 'Pillow') { 'PIL' } else { $lib.ToLower() })" 2>$null
        Write-Host "   ✅ $lib" -ForegroundColor Green
    } catch {
        Write-Host "   ❌ $lib não encontrado" -ForegroundColor Red
        $missingLibs += $lib
    }
}

if ($missingLibs.Count -gt 0) {
    Write-Host ""
    Write-Host "📦 Instalando bibliotecas faltantes..." -ForegroundColor Yellow
    foreach ($lib in $missingLibs) {
        Write-Host "   Instalando $lib..." -ForegroundColor Cyan
        pip install $lib --quiet
    }
}

Write-Host ""

# Verifica dados extraídos
Write-Host "📚 Verificando dados terapêuticos..." -ForegroundColor Cyan
$extractedJsonExists = Test-Path "$EXTRACTED_DATA_DIR\therapeutic_content.json"
$therapeuticFilesCount = (Get-ChildItem $THERAPEUTIC_DATA_DIR -File).Count

Write-Host "   Arquivos terapêuticos: $therapeuticFilesCount" -ForegroundColor Yellow

if (-not $extractedJsonExists) {
    Write-Host "   ⚠️ Dados ainda não foram extraídos dos PDFs" -ForegroundColor Yellow
    Write-Host ""
    
    $runExtraction = Read-Host "   Deseja executar a extração agora? (S/N)"
    
    if ($runExtraction -eq "S" -or $runExtraction -eq "s") {
        Write-Host ""
        Write-Host "🚀 INICIANDO EXTRAÇÃO DE PDFs..." -ForegroundColor Green
        Write-Host "   Este processo pode levar 10-30 minutos..." -ForegroundColor Yellow
        Write-Host ""
        
        python $EXTRACTION_SCRIPT
        
        Write-Host ""
        Write-Host "✅ Extração concluída!" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host "   ⏭️ Extração ignorada. App funcionará sem busca em PDFs." -ForegroundColor Yellow
        Write-Host ""
    }
} else {
    Write-Host "   ✅ Dados extraídos encontrados" -ForegroundColor Green
    $jsonSize = [math]::Round((Get-Item "$EXTRACTED_DATA_DIR\therapeutic_content.json").Length / 1MB, 2)
    Write-Host "   Tamanho do banco: $jsonSize MB" -ForegroundColor Cyan
    Write-Host ""
}

# Verifica dependências npm
Write-Host "📦 Verificando dependências npm..." -ForegroundColor Cyan
if (-not (Test-Path "$APP_DIR\node_modules")) {
    Write-Host "   ⚠️ node_modules não encontrado" -ForegroundColor Yellow
    Write-Host "   Instalando dependências..." -ForegroundColor Cyan
    npm install
} else {
    Write-Host "   ✅ node_modules OK" -ForegroundColor Green
}

Write-Host ""

# Libera portas se ocupadas
Write-Host "🔌 Verificando portas 3000/3001..." -ForegroundColor Cyan
try {
    $portsInUse = Get-NetTCPConnection -LocalPort 3000,3001 -ErrorAction SilentlyContinue
    if ($portsInUse) {
        Write-Host "   ⚠️ Portas ocupadas. Liberando..." -ForegroundColor Yellow
        $portsInUse | ForEach-Object {
            Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
        }
        Start-Sleep -Seconds 2
        Write-Host "   ✅ Portas liberadas" -ForegroundColor Green
    } else {
        Write-Host "   ✅ Portas disponíveis" -ForegroundColor Green
    }
} catch {
    Write-Host "   ⚠️ Não foi possível verificar portas" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=" -ForegroundColor Cyan -NoNewline
Write-Host "=" * 78 -ForegroundColor Cyan
Write-Host ""

# Inicia servidor
Write-Host "🚀 INICIANDO SERVIDOR..." -ForegroundColor Green
Write-Host ""
Write-Host "   URL Local:    http://localhost:3001" -ForegroundColor Cyan
Write-Host "   Modo:         Offline-First PWA" -ForegroundColor Cyan
Write-Host "   Service Worker: Ativo" -ForegroundColor Green
Write-Host "   IndexedDB:    342 arquivos terapêuticos" -ForegroundColor Green
Write-Host ""
Write-Host "   Pressione Ctrl+C para parar o servidor" -ForegroundColor Yellow
Write-Host ""
Write-Host "=" -ForegroundColor Cyan -NoNewline
Write-Host "=" * 78 -ForegroundColor Cyan
Write-Host ""

# Define variáveis de ambiente
$env:BROWSER = "none"  # Não abre navegador automaticamente
$env:PORT = "3001"     # Força porta 3001

# Inicia npm start
npm start
