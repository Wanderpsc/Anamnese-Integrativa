import { consolidatedToCsvRow } from '../lib/symptoms';

describe('consolidatedToCsvRow', () => {
  test('generates a CSV with SINTOMAS preface (id, patientName, createdAt) and expected fields order', () => {
    const side = {
      id: 'abc-123',
      patientName: 'Maria Souza',
      createdAt: '2024-01-01T10:00:00Z',
      queixa: 'Cansaço',
      tempo: '3 meses',
      tratamentos: 'Nenhum',
      doencasCronicas: 'Hipertensão',
      alergias: 'Nenhuma',
      medicamentos: 'Losartana',
      observacoes: 'Paciente relata fadiga'
    };

    const { headers, row } = consolidatedToCsvRow(side);
    // basic header checks
    expect(headers[0]).toBe('id');
    expect(headers[1]).toBe('patientName');
    expect(headers[2]).toBe('createdAt');
    expect(headers.includes('queixa')).toBe(true);
    expect(headers.includes('observacoes')).toBe(true);

    // the row should include the patientName and id as first items
    const values = row.split(',').map(s => s.replace(/^"|"$/g, ''));
    expect(values[0]).toBe(side.id);
    expect(values[1]).toBe(side.patientName);
    expect(values[2]).toBe(side.createdAt);
    // queixa should be present at correct index
    const idxQueixa = headers.indexOf('queixa');
    expect(values[idxQueixa]).toBe(side.queixa);
  });
});
