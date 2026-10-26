// Script para converter exames extraídos em formato de quintis
import TODOS_OS_EXAMES_COMPLETOS from './allExamsExtracted.js';

function converterParaQuintis(exame) {
  const resultado = {
    nome: exame.nome,
    categoria: exame.categoria,
    unidade: exame.unidade,
    funcao: exame.funcao,
    referencia: exame.referencia,
    ideal: exame.ideal,
    quintis: {},
    interpretacao: {},
    correlacoes: []
  };

  // Criar quintis para cada tipo de referência (homem, mulher, criança, geral)
  Object.keys(exame.referencia).forEach(tipo => {
    const ref = exame.referencia[tipo];
    const ideal = exame.ideal[tipo] || exame.ideal.geral || (ref.min + ref.max) / 2;
    
    // Calcular quintis baseados nos valores de referência
    const range = ref.max - ref.min;
    const step = range / 5;
    
    resultado.quintis[tipo] = {
      Q1: { min: 0, max: ref.min, nivel: "Muito Baixo", cor: "#f44336" },
      Q2: { min: ref.min, max: ref.min + step, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: ref.min + step, max: ref.max - step, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: ref.max - step, max: ref.max, nivel: "Normal-Alto", cor: "#ffc107" },
      Q5: { min: ref.max, max: 99999, nivel: "Elevado", cor: "#ff5722" }
    };
    
    // Interpretações
    resultado.interpretacao.Q1 = {
      significado: exame.interpretacao.baixo || "Valor abaixo do esperado",
      causas: [exame.interpretacao.baixo]
    };
    
    resultado.interpretacao.Q3 = {
      significado: "Valor ideal"
    };
    
    resultado.interpretacao.Q5 = {
      significado: exame.interpretacao.alto || "Valor acima do esperado",
      causas: [exame.interpretacao.alto]
    };
  });

  return resultado;
}

// Converter todos os exames
const examesConvertidos = {};
Object.keys(TODOS_OS_EXAMES_COMPLETOS).forEach(key => {
  examesConvertidos[key] = converterParaQuintis(TODOS_OS_EXAMES_COMPLETOS[key]);
});

console.log(`Total de exames convertidos: ${Object.keys(examesConvertidos).length}`);
console.log(JSON.stringify(examesConvertidos, null, 2));
