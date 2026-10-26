/**
 * EXAMES LABORATORIAIS - MEDICINA FUNCIONAL
 * Baseado em "Guia dos Exames Laboratoriais" - Páginas 242 a 424
 * Sistema completo com 168+ exames
 * 
 * Estrutura:
 * - Valores de referência laboratoriais padrão
 * - Valores ideais funcionais (quintis)
 * - Interpretações por quintil (Q1 a Q5)
 * - Correlações entre exames
 * - Protocolos terapêuticos
 */

import LABORATORY_EXAMS_ADDITIONAL from './laboratoryExamsAdditional';
import LABORATORY_EXAMS_SPECIALIZED from './laboratoryExamsSpecialized';

export const LABORATORY_EXAMS_COMPLETE = {
  // ========================================================================
  // HEMOGRAMA COMPLETO
  // ========================================================================
  
  hemacias: {
    nome: "Hemácias (Eritrócitos)",
    categoria: "Hemograma",
    unidade: "milhões/mm³",
    referencia: {
      mulher: { min: 4.0, max: 5.2 },
      homem: { min: 4.5, max: 5.9 }
    },
    ideal: {
      mulher: 4.8,
      homem: 5.2
    },
    quintis: {
      mulher: {
        Q1: { min: 0, max: 4.0, nivel: "Muito Baixo", cor: "#f44336" },
        Q2: { min: 4.0, max: 4.4, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 4.4, max: 5.0, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 5.0, max: 5.2, nivel: "Aceitável", cor: "#ffc107" },
        Q5: { min: 5.2, max: 999, nivel: "Alto", cor: "#ff5722" }
      },
      homem: {
        Q1: { min: 0, max: 4.5, nivel: "Muito Baixo", cor: "#f44336" },
        Q2: { min: 4.5, max: 4.9, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 4.9, max: 5.5, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 5.5, max: 5.9, nivel: "Aceitável", cor: "#ffc107" },
        Q5: { min: 5.9, max: 999, nivel: "Alto", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Hemácias muito baixas - Anemia significativa",
        causas: [
          "Deficiência de ferro severa",
          "Deficiência de B12 ou folato",
          "Inflamação crônica (anemia de doença crônica)",
          "Má absorção intestinal",
          "Perda sanguínea oculta",
          "Disfunção na medula óssea"
        ],
        sintomas: [
          "Fadiga intensa",
          "Palidez cutânea e mucosas",
          "Falta de ar",
          "Tontura",
          "Palpitações",
          "Dificuldade de concentração"
        ],
        investigar: ["Ferritina", "Vitamina B12", "Ácido fólico", "Proteína C reativa", "Sangue oculto nas fezes"]
      },
      Q2: {
        significado: "Hemácias abaixo do ideal - Anemia leve a moderada",
        causas: [
          "Deficiência funcional de ferro",
          "Inflamação de baixo grau",
          "Déficit nutricional inicial",
          "Hipotireoidismo subclínico"
        ],
        sintomas: [
          "Cansaço ao esforço",
          "Redução da performance física",
          "Unhas fracas",
          "Queda de cabelo"
        ],
        investigar: ["Ferritina", "TSH", "T4 livre", "Proteína C reativa"]
      },
      Q3: {
        significado: "Hemácias em faixa ideal - Oxigenação adequada",
        orientacoes: [
          "Manter ingestão adequada de ferro, B12 e folato",
          "Acompanhar periodicamente",
          "Manter atividade física regular"
        ]
      },
      Q4: {
        significado: "Hemácias levemente elevadas - Aceitável",
        orientacoes: [
          "Monitorar hidratação",
          "Avaliar contexto clínico",
          "Acompanhar em próxima avaliação"
        ]
      },
      Q5: {
        significado: "Hemácias elevadas - Policitemia/Eritrocitose",
        causas: [
          "Desidratação (hemoconcentração)",
          "Adaptação à hipóxia crônica (altitude, DPOC)",
          "Uso de testosterona/anabolizantes",
          "Policitemia vera (raro)",
          "Tabagismo"
        ],
        riscos: [
          "Aumento da viscosidade sanguínea",
          "Risco trombótico elevado",
          "Sobrecarga cardiovascular"
        ],
        investigar: ["Hematócrito", "Hemoglobina", "Testosterona", "Gasometria"]
      }
    },
    correlacoes: ["ferritina", "hemoglobina", "hematocrito", "vcm", "vitaminaB12", "acidoFolico"]
  },

  hemoglobina: {
    nome: "Hemoglobina (Hb)",
    categoria: "Hemograma",
    unidade: "g/dL",
    referencia: {
      mulher: { min: 12.0, max: 16.0 },
      homem: { min: 13.5, max: 17.5 }
    },
    ideal: {
      mulher: 14.0,
      homem: 15.5
    },
    quintis: {
      mulher: {
        Q1: { min: 0, max: 12.0, nivel: "Muito Baixo", cor: "#f44336" },
        Q2: { min: 12.0, max: 13.0, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 13.0, max: 15.0, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 15.0, max: 16.0, nivel: "Aceitável", cor: "#ffc107" },
        Q5: { min: 16.0, max: 999, nivel: "Alto", cor: "#ff5722" }
      },
      homem: {
        Q1: { min: 0, max: 13.5, nivel: "Muito Baixo", cor: "#f44336" },
        Q2: { min: 13.5, max: 14.5, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 14.5, max: 16.5, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 16.5, max: 17.5, nivel: "Aceitável", cor: "#ffc107" },
        Q5: { min: 17.5, max: 999, nivel: "Alto", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Hemoglobina muito baixa - Anemia estabelecida",
        causas: [
          "Deficiência de ferro",
          "Deficiência de B12/folato",
          "Hemorragia crônica",
          "Anemia hemolítica",
          "Doença renal crônica"
        ],
        sintomas: [
          "Fadiga severa",
          "Dispneia",
          "Taquicardia",
          "Palidez",
          "Dor torácica ao esforço"
        ],
        urgente: true
      },
      Q2: {
        significado: "Hemoglobina abaixo do ideal",
        causas: [
          "Deficiência funcional de ferro",
          "Inflamação crônica",
          "Hipotireoidismo"
        ]
      },
      Q3: {
        significado: "Hemoglobina ideal - Transporte de O2 otimizado"
      },
      Q4: {
        significado: "Hemoglobina levemente elevada"
      },
      Q5: {
        significado: "Hemoglobina elevada",
        causas: [
          "Desidratação",
          "Policitemia",
          "Tabagismo",
          "Doença pulmonar crônica"
        ]
      }
    },
    correlacoes: ["hemacias", "hematocrito", "ferritina", "vitaminaB12"]
  },

  hematocrito: {
    nome: "Hematócrito (Ht)",
    categoria: "Hemograma",
    unidade: "%",
    referencia: {
      mulher: { min: 36, max: 46 },
      homem: { min: 40, max: 52 }
    },
    ideal: {
      mulher: 40,
      homem: 45
    },
    quintis: {
      mulher: {
        Q1: { min: 0, max: 36, nivel: "Muito Baixo", cor: "#f44336" },
        Q2: { min: 36, max: 38, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 38, max: 44, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 44, max: 46, nivel: "Aceitável", cor: "#ffc107" },
        Q5: { min: 46, max: 999, nivel: "Alto", cor: "#ff5722" }
      },
      homem: {
        Q1: { min: 0, max: 40, nivel: "Muito Baixo", cor: "#f44336" },
        Q2: { min: 40, max: 42, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 42, max: 50, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 50, max: 52, nivel: "Aceitável", cor: "#ffc107" },
        Q5: { min: 52, max: 999, nivel: "Alto", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Hematócrito muito baixo - Anemia",
        investigar: ["Hemoglobina", "Hemácias", "Ferritina"]
      },
      Q2: {
        significado: "Hematócrito abaixo do ideal"
      },
      Q3: {
        significado: "Hematócrito ideal - Volume eritrocitário adequado"
      },
      Q4: {
        significado: "Hematócrito levemente elevado"
      },
      Q5: {
        significado: "Hematócrito elevado - Risco de viscosidade aumentada",
        riscos: ["Trombose", "AVC", "Infarto"],
        urgente: true
      }
    },
    correlacoes: ["hemoglobina", "hemacias"]
  },

  vcm: {
    nome: "VCM (Volume Corpuscular Médio)",
    categoria: "Hemograma",
    unidade: "fL",
    referencia: {
      geral: { min: 80, max: 100 }
    },
    ideal: {
      geral: 90
    },
    quintis: {
      geral: {
        Q1: { min: 0, max: 80, nivel: "Muito Baixo (Microcítica)", cor: "#f44336" },
        Q2: { min: 80, max: 85, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 85, max: 95, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 95, max: 100, nivel: "Aceitável", cor: "#ffc107" },
        Q5: { min: 100, max: 999, nivel: "Alto (Macrocítica)", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Anemia Microcítica - Hemácias pequenas",
        causas: [
          "Deficiência de ferro",
          "Talassemia",
          "Anemia de doença crônica",
          "Intoxicação por chumbo"
        ],
        investigar: ["Ferritina", "Saturação de transferrina", "Eletroforese de hemoglobina"]
      },
      Q2: {
        significado: "VCM tendendo à microcitose"
      },
      Q3: {
        significado: "VCM ideal - Tamanho eritrocitário normal"
      },
      Q4: {
        significado: "VCM tendendo à macrocitose"
      },
      Q5: {
        significado: "Anemia Macrocítica - Hemácias grandes",
        causas: [
          "Deficiência de vitamina B12",
          "Deficiência de ácido fólico",
          "Hipotireoidismo",
          "Alcoolismo",
          "Uso de quimioterápicos"
        ],
        investigar: ["Vitamina B12", "Ácido fólico", "TSH", "Homocisteína"]
      }
    },
    correlacoes: ["hcm", "chcm", "ferritina", "vitaminaB12", "acidoFolico"]
  },

  hcm: {
    nome: "HCM (Hemoglobina Corpuscular Média)",
    categoria: "Hemograma",
    unidade: "pg",
    referencia: { geral: { min: 27, max: 33 } },
    ideal: { geral: 30 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 27, nivel: "Muito Baixo", cor: "#f44336" },
        Q2: { min: 27, max: 28.5, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 28.5, max: 31.5, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 31.5, max: 33, nivel: "Aceitável", cor: "#ffc107" },
        Q5: { min: 33, max: 999, nivel: "Alto", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: { significado: "HCM baixo - Hipocromia", causas: ["Deficiência de ferro", "Talassemia"] },
      Q2: { significado: "HCM abaixo do ideal" },
      Q3: { significado: "HCM ideal - Conteúdo hemoglobínico adequado" },
      Q4: { significado: "HCM levemente elevado" },
      Q5: { significado: "HCM elevado", causas: ["Deficiência de B12/folato", "Macrocitose"] }
    },
    correlacoes: ["vcm", "hemoglobina"]
  },

  chcm: {
    nome: "CHCM (Concentração de Hemoglobina Corpuscular Média)",
    categoria: "Hemograma",
    unidade: "%",
    referencia: { geral: { min: 32, max: 36 } },
    ideal: { geral: 34 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 32, nivel: "Muito Baixo", cor: "#f44336" },
        Q2: { min: 32, max: 33, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 33, max: 35, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 35, max: 36, nivel: "Aceitável", cor: "#ffc107" },
        Q5: { min: 36, max: 999, nivel: "Alto", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: { significado: "CHCM baixo - Hipocromia" },
      Q3: { significado: "CHCM ideal" },
      Q5: { significado: "CHCM elevado", causas: ["Esferocitose", "Erro laboratorial"] }
    },
    correlacoes: ["hcm", "vcm"]
  },

  rdw: {
    nome: "RDW (Red Cell Distribution Width)",
    categoria: "Hemograma",
    unidade: "%",
    referencia: { geral: { min: 11, max: 14.5 } },
    ideal: { geral: 12.5 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 11, nivel: "Muito Baixo", cor: "#4caf50" },
        Q2: { min: 11, max: 12, nivel: "Ideal", cor: "#4caf50" },
        Q3: { min: 12, max: 13.5, nivel: "Aceitável", cor: "#ffc107" },
        Q4: { min: 13.5, max: 14.5, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 14.5, max: 999, nivel: "Muito Alto", cor: "#f44336" }
      }
    },
    interpretacao: {
      Q2: { significado: "RDW ideal - Hemácias homogêneas" },
      Q4: { significado: "RDW elevado - Anisocitose moderada", causas: ["Deficiência de ferro inicial", "Deficiência de B12/folato mista"] },
      Q5: { significado: "RDW muito elevado - Anisocitose severa", causas: ["Anemia mista", "Hemólise", "Transfusão recente"] }
    },
    correlacoes: ["vcm", "ferritina"]
  },

  rdwCV: {
    nome: "RDW-CV (Coeficiente de Variação)",
    categoria: "Hemograma",
    unidade: "%",
    funcao: "Mede a variação percentual do tamanho das hemácias. Indica anisocitose - quanto maior, mais variável o tamanho das hemácias.",
    referencia: { geral: { min: 11.5, max: 14.5 } },
    ideal: { geral: 13.0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 11.0, nivel: "Muito Baixo", cor: "#4caf50" },
        Q2: { min: 11.0, max: 12.5, nivel: "Ideal", cor: "#4caf50" },
        Q3: { min: 12.5, max: 14.0, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 14.0, max: 14.5, nivel: "Limítrofe", cor: "#ffc107" },
        Q5: { min: 14.5, max: 999, nivel: "Elevado - Anisocitose", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q2: { significado: "RDW-CV ideal - Hemácias uniformes" },
      Q3: { significado: "RDW-CV normal - Boa homogeneidade" },
      Q4: {
        significado: "RDW-CV limítrofe - Leve variação no tamanho das hemácias",
        causas: ["Início de deficiência nutricional", "Anemia em evolução"],
        investigar: ["Ferritina", "Vitamina B12", "Ácido fólico", "VCM"]
      },
      Q5: {
        significado: "RDW-CV elevado - Anisocitose (hemácias de tamanhos variados)",
        causas: [
          "Deficiência de ferro (mais comum)",
          "Deficiência de B12 ou folato",
          "Anemia hemolítica",
          "Mielodisplasia",
          "Transfusão recente",
          "Recuperação de anemia"
        ],
        sintomas: ["Pode indicar múltiplas deficiências nutricionais simultâneas"],
        investigar: ["Ferritina", "Vitamina B12", "Ácido fólico", "VCM", "Reticulócitos"],
        orientacoes: [
          "Investigar causa base da anemia",
          "RDW-CV alto + VCM baixo = deficiência de ferro",
          "RDW-CV alto + VCM alto = deficiência de B12/folato",
          "RDW-CV alto + VCM normal = anemia mista ou hemólise"
        ]
      }
    },
    correlacoes: ["vcm", "ferritina", "vitaminaB12", "acidoFolico", "rdwSD"]
  },

  rdwSD: {
    nome: "RDW-SD (Desvio Padrão)",
    categoria: "Hemograma",
    unidade: "fL",
    funcao: "Mede a variação absoluta do tamanho das hemácias em femtolitros. Indica dispersão do volume eritrocitário independente do VCM.",
    referencia: { geral: { min: 37, max: 54 } },
    ideal: { geral: 45 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 37, nivel: "Baixo", cor: "#4caf50" },
        Q2: { min: 37, max: 42, nivel: "Ideal", cor: "#4caf50" },
        Q3: { min: 42, max: 50, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 50, max: 54, nivel: "Limítrofe", cor: "#ffc107" },
        Q5: { min: 54, max: 999, nivel: "Elevado - Anisocitose", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q2: { significado: "RDW-SD ideal - Excelente uniformidade das hemácias" },
      Q3: { significado: "RDW-SD normal - Boa homogeneidade eritrocitária" },
      Q4: {
        significado: "RDW-SD limítrofe - Discreta variação no volume das hemácias",
        causas: ["Início de deficiência nutricional", "Regeneração eritrocitária"],
        investigar: ["RDW-CV", "Ferritina", "Vitamina B12", "VCM"]
      },
      Q5: {
        significado: "RDW-SD elevado - Grande variação no tamanho das hemácias",
        causas: [
          "Deficiências nutricionais mistas (ferro + B12/folato)",
          "Anemia sideroblástica",
          "Talassemia intermediária",
          "Mielofibrose",
          "Recuperação de anemia severa"
        ],
        sintomas: ["Indica produção eritrocitária anormal ou desregulada"],
        investigar: ["Ferritina", "Vitamina B12", "Ácido fólico", "Eletroforese de hemoglobina", "Reticulócitos"],
        orientacoes: [
          "RDW-SD avalia variação absoluta, não relativa ao VCM",
          "Mais específico que RDW-CV em anemias mistas",
          "Correlacionar sempre com VCM e RDW-CV",
          "RDW-SD alto isolado pode indicar população mista de hemácias"
        ]
      }
    },
    correlacoes: ["rdwCV", "vcm", "ferritina", "vitaminaB12", "acidoFolico"]
  },

  // LEUCÓCITOS - DIFERENCIAL COMPLETO
  promielocitos: {
    nome: "Promielócitos",
    categoria: "Hemograma",
    unidade: "%",
    funcao: "Células precursoras de granulócitos presentes na medula óssea. Normalmente ausentes no sangue periférico. Sua presença indica alteração na maturação granulocítica ou leucemia promielocítica.",
    referencia: { geral: { min: 0, max: 0 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0, nivel: "Normal - Ausente", cor: "#4caf50" },
        Q2: { min: 0, max: 1, nivel: "Traços", cor: "#ffc107" },
        Q3: { min: 1, max: 3, nivel: "Leve Presença", cor: "#ff9800" },
        Q4: { min: 3, max: 10, nivel: "Moderada Presença", cor: "#ff5722" },
        Q5: { min: 10, max: 999, nivel: "Elevado - Crítico", cor: "#f44336" }
      }
    },
    interpretacao: {
      Q1: { significado: "Promielócitos ausentes - Normal" },
      Q2: {
        significado: "Raros promielócitos - Desvio à esquerda leve",
        causas: ["Infecção bacteriana aguda", "Resposta inflamatória intensa"],
        investigar: ["Leucograma completo", "PCR", "Hemoculturas"]
      },
      Q3: {
        significado: "Promielócitos presentes - Desvio à esquerda moderado",
        causas: ["Infecção severa", "Leucemia mieloide aguda (LMA)", "Síndrome mielodisplásica"],
        investigar: ["Mielograma", "Citometria de fluxo", "Genética molecular"],
        urgente: true
      },
      Q5: {
        significado: "Promielócitos elevados - EMERGÊNCIA HEMATOLÓGICA",
        causas: ["Leucemia promielocítica aguda (LPA-M3)", "Crise blástica em leucemia crônica"],
        riscos: ["Coagulação intravascular disseminada (CID)", "Hemorragia fulminante"],
        orientacoes: ["Encaminhar imediatamente para hematologia", "Suspeitar de LPA se >10% promielócitos + coagulopatia"],
        urgente: true
      }
    },
    correlacoes: ["mielocitos", "metamielocitos", "bastonetes", "leucocitos"]
  },

  mielocitos: {
    nome: "Mielócitos",
    categoria: "Hemograma",
    unidade: "%",
    funcao: "Células precursoras de granulócitos na medula óssea. Normalmente ausentes no sangue periférico. Presença indica resposta medular intensa ou distúrbio mieloproliferativo.",
    referencia: { geral: { min: 0, max: 0 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0, nivel: "Normal - Ausente", cor: "#4caf50" },
        Q2: { min: 0, max: 1, nivel: "Raros", cor: "#ffc107" },
        Q3: { min: 1, max: 5, nivel: "Moderada Presença", cor: "#ff9800" },
        Q4: { min: 5, max: 15, nivel: "Elevado", cor: "#ff5722" },
        Q5: { min: 15, max: 999, nivel: "Muito Elevado - Crítico", cor: "#f44336" }
      }
    },
    interpretacao: {
      Q1: { significado: "Mielócitos ausentes - Normal" },
      Q2: {
        significado: "Raros mielócitos - Desvio à esquerda leve",
        causas: ["Infecção bacteriana intensa", "Sepse inicial", "Pós-cirurgia"],
        investigar: ["Leucograma completo", "PCR", "Procalcitonina"]
      },
      Q3: {
        significado: "Mielócitos presentes - Reação leucemoide ou doença mieloproliferativa",
        causas: ["Sepse grave", "Leucemia mieloide crônica (LMC)", "Reação leucemoide"],
        investigar: ["Fosfatase alcalina leucocitária (FAL)", "BCR-ABL", "Mielograma"],
        urgente: true
      },
      Q5: {
        significado: "Mielócitos muito elevados - Suspeita de LMC",
        causas: ["Leucemia mieloide crônica", "Síndrome mieloproliferativa"],
        orientacoes: ["Solicitar pesquisa de cromossomo Philadelphia (BCR-ABL)", "Encaminhar para hematologia"],
        urgente: true
      }
    },
    correlacoes: ["promielocitos", "metamielocitos", "bastonetes", "leucocitos"]
  },

  metamielocitos: {
    nome: "Metamielócitos",
    categoria: "Hemograma",
    unidade: "%",
    funcao: "Estágio intermediário de maturação dos granulócitos. Normalmente ausentes no sangue periférico. Presença indica desvio à esquerda (resposta inflamatória/infecciosa intensa).",
    referencia: { geral: { min: 0, max: 0 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0, nivel: "Normal - Ausente", cor: "#4caf50" },
        Q2: { min: 0, max: 2, nivel: "Raros", cor: "#ffc107" },
        Q3: { min: 2, max: 5, nivel: "Moderada Presença", cor: "#ff9800" },
        Q4: { min: 5, max: 10, nivel: "Elevado", cor: "#ff5722" },
        Q5: { min: 10, max: 999, nivel: "Muito Elevado", cor: "#f44336" }
      }
    },
    interpretacao: {
      Q1: { significado: "Metamielócitos ausentes - Normal" },
      Q2: {
        significado: "Raros metamielócitos - Desvio à esquerda discreto",
        causas: ["Infecção bacteriana", "Inflamação sistêmica", "Estresse medular"],
        investigar: ["Leucócitos totais", "Bastonetes", "PCR"]
      },
      Q3: {
        significado: "Metamielócitos presentes - Desvio à esquerda acentuado",
        causas: ["Infecção grave", "Sepse", "Pneumonia bacteriana", "Apendicite", "Abscesso"],
        investigar: ["Hemoculturas", "Procalcitonina", "Foco infeccioso"],
        urgente: true
      },
      Q5: {
        significado: "Metamielócitos elevados - Reação leucemoide ou doença mieloproliferativa",
        causas: ["Sepse severa", "Leucemia mieloide crônica", "Metástase de medula óssea"],
        urgente: true
      }
    },
    correlacoes: ["bastonetes", "segmentados", "leucocitos", "proteina_c_reativa"]
  },

  bastonetes: {
    nome: "Bastonetes (Bastões)",
    categoria: "Hemograma",
    unidade: "%",
    funcao: "Neutrófilos imaturos (não-segmentados). Indicam resposta medular ativa. Aumento indica desvio à esquerda - resposta a infecção/inflamação aguda.",
    referencia: { geral: { min: 0, max: 5 } },
    ideal: { geral: 2 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 1, nivel: "Muito Baixo", cor: "#ffc107" },
        Q2: { min: 1, max: 3, nivel: "Ideal", cor: "#4caf50" },
        Q3: { min: 3, max: 5, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 5, max: 10, nivel: "Elevado - Desvio Esquerda", cor: "#ff9800" },
        Q5: { min: 10, max: 999, nivel: "Muito Elevado", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Bastonetes muito baixos",
        causas: ["Imunossupressão", "Aplasia medular", "Quimioterapia"],
        investigar: ["Leucócitos totais", "Neutrófilos totais"]
      },
      Q2: { significado: "Bastonetes em faixa ideal" },
      Q3: { significado: "Bastonetes normais" },
      Q4: {
        significado: "Bastonetes elevados - Desvio à esquerda",
        causas: ["Infecção bacteriana aguda", "Inflamação sistêmica", "Estresse", "Pós-operatório"],
        sintomas: ["Febre", "Sinais de infecção"],
        investigar: ["PCR", "Procalcitonina", "Hemoculturas", "Foco infeccioso"]
      },
      Q5: {
        significado: "Bastonetes muito elevados - Infecção severa",
        causas: ["Sepse", "Pneumonia grave", "Infecção bacteriana severa", "Reação leucemoide"],
        riscos: ["Choque séptico", "Falência de múltiplos órgãos"],
        urgente: true
      }
    },
    correlacoes: ["segmentados", "leucocitos", "metamielocitos", "proteina_c_reativa"]
  },

  segmentados: {
    nome: "Segmentados (Neutrófilos Segmentados)",
    categoria: "Hemograma",
    unidade: "%",
    funcao: "Neutrófilos maduros - principal defesa contra infecções bacterianas. Representam 40-75% dos leucócitos. Fagocitam bactérias e fungos.",
    referencia: { geral: { min: 40, max: 75 } },
    ideal: { geral: 55 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 40, nivel: "Baixo - Neutropenia Relativa", cor: "#ff9800" },
        Q2: { min: 40, max: 50, nivel: "Normal-Baixo", cor: "#ffc107" },
        Q3: { min: 50, max: 65, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 65, max: 75, nivel: "Normal-Alto", cor: "#ffc107" },
        Q5: { min: 75, max: 999, nivel: "Elevado - Neutrofilia", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Neutrófilos segmentados baixos - Neutropenia relativa",
        causas: ["Infecção viral", "Medicamentos (anti-inflamatórios, antibióticos)", "Doenças autoimunes", "Deficiência de B12/folato"],
        sintomas: ["Infecções bacterianas recorrentes", "Úlceras orais"],
        investigar: ["Leucócitos totais (valor absoluto de neutrófilos)", "Linfócitos", "Vitamina B12"]
      },
      Q2: { significado: "Segmentados no limite inferior - Normal" },
      Q3: { significado: "Neutrófilos segmentados ideais - Defesa bacteriana adequada" },
      Q4: { significado: "Segmentados no limite superior - Normal" },
      Q5: {
        significado: "Neutrófilos segmentados elevados - Neutrofilia",
        causas: ["Infecção bacteriana", "Inflamação aguda", "Estresse", "Corticoides", "Tabagismo", "Leucemia mieloide"],
        investigar: ["PCR", "Leucócitos totais", "Bastonetes (desvio à esquerda)"]
      }
    },
    correlacoes: ["leucocitos", "bastonetes", "linfocitos", "proteina_c_reativa"]
  },

  eosinofilos: {
    nome: "Eosinófilos",
    categoria: "Hemograma",
    unidade: "%",
    funcao: "Leucócitos especializados em combater parasitas e modular reações alérgicas. Aumento indica parasitoses, alergias ou doenças autoimunes.",
    referencia: { geral: { min: 1, max: 4 } },
    ideal: { geral: 2 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.5, nivel: "Muito Baixo", cor: "#ffc107" },
        Q2: { min: 0.5, max: 1, nivel: "Baixo", cor: "#ffc107" },
        Q3: { min: 1, max: 4, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 4, max: 8, nivel: "Elevado - Eosinofilia Leve", cor: "#ff9800" },
        Q5: { min: 8, max: 999, nivel: "Muito Elevado", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Eosinófilos muito baixos - Eosinopenia",
        causas: ["Estresse agudo", "Corticoides", "Infecção aguda grave", "Síndrome de Cushing"],
        investigacoes: ["Cortisol sérico", "Medicamentos em uso"]
      },
      Q3: { significado: "Eosinófilos normais" },
      Q4: {
        significado: "Eosinófilos elevados - Eosinofilia leve a moderada",
        causas: ["Parasitoses intestinais (mais comum)", "Alergias (rinite, asma, dermatite)", "Urticária", "Medicamentos"],
        sintomas: ["Prurido", "Sintomas alérgicos", "Desconforto abdominal"],
        investigar: ["EPF (parasitológico de fezes) - 3 amostras", "IgE total", "Eosinófilos absolutos"]
      },
      Q5: {
        significado: "Eosinófilos muito elevados - Eosinofilia severa",
        causas: [
          "Parasitoses (Strongyloides, Toxocara, esquistossomose, ancilostomose)",
          "Síndrome hipereosinofílica",
          "Doenças mieloproliferativas",
          "Vasculites eosinofílicas (Churg-Strauss)",
          "Medicamentos (antibióticos, anti-inflamatórios)"
        ],
        riscos: ["Lesão de órgãos por infiltração eosinofílica (coração, pulmões, SNC)"],
        investigar: ["EPF seriado", "Sorologia para parasitas", "Ecocardiograma", "TC de tórax"],
        urgente: true
      }
    },
    correlacoes: ["leucocitos", "ige_total"]
  },

  basofilos: {
    nome: "Basófilos",
    categoria: "Hemograma",
    unidade: "%",
    funcao: "Leucócitos envolvidos em reações alérgicas e inflamatórias. Liberam histamina. Normalmente raros (<1%). Aumento sugere doenças mieloproliferativas.",
    referencia: { geral: { min: 0, max: 1 } },
    ideal: { geral: 0.5 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0, nivel: "Ausentes", cor: "#4caf50" },
        Q2: { min: 0, max: 0.5, nivel: "Raros", cor: "#4caf50" },
        Q3: { min: 0.5, max: 1, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 1, max: 2, nivel: "Elevado - Basofilia Leve", cor: "#ff9800" },
        Q5: { min: 2, max: 999, nivel: "Muito Elevado - Basofilia", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: { significado: "Basófilos ausentes - Normal (são normalmente raros)" },
      Q2: { significado: "Basófilos raros - Normal" },
      Q3: { significado: "Basófilos normais" },
      Q4: {
        significado: "Basófilos elevados - Basofilia leve",
        causas: ["Hipersensibilidade", "Reações alérgicas", "Hipotireoidismo", "Policitemia vera inicial"],
        investigar: ["TSH", "Hemograma completo", "Fosfatase alcalina leucocitária"]
      },
      Q5: {
        significado: "Basófilos muito elevados - Basofilia significativa",
        causas: ["Leucemia mieloide crônica (LMC)", "Policitemia vera", "Mielofibrose", "Leucemia basofílica aguda (rara)"],
        riscos: ["Doença mieloproliferativa subjacente"],
        investigar: ["BCR-ABL (cromossomo Philadelphia)", "JAK2 V617F", "Mielograma", "Hematologia"],
        urgente: true
      }
    },
    correlacoes: ["leucocitos", "eosinofilos", "tsh"]
  },

  linfocitosReativos: {
    nome: "Linfócitos Atípicos/Reativos",
    categoria: "Hemograma",
    unidade: "%",
    funcao: "Linfócitos morfologicamente alterados em resposta a infecções virais ou estímulos antigênicos. Presença indica ativação imunológica. Comuns em mononucleose e infecções virais.",
    referencia: { geral: { min: 0, max: 0 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0, nivel: "Ausentes - Normal", cor: "#4caf50" },
        Q2: { min: 0, max: 5, nivel: "Raros - Provável Viral", cor: "#ffc107" },
        Q3: { min: 5, max: 10, nivel: "Moderada Presença", cor: "#ff9800" },
        Q4: { min: 10, max: 20, nivel: "Elevada Presença", cor: "#ff9800" },
        Q5: { min: 20, max: 999, nivel: "Muito Elevado", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: { significado: "Linfócitos atípicos ausentes - Normal" },
      Q2: {
        significado: "Raros linfócitos atípicos - Infecção viral provável",
        causas: ["Infecções virais (influenza, dengue, COVID-19)", "Vacinação recente", "Resposta imune ativa"],
        orientacoes: ["Observar evolução clínica", "Correlacionar com sintomas"]
      },
      Q3: {
        significado: "Linfócitos atípicos presentes - Infecção viral ativa",
        causas: [
          "Mononucleose infecciosa (EBV) - mais comum",
          "Citomegalovírus (CMV)",
          "Toxoplasmose aguda",
          "HIV agudo",
          "Hepatite viral"
        ],
        sintomas: ["Febre", "Adenomegalia", "Faringite", "Hepatoesplenomegalia"],
        investigar: ["Monotest", "Sorologia para EBV (VCA IgM/IgG)", "Sorologia para CMV", "Enzimas hepáticas"]
      },
      Q5: {
        significado: "Linfócitos atípicos muito elevados - Mononucleose ou leucemia",
        causas: ["Mononucleose infecciosa (EBV)", "Leucemia linfoblástica aguda (LLA)", "Linfoma"],
        riscos: ["Necessário excluir processo linfoproliferativo maligno"],
        investigar: ["Imunofenotipagem por citometria de fluxo", "Sorologia EBV completa", "Hematologia"],
        urgente: true
      }
    },
    correlacoes: ["linfocitos", "leucocitos", "monocitos"]
  },

  monocitos: {
    nome: "Monócitos",
    categoria: "Hemograma",
    unidade: "%",
    funcao: "Leucócitos que se diferenciam em macrófagos e células dendríticas. Responsáveis por fagocitose, apresentação de antígenos e resposta imune inata. Aumento indica inflamação crônica ou infecções específicas.",
    referencia: { geral: { min: 2, max: 10 } },
    ideal: { geral: 5 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 2, nivel: "Baixo - Monocitopenia", cor: "#ff9800" },
        Q2: { min: 2, max: 4, nivel: "Normal-Baixo", cor: "#ffc107" },
        Q3: { min: 4, max: 8, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 8, max: 10, nivel: "Normal-Alto", cor: "#ffc107" },
        Q5: { min: 10, max: 999, nivel: "Elevado - Monocitose", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Monócitos baixos - Monocitopenia",
        causas: ["Aplasia medular", "Leucemia aguda", "Uso de corticoides", "Quimioterapia"],
        investigar: ["Leucócitos totais", "Hemograma completo", "Imunossupressão"]
      },
      Q2: { significado: "Monócitos no limite inferior - Aceitável" },
      Q3: { significado: "Monócitos ideais - Sistema fagocítico adequado" },
      Q4: { significado: "Monócitos no limite superior - Normal" },
      Q5: {
        significado: "Monócitos elevados - Monocitose",
        causas: [
          "Infecções crônicas (tuberculose, endocardite, brucelose)",
          "Infecções virais (EBV, CMV)",
          "Doenças autoimunes (LES, artrite reumatoide)",
          "Doenças inflamatórias intestinais (Crohn, retocolite)",
          "Leucemia mielomonocítica crônica (LMMC)",
          "Recuperação de infecção/neutropenia"
        ],
        sintomas: ["Febre prolongada", "Perda de peso", "Sudorese noturna", "Adenomegalia"],
        investigar: ["VHS", "PCR", "PPD/IGRA (tuberculose)", "Sorologias", "Mielograma se >15%"],
        orientacoes: ["Monocitose persistente >3 meses requer investigação hematológica"]
      }
    },
    correlacoes: ["leucocitos", "linfocitos", "segmentados", "proteina_c_reativa"]
  },

  // ÍNDICES PLAQUETÁRIOS AVANÇADOS
  vpm: {
    nome: "VPM (Volume Plaquetário Médio)",
    categoria: "Hemograma",
    unidade: "fL",
    funcao: "Mede o tamanho médio das plaquetas. Plaquetas jovens são maiores. VPM elevado indica produção aumentada de plaquetas pela medula (turnover plaquetário alto). Útil para diferenciar causas de trombocitopenia.",
    referencia: { geral: { min: 7.5, max: 11.5 } },
    ideal: { geral: 9.5 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 7.5, nivel: "Baixo", cor: "#ff9800" },
        Q2: { min: 7.5, max: 8.5, nivel: "Normal-Baixo", cor: "#ffc107" },
        Q3: { min: 8.5, max: 10.5, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 10.5, max: 11.5, nivel: "Normal-Alto", cor: "#ffc107" },
        Q5: { min: 11.5, max: 999, nivel: "Elevado", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "VPM baixo - Plaquetas pequenas",
        causas: ["Doenças mieloproliferativas", "Wiskott-Aldrich", "Plaquetas antigas/sequestradas"],
        investigar: ["Plaquetas totais", "PDW", "Hemograma completo"]
      },
      Q2: { significado: "VPM no limite inferior - Normal" },
      Q3: { significado: "VPM ideal - Tamanho plaquetário adequado" },
      Q4: { significado: "VPM no limite superior - Normal" },
      Q5: {
        significado: "VPM elevado - Plaquetas jovens/grandes (turnover aumentado)",
        causas: [
          "Destruição periférica aumentada (PTI - púrpura trombocitopênica imune)",
          "Consumo plaquetário (CID, trombose)",
          "Recuperação de trombocitopenia",
          "Inflamação sistêmica",
          "Diabetes mellitus",
          "Tabagismo",
          "Hipotireoidismo"
        ],
        sintomas: ["Se plaquetas baixas: equimoses, petéquias, sangramentos"],
        investigar: ["Plaquetas totais", "PDW", "PCT", "IPF", "Tempo de sangramento"],
        orientacoes: [
          "VPM alto + plaquetas baixas = destruição/consumo periférico (PTI, CID)",
          "VPM alto + plaquetas normais/altas = ativação plaquetária (risco CV aumentado)"
        ]
      }
    },
    correlacoes: ["plaquetas", "pdw", "pct", "ipf"]
  },

  pdw: {
    nome: "PDW (Platelet Distribution Width)",
    categoria: "Hemograma",
    unidade: "%",
    funcao: "Mede a variação no tamanho das plaquetas (anisocitose plaquetária). PDW elevado indica plaquetas de tamanhos heterogêneos - sugere produção e consumo simultâneos ou distúrbios mieloproliferativos.",
    referencia: { geral: { min: 9, max: 17 } },
    ideal: { geral: 13 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 9, nivel: "Baixo - Homogêneo", cor: "#4caf50" },
        Q2: { min: 9, max: 12, nivel: "Ideal", cor: "#4caf50" },
        Q3: { min: 12, max: 15, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 15, max: 17, nivel: "Limítrofe", cor: "#ffc107" },
        Q5: { min: 17, max: 999, nivel: "Elevado - Anisocitose Plaquetária", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q1: { significado: "PDW baixo - Plaquetas uniformes" },
      Q2: { significado: "PDW ideal - Distribuição plaquetária homogênea" },
      Q3: { significado: "PDW normal" },
      Q4: {
        significado: "PDW limítrofe - Leve heterogeneidade plaquetária",
        causas: ["Inflamação", "Resposta medular ativa"],
        investigar: ["VPM", "Plaquetas totais", "PCR"]
      },
      Q5: {
        significado: "PDW elevado - Anisocitose plaquetária (plaquetas de tamanhos variados)",
        causas: [
          "Púrpura trombocitopênica imune (PTI)",
          "Coagulação intravascular disseminada (CID)",
          "Síndrome antifosfolípide",
          "Pré-eclâmpsia/HELLP",
          "Leucemia mieloide crônica",
          "Trombocitemia essencial",
          "Sepse",
          "Anemia megaloblástica"
        ],
        sintomas: ["Pode indicar ativação e consumo plaquetário simultâneos"],
        investigar: ["VPM", "IPF", "D-dímero", "Fibrinogênio", "Tempo de protrombina"],
        orientacoes: [
          "PDW alto + VPM alto = destruição/consumo aumentado (PTI, CID, sepse)",
          "PDW alto + plaquetas altas = doença mieloproliferativa (trombocitemia essencial)"
        ]
      }
    },
    correlacoes: ["vpm", "plaquetas", "ipf", "ddimero"]
  },

  pct: {
    nome: "PCT (Plaquetócrito)",
    categoria: "Hemograma",
    unidade: "%",
    funcao: "Percentual do volume sanguíneo ocupado pelas plaquetas (equivalente ao hematócrito para hemácias). Reflete a massa plaquetária total. Útil para avaliar risco trombótico e hemorrágico.",
    referencia: { geral: { min: 0.15, max: 0.40 } },
    ideal: { geral: 0.25 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.15, nivel: "Baixo - Risco Hemorrágico", cor: "#ff9800" },
        Q2: { min: 0.15, max: 0.20, nivel: "Normal-Baixo", cor: "#ffc107" },
        Q3: { min: 0.20, max: 0.30, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 0.30, max: 0.40, nivel: "Normal-Alto", cor: "#ffc107" },
        Q5: { min: 0.40, max: 999, nivel: "Elevado - Risco Trombótico", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Plaquetócrito baixo - Massa plaquetária reduzida",
        causas: ["Trombocitopenia", "Plaquetas pequenas (baixo VPM)", "Aplasia medular"],
        riscos: ["Risco hemorrágico aumentado"],
        investigar: ["Plaquetas totais", "VPM", "Tempo de sangramento"],
        urgente: true
      },
      Q2: { significado: "PCT no limite inferior - Aceitável" },
      Q3: { significado: "Plaquetócrito ideal - Massa plaquetária adequada" },
      Q4: { significado: "PCT no limite superior - Normal" },
      Q5: {
        significado: "Plaquetócrito elevado - Massa plaquetária aumentada",
        causas: ["Trombocitose", "Plaquetas grandes (VPM alto)", "Doenças mieloproliferativas", "Inflamação crônica"],
        riscos: ["Risco trombótico aumentado", "Hiperviscosidade sanguínea", "Eventos cardiovasculares"],
        investigar: ["Plaquetas totais", "VPM", "JAK2 V617F", "Marcadores inflamatórios"],
        orientacoes: ["PCT >0.50% aumenta significativamente o risco de trombose"]
      }
    },
    correlacoes: ["plaquetas", "vpm", "ddimero", "fibrinogenio"]
  },

  ipf: {
    nome: "IPF (Fração de Plaquetas Imaturas)",
    categoria: "Hemograma",
    unidade: "%",
    funcao: "Percentual de plaquetas jovens recém-liberadas pela medula óssea (equivalente aos reticulócitos para hemácias). Marcador de produção plaquetária medular. IPF alto indica resposta medular ativa. Útil para diferenciar trombocitopenias.",
    referencia: { geral: { min: 1, max: 6 } },
    ideal: { geral: 3 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 1, nivel: "Muito Baixo - Hipoproducao", cor: "#ff5722" },
        Q2: { min: 1, max: 2.5, nivel: "Baixo", cor: "#ffc107" },
        Q3: { min: 2.5, max: 5, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 5, max: 6, nivel: "Normal-Alto", cor: "#ffc107" },
        Q5: { min: 6, max: 999, nivel: "Elevado - Hiperproducao", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "IPF muito baixo - Hipoprodução medular de plaquetas",
        causas: ["Aplasia medular", "Anemia aplásica", "Mielodisplasia", "Infiltração medular (leucemia, metástase)", "Quimioterapia/radioterapia"],
        riscos: ["Plaquetopenia central - resposta insuficiente a sangramentos"],
        investigar: ["Mielograma", "Hemograma completo", "Reticulócitos", "Biopsia de medula"],
        orientacoes: ["IPF baixo + plaquetas baixas = causa central (medular) - GRAVE"],
        urgente: true
      },
      Q2: {
        significado: "IPF baixo - Produção plaquetária reduzida",
        causas: ["Déficit de B12/folato", "Hipotireoidismo", "Medicamentos mielossupressores"],
        investigar: ["Vitamina B12", "Ácido fólico", "TSH"]
      },
      Q3: { significado: "IPF ideal - Produção plaquetária medular adequada" },
      Q4: { significado: "IPF no limite superior - Turnover plaquetário ativo" },
      Q5: {
        significado: "IPF elevado - Hiperprodução medular de plaquetas (turnover aumentado)",
        causas: [
          "Destruição periférica aumentada - PTI (púrpura trombocitopênica imune)",
          "Consumo plaquetário - CID, microangiopatias (STH, PTT)",
          "Sequestro esplênico (hiperesplenismo)",
          "Sangramento ativo",
          "Recuperação pós-quimioterapia",
          "Trombocitose reativa (inflamação, infecção, pós-operatório)"
        ],
        sintomas: ["Se plaquetas baixas: equimoses, petéquias, sangramentos"],
        investigar: ["Plaquetas totais", "VPM", "PDW", "D-dímero", "Anticorpos antiplaquetários"],
        orientacoes: [
          "IPF alto + plaquetas baixas = destruição periférica (PTI, CID) - medula tentando compensar",
          "IPF alto + plaquetas normais/altas = resposta a inflamação/infecção ou recuperação medular",
          "IPF diferencia causa periférica (alto) de central/medular (baixo)"
        ]
      }
    },
    correlacoes: ["plaquetas", "vpm", "pdw", "pct", "reticulocitos"]
  },

  // COAGULAÇÃO
  ddimero: {
    nome: "D-Dímero",
    categoria: "Coagulação",
    unidade: "ng/mL",
    referencia: { geral: { min: 0, max: 500 } },
    ideal: { geral: 250 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 200, nivel: "Ideal", cor: "#4caf50" },
        Q2: { min: 200, max: 500, nivel: "Normal", cor: "#4caf50" },
        Q3: { min: 500, max: 1000, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 1000, max: 2000, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 2000, max: 999999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "D-Dímero ideal - Sem atividade trombótica significativa" },
      Q2: { significado: "D-Dímero normal" },
      Q3: {
        significado: "D-Dímero elevado - Possível atividade trombótica",
        causas: ["Trombose venosa profunda", "Embolia pulmonar", "Inflamação sistêmica", "Pós-operatório", "Gravidez", "Idade avançada"],
        investigar: ["Ultrassom vascular", "Angiotomografia", "Proteína C reativa", "Fibrinogênio"]
      },
      Q4: {
        significado: "D-Dímero muito elevado",
        causas: ["TVP/TEP provável", "CID (coagulação intravascular disseminada)", "Sepse", "Trauma grave"],
        urgente: true
      },
      Q5: {
        significado: "D-Dímero crítico - Emergência médica",
        riscos: ["Coagulação intravascular disseminada", "Trombose severa"],
        urgente: true
      }
    },
    correlacoes: ["fibrinogenio", "plaquetas", "proteina_c_reativa"]
  },

  fibrinogenio: {
    nome: "Fibrinogênio",
    categoria: "Coagulação",
    unidade: "mg/dL",
    referencia: { geral: { min: 200, max: 400 } },
    ideal: { geral: 300 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 200, nivel: "Baixo", cor: "#ff9800" },
        Q2: { min: 200, max: 250, nivel: "Adequado", cor: "#ffc107" },
        Q3: { min: 250, max: 350, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 350, max: 400, nivel: "Normal-Alto", cor: "#ffc107" },
        Q5: { min: 400, max: 999999, nivel: "Elevado", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Fibrinogênio baixo - Risco hemorrágico",
        causas: ["Disfunção hepática", "CID", "Hipofibrinogenemia congênita", "Desnutrição proteica"],
        riscos: ["Sangramento", "Coagulopatia"]
      },
      Q3: { significado: "Fibrinogênio ideal" },
      Q5: {
        significado: "Fibrinogênio elevado - Marcador inflamatório",
        causas: ["Inflamação aguda/crônica", "Infecção", "Estresse", "Tabagismo", "Diabetes"],
        riscos: ["Aumento da viscosidade sanguínea", "Risco cardiovascular elevado"],
        investigar: ["Proteína C reativa", "VHS", "D-dímero"]
      }
    },
    correlacoes: ["ddimero", "proteina_c_reativa", "plaquetas"]
  },

  // VITAMINAS DO COMPLEXO B
  vitaminaB1: {
    nome: "Vitamina B1 (Tiamina)",
    categoria: "Vitaminas",
    unidade: "ng/mL",
    referencia: { geral: { min: 2.5, max: 7.5 } },
    ideal: { geral: 5 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 2.5, nivel: "Deficiente", cor: "#f44336" },
        Q2: { min: 2.5, max: 3.5, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 3.5, max: 6.5, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 6.5, max: 7.5, nivel: "Adequado", cor: "#4caf50" },
        Q5: { min: 7.5, max: 999, nivel: "Alto", cor: "#ffc107" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Deficiência de Vitamina B1",
        causas: ["Alcoolismo", "Má absorção", "Dieta pobre", "Diabetes", "Diuréticos"],
        sintomas: ["Fadiga", "Fraqueza muscular", "Confusão mental", "Neuropatia periférica", "Beribéri"],
        investigar: ["Glicemia", "Função hepática", "Magnésio"]
      },
      Q2: { significado: "B1 abaixo do ideal", orientacoes: ["Aumentar consumo de cereais integrais, leguminosas"] },
      Q3: { significado: "Vitamina B1 ideal" },
      Q5: { significado: "B1 elevada (geralmente por suplementação)" }
    },
    correlacoes: ["glicose", "magnesio"]
  },

  vitaminaB6: {
    nome: "Vitamina B6 (Piridoxina)",
    categoria: "Vitaminas",
    unidade: "ng/mL",
    referencia: { geral: { min: 5, max: 50 } },
    ideal: { geral: 25 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 5, nivel: "Deficiente", cor: "#f44336" },
        Q2: { min: 5, max: 15, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 15, max: 35, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 35, max: 50, nivel: "Adequado", cor: "#4caf50" },
        Q5: { min: 50, max: 999, nivel: "Alto", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Deficiência de Vitamina B6",
        causas: ["Má absorção", "Alcoolismo", "Uso de medicamentos", "Dieta inadequada"],
        sintomas: ["Dermatite", "Glossite", "Neuropatia", "Anemia", "Confusão mental", "Depressão"],
        investigar: ["Homocisteína", "Vitamina B12", "Ácido fólico"]
      },
      Q3: { significado: "Vitamina B6 ideal" },
      Q5: {
        significado: "B6 muito elevada",
        causas: ["Suplementação excessiva"],
        riscos: ["Neuropatia sensorial em doses muito altas (>200mg/dia)"]
      }
    },
    correlacoes: ["vitaminaB12", "acidoFolico", "homocisteina"]
  },

  vitaminaB12: {
    nome: "Vitamina B12 (Cobalamina)",
    categoria: "Vitaminas",
    unidade: "pg/mL",
    referencia: { geral: { min: 200, max: 900 } },
    ideal: { geral: 500 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 200, nivel: "Deficiente", cor: "#f44336" },
        Q2: { min: 200, max: 350, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 350, max: 700, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 700, max: 900, nivel: "Adequado", cor: "#4caf50" },
        Q5: { min: 900, max: 999999, nivel: "Alto", cor: "#ffc107" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Deficiência de Vitamina B12",
        causas: ["Anemia perniciosa", "Vegetarianismo/veganismo", "Má absorção intestinal", "Gastrite atrófica", "Uso de metformina/IBP"],
        sintomas: ["Fadiga", "Fraqueza", "Parestesias", "Glossite", "Déficit cognitivo", "Depressão", "Anemia megaloblástica"],
        investigar: ["Homocisteína", "Ácido metilmalônico", "Ácido fólico", "Hemograma (VCM)"]
      },
      Q2: {
        significado: "B12 abaixo do ideal funcional",
        orientacoes: ["Suplementar B12 (metilcobalamina 1000-2000mcg/dia)", "Investigar absorção intestinal"]
      },
      Q3: { significado: "Vitamina B12 ideal" },
      Q5: { significado: "B12 elevada", causas: ["Suplementação", "Disfunção hepática", "Policitemia"] }
    },
    correlacoes: ["acidoFolico", "homocisteina", "vcm", "hemoglobina"]
  },

  acidoFolico: {
    nome: "Ácido Fólico (Vitamina B9)",
    categoria: "Vitaminas",
    unidade: "ng/mL",
    referencia: { geral: { min: 3, max: 20 } },
    ideal: { geral: 10 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 3, nivel: "Deficiente", cor: "#f44336" },
        Q2: { min: 3, max: 6, nivel: "Baixo", cor: "#ff9800" },
        Q3: { min: 6, max: 15, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 15, max: 20, nivel: "Adequado", cor: "#4caf50" },
        Q5: { min: 20, max: 999, nivel: "Alto", cor: "#ffc107" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Deficiência de Ácido Fólico",
        causas: ["Dieta pobre em vegetais", "Má absorção", "Alcoolismo", "Uso de metotrexato", "Gravidez"],
        sintomas: ["Anemia megaloblástica", "Fadiga", "Glossite", "Diarreia", "Defeitos do tubo neural (gestantes)"],
        investigar: ["Vitamina B12", "Homocisteína", "Hemograma"]
      },
      Q2: { significado: "Ácido fólico abaixo do ideal", orientacoes: ["Aumentar vegetais verdes-escuros", "Suplementar metilfolato 400-800mcg"] },
      Q3: { significado: "Ácido fólico ideal" },
      Q5: { significado: "Ácido fólico elevado (geralmente por suplementação)" }
    },
    correlacoes: ["vitaminaB12", "homocisteina", "vcm"]
  },

  acidoMetilmalonico: {
    nome: "Ácido Metilmalônico (MMA)",
    categoria: "Vitaminas",
    unidade: "nmol/L",
    funcao: "Metabólito que se acumula na deficiência de vitamina B12. Marcador mais sensível e específico que a dosagem de B12 sérica. Essencial para detectar deficiência funcional de B12.",
    referencia: { geral: { min: 0, max: 270 } },
    ideal: { geral: 150 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 150, nivel: "Ótimo", cor: "#4caf50" },
        Q2: { min: 150, max: 270, nivel: "Normal", cor: "#4caf50" },
        Q3: { min: 270, max: 400, nivel: "Limítrofe - Deficiência Funcional", cor: "#ffc107" },
        Q4: { min: 400, max: 700, nivel: "Elevado - Deficiência B12", cor: "#ff9800" },
        Q5: { min: 700, max: 999999, nivel: "Muito Alto - Deficiência Severa", cor: "#f44336" }
      }
    },
    interpretacao: {
      Q1: { 
        significado: "Ácido metilmalônico ótimo - Metabolismo de B12 adequado",
        orientacoes: ["Status de B12 excelente", "Manter ingestão regular de B12"]
      },
      Q2: { 
        significado: "Ácido metilmalônico normal - Nível aceitável de B12" 
      },
      Q3: {
        significado: "Ácido metilmalônico limítrofe - Deficiência funcional de B12 inicial",
        causas: [
          "Deficiência subclínica de B12 (mesmo com B12 sérica normal)",
          "Má absorção intestinal inicial",
          "Uso crônico de IBP ou metformina",
          "Gastrite atrófica inicial",
          "Vegetarianismo/veganismo"
        ],
        sintomas: ["Fadiga leve", "Dificuldade de concentração", "Neuropatia inicial"],
        orientacoes: [
          "Suplementar B12 metilcobalamina 1000-2000 mcg/dia",
          "Considerar B12 sublingual para melhor absorção",
          "Reavaliar em 3 meses"
        ],
        investigar: ["Vitamina B12 sérica", "Homocisteína", "Hemograma (VCM)", "Anticorpo anti-fator intrínseco"]
      },
      Q4: {
        significado: "Ácido metilmalônico elevado - Deficiência de B12 estabelecida",
        causas: [
          "Anemia perniciosa (falta de fator intrínseco)",
          "Vegetarianismo/veganismo sem suplementação",
          "Má absorção intestinal (doença celíaca, Crohn)",
          "Gastrite atrófica",
          "Uso prolongado de IBP ou metformina",
          "Gastrectomia",
          "Infecção por H. pylori"
        ],
        sintomas: [
          "Fadiga intensa",
          "Parestesias (formigamento em mãos/pés)",
          "Dificuldade de equilíbrio",
          "Déficit de memória",
          "Glossite (língua lisa e dolorida)",
          "Anemia megaloblástica"
        ],
        riscos: [
          "Neuropatia periférica irreversível",
          "Degeneração combinada subaguda da medula (se não tratada)",
          "Demência reversível",
          "Anemia severa"
        ],
        orientacoes: [
          "B12 injetável (cianocobalamina 1000 mcg IM) - 1x/semana por 4-8 semanas, depois mensal",
          "Ou B12 sublingual 2000-5000 mcg/dia",
          "Reavaliar MMA e B12 em 2-3 meses",
          "Investigar causa da má absorção"
        ],
        investigar: ["Vitamina B12", "Homocisteína", "Hemograma", "Anti-fator intrínseco", "Anti-célula parietal", "Endoscopia digestiva alta"]
      },
      Q5: {
        significado: "Ácido metilmalônico muito alto - Deficiência severa de B12 (URGENTE)",
        causas: [
          "Anemia perniciosa não tratada",
          "Deficiência prolongada em veganos",
          "Gastrectomia total",
          "Síndrome de má absorção grave"
        ],
        sintomas: [
          "Neuropatia periférica severa",
          "Ataxia (dificuldade para caminhar)",
          "Demência reversível",
          "Psicose megaloblástica",
          "Anemia severa"
        ],
        riscos: [
          "Danos neurológicos irreversíveis",
          "Degeneração combinada subaguda da medula espinhal",
          "Insuficiência cardíaca por anemia severa"
        ],
        orientacoes: [
          "URGENTE: Iniciar B12 injetável imediatamente",
          "Cianocobalamina 1000 mcg IM diariamente por 1 semana",
          "Depois 1000 mcg IM 1-2x/semana por 1 mês",
          "Manutenção: 1000 mcg IM mensal vitalício",
          "Encaminhar ao hematologista"
        ],
        investigar: ["Vitamina B12", "Homocisteína", "Hemograma completo", "Mielograma se anemia severa", "Neurologia se sintomas neurológicos"],
        urgente: true
      }
    },
    correlacoes: ["vitaminaB12", "acidoFolico", "homocisteina", "vcm", "hemoglobina"]
  },

  // LIPOPROTEÍNAS
  apoA1: {
    nome: "Apolipoproteína A1 (Apo A1)",
    categoria: "Perfil Lipídico Avançado",
    unidade: "mg/dL",
    referencia: {
      mulher: { min: 120, max: 180 },
      homem: { min: 110, max: 170 }
    },
    ideal: {
      mulher: 150,
      homem: 140
    },
    quintis: {
      mulher: {
        Q1: { min: 0, max: 120, nivel: "Baixo", cor: "#ff9800" },
        Q2: { min: 120, max: 135, nivel: "Adequado", cor: "#ffc107" },
        Q3: { min: 135, max: 165, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 165, max: 180, nivel: "Ótimo", cor: "#4caf50" },
        Q5: { min: 180, max: 999, nivel: "Muito Alto", cor: "#2196f3" }
      },
      homem: {
        Q1: { min: 0, max: 110, nivel: "Baixo", cor: "#ff9800" },
        Q2: { min: 110, max: 125, nivel: "Adequado", cor: "#ffc107" },
        Q3: { min: 125, max: 155, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 155, max: 170, nivel: "Ótimo", cor: "#4caf50" },
        Q5: { min: 170, max: 999, nivel: "Muito Alto", cor: "#2196f3" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Apo A1 baixa - Risco cardiovascular aumentado",
        causas: ["Síndrome metabólica", "Diabetes", "Tabagismo", "Sedentarismo", "Dieta inadequada"],
        riscos: ["Doença cardiovascular", "Aterosclerose"],
        investigar: ["HDL", "Triglicerídeos", "Apo B", "Glicemia", "Insulina"]
      },
      Q3: { significado: "Apo A1 ideal - Proteção cardiovascular adequada" },
      Q5: { significado: "Apo A1 muito alta - Excelente proteção cardiovascular" }
    },
    correlacoes: ["hdl", "apoB", "triglicerideos"]
  },

  apoB: {
    nome: "Apolipoproteína B (Apo B)",
    categoria: "Perfil Lipídico Avançado",
    unidade: "mg/dL",
    referencia: { geral: { min: 0, max: 100 } },
    ideal: { geral: 80 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 60, nivel: "Ideal", cor: "#4caf50" },
        Q2: { min: 60, max: 80, nivel: "Adequado", cor: "#4caf50" },
        Q3: { min: 80, max: 100, nivel: "Limítrofe", cor: "#ffc107" },
        Q4: { min: 100, max: 130, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 130, max: 999, nivel: "Muito Alto", cor: "#f44336" }
      }
    },
    interpretacao: {
      Q1: { significado: "Apo B ideal - Risco cardiovascular baixo" },
      Q2: { significado: "Apo B adequado" },
      Q3: {
        significado: "Apo B limítrofe",
        orientacoes: ["Otimizar dieta", "Aumentar atividade física", "Controlar peso"]
      },
      Q4: {
        significado: "Apo B elevada - Risco cardiovascular aumentado",
        causas: ["Síndrome metabólica", "Resistência insulínica", "Dieta rica em carboidratos refinados"],
        investigar: ["LDL", "Triglicerídeos", "Glicemia", "Insulina", "Apo A1"]
      },
      Q5: {
        significado: "Apo B muito elevada - Alto risco cardiovascular",
        riscos: ["Aterosclerose acelerada", "Doença coronariana"],
        urgente: true
      }
    },
    correlacoes: ["ldl", "apoA1", "triglicerideos", "glicose"]
  },

  // PROTEÍNA C E COAGULAÇÃO
  proteinaCreativa: {
    nome: "Proteína C Reativa (PCR)",
    categoria: "Inflamatórios",
    unidade: "mg/L",
    referencia: { geral: { min: 0, max: 3 } },
    ideal: { geral: 1 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 1, nivel: "Ideal", cor: "#4caf50" },
        Q2: { min: 1, max: 3, nivel: "Normal", cor: "#4caf50" },
        Q3: { min: 3, max: 10, nivel: "Elevado", cor: "#ff9800" },
        Q4: { min: 10, max: 50, nivel: "Muito Elevado", cor: "#ff5722" },
        Q5: { min: 50, max: 999999, nivel: "Crítico", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "PCR ideal - Sem inflamação sistêmica" },
      Q2: { significado: "PCR normal" },
      Q3: {
        significado: "PCR elevada - Inflamação de baixo grau",
        causas: ["Síndrome metabólica", "Obesidade", "Sedentarismo", "Dieta pró-inflamatória", "Estresse crônico"],
        investigar: ["Hemograma", "VHS", "Fibrinogênio", "Glicemia", "Perfil lipídico"]
      },
      Q4: {
        significado: "PCR muito elevada - Inflamação significativa",
        causas: ["Infecção", "Doença autoimune", "Infarto do miocárdio", "Trauma"],
        urgente: true
      },
      Q5: {
        significado: "PCR crítica - Inflamação severa",
        causas: ["Sepse", "Infecção grave", "Pancreatite aguda"],
        urgente: true
      }
    },
    correlacoes: ["vhs", "fibrinogenio", "ferritina"]
  },

  // EXAMES DE URINA
  densidadeUrinaria: {
    nome: "Densidade Urinária",
    categoria: "Urinálise",
    unidade: "",
    referencia: { geral: { min: 1.010, max: 1.030 } },
    ideal: { geral: 1.020 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 1.010, nivel: "Muito Baixa", cor: "#ff9800" },
        Q2: { min: 1.010, max: 1.015, nivel: "Baixa", cor: "#ffc107" },
        Q3: { min: 1.015, max: 1.025, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 1.025, max: 1.030, nivel: "Elevada", cor: "#ffc107" },
        Q5: { min: 1.030, max: 9, nivel: "Muito Alta", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Densidade muito baixa - Urina diluída",
        causas: ["Diabetes insipidus", "Ingestão excessiva de líquidos", "Uso de diuréticos", "Insuficiência renal"],
        investigar: ["Glicemia", "Função renal", "Eletrólitos"]
      },
      Q3: { significado: "Densidade ideal - Hidratação adequada" },
      Q5: {
        significado: "Densidade muito alta - Urina concentrada",
        causas: ["Desidratação", "Febre", "Vômitos/diarreia", "Insuficiência cardíaca"],
        orientacoes: ["Aumentar ingestão hídrica"]
      }
    },
    correlacoes: ["creatinina", "ureia"]
  },

  phUrinario: {
    nome: "pH Urinário",
    categoria: "Urinálise",
    unidade: "",
    referencia: { geral: { min: 4.5, max: 8.0 } },
    ideal: { geral: 6.0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 5.0, nivel: "Muito Ácido", cor: "#ff9800" },
        Q2: { min: 5.0, max: 5.5, nivel: "Ácido", cor: "#ffc107" },
        Q3: { min: 5.5, max: 6.5, nivel: "Ideal", cor: "#4caf50" },
        Q4: { min: 6.5, max: 7.5, nivel: "Alcalino", cor: "#ffc107" },
        Q5: { min: 7.5, max: 14, nivel: "Muito Alcalino", cor: "#ff9800" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "pH muito ácido",
        causas: ["Dieta rica em proteínas", "Acidose metabólica", "Diabetes descompensado", "Febre"],
        riscos: ["Cálculos de ácido úrico", "Gota"]
      },
      Q3: { significado: "pH ideal" },
      Q5: {
        significado: "pH muito alcalino",
        causas: ["Infecção urinária por bactérias produtoras de urease", "Dieta vegetariana", "Vômitos prolongados"],
        riscos: ["Cálculos de estruvita", "Infecção"]
      }
    },
    correlacoes: ["leucocitosUrina", "nitritoUrina"]
  },

  proteinuriaUrina: {
    nome: "Proteína na Urina (Proteinúria)",
    categoria: "Urinálise",
    unidade: "mg/dL",
    referencia: { geral: { min: 0, max: 10 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 10, nivel: "Ausente", cor: "#4caf50" },
        Q2: { min: 10, max: 30, nivel: "Traços", cor: "#ffc107" },
        Q3: { min: 30, max: 100, nivel: "Leve", cor: "#ff9800" },
        Q4: { min: 100, max: 300, nivel: "Moderada", cor: "#ff5722" },
        Q5: { min: 300, max: 999999, nivel: "Severa", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Sem proteinúria" },
      Q2: { significado: "Traços de proteína (pode ser normal após exercício)" },
      Q3: {
        significado: "Proteinúria leve",
        causas: ["Lesão glomerular inicial", "Diabetes", "Hipertensão", "Desidratação"],
        investigar: ["Creatinina", "Ureia", "Glicemia", "Albumina"]
      },
      Q4: {
        significado: "Proteinúria moderada",
        causas: ["Doença renal", "Síndrome nefrótica", "Pré-eclâmpsia (gestantes)"],
        urgente: true
      },
      Q5: {
        significado: "Proteinúria severa - Lesão renal significativa",
        riscos: ["Insuficiência renal", "Síndrome nefrótica"],
        urgente: true
      }
    },
    correlacoes: ["creatinina", "ureia", "albumina"]
  },

  glicoseUrina: {
    nome: "Glicose na Urina (Glicosúria)",
    categoria: "Urinálise",
    unidade: "mg/dL",
    referencia: { geral: { min: 0, max: 15 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 15, nivel: "Ausente", cor: "#4caf50" },
        Q2: { min: 15, max: 50, nivel: "Traços", cor: "#ffc107" },
        Q3: { min: 50, max: 100, nivel: "Presente +", cor: "#ff9800" },
        Q4: { min: 100, max: 300, nivel: "Presente ++", cor: "#ff5722" },
        Q5: { min: 300, max: 999999, nivel: "Presente +++", cor: "#d32f2f" }
      }
    },
    interpretacao: {
      Q1: { significado: "Sem glicosúria" },
      Q2: { significado: "Traços de glicose (pode ocorrer após refeição rica em carboidratos)" },
      Q3: {
        significado: "Glicosúria presente",
        causas: ["Diabetes mellitus descompensado", "Diabetes gestacional", "Síndrome de Fanconi"],
        investigar: ["Glicemia de jejum", "Hemoglobina glicada", "Insulina"]
      },
      Q4: {
        significado: "Glicosúria significativa",
        causas: ["Hiperglicemia severa"],
        urgente: true
      },
      Q5: {
        significado: "Glicosúria severa",
        causas: ["Diabetes descompensado", "Cetoacidose diabética"],
        urgente: true
      }
    },
    correlacoes: ["glicose", "hemoglobinaGlicada", "cetonas"]
  },

  nitritoUrina: {
    nome: "Nitrito Urinário (0=Negativo | 1=Positivo)",
    categoria: "Urinálise",
    unidade: "escala",
    funcao: "Triagem de bacteriúria por bactérias nitrato-redutoras. Registrar 0 para negativo e 1 para positivo.",
    referencia: { geral: { min: 0, max: 0 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.5, nivel: "Negativo (Ideal)", cor: "#4caf50" },
        Q5: { min: 0.5, max: 99, nivel: "Positivo", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: { significado: "Nitrito negativo - Sem evidência de bacteriúria por nitrato-redutoras" },
      Q5: {
        significado: "Nitrito positivo - Suspeita de infecção urinária",
        causas: ["Bacteriúria significativa", "Infecção urinária baixa"],
        investigar: ["EAS completo", "Urocultura com antibiograma"],
        urgente: true
      }
    },
    correlacoes: ["piocitosUrina", "floraBacterianaUrina", "hemaciasUrinaSedimento"]
  },

  floraBacterianaUrina: {
    nome: "Flora Bacteriana Urinária (0=Normal | 1=Aumentada)",
    categoria: "Urinálise",
    unidade: "escala",
    funcao: "Registrar 0 para flora normal e 1 para flora aumentada no sedimento urinário.",
    referencia: { geral: { min: 0, max: 0 } },
    ideal: { geral: 0 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 0.5, nivel: "Normal", cor: "#4caf50" },
        Q5: { min: 0.5, max: 99, nivel: "Aumentada", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: { significado: "Flora bacteriana em padrão normal" },
      Q5: {
        significado: "Flora bacteriana aumentada - provável bacteriúria",
        causas: ["Infecção urinária", "Contaminação da coleta", "Disbiose urogenital"],
        investigar: ["Repetir coleta com técnica correta", "Urocultura com antibiograma"],
        urgente: true
      }
    },
    correlacoes: ["nitritoUrina", "piocitosUrina"]
  },

  piocitosUrina: {
    nome: "Piócitos no Sedimento Urinário",
    categoria: "Urinálise",
    unidade: "/c",
    referencia: { geral: { min: 0, max: 5 } },
    ideal: { geral: 2 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 5, nivel: "Normal", cor: "#4caf50" },
        Q3: { min: 5, max: 10, nivel: "Limítrofe", cor: "#ffc107" },
        Q5: { min: 10, max: 9999, nivel: "Elevado", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: { significado: "Piócitos dentro da faixa esperada" },
      Q3: {
        significado: "Leucocitúria limítrofe",
        investigar: ["Sintomas urinários", "Higiene da coleta", "Repetir EAS"]
      },
      Q5: {
        significado: "Leucocitúria elevada - inflamação/infecção urinária provável",
        causas: ["Cistite", "Pielonefrite", "Uretrite"],
        investigar: ["Urocultura", "Antibiograma", "Avaliação clínica"],
        urgente: true
      }
    },
    correlacoes: ["nitritoUrina", "floraBacterianaUrina", "hemaciasUrinaSedimento"]
  },

  hemaciasUrinaSedimento: {
    nome: "Hemácias no Sedimento Urinário",
    categoria: "Urinálise",
    unidade: "/c",
    referencia: { geral: { min: 0, max: 3 } },
    ideal: { geral: 1 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 3, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 3, max: 10, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 10, max: 9999, nivel: "Muito Elevado", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: { significado: "Sem hematúria significativa" },
      Q4: {
        significado: "Hematúria discreta",
        causas: ["Irritação urinária", "Litíase inicial", "Infecção"],
        investigar: ["EAS de controle", "Ultrassom se persistente"]
      },
      Q5: {
        significado: "Hematúria importante",
        causas: ["Litíase urinária", "Infecção urinária", "Lesão glomerular"],
        investigar: ["Urocultura", "Creatinina", "USG vias urinárias"],
        urgente: true
      }
    },
    correlacoes: ["piocitosUrina", "proteinuriaUrina"]
  },

  celulasEpiteliaisUrina: {
    nome: "Células Epiteliais no Sedimento Urinário",
    categoria: "Urinálise",
    unidade: "/c",
    referencia: { geral: { min: 0, max: 2 } },
    ideal: { geral: 1 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 2, nivel: "Normal", cor: "#4caf50" },
        Q4: { min: 2, max: 5, nivel: "Elevado", cor: "#ff9800" },
        Q5: { min: 5, max: 9999, nivel: "Muito Elevado", cor: "#ff5722" }
      }
    },
    interpretacao: {
      Q1: { significado: "Células epiteliais em faixa esperada" },
      Q4: {
        significado: "Aumento discreto de células epiteliais",
        causas: ["Descamação aumentada", "Coleta com possível contaminação"],
        investigar: ["Repetir coleta com higiene adequada"]
      },
      Q5: {
        significado: "Aumento importante de células epiteliais",
        causas: ["Inflamação urotelial", "Contaminação significativa da amostra"],
        investigar: ["Nova coleta", "Urocultura", "Avaliação clínica"]
      }
    },
    correlacoes: ["floraBacterianaUrina", "piocitosUrina"]
  },

  // EXAMES DE FEZES
  parasitologiaFezes: {
    nome: "Parasitológico de Fezes",
    categoria: "Fezes",
    unidade: "Qualitativo",
    referencia: { geral: "Negativo" },
    ideal: { geral: "Negativo" },
    interpretacao: {
      negativo: { significado: "Sem parasitas intestinais detectados" },
      positivo: {
        significado: "Presença de parasitas",
        causas: ["Giardia lamblia", "Entamoeba histolytica", "Ascaris lumbricoides", "Outros helmintos"],
        sintomas: ["Diarreia", "Dor abdominal", "Má absorção", "Perda de peso", "Anemia"],
        orientacoes: ["Tratamento antiparasitário conforme agente identificado", "Melhorar higiene", "Investigar fonte de contaminação"]
      }
    }
  },

  sangueOcultoFezes: {
    nome: "Sangue Oculto nas Fezes",
    categoria: "Fezes",
    unidade: "Qualitativo",
    referencia: { geral: "Negativo" },
    ideal: { geral: "Negativo" },
    interpretacao: {
      negativo: { significado: "Sem sangramento gastrointestinal detectado" },
      positivo: {
        significado: "Presença de sangue oculto",
        causas: ["Pólipos intestinais", "Câncer colorretal", "Doença inflamatória intestinal", "Úlcera péptica", "Hemorroidas", "Diverticulose"],
        investigar: ["Colonoscopia", "Endoscopia digestiva alta", "Hemoglobina", "Ferritina"],
        urgente: true
      }
    },
    correlacoes: ["hemoglobina", "ferritina"]
  },

  elastaseFecal: {
    nome: "Elastase Fecal",
    categoria: "Fezes",
    unidade: "µg/g",
    referencia: { geral: { min: 200, max: 999999 } },
    ideal: { geral: 500 },
    quintis: {
      geral: {
        Q1: { min: 0, max: 100, nivel: "Insuficiência Severa", cor: "#f44336" },
        Q2: { min: 100, max: 200, nivel: "Insuficiência Moderada", cor: "#ff9800" },
        Q3: { min: 200, max: 500, nivel: "Adequado", cor: "#4caf50" },
        Q4: { min: 500, max: 1000, nivel: "Ideal", cor: "#4caf50" },
        Q5: { min: 1000, max: 999999, nivel: "Ótimo", cor: "#2196f3" }
      }
    },
    interpretacao: {
      Q1: {
        significado: "Insuficiência pancreática severa",
        causas: ["Pancreatite crônica", "Fibrose cística", "Câncer de pâncreas"],
        sintomas: ["Esteatorreia", "Má absorção", "Perda de peso", "Deficiências nutricionais"],
        urgente: true
      },
      Q2: {
        significado: "Insuficiência pancreática moderada",
        orientacoes: ["Enzimas pancreáticas digestivas", "Investigar função pancreática"]
      },
      Q3: { significado: "Função pancreática adequada" },
      Q4: { significado: "Função pancreática ideal" }
    },
    correlacoes: ["vitaminaD", "vitaminaA", "vitaminaE", "albumina"]
  }
};

// Continua com mais exames...

// ========================================================================
// PERFIL LIPÍDICO COMPLETO
// ========================================================================

LABORATORY_EXAMS_COMPLETE.colesterolTotal = {
  nome: "Colesterol Total",
  categoria: "Perfil Lipídico",
  unidade: "mg/dL",
  funcao: "Lipídio estrutural das membranas celulares e precursor de hormônios esteroides. Transportado por lipoproteínas (HDL, LDL, VLDL).",
  referencia: { geral: { min: 150, max: 200 } },
  ideal: { geral: 200 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 140, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 140, max: 160, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 160, max: 240, nivel: "Ideal Funcional", cor: "#4caf50" },
      Q4: { min: 240, max: 280, nivel: "Elevado", cor: "#ffc107" },
      Q5: { min: 280, max: 999, nivel: "Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Colesterol muito baixo - Possível déficit de síntese hormonal",
      causas: ["Desnutrição", "Hipertireoidismo", "Má absorção lipídica", "Doença hepática"],
      sintomas: ["Fadiga", "Baixa libido", "Alterações hormonais", "Depressão"],
      orientacoes: ["Aumentar gorduras saudáveis na dieta", "Avaliar função hepática e tireoidiana"]
    },
    Q3: { significado: "Colesterol ideal - Síntese hormonal adequada" },
    Q5: {
      significado: "Colesterol elevado - Risco cardiovascular aumentado",
      causas: ["Dieta rica em gorduras saturadas", "Resistência insulínica", "Hipotireoidismo", "Genética"],
      riscos: ["Aterosclerose", "Infarto", "AVC"],
      orientacoes: ["Dieta anti-inflamatória", "Exercícios aeróbicos", "Ômega-3", "Estatinas naturais (arroz vermelho fermentado)"]
    }
  },
  correlacoes: ["ldl", "hdl", "triglicerideos", "proteinaCreativa"]
};

LABORATORY_EXAMS_COMPLETE.ldl = {
  nome: "LDL Colesterol",
  categoria: "Perfil Lipídico",
  unidade: "mg/dL",
  funcao: "Lipoproteína de baixa densidade, transporta colesterol do fígado para os tecidos. Em excesso, deposita-se nas artérias.",
  referencia: { geral: { min: 0, max: 130 } },
  ideal: { geral: 115 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 50, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 50, max: 80, nivel: "Ótimo", cor: "#4caf50" },
      Q3: { min: 80, max: 130, nivel: "Ideal Funcional", cor: "#4caf50" },
      Q4: { min: 130, max: 160, nivel: "Elevado", cor: "#ffc107" },
      Q5: { min: 160, max: 999, nivel: "Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q2: { significado: "LDL ótimo - Mínimo risco cardiovascular" },
    Q3: { significado: "LDL desejável - Risco cardiovascular baixo" },
    Q5: {
      significado: "LDL elevado - Risco cardiovascular significativo",
      causas: ["Dieta inadequada", "Resistência insulínica", "Hipotireoidismo", "Genética (hipercolesterolemia familiar)"],
      riscos: ["Aterosclerose", "Infarto", "AVC", "Doença arterial periférica"],
      orientacoes: ["Ômega-3 (2-3g/dia)", "Fitoesteróis", "Berberina", "Exercícios regulares", "Reduzir açúcares e gorduras trans"]
    }
  },
  correlacoes: ["ldlOxidado", "hdl", "apoB", "proteinaCreativaUs"]
};

LABORATORY_EXAMS_COMPLETE.ldlOxidado = {
  nome: "LDL Oxidado",
  categoria: "Perfil Lipídico",
  unidade: "U/L",
  funcao: "Forma oxidada do LDL que promove inflamação vascular e formação de placas ateroscleróticas. Marcador de risco cardiovascular mais específico que LDL total.",
  referencia: { geral: { min: 0, max: 60 } },
  ideal: { geral: 30 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 25, nivel: "Ótimo", cor: "#4caf50" },
      Q2: { min: 25, max: 45, nivel: "Bom", cor: "#4caf50" },
      Q3: { min: 45, max: 60, nivel: "Limítrofe", cor: "#ffc107" },
      Q4: { min: 60, max: 80, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 80, max: 999, nivel: "Muito Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: { significado: "LDL oxidado ótimo - Baixo estresse oxidativo vascular" },
    Q5: {
      significado: "LDL oxidado muito elevado - Inflamação vascular significativa",
      causas: ["Estresse oxidativo aumentado", "Dieta pró-inflamatória", "Tabagismo", "Diabetes", "Deficiência de antioxidantes"],
      riscos: ["Aterosclerose acelerada", "Infarto", "AVC", "Disfunção endotelial"],
      orientacoes: ["Antioxidantes (vitamina E, C, CoQ10)", "Ômega-3", "Polifenóis (resveratrol)", "Eliminar tabagismo", "Controlar glicemia"]
    }
  },
  correlacoes: ["ldl", "proteinaCreativaUs", "homocisteina", "vitaminaD"]
};

LABORATORY_EXAMS_COMPLETE.hdl = {
  nome: "HDL Colesterol",
  categoria: "Perfil Lipídico",
  unidade: "mg/dL",
  funcao: "Lipoproteína de alta densidade, realiza transporte reverso do colesterol (remove colesterol das artérias de volta ao fígado). Efeito cardioprotetor.",
  referencia: {
    homem: { min: 55, max: 999 },
    mulher: { min: 65, max: 999 }
  },
  ideal: {
    homem: 80,
    mulher: 85
  },
  quintis: {
    homem: {
      Q1: { min: 0, max: 35, nivel: "Muito Baixo - Risco Alto", cor: "#ff5722" },
      Q2: { min: 35, max: 55, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: 55, max: 93, nivel: "Ideal Funcional", cor: "#4caf50" },
      Q4: { min: 93, max: 110, nivel: "Ótimo", cor: "#4caf50" },
      Q5: { min: 110, max: 999, nivel: "Muito Alto", cor: "#4caf50" }
    },
    mulher: {
      Q1: { min: 0, max: 45, nivel: "Muito Baixo - Risco Alto", cor: "#ff5722" },
      Q2: { min: 45, max: 65, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: 65, max: 93, nivel: "Ideal Funcional", cor: "#4caf50" },
      Q4: { min: 93, max: 115, nivel: "Ótimo", cor: "#4caf50" },
      Q5: { min: 115, max: 999, nivel: "Muito Alto", cor: "#4caf50" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "HDL muito baixo - Risco cardiovascular muito aumentado",
      causas: ["Sedentarismo", "Resistência insulínica", "Tabagismo", "Obesidade", "Dieta pobre em gorduras boas"],
      riscos: ["Aterosclerose precoce", "Infarto", "AVC"],
      orientacoes: ["Exercícios aeróbicos (aumentam HDL)", "Ômega-3", "Azeite extra virgem", "Abacate", "Castanhas", "Parar de fumar"],
      urgente: true
    },
    Q3: { significado: "HDL ideal - Boa proteção cardiovascular" },
    Q5: { significado: "HDL muito alto - Excelente proteção cardiovascular" }
  },
  correlacoes: ["ldl", "triglicerideos", "insulina", "homaIR"]
};

LABORATORY_EXAMS_COMPLETE.vldl = {
  nome: "VLDL Colesterol",
  categoria: "Perfil Lipídico",
  unidade: "mg/dL",
  funcao: "Lipoproteína de muito baixa densidade, transporta principalmente triglicerídeos do fígado para os tecidos.",
  referencia: { geral: { min: 0, max: 30 } },
  ideal: { geral: 12 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 8, nivel: "Ótimo", cor: "#4caf50" },
      Q2: { min: 8, max: 20, nivel: "Ideal Funcional", cor: "#4caf50" },
      Q3: { min: 20, max: 30, nivel: "Limítrofe", cor: "#ffc107" },
      Q4: { min: 30, max: 40, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 40, max: 999, nivel: "Muito Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q2: { significado: "VLDL ideal - Metabolismo lipídico saudável" },
    Q5: {
      significado: "VLDL muito elevado - Dislipidemia metabólica",
      causas: ["Resistência insulínica", "Diabetes", "Obesidade", "Consumo excessivo de carboidratos refinados e álcool"],
      riscos: ["Esteatose hepática", "Pancreatite", "Aterosclerose"],
      orientacoes: ["Reduzir carboidratos refinados e açúcares", "Jejum intermitente", "Exercícios", "Ômega-3"]
    }
  },
  correlacoes: ["triglicerideos", "insulina", "tgp"]
};

LABORATORY_EXAMS_COMPLETE.triglicerideos = {
  nome: "Triglicerídeos",
  categoria: "Perfil Lipídico",
  unidade: "mg/dL",
  funcao: "Principal forma de armazenamento de energia lipídica. Elevações indicam disfunção metabólica e risco cardiovascular.",
  referencia: { geral: { min: 0, max: 100 } },
  ideal: { geral: 70 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 45, nivel: "Ótimo", cor: "#4caf50" },
      Q2: { min: 45, max: 70, nivel: "Ideal Funcional", cor: "#4caf50" },
      Q3: { min: 70, max: 100, nivel: "Aceitável", cor: "#ffc107" },
      Q4: { min: 100, max: 150, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 150, max: 9999, nivel: "Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: { significado: "Triglicerídeos ótimos - Metabolismo lipídico excelente" },
    Q5: {
      significado: "Triglicerídeos elevados - Síndrome metabólica",
      causas: ["Resistência insulínica", "Consumo excessivo de açúcares e carboidratos", "Álcool", "Sedentarismo"],
      riscos: ["Pancreatite aguda (se >500)", "Esteatose hepática", "Aterosclerose", "Infarto"],
      orientacoes: ["Dieta low-carb", "Eliminar açúcares e álcool", "Ômega-3 (2-4g/dia)", "Berberina", "Exercícios"],
      urgente: true
    }
  },
  correlacoes: ["insulina", "glicose", "hdl", "tgp", "ggt"]
};

// Ratios Lipídicos
LABORATORY_EXAMS_COMPLETE.ratioTgHdl = {
  nome: "Razão TG/HDL",
  categoria: "Perfil Lipídico",
  unidade: "ratio",
  funcao: "Indicador de resistência insulínica e risco cardiovascular. Calculado dividindo triglicerídeos por HDL.",
  referencia: { geral: { min: 0, max: 3 } },
  ideal: { geral: 1.5 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 1, nivel: "Ótimo", cor: "#4caf50" },
      Q2: { min: 1, max: 2, nivel: "Ideal", cor: "#4caf50" },
      Q3: { min: 2, max: 3, nivel: "Aceitável", cor: "#ffc107" },
      Q4: { min: 3, max: 5, nivel: "Risco Moderado", cor: "#ff9800" },
      Q5: { min: 5, max: 999, nivel: "Alto Risco", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: { significado: "Razão TG/HDL ótima - Sensibilidade insulínica preservada" },
    Q5: {
      significado: "Razão TG/HDL elevada - Forte indicador de resistência insulínica",
      causas: ["Resistência insulínica", "Síndrome metabólica", "Diabetes tipo 2"],
      riscos: ["Risco cardiovascular aumentado", "Progressão para diabetes"],
      orientacoes: ["Mesmas orientações para triglicerídeos elevados e HDL baixo"]
    }
  },
  correlacoes: ["triglicerideos", "hdl", "insulina", "homaIR"]
};

LABORATORY_EXAMS_COMPLETE.ratioLdlHdl = {
  nome: "Razão LDL/HDL",
  categoria: "Perfil Lipídico",
  unidade: "ratio",
  funcao: "Indicador de risco cardiovascular. Relação entre colesterol aterogênico (LDL) e protetor (HDL).",
  referencia: { geral: { min: 0, max: 3 } },
  ideal: { geral: 2 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 1.5, nivel: "Ótimo", cor: "#4caf50" },
      Q2: { min: 1.5, max: 2.5, nivel: "Desejável", cor: "#4caf50" },
      Q3: { min: 2.5, max: 3.5, nivel: "Limítrofe", cor: "#ffc107" },
      Q4: { min: 3.5, max: 5, nivel: "Alto", cor: "#ff9800" },
      Q5: { min: 5, max: 999, nivel: "Muito Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: { significado: "Razão LDL/HDL ótima - Baixo risco cardiovascular" },
    Q5: {
      significado: "Razão LDL/HDL muito elevada - Alto risco cardiovascular",
      orientacoes: ["Aumentar HDL com exercícios e gorduras boas", "Reduzir LDL com dieta e suplementos"]
    }
  },
  correlacoes: ["ldl", "hdl", "proteinaCreativaUs"]
};

LABORATORY_EXAMS_COMPLETE.ratioCtHdl = {
  nome: "Razão CT/HDL",
  categoria: "Perfil Lipídico",
  unidade: "ratio",
  funcao: "Índice aterogênico. Relação entre colesterol total e HDL. Quanto menor, melhor.",
  referencia: { geral: { min: 0, max: 4.5 } },
  ideal: { geral: 3.5 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 3, nivel: "Ótimo", cor: "#4caf50" },
      Q2: { min: 3, max: 4, nivel: "Desejável", cor: "#4caf50" },
      Q3: { min: 4, max: 5, nivel: "Limítrofe", cor: "#ffc107" },
      Q4: { min: 5, max: 6, nivel: "Alto", cor: "#ff9800" },
      Q5: { min: 6, max: 999, nivel: "Muito Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: { significado: "Razão CT/HDL ótima - Proteção cardiovascular adequada" },
    Q5: { significado: "Razão CT/HDL elevada - Risco cardiovascular aumentado" }
  },
  correlacoes: ["colesterolTotal", "hdl"]
};

// Apolipoproteínas
LABORATORY_EXAMS_COMPLETE.apoA1 = {
  nome: "Apolipoproteína A1",
  categoria: "Perfil Lipídico",
  unidade: "mg/dL",
  funcao: "Principal componente proteico do HDL. Relacionada ao transporte reverso de colesterol e proteção cardiovascular.",
  referencia: {
    homem: { min: 120, max: 160 },
    mulher: { min: 140, max: 180 }
  },
  ideal: {
    homem: 145,
    mulher: 160
  },
  quintis: {
    homem: {
      Q1: { min: 0, max: 100, nivel: "Muito Baixo", cor: "#ff5722" },
      Q2: { min: 100, max: 120, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: 120, max: 160, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 160, max: 180, nivel: "Alto", cor: "#4caf50" },
      Q5: { min: 180, max: 999, nivel: "Muito Alto", cor: "#4caf50" }
    },
    mulher: {
      Q1: { min: 0, max: 120, nivel: "Muito Baixo", cor: "#ff5722" },
      Q2: { min: 120, max: 140, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: 140, max: 180, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 180, max: 200, nivel: "Alto", cor: "#4caf50" },
      Q5: { min: 200, max: 999, nivel: "Muito Alto", cor: "#4caf50" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "ApoA1 muito baixa - Proteção cardiovascular comprometida",
      riscos: ["Risco cardiovascular aumentado", "Função antiaterogênica reduzida"]
    },
    Q3: { significado: "ApoA1 ideal - Proteção cardiovascular adequada" }
  },
  correlacoes: ["hdl", "apoB"]
};

LABORATORY_EXAMS_COMPLETE.apoB = {
  nome: "Apolipoproteína B",
  categoria: "Perfil Lipídico",
  unidade: "mg/dL",
  funcao: "Principal componente proteico das lipoproteínas aterogênicas (LDL, VLDL, IDL). Cada partícula contém uma molécula de ApoB. Melhor preditor de risco cardiovascular que LDL.",
  referencia: { geral: { min: 0, max: 100 } },
  ideal: { geral: 80 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 60, nivel: "Ótimo", cor: "#4caf50" },
      Q2: { min: 60, max: 80, nivel: "Desejável", cor: "#4caf50" },
      Q3: { min: 80, max: 100, nivel: "Limítrofe", cor: "#ffc107" },
      Q4: { min: 100, max: 130, nivel: "Alto", cor: "#ff9800" },
      Q5: { min: 130, max: 999, nivel: "Muito Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: { significado: "ApoB ótima - Número reduzido de partículas aterogênicas" },
    Q5: {
      significado: "ApoB muito elevada - Alto número de partículas aterogênicas",
      causas: ["Resistência insulínica", "Diabetes", "Hipotireoidismo", "Genética"],
      riscos: ["Aterosclerose acelerada", "Infarto", "AVC"],
      orientacoes: ["Mesmas orientações para LDL elevado", "Berberina", "Arroz vermelho fermentado"]
    }
  },
  correlacoes: ["ldl", "apoA1", "triglicerideos"]
};

LABORATORY_EXAMS_COMPLETE.ratioApoBapoA1 = {
  nome: "Razão ApoB/ApoA1",
  categoria: "Perfil Lipídico",
  unidade: "ratio",
  funcao: "Relação entre apolipoproteínas aterogênicas e protetoras. Considerado o melhor marcador lipídico de risco cardiovascular.",
  referencia: {
    homem: { min: 0, max: 0.9 },
    mulher: { min: 0, max: 0.8 }
  },
  ideal: {
    homem: 0.6,
    mulher: 0.5
  },
  quintis: {
    homem: {
      Q1: { min: 0, max: 0.5, nivel: "Ótimo", cor: "#4caf50" },
      Q2: { min: 0.5, max: 0.7, nivel: "Desejável", cor: "#4caf50" },
      Q3: { min: 0.7, max: 0.9, nivel: "Limítrofe", cor: "#ffc107" },
      Q4: { min: 0.9, max: 1.1, nivel: "Alto", cor: "#ff9800" },
      Q5: { min: 1.1, max: 999, nivel: "Muito Alto", cor: "#ff5722" }
    },
    mulher: {
      Q1: { min: 0, max: 0.4, nivel: "Ótimo", cor: "#4caf50" },
      Q2: { min: 0.4, max: 0.6, nivel: "Desejável", cor: "#4caf50" },
      Q3: { min: 0.6, max: 0.8, nivel: "Limítrofe", cor: "#ffc107" },
      Q4: { min: 0.8, max: 1.0, nivel: "Alto", cor: "#ff9800" },
      Q5: { min: 1.0, max: 999, nivel: "Muito Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: { significado: "Razão ApoB/ApoA1 ótima - Mínimo risco cardiovascular" },
    Q5: {
      significado: "Razão ApoB/ApoA1 muito elevada - Alto risco cardiovascular",
      riscos: ["Risco de eventos cardiovasculares significativamente aumentado"]
    }
  },
  correlacoes: ["apoB", "apoA1", "proteinaCreativaUs"]
};

LABORATORY_EXAMS_COMPLETE.lipoproteina_a = {
  nome: "Lipoproteína(a) - Lp(a)",
  categoria: "Perfil Lipídico",
  unidade: "mg/dL",
  funcao: "Lipoproteína geneticamente determinada com estrutura semelhante ao LDL, porém mais aterogênica e pró-trombótica. Fator de risco cardiovascular independente.",
  referencia: { geral: { min: 0, max: 30 } },
  ideal: { geral: 10 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 10, nivel: "Ótimo", cor: "#4caf50" },
      Q2: { min: 10, max: 20, nivel: "Desejável", cor: "#4caf50" },
      Q3: { min: 20, max: 30, nivel: "Limítrofe", cor: "#ffc107" },
      Q4: { min: 30, max: 50, nivel: "Alto", cor: "#ff9800" },
      Q5: { min: 50, max: 999, nivel: "Muito Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: { significado: "Lp(a) ótima - Mínimo risco genético cardiovascular" },
    Q5: {
      significado: "Lp(a) muito elevada - Alto risco cardiovascular genético",
      causas: ["Determinação genética (não modificável por dieta)", "Inflamação crônica"],
      riscos: ["Aterosclerose precoce", "Infarto", "AVC", "Estenose aórtica"],
      orientacoes: ["Controle rigoroso de outros fatores de risco", "Niacina em altas doses (sob supervisão)", "Antioxidantes", "L-carnitina", "CoQ10"],
      investigar: ["História familiar de doença cardiovascular precoce"]
    }
  },
  correlacoes: ["ldl", "proteinaCreativaUs", "homocisteina"]
};

// OBSERVAÇÃO: MERGED_EXAMS é definido no final do arquivo,
// após todas as definições de LABORATORY_EXAMS_COMPLETE

export const EXAM_CATEGORIES = [
  { id: "hemograma", nome: "Hemograma Completo" },
  { id: "ferro", nome: "Metabolismo do Ferro" },
  { id: "lipidico", nome: "Perfil Lipídico" },
  { id: "glicemico", nome: "Metabolismo da Glicose" },
  { id: "hepatico", nome: "Função Hepática" },
  { id: "renal", nome: "Função Renal" },
  { id: "tireoidiano", nome: "Função Tireoidiana" },
  { id: "vitaminas", nome: "Vitaminas" },
  { id: "minerais", nome: "Minerais" },
  { id: "hormonal", nome: "Perfil Hormonal" }
];

/**
 * Analisa resultado e retorna interpretação com quintil
 */
export function analyzeExamResult(examKey, value, sexo = 'geral') {
  // Usar MERGED_EXAMS que inclui TODOS os exames (base + adicionais + especializados)
  const exam = MERGED_EXAMS[examKey];
  if (!exam) return null;

  if (!exam.quintis || typeof exam.quintis !== 'object') {
    return null;
  }

  const selectBySex = (source) => {
    if (!source || typeof source !== 'object') return null;
    return source[sexo] || source.geral || source.homem || source.mulher || null;
  };

  // Tentar encontrar quintis com fallback:
  // 1. Sexo específico (homem, mulher, crianca)
  // 2. Geral
  // 3. Qualquer outro disponível
  let quintis = selectBySex(exam.quintis);
  if (!quintis) {
    console.warn(`⚠️ Quintis não encontrados para ${examKey} com sexo '${sexo}'`);
    return null;
  }

  // Encontrar quintil
  let quintil = null;
  for (const [key, range] of Object.entries(quintis)) {
    if (value >= range.min && value < range.max) {
      quintil = { id: key, ...range };
      break;
    }
  }

  if (!quintil) return null;

  // Buscar interpretação
  const interpretacao = exam.interpretacao[quintil.id];

  return {
    exame: exam.nome,
    valor: value,
    unidade: exam.unidade,
    quintil: quintil,
    interpretacao: interpretacao,
    referencia: selectBySex(exam.referencia),
    ideal: selectBySex(exam.ideal),
    correlacoes: exam.correlacoes || []
  };
}

/**
 * Analisa correlações entre múltiplos exames
 */
export function analyzeCorrelations(results) {
  const patterns = [];

  // Padrão 1: Anemia Ferropriva
  if (results.hemacias && results.ferritina && results.vcm) {
    const hb = results.hemoglobina?.valor || 0;
    const ferr = results.ferritina?.valor || 0;
    const vcm = results.vcm?.valor || 0;

    if (hb < 12 && ferr < 30 && vcm < 80) {
      patterns.push({
        nome: "Anemia Ferropriva Clássica",
        exames: ["Hemoglobina", "Ferritina", "VCM"],
        severidade: "alta",
        descricao: "Anemia microcítica hipocrômica por deficiência de ferro",
        tratamento: [
          "Suplementação de ferro (quelato ou bisglicinato): 30-60mg/dia",
          "Vitamina C: 500mg junto com ferro para aumentar absorção",
          "Investigar sangramento oculto",
          "Avaliar função intestinal e absorção",
          "Reavaliar em 30-60 dias"
        ]
      });
    }
  }

  // Padrão 2: Anemia Megaloblástica
  if (results.hemoglobina && results.vitaminaB12 && results.vcm) {
    const hb = results.hemoglobina?.valor || 0;
    const b12 = results.vitaminaB12?.valor || 0;
    const vcm = results.vcm?.valor || 0;

    if (hb < 12 && b12 < 300 && vcm > 100) {
      patterns.push({
        nome: "Anemia Megaloblástica",
        exames: ["Hemoglobina", "Vitamina B12", "VCM"],
        severidade: "alta",
        descricao: "Anemia macrocítica por deficiência de B12/folato",
        tratamento: [
          "Vitamina B12 (metilcobalamina): 1000-2000mcg/dia sublingual",
          "Ácido fólico (metilfolato): 800-1000mcg/dia",
          "Investigar causa (má absorção, gastrite, vegetarianismo)",
          "Avaliar homocisteína",
          "Reavaliar em 60-90 dias"
        ]
      });
    }
  }

  // Padrão 3: Risco de Trombose
  if (results.ddimero && results.fibrinogenio) {
    const ddimero = results.ddimero?.valor || 0;
    const fibrinogenio = results.fibrinogenio?.valor || 0;

    if (ddimero > 500 && fibrinogenio > 400) {
      patterns.push({
        nome: "Risco de Evento Trombótico",
        exames: ["D-Dímero", "Fibrinogênio"],
        severidade: "alta",
        descricao: "Ativação da coagulação e inflamação sistêmica",
        tratamento: [
          "Urgente: Avaliação médica imediata",
          "Investigar: Ultrassom vascular doppler, angiotomografia",
          "Ômega-3 (EPA/DHA): 2-3g/dia",
          "Nattokinase: 2000 FU/dia",
          "Aumentar hidratação",
          "Evitar imobilização prolongada"
        ]
      });
    }
  }

  // Padrão 4: Disfunção Tireoidiana com Deficiências
  if (results.tsh && results.vitaminaD) {
    const tsh = results.tsh?.valor || 0;
    const vitD = results.vitaminaD?.valor || 0;

    if (tsh > 2.0 && vitD < 60) {
      patterns.push({
        nome: "Hipotireoidismo Subclínico com Deficiência de Vitamina D",
        exames: ["TSH", "Vitamina D"],
        severidade: "moderada",
        descricao: "Função tireoidiana comprometida associada a baixa vitamina D",
        tratamento: [
          "Vitamina D3: 5000-10000 UI/dia (até atingir 60-80 ng/mL)",
          "Selênio: 200mcg/dia (selenometionina)",
          "Zinco: 30mg/dia",
          "Evitar alimentos goitrogênicos em excesso",
          "Avaliar anticorpos anti-TPO",
          "Reavaliar TSH e T4 livre em 90 dias"
        ]
      });
    }
  }

  // Padrão 5: Síndrome Metabólica
  if (results.glicose && results.triglicerideos && results.hdl) {
    const glicose = results.glicose?.valor || 0;
    const trig = results.triglicerideos?.valor || 0;
    const hdl = results.hdl?.valor || 0;

    if (glicose > 85 && trig > 100 && hdl < 55) {
      patterns.push({
        nome: "Síndrome Metabólica",
        exames: ["Glicose", "Triglicerídeos", "HDL"],
        severidade: "alta",
        descricao: "Conjunto de alterações metabólicas com alto risco cardiovascular",
        tratamento: [
          "Dieta low carb / cetogênica",
          "Jejum intermitente",
          "Exercícios resistidos + aeróbicos",
          "Berberina: 500mg 3x/dia",
          "Ômega-3: 2-3g/dia",
          "Magnésio: 400-600mg/dia",
          "Cromo picolinato: 200mcg/dia",
          "Perda de peso (meta: reduzir 5-10%)",
          "Reavaliar em 90 dias"
        ]
      });
    }
  }

  // Padrão 6: Inflamação Sistêmica
  if (results.proteinaCreativa && results.fibrinogenio) {
    const pcr = results.proteinaCreativa?.valor || 0;
    const fibrinogenio = results.fibrinogenio?.valor || 0;

    if (pcr > 3 && fibrinogenio > 400) {
      patterns.push({
        nome: "Inflamação Sistêmica Crônica",
        exames: ["Proteína C Reativa", "Fibrinogênio"],
        severidade: "moderada",
        descricao: "Processo inflamatório crônico de baixo grau",
        tratamento: [
          "Investigar foco inflamatório/infeccioso",
          "Dieta anti-inflamatória",
          "Ômega-3: 2-3g/dia",
          "Curcumina: 1000mg 2x/dia",
          "Vitamina D: otimizar para 60-80 ng/mL",
          "Probióticos de alta potência",
          "Reduzir açúcares e alimentos processados",
          "Avaliar saúde intestinal"
        ]
      });
    }
  }

  // Padrão 7: Insuficiência Renal Inicial
  if (results.creatinina && results.ureia) {
    const creatinina = results.creatinina?.valor || 0;
    const ureia = results.ureia?.valor || 0;

    if (creatinina > 1.2 && ureia > 40) {
      patterns.push({
        nome: "Comprometimento da Função Renal",
        exames: ["Creatinina", "Ureia"],
        severidade: "moderada",
        descricao: "Sinais de redução da função renal",
        tratamento: [
          "Urgente: Calcular TFG (Taxa de Filtração Glomerular)",
          "Hidratação adequada (2-3L água/dia)",
          "Reduzir proteína animal se necessário",
          "Controlar pressão arterial",
          "Evitar AINEs e nefrotóxicos",
          "Avaliar proteinúria",
          "Acompanhamento nefrológico"
        ]
      });
    }
  }

  return patterns;
}

// EXAMES ADICIONAIS DE SANGUE

LABORATORY_EXAMS_COMPLETE.ferritina = {
  nome: "Ferritina",
  categoria: "Ferro",
  unidade: "ng/mL",
  referencia: {
    mulher: { min: 50, max: 150 },
    homem: { min: 80, max: 300 }
  },
  ideal: {
    mulher: 105,
    homem: 110
  },
  quintis: {
    mulher: {
      Q1: { min: 0, max: 25, nivel: "Deficiente", cor: "#f44336" },
      Q2: { min: 25, max: 50, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: 50, max: 110, nivel: "Ideal Funcional", cor: "#4caf50" },
      Q4: { min: 110, max: 180, nivel: "Normal-Alto", cor: "#ffc107" },
      Q5: { min: 180, max: 999999, nivel: "Elevado", cor: "#ff5722" }
    },
    homem: {
      Q1: { min: 0, max: 50, nivel: "Deficiente", cor: "#f44336" },
      Q2: { min: 50, max: 80, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: 80, max: 120, nivel: "Ideal Funcional", cor: "#4caf50" },
      Q4: { min: 120, max: 200, nivel: "Normal-Alto", cor: "#ffc107" },
      Q5: { min: 200, max: 999999, nivel: "Elevado", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Ferritina deficiente - Anemia ferropriva",
      causas: ["Deficiência de ferro", "Perda sanguínea", "Má absorção", "Dieta pobre"],
      sintomas: ["Fadiga", "Fraqueza", "Queda de cabelo", "Unhas quebradiças"],
      investigar: ["Hemoglobina", "VCM", "Ferro sérico", "Transferrina"]
    },
    Q2: {
      significado: "Ferritina baixa - Estoques de ferro reduzidos",
      orientacoes: ["Suplementar ferro", "Aumentar consumo de carnes vermelhas e vegetais ricos em ferro"]
    },
    Q3: { significado: "Ferritina ideal" },
    Q5: {
      significado: "Ferritina elevada",
      causas: ["Hemocromatose", "Inflamação crônica", "Doença hepática", "Síndrome metabólica"],
      investigar: ["Proteína C reativa", "Perfil hepático", "Saturação de transferrina"]
    }
  },
  correlacoes: ["hemoglobina", "vcm", "ferroSerico"]
};

LABORATORY_EXAMS_COMPLETE.glicose = {
  nome: "Glicose em Jejum",
  categoria: "Metabolismo Glicêmico",
  unidade: "mg/dL",
  referencia: { geral: { min: 70, max: 85 } },
  ideal: { geral: 78 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 70, nivel: "Hipoglicemia", cor: "#ff9800" },
      Q2: { min: 70, max: 78, nivel: "Baixo-Normal", cor: "#ffc107" },
      Q3: { min: 78, max: 85, nivel: "Ideal Funcional", cor: "#4caf50" },
      Q4: { min: 85, max: 99, nivel: "Normal-Alto", cor: "#ffc107" },
      Q5: { min: 99, max: 999, nivel: "Pré-diabetes/Diabetes", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Hipoglicemia",
      causas: ["Jejum prolongado", "Excesso de insulina", "Tumor pancreático", "Insuficiência adrenal"],
      sintomas: ["Tremores", "Sudorese", "Tontura", "Confusão mental"]
    },
    Q3: { significado: "Glicose ideal" },
    Q5: {
      significado: "Hiperglicemia - Pré-diabetes ou Diabetes",
      causas: ["Resistência insulínica", "Diabetes tipo 2", "Síndrome metabólica"],
      investigar: ["Hemoglobina glicada", "Insulina", "Peptídeo C", "TOTG"],
      urgente: true
    }
  },
  correlacoes: ["insulina", "hemoglobinaGlicada", "triglicerideos"]
};

LABORATORY_EXAMS_COMPLETE.hemoglobinaGlicada = {
  nome: "Hemoglobina Glicada (HbA1c)",
  categoria: "Metabolismo Glicêmico",
  unidade: "%",
  referencia: { geral: { min: 0, max: 5.2 } },
  ideal: { geral: 4.8 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 4.5, nivel: "Muito Baixo", cor: "#ffc107" },
      Q2: { min: 4.5, max: 5.2, nivel: "Ideal Funcional", cor: "#4caf50" },
      Q3: { min: 5.2, max: 5.7, nivel: "Normal-Alto", cor: "#ffc107" },
      Q4: { min: 5.7, max: 6.4, nivel: "Pré-diabetes", cor: "#ff9800" },
      Q5: { min: 6.4, max: 99, nivel: "Diabetes", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: { significado: "HbA1c ideal - Controle glicêmico excelente" },
    Q2: { significado: "HbA1c normal" },
    Q3: {
      significado: "Pré-diabetes",
      causas: ["Resistência insulínica", "Síndrome metabólica", "Obesidade"],
      orientacoes: ["Mudanças no estilo de vida", "Dieta low carb", "Exercícios"]
    },
    Q4: {
      significado: "Diabetes mellitus",
      urgente: true
    },
    Q5: {
      significado: "Diabetes descompensado",
      riscos: ["Complicações microvasculares", "Neuropatia", "Retinopatia", "Nefropatia"],
      urgente: true
    }
  },
  correlacoes: ["glicose", "insulina", "triglicerideos", "glicemiaMediaEstimada"]
};

LABORATORY_EXAMS_COMPLETE.glicemiaMediaEstimada = {
  nome: "Glicemia Média Estimada (eAG)",
  categoria: "Metabolismo Glicêmico",
  unidade: "mg/dL",
  funcao: "Valor estimado a partir da HbA1c pela fórmula eAG = (28,7 × HbA1c) - 46,7. Utilizar como referência integrativa funcional por sexo.",
  referencia: {
    homem: { min: 80, max: 125 },
    mulher: { min: 78, max: 120 }
  },
  ideal: {
    homem: 95,
    mulher: 92
  },
  quintis: {
    homem: {
      Q1: { min: 0, max: 80, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 80, max: 88, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 88, max: 102, nivel: "Ideal Integrativo", cor: "#4caf50" },
      Q4: { min: 102, max: 110, nivel: "Alto-Limítrofe", cor: "#ff9800" },
      Q5: { min: 110, max: 999, nivel: "Elevado", cor: "#ff5722" }
    },
    mulher: {
      Q1: { min: 0, max: 78, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 78, max: 85, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 85, max: 99, nivel: "Ideal Integrativo", cor: "#4caf50" },
      Q4: { min: 99, max: 108, nivel: "Alto-Limítrofe", cor: "#ff9800" },
      Q5: { min: 108, max: 999, nivel: "Elevado", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Glicemia média estimada muito baixa",
      causas: ["Restrição glicêmica excessiva", "Hipoglicemias recorrentes", "Uso excessivo de hipoglicemiantes"],
      investigar: ["Glicemia capilar", "Sintomas de hipoglicemia", "Ajuste terapêutico"]
    },
    Q3: { significado: "Glicemia média estimada em alvo ideal integrativo" },
    Q4: {
      significado: "Glicemia média estimada acima do alvo integrativo",
      causas: ["Resistência insulínica inicial", "Excesso de carboidratos refinados", "Sedentarismo"],
      orientacoes: ["Dieta de baixo índice glicêmico", "Exercícios regulares", "Monitorar HbA1c em 90 dias"]
    },
    Q5: {
      significado: "Glicemia média estimada elevada",
      causas: ["Resistência insulínica", "Pré-diabetes/diabetes", "Síndrome metabólica"],
      investigar: ["Glicose de jejum", "Insulina basal", "HOMA-IR", "Hemoglobina glicada"],
      urgente: true
    }
  },
  correlacoes: ["hemoglobinaGlicada", "glicose", "insulina", "homaIR"]
};

LABORATORY_EXAMS_COMPLETE.creatinina = {
  nome: "Creatinina",
  categoria: "Função Renal",
  unidade: "mg/dL",
  referencia: {
    mulher: { min: 0.6, max: 1.2 },
    homem: { min: 0.7, max: 1.3 }
  },
  ideal: {
    mulher: 0.9,
    homem: 1.0
  },
  quintis: {
    mulher: {
      Q1: { min: 0, max: 0.6, nivel: "Baixo", cor: "#ffc107" },
      Q2: { min: 0.6, max: 0.8, nivel: "Ideal", cor: "#4caf50" },
      Q3: { min: 0.8, max: 1.0, nivel: "Normal", cor: "#4caf50" },
      Q4: { min: 1.0, max: 1.2, nivel: "Normal-Alto", cor: "#ffc107" },
      Q5: { min: 1.2, max: 999, nivel: "Elevado", cor: "#ff5722" }
    },
    homem: {
      Q1: { min: 0, max: 0.7, nivel: "Baixo", cor: "#ffc107" },
      Q2: { min: 0.7, max: 0.9, nivel: "Ideal", cor: "#4caf50" },
      Q3: { min: 0.9, max: 1.1, nivel: "Normal", cor: "#4caf50" },
      Q4: { min: 1.1, max: 1.3, nivel: "Normal-Alto", cor: "#ffc107" },
      Q5: { min: 1.3, max: 999, nivel: "Elevado", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Creatinina baixa",
      causas: ["Baixa massa muscular", "Desnutrição", "Gravidez"]
    },
    Q2: { significado: "Creatinina ideal" },
    Q5: {
      significado: "Creatinina elevada - Disfunção renal",
      causas: ["Insuficiência renal", "Desidratação", "Rabdomiólise", "Obstrução urinária"],
      investigar: ["Ureia", "TFG", "Exame de urina", "Ultrassom renal"],
      urgente: true
    }
  },
  correlacoes: ["ureia", "potassio", "proteinuriaUrina"]
};

LABORATORY_EXAMS_COMPLETE.ureia = {
  nome: "Ureia",
  categoria: "Função Renal",
  unidade: "mg/dL",
  referencia: { geral: { min: 10, max: 50 } },
  ideal: { geral: 30 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 10, nivel: "Baixo", cor: "#ffc107" },
      Q2: { min: 10, max: 20, nivel: "Ideal", cor: "#4caf50" },
      Q3: { min: 20, max: 40, nivel: "Normal", cor: "#4caf50" },
      Q4: { min: 40, max: 50, nivel: "Normal-Alto", cor: "#ffc107" },
      Q5: { min: 50, max: 999, nivel: "Elevado", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Ureia baixa",
      causas: ["Desnutrição proteica", "Doença hepática", "Sobrehidratação"]
    },
    Q2: { significado: "Ureia ideal" },
    Q5: {
      significado: "Ureia elevada",
      causas: ["Insuficiência renal", "Desidratação", "Dieta hiperproteica", "Sangramento GI"],
      investigar: ["Creatinina", "Exame de urina", "Hidratação"],
      urgente: true
    }
  },
  correlacoes: ["creatinina", "potassio"]
};

// ===== NOVOS EXAMES COMPLETOS =====

// LEUCOGRAMA DIFERENCIAL
LABORATORY_EXAMS_COMPLETE.neutrofilos = {
  nome: "Neutrófilos",
  categoria: "Hemograma - Leucograma",
  unidade: "/mm³",
  funcao: "Defesa contra bactérias e fungos. Primeira linha de defesa do sistema imunológico.",
  referencia: { geral: { min: 1500, max: 7500 } },
  ideal: { geral: 4000 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 1500, nivel: "Neutropenia", cor: "#ff9800" },
      Q2: { min: 1500, max: 2500, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 2500, max: 5500, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 5500, max: 7500, nivel: "Normal", cor: "#ffc107" },
      Q5: { min: 7500, max: 999999, nivel: "Neutrofilia", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Neutropenia - Defesa imunológica reduzida",
      causas: ["Infecções virais", "Deficiência de B12/folato", "Quimioterapia", "Doenças autoimunes"],
      riscos: ["Maior risco de infecções bacterianas graves"]
    },
    Q3: { significado: "Neutrófilos ideais" },
    Q5: {
      significado: "Neutrofilia - Resposta inflamatória/infecciosa ativa",
      causas: ["Infecção bacteriana aguda", "Inflamação", "Estresse físico", "Tabagismo", "Corticoides"],
      investigar: ["Proteína C reativa", "VHS", "Hemograma completo"]
    }
  },
  correlacoes: ["leucocitos", "proteinaCreativa"]
};

LABORATORY_EXAMS_COMPLETE.linfocitos = {
  nome: "Linfócitos",
  categoria: "Hemograma - Leucograma",
  unidade: "/mm³",
  funcao: "Defesa imunológica adaptativa. Produzem anticorpos e combatem vírus.",
  referencia: { geral: { min: 900, max: 2900 } },
  ideal: { geral: 2000 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 900, nivel: "Linfopenia", cor: "#ff9800" },
      Q2: { min: 900, max: 1400, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 1400, max: 2400, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 2400, max: 2900, nivel: "Normal", cor: "#ffc107" },
      Q5: { min: 2900, max: 999999, nivel: "Linfocitose", cor: "#ff9800" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Linfopenia - Imunossupressão",
      causas: ["HIV", "Corticoides prolongados", "Estresse crônico", "Desnutrição"],
      riscos: ["Infecções virais recorrentes", "Imunidade reduzida"]
    },
    Q3: { significado: "Linfócitos ideais" },
    Q5: {
      significado: "Linfocitose",
      causas: ["Infecções virais (mononucleose, CMV)", "Leucemia linfocítica"],
      investigar: ["Sorologia viral", "Esfregaço sanguíneo"]
    }
  },
  correlacoes: ["leucocitos", "vitaminaD"]
};

LABORATORY_EXAMS_COMPLETE.vhs = {
  nome: "VHS (Velocidade de Hemossedimentação)",
  categoria: "Inflamatórios",
  unidade: "mm/h",
  funcao: "Marcador inespecífico de inflamação. Mede velocidade de sedimentação das hemácias.",
  referencia: {
    homem: { min: 0, max: 15 },
    mulher: { min: 0, max: 20 }
  },
  ideal: { homem: 5, mulher: 5 },
  quintis: {
    homem: {
      Q1: { min: 0, max: 5, nivel: "Ideal", cor: "#4caf50" },
      Q2: { min: 5, max: 10, nivel: "Normal", cor: "#4caf50" },
      Q3: { min: 10, max: 15, nivel: "Limítrofe", cor: "#ffc107" },
      Q4: { min: 15, max: 30, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 30, max: 999, nivel: "Muito Elevado", cor: "#ff5722" }
    },
    mulher: {
      Q1: { min: 0, max: 5, nivel: "Ideal", cor: "#4caf50" },
      Q2: { min: 5, max: 15, nivel: "Normal", cor: "#4caf50" },
      Q3: { min: 15, max: 20, nivel: "Limítrofe", cor: "#ffc107" },
      Q4: { min: 20, max: 40, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 40, max: 999, nivel: "Muito Elevado", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: { significado: "VHS ideal - Sem inflamação detectada" },
    Q3: { significado: "VHS limítrofe - Monitorar" },
    Q5: {
      significado: "VHS muito elevado - Processo inflamatório significativo",
      causas: ["Infecção", "Artrite", "Doenças autoimunes", "Neoplasias", "Anemia"],
      investigar: ["Proteína C reativa", "Hemograma", "Investigação de doenças autoimunes"]
    }
  },
  correlacoes: ["proteinaCreativa", "fibrinogenio"]
};

// METABOLISMO DO FERRO
LABORATORY_EXAMS_COMPLETE.ferroSerico = {
  nome: "Ferro Sérico",
  categoria: "Metabolismo do Ferro",
  unidade: "µg/dL",
  funcao: "Avalia níveis de ferro circulante no sangue. Essencial para produção de hemoglobina.",
  referencia: {
    homem: { min: 65, max: 175 },
    mulher: { min: 50, max: 170 }
  },
  ideal: { homem: 100, mulher: 90 },
  quintis: {
    homem: {
      Q1: { min: 0, max: 65, nivel: "Deficiente", cor: "#ff9800" },
      Q2: { min: 65, max: 85, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 85, max: 130, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 130, max: 175, nivel: "Normal", cor: "#ffc107" },
      Q5: { min: 175, max: 999, nivel: "Elevado", cor: "#ff5722" }
    },
    mulher: {
      Q1: { min: 0, max: 50, nivel: "Deficiente", cor: "#ff9800" },
      Q2: { min: 50, max: 70, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 70, max: 120, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 120, max: 170, nivel: "Normal", cor: "#ffc107" },
      Q5: { min: 170, max: 999, nivel: "Elevado", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Ferro deficiente",
      causas: ["Deficiência de ferro", "Sangramento crônico", "Má absorção", "Dieta inadequada"],
      investigar: ["Ferritina", "Saturação de transferrina", "Pesquisa de sangramento oculto"]
    },
    Q3: { significado: "Ferro ideal" },
    Q5: {
      significado: "Ferro elevado",
      causas: ["Hemocromatose", "Hemólise", "Transfusões", "Hepatopatia", "Suplementação excessiva"],
      investigar: ["Saturação de transferrina", "Ferritina", "Testes genéticos para hemocromatose"]
    }
  },
  correlacoes: ["ferritina", "hemoglobina", "vcm"]
};

// METABOLISMO GLICÊMICO AVANÇADO
LABORATORY_EXAMS_COMPLETE.insulina = {
  nome: "Insulina Basal (INSU-B)",
  categoria: "Metabolismo Glicêmico",
  unidade: "µUI/mL",
  funcao: "Avalia função pancreática e resistência insulínica. Fundamental para diagnóstico de síndrome metabólica.",
  referencia: {
    homem: { min: 2.0, max: 10.0 },
    mulher: { min: 2.5, max: 11.0 }
  },
  ideal: {
    homem: 4.5,
    mulher: 5.0
  },
  quintis: {
    homem: {
      Q1: { min: 0, max: 2.0, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 2.0, max: 3.5, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 3.5, max: 6.5, nivel: "Ideal Integrativo", cor: "#4caf50" },
      Q4: { min: 6.5, max: 10.0, nivel: "Alto-Limítrofe", cor: "#ff9800" },
      Q5: { min: 10.0, max: 999, nivel: "Elevado", cor: "#ff5722" }
    },
    mulher: {
      Q1: { min: 0, max: 2.5, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 2.5, max: 4.0, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 4.0, max: 7.0, nivel: "Ideal Integrativo", cor: "#4caf50" },
      Q4: { min: 7.0, max: 11.0, nivel: "Alto-Limítrofe", cor: "#ff9800" },
      Q5: { min: 11.0, max: 999, nivel: "Elevado", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Insulina muito baixa",
      causas: ["Diabetes tipo 1", "Insuficiência pancreática"],
      urgente: true
    },
    Q3: { significado: "Insulina basal em faixa ideal integrativa por sexo" },
    Q4: {
      significado: "Insulina acima da faixa ideal integrativa",
      causas: ["Síndrome metabólica", "Pré-diabetes", "SOP", "Obesidade"],
      investigar: ["HOMA-IR", "Hemoglobina glicada", "Perfil lipídico"],
      orientacoes: ["Dieta low carb", "Exercícios", "Berberina 500mg 3x/dia"]
    },
    Q5: {
      significado: "Insulina muito elevada - Hiperinsulinemia severa",
      causas: ["Resistência insulínica grave", "Insulinoma (raro)"],
      urgente: true
    }
  },
  correlacoes: ["glicose", "hemoglobinaGlicada", "glicemiaMediaEstimada", "triglicerideos"]
};

// FUNÇÃO HEPÁTICA COMPLETA
LABORATORY_EXAMS_COMPLETE.tgo = {
  nome: "TGO/AST (Transaminase Glutâmico Oxalacética)",
  categoria: "Função Hepática",
  unidade: "U/L",
  funcao: "Enzima presente no fígado, coração, músculos. Avalia lesão hepatocelular.",
  referencia: { geral: { min: 0, max: 40 } },
  ideal: { geral: 20 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 15, nivel: "Baixo", cor: "#ffc107" },
      Q2: { min: 15, max: 25, nivel: "Ideal", cor: "#4caf50" },
      Q3: { min: 25, max: 40, nivel: "Normal", cor: "#4caf50" },
      Q4: { min: 40, max: 100, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 100, max: 9999, nivel: "Muito Elevado", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "TGO baixo",
      causas: ["Deficiência de vitamina B6"]
    },
    Q2: { significado: "TGO ideal" },
    Q4: {
      significado: "TGO elevado - Lesão hepatocelular",
      causas: ["Hepatite", "Esteatose hepática", "Cirrose", "Alcoolismo", "Infarto do miocárdio"],
      investigar: ["TGP", "Gama GT", "Bilirrubinas", "Ultrassom abdome"]
    },
    Q5: {
      significado: "TGO muito elevado - Lesão grave",
      causas: ["Hepatite aguda", "Infarto agudo do miocárdio", "Rabdomiólise"],
      urgente: true
    }
  },
  correlacoes: ["tgp", "gamaGt", "bilirrubinas"]
};

LABORATORY_EXAMS_COMPLETE.tgp = {
  nome: "TGP/ALT (Transaminase Glutâmico Pirúvica)",
  categoria: "Função Hepática",
  unidade: "U/L",
  funcao: "Enzima específica do fígado. Marcador mais sensível de lesão hepática que TGO.",
  referencia: { geral: { min: 0, max: 41 } },
  ideal: { geral: 20 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 15, nivel: "Baixo", cor: "#ffc107" },
      Q2: { min: 15, max: 25, nivel: "Ideal", cor: "#4caf50" },
      Q3: { min: 25, max: 41, nivel: "Normal", cor: "#4caf50" },
      Q4: { min: 41, max: 100, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 100, max: 9999, nivel: "Muito Elevado", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "TGP baixo",
      causas: ["Deficiência de vitamina B6"]
    },
    Q2: { significado: "TGP ideal" },
    Q4: {
      significado: "TGP elevado - Lesão hepática",
      causas: ["Hepatite viral", "Esteatose", "Síndrome metabólica", "Medicamentos hepatotóxicos"],
      investigar: ["TGO", "Gama GT", "Ultrassom hepático", "Sorologias virais"]
    },
    Q5: {
      significado: "TGP muito elevado - Hepatite aguda",
      urgente: true
    }
  },
  correlacoes: ["tgo", "gamaGt"]
};

// ELETRÓLITOS
LABORATORY_EXAMS_COMPLETE.sodio = {
  nome: "Sódio (Na+)",
  categoria: "Eletrólitos",
  unidade: "mEq/L",
  funcao: "Principal cátion extracelular. Regula volume e osmolaridade do plasma.",
  referencia: { geral: { min: 135, max: 145 } },
  ideal: { geral: 140 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 135, nivel: "Hiponatremia", cor: "#ff9800" },
      Q2: { min: 135, max: 138, nivel: "Baixo-Normal", cor: "#ffc107" },
      Q3: { min: 138, max: 142, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 142, max: 145, nivel: "Normal-Alto", cor: "#ffc107" },
      Q5: { min: 145, max: 999, nivel: "Hipernatremia", cor: "#ff9800" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Hiponatremia - Sódio baixo",
      causas: ["SIADH", "Insuficiência cardíaca", "Cirrose", "Uso de diuréticos", "Excesso de água"],
      riscos: ["Confusão mental", "Convulsões", "Edema cerebral"],
      urgente: true
    },
    Q3: { significado: "Sódio ideal" },
    Q5: {
      significado: "Hipernatremia - Sódio elevado",
      causas: ["Desidratação", "Diabetes insipidus", "Perda de água livre"],
      riscos: ["Desidratação celular", "Alteração neurológica"],
      urgente: true
    }
  },
  correlacoes: ["potassio", "creatinina"]
};

LABORATORY_EXAMS_COMPLETE.potassio = {
  nome: "Potássio (K+)",
  categoria: "Eletrólitos",
  unidade: "mEq/L",
  funcao: "Principal cátion intracelular. Essencial para função cardíaca e muscular.",
  referencia: { geral: { min: 3.5, max: 5.0 } },
  ideal: { geral: 4.5 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 3.5, nivel: "Hipocalemia", cor: "#ff5722" },
      Q2: { min: 3.5, max: 4.0, nivel: "Baixo-Normal", cor: "#ffc107" },
      Q3: { min: 4.0, max: 4.7, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 4.7, max: 5.0, nivel: "Normal-Alto", cor: "#ffc107" },
      Q5: { min: 5.0, max: 999, nivel: "Hipercalemia", cor: "#f44336" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Hipocalemia - Potássio baixo",
      causas: ["Uso de diuréticos", "Vômitos", "Diarreia", "Desnutrição"],
      riscos: ["Arritmias cardíacas", "Fraqueza muscular", "Paralisia"],
      urgente: true
    },
    Q3: { significado: "Potássio ideal" },
    Q5: {
      significado: "Hipercalemia - Potássio elevado - EMERGÊNCIA",
      causas: ["Insuficiência renal", "Acidose", "Uso de IECA", "Hemólise da amostra"],
      riscos: ["Arritmias fatais", "Parada cardíaca"],
      urgente: true
    }
  },
  correlacoes: ["sodio", "creatinina", "magnesio"]
};

LABORATORY_EXAMS_COMPLETE.magnesio = {
  nome: "Magnésio",
  categoria: "Eletrólitos / Minerais",
  unidade: "mg/dL",
  funcao: "Cofator de mais de 300 enzimas. Essencial para energia, músculos, sistema nervoso.",
  referencia: { geral: { min: 1.7, max: 2.4 } },
  ideal: { geral: 2.0 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 1.7, nivel: "Deficiente", cor: "#ff9800" },
      Q2: { min: 1.7, max: 1.9, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 1.9, max: 2.2, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 2.2, max: 2.4, nivel: "Normal", cor: "#4caf50" },
      Q5: { min: 2.4, max: 999, nivel: "Elevado", cor: "#ffc107" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Magnésio deficiente - Muito comum!",
      causas: ["Dieta pobre", "Estresse", "Uso de IBP", "Diabetes", "Álcool"],
      sintomas: ["Cãibras", "Arritmias", "Ansiedade", "Insônia", "Fadiga"],
      orientacoes: ["Magnésio dimalato ou glicin at o: 400-600mg/dia"]
    },
    Q3: { significado: "Magnésio ideal" },
    Q5: {
      significado: "Magnésio elevado (raro)",
      causas: ["Insuficiência renal", "Excesso de suplementação"],
      riscos: ["Hipotensão", "Bradiacardia"]
    }
  },
  correlacoes: ["potassio", "calcio", "vitaminaD"]
};

// TIREOIDE AVANÇADA
LABORATORY_EXAMS_COMPLETE.t3Livre = {
  nome: "T3 Livre",
  categoria: "Tireoide",
  unidade: "pg/mL",
  funcao: "Fração livre e ativa do T3. Melhor marcador de função tireoidiana que T3 total.",
  referencia: { geral: { min: 2.3, max: 4.2 } },
  ideal: { geral: 3.2 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 2.3, nivel: "Baixo", cor: "#ff9800" },
      Q2: { min: 2.3, max: 3.0, nivel: "Baixo-Normal", cor: "#ffc107" },
      Q3: { min: 3.0, max: 3.4, nivel: "Ideal Funcional", cor: "#4caf50" },
      Q4: { min: 3.4, max: 4.2, nivel: "Normal-Alto", cor: "#ffc107" },
      Q5: { min: 4.2, max: 999, nivel: "Elevado", cor: "#ff9800" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "T3 livre baixo - Hipotireoidismo funcional",
      causas: ["Deficiência de selênio/zinco", "Estresse crônico", "Dieta restritiva", "Inflamação"],
      sintomas: ["Fadiga", "Ganho de peso", "Pele seca", "Queda de cabelo"],
      investigar: ["TSH", "T4 livre", "Selênio", "Zinco", "Anti-TPO"]
    },
    Q3: { significado: "T3 livre ideal" },
    Q5: {
      significado: "T3 livre elevado - Hipertireoidismo",
      causas: ["Doença de Graves", "Tireotoxicose", "Excesso de T3"],
      sintomas: ["Taquicardia", "Perda de peso", "Ansiedade", "Tremores"]
    }
  },
  correlacoes: ["tsh", "t4Livre", "selenio"]
};

// VITAMINAS E MINERAIS
LABORATORY_EXAMS_COMPLETE.vitaminaD = {
  nome: "Vitamina D 25(OH)",
  categoria: "Vitaminas",
  unidade: "ng/mL",
  funcao: "Forma de estoque de vitamina D. Essencial para ossos, imunidade, hormônios, saúde mental.",
  referencia: { geral: { min: 60, max: 100 } },
  ideal: { geral: 70 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 20, nivel: "Deficiência Grave", cor: "#f44336" },
      Q2: { min: 20, max: 40, nivel: "Insuficiência", cor: "#ff9800" },
      Q3: { min: 40, max: 60, nivel: "Insuficiente Funcional", cor: "#ffc107" },
      Q4: { min: 60, max: 80, nivel: "Ideal Funcional", cor: "#4caf50" },
      Q5: { min: 80, max: 100, nivel: "Ótimo", cor: "#2196f3" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Deficiência grave de vitamina D",
      causas: ["Pouca exposição solar", "Obesidade", "Má absorção", "Pele escura"],
      sintomas: ["Fadiga", "Dor óssea", "Fraqueza", "Depressão", "Baixa imunidade"],
      orientacoes: ["Vitamina D3: 10.000 UI/dia por 30 dias, depois 5.000 UI/dia"],
      urgente: true
    },
    Q2: {
      significado: "Insuficiência de vitamina D",
      orientacoes: ["Vitamina D3: 5.000-10.000 UI/dia"]
    },
    Q4: { significado: "Vitamina D ideal - Excelente para saúde" },
    Q5: { significado: "Vitamina D ótima" }
  },
  correlacoes: ["calcio", "tsh", "antiTPO"]
};

LABORATORY_EXAMS_COMPLETE.homocisteina = {
  nome: "Homocisteína",
  categoria: "Vitaminas / Cardiovascular",
  unidade: "µmol/L",
  funcao: "Aminoácido tóxico. Marcador de deficiência de B6, B12, folato e risco cardiovascular.",
  referencia: { geral: { min: 5, max: 8 } },
  ideal: { geral: 7 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 6, nivel: "Ideal", cor: "#4caf50" },
      Q2: { min: 6, max: 8, nivel: "Bom", cor: "#4caf50" },
      Q3: { min: 8, max: 12, nivel: "Limítrofe", cor: "#ffc107" },
      Q4: { min: 12, max: 25, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 25, max: 999, nivel: "Muito Elevado", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: { significado: "Homocisteína ideal - Baixo risco cardiovascular" },
    Q3: {
      significado: "Homocisteína limítrofe",
      orientacoes: ["Aumentar B6, B12 e folato"]
    },
    Q4: {
      significado: "Homocisteína elevada - Risco cardiovascular aumentado",
      causas: ["Deficiência de B6/B12/folato", "Mutação MTHFR", "Insuficiência renal"],
      riscos: ["Aterosclerose", "Trombose", "Déficit cognitivo", "Alzheimer"],
      orientacoes: [
        "Vitamina B12 (metilcobalamina): 1000-2000mcg/dia",
        "Ácido fólico (metilfolato): 800-1000mcg/dia",
        "Vitamina B6 (P5P): 50-100mg/dia",
        "Betaína (TMG): 500-1000mg/dia"
      ]
    },
    Q5: {
      significado: "Homocisteína muito elevada - Alto risco",
      urgente: true
    }
  },
  correlacoes: ["vitaminaB6", "vitaminaB12", "acidoFolico"]
};

LABORATORY_EXAMS_COMPLETE.zinco = {
  nome: "Zinco Sérico",
  categoria: "Minerais",
  unidade: "µg/dL",
  funcao: "Cofator de mais de 300 enzimas. Essencial para imunidade, cicatrização, hormônios, paladar.",
  referencia: { geral: { min: 70, max: 120 } },
  ideal: { geral: 90 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 70, nivel: "Deficiente", cor: "#ff9800" },
      Q2: { min: 70, max: 80, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 80, max: 100, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 100, max: 120, nivel: "Normal", cor: "#4caf50" },
      Q5: { min: 120, max: 999, nivel: "Elevado", cor: "#ffc107" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Zinco deficiente - Muito comum!",
      causas: ["Dieta pobre", "Vegetarianismo", "Má absorção", "Fitatos", "Álcool"],
      sintomas: ["Baixa imunidade", "Queda de cabelo", "Acne", "Disfunção erétil", "Má cicatrização", "Perda de paladar"],
      orientacoes: ["Zinco picolinato ou bisglicinato: 30-50mg/dia"]
    },
    Q3: { significado: "Zinco ideal" },
    Q5: {
      significado: "Zinco elevado (raro)",
      causas: ["Suplementação excessiva"],
      riscos: ["Pode reduzir absorção de cobre"]
    }
  },
  correlacoes: ["testosteronaTotal", "linfocitos"]
};

// HEMOGRAMA COMPLETO - EXAMES FALTANTES
LABORATORY_EXAMS_COMPLETE.hemoglobina = {
  nome: "Hemoglobina",
  categoria: "Hemograma",
  unidade: "g/dL",
  funcao: "Proteína que transporta oxigênio no sangue. Essencial para energia celular.",
  referencia: {
    mulher: { min: 12.0, max: 16.0 },
    homem: { min: 13.5, max: 17.5 }
  },
  ideal: {
    mulher: 14.0,
    homem: 15.5
  },
  quintis: {
    mulher: {
      Q1: { min: 0, max: 11.0, nivel: "Anemia Moderada/Severa", cor: "#f44336" },
      Q2: { min: 11.0, max: 12.5, nivel: "Anemia Leve", cor: "#ff9800" },
      Q3: { min: 12.5, max: 15.0, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 15.0, max: 16.0, nivel: "Normal", cor: "#ffc107" },
      Q5: { min: 16.0, max: 999, nivel: "Elevado", cor: "#ff5722" }
    },
    homem: {
      Q1: { min: 0, max: 12.0, nivel: "Anemia Moderada/Severa", cor: "#f44336" },
      Q2: { min: 12.0, max: 14.0, nivel: "Anemia Leve", cor: "#ff9800" },
      Q3: { min: 14.0, max: 16.5, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 16.5, max: 17.5, nivel: "Normal", cor: "#ffc107" },
      Q5: { min: 17.5, max: 999, nivel: "Elevado", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Anemia significativa - Oxigenação tecidual comprometida",
      causas: ["Deficiência de ferro severa", "Perda sanguínea", "Deficiência de B12/folato", "Doença crônica"],
      sintomas: ["Fadiga intensa", "Palidez", "Falta de ar", "Taquicardia", "Tontura"],
      investigar: ["Ferritina", "Vitamina B12", "Ácido fólico", "Sangue oculto nas fezes"],
      urgente: true
    },
    Q2: {
      significado: "Anemia leve - Redução da capacidade de oxigenação",
      causas: ["Deficiência funcional de ferro", "Inflamação", "Déficit nutricional"],
      orientacoes: ["Ferro quelado: 30mg/dia", "Vitamina C: 500mg junto com ferro", "Investigar causa base"]
    },
    Q3: { significado: "Hemoglobina ideal - Oxigenação adequada" },
    Q5: {
      significado: "Hemoglobina elevada - Policitemia",
      causas: ["Desidratação", "Tabagismo", "Doença pulmonar", "Policitemia vera"],
      riscos: ["Aumento da viscosidade sanguínea", "Risco de trombose"]
    }
  },
  correlacoes: ["hemacias", "ferritina", "vcm"]
};

LABORATORY_EXAMS_COMPLETE.hematocrito = {
  nome: "Hematócrito",
  categoria: "Hemograma",
  unidade: "%",
  funcao: "Percentual de volume ocupado pelas hemácias no sangue. Indica capacidade de transporte de oxigênio.",
  referencia: {
    mulher: { min: 36, max: 48 },
    homem: { min: 40, max: 54 }
  },
  ideal: {
    mulher: 42,
    homem: 47
  },
  quintis: {
    mulher: {
      Q1: { min: 0, max: 34, nivel: "Muito Baixo", cor: "#f44336" },
      Q2: { min: 34, max: 38, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: 38, max: 46, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 46, max: 48, nivel: "Normal", cor: "#ffc107" },
      Q5: { min: 48, max: 999, nivel: "Elevado", cor: "#ff5722" }
    },
    homem: {
      Q1: { min: 0, max: 38, nivel: "Muito Baixo", cor: "#f44336" },
      Q2: { min: 38, max: 42, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: 42, max: 52, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 52, max: 54, nivel: "Normal", cor: "#ffc107" },
      Q5: { min: 54, max: 999, nivel: "Elevado", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Hematócrito baixo - Anemia",
      causas: ["Deficiência de ferro", "Perda sanguínea", "Hemólise", "Hidratação excessiva"],
      investigar: ["Hemoglobina", "Ferritina", "Reticulócitos"]
    },
    Q3: { significado: "Hematócrito ideal" },
    Q5: {
      significado: "Hematócrito elevado - Policitemia/Desidratação",
      causas: ["Desidratação", "Policitemia", "Hipóxia crônica", "Tabagismo"],
      orientacoes: ["Avaliar hidratação", "Investigar causa"]
    }
  },
  correlacoes: ["hemoglobina", "hemacias"]
};

LABORATORY_EXAMS_COMPLETE.vcm = {
  nome: "VCM (Volume Corpuscular Médio)",
  categoria: "Hemograma",
  unidade: "fL",
  funcao: "Tamanho médio das hemácias. Ajuda a classificar o tipo de anemia.",
  referencia: { geral: { min: 80, max: 100 } },
  ideal: { geral: 90 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 80, nivel: "Microcítico", cor: "#ff9800" },
      Q2: { min: 80, max: 85, nivel: "Baixo-Normal", cor: "#ffc107" },
      Q3: { min: 85, max: 95, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 95, max: 100, nivel: "Normal-Alto", cor: "#ffc107" },
      Q5: { min: 100, max: 999, nivel: "Macrocítico", cor: "#ff9800" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "VCM baixo - Anemia microcítica",
      causas: ["Deficiência de ferro (mais comum)", "Talassemia", "Anemia de doença crônica"],
      investigar: ["Ferritina", "Ferro sérico", "Eletroforese de hemoglobina"]
    },
    Q3: { significado: "VCM ideal - Hemácias de tamanho normal" },
    Q5: {
      significado: "VCM elevado - Anemia macrocítica",
      causas: ["Deficiência de B12", "Deficiência de folato", "Hipotireoidismo", "Álcool", "Medicamentos"],
      investigar: ["Vitamina B12", "Ácido fólico", "TSH", "Homocisteína"]
    }
  },
  correlacoes: ["hemoglobina", "ferritina", "vitaminaB12"]
};

LABORATORY_EXAMS_COMPLETE.plaquetas = {
  nome: "Plaquetas",
  categoria: "Hemograma",
  unidade: "/mm³",
  funcao: "Células responsáveis pela coagulação sanguínea. Essenciais para prevenir sangramentos.",
  referencia: { geral: { min: 150000, max: 450000 } },
  ideal: { geral: 250000 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 100000, nivel: "Trombocitopenia Grave", cor: "#f44336" },
      Q2: { min: 100000, max: 150000, nivel: "Trombocitopenia Leve", cor: "#ff9800" },
      Q3: { min: 150000, max: 350000, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 350000, max: 450000, nivel: "Normal-Alto", cor: "#ffc107" },
      Q5: { min: 450000, max: 9999999, nivel: "Trombocitose", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Plaquetas muito baixas - Risco de sangramento",
      causas: ["Destruição plaquetária (PTI)", "Quimioterapia", "Infecções", "Deficiência de B12/folato"],
      riscos: ["Sangramentos espontâneos", "Hematomas"],
      urgente: true
    },
    Q2: {
      significado: "Plaquetas baixas - Atenção",
      orientacoes: ["Evitar anticoagulantes", "Investigar causa", "Suplementar B12 e folato se deficiente"]
    },
    Q3: { significado: "Plaquetas ideais" },
    Q5: {
      significado: "Plaquetas elevadas - Trombocitose",
      causas: ["Inflamação", "Deficiência de ferro", "Infecções", "Pós-cirúrgico", "Doenças mieloproliferativas"],
      riscos: ["Risco aumentado de trombose"],
      investigar: ["Ferritina", "Proteína C reativa", "Exames complementares"]
    }
  },
  correlacoes: ["proteinaCreativa", "ferritina"]
};

LABORATORY_EXAMS_COMPLETE.leucocitos = {
  nome: "Leucócitos (Glóbulos Brancos)",
  categoria: "Hemograma",
  unidade: "/mm³",
  funcao: "Células de defesa do organismo. Combatem infecções e inflamações.",
  referencia: { geral: { min: 4000, max: 11000 } },
  ideal: { geral: 7000 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 3500, nivel: "Leucopenia", cor: "#ff9800" },
      Q2: { min: 3500, max: 5000, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 5000, max: 9000, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 9000, max: 11000, nivel: "Normal-Alto", cor: "#ffc107" },
      Q5: { min: 11000, max: 999999, nivel: "Leucocitose", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Leucócitos baixos - Imunidade comprometida",
      causas: ["Infecções virais", "Deficiências nutricionais", "Doenças autoimunes", "Medicamentos"],
      riscos: ["Maior susceptibilidade a infecções"]
    },
    Q3: { significado: "Leucócitos ideais" },
    Q5: {
      significado: "Leucócitos elevados - Resposta inflamatória/infecciosa",
      causas: ["Infecção bacteriana", "Inflamação aguda", "Estresse", "Tabagismo", "Leucemia"],
      investigar: ["Neutrófilos", "Proteína C reativa", "Hemograma com diferencial"]
    }
  },
  correlacoes: ["neutrofilos", "linfocitos", "proteinaCreativa"]
};

// ========================================================================
// FUNÇÃO RENAL AVANÇADA
// ========================================================================

LABORATORY_EXAMS_COMPLETE.cistatinaC = {
  nome: "Cistatina C",
  categoria: "Função Renal",
  unidade: "mg/L",
  funcao: "Marcador de função renal mais sensível que creatinina. Não é afetado por massa muscular, idade ou sexo. Detecta disfunção renal precoce.",
  referencia: { geral: { min: 0.5, max: 1.0 } },
  ideal: { geral: 0.8 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 0.6, nivel: "Ótimo", cor: "#4caf50" },
      Q2: { min: 0.6, max: 0.9, nivel: "Normal", cor: "#4caf50" },
      Q3: { min: 0.9, max: 1.1, nivel: "Limítrofe", cor: "#ffc107" },
      Q4: { min: 1.1, max: 1.5, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 1.5, max: 999, nivel: "Muito Elevado", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: { significado: "Cistatina C ótima - Função renal excelente" },
    Q5: {
      significado: "Cistatina C muito elevada - Disfunção renal significativa",
      causas: ["Doença renal crônica", "Diabetes", "Hipertensão", "Uso crônico de anti-inflamatórios"],
      riscos: ["Progressão para insuficiência renal", "Risco cardiovascular aumentado"],
      orientacoes: ["Hidratação adequada", "Controle de pressão arterial e glicemia", "Evitar nefrotóxicos", "Dieta com proteína moderada"],
      urgente: true
    }
  },
  correlacoes: ["creatinina", "ureia", "acidoUrico", "tgf"]
};

// ========================================================================
// PAINEL TIREOIDIANO COMPLETO
// ========================================================================

LABORATORY_EXAMS_COMPLETE.tsh = {
  nome: "TSH (Hormônio Tireoestimulante)",
  categoria: "Função Tireoidiana",
  unidade: "μUI/mL",
  funcao: "Hormônio produzido pela hipófise que estimula a tireoide a produzir T3 e T4. Principal exame para rastreio de disfunção tireoidiana.",
  referencia: { geral: { min: 0.4, max: 4.5 } },
  ideal: { geral: 1.5 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 0.3, nivel: "Muito Baixo - Hipertireoidismo", cor: "#ff5722" },
      Q2: { min: 0.3, max: 1.0, nivel: "Baixo-Normal", cor: "#ffc107" },
      Q3: { min: 1.0, max: 2.0, nivel: "Ideal Funcional", cor: "#4caf50" },
      Q4: { min: 2.0, max: 3.5, nivel: "Elevado-Normal", cor: "#ffc107" },
      Q5: { min: 3.5, max: 999, nivel: "Alto - Hipotireoidismo", cor: "#ff9800" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "TSH muito baixo - Possível hipertireoidismo",
      causas: ["Doença de Graves", "Nódulos tireoidianos hiperfuncionantes", "Tireoidite subaguda", "Excesso de reposição hormonal"],
      sintomas: ["Palpitações", "Ansiedade", "Perda de peso", "Tremores", "Intolerância ao calor"],
      orientacoes: ["Avaliar T4 livre e T3 livre", "Investigar autoanticorpos (TRAb)", "Ultrassom de tireoide"]
    },
    Q3: { significado: "TSH ideal - Função tireoidiana ótima" },
    Q5: {
      significado: "TSH elevado - Hipotireoidismo ou hipotireoidismo subclínico",
      causas: ["Tireoidite de Hashimoto", "Deficiência de iodo", "Deficiência de selênio", "Pós-tireoidectomia"],
      sintomas: ["Fadiga", "Ganho de peso", "Queda de cabelo", "Pele seca", "Constipação", "Depressão"],
      orientacoes: ["Avaliar T4 livre", "Anti-TPO e Anti-tireoglobulina", "Suplementar selênio (200mcg/dia)", "Verificar vitamina D"]
    }
  },
  correlacoes: ["t4Livre", "t3Livre", "antiTPO", "vitaminaD", "selenio"]
};

LABORATORY_EXAMS_COMPLETE.t4Livre = {
  nome: "T4 Livre (Tiroxina Livre)",
  categoria: "Função Tireoidiana",
  unidade: "ng/dL",
  funcao: "Forma livre (ativa) do hormônio T4. Principal hormônio produzido pela tireoide, convertido em T3 (forma mais ativa) nos tecidos.",
  referencia: { geral: { min: 0.8, max: 1.8 } },
  ideal: { geral: 1.4 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 0.8, nivel: "Muito Baixo", cor: "#ff5722" },
      Q2: { min: 0.8, max: 1.1, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: 1.1, max: 1.5, nivel: "Ideal Funcional", cor: "#4caf50" },
      Q4: { min: 1.5, max: 1.8, nivel: "Elevado-Normal", cor: "#ffc107" },
      Q5: { min: 1.8, max: 999, nivel: "Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "T4 livre muito baixo - Hipotireoidismo manifesto",
      sintomas: ["Fadiga severa", "Metabolismo lento", "Ganho de peso"],
      orientacoes: ["Reposição com levotiroxina", "Avaliar causas subjacentes"]
    },
    Q3: { significado: "T4 livre ideal - Produção tireoidiana adequada" },
    Q5: {
      significado: "T4 livre elevado - Hipertireoidismo",
      sintomas: ["Taquicardia", "Ansiedade", "Perda de peso"],
      orientacoes: ["Investigar causa", "Considerar antitireoidianos"]
    }
  },
  correlacoes: ["tsh", "t3Livre", "t3Reverso"]
};

LABORATORY_EXAMS_COMPLETE.t3Livre = {
  nome: "T3 Livre (Triiodotironina Livre)",
  categoria: "Função Tireoidiana",
  unidade: "pg/mL",
  funcao: "Forma ativa do hormônio tireoidiano. 80% do T3 é convertido a partir do T4 nos tecidos periféricos. Responsável pela maioria dos efeitos metabólicos.",
  referencia: { geral: { min: 2.0, max: 4.4 } },
  ideal: { geral: 3.2 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 2.0, nivel: "Muito Baixo", cor: "#ff5722" },
      Q2: { min: 2.0, max: 2.8, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: 2.8, max: 3.4, nivel: "Ideal Funcional", cor: "#4caf50" },
      Q4: { min: 3.4, max: 4.2, nivel: "Normal-Alto", cor: "#ffc107" },
      Q5: { min: 4.2, max: 999, nivel: "Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "T3 livre muito baixo - Hipotireoidismo ou baixa conversão",
      causas: ["Hipotireoidismo", "Deficiência de selênio ou zinco", "Estresse crônico", "Inflamação", "Uso de beta-bloqueadores"],
      sintomas: ["Fadiga", "Depressão", "Metabolismo lento"],
      orientacoes: ["Selênio 200mcg/dia", "Zinco 30mg/dia", "Avaliar inflamação", "Considerar T3 na reposição"]
    },
    Q3: { significado: "T3 livre ideal - Metabolismo ativo otimizado" },
    Q5: { significado: "T3 livre elevado - Hipertireoidismo" }
  },
  correlacoes: ["t4Livre", "t3Reverso", "selenio", "zinco"]
};

LABORATORY_EXAMS_COMPLETE.t3Reverso = {
  nome: "T3 Reverso (rT3)",
  categoria: "Função Tireoidiana",
  unidade: "ng/dL",
  funcao: "Forma inativa do T3. Produzido quando o corpo está em estresse ou inflamação, bloqueando a ação do T3 ativo. Marcador de síndrome do T3 baixo.",
  referencia: { geral: { min: 9, max: 27 } },
  ideal: { geral: 15 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 10, nivel: "Baixo", cor: "#4caf50" },
      Q2: { min: 10, max: 18, nivel: "Normal", cor: "#4caf50" },
      Q3: { min: 18, max: 25, nivel: "Elevado-Normal", cor: "#ffc107" },
      Q4: { min: 25, max: 35, nivel: "Alto", cor: "#ff9800" },
      Q5: { min: 35, max: 999, nivel: "Muito Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q2: { significado: "T3 reverso normal - Conversão tireoidiana adequada" },
    Q5: {
      significado: "T3 reverso muito elevado - Bloqueio metabólico da tireoide",
      causas: ["Estresse crônico", "Inflamação sistêmica", "Resistência insulínica", "Dietas restritivas", "Toxinas ambientais"],
      sintomas: ["Fadiga apesar de T4 e TSH normais", "Dificuldade de perder peso", "Sintomas de hipotireoidismo com exames normais"],
      orientacoes: ["Reduzir estresse", "Anti-inflamatórios naturais", "Suporte adrenal", "Detoxificação", "Melhorar conversão T4→T3"]
    }
  },
  correlacoes: ["t3Livre", "cortisol", "proteinaCreativa", "selenio"]
};

LABORATORY_EXAMS_COMPLETE.antiTPO = {
  nome: "Anti-TPO (Anticorpos Anti-Peroxidase)",
  categoria: "Função Tireoidiana",
  unidade: "UI/mL",
  funcao: "Anticorpos contra a enzima tireoperoxidase. Marcador de autoimunidade tireoidiana, especialmente Tireoidite de Hashimoto.",
  referencia: { geral: { min: 0, max: 35 } },
  ideal: { geral: 5 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 10, nivel: "Negativo", cor: "#4caf50" },
      Q2: { min: 10, max: 35, nivel: "Normal", cor: "#4caf50" },
      Q3: { min: 35, max: 100, nivel: "Levemente Elevado", cor: "#ffc107" },
      Q4: { min: 100, max: 500, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 500, max: 9999, nivel: "Muito Elevado", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: { significado: "Anti-TPO negativo - Sem autoimunidade tireoidiana" },
    Q5: {
      significado: "Anti-TPO muito elevado - Tireoidite autoimune ativa (Hashimoto)",
      causas: ["Predisposição genética", "Deficiência de vitamina D e selênio", "Disbiose intestinal", "Glúten"],
      riscos: ["Progressão para hipotireoidismo", "Outras doenças autoimunes"],
      orientacoes: ["Vitamina D 5000-10000 UI/dia", "Selênio 200mcg/dia", "Dieta sem glúten", "Saúde intestinal", "Reduzir estresse"]
    }
  },
  correlacoes: ["tsh", "vitaminaD", "selenio", "zonulina"]
};

LABORATORY_EXAMS_COMPLETE.calcitonina = {
  nome: "Calcitonina",
  categoria: "Função Tireoidiana",
  unidade: "pg/mL",
  funcao: "Hormônio produzido pelas células C da tireoide. Regula cálcio sanguíneo. Marcador de carcinoma medular de tireoide.",
  referencia: {
    homem: { min: 0, max: 8.5 },
    mulher: { min: 0, max: 5.0 }
  },
  ideal: {
    homem: 3,
    mulher: 2
  },
  quintis: {
    homem: {
      Q1: { min: 0, max: 2, nivel: "Baixo", cor: "#4caf50" },
      Q2: { min: 2, max: 5, nivel: "Normal", cor: "#4caf50" },
      Q3: { min: 5, max: 8.5, nivel: "Normal-Alto", cor: "#ffc107" },
      Q4: { min: 8.5, max: 20, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 20, max: 9999, nivel: "Muito Elevado", cor: "#ff5722" }
    },
    mulher: {
      Q1: { min: 0, max: 1, nivel: "Baixo", cor: "#4caf50" },
      Q2: { min: 1, max: 3, nivel: "Normal", cor: "#4caf50" },
      Q3: { min: 3, max: 5, nivel: "Normal-Alto", cor: "#ffc107" },
      Q4: { min: 5, max: 15, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 15, max: 9999, nivel: "Muito Elevado", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q2: { significado: "Calcitonina normal - Sem evidência de neoplasia" },
    Q5: {
      significado: "Calcitonina muito elevada - Forte suspeita de carcinoma medular",
      causas: ["Carcinoma medular de tireoide", "Hiperplasia de células C", "Insuficiência renal"],
      orientacoes: ["Investigação oncológica urgente", "Ultrassom de tireoide", "Avaliação endocrinológica"],
      urgente: true
    }
  },
  correlacoes: ["tsh", "calcioSerico", "pth"]
};

// ========================================================================
// HORMÔNIOS SEXUAIS E REPRODUTIVOS
// ========================================================================

LABORATORY_EXAMS_COMPLETE.testosteronaTotal = {
  nome: "Testosterona Total",
  categoria: "Hormônios Sexuais",
  unidade: "ng/dL",
  funcao: "Principal hormônio androgênico. Essencial para massa muscular, libido, energia, função cognitiva e saúde óssea.",
  referencia: {
    homem: { min: 300, max: 1000 },
    mulher: { min: 15, max: 70 }
  },
  ideal: {
    homem: 700,
    mulher: 40
  },
  quintis: {
    homem: {
      Q1: { min: 0, max: 250, nivel: "Muito Baixo", cor: "#ff5722" },
      Q2: { min: 250, max: 400, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: 400, max: 800, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 800, max: 1000, nivel: "Alto-Normal", cor: "#4caf50" },
      Q5: { min: 1000, max: 9999, nivel: "Muito Alto", cor: "#ff9800" }
    },
    mulher: {
      Q1: { min: 0, max: 10, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 10, max: 25, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 25, max: 55, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 55, max: 70, nivel: "Elevado", cor: "#ffc107" },
      Q5: { min: 70, max: 9999, nivel: "Muito Alto", cor: "#ff9800" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Testosterona muito baixa - Hipogonadismo",
      causas: ["Envelhecimento", "Obesidade", "Estresse crônico", "Deficiência de zinco/vitamina D", "Uso de opioides"],
      sintomas: ["Fadiga", "Baixa libido", "Perda de massa muscular", "Depressão", "Disfunção erétil (homens)"],
      orientacoes: ["Zinco 30mg/dia", "Vitamina D", "Exercícios de resistência", "Reduzir estresse", "Avaliar reposição hormonal"]
    },
    Q3: { significado: "Testosterona ideal - Vitalidade preservada" },
    Q5: {
      significado: "Testosterona muito elevada",
      causas: ["SOP (mulheres)", "Tumor produtor de andrógenos", "Uso de anabolizantes"],
      sintomas: ["Acne", "Oleosidade", "Queda de cabelo", "Agressividade (homens)", "Hirsutismo (mulheres)"]
    }
  },
  correlacoes: ["testosteronaLivre", "shbg", "lh", "estradiol", "zinco", "vitaminaD"]
};

LABORATORY_EXAMS_COMPLETE.testosteronaLivre = {
  nome: "Testosterona Livre",
  categoria: "Hormônios Sexuais",
  unidade: "pg/mL",
  funcao: "Fração biodisponível da testosterona (não ligada à SHBG). Melhor reflete a atividade androgênica real.",
  referencia: {
    homem: { min: 50, max: 210 },
    mulher: { min: 0.5, max: 8.5 }
  },
  ideal: {
    homem: 130,
    mulher: 4
  },
  quintis: {
    homem: {
      Q1: { min: 0, max: 35, nivel: "Muito Baixo", cor: "#ff5722" },
      Q2: { min: 35, max: 70, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: 70, max: 180, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 180, max: 210, nivel: "Alto-Normal", cor: "#4caf50" },
      Q5: { min: 210, max: 9999, nivel: "Muito Alto", cor: "#ff9800" }
    },
    mulher: {
      Q1: { min: 0, max: 0.3, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 0.3, max: 1.5, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 1.5, max: 6.5, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 6.5, max: 8.5, nivel: "Elevado", cor: "#ffc107" },
      Q5: { min: 8.5, max: 9999, nivel: "Muito Alto", cor: "#ff9800" }
    }
  },
  interpretacao: {
    Q1: { significado: "Testosterona livre muito baixa - Sintomas de hipogonadismo mais evidentes" },
    Q3: { significado: "Testosterona livre ideal - Função androgênica ótima" }
  },
  correlacoes: ["testosteronaTotal", "shbg", "insulina"]
};

LABORATORY_EXAMS_COMPLETE.estradiol = {
  nome: "Estradiol (E2)",
  categoria: "Hormônios Sexuais",
  unidade: "pg/mL",
  funcao: "Principal estrogênio. Essencial para saúde óssea, cardiovascular, cognitiva e reprodutiva. Em homens, derivado da aromatização da testosterona.",
  referencia: {
    mulher: { min: 30, max: 400 },
    homem: { min: 10, max: 50 }
  },
  ideal: {
    mulher: 150,
    homem: 25
  },
  quintis: {
    mulher: {
      Q1: { min: 0, max: 20, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 20, max: 50, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 50, max: 250, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 250, max: 400, nivel: "Elevado", cor: "#ffc107" },
      Q5: { min: 400, max: 9999, nivel: "Muito Alto", cor: "#ff9800" }
    },
    homem: {
      Q1: { min: 0, max: 10, nivel: "Muito Baixo", cor: "#ffc107" },
      Q2: { min: 10, max: 20, nivel: "Ideal", cor: "#4caf50" },
      Q3: { min: 20, max: 35, nivel: "Normal", cor: "#4caf50" },
      Q4: { min: 35, max: 50, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 50, max: 9999, nivel: "Muito Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Estradiol muito baixo",
      sintomas: ["Ondas de calor", "Ressecamento vaginal", "Osteopenia", "Alterações de humor", "Baixa libido"],
      orientacoes: ["Avaliar menopausa/perimenopausa", "Fitoestrógenos", "Considerar reposição"]
    },
    Q3: { significado: "Estradiol ideal - Função estrogênica adequada" },
    Q5: {
      significado: "Estradiol muito elevado - Dominância estrogênica",
      causas: ["SOP", "Obesidade", "Xenoestrogênios", "Disfunção hepática"],
      riscos: ["Câncer de mama", "Endometriose", "Miomas"],
      orientacoes: ["DIM (diindolilmetano)", "Cálcio-D-glucarato", "Detoxificação hepática", "Reduzir peso"]
    }
  },
  correlacoes: ["progesterona", "testosterona", "shbg"]
};

LABORATORY_EXAMS_COMPLETE.progesterona = {
  nome: "Progesterona",
  categoria: "Hormônios Sexuais",
  unidade: "ng/mL",
  funcao: "Hormônio produzido após ovulação. Prepara endométrio para gravidez, regula ciclo menstrual, efeito ansiolítico.",
  referencia: {
    mulher: { min: 0.1, max: 30 }
  },
  ideal: {
    mulher: 15
  },
  quintis: {
    mulher: {
      Q1: { min: 0, max: 3, nivel: "Muito Baixo - Anovulação", cor: "#ff9800" },
      Q2: { min: 3, max: 8, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 8, max: 20, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 20, max: 30, nivel: "Alto-Normal", cor: "#4caf50" },
      Q5: { min: 30, max: 999, nivel: "Muito Alto", cor: "#ffc107" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Progesterona muito baixa - Anovulação ou fase luteal curta",
      causas: ["Anovulação", "Estresse crônico", "Disfunção adrenal", "SOP"],
      sintomas: ["TPM severa", "Ansiedade", "Insônia", "Irregularidade menstrual", "Infertilidade"],
      orientacoes: ["Vitex agnus-castus", "Magnésio", "Vitamina B6", "Reduzir estresse", "Progesterona bioidêntica"]
    },
    Q3: { significado: "Progesterona ideal - Ovulação funcional" }
  },
  correlacoes: ["estradiol", "cortisol", "lh", "fsh"]
};

LABORATORY_EXAMS_COMPLETE.shbg = {
  nome: "SHBG (Globulina Ligadora de Hormônios Sexuais)",
  categoria: "Hormônios Sexuais",
  unidade: "nmol/L",
  funcao: "Proteína que liga testosterona e estradiol no sangue, regulando sua disponibilidade. Níveis baixos aumentam hormônios livres.",
  referencia: {
    homem: { min: 10, max: 57 },
    mulher: { min: 18, max: 144 }
  },
  ideal: {
    homem: 35,
    mulher: 70
  },
  quintis: {
    homem: {
      Q1: { min: 0, max: 10, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 10, max: 25, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 25, max: 45, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 45, max: 57, nivel: "Elevado", cor: "#ffc107" },
      Q5: { min: 57, max: 999, nivel: "Muito Alto", cor: "#ff9800" }
    },
    mulher: {
      Q1: { min: 0, max: 20, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 20, max: 40, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 40, max: 100, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 100, max: 144, nivel: "Elevado", cor: "#ffc107" },
      Q5: { min: 144, max: 999, nivel: "Muito Alto", cor: "#ff9800" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "SHBG muito baixa - Excesso de hormônios livres",
      causas: ["Resistência insulínica", "SOP", "Hipotireoidismo", "Obesidade"],
      sintomas: ["Acne", "Hirsutismo", "Queda de cabelo"],
      orientacoes: ["Controlar insulina", "Perder peso", "Exercícios"]
    },
    Q5: {
      significado: "SHBG muito elevada - Redução de hormônios livres",
      causas: ["Hipertireoidismo", "Uso de estrogênios", "Doença hepática", "Anorexia"],
      sintomas: ["Sintomas de deficiência hormonal apesar de níveis totais normais"]
    }
  },
  correlacoes: ["testosteronaLivre", "insulina", "tsh"]
};

LABORATORY_EXAMS_COMPLETE.lh = {
  nome: "LH (Hormônio Luteinizante)",
  categoria: "Hormônios Sexuais",
  unidade: "mUI/mL",
  funcao: "Estimula ovulação (mulheres) e produção de testosterona (homens). Secretado pela hipófise.",
  referencia: {
    homem: { min: 1.5, max: 9.3 },
    mulher: { min: 2, max: 90 }
  },
  ideal: {
    homem: 5,
    mulher: 15
  },
  quintis: {
    homem: {
      Q1: { min: 0, max: 1, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 1, max: 2.5, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 2.5, max: 7, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 7, max: 9.3, nivel: "Elevado", cor: "#ffc107" },
      Q5: { min: 9.3, max: 999, nivel: "Muito Alto", cor: "#ff9800" }
    },
    mulher: {
      Q1: { min: 0, max: 2, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 2, max: 8, nivel: "Fase Folicular", cor: "#4caf50" },
      Q3: { min: 8, max: 30, nivel: "Normal", cor: "#4caf50" },
      Q4: { min: 30, max: 70, nivel: "Pico Ovulatório", cor: "#4caf50" },
      Q5: { min: 70, max: 999, nivel: "Muito Alto", cor: "#ff9800" }
    }
  },
  interpretacao: {
    Q1: { significado: "LH muito baixo - Hipogonadismo hipogonadotrófico" },
    Q5: {
      significado: "LH muito elevado - Menopausa ou falência gonadal",
      causas: ["Menopausa", "Falência ovariana prematura", "SOP", "Síndrome de Klinefelter"]
    }
  },
  correlacoes: ["fsh", "testosterona", "estradiol"]
};

LABORATORY_EXAMS_COMPLETE.fsh = {
  nome: "FSH (Hormônio Folículo-Estimulante)",
  categoria: "Hormônios Sexuais",
  unidade: "mUI/mL",
  funcao: "Estimula maturação folicular (mulheres) e espermatogênese (homens). Secretado pela hipófise.",
  referencia: {
    homem: { min: 1.5, max: 12.4 },
    mulher: { min: 3, max: 120 }
  },
  ideal: {
    homem: 6,
    mulher: 10
  },
  quintis: {
    homem: {
      Q1: { min: 0, max: 1, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 1, max: 3, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 3, max: 10, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 10, max: 12.4, nivel: "Elevado", cor: "#ffc107" },
      Q5: { min: 12.4, max: 999, nivel: "Muito Alto", cor: "#ff9800" }
    },
    mulher: {
      Q1: { min: 0, max: 3, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 3, max: 10, nivel: "Fase Folicular", cor: "#4caf50" },
      Q3: { min: 10, max: 20, nivel: "Normal", cor: "#4caf50" },
      Q4: { min: 20, max: 40, nivel: "Elevado", cor: "#ffc107" },
      Q5: { min: 40, max: 999, nivel: "Menopausa", cor: "#ff9800" }
    }
  },
  interpretacao: {
    Q2: { significado: "FSH normal - Função reprodutiva preservada" },
    Q5: {
      significado: "FSH muito elevado - Menopausa ou reserva ovariana diminuída",
      causas: ["Menopausa", "Falência ovariana prematura", "Reserva ovariana baixa"]
    }
  },
  correlacoes: ["lh", "estradiol", "amh"]
};

LABORATORY_EXAMS_COMPLETE.prolactina = {
  nome: "Prolactina",
  categoria: "Hormônios Sexuais",
  unidade: "ng/mL",
  funcao: "Hormônio da lactação. Em excesso, suprime hormônios sexuais causando infertilidade e disfunções.",
  referencia: {
    homem: { min: 2, max: 18 },
    mulher: { min: 2, max: 30 }
  },
  ideal: {
    homem: 10,
    mulher: 15
  },
  quintis: {
    homem: {
      Q1: { min: 0, max: 2, nivel: "Muito Baixo", cor: "#4caf50" },
      Q2: { min: 2, max: 10, nivel: "Ideal", cor: "#4caf50" },
      Q3: { min: 10, max: 18, nivel: "Normal", cor: "#4caf50" },
      Q4: { min: 18, max: 30, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 30, max: 9999, nivel: "Hiperprolactinemia", cor: "#ff5722" }
    },
    mulher: {
      Q1: { min: 0, max: 5, nivel: "Baixo", cor: "#4caf50" },
      Q2: { min: 5, max: 20, nivel: "Ideal", cor: "#4caf50" },
      Q3: { min: 20, max: 30, nivel: "Normal", cor: "#4caf50" },
      Q4: { min: 30, max: 50, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 50, max: 9999, nivel: "Hiperprolactinemia", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q2: { significado: "Prolactina ideal" },
    Q5: {
      significado: "Prolactina muito elevada - Hiperprolactinemia",
      causas: ["Prolactinoma (tumor hipofisário)", "Uso de antipsicóticos", "Hipotireoidismo", "Estresse", "Insuficiência renal"],
      sintomas: ["Galactorreia", "Amenorreia", "Infertilidade", "Baixa libido", "Ginecomastia (homens)"],
      orientacoes: ["Ressonância de sela túrcica", "Avaliar TSH", "Vitex agnus-castus", "Reduzir estresse"],
      urgente: true
    }
  },
  correlacoes: ["tsh", "estradiol", "testosterona"]
};

LABORATORY_EXAMS_COMPLETE.dhea = {
  nome: "DHEA (Desidroepiandrosterona)",
  categoria: "Hormônios Adrenais",
  unidade: "μg/dL",
  funcao: "Hormônio precursor de estrogênios e testosterona. Produzido nas adrenais. Anti-inflamatório e neuroprotetor. Declina com envelhecimento.",
  referencia: {
    homem: { min: 180, max: 1250 },
    mulher: { min: 65, max: 380 }
  },
  ideal: {
    homem: 400,
    mulher: 250
  },
  quintis: {
    homem: {
      Q1: { min: 0, max: 150, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 150, max: 300, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 300, max: 700, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 700, max: 1250, nivel: "Normal", cor: "#4caf50" },
      Q5: { min: 1250, max: 9999, nivel: "Muito Alto", cor: "#ff9800" }
    },
    mulher: {
      Q1: { min: 0, max: 50, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 50, max: 150, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 150, max: 350, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 350, max: 450, nivel: "Alto", cor: "#ffc107" },
      Q5: { min: 450, max: 9999, nivel: "Muito Alto", cor: "#ff9800" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "DHEA muito baixo - Fadiga adrenal",
      causas: ["Estresse crônico", "Insuficiência adrenal", "Envelhecimento", "Inflamação crônica"],
      sintomas: ["Fadiga", "Baixa libido", "Imunossupressão", "Depressão"],
      orientacoes: ["DHEA 25-50mg/dia", "Adaptógenos (Ashwagandha, Rhodiola)", "Vitamina C", "Reduzir estresse"]
    },
    Q3: { significado: "DHEA ideal - Vitalidade preservada" },
    Q5: {
      significado: "DHEA muito alto - SOP ou tumor adrenal",
      causas: ["SOP", "Tumor adrenal", "Uso excessivo de suplementos"]
    }
  },
  correlacoes: ["cortisol", "testosterona", "estradiol"]
};

LABORATORY_EXAMS_COMPLETE.cortisol = {
  nome: "Cortisol (Sérico Matinal)",
  categoria: "Hormônios Adrenais",
  unidade: "μg/dL",
  funcao: "Principal hormônio do estresse. Regula metabolismo de glicose, pressão arterial, imunidade e inflamação. Ritmo circadiano (alto pela manhã, baixo à noite).",
  referencia: { geral: { min: 5, max: 25 } },
  ideal: { geral: 15 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 5, nivel: "Muito Baixo - Fadiga Adrenal", cor: "#ff5722" },
      Q2: { min: 5, max: 10, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: 10, max: 20, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 20, max: 25, nivel: "Elevado", cor: "#ffc107" },
      Q5: { min: 25, max: 999, nivel: "Muito Alto - Estresse Crônico", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Cortisol muito baixo - Insuficiência adrenal ou fadiga crônica",
      causas: ["Estresse crônico prolongado", "Insuficiência adrenal", "Uso crônico de corticoides"],
      sintomas: ["Fadiga extrema", "Hipoglicemia", "Tontura ao levantar", "Baixa resiliência ao estresse"],
      orientacoes: ["Adaptógenos", "Vitamina C 2-3g/dia", "Sal do Himalaia", "Descanso adequado"],
      urgente: true
    },
    Q3: { significado: "Cortisol ideal - Resposta ao estresse equilibrada" },
    Q5: {
      significado: "Cortisol muito elevado - Estresse crônico ou Síndrome de Cushing",
      causas: ["Estresse crônico", "Ansiedade", "Síndrome de Cushing", "Depressão"],
      sintomas: ["Insônia", "Ganho de peso abdominal", "Resistência insulínica", "Hipertensão", "Ansiedade"],
      orientacoes: ["Técnicas de relaxamento", "Meditação", "Fosfatidilserina", "Magnésio", "Reduzir cafeína"]
    }
  },
  correlacoes: ["dhea", "glicose", "insulina", "proteinaCreativa"]
};

// ========================================================================
// AVALIAÇÃO METABÓLICA AVANÇADA
// ========================================================================

LABORATORY_EXAMS_COMPLETE.hba1c = {
  nome: "Hemoglobina Glicada (HbA1c)",
  categoria: "Avaliação Metabólica",
  unidade: "%",
  funcao: "Reflete média da glicemia nos últimos 60-90 dias por glicação da hemoglobina. Principal biomarcador de glicação e controle glicêmico crônico.",
  referencia: { geral: { min: 0, max: 5.2 } },
  ideal: { geral: 4.8 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 4.5, nivel: "Muito Baixo", cor: "#ffc107" },
      Q2: { min: 4.5, max: 5.2, nivel: "Ideal Funcional", cor: "#4caf50" },
      Q3: { min: 5.2, max: 5.7, nivel: "Normal-Alto", cor: "#ffc107" },
      Q4: { min: 5.7, max: 6.4, nivel: "Pré-Diabetes", cor: "#ff9800" },
      Q5: { min: 6.5, max: 99, nivel: "Diabetes", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q2: { significado: "HbA1c ótima - Mínima glicação e risco cardiovascular" },
    Q4: {
      significado: "HbA1c elevada - Pré-diabetes com glicação crônica",
      causas: ["Resistência insulínica", "Dieta rica em açúcares", "Sedentarismo"],
      riscos: ["Progressão para diabetes", "Complicações microvasculares"],
      orientacoes: ["Dieta low-carb", "Exercícios", "Berberina", "Canela", "Cromo"]
    },
    Q5: {
      significado: "HbA1c muito elevada - Diabetes com alto risco de complicações",
      riscos: ["Retinopatia", "Nefropatia", "Neuropatia", "Doença cardiovascular"],
      orientacoes: ["Controle glicêmico rigoroso", "Medicação", "Acompanhamento médico"],
      urgente: true
    }
  },
  correlacoes: ["glicose", "insulina", "homaIR", "triglicerideos"]
};

LABORATORY_EXAMS_COMPLETE.homaIR = {
  nome: "HOMA-IR (Índice de Resistência à Insulina)",
  categoria: "Avaliação Metabólica",
  unidade: "índice",
  funcao: "Calcula resistência insulínica a partir de glicose e insulina de jejum. Fórmula: (Glicose × Insulina) / 405. Valor = % de trabalho pancreático (HOMA 2 = 200% de esforço).",
  referencia: { geral: { min: 0, max: 1.5 } },
  ideal: { geral: 1.0 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 1.0, nivel: "Ótimo Funcional", cor: "#4caf50" },
      Q2: { min: 1.0, max: 1.5, nivel: "Limítrofe Funcional", cor: "#ffc107" },
      Q3: { min: 1.5, max: 2.5, nivel: "Resistência Inicial", cor: "#ff9800" },
      Q4: { min: 2.5, max: 4.0, nivel: "Resistência Moderada", cor: "#ff9800" },
      Q5: { min: 4.0, max: 99, nivel: "Resistência Severa", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: { significado: "HOMA-IR ótimo - Sensibilidade insulínica preservada" },
    Q4: {
      significado: "HOMA-IR elevado - Resistência insulínica moderada",
      causas: ["Obesidade", "Sedentarismo", "Dieta inadequada", "Estresse", "Sono inadequado"],
      riscos: ["Síndrome metabólica", "Diabetes tipo 2", "Esteatose hepática", "SOP"],
      orientacoes: ["Jejum intermitente", "Exercícios", "Berberina 1500mg/dia", "Inositol", "Canela"]
    },
    Q5: {
      significado: "HOMA-IR muito elevado - Resistência insulínica severa",
      riscos: ["Alto risco de diabetes", "Doença cardiovascular", "Esteatose hepática"],
      urgente: true
    }
  },
  correlacoes: ["glicose", "insulina", "triglicerideos", "hdl", "proteinaCreativa"]
};

LABORATORY_EXAMS_COMPLETE.adiponectina = {
  nome: "Adiponectina",
  categoria: "Avaliação Metabólica",
  unidade: "μg/mL",
  funcao: "Hormônio secretado por adipócitos com função anti-inflamatória e sensibilizadora de insulina. Níveis altos = menor risco metabólico.",
  referencia: {
    homem: { min: 4, max: 25 },
    mulher: { min: 5, max: 30 }
  },
  ideal: {
    homem: 12,
    mulher: 15
  },
  quintis: {
    homem: {
      Q1: { min: 0, max: 4, nivel: "Muito Baixo", cor: "#ff5722" },
      Q2: { min: 4, max: 8, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: 8, max: 18, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 18, max: 25, nivel: "Alto", cor: "#4caf50" },
      Q5: { min: 25, max: 999, nivel: "Muito Alto", cor: "#4caf50" }
    },
    mulher: {
      Q1: { min: 0, max: 5, nivel: "Muito Baixo", cor: "#ff5722" },
      Q2: { min: 5, max: 10, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: 10, max: 22, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 22, max: 30, nivel: "Alto", cor: "#4caf50" },
      Q5: { min: 30, max: 999, nivel: "Muito Alto", cor: "#4caf50" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Adiponectina muito baixa - Inflamação metabólica",
      causas: ["Obesidade visceral", "Resistência insulínica", "Síndrome metabólica"],
      riscos: ["Diabetes", "Aterosclerose", "Esteatose hepática"],
      orientacoes: ["Perder peso", "Exercícios aeróbicos", "Ômega-3", "Dieta anti-inflamatória"]
    },
    Q3: { significado: "Adiponectina ideal - Proteção metabólica" },
    Q5: { significado: "Adiponectina muito alta - Excelente proteção metabólica" }
  },
  correlacoes: ["homaIR", "triglicerideos", "proteinaCreativa", "shbg"]
};

LABORATORY_EXAMS_COMPLETE.leptina = {
  nome: "Leptina",
  categoria: "Hormônios Metabólicos",
  unidade: "ng/mL",
  funcao: "Hormônio da saciedade produzido por adipócitos. Níveis elevados indicam resistência à leptina e dificuldade de perder peso.",
  referencia: {
    homem: { min: 2, max: 5.6 },
    mulher: { min: 3.7, max: 11.1 }
  },
  ideal: {
    homem: 3.5,
    mulher: 7
  },
  quintis: {
    homem: {
      Q1: { min: 0, max: 2, nivel: "Baixo", cor: "#4caf50" },
      Q2: { min: 2, max: 4, nivel: "Ideal", cor: "#4caf50" },
      Q3: { min: 4, max: 5.6, nivel: "Normal", cor: "#ffc107" },
      Q4: { min: 5.6, max: 10, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 10, max: 999, nivel: "Muito Alto", cor: "#ff5722" }
    },
    mulher: {
      Q1: { min: 0, max: 3.7, nivel: "Baixo", cor: "#4caf50" },
      Q2: { min: 3.7, max: 7, nivel: "Ideal", cor: "#4caf50" },
      Q3: { min: 7, max: 11.1, nivel: "Normal", cor: "#ffc107" },
      Q4: { min: 11.1, max: 20, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 20, max: 999, nivel: "Muito Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q2: { significado: "Leptina ideal - Saciedade funcionando" },
    Q5: {
      significado: "Leptina muito elevada - Resistência à leptina",
      causas: ["Obesidade", "Resistência insulínica", "Inflamação crônica", "Sono inadequado"],
      sintomas: ["Fome constante", "Dificuldade de perder peso", "Compulsão alimentar"],
      orientacoes: ["Jejum intermitente", "Reduzir frutose", "Sono 7-9h", "Ômega-3", "Exercícios"]
    }
  },
  correlacoes: ["insulina", "homaIR", "proteinaCreativa"]
};

LABORATORY_EXAMS_COMPLETE.peptideoC = {
  nome: "Peptídeo C",
  categoria: "Avaliação Metabólica",
  unidade: "ng/mL",
  funcao: "Liberado em quantidades equimolares com insulina endógena. Marca função pancreática beta. Diferencia produção endógena de insulina exógena.",
  referencia: { geral: { min: 0.9, max: 7.1 } },
  ideal: { geral: 1.8 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 0.5, nivel: "Muito Baixo", cor: "#ff5722" },
      Q2: { min: 0.5, max: 1.2, nivel: "Baixo", cor: "#ff9800" },
      Q3: { min: 1.2, max: 3.0, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 3.0, max: 5.0, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 5.0, max: 99, nivel: "Muito Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Peptídeo C muito baixo - Falência pancreática",
      causas: ["Diabetes tipo 1", "Fase avançada de DM2", "Uso de insulina exógena"],
      riscos: ["Dependência de insulina"],
      urgente: true
    },
    Q3: { significado: "Peptídeo C ideal - Função pancreática preservada" },
    Q5: {
      significado: "Peptídeo C muito alto - Hiperinsulinemia compensatória",
      causas: ["Resistência insulínica severa", "Insulinoma (raro)"],
      orientacoes: ["Investigar resistência insulínica", "Controlar glicemia"]
    }
  },
  correlacoes: ["insulina", "glicose", "homaIR"]
};

LABORATORY_EXAMS_COMPLETE.igf1 = {
  nome: "IGF-1 (Somatomedina C)",
  categoria: "Hormônios Metabólicos",
  unidade: "ng/mL",
  funcao: "Principal mediador da ação do hormônio do crescimento (GH). Estimula crescimento celular, síntese proteica e regeneração tecidual.",
  referencia: { geral: { min: 115, max: 307 } },
  ideal: { geral: 250 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 80, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 80, max: 150, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 150, max: 280, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 280, max: 350, nivel: "Alto", cor: "#ffc107" },
      Q5: { min: 350, max: 999, nivel: "Muito Alto", cor: "#ff9800" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "IGF-1 muito baixo - Déficit de GH ou função hepática",
      causas: ["Deficiência de GH", "Desnutrição", "Resistência insulínica", "Doença hepática"],
      sintomas: ["Perda de massa magra", "Fadiga", "Dificuldade de recuperação"],
      orientacoes: ["Proteína adequada", "Sono profundo", "Exercícios de alta intensidade", "Jejum intermitente"]
    },
    Q3: { significado: "IGF-1 ideal - Regeneração tecidual ótima" },
    Q5: { significado: "IGF-1 muito alto - Acromegalia ou uso indevido de GH" }
  },
  correlacoes: ["insulina", "homaIR", "gh"]
};

// ========================================================================
// ENZIMAS DIGESTIVAS E PANCREÁTICAS
// ========================================================================

LABORATORY_EXAMS_COMPLETE.amilase = {
  nome: "Amilase",
  categoria: "Enzimas Digestivas",
  unidade: "U/L",
  funcao: "Enzima digestiva produzida por glândulas salivares e pâncreas. Digere carboidratos.",
  referencia: { geral: { min: 30, max: 110 } },
  ideal: { geral: 50 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 20, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 20, max: 40, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 40, max: 80, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 80, max: 150, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 150, max: 9999, nivel: "Muito Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Amilase muito baixa - Insuficiência pancreática exócrina",
      causas: ["Esgotamento enzimático", "Pancreatite crônica", "Fibrose cística"],
      sintomas: ["Esteatorreia", "Má digestão de carboidratos"],
      orientacoes: ["Enzimas digestivas", "Suporte pancreático"]
    },
    Q3: { significado: "Amilase ideal" },
    Q5: {
      significado: "Amilase muito elevada - Pancreatite aguda",
      causas: ["Pancreatite aguda", "Obstrução ducto pancreático", "Parotidite"],
      orientacoes: ["Investigação urgente", "Avaliar dor abdominal"],
      urgente: true
    }
  },
  correlacoes: ["lipase", "glicose", "triglicerideos"]
};

LABORATORY_EXAMS_COMPLETE.lipase = {
  nome: "Lipase",
  categoria: "Enzimas Digestivas",
  unidade: "U/L",
  funcao: "Enzima pancreática que digere gorduras. Mais específica para pâncreas que amilase.",
  referencia: { geral: { min: 0, max: 160 } },
  ideal: { geral: 30 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 10, nivel: "Muito Baixo", cor: "#ff9800" },
      Q2: { min: 10, max: 30, nivel: "Baixo", cor: "#ffc107" },
      Q3: { min: 30, max: 100, nivel: "Ideal", cor: "#4caf50" },
      Q4: { min: 100, max: 200, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 200, max: 9999, nivel: "Muito Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: {
      significado: "Lipase muito baixa - Insuficiência pancreática",
      sintomas: ["Fezes gordurosas", "Má digestão de lipídios"],
      orientacoes: ["Enzimas digestivas com lipase", "Avaliar pâncreas"]
    },
    Q3: { significado: "Lipase ideal" },
    Q5: {
      significado: "Lipase muito elevada - Pancreatite aguda provável",
      causas: ["Pancreatite aguda", "Cálculos biliares", "Álcool"],
      urgente: true
    }
  },
  correlacoes: ["amilase", "triglicerideos", "proteinaCreativa"]
};

LABORATORY_EXAMS_COMPLETE.aldolase = {
  nome: "Aldolase",
  categoria: "Enzimas Musculares",
  unidade: "U/L",
  funcao: "Enzima da via glicolítica presente em músculo e fígado. Marcador de dano muscular e hepático.",
  referencia: { geral: { min: 0, max: 7.6 } },
  ideal: { geral: 4 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 2, nivel: "Baixo", cor: "#4caf50" },
      Q2: { min: 2, max: 5, nivel: "Ideal", cor: "#4caf50" },
      Q3: { min: 5, max: 7.6, nivel: "Normal", cor: "#ffc107" },
      Q4: { min: 7.6, max: 15, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 15, max: 999, nivel: "Muito Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q2: { significado: "Aldolase ideal" },
    Q5: {
      significado: "Aldolase muito elevada - Dano muscular ou hepático",
      causas: ["Miopatias", "Distrofias musculares", "Polimiosite", "Hepatite"],
      orientacoes: ["Avaliar CK", "Investigar miopatias"]
    }
  },
  correlacoes: ["ck", "tgo", "tgp"]
};

// ========================================================================
// MARCADORES DE INFLAMAÇÃO E ESTRESSE OXIDATIVO
// ========================================================================

LABORATORY_EXAMS_COMPLETE.proteinaCreativa = {
  nome: "PCR (Proteína C Reativa)",
  categoria: "Marcadores Inflamatórios",
  unidade: "mg/L",
  funcao: "Proteína de fase aguda produzida pelo fígado. Marcador sistêmico de inflamação aguda ou crônica. Principal biomarcador de inflamação crônica.",
  referencia: { geral: { min: 0, max: 5 } },
  ideal: { geral: 0.5 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 0.5, nivel: "Ótimo", cor: "#4caf50" },
      Q2: { min: 0.5, max: 1.0, nivel: "Baixo Risco", cor: "#4caf50" },
      Q3: { min: 1.0, max: 3.0, nivel: "Risco Moderado", cor: "#ffc107" },
      Q4: { min: 3.0, max: 10, nivel: "Alto Risco", cor: "#ff9800" },
      Q5: { min: 10, max: 999, nivel: "Inflamação Ativa", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: { significado: "PCR ótima - Mínima inflamação sistêmica" },
    Q4: {
      significado: "PCR elevada - Inflamação crônica ou metabólica",
      causas: ["Obesidade", "Resistência insulínica", "Disbiose", "Doenças autoimunes", "Infecções"],
      riscos: ["Doença cardiovascular", "Diabetes", "Câncer"],
      orientacoes: ["Dieta anti-inflamatória", "Ômega-3", "Curcumina", "Exercícios", "Saúde intestinal"]
    },
    Q5: {
      significado: "PCR muito elevada - Inflamação aguda ou crônica severa",
      urgente: true
    }
  },
  correlacoes: ["insulina", "triglicerideos", "ferritina", "ldlOxidado"]
};

LABORATORY_EXAMS_COMPLETE.proteinaCreativaUs = {
  nome: "PCR Ultrassensível (PCR-us)",
  categoria: "Marcadores Inflamatórios",
  unidade: "mg/L",
  funcao: "Versão ultrassensível da PCR. Detecta inflamação subclínica. Preditor precoce de risco cardiovascular e disfunção endotelial.",
  referencia: { geral: { min: 0, max: 3 } },
  ideal: { geral: 0.5 },
  quintis: {
    geral: {
      Q1: { min: 0, max: 0.5, nivel: "Risco Mínimo", cor: "#4caf50" },
      Q2: { min: 0.5, max: 1.0, nivel: "Baixo Risco", cor: "#4caf50" },
      Q3: { min: 1.0, max: 3.0, nivel: "Risco Moderado", cor: "#ffc107" },
      Q4: { min: 3.0, max: 10, nivel: "Alto Risco", cor: "#ff9800" },
      Q5: { min: 10, max: 999, nivel: "Risco Muito Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q1: { significado: "PCR-us ótima - Mínimo risco cardiovascular" },
    Q3: {
      significado: "PCR-us moderada - Inflamação metabólica",
      causas: ["Resistência insulínica", "Obesidade", "Disbiose", "Estresse oxidativo"],
      riscos: ["Risco cardiovascular aumentado"],
      orientacoes: ["Dieta mediterrânea", "Ômega-3 2-3g/dia", "Exercícios", "Reduzir peso"]
    },
    Q5: {
      significado: "PCR-us muito elevada - Alto risco cardiovascular",
      orientacoes: ["Investigação cardiovascular", "Controle rigoroso de fatores de risco"]
    }
  },
  correlacoes: ["ldlOxidado", "apoB", "homaIR", "homocisteina"]
};

LABORATORY_EXAMS_COMPLETE.ggt = {
  nome: "GGT (Gama Glutamil Transferase)",
  categoria: "Função Hepática",
  unidade: "U/L",
  funcao: "Enzima hepática envolvida no metabolismo de glutationa. Marcador sensível de indução enzimática e estresse oxidativo hepático. Principal biomarcador de estresse oxidativo.",
  referencia: {
    homem: { min: 0, max: 40 },
    mulher: { min: 0, max: 30 }
  },
  ideal: {
    homem: 16,
    mulher: 16
  },
  quintis: {
    homem: {
      Q1: { min: 0, max: 10, nivel: "Ótimo", cor: "#4caf50" },
      Q2: { min: 10, max: 20, nivel: "Ideal", cor: "#4caf50" },
      Q3: { min: 20, max: 40, nivel: "Normal", cor: "#ffc107" },
      Q4: { min: 40, max: 80, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 80, max: 9999, nivel: "Muito Alto", cor: "#ff5722" }
    },
    mulher: {
      Q1: { min: 0, max: 8, nivel: "Ótimo", cor: "#4caf50" },
      Q2: { min: 8, max: 16, nivel: "Ideal", cor: "#4caf50" },
      Q3: { min: 16, max: 30, nivel: "Normal", cor: "#ffc107" },
      Q4: { min: 30, max: 60, nivel: "Elevado", cor: "#ff9800" },
      Q5: { min: 60, max: 9999, nivel: "Muito Alto", cor: "#ff5722" }
    }
  },
  interpretacao: {
    Q2: { significado: "GGT ideal - Mínimo estresse oxidativo hepático" },
    Q4: {
      significado: "GGT elevada - Sobrecarga hepática e estresse oxidativo",
      causas: ["Álcool", "Medicamentos hepatotóxicos", "Esteatose hepática", "Obesidade", "Toxinas"],
      orientacoes: ["Eliminar álcool", "Detoxificação hepática", "NAC", "Cardo mariano", "Colina"]
    },
    Q5: {
      significado: "GGT muito elevada - Intoxicação ou doença hepática",
      urgente: true
    }
  },
  correlacoes: ["tgp", "ferritina", "triglicerideos", "vitaminaD"]
};

// ========================================================================
// MESCLAR COM EXAMES ADICIONAIS (Vitaminas, Minerais, Metais, etc.)
// ========================================================================
const MERGED_EXAMS = {
  ...LABORATORY_EXAMS_COMPLETE,
  ...LABORATORY_EXAMS_ADDITIONAL,
  ...LABORATORY_EXAMS_SPECIALIZED
};

export default MERGED_EXAMS;
