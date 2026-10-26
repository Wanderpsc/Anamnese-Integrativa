/**
 * Base de dados de protocolos de tratamento por condição
 * Cada condição tem seu protocolo detalhado seguindo o padrão estabelecido
 */

export const PROTOCOLOS_POR_CONDICAO = {
  'Dores de cabeça': {
    nome: 'Cefaleia/Dores de Cabeça',
    causas: [
      'Tensão muscular',
      'Desidratação',
      'Deficiência de magnésio',
      'Estresse',
      'Problemas visuais',
      'Má postura',
      'Alterações hormonais'
    ],
    fitoterapia: [
      {
        nome: 'Tanacetum parthenium (Feverfew)',
        dosagem: '100-300mg',
        posologia: '2-3x ao dia',
        duracao: '3-6 meses',
        observacoes: 'Prevenção de enxaqueca'
      },
      {
        nome: 'Petasites hybridus (Butterbur)',
        dosagem: '75mg',
        posologia: '2x ao dia',
        duracao: '3 meses',
        observacoes: 'Reduz frequência e intensidade'
      },
      {
        nome: 'Gengibre (Zingiber officinale)',
        dosagem: '500mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso conforme necessário',
        observacoes: 'Anti-inflamatório, alivia náuseas'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Magnésio glicinato',
        dosagem: '400-600mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Relaxamento muscular, prevenção de enxaqueca'
      },
      {
        nutriente: 'Coenzima Q10',
        dosagem: '100-300mg',
        posologia: '1x ao dia',
        duracao: '3-6 meses',
        beneficio: 'Melhora função mitocondrial'
      },
      {
        nutriente: 'Vitamina B2 (Riboflavina)',
        dosagem: '400mg',
        posologia: '1x ao dia',
        duracao: '3-4 meses',
        beneficio: 'Reduz frequência de enxaquecas'
      },
      {
        nutriente: 'Ômega-3',
        dosagem: '2000mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Belladonna 30CH',
        indicacao: 'Cefaleia pulsátil, face vermelha',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Gelsemium 30CH',
        indicacao: 'Cefaleia com peso, visão turva',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Nux vomica 30CH',
        indicacao: 'Cefaleia por estresse, excesso de trabalho',
        posologia: '5 glóbulos 3x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Hortelã-pimenta',
        uso: 'Aplicar diluído nas têmporas',
        diluicao: '2-3 gotas em 10ml óleo vegetal'
      },
      {
        oleo: 'Lavanda',
        uso: 'Inalação ou difusor',
        diluicao: '5-7 gotas no difusor'
      }
    ],
    orientacoesGerais: [
      'Manter hidratação adequada (2-3L água/dia)',
      'Evitar gatilhos alimentares (chocolate, cafeína, queijos, vinho)',
      'Praticar técnicas de relaxamento',
      'Exercícios regulares',
      'Sono regular (7-8h)',
      'Evitar jejum prolongado'
    ]
  },

  'Enxaqueca': {
    nome: 'Enxaqueca',
    causas: [
      'Predisposição genética',
      'Alterações hormonais',
      'Deficiência de magnésio',
      'Gatilhos alimentares',
      'Estresse',
      'Alterações no sono'
    ],
    fitoterapia: [
      {
        nome: 'Tanacetum parthenium',
        dosagem: '300mg',
        posologia: '2x ao dia',
        duracao: '6 meses',
        observacoes: 'Principal fitoterápico para enxaqueca'
      },
      {
        nome: 'Petasites hybridus',
        dosagem: '75mg',
        posologia: '2x ao dia',
        duracao: '4 meses',
        observacoes: 'Reduz intensidade e frequência'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Magnésio glicinato',
        dosagem: '600mg',
        posologia: '2x ao dia (300mg cada)',
        duracao: 'Uso contínuo',
        beneficio: 'Prevenção de crises'
      },
      {
        nutriente: 'Riboflavina (B2)',
        dosagem: '400mg',
        posologia: '1x ao dia',
        duracao: '3-4 meses',
        beneficio: 'Reduz frequência em até 50%'
      },
      {
        nutriente: 'Coenzima Q10',
        dosagem: '300mg',
        posologia: '1x ao dia',
        duracao: '3 meses',
        beneficio: 'Melhora função mitocondrial cerebral'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Sanguinaria 30CH',
        indicacao: 'Enxaqueca do lado direito',
        posologia: '5 glóbulos ao início da crise'
      },
      {
        medicamento: 'Iris versicolor 30CH',
        indicacao: 'Enxaqueca com distúrbios visuais',
        posologia: '5 glóbulos 3x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Hortelã-pimenta',
        uso: 'Aplicar nas têmporas ao início da crise',
        diluicao: '2 gotas em 5ml óleo coco'
      }
    ],
    orientacoesGerais: [
      'Identificar e evitar gatilhos',
      'Diário de enxaqueca',
      'Sono regular',
      'Evitar jejum',
      'Hidratação adequada',
      'Técnicas de biofeedback'
    ]
  },

  'Cansaço/Fadiga': {
    nome: 'Fadiga Crônica',
    causas: [
      'Deficiências nutricionais (ferro, B12, vitamina D)',
      'Hipotireoidismo',
      'Anemia',
      'Estresse crônico',
      'Sono inadequado',
      'Síndrome de fadiga adrenal'
    ],
    fitoterapia: [
      {
        nome: 'Rhodiola rosea',
        dosagem: '200-600mg',
        posologia: '1-2x ao dia',
        duracao: '2-3 meses',
        observacoes: 'Adaptógeno, melhora energia e resistência'
      },
      {
        nome: 'Panax ginseng',
        dosagem: '200mg',
        posologia: '1-2x ao dia',
        duracao: '8-12 semanas',
        observacoes: 'Estimulante, melhora performance'
      },
      {
        nome: 'Ashwagandha',
        dosagem: '300-500mg',
        posologia: '2x ao dia',
        duracao: '2-3 meses',
        observacoes: 'Reduz cortisol, melhora energia'
      },
      {
        nome: 'Maca peruana',
        dosagem: '1500-3000mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Aumenta energia e disposição'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Complexo B',
        dosagem: 'B50 ou B100',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Metabolismo energético'
      },
      {
        nutriente: 'Ferro quelato',
        dosagem: '30-60mg',
        posologia: '1x ao dia',
        duracao: '3 meses (se deficiente)',
        beneficio: 'Transporte de oxigênio'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '5000 UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Reduz fadiga, melhora imunidade'
      },
      {
        nutriente: 'Coenzima Q10',
        dosagem: '100-200mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Produção de energia celular'
      },
      {
        nutriente: 'L-Carnitina',
        dosagem: '1000-2000mg',
        posologia: '1-2x ao dia',
        duracao: '2-3 meses',
        beneficio: 'Metabolismo de gorduras para energia'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Phosphoricum acidum 30CH',
        indicacao: 'Fadiga mental e física intensa',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Gelsemium 30CH',
        indicacao: 'Fraqueza, sonolência, apatia',
        posologia: '5 glóbulos 3x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Alecrim',
        uso: 'Difusor ou inalação',
        diluicao: '5 gotas no difusor'
      },
      {
        oleo: 'Hortelã-pimenta',
        uso: 'Inalação para alerta mental',
        diluicao: '2-3 gotas em lenço'
      }
    ],
    orientacoesGerais: [
      'Investigar causas (exames: hemograma, ferritina, TSH, B12, D)',
      'Sono reparador (7-9h)',
      'Exercício moderado regular',
      'Alimentação balanceada',
      'Gerenciamento de estresse',
      'Evitar estimulantes em excesso'
    ]
  },

  'Ansiedade': {
    nome: 'Ansiedade',
    causas: [
      'Estresse crônico',
      'Desequilíbrio neurotransmissores',
      'Deficiência de magnésio e B6',
      'Alterações na microbiota intestinal',
      'Excesso de cafeína',
      'Fatores genéticos'
    ],
    fitoterapia: [
      {
        nome: 'Passiflora incarnata',
        dosagem: '300-500mg',
        posologia: '2-3x ao dia',
        duracao: '4-6 semanas',
        observacoes: 'Ansiolítico natural'
      },
      {
        nome: 'Melissa officinalis',
        dosagem: '300mg',
        posologia: '3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Calmante, melhora sono'
      },
      {
        nome: 'Valeriana officinalis',
        dosagem: '300-600mg',
        posologia: '1-2x ao dia (à noite)',
        duracao: '4-6 semanas',
        observacoes: 'Sedativo natural'
      },
      {
        nome: 'Ashwagandha',
        dosagem: '300mg',
        posologia: '2x ao dia',
        duracao: '8-12 semanas',
        observacoes: 'Reduz cortisol e ansiedade'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Magnésio glicinato',
        dosagem: '400-600mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Relaxamento neuromuscular'
      },
      {
        nutriente: 'L-Teanina',
        dosagem: '200mg',
        posologia: '1-3x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Calma sem sedação'
      },
      {
        nutriente: 'GABA',
        dosagem: '500-750mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso conforme necessário',
        beneficio: 'Neurotransmissor inibitório'
      },
      {
        nutriente: 'Inositol',
        dosagem: '12-18g',
        posologia: 'Dividido em 2-3 doses',
        duracao: '4-6 semanas',
        beneficio: 'Eficaz em transtorno de pânico'
      },
      {
        nutriente: 'Vitamina B6 + Magnésio',
        dosagem: 'B6 50mg + Mg 300mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Produção de GABA e serotonina'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Argentum nitricum 30CH',
        indicacao: 'Ansiedade antecipatória, fobias',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Gelsemium 30CH',
        indicacao: 'Ansiedade com tremor, fraqueza',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Ignatia 30CH',
        indicacao: 'Ansiedade emocional, suspiros',
        posologia: '5 glóbulos 3-4x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Lavanda',
        uso: 'Difusor ou aplicação tópica',
        diluicao: '5-7 gotas no difusor'
      },
      {
        oleo: 'Bergamota',
        uso: 'Inalação',
        diluicao: '3-4 gotas em lenço'
      },
      {
        oleo: 'Camomila romana',
        uso: 'Banho ou massagem',
        diluicao: '5 gotas em óleo base'
      }
    ],
    orientacoesGerais: [
      'Técnicas de respiração (4-7-8)',
      'Meditação diária (10-20 min)',
      'Exercício físico regular',
      'Reduzir cafeína e estimulantes',
      'Sono adequado',
      'Terapia cognitivo-comportamental',
      'Evitar açúcar e alimentos processados'
    ]
  },

  'Insônia': {
    nome: 'Insônia',
    causas: [
      'Estresse e ansiedade',
      'Deficiência de magnésio',
      'Desregulação de melatonina',
      'Excesso de estímulos noturnos',
      'Apneia do sono',
      'Má higiene do sono'
    ],
    fitoterapia: [
      {
        nome: 'Valeriana officinalis',
        dosagem: '400-900mg',
        posologia: '30-60 min antes de dormir',
        duracao: '4-6 semanas',
        observacoes: 'Induz sono, melhora qualidade'
      },
      {
        nome: 'Passiflora incarnata',
        dosagem: '500mg',
        posologia: '1h antes de dormir',
        duracao: 'Uso contínuo',
        observacoes: 'Reduz latência do sono'
      },
      {
        nome: 'Melissa officinalis',
        dosagem: '300-500mg',
        posologia: 'À noite',
        duracao: 'Uso contínuo',
        observacoes: 'Calmante, ansiolítico'
      },
      {
        nome: 'Kava-kava',
        dosagem: '200-300mg',
        posologia: 'À noite',
        duracao: 'Máximo 3 meses',
        observacoes: 'Ansiolítico potente (monitorar fígado)'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Melatonina',
        dosagem: '1-5mg',
        posologia: '30-60 min antes de dormir',
        duracao: 'Uso conforme necessário',
        beneficio: 'Regulação do ciclo sono-vigília'
      },
      {
        nutriente: 'Magnésio glicinato',
        dosagem: '400mg',
        posologia: 'À noite',
        duracao: 'Uso contínuo',
        beneficio: 'Relaxamento muscular e neural'
      },
      {
        nutriente: 'L-Triptofano',
        dosagem: '500-1000mg',
        posologia: 'À noite',
        duracao: 'Uso contínuo',
        beneficio: 'Precursor de serotonina e melatonina'
      },
      {
        nutriente: 'Glicinato de magnésio + B6',
        dosagem: 'Mg 300mg + B6 50mg',
        posologia: 'À noite',
        duracao: 'Uso contínuo',
        beneficio: 'Produção de neurotransmissores do sono'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Coffea cruda 30CH',
        indicacao: 'Insônia por mente agitada',
        posologia: '5 glóbulos antes de dormir'
      },
      {
        medicamento: 'Nux vomica 30CH',
        indicacao: 'Acorda às 3-4h, excesso de trabalho',
        posologia: '5 glóbulos à noite'
      },
      {
        medicamento: 'Arsenicum album 30CH',
        indicacao: 'Insônia por ansiedade, acorda 1-3h',
        posologia: '5 glóbulos antes de dormir'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Lavanda',
        uso: 'Difusor no quarto',
        diluicao: '5-7 gotas'
      },
      {
        oleo: 'Camomila romana',
        uso: 'Travesseiro',
        diluicao: '2-3 gotas'
      },
      {
        oleo: 'Vetiver',
        uso: 'Aplicação nos pés',
        diluicao: '3 gotas em óleo base'
      }
    ],
    orientacoesGerais: [
      'Higiene do sono rigorosa',
      'Quarto escuro, silencioso, fresco (18-20°C)',
      'Evitar telas 2h antes de dormir',
      'Rotina regular de sono',
      'Evitar cafeína após 14h',
      'Exercício regular (não à noite)',
      'Técnicas de relaxamento antes de dormir'
    ]
  },

  'Gastrite': {
    nome: 'Gastrite',
    causas: [
      'H. pylori',
      'Uso crônico de AINEs',
      'Estresse',
      'Consumo de álcool',
      'Refluxo biliar',
      'Alimentação inadequada'
    ],
    fitoterapia: [
      {
        nome: 'Espinheira-santa (Maytenus ilicifolia)',
        dosagem: '300mg',
        posologia: '3x ao dia antes das refeições',
        duracao: '4-8 semanas',
        observacoes: 'Protetor gástrico, cicatrizante'
      },
      {
        nome: 'Camomila (Matricaria chamomilla)',
        dosagem: 'Chá ou 300mg',
        posologia: '3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anti-inflamatório, antiespasmódico'
      },
      {
        nome: 'Alcaçuz (Glycyrrhiza glabra)',
        dosagem: '380mg (DGL)',
        posologia: '3x ao dia antes das refeições',
        duracao: '4-8 semanas',
        observacoes: 'Cicatrizante, protetor mucosa'
      },
      {
        nome: 'Gengibre',
        dosagem: '500mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso conforme necessário',
        observacoes: 'Anti-inflamatório, gastroprotetor'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Glutamina',
        dosagem: '5-10g',
        posologia: '1-2x ao dia',
        duracao: '4-8 semanas',
        beneficio: 'Reparação da mucosa intestinal'
      },
      {
        nutriente: 'Zinco carnosina',
        dosagem: '75-150mg',
        posologia: '2x ao dia',
        duracao: '8 semanas',
        beneficio: 'Cicatrização de úlceras'
      },
      {
        nutriente: 'Probióticos',
        dosagem: '10-50 bilhões UFC',
        posologia: '1x ao dia',
        duracao: '8-12 semanas',
        beneficio: 'Combate H. pylori, restaura microbiota'
      },
      {
        nutriente: 'Vitamina U (metilmetionina)',
        dosagem: '200mg',
        posologia: '3x ao dia',
        duracao: '4 semanas',
        beneficio: 'Cicatrização gástrica'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Nux vomica 30CH',
        indicacao: 'Gastrite por estresse, excesso alimentar',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Arsenicum album 30CH',
        indicacao: 'Gastrite com queimação, ansiedade',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Carbo vegetabilis 30CH',
        indicacao: 'Gastrite com gases, digestão lenta',
        posologia: '5 glóbulos 3x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Hortelã-pimenta',
        uso: 'Massagem abdominal diluída',
        diluicao: '3 gotas em 10ml óleo vegetal'
      },
      {
        oleo: 'Gengibre',
        uso: 'Compressas mornas no abdômen',
        diluicao: '2 gotas em água morna'
      }
    ],
    orientacoesGerais: [
      'Dieta antiinflamatória',
      'Evitar: café, álcool, frituras, condimentos, cítricos',
      'Mastigar bem os alimentos',
      'Refeições menores e frequentes',
      'Gerenciamento de estresse',
      'Investigar e tratar H. pylori se presente',
      'Evitar AINEs'
    ]
  },

  'Pressão alta': {
    nome: 'Hipertensão Arterial',
    causas: [
      'Obesidade',
      'Sedentarismo',
      'Excesso de sódio',
      'Estresse crônico',
      'Resistência à insulina',
      'Deficiências (magnésio, potássio)'
    ],
    fitoterapia: [
      {
        nome: 'Alho (Allium sativum)',
        dosagem: '600-900mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Reduz PA, colesterol'
      },
      {
        nome: 'Hibiscus sabdariffa',
        dosagem: 'Chá 1-2 xícaras ou 500mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Diurético, vasodilatador'
      },
      {
        nome: 'Espinheiro (Crataegus)',
        dosagem: '300-900mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Cardiotônico, melhora fluxo'
      },
      {
        nome: 'Oliveira (Olea europaea) - folhas',
        dosagem: '500mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Hipotensor, antioxidante'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Magnésio glicinato',
        dosagem: '400-600mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Vasodilatação, reduz PA'
      },
      {
        nutriente: 'Coenzima Q10',
        dosagem: '100-200mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Melhora função endotelial'
      },
      {
        nutriente: 'Ômega-3 (EPA/DHA)',
        dosagem: '2-3g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório, reduz PA'
      },
      {
        nutriente: 'Potássio',
        dosagem: '2-4g',
        posologia: 'Via alimentos ou suplemento',
        duracao: 'Uso contínuo',
        beneficio: 'Balanço sódio-potássio'
      },
      {
        nutriente: 'L-Arginina',
        dosagem: '3-6g',
        posologia: '1-2x ao dia',
        duracao: '4-8 semanas',
        beneficio: 'Produção de óxido nítrico, vasodilatação'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Aurum metallicum 30CH',
        indicacao: 'Hipertensão com cefaleia pulsátil',
        posologia: '5 glóbulos 2x ao dia'
      },
      {
        medicamento: 'Nux vomica 30CH',
        indicacao: 'Hipertensão por estresse, sedentarismo',
        posologia: '5 glóbulos 2x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Lavanda',
        uso: 'Difusor ou banho',
        diluicao: '5-7 gotas'
      },
      {
        oleo: 'Ylang-ylang',
        uso: 'Massagem ou inalação',
        diluicao: '3 gotas em óleo base'
      }
    ],
    orientacoesGerais: [
      'Dieta DASH (rica em frutas, vegetais, grãos integrais)',
      'Reduzir sódio (<2g/dia)',
      'Exercício regular (150 min/semana)',
      'Perda de peso se necessário',
      'Gerenciamento de estresse',
      'Monitoramento regular de PA',
      'Evitar álcool em excesso',
      'Sono adequado'
    ]
  },
  'Diabetes tipo 1': {
    nome: 'Diabetes Mellitus Tipo 1',
    causas: [
      'Doença autoimune (destruição células beta pancreáticas)',
      'Predisposição genética',
      'Fatores ambientais (vírus, toxinas)',
      'Deficiência absoluta de insulina',
      'Início geralmente na infância/adolescência',
      'Autoanticorpos (anti-GAD, anti-IA2)'
    ],
    fitoterapia: [
      {
        nome: 'Gymnema sylvestre',
        dosagem: '400mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Pode reduzir necessidade de insulina - MONITORAR GLICEMIA'
      },
      {
        nome: 'Melão-de-São-Caetano (Momordica charantia)',
        dosagem: '500mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Hipoglicemiante - ajustar insulina conforme necessário'
      },
      {
        nome: 'Canela (Cinnamomum verum)',
        dosagem: '1-2g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Melhora sensibilidade receptores insulina'
      },
      {
        nome: 'Feno-grego (Trigonella foenum-graecum)',
        dosagem: '5-10g sementes',
        posologia: '2x ao dia com refeições',
        duracao: 'Uso contínuo',
        observacoes: 'Reduz glicemia pós-prandial'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Ácido alfa-lipóico',
        dosagem: '600-1200mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Proteção neuropatia diabética, antioxidante potente'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '2000-4000 UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Imunomodulação, proteção células beta remanescentes'
      },
      {
        nutriente: 'Ômega-3 (EPA+DHA)',
        dosagem: '2-3g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório, proteção cardiovascular'
      },
      {
        nutriente: 'Magnésio',
        dosagem: '400-600mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Deficiência comum, melhora controle glicêmico'
      },
      {
        nutriente: 'Cromo picolinato',
        dosagem: '200-400mcg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Melhora ação insulina nos receptores'
      },
      {
        nutriente: 'Vitaminas do complexo B (especialmente B12)',
        dosagem: 'Complexo B + B12 1000mcg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Prevenção neuropatia, metformina depleta B12'
      },
      {
        nutriente: 'Coenzima Q10',
        dosagem: '100-200mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Proteção cardiovascular, energia celular'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Phosphorus 30CH',
        indicacao: 'Emagrecimento, fraqueza, sede intensa',
        posologia: '5 gotas 2x/dia'
      },
      {
        medicamento: 'Uranium nitricum 6CH',
        indicacao: 'Diabetes com poliúria, polidipsia',
        posologia: '5 gotas 3x/dia'
      },
      {
        medicamento: 'Syzygium jambolanum 6CH',
        indicacao: 'Diabetes com sede e urina excessivas',
        posologia: '5 gotas 2-3x/dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Coentro',
        uso: 'Massagem abdominal (pâncreas)',
        diluicao: '2-3% em óleo carreador'
      },
      {
        oleo: 'Canela',
        uso: 'Difusor ou massagem diluída',
        diluicao: '1-2% (irritante se concentrado)'
      },
      {
        oleo: 'Gerânio',
        uso: 'Equilíbrio metabólico',
        diluicao: '2-3% em óleo carreador'
      }
    ],
    orientacoesGerais: [
      '💉 INSULINOTERAPIA OBRIGATÓRIA - nunca suspender',
      '📊 Monitoramento glicemia 4-7x/dia ou sensor contínuo',
      '🍽️ Contagem de carboidratos rigorosa',
      'Dieta balanceada (45-60% carboidratos complexos)',
      'Distribuição refeições (5-6 refeições/dia)',
      'Exercício regular (ajustar insulina antes)',
      '⚠️ Reconhecer sinais hipoglicemia (tremor, suor, confusão)',
      'Sempre ter fonte glicose rápida disponível',
      '⚠️ Atenção cetoacidose diabética (DKA) - emergência',
      'Exames regulares: HbA1c (a cada 3 meses), função renal, retina',
      'Cuidado rigoroso com pés (risco neuropatia)',
      'Controle pressão arterial e colesterol',
      'Vacinação anual (gripe, pneumonia)',
      'Acompanhamento endocrinologista regular',
      'Educação em diabetes (cursos, grupos)',
      'Suporte psicológico (doença crônica exigente)',
      '🚨 EMERGÊNCIA: glicemia >250 com cetonas, DKA'
    ]
  },
  'Diabetes tipo 2': {
    nome: 'Diabetes Mellitus Tipo 2',
    causas: [
      'Resistência à insulina',
      'Obesidade',
      'Sedentarismo',
      'Estresse crônico',
      'Predisposição genética',
      'Alimentação inadequada'
    ],
    fitoterapia: [
      {
        nome: 'Pata-de-vaca (Bauhinia forficata)',
        dosagem: '2g',
        posologia: 'Chá 3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Hipoglicemiante natural'
      },
      {
        nome: 'Jambolão (Syzygium cumini)',
        dosagem: '30 gotas',
        posologia: 'Tintura 3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Reduz glicemia'
      },
      {
        nome: 'Canela (Cinnamomum verum)',
        dosagem: '1-2g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Melhora sensibilidade insulínica'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Cromo picolinato',
        dosagem: '200-400mcg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Melhora metabolismo da glicose'
      },
      {
        nutriente: 'Ácido alfa-lipóico',
        dosagem: '600mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Proteção neuropática, antioxidante'
      },
      {
        nutriente: 'Magnésio',
        dosagem: '400mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Sensibilidade insulínica'
      },
      {
        nutriente: 'Ômega-3',
        dosagem: '2-3g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Syzygium jambolanum 30CH',
        indicacao: 'Diabetes com muita sede e urina',
        posologia: '5 glóbulos 2x ao dia'
      },
      {
        medicamento: 'Phosphorus 30CH',
        indicacao: 'Fraqueza e emagrecimento',
        posologia: '5 glóbulos 2x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Canela',
        uso: 'Difusor ou massagem diluída',
        diluicao: '2-3 gotas'
      },
      {
        oleo: 'Coentro',
        uso: 'Massagem abdominal',
        diluicao: '3 gotas em óleo base'
      }
    ],
    orientacoesGerais: [
      'Dieta baixo índice glicêmico',
      'Aumentar fibras (25-30g/dia)',
      'Exercício regular (150 min/semana)',
      'Monitorar glicemia regularmente',
      'Controle de peso',
      'Reduzir estresse',
      'Sono adequado (7-8h)',
      'Evitar açúcar e farinha branca',
      'Cuidado especial com os pés'
    ]
  },
  
  'Diabetes': {
    nome: 'Diabetes Mellitus (Geral)',
    causas: [
      'Resistência à insulina ou deficiência insulínica',
      'Obesidade e sobrepeso',
      'Sedentarismo',
      'Predisposição genética',
      'Alimentação inadequada (alto índice glicêmico)',
      'Estresse crônico'
    ],
    fitoterapia: [
      {
        nome: 'Pata-de-vaca (Bauhinia forficata)',
        dosagem: '2g',
        posologia: 'Chá 3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Hipoglicemiante natural, melhora sensibilidade insulina'
      },
      {
        nome: 'Berberina',
        dosagem: '500mg',
        posologia: '3x ao dia antes refeições',
        duracao: 'Uso contínuo',
        observacoes: 'Equivalente a metformina, reduz glicemia'
      },
      {
        nome: 'Canela (Cinnamomum verum)',
        dosagem: '1-3g',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Melhora sensibilidade à insulina'
      },
      {
        nome: 'Gymnema sylvestre',
        dosagem: '400mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Reduz absorção de açúcar, regenera células beta'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Cromo picolinato',
        dosagem: '200-400mcg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Melhora sensibilidade à insulina, controle glicêmico'
      },
      {
        nutriente: 'Ácido alfa-lipóico',
        dosagem: '300-600mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Antioxidante, previne neuropatia diabética'
      },
      {
        nutriente: 'Magnésio glicinato',
        dosagem: '400mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Deficiente em diabéticos, melhora controle glicêmico'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '2000-4000 UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Melhora sensibilidade insulina, função células beta'
      },
      {
        nutriente: 'Ômega-3',
        dosagem: '2-3g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório, proteção cardiovascular'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Syzygium jambolanum 6CH',
        indicacao: 'Diabetes com muita sede e urina',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Phosphoricum acidum 30CH',
        indicacao: 'Diabetes com fraqueza mental e física',
        posologia: '5 glóbulos 2x ao dia'
      },
      {
        medicamento: 'Uranium nitricum 6CH',
        indicacao: 'Diabetes com perda de peso',
        posologia: '5 glóbulos 3x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Copaíba',
        uso: 'Difusão ou tópico diluído',
        diluicao: '3 gotas em difusor ou 5 gotas em 10ml óleo vegetal'
      },
      {
        oleo: 'Cravo-da-índia',
        uso: 'Inalação ou difusão',
        diluicao: '2-3 gotas no difusor'
      }
    ],
    orientacoesGerais: [
      'Dieta de baixo índice glicêmico',
      'Monitoramento regular da glicemia (jejum, pós-prandial)',
      'Exercícios físicos regulares (150min/semana)',
      'Controle de peso (IMC < 25)',
      'Evitar açúcares simples, carboidratos refinados',
      'Aumentar consumo de fibras (>25g/dia)',
      'Hidratação adequada (2L/dia)',
      'Controle de estresse (meditação, yoga)',
      'Sono adequado (7-8h/noite)',
      'Monitorar HbA1c trimestralmente (meta <7%)',
      'Acompanhamento médico regular',
      'Cuidados com pés (prevenção de neuropatia)',
      '🚨 ATENÇÃO: Acompanhamento médico obrigatório'
    ]
  },
  
  'Obesidade': {
    nome: 'Obesidade e Sobrepeso',
    causas: [
      'Desequilíbrio calórico',
      'Sedentarismo',
      'Alimentação inadequada',
      'Fatores hormonais',
      'Estresse',
      'Sono inadequado',
      'Predisposição genética'
    ],
    fitoterapia: [
      {
        nome: 'Chá verde (Camellia sinensis)',
        dosagem: '2-3 xícaras',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Termogênico, acelera metabolismo'
      },
      {
        nome: 'Hibisco (Hibiscus sabdariffa)',
        dosagem: '1 xícara',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Diurético, reduz absorção de carboidratos'
      },
      {
        nome: 'Caralluma (Caralluma fimbriata)',
        dosagem: '500mg',
        posologia: '2x ao dia',
        duracao: '3-6 meses',
        observacoes: 'Supressor de apetite'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Ômega-3',
        dosagem: '2-3g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório, melhora metabolismo'
      },
      {
        nutriente: 'L-Carnitina',
        dosagem: '1-2g',
        posologia: '30 min antes exercício',
        duracao: '3-6 meses',
        beneficio: 'Queima de gordura'
      },
      {
        nutriente: 'CLA (Ácido Linoleico Conjugado)',
        dosagem: '3-4g',
        posologia: '1-2x ao dia',
        duracao: '3-6 meses',
        beneficio: 'Redução gordura corporal'
      },
      {
        nutriente: 'Cromo',
        dosagem: '200-400mcg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Controle glicemia e apetite'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Fucus vesiculosus 6CH',
        indicacao: 'Obesidade com metabolismo lento',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Calcarea carbonica 30CH',
        indicacao: 'Obesidade com retenção líquida',
        posologia: '5 glóbulos 2x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Toranja (Grapefruit)',
        uso: 'Difusor ou inalação',
        diluicao: '5 gotas'
      },
      {
        oleo: 'Hortelã-pimenta',
        uso: 'Inalação para controle apetite',
        diluicao: '3 gotas'
      }
    ],
    orientacoesGerais: [
      'Déficit calórico moderado (500 kcal/dia)',
      'Dieta rica em proteínas e fibras',
      'Exercício aeróbico (150-300 min/semana)',
      'Musculação 2-3x/semana',
      'Sono adequado (7-9h)',
      'Controle de estresse',
      'Evitar alimentos ultraprocessados',
      'Hidratação adequada (2-3L/dia)',
      'Acompanhamento profissional'
    ]
  },
  'Colesterol alto': {
    nome: 'Hipercolesterolemia',
    causas: [
      'Dieta rica em gorduras saturadas',
      'Sedentarismo',
      'Obesidade',
      'Predisposição genética',
      'Diabetes',
      'Tabagismo'
    ],
    fitoterapia: [
      {
        nome: 'Alcachofra (Cynara scolymus)',
        dosagem: '600-1200mg',
        posologia: '2-3x ao dia',
        duracao: '2-3 meses',
        observacoes: 'Reduz colesterol LDL'
      },
      {
        nome: 'Alho (Allium sativum)',
        dosagem: '600-900mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Reduz colesterol total e LDL'
      },
      {
        nome: 'Berinjela',
        dosagem: '1 copo suco',
        posologia: '1x ao dia em jejum',
        duracao: 'Uso contínuo',
        observacoes: 'Reduz absorção colesterol'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Ômega-3 (EPA/DHA)',
        dosagem: '2-4g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Reduz triglicerídeos, eleva HDL'
      },
      {
        nutriente: 'Lecitina de soja',
        dosagem: '1-2g',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Emulsificante, reduz LDL'
      },
      {
        nutriente: 'Fibras solúveis (psyllium)',
        dosagem: '10-20g',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Reduz absorção colesterol'
      },
      {
        nutriente: 'Coenzima Q10',
        dosagem: '100-200mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Proteção cardiovascular'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Cholesterinum 6CH',
        indicacao: 'Hipercolesterolemia',
        posologia: '5 glóbulos 2x ao dia'
      },
      {
        medicamento: 'Aurum metallicum 30CH',
        indicacao: 'Com hipertensão associada',
        posologia: '5 glóbulos 2x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Alecrim',
        uso: 'Massagem ou difusor',
        diluicao: '5 gotas'
      },
      {
        oleo: 'Limão',
        uso: 'Difusor',
        diluicao: '5-7 gotas'
      }
    ],
    orientacoesGerais: [
      'Dieta mediterrânea',
      'Reduzir gorduras saturadas e trans',
      'Aumentar fibras (30g/dia)',
      'Exercício aeróbico regular',
      'Evitar tabagismo',
      'Controle de peso',
      'Incluir nozes e azeite',
      'Monitoramento periódico'
    ]
  },
  'Osteoporose': {
    nome: 'Osteoporose',
    causas: [
      'Deficiência de cálcio e vitamina D',
      'Menopausa',
      'Sedentarismo',
      'Tabagismo e álcool',
      'Uso prolongado de corticoides',
      'Envelhecimento'
    ],
    fitoterapia: [
      {
        nome: 'Cavalinha (Equisetum arvense)',
        dosagem: '2g',
        posologia: 'Chá 2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Rico em silício, fortalece ossos'
      },
      {
        nome: 'Alfafa (Medicago sativa)',
        dosagem: '500mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Rica em minerais'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Cálcio (citrato ou quelato)',
        dosagem: '1000-1200mg',
        posologia: 'Dividir em 2-3 doses',
        duracao: 'Uso contínuo',
        beneficio: 'Formação óssea'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '2000-4000UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Absorção de cálcio'
      },
      {
        nutriente: 'Vitamina K2 (MK-7)',
        dosagem: '100-200mcg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Fixação cálcio nos ossos'
      },
      {
        nutriente: 'Magnésio',
        dosagem: '400-500mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Metabolismo ósseo'
      },
      {
        nutriente: 'Colágeno tipo I',
        dosagem: '10g',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Matriz óssea'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Calcarea phosphorica 6CH',
        indicacao: 'Osteoporose, fraturas',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Symphytum 6CH',
        indicacao: 'Consolidação óssea',
        posologia: '5 glóbulos 3x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Alecrim',
        uso: 'Massagem nas articulações',
        diluicao: '5 gotas em óleo base'
      }
    ],
    orientacoesGerais: [
      'Exercícios com peso (musculação)',
      'Caminhada diária',
      'Exposição solar 15-20 min/dia',
      'Dieta rica em cálcio',
      'Evitar refrigerantes (ácido fosfórico)',
      'Evitar excesso de sal',
      'Parar de fumar',
      'Densitometria óssea periódica'
    ]
  },
  'Infarto': {
    nome: 'Prevenção de Infarto/Doença Cardiovascular',
    causas: [
      'Aterosclerose',
      'Hipertensão',
      'Diabetes',
      'Colesterol alto',
      'Tabagismo',
      'Obesidade',
      'Sedentarismo',
      'Estresse'
    ],
    fitoterapia: [
      {
        nome: 'Ginkgo biloba',
        dosagem: '120-240mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Melhora circulação'
      },
      {
        nome: 'Alho (Allium sativum)',
        dosagem: '600-900mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anticoagulante natural'
      },
      {
        nome: 'Espinheiro-branco (Crataegus)',
        dosagem: '300-500mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Cardiotônico'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Ômega-3 (EPA/DHA)',
        dosagem: '2-4g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Proteção cardiovascular'
      },
      {
        nutriente: 'Coenzima Q10',
        dosagem: '100-200mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Energia cardíaca'
      },
      {
        nutriente: 'Magnésio',
        dosagem: '400-500mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Ritmo cardíaco'
      },
      {
        nutriente: 'L-Carnitina',
        dosagem: '1-2g',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Metabolismo cardíaco'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Arnica montana 30CH',
        indicacao: 'Pós-infarto, trauma cardíaco',
        posologia: '5 glóbulos 2x ao dia'
      },
      {
        medicamento: 'Cactus grandiflorus 30CH',
        indicacao: 'Angina, constrição torácica',
        posologia: '5 glóbulos 2x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Lavanda',
        uso: 'Difusor, relaxante cardíaco',
        diluicao: '5-7 gotas'
      },
      {
        oleo: 'Ylang-ylang',
        uso: 'Massagem, reduz PA',
        diluicao: '3 gotas em óleo base'
      }
    ],
    orientacoesGerais: [
      'Dieta mediterrânea',
      'Exercício aeróbico moderado',
      'Controle rigoroso de PA e colesterol',
      'Parar de fumar URGENTE',
      'Controle de peso',
      'Gerenciamento de estresse',
      'Sono adequado',
      'Monitoramento cardiológico regular',
      'Evitar álcool em excesso'
    ]
  },
  'AVC': {
    nome: 'Prevenção de AVC/Acidente Vascular Cerebral',
    causas: [
      'Hipertensão',
      'Fibrilação atrial',
      'Diabetes',
      'Colesterol alto',
      'Tabagismo',
      'Obesidade',
      'Sedentarismo'
    ],
    fitoterapia: [
      {
        nome: 'Ginkgo biloba',
        dosagem: '120-240mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Melhora circulação cerebral'
      },
      {
        nome: 'Alho',
        dosagem: '600-900mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Antitrombótico'
      },
      {
        nome: 'Centella asiática',
        dosagem: '300mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Circulação cerebral'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Ômega-3',
        dosagem: '2-4g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório, antitrombótico'
      },
      {
        nutriente: 'Vitamina E',
        dosagem: '400-800UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Antioxidante vascular'
      },
      {
        nutriente: 'Ácido fólico + B6 + B12',
        dosagem: 'Complexo B',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Reduz homocisteína'
      },
      {
        nutriente: 'Magnésio',
        dosagem: '400-500mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Proteção vascular'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Arnica montana 200CH',
        indicacao: 'Prevenção/pós-AVC',
        posologia: '1 dose semanal'
      },
      {
        medicamento: 'Baryta carbonica 30CH',
        indicacao: 'Arteriosclerose cerebral',
        posologia: '5 glóbulos 2x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Alecrim',
        uso: 'Difusor, estimula circulação',
        diluicao: '5 gotas'
      },
      {
        oleo: 'Cipreste',
        uso: 'Massagem, circulação',
        diluicao: '3 gotas em óleo base'
      }
    ],
    orientacoesGerais: [
      'Controle rigoroso de PA (<120/80)',
      'Exercício regular moderado',
      'Dieta DASH ou mediterrânea',
      'Parar de fumar',
      'Controlar diabetes',
      'Reduzir sal',
      'Gerenciar estresse',
      'Monitoramento médico regular',
      'Sinais de alerta: SAMU 192'
    ]
  },
  'Câncer': {
    nome: 'Prevenção e Suporte Oncológico',
    causas: [
      'Genética',
      'Tabagismo',
      'Álcool',
      'Obesidade',
      'Sedentarismo',
      'Dieta inadequada',
      'Exposição a carcinógenos'
    ],
    fitoterapia: [
      {
        nome: 'Cúrcuma (Curcuma longa)',
        dosagem: '500-1000mg curcumina',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anti-inflamatório, antitumoral'
      },
      {
        nome: 'Chá verde',
        dosagem: '3-4 xícaras',
        posologia: 'Ao longo do dia',
        duracao: 'Uso contínuo',
        observacoes: 'Antioxidante, EGCG'
      },
      {
        nome: 'Graviola (uso cuidadoso)',
        dosagem: 'Conforme orientação',
        posologia: 'Apenas com acompanhamento',
        duracao: 'Período específico',
        observacoes: 'Imunomodulador'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Vitamina D3',
        dosagem: '4000-10000UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Imunomodulação, prevenção'
      },
      {
        nutriente: 'Ômega-3',
        dosagem: '2-4g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório'
      },
      {
        nutriente: 'Selênio',
        dosagem: '200mcg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Antioxidante, prevenção'
      },
      {
        nutriente: 'Vitamina C (altas doses)',
        dosagem: '1-3g',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Antioxidante, imunidade'
      },
      {
        nutriente: 'Glutamina',
        dosagem: '5-10g',
        posologia: '2x ao dia',
        duracao: 'Durante tratamento',
        beneficio: 'Proteção mucosa intestinal'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Conium maculatum 30CH',
        indicacao: 'Suporte em tumores',
        posologia: '5 glóbulos 2x ao dia'
      },
      {
        medicamento: 'Thuya occidentalis 30CH',
        indicacao: 'Imunoestimulante',
        posologia: '5 glóbulos 2x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Lavanda',
        uso: 'Difusor, reduz ansiedade',
        diluicao: '5-7 gotas'
      },
      {
        oleo: 'Incenso (Frankincense)',
        uso: 'Difusor ou massagem',
        diluicao: '3-5 gotas'
      }
    ],
    orientacoesGerais: [
      'Dieta anti-inflamatória',
      'Aumentar frutas e vegetais coloridos',
      'Evitar ultraprocessados',
      'Exercício regular moderado',
      'Controle de peso',
      'Evitar tabaco e álcool',
      'Gerenciar estresse',
      'Sono reparador',
      'Acompanhamento oncológico regular',
      'NUNCA substituir tratamento convencional'
    ]
  },
  'Alzheimer': {
    nome: 'Prevenção e Suporte Cognitivo (Alzheimer)',
    causas: [
      'Genética',
      'Idade avançada',
      'Diabetes',
      'Hipertensão',
      'Colesterol alto',
      'Traumatismo craniano',
      'Sedentarismo mental'
    ],
    fitoterapia: [
      {
        nome: 'Ginkgo biloba',
        dosagem: '120-240mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Melhora circulação cerebral'
      },
      {
        nome: 'Bacopa monnieri',
        dosagem: '300mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Neuroprotetor, memória'
      },
      {
        nome: 'Centella asiática',
        dosagem: '300mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Função cognitiva'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Ômega-3 (DHA)',
        dosagem: '2-3g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Saúde cerebral'
      },
      {
        nutriente: 'Curcumina (biodisponível)',
        dosagem: '500-1000mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório cerebral'
      },
      {
        nutriente: 'Vitamina E',
        dosagem: '400-800UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Antioxidante'
      },
      {
        nutriente: 'Vitaminas B (B6, B12, Folato)',
        dosagem: 'Complexo B',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Reduz homocisteína'
      },
      {
        nutriente: 'Fosfatidilserina',
        dosagem: '300mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Memória, cognição'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Baryta carbonica 30CH',
        indicacao: 'Declínio cognitivo',
        posologia: '5 glóbulos 2x ao dia'
      },
      {
        medicamento: 'Alumina 30CH',
        indicacao: 'Confusão mental',
        posologia: '5 glóbulos 2x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Alecrim',
        uso: 'Difusor, estimula memória',
        diluicao: '5 gotas'
      },
      {
        oleo: 'Hortelã-pimenta',
        uso: 'Inalação, clareza mental',
        diluicao: '3 gotas'
      }
    ],
    orientacoesGerais: [
      'Dieta mediterrânea',
      'Exercício mental diário (leitura, jogos)',
      'Exercício físico regular',
      'Socialização ativa',
      'Controle de fatores de risco cardiovascular',
      'Sono adequado (7-8h)',
      'Gerenciar estresse',
      'Aprendizado contínuo',
      'Acompanhamento neurológico'
    ]
  },
  'Parkinson': {
    nome: 'Suporte para Doença de Parkinson',
    causas: [
      'Degeneração neuronal',
      'Deficiência de dopamina',
      'Genética',
      'Exposição a toxinas',
      'Traumatismo craniano',
      'Estresse oxidativo'
    ],
    fitoterapia: [
      {
        nome: 'Mucuna pruriens',
        dosagem: '500-1000mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo com acompanhamento',
        observacoes: 'Fonte natural de L-DOPA'
      },
      {
        nome: 'Ginkgo biloba',
        dosagem: '120-240mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Neuroprotetor'
      },
      {
        nome: 'Cúrcuma',
        dosagem: '500-1000mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anti-inflamatório'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Coenzima Q10',
        dosagem: '300-1200mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Proteção mitocondrial'
      },
      {
        nutriente: 'Ômega-3',
        dosagem: '2-3g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Neuroproteção'
      },
      {
        nutriente: 'Vitamina E',
        dosagem: '400-800UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Antioxidante'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '2000-4000UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Neuroproteção'
      },
      {
        nutriente: 'N-Acetil Cisteína (NAC)',
        dosagem: '600-1200mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Antioxidante, glutationa'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Mercurius solubilis 30CH',
        indicacao: 'Tremores',
        posologia: '5 glóbulos 2x ao dia'
      },
      {
        medicamento: 'Gelsemium 30CH',
        indicacao: 'Rigidez e tremores',
        posologia: '5 glóbulos 2x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Lavanda',
        uso: 'Difusor, relaxante',
        diluicao: '5-7 gotas'
      },
      {
        oleo: 'Alecrim',
        uso: 'Massagem, estimulante',
        diluicao: '3 gotas em óleo base'
      }
    ],
    orientacoesGerais: [
      'Fisioterapia regular',
      'Exercícios de equilíbrio',
      'Tai chi ou yoga',
      'Fonoterapia (fala)',
      'Dieta rica em antioxidantes',
      'Hidratação adequada',
      'Sono regular',
      'Evitar toxinas ambientais',
      'Acompanhamento neurológico',
      'NUNCA suspender medicação sem orientação'
    ]
  },
  'Artrite': {
    nome: 'Artrite e Dores Articulares',
    causas: [
      'Inflamação articular',
      'Desgaste cartilagem',
      'Autoimunidade',
      'Obesidade',
      'Lesões prévias',
      'Envelhecimento'
    ],
    fitoterapia: [
      {
        nome: 'Cúrcuma (Curcuma longa)',
        dosagem: '500-1000mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anti-inflamatório potente'
      },
      {
        nome: 'Gengibre',
        dosagem: '500mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anti-inflamatório, analgésico'
      },
      {
        nome: 'Boswellia serrata',
        dosagem: '300-500mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anti-inflamatório articular'
      },
      {
        nome: 'Unha-de-gato',
        dosagem: '300mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anti-inflamatório'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Glucosamina + Condroitina',
        dosagem: '1500mg + 1200mg',
        posologia: '1-2x ao dia',
        duracao: 'Mínimo 3 meses',
        beneficio: 'Regeneração cartilagem'
      },
      {
        nutriente: 'MSM (Metilsulfonilmetano)',
        dosagem: '1000-3000mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório, enxofre'
      },
      {
        nutriente: 'Ômega-3',
        dosagem: '2-3g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório'
      },
      {
        nutriente: 'Colágeno tipo II',
        dosagem: '10g',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Regeneração articular'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '2000-4000UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Saúde óssea e articular'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Rhus toxicodendron 6CH',
        indicacao: 'Dor que melhora com movimento',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Bryonia 6CH',
        indicacao: 'Dor que piora com movimento',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Arnica montana 6CH',
        indicacao: 'Trauma articular',
        posologia: '5 glóbulos 3x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Eucalipto',
        uso: 'Massagem articular',
        diluicao: '5 gotas em óleo base'
      },
      {
        oleo: 'Lavanda',
        uso: 'Massagem, analgésico',
        diluicao: '5 gotas em óleo base'
      },
      {
        oleo: 'Gengibre',
        uso: 'Compressa quente',
        diluicao: '3 gotas'
      }
    ],
    orientacoesGerais: [
      'Exercícios de baixo impacto (natação, pilates)',
      'Fisioterapia',
      'Controle de peso',
      'Dieta anti-inflamatória',
      'Compressas quentes/frias',
      'Alongamentos suaves',
      'Evitar sobrecarga articular',
      'Hidroterapia',
      'Repouso quando necessário'
    ]
  },
  'Problemas de tireoide': {
    nome: 'Distúrbios da Tireoide',
    causas: [
      'Deficiência de iodo',
      'Autoimunidade',
      'Genética',
      'Estresse',
      'Deficiências nutricionais',
      'Exposição a toxinas'
    ],
    fitoterapia: [
      {
        nome: 'Ashwagandha (para hipotireoidismo)',
        dosagem: '300-600mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo com acompanhamento',
        observacoes: 'Adaptógeno, estimula tireoide'
      },
      {
        nome: 'Melissa (para hipertireoidismo)',
        dosagem: '300mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Inibe TSH'
      },
      {
        nome: 'Fucus vesiculosus (para hipo)',
        dosagem: '200mg',
        posologia: '2x ao dia',
        duracao: 'Com acompanhamento',
        observacoes: 'Rico em iodo'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Iodo (se deficiente)',
        dosagem: '150-300mcg',
        posologia: '1x ao dia',
        duracao: 'Conforme exames',
        beneficio: 'Produção hormônios tireoideanos'
      },
      {
        nutriente: 'Selênio',
        dosagem: '200mcg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Conversão T4 em T3'
      },
      {
        nutriente: 'Zinco',
        dosagem: '30mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Função tireoidiana'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '2000-4000UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Autoimunidade'
      },
      {
        nutriente: 'L-Tirosina (para hipo)',
        dosagem: '500-1000mg',
        posologia: '1-2x ao dia',
        duracao: 'Com acompanhamento',
        beneficio: 'Precursor hormônios'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Iodum 30CH',
        indicacao: 'Hipertireoidismo',
        posologia: '5 glóbulos 2x ao dia'
      },
      {
        medicamento: 'Thyroidinum 30CH',
        indicacao: 'Hipotireoidismo',
        posologia: '5 glóbulos 2x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Mirra',
        uso: 'Difusor ou massagem no pescoço',
        diluicao: '3 gotas'
      },
      {
        oleo: 'Incenso',
        uso: 'Difusor, equilíbrio hormonal',
        diluicao: '5 gotas'
      }
    ],
    orientacoesGerais: [
      'Exames regulares (TSH, T3, T4)',
      'Evitar glúten se Hashimoto',
      'Reduzir estresse',
      'Sono adequado',
      'Exercício moderado',
      'Evitar goitrogênicos em excesso (soja crua, crucíferas cruas)',
      'Dieta anti-inflamatória',
      'NUNCA suspender medicação sem orientação',
      'Acompanhamento endocrinológico'
    ]
  },
  'Alergias': {
    nome: 'Alergias Respiratórias e Cutâneas',
    causas: [
      'Hipersensibilidade imunológica',
      'Genética',
      'Exposição a alérgenos',
      'Intestino permeável',
      'Desequilíbrio imunológico'
    ],
    fitoterapia: [
      {
        nome: 'Quercetina',
        dosagem: '500mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anti-histamínico natural'
      },
      {
        nome: 'Urtica (Urtiga)',
        dosagem: '300mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anti-alérgico'
      },
      {
        nome: 'Camomila',
        dosagem: '1 xícara chá',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anti-inflamatório, calmante'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Vitamina C',
        dosagem: '1000mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-histamínico, antioxidante'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '2000-4000UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Imunomodulação'
      },
      {
        nutriente: 'Probióticos',
        dosagem: '10-50 bilhões UFC',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Equilíbrio imunológico'
      },
      {
        nutriente: 'Ômega-3',
        dosagem: '2-3g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório'
      },
      {
        nutriente: 'Bromelina',
        dosagem: '500mg',
        posologia: '2-3x ao dia',
        duracao: 'Durante crises',
        beneficio: 'Anti-inflamatório'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Allium cepa 6CH',
        indicacao: 'Rinite alérgica com coriza',
        posologia: '5 glóbulos 3-4x ao dia'
      },
      {
        medicamento: 'Apis mellifica 6CH',
        indicacao: 'Urticária, edema',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Histaminum 15CH',
        indicacao: 'Alergias em geral',
        posologia: '5 glóbulos 2x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Eucalipto',
        uso: 'Inalação para vias respiratórias',
        diluicao: '5 gotas'
      },
      {
        oleo: 'Lavanda',
        uso: 'Difusor, anti-inflamatório',
        diluicao: '5-7 gotas'
      },
      {
        oleo: 'Hortelã-pimenta',
        uso: 'Inalação para congestão',
        diluicao: '3 gotas'
      }
    ],
    orientacoesGerais: [
      'Identificar e evitar alérgenos',
      'Limpeza regular ambiente (ácaros)',
      'Usar capas anti-ácaros',
      'Evitar carpetes e cortinas pesadas',
      'Dieta anti-inflamatória',
      'Reparar intestino permeável',
      'Umidificar ambiente',
      'Evitar mudanças bruscas temperatura',
      'Acompanhamento alergológico'
    ]
  },

  // PROTOCOLOS PARA HISTÓRICO PESSOAL - DOENÇAS CRÔNICAS

  'DPOC': {
    nome: 'Doença Pulmonar Obstrutiva Crônica (DPOC)',
    causas: [
      'Tabagismo (principal causa)',
      'Exposição ocupacional (poeiras, químicos)',
      'Poluição do ar',
      'Deficiência de alfa-1-antitripsina (raro)',
      'Infecções respiratórias recorrentes',
      'Bronquite crônica',
      'Envelhecimento pulmonar'
    ],
    fitoterapia: [
      {
        nome: 'N-Acetilcisteína (NAC)',
        dosagem: '600mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Mucolítico, antioxidante pulmonar'
      },
      {
        nome: 'Eucalipto (Eucalyptus globulus)',
        dosagem: '200-300mg extrato',
        posologia: '3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Broncodilatador, expectorante'
      },
      {
        nome: 'Ginseng (Panax ginseng)',
        dosagem: '200mg',
        posologia: '2x ao dia',
        duracao: '3-6 meses',
        observacoes: 'Melhora capacidade respiratória e resistência'
      },
      {
        nome: 'Guaco (Mikania glomerata)',
        dosagem: '500mg',
        posologia: '3x ao dia',
        duracao: 'Uso conforme necessário',
        observacoes: 'Broncodilatador, expectorante, uso tradicional brasileiro'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Ômega-3 (EPA+DHA)',
        dosagem: '2-3g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório pulmonar, reduz exacerbações'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '2000-4000 UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Imunomodulação, reduz infecções respiratórias'
      },
      {
        nutriente: 'Vitamina C',
        dosagem: '1000mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Antioxidante, proteção tecido pulmonar'
      },
      {
        nutriente: 'Coenzima Q10',
        dosagem: '100-200mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Energia celular, melhora dispneia'
      },
      {
        nutriente: 'Magnésio',
        dosagem: '400-500mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Broncodilatação, relaxamento muscular respiratório'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Antimonium tartaricum 6CH',
        indicacao: 'Acúmulo de muco, dispneia',
        posologia: '5 gotas 3x/dia'
      },
      {
        medicamento: 'Carbo vegetabilis 30CH',
        indicacao: 'Falta de ar, cianose',
        posologia: '5 gotas 2x/dia'
      },
      {
        medicamento: 'Arsenicum album 30CH',
        indicacao: 'Ansiedade respiratória, piora à noite',
        posologia: '5 gotas 2-3x/dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Eucalipto',
        uso: 'Inalação ou difusor',
        diluicao: '3-5 gotas em vapor'
      },
      {
        oleo: 'Hortelã-pimenta',
        uso: 'Inalação para abertura vias aéreas',
        diluicao: '2-3 gotas'
      },
      {
        oleo: 'Lavanda',
        uso: 'Difusor para reduzir ansiedade respiratória',
        diluicao: '5-7 gotas'
      }
    ],
    orientacoesGerais: [
      '🚭 PARAR DE FUMAR - prioridade absoluta',
      'Vacinação anual (gripe, pneumonia)',
      'Fisioterapia respiratória regular',
      'Exercícios de reabilitação pulmonar',
      'Evitar poluentes e irritantes',
      'Uso correto de broncodilatadores prescritos',
      'Oxigenoterapia se indicado',
      'Hidratação adequada (2L água/dia)',
      'Alimentação anti-inflamatória',
      'Controle de peso (obesidade piora dispneia)',
      '⚠️ NUNCA suspender medicação sem orientação médica',
      'Acompanhamento pneumologista regular'
    ]
  },

  'Artrite reumatoide': {
    nome: 'Artrite Reumatoide',
    causas: [
      'Doença autoimune (ataque às articulações)',
      'Predisposição genética (HLA-DR4)',
      'Fatores ambientais (tabagismo, infecções)',
      'Desequilíbrio imunológico',
      'Inflamação crônica sistêmica',
      'Permeabilidade intestinal aumentada',
      'Deficiências nutricionais'
    ],
    fitoterapia: [
      {
        nome: 'Cúrcuma/Curcumina',
        dosagem: '500-1000mg',
        posologia: '2-3x ao dia com pimenta preta',
        duracao: 'Uso contínuo',
        observacoes: 'Potente anti-inflamatório, modulação imune'
      },
      {
        nome: 'Boswellia serrata',
        dosagem: '300-500mg',
        posologia: '3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Inibe LOX-5, reduz inflamação articular'
      },
      {
        nome: 'Gengibre (Zingiber officinale)',
        dosagem: '500-1000mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anti-inflamatório, reduz dor e rigidez'
      },
      {
        nome: 'Unha-de-gato (Uncaria tomentosa)',
        dosagem: '300mg',
        posologia: '2-3x ao dia',
        duracao: '3-6 meses',
        observacoes: 'Imunomodulador, anti-inflamatório'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Ômega-3 (EPA+DHA)',
        dosagem: '3-4g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório, reduz rigidez matinal'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '4000-6000 UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Imunomodulação, reduz atividade da doença'
      },
      {
        nutriente: 'Glucosamina + Condroitina',
        dosagem: '1500mg + 1200mg',
        posologia: '1x ao dia',
        duracao: 'Mínimo 3-6 meses',
        beneficio: 'Proteção cartilagem, redução dor'
      },
      {
        nutriente: 'MSM (Metilsulfonilmetano)',
        dosagem: '1000-3000mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Enxofre, formação colágeno, anti-inflamatório'
      },
      {
        nutriente: 'Colágeno tipo II',
        dosagem: '40mg UC-II ou 10g colágeno hidrolisado',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Tolerância imune, regeneração cartilagem'
      },
      {
        nutriente: 'Probióticos',
        dosagem: '20-50 bilhões UFC',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Modula intestino, reduz inflamação sistêmica'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Rhus toxicodendron 6CH',
        indicacao: 'Rigidez matinal que melhora com movimento',
        posologia: '5 gotas 3x/dia'
      },
      {
        medicamento: 'Bryonia alba 6CH',
        indicacao: 'Dor que piora com movimento',
        posologia: '5 gotas 3x/dia'
      },
      {
        medicamento: 'Apis mellifica 15CH',
        indicacao: 'Edema articular, calor local',
        posologia: '5 gotas 2x/dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Eucalipto limão',
        uso: 'Massagem articulações inflamadas',
        diluicao: '3% em óleo carreador'
      },
      {
        oleo: 'Gengibre',
        uso: 'Massagem para dor e circulação',
        diluicao: '2% em óleo carreador'
      },
      {
        oleo: 'Lavanda',
        uso: 'Relaxamento, anti-inflamatório',
        diluicao: '3-5% em óleo carreador'
      }
    ],
    orientacoesGerais: [
      'Dieta anti-inflamatória estrita (baixo glúten, lácteos)',
      'Evitar alimentos pró-inflamatórios (açúcar, processados)',
      'Fisioterapia e exercícios de baixo impacto',
      'Hidroterapia/natação',
      'Compressas quentes/frias conforme fase',
      'Controle de estresse (aumenta inflamação)',
      'Sono reparador (7-9h)',
      'Evitar tabagismo',
      'Manter peso saudável',
      'Proteção articular (evitar sobrecarga)',
      '⚠️ NUNCA suspender medicação imunossupressora sem orientação',
      'Acompanhamento reumatologista regular',
      'Exames VHS, PCR, fator reumatoide periódicos'
    ]
  },

  'Lúpus': {
    nome: 'Lúpus Eritematoso Sistêmico (LES)',
    causas: [
      'Doença autoimune sistêmica',
      'Predisposição genética',
      'Fatores hormonais (mais comum em mulheres)',
      'Exposição solar (gatilho)',
      'Infecções virais (gatilho)',
      'Medicamentos (lúpus induzido)',
      'Estresse oxidativo'
    ],
    fitoterapia: [
      {
        nome: 'Cúrcuma/Curcumina',
        dosagem: '500-1000mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anti-inflamatório, modulação imune, proteção renal'
      },
      {
        nome: 'Resveratrol',
        dosagem: '200-500mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Antioxidante, anti-inflamatório, proteção cardiovascular'
      },
      {
        nome: 'Chá verde (EGCG)',
        dosagem: '300-400mg EGCG',
        posologia: '2-3 xícaras/dia ou cápsulas',
        duracao: 'Uso contínuo',
        observacoes: 'Antioxidante, modulação imune, atenção com ferro'
      },
      {
        nome: 'Unha-de-gato (Uncaria tomentosa)',
        dosagem: '300mg',
        posologia: '2x ao dia',
        duracao: '3-6 meses',
        observacoes: 'Imunomodulador, usar com cautela (pode estimular imunidade)'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Vitamina D3',
        dosagem: '4000-6000 UI (ou conforme dosagem sérica)',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Imunomodulação, deficiência comum no lúpus'
      },
      {
        nutriente: 'Ômega-3 (EPA+DHA)',
        dosagem: '3-4g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório, proteção cardiovascular e renal'
      },
      {
        nutriente: 'N-Acetilcisteína (NAC)',
        dosagem: '600-1200mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Antioxidante, precursor glutationa, melhora fadiga'
      },
      {
        nutriente: 'Coenzima Q10',
        dosagem: '100-200mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Energia celular, antioxidante, proteção cardíaca'
      },
      {
        nutriente: 'DHEA',
        dosagem: '50-200mg (SOMENTE com supervisão médica)',
        posologia: '1x ao dia',
        duracao: 'Conforme orientação',
        beneficio: 'Pode reduzir atividade da doença (uso controverso)'
      },
      {
        nutriente: 'Probióticos',
        dosagem: '20-50 bilhões UFC',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Modulação intestino-imunidade'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Thuya occidentalis 30CH',
        indicacao: 'Doenças autoimunes, erupções cutâneas',
        posologia: '5 gotas 2x/dia'
      },
      {
        medicamento: 'Arsenicum album 30CH',
        indicacao: 'Fadiga, ansiedade, lesões cutâneas',
        posologia: '5 gotas 2-3x/dia'
      },
      {
        medicamento: 'Phosphorus 30CH',
        indicacao: 'Sensibilidade solar, sangramento',
        posologia: '5 gotas 2x/dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Lavanda',
        uso: 'Redução ansiedade e inflamação',
        diluicao: '3-5% em óleo carreador'
      },
      {
        oleo: 'Frankincense (Olíbano)',
        uso: 'Anti-inflamatório, imunomodulador',
        diluicao: '2-3% em óleo carreador'
      },
      {
        oleo: 'Camomila romana',
        uso: 'Anti-inflamatório, lesões cutâneas',
        diluicao: '2-3% em óleo carreador'
      }
    ],
    orientacoesGerais: [
      '☀️ PROTEÇÃO SOLAR RIGOROSA - FPS 50+, reaplicar 2/2h',
      'Evitar exposição solar em horários de pico',
      'Usar roupas com proteção UV, chapéus',
      'Dieta anti-inflamatória',
      'Evitar alfafa (pode exacerbar lúpus)',
      'Hidratação adequada (proteção renal)',
      'Repouso adequado (fadiga é sintoma comum)',
      'Gerenciamento estresse',
      'Evitar tabagismo',
      'Evitar álcool (interação medicamentos)',
      'Exercícios leves a moderados (sem exaustão)',
      '⚠️ NUNCA suspender corticoides ou imunossupressores',
      'Monitorar função renal (exame urina, creatinina)',
      'Acompanhamento reumatologista regular',
      'Atenção sinais de alerta (febre, lesões novas, proteinúria)'
    ]
  },

  'Psoríase': {
    nome: 'Psoríase',
    causas: [
      'Doença autoimune da pele',
      'Predisposição genética',
      'Hiperproliferação de queratinócitos',
      'Inflamação crônica',
      'Gatilhos: estresse, infecções, trauma cutâneo',
      'Permeabilidade intestinal (leaky gut)',
      'Disbiose intestinal'
    ],
    fitoterapia: [
      {
        nome: 'Cúrcuma/Curcumina',
        dosagem: '500-1000mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anti-inflamatório, reduz PASI (índice de gravidade)'
      },
      {
        nome: 'Óleo de melaleuca (Tea tree)',
        dosagem: 'Tópico 5-10%',
        posologia: 'Aplicação 2x/dia',
        duracao: 'Uso conforme necessário',
        observacoes: 'Anti-inflamatório, antimicrobiano tópico'
      },
      {
        nome: 'Alcaçuz (Glycyrrhiza glabra)',
        dosagem: '200-400mg',
        posologia: '2x ao dia',
        duracao: '2-3 meses (ciclos)',
        observacoes: 'Anti-inflamatório, modulação imune - atenção PA'
      },
      {
        nome: 'Bardana (Arctium lappa)',
        dosagem: '300-500mg',
        posologia: '2-3x ao dia',
        duracao: '2-3 meses',
        observacoes: 'Depurativo, anti-inflamatório cutâneo'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Ômega-3 (EPA+DHA)',
        dosagem: '3-4g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório, reduz vermelhidão e descamação'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '4000-6000 UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Regulação proliferação queratinócitos, imunomodulação'
      },
      {
        nutriente: 'Vitamina A',
        dosagem: '10.000-25.000 UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo (não em gestantes)',
        beneficio: 'Diferenciação celular, saúde da pele'
      },
      {
        nutriente: 'Zinco',
        dosagem: '30-50mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Cicatrização, função imune'
      },
      {
        nutriente: 'Probióticos',
        dosagem: '20-50 bilhões UFC',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Modula eixo intestino-pele, reduz inflamação'
      },
      {
        nutriente: 'Selênio',
        dosagem: '200mcg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Antioxidante, função tireoidiana'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Arsenicum album 30CH',
        indicacao: 'Psoríase com pele seca, queimação',
        posologia: '5 gotas 2-3x/dia'
      },
      {
        medicamento: 'Graphites 6CH',
        indicacao: 'Lesões com secreção, couro cabeludo',
        posologia: '5 gotas 3x/dia'
      },
      {
        medicamento: 'Sulphur 30CH',
        indicacao: 'Prurido intenso, piora calor',
        posologia: '5 gotas 2x/dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Melaleuca (Tea tree)',
        uso: 'Aplicação tópica diluída',
        diluicao: '3-5% em óleo carreador'
      },
      {
        oleo: 'Lavanda',
        uso: 'Anti-inflamatório, cicatrizante',
        diluicao: '3-5% em óleo carreador'
      },
      {
        oleo: 'Gerânio',
        uso: 'Regeneração cutânea',
        diluicao: '2-3% em óleo carreador'
      }
    ],
    orientacoesGerais: [
      'Dieta anti-inflamatória estrita',
      'Evitar glúten (associação com psoríase)',
      'Reduzir laticínios e alimentos pró-inflamatórios',
      'Aumentar vegetais folhosos e ômega-3',
      'Hidratação pele (cremes emolientes 2-3x/dia)',
      'Banhos curtos, água morna (não quente)',
      'Exposição solar moderada (15-20min/dia)',
      'Evitar trauma cutâneo (fenômeno de Koebner)',
      'Gerenciamento estresse (yoga, meditação)',
      'Evitar álcool e tabaco',
      'Fototerapia UVB (sob supervisão)',
      'Acompanhamento dermatologista',
      'Vigilância artrite psoriásica (10-30% desenvolvem)'
    ]
  },

  'Doença de Crohn': {
    nome: 'Doença de Crohn',
    causas: [
      'Doença inflamatória intestinal (DII)',
      'Autoimunidade',
      'Disbiose intestinal severa',
      'Predisposição genética',
      'Permeabilidade intestinal aumentada',
      'Resposta imune desregulada',
      'Fatores ambientais (dieta, estresse)'
    ],
    fitoterapia: [
      {
        nome: 'Curcumina (Cúrcuma)',
        dosagem: '500-1000mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anti-inflamatório intestinal, melhora remissão'
      },
      {
        nome: 'Boswellia serrata',
        dosagem: '400mg',
        posologia: '3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Inibe leucotrienos, reduz inflamação intestinal'
      },
      {
        nome: 'Aloe vera (gel interno)',
        dosagem: '100-200ml suco',
        posologia: '2x ao dia',
        duracao: '4-8 semanas (ciclos)',
        observacoes: 'Cicatrizante mucosa, anti-inflamatório - uso cauteloso'
      },
      {
        nome: 'Alcaçuz deglicirizado (DGL)',
        dosagem: '400-800mg',
        posologia: '2-3x ao dia antes refeições',
        duracao: 'Uso contínuo',
        observacoes: 'Proteção mucosa, anti-inflamatório'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Glutamina',
        dosagem: '5-10g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Reparação mucosa intestinal, nutrição enterócitos'
      },
      {
        nutriente: 'Ômega-3 (EPA+DHA)',
        dosagem: '3-4g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório, melhora remissão'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '4000-6000 UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Imunomodulação, deficiência comum em DII'
      },
      {
        nutriente: 'Vitamina B12',
        dosagem: '1000mcg sublingual',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Deficiência por má absorção ileal'
      },
      {
        nutriente: 'Ferro (se anemia)',
        dosagem: 'Conforme dosagem sérica',
        posologia: 'Preferencialmente IV em crises',
        duracao: 'Conforme necessidade',
        beneficio: 'Correção anemia ferropriva'
      },
      {
        nutriente: 'Zinco',
        dosagem: '30-50mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Cicatrização, função imune, deficiência comum'
      },
      {
        nutriente: 'Probióticos (cepas específicas)',
        dosagem: '50-100 bilhões UFC',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Saccharomyces boulardii, Lactobacillus GG - modula inflamação'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Mercurius corrosivus 30CH',
        indicacao: 'Diarreia com sangue, tenesmo',
        posologia: '5 gotas 3x/dia'
      },
      {
        medicamento: 'Arsenicum album 30CH',
        indicacao: 'Diarreia com ansiedade, queimação',
        posologia: '5 gotas 2-3x/dia'
      },
      {
        medicamento: 'Colchicum 6CH',
        indicacao: 'Náusea intensa, odor de alimentos',
        posologia: '5 gotas conforme necessário'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Hortelã-pimenta',
        uso: 'Massagem abdominal para cólicas',
        diluicao: '2% em óleo carreador'
      },
      {
        oleo: 'Lavanda',
        uso: 'Anti-inflamatório, reduz estresse',
        diluicao: '3% em óleo carreador ou difusor'
      },
      {
        oleo: 'Camomila romana',
        uso: 'Anti-espasmódico, massagem abdominal',
        diluicao: '2-3% em óleo carreador'
      }
    ],
    orientacoesGerais: [
      'Dieta individualizada (eliminar gatilhos pessoais)',
      'Protocolo Low-FODMAP (sob orientação)',
      'Dieta de Carboidratos Específicos (SCD) ou Paleo AIP',
      'Evitar glúten, laticínios em fases ativas',
      'Evitar alimentos processados, aditivos',
      'Mastigação adequada',
      'Hidratação adequada (risco desidratação)',
      'Repouso intestinal em crises (dieta líquida/elementar)',
      'Gerenciamento estresse (piora doença)',
      'Exercícios moderados (melhoram inflamação)',
      'Evitar AINEs (pioram DII)',
      'Evitar tabagismo (piora Crohn)',
      '⚠️ NUNCA suspender medicação imunossupressora',
      'Acompanhamento gastroenterologista regular',
      'Colonoscopia conforme protocolo',
      'Atenção sinais alarme (obstrução, sangramento intenso)'
    ]
  },

  'Colite ulcerativa': {
    nome: 'Colite Ulcerativa (Retocolite Ulcerativa)',
    causas: [
      'Doença inflamatória intestinal (DII)',
      'Autoimunidade',
      'Disbiose intestinal',
      'Predisposição genética',
      'Permeabilidade intestinal',
      'Resposta imune exacerbada',
      'Fatores ambientais'
    ],
    fitoterapia: [
      {
        nome: 'Curcumina (Cúrcuma)',
        dosagem: '1000-2000mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Eficácia comprovada em colite, indução remissão'
      },
      {
        nome: 'Boswellia serrata',
        dosagem: '400mg',
        posologia: '3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Comparável mesalazina em estudos'
      },
      {
        nome: 'Psyllium (Plantago ovata)',
        dosagem: '10g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo (remissão)',
        observacoes: 'Fibra solúvel, manutenção remissão'
      },
      {
        nome: 'Alcaçuz deglicirizado (DGL)',
        dosagem: '400-800mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Proteção mucosa colônica'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Ácidos graxos de cadeia curta (Butirato)',
        dosagem: '300-600mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Nutrição colonócitos, anti-inflamatório colônico'
      },
      {
        nutriente: 'Ômega-3 (EPA+DHA)',
        dosagem: '3-4g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório, manutenção remissão'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '4000-6000 UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Imunomodulação, deficiência comum'
      },
      {
        nutriente: 'Ferro (se anemia)',
        dosagem: 'Conforme exames',
        posologia: 'Preferência IV em crises',
        duracao: 'Conforme necessidade',
        beneficio: 'Correção anemia por sangramento'
      },
      {
        nutriente: 'Zinco',
        dosagem: '30-50mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Cicatrização mucosa, função imune'
      },
      {
        nutriente: 'Probióticos (VSL#3 ou similar)',
        dosagem: '450 bilhões UFC',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'VSL#3 específico para colite - evidência forte'
      },
      {
        nutriente: 'Glutamina',
        dosagem: '5-10g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Reparação mucosa intestinal'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Mercurius corrosivus 30CH',
        indicacao: 'Diarreia sanguinolenta, tenesmo intenso',
        posologia: '5 gotas 3x/dia'
      },
      {
        medicamento: 'Phosphorus 30CH',
        indicacao: 'Sangramento retal, fraqueza',
        posologia: '5 gotas 2x/dia'
      },
      {
        medicamento: 'Nux vomica 6CH',
        indicacao: 'Espasmos, urgência evacuar',
        posologia: '5 gotas 3x/dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Hortelã-pimenta',
        uso: 'Massagem abdominal anti-espasmódica',
        diluicao: '2% em óleo carreador'
      },
      {
        oleo: 'Lavanda',
        uso: 'Anti-inflamatório, relaxante',
        diluicao: '3% em óleo carreador'
      },
      {
        oleo: 'Frankincense (Olíbano)',
        uso: 'Anti-inflamatório intestinal',
        diluicao: '2% em óleo carreador'
      }
    ],
    orientacoesGerais: [
      'Dieta individualizada (identificar gatilhos)',
      'Protocolo Low-FODMAP (fase ativa)',
      'Evitar laticínios, glúten (se intolerância)',
      'Evitar cafeína, álcool, picantes (fase ativa)',
      'Fibras solúveis (remissão) vs baixo resíduo (crise)',
      'Hidratação adequada',
      'Gerenciamento estresse (yoga, meditação)',
      'Exercícios moderados',
      'Evitar AINEs (ibuprofeno piora)',
      '⚠️ NUNCA suspender mesalazina ou imunossupressores',
      'Acompanhamento gastroenterologista',
      'Colonoscopia vigilância câncer (após 8 anos de doença)',
      'Atenção sinais alarme (megacólon tóxico, sangramento maciço)',
      'Suporte psicológico (impacto qualidade de vida)'
    ]
  },

  'Endometriose': {
    nome: 'Endometriose',
    causas: [
      'Crescimento tecido endometrial fora útero',
      'Menstruação retrógrada',
      'Fatores imunológicos',
      'Fatores genéticos',
      'Inflamação pélvica crônica',
      'Dominância estrogênica',
      'Exposição xenoestrogênios (disruptores)'
    ],
    fitoterapia: [
      {
        nome: 'Vitex agnus-castus (Agnocasto)',
        dosagem: '400mg',
        posologia: '1x ao dia (manhã)',
        duracao: 'Mínimo 3-6 meses',
        observacoes: 'Equilibra progesterona, reduz dor pélvica'
      },
      {
        nome: 'Cúrcuma/Curcumina',
        dosagem: '500-1000mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anti-inflamatório, inibe proliferação endometrial'
      },
      {
        nome: 'Gengibre',
        dosagem: '500-1000mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Anti-inflamatório, reduz dismenorreia'
      },
      {
        nome: 'Unha-de-gato (Uncaria tomentosa)',
        dosagem: '300mg',
        posologia: '2x ao dia',
        duracao: '3-6 meses',
        observacoes: 'Anti-inflamatório, imunomodulador'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Ômega-3 (EPA+DHA)',
        dosagem: '2-3g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório, reduz dismenorreia'
      },
      {
        nutriente: 'N-Acetilcisteína (NAC)',
        dosagem: '600mg',
        posologia: '3x ao dia',
        duracao: '3 meses (estudos mostram redução cistos)',
        beneficio: 'Antioxidante, reduz tamanho endometriomas'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '2000-4000 UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Imunomodulação, reduz inflamação'
      },
      {
        nutriente: 'Magnésio glicinato',
        dosagem: '400-600mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Relaxamento muscular, reduz cólicas'
      },
      {
        nutriente: 'DIM (Di-Indolil-Metano)',
        dosagem: '200-400mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Metabolismo estrogênio, equilíbrio hormonal'
      },
      {
        nutriente: 'Resveratrol',
        dosagem: '200-500mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Antioxidante, anti-proliferativo'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Sepia 30CH',
        indicacao: 'Dor pélvica, peso vaginal, fadiga',
        posologia: '5 gotas 2x/dia'
      },
      {
        medicamento: 'Lachesis 30CH',
        indicacao: 'Dor intensa pré-menstrual, melhora com fluxo',
        posologia: '5 gotas 2x/dia'
      },
      {
        medicamento: 'Magnesia phosphorica 6CH',
        indicacao: 'Cólicas intensas que melhoram com calor',
        posologia: '5 gotas 3x/dia ou conforme necessário'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Lavanda',
        uso: 'Massagem abdominal/lombar, analgésico',
        diluicao: '3-5% em óleo carreador'
      },
      {
        oleo: 'Salvia esclareia',
        uso: 'Equilibrio hormonal, antiespasmódico',
        diluicao: '2-3% em óleo carreador'
      },
      {
        oleo: 'Rosa',
        uso: 'Apoio emocional, regulação hormonal',
        diluicao: '1-2% em óleo carreador'
      }
    ],
    orientacoesGerais: [
      'Dieta anti-inflamatória estrita',
      'Evitar glúten (estudos mostram piora sintomas)',
      'Reduzir laticínios (contém hormônios)',
      'Aumentar vegetais crucíferos (metabolismo estrogênio)',
      'Evitar carne vermelha (ácido araquidônico)',
      'Evitar álcool (aumenta estrogênio)',
      'Evitar cafeína excessiva',
      'Reduzir exposição xenoestrogênios (plásticos, pesticidas)',
      'Exercícios regulares (reduzem estrogênio)',
      'Yoga, pilates (melhora dor pélvica)',
      'Fisioterapia pélvica',
      'Gerenciamento estresse',
      'Compressas quentes (cólicas)',
      'Acompanhamento ginecologista',
      'Considerar terapia hormonal (DIU Mirena, pílula contínua)',
      'Cirurgia videolaparoscópica (casos graves)',
      'Suporte fertilidade (endometriose causa infertilidade)'
    ]
  },

  'SOP': {
    nome: 'Síndrome dos Ovários Policísticos (SOP)',
    causas: [
      'Resistência insulínica (causa principal)',
      'Hiperandrogenismo',
      'Desequilíbrio hormonal (LH/FSH)',
      'Inflamação crônica de baixo grau',
      'Disfunção eixo hipotálamo-hipófise-ovário',
      'Fatores genéticos',
      'Obesidade/síndrome metabólica'
    ],
    fitoterapia: [
      {
        nome: 'Vitex agnus-castus (Agnocasto)',
        dosagem: '400mg',
        posologia: '1x ao dia (manhã)',
        duracao: 'Mínimo 3-6 meses',
        observacoes: 'Regula LH/FSH, melhora ciclo menstrual'
      },
      {
        nome: 'Berberina',
        dosagem: '500mg',
        posologia: '2-3x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Comparável metformina - melhora resistência insulínica'
      },
      {
        nome: 'Canela (Cinnamomum)',
        dosagem: '500mg',
        posologia: '2x ao dia',
        duracao: 'Uso contínuo',
        observacoes: 'Sensibilidade insulínica, regula ciclo'
      },
      {
        nome: 'Saw Palmetto (Serenoa repens)',
        dosagem: '160mg',
        posologia: '2x ao dia',
        duracao: '3-6 meses',
        observacoes: 'Reduz andrógenos, melhora hirsutismo'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Inositol (Mio-inositol + D-quiro-inositol 40:1)',
        dosagem: '2-4g mio-inositol',
        posologia: '1-2x ao dia',
        duracao: 'Mínimo 3-6 meses',
        beneficio: 'FUNDAMENTAL - melhora resistência insulínica, ovulação'
      },
      {
        nutriente: 'N-Acetilcisteína (NAC)',
        dosagem: '600mg',
        posologia: '2-3x ao dia',
        duracao: '3-6 meses',
        beneficio: 'Melhora resistência insulínica, reduz andrógenos'
      },
      {
        nutriente: 'Ômega-3 (EPA+DHA)',
        dosagem: '2-3g',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório, melhora perfil lipídico'
      },
      {
        nutriente: 'Cromo picolinato',
        dosagem: '200-1000mcg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Sensibilidade insulínica'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '2000-4000 UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Regulação hormonal, resistência insulínica'
      },
      {
        nutriente: 'Magnésio',
        dosagem: '400-500mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Sensibilidade insulínica, regulação hormonal'
      },
      {
        nutriente: 'Zinco',
        dosagem: '30mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Reduz andrógenos, melhora pele/acne'
      },
      {
        nutriente: 'Ácido alfa-lipóico',
        dosagem: '300-600mg',
        posologia: '1-2x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Sensibilidade insulínica, antioxidante'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Pulsatilla 30CH',
        indicacao: 'Irregularidade menstrual, humor variável',
        posologia: '5 gotas 2x/dia'
      },
      {
        medicamento: 'Sepia 30CH',
        indicacao: 'Irregularidade, fadiga, apatia',
        posologia: '5 gotas 2x/dia'
      },
      {
        medicamento: 'Natrum muriaticum 30CH',
        indicacao: 'Acne, oleosidade, irregularidade',
        posologia: '5 gotas 2x/dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Salvia esclareia',
        uso: 'Equilibrio hormonal, regula estrogênio',
        diluicao: '2-3% em óleo carreador'
      },
      {
        oleo: 'Lavanda',
        uso: 'Reduz estresse (piora SOP)',
        diluicao: '3-5% em óleo carreador ou difusor'
      },
      {
        oleo: 'Gerânio',
        uso: 'Equilibrio hormonal, regulação ciclo',
        diluicao: '2-3% em óleo carreador'
      }
    ],
    orientacoesGerais: [
      '🔑 DIETA BAIXO IG - essencial para resistência insulínica',
      'Reduzir carboidratos refinados e açúcar',
      'Aumentar proteínas e fibras',
      'Dieta anti-inflamatória',
      'Evitar laticínios (aumentam andrógenos)',
      'Reduzir glúten (inflamação)',
      'Exercícios regulares (resistência + aeróbico)',
      'Perda de peso 5-10% (melhora significativa sintomas)',
      'Gerenciamento estresse (cortisol piora resistência insulínica)',
      'Sono adequado (7-9h)',
      'Controle glicemia (risco diabetes 50%)',
      'Tratamento hirsutismo (laser, eletrólise)',
      'Cuidados pele/acne',
      'Acompanhamento ginecologista/endocrinologista',
      'Considerar metformina (se resistência insulínica)',
      'Anticoncepcionais (se não busca gravidez)',
      'Indução ovulação (se busca gravidez)',
      'Monitorar risco cardiovascular e diabetes'
    ]
  },

  'Dor no pescoço': {
    nome: 'Cervicalgia / Dor no Pescoço',
    causas: [
      'Tensão muscular cervical',
      'Má postura (celular, computador)',
      'Estresse e ansiedade',
      'Travesseiro inadequado',
      'Artrose cervical',
      'Hernia de disco cervical',
      'Sedentarismo'
    ],
    fitoterapia: [
      {
        nome: 'Harpagophytum procumbens (Garra-do-diabo)',
        dosagem: '600mg',
        posologia: '2x ao dia',
        duracao: '4-8 semanas',
        observacoes: 'Anti-inflamatório e analgésico natural'
      },
      {
        nome: 'Salix alba (Salgueiro branco)',
        dosagem: '240mg',
        posologia: '2x ao dia',
        duracao: '4-6 semanas',
        observacoes: 'Analgésico; análogo natural da aspirina'
      },
      {
        nome: 'Boswellia serrata',
        dosagem: '400mg',
        posologia: '2-3x ao dia',
        duracao: '6-12 semanas',
        observacoes: 'Anti-inflamatório potente, inibe 5-LOX'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Magnésio glicinato',
        dosagem: '400mg',
        posologia: '1x ao dia (noite)',
        duracao: 'Uso contínuo',
        beneficio: 'Relaxamento muscular e redução de tensão cervical'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '2000-4000 UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Saúde óssea e redução de inflamação'
      },
      {
        nutriente: 'Colágeno tipo II',
        dosagem: '40mg',
        posologia: '1x ao dia (jejum)',
        duracao: '3-6 meses',
        beneficio: 'Saúde das articulações e discos cervicais'
      },
      {
        nutriente: 'Ômega-3',
        dosagem: '2000mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório sistêmico'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Rhus toxicodendron 30CH',
        indicacao: 'Rigidez cervical que melhora com movimento',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Causticum 30CH',
        indicacao: 'Rigidez crônica, limitação de movimento',
        posologia: '5 glóbulos 2x ao dia'
      },
      {
        medicamento: 'Bryonia 30CH',
        indicacao: 'Dor que piora com qualquer movimento',
        posologia: '5 glóbulos 3x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Alecrim (Rosmarinus officinalis)',
        uso: 'Massagem cervical, relaxamento muscular',
        diluicao: '2-3% em óleo de coco ou girassol'
      },
      {
        oleo: 'Hortelã-pimenta (Mentha piperita)',
        uso: 'Ação analgésica local, resfriamento',
        diluicao: '1-2% em óleo carreador'
      },
      {
        oleo: 'Lavanda (Lavandula angustifolia)',
        uso: 'Relaxamento muscular e mental',
        diluicao: '3-5% em óleo carreador ou difusor'
      }
    ],
    orientacoesGerais: [
      'Alongamentos cervicais diários (5-10 min)',
      'Correção postural no trabalho e ao usar celular',
      'Travesseiro anatômico adequado à posição de dormir',
      'Evitar ficar com pescoço flexionado por longos períodos',
      'Compressas quentes para tensão muscular',
      'Fisioterapia e massoterapia regular',
      'Técnicas de relaxamento para reduzir estresse',
      'Exercícios de fortalecimento muscular cervical'
    ]
  },

  'Dor nos ombros': {
    nome: 'Dor nos Ombros / Periartrite e Bursite',
    causas: [
      'Bursite subacromial',
      'Tendinite do manguito rotador',
      'Lesão por esforço repetitivo',
      'Má postura (ombros curvados)',
      'Artrose acromioclavicular',
      'Tensão muscular trapézio',
      'Trabalho com braços levantados'
    ],
    fitoterapia: [
      {
        nome: 'Boswellia serrata',
        dosagem: '400mg',
        posologia: '3x ao dia',
        duracao: '8-12 semanas',
        observacoes: 'Anti-inflamatório; reduz dor articular'
      },
      {
        nome: 'Curcuma longa (Cúrcuma)',
        dosagem: '500mg',
        posologia: '2-3x ao dia',
        duracao: '8-12 semanas',
        observacoes: 'Usar com piperina 5mg para melhor absorção'
      },
      {
        nome: 'Harpagophytum procumbens',
        dosagem: '600mg',
        posologia: '2x ao dia',
        duracao: '4-8 semanas',
        observacoes: 'Analgésico e anti-inflamatório natural'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Colágeno tipo II',
        dosagem: '40mg',
        posologia: '1x ao dia (jejum)',
        duracao: '3-6 meses',
        beneficio: 'Regeneração tendínea e articular'
      },
      {
        nutriente: 'Glucosamina sulfato',
        dosagem: '1500mg',
        posologia: '1x ao dia',
        duracao: '3-6 meses',
        beneficio: 'Saúde articular e redução de dor'
      },
      {
        nutriente: 'MSM (Metilsulfonilmetano)',
        dosagem: '1500mg',
        posologia: '2x ao dia',
        duracao: '3 meses',
        beneficio: 'Anti-inflamatório, redução de dor muscular'
      },
      {
        nutriente: 'Ômega-3',
        dosagem: '2000mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório sistêmico'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Apis mellifica 30CH',
        indicacao: 'Dor em queimação com inchaço local',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Bryonia 30CH',
        indicacao: 'Dor que piora com movimento',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Sanguinaria 30CH',
        indicacao: 'Dor no ombro direito clássica',
        posologia: '5 glóbulos 2x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Wintergreen (Gaulthéria)',
        uso: 'Analgésico tópico potente (salicilato de metila)',
        diluicao: '0.5-1% em óleo carreador'
      },
      {
        oleo: 'Alecrim (cineol)',
        uso: 'Estimula circulação local, relaxa músculo',
        diluicao: '2-3% em óleo carreador'
      },
      {
        oleo: 'Camomila alemã',
        uso: 'Anti-inflamatório local',
        diluicao: '1-2% em gel ou óleo carreador'
      }
    ],
    orientacoesGerais: [
      'Fisioterapia especializada em ombro',
      'Exercícios de fortalecimento do manguito rotador',
      'Correção postural dos ombros',
      'Evitar levantar peso acima da cabeça durante crises',
      'Compressas de gelo nas primeiras 48h (fase aguda)',
      'Calor úmido após fase aguda',
      'Ergonomia no trabalho',
      'Pilates e RPG para correção postural'
    ]
  },

  'Dor nas costas': {
    nome: 'Dorsalgia / Dor nas Costas',
    causas: [
      'Má postura e sedentarismo',
      'Tensão muscular paravertebral',
      'Escoliose ou cifose',
      'Estresse emocional',
      'Osteoporose incipiente',
      'Sobrecarga mecânica',
      'Deficiência de vitamina D e cálcio'
    ],
    fitoterapia: [
      {
        nome: 'Harpagophytum procumbens (Garra-do-diabo)',
        dosagem: '600mg',
        posologia: '2x ao dia',
        duracao: '6-8 semanas',
        observacoes: 'Principal anti-inflamatório para dores crônicas'
      },
      {
        nome: 'Boswellia serrata',
        dosagem: '400mg',
        posologia: '2x ao dia',
        duracao: '8-12 semanas',
        observacoes: 'Anti-inflamatório, melhora amplitude de movimento'
      },
      {
        nome: 'Valeriana officinalis',
        dosagem: '300mg',
        posologia: '2x ao dia',
        duracao: '4-8 semanas',
        observacoes: 'Relaxante muscular natural'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Magnésio glicinato',
        dosagem: '400mg',
        posologia: '1x ao dia (noite)',
        duracao: 'Uso contínuo',
        beneficio: 'Relaxamento muscular, redução de espasmos'
      },
      {
        nutriente: 'Vitamina D3 + K2',
        dosagem: '2000-5000 UI D3 + 100mcg K2',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Saúde óssea e muscular'
      },
      {
        nutriente: 'Cálcio citrato',
        dosagem: '1000mg',
        posologia: '2x ao dia (com refeição)',
        duracao: 'Uso contínuo',
        beneficio: 'Saúde óssea e muscular'
      },
      {
        nutriente: 'Ômega-3',
        dosagem: '2000mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório e saúde musculoesquelética'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Rhus toxicodendron 30CH',
        indicacao: 'Dor que melhora com movimento e calor',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Kalmia latifolia 30CH',
        indicacao: 'Dor que desce pela coluna, tipo neuralgia',
        posologia: '5 glóbulos 2x ao dia'
      },
      {
        medicamento: 'Berberis vulgaris 30CH',
        indicacao: 'Dor nas costas irradiada com sensação de peso',
        posologia: '5 glóbulos 3x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Alecrim (Rosmarinus officinalis)',
        uso: 'Massagem nas costas, relaxa musculatura',
        diluicao: '2-3% em óleo carreador'
      },
      {
        oleo: 'Gengibre (Zingiber officinale)',
        uso: 'Aquece e alivia dores musculares profundas',
        diluicao: '1-2% em óleo carreador'
      },
      {
        oleo: 'Lavanda',
        uso: 'Relaxamento muscular e alívio da tensão',
        diluicao: '3-5% em óleo carreador'
      }
    ],
    orientacoesGerais: [
      'Fisioterapia e pilates específico para coluna',
      'Correção postural no trabalho e dia a dia',
      'Evitar ficar sentado por mais de 1h sem pausa',
      'Compressas quentes para tensão muscular',
      'Fortalecimento da musculatura do core',
      'Colchão ortopédico adequado',
      'Perda de peso se sobrepeso (reduz carga vertebral)',
      'Caminhadas e hidroginástica como exercícios recomendados'
    ]
  },

  'Lombalgia': {
    nome: 'Lombalgia / Dor Lombar',
    causas: [
      'Tensão muscular lombar',
      'Hérnia de disco lombar (L4-L5, L5-S1)',
      'Má postura e sedentarismo',
      'Sobrepeso e obesidade',
      'Estresse emocional',
      'Artrorse facetária',
      'Deficiência de magnésio e vitamina D'
    ],
    fitoterapia: [
      {
        nome: 'Harpagophytum procumbens (Garra-do-diabo)',
        dosagem: '600-900mg',
        posologia: '2-3x ao dia',
        duracao: '6-12 semanas',
        observacoes: 'Evidência clínica para lombalgia crônica'
      },
      {
        nome: 'Salix alba (Salgueiro branco)',
        dosagem: '240mg',
        posologia: '2x ao dia',
        duracao: '4-6 semanas',
        observacoes: 'Estudos comparáveis ao ibuprofeno para dor lombar'
      },
      {
        nome: 'Boswellia serrata',
        dosagem: '400mg',
        posologia: '3x ao dia',
        duracao: '8-12 semanas',
        observacoes: 'Anti-inflamatório potente sem efeitos gástricos'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Magnésio glicinato',
        dosagem: '600mg',
        posologia: '1x ao dia (noite)',
        duracao: 'Uso contínuo',
        beneficio: 'Relaxamento muscular profundo, reduz espasmos'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '5000 UI',
        posologia: '1x ao dia',
        duracao: '3 meses (reavaliar)',
        beneficio: 'Saúde óssea e muscular; deficiência associada à lombalgia'
      },
      {
        nutriente: 'Ômega-3',
        dosagem: '3000mg',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Anti-inflamatório, reduz dor neuropática'
      },
      {
        nutriente: 'Colágeno tipo II',
        dosagem: '40mg',
        posologia: '1x ao dia (jejum)',
        duracao: '6 meses',
        beneficio: 'Saúde dos discos intervertebrais'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Rhus toxicodendron 30CH',
        indicacao: 'Lombalgia que melhora com movimento, piora ao iniciar',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Bryonia 30CH',
        indicacao: 'Dor lombar que piora com qualquer movimento',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Nux vomica 30CH',
        indicacao: 'Lombalgia após esforço, com espasmo',
        posologia: '5 glóbulos 3x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Alecrim',
        uso: 'Massagem lombar circular, relaxa musculatura',
        diluicao: '2% em óleo carreador'
      },
      {
        oleo: 'Gengibre',
        uso: 'Aquece a região, estimula circulação local',
        diluicao: '1% em óleo carreador'
      },
      {
        oleo: 'Pimenta negra',
        uso: 'Efeito aquecedor e analgésico',
        diluicao: '0.5% em óleo carreador'
      }
    ],
    orientacoesGerais: [
      '🔑 Fortalecer musculatura do core é essencial',
      'Fisioterapia coluna lombar',
      'Pilates clínico como tratamento de primeira linha',
      'Evitar cama por longos períodos (piora lombalgia)',
      'Posição fetal com travesseiro entre joelhos ao deitar',
      'Perda de peso reduz significativamente a carga lombar',
      'Evitar dobrar as costas ao levantar peso (dobrar os joelhos)',
      'Ergonomia no trabalho (cadeira, altura da mesa)',
      'Caminhada regular e natação são ideais'
    ]
  },

  'Dor nos joelhos': {
    nome: 'Gonalgia / Dor nos Joelhos',
    causas: [
      'Osteoartrite (desgaste cartilaginoso)',
      'Tendinite patelar',
      'Condromalácia patelar',
      'Sobrepeso e obesidade',
      'Lesão ligamentar (LCA, LCM)',
      'Meniscopatia',
      'Sedentarismo (fraqueza muscular periarticular)'
    ],
    fitoterapia: [
      {
        nome: 'Boswellia serrata',
        dosagem: '400mg',
        posologia: '3x ao dia',
        duracao: '8-16 semanas',
        observacoes: 'Evidência para osteoartrite, reduz dor e melhora função'
      },
      {
        nome: 'Harpagophytum procumbens',
        dosagem: '600mg',
        posologia: '2x ao dia',
        duracao: '8-12 semanas',
        observacoes: 'Anti-inflamatório, melhora mobilidade articular'
      },
      {
        nome: 'Curcuma longa',
        dosagem: '500mg',
        posologia: '3x ao dia',
        duracao: '8-12 semanas',
        observacoes: 'Associar piperina para absorção; anti-inflamatório potente'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Glucosamina + Condroitina',
        dosagem: '1500mg + 1200mg',
        posologia: '1x ao dia',
        duracao: '6-12 meses',
        beneficio: 'Regeneração da cartilagem e lubrificação articular'
      },
      {
        nutriente: 'MSM (Metilsulfonilmetano)',
        dosagem: '2000mg',
        posologia: '2x ao dia',
        duracao: '3-6 meses',
        beneficio: 'Anti-inflamatório, reduz dor e rigidez'
      },
      {
        nutriente: 'Colágeno tipo II não hidrolisado',
        dosagem: '40mg',
        posologia: '1x ao dia (jejum)',
        duracao: '6 meses',
        beneficio: 'Tolerância imunológica, regeneração cartilagem'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '2000-5000 UI',
        posologia: '1x ao dia',
        duracao: 'Uso contínuo',
        beneficio: 'Força muscular e saúde articular'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Arnica montana 6CH',
        indicacao: 'Trauma, contusão articular',
        posologia: '5 glóbulos 4x ao dia (agudo)'
      },
      {
        medicamento: 'Rhus toxicodendron 30CH',
        indicacao: 'Rigidez articular, melhora com calor e movimento',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Calcarea carbonica 30CH',
        indicacao: 'Desgaste articular, joelhos frios, sedentarismo',
        posologia: '5 glóbulos 2x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Gengibre',
        uso: 'Massagem circular no joelho, aquece e alivia dor',
        diluicao: '1-2% em óleo carreador'
      },
      {
        oleo: 'Camomila alemã',
        uso: 'Anti-inflamatório local, reduz inchaço',
        diluicao: '2% em gel ou óleo carreador'
      },
      {
        oleo: 'Alecrim',
        uso: 'Estimula circulação local',
        diluicao: '2-3% em óleo carreador'
      }
    ],
    orientacoesGerais: [
      '🔑 Fortalecer quadríceps e isquiotibiais reduz carga no joelho',
      'Perda de peso é tratamento fundamental na osteoartrite',
      'Fisioterapia e hidroterapia',
      'Evitar impacto excessivo (trocar corrida por caminhada e natação)',
      'Compressas de gelo em inflamações agudas',
      'Calor para rigidez crônica',
      'Joelheira de suporte durante atividade física',
      'Controle do ácido úrico (gota articular)'
    ]
  },

  'Dor muscular': {
    nome: 'Mialgia / Dor Muscular',
    causas: [
      'Excesso de exercício (DOMS)',
      'Deficiência de magnésio e vitamina D',
      'Tensão e estresse crônico',
      'Fibromialgia',
      'Hipotireoidismo',
      'Infecções virais',
      'Uso de estatinas (colesterol)'
    ],
    fitoterapia: [
      {
        nome: 'Valeriana officinalis',
        dosagem: '300-600mg',
        posologia: '2x ao dia',
        duracao: '4-8 semanas',
        observacoes: 'Relaxante muscular e ansiolítico natural'
      },
      {
        nome: 'Passiflora incarnata',
        dosagem: '300mg',
        posologia: '2-3x ao dia',
        duracao: '4-6 semanas',
        observacoes: 'Reduz tensão muscular associada ao estresse'
      },
      {
        nome: 'Gengibre (Zingiber officinale)',
        dosagem: '500mg',
        posologia: '2x ao dia',
        duracao: 'Conforme necessário',
        observacoes: 'Anti-inflamatório muscular, reduz DOMS'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Magnésio glicinato',
        dosagem: '600mg',
        posologia: '1x ao dia (noite)',
        duracao: 'Uso contínuo',
        beneficio: 'Relaxamento muscular, cofator de 300+ reações enzimáticas'
      },
      {
        nutriente: 'Vitamina D3',
        dosagem: '5000 UI',
        posologia: '1x ao dia',
        duracao: '3 meses',
        beneficio: 'Força muscular; deficiência causa mialgia difusa'
      },
      {
        nutriente: 'Vitamina B1 (Tiamina)',
        dosagem: '100mg',
        posologia: '1x ao dia',
        duracao: '3 meses',
        beneficio: 'Metabolismo energético muscular'
      },
      {
        nutriente: 'Coenzima Q10',
        dosagem: '200mg',
        posologia: '1x ao dia',
        duracao: '3-6 meses',
        beneficio: 'Energia mitocondrial muscular (especialmente se uso de estatinas)'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Arnica montana 6CH',
        indicacao: 'Dor muscular pós-esforço, contusão',
        posologia: '5 glóbulos 4x ao dia'
      },
      {
        medicamento: 'Rhus toxicodendron 30CH',
        indicacao: 'Dor muscular com rigidez, melhora com movimento',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Causticum 30CH',
        indicacao: 'Dor muscular crônica, fraqueza',
        posologia: '5 glóbulos 2x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Lavanda',
        uso: 'Massagem pós-exercício, relaxamento muscular',
        diluicao: '3-5% em óleo carreador'
      },
      {
        oleo: 'Alecrim',
        uso: 'Aquece e relaxa a musculatura antes do exercício',
        diluicao: '2-3% em óleo carreador'
      },
      {
        oleo: 'Eucalipto radiata',
        uso: 'Ação analgésica e relaxante muscular',
        diluicao: '2-3% em óleo carreador'
      }
    ],
    orientacoesGerais: [
      'Alongamento regular (antes e após exercícios)',
      'Progressão gradual na atividade física',
      'Hidratação adequada (2-3L de água/dia)',
      'Banho morno ou imersão em água fria após exercício intenso',
      'Verificar vitamina D, magnésio e hormônios tireoidianos',
      'Massoterapia regular',
      'Técnicas de relaxamento (yoga, meditação)',
      'Rolar em foam roller para liberação miofascial'
    ]
  },

  'Dor abdominal': {
    nome: 'Dor Abdominal / Cólica e Distensão',
    causas: [
      'Síndrome do Intestino Irritável (SII)',
      'Gases e distensão intestinal',
      'Disbiose intestinal',
      'Intolerâncias alimentares (lactose, glúten)',
      'Gastrite e úlcera péptica',
      'Estresse e ansiedade',
      'Constipação ou diarreia funcional'
    ],
    fitoterapia: [
      {
        nome: 'Erva-cidreira (Melissa officinalis)',
        dosagem: '300mg',
        posologia: '3x ao dia',
        duracao: '4-8 semanas',
        observacoes: 'Espasmolítico, reduz cólicas e ansiedade digestiva'
      },
      {
        nome: 'Camomila (Matricaria recutita)',
        dosagem: '400mg',
        posologia: '3x ao dia',
        duracao: '4-6 semanas',
        observacoes: 'Antiespásmódico, anti-inflamatório intestinal'
      },
      {
        nome: 'Hortelã-pimenta entérica (Mentha piperita)',
        dosagem: '0.2-0.4mL (cápsula entérica)',
        posologia: '2-3x ao dia (antes refeições)',
        duracao: '4-8 semanas',
        observacoes: 'Evidência para SII; reduz espasmos intestinais'
      }
    ],
    suplementacao: [
      {
        nutriente: 'Probióticos (multicepa)',
        dosagem: '10-50 bilhões UFC',
        posologia: '1x ao dia (em jejum)',
        duracao: '3-6 meses',
        beneficio: 'Reequilíbrio da microbiota, reduz disbiose e gases'
      },
      {
        nutriente: 'L-Glutamina',
        dosagem: '5g',
        posologia: '2x ao dia (jejum)',
        duracao: '2-3 meses',
        beneficio: 'Reparo da mucosa intestinal (intestino permeável)'
      },
      {
        nutriente: 'Enzimas digestivas',
        dosagem: 'Conforme produto',
        posologia: '1 cápsula antes das refeições principais',
        duracao: '2-3 meses',
        beneficio: 'Digestão eficiente, reduz gases e distensão'
      },
      {
        nutriente: 'Zinco',
        dosagem: '30mg',
        posologia: '1x ao dia (com refeição)',
        duracao: '3 meses',
        beneficio: 'Reparo da barreira intestinal'
      }
    ],
    homeopatia: [
      {
        medicamento: 'Nux vomica 30CH',
        indicacao: 'Cólica por excesso alimentar, constipação com tenesmo',
        posologia: '5 glóbulos 3x ao dia'
      },
      {
        medicamento: 'Colocynthis 30CH',
        indicacao: 'Cólica intensa, em cãibra, melhora com pressão',
        posologia: '5 glóbulos a cada 30 min (agudo)'
      },
      {
        medicamento: 'Carbo vegetabilis 30CH',
        indicacao: 'Gases, distensão abdominal, digestão lenta',
        posologia: '5 glóbulos 3x ao dia'
      }
    ],
    aromaterapia: [
      {
        oleo: 'Camomila romana',
        uso: 'Massagem abdominal em círculos, antiespásmódico',
        diluicao: '2% em óleo carreador'
      },
      {
        oleo: 'Hortelã-pimenta',
        uso: 'Massagem abdominal, reduz gases e cólicas',
        diluicao: '1% em óleo carreador (evitar em bebês)'
      },
      {
        oleo: 'Erva-cidreira',
        uso: 'Relaxamento do trato digestivo',
        diluicao: '2-3% em óleo carreador ou difusor'
      }
    ],
    orientacoesGerais: [
      '🔑 Diário alimentar para identificar intolerâncias',
      'Eliminar lactose e glúten por 4 semanas (protocolo de exclusão)',
      'Aumentar fibras solúveis (aveia, chia, psyllium)',
      'Reduzir alimentos fermentáveis (FODMAP)',
      'Comer devagar, mastigar bem (25-30 vezes)',
      'Técnicas de relaxamento (estresse agrava SII)',
      'Evitar adoçantes artificiais (sorbitol, manitol)',
      'Aquecer a barriga com bolsa de água quente durante cólicas',
      'Investigar H. pylori se dor epigástrica frequente'
    ]
  }
};
