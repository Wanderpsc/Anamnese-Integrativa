import SPREADSHEETS from '../config/spreadsheets';

describe('spreadsheets config', () => {
  test('exports the canonical five spreadsheet links requested by user', () => {
    expect(Array.isArray(SPREADSHEETS)).toBe(true);
      // this app should now expose exactly the 5 sheets user requested
      expect(SPREADSHEETS.length).toBe(5);

    const labels = SPREADSHEETS.map((s) => s.label);
      // check labels are the specific set the user asked for
      expect(labels.sort()).toEqual([
        'ANAMNESE INTEGRATIVA',
        'FITOTERAPIA',
        'QUESTIONÁRIO FEMININO',
        'QUESTIONÁRIO MASCULINO',
        'SINTOMAS',
      ].sort());

    SPREADSHEETS.forEach((s) => {
      expect(s).toHaveProperty('id');
      expect(s).toHaveProperty('gid');
      expect(s).toHaveProperty('label');
      expect(s).toHaveProperty('url');
      expect(s).toHaveProperty('exportCsv');
    });

    // the SINTOMAS sheet must expose an exportCsv entry (used for import)
    expect(SPREADSHEETS.some((s) => s.label === 'SINTOMAS' && s.exportCsv && s.exportCsv.startsWith('https://'))).toBe(true);
  });
});
