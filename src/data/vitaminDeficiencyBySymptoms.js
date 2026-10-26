// Base de dados: Deficiência de Vitaminas por Sintomas
// Estrutura completa com todos os sintomas e suas relações com vitaminas/minerais/suplementos

export const VITAMIN_DEFICIENCY_DATABASE = {
  // Sintomas Gastrointestinais
  'ALTERN. INTESTINAL': {
    categoria: 'Gastrointestinal',
    vitaminas: ['B9', 'B12', 'D', 'Fe', 'Mg', 'GL']
  },
  'DIARREIA ++': {
    categoria: 'Gastrointestinal',
    vitaminas: ['Zn', 'I', 'GL']
  },
  'COLICAS INTESTIN.': {
    categoria: 'Gastrointestinal',
    vitaminas: ['D', 'Mg', 'O3', 'Ca']
  },
  'FLATULENCIAS': {
    categoria: 'Gastrointestinal',
    vitaminas: ['GL']
  },
  'INTES. IRRITAVEL': {
    categoria: 'Gastrointestinal',
    vitaminas: ['D', 'Mg', 'O3', 'GL']
  },

  // Sintomas Digestivos
  'APETITE IRREGULAR': {
    categoria: 'Digestivo',
    vitaminas: ['A', 'B1', 'B3', 'B6', 'B9', 'B12', 'C', 'Fe', 'Mg', 'Zn', 'Cr', 'Q']
  },
  'NAUSEAS': {
    categoria: 'Digestivo',
    vitaminas: ['B6', 'Mg']
  },
  'MÁ DIGESTÃO': {
    categoria: 'Digestivo',
    vitaminas: ['Mg', 'Zn', 'AL']
  },

  // Sistema Imunológico
  'IMUNIDADE BAIXA': {
    categoria: 'Imunológico',
    vitaminas: ['C', 'D', 'Mg', 'O3', 'Mn', 'Se', 'AL']
  },

  // Pele, Cabelos e Unhas
  'ALTERAÇÕES PELE': {
    categoria: 'Pele/Cabelos/Unhas',
    vitaminas: ['A', 'B3', 'B5', 'E', 'Zn', 'O3', 'Mn', 'Se', 'I']
  },
  'ACNE': {
    categoria: 'Pele/Cabelos/Unhas',
    vitaminas: ['A', 'B5', 'C', 'E', 'Zn', 'S']
  },
  'UNHAS FRACAS': {
    categoria: 'Pele/Cabelos/Unhas',
    vitaminas: ['A', 'B5', 'B7', 'E', 'Fe', 'Zn', 'O3', 'S']
  },
  'QUEDA DE CABELO': {
    categoria: 'Pele/Cabelos/Unhas',
    vitaminas: ['B2', 'B5', 'B6', 'B7', 'D', 'Fe', 'Zn', 'Se', 'I', 'S']
  },
  'HEMATOMAS FÁCEIS': {
    categoria: 'Pele/Cabelos/Unhas',
    vitaminas: ['B5', 'C', 'K2']
  },
  'SUDORESE EXCESSIVA': {
    categoria: 'Pele/Cabelos/Unhas',
    vitaminas: ['D', 'Mg']
  },

  // Sistema Neurológico
  'TONTURA/VERTIGEM': {
    categoria: 'Neurológico',
    vitaminas: ['B2', 'B3', 'B5', 'B6', 'B12', 'D', 'Fe', 'Mg', 'I']
  },
  'ENXAQUECA': {
    categoria: 'Neurológico',
    vitaminas: ['B5', 'B7', 'Mg', 'Zn', 'C10', 'Q', 'AL']
  },
  'ALTERAÇÕES VISÃO': {
    categoria: 'Neurológico',
    vitaminas: ['A', 'B2']
  },

  // Cognitivo
  'MÁ MEMÓRIA': {
    categoria: 'Cognitivo',
    vitaminas: ['A', 'B1', 'B3', 'B5', 'B9', 'B12', 'D', 'K2', 'Mg', 'Zn', 'O3', 'Cr']
  },
  'MÁ CONCENTRAÇÃO': {
    categoria: 'Cognitivo',
    vitaminas: ['A', 'B5', 'B9', 'B12', 'D', 'E', 'Fe', 'Mg', 'Zn', 'O3', 'Cr', 'C10', 'AL']
  },

  // Energia e Vitalidade
  'SEM ENERGIA': {
    categoria: 'Energia',
    vitaminas: ['B5', 'B12', 'C', 'Fe', 'Mg', 'I', 'C10', 'AL']
  },

  // Saúde Mental
  'PESSIMISMO/DEPRESSÃO': {
    categoria: 'Saúde Mental',
    vitaminas: ['B5', 'B6', 'B9', 'B12', 'C', 'D', 'Mg', 'O3', 'I', 'L-T']
  },
  'ALTERN. HUMOR': {
    categoria: 'Saúde Mental',
    vitaminas: ['B1', 'B3', 'B5', 'B6', 'C', 'D', 'Mg', 'O3', 'C10', 'AL']
  },
  'ANSIEDADE': {
    categoria: 'Saúde Mental',
    vitaminas: ['B5', 'B6', 'B9', 'B12', 'D', 'Mg', 'O3', 'I', 'Q', 'AL']
  },

  // Sono
  'SONO IRREGULAR': {
    categoria: 'Sono',
    vitaminas: ['B7', 'Mg', 'L-T', 'AL']
  },
  'DEMORA DORMIR': {
    categoria: 'Sono',
    vitaminas: ['A', 'B1', 'B3', 'B9', 'C', 'D', 'Fe', 'Mg', 'L-T']
  },
  'DESPERTA A NOITE': {
    categoria: 'Sono',
    vitaminas: ['D', 'Mg', 'L-T']
  },
  'SONOLENCIA NO DIA': {
    categoria: 'Sono',
    vitaminas: ['B1', 'B2', 'B3', 'B6', 'B12', 'D', 'Fe', 'L-T']
  },
  'ACORDA COM SONO': {
    categoria: 'Sono',
    vitaminas: ['B12', 'D', 'Mg', 'L-T']
  },
  'ENURESE': {
    categoria: 'Sono',
    vitaminas: ['B12', 'D', 'Mg']
  },

  // Sistema Imunológico - Infecções
  'INFECÇÕES REPETIÇÃO': {
    categoria: 'Imunológico',
    vitaminas: ['C', 'D', 'Mg', 'Zn', 'Q', 'AL']
  },
  'INFECÇÕES VIAS AÉREAS': {
    categoria: 'Imunológico',
    vitaminas: ['C', 'D', 'E', 'Mg', 'Zn', 'O3', 'Mn', 'Se', 'GL', 'Q', 'AL']
  },
  'HERPES': {
    categoria: 'Imunológico',
    vitaminas: ['C', 'D', 'Zn']
  },
  'DOR GARGANTA RECOR.': {
    categoria: 'Imunológico',
    vitaminas: ['C', 'D', 'Zn']
  },
  'INFEC URINAR. RECOR.': {
    categoria: 'Imunológico',
    vitaminas: ['C', 'D', 'Zn']
  },
  'SINUSITE CRONICA': {
    categoria: 'Imunológico',
    vitaminas: ['C', 'D', 'Zn', 'Q', 'NAC']
  },
  'PIELONEFRITE': {
    categoria: 'Imunológico',
    vitaminas: ['C', 'D', 'Zn', 'O3']
  },

  // Alergias
  'ALERGIAS': {
    categoria: 'Imunológico',
    vitaminas: ['C', 'D', 'Mg', 'O3', 'Q']
  },
  'ALERGIAS TEMPOR.': {
    categoria: 'Imunológico',
    vitaminas: ['C', 'D', 'GL', 'Q']
  },
  'ALERGIAS ALIMENT': {
    categoria: 'Imunológico',
    vitaminas: ['C', 'D', 'Zn']
  },

  // Sistema Cardiovascular
  'ALTER. PRESSÃO': {
    categoria: 'Cardiovascular',
    vitaminas: ['Mg', 'I', 'C10']
  },
  'EDEMAS PERNAS': {
    categoria: 'Cardiovascular',
    vitaminas: ['C', 'E', 'Fe', 'Mg', 'I']
  },
  'PERNAS CANSADAS': {
    categoria: 'Cardiovascular',
    vitaminas: ['B12', 'E', 'Cr', 'C10']
  },
  'FRIO NAS EXTREMID': {
    categoria: 'Cardiovascular',
    vitaminas: ['B12', 'E', 'Fe', 'Mg', 'I']
  },
  'ARRITMIAS': {
    categoria: 'Cardiovascular',
    vitaminas: ['Mg', 'C10']
  },
  'HIPERTENSÃO': {
    categoria: 'Cardiovascular',
    vitaminas: ['D', 'Mg', 'O3', 'L-A']
  },
  'PERNAS INQUIETAS': {
    categoria: 'Cardiovascular',
    vitaminas: ['B12', 'Fe', 'Mg']
  },

  // Dor e Musculoesquelético
  'CÃIBRAS': {
    categoria: 'Musculoesquelético',
    vitaminas: ['B1', 'B5', 'B6', 'K2', 'Mg', 'Ca', 'Mn', 'I']
  },
  'CAIBRAS NOTURNAS': {
    categoria: 'Musculoesquelético',
    vitaminas: ['B5', 'Mg', 'Ca', 'PO']
  },
  'DORES NA COLUNA': {
    categoria: 'Musculoesquelético',
    vitaminas: ['B12', 'D', 'Mg', 'Ca', 'AL']
  },
  'DORES MUSCULARES': {
    categoria: 'Musculoesquelético',
    vitaminas: ['B1', 'B3', 'B6', 'B12', 'C', 'D', 'Mg', 'O3', 'Se', 'AL']
  },
  'DORES ARTICULARES': {
    categoria: 'Musculoesquelético',
    vitaminas: ['B2', 'B6', 'C', 'Mg', 'Ca', 'Mn']
  },
  'DOR ARTICULAR': {
    categoria: 'Musculoesquelético',
    vitaminas: ['D', 'O3', 'GL', 'AL']
  },
  'DOR CABEÇA FREQ.': {
    categoria: 'Musculoesquelético',
    vitaminas: ['B2', 'Mg', 'C10']
  },
  'TENDINITE': {
    categoria: 'Musculoesquelético',
    vitaminas: ['C', 'D', 'Mg', 'O3']
  },

  // Sistema Nervoso
  'FORMIGAMENTO': {
    categoria: 'Neurológico',
    vitaminas: ['B5', 'B6', 'B9', 'B12', 'Mg', 'AL']
  },
  'TONTURA AO LEVANTAR': {
    categoria: 'Neurológico',
    vitaminas: ['B12', 'Fe', 'PO']
  },
  'EPISODIOS MEMORIA': {
    categoria: 'Cognitivo',
    vitaminas: ['B12', 'E', 'O3']
  },
  'CONF MENTAL': {
    categoria: 'Cognitivo',
    vitaminas: ['B9', 'B12', 'O3']
  },
  'BRUXISMO': {
    categoria: 'Neurológico',
    vitaminas: ['D', 'Mg', 'Ca']
  },
  'PARKINSON': {
    categoria: 'Neurológico',
    vitaminas: ['B6', 'D', 'C10']
  },
  'NEUROPATIA PERIFERICA': {
    categoria: 'Neurológico',
    vitaminas: ['B9', 'B12', 'E', 'O3', 'NAC']
  },

  // Saúde Mental - Stress e Burnout
  'ESTRESSE EXARCEBADO': {
    categoria: 'Saúde Mental',
    vitaminas: ['B5', 'B6', 'B9', 'B12', 'C', 'D', 'Mg', 'L-T', 'GL', 'AL']
  },
  'BURNOUT': {
    categoria: 'Saúde Mental',
    vitaminas: ['B6', 'B9', 'B12', 'C', 'D', 'Mg']
  },
  'DISTRESS/EUSTRESS': {
    categoria: 'Saúde Mental',
    vitaminas: ['B6', 'B9', 'B12', 'C', 'D', 'Mg', 'Zn']
  },
  'IRRITABILIDADE': {
    categoria: 'Saúde Mental',
    vitaminas: ['B6', 'Mg', 'Zn']
  },
  'APATIA': {
    categoria: 'Saúde Mental',
    vitaminas: ['B9', 'B12', 'D']
  },
  'DEPRESSÃO': {
    categoria: 'Saúde Mental',
    vitaminas: ['B5', 'B6', 'B9', 'D', 'O3']
  },
  'DEPRESSÃO SAZONAL': {
    categoria: 'Saúde Mental',
    vitaminas: ['B9', 'B12', 'D', 'Mg', 'O3', 'ME']
  },
  'DEPRESSAO POR PARTO': {
    categoria: 'Saúde Mental',
    vitaminas: ['B9', 'B12', 'D', 'O3', 'Cr', 'GL', 'AL']
  },
  'DISTURBIO BIPOLAR': {
    categoria: 'Saúde Mental',
    vitaminas: ['B9', 'B12', 'Mg', 'O3', 'ME', 'NAC']
  },
  'ESQUIZOFRENIA': {
    categoria: 'Saúde Mental',
    vitaminas: ['B3', 'D', 'Zn', 'O3', 'ME', 'NAC']
  },

  // Sistema Reprodutivo
  'IMPOTENCIA': {
    categoria: 'Reprodutivo',
    vitaminas: ['B9', 'D', 'Zn']
  },
  'MENOPAUSA': {
    categoria: 'Reprodutivo',
    vitaminas: ['D', 'K2', 'Mg', 'Ca']
  },
  'ESTERILIDADE': {
    categoria: 'Reprodutivo',
    vitaminas: ['B9', 'B12', 'C', 'D', 'E', 'Zn', 'C10', 'AL']
  },
  'INFERTILIDADE MASC': {
    categoria: 'Reprodutivo',
    vitaminas: ['B9', 'E', 'Zn', 'Se', 'L-A']
  },
  'INFERTILIDADE FEM': {
    categoria: 'Reprodutivo',
    vitaminas: ['B9', 'D', 'E', 'Zn']
  },
  'BAIXA LIBIDO': {
    categoria: 'Reprodutivo',
    vitaminas: ['B6', 'D', 'Zn', 'L-A']
  },

  // Saúde da Mulher
  'CÓLICA MENS. INTENSA': {
    categoria: 'Saúde da Mulher',
    vitaminas: ['B6', 'E', 'Mg', 'O3']
  },
  'OVARIO POLICISTICO': {
    categoria: 'Saúde da Mulher',
    vitaminas: ['D', 'Mg', 'O3', 'Q', 'IN']
  },
  'ENDOMETRIOSE': {
    categoria: 'Saúde da Mulher',
    vitaminas: ['D', 'E', 'Mg', 'O3']
  },

  // Energia e Fadiga
  'FADIGA CRONICA': {
    categoria: 'Energia',
    vitaminas: ['B5', 'B12', 'D', 'Fe', 'Mg', 'ME']
  },
  'SIND. FADIGA CRONICA': {
    categoria: 'Energia',
    vitaminas: ['B5', 'B12', 'D', 'Mg', 'C10']
  },

  // Sistema Endócrino e Hormonal
  'HIPOTIREOIDISMO': {
    categoria: 'Hormonal',
    vitaminas: ['A', 'D', 'Se', 'I', 'NAC']
  },
  'SENSIBILIDADE FRIO': {
    categoria: 'Hormonal',
    vitaminas: ['B12', 'Fe', 'Se', 'I']
  },
  'SENSIBILIDADE CALOR': {
    categoria: 'Hormonal',
    vitaminas: ['D', 'Mg', 'Se', 'I', 'LU', 'ZE']
  },
  'HIPOGLICEMIA': {
    categoria: 'Metabólico',
    vitaminas: ['B6', 'Mg', 'Cr']
  },
  'HIPOGLICEMIA REATIVA': {
    categoria: 'Metabólico',
    vitaminas: ['B3', 'Mg', 'Cr']
  },

  // Condições Crônicas
  'ARTRITE REUMAT': {
    categoria: 'Condições Crônicas',
    vitaminas: ['D', 'Mg', 'O3', 'Ca']
  },
  'PSORIASE': {
    categoria: 'Condições Crônicas',
    vitaminas: ['D', 'E', 'O3', 'Se']
  },
  'ANEMIA': {
    categoria: 'Condições Crônicas',
    vitaminas: ['B9', 'B12', 'C', 'Fe']
  },
  'OSTEOPOROSE': {
    categoria: 'Condições Crônicas',
    vitaminas: ['C', 'D', 'K2', 'Mg', 'Ca', 'Cr', 'C10']
  },
  'DIABETES TIPO 2': {
    categoria: 'Condições Crônicas',
    vitaminas: ['D', 'Mg', 'O3', 'Cr']
  },
  'SINDROME METABO.': {
    categoria: 'Condições Crônicas',
    vitaminas: ['D', 'Mg', 'O3', 'Cr']
  },
  'DOENÇA DE CROHN': {
    categoria: 'Condições Crônicas',
    vitaminas: ['B12', 'D', 'Mg', 'Zn', 'GL']
  },
  'CELÍACO': {
    categoria: 'Condições Crônicas',
    vitaminas: ['B12', 'D', 'Fe', 'Zn']
  },
  'ESCLEROSE MULTIPLA': {
    categoria: 'Condições Crônicas',
    vitaminas: ['B12', 'D', 'Mg', 'O3', 'NAC']
  },

  // Sistema Ósseo
  'DESMINERALIZAÇÃO OSSEA': {
    categoria: 'Ósseo',
    vitaminas: ['D', 'K2', 'Mg', 'Ca']
  },
  'PERDA DE MASSA OSSEA': {
    categoria: 'Ósseo',
    vitaminas: ['C', 'D', 'K2', 'Mg', 'Ca']
  },
  'FRATURAS FREQUENTES': {
    categoria: 'Ósseo',
    vitaminas: ['D', 'K2', 'Mg', 'Ca']
  },
  'OSTEOMALACIA': {
    categoria: 'Ósseo',
    vitaminas: ['D', 'K2', 'Mg', 'Ca']
  },
  'DIFIC GANHO MASSA': {
    categoria: 'Metabólico',
    vitaminas: ['B12', 'D', 'Mg']
  },

  // Pele e Mucosas
  'RACHAD. LABIOS': {
    categoria: 'Pele/Cabelos/Unhas',
    vitaminas: ['B2', 'B3', 'Fe']
  },
  'RACHADURAS CANTO BOCA': {
    categoria: 'Pele/Cabelos/Unhas',
    vitaminas: ['B2', 'B6', 'Fe', 'Zn']
  },
  'PELE SECA': {
    categoria: 'Pele/Cabelos/Unhas',
    vitaminas: ['A', 'E', 'O3']
  },
  'PELE AMARELADA': {
    categoria: 'Pele/Cabelos/Unhas',
    vitaminas: ['A', 'B12', 'C']
  },
  'PROBL CICATRIZAÇÃO': {
    categoria: 'Pele/Cabelos/Unhas',
    vitaminas: ['A', 'B5', 'C', 'Zn']
  },
  'DERMATITE': {
    categoria: 'Pele/Cabelos/Unhas',
    vitaminas: ['B2', 'B3', 'B5', 'Zn', 'O3', 'GL']
  },
  'CASPA': {
    categoria: 'Pele/Cabelos/Unhas',
    vitaminas: ['B6', 'Zn', 'O3', 'Q']
  },
  'HIPERPIGMENTAÇÃO': {
    categoria: 'Pele/Cabelos/Unhas',
    vitaminas: ['B9', 'B12', 'E']
  },
  'ROSACEA': {
    categoria: 'Pele/Cabelos/Unhas',
    vitaminas: ['B2', 'B5', 'C', 'Zn', 'O3', 'S']
  },

  // Sistema Visual
  'OLHOS SECOS': {
    categoria: 'Visual',
    vitaminas: ['A', 'E', 'O3', 'LU', 'ZE']
  },
  'VISÃO NOTURNA RUIM': {
    categoria: 'Visual',
    vitaminas: ['A', 'E', 'Zn', 'LU', 'ZE']
  },
  'CANSAÇO OCULAR': {
    categoria: 'Visual',
    vitaminas: ['A', 'B2', 'E', 'Mg', 'Se', 'S', 'LU', 'ZE']
  },

  // Boca e Gengivas
  'HEMORRAGIAS GENGIVAIS': {
    categoria: 'Oral',
    vitaminas: ['C', 'K2', 'C10']
  },
  'GENGIVITE': {
    categoria: 'Oral',
    vitaminas: ['C', 'D', 'C10']
  },
  'BOCA SECA': {
    categoria: 'Oral',
    vitaminas: ['A', 'B2', 'Zn']
  },

  // Outros Sintomas Gastrointestinais
  'DESCONF ABDOMINAL': {
    categoria: 'Gastrointestinal',
    vitaminas: ['B9', 'B12', 'Mg', 'GL']
  },
  'SIND. INTEST. PERMEAVEL': {
    categoria: 'Gastrointestinal',
    vitaminas: ['B9', 'D', 'Zn', 'GL']
  },

  // Sintomas Metabólicos
  'PERDA DE APETITE': {
    categoria: 'Metabólico',
    vitaminas: ['B9', 'B12', 'D', 'Zn']
  },
  'PROBLEM. CRESCIMENTO': {
    categoria: 'Metabólico',
    vitaminas: ['A', 'D', 'Zn']
  }
};

// Nomes completos das vitaminas e minerais
export const VITAMINS_FULL_NAMES = {
  'A': 'Vitamina A (Retinol)',
  'B1': 'Vitamina B1 (Tiamina)',
  'B2': 'Vitamina B2 (Riboflavina)',
  'B3': 'Vitamina B3 (Niacina)',
  'B5': 'Vitamina B5 (Ácido Pantotênico)',
  'B6': 'Vitamina B6 (Piridoxina)',
  'B7': 'Vitamina B7 (Biotina)',
  'B9': 'Vitamina B9 (Ácido Fólico)',
  'B12': 'Vitamina B12 (Cobalamina)',
  'C': 'Vitamina C (Ácido Ascórbico)',
  'D': 'Vitamina D (Calciferol)',
  'E': 'Vitamina E (Tocoferol)',
  'K2': 'Vitamina K2 (Menaquinona)',
  'Fe': 'Ferro',
  'Mg': 'Magnésio',
  'Zn': 'Zinco',
  'O3': 'Ômega 3',
  'Ca': 'Cálcio',
  'Mn': 'Manganês',
  'Se': 'Selênio',
  'I': 'Iodo',
  'S': 'Enxofre',
  'Cr': 'Cromo',
  'C10': 'Coenzima Q10',
  'L-T': 'L-Triptofano',
  'GL': 'Glutamina',
  'Q': 'Quercetina',
  'AL': 'Ácido Alfa-Lipóico',
  'BO': 'Boro',
  'PO': 'Potássio',
  'LU': 'Luteína',
  'ZE': 'Zeaxantina',
  'IN': 'Inositol',
  'L-A': 'L-Arginina',
  'ME': 'Melatonina',
  'NAC': 'N-Acetilcisteína'
};

// Categorias de sintomas
export const SYMPTOM_CATEGORIES = [
  'Gastrointestinal',
  'Digestivo',
  'Imunológico',
  'Pele/Cabelos/Unhas',
  'Neurológico',
  'Cognitivo',
  'Energia',
  'Saúde Mental',
  'Sono',
  'Cardiovascular',
  'Musculoesquelético',
  'Reprodutivo',
  'Saúde da Mulher',
  'Hormonal',
  'Metabólico',
  'Condições Crônicas',
  'Ósseo',
  'Visual',
  'Oral'
];

// Dosagens recomendadas (valores de referência)
export const RECOMMENDED_DOSAGES = {
  'A': '800-3000 mcg/dia',
  'B1': '1,1-1,2 mg/dia',
  'B2': '1,1-1,3 mg/dia',
  'B3': '14-16 mg/dia',
  'B5': '5-10 mg/dia',
  'B6': '1,3-2 mg/dia',
  'B7': '30-100 mcg/dia',
  'B9': '400-800 mcg/dia',
  'B12': '2,4-1000 mcg/dia',
  'C': '75-2000 mg/dia',
  'D': '1000-4000 UI/dia',
  'E': '15-400 UI/dia',
  'K2': '90-180 mcg/dia',
  'Fe': '8-27 mg/dia',
  'Mg': '310-420 mg/dia',
  'Zn': '8-40 mg/dia',
  'O3': '250-1000 mg/dia EPA+DHA',
  'Ca': '1000-1200 mg/dia',
  'Mn': '1,8-11 mg/dia',
  'Se': '55-200 mcg/dia',
  'I': '150-300 mcg/dia',
  'S': 'Conforme dieta',
  'Cr': '20-200 mcg/dia',
  'C10': '100-300 mg/dia',
  'L-T': '500-2000 mg/dia',
  'GL': '5-15 g/dia',
  'Q': '500-1000 mg/dia',
  'AL': '300-600 mg/dia',
  'BO': '3-6 mg/dia',
  'PO': '2500-3000 mg/dia',
  'LU': '10-20 mg/dia',
  'ZE': '2-4 mg/dia',
  'IN': '500-2000 mg/dia',
  'L-A': '2-3 g/dia',
  'ME': '0,5-10 mg/dia',
  'NAC': '600-1800 mg/dia'
};

// Formas ativas e dosagens terapêuticas profissionais
export const THERAPEUTIC_PROTOCOLS = {
  'A': {
    formaAtiva: 'Retinol',
    dosagemMin: 3000,
    dosagemMax: 10000,
    unidade: 'UI',
    frequencia: '1x ao dia',
    horario: 'Com refeição gordurosa',
    observacoes: 'Evitar em gestantes sem orientação médica'
  },
  'B1': {
    formaAtiva: 'Tiamina',
    dosagemMin: 1.1,
    dosagemMax: 100,
    unidade: 'mg',
    frequencia: '1x ao dia',
    horario: 'Manhã',
    observacoes: 'Importante para metabolismo energético'
  },
  'B2': {
    formaAtiva: 'Riboflavina-5\'-fosfato',
    dosagemMin: 1.3,
    dosagemMax: 100,
    unidade: 'mg',
    frequencia: '1x ao dia',
    horario: 'Manhã',
    observacoes: 'Pode deixar urina amarelo-alaranjada (normal)'
  },
  'B3': {
    formaAtiva: 'Niacinamida',
    dosagemMin: 16,
    dosagemMax: 35,
    unidade: 'mg',
    frequencia: '1x ao dia',
    horario: 'Manhã ou tarde',
    observacoes: 'Forma que não causa flush'
  },
  'B5': {
    formaAtiva: 'D-pantotenato de cálcio',
    dosagemMin: 50,
    dosagemMax: 800,
    unidade: 'mg',
    frequencia: '1-2x ao dia',
    horario: 'Manhã e/ou tarde',
    observacoes: 'Essencial para produção de energia'
  },
  'B6': {
    formaAtiva: 'Piridoxal-5\'-fosfato (P5P)',
    dosagemMin: 1.3,
    dosagemMax: 100,
    unidade: 'mg',
    frequencia: '1x ao dia',
    horario: 'Manhã',
    observacoes: 'Forma ativa, melhor absorção'
  },
  'B7': {
    formaAtiva: 'Biotina',
    dosagemMin: 30,
    dosagemMax: 900,
    unidade: 'mcg',
    frequencia: '1x ao dia',
    horario: 'Manhã',
    observacoes: 'Importante para cabelos, pele e unhas'
  },
  'B9': {
    formaAtiva: 'Metilfolato (5-MTHF)',
    dosagemMin: 400,
    dosagemMax: 5000,
    unidade: 'mcg',
    frequencia: '1x ao dia',
    horario: 'Manhã',
    observacoes: 'Forma ativa, ideal para mutação MTHFR'
  },
  'B12': {
    formaAtiva: 'Metilcobalamina',
    dosagemMin: 800,
    dosagemMax: 5000,
    unidade: 'mcg',
    frequencia: '1x ao dia',
    horario: 'Manhã (sublingual)',
    observacoes: 'Forma ativa, melhor absorção'
  },
  'C': {
    formaAtiva: 'Palmitato de Ascorbila ou Ácido Ascórbico',
    dosagemMin: 100,
    dosagemMax: 2000,
    unidade: 'mg',
    frequencia: '1-2x ao dia',
    horario: 'Manhã e/ou tarde',
    observacoes: 'Dividir doses para melhor absorção'
  },
  'D': {
    formaAtiva: 'Colecalciferol (D3)',
    dosagemMin: 1000,
    dosagemMax: 10000,
    unidade: 'UI',
    frequencia: '1x ao dia',
    horario: 'Com refeição gordurosa',
    observacoes: 'Dosar 25-OH vitamina D antes e após 60 dias'
  },
  'E': {
    formaAtiva: 'Alfa-tocoferol ou Mix de Tocoferóis',
    dosagemMin: 15,
    dosagemMax: 1000,
    unidade: 'mg',
    frequencia: '1x ao dia',
    horario: 'Com refeição',
    observacoes: 'Mix de tocoferóis é mais biodisponível'
  },
  'K2': {
    formaAtiva: 'Menaquinona-7 (MK-7)',
    dosagemMin: 90,
    dosagemMax: 400,
    unidade: 'mcg',
    frequencia: '1x ao dia',
    horario: 'Com refeição gordurosa',
    observacoes: 'Importante para saúde óssea e cardiovascular'
  },
  'Fe': {
    formaAtiva: 'Bisglicinato ferroso',
    dosagemMin: 8,
    dosagemMax: 18,
    unidade: 'mg',
    frequencia: '1x ao dia',
    horario: 'Em jejum ou com vitamina C',
    observacoes: 'Evitar com chá, café ou leite. Alta biodisponibilidade'
  },
  'Mg': {
    formaAtiva: 'Glicinato de magnésio',
    dosagemMin: 310,
    dosagemMax: 420,
    unidade: 'mg',
    frequencia: '1-2x ao dia',
    horario: 'Noite (auxilia sono)',
    observacoes: 'Forma com melhor absorção e tolerância'
  },
  'Zn': {
    formaAtiva: 'Picolinato de zinco',
    dosagemMin: 8,
    dosagemMax: 40,
    unidade: 'mg',
    frequencia: '1x ao dia',
    horario: 'Após jantar',
    observacoes: 'Não exceder 40mg/dia. Tomar longe de ferro'
  },
  'O3': {
    formaAtiva: 'EPA + DHA',
    dosagemMin: 1000,
    dosagemMax: 6000,
    unidade: 'mg',
    frequencia: '1-2x ao dia',
    horario: 'Com refeições',
    observacoes: 'Verificar teor de EPA e DHA no rótulo'
  },
  'Ca': {
    formaAtiva: 'Citrato de cálcio',
    dosagemMin: 1000,
    dosagemMax: 1200,
    unidade: 'mg',
    frequencia: '2x ao dia',
    horario: 'Manhã e noite',
    observacoes: 'Dividir doses. Tomar com vitamina D e K2'
  },
  'Mn': {
    formaAtiva: 'Sulfato de manganês',
    dosagemMin: 1.8,
    dosagemMax: 11,
    unidade: 'mg',
    frequencia: '1x ao dia',
    horario: 'Com refeição',
    observacoes: 'Importante para formação óssea'
  },
  'Se': {
    formaAtiva: 'Selenometionina',
    dosagemMin: 55,
    dosagemMax: 200,
    unidade: 'mcg',
    frequencia: '1x ao dia',
    horario: 'Manhã',
    observacoes: 'Não exceder 400 mcg/dia'
  },
  'I': {
    formaAtiva: 'Iodeto de potássio',
    dosagemMin: 150,
    dosagemMax: 1100,
    unidade: 'mcg',
    frequencia: '1x ao dia',
    horario: 'Manhã',
    observacoes: 'Avaliar função tireoidiana antes'
  },
  'S': {
    formaAtiva: 'Exsynutriment (silício estabilizado)',
    dosagemMin: 150,
    dosagemMax: 500,
    unidade: 'mg',
    frequencia: '1x ao dia',
    horario: 'Manhã',
    observacoes: 'Importante para tecido conjuntivo'
  },
  'Cr': {
    formaAtiva: 'Picolinato de cromo',
    dosagemMin: 20,
    dosagemMax: 200,
    unidade: 'mcg',
    frequencia: '1x ao dia',
    horario: 'Com refeição',
    observacoes: 'Auxiliar no metabolismo da glicose'
  },
  'C10': {
    formaAtiva: 'Ubiquinona (CoQ10)',
    dosagemMin: 30,
    dosagemMax: 200,
    unidade: 'mg',
    frequencia: '1x ao dia',
    horario: 'Com refeição gordurosa',
    observacoes: 'Importante para produção de energia celular'
  },
  'L-T': {
    formaAtiva: 'L-triptofano',
    dosagemMin: 500,
    dosagemMax: 2000,
    unidade: 'mg',
    frequencia: '1-2x ao dia',
    horario: 'Tarde e/ou noite',
    observacoes: 'Precursor de serotonina e melatonina'
  },
  'GL': {
    formaAtiva: 'L-glutamina',
    dosagemMin: 1000,
    dosagemMax: 15000,
    unidade: 'mg',
    frequencia: '2-3x ao dia',
    horario: '15 min antes das refeições',
    observacoes: 'Importante para saúde intestinal'
  },
  'Q': {
    formaAtiva: 'Quercetina',
    dosagemMin: 500,
    dosagemMax: 1000,
    unidade: 'mg',
    frequencia: '1-2x ao dia',
    horario: 'Manhã e/ou tarde',
    observacoes: 'Potente antioxidante e anti-inflamatório'
  },
  'AL': {
    formaAtiva: 'Ácido alfa-lipóico',
    dosagemMin: 300,
    dosagemMax: 600,
    unidade: 'mg',
    frequencia: '1-2x ao dia',
    horario: 'Manhã e/ou tarde',
    observacoes: 'Antioxidante universal'
  },
  'BO': {
    formaAtiva: 'Boro',
    dosagemMin: 1,
    dosagemMax: 3,
    unidade: 'mg',
    frequencia: '1x ao dia',
    horario: 'Com refeição',
    observacoes: 'Importante para saúde óssea'
  },
  'PO': {
    formaAtiva: 'Citrato de potássio',
    dosagemMin: 2600,
    dosagemMax: 3400,
    unidade: 'mg',
    frequencia: '2-3x ao dia',
    horario: 'Com refeições',
    observacoes: 'Importante para função cardíaca e muscular'
  },
  'LU': {
    formaAtiva: 'Luteína',
    dosagemMin: 6,
    dosagemMax: 20,
    unidade: 'mg',
    frequencia: '1x ao dia',
    horario: 'Com refeição',
    observacoes: 'Importante para saúde ocular'
  },
  'ZE': {
    formaAtiva: 'Zeaxantina',
    dosagemMin: 2,
    dosagemMax: 10,
    unidade: 'mg',
    frequencia: '1x ao dia',
    horario: 'Com refeição',
    observacoes: 'Proteção macular'
  },
  'IN': {
    formaAtiva: 'Mio-inositol',
    dosagemMin: 1000,
    dosagemMax: 4000,
    unidade: 'mg',
    frequencia: '1-2x ao dia',
    horario: 'Manhã e/ou tarde',
    observacoes: 'Importante para SOP e saúde mental'
  },
  'L-A': {
    formaAtiva: 'L-arginina',
    dosagemMin: 2000,
    dosagemMax: 6000,
    unidade: 'mg',
    frequencia: '1-2x ao dia',
    horario: 'Antes exercício ou noite',
    observacoes: 'Precursor de óxido nítrico'
  },
  'ME': {
    formaAtiva: 'Melatonina',
    dosagemMin: 0.5,
    dosagemMax: 15,
    unidade: 'mg',
    frequencia: '1x ao dia',
    horario: '30-60 min antes dormir',
    observacoes: 'Hormônio do sono. Começar com dose baixa'
  },
  'NAC': {
    formaAtiva: 'N-acetilcisteína',
    dosagemMin: 600,
    dosagemMax: 1800,
    unidade: 'mg',
    frequencia: '1-2x ao dia',
    horario: 'Manhã e/ou tarde',
    observacoes: 'Precursor de glutationa. Potente antioxidante'
  }
};

// Cores para as categorias
export const CATEGORY_COLORS = {
  'Gastrointestinal': '#4caf50',
  'Digestivo': '#8bc34a',
  'Imunológico': '#ff9800',
  'Pele/Cabelos/Unhas': '#e91e63',
  'Neurológico': '#9c27b0',
  'Cognitivo': '#3f51b5',
  'Energia': '#f44336',
  'Saúde Mental': '#00bcd4',
  'Sono': '#673ab7',
  'Cardiovascular': '#d32f2f',
  'Musculoesquelético': '#795548',
  'Reprodutivo': '#ec407a',
  'Saúde da Mulher': '#f06292',
  'Hormonal': '#7e57c2',
  'Metabólico': '#26a69a',
  'Condições Crônicas': '#5c6bc0',
  'Ósseo': '#8d6e63',
  'Visual': '#42a5f5',
  'Oral': '#66bb6a'
};

// Base de dados: Interações entre Nutrientes (Sinergismo e Antagonismo)
// Esta tabela é fundamental para prescrições seguras e eficazes
export const NUTRIENT_INTERACTIONS = [
  // Sinergismos - Nutrientes que potencializam uns aos outros
  { nutriente1: 'AL', nutriente2: 'C', tipo: 'Sinergismo', recomendacao: 'Tomar juntos potencializa efeito antioxidante' },
  { nutriente1: 'Ca', nutriente2: 'B12', tipo: 'Sinergismo', recomendacao: 'Cálcio auxilia absorção de B12' },
  { nutriente1: 'Ca', nutriente2: 'K2', tipo: 'Sinergismo', recomendacao: 'K2 direciona cálcio para ossos (não artérias)' },
  { nutriente1: 'Ca', nutriente2: 'D', tipo: 'Sinergismo', recomendacao: 'Vitamina D essencial para absorção de cálcio' },
  { nutriente1: 'Ca', nutriente2: 'BO', tipo: 'Sinergismo', recomendacao: 'Boro melhora metabolismo do cálcio' },
  { nutriente1: 'Fe', nutriente2: 'C', tipo: 'Sinergismo', recomendacao: 'Vitamina C aumenta absorção de ferro em até 300%' },
  { nutriente1: 'Fe', nutriente2: 'A', tipo: 'Sinergismo', recomendacao: 'Vitamina A melhora mobilização de ferro' },
  { nutriente1: 'Fe', nutriente2: 'B6', tipo: 'Sinergismo', recomendacao: 'B6 auxilia produção de hemoglobina' },
  { nutriente1: 'Fe', nutriente2: 'B9', tipo: 'Sinergismo', recomendacao: 'Ácido fólico trabalha com ferro na formação sanguínea' },
  { nutriente1: 'Mg', nutriente2: 'Ca', tipo: 'Sinergismo', recomendacao: 'Magnésio regula entrada de cálcio nas células' },
  { nutriente1: 'Mg', nutriente2: 'PO', tipo: 'Sinergismo', recomendacao: 'Potássio e magnésio trabalham juntos no equilíbrio eletrolítico' },
  { nutriente1: 'Mg', nutriente2: 'B1', tipo: 'Sinergismo', recomendacao: 'Magnésio ativa vitamina B1' },
  { nutriente1: 'Mg', nutriente2: 'D', tipo: 'Sinergismo', recomendacao: 'Magnésio ativa vitamina D' },
  { nutriente1: 'Mg', nutriente2: 'Zn', tipo: 'Sinergismo', recomendacao: 'Trabalham juntos em diversas enzimas' },
  { nutriente1: 'Mg', nutriente2: 'C', tipo: 'Sinergismo', recomendacao: 'Vitamina C melhora absorção de magnésio' },
  { nutriente1: 'Mg', nutriente2: 'Cr', tipo: 'Sinergismo', recomendacao: 'Atuam juntos no metabolismo da glicose' },
  { nutriente1: 'Mg', nutriente2: 'B2', tipo: 'Sinergismo', recomendacao: 'B2 auxilia metabolismo do magnésio' },
  { nutriente1: 'Mg', nutriente2: 'B3', tipo: 'Sinergismo', recomendacao: 'B3 trabalha com magnésio no metabolismo energético' },
  { nutriente1: 'O3', nutriente2: 'E', tipo: 'Sinergismo', recomendacao: 'Vitamina E protege ômega-3 da oxidação' },
  { nutriente1: 'O3', nutriente2: 'D', tipo: 'Sinergismo', recomendacao: 'Ômega-3 e vitamina D potencializam efeitos anti-inflamatórios' },
  { nutriente1: 'O3', nutriente2: 'C', tipo: 'Sinergismo', recomendacao: 'Vitamina C protege ômega-3 da oxidação' },
  { nutriente1: 'Se', nutriente2: 'Mg', tipo: 'Sinergismo', recomendacao: 'Trabalham juntos como antioxidantes' },
  { nutriente1: 'Se', nutriente2: 'E', tipo: 'Sinergismo', recomendacao: 'Selênio potencializa ação da vitamina E' },
  { nutriente1: 'Se', nutriente2: 'B9', tipo: 'Sinergismo', recomendacao: 'Atuam juntos na síntese de DNA' },
  { nutriente1: 'Se', nutriente2: 'Zn', tipo: 'Sinergismo', recomendacao: 'Trabalham juntos na função imunológica' },
  { nutriente1: 'Se', nutriente2: 'C10', tipo: 'Sinergismo', recomendacao: 'Potencializam efeitos antioxidantes mútuos' },
  { nutriente1: 'Se', nutriente2: 'A', tipo: 'Sinergismo', recomendacao: 'Trabalham juntos na função tireoidiana' },
  { nutriente1: 'Se', nutriente2: 'C', tipo: 'Sinergismo', recomendacao: 'Vitamina C regenera selênio' },
  { nutriente1: 'A', nutriente2: 'Zn', tipo: 'Sinergismo', recomendacao: 'Zinco necessário para metabolismo da vitamina A' },
  { nutriente1: 'A', nutriente2: 'B12', tipo: 'Sinergismo', recomendacao: 'B12 auxilia metabolismo da vitamina A' },
  { nutriente1: 'A', nutriente2: 'D', tipo: 'Sinergismo', recomendacao: 'Trabalham juntos na saúde óssea e imunidade' },
  { nutriente1: 'B1', nutriente2: 'B9', tipo: 'Sinergismo', recomendacao: 'Atuam juntos no metabolismo energético' },
  { nutriente1: 'B1', nutriente2: 'Zn', tipo: 'Sinergismo', recomendacao: 'Zinco auxilia absorção de B1' },
  { nutriente1: 'B12', nutriente2: 'B7', tipo: 'Sinergismo', recomendacao: 'Biotina e B12 trabalham juntas' },
  { nutriente1: 'B12', nutriente2: 'B9', tipo: 'Sinergismo', recomendacao: 'Essencial: B12 e folato trabalham juntos na metilação' },
  { nutriente1: 'B12', nutriente2: 'B6', tipo: 'Sinergismo', recomendacao: 'Atuam juntos na redução de homocisteína' },
  { nutriente1: 'B12', nutriente2: 'E', tipo: 'Sinergismo', recomendacao: 'Vitamina E protege B12' },
  { nutriente1: 'B2', nutriente2: 'B6', tipo: 'Sinergismo', recomendacao: 'B2 ativa B6' },
  { nutriente1: 'B2', nutriente2: 'Fe', tipo: 'Sinergismo', recomendacao: 'B2 auxilia metabolismo do ferro' },
  { nutriente1: 'B3', nutriente2: 'B6', tipo: 'Sinergismo', recomendacao: 'Trabalham juntas no metabolismo' },
  { nutriente1: 'B6', nutriente2: 'Mg', tipo: 'Sinergismo', recomendacao: 'Magnésio ativa B6' },
  { nutriente1: 'B6', nutriente2: 'B12', tipo: 'Sinergismo', recomendacao: 'Atuam juntas na saúde neurológica' },
  { nutriente1: 'B6', nutriente2: 'B9', tipo: 'Sinergismo', recomendacao: 'Trabalham juntas na metilação' },
  { nutriente1: 'B6', nutriente2: 'AL', tipo: 'Sinergismo', recomendacao: 'Ácido alfa-lipóico potencializa B6' },
  { nutriente1: 'B9', nutriente2: 'C', tipo: 'Sinergismo', recomendacao: 'Vitamina C protege folato' },
  { nutriente1: 'B9', nutriente2: 'B12', tipo: 'Sinergismo', recomendacao: 'Par fundamental na metilação' },
  { nutriente1: 'B9', nutriente2: 'B2', tipo: 'Sinergismo', recomendacao: 'B2 ativa folato' },
  { nutriente1: 'C', nutriente2: 'Se', tipo: 'Sinergismo', recomendacao: 'Vitamina C regenera selênio' },
  { nutriente1: 'C', nutriente2: 'E', tipo: 'Sinergismo', recomendacao: 'Vitamina C regenera vitamina E' },
  { nutriente1: 'C', nutriente2: 'K2', tipo: 'Sinergismo', recomendacao: 'Trabalham juntas na saúde óssea' },
  { nutriente1: 'C', nutriente2: 'B9', tipo: 'Sinergismo', recomendacao: 'Vitamina C protege folato' },
  { nutriente1: 'D', nutriente2: 'Ca', tipo: 'Sinergismo', recomendacao: 'Vitamina D fundamental para absorção de cálcio' },
  { nutriente1: 'D', nutriente2: 'K2', tipo: 'Sinergismo', recomendacao: 'Par essencial: D absorve cálcio, K2 direciona para ossos' },
  { nutriente1: 'D', nutriente2: 'B12', tipo: 'Sinergismo', recomendacao: 'Trabalham juntas na saúde neurológica' },
  { nutriente1: 'D', nutriente2: 'Mg', tipo: 'Sinergismo', recomendacao: 'Magnésio ativa vitamina D' },
  { nutriente1: 'D', nutriente2: 'Se', tipo: 'Sinergismo', recomendacao: 'Selênio auxilia metabolismo da vitamina D' },
  { nutriente1: 'D', nutriente2: 'A', tipo: 'Sinergismo', recomendacao: 'Trabalham juntas na imunidade' },
  { nutriente1: 'E', nutriente2: 'A', tipo: 'Sinergismo', recomendacao: 'Vitamina E protege vitamina A' },
  { nutriente1: 'E', nutriente2: 'Se', tipo: 'Sinergismo', recomendacao: 'Selênio potencializa vitamina E' },
  { nutriente1: 'E', nutriente2: 'C10', tipo: 'Sinergismo', recomendacao: 'Trabalham juntas como antioxidantes' },
  { nutriente1: 'K2', nutriente2: 'Ca', tipo: 'Sinergismo', recomendacao: 'K2 direciona cálcio para locais corretos' },
  { nutriente1: 'K2', nutriente2: 'D', tipo: 'Sinergismo', recomendacao: 'Trabalham juntas na saúde óssea' },
  { nutriente1: 'Zn', nutriente2: 'A', tipo: 'Sinergismo', recomendacao: 'Zinco necessário para transporte de vitamina A' },
  { nutriente1: 'Zn', nutriente2: 'B6', tipo: 'Sinergismo', recomendacao: 'Trabalham juntos na função imunológica' },
  { nutriente1: 'Zn', nutriente2: 'D', tipo: 'Sinergismo', recomendacao: 'Atuam juntos na imunidade' },
  { nutriente1: 'Zn', nutriente2: 'K2', tipo: 'Sinergismo', recomendacao: 'Trabalham juntos na saúde óssea' },
  { nutriente1: 'Zn', nutriente2: 'AL', tipo: 'Sinergismo', recomendacao: 'Ácido alfa-lipóico potencializa zinco' },
  { nutriente1: 'Zn', nutriente2: 'B9', tipo: 'Sinergismo', recomendacao: 'Trabalham juntos na síntese de DNA' },
  { nutriente1: 'K2', nutriente2: 'Mg', tipo: 'Sinergismo', recomendacao: 'Magnésio auxilia ação da vitamina K' },

  // Antagonismos - Nutrientes que interferem na absorção uns dos outros
  { nutriente1: 'Ca', nutriente2: 'Fe', tipo: 'Antagonismo', recomendacao: 'SEPARAR: Cálcio reduz absorção de ferro. Intervalo mínimo 2h' },
  { nutriente1: 'Ca', nutriente2: 'Mg', tipo: 'Antagonismo', recomendacao: 'SEPARAR: Competem pela absorção. Tomar em horários diferentes' },
  { nutriente1: 'Ca', nutriente2: 'Zn', tipo: 'Antagonismo', recomendacao: 'SEPARAR: Cálcio interfere na absorção de zinco. Intervalo 2h' },
  { nutriente1: 'Fe', nutriente2: 'Zn', tipo: 'Antagonismo', recomendacao: 'SEPARAR: Competem pela absorção. Ferro pela manhã, zinco à noite' },
  { nutriente1: 'Zn', nutriente2: 'Fe', tipo: 'Antagonismo', recomendacao: 'SEPARAR: Zinco interfere na absorção de ferro. Intervalo mínimo 2h' },
  { nutriente1: 'A', nutriente2: 'E', tipo: 'Antagonismo', recomendacao: 'ATENÇÃO: Em altas doses, vitamina E pode interferir em vitamina A' }
];

// Função auxiliar para buscar interações de um nutriente
export const getInteractionsForNutrient = (nutrientCode) => {
  return NUTRIENT_INTERACTIONS.filter(
    interaction => interaction.nutriente1 === nutrientCode || interaction.nutriente2 === nutrientCode
  );
};

// Função para verificar antagonismos em uma lista de nutrientes
export const checkAntagonisms = (nutrients) => {
  const antagonisms = [];
  
  for (let i = 0; i < nutrients.length; i++) {
    for (let j = i + 1; j < nutrients.length; j++) {
      const interaction = NUTRIENT_INTERACTIONS.find(
        int => int.tipo === 'Antagonismo' && 
        ((int.nutriente1 === nutrients[i] && int.nutriente2 === nutrients[j]) ||
         (int.nutriente1 === nutrients[j] && int.nutriente2 === nutrients[i]))
      );
      
      if (interaction) {
        antagonisms.push({
          nutriente1: nutrients[i],
          nutriente2: nutrients[j],
          recomendacao: interaction.recomendacao
        });
      }
    }
  }
  
  return antagonisms;
};

// Função para verificar sinergismos em uma lista de nutrientes
export const checkSynergies = (nutrients) => {
  const synergies = [];
  
  for (let i = 0; i < nutrients.length; i++) {
    for (let j = i + 1; j < nutrients.length; j++) {
      const interaction = NUTRIENT_INTERACTIONS.find(
        int => int.tipo === 'Sinergismo' && 
        ((int.nutriente1 === nutrients[i] && int.nutriente2 === nutrients[j]) ||
         (int.nutriente1 === nutrients[j] && int.nutriente2 === nutrients[i]))
      );
      
      if (interaction) {
        synergies.push({
          nutriente1: nutrients[i],
          nutriente2: nutrients[j],
          recomendacao: interaction.recomendacao
        });
      }
    }
  }
  
  return synergies;
};
