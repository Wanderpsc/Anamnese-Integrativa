#!/usr/bin/env node
/**
 * setup-biblioteca.js
 * Gera o índice de arquivos da Pesquisa Bibliográfica e copia os PDFs/DOCXs
 * para public/biblioteca/ (necessário para a página funcionar no servidor local).
 *
 * Executado via "prestart" automaticamente a cada `npm start`.
 * Não é executado no build de produção (para não explodir o tamanho do deploy).
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '..', 'src', 'assets', 'therapeutic-data');
const DEST_DIR   = path.join(__dirname, '..', 'public', 'biblioteca');
const INDEX_PATH = path.join(__dirname, '..', 'public', 'biblioteca-index.json');

// Extensões suportadas pelo visualizador (em ordem de preferência quando há duplicata)
const EXT_PRIORITY = ['.pdf', '.docx', '.txt', '.rtf'];

// Padrões de categorias detectados pelo nome do arquivo
const CATEGORIES = [
  { key: 'iridologia',    label: 'Iridologia',       color: '#7B1FA2', keywords: ['iridolog','iris','rayid','iris'] },
  { key: 'fitoterapia',   label: 'Fitoterapia',       color: '#388E3C', keywords: ['fitoter','fitohorm','planta','erva','herb','raiz','semin','extrat','tintura','ch','alcaloid'] },
  { key: 'homeopatia',    label: 'Homeopatia / Florais', color: '#1976D2', keywords: ['homeopat','floral','bach','biossiner','frequenc','vibrac','essenci'] },
  { key: 'nutricao',      label: 'Nutrição Funcional',color: '#F57C00', keywords: ['nutric','alimentar','aliment','dieta','dietoter','cardapio','receita','vitamina','mineral','proteina','fibra','suco','shot','kefir','organico','macrobio'] },
  { key: 'ortomolecular', label: 'Ortomolecular',     color: '#C62828', keywords: ['ortomol','suplementa','aminoacid','antioxid','coenzima','q10','magnesio','zinco','seleni','ferrit','bcaa','nac','nadh','ala ','5htp','seroton','dopamin'] },
  { key: 'exames',        label: 'Exames Laboratoriais', color: '#0097A7', keywords: ['exame','laborat','hemograma','bioquim','urina','sangue','ferrit','pcr','tsh','t3','t4','glicos','insulina','colest','triglice','hemato'] },
  { key: 'anamnese',      label: 'Anamnese / Avaliação', color: '#5D4037', keywords: ['anamnes','avaliaca','ficha','questionario','triagem','consulta'] },
  { key: 'biorresonancia',label: 'Biorressonância',   color: '#6A1B9A', keywords: ['biorresson','bioresson','quantum','nls','qrma','energia','biocampo','aura','chakra'] },
  { key: 'manual',        label: 'Manuais / Apostilas',  color: '#37474F', keywords: ['apostila','manual','guia','curso','modulo','fundament','livro','ebook','e-book','artigo','revista','fascicul'] },
  { key: 'protocolos',    label: 'Protocolos Clínicos',  color: '#BF360C', keywords: ['protocol','condut','terapeutic','tratament','formula','prescric','receituario','soroter','injetav'] },
];

function detectCategory(filename) {
  const n = filename.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  for (const cat of CATEGORIES) {
    if (cat.keywords.some(kw => n.includes(kw))) return cat;
  }
  return { key: 'outros', label: 'Outros', color: '#455A64', keywords: [] };
}

function formatTitle(basename) {
  return basename
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b([a-z])/g, (_, c) => c.toUpperCase())
    .trim();
}

function sanitizeFilename(name) {
  // Replace characters illegal in Windows filenames with underscore
  return name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_');
}

async function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.warn('⚠️  Pasta therapeutic-data não encontrada:', SOURCE_DIR);
    fs.writeFileSync(INDEX_PATH, JSON.stringify({ files: [], count: 0, localOnly: true, timestamp: new Date().toISOString() }));
    return;
  }

  // Ensure destination dir exists
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
    console.log('📁 Criada pasta public/biblioteca/');
  }

  let allFiles;
  try {
    allFiles = fs.readdirSync(SOURCE_DIR);
  } catch(e) {
    console.error('Erro ao listar arquivos:', e.message);
    return;
  }

  // Group files by normalized base name to deduplicate (docx + pdf pairs)
  const byBase = {};
  for (const file of allFiles) {
    // Skip Windows temp files, hidden files, images, excel, etc.
    if (file.startsWith('~$')) continue;
    if (file.startsWith('.')) continue;
    const ext = path.extname(file).toLowerCase();
    if (!EXT_PRIORITY.includes(ext)) continue;

    const base = path.basename(file, ext).trim().toLowerCase();
    if (!byBase[base]) byBase[base] = [];
    byBase[base].push({ file, ext });
  }

  const index = [];
  let copied = 0;
  let skipped = 0;
  const errors = [];

  for (const [base, variants] of Object.entries(byBase)) {
    // Pick the best extension by priority
    variants.sort((a, b) => EXT_PRIORITY.indexOf(a.ext) - EXT_PRIORITY.indexOf(b.ext));
    const { file, ext } = variants[0];

    const srcPath = path.join(SOURCE_DIR, file);
    const safeFile = sanitizeFilename(file);
    const destPath = path.join(DEST_DIR, safeFile);

    // Copy if not already there (or if source is newer)
    let needsCopy = !fs.existsSync(destPath);
    if (!needsCopy) {
      try {
        const srcStat = fs.statSync(srcPath);
        const dstStat = fs.statSync(destPath);
        needsCopy = srcStat.mtimeMs > dstStat.mtimeMs;
      } catch(e) { needsCopy = true; }
    }

    if (needsCopy) {
      try {
        fs.copyFileSync(srcPath, destPath);
        copied++;
      } catch(e) {
        errors.push(`${file}: ${e.message}`);
        skipped++;
        continue;
      }
    }

    const originalBase = path.basename(file, ext);
    const cat = detectCategory(file);

    index.push({
      id: index.length + 1,
      title: formatTitle(originalBase),
      filename: safeFile,
      ext: ext.slice(1),
      category: cat.key,
      categoryLabel: cat.label,
      categoryColor: cat.color,
      url: '/biblioteca/' + safeFile.split('/').map(encodeURIComponent).join('/'),
    });
  }

  // Sort by category then title
  index.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.title.localeCompare(b.title, 'pt-BR');
  });

  // Reassign sequential IDs after sort
  index.forEach((item, i) => { item.id = i + 1; });

  const indexData = {
    files: index,
    count: index.length,
    localOnly: false,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(INDEX_PATH, JSON.stringify(indexData, null, 2), 'utf8');

  console.log(`✅ Biblioteca: ${index.length} documentos indexados`);
  if (copied > 0) console.log(`   📋 ${copied} arquivo(s) copiado(s) para public/biblioteca/`);
  if (skipped > 0) console.warn(`   ⚠️  ${skipped} arquivo(s) com erro`);
  if (errors.length > 0) errors.forEach(e => console.warn('  ', e));
}

main().catch(err => {
  console.error('Erro no setup-biblioteca:', err);
  // Write empty index so the app still starts
  try {
    fs.writeFileSync(INDEX_PATH, JSON.stringify({ files: [], count: 0, localOnly: true, timestamp: new Date().toISOString() }));
  } catch(_) {}
});
