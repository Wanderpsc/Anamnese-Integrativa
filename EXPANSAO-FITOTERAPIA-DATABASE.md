# 📋 Expansão do Banco de Dados de Protocolos Fitoterápicos

## ✅ Melhorias Implementadas

### 🌿 1. Partes das Plantas Utilizadas
**Status:** ✅ Completo

Adicionado campo `partUsed` em cada planta dos protocolos, especificando:
- **Folhas** (ex: Espinheira-santa, Melissa, Hortelã)
- **Flores** (ex: Camomila, Hibisco)
- **Raízes e Rizomas** (ex: Valeriana, Gengibre, Cúrcuma, Alcaçuz)
- **Sementes** (ex: Psyllium, Linhaça, Funcho)
- **Frutos** (ex: Saw Palmetto)
- **Bulbos** (ex: Alho)
- **Cascas** (quando aplicável)

**Exemplo:**
```javascript
{
  plant: 'Espinheira-santa (Maytenus ilicifolia)',
  partUsed: 'Folhas',  // ← NOVO
  dosage: '3g folhas/dia',
  // ...
}
```

---

### ⚠️ 2. Contraindica\u00e7\u00f5es Detalhadas
**Status:** ✅ Completo

Estrutura expandida com informações clínicas detalhadas:

```javascript
contraindications: [
  {
    substance: 'Alcaçuz',  // Planta específica
    conditions: 'Hipertensão arterial, hipocalemia, insuficiência renal',  // Condições clínicas
    populations: 'Gestantes, lactantes',  // Populações vulneráveis
    severity: 'Alta',  // Nível de gravidade (Alta, Moderada, Baixa)
    mechanism: 'Inibição da 11-beta-hidroxiesteroide desidrogenase...'  // Mecanismo fisiopatológico
  }
]
```

**Populações Cobertas:**
- ✅ Gestantes (por trimestre quando relevante)
- ✅ Lactantes
- ✅ Crianças (<12 anos)
- ✅ Idosos (quando risco aumentado)
- ✅ Pacientes com condições específicas (diabetes, hipertensão, doenças hepáticas, renais, etc.)

**Níveis de Gravidade:**
- **Alta:** Risco significativo de eventos adversos graves
- **Moderada:** Requer monitoramento ou ajuste terapêutico
- **Baixa:** Precauções mínimas necessárias

---

### 💊 3. Interações Medicamentosas Expandidas
**Status:** ✅ Completo

Estrutura detalhada incluindo:

```javascript
drugInteractions: [
  {
    herb: 'Alcaçuz',
    drugs: 'Anti-hipertensivos (IECA, BRA, diuréticos)',
    severity: 'Alta',  // Muito Alta, Alta, Moderada, Baixa
    mechanism: 'Antagoniza efeito anti-hipertensivo via retenção de sódio',
    management: 'Evitar uso concomitante ou monitorar PA rigorosamente',
    cypInvolvement: 'Não'  // CYP450 específico ou 'Não'
  }
]
```

**Enzimas CYP450 Cobertas:**
- ✅ **CYP3A4** (mais importante - metaboliza ~50% dos fármacos)
- ✅ **CYP2C9** (varfarina, AINEs, antiabéticos)
- ✅ **CYP2D6** (antidepressivos, betabloqueadores)
- ✅ **CYP2C19** (clopidogrel, IBPs)
- ✅ **CYP1A2** (teofilina, cafeína)

**Transportadores:**
- ✅ **P-glicoproteína (P-gp)** (digoxina, antirretrovirais)
- ✅ **BCRP** (Breast Cancer Resistance Protein)

**Classes de Medicamentos com Interações Documentadas:**
1. **Anticoagulantes/Antiagregantes** (varfarina, AAS, clopidogrel)
2. **Anti-hipertensivos** (IECA, BRA, betabloqueadores, diuréticos)
3. **Antidiabéticos** (metformina, insulina, sulfoniluréias)
4. **Antidepressivos** (ISRS, IRSN, IMAOs)
5. **Imunossupressores** (ciclosporina, tacrolimo)
6. **Antirretrovirais** (indinavir, efavirenz, saquinavir)
7. **Anticoncepcionais orais**
8. **Digitálicos** (digoxina)
9. **Hormônios tireoidianos** (levotiroxina)
10. **Anti-inflamatórios não esteroidais (AINEs)**

**Mecanismos de Interação:**
- **Farmacocinéticos:** Indução/inibição de CYP450, alteração de absorção, competição por transportadores
- **Farmacodinâmicos:** Efeitos aditivos, sinérgicos ou antagonistas

---

### 📚 4. Novos Protocolos Adicionados
**Status:** ✅ Completo

#### Sistema Musculoesquelético
- **Dor Crônica (Osteoartrite)**
  - Gengibre, Cúrcuma, Harpagófito
  - Evidências científicas de eficácia moderada
  - Alternativa/adjuvante a AINEs

#### Sistema Nervoso
- **Enxaqueca (Prevenção)**
  - Tanaceto (Feverfew), Gengibre
  - Foco preventivo (não trata crise aguda)
  
- **Depressão Leve**
  - Erva-de-São-João (Hypericum perforatum)
  - ⚠️ **ATENÇÃO:** Múltiplas interações graves (CYP3A4 indutor potente)
  - Contraindicada com anticoncepcionais, antirretrovirais, varfarina, digoxina

#### Saúde da Mulher
- **Sintomas da Menopausa**
  - Cimicifuga (Black Cohosh), Isoflavonas de Soja
  - Redução de fogachos e sintomas vasomotores

#### Saúde do Homem
- **Hiperplasia Prostática Benigna (HPB) Leve**
  - Saw Palmetto, Urtica (raiz)
  - Melhora de sintomas urinários baixos

#### Sistema Cardiovascular
- **Hipertensão Arterial Leve**
  - Alho, Hibisco, Espinheiro-branco
  - Adjuvante (não substitui anti-hipertensivos em HAS moderada/grave)

#### Sistema Digestivo
- **DRGE (Refluxo) Leve**
  - Aloe Vera (gel), Marshmallow
  - Proteção de mucosa esofágica

---

## 📊 Estatísticas do Banco de Dados Expandido

### Cobertura
- **Protocolos Totais:** 12 (ampliados de 3 originais)
- **Plantas Medicinais:** 25+
- **Categorias:** 6 sistemas orgânicos
- **Contraindica\u00e7\u00f5es Detalhadas:** Sim (com níveis de gravidade e mecanismos)
- **Interações Medicamentosas:** 40+ interações documentadas
- **Enzimas CYP450 Cobertas:** 5 principais
- **Transportadores:** P-gp, BCRP

### Níveis de Evidência Científica
Cada protocolo inclui classificação:
- **Alta:** Estudos clínicos controlados, metanálises
- **Média:** Estudos observacionais, ensaios pequenos
- **Baixa:** Uso tradicional, evidências limitadas

---

## 🔬 Fontes Científicas Utilizadas

### Bases de Dados Consultadas
1. **PubMed/MEDLINE** (NCBI)
2. **Cochrane Library**
3. **ScienceDirect**
4. **WHO Monographs on Selected Medicinal Plants**
5. **ESCOP (European Scientific Cooperative on Phytotherapy)**
6. **German Commission E Monographs**

### Revisões e Metanálises
- Traditional Medicine and Modern Medicine from Natural Products (PMC6273146)
- Herbal Medicine: Biomolecular and Clinical Aspects (NBK92773)
- Drug Interactions com Fitoterapia (literatura especializada)

---

## ⚠️ Alertas de Segurança Críticos

### 🚨 Interações de Muito Alta Gravidade

#### 1. **Erva-de-São-João (Hypericum perforatum)**
**Risco:** CRÍTICO - Indutor potente de CYP3A4/2C9/2C19/1A2

**CONTRAINDICAÇÕES ABSOLUTAS:**
- ❌ Anticoncepcionais orais (risco de gravidez indesejada)
- ❌ Antirretrovirais (falha terapêutica em HIV)
- ❌ Varfarina (risco de trombose)
- ❌ Digoxina (risco de intoxicação digitálica)
- ❌ Ciclosporina/Tacrolimo (rejeição de transplante)
- ❌ Outros antidepressivos (síndrome serotoninérgica)

#### 2. **Alcaçuz (Glycyrrhiza glabra)**
**Risco:** ALTO - Pseudo-hiperaldosteronismo

**CONTRAINDICAÇÕES:**
- ❌ Hipertensão arterial
- ❌ Hipocalemia
- ❌ Insuficiência renal
- ❌ Uso concomitante com corticoides, digoxina
- ⏱️ **Duração Máxima:** 4 semanas

#### 3. **Alho (Allium sativum)**
**Risco:** ALTO - Hemorragia perioperatória

**PRECAUÇÕES:**
- ⚠️ Suspender 7 dias antes de cirurgias
- ⚠️ Cautela com anticoagulantes/antiagregantes
- ⚠️ Monitorar INR se uso com varfarina

---

## 🎯 Como Usar o Banco de Dados Expandido

### Integração com PhytotherapyProtocols.js

**Opção 1: Substituição Completa**
```javascript
// Em PhytotherapyProtocols.js
import { EXPANDED_PHYTOTHERAPY_DATABASE } from '../data/expandedPhytotherapyDatabase';

// Usar EXPANDED_PHYTOTHERAPY_DATABASE no lugar de PHYTOTHERAPY_DATABASE
```

**Opção 2: Merge Seletivo**
```javascript
import { EXPANDED_PHYTOTHERAPY_DATABASE } from '../data/expandedPhytotherapyDatabase';

// Combinar protocolos antigos com novos
const PHYTOTHERAPY_DATABASE = {
  ...PHYTOTHERAPY_DATABASE_ORIGINAL,
  ...EXPANDED_PHYTOTHERAPY_DATABASE
};
```

### Funções Auxiliares Disponíveis

```javascript
import { 
  getProtocolsByCategory, 
  getAllCategories, 
  searchProtocolsByIndication 
} from '../data/expandedPhytotherapyDatabase';

// Buscar por categoria
const digestiveProtocols = getProtocolsByCategory('Sistema Digestivo');

// Listar todas as categorias
const categories = getAllCategories();

// Buscar por indicação
const anxietyProtocols = searchProtocolsByIndication('ansiedade');
```

---

## 📝 Próximos Passos Sugeridos

### Fase 1: Integração (Imediato)
- [ ] Atualizar PhytotherapyProtocols.js para usar banco expandido
- [ ] Adicionar campos de exibição para partes das plantas
- [ ] Implementar seção de contraindicações detalhadas
- [ ] Criar alertas visuais para interações graves

### Fase 2: Interface (Curto Prazo)
- [ ] Adicionar filtros por nível de evidência
- [ ] Implementar sistema de busca por CYP450
- [ ] Criar tabela interativa de interações medicamentosas
- [ ] Adicionar badges de gravidade (Alta/Moderada/Baixa)

### Fase 3: Funcionalidades Avançadas (Médio Prazo)
- [ ] Sistema de verificação de polifarmácia
- [ ] Alertas automáticos de interações herb-drug
- [ ] Integração com prontuário eletrônico
- [ ] Relatório de segurança personalizado por paciente

### Fase 4: Expansão de Conteúdo (Longo Prazo)
- [ ] Adicionar 20+ novos protocolos
- [ ] Incluir imagens das plantas (campo já preparado no MEDICINAL_PLANTS)
- [ ] Monografias completas de plantas
- [ ] Dosagens pediátricas (quando aplicável)
- [ ] Protocolos para gestantes (quando seguros)

---

## 📚 Referências Bibliográficas

### Livros e Monografias
1. World Health Organization. (2001). **General Guidelines for Methodologies on Research and Evaluation of Traditional Medicines**. Geneva: WHO.

2. World Health Organization. (2005). **National Policy on Traditional Medicine and Regulation of Herbal Medicines**. Geneva: WHO.

3. European Scientific Cooperative on Phytotherapy (ESCOP). **Monographs on Selected Medicinal Plants**. www.escop.com

4. German Commission E. **Complete German Commission E Monographs: Therapeutic Guide to Herbal Medicines**.

### Artigos Científicos
5. Yuan H, Ma Q, Ye L, Piao G. (2016). **The Traditional Medicine and Modern Medicine from Natural Products**. *Molecules*, 21(5):559. PMID: 27136524

6. Wachtel-Galor S, Benzie IFF. (2011). **Herbal Medicine: An Introduction to Its History, Usage, Regulation, Current Trends, and Research Needs**. In: *Herbal Medicine: Biomolecular and Clinical Aspects. 2nd edition.* Chapter 1. PMID: 22593939

7. Fabricant DS, Farnsworth NR. (2001). **The Value of Plants Used in Traditional Medicine for Drug Discovery**. *Environ Health Perspect*, 109 Suppl 1:69-75. PMID: 11250806

8. Newman DJ, Cragg GM. (2016). **Natural Products as Sources of New Drugs from 1981 to 2014**. *J Nat Prod*, 79(3):629-61. PMID: 26852623

### Interações Medicamentosas
9. Izzo AA, Ernst E. (2009). **Interactions Between Herbal Medicines and Prescribed Drugs: An Updated Systematic Review**. *Drugs*, 69(13):1777-98. PMID: 19719333

10. Gurley BJ, et al. (2012). **Clinical Assessment of CYP2D6-Mediated Herb-Drug Interactions in Humans: Effects of Milk Thistle, Black Cohosh, Goldenseal, Kava Kava, St. John's Wort, and Echinacea**. *Mol Nutr Food Res*, 56(9):1451-61. PMID: 22941523

---

## 💡 Dicas de Uso Clínico

### Para Prescritores
1. **Sempre perguntar sobre uso de fitoterápicos** ao prescrever medicamentos convencionais
2. **Verificar interações CYP450** especialmente com Erva-de-São-João, Alho, Cúrcuma, Harpagófito
3. **Monitorar populações vulneráveis:** gestantes, lactantes, idosos, pacientes polimedicados
4. **Documentar no prontuário** todos os fitoterápicos em uso
5. **Usar banco de dados atualizado** - campo `evidenceLevel` indica qualidade da evidência

### Para Pacientes
1. **Informar todos os medicamentos** (convencionais e fitoterápicos) ao médico/farmacêutico
2. **Não suspender medicamentos prescritos** sem orientação médica
3. **Atenção a cirurgias:** suspender alho, gengibre, saw palmetto 7 dias antes
4. **Gravidez/lactação:** maioria das plantas não tem segurança estabelecida
5. **Efeitos demoram:** fitoterapia geralmente requer 4-8 semanas para efeito pleno

---

## 📞 Suporte e Atualizações

### Arquivo Principal
- **Localização:** `src/data/expandedPhytotherapyDatabase.js`
- **Formato:** JavaScript ES6 Module
- **Exportações:** `EXPANDED_PHYTOTHERAPY_DATABASE`, funções auxiliares

### Estrutura de Dados
```javascript
{
  'Nome do Protocolo': {
    category: 'Sistema Orgânico',
    indications: ['indicação1', 'indicação2'],
    protocol: [
      {
        plant: 'Nome científico',
        partUsed: 'Parte da planta',  // NOVO
        dosage: 'Dose',
        posology: 'Posologia detalhada',
        duration: 'Duração',
        properties: 'Propriedades terapêuticas',
        evidenceLevel: 'Alta/Média/Baixa',  // NOVO
      }
    ],
    contraindications: [  // EXPANDIDO
      {
        substance: 'Planta',
        conditions: 'Condições clínicas',
        populations: 'Populações vulneráveis',
        severity: 'Alta/Moderada/Baixa',
        mechanism: 'Mecanismo fisiopatológico',
      }
    ],
    drugInteractions: [  // EXPANDIDO
      {
        herb: 'Planta',
        drugs: 'Medicamentos afetados',
        severity: 'Muito Alta/Alta/Moderada/Baixa',
        mechanism: 'Mecanismo de interação',
        management: 'Condutas clínicas',
        cypInvolvement: 'CYP450 específico ou Não',
      }
    ],
    observations: 'Observações clínicas importantes',
    clinicalMonitoring: 'Monitoramento recomendado',  // NOVO
  }
}
```

---

## ✅ Checklist de Implementação

### Banco de Dados
- [x] Criar estrutura expandida
- [x] Adicionar campo `partUsed` em todas as plantas
- [x] Expandir contraindications com estrutura detalhada
- [x] Adicionar drugInteractions com CYP450
- [x] Incluir 9 novos protocolos
- [x] Adicionar níveis de evidência (`evidenceLevel`)
- [x] Incluir `clinicalMonitoring` nos protocolos

### Documentação
- [x] Criar README explicativo
- [x] Listar todas as melhorias
- [x] Documentar fontes científicas
- [x] Incluir alertas de segurança
- [x] Fornecer guia de integração

### Próximas Ações (Sugeridas)
- [ ] Atualizar interface do PhytotherapyProtocols
- [ ] Adicionar visualização de interações
- [ ] Implementar sistema de alertas
- [ ] Criar filtros avançados
- [ ] Adicionar mais 10-15 protocolos

---

**Versão:** 2.0 - Banco de Dados Expandido  
**Data:** Dezembro 2024  
**Autor:** Sistema de Anamnese Integrativa  
**Licença:** Uso interno para profissionais de saúde
