/**
 * PARTE 3 - CATEGORIAS FINAIS
 * Marcadores Tumorais, Marcadores Inflamatórios, Urina Tipo I, Gasometria
 */

// ==================== MARCADORES TUMORAIS ====================
export const MARCADORES_TUMORAIS = {
  cea: {
    nome: 'CEA (Antígeno Carcinoembrionário)',
    unidade: 'ng/mL',
    referencia: { 
      nao_fumante: '<3.0',
      fumante: '<5.0'
    },
    ideal: '<2.0',
    interpretacao: {
      alto: {
        significado: 'Possível neoplasia coloretal ou outras',
        causas: ['Câncer colorretal', 'Câncer pancreático', 'Câncer gástrico', 'Câncer de pulmão', 'Câncer de mama', 'Tabagismo', 'Cirrose', 'Doença inflamatória intestinal'],
        predisposicoes: ['Neoplasia'],
        orientacoes: ['Colonoscopia se >10', 'TC se suspeita', 'Usado para monitoramento de recorrência', 'Não é específico para triagem']
      }
    }
  },

  ca_19_9: {
    nome: 'CA 19-9',
    unidade: 'U/mL',
    referencia: { normal: '<37' },
    ideal: '<25',
    interpretacao: {
      alto: {
        significado: 'Marcador de câncer pancreático e biliar',
        causas: ['Câncer de pâncreas', 'Câncer de vias biliares', 'Colangite', 'Pancreatite', 'Cirrose', 'Câncer gástrico/colorretal'],
        predisposicoes: ['Neoplasia pancreato-biliar'],
        orientacoes: ['TC abdômen com contraste', 'Ecoendoscopia', 'CA 19-9 não é expresso em 10% da população (Lewis negativo)', 'Monitoramento de tratamento']
      }
    }
  },

  ca_125: {
    nome: 'CA 125',
    unidade: 'U/mL',
    referencia: { normal: '<35' },
    ideal: '<20',
    interpretacao: {
      alto: {
        significado: 'Marcador de câncer de ovário',
        causas: ['Câncer de ovário', 'Endometriose', 'Menstruação', 'Gravidez', 'Ascite', 'Cirrose', 'Insuficiência cardíaca'],
        predisposicoes: ['Neoplasia ovariana'],
        orientacoes: ['USG transvaginal', 'TC pelve', 'Combinado com HE4 (índice ROMA)', 'Monitoramento de resposta ao tratamento']
      }
    }
  },

  ca_15_3: {
    nome: 'CA 15-3',
    unidade: 'U/mL',
    referencia: { normal: '<30' },
    ideal: '<20',
    interpretacao: {
      alto: {
        significado: 'Marcador de câncer de mama',
        causas: ['Câncer de mama (avançado/metastático)', 'Cirrose', 'Hepatite', 'Tuberculose'],
        predisposicoes: ['Metástases de câncer de mama'],
        orientacoes: ['Não usado para triagem', 'Monitoramento de metástases', 'Mamografia + USG']
      }
    }
  },

  ca_27_29: {
    nome: 'CA 27-29',
    unidade: 'U/mL',
    referencia: { normal: '<38' },
    ideal: '<25',
    interpretacao: {
      alto: {
        significado: 'Marcador de câncer de mama (similar ao CA 15-3)',
        causas: ['Mesmas do CA 15-3'],
        predisposicoes: ['Câncer de mama'],
        orientacoes: ['Mesmas do CA 15-3']
      }
    }
  },

  psa_total: {
    nome: 'PSA Total',
    unidade: 'ng/mL',
    referencia: { 
      '40-49 anos': '<2.5',
      '50-59 anos': '<3.5',
      '60-69 anos': '<4.5',
      '70+ anos': '<6.5'
    },
    ideal: '<2.0',
    interpretacao: {
      alto: {
        significado: 'Elevação do antígeno prostático - Câncer ou HPB',
        causas: ['Câncer de próstata', 'Hiperplasia prostática benigna (HPB)', 'Prostatite', 'Manipulação prostática', 'Ejaculação recente', 'Ciclismo'],
        predisposicoes: ['Neoplasia prostática'],
        orientacoes: ['Calcular PSA livre/total', 'Toque retal', 'RM de próstata se PSA >4', 'Biópsia se indicado', 'Cinética do PSA (velocity/doubling time)']
      }
    }
  },

  psa_livre: {
    nome: 'PSA Livre',
    unidade: 'ng/mL',
    referencia: { relacao_livre_total: '>25%' },
    ideal: '>30%',
    interpretacao: {
      baixo: {
        significado: 'Relação PSA livre/total baixa - Maior risco de câncer',
        causas: ['Câncer de próstata (produz menos PSA livre)'],
        predisposicoes: ['Maior probabilidade de malignidade'],
        orientacoes: ['Se relação <10%: alto risco - biópsia indicada', 'Se 10-25%: risco intermediário', 'Se >25%: provável HPB']
      }
    }
  },

  afp: {
    nome: 'AFP (Alfafetoproteína)',
    unidade: 'ng/mL',
    referencia: { normal: '<10' },
    ideal: '<5',
    interpretacao: {
      alto: {
        significado: 'Marcador de hepatocarcinoma ou tumor de células germinativas',
        causas: ['Hepatocarcinoma', 'Tumor de células germinativas (testículo/ovário)', 'Hepatite crônica', 'Cirrose', 'Gravidez'],
        predisposicoes: ['Neoplasia hepática ou gonadal'],
        orientacoes: ['TC/RM abdômen', 'USG testicular', 'Combinado com beta-HCG em tumores germinativos']
      }
    }
  },

  beta_hcg: {
    nome: 'Beta-HCG',
    unidade: 'mUI/mL',
    referencia: { 
      homens: '<5',
      mulheres_nao_gravidas: '<5',
      gravidez: 'varia por semana'
    },
    ideal: '<2',
    interpretacao: {
      alto: {
        significado: 'Gravidez ou tumor trofoblástico/germinativo',
        causas: ['Gravidez', 'Mola hidatiforme', 'Coriocarcinoma', 'Tumor de células germinativas', 'Gravidez ectópica'],
        predisposicoes: ['Neoplasia trofoblástica'],
        orientacoes: ['USG transvaginal', 'TC se tumor', 'Combinado com AFP em tumores germinativos']
      }
    }
  },

  cromogranina_a: {
    nome: 'Cromogranina A',
    unidade: 'ng/mL',
    referencia: { normal: '<100' },
    ideal: '<80',
    interpretacao: {
      alto: {
        significado: 'Marcador de tumores neuroendócrinos',
        causas: ['Tumor carcinoide', 'Tumor neuroendócrino', 'Feocromocitoma', 'Uso de IBP (falso-positivo)', 'Insuficiência renal'],
        predisposicoes: ['Neoplasia neuroendócrina'],
        orientacoes: ['Suspender IBP por 2 semanas antes', 'TC com contraste', 'Cintilografia com octreotídeo']
      }
    }
  }
};

// ==================== MARCADORES INFLAMATÓRIOS ====================
export const MARCADORES_INFLAMATORIOS = {
  pcr: {
    nome: 'PCR (Proteína C Reativa)',
    unidade: 'mg/L',
    referencia: { normal: '<10' },
    ideal: '<3',
    interpretacao: {
      alto: {
        significado: 'Inflamação ou infecção aguda',
        causas: ['Infecção bacteriana', 'Doenças autoimunes', 'Trauma', 'Cirurgia', 'Infarto', 'Neoplasia'],
        predisposicoes: ['Processo inflamatório agudo'],
        orientacoes: ['Investigar foco infeccioso', 'Tratar causa base', 'Repetir após tratamento']
      }
    }
  },

  pcr_ultrassensivel: {
    nome: 'PCR Ultra-sensível (hs-CRP)',
    unidade: 'mg/L',
    referencia: { 
      baixo_risco: '<1.0',
      risco_intermediario: '1.0-3.0',
      alto_risco: '>3.0'
    },
    ideal: '<1.0',
    interpretacao: {
      alto: {
        significado: 'Inflamação crônica de baixo grau - Risco cardiovascular',
        causas: ['Aterosclerose', 'Síndrome metabólica', 'Obesidade', 'Resistência insulínica', 'Tabagismo'],
        predisposicoes: ['Infarto', 'AVC', 'Doença cardiovascular'],
        orientacoes: ['Dieta anti-inflamatória (mediterrânea)', 'Ômega-3 2-3g/dia', 'Curcumina 1g/dia', 'Exercícios', 'Perda de peso', 'Estatinas se alto risco']
      }
    }
  },

  vhs: {
    nome: 'VHS (Velocidade de Hemossedimentação)',
    unidade: 'mm/h',
    referencia: { 
      homem: '<15',
      mulher: '<20'
    },
    ideal: { homem: '<10', mulher: '<15' },
    interpretacao: {
      alto: {
        significado: 'Inflamação, infecção ou neoplasia',
        causas: ['Infecções', 'Doenças autoimunes (artrite reumatoide, lúpus)', 'Polimialgia reumática', 'Arterite temporal', 'Mieloma múltiplo', 'Anemia', 'Gravidez'],
        predisposicoes: ['Processo inflamatório crônico'],
        orientacoes: ['Investigar causa', 'Se >100: pensar em mieloma, temporal arterite', 'PCR é mais específico']
      }
    }
  },

  procalcitonina: {
    nome: 'Procalcitonina',
    unidade: 'ng/mL',
    referencia: { 
      normal: '<0.05',
      infeccao_bacteriana_provavel: '0.5-2.0',
      sepse: '>2.0'
    },
    ideal: '<0.05',
    interpretacao: {
      alto: {
        significado: 'Infecção bacteriana ou sepse',
        causas: ['Sepse', 'Infecção bacteriana grave', 'Choque séptico'],
        predisposicoes: ['Sepse severa'],
        orientacoes: ['Antibioticoterapia urgente se >0.5', 'Culturas', 'Útil para guiar duração de antibióticos']
      }
    }
  },

  interleucina_6: {
    nome: 'Interleucina-6 (IL-6)',
    unidade: 'pg/mL',
    referencia: { normal: '<7' },
    ideal: '<3',
    interpretacao: {
      alto: {
        significado: 'Inflamação sistêmica',
        causas: ['Infecção', 'Autoimunidade', 'Neoplasia', 'COVID-19 (tempestade de citocinas)'],
        predisposicoes: ['Síndrome de resposta inflamatória'],
        orientacoes: ['Tratar causa base', 'Considerar anti-IL-6 (tocilizumab) em casos específicos']
      }
    }
  },

  tnf_alfa: {
    nome: 'TNF-alfa (Fator de Necrose Tumoral alfa)',
    unidade: 'pg/mL',
    referencia: { normal: '<8' },
    ideal: '<5',
    interpretacao: {
      alto: {
        significado: 'Inflamação sistêmica',
        causas: ['Doenças autoimunes', 'Infecção', 'Câncer', 'Resistência insulínica'],
        predisposicoes: ['Inflamação crônica'],
        orientacoes: ['Anti-TNF (infliximabe, adalimumabe) em autoimunidade', 'Curcumina', 'Ômega-3']
      }
    }
  }
};

// ==================== URINA TIPO I (EAS) ====================
export const URINA_TIPO_I = {
  densidade: {
    nome: 'Densidade Urinária',
    unidade: '',
    referencia: { normal: '1.010-1.030' },
    ideal: '1.015-1.025',
    interpretacao: {
      baixo: {
        significado: 'Urina diluída',
        causas: ['Ingestão excessiva de água', 'Diabetes insípido', 'Insuficiência renal crônica'],
        predisposicoes: ['Poliúria'],
        orientacoes: ['Investigar diabetes insípido se <1.005']
      },
      alto: {
        significado: 'Urina concentrada',
        causas: ['Desidratação', 'SIADH', 'Proteinúria', 'Glicosúria'],
        predisposicoes: ['Desidratação'],
        orientacoes: ['Hidratação']
      }
    }
  },

  ph_urinario: {
    nome: 'pH Urinário',
    unidade: '',
    referencia: { normal: '5.0-7.0' },
    ideal: '6.0-6.5',
    interpretacao: {
      baixo: {
        significado: 'Urina ácida',
        causas: ['Acidose metabólica', 'Dieta rica em proteínas', 'Febre', 'Cálculos de ácido úrico'],
        predisposicoes: ['Nefrolitíase (ácido úrico)'],
        orientacoes: ['Alcalinizar urina com citrato de potássio se cálculos']
      },
      alto: {
        significado: 'Urina alcalina',
        causas: ['Infecção urinária por bactérias produtoras de urease (Proteus)', 'Alcalose metabólica', 'Dieta vegetariana', 'Acidose tubular renal tipo I'],
        predisposicoes: ['Cálculos de fosfato'],
        orientacoes: ['Investigar ITU', 'Acidificar urina se cálculos']
      }
    }
  },

  proteinas_urina: {
    nome: 'Proteínas na Urina',
    unidade: 'mg/dL',
    referencia: { normal: 'negativo ou traços', anormal: '>30' },
    ideal: 'negativo',
    interpretacao: {
      positivo: {
        significado: 'Proteinúria - Lesão glomerular ou tubular',
        causas: ['Nefropatia diabética', 'Glomerulonefrite', 'Hipertensão', 'Mieloma múltiplo', 'Exercício intenso', 'Febre', 'Gravidez (pré-eclâmpsia)'],
        predisposicoes: ['Doença renal crônica', 'Síndrome nefrótica'],
        orientacoes: ['Proteinúria de 24h', 'Relação proteína/creatinina urinária', 'Investigar causa']
      }
    }
  },

  glicose_urina: {
    nome: 'Glicose na Urina',
    unidade: 'mg/dL',
    referencia: { normal: 'negativo' },
    ideal: 'negativo',
    interpretacao: {
      positivo: {
        significado: 'Glicosúria - Diabetes ou disfunção tubular',
        causas: ['Diabetes mellitus (glicemia >180)', 'Glicosúria renal (tubulopatia)', 'Gravidez', 'Síndrome de Fanconi'],
        predisposicoes: ['Hiperglicemia'],
        orientacoes: ['Glicemia de jejum', 'Hemoglobina glicada', 'Controle glicêmico']
      }
    }
  },

  corpos_cetonicos: {
    nome: 'Corpos Cetônicos (Cetonúria)',
    unidade: '',
    referencia: { normal: 'negativo' },
    ideal: 'negativo',
    interpretacao: {
      positivo: {
        significado: 'Cetose - Jejum prolongado ou cetoacidose diabética',
        causas: ['Jejum prolongado', 'Dieta cetogênica', 'Cetoacidose diabética', 'Vômitos', 'Desidratação'],
        predisposicoes: ['Cetoacidose diabética'],
        orientacoes: ['Se diabético: verificar glicemia urgente', 'Hidratação', 'Insulina se CAD']
      }
    }
  },

  hemacias_urina: {
    nome: 'Hemácias na Urina (Hematúria)',
    unidade: 'células/campo',
    referencia: { normal: '<3' },
    ideal: '0-2',
    interpretacao: {
      alto: {
        significado: 'Hematúria - Sangramento no trato urinário',
        causas: ['Infecção urinária', 'Nefrolitíase', 'Glomerulonefrite', 'Câncer de bexiga/rim', 'Trauma', 'Menstruação'],
        predisposicoes: ['Lesão renal ou urológica'],
        orientacoes: ['USG rins e vias urinárias', 'Cistoscopia se >50 anos', 'Investigar glomerulonefrite se dismórficas']
      }
    }
  },

  leucocitos_urina: {
    nome: 'Leucócitos na Urina (Piúria)',
    unidade: 'células/campo',
    referencia: { normal: '<5' },
    ideal: '0-3',
    interpretacao: {
      alto: {
        significado: 'Piúria - Infecção ou inflamação urinária',
        causas: ['Infecção urinária', 'Prostatite', 'Vaginite', 'Uretrite', 'Glomerulonefrite', 'Nefrite intersticial'],
        predisposicoes: ['ITU'],
        orientacoes: ['Urocultura', 'Antibiótico se confirmado', 'Nitrofurantoína, ciprofloxacino ou cefalexina']
      }
    }
  },

  nitritos: {
    nome: 'Nitritos',
    unidade: '',
    referencia: { normal: 'negativo' },
    ideal: 'negativo',
    interpretacao: {
      positivo: {
        significado: 'Bactérias gram-negativas (E. coli)',
        causas: ['Infecção urinária por enterobactérias'],
        predisposicoes: ['ITU'],
        orientacoes: ['Urocultura', 'Antibiótico']
      }
    }
  },

  cilindros: {
    nome: 'Cilindros Urinários',
    unidade: '',
    referencia: { normal: 'ausentes ou hialinos raros' },
    ideal: 'ausentes',
    interpretacao: {
      presentes: {
        significado: 'Lesão renal (tipos específicos)',
        causas: {
          hialinos: 'Normal ou desidratação',
          granulosos: 'Necrose tubular aguda',
          eritrocitarios: 'Glomerulonefrite',
          leucocitarios: 'Pielonefrite',
          cereos: 'Insuficiência renal crônica'
        },
        predisposicoes: ['Doença renal'],
        orientacoes: ['Investigar tipo de cilindro', 'Função renal', 'Encaminhar nefrologista']
      }
    }
  },

  cristais: {
    nome: 'Cristais Urinários',
    unidade: '',
    referencia: { normal: 'ausentes ou raros' },
    ideal: 'ausentes',
    interpretacao: {
      presentes: {
        significado: 'Risco de nefrolitíase ou metabolopatias',
        causas: {
          oxalato_calcio: 'Mais comum - nefrolitíase',
          acido_urico: 'Hiperuricemia, gota',
          fosfato_triplice: 'ITU por Proteus',
          cistina: 'Cistinúria (genético)'
        },
        predisposicoes: ['Cálculos renais'],
        orientacoes: ['Hidratação >2L/dia', 'Citrato de potássio', 'Investigar metabolismo (cálcio, oxalato, ácido úrico urinário de 24h)']
      }
    }
  }
};

// ==================== GASOMETRIA ARTERIAL ====================
export const GASOMETRIA = {
  ph_arterial: {
    nome: 'pH Arterial',
    unidade: '',
    referencia: { normal: '7.35-7.45' },
    ideal: '7.40',
    interpretacao: {
      baixo: {
        significado: 'Acidemia - Acidose metabólica ou respiratória',
        causas: ['Cetoacidose diabética', 'Acidose lática', 'Insuficiência renal', 'Diarréia', 'Hipoventilação (acidose respiratória)'],
        predisposicoes: ['Arritmias', 'Hipercalemia', 'Depressão do SNC'],
        orientacoes: ['Tratar causa base', 'Bicarbonato se pH <7.1', 'Suporte ventilatório se respiratório']
      },
      alto: {
        significado: 'Alcalemia - Alcalose metabólica ou respiratória',
        causas: ['Vômitos', 'Uso de diuréticos', 'Hiperventilação (alcalose respiratória)', 'Ansiedade'],
        predisposicoes: ['Tetania', 'Confusão', 'Arritmias'],
        orientacoes: ['Tratar causa', 'Reposição de K e Cl se metabólica', 'Rebreathing se hiperventilação']
      }
    }
  },

  pco2: {
    nome: 'pCO2 (Pressão Parcial de CO2)',
    unidade: 'mmHg',
    referencia: { normal: '35-45' },
    ideal: '40',
    interpretacao: {
      baixo: {
        significado: 'Hipocapnia - Hiperventilação',
        causas: ['Hiperventilação (ansiedade, dor)', 'Alcalose respiratória compensada'],
        predisposicoes: ['Alcalose respiratória'],
        orientacoes: ['Tratar ansiedade', 'Rebreathing']
      },
      alto: {
        significado: 'Hipercapnia - Hipoventilação',
        causas: ['DPOC', 'Apnéia do sono', 'Fraqueza muscular respiratória', 'Depressão respiratória (opioides)'],
        predisposicoes: ['Acidose respiratória', 'Insuficiência respiratória'],
        orientacoes: ['Suporte ventilatório', 'BiPAP/CPAP', 'Revertesedação']
      }
    }
  },

  po2: {
    nome: 'pO2 (Pressão Parcial de O2)',
    unidade: 'mmHg',
    referencia: { normal: '80-100' },
    ideal: '90-100',
    interpretacao: {
      baixo: {
        significado: 'Hipoxemia - Baixa oxigenação arterial',
        causas: ['Pneumonia', 'DPOC', 'Edema pulmonar', 'Embolia pulmonar', 'Shunt intrapulmonar', 'Altitude'],
        predisposicoes: ['Insuficiência respiratória'],
        orientacoes: ['Oxigenoterapia', 'Investigar causa', 'Manter SpO2 >90%']
      }
    }
  },

  hco3: {
    nome: 'Bicarbonato (HCO3-)',
    unidade: 'mEq/L',
    referencia: { normal: '22-26' },
    ideal: '24',
    interpretacao: {
      baixo: {
        significado: 'Acidose metabólica',
        causas: ['Cetoacidose', 'Acidose lática', 'Insuficiência renal', 'Diarréia', 'Acidose tubular renal'],
        predisposicoes: ['Acidemia'],
        orientacoes: ['Bicarbonato de sódio se pH <7.1', 'Tratar causa base']
      },
      alto: {
        significado: 'Alcalose metabólica',
        causas: ['Vômitos', 'Diuréticos', 'Hipocloremia', 'Hiperaldosteronismo'],
        predisposicoes: ['Alcalemia'],
        orientacoes: ['Reposição de K e Cl', 'Tratar causa']
      }
    }
  },

  excesso_base: {
    nome: 'Excesso de Base (BE)',
    unidade: 'mEq/L',
    referencia: { normal: '-2 a +2' },
    ideal: '0',
    interpretacao: {
      baixo: {
        significado: 'Acidose metabólica',
        causas: ['Mesmas da acidose metabólica'],
        predisposicoes: ['Acidemia'],
        orientacoes: ['Mesmas do bicarbonato baixo']
      },
      alto: {
        significado: 'Alcalose metabólica',
        causas: ['Mesmas da alcalose metabólica'],
        predisposicoes: ['Alcalemia'],
        orientacoes: ['Mesmas do bicarbonato alto']
      }
    }
  },

  saturacao_o2: {
    nome: 'Saturação de O2 (SatO2)',
    unidade: '%',
    referencia: { normal: '>95' },
    ideal: '97-100',
    interpretacao: {
      baixo: {
        significado: 'Hipoxemia',
        causas: ['Mesmas da pO2 baixa'],
        predisposicoes: ['Insuficiência respiratória'],
        orientacoes: ['Oxigenoterapia', 'Investigar causa']
      }
    }
  },

  lactato: {
    nome: 'Lactato Arterial',
    unidade: 'mmol/L',
    referencia: { normal: '<2.0' },
    ideal: '<1.5',
    interpretacao: {
      alto: {
        significado: 'Acidose lática - Hipoperfusão tecidual',
        causas: ['Choque (séptico, cardiogênico, hipovolêmico)', 'Hipóxia tecidual', 'Exercício intenso', 'Metformina (raro)', 'Neoplasias'],
        predisposicoes: ['Sepse severa', 'Falência orgânica'],
        orientacoes: ['EMERGÊNCIA se >4', 'Reanimação volêmica', 'Vasopressores', 'Antibióticos se sepse', 'Monitoramento intensivo']
      }
    }
  },

  anion_gap: {
    nome: 'Anion Gap (AG)',
    unidade: 'mEq/L',
    referencia: { normal: '8-12' },
    ideal: '10',
    interpretacao: {
      alto: {
        significado: 'Acidose metabólica com anion gap aumentado',
        causas: ['Cetoacidose diabética', 'Acidose lática', 'Insuficiência renal (uremia)', 'Intoxicação (metanol, etilenoglicol, salicilatos)'],
        predisposicoes: ['Acidemia severa'],
        orientacoes: ['Investigar causa específica', 'Mnemônico MUDPILES', 'Bicarbonato se necessário']
      }
    }
  }
};

// Exportar
export const PART3_CATEGORIES = {
  marcadores_tumorais: { categoria: 'Marcadores Tumorais', exames: MARCADORES_TUMORAIS },
  marcadores_inflamatorios: { categoria: 'Marcadores Inflamatórios', exames: MARCADORES_INFLAMATORIOS },
  urina_tipo_i: { categoria: 'Urina Tipo I (EAS)', exames: URINA_TIPO_I },
  gasometria: { categoria: 'Gasometria Arterial', exames: GASOMETRIA }
};
