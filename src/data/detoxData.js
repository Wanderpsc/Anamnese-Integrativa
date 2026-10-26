/**
 * Base de dados de Protocolos de Detoxificação
 * Fonte: Guia de Formulações Maria Rocha Farmácia de Manipulação (fascículo 2 – Depuração),
 *        Apostila de Naturopatia Aplicada IVM, apostilas de Protocolos de Detoxificação e
 *        Desparasitação Funcional, documentos do acervo terapêutico do terapeuta.
 *
 * AVISO LEGAL: Estes protocolos são de caráter exclusivamente terapêutico-informativo,
 * destinados ao uso supervisionado por profissional habilitado. A prescrição deve ser
 * individualizada. Dosagens, contraindicações e interações devem ser verificadas caso a caso.
 */

const DETOX_PROTOCOLS = [

  // ──────────────────────────────────────────────────────────────────────
  //  1. DETOX LINFÁTICO
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'linfatico',
    nome: 'Detox do Sistema Linfático',
    emoji: '🫁',
    categoria: 'Sistema Linfático',
    cor: '#1565c0',
    corClara: '#e3f2fd',
    icone: 'lymph',
    objetivo:
      'Estimular e aprofundar a drenagem linfática endógena, eliminar resíduos metabólicos acumulados nos linfonodos e tecidos, melhorar a imunidade celular e reduzir edemas.',
    indicacoes: [
      'Edemas recorrentes',
      'Linfonodos aumentados',
      'Pele opaca / celulite',
      'Imunidade baixa',
      'Fadiga crônica',
      'Pós-infecções repetidas',
      'Sobrecarga tóxica sistêmica',
    ],
    duracao: '30 dias',
    fase: 'Protocolo de 30 dias — fórmula manhã + fórmula noite',
    cuidados: [
      'Tomar em estômago vazio (30 min antes do café)',
      'Manter hidratação adequada (min. 2 L/dia)',
      'Evitar álcool durante o protocolo',
      'Não associar a outros quelantes sem orientação',
      'Monitorar função renal se uso prolongado',
    ],
    efeitos: [
      'Melhora da drenagem e do fluxo linfático',
      'Redução de edemas',
      'Aumento da energia',
      'Melhora do sistema imunológico',
      'Possível leve reação de Herxheimer nos primeiros dias (normal)',
    ],
    contraindicacoes: [
      'Gestação e lactação (consultar)',
      'Insuficiência renal grave',
      'Hipersensibilidade a algum componente',
    ],
    fonte: 'Guia de Formulações Maria Rocha – Fascículo 2 Depuração',
    formulacoes: [
      {
        nome: 'Fórmula Manhã – Suporte Linfático e Hepático',
        posologia: 'Tomar 1 cápsula pela manhã em jejum (30 min antes do café)',
        quantidade: '30 cápsulas',
        componentes: [
          { nome: 'NADH', dose: '5 mg' },
          { nome: 'Silimarina', dose: '300 mg' },
          { nome: 'Selênio Glicina', dose: '200 mcg' },
          { nome: 'Vitamina B12', dose: '200 mcg' },
          { nome: 'Zinco Quelado (Albion)', dose: '15 mg' },
          { nome: 'Vitamina E', dose: '200 UI' },
          { nome: 'L-Glutationa', dose: '15 mg' },
          { nome: 'N-Acetil-Cisteína (NAC)', dose: '500 mg' },
          { nome: 'Vitamina B6', dose: '50 mg' },
          { nome: 'Quercetina', dose: '100 mg' },
        ],
      },
      {
        nome: 'Fórmula Noite – Depurativo e Adaptogênico',
        posologia: 'Tomar 1 cápsula à noite em jejum',
        quantidade: '30 cápsulas',
        componentes: [
          { nome: 'Alcachofra extrato seco', dose: '100 mg' },
          { nome: 'Ashwagandha extrato seco', dose: '100 mg' },
          { nome: 'Chlorella', dose: '250 mg' },
          { nome: 'Silimarina', dose: '100 mg' },
          { nome: 'Fenogrego', dose: '200 mg' },
          { nome: 'Curcuma longa', dose: '50 mg' },
          { nome: 'Green Tea (extrato)', dose: '100 mg' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  //  2. DETOX HEPÁTICO (SUPORTE METABÓLICO)
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'hepatico',
    nome: 'Detox Hepático – Suporte Metabólico',
    emoji: '🫀',
    categoria: 'Fígado / Metabolismo',
    cor: '#2e7d32',
    corClara: '#e8f5e9',
    icone: 'liver',
    objetivo:
      'Reduzir a esteatose hepática, normalizar as enzimas hepáticas (TGO, TGP, GGT), otimizar as fases I e II de detoxificação hepática e reduzir o LDL.',
    indicacoes: [
      'Esteatose hepática (fígado gorduroso)',
      'Enzimas hepáticas elevadas',
      'Sobrecarga por medicamentos / toxinas',
      'LDL e triglicerídeos elevados',
      'Síndrome metabólica',
      'Exposição ocupacional a solventes',
      'Pós-tratamento prolongado com medicamentos alopáticos',
    ],
    duracao: '30 dias',
    fase: 'Contínuo por 30 dias — fórmula manhã + fórmula noite',
    cuidados: [
      'Não ingerir álcool durante o protocolo',
      'Preferir dieta de baixo teor de gordura saturada',
      'Avaliar função renal antes e durante o uso',
      'Monitorar enzimas hepáticas a cada 30 dias',
      'Não associar a hepatotóxicos',
    ],
    efeitos: [
      'Normalização gradual das enzimas hepáticas',
      'Redução da inflamação hepática',
      'Melhora do perfil lipídico',
      'Maior disposição e energia',
      'Melhora da digestão e trânsito intestinal',
    ],
    contraindicacoes: [
      'Cirrose hepática avançada (ajustar doses)',
      'Obstrução biliar aguda',
      'Gestação (verificar componente a componente)',
      'Hipersensibilidade a compostos sulforados (NAC)',
    ],
    fonte: 'Guia de Formulações Maria Rocha – Fascículo 2 Depuração',
    formulacoes: [
      {
        nome: 'Fórmula Manhã – Hepatoprotetor e Detoxificante Fase I/II',
        posologia: 'Tomar 1 cápsula pela manhã',
        quantidade: '30 cápsulas',
        componentes: [
          { nome: 'Selenometionina', dose: '100 mcg' },
          { nome: 'Silimarina', dose: '250 mg' },
          { nome: 'Fosfatidilcolina', dose: '150 mg' },
          { nome: 'L-Metionina', dose: '100 mg' },
          { nome: 'Taurina', dose: '100 mg' },
          { nome: 'N-Acetil-Cisteína (NAC)', dose: '100 mg' },
          { nome: 'Ácido Alfa-Lipóico (ALA)', dose: '50 mg' },
        ],
      },
      {
        nome: 'Fórmula Noite – Fitodepurativo Hepático',
        posologia: 'Tomar 1 cápsula à noite',
        quantidade: '30 cápsulas',
        componentes: [
          { nome: 'Alcachofra extrato seco', dose: '100 mg' },
          { nome: 'Ashwagandha extrato seco', dose: '100 mg' },
          { nome: 'Chlorella', dose: '250 mg' },
          { nome: 'Silimarina', dose: '100 mg' },
          { nome: 'Curcuma longa', dose: '50 mg' },
          { nome: 'Green Tea (extrato)', dose: '100 mg' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  //  3. PROTOCOLO DETOX HEPÁTICO E BILIAR (DRENAGEM DE CÁLCULOS)
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'hepatico-biliar',
    nome: 'Protocolo Detox Hepático e Biliar',
    emoji: '🟡',
    categoria: 'Fígado / Vesícula Biliar',
    cor: '#e65100',
    corClara: '#fff3e0',
    icone: 'bile',
    objetivo:
      'Realizar a limpeza dos ductos biliares do fígado, dissolver e eliminar cálculos vesiculares e biliares, com base no conceito da Dra. Andreas Moritz.',
    indicacoes: [
      'Cálculos biliares / colelitíase',
      'Discinesia biliar',
      'Dispepsia por insuficiência biliar',
      'Pele amarelada ou icterícia leve',
      'Gordura hepática e obstrução biliar',
      'Dores no hipocôndrio direito',
    ],
    duracao: '7 dias (protocolo principal) + 30 dias (pós-procedimento)',
    fase: 'Preparação 6 dias → Sábado procedimento → Domingo evacuação → Pós 30 dias',
    cuidados: [
      '⚠️ ATENÇÃO: Na semana que antecede evitar carnes vermelhas, frituras e laticínios',
      'Não realizar sem orientação profissional',
      'Podem ocorrer cólicas e desconfortos intestinais – ficar em casa no domingo',
      'Hidratação intensa durante todo o processo',
      'Observar coloração e consistência das fezes para identificar cálculos eliminados',
      'Não realizar em caso de obstrução biliar total ou colangite aguda',
    ],
    efeitos: [
      'Eliminação de cálculos biliares (nas fezes)',
      'Melhora da digestão de gorduras',
      'Redução de náuseas e dispepsia',
      'Sensação de leveza abdominal',
      'Melhora do humor e energia (após recuperação)',
    ],
    contraindicacoes: [
      'Obstrução biliar total ou colangite aguda',
      'Gestação e lactação',
      'Hepatite aguda ativa',
      'Cirrose descompensada',
      'Crianças menores de 12 anos',
    ],
    fonte: 'Guia de Formulações Maria Rocha – Fascículo 2 / Dr. Andreas Moritz',
    formulacoes: [
      {
        nome: 'Fase 1 – Preparação (2ª a Sábado, 6 dias)',
        posologia: 'Tomar 1 sachê 3 vezes ao dia: café da manhã, almoço e jantar',
        quantidade: '18 sachês',
        componentes: [
          { nome: 'Ácido Málico', dose: '2 g / sachê' },
          { nome: 'Pool de Lactobacillus', dose: '5 Bilhões / sachê' },
        ],
        observacao:
          'O ácido málico amolece os cálculos vesiculares ao longo dos 6 dias',
      },
      {
        nome: 'Fase 2 – Sábado 18:00h (Esvaziamento Intestinal)',
        posologia: 'Dissolver em 1 L de água e tomar 200 mL nos horários: Sáb 18:00h, Sáb 20:00h, Dom 06:00h, Dom 08:00h, Dom 10:00h',
        quantidade: '4 sachês',
        componentes: [
          { nome: 'Sulfato de Magnésio (Sal de Epsom)', dose: '10 g / sachê' },
        ],
        observacao:
          'Favorece o alargamento dos ductos biliares e facilita a eliminação dos cálculos. Não comer a partir das 13:30 de sábado',
      },
      {
        nome: 'Fase 3 – Sábado 22:00h (Flush Hepático)',
        posologia: 'Tomar a fórmula em cápsulas + 125 mL de óleo de oliva misturado com suco de laranja e limão. Deitar imediatamente',
        quantidade: '60 cápsulas',
        componentes: [
          { nome: 'Cálcio D-Glucarato', dose: '400 mg' },
          { nome: 'L-Taurina', dose: '100 mg' },
          { nome: 'Ácido Alfa-Cetoglutárico', dose: '75 mg' },
          { nome: 'Olive Leaf (extrato)', dose: '130 mg' },
          { nome: 'Curcumina', dose: '150 mg' },
          { nome: 'Óleo de Oliva extra-virgem', dose: '125 mL (à parte)' },
        ],
        observacao:
          'Cólicas e desconfortos abdominais são esperados e indicam funcionamento do protocolo. Retornar alimentação após 13:30 de domingo (refeição leve)',
      },
      {
        nome: 'Pós-Procedimento – Prevenção de Novos Cálculos (30 dias)',
        posologia: 'Tomar 1 pastilha sublingual após o café da manhã por 30 dias',
        quantidade: '30 pastilhas sublinguais',
        componentes: [
          { nome: 'Glutationa Reduzida', dose: '30 mg (sublingual)' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  //  4. QUARTETO HEPÁTICO E BILIAR (DR. JOSÉ MARIA CARDESIN)
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'quarteto-biliar',
    nome: 'Quarteto para Detox Hepático e Biliar',
    emoji: '🍋',
    categoria: 'Fígado / Vesícula Biliar',
    cor: '#f9a825',
    corClara: '#fffde7',
    icone: 'quarteto',
    objetivo:
      'Limpeza dos ductos biliares hepáticos pelo método adaptado do Dr. José Maria Cardesin, combinando dreno hepático, suporte antioxidante e reequilíbrio microbiota pós-procedimento.',
    indicacoes: [
      'Cálculos biliares / colelitíase',
      'Insuficiência biliar crônica',
      'Enzimas hepáticas persistentemente elevadas',
      'Gordura hepática grau 1 ou 2',
      'Constipação associada a insuficiência biliar',
    ],
    duracao: '30 dias + 30 dias pós',
    fase: 'Protocolo principal 30 dias → Pós-procedimento 30 dias',
    cuidados: [
      'Manter dieta sem frituras, álcool e ultra-processados',
      'Tomar 30 min antes das refeições',
      'Manter hidratação adequada',
      'Repetir a cada 6 meses em casos crônicos',
    ],
    efeitos: [
      'Dissolução gradual de cálculos biliares pequenos',
      'Melhora da função biliar',
      'Redução da dispepsia e flatulência',
      'Melhora do trânsito intestinal',
    ],
    contraindicacoes: [
      'Cálculos biliares > 1 cm (avaliar conduta cirúrgica)',
      'Gestação e lactação',
      'Obstrução biliar total',
    ],
    fonte: 'Guia de Formulações Maria Rocha – Fascículo 2 / Dr. José Maria Cardesin',
    formulacoes: [
      {
        nome: 'Fórmula Principal – Quarteto Hepatobiliar',
        posologia: 'Tomar 1 cápsula 3 vezes ao dia, meia hora antes das refeições, por 30 dias',
        quantidade: '90 cápsulas',
        componentes: [
          { nome: 'Ácido Málico', dose: '150 mg' },
          { nome: 'Alcachofra extrato seco', dose: '450 mg' },
          { nome: 'Altilix (Cynara scolymus extrato padronizado)', dose: '150 mg' },
          { nome: 'Glucorafanina (Brócolis extrato)', dose: '60 mg' },
          { nome: 'Silimarina', dose: '250 mg' },
        ],
      },
      {
        nome: 'Pós-Procedimento – Antioxidante (30 dias)',
        posologia: 'Tomar 1 cápsula por dia em jejum',
        quantidade: '30 cápsulas',
        componentes: [
          { nome: 'Pool de Lactobacillus', dose: '5 Bilhões' },
          { nome: 'Vitamina C (ascorbato)', dose: '500 mg' },
          { nome: 'Tocotrimax (Tocotrienóis + Tocoferóis)', dose: '200 mg' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  //  5. DETOX PARASITÁRIO
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'parasitario',
    nome: 'Detox Parasitário',
    emoji: '🦠',
    categoria: 'Desparasitação / Intestino',
    cor: '#6a1b9a',
    corClara: '#f3e5f5',
    icone: 'parasites',
    objetivo:
      'Eliminar parasitas intestinais (helmintos, protozoários, candidíase) e restaurar a integridade da mucosa intestinal, com suporte hepático simultâneo.',
    indicacoes: [
      'Distensão e flatulência persistente',
      'Diarreia ou constipação alternada',
      'Prurido anal ou nasal',
      'Bruxismo (ranger de dentes)',
      'Fadiga crônica inexplicada',
      'Imunidade baixa recorrente',
      'Parasitose confirmada em exames',
    ],
    duracao: '30 dias (15 + 15)',
    fase: 'Fase 1 (15 dias): suporte hepático → Fase 2 (15 dias): antiparasitário fitoterápico → repetir a cada 3 meses',
    cuidados: [
      'Repetir o protocolo a cada 3 meses por no mínimo 3 ciclos',
      'Toda a família deve realizar simultaneamente para evitar reinfecção',
      'Higienizar alimentos com vinagre e exposição solar',
      'Evitar carne mal passada e água não filtrada',
      'Reação de Herxheimer possível nos primeiros dias (piora temporária)',
    ],
    efeitos: [
      'Eliminação de parasitas nas fezes',
      'Melhora da digestão e absorção de nutrientes',
      'Redução do bruxismo',
      'Melhora do sono e da imunidade',
      'Redução da distensão abdominal',
    ],
    contraindicacoes: [
      'Gestação (absinto é abortivo – contraindicado)',
      'Lactação (verificar)',
      'Crianças < 12 anos (ajustar doses)',
      'Úlcera péptica ativa (evitar absinto)',
    ],
    fonte: 'Guia de Formulações Maria Rocha – Fascículo 2 / Apostila de Naturopatia IVM',
    formulacoes: [
      {
        nome: 'Fase 1 – Suporte Hepático (15 dias)',
        posologia: 'Tomar 1 cápsula antes do almoço e 1 antes do jantar, por 15 dias',
        quantidade: '30 cápsulas',
        componentes: [
          { nome: 'Silimarina', dose: '300 mg' },
        ],
        observacao:
          'O suporte hepático é essencial antes do antiparasitário para evitar sobrecarga tóxica',
      },
      {
        nome: 'Fase 2 – Antiparasitário Fitoterápico (15 dias)',
        posologia: 'Tomar 20 gotas antes do café da manhã, do almoço e do jantar, diluídas em água, por 15 dias',
        quantidade: '3 frascos de 50 mL',
        componentes: [
          { nome: 'Tintura-mãe de Cariophyllus aromaticus (Cravo)', dose: '50 mL' },
          { nome: 'Tintura-mãe de Artemisia absinthium (Losna / Absinto)', dose: '50 mL' },
          { nome: 'Tintura-mãe de Berberis vulgaris (Bérberis)', dose: '50 mL' },
        ],
        observacao:
          '⚠️ CONTRAINDICADO NA GESTAÇÃO. Repetir o protocolo completo a cada 3 meses.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  //  6. DETOX DE METAIS PESADOS
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'metais-pesados',
    nome: 'Detox de Metais Pesados',
    emoji: '⚗️',
    categoria: 'Metais Pesados / Quelação',
    cor: '#37474f',
    corClara: '#eceff1',
    icone: 'metals',
    objetivo:
      'Realizar terapia quelante para eliminar metais pesados acumulados (mercúrio, chumbo, cádmio, alumínio), mobilizando-os de tecidos e órgãos com suporte antioxidante e reposição mineral pós-quelação.',
    indicacoes: [
      'Exposição a amálgamas dentárias (mercúrio)',
      'Exposição ocupacional (solda, tinturas, pesticidas)',
      'Fadiga inexplicada / névoa mental',
      'Neuropatia periférica',
      'Doenças autoimunes inexplicadas',
      'Exames de metais pesados alterados',
      'Autismo (suporte adjuvante)',
    ],
    duracao: '90 dias + reposição mineral posterior',
    fase: 'Quelação 90 dias → Reposição mineral 30 dias',
    cuidados: [
      '⚠️ PROTOCOLO DE ALTO RISCO – realizar apenas sob supervisão profissional',
      'Monitorar função renal e hepática a cada 30 dias',
      'NUNCA realizar quelação sem reposição mineral concomitante',
      'Tomar longe das refeições (2h antes ou 2h depois)',
      'Garantir evacuação diária durante o protocolo',
      'Não associar a outros quelantes farmacológicos sem avaliação',
      'Ingestão hídrica mínima de 2,5 L/dia',
    ],
    efeitos: [
      'Redução progressiva dos níveis de metais pesados',
      'Melhora da função cognitiva',
      'Redução da fadiga crônica',
      'Melhora da função neurológica',
      'Possível piora temporária nos primeiros 15 dias (mobilização)',
    ],
    contraindicacoes: [
      'Insuficiência renal moderada a grave',
      'Gestação e lactação',
      'Insuficiência hepática',
      'Deficiências minerais graves não corrigidas antes do início',
    ],
    fonte: 'Guia de Formulações Maria Rocha – Fascículo 2 / Protocolo de Quelação Clínica',
    formulacoes: [
      {
        nome: 'Quelante Principal (90 dias)',
        posologia: 'Tomar 1 dose 2 vezes ao dia, longe das refeições, por 90 dias',
        quantidade: '180 cápsulas',
        componentes: [
          { nome: 'Exselen® (L-Selenometionina)', dose: '100 mcg' },
          { nome: 'Ferro Quelato', dose: '7,55 mg' },
          { nome: 'Iodeto de Potássio', dose: '1,75 mg' },
          { nome: 'Iodo Elementar', dose: '2,5 mg' },
          { nome: 'Magnésio (ascorbato)', dose: '100 mg' },
          { nome: 'N-Acetil-Cisteína (NAC)', dose: '200 mg' },
          { nome: 'Piridoxal-5-Fosfato (B6 ativa)', dose: '20 mg' },
          { nome: 'Ácido Alfa-Lipóico (ALA)', dose: '100 mg' },
        ],
      },
      {
        nome: 'Antioxidante Adjuvante (90 dias)',
        posologia: 'Tomar 1 dose 2 vezes ao dia',
        quantidade: '60 cápsulas',
        componentes: [
          { nome: 'Glutationa Reduzida', dose: '25 mg' },
        ],
      },
      {
        nome: 'Adsorvente e Quelante Intestinal (90 dias)',
        posologia: 'Tomar 1 dose 3 vezes ao dia, 30 min antes das refeições, por 90 dias',
        quantidade: '270 cápsulas',
        componentes: [
          { nome: 'Clorela', dose: '150 mg' },
          { nome: 'Espirulina', dose: '150 mg' },
          { nome: 'Fibregum® (Goma Acácia)', dose: '200 mg' },
          { nome: 'Inulina', dose: '300 mg' },
        ],
        observacao:
          'Clorela e espirulina ligam metais pesados no intestino e os conduzem à eliminação fecal',
      },
      {
        nome: 'Pós-Quelação – Reposição Mineral (30 dias)',
        posologia: 'Tomar conforme orientação profissional',
        quantidade: '60 cápsulas',
        componentes: [
          { nome: 'Boro Quelato', dose: '2 mg' },
          { nome: 'Cálcio Quelato', dose: '50 mg' },
          { nome: 'Cobre Quelato', dose: '1 mg' },
          { nome: 'Cromo Quelato', dose: '150 mcg' },
          { nome: 'MSM (Metilsulfonilmetano)', dose: '100 mg' },
          { nome: 'Ferro Quelato', dose: '10 mg' },
          { nome: 'Iodeto de Potássio', dose: '4 mg' },
          { nome: 'Iodo Quelato', dose: '150 mcg' },
          { nome: 'Magnésio Quelato', dose: '150 mg' },
          { nome: 'Manganês Quelato', dose: '2,5 mg' },
          { nome: 'Potássio Quelato', dose: '50 mg' },
          { nome: 'Zinco Quelato', dose: '20 mg' },
        ],
        observacao:
          '⚠️ OBRIGATÓRIO após o protocolo de quelação para repor os minerais essenciais mobilizados',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  //  7. DETOX ADRENAL
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'adrenal',
    nome: 'Detox e Suporte das Adrenais',
    emoji: '⚡',
    categoria: 'Glândulas Adrenais / Cortisol',
    cor: '#c62828',
    corClara: '#ffebee',
    icone: 'adrenal',
    objetivo:
      'Eliminar resíduos oxidativos acumulados nas glândulas adrenais, modular o eixo HPA (hipotálamo-hipófise-adrenal), reduzir o cortisol elevado e restaurar a vitalidade adrenal.',
    indicacoes: [
      'Fadiga adrenal (burnout)',
      'Cortisol cronicamente elevado',
      'Insônia por estresse crônico',
      'Ansiedade e irritabilidade persistentes',
      'Hipotensão postural',
      'Desejo excessivo por sal',
      'Recuperação lenta após exercícios',
    ],
    duracao: '30 dias',
    fase: 'Duas fórmulas simultâneas por 30 dias',
    cuidados: [
      'Associar a técnicas de gestão do estresse',
      'Evitar cafeína em excesso durante o protocolo',
      'Respeitar ciclos de sono',
      'Não interromper abruptamente uso de corticoides prescritos',
    ],
    efeitos: [
      'Melhora da energia e disposição',
      'Redução da ansiedade',
      'Melhora do sono',
      'Melhor tolerância ao estresse',
      'Regulação do eixo cortisol / DHEA',
    ],
    contraindicacoes: [
      'Gestação e lactação',
      'Hipotensão arterial grave (Licorice pode ser problemático)',
      'Hipersensibilidade a adaptógenos',
    ],
    fonte: 'Guia de Formulações Maria Rocha – Fascículo 2',
    formulacoes: [
      {
        nome: 'Fórmula Adrenal 1 – Antioxidante e Neuromodulador',
        posologia: 'Tomar 1 dose 2 vezes ao dia por 30 dias',
        quantidade: '60 cápsulas',
        componentes: [
          { nome: 'Glisodin® (SOD estabilizada)', dose: '40 mg' },
          { nome: 'Magnésio (ascorbato)', dose: '100 mg' },
          { nome: 'Dimetilglicina (DMG)', dose: '150 mg' },
          { nome: 'Piperina', dose: '5 mg' },
          { nome: 'Quercetina', dose: '50 mg' },
          { nome: 'Tocotrimax® (Tocotrienóis)', dose: '60 mg' },
          { nome: 'Zinco Quelato', dose: '15 mg' },
        ],
      },
      {
        nome: 'Fórmula Adrenal 2 – Adaptogênico e Protetor Vascular',
        posologia: 'Tomar 1 dose 2 vezes ao dia por 30 dias',
        quantidade: '60 cápsulas',
        componentes: [
          { nome: 'Pycnogenol (extrato casca de pinheiro)', dose: '50 mg' },
          { nome: 'Cranberry (extrato)', dose: '200 mg' },
          { nome: 'Ashwagandha (Withania somnifera)', dose: '100 mg' },
          { nome: 'Licorice (Glycyrrhiza glabra)', dose: '50 mg' },
          { nome: 'Policosanol', dose: '15 mg' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  //  8. DETOX INTESTINAL
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'intestinal',
    nome: 'Detox Intestinal',
    emoji: '🌿',
    categoria: 'Intestinos / Microbiota',
    cor: '#558b2f',
    corClara: '#f1f8e9',
    icone: 'intestine',
    objetivo:
      'Remover toxinas acumuladas na mucosa intestinal, restaurar a permeabilidade intestinal, eliminar biofilmes bacterianos e restaurar a microbiota com probióticos.',
    indicacoes: [
      'Síndrome do intestino irritável (SII)',
      'Disbiose intestinal',
      'Constipação crônica',
      'Permeabilidade intestinal aumentada (leaky gut)',
      'Flatulência e distensão',
      'Doenças inflamatórias intestinais (fase de remissão)',
      'Pré e pós-uso de antibióticos',
    ],
    duracao: '30 dias + limpeza final + pós 30 dias',
    fase: 'Fase 1 (30 dias): adsorvente + fibras → Limpeza intestinal (1 dia) → Pós: probióticos',
    cuidados: [
      'O carvão ativado pode adsorver medicamentos – tomar 2 horas afastado de qualquer medicação',
      'Carvão ativado pode causar fezes escurecidas (normal)',
      'A limpeza intestinal com sulfato de magnésio deve ser feita em dia de descanso (ficar em casa)',
      'Ingestão hídrica mínima 2 L/dia para evitar impactação pelas fibras',
    ],
    efeitos: [
      'Melhora do trânsito intestinal',
      'Redução de flatulência',
      'Redução de distensão abdominal',
      'Melhora da absorção de nutrientes',
      'Restabelecimento da microbiota saudável',
    ],
    contraindicacoes: [
      'Obstrução intestinal (contraindicação absoluta para fibras e sulfato de Mg)',
      'Insuficiência renal (sulfato de magnésio)',
      'Gestação',
      'Pós-operatório intestinal recente',
    ],
    fonte: 'Guia de Formulações Maria Rocha – Fascículo 2',
    formulacoes: [
      {
        nome: 'Fase 1a – Adsorvente de Toxinas (30 dias)',
        posologia: 'Tomar 2 cápsulas 2 vezes ao dia por 30 dias (tomar 2h longe de outros medicamentos)',
        quantidade: '60 cápsulas',
        componentes: [
          { nome: 'Carvão Vegetal Ativado', dose: '250 mg' },
        ],
        observacao: '⚠️ Adsorve também nutrientes e medicamentos – manter intervalo de 2h',
      },
      {
        nome: 'Fase 1b – Fibras Prebióticas (30 dias)',
        posologia: 'Tomar 1 sachê à noite, diluído em 250 mL de água, por 30 dias. Tomar mais 250 mL de água em seguida',
        quantidade: '60 sachês',
        componentes: [
          { nome: 'Fibregum® (Goma Acácia)', dose: '3 g' },
          { nome: 'Inulina', dose: '2 g' },
        ],
      },
      {
        nome: 'Fase 1c – Enzimas Digestivas (30 dias)',
        posologia: 'Tomar 1 cápsula 2 vezes ao dia junto das principais refeições',
        quantidade: '60 cápsulas',
        componentes: [
          { nome: 'Pancreatina', dose: '50 mg' },
          { nome: 'Protease', dose: '50 mg' },
          { nome: 'Papaína', dose: '150 mg' },
          { nome: 'Bromelina', dose: '50 mg' },
          { nome: 'Pepsina', dose: '25 mg' },
        ],
      },
      {
        nome: 'Limpeza Intestinal Final (1 dia)',
        posologia: 'Tomar 1 sachê em 200 mL de água nos horários: 07h, 12h, 18h e 24h. Ficar em casa. Não realizar saídas',
        quantidade: '4 sachês',
        componentes: [
          { nome: 'Sulfato de Magnésio', dose: '15 g / sachê' },
        ],
        observacao: '⚠️ Realizar no final de semana. Permanecer em casa. Pode causar diarreia intensa',
      },
      {
        nome: 'Pós-Procedimento – Restauração da Microbiota',
        posologia: 'Tomar 1 cápsula por dia em jejum',
        quantidade: '30 cápsulas',
        componentes: [
          { nome: 'Pool de Lactobacillus', dose: '5 Bilhões' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  //  9. DETOX E REATIVAÇÃO CELULAR
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'celular',
    nome: 'Detox e Reativação Celular',
    emoji: '🔬',
    categoria: 'Mitocôndrias / Celular',
    cor: '#00695c',
    corClara: '#e0f2f1',
    icone: 'cell',
    objetivo:
      'Eliminar resíduos metabólicos celulares e mitocondriais, quelação leve de chumbo/cádmio/alumínio, e ativar a biogênese mitocondrial para restaurar a produção de energia celular.',
    indicacoes: [
      'Fadiga mitocondrial',
      'Envelhecimento precoce',
      'Pós-quimioterapia / radioterapia',
      'Exposição a agrotóxicos / pesticidas',
      'Névoa mental',
      'Baixa performance física e mental',
      'Síndrome de burnout',
    ],
    duracao: '90 dias',
    fase: 'Contínuo por 90 dias com dois suplementos simultâneos',
    cuidados: [
      'Associar a exercícios físicos moderados para potencializar biogênese mitocondrial',
      'Manter dieta anti-inflamatória',
      'Evitar exposição a novos tóxicos durante o protocolo',
    ],
    efeitos: [
      'Aumento da energia celular',
      'Melhora cognitiva',
      'Melhor recuperação muscular',
      'Ativação da longevidade celular',
      'Redução do estresse oxidativo',
    ],
    contraindicacoes: [
      'Insuficiência renal grave',
      'Gestação e lactação',
    ],
    fonte: 'Guia de Formulações Maria Rocha – Fascículo 2',
    formulacoes: [
      {
        nome: 'Quelante de Vitamina C Lipossomal (90 dias)',
        posologia: 'Tomar 1 sachê ao dia, por 90 dias',
        quantidade: '90 sachês',
        componentes: [
          { nome: 'Ascorbato de Magnésio', dose: '500 mg' },
          { nome: 'Ascorbato de Cálcio', dose: '500 mg' },
          { nome: 'Ácido Ascórbico', dose: '500 mg' },
          { nome: 'Palmitato de Ascorbila (Vit C lipossolúvel)', dose: '500 mg' },
          { nome: 'Quercetina', dose: '50 mg' },
        ],
        observacao:
          'Total de 2.000 mg de Vitamina C em diferentes formas. Quelação suave e suporte imunológico',
      },
      {
        nome: 'Ativador Mitocondrial (90 dias)',
        posologia: 'Tomar 1 cápsula ao dia, por 90 dias',
        quantidade: '90 cápsulas',
        componentes: [
          { nome: 'Ribosídeo de Nicotinamida (NR)', dose: '100 mg' },
          { nome: 'Pterostilbeno', dose: '25 mg' },
          { nome: 'Resveratrol trans', dose: '25 mg' },
          { nome: 'Coenzima Q10 lipofílica', dose: '100 mg' },
          { nome: 'PQQ (Pirroloquinolina Quinona)', dose: '5 mg' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  //  10. DETOX ESTROGÊNICO
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'estrogenico',
    nome: 'Detox Estrogênico',
    emoji: '🌸',
    categoria: 'Hormônios / Estrogênio',
    cor: '#880e4f',
    corClara: '#fce4ec',
    icone: 'estrogen',
    objetivo:
      'Inibir a beta-glucuronidase, facilitando a conjugação e eliminação de estrogênios ativos e xenoestrogênios, reduzindo o risco de doenças hormônio-dependentes.',
    indicacoes: [
      'Dominância estrogênica',
      'TPM intensa / endometriose',
      'Miomas uterinos',
      'Câncer hormônio-dependente (pós-tratamento / prevenção)',
      'Acne hormonal na mulher adulta',
      'SOP (Síndrome do Ovário Policístico)',
      'Obesidade abdominal feminina',
      'Exposição a xenoestrogênios (plásticos, pesticidas)',
    ],
    duracao: '60 dias (renovável)',
    fase: 'Contínuo por 60 dias – reavaliar',
    cuidados: [
      'Associar a dieta isenta de xenoestrogênios (evitar plásticos, laticínios em excesso)',
      'Verificar histórico familiar de câncer hormônio-dependente',
      'Não associar a terapia hormonal sem avaliação',
      'Monitorar exames hormonais (E2, progesterona) antes e após',
    ],
    efeitos: [
      'Redução do dominância estrogênica',
      'Melhora da TPM',
      'Redução de miomas e cistos',
      'Melhora do humor no ciclo menstrual',
      'Efeito protetor em tecido mamário',
    ],
    contraindicacoes: [
      'Gestação e lactação',
      'Hipotireoidismo não tratado (DIM pode interferir)',
      'Em uso de tamoxifeno (verificar interação)',
    ],
    fonte: 'Guia de Formulações Maria Rocha – Fascículo 2 / Apostila de Naturopatia IVM',
    formulacoes: [
      {
        nome: 'Modulador Estrogênico (60 dias)',
        posologia: 'Tomar 1 cápsula antes do almoço e 1 cápsula antes do jantar, por 60 dias',
        quantidade: '60 cápsulas',
        componentes: [
          { nome: 'Glucarato de Cálcio (Cálcio D-Glucarato)', dose: '250 mg' },
          { nome: 'Diindolilmetano (DIM)', dose: '100 mg' },
          { nome: 'Licopeno', dose: '5 mg' },
          { nome: 'Resveratrol trans', dose: '20 mg' },
        ],
        observacao:
          'Glucarato de Cálcio inibe a beta-glucuronidase. DIM regula o metabolismo estrogênico. Licopeno e Resveratrol: proteção oncogênica',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  //  11. DETOX NO CONTROLE DO PESO
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'peso',
    nome: 'Detox no Controle do Peso',
    emoji: '⚖️',
    categoria: 'Emagrecimento / Metabolismo',
    cor: '#f57c00',
    corClara: '#fff8e1',
    icone: 'weight',
    objetivo:
      'Eliminar toxinas associadas ao tecido adiposo, melhorar a sensibilidade à insulina, reduzir a inflamação associada à obesidade e potencializar o emagrecimento.',
    indicacoes: [
      'Obesidade ou sobrepeso com sobrecarga tóxica',
      'Resistência à insulina / pré-diabetes',
      'Dislipidemias associadas ao excesso de peso',
      'Celulite e retenção hídrica',
      'Dificuldade para emagrecer mesmo com dieta e exercício',
    ],
    duracao: '30 dias',
    fase: 'Contínuo por 30 dias',
    cuidados: [
      'Associar a dieta anti-inflamatória e exercício físico',
      'Hidratação essencial para eliminar as toxinas liberadas',
      'Pode haver reações de desintoxicação nos primeiros dias',
    ],
    efeitos: [
      'Redução de peso e medidas',
      'Melhora da sensibilidade insulínica',
      'Redução da inflamação sistêmica',
      'Melhora do perfil lipídico',
      'Redução da celulite',
    ],
    contraindicacoes: [
      'Gestação e lactação',
      'Diabetes tipo 1 (monitorar glicemia)',
    ],
    fonte: 'Guia de Formulações Maria Rocha – Fascículo 2',
    formulacoes: [
      {
        nome: 'Detox Termogênico e Metabólico (30 dias)',
        posologia: 'Tomar 1 sachê ao dia, diluído em 250 mL de água',
        quantidade: '30 sachês',
        componentes: [
          { nome: 'Altilix (extrato de alcachofra padronizado)', dose: '100 mg' },
          { nome: 'Cactinea (extrato de figo da índia)', dose: '1.000 mg' },
        ],
        observacao:
          'Altilix: efeito hepatoprotetor e hipocolesterolemiante. Cactinea: redução de retenção hídrica e lipídios',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  //  12. DETOX INTRAMUSCULAR / INJETÁVEL
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'intramuscular',
    nome: 'Protocolo Detox Intramuscular',
    emoji: '💉',
    categoria: 'Terapia Injetável / Ortomolecular',
    cor: '#1a237e',
    corClara: '#e8eaf6',
    icone: 'injection',
    objetivo:
      'Promover detoxificação profunda e rápida via aplicação intramuscular de antioxidantes e hepatoprotetores, indicada para pacientes com maior sobrecarga tóxica.',
    indicacoes: [
      'Sobrecarga tóxica severa',
      'Pós-exposição a solventes ou químicos',
      'Recuperação oncológica',
      'Quando a via oral é insuficiente',
      'Fatiga adrenal severa',
    ],
    duracao: '10 a 20 sessões (conforme avaliação)',
    fase: 'Sessões 2-3x por semana',
    cuidados: [
      '⚠️ EXCLUSIVO PARA PROFISSIONAIS HABILITADOS EM TERAPIA INJETÁVEL',
      'Verificar alergias e contraindicações antes de cada sessão',
      'Material estéril e descartável obrigatório',
      'Monitorar reações anafiláticas',
    ],
    efeitos: [
      'Detoxificação rápida e profunda',
      'Melhora imediata da energia',
      'Redução de inflamação sistêmica',
    ],
    contraindicacoes: [
      'Coagulopatias',
      'Gestação',
      'Alergia a componentes',
      'Profissional não habilitado (contraindicação absoluta)',
    ],
    fonte: 'Protocolo Detox Intramuscular IEF / Curso de Injetáveis Ortomoleculares',
    formulacoes: [
      {
        nome: 'Solução Injetável Detox (IM)',
        posologia: 'Aplicar 1 ampola IM 2-3x por semana por 10-20 sessões (sob supervisão)',
        quantidade: 'Conforme avaliação clínica',
        componentes: [
          { nome: 'Glutationa Reduzida', dose: '600 mg' },
          { nome: 'Vitamina C (ascorbato de sódio)', dose: '1.000 mg' },
          { nome: 'Complexo B (B1, B6, B12)', dose: 'Dose padrão IM' },
          { nome: 'Silimarina lipossomal (quando disponível)', dose: '100 mg' },
        ],
        observacao:
          '⚠️ Uso exclusivo para profissionais com certificação em terapia injetável. Exige material estéril e ambiente adequado',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  //  13. PROTOCOLO HULDA CLARK – DESPARASITAÇÃO CLÁSSICA
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'hulda-clark',
    nome: 'Protocolo Hulda Clark – Desparasitação Clássica',
    emoji: '🌿',
    categoria: 'Desparasitação / Intestino',
    cor: '#2e7d32',
    corClara: '#e8f5e9',
    icone: 'clark',
    objetivo:
      'Eliminar parasitas intestinais e sistêmicos — helmintos, protozoários e suas formas larvares — utilizando a tríade fitoterápica clássica da Dra. Hulda Regehr Clark: Cravinho (mata os ovos), Losna/Absinto (mata os adultos) e Nogueira Negra (mata as formas juvenis e adultas). O protocolo inclui suporte hepático prévio, neutralização de amônia com ornitina, antimicrobiano complementar e manutenção semanal.',
    indicacoes: [
      'Parasitoses intestinais diagnosticadas ou suspeitas',
      'Distensão abdominal e gases persistentes',
      'Prurido anal (especialmente noturno)',
      'Bruxismo',
      'Fadiga inexplicada / névoa mental',
      'Ressurgência imune baixa crônica',
      'Viagens a áreas endêmicas',
      'Exposição a animais domésticos',
      'Pacientes com candidíase recorrente',
    ],
    duracao: '30 dias + manutenção semanal',
    fase: 'Fase 1 – Suporte hepático (15 dias) → Fase 2 – Tinturas antiparasitárias + suporte (15 dias) → Manutenção semanal (toda segunda-feira)',
    cuidados: [
      'Iniciar preferencialmente na lua nova',
      'Toda a família deve realizar simultaneamente (evitar reinfecção)',
      'Higienizar alimentos com vinagre + exposição solar',
      'Evitar carne mal passada, sushi e água não filtrada',
      'Reação de Herxheimer nos primeiros dias é normal (náusea, piora transitória)',
      'Repetir o protocolo completo a cada 3 meses por no mínimo 3 ciclos',
      'Gestantes: CONTRAINDICADO (absinto/losna é abortivo)',
      'Crianças < 12 anos: ajustar doses com profissional',
    ],
    efeitos: [
      'Eliminação visível de parasitas nas fezes (primeiras semanas)',
      'Melhora progressiva da digestão e absorção de nutrientes',
      'Redução do bruxismo e ranger de dentes',
      'Melhora do sono e da imunidade',
      'Redução da distensão abdominal e flatulência',
      'Melhora da energia e clareza mental',
    ],
    contraindicacoes: [
      'Gestação (absinto/losna é abortivo – CONTRAINDICADO)',
      'Lactação (avaliar individualmente)',
      'Crianças < 12 anos sem orientação profissional',
      'Úlcera péptica ativa (evitar absinto)',
      'Hipersensibilidade a alguma das plantas',
      'Hepatopatia grave (ajustar dose de silimarina)',
    ],
    fonte: 'Dra. Hulda Regehr Clark – "A Cura de Todas as Doenças" / Guia de Formulações Maria Rocha Farmácia Magistral / Apostila Naturopatia IVM',
    formulacoes: [
      {
        nome: 'Fase 1 – Suporte Hepático (15 dias)',
        posologia: 'Tomar 1 cápsula antes do almoço e 1 cápsula antes do jantar, durante 15 dias',
        quantidade: '30 cápsulas',
        componentes: [
          { nome: 'Silimarina (Cardo Mariano)', dose: '300 mg' },
        ],
        observacao:
          'O suporte hepático prévio é essencial para preparar o organismo para a eliminação das toxinas liberadas pelos parasitas na Fase 2.',
      },
      {
        nome: 'Fase 2 – Tríade Antiparasitária de Clark (15 dias)',
        posologia: 'Tomar 20 gotas de CADA tintura separadamente, antes do café da manhã, almoço e jantar, diluídas em água, por 15 dias',
        quantidade: '4 frascos de 50 mL (1 por tintura)',
        componentes: [
          { nome: 'Tintura-mãe de Caryophyllus aromaticus (Cravo-da-Índia)', dose: '50 mL — mata ovos e larvas' },
          { nome: 'Tintura-mãe de Artemisia absinthium (Losna / Absinto)', dose: '50 mL — mata formas adultas' },
          { nome: 'Tintura-mãe de Juglans nigra (Nogueira Negra)', dose: '50 mL — mata formas adultas e juvenis' },
          { nome: 'Tintura-mãe de Berberis vulgaris (Bérberis)', dose: '50 mL — antimicrobiano e antiprotozoário' },
        ],
        observacao:
          '⚠️ CONTRAINDICADO NA GESTAÇÃO. Cada tintura atua em uma fase do ciclo de vida do parasita — não substituir uma pela outra.',
      },
      {
        nome: 'Fase 2 – Suporte Neurológico e Antifúngico (15 dias – simultâneo)',
        posologia: 'Ornitina: 2 cápsulas antes de dormir com estômago vazio. Óleo de orégano: 1-2 cápsulas 3x ao dia com água.',
        quantidade: '30 cápsulas de ornitina + 45-60 cápsulas de óleo de orégano',
        componentes: [
          { nome: 'L-Ornitina', dose: '550 mg — neutraliza amônia liberada pelos parasitas, melhora sono' },
          { nome: 'Óleo de orégano', dose: '300 mg — antimicrobiano, antifúngico, antiparasitário complementar' },
        ],
        observacao:
          'A ornitina é fundamental: parasitas liberam amônia ao morrer, causando insônia e névoa mental. A ornitina neutraliza essa amônia.',
      },
      {
        nome: 'Manutenção Semanal (após os 30 dias)',
        posologia: 'Tomar 2 cápsulas, 3 vezes ao dia, uma vez por semana (toda segunda-feira), por no mínimo 3 meses',
        quantidade: '60 cápsulas',
        componentes: [
          { nome: 'Óleo de alho', dose: '250 mg — manutenção antiparasitária e antimicrobiana semanal' },
        ],
        observacao:
          'A manutenção semanal com alho impede reinfestação e mantém o ambiente intestinal hostil a parasitas. Repetir o protocolo completo a cada 3 meses.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  //  14. DESPARASITAÇÃO FUNCIONAL INTEGRATIVA
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'desparasitacao-funcional',
    nome: 'Desparasitação Funcional Integrativa',
    emoji: '🔬',
    categoria: 'Desparasitação / Intestino',
    cor: '#00695c',
    corClara: '#e0f2f1',
    icone: 'functional-parasit',
    objetivo:
      'Abordagem integrativa e funcional de desparasitação que vai além da eliminação do parasita — corrige os desequilíbrios secundários gerados por eles: disbiose, permeabilidade intestinal, sobrecarga hepática, inflamação sistêmica e imunossupressão. Protocolo baseado nos fundamentos da Aula 7 – Protocolos de Detoxificação e Desparasitação Funcional (Farmacêutica Tassiane Amaral).',
    indicacoes: [
      'Disbiose intestinal com parasitose associada',
      'Permeabilidade intestinal aumentada (leaky gut)',
      'Inflamação crônica de baixo grau',
      'Beta-glucuronidase elevada',
      'Fatiga crônica com hipersensibilidades alimentares',
      'Pós-tratamento de parasitose convencional (reconstrução)',
      'Pacientes com parasitose subclínica (não detectada em exames comuns)',
    ],
    duracao: '60 dias',
    fase: 'Fase 1 (15 dias) – Suporte hepático e preparação → Fase 2 (15 dias) – Antiparasitário → Fase 3 (30 dias) – Reconstrução microbiota e barreira intestinal',
    cuidados: [
      'Iniciar na lua nova quando possível',
      'Não pular a Fase 3 de reconstrução — é onde ocorre a cura real',
      'Manter hidratação adequada (mínimo 2 L/dia)',
      'Evitar açúcares refinados, farinha branca e ultraprocessados durante todo o protocolo',
      'Reação de Herxheimer esperada na transição para Fase 2',
      'Toda a família deve tratar simultaneamente',
    ],
    efeitos: [
      'Eliminação de parasitas e reequilíbrio da microbiota',
      'Redução da permeabilidade intestinal',
      'Melhora da absorção de nutrientes',
      'Redução da inflamação sistêmica',
      'Melhora da imunidade e redução de alergias',
      'Melhora do humor, sono e energia',
    ],
    contraindicacoes: [
      'Gestação e lactação (avaliar individualmente)',
      'Doença inflamatória intestinal em fase aguda',
      'Uso de imunossupressores (interação possível)',
      'Alergia a componentes da fórmula',
    ],
    fonte: 'Aula 7 – Protocolos de Detoxificação e Desparasitação Funcional – Farmacêutica Tassiane Amaral / Módulo Saúde Gastrointestinal e Microbioma',
    formulacoes: [
      {
        nome: 'Fase 1 – Suporte Hepático e Preparação (15 dias)',
        posologia: 'Tomar 1 cápsula antes do almoço e 1 antes do jantar, por 15 dias',
        quantidade: '30 cápsulas',
        componentes: [
          { nome: 'Silimarina (Cardo Mariano)', dose: '200-300 mg' },
        ],
        observacao:
          'Prepara o fígado para metabolizar as toxinas que serão liberadas pelos parasitas. Sem esse preparo, a Fase 2 pode gerar reações intensas.',
      },
      {
        nome: 'Fase 2 – Antiparasitário Fitoterápico (15 dias)',
        posologia: 'Tomar 20 gotas de cada tintura antes das 3 refeições principais, diluídas em água',
        quantidade: '3 frascos de 50 mL',
        componentes: [
          { nome: 'Tintura-mãe de Caryophyllus aromaticus (Cravo)', dose: '50 mL' },
          { nome: 'Tintura-mãe de Artemisia absinthium (Absinto)', dose: '50 mL' },
          { nome: 'Tintura-mãe de Berberis vulgaris (Bérberis)', dose: '50 mL' },
        ],
        observacao:
          '⚠️ CONTRAINDICADO NA GESTAÇÃO. Monitorar evacuação — aumento das fezes é sinal de eliminação (esperado).',
      },
      {
        nome: 'Fase 2 – Suporte Complementar (15 dias – simultâneo)',
        posologia: 'L-Ornitina: 2 cápsulas à noite em jejum. Óleo de orégano: 1 cápsula 3x/dia com refeições.',
        quantidade: '30 cápsulas ornitina + 45 cápsulas óleo de orégano',
        componentes: [
          { nome: 'L-Ornitina', dose: '550 mg — neutraliza amônia, protege SNC' },
          { nome: 'Óleo de Orégano (Origanum vulgare)', dose: '300 mg — antimicrobiano amplo espectro' },
        ],
        observacao:
          'A ornitina protege o sistema nervoso central da amônia liberada pela morte de parasitas. Fundamental para evitar piora cognitiva e insônia.',
      },
      {
        nome: 'Fase 3 – Reconstrução da Microbiota e Barreira (30 dias)',
        posologia: 'Probiótico: 1 cápsula ao dia, longe do antiparasitário. L-Glutamina: 5g dissolvida em água, em jejum. Alho: 2 cápsulas 3x/semana (segunda-feira).',
        quantidade: '30 cápsulas probiótico + 30 doses L-glutamina + 24 cápsulas alho',
        componentes: [
          { nome: 'Probiótico multiestirpe (Lactobacillus + Bifidobacterium)', dose: 'Mínimo 10 bilhões UFC — recolonização' },
          { nome: 'L-Glutamina', dose: '5 g — reparo da mucosa intestinal e tight junctions' },
          { nome: 'Óleo de alho', dose: '250 mg — manutenção antiparasitária semanal' },
        ],
        observacao:
          'Esta é a fase mais importante para resultados duradouros. Parasitas destroem a barreira intestinal — a L-glutamina e os probióticos são essenciais para reconstruí-la e evitar reinfecção e permeabilidade.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  //  15. DESPARASITAÇÃO PEDIÁTRICA
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'desparasitacao-pediatrica',
    nome: 'Desparasitação Pediátrica Fitoterápica',
    emoji: '👶',
    categoria: 'Desparasitação / Intestino',
    cor: '#e65100',
    corClara: '#fff3e0',
    icone: 'pediatric-parasit',
    objetivo:
      'Eliminação de parasitas intestinais em crianças utilizando formulação fitoterápica segura e palatável em suspensão, com dose ajustada por faixa etária. Indicado para Enterobius vermicularis (oxiúros), Giardia lamblia, Ascaris lumbricoides e outros parasitas comuns na infância.',
    indicacoes: [
      'Prurido anal noturno (oxiúros)',
      'Bruxismo em crianças',
      'Enurese noturna (xixi na cama)',
      'Inapetência sem causa aparente',
      'Dor abdominal recorrente periumbilical',
      'Ranger de dentes ao dormir',
      'Infecções repetidas (imunidade baixa)',
      'Contato com animais domésticos sem desparasitação regular',
    ],
    duracao: '30 dias',
    fase: 'Administrar por 30 dias consecutivos. Iniciar preferencialmente na lua nova. Repetir a cada 3-6 meses.',
    cuidados: [
      'Avaliar com pediatra antes de iniciar',
      'Toda a família deve tratar simultaneamente',
      'Higienizar unhas e lavar mãos frequentemente',
      'Lavar e ferver roupas de cama e roupas íntimas na troca',
      'Não compartilhar toalhas e objetos pessoais',
      'Agitar bem o frasco antes de cada uso',
      'Refrigerar após aberto (manter em geladeira)',
    ],
    efeitos: [
      'Eliminação de parasitas nas fezes',
      'Redução do prurido anal',
      'Melhora do sono e do apetite',
      'Redução do bruxismo',
      'Melhora da disposição e concentração',
    ],
    contraindicacoes: [
      'Crianças < 2 anos (não recomendado sem avaliação pediátrica)',
      'Hipersensibilidade a algum componente',
      'Doença hepática grave',
      'Uso concomitante com anticoagulantes (avaliar)',
    ],
    fonte: 'Guia de Formulações Maria Rocha Farmácia Magistral – Seção Antiparasitários Pediátricos',
    formulacoes: [
      {
        nome: 'Suspensão Antiparasitária Fitoterápica Pediátrica',
        posologia: 'Administrar 2x ao dia conforme idade. De 2-3 anos: 2 mL. De 3-4 anos: 2,5 mL. De 4-6 anos: 3 mL. De 6-10 anos: 4 mL. De 10-12 anos: 5 mL.',
        quantidade: '120 mL',
        componentes: [
          { nome: 'Erva de Santa Maria (Chenopodium ambrosioides)', dose: '0,05 mL — antiparasitária clássica' },
          { nome: 'Cravinho (Caryophyllus aromaticus)', dose: '0,15 mL — mata ovos e larvas' },
          { nome: 'Berberis vulgaris', dose: '0,15 mL — antiprotozoário' },
          { nome: 'Bitter Melon (Momordica charantia)', dose: '0,15 mL — antihelmíntico' },
          { nome: 'Cramberry (Vaccinium macrocarpon)', dose: '0,15 mL — anti-aderência mucosa' },
          { nome: 'Alho (Allium sativum)', dose: '0,10 mL — antimicrobiano e antiparasitário' },
          { nome: 'Orégano (Origanum vulgare)', dose: '0,05 mL — antimicrobiano' },
          { nome: 'Óleo essencial de laranja', dose: '0,2% — palatabilidade e antimicrobiano' },
          { nome: 'Veículo suspensor sem açúcar', dose: 'qsp 2 mL' },
        ],
        observacao:
          'Agitar antes de usar. Administrar 2x ao dia, de preferência antes das refeições. Para crianças ≤ 6 anos: dose máxima conforme orientação pediátrica. Repetir o protocolo a cada 3 meses ou conforme necessidade clínica.',
      },
    ],
  },
];

/**
 * Categorias para filtro rápido na interface
 */
export const DETOX_CATEGORIAS = [
  { id: 'todos', label: 'Todos os Protocolos', emoji: '🌿' },
  { id: 'Sistema Linfático', label: 'Linfático', emoji: '🫁' },
  { id: 'Fígado / Metabolismo', label: 'Hepático', emoji: '🫀' },
  { id: 'Fígado / Vesícula Biliar', label: 'Hepático-Biliar', emoji: '🟡' },
  { id: 'Desparasitação / Intestino', label: 'Desparasitação', emoji: '🦠' },
  { id: 'Metais Pesados / Quelação', label: 'Metais Pesados', emoji: '⚗️' },
  { id: 'Glândulas Adrenais / Cortisol', label: 'Adrenal', emoji: '⚡' },
  { id: 'Intestinos / Microbiota', label: 'Intestinal', emoji: '🌿' },
  { id: 'Mitocôndrias / Celular', label: 'Celular', emoji: '🔬' },
  { id: 'Hormônios / Estrogênio', label: 'Estrogênico', emoji: '🌸' },
  { id: 'Emagrecimento / Metabolismo', label: 'Controle de Peso', emoji: '⚖️' },
  { id: 'Terapia Injetável / Ortomolecular', label: 'Injetável', emoji: '💉' },
];

export default DETOX_PROTOCOLS;
