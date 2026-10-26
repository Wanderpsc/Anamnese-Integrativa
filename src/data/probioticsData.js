// Base de dados de probióticos com indicações, dosagens e contraindicações
// Baseado em evidências da Medicina Funcional Integrativa

export const PROBIOTIC_STRAINS = {
  'Bifidobacterium adolescentis': {
    name: 'Bifidobacterium adolescentis',
    category: 'Bifidobacterium',
    bioMamps: 'Melhora sintomas de constipação e regula o pH intestinal',
    benefits: [
      'Aumenta produção de ácidos graxos de cadeia curta (SCFAs)',
      'Estimula a resposta imune intestinal, especialmente em idosos',
      'Promove aumento de lactobacilos e bifidobactérias no intestino',
      'Reduz inflamação intestinal',
      'Alivia SII e melhora sintomas de constipação'
    ],
    indications: [
      'Constipação crônica',
      'Inflamação intestinal',
      'SII (Síndrome do Intestino Irritável)',
      'Imunodeficiência em idosos',
      'Regulação do pH intestinal'
    ],
    dosage: '5-10 bilhões UFC/dia',
    posology: '1 vez ao dia, preferencialmente pela manhã em jejum ou 30 minutos antes das refeições',
    duration: '4-8 semanas (fase aguda), 8-12 semanas (manutenção)',
    contraindications: [
      'Pacientes imunocomprometidos (avaliar individualmente)',
      'SIBO ativo (aguardar tratamento prévio)',
      'Inflamação intestinal aguda grave'
    ],
    symptoms: ['constipação', 'intestino preso', 'prisão de ventre', 'inflamação intestinal', 'sii'],
    precautions: 'Introduzir gradualmente. Monitorar gases e desconforto nas primeiras 2 semanas.'
  },

  'Bacillus coagulans': {
    name: 'Bacillus coagulans (Lactobacillus sporogenes)',
    category: 'Bacillus',
    bioMamps: 'Forma esporulada com alta resistência à acidez gástrica',
    benefits: [
      'Reduz inflamação intestinal',
      'Alivia SII e melhora sintomas de constipação',
      'Alta resistência à acidez gástrica',
      'Sobrevive melhor ao trânsito gastrointestinal'
    ],
    indications: [
      'SII com constipação',
      'Inflamação intestinal leve a moderada',
      'Pacientes com baixa acidez gástrica',
      'Disbiose intestinal'
    ],
    dosage: '2-6 bilhões UFC/dia',
    posology: '1 vez ao dia, pode ser tomado com alimentos',
    duration: '4-12 semanas',
    contraindications: [
      'Imunocomprometidos severos',
      'SIBO não tratado'
    ],
    symptoms: ['constipação', 'sii', 'inflamação', 'disbiose'],
    precautions: 'Geralmente bem tolerado. Forma esporulada garante maior estabilidade.'
  },

  'Lactobacillus rhamnosus GG': {
    name: 'Lactobacillus rhamnosus GG',
    category: 'Lactobacillus',
    bioMamps: 'Regula o eixo intestino-imunidade',
    benefits: [
      'Ampla atuação em imunidade, saúde digestiva e alergias',
      'Auxilia na prevenção de diarréia e infecções respiratórias',
      'Cepa GG é bem estudada',
      'Potente capacidade de adesão',
      'Reduz infecções de repetição'
    ],
    indications: [
      'Diarréia infecciosa',
      'Diarréia associada a antibióticos',
      'Infecções respiratórias recorrentes',
      'Alergias e dermatites atópicas',
      'Fortalecimento imunológico',
      'Disbiose'
    ],
    dosage: '10-20 bilhões UFC/dia (adultos), 5-10 bilhões UFC/dia (crianças)',
    posology: '1-2 vezes ao dia, preferencialmente com alimentos',
    duration: '4-8 semanas (agudo), pode ser usado continuamente para imunidade',
    contraindications: [
      'Pacientes severamente imunocomprometidos',
      'Cateter venoso central (risco de bacteremia)'
    ],
    symptoms: ['diarreia', 'infecções respiratórias', 'gripe', 'resfriado', 'alergia', 'dermatite', 'imunidade baixa'],
    precautions: 'Uma das cepas mais seguras e estudadas. Pode ser usada em crianças e idosos.'
  },

  'Saccharomyces boulardii': {
    name: 'Saccharomyces boulardii',
    category: 'Levedura',
    bioMamps: 'Levedura probiótica resistente a antibióticos',
    benefits: [
      'Trata diarréia infecciosa, C. difficile e diarréia associada a antibióticos',
      'Estimula produção de IgA',
      'Reduz distensão abdominal, SII e permeabilidade',
      'Forte adesão ao epitélio intestinal',
      'Cepa de ação anti-inflamatória'
    ],
    indications: [
      'Diarréia associada a antibióticos',
      'Infecção por Clostridium difficile',
      'Diarréia do viajante',
      'SII com diarréia',
      'Permeabilidade intestinal aumentada',
      'Disbiose pós-antibiótico'
    ],
    dosage: '250-500mg (5-10 bilhões UFC) 2 vezes ao dia',
    posology: 'Tomar longe das refeições, com água fria ou morna (nunca quente)',
    duration: '5-10 dias (diarréia aguda), 4-8 semanas (SII ou permeabilidade)',
    contraindications: [
      'Pacientes com cateter venoso central',
      'Imunocomprometidos graves',
      'Alergia a leveduras'
    ],
    symptoms: ['diarreia', 'antibiótico', 'viagem', 'sii', 'permeabilidade intestinal', 'distensão'],
    precautions: 'Pode ser usado DURANTE tratamento antibiótico. Não misturar com líquidos quentes.'
  },

  'Lactobacillus reuteri': {
    name: 'Lactobacillus reuteri',
    category: 'Lactobacillus',
    bioMamps: 'Promove produção de serotonina. Efeito positivo no humor, sono e comportamento',
    benefits: [
      'Atua em saúde oral, vaginal e intestinal',
      'Promove produção de serotonina',
      'Efeito positivo no humor, sono e comportamento',
      'Reduz colonização por H. pylori',
      'Ação anti-inflamatória'
    ],
    indications: [
      'Ansiedade e depressão',
      'Distúrbios do sono',
      'Saúde bucal (cáries, gengivite)',
      'Candidíase vaginal recorrente',
      'Cólicas infantis',
      'Infecção por H. pylori'
    ],
    dosage: '100 milhões - 1 bilhão UFC/dia',
    posology: '1 vez ao dia, preferencialmente à noite',
    duration: '8-12 semanas',
    contraindications: [
      'Imunocomprometidos',
      'Histórico de endocardite'
    ],
    symptoms: ['ansiedade', 'depressão', 'insônia', 'sono ruim', 'cárie', 'gengivite', 'candidíase', 'h. pylori'],
    precautions: 'Especialmente útil para eixo intestino-cérebro. Pode ser usado em bebês para cólicas.'
  },

  'Bifidobacterium lactis': {
    name: 'Bifidobacterium lactis (B. lactis)',
    category: 'Bifidobacterium',
    bioMamps: 'Foco em imunomodulação e produção de SCFAs',
    benefits: [
      'Potente imunoestimulador',
      'Reduz sintomas respiratórios em crianças',
      'Melhora sintomas de SII',
      'Estimula resposta imune inata',
      'Melhora regularidade intestinal'
    ],
    indications: [
      'Infecções respiratórias recorrentes',
      'SII (constipação ou mista)',
      'Fortalecimento imunológico',
      'Constipação',
      'Disbiose'
    ],
    dosage: '10-50 bilhões UFC/dia',
    posology: '1-2 vezes ao dia, com ou sem alimentos',
    duration: '4-12 semanas',
    contraindications: [
      'Pacientes imunocomprometidos (avaliar)'
    ],
    symptoms: ['infecções respiratórias', 'constipação', 'sii', 'imunidade baixa'],
    precautions: 'Uma das cepas mais utilizadas e seguras. Boa para uso pediátrico.'
  },

  'Lactobacillus plantarum': {
    name: 'Lactobacillus plantarum',
    category: 'Lactobacillus',
    bioMamps: 'Fortalece a barreira intestinal',
    benefits: [
      'Apoio à saúde intestinal',
      'Fortalece a barreira intestinal',
      'Auxilia em alergias, dermatites e disbiose',
      'Reduz permeabilidade intestinal',
      'Melhora distúrbios funcionais'
    ],
    indications: [
      'Permeabilidade intestinal (leaky gut)',
      'SII',
      'Alergias alimentares',
      'Dermatites',
      'Disbiose',
      'Distúrbios gastrointestinais funcionais'
    ],
    dosage: '10-30 bilhões UFC/dia',
    posology: '1 vez ao dia, 30 minutos antes das refeições',
    duration: '8-12 semanas',
    contraindications: [
      'SIBO ativo',
      'Imunocomprometidos graves'
    ],
    symptoms: ['permeabilidade intestinal', 'leaky gut', 'sii', 'alergia alimentar', 'dermatite', 'disbiose'],
    precautions: 'Excelente para reparação da mucosa. Pode combinar com L-glutamina e zinco.'
  },

  'Bifidobacterium longum': {
    name: 'Bifidobacterium longum',
    category: 'Bifidobacterium',
    bioMamps: 'Regula o eixo intestino-cérebro, melhora humor e ansiedade',
    benefits: [
      'Regula o eixo intestino-cérebro',
      'Melhora humor e ansiedade',
      'Protege contra inflamação crônica',
      'Melhora sintomas de SII',
      'Reduz cortisol'
    ],
    indications: [
      'Ansiedade e depressão',
      'Estresse crônico',
      'SII com componente psicológico',
      'Inflamação crônica',
      'Nevoeiro mental'
    ],
    dosage: '1-10 bilhões UFC/dia',
    posology: '1 vez ao dia, preferencialmente à noite',
    duration: '8-12 semanas ou mais',
    contraindications: [
      'Imunocomprometidos'
    ],
    symptoms: ['ansiedade', 'depressão', 'estresse', 'sii', 'nevoeiro mental', 'fadiga mental'],
    precautions: 'Combina bem com L. helveticus para efeitos psicotrópicos. Ajuda no eixo HPA.'
  },

  'Lactobacillus helveticus': {
    name: 'Lactobacillus helveticus',
    category: 'Lactobacillus',
    bioMamps: 'Melhora do humor e efeitos neuromoduladores',
    benefits: [
      'Produz peptídeos com efeito calmante',
      'Reduz permeabilidade intestinal',
      'Associado à redução da pressão arterial',
      'Aplicação em saúde mental e cardiovascular',
      'Reduz cortisol'
    ],
    indications: [
      'Ansiedade',
      'Estresse',
      'Hipertensão',
      'Permeabilidade intestinal',
      'Distúrbios do humor'
    ],
    dosage: '3-6 bilhões UFC/dia (geralmente combinado com B. longum)',
    posology: '1 vez ao dia, preferencialmente à noite',
    duration: '8-12 semanas',
    contraindications: [
      'Imunocomprometidos',
      'Hipotensão (monitorar pressão)'
    ],
    symptoms: ['ansiedade', 'estresse', 'hipertensão', 'permeabilidade intestinal', 'insônia'],
    precautions: 'Frequentemente usado em combinação com B. longum para ansiedade. Efeito GABAérgico.'
  },

  'Lactobacillus gasseri': {
    name: 'Lactobacillus gasseri',
    category: 'Lactobacillus',
    bioMamps: 'Efeito antiobesidade e metabólico',
    benefits: [
      'Promove redução da gordura abdominal',
      'Melhora a resistência à insulina',
      'Ajuda na digestão da lactose',
      'Aplicação em saúde metabólica e emagrecimento',
      'Aumenta produção de IgA secretória'
    ],
    indications: [
      'Obesidade e sobrepeso',
      'Gordura visceral',
      'Resistência à insulina',
      'Síndrome metabólica',
      'Intolerância à lactose'
    ],
    dosage: '10-30 bilhões UFC/dia',
    posology: '1 vez ao dia, antes do café da manhã',
    duration: '12-24 semanas para efeitos metabólicos',
    contraindications: [
      'Imunocomprometidos'
    ],
    symptoms: ['obesidade', 'sobrepeso', 'gordura abdominal', 'resistência à insulina', 'diabetes', 'intolerância à lactose'],
    precautions: 'Necessita uso prolongado para efeitos metabólicos. Combinar com dieta e exercícios.'
  },

  'Bifidobacterium infantis': {
    name: 'Bifidobacterium infantis',
    category: 'Bifidobacterium',
    bioMamps: 'Reduz dor abdominal e distensão em SII',
    benefits: [
      'Produz SCFAs com efeito anti-inflamatório',
      'Antioxidante e antimicrobiano',
      'Reduz marcadores inflamatórios',
      'Melhora saúde hepática e combate disbiose',
      'Modulador da resposta imunológica'
    ],
    indications: [
      'SII (todos os subtipos)',
      'Distensão e dor abdominal',
      'Inflamação intestinal',
      'Disbiose',
      'Esteatose hepática'
    ],
    dosage: '1-10 bilhões UFC/dia',
    posology: '1 vez ao dia, com alimentos',
    duration: '4-12 semanas',
    contraindications: [
      'Imunocomprometidos'
    ],
    symptoms: ['sii', 'dor abdominal', 'distensão', 'gases', 'inflamação intestinal', 'disbiose', 'fígado gorduroso'],
    precautions: 'Uma das cepas mais eficazes para SII. Pode ser usada em bebês.'
  },

  'Bifidobacterium breve': {
    name: 'Bifidobacterium breve',
    category: 'Bifidobacterium',
    bioMamps: 'Auxilia na digestão de oligossacarídeos',
    benefits: [
      'Reduz incidência de diarréia e infecções em lactentes',
      'Inibe patógenos intestinais',
      'Efeitos antioxidantes e antimicrobianos',
      'Reduz inflamação intestinal e sintomas de dermatite atópica'
    ],
    indications: [
      'Diarréia em crianças',
      'Dermatite atópica',
      'Alergias',
      'Disbiose infantil',
      'Prevenção de infecções'
    ],
    dosage: '3-10 bilhões UFC/dia',
    posology: '1 vez ao dia, pode ser misturado com leite materno ou fórmula',
    duration: '4-8 semanas',
    contraindications: [
      'Prematuros extremos (avaliar)',
      'Imunocomprometidos'
    ],
    symptoms: ['dermatite', 'alergia', 'diarreia infantil', 'infecções recorrentes'],
    precautions: 'Seguro para uso pediátrico. Combina bem com outras cepas para alergias.'
  },

  'Lactobacillus acidophilus': {
    name: 'Lactobacillus acidophilus',
    category: 'Lactobacillus',
    bioMamps: 'Atua em saúde vaginal e intestinal com potente capacidade de adesão',
    benefits: [
      'Produz bacteriocinas contra patógenos',
      'Clássico probiótico para equilíbrio da microbiota',
      'Melhora saúde vaginal',
      'Auxilia em intolerância à lactose',
      'Reduz disbiose'
    ],
    indications: [
      'Vaginose bacteriana',
      'Candidíase recorrente',
      'Intolerância à lactose',
      'Disbiose intestinal',
      'Diarréia leve'
    ],
    dosage: '1-10 bilhões UFC/dia',
    posology: '1-2 vezes ao dia, preferencialmente com alimentos',
    duration: '4-8 semanas',
    contraindications: [
      'Imunocomprometidos severos',
      'Endocardite prévia'
    ],
    symptoms: ['candidíase', 'vaginose', 'intolerância à lactose', 'disbiose', 'diarreia'],
    precautions: 'Uma das cepas mais antigas e estudadas. Boa para uso vaginal tópico também.'
  },

  'Lactobacillus casei': {
    name: 'Lactobacillus casei',
    category: 'Lactobacillus',
    bioMamps: 'Melhora resposta imune em infecções respiratórias',
    benefits: [
      'Estimula resposta imune inata',
      'Melhora sintomas de SII',
      'Reduz sintomas respiratórios em crianças',
      'Efeito sinérgico com L. paracasei na imunomodulação'
    ],
    indications: [
      'Infecções respiratórias recorrentes',
      'SII',
      'Fortalecimento imunológico',
      'Alergias respiratórias'
    ],
    dosage: '10-30 bilhões UFC/dia',
    posology: '1 vez ao dia, com alimentos',
    duration: '4-12 semanas',
    contraindications: [
      'Imunocomprometidos'
    ],
    symptoms: ['infecções respiratórias', 'gripe', 'resfriado', 'sii', 'imunidade baixa'],
    precautions: 'Amplamente usado em produtos lácteos fermentados. Seguro para uso pediátrico.'
  },

  'Streptococcus thermophilus': {
    name: 'Streptococcus thermophilus',
    category: 'Streptococcus',
    bioMamps: 'Suporte digestivo, inclusive em intolerância à lactose',
    benefits: [
      'Produz lactase, auxilia em intolerância à lactose',
      'Usado na fermentação láctea',
      'Efeito imunomodulador',
      'Melhora a digestão de laticínios'
    ],
    indications: [
      'Intolerância à lactose',
      'Desconforto com laticínios',
      'Suporte digestivo geral'
    ],
    dosage: '1-5 bilhões UFC/dia',
    posology: '1 vez ao dia, com alimentos',
    duration: '4-8 semanas',
    contraindications: [
      'Alergia severa a proteínas do leite (avaliar)'
    ],
    symptoms: ['intolerância à lactose', 'desconforto com laticínios', 'gases', 'diarreia após leite'],
    precautions: 'Geralmente presente em iogurtes. Muito seguro.'
  },

  'Lactobacillus paracasei': {
    name: 'Lactobacillus paracasei',
    category: 'Lactobacillus',
    bioMamps: 'Reduz inflamação intestinal e sintomas de dermatite atópica',
    benefits: [
      'Estimula o sistema imunológico',
      'Reduz inflamação intestinal',
      'Melhora dermatite atópica',
      'Suporte digestivo e imunológico'
    ],
    indications: [
      'Dermatite atópica',
      'Alergias',
      'Infecções recorrentes',
      'Inflamação intestinal leve'
    ],
    dosage: '10-20 bilhões UFC/dia',
    posology: '1 vez ao dia, com ou sem alimentos',
    duration: '8-12 semanas',
    contraindications: [
      'Imunocomprometidos'
    ],
    symptoms: ['dermatite', 'alergia', 'eczema', 'inflamação intestinal', 'imunidade baixa'],
    precautions: 'Combina bem com outras cepas para condições alérgicas.'
  },

  'Lactobacillus crispatus': {
    name: 'Lactobacillus crispatus',
    category: 'Lactobacillus',
    bioMamps: 'Predominante no microbioma vaginal saudável',
    benefits: [
      'Coloniza eficazmente o intestino delgado',
      'Produz ácido lático, mantendo pH vaginal',
      'Previne vaginose bacteriana',
      'Favorece regulação do colesterol'
    ],
    indications: [
      'Vaginose bacteriana',
      'Candidíase recorrente',
      'Prevenção de infecção urinária',
      'Saúde urogenital feminina'
    ],
    dosage: '1-5 bilhões UFC/dia (oral ou vaginal)',
    posology: 'Via oral: 1 vez ao dia. Via vaginal: conforme orientação',
    duration: '4-12 semanas',
    contraindications: [
      'Alergia a componentes da fórmula'
    ],
    symptoms: ['vaginose', 'candidíase', 'infecção urinária', 'corrimento'],
    precautions: 'Pode ser usado via oral ou vaginal. Essencial para microbioma vaginal saudável.'
  },

  'Streptococcus salivarius': {
    name: 'Streptococcus salivarius',
    category: 'Streptococcus',
    bioMamps: 'Atua na cavidade oral, prevenindo infecções respiratórias',
    benefits: [
      'Eficaz contra Streptococcus pyogenes',
      'Atua na cavidade oral',
      'Previne infecções respiratórias',
      'Reduz amigdalites e faringites'
    ],
    indications: [
      'Infecções de garganta recorrentes',
      'Amigdalites',
      'Faringites',
      'Otites',
      'Saúde oral'
    ],
    dosage: '1-5 bilhões UFC/dia',
    posology: 'Pastilhas ou sachês para dissolver na boca, 1-2 vezes ao dia',
    duration: '4-12 semanas ou preventivo contínuo',
    contraindications: [
      'Imunocomprometidos severos'
    ],
    symptoms: ['dor de garganta', 'amigdalite', 'faringite', 'otite', 'infecções respiratórias'],
    precautions: 'Deve ser usado via oral (pastilhas). Evitar engolir imediatamente.'
  },

  'Lactobacillus johnsonii': {
    name: 'Lactobacillus johnsonii',
    category: 'Lactobacillus',
    bioMamps: 'Auxilia na proteção contra Helicobacter pylori',
    benefits: [
      'Atua em saúde vaginal',
      'Combate intolerância à lactose',
      'Proteção contra H. pylori',
      'Reduz disbiose'
    ],
    indications: [
      'Infecção por H. pylori',
      'Gastrite',
      'Intolerância à lactose',
      'Saúde vaginal'
    ],
    dosage: '1-10 bilhões UFC/dia',
    posology: '1 vez ao dia, com alimentos',
    duration: '8-12 semanas',
    contraindications: [
      'Imunocomprometidos'
    ],
    symptoms: ['h. pylori', 'gastrite', 'azia', 'intolerância à lactose'],
    precautions: 'Especialmente útil como adjuvante no tratamento de H. pylori.'
  },

  'Enterococcus faecium': {
    name: 'Enterococcus faecium',
    category: 'Enterococcus',
    bioMamps: 'Coloniza bem o intestino',
    benefits: [
      'Reduz infecções e compete com patógenos',
      'Coloniza bem o intestino',
      'Aplicação em inflamação intestinal',
      'Produção de citocinas anti-inflamatórias'
    ],
    indications: [
      'Disbiose',
      'Inflamação intestinal',
      'Prevenção de infecções'
    ],
    dosage: '1-10 bilhões UFC/dia',
    posology: '1 vez ao dia',
    duration: '4-8 semanas',
    contraindications: [
      'Imunocomprometidos (ALTO RISCO - avaliar resistência)',
      'Pacientes hospitalizados',
      'Uso de antibióticos de amplo espectro'
    ],
    symptoms: ['disbiose', 'inflamação intestinal'],
    precautions: 'CUIDADO: Deve ser usado com cautela devido ao risco de cepas resistentes. Evitar em pacientes vulneráveis.'
  },

  'Lactococcus lactis': {
    name: 'Lactococcus lactis',
    category: 'Lactococcus',
    bioMamps: 'Atua em saúde oral, imunidade e inflamação',
    benefits: [
      'Produz substâncias antimicrobianas',
      'Atua em saúde oral',
      'Suporte imunológico',
      'Reduz inflamação'
    ],
    indications: [
      'Saúde oral',
      'Suporte imunológico',
      'Inflamação leve'
    ],
    dosage: '1-5 bilhões UFC/dia',
    posology: '1 vez ao dia',
    duration: '4-8 semanas',
    contraindications: [
      'Imunocomprometidos'
    ],
    symptoms: ['inflamação', 'saúde oral', 'imunidade baixa'],
    precautions: 'Usado principalmente na indústria alimentícia. Seguro.'
  }
};

// Mapa de sintomas para cepas recomendadas
export const SYMPTOM_TO_STRAINS = {
  'constipação': ['Bifidobacterium adolescentis', 'Bacillus coagulans', 'Bifidobacterium lactis', 'Lactobacillus casei'],
  'diarreia': ['Lactobacillus rhamnosus GG', 'Saccharomyces boulardii', 'Bifidobacterium breve'],
  'sii': ['Bifidobacterium infantis', 'Lactobacillus plantarum', 'Bacillus coagulans', 'Bifidobacterium lactis'],
  'ansiedade': ['Bifidobacterium longum', 'Lactobacillus helveticus', 'Lactobacillus reuteri'],
  'depressão': ['Bifidobacterium longum', 'Lactobacillus helveticus', 'Lactobacillus reuteri'],
  'estresse': ['Lactobacillus helveticus', 'Bifidobacterium longum'],
  'insônia': ['Lactobacillus reuteri', 'Lactobacillus helveticus'],
  'obesidade': ['Lactobacillus gasseri', 'Bifidobacterium breve'],
  'gordura abdominal': ['Lactobacillus gasseri'],
  'diabetes': ['Lactobacillus gasseri'],
  'hipertensão': ['Lactobacillus helveticus'],
  'candidíase': ['Lactobacillus crispatus', 'Lactobacillus acidophilus', 'Lactobacillus reuteri'],
  'vaginose': ['Lactobacillus crispatus', 'Lactobacillus acidophilus'],
  'infecções respiratórias': ['Lactobacillus rhamnosus GG', 'Bifidobacterium lactis', 'Lactobacillus casei', 'Streptococcus salivarius'],
  'alergia': ['Lactobacillus rhamnosus GG', 'Lactobacillus paracasei', 'Bifidobacterium breve'],
  'dermatite': ['Lactobacillus rhamnosus GG', 'Lactobacillus paracasei', 'Bifidobacterium breve', 'Lactobacillus plantarum'],
  'permeabilidade intestinal': ['Lactobacillus plantarum', 'Lactobacillus helveticus', 'Saccharomyces boulardii'],
  'inflamação intestinal': ['Bifidobacterium infantis', 'Lactobacillus plantarum', 'Bifidobacterium adolescentis'],
  'disbiose': ['Lactobacillus acidophilus', 'Bifidobacterium bifidum', 'Lactobacillus plantarum'],
  'gases': ['Bifidobacterium infantis', 'Saccharomyces boulardii'],
  'distensão': ['Bifidobacterium infantis', 'Saccharomyces boulardii'],
  'h. pylori': ['Lactobacillus johnsonii', 'Lactobacillus reuteri'],
  'gastrite': ['Lactobacillus johnsonii'],
  'intolerância à lactose': ['Streptococcus thermophilus', 'Lactobacillus acidophilus', 'Lactobacillus gasseri'],
  'imunidade baixa': ['Lactobacillus rhamnosus GG', 'Bifidobacterium lactis', 'Lactobacillus casei'],
  'dor de garganta': ['Streptococcus salivarius'],
  'amigdalite': ['Streptococcus salivarius'],
  'infecção urinária': ['Lactobacillus crispatus'],
  'fígado gorduroso': ['Bifidobacterium infantis']
};

// Orientações gerais
export const GENERAL_GUIDELINES = {
  introduction: 'A prescrição de probióticos na prática clínica vai muito além da simples escolha de um suplemento. Na medicina funcional integrativa, cada cepa possui ações específicas e sua eficácia depende do quadro clínico e individualidade bioquímica do paciente.',
  
  duration: {
    acute: '4-8 semanas: Redução de sintomas agudos (diarreia, constipação, distensão)',
    transition: '8-12 semanas: Manutenção e adaptação',
    maintenance: '12-24 semanas ou mais: Condições crônicas, autoimunidade ou estresse persistente'
  },
  
  monitoring: [
    'Reavaliar a cada 4 a 8 semanas',
    'Ajustar cepa, dose ou suspender se necessário',
    'Observar melhora de sintomas, regularidade intestinal, redução de infecções',
    'Atentar para sinais de reação adversa'
  ],
  
  contraindications: [
    'Pacientes imunocomprometidos (avaliar individualmente)',
    'SIBO ativo não tratado',
    'Inflamação intestinal aguda grave',
    'Pacientes com cateter venoso central'
  ],
  
  adverseReactions: [
    'Aumento de gases e desconforto nas primeiras semanas',
    'Fadiga pós-prandial acentuada',
    'Sintomas neurológicos (confusão mental, irritabilidade, insônia)',
    'Sintomas dermatológicos (prurido, acne)',
    'Diarreia persistente ou constipação agravada'
  ],
  
  conduct: {
    title: 'Conduta frente a reação adversa:',
    steps: [
      'Interromper temporariamente',
      'Investigar SIBO, permeabilidade intestinal, reatividade a excipientes',
      'Rever tempo de uso',
      'Considerar transição para cepas mais moduladoras ou com ação anti-inflamatória específica'
    ]
  }
};
