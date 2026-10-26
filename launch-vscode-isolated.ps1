# Script para iniciar VS Code isolado no drive E:
# Garante que nenhum dado seja armazenado no C:

$ErrorActionPreference = "Stop"

# Define diretórios base no E:
$projectPath = "E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app"
$vscodePath = "$projectPath\VSCode_Backup_20251210_141100"

# Cria estrutura de diretórios se não existir
$userDataDir = "$projectPath\.vscode-user-data"
$extensionsDir = "$projectPath\.vscode-extensions"
$tmpDir = "$projectPath\.vscode-tmp"

New-Item -ItemType Directory -Path $userDataDir -Force | Out-Null
New-Item -ItemType Directory -Path $extensionsDir -Force | Out-Null
New-Item -ItemType Directory -Path $tmpDir -Force | Out-Null

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Iniciando VS Code Isolado no Drive E:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configurações:" -ForegroundColor Yellow
Write-Host "  User Data: $userDataDir" -ForegroundColor White
Write-Host "  Extensions: $extensionsDir" -ForegroundColor White
Write-Host "  Temp: $tmpDir" -ForegroundColor White
Write-Host ""

# Define variáveis de ambiente para esta sessão
$env:VSCODE_PORTABLE = $projectPath
$env:VSCODE_APPDATA = $userDataDir
$env:VSCODE_EXTENSIONS = $extensionsDir
$env:TMPDIR = $tmpDir
$env:TEMP = $tmpDir
$env:TMP = $tmpDir

# Inicia o VS Code com parâmetros específicos
$codeCmd = Get-Command code -ErrorAction SilentlyContinue

if ($codeCmd) {
    Write-Host "Iniciando VS Code..." -ForegroundColor Green
    & code `
        --user-data-dir="$userDataDir" `
        --extensions-dir="$extensionsDir" `
        "$projectPath"
    
    Write-Host ""
    Write-Host "VS Code iniciado com armazenamento isolado no E:" -ForegroundColor Green
} else {
    Write-Host "ERRO: Comando 'code' não encontrado!" -ForegroundColor Red
    Write-Host "Certifique-se de que o VS Code está instalado e no PATH." -ForegroundColor Red
    exit 1
}
