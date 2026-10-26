# 🌐 Anamnese Integrativa - Modo Offline-First

## 📋 Visão Geral

O **App Anamnese Integrativa** agora funciona **totalmente offline** como uma Progressive Web App (PWA), com busca profunda em **342 arquivos terapêuticos locais**.

### ✨ Características Offline-First

- ✅ **Funciona sem internet** após primeira instalação
- ✅ **342 arquivos terapêuticos** indexados localmente (PDFs, guias, protocolos)
- ✅ **Busca full-text** em fitoterapia, homeopatia, iridologia, protocolos
- ✅ **PWA instalável** no desktop/mobile
- ✅ **Service Worker** com cache estratégico
- ✅ **IndexedDB** para armazenamento de dados massivos
- ✅ **Sync em background** quando reconectar à internet
- ✅ **Enriquecimento online** opcional via APIs externas

---

## 🚀 Como Usar

### 1. Inicialização Rápida

Execute o script PowerShell:

```powershell
cd "E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app"
.\start-offline-app.ps1
```

O script automaticamente:
- ✅ Verifica dependências (Node.js, Python, bibliotecas)
- ✅ Oferece executar extração de PDFs (primeira vez)
- ✅ Libera portas ocupadas
- ✅ Inicia servidor na porta 3001

### 2. Primeira Indexação

No app, vá para **📚 Dados Terapêuticos** no menu lateral:

1. Clique em **"Iniciar Indexação"**
2. Aguarde processamento (1-5 minutos)
3. Verificar progresso: `342/342 arquivos indexados`

**Observação:** A indexação só processa **metadata** dos arquivos. Para busca full-text nos PDFs, execute a extração Python (próximo passo).

### 3. Extração de Conteúdo (Opcional)

Para busca profunda no **conteúdo dos PDFs**:

```powershell
python extract_therapeutic_batch.py
```

Este processo:
- Extrai texto de 342 PDFs
- Pode levar **10-30 minutos**
- Gera `therapeutic_content.json` (~50-200 MB)
- Necessário apenas **uma vez**

---

## 📂 Estrutura de Dados

### Arquivos Terapêuticos (342 total)

Categorias disponíveis:

| Categoria | Descrição | Quantidade Aprox. |
|-----------|-----------|-------------------|
| **Fitoterapia** | Apostilas, memento, artigos | ~60 arquivos |
| **Iridologia** | Mapas, guias, análises | ~40 arquivos |
| **Homeopatia** | Repertórios, guias | ~30 arquivos |
| **Protocolos** | Tratamentos específicos | ~35 arquivos |
| **Fórmulas** | Prescrições, manipulação | ~25 arquivos |
| **Biorressonância** | Guias, análises | ~15 arquivos |
| **Nutrição** | Dietas, trofoterapia | ~20 arquivos |
| **Suplementação** | Vitaminas, minerais | ~25 arquivos |
| **Artigos** | Estudos científicos | ~50 arquivos |
| **Outros** | Diversos | ~42 arquivos |

### Banco de Dados Local (IndexedDB)

**4 Object Stores:**

1. **therapeuticMetadata** - Info dos 342 arquivos
   - `id`, `fileName`, `category`, `keywords`, `indexed`
   - Índices: `fileName`, `category`, `keywords`

2. **therapeuticContent** - Texto extraído dos PDFs
   - `fileId`, `text`, `category`, `textLength`
   - Índice: `category`

3. **therapeuticSearchIndex** - Índice de busca
   - `term` → `fileIds[]`
   - Permite busca rápida por termos

4. **searchCache** - Cache de buscas
   - `query` → `results[]`, `timestamp`, `expiresAt`
   - Expira em 24 horas

---

## 🔍 Sistema de Busca

### Busca por Keywords (Rápida)

Busca apenas no **nome** e **metadata** dos arquivos:

```javascript
import { useTherapeuticData } from './lib/useTherapeuticData';

const { searchByKeywords } = useTherapeuticData();

const results = await searchByKeywords(['ansiedade', 'estresse']);
// Retorna arquivos cujos nomes contêm esses termos
```

### Busca Full-Text (Completa)

Busca no **conteúdo** dos PDFs extraídos:

```javascript
const { search } = useTherapeuticData();

const results = await search('tratamento para insônia', {
  category: 'fitoterapia',
  maxResults: 20
});

// Retorna:
// [
//   {
//     fileId: 123,
//     fileName: 'apostila-de-fitoterapia.pdf',
//     category: 'fitoterapia',
//     score: 15, // Quantas vezes os termos aparecem
//     snippets: [
//       '...tratamento para insônia com valeriana...',
//       '...passiflora no tratamento de distúrbios do sono...'
//     ]
//   }
// ]
```

### Busca Integrada em Anamnese

O formulário de anamnese busca **automaticamente** tratamentos baseados em:
- Queixa principal
- Doenças crônicas
- Sintomas reportados (gases, azia, ansiedade, etc.)

```javascript
import { useAnamneseTreatmentSearch } from './lib/useTherapeuticData';

const { searchTreatments, treatments } = useAnamneseTreatmentSearch();

// Ao preencher anamnese:
await searchTreatments(anamneseData);

// treatments agora contém sugestões dos 342 arquivos locais
```

---

## 🌐 PWA - Instalação

### Desktop (Chrome/Edge)

1. Abra `http://localhost:3001`
2. Clique no ícone **"Instalar"** na barra de endereço
3. App instalado como aplicativo nativo
4. **Funciona offline** após instalação

### Mobile (Chrome Android)

1. Abra `http://localhost:3001` no Chrome
2. Menu → **"Adicionar à tela inicial"**
3. App aparece como ícone no launcher
4. Abre em **tela cheia** sem navegador

---

## 🔧 Service Worker - Estratégias

### Cache First (Assets Estáticos)

CSS, JS, imagens → prioriza cache

```
Request → Cache? Yes → Return Cache
              ↓ No
           Network → Cache → Return
```

### Network First (APIs)

Dados dinâmicos → prioriza rede

```
Request → Network? Success → Cache → Return
              ↓ Fail
           Cache? Yes → Return (+ header X-From-Cache)
```

### Stale While Revalidate (PDFs)

Retorna cache mas atualiza em background

```
Request → Cache? Yes → Return Cache (atualiza em background)
              ↓ No
           Network → Cache → Return
```

---

## 📊 Monitoramento

### Estatísticas do Banco

Acesse **📚 Dados Terapêuticos** para ver:

- Total de arquivos indexados
- Percentual de progresso
- Distribuição por categoria
- Tamanho do banco

### Console do Navegador

```javascript
// Verificar IndexedDB
const stats = await therapeuticDB.getDatabaseStats();
console.log(stats);

// Limpar cache expirado
await therapeuticDB.cleanExpiredCache();

// Testar busca
const results = await therapeuticDB.searchContent('diabetes');
```

---

## ⚠️ Requisitos de Disco

### Mínimo Necessário

- **C: Drive:** 5 GB livres (Windows, npm, cache)
- **E: Drive:** 2 GB livres (app, PDFs, JSONs extraídos)

### Limpeza Recomendada

Se `C:` estiver cheio:

```powershell
# Limpar caches
npm cache clean --force
pip cache purge

# Remover temporários
Remove-Item "C:\Windows\Temp\*" -Recurse -Force
Remove-Item "$env:TEMP\*" -Recurse -Force

# Esvaziar lixeira
Clear-RecycleBin -Force
```

---

## 🐛 Troubleshooting

### Servidor não inicia

**Erro:** `EADDRINUSE` (porta ocupada)

```powershell
# Liberar portas
Get-NetTCPConnection -LocalPort 3000,3001 | Stop-Process -Id $_.OwningProcess -Force
```

### Extração de PDFs falha

**Erro:** `pytesseract.TesseractNotFoundError`

- OCR não é obrigatório (script usa PyMuPDF primeiro)
- Para OCR: instale [Tesseract](https://github.com/UB-Mannheim/tesseract/wiki)

### IndexedDB não funciona

**Erro:** `QuotaExceededError`

- Navegador tem limite de ~2 GB para IndexedDB
- Reduza quantidade de arquivos indexados
- Limpe dados antigos: F12 → Application → IndexedDB → Delete

### Service Worker não atualiza

```javascript
// No console do navegador
navigator.serviceWorker.getRegistrations()
  .then(registrations => {
    registrations.forEach(r => r.unregister());
  });

// Recarregue página com Ctrl+Shift+R
```

---

## 📈 Roadmap

### Implementado ✅

- [x] IndexedDB com 4 stores
- [x] Extração de PDFs (PyMuPDF + pdfplumber + OCR)
- [x] Busca full-text com scoring
- [x] Service Worker com cache estratégico
- [x] PWA instalável
- [x] Painel de gerenciamento
- [x] Integração com AnamneseForm
- [x] Categorização automática

### Próximos Passos 🚧

- [ ] Background Sync para sincronizar anamneses offline
- [ ] Push Notifications para lembretes
- [ ] Compressão de texto extraído (reduzir de 200 MB → 50 MB)
- [ ] Busca com typo tolerance (correção automática)
- [ ] ML para ranking de relevância
- [ ] Export/Import de banco entre dispositivos
- [ ] Atualização incremental de PDFs

---

## 🤝 Contribuição

Para adicionar novos arquivos terapêuticos:

1. Adicione PDF em `src/assets/therapeutic-data/`
2. Execute: `python extract_therapeutic_batch.py`
3. No app: **📚 Dados Terapêuticos** → **"Reindexar"**

---

## 📄 Licença

Uso pessoal - Wander Pires Silva Coelho, Terapeuta Integrativo Funcional

---

## 📞 Suporte

- **GitHub Issues:** (se aplicável)
- **Email:** (adicionar se disponível)
- **Documentação:** Este arquivo README

---

**Última Atualização:** 11 de dezembro de 2025
