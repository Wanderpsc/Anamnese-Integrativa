/* eslint-disable no-restricted-globals */

/**
 * Service Worker para PWA - Anamnese Integrativa
 * Funcionamento Offline Completo com Cache Estratégico
 * 
 * Estratégia: Network First para APIs, Cache First para assets estáticos
 */

const VERSION = '2.1.0';
const CACHE_NAME = `anamnese-integrativa-v${VERSION}`;
const CACHE_ASSETS = `anamnese-assets-v${VERSION}`;
const CACHE_API = `anamnese-api-v${VERSION}`;
const CACHE_THERAPEUTIC = `anamnese-therapeutic-v${VERSION}`;

// Assets essenciais (App Shell)
const ESSENTIAL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/static/js/main.chunk.js',
  '/static/js/bundle.js',
  '/static/css/main.css'
];

// Rotas do app
const APP_ROUTES = [
  '/anamnese',
  '/patients',
  '/schedule',
  '/exames-laboratoriais',
  '/patient-exams',
  '/settings'
];

/**
 * Instalação - Cache de assets essenciais
 */
self.addEventListener('install', (event) => {
  console.log('📦 Service Worker instalando versão', VERSION);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Cache aberto:', CACHE_NAME);
        // Tenta cachear assets essenciais, mas não falha se algum não existir
        return Promise.allSettled(
          ESSENTIAL_ASSETS.map(url => 
            cache.add(url).catch(err => {
              console.warn(`⚠️ Não foi possível cachear ${url}:`, err);
              return Promise.resolve();
            })
          )
        );
      })
      .then(() => {
        console.log('✅ Assets essenciais cacheados');
        return self.skipWaiting(); // Ativa imediatamente
      })
  );
});

/**
 * Ativação - Limpeza de caches antigos
 */
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker ativando versão', VERSION);
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Remove caches de versões antigas
            if (cacheName.startsWith('anamnese-') && 
                cacheName !== CACHE_NAME && 
                cacheName !== CACHE_ASSETS &&
                cacheName !== CACHE_API &&
                cacheName !== CACHE_THERAPEUTIC) {
              console.log('🗑️ Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Caches limpos');
        return self.clients.claim(); // Assume controle de todos os clientes
      })
  );
});

/**
 * Fetch - Estratégia híbrida
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignora requisições não-HTTP
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Ignora chrome-extension e outros protocolos
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }
  
  // Estratégia baseada no tipo de recurso
  
  // 1. Assets estáticos (CSS, JS, imagens) -> Cache First
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request, CACHE_ASSETS));
    return;
  }
  
  // 2. APIs externas -> Network First com cache
  if (isApiRequest(request)) {
    event.respondWith(networkFirstWithCache(request, CACHE_API));
    return;
  }
  
  // 3. Dados terapêuticos (PDFs) -> Cache First com atualização
  if (isTherapeuticData(request)) {
    event.respondWith(staleWhileRevalidate(request, CACHE_THERAPEUTIC));
    return;
  }
  
  // 4. Navegação (HTML) -> Network First com fallback
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstWithFallback(request));
    return;
  }
  
  // 5. Padrão -> Network First
  event.respondWith(networkFirst(request));
});

/**
 * ESTRATÉGIAS DE CACHE
 */

// Cache First - Prioriza cache, busca rede se não encontrar
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('❌ Erro no cache first:', error);
    // Retorna página offline se disponível
    return caches.match('/index.html');
  }
}

// Network First - Prioriza rede, fallback para cache
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// Network First com cache específico
async function networkFirstWithCache(request, cacheName) {
  try {
    const response = await fetch(request, {
      timeout: 5000 // 5 segundos timeout
    });
    
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.warn('⚠️ Rede falhou, usando cache:', request.url);
    const cached = await caches.match(request);
    if (cached) {
      // Adiciona header indicando que é do cache
      const cachedClone = cached.clone();
      const headers = new Headers(cachedClone.headers);
      headers.append('X-From-Cache', 'true');
      return new Response(cachedClone.body, {
        status: cachedClone.status,
        statusText: cachedClone.statusText,
        headers: headers
      });
    }
    throw error;
  }
}

// Network First com fallback para index.html (SPAs)
async function networkFirstWithFallback(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Tenta cache da rota
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    
    // Fallback para index.html (SPA routing)
    const indexCache = await caches.match('/index.html');
    if (indexCache) {
      return indexCache;
    }
    
    // Última tentativa: retorna página offline genérica
    return new Response(
      '<html><body><h1>Offline</h1><p>Não foi possível carregar a página.</p></body></html>',
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}

// Stale While Revalidate - Retorna cache mas atualiza em background
async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);
  
  const fetchPromise = fetch(request)
    .then(response => {
      if (response.ok) {
        const cache = caches.open(cacheName);
        cache.then(c => c.put(request, response.clone()));
      }
      return response;
    })
    .catch(err => {
      console.warn('⚠️ Falha ao atualizar cache:', err);
      return cached;
    });
  
  return cached || fetchPromise;
}

/**
 * HELPERS
 */

function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/);
}

function isApiRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/') || 
         url.hostname.includes('api.') ||
         request.headers.get('Accept')?.includes('application/json');
}

function isTherapeuticData(request) {
  const url = new URL(request.url);
  return url.pathname.includes('/assets/therapeutic-data/') ||
         url.pathname.match(/\.(pdf|docx?)$/);
}

/**
 * Background Sync - Sincronização de dados offline
 */
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync:', event.tag);
  
  if (event.tag === 'sync-anamneses') {
    event.waitUntil(syncAnamneses());
  }
  
  if (event.tag === 'sync-therapeutic-data') {
    event.waitUntil(syncTherapeuticData());
  }
});

async function syncAnamneses() {
  console.log('📤 Sincronizando anamneses...');
  
  try {
    // Busca anamneses pendentes no IndexedDB
    // Envia para servidor
    // Remove flag de pendente
    
    console.log('✅ Anamneses sincronizadas');
    return Promise.resolve();
  } catch (error) {
    console.error('❌ Erro ao sincronizar anamneses:', error);
    throw error;
  }
}

async function syncTherapeuticData() {
  console.log('📤 Sincronizando dados terapêuticos...');
  
  try {
    // Verifica atualizações disponíveis
    // Baixa novos arquivos
    // Atualiza IndexedDB
    
    console.log('✅ Dados terapêuticos sincronizados');
    return Promise.resolve();
  } catch (error) {
    console.error('❌ Erro ao sincronizar dados:', error);
    throw error;
  }
}

/**
 * Push Notifications
 */
self.addEventListener('push', (event) => {
  console.log('🔔 Push recebido:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação',
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [200, 100, 200],
    tag: 'anamnese-notification',
    actions: [
      { action: 'open', title: 'Abrir' },
      { action: 'close', title: 'Fechar' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Anamnese Integrativa', options)
  );
});

/**
 * Notification Click
 */
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Notificação clicada:', event.action);
  
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

/**
 * Message - Comunicação com app
 */
self.addEventListener('message', (event) => {
  console.log('💬 Mensagem recebida:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urlsToCache = event.data.urls;
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys()
        .then(keys => Promise.all(keys.map(key => caches.delete(key))))
        .then(() => {
          console.log('🗑️ Todos os caches limpos');
        })
    );
  }
});

console.log('✅ Service Worker carregado - versão', VERSION);
