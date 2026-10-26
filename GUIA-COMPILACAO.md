# 📱 GUIA DE COMPILAÇÃO - APLICATIVO MULTIPLATAFORMA

## Sistema de Anamnese Integrativa
**Desenvolvedor:** Wander Pires Silva Coelho  
**Email:** wanderpsc@gmail.com  
**CRTH-BR:** 17821

---

## 🎯 VISÃO GERAL

Este projeto React foi configurado para ser compilado como aplicativo standalone para múltiplas plataformas:

- ✅ **Windows** (.exe instalador e portable)
- ✅ **Linux** (AppImage e .deb)
- ✅ **Chrome OS** (via AppImage/Linux)
- ✅ **Android** (APK via Capacitor)

**Características:**
- ✅ Funciona **offline e online**
- ✅ Independente do VS Code
- ✅ Inclui todos os arquivos therapeutic-data (342 arquivos)
- ✅ Sistema de login habilitado
- ✅ Auto-atualização via desenvolvimento no VS Code

---

## 🖥️ COMPILAR PARA DESKTOP (Windows/Linux/Chrome OS)

### 1. Modo Desenvolvimento com Electron

Para testar o app em modo Electron (durante desenvolvimento):

```powershell
npm run electron-dev
```

Isso irá:
- Iniciar o React em modo dev
- Abrir o app em janela Electron
- Permitir hot-reload para desenvolvimento

### 2. Compilar para Windows

**Instalador .exe:**
```powershell
npm run electron-build-win
```

**Resultado:**
- `dist/Anamnese Integrativa-Setup-2.1.0.exe` (instalador)
- `dist/Anamnese Integrativa-Portable-2.1.0.exe` (versão portable)

**Localização dos arquivos:** `dist/` na raiz do projeto

### 3. Compilar para Linux

```powershell
npm run electron-build-linux
```

**Resultado:**
- `dist/Anamnese Integrativa-2.1.0.AppImage` (para qualquer distro)
- `dist/anamnese-integrativa_2.1.0_amd64.deb` (para Ubuntu/Debian)

**Chrome OS:** Usar o arquivo `.AppImage` (Chrome OS suporta apps Linux)

### 4. Compilar para Todas as Plataformas

```powershell
npm run electron-build-all
```

Gera Windows + Linux em uma única execução.

---

## 📱 COMPILAR PARA ANDROID

### Pré-requisitos:
- ✅ Android Studio instalado
- ✅ Java JDK 17 ou superior
- ✅ Android SDK configurado

### Passos:

#### 1. Build do React

```powershell
npm run build
```

#### 2. Adicionar Plataforma Android

```powershell
npx cap add android
```

#### 3. Sincronizar Assets

```powershell
npx cap sync android
```

#### 4. Abrir no Android Studio

```powershell
npx cap open android
```

#### 5. No Android Studio:

1. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
2. Aguardar compilação
3. APK gerado em: `android/app/build/outputs/apk/debug/app-debug.apk`

#### 6. Para APK Release (assinado):

No Android Studio:
1. **Build > Generate Signed Bundle / APK**
2. Criar keystore (primeira vez)
3. Gerar APK assinado

---

## 📦 ARQUIVOS INCLUÍDOS NO BUILD

### Therapeutic Data (342 arquivos)

✅ **TODOS os arquivos da pasta** `src/assets/therapeutic-data/` são incluídos automaticamente:

- Apostilas IVM (20+ arquivos)
- Protocolos Dr. Boarim, Maria Rocha, Gerson Cunha
- Artigos científicos (62+ PDFs)
- Manuais e guias práticos
- Mapas de iridologia
- E-books especializados
- **CARIMBO NATUROPATIA.jpg** (para impressões)
- **SÍMBOLO TERAPEUTA.jpg** (logo)

**Configuração:** `electron-builder.json` linha 18-22
```json
"extraResources": [
  {
    "from": "src/assets/therapeutic-data",
    "to": "therapeutic-data",
    "filter": ["**/*"]
  }
]
```

---

## 🌐 FUNCIONAMENTO OFFLINE/ONLINE

### Sistema Híbrido Implementado:

**Online:**
- Verifica conectividade a cada 30 segundos
- Suporte a Supabase (se configurado)
- Acesso a atualizações

**Offline:**
- Todos os dados em localStorage
- Therapeutic-data carregados localmente
- Sistema de login local
- Protocolos e banco de dados embutidos

**Detecção automática:**
- `preload.js` expõe API de status de rede
- `electron.js` monitora conectividade
- Interface adapta-se automaticamente

---

## 🔄 ATUALIZAÇÕES E MANUTENÇÃO

### No Dia a Dia (VS Code):

1. **Fazer alterações no código**
2. **Testar localmente:**
   ```powershell
   npm start
   ```
3. **Testar em Electron:**
   ```powershell
   npm run electron-dev
   ```
4. **Compilar nova versão:**
   - Atualizar versão em `package.json`
   - Rodar `npm run electron-build-win`
5. **Distribuir executável atualizado**

### Versionamento:

Editar `package.json`:
```json
{
  "version": "2.2.0"  // Incrementar aqui
}
```

O instalador será gerado com a nova versão automaticamente.

---

## 📂 ESTRUTURA DOS BUILDS

```
dist/
├── Anamnese Integrativa-Setup-2.1.0.exe       (Windows Instalador)
├── Anamnese Integrativa-Portable-2.1.0.exe    (Windows Portable)
├── Anamnese Integrativa-2.1.0.AppImage        (Linux/Chrome OS)
├── anamnese-integrativa_2.1.0_amd64.deb       (Ubuntu/Debian)
└── ...

android/app/build/outputs/apk/
├── debug/
│   └── app-debug.apk                           (Android Debug)
└── release/
    └── app-release.apk                         (Android Release)
```

---

## 🎨 ÍCONES E RECURSOS

### Locais dos Ícones:

- **Windows:** `public/favicon.ico`
- **Linux:** `public/icon-512x512.png`
- **Android:** Configurado automaticamente pelo Capacitor

### Criar Ícones (se necessário):

1. Criar imagem 512x512px
2. Salvar em `public/icon-512x512.png`
3. Converter para .ico (Windows)
4. Build irá usar automaticamente

---

## 🔐 SISTEMA DE LOGIN

**Status:** ✅ HABILITADO

**Credenciais:**
- Configuradas em `src/lib/auth.js`
- Não expostas na interface
- Recuperação via email: wanderpsc@gmail.com

**Desabilitar (se necessário):**
Editar `src/App.js` linha 62:
```javascript
const AUTH_ENABLED = false; // Mudar para false
```

---

## ⚙️ SCRIPTS DISPONÍVEIS

### Desenvolvimento:
```powershell
npm start                    # React dev server (localhost:3000)
npm run electron-dev         # Testar em Electron + React dev
```

### Build Desktop:
```powershell
npm run electron-build       # Build padrão (Windows)
npm run electron-build-win   # Build Windows (.exe instalador + portable)
npm run electron-build-linux # Build Linux (.AppImage + .deb)
npm run electron-build-all   # Build Windows + Linux
```

### Build Android:
```powershell
npm run build                # Gerar build React
npx cap sync android         # Sincronizar com Android
npx cap open android         # Abrir Android Studio
```

### Outros:
```powershell
npm run build                # Build React (pasta build/)
npm test                     # Rodar testes
```

---

## 🚀 DISTRIBUIÇÃO

### Windows:
1. Compartilhar o `.exe` instalador ou portable
2. Usuários executam e instalam
3. Ícone criado na área de trabalho

### Linux:
1. Compartilhar `.AppImage` ou `.deb`
2. **AppImage:** Dar permissão de execução (`chmod +x`) e rodar
3. **DEB:** `sudo dpkg -i anamnese-integrativa_2.1.0_amd64.deb`

### Chrome OS:
1. Habilitar Linux no Chrome OS
2. Usar o arquivo `.AppImage`

### Android:
1. Compartilhar `.apk`
2. Habilitar "Fontes desconhecidas" no Android
3. Instalar APK

---

## 🐛 TROUBLESHOOTING

### Erro: "Electron builder failed"
**Solução:** Verificar se `build/` existe (`npm run build` primeiro)

### Erro: "therapeutic-data not found"
**Solução:** Pasta `src/assets/therapeutic-data/` deve conter os arquivos

### Erro no Android: "SDK not found"
**Solução:** 
```powershell
# Configurar ANDROID_HOME
$env:ANDROID_HOME = "C:\Users\SeuUsuario\AppData\Local\Android\Sdk"
```

### Build muito grande
**Solução:** Normal. Therapeutic-data tem 342 arquivos (~2GB).

### App não abre no Windows
**Solução:** Instalar Visual C++ Redistributable:
https://aka.ms/vs/17/release/vc_redist.x64.exe

---

## 📊 TAMANHOS ESTIMADOS

- **Windows Instalador:** ~300-500 MB
- **Windows Portable:** ~300-500 MB
- **Linux AppImage:** ~300-500 MB
- **Android APK:** ~150-300 MB

*Tamanho varia conforme os arquivos therapeutic-data*

---

## 📞 SUPORTE

**Desenvolvedor:** Wander Pires Silva Coelho  
**Email:** wanderpsc@gmail.com  
**CRTH-BR:** 17821

---

## ✅ CHECKLIST DE BUILD

Antes de compilar para produção:

- [ ] Atualizar versão em `package.json`
- [ ] Testar `npm start` (React funciona)
- [ ] Testar `npm run electron-dev` (Electron funciona)
- [ ] Verificar `src/assets/therapeutic-data/` (342 arquivos presentes)
- [ ] Testar login (credenciais funcionam)
- [ ] Rodar `npm run build` (build React sem erros)
- [ ] Verificar `build/` gerado corretamente
- [ ] Rodar build para plataforma desejada
- [ ] Testar executável gerado
- [ ] Verificar se therapeutic-data está acessível no app
- [ ] Testar impressão (cabeçalho/rodapé corretos)
- [ ] Testar offline (desconectar internet)

---

**SISTEMA PRONTO PARA DISTRIBUIÇÃO!** 🎉
