/**
 * Dados completos de exames laboratoriais baseados no PDF "4 da página 242 à 424"
 * Fonte: Guia dos Exames Laboratoriais - Medicina Funcional Integrativa
 * Data de extração: 30/01/2026
 */

// Importar dados do JSON extraído
import examesCompletosJSON from './exames_completos.json';

// Mapear dados para estrutura usada no componente
export const examesAtualizados = examesCompletosJSON.exames.map((exame, index) => ({
  id: exame.id,
  exame: exame.nome,
  categoria: exame.categoria,
  
  // Valores de referência - adaptar para estrutura do componente
  valoresReferencia: formatarValoresReferencia(exame.valoresReferencia),
  valoresIdeais: formatarValoresIdeais(exame.valoresIdeais),
  
  // Dados detalhados do PDF
  fisiologia: exame.fisiologia,
  alteracoes: exame.alteracoes,
  correlacoes: exame.correlacoes || [],
  analiseTemporal: exame.analiseTemporal || '',
  
  // Campos do componente
  resultadoPaciente: "",
  interpretacao: "",
  conduta: "",
  observacoes: gerarObservacoesFormatadas(exame),
  
  // Unidades
  unidade: extrairUnidade(exame.valoresReferencia),
  unidadesDisponiveis: getUnidadesDisponiveis(exame.nome),
  unidadeSelecionada: extrairUnidade(exame.valoresReferencia)
}));

function formatarValoresReferencia(valores) {
  if (!valores) return "";
  
  // Se tem separação por gênero
  if (valores.masculino && valores.feminino) {
    const masMin = valores.masculino.min !== undefined ? valores.masculino.min : '';
    const masMax = valores.masculino.max !== undefined ? valores.masculino.max : '';
    const femMin = valores.feminino.min !== undefined ? valores.feminino.min : '';
    const femMax = valores.feminino.max !== undefined ? valores.feminino.max : '';
    const unidade = valores.masculino.unidade || valores.feminino.unidade || '';
    
    if (masMin && masMax && femMin && femMax) {
      return {
        masculinoAdulto: { min: masMin, max: masMax },
        femininoAdulto: { min: femMin, max: femMax },
        masculinoInfantil: { min: masMin, max: masMax },
        femininoInfantil: { min: femMin, max: femMax }
      };
    }
  }
  
  // Se tem valores gerais
  if (valores.geral) {
    const min = valores.geral.min;
    const max = valores.geral.max;
    const valor = valores.geral.valor;
    
    if (valor !== undefined) {
      return `${valor} ${valores.geral.unidade || ''}`;
    }
    if (min !== undefined && max !== undefined) {
      return `${min}-${max} ${valores.geral.unidade || ''}`;
    }
  }
  
  // Se tem apenas valor único
  if (valores.adultos || valores.criancas || valores.idosos) {
    const v = valores.adultos || valores.criancas || valores.idosos;
    if (v.valor !== undefined) {
      return `${v.valor} ${v.unidade || ''}`;
    }
    if (v.min !== undefined && v.max !== undefined) {
      return `${v.min}-${v.max} ${v.unidade || ''}`;
    }
    if (v.max !== undefined) {
      return `<${v.max} ${v.unidade || ''}`;
    }
  }
  
  return "";
}

function formatarValoresIdeais(valores) {
  if (!valores) return "";
  
  // Se tem separação por gênero
  if (valores.masculino && valores.feminino) {
    const masMin = valores.masculino.min !== undefined ? valores.masculino.min : valores.masculino.valor;
    const masMax = valores.masculino.max !== undefined ? valores.masculino.max : valores.masculino.valor;
    const femMin = valores.feminino.min !== undefined ? valores.feminino.min : valores.feminino.valor;
    const femMax = valores.feminino.max !== undefined ? valores.feminino.max : valores.feminino.valor;
    
    if (masMin !== undefined && femMin !== undefined) {
      return {
        masculinoAdulto: { min: masMin, max: masMax || masMin },
        femininoAdulto: { min: femMin, max: femMax || femMin },
        masculinoInfantil: { min: masMin, max: masMax || masMin },
        femininoInfantil: { min: femMin, max: femMax || femMin }
      };
    }
  }
  
  // Se tem valores gerais
  if (valores.geral) {
    const min = valores.geral.min;
    const max = valores.geral.max;
    const valor = valores.geral.valor;
    
    if (valor !== undefined) {
      return `${valor} ${valores.geral.unidade || ''}`;
    }
    if (min !== undefined && max !== undefined) {
      return `${min}-${max} ${valores.geral.unidade || ''}`;
    }
  }
  
  // Outros casos
  if (valores.adultos) {
    const v = valores.adultos;
    if (v.valor !== undefined) return `${v.valor} ${v.unidade || ''}`;
    if (v.min !== undefined && v.max !== undefined) return `${v.min}-${v.max} ${v.unidade || ''}`;
    if (v.max !== undefined) return `<${v.max} ${v.unidade || ''}`;
  }
  
  return "";
}

function extrairUnidade(valoresRef) {
  if (!valoresRef) return "";
  
  if (valoresRef.masculino && valoresRef.masculino.unidade) {
    return valoresRef.masculino.unidade;
  }
  if (valoresRef.feminino && valoresRef.feminino.unidade) {
    return valoresRef.feminino.unidade;
  }
  if (valoresRef.geral && valoresRef.geral.unidade) {
    return valoresRef.geral.unidade;
  }
  if (valoresRef.adultos && valoresRef.adultos.unidade) {
    return valoresRef.adultos.unidade;
  }
  
  return "";
}

function getUnidadesDisponiveis(nomeExame) {
  const nome = nomeExame.toLowerCase();
  
  // Mapear unidades alternativas por tipo de exame
  const mapaUnidades = {
    'hemácias': ['/mm³', 'milhões/mm³', 'x10⁶/µL'],
    'hemoglobina': ['g/dL', 'g/L'],
    'hematócrito': ['%'],
    'leucócitos': ['/mm³', 'mil/mm³', 'x10³/µL'],
    'plaquetas': ['/mm³', 'mil/mm³', 'x10³/µL'],
    'glicemia': ['mg/dL', 'mmol/L'],
    'colesterol': ['mg/dL', 'mmol/L'],
    'triglicérides': ['mg/dL', 'mmol/L'],
    'tsh': ['mUI/L', 'μUI/mL'],
    't3': ['pg/mL', 'pmol/L'],
    't4': ['ng/dL', 'pmol/L'],
    'ferritina': ['ng/mL', 'µg/L', 'pmol/L'],
    'vitamina d': ['ng/mL', 'nmol/L'],
    'vitamina b12': ['pg/mL', 'pmol/L'],
    'creatinina': ['mg/dL', 'µmol/L'],
    'ureia': ['mg/dL', 'mmol/L'],
    'ácido úrico': ['mg/dL', 'µmol/L'],
    'vcm': ['fL'],
    'hcm': ['pg'],
    'chcm': ['g/dL'],
    'rdw': ['%'],
    'homocisteína': ['μmol/L', 'pmol/L']
  };
  
  for (const [chave, unidades] of Object.entries(mapaUnidades)) {
    if (nome.includes(chave)) {
      return unidades;
    }
  }
  
  return [''];
}

function gerarObservacoesFormatadas(exame) {
  let obs = [];
  
  // Adicionar fisiologia resumida
  if (exame.fisiologia) {
    obs.push(`📖 ${exame.fisiologia.substring(0, 200)}${exame.fisiologia.length > 200 ? '...' : ''}`);
  }
  
  // Adicionar alterações principais
  if (exame.alteracoes) {
    if (exame.alteracoes.alto && exame.alteracoes.alto.length > 0) {
      obs.push(`⬆️ ALTO: ${exame.alteracoes.alto.slice(0, 2).join(', ')}`);
    }
    if (exame.alteracoes.baixo && exame.alteracoes.baixo.length > 0) {
      obs.push(`⬇️ BAIXO: ${exame.alteracoes.baixo.slice(0, 2).join(', ')}`);
    }
    if (exame.alteracoes.elevado && exame.alteracoes.elevado.length > 0) {
      obs.push(`⬆️ ELEVADO: ${exame.alteracoes.elevado.slice(0, 2).join(', ')}`);
    }
    if (exame.alteracoes.reduzido && exame.alteracoes.reduzido.length > 0) {
      obs.push(`⬇️ REDUZIDO: ${exame.alteracoes.reduzido.slice(0, 2).join(', ')}`);
    }
  }
  
  // Adicionar correlação principal
  if (exame.correlacoes && exame.correlacoes.length > 0) {
    obs.push(`🔗 CORRELAÇÃO: ${exame.correlacoes[0].substring(0, 150)}${exame.correlacoes[0].length > 150 ? '...' : ''}`);
  }
  
  return obs.join('\n\n');
}

// Função para obter detalhes completos de um exame
export function getExameDetalhes(nomeExame) {
  const exame = examesCompletosJSON.exames.find(e => 
    e.nome.toLowerCase().includes(nomeExame.toLowerCase()) ||
    nomeExame.toLowerCase().includes(e.nome.toLowerCase())
  );
  
  if (!exame) return null;
  
  return {
    nome: exame.nome,
    categoria: exame.categoria,
    fisiologia: exame.fisiologia,
    alteracoes: exame.alteracoes,
    correlacoes: exame.correlacoes || [],
    analiseTemporal: exame.analiseTemporal || ''
  };
}

// Função para buscar correlações entre exames
export function buscarCorrelacoes(examesPreenchidos) {
  const correlacoesEncontradas = [];
  
  examesPreenchidos.forEach(examePrincipal => {
    const detalhes = getExameDetalhes(examePrincipal.exame);
    if (!detalhes || !detalhes.correlacoes) return;
    
    detalhes.correlacoes.forEach(correlacao => {
      // Verificar se os exames da correlação estão preenchidos
      const examesNaCorrelacao = examesPreenchidos.filter(e => 
        correlacao.toLowerCase().includes(e.exame.toLowerCase())
      );
      
      if (examesNaCorrelacao.length >= 2) {
        correlacoesEncontradas.push({
          descricao: correlacao,
          examesEnvolvidos: examesNaCorrelacao.map(e => e.exame),
          interpretacao: interpretarCorrelacao(correlacao, examesNaCorrelacao)
        });
      }
    });
  });
  
  return correlacoesEncontradas;
}

function interpretarCorrelacao(correlacao, exames) {
  // Analisar se a correlação se aplica aos resultados atuais
  // Esta é uma interpretação simplificada - pode ser expandida
  const temAlto = exames.some(e => e.interpretacao && e.interpretacao.includes('ALTO'));
  const temBaixo = exames.some(e => e.interpretacao && e.interpretacao.includes('BAIXO'));
  
  if (temAlto && correlacao.includes('elevad')) {
    return '✅ Esta correlação se aplica aos resultados atuais';
  }
  if (temBaixo && correlacao.includes('baix')) {
    return '✅ Esta correlação se aplica aos resultados atuais';
  }
  
  return '⚠️ Verificar se esta correlação se aplica ao contexto clínico';
}

export default examesAtualizados;
