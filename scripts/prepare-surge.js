const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Copia index.html para 200.html para o Surge lidar com rotas SPA
const buildDir = path.join(__dirname, '..', 'build');

// Remove a pasta build/biblioteca (PDFs/DOCXs de uso local — não vão para deploy)
const buildBibliotecaDir = path.join(buildDir, 'biblioteca');
if (fs.existsSync(buildBibliotecaDir)) {
  try {
    // Usa cmd /c rd para garantir remoção no Windows (fs.rmSync pode falhar silenciosamente em pastas grandes)
    execSync(`cmd /c rd /s /q "${buildBibliotecaDir}"`, { stdio: 'ignore' });
  } catch {
    fs.rmSync(buildBibliotecaDir, { recursive: true, force: true });
  }
  if (fs.existsSync(buildBibliotecaDir)) {
    console.warn('⚠️  build/biblioteca/ NÃO foi removida! Remova manualmente antes do deploy.');
    process.exit(1);
  }
  console.log('🗑️  build/biblioteca/ removida (arquivos locais, não vão para Surge)');
}
// O índice já vem do build com localOnly:true e os metadados preservados — não sobrescrever.
const buildIndexPath = path.join(buildDir, 'biblioteca-index.json');
if (fs.existsSync(buildIndexPath)) {
  const idx = JSON.parse(fs.readFileSync(buildIndexPath, 'utf8'));
  console.log(`📋 biblioteca-index.json mantido: ${idx.count || 0} títulos, localOnly=${idx.localOnly}`);
} else {
  fs.writeFileSync(buildIndexPath, JSON.stringify({ files: [], count: 0, localOnly: true, timestamp: new Date().toISOString() }));
  console.log('📋 biblioteca-index.json criado (stub) — rode npm start antes do build para preservar títulos');
}

// ── Renomeia arquivos com caracteres especiais em todo o build ────────────────
// O Surge falha no upload quando encontra nomes de arquivo com acentos/espaços.
function sanitizeName(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')   // remove acentos (NFD decomposed)
    .replace(/\s+/g, '-')             // espaços → hífen
    .replace(/[^a-zA-Z0-9._\-]/g, '_'); // demais chars especiais → _
}

function renameSpecialCharsRecursive(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let renamed = 0;
  for (const entry of entries) {
    const oldPath = path.join(dir, entry.name);
    const safeName = sanitizeName(entry.name);
    if (safeName !== entry.name) {
      const newPath = path.join(dir, safeName);
      fs.renameSync(oldPath, newPath);
      renamed++;
      if (entry.isDirectory()) renameSpecialCharsRecursive(newPath);
    } else if (entry.isDirectory()) {
      renameSpecialCharsRecursive(oldPath);
    }
  }
  return renamed;
}

const totalRenamed = renameSpecialCharsRecursive(buildDir) || 0;
if (totalRenamed > 0) {
  console.log(`🔤 ${totalRenamed} arquivo(s)/pasta(s) renomeado(s) para nomes URL-safe`);
}
// ─────────────────────────────────────────────────────────────────────────────
const indexPath = path.join(buildDir, 'index.html');
const html200Path = path.join(buildDir, '200.html');

if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, html200Path);
  console.log('✅ 200.html criado para rotas SPA no Surge');
} else {
  console.error('❌ index.html não encontrado');
  process.exit(1);
}
