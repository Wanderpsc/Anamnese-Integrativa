const { contextBridge, ipcRenderer } = require('electron');

// Expor APIs seguras para o renderer process
contextBridge.exposeInMainWorld('electron', {
  // Navegação
  navigate: (path) => ipcRenderer.send('navigate', path),
  
  // Status de conectividade
  onOnlineStatusChanged: (callback) => {
    ipcRenderer.on('online-status-changed', (event, isOnline) => callback(isOnline));
  },
  
  // Informações do sistema
  platform: process.platform,
  
  // Versão do app
  version: require('./package.json').version
});

// Expor API para verificar status online/offline
contextBridge.exposeInMainWorld('networkStatus', {
  isOnline: () => navigator.onLine,
  onStatusChange: (callback) => {
    window.addEventListener('online', () => callback(true));
    window.addEventListener('offline', () => callback(false));
  }
});
