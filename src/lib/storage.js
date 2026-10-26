/**
 * Sistema de armazenamento persistente para anamneses
 * Utiliza IndexedDB para armazenar imagens e arquivos grandes
 * localStorage para metadados e dados textuais
 */

const DB_NAME = 'AnamneseDB';
const DB_VERSION = 1;
const STORE_NAME = 'files';

// Inicializar IndexedDB
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        objectStore.createIndex('anamneseId', 'anamneseId', { unique: false });
        objectStore.createIndex('type', 'type', { unique: false });
      }
    };
  });
}

// Salvar arquivo (imagem ou PDF) no IndexedDB
export async function saveFile(anamneseId, fileType, fileName, fileData) {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const fileId = `${anamneseId}_${fileType}_${fileName}_${Date.now()}`;
    const fileRecord = {
      id: fileId,
      anamneseId,
      type: fileType, // 'iris', 'esclera', 'pdf', 'document'
      fileName,
      fileData, // base64 ou blob
      timestamp: new Date().toISOString()
    };

    return new Promise((resolve, reject) => {
      const request = store.put(fileRecord);
      request.onsuccess = () => resolve(fileId);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Erro ao salvar arquivo:', error);
    throw error;
  }
}

// Recuperar arquivo do IndexedDB
export async function getFile(fileId) {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get(fileId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Erro ao recuperar arquivo:', error);
    return null;
  }
}

// Recuperar todos os arquivos de uma anamnese
export async function getFilesByAnamneseId(anamneseId) {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('anamneseId');

    return new Promise((resolve, reject) => {
      const request = index.getAll(anamneseId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Erro ao recuperar arquivos:', error);
    return [];
  }
}

// Deletar todos os arquivos de uma anamnese
export async function deleteFilesByAnamneseId(anamneseId) {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('anamneseId');

    return new Promise((resolve, reject) => {
      const request = index.getAllKeys(anamneseId);
      request.onsuccess = () => {
        const keys = request.result;
        keys.forEach(key => store.delete(key));
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Erro ao deletar arquivos:', error);
  }
}

// Salvar anamnese completa (texto + referências de arquivos)
export async function saveAnamnese(anamneseData) {
  try {
    // Extrair e salvar arquivos grandes (imagens, PDFs)
    const fileReferences = {};

    // Salvar imagens de iridologia
    if (anamneseData.irisImages) {
      fileReferences.irisImages = {};
      for (const [key, imageData] of Object.entries(anamneseData.irisImages)) {
        if (imageData) {
          const fileId = await saveFile(anamneseData.id, 'iris', key, imageData);
          fileReferences.irisImages[key] = fileId;
        }
      }
      delete anamneseData.irisImages; // Remove do objeto principal
    }

    // Salvar imagens de esclera
    if (anamneseData.scleraImages) {
      fileReferences.scleraImages = {};
      for (const [key, imageData] of Object.entries(anamneseData.scleraImages)) {
        if (imageData) {
          const fileId = await saveFile(anamneseData.id, 'esclera', key, imageData);
          fileReferences.scleraImages[key] = fileId;
        }
      }
      delete anamneseData.scleraImages;
    }

    // Salvar PDFs/documentos
    if (anamneseData.uploadedDocuments) {
      fileReferences.uploadedDocuments = [];
      for (const doc of anamneseData.uploadedDocuments) {
        if (doc.data) {
          const fileId = await saveFile(anamneseData.id, 'document', doc.name, doc.data);
          fileReferences.uploadedDocuments.push({
            ...doc,
            fileId,
            data: null // Remove dados do localStorage
          });
        }
      }
      delete anamneseData.uploadedDocuments;
    }

    // Adicionar referências de arquivos
    anamneseData.fileReferences = fileReferences;

    // Salvar metadados no localStorage
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const index = anamneses.findIndex(a => a.id === anamneseData.id);
    
    if (index >= 0) {
      anamneses[index] = { ...anamneses[index], ...anamneseData };
    } else {
      anamneses.push(anamneseData);
    }

    localStorage.setItem('anamneses', JSON.stringify(anamneses));
    try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: anamneses[index] || anamneseData })); } catch (e) { /* ignore */ }
    return true;
  } catch (error) {
    console.error('Erro ao salvar anamnese:', error);
    return false;
  }
}

// Carregar anamnese completa (texto + arquivos)
export async function loadAnamnese(anamneseId) {
  try {
    // Carregar metadados do localStorage
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const anamnese = anamneses.find(a => String(a.id) === String(anamneseId));
    
    if (!anamnese) return null;

    // Restaurar arquivos do IndexedDB
    if (anamnese.fileReferences) {
      // Restaurar imagens de íris
      if (anamnese.fileReferences.irisImages) {
        anamnese.irisImages = {};
        for (const [key, fileId] of Object.entries(anamnese.fileReferences.irisImages)) {
          const file = await getFile(fileId);
          if (file) anamnese.irisImages[key] = file.fileData;
        }
      }

      // Restaurar imagens de esclera
      if (anamnese.fileReferences.scleraImages) {
        anamnese.scleraImages = {};
        for (const [key, fileId] of Object.entries(anamnese.fileReferences.scleraImages)) {
          const file = await getFile(fileId);
          if (file) anamnese.scleraImages[key] = file.fileData;
        }
      }

      // Restaurar documentos
      if (anamnese.fileReferences.uploadedDocuments) {
        anamnese.uploadedDocuments = [];
        for (const docRef of anamnese.fileReferences.uploadedDocuments) {
          const file = await getFile(docRef.fileId);
          if (file) {
            anamnese.uploadedDocuments.push({
              ...docRef,
              data: file.fileData
            });
          }
        }
      }
    }

    return anamnese;
  } catch (error) {
    console.error('Erro ao carregar anamnese:', error);
    return null;
  }
}

// Deletar anamnese completa (texto + arquivos)
export async function deleteAnamnese(anamneseId) {
  try {
    // Deletar arquivos do IndexedDB
    await deleteFilesByAnamneseId(anamneseId);

    // Deletar metadados do localStorage
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const filtered = anamneses.filter(a => String(a.id) !== String(anamneseId));
    localStorage.setItem('anamneses', JSON.stringify(filtered));
    try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: null })); } catch (e) { /* ignore */ }

    return true;
  } catch (error) {
    console.error('Erro ao deletar anamnese:', error);
    return false;
  }
}

// Agendar retorno
export function scheduleFollowUp(anamneseId, followUpDate, notes) {
  try {
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const index = anamneses.findIndex(a => String(a.id) === String(anamneseId));
    
    if (index >= 0) {
      anamneses[index].followUp = {
        scheduled: true,
        date: followUpDate,
        notes: notes || '',
        status: 'pending', // 'pending', 'confirmed', 'completed', 'cancelled'
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('anamneses', JSON.stringify(anamneses));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao agendar retorno:', error);
    return false;
  }
}

// Confirmar retorno
export function confirmFollowUp(anamneseId) {
  try {
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const index = anamneses.findIndex(a => String(a.id) === String(anamneseId));
    
    if (index >= 0 && anamneses[index].followUp) {
      anamneses[index].followUp.status = 'confirmed';
      anamneses[index].followUp.confirmedAt = new Date().toISOString();
      localStorage.setItem('anamneses', JSON.stringify(anamneses));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao confirmar retorno:', error);
    return false;
  }
}

// Obter anamneses com retorno agendado
export function getScheduledFollowUps() {
  try {
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    return anamneses.filter(a => a.followUp && a.followUp.scheduled && a.followUp.status !== 'completed');
  } catch (error) {
    console.error('Erro ao obter retornos agendados:', error);
    return [];
  }
}

// Comparar duas anamneses
export function compareAnamneses(anamnese1, anamnese2) {
  const comparison = {
    patient: anamnese1.q01_nome || anamnese1.nome,
    date1: anamnese1.createdAt || anamnese1.dataConsulta,
    date2: anamnese2.createdAt || anamnese2.dataConsulta,
    changes: []
  };

  // Campos principais tradicionais
  const basicFields = [
    { key: 'q15_queixa_principal', label: 'Queixa Principal' },
    { key: 'q16_tempo_problema', label: 'Tempo do Problema' },
    { key: 'q17_tratamentos_anteriores', label: 'Tratamentos Anteriores' },
    { key: 'q25_doencas_cronicas', label: 'Doenças Crônicas' },
    { key: 'q23_alergias', label: 'Alergias' },
    { key: 'q24_medicamentos_uso', label: 'Medicamentos em Uso' },
    { key: 'q26_tabagismo', label: 'Tabagismo' },
    { key: 'q27_etilismo', label: 'Etilismo' },
    { key: 'q28_atividade_fisica', label: 'Atividade Física' },
    { key: 'q36_horas_sono', label: 'Horas de Sono' },
    { key: 'q37_qualidade_sono', label: 'Qualidade do Sono' },
    { key: 'q46_dores', label: 'Dores' },
    { key: 'q47_cansaco', label: 'Cansaço' },
    { key: 'q48_estresse', label: 'Estresse' },
    { key: 'q49_ansiedade', label: 'Ansiedade' }
  ];

  // Comparar campos básicos
  basicFields.forEach(({ key, label }) => {
    const value1 = anamnese1[key];
    const value2 = anamnese2[key];

    if (JSON.stringify(value1) !== JSON.stringify(value2)) {
      comparison.changes.push({
        field: label,
        fieldKey: key,
        previous: value1 || 'Não informado',
        current: value2 || 'Não informado',
        improved: assessImprovement(key, value1, value2)
      });
    }
  });

  // NOVO: Comparar Sintomas Selecionados
  if (anamnese1.q17a_sintomas_selecionados || anamnese2.q17a_sintomas_selecionados) {
    const sintomas1 = anamnese1.q17a_sintomas_selecionados || [];
    const sintomas2 = anamnese2.q17a_sintomas_selecionados || [];
    
    if (JSON.stringify(sintomas1) !== JSON.stringify(sintomas2)) {
      comparison.changes.push({
        field: '💊 Sintomas Selecionados',
        fieldKey: 'sintomas_selecionados',
        previous: sintomas1.length > 0 ? sintomas1.join(', ') : 'Nenhum',
        current: sintomas2.length > 0 ? sintomas2.join(', ') : 'Nenhum',
        improved: sintomas2.length < sintomas1.length ? 'improved' : (sintomas2.length > sintomas1.length ? 'worsened' : null)
      });
    }
  }

  // NOVO: Comparar Carências Nutricionais
  if (anamnese1.q17b_carencias_identificadas || anamnese2.q17b_carencias_identificadas) {
    const carencias1 = anamnese1.q17b_carencias_identificadas || [];
    const carencias2 = anamnese2.q17b_carencias_identificadas || [];
    
    const carenciasCount1 = carencias1.reduce((acc, c) => acc + (c.carencias?.length || 0), 0);
    const carenciasCount2 = carencias2.reduce((acc, c) => acc + (c.carencias?.length || 0), 0);
    
    if (carenciasCount1 !== carenciasCount2) {
      comparison.changes.push({
        field: '⚕️ Carências Nutricionais',
        fieldKey: 'carencias_nutricionais',
        previous: `${carenciasCount1} carências identificadas`,
        current: `${carenciasCount2} carências identificadas`,
        improved: carenciasCount2 < carenciasCount1 ? 'improved' : (carenciasCount2 > carenciasCount1 ? 'worsened' : null)
      });
    }
  }

  // NOVO: Comparar Sinais Vitais
  if (anamnese1.vitalSignsAnalysis || anamnese2.vitalSignsAnalysis) {
    const vital1 = anamnese1.vitalSignsAnalysis || {};
    const vital2 = anamnese2.vitalSignsAnalysis || {};
    
    const vitalFields = [
      { key: 'systolicBP', label: '📊 Pressão Sistólica', unit: 'mmHg', ideal: 120 },
      { key: 'diastolicBP', label: '📊 Pressão Diastólica', unit: 'mmHg', ideal: 80 },
      { key: 'heartRate', label: '💓 Frequência Cardíaca', unit: 'bpm', ideal: 70 },
      { key: 'weight', label: '⚖️ Peso', unit: 'kg' },
      { key: 'bmi', label: '📐 IMC', ideal: 22 },
      { key: 'waist', label: '📏 Cintura', unit: 'cm' },
      { key: 'whr', label: '📊 Relação C/Q' }
    ];

    vitalFields.forEach(({ key, label, unit, ideal }) => {
      const v1 = vital1[key];
      const v2 = vital2[key];
      
      if (v1 !== v2 && (v1 || v2)) {
        const improved = ideal ? 
          (Math.abs(parseFloat(v2) - ideal) < Math.abs(parseFloat(v1) - ideal) ? 'improved' : 'worsened') :
          null;
        
        comparison.changes.push({
          field: label,
          fieldKey: `vital_${key}`,
          previous: v1 ? `${v1}${unit ? ' ' + unit : ''}` : 'Não medido',
          current: v2 ? `${v2}${unit ? ' ' + unit : ''}` : 'Não medido',
          improved
        });
      }
    });
  }

  // NOVO: Comparar Questionário Abrangente de Saúde
  if (anamnese1.comprehensiveHealthData || anamnese2.comprehensiveHealthData) {
    const health1 = anamnese1.comprehensiveHealthData || {};
    const health2 = anamnese2.comprehensiveHealthData || {};
    
    // Doenças Familiares
    const famDiseases1 = health1.doencasFamiliares || [];
    const famDiseases2 = health2.doencasFamiliares || [];
    if (JSON.stringify(famDiseases1) !== JSON.stringify(famDiseases2)) {
      comparison.changes.push({
        field: '👨‍👩‍👧‍👦 Histórico Familiar',
        fieldKey: 'doencas_familiares',
        previous: famDiseases1.length > 0 ? famDiseases1.join(', ') : 'Nenhum',
        current: famDiseases2.length > 0 ? famDiseases2.join(', ') : 'Nenhum',
        improved: null
      });
    }

    // Doenças Crônicas do Questionário
    const chronic1 = health1.doencasCronicas || [];
    const chronic2 = health2.doencasCronicas || [];
    if (JSON.stringify(chronic1) !== JSON.stringify(chronic2)) {
      comparison.changes.push({
        field: '🏥 Doenças Crônicas (Detalhado)',
        fieldKey: 'doencas_cronicas_detalhadas',
        previous: chronic1.length > 0 ? chronic1.join(', ') : 'Nenhuma',
        current: chronic2.length > 0 ? chronic2.join(', ') : 'Nenhuma',
        improved: chronic2.length < chronic1.length ? 'improved' : (chronic2.length > chronic1.length ? 'worsened' : null)
      });
    }

    // Qualidade do Sono
    if (health1.qualidadeSono !== health2.qualidadeSono) {
      const sleepLevels = { 'Ruim': 1, 'Regular': 2, 'Boa': 3, 'Excelente': 4 };
      const level1 = sleepLevels[health1.qualidadeSono] || 0;
      const level2 = sleepLevels[health2.qualidadeSono] || 0;
      
      comparison.changes.push({
        field: '😴 Qualidade do Sono',
        fieldKey: 'qualidade_sono_detalhada',
        previous: health1.qualidadeSono || 'Não informado',
        current: health2.qualidadeSono || 'Não informado',
        improved: level2 > level1 ? 'improved' : (level2 < level1 ? 'worsened' : null)
      });
    }

    // Dificuldades para Dormir
    const sleepDiff1 = health1.dificuldadeDormir || [];
    const sleepDiff2 = health2.dificuldadeDormir || [];
    if (JSON.stringify(sleepDiff1) !== JSON.stringify(sleepDiff2)) {
      comparison.changes.push({
        field: '🌙 Dificuldades para Dormir',
        fieldKey: 'dificuldades_dormir',
        previous: sleepDiff1.length > 0 ? sleepDiff1.join(', ') : 'Nenhuma',
        current: sleepDiff2.length > 0 ? sleepDiff2.join(', ') : 'Nenhuma',
        improved: sleepDiff2.length < sleepDiff1.length ? 'improved' : (sleepDiff2.length > sleepDiff1.length ? 'worsened' : null)
      });
    }

    // Nível de Energia
    if (health1.nivelEnergia !== health2.nivelEnergia) {
      const energyLevels = { 'Muito baixo': 1, 'Baixo': 2, 'Normal': 3, 'Alto': 4 };
      const energy1 = energyLevels[health1.nivelEnergia] || 0;
      const energy2 = energyLevels[health2.nivelEnergia] || 0;
      
      comparison.changes.push({
        field: '⚡ Nível de Energia',
        fieldKey: 'nivel_energia',
        previous: health1.nivelEnergia || 'Não informado',
        current: health2.nivelEnergia || 'Não informado',
        improved: energy2 > energy1 ? 'improved' : (energy2 < energy1 ? 'worsened' : null)
      });
    }

    // Nível de Estresse
    if (health1.nivelEstresse !== health2.nivelEstresse) {
      const stressLevels = { 'Baixo': 1, 'Moderado': 2, 'Alto': 3, 'Muito alto': 4 };
      const stress1 = stressLevels[health1.nivelEstresse] || 0;
      const stress2 = stressLevels[health2.nivelEstresse] || 0;
      
      comparison.changes.push({
        field: '😰 Nível de Estresse',
        fieldKey: 'nivel_estresse_detalhado',
        previous: health1.nivelEstresse || 'Não informado',
        current: health2.nivelEstresse || 'Não informado',
        improved: stress2 < stress1 ? 'improved' : (stress2 > stress1 ? 'worsened' : null)
      });
    }

    // Nível de Ansiedade
    if (health1.nivelAnsiedade !== health2.nivelAnsiedade) {
      const anxietyLevels = { 'Nenhuma': 0, 'Leve': 1, 'Moderada': 2, 'Intensa': 3 };
      const anxiety1 = anxietyLevels[health1.nivelAnsiedade] || 0;
      const anxiety2 = anxietyLevels[health2.nivelAnsiedade] || 0;
      
      comparison.changes.push({
        field: '😥 Nível de Ansiedade',
        fieldKey: 'nivel_ansiedade_detalhado',
        previous: health1.nivelAnsiedade || 'Não informado',
        current: health2.nivelAnsiedade || 'Não informado',
        improved: anxiety2 < anxiety1 ? 'improved' : (anxiety2 > anxiety1 ? 'worsened' : null)
      });
    }

    // Dores
    const dores1 = health1.dores || [];
    const dores2 = health2.dores || [];
    if (JSON.stringify(dores1) !== JSON.stringify(dores2)) {
      comparison.changes.push({
        field: '🤕 Dores Frequentes',
        fieldKey: 'dores_frequentes',
        previous: dores1.length > 0 ? dores1.join(', ') : 'Nenhuma',
        current: dores2.length > 0 ? dores2.join(', ') : 'Nenhuma',
        improved: dores2.length < dores1.length ? 'improved' : (dores2.length > dores1.length ? 'worsened' : null)
      });
    }

    // Qualidade Alimentação
    if (health1.qualidadeAlimentacao !== health2.qualidadeAlimentacao) {
      const foodQuality = { 'Ruim': 1, 'Regular': 2, 'Boa': 3, 'Excelente': 4 };
      const food1 = foodQuality[health1.qualidadeAlimentacao] || 0;
      const food2 = foodQuality[health2.qualidadeAlimentacao] || 0;
      
      comparison.changes.push({
        field: '🍽️ Qualidade da Alimentação',
        fieldKey: 'qualidade_alimentacao',
        previous: health1.qualidadeAlimentacao || 'Não informado',
        current: health2.qualidadeAlimentacao || 'Não informado',
        improved: food2 > food1 ? 'improved' : (food2 < food1 ? 'worsened' : null)
      });
    }

    // Funcionamento Intestinal
    if (health1.funcionamentoIntestinal !== health2.funcionamentoIntestinal) {
      comparison.changes.push({
        field: '🫃 Funcionamento Intestinal',
        fieldKey: 'funcionamento_intestinal',
        previous: health1.funcionamentoIntestinal || 'Não informado',
        current: health2.funcionamentoIntestinal || 'Não informado',
        improved: health2.funcionamentoIntestinal === 'Normal (1x ao dia)' ? 'improved' : 
                 (health1.funcionamentoIntestinal === 'Normal (1x ao dia)' ? 'worsened' : null)
      });
    }
  }

  // NOVO: Comparar Sinais Clínicos
  if (anamnese1.clinicalSignsChecklist || anamnese2.clinicalSignsChecklist) {
    const clinical1 = anamnese1.clinicalSignsChecklist || {};
    const clinical2 = anamnese2.clinicalSignsChecklist || {};
    
    const clinicalCategories = ['unhas', 'cabelos', 'olhos', 'pele', 'lingua', 'labios'];
    clinicalCategories.forEach(category => {
      const signs1 = clinical1[category] || [];
      const signs2 = clinical2[category] || [];
      
      if (JSON.stringify(signs1) !== JSON.stringify(signs2)) {
        const categoryLabels = {
          'unhas': '💅 Sinais nas Unhas',
          'cabelos': '💇 Sinais nos Cabelos',
          'olhos': '👁️ Sinais nos Olhos',
          'pele': '🧴 Sinais na Pele',
          'lingua': '👅 Sinais na Língua',
          'labios': '👄 Sinais nos Lábios'
        };
        
        comparison.changes.push({
          field: categoryLabels[category],
          fieldKey: `sinais_clinicos_${category}`,
          previous: signs1.length > 0 ? `${signs1.length} sinais` : 'Nenhum',
          current: signs2.length > 0 ? `${signs2.length} sinais` : 'Nenhum',
          improved: signs2.length < signs1.length ? 'improved' : (signs2.length > signs1.length ? 'worsened' : null)
        });
      }
    });
  }

  return comparison;
}

// Avaliar se houve melhora
function assessImprovement(field, oldValue, newValue) {
  // Lógica para determinar melhora baseada no campo
  switch (field) {
    case 'q48_estresse':
    case 'q49_ansiedade':
      if (typeof oldValue === 'string' && typeof newValue === 'string') {
        const levels = { 'baixo': 1, 'leve': 1, 'moderado': 2, 'alto': 3, 'muito alto': 4, 'intensa': 3 };
        const old = levels[oldValue.toLowerCase()] || 0;
        const current = levels[newValue.toLowerCase()] || 0;
        if (current < old) return 'improved';
        if (current > old) return 'worsened';
      }
      return null;
    case 'q37_qualidade_sono':
      if (typeof oldValue === 'string' && typeof newValue === 'string') {
        const levels = { 'ruim': 1, 'regular': 2, 'boa': 3, 'excelente': 4 };
        const old = levels[oldValue.toLowerCase()] || 0;
        const current = levels[newValue.toLowerCase()] || 0;
        if (current > old) return 'improved';
        if (current < old) return 'worsened';
      }
      return null;
    case 'q46_dores':
    case 'q47_cansaco':
      // Se diminuiu, melhorou
      if (!newValue || newValue === 'Não' || newValue === 'Nenhum') return 'improved';
      if (!oldValue || oldValue === 'Não' || oldValue === 'Nenhum') return 'worsened';
      return null;
    default:
      return null;
  }
}
