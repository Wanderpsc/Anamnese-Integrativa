# 💊 Deficiência de Vitaminas por Sintomas

## 📋 Descrição

Nova funcionalidade completa para identificação de deficiências vitamínicas e minerais baseada em sintomas apresentados pelo paciente. Sistema inteligente que correlaciona sintomas com possíveis deficiências nutricionais.

## 🎯 Objetivo

Facilitar a identificação de possíveis deficiências de vitaminas, minerais e suplementos através da seleção de sintomas, auxiliando profissionais de saúde na formulação de protocolos de suplementação.

## 🚀 Funcionalidades

### 1. Seleção de Sintomas

- **36 sintomas organizados** em 9 categorias:
  - 🟢 Gastrointestinal
  - 🟡 Digestivo
  - 🟠 Imunológico
  - 🔴 Pele/Cabelos/Unhas
  - 🟣 Neurológico
  - 🔵 Cognitivo
  - 🔴 Energia
  - 🔵 Saúde Mental
  - 🟣 Sono

- **Interface intuitiva**: Chips clicáveis para seleção rápida
- **Busca em tempo real**: Campo de busca para filtrar sintomas
- **Feedback visual**: Cores diferentes por categoria
- **Contador**: Badge mostrando quantos sintomas selecionados por categoria

### 2. Análise Inteligente de Deficiências

- **Cálculo automático**: Identifica vitaminas/minerais relacionados aos sintomas
- **Priorização**: Ordena deficiências por relevância
- **Percentual de ocorrência**: Mostra probabilidade baseada nos sintomas
- **Cores de prioridade**:
  - 🔴 Vermelho: Alta prioridade (≥70%)
  - 🟠 Laranja: Média-alta (50-69%)
  - 🟡 Amarelo: Média (30-49%)
  - 🟢 Verde: Baixa (<30%)

### 3. Informações Detalhadas

Para cada deficiência identificada:
- **Código**: Ex: B12, D, Mg
- **Nome completo**: Ex: Vitamina B12 (Cobalamina)
- **Ocorrências**: Quantos sintomas relacionados
- **Dosagem recomendada**: Faixa terapêutica sugerida
- **Lista de sintomas**: Quais sintomas estão relacionados

### 4. Recursos Adicionais

- **Impressão**: Botão para imprimir relatório completo
- **Limpeza rápida**: Remove todos os sintomas selecionados
- **Navegação por accordion**: Expandir/colapsar categorias
- **Estatísticas**: Resumo com total de sintomas e deficiências
- **Top 5 detalhado**: Expansão com detalhes das 5 principais deficiências

## 📊 Base de Dados

### Sintomas Cobertos (36 total)

**Gastrointestinais:**
- Alternância Intestinal
- Diarréia ++
- Cólicas Intestinais
- Flatulências
- Intestino Irritável

**Digestivos:**
- Apetite Irregular
- Náuseas
- Má Digestão

**Imunológico:**
- Imunidade Baixa

**Pele/Cabelos/Unhas:**
- Alterações na Pele
- Acne
- Unhas Fracas
- Queda de Cabelo
- Hematomas Fáceis
- Sudorese Excessiva

**Neurológicos:**
- Tontura/Vertigem
- Enxaqueca
- Alterações na Visão

**Cognitivos:**
- Má Memória
- Má Concentração

**Energia:**
- Sem Energia

**Saúde Mental:**
- Pessimismo/Depressão
- Alterações de Humor
- Ansiedade

**Sono:**
- Sono Irregular
- Demora para Dormir
- Desperta à Noite
- Sonolência no Dia
- Acorda com Sono
- Enurese

### Vitaminas e Minerais (36 total)

**Vitaminas:**
- A, B1, B2, B3, B5, B6, B7, B9, B12, C, D, E, K2

**Minerais:**
- Fe (Ferro), Mg (Magnésio), Zn (Zinco), Ca (Cálcio), Mn (Manganês), Se (Selênio), I (Iodo), S (Enxofre), Cr (Cromo), BO (Boro), PO (Potássio)

**Suplementos:**
- O3 (Ômega 3), C10 (Coenzima Q10), L-T (L-Triptofano), GL (Glutamina), Q (Quercetina), AL (Ácido Alfa-Lipóico), LU (Luteína), ZE (Zeaxantina), IN (Inositol), L-A (L-Arginina), ME (Melatonina), NAC (N-Acetilcisteína)

## 🎨 Interface do Usuário

### Layout Responsivo
- **2 colunas** em telas médias/grandes
- **1 coluna** em dispositivos móveis
- Sidebar expansível com categorias
- Painel de análise dinâmico

### Cores e Identidade Visual
- Gradientes vibrantes por categoria
- Tema consistente com Material-UI
- Ícones intuitivos
- Chips coloridos para status

### Feedback Visual
- Badges para contadores
- Chips de status (selecionado/não selecionado)
- Tabelas com bordas coloridas por prioridade
- Tooltips informativos

## 🔧 Implementação Técnica

### Arquivos Criados

1. **Base de Dados**:
   - `src/data/vitaminDeficiencyBySymptoms.js`
   - Estrutura completa de sintomas e deficiências
   - Constantes de dosagens e nomes completos

2. **Componente Principal**:
   - `src/pages/VitaminDeficiencyBySymptoms.js`
   - Interface completa com React Hooks
   - Análise em tempo real com useMemo

3. **Integração no Menu**:
   - Adicionado em `src/App.js`
   - Rota: `/vitamin-deficiency-symptoms`
   - Ícone: 💊 (PharmacyIcon)

### Tecnologias Utilizadas

- **React**: Hooks (useState, useMemo)
- **Material-UI**: Componentes e tema
- **React Router**: Navegação
- **CSS**: Estilos para impressão

## 📖 Como Usar

### Para Profissionais de Saúde

1. **Acesse o menu**: Clique em "💊 Deficiência de Vitaminas por Sintomas"

2. **Selecione sintomas**: 
   - Navegue pelas categorias (accordion)
   - Clique nos sintomas apresentados pelo paciente
   - Use a busca para encontrar sintomas específicos

3. **Analise resultados**:
   - Veja a tabela de deficiências ordenada por prioridade
   - Verifique o percentual de relevância
   - Expanda detalhes das principais deficiências

4. **Planeje suplementação**:
   - Use as dosagens recomendadas como referência
   - Individualize conforme exames laboratoriais
   - Considere interações e contraindicações

5. **Imprima relatório**:
   - Clique no ícone de impressão
   - Salve como PDF ou imprima direto

### Fluxo de Trabalho Sugerido

```
Anamnese → Sintomas → Seleção → Análise → Exames Lab → Prescrição
```

## ⚠️ Avisos Importantes

### Limitações
- Ferramenta de **apoio diagnóstico** apenas
- Não substitui avaliação clínica completa
- Dosagens devem ser individualizadas
- Considerar exames laboratoriais

### Contraindicações
- Sempre verificar interações medicamentosas
- Considerar condições de saúde pré-existentes
- Ajustar para gravidez/lactação
- Respeitar limites máximos de segurança

### Boas Práticas
- Solicitar exames antes da suplementação
- Monitorar resposta terapêutica
- Reavaliar periodicamente
- Documentar dosagens e resultados

## 🔄 Integração com Outras Funcionalidades

### Complementa
- **Exames Laboratoriais**: Confirmar deficiências
- **Sintomas**: Registro detalhado
- **Prescrição Terapêutica**: Protocolos de suplementação
- **Probióticos**: Saúde intestinal
- **Fitoterapia**: Abordagem integrativa

### Dados Compatíveis
- Exporta para impressão
- Formato tabular para análise
- Estrutura consistente com demais módulos

## 📈 Melhorias Futuras

### Planejadas
- [ ] Integração com exames laboratoriais
- [ ] Salvamento de análises no histórico do paciente
- [ ] Sugestões de alimentos ricos nas vitaminas
- [ ] Alertas de interações entre suplementos
- [ ] Gráficos de priorização visual
- [ ] Exportação para PDF personalizado
- [ ] Protocolos pré-definidos por condição
- [ ] Banco de dados expandido com mais sintomas

### Em Estudo
- [ ] IA para sugerir investigações adicionais
- [ ] Integração com prescrição eletrônica
- [ ] Histórico de evolução dos sintomas
- [ ] Comparação antes/depois da suplementação

## 🎓 Referências Científicas

### Base Teórica
- Deficiências vitamínicas e manifestações clínicas
- Dosagens terapêuticas baseadas em literatura
- Segurança e limites máximos (UL)
- Biodisponibilidade e formas químicas

### Disclaimer
Os valores de dosagem são referências gerais e devem ser ajustados por profissional qualificado considerando:
- Idade e peso do paciente
- Condições de saúde
- Medicamentos em uso
- Exames laboratoriais
- Resposta individual

## 📞 Suporte

### Documentação
- Este arquivo: Visão geral completa
- Código comentado: Detalhes técnicos
- Material-UI docs: Componentes utilizados

### Contato
Para dúvidas sobre funcionalidade ou implementação, consulte a documentação técnica do sistema.

---

**Versão**: 1.0.0  
**Data**: Janeiro 2026  
**Status**: ✅ Implementado e Funcional  
**Localização**: Menu Principal → 💊 Deficiência de Vitaminas por Sintomas
