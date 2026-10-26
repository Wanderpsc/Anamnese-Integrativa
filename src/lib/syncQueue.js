/**
 * syncQueue.js
 * Fila de sincronização offline → Supabase.
 * Quando o dispositivo está sem internet, operações de create/update ficam
 * enfileiradas em localStorage. Ao voltar online, são enviadas automaticamente.
 */
import supabase from './supabase';
import { safeSaveAnamneses } from './localStorageSafe';

const QUEUE_KEY = 'offlineSyncQueue';

// ── Leitura / escrita da fila ────────────────────────────────────────────────
function readQueue() {
  try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]'); }
  catch { return []; }
}

function writeQueue(q) {
  try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q)); } catch { /* quota */ }
}

/**
 * Enfileira uma operação para sincronizar depois.
 * @param {'createAnamnese'|'updateAnamnese'|'createAppointment'|'updateAppointmentStatus'} type
 * @param {object} payload - dados necessários para replicar a operação
 */
export function enqueueOperation(type, payload) {
  const q = readQueue();
  q.push({ id: Date.now() + Math.random(), type, payload, enqueuedAt: new Date().toISOString() });
  writeQueue(q);
  dispatchQueueChange();
}

/** Retorna quantas operações estão pendentes. */
export function getPendingCount() {
  return readQueue().length;
}

/** Dispatcha evento global para que componentes possam reagir. */
function dispatchQueueChange() {
  try { window.dispatchEvent(new CustomEvent('syncQueue:changed')); } catch { /* ignore */ }
}

/**
 * Tenta processar toda a fila. Chamado automaticamente ao voltar online.
 * Retorna { synced, failed }.
 */
export async function flushQueue() {
  if (!supabase) return { synced: 0, failed: 0 };
  const q = readQueue();
  if (q.length === 0) return { synced: 0, failed: 0 };

  let synced = 0;
  const remaining = [];

  for (const op of q) {
    try {
      await processOperation(op);
      synced++;
    } catch (e) {
      console.warn(`[syncQueue] Falha ao sincronizar op ${op.type}:`, e.message || e);
      remaining.push(op);
    }
  }

  writeQueue(remaining);
  dispatchQueueChange();

  if (synced > 0) {
    // Notifica que anamneses/appointments foram atualizados
    try { window.dispatchEvent(new CustomEvent('anamneses:updated')); } catch { /* ignore */ }
  }

  return { synced, failed: remaining.length };
}

async function processOperation(op) {
  const { type, payload } = op;

  if (type === 'createAnamnese') {
    const { data, error } = await supabase.from('anamneses').insert([payload.data]).select();
    if (error) throw error;
    // Atualiza id local se mudou
    if (data && data[0] && data[0].id !== payload.data.id) {
      updateLocalAnamneseId(payload.data.id, data[0]);
    }
  }

  else if (type === 'updateAnamnese') {
    const { error } = await supabase.from('anamneses').update(payload.patch).eq('id', payload.id);
    if (error) throw error;
  }

  else if (type === 'createAppointment') {
    const { data, error } = await supabase.from('appointments').insert([payload.data]).select();
    if (error) throw error;
    if (data && data[0] && data[0].id !== payload.data.id) {
      updateLocalAppointmentId(payload.data.id, data[0]);
    }
  }

  else if (type === 'updateAppointmentStatus') {
    const { error } = await supabase.from('appointments').update({ status: payload.status }).eq('id', payload.id);
    if (error) throw error;
  }

  else if (type === 'updateAppointmentFields') {
    const { error } = await supabase.from('appointments').update(payload.fields).eq('id', payload.id);
    if (error) throw error;
  }
}

function updateLocalAnamneseId(oldId, newRow) {
  try {
    const arr = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const idx = arr.findIndex(a => String(a.id) === String(oldId));
    if (idx !== -1) arr[idx] = { ...arr[idx], ...newRow };
    safeSaveAnamneses(arr);
  } catch { /* ignore */ }
}

function updateLocalAppointmentId(oldId, newRow) {
  try {
    const arr = JSON.parse(localStorage.getItem('appointments') || '[]');
    const idx = arr.findIndex(a => String(a.id) === String(oldId));
    if (idx !== -1) arr[idx] = { ...arr[idx], ...newRow };
    localStorage.setItem('appointments', JSON.stringify(arr));
  } catch { /* ignore */ }
}

/**
 * Inicializa o listener de online/offline.
 * Chame uma vez na raiz do app (App.js).
 */
export function initSyncQueue() {
  const handleOnline = async () => {
    console.log('[syncQueue] Voltou online — sincronizando fila...');
    const { synced, failed } = await flushQueue();
    if (synced > 0) {
      try {
        window.dispatchEvent(new CustomEvent('syncQueue:flushed', { detail: { synced, failed } }));
      } catch { /* ignore */ }
    }
  };

  window.addEventListener('online', handleOnline);

  // Tenta sincronizar imediatamente se já online e há pendências
  if (navigator.onLine && getPendingCount() > 0) {
    setTimeout(flushQueue, 2000);
  }

  return () => window.removeEventListener('online', handleOnline);
}
