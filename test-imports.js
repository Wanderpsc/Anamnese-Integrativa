// Script de teste para verificar se as importações estão funcionando

try {
  console.log('Testando importação de EXPANDED_PHYTOTHERAPY_DATABASE...');
  const { EXPANDED_PHYTOTHERAPY_DATABASE } = require('./src/data/expandedPhytotherapyDatabase.js');
  console.log('✓ EXPANDED_PHYTOTHERAPY_DATABASE importado com sucesso');
  console.log('Número de protocolos:', Object.keys(EXPANDED_PHYTOTHERAPY_DATABASE).length);
} catch (error) {
  console.error('✗ Erro ao importar EXPANDED_PHYTOTHERAPY_DATABASE:', error.message);
}

try {
  console.log('\nTestando importação de phytotherapySpreadsheetData...');
  const { getAllSymptoms, convertSpreadsheetToProtocol } = require('./src/data/phytotherapySpreadsheetData.js');
  console.log('✓ Funções importadas com sucesso');
  
  console.log('\nTestando getAllSymptoms()...');
  const symptoms = getAllSymptoms();
  console.log('Número de sintomas:', symptoms.length);
  console.log('Primeiros 5 sintomas:', symptoms.slice(0, 5));
  
  console.log('\nTestando convertSpreadsheetToProtocol()...');
  const protocol = convertSpreadsheetToProtocol(symptoms[0]);
  console.log('Protocolo para', symptoms[0], ':', protocol ? '✓ Criado' : '✗ Falhou');
} catch (error) {
  console.error('✗ Erro ao importar phytotherapySpreadsheetData:', error.message);
}

try {
  console.log('\nTestando importação de MEDICINAL_PLANTS...');
  const MEDICINAL_PLANTS = require('./src/data/medicinalPlants.js').default;
  console.log('✓ MEDICINAL_PLANTS importado com sucesso');
  console.log('Número de plantas:', Object.keys(MEDICINAL_PLANTS).length);
} catch (error) {
  console.error('✗ Erro ao importar MEDICINAL_PLANTS:', error.message);
}

console.log('\n=== Teste de importações concluído ===');
