import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const dataDir = path.join(projectRoot, 'src', 'assets', 'therapeutic-data');
const outPath = path.join(projectRoot, 'src', 'data', 'therapeuticPdfKnowledgeIndex.json');
const standardFontDataUrl = `${path.join(projectRoot, 'node_modules', 'pdfjs-dist', 'standard_fonts').replace(/\\/g, '/')}/`;
const extractAllPages = process.env.FULL_THERAPEUTIC_INDEX === '1';

const KEYWORDS = [
  'iridologia',
  'iris',
  'rayid',
  'biorresson',
  'bioresson',
  'floral',
  'fitoterapia',
  'fitoterap',
  'fitohormon',
  'naturopatia',
  'ortomolecular',
  'homeopat',
  'nutraceut',
  'suplementa',
  'soroterapia',
  'substancias',
  'imuno',
  'laxogenina',
  'formula',
  'vitamina',
  'mineral',
  'proteina',
  'lindomar',
  'felipe',
  'gerson',
  'maria rocha',
  'luciana caxito',
  'lair ribeiro',
  'nilo cairo',
  'ief',
  'transfer'
];

const AUTHOR_HINTS = [
  'Lindomar',
  'Dr. Felipe',
  'Gerson Cunha',
  'Maria Rocha',
  'Luciana Caxito',
  'Lair Ribeiro',
  'Dr. Nilo Cairo',
  'IEF'
];

function normalize(str) {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function inferTags(name) {
  const n = normalize(name);
  return KEYWORDS.filter((kw) => n.includes(normalize(kw)));
}

function inferAuthors(name) {
  const n = normalize(name);
  return AUTHOR_HINTS.filter((author) => n.includes(normalize(author)));
}

function relevanceScore(fileName, extractedText = '') {
  const hay = `${normalize(fileName)} ${normalize(extractedText)}`;
  let score = 0;
  for (const kw of KEYWORDS) {
    if (hay.includes(normalize(kw))) score += 1;
  }
  return score;
}

async function maybeExtractText(pdfPath) {
  try {
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    const bin = await fs.readFile(pdfPath);
    const loadingTask = pdfjs.getDocument({
      data: new Uint8Array(bin),
      useWorker: false,
      standardFontDataUrl,
      stopAtErrors: false,
      disableFontFace: true
    });
    const doc = await loadingTask.promise;
    let fullText = '';

    const maxPages = extractAllPages ? doc.numPages : Math.min(doc.numPages, 2);
    for (let pageNumber = 1; pageNumber <= maxPages; pageNumber += 1) {
      const page = await doc.getPage(pageNumber);
      const content = await page.getTextContent();
      const line = content.items?.map((item) => item.str || '').join(' ') || '';
      fullText += `\n${line}`;
    }

    const text = fullText.replace(/\s+/g, ' ').trim();
    if (!text) return { excerpt: '', extracted: false, pagesExtracted: doc.numPages };

    const excerpt = text.slice(0, 2400);
    return { excerpt, extracted: true, pagesExtracted: doc.numPages };
  } catch {
    return { excerpt: '', extracted: false, pagesExtracted: 0 };
  }
}

const knowledgeBaseDir = path.join(projectRoot, 'public', 'base-conhecimento');

async function loadKnowledgeBaseItems() {
  try {
    const kbIndex = JSON.parse(await fs.readFile(path.join(knowledgeBaseDir, 'index.json'), 'utf-8'));
    const items = [];
    for (const doc of kbIndex.documentos || []) {
      let excerpt = '';
      let pages = 0;
      try {
        const docJson = JSON.parse(
          await fs.readFile(path.join(knowledgeBaseDir, 'documentos', `${doc.id}.json`), 'utf-8')
        );
        excerpt = (docJson.secoes || [])
          .map((s) => s.texto)
          .join('\n')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 1600);
        pages = docJson.paginas || 0;
      } catch {
        excerpt = '';
      }
      const label = `${doc.titulo} ${doc.fonte || ''}`;
      items.push({
        fileName: doc.fonte || doc.titulo,
        relativePath: `base-conhecimento/documentos/${doc.id}.json`,
        tags: [...new Set([doc.categoria, ...inferTags(label)])].filter(Boolean),
        authors: inferAuthors(label),
        relevanceScore: relevanceScore(label, excerpt),
        textExtracted: excerpt.length > 0,
        pagesExtracted: pages,
        excerpt,
        sourceType: 'base-conhecimento',
        categoria: doc.categoria,
        docId: doc.id
      });
    }
    return items;
  } catch (error) {
    console.warn('⚠️ base-conhecimento não encontrada em public/, seguindo só com PDFs:', error.message);
    return [];
  }
}

async function buildIndex() {
  const files = await fs.readdir(dataDir);
  const pdfFiles = files.filter((name) => name.toLowerCase().endsWith('.pdf'));

  const items = [];
  for (const fileName of pdfFiles) {
    const tags = inferTags(fileName);
    const fullPath = path.join(dataDir, fileName);
    const shouldExtract = extractAllPages || tags.length > 0;
    const { excerpt, extracted, pagesExtracted } = shouldExtract
      ? await maybeExtractText(fullPath)
      : { excerpt: '', extracted: false, pagesExtracted: 0 };
    const score = relevanceScore(fileName, excerpt);

    items.push({
      fileName,
      relativePath: `src/assets/therapeutic-data/${fileName}`,
      tags,
      authors: inferAuthors(fileName),
      relevanceScore: score,
      textExtracted: extracted,
      pagesExtracted,
      excerpt
    });
  }

  const knowledgeBaseItems = await loadKnowledgeBaseItems();
  items.push(...knowledgeBaseItems);

  items.sort((a, b) => b.relevanceScore - a.relevanceScore || a.fileName.localeCompare(b.fileName, 'pt-BR'));

  const payload = {
    generatedAt: new Date().toISOString(),
    baseDirectory: 'src/assets/therapeutic-data',
    knowledgeBaseDirectory: 'public/base-conhecimento',
    keywordStrategy: KEYWORDS,
    totalIndexedPdfs: items.length,
    totalPdfFiles: pdfFiles.length,
    totalKnowledgeBaseDocs: knowledgeBaseItems.length,
    fullExtraction: extractAllPages,
    items
  };

  await fs.writeFile(outPath, JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`✅ Índice de PDFs terapêuticos gerado: ${outPath}`);
  console.log(`📚 Total indexado: ${items.length} itens (${pdfFiles.length} PDFs + ${knowledgeBaseItems.length} docs da base-conhecimento)`);
}

buildIndex().catch((error) => {
  console.error('❌ Falha ao gerar índice de PDFs terapêuticos:', error);
  process.exit(1);
});
