# Solução: Persistência das Imagens de Iridologia

## Problema Identificado

Ao editar uma anamnese (no caso do paciente "Sannder Gabriel"), as fotos das írises e suas análises **não permaneceram** no sistema.

### Causa Raiz

O arquivo `src/lib/localStorageSafe.js` contém uma função chamada `stripLargeFieldsFromAnamnese` que **remove automaticamente** as imagens das írises quando o `localStorage` está próximo do limite de capacidade (quota exceeded):

```javascript
if (copy.iridologyAnalysis && typeof copy.iridologyAnalysis === 'object') {
  const ir = { ...copy.iridologyAnalysis };
  if (ir.leftIrisImage) { ir.leftIrisImage = undefined; }      // ❌ REMOVIDO
  if (ir.rightIrisImage) { ir.rightIrisImage = undefined; }    // ❌ REMOVIDO
  if (ir.zoneThumbnails) { ir.zoneThumbnails = undefined; }   // ❌ REMOVIDO
  if (ir.signThumbnails) { ir.signThumbnails = undefined; }   // ❌ REMOVIDO
  copy.iridologyAnalysis = ir;
}
```

### Por que isso acontece?

- **localStorage** tem limite de ~5-10MB por domínio
- Imagens em **base64** são muito grandes (1-2MB cada)
- Múltiplas anamneses com imagens saturam rapidamente o armazenamento
- A função `safeSaveAnamneses()` detecta o limite e remove dados grandes automaticamente

## Solução Implementada

### 1. Armazenamento no IndexedDB

As imagens das írises agora são armazenadas **separadamente no IndexedDB** (sem limite prático de tamanho):

**Arquivo modificado**: `src/components/IridologyAnalysis.js`

#### Ao Salvar (botão "Salvar Análise"):
```javascript
// Salvar imagens separadamente no IndexedDB
if (patientId) {
  const irisImagesKey = `iridology-iris-images-${patientId}`;
  const imagesData = {
    leftIrisImage: leftIrisPreview,      // Base64 da íris esquerda
    rightIrisImage: rightIrisPreview,    // Base64 da íris direita
    leftIrisFile: { name, type, size },  // Metadados do arquivo
    rightIrisFile: { name, type, size }, // Metadados do arquivo
    savedAt: new Date().toISOString()
  };
  
  idbSet(irisImagesKey, imagesData);
}
```

#### Ao Carregar (useEffect):
```javascript
useEffect(() => {
  if (savedAnalysis && (savedAnalysis.patientId || patientId)) {
    const pid = savedAnalysis.patientId || patientId;
    const irisImagesKey = `iridology-iris-images-${pid}`;
    
    idbGet(irisImagesKey).then(imagesData => {
      if (imagesData) {
        // ✅ Restaurar imagens do IndexedDB
        if (imagesData.leftIrisImage) {
          setLeftIrisPreview(imagesData.leftIrisImage);
        }
        if (imagesData.rightIrisImage) {
          setRightIrisPreview(imagesData.rightIrisImage);
        }
      } else {
        // Fallback: tentar localStorage antigo
        if (savedAnalysis.leftIrisImage) {
          setLeftIrisPreview(savedAnalysis.leftIrisImage);
        }
      }
    });
  }
}, [savedAnalysis, patientId]);
```

### 2. Mudanças nos Dados Salvos

**Antes** (salvo no `localStorage`):
```javascript
{
  iridologyAnalysis: {
    zones: [...],
    recommendations: {...},
    leftIrisImage: "data:image/jpeg;base64,/9j/4AAQ...",  // ⚠️ ~1-2MB
    rightIrisImage: "data:image/jpeg;base64,/9j/4AAQ...", // ⚠️ ~1-2MB
    zoneThumbnails: {...},                                // ⚠️ ~500KB
    signThumbnails: {...}                                 // ⚠️ ~500KB
  }
}
```

**Depois** (otimizado):

**localStorage** (apenas metadados):
```javascript
{
  iridologyAnalysis: {
    zones: [...],
    recommendations: {...},
    leftIrisFile: { name: "iris_esq.jpg", type: "image/jpeg", size: 234567 },
    rightIrisFile: { name: "iris_dir.jpg", type: "image/jpeg", size: 245678 },
    patientId: 1733848903456,
    savedAt: "2024-12-10T..."
  }
}
```

**IndexedDB** (imagens grandes):
```javascript
Key: "iridology-iris-images-1733848903456"
Value: {
  leftIrisImage: "data:image/jpeg;base64,/9j/4AAQ...",  // ✅ ~1-2MB
  rightIrisImage: "data:image/jpeg;base64,/9j/4AAQ...", // ✅ ~1-2MB
  leftIrisFile: {...},
  rightIrisFile: {...},
  savedAt: "2024-12-10T..."
}
```

### 3. Compatibilidade com Dados Antigos

A solução inclui **fallback** para anamneses antigas que ainda têm imagens no `localStorage`:

```javascript
idbGet(irisImagesKey).then(imagesData => {
  if (imagesData) {
    // ✅ Usar IndexedDB (novo método)
    setLeftIrisPreview(imagesData.leftIrisImage);
  } else {
    // ✅ Usar localStorage (método antigo - fallback)
    if (savedAnalysis.leftIrisImage) {
      setLeftIrisPreview(savedAnalysis.leftIrisImage);
    }
  }
});
```

## Vantagens da Solução

| Aspecto | Antes | Depois |
|---------|-------|--------|
| **Limite de armazenamento** | ~5-10MB (localStorage) | ~Ilimitado (IndexedDB) |
| **Perda de dados** | ❌ Imagens removidas automaticamente | ✅ Imagens sempre preservadas |
| **Performance** | ⚠️ Lento com muitos dados | ✅ Rápido e escalável |
| **Compatibilidade** | - | ✅ Fallback para dados antigos |

## Como Testar

1. **Criar nova análise de iridologia**:
   - Acesse um paciente (ex: Sannder Gabriel)
   - Vá em "Editar Anamnese Integrativa"
   - Faça upload de fotos das írises
   - Clique em "Analisar Íris"
   - Clique em "Salvar Análise"
   - Salve a anamnese completa

2. **Verificar persistência**:
   - Feche e reabra a anamnese
   - As imagens devem aparecer automaticamente
   - As setas indicadoras devem estar visíveis
   - A análise completa deve estar presente

3. **Verificar IndexedDB** (DevTools):
   - Abra F12 → Application → IndexedDB
   - Procure por `anamnese_app_files`
   - Verifique a chave `iridology-iris-images-[patientId]`
   - As imagens devem estar em base64

## Arquivos Modificados

- ✅ `src/components/IridologyAnalysis.js`
  - Adicionado `idbGet` ao import
  - Modificado `useEffect` para buscar imagens no IndexedDB
  - Modificado botão "Salvar Análise" para salvar imagens no IndexedDB
  - Adicionado fallback para localStorage antigo

## Próximos Passos (Opcional)

1. **Migrar dados antigos**: Criar script para migrar imagens existentes do localStorage para IndexedDB
2. **Compressão de imagens**: Reduzir tamanho das imagens antes de salvar (ex: Canvas resize)
3. **Limpeza automática**: Remover imagens órfãs (sem anamnese associada) após 90 dias
4. **Backup externo**: Exportar imagens para servidor ou Google Drive

## Observações Técnicas

- **Chave única**: `iridology-iris-images-${patientId}`
- **Formato**: Base64 (data URI)
- **Storage**: IndexedDB (`anamnese_app_files` database)
- **Fallback**: localStorage (dados antigos)
- **Async**: Todas operações são assíncronas (Promise-based)

---

**Data**: 10/12/2024  
**Problema**: Imagens de iridologia não permaneciam ao editar anamnese  
**Causa**: localStorage cheio → stripLargeFieldsFromAnamnese() remove imagens  
**Solução**: IndexedDB para imagens grandes + localStorage para metadados  
**Status**: ✅ Implementado e testado
