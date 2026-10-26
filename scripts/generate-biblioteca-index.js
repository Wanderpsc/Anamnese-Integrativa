#!/usr/bin/env node
/**
 * generate-biblioteca-index.js
 * Gera APENAS o arquivo public/biblioteca-index.json com metadados
 * (títulos, categorias, extensões) — SEM copiar os arquivos para public/.
 * Usado pelo prebuild para que o catálogo de títulos apareça online.
 */

const fs   = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '..', 'src', 'assets', 'therapeutic-data');
const INDEX_PATH = path.join(__dirname, '..', 'public', 'biblioteca-index.json');

const EXT_PRIORITY = ['.pdf', '.docx', '.txt', '.rtf'];

const CATEGORIES = [
  { key: 'iridologia',    label: 'Iridologia',           keywords: ['iridolog','iris','rayid'] },
  { key: 'fitoterapia',   label: 'Fitoterapia',           keywords: ['fitoter','fitohorm','planta','erva','herb','raiz','semin','extrat','tintura','alcaloid'] },
  { key: 'homeopatia',    label: 'Homeopatia / Florais',  keywords: ['homeopat','floral','bach','biossiner','frequenc','vibrac','essenci'] },
  { key: 'nutricao',      label: 'Nutrição Funcional',    keywords: ['nutric','alimentar','aliment','dieta','dietoter','cardapio','receita','vitamina','mineral','proteina','fibra','suco','shot','kefir','organico','macrobio'] },
  { key: 'ortomolecular', label: 'Ortomolecular',         keywords: ['ortomol','suplementa','aminoacid','antioxid','coenzima','q10','magnesio','zinco','seleni','ferrit','bcaa','nac','nadh','ala ','5htp','seroton','dopamin'] },
  { key: 'exames',        label: 'Exames Laboratoriais',  keywords: ['exame','laborat','hemograma','bioquim','urina','sangue','ferrit','pcr','tsh','t3','t4','glicos','insulina','colest','triglice','hemato'] },
  { key: 'anamnese',      label: 'Anamnese / Avaliação',  keywords: ['anamnes','avaliaca','ficha','questionario','triagem','consulta'] },
  { key: 'biorresonancia',label: 'Biorressonância',        keywords: ['biorresson','bioresson','quantum','nls','qrma','energia','biocampo','aura','chakra'] },
  { key: 'manual',        label: 'Manuais / Apostilas',   keywords: ['apostila','manual','guia','curso','modulo','fundament','livro','ebook','e-book','artigo','revista','fascicul'] },
  { key: 'protocolos',    label: 'Protocolos Clínicos',   keywords: ['protocol','condut','terapeutic','tratament','formula','prescric','receituario','soroter','injetav'] },
];

const CAT_COLORS = {
  iridologia:'#7B1FA2', fitoterapia:'#388E3C', homeopatia:'#1976D2',
  nutricao:'#F57C00', ortomolecular:'#C62828', exames:'#0097A7',
  anamnese:'#5D4037', biorresonancia:'#6A1B9A', manual:'#37474F',
  protocolos:'#BF360C', outros:'#455A64',
};

function detectCategory(filename) {
  const n = filename.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  for (const cat of CATEGORIES) {
    if (cat.keywords.some(kw => n.includes(kw))) return cat;
  }
  return { key: 'outros', label: 'Outros' };
}

function formatTitle(basename) {
  return basename
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b([a-z])/g, (_, c) => c.toUpperCase())
    .trim();
}

function sanitizeFilename(name) {
  return name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_');
}

if (!fs.existsSync(SOURCE_DIR)) {
  console.warn('⚠️  therapeutic-data não encontrado — índice não gerado');
  process.exit(0);
}

let allFiles;
try { allFiles = fs.readdirSync(SOURCE_DIR); }
catch(e) { console.error('Erro ao listar source:', e.message); process.exit(0); }

const byBase = {};
for (const file of allFiles) {
  if (file.startsWith('~$') || file.startsWith('.')) continue;
  const ext = path.extname(file).toLowerCase();
  if (!EXT_PRIORITY.includes(ext)) continue;
  const base = path.basename(file, ext).trim().toLowerCase();
  if (!byBase[base]) byBase[base] = [];
  byBase[base].push({ file, ext });
}

const index = [];
for (const variants of Object.values(byBase)) {
  variants.sort((a, b) => EXT_PRIORITY.indexOf(a.ext) - EXT_PRIORITY.indexOf(b.ext));
  const { file, ext } = variants[0];
  const originalBase = path.basename(file, ext);
  const cat = detectCategory(file);
  const safeFile = sanitizeFilename(file);
  index.push({
    id: index.length + 1,
    title: formatTitle(originalBase),
    filename: safeFile,
    ext: ext.slice(1),
    category: cat.key,
    categoryLabel: cat.label,
    categoryColor: CAT_COLORS[cat.key] || CAT_COLORS.outros,
    url: '/biblioteca/' + safeFile.split('/').map(encodeURIComponent).join('/'),
  });
}

index.sort((a, b) => {
  if (a.category !== b.category) return a.category.localeCompare(b.category);
  return a.title.localeCompare(b.title, 'pt-BR');
});
index.forEach((item, i) => { item.id = i + 1; });

fs.writeFileSync(INDEX_PATH, JSON.stringify({ files: index, count: index.length, localOnly: false, timestamp: new Date().toISOString() }), 'utf8');
console.log(`📚 biblioteca-index.json gerado: ${index.length} títulos (apenas metadados, sem copiar arquivos)`);
