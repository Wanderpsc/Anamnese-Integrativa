// Script de teste para verificar importação
try {
  console.log('Tentando importar laboratoryExamsComplete...');
  const exams = require('./src/data/laboratoryExamsComplete.js');
  console.log('✅ Importação bem-sucedida!');
  console.log('Exames disponíveis:', Object.keys(exams.default || exams).length);
  
  // Verificar se exames lipídicos existem
  const merged = exams.default || exams;
  const lipidExams = ['colesterolTotal', 'ldl', 'hdl', 'vldl', 'triglicerideos'];
  console.log('\nVerificando exames lipídicos:');
  lipidExams.forEach(exam => {
    if (merged[exam]) {
      console.log(`✅ ${exam} encontrado`);
    } else {
      console.log(`❌ ${exam} NÃO encontrado`);
    }
  });
} catch (error) {
  console.error('❌ Erro na importação:', error.message);
  console.error(error.stack);
}
