// Base de dados completa: Exames Laboratoriais e suas Finalidades
// Sistema de Solicitação de Exames

export const LABORATORY_EXAMS_DATABASE = {
  // ===== EXAMES HEMATOLÓGICOS =====
  'Hemograma': {
    name: 'Hemograma',
    category: 'Hematologia',
    objective: 'Avalia células do sangue (hemácias, leucócitos, plaquetas). Detecta anemias, infecções, leucemias e distúrbios de coagulação.',
    preparation: 'Jejum de 4 horas',
    material: 'Sangue (EDTA)'
  },
  'Ferritina': {
    name: 'Ferritina',
    category: 'Metabolismo do Ferro',
    objective: 'Avalia os estoques de ferro no organismo. Útil para diagnóstico de anemia ferropriva e hemocromatose. Também marcador inflamatório.',
    preparation: 'Jejum de 8-12 horas',
    material: 'Soro'
  },
  'Ferro (sérico)': {
    name: 'Ferro Sérico',
    category: 'Metabolismo do Ferro',
    objective: 'Mede o ferro circulante no sangue. Auxilia no diagnóstico de anemias e sobrecarga de ferro.',
    preparation: 'Jejum de 8-12 horas',
    material: 'Soro'
  },
  'Sat. transferrina': {
    name: 'Saturação de Transferrina',
    category: 'Metabolismo do Ferro',
    objective: 'Indica o percentual de ferro ligado à transferrina. Útil para diagnóstico de hemocromatose.',
    preparation: 'Jejum de 8-12 horas',
    material: 'Soro'
  },
  'Transferrina Livre': {
    name: 'Transferrina Livre',
    category: 'Metabolismo do Ferro',
    objective: 'Proteína que transporta ferro no sangue. Avalia capacidade de transporte de ferro.',
    preparation: 'Jejum de 8-12 horas',
    material: 'Soro'
  },

  // ===== BIOQUÍMICA =====
  'Glicose': {
    name: 'Glicose em Jejum',
    category: 'Metabolismo de Carboidratos',
    objective: 'Avalia níveis de açúcar no sangue. Diagnóstico e monitoramento de diabetes mellitus.',
    preparation: 'Jejum de 8-12 horas',
    material: 'Plasma fluoreto'
  },
  'Hemoglobina glicada': {
    name: 'Hemoglobina Glicada (HbA1c)',
    category: 'Metabolismo de Carboidratos',
    objective: 'Reflete o controle glicêmico dos últimos 2-3 meses. Essencial no monitoramento de diabetes.',
    preparation: 'Não requer jejum',
    material: 'Sangue (EDTA)'
  },
  'Insulina': {
    name: 'Insulina',
    category: 'Metabolismo de Carboidratos',
    objective: 'Avalia produção pancreática de insulina. Útil para diagnóstico de resistência insulínica e hiperinsulinismo.',
    preparation: 'Jejum de 8-12 horas',
    material: 'Soro'
  },
  'Peptídeo C': {
    name: 'Peptídeo C',
    category: 'Metabolismo de Carboidratos',
    objective: 'Avalia a produção endógena de insulina. Diferencia diabetes tipo 1 de tipo 2.',
    preparation: 'Jejum de 8-12 horas',
    material: 'Soro'
  },
  'HOMA - IR': {
    name: 'HOMA-IR (Índice de Resistência Insulínica)',
    category: 'Metabolismo de Carboidratos',
    objective: 'Calcula a resistência à insulina. Essencial para síndrome metabólica e pré-diabetes.',
    preparation: 'Jejum de 8-12 horas (calculado a partir de glicose e insulina)',
    material: 'Calculado'
  },

  // ===== PERFIL LIPÍDICO =====
  'Colest. TOTAL': {
    name: 'Colesterol Total',
    category: 'Perfil Lipídico',
    objective: 'Avalia colesterol total no sangue. Avaliação de risco cardiovascular.',
    preparation: 'Jejum de 12 horas',
    material: 'Soro'
  },
  'HDL': {
    name: 'HDL Colesterol (Bom Colesterol)',
    category: 'Perfil Lipídico',
    objective: 'Colesterol "bom" que remove gordura das artérias. Protetor cardiovascular.',
    preparation: 'Jejum de 12 horas',
    material: 'Soro'
  },
  'LDL': {
    name: 'LDL Colesterol (Colesterol Ruim)',
    category: 'Perfil Lipídico',
    objective: 'Colesterol "ruim" que se deposita nas artérias. Principal fator de risco cardiovascular.',
    preparation: 'Jejum de 12 horas',
    material: 'Soro'
  },
  'VLDL': {
    name: 'VLDL Colesterol',
    category: 'Perfil Lipídico',
    objective: 'Lipoproteína de muito baixa densidade. Transporta triglicérides.',
    preparation: 'Jejum de 12 horas',
    material: 'Soro'
  },
  'Triglicerides': {
    name: 'Triglicérides',
    category: 'Perfil Lipídico',
    objective: 'Principal forma de gordura armazenada. Fator de risco cardiovascular.',
    preparation: 'Jejum de 12 horas',
    material: 'Soro'
  },
  'Apo A1': {
    name: 'Apolipoproteína A1',
    category: 'Perfil Lipídico',
    objective: 'Principal proteína do HDL. Marcador de proteção cardiovascular.',
    preparation: 'Jejum de 12 horas',
    material: 'Soro'
  },
  'Apo B': {
    name: 'Apolipoproteína B',
    category: 'Perfil Lipídico',
    objective: 'Principal proteína do LDL e VLDL. Marcador de risco cardiovascular.',
    preparation: 'Jejum de 12 horas',
    material: 'Soro'
  },
  'Lp(a)': {
    name: 'Lipoproteína (a)',
    category: 'Perfil Lipídico',
    objective: 'Fator de risco cardiovascular independente. Aumenta risco de aterosclerose.',
    preparation: 'Jejum de 12 horas',
    material: 'Soro'
  },
  'Apolipoproteina E': {
    name: 'Apolipoproteína E (Genotipagem)',
    category: 'Perfil Lipídico',
    objective: 'Avalia predisposição genética para dislipidemia e doença de Alzheimer.',
    preparation: 'Não requer jejum',
    material: 'Sangue (EDTA)'
  },

  // ===== FUNÇÃO RENAL =====
  'Uréia': {
    name: 'Ureia',
    category: 'Função Renal',
    objective: 'Avalia função renal e metabolismo proteico. Aumenta em insuficiência renal.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Creatinina (soro)': {
    name: 'Creatinina Sérica',
    category: 'Função Renal',
    objective: 'Principal marcador de função renal. Aumenta quando os rins filtram menos.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'TFG': {
    name: 'Taxa de Filtração Glomerular (TFG)',
    category: 'Função Renal',
    objective: 'Calcula a capacidade de filtração dos rins. Avalia estágio de doença renal crônica.',
    preparation: 'Calculado a partir da creatinina',
    material: 'Calculado'
  },
  'Cistatina C': {
    name: 'Cistatina C',
    category: 'Função Renal',
    objective: 'Marcador precoce de disfunção renal. Mais sensível que creatinina.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Ácido Úrico': {
    name: 'Ácido Úrico',
    category: 'Função Renal / Metabolismo',
    objective: 'Avalia metabolismo de purinas. Diagnóstico de gota e risco cardiovascular.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Urina rotina': {
    name: 'Urina Rotina (EAS)',
    category: 'Função Renal',
    objective: 'Analisa características físicas, químicas e sedimento urinário. Detecta infecções, sangramento, proteínas.',
    preparation: 'Primeira urina da manhã',
    material: 'Urina'
  },
  'Albumina': {
    name: 'Albumina',
    category: 'Função Hepática / Nutricional',
    objective: 'Avalia função hepática e estado nutricional. Transporta substâncias no sangue.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Pré-albumina': {
    name: 'Pré-albumina',
    category: 'Nutricional',
    objective: 'Marcador precoce de desnutrição. Responde rapidamente a mudanças nutricionais.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },

  // ===== FUNÇÃO HEPÁTICA =====
  'TGO': {
    name: 'TGO (AST)',
    category: 'Função Hepática',
    objective: 'Enzima hepática. Avalia lesão hepatocelular e muscular.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'TGP': {
    name: 'TGP (ALT)',
    category: 'Função Hepática',
    objective: 'Enzima hepática. Mais específica para lesão hepática.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Gama GT': {
    name: 'Gama GT (GGT)',
    category: 'Função Hepática',
    objective: 'Enzima de vias biliares. Marcador de colestase e consumo de álcool.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Fosfatase Alcalina': {
    name: 'Fosfatase Alcalina',
    category: 'Função Hepática / Óssea',
    objective: 'Enzima de ossos e vias biliares. Aumenta em colestase e doenças ósseas.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Bilirrubina TOTAL': {
    name: 'Bilirrubina Total',
    category: 'Função Hepática',
    objective: 'Produto do metabolismo da hemoglobina. Avalia função hepática e icterícia.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Bilirrubina DIRETA': {
    name: 'Bilirrubina Direta (Conjugada)',
    category: 'Função Hepática',
    objective: 'Fração conjugada da bilirrubina. Aumenta em obstrução biliar.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Bilirrubina INDIRETA': {
    name: 'Bilirrubina Indireta (Não conjugada)',
    category: 'Função Hepática',
    objective: 'Fração não conjugada. Aumenta em hemólise.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'LDH': {
    name: 'LDH (Lactato Desidrogenase)',
    category: 'Enzimas',
    objective: 'Marcador de lesão celular. Aumenta em hemólise, infarto, lesões hepáticas e musculares.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Amilase': {
    name: 'Amilase',
    category: 'Função Pancreática',
    objective: 'Enzima pancreática. Diagnóstico de pancreatite aguda.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Lipase': {
    name: 'Lipase',
    category: 'Função Pancreática',
    objective: 'Enzima pancreática. Mais específica que amilase para pancreatite.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },

  // ===== HORMÔNIOS TIREOIDEANOS =====
  'TSH': {
    name: 'TSH (Hormônio Tireoestimulante)',
    category: 'Tireoide',
    objective: 'Principal exame para avaliar função tireoidiana. Rastreio de hipo e hipertireoidismo.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'T3 livre': {
    name: 'T3 Livre (Triiodotironina Livre)',
    category: 'Tireoide',
    objective: 'Hormônio tireoidiano ativo. Avalia hipertireoidismo.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'T4 livre': {
    name: 'T4 Livre (Tiroxina Livre)',
    category: 'Tireoide',
    objective: 'Principal hormônio tireoidiano. Diagnóstico de disfunções tireoidianas.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'T3 reverso': {
    name: 'T3 Reverso',
    category: 'Tireoide',
    objective: 'Forma inativa do T3. Aumenta em estresse e doenças crônicas.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'ANTI - TPO': {
    name: 'Anti-TPO (Anticorpo Anti-Tireoideoperoxidase)',
    category: 'Tireoide',
    objective: 'Anticorpo contra a tireoide. Diagnóstico de tireoidite autoimune (Hashimoto).',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },

  // ===== HORMÔNIOS SEXUAIS =====
  'Testosterona Total': {
    name: 'Testosterona Total',
    category: 'Hormônios Sexuais',
    objective: 'Principal hormônio masculino. Avalia função gonadal, libido e massa muscular.',
    preparation: 'Coletar pela manhã (8h), jejum de 8 horas',
    material: 'Soro'
  },
  'Testosterona Livre': {
    name: 'Testosterona Livre',
    category: 'Hormônios Sexuais',
    objective: 'Fração biologicamente ativa da testosterona. Mais preciso que testosterona total.',
    preparation: 'Coletar pela manhã, jejum de 8 horas',
    material: 'Soro'
  },
  'DHEA': {
    name: 'DHEA (Dehidroepiandrosterona)',
    category: 'Hormônios Sexuais',
    objective: 'Precursor de hormônios sexuais. Avalia função adrenal.',
    preparation: 'Coletar pela manhã',
    material: 'Soro'
  },
  'Estradiol': {
    name: 'Estradiol (E2)',
    category: 'Hormônios Sexuais',
    objective: 'Principal estrogênio. Avalia função ovariana, menopausa e fertilidade.',
    preparation: 'Coletar em dia específico do ciclo menstrual',
    material: 'Soro'
  },
  'Estradiol Livre': {
    name: 'Estradiol Livre',
    category: 'Hormônios Sexuais',
    objective: 'Fração ativa do estradiol.',
    preparation: 'Coletar em dia específico do ciclo',
    material: 'Soro'
  },
  'Estriol': {
    name: 'Estriol (E3)',
    category: 'Hormônios Sexuais',
    objective: 'Estrogênio mais fraco. Importante na gestação.',
    preparation: 'Conforme orientação',
    material: 'Soro'
  },
  'Progesterona': {
    name: 'Progesterona',
    category: 'Hormônios Sexuais',
    objective: 'Hormônio do corpo lúteo. Avalia ovulação e suporte à gravidez.',
    preparation: 'Coletar na fase lútea (21º dia do ciclo)',
    material: 'Soro'
  },
  'FSH': {
    name: 'FSH (Hormônio Folículo Estimulante)',
    category: 'Hormônios Sexuais',
    objective: 'Controla maturação de óvulos e espermatozoides. Avalia menopausa e fertilidade.',
    preparation: '3º dia do ciclo menstrual',
    material: 'Soro'
  },
  'LH': {
    name: 'LH (Hormônio Luteinizante)',
    category: 'Hormônios Sexuais',
    objective: 'Estimula ovulação e produção de testosterona. Avalia fertilidade.',
    preparation: '3º dia do ciclo menstrual',
    material: 'Soro'
  },
  'Prolactina': {
    name: 'Prolactina',
    category: 'Hormônios Sexuais',
    objective: 'Hormônio da lactação. Aumenta em tumores hipofisários (prolactinoma).',
    preparation: 'Coletar em repouso, evitar estímulo mamário',
    material: 'Soro'
  },
  'SHBG': {
    name: 'SHBG (Globulina Ligadora de Hormônios Sexuais)',
    category: 'Hormônios Sexuais',
    objective: 'Proteína que transporta hormônios sexuais. Avalia biodisponibilidade hormonal.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Androstenediona': {
    name: 'Androstenediona',
    category: 'Hormônios Sexuais',
    objective: 'Precursor de testosterona e estrogênio. Avalia SOP e tumores adrenais.',
    preparation: 'Coletar pela manhã',
    material: 'Soro'
  },
  'Pregnenolona': {
    name: 'Pregnenolona',
    category: 'Hormônios Sexuais',
    objective: 'Precursor de todos os hormônios esteroides. Avalia função adrenal.',
    preparation: 'Coletar pela manhã',
    material: 'Soro'
  },
  'Beta-HCG (Gonadotrofina Coriônica Humana)': {
    name: 'Beta-HCG (Gonadotrofina Coriônica)',
    category: 'Hormônios / Gestação',
    objective: 'Diagnóstico de gravidez. Também marcador tumoral.',
    preparation: 'Não requer jejum',
    material: 'Soro'
  },

  // ===== HORMÔNIOS ADRENAIS E CORTISOL =====
  'Cortisol sérico acordar': {
    name: 'Cortisol Sérico (Acordar)',
    category: 'Adrenal',
    objective: 'Hormônio do estresse. Avalia função adrenal e ritmo circadiano.',
    preparation: 'Coletar às 8h da manhã',
    material: 'Soro'
  },
  'Cortisol salivar: (despertar)': {
    name: 'Cortisol Salivar (Despertar)',
    category: 'Adrenal',
    objective: 'Cortisol livre. Avalia estresse e ritmo circadiano.',
    preparation: 'Coletar ao acordar',
    material: 'Saliva'
  },
  'Cortisol salivar: (tarde)': {
    name: 'Cortisol Salivar (Tarde)',
    category: 'Adrenal',
    objective: 'Avalia curva de cortisol ao longo do dia.',
    preparation: 'Coletar às 16h',
    material: 'Saliva'
  },
  'Cortisol salivar: (noite)': {
    name: 'Cortisol Salivar (Noite)',
    category: 'Adrenal',
    objective: 'Avalia queda noturna do cortisol. Diagnóstico de síndrome de Cushing.',
    preparation: 'Coletar às 23h',
    material: 'Saliva'
  },
  'Cortisol salivar: (total)': {
    name: 'Cortisol Salivar (Curva Completa)',
    category: 'Adrenal',
    objective: 'Avalia ritmo circadiano completo do cortisol.',
    preparation: '4 coletas ao longo do dia',
    material: 'Saliva'
  },
  'Aldosterona': {
    name: 'Aldosterona',
    category: 'Adrenal',
    objective: 'Regula pressão arterial e eletrólitos. Diagnóstico de hiperaldosteronismo.',
    preparation: 'Jejum de 8 horas, coletar sentado',
    material: 'Soro'
  },
  'Renina': {
    name: 'Renina',
    category: 'Adrenal / Renal',
    objective: 'Regula pressão arterial. Diagnóstico de hipertensão secundária.',
    preparation: 'Jejum de 8 horas',
    material: 'Plasma (EDTA)'
  },
  'ADH (Vasopressina)': {
    name: 'ADH (Hormônio Antidiurético)',
    category: 'Adrenal / Renal',
    objective: 'Regula retenção de água. Diagnóstico de diabetes insipidus.',
    preparation: 'Jejum de 8 horas',
    material: 'Plasma'
  },

  // ===== VITAMINAS =====
  'Vitamina D': {
    name: 'Vitamina D (25-OH)',
    category: 'Vitaminas',
    objective: 'Avalia status de vitamina D. Essencial para ossos, imunidade e metabolismo.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'Vitamina B12': {
    name: 'Vitamina B12 (Cobalamina)',
    category: 'Vitaminas',
    objective: 'Essencial para formação sanguínea e função neurológica. Diagnóstico de anemia megaloblástica.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'B9 (Acido Fólico)': {
    name: 'Ácido Fólico (Vitamina B9)',
    category: 'Vitaminas',
    objective: 'Essencial para síntese de DNA e formação sanguínea. Importante na gestação.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Vitamina A (Retinol Sérico)': {
    name: 'Vitamina A (Retinol)',
    category: 'Vitaminas',
    objective: 'Essencial para visão, pele e imunidade. Avalia deficiência ou toxicidade.',
    preparation: 'Jejum de 8 horas, proteger da luz',
    material: 'Soro'
  },
  'Vitamina B1 (Tiamina)': {
    name: 'Vitamina B1 (Tiamina)',
    category: 'Vitaminas',
    objective: 'Essencial para metabolismo energético. Deficiência causa beribéri.',
    preparation: 'Jejum de 8 horas',
    material: 'Sangue total'
  },
  'Vitamina B2 (Riboflavina)': {
    name: 'Vitamina B2 (Riboflavina)',
    category: 'Vitaminas',
    objective: 'Cofator em reações metabólicas. Avalia estado nutricional.',
    preparation: 'Jejum de 8 horas',
    material: 'Sangue total'
  },
  'Vitamina B3 (Niacina)': {
    name: 'Vitamina B3 (Niacina)',
    category: 'Vitaminas',
    objective: 'Importante para metabolismo energético. Deficiência causa pelagra.',
    preparation: 'Jejum de 8 horas',
    material: 'Plasma'
  },
  'Vitamina B5 (Ácido Pantotênico)': {
    name: 'Vitamina B5 (Ácido Pantotênico)',
    category: 'Vitaminas',
    objective: 'Essencial para síntese de coenzima A. Metabolismo energético.',
    preparation: 'Jejum de 8 horas',
    material: 'Sangue total'
  },
  'Vitamina B6': {
    name: 'Vitamina B6 (Piridoxina)',
    category: 'Vitaminas',
    objective: 'Cofator enzimático. Essencial para metabolismo de aminoácidos.',
    preparation: 'Jejum de 8 horas',
    material: 'Plasma'
  },
  'Vitamina B7 (Biotina)': {
    name: 'Vitamina B7 (Biotina)',
    category: 'Vitaminas',
    objective: 'Essencial para cabelos, pele e unhas. Metabolismo de gorduras.',
    preparation: 'Jejum de 8 horas',
    material: 'Sangue total'
  },
  'Vitamina C': {
    name: 'Vitamina C (Ácido Ascórbico)',
    category: 'Vitaminas',
    objective: 'Antioxidante. Essencial para imunidade e síntese de colágeno.',
    preparation: 'Jejum de 8 horas, proteger da luz',
    material: 'Plasma heparinizado'
  },
  'Caroteno Sérico': {
    name: 'Caroteno Sérico (Beta-caroteno)',
    category: 'Vitaminas',
    objective: 'Precursor de vitamina A. Avalia ingestão de vegetais.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },

  // ===== MINERAIS =====
  'Zinco sangue': {
    name: 'Zinco Sangue',
    category: 'Minerais',
    objective: 'Essencial para imunidade, cicatrização e paladar. Cofator enzimático.',
    preparation: 'Jejum de 8 horas',
    material: 'Sangue total'
  },
  'Zinco sérico': {
    name: 'Zinco Sérico',
    category: 'Minerais',
    objective: 'Forma circulante do zinco.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Zinco hemácia': {
    name: 'Zinco Eritrocitário',
    category: 'Minerais',
    objective: 'Reflete depósitos de zinco. Mais fidedigno que zinco sérico.',
    preparation: 'Jejum de 8 horas',
    material: 'Hemácia'
  },
  'Magnesio': {
    name: 'Magnésio',
    category: 'Minerais',
    objective: 'Cofator em 300+ reações. Essencial para músculos, nervos e coração.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Cobre (sérico/plasma)': {
    name: 'Cobre Sérico',
    category: 'Minerais',
    objective: 'Essencial para formação de hemoglobina e metabolismo energético.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Cobre (hemácia)': {
    name: 'Cobre Eritrocitário',
    category: 'Minerais',
    objective: 'Reflete depósitos corporais de cobre.',
    preparation: 'Jejum de 8 horas',
    material: 'Hemácia'
  },
  'Selenio': {
    name: 'Selênio',
    category: 'Minerais',
    objective: 'Antioxidante. Essencial para função tireoidiana e imunidade.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Cromo (sangue)': {
    name: 'Cromo Sangue',
    category: 'Minerais',
    objective: 'Potencializa ação da insulina. Importante no metabolismo de carboidratos.',
    preparation: 'Jejum de 8 horas',
    material: 'Sangue total'
  },
  'Cromo (urina)': {
    name: 'Cromo Urina',
    category: 'Minerais',
    objective: 'Avalia excreção urinária de cromo.',
    preparation: 'Urina de 24h',
    material: 'Urina'
  },
  'Manganês (sangue total)': {
    name: 'Manganês',
    category: 'Minerais',
    objective: 'Cofator enzimático. Importante para ossos e metabolismo.',
    preparation: 'Jejum de 8 horas',
    material: 'Sangue total'
  },
  'Potassio': {
    name: 'Potássio',
    category: 'Eletrólitos',
    objective: 'Essencial para função muscular e cardíaca. Regulação da pressão arterial.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'Sódio': {
    name: 'Sódio',
    category: 'Eletrólitos',
    objective: 'Principal eletrólito extracelular. Regula volume sanguíneo.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'Ceruplasmina': {
    name: 'Ceruplasmina',
    category: 'Minerais',
    objective: 'Proteína transportadora de cobre. Diagnóstico de doença de Wilson.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },

  // ===== METAIS TÓXICOS =====
  'Chumbo Sangue': {
    name: 'Chumbo (Sangue)',
    category: 'Metais Tóxicos',
    objective: 'Avalia intoxicação por chumbo. Neurotóxico.',
    preparation: 'Jejum de 4 horas',
    material: 'Sangue total'
  },
  'Chumbo Urina': {
    name: 'Chumbo (Urina)',
    category: 'Metais Tóxicos',
    objective: 'Avalia exposição recente ou excreção de chumbo.',
    preparation: 'Urina de 24h',
    material: 'Urina'
  },
  'Mercurio Sangue': {
    name: 'Mercúrio (Sangue)',
    category: 'Metais Tóxicos',
    objective: 'Avalia intoxicação por mercúrio. Neurotóxico.',
    preparation: 'Jejum de 4 horas',
    material: 'Sangue total'
  },
  'Mercúrio urina': {
    name: 'Mercúrio (Urina)',
    category: 'Metais Tóxicos',
    objective: 'Avalia excreção urinária de mercúrio.',
    preparation: 'Urina de 24h',
    material: 'Urina'
  },
  'Arsenico Sangue': {
    name: 'Arsênico (Sangue)',
    category: 'Metais Tóxicos',
    objective: 'Avalia intoxicação por arsênico. Tóxico sistêmico.',
    preparation: 'Jejum de 4 horas',
    material: 'Sangue total'
  },
  'Arsenico Urina': {
    name: 'Arsênico (Urina)',
    category: 'Metais Tóxicos',
    objective: 'Avalia excreção de arsênico.',
    preparation: 'Urina de 24h',
    material: 'Urina'
  },
  'Cadmio Sangue': {
    name: 'Cádmio (Sangue)',
    category: 'Metais Tóxicos',
    objective: 'Avalia exposição a cádmio. Nefrotóxico.',
    preparation: 'Jejum de 4 horas',
    material: 'Sangue total'
  },
  'Cadmio Urina': {
    name: 'Cádmio (Urina)',
    category: 'Metais Tóxicos',
    objective: 'Avalia acúmulo renal de cádmio.',
    preparation: 'Urina de 24h',
    material: 'Urina'
  },
  'Aluminio Soro': {
    name: 'Alumínio (Soro)',
    category: 'Metais Tóxicos',
    objective: 'Avalia exposição a alumínio. Neurotóxico.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'Aluminio Urina': {
    name: 'Alumínio (Urina)',
    category: 'Metais Tóxicos',
    objective: 'Avalia excreção de alumínio.',
    preparation: 'Urina de 24h',
    material: 'Urina'
  },
  'Niquel Sangue': {
    name: 'Níquel (Sangue)',
    category: 'Metais Tóxicos',
    objective: 'Avalia exposição a níquel. Alergênico e carcinogênico.',
    preparation: 'Jejum de 4 horas',
    material: 'Sangue total'
  },
  'Niquel Urina': {
    name: 'Níquel (Urina)',
    category: 'Metais Tóxicos',
    objective: 'Avalia excreção de níquel.',
    preparation: 'Urina de 24h',
    material: 'Urina'
  },
  'Fluor Urina': {
    name: 'Flúor (Urina)',
    category: 'Metais Tóxicos',
    objective: 'Avalia excesso de flúor. Pode causar fluorose.',
    preparation: 'Urina de 24h',
    material: 'Urina'
  },

  // ===== MARCADORES CARDÍACOS =====
  'Troponina I': {
    name: 'Troponina I',
    category: 'Marcadores Cardíacos',
    objective: 'Marcador específico de lesão cardíaca. Diagnóstico de infarto.',
    preparation: 'Não requer jejum',
    material: 'Soro'
  },
  'Troponina T': {
    name: 'Troponina T',
    category: 'Marcadores Cardíacos',
    objective: 'Marcador de lesão miocárdica. Diagnóstico de infarto.',
    preparation: 'Não requer jejum',
    material: 'Soro'
  },
  'CK-MB': {
    name: 'CK-MB (Creatinoquinase MB)',
    category: 'Marcadores Cardíacos',
    objective: 'Enzima cardíaca. Diagnóstico de infarto agudo do miocárdio.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'Mioglobina': {
    name: 'Mioglobina',
    category: 'Marcadores Cardíacos',
    objective: 'Marcador precoce de lesão muscular cardíaca ou esquelética.',
    preparation: 'Não requer jejum',
    material: 'Soro'
  },
  'D-Dimero': {
    name: 'D-Dímero',
    category: 'Coagulação',
    objective: 'Marcador de coagulação. Exclui trombose e embolia pulmonar.',
    preparation: 'Jejum de 4 horas',
    material: 'Plasma citrato'
  },
  'Fibrinogênio': {
    name: 'Fibrinogênio',
    category: 'Coagulação',
    objective: 'Proteína da coagulação. Marcador inflamatório e de risco cardiovascular.',
    preparation: 'Jejum de 8 horas',
    material: 'Plasma citrato'
  },

  // ===== MARCADORES INFLAMATÓRIOS E IMUNOLÓGICOS =====
  'PCR': {
    name: 'PCR (Proteína C Reativa)',
    category: 'Inflamação',
    objective: 'Marcador inespecífico de inflamação aguda.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'Procalcitonina': {
    name: 'Procalcitonina',
    category: 'Inflamação / Infecção',
    objective: 'Marcador de infecção bacteriana e sepse.',
    preparation: 'Não requer jejum',
    material: 'Soro'
  },
  'Homocisteína': {
    name: 'Homocisteína',
    category: 'Risco Cardiovascular',
    objective: 'Fator de risco cardiovascular independente. Aumenta em deficiência de B12 e folato.',
    preparation: 'Jejum de 8-12 horas',
    material: 'Plasma EDTA'
  },
  'IL-6 (Interleucina-6)': {
    name: 'Interleucina-6 (IL-6)',
    category: 'Citocinas',
    objective: 'Citocina pró-inflamatória. Marcador de inflamação sistêmica.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'TNF-α (Fator de Necrose Tumoral Alfa)': {
    name: 'TNF-alfa (Fator de Necrose Tumoral)',
    category: 'Citocinas',
    objective: 'Citocina pró-inflamatória. Envolvida em doenças autoimunes.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'IFN-γ (Interferon Gama)': {
    name: 'Interferon Gama (IFN-γ)',
    category: 'Citocinas',
    objective: 'Citocina da resposta imune celular. Ativação de macrófagos.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Complemento C3': {
    name: 'Complemento C3',
    category: 'Imunologia',
    objective: 'Proteína do sistema complemento. Avalia ativação imunológica.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'Complemento C4 – Ativação do sistema imunológico': {
    name: 'Complemento C4',
    category: 'Imunologia',
    objective: 'Proteína do sistema complemento. Baixa em lúpus eritematoso sistêmico.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'ANCA (Anticorpo Anticitoplasma de neutrófilo)': {
    name: 'ANCA (Anticorpo Anticitoplasma de Neutrófilos)',
    category: 'Autoimunidade',
    objective: 'Diagnóstico de vasculites autoimunes (Wegener, poliangiíte microscópica).',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'ASCA (Anticorpos Anti-Saccharomyces cerevisiae)': {
    name: 'ASCA (Anticorpos Anti-Saccharomyces)',
    category: 'Autoimunidade / Gastrointestinal',
    objective: 'Diagnóstico diferencial de doença de Crohn.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },

  // ===== MARCADORES GASTROINTESTINAIS =====
  'Calprotectina': {
    name: 'Calprotectina Fecal',
    category: 'Gastrointestinal',
    objective: 'Marcador de inflamação intestinal. Diferencia DII de SII.',
    preparation: 'Fezes frescas',
    material: 'Fezes'
  },
  'Lactoferrina': {
    name: 'Lactoferrina Fecal',
    category: 'Gastrointestinal',
    objective: 'Marcador de inflamação intestinal.',
    preparation: 'Fezes frescas',
    material: 'Fezes'
  },
  'Elastase Pancreática Fecal': {
    name: 'Elastase Pancreática Fecal',
    category: 'Gastrointestinal / Pancreática',
    objective: 'Avalia insuficiência pancreática exócrina.',
    preparation: 'Fezes frescas',
    material: 'Fezes'
  },
  'Pepsinogênio I e II': {
    name: 'Pepsinogênio I e II',
    category: 'Gastrointestinal',
    objective: 'Avalia função gástrica e gastrite atrófica.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Gastrina': {
    name: 'Gastrina',
    category: 'Gastrointestinal',
    objective: 'Diagnóstico de gastrinoma (síndrome de Zollinger-Ellison) e gastrite atrófica.',
    preparation: 'Jejum de 12 horas',
    material: 'Soro'
  },
  'Transglutaminase tecidual IgA': {
    name: 'Transglutaminase Tecidual IgA (Anti-tTG)',
    category: 'Gastrointestinal / Autoimunidade',
    objective: 'Principal exame para diagnóstico de doença celíaca.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'Indol e Escatol': {
    name: 'Indol e Escatol Fecal',
    category: 'Gastrointestinal / Disbiose',
    objective: 'Marcadores de putrefação proteica intestinal. Disbiose.',
    preparation: 'Fezes frescas',
    material: 'Fezes'
  },

  // ===== MICROBIOTA INTESTINAL =====
  'Perfil de AGCC': {
    name: 'Perfil de Ácidos Graxos de Cadeia Curta (AGCC)',
    category: 'Microbiota',
    objective: 'Avalia saúde da microbiota intestinal. Produção de butirato, acetato, propionato.',
    preparation: 'Fezes frescas',
    material: 'Fezes'
  },
  'Análise de RNA Ribossômico': {
    name: 'Análise de RNA Ribossômico (Microbioma)',
    category: 'Microbiota',
    objective: 'Sequenciamento genético da microbiota intestinal.',
    preparation: 'Fezes frescas',
    material: 'Fezes'
  },
  'Razão Firmicutes/Bacteroidetes': {
    name: 'Razão Firmicutes/Bacteroidetes',
    category: 'Microbiota',
    objective: 'Avalia equilíbrio da microbiota. Relacionado a obesidade.',
    preparation: 'Fezes frescas',
    material: 'Fezes'
  },
  'Índice Firmicutes+Bacteroidetes': {
    name: 'Índice Firmicutes+Bacteroidetes',
    category: 'Microbiota',
    objective: 'Índice de diversidade microbiana.',
    preparation: 'Fezes frescas',
    material: 'Fezes'
  },
  'Índice de Simpson': {
    name: 'Índice de Simpson (Diversidade)',
    category: 'Microbiota',
    objective: 'Mede diversidade da microbiota intestinal.',
    preparation: 'Fezes frescas',
    material: 'Fezes'
  },
  'Indicador de Riqueza': {
    name: 'Indicador de Riqueza Microbiana',
    category: 'Microbiota',
    objective: 'Número de espécies diferentes na microbiota.',
    preparation: 'Fezes frescas',
    material: 'Fezes'
  },
  'Perfil de Metaboloma fecal': {
    name: 'Perfil de Metaboloma Fecal',
    category: 'Microbiota',
    objective: 'Analisa metabólitos produzidos pela microbiota.',
    preparation: 'Fezes frescas',
    material: 'Fezes'
  },

  // ===== MARCADORES TUMORAIS =====
  'CA-125 (Antígeno Carboidrato 125)': {
    name: 'CA-125',
    category: 'Marcadores Tumorais',
    objective: 'Marcador de câncer de ovário. Também aumenta em endometriose.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'CA 15-3': {
    name: 'CA 15-3',
    category: 'Marcadores Tumorais',
    objective: 'Marcador de câncer de mama. Monitoramento de recidiva.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'CA 19-9': {
    name: 'CA 19-9',
    category: 'Marcadores Tumorais',
    objective: 'Marcador de câncer de pâncreas e vias biliares.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'CEA (Antígeno Carcinoembrionário)': {
    name: 'CEA (Antígeno Carcinoembrionário)',
    category: 'Marcadores Tumorais',
    objective: 'Marcador de câncer colorretal. Monitoramento de tratamento.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'PSA Total (Antígeno Prostático Específico)': {
    name: 'PSA Total',
    category: 'Marcadores Tumorais',
    objective: 'Rastreamento de câncer de próstata.',
    preparation: 'Jejum de 4 horas, abstinência sexual 48h',
    material: 'Soro'
  },
  'PSA Livre': {
    name: 'PSA Livre',
    category: 'Marcadores Tumorais',
    objective: 'Diferencia câncer de próstata de hiperplasia benigna.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'AFP (Alfafetoproteína)': {
    name: 'AFP (Alfafetoproteína)',
    category: 'Marcadores Tumorais',
    objective: 'Marcador de câncer de fígado e tumores de células germinativas.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },

  // ===== MARCADORES ÓSSEOS =====
  'PTH': {
    name: 'PTH (Paratormônio)',
    category: 'Metabolismo Ósseo',
    objective: 'Regula cálcio e fósforo. Diagnóstico de hiper/hipoparatireoidismo.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },
  'Calcitonina': {
    name: 'Calcitonina',
    category: 'Metabolismo Ósseo',
    objective: 'Hormônio da tireoide. Marcador de câncer medular de tireoide.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Osteocalcina': {
    name: 'Osteocalcina',
    category: 'Metabolismo Ósseo',
    objective: 'Marcador de formação óssea. Avalia atividade osteoblástica.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Fosfatase Alcalina Óssea': {
    name: 'Fosfatase Alcalina Óssea',
    category: 'Metabolismo Ósseo',
    objective: 'Marcador específico de formação óssea.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'CTX (Telopeptídeo C-terminal)': {
    name: 'CTX (Telopeptídeo C-terminal do Colágeno Tipo I)',
    category: 'Metabolismo Ósseo',
    objective: 'Marcador de reabsorção óssea. Monitoramento de osteoporose.',
    preparation: 'Jejum de 8 horas, coletar pela manhã',
    material: 'Soro'
  },
  'PTHrP (Peptídeo Relacionado ao Hormônio Paratireoideano)': {
    name: 'PTHrP',
    category: 'Metabolismo Ósseo / Oncologia',
    objective: 'Diagnóstico de hipercalcemia paraneoplásica.',
    preparation: 'Jejum de 4 horas',
    material: 'Plasma EDTA'
  },

  // ===== OUTROS HORMÔNIOS =====
  'Somatomedina C': {
    name: 'Somatomedina C (IGF-1)',
    category: 'Hormônios',
    objective: 'Mediador do hormônio do crescimento. Avalia acromegalia e deficiência de GH.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Leptina': {
    name: 'Leptina',
    category: 'Hormônios Metabólicos',
    objective: 'Hormônio da saciedade. Avalia resistência à leptina e obesidade.',
    preparation: 'Jejum de 12 horas',
    material: 'Soro'
  },
  'Adiponectina': {
    name: 'Adiponectina',
    category: 'Hormônios Metabólicos',
    objective: 'Hormônio adiposo. Baixa em resistência insulínica e síndrome metabólica.',
    preparation: 'Jejum de 12 horas',
    material: 'Soro'
  },
  'Angiotensina II': {
    name: 'Angiotensina II',
    category: 'Hormônios',
    objective: 'Regula pressão arterial e balanço hidrossalino.',
    preparation: 'Jejum de 8 horas',
    material: 'Plasma EDTA'
  },
  'Aldalose': {
    name: 'Aldolase',
    category: 'Enzimas',
    objective: 'Enzima muscular. Aumenta em doenças musculares (miopatias).',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },

  // ===== MARCADORES NEUROLÓGICOS =====
  'Beta-amiloide e TAU': {
    name: 'Beta-amiloide e TAU (Líquor)',
    category: 'Neurologia',
    objective: 'Marcadores de doença de Alzheimer.',
    preparation: 'Procedimento especial (punção lombar)',
    material: 'Líquor'
  },
  'Neurofilamento leve (Nf-L)': {
    name: 'Neurofilamento Leve (Nf-L)',
    category: 'Neurologia',
    objective: 'Marcador de degeneração neuronal. Monitoramento de esclerose múltipla.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro ou líquor'
  },
  'Proteína TDP-43': {
    name: 'Proteína TDP-43',
    category: 'Neurologia',
    objective: 'Marcador de esclerose lateral amiotrófica (ELA).',
    preparation: 'Procedimento especial',
    material: 'Líquor'
  },
  'Proteína ligadora de cálcio S100B': {
    name: 'Proteína S100B',
    category: 'Neurologia',
    objective: 'Marcador de lesão cerebral. Aumenta em trauma craniano.',
    preparation: 'Não requer jejum',
    material: 'Soro'
  },
  'S100': {
    name: 'S100 (Melanoma)',
    category: 'Marcadores Tumorais',
    objective: 'Marcador de melanoma metastático.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  },

  // ===== MARCADORES RENAIS ESPECIALIZADOS =====
  'NGAL (Lipocalina associada à gelatinase de neutrófilos)': {
    name: 'NGAL',
    category: 'Função Renal',
    objective: 'Marcador precoce de lesão renal aguda.',
    preparation: 'Não requer jejum',
    material: 'Soro ou urina'
  },
  'KIM-1 (Molécula de lesão renal 1)': {
    name: 'KIM-1',
    category: 'Função Renal',
    objective: 'Biomarcador de lesão tubular renal.',
    preparation: 'Não requer jejum',
    material: 'Urina'
  },
  'NMP22': {
    name: 'NMP22 (Proteína da Matriz Nuclear 22)',
    category: 'Marcadores Tumorais / Urologia',
    objective: 'Marcador de câncer de bexiga.',
    preparation: 'Primeira urina da manhã',
    material: 'Urina'
  },

  // ===== MARCADORES RESPIRATÓRIOS =====
  'NO Exalado': {
    name: 'Óxido Nítrico Exalado (FeNO)',
    category: 'Respiratório',
    objective: 'Marcador de inflamação eosinofílica das vias aéreas. Monitoramento de asma.',
    preparation: 'Não comer, beber ou fumar 1h antes',
    material: 'Ar exalado'
  },

  // ===== MARCADORES DE ESTRESSE OXIDATIVO =====
  'MDA (Malondialdeído)': {
    name: 'MDA (Malondialdeído)',
    category: 'Estresse Oxidativo',
    objective: 'Marcador de peroxidação lipídica. Indica dano oxidativo.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  '8-OHdG (8-hidroxidesoxiguanosina)': {
    name: '8-OHdG',
    category: 'Estresse Oxidativo',
    objective: 'Marcador de dano oxidativo ao DNA.',
    preparation: 'Primeira urina da manhã',
    material: 'Urina'
  },
  'Glutationa Reduzida/Glutationa Oxidada (GSH/GSSG)': {
    name: 'Razão GSH/GSSG',
    category: 'Estresse Oxidativo',
    objective: 'Avalia status antioxidante celular.',
    preparation: 'Jejum de 8 horas',
    material: 'Sangue total'
  },
  'Superóxido dismutase (SOD)': {
    name: 'Superóxido Dismutase (SOD)',
    category: 'Estresse Oxidativo',
    objective: 'Enzima antioxidante. Defesa contra radicais livres.',
    preparation: 'Jejum de 8 horas',
    material: 'Hemácia'
  },
  'Catalase': {
    name: 'Catalase',
    category: 'Estresse Oxidativo',
    objective: 'Enzima antioxidante. Decompõe peróxido de hidrogênio.',
    preparation: 'Jejum de 8 horas',
    material: 'Hemácia'
  },
  'Peroxinitrito': {
    name: 'Peroxinitrito',
    category: 'Estresse Oxidativo',
    objective: 'Marcador de estresse nitrosativo.',
    preparation: 'Jejum de 8 horas',
    material: 'Plasma'
  },
  'AGEs (Produtos Finais de Glicação Avançada)': {
    name: 'AGEs (Produtos Finais de Glicação Avançada)',
    category: 'Estresse Oxidativo / Diabetes',
    objective: 'Marcador de glicação proteica. Relacionado a complicações diabéticas.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro'
  },
  'Proteínas Carboniladas': {
    name: 'Proteínas Carboniladas',
    category: 'Estresse Oxidativo',
    objective: 'Marcador de oxidação proteica.',
    preparation: 'Jejum de 8 horas',
    material: 'Plasma'
  },

  // ===== MARCADORES GENÉTICOS E MOLECULARES =====
  'BRAF': {
    name: 'Mutação BRAF',
    category: 'Genética / Oncologia',
    objective: 'Mutação em melanoma e câncer colorretal. Guia terapia-alvo.',
    preparation: 'Amostra tumoral',
    material: 'Tecido'
  },
  'HER2/neu': {
    name: 'HER2/neu',
    category: 'Genética / Oncologia',
    objective: 'Marcador de câncer de mama. Indica terapia com trastuzumab.',
    preparation: 'Amostra tumoral',
    material: 'Tecido'
  },
  'TP53': {
    name: 'Mutação TP53',
    category: 'Genética / Oncologia',
    objective: 'Gene supressor tumoral. Mutações em diversos cânceres.',
    preparation: 'Amostra tumoral',
    material: 'Tecido'
  },
  'EGFR': {
    name: 'Mutação EGFR',
    category: 'Genética / Oncologia',
    objective: 'Mutação em câncer de pulmão. Indica terapia-alvo.',
    preparation: 'Amostra tumoral',
    material: 'Tecido'
  },
  'KRAS': {
    name: 'Mutação KRAS',
    category: 'Genética / Oncologia',
    objective: 'Mutação em câncer colorretal e pulmão. Prediz resistência a terapias.',
    preparation: 'Amostra tumoral',
    material: 'Tecido'
  },
  'Telomerase': {
    name: 'Telomerase',
    category: 'Genética / Envelhecimento',
    objective: 'Avalia envelhecimento celular e atividade tumoral.',
    preparation: 'Jejum de 8 horas',
    material: 'Sangue total'
  },

  // ===== MARCADORES METABÓLICOS ESPECIALIZADOS =====
  'Acido Metilmalônico': {
    name: 'Ácido Metilmalônico',
    category: 'Metabolismo',
    objective: 'Marcador funcional de deficiência de B12. Mais sensível que B12 sérica.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro ou urina'
  },
  'Acido Metilmalônico': {
    name: 'Ácido Metilmalônico',
    category: 'Metabolismo',
    objective: 'Marcador funcional de deficiência de B12. Mais sensível que B12 sérica.',
    preparation: 'Jejum de 8 horas',
    material: 'Soro ou urina'
  },
  'Relação U/S': {
    name: 'Relação Urina/Sangue',
    category: 'Função Renal',
    objective: 'Avalia função tubular renal.',
    preparation: 'Conforme exame específico',
    material: 'Soro e urina'
  },

  // ===== MARCADORES INFECCIOSOS =====
  'TPPA': {
    name: 'TPPA (Treponema pallidum)',
    category: 'Sorologia',
    objective: 'Teste confirmatório para sífilis.',
    preparation: 'Jejum de 4 horas',
    material: 'Soro'
  }
};

// Categorias de exames
export const EXAM_CATEGORIES = [
  'Hematologia',
  'Metabolismo do Ferro',
  'Metabolismo de Carboidratos',
  'Perfil Lipídico',
  'Função Renal',
  'Função Hepática',
  'Função Pancreática',
  'Tireoide',
  'Hormônios Sexuais',
  'Adrenal',
  'Vitaminas',
  'Minerais',
  'Eletrólitos',
  'Metais Tóxicos',
  'Marcadores Cardíacos',
  'Coagulação',
  'Inflamação',
  'Citocinas',
  'Imunologia',
  'Autoimunidade',
  'Gastrointestinal',
  'Microbiota',
  'Marcadores Tumorais',
  'Metabolismo Ósseo',
  'Hormônios Metabólicos',
  'Enzimas',
  'Neurologia',
  'Respiratório',
  'Estresse Oxidativo',
  'Genética / Oncologia',
  'Genética / Envelhecimento',
  'Metabolismo',
  'Sorologia',
  'Urologia'
];

// Lista de todos os exames (nomes)
export const ALL_EXAMS = Object.keys(LABORATORY_EXAMS_DATABASE).sort();

// Função para buscar exames por categoria
export const getExamsByCategory = (category) => {
  return Object.entries(LABORATORY_EXAMS_DATABASE)
    .filter(([_, exam]) => exam.category === category)
    .map(([name, exam]) => ({ name, ...exam }));
};

// Função para buscar exame específico
export const getExamDetails = (examName) => {
  return LABORATORY_EXAMS_DATABASE[examName];
};
