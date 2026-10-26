/**
 * EXAMES LABORATORIAIS ESPECIALIZADOS - MEDICINA FUNCIONAL
 * Metais Pesados, Microbioma, Marcadores Tumorais, Cardíacos, Cerebrais, Intestinais
 * Parte 3/3 do sistema completo de exames (168 exames)
 */

export const LABORATORY_EXAMS_SPECIALIZED = {
  
  // ========================================================================
  // METAIS PESADOS - Painel Completo (12 exames)
  // ========================================================================

  chumboSanguineo: {
    nome: "Chumbo Sanguíneo",
    categoria: "Metais Pesados",
    unidade: "µg/dL",
    funcao: "Avaliação de exposição crônica a chumbo. Metais tóxico que prejudica sistema nervoso, hematopoiese e função renal.",
    referencia: { geral: { min: 0, max: 5 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 2, nivel: "Ideal", cor: "#4caf50" },
        Q2: { min: 2, max: 5, nivel: "Aceitável", cor: "#ffc107" },
        Q3: { min: 5, max: 10, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 10, max: 25, nivel: "Alto", cor: "#ff5722" },
        Q5: { min: 25, max: 999, nivel: "Toxicidade", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Sem exposição significativa a chumbo" },
      Q3: {
        significado: "Exposição elevada a chumbo - Requer investigação",
        causas: ["Água contaminada", "Tinta antiga", "Exposição ocupacional", "Solo contaminado"],
        sintomas: ["Fadiga", "Cefaleia", "Dor abdominal", "Déficit cognitivo", "Neuropatia"],
        orientacoes: ["DMSA quelação", "Vitamina C", "Zinco", "Cálcio", "Glutationa", "Evitar fonte"]
      },
      Q5: {
        significado: "Intoxicação por chumbo - URGENTE",
        urgente: true
      }
    },
    correlacoes: ["zinco", "ferro", "calcio", "hemoglobina"]
  },

  chumboUrinario: {
    nome: "Chumbo Urinário (24h)",
    categoria: "Metais Pesados",
    unidade: "µg/24h",
    funcao: "Excreção urinária de chumbo. Melhor marcador de carga corporal total após quelação.",
    referencia: { geral: { min: 0, max: 20 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 10, nivel: "Ideal", cor: "#4caf50" },
        Q2: { min: 10, max: 20, nivel: "Aceitável", cor: "#ffc107" },
        Q3: { min: 20, max: 50, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 50, max: 100, nivel: "Alto", cor: "#ff5722" },
        Q5: { min: 100, max: 9999, nivel: "Muito Alto", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Excreção normal de chumbo" },
      Q3: {
        significado: "Carga corporal elevada de chumbo",
        orientacoes: ["Protocolo de quelação", "DMSA/EDTA", "Glutationa IV", "NAC"]
      }
    },
    correlacoes: ["chumboSanguineo"]
  },

  mercurioSanguineo: {
    nome: "Mercúrio Sanguíneo",
    categoria: "Metais Pesados",
    unidade: "µg/L",
    funcao: "Avaliação de exposição recente a mercúrio inorgânico ou orgânico (metilmercúrio de peixes).",
    referencia: { geral: { min: 0, max: 10 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 5, nivel: "Ideal", cor: "#4caf50" },
        Q2: { min: 5, max: 10, nivel: "Aceitável", cor: "#ffc107" },
        Q3: { min: 10, max: 20, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 20, max: 50, nivel: "Alto", cor: "#ff5722" },
        Q5: { min: 50, max: 999, nivel: "Toxicidade", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Sem exposição significativa a mercúrio" },
      Q3: {
        significado: "Exposição elevada a mercúrio",
        causas: ["Peixes grandes (atum, cação)", "Amálgamas dentárias", "Vacinas com timerosal", "Cosméticos"],
        sintomas: ["Tremor", "Alterações cognitivas", "Neuropatia periférica", "Alterações renais"],
        orientacoes: ["Remover fonte", "Selênio 200mcg", "NAC", "Glutationa", "Vitamina C", "ALA"]
      },
      Q5: {
        significado: "Intoxicação por mercúrio - URGENTE",
        urgente: true
      }
    },
    correlacoes: ["selenio", "zinco", "glutationa"]
  },

  mercurioUrinario: {
    nome: "Mercúrio Urinário (24h)",
    categoria: "Metais Pesados",
    unidade: "µg/24h",
    funcao: "Excreção de mercúrio inorgânico. Melhor marcador de exposição crônica e carga corporal.",
    referencia: { geral: { min: 0, max: 20 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 10, nivel: "Ideal", cor: "#4caf50" },
        Q2: { min: 10, max: 20, nivel: "Aceitável", cor: "#ffc107" },
        Q3: { min: 20, max: 50, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 50, max: 100, nivel: "Alto", cor: "#ff5722" },
        Q5: { min: 100, max: 9999, nivel: "Muito Alto", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Excreção normal de mercúrio" },
      Q3: {
        significado: "Carga corporal elevada de mercúrio",
        orientacoes: ["DMPS quelação", "Selênio", "Glutationa IV", "Sauna infravermelho"]
      }
    },
    correlacoes: ["mercurioSanguineo", "selenio"]
  },

  cadmioSanguineo: {
    nome: "Cádmio Sanguíneo",
    categoria: "Metais Pesados",
    unidade: "µg/L",
    funcao: "Avaliação de exposição recente a cádmio. Metal tóxico que prejudica rins, ossos e pulmões.",
    referencia: { geral: { min: 0, max: 5 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 2, nivel: "Ideal", cor: "#4caf50" },
        Q2: { min: 2, max: 5, nivel: "Aceitável", cor: "#ffc107" },
        Q3: { min: 5, max: 10, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 10, max: 20, nivel: "Alto", cor: "#ff5722" },
        Q5: { min: 20, max: 999, nivel: "Toxicidade", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Sem exposição significativa a cádmio" },
      Q3: {
        significado: "Exposição elevada a cádmio",
        causas: ["Tabagismo (ativo ou passivo)", "Alimentos contaminados", "Exposição ocupacional"],
        sintomas: ["Osteoporose", "Lesão renal", "DPOC", "Hipertensão"],
        orientacoes: ["Parar tabagismo", "Zinco 30-50mg", "Vitamina C", "Selênio", "NAC"]
      },
      Q5: {
        significado: "Intoxicação por cádmio - Risco renal",
        urgente: true
      }
    },
    correlacoes: ["zinco", "calcio", "creatinina"]
  },

  cadmioUrinario: {
    nome: "Cádmio Urinário (24h)",
    categoria: "Metais Pesados",
    unidade: "µg/24h",
    funcao: "Excreção de cádmio. Marcador de exposição crônica e lesão renal tubular.",
    referencia: { geral: { min: 0, max: 2 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 1, nivel: "Ideal", cor: "#4caf50" },
        Q2: { min: 1, max: 2, nivel: "Aceitável", cor: "#ffc107" },
        Q3: { min: 2, max: 5, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 5, max: 10, nivel: "Alto", cor: "#ff5722" },
        Q5: { min: 10, max: 999, nivel: "Muito Alto", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Excreção normal de cádmio" },
      Q3: {
        significado: "Carga corporal elevada ou lesão renal",
        orientacoes: ["Avaliar função renal", "Zinco", "Antioxidantes"]
      }
    },
    correlacoes: ["cadmioSanguineo", "creatinina", "beta2microglobulina"]
  },

  aluminioSanguineo: {
    nome: "Alumínio Sanguíneo",
    categoria: "Metais Pesados",
    unidade: "µg/L",
    funcao: "Avaliação de exposição a alumínio. Neurotóxico associado a demência e doença óssea.",
    referencia: { geral: { min: 0, max: 10 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 5, nivel: "Ideal", cor: "#4caf50" },
        Q2: { min: 5, max: 10, nivel: "Aceitável", cor: "#ffc107" },
        Q3: { min: 10, max: 20, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 20, max: 50, nivel: "Alto", cor: "#ff5722" },
        Q5: { min: 50, max: 999, nivel: "Toxicidade", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Sem exposição significativa a alumínio" },
      Q3: {
        significado: "Exposição elevada a alumínio",
        causas: ["Antiácidos", "Desodorantes", "Panelas de alumínio", "Vacinas", "Água contaminada"],
        sintomas: ["Déficit cognitivo", "Demência", "Dor óssea", "Anemia microcítica"],
        orientacoes: ["Evitar fonte", "Silício orgânico", "Vitamina C", "Magnésio", "Curcumina"]
      },
      Q5: {
        significado: "Intoxicação por alumínio",
        urgente: true
      }
    },
    correlacoes: ["ferro", "calcio", "magnesio"]
  },

  aluminioUrinario: {
    nome: "Alumínio Urinário (24h)",
    categoria: "Metais Pesados",
    unidade: "µg/24h",
    funcao: "Excreção de alumínio. Marcador de carga corporal e exposição crônica.",
    referencia: { geral: { min: 0, max: 30 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 15, nivel: "Ideal", cor: "#4caf50" },
        Q2: { min: 15, max: 30, nivel: "Aceitável", cor: "#ffc107" },
        Q3: { min: 30, max: 60, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 60, max: 150, nivel: "Alto", cor: "#ff5722" },
        Q5: { min: 150, max: 9999, nivel: "Muito Alto", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Excreção normal de alumínio" },
      Q3: {
        significado: "Carga corporal elevada de alumínio",
        orientacoes: ["Silício orgânico", "Quelação com EDTA", "Antioxidantes"]
      }
    },
    correlacoes: ["aluminioSanguineo"]
  },

  ratioChumboCadmio: {
    nome: "Ratio Chumbo/Cádmio",
    categoria: "Metais Pesados",
    unidade: "ratio",
    funcao: "Relação entre chumbo e cádmio. Ratio >2 sugere exposição predominante a chumbo; <1 sugere exposição a cádmio.",
    referencia: { geral: { min: 0.5, max: 2.0 } },
    ideal: { geral: 1.0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.5, nivel: "Cádmio Predominante", cor: "#ff9800" },
        Q2: { min: 0.5, max: 1.0, nivel: "Cádmio Elevado", cor: "#ffc107" },
        Q3: { min: 1.0, max: 1.5, nivel: "Equilibrado", cor: "#4caf50" },
        Q4: { min: 1.5, max: 2.5, nivel: "Chumbo Elevado", cor: "#ffc107" },
        Q5: { min: 2.5, max: 999, nivel: "Chumbo Predominante", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Exposição predominante a cádmio",
        causas: ["Tabagismo", "Alimentos contaminados"],
        orientacoes: ["Protocolo anti-cádmio", "Zinco", "Vitamina C"]
      },
      Q3: { significado: "Equilíbrio normal de metais pesados" },
      Q5: {
        significado: "Exposição predominante a chumbo",
        causas: ["Água contaminada", "Tinta antiga", "Solo"],
        orientacoes: ["Protocolo anti-chumbo", "DMSA", "Cálcio", "Zinco"]
      }
    },
    correlacoes: ["chumboSanguineo", "cadmioSanguineo"]
  },

  ratioMercurioSelenio: {
    nome: "Ratio Mercúrio/Selênio",
    categoria: "Metais Pesados",
    unidade: "ratio",
    funcao: "Relação entre mercúrio e selênio. Selênio protege contra toxicidade do mercúrio. Ratio >1 indica deficiência relativa de selênio.",
    referencia: { geral: { min: 0, max: 0.5 } },
    ideal: { geral: 0.2 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.3, nivel: "Ideal", cor: "#4caf50" },
        Q2: { min: 0.3, max: 0.5, nivel: "Aceitável", cor: "#ffc107" },
        Q3: { min: 0.5, max: 1.0, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 1.0, max: 2.0, nivel: "Alto", cor: "#ff5722" },
        Q5: { min: 2.0, max: 999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Proteção adequada de selênio contra mercúrio" },
      Q3: {
        significado: "Deficiência relativa de selênio",
        orientacoes: ["Selênio 200-400mcg/dia", "Castanha-do-pará", "Reduzir peixes grandes"]
      },
      Q5: {
        significado: "Deficiência crítica de selênio com mercúrio elevado",
        urgente: true,
        orientacoes: ["Selênio IV", "Glutationa", "Quelação de mercúrio"]
      }
    },
    correlacoes: ["mercurioSanguineo", "selenio"]
  },

  arsenioUrinario: {
    nome: "Arsênio Urinário (24h)",
    categoria: "Metais Pesados",
    unidade: "µg/24h",
    funcao: "Excreção de arsênio. Metalóide tóxico presente em água, solo e alimentos. Carcinogênico.",
    referencia: { geral: { min: 0, max: 50 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 25, nivel: "Ideal", cor: "#4caf50" },
        Q2: { min: 25, max: 50, nivel: "Aceitável", cor: "#ffc107" },
        Q3: { min: 50, max: 100, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 100, max: 200, nivel: "Alto", cor: "#ff5722" },
        Q5: { min: 200, max: 9999, nivel: "Toxicidade", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Sem exposição significativa a arsênio" },
      Q3: {
        significado: "Exposição elevada a arsênio",
        causas: ["Água contaminada", "Arroz", "Frutos do mar", "Pesticidas"],
        sintomas: ["Lesões de pele", "Neuropatia", "Risco de câncer", "Diabetes"],
        orientacoes: ["Filtrar água", "Limitar arroz", "Vitamina C", "Selênio", "ALA", "NAC"]
      },
      Q5: {
        significado: "Intoxicação por arsênio - URGENTE",
        urgente: true
      }
    },
    correlacoes: ["selenio", "zinco"]
  },

  niquel: {
    nome: "Níquel Sérico",
    categoria: "Metais Pesados",
    unidade: "µg/L",
    funcao: "Avaliação de exposição a níquel. Pode causar alergias, dermatite e toxicidade em exposição crônica.",
    referencia: { geral: { min: 0, max: 5 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 2, nivel: "Ideal", cor: "#4caf50" },
        Q2: { min: 2, max: 5, nivel: "Aceitável", cor: "#ffc107" },
        Q3: { min: 5, max: 10, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 10, max: 20, nivel: "Alto", cor: "#ff5722" },
        Q5: { min: 20, max: 999, nivel: "Toxicidade", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Sem exposição significativa a níquel" },
      Q3: {
        significado: "Exposição elevada a níquel",
        causas: ["Bijuterias", "Utensílios de cozinha", "Implantes metálicos", "Fumo"],
        sintomas: ["Dermatite de contato", "Asma ocupacional", "Fibrose pulmonar"],
        orientacoes: ["Evitar fonte", "Vitamina C", "Glutationa", "Zinco"]
      }
    },
    correlacoes: ["zinco", "ferro"]
  },

  // ========================================================================
  // MICROBIOMA INTESTINAL - Marcadores Avançados (9 exames)
  // ========================================================================

  indiceSimpson: {
    nome: "Índice de Simpson (Diversidade Microbiana)",
    categoria: "Microbioma",
    unidade: "score",
    funcao: "Medida de diversidade alfa do microbioma. Valores mais altos indicam maior diversidade e saúde intestinal.",
    referencia: { geral: { min: 0, max: 1.0 } },
    ideal: { geral: 0.85 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.50, nivel: "Muito Baixa Diversidade", cor: "#ff5722" },
        Q2: { min: 0.50, max: 0.70, nivel: "Baixa Diversidade", cor: "#ff9800" },
        Q3: { min: 0.70, max: 0.90, nivel: "Boa Diversidade", cor: "#4caf50" },
        Q4: { min: 0.90, max: 0.95, nivel: "Excelente Diversidade", cor: "#4caf50" },
        Q5: { min: 0.95, max: 1.0, nivel: "Diversidade Excepcional", cor: "#4caf50" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Disbiose severa - Diversidade microbiana muito baixa",
        causas: ["Uso recente de antibióticos", "Dieta pobre em fibras", "Doença inflamatória intestinal", "Estresse crônico"],
        sintomas: ["Constipação ou diarreia", "Fadiga", "Ganho de peso", "Inflamação sistêmica"],
        orientacoes: ["Prebióticos (inulina, FOS)", "Probióticos multi-cepas", "Fibras 30-40g/dia", "Alimentos fermentados"]
      },
      Q3: { significado: "Diversidade microbiana saudável" }
    },
    correlacoes: ["riquezaMicrobiana", "ratioFirmicutesBacteroidetes"]
  },

  riquezaMicrobiana: {
    nome: "Riqueza Microbiana (Número de Espécies)",
    categoria: "Microbioma",
    unidade: "espécies",
    funcao: "Quantidade de espécies bacterianas diferentes presentes no intestino. Maior riqueza = melhor saúde metabólica.",
    referencia: { geral: { min: 0, max: 1000 } },
    ideal: { geral: 500 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 200, nivel: "Riqueza Muito Baixa", cor: "#ff5722" },
        Q2: { min: 200, max: 350, nivel: "Riqueza Baixa", cor: "#ff9800" },
        Q3: { min: 350, max: 600, nivel: "Riqueza Boa", cor: "#4caf50" },
        Q4: { min: 600, max: 800, nivel: "Riqueza Excelente", cor: "#4caf50" },
        Q5: { min: 800, max: 9999, nivel: "Riqueza Excepcional", cor: "#4caf50" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Microbioma empobrecido - Pouquíssimas espécies",
        causas: ["Antibióticos de amplo espectro", "Dieta ocidental processada", "Falta de fibras"],
        orientacoes: ["Probióticos de amplo espectro", "30+ vegetais diferentes/semana", "Amido resistente"]
      },
      Q3: { significado: "Riqueza microbiana adequada" }
    },
    correlacoes: ["indiceSimpson"]
  },

  ratioFirmicutesBacteroidetes: {
    nome: "Ratio Firmicutes/Bacteroidetes (F/B)",
    categoria: "Microbioma",
    unidade: "ratio",
    funcao: "Proporção entre dois filos bacterianos dominantes. Ratio elevado está associado a obesidade, resistência insulina e inflamação.",
    referencia: { geral: { min: 0.1, max: 10 } },
    ideal: { geral: 1.5 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.5, nivel: "F/B Muito Baixo", cor: "#ff9800" },
        Q2: { min: 0.5, max: 1.0, nivel: "F/B Baixo", cor: "#ffc107" },
        Q3: { min: 1.0, max: 2.5, nivel: "F/B Ideal", cor: "#4caf50" },
        Q4: { min: 2.5, max: 5.0, nivel: "F/B Elevado", cor: "#ff9800" },
        Q5: { min: 5.0, max: 999, nivel: "F/B Muito Alto", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Firmicutes muito baixos - Pode indicar malabsorção",
        orientacoes: ["Prebióticos específicos", "Lactobacilos", "Bifidobactérias"]
      },
      Q3: { significado: "Proporção F/B equilibrada" },
      Q5: {
        significado: "Firmicutes muito altos - Disbiose obesogênica",
        causas: ["Dieta hipercalórica", "Excesso de gordura saturada", "Sedentarismo"],
        sintomas: ["Obesidade", "Resistência à insulina", "Inflamação crônica"],
        orientacoes: ["Dieta hipocalórica", "Fibras solúveis", "Polifenóis", "Akkermansia suplemento"]
      }
    },
    correlacoes: ["homa-ir", "pcr-us", "triglicerideos"]
  },

  indiceProteobacteria: {
    nome: "Índice de Proteobacteria",
    categoria: "Microbioma",
    unidade: "%",
    funcao: "Proporção de proteobactérias (inclui patobiontes). Elevação >10% indica disbiose e inflamação intestinal.",
    referencia: { geral: { min: 0, max: 10 } },
    ideal: { geral: 3 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 2, nivel: "Muito Baixo", cor: "#4caf50" },
        Q2: { min: 2, max: 5, nivel: "Baixo (Ideal)", cor: "#4caf50" },
        Q3: { min: 5, max: 10, nivel: "Moderado", cor: "#ffc107" },
        Q4: { min: 10, max: 20, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 20, max: 100, nivel: "Muito Alto", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q2: { significado: "Proteobactérias em níveis ideais" },
      Q4: {
        significado: "Proteobactérias elevadas - Disbiose inflamatória",
        causas: ["Dieta rica em gordura", "Estresse", "Infecção prévia", "Uso de IBP"],
        sintomas: ["Diarreia", "Dor abdominal", "Inflamação intestinal", "SIBO"],
        orientacoes: ["Probióticos específicos", "Berberina", "Óleo de orégano", "L-glutamina"]
      }
    },
    correlacoes: ["calprotectin", "lactoferrina"]
  },

  acgsCadeiaCurta: {
    nome: "Ácidos Graxos de Cadeia Curta (SCFA) Total",
    categoria: "Microbioma",
    unidade: "mmol/kg",
    funcao: "Butirato + Acetato + Propionato. Produtos da fermentação de fibras. Essenciais para saúde intestinal e metabólica.",
    referencia: { geral: { min: 50, max: 150 } },
    ideal: { geral: 100 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 40, nivel: "Muito Baixo", cor: "#ff5722" },
        Q2: { min: 40, max: 70, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 70, max: 130, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 130, max: 170, nivel: "Alto", cor: "#4caf50" },
        Q5: { min: 170, max: 999, nivel: "Muito Alto", cor: "#4caf50" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "SCFA muito baixos - Deficiência severa",
        causas: ["Dieta pobre em fibras", "Disbiose", "Antibioticoterapia recente"],
        sintomas: ["Constipação", "Inflamação intestinal", "Permeabilidade aumentada", "Resistência à insulina"],
        orientacoes: ["Fibras solúveis 25-35g/dia", "Amido resistente", "Inulina", "Pectina", "Butirato sódico"]
      },
      Q3: { significado: "Produção adequada de SCFA" }
    },
    correlacoes: ["butirato", "indiceSimpson"]
  },

  butirato: {
    nome: "Butirato",
    categoria: "Microbioma",
    unidade: "mmol/kg",
    funcao: "Principal combustível dos colonócitos. Anti-inflamatório, fortalece barreira intestinal, previne câncer colorretal.",
    referencia: { geral: { min: 10, max: 40 } },
    ideal: { geral: 25 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 8, nivel: "Muito Baixo", cor: "#ff5722" },
        Q2: { min: 8, max: 15, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 15, max: 35, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 35, max: 50, nivel: "Alto", cor: "#4caf50" },
        Q5: { min: 50, max: 999, nivel: "Muito Alto", cor: "#4caf50" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Butirato muito baixo - Risco para intestino",
        sintomas: ["Colite", "Permeabilidade intestinal", "Inflamação crônica"],
        orientacoes: ["Amido resistente 15-20g/dia", "Inulina", "Pectina", "Farinella butirogênicas", "Butirato sódico 300mg"]
      },
      Q3: { significado: "Produção ideal de butirato" }
    },
    correlacoes: ["acgsCadeiaCurta", "calprotectina"]
  },

  metabolomicaMicrobiana: {
    nome: "Perfil Metabolômico Microbiano",
    categoria: "Microbioma",
    unidade: "score",
    funcao: "Análise integrada de metabólitos microbianos (TMAO, indol, p-cresol, fenol). Score >70 = metabolismo saudável.",
    referencia: { geral: { min: 0, max: 100 } },
    ideal: { geral: 80 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 40, nivel: "Metabolismo Ruim", cor: "#ff5722" },
        Q2: { min: 40, max: 60, nivel: "Metabolismo Subótimo", cor: "#ff9800" },
        Q3: { min: 60, max: 85, nivel: "Metabolismo Bom", cor: "#4caf50" },
        Q4: { min: 85, max: 95, nivel: "Metabolismo Excelente", cor: "#4caf50" },
        Q5: { min: 95, max: 100, nivel: "Metabolismo Ideal", cor: "#4caf50" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Disbiose metabólica severa",
        orientacoes: ["Prebióticos", "Probióticos multi-cepas", "Dieta low-FODMAP temporária", "Glutamina"]
      },
      Q3: { significado: "Metabolismo microbiano saudável" }
    },
    correlacoes: ["indoleEskatole", "acgsCadeiaCurta"]
  },

  sequenciamento16S: {
    nome: "Sequenciamento 16S rRNA",
    categoria: "Microbioma",
    unidade: "% abundância",
    funcao: "Identificação e quantificação de todas as espécies bacterianas presentes no microbioma intestinal.",
    referencia: { geral: { min: 0, max: 100 } },
    ideal: { geral: 100 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 70, nivel: "Cobertura Incompleta", cor: "#ff9800" },
        Q2: { min: 70, max: 85, nivel: "Cobertura Adequada", cor: "#ffc107" },
        Q3: { min: 85, max: 95, nivel: "Cobertura Boa", cor: "#4caf50" },
        Q4: { min: 95, max: 99, nivel: "Cobertura Excelente", cor: "#4caf50" },
        Q5: { min: 99, max: 100, nivel: "Cobertura Completa", cor: "#4caf50" }
      }
    },
    interpretacao: {
      Q3: { significado: "Sequenciamento completo do microbioma realizado" }
    },
    correlacoes: ["indiceSimpson", "riquezaMicrobiana"]
  },

  indoleEskatole: {
    nome: "Indol e Skatole (Marcadores de Putrefação)",
    categoria: "Microbioma",
    unidade: "mg/L",
    funcao: "Produtos de degradação proteica por bactérias patogênicas. Elevação indica putrefação intestinal e disbiose.",
    referencia: { geral: { min: 0, max: 5 } },
    ideal: { geral: 1 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 2, nivel: "Ideal", cor: "#4caf50" },
        Q2: { min: 2, max: 5, nivel: "Aceitável", cor: "#ffc107" },
        Q3: { min: 5, max: 10, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 10, max: 20, nivel: "Alto", cor: "#ff5722" },
        Q5: { min: 20, max: 999, nivel: "Muito Alto", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Baixa putrefação intestinal" },
      Q3: {
        significado: "Putrefação intestinal elevada",
        causas: ["Excesso de proteína animal", "Baixa fibra", "SIBO", "Constipação"],
        sintomas: ["Flatulência com odor forte", "Constipação", "Halitose", "Toxicidade sistêmica"],
        orientacoes: ["Reduzir carne vermelha", "Aumentar fibras", "Probióticos", "Enzimas digestivas", "Clorofila"]
      }
    },
    correlacoes: ["calprotectina", "butirato"]
  },

  // ========================================================================
  // MARCADORES TUMORAIS - Painel Completo (19 exames)
  // ========================================================================

  afp: {
    nome: "AFP - Alfa-fetoproteína",
    categoria: "Marcadores Tumorais",
    unidade: "ng/mL",
    funcao: "Marcador de carcinoma hepatocelular e tumores de células germinativas. Também elevado em gravidez e hepatopatias.",
    referencia: { geral: { min: 0, max: 10 } },
    ideal: { geral: 2 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 5, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 5, max: 10, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 10, max: 20, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 20, max: 100, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 100, max: 9999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "AFP normal" },
      Q3: {
        significado: "AFP elevada - Investigação necessária",
        causas: ["Hepatite crônica", "Cirrose", "Gravidez", "Regeneração hepática"],
        investigar: ["Ultrassom hepático", "TC abdome", "Ressonância"]
      },
      Q5: {
        significado: "AFP muito elevada - SUSPEITA DE CÂNCER",
        urgente: true,
        investigar: ["Oncologista URGENTE", "TC/RNM", "Biópsia hepática"]
      }
    },
    correlacoes: ["tgo", "tgp", "ggt"]
  },

  psaTotal: {
    nome: "PSA Total",
    categoria: "Marcadores Tumorais",
    unidade: "ng/mL",
    funcao: "Antígeno prostático específico total (livre + complexado). Marcador de câncer de próstata, hiperplasia prostática benigna (HPB) e prostatite. Triagem essencial em homens >50 anos.",
    referencia: { 
      homem: { min: 0, max: 4.0 }
    },
    ideal: { homem: 1.0 },
    quintis: {
      homem: {
        Q1: { min: 0, max: 1.5, nivel: "Normal - Baixo Risco", cor: "#4caf50" },
        Q2: { min: 1.5, max: 4.0, nivel: "Normal - Zona Cinza", cor: "#ffc107" },
        Q3: { min: 4.0, max: 10, nivel: "Elevado - Investigar", cor: "#ff9800" },
        Q4: { min: 10, max: 20, nivel: "Muito Elevado - Alta Suspeita", cor: "#ff5722" },
        Q5: { min: 20, max: 999, nivel: "Crítico - Câncer Provável", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { 
        significado: "PSA Total normal - Baixo risco de câncer de próstata",
        orientacoes: [
          "Manter acompanhamento anual após 50 anos",
          "Licopeno (tomate, melancia) - efeito protetor prostático",
          "Saw Palmetto (Serenoa repens) 320mg/dia - saúde prostática",
          "Zinco 15-30mg/dia",
          "Vitamina D otimizada",
          "Exercícios regulares"
        ]
      },
      Q2: {
        significado: "PSA Total na zona cinza (2-4 ng/mL) - Monitoramento necessário",
        causas: ["Hiperplasia prostática benigna (HPB) inicial", "Prostatite subclínica", "Envelhecimento normal"],
        orientacoes: [
          "Solicitar PSA Livre para calcular ratio PSA Livre/Total",
          "Ratio <15% = maior suspeita de câncer",
          "Ratio >25% = mais provável HPB",
          "Saw Palmetto 320mg/dia",
          "Pygeum africanum 100mg/dia",
          "Urtica dioica (urtiga) 300mg 2x/dia",
          "Licopeno 15-30mg/dia",
          "Beta-sitosterol 60-130mg/dia",
          "Reduzir álcool e cafeína",
          "Reavaliar PSA em 6 meses"
        ],
        investigar: ["PSA Livre", "Toque retal", "Ultrassom transretal"]
      },
      Q3: {
        significado: "PSA Total elevado (4-10 ng/mL) - Investigação prostática obrigatória",
        causas: [
          "Hiperplasia prostática benigna (HPB)",
          "Prostatite aguda ou crônica",
          "Câncer de próstata (30% probabilidade)",
          "Trauma prostático/ejaculação recente",
          "Cateterismo urinário"
        ],
        sintomas: ["Jato urinário fraco", "Noctúria (acordar para urinar)", "Hesitação urinária", "Gotejamento terminal"],
        riscos: ["Câncer de próstata (necessário biópsia se ratio PSA <15%)"],
        orientacoes: [
          "ESSENCIAL: Solicitar PSA Livre imediatamente",
          "Calcular ratio PSA Livre/PSA Total",
          "Se ratio <15% = encaminhar para biópsia",
          "Protocolo fitoterápico intensivo:",
          "  • Saw Palmetto 320mg 2x/dia",
          "  • Pygeum africanum 100-200mg/dia",
          "  • Urtica dioica 600mg/dia",
          "  • Licopeno 30-60mg/dia",
          "  • Beta-sitosterol 130mg 2x/dia",
          "  • Curcumina 1000mg 2x/dia (anti-inflamatório)",
          "  • Cúrcuma + Boswellia (Maria Rocha) - inflamação prostática",
          "Suplementação:",
          "  • Zinco quelado 30-50mg/dia",
          "  • Vitamina D3 5000-10000 UI/dia (ajustar conforme dosagem)",
          "  • Ômega-3 (EPA/DHA) 2-3g/dia",
          "  • Selênio 200mcg/dia",
          "Mudanças de estilo:",
          "  • Evitar álcool completamente",
          "  • Reduzir laticínios e gorduras saturadas",
          "  • Aumentar tomate cozido (licopeno biodisponível)",
          "  • Chá verde 3-5 xícaras/dia (EGCG)",
          "  • Crucíferas (brócolis, couve-flor) - DIM",
          "  • Exercícios 150min/semana"
        ],
        investigar: ["PSA Livre (URGENTE)", "Toque retal", "Ultrassom transretal", "Ressonância multiparamétrica de próstata", "Biópsia se ratio <15%"]
      },
      Q4: {
        significado: "PSA Total muito elevado (10-20 ng/mL) - ALTA SUSPEITA DE CÂNCER",
        causas: ["Câncer de próstata (>50% probabilidade)", "HPB avançada", "Prostatite severa"],
        riscos: ["Câncer de próstata localmente avançado", "Metástases ósseas possíveis"],
        orientacoes: [
          "URGENTE: Encaminhar ao urologista imediatamente",
          "Biópsia prostática provável",
          "Ressonância multiparamétrica antes da biópsia",
          "Enquanto aguarda biópsia:",
          "  • Saw Palmetto 320mg 3x/dia",
          "  • Curcumina 1000-1500mg 3x/dia",
          "  • Licopeno 60mg/dia",
          "  • Boswellia serrata 400mg 3x/dia",
          "  • Chá verde EGCG 500mg 2x/dia",
          "  • Vitamina D3 10000 UI/dia",
          "  • Zinco 50mg/dia",
          "  • DIM (diindolilmetano) 200mg 2x/dia",
          "  • Resveratrol 500mg/dia",
          "Terapia Fisioquântica:",
          "  • Frequências para próstata",
          "  • Biomodulação celular",
          "  • Apoio ao sistema imune"
        ],
        investigar: ["Urologista URGENTE", "PSA Livre", "Ressonância multiparamétrica", "Biópsia guiada", "Cintilografia óssea se PSA >20"],
        urgente: true
      },
      Q5: {
        significado: "PSA Total crítico (>20 ng/mL) - CÂNCER DE PRÓSTATA PROVÁVEL",
        causas: ["Câncer de próstata (>80% probabilidade)", "Câncer metastático possível"],
        riscos: [
          "Câncer de próstata avançado",
          "Metástases ósseas",
          "Metástases linfonodais",
          "Obstrução urinária"
        ],
        sintomas: ["Hematúria", "Dor óssea", "Perda de peso", "Anemia", "Obstrução urinária"],
        orientacoes: [
          "EMERGÊNCIA UROLÓGICA - Encaminhar HOJE",
          "Estadiamento oncológico completo necessário",
          "Suporte complementar intensivo:",
          "  • Curcumina IV ou lipossomal 2000mg 3x/dia",
          "  • Artemísia (Artemisia annua) 500mg 3x/dia",
          "  • Graviola (Annona muricata) 1000mg 3x/dia",
          "  • IP-6 (Inositol hexafosfato) 3-6g/dia",
          "  • Cogumelos medicinais (Agaricus, Reishi, Maitake) 3g/dia",
          "  • PSK (polissacarídeo-K) 3g/dia",
          "  • Vitamina D3 20000 UI/dia (sob supervisão)",
          "  • Selênio 400mcg/dia",
          "  • Licopeno 120mg/dia",
          "  • Quercetina 1000mg 3x/dia",
          "Protocolo Maria Rocha - Câncer:",
          "  • Fitoterapia antitumoral",
          "  • Modulação imunológica",
          "  • Detoxificação hepática",
          "Fisioquântica:",
          "  • Biofrequências antitumorais",
          "  • Harmonização energética",
          "  • Apoio ao tratamento convencional",
          "Dieta anticâncer estrita:",
          "  • Cetogênica ou jejum intermitente",
          "  • Eliminar açúcar e carboidratos refinados",
          "  • Abundância de crucíferas",
          "  • Chá verde 6-8 xícaras/dia",
          "  • Cúrcuma com pimenta preta nas refeições"
        ],
        investigar: [
          "UROLOGISTA ONCOLOGISTA URGENTE",
          "PET-CT PSMA (mais sensível que PET-FDG)",
          "Cintilografia óssea",
          "Ressonância multiparamétrica",
          "Biópsia prostática",
          "TC abdome/pelve",
          "Fosfatase alcalina (metástases ósseas)",
          "Testosterona total"
        ],
        urgente: true
      }
    },
    correlacoes: ["psaLivre", "testosteronaTotal", "fosfataseAlcalina"]
  },

  psaLivre: {
    nome: "PSA Livre",
    categoria: "Marcadores Tumorais",
    unidade: "ng/mL",
    funcao: "Fração não-complexada do PSA. Ratio PSA Livre/PSA Total diferencia câncer (ratio baixo <15%) de HPB (ratio alto >25%). Fundamental quando PSA Total está entre 4-10 ng/mL.",
    referencia: { 
      homem: { min: 0, max: 1.0 }
    },
    ideal: { homem: 0.8 },
    quintis: {
      homem: {
        Q1: { min: 0, max: 0.4, nivel: "Baixo - Suspeita Câncer", cor: "#ff5722" },
        Q2: { min: 0.4, max: 0.7, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 0.7, max: 1.0, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 1.0, max: 1.5, nivel: "Adequado", cor: "#4caf50" },
        Q5: { min: 1.5, max: 999, nivel: "Alto - HPB Provável", cor: "#2196f3" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "PSA Livre muito baixo - CALCULAR RATIO PSA Livre/Total",
        causas: ["Ratio PSA Livre/Total <10% = câncer de próstata provável", "Câncer complexa maior parte do PSA"],
        riscos: ["Ratio <10% tem 56% de chance de câncer", "Ratio 10-15% tem 28% de chance de câncer"],
        orientacoes: [
          "CALCULAR: (PSA Livre / PSA Total) x 100 = Ratio %",
          "Se ratio <15% = Biópsia prostática indicada",
          "Se ratio 15-25% = Monitoramento rigoroso + ressonância",
          "Se ratio >25% = Mais provável HPB",
          "Protocolo pré-biópsia:",
          "  • Curcumina 1500mg 3x/dia",
          "  • Saw Palmetto 320mg 3x/dia",
          "  • Licopeno 60mg/dia",
          "  • Sulforafano (brócolis) 400mcg/dia",
          "  • Quercetina 1000mg 2x/dia",
          "  • Resveratrol 500mg/dia",
          "  • Chá verde concentrado 500mg 3x/dia"
        ],
        investigar: ["Biópsia prostática se ratio <15%", "Ressonância multiparamétrica", "PSA Total", "Velocidade de PSA (variação anual)"],
        urgente: true
      },
      Q2: {
        significado: "PSA Livre limítrofe - Zona cinza diagnóstica",
        orientacoes: [
          "Calcular ratio PSA Livre/Total",
          "Monitoramento trimestral",
          "Ressonância multiparamétrica recomendada",
          "Protocolo fitoterápico preventivo:",
          "  • Saw Palmetto 320mg 2x/dia",
          "  • Pygeum 100mg/dia",
          "  • Licopeno 30mg/dia",
          "  • Zinco 30mg/dia",
          "  • Vitamina D3 5000 UI/dia"
        ]
      },
      Q3: {
        significado: "PSA Livre normal - Ratio provavelmente favorável",
        orientacoes: ["Calcular ratio", "Se ratio >25% = HPB mais provável que câncer"]
      },
      Q5: {
        significado: "PSA Livre alto - Ratio elevado sugere HPB",
        causas: ["Hiperplasia prostática benigna (HPB)", "Prostatite", "Baixo risco de câncer se ratio >25%"],
        orientacoes: [
          "Protocolo para HPB:",
          "  • Saw Palmetto 320mg 2x/dia",
          "  • Pygeum africanum 100-200mg/dia",
          "  • Urtica dioica (urtiga) 300mg 2x/dia",
          "  • Beta-sitosterol 60-130mg/dia",
          "  • Licopeno 15mg/dia",
          "  • Zinco 30mg/dia (reduz conversão T → DHT)",
          "Mudanças:",
          "  • Reduzir café, álcool, pimentas",
          "  • Evitar segurar urina por muito tempo",
          "  • Urinar sentado (esvazia melhor)",
          "  • Kegel exercises (fortalecer assoalho pélvico)"
        ]
      }
    },
    correlacoes: ["psaTotal", "testosteronaTotal"]
  },



  ca125: {
    nome: "CA 125",
    categoria: "Marcadores Tumorais",
    unidade: "U/mL",
    funcao: "Marcador de câncer de ovário, endometriose e doenças peritoneais.",
    referencia: { 
      mulher: { min: 0, max: 35 }
    },
    ideal: { mulher: 10 },
    quintis: {
      mulher: {
        Q1: { min: 0, max: 20, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 20, max: 35, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 35, max: 70, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 70, max: 200, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 200, max: 9999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "CA 125 normal" },
      Q3: {
        significado: "CA 125 elevado",
        causas: ["Endometriose", "Mioma uterino", "Gravidez", "Menstruação", "Infecção pélvica"],
        investigar: ["Ultrassom transvaginal", "TC/RNM pelve"]
      },
      Q5: {
        significado: "CA 125 muito elevado - SUSPEITA DE CÂNCER OVARIANO",
        urgente: true,
        investigar: ["Ginecologista oncologista URGENTE", "TC/PET-CT"]
      }
    },
    correlacoes: ["ca199", "estradiol"]
  },

  ca199: {
    nome: "CA 19-9",
    categoria: "Marcadores Tumorais",
    unidade: "U/mL",
    funcao: "Marcador de câncer pancreático, biliar, gástrico e colorretal.",
    referencia: { geral: { min: 0, max: 37 } },
    ideal: { geral: 15 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 25, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 25, max: 37, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 37, max: 100, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 100, max: 500, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 500, max: 99999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "CA 19-9 normal" },
      Q3: {
        significado: "CA 19-9 elevado",
        causas: ["Pancreatite", "Colecistite", "Cirrose", "Obstrução biliar benigna"],
        investigar: ["TC abdome", "RNM pancreática", "Amilase/Lipase"]
      },
      Q5: {
        significado: "CA 19-9 muito elevado - SUSPEITA DE CÂNCER PANCREÁTICO",
        urgente: true,
        investigar: ["Oncologista URGENTE", "PET-CT", "Ecoendoscopia"]
      }
    },
    correlacoes: ["amilase", "lipase", "ca125"]
  },

  cea: {
    nome: "CEA - Antígeno Carcinoembrionário",
    categoria: "Marcadores Tumorais",
    unidade: "ng/mL",
    funcao: "Marcador de câncer colorretal, pulmonar, mamário e pancreático. Também elevado em tabagismo.",
    referencia: { geral: { min: 0, max: 5 } },
    ideal: { geral: 2 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 3, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 3, max: 5, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 5, max: 10, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 10, max: 20, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 20, max: 9999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "CEA normal" },
      Q3: {
        significado: "CEA elevado",
        causas: ["Tabagismo", "Doença hepática", "Doença inflamatória intestinal", "Pancreatite"],
        investigar: ["Colonoscopia", "TC tórax/abdome"]
      },
      Q5: {
        significado: "CEA muito elevado - SUSPEITA DE CÂNCER",
        urgente: true,
        investigar: ["Oncologista URGENTE", "Colonoscopia", "PET-CT"]
      }
    },
    correlacoes: ["ca199", "afp"]
  },

  ca153: {
    nome: "CA 15-3",
    categoria: "Marcadores Tumorais",
    unidade: "U/mL",
    funcao: "Marcador de câncer de mama. Usado principalmente para monitoramento de recidiva.",
    referencia: { 
      mulher: { min: 0, max: 31 }
    },
    ideal: { mulher: 15 },
    quintis: {
      mulher: {
        Q1: { min: 0, max: 20, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 20, max: 31, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 31, max: 50, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 50, max: 100, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 100, max: 9999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "CA 15-3 normal" },
      Q3: {
        significado: "CA 15-3 elevado",
        causas: ["Doenças benignas da mama", "Doença hepática", "Cirrose"],
        investigar: ["Mamografia", "Ultrassom mamário", "Ressonância mamária"]
      },
      Q5: {
        significado: "CA 15-3 muito elevado - SUSPEITA DE CÂNCER MAMÁRIO",
        urgente: true,
        investigar: ["Mastologista URGENTE", "Biópsia mamária", "PET-CT"]
      }
    },
    correlacoes: ["estradiol", "progesterona"]
  },

  betaHcg: {
    nome: "Beta-HCG",
    categoria: "Marcadores Tumorais",
    unidade: "mUI/mL",
    funcao: "Marcador de gravidez e tumores trofoblásticos. Também elevado em tumores de células germinativas.",
    referencia: { 
      mulher: { min: 0, max: 5 },
      homem: { min: 0, max: 2 }
    },
    ideal: { 
      mulher: 0,
      homem: 0
    },
    quintis: {
      mulher: {
        Q1: { min: 0, max: 5, nivel: "Normal (não grávida)", cor: "#4caf50" },
        Q2: { min: 5, max: 25, nivel: "Gravidez Inicial", cor: "#ffc107" },
        Q3: { min: 25, max: 100, nivel: "Gravidez", cor: "#4caf50" },
        Q4: { min: 100, max: 10000, nivel: "Gravidez Avançada", cor: "#4caf50" },
        Q5: { min: 10000, max: 999999, nivel: "Gravidez Molar?", cor: "#ff9800" }
      },
      homem: {
        Q1: { min: 0, max: 2, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 2, max: 5, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 5, max: 20, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 20, max: 100, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 100, max: 99999, nivel: "Tumor?", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Beta-HCG normal" },
      Q5: {
        significado: "Beta-HCG muito elevado - Tumor trofoblástico ou células germinativas",
        urgente: true,
        investigar: ["Oncologista URGENTE", "Ultrassom", "TC/RNM"]
      }
    },
    correlacoes: ["afp", "estradiol"]
  },

  ldh: {
    nome: "LDH - Lactato Desidrogenase",
    categoria: "Marcadores Tumorais",
    unidade: "U/L",
    funcao: "Marcador inespecífico de lise celular. Elevado em linfomas, leucemias, anemia hemolítica e infarto.",
    referencia: { geral: { min: 100, max: 240 } },
    ideal: { geral: 180 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 150, nivel: "Baixo", cor: "#4caf50" },
        Q2: { min: 150, max: 240, nivel: "Normal", cor: "#4caf50" },
        Q3: { min: 240, max: 400, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 400, max: 800, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 800, max: 9999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q2: { significado: "LDH normal" },
      Q3: {
        significado: "LDH elevada",
        causas: ["Anemia hemolítica", "Infarto miocárdio", "Hepatopatia", "Exercício intenso"],
        investigar: ["Hemograma", "Troponina", "Enzimas hepáticas"]
      },
      Q5: {
        significado: "LDH muito elevada - Suspeita de linfoma/leucemia",
        urgente: true,
        investigar: ["Hematologista URGENTE", "Hemograma completo", "TC"]
      }
    },
    correlacoes: ["hemacias", "tgo", "troponina"]
  },

  tireoglobulina: {
    nome: "Tireoglobulina",
    categoria: "Marcadores Tumorais",
    unidade: "ng/mL",
    funcao: "Marcador de recidiva de câncer de tireoide após tireoidectomia. Não deve ser detectável após cirurgia total.",
    referencia: { geral: { min: 0, max: 55 } },
    ideal: { geral: 20 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 1, nivel: "Indetectável (pós-cirurgia)", cor: "#4caf50" },
        Q2: { min: 1, max: 20, nivel: "Baixo", cor: "#4caf50" },
        Q3: { min: 20, max: 55, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 55, max: 100, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 100, max: 9999, nivel: "Muito Elevado", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q3: { significado: "Tireoglobulina normal em pessoa com tireoide" },
      Q5: {
        significado: "Tireoglobulina muito elevada - Recidiva de câncer de tireoide",
        urgente: true,
        investigar: ["Endocrinologista URGENTE", "Cintilografia", "PET-CT"]
      }
    },
    correlacoes: ["tsh", "antiTPO", "calcitonina"]
  },

  her2: {
    nome: "HER2 (ERBB2)",
    categoria: "Marcadores Tumorais",
    unidade: "score",
    funcao: "Marcador prognóstico e preditivo de câncer de mama. Score 3+ indica superexpressão e candidato a terapia-alvo.",
    referencia: { geral: { min: 0, max: 3 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0, nivel: "Negativo (0)", cor: "#4caf50" },
        Q2: { min: 1, max: 1, nivel: "Negativo (1+)", cor: "#4caf50" },
        Q3: { min: 2, max: 2, nivel: "Equívoco (2+)", cor: "#ffc107" },
        Q4: { min: 3, max: 3, nivel: "Positivo (3+)", cor: "#ff5722" },
        Q5: { min: 4, max: 10, nivel: "Fortemente Positivo", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "HER2 negativo - Bom prognóstico" },
      Q3: {
        significado: "HER2 equívoco - Necessita confirmação por FISH",
        investigar: ["FISH (hibridização fluorescente)"]
      },
      Q4: {
        significado: "HER2 positivo - Candidato a terapia-alvo",
        orientacoes: ["Trastuzumab (Herceptin)", "Pertuzumab", "Quimioterapia adjuvante"]
      }
    },
    correlacoes: ["ca153", "estradiol"]
  },

  chromograninA: {
    nome: "Chromogranina A",
    categoria: "Marcadores Tumorais",
    unidade: "ng/mL",
    funcao: "Marcador de tumores neuroendócrinos (carcinoides, feocromocitoma, insulinoma).",
    referencia: { geral: { min: 0, max: 95 } },
    ideal: { geral: 40 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 50, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 50, max: 95, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 95, max: 200, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 200, max: 500, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 500, max: 9999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Chromogranina A normal" },
      Q3: {
        significado: "Chromogranina A elevada",
        causas: ["Uso de IBP", "Gastrite atrófica", "Insuficiência renal"],
        investigar: ["Suspender IBP 2 semanas", "TC abdome", "Cintilografia octreotide"]
      },
      Q5: {
        significado: "Chromogranina A muito elevada - TUMOR NEUROENDÓCRINO",
        urgente: true,
        investigar: ["Oncologista URGENTE", "PET-DOTATATE", "TC/RNM"]
      }
    },
    correlacoes: ["gastrina", "insulina"]
  },

  pdl1: {
    nome: "PD-L1 (Expressão)",
    categoria: "Marcadores Tumorais",
    unidade: "%",
    funcao: "Marcador preditivo para imunoterapia. PD-L1 >50% indica candidato a pembrolizumab/nivolumab.",
    referencia: { geral: { min: 0, max: 100 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 1, nivel: "Negativo (<1%)", cor: "#4caf50" },
        Q2: { min: 1, max: 5, nivel: "Baixo (1-5%)", cor: "#ffc107" },
        Q3: { min: 5, max: 50, nivel: "Moderado (5-50%)", cor: "#ff9800" },
        Q4: { min: 50, max: 75, nivel: "Alto (>50%)", cor: "#ff5722" },
        Q5: { min: 75, max: 100, nivel: "Muito Alto (>75%)", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: { significado: "PD-L1 negativo - Imunoterapia menos eficaz" },
      Q4: {
        significado: "PD-L1 alto - CANDIDATO A IMUNOTERAPIA",
        orientacoes: ["Pembrolizumab", "Nivolumab", "Atezolizumab", "Durvalumab"]
      }
    },
    correlacoes: ["ldh", "cea"]
  },

  s100: {
    nome: "S-100",
    categoria: "Marcadores Tumorais",
    unidade: "µg/L",
    funcao: "Marcador de melanoma. Também elevado em tumores neurogênicos e gliomas.",
    referencia: { geral: { min: 0, max: 0.15 } },
    ideal: { geral: 0.05 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.10, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 0.10, max: 0.15, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 0.15, max: 0.30, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 0.30, max: 1.0, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 1.0, max: 99, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "S-100 normal" },
      Q3: {
        significado: "S-100 elevado - Investigar melanoma",
        investigar: ["Dermatoscopia", "Biópsia de lesão", "PET-CT"]
      },
      Q5: {
        significado: "S-100 muito elevado - MELANOMA METASTÁTICO",
        urgente: true,
        investigar: ["Oncologista URGENTE", "PET-CT", "RNM cerebral"]
      }
    },
    correlacoes: ["ldh"]
  },

  nse: {
    nome: "NSE - Enolase Neuronal Específica",
    categoria: "Marcadores Tumorais",
    unidade: "ng/mL",
    funcao: "Marcador de câncer de pulmão de pequenas células e tumores neuroendócrinos.",
    referencia: { geral: { min: 0, max: 16.3 } },
    ideal: { geral: 8 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 10, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 10, max: 16.3, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 16.3, max: 30, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 30, max: 100, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 100, max: 9999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "NSE normal" },
      Q3: {
        significado: "NSE elevado",
        investigar: ["TC tórax", "Broncoscopia"]
      },
      Q5: {
        significado: "NSE muito elevado - Câncer pulmão pequenas células",
        urgente: true,
        investigar: ["Oncologista URGENTE", "PET-CT"]
      }
    },
    correlacoes: ["chromograninA", "ldh"]
  },

  nmp22: {
    nome: "NMP22 (Proteína de Matriz Nuclear 22)",
    categoria: "Marcadores Tumorais",
    unidade: "U/mL",
    funcao: "Marcador urinário de câncer de bexiga. Útil para rastreamento e monitoramento de recidiva.",
    referencia: { geral: { min: 0, max: 10 } },
    ideal: { geral: 3 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 6, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 6, max: 10, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 10, max: 20, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 20, max: 50, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 50, max: 9999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "NMP22 normal" },
      Q3: {
        significado: "NMP22 elevado - Investigar câncer de bexiga",
        causas: ["Infecção urinária", "Cálculo renal", "Trauma urinário"],
        investigar: ["Cistoscopia", "TC urografia", "Citologia urinária"]
      },
      Q5: {
        significado: "NMP22 muito elevado - CÂNCER DE BEXIGA",
        urgente: true,
        investigar: ["Urologista URGENTE", "Cistoscopia", "Biópsia"]
      }
    },
    correlacoes: ["creatinina"]
  },

  alphaEnolase: {
    nome: "Alpha-Enolase",
    categoria: "Marcadores Tumorais",
    unidade: "ng/mL",
    funcao: "Marcador de tumores pulmonares, especialmente carcinoma de células escamosas.",
    referencia: { geral: { min: 0, max: 10 } },
    ideal: { geral: 4 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 6, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 6, max: 10, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 10, max: 20, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 20, max: 50, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 50, max: 999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Alpha-Enolase normal" },
      Q5: {
        significado: "Alpha-Enolase muito elevado - Tumor pulmonar",
        urgente: true
      }
    },
    correlacoes: ["nse", "cea"]
  },

  pap: {
    nome: "PAP - Fosfatase Ácida Prostática",
    categoria: "Marcadores Tumorais",
    unidade: "ng/mL",
    funcao: "Marcador clássico de câncer de próstata. Menos específico que PSA, mas útil em casos avançados.",
    referencia: { 
      homem: { min: 0, max: 3.5 }
    },
    ideal: { homem: 1.5 },
    quintis: {
      homem: {
        Q1: { min: 0, max: 2, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 2, max: 3.5, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 3.5, max: 7, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 7, max: 15, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 15, max: 999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "PAP normal" },
      Q5: {
        significado: "PAP muito elevado - Câncer de próstata avançado",
        urgente: true
      }
    },
    correlacoes: ["psa", "testosteronaTotal"]
  },

  beta2Microglobulina: {
    nome: "Beta-2 Microglobulina",
    categoria: "Marcadores Tumorais",
    unidade: "mg/L",
    funcao: "Marcador de mieloma múltiplo, linfomas e disfunção renal. Fator prognóstico importante.",
    referencia: { geral: { min: 0, max: 2.5 } },
    ideal: { geral: 1.5 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 1.8, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 1.8, max: 2.5, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 2.5, max: 3.5, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 3.5, max: 5.5, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 5.5, max: 99, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Beta-2 microglobulina normal" },
      Q3: {
        significado: "Beta-2 microglobulina elevada",
        causas: ["Insuficiência renal", "Inflamação", "Infecções virais"],
        investigar: ["Creatinina", "Hemograma", "Eletroforese de proteínas"]
      },
      Q5: {
        significado: "Beta-2 muito elevada - MIELOMA MÚLTIPLO",
        urgente: true,
        investigar: ["Hematologista URGENTE", "Eletroforese", "Biópsia MO"]
      }
    },
    correlacoes: ["creatinina", "ldh", "calcio"]
  },

  // ========================================================================
  // MARCADORES CARDÍACOS - Painel Especializado (9 exames)
  // ========================================================================

  troponinaI: {
    nome: "Troponina I Cardíaca",
    categoria: "Marcadores Cardíacos",
    unidade: "ng/mL",
    funcao: "Marcador gold standard de infarto agudo do miocárdio. Elevação indica lesão miocárdica.",
    referencia: { geral: { min: 0, max: 0.04 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.02, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 0.02, max: 0.04, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 0.04, max: 0.10, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 0.10, max: 1.0, nivel: "IAM", cor: "#ff5722" },
        Q5: { min: 1.0, max: 999, nivel: "IAM EXTENSO", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Troponina I normal - Sem lesão miocárdica recente" },
      Q3: {
        significado: "Troponina I elevada - Lesão miocárdica",
        causas: ["Angina instável", "Miocardite", "Insuficiência renal", "Sepse"],
        investigar: ["ECG", "Ecocardiograma", "Cineangiocoronariografia"]
      },
      Q4: {
        significado: "Troponina I muito elevada - INFARTO AGUDO DO MIOCÁRDIO",
        urgente: true,
        orientacoes: ["EMERGÊNCIA - Unidade coronariana URGENTE", "AAS", "Clopidogrel", "Cateterismo"]
      }
    },
    correlacoes: ["ckmb", "mioglobina", "ldh"]
  },

  troponinaT: {
    nome: "Troponina T Cardíaca",
    categoria: "Marcadores Cardíacos",
    unidade: "ng/mL",
    funcao: "Marcador de infarto do miocárdio. Similar à troponina I, mas com perfil temporal ligeiramente diferente.",
    referencia: { geral: { min: 0, max: 0.014 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.01, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 0.01, max: 0.014, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 0.014, max: 0.05, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 0.05, max: 0.5, nivel: "IAM", cor: "#ff5722" },
        Q5: { min: 0.5, max: 999, nivel: "IAM EXTENSO", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Troponina T normal" },
      Q4: {
        significado: "Troponina T muito elevada - INFARTO DO MIOCÁRDIO",
        urgente: true
      }
    },
    correlacoes: ["troponinaI", "ckmb"]
  },

  ckmb: {
    nome: "CK-MB (Creatino-Quinase MB)",
    categoria: "Marcadores Cardíacos",
    unidade: "ng/mL",
    funcao: "Isoenzima cardíaca da CK. Marcador de infarto do miocárdio. Pico em 12-24h, normaliza em 2-3 dias.",
    referencia: { geral: { min: 0, max: 5 } },
    ideal: { geral: 2 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 3, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 3, max: 5, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 5, max: 10, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 10, max: 25, nivel: "IAM", cor: "#ff5722" },
        Q5: { min: 25, max: 999, nivel: "IAM EXTENSO", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "CK-MB normal" },
      Q4: {
        significado: "CK-MB muito elevada - INFARTO DO MIOCÁRDIO",
        urgente: true
      }
    },
    correlacoes: ["troponinaI", "mioglobina"]
  },

  mioglobina: {
    nome: "Mioglobina",
    categoria: "Marcadores Cardíacos",
    unidade: "ng/mL",
    funcao: "Marcador precoce de infarto (2-4h). Menos específico, mas primeiro a elevar após lesão.",
    referencia: { 
      homem: { min: 28, max: 72 },
      mulher: { min: 25, max: 58 }
    },
    ideal: { 
      homem: 50,
      mulher: 40
    },
    quintis: {
      homem: {
        Q1: { min: 0, max: 40, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 40, max: 72, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 72, max: 100, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 100, max: 200, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 200, max: 9999, nivel: "Crítico", cor: "#d32f2f" }
      },
      mulher: {
        Q1: { min: 0, max: 35, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 35, max: 58, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 58, max: 90, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 90, max: 180, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 180, max: 9999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Mioglobina normal" },
      Q3: {
        significado: "Mioglobina elevada - Lesão muscular cardíaca ou esquelética",
        causas: ["Infarto", "Exercício extremo", "Rabdomiólise", "Trauma muscular"],
        investigar: ["Troponina", "CK total", "ECG"]
      }
    },
    correlacoes: ["troponinaI", "ckmb"]
  },

  bnp: {
    nome: "BNP - Peptídeo Natriurético Tipo B",
    categoria: "Marcadores Cardíacos",
    unidade: "pg/mL",
    funcao: "Marcador de insuficiência cardíaca. Secretado pelos ventrículos em resposta ao estiramento.",
    referencia: { geral: { min: 0, max: 100 } },
    ideal: { geral: 30 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 50, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 50, max: 100, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 100, max: 300, nivel: "IC Leve", cor: "#ff9800" },
        Q4: { min: 300, max: 600, nivel: "IC Moderada", cor: "#ff5722" },
        Q5: { min: 600, max: 9999, nivel: "IC Grave", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "BNP normal - Improvável insuficiência cardíaca" },
      Q3: {
        significado: "BNP elevado - Insuficiência cardíaca leve",
        orientacoes: ["Ecocardiograma", "Diuréticos", "IECA/BRA", "Beta-bloqueador"]
      },
      Q5: {
        significado: "BNP muito elevado - INSUFICIÊNCIA CARDÍACA GRAVE",
        urgente: true,
        orientacoes: ["Cardiologista URGENTE", "Internação", "Diuréticos IV"]
      }
    },
    correlacoes: ["ntProBnp"]
  },

  ntProBnp: {
    nome: "NT-proBNP",
    categoria: "Marcadores Cardíacos",
    unidade: "pg/mL",
    funcao: "Fragmento N-terminal do proBNP. Mais estável e sensível que BNP para insuficiência cardíaca.",
    referencia: { geral: { min: 0, max: 125 } },
    ideal: { geral: 50 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 75, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 75, max: 125, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 125, max: 450, nivel: "IC Leve", cor: "#ff9800" },
        Q4: { min: 450, max: 900, nivel: "IC Moderada", cor: "#ff5722" },
        Q5: { min: 900, max: 99999, nivel: "IC Grave", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "NT-proBNP normal" },
      Q5: {
        significado: "NT-proBNP muito elevado - INSUFICIÊNCIA CARDÍACA GRAVE",
        urgente: true
      }
    },
    correlacoes: ["bnp", "troponinaI"]
  },

  dDimero: {
    nome: "D-Dímero",
    categoria: "Marcadores Cardíacos",
    unidade: "ng/mL",
    funcao: "Produto de degradação da fibrina. Marcador de trombose, embolia pulmonar e coagulação intravascular.",
    referencia: { geral: { min: 0, max: 500 } },
    ideal: { geral: 200 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 250, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 250, max: 500, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 500, max: 1000, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 1000, max: 3000, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 3000, max: 99999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "D-Dímero normal - Improvável trombose/embolia" },
      Q3: {
        significado: "D-Dímero elevado",
        causas: ["TVP", "Embolia pulmonar", "DIC", "Pós-operatório", "Gravidez"],
        investigar: ["Doppler venoso", "Angiotomografia pulmonar", "Ecocardiograma"]
      },
      Q5: {
        significado: "D-Dímero muito elevado - TROMBOSE/EMBOLIA/DIC",
        urgente: true,
        orientacoes: ["EMERGÊNCIA", "Anticoagulação", "Investigar embolia pulmonar"]
      }
    },
    correlacoes: ["fibrinogenio", "plaquetas"]
  },

  aldosterona: {
    nome: "Aldosterona",
    categoria: "Marcadores Cardíacos",
    unidade: "ng/dL",
    funcao: "Hormônio regulador de sódio/potássio. Elevado em hiperaldosteronismo primário e hipertensão.",
    referencia: { geral: { min: 4, max: 31 } },
    ideal: { geral: 15 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 4, nivel: "Baixo", cor: "#ff9800" },
        Q2: { min: 4, max: 15, nivel: "Normal", cor: "#4caf50" },
        Q3: { min: 15, max: 31, nivel: "Aceitável", cor: "#4caf50" },
        Q4: { min: 31, max: 50, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 50, max: 999, nivel: "Muito Alto", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q2: { significado: "Aldosterona normal" },
      Q5: {
        significado: "Aldosterona muito elevada - Hiperaldosteronismo",
        causas: ["Adenoma adrenal", "Hiperplasia adrenal", "Uso de diuréticos"],
        sintomas: ["Hipertensão", "Hipocalemia", "Fraqueza muscular"],
        orientacoes: ["Espironolactona", "TC adrenal", "Ratio aldosterona/renina"]
      }
    },
    correlacoes: ["renina", "potassio", "sodio"]
  },

  renina: {
    nome: "Renina Plasmática",
    categoria: "Marcadores Cardíacos",
    unidade: "ng/mL/h",
    funcao: "Enzima do sistema renina-angiotensina-aldosterona. Importante na regulação da pressão arterial.",
    referencia: { geral: { min: 0.5, max: 3.3 } },
    ideal: { geral: 1.5 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.5, nivel: "Muito Baixa", cor: "#ff9800" },
        Q2: { min: 0.5, max: 1.5, nivel: "Normal", cor: "#4caf50" },
        Q3: { min: 1.5, max: 3.3, nivel: "Aceitável", cor: "#4caf50" },
        Q4: { min: 3.3, max: 6.0, nivel: "Elevada", cor: "#ff9800" },
        Q5: { min: 6.0, max: 99, nivel: "Muito Alta", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q2: { significado: "Renina normal" },
      Q1: {
        significado: "Renina muito baixa",
        causas: ["Hiperaldosteronismo primário", "Síndrome de Conn", "Excesso de sal"],
        investigar: ["Ratio aldosterona/renina", "TC adrenal"]
      },
      Q5: {
        significado: "Renina muito alta",
        causas: ["Estenose renal", "Tumor secretor de renina", "Desidratação"],
        investigar: ["Doppler renal", "Angiografia renal"]
      }
    },
    correlacoes: ["aldosterona", "angiotensinaII"]
  },

  // ========================================================================
  // MARCADORES CEREBRAIS/NEURODEGENERATIVOS (5 exames)
  // ========================================================================

  betaAmiloide: {
    nome: "Beta-Amilóide 42 (Aβ42)",
    categoria: "Marcadores Cerebrais",
    unidade: "pg/mL",
    funcao: "Marcador de doença de Alzheimer. Níveis baixos no LCR indicam deposição cerebral de placas amiloides.",
    referencia: { geral: { min: 500, max: 1500 } },
    ideal: { geral: 1000 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 500, nivel: "Muito Baixo (Alzheimer)", cor: "#ff5722" },
        Q2: { min: 500, max: 700, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 700, max: 1200, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 1200, max: 1500, nivel: "Aceitável", cor: "#4caf50" },
        Q5: { min: 1500, max: 9999, nivel: "Alto", cor: "#4caf50" }
      }
    },
    interpretacao: {
      Q3: { significado: "Beta-amilóide 42 normal - Baixo risco de Alzheimer" },
      Q1: {
        significado: "Beta-amilóide 42 muito baixo - RISCO DE ALZHEIMER",
        causas: ["Deposição de placas amiloides cerebrais"],
        sintomas: ["Déficit cognitivo", "Perda de memória", "Desorientação"],
        orientacoes: ["Neurologista", "RNM cerebral", "PET-amiloide", "Inibidores colinesterase"]
      }
    },
    correlacoes: ["tauProteina", "apoE"]
  },

  tauProteina: {
    nome: "Proteína TAU Fosforilada (p-TAU)",
    categoria: "Marcadores Cerebrais",
    unidade: "pg/mL",
    funcao: "Marcador de neurodegeneração e emaranhados neurofibrilares. Elevado em Alzheimer e demências.",
    referencia: { geral: { min: 0, max: 60 } },
    ideal: { geral: 30 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 40, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 40, max: 60, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 60, max: 80, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 80, max: 120, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 120, max: 999, nivel: "Crítico (Alzheimer)", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "TAU normal" },
      Q5: {
        significado: "TAU muito elevada - DOENÇA DE ALZHEIMER",
        orientacoes: ["Neurologista URGENTE", "Acompanhamento cognitivo", "Memantina", "Donepezil"]
      }
    },
    correlacoes: ["betaAmiloide", "apoE"]
  },

  apoE: {
    nome: "Genotipagem ApoE",
    categoria: "Marcadores Cerebrais",
    unidade: "genótipo",
    funcao: "Identificação de alelos APOE (ε2, ε3, ε4). APOE ε4 aumenta risco de Alzheimer em 3-15x.",
    referencia: { geral: { min: 0, max: 4 } },
    ideal: { geral: 3 },
    quintis: {
      geral: {
        Q1: { min: 2, max: 2, nivel: "APOE ε2/ε2 (Protetor)", cor: "#4caf50" },
        Q2: { min: 3, max: 3, nivel: "APOE ε3/ε3 (Normal)", cor: "#4caf50" },
        Q3: { min: 4, max: 4, nivel: "APOE ε3/ε4 (Risco)", cor: "#ff9800" },
        Q4: { min: 5, max: 5, nivel: "APOE ε4/ε4 (Alto Risco)", cor: "#ff5722" },
        Q5: { min: 6, max: 10, nivel: "Outros genótipos", cor: "#ffc107" }
      }
    },
    interpretacao: {
      Q2: { significado: "APOE ε3/ε3 - Risco normal de Alzheimer" },
      Q3: {
        significado: "APOE ε3/ε4 - Risco aumentado de Alzheimer (3x)",
        orientacoes: ["Dieta mediterrânea", "Exercício físico", "Ômega-3", "Controle vascular"]
      },
      Q4: {
        significado: "APOE ε4/ε4 - RISCO MUITO ALTO de Alzheimer (10-15x)",
        orientacoes: ["Avaliação cognitiva regular", "Neuroprotecção agressiva", "Estilo de vida saudável"]
      }
    },
    correlacoes: ["betaAmiloide", "tauProteina", "colesterolTotal"]
  },

  s100b: {
    nome: "S100B",
    categoria: "Marcadores Cerebrais",
    unidade: "µg/L",
    funcao: "Marcador de lesão cerebral aguda e neurodegeneração. Elevado em trauma craniano, AVC e gliomas.",
    referencia: { geral: { min: 0, max: 0.15 } },
    ideal: { geral: 0.05 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.10, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 0.10, max: 0.15, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 0.15, max: 0.30, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 0.30, max: 1.0, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 1.0, max: 99, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "S100B normal" },
      Q3: {
        significado: "S100B elevado - Lesão cerebral",
        causas: ["Trauma craniano", "AVC", "Convulsões", "Neurocirurgia recente"],
        investigar: ["TC crânio", "RNM cerebral"]
      },
      Q5: {
        significado: "S100B muito elevado - LESÃO CEREBRAL GRAVE",
        urgente: true,
        investigar: ["Neurocirurgião URGENTE", "TC", "Monitorização neurológica"]
      }
    },
    correlacoes: ["nse"]
  },

  neurofilamento: {
    nome: "Neurofilamento Leve (Nf-L)",
    categoria: "Marcadores Cerebrais",
    unidade: "pg/mL",
    funcao: "Marcador de degeneração axonal. Elevado em esclerose múltipla, Alzheimer, ALS e lesões neurológicas.",
    referencia: { geral: { min: 0, max: 30 } },
    ideal: { geral: 10 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 15, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 15, max: 30, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 30, max: 60, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 60, max: 150, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 150, max: 9999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Neurofilamento leve normal" },
      Q3: {
        significado: "Nf-L elevado - Degeneração axonal",
        causas: ["Esclerose múltipla", "Alzheimer", "Trauma craniano", "AVC"],
        investigar: ["Neurologista", "RNM cerebral", "Punção lombar"]
      },
      Q5: {
        significado: "Nf-L muito elevado - NEURODEGENERAÇÃO ATIVA",
        urgente: true,
        orientacoes: ["Neurologista URGENTE", "Investigar doenças desmielinizantes"]
      }
    },
    correlacoes: ["s100b", "tauProteina"]
  },

  // ========================================================================
  // MARCADORES INTESTINAIS (5 exames)
  // ========================================================================

  calprotectina: {
    nome: "Calprotectina Fecal",
    categoria: "Marcadores Intestinais",
    unidade: "µg/g",
    funcao: "Marcador de inflamação intestinal. Diferencia DII (Crohn, retocolite) de síndrome do intestino irritável.",
    referencia: { geral: { min: 0, max: 50 } },
    ideal: { geral: 20 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 30, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 30, max: 50, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 50, max: 150, nivel: "Inflamação Leve", cor: "#ff9800" },
        Q4: { min: 150, max: 500, nivel: "Inflamação Moderada", cor: "#ff5722" },
        Q5: { min: 500, max: 9999, nivel: "Inflamação Grave (DII)", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Calprotectina normal - Improvável DII" },
      Q3: {
        significado: "Calprotectina elevada - Inflamação intestinal",
        causas: ["Doença de Crohn", "Retocolite ulcerativa", "Uso de AINEs", "Infecção intestinal"],
        investigar: ["Colonoscopia", "Hemograma", "PCR", "VSG"]
      },
      Q5: {
        significado: "Calprotectina muito elevada - DOENÇA INFLAMATÓRIA INTESTINAL ATIVA",
        urgente: true,
        investigacoes: ["Gastroenterologista URGENTE", "Colonoscopia com biópsia"]
      }
    },
    correlacoes: ["lactoferrina", "pcr"]
  },

  lactoferrina: {
    nome: "Lactoferrina Fecal",
    categoria: "Marcadores Intestinais",
    unidade: "µg/g",
    funcao: "Marcador de inflamação intestinal. Complementar à calprotectina. Especialmente útil em DII.",
    referencia: { geral: { min: 0, max: 7.25 } },
    ideal: { geral: 3 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 5, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 5, max: 7.25, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 7.25, max: 15, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 15, max: 30, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 30, max: 999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Lactoferrina normal" },
      Q3: {
        significado: "Lactoferrina elevada - Inflamação intestinal",
        orientacoes: ["Avaliar junto com calprotectina", "Colonoscopia"]
      }
    },
    correlacoes: ["calprotectina", "hemoglobina"]
  },

  gastrina: {
    nome: "Gastrina Sérica",
    categoria: "Marcadores Intestinais",
    unidade: "pg/mL",
    funcao: "Hormônio que estimula secreção ácida gástrica. Elevado em gastrinoma (Síndrome de Zollinger-Ellison) e uso de IBP.",
    referencia: { geral: { min: 13, max: 115 } },
    ideal: { geral: 60 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 10, nivel: "Muito Baixa", cor: "#ff9800" },
        Q2: { min: 10, max: 50, nivel: "Baixa/Normal", cor: "#4caf50" },
        Q3: { min: 50, max: 115, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 115, max: 500, nivel: "Elevada", cor: "#ff9800" },
        Q5: { min: 500, max: 9999, nivel: "Muito Alta (Gastrinoma)", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q3: { significado: "Gastrina normal" },
      Q1: {
        significado: "Gastrina muito baixa",
        causas: ["Gastrite atrófica", "Anemia perniciosa", "Acloridria"],
        investigar: ["Endoscopia digestiva alta", "Vitamina B12"]
      },
      Q5: {
        significado: "Gastrina muito elevada - GASTRINOMA (Zollinger-Ellison)",
        urgente: true,
        investigar: ["Suspender IBP 2 semanas e repetir", "TC abdome", "Ecoendoscopia"]
      }
    },
    correlacoes: ["chromograninA", "vitaminaB12"]
  },

  asca: {
    nome: "ASCA - Anti-Saccharomyces cerevisiae",
    categoria: "Marcadores Intestinais",
    unidade: "U/mL",
    funcao: "Autoanticorpo associado à Doença de Crohn. ASCA+ e pANCA- sugere Crohn.",
    referencia: { geral: { min: 0, max: 20 } },
    ideal: { geral: 5 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 10, nivel: "Negativo", cor: "#4caf50" },
        Q2: { min: 10, max: 20, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 20, max: 40, nivel: "Positivo Fraco", cor: "#ff9800" },
        Q4: { min: 40, max: 80, nivel: "Positivo Moderado", cor: "#ff5722" },
        Q5: { min: 80, max: 999, nivel: "Positivo Forte", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "ASCA negativo" },
      Q4: {
        significado: "ASCA positivo - DOENÇA DE CROHN provável",
        orientacoes: ["Gastroenterologista", "Colonoscopia", "Ileocolonoscopia com biópsia"]
      }
    },
    correlacoes: ["anca", "calprotectina"]
  },

  anca: {
    nome: "pANCA - Anti-citoplasma de neutrófilo padrão perinuclear",
    categoria: "Marcadores Intestinais",
    unidade: "U/mL",
    funcao: "Autoanticorpo associado à Retocolite Ulcerativa. pANCA+ e ASCA- sugere RCU.",
    referencia: { geral: { min: 0, max: 20 } },
    ideal: { geral: 5 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 10, nivel: "Negativo", cor: "#4caf50" },
        Q2: { min: 10, max: 20, nivel: "Limítrofe", cor: "#ffc107" },
        Q3: { min: 20, max: 40, nivel: "Positivo Fraco", cor: "#ff9800" },
        Q4: { min: 40, max: 80, nivel: "Positivo Moderado", cor: "#ff5722" },
        Q5: { min: 80, max: 999, nivel: "Positivo Forte", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "pANCA negativo" },
      Q4: {
        significado: "pANCA positivo - RETOCOLITE ULCERATIVA provável",
        orientacoes: ["Gastroenterologista", "Colonoscopia", "Mesalazina", "Corticoides"]
      }
    },
    correlacoes: ["asca", "calprotectina"]
  },

  // ========================================================================
  // OUTROS EXAMES ESSENCIAIS (8 exames)
  // ========================================================================

  homocisteina: {
    nome: "Homocisteína",
    categoria: "Cardiovascular/Metabólico",
    unidade: "µmol/L",
    funcao: "Aminoácido tóxico associado a risco cardiovascular, trombose e déficits de B6, B9, B12.",
    referencia: { geral: { min: 5, max: 15 } },
    ideal: { geral: 8 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 7, nivel: "Ideal", cor: "#4caf50" },
        Q2: { min: 7, max: 10, nivel: "Normal", cor: "#4caf50" },
        Q3: { min: 10, max: 15, nivel: "Limítrofe", cor: "#ffc107" },
        Q4: { min: 15, max: 30, nivel: "Elevada", cor: "#ff9800" },
        Q5: { min: 30, max: 999, nivel: "Muito Alta", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: { significado: "Homocisteína ideal" },
      Q4: {
        significado: "Homocisteína elevada - Risco cardiovascular",
        causas: ["Deficiência B6/B9/B12", "Polimorfismo MTHFR", "Dieta pobre em folato"],
        sintomas: ["Risco de trombose", "Risco de AVC", "Risco de IAM"],
        orientacoes: ["Ácido fólico 5mg", "B12 1000mcg", "B6 100mg", "Betaína (TMG)"]
      }
    },
    correlacoes: ["vitaminaB12", "vitaminaB9", "vitaminaB6"]
  },

  acidoUrico: {
    nome: "Ácido Úrico",
    categoria: "Metabolismo",
    unidade: "mg/dL",
    funcao: "Produto final do metabolismo das purinas. Elevado em gota, síndrome metabólica e doença renal.",
    referencia: { 
      homem: { min: 3.5, max: 7.2 },
      mulher: { min: 2.6, max: 6.0 }
    },
    ideal: { 
      homem: 5.5,
      mulher: 4.5
    },
    quintis: {
      homem: {
        Q1: { min: 0, max: 3.0, nivel: "Baixo", cor: "#ffc107" },
        Q2: { min: 3.0, max: 5.0, nivel: "Ideal", cor: "#4caf50" },
        Q3: { min: 5.0, max: 7.2, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 7.2, max: 9.0, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 9.0, max: 99, nivel: "Muito Alto (Gota)", cor: "#ff5722" }
      },
      mulher: {
        Q1: { min: 0, max: 2.0, nivel: "Baixo", cor: "#ffc107" },
        Q2: { min: 2.0, max: 4.0, nivel: "Ideal", cor: "#4caf50" },
        Q3: { min: 4.0, max: 6.0, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 6.0, max: 8.0, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 8.0, max: 99, nivel: "Muito Alto", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q2: { significado: "Ácido úrico ideal" },
      Q5: {
        significado: "Ácido úrico muito alto - GOTA/Síndrome metabólica",
        causas: ["Excesso de purinas (carnes)", "Álcool", "Frutose", "Obesidade", "Doença renal"],
        sintomas: ["Artrite gotosa", "Cálculos renais", "Hipertensão"],
        orientacoes: ["Alopurinol", "Reduzir carnes vermelhas", "Evitar álcool", "Cereja", "Vitamina C"]
      }
    },
    correlacoes: ["creatinina", "triglicerideos"]
  },

  ureia: {
    nome: "Ureia",
    categoria: "Função Renal",
    unidade: "mg/dL",
    funcao: "Produto do metabolismo proteico excretado pelos rins. Elevado em insuficiência renal e desidratação.",
    referencia: { geral: { min: 15, max: 45 } },
    ideal: { geral: 30 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 10, nivel: "Muito Baixa", cor: "#ff9800" },
        Q2: { min: 10, max: 25, nivel: "Baixa/Normal", cor: "#4caf50" },
        Q3: { min: 25, max: 45, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 45, max: 80, nivel: "Elevada", cor: "#ff9800" },
        Q5: { min: 80, max: 999, nivel: "Muito Alta (IRC)", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q3: { significado: "Ureia normal" },
      Q1: {
        significado: "Ureia muito baixa",
        causas: ["Desnutrição proteica", "Doença hepática grave", "Dieta vegetariana estrita"],
        orientacoes: ["Aumentar proteína", "Avaliar função hepática"]
      },
      Q5: {
        significado: "Ureia muito elevada - INSUFICIÊNCIA RENAL",
        urgente: true,
        investigar: ["Nefrologista URGENTE", "Creatinina", "Ultrassom renal", "Diálise?"]
      }
    },
    correlacoes: ["creatinina", "acidoUrico"]
  },

  ferritina: {
    nome: "Ferritina",
    categoria: "Hematologia",
    unidade: "ng/mL",
    funcao: "Principal proteína de armazenamento de ferro. Também marcador inflamatório (fase aguda).",
    referencia: { 
      homem: { min: 30, max: 400 },
      mulher: { min: 15, max: 150 }
    },
    ideal: { 
      homem: 100,
      mulher: 70
    },
    quintis: {
      homem: {
        Q1: { min: 0, max: 30, nivel: "Deficiência", cor: "#ff5722" },
        Q2: { min: 30, max: 70, nivel: "Baixa", cor: "#ff9800" },
        Q3: { min: 70, max: 200, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 200, max: 400, nivel: "Alta", cor: "#ffc107" },
        Q5: { min: 400, max: 9999, nivel: "Muito Alta", cor: "#ff5722" }
      },
      mulher: {
        Q1: { min: 0, max: 15, nivel: "Deficiência", cor: "#ff5722" },
        Q2: { min: 15, max: 40, nivel: "Baixa", cor: "#ff9800" },
        Q3: { min: 40, max: 100, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 100, max: 150, nivel: "Alta", cor: "#ffc107" },
        Q5: { min: 150, max: 9999, nivel: "Muito Alta", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q3: { significado: "Ferritina ideal" },
      Q1: {
        significado: "Ferritina muito baixa - DEFICIÊNCIA DE FERRO",
        causas: ["Sangramento", "Dieta inadequada", "Má absorção", "Menstruação"],
        sintomas: ["Fadiga", "Anemia", "Queda de cabelo", "Unhas quebradiças"],
        orientacoes: ["Ferro 200mg + Vitamina C", "Investigar sangramento oculto"]
      },
      Q5: {
        significado: "Ferritina muito alta",
        causas: ["Hemocromatose", "Inflamação crônica", "Síndrome metabólica", "Hepatopatia"],
        orientacoes: ["Investigar hemocromatose", "Flebotomia", "Quelantes de ferro"]
      }
    },
    correlacoes: ["hemoglobina", "ferro", "transferrina"]
  },

  transferrina: {
    nome: "Transferrina",
    categoria: "Hematologia",
    unidade: "mg/dL",
    funcao: "Proteína transportadora de ferro. Elevada na deficiência de ferro (mecanismo compensatório).",
    referencia: { geral: { min: 200, max: 360 } },
    ideal: { geral: 280 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 180, nivel: "Baixa", cor: "#ff9800" },
        Q2: { min: 180, max: 240, nivel: "Normal", cor: "#4caf50" },
        Q3: { min: 240, max: 320, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 320, max: 400, nivel: "Elevada", cor: "#ffc107" },
        Q5: { min: 400, max: 999, nivel: "Muito Elevada", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q2: { significado: "Transferrina normal" },
      Q1: {
        significado: "Transferrina baixa",
        causas: ["Inflamação crônica", "Desnutrição proteica", "Hepatopatia"],
        investigar: ["Albumina", "Proteínas totais", "Função hepática"]
      },
      Q5: {
        significado: "Transferrina muito elevada - Deficiência de ferro",
        orientacoes: ["Suplementar ferro", "Investigar causa da deficiência"]
      }
    },
    correlacoes: ["ferritina", "ferro", "hemoglobina"]
  },

  vitaminaD: {
    nome: "Vitamina D (25-OH-D3)",
    categoria: "Vitaminas",
    unidade: "ng/mL",
    funcao: "Hormônio essencial para ossos, imunidade, inflamação e prevenção de câncer.",
    referencia: { geral: { min: 30, max: 100 } },
    ideal: { geral: 60 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 20, nivel: "Deficiência", cor: "#ff5722" },
        Q2: { min: 20, max: 30, nivel: "Insuficiência", cor: "#ff9800" },
        Q3: { min: 30, max: 80, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 80, max: 100, nivel: "Alto", cor: "#4caf50" },
        Q5: { min: 100, max: 999, nivel: "Muito Alto", cor: "#ffc107" }
      }
    },
    interpretacao: {
      Q3: { significado: "Vitamina D ideal" },
      Q1: {
        significado: "Vitamina D muito baixa - DEFICIÊNCIA",
        causas: ["Falta de sol", "Pele escura", "Obesidade", "Má absorção intestinal"],
        sintomas: ["Fadiga", "Dor óssea", "Fraqueza muscular", "Depressão", "Imunidade baixa"],
        orientacoes: ["Vitamina D3 10.000 UI/dia por 8 semanas", "Depois manter 5.000 UI/dia", "Sol 15min/dia"]
      }
    },
    correlacoes: ["calcio", "pth", "magnesio"]
  },

  insulina: {
    nome: "Insulina Sérica (Jejum)",
    categoria: "Metabolismo",
    unidade: "µU/mL",
    funcao: "Hormônio regulador da glicose. Elevado indica resistência insulínica antes do diabetes.",
    referencia: { geral: { min: 2, max: 25 } },
    ideal: { geral: 5 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 2, nivel: "Muito Baixa", cor: "#ff9800" },
        Q2: { min: 2, max: 6, nivel: "Ideal", cor: "#4caf50" },
        Q3: { min: 6, max: 12, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 12, max: 25, nivel: "Elevada (RI)", cor: "#ff9800" },
        Q5: { min: 25, max: 999, nivel: "Muito Alta (RI)", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q2: { significado: "Insulina ideal" },
      Q4: {
        significado: "Insulina elevada - RESISTÊNCIA INSULÍNICA",
        causas: ["Obesidade", "Sedentarismo", "Dieta rica em carboidratos", "Síndrome metabólica"],
        sintomas: ["Ganho de peso abdominal", "Fadiga pós-prandial", "Acantose nigricans"],
        orientacoes: ["Dieta low-carb", "Jejum intermitente", "Berberina 500mg 3x", "Exercício", "Metformina"]
      }
    },
    correlacoes: ["glicose", "hba1c", "homaIR", "peptideoC"]
  },

  fibrinogenio: {
    nome: "Fibrinogênio",
    categoria: "Coagulação",
    unidade: "mg/dL",
    funcao: "Proteína da coagulação e marcador inflamatório. Elevado aumenta risco cardiovascular e trombose.",
    referencia: { geral: { min: 200, max: 400 } },
    ideal: { geral: 300 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 150, nivel: "Muito Baixo", cor: "#ff9800" },
        Q2: { min: 150, max: 250, nivel: "Normal", cor: "#4caf50" },
        Q3: { min: 250, max: 350, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 350, max: 500, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 500, max: 999, nivel: "Muito Alto", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q2: { significado: "Fibrinogênio normal" },
      Q1: {
        significado: "Fibrinogênio muito baixo - Risco de sangramento",
        urgente: true,
        investigar: ["Coagulopatia", "CID", "Afibrinogenemia congênita"]
      },
      Q5: {
        significado: "Fibrinogênio muito alto - Risco de trombose",
        causas: ["Inflamação", "Infecção", "Câncer", "Gravidez"],
        orientacoes: ["Investigar causa inflamatória", "AAS profilático?", "Estatina"]
      }
    },
    correlacoes: ["dDimero", "pcr", "plaquetas"]
  },

  // ========================================================================
  // MIELOGRAMA - Análise da Medula Óssea (5 séries)
  // ========================================================================

  mielogramaSerieEritrocítica: {
    nome: "Mielograma - Série Eritrocítica",
    categoria: "Hematologia Especializada",
    unidade: "%",
    funcao: "Avaliação da produção de glóbulos vermelhos na medula óssea. Identifica anemias, eritroblastose, mielodisplasias.",
    referencia: { geral: { min: 20, max: 30 } },
    ideal: { geral: 25 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 15, nivel: "Muito Baixo", cor: "#ff5722" },
        Q2: { min: 15, max: 20, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 20, max: 30, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 30, max: 40, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 40, max: 100, nivel: "Muito Elevado", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Série eritrocítica diminuída - Hipoplasia eritroide",
        causas: ["Anemia aplástica", "Infiltração medular (leucemia, linfoma)", "Toxicidade medicamentosa", "Infecções virais (parvovírus B19)"],
        sintomas: ["Anemia progressiva", "Fadiga severa", "Palidez"],
        investigar: ["Hemograma completo", "Reticulócitos", "Ferritina", "B12", "Folato", "Biópsia de medula óssea"],
        urgente: true
      },
      Q2: {
        significado: "Série eritrocítica baixa - Possível hipoplasia",
        causas: ["Deficiências nutricionais", "Inflamação crônica", "Doença renal crônica"],
        orientacoes: ["Investigar causas de anemia", "Suplementar ferro/B12/folato se deficiente"]
      },
      Q3: { significado: "Série eritrocítica normal - Produção adequada de hemácias" },
      Q4: {
        significado: "Série eritrocítica aumentada - Hiperplasia eritroide",
        causas: ["Anemia hemolítica compensatória", "Perda sanguínea crônica", "Hipóxia crônica", "Policitemia vera"],
        investigar: ["Reticulócitos", "Bilirrubinas", "LDH", "Haptoglobina", "Teste de Coombs"]
      },
      Q5: {
        significado: "Série eritrocítica muito aumentada - Eritroblastose severa",
        causas: ["Policitemia vera", "Anemia hemolítica grave", "Eritroleucemia"],
        urgente: true,
        investigar: ["Hematologista URGENTE", "Mutação JAK2", "Biópsia de medula"]
      }
    },
    correlacoes: ["hemoglobina", "hemacias", "reticulocitos", "ferritina"]
  },

  mielogramaSerieGranulocítica: {
    nome: "Mielograma - Série Granulocítica",
    categoria: "Hematologia Especializada",
    unidade: "%",
    funcao: "Avaliação da produção de neutrófilos, eosinófilos e basófilos na medula óssea. Identifica leucemias, infecções graves, reações tóxicas.",
    referencia: { geral: { min: 50, max: 70 } },
    ideal: { geral: 60 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 40, nivel: "Muito Baixo", cor: "#ff5722" },
        Q2: { min: 40, max: 50, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 50, max: 70, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 70, max: 80, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 80, max: 100, nivel: "Muito Elevado", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Série granulocítica diminuída - Hipoplasia granulocítica",
        causas: ["Anemia aplástica", "Leucemia aguda", "Síndrome mielodisplásica", "Toxicidade medicamentosa (quimioterapia)", "Infecções virais"],
        sintomas: ["Neutropenia", "Infecções recorrentes", "Febre", "Úlceras orais"],
        investigar: ["Hemograma com diferencial", "Biópsia de medula óssea", "Citogenética"],
        urgente: true
      },
      Q2: {
        significado: "Série granulocítica baixa - Possível mielossupressão",
        causas: ["Deficiências nutricionais (B12, folato)", "Infecções crônicas", "Medicamentos"],
        orientacoes: ["Investigar causas", "Suspender medicamentos mielotóxicos se possível"]
      },
      Q3: { significado: "Série granulocítica normal - Produção adequada de granulócitos" },
      Q4: {
        significado: "Série granulocítica aumentada - Hiperplasia granulocítica",
        causas: ["Infecção bacteriana", "Inflamação crônica", "Leucemia mieloide crônica", "Reação leucemoide"],
        investigar: ["Hemograma completo", "PCR", "Cromossomo Philadelphia (BCR-ABL)"]
      },
      Q5: {
        significado: "Série granulocítica muito aumentada - SUSPEITA LEUCEMIA MIELOIDE",
        causas: ["Leucemia mieloide crônica (LMC)", "Leucemia mieloide aguda (LMA)", "Reação leucemoide severa"],
        urgente: true,
        investigar: ["Hematologista URGENTE", "Citogenética", "BCR-ABL", "Imunofenotipagem"]
      }
    },
    correlacoes: ["leucocitos", "neutrofilos", "proteinaCreativa", "vhs"]
  },

  mielogramaSerieMegacariocítica: {
    nome: "Mielograma - Série Megacariocítica",
    categoria: "Hematologia Especializada",
    unidade: "megacariócitos/campo",
    funcao: "Avaliação da produção de plaquetas na medula óssea. Identifica trombocitopenias, trombocitoses, mielofibrose.",
    referencia: { geral: { min: 2, max: 10 } },
    ideal: { geral: 5 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 1, nivel: "Muito Baixo", cor: "#ff5722" },
        Q2: { min: 1, max: 2, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 2, max: 10, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 10, max: 20, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 20, max: 999, nivel: "Muito Elevado", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Megacariócitos muito diminuídos - Hipoplasia megacariocítica",
        causas: ["Anemia aplástica", "Púrpura trombocitopênica imune (PTI)", "Toxicidade medicamentosa", "Infecções virais (HIV, CMV)", "Mielofibrose avançada"],
        sintomas: ["Trombocitopenia severa", "Sangramentos espontâneos", "Petéquias", "Hematomas"],
        investigar: ["Plaquetas no hemograma", "Anticorpos antiplaquetários", "Biópsia de medula"],
        urgente: true
      },
      Q2: {
        significado: "Megacariócitos diminuídos - Produção plaquetária reduzida",
        causas: ["Deficiências nutricionais", "Mielossupressão medicamentosa", "Infecções"],
        orientacoes: ["Investigar causa da trombocitopenia", "Suplementar B12 e folato"]
      },
      Q3: { significado: "Megacariócitos normais - Produção adequada de plaquetas" },
      Q4: {
        significado: "Megacariócitos aumentados - Hiperplasia megacariocítica",
        causas: ["Trombocitopenia periférica (destruição plaquetária)", "Recuperação pós-mielossupressão", "Trombocitose reativa"],
        investigar: ["Plaquetas", "PCR", "Ferro", "Causas de trombocitose"]
      },
      Q5: {
        significado: "Megacariócitos muito aumentados - SUSPEITA TROMBOCITEMIA ESSENCIAL",
        causas: ["Trombocitemia essencial", "Policitemia vera", "Mielofibrose inicial", "Leucemia mieloide crônica"],
        urgente: true,
        investigar: ["Hematologista URGENTE", "Mutação JAK2", "Cromossomo Philadelphia", "Biópsia de medula"]
      }
    },
    correlacoes: ["plaquetas", "vpm", "ferritina"]
  },

  mielogramaLinfocitos: {
    nome: "Mielograma - Linfócitos",
    categoria: "Hematologia Especializada",
    unidade: "%",
    funcao: "Avaliação de linfócitos na medula óssea. Identifica linfomas, leucemia linfoide, infiltrados linfocíticos.",
    referencia: { geral: { min: 10, max: 20 } },
    ideal: { geral: 15 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 5, nivel: "Muito Baixo", cor: "#ff9800" },
        Q2: { min: 5, max: 10, nivel: "Baixo", cor: "#ffc107" },
        Q3: { min: 10, max: 20, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 20, max: 40, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 40, max: 100, nivel: "Muito Elevado", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Linfócitos medulares muito baixos - Linfopenia",
        causas: ["Imunodeficiência", "HIV/AIDS", "Medicamentos imunossupressores", "Radioterapia", "Desnutrição severa"],
        sintomas: ["Infecções oportunistas", "Baixa imunidade"],
        investigar: ["Hemograma com diferencial", "CD4/CD8", "Sorologias (HIV)", "Imunoglobulinas"]
      },
      Q2: {
        significado: "Linfócitos medulares baixos",
        orientacoes: ["Avaliar função imune", "Suplementar vitamina D", "Zinco", "Vitamina C"]
      },
      Q3: { significado: "Linfócitos medulares normais - Imunidade adequada" },
      Q4: {
        significado: "Linfócitos medulares aumentados - Linfocitose medular",
        causas: ["Infecções virais crônicas", "Doenças autoimunes", "Linfoma de baixo grau", "Leucemia linfoide crônica inicial"],
        investigar: ["Imunofenotipagem", "Citometria de fluxo", "Sorologias virais"]
      },
      Q5: {
        significado: "Linfócitos medulares muito aumentados - SUSPEITA LEUCEMIA LINFOIDE",
        causas: ["Leucemia linfoide aguda (LLA)", "Leucemia linfoide crônica (LLC)", "Linfoma com infiltração medular"],
        urgente: true,
        investigar: ["Hematologista URGENTE", "Imunofenotipagem", "Citogenética", "Biópsia de linfonodo se linfoma"]
      }
    },
    correlacoes: ["linfocitos", "leucocitos", "cd4", "cd8"]
  },

  mielogramaPlasmocitos: {
    nome: "Mielograma - Plasmócitos",
    categoria: "Hematologia Especializada",
    unidade: "%",
    funcao: "Avaliação de plasmócitos (células produtoras de anticorpos) na medula óssea. Identifica mieloma múltiplo, gamopatias.",
    referencia: { geral: { min: 0, max: 3 } },
    ideal: { geral: 1 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 1, nivel: "Normal", cor: "#4caf50" },
        Q2: { min: 1, max: 3, nivel: "Normal-Alto", cor: "#4caf50" },
        Q3: { min: 3, max: 10, nivel: "Levemente Elevado", cor: "#ffc107" },
        Q4: { min: 10, max: 30, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 30, max: 100, nivel: "Muito Elevado - MIELOMA", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Plasmócitos normais - Sem proliferação plasmocitária" },
      Q2: { significado: "Plasmócitos normais" },
      Q3: {
        significado: "Plasmócitos levemente aumentados - Plasmocitose reativa",
        causas: ["Infecções crônicas", "Doenças autoimunes", "Inflamação crônica", "Gamopatia monoclonal de significado indeterminado (MGUS)"],
        investigar: ["Eletroforese de proteínas", "Imunofixação", "Cadeias leves livres"]
      },
      Q4: {
        significado: "Plasmócitos elevados - SUSPEITA DE MIELOMA MÚLTIPLO",
        causas: ["Mieloma múltiplo incipiente", "Plasmocitoma", "Macroglobulinemia de Waldenström"],
        investigar: ["Eletroforese de proteínas", "Imunofixação sérica e urinária", "Cadeias leves livres", "Beta-2-microglobulina", "Radiografia óssea (série esquelética)", "PET-CT"],
        urgente: true
      },
      Q5: {
        significado: "Plasmócitos muito elevados - MIELOMA MÚLTIPLO CONFIRMADO",
        causas: ["Mieloma múltiplo"],
        sintomas: ["Dor óssea", "Fraturas patológicas", "Anemia", "Hipercalcemia", "Insuficiência renal"],
        urgente: true,
        investigar: ["Hematologista/Oncologista URGENTE", "Estadiamento completo", "Cálcio", "Creatinina", "Beta-2-microglobulina", "LDH", "Albumina", "PET-CT"]
      }
    },
    correlacoes: ["proteinasSericas", "calcio", "creatinina", "vhs", "hemoglobina"]
  }
};

export default LABORATORY_EXAMS_SPECIALIZED;
