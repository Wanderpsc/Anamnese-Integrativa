// Utilities for extracting and consolidating symptoms from anamneses
export function extractSymptoms(anamnese) {
  if (!anamnese) return {};
  
  const symptoms = {
    queixa: anamnese.q15_queixa_principal || '',
    tempo: anamnese.q16_tempo_problema || '',
    tratamentos: anamnese.q17_tratamentos_anteriores || '',
    doencasCronicas: anamnese.q25_doencas_cronicas || '',
    alergias: anamnese.q23_alergias || '',
    cirurgias: anamnese.q21_cirurgias || '',
    hospitalizacoes: anamnese.q22_hospitalizacoes || '',
    medicamentos: anamnese.q24_medicamentos_uso || '',
    tabagismo: anamnese.q26_tabagismo || '',
    etilismo: anamnese.q27_etilismo || '',
    atividadeFisica: anamnese.q28_atividade_fisica || '',
    frequenciaExercicio: anamnese.q29_frequencia_exercicio || '',
    cafeManha: anamnese.q30_cafe_manha || '',
    almoco: anamnese.q31_almoco || '',
    jantar: anamnese.q32_jantar || '',
    lanches: anamnese.q33_lanches || '',
    agua: anamnese.q34_agua_dia || '',
    restricoes: anamnese.q35_restricoes_alimentares || '',
    horasSono: anamnese.q36_horas_sono || '',
    qualidadeSono: anamnese.q37_qualidade_sono || '',
    acordaNoite: anamnese.q38_acorda_noite || '',
    intestino: anamnese.q39_intestino || '',
    gases: anamnese.q40_gases || '',
    azia: anamnese.q41_azia || '',
    nauseas: anamnese.q42_nauseas || '',
    urinaFrequencia: anamnese.q43_urina_frequencia || '',
    corUrina: anamnese.q44_cor_urina || '',
    ardorUrinar: anamnese.q45_ardor_urinar || '',
    dores: anamnese.q46_dores || '',
    cansaco: anamnese.q47_cansaco || '',
    estresse: anamnese.q48_estresse || '',
    ansiedade: anamnese.q49_ansiedade || '',
    observacoes: anamnese.q50_observacoes || '',
  };

  // NOVO: Adicionar dados do Questionário Abrangente de Saúde
  if (anamnese.comprehensiveHealthData) {
    const health = anamnese.comprehensiveHealthData;
    
    // Histórico Familiar
    symptoms.doencasFamiliares = health.doencasFamiliares && Array.isArray(health.doencasFamiliares) 
      ? health.doencasFamiliares.join(', ') 
      : '';
    symptoms.paisVivos = health.paisVivos || '';
    symptoms.causaMortePais = health.causaMortePais && Array.isArray(health.causaMortePais)
      ? health.causaMortePais.join(', ')
      : '';
    
    // Histórico Pessoal
    symptoms.cirurgiasDetalhadas = health.cirurgias && Array.isArray(health.cirurgias)
      ? health.cirurgias.join(', ')
      : '';
    symptoms.hospitalizacoesDetalhadas = health.hospitalizacoes && Array.isArray(health.hospitalizacoes)
      ? health.hospitalizacoes.join(', ')
      : '';
    symptoms.alergiasDetalhadas = health.alergias && Array.isArray(health.alergias)
      ? health.alergias.join(', ')
      : '';
    symptoms.medicamentosUsoDetalhados = health.medicamentosUso && Array.isArray(health.medicamentosUso)
      ? health.medicamentosUso.join(', ')
      : '';
    symptoms.doencasCronicasDetalhadas = health.doencasCronicas && Array.isArray(health.doencasCronicas)
      ? health.doencasCronicas.join(', ')
      : '';
    
    // Hábitos de Vida
    symptoms.tabagismoDetalhe = health.tabagismo || '';
    symptoms.etilismoDetalhe = health.etilismo || '';
    symptoms.atividadeFisicaDetalhe = health.atividadeFisica || '';
    symptoms.frequenciaExercicioDetalhe = health.frequenciaExercicio || '';
    symptoms.exposicaoSol = health.exposicaoSol || '';
    
    // Alimentação
    symptoms.refeicoesDia = health.refeicoesDia || '';
    symptoms.qualidadeAlimentacao = health.qualidadeAlimentacao || '';
    symptoms.consumoAgua = health.consumoAgua || '';
    symptoms.restricoesAlimentares = health.restricoesAlimentares && Array.isArray(health.restricoesAlimentares)
      ? health.restricoesAlimentares.join(', ')
      : '';
    symptoms.consumoFrequente = health.consumoFrequente && Array.isArray(health.consumoFrequente)
      ? health.consumoFrequente.join(', ')
      : '';
    
    // Sono e Repouso
    symptoms.horasSonoDetalhe = health.horasSono || '';
    symptoms.qualidadeSonoDetalhe = health.qualidadeSono || '';
    symptoms.dificuldadeDormir = health.dificuldadeDormir && Array.isArray(health.dificuldadeDormir)
      ? health.dificuldadeDormir.join(', ')
      : '';
    symptoms.acordaNoiteDetalhe = health.acordaNoite || '';
    
    // Sistema Digestório
    symptoms.funcionamentoIntestinal = health.funcionamentoIntestinal || '';
    symptoms.frequenciaEvacuacao = health.frequenciaEvacuacao || '';
    symptoms.gasesDetalhe = health.gases || '';
    symptoms.aziaDetalhe = health.azia || '';
    symptoms.nauseasDetalhe = health.nauseas || '';
    symptoms.distensaoAbdominal = health.distensaoAbdominal || '';
    
    // Sistema Urinário
    symptoms.frequenciaUrinariaDetalhe = health.frequenciaUrinaria || '';
    symptoms.corUrinaDetalhe = health.corUrina || '';
    symptoms.ardorUrinarDetalhe = health.ardorUrinar || '';
    symptoms.acordaUrinar = health.acordaUrinar || '';
    
    // Sintomas Gerais
    symptoms.nivelEnergia = health.nivelEnergia || '';
    symptoms.doresDetalhadas = health.dores && Array.isArray(health.dores)
      ? health.dores.join(', ')
      : '';
    symptoms.nivelEstresse = health.nivelEstresse || '';
    symptoms.nivelAnsiedade = health.nivelAnsiedade || '';
    symptoms.humor = health.humor || '';
  }
  
  // NOVO: Sintomas e Carências Nutricionais
  if (anamnese.q17a_sintomas_selecionados && Array.isArray(anamnese.q17a_sintomas_selecionados)) {
    symptoms.sintomasSelecionados = anamnese.q17a_sintomas_selecionados.join(', ');
  }
  
  if (anamnese.q17b_carencias_identificadas && Array.isArray(anamnese.q17b_carencias_identificadas)) {
    const carencias = anamnese.q17b_carencias_identificadas
      .map(c => c.sintoma + ': ' + c.carencias.map(car => car.nutriente).join(', '))
      .join(' | ');
    symptoms.carenciasNutricionais = carencias;
  }
  
  // NOVO: Sinais Vitais
  if (anamnese.vitalSignsAnalysis) {
    const vital = anamnese.vitalSignsAnalysis;
    symptoms.pressaoArterial = vital.systolicBP && vital.diastolicBP 
      ? `${vital.systolicBP}/${vital.diastolicBP} mmHg`
      : '';
    symptoms.frequenciaCardiaca = vital.heartRate ? `${vital.heartRate} bpm` : '';
    symptoms.saturacaoOxigenio = vital.oxygenSaturation ? `${vital.oxygenSaturation}%` : '';
    symptoms.temperatura = vital.temperature ? `${vital.temperature}°C` : '';
    symptoms.peso = vital.weight ? `${vital.weight} kg` : '';
    symptoms.altura = vital.height ? `${vital.height} cm` : '';
    symptoms.imc = vital.bmi || '';
    symptoms.circunferenciaCintura = vital.waist ? `${vital.waist} cm` : '';
    symptoms.circunferenciaQuadril = vital.hip ? `${vital.hip} cm` : '';
    symptoms.relacaoCinturaQuadril = vital.whr || '';
  }
  
  // NOVO: Checklist de Sinais Clínicos
  if (anamnese.clinicalSignsChecklist) {
    const clinical = anamnese.clinicalSignsChecklist;
    const allSigns = [];
    
    if (clinical.unhas && Array.isArray(clinical.unhas)) {
      allSigns.push('Unhas: ' + clinical.unhas.join(', '));
    }
    if (clinical.cabelos && Array.isArray(clinical.cabelos)) {
      allSigns.push('Cabelos: ' + clinical.cabelos.join(', '));
    }
    if (clinical.olhos && Array.isArray(clinical.olhos)) {
      allSigns.push('Olhos: ' + clinical.olhos.join(', '));
    }
    if (clinical.pele && Array.isArray(clinical.pele)) {
      allSigns.push('Pele: ' + clinical.pele.join(', '));
    }
    if (clinical.lingua && Array.isArray(clinical.lingua)) {
      allSigns.push('Língua: ' + clinical.lingua.join(', '));
    }
    if (clinical.labios && Array.isArray(clinical.labios)) {
      allSigns.push('Lábios: ' + clinical.labios.join(', '));
    }
    
    symptoms.sinaisClinicos = allSigns.join(' | ');
  }
  
  return symptoms;
}

// Compute a consolidated summary from the anamneses array
export function computeConsolidatedSummary(anamnesesList) {
  if (!anamnesesList || anamnesesList.length === 0) return null;
  const latest = anamnesesList[0];
  const unionText = (arr) => {
    const parts = arr
      .map(v => (v || '').split(/[;,\n]/).map(p => p.trim()).filter(Boolean))
      .flat();
    return [...new Set(parts)].join('; ');
  };

  return {
    queixa: latest.q15_queixa_principal || '',
    tempo: latest.q16_tempo_problema || '',
    tratamentos: unionText(anamnesesList.map(a => a.q17_tratamentos_anteriores)),
    doencasCronicas: unionText(anamnesesList.map(a => a.q25_doencas_cronicas)),
    alergias: unionText(anamnesesList.map(a => a.q23_alergias)),
    cirurgias: unionText(anamnesesList.map(a => a.q21_cirurgias)),
    hospitalizacoes: unionText(anamnesesList.map(a => a.q22_hospitalizacoes)),
    medicamentos: unionText(anamnesesList.map(a => a.q24_medicamentos_uso)),
    tabagismo: unionText(anamnesesList.map(a => a.q26_tabagismo)),
    etilismo: unionText(anamnesesList.map(a => a.q27_etilismo)),
    atividadeFisica: unionText(anamnesesList.map(a => a.q28_atividade_fisica)),
    frequenciaExercicio: unionText(anamnesesList.map(a => a.q29_frequencia_exercicio)),
    cafeManha: unionText(anamnesesList.map(a => a.q30_cafe_manha)),
    almoco: unionText(anamnesesList.map(a => a.q31_almoco)),
    jantar: unionText(anamnesesList.map(a => a.q32_jantar)),
    lanches: unionText(anamnesesList.map(a => a.q33_lanches)),
    agua: unionText(anamnesesList.map(a => a.q34_agua_dia)),
    restricoes: unionText(anamnesesList.map(a => a.q35_restricoes_alimentares)),
    horasSono: unionText(anamnesesList.map(a => a.q36_horas_sono)),
    qualidadeSono: unionText(anamnesesList.map(a => a.q37_qualidade_sono)),
    acordaNoite: unionText(anamnesesList.map(a => a.q38_acorda_noite)),
    intestino: unionText(anamnesesList.map(a => a.q39_intestino)),
    gases: unionText(anamnesesList.map(a => a.q40_gases)),
    azia: unionText(anamnesesList.map(a => a.q41_azia)),
    nauseas: unionText(anamnesesList.map(a => a.q42_nauseas)),
    urinaFrequencia: unionText(anamnesesList.map(a => a.q43_urina_frequencia)),
    corUrina: unionText(anamnesesList.map(a => a.q44_cor_urina)),
    ardorUrinar: unionText(anamnesesList.map(a => a.q45_ardor_urinar)),
    dores: unionText(anamnesesList.map(a => a.q46_dores)),
    cansaco: unionText(anamnesesList.map(a => a.q47_cansaco)),
    estresse: unionText(anamnesesList.map(a => a.q48_estresse)),
    ansiedade: unionText(anamnesesList.map(a => a.q49_ansiedade)),
    observacoes: unionText(anamnesesList.map(a => a.q50_observacoes)),
  };
}

// Build an HTML snippet for the consolidated summary (used by PDF builder)
export function buildConsolidatedHtml(subjectName, consolidated) {
  if (!consolidated) return '';
  return `
    <div style="font-family:sans-serif;">
      <h2>Resumo Consolidado de Sintomas - ${subjectName}</h2>
      <hr />
      <div><strong>Queixa Principal: </strong>${consolidated.queixa || 'Não informado'}</div>
      <div><strong>Tempo: </strong>${consolidated.tempo || 'Não informado'}</div>
      <div style="margin-top:8px"><strong>Condições médicas:</strong>
        <div>Doenças Crônicas: ${consolidated.doencasCronicas || 'Não informado'}</div>
        <div>Alergias: ${consolidated.alergias || 'Não informado'}</div>
        <div>Cirurgias: ${consolidated.cirurgias || 'Não informado'}</div>
        <div>Hospitalizações: ${consolidated.hospitalizacoes || 'Não informado'}</div>
        <div>Medicamentos: ${consolidated.medicamentos || 'Não informado'}</div>
      </div>
      <div style="margin-top:8px"><strong>Hábitos e Alimentação:</strong>
        <div>Atividade física: ${consolidated.atividadeFisica || 'Não informado'} (${consolidated.frequenciaExercicio || 'Frequência não informada'})</div>
        <div>Café: ${consolidated.cafeManha || 'Não informado'}</div>
        <div>Almoço: ${consolidated.almoco || 'Não informado'}</div>
        <div>Jantar: ${consolidated.jantar || 'Não informado'}</div>
        <div>Lanches: ${consolidated.lanches || 'Não informado'}</div>
        <div>Água (copos/dia): ${consolidated.agua || 'Não informado'}</div>
      </div>
      <div style="margin-top:8px"><strong>Sintomas:</strong>
        <div>Dores: ${consolidated.dores || 'Não informado'}</div>
        <div>Cansaço: ${consolidated.cansaco || 'Não informado'}</div>
        <div>Estresse: ${consolidated.estresse || 'Não informado'}</div>
        <div>Ansiedade: ${consolidated.ansiedade || 'Não informado'}</div>
        <div>Observações: ${consolidated.observacoes || 'Não informado'}</div>
      </div>
    </div>`;
}

// Convert consolidated summary to CSV row (header built separately)
export function consolidatedToCsvRow(consolidated, options = {}) {
  const safe = (v) => (`"${String(v || '').replace(/"/g, '""')}"`);
  // SINTOMAS sheet prefers an initial ID / patient columns followed by the medical fields
  const headers = [
    'id', 'patientName', 'createdAt',
    'queixa', 'tempo', 'tratamentos', 'doencasCronicas', 'alergias', 'cirurgias', 'hospitalizacoes', 'medicamentos',
    'tabagismo', 'etilismo', 'atividadeFisica', 'frequenciaExercicio', 'cafeManha', 'almoco', 'jantar', 'lanches', 'agua', 'restricoes',
    'horasSono', 'qualidadeSono', 'acordaNoite', 'intestino', 'gases', 'azia', 'nauseas', 'urinaFrequencia', 'corUrina', 'ardorUrinar',
    'dores', 'cansaco', 'estresse', 'ansiedade', 'observacoes'
  ];

  // consolidated can also be an anamnese with direct fields. Compose a canonical row object
  const ctx = Object.assign({}, consolidated);
  // allow callers to pass extra info explicitly
  if (options.patientId) ctx.id = options.patientId;
  if (options.patientName) ctx.patientName = options.patientName;
  if (options.createdAt) ctx.createdAt = options.createdAt;

  const row = headers.map(h => safe(ctx[h] || '')).join(',');
  return { headers, row };
}

export default {
  extractSymptoms,
  computeConsolidatedSummary,
  buildConsolidatedHtml,
  consolidatedToCsvRow
};
