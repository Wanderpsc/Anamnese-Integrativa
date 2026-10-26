const RISK_PATTERNS = {
  pregnancy: ['gestante', 'gravidez', 'gravida', 'gestacao'],
  lactation: ['lactante', 'amamentando', 'amamentacao'],
  renal: ['insuficiencia renal', 'doenca renal', 'nefropatia', 'dialise', 'renal cronica'],
  hepatic: ['insuficiencia hepatica', 'doenca hepatica', 'hepatopatia', 'cirrose', 'esteatose'],
  diabetes: ['diabetes', 'diabetico', 'hipoglicemia', 'insulina', 'metformina'],
  hypertension: ['hipertensao', 'pressao alta', 'anti-hipertensivo'],
  anticoagulation: ['anticoagulante', 'varfarina', 'warfarina', 'heparina', 'rivaroxabana', 'apixabana', 'clopidogrel', 'aas'],
  allergy: ['alergia', 'anafilaxia', 'hipersensibilidade'],
  cancer: ['cancer', 'neoplasia', 'tumor', 'quimioterapia', 'radioterapia'],
};

const HIGH_RISK_PROTOCOL_PATTERNS = {
  pregnancy: ['sene', 'sena', 'boldo', 'alcachofra', 'vitex', 'ashwagandha', 'ozonio', 'quelacao', 'edta', 'retal'],
  lactation: ['sene', 'sena', 'boldo', 'vitex', 'ozonio', 'quelacao', 'edta', 'retal'],
  renal: ['magnesio', 'potassio', 'creatina', 'diuretico', 'quelacao', 'edta', 'bicarbonato'],
  hepatic: ['boldo', 'alcachofra', 'curcumina', 'kava', 'alcool', 'quelacao', 'edta'],
  diabetes: ['berberina', 'insulina', 'hipoglicemiante', 'canela', 'jejum'],
  hypertension: ['ginseng', 'alcaçuz', 'alcarcuz', 'descongestionante', 'estimulante'],
  anticoagulation: ['omega-3', 'omega 3', 'ginkgo', 'curcumina', 'curcuma', 'alho', 'vitamina e', 'sene'],
  allergy: ['propolis', 'equinacea', 'camomila', 'aroma', 'oleo essencial'],
  cancer: ['antioxidante', 'alta dose', 'vitamina c ev', 'mistletoe', 'quelacao'],
};

const normalize = (value) => String(value || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase();

function collectText(value, output = []) {
  if (typeof value === 'string') {
    output.push(value);
  } else if (Array.isArray(value)) {
    value.forEach(item => collectText(item, output));
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => {
      if (!['base64', 'rawText', 'sourceFiles'].includes(key)) collectText(item, output);
    });
  }
  return output;
}

function hasAny(text, terms) {
  return terms.some(term => text.includes(normalize(term)));
}

export function normalizeClinicalContext(entry) {
  const text = normalize(collectText(entry).join(' | '));
  const risks = Object.keys(RISK_PATTERNS).filter(risk => hasAny(text, RISK_PATTERNS[risk]));
  const nested = entry?.anamnesisIntegrativaData || entry?.anamnesisIntegrativa || {};
  const symptoms = [
    entry?.queixaPrincipal,
    entry?.q05_queixa_principal,
    entry?.q15_queixa_principal,
    entry?.q02_queixa_principal,
    nested?.queixaPrincipal,
    nested?.b1q1,
    ...(Array.isArray(entry?.queixas) ? entry.queixas : []),
    ...(Array.isArray(nested?.q17a_sintomas_selecionados) ? nested.q17a_sintomas_selecionados : []),
  ].filter(value => typeof value === 'string' && value.trim());

  return {
    patientId: entry?.id ? String(entry.id) : null,
    name: entry?.q01_nome || entry?.nome || '',
    age: entry?.q03_idade || entry?.idade || nested?.idade || null,
    sex: entry?.q04_sexo || entry?.sexo || nested?.sexo || '',
    symptoms: [...new Set(symptoms)],
    medications: [entry?.q24_medicamentos_uso, entry?.q30_medicamentos_uso, nested?.b12q3]
      .filter(value => typeof value === 'string' && value.trim()),
    allergies: [entry?.q16_alergias, entry?.alergias, nested?.b16q1b]
      .filter(value => typeof value === 'string' && value.trim()),
    risks,
    sourceTextLength: text.length,
  };
}

export function evaluateProtocolSafety(entry, protocolItems = []) {
  const context = normalizeClinicalContext(entry);
  const protocolText = normalize(collectText(protocolItems).join(' | '));
  const warnings = [
    'Revisao profissional obrigatoria: esta saida e apoio a decisao e nao uma prescricao validada.',
    'Confirmar medicamentos em uso, alergias, gestacao/lactacao, idade, funcao renal/hepatica e exames recentes antes de indicar qualquer item.',
  ];
  const matchedRisks = [];

  context.risks.forEach(risk => {
    const riskyItems = (HIGH_RISK_PROTOCOL_PATTERNS[risk] || []).filter(term => protocolText.includes(normalize(term)));
    if (riskyItems.length > 0) {
      matchedRisks.push({ risk, items: riskyItems });
      warnings.push(`Risco ${risk}: revisar/remover itens relacionados (${riskyItems.join(', ')}).`);
    }
  });

  const hasRedFlag = hasAny(normalize(collectText(entry).join(' | ')), [
    'dor no peito', 'falta de ar intensa', 'desmaio', 'confusao mental', 'sangramento importante', 'ideacao suicida', 'febre persistente',
  ]);
  if (hasRedFlag) {
    warnings.unshift('Sinal de alarme identificado: encaminhar para avaliacao medica imediata antes de qualquer protocolo integrativo.');
    matchedRisks.push({ risk: 'redFlag', items: ['sinal de alarme'] });
  }

  return {
    status: 'review_required',
    warnings,
    matchedRisks,
    context,
    itemCount: collectText(protocolItems).length,
  };
}
