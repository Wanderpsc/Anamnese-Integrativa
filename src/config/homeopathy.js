/**
 * Base de Dados de Homeopatia - EXPANDIDA
 * Remédios homeopáticos por condição e tipo constitucional
 * Mais de 80 condições de saúde com múltiplos remédios
 */

export const HOMEOPATHY_DATABASE = {
  // Condições Digestivas
  digestive: {
    title: 'Distúrbios Digestivos',
    remedies: [
      {
        name: 'Nux Vomica',
        potency: '30CH',
        indications: 'Dispepsia, azia, náuseas, constipação. Para pessoas estressadas, workaholics',
        dosage: '5 glóbulos 3x/dia',
        duration: '15-30 dias',
        contraindications: 'Gravidez (consultar profissional de saúde)'
      },
      {
        name: 'Carbo Vegetabilis',
        potency: '30CH',
        indications: 'Gases, distensão abdominal, digestão lenta',
        dosage: '5 glóbulos 3x/dia',
        duration: '15-30 dias'
      },
      {
        name: 'Lycopodium',
        potency: '30CH',
        indications: 'Gases, inchaço após comer, fígado sobrecarregado',
        dosage: '5 glóbulos 2x/dia',
        duration: '30 dias'
      },
      {
        name: 'Arsenicum Album',
        potency: '30CH',
        indications: 'Gastrite, diarreia, intoxicação alimentar',
        dosage: '5 glóbulos de 2 em 2 horas (fase aguda)',
        duration: '3-7 dias'
      }
    ]
  },

  // Ansiedade e Estresse
  anxiety: {
    title: 'Ansiedade e Estresse',
    remedies: [
      {
        name: 'Ignatia Amara',
        potency: '30CH',
        indications: 'Ansiedade emocional, luto, tristeza, nó na garganta',
        dosage: '5 glóbulos 3x/dia',
        duration: '15-30 dias'
      },
      {
        name: 'Gelsemium',
        potency: '30CH',
        indications: 'Ansiedade antecipatória, medo de palco, tremores',
        dosage: '5 glóbulos antes de situações estressantes',
        duration: 'Conforme necessário'
      },
      {
        name: 'Argentum Nitricum',
        potency: '30CH',
        indications: 'Ansiedade com diarreia, medo de lugares fechados',
        dosage: '5 glóbulos 3x/dia',
        duration: '15-30 dias'
      },
      {
        name: 'Aconitum Napellus',
        potency: '200CH',
        indications: 'Crise de pânico, medo intenso súbito',
        dosage: '5 glóbulos dose única (repetir se necessário)',
        duration: '1-3 doses'
      }
    ]
  },

  // Sono e Insônia
  sleep: {
    title: 'Distúrbios do Sono',
    remedies: [
      {
        name: 'Coffea Cruda',
        potency: '30CH',
        indications: 'Insônia por mente hiperativa, excesso de pensamentos',
        dosage: '5 glóbulos antes de dormir',
        duration: '15-30 dias'
      },
      {
        name: 'Passiflora',
        potency: '6CH',
        indications: 'Insônia leve, agitação noturna',
        dosage: '10 glóbulos antes de dormir',
        duration: '30 dias'
      },
      {
        name: 'Valeriana',
        potency: '6CH',
        indications: 'Dificuldade para adormecer, sono agitado',
        dosage: '10 glóbulos 1h antes de dormir',
        duration: '30 dias'
      }
    ]
  },

  // Dores Articulares e Musculares
  musculoskeletal: {
    title: 'Dores Articulares e Musculares',
    remedies: [
      {
        name: 'Arnica Montana',
        potency: '30CH',
        indications: 'Traumas, contusões, dores musculares pós-exercício',
        dosage: '5 glóbulos 4x/dia',
        duration: '3-7 dias'
      },
      {
        name: 'Rhus Toxicodendron',
        potency: '30CH',
        indications: 'Artrite, rigidez que melhora com movimento',
        dosage: '5 glóbulos 3x/dia',
        duration: '15-30 dias'
      },
      {
        name: 'Bryonia Alba',
        potency: '30CH',
        indications: 'Dores que pioram com movimento, artrite',
        dosage: '5 glóbulos 3x/dia',
        duration: '15-30 dias'
      },
      {
        name: 'Ruta Graveolens',
        potency: '30CH',
        indications: 'Tendinite, lesões de tendões e ligamentos',
        dosage: '5 glóbulos 3x/dia',
        duration: '15-30 dias'
      }
    ]
  },

  // Alergias e Rinite
  allergies: {
    title: 'Alergias e Rinite',
    remedies: [
      {
        name: 'Allium Cepa',
        potency: '30CH',
        indications: 'Rinite alérgica, coriza aquosa, espirros',
        dosage: '5 glóbulos 3x/dia',
        duration: '15 dias'
      },
      {
        name: 'Sabadilla',
        potency: '30CH',
        indications: 'Espirros em salva, coceira no nariz',
        dosage: '5 glóbulos 3x/dia',
        duration: '15 dias'
      },
      {
        name: 'Histaminum',
        potency: '30CH',
        indications: 'Alergias em geral, urticária',
        dosage: '5 glóbulos 2x/dia',
        duration: '30 dias'
      }
    ]
  },

  // Gripe e Resfriado
  respiratory: {
    title: 'Gripe e Resfriado',
    remedies: [
      {
        name: 'Oscillococcinum',
        potency: '200K',
        indications: 'Início de gripe, sintomas virais',
        dosage: '1 dose completa',
        duration: '1-3 doses (início dos sintomas)'
      },
      {
        name: 'Belladonna',
        potency: '30CH',
        indications: 'Febre alta súbita, rosto vermelho, dor de garganta',
        dosage: '5 glóbulos de 2 em 2 horas',
        duration: '2-3 dias'
      },
      {
        name: 'Aconitum',
        potency: '30CH',
        indications: 'Início súbito de resfriado, calafrios',
        dosage: '5 glóbulos de 2 em 2 horas',
        duration: '24-48 horas'
      },
      {
        name: 'Bryonia',
        potency: '30CH',
        indications: 'Tosse seca, dores no peito, sede intensa',
        dosage: '5 glóbulos 4x/dia',
        duration: '5-7 dias'
      }
    ]
  },

  // Pele
  skin: {
    title: 'Problemas de Pele',
    remedies: [
      {
        name: 'Sulphur',
        potency: '30CH',
        indications: 'Eczema, coceira, pele seca e descamativa',
        dosage: '5 glóbulos 2x/dia',
        duration: '30-60 dias'
      },
      {
        name: 'Graphites',
        potency: '30CH',
        indications: 'Eczema com secreção, rachaduras na pele',
        dosage: '5 glóbulos 2x/dia',
        duration: '30-60 dias'
      },
      {
        name: 'Apis Mellifica',
        potency: '30CH',
        indications: 'Urticária, picadas de insetos, inchaço',
        dosage: '5 glóbulos de 2 em 2 horas (fase aguda)',
        duration: '2-3 dias'
      },
      {
        name: 'Calendula',
        potency: '6CH',
        indications: 'Cicatrização, feridas, queimaduras leves',
        dosage: '5 glóbulos 3x/dia + tintura tópica',
        duration: '7-15 dias'
      }
    ]
  },

  // Mulheres (TPM, Menopausa)
  womens_health: {
    title: 'Saúde da Mulher',
    remedies: [
      {
        name: 'Sepia',
        potency: '30CH',
        indications: 'TPM, irritabilidade, fadiga, ondas de calor',
        dosage: '5 glóbulos 2x/dia',
        duration: '30 dias'
      },
      {
        name: 'Pulsatilla',
        potency: '30CH',
        indications: 'TPM emocional, choro fácil, cólicas',
        dosage: '5 glóbulos 3x/dia',
        duration: 'Durante período menstrual'
      },
      {
        name: 'Lachesis',
        potency: '30CH',
        indications: 'Ondas de calor intensas, menopausa',
        dosage: '5 glóbulos 2x/dia',
        duration: '60 dias'
      },
      {
        name: 'Folliculinum',
        potency: '30CH',
        indications: 'Desequilíbrio hormonal, TPM severa',
        dosage: '5 glóbulos 1x/semana',
        duration: '3 meses'
      }
    ]
  },

  // === NOVAS CONDIÇÕES EXPANDIDAS ===

  // Hipertensão
  hypertension: {
    title: 'Hipertensão Arterial',
    remedies: [
      {
        name: 'Baryta Carbonica',
        potency: '30CH',
        indications: 'Hipertensão em idosos, arteriosclerose',
        dosage: '5 glóbulos 2x/dia',
        duration: '60 dias'
      },
      {
        name: 'Crataegus',
        potency: '6CH',
        indications: 'Hipertensão cardíaca, palpitações',
        dosage: '10 gotas 3x/dia',
        duration: 'Uso contínuo'
      },
      {
        name: 'Aurum Metallicum',
        potency: '30CH',
        indications: 'Hipertensão com depressão, sensação de peso no peito',
        dosage: '5 glóbulos 2x/dia',
        duration: '90 dias'
      }
    ]
  },

  // Diabetes
  diabetes: {
    title: 'Diabetes e Glicemia',
    remedies: [
      {
        name: 'Syzygium Jambolanum',
        potency: '3X',
        indications: 'Diabetes tipo 2, sede excessiva, úlceras',
        dosage: '10 gotas 3x/dia antes das refeições',
        duration: 'Uso contínuo com acompanhamento'
      },
      {
        name: 'Phosphoric Acid',
        potency: '30CH',
        indications: 'Diabetes com fadiga mental, fraqueza',
        dosage: '5 glóbulos 2x/dia',
        duration: '60 dias'
      },
      {
        name: 'Uranium Nitricum',
        potency: '30CH',
        indications: 'Diabetes com poliúria, emagrecimento',
        dosage: '5 glóbulos 2x/dia',
        duration: '90 dias'
      }
    ]
  }
};

/**
 * Busca remédios homeopáticos por sintomas
 */
export function getHomeopathicRemedies(conditions = []) {
  const recommendations = [];

  conditions.forEach(condition => {
    const category = HOMEOPATHY_DATABASE[condition];
    if (category) {
      recommendations.push({
        category: category.title,
        remedies: category.remedies
      });
    }
  });

  return recommendations;
}

/**
 * Busca remédio específico por nome ou condição
 * Busca primeiro no database expandido, depois no principal
 */
export function searchRemedy(searchTerm) {
  if (!searchTerm || searchTerm.trim().length === 0) return null;
  
  const term = searchTerm.toLowerCase().trim();
  
  // Importar database expandido
  const EXPANDED = require('./homeopathy-expanded').default;
  
  // Buscar no database expandido (por condição exata)
  for (const [condition, data] of Object.entries(EXPANDED)) {
    if (condition.toLowerCase() === term || condition.toLowerCase().includes(term)) {
      return {
        remedies: data.remedies,
        category: condition
      };
    }
  }
  
  // Buscar no database principal (por categoria)
  for (const category in HOMEOPATHY_DATABASE) {
    const cat = HOMEOPATHY_DATABASE[category];
    // Buscar pelo título da categoria
    if (cat.title && cat.title.toLowerCase().includes(term)) {
      return {
        remedies: cat.remedies,
        category: cat.title
      };
    }
    
    // Buscar por nome do remédio
    const found = cat.remedies?.find(r => 
      r.name.toLowerCase().includes(term) ||
      r.indications.toLowerCase().includes(term)
    );
    if (found) {
      return {
        remedies: [found],
        category: cat.title
      };
    }
  }
  
  // Busca parcial no expandido se não encontrou exato
  for (const [condition, data] of Object.entries(EXPANDED)) {
    const conditionWords = condition.toLowerCase().split(' ');
    const termWords = term.split(' ');
    
    const hasMatch = termWords.some(tw => 
      conditionWords.some(cw => cw.includes(tw) || tw.includes(cw))
    );
    
    if (hasMatch) {
      return {
        remedies: data.remedies,
        category: condition
      };
    }
  }
  
  return null;
}

/**
 * Instruções gerais de uso
 */
export const HOMEOPATHY_INSTRUCTIONS = {
  general: [
    'Tomar os glóbulos sublinguais (deixar dissolver sob a língua)',
    'Não tocar os glóbulos com as mãos (usar a tampa do frasco)',
    'Tomar 15 minutos antes ou depois de comer/beber',
    'Evitar café, menta e cânfora durante o tratamento',
    'Guardar longe de campos eletromagnéticos (celular, micro-ondas)'
  ],
  potencies: {
    '6CH': 'Ação mais física, sintomas agudos',
    '30CH': 'Uso geral, sintomas agudos e crônicos',
    '200CH': 'Ação mais profunda, sintomas emocionais e crônicos',
    '1M': 'Doses únicas, tratamento constitucional (somente com sugestão terapêutica)'
  },
  storage: [
    'Manter em local fresco e seco',
    'Proteger da luz solar direta',
    'Longe de odores fortes (perfumes, alimentos)',
    'Validade: geralmente 5 anos'
  ]
};

export default HOMEOPATHY_DATABASE;
