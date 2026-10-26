// Base de dados completa de medicamentos e depleções nutricionais
// Baseado em evidências da Medicina Funcional Integrativa

export const DRUG_DEPLETIONS = {
  'Ácido Acetilsalicílico (AAS)': {
    category: 'Anti-inflamatório/Antiagregante',
    depletions: ['Vitamina C', 'Ácido Fólico', 'Potássio', 'Vitamina B12'],
    explanation: 'O AAS, por ser ácido e anti-inflamatório, pode prejudicar a mucosa gástrica e reduzir a absorção da vitamina B12 e do ácido fólico. Também aumenta a excreção urinária de potássio e tem efeito oxidativo que pode depletar a vitamina C.',
  },
  'Alendronato': {
    category: 'Bifosfonato',
    depletions: ['Cálcio', 'Vitamina D', 'Magnésio'],
    explanation: 'O alendronato forma quelatos com minerais, competindo na absorção intestinal. O uso prolongado interfere na remodelação óssea, aumentando a demanda por vitamina D e magnésio para manter a mineralização óssea adequada.',
  },
  'Alopurinol': {
    category: 'Antigotoso',
    depletions: ['Vitamina B12', 'Selênio', 'Magnésio', 'Vitamina D'],
    explanation: 'Reduz os níveis de ácido úrico inibindo a xantina oxidase, uma enzima que também participa de reações oxidativas. Isso pode afetar o metabolismo do selênio e do magnésio.',
  },
  'Alprazolam': {
    category: 'Benzodiazepínico',
    depletions: ['Vitamina B12', 'Magnésio', 'Zinco'],
    explanation: 'Afeta o sistema nervoso central, podendo comprometer o metabolismo e a absorção de micronutrientes. O uso prolongado pode levar à redução de magnésio e zinco, essenciais para a neurotransmissão.',
  },
  'Amiodarona': {
    category: 'Antiarrítmico',
    depletions: ['Iodo'],
    explanation: 'Rica em iodo, seu metabolismo libera grandes quantidades do mineral, levando paradoxalmente à inibição da organificação do iodo na tireoide (efeito Wolf-Chaikoff), podendo causar hipo ou hipertireoidismo.',
  },
  'Amitriptilina': {
    category: 'Antidepressivo Tricíclico',
    depletions: ['Potássio', 'Magnésio', 'Vitamina B12', 'Vitamina D'],
    explanation: 'Pode causar retenção urinária e alterações eletrolíticas, levando a depleção de potássio e magnésio. O uso crônico pode reduzir a absorção da vitamina B12 e vitamina D por efeitos indiretos sobre a função hepática.',
  },
  'Anlodipino': {
    category: 'Bloqueador de Canal de Cálcio',
    depletions: ['Potássio', 'Magnésio', 'Zinco', 'Ácido Fólico', 'Vitamina D'],
    explanation: 'Afeta o balanço eletrolítico, reduzindo os níveis de potássio e magnésio. Pode interferir na biodisponibilidade de zinco e ácido fólico, além de afetar a síntese e ativação da vitamina D.',
  },
  'Aripiprazol': {
    category: 'Antipsicótico Atípico',
    depletions: ['Zinco', 'Cálcio', 'Potássio'],
    explanation: 'Pode induzir distúrbios hidroeletrolíticos, com perda urinária de potássio e cálcio. O zinco também pode ser depletado devido a alterações intestinais secundárias à disbiose.',
  },
  'Atenolol': {
    category: 'Betabloqueador',
    depletions: ['Coenzima Q10', 'Magnésio', 'Potássio', 'Vitamina D', 'Cálcio', 'Zinco'],
    explanation: 'Reduz a produção de energia celular e a biodisponibilidade de CoQ10. Promove perda urinária de magnésio, potássio e zinco. Pode interferir na homeostase de vitamina D e cálcio por alteração na perfusão renal.',
  },
  'Bisoprolol': {
    category: 'Betabloqueador',
    depletions: ['Coenzima Q10', 'Vitamina D', 'Magnésio'],
    explanation: 'Reduz a produção de energia celular e a biodisponibilidade de CoQ10. Pode impactar a absorção de vitamina D e induzir à perda de magnésio por vias urinárias.',
  },
  'Bromocriptina': {
    category: 'Agonista Dopaminérgico',
    depletions: ['Vitamina B6', 'Magnésio', 'Zinco'],
    explanation: 'Interfere na disponibilidade de vitamina B6 ao competir com essa vitamina na conversão de L-dopa em dopamina. Pode interferir na absorção intestinal de magnésio e zinco.',
  },
  'Carbamazepina': {
    category: 'Anticonvulsivante',
    depletions: ['Vitamina D', 'Cálcio', 'Vitamina B12', 'Ácido Fólico'],
    explanation: 'Indutor enzimático que acelera o metabolismo hepático de vitamina D e, indiretamente, reduz a absorção intestinal de cálcio. Também interfere no metabolismo do ácido fólico e da vitamina B12.',
  },
  'Carvedilol': {
    category: 'Betabloqueador',
    depletions: ['Coenzima Q10', 'Magnésio', 'Potássio', 'Vitamina D'],
    explanation: 'Reduz a síntese de CoQ10, essencial para a cadeia transportadora de elétrons e produção de ATP. Também pode afetar a reabsorção renal de magnésio e potássio.',
  },
  'Cefalexina': {
    category: 'Antibiótico Betalactâmico',
    depletions: ['Vitamina K', 'Ferro', 'Magnésio'],
    explanation: 'Pode alterar significativamente a microbiota intestinal, afetando a produção endógena de vitamina K por bactérias intestinais. Também pode interferir na absorção de ferro e magnésio.',
  },
  'Ciclosporina': {
    category: 'Imunossupressor',
    depletions: ['Magnésio', 'Potássio', 'Zinco'],
    explanation: 'Afeta diretamente a função renal, aumentando a excreção urinária de magnésio, potássio e zinco. Esses desequilíbrios afetam o controle da pressão arterial e o tônus muscular.',
  },
  'Cimetidina': {
    category: 'Antagonista H2',
    depletions: ['Vitamina B12', 'Ferro', 'Zinco'],
    explanation: 'Reduz a secreção de ácido clorídrico gástrico, essencial para a liberação de vitamina B12 dos alimentos e para a absorção eficiente de ferro e zinco.',
  },
  'Ciprofloxacino': {
    category: 'Antibiótico Fluoroquinolona',
    depletions: ['Cálcio', 'Zinco', 'Magnésio', 'Ferro'],
    explanation: 'Forma quelatos insolúveis com íons metálicos no trato gastrointestinal, reduzindo sua biodisponibilidade. Isso compromete diversas funções fisiológicas.',
  },
  'Citalopram': {
    category: 'ISRS',
    depletions: ['Magnésio', 'Selênio', 'Vitamina D', 'Potássio'],
    explanation: 'O uso crônico pode alterar a excreção renal de potássio e magnésio. A modulação da serotonina também impacta o metabolismo do selênio, importante para o equilíbrio redox.',
  },
  'Clindamicina': {
    category: 'Antibiótico Lincosamida',
    depletions: ['Vitamina K', 'Magnésio', 'Zinco'],
    explanation: 'Possui forte impacto sobre a microbiota intestinal, comprometendo a produção de vitamina K e a absorção intestinal de magnésio e zinco.',
  },
  'Clomifeno': {
    category: 'Modulador Seletivo de Receptor de Estrogênio',
    depletions: ['Zinco', 'Magnésio', 'Vitamina B6', 'Vitamina E'],
    explanation: 'Pode interferir na biodisponibilidade de zinco, magnésio e vitamina B6, essenciais para a síntese hormonal e ovulatória. Aumenta o estresse oxidativo, favorecendo o consumo de vitamina E.',
  },
  'Clonazepam': {
    category: 'Benzodiazepínico',
    depletions: ['Magnésio', 'Zinco', 'Potássio'],
    explanation: 'Afeta a atividade dos canais de GABA e pode promover alterações eletrolíticas ao influenciar a excreção renal de magnésio, potássio e zinco.',
  },
  'Clonidina': {
    category: 'Agonista Alfa-Adrenérgico',
    depletions: ['Magnésio', 'Potássio', 'Cálcio', 'Zinco'],
    explanation: 'Pode interferir na absorção e na excreção renal de minerais como magnésio, potássio, cálcio e zinco. Esses desequilíbrios afetam o controle da pressão arterial.',
  },
  'Clopidogrel': {
    category: 'Antiagregante Plaquetário',
    depletions: ['Vitamina B12', 'Ácido Fólico', 'Vitamina K'],
    explanation: 'Pode afetar a metabolização da vitamina B12 e do ácido fólico por interferência na metilação hepática. Também há interferência na flora intestinal produtora de vitamina K.',
  },
  'Dexametasona': {
    category: 'Corticosteroide',
    depletions: ['Vitamina D', 'Cálcio', 'Potássio', 'Magnésio'],
    explanation: 'Inibe a absorção intestinal de cálcio e magnésio, além de aumentar sua excreção urinária. Também reduz os níveis de potássio e interfere na ativação da vitamina D.',
  },
  'Diazepam': {
    category: 'Benzodiazepínico',
    depletions: ['Magnésio', 'Potássio', 'Vitamina D'],
    explanation: 'Promove alterações nos canais GABA e impacta os níveis de magnésio e potássio pela ação renal. A deficiência de vitamina D pode ser secundária à redução de exposição solar.',
  },
  'Digoxina': {
    category: 'Glicosídeo Cardíaco',
    depletions: ['Potássio'],
    explanation: 'Age diretamente na bomba de sódio e potássio ATPase nos cardiomiócitos, e sua eficácia é altamente dependente dos níveis de potássio extracelular. A hipocalemia aumenta a toxicidade.',
  },
  'Diltiazem': {
    category: 'Bloqueador de Canal de Cálcio',
    depletions: ['Potássio', 'Magnésio', 'Cálcio'],
    explanation: 'Afeta o influxo de cálcio nas células musculares lisas e cardíacas. Esse bloqueio prolongado pode alterar a homeostase de potássio e magnésio.',
  },
  'Doxazosina': {
    category: 'Antagonista Alfa-Adrenérgico',
    depletions: ['Magnésio', 'Potássio', 'Zinco', 'Vitamina D'],
    explanation: 'Pode levar a alterações na função renal e na excreção de eletrólitos como magnésio e potássio. Também pode impactar o metabolismo hepático e a absorção de zinco.',
  },
  'Doxiciclina': {
    category: 'Antibiótico Tetraciclina',
    depletions: ['Magnésio', 'Ferro', 'Cálcio', 'Zinco'],
    explanation: 'Forma quelatos com íons metálicos no trato gastrointestinal, impedindo sua absorção. Magnésio, ferro, cálcio e zinco são particularmente afetados.',
  },
  'Esomeprazol': {
    category: 'Inibidor de Bomba de Prótons',
    depletions: ['Cálcio', 'Magnésio', 'Zinco', 'Vitamina B12'],
    explanation: 'Reduz drasticamente a secreção de ácido gástrico, fundamental para a absorção de cálcio, magnésio, zinco e vitamina B12. A hipocloridria resulta afeta o clivamento proteico.',
  },
  'Espironolactona': {
    category: 'Diurético Poupador de Potássio',
    depletions: ['Potássio', 'Magnésio', 'Zinco'],
    explanation: 'Paradoxalmente pode causar alterações eletrolíticas, incluindo hipermagnesemia ou hipomagnesemia. Também pode interferir na reabsorção renal de zinco.',
  },
  'Fenobarbital': {
    category: 'Anticonvulsivante Barbitúrico',
    depletions: ['Vitamina D', 'Vitamina K', 'Ácido Fólico'],
    explanation: 'Indutor enzimático potente, acelera o catabolismo hepático das vitaminas lipossolúveis D e K, além do ácido fólico. Isso prejudica o metabolismo ósseo e a coagulação.',
  },
  'Fenitoína': {
    category: 'Anticonvulsivante',
    depletions: ['Vitamina D', 'Ácido Fólico', 'Cálcio'],
    explanation: 'Indutor de enzimas hepáticas, aumenta a degradação e depleção da vitamina D e do ácido fólico, comprometendo a absorção de cálcio e a saúde óssea.',
  },
  'Fentermina': {
    category: 'Simpatomimético',
    depletions: ['Coenzima Q10', 'Magnésio', 'Vitamina B12'],
    explanation: 'Aumenta o metabolismo basal e a produção de radicais livres, elevando o consumo de CoQ10 e magnésio. Pode interferir na absorção da vitamina B12.',
  },
  'Finasterida': {
    category: 'Inibidor da 5-alfa-redutase',
    depletions: ['Zinco', 'Vitamina D', 'Selênio'],
    explanation: 'Inibe a conversão de testosterona em DHT, o que pode impactar indiretamente a regulação de zinco, essencial para a função prostática. Também pode alterar o metabolismo da vitamina D.',
  },
  'Fluoxetina': {
    category: 'ISRS',
    depletions: ['Sódio', 'Magnésio', 'Selênio', 'Ácido Fólico', 'Potássio', 'Cálcio'],
    explanation: 'Pode causar distúrbios eletrolíticos como hiponatremia, especialmente em idosos. Também associada à perda de magnésio, potássio e cálcio, além de reduzir ácido fólico e selênio.',
  },
  'Fluvoxamina': {
    category: 'ISRS',
    depletions: ['Magnésio', 'Zinco', 'Potássio'],
    explanation: 'Altera a função renal e os transportadores eletrolíticos, promovendo maior excreção de magnésio, potássio e zinco. Isso pode impactar a função neuromuscular.',
  },
  'Furosemida': {
    category: 'Diurético de Alça',
    depletions: ['Potássio', 'Magnésio', 'Cálcio', 'Vitamina B1 (Tiamina)'],
    explanation: 'Bloqueia a reabsorção de sódio, potássio, cálcio e magnésio no néfron, causando excreção significativa desses eletrólitos. Também está associada à depleção de tiamina.',
  },
  'Gabapentina': {
    category: 'Anticonvulsivante',
    depletions: ['Magnésio', 'Selênio', 'Vitamina B12', 'Ferro', 'Vitamina D'],
    explanation: 'Pode interferir na absorção intestinal de diversos micronutrientes, além de aumentar a excreção renal. A perda de selênio e magnésio compromete o equilíbrio antioxidante.',
  },
  'Haloperidol': {
    category: 'Antipsicótico Típico',
    depletions: ['Magnésio', 'Zinco', 'Potássio'],
    explanation: 'Pode afetar a homeostase de minerais como magnésio, potássio e zinco por mecanismos relacionados à modulação renal e ao aumento da secreção de aldosterona.',
  },
  'Hidroclorotiazida': {
    category: 'Diurético Tiazídico',
    depletions: ['Potássio'],
    explanation: 'Aumenta a excreção de potássio ao inibir sua reabsorção no túbulo distal. A hipocalemia resultante pode causar fadiga, fraqueza muscular e arritmias cardíacas.',
  },
  'Ibuprofeno': {
    category: 'AINE',
    depletions: ['Ferro', 'Selênio', 'Vitamina D'],
    explanation: 'Pode causar irritação gástrica e sangramentos subclínicos, levando à perda crônica de ferro. Além disso, interfere na absorção intestinal de selênio.',
  },
  'Isosorbida': {
    category: 'Vasodilatador',
    depletions: ['Coenzima Q10', 'Magnésio', 'Potássio'],
    explanation: 'Pode aumentar o estresse oxidativo celular, exigindo maior demanda de CoQ10. Também está associada à perda renal de magnésio e potássio.',
  },
  'Isotretinoína': {
    category: 'Retinoide',
    depletions: ['Vitamina A', 'Vitamina E', 'Vitamina D'],
    explanation: 'Derivado da vitamina A, em altas doses suprime a absorção e o metabolismo de outras vitaminas lipossolúveis, como E e D. Pode causar desequilíbrio antioxidante.',
  },
  'Lamotrigina': {
    category: 'Anticonvulsivante',
    depletions: ['Magnésio', 'Zinco', 'Ácido Fólico'],
    explanation: 'Pode interferir na absorção intestinal e metabolismo hepático de magnésio, zinco e ácido fólico. A deficiência desses nutrientes impacta a neurotransmissão.',
  },
  'Levodopa': {
    category: 'Antiparkisoniano',
    depletions: ['Vitamina B6', 'Vitamina B12', 'Ácido Fólico'],
    explanation: 'Compete com a vitamina B6 no metabolismo da dopamina, o que pode aumentar a necessidade desse cofator. O uso crônico também pode interferir na absorção de B12 e ácido fólico.',
  },
  'Levotiroxina': {
    category: 'Hormônio Tireoidiano',
    depletions: ['Iodo', 'Ferro', 'Vitamina D', 'Zinco', 'Selênio'],
    explanation: 'Aumenta a taxa metabólica basal, podendo acelerar o turnover de nutrientes como zinco, selênio e vitamina D. O selênio é crucial para a conversão de T4 em T3.',
  },
  'Lisinopril': {
    category: 'Inibidor da ECA',
    depletions: ['Potássio', 'Magnésio', 'Zinco', 'Vitamina D'],
    explanation: 'Pode causar retenção de potássio ao reduzir a aldosterona, mas paradoxalmente também pode levar à depleção em certos contextos renais. A perda de magnésio e zinco ocorre por disfunção tubular.',
  },
  'Lítio': {
    category: 'Estabilizador de Humor',
    depletions: ['Magnésio', 'Potássio', 'Zinco', 'Sódio'],
    explanation: 'Compete com íons como potássio, sódio e magnésio nos túbulos renais, levando a excreção aumentada. A perda de zinco afeta a função imunológica e neurológica.',
  },
  'Loratadina': {
    category: 'Anti-histamínico',
    depletions: ['Vitamina C', 'Magnésio', 'Potássio', 'Zinco'],
    explanation: 'Pode reduzir os níveis séricos de vitamina C, magnésio, potássio e zinco por alterações na secreção gástrica e no trânsito intestinal.',
  },
  'Losartana': {
    category: 'Antagonista de Receptor de Angiotensina II',
    depletions: ['Potássio', 'Vitamina D', 'Ácido Fólico', 'Coenzima Q10'],
    explanation: 'Bloqueia receptores de angiotensina II, o que pode interferir no metabolismo renal de potássio. A modulação do sistema renina-angiotensina pode alterar a biodisponibilidade de CoQ10.',
  },
  'Metformina': {
    category: 'Antidiabético',
    depletions: ['Vitamina B12', 'Magnésio', 'Ácido Fólico', 'Zinco', 'Selênio', 'Vitamina D', 'Ferro'],
    explanation: 'Reduz a absorção de vitamina B12 ao interferir nos receptores intestinais de fator intrínseco. Também afeta a microbiota intestinal, comprometendo a absorção de magnésio, zinco, selênio, vitamina D e ferro.',
  },
  'Metoprolol': {
    category: 'Betabloqueador',
    depletions: ['Magnésio', 'Potássio', 'Vitamina D', 'Zinco', 'Coenzima Q10'],
    explanation: 'Pode afetar a função mitocondrial e depletar a CoQ10, impactando o metabolismo energético cardíaco. Pode causar alterações eletrolíticas, como perda de potássio e magnésio.',
  },
  'Metronidazol': {
    category: 'Antibiótico/Antiparasitário',
    depletions: ['Magnésio', 'Zinco', 'Ferro'],
    explanation: 'Altera a microbiota intestinal e prejudica a absorção de minerais como ferro, zinco e magnésio. Seu efeito antimicrobiano pode impactar a barreira intestinal.',
  },
  'Mirtazapina': {
    category: 'Antidepressivo Tetracíclico',
    depletions: ['Magnésio', 'Potássio', 'Vitamina D'],
    explanation: 'Pode afetar o metabolismo renal e levar a excreção aumentada de potássio e magnésio. Também pode interferir na ativação da vitamina D, prejudicando a imunomodulação.',
  },
  'Olanzapina': {
    category: 'Antipsicótico Atípico',
    depletions: ['Vitamina B6', 'Magnésio', 'Zinco', 'Ácido Fólico'],
    explanation: 'Pode interferir na absorção e metabolismo de nutrientes essenciais à neurotransmissão, como vitamina B6, zinco e ácido fólico. Seu efeito sedativo também pode afetar o transporte de nutrientes.',
  },
  'Omeprazol': {
    category: 'Inibidor de Bomba de Prótons',
    depletions: ['Magnésio', 'Ferro', 'Cálcio', 'Zinco', 'Vitamina D'],
    explanation: 'Reduz a acidez gástrica, fundamental para a absorção de minerais como magnésio, ferro, cálcio e zinco. A deficiência de ácido gástrico compromete a solubilização desses minerais.',
  },
  'Pantoprazol': {
    category: 'Inibidor de Bomba de Prótons',
    depletions: ['Cálcio'],
    explanation: 'Reduz a acidez gástrica, dificultando a solubilização e absorção do cálcio, especialmente em sua forma inorgânica. O uso prolongado está associado ao risco de osteopenia.',
  },
  'Paroxetina': {
    category: 'ISRS',
    depletions: ['Magnésio'],
    explanation: 'Pode causar alterações no equilíbrio eletrolítico ao interferir na função renal e aumentar a excreção de magnésio. Esse efeito pode impactar a função muscular e cardiovascular.',
  },
  'Prednisona': {
    category: 'Corticosteroide',
    depletions: ['Potássio', 'Cálcio', 'Magnésio', 'Zinco', 'Vitamina D', 'Ácido Fólico', 'Coenzima Q10'],
    explanation: 'Aumenta a excreção urinária de potássio, cálcio e magnésio. Também reduz a absorção de zinco e vitamina D, afetando imunidade e metabolismo ósseo. Pode prejudicar a metilação e os níveis de energia.',
  },
  'Propafenona': {
    category: 'Antiarrítmico',
    depletions: ['Magnésio', 'Potássio', 'Coenzima Q10'],
    explanation: 'Pode interferir na condução cardíaca ao alterar o transporte de magnésio e potássio. Também afeta negativamente a função mitocondrial e a produção de ATP, elevando a demanda por CoQ10.',
  },
  'Quetiapina': {
    category: 'Antipsicótico Atípico',
    depletions: ['Vitamina D', 'Magnésio', 'Zinco'],
    explanation: 'Pode alterar a homeostase de minerais como zinco e magnésio, essenciais para função neurológica. Além disso, pode reduzir os níveis de vitamina D por modulação terapêutica.',
  },
  'Ramipril': {
    category: 'Inibidor da ECA',
    depletions: ['Potássio', 'Magnésio'],
    explanation: 'Pode causar alterações na reabsorção tubular renal, resultando em desequilíbrios de potássio e magnésio. O monitoramento desses eletrólitos é essencial para prevenir arritmias.',
  },
  'Ranitidina': {
    category: 'Antagonista H2',
    depletions: ['Vitamina B12', 'Ferro', 'Zinco'],
    explanation: 'Reduz a produção de ácido gástrico, dificultando a absorção de vitamina B12, ferro e zinco, cuja solubilização depende do pH estomacal. A longo prazo, pode causar anemia.',
  },
  'Rifamicina': {
    category: 'Antibiótico',
    depletions: ['Vitamina B6', 'Vitamina D', 'Ácido Fólico'],
    explanation: 'Acelera o metabolismo hepático de várias vitaminas hidrossolúveis, como B6 e ácido fólico, além de interferir na ativação da vitamina D.',
  },
  'Risedronato': {
    category: 'Bifosfonato',
    depletions: ['Cálcio', 'Vitamina D', 'Magnésio'],
    explanation: 'Assim como outros bifosfonatos, inibe a reabsorção óssea e pode afetar a homeostase do cálcio e do magnésio. Seu uso prolongado pode prejudicar a absorção intestinal desses minerais.',
  },
  'Risperidona': {
    category: 'Antipsicótico Atípico',
    depletions: ['Potássio', 'Cálcio', 'Magnésio', 'Vitamina D'],
    explanation: 'Pode induzir alterações no metabolismo renal e endócrino, resultando em perda de potássio e magnésio. Também pode interferir no metabolismo da vitamina D.',
  },
  'Rivaroxabana': {
    category: 'Anticoagulante',
    depletions: ['Vitamina K', 'Magnésio', 'Cálcio'],
    explanation: 'Um anticoagulante que não age diretamente sobre a vitamina K, mas seu uso pode impactar a síntese de fatores dependentes dessa vitamina. Pode também induzir distúrbios eletrolíticos leves.',
  },
  'Rosuvastatina': {
    category: 'Estatina',
    depletions: ['Coenzima Q10', 'Vitamina D', 'Selênio'],
    explanation: 'Inibe a enzima HMG-CoA redutase, bloqueando a via de síntese do colesterol, mesma via utilizada para a produção endógena de CoQ10.',
  },
  'Sertralina': {
    category: 'ISRS',
    depletions: ['Magnésio', 'Sódio', 'Potássio'],
    explanation: 'Pode causar hiponatremia por secreção inadequada de ADH (SIADH), além de influenciar na excreção de magnésio e potássio. A deficiência desses eletrólitos pode contribuir para fadiga e arritmias.',
  },
  'Sinvastatina': {
    category: 'Estatina',
    depletions: ['Coenzima Q10', 'Vitamina D', 'Selênio', 'Magnésio'],
    explanation: 'Assim como outras estatinas, reduz a produção de CoQ10 e pode diminuir a síntese de vitamina D e selênio, prejudicando a função cardiovascular e imunológica.',
  },
  'Sulfasalazina': {
    category: 'Anti-inflamatório Intestinal',
    depletions: ['Ácido Fólico', 'Vitamina B12', 'Ferro'],
    explanation: 'Compromete a absorção intestinal de ácido fólico ao inibir enzimas dependentes de folato. Também afeta a absorção de ferro e vitamina B12, especialmente por inflamar a mucosa intestinal.',
  },
  'Tacrolimo': {
    category: 'Imunossupressor',
    depletions: ['Magnésio', 'Potássio', 'Zinco', 'Vitamina D'],
    explanation: 'Afeta diretamente os túbulos renais, causando perda urinária de magnésio e potássio. Também reduz os níveis de vitamina D e zinco, enfraquecendo a imunidade.',
  },
  'Tamsulosina': {
    category: 'Antagonista Alfa-Adrenérgico',
    depletions: ['Magnésio', 'Zinco', 'Potássio'],
    explanation: 'Pode induzir alterações na pressão e na função neuromuscular, associadas à excreção aumentada de potássio e magnésio. O zinco pode ser depletado secundariamente.',
  },
  'Teofilina': {
    category: 'Broncodilatador',
    depletions: ['Magnésio', 'Potássio', 'Cálcio'],
    explanation: 'Broncodilatador que aumenta a excreção renal de magnésio e potássio, e pode induzir distúrbios eletrolíticos leves, alterando a contratilidade muscular e cardíaca.',
  },
  'Tetraciclina': {
    category: 'Antibiótico',
    depletions: ['Cálcio', 'Magnésio', 'Zinco', 'Ferro'],
    explanation: 'Forma quelatos insolúveis com minerais como cálcio, magnésio, zinco e ferro no trato gastrointestinal, impedindo sua absorção.',
  },
  'Topiramato': {
    category: 'Anticonvulsivante',
    depletions: ['Ácido Fólico', 'Potássio', 'Magnésio'],
    explanation: 'Pode interferir no metabolismo do ácido fólico ao inibir enzimas envolvidas em sua ativação. Também promove perda renal de potássio e magnésio.',
  },
  'Tramadol': {
    category: 'Analgésico Opioide',
    depletions: ['Magnésio', 'Potássio', 'Vitamina B12'],
    explanation: 'Pode interferir na absorção e excreção renal de magnésio e potássio, impactando o equilíbrio eletrolítico. Além disso, o uso prolongado pode reduzir a biodisponibilidade da vitamina B12.',
  },
  'Trimetoprim': {
    category: 'Antibiótico',
    depletions: ['Ácido Fólico'],
    explanation: 'Atua como antagonista da di-hidrofolato redutase, inibindo a conversão do ácido fólico para sua forma ativa. Isso compromete a síntese de DNA e a divisão celular.',
  },
  'Valproato de Sódio': {
    category: 'Anticonvulsivante',
    depletions: ['Vitamina D', 'Ácido Fólico', 'Vitamina B12', 'Magnésio'],
    explanation: 'Afeta o metabolismo hepático e pode prejudicar a absorção e ativação da vitamina D. Ele também interfere na síntese e reciclagem do ácido fólico e da vitamina B12.',
  },
  'Varfarina': {
    category: 'Anticoagulante',
    depletions: ['Vitamina K', 'Magnésio', 'Ácido Fólico', 'Ferro', 'Coenzima Q10', 'Vitamina E'],
    explanation: 'Inibe a reciclagem da vitamina K, essencial para a coagulação sanguínea. Pode também alterar a biodisponibilidade de ácido fólico, ferro e magnésio. A CoQ10 pode ser afetada devido à interação com a oxidação lipídica.',
  },
  'Venlafaxina': {
    category: 'IRSN',
    depletions: ['Ferro', 'Magnésio', 'Selênio'],
    explanation: 'Pode causar distúrbios gastrointestinais que interferem na absorção de ferro e magnésio. O estresse oxidativo induzido pelo fármaco pode aumentar a necessidade de selênio.',
  },
  'Verapamil': {
    category: 'Bloqueador de Canal de Cálcio',
    depletions: ['Magnésio', 'Potássio', 'Cálcio'],
    explanation: 'Pode alterar o balanço eletrolítico por inibir a entrada de cálcio nos miócitos. Essa modulação afeta a homeostase de potássio e magnésio.',
  },
  'Zidovudina': {
    category: 'Antirretroviral',
    depletions: ['Zinco', 'Cobre', 'Selênio'],
    explanation: 'Está associada à diminuição de zinco, cobre e selênio por meio do aumento da excreção urinária e estresse oxidativo. Esses nutrientes são fundamentais para a função antioxidante e a imunidade.',
  },
};

// Dosagens terapêuticas para reposição de nutrientes depletados
export const NUTRIENT_DOSAGES = {
  'Vitamina A': {
    dosage: '5.000-10.000 UI/dia',
    posology: '1x ao dia, com alimento contendo gordura',
    duration: 'Mínimo 8-12 semanas',
    precautions: 'Contraindicado na gestação em doses elevadas. Monitorar função hepática.',
  },
  'Vitamina B1 (Tiamina)': {
    dosage: '100-300mg/dia',
    posology: '1-2x ao dia, preferencialmente antes das refeições',
    duration: 'Fase aguda: 4-8 semanas. Manutenção: dose reduzida',
    precautions: 'Evitar álcool durante tratamento.',
  },
  'Vitamina B6': {
    dosage: '50-100mg/dia',
    posology: '1-2x ao dia, com alimentos',
    duration: 'Mínimo 8-12 semanas',
    precautions: 'Doses acima de 200mg/dia por tempo prolongado podem causar neuropatia periférica.',
  },
  'Vitamina B12': {
    dosage: '1000-5000mcg/dia (oral) ou 1000mcg semanal (IM)',
    posology: 'Oral: 1x ao dia, sublingual preferencial. IM: 1x/semana',
    duration: 'Fase inicial: 4-8 semanas. Manutenção: dose menor ou mensal',
    precautions: 'Forma metilcobalamina ou hidroxocobalamina preferível à cianocobalamina.',
  },
  'Ácido Fólico': {
    dosage: '400-5000mcg/dia (L-metilfolato preferível)',
    posology: '1x ao dia, com ou sem alimentos',
    duration: 'Mínimo 8-12 semanas',
    precautions: 'Usar L-metilfolato em caso de polimorfismos MTHFR. Mascarar deficiência de B12.',
  },
  'Vitamina C': {
    dosage: '500-2000mg/dia',
    posology: '2-3x ao dia (dividir dose para melhor absorção)',
    duration: 'Uso contínuo, ajustar conforme necessidade',
    precautions: 'Pode causar diarreia em doses elevadas. Forma tamponada (ester-C) é melhor tolerada.',
  },
  'Vitamina D': {
    dosage: '2000-10.000 UI/dia (ajustar conforme níveis séricos)',
    posology: '1x ao dia, com alimento contendo gordura',
    duration: 'Uso contínuo, monitorar níveis a cada 3-6 meses',
    precautions: 'Ideal: manter níveis séricos entre 40-60 ng/mL. Combinar com vitamina K2.',
  },
  'Vitamina E': {
    dosage: '400-800 UI/dia (forma mista de tocoferóis)',
    posology: '1x ao dia, com alimento contendo gordura',
    duration: 'Mínimo 8-12 semanas',
    precautions: 'Preferir forma natural (d-alfa-tocoferol) à sintética (dl-alfa-tocoferol).',
  },
  'Vitamina K': {
    dosage: 'K1: 100-500mcg/dia. K2 MK-7: 100-200mcg/dia',
    posology: '1x ao dia, com alimento contendo gordura',
    duration: 'Uso contínuo',
    precautions: 'CONTRAINDICADO com varfarina. Preferir K2 MK-7 para saúde óssea e cardiovascular.',
  },
  'Cálcio': {
    dosage: '500-1500mg/dia (dividir dose)',
    posology: '2-3x ao dia, com alimentos',
    duration: 'Uso contínuo',
    precautions: 'Não exceder 500mg por dose. Combinar com magnésio, vitamina D e K2. Evitar carbonato, preferir citrato ou quelato.',
  },
  'Magnésio': {
    dosage: '300-600mg/dia (elemento)',
    posology: '2x ao dia (manhã e noite)',
    duration: 'Uso contínuo',
    precautions: 'Pode causar diarreia (reduzir dose). Formas preferenciais: glicinato, treonato, taurato. Evitar óxido.',
  },
  'Potássio': {
    dosage: '99-200mg/dia (suplemento) + dieta rica em potássio',
    posology: '1-2x ao dia, com alimentos',
    duration: 'Conforme monitoramento',
    precautions: 'Suplementação deve ser monitorada por exames. Preferir fontes alimentares (banana, abacate, batata-doce).',
  },
  'Zinco': {
    dosage: '15-50mg/dia (elemento)',
    posology: '1x ao dia, preferencialmente com alimento',
    duration: 'Mínimo 8-12 semanas',
    precautions: 'Doses acima de 40mg/dia podem depletar cobre. Sempre combinar com cobre (proporção 15:1).',
  },
  'Ferro': {
    dosage: '30-100mg/dia (elemento)',
    posology: '1x ao dia, em jejum com vitamina C',
    duration: 'Mínimo 12-16 semanas',
    precautions: 'Pode causar constipação. Preferir bisglicinato ferroso. Não tomar com cálcio, chá ou café.',
  },
  'Selênio': {
    dosage: '100-200mcg/dia',
    posology: '1x ao dia, com alimentos',
    duration: 'Uso contínuo',
    precautions: 'Não exceder 400mcg/dia. Forma preferencial: selenometionina ou levedura de selênio.',
  },
  'Cobre': {
    dosage: '1-3mg/dia',
    posology: '1x ao dia, com alimentos',
    duration: 'Uso contínuo quando suplementando zinco',
    precautions: 'Sempre que suplementar zinco em doses acima de 30mg/dia, adicionar cobre.',
  },
  'Iodo': {
    dosage: '150-300mcg/dia',
    posology: '1x ao dia, com alimentos',
    duration: 'Uso contínuo',
    precautions: 'Cuidado em hipo/hipertireoidismo. Avaliar função tireoidiana. Combinar com selênio.',
  },
  'Coenzima Q10': {
    dosage: '100-300mg/dia (ubiquinol preferível)',
    posology: '1-2x ao dia, com alimento contendo gordura',
    duration: 'Uso contínuo',
    precautions: 'Forma ubiquinol é mais biodisponível. Essencial para usuários de estatinas.',
  },
  'Sódio': {
    dosage: 'Ajustar via alimentar',
    posology: 'Distribuir ao longo do dia',
    duration: 'Conforme necessidade',
    precautions: 'Monitorar pressão arterial. Preferir sal rosa do Himalaia ou sal marinho.',
  },
};

// Alternativas terapêuticas naturais para reduzir dependência de medicamentos
export const NATURAL_ALTERNATIVES = {
  'Anti-hipertensivos': [
    'Magnésio 400-600mg/dia',
    'Coenzima Q10 100-200mg/dia',
    'Ômega-3 2-4g/dia',
    'Alho (extrato) 600-1200mg/dia',
    'Hibisco (chá) 3-4 xícaras/dia',
    'Redução de sódio e aumento de potássio',
    'Exercício regular 150min/semana',
  ],
  'Antidiabéticos': [
    'Berberina 500mg 3x/dia',
    'Canela 1-6g/dia',
    'Cromo picolinato 200-1000mcg/dia',
    'Ácido alfa-lipóico 600-1800mg/dia',
    'Dieta low-carb/cetogênica',
    'Jejum intermitente',
    'Exercício resistido 3-4x/semana',
  ],
  'Estatinas': [
    'Arroz vermelho fermentado 600-2400mg/dia',
    'Coenzima Q10 200-400mg/dia',
    'Ômega-3 2-4g/dia',
    'Niacina 500-2000mg/dia (flush-free)',
    'Berberina 500mg 3x/dia',
    'Dieta baixa em carboidratos refinados',
    'Exercício aeróbico regular',
  ],
  'Ansiolíticos/Antidepressivos': [
    'Magnésio treonato 500-2000mg/dia',
    '5-HTP 50-300mg/dia',
    'L-teanina 200-400mg/dia',
    'Ashwagandha 300-600mg/dia',
    'Rhodiola 200-600mg/dia',
    'Ômega-3 2-4g/dia',
    'Vitamina D 4000-8000 UI/dia',
    'Meditação e terapia cognitivo-comportamental',
  ],
  'AINEs': [
    'Cúrcuma (curcumina) 500-2000mg/dia',
    'Ômega-3 2-4g/dia',
    'Boswellia 300-500mg 3x/dia',
    'Gengibre 1-3g/dia',
    'Vitamina D 4000-8000 UI/dia',
    'Dieta anti-inflamatória',
    'Fisioterapia e acupuntura',
  ],
  'IBPs (Omeprazol, Pantoprazol)': [
    'Enzimas digestivas',
    'Betaína HCl (se hipocloridria)',
    'Probióticos de alta potência',
    'L-glutamina 5-15g/dia',
    'Mastigação adequada',
    'Evitar alimentos gatilho',
    'Elevar cabeceira da cama',
    'Reduzir estresse',
  ],
  'Diuréticos': [
    'Hibisco (chá) 3-4 xícaras/dia',
    'Dente-de-leão (extrato)',
    'Cavalinha',
    'Redução de sódio',
    'Aumento de potássio e magnésio via dieta',
    'Exercício regular',
  ],
};
