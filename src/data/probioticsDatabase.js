// Base de dados completa: Patologias e Probióticos Recomendados
// Atualizado com dados da planilha completa
// Versão 2.0 - Exportações corrigidas para evitar erro de inicialização

const PROBIOTIC_STRAINS = {
  'Bacillus coagulans (L.sporogenes)': {
    name: 'Bacillus coagulans (L.sporogenes)',
    codigo: 'BC',
    benefits: ['Saúde digestiva', 'Imunidade', 'Redução de gases', 'Anti-inflamatório'],
    dosage: '2 bilhões UFC/dia',
    timing: 'Com as refeições'
  },
  'Bifidobacterium adolescentis': {
    name: 'Bifidobacterium adolescentis',
    codigo: 'BA',
    benefits: ['Saúde intestinal', 'Metabolismo', 'Redução de colesterol'],
    dosage: '1-10 bilhões UFC/dia',
    timing: 'Preferencialmente à noite'
  },
  'Bifidobacterium animalis (sub.B.lactis)': {
    name: 'Bifidobacterium animalis (sub.B.lactis)',
    codigo: 'BAL',
    benefits: ['Constipação', 'Imunidade', 'Saúde digestiva', 'Alergias'],
    dosage: '5-10 bilhões UFC/dia',
    timing: 'Pela manhã em jejum'
  },
  'Bifidobacterium bifidum': {
    name: 'Bifidobacterium bifidum',
    codigo: 'BB',
    benefits: ['Síndrome do intestino irritável', 'Alergias', 'Imunidade', 'Diarreia'],
    dosage: '1-10 bilhões UFC/dia',
    timing: 'Com as refeições'
  },
  'Bifidobacterium breve': {
    name: 'Bifidobacterium breve',
    codigo: 'BBR',
    benefits: ['Saúde infantil', 'Dermatite', 'Obesidade', 'Alergias'],
    dosage: '1-10 bilhões UFC/dia',
    timing: 'Pela manhã'
  },
  'Bifidobacterium infantis': {
    name: 'Bifidobacterium infantis',
    codigo: 'BI',
    benefits: ['Síndrome do intestino irritável', 'Inflamação intestinal', 'Depressão'],
    dosage: '1-10 bilhões UFC/dia',
    timing: 'À noite antes de dormir'
  },
  'Bifidobacterium lactis': {
    name: 'Bifidobacterium lactis',
    codigo: 'BL',
    benefits: ['Imunidade', 'Constipação', 'Intolerância à lactose'],
    dosage: '5-10 bilhões UFC/dia',
    timing: 'Pela manhã'
  },
  'Bifidobacterium longum': {
    name: 'Bifidobacterium longum',
    codigo: 'BLG',
    benefits: ['Ansiedade', 'Estresse', 'Saúde mental', 'Inflamação'],
    dosage: '1-10 bilhões UFC/dia',
    timing: 'À noite'
  },
  'Lactobacillus acidophilus': {
    name: 'Lactobacillus acidophilus',
    codigo: 'LA',
    benefits: ['Intolerância à lactose', 'Candidíase', 'Colesterol', 'Diarreia'],
    dosage: '1-10 bilhões UFC/dia',
    timing: 'Com as refeições'
  },
  'Lactobacillus casei': {
    name: 'Lactobacillus casei',
    codigo: 'LC',
    benefits: ['Diarreia', 'Imunidade', 'Colesterol', 'Constipação'],
    dosage: '8-10 bilhões UFC/dia',
    timing: 'Pela manhã'
  },
  'Lactobacillus crispatus': {
    name: 'Lactobacillus crispatus',
    codigo: 'LCR',
    benefits: ['Saúde vaginal', 'Vaginose', 'Infecções urinárias'],
    dosage: '1-10 bilhões UFC/dia',
    timing: 'Pela manhã'
  },
  'Lactobacillus curvatus': {
    name: 'Lactobacillus curvatus',
    codigo: 'LCV',
    benefits: ['Anti-inflamatório', 'Saúde intestinal'],
    dosage: '1-5 bilhões UFC/dia',
    timing: 'Com as refeições'
  },
  'Lactobacillus delbrueckii': {
    name: 'Lactobacillus delbrueckii',
    codigo: 'LD',
    benefits: ['Intolerância à lactose', 'Saúde digestiva'],
    dosage: '1-10 bilhões UFC/dia',
    timing: 'Com as refeições'
  },
  'Lactobacillus fermentum': {
    name: 'Lactobacillus fermentum',
    codigo: 'LF',
    benefits: ['Colesterol', 'Imunidade', 'Saúde respiratória'],
    dosage: '1-10 bilhões UFC/dia',
    timing: 'Pela manhã'
  },
  'Lactobacillus gasseri': {
    name: 'Lactobacillus gasseri',
    codigo: 'LG',
    benefits: ['Perda de peso', 'Obesidade', 'Gordura abdominal', 'H. pylori'],
    dosage: '10 bilhões UFC/dia',
    timing: 'Pela manhã em jejum'
  },
  'Lactobacillus helveticus': {
    name: 'Lactobacillus helveticus',
    codigo: 'LH',
    benefits: ['Ansiedade', 'Depressão', 'Hipertensão', 'Sono'],
    dosage: '3-6 bilhões UFC/dia',
    timing: 'À noite'
  },
  'Lactobacillus johnsonii': {
    name: 'Lactobacillus johnsonii',
    codigo: 'LJ',
    benefits: ['H. pylori', 'Gastrite', 'Saúde digestiva'],
    dosage: '1-10 bilhões UFC/dia',
    timing: 'Com as refeições'
  },
  'Lactobacillus paracasei': {
    name: 'Lactobacillus paracasei',
    codigo: 'LP',
    benefits: ['Imunidade', 'Alergias', 'Diarreia', 'Inflamação'],
    dosage: '8-10 bilhões UFC/dia',
    timing: 'Pela manhã'
  },
  'Lactobacillus plantarum': {
    name: 'Lactobacillus plantarum',
    codigo: 'LPL',
    benefits: ['Síndrome do intestino irritável', 'Permeabilidade intestinal', 'Imunidade'],
    dosage: '10 bilhões UFC/dia',
    timing: 'Com as refeições'
  },
  'Lactobacillus reuteri': {
    name: 'Lactobacillus reuteri',
    codigo: 'LR',
    benefits: ['Cólicas infantis', 'Saúde oral', 'Colesterol', 'Vitamina D'],
    dosage: '100 milhões-1 bilhão UFC/dia',
    timing: 'Pela manhã'
  },
  'Lactobacillus rhamnosus': {
    name: 'Lactobacillus rhamnosus',
    codigo: 'LRH',
    benefits: ['Diarreia', 'Eczema', 'Vaginose', 'Imunidade', 'Obesidade'],
    dosage: '6-10 bilhões UFC/dia',
    timing: 'Pela manhã'
  },
  'Lactobacillus salivarius': {
    name: 'Lactobacillus salivarius',
    codigo: 'LS',
    benefits: ['Saúde oral', 'Halitose', 'Cáries', 'Gengivite'],
    dosage: '1-10 bilhões UFC/dia',
    timing: 'À noite após escovação'
  },
  'Enterococus faecium': {
    name: 'Enterococus faecium',
    codigo: 'EF',
    benefits: ['Diarreia', 'Antibioticoterapia', 'Saúde intestinal'],
    dosage: '1-10 bilhões UFC/dia',
    timing: 'Com as refeições'
  },
  'Lactobacillus lactis': {
    name: 'Lactobacillus lactis',
    codigo: 'LL',
    benefits: ['Intolerância à lactose', 'Imunidade'],
    dosage: '1-10 bilhões UFC/dia',
    timing: 'Com as refeições'
  },
  'Streptococcus salivarius': {
    name: 'Streptococcus salivarius',
    codigo: 'SS',
    benefits: ['Saúde oral', 'Otite', 'Faringite', 'Sinusite'],
    dosage: '1 bilhão UFC/dia',
    timing: 'À noite após escovação'
  },
  'Streptococcus thermophillus': {
    name: 'Streptococcus thermophillus',
    codigo: 'ST',
    benefits: ['Intolerância à lactose', 'Diarreia', 'Saúde digestiva'],
    dosage: '1-10 bilhões UFC/dia',
    timing: 'Com as refeições'
  },
  'Sacharomyces boulardii': {
    name: 'Sacharomyces boulardii',
    codigo: 'SB',
    benefits: ['Diarreia aguda', 'Antibioticoterapia', 'C. difficile', 'Síndrome do intestino irritável'],
    dosage: '250-500 mg (5-10 bilhões UFC)/dia',
    timing: 'Entre as refeições'
  },
  'Bio-MAMPs B. lactis': {
    name: 'Bio-MAMPs B. lactis',
    codigo: 'BM-BL',
    benefits: ['Imunidade (forma inativada)', 'Modulação imunológica'],
    dosage: 'Conforme fabricante',
    timing: 'Pela manhã'
  },
  'Bio-MAMPs L. acidophilus': {
    name: 'Bio-MAMPs L. acidophilus',
    codigo: 'BM-LA',
    benefits: ['Imunidade (forma inativada)', 'Saúde digestiva'],
    dosage: 'Conforme fabricante',
    timing: 'Pela manhã'
  },
  'Bio-MAMPs L. casei': {
    name: 'Bio-MAMPs L. casei',
    codigo: 'BM-LC',
    benefits: ['Imunidade (forma inativada)', 'Anti-inflamatório'],
    dosage: 'Conforme fabricante',
    timing: 'Pela manhã'
  },
  'Bio-MAMPs L. Gasseri': {
    name: 'Bio-MAMPs L. Gasseri',
    codigo: 'BM-LG',
    benefits: ['Metabolismo (forma inativada)', 'Controle de peso'],
    dosage: 'Conforme fabricante',
    timing: 'Pela manhã'
  },
  'Bio-MAMPs L. helveticus': {
    name: 'Bio-MAMPs L. helveticus',
    codigo: 'BM-LH',
    benefits: ['Saúde mental (forma inativada)', 'Estresse'],
    dosage: 'Conforme fabricante',
    timing: 'À noite'
  },
  'Bio-MAMPs L. rhamnosus': {
    name: 'Bio-MAMPs L. rhamnosus',
    codigo: 'BM-LR',
    benefits: ['Imunidade (forma inativada)', 'Alergias'],
    dosage: 'Conforme fabricante',
    timing: 'Pela manhã'
  },
  'Bio-MAMPs S. thermophilus': {
    name: 'Bio-MAMPs S. thermophilus',
    codigo: 'BM-ST',
    benefits: ['Saúde digestiva (forma inativada)', 'Lactose'],
    dosage: 'Conforme fabricante',
    timing: 'Com as refeições'
  }
};

// Mapeamento completo: Patologias → Probióticos Recomendados
const PATHOLOGY_TO_PROBIOTICS = {
  'Acne, inflamação cutânea': [
    'Lactobacillus acidophilus', 'Lactobacillus casei', 'Lactobacillus delbrueckii',
    'Lactobacillus fermentum', 'Lactobacillus paracasei', 'Lactobacillus rhamnosus'
  ],
  'Alergia ao pólen': [
    'Bifidobacterium bifidum', 'Bifidobacterium breve', 'Lactobacillus paracasei',
    'Lactobacillus plantarum', 'Lactobacillus rhamnosus', 'Bio-MAMPs B. lactis',
    'Bio-MAMPs L. casei', 'Bio-MAMPs L. helveticus', 'Bio-MAMPs L. rhamnosus'
  ],
  'Alergias alimentares': [
    'Bifidobacterium breve', 'Bifidobacterium lactis', 'Lactobacillus casei',
    'Lactobacillus gasseri', 'Lactobacillus helveticus', 'Lactobacillus plantarum',
    'Lactobacillus rhamnosus', 'Lactobacillus lactis', 'Bio-MAMPs B. lactis',
    'Bio-MAMPs L. acidophilus'
  ],
  'Alterações digestivas': [
    'Bacillus coagulans (L.sporogenes)', 'Bifidobacterium animalis (sub.B.lactis)',
    'Bifidobacterium bifidum', 'Lactobacillus acidophilus', 'Lactobacillus delbrueckii',
    'Lactobacillus helveticus', 'Lactobacillus paracasei', 'Lactobacillus plantarum',
    'Streptococcus thermophillus', 'Sacharomyces boulardii', 'Bio-MAMPs B. lactis',
    'Bio-MAMPs L. helveticus'
  ],
  'Anemia': [
    'Bifidobacterium breve', 'Bifidobacterium lactis', 'Lactobacillus acidophilus',
    'Lactobacillus paracasei', 'Lactobacillus reuteri'
  ],
  'Anemia falciforme': [
    'Bifidobacterium breve', 'Bifidobacterium longum', 'Lactobacillus paracasei'
  ],
  'Anorexia': [
    'Bifidobacterium breve', 'Bifidobacterium longum', 'Lactobacillus paracasei'
  ],
  'Anti-aging, fotoenvelhecimento': [
    'Bifidobacterium breve', 'Lactobacillus casei', 'Lactobacillus helveticus',
    'Lactobacillus plantarum'
  ],
  'Antibicoterapia': [
    'Bacillus coagulans (L.sporogenes)', 'Bifidobacterium bifidum',
    'Bifidobacterium longum', 'Lactobacillus casei', 'Lactobacillus helveticus',
    'Lactobacillus paracasei', 'Lactobacillus plantarum', 'Enterococus faecium',
    'Sacharomyces boulardii'
  ],
  'Artrite': [
    'Bifidobacterium longum', 'Lactobacillus acidophilus', 'Lactobacillus casei',
    'Lactobacillus helveticus', 'Lactobacillus plantarum', 'Enterococus faecium'
  ],
  'Aterosclerose': [
    'Bifidobacterium breve', 'Bifidobacterium infantis', 'Lactobacillus acidophilus',
    'Lactobacillus fermentum', 'Lactobacillus gasseri', 'Lactobacillus helveticus',
    'Lactobacillus reuteri'
  ],
  'Autismo': [
    'Bifidobacterium animalis (sub.B.lactis)', 'Bifidobacterium bifidum',
    'Bifidobacterium longum', 'Lactobacillus acidophilus', 'Lactobacillus delbrueckii',
    'Lactobacillus rhamnosus', 'Streptococcus thermophillus', 'Bio-MAMPs B. lactis'
  ],
  'Bulimia': [
    'Bifidobacterium bifidum', 'Lactobacillus casei', 'Lactobacillus helveticus'
  ],
  'Câncer de cólon': [
    'Bifidobacterium lactis', 'Bifidobacterium longum', 'Lactobacillus paracasei'
  ],
  'Câncer de mama': [
    'Bifidobacterium lactis', 'Lactobacillus helveticus', 'Lactobacillus plantarum'
  ],
  'Câncer de próstata': [
    'Bifidobacterium longum', 'Lactobacillus casei', 'Lactobacillus plantarum'
  ],
  'Candidíase': [
    'Lactobacillus acidophilus', 'Lactobacillus casei', 'Lactobacillus fermentum',
    'Lactobacillus gasseri', 'Lactobacillus rhamnosus', 'Streptococcus thermophillus',
    'Sacharomyces boulardii', 'Bio-MAMPs L. acidophilus'
  ],
  'Celíacos': [
    'Bifidobacterium animalis (sub.B.lactis)', 'Bifidobacterium breve',
    'Bifidobacterium infantis', 'Bifidobacterium lactis', 'Bifidobacterium longum',
    'Lactobacillus fermentum', 'Lactobacillus helveticus', 'Lactobacillus plantarum',
    'Lactobacillus rhamnosus', 'Streptococcus thermophillus', 'Bio-MAMPs B. lactis',
    'Bio-MAMPs L. helveticus'
  ],
  'Cirrose hepática': [
    'Bifidobacterium longum', 'Lactobacillus casei', 'Lactobacillus plantarum'
  ],
  'Cistite intersticial': [
    'Bifidobacterium bifidum', 'Lactobacillus acidophilus', 'Lactobacillus paracasei'
  ],
  'Colesterol e triglicérides': [
    'Bifidobacterium breve', 'Bifidobacterium longum', 'Lactobacillus acidophilus',
    'Lactobacillus casei', 'Lactobacillus delbrueckii', 'Lactobacillus plantarum',
    'Lactobacillus reuteri', 'Sacharomyces boulardii'
  ],
  'Colite': [
    'Bifidobacterium animalis (sub.B.lactis)', 'Bifidobacterium breve',
    'Bifidobacterium longum', 'Lactobacillus acidophilus', 'Lactobacillus curvatus',
    'Lactobacillus paracasei', 'Lactobacillus reuteri'
  ],
  'Constipação intestinal': [
    'Bifidobacterium animalis (sub.B.lactis)', 'Bifidobacterium bifidum',
    'Bifidobacterium infantis', 'Bifidobacterium longum', 'Lactobacillus fermentum',
    'Lactobacillus paracasei', 'Lactobacillus rhamnosus'
  ],
  'Depressão, estresse': [
    'Bifidobacterium bifidum', 'Bifidobacterium infantis', 'Bifidobacterium lactis',
    'Bifidobacterium longum', 'Lactobacillus acidophilus', 'Lactobacillus delbrueckii',
    'Lactobacillus rhamnosus', 'Streptococcus thermophillus', 'Bio-MAMPs B. lactis',
    'Bio-MAMPs L. helveticus'
  ],
  'Dermatomiosite': [
    'Bifidobacterium breve', 'Bifidobacterium longum', 'Lactobacillus casei'
  ],
  'Diabetes': [
    'Bacillus coagulans (L.sporogenes)', 'Bifidobacterium breve',
    'Bifidobacterium lactis', 'Bifidobacterium longum', 'Lactobacillus delbrueckii',
    'Lactobacillus plantarum'
  ],
  'Diarreia, gases': [
    'Bifidobacterium animalis (sub.B.lactis)', 'Bifidobacterium bifidum',
    'Bifidobacterium longum', 'Lactobacillus casei', 'Lactobacillus helveticus'
  ],
  'Disbiose': [
    'Bifidobacterium adolescentis', 'Bifidobacterium bifidum', 'Bifidobacterium breve',
    'Bifidobacterium lactis', 'Bifidobacterium longum', 'Lactobacillus acidophilus',
    'Lactobacillus curvatus', 'Lactobacillus delbrueckii', 'Lactobacillus fermentum',
    'Lactobacillus gasseri', 'Lactobacillus paracasei', 'Lactobacillus plantarum',
    'Lactobacillus rhamnosus', 'Enterococus faecium'
  ],
  'Diverticulite': [
    'Bifidobacterium breve', 'Bifidobacterium infantis', 'Bifidobacterium lactis',
    'Bifidobacterium longum', 'Lactobacillus delbrueckii', 'Lactobacillus fermentum',
    'Lactobacillus gasseri', 'Lactobacillus helveticus', 'Lactobacillus rhamnosus'
  ],
  'Doença de Crohn': [
    'Bifidobacterium animalis (sub.B.lactis)', 'Bifidobacterium bifidum',
    'Sacharomyces boulardii'
  ],
  'Doenças metabólicas': [
    'Bifidobacterium breve', 'Bifidobacterium longum', 'Lactobacillus acidophilus',
    'Lactobacillus curvatus', 'Lactobacillus delbrueckii', 'Lactobacillus fermentum',
    'Lactobacillus plantarum', 'Lactobacillus reuteri', 'Streptococcus thermophillus',
    'Sacharomyces boulardii', 'Bio-MAMPs B. lactis', 'Bio-MAMPs L. acidophilus',
    'Bio-MAMPs L. casei', 'Bio-MAMPs L. Gasseri', 'Bio-MAMPs L. helveticus',
    'Bio-MAMPs L. rhamnosus', 'Bio-MAMPs S. thermophilus'
  ],
  'Eczema': [
    'Bifidobacterium breve', 'Lactobacillus casei', 'Lactobacillus delbrueckii',
    'Lactobacillus fermentum', 'Lactobacillus paracasei', 'Lactobacillus rhamnosus',
    'Streptococcus thermophillus', 'Bio-MAMPs B. lactis', 'Bio-MAMPs L. helveticus'
  ],
  'Encefalopatia hepática': [
    'Bifidobacterium lactis', 'Bifidobacterium longum', 'Lactobacillus casei'
  ],
  'Enxaqueca': [
    'Bifidobacterium breve', 'Lactobacillus casei', 'Lactobacillus reuteri'
  ],
  'Esquizofrenia': [
    'Bifidobacterium infantis', 'Bifidobacterium lactis', 'Bifidobacterium longum',
    'Lactobacillus helveticus'
  ],
  'Esteatose hepática': [
    'Bifidobacterium animalis (sub.B.lactis)', 'Bifidobacterium bifidum',
    'Bifidobacterium lactis', 'Bifidobacterium longum', 'Lactobacillus acidophilus',
    'Lactobacillus fermentum', 'Lactobacillus gasseri', 'Lactobacillus helveticus',
    'Lactobacillus paracasei', 'Lactobacillus plantarum', 'Lactobacillus rhamnosus',
    'Streptococcus thermophillus'
  ],
  'Fadiga crônica': [
    'Bifidobacterium infantis', 'Bifidobacterium longum', 'Lactobacillus helveticus'
  ],
  'Fibromialgia': [
    'Bifidobacterium lactis', 'Lactobacillus helveticus', 'Lactobacillus plantarum'
  ],
  'Gastrite': [
    'Bifidobacterium longum', 'Lactobacillus casei', 'Lactobacillus helveticus'
  ],
  'Hepatite': [
    'Bifidobacterium lactis', 'Bifidobacterium longum', 'Lactobacillus helveticus'
  ],
  'Hepatite alcoólica': [
    'Bifidobacterium longum', 'Lactobacillus casei', 'Lactobacillus reuteri'
  ],
  'Hepatite não alcoólica': [
    'Bifidobacterium lactis', 'Bifidobacterium longum', 'Sacharomyces boulardii'
  ],
  'Hipercalcemia': [
    'Bifidobacterium lactis', 'Lactobacillus casei', 'Lactobacillus helveticus'
  ],
  'Hiperparatireoidismo': [
    'Bifidobacterium lactis', 'Lactobacillus helveticus', 'Lactobacillus plantarum'
  ],
  'Hiperpigmentação, melasma': [
    'Bifidobacterium adolescentis', 'Lactobacillus casei', 'Lactobacillus delbrueckii',
    'Lactobacillus fermentum', 'Lactobacillus gasseri'
  ],
  'Hipertensão': [
    'Bifidobacterium infantis', 'Bifidobacterium longum', 'Lactobacillus fermentum',
    'Lactobacillus gasseri', 'Lactobacillus helveticus', 'Lactobacillus reuteri',
    'Sacharomyces boulardii'
  ],
  'Hipoglicemia': [
    'Bifidobacterium longum', 'Lactobacillus casei', 'Lactobacillus reuteri'
  ],
  'Hipotiroidismo': [
    'Bifidobacterium longum', 'Lactobacillus acidophilus', 'Lactobacillus casei'
  ],
  'Imunidade': [
    'Bacillus coagulans (L.sporogenes)', 'Bifidobacterium animalis (sub.B.lactis)',
    'Bifidobacterium bifidum', 'Bifidobacterium breve', 'Bifidobacterium longum',
    'Lactobacillus acidophilus', 'Lactobacillus curvatus', 'Lactobacillus delbrueckii',
    'Lactobacillus fermentum', 'Lactobacillus helveticus', 'Lactobacillus paracasei',
    'Lactobacillus plantarum', 'Lactobacillus rhamnosus', 'Lactobacillus salivarius',
    'Enterococus faecium', 'Streptococcus salivarius', 'Streptococcus thermophillus',
    'Bio-MAMPs B. lactis', 'Bio-MAMPs L. acidophilus', 'Bio-MAMPs L. casei',
    'Bio-MAMPs L. helveticus', 'Bio-MAMPs L. rhamnosus'
  ],
  'Infecções de ouvido': [
    'Bifidobacterium breve', 'Lactobacillus casei', 'Lactobacillus rhamnosus'
  ],
  'Infertilidade feminina': [
    'Lactobacillus acidophilus', 'Lactobacillus casei'
  ],
  'Infertilidade masculina': [
    'Bifidobacterium lactis', 'Lactobacillus casei', 'Lactobacillus helveticus'
  ],
  'Inflamação': [
    'Bifidobacterium animalis (sub.B.lactis)', 'Bifidobacterium breve',
    'Bifidobacterium infantis', 'Bifidobacterium lactis', 'Bifidobacterium longum',
    'Lactobacillus acidophilus', 'Lactobacillus curvatus', 'Lactobacillus delbrueckii',
    'Lactobacillus fermentum', 'Lactobacillus gasseri', 'Lactobacillus helveticus',
    'Lactobacillus reuteri', 'Streptococcus thermophillus', 'Bio-MAMPs B. lactis',
    'Bio-MAMPs L. acidophilus', 'Bio-MAMPs L. casei', 'Bio-MAMPs L. helveticus',
    'Bio-MAMPs L. rhamnosus'
  ],
  'Intolerância à Lactose': [
    'Bacillus coagulans (L.sporogenes)', 'Bifidobacterium bifidum',
    'Lactobacillus acidophilus', 'Lactobacillus casei', 'Lactobacillus delbrueckii',
    'Lactobacillus fermentum', 'Lactobacillus plantarum', 'Lactobacillus rhamnosus',
    'Lactobacillus lactis', 'Streptococcus thermophillus', 'Sacharomyces boulardii'
  ],
  'Intolerância ao Glúten': [
    'Bifidobacterium animalis (sub.B.lactis)', 'Bifidobacterium breve',
    'Bifidobacterium infantis', 'Bifidobacterium lactis', 'Bifidobacterium longum',
    'Lactobacillus acidophilus', 'Lactobacillus curvatus', 'Lactobacillus fermentum',
    'Lactobacillus gasseri', 'Lactobacillus helveticus', 'Lactobacillus paracasei',
    'Lactobacillus plantarum', 'Lactobacillus rhamnosus', 'Streptococcus thermophillus',
    'Sacharomyces boulardii', 'Bio-MAMPs B. lactis', 'Bio-MAMPs L. helveticus'
  ],
  'Lupus': [
    'Bifidobacterium breve', 'Lactobacillus casei', 'Lactobacillus helveticus'
  ],
  'Miastenia gravis': [
    'Bifidobacterium infantis', 'Bifidobacterium longum', 'Sacharomyces boulardii'
  ],
  'Obesidade': [
    'Bifidobacterium animalis (sub.B.lactis)', 'Bifidobacterium bifidum',
    'Bifidobacterium breve', 'Bifidobacterium longum', 'Lactobacillus acidophilus',
    'Lactobacillus curvatus', 'Lactobacillus delbrueckii', 'Lactobacillus fermentum',
    'Lactobacillus gasseri', 'Lactobacillus helveticus', 'Lactobacillus paracasei',
    'Lactobacillus plantarum', 'Lactobacillus rhamnosus', 'Streptococcus thermophillus',
    'Sacharomyces boulardii', 'Bio-MAMPs L. Gasseri'
  ],
  'Osteoporose': [
    'Bifidobacterium lactis', 'Lactobacillus casei', 'Lactobacillus helveticus'
  ],
  'Prostatite': [
    'Bifidobacterium breve', 'Lactobacillus casei', 'Lactobacillus plantarum'
  ],
  'Psicobióticos': [
    'Bifidobacterium bifidum', 'Bifidobacterium infantis', 'Bifidobacterium longum',
    'Lactobacillus delbrueckii', 'Lactobacillus fermentum', 'Lactobacillus gasseri',
    'Lactobacillus helveticus'
  ],
  'Psoríase': [
    'Bacillus coagulans (L.sporogenes)', 'Bifidobacterium infantis',
    'Lactobacillus acidophilus', 'Lactobacillus paracasei', 'Sacharomyces boulardii'
  ],
  'Renite/ Sinusite': [
    'Bifidobacterium animalis (sub.B.lactis)', 'Bifidobacterium bifidum',
    'Bifidobacterium lactis', 'Bifidobacterium longum', 'Lactobacillus acidophilus',
    'Lactobacillus delbrueckii', 'Lactobacillus fermentum', 'Lactobacillus gasseri',
    'Lactobacillus helveticus', 'Lactobacillus paracasei', 'Lactobacillus plantarum',
    'Lactobacillus reuteri', 'Streptococcus salivarius', 'Streptococcus thermophillus',
    'Sacharomyces boulardii', 'Bio-MAMPs B. lactis', 'Bio-MAMPs L. acidophilus',
    'Bio-MAMPs L. casei', 'Bio-MAMPs L. helveticus', 'Bio-MAMPs L. rhamnosus',
    'Bio-MAMPs S. thermophilus'
  ],
  'Saúde atleta': [
    'Bifidobacterium bifidum', 'Bifidobacterium infantis', 'Bifidobacterium longum',
    'Lactobacillus acidophilus', 'Lactobacillus curvatus', 'Lactobacillus delbrueckii',
    'Lactobacillus fermentum', 'Lactobacillus gasseri', 'Lactobacillus helveticus',
    'Lactobacillus paracasei', 'Streptococcus thermophillus', 'Sacharomyces boulardii',
    'Bio-MAMPs L. helveticus'
  ],
  'Saúde Crianças': [
    'Bifidobacterium breve', 'Bifidobacterium longum', 'Lactobacillus acidophilus',
    'Lactobacillus delbrueckii', 'Lactobacillus fermentum', 'Lactobacillus helveticus',
    'Lactobacillus paracasei', 'Lactobacillus plantarum', 'Lactobacillus reuteri',
    'Streptococcus salivarius', 'Streptococcus thermophillus', 'Sacharomyces boulardii',
    'Bio-MAMPs B. lactis', 'Bio-MAMPs L. acidophilus', 'Bio-MAMPs L. casei',
    'Bio-MAMPs L. helveticus', 'Bio-MAMPs L. rhamnosus'
  ],
  'Saúde Mulher': [
    'Bacillus coagulans (L.sporogenes)', 'Bifidobacterium animalis (sub.B.lactis)',
    'Bifidobacterium lactis', 'Bifidobacterium longum', 'Lactobacillus acidophilus',
    'Lactobacillus curvatus', 'Lactobacillus delbrueckii', 'Lactobacillus fermentum',
    'Lactobacillus gasseri', 'Lactobacillus helveticus', 'Lactobacillus paracasei',
    'Lactobacillus plantarum', 'Lactobacillus rhamnosus', 'Enterococus faecium',
    'Streptococcus thermophillus', 'Bio-MAMPs B. lactis', 'Bio-MAMPs L. acidophilus',
    'Bio-MAMPs L. casei', 'Bio-MAMPs L. helveticus', 'Bio-MAMPs L. rhamnosus'
  ],
  'Saúde na gestação': [
    'Bacillus coagulans (L.sporogenes)', 'Bifidobacterium animalis (sub.B.lactis)',
    'Bifidobacterium infantis', 'Bifidobacterium lactis', 'Bifidobacterium longum',
    'Lactobacillus acidophilus', 'Lactobacillus curvatus', 'Lactobacillus delbrueckii',
    'Lactobacillus fermentum', 'Lactobacillus helveticus', 'Lactobacillus paracasei',
    'Lactobacillus plantarum', 'Lactobacillus rhamnosus', 'Enterococus faecium',
    'Streptococcus thermophillus', 'Bio-MAMPs L. acidophilus'
  ],
  'Saúde oral': [
    'Bifidobacterium bifidum', 'Bifidobacterium breve', 'Lactobacillus acidophilus',
    'Lactobacillus delbrueckii', 'Lactobacillus fermentum', 'Lactobacillus paracasei',
    'Lactobacillus plantarum', 'Lactobacillus reuteri', 'Lactobacillus rhamnosus',
    'Lactobacillus salivarius', 'Streptococcus salivarius', 'Streptococcus thermophillus',
    'Bio-MAMPs L. helveticus'
  ],
  'Saúde respiratória': [
    'Bifidobacterium bifidum', 'Bifidobacterium breve', 'Bifidobacterium longum',
    'Lactobacillus acidophilus', 'Lactobacillus curvatus', 'Lactobacillus delbrueckii',
    'Lactobacillus fermentum', 'Lactobacillus gasseri', 'Lactobacillus helveticus',
    'Lactobacillus paracasei', 'Lactobacillus plantarum', 'Lactobacillus reuteri',
    'Lactobacillus rhamnosus', 'Streptococcus salivarius', 'Streptococcus thermophillus',
    'Sacharomyces boulardii'
  ],
  'Saúde trato gastrointestinal': [
    'Bifidobacterium adolescentis', 'Bifidobacterium bifidum', 'Bifidobacterium breve',
    'Bifidobacterium longum', 'Lactobacillus acidophilus', 'Lactobacillus curvatus',
    'Lactobacillus delbrueckii', 'Lactobacillus fermentum', 'Lactobacillus helveticus',
    'Lactobacillus paracasei', 'Lactobacillus plantarum', 'Lactobacillus rhamnosus',
    'Enterococus faecium', 'Streptococcus thermophillus', 'Sacharomyces boulardii'
  ],
  'Saúde urogenital': [
    'Lactobacillus acidophilus', 'Lactobacillus crispatus', 'Lactobacillus curvatus',
    'Lactobacillus delbrueckii', 'Lactobacillus fermentum', 'Lactobacillus gasseri',
    'Lactobacillus paracasei', 'Lactobacillus plantarum', 'Lactobacillus rhamnosus',
    'Lactobacillus salivarius', 'Streptococcus thermophillus', 'Sacharomyces boulardii',
    'Bio-MAMPs L. acidophilus'
  ],
  'Síndrome de Cushing': [
    'Bifidobacterium lactis', 'Lactobacillus helveticus', 'Lactobacillus plantarum'
  ],
  'Síndrome de intestino permeável': [
    'Bifidobacterium breve', 'Lactobacillus casei', 'Lactobacillus plantarum'
  ],
  'Síndrome de má absorção': [
    'Bifidobacterium infantis', 'Bifidobacterium longum', 'Lactobacillus helveticus',
    'Sacharomyces boulardii'
  ],
  'Síndrome de Marfan': [
    'Bifidobacterium infantis', 'Lactobacillus casei', 'Lactobacillus helveticus'
  ],
  'Síndrome de Sjögren': [
    'Bifidobacterium lactis', 'Lactobacillus casei', 'Lactobacillus reuteri'
  ],
  'Síndrome do cólon irritável': [
    'Bacillus coagulans (L.sporogenes)', 'Bifidobacterium animalis (sub.B.lactis)',
    'Bifidobacterium infantis', 'Bifidobacterium lactis', 'Bifidobacterium longum',
    'Lactobacillus fermentum', 'Lactobacillus gasseri', 'Lactobacillus helveticus',
    'Lactobacillus paracasei', 'Lactobacillus plantarum', 'Lactobacillus rhamnosus',
    'Streptococcus thermophillus', 'Sacharomyces boulardii', 'Bio-MAMPs B. lactis'
  ],
  'Síndrome do intestino curto': [
    'Bifidobacterium longum', 'Lactobacillus acidophilus', 'Sacharomyces boulardii'
  ],
  'Síndrome do ovário policístico (SOP)': [
    'Bifidobacterium breve', 'Lactobacillus acidophilus', 'Lactobacillus helveticus'
  ],
  'Síndrome pré-menstrual (TPM)': [
    'Bifidobacterium bifidum', 'Lactobacillus acidophilus', 'Lactobacillus delbrueckii'
  ],
  'Uretrite': [
    'Bifidobacterium bifidum', 'Lactobacillus acidophilus', 'Lactobacillus paracasei'
  ],
  'Vaginose': [
    'Bifidobacterium longum', 'Lactobacillus acidophilus', 'Lactobacillus crispatus',
    'Lactobacillus curvatus', 'Lactobacillus delbrueckii', 'Lactobacillus fermentum',
    'Lactobacillus gasseri', 'Lactobacillus paracasei', 'Lactobacillus plantarum',
    'Lactobacillus rhamnosus', 'Lactobacillus salivarius'
  ],
  'Vasculite': [
    'Bifidobacterium lactis', 'Lactobacillus helveticus', 'Lactobacillus plantarum'
  ]
};

// Diretrizes gerais para uso de probióticos (definir antes de usar)
const PROBIOTIC_GUIDELINES = {
  dosage: 'Dosagem típica: 1-10 bilhões UFC/dia para adultos. Pode variar conforme a cepa e condição.',
  timing: 'Melhor absorção: 30 minutos antes das refeições ou 2 horas após. Algumas cepas específicas com as refeições.',
  duration: 'Mínimo 30 dias. Condições crônicas: 3-6 meses ou conforme orientação profissional.',
  storage: 'Armazenar em local fresco e seco. Algumas cepas requerem refrigeração.',
  contraindications: 'Cautela em pacientes imunocomprometidos, com cateteres centrais ou válvulas cardíacas.',
  interactions: 'Separar antibióticos em 2-3 horas. Probióticos devem ser continuados durante antibioticoterapia.',
  selection: 'Escolher cepas específicas para cada condição. Preferir produtos com CFU garantido até validade.'
};

// Funções auxiliares
function getProbioticsForPathology(pathology) {
  const strains = PATHOLOGY_TO_PROBIOTICS[pathology] || [];
  return strains.map(strain => PROBIOTIC_STRAINS[strain]).filter(Boolean);
}

function getProbioticsForMultiplePathologies(pathologies) {
  const allStrains = new Set();
  const strainScores = {};

  pathologies.forEach(pathology => {
    const strains = PATHOLOGY_TO_PROBIOTICS[pathology] || [];
    strains.forEach(strain => {
      allStrains.add(strain);
      strainScores[strain] = (strainScores[strain] || 0) + 1;
    });
  });

  // Ordenar por frequência (mais indicadas primeiro)
  const sortedStrains = Array.from(allStrains).sort((a, b) => {
    return (strainScores[b] || 0) - (strainScores[a] || 0);
  });

  return {
    strains: sortedStrains.map(strain => ({
      ...PROBIOTIC_STRAINS[strain],
      score: strainScores[strain]
    })).filter(Boolean),
    scores: strainScores
  };
}

// Lista de todas as patologias disponíveis (criar depois de PATHOLOGY_TO_PROBIOTICS)
const ALL_PATHOLOGIES = Object.keys(PATHOLOGY_TO_PROBIOTICS).sort();

// Exportar todas as constantes e funções
export {
  PROBIOTIC_STRAINS,
  PATHOLOGY_TO_PROBIOTICS,
  ALL_PATHOLOGIES,
  PROBIOTIC_GUIDELINES,
  getProbioticsForPathology,
  getProbioticsForMultiplePathologies
};
