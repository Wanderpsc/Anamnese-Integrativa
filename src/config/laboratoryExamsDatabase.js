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
      },
      // ========== LEUCOGRAMA DIFERENCIAL (SÉRIE BRANCA) ==========
      promielocitos: {
        nome: 'Promielócitos',
        unidade: '%',
        referencia: { geral: '0' },
        ideal: { geral: '0' },
        interpretacao: {
          alto: {
            significado: 'Desvio à esquerda - Presença de formas imaturas no sangue',
            causas: [
              'Infecção bacteriana grave',
              'Leucemia promielocítica aguda',
              'Reação leucemoide',
              'Sepse',
              'Resposta inflamatória intensa'
            ],
            predisposicoes: [
              'Processo infeccioso severo',
              'Possível neoplasia hematológica',
              'Resposta imune exacerbada'
            ],
            orientacoes: [
              'URGÊNCIA: Investigação imediata',
              'Hemograma completo com análise morfológica',
              'Avaliação de medula óssea se persistente',
              'Descartar leucemia promielocítica aguda',
              'Avaliação hematológica especializada'
            ]
          }
        }
      },
      mielocitos: {
        nome: 'Mielócitos',
        unidade: '%',
        referencia: { geral: '0' },
        ideal: { geral: '0' },
        interpretacao: {
          alto: {
            significado: 'Desvio à esquerda - Formas imaturas de neutrófilos',
            causas: [
              'Infecção bacteriana grave',
              'Leucemia mieloide crônica',
              'Reação leucemoide',
              'Sepse',
              'Inflamação sistêmica intensa'
            ],
            predisposicoes: [
              'Infecção grave ativa',
              'Possível doença mieloproliferativa',
              'Resposta medular inadequada'
            ],
            orientacoes: [
              'Investigação urgente da causa',
              'Repetir hemograma com diferencial',
              'Avaliar PCR, VHS, focos infecciosos',
              'Considerar avaliação hematológica',
              'Investigar leucemia mieloide se persistente'
            ]
          }
        }
      },
      metamielocitos: {
        nome: 'Metamielócitos',
        unidade: '%',
        referencia: { geral: '0' },
        ideal: { geral: '0' },
        interpretacao: {
          alto: {
            significado: 'Desvio à esquerda moderado - Neutrófilos imaturos',
            causas: [
              'Infecção bacteriana',
              'Inflamação aguda',
              'Uso de G-CSF (fator estimulante)',
              'Recuperação medular pós-quimioterapia',
              'Leucemia mieloide'
            ],
            predisposicoes: [
              'Processo infeccioso em curso',
              'Resposta imune ativa',
              'Possível doença hematológica'
            ],
            orientacoes: [
              'Investigar foco infeccioso/inflamatório',
              'Avaliar leucócitos totais e neutrófilos segmentados',
              'Correlacionar com quadro clínico',
              'Hemograma de controle em 7-14 dias',
              'Encaminhar ao hematologista se persistente'
            ]
          }
        }
      },
      bastonetes: {
        nome: 'Bastões (Bastonetes)',
        unidade: '%',
        referencia: { geral: '1-5' },
        ideal: { geral: '3' },
        interpretacao: {
          baixo: {
            significado: 'Desvio à direita - Neutrófilos maduros predominantes',
            causas: [
              'Infecção viral',
              'Resolução de processo infeccioso',
              'Deficiência de B12 ou folato',
              'Anemia megaloblástica'
            ],
            predisposicoes: [
              'Geralmente benigno se isolado',
              'Possível deficiência nutricional'
            ],
            orientacoes: [
              'Avaliar B12, folato se sintomas',
              'Correlacionar com hemograma completo',
              'Acompanhamento clínico'
            ]
          },
          alto: {
            significado: 'Desvio à esquerda leve - Infecção bacteriana',
            causas: [
              'Infecção bacteriana aguda',
              'Apendicite',
              'Pneumonia',
              'Infecção urinária',
              'Abscesso',
              'Resposta inflamatória'
            ],
            predisposicoes: [
              'Processo infeccioso bacteriano ativo',
              'Resposta imune em ação'
            ],
            orientacoes: [
              'Investigar foco infeccioso',
              'Antibioticoterapia se indicado',
              'Hemograma de controle após tratamento',
              'Correlacionar com sintomas clínicos',
              'PCR e VHS para avaliar inflamação'
            ]
          }
        }
      },
      segmentados: {
        nome: 'Segmentados (Neutrófilos)',
        unidade: '%',
        referencia: { geral: '45-70' },
        ideal: { geral: '55' },
        interpretacao: {
          baixo: {
            significado: 'Neutropenia - Defesa contra bactérias reduzida',
            causas: [
              'Infecções virais (gripe, COVID)',
              'Medicamentos (quimioterapia, antibióticos)',
              'Doenças autoimunes',
              'Deficiência de B12, folato',
              'Leucemia',
              'Anemia aplástica'
            ],
            predisposicoes: [
              'Maior risco de infecções bacterianas graves',
              'Sepse se <500/mm³ (neutropenia grave)',
              'Infecções oportunistas'
            ],
            orientacoes: [
              'Se <1000/mm³: URGÊNCIA - risco de sepse',
              'Avaliar leucograma completo',
              'Investigar causas medicamentosas',
              'Suplementar B12, folato se deficientes',
              'Evitar aglomerações',
              'Higiene rigorosa',
              'Avaliar uso de G-CSF se grave'
            ]
          },
          alto: {
            significado: 'Neutrofilia - Resposta a infecção bacteriana',
            causas: [
              'Infecção bacteriana aguda',
              'Inflamação sistêmica',
              'Estresse físico intenso',
              'Uso de corticoides',
              'Leucemia mieloide',
              'Necrose tecidual (infarto, queimadura)'
            ],
            predisposicoes: [
              'Infecção bacteriana ativa',
              'Processo inflamatório em curso'
            ],
            orientacoes: [
              'Investigar foco infeccioso (exame físico, culturas)',
              'Avaliar sintomas: febre, dor, inflamação',
              'PCR e VHS elevados confirmam inflamação',
              'Antibioticoterapia se infecção bacteriana',
              'Repetir hemograma após tratamento',
              'Descartar leucemia se >70% persistente'
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
      },
      t3_reverso: {
        nome: 'T3 Reverso (rT3)',
        unidade: 'ng/dL',
        referencia: { geral: '9.2-24.1' },
        ideal: { geral: '12-18' },
        interpretacao: {
          alto: {
            significado: 'Excesso de T3 inativo - Bloqueio da função tireoidiana',
            causas: [
              'Estresse crônico severo',
              'Inflamação sistêmica',
              'Deficiência de selênio e zinco',
              'Doença crônica grave',
              'Restrição calórica severa',
              'Metais pesados'
            ],
            predisposicoes: [
              'Fadiga crônica intensa',
              'Metabolismo lento mesmo com T4/T3 normais',
              'Ganho de peso',
              'Sintomas de hipotireoidismo com TSH normal'
            ],
            orientacoes: [
              'Calcular razão T3/T3 reverso (ideal >20)',
              'Selênio 200mcg/dia',
              'Zinco 30mg/dia',
              'Reduzir estresse e inflamação',
              'Suporte adrenal',
              'Avaliar metais pesados'
            ]
          }
        }
      },
      anti_tireoglobulina: {
        nome: 'Anti-Tireoglobulina (Anti-TG)',
        unidade: 'UI/mL',
        referencia: { geral: '<115' },
        ideal: { geral: '<20' },
        interpretacao: {
          alto: {
            significado: 'Autoimunidade tireoidiana - Tireoidite de Hashimoto',
            causas: [
              'Tireoidite de Hashimoto',
              'Doença de Graves',
              'Predisposição genética',
              'Permeabilidade intestinal aumentada',
              'Exposição ao glúten',
              'Deficiência de selênio e vitamina D'
            ],
            predisposicoes: [
              'Hipotireoidismo progressivo',
              'Outras doenças autoimunes',
              'Risco aumentado de câncer de tireoide'
            ],
            orientacoes: [
              'Dosar também Anti-TPO',
              'Ultrassom de tireoide',
              'Dieta sem glúten (teste por 3 meses)',
              'Selênio 200mcg/dia',
              'Vitamina D >50ng/mL',
              'Tratamento da permeabilidade intestinal',
              'Acompanhamento semestral'
            ]
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

// ==================== EXPANSÃO 2024: CATEGORIAS ADICIONAIS ====================

// Perfil Lipídico Completo
LABORATORY_EXAMS.perfil_lipidico = {
  categoria: 'Perfil Lipídico Completo',
  exames: {
    colesterol_total: {
      nome: 'Colesterol Total',
      unidade: 'mg/dL',
      referencia: { desejavel: '<200', limítrofe: '200-239', alto: '≥240' },
      ideal: '150-180',
      interpretacao: {
        baixo: {
          significado: 'Colesterol muito baixo (raro)',
          causas: ['Desnutrição', 'Hipertireoidismo', 'Má absorção', 'Doença hepática avançada'],
          predisposicoes: ['Deficiência de hormônios esteroides', 'Problemas de membrana celular'],
          orientacoes: ['Investigar causa', 'Avaliar função tireoidiana e hepática']
        },
        alto: {
          significado: 'Hipercolesterolemia - Risco cardiovascular aumentado',
          causas: ['Dieta rica em gorduras saturadas', 'Sedentarismo', 'Predisposição genética (hipercolesterolemia familiar)', 'Hipotireoidismo', 'Diabetes', 'Obesidade'],
          predisposicoes: ['Aterosclerose', 'Doença arterial coronariana', 'Infarto agudo do miocárdio', 'AVC isquêmico'],
          orientacoes: ['Dieta: reduzir gorduras saturadas e trans', 'Aumentar fibras solúveis (aveia, psyllium)', 'Exercícios aeróbicos 150min/semana', 'Fitoesteróis 2g/dia', 'Estatinas se >240 ou risco alto', 'Considerar berberina 500mg 3x/dia como alternativa natural']
        }
      }
    },
    ldl: {
      nome: 'LDL Colesterol',
      unidade: 'mg/dL',
      referencia: { ideal: '<100', otimo: '<70', limítrofe: '130-159', alto: '≥160' },
      ideal: '<70',
      interpretacao: {
        alto: {
          significado: 'LDL elevado - Principal fator de risco cardiovascular',
          causas: ['Dieta rica em gorduras saturadas', 'Hipercolesterolemia familiar', 'Sedentarismo', 'Obesidade'],
          predisposicoes: ['Aterosclerose', 'Placa de ateroma', 'Infarto', 'AVC'],
          orientacoes: ['Meta <70 se alto risco cardiovascular', 'Meta <55 se muito alto risco', 'Estatinas: atorvastatina 20-80mg ou rosuvastatina 10-40mg', 'Ezetimiba 10mg se estatina insuficiente', 'Evolocumab (anti-PCSK9) se refratário', 'Berberina 500mg 3x/dia', 'Arroz vermelho fermentado (monacolina K)', 'Ômega-3 EPA/DHA 2-3g/dia']
        }
      }
    },
    hdl: {
      nome: 'HDL Colesterol',
      unidade: 'mg/dL',
      referencia: { homem: '>40', mulher: '>50', ideal: '>60' },
      ideal: { homem: '>60', mulher: '>70' },
      interpretacao: {
        baixo: {
          significado: 'HDL baixo - Colesterol "bom" insuficiente',
          causas: ['Sedentarismo', 'Tabagismo', 'Obesidade', 'Diabetes', 'Resistência insulínica', 'Síndrome metabólica'],
          predisposicoes: ['Risco cardiovascular aumentado', 'Menor transporte reverso de colesterol'],
          orientacoes: ['Exercícios aeróbicos (aumentam HDL)', 'Gorduras monoinsaturadas (azeite, abacate)', 'Ômega-3', 'Niacina (ácido nicotínico) 500-2000mg/dia (cuidado com flush)', 'Parar de fumar', 'Perda de peso', 'Consumo moderado de álcool (se apropriado)']
        }
      }
    },
    triglicerides: {
      nome: 'Triglicerídeos',
      unidade: 'mg/dL',
      referencia: { desejavel: '<150', limítrofe: '150-199', alto: '200-499', muito_alto: '≥500' },
      ideal: '<100',
      interpretacao: {
        alto: {
          significado: 'Hipertrigliceridemia - Risco cardiovascular e pancreatite',
          causas: ['Dieta rica em carboidratos refinados e açúcares', 'Consumo excessivo de álcool', 'Obesidade', 'Diabetes mal controlado', 'Sedentarismo', 'Resistência insulínica', 'Hipotireoidismo', 'Uso de corticoides'],
          predisposicoes: ['Pancreatite aguda (se >500)', 'Doença cardiovascular', 'Esteatose hepática'],
          orientacoes: ['Dieta low-carb ou cetogênica', 'Reduzir açúcares e carboidratos refinados', 'Eliminar álcool', 'Ômega-3 (EPA+DHA) 2-4g/dia', 'Fibratos (fenofibrato 160mg) se >500', 'Berberina 500mg 3x/dia', 'Exercícios', 'Controle glicêmico']
        }
      }
    },
    vldl: {
      nome: 'VLDL Colesterol',
      unidade: 'mg/dL',
      referencia: { normal: '<30' },
      ideal: '<20',
      interpretacao: {
        alto: {
          significado: 'VLDL elevado - Transporte de triglicerídeos aumentado',
          causas: ['Mesmas causas de triglicerídeos altos'],
          predisposicoes: ['Aterosclerose', 'Esteatose hepática'],
          orientacoes: ['Mesmas orientações dos triglicerídeos']
        }
      }
    },
    apolipoproteina_a: {
      nome: 'Apolipoproteína A-I (Apo A-I)',
      unidade: 'mg/dL',
      referencia: { homem: '>120', mulher: '>140' },
      ideal: { homem: '>150', mulher: '>170' },
      interpretacao: {
        baixo: {
          significado: 'Baixa Apo A-I - Redução de HDL funcional',
          causas: ['Deficiência genética rara', 'Síndrome metabólica', 'Tabagismo'],
          predisposicoes: ['Aterosclerose precoce', 'Doença coronariana'],
          orientacoes: ['Aumentar HDL (exercícios, niacina, ômega-3)', 'Investigação genética se muito baixo']
        }
      }
    },
    apolipoproteina_b: {
      nome: 'Apolipoproteína B (Apo B)',
      unidade: 'mg/dL',
      referencia: { desejavel: '<90', ideal: '<80' },
      ideal: '<70',
      interpretacao: {
        alto: {
          significado: 'Apo B elevada - Melhor marcador de risco cardiovascular que LDL',
          causas: ['Hipercolesterolemia', 'Resistência insulínica', 'Síndrome metabólica'],
          predisposicoes: ['Aterosclerose', 'Infarto', 'AVC'],
          orientacoes: ['Meta Apo B <80 para alto risco', 'Estatinas', 'Ezetimiba', 'Dieta e exercícios']
        }
      }
    },
    lipoproteina_a: {
      nome: 'Lipoproteína(a) - Lp(a)',
      unidade: 'mg/dL',
      referencia: { desejavel: '<30', ideal: '<14' },
      ideal: '<10',
      interpretacao: {
        alto: {
          significado: 'Lp(a) elevada - Fator de risco genético para doença cardiovascular',
          causas: ['Determinação genética (pouco modificável por dieta)'],
          predisposicoes: ['Aterosclerose prematura', 'Infarto precoce', 'Estenose aórtica', 'AVC'],
          orientacoes: ['Niacina (ácido nicotínico) é o único que reduz Lp(a)', 'Aférese de LDL em casos extremos', 'Controle rigoroso de outros fatores de risco', 'Aspirina profilática', 'Estatinas potentes']
        }
      }
    },
    relacao_colesterol_hdl: {
      nome: 'Relação Colesterol Total/HDL',
      unidade: 'razão',
      referencia: { desejavel: '<4.5', ideal: '<3.5' },
      ideal: '<3.0',
      interpretacao: {
        alto: {
          significado: 'Relação desfavorável - Risco cardiovascular aumentado',
          causas: ['HDL baixo e/ou colesterol total alto'],
          predisposicoes: ['Doença arterial coronariana'],
          orientacoes: ['Aumentar HDL', 'Reduzir colesterol total', 'Exercícios aeróbicos']
        }
      }
    },
    indice_ldl_hdl: {
      nome: 'Índice LDL/HDL',
      unidade: 'razão',
      referencia: { desejavel: '<3.0', ideal: '<2.0' },
      ideal: '<1.5',
      interpretacao: {
        alto: {
          significado: 'Relação LDL/HDL desfavorável',
          causas: ['LDL alto e/ou HDL baixo'],
          predisposicoes: ['Risco cardiovascular elevado'],
          orientacoes: ['Reduzir LDL', 'Aumentar HDL', 'Estatinas + exercícios']
        }
      }
    }
  }
};

// Função Hepática
LABORATORY_EXAMS.funcao_hepatica = {
  categoria: 'Função Hepática',
  exames: {
    tgo_ast: {
      nome: 'TGO/AST (Transaminase Glutâmico Oxalacética)',
      unidade: 'U/L',
      referencia: { homem: '<40', mulher: '<32' },
      ideal: { homem: '<30', mulher: '<25' },
      interpretacao: {
        alto: {
          significado: 'Lesão hepatocelular, cardíaca ou muscular',
          causas: ['Hepatite viral (B, C)', 'Hepatite alcoólica', 'Esteatose hepática (DHGNA)', 'Hepatite medicamentosa', 'Cirrose', 'Infarto do miocárdio', 'Rabdomiólise', 'Miopatias'],
          predisposicoes: ['Progressão para cirrose', 'Insuficiência hepática'],
          orientacoes: ['Se TGO > TGP (relação >2): suspeitar hepatite alcoólica', 'Se TGO e TGP muito elevados (>1000): hepatite aguda viral ou isquêmica', 'Avaliar relação TGO/TGP', 'Sorologias hepatite B e C', 'USG abdômen', 'Parar hepatotóxicos (álcool, paracetamol)', 'Silimarina 200mg 3x/dia', 'SAME 400mg 2x/dia']
        }
      }
    },
    tgp_alt: {
      nome: 'TGP/ALT (Transaminase Glutâmico Pirúvica)',
      unidade: 'U/L',
      referencia: { homem: '<41', mulher: '<33' },
      ideal: { homem: '<30', mulher: '<25' },
      interpretacao: {
        alto: {
          significado: 'Lesão hepatocelular (mais específico que TGO)',
          causas: ['Esteatose hepática não alcoólica (DHGNA/NASH)', 'Hepatite viral', 'Hepatite medicamentosa', 'Hepatite autoimune', 'Hemocromatose', 'Doença de Wilson'],
          predisposicoes: ['Fibrose hepática', 'Cirrose', 'Hepatocarcinoma'],
          orientacoes: ['TGP é mais específico para fígado que TGO', 'Perda de peso se esteatose', 'Dieta low-carb', 'Exercícios', 'Silimarina', 'Vitamina E 400-800 UI', 'Ômega-3', 'Evitar álcool completamente']
        }
      }
    },
    gama_gt: {
      nome: 'Gama-GT (Gama-Glutamil Transferase)',
      unidade: 'U/L',
      referencia: { homem: '<55', mulher: '<38' },
      ideal: { homem: '<30', mulher: '<20' },
      interpretacao: {
        alto: {
          significado: 'Colestase ou consumo de álcool',
          causas: ['Consumo de álcool', 'Esteatose hepática', 'Colestase (obstrução biliar)', 'Uso de medicamentos (fenitoína, fenobarbital)', 'Síndrome metabólica'],
          predisposicoes: ['Doença hepática alcoólica', 'Cirrose', 'Risco cardiovascular'],
          orientacoes: ['Marcador sensível ao consumo de álcool', 'Suspender álcool', 'Investigar vias biliares (USG)', 'Silimarina', 'N-acetilcisteína 600mg 2x/dia']
        }
      }
    },
    fosfatase_alcalina: {
      nome: 'Fosfatase Alcalina (FA)',
      unidade: 'U/L',
      referencia: { adulto: '30-120' },
      ideal: '50-90',
      interpretacao: {
        alto: {
          significado: 'Colestase ou doença óssea',
          causas: ['Colestase (obstrução biliar)', 'Hepatite', 'Cirrose biliar primária', 'Doença de Paget (óssea)', 'Metástases ósseas', 'Hiperparatireoidismo', 'Fraturas ósseas', 'Crescimento (crianças/adolescentes)', 'Gravidez (3º trimestre)'],
          predisposicoes: ['Obstrução biliar', 'Doença óssea metabólica'],
          orientacoes: ['Se FA alta + GGT alta: origem hepática (colestase)', 'Se FA alta + GGT normal: origem óssea', 'USG ou CPRM de vias biliares', 'Investigar causas ósseas']
        }
      }
    },
    bilirrubina_total: {
      nome: 'Bilirrubina Total',
      unidade: 'mg/dL',
      referencia: { normal: '0.3-1.2' },
      ideal: '0.5-0.8',
      interpretacao: {
        alto: {
          significado: 'Icterícia - Hemólise, hepatopatia ou colestase',
          causas: ['Hemólise (anemia hemolítica)', 'Hepatite', 'Cirrose', 'Síndrome de Gilbert', 'Obstrução biliar (coledocolitíase)', 'Colangite'],
          predisposicoes: ['Icterícia (se >2-3)', 'Kernicterus (neonatos)', 'Insuficiência hepática'],
          orientacoes: ['Fracionamento (direta e indireta) para diagnóstico diferencial', 'Se indireta alta: hemólise ou Gilbert', 'Se direta alta: colestase ou hepatopatia', 'USG abdômen', 'Investigar causas']
        }
      }
    },
    bilirrubina_direta: {
      nome: 'Bilirrubina Direta (Conjugada)',
      unidade: 'mg/dL',
      referencia: { normal: '<0.3' },
      ideal: '<0.2',
      interpretacao: {
        alto: {
          significado: 'Colestase ou doença hepatocelular',
          causas: ['Obstrução biliar', 'Hepatite', 'Cirrose', 'Colangite', 'Síndrome de Dubin-Johnson', 'Rotor'],
          predisposicoes: ['Insuficiência hepática', 'Colestase prolongada'],
          orientacoes: ['USG vias biliares', 'CPRM se necessário', 'Colangiografia endoscópica (CPRE) se obstrução']
        }
      }
    },
    bilirrubina_indireta: {
      nome: 'Bilirrubina Indireta (Não Conjugada)',
      unidade: 'mg/dL',
      referencia: { normal: '<0.8' },
      ideal: '<0.6',
      interpretacao: {
        alto: {
          significado: 'Hemólise ou Síndrome de Gilbert',
          causas: ['Anemia hemolítica', 'Síndrome de Gilbert (benigna)', 'Talassemia', 'Anemia falciforme', 'Reabsorção de hematomas'],
          predisposicoes: ['Icterícia', 'Anemia se hemólise'],
          orientacoes: ['Hemograma completo', 'Reticulócitos', 'Coombs direto', 'Síndrome de Gilbert: benigna, piora com jejum/estresse']
        }
      }
    },
    albumina: {
      nome: 'Albumina Sérica',
      unidade: 'g/dL',
      referencia: { normal: '3.5-5.5' },
      ideal: '4.0-4.8',
      interpretacao: {
        baixo: {
          significado: 'Hipoalbuminemia - Desnutrição, hepatopatia ou nefropatia',
          causas: ['Cirrose', 'Insuficiência hepática', 'Desnutrição proteica', 'Síndrome nefrótica', 'Enteropatia perdedora de proteínas', 'Inflamação crônica'],
          predisposicoes: ['Edema/ascite', 'Infecções', 'Cicatrização prejudicada'],
          orientacoes: ['Aumentar ingestão proteica (1.2-1.5g/kg/dia)', 'BCAA (aminoácidos de cadeia ramificada)', 'Tratar causa base', 'Albumina IV se <2.5 e edema']
        }
      }
    },
    proteinas_totais: {
      nome: 'Proteínas Totais',
      unidade: 'g/dL',
      referencia: { normal: '6.0-8.3' },
      ideal: '6.8-7.5',
      interpretacao: {
        baixo: {
          significado: 'Hipoproteinemia',
          causas: ['Mesmas da albumina baixa'],
          predisposicoes: ['Edema', 'Imunossupressão'],
          orientacoes: ['Suplementação proteica', 'Investigar causa']
        },
        alto: {
          significado: 'Hiperproteinemia',
          causas: ['Desidratação', 'Mieloma múltiplo', 'Macroglobulinemia de Waldenström', 'Doenças autoimunes'],
          predisposicoes: ['Paraproteinemias'],
          orientacoes: ['Eletroforese de proteínas', 'Imunofixação se mieloma suspeito']
        }
      }
    },
    globulinas: {
      nome: 'Globulinas',
      unidade: 'g/dL',
      referencia: { normal: '2.0-3.5' },
      ideal: '2.3-3.0',
      interpretacao: {
        baixo: {
          significado: 'Hipoglobulinemia - Imunodeficiência',
          causas: ['Imunodeficiência primária', 'Uso de imunossupressores'],
          predisposicoes: ['Infecções recorrentes'],
          orientacoes: ['Dosagem de imunoglobulinas', 'Avaliação imunológica']
        },
        alto: {
          significado: 'Hiperglobulinemia - Inflamação crônica ou paraproteinemia',
          causas: ['Doenças autoimunes', 'Infecções crônicas', 'Cirrose', 'Mieloma múltiplo'],
          predisposicoes: ['Paraproteinemia'],
          orientacoes: ['Eletroforese de proteínas', 'VHS', 'PCR']
        }
      }
    }
  }
};

// Função Renal
LABORATORY_EXAMS.funcao_renal = {
  categoria: 'Função Renal',
  exames: {
    ureia: {
      nome: 'Ureia',
      unidade: 'mg/dL',
      referencia: { normal: '15-45' },
      ideal: '20-35',
      interpretacao: {
        baixo: {
          significado: 'Produção reduzida de ureia',
          causas: ['Desnutrição proteica', 'Doença hepática grave', 'Super-hidratação'],
          predisposicoes: ['Perda muscular'],
          orientacoes: ['Avaliar função hepática', 'Aumentar ingestão proteica']
        },
        alto: {
          significado: 'Insuficiência renal, desidratação ou catabolismo proteico',
          causas: ['Insuficiência renal aguda ou crônica', 'Desidratação', 'Sangramento gastrointestinal', 'Catabolismo proteico aumentado', 'Dieta hiperproteica', 'Insuficiência cardíaca'],
          predisposicoes: ['Insuficiência renal', 'Encefalopatia urêmica'],
          orientacoes: ['Hidratação se desidratação', 'Calcular relação ureia/creatinina', 'Se relação >20: causa pré-renal', 'Diálise se IRC avançada (ureia >150-200)']
        }
      }
    },
    creatinina: {
      nome: 'Creatinina Sérica',
      unidade: 'mg/dL',
      referencia: { homem: '0.7-1.2', mulher: '0.5-1.1' },
      ideal: { homem: '0.8-1.0', mulher: '0.6-0.9' },
      interpretacao: {
        alto: {
          significado: 'Insuficiência renal',
          causas: ['Doença renal crônica', 'Lesão renal aguda', 'Desidratação', 'Rabdomiólise', 'Uso de nefrotóxicos (AINEs, contraste, aminoglicosídeos)', 'Obstrução urinária'],
          predisposicoes: ['Progressão para IRC terminal', 'Necessidade de diálise'],
          orientacoes: ['Calcular TFG (taxa de filtração glomerular)', 'Identificar e tratar causa', 'Suspender nefrotóxicos', 'Ajustar doses de medicamentos', 'Dieta com restrição proteica moderada se IRC', 'Controle de pressão arterial', 'IECA ou BRA', 'Encaminhar nefrologista se TFG <30']
        }
      }
    },
    tfg_ckd_epi: {
      nome: 'TFG CKD-EPI (Taxa de Filtração Glomerular)',
      unidade: 'mL/min/1.73m²',
      referencia: { normal: '>90' },
      ideal: '>90',
      interpretacao: {
        baixo: {
          significado: 'Insuficiência renal crônica (classificação em estágios)',
          causas: ['Diabetes', 'Hipertensão', 'Glomerulonefrite', 'Doença renal policística', 'Nefropatia obstrutiva'],
          predisposicoes: ['Progressão para IRC terminal', 'Doença cardiovascular', 'Anemia', 'Doença óssea'],
          orientacoes: [
            'Estágio 1 (TFG >90): Normal com lesão renal',
            'Estágio 2 (TFG 60-89): Lesão renal leve',
            'Estágio 3a (TFG 45-59): IRC moderada',
            'Estágio 3b (TFG 30-44): IRC moderada a severa',
            'Estágio 4 (TFG 15-29): IRC severa - encaminhar nefrologista',
            'Estágio 5 (TFG <15): IRC terminal - diálise ou transplante',
            'Controle rigoroso de PA (<130/80)',
            'IECA/BRA',
            'Controle glicêmico se diabético',
            'Evitar nefrotóxicos'
          ]
        }
      }
    },
    acido_urico: {
      nome: 'Ácido Úrico',
      unidade: 'mg/dL',
      referencia: { homem: '3.5-7.2', mulher: '2.6-6.0' },
      ideal: { homem: '4.0-6.0', mulher: '3.0-5.0' },
      interpretacao: {
        baixo: {
          significado: 'Hipo-uricemia (raro)',
          causas: ['Síndrome de Fanconi', 'Uso de alopurinol', 'Doença de Wilson'],
          predisposicoes: ['Geralmente benigno'],
          orientacoes: ['Investigar se sintomático']
        },
        alto: {
          significado: 'Hiperuricemia - Gota ou risco de cálculos renais',
          causas: ['Dieta rica em purinas (carnes vermelhas, frutos do mar)', 'Consumo de álcool (cerveja)', 'Obesidade', 'Síndrome metabólica', 'Insuficiência renal', 'Uso de diuréticos', 'Desidratação', 'Quimioterapia (síndrome de lise tumoral)'],
          predisposicoes: ['Gota (artrite úrica)', 'Nefrolitíase (cálculos de ácido úrico)', 'Nefropatia por ácido úrico', 'Risco cardiovascular'],
          orientacoes: ['Dieta: evitar purinas (carnes vermelhas, vísceras, frutos do mar)', 'Reduzir/evitar álcool', 'Aumentar consumo de água (>2L/dia)', 'Perda de peso', 'Alopurinol 100-300mg/dia se >9 ou gota', 'Febuxostat 40-80mg se intolerância a alopurinol', 'Alcalinizar urina (citrato de potássio)', 'Vitamina C 500mg/dia', 'Cerejas ou extrato de cereja']
        }
      }
    },
    cistatina_c: {
      nome: 'Cistatina C',
      unidade: 'mg/L',
      referencia: { normal: '0.53-0.95' },
      ideal: '0.60-0.85',
      interpretacao: {
        alto: {
          significado: 'Marcador precoce de disfunção renal',
          causas: ['Insuficiência renal (mais precoce que creatinina)'],
          predisposicoes: ['IRC'],
          orientacoes: ['Útil quando creatinina é pouco confiável (extremos de massa muscular)', 'Calcular TFG por cistatina C']
        }
      }
    },
    microalbuminuria: {
      nome: 'Microalbuminúria',
      unidade: 'mg/L',
      referencia: { normal: '<30', microalbuminuria: '30-300', macroalbuminuria: '>300' },
      ideal: '<15',
      interpretacao: {
        alto: {
          significado: 'Lesão renal precoce ou risco cardiovascular',
          causas: ['Nefropatia diabética (inicial)', 'Hipertensão', 'Glomerulonefrite inicial'],
          predisposicoes: ['Progressão para IRC', 'Risco cardiovascular aumentado'],
          orientacoes: ['IECA ou BRA (renal-protetor)', 'Controle glicêmico rigoroso se diabético', 'Controle pressórico <130/80', 'Repetir anualmente']
        }
      }
    },
    proteinuria_24h: {
      nome: 'Proteinúria de 24 horas',
      unidade: 'mg/24h',
      referencia: { normal: '<150' },
      ideal: '<100',
      interpretacao: {
        alto: {
          significado: 'Lesão renal significativa',
          causas: ['Nefropatia diabética', 'Glomerulonefrite', 'Síndrome nefrótica (>3500)', 'Hipertensão', 'Lúpus (nefrite lúpica)'],
          predisposicoes: ['Síndrome nefrótica', 'IRC progressiva'],
          orientacoes: ['IECA/BRA', 'Corticoides se glomerulonefrite', 'Reduzir sal', 'Controle de PA', 'Avaliar necessidade de biópsia renal']
        }
      }
    }
  }
};

// ==================== INTEGRAÇÃO COM ARQUIVOS EXPANDIDOS ====================

// Adicionar categorias dos arquivos de expansão
LABORATORY_EXAMS.funcao_tireoidiana = {
  categoria: 'Função Tireoidiana',
  exames: {
    tsh: {
      nome: 'TSH (Hormônio Tireoestimulante)',
      unidade: 'μUI/mL',
      referencia: { geral: '0.4-4.0' },
      ideal: '1.0-2.0',
      interpretacao: {
        baixo: {
          significado: 'Hipertireoidismo - Excesso de hormônios tireoidianos',
          causas: ['Doença de Graves', 'Tireoidite', 'Adenoma tóxico', 'Uso excessivo de levotiroxina'],
          predisposicoes: ['Taquicardia', 'Perda de peso', 'Ansiedade', 'Tremores', 'Osteoporose', 'Fibrilação atrial'],
          orientacoes: ['Dosar T4 livre e T3', 'Anticorpos anti-TPO e anti-TRAb', 'US tireoide', 'Reduzir dose de levotiroxina se em uso', 'Carnitina 1g/dia para sintomas']
        },
        alto: {
          significado: 'Hipotireoidismo - Insuficiência tireoidiana',
          causas: ['Tireoidite de Hashimoto', 'Deficiência de iodo', 'Pós-tireoidectomia', 'Radiação', 'Medicações (lítio, amiodarona)'],
          predisposicoes: ['Fadiga', 'Ganho de peso', 'Constipação', 'Depressão', 'Colesterol alto', 'Queda de cabelo', 'Pele seca'],
          orientacoes: ['Dosar T4 livre', 'Anticorpos anti-TPO', 'Levotiroxina conforme necessário', 'Selênio 200mcg/dia', 'Iodo se deficiente']
        }
      }
    }
  }
};

LABORATORY_EXAMS.diabetes_glicemia = {
  categoria: 'Diabetes e Glicemia',
  exames: {
    glicemia_jejum: {
      nome: 'Glicemia de Jejum',
      unidade: 'mg/dL',
      referencia: { geral: '70-100' },
      ideal: '80-90',
      interpretacao: {
        baixo: {
          significado: 'Hipoglicemia',
          causas: ['Jejum prolongado', 'Excesso de insulina', 'Medicamentos', 'Insulinoma'],
          predisposicoes: ['Confusão mental', 'Tremores', 'Sudorese', 'Convulsões'],
          orientacoes: ['Comer carboidratos de absorção rápida', 'Investigar causa']
        },
        alto: {
          significado: 'Hiperglicemia - Pré-diabetes ou Diabetes',
          causas: ['Diabetes mellitus tipo 1 ou 2', 'Resistência insulínica', 'Obesidade', 'Sedentarismo'],
          predisposicoes: ['Complicações microvasculares', 'Neuropatia', 'Retinopatia', 'Nefropatia'],
          orientacoes: ['Dieta low-carb', 'Exercícios', 'Metformina 500-2000mg/dia', 'Berberina 500mg 3x/dia', 'Hemoglobina glicada']
        }
      }
    },
    peptideo_c: {
      nome: 'Peptídeo C',
      unidade: 'ng/mL',
      referencia: { geral: '0.8-3.1' },
      ideal: '1.5-2.5',
      interpretacao: {
        baixo: {
          significado: 'Baixa produção de insulina endógena',
          causas: [
            'Diabetes tipo 1',
            'Pancreatite crônica',
            'Pancreatectomia',
            'Diabetes tipo 2 avançado (falência das células beta)'
          ],
          predisposicoes: [
            'Dependência de insulina exógena',
            'Hiperglicemia descontrolada',
            'Cetoacidose diabética'
          ],
          orientacoes: [
            'Confirma diabetes tipo 1 se <0.5ng/mL',
            'Insulinoterapia necessária',
            'Avaliar anticorpos anti-GAD e anti-IA2',
            'Monitoramento glicêmico rigoroso',
            'Acompanhamento endocrinológico'
          ]
        },
        alto: {
          significado: 'Alta produção de insulina - Resistência insulínica ou insulinoma',
          causas: [
            'Resistência insulínica (pré-diabetes)',
            'Diabetes tipo 2 inicial',
            'Síndrome metabólica',
            'Obesidade',
            'Insulinoma (tumor pancreático)',
            'Uso de sulfoniluréias'
          ],
          predisposicoes: [
            'Progressão para diabetes tipo 2',
            'Síndrome metabólica',
            'Doenças cardiovasculares',
            'Ovários policísticos'
          ],
          orientacoes: [
            'Dosar insulina de jejum e glicemia',
            'Calcular HOMA-IR (resistência insulínica)',
            'Dieta low-carb',
            'Exercícios regulares',
            'Perda de peso (5-10%)',
            'Metformina 500-2000mg/dia',
            'Berberina 500mg 3x/dia',
            'Se peptídeo C >5 com hipoglicemia: investigar insulinoma'
          ]
        }
      }
    }
  }
};

LABORATORY_EXAMS.hormonios_sexuais = {
  categoria: 'Hormônios Sexuais',
  exames: {
    testosterona_total: {
      nome: 'Testosterona Total',
      unidade: 'ng/dL',
      referencia: { homem: '300-1000', mulher: '15-70' },
      ideal: { homem: '500-800', mulher: '30-50' },
      interpretacao: {
        baixo: {
          significado: 'Hipogonadismo - Baixa produção de testosterona',
          causas: ['Envelhecimento', 'Obesidade', 'Diabetes', 'Estresse crônico', 'Uso de opioides'],
          predisposicoes: ['Fadiga', 'Perda de massa muscular', 'Disfunção erétil', 'Depressão', 'Osteoporose'],
          orientacoes: ['Perda de peso', 'Exercícios de força', 'Zinco 30mg', 'Vitamina D', 'TRT (reposição) se indicado']
        },
        alto: {
          significado: 'Hiperandrogenismo',
          causas: ['SOP (mulheres)', 'Tumor produtor de testosterona', 'Uso de anabolizantes'],
          predisposicoes: ['Acne', 'Hirsutismo', 'Calvície', 'Agressividade'],
          orientacoes: ['Investigar causa', 'Antiandrogênios se necessário']
        }
      }
    },
    dhea_s: {
      nome: 'DHEA-S (Sulfato de Dehidroepiandrosterona)',
      unidade: 'µg/dL',
      referencia: { homem: '80-560', mulher: '35-430' },
      ideal: { homem: '350-450', mulher: '250-350' },
      interpretacao: {
        baixo: {
          significado: 'Insuficiência adrenal ou envelhecimento',
          causas: [
            'Envelhecimento natural',
            'Insuficiência adrenal',
            'Doença de Addison',
            'Estresse crônico severo',
            'Uso prolongado de corticoides'
          ],
          predisposicoes: [
            'Fadiga crônica',
            'Baixa libido',
            'Depressão',
            'Perda de massa muscular',
            'Envelhecimento acelerado',
            'Sistema imune comprometido'
          ],
          orientacoes: [
            'Avaliar cortisol salivar (ritmo circadiano)',
            'ACTH se suspeita de Addison',
            'Suplementar DHEA 25-50mg/dia',
            'Gerenciamento de estresse',
            'Exercícios moderados',
            'Sono adequado (7-9h)'
          ]
        },
        alto: {
          significado: 'Hiperandrogenismo - Produção adrenal excessiva',
          causas: [
            'SOP (Síndrome dos Ovários Policísticos)',
            'Tumor adrenal',
            'Hiperplasia adrenal congênita',
            'Suplementação excessiva'
          ],
          predisposicoes: [
            'Acne',
            'Hirsutismo (mulheres)',
            'Irregularidade menstrual',
            'Resistência insulínica'
          ],
          orientacoes: [
            'Investigar fonte: TC/RM adrenal',
            'Dosar 17-OH progesterona',
            'Avaliar testosterona',
            'Tratamento da SOP se confirmado'
          ]
        }
      }
    },
    estradiol: {
      nome: 'Estradiol (E2)',
      unidade: 'pg/mL',
      referencia: { 
        homem: '10-40',
        'mulher_folicular': '20-145',
        'mulher_ovulacao': '112-443',
        'mulher_lutea': '50-241',
        'mulher_menopausa': '<32'
      },
      ideal: { 
        homem: '20-30',
        'mulher_folicular': '50-100',
        'mulher_ovulacao': '200-400',
        'mulher_lutea': '100-200'
      },
      interpretacao: {
        baixo: {
          significado: 'Hipoestrogenismo - Deficiência de estrogênio',
          causas: [
            'Menopausa',
            'Insuficiência ovariana prematura',
            'Amenorreia hipotalâmica',
            'Anorexia nervosa',
            'Exercício excessivo',
            'Hipogonadismo'
          ],
          predisposicoes: [
            'Osteoporose',
            'Fogachos e suores noturnos',
            'Secura vaginal',
            'Atrofia urogenital',
            'Alterações de humor',
            'Doenças cardiovasculares',
            'Declínio cognitivo'
          ],
          orientacoes: [
            'TRH (Terapia de Reposição Hormonal) se indicado',
            'Fitoestrógenos: soja, linhaça',
            'Cimicifuga racemosa 80mg/dia',
            'Cálcio 1200mg + Vitamina D',
            'Exercícios de resistência',
            'Ômega-3'
          ]
        },
        alto: {
          significado: 'Hiperestrogenia - Excesso de estrogênio',
          causas: [
            'Dominância estrogênica',
            'Obesidade',
            'TRH excessiva',
            'Tumor produtor de estrogênio',
            'Disfunção hepática'
          ],
          predisposicoes: [
            'Sangramento uterino anormal',
            'Hiperplasia endometrial',
            'Câncer de mama/endométrio',
            'Ganho de peso',
            'Retenção hídrica'
          ],
          orientacoes: [
            'Reduzir TRH se em uso',
            'Perda de peso',
            'DIM (Diindolilmetano) 200mg/dia',
            'Crucíferas na dieta',
            'Suporte hepático (detox)',
            'Avaliar progesterona (equilíbrio)'
          ]
        }
      }
    },
    progesterona: {
      nome: 'Progesterona',
      unidade: 'ng/mL',
      referencia: {
        homem: '<1.0',
        'mulher_folicular': '<1.5',
        'mulher_ovulacao': '<3.0',
        'mulher_lutea': '5.0-20.0',
        'mulher_menopausa': '<1.0'
      },
      ideal: {
        'mulher_lutea': '10-25'
      },
      interpretacao: {
        baixo: {
          significado: 'Deficiência de progesterona - Fase lútea inadequada',
          causas: [
            'Anovulação',
            'Insuficiência do corpo lúteo',
            'SOP',
            'Estresse crônico',
            'Perimenopausa',
            'Exercício excessivo'
          ],
          predisposicoes: [
            'Infertilidade',
            'Abortos recorrentes',
            'SPM (Síndrome pré-menstrual) severa',
            'Sangramento irregular',
            'Dominância estrogênica relativa',
            'Ansiedade, insônia'
          ],
          orientacoes: [
            'Progesterona micronizada 200-300mg/dia (fase lútea)',
            'Vitex agnus-castus 400mg/dia',
            'Reduzir estresse',
            'Magnésio 400mg/dia',
            'Vitamina B6 100mg/dia',
            'Exercícios moderados'
          ]
        },
        alto: {
          significado: 'Excesso de progesterona (raro)',
          causas: [
            'Gravidez',
            'Tumor produtor de progesterona',
            'Suplementação excessiva',
            'Hiperplasia adrenal'
          ],
          predisposicoes: [
            'Sonolência',
            'Letargia',
            'Retenção hídrica'
          ],
          orientacoes: [
            'Confirmar gravidez',
            'Reduzir suplementação se em uso',
            'Investigar tumores se necessário'
          ]
        }
      }
    }
  }
};

LABORATORY_EXAMS.vitaminas = {
  categoria: 'Vitaminas',
  exames: {
    vitamina_d: {
      nome: 'Vitamina D (25-OH)',
      unidade: 'ng/mL',
      referencia: { geral: '30-100' },
      ideal: '50-80',
      interpretacao: {
        baixo: {
          significado: 'Deficiência de Vitamina D',
          causas: ['Baixa exposição solar', 'Dieta pobre', 'Má absorção', 'Obesidade', 'Insuficiência renal'],
          predisposicoes: ['Osteoporose', 'Fraqueza muscular', 'Imunidade baixa', 'Depressão', 'Doenças autoimunes'],
          orientacoes: ['Suplementação: 5.000-10.000 UI/dia (reposição)', 'Manutenção: 2.000-4.000 UI/dia', 'Exposição solar 15-20min/dia', 'Cofatores: magnésio, vitamina K2']
        },
        alto: {
          significado: 'Intoxicação por Vitamina D (raro)',
          causas: ['Suplementação excessiva'],
          predisposicoes: ['Hipercalcemia', 'Nefrolitíase'],
          orientacoes: ['Suspender suplementação', 'Hidratação']
        }
      }
    }
  }
};

LABORATORY_EXAMS.eletrolitos_minerais = {
  categoria: 'Eletrólitos e Minerais',
  exames: {
    sodio: {
      nome: 'Sódio (Na+)',
      unidade: 'mEq/L',
      referencia: { geral: '135-145' },
      ideal: '138-142',
      interpretacao: {
        baixo: {
          significado: 'Hiponatremia - Baixa concentração de sódio',
          causas: ['Excesso de água (SIADH)', 'Insuficiência cardíaca', 'Cirrose', 'Uso de diuréticos'],
          predisposicoes: ['Confusão mental', 'Convulsões', 'Coma (se <120)', 'Edema cerebral'],
          orientacoes: ['Se <125: emergência médica', 'Restrição hídrica se SIADH', 'Solução salina hipertônica se severo']
        },
        alto: {
          significado: 'Hipernatremia - Desidratação ou excesso de sódio',
          causas: ['Desidratação', 'Diabetes insípido', 'Febre', 'Excesso de sal'],
          predisposicoes: ['Sede intensa', 'Confusão', 'Convulsões'],
          orientacoes: ['Hidratação oral ou IV', 'Investigar diabetes insípido']
        }
      }
    }
  }
};

LABORATORY_EXAMS.marcadores_cardiacos = {
  categoria: 'Marcadores Cardíacos',
  exames: {
    troponina_i: {
      nome: 'Troponina I Cardíaca',
      unidade: 'ng/mL',
      referencia: { geral: '<0.04' },
      ideal: '<0.01',
      interpretacao: {
        alto: {
          significado: 'Lesão miocárdica - Infarto agudo do miocárdio',
          causas: ['Infarto agudo do miocárdio', 'Angina instável', 'Miocardite', 'Embolia pulmonar'],
          predisposicoes: ['Necrose miocárdica', 'Insuficiência cardíaca'],
          orientacoes: ['EMERGÊNCIA - ECG e avaliação cardiológica imediata', 'Antiagregação plaquetária', 'Anticoagulação', 'Coronariografia']
        }
      }
    }
  }
};

LABORATORY_EXAMS.coagulacao = {
  categoria: 'Coagulação',
  exames: {
    d_dimero: {
      nome: 'D-dímero',
      unidade: 'ng/mL',
      referencia: { geral: '<500' },
      ideal: '<250',
      interpretacao: {
        alto: {
          significado: 'Ativação da coagulação e fibrinólise - Trombose',
          causas: ['TVP (trombose venosa profunda)', 'Embolia pulmonar', 'CIVD', 'Pós-operatório', 'Gravidez'],
          predisposicoes: ['Trombose ativa'],
          orientacoes: ['Doppler venoso ou angio-TC se suspeita de TVP/EP', 'Anticoagulação se confirmado']
        }
      }
    }
  }
};

LABORATORY_EXAMS.marcadores_tumorais = {
  categoria: 'Marcadores Tumorais',
  exames: {
    psa_total: {
      nome: 'PSA Total',
      unidade: 'ng/mL',
      referencia: { geral: '<4.0' },
      ideal: '<2.0',
      interpretacao: {
        alto: {
          significado: 'Elevação do antígeno prostático - Câncer ou HPB',
          causas: ['Câncer de próstata', 'Hiperplasia prostática benigna (HPB)', 'Prostatite'],
          predisposicoes: ['Neoplasia prostática'],
          orientacoes: ['Calcular PSA livre/total', 'Toque retal', 'RM de próstata se PSA >4', 'Biópsia se indicado']
        }
      }
    }
  }
};

LABORATORY_EXAMS.marcadores_inflamatorios = {
  categoria: 'Marcadores Inflamatórios',
  exames: {
    pcr_ultrassensivel: {
      nome: 'PCR Ultra-sensível (hs-CRP)',
      unidade: 'mg/L',
      referencia: { geral: '<3.0' },
      ideal: '<1.0',
      interpretacao: {
        alto: {
          significado: 'Inflamação crônica de baixo grau - Risco cardiovascular',
          causas: ['Aterosclerose', 'Síndrome metabólica', 'Obesidade', 'Resistência insulínica'],
          predisposicoes: ['Infarto', 'AVC', 'Doença cardiovascular'],
          orientacoes: ['Dieta anti-inflamatória', 'Ômega-3 2-3g/dia', 'Curcumina 1g/dia', 'Exercícios', 'Perda de peso']
        }
      }
    }
  }
};

LABORATORY_EXAMS.urina_tipo_i = {
  categoria: 'Urina Tipo I (EAS)',
  exames: {
    proteinas_urina: {
      nome: 'Proteínas na Urina',
      unidade: 'mg/dL',
      referencia: { geral: '<30' },
      ideal: 'negativo',
      interpretacao: {
        positivo: {
          significado: 'Proteinúria - Lesão glomerular ou tubular',
          causas: ['Nefropatia diabética', 'Glomerulonefrite', 'Hipertensão', 'Mieloma múltiplo'],
          predisposicoes: ['Doença renal crônica', 'Síndrome nefrótica'],
          orientacoes: ['Proteinúria de 24h', 'Relação proteína/creatinina urinária', 'Investigar causa']
        }
      }
    }
  }
};

LABORATORY_EXAMS.gasometria = {
  categoria: 'Gasometria Arterial',
  exames: {
    ph_arterial: {
      nome: 'pH Arterial',
      unidade: '',
      referencia: { geral: '7.35-7.45' },
      ideal: '7.40',
      interpretacao: {
        baixo: {
          significado: 'Acidemia - Acidose metabólica ou respiratória',
          causas: ['Cetoacidose diabética', 'Acidose lática', 'Insuficiência renal', 'Diarréia'],
          predisposicoes: ['Arritmias', 'Hipercalemia', 'Depressão do SNC'],
          orientacoes: ['Tratar causa base', 'Bicarbonato se pH <7.1', 'Suporte ventilatório se respiratório']
        },
        alto: {
          significado: 'Alcalemia - Alcalose metabólica ou respiratória',
          causas: ['Vômitos', 'Uso de diuréticos', 'Hiperventilação'],
          predisposicoes: ['Tetania', 'Confusão', 'Arritmias'],
          orientacoes: ['Tratar causa', 'Reposição de K e Cl se metabólica']
        }
      }
    }
  }
};

LABORATORY_EXAMS.exames_funcionais_adrenal = {
  categoria: 'Função Adrenal e Estresse',
  exames: {
    cortisol_salivar: {
      nome: 'Cortisol Salivar (Ritmo Circadiano)',
      unidade: 'ng/mL',
      referencia: {
        'manha_despertar': '3.7-9.5',
        'meio_dia': '1.2-3.0',
        'tarde': '0.6-1.9',
        'noite': '0.4-1.0'
      },
      ideal: {
        'manha_despertar': '5.0-8.0',
        'meio_dia': '1.5-2.5',
        'tarde': '1.0-1.5',
        'noite': '0.5-0.8'
      },
      interpretacao: {
        baixo: {
          significado: 'Fadiga adrenal / Insuficiência adrenal',
          causas: [
            'Estresse crônico prolongado (burnout)',
            'Insuficiência adrenal primária (Addison)',
            'Insuficiência adrenal secundária (hipofisária)',
            'Uso prolongado de corticoides (supressão)',
            'Doenças autoimunes',
            'Infecções crônicas'
          ],
          predisposicoes: [
            'Fadiga extrema, especialmente pela manhã',
            'Hipotensão postural',
            'Baixa resistência ao estresse',
            'Desejo por sal e açúcar',
            'Sono não reparador',
            'Dificuldade de concentração',
            'Sistema imune comprometido'
          ],
          orientacoes: [
            'Teste ACTH para diferenciar primária/secundária',
            'Repouso e redução de estressores',
            'Adaptógenos: Ashwagandha 300-600mg 2x/dia, Rhodiola 200mg',
            'Vitamina C 1000-2000mg/dia',
            'Vitamina B5 (ácido pantotênico) 500mg/dia',
            'Sal marinho (se hipotensão)',
            'Sono regular 8-9h',
            'Evitar jejum prolongado'
          ]
        },
        alto: {
          significado: 'Hipercortisolismo - Estresse agudo ou Síndrome de Cushing',
          causas: [
            'Estresse agudo intenso',
            'Síndrome de Cushing',
            'Tumor adrenal ou pituitário',
            'Uso de corticoides',
            'Depressão severa',
            'Alcoolismo'
          ],
          predisposicoes: [
            'Ganho de peso central (abdominal)',
            'Face em lua cheia',
            'Hipertensão',
            'Hiperglicemia/diabetes',
            'Osteoporose',
            'Imunossupressão',
            'Insônia',
            'Ansiedade'
          ],
          orientacoes: [
            'Teste de supressão com dexametasona',
            'Cortisol livre urinário 24h',
            'RM sela túrcica e TC adrenal',
            'Técnicas de redução de estresse: meditação, yoga',
            'Fosfatidilserina 300mg/dia',
            'Magnésio 400mg/noite',
            'Ômega-3 2g/dia',
            'Exercícios leves (evitar overtraining)'
          ]
        }
      }
    }
  }
};

LABORATORY_EXAMS.exames_intestinais = {
  categoria: 'Função Intestinal',
  exames: {
    calprotectina_fecal: {
      nome: 'Calprotectina Fecal',
      unidade: 'µg/g',
      referencia: { geral: '<50' },
      ideal: '<25',
      interpretacao: {
        alto: {
          significado: 'Inflamação intestinal ativa - DII ou outras causas',
          causas: [
            'Doença de Crohn',
            'Retocolite ulcerativa',
            'Infecções intestinais (bacterianas/parasitárias)',
            'Uso de AINEs',
            'Diverticulite',
            'Pólipos colorretais',
            'Câncer colorretal'
          ],
          predisposicoes: [
            'Dor abdominal crônica',
            'Diarreia persistente',
            'Sangue nas fezes',
            'Perda de peso',
            'Fadiga',
            'Má absorção de nutrientes'
          ],
          orientacoes: [
            '50-200: Inflamação leve - Repetir em 4-6 semanas',
            '200-600: Inflamação moderada - Investigar com colonoscopia',
            '>600: Inflamação severa - DII provável, colonoscopia urgente',
            'Dieta anti-inflamatória (sem glúten, laticínios)',
            'Glutamina 5g 3x/dia',
            'Probióticos de alta potência',
            'Ômega-3 3-4g/dia',
            'Curcumina 1g 3x/dia',
            'Vitamina D >50ng/mL',
            'Considerar protocolo DII se confirmado'
          ]
        }
      }
    }
  }
};

LABORATORY_EXAMS.neurotransmissores = {
  categoria: 'Neurotransmissores',
  exames: {
    serotonina_serica: {
      nome: 'Serotonina Sérica',
      unidade: 'ng/mL',
      referencia: { geral: '50-200' },
      ideal: '100-180',
      interpretacao: {
        baixo: {
          significado: 'Deficiência de serotonina - Impacto no humor e sono',
          causas: [
            'Deficiência de triptofano (precursor)',
            'Deficiência de vitaminas B6, B9, B12',
            'Deficiência de magnésio e zinco',
            'Inflamação crônica',
            'Disbiose intestinal (90% serotonina é intestinal)',
            'Estresse crônico',
            'Uso de certos medicamentos'
          ],
          predisposicoes: [
            'Depressão',
            'Ansiedade',
            'Insônia (dificuldade para iniciar sono)',
            'Compulsão por carboidratos',
            'Baixa tolerância à dor',
            'Síndrome do intestino irritável',
            'TPM severa'
          ],
          orientacoes: [
            '5-HTP 50-100mg 2-3x/dia (precursor direto)',
            'Triptofano 500-1000mg/dia',
            'Vitamina B6 50-100mg/dia',
            'Magnésio 400mg/dia',
            'Ômega-3 2g/dia',
            'Probióticos (saúde intestinal)',
            'Exercícios aeróbicos regulares',
            'Exposição solar',
            'Alimentos ricos em triptofano: peru, ovos, banana, abacate',
            'Evitar excesso de proteína (compete com absorção de triptofano)'
          ]
        },
        alto: {
          significado: 'Excesso de serotonina ou Tumor carcinoide',
          causas: [
            'Síndrome carcinoide (tumor neuroendócrino)',
            'Síndrome serotoninérgica (overdose de antidepressivos)',
            'Suplementação excessiva'
          ],
          predisposicoes: [
            'Diarreia',
            'Rubor facial',
            'Asma/broncoespasmo',
            'Taquicardia',
            'Síndrome carcinoide: investigar tumor'
          ],
          orientacoes: [
            'Dosar 5-HIAA urinário (metabólito)',
            'TC/RM abdomen se suspeita de carcinoide',
            'Suspender suplementação se em uso',
            'Avaliar medicamentos (ISRS, IRSN)',
            'Acompanhamento oncológico se tumor'
          ]
        }
      }
    }
  }
};

/**
 * Lista todas as categorias disponíveis
 * Atualizado: 19 categorias completas
 */
export function getCategorias() {
  const cats = Object.keys(LABORATORY_EXAMS).map(key => ({
    id: key,
    nome: LABORATORY_EXAMS[key].categoria
  }));
  console.log('✅ Total de categorias carregadas:', cats.length, cats.map(c => c.nome));
  return cats;
}

/**
 * Lista todos os exames de uma categoria
 */
export function getExamesPorCategoria(categoria) {
  const cat = LABORATORY_EXAMS[categoria];
  if (!cat) {
    console.warn('❌ Categoria não encontrada:', categoria);
    return [];
  }
  
  const exames = Object.keys(cat.exames).map(key => ({
    id: key,
    ...cat.exames[key]
  }));
  
  console.log(`📋 Categoria "${cat.categoria}": ${exames.length} exames`);
  return exames;
}

// DEBUG: Verificar estrutura ao carregar
console.log('🔍 DEBUG - Total de categorias em LABORATORY_EXAMS:', Object.keys(LABORATORY_EXAMS).length);
console.log('🔍 DEBUG - Lista de categorias:', Object.keys(LABORATORY_EXAMS));
