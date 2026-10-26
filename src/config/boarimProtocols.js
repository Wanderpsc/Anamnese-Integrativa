/**
 * Protocolos de Tratamentos Naturais baseados no Manual Prático do Dr. Daniel S. F. Boarim
 * 15ª Edição revisada e atualizada - 2014
 * 
 * Este arquivo contém protocolos terapêuticos naturais organizados por condição,
 * integrando hidroterapia, fitoterapia, alimentação e outras terapias naturais.
 */

export const BOARIM_PROTOCOLS = {
  // SISTEMA DIGESTIVO
  constipacao: {
    condicao: 'Constipação Intestinal (Prisão de Ventre)',
    hidroterapia: [
      'Compressa quente no abdômen (15-20 min) antes de dormir',
      'Banho de assento frio (1-2 min) pela manhã para estimular peristaltismo',
      'Escalda-pés quente (38-40°C) por 15 min antes de dormir - relaxa sistema nervoso',
      'Banho alternado (quente-frio) 3x alternância no abdômen'
    ],
    fitoterapia: [
      'Sene (Cassia angustifolia): infusão de 2g em 200ml - tomar à noite',
      'Cáscara sagrada (Rhamnus purshiana): 300-500mg em cápsulas ao deitar',
      'Linhaça dourada: 1-2 colheres de sopa trituradas com água pela manhã',
      'Mamão com aveia: 1 xícara em jejum',
      'Tamarindo: suco ou polpa, laxante suave'
    ],
    alimentacao: [
      'Aumentar fibras: aveia, linhaça, chia, frutas com casca',
      'Mamão papaia em jejum diariamente',
      'Ameixa preta (deixar de molho overnight)',
      'Água: mínimo 2 litros/dia, especialmente em jejum (2 copos)',
      'Evitar: farinhas brancas, alimentos processados, queijos'
    ],
    habitos: [
      'Estabelecer horário regular para evacuação',
      'Massagem abdominal circular (sentido horário) 5-10 min/dia',
      'Exercícios abdominais leves',
      'Caminhar 30 min/dia estimula peristaltismo',
      'Respiração abdominal profunda'
    ],
    observacoes: 'Se persistir por mais de 3 dias, investigar causas. Uso prolongado de laxantes pode criar dependência.',
    referencia: 'Manual Prático de Tratamentos Naturais - Dr. Daniel Boarim, 2014, p. 89-92'
  },

  gastrite: {
    condicao: 'Gastrite e Úlcera Gástrica',
    hidroterapia: [
      'Compressa quente no epigástrio por 20 min após refeições',
      'Banho de tronco frio (2-3 min) - anti-inflamatório',
      'Compressa de argila no estômago (30-40 min) - cicatrizante',
      'Evitar banhos muito quentes que aumentam acidez'
    ],
    fitoterapia: [
      'Espinheira-santa (Maytenus ilicifolia): chá 3x/dia antes refeições - cicatrizante',
      'Camomila (Matricaria chamomilla): infusão após refeições - calmante gástrico',
      'Calêndula (Calendula officinalis): chá 3x/dia - anti-inflamatório',
      'Suco de batata crua: 50ml em jejum - alcalinizante e protetor',
      'Suco de couve: 100ml 2x/dia - rico em vitamina U (cicatrizante)'
    ],
    alimentacao: [
      'Dieta branda: purês, sopas, mingaus',
      'Evitar: café, álcool, frituras, condimentos fortes, refrigerantes',
      'Banana prata ou maçã cozida - protetoras da mucosa',
      'Água de coco - alcalinizante natural',
      'Refeições pequenas e frequentes (5-6x/dia)',
      'Mastigar bem os alimentos'
    ],
    suplementacao: [
      'Glutamina 5g 2x/dia - repara mucosa intestinal',
      'Óleo de linhaça 1 colher/dia - anti-inflamatório',
      'Própolis: 20 gotas 3x/dia - antibacteriano (H. pylori)'
    ],
    observacoes: 'Eliminar estresse e ansiedade. Investigar H. pylori se sintomas persistirem. Evitar AINEs.',
    referencia: 'Manual Prático de Tratamentos Naturais - Dr. Daniel Boarim, 2014, p. 112-116'
  },

  // SISTEMA RESPIRATÓRIO
  bronquite: {
    condicao: 'Bronquite e Tosse',
    hidroterapia: [
      'Inalação com eucalipto: 5 gotas óleo essencial em água quente, 10-15 min',
      'Compressa quente no peito por 20 min (facilita expectoração)',
      'Banho de vapor 2x/dia',
      'Gargarejo com água morna e sal 3x/dia'
    ],
    fitoterapia: [
      'Guaco (Mikania glomerata): xarope ou chá 3-4x/dia - broncodilatador',
      'Própolis: 30 gotas em água morna 3x/dia - antibiótico natural',
      'Agrião: suco fresco 50ml 2x/dia - expectorante',
      'Gengibre com mel e limão: chá quente 3x/dia',
      'Alho: 2-3 dentes crus/dia - antibiótico e expectorante'
    ],
    alimentacao: [
      'Aumentar líquidos: chás, sucos, água (2-3 litros/dia)',
      'Mel puro: 1 colher 3x/dia',
      'Cebola roxa: expectorante natural',
      'Evitar: laticínios (aumentam muco), açúcar refinado, frituras'
    ],
    suplementacao: [
      'Vitamina C: 1000mg 3x/dia',
      'Zinco: 30mg/dia - imunidade',
      'N-acetilcisteína (NAC): 600mg 2x/dia - mucolítico'
    ],
    observacoes: 'Se febre alta ou falta de ar, procurar atendimento médico. Evitar fumaça e ar frio.',
    referencia: 'Manual Prático de Tratamentos Naturais - Dr. Daniel Boarim, 2014, p. 64-68'
  },

  // SISTEMA URINÁRIO
  infeccao_urinaria: {
    condicao: 'Infecção Urinária (Cistite)',
    hidroterapia: [
      'Banho de assento quente (38-40°C) com camomila por 15-20 min',
      'Compressa quente na região pélvica',
      'Banho de assento alternado (quente-frio) - 3x alternância',
      'Aumentar ingestão hídrica significativamente'
    ],
    fitoterapia: [
      'Cavalinha (Equisetum arvense): chá 4-5x/dia - diurético',
      'Cranberry: suco puro 200ml 2x/dia ou cápsulas',
      'Quebra-pedra (Phyllanthus niruri): chá 3x/dia',
      'Chapéu-de-couro (Echinodorus macrophyllus): chá diurético',
      'Uva-ursi (Arctostaphylos uva-ursi): antimicrobiano urinário'
    ],
    alimentacao: [
      'Água: mínimo 3 litros/dia - diluir e eliminar bactérias',
      'Água de coco: 500ml/dia - alcaliniza urina',
      'Melancia, pepino, chuchu: alimentos diuréticos',
      'Evitar: café, álcool, açúcar, alimentos picantes'
    ],
    suplementacao: [
      'Vitamina C: 1000mg 3x/dia - acidifica urina (bacteriostático)',
      'D-Manose: 2g 3x/dia - impede aderência de E. coli',
      'Probióticos: manter flora saudável'
    ],
    observacoes: 'Se sangue na urina, febre alta ou dor intensa, procurar médico urgente. Higiene íntima adequada.',
    referencia: 'Manual Prático de Tratamentos Naturais - Dr. Daniel Boarim, 2014, p. 148-152'
  },

  // SISTEMA CIRCULATÓRIO
  hipertensao: {
    condicao: 'Hipertensão Arterial',
    hidroterapia: [
      'Banho de imersão morno (36-37°C) por 15-20 min - relaxante',
      'Escalda-pés quente (40°C) por 15 min ao deitar',
      'Compressa fria na nuca por 10 min',
      'Banho alternado nos braços (quente-frio)'
    ],
    fitoterapia: [
      'Alho: 2-3 dentes crus/dia ou cápsulas 600-900mg',
      'Hibisco (Hibiscus sabdariffa): chá 2-3x/dia - vasodilatador',
      'Oliveira (Olea europaea): chá das folhas 2x/dia',
      'Carqueja (Baccharis trimera): chá diurético',
      'Maracujá: suco natural ou chá das folhas - calmante'
    ],
    alimentacao: [
      'Dieta DASH: rica em frutas, vegetais, grãos integrais',
      'Reduzir sódio: máximo 2g/dia, evitar sal de cozinha',
      'Aumentar potássio: banana, abacate, batata-doce',
      'Magnésio: folhas verdes escuras, nozes, sementes',
      'Evitar: embutidos, enlatados, fast-food, álcool'
    ],
    suplementacao: [
      'Magnésio: 400-500mg/dia',
      'Ômega-3: 2000mg/dia - anti-inflamatório',
      'CoQ10: 100-200mg/dia - proteção cardiovascular',
      'Alho envelhecido: 600mg 2x/dia'
    ],
    habitos: [
      'Exercício aeróbico 30-45 min, 5x/semana',
      'Técnicas de relaxamento: meditação, yoga',
      'Sono adequado: 7-8 horas/noite',
      'Eliminar tabagismo',
      'Controle de peso'
    ],
    observacoes: 'Monitorar PA regularmente. Não suspender medicação sem orientação médica. Reduzir estresse.',
    referencia: 'Manual Prático de Tratamentos Naturais - Dr. Daniel Boarim, 2014, p. 176-182'
  },

  // SISTEMA NERVOSO
  insonia: {
    condicao: 'Insônia e Distúrbios do Sono',
    hidroterapia: [
      'Banho morno (36-37°C) por 15-20 min antes de dormir',
      'Escalda-pés quente (40°C) com lavanda por 15 min',
      'Compressa fria na testa ao deitar',
      'Banho de assento quente antes de dormir'
    ],
    fitoterapia: [
      'Maracujá (Passiflora incarnata): chá ou tintura 30 min antes de dormir',
      'Camomila (Matricaria chamomilla): chá quente à noite',
      'Valeriana (Valeriana officinalis): cápsulas 300-600mg 1h antes',
      'Melissa (Melissa officinalis): chá calmante',
      'Lavanda: óleo essencial no travesseiro ou difusor'
    ],
    alimentacao: [
      'Ceia leve 2h antes de dormir',
      'Alimentos ricos em triptofano: banana, aveia, mel',
      'Chá de alface: sedativo natural',
      'Evitar: cafeína após 14h, açúcar à noite, refeições pesadas'
    ],
    suplementacao: [
      'Melatonina: 3-5mg 30 min antes de dormir',
      'Magnésio: 300-400mg à noite - relaxante muscular',
      'L-teanina: 200mg - promove relaxamento',
      'Vitamina B6: 50mg - síntese de serotonina'
    ],
    habitos: [
      'Rotina regular: dormir e acordar no mesmo horário',
      'Quarto escuro, silencioso e fresco (18-20°C)',
      'Evitar telas 1h antes de dormir (luz azul)',
      'Leitura relaxante',
      'Exercícios de respiração: 4-7-8',
      'Meditação ou oração'
    ],
    observacoes: 'Investigar causas: ansiedade, depressão, apneia do sono. Evitar soníferos químicos prolongadamente.',
    referencia: 'Manual Prático de Tratamentos Naturais - Dr. Daniel Boarim, 2014, p. 201-206'
  },

  // SISTEMA IMUNOLÓGICO
  gripe_resfriado: {
    condicao: 'Gripe e Resfriado',
    hidroterapia: [
      'Banho quente seguido de fricção fria - estimula imunidade',
      'Inalação com eucalipto 3-4x/dia',
      'Escalda-pés quente por 15-20 min',
      'Compressa quente no peito e costas'
    ],
    fitoterapia: [
      'Equinácea (Echinacea purpurea): tintura ou cápsulas nos primeiros sinais',
      'Gengibre: chá com limão e mel 4-5x/dia',
      'Alho: 3-4 dentes crus/dia - antiviral potente',
      'Própolis: 30-40 gotas 3x/dia',
      'Sabugueiro (Sambucus nigra): xarope - reduz duração'
    ],
    alimentacao: [
      'Canja de galinha caseira com vegetais',
      'Sopas quentes',
      'Frutas cítricas: laranja, limão, acerola (vitamina C)',
      'Líquidos abundantes: chás, água, sucos',
      'Evitar: laticínios, açúcar, alimentos processados'
    ],
    suplementacao: [
      'Vitamina C: 1000mg a cada 4h (dose de ataque)',
      'Zinco: 30mg/dia - reduz duração',
      'Vitamina D3: 5000UI/dia',
      'Ômega-3: anti-inflamatório'
    ],
    habitos: [
      'Repouso adequado - essencial para recuperação',
      'Lavar mãos frequentemente',
      'Evitar ambientes fechados e aglomerados',
      'Umidificar ambiente'
    ],
    observacoes: 'Se febre persistente (>3 dias), falta de ar ou piora, procurar médico. Iniciar tratamento nos primeiros sinais.',
    referencia: 'Manual Prático de Tratamentos Naturais - Dr. Daniel Boarim, 2014, p. 56-61'
  },

  // METABOLISMO
  diabetes: {
    condicao: 'Diabetes Mellitus (Suporte Natural)',
    hidroterapia: [
      'Banho de imersão morno diário',
      'Fricção fria matinal - estimula metabolismo',
      'Compressa de argila no pâncreas (região epigástrica)',
      'Cuidados especiais com pés (banhos e inspeção)'
    ],
    fitoterapia: [
      'Pata-de-vaca (Bauhinia forficata): chá 3x/dia - hipoglicemiante',
      'Jambolão (Syzygium cumini): chá ou tintura',
      'Canela: 1-2g/dia - melhora sensibilidade insulínica',
      'Carqueja: chá regulador',
      'Melão-de-são-caetano: suco moderado'
    ],
    alimentacao: [
      'Baixo índice glicêmico: grãos integrais, legumes, vegetais',
      'Aumentar fibras: aveia, linhaça, chia',
      'Proteínas magras em cada refeição',
      'Gorduras boas: abacate, castanhas, azeite',
      'Evitar: açúcar, farinha branca, refrigerantes, doces',
      'Fracionamento: 5-6 refeições pequenas/dia'
    ],
    suplementacao: [
      'Cromo picolinato: 200-400mcg/dia',
      'Ácido alfa-lipóico: 600mg/dia - proteção neuropática',
      'Magnésio: 400mg/dia',
      'Ômega-3: anti-inflamatório',
      'Canela: cápsulas 500mg 3x/dia'
    ],
    habitos: [
      'Exercício físico regular: 30-45 min, 5x/semana',
      'Monitorar glicemia conforme orientação',
      'Controle de peso',
      'Gerenciamento de estresse',
      'Sono adequado'
    ],
    observacoes: 'Nunca suspender medicação sem orientação médica. Monitorar glicemia regularmente. Cuidar dos pés diariamente.',
    referencia: 'Manual Prático de Tratamentos Naturais - Dr. Daniel Boarim, 2014, p. 225-232'
  }
};

/**
 * Obtém protocolo do Dr. Boarim por condição
 */
export function getBoarimProtocol(condicao) {
  return BOARIM_PROTOCOLS[condicao] || null;
}

/**
 * Busca protocolos relacionados aos sintomas
 */
export function getBoarimProtocolsBySymptoms(symptoms) {
  const protocols = [];
  const symptomMap = {
    'constipação': ['constipacao'],
    'prisão de ventre': ['constipacao'],
    'intestino preso': ['constipacao'],
    'gastrite': ['gastrite'],
    'úlcera': ['gastrite'],
    'azia': ['gastrite'],
    'tosse': ['bronquite'],
    'bronquite': ['bronquite'],
    'gripe': ['gripe_resfriado'],
    'resfriado': ['gripe_resfriado'],
    'febre': ['gripe_resfriado'],
    'infecção urinária': ['infeccao_urinaria'],
    'cistite': ['infeccao_urinaria'],
    'pressão alta': ['hipertensao'],
    'hipertensão': ['hipertensao'],
    'insônia': ['insonia'],
    'diabetes': ['diabetes'],
    'glicose alta': ['diabetes']
  };

  symptoms.forEach(symptom => {
    const symptomLower = symptom.toLowerCase();
    Object.keys(symptomMap).forEach(key => {
      if (symptomLower.includes(key)) {
        symptomMap[key].forEach(protocolKey => {
          if (BOARIM_PROTOCOLS[protocolKey] && !protocols.find(p => p.condicao === BOARIM_PROTOCOLS[protocolKey].condicao)) {
            protocols.push(BOARIM_PROTOCOLS[protocolKey]);
          }
        });
      }
    });
  });

  return protocols;
}

/**
 * Lista todas as condições disponíveis
 */
export function getAllBoarimConditions() {
  return Object.keys(BOARIM_PROTOCOLS).map(key => BOARIM_PROTOCOLS[key].condicao);
}
