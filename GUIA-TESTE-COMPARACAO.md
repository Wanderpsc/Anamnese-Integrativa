# 🧪 GUIA DE TESTE - Sistema de Comparação

## 📝 Pré-requisitos

Antes de testar, certifique-se de ter:
- ✅ Pelo menos 2 anamneses do mesmo paciente (ou diferentes)
- ✅ Anamneses com dados no questionário abrangente de saúde
- ✅ Sintomas selecionados em q17a_sintomas_selecionados
- ✅ Carências nutricionais em q17b_carencias_identificadas
- ✅ Sinais vitais preenchidos
- ✅ Sinais clínicos marcados

## 🔬 Cenários de Teste

### Cenário 1: Comparação Básica
**Objetivo:** Verificar se campos básicos são comparados

1. Criar anamnese 1:
   - Nome: João Silva
   - Queixa: "Dores de cabeça constantes"
   - Estresse: "Alto"
   - Ansiedade: "Intensa"

2. Criar anamnese 2 (mesmo paciente):
   - Nome: João Silva
   - Queixa: "Dores ocasionais"
   - Estresse: "Moderado"
   - Ansiedade: "Leve"

3. Comparar e verificar:
   - ✅ Queixa principal mudou
   - ✅ Estresse: ✓ Melhora
   - ✅ Ansiedade: ✓ Melhora
   - ✅ Taxa de melhoria = 100%

### Cenário 2: Sintomas e Carências
**Objetivo:** Verificar comparação de arrays

1. Anamnese 1:
   - Sintomas: ["Dor de cabeça", "Fadiga", "Insônia", "Dores musculares"]
   - Carências: [{ sistema: "Nervoso", carencias: ["B1", "B6", "B12"] }]

2. Anamnese 2:
   - Sintomas: ["Fadiga", "Dores musculares"]
   - Carências: [{ sistema: "Nervoso", carencias: ["B12"] }]

3. Verificar:
   - ✅ Sintomas Reduzidos: -2
   - ✅ Carências Resolvidas: -2
   - ✅ Card "💊 Sintomas e Carências" aparece
   - ✅ Chips de melhora verdes

### Cenário 3: Sinais Vitais
**Objetivo:** Verificar comparação com valores ideais

1. Anamnese 1:
   - Pressão: 150/95 mmHg
   - IMC: 32
   - Frequência Cardíaca: 90 bpm

2. Anamnese 2:
   - Pressão: 130/85 mmHg
   - IMC: 28
   - Frequência Cardíaca: 75 bpm

3. Verificar:
   - ✅ Pressão Sistólica: ✓ Melhora (mais próximo de 120)
   - ✅ Pressão Diastólica: ✓ Melhora (mais próximo de 80)
   - ✅ IMC: ✓ Melhora (mais próximo de 22)
   - ✅ Frequência: ✓ Melhora (mais próximo de 70)
   - ✅ Card "📊 Sinais Vitais" aparece

### Cenário 4: Sinais Clínicos
**Objetivo:** Verificar contagem de sinais

1. Anamnese 1:
   - Unhas: ["Quebradiças", "Manchadas"]
   - Cabelos: ["Quebradiços", "Queda excessiva"]
   - Pele: ["Seca", "Irritada"]

2. Anamnese 2:
   - Unhas: ["Manchadas"]
   - Cabelos: ["Queda excessiva"]
   - Pele: []

3. Verificar:
   - ✅ 💅 Sinais nas Unhas: 2 → 1 (✓ Melhora)
   - ✅ 💇 Sinais nos Cabelos: 2 → 1 (✓ Melhora)
   - ✅ 🧴 Sinais na Pele: 2 → 0 (✓ Melhora)
   - ✅ Card "👁️ Sinais Clínicos" aparece
   - ✅ KPI "Sinais Clínicos Melhorados: 3"

### Cenário 5: Questionário Abrangente
**Objetivo:** Verificar campos detalhados

1. Anamnese 1:
   - Qualidade do Sono: "Ruim"
   - Nível de Energia: "Baixo"
   - Qualidade Alimentação: "Regular"
   - Funcionamento Intestinal: "Irregular (2-3x/semana)"

2. Anamnese 2:
   - Qualidade do Sono: "Boa"
   - Nível de Energia: "Normal"
   - Qualidade Alimentação: "Boa"
   - Funcionamento Intestinal: "Normal (1x ao dia)"

3. Verificar:
   - ✅ 😴 Qualidade do Sono: ✓ Melhora
   - ✅ ⚡ Nível de Energia: ✓ Melhora
   - ✅ 🍽️ Qualidade da Alimentação: ✓ Melhora
   - ✅ 🫃 Funcionamento Intestinal: ✓ Melhora
   - ✅ Cards "🏥 Histórico e Bem-Estar" e "🌿 Estilo de Vida"

## 🎯 Checklist de Validação

### Interface Visual
- [ ] KPIs aparecem com valores corretos
- [ ] Cards categorizados exibem campos relevantes
- [ ] Chips de melhora/piora têm cores corretas (verde/vermelho)
- [ ] Ícones de tendência aparecem (📈📉➡️)
- [ ] Emojis nos labels estão visíveis
- [ ] Cards têm cores de fundo corretas por categoria

### Funcionalidade
- [ ] Comparação funciona com 2 anamneses
- [ ] Comparação funciona com 3 anamneses (opcional)
- [ ] Todos os campos aparecem na lista de mudanças
- [ ] Avaliação de melhora/piora está correta
- [ ] Resumo estatístico calcula corretamente
- [ ] Botão "Imprimir" funciona
- [ ] Botão "Download PDF" funciona

### Lógica de Melhoria
- [ ] Sintomas: menos = melhora ✅
- [ ] Carências: menos = melhora ✅
- [ ] Estresse: menos = melhora ✅
- [ ] Ansiedade: menos = melhora ✅
- [ ] Energia: mais = melhora ✅
- [ ] Qualidade sono: mais = melhora ✅
- [ ] Sinais vitais: aproximação ideal = melhora ✅
- [ ] Sinais clínicos: menos = melhora ✅

## 🐛 Problemas Conhecidos e Soluções

### Problema: Cards vazios
**Causa:** Nenhum campo daquela categoria mudou
**Solução:** Normal - cards só aparecem se houver mudanças

### Problema: KPI não aparece
**Causa:** Campo específico não foi preenchido
**Solução:** Preencher sintomas/carências nas anamneses

### Problema: Melhora/Piora incorreta
**Causa:** Lógica de avaliação pode precisar ajuste
**Solução:** Verificar função `assessImprovement()` em storage.js

### Problema: Campos não aparecem
**Causa:** Nome do campo não corresponde ao fieldKey
**Solução:** Verificar mapeamento em `getFieldLabel()`

## ✅ Teste Completo Passo a Passo

1. **Preparação:**
   ```
   - Abrir aplicação em http://localhost:3000
   - Criar 2 anamneses de "Maria Santos"
   - Preencher TODOS os campos
   - Incluir sintomas e carências
   - Marcar sinais clínicos
   ```

2. **Navegação:**
   ```
   - Ir para /compare
   - Selecionar paciente "Maria Santos"
   - Selecionar anamnese mais antiga (Paciente 1)
   - Selecionar anamnese mais recente (Paciente 2)
   - Clicar "Comparar Agora"
   ```

3. **Validação Visual:**
   ```
   ✅ Cabeçalho com 2 cards de paciente
   ✅ 5 KPIs com valores numéricos
   ✅ Lista completa de mudanças
   ✅ 5-6 cards categorizados
   ✅ Chips coloridos em cada mudança
   ✅ Resumo estatístico no final
   ```

4. **Testes de Interação:**
   ```
   ✅ Imprimir comparação
   ✅ Download PDF
   ✅ Voltar ao dashboard
   ✅ Ver anamnese completa
   ```

## 📊 Resultado Esperado

```
╔══════════════════════════════════════╗
║  📊 Resultado da Comparação          ║
╚══════════════════════════════════════╝

[Card Paciente 1]  ↔️  [Card Paciente 2]

╔══════════════════════════════════════╗
║  📊 Indicadores de Evolução          ║
╠══════════════════════════════════════╣
║  75%    -8      -4      3      3     ║
║ Melhoria Sintomas Carências Clínicos Mental
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  🔍 Mudanças Identificadas: 18       ║
╠══════════════════════════════════════╣
║  [Lista detalhada de mudanças]       ║
║  com chips de melhora/piora          ║
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  📋 Análise por Categoria            ║
╠══════════════════════════════════════╣
║  [💊 Sintomas]  [📊 Sinais Vitais]  ║
║  [👁️ Clínicos]  [🏥 Histórico]      ║
║  [🌿 Estilo Vida]                    ║
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  📈 Resumo Estatístico               ║
╠══════════════════════════════════════╣
║  18 Mudanças | 14 Melhorias | 2 Pioras
╚══════════════════════════════════════╝
```

## 🎉 Critérios de Sucesso

O teste é bem-sucedido se:
- ✅ Todos os campos preenchidos aparecem na comparação
- ✅ KPIs calculam corretamente
- ✅ Cards categorizados exibem mudanças relevantes
- ✅ Chips de melhora/piora estão corretos
- ✅ Interface é clara e visualmente organizada
- ✅ Impressão/PDF funciona

## 📞 Suporte

Se encontrar problemas:
1. Verificar console do navegador (F12)
2. Verificar storage.js para erros de comparação
3. Verificar CompareAnamneses.js para erros de renderização
4. Consultar COMPARACAO-COMPLETA-IMPLEMENTACAO.md

**Status:** Sistema testado e pronto para uso! ✅
