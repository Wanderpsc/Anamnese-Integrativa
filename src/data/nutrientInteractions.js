// Base de dados: Interações entre Nutrientes (Sinergismo e Antagonismo)
// Estas interações devem ser consideradas em todos os protocolos e receituários

export const NUTRIENT_INTERACTIONS = [
  { nutriente1: 'Ácido Alfa-lipóico', nutriente2: 'Vitamina C', tipo: 'Sinergismo' },
  { nutriente1: 'Cálcio', nutriente2: 'Ferro', tipo: 'Antagonismo' },
  { nutriente1: 'Cálcio', nutriente2: 'Fósforo', tipo: 'Antagonismo' },
  { nutriente1: 'Cálcio', nutriente2: 'Magnésio', tipo: 'Antagonismo' },
  { nutriente1: 'Cálcio', nutriente2: 'Vitamina B12', tipo: 'Sinergismo' },
  { nutriente1: 'Cálcio', nutriente2: 'Vitamina K', tipo: 'Sinergismo' },
  { nutriente1: 'Cálcio', nutriente2: 'Zinco', tipo: 'Antagonismo' },
  { nutriente1: 'Cálcio', nutriente2: 'Vitamina D', tipo: 'Sinergismo' },
  { nutriente1: 'Cálcio', nutriente2: 'Ácido Fítico', tipo: 'Antagonismo' },
  { nutriente1: 'Cálcio', nutriente2: 'Boro', tipo: 'Sinergismo' },
  { nutriente1: 'Cálcio', nutriente2: 'Proteína', tipo: 'Sinergismo' },
  { nutriente1: 'Cálcio', nutriente2: 'Sódio', tipo: 'Antagonismo' },
  { nutriente1: 'Cobre', nutriente2: 'Zinco', tipo: 'Antagonismo' },
  { nutriente1: 'Ferro', nutriente2: 'Cobre', tipo: 'Sinergismo' },
  { nutriente1: 'Ferro', nutriente2: 'Vitamina C', tipo: 'Sinergismo' },
  { nutriente1: 'Ferro', nutriente2: 'Cálcio', tipo: 'Antagonismo' },
  { nutriente1: 'Ferro', nutriente2: 'Zinco', tipo: 'Antagonismo' },
  { nutriente1: 'Ferro', nutriente2: 'Ácido Fítico', tipo: 'Antagonismo' },
  { nutriente1: 'Ferro', nutriente2: 'Vitamina A', tipo: 'Sinergismo' },
  { nutriente1: 'Ferro', nutriente2: 'Vitamina B6', tipo: 'Sinergismo' },
  { nutriente1: 'Ferro', nutriente2: 'Ácido Fólico', tipo: 'Sinergismo' },
  { nutriente1: 'Fósforo', nutriente2: 'Magnésio', tipo: 'Antagonismo' },
  { nutriente1: 'Fósforo', nutriente2: 'Vitamina D', tipo: 'Sinergismo' },
  { nutriente1: 'Magnésio', nutriente2: 'Cálcio', tipo: 'Sinergismo' },
  { nutriente1: 'Magnésio', nutriente2: 'Potássio', tipo: 'Sinergismo' },
  { nutriente1: 'Magnésio', nutriente2: 'Vitamina B1', tipo: 'Sinergismo' },
  { nutriente1: 'Magnésio', nutriente2: 'Vitamina D', tipo: 'Sinergismo' },
  { nutriente1: 'Magnésio', nutriente2: 'Zinco', tipo: 'Sinergismo' },
  { nutriente1: 'Magnésio', nutriente2: 'Ácido Fítico', tipo: 'Antagonismo' },
  { nutriente1: 'Magnésio', nutriente2: 'Vitamina C', tipo: 'Sinergismo' },
  { nutriente1: 'Magnésio', nutriente2: 'Cloreto', tipo: 'Sinergismo' },
  { nutriente1: 'Magnésio', nutriente2: 'Cromo', tipo: 'Sinergismo' },
  { nutriente1: 'Magnésio', nutriente2: 'Taurina', tipo: 'Sinergismo' },
  { nutriente1: 'Magnésio', nutriente2: 'Vitamina B2', tipo: 'Sinergismo' },
  { nutriente1: 'Magnésio', nutriente2: 'Vitamina B3', tipo: 'Sinergismo' },
  { nutriente1: 'Ômega-3', nutriente2: 'Vitamina E', tipo: 'Sinergismo' },
  { nutriente1: 'Ômega-3', nutriente2: 'Vitamina D', tipo: 'Sinergismo' },
  { nutriente1: 'Ômega-3', nutriente2: 'Vitamina C', tipo: 'Sinergismo' },
  { nutriente1: 'Selênio', nutriente2: 'Magnésio', tipo: 'Sinergismo' },
  { nutriente1: 'Selênio', nutriente2: 'Vitamina E', tipo: 'Sinergismo' },
  { nutriente1: 'Selênio', nutriente2: 'Ácido Fólico', tipo: 'Sinergismo' },
  { nutriente1: 'Selênio', nutriente2: 'Zinco', tipo: 'Sinergismo' },
  { nutriente1: 'Selênio', nutriente2: 'Coenzima Q10', tipo: 'Sinergismo' },
  { nutriente1: 'Selênio', nutriente2: 'Vitamina A', tipo: 'Sinergismo' },
  { nutriente1: 'Selênio', nutriente2: 'Vitamina C', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina A', nutriente2: 'Vitamina E', tipo: 'Antagonismo' },
  { nutriente1: 'Vitamina A', nutriente2: 'Zinco', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina A', nutriente2: 'Carotenóides', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina A', nutriente2: 'Vitamina B12', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina A', nutriente2: 'Vitamina D', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B1', nutriente2: 'Ácido Fólico', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B1 (Tiamina)', nutriente2: 'Zinco', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B12', nutriente2: 'Biotina', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B12', nutriente2: 'Folato', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B12', nutriente2: 'Vitamina B6', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B12', nutriente2: 'Vitamina E', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B2', nutriente2: 'Vitamina B6', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B2 (Riboflavina)', nutriente2: 'Ferro', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B3 (Niacina)', nutriente2: 'Vitamina B6', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B5 (Ácido Pantotênico)', nutriente2: 'Coenzima A', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B6', nutriente2: 'Magnésio', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B6', nutriente2: 'Vitamina B12', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B6', nutriente2: 'Ácido Fólico', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B6', nutriente2: 'Ácido Alfa-lipóico', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B9 (Ácido Fólico)', nutriente2: 'Vitamina C', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B9 (Ácido Fólico)', nutriente2: 'Vitamina B12', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina B9 (Ácido Fólico)', nutriente2: 'Vitamina B2', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina C', nutriente2: 'Selênio', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina C', nutriente2: 'Vitamina E', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina C', nutriente2: 'Cobre', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina C', nutriente2: 'Vitamina K', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina C', nutriente2: 'Ácido Fólico', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina D', nutriente2: 'Cálcio', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina D', nutriente2: 'Vitamina K2', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina D', nutriente2: 'Vitamina B12', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina D', nutriente2: 'Magnésio', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina D', nutriente2: 'Selênio', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina D', nutriente2: 'Vitamina A', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina D', nutriente2: 'Vitamina B5 (Ácido Pantotênico)', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina E', nutriente2: 'Vitamina A', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina E', nutriente2: 'Selênio', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina E', nutriente2: 'Coenzima Q10', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina E', nutriente2: 'Ferro', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina K', nutriente2: 'Magnésio', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina K2', nutriente2: 'Cálcio', tipo: 'Sinergismo' },
  { nutriente1: 'Vitamina K2', nutriente2: 'Vitamina D', tipo: 'Sinergismo' },
  { nutriente1: 'Zinco', nutriente2: 'Cobre', tipo: 'Antagonismo' },
  { nutriente1: 'Zinco', nutriente2: 'Ferro', tipo: 'Antagonismo' },
  { nutriente1: 'Zinco', nutriente2: 'Vitamina A', tipo: 'Sinergismo' },
  { nutriente1: 'Zinco', nutriente2: 'Vitamina B6', tipo: 'Sinergismo' },
  { nutriente1: 'Zinco', nutriente2: 'Vitamina D', tipo: 'Sinergismo' },
  { nutriente1: 'Zinco', nutriente2: 'Vitamina K', tipo: 'Sinergismo' },
  { nutriente1: 'Zinco', nutriente2: 'Ácido Alfa-lipóico', tipo: 'Sinergismo' },
  { nutriente1: 'Zinco', nutriente2: 'Ácido Fólico', tipo: 'Sinergismo' }
];

// Mapear códigos para nomes completos
export const NUTRIENT_CODE_MAPPING = {
  'A': 'Vitamina A',
  'B1': 'Vitamina B1',
  'B2': 'Vitamina B2',
  'B3': 'Vitamina B3',
  'B5': 'Vitamina B5',
  'B6': 'Vitamina B6',
  'B7': 'Vitamina B7',
  'B9': 'Vitamina B9 (Ácido Fólico)',
  'B12': 'Vitamina B12',
  'C': 'Vitamina C',
  'D': 'Vitamina D',
  'E': 'Vitamina E',
  'K2': 'Vitamina K2',
  'Fe': 'Ferro',
  'Mg': 'Magnésio',
  'Zn': 'Zinco',
  'O3': 'Ômega-3',
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
  'AL': 'Ácido Alfa-lipóico',
  'BO': 'Boro',
  'PO': 'Potássio',
  'LU': 'Luteína',
  'ZE': 'Zeaxantina',
  'IN': 'Inositol',
  'L-A': 'L-Arginina',
  'ME': 'Melatonina',
  'NAC': 'N-Acetilcisteína'
};

// Função para buscar interações de um nutriente específico
export const getInteractionsForNutrient = (nutrientCode) => {
  const nutrientName = NUTRIENT_CODE_MAPPING[nutrientCode] || nutrientCode;
  return NUTRIENT_INTERACTIONS.filter(
    interaction =>
      interaction.nutriente1.includes(nutrientName) ||
      interaction.nutriente2.includes(nutrientName)
  );
};

// Função para verificar se há antagonismo entre dois nutrientes
export const hasAntagonism = (nutrient1Code, nutrient2Code) => {
  const name1 = NUTRIENT_CODE_MAPPING[nutrient1Code] || nutrient1Code;
  const name2 = NUTRIENT_CODE_MAPPING[nutrient2Code] || nutrient2Code;
  
  return NUTRIENT_INTERACTIONS.some(
    interaction =>
      interaction.tipo === 'Antagonismo' &&
      ((interaction.nutriente1.includes(name1) && interaction.nutriente2.includes(name2)) ||
       (interaction.nutriente1.includes(name2) && interaction.nutriente2.includes(name1)))
  );
};

// Função para verificar se há sinergismo entre dois nutrientes
export const hasSynergy = (nutrient1Code, nutrient2Code) => {
  const name1 = NUTRIENT_CODE_MAPPING[nutrient1Code] || nutrient1Code;
  const name2 = NUTRIENT_CODE_MAPPING[nutrient2Code] || nutrient2Code;
  
  return NUTRIENT_INTERACTIONS.some(
    interaction =>
      interaction.tipo === 'Sinergismo' &&
      ((interaction.nutriente1.includes(name1) && interaction.nutriente2.includes(name2)) ||
       (interaction.nutriente1.includes(name2) && interaction.nutriente2.includes(name1)))
  );
};

// Estatísticas
export const getInteractionStats = () => {
  const sinergismos = NUTRIENT_INTERACTIONS.filter(i => i.tipo === 'Sinergismo').length;
  const antagonismos = NUTRIENT_INTERACTIONS.filter(i => i.tipo === 'Antagonismo').length;
  const total = NUTRIENT_INTERACTIONS.length;
  
  return { sinergismos, antagonismos, total };
};
