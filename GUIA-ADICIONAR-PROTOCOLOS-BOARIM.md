# 📘 Guia: Como Adicionar Novos Protocolos do Dr. Boarim

## 🎯 Objetivo
Este guia mostra como expandir a base de protocolos do Manual Prático de Tratamentos Naturais no sistema.

## 📝 Passo a Passo

### 1. Abrir o Arquivo de Protocolos
```
src/config/boarimProtocols.js
```

### 2. Adicionar Novo Protocolo

Localize o objeto `BOARIM_PROTOCOLS` e adicione uma nova entrada:

```javascript
export const BOARIM_PROTOCOLS = {
  // ... protocolos existentes (constipacao, gastrite, etc.)
  
  // ADICIONE AQUI O NOVO PROTOCOLO:
  enxaqueca: {
    condicao: 'Enxaqueca e Cefaleia',
    
    hidroterapia: [
      'Compressa fria na testa e têmporas durante crise (10-15 min)',
      'Banho morno relaxante com lavanda antes de dormir',
      'Escalda-pés quente (40°C) - desvio de circulação',
      'Compressa quente na nuca entre crises'
    ],
    
    fitoterapia: [
      'Tanaceto (Tanacetum parthenium): 125mg 2x/dia - preventivo',
      'Gengibre: chá forte 3x/dia ou 500mg - anti-inflamatório',
      'Matricária: tintura 30 gotas 3x/dia',
      'Hortelã-pimenta: óleo essencial na têmpora (diluído)',
      'Valeriana: 300mg à noite se tensional'
    ],
    
    alimentacao: [
      'Identificar gatilhos: queijos curados, vinho tinto, chocolate, glutamato',
      'Evitar: jejum prolongado, cafeína em excesso, adoçantes artificiais',
      'Magnésio: folhas verdes, sementes de abóbora, amêndoas',
      'Hidratação: 2-3 litros/dia',
      'Ômega-3: peixes, linhaça, chia'
    ],
    
    suplementacao: [
      'Magnésio: 400-600mg/dia - preventivo',
      'Riboflavina (B2): 400mg/dia',
      'Coenzima Q10: 100mg 3x/dia',
      'Vitamina D: 2000-5000UI/dia (verificar níveis)',
      'Ômega-3: 2000mg/dia'
    ],
    
    habitos: [
      'Sono regular: 7-8h/noite, mesmos horários',
      'Exercícios leves: caminhada, yoga (evitar exercícios intensos durante crise)',
      'Gerenciamento de estresse: meditação, biofeedback',
      'Diário de enxaqueca: identificar padrões e gatilhos',
      'Ambiente: quarto escuro e silencioso durante crise'
    ],
    
    observacoes: 'Se enxaqueca com aura, frequência aumentada, ou sintomas neurológicos, procurar neurologista. Enxaqueca é sinal de alerta do corpo.',
    
    referencia: 'Manual Prático de Tratamentos Naturais - Dr. Daniel Boarim, 2014, p. 210-215'
  }
};
```

### 3. Adicionar Palavras-Chave de Busca

Na função `getBoarimProtocolsBySymptoms`, adicione as palavras-chave:

```javascript
export function getBoarimProtocolsBySymptoms(symptoms) {
  const protocols = [];
  const symptomMap = {
    // ... mapeamentos existentes
    
    // ADICIONE AQUI:
    'enxaqueca': ['enxaqueca'],
    'dor de cabeça': ['enxaqueca'],
    'cefaleia': ['enxaqueca'],
    'migrânea': ['enxaqueca']
  };
  
  // ... resto da função
}
```

### 4. Testar a Implementação

1. Salve o arquivo
2. O servidor React recompilará automaticamente
3. Crie/edite uma anamnese com sintoma "enxaqueca" ou "dor de cabeça"
4. Acesse "Sugestões Terapêuticas"
5. Verifique se o protocolo aparece na seção do Dr. Boarim

## 📚 Template Base para Novos Protocolos

```javascript
nome_da_condicao: {
  condicao: 'Nome Completo da Condição',
  
  hidroterapia: [
    'Técnica 1 com temperatura e duração',
    'Técnica 2 com instruções específicas',
    'Técnica 3...'
  ],
  
  fitoterapia: [
    'Planta (Nome científico): dose e frequência - ação terapêutica',
    'Planta 2: dose e frequência - ação',
    'Planta 3...'
  ],
  
  alimentacao: [
    'Aumentar: alimentos específicos',
    'Evitar: alimentos contraindicados',
    'Orientação 1...',
    'Orientação 2...'
  ],
  
  suplementacao: [
    'Vitamina/Mineral: dose/dia - função',
    'Suplemento 2: dose - função',
    'Suplemento 3...'
  ],
  
  habitos: [
    'Exercício específico com frequência',
    'Prática integrativa',
    'Hábito de vida...'
  ],
  
  observacoes: 'Avisos importantes, quando procurar médico, contraindicações',
  
  referencia: 'Manual Prático de Tratamentos Naturais - Dr. Daniel Boarim, 2014, p. XXX-XXX'
}
```

## ✅ Checklist de Validação

Antes de salvar, verifique:

- [ ] Nome da chave está em snake_case (ex: `infeccao_urinaria`)
- [ ] `condicao` tem nome claro e descritivo
- [ ] Cada array de terapia tem pelo menos 3-5 itens
- [ ] Dosagens estão especificadas (mg, g, gotas, etc.)
- [ ] Frequências estão claras (3x/dia, 2 litros/dia, etc.)
- [ ] Observações incluem avisos de segurança
- [ ] Referência cita página do manual
- [ ] Palavras-chave adicionadas no `symptomMap`

## 🔍 Exemplos de Condições para Adicionar

### Sistema Respiratório
- Asma
- Sinusite
- Rinite alérgica
- Laringite

### Sistema Digestivo
- Diarreia
- Síndrome do intestino irritável
- Refluxo gastroesofágico
- Hemorroidas

### Sistema Musculoesquelético
- Artrite
- Artrose
- Dores musculares
- Fibromialgia

### Sistema Nervoso
- Ansiedade
- Depressão leve/moderada
- Estresse
- Déficit de atenção

### Sistema Endócrino
- Hipotireoidismo
- Hipertireoidismo
- Síndrome dos ovários policísticos

### Pele
- Eczema
- Psoríase
- Dermatite
- Acne severa

### Sistema Imunológico
- Alergias
- Imunodeficiência
- Doenças autoimunes (suporte)

## 🎨 Personalização Visual

Se quiser modificar a aparência dos protocolos do Boarim:

```javascript
// Arquivo: src/components/BoarimProtocol.js

// Modificar cor de fundo principal
<Paper elevation={3} sx={{ 
  p: 3, 
  mt: 2, 
  backgroundColor: '#f9fbe7' // ALTERE AQUI
}}>

// Modificar cores dos ícones
<HydroIcon sx={{ mr: 1, color: '#0288d1' }} /> // Hidroterapia - azul
<PhytoIcon sx={{ mr: 1, color: '#388e3c' }} /> // Fitoterapia - verde
<FoodIcon sx={{ mr: 1, color: '#f57c00' }} />  // Alimentação - laranja
```

## 📖 Referências do Manual

Ao adicionar protocolos, consulte:
- Manual Prático de Tratamentos Naturais
- Dr. Daniel S. F. Boarim
- 15ª Edição revisada e atualizada - 2014
- ISBN (se disponível)

Cite sempre a página específica do protocolo.

## 🐛 Solução de Problemas

### Protocolo não aparece?
1. Verifique sintaxe JavaScript (chaves, vírgulas)
2. Confirme que salvou o arquivo
3. Verifique console do navegador (F12) por erros
4. Certifique-se que palavras-chave no `symptomMap` estão corretas

### Erro de compilação?
1. Execute: `node -c src/config/boarimProtocols.js`
2. Corrija erros de sintaxe indicados
3. Salve e aguarde recompilação automática

### Protocolo duplicado?
- Verifique se não há duas entradas com mesma chave
- Use nomes únicos para cada condição

## 💡 Dicas Pro

1. **Seja específico**: "Gengibre: chá 3x/dia" é melhor que "Gengibre: tomar chá"
2. **Cite evidências**: Mencione ação terapêutica (anti-inflamatório, diurético, etc.)
3. **Priorize segurança**: Sempre inclua observações sobre quando procurar médico
4. **Seja prático**: Instruções que o paciente possa seguir facilmente
5. **Referencie**: Sempre cite a página do manual

## 📞 Suporte

Se tiver dúvidas ao adicionar protocolos:
1. Consulte protocolos existentes como exemplo
2. Verifique documentação do React/Material-UI se for mexer no componente visual
3. Teste sempre em ambiente de desenvolvimento antes de produção

---

**Última atualização**: 10/12/2024
**Versão do sistema**: 2.1.0
