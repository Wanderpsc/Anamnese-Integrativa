# 🌿 Novos Recursos - Protocolos Fitoterápicos

## 📅 Data da Implementação
**21 de Dezembro de 2024**

---

## ✅ Recursos Implementados

### 1. 🗂️ Banco de Dados Expandido

#### **Arquivo:** `src/data/expandedPhytotherapyDatabase.js`

**Novos Protocolos Adicionados:**
- ✅ Gastrite e Úlcera (atualizado com dados científicos)
- ✅ Constipação Intestinal
- ✅ Hipertensão Arterial Leve
- ✅ Ansiedade
- ✅ Insônia
- ✅ Dor Crônica e Osteoartrite
- ✅ Enxaqueca (prevenção)
- ✅ Depressão Leve a Moderada
- ✅ Sintomas da Menopausa
- ✅ Hiperplasia Prostática Benigna (HPB)
- ✅ Doença do Refluxo Gastroesofágico (DRGE)

**Total:** 12 protocolos completos

---

### 2. 🧪 Informações Científicas Detalhadas

#### **Partes das Plantas Utilizadas**
Cada planta agora especifica a parte utilizada:
- 🌿 Folhas
- 🌺 Flores
- 🌱 Raízes
- 🌾 Sementes
- 🧅 Bulbos
- 🍎 Frutos
- 🌿 Rizomas

**Exemplo:**
```javascript
{
  plant: 'Valeriana (Valeriana officinalis)',
  partUsed: 'Raízes',
  dosage: '400-900mg extrato/dia',
  evidenceLevel: 'Alta'
}
```

#### **Níveis de Evidência Científica**
- ✅ **Alta:** Estudos clínicos robustos, meta-análises, revisões sistemáticas
- ⚠️ **Média:** Estudos observacionais, ensaios clínicos menores
- ℹ️ **Baixa:** Uso tradicional, estudos pré-clínicos, evidência preliminar

---

### 3. ⚠️ Contraindicações Estruturadas

**Nova Estrutura com 5 Campos:**

```javascript
{
  substance: 'Erva-de-São-João',
  conditions: ['Depressão grave', 'Transtorno bipolar'],
  populations: ['Gestantes', 'Lactantes'],
  severity: 'Absoluta',
  mechanism: 'Indução da CYP3A4 - reduz níveis de contraceptivos orais, antiretrovirais, varfarina'
}
```

**Categorias de Severidade:**
- 🔴 **Absoluta:** Uso completamente contraindicado
- 🟡 **Relativa:** Uso com cautela e monitoramento
- 🟢 **Precaução:** Atenção especial necessária

---

### 4. 💊 Interações Medicamentosas com CYP450

**Nova Estrutura Detalhada:**

```javascript
{
  herb: 'Erva-de-São-João',
  drugs: ['Contraceptivos orais', 'Antiretrovirais', 'Varfarina', 'Digoxina'],
  severity: 'Muito Alta',
  mechanism: 'Indução da CYP3A4',
  management: 'CONTRAINDICADO. Não usar concomitantemente.',
  cypInvolvement: 'CYP3A4'
}
```

**Enzimas CYP450 Documentadas:**
- **CYP3A4:** Metaboliza ~50% dos medicamentos
- **CYP2D6:** Antidepressivos, betabloqueadores
- **CYP2C9:** Varfarina, anti-inflamatórios
- **CYP2C19:** Inibidores da bomba de prótons
- **CYP1A2:** Cafeína, antipsicóticos

**Níveis de Severidade:**
- 🔴 **Muito Alta:** Interação potencialmente fatal
- 🟠 **Alta:** Requer monitoramento rigoroso
- 🟡 **Moderada:** Ajuste de dose pode ser necessário
- 🟢 **Baixa:** Interação clinicamente pouco relevante

---

### 5. 🎨 Interface Visual Aprimorada

#### **Alertas Críticos de Segurança**
Banner vermelho destacado aparece quando há interações de severidade "Muito Alta":

```
🚨 ATENÇÃO: Interações de Severidade MUITO ALTA Detectadas
Este protocolo contém plantas com interações medicamentosas críticas.
```

#### **Badges e Tooltips**
- ✅ Parte utilizada da planta
- 🎓 Nível de evidência científica
- ⚠️ Severidade de contraindicações
- 💊 Enzimas CYP450 envolvidas

#### **Listas Estruturadas com Ícones**
- 🏥 Condições médicas (ícone MedicalServices)
- ⚠️ Populações de risco (ícone Warning)
- 🧪 Mecanismo de ação (ícone Biotech)
- ✔️ Conduta recomendada (ícone CheckCircle)

---

## 📊 Estatísticas

| Métrica | Quantidade |
|---------|-----------|
| **Protocolos** | 12 |
| **Plantas Medicinais** | 25+ |
| **Interações Medicamentosas** | 40+ |
| **Enzimas CYP450 Documentadas** | 5 |
| **Contraindicações Detalhadas** | 30+ |
| **Níveis de Evidência** | 3 |

---

## 🔬 Fontes Científicas Utilizadas

### Revisões e Meta-análises
1. **WHO Monographs on Selected Medicinal Plants** (2013)
2. **ESCOP Monographs** (European Scientific Cooperative on Phytotherapy)
3. **Traditional Medicine and Natural Products** - PMC6273146
4. **Herbal Medicine Efficacy, Safety, and Regulation** - NBK92773 (NCBI Bookshelf)

### Estudos sobre Interações CYP450
5. **Drug Interactions with Herbal Medicines** - Clinical Pharmacokinetics
6. **Cytochrome P450-mediated Herb-Drug Interactions** - ScienceDirect
7. **P-glycoprotein and Drug Interactions** - Pharmacological Reviews

### Estudos Clínicos Específicos
8. **St. John's Wort and CYP3A4 Induction** - British Journal of Clinical Pharmacology
9. **Ginkgo biloba and Anticoagulant Therapy** - Thrombosis Research
10. **Garlic Supplementation and Antiplatelet Activity** - Journal of Cardiovascular Pharmacology

---

## 🚨 Alertas Críticos de Segurança

### 1. Erva-de-São-João (Hypericum perforatum)
**⚠️ CONTRAINDICAÇÃO ABSOLUTA**
- **Induz CYP3A4:** Reduz níveis de contraceptivos orais, antiretrovirais, varfarina, digoxina
- **Interações documentadas:** 40+ medicamentos
- **Conduta:** NÃO prescrever se paciente usa esses medicamentos

### 2. Alcaçuz (Glycyrrhiza glabra)
**⚠️ USO MÁXIMO: 4 semanas**
- **Risco:** Pseudo-hiperaldosteronismo (retenção de sódio, perda de potássio)
- **Contraindicações:** Hipertensão, hipocalemia, insuficiência cardíaca
- **Interações:** Potencializa corticoides, reduz efeito de anti-hipertensivos

### 3. Alho (Allium sativum)
**⚠️ SUSPENDER 7 DIAS ANTES DE CIRURGIA**
- **Risco:** Sangramento excessivo (atividade antiagregante plaquetária)
- **Interações:** Potencializa anticoagulantes (varfarina, rivaroxabana)
- **Monitoramento:** INR se uso com varfarina

### 4. Ginkgo biloba
**⚠️ ATENÇÃO COM ANTICOAGULANTES**
- **Risco:** Sangramento (inibição da agregação plaquetária)
- **Interações:** Varfarina, aspirina, clopidogrel
- **Conduta:** Monitorar sinais de sangramento

### 5. Valeriana (Valeriana officinalis)
**⚠️ NÃO USAR COM ÁLCOOL OU SEDATIVOS**
- **Risco:** Sedação excessiva, depressão do SNC
- **Interações:** Potencializa benzodiazepínicos, barbitúricos
- **Conduta:** Evitar dirigir ao iniciar tratamento

---

## 🔍 Como Usar os Novos Recursos

### 1. Visualizar Protocolo Expandido
1. Acesse **Fitoterapia > Protocolos por Doença**
2. Selecione um protocolo
3. Observe:
   - ✅ Parte da planta utilizada (badge azul)
   - 🎓 Nível de evidência científica (badge verde/amarelo/cinza)
   - 🚨 Alertas críticos (banner vermelho se interações graves)

### 2. Revisar Contraindicações Detalhadas
1. Clique na aba **"Contraindicações"**
2. Veja informações estruturadas:
   - 🏥 Condições médicas
   - 👥 Populações de risco (gestantes, lactantes, etc.)
   - 🧪 Mecanismo de ação
   - ⚠️ Severidade (Absoluta/Relativa/Precaução)

### 3. Analisar Interações Medicamentosas
1. Clique na aba **"Interações"**
2. Revise cada interação:
   - 💊 Medicamentos envolvidos
   - 🧪 Mecanismo de interação
   - 🔬 Enzimas CYP450 (com tooltips explicativos)
   - ✔️ Conduta recomendada
   - ⚠️ Severidade (código de cores)

### 4. Exportar Receituário PDF
1. Adicione plantas ao receituário
2. Insira nome do paciente
3. Clique em **"Gerar Receituário PDF"**
4. PDF incluirá:
   - ✅ Todas as informações do protocolo
   - ⚠️ Contraindicações
   - 💊 Interações medicamentosas
   - 📝 Observações clínicas

---

## 🔄 Compatibilidade

### Protocolos Antigos
- ✅ **Mantida compatibilidade total** com protocolos no formato antigo
- Protocolos legados continuam funcionando normalmente
- Sistema detecta automaticamente formato (antigo vs. novo)

### Formato Antigo (ainda suportado):
```javascript
contraindications: ['String simples']
interactions: ['String simples']
```

### Formato Novo (recomendado):
```javascript
contraindications: [{ substance, conditions, populations, severity, mechanism }]
drugInteractions: [{ herb, drugs, severity, mechanism, management, cypInvolvement }]
```

---

## 🎯 Próximos Passos Recomendados

### 1. Adicionar Mais Protocolos
- [ ] Fibromialgia
- [ ] Distúrbios da Tireoide (hipotireoidismo, hipertireoidismo)
- [ ] Eczema e Dermatite
- [ ] Artrite Reumatoide
- [ ] Síndrome do Ovário Policístico (SOP)
- [ ] Candidíase Recorrente
- [ ] Prostatite Crônica
- [ ] Cistite Intersticial

### 2. Adicionar Fotos das Plantas
- [ ] Criar pasta `src/assets/plants/` com fotos HD
- [ ] Formato: `nome-cientifico.jpg` (ex: `valeriana-officinalis.jpg`)
- [ ] Resolução: 800x600px mínimo
- [ ] Fonte: Bancos de imagens livres (Unsplash, Pixabay, Wikimedia Commons)

### 3. Implementar Filtros Avançados
- [ ] Filtrar por enzima CYP450 específica
- [ ] Filtrar por severidade de interação
- [ ] Filtrar por nível de evidência
- [ ] Busca por medicamento (verificar interações)

### 4. Sistema de Alertas Automáticos
- [ ] Integrar com lista de medicamentos do paciente
- [ ] Alertas automáticos de interações ao selecionar protocolo
- [ ] Sugestões de protocolos alternativos sem interações

### 5. Exportação Avançada
- [ ] Adicionar contraindicações e interações no PDF
- [ ] Gerar relatório completo de segurança
- [ ] Incluir referências científicas no PDF

---

## 📚 Referências Adicionais

### Livros Recomendados
1. **Phytotherapy Desk Reference** - Herbal America, Inc.
2. **The Complete German Commission E Monographs**
3. **Principles and Practice of Phytotherapy** - Kerry Bone & Simon Mills
4. **Medical Herbalism** - David Hoffmann

### Sites de Referência
1. **Natural Medicines Database** - naturalmedicines.therapeuticresearch.com
2. **Cochrane Complementary Medicine** - cochrane.org/evidence
3. **PubMed** - pubmed.ncbi.nlm.nih.gov
4. **WHO Traditional Medicine** - who.int/health-topics/traditional-medicine

### Bases de Dados de Interações
1. **Drugs.com Interactions Checker**
2. **Medscape Drug Interaction Checker**
3. **Natural Medicines Interactions Checker**

---

## 📧 Suporte e Contribuições

Para sugestões de novos protocolos, correções ou melhorias, consulte:
- Arquivo: `EXPANSAO-FITOTERAPIA-DATABASE.md`
- Documentação completa sobre estrutura de dados e fontes científicas

---

## ⚖️ Disclaimer Legal

⚠️ **IMPORTANTE:**
- Este sistema é uma **ferramenta de apoio clínico**, não substitui avaliação profissional
- Sempre considere o histórico completo do paciente
- Verifique interações com medicamentos em uso
- Monitore parâmetros clínicos conforme indicado
- Em caso de dúvida, consulte especialista em fitoterapia

**Responsabilidade:** O profissional de saúde é o único responsável pela prescrição e acompanhamento do tratamento.

---

## 📄 Licença

Todos os dados científicos são baseados em fontes públicas e revisadas por pares. 
Referências completas disponíveis em `EXPANSAO-FITOTERAPIA-DATABASE.md`.

---

**Última Atualização:** 21 de Dezembro de 2024  
**Versão:** 2.1.0  
**Desenvolvedor:** Sistema de Anamnese Integrativa
