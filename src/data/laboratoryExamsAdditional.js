/**
 * EXAMES LABORATORIAIS ADICIONAIS - MEDICINA FUNCIONAL
 * Vitaminas, Minerais, Metais Pesados, Marcadores Especializados
 * Parte 2/2 do sistema completo de exames
 */

export const LABORATORY_EXAMS_ADDITIONAL = {
  
  // ========================================================================
  // VITAMINAS - PAINEL COMPLETO
  // ========================================================================

  vitaminaA: {
    nome: "Vitamina A (Retinol Sérico)",
    categoria: "Vitaminas",
    unidade: "mg/L",
    funcao: "Vitamina lipossolúvel essencial para visão, imunidade, integridade epitelial, diferenciação celular e metabolismo do ferro.",
    referencia: { geral: { min: 0.30, max: 0.70 } },
    ideal: { geral: 0.60 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.25, nivel: "Deficiência", cor: "#ff5722" },
        Q2: { min: 0.25, max: 0.40, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 0.40, max: 0.65, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 0.65, max: 0.80, nivel: "Alto", cor: "#ffc107" },
        Q5: { min: 0.80, max: 99, nivel: "Toxicidade", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Vitamina A muito baixa - Deficiência significativa",
        causas: ["Má absorção lipídica", "Doença hepática", "Dieta inadequada", "Deficiência de zinco"],
        sintomas: ["Cegueira noturna", "Pele seca", "Infecções recorrentes", "Xeroftalmia"],
        orientacoes: ["Vitamina A 10.000-25.000 UI/dia", "Zinco", "Gorduras saudáveis", "Beta-caroteno"]
      },
      Q3: { significado: "Vitamina A ideal" },
      Q5: {
        significado: "Vitamina A muito alta - Risco de toxicidade",
        sintomas: ["Cefaleia", "Náusea", "Descamação de pele", "Dor óssea"],
        orientacoes: ["Suspender suplementação", "Avaliar função hepática"]
      }
    },
    correlacoes: ["zinco", "ferritina", "tgo", "tgp"]
  },

  vitaminaB1: {
    nome: "Vitamina B1 (Tiamina)",
    categoria: "Vitaminas",
    unidade: "nmol/L",
    funcao: "Cofator essencial na conversão de carboidratos em energia (ciclo de Krebs). Crucial para saúde neurológica e cardiovascular.",
    referencia: { geral: { min: 70, max: 180 } },
    ideal: { geral: 135 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 50, nivel: "Deficiência", cor: "#ff5722" },
        Q2: { min: 50, max: 90, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 90, max: 160, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 160, max: 200, nivel: "Alto", cor: "#4caf50" },
        Q5: { min: 200, max: 999, nivel: "Muito Alto", cor: "#4caf50" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "B1 muito baixa - Beribéri ou Wernicke",
        sintomas: ["Fadiga extrema", "Neuropatia periférica", "Confusão mental", "Insuficiência cardíaca"],
        orientacoes: ["B1 100-300mg/dia", "Avaliar alcoolismo", "Complexo B"]
      },
      Q3: { significado: "B1 ideal" }
    },
    correlacoes: ["glicose", "acidoLactico"]
  },

  vitaminaB2: {
    nome: "Vitamina B2 (Riboflavina)",
    categoria: "Vitaminas",
    unidade: "μg/mL",
    funcao: "Essencial para produção de energia (FAD, FMN), metabolismo de aminoácidos e detoxificação hepática fase 1.",
    referencia: { geral: { min: 5.3, max: 15 } },
    ideal: { geral: 10 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 4, nivel: "Deficiência", cor: "#ff9800" },
        Q2: { min: 4, max: 7, nivel: "Baixo", cor: "#ffc107" },
        Q3: { min: 7, max: 13, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 13, max: 20, nivel: "Alto", cor: "#4caf50" },
        Q5: { min: 20, max: 999, nivel: "Muito Alto", cor: "#4caf50" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "B2 muito baixa",
        sintomas: ["Queilite angular", "Glossite", "Fotofobia", "Dermatite seborreica"],
        orientacoes: ["B2 100-400mg/dia", "Complexo B"]
      },
      Q3: { significado: "B2 ideal" }
    },
    correlacoes: ["vitaminaB6", "tgo", "tgp"]
  },

  vitaminaB3: {
    nome: "Vitamina B3 (Niacina)",
    categoria: "Vitaminas",
    unidade: "mg/L",
    funcao: "Participa de NAD e NADP em mais de 200 reações enzimáticas. Essencial para energia, síntese hormonal e reparo de DNA.",
    referencia: { geral: { min: 0.4, max: 6.6 } },
    ideal: { geral: 5 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.3, nivel: "Deficiência - Pelagra", cor: "#ff5722" },
        Q2: { min: 0.3, max: 2, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 2, max: 6, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 6, max: 10, nivel: "Alto", cor: "#ffc107" },
        Q5: { min: 10, max: 999, nivel: "Toxicidade", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "B3 muito baixa - Pelagra",
        sintomas: ["Dermatite", "Diarreia", "Demência", "Glossite"],
        orientacoes: ["B3 500-1000mg/dia (niacinamida)", "Complexo B"]
      },
      Q3: { significado: "B3 ideal" }
    },
    correlacoes: ["colesterolTotal", "triglicerideos"]
  },

  vitaminaB5: {
    nome: "Vitamina B5 (Ácido Pantotênico)",
    categoria: "Vitaminas",
    unidade: "μg/mL",
    funcao: "Essencial na formação de coenzima A. Participa de beta-oxidação de ácidos graxos, metabolismo de aminoácidos e síntese de hormônios esteroides.",
    referencia: { geral: { min: 2.0, max: 20.0 } },
    ideal: { geral: 12 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 1.5, nivel: "Deficiência", cor: "#ff9800" },
        Q2: { min: 1.5, max: 5, nivel: "Baixo", cor: "#ffc107" },
        Q3: { min: 5, max: 18, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 18, max: 25, nivel: "Alto", cor: "#4caf50" },
        Q5: { min: 25, max: 999, nivel: "Muito Alto", cor: "#4caf50" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "B5 muito baixa",
        sintomas: ["Fadiga", "Insônia", "Queda de cabelo", "Síndrome do pé queimante"],
        orientacoes: ["B5 500-1000mg/dia", "Avaliar estresse crônico"]
      },
      Q3: { significado: "B5 ideal" }
    },
    correlacoes: ["cortisol", "dhea"]
  },

  vitaminaB6: {
    nome: "Vitamina B6 (Piridoxina)",
    categoria: "Vitaminas",
    unidade: "μg/L",
    funcao: "Metabolismo de aminoácidos, síntese de neurotransmissores (dopamina, serotonina, GABA), regulação de homocisteína e suporte imunológico.",
    referencia: { geral: { min: 8.7, max: 27.2 } },
    ideal: { geral: 18 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 5, nivel: "Deficiência", cor: "#ff9800" },
        Q2: { min: 5, max: 12, nivel: "Baixo", cor: "#ffc107" },
        Q3: { min: 12, max: 25, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 25, max: 40, nivel: "Alto", cor: "#ffc107" },
        Q5: { min: 40, max: 999, nivel: "Toxicidade", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "B6 muito baixa",
        sintomas: ["Irritabilidade", "Ansiedade", "TPM", "Parestesias", "Anemia"],
        orientacoes: ["B6 50-100mg/dia (P5P)", "Magnésio"]
      },
      Q3: { significado: "B6 ideal" },
      Q5: {
        significado: "B6 muito alta - Risco de neuropatia",
        orientacoes: ["Reduzir suplementação"]
      }
    },
    correlacoes: ["homocisteina", "magnesio", "vitaminaB12"]
  },

  vitaminaB7: {
    nome: "Vitamina B7 (Biotina)",
    categoria: "Vitaminas",
    unidade: "ng/L",
    funcao: "Cofator de enzimas carboxilases. Metabolismo de gorduras, proteínas e carboidratos. Essencial para saúde de pele, unhas e cabelo.",
    referencia: { geral: { min: 200, max: 900 } },
    ideal: { geral: 400 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 150, nivel: "Deficiência", cor: "#ff9800" },
        Q2: { min: 150, max: 300, nivel: "Baixo", cor: "#ffc107" },
        Q3: { min: 300, max: 700, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 700, max: 1000, nivel: "Alto", cor: "#4caf50" },
        Q5: { min: 1000, max: 9999, nivel: "Muito Alto", cor: "#4caf50" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Biotina muito baixa",
        sintomas: ["Queda de cabelo", "Dermatite seborreica", "Unhas frágeis", "Fadiga"],
        orientacoes: ["Biotina 5-10mg/dia", "Evitar clara de ovo crua"]
      },
      Q3: { significado: "Biotina ideal" }
    },
    correlacoes: []
  },

  vitaminaB9: {
    nome: "Vitamina B9 (Ácido Fólico)",
    categoria: "Vitaminas",
    unidade: "ng/mL",
    funcao: "Essencial para síntese de DNA, divisão celular, produção de glóbulos vermelhos e metabolismo de homocisteína. Crucial na gestação.",
    referencia: { geral: { min: 3.0, max: 17.0 } },
    ideal: { geral: 14 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 3, nivel: "Deficiência", cor: "#ff5722" },
        Q2: { min: 3, max: 7, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 7, max: 16, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 16, max: 25, nivel: "Alto", cor: "#4caf50" },
        Q5: { min: 25, max: 999, nivel: "Muito Alto", cor: "#ffc107" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Ácido fólico muito baixo - Anemia megaloblástica",
        causas: ["Má absorção", "Alcoolismo", "Uso de metotrexato", "Deficiência alimentar"],
        sintomas: ["Anemia", "Fadiga", "Glossite", "Defeitos tubo neural (gestação)"],
        orientacoes: ["Metilfolato 1-5mg/dia", "B12", "Investigar má absorção"],
        urgente: true
      },
      Q3: { significado: "Ácido fólico ideal" }
    },
    correlacoes: ["vitaminaB12", "homocisteina", "vcm"]
  },

  vitaminaB12: {
    nome: "Vitamina B12 (Cobalamina)",
    categoria: "Vitaminas",
    unidade: "pg/mL",
    funcao: "Síntese de DNA, produção de glóbulos vermelhos, mielinização neuronal e metabolismo de homocisteína. Absorção depende de fator intrínseco gástrico.",
    referencia: { geral: { min: 200, max: 900 } },
    ideal: { geral: 700 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 200, nivel: "Deficiência", cor: "#ff5722" },
        Q2: { min: 200, max: 400, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 400, max: 900, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 900, max: 1500, nivel: "Alto", cor: "#4caf50" },
        Q5: { min: 1500, max: 9999, nivel: "Muito Alto", cor: "#ffc107" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "B12 muito baixa - Anemia megaloblástica e neuropatia",
        causas: ["Anemia perniciosa", "Gastrite atrófica", "Vegetarianismo", "Uso de metformina/IBP", "Má absorção"],
        sintomas: ["Fadiga", "Formigamentos", "Perda de memória", "Glossite", "Depressão"],
        orientacoes: ["B12 1000-5000mcg/dia sublingual (metilcobalamina)", "Investigar fator intrínseco", "Injeções IM se má absorção"],
        urgente: true
      },
      Q3: { significado: "B12 ideal" }
    },
    correlacoes: ["acidoMetilmalonico", "homocisteina", "vitaminaB9", "vcm"]
  },

  acidoMetilmalonico: {
    nome: "Ácido Metilmalônico (MMA)",
    categoria: "Vitaminas",
    unidade: "μmol/L",
    funcao: "Marcador funcional de deficiência intracelular de B12. Acumula quando B12 está baixa, antes mesmo da alteração sérica.",
    referencia: { geral: { min: 0.08, max: 0.56 } },
    ideal: { geral: 0.25 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.15, nivel: "Ótimo", cor: "#4caf50" },
        Q2: { min: 0.15, max: 0.35, nivel: "Ideal", cor: "#4caf50" },
        Q3: { min: 0.35, max: 0.56, nivel: "Limítrofe", cor: "#ffc107" },
        Q4: { min: 0.56, max: 1.0, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 1.0, max: 99, nivel: "Muito Alto", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: { significado: "MMA ótimo - B12 funcional adequada" },
      Q5: {
        significado: "MMA muito elevado - Deficiência funcional de B12",
        causas: ["Deficiência intracelular de B12", "Disfunção mitocondrial"],
        orientacoes: ["Suplementar B12 mesmo que B12 sérica esteja normal", "Avaliar absorção"]
      }
    },
    correlacoes: ["vitaminaB12", "homocisteina"]
  },

  vitaminaC: {
    nome: "Vitamina C (Ácido Ascórbico)",
    categoria: "Vitaminas",
    unidade: "mg/dL",
    funcao: "Potente antioxidante hidrossolúvel. Síntese de colágeno, absorção de ferro, função imune, produção de neurotransmissores e reciclagem de vitamina E.",
    referencia: { geral: { min: 0.6, max: 2.0 } },
    ideal: { geral: 1.6 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.2, nivel: "Deficiência - Escorbuto", cor: "#ff5722" },
        Q2: { min: 0.2, max: 0.8, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 0.8, max: 1.8, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 1.8, max: 2.5, nivel: "Alto", cor: "#4caf50" },
        Q5: { min: 2.5, max: 99, nivel: "Muito Alto", cor: "#4caf50" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Vitamina C muito baixa - Escorbuto",
        sintomas: ["Sangramento gengival", "Fadiga", "Pele seca", "Cicatrização lenta", "Imunidade baixa"],
        orientacoes: ["Vitamina C 1-3g/dia", "Frutas cítricas", "Avaliar má absorção"]
      },
      Q3: { significado: "Vitamina C ideal" }
    },
    correlacoes: ["ferroSerico", "proteinaCreativa"]
  },

  caroteno: {
    nome: "Caroteno Sérico",
    categoria: "Vitaminas",
    unidade: "μg/dL",
    funcao: "Precursor de vitamina A. Antioxidante potente. Avalia biodisponibilidade e potencial antioxidante endógeno.",
    referencia: { geral: { min: 38, max: 400 } },
    ideal: { geral: 250 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 50, nivel: "Muito Baixo", cor: "#ff9800" },
        Q2: { min: 50, max: 150, nivel: "Baixo", cor: "#ffc107" },
        Q3: { min: 150, max: 350, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 350, max: 500, nivel: "Alto", cor: "#ffc107" },
        Q5: { min: 500, max: 9999, nivel: "Muito Alto - Carotenodermia", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Caroteno muito baixo",
        causas: ["Baixa ingestão de vegetais", "Má absorção lipídica", "Estresse oxidativo"],
        orientacoes: ["Aumentar vegetais coloridos", "Gorduras saudáveis"]
      },
      Q3: { significado: "Caroteno ideal" }
    },
    correlacoes: ["vitaminaA", "vitaminaE"]
  },

  // ========================================================================
  // MINERAIS ESSENCIAIS
  // ========================================================================

  calcioIonico: {
    nome: "Cálcio Iônico",
    categoria: "Minerais",
    unidade: "mg/dL",
    funcao: "Fração livre e biologicamente ativa do cálcio. Essencial para contração muscular, coagulação sanguínea e sinalização celular.",
    referencia: { geral: { min: 4.6, max: 5.3 } },
    ideal: { geral: 5.0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 4.0, nivel: "Hipocalcemia", cor: "#ff5722" },
        Q2: { min: 4.0, max: 4.6, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 4.6, max: 5.1, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 5.1, max: 5.5, nivel: "Elevado", cor: "#ffc107" },
        Q5: { min: 5.5, max: 99, nivel: "Hipercalcemia", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Cálcio iônico muito baixo - Hipocalcemia",
        sintomas: ["Parestesias", "Câimbras", "Tetania", "Arritmias"],
        orientacoes: ["Cálcio IV se grave", "Avaliar PTH e vitamina D"],
        urgente: true
      },
      Q3: { significado: "Cálcio iônico ideal" },
      Q5: {
        significado: "Cálcio iônico muito alto - Hipercalcemia",
        causas: ["Hiperparatireoidismo", "Intoxicação por vitamina D", "Câncer"],
        urgente: true
      }
    },
    correlacoes: ["calcioSerico", "pth", "vitaminaD"]
  },

  calcioSerico: {
    nome: "Cálcio Sérico (Total)",
    categoria: "Minerais",
    unidade: "mg/dL",
    funcao: "Inclui cálcio livre e ligado a proteínas (albumina). Triagem de desordens do metabolismo ósseo, paratireoide e vitamina D.",
    referencia: { geral: { min: 8.6, max: 10.2 } },
    ideal: { geral: 9.5 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 8.0, nivel: "Hipocalcemia", cor: "#ff9800" },
        Q2: { min: 8.0, max: 8.8, nivel: "Baixo", cor: "#ffc107" },
        Q3: { min: 8.8, max: 10.0, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 10.0, max: 10.5, nivel: "Elevado", cor: "#ffc107" },
        Q5: { min: 10.5, max: 99, nivel: "Hipercalcemia", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q2: {
        significado: "Cálcio sérico baixo",
        causas: ["Deficiência de vitamina D", "Hipoparatireoidismo", "Má absorção", "Hipoalbuminemia"],
        orientacoes: ["Avaliar cálcio corrigido pela albumina", "Vitamina D", "PTH"]
      },
      Q3: { significado: "Cálcio sérico ideal" }
    },
    correlacoes: ["albumina", "pth", "vitaminaD", "magnesio"]
  },

  magnesio: {
    nome: "Magnésio",
    categoria: "Minerais",
    unidade: "mg/dL",
    funcao: "Segundo cátion intracelular mais abundante. Cofator em mais de 300 reações enzimáticas. Produção de ATP, síntese de DNA/RNA, relaxamento muscular.",
    referencia: { geral: { min: 1.7, max: 2.2 } },
    ideal: { geral: 2.1 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 1.5, nivel: "Deficiência", cor: "#ff5722" },
        Q2: { min: 1.5, max: 1.8, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 1.8, max: 2.2, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 2.2, max: 2.5, nivel: "Elevado", cor: "#ffc107" },
        Q5: { min: 2.5, max: 99, nivel: "Hipermagnesemia", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Magnésio muito baixo - Deficiência significativa",
        causas: ["Deficiência alimentar", "Uso de IBP/diuréticos", "Diabetes", "Álcool", "Estresse"],
        sintomas: ["Câimbras", "Fadiga", "Arritmias", "Ansiedade", "Insônia", "Resistência insulínica"],
        orientacoes: ["Magnésio 400-600mg/dia (glicinato, treonato)", "Reduzir cafeína", "Gerenciar estresse"]
      },
      Q3: { significado: "Magnésio ideal" }
    },
    correlacoes: ["calcio", "potassio", "insulina", "vitaminaD"]
  },

  zinco: {
    nome: "Zinco",
    categoria: "Minerais",
    unidade: "μg/dL",
    funcao: "Cofator de mais de 300 enzimas. Essencial para imunidade, síntese proteica, cicatrização, função cognitiva, fertilidade e conversão de T4 em T3.",
    referencia: { geral: { min: 70, max: 120 } },
    ideal: { geral: 100 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 60, nivel: "Deficiência", cor: "#ff5722" },
        Q2: { min: 60, max: 80, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 80, max: 115, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 115, max: 150, nivel: "Alto", cor: "#ffc107" },
        Q5: { min: 150, max: 999, nivel: "Toxicidade", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Zinco muito baixo - Deficiência significativa",
        causas: ["Deficiência alimentar", "Má absorção", "Acrodermatite enteropática", "Alcoolismo"],
        sintomas: ["Imunidade baixa", "Queda de cabelo", "Acne", "Diarreia", "Alterações de paladar", "Infertilidade"],
        orientacoes: ["Zinco 30-50mg/dia (picolinato)", "Longe das refeições", "Avaliar cobre"]
      },
      Q3: { significado: "Zinco ideal" }
    },
    correlacoes: ["cobre", "vitaminaA", "testosterona", "t3Livre"]
  },

  cobre: {
    nome: "Cobre Sérico",
    categoria: "Minerais",
    unidade: "μg/dL",
    funcao: "Essencial para enzimas antioxidantes (SOD), produção de energia, síntese de colágeno e metabolismo de ferro.",
    referencia: { geral: { min: 70, max: 150 } },
    ideal: { geral: 110 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 60, nivel: "Deficiência", cor: "#ff9800" },
        Q2: { min: 60, max: 90, nivel: "Baixo", cor: "#ffc107" },
        Q3: { min: 90, max: 130, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 130, max: 180, nivel: "Elevado", cor: "#ffc107" },
        Q5: { min: 180, max: 999, nivel: "Toxicidade", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Cobre muito baixo",
        sintomas: ["Anemia", "Neutropenia", "Fragilidade capilar", "Fadiga"],
        orientacoes: ["Cobre 2-3mg/dia", "Avaliar zinco (antagonismo)"]
      },
      Q3: { significado: "Cobre ideal" },
      Q5: {
        significado: "Cobre muito elevado - Toxicidade ou inflamação",
        causas: ["Doença de Wilson", "Uso de DIU de cobre", "Inflamação crônica"],
        orientacoes: ["Quelação se Wilson", "Avaliar ceruloplasmina"]
      }
    },
    correlacoes: ["zinco", "ferritina", "proteinaCreativa"]
  },

  selenio: {
    nome: "Selênio",
    categoria: "Minerais",
    unidade: "μg/L",
    funcao: "Essencial para glutationa peroxidases e tiorredoxina redutases (defesa antioxidante). Conversão de T4 em T3 na tireoide.",
    referencia: { geral: { min: 70, max: 150 } },
    ideal: { geral: 150 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 60, nivel: "Deficiência", cor: "#ff9800" },
        Q2: { min: 60, max: 100, nivel: "Baixo", cor: "#ffc107" },
        Q3: { min: 100, max: 180, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 180, max: 250, nivel: "Alto", cor: "#ffc107" },
        Q5: { min: 250, max: 999, nivel: "Toxicidade", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Selênio muito baixo",
        causas: ["Deficiência alimentar", "Doença de Crohn", "Solos pobres em selênio"],
        sintomas: ["Fadiga", "Imunidade baixa", "Hipotireoidismo", "Infertilidade"],
        orientacoes: ["Selênio 200mcg/dia (selenometionina)", "Castanha-do-pará 2-3/dia"]
      },
      Q3: { significado: "Selênio ideal" },
      Q5: {
        significado: "Selênio muito alto - Toxicidade",
        sintomas: ["Queda de cabelo", "Náusea", "Fadiga", "Alterações neurológicas"]
      }
    },
    correlacoes: ["t3Livre", "antiTPO", "proteinaCreativa"]
  },

  manganes: {
    nome: "Manganês (Sangue Total)",
    categoria: "Minerais",
    unidade: "μg/L",
    funcao: "Cofator de superóxido dismutase (antioxidante), metabolismo de carboidratos, lipídeos, proteínas e formação óssea.",
    referencia: { geral: { min: 4, max: 15 } },
    ideal: { geral: 22 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 4, nivel: "Baixo", cor: "#ff9800" },
        Q2: { min: 4, max: 10, nivel: "Normal", cor: "#ffc107" },
        Q3: { min: 10, max: 25, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 25, max: 40, nivel: "Alto", cor: "#ffc107" },
        Q5: { min: 40, max: 999, nivel: "Neurotoxicidade", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Manganês baixo",
        sintomas: ["Fadiga", "Osteopenia", "Alterações metabólicas"],
        orientacoes: ["Manganês 5-10mg/dia", "Chás, grãos integrais"]
      },
      Q3: { significado: "Manganês ideal" },
      Q5: {
        significado: "Manganês muito alto - Neurotoxicidade",
        causas: ["Exposição ocupacional (soldadores)", "Contaminação de água"],
        sintomas: ["Tremores", "Rigidez", "Alterações motoras (parkinsonismo)"]
      }
    },
    correlacoes: []
  },

  cromo: {
    nome: "Cromo (Sangue)",
    categoria: "Minerais",
    unidade: "mg/L",
    funcao: "Potencializa ação da insulina. Crucial para metabolismo de carboidratos, lipídeos e proteínas. Reduz desejo por carboidratos.",
    referencia: { geral: { min: 2.5, max: 3.5 } },
    ideal: { geral: 3.0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 1.5, nivel: "Deficiência", cor: "#ff9800" },
        Q2: { min: 1.5, max: 2.5, nivel: "Baixo", cor: "#ffc107" },
        Q3: { min: 2.5, max: 3.5, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 3.5, max: 5, nivel: "Alto", cor: "#ffc107" },
        Q5: { min: 5, max: 999, nivel: "Toxicidade", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Cromo muito baixo",
        sintomas: ["Hiperglicemia", "Resistência insulínica", "Desejo por doces", "Ganho de peso"],
        orientacoes: ["Cromo 200-400mcg/dia (picolinato)", "Canela"]
      },
      Q3: { significado: "Cromo ideal" }
    },
    correlacoes: ["glicose", "insulina", "homaIR"]
  },

  pth: {
    nome: "PTH (Paratormônio)",
    categoria: "Metabolismo Ósseo",
    unidade: "pg/mL",
    funcao: "Hormônio das paratireoides. Regula cálcio e fósforo séricos. Mobiliza cálcio ósseo, aumenta absorção intestinal (via vitamina D) e reduz excreção renal.",
    referencia: { geral: { min: 15, max: 65 } },
    ideal: { geral: 35 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 10, nivel: "Hipoparatireoidismo", cor: "#ff9800" },
        Q2: { min: 10, max: 25, nivel: "Baixo", cor: "#ffc107" },
        Q3: { min: 25, max: 45, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 45, max: 70, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 70, max: 999, nivel: "Hiperparatireoidismo", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "PTH muito baixo - Hipoparatireoidismo",
        causas: ["Dano cirúrgico das paratireoides", "Deficiência de magnésio", "Intoxicação por vitamina D"],
        orientacoes: ["Avaliar cálcio e magnésio", "Reposição de cálcio se necessário"]
      },
      Q3: { significado: "PTH ideal" },
      Q5: {
        significado: "PTH muito elevado - Hiperparatireoidismo ou deficiência de vitamina D",
        causas: ["Hiperparatireoidismo primário", "Deficiência de vitamina D severa", "Insuficiência renal"],
        orientacoes: ["Avaliar vitamina D", "Cálcio", "Função renal", "Considerar investigação cirúrgica"]
      }
    },
    correlacoes: ["calcioSerico", "vitaminaD", "fosforo", "creatinina"]
  }

};

export default LABORATORY_EXAMS_ADDITIONAL;
