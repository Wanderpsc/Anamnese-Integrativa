/**
 * Sistema de Indexação e Busca Local de Dados Terapêuticos
 * 
 * Gerencia 342 arquivos em therapeutic-data com IndexedDB para operação offline.
 * Estrutura: metadata indexada + texto extraído + busca full-text + cache de resultados.
 */

const DB_NAME = 'AnamneseTherapeuticDB';
const DB_VERSION = 1;
const STORE_METADATA = 'therapeuticMetadata'; // Info dos arquivos
const STORE_CONTENT = 'therapeuticContent';   // Texto extraído dos PDFs
const STORE_SEARCH = 'therapeuticSearchIndex'; // Índice de busca
const STORE_CACHE = 'searchCache';             // Cache de buscas

// Categorias de arquivos terapêuticos identificadas
export const THERAPEUTIC_CATEGORIES = {
  FITOTERAPIA: 'fitoterapia',
  HOMEOPATIA: 'homeopatia',
  IRIDOLOGIA: 'iridologia',
  NUTRICAO: 'nutricao',
  FORMULAS: 'formulas',
  PROTOCOLOS: 'protocolos',
  BIORESSONANCIA: 'bioressonancia',
  AURICULOTERAPIA: 'auriculoterapia',
  FLORAIS: 'florais',
  OLIGOTERAPIA: 'oligoterapia',
  AROMATERAPIA: 'aromaterapia',
  GEOTERAPIA: 'geoterapia',
  HIDROTERAPIA: 'hidroterapia',
  EXAMES: 'exames',
  ANAMNESE: 'anamnese',
  SUPLEMENTACAO: 'suplementacao',
  ARTIGOS: 'artigos',
  GUIAS: 'guias',
  OUTROS: 'outros'
};

/**
 * Inicializa banco IndexedDB
 */
export function initTherapeuticDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Store de metadata dos arquivos
      if (!db.objectStoreNames.contains(STORE_METADATA)) {
        const metaStore = db.createObjectStore(STORE_METADATA, { keyPath: 'id', autoIncrement: true });
        metaStore.createIndex('fileName', 'fileName', { unique: false });
        metaStore.createIndex('category', 'category', { unique: false });
        metaStore.createIndex('keywords', 'keywords', { unique: false, multiEntry: true });
        metaStore.createIndex('indexed', 'indexed', { unique: false });
      }
      
      // Store de conteúdo extraído
      if (!db.objectStoreNames.contains(STORE_CONTENT)) {
        const contentStore = db.createObjectStore(STORE_CONTENT, { keyPath: 'fileId' });
        contentStore.createIndex('category', 'category', { unique: false });
      }
      
      // Store de índice de busca (termos -> arquivos)
      if (!db.objectStoreNames.contains(STORE_SEARCH)) {
        const searchStore = db.createObjectStore(STORE_SEARCH, { keyPath: 'term' });
        searchStore.createIndex('fileIds', 'fileIds', { unique: false, multiEntry: true });
      }
      
      // Store de cache de buscas
      if (!db.objectStoreNames.contains(STORE_CACHE)) {
        const cacheStore = db.createObjectStore(STORE_CACHE, { keyPath: 'query' });
        cacheStore.createIndex('timestamp', 'timestamp', { unique: false });
      }
      
      console.log('✅ TherapeuticDB inicializado com sucesso');
    };
  });
}

/**
 * Categoriza arquivo baseado no nome
 */
export function categorizeFile(fileName) {
  const lowerName = fileName.toLowerCase();
  
  if (lowerName.includes('fitoterapia') || lowerName.includes('plantas-medicinais') || 
      lowerName.includes('fitoterápico') || lowerName.includes('memento-fitoterapico')) {
    return THERAPEUTIC_CATEGORIES.FITOTERAPIA;
  }
  if (lowerName.includes('homeopatia') || lowerName.includes('homeopático') || 
      lowerName.includes('repertorio')) {
    return THERAPEUTIC_CATEGORIES.HOMEOPATIA;
  }
  if (lowerName.includes('iridologia') || lowerName.includes('iris') || 
      lowerName.includes('rayid') || lowerName.includes('mapa') && lowerName.includes('olho')) {
    return THERAPEUTIC_CATEGORIES.IRIDOLOGIA;
  }
  if (lowerName.includes('nutri') || lowerName.includes('alimenta') || 
      lowerName.includes('dieta') || lowerName.includes('trofoterapia')) {
    return THERAPEUTIC_CATEGORIES.NUTRICAO;
  }
  if (lowerName.includes('formula') || lowerName.includes('prescri') || 
      lowerName.includes('manipula')) {
    return THERAPEUTIC_CATEGORIES.FORMULAS;
  }
  if (lowerName.includes('protocolo') || lowerName.includes('tratamento')) {
    return THERAPEUTIC_CATEGORIES.PROTOCOLOS;
  }
  if (lowerName.includes('biorresonancia') || lowerName.includes('biorressonância') || 
      lowerName.includes('quantum')) {
    return THERAPEUTIC_CATEGORIES.BIORESSONANCIA;
  }
  if (lowerName.includes('auriculo') || lowerName.includes('auricular')) {
    return THERAPEUTIC_CATEGORIES.AURICULOTERAPIA;
  }
  if (lowerName.includes('floral') || lowerName.includes('essências')) {
    return THERAPEUTIC_CATEGORIES.FLORAIS;
  }
  if (lowerName.includes('oligoterapia') || lowerName.includes('oligo')) {
    return THERAPEUTIC_CATEGORIES.OLIGOTERAPIA;
  }
  if (lowerName.includes('aromater') || lowerName.includes('óleo') && lowerName.includes('essencial')) {
    return THERAPEUTIC_CATEGORIES.AROMATERAPIA;
  }
  if (lowerName.includes('geoterapia') || lowerName.includes('argila')) {
    return THERAPEUTIC_CATEGORIES.GEOTERAPIA;
  }
  if (lowerName.includes('hidroter')) {
    return THERAPEUTIC_CATEGORIES.HIDROTERAPIA;
  }
  if (lowerName.includes('exame') || lowerName.includes('laboratorial')) {
    return THERAPEUTIC_CATEGORIES.EXAMES;
  }
  if (lowerName.includes('anamnese') || lowerName.includes('questionário') || 
      lowerName.includes('ficha')) {
    return THERAPEUTIC_CATEGORIES.ANAMNESE;
  }
  if (lowerName.includes('suplemento') || lowerName.includes('suplementa') || 
      lowerName.includes('vitamina') || lowerName.includes('mineral')) {
    return THERAPEUTIC_CATEGORIES.SUPLEMENTACAO;
  }
  if (lowerName.includes('artigo') || lowerName.startsWith('artigo-')) {
    return THERAPEUTIC_CATEGORIES.ARTIGOS;
  }
  if (lowerName.includes('guia') || lowerName.includes('apostila') || 
      lowerName.includes('manual')) {
    return THERAPEUTIC_CATEGORIES.GUIAS;
  }
  
  return THERAPEUTIC_CATEGORIES.OUTROS;
}

/**
 * Extrai keywords do nome do arquivo
 */
export function extractKeywords(fileName) {
  const keywords = new Set();
  const name = fileName
    .replace(/\.(pdf|docx?|txt)$/i, '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove acentos
  
  // Split por delimitadores
  const parts = name.split(/[-_\s().]+/);
  
  parts.forEach(part => {
    if (part.length >= 3) { // Mínimo 3 caracteres
      keywords.add(part);
      
      // Adiciona variações comuns
      if (part.endsWith('s')) keywords.add(part.slice(0, -1));
      if (part.includes('cao')) keywords.add(part.replace('cao', 'ção'));
      if (part.includes('tica')) keywords.add(part.replace('tica', 'tico'));
    }
  });
  
  return Array.from(keywords);
}

/**
 * Indexa metadata de um arquivo
 */
export async function indexFileMetadata(fileName, category = null) {
  const db = await initTherapeuticDB();
  const cat = category || categorizeFile(fileName);
  const keywords = extractKeywords(fileName);
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_METADATA], 'readwrite');
    const store = transaction.objectStore(STORE_METADATA);
    
    const metadata = {
      fileName,
      category: cat,
      keywords,
      indexed: false, // Conteúdo ainda não extraído
      addedAt: new Date().toISOString()
    };
    
    const request = store.add(metadata);
    request.onsuccess = () => resolve(request.result); // Retorna ID
    request.onerror = () => reject(request.error);
  });
}

/**
 * Indexa todos os 342 arquivos (só metadata inicial)
 */
export async function indexAllFiles(fileList) {
  const db = await initTherapeuticDB();
  let indexed = 0;
  const results = {
    success: 0,
    skipped: 0,
    errors: []
  };
  
  for (const fileName of fileList) {
    try {
      // Verifica se já existe
      const exists = await checkFileExists(fileName);
      if (exists) {
        results.skipped++;
        continue;
      }
      
      await indexFileMetadata(fileName);
      results.success++;
      
      // Log de progresso a cada 50 arquivos
      if (results.success % 50 === 0) {
        console.log(`📚 Indexados ${results.success}/${fileList.length} arquivos...`);
      }
    } catch (error) {
      console.error(`❌ Erro ao indexar ${fileName}:`, error);
      results.errors.push({ fileName, error: error.message });
    }
  }
  
  console.log(`✅ Indexação completa:`, results);
  return results;
}

/**
 * Verifica se arquivo já está indexado
 */
export async function checkFileExists(fileName) {
  const db = await initTherapeuticDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_METADATA], 'readonly');
    const store = transaction.objectStore(STORE_METADATA);
    const index = store.index('fileName');
    const request = index.get(fileName);
    
    request.onsuccess = () => resolve(!!request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Salva conteúdo extraído de um arquivo
 */
export async function saveFileContent(fileId, extractedText, metadata = {}) {
  const db = await initTherapeuticDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_CONTENT, STORE_METADATA], 'readwrite');
    
    // Salva conteúdo
    const contentStore = transaction.objectStore(STORE_CONTENT);
    const content = {
      fileId,
      text: extractedText,
      category: metadata.category,
      extractedAt: new Date().toISOString(),
      textLength: extractedText.length,
      ...metadata
    };
    contentStore.put(content);
    
    // Atualiza flag de indexado
    const metaStore = transaction.objectStore(STORE_METADATA);
    const getRequest = metaStore.get(fileId);
    getRequest.onsuccess = () => {
      const meta = getRequest.result;
      if (meta) {
        meta.indexed = true;
        meta.indexedAt = new Date().toISOString();
        metaStore.put(meta);
      }
    };
    
    transaction.oncomplete = () => resolve(true);
    transaction.onerror = () => reject(transaction.error);
  });
}

/**
 * Busca arquivos por categoria
 */
export async function searchByCategory(category) {
  const db = await initTherapeuticDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_METADATA], 'readonly');
    const store = transaction.objectStore(STORE_METADATA);
    const index = store.index('category');
    const request = index.getAll(category);
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Busca full-text nos conteúdos indexados
 */
export async function searchContent(query, options = {}) {
  const {
    category = null,
    maxResults = 20,
    useCache = true
  } = options;
  
  // Verifica cache
  if (useCache) {
    const cached = await getCachedSearch(query);
    if (cached) {
      console.log('🎯 Resultado do cache:', query);
      return cached.results;
    }
  }
  
  const db = await initTherapeuticDB();
  const normalizedQuery = query.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  
  const terms = normalizedQuery.split(/\s+/).filter(t => t.length >= 3);
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_CONTENT, STORE_METADATA], 'readonly');
    const contentStore = transaction.objectStore(STORE_CONTENT);
    const metaStore = transaction.objectStore(STORE_METADATA);
    
    const results = [];
    const request = contentStore.openCursor();
    
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      
      if (cursor && results.length < maxResults) {
        const content = cursor.value;
        
        // Filtra por categoria se especificado
        if (category && content.category !== category) {
          cursor.continue();
          return;
        }
        
        const normalizedText = content.text.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        
        // Calcula score de relevância
        let score = 0;
        const snippets = [];
        
        terms.forEach(term => {
          const regex = new RegExp(term, 'gi');
          const matches = normalizedText.match(regex);
          if (matches) {
            score += matches.length;
            
            // Extrai snippet do contexto
            const index = normalizedText.indexOf(term);
            if (index !== -1) {
              const start = Math.max(0, index - 100);
              const end = Math.min(content.text.length, index + 100);
              const snippet = content.text.substring(start, end).replace(/\s+/g, ' ');
              snippets.push('...' + snippet + '...');
            }
          }
        });
        
        if (score > 0) {
          // Busca metadata
          const metaRequest = metaStore.get(content.fileId);
          metaRequest.onsuccess = () => {
            results.push({
              fileId: content.fileId,
              fileName: metaRequest.result?.fileName || 'Unknown',
              category: content.category,
              score,
              snippets: snippets.slice(0, 3), // Máximo 3 snippets
              textLength: content.textLength
            });
            
            // Ordena por score
            results.sort((a, b) => b.score - a.score);
          };
        }
        
        cursor.continue();
      } else {
        // Cache resultado
        if (useCache && results.length > 0) {
          cacheSearchResult(query, results);
        }
        
        resolve(results);
      }
    };
    
    request.onerror = () => reject(request.error);
  });
}

/**
 * Busca por keywords no metadata (mais rápido)
 */
export async function searchByKeywords(keywords) {
  const db = await initTherapeuticDB();
  const keywordArray = Array.isArray(keywords) ? keywords : [keywords];
  const results = new Set();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_METADATA], 'readonly');
    const store = transaction.objectStore(STORE_METADATA);
    const index = store.index('keywords');
    
    let completed = 0;
    
    keywordArray.forEach(keyword => {
      const request = index.getAll(keyword.toLowerCase());
      
      request.onsuccess = () => {
        request.result.forEach(item => results.add(item));
        completed++;
        
        if (completed === keywordArray.length) {
          resolve(Array.from(results));
        }
      };
      
      request.onerror = () => reject(request.error);
    });
  });
}

/**
 * Cache de resultado de busca
 */
async function cacheSearchResult(query, results) {
  const db = await initTherapeuticDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_CACHE], 'readwrite');
    const store = transaction.objectStore(STORE_CACHE);
    
    const cached = {
      query: query.toLowerCase(),
      results,
      timestamp: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 horas
    };
    
    const request = store.put(cached);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Recupera busca do cache
 */
async function getCachedSearch(query) {
  const db = await initTherapeuticDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_CACHE], 'readonly');
    const store = transaction.objectStore(STORE_CACHE);
    const request = store.get(query.toLowerCase());
    
    request.onsuccess = () => {
      const cached = request.result;
      if (cached && cached.expiresAt > Date.now()) {
        resolve(cached);
      } else {
        resolve(null);
      }
    };
    
    request.onerror = () => reject(request.error);
  });
}

/**
 * Obtém estatísticas do banco
 */
export async function getDatabaseStats() {
  const db = await initTherapeuticDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_METADATA, STORE_CONTENT], 'readonly');
    
    const stats = {
      totalFiles: 0,
      indexedFiles: 0,
      byCategory: {}
    };
    
    const metaStore = transaction.objectStore(STORE_METADATA);
    const metaRequest = metaStore.getAll();
    
    metaRequest.onsuccess = () => {
      const files = metaRequest.result;
      stats.totalFiles = files.length;
      stats.indexedFiles = files.filter(f => f.indexed).length;
      
      // Conta por categoria
      files.forEach(file => {
        stats.byCategory[file.category] = (stats.byCategory[file.category] || 0) + 1;
      });
      
      resolve(stats);
    };
    
    metaRequest.onerror = () => reject(metaRequest.error);
  });
}

/**
 * Limpa cache expirado
 */
export async function cleanExpiredCache() {
  const db = await initTherapeuticDB();
  const now = Date.now();
  let cleaned = 0;
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_CACHE], 'readwrite');
    const store = transaction.objectStore(STORE_CACHE);
    const request = store.openCursor();
    
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        if (cursor.value.expiresAt < now) {
          cursor.delete();
          cleaned++;
        }
        cursor.continue();
      } else {
        console.log(`🗑️ Cache limpo: ${cleaned} entradas removidas`);
        resolve(cleaned);
      }
    };
    
    request.onerror = () => reject(request.error);
  });
}

export default {
  initTherapeuticDB,
  categorizeFile,
  extractKeywords,
  indexFileMetadata,
  indexAllFiles,
  checkFileExists,
  saveFileContent,
  searchByCategory,
  searchContent,
  searchByKeywords,
  getDatabaseStats,
  cleanExpiredCache,
  THERAPEUTIC_CATEGORIES
};
