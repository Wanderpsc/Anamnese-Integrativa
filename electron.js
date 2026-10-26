const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

// Detectar ambiente de desenvolvimento sem electron-is-dev
const isDev = !app.isPackaged;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true
    },
    icon: path.join(__dirname, 'public', 'favicon.ico'),
    title: 'Anamnese Integrativa - Wander Pires Silva Coelho',
    backgroundColor: '#ffffff',
    show: false
  });

  // Carregar o app
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    // Em produção, o build/ é a raiz do app.asar
    // Então index.html está direto na raiz
    mainWindow.loadFile('index.html').catch(err => {
      console.error('Error loading file:', err);
    });
  }

  // Mostrar janela quando estiver pronta
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Abrir DevTools para debug
    mainWindow.webContents.openDevTools();
  });

  // Abrir links externos no navegador padrão
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  // Menu customizado
  const menuTemplate = [
    {
      label: 'Arquivo',
      submenu: [
        {
          label: 'Novo Paciente',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('navigate', '/nova-anamnese');
          }
        },
        { type: 'separator' },
        {
          label: 'Imprimir',
          accelerator: 'CmdOrCtrl+P',
          click: () => {
            mainWindow.webContents.print();
          }
        },
        { type: 'separator' },
        {
          label: 'Sair',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Editar',
      submenu: [
        { role: 'undo', label: 'Desfazer' },
        { role: 'redo', label: 'Refazer' },
        { type: 'separator' },
        { role: 'cut', label: 'Recortar' },
        { role: 'copy', label: 'Copiar' },
        { role: 'paste', label: 'Colar' },
        { role: 'selectAll', label: 'Selecionar Tudo' }
      ]
    },
    {
      label: 'Visualizar',
      submenu: [
        { role: 'reload', label: 'Recarregar' },
        { role: 'forceReload', label: 'Forçar Recarga' },
        { type: 'separator' },
        { role: 'zoomIn', label: 'Ampliar' },
        { role: 'zoomOut', label: 'Reduzir' },
        { role: 'resetZoom', label: 'Zoom Padrão' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Tela Cheia' }
      ]
    },
    {
      label: 'Ferramentas',
      submenu: [
        {
          label: 'Modo Desenvolvedor',
          accelerator: 'F12',
          click: () => {
            mainWindow.webContents.toggleDevTools();
          }
        }
      ]
    },
    {
      label: 'Ajuda',
      submenu: [
        {
          label: 'Sobre',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Sobre - Anamnese Integrativa',
              message: 'Sistema de Anamnese e Sugestões Terapêuticas Integrativas',
              detail: `Versão: ${app.getVersion()}\n\nDesenvolvido por:\nWander Pires Silva Coelho\nCRTH-BR 17821\n\nEmail: wanderpsc@gmail.com\n\nSistema completo para gestão de consultas, anamneses e protocolos terapêuticos naturais.`,
              buttons: ['OK']
            });
          }
        },
        {
          label: 'Documentação',
          click: () => {
            shell.openExternal('https://github.com/wanderpsc/anamnese-app');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // DevTools em modo desenvolvimento
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Criar janela quando app estiver pronto
app.whenReady().then(createWindow);

// Quit quando todas as janelas forem fechadas (exceto no macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Verificar conectividade
app.on('ready', () => {
  const { net } = require('electron');
  
  setInterval(() => {
    const request = net.request('https://www.google.com');
    request.on('response', () => {
      mainWindow?.webContents.send('online-status-changed', true);
    });
    request.on('error', () => {
      mainWindow?.webContents.send('online-status-changed', false);
    });
    request.end();
  }, 30000); // Verificar a cada 30 segundos
});
