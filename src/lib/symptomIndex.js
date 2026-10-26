import Papa from 'papaparse';

const STORAGE_KEY = 'symptomIndex';
const MAPPING_KEY = 'symptomIndexMapping';

export function loadSymptomIndex() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse symptomIndex from localStorage', err);
    return null;
  }
}

export function clearSymptomIndex() {
  localStorage.removeItem(STORAGE_KEY);
}

export function saveMapping(mapping) {
  localStorage.setItem(MAPPING_KEY, JSON.stringify(mapping));
}

export function loadMapping() {
  try {
    const raw = localStorage.getItem(MAPPING_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

export function parseCsvToIndex(csvText) {
  const parsed = Papa.parse(csvText.trim(), { header: true, skipEmptyLines: true });
  if (parsed.errors && parsed.errors.length) throw new Error(parsed.errors.map((e) => e.message).join('; '));
  return parsed.data;
}

export function saveCsvToIndex(csvText) {
  const data = parseCsvToIndex(csvText);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export function computeScores(selectedSymptomKeys = [], indexData = null, mapping = null) {
  const data = indexData || loadSymptomIndex();
  if (!data || !Array.isArray(data) || !selectedSymptomKeys?.length) return {};

  // accumulator keyed by column name (columns that look numeric)
  const acc = {};

  function addNumericFields(row, columns) {
    const cols = Array.isArray(columns) && columns.length ? columns : Object.keys(row);
    Object.entries(row).forEach(([k, v]) => {
      if (!cols.includes(k)) return;
      // skip empty
      if (v === null || v === undefined || v === '') return;
      // try parse number
      const num = Number(v.replace(',', '.'));
      if (!Number.isFinite(num)) return;
      acc[k] = (acc[k] || 0) + num;
    });
  }

  // for each selected symptom key, try to find matching row(s)
  // If mapping provided and has a symptom column, match only against that column
  const numericColumns = mapping && Array.isArray(mapping.numericColumns) ? mapping.numericColumns : null;
  const symptomColumn = mapping && mapping.symptomColumn ? mapping.symptomColumn : null;

  selectedSymptomKeys.forEach((sym) => {
    const s = String(sym).toLowerCase();
    let matched;
    if (symptomColumn) {
      matched = data.filter((row) => String(row[symptomColumn] || '').toLowerCase().includes(s));
    } else {
      matched = data.filter((row) => Object.values(row).some((cell) => String(cell).toLowerCase().includes(s)));
    }
    if (matched.length) {
      matched.forEach((r) => addNumericFields(r, numericColumns));
    }
  });

  // Round values
  Object.keys(acc).forEach((k) => { acc[k] = Math.round(acc[k] * 100) / 100; });
  return acc;
}

const symptomIndexAPI = { loadSymptomIndex, clearSymptomIndex, parseCsvToIndex, saveCsvToIndex, computeScores };

export default symptomIndexAPI;
