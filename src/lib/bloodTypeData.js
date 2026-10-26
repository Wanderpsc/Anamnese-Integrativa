/**
 * Dados de Biorressonância por Tipo Sanguíneo
 * Baseado em: TIPO SANGUÍNEO - ANAMNESE CONFORME BIORRESSONÂNCIA.pdf
 */

export const BLOOD_TYPE_BIORESONANCE_DATA = {
  'A+': {
    name: 'A Positivo',
    frequency: '28%',
    characteristics: {
      metabolism: 'Metabolismo mais lento, tendência a acumular gordura',
      digestion: 'Dificuldade em digerir carnes vermelhas e laticínios',
      immunity: 'Sistema imune sensível, propensão a alergias',
      energy: 'Energia moderada, necessita de atividade física regular'
    },
    recommendations: {
      diet: [
        'Dieta vegetariana ou com pouca carne',
        'Peixes e frutos do mar (salmão, sardinha)',
        'Vegetais verdes (brócolis, espinafre, couve)',
        'Grãos integrais (arroz integral, quinoa)',
        'Leguminosas (lentilha, grão de bico)',
        'Frutas (abacaxi, limão, cereja)'
      ],
      avoid: [
        'Carnes vermelhas (boi, porco)',
        'Laticínios integrais',
        'Trigo em excesso',
        'Alimentos processados',
        'Açúcar refinado',
        'Café em excesso'
      ],
      supplements: [
        'Vitamina B12 (500mcg/dia)',
        'Vitamina D3 (2000-5000 UI)',
        'Ômega-3 (2-3g/dia)',
        'Probióticos (50 bilhões UFC)',
        'Enzimas digestivas',
        'Magnésio (400mg)'
      ],
      herbs: [
        'Chá verde - antioxidante',
        'Gengibre - digestão',
        'Cúrcuma - anti-inflamatório',
        'Alho - imunidade',
        'Dente-de-leão - fígado',
        'Camomila - estresse'
      ],
      exercise: [
        'Yoga (ideal)',
        'Tai Chi',
        'Caminhadas leves',
        'Natação',
        'Pilates',
        'Meditação diária'
      ]
    },
    tendencies: {
      positive: [
        'Boa adaptação a dieta vegetariana',
        'Sistema digestivo sensível mas eficiente',
        'Responde bem a práticas meditativas'
      ],
      negative: [
        'Tendência a ansiedade e estresse',
        'Propensão a diabetes tipo 2',
        'Risco de doenças cardiovasculares',
        'Cortisol elevado'
      ]
    },
    tcm: {
      pattern: 'Deficiência de Qi do Baço e Estômago',
      organs: ['Baço', 'Estômago', 'Fígado'],
      recommendations: [
        'Tonificar Baço: E36, BP6',
        'Acalmar Fígado: F3, VB34',
        'Fortalecer digestão: E25, BP4'
      ]
    },
    ayurveda: {
      dosha: 'Kapha predominante',
      recommendations: [
        'Evitar Kapha (pesado, frio, oleoso)',
        'Aumentar Pitta (digestivo)',
        'Especiarias quentes (gengibre, pimenta)'
      ]
    }
  },

  'A-': {
    name: 'A Negativo',
    frequency: '6%',
    characteristics: {
      metabolism: 'Metabolismo lento, sensibilidade aumentada',
      digestion: 'Digestão delicada, requer cuidados especiais',
      immunity: 'Sistema imune muito sensível',
      energy: 'Energia variável, necessita equilíbrio'
    },
    recommendations: {
      diet: [
        'Dieta predominantemente vegetariana',
        'Peixes de água fria (salmão selvagem)',
        'Vegetais orgânicos',
        'Grãos sem glúten (arroz, quinoa)',
        'Sementes (linhaça, chia)',
        'Frutas de baixo índice glicêmico'
      ],
      avoid: [
        'Carnes vermelhas',
        'Laticínios',
        'Glúten',
        'Alimentos processados',
        'Açúcar',
        'Estimulantes'
      ],
      supplements: [
        'Vitamina B12 (1000mcg sublingual)',
        'Ferro quelado (30mg)',
        'Vitamina D3 (5000 UI)',
        'Ômega-3 (3-4g/dia)',
        'Probióticos de alta potência',
        'Zinco (30mg)'
      ],
      herbs: [
        'Astrágalo - imunidade',
        'Equinácea - defesa',
        'Reishi - adaptógeno',
        'Alcaçuz - adrenais',
        'Rhodiola - energia'
      ],
      exercise: [
        'Yoga suave',
        'Meditação',
        'Caminhadas na natureza',
        'Tai Chi',
        'Alongamentos'
      ]
    },
    tendencies: {
      positive: [
        'Alta sensibilidade energética',
        'Boa resposta a terapias naturais'
      ],
      negative: [
        'Anemia frequente',
        'Fadiga crônica',
        'Sensibilidade a estresse',
        'Alergias múltiplas'
      ]
    },
    tcm: {
      pattern: 'Deficiência de Qi e Sangue',
      organs: ['Baço', 'Fígado', 'Rim'],
      recommendations: [
        'Nutrir Sangue: BP6, B20, B21',
        'Tonificar Qi: E36, VG20',
        'Fortalecer Rim: R3, B23'
      ]
    }
  },

  'B+': {
    name: 'B Positivo',
    frequency: '20%',
    characteristics: {
      metabolism: 'Metabolismo equilibrado, boa adaptação',
      digestion: 'Sistema digestivo robusto',
      immunity: 'Sistema imune forte e adaptável',
      energy: 'Alta energia, resistência física'
    },
    recommendations: {
      diet: [
        'Dieta balanceada e variada',
        'Carnes magras (cordeiro, coelho)',
        'Peixes e frutos do mar',
        'Laticínios com moderação',
        'Vegetais verdes',
        'Grãos integrais',
        'Frutas variadas'
      ],
      avoid: [
        'Frango (lectinas)',
        'Milho em excesso',
        'Trigo (moderação)',
        'Amendoim',
        'Sementes de gergelim',
        'Alimentos processados'
      ],
      supplements: [
        'Magnésio (400mg)',
        'Vitamina C (1-2g)',
        'Complexo B',
        'Zinco (30mg)',
        'Ômega-3 (2g/dia)',
        'Probióticos'
      ],
      herbs: [
        'Ginseng - energia',
        'Alcaçuz - equilíbrio',
        'Gengibre - digestão',
        'Ginkgo Biloba - circulação',
        'Eleuthero - resistência'
      ],
      exercise: [
        'Exercícios moderados a intensos',
        'Corrida',
        'Ciclismo',
        'Natação',
        'Artes marciais',
        'Tenis, futebol'
      ]
    },
    tendencies: {
      positive: [
        'Boa adaptabilidade',
        'Sistema imune forte',
        'Digestão eficiente',
        'Energia estável'
      ],
      negative: [
        'Tendência a ganho de peso (se sedentário)',
        'Risco de diabetes (com dieta ruim)',
        'Infecções urinárias'
      ]
    },
    tcm: {
      pattern: 'Qi e Yang equilibrados',
      organs: ['Rim', 'Fígado', 'Baço'],
      recommendations: [
        'Manter equilíbrio: E36, BP6',
        'Fortalecer Rim: R3, VG4',
        'Regular Fígado: F3, VB34'
      ]
    },
    ayurveda: {
      dosha: 'Pitta-Vata equilibrado',
      recommendations: [
        'Manter equilíbrio dos doshas',
        'Rotina regular',
        'Alimentação variada'
      ]
    }
  },

  'B-': {
    name: 'B Negativo',
    frequency: '2%',
    characteristics: {
      metabolism: 'Metabolismo eficiente mas sensível',
      digestion: 'Boa digestão com algumas restrições',
      immunity: 'Sistema imune forte mas pode ser hiperativo',
      energy: 'Energia alta com necessidade de equilíbrio'
    },
    recommendations: {
      diet: [
        'Carnes magras (exceto frango)',
        'Peixes variados',
        'Ovos',
        'Laticínios fermentados (iogurte, kefir)',
        'Vegetais crucíferos',
        'Frutas orgânicas'
      ],
      avoid: [
        'Frango',
        'Milho',
        'Trigo em excesso',
        'Amendoim',
        'Tomate (moderação)',
        'Café em excesso'
      ],
      supplements: [
        'Magnésio (400-600mg)',
        'Vitamina D3 (5000 UI)',
        'Vitamina B12 (500mcg)',
        'Ômega-3 (3g/dia)',
        'Probióticos',
        'CoQ10 (100mg)'
      ],
      herbs: [
        'Rhodiola - adaptógeno',
        'Ashwagandha - equilíbrio',
        'Schisandra - resistência',
        'Cordyceps - energia',
        'Bacopa - mental'
      ],
      exercise: [
        'Exercícios variados',
        'Yoga dinâmico',
        'Musculação moderada',
        'Caminhadas longas',
        'Dança',
        'Esportes coletivos'
      ]
    },
    tendencies: {
      positive: [
        'Versatilidade alimentar',
        'Boa recuperação física',
        'Sistema imune robusto'
      ],
      negative: [
        'Risco de doenças autoimunes',
        'Sensibilidade a lectinas',
        'Tendência a inflamação'
      ]
    },
    tcm: {
      pattern: 'Yang forte, necessita equilíbrio Yin',
      organs: ['Rim', 'Fígado'],
      recommendations: [
        'Nutrir Yin: R3, R6, BP6',
        'Acalmar Yang: F3, R1',
        'Equilibrar: VB20, VG20'
      ]
    }
  },

  'O+': {
    name: 'O Positivo',
    frequency: '38%',
    characteristics: {
      metabolism: 'Metabolismo rápido, queima calorias eficientemente',
      digestion: 'Excelente para proteínas animais',
      immunity: 'Sistema imune muito forte',
      energy: 'Alta energia, força física'
    },
    recommendations: {
      diet: [
        'Carnes magras (boi, cordeiro)',
        'Peixes gordos (salmão, atum)',
        'Frutos do mar',
        'Vegetais verdes',
        'Batata-doce',
        'Frutas (exceto coco, melão)',
        'Azeite de oliva'
      ],
      avoid: [
        'Laticínios (maioria)',
        'Trigo e glúten',
        'Milho',
        'Feijão (exceto azuki)',
        'Repolho, couve-flor',
        'Café em excesso'
      ],
      supplements: [
        'Vitamina B (complexo)',
        'Vitamina K',
        'Iodo (algas)',
        'Cálcio (300mg)',
        'Magnésio (400mg)',
        'Probióticos'
      ],
      herbs: [
        'Fucus (algas - tireoide)',
        'Gengibre - circulação',
        'Caiena - metabolismo',
        'Dente-de-leão - fígado',
        'Hortelã - digestão'
      ],
      exercise: [
        'Exercícios intensos (ideal)',
        'Corrida',
        'Musculação pesada',
        'CrossFit',
        'Artes marciais',
        'HIIT'
      ]
    },
    tendencies: {
      positive: [
        'Força física superior',
        'Metabolismo acelerado',
        'Recuperação rápida',
        'Resistência a doenças'
      ],
      negative: [
        'Tendência a úlceras',
        'Hiper-acidez gástrica',
        'Problemas de tireoide (hipotireoidismo)',
        'Inflamação excessiva',
        'Coagulação excessiva'
      ]
    },
    tcm: {
      pattern: 'Yang forte, Calor no Estômago',
      organs: ['Estômago', 'Fígado', 'Vesícula'],
      recommendations: [
        'Regular Yang: F2, E44',
        'Drenar Calor: IG11, E25',
        'Fortalecer Baço: E36, BP3'
      ]
    },
    ayurveda: {
      dosha: 'Pitta predominante',
      recommendations: [
        'Pacificar Pitta (calor)',
        'Evitar alimentos muito quentes',
        'Incluir sabores amargos e adstringentes'
      ]
    }
  },

  'O-': {
    name: 'O Negativo',
    frequency: '6%',
    characteristics: {
      metabolism: 'Metabolismo muito rápido',
      digestion: 'Digestão forte para proteínas',
      immunity: 'Sistema imune extremamente potente',
      energy: 'Energia muito alta, necessita descarregar'
    },
    recommendations: {
      diet: [
        'Carnes orgânicas (prioritário)',
        'Peixes selvagens',
        'Ovos',
        'Vegetais de folhas verdes',
        'Batata-doce, inhame',
        'Frutas vermelhas',
        'Nozes e castanhas'
      ],
      avoid: [
        'Todos os laticínios',
        'Glúten',
        'Milho',
        'Soja',
        'Amendoim',
        'Café'
      ],
      supplements: [
        'Vitamina B12 (1000mcg)',
        'Iodo (150mcg)',
        'Vitamina K2 (100mcg)',
        'Magnésio (500mg)',
        'Ômega-3 (3-4g)',
        'Zinco (30mg)'
      ],
      herbs: [
        'Fucus vesiculosus - tireoide',
        'Rhodiola - adaptógeno',
        'Tribulus - testosterona',
        'Maca - energia',
        'Saw Palmetto - próstata (homens)'
      ],
      exercise: [
        'Exercícios de alta intensidade',
        'Levantamento de peso',
        'Sprints',
        'CrossFit avançado',
        'Boxe, MMA',
        'Ciclismo intenso'
      ]
    },
    tendencies: {
      positive: [
        'Doador universal',
        'Força excepcional',
        'Metabolismo acelerado',
        'Alta resistência'
      ],
      negative: [
        'Acidez gástrica severa',
        'Úlceras frequentes',
        'Hipotireoidismo',
        'Inflamação crônica',
        'Agressividade (se desequilibrado)'
      ]
    },
    tcm: {
      pattern: 'Yang exuberante, Calor-Fogo',
      organs: ['Estômago', 'Fígado', 'Rim'],
      recommendations: [
        'Drenar Fogo: F2, C8, E44',
        'Nutrir Yin: R3, R6, BP6',
        'Acalmar Espírito: C7, PC6'
      ]
    },
    ayurveda: {
      dosha: 'Pitta muito elevado',
      recommendations: [
        'Resfriar Pitta urgentemente',
        'Meditação obrigatória',
        'Evitar competitividade excessiva'
      ]
    }
  },

  'AB+': {
    name: 'AB Positivo',
    frequency: '6%',
    characteristics: {
      metabolism: 'Metabolismo variável, adaptável',
      digestion: 'Sistema digestivo sensível mas versátil',
      immunity: 'Sistema imune adaptável mas pode ser fraco',
      energy: 'Energia moderada, variável'
    },
    recommendations: {
      diet: [
        'Dieta mista balanceada',
        'Peixes e frutos do mar (prioritário)',
        'Tofu e derivados de soja',
        'Laticínios fermentados',
        'Vegetais variados',
        'Grãos diversos',
        'Frutas (maioria)'
      ],
      avoid: [
        'Carnes vermelhas (moderar)',
        'Frango (lectinas)',
        'Milho',
        'Trigo (excesso)',
        'Cafeína em excesso',
        'Álcool'
      ],
      supplements: [
        'Vitamina C (2-3g/dia)',
        'Vitamina E (400 UI)',
        'Selênio (200mcg)',
        'Zinco (30mg)',
        'Probióticos de amplo espectro',
        'Enzimas digestivas completas'
      ],
      herbs: [
        'Equinácea - imunidade',
        'Astrágalo - defesa',
        'Alcaçuz - equilíbrio',
        'Ginseng siberiano - energia',
        'Milk thistle - fígado'
      ],
      exercise: [
        'Exercícios moderados',
        'Yoga',
        'Tai Chi',
        'Caminhadas',
        'Natação leve',
        'Pilates'
      ]
    },
    tendencies: {
      positive: [
        'Receptor universal',
        'Versatilidade alimentar',
        'Adaptação rápida',
        'Sistema digestivo eficiente'
      ],
      negative: [
        'Sistema imune inconsistente',
        'Tendência a infecções',
        'Sensibilidade a estresse',
        'Risco de câncer (se desequilibrado)',
        'Problemas cardiovasculares'
      ]
    },
    tcm: {
      pattern: 'Qi e Sangue deficientes',
      organs: ['Baço', 'Estômago', 'Fígado'],
      recommendations: [
        'Tonificar Baço: E36, BP6',
        'Nutrir Sangue: BP10, B20',
        'Regular Fígado: F3, VB34'
      ]
    },
    ayurveda: {
      dosha: 'Tri-dóshico (necessita equilíbrio)',
      recommendations: [
        'Equilibrar todos os doshas',
        'Dieta sazonal',
        'Rotina regular'
      ]
    }
  },

  'AB-': {
    name: 'AB Negativo',
    frequency: '1%',
    characteristics: {
      metabolism: 'Metabolismo delicado, necessita atenção',
      digestion: 'Sistema digestivo muito sensível',
      immunity: 'Sistema imune frágil, necessita suporte',
      energy: 'Energia baixa a moderada'
    },
    recommendations: {
      diet: [
        'Peixes de água fria (salmão, sardinha)',
        'Tofu orgânico',
        'Laticínios fermentados (kefir, iogurte)',
        'Vegetais orgânicos',
        'Grãos sem glúten',
        'Frutas de baixo índice glicêmico',
        'Chás de ervas'
      ],
      avoid: [
        'Carnes vermelhas',
        'Frango',
        'Milho',
        'Trigo',
        'Cafeína',
        'Álcool',
        'Alimentos processados'
      ],
      supplements: [
        'Vitamina B12 (1000mcg sublingual)',
        'Vitamina D3 (5000 UI)',
        'Ômega-3 (3-4g/dia)',
        'Probióticos (100 bilhões UFC)',
        'Enzimas digestivas',
        'Glutamina (5g/dia)',
        'Vitamina C (3g/dia)'
      ],
      herbs: [
        'Equinácea - imunidade',
        'Astrágalo - resistência',
        'Reishi - adaptógeno',
        'Cordyceps - energia',
        'Tulsi (Holy Basil) - estresse'
      ],
      exercise: [
        'Exercícios suaves',
        'Yoga restaurativo',
        'Meditação diária',
        'Caminhadas leves',
        'Tai Chi',
        'Qigong'
      ]
    },
    tendencies: {
      positive: [
        'Tipo mais raro (1%)',
        'Alta sensibilidade espiritual',
        'Intuição desenvolvida'
      ],
      negative: [
        'Sistema imune fraco',
        'Fadiga crônica frequente',
        'Múltiplas sensibilidades',
        'Anemia comum',
        'Doenças autoimunes',
        'Alto risco cardiovascular'
      ]
    },
    tcm: {
      pattern: 'Deficiência severa de Qi, Sangue e Yin',
      organs: ['Baço', 'Fígado', 'Rim', 'Pulmão'],
      recommendations: [
        'Tonificação profunda: E36, BP6, R3',
        'Nutrir Sangue: BP10, B20, B21',
        'Fortalecer Wei Qi: P7, IG4',
        'Moxa regular: VG4, VG20'
      ]
    },
    ayurveda: {
      dosha: 'Vata muito desequilibrado',
      recommendations: [
        'Pacificar Vata (seco, frio, móvel)',
        'Alimentação quente e oleosa',
        'Rotina estrita',
        'Óleo de gergelim (abhyanga diário)'
      ]
    }
  }
};

/**
 * Análise cruzada entre tipo sanguíneo e sinais clínicos
 */
export const analyzeBloodTypeCompatibility = (bloodType, clinicalSigns) => {
  const bloodData = BLOOD_TYPE_BIORESONANCE_DATA[bloodType];
  if (!bloodData) return null;

  const analysis = {
    bloodType: bloodData.name,
    frequency: bloodData.frequency,
    compatibility: [],
    recommendations: []
  };

  // Análise de compatibilidade com sinais clínicos
  if (clinicalSigns.skinAnalysis?.faceAnalysis?.colorAnalysis) {
    const color = clinicalSigns.skinAnalysis.faceAnalysis.colorAnalysis;
    
    if (color.pale && (bloodType === 'A-' || bloodType === 'AB-')) {
      analysis.compatibility.push({
        sign: 'Palidez facial',
        bloodType: bloodData.name,
        correlation: 'ALTA - Tipo sanguíneo com tendência a anemia',
        priority: 'URGENTE',
        action: 'Suplementação de ferro imediata + B12'
      });
    }
  }

  if (clinicalSigns.nailAnalysis?.nailSigns) {
    const nailSigns = clinicalSigns.nailAnalysis.nailSigns;
    
    nailSigns.forEach(sign => {
      if (sign.sign.includes('Pálidas') && (bloodType.includes('-') || bloodType === 'A+')) {
        analysis.compatibility.push({
          sign: 'Unhas pálidas',
          bloodType: bloodData.name,
          correlation: 'Deficiência de ferro comum neste tipo sanguíneo',
          priority: 'ALTA',
          action: bloodData.recommendations.supplements.find(s => s.includes('Ferro')) || 'Ferro quelado 30mg'
        });
      }
    });
  }

  // Recomendações personalizadas
  analysis.recommendations = [
    {
      category: 'Dieta Personalizada',
      items: bloodData.recommendations.diet.slice(0, 5)
    },
    {
      category: 'Evitar',
      items: bloodData.recommendations.avoid.slice(0, 5)
    },
    {
      category: 'Suplementação Essencial',
      items: bloodData.recommendations.supplements.slice(0, 4)
    }
  ];

  return analysis;
};

export default BLOOD_TYPE_BIORESONANCE_DATA;
