/**
 * Utilitário para salvar protocolos terapêuticos por paciente no localStorage.
 * Chave: 'savedProtocols' → { [patientId]: protocolEntry[] }
 *
 * protocolEntry: {
 *   conditionKey  : string   — chave exata usada em PROTOCOLOS_POR_CONDICAO
 *   conditionNome : string   — nome legível da condição
 *   source        : string   — ex: 'questionário', 'sugestões', 'detox', etc.
 *   fitoterapia   : array
 *   suplementacao : array
 *   homeopatia    : array
 *   aromaterapia  : array
 *   orientacoesGerais : array
 *   savedAt       : ISO string
 * }
 */

const STORAGE_KEY = 'savedProtocols';

/** Retorna todos os protocolos salvos para um dado patientId. */
export function getSavedProtocols(patientId) {
  if (!patientId) return [];
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return all[patientId] || [];
  } catch {
    return [];
  }
}

/**
 * Salva (ou atualiza) um protocolo para o paciente.
 * Se já existir uma entrada com o mesmo conditionKey, ela é substituída.
 */
export function saveProtocol(patientId, protocolEntry) {
  if (!patientId || !protocolEntry?.conditionKey) return;
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (!all[patientId]) all[patientId] = [];
    const idx = all[patientId].findIndex(p => p.conditionKey === protocolEntry.conditionKey);
    const entry = { ...protocolEntry, savedAt: new Date().toISOString() };
    if (idx >= 0) {
      all[patientId][idx] = entry;
    } else {
      all[patientId].push(entry);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('saveProtocol error:', e);
  }
}

/** Remove um protocolo específico para um paciente. */
export function removeProtocol(patientId, conditionKey) {
  if (!patientId || !conditionKey) return;
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (all[patientId]) {
      all[patientId] = all[patientId].filter(p => p.conditionKey !== conditionKey);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    }
  } catch (e) {
    console.error('removeProtocol error:', e);
  }
}

/** Verifica se um protocolo já está salvo para o paciente. */
export function isProtocolSaved(patientId, conditionKey) {
  if (!patientId || !conditionKey) return false;
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return !!(all[patientId] && all[patientId].some(p => p.conditionKey === conditionKey));
  } catch {
    return false;
  }
}

/** Retorna o patientId do paciente em atendimento (currentPatientId do localStorage). */
export function getCurrentPatientId() {
  return localStorage.getItem('currentPatientId') || null;
}
