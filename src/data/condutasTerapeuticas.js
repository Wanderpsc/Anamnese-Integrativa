/**
 * Condutas Terapêuticas Integrativas baseadas em diagnósticos laboratoriais
 * Integra fitoterapia, suplementação, dietas funcionais e outros tratamentos
 */

// Condutas para diferentes condições diagnosticadas
export const CONDUTAS_TERAPEUTICAS = {
  anemia_ferropriva: {
    titulo: 'ANEMIA FERROPRIVA (Deficiência de Ferro)',
    
    fitoterapia: [
      {
        planta: 'Urtiga (Urtica dioica)',
        partUsada: 'Folhas',
        dosagem: '3-6g/dia',
        posologia: 'Infusão: 1 colher de sopa para 200ml água. Tomar 2-3x/dia',
        duracao: '8-12 semanas',
        propriedades: 'Rica em ferro biodisponível, vitamina C e ácido fólico'
      },
      {
        planta: 'Agrião (Nasturtium officinale)',
        partUsada: 'Folhas frescas',
        dosagem: '50-100g/dia',
        posologia: 'Consumir cru em saladas ou suco fresco',
        duracao: 'Contínuo',
        propriedades: 'Rico em ferro, vitamina C, ácido fólico e B12'
      }
    ],
    
    suplementacao: [
      {
        nutriente: 'Ferro Bisglicinato',
        dosagem: '25-50mg de ferro elementar/dia',
        posologia: 'Tomar com vitamina C em jejum ou longe das refeições',
        duracao: '12-16 semanas, depois reavaliar',
        observacao: 'Forma quelada com melhor absorção e menos efeitos colaterais'
      },
      {
        nutriente: 'Vitamina C',
        dosagem: '500-1000mg/dia',
        posologia: 'Junto com o ferro',
        duracao: 'Durante toda suplementação de ferro',
        observacao: 'Aumenta absorção do ferro em até 3x'
      },
      {
        nutriente: 'Ácido Fólico + B12',
        dosagem: 'Ácido fólico 400mcg + B12 1000mcg',
        posologia: '1x/dia',
        duracao: '12 semanas',
        observacao: 'Essenciais para eritropoiese adequada'
      }
    ],
    
    dietoterapia: [
      'Aumentar: Carnes vermelhas magras, fígado, miúdos (2-3x/semana)',
      'Vegetais verde-escuros: Couve, espinafre, brócolis (diariamente)',
      'Leguminosas: Feijão, lentilha, grão-de-bico (com vit C)',
      'Frutas cítricas: Laranja, limão, acerola (nas refeições)',
      'Evitar: Café, chá preto, leite nas refeições principais (inibem absorção)',
      'Distanciar cálcio do ferro: 2-3 horas de intervalo'
    ],
    
    orientacoes: [
      'Investigar causa da deficiência (sangramento oculto, má absorção)',
      'Monitorar ferritina, hemoglobina e VCM mensalmente',
      'Expectativa: Hemoglobina começa a subir em 2-3 semanas',
      'Repor estoques de ferro leva 3-6 meses',
      'Atenção: Fezes podem ficar escuras com suplementação'
    ]
  },

  anemia_megaloblastica: {
    titulo: 'ANEMIA MEGALOBLÁSTICA (Deficiência B12/Folato)',
    
    fitoterapia: [
      {
        planta: 'Alfafa (Medicago sativa)',
        partUsada: 'Folhas e brotos',
        dosagem: '5-10g/dia (seca) ou 30-50g brotos frescos',
        posologia: 'Infusão ou consumir brotos em saladas',
        duracao: 'Contínuo',
        propriedades: 'Rica em ácido fólico, vitaminas do complexo B, ferro'
      }
    ],
    
    suplementacao: [
      {
        nutriente: 'Vitamina B12 (Metilcobalamina)',
        dosagem: '1000-2000mcg/dia (via oral) ou 1000mcg IM semanal',
        posologia: 'Sublingual em jejum ou injetável',
        duracao: '12 semanas, depois manutenção',
        observacao: 'Forma metilada é mais biodisponível'
      },
      {
        nutriente: 'Ácido Fólico (ou Metilfolato)',
        dosagem: '800-1000mcg/dia',
        posologia: '1x/dia com alimentos',
        duracao: '12 semanas',
        observacao: 'NUNCA suplementar folato sem B12 em megaloblástica'
      },
      {
        nutriente: 'Complexo B (B1, B2, B3, B5, B6)',
        dosagem: 'Conforme complexo comercial',
        posologia: '1x/dia',
        duracao: '8-12 semanas',
        observacao: 'Suporte para metabolismo energético'
      }
    ],
    
    dietoterapia: [
      'Ricos em B12: Carnes, peixes, ovos, laticínios (veganos necessitam suplementar)',
      'Ricos em folato: Vegetais verde-escuros, leguminosas, fígado',
      'Alimentos fortificados: Cereais integrais, levedura nutricional',
      'Evitar: Álcool (interfere na absorção)'
    ],
    
    orientacoes: [
      'Investigar: Anemia perniciosa, gastrite atrófica, uso de IBP',
      'Veganos/vegetarianos: B12 suplementação obrigatória',
      'Idosos: Avaliar absorção (fator intrínseco)',
      'Neuropatia por B12 pode ser irreversível se não tratar rapidamente',
      'Monitorar VCM, B12, ácido fólico e homocisteína'
    ]
  },

  resistencia_insulinica: {
    titulo: 'RESISTÊNCIA INSULÍNICA / PRÉ-DIABETES',
    
    fitoterapia: [
      {
        planta: 'Canela (Cinnamomum verum)',
        partUsada: 'Casca',
        dosagem: '1-3g/dia',
        posologia: 'Em pó: 1 colher de café 2-3x/dia nas refeições',
        duracao: 'Contínuo',
        propriedades: 'Melhora sensibilidade à insulina, reduz glicemia pós-prandial'
      },
      {
        planta: 'Pata-de-vaca (Bauhinia forficata)',
        partUsada: 'Folhas',
        dosagem: '3-6g/dia',
        posologia: 'Infusão: 1 colher de sopa para 200ml. Tomar 3x/dia antes das refeições',
        duracao: 'Contínuo com acompanhamento',
        propriedades: 'Hipoglicemiante, aumenta captação de glicose'
      },
      {
        planta: 'Gymnema (Gymnema sylvestre)',
        partUsada: 'Folhas',
        dosagem: '400-600mg extrato/dia',
        posologia: 'Dividir em 2-3 tomadas antes das refeições',
        duracao: '12-24 semanas',
        propriedades: 'Reduz absorção de glicose, regenera células beta pancreáticas'
      }
    ],
    
    suplementacao: [
      {
        nutriente: 'Berberina',
        dosagem: '500mg 2-3x/dia',
        posologia: 'Antes das refeições principais',
        duracao: 'Mínimo 12 semanas',
        observacao: 'Eficácia comparável à metformina em estudos'
      },
      {
        nutriente: 'Cromo Picolinato',
        dosagem: '200-400mcg/dia',
        posologia: '1x/dia',
        duracao: '12-16 semanas',
        observacao: 'Melhora sensibilidade à insulina e metabolismo de carboidratos'
      },
      {
        nutriente: 'Magnésio (Glicinato ou Treonato)',
        dosagem: '300-400mg/dia',
        posologia: 'À noite',
        duracao: 'Contínuo',
        observacao: 'Essencial para mais de 300 reações metabólicas, incluindo ação da insulina'
      },
      {
        nutriente: 'Ômega-3 (EPA/DHA)',
        dosagem: '2000-3000mg/dia',
        posologia: 'Com refeições',
        duracao: 'Contínuo',
        observacao: 'Anti-inflamatório, melhora sensibilidade insulínica'
      },
      {
        nutriente: 'Ácido Alfa-lipóico',
        dosagem: '300-600mg/dia',
        posologia: 'Dividir em 2 tomadas',
        duracao: '12-24 semanas',
        observacao: 'Antioxidante, melhora captação de glicose'
      }
    ],
    
    dietoterapia: [
      'JEJUM INTERMITENTE: 16/8 (16h jejum, 8h janela alimentar) - 5-6x/semana',
      'Reduzir carboidratos refinados: Evitar açúcar, farinha branca, doces',
      'Priorizar: Vegetais não-amiláceos (3-4 porções/dia)',
      'Proteínas de qualidade: Carnes magras, peixes, ovos (cada refeição)',
      'Gorduras boas: Abacate, azeite, oleaginosas, coco',
      'Índice glicêmico baixo: Tubérculos, leguminosas, grãos integrais',
      'Fibras: 25-35g/dia (reduz picos glicêmicos)',
      'Evitar: Sucos (até naturais), refrigerantes, alimentos processados'
    ],
    
    estilo_vida: [
      'EXERCÍCIO: 150min/semana aeróbico + 2-3x musculação',
      'Treino de força é crucial para sensibilidade à insulina',
      'Caminhadas pós-refeições (10-15min) - reduz pico glicêmico',
      'Sono: 7-9h/noite (privação piora resistência insulínica)',
      'Controle de estresse: Meditação, yoga (cortisol alto piora RI)',
      'Perda de peso: 5-10% já melhora significativamente RI'
    ],
    
    orientacoes: [
      'Monitorar: Glicemia jejum, HbA1c, insulina, HOMA-IR (trimestral)',
      'Meta HOMA-IR: <2.0 (ideal <1.5)',
      'Meta HbA1c: <5.7%',
      'Reavaliar função hepática: TGO, TGP, GGT (esteatose comum)',
      'Perfil lipídico: Triglicerídeos/HDL ideal <2.0',
      'Pressão arterial: Controle rigoroso (<130/80mmHg)'
    ]
  },

  hipotireoidismo: {
    titulo: 'HIPOTIREOIDISMO (Primário/Subclínico/Periférico)',
    
    suplementacao: [
      {
        nutriente: 'Selênio (Selenometionina)',
        dosagem: '200mcg/dia',
        posologia: '1x/dia com alimentos',
        duracao: 'Contínuo',
        observacao: 'Essencial para conversão T4→T3 e proteção da tireoide'
      },
      {
        nutriente: 'Zinco',
        dosagem: '15-30mg/dia',
        posologia: 'À noite, longe de ferro/cálcio',
        duracao: 'Contínuo',
        observacao: 'Cofator para conversão T4→T3 e receptor de T3'
      },
      {
        nutriente: 'Iodo (com cautela!)',
        dosagem: '150-300mcg/dia (avaliar individualmente)',
        posologia: '1x/dia pela manhã',
        duracao: 'Sob supervisão',
        observacao: 'CONTRAINDICADO em Hashimoto ativo. Dosar iodúria antes'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '2000-4000UI/dia (ajustar conforme níveis)',
        posologia: 'Com refeição gordurosa',
        duracao: 'Contínuo',
        observacao: 'Deficiência associada à autoimunidade tireoidiana'
      },
      {
        nutriente: 'Ômega-3',
        dosagem: '2000-3000mg/dia',
        posologia: 'Com refeições',
        duracao: 'Contínuo',
        observacao: 'Anti-inflamatório, melhora conversão T4→T3'
      },
      {
        nutriente: 'L-Tirosina',
        dosagem: '500-1000mg/dia',
        posologia: 'Em jejum pela manhã',
        duracao: '8-12 semanas',
        observacao: 'Aminoácido precursor dos hormônios tireoidianos'
      }
    ],
    
    fitoterapia: [
      {
        planta: 'Guggul (Commiphora mukul)',
        partUsada: 'Resina',
        dosagem: '500mg extrato 2-3x/dia',
        posologia: 'Com refeições',
        duracao: '12-24 semanas',
        propriedades: 'Estimula conversão T4→T3, regula metabolismo lipídico'
      },
      {
        planta: 'Ashwagandha (Withania somnifera)',
        partUsada: 'Raiz',
        dosagem: '300-600mg extrato/dia',
        posologia: '1-2x/dia',
        duracao: 'Contínuo',
        propriedades: 'Adaptógeno, suporte adrenal, melhora função tireoidiana'
      }
    ],
    
    dietoterapia: [
      'ALIMENTOS RICOS EM SELÊNIO: Castanha-do-pará (2-3/dia), peixes, ovos',
      'RICOS EM ZINCO: Ostras, carnes vermelhas, sementes de abóbora',
      'RICOS EM IODO (moderação): Algas, peixes marinhos, sal iodado',
      'EVITAR/MODERAR goitrogênicos crus: Brócolis, couve, repolho (cozinhar inativa)',
      'EVITAR: Glúten (se Hashimoto ou TPO+), soja não-fermentada',
      'Proteínas de qualidade: Suporte para hormônios',
      'Gorduras boas: Essenciais para produção hormonal'
    ],
    
    orientacoes: [
      'Investigar: Autoimunidade (TPO, Anti-Tg), deficiências nutricionais',
      'Hashimoto: Dieta sem glúten pode reduzir anticorpos em 40-60%',
      'Conversão periférica: Avaliar RT3, estresse crônico, inflamação',
      'Medicação (se necessário): Preferir T4+T3 ou T3 isolado em má conversão',
      'Monitorar: TSH, T4 livre, T3 livre, RT3, TPO (a cada 2-3 meses)',
      'Meta TSH: 1.0-2.5 mUI/L (ótimo funcional)',
      'Avaliar saúde intestinal: Disbiose prejudica absorção e conversão',
      'Saúde adrenal: Cortisol desregulado piora função tireoidiana'
    ]
  },

  inflamacao_cronica: {
    titulo: 'INFLAMAÇÃO CRÔNICA SISTÊMICA',
    
    fitoterapia: [
      {
        planta: 'Cúrcuma (Curcuma longa)',
        partUsada: 'Rizoma',
        dosagem: '500-1000mg curcumina padronizada 2-3x/dia',
        posologia: 'Com pimenta-do-reino e gordura (aumenta absorção em 2000%)',
        duracao: 'Contínuo',
        propriedades: 'Potente anti-inflamatório, modula NF-kB e citocinas'
      },
      {
        planta: 'Gengibre (Zingiber officinale)',
        partUsada: 'Rizoma',
        dosagem: '1-3g/dia',
        posologia: 'Chá, pó ou cápsulas - 2-3x/dia',
        duracao: 'Contínuo',
        propriedades: 'Anti-inflamatório, antioxidante, inibe COX-2'
      },
      {
        planta: 'Unha-de-gato (Uncaria tomentosa)',
        partUsada: 'Casca',
        dosagem: '20-60mg extrato/dia ou 300-500mg cápsula 2-3x/dia',
        posologia: 'Com alimentos',
        duracao: '8-12 semanas',
        propriedades: 'Imunomodulador, anti-inflamatório, antioxidante'
      },
      {
        planta: 'Boswellia (Boswellia serrata)',
        dosagem: '300-500mg extrato 2-3x/dia',
        posologia: 'Com alimentos',
        duracao: '12 semanas ou mais',
        propriedades: 'Inibe 5-LOX, reduz leucotrienos, protege cartilagens'
      }
    ],
    
    suplementacao: [
      {
        nutriente: 'Ômega-3 (EPA alto)',
        dosagem: '2000-4000mg/dia (mínimo 1000mg EPA)',
        posologia: 'Com refeições, dividir em 2 tomadas',
        duracao: 'Contínuo',
        observacao: 'Anti-inflamatório mais potente, reduz citocinas pró-inflamatórias'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '4000-5000UI/dia (ajustar para níveis 60-80ng/ml)',
        posologia: 'Com refeição gordurosa',
        duracao: 'Contínuo',
        observacao: 'Imunomodulador, anti-inflamatório, essencial para imunidade'
      },
      {
        nutriente: 'Quercetina',
        dosagem: '500-1000mg/dia',
        posologia: 'Dividir em 2 tomadas',
        duracao: '12 semanas',
        observacao: 'Flavonoide anti-inflamatório, estabiliza mastócitos'
      },
      {
        nutriente: 'Resveratrol',
        dosagem: '200-500mg/dia',
        posologia: '1-2x/dia',
        duracao: 'Contínuo',
        observacao: 'Ativa sirtuínas, anti-inflamatório, antiaging'
      },
      {
        nutriente: 'Probióticos (multi-cepas)',
        dosagem: '50-100 bilhões UFC/dia',
        posologia: 'Pela manhã em jejum',
        duracao: '8-12 semanas',
        observacao: 'Saúde intestinal reduz inflamação sistêmica (eixo intestino-cérebro)'
      }
    ],
    
    dietoterapia: [
      'DIETA ANTI-INFLAMATÓRIA (base mediterrânea):',
      '• Vegetais: 5-7 porções/dia (especialmente crucíferas, folhas verde-escuras)',
      '• Frutas: Berries, romã, frutas vermelhas (ricas em antocianinas)',
      '• Peixes gordos: Salmão, sardinha, cavalinha (3-4x/semana)',
      '• Azeite extra-virgem: 2-3 colheres/dia',
      '• Oleaginosas: Nozes, amêndoas (30g/dia)',
      '• Especiarias: Cúrcuma, gengibre, alho, pimenta',
      '',
      'EVITAR/ELIMINAR:',
      '• Açúcar e carboidratos refinados',
      '• Óleos vegetais refinados (soja, milho, girassol)',
      '• Gorduras trans e frituras',
      '• Alimentos ultraprocessados',
      '• Glúten e laticínios (testar exclusão 30 dias)',
      '• Excesso de carnes vermelhas e embutidos',
      '• Álcool'
    ],
    
    estilo_vida: [
      'EXERCÍCIO: Moderado e regular (excessivo piora inflamação)',
      '• Aeróbico leve-moderado: 30-45min 4-5x/semana',
      '• Musculação: 2-3x/semana (não exaustivo)',
      '• Yoga, tai chi: Reduz inflamação e cortisol',
      '',
      'SONO: 7-9h/noite (privação aumenta citocinas inflamatórias)',
      '',
      'CONTROLE DE ESTRESSE: Crucial',
      '• Meditação mindfulness: 10-20min/dia',
      '• Respiração diafragmática: Ativa parassimpático',
      '• Contato com natureza: Reduz cortisol',
      '',
      'SAÚDE ORAL: Periodontite é fonte de inflamação sistêmica',
      '',
      'TOXINAS: Reduzir exposição a poluentes, pesticidas, plásticos'
    ],
    
    orientacoes: [
      'Monitorar marcadores inflamatórios:',
      '• PCR-us (ultrassensível): <1.0mg/L ideal',
      '• VHS: <15mm/h',
      '• Relação Neutrófilos/Linfócitos (NLR): <2.0',
      '• Ferritina: Se elevada sem deficiência, indica inflamação',
      '• Homocisteína: <7 µmol/L (marcador de inflamação vascular)',
      '',
      'Investigar causas subjacentes:',
      '• Saúde intestinal (disbiose, permeabilidade, SIBO)',
      '• Infecções crônicas (viral, bacteriana, fúngica)',
      '• Autoimunidade',
      '• Obesidade visceral',
      '• Resistência insulínica',
      '• Estresse crônico / disfunção adrenal',
      '• Exposição a toxinas ambientais',
      '',
      'Reavaliar a cada 2-3 meses. Inflamação crônica leva meses para reverter.'
    ]
  },

  disbiose_intestinal: {
    titulo: 'DISBIOSE INTESTINAL / SIBO',
    
    probioticos: [
      {
        cepa: 'Saccharomyces boulardii',
        dosagem: '250-500mg 2x/dia',
        posologia: 'Longe das refeições',
        duracao: '4-8 semanas',
        indicacao: 'Diarreia, C. difficile, restauração pós-antibiótico'
      },
      {
        cepa: 'Lactobacillus rhamnosus GG',
        dosagem: '10-20 bilhões UFC/dia',
        posologia: 'Com alimentos',
        duracao: '8-12 semanas',
        indicacao: 'Imunidade, alergias, infecções respiratórias'
      },
      {
        cepa: 'Bifidobacterium lactis',
        dosagem: '10 bilhões UFC/dia',
        posologia: 'Pela manhã',
        duracao: '8-12 semanas',
        indicacao: 'Constipação, regulação do trânsito'
      },
      {
        cepa: 'Multi-cepas (Lactobacillus + Bifidobacterium)',
        dosagem: '50-100 bilhões UFC/dia',
        posologia: 'Pela manhã em jejum',
        duracao: '12 semanas',
        indicacao: 'Disbiose ampla, SII, inflamação intestinal'
      }
    ],
    
    fitoterapia: [
      {
        planta: 'Óleo de Orégano',
        dosagem: '150-300mg/dia (padronizado em carvacrol)',
        posologia: 'Dividir em 2-3 tomadas com alimentos',
        duracao: '2-4 semanas (antimicrobiano natural)',
        propriedades: 'Antibacteriano, antifúngico, antiparasitário'
      },
      {
        planta: 'Berberina',
        dosagem: '500mg 2-3x/dia',
        posologia: 'Antes das refeições',
        duracao: '4-6 semanas',
        propriedades: 'Antimicrobiano, anti-SIBO, regula microbiota'
      },
      {
        planta: 'Alho (Allium sativum)',
        dosagem: '600-1200mg extrato envelhecido/dia',
        posologia: 'Com alimentos',
        duracao: 'Contínuo',
        propriedades: 'Prebiótico, antimicrobiano, anti-inflamatório'
      }
    ],
    
    suplementacao: [
      {
        nutriente: 'L-Glutamina',
        dosagem: '5-10g/dia',
        posologia: 'Dividir em 2 tomadas (jejum e antes dormir)',
        duracao: '8-12 semanas',
        observacao: 'Repara mucosa intestinal, reduz permeabilidade'
      },
      {
        nutriente: 'Zinco Carnosina',
        dosagem: '75mg 2x/dia',
        posologia: 'Com alimentos',
        duracao: '8 semanas',
        observacao: 'Cicatriza mucosa, reduz permeabilidade intestinal'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '4000-5000UI/dia',
        posologia: 'Com gordura',
        duracao: 'Contínuo',
        observacao: 'Essencial para imunidade intestinal e tight junctions'
      },
      {
        nutriente: 'Ômega-3',
        dosagem: '2000-3000mg/dia',
        posologia: 'Com refeições',
        duracao: 'Contínuo',
        observacao: 'Anti-inflamatório intestinal'
      },
      {
        nutriente: 'Enzimas Digestivas (multi-enzimas)',
        dosagem: 'Conforme fabricante',
        posologia: 'No início das refeições principais',
        duracao: '8-12 semanas',
        observacao: 'Suporte digestivo, reduz sobrecarga bacteriana'
      }
    ],
    
    dietoterapia: [
      'FASE 1 - ELIMINAÇÃO (2-4 semanas):',
      '• Protocolo Low-FODMAP modificado',
      '• Eliminar: Glúten, laticínios, açúcar, álcool',
      '• Evitar: Fermentados, excesso de fibras insolúveis',
      '• Reduzir: Leguminosas, crucíferas',
      '',
      'FASE 2 - ANTIMICROBIANA (4-6 semanas):',
      '• Manter low-FODMAP',
      '• Adicionar: Alho, cebola, gengibre, cúrcuma',
      '• Chás antimicrobianos: Orégano, tomilho, alecrim',
      '',
      'FASE 3 - REINTRODUÇÃO GRADUAL (8-12 semanas):',
      '• Prebióticos gradualmente: Alho, cebola, alho-poró',
      '• Fermentados: Kefir, chucrute, kombucha (pequenas quantidades)',
      '• Fibras diversas: Variabilidade = diversidade microbiana',
      '',
      'MANUTENÇÃO:',
      '• Dieta anti-inflamatória variada',
      '• Alimentos prebióticos diários',
      '• Polifenóis: Berries, cacau, chá verde, azeite',
      '• Evitar: Açúcar, ultraprocessados, emulsificantes'
    ],
    
    orientacoes: [
      'Investigações importantes:',
      '• Teste de hidrogênio expirado (SIBO)',
      '• Parasitológico de fezes (3 amostras)',
      '• Calprotectina fecal (inflamação intestinal)',
      '• Zonulina (permeabilidade intestinal)',
      '• Elastase fecal (insuficiência pancreática)',
      '• IgA secretora (imunidade intestinal)',
      '',
      'Protocolo completo:',
      '1. Fase antimicrobiana: 4-6 semanas',
      '2. Fase de restauração: 8-12 semanas',
      '3. Manutenção: Contínua',
      '',
      'Atenção: SIBO requer protocolo específico (Rifaximina + herbais)',
      'Candida: Adicionar antifúngicos (Caprilato, Undecilenico)',
      'Monitorar resposta clínica: Sintomas, energia, digestão'
    ]
  }
};

/**
 * Função para buscar conduta terapêutica baseada no diagnóstico
 */
export function getCondutaTerapeutica(diagnostico) {
  const mapa = {
    'ANEMIA FERROPRIVA': 'anemia_ferropriva',
    'ANEMIA MEGALOBLÁSTICA': 'anemia_megaloblastica',
    'RESISTÊNCIA INSULÍNICA': 'resistencia_insulinica',
    'PRÉ-DIABETES': 'resistencia_insulinica',
    'DIABETES TIPO 2': 'resistencia_insulinica',
    'HIPOTIREOIDISMO': 'hipotireoidismo',
    'INFLAMAÇÃO CRÔNICA': 'inflamacao_cronica',
    'DISBIOSE INTESTINAL': 'disbiose_intestinal',
    'SIBO': 'disbiose_intestinal'
  };

  const chave = mapa[diagnostico.toUpperCase()] || null;
  return chave ? CONDUTAS_TERAPEUTICAS[chave] : null;
}
