import supabase from './supabase';
import { safeSaveAnamneses } from './localStorageSafe';
import { enqueueOperation } from './syncQueue';

// Helper to use Supabase if available, otherwise fallback to localStorage

export async function listAnamneses() {
  if (supabase) {
    const { data, error } = await supabase.from('anamneses').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    // Merge with local anamneses to avoid losing items created locally
    const local = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const map = {};
    data.forEach(d => { map[String(d.id)] = d; });
    local.forEach(l => { if (!map[String(l.id)]) map[String(l.id)] = l; });
    return Object.values(map).sort((a, b) => (a.created_at || a.createdAt || '') < (b.created_at || b.createdAt || '') ? 1 : -1);
  }
  return JSON.parse(localStorage.getItem('anamneses') || '[]');
}

export async function createAnamnese(data) {
  // Helper to find existing anamnese by unique identifiers (CPF, email), or fallback to name+dob
  const findExistingIndex = (arr, datum) => {
    if (!Array.isArray(arr) || !datum) return -1;
    const cpf = (datum.q14_cpf || '').toString().trim();
    const email = (datum.q12_email || '').toString().toLowerCase().trim();
    const name = (datum.q01_nome || '').toString().toLowerCase().trim();
    const dob = datum.q02_data_nasc || '';
    return arr.findIndex(a => {
      try {
        if (cpf && a.q14_cpf && a.q14_cpf.toString().trim() === cpf) return true;
        if (email && a.q12_email && a.q12_email.toString().toLowerCase().trim() === email) return true;
        if (name && dob && a.q01_nome && a.q02_data_nasc && a.q01_nome.toString().toLowerCase().trim() === name && a.q02_data_nasc === dob) return true;
        return false;
      } catch (e) { return false; }
    });
  };

  if (supabase) {
    try {
      // Try insert; if conflict occurs on DB it may error. We'll still keep a local upsert fallback.
      const { data: created, error } = await supabase.from('anamneses').insert([data]).select();
      if (error) throw error;
      const createdRow = created && created[0] ? created[0] : data;
      // ensure local cache has it too (upsert merge)
      try {
        const arr = JSON.parse(localStorage.getItem('anamneses') || '[]');
        const idx = findExistingIndex(arr, createdRow);
        if (idx >= 0) {
          arr[idx] = { ...arr[idx], ...createdRow, updated_at: new Date().toISOString() };
        } else {
          arr.push(createdRow);
        }
        try { if (!safeSaveAnamneses(arr)) console.warn('Failed to fully save anamneses locally'); } catch(e) { console.warn('save anamneses failed', e); }
        try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: createdRow })); } catch (e) { /* ignore */ }
      } catch (e) {}
      return createdRow;
    } catch (err) {
      console.warn('Supabase insert failed for createAnamnese, falling back to localStorage/upsert', err.message || err);
      enqueueOperation('createAnamnese', { data });
      // Continue to local fallback below
    }
  }

  // Local fallback: do a local upsert in anamneses array to ensure interagentes list is not duplicated
  try {
    const arr = JSON.parse(localStorage.getItem('anamneses') || '[]') || [];
    const idx = findExistingIndex(arr, data);
    if (idx >= 0) {
      const merged = { ...arr[idx], ...data, updated_at: new Date().toISOString() };
      arr[idx] = merged;
      try { if (!safeSaveAnamneses(arr)) console.warn('Failed to fully save anamneses locally'); } catch(e) { console.warn('save anamneses failed', e); }
      try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: merged })); } catch (e) { /* ignore */ }
      return merged;
    }
    // No existing match: push as new and dispatch event
    const toInsert = { ...data };
    arr.push(toInsert);
    try { if (!safeSaveAnamneses(arr)) console.warn('Failed to fully save anamneses locally'); } catch(e) { console.warn('save anamneses failed', e); }
    try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: toInsert })); } catch (e) { /* ignore */ }
    return toInsert;
  } catch (e) {
    // As a last resort, just write the single item and return
    try {
      try { if (!safeSaveAnamneses([data])) console.warn('Failed to fully save anamneses locally'); } catch(e) { console.warn('save anamneses failed', e); }
      try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: data })); } catch (e2) { /* ignore */ }
    } catch (e2) { /* ignore */ }
    return data;
  }
}

export async function updateAnamnese(id, patch) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('anamneses').update(patch).eq('id', id).select();
      if (error) throw error;
    } catch (err) {
      console.warn('Supabase updateAnamnese failed, falling back to localStorage', err.message || err);
      enqueueOperation('updateAnamnese', { id, patch });
    }
  }
  // Always update localStorage as well
  try {
    const arr = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const idx = arr.findIndex(a => String(a.id) === String(id));
    if (idx !== -1) {
      arr[idx] = { ...arr[idx], ...patch, updated_at: new Date().toISOString() };
      try { if (!safeSaveAnamneses(arr)) console.warn('Failed to fully save anamneses locally'); } catch (e) { console.warn(e); }
      try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: arr[idx] })); } catch (e) { /* ignore */ }
      return arr[idx];
    }
  } catch (e) { console.warn('updateAnamnese localStorage error', e); }
  return null;
}

export async function listAppointments() {
  const deletedIds = new Set(JSON.parse(localStorage.getItem('deletedAppointmentIds') || '[]').map(String));
  if (supabase) {
    const { data, error } = await supabase.from('appointments').select('*').order('date', { ascending: true });
    if (error) throw error;
    // Merge with any locally created appointments in localStorage that may not be in Supabase yet.
    // Also carry over patient-action fields (patientStatus, patientActionAt, patientCancelReason)
    // from localStorage when the Supabase record doesn't have them (e.g. columns not yet migrated).
    const local = JSON.parse(localStorage.getItem('appointments') || '[]');
    const localMap = {};
    local.forEach(l => { localMap[String(l.id)] = l; });
    const map = {};
    data.forEach(d => {
      if (!deletedIds.has(String(d.id))) {
        const loc = localMap[String(d.id)];
        // Prefer Supabase values, but fall back to local for patient-action fields if missing
        map[String(d.id)] = loc ? {
          ...d,
          patientStatus: d.patientStatus || loc.patientStatus || undefined,
          patientActionAt: d.patientActionAt || loc.patientActionAt || undefined,
          patientCancelReason: d.patientCancelReason || loc.patientCancelReason || undefined,
        } : d;
      }
    });
    local.forEach(l => { if (!deletedIds.has(String(l.id))) map[String(l.id)] = map[String(l.id)] || l; });
    return Object.values(map).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  }
  const local = JSON.parse(localStorage.getItem('appointments') || '[]');
  return local.filter(a => !deletedIds.has(String(a.id)));
}

export async function createAppointment(data) {
  if (supabase) {
    try {
    const { data: created, error } = await supabase.from('appointments').insert([data]).select();
    if (error) throw error;
    console.log('api.createAppointment created via supabase:', created && created[0]);
    // Ensure local cache also gets the created appointment (dedupe by id)
    try {
      const arr = JSON.parse(localStorage.getItem('appointments') || '[]') || [];
      const id = created[0]?.id || data.id;
      const exists = arr.find(a => a.id === id);
      if (!exists) {
        arr.push(created[0]);
        localStorage.setItem('appointments', JSON.stringify(arr));
      }
    } catch (e) {
      // ignore local store errors
    }
    return created[0];
    } catch (err) {
      console.warn('Supabase createAppointment failed', err.message || err);
      if (!navigator.onLine) enqueueOperation('createAppointment', { data });
    }
  }
  const arr = JSON.parse(localStorage.getItem('appointments') || '[]') || [];
  const exists = arr.find(a => a.id === data.id);
  if (!exists) arr.push(data);
  console.log('api.createAppointment saved locally:', data);
  localStorage.setItem('appointments', JSON.stringify(arr));
  return data;
}

export async function updateAppointmentStatus(id, status) {
  if (supabase) {
    const { data, error } = await supabase.from('appointments').update({ status }).eq('id', id).select();
    if (error) throw error;
    // Keep local storage synchronized as well
    try {
      const arr = JSON.parse(localStorage.getItem('appointments') || '[]');
      const idx = arr.findIndex(a => String(a.id) === String(id));
      if (idx !== -1) {
        arr[idx].status = status;
        localStorage.setItem('appointments', JSON.stringify(arr));
      }
    } catch (e) {
      // ignore
    }
    return data[0];
  }
  const arr = JSON.parse(localStorage.getItem('appointments') || '[]');
  const idx = arr.findIndex(a => String(a.id) === String(id));
  if (idx !== -1) {
    arr[idx].status = status;
    localStorage.setItem('appointments', JSON.stringify(arr));
    return arr[idx];
  }
  return null;
}

export async function deleteAppointment(id) {
  // Registra no blocklist local para garantir que nunca volte via merge com Supabase
  try {
    const deletedIds = JSON.parse(localStorage.getItem('deletedAppointmentIds') || '[]');
    if (!deletedIds.includes(String(id))) {
      deletedIds.push(String(id));
      localStorage.setItem('deletedAppointmentIds', JSON.stringify(deletedIds));
    }
  } catch (e) {}

  if (supabase) {
    const { data, error } = await supabase.from('appointments').delete().eq('id', id);
    if (error) throw error;
    // Also remove local cache
    try {
      const arr = JSON.parse(localStorage.getItem('appointments') || '[]');
      const newArr = arr.filter(a => String(a.id) !== String(id));
      localStorage.setItem('appointments', JSON.stringify(newArr));
    } catch (e) {}
    return true;
  }
  const arr = JSON.parse(localStorage.getItem('appointments') || '[]');
  const newArr = arr.filter(a => String(a.id) !== String(id));
  localStorage.setItem('appointments', JSON.stringify(newArr));
  return true;
}

export async function getAppointmentById(id) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('appointments').select('*').eq('id', id).single();
      if (error) throw error;
      if (data) return data;
    } catch (e) { /* fallback */ }
  }
  const arr = JSON.parse(localStorage.getItem('appointments') || '[]');
  return arr.find(a => String(a.id) === String(id)) || null;
}

export async function updateAppointmentFields(id, fields) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('appointments').update(fields).eq('id', id).select();
      if (error) {
        console.error('[updateAppointmentFields] Supabase error (colunas podem estar faltando na tabela):', error);
        throw error;
      }
      // Success in Supabase — also update local cache so same-device view reflects change immediately
      const arr = JSON.parse(localStorage.getItem('appointments') || '[]');
      const idx = arr.findIndex(a => String(a.id) === String(id));
      if (idx !== -1) {
        arr[idx] = { ...arr[idx], ...fields };
        localStorage.setItem('appointments', JSON.stringify(arr));
      }
      try { window.dispatchEvent(new CustomEvent('appointments:updated', { detail: data?.[0] })); } catch (e) { /* ignore */ }
      return data?.[0] ?? null;
    } catch (e) {
      console.error('[updateAppointmentFields] Falhou no Supabase, gravando só em localStorage local:', e);
      // Fall through to localStorage-only update (only works on same device/browser)
    }
  }
  const arr = JSON.parse(localStorage.getItem('appointments') || '[]');
  const idx = arr.findIndex(a => String(a.id) === String(id));
  if (idx !== -1) {
    arr[idx] = { ...arr[idx], ...fields };
    localStorage.setItem('appointments', JSON.stringify(arr));
    try { window.dispatchEvent(new CustomEvent('appointments:updated', { detail: arr[idx] })); } catch (e) { /* ignore */ }
    return arr[idx];
  }
  return null;
}

export async function deleteAnamnese(id) {
  if (supabase) {
    const { data, error } = await supabase.from('anamneses').delete().eq('id', id);
    if (error) throw error;
    // also remove from local storage
    try {
      const arr = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const newArr = arr.filter(a => String(a.id) !== String(id));
      try { if (!safeSaveAnamneses(newArr)) console.warn('Failed to fully save anamneses locally'); } catch(e) { console.warn(e); }
      try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: { id } })); } catch (e) { /* ignore */ }
    } catch (e) {}
    return true;
  }
  const arr = JSON.parse(localStorage.getItem('anamneses') || '[]');
  const newArr = arr.filter(a => String(a.id) !== String(id));
  try { if (!safeSaveAnamneses(newArr)) console.warn('Failed to fully save anamneses locally'); } catch(e) { console.warn(e); }
  try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: { id } })); } catch (e) { /* ignore */ }
  return true;
}

// Generic settings getter/setter
export async function getSetting(key) {
  // check supabase first
  if (supabase) {
    try {
      const { data, error } = await supabase.from('settings').select('*').eq('key', key).limit(1).single();
      if (!error && data) return data.value;
    } catch (e) {
      // ignore and fallback to localStorage
    }
  }
  try {
    return JSON.parse(localStorage.getItem('settings') || '{}')[key] || null;
  } catch (e) {
    return localStorage.getItem(key) || null;
  }
}

export async function setSetting(key, value) {
  if (supabase) {
    try {
      // upsert
      const { data, error } = await supabase.from('settings').upsert({ key, value }).select();
      if (error) throw error;
      // keep local cache in sync
      try {
        const settings = JSON.parse(localStorage.getItem('settings') || '{}');
        settings[key] = value;
        localStorage.setItem('settings', JSON.stringify(settings));
      } catch (e) {}
      return data && data[0];
    } catch (e) {
      console.warn('Supabase setSetting failed, falling back to localStorage', e.message || e);
    }
  }
  const settings = JSON.parse(localStorage.getItem('settings') || '{}');
  settings[key] = value;
  localStorage.setItem('settings', JSON.stringify(settings));
  return { key, value };
}

// Draft / publishing helpers
export async function getSettingDraft(key) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('settings_draft').select('*').eq('key', key).limit(1).single();
      if (error) throw error;
      return data?.value || null;
    } catch (e) {
      // fallback to local
    }
  }
  try {
    const drafts = JSON.parse(localStorage.getItem('settings_draft') || '{}');
    return drafts[key] || null;
  } catch (e) {
    return null;
  }
}

export async function setSettingDraft(key, value, updated_by = null) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('settings_draft').upsert({ key, value, updated_by }).select();
      if (error) throw error;
      // keep local in sync
      const drafts = JSON.parse(localStorage.getItem('settings_draft') || '{}');
      drafts[key] = value;
      localStorage.setItem('settings_draft', JSON.stringify(drafts));
      return data[0];
    } catch (e) {
      // fallback
    }
  }
  const drafts = JSON.parse(localStorage.getItem('settings_draft') || '{}');
  drafts[key] = value;
  localStorage.setItem('settings_draft', JSON.stringify(drafts));
  return { key, value };
}

export async function publishSetting(key, publishedBy = null) {
  // publish: move from draft to settings and record history
  const draftValue = await getSettingDraft(key);
  const currentValue = await getSetting(key);
  if (supabase) {
    try {
      // update settings
      const { data: up, error: errUp } = await supabase.from('settings').upsert({ key, value: draftValue }).select();
      if (errUp) throw errUp;
      // insert history
      const { data: h, error: errH } = await supabase.from('settings_history').insert([{ key, old_value: currentValue, new_value: draftValue, changed_by: publishedBy, action: 'publish' }]).select();
      if (errH) throw errH;
      // clear draft
      await supabase.from('settings_draft').delete().eq('key', key);
      // sync local
      const settings = JSON.parse(localStorage.getItem('settings') || '{}');
      settings[key] = draftValue;
      localStorage.setItem('settings', JSON.stringify(settings));
      const drafts = JSON.parse(localStorage.getItem('settings_draft') || '{}');
      delete drafts[key];
      localStorage.setItem('settings_draft', JSON.stringify(drafts));
      return { key, value: draftValue };
    } catch (e) {
      console.warn('publishSetting failed', e.message || e);
    }
  }
  // local-only fallback
  const settings = JSON.parse(localStorage.getItem('settings') || '{}');
  settings[key] = draftValue;
  localStorage.setItem('settings', JSON.stringify(settings));
  const drafts = JSON.parse(localStorage.getItem('settings_draft') || '{}');
  delete drafts[key];
  localStorage.setItem('settings_draft', JSON.stringify(drafts));
  const history = JSON.parse(localStorage.getItem('settings_history') || '[]');
  history.push({ id: Date.now(), key, old_value: currentValue, new_value: draftValue, changed_by: publishedBy, action: 'publish', changed_at: new Date().toISOString() });
  localStorage.setItem('settings_history', JSON.stringify(history));
  return { key, value: draftValue };
}

export async function getSettingsHistory(key) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('settings_history').select('*').eq('key', key).order('changed_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      // fallback
    }
  }
  return JSON.parse(localStorage.getItem('settings_history') || '[]').filter(h => h.key === key).sort((a, b) => - (new Date(a.changed_at) - new Date(b.changed_at)));
}
