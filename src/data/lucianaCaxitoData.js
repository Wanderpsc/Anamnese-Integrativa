// ============================================================
// ANAMNESE INTEGRATIVA I — Luciana Caxito
// Estrutura completa baseada no livro/apostila de referência
// Organizada em abas temáticas com checkboxes e campos livres
// ============================================================

export const TABS = [
  { id: 'identificacao',    label: 'Identificação',         icon: '👤' },
  { id: 'queixa',          label: 'Queixa Principal',       icon: '📋' },
  { id: 'antecedentes',    label: 'Antecedentes Pessoais',  icon: '🩺' },
  { id: 'familia',         label: 'Fam. / Hereditários',   icon: '👨‍👩‍👧' },
  { id: 'alimentacao',     label: 'Alimentação',            icon: '🥗' },
  { id: 'sono',            label: 'Sono & Energia',         icon: '😴' },
  { id: 'atividade',       label: 'Atividade Física',       icon: '🏃' },
  { id: 'eliminacoes',     label: 'Eliminações',            icon: '💧' },
  { id: 'sistemas',        label: 'Revisão de Sistemas',    icon: '🫀' },
  { id: 'emocional',       label: 'Psico-Emocional',        icon: '🧠' },
  { id: 'espiritual',      label: 'Espiritual / Social',    icon: '🌿' },
  { id: 'exames',          label: 'Exames Compl.',          icon: '🔬' },
  { id: 'diagnostico',     label: 'Hipóteses Diag.',        icon: '📊' },
  { id: 'receituario',     label: 'Receituário',            icon: '📝' },
];

// ── 1. IDENTIFICAÇÃO ─────────────────────────────────────────
export const IDENTIFICACAO_FIELDS = [
  { key: 'nome',           label: 'Nome completo',          type: 'text' },
  { key: 'dataNasc',       label: 'Data de nascimento',     type: 'date' },
  { key: 'idade',          label: 'Idade',                  type: 'number', unit: 'anos' },
  { key: 'sexo',           label: 'Sexo biológico',         type: 'select', options: ['Feminino','Masculino','Não informado'] },
  { key: 'genero',         label: 'Identidade de gênero',   type: 'text' },
  { key: 'estadoCivil',    label: 'Estado civil',           type: 'select', options: ['Solteiro(a)','Casado(a)','União estável','Divorciado(a)','Viúvo(a)'] },
  { key: 'profissao',      label: 'Profissão / Ocupação',   type: 'text' },
  { key: 'escolaridade',   label: 'Escolaridade',           type: 'select', options: ['Ensino Fundamental','Ensino Médio','Superior incompleto','Superior completo','Pós-graduação'] },
  { key: 'renda',          label: 'Renda familiar aprox.',  type: 'select', options: ['Até 1 SM','1–3 SM','3–5 SM','5–10 SM','Acima de 10 SM'] },
  { key: 'cidade',         label: 'Cidade / Estado',        type: 'text' },
  { key: 'telefone',       label: 'Telefone',               type: 'text' },
  { key: 'email',          label: 'E-mail',                 type: 'text' },
  { key: 'indicacao',      label: 'Como nos conheceu',      type: 'text' },
  { key: 'religiaoEsp',    label: 'Religião / Espiritualidade', type: 'text' },
];

// ── 2. QUEIXA PRINCIPAL ──────────────────────────────────────
export const QUEIXA_TEMPO = ['Dias','Semanas','Meses','1–2 anos','Mais de 2 anos','Desde a infância','Crônico sem data'];
export const QUEIXA_EVOLUCAO = ['Melhorando','Estável','Piorando','Alternando melhoras e pioras','Sem alteração perceptível'];
export const QUEIXA_FATORES_PIORA = [
  'Estresse emocional','Alimentação inadequada','Falta de sono','Esforço físico',
  'Frio/mudança de clima','Calor excessivo','Menstruação','Uso de medicamentos',
  'Álcool','Cafeína','Glúten','Laticínios','Açúcar','Jejum prolongado',
  'Postura/posição','Contato com produtos químicos','Exposição solar','Outros',
];
export const QUEIXA_FATORES_MELHORA = [
  'Repouso','Alimentação leve','Exercício físico','Calor local','Frio local',
  'Medicamentos','Fitoterápicos','Chás','Meditação/relaxamento','Outros',
];

// ── 3. ANTECEDENTES PESSOAIS ─────────────────────────────────
export const DOENCAS_PREVIAS = [
  'Hipertensão arterial','Diabetes tipo 1','Diabetes tipo 2','Pré-diabetes',
  'Dislipidemia','Obesidade','Síndrome metabólica','Hipotireoidismo','Hipertireoidismo',
  'Tireoidite de Hashimoto','Doença de Graves','Hipopituitarismo','Insuficiência adrenal',
  'Síndrome dos ovários policísticos (SOP)','Endometriose','Mioma uterino',
  'Menopausa precoce','Infertilidade','Doença celíaca','Doença de Crohn',
  'Retocolite ulcerativa','Síndrome do intestino irritável (SII)','Gastrite','Úlcera gástrica',
  'Refluxo gastroesofágico (DRGE)','Hérnias digestivas','Doença hepática','Esteatose hepática',
  'Cálculo renal','Infecções urinárias de repetição','Doença renal crônica',
  'Asma','Bronquite crônica','DPOC','Rinite alérgica','Sinusite crônica',
  'Apneia do sono','Cardiopatia','Arritmia','Insuficiência cardíaca','Angina',
  'AVC / AIT','Trombose venosa','Varizes','Lúpus eritematoso sistêmico','Artrite reumatoide',
  'Psoríase','Fibromialgia','Osteoporose','Osteopenia','Artrose',
  'Enxaqueca / cefaleia crônica','Epilepsia','Parkinson','Alzheimer','Esclerose múltipla',
  'Depressão','Ansiedade generalizada','Transtorno de pânico','TOC','TDAH','Autismo',
  'Transtorno bipolar','Esquizofrenia','Anorexia / bulimia','Câncer (especificar)',
  'Doenças infecciosas crônicas (HIV, hepatite B, C)','Candidíase de repetição',
  'Herpes recorrente','HPV','Outras DST',
];

export const CIRURGIAS_ITEMS = [
  'Apendicectomia','Colecistectomia (vesícula)','Histerectomia','Ooforectomia',
  'Tireoidectomia (parcial/total)','Amigdalectomia','Adenoidectomia','Correção de hérnia',
  'Cirurgia cardíaca','Cirurgia bariátrica','Cesariana','Cirurgia ortopédica',
  'Cirurgia oncológica','Transplante','Outra cirurgia',
];

export const MEDICAMENTOS_CLASSES = [
  'Anti-hipertensivos','Antidiabéticos orais','Insulina','Estatinas (colesterol)',
  'Levotiroxina (tireoide)','Anticoncepcionais orais','Anticoncepcionais injetáveis',
  'DIU hormonal','Reposição hormonal','Antidepressivos (ISRS/ISRSN)',
  'Ansiolíticos / benzodiazepínicos','Antipsicóticos','Anticonvulsivantes',
  'Anti-inflamatórios AINES','Corticosteroides','Imunossupressores','Biologics',
  'Antibióticos (uso crônico)','Antiácidos / IBP','Laxativos','Diuréticos',
  'Anticoagulantes','Broncodilatadores','Antialérgicos / anti-histamínicos',
  'Opióides','Quimioterápicos','Fitoterápicos','Suplementos vitamínicos','Probióticos',
  'Medicamentos homeopáticos','Medicamentos florais','Outros',
];

export const ALERGIAS_ITEMS = [
  'Penicilina / antibióticos','Anti-inflamatórios (AINES)','AAS (aspirina)',
  'Sulfas','Contraste iodado','Látex','Frutos do mar','Amendoim',
  'Glúten (alergia/intolerância)','Lactose/proteína do leite','Ovos','Soja',
  'Corantes e conservantes','Produto de limpeza / cosméticos','Animais (pelo/pelos)',
  'Ácaros','Pó / poeira','Pólen','Mofo / fungos','Picada de insetos','Outros',
];

export const VACINAS_ITEMS = [
  'Influenza (anual)','COVID-19 (esquema completo)','Hepatite B','Hepatite A',
  'Tétano / dTpa','Febre amarela','HPV','Pneumocócica','Meningocócica',
  'Varicela','Tríplice viral (SCR)','Herpes-zóster','Outras',
];

export const HOSPITALIZACOES_ITEMS = [
  'Nunca foi hospitalizado(a)','Infecção grave','Cirurgia','Parto',
  'Trauma / fratura','Crise cardíaca / AVC','Crise hipertensiva',
  'Descompensação diabética','Problema psiquiátrico','Outros',
];

// ── 4. ANTECEDENTES FAMILIARES ───────────────────────────────
export const FAMILIA_PARENTES = ['Pai','Mãe','Avô paterno','Avó paterna','Avô materno','Avó materna','Irmão(s)','Filhos'];
export const FAMILIA_DOENCAS = [
  'Hipertensão arterial','Diabetes tipo 2','Dislipidemia','Obesidade',
  'Doenças cardiovasculares (infarto, AVC)','Câncer (especificar tipo)',
  'Doenças autoimunes','Doenças tireoidianas','Doenças neurológicas (Alzheimer, Parkinson)',
  'Doenças psiquiátricas (depressão, esquizofrenia)','Osteoporose',
  'Doenças renais','Doenças pulmonares','Morte precoce (< 50 anos)',
  'Longevidade (> 90 anos)','Outras doenças hereditárias',
];

// ── 5. ALIMENTAÇÃO ───────────────────────────────────────────
export const ALIMENTACAO_PADRAO = [
  'Onívoro (come tudo)','Vegetariano (sem carnes)','Vegano (sem nada animal)',
  'Flexitariano','Cetogênico / low-carb','Paleo','Dieta mediterrânea',
  'Sem glúten','Sem lactose','Dieta da empresa / marmita','Come fora frequentemente',
  'Fast food / ultraprocessados frequentes','Jejum intermitente',
];

export const ALIMENTOS_CONSUMO_DIARIO = [
  'Água (≥ 2L/dia)','Frutas','Verduras e legumes','Leguminosas (feijão, lentilha, grão-de-bico)',
  'Cereais integrais','Proteína animal (carne vermelha)','Proteína animal (frango/peixe)',
  'Ovos','Laticínios (leite, queijo, iogurte)','Oleaginosas (castanhas, nozes)',
  'Sementes (chia, linhaça)','Azeite de oliva','Açúcar refinado',
  'Refrigerantes / sucos industrializados','Álcool','Café','Chá','Alimentos ultraprocessados',
  'Sal em excesso','Frituras','Embutidos (salsicha, presunto, linguiça)',
];

export const SINAIS_ALIMENTARES = [
  'Come rápido e sem mastigar bem','Sente fome logo após comer','Não sente fome pela manhã',
  'Compulsão alimentar / comer emocional','Estufamento após comer','Refluxo após refeições',
  'Náuseas relacionadas à alimentação','Flatulência excessiva','Intolerância a alimentos gordurosos',
  'Preferência por doces','Desejo intenso por sal','Desejo por carne',
  'Aversão a vegetais','Come com ansiedade','Pula refeições frequentemente',
  'Não bebe água suficiente','Sensação de boca seca','Melhora sintomas ao jejuar',
];

// ── 6. SONO & ENERGIA ─────────────────────────────────────────
export const SONO_PADRAO = [
  'Dorme bem (7–9h/noite)','Dorme menos de 6h','Dorme mais de 9h (hipersônia)',
  'Acorda cansado(a)','Insônia para dormir (início)','Acorda no meio da noite',
  'Acorda muito cedo e não consegue dormir mais','Pesadelos frequentes',
  'Sonambulismo','Bruxismo (ranger de dentes)','Ronco','Apneia do sono diagnosticada',
  'Sensação de pernas inquietas','Noctúria (acorda para urinar)',
  'Usa medicação para dormir','Usa álcool para dormir','Usa tela até dormir',
];

export const ENERGIA_PADRAO = [
  'Energia boa ao longo do dia','Cansaço matinal (difícil levantar)',
  'Queda de energia após almoço','Cansaço no final da tarde',
  'Pique melhor à noite (cronotipo vespertino)','Fadiga crônica persistente',
  'Cansaço mental predominante','Cansaço físico predominante',
  'Energia instável / oscilante','Sensação de esgotamento adrenal',
  'Melhora com café / estimulantes','Piora com esforço físico',
];

// ── 7. ATIVIDADE FÍSICA ──────────────────────────────────────
export const ATIVIDADE_TIPO = [
  'Sedentário (nenhuma atividade regular)','Caminhada leve (< 30 min/dia)',
  'Caminhada moderada (30–60 min/dia)','Corrida','Ciclismo','Natação',
  'Musculação / treino de força','Yoga','Pilates','Dança','Artes marciais',
  'Futebol / esportes coletivos','Crossfit / HIIT','Funcional','Atividade laboral pesada',
  'Fisioterapia','Hidroginástica','Outra',
];

export const ATIVIDADE_FREQUENCIA = ['Nunca','1–2×/semana','3–4×/semana','5–6×/semana','Diariamente'];
export const ATIVIDADE_DURACAO = ['< 20 min','20–40 min','40–60 min','60–90 min','> 90 min'];
export const ATIVIDADE_INTENSIDADE = ['Leve (conversa normalmente)','Moderada (alguma dificuldade para conversar)','Intensa (não consegue conversar)'];

export const ATIVIDADE_SINAIS = [
  'Dor durante o exercício','Tontura / mal-estar durante exercício',
  'Dispneia (falta de ar) desproporcional','Cansaço exagerado pós-treino',
  'Não consegue se recuperar entre treinos','Lesões musculares frequentes',
  'Cãibras frequentes','Dor articular ao exercitar','Melhora sintomas com exercício',
];

// ── 8. ELIMINAÇÕES ───────────────────────────────────────────
export const INTESTINO_PADRAO = [
  'Evacuação diária (1–2×)','Evacuação a cada 2 dias','Constipação (< 3×/semana)',
  'Diarreia frequente','Alternância constipação-diarreia','Fezes ressecadas/bolinhas',
  'Fezes pastosas / líquidas','Fezes com muco','Fezes com sangue',
  'Gases em excesso','Distensão abdominal','Dificuldade de evacuar (esforço)',
  'Sensação de evacuação incompleta','Hemorroidas','Urgência fecal',
];

export const URINA_PADRAO = [
  'Diurese normal (6–8×/dia)','Oligúria (poucas micções)','Poliúria (muitas micções)',
  'Urina escura / concentrada','Urina espumosa','Ardência ao urinar','Urgência urinária',
  'Incontinência urinária','Infecções urinárias de repetição','Noctúria (≥ 2×/noite)',
  'Cálculos renais','Sangue na urina','Odor forte na urina',
];

export const SUOR_PADRAO = [
  'Sudorese normal','Hipersudorese (suor excessivo)','Suor noturno',
  'Suor frio','Odor forte no suor','Anhidrose (pouco suor)',
  'Suor nas palmas / plantas','Sudorese emocional',
];

export const RESPIRACAO_ELIMINACAO = [
  'Respiração nasal normal','Respiração oral predominante','Coriza constante',
  'Secreção nasal espessa','Expectoração frequente','Pigarro / catarro na garganta',
];

// ── 9. REVISÃO DE SISTEMAS ───────────────────────────────────
export const SISTEMAS = {
  cardiovascular: {
    label: '❤️ Cardiovascular',
    itens: [
      'Palpitações / taquicardia','Arritmia diagnosticada','Dor ou pressão no peito',
      'Falta de ar aos esforços','Ortopneia (piora ao deitar)','Edema de membros inferiores',
      'Varizes / insuficiência venosa','Hipertensão arterial','Hipotensão postural (tonturas ao levantar)',
      'Extremidades frias / cianose','Claudicação (dor ao andar)','Sopro cardíaco',
      'Histórico de infarto / angina','Histórico de AVC / AIT','Uso de marca-passo',
    ],
  },
  respiratorio: {
    label: '🫁 Respiratório',
    itens: [
      'Tosse crônica','Tosse com sangue (hemoptise)','Chiado / sibilância',
      'Falta de ar em repouso','Falta de ar aos esforços','Dor torácica respiratória',
      'Roncos / apneia do sono','Respiração bucal crônica','Rinite alérgica',
      'Sinusite recorrente','Pneumonia de repetição','Tuberculose passada',
      'Exposição a agrotóxicos / poeiras industriais','Tabagismo atual','Ex-tabagista',
    ],
  },
  digestivo: {
    label: '🫃 Digestivo / Gastrointestinal',
    itens: [
      'Refluxo / azia','Regurgitação','Náuseas','Vômitos','Disfagia (dificuldade de engolir)',
      'Dor epigástrica','Dor abdominal difusa','Cólicas intestinais','Distensão abdominal',
      'Flatulência em excesso','Constipação crônica','Diarreia crônica','Alternância intestinal',
      'Sangue nas fezes','Muco nas fezes','Hemorroidas','Fissura anal',
      'Icterícia','Hepatomegalia / esplenomegalia','Ascite','Intolerância a gorduras',
      'Candidiase intestinal (suspeita)','Disbiose intestinal (suspeita)','SIBO (suspeita)',
    ],
  },
  urinario: {
    label: '🫘 Urinário / Renal',
    itens: [
      'Infecções urinárias recorrentes','Cistite intersticial','Dor lombar / renal',
      'Cálculo renal (nefrolitíase)','Hematúria (sangue na urina)','Proteinúria (proteína na urina)',
      'Incontinência urinária de esforço','Bexiga hiperativa','Retenção urinária',
      'Prostatismo (homens)','Rim único / malformação renal','Doença renal crônica',
    ],
  },
  neurologico: {
    label: '🧠 Neurológico',
    itens: [
      'Cefaleia tensional','Enxaqueca (com ou sem aura)','Tontura / vertigem','Zumbido (tinnitus)',
      'Tremores','Convulsões / epilepsia','Formigamento / dormência (parestesias)',
      'Fraqueza muscular','Distúrbios de equilíbrio / ataxia','Perda de memória recente',
      'Confusão mental / névoa cerebral','Dislexia / TDAH','Neuropatia periférica',
      'Herpes zóster','Síncope (desmaio)','Alterações visuais (diplopia, visão turva)',
    ],
  },
  musculoesqueletico: {
    label: '🦴 Musculoesquelético',
    itens: [
      'Dor na coluna cervical','Dor na coluna torácica','Dor lombar',
      'Hérnia de disco','Escoliose','Espondiloartrite',
      'Dor nos ombros','Dor nos joelhos','Dor nos quadris',
      'Artrose / artrite','Artrite reumatoide','Gota (hiperuricemia)',
      'Fibromialgia','Tendinite / bursite','Síndrome do túnel do carpo',
      'Osteoporose / osteopenia','Fraturas por fragilidade','Dor muscular generalizada (mialgia)',
      'Câimbras frequentes','Fraqueza muscular progressiva',
    ],
  },
  pele: {
    label: '🧴 Pele / Cabelo / Unhas',
    itens: [
      'Acne','Rosácea','Dermatite atópica / eczema','Psoríase','Urticária',
      'Vitiligo','Melasma / hiperpigmentação','Queratose pilar',
      'Queda de cabelo (alopecia)','Cabelo ressecado / quebradiço',
      'Unhas quebradiças / estriadas','Unhas com manchas brancas (leuconíquia)',
      'Micose nas unhas (onicomicose)','Pele seca / descamativa','Pele oleosa',
      'Estrias','Celulite','Feridas de cicatrização lenta','Prurido (coceira generalizada)',
      'Sensibilidade ao sol (fotossensibilidade)',
    ],
  },
  endocrino: {
    label: '🧬 Endócrino / Metabólico',
    itens: [
      'Ganho de peso sem causa aparente','Dificuldade para emagrecer',
      'Perda de peso sem causa','Intolerância ao frio','Intolerância ao calor',
      'Fadiga extrema sem explicação','Hipoglicemia reativa','Hipoglicemia em jejum',
      'Polifagia (fome excessiva)','Polidipsia (sede excessiva)',
      'Resistência à insulina (suspeita)','Síndrome metabólica',
      'Bócio / nódulos tireoidianos','Hipotireoidismo diagnosticado',
      'Hipertireoidismo diagnosticado','Síndrome adrenal / fadiga adrenal (suspeita)',
      'Disfunção pituitária','Diabetes insipidus','Doenças das glândulas suprarrenais',
    ],
  },
  hormonal: {
    label: '🌸 Hormonal (F/M)',
    itens: [
      // Feminino
      'Ciclo menstrual irregular','Amenorreia (ausência de menstruação)',
      'Oligomenorreia (menstruação rara)','Polimenorreia (menstruação frequente)',
      'Dismenorreia (cólica intensa)','Menorragia (sangramento excessivo)',
      'TPM intensa (irritabilidade, inchaço, dor)','Sangramento fora do ciclo',
      'SOP (síndrome dos ovários policísticos)','Endometriose','Mioma uterino',
      'Menopausa (natural)','Menopausa precoce (< 40 anos)','Perimenopausa',
      'Fogachos / ondas de calor','Secura vaginal','Libido diminuída (feminino)',
      'Infertilidade feminina','Abortos de repetição',
      // Masculino
      'Disfunção erétil','Ejaculação precoce','Libido diminuída (masculino)',
      'Ginecomastia','Hipogonadismo','Problemas prostáticos','Infertilidade masculina',
      'Baixa testosterona (suspeita)','Varicocele',
      // Geral
      'Hirsutismo / excesso de pelos','Queda de cabelo androgenética',
      'Oscilações de humor hormonais','Retenção de líquidos cíclica',
    ],
  },
  imunologico: {
    label: '🛡️ Imunológico / Autoimune',
    itens: [
      'Infecções respiratórias frequentes (> 6×/ano)','Herpes recorrente',
      'HPV recorrente','Candidíase recorrente','Infecções bacterianas de repetição',
      'Doenças autoimunes diagnosticadas','Lúpus eritematoso sistêmico',
      'Artrite reumatoide','Esclerose múltipla','Tireoidite de Hashimoto',
      'Doença de Graves','Doença celíaca','Doença de Crohn','Colite ulcerativa',
      'Psoríase','Vitiligo','Síndrome de Sjögren','Febre reumática (passado)',
      'Alergias alimentares (IgE mediadas)','Hipersensibilidade alimentar (IgG)',
      'Alergia a medicamentos','Alergia ambiental (rinite/asma)',
      'Linfonodos aumentados sem causa definida',
    ],
  },
  oftalmologico: {
    label: '👁️ Oftalmológico / ORL',
    itens: [
      'Miopia / hipermetropia / astigmatismo','Glaucoma','Catarata',
      'Degeneração macular','Olhos secos (síndrome do olho seco)',
      'Conjuntivite de repetição','Visão turva intermitente','Fotofobia',
      'Dificuldade de visão noturna','Perda auditiva (hipoacusia)',
      'Zumbido (tinnitus)','Otites de repetição','Vertigem posicional',
      'Disfagia (dificuldade de engolir)','Disfonia (rouquidão crônica)',
      'Sangramento gengival','Aftas de repetição','Alterações no paladar / olfato',
    ],
  },
};

// ── 10. PSICO-EMOCIONAL ──────────────────────────────────────
export const EMOCIONAL_SINTOMAS = [
  'Ansiedade generalizada','Ataques de pânico','Fobia específica','Agorafobia',
  'Depressão','Tristeza crônica','Anedonia (perda de prazer)','Choro fácil e sem motivo',
  'Irritabilidade / raiva fácil','Agressividade','Impaciência crônica',
  'Medo excessivo de doenças (hipocondria)','Pensamentos obsessivos','Compulsões',
  'Procrastinação extrema','Falta de motivação','Desesperança',
  'Baixa autoestima','Sentimento de culpa excessivo','Vergonha patológica',
  'Dificuldade de concentração / névoa mental','Déficit de memória','TDAH',
  'Insônia por pensamentos acelerados','Sonhos angustiantes','Pesadelos recorrentes',
  'Dissociação / despersonalização','Trauma psicológico não resolvido',
  'Luto não elaborado','Relacionamentos conflituosos frequentes',
  'Dependência emocional','Codependência','Isolamento social',
  'Burnout / esgotamento profissional','Estresse crônico no trabalho',
];

export const EMOCIONAL_HISTORIA = [
  'Infância difícil / negligência','Abuso físico na infância/adolescência',
  'Abuso sexual','Abuso emocional/psicológico','Violência doméstica (atual ou passado)',
  'Perdas significativas recentes','Divórcio / separação','Luto por familiar',
  'Desemprego / dificuldades financeiras','Mudança de cidade / país',
  'Doença grave própria','Doença grave de familiar','Acidente grave',
  'Experiência perto da morte','Outros traumas significativos',
];

export const EMOCIONAL_RECURSOS = [
  'Apoio familiar','Apoio social / amigos','Acompanhamento psicológico atual',
  'Acompanhamento psiquiátrico atual','Medicação psiquiátrica atual',
  'Prática de mindfulness / meditação','Atividade física como recurso emocional',
  'Arte / música / dança como recurso','Espiritualidade como recurso',
  'Diário / escrita terapêutica','Voluntariado / propósito',
  'Sem recursos percebidos no momento',
];

// ── 11. ESPIRITUAL / SOCIAL ──────────────────────────────────
export const ESPIRITUAL_ITENS = [
  'Tem prática espiritual ou religiosa regular','Sente propósito de vida definido',
  'Sente conexão com algo maior que si mesmo','Meditação / oração diária',
  'Frequenta comunidade religiosa','Práticas xamânicas / indígenas',
  'Conexão com a natureza como fonte espiritual','Sente conflito espiritual / crise de fé',
  'Sem prática espiritual (agnóstico/ateu)','Interessa-se por desenvolvimento pessoal',
];

export const SOCIAL_ITENS = [
  'Rede de apoio social satisfatória','Sente solidão frequente','Conflitos familiares frequentes',
  'Dificuldade de estabelecer limites','Dependência de substâncias (álcool, tabaco, drogas)',
  'Uso de telas > 6h/dia (dependência digital)','Vida social ativa e satisfatória',
  'Trabalho satisfatório e com propósito','Trabalho insatisfatório e estressante',
  'Dificuldade financeira como fator de estresse','Moradia instável / insegura',
  'Exposição a violência no bairro / comunidade',
];

export const HABITOS_VICIOSO = [
  'Tabagismo (cigarros/dia: ___)','Ex-tabagista (parou há ___ anos)',
  'Álcool social (fins de semana)','Álcool diário (≥ 1 dose/dia)','Alcoolismo',
  'Maconha / cannabis (uso ocasional)','Maconha / cannabis (uso diário)',
  'Cocaína / crack','Benzodiazepínicos sem prescrição','Opióides sem prescrição',
  'Anabolizantes','Cafeína excessiva (> 3 cafés/dia)','Energia drinks',
  'Uso excessivo de redes sociais','Vício em jogos / apostas','Compulsão sexual',
  'Nenhum hábito vicioso percebido',
];

// ── 12. EXAMES COMPLEMENTARES ────────────────────────────────
export const EXAMES_GRUPOS = {
  hemograma: {
    label: '🩸 Hemograma Completo',
    itens: [
      { key: 'hemoglobina',    label: 'Hemoglobina',                   ref: 'H: 13–17 g/dL | M: 12–16 g/dL' },
      { key: 'hematocrito',   label: 'Hematócrito',                   ref: 'H: 40–50% | M: 36–46%' },
      { key: 'vcm',           label: 'VCM (Vol. corp. médio)',         ref: '80–100 fL' },
      { key: 'hcm',           label: 'HCM',                           ref: '27–33 pg' },
      { key: 'leucocitos',    label: 'Leucócitos totais',              ref: '4.500–11.000/mm³' },
      { key: 'neutrofilos',   label: 'Neutrófilos',                   ref: '50–70%' },
      { key: 'linfocitos',    label: 'Linfócitos',                    ref: '20–40%' },
      { key: 'monocitos',     label: 'Monócitos',                     ref: '2–8%' },
      { key: 'eosinofilos',   label: 'Eosinófilos',                   ref: '1–4%' },
      { key: 'plaquetas',     label: 'Plaquetas',                     ref: '150.000–400.000/mm³' },
      { key: 'vhs',           label: 'VHS (velocidade de hem.)',       ref: 'H: < 10 mm/h | M: < 20 mm/h' },
    ],
  },
  bioquimica: {
    label: '⚗️ Bioquímica / Metabolismo',
    itens: [
      { key: 'glicemia_jejum',  label: 'Glicemia de jejum',           ref: '< 100 mg/dL' },
      { key: 'hba1c',           label: 'HbA1c',                       ref: '< 5,7%' },
      { key: 'insulina',        label: 'Insulina de jejum',           ref: '< 10 µUI/mL' },
      { key: 'homa_ir',         label: 'HOMA-IR',                     ref: '< 2,5' },
      { key: 'colesterol_total',label: 'Colesterol total',            ref: '< 200 mg/dL' },
      { key: 'ldl',             label: 'LDL-colesterol',              ref: '< 130 mg/dL' },
      { key: 'hdl',             label: 'HDL-colesterol',              ref: 'H: > 40 | M: > 50 mg/dL' },
      { key: 'vldl',            label: 'VLDL',                        ref: '< 30 mg/dL' },
      { key: 'triglicerides',   label: 'Triglicerídeos',              ref: '< 150 mg/dL' },
      { key: 'acido_urico',     label: 'Ácido úrico',                 ref: 'H: 3,4–7 | M: 2,4–6 mg/dL' },
      { key: 'creatinina',      label: 'Creatinina',                  ref: 'H: 0,7–1,2 | M: 0,5–1,0 mg/dL' },
      { key: 'ureia',           label: 'Ureia',                       ref: '10–45 mg/dL' },
      { key: 'tgo_ast',         label: 'TGO (AST)',                   ref: '< 40 U/L' },
      { key: 'tgp_alt',         label: 'TGP (ALT)',                   ref: '< 35 U/L' },
      { key: 'ggt',             label: 'GGT (gama-GT)',               ref: 'H: < 55 | M: < 38 U/L' },
      { key: 'fosfatase_alc',   label: 'Fosfatase Alcalina',          ref: '44–147 U/L' },
      { key: 'bilirrubina_t',   label: 'Bilirrubina Total',           ref: '< 1,2 mg/dL' },
      { key: 'proteinas_t',     label: 'Proteínas Totais',            ref: '6,4–8,3 g/dL' },
      { key: 'albumina',        label: 'Albumina',                    ref: '3,5–5,0 g/dL' },
      { key: 'prot_reativa_c',  label: 'Proteína C-reativa (PCR)',    ref: '< 0,5 mg/dL' },
      { key: 'pcr_ultrassens',  label: 'PCR ultrassensível',          ref: '< 1,0 mg/L' },
    ],
  },
  tireoide: {
    label: '🦋 Tireoide',
    itens: [
      { key: 'tsh',      label: 'TSH',                    ref: '0,5–4,0 mUI/L (func.: 1–2)' },
      { key: 't4_livre', label: 'T4 livre',               ref: '0,8–1,8 ng/dL' },
      { key: 't3_livre', label: 'T3 livre',               ref: '2,3–4,2 pg/mL' },
      { key: 't3_total', label: 'T3 total',               ref: '80–200 ng/dL' },
      { key: 't4_total', label: 'T4 total',               ref: '5,1–12,2 µg/dL' },
      { key: 'anti_tpo', label: 'Anti-TPO',               ref: '< 35 UI/mL' },
      { key: 'anti_tg',  label: 'Anti-TG',                ref: '< 115 UI/mL' },
      { key: 'trab',     label: 'TRAb (anticorpo TSH-R)', ref: '< 1,75 UI/L' },
      { key: 't3_reverso',label: 'T3 reverso',            ref: '90–350 pg/mL' },
    ],
  },
  vitaminas_minerais: {
    label: '💊 Vitaminas & Minerais',
    itens: [
      { key: 'vitamina_d',  label: 'Vitamina D (25-OH)',     ref: '> 40–60 ng/mL (func.)' },
      { key: 'vitamina_b12',label: 'Vitamina B12',           ref: '> 400 pg/mL (func.)' },
      { key: 'acido_folico',label: 'Ácido fólico',           ref: '> 10 ng/mL' },
      { key: 'ferritina',   label: 'Ferritina',              ref: 'H: 30–300 | M: 15–150 ng/mL' },
      { key: 'ferro_s',     label: 'Ferro sérico',           ref: '60–170 µg/dL' },
      { key: 'tibc',        label: 'TIBC (capacidade ligação)', ref: '250–370 µg/dL' },
      { key: 'saturacao_ferro', label: 'Saturação de transferrina', ref: '20–50%' },
      { key: 'magnesio',    label: 'Magnésio sérico',        ref: '1,7–2,4 mg/dL (func.: > 2,0)' },
      { key: 'zinco',       label: 'Zinco sérico',           ref: '70–120 µg/dL' },
      { key: 'cobre',       label: 'Cobre sérico',           ref: '70–140 µg/dL' },
      { key: 'selenio',     label: 'Selênio',                ref: '70–150 µg/L' },
      { key: 'calcio_s',    label: 'Cálcio sérico',          ref: '8,5–10,5 mg/dL' },
      { key: 'fosforo',     label: 'Fósforo',                ref: '2,5–4,5 mg/dL' },
      { key: 'vitamina_a',  label: 'Vitamina A (retinol)',   ref: '30–65 µg/dL' },
      { key: 'vitamina_c',  label: 'Vitamina C',             ref: '0,4–1,5 mg/dL' },
      { key: 'vitamina_e',  label: 'Vitamina E',             ref: '5–20 mg/L' },
      { key: 'omega3_index',label: 'Índice Omega-3',         ref: '> 8%' },
      { key: 'coenzima_q10',label: 'CoQ10',                  ref: '> 0,5 µg/mL' },
    ],
  },
  hormonios: {
    label: '🧬 Hormônios',
    itens: [
      { key: 'cortisol_m',  label: 'Cortisol matinal (8h)',  ref: '6–25 µg/dL' },
      { key: 'dhea_s',      label: 'DHEA-S',                 ref: 'variável por idade/sexo' },
      { key: 'insulina_j',  label: 'Insulina de jejum',      ref: '< 10 µUI/mL' },
      { key: 'igf1',        label: 'IGF-1 (GH indireto)',    ref: 'variável por idade' },
      { key: 'fsh',         label: 'FSH',                    ref: 'variável por fase/sexo' },
      { key: 'lh',          label: 'LH',                     ref: 'variável por fase/sexo' },
      { key: 'estradiol',   label: 'Estradiol',              ref: 'variável por fase' },
      { key: 'progesterona',label: 'Progesterona',           ref: 'variável por fase' },
      { key: 'testosterona_t',label: 'Testosterona total',   ref: 'H: 300–1000 | M: 15–70 ng/dL' },
      { key: 'testosterona_l',label: 'Testosterona livre',   ref: 'variável' },
      { key: 'shbg',        label: 'SHBG',                   ref: 'H: 10–57 | M: 18–144 nmol/L' },
      { key: 'prolactina',  label: 'Prolactina',             ref: '< 20 ng/mL (F) | < 15 ng/mL (M)' },
      { key: 'pth',         label: 'PTH (paratormônio)',     ref: '18–65 pg/mL' },
      { key: 'aldosterona', label: 'Aldosterona',            ref: 'variável por posição' },
      { key: 'renina',      label: 'Renina plasmática',      ref: 'variável' },
      { key: 'melatonina',  label: 'Melatonina',             ref: 'pico noturno > 100 pg/mL' },
    ],
  },
  imunologia: {
    label: '🛡️ Imunologia / Inflamação',
    itens: [
      { key: 'ige_total',    label: 'IgE total',              ref: '< 100 UI/mL' },
      { key: 'iga',          label: 'IgA sérica',             ref: '70–400 mg/dL' },
      { key: 'igg',          label: 'IgG total',              ref: '700–1600 mg/dL' },
      { key: 'igm',          label: 'IgM',                    ref: '40–230 mg/dL' },
      { key: 'fator_reum',   label: 'Fator reumatoide',       ref: '< 20 UI/mL' },
      { key: 'anti_ccp',     label: 'Anti-CCP',               ref: '< 20 UI/mL' },
      { key: 'ana',          label: 'FAN (ANA)',               ref: 'negativo' },
      { key: 'anti_dna',     label: 'Anti-DNA nativo',        ref: '< 10 UI/mL' },
      { key: 'complemento',  label: 'Complemento (C3/C4)',     ref: 'valores normais' },
      { key: 'il6',          label: 'Interleucina-6 (IL-6)',  ref: '< 7 pg/mL' },
      { key: 'tnf_alpha',    label: 'TNF-alfa',               ref: '< 8,1 pg/mL' },
      { key: 'homocisteina', label: 'Homocisteína',           ref: '< 10 µmol/L (func.: < 8)' },
      { key: 'fibrinogenio', label: 'Fibrinogênio',           ref: '200–400 mg/dL' },
    ],
  },
  microbiota: {
    label: '🦠 Microbiota / Intestinal',
    itens: [
      { key: 'calprotectina', label: 'Calprotectina fecal',  ref: '< 50 µg/g' },
      { key: 'zonulina',      label: 'Zonulina (permeab.)',  ref: '< 30 ng/mL' },
      { key: 'siga_fecal',    label: 'SIgA fecal',          ref: '510–2040 µg/mL' },
      { key: 'h2_methane',    label: 'Teste respiratório (SIBO)', ref: 'negativo' },
      { key: 'parasitologico',label: 'Parasitológico de fezes', ref: 'negativo' },
      { key: 'h_pylori',      label: 'H. pylori (antigênio fecal)', ref: 'negativo' },
      { key: 'candida_cultura',label: 'Cultura p/ Candida', ref: 'negativo' },
      { key: 'microbioma_pcr',label: 'PCR microbioma (16S)', ref: 'análise qualitativa' },
    ],
  },
  genetica: {
    label: '🧬 Genética / Epigenética',
    itens: [
      { key: 'mthfr',        label: 'MTHFR (C677T / A1298C)',ref: 'sem mutação' },
      { key: 'comt',         label: 'COMT',                  ref: 'análise qualitativa' },
      { key: 'vdr',          label: 'VDR (receptor Vit D)',  ref: 'análise qualitativa' },
      { key: 'apoe',         label: 'ApoE (risco cardiovasc.)', ref: 'análise qualitativa' },
      { key: 'telomeros',    label: 'Comprimento dos telômeros', ref: 'análise qualitativa' },
      { key: 'snp_painel',   label: 'Painel SNP (personalizado)', ref: 'análise qualitativa' },
    ],
  },
};

// ── 13. HIPÓTESES DIAGNÓSTICAS ───────────────────────────────
export const HIPOTESES_CATEGORIAS = {
  nutricional: {
    label: '🥗 Carências Nutricionais',
    itens: [
      'Deficiência de vitamina D','Deficiência de vitamina B12','Deficiência de ferro / anemia ferropriva',
      'Anemia megaloblástica (B12/folato)','Deficiência de magnésio','Deficiência de zinco',
      'Deficiência de selênio','Deficiência de iodo','Deficiência de ômega-3',
      'Deficiência de vitamina A','Deficiência de vitamina C','Deficiência de vitamina E',
      'Deficiência de vitaminas do complexo B','Desnutrição proteica (albumina baixa)',
      'Excesso de cobre (estopilismo de cobre)','Intoxicação por metais pesados',
    ],
  },
  metabolica: {
    label: '⚗️ Desequilíbrios Metabólicos',
    itens: [
      'Resistência à insulina','Síndrome metabólica','Pré-diabetes','Diabetes tipo 2',
      'Dislipidemia aterogênica (LDL alto, HDL baixo, TG alto)',
      'Obesidade (IMC > 30)','Sobrepeso (IMC 25–30)','Hiperuricemia / gota',
      'Hipertensão arterial','Hipotensão arterial','Hipoglicemia reativa',
      'SIBO (supercrescimento bacteriano)','Disbiose intestinal','Candidíase sistêmica (suspeita)',
      'Hiperpermeabilidade intestinal (Leaky Gut)','Constipação crônica funcional',
    ],
  },
  hormonal_diag: {
    label: '🌸 Desequilíbrios Hormonais',
    itens: [
      'Hipotireoidismo clínico','Hipotireoidismo subclínico','Hipertireoidismo',
      'Tireoidite de Hashimoto','Deficiência de testosterona','Domínio estrogênico',
      'Deficiência de progesterona','SOP','Endometriose','Menopausa / andropausa',
      'Fadiga adrenal (fase 1–2)','Insuficiência adrenal (fase 3)','Deficiência de DHEA',
      'Resistência ao cortisol','Hiperprolactinemia','Deficiência de hormônio do crescimento',
    ],
  },
  inflamacao: {
    label: '🔥 Inflamação & Autoimunidade',
    itens: [
      'Inflamação sistêmica crônica de baixo grau','Síndrome de hiperpermeabilidade intestinal',
      'Artrite reumatoide','Lúpus eritematoso sistêmico','Tireoidite de Hashimoto',
      'Doença celíaca','Doença de Crohn','Retocolite ulcerativa','Psoríase',
      'Fibromialgia','Síndrome de fadiga crônica','Esclerose múltipla',
      'Síndrome de Sjögren','Síndrome dos anticorpos antifosfolipídeos',
      'Sensibilidade ao glúten não celíaca','Intolerância à histamina',
      'Síndrome de ativação de mastócitos',
    ],
  },
  intoxicacao: {
    label: '☠️ Toxicidade & Detox',
    itens: [
      'Sobrecarga hepática / fase 2 comprometida','Intoxicação por mercúrio',
      'Intoxicação por chumbo','Intoxicação por arsênico','Intoxicação por alumínio',
      'Sobrecarga de agrotóxicos','Exposição a solventes orgânicos',
      'Toxicidade por plásticos (BPA, ftalatos)','Estresse oxidativo elevado',
      'Deficiência de glutationa','Deficiência de superóxido dismutase',
      'Polimorfismo MTHFR (homozigoto)','Disfunção de metilação',
    ],
  },
  mental: {
    label: '🧠 Saúde Mental / Neurológico',
    itens: [
      'Ansiedade generalizada','Transtorno de pânico','Depressão maior',
      'Distimia (depressão crônica leve)','Transtorno bipolar','TDAH',
      'Burnout / esgotamento','Trauma psicológico não resolvido (TEPT)',
      'Luto complicado','Depressão sazonal','Névoa cerebral (brain fog)',
      'Neurinflamação crônica','Déficit de neurotransmissores (dopamina/serotonina)',
      'Insônia crônica','Síndrome de fadiga crônica (SFC/ME)',
    ],
  },
};
