import { evaluateProtocolSafety, normalizeClinicalContext } from '../lib/clinicalSafety';

describe('clinicalSafety', () => {
  test('normalizes complaint aliases from integrative data', () => {
    const context = normalizeClinicalContext({
      q05_queixa_principal: 'Fadiga persistente',
      anamnesisIntegrativaData: { q17a_sintomas_selecionados: ['Insônia'] },
    });

    expect(context.symptoms).toEqual(['Fadiga persistente', 'Insônia']);
  });

  test('flags protocol items that need review for pregnancy and anticoagulation', () => {
    const review = evaluateProtocolSafety(
      {
        q01_nome: 'Paciente',
        q24_medicamentos_uso: 'Varfarina',
        anamnesisIntegrativaData: { gestacao: 'gestante' },
      },
      { herbs: ['Sene 20 mg'], supplements: ['Ômega-3 2 g/dia'] },
    );

    expect(review.status).toBe('review_required');
    expect(review.matchedRisks.map(item => item.risk)).toEqual(expect.arrayContaining(['pregnancy', 'anticoagulation']));
    expect(review.warnings.length).toBeGreaterThan(2);
  });

  test('raises an urgent warning for clinical red flags', () => {
    const review = evaluateProtocolSafety({ queixaPrincipal: 'Dor no peito intensa' }, { herbs: ['Camomila'] });

    expect(review.matchedRisks.some(item => item.risk === 'redFlag')).toBe(true);
    expect(review.warnings[0]).toMatch(/Sinal de alarme/);
  });
});
