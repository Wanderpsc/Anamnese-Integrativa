import { bmiCategory } from './health';

/**
 * Look for legacy anamneses containing a manual `imc` property and
 * migrate to `bmiInfo` objects ({ bmi, category }). Removes the old
 * `imc` property to normalize stored data. Writes back to localStorage
 * and returns the new array.
 */
export function migrateAnamnesesInStorage() {
  try {
    const raw = localStorage.getItem('anamneses') || '[]';
    // create a timestamped backup before mutating anything
    try {
      const ts = new Date().toISOString().replace(/[:.]/g, '-');
      localStorage.setItem(`anamneses.bak.${ts}`, raw);
    } catch (e) {
      // ignore backup failures — still attempt migration
      console.warn('failed to write anamneses backup', e);
    }
    const list = JSON.parse(raw);
    let changed = false;

    const next = (list || []).map((entry) => {
      // if bmiInfo already exists, nothing to do
      if (entry && !entry.bmiInfo && entry.imc != null) {
        const v = Number(entry.imc);
        if (!Number.isNaN(v)) {
          entry.bmiInfo = { bmi: Math.round(v * 10) / 10, category: bmiCategory(v) };
        } else {
          // value isn't numeric, ignore
        }
        delete entry.imc; // remove legacy field
        changed = true;
      }
      return entry;
    });

    if (changed) {
      localStorage.setItem('anamneses', JSON.stringify(next));
    }

    return next;
  } catch (err) {
    // if parse fails, remove corrupted data and return []
    try { localStorage.setItem('anamneses', '[]'); } catch (e) {}
    return [];
  }
}

const migrationsExport = { migrateAnamnesesInStorage };
export default migrationsExport;
