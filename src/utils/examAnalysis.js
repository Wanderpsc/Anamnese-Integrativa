/**
 * Análise Avançada de Exames Laboratoriais
 * - Comparação com valores ideais
 * - Identificação de valores críticos
 * - Análise integrada de múltiplos exames
 * - Sugestões de tratamento
 */

/**
 * Calcula desvio percentual do valor ideal
 */
export function calcularDesvioIdeal(valor, ideal, unidade) {
  if (!ideal || !valor) return null;

  // Se ideal é um range (ex: "50-70"), pega o meio
  let idealNum;
  if (typeof ideal === 'string' && ideal.includes('-')) {
    const [min, max] = ideal.split('-').map(v => parseFloat(v));
    idealNum = (min + max) / 2;
  } else {
    idealNum = parseFloat(ideal);
  }

  if (isNaN(idealNum) || idealNum === 0) return null;

  const desvio = ((valor - idealNum) / idealNum) * 100;
  return {
    desvio: desvio.toFixed(1),
    percentual: Math.abs(desvio).toFixed(1),
    direcao: desvio > 0 ? 'acima' : 'abaixo',
    valorIdeal: idealNum
  };
}

/**
 * Classifica severidade do desvio
 */
export function classificarSeveridade(desvioPercentual) {
  const abs = Math.abs(parseFloat(desvioPercentual));
  
  if (abs < 10) return { nivel: 'leve', cor: '#ff9800', label: 'Desvio Leve' };
  if (abs < 25) return { nivel: 'moderado', cor: '#ff5722', label: 'Desvio Moderado' };
  if (abs < 50) return { nivel: 'grave', cor: '#d32f2f', label: 'Desvio Grave' };
  return { nivel: 'critico', cor: '#b71c1c', label: '⚠️ CRÍTICO' };
}

/**
 * Identifica valores críticos que requerem atenção imediata
 */
export function identificarValoresCriticos(resultados, interpretacoes) {
  const criticos = [];

  // Valores que indicam EMERGÊNCIA MÉDICA
  const criteriosCriticos = {
    // Hemograma
    'hemograma.hemoglobina': { baixo: 7, alto: 20, urgencia: 'alta' },
    'hemograma.plaquetas': { baixo: 20000, alto: 1000000, urgencia: 'alta' },
    'hemograma.leucocitos': { baixo: 1000, alto: 50000, urgencia: 'alta' },
    'hemograma.segmentados': { baixo: 500, urgencia: 'alta' }, // Neutropenia grave
    'hemograma.promielocitos': { alto: 1, urgencia: 'critica' }, // Qualquer valor = crítico
    'hemograma.mielocitos': { alto: 5, urgencia: 'alta' },
    
    // Bioquímica
    'bioquimica.glicemia_jejum': { baixo: 50, alto: 300, urgencia: 'alta' },
    'bioquimica.creatinina': { alto: 3.0, urgencia: 'alta' },
    'bioquimica.ureia': { alto: 150, urgencia: 'alta' },
    
    // Eletrólitos
    'eletrolitos.potassio': { baixo: 2.5, alto: 6.0, urgencia: 'critica' },
    'eletrolitos.sodio': { baixo: 120, alto: 160, urgencia: 'critica' },
    
    // Hepático
    'hepatico.bilirrubina_total': { alto: 10, urgencia: 'alta' },
    
    // Cardíacos
    'marcadores_cardiacos.troponina_i': { alto: 0.04, urgencia: 'critica' },
    
    // Coagulação
    'coagulacao.d_dimero': { alto: 2000, urgencia: 'alta' },
    
    // Inflamatórios
    'inflamatorios.pcr': { alto: 50, urgencia: 'moderada' }
  };

  Object.entries(resultados).forEach(([categoria, exames]) => {
    Object.entries(exames).forEach(([exameId, valor]) => {
      const chave = `${categoria}.${exameId}`;
      const criterio = criteriosCriticos[chave];
      const interpretacao = interpretacoes[categoria]?.[exameId];
      
      if (!criterio || !valor) return;

      const valorNum = parseFloat(valor);
      let isCritico = false;
      let motivo = '';

      if (criterio.baixo && valorNum < criterio.baixo) {
        isCritico = true;
        motivo = `Valor muito abaixo do seguro (${valorNum} < ${criterio.baixo})`;
      } else if (criterio.alto && valorNum > criterio.alto) {
        isCritico = true;
        motivo = `Valor muito acima do seguro (${valorNum} > ${criterio.alto})`;
      }

      if (isCritico) {
        criticos.push({
          categoria,
          exameId,
          exame: interpretacao?.nome || exameId,
          valor: valorNum,
          unidade: interpretacao?.unidade || '',
          motivo,
          urgencia: criterio.urgencia,
          interpretacao: interpretacao?.interpretacao,
          acaoImediata: getAcaoImediata(categoria, exameId, valorNum, criterio)
        });
      }
    });
  });

  // Ordenar por urgência
  const ordemUrgencia = { critica: 0, alta: 1, moderada: 2 };
  criticos.sort((a, b) => ordemUrgencia[a.urgencia] - ordemUrgencia[b.urgencia]);

  return criticos;
}

/**
 * Define ação imediata para valor crítico
 */
function getAcaoImediata(categoria, exameId, valor, criterio) {
  const acoes = {
    'hemograma.hemoglobina': valor < 7 ? 'URGÊNCIA: Transfusão sanguínea pode ser necessária' : 'Investigar causa e considerar tratamento',
    'hemograma.plaquetas': valor < 20000 ? 'URGÊNCIA: Risco grave de sangramento' : 'Investigar e monitorar',
    'hemograma.promielocitos': 'URGÊNCIA: Investigação hematológica imediata - possível leucemia',
    'eletrolitos.potassio': 'EMERGÊNCIA CARDÍACA: ECG imediato e correção urgente',
    'eletrolitos.sodio': 'EMERGÊNCIA: Correção lenta e monitorizada em ambiente hospitalar',
    'marcadores_cardiacos.troponina_i': 'EMERGÊNCIA: IAM - Protocolo de dor torácica e cardiologista AGORA',
    'bioquimica.glicemia_jejum': valor < 50 ? 'URGÊNCIA: Administrar glicose' : 'Controle glicêmico urgente',
    'hemograma.segmentados': 'URGÊNCIA: Neutropenia grave - risco de sepse'
  };

  const chave = `${categoria}.${exameId}`;
  return acoes[chave] || 'Avaliação médica urgente necessária';
}

/**
 * Análise integrada de múltiplos exames
 * Identifica padrões clínicos e correlações
 */
export function analisarPadroesClinicos(resultados, interpretacoes) {
  const padroes = [];

  // Padrão 1: ANEMIA FERROPRIVA
  const hb = parseFloat(resultados.hemograma?.hemoglobina);
  const ferritina = parseFloat(resultados.vitaminas_minerais?.ferritina);
  if (hb < 12 && ferritina < 30) {
    padroes.push({
      padrao: 'Anemia Ferropriva',
      severidade: 'alta',
      examesEnvolvidos: ['Hemoglobina', 'Ferritina'],
      descricao: 'Anemia por deficiência de ferro confirmada',
      tratamento: [
        '🔴 PROTOCOLO DE ANEMIA FERROPRIVA:',
        '• Ferro quelato 60mg/dia + Vitamina C 500mg',
        '• Alimentos ricos em ferro: carnes vermelhas, fígado, feijão',
        '• Evitar café/chá nas refeições',
        '• Investigar causa da perda (sangramento oculto)',
        '• Reavaliar hemograma e ferritina em 3 meses',
        '• Meta: Ferritina >70 ng/mL, Hemoglobina >12 g/dL'
      ],
      prioridade: 1
    });
  }

  // Padrão 2: SÍNDROME METABÓLICA
  const glicemia = parseFloat(resultados.bioquimica?.glicemia_jejum);
  const triglicerides = parseFloat(resultados.lipidico?.triglicerides);
  const hdl = parseFloat(resultados.lipidico?.hdl);
  const componentes = [];
  
  if (glicemia >= 100) componentes.push('Glicemia elevada');
  if (triglicerides >= 150) componentes.push('Triglicerídeos altos');
  if (hdl < 40) componentes.push('HDL baixo');

  if (componentes.length >= 2) {
    padroes.push({
      padrao: 'Síndrome Metabólica',
      severidade: 'alta',
      examesEnvolvidos: componentes,
      descricao: `Critérios presentes (${componentes.length}/5): ${componentes.join(', ')}`,
      tratamento: [
        '🔴 PROTOCOLO SÍNDROME METABÓLICA:',
        '• Dieta LOW CARB (reduzir carboidratos <100g/dia)',
        '• Exercícios 150min/semana (aeróbico + força)',
        '• Perda de peso 5-10% do peso corporal',
        '• Berberina 500mg 3x/dia (sensibilizador insulínico)',
        '• Ômega-3 2-3g/dia (EPA/DHA)',
        '• Magnésio 400mg/dia',
        '• Cromo picolinato 200mcg/dia',
        '• Considerar Metformina 500-1000mg/dia',
        '• Controle de pressão arterial',
        '• Meta: Glicemia <100, TG <150, HDL >40'
      ],
      prioridade: 1
    });
  }

  // Padrão 3: HIPOTIREOIDISMO
  const tsh = parseFloat(resultados.tireoide?.tsh);
  const t4 = parseFloat(resultados.tireoide?.t4_livre);
  if (tsh > 4.0 || (tsh > 2.5 && t4 < 1.0)) {
    padroes.push({
      padrao: 'Hipotireoidismo',
      severidade: tsh > 10 ? 'alta' : 'moderada',
      examesEnvolvidos: ['TSH', 'T4 Livre'],
      descricao: tsh > 10 ? 'Hipotireoidismo clínico' : 'Hipotireoidismo subclínico',
      tratamento: [
        '🔵 PROTOCOLO HIPOTIREOIDISMO:',
        tsh > 4.0 ? '• Levotiroxina (puran T4) - dose conforme TSH e peso' : '• Observação ou tratamento se sintomático',
        '• Selênio 200mcg/dia (cofator enzima deiodinase)',
        '• Iodo 150-300mcg/dia (se deficiente)',
        '• Zinco 30mg/dia',
        '• Vitamina D >50 ng/mL',
        '• Evitar soja crua (interfere absorção T4)',
        '• Tomar T4 em jejum, 30min antes café',
        '• Dosar Anti-TPO (investigar Hashimoto)',
        '• Reavaliar TSH e T4 em 6-8 semanas',
        '• Meta: TSH 1.0-2.5 μUI/mL'
      ],
      prioridade: tsh > 10 ? 1 : 2
    });
  }

  // Padrão 4: INFECÇÃO/INFLAMAÇÃO ATIVA
  const leucocitos = parseFloat(resultados.hemograma?.leucocitos);
  const segmentados = parseFloat(resultados.hemograma?.segmentados);
  const bastonetes = parseFloat(resultados.hemograma?.bastonetes);
  const pcr = parseFloat(resultados.inflamatorios?.pcr);

  if ((leucocitos > 11000 && segmentados > 70) || bastonetes > 5 || pcr > 10) {
    padroes.push({
      padrao: 'Processo Infeccioso/Inflamatório Ativo',
      severidade: pcr > 50 || leucocitos > 20000 ? 'alta' : 'moderada',
      examesEnvolvidos: ['Leucócitos', 'Segmentados', 'Bastonetes', 'PCR'],
      descricao: 'Resposta inflamatória ou infecciosa em curso',
      tratamento: [
        '🟡 INVESTIGAÇÃO E CONDUTA:',
        '• Investigar foco infeccioso (exame físico completo)',
        '• Culturas se febre ou sintomas',
        '• Hemoculturas se suspeita de sepse',
        '• Radiografia de tórax se sintomas respiratórios',
        '• Urina I e urocultura',
        '• Antibioticoterapia empírica se infecção grave',
        '• Anti-inflamatórios se indicado',
        '• Ômega-3 2-3g/dia (anti-inflamatório)',
        '• Curcumina 1g/dia',
        '• Repetir hemograma e PCR em 7-14 dias'
      ],
      prioridade: pcr > 50 ? 1 : 2
    });
  }

  // Padrão 5: DISFUNÇÃO HEPÁTICA
  const tgo = parseFloat(resultados.hepatico?.tgo_ast);
  const tgp = parseFloat(resultados.hepatico?.tgp_alt);
  const ggt = parseFloat(resultados.hepatico?.ggt);

  if (tgp > 40 || tgo > 40 || ggt > 50) {
    const relacaoTGOTGP = tgo / tgp;
    padroes.push({
      padrao: relacaoTGOTGP > 2 ? 'Hepatopatia Alcoólica' : 'Esteatose Hepática',
      severidade: tgp > 100 ? 'alta' : 'moderada',
      examesEnvolvidos: ['TGO', 'TGP', 'GGT'],
      descricao: relacaoTGOTGP > 2 ? 'Padrão sugestivo de doença hepática alcoólica' : 'Padrão sugestivo de esteatose hepática não alcoólica',
      tratamento: [
        '🟢 PROTOCOLO PROTEÇÃO HEPÁTICA:',
        relacaoTGOTGP > 2 ? '• CESSAR ÁLCOOL COMPLETAMENTE' : '• Perda de peso 7-10%',
        '• Dieta anti-inflamatória (mediterrânea ou low-carb)',
        '• Silimarina (cardo mariano) 420mg/dia (140mg 3x)',
        '• SAME (S-adenosilmetionina) 400mg 2x/dia',
        '• N-acetilcisteína 600mg 2x/dia',
        '• Vitamina E 800 UI/dia (se NASH)',
        '• Ômega-3 2-3g/dia',
        '• Exercícios físicos regulares',
        '• Evitar hepatotóxicos (paracetamol em excesso)',
        '• USG abdômen superior',
        '• Repetir enzimas hepáticas em 3 meses',
        '• Meta: TGO e TGP <40 U/L'
      ],
      prioridade: tgp > 100 ? 1 : 2
    });
  }

  // Padrão 6: RISCO CARDIOVASCULAR ELEVADO
  const ldl = parseFloat(resultados.lipidico?.ldl);
  const colesterol = parseFloat(resultados.lipidico?.colesterol_total);
  const pcrUltra = parseFloat(resultados.marcadores_inflamatorios?.pcr_ultrassensivel);

  if (ldl > 130 || colesterol > 240 || pcrUltra > 3) {
    padroes.push({
      padrao: 'Risco Cardiovascular Elevado',
      severidade: ldl > 190 || pcrUltra > 10 ? 'alta' : 'moderada',
      examesEnvolvidos: ['LDL', 'Colesterol Total', 'PCR Ultra-sensível'],
      descricao: 'Marcadores de risco cardiovascular alterados',
      tratamento: [
        '❤️ PROTOCOLO CARDIOPROTETOR:',
        '• Dieta mediterrânea (rica em vegetais, peixes, azeite)',
        '• Reduzir gorduras saturadas e trans',
        '• Fibras solúveis: aveia (β-glucanas) 3g/dia',
        '• Ômega-3 EPA/DHA 2-4g/dia',
        '• Berberina 500mg 3x/dia ou Arroz vermelho fermentado',
        '• Esteróis vegetais 2g/dia',
        '• Coenzima Q10 100-200mg/dia',
        '• Exercícios aeróbicos 150min/semana',
        '• Controle de peso e pressão arterial',
        ldl > 190 ? '• Estatina: atorvastatina 20-40mg ou rosuvastatina 10-20mg' : '• Considerar estatina se risco alto',
        '• Aspirina 100mg se indicado (prevenção)',
        '• Reavaliar lipidograma em 3 meses',
        '• Meta: LDL <100 (<70 se alto risco)'
      ],
      prioridade: ldl > 190 ? 1 : 2
    });
  }

  // Padrão 7: DEFICIÊNCIA DE VITAMINA D
  const vitD = parseFloat(resultados.vitaminas?.vitamina_d);
  if (vitD < 30) {
    const severo = vitD < 10;
    padroes.push({
      padrao: severo ? 'Deficiência Grave de Vitamina D' : 'Insuficiência de Vitamina D',
      severidade: severo ? 'alta' : 'moderada',
      examesEnvolvidos: ['Vitamina D'],
      descricao: `Vitamina D: ${vitD} ng/mL (ideal: 50-80)`,
      tratamento: [
        '☀️ PROTOCOLO VITAMINA D:',
        severo ? '• Reposição: 10.000 UI/dia por 8-12 semanas' : '• Reposição: 5.000 UI/dia por 8-12 semanas',
        '• Manutenção: 2.000-4.000 UI/dia',
        '• Exposição solar 15-20min/dia (braços/pernas)',
        '• Tomar com refeição gordurosa (melhor absorção)',
        '• Cofatores: Magnésio 400mg + Vitamina K2 100mcg',
        '• Alimentos: peixes gordos, ovos, cogumelos',
        '• Reavaliar em 3 meses',
        '• Meta: 50-80 ng/mL'
      ],
      prioridade: severo ? 1 : 2
    });
  }

  // Padrão 8: INSUFICIÊNCIA RENAL
  const creatinina = parseFloat(resultados.bioquimica?.creatinina);
  const ureia = parseFloat(resultados.bioquimica?.ureia);
  const tfg = parseFloat(resultados.funcao_renal?.tfg_ckd_epi);

  if (creatinina > 1.5 || ureia > 50 || (tfg && tfg < 60)) {
    padroes.push({
      padrao: 'Disfunção Renal',
      severidade: tfg < 30 || creatinina > 3 ? 'alta' : 'moderada',
      examesEnvolvidos: ['Creatinina', 'Ureia', 'TFG'],
      descricao: tfg ? `TFG: ${tfg} mL/min/1.73m² (${getEstagioIRC(tfg)})` : 'Marcadores renais alterados',
      tratamento: [
        '🔵 PROTOCOLO NEFROPROTEÇÃO:',
        '• ENCAMINHAR NEFROLOGISTA se TFG <30',
        '• Controle rigoroso de PA (<130/80 mmHg)',
        '• IECA ou BRA (renal-protetor)',
        '• Controle glicêmico se diabético (HbA1c <7%)',
        '• Restrição moderada de proteínas (0.8g/kg/dia)',
        '• Restrição de sódio (<2g/dia)',
        '• Hidratação adequada (2L/dia)',
        '• Evitar nefrotóxicos (AINEs, contraste)',
        '• Ajustar doses de medicamentos conforme TFG',
        '• Monitorar eletrólitos (K, Ca, P)',
        '• Suplementação: Ômega-3, Coenzima Q10',
        '• Exame de urina (proteinúria)',
        '• Reavaliar função renal a cada 3-6 meses'
      ],
      prioridade: tfg < 30 ? 1 : 2
    });
  }

  // Ordenar por prioridade
  padroes.sort((a, b) => a.prioridade - b.prioridade);

  return padroes;
}

function getEstagioIRC(tfg) {
  if (tfg >= 90) return 'Normal';
  if (tfg >= 60) return 'IRC leve (estágio 2)';
  if (tfg >= 45) return 'IRC moderada (estágio 3a)';
  if (tfg >= 30) return 'IRC moderada-severa (estágio 3b)';
  if (tfg >= 15) return 'IRC severa (estágio 4)';
  return 'IRC terminal (estágio 5) - DIÁLISE';
}

/**
 * Gera relatório completo de análise
 */
export function gerarRelatorioCompleto(resultados, interpretacoes) {
  const desviosIdeais = [];
  const criticos = identificarValoresCriticos(resultados, interpretacoes);
  const padroes = analisarPadroesClinicos(resultados, interpretacoes);

  // Calcular desvios dos valores ideais para todos os exames
  Object.entries(resultados).forEach(([categoria, exames]) => {
    Object.entries(exames).forEach(([exameId, valor]) => {
      const interpretacao = interpretacoes[categoria]?.[exameId];
      if (!interpretacao || !interpretacao.ideal) return;

      const desvio = calcularDesvioIdeal(valor, interpretacao.ideal, interpretacao.unidade);
      if (desvio && Math.abs(parseFloat(desvio.percentual)) >= 10) {
        const severidade = classificarSeveridade(desvio.percentual);
        desviosIdeais.push({
          categoria,
          exameId,
          exame: interpretacao.nome,
          valor: parseFloat(valor),
          unidade: interpretacao.unidade,
          ideal: interpretacao.ideal,
          desvio: desvio.desvio,
          percentual: desvio.percentual,
          direcao: desvio.direcao,
          severidade,
          interpretacao: interpretacao.interpretacao,
          status: interpretacao.status
        });
      }
    });
  });

  // Ordenar por severidade
  desviosIdeais.sort((a, b) => {
    const ordem = { critico: 0, grave: 1, moderado: 2, leve: 3 };
    return ordem[a.severidade.nivel] - ordem[b.severidade.nivel];
  });

  return {
    valoresCriticos: criticos,
    desviosIdeais,
    padroesClinicos: padroes,
    resumo: {
      totalExames: Object.values(resultados).reduce((sum, cat) => sum + Object.keys(cat).length, 0),
      totalCriticos: criticos.length,
      totalDesvios: desviosIdeais.length,
      totalPadroes: padroes.length,
      urgenciaMaxima: criticos.length > 0 ? criticos[0].urgencia : 'normal'
    }
  };
}
