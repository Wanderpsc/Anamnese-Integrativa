/**
 * Protocolos Terapêuticos Integrativos por Doença Autoimune
 * Fontes: Apostilas de Naturopatia Aplicada IVM, Guia de Formulações Maria Rocha
 *         Farmácia de Manipulação, Protocolos de Detoxificação Funcional,
 *         PROMPT+BUQ+FLORAL.pdf, Apostilas de Fitoterapia Clínica.
 *
 * AVISO LEGAL: Uso exclusivo do terapeuta responsável. Prescrição individualizada.
 * Dosagens e interações devem ser verificadas caso a caso.
 */

export const AUTOIMUNE_PROTOCOLS = {
  // ── PROTOCOLO GERAL (fallback para doenças sem protocolo específico) ──
  _geral: {
    label: 'Protocolo Geral Autoimune',
    fitoterapicos: [
      { nome: 'Uncaria tomentosa (Unha-de-gato)', dose: '300 mg 2×/dia', indicacao: 'Imunomodulação, anti-inflamatório sistêmico' },
      { nome: 'Curcuma longa + piperina', dose: '500 mg curcumina 2×/dia', indicacao: 'Anti-inflamatório, inibição de NFkB' },
      { nome: 'Boswellia serrata', dose: '400 mg 3×/dia', indicacao: 'Modulação da cascata inflamatória' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Imunomoduladora Base',
        posologia: '1 cápsula ao almoço e 1 ao jantar',
        componentes: [
          { nome: 'Vitamina D3', dose: '5.000 UI' },
          { nome: 'Vitamina K2 MK-7', dose: '100 mcg' },
          { nome: 'Ômega-3 (EPA+DHA)', dose: '1.000 mg' },
          { nome: 'Zinco quelado (Albion)', dose: '15 mg' },
          { nome: 'Selênio metionina', dose: '100 mcg' },
        ],
      },
    ],
    florais: [
      { essencia: 'Willow', objetivo: 'Suporte para ressentimento e rigidez emocional em condições crônicas.', posologia: '4 gotas sublinguais 4×/dia por 30–60 dias.' },
      { essencia: 'Crab Apple', objetivo: 'Apoio em depuração e autoconsciência corporal.', posologia: '4 gotas sublinguais 4×/dia por 30–60 dias.' },
      { essencia: 'Walnut', objetivo: 'Estabilidade durante tratamentos crônicos e mudanças progressivas.', posologia: '4 gotas sublinguais 4×/dia por 30–60 dias.' },
      { essencia: 'Olive', objetivo: 'Recuperação de fadiga inflamatória persistente.', posologia: '4 gotas sublinguais 4×/dia por 30–60 dias.' },
    ],
    detox: [
      'Dieta anti-inflamatória: eliminação de glúten, laticínios, açúcar refinado e óleos vegetais refinados',
      'Ômega-3 alta dose (3–4 g EPA+DHA/dia) — resolução da inflamação',
      'Vitamina D3 (manter sérico entre 60–80 ng/mL)',
      'Glutationa reduzida 500 mg/dia — antioxidante mestre',
      'Redução de carga tóxica: pesticidas, metais pesados, plastificantes (BPA)',
    ],
  },

  // ── HASHIMOTO ──────────────────────────────────────────────────────────
  'Hashimoto (tireoidite autoimune)': {
    label: 'Hashimoto — Tireoidite Autoimune',
    fitoterapicos: [
      { nome: 'Ashwagandha KSM-66', dose: '300 mg 2×/dia', indicacao: 'Adaptógeno, suporte tireoidiano, redução de cortisol e Anti-TPO' },
      { nome: 'Melissa officinalis', dose: '300 mg 2×/dia', indicacao: 'Inibição do TSAb, neurossedativo, ansiedade' },
      { nome: 'Curcuma longa + piperina', dose: '500 mg 2×/dia', indicacao: 'Anti-inflamatório tireoidiano, redução de autoanticorpos' },
      { nome: 'Uncaria tomentosa', dose: '300 mg 2×/dia', indicacao: 'Imunomodulação, redução de autoanticorpos Anti-TPO/Anti-Tg' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Tireoidiana Funcional',
        posologia: '1 cápsula pela manhã em jejum (30 min antes do café)',
        componentes: [
          { nome: 'Selênio metionina', dose: '200 mcg' },
          { nome: 'Zinco quelado (Albion)', dose: '30 mg' },
          { nome: 'Vitamina D3', dose: '5.000 UI' },
          { nome: 'Vitamina K2 MK-7', dose: '100 mcg' },
          { nome: 'L-Tirosina', dose: '500 mg' },
          { nome: 'Iodeto de potássio*', dose: '150 mcg (*avaliar individualmente — evitar em Anti-TPO muito elevado)' },
        ],
      },
    ],
    florais: [
      { essencia: 'Walnut', objetivo: 'Adaptação às flutuações hormonais e à transição metabólica.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Scleranthus', objetivo: 'Equilíbrio na instabilidade tireoidiana cíclica (hipotireoidismo ↔ hiper).', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Crab Apple', objetivo: 'Suporte em depuração e autocuidado corporal.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Olive', objetivo: 'Apoio em fadiga crônica associada ao hipotireoidismo de Hashimoto.', posologia: '4 gotas sublinguais 4×/dia.' },
    ],
    detox: [
      'Dieta glúten-free estrita (mínimo 90 dias) — reduz mimetismo molecular Anti-TPO',
      'Redução de goitrogênios crus (brócolis, repolho, couve-flor crus) — cozidos são seguros',
      'Detox hepático leve (Silimarina 140 mg 3×/dia) — melhora conversão T4→T3 hepática',
      'Manter Vitamina D sérica entre 60–80 ng/mL — imunomodulação tireoidiana',
      'Eliminar álcool, tabaco e exposição a perclorato (água filtrada com carvão ativado)',
    ],
  },

  // ── LÚPUS ──────────────────────────────────────────────────────────────
  'Lúpus (LES)': {
    label: 'Lúpus Eritematoso Sistêmico (LES)',
    fitoterapicos: [
      { nome: 'Uncaria tomentosa', dose: '300 mg 3×/dia', indicacao: 'Imunomodulação, anti-inflamatório sistêmico' },
      { nome: 'Boswellia serrata', dose: '500 mg 3×/dia', indicacao: 'Inibição de leucotrienos, dor e inflamação articular' },
      { nome: 'Curcumina lipossomal', dose: '500 mg 2×/dia', indicacao: 'Anti-NFkB, inibição do flare' },
      { nome: 'Silymarin (Silybum marianum)', dose: '140 mg 3×/dia', indicacao: 'Hepatoproteção durante tratamento alopático' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Anti-Inflamatória Sistêmica LES',
        posologia: '1 cápsula ao almoço e 1 ao jantar',
        componentes: [
          { nome: 'Vitamina D3', dose: '10.000 UI' },
          { nome: 'Vitamina K2 MK-7', dose: '200 mcg' },
          { nome: 'CoQ10 (Ubiquinol)', dose: '100 mg' },
          { nome: 'N-Acetil-Cisteína (NAC)', dose: '600 mg' },
          { nome: 'Ácido Alfa-Lipóico (ALA)', dose: '200 mg' },
          { nome: 'Vitamina E (tocoferóis mistos)', dose: '200 UI' },
        ],
      },
    ],
    florais: [
      { essencia: 'Willow', objetivo: 'Suporte para ressentimento e fadiga emocional crônica.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Olive', objetivo: 'Apoio em exaustão profunda durante crises (flares).', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Star of Bethlehem', objetivo: 'Processamento emocional de choques e traumas ligados ao diagnóstico.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Walnut', objetivo: 'Estabilidade em processos crônicos com flutuações intensas.', posologia: '4 gotas sublinguais 4×/dia.' },
    ],
    detox: [
      'Dieta anti-inflamatória: sem glúten, sem alimentos ultra-processados, sem açúcar refinado',
      'Fotoproteção nutricional: astaxantina 4 mg/dia + vitamina C 2 g/dia — proteção UV endógena',
      'Protocolo anti-NFkB: cúrcuma + resveratrol (200 mg/dia) + quercetina (500 mg/dia)',
      'NAC 600 mg 2×/dia — redução de estresse oxidativo (marcador relevante no LES)',
      '⚠️ Evitar alfafa (Medicago sativa) — contém canavanina, que pode exacerbar LES',
    ],
  },

  // ── ARTRITE REUMATOIDE ─────────────────────────────────────────────────
  'Artrite reumatoide': {
    label: 'Artrite Reumatoide',
    fitoterapicos: [
      { nome: 'Boswellia serrata', dose: '500 mg 3×/dia', indicacao: 'Inibição de leucotrienos 5-LO, dor e rigidez articular matinal' },
      { nome: 'Curcuma longa + piperina', dose: '1.000 mg 2×/dia', indicacao: 'Anti-inflamatório, inibição de COX-2 e NFkB' },
      { nome: 'Zingiber officinale (Gengibre)', dose: '500 mg 3×/dia', indicacao: 'Anti-inflamatório, redução de citocinas pró-inflamatórias' },
      { nome: 'Uncaria tomentosa', dose: '300 mg 2×/dia', indicacao: 'Imunomodulação, redução de TNF-α e IL-1β' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Anti-Artrítica Funcional',
        posologia: '2 cápsulas com o almoço',
        componentes: [
          { nome: 'Colágeno tipo II não-desnaturado (UC-II)', dose: '40 mg' },
          { nome: 'Ômega-3 (EPA+DHA)', dose: '1.500 mg' },
          { nome: 'Vitamina D3', dose: '5.000 UI' },
          { nome: 'Vitamina K2 MK-7', dose: '100 mcg' },
          { nome: 'Magnésio quelado', dose: '200 mg' },
          { nome: 'Boswellia extrato seco (65% ác. boswélico)', dose: '200 mg' },
        ],
      },
    ],
    florais: [
      { essencia: 'Willow', objetivo: 'Suporte para rigidez emocional e ressentimento crônico associado à dor.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Oak', objetivo: 'Apoio para quem persiste sem recuperação — exaustão de luta crônica.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Impatiens', objetivo: 'Redução de tensão interna e hiperreatividade à dor.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Crab Apple', objetivo: 'Depuração e autoconsciência corporal.', posologia: '4 gotas sublinguais 4×/dia.' },
    ],
    detox: [
      'Eliminação de nightshades por 60 dias (tomate, berinjela, pimentão, batata — solanáceas)',
      'Dieta anti-inflamatória mediterrânea + rica em antioxidantes',
      'Ômega-3 alta dose (3–4 g EPA+DHA/dia) — resolução de mediadores inflamatórios',
      'Redução de glúten e laticínios — reduz permeabilidade intestinal e carga antigênica',
      'Glutationa reduzida 500 mg/dia + vitamina C lipossomal 2 g/dia',
    ],
  },

  // ── DOENÇA DE CROHN ────────────────────────────────────────────────────
  'Doença de Crohn': {
    label: 'Doença de Crohn',
    fitoterapicos: [
      { nome: 'Aloe vera gel puro', dose: '50 mL 2×/dia em jejum', indicacao: 'Cicatrização da mucosa intestinal, anti-inflamatório local' },
      { nome: 'Boswellia serrata', dose: '400 mg 3×/dia', indicacao: 'Inibição de leucotrienos, remissão da inflamação ileal' },
      { nome: 'Curcumina lipossomal', dose: '500 mg 2×/dia', indicacao: 'Anti-inflamatório intestinal, redução de calprotectina fecal' },
      { nome: 'Berberina', dose: '500 mg 2×/dia (com refeição)', indicacao: 'Disbiose, controle de supercrescimento bacteriano (SIBO)' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Restauração Intestinal Crohn',
        posologia: '1 medida (pó) em jejum pela manhã e à noite',
        componentes: [
          { nome: 'L-Glutamina', dose: '5.000 mg' },
          { nome: 'Zinco carnosina', dose: '75 mg' },
          { nome: 'Colostro bovino', dose: '500 mg' },
          { nome: 'Vitamina D3', dose: '5.000 UI' },
          { nome: 'Aloe vera extrato seco (200:1)', dose: '100 mg' },
          { nome: 'Slippery Elm (Ulmus rubra)', dose: '400 mg' },
        ],
      },
    ],
    florais: [
      { essencia: 'Agrimony', objetivo: 'Tensão emocional reprimida que repercute no trato digestivo.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Beech', objetivo: 'Intolerância corporal e reatividade crônica a estímulos.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Crab Apple', objetivo: 'Limpeza e reorganização do terreno intestinal.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Elm', objetivo: 'Sobrecarga psicofisiológica crônica e sensação de não dar conta.', posologia: '4 gotas sublinguais 4×/dia.' },
    ],
    detox: [
      'Protocolo 5R: Remove (alimentos gatilho) → Replace (enzimas) → Re-inocula (probióticos) → Repara (L-glutamina) → Reequilibra',
      'Dieta low-FODMAP nas crises — redução de fermentação e sintomas agudos',
      'Eliminação de glúten, laticínios e álcool durante remissão e crises',
      'Saccharomyces boulardii 500 mg 2×/dia — manutenção da remissão intestinal',
      'Manter Vitamina D sérica > 60 ng/mL — imunomodulação e barreira epitelial',
    ],
  },

  // ── COLITE ULCERATIVA ─────────────────────────────────────────────────
  'Colite ulcerativa': {
    label: 'Colite Ulcerativa',
    fitoterapicos: [
      { nome: 'Aloe vera gel puro', dose: '50 mL 2×/dia em jejum', indicacao: 'Cicatrização da mucosa colônica' },
      { nome: 'Curcumina lipossomal', dose: '500 mg 3×/dia', indicacao: 'Inibição de NFkB, redução de calprotectina fecal' },
      { nome: 'Boswellia serrata', dose: '400 mg 3×/dia', indicacao: 'Remissão da inflamação colônica' },
      { nome: 'Psyllium husk', dose: '10 g/dia em água', indicacao: 'Fibra solúvel, produção de butirato, proteção colônica' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Restauração Intestinal Colite',
        posologia: '1 medida (pó) pela manhã em jejum',
        componentes: [
          { nome: 'L-Glutamina', dose: '5.000 mg' },
          { nome: 'Zinco carnosina', dose: '75 mg' },
          { nome: 'Butirato de sódio (Bu-Cap)', dose: '600 mg' },
          { nome: 'Vitamina D3', dose: '5.000 UI' },
          { nome: 'Curcumina fitossoma (Meriva)', dose: '500 mg' },
        ],
      },
    ],
    florais: [
      { essencia: 'Agrimony', objetivo: 'Tensão emocional que repercute no trato digestivo.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Beech', objetivo: 'Intolerância corporal e reatividade crônica.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Crab Apple', objetivo: 'Reorganização do terreno intestinal e autocuidado.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Willow', objetivo: 'Suporte em estados crônicos com oscilação intensa.', posologia: '4 gotas sublinguais 4×/dia.' },
    ],
    detox: [
      'Dieta low-FODMAP durante crises agudas',
      'Eliminação de glúten, laticínios e açúcar refinado na remissão',
      'Butirato de sódio — fortalecimento das tight junctions colônicas',
      'Probióticos de alta dose: VSL#3 ou multi-cepa > 50 bilhões UFC/dia',
      'Redução de estresse — eixo intestino-cérebro-imunidade é determinante',
    ],
  },

  // ── PSORÍASE ──────────────────────────────────────────────────────────
  'Psoríase': {
    label: 'Psoríase',
    fitoterapicos: [
      { nome: 'Silymarin (Silybum marianum)', dose: '140 mg 3×/dia', indicacao: 'Hepatoproteção, inibição da proliferação epidérmica' },
      { nome: 'Curcuma + piperina', dose: '1.000 mg 2×/dia', indicacao: 'Anti-inflamatório, redução de IL-17 e IL-23' },
      { nome: 'Mahonia aquifolium (Oregon grape)', dose: '250 mg 3×/dia', indicacao: 'Inibição da proliferação keratinocítica' },
      { nome: 'Aloe vera gel (tópico e oral)', dose: '30 mL 2×/dia (oral)', indicacao: 'Anti-inflamatório, suporte à barreira cutânea' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Dermatológica Autoimune',
        posologia: '1 cápsula no café e 1 no jantar',
        componentes: [
          { nome: 'Vitamina D3', dose: '10.000 UI' },
          { nome: 'Vitamina K2 MK-7', dose: '200 mcg' },
          { nome: 'Ômega-3 (EPA+DHA)', dose: '2.000 mg' },
          { nome: 'Zinco quelado', dose: '30 mg' },
          { nome: 'N-Acetil-Cisteína (NAC)', dose: '600 mg' },
          { nome: 'Biotina', dose: '2.500 mcg' },
        ],
      },
    ],
    florais: [
      { essencia: 'Crab Apple', objetivo: 'Autocuidado, pureza e processamento da imagem corporal.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Beech', objetivo: 'Tolerância interna e redução de hipersensibilidade.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Willow', objetivo: 'Suporte para insatisfação e ressentimento crônico.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Rock Water', objetivo: 'Rigidez e autocrítica excessiva — flexibilização interna.', posologia: '4 gotas sublinguais 4×/dia.' },
    ],
    detox: [
      'Detox hepático (silimarina 140 mg 3×/dia + alcachofra 300 mg) — fígado sobrecarregado agrava psoríase',
      'Eliminação de glúten e laticínios por 90 dias',
      'Redução de açúcar e álcool — precipitadores de flare cutâneo',
      'Vitamina D3 sérica manter entre 60–80 ng/mL',
      'Probióticos + L-glutamina 5 g/dia — eixo intestino-pele (gut-skin axis)',
    ],
  },

  // ── ESCLEROSE MÚLTIPLA ────────────────────────────────────────────────
  'Esclerose múltipla': {
    label: 'Esclerose Múltipla',
    fitoterapicos: [
      { nome: 'Uncaria tomentosa', dose: '300 mg 2×/dia', indicacao: 'Imunomodulação, neuroproteção' },
      { nome: 'Curcumina lipossomal', dose: '500 mg 2×/dia', indicacao: 'Anti-inflamatório neural, redução de desmielinização' },
      { nome: 'Ginkgo biloba', dose: '120 mg/dia', indicacao: 'Circulação cerebral, cognição, fadiga cognitiva' },
      { nome: 'Cannabis sativa CBD (onde permitido)', dose: 'Conforme prescrição médica', indicacao: 'Espasticidade, dor neuropática, qualidade do sono' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Neuroprotetora EM',
        posologia: '1 cápsula pela manhã',
        componentes: [
          { nome: 'Vitamina D3', dose: '10.000 UI' },
          { nome: 'Vitamina K2 MK-7', dose: '200 mcg' },
          { nome: 'Ômega-3 DHA', dose: '2.000 mg' },
          { nome: 'Vitamina B12 (metilcobalamina)', dose: '5.000 mcg' },
          { nome: 'Folato (5-MTHF)', dose: '800 mcg' },
          { nome: 'Biotina (mega-dose — Protocolo MD1201)*', dose: '100.000 mcg (*apenas sob acompanhamento clínico especializado)' },
        ],
      },
    ],
    florais: [
      { essencia: 'Walnut', objetivo: 'Adaptação a mudanças neurológicas progressivas.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Olive', objetivo: 'Apoio energético global para sobrecarga neurofuncional.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Clematis', objetivo: 'Foco, presença mental e clareza cognitiva.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Gorse', objetivo: 'Suporte em desesperança ou exaustão da luta terapêutica.', posologia: '4 gotas sublinguais 4×/dia.' },
    ],
    detox: [
      'Protocolo de Coimbra (vitamina D alta dose) — apenas sob acompanhamento especializado',
      'Dieta sem glúten e sem laticínios (protocolo Swank/McDougall modificado)',
      'Ômega-3 DHA alta dose (2–4 g/dia) — suporte à mielinização',
      'NAC + glutationa reduzida — proteção neuronal contra estresse oxidativo',
      'Redução de metais pesados: mercúrio (evitar peixes predadores), chumbo, alumínio',
    ],
  },

  // ── VITILIGO ──────────────────────────────────────────────────────────
  'Vitiligo': {
    label: 'Vitiligo',
    fitoterapicos: [
      { nome: 'Ginkgo biloba', dose: '120 mg/dia', indicacao: 'Antioxidante, estabilização do vitiligo, neuroproteção melanocítica' },
      { nome: 'Curcuma + piperina', dose: '500 mg 2×/dia', indicacao: 'Anti-inflamatório, proteção dos melanócitos' },
      { nome: 'Psoralea corylifolia (Bakuchi)', dose: 'Uso tópico sob orientação profissional', indicacao: 'Repigmentação (uso externo associado à fototerapia)' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Vitiligo Sistêmica',
        posologia: '1 cápsula pela manhã',
        componentes: [
          { nome: 'Vitamina D3', dose: '10.000 UI' },
          { nome: 'Vitamina K2 MK-7', dose: '200 mcg' },
          { nome: 'Vitamina B12 (metilcobalamina)', dose: '5.000 mcg' },
          { nome: 'Folato (5-MTHF)', dose: '5.000 mcg' },
          { nome: 'Zinco quelado', dose: '30 mg' },
          { nome: 'Cobre aminoácido quelado', dose: '2 mg' },
          { nome: 'L-Fenilalanina', dose: '500 mg' },
        ],
      },
    ],
    florais: [
      { essencia: 'Crab Apple', objetivo: 'Processamento da imagem corporal e aceitação da pele.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Larch', objetivo: 'Autoconfiança e autoestima na convivência com a condição.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Pine', objetivo: 'Suporte para sentimentos de culpa ou vergonha.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Walnut', objetivo: 'Adaptação às mudanças corporais progressivas.', posologia: '4 gotas sublinguais 4×/dia.' },
    ],
    detox: [
      'Manter Vitamina D sérica > 60 ng/mL — imunomodulação e proteção melanocítica',
      'Eliminar glúten e laticínios (associação com autoimunidade cutânea)',
      'Antioxidantes sistêmicos: vitamina C 2 g/dia + vitamina E 400 UI + selênio 200 mcg',
      'Evitar estresse oxidativo: tabagismo, álcool, radiação UV excessiva sem proteção',
      'Fototerapia NB-UVB — sinergia com tratamento nutricional',
    ],
  },

  // ── SÍNDROME DE SJÖGREN ───────────────────────────────────────────────
  'Síndrome de Sjögren': {
    label: 'Síndrome de Sjögren',
    fitoterapicos: [
      { nome: 'Uncaria tomentosa', dose: '300 mg 2×/dia', indicacao: 'Imunomodulação, anti-inflamatório glandular' },
      { nome: 'Boswellia serrata', dose: '400 mg 3×/dia', indicacao: 'Redução de infiltrado linfocítico glandular' },
      { nome: 'Aloe vera gel', dose: '30 mL 2×/dia (oral) + uso tópico', indicacao: 'Lubrificação de mucosas, anti-inflamatório' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Sjögren — Suporte Glandular',
        posologia: '1 cápsula ao almoço e 1 ao jantar',
        componentes: [
          { nome: 'Vitamina D3', dose: '5.000 UI' },
          { nome: 'Ômega-3 (EPA+DHA)', dose: '2.000 mg' },
          { nome: 'Vitamina A (retinol acetato)', dose: '5.000 UI' },
          { nome: 'Vitamina E (tocoferóis mistos)', dose: '400 UI' },
          { nome: 'Zinco quelado', dose: '30 mg' },
          { nome: 'NAC (N-Acetil-Cisteína)', dose: '600 mg' },
        ],
      },
    ],
    florais: [
      { essencia: 'Willow', objetivo: 'Suporte para ressecamento emocional e fadiga crônica.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Olive', objetivo: 'Restauração energética em exaustão glandular.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Walnut', objetivo: 'Estabilidade em processo crônico autoimune.', posologia: '4 gotas sublinguais 4×/dia.' },
    ],
    detox: [
      'Hidratação intensiva: 2,5–3 L de água filtrada/dia',
      'Ômega-3 alta dose — lubrificação de mucosas e anti-inflamatório glandular',
      'Vitamina A lipossomal — regeneração epitelial de mucosas (olhos, boca, vagina)',
      'Evitar glúten e laticínios — associados a maior permeabilidade intestinal e carga imunológica',
      'Evitar ambientes secos (usar umidificador) e medicamentos anticolinérgicos',
    ],
  },

  // ── FIBROMIALGIA ──────────────────────────────────────────────────────
  'Fibromialgia': {
    label: 'Fibromialgia',
    fitoterapicos: [
      { nome: 'Ashwagandha KSM-66', dose: '600 mg/dia', indicacao: 'Adaptógeno, redução de cortisol, melhora do sono e dor' },
      { nome: 'Griffonia simplicifolia (5-HTP)', dose: '100 mg 2×/dia', indicacao: 'Precursor de serotonina e melatonina, dor crônica' },
      { nome: 'Valeriana + Passiflora', dose: '300+300 mg antes de dormir', indicacao: 'Melhora do sono não-reparador — central na fibromialgia' },
      { nome: 'Boswellia serrata', dose: '400 mg 3×/dia', indicacao: 'Anti-inflamatório, dor difusa e músculo-esquelética' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Fibromialgia — Noturna',
        posologia: '1 cápsula 30 min antes de dormir',
        componentes: [
          { nome: 'Magnésio treonato', dose: '2.000 mg (equiv. 144 mg Mg elementar)' },
          { nome: '5-HTP (Griffonia simplicifolia)', dose: '100 mg' },
          { nome: 'GABA lipossomal', dose: '250 mg' },
          { nome: 'Melatonina', dose: '1 mg' },
          { nome: 'L-Teanina', dose: '200 mg' },
          { nome: 'Vitamina B6 (P-5-P)', dose: '25 mg' },
        ],
      },
      {
        nome: 'Fórmula Fibromialgia — Diurna',
        posologia: '1 cápsula pela manhã',
        componentes: [
          { nome: 'CoQ10 (Ubiquinol)', dose: '200 mg' },
          { nome: 'SAMe (S-Adenosilmetionina)', dose: '200 mg' },
          { nome: 'Vitamina D3', dose: '5.000 UI' },
          { nome: 'Ômega-3 DHA', dose: '1.000 mg' },
        ],
      },
    ],
    florais: [
      { essencia: 'Olive', objetivo: 'Exaustão física e mental persistente — ausência de reserva.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Hornbeam', objetivo: 'Cansaço ao acordar, fadiga antes do esforço.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Impatiens', objetivo: 'Redução de tensão interna e hiperreatividade à dor.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'White Chestnut', objetivo: 'Pensamentos repetitivos e ruminação sobre a dor.', posologia: '4 gotas sublinguais 4×/dia.' },
    ],
    detox: [
      'Eliminação de MSG, aspartame e glutamato — amplificadores de dor central (sensibilização central)',
      'Redução de cafeína após 14h — impacto direto na qualidade do sono',
      'Protocolo de sono: higiene + melatonina 1 mg + magnésio treonato',
      'NAC 600 mg 2×/dia — redução do estresse oxidativo mitocondrial',
      'Dieta anti-inflamatória: sem glúten, sem laticínios, rica em antioxidantes e ômega-3',
    ],
  },

  // ── DOENÇA CELÍACA ────────────────────────────────────────────────────
  'Doença celíaca': {
    label: 'Doença Celíaca',
    fitoterapicos: [
      { nome: 'Berberina', dose: '500 mg 2×/dia (com refeição)', indicacao: 'Restauração da microbiota, controle de SIBO pós-celíaco' },
      { nome: 'Aloe vera gel puro', dose: '30 mL 2×/dia em jejum', indicacao: 'Cicatrização das vilosidades intestinais' },
      { nome: 'Slippery Elm (Ulmus rubra)', dose: '500 mg 3×/dia', indicacao: 'Proteção e regeneração da mucosa intestinal' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Celíaca — Restauração Nutricional',
        posologia: '1 medida (pó) pela manhã e 1 à noite em jejum',
        componentes: [
          { nome: 'L-Glutamina', dose: '5.000 mg' },
          { nome: 'Zinco carnosina', dose: '75 mg' },
          { nome: 'Vitamina D3', dose: '5.000 UI' },
          { nome: 'Vitamina B12 (metilcobalamina)', dose: '1.000 mcg' },
          { nome: 'Folato (5-MTHF)', dose: '400 mcg' },
          { nome: 'Ferro bisglicinato', dose: '25 mg' },
        ],
      },
    ],
    florais: [
      { essencia: 'Agrimony', objetivo: 'Tensão emocional que repercute no trato digestivo.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Crab Apple', objetivo: 'Depuração e reorganização do terreno intestinal.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Walnut', objetivo: 'Adaptação às restrições alimentares permanentes.', posologia: '4 gotas sublinguais 4×/dia.' },
    ],
    detox: [
      '⚠️ Dieta glúten-free estrita e vitalícia — rastreamento de glúten oculto (medicamentos, molhos, salsas, aveia não certificada)',
      'Reposição de vitaminas lipossolúveis A, D, E, K — comumente deficientes na celíaca',
      'L-glutamina + zinco carnosina — restauração das vilosidades intestinais',
      'Probióticos: Lactobacillus plantarum + Bifidobacterium longum (≥ 30 bilhões UFC)',
      'Monitorar: Vitamina D, B12, Ferro, Ferritina, Folato, Cálcio, Magnésio sérico',
    ],
  },

  // ── DIABETES TIPO 1 ───────────────────────────────────────────────────
  'Diabetes tipo 1': {
    label: 'Diabetes Tipo 1 (Autoimune)',
    fitoterapicos: [
      { nome: 'Gymnema sylvestre', dose: '400 mg 2×/dia (com refeição)', indicacao: 'Suporte na sensibilidade insulínica, regeneração de células beta' },
      { nome: 'Berberina', dose: '500 mg 2×/dia', indicacao: 'Modulação da glicemia, proteção das células beta pancreáticas' },
      { nome: 'Curcuma + piperina', dose: '500 mg 2×/dia', indicacao: 'Anti-inflamatório, proteção pancreática' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Suporte Pancreático DM1',
        posologia: '1 cápsula ao almoço e jantar',
        componentes: [
          { nome: 'Vitamina D3', dose: '5.000 UI' },
          { nome: 'Zinco quelado', dose: '30 mg' },
          { nome: 'Cromo picolinato', dose: '200 mcg' },
          { nome: 'N-Acetil-Cisteína (NAC)', dose: '600 mg' },
          { nome: 'Ácido Alfa-Lipóico (ALA)', dose: '300 mg' },
          { nome: 'CoQ10 (Ubiquinol)', dose: '100 mg' },
        ],
      },
    ],
    florais: [
      { essencia: 'Walnut', objetivo: 'Adaptação ao diagnóstico e ao manejo diário exigente.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Olive', objetivo: 'Suporte energético na fadiga metabólica crônica.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Rock Rose', objetivo: 'Crises hipoglicêmicas — medo e pânico agudo.', posologia: '4 gotas sublinguais a cada 30 min nas crises.' },
      { essencia: 'Elm', objetivo: 'Sobrecarga do manejo diário contínuo e contagem de carboidratos.', posologia: '4 gotas sublinguais 4×/dia.' },
    ],
    detox: [
      '⚠️ NUNCA interromper insulinoterapia sem supervisão médica',
      'Dieta de baixo índice glicêmico — controle glicêmico estável e redução de picos',
      'Ácido alfa-lipóico (ALA) — proteção contra neuropatia diabética periférica',
      'Vitamina D3 manter > 60 ng/mL — imunomodulação e proteção das células beta remanescentes',
      'NAC 600 mg 2×/dia — redução do estresse oxidativo pancreático',
    ],
  },

  // ── ESCLERODERMIA ─────────────────────────────────────────────────────
  'Esclerodermia': {
    label: 'Esclerodermia (Esclerose Sistêmica)',
    fitoterapicos: [
      { nome: 'Uncaria tomentosa', dose: '300 mg 2×/dia', indicacao: 'Imunomodulação, ação anti-fibrótica' },
      { nome: 'Curcumina lipossomal', dose: '500 mg 2×/dia', indicacao: 'Inibição de TGF-β, anti-fibrótico sistêmico' },
      { nome: 'Ginkgo biloba', dose: '120 mg 2×/dia', indicacao: 'Vasodilatador periférico, fenômeno de Raynaud' },
      { nome: 'N-Acetil-Cisteína (NAC) oral', dose: '600 mg 2×/dia', indicacao: 'Antioxidante, suporte pulmonar e vascular' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Esclerodermia Sistêmica',
        posologia: '1 cápsula ao almoço e jantar',
        componentes: [
          { nome: 'Vitamina D3', dose: '5.000 UI' },
          { nome: 'Vitamina E (tocoferóis mistos)', dose: '400 UI' },
          { nome: 'Ômega-3 (EPA+DHA)', dose: '2.000 mg' },
          { nome: 'N-Acetil-Cisteína', dose: '600 mg' },
          { nome: 'Ácido Alfa-Lipóico (ALA)', dose: '200 mg' },
          { nome: 'Silimarina', dose: '140 mg' },
        ],
      },
    ],
    florais: [
      { essencia: 'Rock Water', objetivo: 'Rigidez interna e inflexibilidade — suporte à elasticidade psicoemocional.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Walnut', objetivo: 'Adaptação a processo crônico progressivo e multissistêmico.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Willow', objetivo: 'Suporte para ressentimento e frustração crônica.', posologia: '4 gotas sublinguais 4×/dia.' },
      { essencia: 'Olive', objetivo: 'Exaustão multissistêmica e fadiga profunda.', posologia: '4 gotas sublinguais 4×/dia.' },
    ],
    detox: [
      'Dieta anti-inflamatória: sem glúten, sem laticínios, rica em antioxidantes',
      'Vitamina E + C + Selênio 200 mcg — proteção tecidual contra fibrose e estresse oxidativo',
      'NAC sistêmica — suporte pulmonar intersticial e antioxidante vascular',
      'Ginkgo biloba — vasodilatação periférica e controle do fenômeno de Raynaud',
      'Fisioterapia + mobilizações articulares — manutenção da amplitude de movimento',
    ],
  },
};

/**
 * Retorna o protocolo para uma doença autoimune específica.
 * Se não houver protocolo específico, retorna o protocolo geral.
 */
export function getAutoimuneProtocol(doencaNome) {
  return AUTOIMUNE_PROTOCOLS[doencaNome] || AUTOIMUNE_PROTOCOLS['_geral'];
}
