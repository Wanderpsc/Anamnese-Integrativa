// Helpers to safely persist to localStorage with graceful fallback when space is limited.
export function isQuotaExceeded(err) {
  if (!err) return false;
  return (err.code === 22 || err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED');
}

function stripLargeFieldsFromAnamnese(anamnese) {
  if (!anamnese || typeof anamnese !== 'object') return anamnese;
  const copy = { ...anamnese };
  try {
    // Remove large embedded images and files to reduce localStorage usage
    if (copy.iridologyAnalysis && typeof copy.iridologyAnalysis === 'object') {
      const ir = { ...copy.iridologyAnalysis };
      if (ir.leftIrisImage) { ir.leftIrisImage = undefined; }
      if (ir.rightIrisImage) { ir.rightIrisImage = undefined; }
      if (ir.zoneThumbnails) { ir.zoneThumbnails = undefined; }
      if (ir.signThumbnails) { ir.signThumbnails = undefined; }
      copy.iridologyAnalysis = ir;
    }
    if (copy.biorresonanciaBarraFile && copy.biorresonanciaBarraFile.content) {
      const bf = { ...copy.biorresonanciaBarraFile };
      bf.content = undefined; // drop actual file payload
      copy.biorresonanciaBarraFile = bf;
    }
    if (copy.biorresonanciaAuricularFile && copy.biorresonanciaAuricularFile.content) {
      const bf = { ...copy.biorresonanciaAuricularFile };
      bf.content = undefined;
      copy.biorresonanciaAuricularFile = bf;
    }
  } catch (e) { /* ignore */ }
  return copy;
}

export function safeSaveAnamneses(anamneses) {
  try {
    localStorage.setItem('anamneses', JSON.stringify(anamneses));
    return true;
  } catch (err) {
    if (!isQuotaExceeded(err)) throw err;
    console.warn('localStorage quota exceeded while saving anamneses, attempting fallback: stripping big fields');
    // attempt to strip heavy fields from each anamnese and retry
    try {
      const stripped = anamneses.map(stripLargeFieldsFromAnamnese);
      localStorage.setItem('anamneses', JSON.stringify(stripped));
      // store a small index that indicates some fields were stripped for user awareness
      try { localStorage.setItem('anamneses.stripped', JSON.stringify({ time: new Date().toISOString(), count: anamneses.length })); } catch (e) { /* ignore */ }
      return true;
    } catch (err2) {
      console.error('Failed to save anamneses even after stripping heavy fields', err2);
      return false;
    }
  }
}

function stripLargeFieldsForKey(key, value) {
  if (key === 'anamneses' && Array.isArray(value)) {
    return value.map(stripLargeFieldsFromAnamnese);
  }
  if (key === 'bloodTests' && Array.isArray(value)) {
    return value.map(bt => {
      const copy = { ...bt };
      // remove base64 PDF content that may be heavy
      if (copy.pdfBase64) copy.pdfBase64 = undefined;
      if (copy.base64) copy.base64 = undefined;
      return copy;
    });
  }
  // Generic fallback: return as-is
  return value;
}

export function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    if (!isQuotaExceeded(err)) throw err;
    const stripped = stripLargeFieldsForKey(key, value);
    try {
      localStorage.setItem(key, JSON.stringify(stripped));
      return true;
    } catch (err2) {
      console.error('Failed to set localStorage key after stripping large fields for key', key, err2);
      return false;
    }
  }
}

export default {
  safeSaveAnamneses,
  safeSetItem,
  isQuotaExceeded
};
