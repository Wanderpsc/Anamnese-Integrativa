/**
 * Base de Dados de Aromaterapia
 * Óleos essenciais terapêuticos por condição
 */

export const AROMATHERAPY_DATABASE = {
  // Ansiedade e Estresse
  anxiety: {
    title: 'Ansiedade e Estresse',
    oils: [
      {
        name: 'Lavanda (Lavandula angustifolia)',
        properties: 'Calmante, ansiolítico, indutor do sono',
        uses: [
          'Difusor: 5-7 gotas em ambiente fechado',
          'Banho: 8-10 gotas em água morna',
          'Massagem: 3% em óleo carreador (coco, amêndoas)',
          'Travesseiro: 2-3 gotas antes de dormir'
        ],
        contraindications: 'Evitar nos primeiros 3 meses de gravidez',
        synergy: ['Bergamota', 'Camomila Romana', 'Ylang Ylang']
      },
      {
        name: 'Bergamota (Citrus bergamia)',
        properties: 'Antidepressivo, ansiolítico, equilibrante emocional',
        uses: [
          'Difusor: 4-6 gotas',
          'Inalação: 2 gotas em lenço',
          'Massagem: 2-3% em óleo base'
        ],
        contraindications: 'Fotossensibilizante - não expor ao sol após uso tópico',
        synergy: ['Lavanda', 'Gerânio', 'Frankincense']
      },
      {
        name: 'Ylang Ylang (Cananga odorata)',
        properties: 'Sedativo, redutor de pressão arterial, afrodisíaco',
        uses: [
          'Difusor: 3-5 gotas (aroma forte)',
          'Banho: 5-6 gotas',
          'Perfume natural: 1 gota no pulso'
        ],
        contraindications: 'Evitar em hipotensão severa',
        synergy: ['Lavanda', 'Patchouli', 'Sândalo']
      },
      {
        name: 'Camomila Romana (Anthemis nobilis)',
        properties: 'Calmante profundo, anti-inflamatório, digestivo',
        uses: [
          'Difusor: 4-6 gotas',
          'Compressa: 3-4 gotas em água morna',
          'Massagem abdominal: 2% em óleo base'
        ],
        contraindications: 'Seguro para crianças e gestantes (diluído)',
        synergy: ['Lavanda', 'Bergamota', 'Neroli']
      }
    ]
  },

  // Sono e Insônia
  sleep: {
    title: 'Distúrbios do Sono',
    oils: [
      {
        name: 'Lavanda (Lavandula angustifolia)',
        properties: 'Indutor do sono, relaxante profundo',
        uses: [
          'Travesseiro: 3-4 gotas',
          'Difusor noturno: 6-8 gotas',
          'Banho antes de dormir: 10 gotas'
        ],
        contraindications: 'Nenhuma significativa',
        synergy: ['Vetiver', 'Cedro', 'Camomila']
      },
      {
        name: 'Vetiver (Vetiveria zizanioides)',
        properties: 'Sedativo profundo, enraizador, anti-ansiedade',
        uses: [
          'Difusor: 3-5 gotas (aroma terroso)',
          'Massagem nos pés: 2% em óleo base',
          'Inalação: 1-2 gotas em lenço'
        ],
        contraindications: 'Seguro',
        synergy: ['Lavanda', 'Sândalo', 'Frankincense']
      },
      {
        name: 'Cedro do Atlas (Cedrus atlantica)',
        properties: 'Sedativo, respiratório, meditativo',
        uses: [
          'Difusor: 5-7 gotas',
          'Inalação: 2 gotas',
          'Massagem: 2-3% em óleo base'
        ],
        contraindications: 'Evitar na gravidez',
        synergy: ['Lavanda', 'Vetiver', 'Junípero']
      }
    ]
  },

  // Dor e Inflamação
  pain: {
    title: 'Dor e Inflamação',
    oils: [
      {
        name: 'Hortelã-Pimenta (Mentha piperita)',
        properties: 'Analgésico, anti-inflamatório, refrescante',
        uses: [
          'Massagem local: 2-3% em óleo base',
          'Compressa fria: 3-4 gotas em água gelada',
          'Têmporas (cefaleia): 1 gota diluída'
        ],
        contraindications: 'Não usar em bebês e crianças < 6 anos, gestantes',
        synergy: ['Lavanda', 'Eucalipto', 'Alecrim']
      },
      {
        name: 'Wintergreen (Gaultheria procumbens)',
        properties: 'Analgésico potente (95% salicilato de metila)',
        uses: [
          'Massagem tópica: 1-2% em óleo base',
          'Compressa: 2-3 gotas'
        ],
        contraindications: 'NÃO usar em crianças, gestantes. Evitar com anticoagulantes',
        synergy: ['Cipreste', 'Gengibre', 'Cravo']
      },
      {
        name: 'Alecrim (Rosmarinus officinalis)',
        properties: 'Analgésico, circulatório, estimulante',
        uses: [
          'Massagem muscular: 3% em óleo base',
          'Banho: 8 gotas',
          'Compressa quente: 4 gotas'
        ],
        contraindications: 'Evitar em epilepsia e hipertensão severa',
        synergy: ['Hortelã', 'Lavanda', 'Eucalipto']
      },
      {
        name: 'Gengibre (Zingiber officinale)',
        properties: 'Aquecedor, anti-inflamatório, digestivo',
        uses: [
          'Massagem articular: 2% em óleo base',
          'Compressa quente: 3 gotas',
          'Banho: 6 gotas'
        ],
        contraindications: 'Pode irritar pele sensível - diluir bem',
        synergy: ['Alecrim', 'Laranja Doce', 'Cipreste']
      }
    ]
  },

  // Sistema Respiratório
  respiratory: {
    title: 'Sistema Respiratório',
    oils: [
      {
        name: 'Eucalipto Globulus (Eucalyptus globulus)',
        properties: 'Expectorante, descongestionante, antiviral',
        uses: [
          'Inalação a vapor: 4-5 gotas',
          'Difusor: 5-7 gotas',
          'Massagem no peito: 3% em óleo base'
        ],
        contraindications: 'Não usar em crianças < 6 anos, asmáticos (com cautela)',
        synergy: ['Hortelã-Pimenta', 'Tea Tree', 'Ravensara']
      },
      {
        name: 'Tea Tree (Melaleuca alternifolia)',
        properties: 'Antibacteriano, antiviral, antifúngico',
        uses: [
          'Difusor: 5-7 gotas',
          'Inalação: 3-4 gotas em vapor',
          'Massagem: 2-3% em óleo base'
        ],
        contraindications: 'Pode irritar pele sensível - testar antes',
        synergy: ['Eucalipto', 'Lavanda', 'Limão']
      },
      {
        name: 'Ravensara (Ravensara aromatica)',
        properties: 'Antiviral potente, expectorante, imunoestimulante',
        uses: [
          'Difusor: 4-6 gotas',
          'Massagem no peito: 3% em óleo base',
          'Inalação: 2-3 gotas'
        ],
        contraindications: 'Seguro (óleo suave)',
        synergy: ['Eucalipto', 'Tea Tree', 'Ravintsara']
      },
      {
        name: 'Pinheiro Silvestre (Pinus sylvestris)',
        properties: 'Expectorante, revigorante, purificador de ar',
        uses: [
          'Difusor: 6-8 gotas',
          'Inalação: 3 gotas',
          'Sauna: 5 gotas'
        ],
        contraindications: 'Evitar em hipertensão severa',
        synergy: ['Eucalipto', 'Cipreste', 'Cedro']
      }
    ]
  },

  // Digestivo
  digestive: {
    title: 'Sistema Digestivo',
    oils: [
      {
        name: 'Hortelã-Pimenta (Mentha piperita)',
        properties: 'Antiespasmódico, carminativo, digestivo',
        uses: [
          'Massagem abdominal: 2% em óleo base (sentido horário)',
          'Inalação: 1-2 gotas',
          'Ingestão: 1 gota em mel (somente óleo alimentício)'
        ],
        contraindications: 'Não usar em refluxo gastroesofágico severo',
        synergy: ['Gengibre', 'Funcho', 'Cardamomo']
      },
      {
        name: 'Gengibre (Zingiber officinale)',
        properties: 'Antiemético, digestivo, aquecedor',
        uses: [
          'Massagem abdominal: 2% em óleo base',
          'Inalação para náusea: 1-2 gotas',
          'Compressa quente: 3 gotas'
        ],
        contraindications: 'Diluir bem - pode irritar pele',
        synergy: ['Hortelã', 'Limão', 'Cardamomo']
      },
      {
        name: 'Funcho Doce (Foeniculum vulgare dulce)',
        properties: 'Carminativo, digestivo, estrogênico',
        uses: [
          'Massagem abdominal: 2% em óleo base',
          'Inalação: 2 gotas',
          'Compressa: 3 gotas'
        ],
        contraindications: 'Evitar em gravidez, epilepsia, câncer hormônio-dependente',
        synergy: ['Cardamomo', 'Coentro', 'Camomila']
      },
      {
        name: 'Cardamomo (Elettaria cardamomum)',
        properties: 'Digestivo, carminativo, estimulante suave',
        uses: [
          'Massagem abdominal: 2-3% em óleo base',
          'Difusor: 4-5 gotas',
          'Inalação: 1-2 gotas'
        ],
        contraindications: 'Seguro',
        synergy: ['Gengibre', 'Laranja', 'Hortelã']
      }
    ]
  },

  // Imunidade
  immunity: {
    title: 'Sistema Imunológico',
    oils: [
      {
        name: 'Orégano (Origanum vulgare)',
        properties: 'Antibacteriano potente, antiviral, antifúngico',
        uses: [
          'Difusor: 2-3 gotas (aroma forte)',
          'Massagem nos pés: 1% em óleo base',
          'Inalação: 1 gota'
        ],
        contraindications: 'MUITO FORTE - diluir sempre. Evitar na gravidez',
        synergy: ['Tea Tree', 'Tomilho', 'Limão']
      },
      {
        name: 'Ravintsara (Cinnamomum camphora)',
        properties: 'Antiviral excepcional, imunoestimulante, expectorante',
        uses: [
          'Difusor: 5-7 gotas',
          'Massagem no peito: 3% em óleo base',
          'Inalação: 3 gotas'
        ],
        contraindications: 'Seguro - excelente para crianças (diluído)',
        synergy: ['Eucalipto Radiata', 'Tea Tree', 'Lavanda']
      },
      {
        name: 'Limão (Citrus limon)',
        properties: 'Purificador, antiséptico, estimulante imune',
        uses: [
          'Difusor: 6-8 gotas',
          'Limpeza de ambiente: 10 gotas em água',
          'Inalação: 2 gotas'
        ],
        contraindications: 'Fotossensibilizante - não expor ao sol após uso',
        synergy: ['Tea Tree', 'Eucalipto', 'Ravensara']
      },
      {
        name: 'Tomilho Linalol (Thymus vulgaris ct linalool)',
        properties: 'Antibacteriano, antiviral, imunoestimulante suave',
        uses: [
          'Difusor: 4-5 gotas',
          'Massagem: 2-3% em óleo base',
          'Inalação: 2 gotas'
        ],
        contraindications: 'Quimiotipo Linalol é suave - seguro',
        synergy: ['Ravintsara', 'Lavanda', 'Tea Tree']
      }
    ]
  },

  // Pele
  skin: {
    title: 'Cuidados com a Pele',
    oils: [
      {
        name: 'Tea Tree (Melaleuca alternifolia)',
        properties: 'Antibacteriano, antifúngico, cicatrizante',
        uses: [
          'Acne: 1 gota pura em espinha',
          'Loção facial: 1% em base neutra',
          'Micoses: 2% em óleo base'
        ],
        contraindications: 'Testar em pequena área primeiro',
        synergy: ['Lavanda', 'Gerânio', 'Palmarosa']
      },
      {
        name: 'Lavanda (Lavandula angustifolia)',
        properties: 'Cicatrizante, regenerador, calmante',
        uses: [
          'Queimaduras leves: 1-2 gotas puras',
          'Creme facial: 1-2% em base',
          'Banho: 10 gotas'
        ],
        contraindications: 'Seguro - um dos poucos que pode usar puro',
        synergy: ['Tea Tree', 'Frankincense', 'Gerânio']
      },
      {
        name: 'Frankincense (Boswellia carterii)',
        properties: 'Regenerador celular, anti-rugas, cicatrizante',
        uses: [
          'Sérum anti-idade: 2-3% em óleo de rosa mosqueta',
          'Massagem facial: 1-2% em óleo base',
          'Cicatrizes: 3% em gel de aloe vera'
        ],
        contraindications: 'Seguro',
        synergy: ['Lavanda', 'Gerânio', 'Mirra']
      },
      {
        name: 'Gerânio (Pelargonium graveolens)',
        properties: 'Equilibrante, cicatrizante, tonificante',
        uses: [
          'Pele mista: 1-2% em creme base',
          'Tônico facial: 5 gotas em 100ml água floral',
          'Massagem: 2% em óleo base'
        ],
        contraindications: 'Seguro',
        synergy: ['Lavanda', 'Frankincense', 'Ylang Ylang']
      }
    ]
  },

  // Foco e Concentração
  focus: {
    title: 'Foco e Concentração',
    oils: [
      {
        name: 'Alecrim (Rosmarinus officinalis)',
        properties: 'Estimulante mental, memória, concentração',
        uses: [
          'Difusor durante estudo: 5-7 gotas',
          'Inalação: 2 gotas',
          'Massagem têmporas: 1 gota diluída'
        ],
        contraindications: 'Evitar à noite (estimulante)',
        synergy: ['Hortelã-Pimenta', 'Limão', 'Basílico']
      },
      {
        name: 'Hortelã-Pimenta (Mentha piperita)',
        properties: 'Estimulante mental, clareza, alerta',
        uses: [
          'Difusor: 4-6 gotas',
          'Inalação direta: 1-2 gotas',
          'Massagem nuca: 2% em óleo base'
        ],
        contraindications: 'Evitar à noite',
        synergy: ['Alecrim', 'Limão', 'Eucalipto']
      },
      {
        name: 'Limão (Citrus limon)',
        properties: 'Clareza mental, purificador, energizante',
        uses: [
          'Difusor: 6-8 gotas',
          'Inalação: 2 gotas',
          'Ambientação: 10 gotas em água'
        ],
        contraindications: 'Fotossensibilizante',
        synergy: ['Alecrim', 'Hortelã', 'Basílico']
      },
      {
        name: 'Basílico Sagrado (Ocimum sanctum)',
        properties: 'Clareza mental, adaptógeno, anti-fadiga',
        uses: [
          'Difusor: 4-5 gotas',
          'Inalação: 2 gotas',
          'Massagem: 2% em óleo base'
        ],
        contraindications: 'Evitar na gravidez',
        synergy: ['Alecrim', 'Limão', 'Frankincense']
      }
    ]
  },

  // === CATEGORIAS EXPANDIDAS ===
  
  // Dores de Cabeça
  headache: {
    title: 'Dor de Cabeça e Enxaqueca',
    oils: [
      {
        name: 'Hortelã-Pimenta',
        properties: 'Analgésico, refrescante',
        uses: ['Têmporas: 1 gota diluída', 'Inalação: 2 gotas'],
        contraindications: 'Não próximo aos olhos',
        synergy: ['Lavanda', 'Eucalipto']
      }
    ]
  },
  
  // Digestão
  digestive: {
    title: 'Problemas Digestivos',
    oils: [
      {
        name: 'Gengibre',
        properties: 'Anti-náusea, digestivo',
        uses: ['Massagem abdômen: 2%', 'Difusor: 3 gotas'],
        contraindications: 'Pele sensível',
        synergy: ['Hortelã', 'Limão']
      }
    ]
  },
  
  // Imunidade
  immunity: {
    title: 'Fortalecer Imunidade',
    oils: [
      {
        name: 'Tea Tree',
        properties: 'Antiviral, antibacteriano',
        uses: ['Difusor: 5-8 gotas', 'Massagem peito: 2%'],
        contraindications: 'Seguro',
        synergy: ['Eucalipto', 'Limão']
      }
    ]
  },
  
  // Pele
  skin: {
    title: 'Problemas de Pele',
    oils: [
      {
        name: 'Tea Tree',
        properties: 'Antibacteriano, cicatrizante',
        uses: ['Acne: 1 gota direto', 'Diluído 2% para áreas maiores'],
        contraindications: 'Pode ressecar',
        synergy: ['Lavanda', 'Frankincense']
      }
    ]
  },
  
  // Hormonal
  hormonal: {
    title: 'Equilíbrio Hormonal - TPM',
    oils: [
      {
        name: 'Sálvia Esclareia',
        properties: 'Regulador hormonal',
        uses: ['Massagem abdômen: 3%', 'Difusor: 4-6 gotas'],
        contraindications: 'Gravidez',
        synergy: ['Gerânio', 'Lavanda']
      }
    ]
  },
  
  // Circulação
  circulation: {
    title: 'Circulação e Varizes',
    oils: [
      {
        name: 'Cipreste',
        properties: 'Vasoconstritor, circulatório',
        uses: ['Massagem pernas: 2-3% (baixo→cima)', 'Banho pés: 6 gotas'],
        contraindications: 'Seguro',
        synergy: ['Alecrim', 'Gengibre']
      }
    ]
  },
  
  // Articulações
  joints: {
    title: 'Artrite e Articulações',
    oils: [
      {
        name: 'Frankincense',
        properties: 'Anti-inflamatório potente',
        uses: ['Massagem articular: 3-5%', 'Compressa: 4 gotas'],
        contraindications: 'Seguro',
        synergy: ['Gengibre', 'Alecrim']
      }
    ]
  },
  
  // Foco
  focus: {
    title: 'Foco e Concentração',
    oils: [
      {
        name: 'Alecrim',
        properties: 'Estimulante mental, memória',
        uses: ['Difusor durante estudo: 4-6 gotas', 'Inalação: 2 gotas'],
        contraindications: 'Evitar à noite',
        synergy: ['Limão', 'Hortelã']
      }
    ]
  },
  
  // Detox
  detox: {
    title: 'Detoxificação',
    oils: [
      {
        name: 'Limão',
        properties: 'Depurativo, diurético',
        uses: ['Difusor: 6-8 gotas', 'Massagem abdômen: 2%'],
        contraindications: 'Fotossensível',
        synergy: ['Junípero', 'Grapefruit']
      }
    ]
  }
};

/**
 * Métodos de aplicação de óleos essenciais
 */
export const APPLICATION_METHODS = {
  diffusion: {
    title: 'Difusão Aromática',
    description: 'Dispersão no ar através de difusor',
    instructions: [
      'Usar difusor ultrassônico ou nebulizador',
      'Adicionar 5-10 gotas de óleo essencial',
      'Difundir por 30-60 minutos',
      'Fazer pausas de 30 minutos',
      'Manter ambiente ventilado'
    ]
  },
  topical: {
    title: 'Aplicação Tópica',
    description: 'Aplicação direta na pele (sempre diluído)',
    instructions: [
      'SEMPRE diluir em óleo carreador (exceto lavanda e tea tree)',
      'Diluições seguras: 1-3% para adultos (6-18 gotas por 30ml)',
      '0.5-1% para crianças e idosos',
      'Fazer teste de patch antes',
      'Evitar mucosas e olhos'
    ],
    carriers: [
      'Óleo de coco fracionado',
      'Óleo de amêndoas doces',
      'Óleo de jojoba',
      'Óleo de semente de uva',
      'Manteiga de karité'
    ]
  },
  inhalation: {
    title: 'Inalação',
    description: 'Aspiração direta dos vapores',
    methods: [
      'Inalação direta do frasco (1-2 vezes)',
      'Inalação em lenço (2-3 gotas)',
      'Inalação a vapor (4-5 gotas em água quente)',
      'Inalador pessoal (stick inalador)'
    ]
  },
  bath: {
    title: 'Banho Aromático',
    description: 'Óleos essenciais na água do banho',
    instructions: [
      'Adicionar 8-12 gotas de OE em 1 colher de sopa de dispersante',
      'Dispersantes: leite, mel, sal do Himalaia, óleo vegetal',
      'Misturar bem antes de entrar na banheira',
      'Banho morno (não muito quente)',
      'Relaxar por 15-20 minutos'
    ]
  }
};

/**
 * Segurança e contraindicações gerais
 */
export const SAFETY_GUIDELINES = {
  general: [
    'NUNCA ingerir óleos essenciais sem orientação profissional',
    'Sempre diluir antes de aplicar na pele (exceto lavanda e tea tree)',
    'Fazer teste de sensibilidade antes do primeiro uso',
    'Manter longe dos olhos e mucosas',
    'Armazenar em local fresco, escuro e fora do alcance de crianças',
    'Usar frascos de vidro âmbar',
    'Validade: 2-5 anos (cítricos duram menos)'
  ],
  pregnancy: [
    'Evitar no primeiro trimestre',
    'Seguros após 12 semanas: Lavanda, Camomila Romana, Ylang Ylang (diluídos)',
    'EVITAR: Alecrim, Sálvia, Cedro, Funcho, Tomilho, Canela, Cravo'
  ],
  children: [
    'Bebês 0-3 meses: Apenas Lavanda (ultra diluída 0.25%)',
    'Crianças 3-24 meses: Lavanda, Camomila (0.5%)',
    'Crianças 2-6 anos: Adicionar Tea Tree, Frankincense (1%)',
    'Crianças 6+: Maioria dos óleos (1-2%)',
    'NUNCA: Hortelã-Pimenta < 6 anos, Eucalipto < 10 anos'
  ],
  photosensitivity: [
    'Não expor pele ao sol por 12-24h após uso de:',
    'Bergamota, Limão, Lima, Toranja, Laranja amarga',
    'Podem causar queimaduras e manchas'
  ],
  medical_conditions: [
    'Epilepsia: Evitar Alecrim, Funcho, Sálvia',
    'Hipertensão: Evitar Alecrim, Tomilho',
    'Anticoagulantes: Evitar Wintergreen, Cravo',
    'Sempre consultar profissional de saúde em caso de condições médicas graves'
  ]
};

/**
 * Busca óleos por condição
 */
export function getEssentialOils(condition) {
  return AROMATHERAPY_DATABASE[condition] || null;
}

/**
 * Busca óleo específico por nome OU condição de saúde
 * Busca melhorada para encontrar por sintomas/problemas - PRIORIZA EXATAS
 */
export function searchOil(searchTerm) {
  if (!searchTerm || searchTerm.trim().length === 0) return null;
  
  const term = searchTerm.toLowerCase().trim();
  
  // 1. BUSCA EXATA por chave da categoria
  if (AROMATHERAPY_DATABASE[term]) {
    const cat = AROMATHERAPY_DATABASE[term];
    return {
      oils: cat.oils,
      category: cat.title
    };
  }
  
  // 2. BUSCA EXATA por título
  for (const category in AROMATHERAPY_DATABASE) {
    const cat = AROMATHERAPY_DATABASE[category];
    if (cat.title && cat.title.toLowerCase() === term) {
      return {
        oils: cat.oils,
        category: cat.title
      };
    }
  }
  
  // 3. Busca CONTÉM no título da categoria
  for (const category in AROMATHERAPY_DATABASE) {
    const cat = AROMATHERAPY_DATABASE[category];
    if (cat.title && (cat.title.toLowerCase().includes(term) || term.includes(cat.title.toLowerCase()))) {
      return {
        oils: cat.oils,
        category: cat.title
      };
    }
  }
  
  // 4. Verificar se o termo aparece nas propriedades ou usos dos óleos
  for (const category in AROMATHERAPY_DATABASE) {
    const cat = AROMATHERAPY_DATABASE[category];
    const matchingOils = cat.oils.filter(oil => 
      oil.properties?.toLowerCase().includes(term) ||
      oil.name.toLowerCase().includes(term) ||
      (Array.isArray(oil.uses) && oil.uses.some(use => use.toLowerCase().includes(term)))
    );
    
    if (matchingOils.length > 0) {
      return {
        oils: matchingOils,
        category: cat.title
      };
    }
  }
  
  // 5. Buscar por nome do óleo
  for (const category in AROMATHERAPY_DATABASE) {
    const oils = AROMATHERAPY_DATABASE[category].oils;
    const found = oils.find(oil => 
      oil.name.toLowerCase().includes(term)
    );
    if (found) {
      return {
        oils: [found],
        category: AROMATHERAPY_DATABASE[category].title
      };
    }
  }
  
  // 6. Busca parcial por palavras-chave (última opção)
  const keywords = term.split(' ').filter(w => w.length > 3);
  
  for (const category in AROMATHERAPY_DATABASE) {
    const cat = AROMATHERAPY_DATABASE[category];
    const titleWords = cat.title?.toLowerCase().split(' ') || [];
    
    const matchCount = keywords.filter(kw => 
      titleWords.some(tw => tw.includes(kw) || kw.includes(tw))
    ).length;
    
    if (matchCount >= Math.ceil(keywords.length * 0.7) && matchCount > 0) {
      return {
        oils: cat.oils,
        category: cat.title
      };
    }
  }
  
  return null;
}

/**
 * Criar blend personalizado
 */
export function createBlend(oils = [], purpose = '') {
  return {
    purpose,
    ingredients: oils,
    instructions: 'Misturar em frasco de vidro âmbar. Agitar antes de usar.',
    totalDrops: oils.reduce((sum, oil) => sum + (oil.drops || 0), 0)
  };
}

export default AROMATHERAPY_DATABASE;
