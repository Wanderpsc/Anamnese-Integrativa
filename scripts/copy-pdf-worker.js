#!/usr/bin/env node

/**
 * Script para copiar o PDF.js worker do node_modules para a pasta public
 * Necessário para evitar erro de CORS ao carregar o worker de CDN externo
 */

const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, '..', 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs');
const destFile = path.join(__dirname, '..', 'public', 'pdf.worker.min.js');

try {
  // Verificar se o arquivo fonte existe
  if (!fs.existsSync(sourceFile)) {
    console.error('❌ Arquivo fonte não encontrado:', sourceFile);
    process.exit(1);
  }

  // Criar pasta public se não existir
  const destDir = path.dirname(destFile);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Copiar arquivo
  fs.copyFileSync(sourceFile, destFile);
  
  // Verificar se foi copiado com sucesso
  if (fs.existsSync(destFile)) {
    const stats = fs.statSync(destFile);
    console.log('✅ PDF.js worker copiado com sucesso para public/pdf.worker.min.js');
    console.log(`   Tamanho: ${(stats.size / 1024).toFixed(2)} KB`);
  } else {
    console.error('❌ Erro ao copiar o worker');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Erro ao copiar PDF.js worker:', error.message);
  process.exit(1);
}
