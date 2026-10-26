# Atualização: Sistema de Unidades de Medida nos Exames Laboratoriais

## 📋 Resumo das Alterações

Foi implementado um sistema completo de seleção e conversão de unidades de medida para cada tipo de exame laboratorial no módulo de Exames Laboratoriais.

## ✨ Funcionalidades Implementadas

### 1. **Nova Coluna "Unidade" na Tabela**
- Adicionada coluna com dropdown para selecionar a unidade de medida utilizada pelo laboratório
- Cada exame possui suas unidades específicas disponíveis

### 2. **Unidades Disponíveis por Tipo de Exame**

#### Hemograma
- **Hematócrito**: % (percentual)
- **Hemoglobina**: g/dL, g/L
- **HbA1c**: %, mmol/mol
- **Leucócitos**: /mm³, mil/mm³, x10³/µL
- **Plaquetas**: /mm³, mil/mm³, x10³/µL

#### Glicemia e Diabetes
- **Glicemia**: mg/dL, mmol/L
- **Insulina**: μUI/mL, pmol/L

#### Perfil Lipídico
- **Colesterol (Total, HDL, LDL, VLDL)**: mg/dL, mmol/L
- **Triglicérides**: mg/dL, mmol/L

#### Função Tireoidiana
- **TSH**: mUI/L, μUI/mL
- **T3 Livre**: pg/mL, pmol/L
- **T3 Total**: ng/dL, nmol/L
- **T4 Livre**: ng/dL, pmol/L
- **Anti-TPO/Anti-Tireoglobulina**: UI/mL, IU/L

#### Função Hepática
- **Enzimas (TGO, TGP, GGT, FA, LDH, Amilase, Lipase)**: U/L
- **Bilirrubinas**: mg/dL, µmol/L

#### Função Renal
- **Creatinina**: mg/dL, µmol/L
- **Ureia**: mg/dL, mmol/L
- **Ácido Úrico**: mg/dL, µmol/L

#### Eletrólitos
- **Sódio/Potássio**: mEq/L, mmol/L
- **Cálcio/Magnésio/Fósforo**: mg/dL, mmol/L
- **Ferro Sérico**: μg/dL, µmol/L
- **Ferritina**: ng/mL, µg/L, pmol/L

#### Vitaminas
- **Vitamina D**: ng/mL, nmol/L
- **Vitamina B12**: pg/mL, pmol/L
- **Ácido Fólico**: ng/mL, nmol/L
- **Outras vitaminas**: unidades específicas

#### Marcadores Cardíacos
- **Troponina, CK-MB, BNP**: ng/mL, µg/L
- **Homocisteína**: μmol/L

#### Marcadores Inflamatórios
- **PCR**: mg/L, mg/dL
- **VHS**: mm/h

#### Coagulação
- **D-dímero**: ng/mL, µg/L
- **Fibrinogênio**: mg/dL, g/L

#### Hormônios
- **Testosterona**: ng/dL, nmol/L
- **Estradiol**: pg/mL, pmol/L
- **Cortisol**: μg/dL, nmol/L
- **Outros hormônios**: unidades específicas

#### Marcadores Tumorais
- **PSA, CEA, AFP**: ng/mL, µg/L
- **CA 125, CA 19-9, CA 15-3**: U/mL

#### Gasometria
- **pO2, pCO2**: mmHg, kPa
- **SatO2**: %
- **Bicarbonato**: mEq/L, mmol/L
- **Lactato**: mmol/L

### 3. **Sistema de Conversão Automática**

#### Função `converterUnidade()`
Quando o usuário muda a unidade selecionada:
1. O valor do resultado é automaticamente convertido para a nova unidade
2. A interpretação é recalculada com base no valor convertido
3. A conduta terapêutica é atualizada conforme necessário

#### Conversões Suportadas

**Hemoglobina:**
- g/dL ↔ g/L (fator 10)

**HbA1c:**
- % ↔ mmol/mol (fórmula IFCC/NGSP)

**Glicemia:**
- mg/dL ↔ mmol/L (fator 18)

**Colesterol/Lipídios:**
- mg/dL ↔ mmol/L (fatores específicos)

**Tireoide:**
- T3/T4: conversões entre pg/mL, ng/dL e pmol/L

**Ferritina:**
- ng/mL ↔ µg/L ↔ pmol/L

**Vitamina D:**
- ng/mL ↔ nmol/L (fator 2.5)

**Vitamina B12:**
- pg/mL ↔ pmol/L (fator 0.738)

**Creatinina:**
- mg/dL ↔ µmol/L (fator 88.4)

**Ácido Úrico:**
- mg/dL ↔ µmol/L (fator 59.48)

**Eletrólitos:**
- mg/dL ↔ mmol/L (fatores específicos por elemento)

### 4. **Benefícios do Sistema**

#### Para o Usuário
- ✅ **Flexibilidade**: Aceita resultados em qualquer unidade comum
- ✅ **Sem necessidade de conversão manual**: Sistema converte automaticamente
- ✅ **Análise consistente**: Independente da unidade, a interpretação é correta
- ✅ **Interface intuitiva**: Dropdown simples para selecionar unidade

#### Para o Terapeuta
- ✅ **Compatibilidade universal**: Aceita resultados de qualquer laboratório
- ✅ **Redução de erros**: Elimina erros de conversão manual
- ✅ **Rapidez**: Análise imediata independente da unidade
- ✅ **Padronização**: Valores sempre analisados na unidade de referência

## 🔧 Detalhes Técnicos

### Estrutura de Dados dos Exames
```javascript
{
  id: 1,
  exame: "Hemoglobina",
  valoresReferencia: "H: 13.5-17.5 | M: 12.0-15.5 g/dL",
  valoresIdeais: "H: 15-16 | M: 14-15 g/dL",
  resultadoPaciente: "14.5",
  unidade: "g/dL",                    // Unidade padrão
  unidadesDisponiveis: ["g/dL", "g/L"], // Opções disponíveis
  unidadeSelecionada: "g/dL",         // Unidade escolhida pelo usuário
  interpretacao: "...",
  conduta: "...",
  observacoes: "..."
}
```

### Fluxo de Trabalho
1. **Usuário digita resultado**: Ex: "145" 
2. **Usuário seleciona unidade**: Ex: "g/L"
3. **Sistema detecta unidade diferente do padrão**: g/L vs g/dL
4. **Conversão automática**: 145 g/L → 14.5 g/dL
5. **Análise com valor convertido**: Interpreta 14.5 g/dL
6. **Gera conduta baseada na análise**: Protocolo apropriado

### Função de Conversão
```javascript
converterUnidade(valor, unidadeOrigem, unidadeDestino, exame) {
  // Identifica tipo de exame
  // Busca fórmula de conversão específica
  // Aplica conversão
  // Retorna valor convertido com 2 casas decimais
}
```

### Handler de Mudança de Unidade
```javascript
handleUnidadeChange(id, novaUnidade) {
  // Obtém unidade atual
  // Converte resultado se necessário
  // Recalcula interpretação
  // Recalcula conduta
  // Atualiza estado
}
```

## 📊 Exemplo de Uso

### Cenário 1: Hemoglobina
- **Laboratório fornece**: 155 g/L
- **Usuário digita**: 155
- **Usuário seleciona**: g/L
- **Sistema converte para**: 15.5 g/dL
- **Interpretação**: "Quintil 3 - Médio (14.5-16.5 g/dL) ✅ DENTRO DO IDEAL"

### Cenário 2: Glicemia
- **Laboratório fornece**: 5.5 mmol/L
- **Usuário digita**: 5.5
- **Usuário seleciona**: mmol/L
- **Sistema converte para**: 99 mg/dL
- **Interpretação**: "Quintil 4 - Alto-Normal (90-100 mg/dL) ✅ DENTRO DO IDEAL"

### Cenário 3: Vitamina D
- **Laboratório fornece**: 75 nmol/L
- **Usuário digita**: 75
- **Usuário seleciona**: nmol/L
- **Sistema converte para**: 30 ng/mL
- **Interpretação**: "No limite inferior do ideal. Considerar suplementação."

## 🎯 Compatibilidade

### Sistemas de Medida Suportados
- ✅ Sistema Internacional (SI): mmol/L, µmol/L, nmol/L, pmol/L
- ✅ Sistema Convencional (US): mg/dL, µg/dL, ng/mL, pg/mL
- ✅ Unidades Específicas: U/L, UI/mL, mUI/L, mEq/L, mmHg, %, células/campo

### Laboratórios Compatíveis
O sistema aceita resultados de qualquer laboratório que utilize unidades padrão, incluindo:
- Laboratórios brasileiros (geralmente mg/dL, g/dL)
- Laboratórios europeus (geralmente mmol/L, µmol/L)
- Laboratórios americanos (mg/dL, ng/mL)
- Laboratórios asiáticos (variados)

## 📝 Observações Importantes

1. **Conversões são bidirecionais**: Você pode mudar de unidade quantas vezes quiser
2. **Valores são arredondados**: 2 casas decimais para precisão clínica
3. **Análise sempre na unidade padrão**: Garante consistência
4. **Salvamento inclui unidade**: Ao salvar, a unidade selecionada é preservada
5. **Compatibilidade retroativa**: Exames antigos sem unidade recebem unidade padrão automaticamente

## 🚀 Próximos Passos (Futuras Melhorias)

1. **Adicionar mais conversões**: Para exames menos comuns
2. **Validação de faixas**: Alertar se valor está muito fora do esperado para aquela unidade
3. **Histórico de conversões**: Mostrar valor original e convertido
4. **Export com unidades**: PDF/impressão mostrando ambas as unidades
5. **Configuração de preferência**: Definir unidades preferidas por usuário

## 🔒 Segurança e Validação

- ✅ Conversões baseadas em fórmulas padronizadas internacionalmente
- ✅ Validação de tipos numéricos antes da conversão
- ✅ Tratamento de erros para conversões não suportadas
- ✅ Preservação do valor original em caso de falha na conversão
- ✅ Logs de conversão para auditoria (console.log em desenvolvimento)

---

## 📞 Suporte

Para dúvidas sobre as conversões ou adicionar novas unidades:
- Verificar tabelas de conversão médica padrão (CLSI, IFCC)
- Consultar referências laboratoriais internacionais
- Documentação SI (Sistema Internacional de Unidades)

**Data da Implementação**: Janeiro 2026  
**Versão**: 2.0  
**Autor**: Sistema Anamnese Integrativa - Wander Pires
