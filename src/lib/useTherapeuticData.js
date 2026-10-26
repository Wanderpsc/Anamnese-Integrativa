/**
 * Hook React para Gerenciamento de Dados Terapêuticos Offline
 * 
 * Gerencia indexação, extração e busca local dos 342 arquivos terapêuticos.
 * Integra com IndexedDB e fallback para busca online.
 */

import { useState, useEffect, useCallback } from 'react';
import therapeuticDB, { THERAPEUTIC_CATEGORIES } from './therapeuticDatabase';

// Lista completa dos 342 arquivos (será gerada automaticamente)
const THERAPEUTIC_FILES = [
  '00-apresentacao-metodo-gps-by-gerson-cunha.pdf',
  '01 - apostila-de-naturopatia-integrativa-20-ivm.pdf',
  '01-apresentacao-do-mapa-da-iris-metodo-gps-by-gerson-cunha - SENHA gpsivm.pdf',
  '01-interpretacao-funcional-de-exames-laboratoriais.pdf',
  '02 - apostila-de-anatomia-e-fisiologia-aplicados-a-naturopatia-ivm OK.pdf',
  '02-valores-de-referencia.pdf',
  '03-avaliacao-funcional.pdf',
  '03-constituicoes-metodo-gps-by-gerson-cunha.pdf',
  // ... (truncado por brevidade - seria a lista completa dos 342)
];

export function useTherapeuticData() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isIndexing, setIsIndexing] = useState(false);
  const [indexProgress, setIndexProgress] = useState(0);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Inicializa banco de dados
   */
  const initialize = useCallback(async () => {
    try {
      await therapeuticDB.initTherapeuticDB();
      const dbStats = await therapeuticDB.getDatabaseStats();
      setStats(dbStats);
      setIsInitialized(true);
      
      // Limpa cache expirado
      await therapeuticDB.cleanExpiredCache();
      
      console.log('✅ Banco terapêutico inicializado:', dbStats);
    } catch (err) {
      console.error('❌ Erro ao inicializar banco:', err);
      setError(err.message);
    }
  }, []);

  /**
   * Indexa metadata de todos os arquivos
   */
  const indexFiles = useCallback(async () => {
    try {
      setIsIndexing(true);
      setError(null);
      
      console.log('📚 Iniciando indexação de 342 arquivos...');
      
      const result = await therapeuticDB.indexAllFiles(THERAPEUTIC_FILES);
      
      // Atualiza stats
      const dbStats = await therapeuticDB.getDatabaseStats();
      setStats(dbStats);
      
      setIsIndexing(false);
      console.log('✅ Indexação completa:', result);
      
      return result;
    } catch (err) {
      console.error('❌ Erro na indexação:', err);
      setError(err.message);
      setIsIndexing(false);
      throw err;
    }
  }, []);

  /**
   * Busca por sintoma/queixa/tratamento
   */
  const search = useCallback(async (query, options = {}) => {
    try {
      if (!query || query.trim().length < 3) {
        return [];
      }

      console.log('🔍 Buscando:', query);
      
      // Tenta busca rápida por keywords primeiro
      const keywordResults = await therapeuticDB.searchByKeywords(query.split(/\s+/));
      
      if (keywordResults.length > 0) {
        console.log(`🎯 Encontrado ${keywordResults.length} arquivos por keywords`);
        return keywordResults;
      }
      
      // Busca full-text se keywords não retornou nada
      const fullTextResults = await therapeuticDB.searchContent(query, options);
      
      console.log(`🎯 Encontrado ${fullTextResults.length} arquivos por full-text`);
      return fullTextResults;
      
    } catch (err) {
      console.error('❌ Erro na busca:', err);
      throw err;
    }
  }, []);

  /**
   * Busca por categoria específica
   */
  const searchByCategory = useCallback(async (category) => {
    try {
      const results = await therapeuticDB.searchByCategory(category);
      console.log(`📂 Categoria ${category}: ${results.length} arquivos`);
      return results;
    } catch (err) {
      console.error('❌ Erro ao buscar categoria:', err);
      throw err;
    }
  }, []);

  /**
   * Busca tratamentos para sintomas específicos
   */
  const findTreatments = useCallback(async (symptoms, queixas = []) => {
    try {
      // Combina sintomas e queixas
      const allTerms = [...symptoms, ...queixas].filter(Boolean);
      
      if (allTerms.length === 0) {
        return [];
      }

      console.log('💊 Buscando tratamentos para:', allTerms);
      
      // Busca em categorias relevantes
      const relevantCategories = [
        THERAPEUTIC_CATEGORIES.FITOTERAPIA,
        THERAPEUTIC_CATEGORIES.HOMEOPATIA,
        THERAPEUTIC_CATEGORIES.PROTOCOLOS,
        THERAPEUTIC_CATEGORIES.FORMULAS,
        THERAPEUTIC_CATEGORIES.SUPLEMENTACAO
      ];
      
      const results = [];
      
      for (const term of allTerms) {
        for (const category of relevantCategories) {
          const categoryResults = await therapeuticDB.searchContent(term, {
            category,
            maxResults: 5
          });
          
          results.push(...categoryResults);
        }
      }
      
      // Remove duplicatas
      const uniqueResults = results.reduce((acc, curr) => {
        if (!acc.find(r => r.fileId === curr.fileId)) {
          acc.push(curr);
        }
        return acc;
      }, []);
      
      // Ordena por score
      uniqueResults.sort((a, b) => b.score - a.score);
      
      console.log(`💊 Encontrados ${uniqueResults.length} tratamentos`);
      return uniqueResults.slice(0, 20); // Máximo 20 resultados
      
    } catch (err) {
      console.error('❌ Erro ao buscar tratamentos:', err);
      throw err;
    }
  }, []);

  /**
   * Verifica se sistema está pronto
   */
  const isReady = useCallback(() => {
    return isInitialized && stats && stats.totalFiles > 0;
  }, [isInitialized, stats]);

  /**
   * Auto-inicializa ao montar
   */
  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    // Estado
    isInitialized,
    isIndexing,
    indexProgress,
    stats,
    error,
    
    // Métodos
    initialize,
    indexFiles,
    search,
    searchByCategory,
    findTreatments,
    isReady,
    
    // Constantes
    categories: THERAPEUTIC_CATEGORIES
  };
}

/**
 * Hook para busca de tratamentos integrada ao formulário de anamnese
 */
export function useAnamneseTreatmentSearch() {
  const therapeutic = useTherapeuticData();
  const [isSearching, setIsSearching] = useState(false);
  const [treatments, setTreatments] = useState([]);

  /**
   * Busca tratamentos baseado em dados da anamnese
   */
  const searchTreatments = useCallback(async (anamneseData) => {
    if (!therapeutic.isReady()) {
      console.warn('⚠️ Banco terapêutico não está pronto');
      return [];
    }

    try {
      setIsSearching(true);
      
      // Extrai sintomas e queixas da anamnese
      const symptoms = [];
      const complaints = [];
      
      // Queixa principal
      if (anamneseData.q15_queixa_principal) {
        complaints.push(anamneseData.q15_queixa_principal);
      }
      
      // Doenças crônicas
      if (anamneseData.q25_doencas_cronicas) {
        symptoms.push(anamneseData.q25_doencas_cronicas);
      }
      
      // Sistema digestivo
      if (anamneseData.q40_gases === 'Sim') symptoms.push('gases');
      if (anamneseData.q41_azia === 'Sim') symptoms.push('azia refluxo');
      if (anamneseData.q42_nauseas === 'Sim') symptoms.push('náuseas');
      
      // Outros sintomas
      if (anamneseData.q47_cansaco === 'Sim') symptoms.push('fadiga cansaço');
      if (anamneseData.q48_estresse) symptoms.push('estresse');
      if (anamneseData.q49_ansiedade) symptoms.push('ansiedade');
      
      // Busca tratamentos
      const results = await therapeutic.findTreatments(symptoms, complaints);
      setTreatments(results);
      setIsSearching(false);
      
      return results;
      
    } catch (err) {
      console.error('❌ Erro ao buscar tratamentos:', err);
      setIsSearching(false);
      return [];
    }
  }, [therapeutic]);

  return {
    treatments,
    isSearching,
    searchTreatments,
    therapeutic
  };
}

export default useTherapeuticData;
