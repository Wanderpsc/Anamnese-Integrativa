export const createDefaultUrocultureData = () => ({
  selectedAgent: '',
  colonyCount: '',
  material: 'Urina 2º jato',
  susceptibility: {}
});

export const UROCULTURE_STATUS_OPTIONS = [
  { value: 'S', label: 'Sensível' },
  { value: 'I', label: 'Intermediário' },
  { value: 'R', label: 'Resistente' }
];

export const UROCULTURE_PATHOGENS = {
  escherichiaColi: {
    nome: 'Escherichia coli',
    tipo: 'Bactéria Gram-negativa',
    causas: [
      'Principal agente de cistite comunitária',
      'Ascensão da flora intestinal para o trato urinário',
      'Relação com higiene íntima inadequada e atividade sexual'
    ],
    manifestacoes: [
      'Disúria, urgência urinária e polaciúria',
      'Dor suprapúbica',
      'Odor urinário alterado'
    ],
    riscos: [
      'Pielonefrite quando há progressão ascendente',
      'Recorrência de ITU',
      'Risco gestacional quando não tratada'
    ],
    observacoesIntegrativas: [
      'Avaliar barreira intestinal e disbiose',
      'Reforçar hidratação e rotina miccional',
      'Investigar gatilhos alimentares inflamatórios'
    ],
    protocoloIntegrativo: [
      'Hidratação 30-35 mL/kg/dia',
      'D-manose 1,5 a 2 g 2x/dia (adjuvante)',
      'Cranberry padronizado em PACs (adjuvante)',
      'Vitamina C em dose fracionada conforme tolerância'
    ],
    referenciasIntegrativas: [
      'Medicina Funcional Integrativa aplicada ao trato urinário',
      'Estratégias de modulação da microbiota urogenital',
      'Abordagem de prevenção de ITU recorrente com suporte nutricional'
    ]
  },
  staphylococcusSaprophyticus: {
    nome: 'Staphylococcus saprophyticus',
    tipo: 'Bactéria Gram-positiva',
    causas: [
      'ITU em mulheres jovens sexualmente ativas',
      'Colonização perineal com ascensão uretral',
      'Menor frequência que E. coli, porém relevante'
    ],
    manifestacoes: [
      'Cistite com ardor urinário e frequência elevada',
      'Dor pélvica e desconforto urinário',
      'Nitrito pode ser negativo em parte dos casos'
    ],
    riscos: [
      'Persistência dos sintomas quando há resistência antimicrobiana',
      'Recidiva de cistite',
      'Complicações em imunossuprimidos'
    ],
    observacoesIntegrativas: [
      'Suporte da microbiota vaginal e intestinal após antibiótico',
      'Controle de fatores pró-inflamatórios alimentares',
      'Atenção ao estresse crônico e sono'
    ],
    protocoloIntegrativo: [
      'Hidratação adequada e esvaziamento vesical frequente',
      'Probióticos com Lactobacillus (adjuvante)',
      'D-manose e cranberry como suporte preventivo',
      'Redução de açúcares simples durante fase aguda'
    ],
    referenciasIntegrativas: [
      'Abordagem funcional para infecções urinárias de repetição',
      'Modulação de microbiota urogenital no pós-antibiótico'
    ]
  },
  klebsiellaPneumoniae: {
    nome: 'Klebsiella pneumoniae',
    tipo: 'Bactéria Gram-negativa',
    causas: [
      'Infecção urinária associada a biofilme',
      'Maior frequência em ambiente hospitalar',
      'Risco aumentado de multirresistência'
    ],
    manifestacoes: [
      'Sintomas urinários intensos e persistentes',
      'Urina turva e odor forte',
      'Pode cursar com febre em infecção alta'
    ],
    riscos: [
      'Resistência antimicrobiana ampla (ESBL/carbapenemase)',
      'Pielonefrite e bacteremia',
      'Quadros de difícil erradicação'
    ],
    observacoesIntegrativas: [
      'Monitorar inflamação sistêmica',
      'Reforçar estratégia anti-biofilme adjuvante',
      'Recuperar ecossistema intestinal após terapia'
    ],
    protocoloIntegrativo: [
      'Suporte nutricional anti-inflamatório',
      'Probióticos de alta potência no pós-antibiótico',
      'Avaliar zinco e vitamina D para suporte imune'
    ],
    referenciasIntegrativas: [
      'Estratégias funcionais para infecções com biofilme',
      'Suporte de microbiota em uso de antibióticos de amplo espectro'
    ]
  },
  proteusMirabilis: {
    nome: 'Proteus mirabilis',
    tipo: 'Bactéria Gram-negativa',
    causas: [
      'Infecção urinária associada a urease',
      'Alcalinização urinária e formação de cálculos',
      'Maior incidência com cateterismo'
    ],
    manifestacoes: [
      'Disúria e urgência urinária',
      'pH urinário elevado',
      'Dor lombar quando há comprometimento alto'
    ],
    riscos: [
      'Cálculos de estruvita',
      'Recorrência por persistência de foco litiásico',
      'Complicações renais'
    ],
    observacoesIntegrativas: [
      'Monitorar pH urinário e cristalúria',
      'Ajustar hidratação e minerais',
      'Suporte anti-inflamatório adjuvante'
    ],
    protocoloIntegrativo: [
      'Hidratação e acompanhamento de pH urinário',
      'Suporte de magnésio/citrato conforme contexto clínico',
      'Probióticos no pós-antibiótico'
    ],
    referenciasIntegrativas: [
      'Medicina integrativa em ITU associada a litíase',
      'Suporte nutricional na prevenção de recorrência'
    ]
  },
  enterococcusFaecalis: {
    nome: 'Enterococcus faecalis',
    tipo: 'Bactéria Gram-positiva',
    causas: [
      'Agente frequente em ITU complicada',
      'Relacionada a instrumentação urinária',
      'Pode apresentar resistência relevante'
    ],
    manifestacoes: [
      'Sintomas urinários persistentes',
      'Maior risco em idosos e comorbidades',
      'Pode coexistir com bacteriúria polimicrobiana'
    ],
    riscos: [
      'Endocardite em casos selecionados',
      'Recorrência e persistência de foco',
      'Desbalanço intestinal pós-terapia'
    ],
    observacoesIntegrativas: [
      'Atenção à disbiose intestinal prévia',
      'Reabilitação intestinal prolongada no pós-antibiótico',
      'Suporte imunonutricional'
    ],
    protocoloIntegrativo: [
      'Probióticos multicepas por 8-12 semanas',
      'Fibras prebióticas graduais',
      'Padrão alimentar anti-inflamatório'
    ],
    referenciasIntegrativas: [
      'Estratégias de restauração intestinal pós-antibiótico',
      'Suporte funcional em infecções urinárias complicadas'
    ]
  },
  pseudomonasAeruginosa: {
    nome: 'Pseudomonas aeruginosa',
    tipo: 'Bactéria Gram-negativa oportunista',
    causas: [
      'Associada a ambiente hospitalar e cateter',
      'Alta capacidade de biofilme',
      'Resistência intrínseca a múltiplos antibióticos'
    ],
    manifestacoes: [
      'ITU complexa e de difícil resposta',
      'Sintomas persistentes mesmo após tratamento inicial',
      'Possível febre e comprometimento sistêmico'
    ],
    riscos: [
      'Sepse em pacientes frágeis',
      'Recorrência por persistência de biofilme',
      'Limitação terapêutica por resistência'
    ],
    observacoesIntegrativas: [
      'Alta vigilância clínica',
      'Suporte anti-inflamatório e antioxidante',
      'Restauração de microbiota após antibiótico de amplo espectro'
    ],
    protocoloIntegrativo: [
      'Hidratação e monitoramento clínico estreito',
      'Probióticos de alta potência pós-terapia',
      'Ajuste nutricional para recuperação imunometabólica'
    ],
    referenciasIntegrativas: [
      'Abordagem integrativa em infecção por patógeno oportunista',
      'Suporte sistêmico durante antibiótico de amplo espectro'
    ]
  },
  candidaSpp: {
    nome: 'Candida spp.',
    tipo: 'Fungo (levedura)',
    causas: [
      'Disbiose por uso repetido de antibióticos',
      'Hiperglicemia e imunossupressão',
      'Ambiente urogenital favorável à proliferação'
    ],
    manifestacoes: [
      'Disúria e irritação urinária',
      'Prurido genital associado',
      'Recorrência em terreno disbiótico'
    ],
    riscos: [
      'Candidíase de repetição',
      'Persistência de sintomas com tratamento inadequado',
      'Piora da barreira mucosa'
    ],
    observacoesIntegrativas: [
      'Controle de carga glicêmica dietética',
      'Reequilíbrio de microbiota intestinal e vaginal',
      'Redução de fatores pró-inflamatórios'
    ],
    protocoloIntegrativo: [
      'Probióticos com Lactobacillus + Saccharomyces boulardii',
      'Estratégia alimentar antifúngica individualizada',
      'Suporte de zinco e vitamina D quando indicado'
    ],
    referenciasIntegrativas: [
      'Modulação de microbiota em candidíase recorrente',
      'Estratégias funcionais de terreno metabólico para fungos'
    ]
  },
  adenovirusUrogenital: {
    nome: 'Adenovírus urogenital',
    tipo: 'Vírus',
    causas: [
      'Mais comum em cistite hemorrágica viral',
      'Maior prevalência em imunossuprimidos',
      'Transmissão por contato e reativação viral'
    ],
    manifestacoes: [
      'Disúria intensa',
      'Hematúria',
      'Sintomas urinários sem bacteriúria clássica'
    ],
    riscos: [
      'Comprometimento urinário prolongado',
      'Maior gravidade em imunossuprimidos',
      'Necessidade de investigação diferencial'
    ],
    observacoesIntegrativas: [
      'Foco em suporte imune e inflamatório',
      'Hidratação e monitoramento de sinais de alarme',
      'Evitar uso antibiótico sem indicação microbiológica'
    ],
    protocoloIntegrativo: [
      'Suporte de vitamina C e zinco conforme contexto',
      'Sono reparador e manejo de estresse',
      'Estratégia anti-inflamatória alimentar'
    ],
    referenciasIntegrativas: [
      'Abordagem funcional em cistites não bacterianas',
      'Estratégias de suporte imune em infecções virais urogenitais'
    ]
  }
};

export const ANTIBIOTIC_PROFILES = {
  amoxiclav: {
    nome: 'Amoxicilina + Ácido Clavulânico',
    classe: 'Penicilina associada a inibidor de beta-lactamase',
    acaoNoAgente: 'Bloqueia síntese da parede bacteriana e amplia cobertura contra cepas produtoras de beta-lactamase.',
    impactoNaPessoa: 'Pode causar náusea, diarreia, candidíase e rash cutâneo.',
    reposicao: 'Suporte intestinal com fibras solúveis e reposição de vitamina K em dieta.',
    probioticos: 'L. rhamnosus GG + S. boulardii por 4 a 8 semanas.'
  },
  amikacina: {
    nome: 'Amicacina',
    classe: 'Aminoglicosídeo',
    acaoNoAgente: 'Inibe síntese proteica bacteriana, útil em Gram-negativos mais resistentes.',
    impactoNaPessoa: 'Risco de nefrotoxicidade e ototoxicidade, exige monitoramento clínico.',
    reposicao: 'Hidratação reforçada e suporte antioxidante conforme avaliação médica.',
    probioticos: 'Multicepas (Lactobacillus + Bifidobacterium) por 8 semanas.'
  },
  ampicilina: {
    nome: 'Ampicilina',
    classe: 'Penicilina de amplo espectro',
    acaoNoAgente: 'Inibe parede celular de bactérias sensíveis.',
    impactoNaPessoa: 'Diarreia, náusea e risco de disbiose intestinal.',
    reposicao: 'Prebióticos graduais e reposição alimentar de folato e magnésio.',
    probioticos: 'L. rhamnosus + B. lactis por 4 a 6 semanas.'
  },
  cefalexina: {
    nome: 'Cefalexina',
    classe: 'Cefalosporina de 1ª geração',
    acaoNoAgente: 'Atua em parede celular de cocos Gram-positivos e parte dos Gram-negativos.',
    impactoNaPessoa: 'Desconforto gastrointestinal e possível candidíase de repetição.',
    reposicao: 'Suporte de microbiota vaginal/intestinal e hidratação adequada.',
    probioticos: 'L. reuteri + L. rhamnosus por 6 semanas.'
  },
  ceftriaxona: {
    nome: 'Ceftriaxona',
    classe: 'Cefalosporina de 3ª geração',
    acaoNoAgente: 'Amplo espectro para Gram-negativos sensíveis.',
    impactoNaPessoa: 'Pode causar disbiose relevante, diarreia e alteração hepática transitória.',
    reposicao: 'Estratégia anti-inflamatória intestinal e monitoramento de evacuações.',
    probioticos: 'S. boulardii + Bifidobacterium spp. por 8 a 12 semanas.'
  },
  cefotaxima: {
    nome: 'Cefotaxima',
    classe: 'Cefalosporina de 3ª geração',
    acaoNoAgente: 'Inibe síntese de parede com boa ação em Gram-negativos sensíveis.',
    impactoNaPessoa: 'Disbiose intestinal, desconforto GI e risco de diarreia associada a antibiótico.',
    reposicao: 'Reintrodução gradual de fibras e monitoramento de sintomas intestinais.',
    probioticos: 'L. rhamnosus GG + S. boulardii por 8 semanas.'
  },
  cefoxitina: {
    nome: 'Cefoxitina',
    classe: 'Cefamicina',
    acaoNoAgente: 'Ação em parede bacteriana com estabilidade relativa a algumas beta-lactamases.',
    impactoNaPessoa: 'Pode cursar com diarreia, náusea e alteração de microbiota.',
    reposicao: 'Suporte alimentar com polifenóis e fibras fermentáveis.',
    probioticos: 'Multicepas com Lactobacillus e Bifidobacterium por 6 a 8 semanas.'
  },
  ciprofloxacino: {
    nome: 'Ciprofloxacino',
    classe: 'Fluoroquinolona',
    acaoNoAgente: 'Inibe DNA girase/topoisomerase, reduz replicação bacteriana.',
    impactoNaPessoa: 'Risco de tendinopatia, insônia, disbiose e efeitos neurológicos em suscetíveis.',
    reposicao: 'Reposição de magnésio e suporte mitocondrial conforme avaliação clínica.',
    probioticos: 'S. boulardii + L. plantarum por 8 a 12 semanas.'
  },
  fosfomicina: {
    nome: 'Fosfomicina',
    classe: 'Derivado fosfônico',
    acaoNoAgente: 'Inibe etapa inicial de síntese da parede bacteriana, útil em ITU baixa.',
    impactoNaPessoa: 'Geralmente bem tolerada; pode causar náusea e diarreia leve.',
    reposicao: 'Manter hidratação e suporte leve de microbiota.',
    probioticos: 'L. rhamnosus + B. lactis por 4 semanas.'
  },
  gentamicina: {
    nome: 'Gentamicina',
    classe: 'Aminoglicosídeo',
    acaoNoAgente: 'Inibe síntese proteica bacteriana com ação em Gram-negativos.',
    impactoNaPessoa: 'Nefrotoxicidade/ototoxicidade quando uso prolongado ou dose inadequada.',
    reposicao: 'Monitorar função renal e hidratação; suporte antioxidante adjuvante.',
    probioticos: 'Multicepas de alta potência por 8 semanas.'
  },
  imipenem: {
    nome: 'Imipenem',
    classe: 'Carbapenêmico',
    acaoNoAgente: 'Antibiótico de amplo espectro para patógenos resistentes sensíveis.',
    impactoNaPessoa: 'Disbiose importante e maior pressão seletiva microbiológica.',
    reposicao: 'Reabilitação intestinal estendida no pós-tratamento.',
    probioticos: 'S. boulardii + Lactobacillus/Bifidobacterium por 8 a 12 semanas.'
  },
  levofloxacino: {
    nome: 'Levofloxacino',
    classe: 'Fluoroquinolona',
    acaoNoAgente: 'Inibe replicação bacteriana via DNA girase/topoisomerase.',
    impactoNaPessoa: 'Risco de disbiose, tendinite, alterações de sono e sensibilidade SNC.',
    reposicao: 'Suporte de magnésio e recuperação intestinal orientada.',
    probioticos: 'L. rhamnosus GG + S. boulardii por 8 a 12 semanas.'
  },
  nitrofurantoina: {
    nome: 'Nitrofurantoína',
    classe: 'Nitrofurano',
    acaoNoAgente: 'Dano oxidativo ao DNA/proteínas bacterianas em trato urinário baixo.',
    impactoNaPessoa: 'Náusea, desconforto GI e, raramente, neuropatia em uso prolongado.',
    reposicao: 'Suporte antioxidante e ingestão hídrica adequada.',
    probioticos: 'L. reuteri + B. lactis por 4 a 6 semanas.'
  },
  norfloxacino: {
    nome: 'Norfloxacino',
    classe: 'Fluoroquinolona',
    acaoNoAgente: 'Inibe DNA girase bacteriana em agentes sensíveis.',
    impactoNaPessoa: 'Disbiose, fotossensibilidade e risco de efeitos musculotendíneos.',
    reposicao: 'Suporte de microbiota e micronutrientes antioxidantes.',
    probioticos: 'S. boulardii + L. plantarum por 8 semanas.'
  },
  cefaclor: {
    nome: 'Cefaclor',
    classe: 'Cefalosporina de 2ª geração',
    acaoNoAgente: 'Inibição de parede bacteriana em cepas sensíveis.',
    impactoNaPessoa: 'Distúrbios GI e potencial hipersensibilidade cutânea.',
    reposicao: 'Suporte de barreira intestinal e hidratação.',
    probioticos: 'L. rhamnosus + B. breve por 6 semanas.'
  },
  sulfatrimetoprim: {
    nome: 'Sulfametoxazol + Trimetoprima (Sulfatrim)',
    classe: 'Inibidor sequencial do folato bacteriano',
    acaoNoAgente: 'Bloqueia síntese de folato bacteriano com efeito bactericida em cepas sensíveis.',
    impactoNaPessoa: 'Pode causar náusea, rash cutâneo e fotossensibilidade.',
    reposicao: 'Atenção ao status de folato alimentar e hidratação.',
    probioticos: 'L. rhamnosus GG + S. boulardii por 6 a 8 semanas.'
  }
};

export const ANTIBIOTIC_ORDER = [
  'amoxiclav',
  'amikacina',
  'ampicilina',
  'cefalexina',
  'ceftriaxona',
  'cefotaxima',
  'cefoxitina',
  'ciprofloxacino',
  'fosfomicina',
  'gentamicina',
  'imipenem',
  'levofloxacino',
  'nitrofurantoina',
  'norfloxacino',
  'cefaclor',
  'sulfatrimetoprim'
];

export function classifyColonyCount(colonyCount) {
  const value = parseFloat(colonyCount);

  if (Number.isNaN(value) || value <= 0) {
    return {
      value: null,
      status: 'indefinido',
      severity: 'info',
      mensagem: 'Informe a contagem de colônias para interpretação microbiológica.'
    };
  }

  if (value >= 100000) {
    return {
      value,
      status: 'significativa',
      severity: 'error',
      mensagem: 'Bacteriúria/infecção significativa (≥100.000 UFC/mL) - correlacionar com sintomas e antibiograma.'
    };
  }

  if (value >= 10000) {
    return {
      value,
      status: 'zona-cinzenta',
      severity: 'warning',
      mensagem: 'Crescimento intermediário (10.000-99.999 UFC/mL) - pode exigir nova coleta e correlação clínica.'
    };
  }

  return {
    value,
    status: 'baixo-crescimento',
    severity: 'info',
    mensagem: 'Baixo crescimento (<10.000 UFC/mL) - avaliar possibilidade de contaminação e contexto clínico.'
  };
}

export function buildUrocultureIntegrativeAnalysis(urocultureData) {
  const pathogen = UROCULTURE_PATHOGENS[urocultureData?.selectedAgent] || null;
  const colony = classifyColonyCount(urocultureData?.colonyCount);
  const susceptibility = urocultureData?.susceptibility || {};

  const sensitive = [];
  const intermediate = [];
  const resistant = [];

  ANTIBIOTIC_ORDER.forEach((key) => {
    const status = susceptibility[key];
    const profile = ANTIBIOTIC_PROFILES[key];
    if (!profile || !status) return;

    if (status === 'S') sensitive.push(profile.nome);
    if (status === 'I') intermediate.push(profile.nome);
    if (status === 'R') resistant.push(profile.nome);
  });

  const probioticStack = ANTIBIOTIC_ORDER
    .filter((key) => susceptibility[key] === 'S')
    .map((key) => ANTIBIOTIC_PROFILES[key]?.probioticos)
    .filter(Boolean);

  const uniqueProbiotics = [...new Set(probioticStack)];

  return {
    pathogen,
    colony,
    sensitive,
    intermediate,
    resistant,
    probioticStack: uniqueProbiotics,
    hasData: Boolean(pathogen || colony.value || sensitive.length || resistant.length)
  };
}
