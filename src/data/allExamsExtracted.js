// TODOS OS EXAMES LABORATORIAIS EXTRAÍDOS DO GUIA
// Baseado nas páginas 242-424 do documento

const TODOS_OS_EXAMES_COMPLETOS = {
  // ===== HEMOGRAMA COMPLETO =====
  leucocitosNeutrofilos: {
    nome: "Neutrófilos",
    categoria: "Hemograma - Leucograma",
    unidade: "/mm³ ou %",
    funcao: "Defesa contra bactérias e fungos. Primeira linha de defesa do sistema imunológico.",
    referencia: {
      adulto: { min: 1500, max: 7500 },
      percentual: { min: 40, max: 75 }
    },
    ideal: { geral: 4000 },
    interpretacao: {
      alto: "Neutrofilia - Indica infecção bacteriana aguda, inflamação, estresse físico, uso de corticoides, tabagismo",
      baixo: "Neutropenia - Sugere infecções virais, deficiência de B12/folato, uso de medicamentos (quimioterapia), doenças autoimunes"
    }
  },

  leucocitosLinfocitos: {
    nome: "Linfócitos",
    categoria: "Hemograma - Leucograma",
    unidade: "/mm³ ou %",
    funcao: "Defesa imunológica adaptativa. Produzem anticorpos e combatem vírus.",
    referencia: {
      adulto: { min: 900, max: 2900 },
      percentual: { min: 20, max: 45 }
    },
    ideal: { geral: 2000 },
    interpretacao: {
      alto: "Linfocitose - Comum em infecções virais (mononucleose, citomegalovírus), leucemia linfocítica",
      baixo: "Linfopenia - Sugere imunossupressão, HIV, uso prolongado de corticoides, estresse crônico, desnutrição"
    }
  },

  leucocitosMonocitos: {
    nome: "Monócitos",
    categoria: "Hemograma - Leucograma",
    unidade: "/mm³ ou %",
    funcao: "Fagocitose e apresentação de antígenos. Transformam-se em macrófagos nos tecidos.",
    referencia: {
      adulto: { min: 200, max: 950 },
      percentual: { min: 2, max: 10 }
    },
    ideal: { geral: 500 },
    interpretacao: {
      alto: "Monocitose - Indica infecções crônicas (tuberculose), doenças autoimunes, recuperação de infecções agudas",
      baixo: "Monocitopenia - Raro, pode indicar infecções graves, leucemia, uso de quimioterápicos"
    }
  },

  leucocitosEosinofilos: {
    nome: "Eosinófilos",
    categoria: "Hemograma - Leucograma",
    unidade: "/mm³ ou %",
    funcao: "Combate parasitas e participa de reações alérgicas.",
    referencia: {
      adulto: { min: 40, max: 500 },
      percentual: { min: 1, max: 5 }
    },
    ideal: { geral: 200 },
    interpretacao: {
      alto: "Eosinofilia - Sugere parasitoses, alergias, asma, dermatite atópica, síndrome hipereosinofílica",
      baixo: "Eosinopenia - Pode ocorrer em estresse agudo, uso de corticoides, infecções bacterianas agudas"
    }
  },

  leucocitosBasofilos: {
    nome: "Basófilos",
    categoria: "Hemograma - Leucograma",
    unidade: "/mm³ ou %",
    funcao: "Participam de reações alérgicas e liberam histamina.",
    referencia: {
      adulto: { min: 20, max: 200 },
      percentual: { min: 0, max: 2 }
    },
    ideal: { geral: 50 },
    interpretacao: {
      alto: "Basofilia - Pode indicar leucemia mieloide crônica, policitemia vera, hipotireoidismo",
      baixo: "Basopenia - Geralmente sem significado clínico"
    }
  },

  vhs: {
    nome: "VHS (Velocidade de Hemossedimentação)",
    categoria: "Inflamatórios",
    unidade: "mm/h",
    funcao: "Marcador inespecífico de inflamação. Mede velocidade de sedimentação das hemácias.",
    referencia: {
      homem: { min: 0, max: 15 },
      mulher: { min: 0, max: 20 }
    },
    ideal: { geral: 5 },
    interpretacao: {
      alto: "VHS elevado - Indica inflamação (artrite, infecções), anemia, gravidez, doenças autoimunes, neoplasias",
      baixo: "VHS muito baixo - Pode ocorrer em policitemia, anemia falciforme, insuficiência cardíaca"
    }
  },

  // ===== METABOLISMO DO FERRO =====
  ferroSerico: {
    nome: "Ferro Sérico",
    categoria: "Metabolismo do Ferro",
    unidade: "µg/dL",
    funcao: "Avalia níveis de ferro circulante no sangue. Essencial para produção de hemoglobina.",
    referencia: {
      homem: { min: 65, max: 175 },
      mulher: { min: 50, max: 170 }
    },
    ideal: { geral: 100 },
    interpretacao: {
      alto: "Ferro elevado - Sugere hemocromatose, hemólise, transfusões, hepatopatia, suplementação excessiva",
      baixo: "Ferro baixo - Indica deficiência de ferro, anemia ferropriva, sangramento crônico, má absorção"
    }
  },

  transferrina: {
    nome: "Transferrina",
    categoria: "Metabolismo do Ferro",
    unidade: "mg/dL",
    funcao: "Proteína transportadora de ferro. Aumenta quando há deficiência de ferro.",
    referencia: { geral: { min: 200, max: 360 } },
    ideal: { geral: 280 },
    interpretacao: {
      alto: "Transferrina elevada - Indica deficiência de ferro, gravidez, uso de contraceptivos orais",
      baixo: "Transferrina baixa - Sugere desnutrição proteica, inflamação crônica, cirrose hepática"
    }
  },

  saturacaoTransferrina: {
    nome: "Saturação da Transferrina",
    categoria: "Metabolismo do Ferro",
    unidade: "%",
    funcao: "Indica percentual de transferrina saturada com ferro. Melhor marcador de ferro disponível.",
    referencia: {
      homem: { min: 20, max: 50 },
      mulher: { min: 15, max: 50 }
    },
    ideal: { geral: 35 },
    interpretacao: {
      alto: "Saturação elevada (>50%) - Sugere hemocromatose, transfusões, hemólise, hepatopatia alcoólica",
      baixo: "Saturação baixa (<20%) - Indica deficiência de ferro, anemia ferropriva"
    }
  },

  tibc: {
    nome: "TIBC (Capacidade Total de Ligação do Ferro)",
    categoria: "Metabolismo do Ferro",
    unidade: "µg/dL",
    funcao: "Mede capacidade total do sangue de transportar ferro. Relacionada aos níveis de transferrina.",
    referencia: { geral: { min: 250, max: 450 } },
    ideal: { geral: 350 },
    interpretacao: {
      alto: "TIBC elevado - Indica deficiência de ferro, gravidez, anemia ferropriva",
      baixo: "TIBC baixo - Sugere excesso de ferro, inflamação crônica, desnutrição, cirrose"
    }
  },

  // ===== METABOLISMO GLICÍDICO AVANÇADO =====
  insulinaBasal: {
    nome: "Insulina Basal (Jejum)",
    categoria: "Metabolismo Glicêmico",
    unidade: "µUI/mL",
    funcao: "Avalia função pancreática e resistência insulínica. Fundamental para diagnóstico de síndrome metabólica.",
    referencia: { geral: { min: 2.6, max: 24.9 } },
    ideal: { geral: 5 },
    interpretacao: {
      alto: "Insulina elevada (>15) - Indica resistência insulínica, síndrome metabólica, risco de diabetes tipo 2, SOP",
      baixo: "Insulina baixa (<2.6) - Pode sugerir diabetes tipo 1, insuficiência pancreática"
    }
  },

  peptideoC: {
    nome: "Peptídeo C",
    categoria: "Metabolismo Glicêmico",
    unidade: "ng/mL",
    funcao: "Avalia reserva pancreática de insulina endógena. Diferencia diabetes tipo 1 de tipo 2.",
    referencia: { geral: { min: 0.9, max: 7.1 } },
    ideal: { geral: 2 },
    interpretacao: {
      alto: "Peptídeo C elevado - Indica resistência insulínica, hiperinsulinemia, insulinoma",
      baixo: "Peptídeo C baixo - Sugere diabetes tipo 1, insuficiência pancreática, pancreatite crônica"
    }
  },

  // ===== PERFIL LIPÍDICO COMPLETO =====
  colesterolTotal: {
    nome: "Colesterol Total",
    categoria: "Perfil Lipídico",
    unidade: "mg/dL",
    funcao: "Soma de todas as frações de colesterol. Base para avaliação cardiovascular.",
    referencia: { geral: { min: 0, max: 200 } },
    ideal: { geral: 180 },
    interpretacao: {
      alto: "Colesterol elevado (>200) - Risco cardiovascular aumentado, hipercolesterolemia familiar, hipotireoidismo, dieta inadequada",
      baixo: "Colesterol muito baixo (<150) - Pode indicar desnutrição, hipertireoidismo, má absorção, doença hepática"
    }
  },

  hdl: {
    nome: "HDL (Colesterol Bom)",
    categoria: "Perfil Lipídico",
    unidade: "mg/dL",
    funcao: "Remove colesterol das artérias. Proteção cardiovascular.",
    referencia: {
      homem: { min: 40, max: 999 },
      mulher: { min: 50, max: 999 }
    },
    ideal: {
      homem: 55,
      mulher: 65
    },
    interpretacao: {
      alto: "HDL elevado (>60) - Excelente proteção cardiovascular",
      baixo: "HDL baixo (<40 homens, <50 mulheres) - Risco cardiovascular aumentado, síndrome metabólica, sedentarismo, tabagismo"
    }
  },

  ldl: {
    nome: "LDL (Colesterol Ruim)",
    categoria: "Perfil Lipídico",
    unidade: "mg/dL",
    funcao: "Principal transportador de colesterol para os tecidos. Relacionado a aterosclerose.",
    referencia: { geral: { min: 0, max: 130 } },
    ideal: { geral: 100 },
    interpretacao: {
      alto: "LDL elevado (>130) - Risco de aterosclerose, doença coronariana, AVC, dieta rica em gorduras saturadas",
      baixo: "LDL muito baixo (<70) - Geralmente benéfico, mas em níveis extremos pode indicar má absorção"
    }
  },

  vldl: {
    nome: "VLDL (Lipoproteína de Muito Baixa Densidade)",
    categoria: "Perfil Lipídico",
    unidade: "mg/dL",
    funcao: "Transporta triglicerídeos do fígado para tecidos. Associado a risco cardiovascular.",
    referencia: { geral: { min: 2, max: 30 } },
    ideal: { geral: 15 },
    interpretacao: {
      alto: "VLDL elevado (>40) - Indica síndrome metabólica, resistência insulínica, triglicerídeos elevados",
      baixo: "VLDL baixo - Geralmente não tem significado clínico"
    }
  },

  triglicerideos: {
    nome: "Triglicerídeos",
    categoria: "Perfil Lipídico",
    unidade: "mg/dL",
    funcao: "Forma de armazenamento de energia. Elevação indica risco cardiovascular e síndrome metabólica.",
    referencia: { geral: { min: 0, max: 150 } },
    ideal: { geral: 100 },
    interpretacao: {
      alto: "Triglicerídeos elevados (>150) - Risco cardiovascular, síndrome metabólica, diabetes, consumo excessivo de carboidratos/álcool",
      baixo: "Triglicerídeos muito baixos (<50) - Pode indicar má absorção, desnutrição, hipertireoidismo"
    }
  },

  // ===== FUNÇÃO HEPÁTICA COMPLETA =====
  tgo: {
    nome: "TGO/AST (Transaminase Glutâmico Oxalacética)",
    categoria: "Função Hepática",
    unidade: "U/L",
    funcao: "Enzima presente no fígado, coração, músculos. Avalia lesão hepato-celular.",
    referencia: { geral: { min: 0, max: 40 } },
    ideal: { geral: 20 },
    interpretacao: {
      alto: "TGO elevado - Indica hepatite, cirrose, esteatose hepática, infarto do miocárdio, rabdomiólise, alcoolismo",
      baixo: "TGO baixo - Pode sugerir deficiência de vitamina B6"
    }
  },

  tgp: {
    nome: "TGP/ALT (Transaminase Glutâmico Pirúvica)",
    categoria: "Função Hepática",
    unidade: "U/L",
    funcao: "Enzima específica do fígado. Marcador mais sensível de lesão hepática que TGO.",
    referencia: { geral: { min: 0, max: 41 } },
    ideal: { geral: 20 },
    interpretacao: {
      alto: "TGP elevado - Sugere hepatite viral, esteatose, cirrose, uso de medicamentos hepatotóxicos, síndrome metabólica",
      baixo: "TGP baixo - Pode indicar deficiência de vitamina B6"
    }
  },

  gamaGt: {
    nome: "Gama GT (Gama Glutamil Transferase)",
    categoria: "Função Hepática",
    unidade: "U/L",
    funcao: "Marcador de colestase e consumo de álcool. Sensível a lesões do trato biliar.",
    referencia: {
      homem: { min: 0, max: 60 },
      mulher: { min: 0, max: 40 }
    },
    ideal: { geral: 20 },
    interpretacao: {
      alto: "Gama GT elevado - Indica alcoolismo, esteatose hepática, obstrução biliar, uso de medicamentos (anticonvulsivantes)",
      baixo: "Gama GT baixo - Geralmente sem significado clínico"
    }
  },

  fosfataseAlcalina: {
    nome: "Fosfatase Alcalina",
    categoria: "Função Hepática / Óssea",
    unidade: "U/L",
    funcao: "Enzima presente em fígado, ossos, intestinos. Avalia função hepatobiliar e metabolismo ósseo.",
    referencia: {
      adulto: { min: 30, max: 120 },
      crianca: { min: 150, max: 400 }
    },
    ideal: { adulto: 70 },
    interpretacao: {
      alto: "FA elevada - Sugere colestase, obstrução biliar, doença óssea (Paget), crescimento ósseo (crianças/adolescentes), hiperparatireoidismo",
      baixo: "FA baixa - Pode indicar deficiência de zinco, desnutrição, hipotireoidismo"
    }
  },

  bilirrubinaTotal: {
    nome: "Bilirrubina Total",
    categoria: "Função Hepática",
    unidade: "mg/dL",
    funcao: "Produto da degradação da hemoglobina. Avalia função hepática e hemólise.",
    referencia: { geral: { min: 0.3, max: 1.2 } },
    ideal: { geral: 0.7 },
    interpretacao: {
      alto: "Bilirrubina elevada (>1.2) - Indica icterícia, hepatite, cirrose, hemólise, síndrome de Gilbert",
      baixo: "Bilirrubina baixa - Geralmente sem significado clínico"
    }
  },

  bilirrubinaDireta: {
    nome: "Bilirrubina Direta (Conjugada)",
    categoria: "Função Hepática",
    unidade: "mg/dL",
    funcao: "Fração conjugada pelo fígado. Elevação indica problema hepatobiliar.",
    referencia: { geral: { min: 0, max: 0.3 } },
    ideal: { geral: 0.1 },
    interpretacao: {
      alto: "Bilirrubina direta elevada - Sugere obstrução biliar, hepatite, cirrose, colestase",
      baixo: "Sem significado clínico"
    }
  },

  bilirrubinaIndireta: {
    nome: "Bilirrubina Indireta (Não Conjugada)",
    categoria: "Função Hepática",
    unidade: "mg/dL",
    funcao: "Fração não conjugada. Elevação indica hemólise ou síndrome de Gilbert.",
    referencia: { geral: { min: 0.1, max: 0.8 } },
    ideal: { geral: 0.5 },
    interpretacao: {
      alto: "Bilirrubina indireta elevada - Indica hemólise, síndrome de Gilbert, anemia hemolítica",
      baixo: "Sem significado clínico"
    }
  },

  albumina: {
    nome: "Albumina",
    categoria: "Proteínas / Função Hepática",
    unidade: "g/dL",
    funcao: "Principal proteína plasmática. Mantém pressão oncótica e transporta substâncias. Marcador nutricional.",
    referencia: { geral: { min: 3.5, max: 5.5 } },
    ideal: { geral: 4.5 },
    interpretacao: {
      alto: "Albumina elevada (>5.5) - Geralmente indica desidratação",
      baixo: "Albumina baixa (<3.5) - Sugere desnutrição, cirrose, síndrome nefrótica, má absorção, inflamação crônica"
    }
  },

  proteinasTotal: {
    nome: "Proteínas Totais",
    categoria: "Proteínas",
    unidade: "g/dL",
    funcao: "Soma de albumina e globulinas. Avalia estado nutricional e função hepática.",
    referencia: { geral: { min: 6.0, max: 8.3 } },
    ideal: { geral: 7.0 },
    interpretacao: {
      alto: "Proteínas elevadas - Pode indicar desidratação, mieloma múltiplo, doenças autoimunes",
      baixo: "Proteínas baixas - Sugere desnutrição, má absorção, doença hepática, perdas renais"
    }
  },

  // ===== FUNÇÃO RENAL AVANÇADA =====
  cistatina: {
    nome: "Cistatina C",
    categoria: "Função Renal",
    unidade: "mg/L",
    funcao: "Marcador mais preciso de função renal que creatinina. Não é afetado por massa muscular.",
    referencia: { geral: { min: 0.51, max: 0.98 } },
    ideal: { geral: 0.75 },
    interpretacao: {
      alto: "Cistatina C elevada (>0.98) - Indica redução da função renal, risco cardiovascular aumentado",
      baixo: "Cistatina C baixa - Geralmente sem significado clínico"
    }
  },

  tfg: {
    nome: "TFG (Taxa de Filtração Glomerular)",
    categoria: "Função Renal",
    unidade: "mL/min/1,73m²",
    funcao: "Melhor medida global da função renal. Calculada a partir da creatinina.",
    referencia: { geral: { min: 90, max: 999 } },
    ideal: { geral: 100 },
    interpretacao: {
      alto: "TFG elevada - Pode ocorrer em hiperfiltração (diabetes inicial)",
      baixo: "TFG reduzida: <60 = Doença renal crônica; <30 = Insuficiência renal grave; <15 = Necessidade de diálise"
    }
  },

  acidoUrico: {
    nome: "Ácido Úrico",
    categoria: "Função Renal / Metabolismo Purinas",
    unidade: "mg/dL",
    funcao: "Produto final do metabolismo de purinas. Relacionado a gota e risco cardiovascular.",
    referencia: {
      homem: { min: 3.5, max: 7.0 },
      mulher: { min: 2.5, max: 6.0 }
    },
    ideal: {
      homem: 5.0,
      mulher: 4.0
    },
    interpretacao: {
      alto: "Ácido úrico elevado (>7.0) - Indica gota, síndrome metabólica, insuficiência renal, dieta rica em purinas, hipertensão",
      baixo: "Ácido úrico baixo (<2.5) - Pode sugerir deficiência de molibdênio, doença de Wilson, síndrome de Fanconi"
    }
  },

  // ===== ELETRÓLITOS =====
  sodio: {
    nome: "Sódio (Na+)",
    categoria: "Eletrólitos",
    unidade: "mEq/L",
    funcao: "Principal cátion extracelular. Regula volume e osmolaridade do plasma.",
    referencia: { geral: { min: 135, max: 145 } },
    ideal: { geral: 140 },
    interpretacao: {
      alto: "Hipernatremia (>145) - Indica desidratação, diabetes insipidus, perda de água livre",
      baixo: "Hiponatremia (<135) - Sugere excesso de água, SIADH, insuficiência cardíaca, cirrose, uso de diuréticos"
    }
  },

  potassio: {
    nome: "Potássio (K+)",
    categoria: "Eletrólitos",
    unidade: "mEq/L",
    funcao: "Principal cátion intracelular. Essencial para função cardíaca e muscular.",
    referencia: { geral: { min: 3.5, max: 5.0 } },
    ideal: { geral: 4.5 },
    interpretacao: {
      alto: "Hipercalemia (>5.0) - URGENTE - Arritmias, insuficiência renal, acidose, uso de IECA, hemólise",
      baixo: "Hipocalemia (<3.5) - Arritmias, fraqueza muscular, uso de diuréticos, vômitos, diarreia"
    }
  },

  calcio: {
    nome: "Cálcio Total",
    categoria: "Eletrólitos / Metabolismo Ósseo",
    unidade: "mg/dL",
    funcao: "Essencial para ossos, contração muscular, coagulação, transmissão nervosa.",
    referencia: { geral: { min: 8.5, max: 10.5 } },
    ideal: { geral: 9.5 },
    interpretacao: {
      alto: "Hipercalcemia (>10.5) - Hiperparatireoidismo, excesso de vitamina D, neoplasias, imobilização",
      baixo: "Hipocalcemia (<8.5) - Deficiência de vitamina D, hipoparatireoidismo, insuficiência renal, má absorção"
    }
  },

  calcioIonico: {
    nome: "Cálcio Iônico",
    categoria: "Eletrólitos",
    unidade: "mg/dL",
    funcao: "Forma ativa do cálcio. Melhor indicador de função do cálcio que o total.",
    referencia: { geral: { min: 4.6, max: 5.3 } },
    ideal: { geral: 5.0 },
    interpretacao: {
      alto: "Cálcio iônico elevado - Hiperparatireoidismo primário, intoxicação por vitamina D",
      baixo: "Cálcio iônico baixo - Hipoparatireoidismo, deficiência de vitamina D, alcalose"
    }
  },

  magnesio: {
    nome: "Magnésio",
    categoria: "Eletrólitos / Minerais",
    unidade: "mg/dL",
    funcao: "Cofator de mais de 300 enzimas. Essencial para energia, músculos, sistema nervoso.",
    referencia: { geral: { min: 1.7, max: 2.4 } },
    ideal: { geral: 2.0 },
    interpretacao: {
      alto: "Hipermagnesemia (>2.4) - Raro, pode ocorrer em insuficiência renal, excesso de suplementação",
      baixo: "Hipomagnesemia (<1.7) - Muito comum! Causa arritmias, cãibras, ansiedade, insônia, resistência insulínica"
    }
  },

  // ===== TIREOIDE COMPLETA =====
  t3Total: {
    nome: "T3 Total (Triiodotironina Total)",
    categoria: "Tireoide",
    unidade: "ng/dL",
    funcao: "Hormônio tireoidiano ativo. Forma ligada a proteínas.",
    referencia: { geral: { min: 80, max: 200 } },
    ideal: { geral: 120 },
    interpretacao: {
      alto: "T3 elevado - Hipertireoidismo, tireotoxicose, doença de Graves",
      baixo: "T3 baixo - Hipotireoidismo, síndrome do T3 baixo (doenças graves), má conversão de T4"
    }
  },

  t3Livre: {
    nome: "T3 Livre",
    categoria: "Tireoide",
    unidade: "pg/mL",
    funcao: "Fração livre e ativa do T3. Melhor marcador de função tireoidiana que T3 total.",
    referencia: { geral: { min: 2.3, max: 4.2 } },
    ideal: { geral: 3.2 },
    interpretacao: {
      alto: "T3 livre elevado - Hipertireoidismo, excesso de T3 exógeno",
      baixo: "T3 livre baixo - Hipotireoidismo, deficiência de selênio/zinco, estresse crônico, dieta muito restritiva"
    }
  },

  t3Reverso: {
    nome: "T3 Reverso (rT3)",
    categoria: "Tireoide",
    unidade: "ng/dL",
    funcao: "Forma inativa do T3. Aumenta em estresse, doenças, dietas restritivas.",
    referencia: { geral: { min: 9.2, max: 24.1 } },
    ideal: { geral: 15 },
    interpretacao: {
      alto: "rT3 elevado - Síndrome do T3 baixo, estresse crônico, resistência à tireoide, inflamação, deficiência de selênio",
      baixo: "rT3 baixo - Geralmente não tem significado clínico"
    }
  },

  antiTPO: {
    nome: "Anti-TPO (Anti-Tireoperoxidase)",
    categoria: "Tireoide - Autoimunidade",
    unidade: "UI/mL",
    funcao: "Anticorpo contra enzima da tireoide. Marcador de tireoidite de Hashimoto.",
    referencia: { geral: { min: 0, max: 35 } },
    ideal: { geral: 0 },
    interpretacao: {
      alto: "Anti-TPO elevado (>35) - Indica tireoidite de Hashimoto, maior risco de hipotireoidismo, associado a deficiência de vitamina D e selênio",
      baixo: "Anti-TPO negativo - Sem autoimunidade tireoidiana detectada"
    }
  },

  antiTireoglobulina: {
    nome: "Anti-Tireoglobulina",
    categoria: "Tireoide - Autoimunidade",
    unidade: "UI/mL",
    funcao: "Anticorpo contra proteína da tireoide. Marcador de autoimunidade tireoidiana.",
    referencia: { geral: { min: 0, max: 115 } },
    ideal: { geral: 0 },
    interpretacao: {
      alto: "Anti-TG elevado - Tireoidite de Hashimoto, doença de Graves, monitoramento de câncer de tireoide",
      baixo: "Anti-TG negativo - Sem autoimunidade tireoidiana"
    }
  },

  // ===== VITAMINAS E MINERAIS =====
  vitaminaD25OH: {
    nome: "Vitamina D 25(OH)",
    categoria: "Vitaminas",
    unidade: "ng/mL",
    funcao: "Forma de estoque de vitamina D. Essencial para ossos, imunidade, hormônios, saúde mental.",
    referencia: { geral: { min: 30, max: 100 } },
    ideal: { geral: 60 },
    interpretacao: {
      alto: "Vitamina D >100 - Pode indicar suplementação excessiva (risco de hipercalcemia >150 ng/mL)",
      baixo: "Vitamina D baixa: <20 = Deficiência grave; 20-30 = Insuficiência. Causas: Pouca exposição solar, obesidade, má absorção"
    }
  },

  vitaminaB9: {
    nome: "Vitamina B9 (Ácido Fólico Eritrocitário)",
    categoria: "Vitaminas",
    unidade: "ng/mL",
    funcao: "Forma intracelular de folato. Melhor indicador de estoques teciduais que folato sérico.",
    referencia: { geral: { min: 280, max: 791 } },
    ideal: { geral: 500 },
    interpretacao: {
      alto: "Folato eritrocitário elevado - Geralmente por suplementação",
      baixo: "Folato eritrocitário baixo - Deficiência real de folato, anemia megaloblástica, má absorção"
    }
  },

  homocisteina: {
    nome: "Homocisteína",
    categoria: "Vitaminas / Cardiovascular",
    unidade: "µmol/L",
    funcao: "Aminoácido tóxico. Marcador de deficiência de B6, B12, folato e risco cardiovascular.",
    referencia: { geral: { min: 5, max: 15 } },
    ideal: { geral: 7 },
    interpretacao: {
      alto: "Homocisteína elevada (>15) - Risco cardiovascular, trombose, déficit cognitivo, deficiência de B6/B12/folato, mutação MTHFR",
      baixo: "Homocisteína baixa - Geralmente sem significado clínico"
    }
  },

  zinco: {
    nome: "Zinco Sérico",
    categoria: "Minerais",
    unidade: "µg/dL",
    funcao: "Cofator de mais de 300 enzimas. Essencial para imunidade, cicatrização, hormônios, paladar.",
    referencia: { geral: { min: 70, max: 120 } },
    ideal: { geral: 90 },
    interpretacao: {
      alto: "Zinco elevado (>120) - Raro, pode ocorrer em suplementação excessiva",
      baixo: "Zinco baixo (<70) - Muito comum! Causa baixa imunidade, queda de cabelo, acne, hipogonadismo, má cicatrização"
    }
  },

  selenio: {
    nome: "Selênio Sérico",
    categoria: "Minerais",
    unidade: "µg/L",
    funcao: "Antioxidante potente. Essencial para conversão de T4 em T3, proteção tireoidiana.",
    referencia: { geral: { min: 70, max: 150 } },
    ideal: { geral: 120 },
    interpretacao: {
      alto: "Selênio >150 - Pode causar toxicidade (>200 é tóxico): queda de cabelo, unhas quebradiças, fadiga",
      baixo: "Selênio <70 - Deficiência: prejudica função tireoidiana, aumenta risco de Hashimoto, reduz imunidade"
    }
  },

  // ===== HORMÔNIOS SEXUAIS =====
  testosteronaTotal: {
    nome: "Testosterona Total",
    categoria: "Hormônios Sexuais",
    unidade: "ng/dL",
    funcao: "Principal hormônio masculino. Importante para massa muscular, libido, humor, energia.",
    referencia: {
      homem: { min: 264, max: 916 },
      mulher: { min: 15, max: 70 }
    },
    ideal: {
      homem: 600,
      mulher: 40
    },
    interpretacao: {
      alto: "Testosterona elevada - Homens: uso de anabolizantes. Mulheres: SOP, hiperandrogenismo, tumores adrenais",
      baixo: "Testosterona baixa - Homens: hipogonadismo, obesidade, diabetes, estresse. Mulheres: insuficiência adrenal"
    }
  },

  testosteronaLivre: {
    nome: "Testosterona Livre",
    categoria: "Hormônios Sexuais",
    unidade: "pg/mL",
    funcao: "Fração biologicamente ativa. Melhor indicador funcional que testosterona total.",
    referencia: {
      homem: { min: 50, max: 210 },
      mulher: { min: 0.2, max: 5.0 }
    },
    ideal: {
      homem: 120,
      mulher: 2
    },
    interpretacao: {
      alto: "Testosterona livre elevada - Similar à testosterona total",
      baixo: "Testosterona livre baixa - Déficit androgênico funcional, mesmo com testosterona total normal"
    }
  },

  shbg: {
    nome: "SHBG (Globulina Ligadora de Hormônios Sexuais)",
    categoria: "Hormônios Sexuais",
    unidade: "nmol/L",
    funcao: "Proteína que liga testosterona e estrogênio. Afeta biodisponibilidade hormonal.",
    referencia: {
      homem: { min: 13, max: 71 },
      mulher: { min: 18, max: 114 }
    },
    ideal: {
      homem: 35,
      mulher: 60
    },
    interpretacao: {
      alto: "SHBG elevado - Reduz testosterona livre, hipertireoidismo, anorexia, uso de estrogênio",
      baixo: "SHBG baixo - Aumenta testosterona livre, síndrome metabólica, hipotireoidismo, SOP, obesidade"
    }
  },

  dhea: {
    nome: "DHEA (Dehidroepiandrosterona)",
    categoria: "Hormônios Adrenais",
    unidade: "µg/dL",
    funcao: "Hormônio precursor de testosterona e estrogênio. Marcador de função adrenal.",
    referencia: {
      homem: { min: 180, max: 1250 },
      mulher: { min: 65, max: 380 }
    },
    ideal: {
      homem: 400,
      mulher: 200
    },
    interpretacao: {
      alto: "DHEA elevado - Hiperplasia adrenal, tumor adrenal, SOP",
      baixo: "DHEA baixo - Fadiga adrenal, estresse crônico, envelhecimento, insuficiência adrenal"
    }
  },

  estradiol: {
    nome: "Estradiol (E2)",
    categoria: "Hormônios Sexuais",
    unidade: "pg/mL",
    funcao: "Principal estrogênio. Essencial para saúde óssea, cardiovascular, cognitiva, reprodutiva.",
    referencia: {
      homemAdulto: { min: 10, max: 40 },
      mulherFolicular: { min: 30, max: 120 },
      mulherOvulatoria: { min: 100, max: 400 },
      mulherLutea: { min: 50, max: 240 },
      mulherMenopausa: { min: 0, max: 30 }
    },
    ideal: {
      homem: 25,
      mulherFolicular: 80
    },
    interpretacao: {
      alto: "Estradiol elevado - Mulheres: tumor ovariano. Homens: ginecomastia, uso de testosterona (conversão)",
      baixo: "Estradiol baixo - Menopausa, insuficiência ovariana, amenorreia, osteoporose, sintomas climatéricos"
    }
  },

  progesterona: {
    nome: "Progesterona",
    categoria: "Hormônios Sexuais",
    unidade: "ng/mL",
    funcao: "Hormônio da fase lútea. Prepara útero para gravidez, equilibra estrogênio.",
    referencia: {
      mulherFolicular: { min: 0.1, max: 0.7 },
      mulherLutea: { min: 2.0, max: 25.0 },
      mulherMenopausa: { min: 0.1, max: 0.8 }
    },
    ideal: {
      mulherLutea: 15
    },
    interpretacao: {
      alto: "Progesterona elevada - Gravidez, tumor ovariano, hiperplasia adrenal",
      baixo: "Progesterona baixa - Anovulação, insuficiência lútea, amenorreia, ciclos irregulares, infertilidade"
    }
  },

  cortisol: {
    nome: "Cortisol (manhã)",
    categoria: "Hormônios Adrenais",
    unidade: "µg/dL",
    funcao: "Hormônio do estresse. Regula metabolismo, imunidade, resposta ao estresse.",
    referencia: {
      manha: { min: 6.2, max: 19.4 },
      tarde: { min: 2.3, max: 11.9 }
    },
    ideal: {
      manha: 12
    },
    interpretacao: {
      alto: "Cortisol elevado - Síndrome de Cushing, estresse crônico, ansiedade, depressão, insônia",
      baixo: "Cortisol baixo - Fadiga adrenal, doença de Addison, hipopituitarismo, fadiga crônica"
    }
  }
};

export default TODOS_OS_EXAMES_COMPLETOS;
