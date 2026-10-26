# 🏥 Sistema de Anamnese Integrativa - Recursos Completos

## 📋 Visão Geral

Sistema completo de anamnese para terapeutas integradores com recursos avançados de análise diagnóstica baseada em:
- **Medicina Tradicional Chinesa (MTC)**
- **Ayurveda**
- **Iridologia**
- **Auriculoterapia**
- **Diagnóstico pela Face, Unhas, Língua**

---

## ✨ Funcionalidades Implementadas

### 🔍 **1. Análise de Sinais Clínicos**

#### Upload e Captura de Imagens
- ✅ **8 áreas de análise:**
  - Face/Pele
  - Mãos
  - Unhas
  - Orelhas
  - Olhos
  - Cabelo
  - Língua
  - Pele (Geral)

- ✅ **Recursos de captura:**
  - Upload de arquivos de imagem
  - Captura por câmera em tempo real
  - Preview e zoom das imagens
  - Remoção de imagens individuais

#### Análise Diagnóstica Completa

**🎯 PELE/FACE:**
- Mapeamento facial por zonas (MTC)
- Análise de cor (palidez, vermelhidão, icterícia, cinza)
- Textura (oleosa, seca, acne, rugas)
- Condições: psoríase, eczema, vitiligo

**💅 UNHAS:**
- 10 sinais ungueais principais
- Linhas de Beau, coiloníquia, leuconíquia
- Análise das lúnulas (meia-lua)
- Onicomicose, baqueteamento digital

**👂 ORELHAS:**
- 🚨 **Sinal de Frank** (alerta cardiovascular)
- Mapa auricular completo (6 zonas)
- Pontos de auriculoterapia
- Reflexologia auricular

**👁️ OLHOS:**
- Xantelasma (colesterol)
- Análise de pálpebras e conjuntiva
- Análise pupilar (midríase, miose)
- Detecção de anemia pela conjuntiva

**💇 CABELO:**
- Alopecia (3 tipos)
- Análise mineral do cabelo
- Caspa, cabelos brancos precoces
- Deficiências nutricionais

**👅 LÍNGUA (MTC):**
- Cor do corpo (5 variações)
- Saburra (branca, amarela, preta, ausente)
- Forma (inchada, magra, marcas de dentes)
- Tremor, desvio, rachaduras

### 📊 **2. Sistema de Relatórios**

#### Visualização Completa
- ✅ Relatório formatado profissional
- ✅ Organização por seções
- ✅ Achados clínicos destacados
- ✅ Alertas de urgência em vermelho

#### Impressão
- ✅ Botão "Imprimir" integrado
- ✅ Layout otimizado para papel A4
- ✅ Cabeçalho com dados do paciente
- ✅ Rodapé com disclaimers

#### Exportação PDF
- ✅ Botão "Exportar PDF"
- ✅ Geração automática via jsPDF + html2canvas
- ✅ Nome do arquivo: `relatorio-sinais-clinicos-[nome]-[timestamp].pdf`
- ✅ Qualidade alta (scale: 2)

### 💾 **3. Sistema de Histórico**

#### Armazenamento Local
- ✅ Salvamento automático no localStorage
- ✅ Capacidade: últimos 50 registros
- ✅ Dados persistentes entre sessões

#### Interface de Histórico
- ✅ Botão "Histórico" com contador
- ✅ Dialog modal com lista de análises
- ✅ Informações: paciente, data/hora, nº imagens
- ✅ Botão "Carregar" para cada item
- ✅ Botão "Limpar" histórico completo

#### Recuperação de Análises
- ✅ Clique para carregar análise anterior
- ✅ Restauração completa dos dados
- ✅ Carregamento no formulário principal

### 💊 **4. Recomendações Terapêuticas**

#### Suplementação
- Dosagens específicas por condição
- Tempo de uso recomendado
- Sinergias entre suplementos

#### Fitoterapia
- Ervas chinesas (Pinyin + nome latino)
- Ervas ayurvédicas
- Fitoterápicos ocidentais
- Formas de preparo e dosagem

#### Acupuntura
- Pontos específicos por condição
- Protocolo completo
- Técnicas complementares (moxa)

#### Mudanças de Dieta
- Alimentos a evitar
- Alimentos terapêuticos
- Padrões alimentares (jejum, etc.)

#### Exames Laboratoriais
- Exames necessários por achado
- Priorização (urgente vs. rotina)
- Valores de referência

---

## 🚀 Instalação e Uso

### Pré-requisitos
```bash
Node.js 16+
npm ou yarn
```

### Instalação
```bash
cd anamnese-app
npm install --legacy-peer-deps
```

### Executar
```bash
npm start
```

Acesse: `http://localhost:3000`

---

## 📦 Dependências Principais

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "@mui/material": "^6.5.0",
  "@mui/icons-material": "^6.5.0",
  "jspdf": "^2.5.2",
  "jspdf-autotable": "^3.8.4",
  "html2canvas": "^1.4.1",
  "react-hook-form": "^7.x",
  "yup": "^1.x"
}
```

---

## 📝 Estrutura de Dados

### Análise de Sinais Clínicos
```javascript
{
  patientId: string,
  patientName: string,
  date: ISO string,
  imagesAnalyzed: string[],
  
  skinAnalysis: {
    overview: string,
    faceAnalysis: {
      zones: [{
        area: string,
        organs: string[],
        findings: string[],
        tcm: string,
        ayurveda: string
      }],
      colorAnalysis: {...},
      textureAndQuality: {...}
    },
    skinConditions: [...]
  },
  
  nailAnalysis: {
    overview: string,
    normalNail: {...},
    nailSigns: [{
      sign: string,
      significance: string,
      organs: string[],
      tcm: string,
      recommendations: string[],
      urgency?: string
    }],
    lunarAnalysis: {...}
  },
  
  earAnalysis: {
    overview: string,
    earMapping: {
      zones: [...],
      frankSign: {
        title: string,
        description: string,
        significance: string,
        urgency: string,
        recommendations: string[]
      }
    },
    auriculotherapy: {...}
  },
  
  eyeAnalysis: {...},
  hairAnalysis: {...},
  tongueAnalysis: {...},
  
  generalFindings: {
    constitutionalType: string,
    overallHealth: string,
    mainConcerns: string[]
  },
  
  integratedRecommendations: {
    priority1: {
      title: string,
      reason: string,
      actions: string[]
    },
    priority2: {...},
    priority3: {...},
    lifestyle: {...}
  }
}
```

---

## 🎨 Componentes Principais

### ClinicalSignsAnalysis.js
Componente principal de análise
- Upload/captura de imagens
- Processamento de análise
- Integração com histórico
- Gerenciamento de estado

### ClinicalSignsReport.js
Componente de relatório
- Visualização formatada
- Impressão
- Exportação PDF
- Layout responsivo

### AnamneseForm.js
Formulário principal
- 50 campos de anamnese
- Integração com análises
- Validação de dados
- Salvamento local

---

## 🔐 Armazenamento de Dados

### localStorage Keys
- `clinicalSignsHistory` - Histórico de análises de sinais
- `iridologyHistory` - Histórico de análises de iridologia
- `anamneseData` - Dados de anamneses salvas

### Formato
```javascript
// clinicalSignsHistory
[
  {
    id: timestamp,
    patientId: string,
    patientName: string,
    date: ISO string,
    savedAt: ISO string,
    imagesAnalyzed: string[],
    ...analysisData
  }
]
```

---

## 🚨 Alertas e Urgências

### Sistema de Priorização

**🔴 URGENTE (Priority 1):**
- Sinal de Frank (cardiovascular)
- Anisocoria súbita
- Baqueteamento digital
- Icterícia
- Língua preta/marrom
- Cianose

**🟡 ATENÇÃO (Priority 2):**
- Deficiências nutricionais severas
- Sinais de toxemia
- Alterações hormonais
- Inflamações crônicas

**🟢 ROTINA (Priority 3):**
- Desintoxicação
- Otimização nutricional
- Mudanças de estilo de vida

---

## 📖 Referências Clínicas

1. **Face Reading:** Lillian Bridges - Face Reading in Chinese Medicine
2. **Unhas:** Beaven and Brooks - A Guide to Nail Pathology
3. **Orelhas:** Nogier - Auriculotherapy Manual
4. **Olhos:** Ted Kaptchuk - The Web That Has No Weaver
5. **Cabelo:** Andrew W. Saul - Orthomolecular Medicine
6. **Língua:** Giovanni Maciocia - Diagnosis in Chinese Medicine
7. **Sinal de Frank:** Sanders T. Frank (1973) - Original study

---

## 🔄 Fluxo de Uso

1. **Preencher formulário** de anamnese (50 campos)
2. **Upload/captura** de imagens (8 áreas)
3. **Clicar "Analisar Sinais"** (processamento ~3s)
4. **Visualizar relatório** completo com achados
5. **Imprimir ou exportar PDF** conforme necessário
6. **Acessar histórico** para análises anteriores

---

## 🛠️ Manutenção

### Limpar Histórico
```javascript
localStorage.removeItem('clinicalSignsHistory');
```

### Backup Manual
```javascript
const backup = localStorage.getItem('clinicalSignsHistory');
// Salvar em arquivo texto
```

### Restaurar Backup
```javascript
localStorage.setItem('clinicalSignsHistory', backupData);
```

---

## 📱 Responsividade

- ✅ Desktop (1920x1080+)
- ✅ Laptop (1366x768)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)

---

## 🎯 Próximas Melhorias Sugeridas

1. **Backend Real**
   - API REST
   - Banco PostgreSQL
   - Autenticação JWT

2. **Análise de IA**
   - Reconhecimento automático de sinais
   - Machine Learning para diagnóstico
   - Sugestões personalizadas

3. **Integração Externa**
   - Consultório.me
   - Google Calendar
   - WhatsApp Business

4. **Recursos Avançados**
   - Prontuário eletrônico completo
   - Prescrições digitais
   - Telemedicina integrada

---

## 📞 Suporte

Para dúvidas ou sugestões:
- Documentação completa no código
- Comentários detalhados em cada componente
- README específico para cada módulo

---

## 📄 Licença

Sistema desenvolvido para uso profissional em terapias integrativas.
Consulte sempre um profissional qualificado para interpretação clínica.

---

**Última atualização:** 1 de Dezembro de 2025
**Versão:** 2.0.0
**Status:** ✅ Produção
