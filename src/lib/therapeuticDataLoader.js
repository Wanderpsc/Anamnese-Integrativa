/**
 * Sistema de Carregamento Dinâmico de Dados Terapêuticos
 * 
 * Este módulo carrega automaticamente todos os arquivos da pasta therapeutic-data
 * e integra suas informações nas sugestões terapêuticas geradas para os pacientes.
 */

import { searchTherapeuticPdfEvidence, getTherapeuticKnowledgeMeta } from './pdfTherapeuticKnowledge';

const CONDITION_EVIDENCE_TERMS = {
  intestino_preso: ['constipação', 'intestino', 'flora intestinal', 'probióticos'],
  diarreia: ['diarreia', 'microbiota', 'probióticos', 'intestino'],
  dores_de_cabeca: ['enxaqueca', 'dor de cabeça', 'inflamação', 'estresse'],
  figado_sobrecarregado: ['fígado', 'detox', 'desintoxicação', 'hepático'],
  ansiedade: ['ansiedade', 'estresse', 'floral', 'sistema nervoso'],
  insonia: ['insônia', 'sono', 'sistema nervoso', 'cortisol'],
  hipertensao: ['pressão', 'cardiovascular', 'estresse'],
  diabetes_prediabetes: ['diabetes', 'glicose', 'resistência insulínica'],
  gordura_figado: ['esteatose', 'fígado', 'metabolismo'],
  obesidade: ['obesidade', 'metabolismo', 'emagrecimento'],
  candidiase: ['candidíase', 'intestino', 'imunidade'],
  gastrite: ['gastrite', 'estômago', 'digestão'],
  refluxo: ['refluxo', 'esôfago', 'digestão'],
  intestino_irritavel: ['síndrome do intestino irritável', 'microbiota', 'digestão'],
  imunidade_baixa: ['imunidade', 'inflamação', 'microbioma'],
  fadiga: ['fadiga', 'adrenal', 'cortisol', 'energia'],
  depressao: ['depressão', 'humor', 'sistema nervoso'],
  menopausa: ['menopausa', 'hormônios', 'saúde feminina'],
  tireoide: ['tireoide', 'hormônios', 'metabolismo'],
  iridologia: ['iridologia', 'íris', 'rayid', 'gerson', 'lindomar', 'felipe', 'maria rocha', 'luciana caxito', 'lair ribeiro', 'floral', 'biorressonância']
};

function collectPdfEvidenceByCondition(condition) {
  const terms = CONDITION_EVIDENCE_TERMS[condition] || [condition.replaceAll('_', ' ')];
  return searchTherapeuticPdfEvidence(terms, 8);
}

// Função para importar todos os arquivos .txt da pasta therapeutic-data
function importAllTextFiles() {
  if (typeof require === 'undefined' || typeof require.context !== 'function') {
    return {};
  }

  const context = require.context(
    '../assets/therapeutic-data',
    false,
    /\.txt$/
  );
  
  const files = {};
  context.keys().forEach((key) => {
    const fileName = key.replace('./', '');
    try {
      files[fileName] = context(key);
    } catch (error) {
      console.warn(`Erro ao carregar arquivo ${fileName}:`, error);
    }
  });
  
  return files;
}

// Função para carregar imagens (mapas iridológicos, carimbo, etc)
function importAllImages() {
  if (typeof require === 'undefined' || typeof require.context !== 'function') {
    return {};
  }

  const context = require.context(
    '../assets/therapeutic-data',
    false,
    /\.(jpg|jpeg|png)$/i
  );
  
  const images = {};
  context.keys().forEach((key) => {
    const fileName = key.replace('./', '');
    try {
      images[fileName] = context(key);
    } catch (error) {
      console.warn(`Erro ao carregar imagem ${fileName}:`, error);
    }
  });
  
  return images;
}

// Parser para extrair informações estruturadas de arquivos de texto
export function parseTherapeuticFile(content, fileName) {
  const result = {
    fileName,
    title: '',
    composition: [],
    dosage: '',
    contraindications: '',
    usage: '',
    rawContent: content
  };

  // Detectar tipo de conteúdo baseado no nome do arquivo
  if (fileName.toLowerCase().includes('diabetes')) {
    result.condition = 'diabetes_prediabetes';
  } else if (fileName.toLowerCase().includes('homeopat')) {
    result.type = 'homeopathy';
  }

  // Extrair composição
  const compositionMatch = content.match(/Composição[:\s]+([\s\S]*?)(?=Posologia|$)/i);
  if (compositionMatch) {
    result.composition = compositionMatch[1]
      .split(/[;\n]/)
      .map(item => item.trim())
      .filter(item => item && item.length > 2);
  }

  // Extrair posologia
  const dosageMatch = content.match(/Posologia[:\s]+([\s\S]*?)(?=Contraindicação|Contra-indicação|$)/i);
  if (dosageMatch) {
    result.dosage = dosageMatch[1].trim();
  }

  // Extrair contraindicações
  const contraindicationMatch = content.match(/Contra[i-]?ndicação[:\s]+([\s\S]*?)$/i);
  if (contraindicationMatch) {
    result.contraindications = contraindicationMatch[1].trim();
  }

  return result;
}

// Função para enriquecer sugestões terapêuticas com dados dos arquivos
export function enrichSuggestionsWithFiles(condition, basesuggestions) {
  const loadedFiles = loadTherapeuticData();
  const enrichedSuggestions = { ...basesuggestions };

  // Procurar arquivos relacionados à condição
  const relatedFiles = loadedFiles.filter(file => 
    file.condition === condition || 
    file.rawContent.toLowerCase().includes(condition.replace('_', ' '))
  );

  // Adicionar informações dos arquivos
  relatedFiles.forEach(file => {
    if (file.type === 'homeopathy' && file.composition.length > 0) {
      if (!enrichedSuggestions.homeopathy) {
        enrichedSuggestions.homeopathy = [];
      }
      
      // Adicionar fórmula homeopática encontrada
      const formula = `${file.fileName.replace('.txt', '')} - ${file.dosage || 'Conforme orientação'}`;
      enrichedSuggestions.homeopathy.push(formula);
      
      // Adicionar composição
      file.composition.forEach(comp => {
        if (!enrichedSuggestions.homeopathy.includes(comp)) {
          enrichedSuggestions.homeopathy.push(comp);
        }
      });
    }

    // Adicionar contraindicações se disponíveis
    if (file.contraindications && !enrichedSuggestions.contraindications) {
      enrichedSuggestions.contraindications = file.contraindications;
    }
  });

  const pdfEvidence = collectPdfEvidenceByCondition(condition);
  const filesEvidence = relatedFiles.map((file) => ({
    sourceType: 'txt',
    fileName: file.fileName,
    excerpt: (file.rawContent || '').slice(0, 600)
  }));

  const combined = [...filesEvidence, ...pdfEvidence.map((item) => ({
    sourceType: 'pdf',
    fileName: item.fileName,
    relativePath: item.relativePath,
    tags: item.tags,
    excerpt: item.excerpt,
    matchScore: item.matchScore,
    textExtracted: item.textExtracted
  }))];

  enrichedSuggestions.sourceFiles = combined;
  enrichedSuggestions.knowledgeBase = getTherapeuticKnowledgeMeta();

  return enrichedSuggestions;
}

// Cache para evitar recarregar arquivos múltiplas vezes
let therapeuticDataCache = null;

// Função principal que carrega e processa todos os dados terapêuticos
export function loadTherapeuticData() {
  // Retornar cache se já carregado
  if (therapeuticDataCache) {
    return therapeuticDataCache;
  }

  try {
    const textFiles = importAllTextFiles();
    const processedData = [];

    Object.entries(textFiles).forEach(([fileName, content]) => {
      // Para arquivos .txt que podem ser lidos diretamente
      if (typeof content === 'string') {
        const parsed = parseTherapeuticFile(content, fileName);
        processedData.push(parsed);
      } else if (content.default) {
        // Para imports que retornam objeto com .default
        const parsed = parseTherapeuticFile(content.default, fileName);
        processedData.push(parsed);
      }
    });

    therapeuticDataCache = processedData;
    console.log(`✅ Carregados ${processedData.length} arquivos terapêuticos`);
    
    return processedData;
  } catch (error) {
    console.warn('⚠️ Erro ao carregar dados terapêuticos:', error);
    return [];
  }
}

// Função para obter mapas iridológicos
export function getIridologyMaps() {
  try {
    const images = importAllImages();
    return {
      leftEye: images['MAPA OLHO ESQUERDO.jpg'] || images['RAYID ESQUERDO.jpg'],
      rightEye: images['MAPA OLHO DIREITO.jpg'] || images['REYD DIREITO.jpg'],
      stamp: images['CARIMBO NATUROPATIA.jpg'],
      logo: images['SÍMBOLO TERAPEUTA.jpg']
    };
  } catch (error) {
    console.warn('⚠️ Erro ao carregar mapas:', error);
    return {};
  }
}

// Função para buscar conteúdo específico nos arquivos
export function searchTherapeuticContent(searchTerm) {
  const allData = loadTherapeuticData();
  
  return allData.filter(file => 
    file.rawContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Exportar função para forçar recarga dos dados (útil após adicionar novos arquivos)
export function reloadTherapeuticData() {
  therapeuticDataCache = null;
  return loadTherapeuticData();
}

// Inicializar carregamento ao importar o módulo
if (typeof window !== 'undefined') {
  // Carregar dados quando o módulo for importado (apenas no browser)
  setTimeout(() => {
    loadTherapeuticData();
  }, 100);
}

export default {
  loadTherapeuticData,
  enrichSuggestionsWithFiles,
  parseTherapeuticFile,
  getIridologyMaps,
  searchTherapeuticContent,
  reloadTherapeuticData
};
