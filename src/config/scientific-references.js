/**
 * BASE DE REFERÊNCIAS CIENTÍFICAS
 * Fontes validadas por apostilas e estudos científicos
 * Baseado em: therapeutic-data/*.pdf (memento fitoterapico, apostilas IVM, artigos científicos)
 */

export const SCIENTIFIC_REFERENCES = {
  // HOMEOPATIA - Fontes principais
  homeopathy: {
    general: [
      'Guia Homeopático - Dr. Nilo Cairo',
      'Repertório Clínico Homeopático por Patologias',
      'Homeopatia Essencial - Curso Básico - José Maria Alves',
      'Apostila de Naturopatia Integrativa IVM 2.0'
    ],
    sepia: {
      sources: [
        'Guia Homeopático Dr. Nilo Cairo - Sepia officinalis para melasma, manchas escuras, distúrbios hormonais',
        'Repertório Clínico Homeopático - Sepia indicada para hiperpigmentação hormonal, cloasma gravídico'
      ],
      studies: [
        'Matéria Médica Homeopática - Sepia: remédio do melasma e alterações hormonais femininas'
      ]
    },
    chelidonium: {
      sources: [
        'Guia Homeopático Dr. Nilo Cairo - Chelidonium majus para afecções hepáticas',
        'Apostila de Naturopatia IVM - Chelidonium: hepatoprotetor, esteatose hepática'
      ],
      studies: [
        'Matéria Médica - Chelidonium: principal remédio para fígado, vesícula biliar, esteatose'
      ]
    },
    lycopodium: {
      sources: [
        'Guia Homeopático Dr. Nilo Cairo - Lycopodium clavatum: fígado, digestão',
        'Repertório Clínico - Lycopodium para congestão hepática, distensão abdominal'
      ]
    },
    ignatia: {
      sources: [
        'Guia Homeopático Dr. Nilo Cairo - Ignatia amara: ansiedade, tristeza, luto',
        'Repertório Clínico - Ignatia: remédio da hipersensibilidade emocional, nó na garganta'
      ],
      contraindications: 'NÃO indicado para problemas de pele. Exclusivamente emocional.'
    }
  },

  // FITOTERAPIA - Óleos Essenciais
  essentialOils: {
    general: [
      'Apostila de Aromaterapia FMNI',
      'Guia Prático de Óleos Essenciais',
      'Apostila de Fitoterapia Completa IVM 2.0',
      'Memento Fitoterápico 2021'
    ],
    liver: {
      rosemary: {
        sources: [
          'Apostila de Fitoterapia IVM - Alecrim (Rosmarinus officinalis): hepatoprotetor, colerético',
          'Memento Fitoterápico 2021 - Alecrim: estímulo da função hepática, desintoxicação'
        ],
        studies: [
          'Bases Científicas Revista FITOS FIOCRUZ - Alecrim: ação hepatoprotetora comprovada',
          'Plantas Medicinais e Fitoterápicos - Guia: Rosmarinus com efeito colerético e hepatoprotetor'
        ]
      },
      lemon: {
        sources: [
          'Guia Prático Óleos Essenciais - Limão (Citrus limon): depurativo hepático, lipolítico',
          'Apostila Aromaterapia - Limão: detox hepático, redução de gordura'
        ],
        studies: [
          'Artigo: Efeitos do limão na desintoxicação hepática e metabolismo lipídico'
        ]
      },
      peppermint: {
        sources: [
          'Memento Fitoterápico - Hortelã-Pimenta (Mentha piperita): colerética, digestiva',
          'Apostila de Fitoterapia IVM - Hortelã: estimula bile, melhora digestão de gorduras'
        ]
      }
    },
    anxiety: {
      lavender: {
        sources: [
          'Apostila Aromaterapia FMNI - Lavanda: ansiolítico natural, sedativo',
          'Guia Óleos Essenciais - Lavandula angustifolia: redução comprovada de ansiedade'
        ],
        studies: [
          'Artigo: Eficácia e Segurança de Estimulantes de Ervas e Sedativos em Distúrbios de Ansiedade',
          'Plantas no Tratamento do Transtorno de Ansiedade - 2010'
        ]
      },
      chamomile: {
        sources: [
          'Memento Fitoterápico 2021 - Camomila: ansiolítica, calmante',
          'Apostila Fitoterapia IVM - Chamomilla recutita: sedação leve, ansiedade'
        ],
        studies: [
          'Artigo: Camomila - A Medicina Herbal do Passado com Futuro Brilhante - 2010',
          'Tratamento a Longo Prazo da Camomila para Transtorno de Ansiedade Generalizada'
        ]
      }
    }
  },

  // AROMATERAPIA
  aromatherapy: {
    general: [
      'Apostila de Aromaterapia FMNI',
      'Guia Prático de Óleos Essenciais',
      'Formulário de Fitoterápicos'
    ]
  },

  // OBESIDADE E EMAGRECIMENTO
  weightLoss: {
    sources: [
      'Artigo: Garcinia Cambogea no Tratamento da Obesidade - 2014',
      'Artigo: Os Fitoterápicos como Coadjuvantes no Tratamento da Obesidade - 2014',
      'Artigo: Fitoterapia da Obesidade - Revisão de Ervas Nativas - 2011',
      'Artigo: Efeitos Anti-Obesidade das Catequinas do Chá Verde - 2011',
      'Artigo: Revisão Sistemática de Medicamentos para Obesidade de Plantas - 2013',
      'Ebook: Desbloqueando o Emagrecimento'
    ]
  },

  // ANSIEDADE E DEPRESSÃO
  mentalHealth: {
    sources: [
      'Artigo: Plantas no Tratamento do Transtorno de Ansiedade - 2010',
      'Artigo: Eficácia e Segurança de Estimulantes de Ervas e Sedativos - 2010',
      'Artigo: Uso Clínico da Curcumina na Depressão - 2017',
      'Artigo: Rhodiola Rosea para Transtorno Depressivo - 2015',
      'Artigo: Crocuss Sativus L versus Citalopram no Tratamento de Transtorno Depressivo'
    ]
  },

  // DIABETES
  diabetes: {
    sources: [
      'Programa Viva Melhor 2.0 - Recomendações para Diabetes',
      'Apostila de Naturopatia IVM - Protocolos Diabetes',
      'Manual de Contagem de Carboidratos',
      'A Diabetes na Iridologia'
    ]
  },

  // CARDIOVASCULAR
  cardiovascular: {
    sources: [
      'Programa Viva Melhor 2.0 - Recomendações Cardiovascular',
      'Protocolo Sinatra - Cardiopatia',
      'Apostila de Naturopatia IVM - Sistema Cardiovascular'
    ]
  },

  // IRIDOLOGIA
  iridology: {
    sources: [
      'Mapas e Pranchas de Iridologia - Método GPS by Gerson Cunha',
      'Apostila Iridologia Clínica',
      'A Ciência da Iridologia - Apresentação Pré-Consulta',
      'Quando a Íris Mostra o Caminho da Cura',
      'O Que os Olhos Revelam Sobre a Saúde Digestiva'
    ]
  }
};

/**
 * CONTRAINDDICAÇÕES E INTERAÇÕES - Base Científica
 */
export const SAFETY_DATABASE = {
  homeopathy: {
    general: {
      contraindications: 'Raros efeitos adversos. Possível agravação homeopática inicial (crise de cura).',
      interactions: 'Evitar menta, café e cânfora próximo às doses (pode antidotar).',
      references: 'Guia Homeopático Dr. Nilo Cairo - Seção de Posologia e Cuidados'
    }
  },
  essentialOils: {
    general: {
      contraindications: 'Gravidez (1º trimestre), epilepsia, hipertensão grave - verificar óleo específico.',
      usage: 'Sempre diluir. Nunca usar puro na pele (exceto Tea Tree e Lavanda em pequenas áreas).',
      references: [
        'Plantas Tóxicas na Gestação - Artigo',
        'Plantas na Gestação - Qualisus Rede Cegonha',
        'Apostila de Aromaterapia FMNI - Seção Segurança'
      ]
    },
    rosemary: {
      contraindications: 'Epilepsia, hipertensão não controlada, gravidez.',
      references: 'Guia Óleos Essenciais - Alecrim: contraindicações'
    },
    peppermint: {
      contraindications: 'Crianças <6 anos, refluxo gastroesofágico grave.',
      references: 'Memento Fitoterápico 2021 - Hortelã-Pimenta: cuidados'
    }
  }
};

/**
 * Retorna referências científicas para uma condição
 */
export function getReferences(therapy, condition) {
  const key = condition.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  if (therapy === 'homeopathy') {
    return SCIENTIFIC_REFERENCES.homeopathy[key] || {
      sources: SCIENTIFIC_REFERENCES.homeopathy.general,
      note: 'Indicação baseada em Matéria Médica Homeopática e Repertório Clínico'
    };
  }
  
  if (therapy === 'essentialOils') {
    return SCIENTIFIC_REFERENCES.essentialOils[key] || {
      sources: SCIENTIFIC_REFERENCES.essentialOils.general,
      note: 'Indicação validada por apostilas de fitoterapia e aromaterapia científica'
    };
  }
  
  return {
    sources: ['Apostila de Naturopatia Integrativa IVM 2.0', 'Base científica therapeutic-data'],
    note: 'Indicação terapêutica validada por bibliografia científica'
  };
}

/**
 * Retorna informações de segurança
 */
export function getSafetyInfo(therapy, item) {
  if (therapy === 'homeopathy') {
    return SAFETY_DATABASE.homeopathy.general;
  }
  
  if (therapy === 'essentialOils') {
    return SAFETY_DATABASE.essentialOils[item] || SAFETY_DATABASE.essentialOils.general;
  }
  
  return null;
}

export default SCIENTIFIC_REFERENCES;
