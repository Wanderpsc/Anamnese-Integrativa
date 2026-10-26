/**
 * Utilities for managing patient history (histórico) across all pages.
 * Each anamnese record can have a `historico` array of entries saved by the user.
 */

/**
 * Appends an entry to a patient's historico log.
 * @param {string|number} anamneseId - The id of the target anamnese
 * @param {{ tipo: string, titulo: string, resumo: string, pagina: string }} entry
 * @returns {boolean} true if saved successfully
 */
export function appendHistoricoEntry(anamneseId, entry) {
  const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
  const idx = anamneses.findIndex(a => String(a.id) === String(anamneseId));
  if (idx === -1) return false;
  if (!Array.isArray(anamneses[idx].historico)) {
    anamneses[idx].historico = [];
  }
  anamneses[idx].historico.push({
    id: `hist-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    data: new Date().toISOString(),
    ...entry,
  });
  localStorage.setItem('anamneses', JSON.stringify(anamneses));
  return true;
}

/**
 * Returns the merged history for a patient:
 * - Explicitly saved entries from `anamnese.historico`
 * - Entries derived from well-known data fields (iridology, bioresonance, etc.)
 * Sorted descending by date.
 */
export function getFullHistorico(anamnese) {
  if (!anamnese) return [];
  const events = [];

  // Explicit entries saved by user
  if (Array.isArray(anamnese.historico)) {
    anamnese.historico.forEach(e => events.push({ ...e, source: 'manual' }));
  }

  // Derived from known stored data fields
  if (anamnese.iridologyAnalysis) {
    const d = anamnese.iridologyAnalysis?.updatedAt || anamnese.iridologyAnalysis?.savedAt || anamnese.updatedAt || anamnese.createdAt;
    if (!events.some(e => e.tipo === 'iridologia_derived')) {
      events.push({ id: 'irid-derived', tipo: 'iridologia_derived', titulo: '👁️ Análise de Iridologia', resumo: 'Análise iridológica registrada', data: d, pagina: `/iridology/${anamnese.id}`, source: 'derived' });
    }
  }
  if (anamnese.biorresonanciaBarraFile) {
    const d = anamnese.biorresonanciaBarraFile.uploadDate || anamnese.updatedAt;
    if (!events.some(e => e.tipo === 'biorresonancia_barra_derived')) {
      events.push({ id: 'biobarra-derived', tipo: 'biorresonancia_barra_derived', titulo: '🌊 Biorressonância BARRA', resumo: `Arquivo: ${anamnese.biorresonanciaBarraFile.name || 'exame'}`, data: d, pagina: `/bioresonance/${anamnese.id}`, source: 'derived' });
    }
  }
  if (anamnese.biorresonanciaAuricularFile) {
    const d = anamnese.biorresonanciaAuricularFile.uploadDate || anamnese.updatedAt;
    if (!events.some(e => e.tipo === 'biorresonancia_auricular_derived')) {
      events.push({ id: 'bioaur-derived', tipo: 'biorresonancia_auricular_derived', titulo: '🌊 Biorressonância AURICULAR', resumo: `Arquivo: ${anamnese.biorresonanciaAuricularFile.name || 'exame'}`, data: d, pagina: `/bioresonance/${anamnese.id}`, source: 'derived' });
    }
  }
  if (anamnese.anamnesisIntegrativa) {
    const d = anamnese.anamnesisIntegrativa?.savedAt || anamnese.updatedAt || anamnese.createdAt;
    if (!events.some(e => e.tipo === 'dialogo_derived')) {
      events.push({ id: 'dialogo-derived', tipo: 'dialogo_derived', titulo: '💬 Diálogo Anamnético', resumo: 'Questionário integrativo respondido', data: d, pagina: `/dialogo-anamnetico/${anamnese.id}`, source: 'derived' });
    }
  }
  if (anamnese.advancedTherapiesData?.length || anamnese.tratamentosHomeopatia?.length || anamnese.tratamentosAromaterapia?.length) {
    const d = anamnese.updatedAt || anamnese.createdAt;
    if (!events.some(e => e.tipo === 'terapias_derived')) {
      events.push({ id: 'terapias-derived', tipo: 'terapias_derived', titulo: '🌿 Homeopatia / Aromaterapia / Óleos', resumo: 'Tratamentos avançados registrados', data: d, pagina: `/advanced-therapies`, source: 'derived' });
    }
  }
  if (anamnese.subclinicData || anamnese.subclinicalData || anamnese.subclinicPoints) {
    const d = anamnese.updatedAt || anamnese.createdAt;
    if (!events.some(e => e.tipo === 'subclinico_derived')) {
      events.push({ id: 'subcl-derived', tipo: 'subclinico_derived', titulo: '🧬 Anamnese Subclínico', resumo: 'Pontos subclínicos registrados', data: d, pagina: `/anamnese-subclinico/${anamnese.id}`, source: 'derived' });
    }
  }
  // Created anamnese itself
  events.push({
    id: `anamnese-${anamnese.id}`,
    tipo: 'anamnese',
    titulo: '📋 Anamnese Criada',
    resumo: `Tipo: ${anamnese.q14_tipo_consulta || '1ª Consulta'}`,
    data: anamnese.createdAt || anamnese.date,
    pagina: `/anamnese/${anamnese.id}`,
    source: 'derived',
  });

  // Sort descending by date
  return events
    .filter(e => e.data)
    .sort((a, b) => new Date(b.data) - new Date(a.data));
}

export const TIPO_COLORS = {
  sintomas: '#ef5350',
  biorressonancia: '#26c6da',
  biorresonancia_barra_derived: '#00acc1',
  biorresonancia_auricular_derived: '#0288d1',
  iridologia: '#ab47bc',
  iridologia_derived: '#ab47bc',
  dialogo: '#5c6bc0',
  dialogo_derived: '#5c6bc0',
  terapias_derived: '#43a047',
  subclinico: '#ff7043',
  subclinico_derived: '#ff7043',
  laboratorial: '#ffa726',
  laboratorial_derived: '#ffa726',
  nutricional: '#66bb6a',
  prescricao: '#26a69a',
  anamnese: '#78909c',
  default: '#90a4ae',
};

export function getTipoColor(tipo) {
  return TIPO_COLORS[tipo] || TIPO_COLORS.default;
}
