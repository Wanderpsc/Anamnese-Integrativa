# 📚 Guia de Uso - Sistema de Anamnese Integrativa

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquivos Gerados](#arquivos-gerados)
3. [Estrutura dos Dados](#estrutura-dos-dados)
4. [Como Usar o JSON](#como-usar-o-json)
5. [Exemplo de Implementação](#exemplo-de-implementação)
6. [APIs e Integrações](#apis-e-integrações)
7. [Personalização](#personalização)
8. [FAQ](#faq)

---

## 🎯 Visão Geral

Este sistema extrai automaticamente perguntas de anamnese de arquivos DOCX e as organiza em formato JSON estruturado para uso em aplicações web.

### Estatísticas da Extração

- ✅ **1.578 perguntas** extraídas
- ✅ **11 categorias** de sistemas corporais
- ✅ **32 protocolos** terapêuticos
- ✅ **4 arquivos** DOCX processados

---

## 📁 Arquivos Gerados

### 1. **anamnesis_complete_data.json**
Arquivo principal contendo todos os dados extraídos.

```
Tamanho: 0.49 MB
Linhas: 12.863
Formato: JSON UTF-8
```

### 2. **Scripts Python**

| Arquivo | Descrição |
|---------|-----------|
| `extract_complete_anamnesis.py` | Script de extração dos dados DOCX |
| `analyze_extracted_data.py` | Script de análise estatística |
| `view_stats.py` | Visualizador de estatísticas |

### 3. **Exemplos de Interface**

| Arquivo | Descrição |
|---------|-----------|
| `example-react-component.jsx` | Componente React de exemplo |
| `example-anamnesis-styles.css` | Estilos CSS completos |

### 4. **Documentação**

| Arquivo | Descrição |
|---------|-----------|
| `RESUMO-EXTRACAO-ANAMNESE.md` | Resumo executivo da extração |
| `GUIA-DE-USO-ANAMNESE.md` | Este arquivo |

---

## 📊 Estrutura dos Dados

### JSON Principal

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
  "categories": [...],
  "questions": [...],
  "conditions": {...},
  "protocols": [...],
  "categoriesDescription": {...}
}
```

### Objeto de Pergunta

```json
{
  "id": "q123",
  "text": "Você sente variações na sua pressão ao longo do dia?",
  "category": "cardiovascular",
  "type": "yes_no",
  "source": "1 da página 001 à 128.docx",
  "relatedConditions": []
}
```

### Categorias Disponíveis

1. **Cardiovascular** (76 perguntas)
2. **Digestivo** (44 perguntas)
3. **Endócrino** (45 perguntas)
4. **Geral** (805 perguntas)
5. **Imunológico** (25 perguntas)
6. **Musculoesquelético** (398 perguntas)
7. **Nervoso** (122 perguntas)
8. **Pele** (11 perguntas)
9. **Reprodutivo** (3 perguntas)
10. **Respiratório** (9 perguntas)
11. **Urinário** (40 perguntas)

---

## 🔧 Como Usar o JSON

### 1. Carregar os Dados

#### JavaScript/TypeScript
```javascript
import anamnesisData from './anamnesis_complete_data.json';

console.log(`Total de perguntas: ${anamnesisData.metadata.totalQuestions}`);
```

#### Python
```python
import json

with open('anamnesis_complete_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Total de perguntas: {len(data['questions'])}")
```

### 2. Filtrar por Categoria

```javascript
// Obter todas as perguntas cardiovasculares
const cardiovascularQuestions = anamnesisData.questions.filter(
  q => q.category === 'cardiovascular'
);

console.log(`Perguntas cardiovasculares: ${cardiovascularQuestions.length}`);
```

### 3. Buscar por Texto

```javascript
// Buscar perguntas que contenham "pressão"
const pressaoQuestions = anamnesisData.questions.filter(
  q => q.text.toLowerCase().includes('pressão')
);
```

### 4. Agrupar por Categoria

```javascript
const questionsByCategory = anamnesisData.categories.reduce((acc, category) => {
  acc[category] = anamnesisData.questions.filter(
    q => q.category === category
  );
  return acc;
}, {});
```

---

## 💻 Exemplo de Implementação

### React Component Básico

```jsx
import React, { useState } from 'react';
import anamnesisData from './anamnesis_complete_data.json';

function AnamnesisForm() {
  const [answers, setAnswers] = useState({});
  const [category, setCategory] = useState('geral');

  const questions = anamnesisData.questions.filter(
    q => q.category === category
  );

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  return (
    <div>
      <h1>Anamnese Integrativa</h1>
      
      {/* Seletor de Categoria */}
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
      >
        {anamnesisData.categories.map(cat => (
          <option key={cat} value={cat}>
            {anamnesisData.categoriesDescription[cat]}
          </option>
        ))}
      </select>

      {/* Perguntas */}
      {questions.map(question => (
        <div key={question.id}>
          <p>{question.text}</p>
          <button onClick={() => handleAnswer(question.id, true)}>
            Sim
          </button>
          <button onClick={() => handleAnswer(question.id, false)}>
            Não
          </button>
        </div>
      ))}

      {/* Progresso */}
      <p>
        Respondidas: {Object.keys(answers).length} / {anamnesisData.metadata.totalQuestions}
      </p>
    </div>
  );
}

export default AnamnesisForm;
```

### Vue.js Component

```vue
<template>
  <div class="anamnesis">
    <h1>Anamnese Integrativa</h1>
    
    <select v-model="selectedCategory">
      <option 
        v-for="cat in categories" 
        :key="cat" 
        :value="cat"
      >
        {{ categoriesDescription[cat] }}
      </option>
    </select>

    <div v-for="question in filteredQuestions" :key="question.id">
      <p>{{ question.text }}</p>
      <button @click="answer(question.id, true)">Sim</button>
      <button @click="answer(question.id, false)">Não</button>
    </div>
  </div>
</template>

<script>
import anamnesisData from './anamnesis_complete_data.json';

export default {
  data() {
    return {
      selectedCategory: 'geral',
      answers: {},
      categories: anamnesisData.categories,
      categoriesDescription: anamnesisData.categoriesDescription,
      questions: anamnesisData.questions
    };
  },
  computed: {
    filteredQuestions() {
      return this.questions.filter(
        q => q.category === this.selectedCategory
      );
    }
  },
  methods: {
    answer(questionId, value) {
      this.answers[questionId] = value;
    }
  }
};
</script>
```

---

## 🔌 APIs e Integrações

### API REST Exemplo

```javascript
// Node.js + Express
const express = require('express');
const anamnesisData = require('./anamnesis_complete_data.json');

const app = express();

// Obter todas as categorias
app.get('/api/categories', (req, res) => {
  res.json(anamnesisData.categories);
});

// Obter perguntas por categoria
app.get('/api/questions/:category', (req, res) => {
  const { category } = req.params;
  const questions = anamnesisData.questions.filter(
    q => q.category === category
  );
  res.json(questions);
});

// Obter uma pergunta específica
app.get('/api/question/:id', (req, res) => {
  const { id } = req.params;
  const question = anamnesisData.questions.find(q => q.id === id);
  res.json(question);
});

// Buscar perguntas
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  const results = anamnesisData.questions.filter(
    question => question.text.toLowerCase().includes(q.toLowerCase())
  );
  res.json(results);
});

app.listen(3000);
```

### GraphQL Schema

```graphql
type Query {
  questions(category: String): [Question!]!
  question(id: ID!): Question
  categories: [Category!]!
  protocols: [Protocol!]!
}

type Question {
  id: ID!
  text: String!
  category: String!
  type: String!
  source: String!
  relatedConditions: [String!]!
}

type Category {
  name: String!
  description: String!
  questionCount: Int!
}

type Protocol {
  name: String!
  description: String!
  steps: [String!]!
}
```

---

## 🎨 Personalização

### Adicionar Novas Perguntas

```javascript
// Adicionar uma nova pergunta programaticamente
const newQuestion = {
  id: `q${anamnesisData.metadata.totalQuestions + 1}`,
  text: "Sua nova pergunta aqui?",
  category: "geral",
  type: "yes_no",
  source: "manual",
  relatedConditions: []
};

anamnesisData.questions.push(newQuestion);
anamnesisData.metadata.totalQuestions++;
```

### Criar Subcategorias

```javascript
// Agrupar perguntas em subcategorias
const subcategories = {
  cardiovascular: {
    pressao: [],
    frequenciaCardiaca: [],
    circulacao: []
  }
};

anamnesisData.questions
  .filter(q => q.category === 'cardiovascular')
  .forEach(question => {
    if (question.text.includes('pressão')) {
      subcategories.cardiovascular.pressao.push(question);
    } else if (question.text.includes('coração') || question.text.includes('batimento')) {
      subcategories.cardiovascular.frequenciaCardiaca.push(question);
    } else {
      subcategories.cardiovascular.circulacao.push(question);
    }
  });
```

### Sistema de Pontuação

```javascript
// Implementar pontuação baseada nas respostas
const calculateScore = (answers) => {
  let score = 0;
  
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = anamnesisData.questions.find(q => q.id === questionId);
    
    if (answer === true) {
      // Perguntas sobre sintomas graves valem mais pontos
      if (question.category === 'cardiovascular') {
        score += 5;
      } else {
        score += 1;
      }
    }
  });
  
  return {
    score,
    level: score < 10 ? 'Baixo' : score < 30 ? 'Moderado' : 'Alto'
  };
};
```

---

## ❓ FAQ

### P: Como adicionar mais arquivos DOCX para extração?

**R:** Edite o arquivo `extract_complete_anamnesis.py` e adicione o nome do arquivo na lista `FILES`:

```python
FILES = [
    "1 da página 001 à 128.docx",
    "2 da página 129 à 238.docx",
    "3 da página 239 à 240 - EXAMES.docx",
    "4 da página 242 à 424.docx",
    "SEU_NOVO_ARQUIVO.docx"  # Adicione aqui
]
```

### P: Como melhorar a qualidade das perguntas extraídas?

**R:** O script usa padrões regex para identificar perguntas. Você pode:

1. Editar os padrões em `yes_no_patterns`
2. Adicionar novos indicadores em `symptom_patterns`
3. Revisar manualmente o JSON gerado

### P: Como exportar para Excel?

**R:** Use pandas em Python:

```python
import json
import pandas as pd

with open('anamnesis_complete_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

df = pd.DataFrame(data['questions'])
df.to_excel('anamnesis_questions.xlsx', index=False)
```

### P: Como integrar com banco de dados?

**R:** Exemplo com PostgreSQL:

```sql
CREATE TABLE questions (
  id VARCHAR(50) PRIMARY KEY,
  text TEXT NOT NULL,
  category VARCHAR(50),
  type VARCHAR(20),
  source VARCHAR(255)
);

-- Importar dados
COPY questions FROM 'questions.csv' DELIMITER ',' CSV HEADER;
```

### P: As perguntas estão duplicadas?

**R:** Execute o script de análise:

```bash
python analyze_extracted_data.py
```

Para remover duplicatas programaticamente:

```python
seen = set()
unique_questions = []

for q in data['questions']:
    if q['text'] not in seen:
        seen.add(q['text'])
        unique_questions.append(q)

data['questions'] = unique_questions
```

---

## 📞 Suporte

Para dúvidas ou sugestões:

1. Revise a documentação completa em `RESUMO-EXTRACAO-ANAMNESE.md`
2. Execute os scripts de análise para verificar os dados
3. Consulte os exemplos de código fornecidos

---

## 🚀 Próximos Passos

1. **Validação Médica**: Revisar perguntas com profissional de saúde
2. **Refinamento**: Melhorar formulação de perguntas complexas
3. **Enriquecimento**: Adicionar relações entre sintomas e diagnósticos
4. **Interface**: Implementar sistema completo com salvamento de respostas
5. **Relatórios**: Gerar análises automáticas baseadas nas respostas

---

**Versão:** 1.0  
**Data:** 03/02/2026  
**Status:** ✅ Pronto para uso
