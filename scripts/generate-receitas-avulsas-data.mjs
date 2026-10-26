/**
 * Prebuild script: extrai conteúdo HTML de todos os .docx em
 * src/assets/therapeutic-data/RECEITAS AVULSAS/ e salva em
 * src/data/receitasAvulsas.json para uso no componente ReceitasAvulsas.
 *
 * Imagens são descartadas para manter o JSON compacto.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mammoth from 'mammoth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const inputDir = path.join(projectRoot, 'src', 'assets', 'therapeutic-data', 'RECEITAS AVULSAS');
const outPath = path.join(projectRoot, 'src', 'data', 'receitasAvulsas.json');

function toId(filename) {
  return filename
    .replace(/\.docx$/i, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toDisplayName(filename) {
  return filename.replace(/\.docx$/i, '');
}

async function run() {
  console.log('📋 Gerando dados de Receitas Avulsas...');

  let entries;
  try {
    entries = await fs.readdir(inputDir, { withFileTypes: true });
  } catch (err) {
    console.error(`⚠️  Pasta não encontrada: ${inputDir}`);
    console.error('   Gerando arquivo vazio como fallback...');
    await fs.writeFile(outPath, '[]', 'utf8');
    return;
  }

  const docxFiles = entries
    .filter(e => e.isFile() && /\.docx$/i.test(e.name) && !e.name.startsWith('~$'))
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

  const results = [];
  let errors = 0;

  for (const entry of docxFiles) {
    const filePath = path.join(inputDir, entry.name);
    try {
      const buffer = await fs.readFile(filePath);
      const { value: rawHtml } = await mammoth.convertToHtml(
        { buffer },
        {
          // Descarta imagens — mantém apenas o texto/tabelas
          convertImage: mammoth.images.imgElement(() => Promise.resolve({ src: '' })),
        }
      );
      // Remove tags <img> vazias e limpa espaços extras
      const htmlContent = rawHtml
        .replace(/<img[^>]*src=""[^>]*\/?>/g, '')
        .replace(/<img[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      results.push({
        id: toId(entry.name),
        displayName: toDisplayName(entry.name),
        filename: entry.name,
        htmlContent,
      });
      process.stdout.write('.');
    } catch (err) {
      console.error(`\n⚠️  Erro ao processar "${entry.name}": ${err.message}`);
      errors++;
      results.push({
        id: toId(entry.name),
        displayName: toDisplayName(entry.name),
        filename: entry.name,
        htmlContent: `<p><em>Conteúdo não disponível para este arquivo.</em></p>`,
      });
    }
  }

  await fs.writeFile(outPath, JSON.stringify(results), 'utf8');

  const stat = await fs.stat(outPath);
  const sizeMB = (stat.size / 1024 / 1024).toFixed(2);

  console.log(`\n✅ ${results.length} receitas processadas (${errors} com erro). Arquivo: ${sizeMB} MB`);
  console.log(`   → ${outPath}`);
}

run().catch(err => {
  console.error('Falha no script de receitas:', err);
  process.exit(1);
});
