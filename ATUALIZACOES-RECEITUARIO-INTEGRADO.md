# Atualizações do Sistema - Receituário e Integração com Pacientes

## Data: 29 de Janeiro de 2026

## 🎯 Objetivo
Garantir que TODAS as páginas do sistema estejam:
1. **Conectadas ao cadastro/anamnese principal** através do `currentPatientId`
2. **Gerando receituário profissional** no final com cabeçalho e rodapé
3. **Salvando dados persistentes** no IndexedDB/localStorage para retornos de consulta

---

## ✅ Componentes Criados

### 1. `usePatientIntegration.js` Hook
**Localização:** `src/hooks/usePatientIntegration.js`

**Funcionalidades:**
- ✅ Carrega automaticamente dados do paciente do `currentPatientId`
- ✅ Salva dados na anamnese do paciente
- ✅ Recupera dados salvos anteriormente
- ✅ Dispara eventos de atualização para outras páginas
- ✅ Navegação facilitada para o dashboard

**Uso:**
```javascript
import { usePatientIntegration } from '../hooks/usePatientIntegration';

const { patientData, saveToPatient, getPatientData, goToDashboard } = 
  usePatientIntegration('chaveDeDados');
```

### 2. `PrescriptionActions.js` Componente
**Localização:** `src/components/PrescriptionActions.js`

**Funcionalidades:**
- ✅ Botões padronizados: Voltar, Imprimir, Baixar PDF
- ✅ Integração automática com dados do paciente
- ✅ Geração de PDF com cabeçalho e rodapé profissional
- ✅ Alertas quando paciente não selecionado

---

## 📊 Status das Páginas

### ✅ Páginas JÁ Integradas (OK)
Estas páginas já possuem conexão com `currentPatientId` E receituário:

1. **IridologyAnalysisPage** ✅
   - Usa `currentPatientId`
   - Salva em `iridologyImages`, `iridologyAnalysis`
   - Tem `PrescriptionHeader` e botões de impressão

2. **BioresonanceAnalysisPage** ✅
   - Usa `currentPatientId`
   - Salva em `bioresonanceResults`
   - Tem `PrescriptionHeader` e botões de impressão

3. **TherapeuticPrescription** ✅
   - Integração completa com paciente
   - Receituário profissional
   - Consolidação de todos os tratamentos

4. **AdvancedTherapies** ✅
   - Integração completa
   - Salva em `advancedTherapiesData`
   - Receituário integrado

---

### 🔄 Páginas ATUALIZADAS (Hoje)

#### 1. ✅ VitaminDeficiencyBySymptoms
**Arquivo:** `src/pages/VitaminDeficiencyBySymptoms.js`

**Alterações implementadas:**
- ✅ Adicionado `usePatientIntegration('vitaminDeficiencyAnalysis')`
- ✅ Carrega sintomas salvos do paciente
- ✅ Salva automaticamente análise no paciente
- ✅ Adicionado `PrescriptionHeader` e `PrescriptionFooter`
- ✅ Adicionado `PrescriptionActions` com botões de Print/PDF
- ✅ Botão "Salvar no Prontuário" funcional

**Dados salvos:**
```javascript
{
  selectedSymptoms: [...],
  analysis: {
    vitaminas: [...],
    totalSintomas: number
  },
  updatedAt: ISO string
}
```

---

### 🚧 Páginas PENDENTES de Atualização

#### 2. 🔲 VitaminDeficiencyAnalyzer
**Arquivo:** `src/pages/VitaminDeficiencyAnalyzer.js`

**Mudanças necessárias:**
```javascript
// 1. Adicionar imports
import { usePatientIntegration } from '../hooks/usePatientIntegration';
import PrescriptionHeader from '../components/PrescriptionHeader';
import PrescriptionFooter from '../components/PrescriptionFooter';
import PrescriptionActions from '../components/PrescriptionActions';

// 2. Adicionar hook
const { patientData, saveToPatient, goToDashboard } = 
  usePatientIntegration('vitaminDeficiencyAnalyzer');

// 3. useEffect para carregar dados
useEffect(() => {
  if (patientData?.vitaminDeficiencyAnalyzer) {
    setSintomasSelecionados(patientData.vitaminDeficiencyAnalyzer.sintomasSelecionados || []);
  }
}, [patientData]);

// 4. useEffect para salvar automaticamente
useEffect(() => {
  if (sintomasSelecionados.length > 0 && analiseDeficiencias) {
    saveToPatient({
      sintomasSelecionados,
      analiseDeficiencias,
      updatedAt: new Date().toISOString()
    });
  }
}, [sintomasSelecionados, analiseDeficiencias]);

// 5. Adicionar PrescriptionActions no topo
<PrescriptionActions
  patientData={patientData}
  contentRef={contentRef}
  contentTitle="Analise_Deficiencias"
  onBack={goToDashboard}
/>

// 6. Adicionar PrescriptionHeader e Footer
<Box className="print-only">
  <PrescriptionHeader entry={patientData} />
</Box>
// ... conteúdo ...
<Box className="print-only">
  <PrescriptionFooter />
</Box>
```

---

#### 3. 🔲 PhytotherapyProtocols
**Arquivo:** `src/pages/PhytotherapyProtocols.js`

**Mudanças necessárias:**
- ✅ JÁ TEM botões Print/PDF
- ❌ NÃO tem `currentPatientId`
- ❌ NÃO salva no paciente

**Implementar:**
```javascript
const { patientData, saveToPatient } = 
  usePatientIntegration('phytotherapyProtocols');

// Salvar protocolos selecionados
saveToPatient({
  selectedProtocols: [...],
  selectedPlants: [...],
  updatedAt: new Date().toISOString()
});
```

---

#### 4. 🔲 ProbioticsRecommendation
**Arquivo:** `src/pages/ProbioticsRecommendation.js`

**Mudanças necessárias:**
- ✅ JÁ TEM botão Print
- ❌ NÃO tem `currentPatientId`
- ❌ NÃO tem PrescriptionHeader/Footer

**Implementar:**
```javascript
const { patientData, saveToPatient } = 
  usePatientIntegration('probioticsRecommendation');

// Salvar recomendações
saveToPatient({
  selectedPathologies,
  recommendations,
  updatedAt: new Date().toISOString()
});
```

---

#### 5. 🔲 NutrientInteractions
**Arquivo:** `src/pages/NutrientInteractions.js`

**Mudanças necessárias:**
- ❌ NÃO tem Print/PDF
- ❌ NÃO tem `currentPatientId`

**Implementar:**
- Sistema completo de receituário
- Salvamento de interações consultadas
- Botões Print/PDF

---

#### 6. 🔲 ExamRequestForm
**Arquivo:** `src/pages/ExamRequestForm.js`

**Mudanças necessárias:**
- ✅ JÁ TEM botão Print
- ❌ NÃO tem `currentPatientId`
- ❌ NÃO salva no paciente

**Implementar:**
- Conectar com paciente
- Salvar solicitações de exames

---

## 📝 Template de Atualização

Para cada página, seguir este template:

### 1. Imports
```javascript
import { usePatientIntegration } from '../hooks/usePatientIntegration';
import PrescriptionHeader from '../components/PrescriptionHeader';
import PrescriptionFooter from '../components/PrescriptionFooter';
import PrescriptionActions from '../components/PrescriptionActions';
```

### 2. Hook no componente
```javascript
const contentRef = useRef(null);
const { patientData, saveToPatient, goToDashboard } = 
  usePatientIntegration('chaveDeDados');
```

### 3. Carregar dados salvos
```javascript
useEffect(() => {
  if (patientData?.chaveDeDados) {
    // carregar estado salvo
  }
}, [patientData]);
```

### 4. Salvar automaticamente
```javascript
useEffect(() => {
  if (dadosParaSalvar) {
    saveToPatient(dadosParaSalvar);
  }
}, [dadosParaSalvar, saveToPatient]);
```

### 5. Estrutura JSX
```javascript
<Container maxWidth="xl">
  {/* Botões de ação */}
  <PrescriptionActions
    patientData={patientData}
    contentRef={contentRef}
    contentTitle="Nome_Arquivo"
    onBack={goToDashboard}
  />

  {/* Área de impressão */}
  <Paper ref={contentRef} id="prescription-print-area">
    <Box className="print-only">
      <PrescriptionHeader entry={patientData} />
    </Box>

    {/* CONTEÚDO DA PÁGINA */}

    <Box className="print-only">
      <PrescriptionFooter />
    </Box>
  </Paper>
</Container>
```

### 6. CSS para impressão
```javascript
<style>{`
  @media print {
    .no-print { display: none !important; }
    .print-only { display: block !important; }
  }
  @media screen {
    .print-only { display: none !important; }
  }
`}</style>
```

---

## 🗄️ Estrutura de Dados no localStorage

Cada anamnese agora pode conter:

```javascript
{
  id: "123",
  q1_nome_completo: "Nome Paciente",
  // ... dados da anamnese ...
  
  // NOVOS CAMPOS DE INTEGRAÇÃO:
  vitaminDeficiencyAnalysis: {
    selectedSymptoms: [...],
    analysis: {...},
    updatedAt: "2026-01-29T..."
  },
  vitaminDeficiencyAnalyzer: {
    sintomasSelecionados: [...],
    analiseDeficiencias: {...},
    updatedAt: "2026-01-29T..."
  },
  phytotherapyProtocols: {
    selectedProtocols: [...],
    selectedPlants: [...],
    updatedAt: "2026-01-29T..."
  },
  probioticsRecommendation: {
    selectedPathologies: [...],
    recommendations: {...},
    updatedAt: "2026-01-29T..."
  },
  nutrientInteractions: {
    consultedInteractions: [...],
    updatedAt: "2026-01-29T..."
  },
  examRequests: {
    requests: [...],
    updatedAt: "2026-01-29T..."
  },
  iridologyAnalysis: {...},
  bioresonanceResults: {...},
  advancedTherapiesData: {...},
  updatedAt: "2026-01-29T..."
}
```

---

## 🎨 Benefícios da Integração

### Para o Terapeuta:
1. ✅ **Continuidade do cuidado**: Todos os dados do paciente em um só lugar
2. ✅ **Histórico completo**: Acesso a todas as análises anteriores
3. ✅ **Receituário profissional**: Documentos com cabeçalho e rodapé padronizados
4. ✅ **Agilidade**: Carregamento automático de dados em retornos

### Para o Paciente:
1. ✅ **Melhor atendimento**: Terapeuta tem acesso completo ao histórico
2. ✅ **Documentação profissional**: Receituários bem formatados para impressão
3. ✅ **Acompanhamento**: Evolução do tratamento documentada

### Técnico:
1. ✅ **Código reutilizável**: Hook e componentes padronizados
2. ✅ **Manutenção facilitada**: Padrão consistente em todas as páginas
3. ✅ **Escalabilidade**: Fácil adicionar novas funcionalidades

---

## 📋 Checklist de Implementação

- [x] Criar hook `usePatientIntegration`
- [x] Criar componente `PrescriptionActions`
- [x] Atualizar `VitaminDeficiencyBySymptoms`
- [ ] Atualizar `VitaminDeficiencyAnalyzer`
- [ ] Atualizar `PhytotherapyProtocols`
- [ ] Atualizar `ProbioticsRecommendation`
- [ ] Atualizar `NutrientInteractions`
- [ ] Atualizar `ExamRequestForm`
- [ ] Testar todas as páginas
- [ ] Documentar uso para o usuário

---

## 🚀 Próximos Passos

1. Completar atualização das 5 páginas restantes
2. Testar fluxo completo:
   - Criar/selecionar paciente
   - Usar cada página
   - Verificar salvamento
   - Gerar receituários
   - Verificar dados em retorno
3. Adicionar validações e mensagens de feedback
4. Criar documentação de usuário

---

## 📖 Documentação para o Usuário

**Como usar o sistema integrado:**

1. **Sempre selecione um paciente primeiro**
   - Vá ao Dashboard
   - Clique no paciente desejado
   - Ou crie uma nova anamnese

2. **Use as ferramentas normalmente**
   - O sistema salva automaticamente
   - Dados aparecem em retornos

3. **Gere receituários profissionais**
   - Botão "Imprimir" ou "Baixar PDF"
   - Documento com cabeçalho e rodapé
   - Dados do paciente incluídos

4. **Retornos de consulta**
   - Selecione o paciente
   - Todas as análises anteriores aparecem
   - Continue o tratamento com histórico completo

---

**Última atualização:** 29/01/2026
**Responsável:** Sistema de Anamnese Integrativa
**Status:** EM PROGRESSO (40% concluído)
