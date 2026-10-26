import { migrateAnamnesesInStorage } from '../lib/migrations';

describe('migrateAnamnesesInStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('converts legacy imc numbers/strings into bmiInfo and removes imc', () => {
    const old = [
      { id: 1, nome: 'Teste A', imc: '23.4' },
      { id: 2, nome: 'Teste B', imc: 31 },
      { id: 3, nome: 'Sem IMC' },
    ];
    localStorage.setItem('anamneses', JSON.stringify(old));

    const after = migrateAnamnesesInStorage();

    expect(after).toHaveLength(3);

    const a = after.find((x) => x.id === 1);
    expect(a.imc).toBeUndefined();
    expect(a.bmiInfo).toBeDefined();
    expect(a.bmiInfo.bmi).toBe(23.4);

    const b = after.find((x) => x.id === 2);
    expect(b.imc).toBeUndefined();
    expect(b.bmiInfo).toBeDefined();
    expect(b.bmiInfo.bmi).toBe(31.0);

    const c = after.find((x) => x.id === 3);
    expect(c.bmiInfo).toBeUndefined();
    // backup should have been created in localStorage under a key starting with anamneses.bak.
    const keys = Object.keys(localStorage).filter((k) => k.startsWith('anamneses.bak.'));
    expect(keys.length).toBeGreaterThan(0);
  });
});
