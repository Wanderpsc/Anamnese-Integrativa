/**
 * BASE DE DADOS COMPLETA - EXAMES LABORATORIAIS
 * Expansão completa baseada nos PDFs 02, 03, 04
 * Todas as categorias de exames clínicos
 */

// ==================== FUNÇÃO TIREOIDIANA ====================
export const FUNCAO_TIREOIDIANA = {
  tsh: {
    nome: 'TSH (Hormônio Tireoestimulante)',
    unidade: 'μUI/mL',
    referencia: { geral: '0.4-4.0' },
    ideal: '1.0-2.0',
    interpretacao: {
      baixo: {
        significado: 'Hipertireoidismo - Excesso de hormônios tireoidianos',
        causas: ['Doença de Graves', 'Tireoidite', 'Adenoma tóxico', 'Uso excessivo de levotiroxina', 'Tireoidite subaguda'],
        predisposicoes: ['Taquicardia', 'Perda de peso', 'Ansiedade', 'Tremores', 'Osteoporose', 'Fibrilação atrial'],
        orientacoes: ['Dosar T4 livre e T3', 'Anticorpos anti-TPO e anti-TRAb', 'US tireoide', 'Reduzir dose de levotiroxina se em uso', 'Carnitina 1g/dia para sintomas', 'Evitar estimulantes']
      },
      alto: {
        significado: 'Hipotireoidismo - Insuficiência tireoidiana',
        causas: ['Tireoidite de Hashimoto', 'Deficiência de iodo', 'Pós-tireoidectomia', 'Radiação', 'Medicações (lítio, amiodarona)'],
        predisposicoes: ['Fadiga', 'Ganho de peso', 'Constipação', 'Depressão', 'Colesterol alto', 'Queda de cabelo', 'Pele seca'],
        orientacoes: ['Dosar T4 livre', 'Anticorpos anti-TPO', 'Levotiroxina conforme necessário', 'Selênio 200mcg/dia', 'Iodo se deficiente', 'Evitar soja crua e crucíferas em excesso']
      }
    }
  },

  t4_livre: {
    nome: 'T4 Livre (Tiroxina Livre)',
    unidade: 'ng/dL',
    referencia: { geral: '0.8-1.8' },
    ideal: '1.2-1.5',
    interpretacao: {
      baixo: {
        significado: 'Hipotireoidismo confirmado',
        causas: ['Hipotireoidismo primário', 'Hipotireoidismo central (hipofisário)'],
        predisposicoes: ['Mesmas do TSH alto'],
        orientacoes: ['Reposição com levotiroxina', 'Dose usual: 1.6mcg/kg/dia', 'Tomar em jejum']
      },
      alto: {
        significado: 'Hipertireoidismo confirmado',
        causas: ['Hipertireoidismo primário', 'Tireotoxicose'],
        predisposicoes: ['Mesmas do TSH baixo'],
        orientacoes: ['Antitireoidianos', 'Beta-bloqueadores para sintomas']
      }
    }
  },

  t3_total: {
    nome: 'T3 Total (Triiodotironina Total)',
    unidade: 'ng/dL',
    referencia: { geral: '80-200' },
    ideal: '120-160',
    interpretacao: {
      baixo: {
        significado: 'Hipotireoidismo ou Síndrome do T3 baixo (doença grave)',
        causas: ['Hipotireoidismo', 'Doença não-tireoidiana grave', 'Desnutrição', 'Conversão reduzida T4→T3'],
        predisposicoes: ['Fadiga', 'Metabolismo lento'],
        orientacoes: ['Se TSH normal: investigar conversão T4→T3', 'Selênio 200mcg', 'Zinco 30mg', 'Evitar stress crônico']
      },
      alto: {
        significado: 'Hipertireoidismo T3 (raro)',
        causas: ['Adenoma produtor de T3', 'Doença de Graves'],
        predisposicoes: ['Sintomas de hipertireoidismo'],
        orientacoes: ['Tratamento de hipertireoidismo']
      }
    }
  },

  t3_livre: {
    nome: 'T3 Livre',
    unidade: 'pg/mL',
    referencia: { geral: '2.3-4.2' },
    ideal: '3.0-3.8',
    interpretacao: {
      baixo: {
        significado: 'Baixa conversão T4→T3 ou hipotireoidismo',
        causas: ['Deficiência de selênio', 'Stress crônico', 'Inflamação', 'Uso de beta-bloqueadores'],
        predisposicoes: ['Fadiga persistente apesar de T4 normal'],
        orientacoes: ['Selênio 200mcg', 'Zinco 30mg', 'Considerar T3 (liotironina) adicional']
      },
      alto: {
        significado: 'Hipertireoidismo',
        causas: ['Graves', 'Adenoma tóxico'],
        predisposicoes: ['Sintomas adrenérgicos'],
        orientacoes: ['Antitireoidianos']
      }
    }
  },

  anti_tpo: {
    nome: 'Anti-TPO (Anti-Peroxidase Tireoidiana)',
    unidade: 'UI/mL',
    referencia: { negativo: '<35' },
    ideal: '<10',
    interpretacao: {
      alto: {
        significado: 'Autoimunidade tireoidiana - Tireoidite de Hashimoto',
        causas: ['Predisposição genética', 'Disbiose intestinal', 'Deficiência de vitamina D', 'Stress', 'Exposição a toxinas'],
        predisposicoes: ['Progressão para hipotireoidismo', 'Outras doenças autoimunes'],
        orientacoes: ['Dieta sem glúten (teste 3 meses)', 'Selênio 200mcg/dia (reduz anticorpos)', 'Vitamina D >50ng/mL', 'LDN (naltrexona baixa dose)', 'Probióticos', 'Reduzir stress']
      }
    }
  },

  anti_tireoglobulina: {
    nome: 'Anti-Tireoglobulina',
    unidade: 'UI/mL',
    referencia: { negativo: '<115' },
    ideal: '<50',
    interpretacao: {
      alto: {
        significado: 'Autoimunidade tireoidiana',
        causas: ['Hashimoto', 'Graves', 'Predisposição genética'],
        predisposicoes: ['Disfunção tireoidiana'],
        orientacoes: ['Mesmas do Anti-TPO']
      }
    }
  },

  trab: {
    nome: 'TRAb (Anticorpo Anti-Receptor de TSH)',
    unidade: 'UI/L',
    referencia: { negativo: '<1.75' },
    ideal: '<1.0',
    interpretacao: {
      alto: {
        significado: 'Doença de Graves (hipertireoidismo autoimune)',
        causas: ['Autoimunidade contra receptor de TSH'],
        predisposicoes: ['Hipertireoidismo', 'Oftalmopatia de Graves'],
        orientacoes: ['Antitireoidianos (metimazol)', 'Beta-bloqueadores', 'Iodo radioativo ou cirurgia se refratário']
      }
    }
  },

  tireoglobulina: {
    nome: 'Tireoglobulina',
    unidade: 'ng/mL',
    referencia: { geral: '1.5-35' },
    ideal: '10-20',
    interpretacao: {
      alto: {
        significado: 'Lesão ou inflamação tireoidiana, ou câncer',
        causas: ['Tireoidite', 'Adenoma', 'Carcinoma de tireoide (seguimento pós-cirurgia)'],
        predisposicoes: ['Recorrência de câncer tireoidiano'],
        orientacoes: ['US tireoide', 'Seguimento oncológico se história de câncer']
      }
    }
  },

  t3_reverso: {
    nome: 'T3 Reverso (rT3)',
    unidade: 'ng/dL',
    referencia: { geral: '10-24' },
    ideal: '12-18',
    interpretacao: {
      alto: {
        significado: 'Stress fisiológico, conversão anormal de T4',
        causas: ['Stress crônico', 'Inflamação sistêmica', 'Resistência à insulina', 'Doença não-tireoidiana'],
        predisposicoes: ['Sintomas de hipotireoidismo com TSH/T4 normais'],
        orientacoes: ['Reduzir stress', 'Anti-inflamatórios naturais', 'Melhorar sensibilidade insulínica', 'Considerar T3 direto']
      }
    }
  },

  relacao_t3_t3reverso: {
    nome: 'Relação T3/T3 Reverso',
    unidade: 'razão',
    referencia: { ideal: '>20' },
    ideal: '>20',
    interpretacao: {
      baixo: {
        significado: 'Conversão prejudicada, dominância de T3 reverso',
        causas: ['Stress', 'Inflamação', 'Toxicidade'],
        predisposicoes: ['Fadiga', 'Metabolismo lento'],
        orientacoes: ['Reduzir T3 reverso: selênio, magnésio, controle de stress']
      }
    }
  }
};

// ==================== DIABETES E GLICEMIA ====================
export const DIABETES_GLICEMIA = {
  glicemia_jejum: {
    nome: 'Glicemia de Jejum',
    unidade: 'mg/dL',
    referencia: { normal: '<100', pre_diabetes: '100-125', diabetes: '≥126' },
    ideal: '70-85',
    interpretacao: {
      baixo: {
        significado: 'Hipoglicemia',
        causas: ['Jejum prolongado', 'Insulinoma', 'Uso excessivo de insulina/hipoglicemiantes', 'Insuficiência adrenal', 'Doença hepática'],
        predisposicoes: ['Tremores', 'Sudorese', 'Confusão', 'Perda de consciência'],
        orientacoes: ['Glicose oral imediata se sintomático', 'Investigar causa: dosagem de insulina e peptídeo C durante hipoglicemia']
      },
      alto: {
        significado: 'Pré-diabetes ou Diabetes Mellitus',
        causas: ['Resistência insulínica', 'Deficiência de insulina', 'Obesidade', 'Sedentarismo', 'Dieta rica em carboidratos', 'Genética'],
        predisposicoes: ['Diabetes tipo 2', 'Doença cardiovascular', 'Neuropatia', 'Retinopatia', 'Nefropatia'],
        orientacoes: ['Dieta baixa em carboidratos refinados', 'Exercícios 150min/semana', 'Perda de peso se obeso', 'Berberina 500mg 3x/dia', 'Cromo 200mcg', 'Canela 1-3g/dia', 'Metformina se indicado']
      }
    }
  },

  hemoglobina_glicada: {
    nome: 'Hemoglobina Glicada (HbA1c)',
    unidade: '%',
    referencia: { normal: '<5.7', pre_diabetes: '5.7-6.4', diabetes: '≥6.5' },
    ideal: '<5.4',
    interpretacao: {
      alto: {
        significado: 'Controle glicêmico inadequado nos últimos 3 meses',
        causas: ['Diabetes mal controlado', 'Resistência insulínica', 'Falta de adesão ao tratamento'],
        predisposicoes: ['Complicações microvasculares (retinopatia, nefropatia, neuropatia)', 'Macrovasculares (IAM, AVC)'],
        orientacoes: ['Meta: <7% (diabéticos), <6.5% (ideal)', 'Intensificar controle glicêmico', 'Revisar medicações', 'Educação diabética', 'Monitorização domiciliar']
      }
    }
  },

  glicemia_pos_prandial: {
    nome: 'Glicemia Pós-Prandial (2h)',
    unidade: 'mg/dL',
    referencia: { normal: '<140', pre_diabetes: '140-199', diabetes: '≥200' },
    ideal: '<120',
    interpretacao: {
      alto: {
        significado: 'Hiperglicemia pós-prandial - Pico glicêmico excessivo',
        causas: ['Resistência insulínica', 'Secreção inadequada de insulina', 'Dieta hiperglicêmica'],
        predisposicoes: ['Diabetes', 'Estresse oxidativo', 'Glicação de proteínas'],
        orientacoes: ['Reduzir carboidratos de alto índice glicêmico', 'Aumentar fibras', 'Vinagre de maçã antes das refeições', 'Inibidores de alfa-glicosidase (acarbose)', 'Exercício leve pós-refeição']
      }
    }
  },

  insulina_jejum: {
    nome: 'Insulina de Jejum',
    unidade: 'μUI/mL',
    referencia: { geral: '2-25' },
    ideal: '2-5',
    interpretacao: {
      baixo: {
        significado: 'Deficiência de insulina - Diabetes tipo 1',
        causas: ['Destruição autoimune de células beta pancreáticas'],
        predisposicoes: ['Hiperglicemia severa', 'Cetoacidose'],
        orientacoes: ['Insulinoterapia obrigatória']
      },
      alto: {
        significado: 'Hiperinsulinemia - Resistência insulínica',
        causas: ['Obesidade abdominal', 'Síndrome metabólica', 'SOP', 'Dieta hiperglicêmica'],
        predisposicoes: ['Diabetes tipo 2', 'Ganho de peso', 'Hipertensão', 'Dislipidemia', 'Fígado gorduroso'],
        orientacoes: ['Dieta baixa em carboidratos', 'Jejum intermitente', 'Exercícios resistidos', 'Metformina', 'Berberina 1500mg/dia', 'Inositol 2-4g/dia']
      }
    }
  },

  peptideo_c: {
    nome: 'Peptídeo C',
    unidade: 'ng/mL',
    referencia: { jejum: '0.8-3.1', pos_prandial: '2.5-8.0' },
    ideal: '1.5-2.5',
    interpretacao: {
      baixo: {
        significado: 'Baixa produção de insulina endógena',
        causas: ['Diabetes tipo 1', 'Insuficiência pancreática'],
        predisposicoes: ['Dependência de insulina'],
        orientacoes: ['Insulinoterapia']
      },
      alto: {
        significado: 'Resistência insulínica ou insulinoma',
        causas: ['Resistência insulínica', 'Insulinoma (se hipoglicemia)', 'Diabetes tipo 2 inicial'],
        predisposicoes: ['Hiperinsulinemia'],
        orientacoes: ['Melhorar sensibilidade à insulina', 'Investigar insulinoma se hipoglicemia']
      }
    }
  },

  homa_ir: {
    nome: 'HOMA-IR (Índice de Resistência Insulínica)',
    unidade: 'índice',
    referencia: { normal: '<2.5', resistencia: '≥2.5' },
    ideal: '<1.5',
    interpretacao: {
      alto: {
        significado: 'Resistência insulínica estabelecida',
        causas: ['Obesidade', 'Sedentarismo', 'Dieta inadequada', 'SOP'],
        predisposicoes: ['Diabetes', 'Síndrome metabólica', 'Esteatose hepática'],
        orientacoes: ['Perda de peso', 'Dieta low-carb', 'Exercícios', 'Metformina', 'Berberina']
      }
    }
  },

  frutosamina: {
    nome: 'Frutosamina',
    unidade: 'μmol/L',
    referencia: { geral: '205-285' },
    ideal: '220-260',
    interpretacao: {
      alto: {
        significado: 'Controle glicêmico inadequado nas últimas 2-3 semanas',
        causas: ['Diabetes descompensado'],
        predisposicoes: ['Complicações diabéticas'],
        orientacoes: ['Ajustar controle glicêmico', 'Útil quando HbA1c não é confiável (anemias)']
      }
    }
  }
};

// ==================== HORMÔNIOS SEXUAIS ====================
export const HORMONIOS_SEXUAIS = {
  testosterona_total: {
    nome: 'Testosterona Total',
    unidade: 'ng/dL',
    referencia: { homem: '300-1000', mulher: '15-70' },
    ideal: { homem: '600-800', mulher: '30-50' },
    interpretacao: {
      baixo: {
        significado: 'Hipogonadismo - Deficiência de testosterona',
        causas: ['Idade (andropausa)', 'Obesidade', 'Diabetes', 'Uso de opioides', 'Insuficiência testicular', 'Hipopituitarismo'],
        predisposicoes: ['Perda de libido', 'Disfunção erétil', 'Fadiga', 'Perda de massa muscular', 'Ganho de gordura abdominal', 'Depressão', 'Osteoporose'],
        orientacoes: ['Perda de peso se obeso', 'Exercícios resistidos', 'Zinco 30mg', 'Vitamina D >50ng/mL', 'Magnésio 400mg', 'Tribulus terrestris', 'Ashwagandha', 'TRT (reposição) se <300']
      },
      alto: {
        significado: 'Excesso de testosterona (mulheres: hiperandrogenismo)',
        causas: ['SOP em mulheres', 'Tumor produtor de andrógenos', 'Uso de esteroides anabolizantes'],
        predisposicoes: ['Acne', 'Hirsutismo', 'Alopecia', 'Irregularidade menstrual'],
        orientacoes: ['Investigar SOP (US transvaginal)', 'Anti-andrógenos se necessário', 'Inositol', 'Saw palmetto']
      }
    }
  },

  testosterona_livre: {
    nome: 'Testosterona Livre',
    unidade: 'pg/mL',
    referencia: { homem: '50-210', mulher: '1.0-8.5' },
    ideal: { homem: '100-150', mulher: '3-5' },
    interpretacao: {
      baixo: {
        significado: 'Testosterona livre baixa - Forma biologicamente ativa reduzida',
        causas: ['Mesmas da testosterona total', 'SHBG aumentado'],
        predisposicoes: ['Sintomas mais evidentes que testosterona total baixa'],
        orientacoes: ['Mesmas da testosterona total', 'Reduzir SHBG se elevado']
      }
    }
  },

  estradiol: {
    nome: 'Estradiol (E2)',
    unidade: 'pg/mL',
    referencia: { 
      homem: '10-40', 
      mulher_folicular: '30-120', 
      mulher_ovulatoria: '90-330', 
      mulher_lutea: '70-250',
      menopausa: '<30'
    },
    ideal: { homem: '20-30', mulher_folicular: '50-80' },
    interpretacao: {
      baixo: {
        significado: 'Hipoestrogenismo - Menopausa ou insuficiência ovariana',
        causas: ['Menopausa', 'Insuficiência ovariana primária', 'Anorexia', 'Exercício excessivo'],
        predisposicoes: ['Fogachos', 'Secura vaginal', 'Osteoporose', 'Doença cardiovascular', 'Alterações de humor'],
        orientacoes: ['TRH (terapia de reposição hormonal) se sintomática', 'Fitoestrogênios (soja, linhaça)', 'Vitamina D + cálcio', 'Exercícios de impacto']
      },
      alto: {
        significado: 'Hiperestrogenismo (homens) ou dominância estrogênica',
        causas: ['Obesidade (aromatização)', 'Tumor produtor', 'TRH excessiva', 'Exposição a xenoestrogênios'],
        predisposicoes: ['Ginecomastia (homens)', 'Retenção líquida', 'Ganho de peso', 'Risco de câncer mama/útero'],
        orientacoes: ['Perda de peso', 'Inibidores de aromatase naturais (DIM, crisina)', 'Evitar xenoestrogênios (plásticos)', 'Crucíferas']
      }
    }
  },

  progesterona: {
    nome: 'Progesterona',
    unidade: 'ng/mL',
    referencia: { 
      mulher_folicular: '<1.5', 
      mulher_lutea: '2-25',
      menopausa: '<1',
      homem: '<1'
    },
    ideal: { mulher_lutea: '10-20' },
    interpretacao: {
      baixo: {
        significado: 'Insuficiência lútea - Deficiência de progesterona',
        causas: ['Anovulação', 'Insuficiência do corpo lúteo', 'Stress crônico', 'SOP'],
        predisposicoes: ['Infertilidade', 'Abortos recorrentes', 'SPM severa', 'Dominância estrogênica'],
        orientacoes: ['Progesterona natural micronizada', 'Vitex agnus-castus 400mg', 'Reduzir stress', 'Magnésio', 'Vitamina B6']
      }
    }
  },

  lh: {
    nome: 'LH (Hormônio Luteinizante)',
    unidade: 'mUI/mL',
    referencia: { 
      homem: '1.5-9.3', 
      mulher_folicular: '1.9-12.5',
      mulher_meio_ciclo: '8.7-76.3',
      mulher_lutea: '0.5-16.9',
      menopausa: '15.9-54.0'
    },
    ideal: { homem: '3-6', mulher_folicular: '3-8' },
    interpretacao: {
      baixo: {
        significado: 'Hipogonadismo hipogonadotrófico',
        causas: ['Disfunção hipofisária', 'Hipotireoidismo severo', 'Anorexia', 'Stress extremo'],
        predisposicoes: ['Amenorreia', 'Infertilidade', 'Hipogonadismo'],
        orientacoes: ['Investigar eixo hipotálamo-hipófise', 'RM de sela túrcica']
      },
      alto: {
        significado: 'Insuficiência gonadal primária ou SOP',
        causas: ['Menopausa', 'Falência ovariana/testicular', 'SOP (LH:FSH >2:1)', 'Síndrome de Klinefelter'],
        predisposicoes: ['Infertilidade', 'Sintomas de hipoestrogenismo/hipogonadismo'],
        orientacoes: ['Se SOP: inositol, metformina', 'Se menopausa: considerar TRH']
      }
    }
  },

  fsh: {
    nome: 'FSH (Hormônio Folículo Estimulante)',
    unidade: 'mUI/mL',
    referencia: { 
      homem: '1.4-18.1', 
      mulher_folicular: '3.0-10.0',
      mulher_meio_ciclo: '4.7-21.5',
      mulher_lutea: '1.7-7.7',
      menopausa: '25.8-134.8'
    },
    ideal: { homem: '3-8', mulher_folicular: '5-8' },
    interpretacao: {
      baixo: {
        significado: 'Hipogonadismo hipogonadotrófico',
        causas: ['Disfunção hipofisária', 'Hiperprolactinemia'],
        predisposicoes: ['Infertilidade'],
        orientacoes: ['Investigar prolactina e hipófise']
      },
      alto: {
        significado: 'Insuficiência gonadal primária ou reserva ovariana diminuída',
        causas: ['Menopausa', 'Falência ovariana prematura', 'Baixa reserva ovariana', 'Orquiectomia'],
        predisposicoes: ['Infertilidade', 'Dificuldade de concepção'],
        orientacoes: ['Se deseja gravidez: avaliação de fertilidade urgente', 'DHEA, CoQ10, mio-inositol']
      }
    }
  },

  prolactina: {
    nome: 'Prolactina',
    unidade: 'ng/mL',
    referencia: { homem: '2-18', mulher: '3-30', gravida: '10-300' },
    ideal: { homem: '5-12', mulher: '8-20' },
    interpretacao: {
      alto: {
        significado: 'Hiperprolactinemia',
        causas: ['Prolactinoma (adenoma hipofisário)', 'Medicações (antipsicóticos, metoclopramida)', 'Hipotireoidismo', 'Stress', 'Gestação/lactação'],
        predisposicoes: ['Galactorreia', 'Amenorreia', 'Infertilidade', 'Disfunção sexual', 'Ginecomastia (homens)'],
        orientacoes: ['RM de hipófise se >100', 'Cabergolina se prolactinoma', 'Tratar hipotireoidismo se presente', 'Vitex agnus-castus 400mg', 'Vitamina B6 100mg']
      }
    }
  },

  dhea_s: {
    nome: 'DHEA-S (Sulfato de Dehidroepiandrosterona)',
    unidade: 'μg/dL',
    referencia: { homem: '280-640', mulher: '65-380' },
    ideal: { homem: '400-500', mulher: '200-300' },
    interpretacao: {
      baixo: {
        significado: 'Baixa reserva adrenal - Fadiga adrenal',
        causas: ['Envelhecimento', 'Insuficiência adrenal', 'Stress crônico', 'Uso de corticoides'],
        predisposicoes: ['Fadiga crônica', 'Baixa libido', 'Imunidade reduzida'],
        orientacoes: ['Suplementação DHEA 25-50mg/dia', 'Adaptógenos (ashwagandha, rhodiola)', 'Gerenciamento de stress', 'Vitamina C 1g']
      },
      alto: {
        significado: 'Hiperandrogenismo adrenal (mulheres)',
        causas: ['Hiperplasia adrenal congênita', 'Tumor adrenal', 'SOP'],
        predisposicoes: ['Hirsutismo', 'Acne', 'Irregularidade menstrual'],
        orientacoes: ['Investigar adrenais (TC)', 'Glicocorticoides se HAC']
      }
    }
  },

  shbg: {
    nome: 'SHBG (Globulina Ligadora de Hormônios Sexuais)',
    unidade: 'nmol/L',
    referencia: { homem: '10-57', mulher: '18-144' },
    ideal: { homem: '20-40', mulher: '40-80' },
    interpretacao: {
      baixo: {
        significado: 'Maior disponibilidade de hormônios livres - Resistência insulínica',
        causas: ['Obesidade', 'Resistência insulínica', 'Hipotireoidismo', 'SOP', 'Uso de andrógenos'],
        predisposicoes: ['Hiperandrogenismo', 'Acne', 'Hirsutismo'],
        orientacoes: ['Perda de peso', 'Melhorar sensibilidade insulínica', 'Metformina']
      },
      alto: {
        significado: 'Menor disponibilidade de hormônios livres',
        causas: ['Hiperestrogenismo', 'Hipertireoidismo', 'Anorexia', 'Envelhecimento', 'Uso de estrogênios'],
        predisposicoes: ['Sintomas de deficiência hormonal apesar de níveis totais normais'],
        orientacoes: ['Tratar causa base', 'Avaliar hormônios livres']
      }
    }
  }
};

// ==================== VITAMINAS ====================
export const VITAMINAS = {
  vitamina_d: {
    nome: 'Vitamina D [25(OH)D]',
    unidade: 'ng/mL',
    referencia: { deficiente: '<20', insuficiente: '20-30', suficiente: '30-100' },
    ideal: '50-80',
    interpretacao: {
      baixo: {
        significado: 'Deficiência/Insuficiência de Vitamina D',
        causas: ['Baixa exposição solar', 'Pele escura', 'Obesidade', 'Má absorção', 'Doença renal', 'Idade avançada'],
        predisposicoes: ['Osteoporose', 'Fraturas', 'Fraqueza muscular', 'Quedas', 'Infecções recorrentes', 'Doenças autoimunes', 'Depressão', 'Câncer'],
        orientacoes: ['Suplementação: 5.000-10.000 UI/dia até normalizar', 'Manutenção: 2.000-4.000 UI/dia', 'Sol 15-20min/dia (braços/pernas)', 'Vitamina K2 100mcg junto', 'Magnésio 400mg']
      },
      alto: {
        significado: 'Intoxicação por vitamina D (raro)',
        causas: ['Suplementação excessiva (>10.000 UI/dia por meses)'],
        predisposicoes: ['Hipercalcemia', 'Nefrolitíase', 'Calcificação vascular'],
        orientacoes: ['Suspender suplementação', 'Hidratação', 'Monitorar cálcio']
      }
    }
  },

  vitamina_b12: {
    nome: 'Vitamina B12 (Cobalamina)',
    unidade: 'pg/mL',
    referencia: { deficiente: '<200', limítrofe: '200-300', normal: '>300' },
    ideal: '400-900',
    interpretacao: {
      baixo: {
        significado: 'Deficiência de B12 - Anemia megaloblástica',
        causas: ['Vegetarianismo/veganismo', 'Anemia perniciosa (falta de fator intrínseco)', 'Gastrectomia', 'Uso de metformina/IBP', 'Doença de Crohn', 'Idade avançada'],
        predisposicoes: ['Anemia megaloblástica', 'Neuropatia periférica', 'Demência', 'Fadiga severa', 'Glossite', 'Depressão'],
        orientacoes: ['Se <200: cianocobalamina 1000mcg IM 1x/semana por 8 semanas', 'Oral: metilcobalamina 1000-2000mcg/dia sublingual', 'Investigar causa (Schilling test, anti-fator intrínseco)', 'Veganos: suplementação obrigatória']
      }
    }
  },

  folato: {
    nome: 'Ácido Fólico (Folato)',
    unidade: 'ng/mL',
    referencia: { deficiente: '<3', normal: '3-20' },
    ideal: '8-15',
    interpretacao: {
      baixo: {
        significado: 'Deficiência de folato - Anemia megaloblástica',
        causas: ['Dieta pobre em vegetais', 'Alcoolismo', 'Má absorção', 'Medicações (metotrexato, fenitoína)', 'Gravidez'],
        predisposicoes: ['Anemia megaloblástica', 'Defeitos do tubo neural (gestantes)', 'Homocisteína elevada', 'Doença cardiovascular'],
        orientacoes: ['Suplementação: 400-800mcg/dia', 'Gravidez: 600-800mcg/dia', 'Metilfolato (forma ativa) se mutação MTHFR', 'Aumentar vegetais folhosos']
      }
    }
  },

  vitamina_b6: {
    nome: 'Vitamina B6 (Piridoxina)',
    unidade: 'ng/mL',
    referencia: { deficiente: '<5', normal: '5-50' },
    ideal: '10-30',
    interpretacao: {
      baixo: {
        significado: 'Deficiência de B6',
        causas: ['Dieta inadequada', 'Alcoolismo', 'Uso de isoniazida'],
        predisposicoes: ['Anemia', 'Neuropatia', 'Depressão', 'Convulsões', 'Homocisteína elevada'],
        orientacoes: ['Suplementação: 50-100mg/dia', 'Forma ativa: piridoxal-5-fosfato']
      },
      alto: {
        significado: 'Suplementação excessiva',
        causas: ['Doses >200mg/dia por tempo prolongado'],
        predisposicoes: ['Neuropatia sensorial'],
        orientacoes: ['Reduzir dose para <100mg/dia']
      }
    }
  },

  vitamina_b1: {
    nome: 'Vitamina B1 (Tiamina)',
    unidade: 'nmol/L',
    referencia: { deficiente: '<70', normal: '70-180' },
    ideal: '100-150',
    interpretacao: {
      baixo: {
        significado: 'Deficiência de tiamina - Beribéri',
        causas: ['Alcoolismo', 'Desnutrição', 'Diálise', 'Diuréticos'],
        predisposicoes: ['Beribéri úmido (IC)', 'Beribéri seco (neuropatia)', 'Encefalopatia de Wernicke'],
        orientacoes: ['Suplementação: 100-300mg/dia', 'IV se grave', 'Reduzir/eliminar álcool']
      }
    }
  },

  vitamina_c: {
    nome: 'Vitamina C (Ácido Ascórbico)',
    unidade: 'mg/dL',
    referencia: { deficiente: '<0.4', normal: '0.4-2.0' },
    ideal: '1.0-1.5',
    interpretacao: {
      baixo: {
        significado: 'Deficiência de vitamina C - Escorbuto',
        causas: ['Dieta pobre em frutas/vegetais', 'Tabagismo', 'Alcoolismo'],
        predisposicoes: ['Escorbuto (sangramentos gengivais, petéquias)', 'Cicatrização lenta', 'Imunidade baixa'],
        orientacoes: ['Suplementação: 500-1000mg/dia', 'Aumentar cítricos, kiwi, pimentão, brócolis']
      }
    }
  },

  vitamina_a: {
    nome: 'Vitamina A (Retinol)',
    unidade: 'μg/dL',
    referencia: { deficiente: '<20', normal: '20-80' },
    ideal: '40-60',
    interpretacao: {
      baixo: {
        significado: 'Deficiência de vitamina A',
        causas: ['Má absorção de gorduras', 'Desnutrição', 'Doença hepática'],
        predisposicoes: ['Cegueira noturna', 'Xeroftalmia', 'Imunidade reduzida', 'Pele seca'],
        orientacoes: ['Suplementação: 5.000-10.000 UI/dia', 'Alimentos: fígado, cenoura, batata-doce']
      },
      alto: {
        significado: 'Hipervitaminose A',
        causas: ['Suplementação excessiva'],
        predisposicoes: ['Hepatotoxicidade', 'Osteoporose', 'Teratogenicidade'],
        orientacoes: ['Suspender suplementação', 'Evitar na gravidez']
      }
    }
  },

  vitamina_e: {
    nome: 'Vitamina E (Tocoferol)',
    unidade: 'mg/dL',
    referencia: { normal: '0.5-2.0' },
    ideal: '1.0-1.5',
    interpretacao: {
      baixo: {
        significado: 'Deficiência de vitamina E',
        causas: ['Má absorção de gorduras', 'Abetalipoproteinemia'],
        predisposicoes: ['Neuropatia', 'Miopatia', 'Hemólise'],
        orientacoes: ['Suplementação: 400-800 UI/dia', 'Alimentos: nozes, sementes, óleos vegetais']
      }
    }
  },

  vitamina_k: {
    nome: 'Vitamina K',
    unidade: 'ng/mL',
    referencia: { normal: '0.2-3.0' },
    ideal: '1.0-2.0',
    interpretacao: {
      baixo: {
        significado: 'Deficiência de vitamina K',
        causas: ['Uso de antibióticos prolongado', 'Má absorção', 'Uso de varfarina'],
        predisposicoes: ['Coagulopatia', 'Sangramento', 'Osteoporose'],
        orientacoes: ['Vitamina K1 (filoquinona) se coagulopatia', 'K2 (menaquinona) 100mcg/dia para ossos', 'Alimentos: vegetais verdes escuros']
      }
    }
  }
};

// Exportar todas as categorias
export const ALL_EXAM_CATEGORIES = {
  funcao_tireoidiana: { categoria: 'Função Tireoidiana', exames: FUNCAO_TIREOIDIANA },
  diabetes_glicemia: { categoria: 'Glicemia e Diabetes', exames: DIABETES_GLICEMIA },
  hormonios_sexuais: { categoria: 'Hormônios Sexuais', exames: HORMONIOS_SEXUAIS },
  vitaminas: { categoria: 'Vitaminas', exames: VITAMINAS }
};
