/**
 * SCRIPT DE INTEGRAÇÃO - Mescla todos os exames dos arquivos auxiliares
 * Executar: node src/config/integrateExams.js
 */

const fs = require('fs');
const path = require('path');

// Ler arquivo principal
const mainFile = path.join(__dirname, 'laboratoryExamsDatabase.js');
let mainContent = fs.readFileSync(mainFile, 'utf8');

// Importar dados dos arquivos auxiliares
const complete = require('./laboratoryExamsComplete.js');
const part2 = require('./laboratoryExamsPart2.js');
const part3 = require('./laboratoryExamsPart3.js');

// Preparar string de substituição para cada categoria vazia
const replacements = {
  'funcao_tireoidiana': JSON.stringify(complete.FUNCAO_TIREOIDIANA, null, 2).replace(/"(\w+)":/g, '$1:'),
  'diabetes_glicemia': JSON.stringify(complete.DIABETES_GLICEMIA, null, 2).replace(/"(\w+)":/g, '$1:'),
  'hormonios_sexuais': JSON.stringify(complete.HORMONIOS_SEXUAIS, null, 2).replace(/"(\w+)":/g, '$1:'),
  'vitaminas': JSON.stringify(complete.VITAMINAS, null, 2).replace(/"(\w+)":/g, '$1:'),
  'eletrolitos_minerais': JSON.stringify(part2.ELETROLITOS_MINERAIS, null, 2).replace(/"(\w+)":/g, '$1:'),
  'marcadores_cardiacos': JSON.stringify(part2.MARCADORES_CARDIACOS, null, 2).replace(/"(\w+)":/g, '$1:'),
  'coagulacao': JSON.stringify(part2.COAGULACAO, null, 2).replace(/"(\w+)":/g, '$1:'),
  'marcadores_tumorais': JSON.stringify(part3.MARCADORES_TUMORAIS, null, 2).replace(/"(\w+)":/g, '$1:'),
  'marcadores_inflamatorios': JSON.stringify(part3.MARCADORES_INFLAMATORIOS, null, 2).replace(/"(\w+)":/g, '$1:'),
  'urina_tipo_i': JSON.stringify(part3.URINA_TIPO_I, null, 2).replace(/"(\w+)":/g, '$1:'),
  'gasometria': JSON.stringify(part3.GASOMETRIA, null, 2).replace(/"(\w+)":/g, '$1:')
};

// Substituir placeholders vazios
Object.keys(replacements).forEach(category => {
  const placeholder = `LABORATORY_EXAMS.${category} = {\n  categoria: `;
  const endPlaceholder = `  exames: {} // Será preenchido`;
  
  const regex = new RegExp(`(LABORATORY_EXAMS\\.${category} = \\{[^}]+exames: )\\{\\}([^}]*\\})`, 's');
  
  if (regex.test(mainContent)) {
    mainContent = mainContent.replace(regex, `$1${replacements[category]}$2`);
    console.log(`✅ Categoria ${category} integrada`);
  }
});

// Salvar arquivo atualizado
fs.writeFileSync(mainFile, mainContent, 'utf8');
console.log('\n🎉 Integração completa! Todas as categorias foram mescladas.');
