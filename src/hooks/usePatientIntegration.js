import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * Hook customizado para integração de páginas com o sistema de pacientes
 * Fornece funcionalidades de:
 * - Carregar dados do paciente atual
 * - Salvar dados na anamnese do paciente
 * - Geração de receituário com dados do paciente
 */
export function usePatientIntegration(dataKey) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(null);
  const [currentPatientId, setCurrentPatientId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carregar dados do paciente ao montar o componente
  useEffect(() => {
    const loadPatientData = () => {
      try {
        // Priorizar ID da URL, depois currentPatientId do localStorage
        const patientId = id || localStorage.getItem('currentPatientId');
        
        if (!patientId) {
          console.warn('Nenhum paciente selecionado');
          setLoading(false);
          return;
        }

        const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
        const patient = anamneses.find(a => String(a.id) === String(patientId));

        if (patient) {
          setPatientData(patient);
          setCurrentPatientId(patientId);
          
          // Atualizar currentPatientId no localStorage se veio da URL
          if (id && id !== localStorage.getItem('currentPatientId')) {
            localStorage.setItem('currentPatientId', id);
          }
        } else {
          console.warn(`Paciente ${patientId} não encontrado`);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do paciente:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPatientData();
  }, [id]);

  // Salvar dados na anamnese do paciente
  const saveToPatient = useCallback((data, customKey = null) => {
    if (!currentPatientId) {
      console.error('Nenhum paciente selecionado para salvar dados');
      return false;
    }

    try {
      const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const index = anamneses.findIndex(a => String(a.id) === String(currentPatientId));

      if (index === -1) {
        console.error('Paciente não encontrado');
        return false;
      }

      // Usar dataKey ou customKey para salvar
      const key = customKey || dataKey;
      
      if (key) {
        anamneses[index][key] = data;
        anamneses[index].updatedAt = new Date().toISOString();

        localStorage.setItem('anamneses', JSON.stringify(anamneses));

        // Atualizar estado local
        setPatientData(anamneses[index]);

        // Disparar evento para outras páginas atualizarem
        try {
          window.dispatchEvent(new CustomEvent('anamneses:updated', { 
            detail: anamneses[index] 
          }));
        } catch (e) {
          console.warn('Erro ao disparar evento de atualização:', e);
        }

        console.log(`✅ Dados salvos em ${key} para paciente ${currentPatientId}`);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Erro ao salvar dados do paciente:', error);
      return false;
    }
  }, [currentPatientId, dataKey]);

  // Recuperar dados específicos salvos
  const getPatientData = useCallback((key = null) => {
    if (!patientData) return null;
    return key ? patientData[key] : patientData;
  }, [patientData]);

  // Navegar para o dashboard com o paciente selecionado
  const goToDashboard = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  // Verificar se há um paciente selecionado
  const hasPatient = Boolean(currentPatientId && patientData);

  return {
    patientData,
    currentPatientId,
    loading,
    hasPatient,
    saveToPatient,
    getPatientData,
    goToDashboard,
  };
}
