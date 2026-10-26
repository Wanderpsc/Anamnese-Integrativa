// v2
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AiModelProvider } from './context/AiModelContext';
import { BrowserRouter, HashRouter } from 'react-router-dom';

window.__BUILD_VERSION__ = '20260603a';

// Detectar se está rodando no Electron
const isElectron = window.navigator.userAgent.toLowerCase().includes('electron');

// Usar HashRouter no Electron (file://) e BrowserRouter no navegador
const Router = isElectron ? HashRouter : BrowserRouter;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AiModelProvider>
        <App />
      </AiModelProvider>
    </Router>
  </React.StrictMode>
);

// Service Worker desabilitado em desenvolvimento
// Será habilitado apenas em produção