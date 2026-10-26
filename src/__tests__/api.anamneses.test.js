import supabase from '../lib/supabase';
import { listAnamneses } from '../lib/api';

jest.mock('../lib/supabase', () => ({
  __esModule: true,
  default: {
    from: jest.fn(),
  },
}));

describe('listAnamneses', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('restores remote patients and preserves local-only patients without duplicate IDs', async () => {
    localStorage.setItem('anamneses', JSON.stringify([
      { id: 1, q01_nome: 'Cópia local antiga' },
      { id: 2, q01_nome: 'Somente local' },
    ]));

    const order = jest.fn().mockResolvedValue({
      data: [{ id: '1', q01_nome: 'Salvo no servidor' }],
      error: null,
    });
    const select = jest.fn().mockReturnValue({ order });
    supabase.from.mockReturnValue({ select });

    const result = await listAnamneses();

    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: '1', q01_nome: 'Salvo no servidor' }),
      expect.objectContaining({ id: 2, q01_nome: 'Somente local' }),
    ]));
    expect(result).toHaveLength(2);
  });
});