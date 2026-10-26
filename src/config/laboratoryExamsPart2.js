/**
 * PARTE 2 - CATEGORIAS ADICIONAIS
 * Eletrólitos, Marcadores Cardíacos, Coagulação, Marcadores Tumorais
 */

// ==================== ELETRÓLITOS E MINERAIS ====================
export const ELETROLITOS_MINERAIS = {
  sodio: {
    nome: 'Sódio (Na+)',
    unidade: 'mEq/L',
    referencia: { geral: '135-145' },
    ideal: '138-142',
    interpretacao: {
      baixo: {
        significado: 'Hiponatremia - Baixa concentração de sódio',
        causas: ['Excesso de água (SIADH)', 'Insuficiência cardíaca', 'Cirrose', 'Uso de diuréticos', 'Vômitos/diarréia', 'Insuficiência adrenal', 'Hipotireoidismo'],
        predisposicoes: ['Confusão mental', 'Convulsões', 'Coma (se <120)', 'Edema cerebral'],
        orientacoes: ['Se <125: emergência médica', 'Restrição hídrica se SIADH', 'Solução salina hipertônica se severo', 'Corrigir lentamente (risco de mielinólise pontina)']
      },
      alto: {
        significado: 'Hipernatremia - Desidratação ou excesso de sódio',
        causas: ['Desidratação', 'Diabetes insípido', 'Febre', 'Queimaduras', 'Excesso de sal'],
        predisposicoes: ['Sede intensa', 'Confusão', 'Convulsões', 'Hemorragia cerebral'],
        orientacoes: ['Hidratação oral ou IV', 'Investigar diabetes insípido', 'Reduzir sódio da dieta']
      }
    }
  },

  potassio: {
    nome: 'Potássio (K+)',
    unidade: 'mEq/L',
    referencia: { geral: '3.5-5.0' },
    ideal: '4.0-4.5',
    interpretacao: {
      baixo: {
        significado: 'Hipocalemia - Baixa concentração de potássio',
        causas: ['Uso de diuréticos', 'Vômitos', 'Diarréia', 'Alcalose', 'Hiperaldosteronismo', 'Uso de corticoides', 'Desnutrição'],
        predisposicoes: ['Arritmias cardíacas', 'Fraqueza muscular', 'Cãibras', 'Constipação', 'Rabdomiólise'],
        orientacoes: ['Se <3.0: emergência cardíaca', 'Suplementação: cloreto de potássio 40-100mEq/dia', 'Alimentos: banana, batata, abacate, espinafre', 'Corrigir magnésio junto']
      },
      alto: {
        significado: 'Hipercalemia - Excesso de potássio',
        causas: ['Insuficiência renal', 'Acidose', 'Hemólise', 'Uso de IECA/BRA/espironolactona', 'Suplementação excessiva', 'Rabdomiólise'],
        predisposicoes: ['Arritmias fatais (>6.5)', 'Parada cardíaca', 'Fraqueza muscular'],
        orientacoes: ['Se >6.0: EMERGÊNCIA', 'Gluconato de cálcio IV (proteção cardíaca)', 'Insulina+glicose IV', 'Resinas quelantes', 'Diálise se IRC']
      }
    }
  },

  calcio_total: {
    nome: 'Cálcio Total',
    unidade: 'mg/dL',
    referencia: { geral: '8.5-10.5' },
    ideal: '9.0-10.0',
    interpretacao: {
      baixo: {
        significado: 'Hipocalcemia - Deficiência de cálcio',
        causas: ['Deficiência de vitamina D', 'Hipoparatireoidismo', 'Insuficiência renal', 'Hipomagnesemia', 'Pancreatite aguda'],
        predisposicoes: ['Tetania', 'Parestesias', 'Convulsões', 'Sinal de Chvostek', 'Osteoporose', 'Arritmias'],
        orientacoes: ['Cálcio 1000-1500mg/dia', 'Vitamina D 2000-4000 UI', 'Magnésio 400mg', 'Se sintomático: gluconato de cálcio IV']
      },
      alto: {
        significado: 'Hipercalcemia - Excesso de cálcio',
        causas: ['Hiperparatireoidismo primário', 'Neoplasias (PTH-rP)', 'Intoxicação por vitamina D', 'Imobilização', 'Sarcoidose'],
        predisposicoes: ['Nefrolitíase', 'Constipação', 'Confusão', 'Arritmias', 'Insuficiência renal'],
        orientacoes: ['Hidratação vigorosa', 'Bisfosfonatos se neoplasia', 'Investigar PTH e vitamina D', 'Reduzir cálcio e vitamina D']
      }
    }
  },

  calcio_ionico: {
    nome: 'Cálcio Iônico (Cálcio Livre)',
    unidade: 'mmol/L',
    referencia: { geral: '1.15-1.30' },
    ideal: '1.20-1.25',
    interpretacao: {
      baixo: {
        significado: 'Forma ativa de cálcio reduzida',
        causas: ['Mesmas da hipocalcemia total'],
        predisposicoes: ['Sintomas mais evidentes'],
        orientacoes: ['Reposição de cálcio e vitamina D']
      }
    }
  },

  magnesio: {
    nome: 'Magnésio (Mg²+)',
    unidade: 'mg/dL',
    referencia: { geral: '1.7-2.4' },
    ideal: '2.0-2.2',
    interpretacao: {
      baixo: {
        significado: 'Hipomagnesemia - Deficiência de magnésio',
        causas: ['Uso de IBP/diuréticos', 'Alcoolismo', 'Diarréia crônica', 'Diabetes', 'Má absorção', 'Dieta inadequada'],
        predisposicoes: ['Arritmias', 'Hipertensão', 'Hipocalemia/hipocalcemia refratárias', 'Cãibras', 'Ansiedade', 'Insônia', 'Constipação'],
        orientacoes: ['Suplementação: citrato/glicinato de magnésio 400-600mg/dia', 'Alimentos: folhas verdes, nozes, sementes, cacau', 'Se severo: sulfato de magnésio IV']
      }
    }
  },

  fosforo: {
    nome: 'Fósforo',
    unidade: 'mg/dL',
    referencia: { geral: '2.5-4.5' },
    ideal: '3.0-4.0',
    interpretacao: {
      baixo: {
        significado: 'Hipofosfatemia',
        causas: ['Realimentação (síndrome de realimentação)', 'Uso de antiácidos', 'Alcoolismo', 'Hiperparatireoidismo'],
        predisposicoes: ['Fraqueza muscular', 'Rabdomiólise', 'Hemólise', 'Insuficiência respiratória'],
        orientacoes: ['Fosfato de sódio oral', 'Alimentos: laticínios, carnes, legumes']
      },
      alto: {
        significado: 'Hiperfosfatemia',
        causas: ['Insuficiência renal', 'Hipoparatireoidismo', 'Rabdomiólise', 'Lise tumoral'],
        predisposicoes: ['Calcificação metastática', 'Hipocalcemia secundária'],
        orientacoes: ['Quelantes de fósforo', 'Restrição dietética', 'Diálise se IRC']
      }
    }
  },

  ferro_serico: {
    nome: 'Ferro Sérico',
    unidade: 'μg/dL',
    referencia: { homem: '65-175', mulher: '50-170' },
    ideal: { homem: '100-150', mulher: '80-130' },
    interpretacao: {
      baixo: {
        significado: 'Deficiência de ferro - Anemia ferropriva',
        causas: ['Sangramento (menstrual, GI)', 'Dieta pobre em ferro', 'Má absorção', 'Gravidez'],
        predisposicoes: ['Anemia microcítica', 'Fadiga', 'Unhas quebradiças', 'Queda de cabelo'],
        orientacoes: ['Ferro quelato 30-60mg/dia + vitamina C', 'Investigar sangramento', 'Alimentos: carnes vermelhas, feijão, espinafre']
      },
      alto: {
        significado: 'Sobrecarga de ferro ou hemocromatose',
        causas: ['Hemocromatose hereditária', 'Transfusões múltiplas', 'Suplementação excessiva'],
        predisposicoes: ['Cirrose', 'Diabetes', 'Cardiopatia', 'Artropatia'],
        orientacoes: ['Flebotomias terapêuticas', 'Quelantes de ferro (deferoxamina)', 'Evitar suplementos de ferro e vitamina C']
      }
    }
  },

  ferritina: {
    nome: 'Ferritina',
    unidade: 'ng/mL',
    referencia: { homem: '30-400', mulher: '15-150' },
    ideal: { homem: '100-200', mulher: '50-100' },
    interpretacao: {
      baixo: {
        significado: 'Estoques de ferro depletados',
        causas: ['Deficiência de ferro'],
        predisposicoes: ['Anemia ferropriva iminente'],
        orientacoes: ['Suplementação de ferro', 'Investigar causa']
      },
      alto: {
        significado: 'Inflamação crônica, hemocromatose ou sobrecarga',
        causas: ['Hemocromatose', 'Inflamação crônica', 'Síndrome metabólica', 'Doença hepática', 'Neoplasias'],
        predisposicoes: ['Lesão oxidativa', 'Dano hepático'],
        orientacoes: ['Se >1000: investigar hemocromatose (saturação transferrina, genética)', 'Antioxidantes', 'Curcuma']
      }
    }
  },

  transferrina: {
    nome: 'Transferrina',
    unidade: 'mg/dL',
    referencia: { geral: '200-360' },
    ideal: '250-300',
    interpretacao: {
      baixo: {
        significado: 'Inflamação, desnutrição ou sobrecarga de ferro',
        causas: ['Inflamação crônica', 'Desnutrição proteica', 'Hemocromatose'],
        predisposicoes: ['Anemia de doença crônica'],
        orientacoes: ['Tratar causa base']
      },
      alto: {
        significado: 'Deficiência de ferro',
        causas: ['Anemia ferropriva'],
        predisposicoes: ['Compensação por baixo ferro'],
        orientacoes: ['Suplementar ferro']
      }
    }
  },

  saturacao_transferrina: {
    nome: 'Saturação de Transferrina',
    unidade: '%',
    referencia: { geral: '20-50' },
    ideal: '30-40',
    interpretacao: {
      baixo: {
        significado: 'Deficiência de ferro',
        causas: ['Anemia ferropriva'],
        predisposicoes: ['Anemia'],
        orientacoes: ['Ferro suplementar']
      },
      alto: {
        significado: 'Sobrecarga de ferro - Hemocromatose',
        causas: ['Hemocromatose hereditária', 'Transfusões'],
        predisposicoes: ['Dano orgânico por ferro'],
        orientacoes: ['Flebotomias', 'Teste genético HFE']
      }
    }
  }
};

// ==================== MARCADORES CARDÍACOS ====================
export const MARCADORES_CARDIACOS = {
  troponina_i: {
    nome: 'Troponina I Cardíaca',
    unidade: 'ng/mL',
    referencia: { normal: '<0.04' },
    ideal: '<0.01',
    interpretacao: {
      alto: {
        significado: 'Lesão miocárdica - Infarto agudo do miocárdio',
        causas: ['Infarto agudo do miocárdio', 'Angina instável', 'Miocardite', 'Embolia pulmonar', 'Insuficiência renal severa', 'Sepse'],
        predisposicoes: ['Necrose miocárdica', 'Insuficiência cardíaca'],
        orientacoes: ['EMERGÊNCIA - ECG e avaliação cardiológica imediata', 'Antiagregação plaquetária', 'Anticoagulação', 'Coronariografia']
      }
    }
  },

  troponina_t: {
    nome: 'Troponina T Cardíaca',
    unidade: 'ng/mL',
    referencia: { normal: '<0.014' },
    ideal: '<0.01',
    interpretacao: {
      alto: {
        significado: 'Lesão miocárdica',
        causas: ['Mesmas da Troponina I'],
        predisposicoes: ['IAM'],
        orientacoes: ['Mesmas da Troponina I']
      }
    }
  },

  ck_mb: {
    nome: 'CK-MB (Creatinoquinase MB)',
    unidade: 'ng/mL',
    referencia: { normal: '<5' },
    ideal: '<3',
    interpretacao: {
      alto: {
        significado: 'Lesão miocárdica (menos específico que troponina)',
        causas: ['Infarto do miocárdio', 'Miocardite', 'Cirurgia cardíaca'],
        predisposicoes: ['Necrose miocárdica'],
        orientacoes: ['Confirmar com troponina', 'Avaliação cardiológica']
      }
    }
  },

  ck_total: {
    nome: 'CK Total (Creatinoquinase)',
    unidade: 'U/L',
    referencia: { homem: '38-174', mulher: '26-140' },
    ideal: { homem: '80-120', mulher: '60-100' },
    interpretacao: {
      alto: {
        significado: 'Lesão muscular (cardíaca ou esquelética)',
        causas: ['Exercício intenso', 'Rabdomiólise', 'Infarto', 'Miopatias', 'Hipotireoidismo', 'Injeções IM'],
        predisposicoes: ['Lesão renal aguda (se rabdomiólise)'],
        orientacoes: ['Hidrataçãose >1000', 'Investigar causa', 'Suspender estatinas se em uso']
      }
    }
  },

  bnp: {
    nome: 'BNP (Peptídeo Natriurético Cerebral)',
    unidade: 'pg/mL',
    referencia: { normal: '<100' },
    ideal: '<50',
    interpretacao: {
      alto: {
        significado: 'Insuficiência cardíaca',
        causas: ['Insuficiência cardíaca (aguda/crônica)', 'Embolia pulmonar', 'Hipertensão pulmonar', 'Insuficiência renal'],
        predisposicoes: ['IC descompensada', 'Edema pulmonar'],
        orientacoes: ['Ecocardiograma', 'Diuréticos', 'IECA/BRA', 'Beta-bloqueadores', 'Avaliar fração de ejeção']
      }
    }
  },

  nt_probnp: {
    nome: 'NT-proBNP',
    unidade: 'pg/mL',
    referencia: { normal: '<125' },
    ideal: '<75',
    interpretacao: {
      alto: {
        significado: 'Insuficiência cardíaca (mais sensível que BNP)',
        causas: ['Mesmas do BNP'],
        predisposicoes: ['IC'],
        orientacoes: ['Mesmas do BNP']
      }
    }
  },

  mioglobina: {
    nome: 'Mioglobina',
    unidade: 'ng/mL',
    referencia: { geral: '<90' },
    ideal: '<60',
    interpretacao: {
      alto: {
        significado: 'Lesão muscular precoce',
        causas: ['Infarto (primeiras 2h)', 'Rabdomiólise', 'Trauma muscular'],
        predisposicoes: ['Lesão renal (mioglobinúria)'],
        orientacoes: ['Confirmar com troponina', 'Hidratação se rabdomiólise']
      }
    }
  },

  homocisteina: {
    nome: 'Homocisteína',
    unidade: 'μmol/L',
    referencia: { normal: '<15', ideal: '<7' },
    ideal: '<7',
    interpretacao: {
      alto: {
        significado: 'Hiper-homocisteinemia - Risco cardiovascular',
        causas: ['Deficiência de B12, B6, folato', 'Mutação MTHFR', 'Insuficiência renal', 'Hipotireoidismo'],
        predisposicoes: ['Aterosclerose', 'Trombose', 'AVC', 'Infarto', 'Demência'],
        orientacoes: ['B12 1000mcg', 'Folato (metilfolato) 800mcg', 'B6 50mg', 'TMG (trimetilglicina) 500mg']
      }
    }
  },

  lipoproteina_pequena_densa: {
    nome: 'LDL Pequeno e Denso (padrão B)',
    unidade: 'mg/dL',
    referencia: { desejavel: '<80' },
    ideal: '<60',
    interpretacao: {
      alto: {
        significado: 'Partículas LDL mais aterogênicas',
        causas: ['Resistência insulínica', 'Triglicerídeos altos', 'Síndrome metabólica'],
        predisposicoes: ['Aterosclerose acelerada'],
        orientacoes: ['Dieta low-carb', 'Ômega-3', 'Niacina', 'Berberina']
      }
    }
  }
};

// ==================== COAGULAÇÃO ====================
export const COAGULACAO = {
  tempo_tromboplastina_parcial: {
    nome: 'TTPa (Tempo de Tromboplastina Parcial Ativada)',
    unidade: 'segundos',
    referencia: { geral: '25-35' },
    ideal: '28-32',
    interpretacao: {
      prolongado: {
        significado: 'Deficiência de fatores da via intrínseca ou uso de heparina',
        causas: ['Uso de heparina', 'Hemofilia A (fator VIII)', 'Hemofilia B (fator IX)', 'Deficiência de fator XI', 'Anticoagulante lúpico', 'Doença de von Willebrand'],
        predisposicoes: ['Sangramento'],
        orientacoes: ['Ajustar heparina se em uso', 'Investigar coagulopatias', 'Repor fatores se deficiência']
      }
    }
  },

  fibrinogenio: {
    nome: 'Fibrinogênio',
    unidade: 'mg/dL',
    referencia: { geral: '200-400' },
    ideal: '250-350',
    interpretacao: {
      baixo: {
        significado: 'Hipofibrinogenemia - Risco de sangramento',
        causas: ['CIVD (coagulação intravascular disseminada)', 'Fibrinólise', 'Doença hepática grave', 'Desnutrição'],
        predisposicoes: ['Sangramento severo'],
        orientacoes: ['Crioprecipitado se <100', 'Tratar causa base']
      },
      alto: {
        significado: 'Hiperfibrinogenemia - Risco de trombose',
        causas: ['Inflamação aguda (proteína de fase aguda)', 'Gravidez', 'Tabagismo'],
        predisposicoes: ['Trombose', 'Doença cardiovascular'],
        orientacoes: ['Anti-inflamatórios', 'Antiagregantes se risco alto']
      }
    }
  },

  d_dimero: {
    nome: 'D-dímero',
    unidade: 'ng/mL',
    referencia: { normal: '<500' },
    ideal: '<250',
    interpretacao: {
      alto: {
        significado: 'Ativação da coagulação e fibrinólise - Trombose',
        causas: ['TVP (trombose venosa profunda)', 'Embolia pulmonar', 'CIVD', 'Pós-operatório', 'Gravidez', 'Câncer', 'Infecção'],
        predisposicoes: ['Trombose ativa'],
        orientacoes: ['Doppler venoso ou angio-TC se suspeita de TVP/EP', 'Anticoagulação se confirmado']
      }
    }
  },

  antitrombina_iii: {
    nome: 'Antitrombina III',
    unidade: '%',
    referencia: { geral: '80-120' },
    ideal: '90-110',
    interpretacao: {
      baixo: {
        significado: 'Deficiência de antitrombina - Trombofilia',
        causas: ['Deficiência congênita', 'CIVD', 'Síndrome nefrótica', 'Uso de heparina'],
        predisposicoes: ['Trombose venosa recorrente'],
        orientacoes: ['Anticoagulação profilática', 'Concentrado de antitrombina se necessário']
      }
    }
  },

  proteina_c: {
    nome: 'Proteína C',
    unidade: '%',
    referencia: { geral: '70-140' },
    ideal: '90-120',
    interpretacao: {
      baixo: {
        significado: 'Deficiência de Proteína C - Trombofilia',
        causas: ['Deficiência congênita', 'Deficiência de vitamina K', 'Uso de varfarina'],
        predisposicoes: ['Trombose venosa', 'Necrose cutânea induzida por varfarina'],
        orientacoes: ['Anticoagulação', 'Cuidado ao iniciar varfarina']
      }
    }
  },

  proteina_s: {
    nome: 'Proteína S',
    unidade: '%',
    referencia: { geral: '60-140' },
    ideal: '80-120',
    interpretacao: {
      baixo: {
        significado: 'Deficiência de Proteína S - Trombofilia',
        causas: ['Deficiência congênita', 'Gravidez', 'Uso de anticoncepcional'],
        predisposicoes: ['Trombose venosa recorrente'],
        orientacoes: ['Anticoagulação profilática']
      }
    }
  },

  fator_v_leiden: {
    nome: 'Fator V de Leiden (Mutação)',
    unidade: 'genótipo',
    referencia: { normal: 'negativo', mutacao: 'heterozigoto/homozigoto' },
    ideal: 'negativo',
    interpretacao: {
      positivo: {
        significado: 'Trombofilia hereditária mais comum',
        causas: ['Mutação genética'],
        predisposicoes: ['Trombose venosa profunda', 'Embolia pulmonar', 'Trombose em situações de risco (cirurgia, gravidez)'],
        orientacoes: ['Evitar anticoncepcionais com estrogênio', 'Profilaxia em situações de risco', 'Anticoagulação se evento trombótico']
      }
    }
  },

  mutacao_protrombina: {
    nome: 'Mutação da Protrombina G20210A',
    unidade: 'genótipo',
    referencia: { normal: 'negativo' },
    ideal: 'negativo',
    interpretacao: {
      positivo: {
        significado: 'Trombofilia hereditária',
        causas: ['Mutação genética'],
        predisposicoes: ['Trombose venosa'],
        orientacoes: ['Mesmas do Fator V Leiden']
      }
    }
  }
};

// Exportar
export const PART2_CATEGORIES = {
  eletrolitos_minerais: { categoria: 'Eletrólitos e Minerais', exames: ELETROLITOS_MINERAIS },
  marcadores_cardiacos: { categoria: 'Marcadores Cardíacos', exames: MARCADORES_CARDIACOS },
  coagulacao: { categoria: 'Coagulação', exames: COAGULACAO }
};
