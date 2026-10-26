/**
 * Base de Dados de Exames Laboratoriais
 * Estrutura preparada para receber dados do livro:
 * "Manual Prático da Anamnese Integrativa - A Conexão de tudo"
 * Luciana Caxito Lopes, 1ª Edição, abril/2025, páginas 239-420
 */

export const LABORATORY_EXAMS = {
  // ==================== HEMOGRAMA COMPLETO ====================
  hemograma: {
    categoria: 'Hemograma Completo',
    exames: {
      hemoglobina: {
        nome: 'Hemoglobina',
        unidade: 'g/dL',
        referencia: { homem: '13.5-17.5', mulher: '12.0-16.0' },
        ideal: { homem: '15.0', mulher: '14.0' },
        interpretacao: {
          baixo: {
            significado: 'Anemia - Capacidade reduzida de transporte de oxigênio',
            causas: [
              'Deficiência de ferro, B12 ou ácido fólico',
              'Sangramento crônico ou agudo',
              'Doença renal crônica',
              'Doenças crônicas (inflamação)',
              'Hemólise (destruição de hemácias)'
            ],
            predisposicoes: [
              'Fadiga crônica e fraqueza',
              'Dificuldade de concentração',
              'Queda de cabelo',
              'Unhas quebradiças',
              'Palidez cutânea'
            ],
            orientacoes: [
              'Investigar causa: ferritina, B12, folato, sangramento oculto',
              'Suplementar conforme deficiência identificada',
              'Aumentar alimentos ricos em ferro (carnes, feijão, folhas verdes)',
              'Vitamina C junto com ferro vegetal para melhor absorção'
            ]
          },
          alto: {
            significado: 'Policitemia - Excesso de hemácias ou desidratação',
            causas: [
              'Desidratação (falsa policitem ia)',
              'Doença pulmonar crônica (DPOC)',
              'Apneia do sono',
              'Tabagismo',
              'Policitemia vera (doença medular)'
            ],
            predisposicoes: [
              'Viscosidade sanguínea aumentada',
              'Risco de trombose',
              'Hipertensão arterial',
              'Cianose (coloração azulada)'
            ],
            orientacoes: [
              'Hidratação adequada (2-3L/dia)',
              'Investigar causas secundárias',
              'Avaliar gasometria arterial',
              'Considerar polissonografia se suspeita de apneia'
            ]
          }
        }
      },
      hemacias: {
        nome: 'Hemácias (Eritrócitos)',
        unidade: 'milhões/mm³',
        referencia: { homem: '4.5-5.9', mulher: '4.0-5.4' },
        ideal: { homem: '5.0', mulher: '4.7' },
        interpretacao: {
          baixo: {
            significado: 'Anemia - Redução no número de glóbulos vermelhos',
            causas: ['Deficiências nutricionais', 'Sangramento', 'Hemólise', 'Insuficiência medular'],
            predisposicoes: ['Fadiga', 'Dispneia', 'Taquicardia', 'Palidez'],
            orientacoes: ['Avaliar VCM/HCM/CHCM para classificar tipo de anemia', 'Investigar causa subjacente']
          },
          alto: {
            significado: 'Policitemia',
            causas: ['Desidratação', 'Hipóxia crônica', 'Policitemia vera'],
            predisposicoes: ['Risco trombótico', 'Hipertensão'],
            orientacoes: ['Hidratação', 'Investigar causas']
          }
        }
      },
      hematocrito: {
        nome: 'Hematócrito',
        unidade: '%',
        referencia: { homem: '40-52', mulher: '36-48' },
        ideal: { homem: '45', mulher: '42' },
        interpretacao: {
          baixo: {
            significado: 'Anemia - Percentual reduzido de volume ocupado por hemácias',
            causas: ['Mesmas causas de anemia'],
            predisposicoes: ['Fadiga', 'Fraqueza'],
            orientacoes: ['Correlacionar com hemoglobina e hemácias']
          },
          alto: {
            significado: 'Hemoconcentração ou policitemia',
            causas: ['Desidratação', 'Policitemia'],
            predisposicoes: ['Sangue viscoso', 'Trombose'],
            orientacoes: ['Hidratação', 'Investigação']
          }
        }
      },
      leucocitos: {
        nome: 'Leucócitos Totais',
        unidade: '/mm³',
        referencia: { geral: '4000-11000' },
        ideal: { geral: '7000' },
        interpretacao: {
          baixo: {
            significado: 'Leucopenia - Defesa imunológica reduzida',
            causas: [
              'Infecções virais',
              'Medicamentos (quimioterapia, imunossupressores)',
              'Doenças autoimunes',
              'Deficiências nutricionais (B12, folato)',
              'Doenças da medula óssea'
            ],
            predisposicoes: [
              'Maior susceptibilidade a infecções',
              'Infecções recorrentes',
              'Cicatrização lenta'
            ],
            orientacoes: [
              'Avaliar diferencial (neutrófilos, linfócitos)',
              'Suplementação conforme deficiência',
              'Evitar aglomerações',
              'Higiene rigorosa'
            ]
          },
          alto: {
            significado: 'Leucocitose - Resposta inflamatória ou infecciosa',
            causas: [
              'Infecção bacteriana aguda',
              'Inflamação sistêmica',
              'Estresse físico ou emocional',
              'Leucemias',
              'Uso de corticoides'
            ],
            predisposicoes: [
              'Processo infeccioso ativo',
              'Inflamação crônica'
            ],
            orientacoes: [
              'Avaliar diferencial leucocitário',
              'Investigar foco infeccioso',
              'PCR, VHS para inflamação'
            ]
          }
        }
      },
      plaquetas: {
        nome: 'Plaquetas',
        unidade: '/mm³',
        referencia: { geral: '150000-400000' },
        ideal: { geral: '250000' },
        interpretacao: {
          baixo: {
            significado: 'Trombocitopenia - Risco de sangramento',
            causas: [
              'Dengue e outras viroses',
              'Deficiência de B12 ou folato',
              'Medicamentos (heparina, quinina)',
              'Doenças autoimunes (PTI)',
              'Doença hepática (cirrose)',
              'Quimioterapia'
            ],
            predisposicoes: [
              'Sangramento espontâneo (<50.000)',
              'Hematomas fáceis',
              'Petéquias (pontinhos vermelhos na pele)',
              'Sangramento gengival'
            ],
            orientacoes: [
              'Evitar traumas e esportes de contato',
              'Não usar AINEs (aspirina, ibuprofeno)',
              'Se <20.000: emergência médica!',
              'Investigar causa'
            ]
          },
          alto: {
            significado: 'Trombocitose - Risco de trombose',
            causas: [
              'Ferropenia (paradoxalmente)',
              'Inflamação crônica',
              'Pós-cirúrgico',
              'Trombocitose essencial',
              'Neoplasias'
            ],
            predisposicoes: [
              'Risco de trombose',
              'Eventos cardiovasculares'
            ],
            orientacoes: [
              'Investigar causa',
              'Hidratação adequada',
              'Antiagregante se indicado'
            ]
          }
        }
      }
    }
  },

  // ==================== BIOQUÍMICA ====================
  bioquimica: {
    categoria: 'Bioquímica Geral',
    exames: {
      glicemia_jejum: {
        nome: 'Glicemia de Jejum',
        unidade: 'mg/dL',
        referencia: { geral: '70-99' },
        ideal: { geral: '85' },
        interpretacao: {
          baixo: {
            significado: 'Hipoglicemia - Glicose sanguínea baixa',
            causas: [
              'Jejum prolongado',
              'Excesso de insulina (diabetes tratado)',
              'Hipoglicemia reativa (pós-prandial)',
              'Insulinoma (tumor pancreático)',
              'Insuficiência adrenal',
              'Doença hepática grave'
            ],
            predisposicoes: [
              'Tremores, sudorese',
              'Confusão mental, tontura',
              'Palpitações',
              'Fraqueza intensa'
            ],
            orientacoes: [
              'Evitar jejuns prolongados',
              'Refeições pequenas e frequentes',
              'Carboidratos complexos + proteína',
              'Investigar causa se recorrente'
            ]
          },
          alto: {
            significado: 'Hiperglicemia - Pré-diabetes ou diabetes',
            causas: [
              '100-125 mg/dL: Pré-diabetes',
              '≥126 mg/dL (2 medidas): Diabetes',
              'Resistência insulínica',
              'Obesidade, sedentarismo',
              'Estresse, corticoides'
            ],
            predisposicoes: [
              'Diabetes tipo 2',
              'Doenças cardiovasculares',
              'Neuropatia, nefropatia',
              'Retinopatia'
            ],
            orientacoes: [
              'Hemoglobina glicada (HbA1c)',
              'Dieta baixo IG',
              'Exercício 150min/semana',
              'Reduzir peso se sobrepeso',
              'Suplementação: cromo, canela, ácido alfa-lipóico'
            ]
          }
        }
      },
      hemoglobina_glicada: {
        nome: 'Hemoglobina Glicada (HbA1c)',
        unidade: '%',
        referencia: { geral: '<5.7' },
        ideal: { geral: '5.0' },
        interpretacao: {
          borderline: {
            significado: 'Pré-diabetes (5.7-6.4%)',
            causas: ['Resistência insulínica', 'Estilo de vida'],
            predisposicoes: ['Progressão para diabetes'],
            orientacoes: ['Mudança de estilo de vida urgente']
          },
          alto: {
            significado: 'Diabetes (≥6.5%) - Média glicêmica últimos 3 meses',
            causas: ['Diabetes estabelecido', 'Controle inadequado'],
            predisposicoes: ['Complicações diabéticas'],
            orientacoes: ['Controle glicêmico rigoroso', 'Acompanhamento médico']
          }
        }
      },
      ureia: {
        nome: 'Ureia',
        unidade: 'mg/dL',
        referencia: { geral: '10-50' },
        ideal: { geral: '30' },
        interpretacao: {
          baixo: {
            significado: 'Hipoureemia - Produção reduzida ou diluição',
            causas: ['Baixa ingesta proteica', 'Doença hepática', 'Super-hidratação'],
            predisposicoes: ['Desnutrição proteica'],
            orientacoes: ['Aumentar proteínas na dieta']
          },
          alto: {
            significado: 'Azotemia - Acúmulo de ureia',
            causas: [
              'Desidratação (mais comum)',
              'Dieta hiperproteica',
              'Insuficiência renal',
              'Sangramento gastrointestinal',
              'Catabolismo aumentado'
            ],
            predisposicoes: ['Sobrecarga renal'],
            orientacoes: ['Hidratação', 'Avaliar creatinina', 'Moderar proteínas']
          }
        }
      },
      creatinina: {
        nome: 'Creatinina',
        unidade: 'mg/dL',
        referencia: { homem: '0.7-1.3', mulher: '0.6-1.1' },
        ideal: { homem: '1.0', mulher: '0.8' },
        interpretacao: {
          baixo: {
            significado: 'Pouca massa muscular',
            causas: ['Desnutrição', 'Perda muscular', 'Idade avançada'],
            predisposicoes: ['Sarcopenia'],
            orientacoes: ['Exercícios resistidos', 'Proteína adequada']
          },
          alto: {
            significado: 'Insuficiência renal ou alta massa muscular',
            causas: [
              'Doença renal crônica',
              'Desidratação',
              'Rabdomiólise',
              'Alta massa muscular (atletas)',
              'Medicamentos nefrotóxicos'
            ],
            predisposicoes: ['Progressão para IRC'],
            orientacoes: [
              'Calcular TFG (taxa filtração glomerular)',
              'Hidratação',
              'Evitar nefrotóxicos',
              'Proteinúria? Exame de urina'
            ]
          }
        }
      },
      acido_urico: {
        nome: 'Ácido Úrico',
        unidade: 'mg/dL',
        referencia: { homem: '3.4-7.0', mulher: '2.4-6.0' },
        ideal: { homem: '5.0', mulher: '4.0' },
        interpretacao: {
          baixo: {
            significado: 'Hipouricemia - Raro',
            causas: ['Defeitos tubulares renais', 'Doença de Wilson'],
            predisposicoes: ['Geralmente benigno'],
            orientacoes: ['Raramente precisa tratamento']
          },
          alto: {
            significado: 'Hiperuricemia - Risco de gota',
            causas: [
              'Dieta rica em purinas (carnes, frutos do mar)',
              'Álcool (cerveja)',
              'Obesidade, síndrome metabólica',
              'Insuficiência renal',
              'Medicamentos (diuréticos)'
            ],
            predisposicoes: [
              'Gota (artrite úrica)',
              'Cálculos renais',
              'Doença cardiovascular'
            ],
            orientacoes: [
              'Reduzir carnes vermelhas, vísceras, frutos do mar',
              'Evitar álcool',
              'Hidratação 2-3L/dia',
              'Cerejas, vitamina C',
              'Perder peso gradualmente'
            ]
          }
        }
      }
    }
  },

  // ==================== PERFIL LIPÍDICO ====================
  lipidico: {
    categoria: 'Perfil Lipídico',
    exames: {
      colesterol_total: {
        nome: 'Colesterol Total',
        unidade: 'mg/dL',
        referencia: { geral: '<200' },
        ideal: { geral: '180' },
        interpretacao: {
          borderline: {
            significado: '200-239: Borderline alto',
            causas: ['Dieta, genética, sedentarismo'],
            predisposicoes: ['Risco cardiovascular'],
            orientacoes: ['Mudança de estilo de vida']
          },
          alto: {
            significado: '≥240: Hipercolesterolemia - Risco cardiovascular',
            causas: [
              'Dieta rica em gorduras saturadas',
              'Obesidade, sedentarismo',
              'Hipotireoidismo',
              'Diabetes',
              'Fatores genéticos (hipercolesterolemia familiar)'
            ],
            predisposicoes: [
              'Aterosclerose',
              'Infarto, AVC',
              'Doença arterial periférica'
            ],
            orientacoes: [
              'Dieta mediterrânea',
              'Ômega-3 2-3g/dia',
              'Fibras solúveis (aveia, linhaça)',
              'Exercício aeróbico 150min/semana',
              'Estatinas naturais: arroz vermelho fermentado, bergamota'
            ]
          }
        }
      },
      hdl: {
        nome: 'HDL Colesterol (Bom)',
        unidade: 'mg/dL',
        referencia: { homem: '>40', mulher: '>50' },
        ideal: { homem: '60', mulher: '70' },
        interpretacao: {
          baixo: {
            significado: 'HDL baixo - Risco cardiovascular aumentado',
            causas: [
              'Sedentarismo',
              'Tabagismo',
              'Obesidade abdominal',
              'Resistência insulínica',
              'Dieta pobre em gorduras boas'
            ],
            predisposicoes: [
              'Aterosclerose acelerada',
              'Síndrome metabólica'
            ],
            orientacoes: [
              'Exercício aeróbico REGULAR (aumenta HDL)',
              'Ômega-3, azeite extra virgem',
              'Castanhas, abacate',
              'Parar de fumar',
              'Niacina (vitamina B3) - sob orientação'
            ]
          },
          alto: {
            significado: 'Protetor cardiovascular',
            causas: ['Estilo de vida saudável', 'Exercícios', 'Genética favorável'],
            predisposicoes: ['Proteção cardiovascular'],
            orientacoes: ['Manter hábitos saudáveis']
          }
        }
      },
      ldl: {
        nome: 'LDL Colesterol (Ruim)',
        unidade: 'mg/dL',
        referencia: { geral: '<100' },
        ideal: { geral: '70' },
        interpretacao: {
          borderline: {
            significado: '100-129: Acima do ideal',
            causas: ['Dieta, genética'],
            predisposicoes: ['Risco moderado'],
            orientacoes: ['Otimizar dieta']
          },
          alto: {
            significado: '130-159: Borderline alto; ≥160: Alto - Principal vilão cardiovascular',
            causas: [
              'Dieta rica em gordura saturada/trans',
              'Obesidade',
              'Genética'
            ],
            predisposicoes: [
              'Aterosclerose',
              'Infarto, AVC'
            ],
            orientacoes: [
              'Evitar gorduras saturadas e trans',
              'Fibras solúveis (β-glucanas da aveia)',
              'Estatinas naturais',
              'Exercício',
              'Se muito alto: estatina farmacológica'
            ]
          }
        }
      },
      vldl: {
        nome: 'VLDL Colesterol',
        unidade: 'mg/dL',
        referencia: { geral: '<30' },
        ideal: { geral: '20' },
        interpretacao: {
          alto: {
            significado: 'Triglicerídeos elevados (VLDL = TG/5)',
            causas: ['Mesmas dos triglicerídeos'],
            predisposicoes: ['Risco cardiovascular'],
            orientacoes: ['Ver orientações de triglicerídeos']
          }
        }
      },
      triglicerides: {
        nome: 'Triglicerídeos',
        unidade: 'mg/dL',
        referencia: { geral: '<150' },
        ideal: { geral: '100' },
        interpretacao: {
          borderline: {
            significado: '150-199: Borderline alto',
            causas: ['Excesso de carboidratos/álcool'],
            predisposicoes: ['Risco moderado'],
            orientacoes: ['Reduzir açúcar e álcool']
          },
          alto: {
            significado: '200-499: Alto; ≥500: Muito alto - Risco de pancreatite',
            causas: [
              'Excesso de carboidratos refinados e açúcar',
              'Álcool',
              'Obesidade',
              'Diabetes mal controlado',
              'Hipotireoidismo'
            ],
            predisposicoes: [
              'Pancreatite aguda (≥500)',
              'Doença cardiovascular',
              'Fígado gorduroso'
            ],
            orientacoes: [
              'Dieta LOW CARB',
              'Eliminar açúcar e álcool',
              'Ômega-3 3-4g/dia',
              'Exercício',
              'Se ≥500: tratamento urgente (fibrato)'
            ]
          }
        }
      }
    }
  },

  // ==================== FUNÇÃO HEPÁTICA ====================
  hepatico: {
    categoria: 'Função Hepática',
    exames: {
      tgo_ast: {
        nome: 'TGO/AST',
        unidade: 'U/L',
        referencia: { geral: '<40' },
        ideal: { geral: '25' },
        interpretacao: {
          alto: {
            significado: 'Lesão hepatocelular ou muscular',
            causas: [
              'Hepatite (viral, alcoólica, medicamentosa)',
              'Esteatose hepática (gordura no fígado)',
              'Cirrose',
              'Lesão muscular (exercício intenso, rabdomiólise)',
              'Infarto do miocárdio'
            ],
            predisposicoes: ['Doença hepática progressiva'],
            orientacoes: [
              'Avaliar TGP/ALT e GGT',
              'Relação TGO/TGP >2: pensar em álcool',
              'Ultrassom fígado',
              'Detox hepático: cardo mariano, alcachofra',
              'Eliminar álcool'
            ]
          }
        }
      },
      tgp_alt: {
        nome: 'TGP/ALT',
        unidade: 'U/L',
        referencia: { geral: '<41' },
        ideal: { geral: '25' },
        interpretacao: {
          alto: {
            significado: 'Lesão hepatocelular (mais específico que TGO)',
            causas: [
              'Esteatose hepática não-alcoólica (NASH)',
              'Hepatites virais (A, B, C)',
              'Hepatite medicamentosa',
              'Hepatite autoimune'
            ],
            predisposicoes: ['Cirrose hepática'],
            orientacoes: [
              'Investigar causas',
              'Perder peso se obeso',
              'Dieta anti-inflamatória',
              'Cardo mariano 300mg 3x/dia',
              'Eliminar hepatotóxicos (álcool, paracetamol excesso)'
            ]
          }
        }
      },
      ggt: {
        nome: 'Gama GT (GGT)',
        unidade: 'U/L',
        referencia: { homem: '<55', mulher: '<38' },
        ideal: { homem: '30', mulher: '20' },
        interpretacao: {
          alto: {
            significado: 'Colestase (obstrução biliar) ou álcool',
            causas: [
              'Consumo de álcool (marcador sensível)',
              'Esteatose hepática',
              'Obstrução biliar (cálculos)',
              'Medicamentos (fenitoína, barbitúricos)',
              'Pancreatite'
            ],
            predisposicoes: ['Doença hepática', 'Doença biliar'],
            orientacoes: [
              'Cessar álcool completamente',
              'Detox hepático',
              'Investigar via biliar se muito alto',
              'Ultrassom abdome'
            ]
          }
        }
      },
      fosfatase_alcalina: {
        nome: 'Fosfatase Alcalina',
        unidade: 'U/L',
        referencia: { geral: '30-120' },
        ideal: { geral: '70' },
        interpretacao: {
          baixo: {
            significado: 'Deficiência de zinco, desnutrição',
            causas: ['Hipotireoidismo', 'Deficiência de zinco'],
            predisposicoes: ['Cicatrização lenta'],
            orientacoes: ['Suplementar zinco 30mg/dia']
          },
          alto: {
            significado: 'Colestase ou doença óssea',
            causas: [
              'Obstrução biliar',
              'Colangite',
              'Doenças ósseas (Paget, osteomalacia)',
              'Crescimento (adolescentes - normal)',
              'Gravidez (3º trimestre - normal)'
            ],
            predisposicoes: ['Doença hepatobiliar', 'Doença óssea'],
            orientacoes: ['Investigar com GGT e bilirrubinas', 'Avaliar densidade óssea se necessário']
          }
        }
      },
      bilirrubina_total: {
        nome: 'Bilirrubina Total',
        unidade: 'mg/dL',
        referencia: { geral: '0.3-1.2' },
        ideal: { geral: '0.7' },
        interpretacao: {
          alto: {
            significado: 'Icterícia - olhos/pele amarelados se >3',
            causas: [
              'Hepatite',
              'Obstrução biliar',
              'Hemólise (destruição hemácias)',
              'Síndrome de Gilbert (benigna)'
            ],
            predisposicoes: ['Doença hepática ou hemolítica'],
            orientacoes: ['Fraccionar (direta/indireta) para causa', 'Investigar urgente']
          }
        }
      },
      albumina: {
        nome: 'Albumina',
        unidade: 'g/dL',
        referencia: { geral: '3.5-5.0' },
        ideal: { geral: '4.5' },
        interpretacao: {
          baixo: {
            significado: 'Hipoalbuminemia - Desnutrição ou doença hepática',
            causas: [
              'Desnutrição proteica',
              'Cirrose hepática',
              'Síndrome nefrótica',
              'Inflamação crônica',
              'Má absorção intestinal'
            ],
            predisposicoes: [
              'Edema (retenção líquida)',
              'Imunodeficiência',
              'Cicatrização lenta'
            ],
            orientacoes: [
              'Aumentar proteínas (1.5-2g/kg/dia)',
              'Tratar causa base',
              'Aminoácidos essenciais',
              'Vitaminas do complexo B'
            ]
          }
        }
      }
    }
  },

  // ==================== TIREOIDE ====================
  tireoide: {
    categoria: 'Função Tireoidiana',
    exames: {
      tsh: {
        nome: 'TSH (Hormônio Estimulante da Tireoide)',
        unidade: 'μUI/mL',
        referencia: { geral: '0.4-4.0' },
        ideal: { geral: '1.5-2.0' },
        interpretacao: {
          baixo: {
            significado: 'Hipertireoidismo - Tireoide acelerada',
            causas: [
              'Doença de Graves',
              'Tireoidite (fase inicial)',
              'Nódulos hiperfuncionantes',
              'Excesso de hormônio tireoidiano (medicação)'
            ],
            predisposicoes: [
              'Taquicardia, palpitações',
              'Perda de peso',
              'Nervosismo, ansiedade',
              'Tremores',
              'Insônia'
            ],
            orientacoes: [
              'Dosar T4 livre e T3',
              'Ultrassom tireoide',
              'Evitar iodo em excesso',
              'Acompanhamento endocrinológico'
            ]
          },
          alto: {
            significado: 'Hipotireoidismo - Tireoide lenta',
            causas: [
              'Tireoidite de Hashimoto (autoimune)',
              'Deficiência de iodo',
              'Pós-tratamento de hipertireoidismo',
              'Medicamentos (amiodarona, lítio)'
            ],
            predisposicoes: [
              'Fadiga crônica',
              'Ganho de peso',
              'Constipação',
              'Pele seca, queda cabelo',
              'Depressão',
              'Colesterol alto'
            ],
            orientacoes: [
              'Dosar T4 livre e anticorpos (anti-TPO)',
              'Reposição: levotiroxina',
              'Selênio 200mcg/dia',
              'Zinco, vitamina D',
              'Evitar soja crua, glúten se Hashimoto'
            ]
          }
        }
      },
      t4_livre: {
        nome: 'T4 Livre (Tiroxina)',
        unidade: 'ng/dL',
        referencia: { geral: '0.8-1.8' },
        ideal: { geral: '1.3' },
        interpretacao: {
          baixo: {
            significado: 'Hipotireoidismo confirmado',
            causas: ['Insuficiência tireoidiana'],
            predisposicoes: ['Sintomas de hipotireoidismo'],
            orientacoes: ['Reposição hormonal']
          },
          alto: {
            significado: 'Hipertireoidismo confirmado',
            causas: ['Hiperatividade tireoidiana'],
            predisposicoes: ['Sintomas de hipertireoidismo'],
            orientacoes: ['Tratamento do hipertireoidismo']
          }
        }
      },
      t3_total: {
        nome: 'T3 Total (Triiodotironina)',
        unidade: 'ng/dL',
        referencia: { geral: '80-200' },
        ideal: { geral: '140' },
        interpretacao: {
          baixo: {
            significado: 'Síndrome do T3 baixo - Doença crônica ou má conversão',
            causas: ['Estresse crônico', 'Inflamação', 'Deficiência nutricional', 'Má conversão T4→T3'],
            predisposicoes: ['Metabolismo lento', 'Fadiga'],
            orientacoes: ['Selênio, zinco', 'Reduzir inflamação', 'Gerenciar estresse']
          }
        }
      }
    }
  },

  // ==================== VITAMINAS E MINERAIS ====================
  vitaminas_minerais: {
    categoria: 'Vitaminas e Minerais',
    exames: {
      vitamina_d: {
        nome: 'Vitamina D (25-OH)',
        unidade: 'ng/mL',
        referencia: { geral: '>30' },
        ideal: { geral: '50-70' },
        interpretacao: {
          baixo: {
            significado: 'Deficiência de vitamina D',
            causas: [
              'Pouca exposição solar',
              'Pele escura',
              'Obesidade',
              'Má absorção intestinal',
              'Doença renal/hepática'
            ],
            predisposicoes: [
              'Osteoporose, fraturas',
              'Fraqueza muscular',
              'Depressão',
              'Imunodeficiência',
              'Doenças autoimunes'
            ],
            orientacoes: [
              'Sol 15-20min/dia (braços/pernas)',
              'Suplementar: 2000-10000UI/dia conforme deficiência',
              'Reavaliar em 3 meses',
              'Cofatores: magnésio, vitamina K2'
            ]
          }
        }
      },
      vitamina_b12: {
        nome: 'Vitamina B12',
        unidade: 'pg/mL',
        referencia: { geral: '200-900' },
        ideal: { geral: '600-800' },
        interpretacao: {
          baixo: {
            significado: 'Deficiência de B12 - Anemia e neuropatia',
            causas: [
              'Dieta vegetariana/vegana',
              'Má absorção (gastrite atrófica, anemia perniciosa)',
              'Uso de metformina, IBP',
              'Doença de Crohn',
              'Idade avançada'
            ],
            predisposicoes: [
              'Anemia megaloblástica',
              'Neuropatia periférica',
              'Demência',
              'Fadiga severa',
              'Depressão'
            ],
            orientacoes: [
              'Suplementar: 1000mcg/dia (oral) ou injetável',
              'Forma metilcobalamina (ativa)',
              'Investigar causa',
              'Dosar homocisteína (correlação)'
            ]
          }
        }
      },
      ferritina: {
        nome: 'Ferritina',
        unidade: 'ng/mL',
        referencia: { homem: '30-400', mulher: '15-150' },
        ideal: { homem: '100', mulher: '70' },
        interpretacao: {
          baixo: {
            significado: 'Deficiência de ferro - Estoques baixos',
            causas: [
              'Sangramento menstrual intenso',
              'Sangramento gastrointestinal',
              'Baixa ingesta (vegetarianos)',
              'Má absorção (doença celíaca)',
              'Gestação/lactação'
            ],
            predisposicoes: [
              'Anemia ferropriva',
              'Fadiga intensa',
              'Queda de cabelo',
              'Síndrome das pernas inquietas',
              'Déficit cognitivo'
            ],
            orientacoes: [
              'Ferro quelato 30-60mg/dia + vitamina C',
              'Carnes vermelhas, fígado',
              'Evitar chá/café junto com refeições',
              'Investigar sangramento oculto',
              'Dosar após 3 meses'
            ]
          },
          alto: {
            significado: 'Excesso de ferro ou inflamação',
            causas: [
              'Hemocromatose (genética)',
              'Transfusões repetidas',
              'Inflamação/infecção (ferritina é reagente fase aguda)',
              'Doença hepática'
            ],
            predisposicoes: [
              'Lesão hepática',
              'Cardiopatia',
              'Diabetes',
              'Artropatia'
            ],
            orientacoes: [
              'Se inflamação: tratar causa',
              'Se hemocromatose: flebotomia',
              'Evitar suplementos de ferro',
              'Dosar saturação transferrina'
            ]
          }
        }
      }
    }
  },

  // ==================== ELETRÓLITOS ====================
  eletrolitos: {
    categoria: 'Eletrólitos',
    exames: {
      sodio: {
        nome: 'Sódio',
        unidade: 'mEq/L',
        referencia: { geral: '136-145' },
        ideal: { geral: '140' },
        interpretacao: {
          baixo: {
            significado: 'Hiponatremia - Risco de confusão mental',
            causas: ['Excesso de água', 'Diuréticos', 'SIADH', 'Insuficiência cardíaca'],
            predisposicoes: ['Confusão', 'Convulsões (se grave)'],
            orientacoes: ['Avaliar causa', 'Corrigir lentamente']
          },
          alto: {
            significado: 'Hipernatremia - Desidratação',
            causas: ['Desidratação', 'Diabetes insipidus'],
            predisposicoes: ['Confusão', 'Sede intensa'],
            orientacoes: ['Hidratar adequadamente']
          }
        }
      },
      potassio: {
        nome: 'Potássio',
        unidade: 'mEq/L',
        referencia: { geral: '3.5-5.0' },
        ideal: { geral: '4.5' },
        interpretacao: {
          baixo: {
            significado: 'Hipocalemia - Risco cardíaco',
            causas: ['Diuréticos', 'Vômitos/diarreia', 'Dieta pobre'],
            predisposicoes: ['Arritmias', 'Fraqueza muscular'],
            orientacoes: ['Suplementar', 'Banana, abacate', 'ECG se grave']
          },
          alto: {
            significado: 'Hipercalemia - EMERGÊNCIA CARDÍACA',
            causas: ['Insuficiência renal', 'IECA/BRA', 'Suplementação excessiva'],
            predisposicoes: ['Arritmias fatais'],
            orientacoes: ['URGENTE se >6.0', 'Suspender suplementos', 'ECG']
          }
        }
      }
    }
  },

  // ==================== MARCADORES INFLAMATÓRIOS ====================
  inflamatorios: {
    categoria: 'Marcadores Inflamatórios',
    exames: {
      pcr: {
        nome: 'Proteína C Reativa (PCR)',
        unidade: 'mg/L',
        referencia: { geral: '<5' },
        ideal: { geral: '<1' },
        interpretacao: {
          alto: {
            significado: 'Inflamação sistêmica',
            causas: [
              'Infecção aguda',
              'Doenças autoimunes',
              'Inflamação crônica',
              'Obesidade',
              'Síndrome metabólica'
            ],
            predisposicoes: ['Risco cardiovascular', 'Doenças crônicas'],
            orientacoes: [
              'PCR ultrassensível <1: risco CV baixo',
              'Dieta anti-inflamatória',
              'Ômega-3, cúrcuma',
              'Investigar foco infeccioso/inflamatório'
            ]
          }
        }
      },
      vhs: {
        nome: 'VHS (Velocidade de Hemossedimentação)',
        unidade: 'mm/h',
        referencia: { homem: '<15', mulher: '<20' },
        ideal: { homem: '<10', mulher: '<12' },
        interpretacao: {
          alto: {
            significado: 'Inflamação ou infecção',
            causas: ['Infecções', 'Doenças autoimunes', 'Neoplasias', 'Gravidez'],
            predisposicoes: ['Doença ativa'],
            orientacoes: ['Investigar causa', 'Correlacionar com PCR']
          }
        }
      }
    }
  }
};

/**
 * Interpreta um resultado de exame baseado no valor inserido
 */
export function interpretarExame(categoria, exame, valor, sexo = 'geral') {
  try {
    const exameData = LABORATORY_EXAMS[categoria]?.exames[exame];
    if (!exameData) return null;

    const ref = exameData.referencia[sexo] || exameData.referencia.geral;
    if (!ref) return null;

    // Parse referência
    let [min, max] = ref.toString().includes('-') 
      ? ref.split('-').map(v => parseFloat(v.replace(/[^\d.]/g, '')))
      : [null, parseFloat(ref.replace(/[^\d.]/g, ''))];

    const valorNum = parseFloat(valor);
    if (isNaN(valorNum)) return null;

    // Determinar status
    let status, interpretacao;
    if (min === null) {
      // Apenas valor máximo (ex: <200)
      if (valorNum <= max) {
        status = 'normal';
        interpretacao = { significado: 'Valor dentro da normalidade' };
      } else {
        status = 'alto';
        interpretacao = exameData.interpretacao?.alto || exameData.interpretacao?.borderline;
      }
    } else {
      // Faixa min-max
      if (valorNum < min) {
        status = 'baixo';
        interpretacao = exameData.interpretacao?.baixo;
      } else if (valorNum > max) {
        status = 'alto';
        interpretacao = exameData.interpretacao?.alto || exameData.interpretacao?.borderline;
      } else {
        status = 'normal';
        interpretacao = { significado: 'Valor dentro da normalidade' };
      }
    }

    return {
      nome: exameData.nome,
      valor: valorNum,
      unidade: exameData.unidade,
      referencia: ref,
      ideal: exameData.ideal?.[sexo] || exameData.ideal?.geral,
      status,
      interpretacao
    };
  } catch (error) {
    console.error('Erro ao interpretar exame:', error);
    return null;
  }
}

/**
 * Lista todas as categorias disponíveis
 */
export function getCategorias() {
  return Object.keys(LABORATORY_EXAMS).map(key => ({
    id: key,
    nome: LABORATORY_EXAMS[key].categoria
  }));
}

/**
 * Lista todos os exames de uma categoria
 */
export function getExamesPorCategoria(categoria) {
  const cat = LABORATORY_EXAMS[categoria];
  if (!cat) return [];
  
  return Object.keys(cat.exames).map(key => ({
    id: key,
    ...cat.exames[key]
  }));
}
