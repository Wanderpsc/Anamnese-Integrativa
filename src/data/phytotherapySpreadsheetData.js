/**
 * Base de dados completa de plantas medicinais da planilha
 * Organizado por Sintoma/Doença com todas as informações detalhadas
 * ATUALIZADO: Incluindo plantas da planilha fornecida
 */

export const PHYTOTHERAPY_SPREADSHEET_DATA = {
  "Abaixa A Pressão": [
    {
      scientificName: "Lippia alba (Mill.) N.E.Br. ex Britton & P.Wilson",
      family: "Verbenaceae",
      commonName: "Erva Cidreira",
      usageForm: "Decocto",
      partUsed: "Folha",
      dosage: {
        men: "1 a 3 gramas de folhas secas",
        women: "1 a 3 gramas de folhas secas",
        children: "0,5 a 1,5 gramas de folhas secas"
      },
      contraindications: [
        "Gestantes",
        "Lactantes",
        "Hipotensos",
        "Pacientes com doenças autoimunes"
      ]
    }
  ],
  
  "Abscesso": [
    {
      scientificName: "Rosa alba L.",
      family: "Malvaceae",
      commonName: "Rosa Branca / Rosa Menina",
      usageForm: "Chá",
      partUsed: "Flor",
      dosage: {
        men: "2-4 g por dia",
        women: "2-4 g por dia",
        children: "1-2 g por dia"
      },
      contraindications: [
        "Gestantes",
        "Lactantes",
        "Hipertensos",
        "Pacientes com doenças autoimunes"
      ]
    },
    {
      scientificName: "Rosmarinus officinalis L.",
      family: "Lamiaceae",
      commonName: "Alecrim",
      usageForm: "Chá / Infusão / Óleo",
      partUsed: "Folha / Óleo / Flor",
      dosage: {
        men: "2 a 4 g de folhas secas por dia",
        women: "2 a 4 g de folhas secas por dia",
        children: "1 a 2 g de folhas secas por dia"
      },
      contraindications: [
        "Hipertensão",
        "Grávidas",
        "Lactantes"
      ]
    },
    {
      scientificName: "Uncaria tomentosa (Willd. ex Roem. & Schult.) DC.",
      family: "Rubiaceae",
      commonName: "Unha De Gato",
      usageForm: "Chá / Decocto",
      partUsed: "Raiz / Casca / Folha",
      dosage: {
        men: "20-350 mg por dia",
        women: "20-350 mg por dia",
        children: "10-250 mg por dia"
      },
      contraindications: [
        "Gestantes",
        "Lactantes",
        "Hipotensos",
        "Pacientes em uso de anticoagulantes"
      ]
    }
  ],
  
  "Infecção Urinária": [
    {
      scientificName: "Phyllanthus niruri L.",
      family: "Euphorbiaceae",
      commonName: "Quebra Pedra",
      usageForm: "Chá",
      partUsed: "Folha",
      dosage: {
        men: "450 mg, 3 vezes ao dia",
        women: "450 mg, 3 vezes ao dia",
        children: "225 mg, 3 vezes ao dia"
      },
      contraindications: [
        "Gestantes",
        "Lactantes",
        "Hipotensos",
        "Pacientes com doenças autoimunes",
        "Pacientes em uso de anticoagulantes"
      ]
    },
    {
      scientificName: "Costus spicatus (Jacq.) Sw.",
      family: "Costaceae",
      commonName: "Cana Do Brejo",
      usageForm: "Chá / Decocto",
      partUsed: "Caule / Flor / Folha / Raiz",
      dosage: {
        men: "2 g de folhas secas por dia",
        women: "2 g de folhas secas por dia",
        children: "1 g de folhas secas por dia"
      },
      contraindications: [
        "Gestantes",
        "Lactantes",
        "Hipertensos",
        "Pacientes com doenças hepáticas"
      ]
    }
  ]
};

/**
 * Busca plantas por sintoma/doença
 */
export function getPlantsBySymptom(symptom) {
  return PHYTOTHERAPY_SPREADSHEET_DATA[symptom] || [];
}

/**
 * Obtém todos os sintomas/doenças disponíveis
 */
export function getAllSymptoms() {
  return Object.keys(PHYTOTHERAPY_SPREADSHEET_DATA).sort();
}

/**
 * Busca plantas por nome científico ou popular
 */
export function searchPlants(query) {
  const results = [];
  const lowerQuery = query.toLowerCase();
  
  Object.entries(PHYTOTHERAPY_SPREADSHEET_DATA).forEach(([symptom, plants]) => {
    plants.forEach(plant => {
      if (
        plant.scientificName.toLowerCase().includes(lowerQuery) ||
        plant.commonName.toLowerCase().includes(lowerQuery) ||
        symptom.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          ...plant,
          indication: symptom
        });
      }
    });
  });
  
  return results;
}

/**
 * Converte dados da planilha para formato de protocolo
 */
export function convertSpreadsheetToProtocol(symptom) {
  const plants = getPlantsBySymptom(symptom);
  if (plants.length === 0) return null;
  
  return {
    name: symptom,
    category: 'Fitoterapia da Planilha',
    indications: [symptom],
    protocol: plants.map(plant => ({
      plant: `${plant.commonName} (${plant.scientificName})`,
      partUsed: plant.partUsed,
      dosage: typeof plant.dosage === 'object' ? 
        `Homem: ${plant.dosage.men}, Mulher: ${plant.dosage.women}, Criança: ${plant.dosage.children}` : 
        plant.dosage,
      posology: plant.usageForm,
      duration: 'Conforme orientação profissional',
      properties: `Família: ${plant.family}`,
      evidenceLevel: 'Uso Tradicional',
      drugInteractions: plant.contraindications.includes('Pacientes em uso de anticoagulantes') ? 
        'Atenção com anticoagulantes' : '',
      plantInteractions: ''
    })),
    contraindications: plants.reduce((acc, plant) => {
      return [...acc, ...plant.contraindications];
    }, []).filter((v, i, a) => a.indexOf(v) === i), // Remove duplicatas
    interactions: [],
    observations: `Protocolo baseado em ${plants.length} planta(s) medicinal(is) da planilha de referência.`
  };
}
