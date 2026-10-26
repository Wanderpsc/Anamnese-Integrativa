# 📊 Sintomas e Carências - Organização por Sistemas

## ✅ Reorganização Completa Implementada

### 🎯 **Nova Estrutura**

Os **108 sintomas** foram reorganizados e agrupados por **12 sistemas do corpo humano**, com ordenação alfabética dentro de cada sistema.

---

## 🗂️ **Organização por Sistemas**

### 1. ❤️ **SISTEMA CARDIOVASCULAR** (7 sintomas)

- Alteração De Pressão / Hipertensão / Hipotensão
- Arritmias
- Edemas Nas Pernas
- Frio Nas Extremidades / Sensibilidade Ao Frio
- Hematomas Fáceis
- Hemorragias Gengivais
- Hipertensão

---

### 2. 🧠 **SISTEMA NERVOSO E MENTAL** (20 sintomas)

- Alterações De Humor / Ansiedade
- Apatia
- Burnout
- Confusão Mental
- Depressão / Pessimismo / Apatia
- Depressão Pós-Parto
- Depressão Sazonal
- Distúrbio Bipolar
- Enxaqueca
- Episódios De Memória / Confusão
- Esclerose Múltipla
- Esquizofrenia
- Estresse Exacerbado / Burnout / Distress
- Formigamento
- Irritabilidade
- Má Memória / Confusão Mental
- Neuropatia Periférica
- Parkinson
- Tontura / Vertigem
- Tontura Ao Levantar

---

### 3. 🍽️ **SISTEMA DIGESTIVO** (15 sintomas)

- Alternância Intestinal
- Apetite Irregular
- Boca Seca
- Celiaco
- Cólicas Intestinais
- Desconforto Abdominal
- Diarreia
- Doença De Crohn
- Flatulências
- Gengivite
- Intestino Irritável
- Má Digestão
- Náuseas
- Perda De Apetite
- Sindrome Do Intestino Permeável

---

### 4. 💪 **SISTEMA MUSCULOESQUELÉTICO** (14 sintomas)

- Bruxismo
- Cãibras Noturnas
- Desmineralização Óssea
- Dificuldade De Ganho De Massa Muscular
- Dor Articular
- Dores Articulares
- Dores Musculares
- Dores Na Coluna
- Fraturas Frequentes
- Osteomalácia
- Osteoporose
- Perda De Massa Óssea
- Pernas Inquietas
- Tendinite

---

### 5. 🎨 **SISTEMA TEGUMENTAR - Pele, Cabelo, Unhas** (14 sintomas)

- Acne
- Alterações Na Pele / Dermatites
- Caspa
- Dermatite
- Hiperpigmentação
- Pele Amarelada
- Pele Seca
- Problemas De Cicatrização
- Psoríase
- Queda De Cabelo
- Rachaduras No Canto Da Boca
- Rachaduras Nos Lábios / Cantos Da Boca
- Rosácea
- Unhas Fracas

---

### 6. 🛡️ **SISTEMA IMUNOLÓGICO** (10 sintomas)

- Alergias / Alergias Temporárias / Alimentares
- Alergias Alimentares
- Dor De Garganta Recorrente
- Herpes Recorrente
- Imunidade Baixa
- Infecção Urinária Recorrente
- Infecções De Repetição / Herpes / Vias Aéreas / Urinária
- Infecções De Vias Aéreas Frequentes
- Pielonefrite
- Sinusite Crônica

---

### 7. 🔬 **SISTEMA ENDÓCRINO E METABÓLICO** (8 sintomas)

- Diabetes Tipo 2
- Hipoglicemia
- Hipoglicemia Reativa
- Hipotireoidismo
- Sensibilidade Ao Calor
- Sensibilidade Ao Frio
- Sindrome Metabólica
- Sudorese Excessiva

---

### 8. 👶 **SISTEMA REPRODUTOR** (8 sintomas)

- Baixa Libido
- Cólica Menstrual Intensa
- Endometriose
- Impotência / Baixa Libido
- Infertilidade Feminina
- Infertilidade Masculina / Esterilidade
- Menopausa / Alterações Hormonais
- Ovário Policistico (SOP)

---

### 9. 👁️ **SISTEMA VISUAL** (4 sintomas)

- Alterações Na Visão / Visão Noturna
- Cansaço Ocular
- Olhos Secos
- Visão Noturna Ruim

---

### 10. 🩸 **SISTEMA SANGUÍNEO** (1 sintoma)

- Anemia

---

### 11. 💧 **SISTEMA URINÁRIO** (1 sintoma)

- Enurese

---

### 12. 😴 **SONO E ENERGIA** (6 sintomas)

- Acorda Com Sono
- Desperta À Noite
- Fadiga / Fadiga Crônica / Sem Energia
- Sindrome Da Fadiga Crônica
- Sono Irregular / Demora A Dormir / Sonolência Diurna / Acorda Com Sono
- Sonolência Durante O Dia

---

## 🆕 **Novas Funcionalidades Adicionadas**

### 1. **Busca por Sistema**
```javascript
import { buscarSintomasPorSistema } from './data/sintomasCarenciasData';

// Buscar todos os sintomas do sistema cardiovascular
const sintomasCardio = buscarSintomasPorSistema("SISTEMA CARDIOVASCULAR");
```

### 2. **Listar Sistemas Disponíveis**
```javascript
import { getSistemasDisponiveis } from './data/sintomasCarenciasData';

// Retorna array com todos os sistemas
const sistemas = getSistemasDisponiveis();
// ["SISTEMA CARDIOVASCULAR", "SISTEMA NERVOSO E MENTAL", ...]
```

### 3. **Campo Sistema em Cada Sintoma**
```javascript
{
  id: 1,
  sintoma: "Arritmias",
  sistema: "SISTEMA CARDIOVASCULAR", // NOVO CAMPO
  carencias: [...]
}
```

---

## 📊 **Estatísticas da Reorganização**

| Métrica | Valor |
|---------|-------|
| **Total de Sintomas** | 108 |
| **Total de Sistemas** | 12 |
| **Linhas de Código** | 5.022 |
| **Maior Sistema** | Sistema Nervoso (20 sintomas) |
| **Menor Sistema** | Sistema Sanguíneo (1 sintoma) |
| **Média por Sistema** | 9 sintomas |

---

## 🔧 **Melhorias Implementadas**

### ✅ **Organização Lógica**
- Sintomas agrupados por sistema corporal
- Facilita localização e compreensão
- Estrutura profissional e científica

### ✅ **Ordem Alfabética**
- Dentro de cada sistema, sintomas em ordem alfabética
- Facilita busca visual
- Padronização profissional

### ✅ **Comentários Visuais**
- Separadores claros entre sistemas
- Cabeçalhos destacados
- Código mais legível

### ✅ **Novas Funcionalidades**
- Busca por sistema
- Listagem de sistemas disponíveis
- Campo "sistema" em cada sintoma

### ✅ **Mantidas Todas as Funções Anteriores**
- `buscarCarenciasPorSintoma(id)`
- `buscarMultiplasCarencias([ids])`
- `buscarSintomasPorPalavraChave("palavra")`
- `getTotalSintomas()`

---

## 🎨 **Interface - Próximas Melhorias Sugeridas**

### 1. **Filtro por Sistema na UI**
Adicionar dropdown no formulário para filtrar sintomas por sistema:
```jsx
<Select onChange={handleSistemaFilter}>
  <option>Todos os Sistemas</option>
  <option>SISTEMA CARDIOVASCULAR</option>
  <option>SISTEMA NERVOSO E MENTAL</option>
  // ... outros sistemas
</Select>
```

### 2. **Agrupamento Visual**
Mostrar sintomas agrupados por sistema com cards expansíveis:
```
📂 SISTEMA CARDIOVASCULAR (7)
  ✓ Arritmias
  ✓ Hipertensão
  ✓ Edemas nas Pernas
  ...
```

### 3. **Badge de Sistema**
Adicionar badge visual mostrando o sistema de cada sintoma selecionado

---

## 📂 **Estrutura do Arquivo**

```javascript
// Header com metadados
export const sintomasCarencias = [
  
  // SISTEMA 1
  // ==========================================
  // SISTEMA CARDIOVASCULAR
  // ==========================================
  { id: 1, sintoma: "...", sistema: "...", carencias: [...] },
  { id: 2, sintoma: "...", sistema: "...", carencias: [...] },
  
  // SISTEMA 2
  // ==========================================
  // SISTEMA NERVOSO E MENTAL
  // ==========================================
  { id: 8, sintoma: "...", sistema: "...", carencias: [...] },
  
  // ... demais sistemas
];

// Funções auxiliares
export const buscarCarenciasPorSintoma = ...
export const buscarMultiplasCarencias = ...
export const buscarSintomasPorPalavraChave = ...
export const buscarSintomasPorSistema = ... // NOVA
export const getSistemasDisponiveis = ... // NOVA
export const getTotalSintomas = ...
```

---

## ✅ **Status de Compilação**

- ✅ **Sem erros** de sintaxe
- ✅ **Arquivo válido** JavaScript/ES6
- ✅ **Exports funcionando** corretamente
- ✅ **Compatível** com React
- ✅ **Pronto** para uso em produção

---

## 📝 **Como Usar**

### Exemplo 1: Listar todos os sistemas
```javascript
import { getSistemasDisponiveis } from '@/data/sintomasCarenciasData';

const sistemas = getSistemasDisponiveis();
console.log(sistemas);
// ["SISTEMA CARDIOVASCULAR", "SISTEMA NERVOSO E MENTAL", ...]
```

### Exemplo 2: Buscar sintomas de um sistema específico
```javascript
import { buscarSintomasPorSistema } from '@/data/sintomasCarenciasData';

const sintomasDigestivos = buscarSintomasPorSistema("SISTEMA DIGESTIVO");
console.log(sintomasDigestivos.length); // 15 sintomas
```

### Exemplo 3: Filtro combinado (sistema + palavra-chave)
```javascript
import { buscarSintomasPorSistema, buscarSintomasPorPalavraChave } from '@/data/sintomasCarenciasData';

// Primeiro filtra por sistema
const sintomasCardio = buscarSintomasPorSistema("SISTEMA CARDIOVASCULAR");

// Depois filtra por palavra-chave dentro desse sistema
const resultados = sintomasCardio.filter(s => 
  s.sintoma.toLowerCase().includes("pressão")
);
```

---

## 🎉 **Resumo Final**

✅ **108 sintomas** organizados  
✅ **12 sistemas** do corpo humano  
✅ **Ordem alfabética** dentro de cada sistema  
✅ **2 novas funções** de busca  
✅ **Campo sistema** adicionado a cada sintoma  
✅ **Comentários visuais** para melhor navegação  
✅ **0 erros** de compilação  
✅ **Pronto** para implementação na UI  

**Arquivo atualizado:** `src/data/sintomasCarenciasData.js` (5.022 linhas)
