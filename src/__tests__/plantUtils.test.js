import buildPlantsCsv from '../lib/plantUtils';

describe('buildPlantsCsv', () => {
  it('generates CSV string with correct headers including interactionWarnings', () => {
    const testPlant = {
      id: 'test-1',
      common: 'Alho',
      scientific: 'Allium sativum',
      indications: ['hipertensão'],
      contraindications: [],
      interactions: ['warfarin'],
      posology: 'Pouco',
      dosage: '1',
      actives: ['alicina'],
      risks: [],
      modeOfUse: 'Culinária'
    };
    const checkInteractions = (p, meds) => ({ interacts: true, details: ['warfarin ↔ garlic'] });
    const { headers, csv } = buildPlantsCsv([testPlant], 'warfarin', checkInteractions);
    expect(headers).toContain('interactionWarnings');
    expect(csv).toContain('warfarin ↔ garlic');
    expect(csv.split('\n')[0].split(',').map(h => h.replace(/"/g, ''))[0]).toBe('id');
  });
});
