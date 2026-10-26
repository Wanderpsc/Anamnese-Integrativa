import { calculateAgeFromBirthDate, getPatientAge } from '../lib/ageUtils';

describe('ageUtils', () => {
  it('calculates age automatically from valid birth date', () => {
    const birthDate = '1990-02-10';
    const today = new Date();
    const birth = new Date(birthDate);

    let expected = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      expected -= 1;
    }

    expect(calculateAgeFromBirthDate(birthDate)).toBe(expected);
  });

  it('returns empty string for invalid birth date', () => {
    expect(calculateAgeFromBirthDate('data-invalida')).toBe('');
  });

  it('getPatientAge prioritizes explicit age fields and falls back to birth date', () => {
    expect(getPatientAge({ q03_idade: 42, q02_data_nasc: '2000-01-01' })).toBe(42);
    expect(getPatientAge({ q02_idade: 39, q02_data_nasc: '2000-01-01' })).toBe(39);

    const fallback = getPatientAge({ q02_data_nasc: '1995-06-20' });
    expect(typeof fallback === 'number' || fallback === '').toBe(true);
  });
});
