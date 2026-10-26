import { bmiColor, whrColor } from '../lib/health';

describe('color helpers', () => {
  test('bmiColor maps categories to colors', () => {
    expect(bmiColor('Baixo peso (<18.5)')).toBe('#d0ebff');
    expect(bmiColor('Normal (18.5–24.9)')).toBe('#e6f4ea');
    expect(bmiColor('Sobrepeso (25–29.9)')).toBe('#fff4e0');
    expect(bmiColor('Obesidade Grau I (30–34.9)')).toBe('#ffe6e6');
    expect(bmiColor('Obesidade Grau II (35–39.9)')).toBe('#ffd2d2');
    expect(bmiColor('Obesidade Grau III (>=40)')).toBe('#ffb3b3');
  });

  test('whrColor maps risks to colors', () => {
    expect(whrColor('Baixo risco')).toBe('#e6f4ea');
    expect(whrColor('Risco aumentado')).toBe('#fff4e0');
    expect(whrColor('Risco substancialmente aumentado')).toBe('#ffe6e6');
  });
});
