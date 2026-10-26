@echo off
chcp 65001 > nul
title Anamnese Integrativa — Sistema Local
color 0A

echo.
echo  ============================================================
echo    SISTEMA DE ANAMNESE INTEGRATIVA — MODO LOCAL / OFFLINE
echo  ============================================================
echo.

:: Vai para a pasta do projeto
cd /d "%~dp0"

:: ── Localiza Node.js ─────────────────────────────────────────────────────────
set "NODE_EXE="
set "NPM_CMD="

:: Instalacao detectada em E:\
if exist "E:\node.exe"  set "NODE_EXE=E:\node.exe"
if exist "E:\npm.cmd"   set "NPM_CMD=E:\npm.cmd"

:: Tenta PATH do sistema
if "%NODE_EXE%"=="" where node >nul 2>nul && set "NODE_EXE=node"
if "%NPM_CMD%"==""  where npm  >nul 2>nul && set "NPM_CMD=npm"

:: Pastas comuns
if "%NODE_EXE%"=="" if exist "%ProgramFiles%\nodejs\node.exe" set "NODE_EXE=%ProgramFiles%\nodejs\node.exe"
if "%NPM_CMD%"==""  if exist "%ProgramFiles%\nodejs\npm.cmd"  set "NPM_CMD=%ProgramFiles%\nodejs\npm.cmd"

if "%NODE_EXE%"=="" (
  echo  ERRO: Node.js nao encontrado.
  echo  Instale em https://nodejs.org e tente novamente.
  pause
  exit /b 1
)

echo  Node.js encontrado: %NODE_EXE%
echo.

:: ── Prepara a biblioteca de documentos ───────────────────────────────────────
echo  [1/2] Preparando biblioteca de documentos...
"%NODE_EXE%" scripts\setup-biblioteca.js
echo.

:: ── Inicia servidor ───────────────────────────────────────────────────────────
echo  [2/2] Iniciando servidor local...
echo  O navegador abrira automaticamente em http://localhost:3000
echo  Deixe esta janela aberta enquanto usar o sistema.
echo  Para encerrar: feche esta janela ou pressione Ctrl+C
echo.

:: Abre o navegador apos 15s
start "" powershell -WindowStyle Hidden -Command "Start-Sleep 15; Start-Process 'http://localhost:3000'"

:: Inicia com npm se disponivel, senao com node diretamente
if not "%NPM_CMD%"=="" (
  "%NPM_CMD%" start
) else (
  "%NODE_EXE%" node_modules\.bin\react-scripts start
)

pause
