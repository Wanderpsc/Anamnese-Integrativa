import { parseCsvToIndex } from '../lib/symptomIndex';
import { generateSuggestions } from '../lib/suggestions';

describe('generateSuggestions using a provided index', () => {
  it('collects suggestions from provided index rows matching simptoma', () => {
    const entry = { id: 'tst-1', nome: 'T1', sintomas: ['azia'] };
    const csv = 'sintoma,sugestao\nazia,Remédio X a considerar';
    const indexData = parseCsvToIndex(csv);

    const result = generateSuggestions(entry, indexData, { suggestionColumns: ['sugestao'] });
    expect(result.some((r) => r.includes('Remédio X a considerar'))).toBe(true);
  });

  it('adds detox and food-plan suggestions automatically for diabetes', () => {
    const entry = {
      id: 'tst-2',
      nome: 'Paciente DM',
      sintomas: ['diabetes_prediabetes'],
      observacoes: 'Paciente com diabetes tipo 2 e glicose elevada'
    };

    const result = generateSuggestions(entry);
    expect(result.some((text) => text.toLowerCase().includes('detox'))).toBe(true);
    expect(result.some((text) => text.toLowerCase().includes('plano alimentar'))).toBe(true);
  });

  it('adds detox and food-plan suggestions automatically for autoimmune and cancer context', () => {
    const entry = {
      id: 'tst-3',
      nome: 'Paciente Autoimune',
      sintomas: ['fadiga'],
      historicoClinico: 'Doença autoimune em seguimento e histórico oncológico (câncer)'
    };

    const result = generateSuggestions(entry);
    const normalized = result.map((text) => text.toLowerCase());

    expect(normalized.some((text) => text.includes('doença autoimune') && text.includes('detox'))).toBe(true);
    expect(normalized.some((text) => text.includes('contexto oncológico') && text.includes('plano alimentar'))).toBe(true);
  });
});
