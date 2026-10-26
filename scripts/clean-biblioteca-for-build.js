#!/usr/bin/env node
/**
 * clean-biblioteca-for-build.js
 * Remove public/biblioteca/ antes do build de produção para evitar
 * incluir centenas de PDFs/DOCXs (GBs) no bundle de deploy.
 * O índice é substituído por um stub "localOnly: true" para que
 * a BibliotecaPage mostre mensagem amigável em produção.
 *
 * Os arquivos são restaurados automaticamente ao rodar `npm start`
 * via scripts/setup-biblioteca.js (executado no prestart).
 */

const fs = require('fs');
const path = require('path');

const publicDir  = path.join(__dirname, '..', 'public');
const bibDir     = path.join(publicDir, 'biblioteca');
const indexPath  = path.join(publicDir, 'biblioteca-index.json');

// Remove pasta de arquivos locais
if (fs.existsSync(bibDir)) {
  fs.rmSync(bibDir, { recursive: true, force: true });
  console.log('🗑️  public/biblioteca/ removida para o build (não vai para deploy)');
}

// Mantém os metadados (títulos/categorias) mas marca localOnly: true
// Assim o catálogo aparece online, mesmo sem os arquivos reais.
let existingFiles = [];
if (fs.existsSync(indexPath)) {
  try {
    const existing = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    if (Array.isArray(existing.files) && existing.files.length > 0) {
      existingFiles = existing.files;
    }
  } catch (_) {}
}

fs.writeFileSync(indexPath, JSON.stringify({
  files: existingFiles,
  count: existingFiles.length,
  localOnly: true,
  timestamp: new Date().toISOString(),
}));
console.log(`📋 public/biblioteca-index.json → localOnly gravado (${existingFiles.length} títulos preservados)`);
