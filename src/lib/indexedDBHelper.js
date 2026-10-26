// Minimal IndexedDB helper for storing larger binary or large-sized data like image thumbnails
const DB_NAME = 'anamnese_app_files';
const DB_VERSION = 1;
const STORE_NAME = 'files';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function idbSet(key, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(value, key);
    req.onsuccess = () => { resolve(true); db.close(); };
    req.onerror = () => { reject(req.error); db.close(); };
  });
}

export async function idbGet(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(key);
    req.onsuccess = () => { resolve(req.result); db.close(); };
    req.onerror = () => { reject(req.error); db.close(); };
  });
}

export async function idbDelete(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(key);
    req.onsuccess = () => { resolve(true); db.close(); };
    req.onerror = () => { reject(req.error); db.close(); };
  });
}

export async function migrateIridologyThumbnailsFromLocalStorage() {
  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('iridology-thumbnails-'));
    for (const key of keys) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        await idbSet(key, parsed);
        localStorage.removeItem(key);
      } catch (e) { /* ignore per-key errors */ }
    }
    return true;
  } catch (e) {
    return false;
  }
}

export default {
  idbSet,
  idbGet,
  idbDelete,
};
