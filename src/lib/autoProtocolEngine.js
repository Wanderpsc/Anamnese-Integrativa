/**
 * AUTO PROTOCOL ENGINE
 * ============================================================
 * Gera automaticamente protocolos terapêuticos integrais a partir
 * dos dados preenchidos na anamnese, sem necessidade de módulos manuais.
 *
 * Fontes utilizadas:
 *  - THERAPEUTIC_DATABASE (config/therapeuticDatabase.js)
 *  - BOARIM_PROTOCOLS (config/boarimProtocols.js)
 *  - FLORAL_THEMES (data/floraisPorCondicao.js)
 *  - Mapeamento completo de campos anamnésicos → condições clínicas
 *
 * IMPORTANTE: os dados clínicos da anamnese AIC ficam em
 *   entry.anamneseIntegrativaData  (não no topo do entry!)
 * Os campos usam prefixos: sd* (digestório), sh* (hepático),
 *   su* (urinário), sc* (cardio), sr* (respiratório), sn* (neurológico),
 *   sos* (osteomuscular), pcu* (pele/cabelo), sim* (imunológico),
 *   se* (endócrino/metabólico), hf* (hormonal feminino), hm* (masc),
 *   sono*, emoc*, vit*, mag*, ferro*, zinco*, om3*, tox*
 */

import { THERAPEUTIC_DATABASE, getTherapeuticSuggestionsBySymptoms } from '../config/therapeuticDatabase';
import { getBoarimProtocolsBySymptoms } from '../config/boarimProtocols';
import { FLORAL_THEMES } from '../data/floraisPorCondicao';
// FLORAL_THEMES pode ser undefined se o arquivo não exportar — protegido em getForaisForConditions

// ─────────────────────────────────────────────────────────────
// HELPER: extrai o objeto de dados clínicos do entry
// Os dados ficam em entry.anamneseIntegrativaData ou no próprio entry
// ─────────────────────────────────────────────────────────────
function getClinicalData(entry) {
  return entry?.anamneseIntegrativaData || entry || {};
}

// ─────────────────────────────────────────────────────────────
// MAPEAMENTO: campo anamnésico → chave(s) em THERAPEUTIC_DATABASE
// Usa os nomes de campo corretos do INIT de AnamneseIntegrativaCompleta
// ─────────────────────────────────────────────────────────────
/**
 * Retorna as chaves de condições clínicas detectadas na anamnese.
 * Aceita tanto entry.anamneseIntegrativaData quanto entry diretamente.
 */
export function extractConditionKeys(entry) {
  const d = getClinicalData(entry);
  const keys = new Set();

  // ── DIGESTÓRIO ───────────────────────────────────────────
  if (d.sdConstipacao || d.sdFI2dias || d.sdFIMenos3 || d.q39_intestino === 'Preso')
    keys.add('intestino_preso');
  // sdAlternado = intestino alternado (SII) → NÃO é diarreia, apenas intestino_preso
  if (d.sdAlternado) keys.add('intestino_preso');
  if (d.sdDiarreia || d.q39_intestino === 'Diarreia')
    keys.add('diarreia');
  if (d.sdGases || d.sdDistensao) keys.add('gases');
  if (d.sdAzia || d.sdRefluxo || d.sdMaDigestao || d.hpGastrite)
    keys.add('azia');
  if (d.sdAzia || d.sdRefluxo || d.hpGastrite) keys.add('gastrite');
  if (d.sdCandidiase || d.simCandidiase) keys.add('candidiase');

  // ── HEPÁTICO ─────────────────────────────────────────────
  if (d.shNauseasGord || d.shFrituras || d.shGostoAmargo || d.shCansacoApos ||
      d.shGordura || d.hpEsteatose || d.shIctericia || d.shDorDireita ||
      d.alcoolRegular)
    keys.add('figado_sobrecarregado');

  // ── CARDIOVASCULAR ───────────────────────────────────────
  if (d.scPaAlta || d.hpHipertensao || Number(d.paSis) >= 140 || Number(d.paDia) >= 90)
    keys.add('hipertensao');
  if (d.scColesterol || d.om3TgAltos || d.hpColesterol)
    keys.add('colesterol_trig');

  // ── RESPIRATÓRIO ─────────────────────────────────────────
  if (d.srRinite || d.srSinusite || d.hpRinite) keys.add('rinite_sinusite');

  // ── NEUROLÓGICO ──────────────────────────────────────────
  if (d.snDorCabeca) keys.add('dores_de_cabeca');
  if (d.snEnxaqueca) { keys.add('enxaqueca'); keys.add('dores_de_cabeca'); }

  // ── OSTEOMUSCULAR ────────────────────────────────────────
  if (d.sosDorArticular || d.sosRigidez || d.om3DorArticular) keys.add('artrite_artralgia');
  if (d.sosOsteopenia || d.sosOsteoporose) keys.add('osteoporose');

  // ── PELE / CABELO ────────────────────────────────────────
  if (d.pcuAcne || d.zincoAcne) keys.add('acne');
  if (d.pcuQuedaCabelo || d.seQuedaCabelo || d.vitbQuedaCabelo) keys.add('queda_cabelo');

  // ── IMUNOLÓGICO ──────────────────────────────────────────
  if (d.simInfeccoesFreq || d.zincoBaixaImun || d.vitdBaixaImun ||
      d.simAlergias || d.simLinfonodos || d.simFeridasDemoram)
    keys.add('imunidade_baixa');

  // ── ENDÓCRINO / METABÓLICO ───────────────────────────────
  if (d.seDiabetes || d.seResistencia) keys.add('diabetes_prediabetes');
  if (d.seGanhoPeso || d.seDificEmagrecer || d.seSindMetabolica ||
      d.consAcucar || d.consFrituras || d.consRefrigerante || d.atividadeSedentario)
    keys.add('obesidade_resistencia_insulinica');
  if (d.seVontadeDoces || d.seTremoresJejum) keys.add('diabetes_prediabetes');

  // ── SONO ─────────────────────────────────────────────────
  if (d.sonoDemora || d.sonoAcordaNoite || d.sonoAcordaCedo ||
      d.sonoLeve || d.magInsonia)
    keys.add('insonia');

  // ── EMOCIONAL ────────────────────────────────────────────
  if (d.emocDesanimo || d.emocPerda || d.emocLuto || d.emocIsolamento ||
      d.emocSensacaoVazio || d.om3HumorDep)
    keys.add('depressao');
  if (d.sobrecarrega === 'Frequentemente' || d.sobrecarrega === 'Quase sempre' ||
      d.emocExaustao || d.emocBurnout)
    keys.add('burnout_adrenal');
  if (d.emocCrises || d.emocPanico || d.emocMedo || d.emocPensAcel ||
      d.emocTensaoMuscular || d.emocPreocupacaoExcess || d.magAnsiedade ||
      d.alertaConstante === 'Sim')
    keys.add('ansiedade');

  // ── CARÊNCIAS NUTRICIONAIS ───────────────────────────────
  if (d.magCaimbras || d.magAnsiedade || d.magInsonia || d.magIrritab ||
      d.magPalpitacoes || d.sosCaimbras)
    keys.add('carencia_magnesio');
  if (d.vitdBaixaImun || d.vitdDorOssea || d.vitdFraqueza ||
      d.vitdTristeza || d.vitdPoucoSol || d.vitdOsteopenia || d.seCansaco)
    keys.add('carencia_vitamina_d');
  if (d.zincoBaixaImun || d.zincoAcne || d.zincoCicatrizacao || d.zincoBaixaLibido ||
      d.zincoQuedaCabelo || d.zincoUnhasFracas)
    keys.add('carencia_zinco');
  if (d.ferroCansaco || d.ferroPalidez || d.ferroFaltaAr || d.ferroTontura)
    keys.add('anemia');
  if (d.vitbFormigamento || d.vitbCansaco || d.snFormigamento || d.snMaMemoria)
    keys.add('fadiga');
  if (d.om3Inflamacao || d.om3DorArticular || d.om3PeleSeca ||
      d.om3HumorDep || d.om3TgAltos)
    keys.add('colesterol_trig');

  // ── FADIGA GERAL ─────────────────────────────────────────
  if (d.seCansaco || d.emocExaustao || d.sonoAcordaCansado)
    keys.add('fadiga');

  // ── HORMONAL ─────────────────────────────────────────────
  if (d.seFrioSens && d.seGanhoPeso) keys.add('tireoide_hipotireoidismo');
  if (d.hfColica || d.hfTPM) keys.add('tpm_dismenorreia');
  if (d.hfEndometriose || d.hfSop || d.hpSop) keys.add('sop');
  if (d.hfMenopausa || d.hfFogachos) keys.add('menopausa');
  if (d.hmBaixaLibido || d.hmBaixaTestost || d.hmDisfuncao) keys.add('baixa_testosterona');

  // ── TOXINAS ──────────────────────────────────────────────
  if (d.toxMercurio || d.toxChumbo || d.toxAgrotoxicos ||
      d.toxMofo || d.toxPlasticos)
    keys.add('detox_toxinas');

  // ── HIPÓTESES CONFIRMADAS (etapa 12 da anamnese) ─────────
  const hipMap = {
    'Deficiência de vitamina D': 'carencia_vitamina_d',
    'Deficiência de magnésio': 'carencia_magnesio',
    'Deficiência de zinco': 'carencia_zinco',
    'Deficiência de ferro / anemia ferropriva': 'anemia',
    'Deficiência de vitamina B12': 'fadiga',
    'Anemia megaloblástica (B12/folato)': 'anemia',
    'Deficiência de ômega-3': 'colesterol_trig',
    'Resistência à insulina': 'diabetes_prediabetes',
    'Diabetes tipo 2': 'diabetes_prediabetes',
    'Pré-diabetes': 'diabetes_prediabetes',
    'Hipotireoidismo': 'tireoide_hipotireoidismo',
    'Hipertensão': 'hipertensao',
    'Colesterol elevado': 'colesterol_trig',
    'Síndrome do intestino irritável': 'intestino_preso',
    'Gastrite / Úlcera': 'gastrite',
    'Candidíase': 'candidiase',
    'Ansiedade': 'ansiedade',
    'Depressão': 'depressao',
    'Burnout / Esgotamento': 'burnout_adrenal',
    'Insônia': 'insonia',
    'Menopausa': 'menopausa',
    'SOP': 'sop',
  };
  const hipCats = ['hipoteseNutricional','hipoteseMetabolica','hipoteseHormonal',
                   'hipoteseInflamacao','hipoteseIntoxicacao','hipoteseMental'];
  hipCats.forEach(cat => {
    const obj = d[cat] || {};
    Object.keys(obj).forEach(hipName => {
      if (obj[hipName]) {
        const mapped = hipMap[hipName];
        if (mapped) keys.add(mapped);
      }
    });
  });

  // ── TEXTO LIVRE (queixa principal) ───────────────────────
  const qp = String(d.queixaPrincipal || entry?.q05_queixa_principal || '').toLowerCase();
  if (qp) {
    const kw = [
      [/constip|intestin pres|prisão/,  'intestino_preso'],
      [/diarr/,                          'diarreia'],
      [/gás|gases|distensão/,            'gases'],
      [/azia|refluxo|queimação/,         'azia'],
      [/gastrite/,                       'gastrite'],
      [/fígado|esteatose/,               'figado_sobrecarregado'],
      [/ansiedad/,                       'ansiedade'],
      [/depress/,                        'depressao'],
      [/insônia|insonia|sono/,           'insonia'],
      [/burnout|esgotam|cansaço crôn/,   'burnout_adrenal'],
      [/hipertensão|pressão alta/,       'hipertensao'],
      [/diabetes|glicemia/,              'diabetes_prediabetes'],
      [/colesterol|triglicérid/,         'colesterol_trig'],
      [/rinite|sinusite/,                'rinite_sinusite'],
      [/candid/,                         'candidiase'],
      [/artrite|artralgia|articulaç/,    'artrite_artralgia'],
      [/tireoide|hipotireoide/,          'tireoide_hipotireoidismo'],
      [/menopausa|climatério/,           'menopausa'],
      [/tpm|cólica menstr|dismenorreia/, 'tpm_dismenorreia'],
      [/cansaço|fadiga/,                 'fadiga'],
      [/enxaqueca/,                      'enxaqueca'],
      [/cefaleia|dor de cabeça/,         'dores_de_cabeca'],
      [/acne|espinha/,                   'acne'],
      [/queda de cabelo/,                'queda_cabelo'],
      [/osteoporose/,                    'osteoporose'],
    ];
    kw.forEach(([pat, key]) => { if (pat.test(qp)) keys.add(key); });
  }

  // Filtrar apenas chaves existentes no banco
  return Array.from(keys).filter(k => k in THERAPEUTIC_DATABASE);
}

// ─────────────────────────────────────────────────────────────
// MAPEAMENTO: condições → florais
// ─────────────────────────────────────────────────────────────
function getForaisForConditions(conditionKeys) {
  if (!FLORAL_THEMES) return [];

  const themes = new Set(['geral']);
  for (const k of conditionKeys) {
    if (['ansiedade','depressao','insonia','burnout_adrenal','enxaqueca','dores_de_cabeca'].includes(k))
      themes.add('neuroemocional');
    if (['fadiga','burnout_adrenal'].includes(k))
      themes.add('vitalidade');
    if (['intestino_preso','diarreia','gases','azia','gastrite','figado_sobrecarregado','candidiase'].includes(k))
      themes.add('digestivoInflamatorio');
    if (['hipertensao','diabetes_prediabetes','obesidade_resistencia_insulinica','colesterol_trig'].includes(k))
      themes.add('cardiometabolico');
    if (['imunidade_baixa','artrite_artralgia','rinite_sinusite','detox_toxinas'].includes(k))
      themes.add('imunoinflamatorio');
    if (['tireoide_hipotireoidismo','menopausa','sop','tpm_dismenorreia','baixa_testosterona'].includes(k))
      themes.add('hormonal');
    if (['rinite_sinusite'].includes(k))
      themes.add('respiratorioAlergico');
  }

  const florais = [];
  for (const theme of themes) {
    const items = FLORAL_THEMES[theme] || [];
    items.forEach(f => {
      if (!florais.find(x => x.essencia === f.essencia)) florais.push(f);
    });
  }
  return florais;
}

// ─────────────────────────────────────────────────────────────
// MAPEAMENTO: campos anamnésicos → sintomas para Boarim (fuzzy)
// ─────────────────────────────────────────────────────────────
function extractBoarimSymptoms(entry) {
  const d = getClinicalData(entry);
  const syms = new Set();

  if (d.sdConstipacao || d.sdFI2dias || d.sdAlternado || d.q39_intestino === 'Preso') syms.add('constipação');
  if (d.sdDiarreia || d.q39_intestino === 'Diarreia') syms.add('diarreia');
  if (d.sdAzia || d.sdRefluxo || d.hpGastrite) syms.add('gastrite');
  if (d.suInfeccao || d.suArdor) syms.add('infecção urinária');
  if (d.scPaAlta || d.hpHipertensao || Number(d.paSis) >= 140) syms.add('hipertensão');
  if (d.seDiabetes || d.hpDiab2) syms.add('diabetes');
  if (d.hpHipotireoidismo || d.seFrioSens) syms.add('hipotireoidismo');
  if (d.sonoDemora || d.sonoAcordaNoite || d.magInsonia) syms.add('insônia');
  if (d.emocCrises || d.emocPanico || d.magAnsiedade) syms.add('ansiedade');
  if (d.emocDesanimo || d.om3HumorDep) syms.add('depressão');
  if (d.srRinite || d.srSinusite) syms.add('rinite');
  if (d.srTosseSeca || d.srBronquite || d.hpBronquite) syms.add('bronquite');
  if (d.ferroCansaco || d.ferroPalidez) syms.add('anemia');
  if (d.sosDorArticular || d.hpArtrite) syms.add('artrite');
  if (d.hfMenopausa || d.hfFogachos) syms.add('menopausa');
  if (d.hfTPM || d.hfColica) syms.add('tpm');
  if (d.hpOsteoporose || d.sosOsteoporose) syms.add('osteoporose');
  if (d.simCandidiase || d.sdCandidiase) syms.add('candidíase');
  if (d.toxMercurio || d.toxChumbo) syms.add('intoxicação');
  if (d.pcuAcne || d.zincoAcne) syms.add('acne');
  if (d.simInfeccoesFreq || d.vitdBaixaImun) syms.add('imunidade baixa');

  const qp = String(d.queixaPrincipal || entry?.q05_queixa_principal || '').toLowerCase();
  if (qp) {
    ['constipação','prisão','diarreia','gastrite','azia','refluxo','rinite','sinusite',
     'bronquite','tosse','ansiedade','insônia','depressão','hipertensão','diabetes',
     'artrite','artralgia','candidíase','acne','menopausa','tpm','anemia'].forEach(sym => {
      const norm = sym.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      if (qp.includes(norm) || qp.includes(sym)) syms.add(sym);
    });
  }

  return Array.from(syms);
}

// ─────────────────────────────────────────────────────────────
// FUNÇÃO PRINCIPAL: gera protocolo completo a partir da anamnese
// ─────────────────────────────────────────────────────────────
/**
 * Gera automaticamente protocolos terapêuticos integrais.
 * @param {object} entry - objeto anamnésico do localStorage
 * @returns {object} protocolo consolidado com todas as modalidades
 */
export function autoGenerateProtocols(entry) {
  if (!entry) return null;

  // 1. Extrair condições e sintomas
  const conditionKeys = extractConditionKeys(entry);
  const boarimSymptoms = extractBoarimSymptoms(entry);

  // 2. Buscar protocolos do THERAPEUTIC_DATABASE
  const therapyData = getTherapeuticSuggestionsBySymptoms(conditionKeys);

  // 3. Buscar protocolos Boarim
  const boarimResult = getBoarimProtocolsBySymptoms(boarimSymptoms);

  // 4. Consolidar
  const result = {
    conditionsDetected: conditionKeys,
    symptomsDetected: boarimSymptoms,

    // por modalidade terapêutica
    homeopatia: [],
    fitoterapia: [],
    suplementacao: [],
    alimentacao: [],
    oleos: [],
    hidroterapia: [],
    florais: [],
    tcm: [],
    geoterapia: [],
    outrasTherapias: [],
    orientacoes: [],
    boarimProtocols: boarimResult || [],
  };

  // Deduplication sets
  const seen = {
    homeopatia: new Set(),
    fitoterapia: new Set(),
    suplementacao: new Set(),
    alimentacao: new Set(),
    oleos: new Set(),
    hidroterapia: new Set(),
    tcm: new Set(),
    geo: new Set(),
    outras: new Set(),
    orient: new Set(),
  };

  const addUniq = (arr, set, items = []) => {
    (items || []).forEach(itemObj => {
      // Usa o texto real do item (não o objeto inteiro) como chave de dedup
      const key = String(itemObj?.item ?? itemObj).slice(0, 80).toLowerCase().trim();
      if (!set.has(key)) { set.add(key); arr.push(itemObj); }
    });
  };

  // Agregar por condição detectada
  for (const [ckey, data] of Object.entries(therapyData)) {
    const label = (data.title || ckey).toUpperCase();

    // Homeopatia
    if (data.homeopathy?.length) {
      addUniq(result.homeopatia, seen.homeopatia,
        data.homeopathy.map(h => ({ item: h, condicao: data.title })));
    }

    // Fitoterapia (herbs)
    if (data.herbs?.length) {
      addUniq(result.fitoterapia, seen.fitoterapia,
        data.herbs.map(h => ({ item: h, condicao: data.title })));
    }

    // Suplementação
    if (data.supplements?.length) {
      addUniq(result.suplementacao, seen.suplementacao,
        data.supplements.map(s => ({ item: s, condicao: data.title })));
    }

    // Alimentação (suggestions + foods)
    if (data.foods?.length) {
      addUniq(result.alimentacao, seen.alimentacao,
        data.foods.map(f => ({ item: f, condicao: data.title })));
    }

    // Óleos essenciais / aromaterapia
    if (data.essentialOils?.length) {
      addUniq(result.oleos, seen.oleos,
        data.essentialOils.map(o => ({ item: o, condicao: data.title })));
    }
    if (data.aromatherapy?.length) {
      addUniq(result.oleos, seen.oleos,
        data.aromatherapy.map(o => ({ item: o, condicao: data.title })));
    }
    if (data.quantumFlorals?.length) {
      // florais de Bach/quantum ficam em florais
      if (!seen.florais) seen.florais = new Set();
      addUniq(result.florais, seen.florais,
        data.quantumFlorals.map(f => ({ item: f, condicao: data.title })));
    }

    // Hidroterapia
    if (data.hydrotherapy?.length) {
      addUniq(result.hidroterapia, seen.hidroterapia,
        data.hydrotherapy.map(h => ({ item: h, condicao: data.title })));
    }

    // Medicina Tradicional Chinesa
    if (data.tcm?.length) {
      addUniq(result.tcm, seen.tcm,
        data.tcm.map(t => ({ item: t, condicao: data.title })));
    }

    // Geoterapia / Argiloterapia
    if (data.geotherapy?.length) {
      addUniq(result.geoterapia, seen.geo,
        data.geotherapy.map(g => ({ item: g, condicao: data.title })));
    }

    // Outras terapias
    if (data.otherTherapies?.length) {
      addUniq(result.outrasTherapias, seen.outras,
        data.otherTherapies.map(o => ({ item: o, condicao: data.title })));
    }

    // Sugestões gerais → orientações
    if (data.suggestions?.length) {
      addUniq(result.orientacoes, seen.orient,
        data.suggestions.map(s => ({ item: s, condicao: data.title })));
    }
  }

  // 5. Florais por tema emocional/funcional
  const floralItems = getForaisForConditions(conditionKeys);
  floralItems.forEach(f => {
    result.florais.push({
      item: `${f.essencia} — ${f.objetivo} (${f.posologia})`,
      condicao: 'Floral',
    });
  });

  return result;
}

/**
 * Retorna true se a anamnese tem dados suficientes para gerar protocolos.
 */
export function hasEnoughDataForProtocol(entry) {
  if (!entry) return false;
  const keys = extractConditionKeys(entry);
  return keys.length > 0;
}
