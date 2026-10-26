// Base de dados de Fitoterápicos por Sintomas/Doenças

export const FITOTERAPICOS_DATA = [
  {
    id: 1,
    sintoma: "Abaixa A Pressão",
    nomeCientifico: "Lippia alba (Mill.) N.E.Br. ex Britton & P.Wilson",
    familia: "Verbenaceae",
    nomePopular: "Erva Cidreira",
    formaUso: "Decocto",
    parteUsada: "Folha",
    posologia: {
      homem: "1 a 3 gramas de folhas secas",
      mulher: "1 a 3 gramas de folhas secas",
      crianca: "0,5 a 1,5 gramas de folhas secas"
    },
    contraIndicacoes: ["Lactantes", "Hipotensão", "Pacientes com doenças autoimunes", "Gestantes"]
  },
  {
    id: 2,
    sintoma: "Abscesso",
    nomeCientifico: "Rosa alba L.",
    familia: "Malvaceae",
    nomePopular: "Rosa Branca / Rosa Menina",
    formaUso: "Chá",
    parteUsada: "Flor",
    posologia: {
      homem: "2-4 g de Rosa alba L. por dia",
      mulher: "2-4 g de Rosa alba L. por dia",
      crianca: "1-2 g de Rosa alba L. por dia"
    },
    contraIndicacoes: ["Lactantes", "Hipertensos", "Pacientes com doenças autoimunes", "Gestantes"]
  },
  {
    id: 3,
    sintoma: "Abscesso",
    nomeCientifico: "Solanum cernum Vell.",
    familia: "Solanaceae",
    nomePopular: "Panaceia",
    formaUso: "Chá / Xarope",
    parteUsada: "Folha",
    posologia: {
      homem: "300 mg/dia",
      mulher: "300 mg/dia",
      crianca: "150 mg/dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hipertensos", "Pacientes com doenças autoimunes"]
  },
  {
    id: 4,
    sintoma: "Abscesso",
    nomeCientifico: "Cajanus cajan (L.) Huth",
    familia: "Fabaceae",
    nomePopular: "Feijão Guando / Andu",
    formaUso: "Chá / Gargarejo",
    parteUsada: "Folha / Flor",
    posologia: {
      homem: "500 mg, duas vezes ao dia",
      mulher: "500 mg, duas vezes ao dia",
      crianca: "250 mg, duas vezes ao dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hipertensos", "Pacientes com alergia a leguminosas", "Gestantes"]
  },
  {
    id: 5,
    sintoma: "Abscesso",
    nomeCientifico: "Jatropha gossypiifolia L.",
    familia: "Euphorbiaceae",
    nomePopular: "Pião Roxo / Pinhão Roxo",
    formaUso: "Banho / Chá / Folha / Garrafada",
    parteUsada: "Folha",
    posologia: {
      homem: "1-6 g",
      mulher: "1-1 g",
      crianca: "0,5 g"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hipertensos", "Pacientes com doenças hepáticas", "Crianças", "Gestantes"]
  },
  {
    id: 6,
    sintoma: "Abscesso",
    nomeCientifico: "Laurus nobilis L.",
    familia: "Lauraceae",
    nomePopular: "Abacate / Abacateiro",
    formaUso: "Banho / Chá / Emplastro / Folha / Garrafada / In Natura / Macerado / Tintura",
    parteUsada: "Folha / Fruto / Semente",
    posologia: {
      homem: "1 a 3 gramas de folhas secas de Laurus nobilis L. por dia",
      mulher: "1 a 3 gramas de folhas secas de Laurus nobilis L. por dia",
      crianca: "0,5 a 1,5 gramas de folhas secas de Laurus nobilis L. por dia"
    },
    contraIndicacoes: ["Lactantes", "Hipertensos", "Pacientes com úlceras gástricas", "Gestantes"]
  },
  {
    id: 7,
    sintoma: "Abscesso",
    nomeCientifico: "Malva sylvestris L.",
    familia: "Malvaceae",
    nomePopular: "Malva",
    formaUso: "Chá",
    parteUsada: "Folha",
    posologia: {
      homem: "5 g de folhas secas por dia",
      mulher: "5 g de folhas secas por dia",
      crianca: "2,5 g de folhas secas por dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Crianças", "Pacientes com obstrução intestinal"]
  },
  {
    id: 8,
    sintoma: "Abscesso",
    nomeCientifico: "Petiveria alliacea L.",
    familia: "Phytolaccaceae",
    nomePopular: "Guiné",
    formaUso: "Banho / Cataplasma / Garrafada / In Natura / Macerado",
    parteUsada: "Folha",
    posologia: {
      homem: "500 mg, 2 vezes ao dia",
      mulher: "500 mg, 2 vezes ao dia",
      crianca: "250 mg, 2 vezes ao dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hipertensos", "Pacientes com doenças autoimunes"]
  },
  {
    id: 9,
    sintoma: "Abscesso",
    nomeCientifico: "Rosmarinus officinalis L.",
    familia: "Lamiaceae",
    nomePopular: "Alecrim / Alecrim Do Jardim",
    formaUso: "Banho / Chá / Emplastro / Folha / Infusão / Pó / Tintura / Uso Tópico / Óleo",
    parteUsada: "Folha / Óleo / Flor",
    posologia: {
      homem: "2 a 4 g de folhas secas por dia",
      mulher: "2 a 4 g de folhas secas por dia",
      crianca: "1 a 2 g de folhas secas por dia"
    },
    contraIndicacoes: ["Hipertensos", "Epilépticos", "Lactantes", "Gestantes"]
  },
  {
    id: 10,
    sintoma: "Abscesso",
    nomeCientifico: "Ruta graveolens L.",
    familia: "Rutaceae",
    nomePopular: "Arruda / Arruda Fedorenta",
    formaUso: "Aplicado / Banho / Chá / Compressa / Emplastro / Folha / Infusão / Macerado / Sumo / Tintura",
    parteUsada: "Planta Toda",
    posologia: {
      homem: "2 a 4 g de folhas secas por dia",
      mulher: "2 a 4 g de folhas secas por dia",
      crianca: "1 a 2 g de folhas secas por dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hipertensos", "Pessoas com alergia a plantas da família Rutaceae"]
  },
  {
    id: 11,
    sintoma: "Abscesso",
    nomeCientifico: "Uncaria tomentosa (Willd. ex Roem. & Schult.) DC.",
    familia: "Rubiaceae",
    nomePopular: "Unha De Gato",
    formaUso: "Chá / Decocto",
    parteUsada: "Raiz / Casca / Folha",
    posologia: {
      homem: "20-350 mg por dia",
      mulher: "20-350 mg por dia",
      crianca: "10-250 mg por dia"
    },
    contraIndicacoes: ["Lactantes", "Hipotensos", "Pacientes em uso de anticoagulantes"]
  },
  {
    id: 12,
    sintoma: "Ácido Úrico",
    nomeCientifico: "Phyllanthus niruri L.",
    familia: "Phyllanthaceae",
    nomePopular: "Quebra-Pedra",
    formaUso: "Chá",
    parteUsada: "Folha",
    posologia: {
      homem: "2-4 g de planta seca por dia",
      mulher: "2-4 g de planta seca por dia",
      crianca: "1-2 g de planta seca por dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hipotensos", "Pacientes com cálculos renais grandes"]
  },
  {
    id: 13,
    sintoma: "Ácido Úrico",
    nomeCientifico: "Sambucus nigra L.",
    familia: "Adoxaceae",
    nomePopular: "Sabugueiro",
    formaUso: "Chá / Xarope",
    parteUsada: "Flor",
    posologia: {
      homem: "3-5 g de flores secas por dia",
      mulher: "3-5 g de flores secas por dia",
      crianca: "1,5-2,5 g de flores secas por dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Diabéticos (frutos)", "Crianças menores de 2 anos"]
  },
  {
    id: 14,
    sintoma: "Ácido Úrico",
    nomeCientifico: "Taraxacum officinale F.H.Wigg.",
    familia: "Asteraceae",
    nomePopular: "Dente-de-Leão",
    formaUso: "Chá / Salada / Tintura",
    parteUsada: "Folha / Raiz",
    posologia: {
      homem: "4-10 g de folhas secas por dia",
      mulher: "4-10 g de folhas secas por dia",
      crianca: "2-5 g de folhas secas por dia"
    },
    contraIndicacoes: ["Obstrução biliar", "Úlcera péptica", "Alergia a Asteraceae"]
  },
  {
    id: 15,
    sintoma: "Aftas / Feridas",
    nomeCientifico: "Punica granatum L.",
    familia: "Lythraceae",
    nomePopular: "Romã",
    formaUso: "Gargarejo / Chá",
    parteUsada: "Casca do fruto",
    posologia: {
      homem: "2-3 g de casca seca por dia",
      mulher: "2-3 g de casca seca por dia",
      crianca: "1-1,5 g de casca seca por dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Uso prolongado"]
  },
  {
    id: 16,
    sintoma: "Aftas / Feridas",
    nomeCientifico: "Calendula officinalis L.",
    familia: "Asteraceae",
    nomePopular: "Calêndula",
    formaUso: "Chá / Tintura / Pomada",
    parteUsada: "Flor",
    posologia: {
      homem: "1-2 g de flores secas por dia",
      mulher: "1-2 g de flores secas por dia",
      crianca: "0,5-1 g de flores secas por dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Alergia a Asteraceae"]
  },
  {
    id: 17,
    sintoma: "Aids e HIV",
    nomeCientifico: "Uncaria tomentosa (Willd. ex Roem. & Schult.) DC.",
    familia: "Rubiaceae",
    nomePopular: "Unha De Gato",
    formaUso: "Cápsula / Chá",
    parteUsada: "Casca",
    posologia: {
      homem: "300-500 mg por dia",
      mulher: "300-500 mg por dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Crianças", "Transplantados", "Doenças autoimunes"]
  },
  {
    id: 18,
    sintoma: "Alergia",
    nomeCientifico: "Urtica dioica L.",
    familia: "Urticaceae",
    nomePopular: "Urtiga",
    formaUso: "Chá / Cápsula",
    parteUsada: "Folha",
    posologia: {
      homem: "300-600 mg, 2-3 vezes ao dia",
      mulher: "300-600 mg, 2-3 vezes ao dia",
      crianca: "150-300 mg, 2 vezes ao dia"
    },
    contraIndicacoes: ["Gestantes (primeiro trimestre)", "Hipotensão severa"]
  },
  {
    id: 19,
    sintoma: "Alergia",
    nomeCientifico: "Matricaria chamomilla L.",
    familia: "Asteraceae",
    nomePopular: "Camomila",
    formaUso: "Chá / Inalação",
    parteUsada: "Flor",
    posologia: {
      homem: "2-8 g de flores secas por dia",
      mulher: "2-8 g de flores secas por dia",
      crianca: "1-4 g de flores secas por dia"
    },
    contraIndicacoes: ["Alergia a Asteraceae", "Uso com anticoagulantes"]
  },
  {
    id: 20,
    sintoma: "Amigdalite",
    nomeCientifico: "Salvia officinalis L.",
    familia: "Lamiaceae",
    nomePopular: "Sálvia",
    formaUso: "Gargarejo / Chá",
    parteUsada: "Folha",
    posologia: {
      homem: "2-4 g de folhas secas por dia",
      mulher: "2-4 g de folhas secas por dia",
      crianca: "1-2 g de folhas secas por dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Epilepsia", "Hipertensão"]
  },
  {
    id: 21,
    sintoma: "Amigdalite",
    nomeCientifico: "Eucalyptus globulus Labill.",
    familia: "Myrtaceae",
    nomePopular: "Eucalipto",
    formaUso: "Inalação / Gargarejo",
    parteUsada: "Folha / Óleo",
    posologia: {
      homem: "3-6 g de folhas por dia (chá)",
      mulher: "3-6 g de folhas por dia (chá)",
      crianca: "1,5-3 g de folhas por dia (chá)"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Crianças menores de 2 anos", "Asma grave"]
  },
  {
    id: 22,
    sintoma: "Anemia",
    nomeCientifico: "Urtica dioica L.",
    familia: "Urticaceae",
    nomePopular: "Urtiga",
    formaUso: "Chá / Cápsula / Sopa",
    parteUsada: "Folha",
    posologia: {
      homem: "4-10 g de folhas secas por dia",
      mulher: "4-10 g de folhas secas por dia",
      crianca: "2-5 g de folhas secas por dia"
    },
    contraIndicacoes: ["Gestantes (primeiro trimestre)", "Hipotensão severa", "Edema por insuficiência cardíaca"]
  },
  {
    id: 23,
    sintoma: "Anemia",
    nomeCientifico: "Taraxacum officinale F.H.Wigg.",
    familia: "Asteraceae",
    nomePopular: "Dente-de-Leão",
    formaUso: "Chá / Salada",
    parteUsada: "Folha / Raiz",
    posologia: {
      homem: "4-10 g por dia",
      mulher: "4-10 g por dia",
      crianca: "2-5 g por dia"
    },
    contraIndicacoes: ["Obstrução biliar", "Úlcera péptica", "Alergia a Asteraceae"]
  },
  {
    id: 24,
    sintoma: "Ansiedade",
    nomeCientifico: "Passiflora incarnata L.",
    familia: "Passifloraceae",
    nomePopular: "Maracujá / Passiflora",
    formaUso: "Chá / Tintura / Cápsula",
    parteUsada: "Folha / Flor",
    posologia: {
      homem: "0,5-2 g de planta seca por dia",
      mulher: "0,5-2 g de planta seca por dia",
      crianca: "0,25-1 g de planta seca por dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Uso com sedativos"]
  },
  {
    id: 25,
    sintoma: "Ansiedade",
    nomeCientifico: "Melissa officinalis L.",
    familia: "Lamiaceae",
    nomePopular: "Erva-Cidreira / Melissa",
    formaUso: "Chá / Tintura",
    parteUsada: "Folha",
    posologia: {
      homem: "2-4 g de folhas secas por dia",
      mulher: "2-4 g de folhas secas por dia",
      crianca: "1-2 g de folhas secas por dia"
    },
    contraIndicacoes: ["Hipotireoidismo", "Uso com sedativos"]
  },
  {
    id: 26,
    sintoma: "Ansiedade",
    nomeCientifico: "Valeriana officinalis L.",
    familia: "Caprifoliaceae",
    nomePopular: "Valeriana",
    formaUso: "Chá / Cápsula / Tintura",
    parteUsada: "Raiz",
    posologia: {
      homem: "400-900 mg antes de dormir",
      mulher: "400-900 mg antes de dormir",
      crianca: "200-450 mg antes de dormir"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Uso com álcool ou sedativos", "Cirurgias programadas"]
  },
  {
    id: 27,
    sintoma: "Artrite / Artrose",
    nomeCientifico: "Curcuma longa L.",
    familia: "Zingiberaceae",
    nomePopular: "Açafrão-da-Terra / Cúrcuma",
    formaUso: "Cápsula / Chá / Tempero",
    parteUsada: "Rizoma",
    posologia: {
      homem: "1,5-3 g por dia",
      mulher: "1,5-3 g por dia",
      crianca: "0,5-1,5 g por dia"
    },
    contraIndicacoes: ["Obstrução biliar", "Úlcera gástrica ativa", "Gestantes", "Uso com anticoagulantes"]
  },
  {
    id: 28,
    sintoma: "Artrite / Artrose",
    nomeCientifico: "Zingiber officinale Roscoe",
    familia: "Zingiberaceae",
    nomePopular: "Gengibre",
    formaUso: "Chá / Cápsula / In Natura",
    parteUsada: "Rizoma",
    posologia: {
      homem: "1-3 g por dia",
      mulher: "1-3 g por dia",
      crianca: "0,5-1,5 g por dia"
    },
    contraIndicacoes: ["Úlcera gástrica", "Cálculos biliares", "Uso com anticoagulantes"]
  },
  {
    id: 29,
    sintoma: "Asma / Bronquite",
    nomeCientifico: "Eucalyptus globulus Labill.",
    familia: "Myrtaceae",
    nomePopular: "Eucalipto",
    formaUso: "Inalação / Chá",
    parteUsada: "Folha / Óleo",
    posologia: {
      homem: "3-6 g de folhas por dia",
      mulher: "3-6 g de folhas por dia",
      crianca: "1,5-3 g de folhas por dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Crianças menores de 2 anos", "Asma grave"]
  },
  {
    id: 30,
    sintoma: "Asma / Bronquite",
    nomeCientifico: "Mikania glomerata Spreng.",
    familia: "Asteraceae",
    nomePopular: "Guaco",
    formaUso: "Xarope / Chá / Tintura",
    parteUsada: "Folha",
    posologia: {
      homem: "1-3 g de folhas secas por dia",
      mulher: "1-3 g de folhas secas por dia",
      crianca: "0,5-1,5 g de folhas secas por dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Uso com anticoagulantes", "Hepatopatias"]
  },
  {
    id: 31,
    sintoma: "Cálculo Renal",
    nomeCientifico: "Phyllanthus niruri L.",
    familia: "Phyllanthaceae",
    nomePopular: "Quebra-Pedra",
    formaUso: "Chá / Cápsula",
    parteUsada: "Planta toda",
    posologia: {
      homem: "2-4 g por dia",
      mulher: "2-4 g por dia",
      crianca: "1-2 g por dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hipotensos", "Cálculos muito grandes"]
  },
  {
    id: 32,
    sintoma: "Cálculo Renal",
    nomeCientifico: "Equisetum arvense L.",
    familia: "Equisetaceae",
    nomePopular: "Cavalinha",
    formaUso: "Chá / Cápsula",
    parteUsada: "Parte aérea",
    posologia: {
      homem: "2-6 g por dia",
      mulher: "2-6 g por dia",
      crianca: "1-3 g por dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Insuficiência cardíaca", "Edema"]
  },
  {
    id: 33,
    sintoma: "Câncer",
    nomeCientifico: "Uncaria tomentosa (Willd. ex Roem. & Schult.) DC.",
    familia: "Rubiaceae",
    nomePopular: "Unha De Gato",
    formaUso: "Cápsula / Chá",
    parteUsada: "Casca / Raiz",
    posologia: {
      homem: "20-350 mg por dia",
      mulher: "20-350 mg por dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Transplantados", "Doenças autoimunes", "Crianças"]
  },
  {
    id: 34,
    sintoma: "Câncer",
    nomeCientifico: "Curcuma longa L.",
    familia: "Zingiberaceae",
    nomePopular: "Açafrão / Cúrcuma",
    formaUso: "Cápsula / Tempero",
    parteUsada: "Rizoma",
    posologia: {
      homem: "1,5-3 g por dia",
      mulher: "1,5-3 g por dia",
      crianca: "0,5-1,5 g por dia"
    },
    contraIndicacoes: ["Obstrução biliar", "Úlcera gástrica", "Gestantes", "Uso com anticoagulantes"]
  },
  {
    id: 35,
    sintoma: "Candidíase",
    nomeCientifico: "Allium sativum L.",
    familia: "Amaryllidaceae",
    nomePopular: "Alho",
    formaUso: "In Natura / Cápsula",
    parteUsada: "Bulbo",
    posologia: {
      homem: "2-4 g por dia (1-2 dentes)",
      mulher: "2-4 g por dia (1-2 dentes)",
      crianca: "1-2 g por dia"
    },
    contraIndicacoes: ["Cirurgias programadas", "Uso com anticoagulantes", "Hipotensão"]
  },
  {
    id: 36,
    sintoma: "Candidíase",
    nomeCientifico: "Calendula officinalis L.",
    familia: "Asteraceae",
    nomePopular: "Calêndula",
    formaUso: "Chá / Pomada / Banho de assento",
    parteUsada: "Flor",
    posologia: {
      homem: "1-2 g de flores por dia",
      mulher: "1-2 g de flores por dia",
      crianca: "0,5-1 g de flores por dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Alergia a Asteraceae"]
  },
  {
    id: 37,
    sintoma: "Caspa",
    nomeCientifico: "Rosmarinus officinalis L.",
    familia: "Lamiaceae",
    nomePopular: "Alecrim",
    formaUso: "Chá (enxágue capilar) / Óleo",
    parteUsada: "Folha",
    posologia: {
      homem: "Uso tópico - enxágue 2-3x por semana",
      mulher: "Uso tópico - enxágue 2-3x por semana",
      crianca: "Uso tópico diluído"
    },
    contraIndicacoes: ["Gestantes", "Epilepsia", "Hipertensão (uso interno)"]
  },
  {
    id: 38,
    sintoma: "Caspa",
    nomeCientifico: "Urtica dioica L.",
    familia: "Urticaceae",
    nomePopular: "Urtiga",
    formaUso: "Chá (enxágue) / Loção",
    parteUsada: "Folha",
    posologia: {
      homem: "Uso tópico 2-3x por semana",
      mulher: "Uso tópico 2-3x por semana",
      crianca: "Uso tópico diluído"
    },
    contraIndicacoes: ["Hipotensão severa (uso interno)"]
  },
  {
    id: 39,
    sintoma: "Celulite",
    nomeCientifico: "Centella asiatica (L.) Urban",
    familia: "Apiaceae",
    nomePopular: "Centela Asiática",
    formaUso: "Cápsula / Chá / Creme",
    parteUsada: "Folha",
    posologia: {
      homem: "600 mg, 3x ao dia",
      mulher: "600 mg, 3x ao dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hepatopatias", "Crianças"]
  },
  {
    id: 40,
    sintoma: "Celulite",
    nomeCientifico: "Fucus vesiculosus L.",
    familia: "Fucaceae",
    nomePopular: "Fucus",
    formaUso: "Cápsula / Gel tópico",
    parteUsada: "Talo",
    posologia: {
      homem: "200-600 mg por dia",
      mulher: "200-600 mg por dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Hipertireoidismo", "Gestantes", "Lactantes", "Alergia a iodo"]
  },
  {
    id: 41,
    sintoma: "Cicatrização",
    nomeCientifico: "Calendula officinalis L.",
    familia: "Asteraceae",
    nomePopular: "Calêndula",
    formaUso: "Pomada / Tintura / Compressa",
    parteUsada: "Flor",
    posologia: {
      homem: "Uso tópico 2-3x ao dia",
      mulher: "Uso tópico 2-3x ao dia",
      crianca: "Uso tópico 2-3x ao dia"
    },
    contraIndicacoes: ["Alergia a Asteraceae", "Feridas profundas sem orientação médica"]
  },
  {
    id: 42,
    sintoma: "Cicatrização",
    nomeCientifico: "Aloe vera (L.) Burm.f.",
    familia: "Asphodelaceae",
    nomePopular: "Babosa / Aloe",
    formaUso: "Gel tópico / In Natura",
    parteUsada: "Gel da folha",
    posologia: {
      homem: "Uso tópico 2-4x ao dia",
      mulher: "Uso tópico 2-4x ao dia",
      crianca: "Uso tópico 2-3x ao dia"
    },
    contraIndicacoes: ["Alergia", "Uso interno sem orientação", "Gestantes (uso interno)"]
  },
  {
    id: 43,
    sintoma: "Cistite",
    nomeCientifico: "Vaccinium macrocarpon Aiton",
    familia: "Ericaceae",
    nomePopular: "Cranberry",
    formaUso: "Suco / Cápsula",
    parteUsada: "Fruto",
    posologia: {
      homem: "300-500 mg, 2x ao dia",
      mulher: "300-500 mg, 2x ao dia",
      crianca: "150-250 mg, 2x ao dia"
    },
    contraIndicacoes: ["Cálculos renais de oxalato", "Uso com varfarina"]
  },
  {
    id: 44,
    sintoma: "Cistite",
    nomeCientifico: "Arctostaphylos uva-ursi (L.) Spreng.",
    familia: "Ericaceae",
    nomePopular: "Uva-Ursi",
    formaUso: "Chá / Cápsula",
    parteUsada: "Folha",
    posologia: {
      homem: "400-800 mg, 4x ao dia",
      mulher: "400-800 mg, 4x ao dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Crianças", "Uso prolongado (>1 semana)"]
  },
  {
    id: 45,
    sintoma: "Colesterol Alto",
    nomeCientifico: "Allium sativum L.",
    familia: "Amaryllidaceae",
    nomePopular: "Alho",
    formaUso: "In Natura / Cápsula",
    parteUsada: "Bulbo",
    posologia: {
      homem: "600-1200 mg por dia",
      mulher: "600-1200 mg por dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Cirurgias", "Anticoagulantes", "Hipotensão"]
  },
  {
    id: 46,
    sintoma: "Colesterol Alto",
    nomeCientifico: "Cynara scolymus L.",
    familia: "Asteraceae",
    nomePopular: "Alcachofra",
    formaUso: "Chá / Cápsula",
    parteUsada: "Folha",
    posologia: {
      homem: "300-640 mg, 3x ao dia",
      mulher: "300-640 mg, 3x ao dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Obstrução biliar", "Cálculos biliares", "Alergia a Asteraceae"]
  },
  {
    id: 47,
    sintoma: "Constipação / Prisão de Ventre",
    nomeCientifico: "Psyllium / Plantago ovata Forssk.",
    familia: "Plantaginaceae",
    nomePopular: "Psyllium",
    formaUso: "Pó / Cápsula",
    parteUsada: "Casca da semente",
    posologia: {
      homem: "5-10 g com água, 1-3x ao dia",
      mulher: "5-10 g com água, 1-3x ao dia",
      crianca: "2,5-5 g, 1-2x ao dia"
    },
    contraIndicacoes: ["Obstrução intestinal", "Estenose esofágica", "Ingestão insuficiente de água"]
  },
  {
    id: 48,
    sintoma: "Constipação / Prisão de Ventre",
    nomeCientifico: "Cassia angustifolia Vahl",
    familia: "Fabaceae",
    nomePopular: "Sene",
    formaUso: "Chá / Cápsula",
    parteUsada: "Folha / Fruto",
    posologia: {
      homem: "0,5-2 g antes de dormir",
      mulher: "0,5-2 g antes de dormir",
      crianca: "0,25-1 g antes de dormir (>6 anos)"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Crianças <6 anos", "Uso prolongado", "Obstrução intestinal"]
  },
  {
    id: 49,
    sintoma: "Depressão",
    nomeCientifico: "Hypericum perforatum L.",
    familia: "Hypericaceae",
    nomePopular: "Erva-de-São-João / Hipérico",
    formaUso: "Cápsula / Chá / Tintura",
    parteUsada: "Parte aérea florida",
    posologia: {
      homem: "300 mg, 3x ao dia",
      mulher: "300 mg, 3x ao dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Uso com antidepressivos", "Fotossensibilidade", "Interação com muitos medicamentos"]
  },
  {
    id: 50,
    sintoma: "Depressão",
    nomeCientifico: "Crocus sativus L.",
    familia: "Iridaceae",
    nomePopular: "Açafrão Verdadeiro",
    formaUso: "Chá / Tempero",
    parteUsada: "Estigma",
    posologia: {
      homem: "30 mg por dia",
      mulher: "30 mg por dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Uso com antidepressivos", "Doses altas (>5g) são tóxicas"]
  },
  {
    id: 51,
    sintoma: "Diabetes",
    nomeCientifico: "Bauhinia forficata Link",
    familia: "Fabaceae",
    nomePopular: "Pata-de-Vaca",
    formaUso: "Chá / Cápsula",
    parteUsada: "Folha",
    posologia: {
      homem: "2-3 g de folhas por dia",
      mulher: "2-3 g de folhas por dia",
      crianca: "1-1,5 g de folhas por dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hipoglicemia", "Uso com insulina sem acompanhamento"]
  },
  {
    id: 52,
    sintoma: "Diabetes",
    nomeCientifico: "Momordica charantia L.",
    familia: "Cucurbitaceae",
    nomePopular: "Melão-de-São-Caetano",
    formaUso: "Chá / Suco / Cápsula",
    parteUsada: "Fruto / Folha",
    posologia: {
      homem: "50-100 mL de suco ou 3-6 g de fruto por dia",
      mulher: "50-100 mL de suco ou 3-6 g de fruto por dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hipoglicemia", "Crianças"]
  },
  {
    id: 53,
    sintoma: "Diarreia",
    nomeCientifico: "Psidium guajava L.",
    familia: "Myrtaceae",
    nomePopular: "Goiaba / Goiabeira",
    formaUso: "Chá",
    parteUsada: "Folha",
    posologia: {
      homem: "3-6 g de folhas por dia",
      mulher: "3-6 g de folhas por dia",
      crianca: "1,5-3 g de folhas por dia"
    },
    contraIndicacoes: ["Constipação", "Uso prolongado"]
  },
  {
    id: 54,
    sintoma: "Diarreia",
    nomeCientifico: "Punica granatum L.",
    familia: "Lythraceae",
    nomePopular: "Romã",
    formaUso: "Chá",
    parteUsada: "Casca",
    posologia: {
      homem: "2-3 g de casca por dia",
      mulher: "2-3 g de casca por dia",
      crianca: "1-1,5 g de casca por dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Constipação", "Uso prolongado"]
  },
  {
    id: 55,
    sintoma: "Dor de Cabeça / Enxaqueca",
    nomeCientifico: "Tanacetum parthenium (L.) Sch.Bip.",
    familia: "Asteraceae",
    nomePopular: "Tanaceto / Feverfew",
    formaUso: "Cápsula / Chá",
    parteUsada: "Folha",
    posologia: {
      homem: "50-150 mg por dia",
      mulher: "50-150 mg por dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Alergia a Asteraceae", "Uso com anticoagulantes"]
  },
  {
    id: 56,
    sintoma: "Dor de Cabeça / Enxaqueca",
    nomeCientifico: "Mentha x piperita L.",
    familia: "Lamiaceae",
    nomePopular: "Hortelã-Pimenta",
    formaUso: "Óleo essencial (tópico) / Chá",
    parteUsada: "Folha / Óleo",
    posologia: {
      homem: "Óleo tópico nas têmporas ou 1,5-3 g de folhas em chá",
      mulher: "Óleo tópico nas têmporas ou 1,5-3 g de folhas em chá",
      crianca: "Chá leve, óleo diluído (>6 anos)"
    },
    contraIndicacoes: ["Refluxo gastroesofágico", "Cálculos biliares", "Crianças <6 anos (óleo)"]
  },
  {
    id: 57,
    sintoma: "Dor Muscular",
    nomeCientifico: "Arnica montana L.",
    familia: "Asteraceae",
    nomePopular: "Arnica",
    formaUso: "Gel / Pomada / Tintura (uso tópico)",
    parteUsada: "Flor",
    posologia: {
      homem: "Uso tópico 2-3x ao dia",
      mulher: "Uso tópico 2-3x ao dia",
      crianca: "Uso tópico 2-3x ao dia (>3 anos)"
    },
    contraIndicacoes: ["Feridas abertas", "Alergia a Asteraceae", "Uso interno sem orientação"]
  },
  {
    id: 58,
    sintoma: "Eczema / Dermatite",
    nomeCientifico: "Calendula officinalis L.",
    familia: "Asteraceae",
    nomePopular: "Calêndula",
    formaUso: "Pomada / Creme / Compressa",
    parteUsada: "Flor",
    posologia: {
      homem: "Uso tópico 2-3x ao dia",
      mulher: "Uso tópico 2-3x ao dia",
      crianca: "Uso tópico 2-3x ao dia"
    },
    contraIndicacoes: ["Alergia a Asteraceae"]
  },
  {
    id: 59,
    sintoma: "Eczema / Dermatite",
    nomeCientifico: "Avena sativa L.",
    familia: "Poaceae",
    nomePopular: "Aveia",
    formaUso: "Banho / Creme",
    parteUsada: "Grão / Farinha coloidal",
    posologia: {
      homem: "Banho com aveia coloidal 2-3x por semana",
      mulher: "Banho com aveia coloidal 2-3x por semana",
      crianca: "Banho com aveia coloidal 2-3x por semana"
    },
    contraIndicacoes: ["Alergia a cereais", "Doença celíaca (evitar ingestão)"]
  },
  {
    id: 60,
    sintoma: "Estresse",
    nomeCientifico: "Withania somnifera (L.) Dunal",
    familia: "Solanaceae",
    nomePopular: "Ashwagandha",
    formaUso: "Cápsula / Pó",
    parteUsada: "Raiz",
    posologia: {
      homem: "300-500 mg, 2x ao dia",
      mulher: "300-500 mg, 2x ao dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hipertireoidismo", "Doenças autoimunes"]
  },
  {
    id: 61,
    sintoma: "Estresse",
    nomeCientifico: "Rhodiola rosea L.",
    familia: "Crassulaceae",
    nomePopular: "Rhodiola / Raiz Dourada",
    formaUso: "Cápsula / Chá",
    parteUsada: "Raiz",
    posologia: {
      homem: "200-600 mg por dia",
      mulher: "200-600 mg por dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Transtorno bipolar", "Uso com estimulantes"]
  },
  {
    id: 62,
    sintoma: "Fadiga",
    nomeCientifico: "Panax ginseng C.A.Mey.",
    familia: "Araliaceae",
    nomePopular: "Ginseng Coreano",
    formaUso: "Cápsula / Chá",
    parteUsada: "Raiz",
    posologia: {
      homem: "200-400 mg por dia",
      mulher: "200-400 mg por dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hipertensão", "Insônia", "Crianças"]
  },
  {
    id: 63,
    sintoma: "Fadiga",
    nomeCientifico: "Eleutherococcus senticosus (Rupr. & Maxim.) Maxim.",
    familia: "Araliaceae",
    nomePopular: "Ginseng Siberiano",
    formaUso: "Cápsula / Tintura",
    parteUsada: "Raiz",
    posologia: {
      homem: "300-400 mg, 2-3x ao dia",
      mulher: "300-400 mg, 2-3x ao dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hipertensão", "Doenças autoimunes"]
  },
  {
    id: 64,
    sintoma: "Gases / Flatulência",
    nomeCientifico: "Pimpinella anisum L.",
    familia: "Apiaceae",
    nomePopular: "Erva-Doce / Anis",
    formaUso: "Chá",
    parteUsada: "Semente",
    posologia: {
      homem: "1-5 g de sementes por dia",
      mulher: "1-5 g de sementes por dia",
      crianca: "0,5-2,5 g de sementes por dia"
    },
    contraIndicacoes: ["Alergia a Apiaceae", "Uso excessivo"]
  },
  {
    id: 65,
    sintoma: "Gases / Flatulência",
    nomeCientifico: "Foeniculum vulgare Mill.",
    familia: "Apiaceae",
    nomePopular: "Funcho",
    formaUso: "Chá",
    parteUsada: "Semente",
    posologia: {
      homem: "1-5 g de sementes por dia",
      mulher: "1-5 g de sementes por dia",
      crianca: "0,5-2,5 g de sementes por dia"
    },
    contraIndicacoes: ["Alergia a Apiaceae", "Gravidez em altas doses"]
  },
  {
    id: 66,
    sintoma: "Gastrite",
    nomeCientifico: "Glycyrrhiza glabra L.",
    familia: "Fabaceae",
    nomePopular: "Alcaçuz",
    formaUso: "Chá / Cápsula / Extrato",
    parteUsada: "Raiz",
    posologia: {
      homem: "1,5-3 g por dia",
      mulher: "1,5-3 g por dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Hipertensão", "Gravidez", "Hipocalemia", "Insuficiência renal", "Uso prolongado"]
  },
  {
    id: 67,
    sintoma: "Gastrite",
    nomeCientifico: "Matricaria chamomilla L.",
    familia: "Asteraceae",
    nomePopular: "Camomila",
    formaUso: "Chá",
    parteUsada: "Flor",
    posologia: {
      homem: "2-8 g de flores por dia",
      mulher: "2-8 g de flores por dia",
      crianca: "1-4 g de flores por dia"
    },
    contraIndicacoes: ["Alergia a Asteraceae", "Uso com anticoagulantes"]
  },
  {
    id: 68,
    sintoma: "Gota",
    nomeCientifico: "Taraxacum officinale F.H.Wigg.",
    familia: "Asteraceae",
    nomePopular: "Dente-de-Leão",
    formaUso: "Chá / Salada",
    parteUsada: "Folha / Raiz",
    posologia: {
      homem: "4-10 g por dia",
      mulher: "4-10 g por dia",
      crianca: "2-5 g por dia"
    },
    contraIndicacoes: ["Obstrução biliar", "Úlcera péptica", "Alergia a Asteraceae"]
  },
  {
    id: 69,
    sintoma: "Gripe / Resfriado",
    nomeCientifico: "Sambucus nigra L.",
    familia: "Adoxaceae",
    nomePopular: "Sabugueiro",
    formaUso: "Xarope / Chá",
    parteUsada: "Flor / Fruto",
    posologia: {
      homem: "3-5 g de flores ou 15 mL de xarope, 3-4x ao dia",
      mulher: "3-5 g de flores ou 15 mL de xarope, 3-4x ao dia",
      crianca: "1,5-2,5 g de flores ou 7,5 mL de xarope, 3x ao dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Frutos crus (tóxicos)", "Crianças <2 anos"]
  },
  {
    id: 70,
    sintoma: "Gripe / Resfriado",
    nomeCientifico: "Echinacea purpurea (L.) Moench",
    familia: "Asteraceae",
    nomePopular: "Equinácea",
    formaUso: "Cápsula / Chá / Tintura",
    parteUsada: "Raiz / Parte aérea",
    posologia: {
      homem: "300 mg, 3x ao dia (até 10 dias)",
      mulher: "300 mg, 3x ao dia (até 10 dias)",
      crianca: "150 mg, 2-3x ao dia"
    },
    contraIndicacoes: ["Doenças autoimunes", "Alergia a Asteraceae", "Uso prolongado"]
  },
  {
    id: 71,
    sintoma: "Hemorroidas",
    nomeCientifico: "Hamamelis virginiana L.",
    familia: "Hamamelidaceae",
    nomePopular: "Hamamélis",
    formaUso: "Pomada / Compressa / Banho de assento",
    parteUsada: "Folha / Casca",
    posologia: {
      homem: "Uso tópico 2-3x ao dia",
      mulher: "Uso tópico 2-3x ao dia",
      crianca: "Uso tópico 1-2x ao dia"
    },
    contraIndicacoes: ["Alergia", "Uso interno sem orientação"]
  },
  {
    id: 72,
    sintoma: "Herpes",
    nomeCientifico: "Melissa officinalis L.",
    familia: "Lamiaceae",
    nomePopular: "Melissa / Erva-Cidreira",
    formaUso: "Pomada / Creme / Chá",
    parteUsada: "Folha",
    posologia: {
      homem: "Uso tópico 4-5x ao dia ou 2-4 g em chá",
      mulher: "Uso tópico 4-5x ao dia ou 2-4 g em chá",
      crianca: "Uso tópico 3-4x ao dia ou 1-2 g em chá"
    },
    contraIndicacoes: ["Hipotireoidismo", "Uso com sedativos"]
  },
  {
    id: 73,
    sintoma: "Hipertensão",
    nomeCientifico: "Hibiscus sabdariffa L.",
    familia: "Malvaceae",
    nomePopular: "Hibisco",
    formaUso: "Chá / Infusão",
    parteUsada: "Cálice",
    posologia: {
      homem: "1,5-3 g em infusão, 2-3x ao dia",
      mulher: "1,5-3 g em infusão, 2-3x ao dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Hipotensão", "Gestantes", "Uso com anti-hipertensivos sem acompanhamento"]
  },
  {
    id: 74,
    sintoma: "Hipertensão",
    nomeCientifico: "Allium sativum L.",
    familia: "Amaryllidaceae",
    nomePopular: "Alho",
    formaUso: "In Natura / Cápsula",
    parteUsada: "Bulbo",
    posologia: {
      homem: "600-1200 mg por dia",
      mulher: "600-1200 mg por dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Hipotensão", "Cirurgias", "Anticoagulantes"]
  },
  {
    id: 75,
    sintoma: "Impotência / Disfunção Erétil",
    nomeCientifico: "Paullinia cupana Kunth",
    familia: "Sapindaceae",
    nomePopular: "Guaraná",
    formaUso: "Pó / Cápsula",
    parteUsada: "Semente",
    posologia: {
      homem: "50-200 mg por dia",
      mulher: "Não aplicável",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Hipertensão", "Insônia", "Ansiedade", "Arritmias"]
  },
  {
    id: 76,
    sintoma: "Impotência / Disfunção Erétil",
    nomeCientifico: "Turnera diffusa Willd. ex Schult.",
    familia: "Passifloraceae",
    nomePopular: "Damiana",
    formaUso: "Chá / Cápsula / Tintura",
    parteUsada: "Folha",
    posologia: {
      homem: "2-4 g por dia",
      mulher: "2-4 g por dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Diabetes", "Gestantes", "Lactantes"]
  },
  {
    id: 77,
    sintoma: "Infecção Urinária",
    nomeCientifico: "Vaccinium macrocarpon Aiton",
    familia: "Ericaceae",
    nomePopular: "Cranberry",
    formaUso: "Suco / Cápsula",
    parteUsada: "Fruto",
    posologia: {
      homem: "300-500 mg, 2x ao dia",
      mulher: "300-500 mg, 2x ao dia",
      crianca: "150-250 mg, 2x ao dia"
    },
    contraIndicacoes: ["Cálculos renais de oxalato", "Uso com varfarina"]
  },
  {
    id: 78,
    sintoma: "Inflamação",
    nomeCientifico: "Curcuma longa L.",
    familia: "Zingiberaceae",
    nomePopular: "Cúrcuma / Açafrão",
    formaUso: "Cápsula / Tempero",
    parteUsada: "Rizoma",
    posologia: {
      homem: "1,5-3 g por dia",
      mulher: "1,5-3 g por dia",
      crianca: "0,5-1,5 g por dia"
    },
    contraIndicacoes: ["Obstrução biliar", "Úlcera gástrica", "Gestantes", "Anticoagulantes"]
  },
  {
    id: 79,
    sintoma: "Inflamação",
    nomeCientifico: "Zingiber officinale Roscoe",
    familia: "Zingiberaceae",
    nomePopular: "Gengibre",
    formaUso: "Chá / Cápsula / In Natura",
    parteUsada: "Rizoma",
    posologia: {
      homem: "1-3 g por dia",
      mulher: "1-3 g por dia",
      crianca: "0,5-1,5 g por dia"
    },
    contraIndicacoes: ["Úlcera gástrica", "Cálculos biliares", "Anticoagulantes"]
  },
  {
    id: 80,
    sintoma: "Insônia",
    nomeCientifico: "Valeriana officinalis L.",
    familia: "Caprifoliaceae",
    nomePopular: "Valeriana",
    formaUso: "Chá / Cápsula / Tintura",
    parteUsada: "Raiz",
    posologia: {
      homem: "400-900 mg antes de dormir",
      mulher: "400-900 mg antes de dormir",
      crianca: "200-450 mg antes de dormir"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Álcool", "Sedativos", "Cirurgias"]
  },
  {
    id: 81,
    sintoma: "Insônia",
    nomeCientifico: "Passiflora incarnata L.",
    familia: "Passifloraceae",
    nomePopular: "Maracujá / Passiflora",
    formaUso: "Chá / Cápsula / Tintura",
    parteUsada: "Folha",
    posologia: {
      homem: "0,5-2 g antes de dormir",
      mulher: "0,5-2 g antes de dormir",
      crianca: "0,25-1 g antes de dormir"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Uso com sedativos"]
  },
  {
    id: 82,
    sintoma: "Menopausa",
    nomeCientifico: "Cimicifuga racemosa (L.) Nutt.",
    familia: "Ranunculaceae",
    nomePopular: "Black Cohosh",
    formaUso: "Cápsula / Tintura",
    parteUsada: "Rizoma",
    posologia: {
      homem: "Não aplicável",
      mulher: "40-80 mg, 2x ao dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Hepatopatias", "Histórico de câncer hormônio-dependente"]
  },
  {
    id: 83,
    sintoma: "Menopausa",
    nomeCientifico: "Glycine max (L.) Merr.",
    familia: "Fabaceae",
    nomePopular: "Soja (Isoflavonas)",
    formaUso: "Cápsula / Alimento",
    parteUsada: "Grão",
    posologia: {
      homem: "Não aplicável",
      mulher: "40-80 mg de isoflavonas por dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Histórico de câncer de mama", "Hipotireoidismo não controlado"]
  },
  {
    id: 84,
    sintoma: "Náusea / Enjoo",
    nomeCientifico: "Zingiber officinale Roscoe",
    familia: "Zingiberaceae",
    nomePopular: "Gengibre",
    formaUso: "Chá / Cápsula / In Natura",
    parteUsada: "Rizoma",
    posologia: {
      homem: "1-2 g por dia",
      mulher: "1-2 g por dia (gestantes: máx 1g)",
      crianca: "0,5-1 g por dia"
    },
    contraIndicacoes: ["Úlcera gástrica", "Cálculos biliares", "Anticoagulantes"]
  },
  {
    id: 85,
    sintoma: "Náusea / Enjoo",
    nomeCientifico: "Mentha x piperita L.",
    familia: "Lamiaceae",
    nomePopular: "Hortelã-Pimenta",
    formaUso: "Chá / Óleo essencial (inalação)",
    parteUsada: "Folha",
    posologia: {
      homem: "1,5-3 g de folhas em chá",
      mulher: "1,5-3 g de folhas em chá",
      crianca: "0,75-1,5 g de folhas em chá"
    },
    contraIndicacoes: ["Refluxo", "Cálculos biliares", "Crianças <6 anos (óleo)"]
  },
  {
    id: 86,
    sintoma: "Obesidade / Perda de Peso",
    nomeCientifico: "Camellia sinensis (L.) Kuntze",
    familia: "Theaceae",
    nomePopular: "Chá Verde",
    formaUso: "Chá / Cápsula",
    parteUsada: "Folha",
    posologia: {
      homem: "250-500 mg de extrato, 2-3x ao dia",
      mulher: "250-500 mg de extrato, 2-3x ao dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Insônia", "Ansiedade", "Hepatopatias"]
  },
  {
    id: 87,
    sintoma: "Obesidade / Perda de Peso",
    nomeCientifico: "Garcinia cambogia (Gaertn.) Desr.",
    familia: "Clusiaceae",
    nomePopular: "Garcinia",
    formaUso: "Cápsula",
    parteUsada: "Casca do fruto",
    posologia: {
      homem: "500-1500 mg, 30-60 min antes das refeições",
      mulher: "500-1500 mg, 30-60 min antes das refeições",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Diabetes", "Alzheimer", "Hepatopatias"]
  },
  {
    id: 88,
    sintoma: "Osteoporose",
    nomeCientifico: "Equisetum arvense L.",
    familia: "Equisetaceae",
    nomePopular: "Cavalinha",
    formaUso: "Chá / Cápsula",
    parteUsada: "Parte aérea",
    posologia: {
      homem: "2-6 g por dia",
      mulher: "2-6 g por dia",
      crianca: "1-3 g por dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Insuficiência cardíaca", "Edema"]
  },
  {
    id: 89,
    sintoma: "Próstata (HPB)",
    nomeCientifico: "Serenoa repens (W.Bartram) Small",
    familia: "Arecaceae",
    nomePopular: "Saw Palmetto",
    formaUso: "Cápsula",
    parteUsada: "Fruto",
    posologia: {
      homem: "160 mg, 2x ao dia",
      mulher: "Não aplicável",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Cirurgias", "Distúrbios hemorrágicos", "Uso com anticoagulantes"]
  },
  {
    id: 90,
    sintoma: "Psoríase",
    nomeCientifico: "Curcuma longa L.",
    familia: "Zingiberaceae",
    nomePopular: "Cúrcuma",
    formaUso: "Cápsula / Tópico",
    parteUsada: "Rizoma",
    posologia: {
      homem: "1,5-3 g por dia (oral) ou uso tópico",
      mulher: "1,5-3 g por dia (oral) ou uso tópico",
      crianca: "0,5-1,5 g por dia"
    },
    contraIndicacoes: ["Obstrução biliar", "Úlcera gástrica", "Gestantes", "Anticoagulantes"]
  },
  {
    id: 91,
    sintoma: "Queimaduras",
    nomeCientifico: "Aloe vera (L.) Burm.f.",
    familia: "Asphodelaceae",
    nomePopular: "Babosa",
    formaUso: "Gel tópico",
    parteUsada: "Gel da folha",
    posologia: {
      homem: "Uso tópico 3-4x ao dia",
      mulher: "Uso tópico 3-4x ao dia",
      crianca: "Uso tópico 2-3x ao dia"
    },
    contraIndicacoes: ["Alergia", "Queimaduras de 3º grau sem orientação", "Uso interno sem orientação"]
  },
  {
    id: 92,
    sintoma: "Reumatismo",
    nomeCientifico: "Harpagophytum procumbens (Burch.) DC. ex Meisn.",
    familia: "Pedaliaceae",
    nomePopular: "Garra-do-Diabo",
    formaUso: "Cápsula / Chá",
    parteUsada: "Raiz",
    posologia: {
      homem: "600-2400 mg por dia",
      mulher: "600-2400 mg por dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Úlcera gástrica", "Gestantes", "Lactantes", "Cálculos biliares"]
  },
  {
    id: 93,
    sintoma: "Sinusite",
    nomeCientifico: "Eucalyptus globulus Labill.",
    familia: "Myrtaceae",
    nomePopular: "Eucalipto",
    formaUso: "Inalação / Chá",
    parteUsada: "Folha / Óleo",
    posologia: {
      homem: "Inalação 2-3x ao dia ou 3-6 g de folhas em chá",
      mulher: "Inalação 2-3x ao dia ou 3-6 g de folhas em chá",
      crianca: "Inalação diluída ou 1,5-3 g de folhas em chá"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Crianças <2 anos", "Asma grave"]
  },
  {
    id: 94,
    sintoma: "Sinusite",
    nomeCientifico: "Zingiber officinale Roscoe",
    familia: "Zingiberaceae",
    nomePopular: "Gengibre",
    formaUso: "Chá / Inalação",
    parteUsada: "Rizoma",
    posologia: {
      homem: "1-3 g por dia",
      mulher: "1-3 g por dia",
      crianca: "0,5-1,5 g por dia"
    },
    contraIndicacoes: ["Úlcera gástrica", "Cálculos biliares", "Anticoagulantes"]
  },
  {
    id: 95,
    sintoma: "TPM",
    nomeCientifico: "Vitex agnus-castus L.",
    familia: "Lamiaceae",
    nomePopular: "Agnus Castus / Vitex",
    formaUso: "Cápsula / Tintura",
    parteUsada: "Fruto",
    posologia: {
      homem: "Não aplicável",
      mulher: "20-40 mg por dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Uso com anticoncepcionais", "Histórico de câncer hormônio-dependente"]
  },
  {
    id: 96,
    sintoma: "Tosse",
    nomeCientifico: "Mikania glomerata Spreng.",
    familia: "Asteraceae",
    nomePopular: "Guaco",
    formaUso: "Xarope / Chá / Tintura",
    parteUsada: "Folha",
    posologia: {
      homem: "1-3 g de folhas por dia ou 5-10 mL de xarope, 3x ao dia",
      mulher: "1-3 g de folhas por dia ou 5-10 mL de xarope, 3x ao dia",
      crianca: "0,5-1,5 g de folhas por dia ou 2,5-5 mL de xarope, 3x ao dia"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Anticoagulantes", "Hepatopatias"]
  },
  {
    id: 97,
    sintoma: "Tosse",
    nomeCientifico: "Glycyrrhiza glabra L.",
    familia: "Fabaceae",
    nomePopular: "Alcaçuz",
    formaUso: "Chá / Xarope",
    parteUsada: "Raiz",
    posologia: {
      homem: "1,5-3 g por dia",
      mulher: "1,5-3 g por dia",
      crianca: "0,75-1,5 g por dia"
    },
    contraIndicacoes: ["Hipertensão", "Gravidez", "Hipocalemia", "Insuficiência renal", "Uso prolongado"]
  },
  {
    id: 98,
    sintoma: "Varizes",
    nomeCientifico: "Aesculus hippocastanum L.",
    familia: "Sapindaceae",
    nomePopular: "Castanha-da-Índia",
    formaUso: "Cápsula / Gel tópico",
    parteUsada: "Semente",
    posologia: {
      homem: "300 mg, 2x ao dia",
      mulher: "300 mg, 2x ao dia",
      crianca: "Não recomendado"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Insuficiência renal/hepática", "Distúrbios de coagulação"]
  },
  {
    id: 99,
    sintoma: "Vermes / Parasitas",
    nomeCientifico: "Chenopodium ambrosioides L.",
    familia: "Amaranthaceae",
    nomePopular: "Erva-de-Santa-Maria",
    formaUso: "Chá / Óleo (com cautela)",
    parteUsada: "Folha / Semente",
    posologia: {
      homem: "1-2 g de folhas em chá por dia (máx 3 dias)",
      mulher: "1-2 g de folhas em chá por dia (máx 3 dias)",
      crianca: "0,5-1 g de folhas em chá por dia (>5 anos, máx 3 dias)"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Crianças <5 anos", "Uso prolongado", "Óleo essencial (tóxico em doses altas)"]
  },
  {
    id: 100,
    sintoma: "Vermes / Parasitas",
    nomeCientifico: "Allium sativum L.",
    familia: "Amaryllidaceae",
    nomePopular: "Alho",
    formaUso: "In Natura / Cápsula",
    parteUsada: "Bulbo",
    posologia: {
      homem: "2-4 g por dia",
      mulher: "2-4 g por dia",
      crianca: "1-2 g por dia"
    },
    contraIndicacoes: ["Cirurgias", "Anticoagulantes", "Hipotensão"]
  },
  {
    id: 101,
    sintoma: "Acne",
    nomeCientifico: "Arctium lappa L.",
    familia: "Asteraceae",
    nomePopular: "Bardana",
    formaUso: "Chá / Decocção / Extrato / Tintura",
    parteUsada: "Raiz",
    posologia: {
      homem: "2-6 g de raiz seca em chá, 3x/dia",
      mulher: "2-6 g de raiz seca em chá, 3x/dia",
      crianca: "1-3 g de raiz seca em chá, 2x/dia (>6 anos)"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hipersensibilidade", "Diabetes (monitorar glicemia)"]
  },
  {
    id: 102,
    sintoma: "Bronquite",
    nomeCientifico: "Mikania glomerata Spreng.",
    familia: "Asteraceae",
    nomePopular: "Guaco",
    formaUso: "Chá / Xarope / Tintura",
    parteUsada: "Folha",
    posologia: {
      homem: "1,5-6 g de folhas secas em chá, 3x/dia",
      mulher: "1,5-6 g de folhas secas em chá, 3x/dia",
      crianca: "0,5-2 g de folhas secas em chá, 2x/dia (>2 anos)"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Anticoagulantes (cumarina)"]
  },
  {
    id: 103,
    sintoma: "Cólica Abdominal",
    nomeCientifico: "Mentha x piperita L.",
    familia: "Lamiaceae",
    nomePopular: "Hortelã-pimenta",
    formaUso: "Chá / Óleo Essencial (diluído)",
    parteUsada: "Folha",
    posologia: {
      homem: "1,5-3 g de folhas secas em chá, 3x/dia",
      mulher: "1,5-3 g de folhas secas em chá, 3x/dia",
      crianca: "0,5-1 g de folhas secas em chá, 2x/dia (>3 anos)"
    },
    contraIndicacoes: ["Refluxo gastroesofágico", "Obstrução biliar", "Cálculos biliares", "Lactentes"]
  },
  {
    id: 104,
    sintoma: "Dengue (Sintomas)",
    nomeCientifico: "Carica papaya L.",
    familia: "Caricaceae",
    nomePopular: "Mamão (Folha)",
    formaUso: "Suco / Chá",
    parteUsada: "Folha",
    posologia: {
      homem: "50-100 mL de suco de folhas frescas, 2x/dia",
      mulher: "50-100 mL de suco de folhas frescas, 2x/dia",
      crianca: "25-50 mL de suco de folhas frescas, 2x/dia (>5 anos)"
    },
    contraIndicacoes: ["Gestantes", "Uso prolongado"]
  },
  {
    id: 105,
    sintoma: "Desintoxicação Hepática",
    nomeCientifico: "Silybum marianum (L.) Gaertn.",
    familia: "Asteraceae",
    nomePopular: "Cardo-mariano",
    formaUso: "Cápsula / Extrato / Chá",
    parteUsada: "Semente / Fruto",
    posologia: {
      homem: "200-400 mg de silimarina, 2-3x/dia",
      mulher: "200-400 mg de silimarina, 2-3x/dia",
      crianca: "Não recomendado (<12 anos)"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Alergia a Asteraceae"]
  },
  {
    id: 106,
    sintoma: "Diarreia",
    nomeCientifico: "Psidium guajava L.",
    familia: "Myrtaceae",
    nomePopular: "Goiabeira",
    formaUso: "Chá / Decocção",
    parteUsada: "Folha",
    posologia: {
      homem: "3-6 g de folhas secas em chá, 3x/dia",
      mulher: "3-6 g de folhas secas em chá, 3x/dia",
      crianca: "1-3 g de folhas secas em chá, 2x/dia (>2 anos)"
    },
    contraIndicacoes: ["Constipação crônica", "Uso prolongado"]
  },
  {
    id: 107,
    sintoma: "Edema / Retenção de Líquidos",
    nomeCientifico: "Equisetum arvense L.",
    familia: "Equisetaceae",
    nomePopular: "Cavalinha",
    formaUso: "Chá / Cápsula",
    parteUsada: "Parte aérea estéril",
    posologia: {
      homem: "2-6 g de planta seca em chá, 3x/dia",
      mulher: "2-6 g de planta seca em chá, 3x/dia",
      crianca: "Não recomendado (<12 anos)"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Cardiopatias", "Hipertensão", "Uso prolongado (>6 semanas)"]
  },
  {
    id: 108,
    sintoma: "Enxaqueca",
    nomeCientifico: "Tanacetum parthenium (L.) Sch. Bip.",
    familia: "Asteraceae",
    nomePopular: "Artemísia / Feverfew",
    formaUso: "Cápsula / Chá",
    parteUsada: "Folha / Parte aérea",
    posologia: {
      homem: "50-150 mg de extrato seco por dia",
      mulher: "50-150 mg de extrato seco por dia",
      crianca: "Não recomendado (<18 anos)"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Alergia a Asteraceae", "Anticoagulantes"]
  },
  {
    id: 109,
    sintoma: "Feridas",
    nomeCientifico: "Calendula officinalis L.",
    familia: "Asteraceae",
    nomePopular: "Calêndula",
    formaUso: "Pomada / Creme / Cataplasma",
    parteUsada: "Flor",
    posologia: {
      homem: "Aplicar topicamente 2-3x/dia",
      mulher: "Aplicar topicamente 2-3x/dia",
      crianca: "Aplicar topicamente 2x/dia"
    },
    contraIndicacoes: ["Alergia a Asteraceae", "Feridas infectadas profundas"]
  },
  {
    id: 110,
    sintoma: "Flatulência / Gases",
    nomeCientifico: "Foeniculum vulgare Mill.",
    familia: "Apiaceae",
    nomePopular: "Funcho / Erva-doce",
    formaUso: "Chá / Infusão",
    parteUsada: "Semente / Fruto",
    posologia: {
      homem: "1-2 g de sementes em chá, 3x/dia",
      mulher: "1-2 g de sementes em chá, 3x/dia",
      crianca: "0,5-1 g de sementes em chá, 2x/dia"
    },
    contraIndicacoes: ["Gestantes (doses altas)", "Hipersensibilidade"]
  },
  {
    id: 111,
    sintoma: "Gonorreia",
    nomeCientifico: "Hydrastis canadensis L.",
    familia: "Ranunculaceae",
    nomePopular: "Hidraste / Goldenseal",
    formaUso: "Cápsula / Extrato / Tintura",
    parteUsada: "Raiz / Rizoma",
    posologia: {
      homem: "250-500 mg de extrato, 3x/dia",
      mulher: "250-500 mg de extrato, 3x/dia",
      crianca: "Não recomendado (<12 anos)"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hipertensão", "Diabetes", "Uso prolongado"]
  },
  {
    id: 112,
    sintoma: "Hepatite",
    nomeCientifico: "Phyllanthus niruri L.",
    familia: "Phyllanthaceae",
    nomePopular: "Quebra-pedra",
    formaUso: "Chá / Cápsula / Extrato",
    parteUsada: "Planta inteira",
    posologia: {
      homem: "2-3 g de planta seca em chá, 3x/dia",
      mulher: "2-3 g de planta seca em chá, 3x/dia",
      crianca: "1-2 g de planta seca em chá, 2x/dia (>6 anos)"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hipotensão"]
  },
  {
    id: 113,
    sintoma: "Hipercolesterolemia",
    nomeCientifico: "Cynara scolymus L.",
    familia: "Asteraceae",
    nomePopular: "Alcachofra",
    formaUso: "Chá / Cápsula / Extrato",
    parteUsada: "Folha",
    posologia: {
      homem: "320-640 mg de extrato, 3x/dia",
      mulher: "320-640 mg de extrato, 3x/dia",
      crianca: "Não recomendado (<12 anos)"
    },
    contraIndicacoes: ["Obstrução biliar", "Cálculos biliares", "Alergia a Asteraceae"]
  },
  {
    id: 114,
    sintoma: "Hipotireoidismo",
    nomeCientifico: "Fucus vesiculosus L.",
    familia: "Fucaceae",
    nomePopular: "Fucus / Alga-parda",
    formaUso: "Cápsula / Extrato",
    parteUsada: "Talo",
    posologia: {
      homem: "200-600 mg de extrato por dia",
      mulher: "200-600 mg de extrato por dia",
      crianca: "Não recomendado (<18 anos)"
    },
    contraIndicacoes: ["Hipertireoidismo", "Gestantes", "Lactantes", "Cardiopatias", "Hipertensão"]
  },
  {
    id: 115,
    sintoma: "Infecção Urinária",
    nomeCientifico: "Vaccinium macrocarpon Aiton",
    familia: "Ericaceae",
    nomePopular: "Cranberry",
    formaUso: "Suco / Cápsula",
    parteUsada: "Fruto",
    posologia: {
      homem: "300-500 mL de suco puro por dia OU 400-800 mg de extrato, 2x/dia",
      mulher: "300-500 mL de suco puro por dia OU 400-800 mg de extrato, 2x/dia",
      crianca: "100-200 mL de suco por dia (>2 anos)"
    },
    contraIndicacoes: ["Cálculos renais de oxalato", "Uso prolongado em altas doses"]
  },
  {
    id: 116,
    sintoma: "Labirintite / Vertigem",
    nomeCientifico: "Ginkgo biloba L.",
    familia: "Ginkgoaceae",
    nomePopular: "Ginkgo",
    formaUso: "Cápsula / Extrato",
    parteUsada: "Folha",
    posologia: {
      homem: "120-240 mg de extrato padronizado por dia",
      mulher: "120-240 mg de extrato padronizado por dia",
      crianca: "Não recomendado (<12 anos)"
    },
    contraIndicacoes: ["Anticoagulantes", "Cirurgias", "Distúrbios de coagulação"]
  },
  {
    id: 117,
    sintoma: "Má Digestão / Dispepsia",
    nomeCientifico: "Zingiber officinale Roscoe",
    familia: "Zingiberaceae",
    nomePopular: "Gengibre",
    formaUso: "Chá / In Natura / Cápsula",
    parteUsada: "Rizoma",
    posologia: {
      homem: "1-2 g de rizoma seco em chá, 3x/dia",
      mulher: "1-2 g de rizoma seco em chá, 3x/dia (máx 1 g/dia durante gestação)",
      crianca: "0,5-1 g de rizoma seco em chá, 2x/dia (>6 anos)"
    },
    contraIndicacoes: ["Cálculos biliares", "Anticoagulantes (doses altas)", "Cirurgias"]
  },
  {
    id: 118,
    sintoma: "Manchas na Pele",
    nomeCientifico: "Curcuma longa L.",
    familia: "Zingiberaceae",
    nomePopular: "Cúrcuma / Açafrão-da-terra",
    formaUso: "Cápsula / Extrato / Uso Tópico",
    parteUsada: "Rizoma",
    posologia: {
      homem: "400-600 mg de extrato, 3x/dia OU aplicar pasta tópica",
      mulher: "400-600 mg de extrato, 3x/dia OU aplicar pasta tópica",
      crianca: "100-200 mg de extrato, 2x/dia (>6 anos)"
    },
    contraIndicacoes: ["Obstrução biliar", "Cálculos biliares", "Gestantes (doses altas)"]
  },
  {
    id: 119,
    sintoma: "Pedras nos Rins",
    nomeCientifico: "Phyllanthus niruri L.",
    familia: "Phyllanthaceae",
    nomePopular: "Quebra-pedra",
    formaUso: "Chá / Cápsula",
    parteUsada: "Planta inteira",
    posologia: {
      homem: "2-3 g de planta seca em chá, 3x/dia",
      mulher: "2-3 g de planta seca em chá, 3x/dia",
      crianca: "1-2 g de planta seca em chá, 2x/dia (>6 anos)"
    },
    contraIndicacoes: ["Gestantes", "Lactantes", "Hipotensão"]
  },
  {
    id: 120,
    sintoma: "Pressão Alta",
    nomeCientifico: "Hibiscus sabdariffa L.",
    familia: "Malvaceae",
    nomePopular: "Hibisco",
    formaUso: "Chá / Infusão",
    parteUsada: "Cálice floral",
    posologia: {
      homem: "1,5-3 g de cálices secos em chá, 2-3x/dia",
      mulher: "1,5-3 g de cálices secos em chá, 2-3x/dia",
      crianca: "Não recomendado (<12 anos)"
    },
    contraIndicacoes: ["Hipotensão", "Gestantes", "Uso com anti-hipertensivos (monitorar)"]
  },
  {
    id: 121,
    sintoma: "Resfriado",
    nomeCientifico: "Echinacea purpurea (L.) Moench",
    familia: "Asteraceae",
    nomePopular: "Equinácea",
    formaUso: "Chá / Cápsula / Tintura",
    parteUsada: "Raiz / Parte aérea",
    posologia: {
      homem: "300-500 mg de extrato, 3x/dia (máx 8 semanas)",
      mulher: "300-500 mg de extrato, 3x/dia (máx 8 semanas)",
      crianca: "150-250 mg de extrato, 2x/dia (>2 anos, máx 8 semanas)"
    },
    contraIndicacoes: ["Doenças autoimunes", "Alergia a Asteraceae", "HIV/AIDS", "Tuberculose"]
  },
  {
    id: 122,
    sintoma: "Rinite Alérgica",
    nomeCientifico: "Petasites hybridus (L.) G. Gaertn., B. Mey. & Scherb.",
    familia: "Asteraceae",
    nomePopular: "Butterbur / Petasites",
    formaUso: "Cápsula / Extrato",
    parteUsada: "Raiz / Rizoma",
    posologia: {
      homem: "50-75 mg de extrato, 2x/dia",
      mulher: "50-75 mg de extrato, 2x/dia",
      crianca: "Não recomendado (<12 anos)"
    },
    contraIndicacoes: ["Hepatotoxicidade (usar apenas extratos livres de alcaloides pirrolizidínicos)", "Gestantes", "Lactantes"]
  },
  {
    id: 123,
    sintoma: "Tireoidite",
    nomeCientifico: "Melissa officinalis L.",
    familia: "Lamiaceae",
    nomePopular: "Melissa / Erva-cidreira",
    formaUso: "Chá / Extrato / Tintura",
    parteUsada: "Folha",
    posologia: {
      homem: "1,5-4,5 g de folhas secas em chá, 3x/dia",
      mulher: "1,5-4,5 g de folhas secas em chá, 3x/dia",
      crianca: "0,5-2 g de folhas secas em chá, 2x/dia (>3 anos)"
    },
    contraIndicacoes: ["Hipotireoidismo", "Uso prolongado em doses altas"]
  },
  {
    id: 124,
    sintoma: "Úlcera Gástrica",
    nomeCientifico: "Glycyrrhiza glabra L.",
    familia: "Fabaceae",
    nomePopular: "Alcaçuz",
    formaUso: "Chá / Extrato / Cápsula",
    parteUsada: "Raiz",
    posologia: {
      homem: "200-600 mg de extrato, 3x/dia (máx 6 semanas)",
      mulher: "200-600 mg de extrato, 3x/dia (máx 6 semanas)",
      crianca: "Não recomendado (<12 anos)"
    },
    contraIndicacoes: ["Hipertensão", "Gestantes", "Lactantes", "Cardiopatias", "Hipocalemia", "Uso prolongado"]
  },
  {
    id: 125,
    sintoma: "Vitiligo",
    nomeCientifico: "Psoralea corylifolia L.",
    familia: "Fabaceae",
    nomePopular: "Babchi",
    formaUso: "Extrato / Óleo (uso tópico)",
    parteUsada: "Semente",
    posologia: {
      homem: "Aplicar óleo diluído nas áreas afetadas 1-2x/dia",
      mulher: "Aplicar óleo diluído nas áreas afetadas 1-2x/dia",
      crianca: "Não recomendado (<12 anos)"
    },
    contraIndicacoes: ["Fotossensibilidade", "Exposição solar direta após aplicação", "Gestantes", "Lactantes"]
  }
];

// Função para obter todos os sintomas únicos
export const getSintomas = () => {
  const sintomasUnicos = [...new Set(FITOTERAPICOS_DATA.map(item => item.sintoma))];
  return sintomasUnicos.sort();
};

// Função para obter fitoterápicos por sintoma
export const getFitoterapicosPorSintoma = (sintoma) => {
  return FITOTERAPICOS_DATA.filter(item => item.sintoma === sintoma);
};

// Função para buscar fitoterápicos por termo
export const buscarFitoterapicos = (termo) => {
  if (!termo) return FITOTERAPICOS_DATA;
  
  const termoLower = termo.toLowerCase();
  return FITOTERAPICOS_DATA.filter(item => 
    item.sintoma.toLowerCase().includes(termoLower) ||
    item.nomeCientifico.toLowerCase().includes(termoLower) ||
    item.nomePopular.toLowerCase().includes(termoLower) ||
    item.familia.toLowerCase().includes(termoLower)
  );
};
