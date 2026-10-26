import { safeSaveAnamneses, isQuotaExceeded } from '../lib/localStorageSafe';

describe('localStorageSafe', () => {
  beforeEach(() => {
    // reset mock
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('detects quota exceeded error name correctly', () => {
    const err = new Error('Quota exceeded');
    err.name = 'QuotaExceededError';
    expect(isQuotaExceeded(err)).toBe(true);
  });

  it('attempts to strip heavy fields and succeeds when localStorage first throws then succeeds', () => {
    const anams = [{ id: 1, iridologyAnalysis: { leftIrisImage: 'data:image/png;base64,' + '0'.repeat(5000) } }];
    // Mock setItem: first time throw, second time succeed
    let callCount = 0;
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation((k, v) => {
      callCount++;
      if (callCount === 1) {
        const err = new Error('QuotaExceeded');
        err.name = 'QuotaExceededError';
        throw err;
      }
      // second attempt: succeed but ensure the string doesn't include the leftIrisImage
      expect(v.includes('leftIrisImage')).toBe(false);
      return undefined;
    });

    const result = safeSaveAnamneses(anams);
    expect(result).toBe(true);
  });

  it('returns false when both attempts to save fail', () => {
    const anams = [{ id: 1, iridologyAnalysis: { leftIrisImage: 'data:image/png;base64,' + '0'.repeat(5000) } }];
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      const err = new Error('QuotaExceeded');
      err.name = 'QuotaExceededError';
      throw err;
    });
    const result = safeSaveAnamneses(anams);
    expect(result).toBe(false);
  });
});
