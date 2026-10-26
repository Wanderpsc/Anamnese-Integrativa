// Utilities for consolidating Exames (Iridologia, Biorressonância, Exames de Sangue)
export function gatherPatientExams(anamneses = [], bloodTests = [], patientName) {
  const patientAnams = anamneses.filter(a => a.q01_nome === patientName).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  const iridology = patientAnams
    .filter(a => a.iridologyAnalysis)
    .map(a => ({ id: a.id, createdAt: a.createdAt, analysis: a.iridologyAnalysis }));
  const biorresonancia = patientAnams
    .flatMap(a => {
      const list = [];
      if (a.biorresonanciaBarraAnalysis || a.biorresonanciaBarraFile) list.push({ id: a.id, createdAt: a.createdAt, type: 'barra', analysis: a.biorresonanciaBarraAnalysis, file: a.biorresonanciaBarraFile });
      if (a.biorresonanciaAuricularAnalysis || a.biorresonanciaAuricularFile) list.push({ id: a.id, createdAt: a.createdAt, type: 'auricular', analysis: a.biorresonanciaAuricularAnalysis, file: a.biorresonanciaAuricularFile });
      return list;
    }).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  const patientBloodTests = bloodTests.filter(t => t.patientName === patientName).sort((a,b) => new Date(b.testDate || b.createdAt) - new Date(a.testDate || a.createdAt));
  return { iridology, biorresonancia, bloodTests: patientBloodTests };
}

export function computeConsolidatedExams(patientExams) {
  if (!patientExams) return null;
  const latestIridology = (patientExams.iridology && patientExams.iridology[0]) || null;
  const latestBior = (patientExams.biorresonancia && patientExams.biorresonancia[0]) || null;
  const latestBlood = (patientExams.bloodTests && patientExams.bloodTests[0]) || null;
  return { latestIridology, latestBior, latestBlood };
}

export function buildConsolidatedExamsHtml(patientName, consolidated) {
  if (!consolidated) return '';
  const parts = [];
  parts.push(`<h2>Resumo Consolidado de Exames - ${patientName}</h2>`);
  parts.push('<hr/>');
  if (consolidated.latestIridology) {
    const ir = consolidated.latestIridology;
    parts.push('<div style="margin-bottom:12px">');
    parts.push('<h3>👁️ Iridologia (Última)</h3>');
    if (typeof ir.analysis === 'string') {
      parts.push(`<div>${ir.analysis}</div>`);
    } else {
      if (ir.analysis.generalFindings) parts.push(`<div><strong>Achados Gerais:</strong> ${ir.analysis.generalFindings}</div>`);
      if (ir.analysis.organSystems) parts.push(`<div><strong>Sistemas:</strong> ${Object.keys(ir.analysis.organSystems).join(', ')}</div>`);
    }
    parts.push('</div>');
  }
  if (consolidated.latestBior) {
    const b = consolidated.latestBior;
    parts.push('<div style="margin-bottom:12px">');
    parts.push(`<h3>📊 Biorressonância (Última - ${b.type || 'desconhecido'})</h3>`);
    if (b.analysis) parts.push(`<div>${b.analysis}</div>`);
    if (b.file && b.file.name) parts.push(`<div><strong>Arquivo:</strong> ${b.file.name}</div>`);
    parts.push('</div>');
  }
  if (consolidated.latestBlood) {
    const bl = consolidated.latestBlood;
    parts.push('<div style="margin-bottom:12px">');
    parts.push('<h3>🩸 Exame de Sangue (Último)</h3>');
    parts.push(`<div><strong>Data:</strong> ${new Date(bl.testDate || bl.createdAt).toLocaleDateString('pt-BR')}</div>`);
    if (bl.laboratory) parts.push(`<div><strong>Laboratório:</strong> ${bl.laboratory}</div>`);
    if (bl.observations || bl.observacao) parts.push(`<div><strong>Observações:</strong> ${bl.observations || bl.observacao}</div>`);
    parts.push('</div>');
  }
  return `<div style="font-family:sans-serif;">${parts.join('')}</div>`;
}

export function examsToCsvRows(patientExams) {
  const rows = [];
  const safe = (v) => `"${String(v || '').replace(/"/g, '""')}"`;
  // Header row
  const header = ['type', 'date', 'lab_or_file', 'summary', 'details'];
  rows.push(header.join(','));
  // Iridology
  (patientExams.iridology || []).forEach(ir => {
    const date = new Date(ir.createdAt || '').toISOString();
    const summary = typeof ir.analysis === 'string' ? ir.analysis.substring(0, 200) : (ir.analysis.generalFindings || '');
    const details = typeof ir.analysis === 'object' ? JSON.stringify(ir.analysis) : '';
    rows.push([safe('iridology'), safe(date), safe(''), safe(summary), safe(details)].join(','));
  });
  // Biorresonance
  (patientExams.biorresonancia || []).forEach(b => {
    const date = new Date(b.createdAt || '').toISOString();
    const summary = b.analysis ? String(b.analysis).substring(0, 200) : '';
    const fileStr = b.file && b.file.name ? b.file.name : '';
    rows.push([safe('biorresonance'), safe(date), safe(fileStr), safe(summary), safe(JSON.stringify(b))].join(','));
  });
  // Blood tests
  (patientExams.bloodTests || []).forEach(bl => {
    const date = new Date(bl.testDate || bl.createdAt || '').toISOString();
    const summary = bl.laboratory || bl.requestingDoctor || '';
    rows.push([safe('bloodtest'), safe(date), safe(summary), safe(''), safe(JSON.stringify(bl))].join(','));
  });
  return rows.join('\n');
}

export default {
  gatherPatientExams,
  computeConsolidatedExams,
  buildConsolidatedExamsHtml,
  examsToCsvRows
};
