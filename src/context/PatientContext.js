import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * PatientContext — sessão única do interagente em consulta.
 * 
 * Todas as páginas lêem daqui o paciente ativo e chamam saveModuleData
 * para persistir seus dados no registro do interagente.
 */
const PatientContext = createContext(null);

function loadCurrentPatient() {
  try {
    const pid = localStorage.getItem('currentPatientId');
    if (!pid) return null;
    const list = JSON.parse(localStorage.getItem('anamneses') || '[]');
    return list.find(a => String(a.id) === String(pid)) || null;
  } catch { return null; }
}

export function PatientContextProvider({ children }) {
  const [currentPatient, setCurrentPatientState] = useState(loadCurrentPatient);

  // Sincroniza quando outra aba/página salvar dados
  useEffect(() => {
    const sync = () => setCurrentPatientState(loadCurrentPatient());
    window.addEventListener('anamneses:updated', sync);
    return () => window.removeEventListener('anamneses:updated', sync);
  }, []);

  /** Define o interagente em consulta e persiste o ID */
  const setCurrentPatient = useCallback((patient) => {
    if (patient) {
      localStorage.setItem('currentPatientId', String(patient.id));
      setCurrentPatientState(patient);
    } else {
      localStorage.removeItem('currentPatientId');
      setCurrentPatientState(null);
    }
    window.dispatchEvent(new CustomEvent('patient:changed', { detail: patient }));
  }, []);

  /**
   * Salva dados de um módulo no registro do interagente em consulta.
   * @param {string} moduleKey  — chave no objeto anamnese (ex: 'iridologyAnalysis')
   * @param {any}    data       — dados do módulo
   * @returns {boolean}
   */
  const saveModuleData = useCallback((moduleKey, data) => {
    const pid = localStorage.getItem('currentPatientId');
    if (!pid) return false;
    try {
      const list = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const idx = list.findIndex(a => String(a.id) === String(pid));
      if (idx === -1) return false;
      list[idx][moduleKey] = data;
      list[idx].updatedAt = new Date().toISOString();
      localStorage.setItem('anamneses', JSON.stringify(list));
      const updated = list[idx];
      setCurrentPatientState(updated);
      window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: updated }));
      return true;
    } catch { return false; }
  }, []);

  /** Lê dados de um módulo do interagente em consulta */
  const getModuleData = useCallback((moduleKey) => {
    if (!currentPatient) return null;
    return currentPatient[moduleKey] ?? null;
  }, [currentPatient]);

  return (
    <PatientContext.Provider value={{
      currentPatient,
      currentPatientId: currentPatient ? String(currentPatient.id) : null,
      setCurrentPatient,
      saveModuleData,
      getModuleData,
    }}>
      {children}
    </PatientContext.Provider>
  );
}

/** Hook para consumir o contexto do interagente em consulta */
export function usePatient() {
  const ctx = useContext(PatientContext);
  if (!ctx) throw new Error('usePatient must be inside PatientContextProvider');
  return ctx;
}
