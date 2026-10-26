# MODELO COMPLETO DE PLANTA MEDICINAL
## Estrutura que TODAS as 60+ plantas devem seguir

```javascript
'planta-id': {
  common: 'Nome Popular Brasileiro',
  scientific: 'Genus species',
  image: '../assets/plants/nome.svg',
  
  // INDICAÇÕES TERAPÊUTICAS (mínimo 8-12)
  indications: [
    'condição principal detalhada',
    'segunda indicação com especificidade',
    'terceira com contexto clínico',
    // ... continuar
  ],
  
  // CONTRAINDICAÇÕES ABSOLUTAS E RELATIVAS  
  contraindications: [
    'gravidez e lactação (especificar trimestre se relevante)',
    'doença específica que contraindica',
    'faixa etária contraindicada',
    'condição de risco',
    // ... continuar
  ],
  
  // INTERAÇÕES MEDICAMENTOSAS DETALHADAS
  interactions: [
    'classe de medicamento (mecanismo e consequência clínica)',
    'droga específica (o que acontece e como manejar)',
    'separar de medicamentos por X horas',
    // ... mínimo 5-10 interações relevantes
  ],
  
  // POSOLOGIA (formas farmacêuticas)
  posology: 'Descrição das formas: infusão, decocção, tintura, extrato seco, óleo, uso tópico. Especificar qual forma para qual indicação',
  
  // DOSAGEM DETALHADA (doses práticas brasileiras)
  dosage: 'Infusão: X colheres de sopa em X mL, Y vezes/dia. Extrato seco: X-Y mg/dia divididos em Z doses. Tintura 1:5: X-Y mL/dose. Crianças: doses pediátricas. Idosos: ajustes necessários',
  
  // PRINCÍPIOS ATIVOS QUÍMICOS
  actives: [
    'composto principal (percentual se conhecido)',
    'composto secundário importante',
    'classe química (flavonoides, taninos, alcaloides, etc)',
    'marcador químico para padronização',
    // ... mínimo 4-8 ativos
  ],
  
  // RISCOS E EFEITOS ADVERSOS
  risks: [
    'efeito adverso comum (frequência)',
    'efeito raro mas grave',
    'toxicidade específica de órgão',
    'sinais de sobredose',
    // ... completo
  ],
  
  // MODO DE USO DETALHADO (instruções práticas)
  modeOfUse: 'Passo a passo: Como preparar (temperatura, tempo). Quando tomar (jejum/refeição). Como armazenar. Observações importantes (não ferver se degradar ativos, etc). Orientações práticas para o paciente',
  
  // ⭐ PARTE DA PLANTA UTILIZADA (NOVO CAMPO OBRIGATÓRIO)
  partUsed: 'Especificar: folhas, raízes, cascas, flores, frutos, sementes, rizomas, bulbos, planta inteira. Incluir época de colheita ideal se relevante (antes/após floração, época do ano)',
  
  // ⭐ PREPARAÇÃO DETALHADA (NOVO CAMPO OBRIGATÓRIO)
  preparation: 'INFUSÃO: quando e como (água quente, abafar X min, não ferver). DECOCÇÃO: quando necessário (raízes, cascas - ferver X min). MACERAÇÃO: para ativos sensíveis (água fria X horas). TINTURA: proporção álcool/planta. USO TÓPICO: como preparar compressa/cataplasma. Observações críticas (triturar antes, usar fresco vs seco, etc)',
  
  // ⭐⭐⭐ SINTOMAS - EXPANDIR MASSIVAMENTE (50-80 termos)
  symptoms: [
    // Nome oficial da condição
    'nome médico da doença',
    // Como paciente relata
    'forma popular de falar o sintoma',
    'sinônimo popular',
    'variação regional',
    // Sintomas específicos
    'sintoma específico 1',
    'sintoma específico 2',
    'como o sintoma se manifesta',
    // Sinais clínicos relacionados
    'sinal objetivo relacionado',
    // Queixas associadas
    'queixa comum associada',
    // Termos leigos
    'linguagem totalmente leiga',
    // Expressões brasileiras
    'jeito brasileiro de falar',
    // Variações ortográficas
    'variação de escrita',
    // Contextos diferentes
    'sintoma no contexto X',
    'sintoma no contexto Y',
    // CONTINUAR até 50-80 termos
    // Incluir: o que paciente sente, observa, experimenta
    // Cobrir: início agudo, crônico, leve, moderado, grave
    // Adicionar: termos relacionados, condições secondary,
    // Pensar: "que outras palavras o paciente usaria para descrever isso?"
  ],
  
  // TOXICIDADE (informações de segurança)
  toxicity: 'Classificação de toxicidade (baixa/moderada/alta). DL50 se conhecido. Dose tóxica. Sinais de intoxicação. Manejo de overdose. Uso seguro por quanto tempo. Populações de risco',
  
  // PROIBIÇÕES ESPECÍFICAS
  prohibitions: 'Lista de situações onde USO É PROIBIDO (não apenas cuidado). Motivos específicos. Consequências se usar inadequadamente. Alternativas mais seguras para essas situações'
},
```

## EXEMPLO REAL COMPLETO: Boldo-do-Chile

```javascript
'peumus-boldus': {
  common: 'Boldo-do-Chile',
  scientific: 'Peumus boldus Molina',
  image: '../assets/plants/boldo.svg',
  
  indications: [
    'dispepsia funcional e má digestão',
    'insuficiência biliar e discinesia biliar',
    'hepatopatias leves (esteatose inicial)',
    'flatulência e distensão abdominal pós-prandial',
    'constipação intestinal por hipotonia biliar',
    'cálculos biliares pequenos (coadjuvante)',
    'ressaca alcoólica',
    'digestão lenta de gorduras'
  ],
  
  contraindications: [
    'obstrução de vias biliares (coledocolitíase, estenose)',
    'hepatopatias graves (cirrose descompensada, hepatite aguda)',
    'gravidez (ascaridol pode ser abortivo)',
    'lactação (alcaloides passam no leite)',
    'crianças menores de 6 anos',
    'insuficiência renal grave',
    'alergia a Monimiaceae',
    'uso prolongado > 4 semanas (hepatotoxicidade cumulativa)'
  ],
  
  interactions: [
    'anticoagulantes varfarina (cumarinas do boldo potencializam - monitorar INR)',
    'diuréticos (potencializa perda de potássio)',
    'anti-hipertensivos (pode reduzir pressão arterial - efeito aditivo)',
    'hepatotóxicos (álcool, paracetamol, estatinas - EVITAR uso concomitante)',
    'citrato de sildenafil e similares (interação teórica)',
    'substratos CYP3A4 (boldina inibe levemente)'
  ],
  
  posology: 'Infusão das folhas secas (uso mais comum), extrato fluido, tintura 1:5, extrato seco padronizado. Usar preferencialmente após refeições gordurosas ou antes de deitar para digestão lenta',
  
  dosage: 'Infusão: 1-2g (1 colher de chá rasa) de folhas secas em 150mL água quente, 2-3x/dia após refeições. Extrato seco: 60-200mg/dia dividido em 2-3 tomadas. Tintura 1:5: 2-4mL 3x/dia. DURAÇÃO MÁXIMA: 4 semanas consecutivas. Crianças > 6 anos: metade da dose adulta. NÃO ultrapassar 3 xícaras/dia',
  
  actives: [
    'boldina (alcaloide principal - 0,1-0,3% das folhas) - colerético e hepatoprotetor',
    'ascaridol (monoterpeno - até 40% do óleo essencial) - vermífugo potente',
    'flavonoides (canferol, quercetina)',
    'óleo essencial (1,8-cineol, limoneno, p-cimeno)',
    'cumarinas',
    'taninos',
    'boldoglucina'
  ],
  
  risks: [
    'hepatotoxicidade com uso prolongado (> 4 semanas)',
    'ascaridol em doses altas é neurotóxico',
    'distúrbios renais com sobredose',
    'exantema cutâneo em alérgicos',
    'diarreia por excesso de bile',
    'bradicardia leve em predispostos',
    'potencial mutagênico teórico (estudos conflitantes - usar apenas curto prazo)'
  ],
  
  modeOfUse: 'Infusão: colocar 1 colher de chá de folhas secas picadas em xícara, despejar água fervente, abafar por 10 minutos, coar e beber morno. Tomar 15-30 minutos após refeições pesadas ou gordurosas. Não adoçar (açúcar interfere na ação colerética). Para ressaca: 1 xícara pela manhã em jejum. NUNCA ferver as folhas (degrada boldina). Suspender se surgir dor abdominal intensa ou icterícia',
  
  partUsed: 'Folhas coriáceas coletadas de plantas adultas (mínimo 3 anos). Colher preferencialmente no verão (maior concentração de boldina). Usar folhas secas (frescas contêm mais ascaridol volátil)',
  
  preparation: 'INFUSÃO (método padrão): 1 colher de chá (2-3g) de folhas secas rasgadas em 150-200mL de água. Aquecer água até fervura, desligar fogo, adicionar folhas, tampar e abafar por 10 minutos. Coar e consumir em até 2 horas. NÃO FERVER as folhas dentro da água (destroi boldina e concentra ascaridol). TINTURA: folhas secas 1:5 em álcool 60-70%, macerar 14 dias, agitando diariamente, coar. USO TÓPICO: não recomendado (ascaridol irrita pele)',
  
  symptoms: [
    // Termos médicos
    'dispepsia funcional',
    'insuficiência biliar',
    'discinesia biliar',
    'esteatose hepática',
    'hepatomegalia',
    'colelitíase pequena',
    'flatulência',
    'meteorismo',
    'distensão abdominal',
    'plenitude pós-prandial',
    'constipação intestinal',
    'digestão lenta',
    'má digestão de gorduras',
    // Como paciente relata
    'má digestão',
    'digestão ruim',
    'comida fica parada no estômago',
    'sensação de estômago cheio',
    'barriga inchada',
    'barriga distendida',
    'empachamento',
    'sinto que a comida não desce',
    'estômago pesado',
    'estufamento',
    'gases',
    'gases presos',
    'excesso de gases',
    'pum constante',
    'flatos',
    'arroto frequente',
    'eructação',
    'azia após gordura',
    'queimação depois de comer',
    'dor no fígado',
    'fígado inchado',
    'fígado pesado',
    'desconforto no lado direito',
    'dor abaixo das costelas direitas',
    'peso no hipocôndrio direito',
    // Contextos
    'sinto mal depois de comer feijoada',
    'não digiro fritura',
    'gordura me faz mal',
    'carnes gordas caem mal',
    'chocolate me empacha',
    'comida gordurosa fica parada',
    'demoro muito para digerir',
    'intestino preso',
    'constipação',
    'prisão de ventre',
    'fezes ressecadas',
    // Sinônimos regionais
    'bucho cheio',
    'estômago carregado',
    'corpo empatado',
    'fastio',
    'entalo',
    'inchação',
    'inchaço na barriga',
    // Sinais associados
    'língua saburrosa',
    'gosto amargo na boca',
    'boca amarga',
    'hálito ruim',
    'ressaca',
    'enjoo depois de beber',
    'mal-estar após bebida alcoólica',
    'excesso de álcool',
    'fígado sobrecarregado',
    // Exames alterados
    'transaminases elevadas',
    'TGO alto',
    'TGP alto',
    'gordura no fígado',
    'ultrassom com esteatose',
    'enzimas hepáticas alteradas',
    // Queixas gerais
    'cansaço após comer',
    'sonolência pós-prandial',
    'náusea leve',
    'enjoo leve',
    'desconforto digestivo',
    'digestão difícil',
    'estômago preguiçoso',
    'metabolismo lento'
  ],
  
  toxicity: 'MODERADA. Ascaridol (componente do óleo essencial) é tóxico em doses altas (>1,5mL de óleo essencial puro) causando convulsões, nefrotoxicidade e hepatotoxicidade. Uso prolongado de infusão (>4-6 semanas consecutivas) pode causar hepatite medicamentosa reversível. DL50 em ratos: extrato aquoso 500-800mg/kg. Sinais de intoxicação: dor abdominal intensa, vômitos, cefaleia, confusão mental, convulsões (casos graves). ANTÍDOTO: não há específico - suporte sintomático, N-acetilcisteína se hepatotoxicidade',
  
  prohibitions: 'PROIBIDO em obstrução biliar completa (risco de ruptura de vias biliares). PROIBIDO na gravidez (ascaridol abortivo). PROIBIDO em hepatopatias graves (risco de descompensação). NUNCA usar por mais de 4 semanas consecutivas. NUNCA usar óleo essencial puro internamente (altamente tóxico). NUNCA associar com álcool. Preferir carqueja ou alcachofra em hepatopatas graves'
},
```

## PRÓXIMOS PASSOS

Você precisa aplicar este modelo para TODAS as 45 plantas existentes + adicionar 15 novas plantas brasileiras populares.

### 15 Plantas Brasileiras a ADICIONAR:

1. **Boldo-do-Chile** (exemplo acima)
2. **Carqueja** (Baccharis trimera) - hepatoprotetor, diabetes
3. **Jurubeba** (Solanum paniculatum) - fígado, anemia
4. **Quebra-pedra** (Phyllanthus niruri) - cálculos renais
5. **Confrei** (Symphytum officinale) - cicatrização TÓPICA (hepatotóxico oral)
6. **Arnica** (Arnica montana) - traumas, hematomas TÓPICO
7. **Aroeira** (Schinus terebinthifolius) - infecções ginecológicas
8. **Chapéu-de-couro** (Echinodorus macrophyllus) - diurético, reumatismo
9. **Picão-preto** (Bidens pilosa) - hepatite, icterícia
10. **Graviola** (Annona muricata) - calmante (NÃO anticâncer comprovado)
11. **Sucupira** (Pterodon emarginatus) - artrite, reumatismo
12. **Copaíba** (Copaifera langsdorffii) - anti-inflamatório óleo-resina
13. **Andiroba** (Carapa guianensis) - óleo anti-inflamatório tópico
14. **Ipê-roxo** (Tabebuia avellanedae) - imunomodulador controverso
15. **Erva-cidreira brasileira** (Lippia alba) - diferente da Melissa

### Checklist para CADA planta:

- [ ] Traduzir TUDO para português
- [ ] Adicionar `partUsed` com detalhes
- [ ] Adicionar `preparation` com métodos completos
- [ ] Expandir `symptoms` para 50-80 termos variados
- [ ] Detalhar `interactions` com mecanismos
- [ ] Especificar `dosage` com medidas caseiras
- [ ] Completar `actives` com percentuais
- [ ] Detalhar `risks` com frequências
- [ ] Escrever `toxicity` com DL50 e sinais
- [ ] Especificar `prohibitions` com alternativas

### PRIORIDADE:

**SYMPTOMS É O MAIS IMPORTANTE** - quanto mais termos, melhor a busca funciona!

Para cada sintoma principal, adicione:
- Nome médico
- Nome popular
- Como paciente fala
- Sinônimos regionais
- Variações de intensidade
- Contextos específicos
- Sinais associados
- Exames relacionados
- Consequências do sintoma

Exemplo para "dor de cabeça":
```javascript
symptoms: [
  'cefaleia', 'dor de cabeça', 'cabeça doendo', 'dor na cabeça', 'cabeça pesada',
  'pressão na cabeça', 'cabeça latejando', 'dor em peso', 'dor pulsátil',
  'enxaqueca', 'migrânea', 'dor nas têmporas', 'dor na testa', 'dor na nuca',
  'cefaleia tensional', 'dor de cabeça tensional', 'cabeça apertando',
  'sinto a cabeça explodir', 'dor que irradia para os olhos', 'fotofobia',
  'sensibilidade à luz', 'náusea com dor de cabeça', 'vômito com dor de cabeça',
  'dor de cabeça depois de beber', 'ressaca', 'dor de cabeça por estresse',
  'dor de cabeça por tensão', 'cabeça doendo todos os dias', 'dor crônica de cabeça',
  // ... continuar até 50+
]
```
