// Utilities for converting plant suggestions into CSV and HTML
export function buildPlantsCsv(plants, medicationQuery = '', checkInteractionsFn = (p,m)=>({interacts:false, details:[]})) {
  const headers = ['id', 'common', 'scientific', 'indications', 'contraindications', 'interactions', 'interactionWarnings', 'posology', 'dosage', 'actives', 'risks', 'modeOfUse'];
  const rows = [headers];
  plants.forEach(p => {
    const inter = checkInteractionsFn(p, medicationQuery);
    rows.push([
      p.id,
      p.common,
      p.scientific,
      (p.indications || []).join('; '),
      (p.contraindications || []).join('; '),
      (p.interactions || []).join('; '),
      inter.details.join('; '),
      p.posology || '',
      p.dosage || '',
      (p.actives || []).join(', '),
      (p.risks || []).join('; '),
      p.modeOfUse || ''
    ]);
  });
  const csv = rows.map(r => r.map(cell => `"${String(cell || '').replace(/"/g, '\"\"')}"`).join(',')).join('\n');
  return { headers, csv };
}

export default buildPlantsCsv;
