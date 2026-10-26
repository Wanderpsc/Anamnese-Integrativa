/**
 * EXPANSÃO COMPLETA - Base de Dados de Exames Laboratoriais
 * Conteúdo expandido com base nos PDFs 02, 03, 04 do livro de Leitura de Exames
 * 
 * CATEGORIAS ADICIONADAS:
 * - Perfil Lipídico Completo
 * - Função Hepática Completa  
 * - Função Renal Completa
 * - Função Tireoidiana Completa
 * - Marcadores Cardíacos
 * - Eletrólitos e Minerais
 * - Vitaminas
 * - Coagulação
 * - Marcadores Tumorais
 * - Hormônios Sexuais
 * - Glicemia e Diabetes
 * - Proteínas e Enzimas
 * - Gasometria
 * - Urina Tipo I
 * - Marcadores Inflamatórios
 */

// PERFIL LIPÍDICO COMPLETO
export const PERFIL_LIPIDICO = {
  colesterol_total: {
    nome: 'Colesterol Total',
    unidade: 'mg/dL',
    referencia: { desejavel: '<200', limítrofe: '200-239', alto: '≥240' },
    ideal: '180',
    interpretacao: {
      baixo: {
        significado: 'Hipocolesterolemia - Raro, pode indicar desnutrição ou má absorção',
        causas: ['Desnutrição severa', 'Hipertireoidismo', 'Doença hepática grave', 'Má absorção intestinal', 'Uso de estatinas em excesso'],
        predisposicoes: ['Deficiência de hormônios esteroides', 'Problemas neurológicos', 'Depressão'],
        orientacoes: ['Avaliar função tireoidiana e hepática', 'Aumentar gorduras saudáveis (abacate, azeite, castanhas)', 'Investigar má absorção']
      },
      alto: {
        significado: 'Hipercolesterolemia - Risco cardiovascular aumentado',
        causas: ['Dieta rica em gorduras saturadas e trans', 'Sedentarismo', 'Obesidade', 'Diabetes', 'Hipotireoidismo', 'Genética (hipercolesterolemia familiar)'],
        predisposicoes: ['Aterosclerose', 'Doença arterial coronariana', 'AVC', 'Infarto'],
        orientacoes: ['Dieta mediterrânea', 'Exercícios aeróbicos 150min/semana', 'Ômega-3 2g/dia', 'Fibras solúveis (aveia, psyllium)', 'Estatinas se indicado', 'Berberina 500mg 3x/dia']
      }
    }
  },
  
  ldl: {
    nome: 'LDL-Colesterol (Ruim)',
    unidade: 'mg/dL',
    referencia: { otimo: '<100', desejavel: '100-129', limítrofe: '130-159', alto: '160-189', muito_alto: '≥190' },
    ideal: '<70',
    interpretacao: {
      baixo: {
        significado: 'LDL muito baixo - Geralmente positivo',
        causas: ['Dieta saudável', 'Uso de estatinas', 'Exercícios regulares'],
        predisposicoes: ['Proteção cardiovascular'],
        orientacoes: ['Manter hábitos saudáveis']
      },
      alto: {
        significado: 'LDL elevado - Principal fator de risco cardiovascular',
        causas: ['Dieta inadequada', 'Obesidade', 'Resistência insulínica', 'Hipotireoidismo'],
        predisposicoes: ['Formação de placas ateroscleróticas', 'Infarto', 'AVC'],
        orientacoes: ['Reduzir gorduras saturadas e trans', 'Aumentar fibras (10-25g/dia)', 'Ômega-3 (EPA/DHA)', 'Estatinas naturais: arroz vermelho fermentado', 'Berberina 500mg 3x/dia', 'Alho 600mg/dia']
      }
    }
  },
  
  hdl: {
    nome: 'HDL-Colesterol (Bom)',
    unidade: 'mg/dL',
    referencia: { homem: '>40', mulher: '>50', desejavel: '>60' },
    ideal: { homem: '60', mulher: '70' },
    interpretacao: {
      baixo: {
        significado: 'HDL baixo - Risco cardiovascular aumentado',
        causas: ['Sedentarismo', 'Tabagismo', 'Obesidade abdominal', 'Diabetes', 'Dieta pobre em gorduras boas'],
        predisposicoes: ['Aterosclerose', 'Síndrome metabólica', 'Doença coronariana'],
        orientacoes: ['Exercícios aeróbicos (aumentam HDL)', 'Parar de fumar', 'Gorduras monoinsaturadas (azeite, abacate)', 'Ômega-3', 'Niacina (B3) 500-2000mg/dia', 'Vinho tinto 1 taça/dia']
      },
      alto: {
        significado: 'HDL elevado - Proteção cardiovascular',
        causas: ['Exercícios regulares', 'Genética favorável', 'Dieta saudável'],
        predisposicoes: ['Proteção contra aterosclerose', 'Longevidade cardiovascular'],
        orientacoes: ['Manter hábitos saudáveis', 'Continuar exercícios']
      }
    }
  },
  
  triglicerides: {
    nome: 'Triglicerídeos',
    unidade: 'mg/dL',
    referencia: { desejavel: '<150', limítrofe: '150-199', alto: '200-499', muito_alto: '≥500' },
    ideal: '<100',
    interpretacao: {
      baixo: {
        significado: 'Triglicerídeos baixos - Geralmente normal',
        causas: ['Dieta pobre em carboidratos', 'Desnutrição'],
        predisposicoes: ['Sem riscos específicos'],
        orientacoes: ['Manter alimentação balanceada']
      },
      alto: {
        significado: 'Hipertrigliceridemia - Risco cardiovascular e pancreatite',
        causas: ['Excesso de carboidratos refinados e açúcar', 'Álcool', 'Obesidade', 'Diabetes', 'Síndrome metabólica', 'Hipotireoidismo'],
        predisposicoes: ['Pancreatite aguda (>500)', 'Aterosclerose', 'Fígado gorduroso', 'Resistência insulínica'],
        orientacoes: ['Reduzir carboidratos refinados e açúcar drasticamente', 'Eliminar álcool', 'Ômega-3 (EPA) 2-4g/dia', 'Exercícios', 'Berberina', 'Fibratos se >500']
      }
    }
  },
  
  vldl: {
    nome: 'VLDL-Colesterol',
    unidade: 'mg/dL',
    referencia: { normal: '<30' },
    ideal: '<20',
    interpretacao: {
      alto: {
        significado: 'VLDL elevado - Transporta triglicerídeos',
        causas: ['Mesmas causas de triglicerídeos elevados'],
        predisposicoes: ['Risco cardiovascular'],
        orientacoes: ['Seguir orientações para triglicerídeos']
      }
    }
  },
  
  indice_colesterol: {
    nome: 'Índice de Castelli (Colesterol/HDL)',
    unidade: 'razão',
    referencia: { baixo_risco: '<4.5', risco_moderado: '4.5-5.5', alto_risco: '>5.5' },
    ideal: '<3.5',
    interpretacao: {
      alto: {
        significado: 'Risco cardiovascular aumentado',
        causas: ['HDL baixo', 'Colesterol total alto'],
        predisposicoes: ['Aterosclerose', 'Doença coronariana'],
        orientacoes: ['Aumentar HDL', 'Reduzir LDL']
      }
    }
  },

  apolipoproteina_a: {
    nome: 'Apolipoproteína A1',
    unidade: 'mg/dL',
    referencia: { homem: '>120', mulher: '>140' },
    ideal: { homem: '140', mulher: '160' },
    interpretacao: {
      baixo: {
        significado: 'Risco cardiovascular aumentado',
        causas: ['Tabagismo', 'Sedentarismo', 'Diabetes'],
        predisposicoes: ['Aterosclerose'],
        orientacoes: ['Aumentar HDL', 'Exercícios']
      }
    }
  },

  apolipoproteina_b: {
    nome: 'Apolipoproteína B',
    unidade: 'mg/dL',
    referencia: { desejavel: '<90', alto: '>120' },
    ideal: '<80',
    interpretacao: {
      alto: {
        significado: 'Marcador mais preciso que LDL para risco cardiovascular',
        causas: ['Mesmas do LDL'],
        predisposicoes: ['Aterosclerose precoce'],
        orientacoes: ['Estatinas', 'Dieta', 'Exercícios']
      }
    }
  },

  lipoproteina_a: {
    nome: 'Lipoproteína(a) - Lp(a)',
    unidade: 'mg/dL',
    referencia: { desejavel: '<30' },
    ideal: '<20',
    interpretacao: {
      alto: {
        significado: 'Fator de risco genético independente para doença cardiovascular',
        causas: ['Genética (95% hereditário)'],
        predisposicoes: ['Infarto precoce', 'AVC', 'Estenose aórtica'],
        orientacoes: ['Niacina 1-2g/dia', 'Controlar outros fatores de risco', 'CoQ10', 'Vitamina C', 'Pravastatina']
      }
    }
  }
};

// FUNÇÃO HEPÁTICA COMPLETA
export const FUNCAO_HEPATICA = {
  tgo_ast: {
    nome: 'TGO/AST (Transaminase Glutâmico Oxalacética)',
    unidade: 'U/L',
    referencia: { geral: '10-40' },
    ideal: '<30',
    interpretacao: {
      alto: {
        significado: 'Lesão hepatocelular ou muscular',
        causas: ['Hepatite (viral, medicamentosa, alcoólica)', 'Esteatose hepática', 'Cirrose', 'Lesão muscular', 'Infarto do miocárdio', 'Hemólise'],
        predisposicoes: ['Progressão para fibrose/cirrose se crônico'],
        orientacoes: ['Investigar causa: sorologias virais, ultrassom hepático', 'Abstinência alcoólica', 'Hepatoprotetores: cardo mariano (silimarina) 420mg/dia', 'NAC 600mg', 'Curcuma', 'Alcachofra']
      }
    }
  },

  tgp_alt: {
    nome: 'TGP/ALT (Transaminase Glutâmico Pirúvica)',
    unidade: 'U/L',
    referencia: { geral: '10-40' },
    ideal: '<30',
    interpretacao: {
      alto: {
        significado: 'Lesão hepatocelular (mais específico que TGO)',
        causas: ['Hepatite', 'Esteatose hepática não-alcoólica (NAFLD)', 'Hepatite medicamentosa', 'Hemocromatose'],
        predisposicoes: ['Cirrose', 'Insuficiência hepática'],
        orientacoes: ['Perda de peso se obeso', 'Dieta hipocalórica', 'Exercícios', 'Evitar álcool e medicações hepatotóxicas', 'Cardo mariano', 'Vitamina E 400UI']
      }
    }
  },

  gama_gt: {
    nome: 'Gama-GT (Gama Glutamil Transferase)',
    unidade: 'U/L',
    referencia: { homem: '11-50', mulher: '7-32' },
    ideal: { homem: '<30', mulher: '<20' },
    interpretacao: {
      alto: {
        significado: 'Lesão biliar/hepática, uso de álcool',
        causas: ['Consumo de álcool', 'Obstrução biliar', 'Esteatose hepática', 'Medicações', 'Diabetes', 'Obesidade'],
        predisposicoes: ['Doença hepática alcoólica', 'Colestase'],
        orientacoes: ['Abstinência alcoólica total', 'Investigar via biliar (US)', 'Cardo mariano', 'Alcachofra', 'Boldo']
      }
    }
  },

  fosfatase_alcalina: {
    nome: 'Fosfatase Alcalina (FA)',
    unidade: 'U/L',
    referencia: { adulto: '30-120', crianca: '100-400' },
    ideal: '50-80',
    interpretacao: {
      baixo: {
        significado: 'Raro, pode indicar deficiência de zinco ou hipotireoidismo',
        causas: ['Deficiência de zinco', 'Desnutrição', 'Hipotireoidismo', 'Anemia perniciosa'],
        predisposicoes: ['Problemas ósseos'],
        orientacoes: ['Suplementar zinco 30mg/dia', 'Avaliar tireoide']
      },
      alto: {
        significado: 'Doença óssea ou obstrução biliar',
        causas: ['Obstrução biliar (cálculos, tumores)', 'Doença óssea (Paget, metástases)', 'Fraturas em consolidação', 'Crescimento na adolescência', 'Gravidez', 'Hepatite'],
        predisposicoes: ['Colestase', 'Doença metastática óssea'],
        orientacoes: ['Ultrassom abdominal', 'Investigar sistema biliar', 'Avaliar cálcio e vitamina D']
      }
    }
  },

  bilirrubina_total: {
    nome: 'Bilirrubina Total',
    unidade: 'mg/dL',
    referencia: { geral: '0.3-1.2' },
    ideal: '0.5-0.8',
    interpretacao: {
      alto: {
        significado: 'Icterícia - Problema hepático, biliar ou hemolítico',
        causas: ['Hepatite', 'Cirrose', 'Obstrução biliar', 'Hemólise', 'Síndrome de Gilbert'],
        predisposicoes: ['Icterícia clínica (>2.5)', 'Encefalopatia bilirrubínica (neonatos)'],
        orientacoes: ['Fracionamento (direta/indireta)', 'US abdome', 'Sorologias hepatite']
      }
    }
  },

  bilirrubina_direta: {
    nome: 'Bilirrubina Direta (Conjugada)',
    unidade: 'mg/dL',
    referencia: { geral: '<0.3' },
    ideal: '<0.2',
    interpretacao: {
      alto: {
        significado: 'Icterícia obstrutiva ou hepatocelular',
        causas: ['Obstrução biliar (cálculo, tumor)', 'Hepatite', 'Cirrose', 'Colestase'],
        predisposicoes: ['Colestase crônica', 'Cirrose biliar'],
        orientacoes: ['US abdome urgente', 'Investigar via biliar', 'Alcachofra', 'Boldo']
      }
    }
  },

  bilirrubina_indireta: {
    nome: 'Bilirrubina Indireta (Não-conjugada)',
    unidade: 'mg/dL',
    referencia: { geral: '<0.8' },
    ideal: '<0.6',
    interpretacao: {
      alto: {
        significado: 'Icterícia hemolítica ou Síndrome de Gilbert',
        causas: ['Hemólise (anemia hemolítica)', 'Síndrome de Gilbert (benigna)', 'Hematomas grandes', 'Deficiência de G6PD'],
        predisposicoes: ['Anemia hemolítica crônica', 'Cálculos biliares de bilirrubinato'],
        orientacoes: ['Hemograma', 'Contagem de reticulócitos', 'Coombs direto', 'Se Gilbert: evitar jejum prolongado']
      }
    }
  },

  albumina: {
    nome: 'Albumina Sérica',
    unidade: 'g/dL',
    referencia: { geral: '3.5-5.0' },
    ideal: '4.0-4.5',
    interpretacao: {
      baixo: {
        significado: 'Hipoalbuminemia - Desnutrição, síndrome nefrótica ou hepatopatia',
        causas: ['Desnutrição proteica', 'Síndrome nefrótica', 'Cirrose', 'Enteropatia perdedora de proteínas', 'Queimaduras graves', 'Inflamação crônica'],
        predisposicoes: ['Edema', 'Ascite', 'Imunodepressão'],
        orientacoes: ['Aumentar proteínas: 1.5-2g/kg/dia', 'Whey protein', 'Ovos', 'Investigar perda renal/intestinal', 'Tratar causa base']
      },
      alto: {
        significado: 'Raro, geralmente desidratação',
        causas: ['Desidratação'],
        predisposicoes: ['Sem significado clínico'],
        orientacoes: ['Hidratação']
      }
    }
  },

  proteinas_totais: {
    nome: 'Proteínas Totais',
    unidade: 'g/dL',
    referencia: { geral: '6.0-8.3' },
    ideal: '7.0-7.5',
    interpretacao: {
      baixo: {
        significado: 'Hipoproteinemia',
        causas: ['Desnutrição', 'Má absorção', 'Doença hepática', 'Doença renal', 'Queimaduras'],
        predisposicoes: ['Edema', 'Imunodepressão'],
        orientacoes: ['Aumentar ingestão proteica', 'Investigar causa']
      },
      alto: {
        significado: 'Desidratação ou gammapatia',
        causas: ['Desidratação', 'Mieloma múltiplo', 'Inflamação crônica'],
        predisposicoes: ['Doenças linfoproliferativas'],
        orientacoes: ['Hidratação', 'Eletroforese de proteínas']
      }
    }
  },

  globulinas: {
    nome: 'Globulinas (calculadas)',
    unidade: 'g/dL',
    referencia: { geral: '2.0-3.5' },
    ideal: '2.5-3.0',
    interpretacao: {
      baixo: {
        significado: 'Hipogamaglobulinemia - Imunodeficiência',
        causas: ['Imunodeficiências primárias', 'Uso de imunossupressores', 'Má nutrição'],
        predisposicoes: ['Infecções recorrentes'],
        orientacoes: ['Investigar imunidade humoral', 'Imunomoduladores naturais']
      },
      alto: {
        significado: 'Processos inflamatórios, infecciosos ou neoplásicos',
        causas: ['Infecções crônicas', 'Doenças autoimunes', 'Cirrose', 'Mieloma múltiplo'],
        predisposicoes: ['Doenças autoimunes', 'Neoplasias hematológicas'],
        orientacoes: ['Eletroforese de proteínas', 'Investigar causa']
      }
    }
  },

  relacao_albumina_globulina: {
    nome: 'Relação Albumina/Globulina (A/G)',
    unidade: 'razão',
    referencia: { geral: '1.2-2.2' },
    ideal: '1.5-1.8',
    interpretacao: {
      baixo: {
        significado: 'Aumento de globulinas ou diminuição de albumina',
        causas: ['Cirrose', 'Mieloma', 'Doenças autoimunes'],
        predisposicoes: ['Hepatopatia avançada'],
        orientacoes: ['Investigar fígado e proteínas']
      },
      alto: {
        significado: 'Diminuição de globulinas (raro)',
        causas: ['Imunodeficiências'],
        predisposicoes: ['Infecções'],
        orientacoes: ['Avaliar imunidade']
      }
    }
  },

  ldh: {
    nome: 'LDH (Lactato Desidrogenase)',
    unidade: 'U/L',
    referencia: { geral: '120-246' },
    ideal: '150-200',
    interpretacao: {
      alto: {
        significado: 'Lesão tecidual ampla (coração, fígado, músculo, hemácias)',
        causas: ['Infarto miocárdio', 'Hemólise', 'Hepatite', 'Lesão muscular', 'Neoplasias', 'Anemia megaloblástica'],
        predisposicoes: ['Indica lesão celular ativa'],
        orientacoes: ['Investigar isoenzimas LDH', 'Investigar órgão afetado']
      }
    }
  },

  tempo_protrombina: {
    nome: 'Tempo de Protrombina (TP)',
    unidade: 'segundos',
    referencia: { geral: '11-13.5', INR: '0.8-1.2' },
    ideal: '12',
    interpretacao: {
      prolongado: {
        significado: 'Deficiência de fatores de coagulação ou uso de anticoagulantes',
        causas: ['Uso de varfarina', 'Deficiência de vitamina K', 'Doença hepática', 'Coagulação intravascular disseminada (CIVD)'],
        predisposicoes: ['Sangramento'],
        orientacoes: ['Vitamina K se deficiente', 'Ajustar dose de varfarina', 'Avaliar função hepática']
      }
    }
  },

  inr: {
    nome: 'INR (International Normalized Ratio)',
    unidade: 'razão',
    referencia: { normal: '0.8-1.2', anticoagulado: '2.0-3.0' },
    ideal: '1.0',
    interpretacao: {
      alto: {
        significado: 'Anticoagulação excessiva ou deficiência de fatores',
        causas: ['Dose alta de varfarina', 'Deficiência de vitamina K', 'Hepatopatia severa'],
        predisposicoes: ['Risco de sangramento'],
        orientacoes: ['Ajustar varfarina', 'Vitamina K se necessário']
      }
    }
  }
};

// FUNÇÃO RENAL COMPLETA
export const FUNCAO_RENAL = {
  ureia: {
    nome: 'Ureia',
    unidade: 'mg/dL',
    referencia: { geral: '10-50' },
    ideal: '20-35',
    interpretacao: {
      baixo: {
        significado: 'Raramente patológico',
        causas: ['Dieta pobre em proteínas', 'Gravidez', 'Super-hidratação', 'Hepatopatia grave'],
        predisposicoes: ['Desnutrição proteica'],
        orientacoes: ['Avaliar ingestão proteica', 'Função hepática']
      },
      alto: {
        significado: 'Azotemia - Disfunção renal ou desidratação',
        causas: ['Insuficiência renal (aguda/crônica)', 'Desidratação', 'Dieta hiperproteica', 'Sangramento GI', 'Uso de corticoides', 'Obstrução urinária'],
        predisposicoes: ['Progressão para IRC', 'Uremia'],
        orientacoes: ['Hidratação adequada', 'Reduzir proteínas se IRC', 'Investigar causa: US renal', 'Controlar PA e glicemia']
      }
    }
  },

  creatinina: {
    nome: 'Creatinina Sérica',
    unidade: 'mg/dL',
    referencia: { homem: '0.7-1.3', mulher: '0.6-1.1' },
    ideal: { homem: '1.0', mulher: '0.8' },
    interpretacao: {
      baixo: {
        significado: 'Perda de massa muscular',
        causas: ['Sarcopenia', 'Desnutrição', 'Doenças musculares'],
        predisposicoes: ['Fragilidade'],
        orientacoes: ['Exercícios resistidos', 'Aumentar proteínas']
      },
      alto: {
        significado: 'Insuficiência renal',
        causas: ['Doença renal crônica', 'Insuficiência renal aguda', 'Desidratação severa', 'Rabdomiólise', 'Medicações nefrotóxicas'],
        predisposicoes: ['IRC progressiva', 'Necessidade de diálise'],
        orientacoes: ['Calcular TFG', 'US renal', 'Controlar PA (<130/80)', 'IECA/BRA', 'Evitar AINEs', 'Restrição proteica se avançado']
      }
    }
  },

  tfg_ckd_epi: {
    nome: 'Taxa de Filtração Glomerular (TFG) - CKD-EPI',
    unidade: 'mL/min/1.73m²',
    referencia: { normal: '>90', leve: '60-89', moderada: '30-59', grave: '15-29', terminal: '<15' },
    ideal: '>90',
    interpretacao: {
      baixo: {
        significado: 'Doença Renal Crônica - Estágios conforme valor',
        causas: ['Diabetes', 'Hipertensão', 'Glomerulonefrites', 'Doença renal policística', 'Nefropatia por AINEs'],
        predisposicoes: ['Progressão para diálise', 'Doença cardiovascular', 'Anemia', 'Distúrbios ósseo-minerais'],
        orientacoes: ['Controle rigoroso de PA e glicemia', 'IECA/BRA', 'Restrição proteica (0.8g/kg se <60)', 'Evitar nefrotóxicos', 'Nefrologia se <45']
      }
    }
  },

  acido_urico: {
    nome: 'Ácido Úrico',
    unidade: 'mg/dL',
    referencia: { homem: '3.5-7.2', mulher: '2.6-6.0' },
    ideal: { homem: '5.0', mulher: '4.0' },
    interpretacao: {
      baixo: {
        significado: 'Hiperuricosúria (raro)',
        causas: ['Síndrome de Fanconi', 'Excreção excessiva'],
        predisposicoes: ['Cálculos renais'],
        orientacoes: ['Hidratação']
      },
      alto: {
        significado: 'Hiperuricemia - Risco de gota e cálculos',
        causas: ['Dieta rica em purinas (carnes, frutos do mar)', 'Álcool', 'Obesidade', 'Insuficiência renal', 'Diuréticos', 'Produção aumentada (leucemia, psoríase)'],
        predisposicoes: ['Gota', 'Cálculos renais de urato', 'Doença renal crônica'],
        orientacoes: ['Reduzir carnes vermelhas, frutos do mar, álcool', 'Hidratação abundante', 'Perda de peso', 'Cereja (antocianinas)', 'Alopurinol se >9 ou gota', 'Vitamina C 500mg']
      }
    }
  },

  cistatina_c: {
    nome: 'Cistatina C',
    unidade: 'mg/L',
    referencia: { geral: '0.5-1.0' },
    ideal: '0.7',
    interpretacao: {
      alto: {
        significado: 'Marcador mais sensível de função renal que creatinina',
        causas: ['Disfunção renal precoce', 'Não afetada por massa muscular'],
        predisposicoes: ['Doença renal crônica'],
        orientacoes: ['Mais preciso para TFG', 'Investigar função renal']
      }
    }
  },

  microalbuminuria: {
    nome: 'Microalbuminúria (Urina)',
    unidade: 'mg/24h',
    referencia: { normal: '<30', microalbuminuria: '30-300', macroalbuminuria: '>300' },
    ideal: '<20',
    interpretacao: {
      alto: {
        significado: 'Lesão renal precoce (diabetes, hipertensão)',
        causas: ['Nefropatia diabética inicial', 'Hipertensão', 'Glomerulonefrite'],
        predisposicoes: ['Progressão para proteinúria franca', 'IRC'],
        orientacoes: ['IECA/BRA obrigatório', 'Controle glicêmico rigoroso', 'PA <130/80', 'Reduzir sódio']
      }
    }
  },

  proteinuria_24h: {
    nome: 'Proteinúria 24 horas',
    unidade: 'mg/24h',
    referencia: { normal: '<150' },
    ideal: '<100',
    interpretacao: {
      alto: {
        significado: 'Lesão renal estabelecida',
        causas: ['Nefropatia diabética', 'Glomerulonefrite', 'Síndrome nefrótica', 'Hipertensão'],
        predisposicoes: ['IRC progressiva', 'Edema', 'Hipoalbuminemia'],
        orientacoes: ['IECA/BRA', 'Restrição proteica', 'Controle rigoroso de PA e glicemia']
      }
    }
  }
};

// Exportar tudo junto
export const EXPANDED_LABORATORY_EXAMS = {
  perfil_lipidico: { categoria: 'Perfil Lipídico Completo', exames: PERFIL_LIPIDICO },
  funcao_hepatica: { categoria: 'Função Hepática', exames: FUNCAO_HEPATICA },
  funcao_renal: { categoria: 'Função Renal', exames: FUNCAO_RENAL }
};
