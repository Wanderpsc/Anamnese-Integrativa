# Resumo da Extração de Anamnese

## 📊 Estatísticas Gerais

**Data da Extração:** 03/02/2026

### Totais Extraídos
- ✅ **1.578 perguntas** identificadas
- ✅ **11 categorias** de sistemas corporais
- ✅ **32 protocolos** terapêuticos
- ✅ **4 arquivos** DOCX processados

### Arquivos Processados

| Arquivo | Parágrafos | Perguntas Extraídas |
|---------|------------|---------------------|
| `1 da página 001 à 128.docx` | 6.784 | 961 |
| `2 da página 129 à 238.docx` | 1.689 | 161 |
| `3 da página 239 à 240 - EXAMES.docx` | 21 | 8 |
| `4 da página 242 à 424.docx` | 3.658 | 448 |
| **TOTAL** | **12.152** | **1.578** |

---

## 📋 Categorias e Distribuição

| # | Categoria | Perguntas | % do Total |
|---|-----------|-----------|------------|
| 1 | **Geral** | 805 | 51,0% |
| 2 | **Musculoesquelético** | 398 | 25,2% |
| 3 | **Nervoso** | 122 | 7,7% |
| 4 | **Cardiovascular** | 76 | 4,8% |
| 5 | **Endócrino** | 45 | 2,9% |
| 6 | **Digestivo** | 44 | 2,8% |
| 7 | **Urinário** | 40 | 2,5% |
| 8 | **Imunológico** | 25 | 1,6% |
| 9 | **Pele** | 11 | 0,7% |
| 10 | **Respiratório** | 9 | 0,6% |
| 11 | **Reprodutivo** | 3 | 0,2% |

---

## 📝 Exemplos de Perguntas por Categoria

### 🫀 CARDIOVASCULAR (76 perguntas)

1. Você sente variações na sua pressão ao longo do dia, como em momentos de estresse, cansaço ou após as refeições?
2. Já percebeu sintomas como tontura, dor de cabeça ou palpitação que possam estar relacionados à sua pressão?
3. Você já mediu sua pressão em casa? Como ela costuma se comportar fora do consultório?
4. Percebe relação entre sua qualidade do sono ou níveis de estresse com sua pressão arterial?
5. Você costuma sentir seu coração bater acelerado ou lento, mesmo em repouso?

### 🍽️ DIGESTIVO (44 perguntas)

1. Como você percebe sua digestão hoje? Sente-se estufado(a), com gases, constipado(a) ou sente alívio após as refeições?
2. Você costuma consumir alimentos fermentados ou ricos em fibras? Como seu intestino responde a eles?
3. Sente que há relação entre suas emoções e a saúde do seu intestino? Por exemplo, intestino preso quando está ansioso(a)?
4. Você sente que seu intestino responde rápido às suas escolhas alimentares? Como ele reage quando você muda a alimentação?
5. Após consumir álcool, você se sente bem no dia seguinte? Nota impactos no sono, humor ou digestão?

### 🧠 NERVOSO (122 perguntas)

1. Como é a sua memória? Tem falhas esporádicas?
2. Já percebeu se a alimentação ou nível de estresse influenciam nos sintomas?
3. Como é a sua relação emocional com a comida? Comer te traz conforto, culpa, prazer ou ansiedade?
4. Existe relação com outras fases da vida (gravidez, traumas, separações, estresse intenso)?
5. Consegue parar por alguns segundos, fechar os olhos e perceber o ritmo da sua respiração agora?

### 🩸 ENDÓCRINO (45 perguntas)

1. Tem sentido mudanças no peso, apetite, sede ou frequência urinária que não consegue explicar?
2. Percebe alterações de humor, energia ou libido que podem estar relacionadas a hormônios?
3. Já fez exames de tireoide? Tem histórico familiar de problemas tireoidianos?
4. Nota sintomas como intolerância ao frio ou calor, suor excessivo ou alterações na pele?
5. Como está sua disposição ao longo do dia? Tem picos de energia ou queda constante?

### 🦴 MUSCULOESQUELÉTICO (398 perguntas)

1. Tem sentido dores articulares ou musculares? Em que momentos elas aparecem?
2. Percebe rigidez matinal ou dificuldade para iniciar movimentos?
3. Já teve diagnóstico de artrite, artrose ou outra condição nas articulações?
4. As dores pioram com movimento ou com repouso?
5. Nota inchaço nas articulações ou sinais de inflamação?

### 🛡️ IMUNOLÓGICO (25 perguntas)

1. Você já teve alguma infecção recorrente ou sente que adoece com facilidade?
2. Você já teve febres inexplicadas, suores noturnos ou calafrios frequentes?
3. Tem histórico de alergias alimentares ou familiares com doenças autoimunes?
4. Já foi investigado se suas infecções têm relação com alguma deficiência nutricional?
5. Percebe se seu corpo dá sinais quando está precisando de algo, como câimbras ou queda de cabelo?

### 🫁 RESPIRATÓRIO (9 perguntas)

1. Consegue perceber os efeitos no seu corpo (respiração, energia, pele, sono)?
2. Sua respiração é curta ou acelerada?
3. Consegue parar por alguns segundos, fechar os olhos e perceber o ritmo da sua respiração agora?
4. Tem tosse crônica ou falta de ar em situações específicas?
5. Nota chiado no peito ou dificuldade para respirar fundo?

### 🫘 URINÁRIO (40 perguntas)

1. Como está a frequência e o volume urinário? Nota mudanças recentes?
2. Tem urgência para urinar ou dificuldade para esvaziar completamente a bexiga?
3. Percebe alterações na cor ou odor da urina?
4. Tem histórico de infecções urinárias? Com que frequência?
5. Sente dor ou desconforto ao urinar?

### 🌟 GERAL (805 perguntas)

1. O que te trouxe à minha consulta? Qual sua queixa principal?
2. Faz atividade física regular? Como é a rotina de atividades diárias?
3. Como é a sua alimentação? Coloque em detalhes cada refeição e o que tem costume de beliscar entre elas.
4. Como é a sua disposição durante o dia? Muito cansaço pela manhã ou tarde?
5. Qual foi a última vez que tomou antibióticos e qual a frequência que você precisa?

---

## 🏥 Estrutura do JSON Gerado

O arquivo `anamnesis_complete_data.json` contém:

```json
{
  "metadata": {
    "version": "1.0",
    "extractionDate": "2026-02-03",
    "totalQuestions": 1578,
    "totalCategories": 11,
    "totalConditions": 1,
    "totalProtocols": 32,
    "sourceFiles": [...]
  },
  "categories": [
    "cardiovascular",
    "digestivo",
    "endócrino",
    "geral",
    "imunológico",
    "musculoesquelético",
    "nervoso",
    "pele",
    "reprodutivo",
    "respiratório",
    "urinário"
  ],
  "questions": [
    {
      "id": "q1",
      "text": "Pergunta...",
      "category": "categoria",
      "type": "yes_no",
      "source": "arquivo.docx",
      "relatedConditions": []
    },
    ...
  ],
  "conditions": {
    // Mapeamento de condições para descrições, sintomas e tratamentos
  },
  "protocols": [
    // Lista de protocolos terapêuticos identificados
  ],
  "categoriesDescription": {
    // Descrições completas de cada categoria
  }
}
```

---

## 💊 Protocolos Identificados (32 total)

Exemplos de protocolos terapêuticos extraídos:

1. **Ajustes de Terapia:** Inclui substituições por alternativas naturais, retirada gradual...
2. **Cessação Assistida:** Uso de fitoterápicos, florais, adaptógenos e protocolos de detox...
3. **Ajuste de Terapias:** Com base nos achados da RM, o farmacêutico pode recomendar...
4. **Cuidados domiciliares guiados:** Monitoramento domiciliar orientado por protocolos...
5. **Respostas às Intervenções:** A observação cuidadosa da resposta a cada fase do tratamento...

---

## 🎯 Próximos Passos

### 1. Refinamento das Perguntas
- Revisar perguntas que podem estar duplicadas
- Melhorar a formulação de perguntas muito longas ou complexas
- Adicionar perguntas de acompanhamento (follow-ups)

### 2. Enriquecimento de Dados
- Adicionar relações entre sintomas e condições
- Mapear tratamentos específicos para cada condição
- Incluir valores de referência para exames

### 3. Interface de Anamnese
- Criar componente React para exibir perguntas por categoria
- Implementar sistema de pontuação/scoring
- Adicionar lógica condicional (perguntas que aparecem baseadas em respostas anteriores)

### 4. Integração com Sistema
- Conectar com banco de dados de pacientes
- Implementar salvamento de respostas
- Gerar relatórios automáticos baseados nas respostas

---

## 📁 Arquivos Gerados

1. **`anamnesis_complete_data.json`** (12.863 linhas)
   - JSON completo com todas as perguntas, categorias, condições e protocolos
   
2. **`extract_complete_anamnesis.py`**
   - Script Python para extração dos dados dos arquivos DOCX
   
3. **`analyze_extracted_data.py`**
   - Script Python para análise e visualização dos dados extraídos

---

## ✅ Status da Extração

| Item | Status | Observações |
|------|--------|-------------|
| Extração de perguntas | ✅ Concluído | 1.578 perguntas identificadas |
| Categorização | ✅ Concluído | 11 categorias principais |
| Identificação de protocolos | ✅ Concluído | 32 protocolos encontrados |
| Relações anamnéticas | ⚠️ Parcial | Necessita refinamento manual |
| Condições/diagnósticos | ⚠️ Parcial | Apenas 1 condição mapeada automaticamente |
| Validação manual | 🔄 Pendente | Requer revisão médica |

---

## 🔧 Melhorias Futuras

### Algoritmo de Extração
- Melhorar detecção de relações entre sintomas e diagnósticos
- Adicionar identificação de tratamentos por condição
- Implementar reconhecimento de valores de referência de exames

### Qualidade dos Dados
- Remover perguntas duplicadas
- Normalizar formulação das perguntas
- Adicionar metadados (nível de importância, criticidade)

### Funcionalidades Adicionais
- Sistema de busca por palavras-chave
- Filtros por categoria e gravidade
- Exportação para outros formatos (Excel, CSV)
- API REST para acesso aos dados

---

**Criado em:** 03/02/2026  
**Versão:** 1.0  
**Autor:** Sistema de Extração Automática de Anamnese
