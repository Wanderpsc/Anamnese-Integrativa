/**
 * Base de Dados de Sugestões Terapêuticas
 * 
 * Este arquivo contém o mapeamento de problemas de saúde e suas respectivas
 * sugestões terapêuticas baseadas nos arquivos de apoio.
 * 
 * ✅ INTEGRAÇÃO AUTOMÁTICA COM ARQUIVOS THERAPEUTIC-DATA:
 * - O sistema carrega AUTOMATICAMENTE todos os arquivos .txt da pasta src/assets/therapeutic-data/
 * - As informações são integradas dinamicamente nas sugestões terapêuticas
 * - Basta adicionar novos arquivos na pasta para expandir a base de conhecimento
 * 
 * Para adicionar novos dados:
 * 1. Copie os arquivos de apoio para a pasta src/assets/therapeutic-data/
 * 2. O sistema lerá automaticamente os arquivos ao gerar sugestões
 * 3. Opcionalmente, adicione informações estruturadas neste arquivo para maior controle
 */

// Importar o loader de dados terapêuticos
import { loadTherapeuticData, enrichSuggestionsWithFiles } from '../lib/therapeuticDataLoader';

export const THERAPEUTIC_DATABASE = {
  // Problemas Digestivos
  'intestino_preso': {
    title: 'Intestino Preso / Constipação',
    suggestions: [
      'Aumentar ingestão de fibras (25-30g/dia)',
      'Consumir água em abundância (2-3L/dia)',
      'Probióticos: Lactobacillus e Bifidobacterium',
      'Alimentos laxativos naturais: mamão, ameixa, linhaça',
      'Exercícios físicos regulares',
      'Magnésio quelado 300-400mg/dia',
      'Psyllium ou chia pela manhã',
      'Evitar alimentos processados e refinados'
    ],
    foods: ['Mamão', 'Ameixa', 'Linhaça', 'Chia', 'Aveia', 'Vegetais folhosos'],
    supplements: [
      'Probióticos (Lactobacillus e Bifidobacterium) - Dose: 10-50 bilhões UFC | Posologia: 2 cápsulas/dia, pela manhã em jejum | Fonte: McFarland LV. Meta-analysis of probiotics for the prevention of antibiotic associated diarrhea. Am J Gastroenterol. 2006;101(4):812-22',
      'Magnésio quelado - Dose: 400-600mg | Posologia: 1-2 cápsulas à noite antes de dormir | Fonte: Mori H, et al. Effect of magnesium oxide on colonic transit. J Gastroenterol. 2002;37(9):660-4',
      'Psyllium (casca de Plantago) - Dose: 10-30g | Posologia: 1 colher de sopa em 200ml de água, 2x/dia (manhã e noite) | Fonte: Ashraf W, et al. Effects of psyllium therapy on stool characteristics. Aliment Pharmacol Ther. 1995;9(6):639-47',
      'Fibras solúveis (goma guar, inulina) - Dose: 25-35g | Posologia: Dividir em 2-3 doses ao longo do dia com as refeições | Fonte: Anderson JW, et al. Health benefits of dietary fiber. Nutr Rev. 2009;67(4):188-205',
      'Vitamina C (ácido ascórbico) - Dose: 1000-2000mg | Posologia: 500mg de 8/8h ou 1000mg de 12/12h | Fonte: Carr AC, Maggini S. Vitamin C and Immune Function. Nutrients. 2017;9(11):1211',
      'Óleo de linhaça - Dose: 1000-3000mg | Posologia: 1 cápsula de 1000mg 3x/dia ou 1 colher de sopa/dia | Fonte: Dahl WJ, et al. Position of the Academy of Nutrition and Dietetics: Health Implications of Dietary Fiber. J Acad Nutr Diet. 2015;115(11):1861-70'
    ],
    herbs: [
      'Sene (Cassia angustifolia) - Dose: 15-30mg senósidos | Posologia: 1 xícara de chá ou 1-2 cápsulas à noite (uso máx. 7-10 dias) | Fonte: WHO Monographs on Selected Medicinal Plants Vol 1. Geneva: World Health Organization, 1999',
      'Cáscara sagrada (Rhamnus purshiana) - Dose: 300-600mg | Posologia: 20-40 gotas de tintura ou 1-2 cápsulas à noite | Fonte: European Medicines Agency. Assessment Report on Rhamnus purshianus. EMA/HMPC, 2013',
      'Funcho/Erva-doce (Foeniculum vulgare) - Dose: 1-2g de sementes | Posologia: Chá 3-4x/dia após refeições | Fonte: Alexandrovich I, et al. The effect of fennel seed on infantile colic. Altern Ther Health Med. 2003;9(4):58-61',
      'Aloe vera (Aloe barbadensis) - Dose: 50-200ml de suco | Posologia: 50-100ml pela manhã em jejum | Fonte: Langmead L, et al. Randomized, double-blind, placebo-controlled trial of oral aloe vera. Aliment Pharmacol Ther. 2004;19(7):739-47',
      'Ruibarbo (Rheum palmatum) - Dose: 200-500mg | Posologia: 1 cápsula à noite | Fonte: ESCOP Monographs: Rhei radix. 2nd ed. Thieme, 2003',
      'Tamarindo (Tamarindus indica) - Dose: 10-20g de polpa | Posologia: Dissolver em água e tomar pela manhã | Fonte: Komutarin T, et al. Extract of the seed coat of Tamarindus indica inhibits nitric oxide production. J Ethnopharmacol. 2004;92(2-3):209-14'
    ],
    homeopathy: [
      'Nux vomica 6CH - 5 glóbulos 3x/dia',
      'Bryonia 6CH - para fezes ressecadas',
      'Alumina 6CH - constipação sem vontade de evacuar',
      'Lycopodium 30CH - gases e distensão abdominal'
    ],
    quantumFlorals: [
      'Floral de Impaciência - para pressa e tensão',
      'Floral de Crab Apple - limpeza e desintoxicação',
      'Floral de Olive - para fadiga física'
    ],
    hydrotherapy: [
      'Banho de assento quente (38-40°C) por 15 minutos',
      'Compressas frias no abdômen pela manhã',
      'Hidromassagem abdominal em movimentos circulares horários',
      'Beber água morna em jejum (500ml)'
    ],
    geotherapy: [
      'Cataplasma de argila no abdômen por 30 minutos',
      'Argila verde com água morna para aplicação local',
      'Banho de imersão com argila medicinal'
    ],
    tcm: [
      'Acupuntura: E25 (Tianshu), E36 (Zusanli), BP6 (Sanyinjiao)',
      'Massagem no meridiano do intestino grosso',
      'Moxabustão em CV6 (Qihai) e E25',
      'Fitoterapia chinesa: Da Huang (ruibarbo), Huo Ma Ren (cannabis)'
    ],
    otherTherapies: [
      'Reflexologia: zona intestinal nos pés',
      'Massagem abdominal: movimentos circulares horários',
      'Yoga: posturas de torção e compressão abdominal',
      'Respiração diafragmática profunda',
      'Aromaterapia: óleo essencial de hortelã-pimenta'
    ]
  },

  'diarreia': {
    title: 'Diarreia',
    suggestions: [
      'Hidratação constante com soro caseiro',
      'Dieta BRAT (banana, arroz, maçã, torrada)',
      'Probióticos para restaurar flora intestinal',
      'Evitar laticínios temporariamente',
      'Chá de camomila e hortelã',
      'Carvão ativado em casos agudos',
      'Glutamina para reparação intestinal'
    ],
    foods: ['Banana', 'Arroz branco', 'Maçã cozida', 'Cenoura cozida', 'Batata'],
    supplements: [
      'Probióticos (Saccharomyces boulardii) - Dose: 5-10 bilhões UFC | Posologia: 2 cápsulas de 12/12h por 5-7 dias',
      'L-Glutamina - Dose: 10-30g | Posologia: 5-10g 3x/dia em água, entre refeições',
      'Carvão ativado - Dose: 500-1000mg | Posologia: 2-4 cápsulas a cada 4-6h (máx 24h)',
      'Zinco quelado - Dose: 30-50mg | Posologia: 15-25mg de 12/12h por 10-14 dias',
      'Pectina - Dose: 500-1000mg | Posologia: 1-2 cápsulas 3x/dia'
    ],
    herbs: [
      'Camomila (Matricaria chamomilla) - Dose: 2-3g de flores | Posologia: Chá 3-4x/dia',
      'Hortelã-pimenta (Mentha piperita) - Dose: 1-2g | Posologia: Chá ou 0,2ml de óleo essencial 3x/dia',
      'Gengibre (Zingiber officinale) - Dose: 1-3g | Posologia: Chá ou 250mg em cápsula 4x/dia',
      'Folha de goiabeira (Psidium guajava) - Dose: 3-6g | Posologia: Chá 3x/dia',
      'Aroeira (Schinus terebinthifolius) - Dose: 2-4g | Posologia: Chá ou tintura 20-30 gotas 3x/dia'
    ],
    homeopathy: [
      'Arsenicum album 30CH - Dose: 5 glóbulos | Posologia: De hora em hora até melhora',
      'Podophyllum 6CH - Dose: 5 glóbulos | Posologia: 3x/dia para diarreia explosiva',
      'China officinalis 6CH - Dose: 5 glóbulos | Posologia: 3x/dia para fraqueza pós-diarreia',
      'Veratrum album 30CH - Dose: 5 glóbulos | Posologia: De 2/2h para diarreia com vômitos'
    ],
    quantumFlorals: [
      'Floral de Crab Apple - Dose: 4 gotas | Posologia: 4x/dia para limpeza',
      'Floral de Rescue Remedy - Dose: 4 gotas | Posologia: A cada 30min em situações agudas',
      'Floral de Walnut - Dose: 4 gotas | Posologia: 4x/dia para adaptação'
    ],
    hydrotherapy: [
      'Hidratação oral - Dose: 200-300ml | Posologia: A cada hora com soro caseiro',
      'Compressas mornas no abdômen - Posologia: 3-4x/dia por 15-20 minutos',
      'Banho morno para relaxamento - Posologia: 1-2x/dia'
    ],
    geotherapy: [
      'Argila branca via oral - Dose: 1 colher de chá | Posologia: 2x/dia dissolvida em água',
      'Cataplasma de argila no abdômen - Posologia: 1x/dia por 30 minutos'
    ],
    tcm: [
      'Acupuntura: E25 (Tianshu), E36 (Zusanli), BP9 (Yinlingquan) | Posologia: Sessões de 30min, 2-3x/semana',
      'Moxabustão em CV8 (Shenque) e E25 | Posologia: 10-15 minutos/dia',
      'Fórmula Ge Gen Qin Lian Tang | Posologia: Conforme sugestão terapêutica do terapeuta'
    ],
    otherTherapies: [
      'Repouso digestivo - Jejum intermitente de 4-6h',
      'Reflexologia podal - zona intestinal | Posologia: Sessão de 30min/dia',
      'Massagem abdominal suave - movimentos horários | Posologia: 3x/dia por 5-10 minutos'
    ]
  },

  'dores_de_cabeca': {
    title: 'Dores de Cabeça / Enxaqueca',
    suggestions: [
      'Identificar gatilhos alimentares (glúten, laticínios, cafeína)',
      'Magnésio 400-600mg/dia',
      'Riboflavina (B2) 400mg/dia',
      'CoQ10 100-300mg/dia',
      'Hidratação adequada',
      'Técnicas de relaxamento e meditação',
      'Acupuntura',
      'Evitar luzes fortes e ruídos'
    ],
    foods: ['Gengibre', 'Hortelã', 'Melancia', 'Pepino', 'Vegetais verdes'],
    supplements: [
      'Magnésio quelado (glicinato ou bisglicinato) - Dose: 400-600mg | Posologia: 200-300mg de 12/12h com alimentos | Fonte: Mauskop A, Varughese J. Why all migraine patients should be treated with magnesium. J Neural Transm. 2012;119(5):575-9',
      'Riboflavina (Vitamina B2) - Dose: 400mg | Posologia: 200mg de 12/12h com refeições por mínimo 3 meses | Fonte: Schoenen J, et al. Effectiveness of high-dose riboflavin in migraine. Neurology. 1998;50(2):466-70',
      'Coenzima Q10 (CoQ10) - Dose: 100-300mg | Posologia: 100mg 3x/dia com refeições gordurosas | Fonte: Sándor PS, et al. Efficacy of coenzyme Q10 in migraine prophylaxis. Neurology. 2005;64(4):713-5',
      'Ômega-3 (EPA+DHA) - Dose: 2000-3000mg | Posologia: 1000mg 2-3x/dia com refeições | Fonte: Maghsoumi-Norouzabad L, et al. Effects of omega-3 fatty acids on the frequency, severity and duration of migraine attacks. Iran J Neurol. 2018;17(3):149-157',
      'Feverfew (Tanacetum parthenium) extrato - Dose: 100-150mg | Posologia: 50-75mg de 12/12h padronizado com 0,2% parthenolide | Fonte: Ernst E, Pittler MH. The efficacy of feverfew. Public Health Nutr. 2000;3(4A):509-14',
      'Vitamina D3 - Dose: 2000-4000 UI | Posologia: 2000 UI 1-2x/dia (ajustar conforme níveis séricos) | Fonte: Zandifar A, et al. Vitamin D status in migraine patients. BioMed Res Int. 2014;2014:514782'
    ],
    herbs: [
      'Gengibre (Zingiber officinale) - Dose: 500-1000mg | Posologia: Chá com 1-2g de raiz fresca 3x/dia ou 250mg de extrato seco 4x/dia | Fonte: Maghbooli M, et al. Comparison between the efficacy of ginger and sumatriptan. Phytother Res. 2014;28(3):412-5',
      'Hortelã-pimenta (Mentha piperita) óleo essencial - Dose: aplicação tópica | Posologia: Diluir 2-3 gotas em óleo carreador e aplicar nas têmporas ao início da dor | Fonte: Göbel H, et al. Essential plant oils and headache mechanisms. Phytomedicine. 1995;2(2):93-102',
      'Lavanda (Lavandula angustifolia) óleo essencial - Dose: inalação ou tópico | Posologia: Inalar 2-4 gotas por 15 min ou aplicar diluído nas têmporas | Fonte: Sasannejad P, et al. Lavender essential oil in the treatment of migraine. Eur Neurol. 2012;67(5):288-91',
      'Camomila (Matricaria chamomilla) - Dose: 2-3g de flores secas | Posologia: Chá 3-4x/dia entre as crises para prevenção | Fonte: Amsterdam JD, et al. Chamomile (Matricaria) for anxiety. J Clin Psychopharmacol. 2012;32(6):849-54',
      'Butterbur (Petasites hybridus) - Dose: 75-150mg | Posologia: 50-75mg de 12/12h (extrato livre de alcaloides pirrolizidínicos) | Fonte: Lipton RB, et al. Petasites hybridus (butterbur) is an effective preventive for migraine. Neurology. 2004;63(12):2240-4',
      'Matricária (Tanacetum parthenium) - Dose: 50-100mg | Posologia: 1 cápsula 2x/dia padronizada com 0,2% parthenolide | Fonte: Pittler MH, Ernst E. Feverfew for preventing migraine. Cochrane Database Syst Rev. 2004;(1):CD002286'
    ],
    homeopathy: [
      'Belladonna 30CH - para dores pulsáteis com calor',
      'Nux vomica 30CH - cefaleia digestiva com náuseas',
      'Iris versicolor 6CH - enxaqueca com distúrbios visuais',
      'Gelsemium 6CH - dor occipital com peso',
      'Sanguinaria 30CH - enxaqueca do lado direito'
    ],
    quantumFlorals: [
      'Floral de Impaciência - para tensão e estresse',
      'Floral de White Chestnut - pensamentos repetitivos',
      'Floral de Rock Rose - para pânico durante crises'
    ],
    hydrotherapy: [
      'Compressas frias na testa e nuca durante crise',
      'Banho de pés quente (38-40°C) com sal de Epsom por 15-20 min',
      'Compressa alternada: quente na nuca e fria na testa',
      'Hidratação intensiva: 2,5-3L de água/dia'
    ],
    geotherapy: [
      'Cataplasma de argila fria na testa e têmporas',
      'Argila verde com água de rosas para aplicação local',
      'Emplasto de argila branca na nuca'
    ],
    tcm: [
      'Acupuntura: GB20 (Fengchi), LI4 (Hegu), LV3 (Taichong), GB21 (Jianjing)',
      'Massagem nos pontos Yintang (terceiro olho) e Taiyang (têmporas)',
      'Moxabustão em BL10 e DU20 para cefaleias crônicas',
      'Fitoterapia chinesa: Chuan Xiong (ligusticum), Bai Zhi (angelica)'
    ],
    otherTherapies: [
      'Quiropraxia: ajuste cervical (se origem tensional)',
      'Biofeedback para controle da tensão muscular',
      'Meditação mindfulness 10-20 min/dia',
      'Yoga: posturas de relaxamento cervical',
      'Aromaterapia: óleos de lavanda, hortelã, eucalipto',
      'Auriculoterapia: pontos Shenmen, Occiput, Frontal'
    ]
  },

  'gases': {
    title: 'Gases e Flatulência',
    suggestions: [
      'Enzimas digestivas antes das refeições',
      'Chás carminativos (funcho, erva-doce)',
      'Mastigar bem os alimentos',
      'Evitar bebidas gaseificadas',
      'Reduzir alimentos fermentativos (feijão, repolho, brócolis)',
      'Probióticos de qualidade',
      'Carvão ativado após refeições'
    ],
    foods: ['Gengibre', 'Hortelã', 'Funcho', 'Erva-doce', 'Mamão', 'Abacaxi'],
    supplements: [
      'Enzimas digestivas (amilase, protease, lipase) - Dose: 1-2 cápsulas | Posologia: 1 cápsula no início de cada refeição principal | Fonte: Ianiro G, et al. Digestive enzyme supplementation in gastrointestinal diseases. Curr Drug Metab. 2016;17(2):187-93',
      'Probióticos (Lactobacillus, Bifidobacterium) - Dose: 10-25 bilhões UFC | Posologia: 1-2 cápsulas/dia pela manhã em jejum | Fonte: Hungin AP, et al. Systematic review: probiotics in the management of lower gastrointestinal symptoms. Aliment Pharmacol Ther. 2013;38(8):864-86',
      'Carvão ativado - Dose: 500-1000mg | Posologia: 1-2 cápsulas após refeições causadoras de gases (uso pontual, não contínuo) | Fonte: Jain NK, et al. Activated charcoal to reduce gas. Am J Gastroenterol. 1986;81(7):532-5',
      'Bromelina (enzima do abacaxi) - Dose: 200-400mg | Posologia: 1 cápsula 2-3x/dia longe das refeições | Fonte: Tochi BN, et al. Therapeutic application of pineapple protease. Pak J Nutr. 2008;7(4):513-20',
      'Papaína (enzima do mamão) - Dose: 500mg | Posologia: 1 cápsula com as principais refeições | Fonte: Bekhit AA, et al. Proteolytic enzymes from plant sources. Compr Rev Food Sci Food Saf. 2014;13(4):830-43',
      'Alfa-galactosidase (Beano) - Dose: 150-300 GALU | Posologia: 2-3 comprimidos antes de refeições com leguminosas | Fonte: Di Stefano M, et al. The effect of oral alpha-galactosidase on intestinal gas production. Dig Dis Sci. 2007;52(1):78-83'
    ],
    herbs: [
      'Funcho/Erva-doce (Foeniculum vulgare) - Dose: 1-2g de sementes | Posologia: Chá 3x/dia após refeições ou mastigar 1 colher de chá de sementes | Fonte: Birdane FM, et al. Antioxidant and hepatoprotective effects of Foeniculum. Phytother Res. 2007;21(9):895-7',
      'Hortelã-pimenta (Mentha piperita) - Dose: 1-1,5g de folhas secas | Posologia: Chá 3-4x/dia entre refeições ou óleo essencial 0,2ml 3x/dia | Fonte: McKay DL, Blumberg JB. A review of the bioactivity of peppermint oil. Phytother Res. 2006;20(8):619-33',
      'Gengibre (Zingiber officinale) - Dose: 1-2g de raiz fresca | Posologia: Chá 3x/dia ou 250mg de extrato seco 3-4x/dia | Fonte: Haniadka R, et al. A review of the gastroprotective effects of ginger. Food Funct. 2013;4(6):845-55',
      'Cardamomo (Elettaria cardamomum) - Dose: 1-1,5g de sementes | Posologia: Mastigar 2-3 sementes após refeições ou chá 2-3x/dia | Fonte: Jamal A, et al. Gastroprotective effect of cardamom. J Ethnopharmacol. 2006;103(2):149-53',
      'Cominho (Cuminum cyminum) - Dose: 1-2g de sementes | Posologia: Chá ou mastigar sementes após refeições | Fonte: Johri RK. Cuminum cyminum and Carum carvi: traditional herbs. J Med Food. 2011;14(3):233-47',
      'Anis-estrelado (Illicium verum) - Dose: 1-2g | Posologia: Chá 2-3x/dia após refeições | Fonte: Wang GW, et al. Anisaldehyde and anethole: antimicrobial effects. Food Chem. 2011;127(2):515-22'
    ],
    homeopathy: [
      'Carbo vegetabilis 6CH - gases com distensão abdominal',
      'Lycopodium 30CH - gases após 16h, pior com leguminosas',
      'China officinalis 6CH - distensão pós-refeições',
      'Nux vomica 6CH - gases com digestão lenta',
      'Argentum nitricum 30CH - gases com ansiedade'
    ],
    quantumFlorals: [
      'Floral de Impaciência - para comer rápido e má mastigação',
      'Floral de Agrimony - para tensão digestiva emocional',
      'Floral de Beech - para intolerâncias alimentares'
    ],
    hydrotherapy: [
      'Compressa quente no abdômen por 15-20 minutos após refeições',
      'Banho de assento alternado (quente/frio) para estimular peristaltismo',
      'Massagem abdominal com água morna em movimentos circulares horários',
      'Chá morno de ervas carminativas após refeições'
    ],
    geotherapy: [
      'Cataplasma de argila verde morna no abdômen por 30 minutos',
      'Argila com chá de funcho para aplicação local',
      'Emplasto de argila branca em caso de cólicas'
    ],
    tcm: [
      'Acupuntura: E36 (Zusanli), E25 (Tianshu), CV12 (Zhongwan), PC6 (Neiguan)',
      'Massagem no meridiano do estômago e baço-pâncreas',
      'Moxabustão em CV6 (Qihai) e E36',
      'Fitoterapia chinesa: Chen Pi (casca de tangerina), Sha Ren (cardamomo)'
    ],
    otherTherapies: [
      'Reflexologia: zona intestinal e estômago nos pés',
      'Massagem abdominal: círculos horários 10 minutos após refeições',
      'Yoga: posturas de torção (Ardha Matsyendrasana) e Pawanmuktasana',
      'Respiração diafragmática antes das refeições',
      'Aromaterapia: óleos de hortelã, gengibre, funcho'
    ]
  },

  'azia': {
    title: 'Azia e Refluxo',
    suggestions: [
      'Elevar cabeceira da cama 15-20cm',
      'Não deitar após as refeições (aguardar 2-3h)',
      'Evitar alimentos ácidos e gordurosos',
      'Mastigar bem e comer devagar',
      'Suco de aloe vera puro',
      'Chá de camomila e alcaçuz',
      'Bicarbonato de sódio ocasional',
      'Glutamina para reparação esofágica'
    ],
    foods: ['Banana', 'Melão', 'Aveia', 'Gengibre', 'Vegetais verdes'],
    supplements: [
      'L-Glutamina - Dose: 5-15g | Posologia: 5g 2-3x/dia em água entre refeições para reparação mucosa | Fonte: Zhou Q, et al. Randomised placebo-controlled trial of glutamine. Am J Clin Nutr. 2019;109(4):1028-36',
      'DGL - Alcaçuz deglicirrizinado - Dose: 400-800mg | Posologia: 1-2 comprimidos mastigáveis 20 min antes das refeições | Fonte: Raveendra KR, et al. GutGard for GERD. Evid Based Complement Alternat Med. 2012;2012:216970',
      'Aloe vera gel (suco) - Dose: 30-60ml | Posologia: 30ml 2x/dia antes das principais refeições | Fonte: Panahi Y, et al. Efficacy of Aloe vera in IBS. J Res Med Sci. 2015;20(1):47-52',
      'Enzimas digestivas - Dose: 1-2 cápsulas | Posologia: 1 cápsula no início de cada refeição principal | Fonte: Roxas M. The role of enzyme supplementation. Altern Med Rev. 2008;13(4):307-14',
      'Melatonina - Dose: 3-6mg | Posologia: 3mg à noite antes de dormir (melhora tônus esfíncter esofágico) | Fonte: Pereira RD. Regression of gastroesophageal reflux with melatonin. J Pineal Res. 2006;41(3):195-200',
      'Betaína HCl com pepsina - Dose: 500-1000mg | Posologia: 1 cápsula com refeições proteicas (apenas se hipocloridria confirmada) | Fonte: Guilliams TG, Drake LE. Meal-time supplementation. Integr Med. 2020;19(1):36-41'
    ],
    herbs: [
      'Camomila (Matricaria chamomilla) - Dose: 2-3g de flores | Posologia: Chá 3x/dia após refeições | Fonte: Srivastava JK, et al. Chamomile: A herbal medicine of the past with bright future. Mol Med Rep. 2010;3(6):895-901',
      'Alcaçuz/Licorice DGL (Glycyrrhiza glabra) - Dose: 400-800mg | Posologia: Mastigar 1-2 comprimidos 20 min antes das refeições | Fonte: Baker ME. Licorice and enzymes. Mol Cell Endocrinol. 1994;99(2):221-7',
      'Marshmallow (Althaea officinalis) - Dose: 2-5g de raiz | Posologia: Chá ou extrato 3x/dia entre refeições | Fonte: Zaghlool SS, et al. Gastro-protective effect of Althaea. Evid Based Complement Alternat Med. 2015;2015:892702',
      'Olmo escorregadio (Ulmus rubra) - Dose: 400-500mg | Posologia: 1-2 cápsulas 3x/dia ou chá | Fonte: Langmead L, et al. Anti-inflammatory properties of Ulmus rubra. Inflammopharmacology. 2002;10(1-2):15-21',
      'Gengibre (Zingiber officinale) - Dose: 1g de raiz fresca | Posologia: Chá 2-3x/dia após refeições | Fonte: Haniadka R, et al. Gastroprotective effects of ginger. Food Funct. 2013;4(6):845-55',
      'Espinheira-santa (Maytenus ilicifolia) - Dose: 1-2g | Posologia: Chá 3x/dia 30 min antes das refeições | Fonte: Souza-Formigoni ML, et al. Antiulcerogenic effects of Maytenus. J Ethnopharmacol. 1991;34(1):21-7'
    ],
    homeopathy: [
      'Nux vomica 6CH - azia pós-excessos alimentares',
      'Arsenicum album 30CH - queimação intensa com ansiedade',
      'Robinia 6CH - refluxo ácido noturno',
      'Pulsatilla 6CH - azia após alimentos gordurosos',
      'Carbo vegetabilis 6CH - distensão com azia'
    ],
    quantumFlorals: [
      'Floral de Impaciência - para comer rápido e estresse',
      'Floral de Agrimony - para tensão digestiva emocional',
      'Floral de Elm - sobrecarga e responsabilidade excessiva'
    ],
    hydrotherapy: [
      'Beber água morna (não gelada) durante o dia',
      'Chá morno de camomila após refeições',
      'Evitar líquidos em excesso durante refeições',
      'Compressa fria no epigástrio em caso de queimação aguda'
    ],
    geotherapy: [
      'Cataplasma de argila branca fria no epigástrio por 20-30 min',
      'Argila com chá de camomila para aplicação local',
      'Água argilosa (1 colher de argila em 200ml água, deixar decantar, beber a água) pela manhã em jejum'
    ],
    tcm: [
      'Acupuntura: CV12 (Zhongwan), PC6 (Neiguan), E36 (Zusanli), LV3 (Taichong)',
      'Massagem no ponto CV12 em sentido horário',
      'Moxabustão em CV12 e E36 (se sem sinais de calor)',
      'Fitoterapia chinesa: Bao He Wan (pílula da harmonia digestiva)'
    ],
    otherTherapies: [
      'Reflexologia: zona do estômago e esôfago nos pés',
      'Osteopatia: tratamento de hérnia hiatal',
      'Yoga: evitar inversões; praticar Vajrasana (postura do diamante) após refeições',
      'Respiração diafragmática lenta antes das refeições',
      'Aromaterapia: óleo de hortelã, lavanda (evitar em casos de refluxo severo)'
    ]
  },

  'diabetes_prediabetes': {
    title: 'Diabetes / Pré-diabetes',
    suggestions: [
      'Dieta baixa em carboidratos refinados',
      'Cromo picolinato 200-400mcg/dia',
      'Canela em pó 1-3g/dia',
      'Berberina 500mg 2-3x/dia',
      'Ácido alfa-lipóico 300-600mg/dia',
      'Exercícios físicos regulares',
      'Controle de peso',
      'Monitoramento glicêmico regular'
    ],
    foods: ['Vegetais não amiláceos', 'Proteínas magras', 'Gorduras boas', 'Canela', 'Abacate'],
    supplements: ['Cromo', 'Berberina', 'Ácido alfa-lipóico', 'Ômega-3', 'Magnésio'],
    herbs: ['Canela', 'Pata de vaca', 'Melão-de-são-caetano', 'Jambolão']
  },

  'colesterol_trig': {
    title: 'Colesterol e Triglicerídeos Elevados',
    suggestions: [
      'Ômega-3 EPA/DHA 2-3g/dia',
      'Estatinas naturais: arroz vermelho fermentado',
      'Fibras solúveis: psyllium, aveia',
      'Niacina (B3) sob orientação',
      'Coenzima Q10 100-200mg/dia',
      'Exercícios aeróbicos regulares',
      'Reduzir açúcares e carboidratos refinados',
      'Aumentar consumo de vegetais'
    ],
    foods: ['Aveia', 'Peixes gordos', 'Nozes', 'Azeite', 'Abacate', 'Alho'],
    supplements: ['Ômega-3', 'CoQ10', 'Arroz vermelho', 'Fibras', 'Vitamina E'],
    herbs: ['Alho', 'Alcachofra', 'Cúrcuma', 'Gengibre']
  },

  'anemia': {
    title: 'Anemia',
    suggestions: [
      'Ferro quelado 30-60mg/dia com vitamina C',
      'Vitamina B12 1000mcg/dia (se deficiente)',
      'Ácido fólico 400-800mcg/dia',
      'Aumentar consumo de carnes vermelhas magras',
      'Vegetais verde-escuros',
      'Evitar chá e café nas refeições',
      'Investigar causas (sangramento, má absorção)',
      'Acompanhamento por profissional de saúde regular'
    ],
    foods: ['Fígado', 'Carnes vermelhas', 'Espinafre', 'Feijão', 'Beterraba', 'Frutas cítricas'],
    supplements: ['Ferro', 'Vitamina B12', 'Ácido fólico', 'Vitamina C'],
    herbs: ['Urtiga', 'Alfafa', 'Dente-de-leão', 'Bardana']
  },

  'insonia': {
    title: 'Insônia',
    suggestions: [
      'Melatonina 1-3mg antes de dormir',
      'Magnésio 300-400mg à noite',
      'L-teanina 200mg',
      'Higiene do sono (horários regulares)',
      'Evitar telas 1h antes de dormir',
      'Chá de camomila, valeriana ou passiflora',
      'Ambiente escuro e silencioso',
      'Técnicas de relaxamento'
    ],
    foods: ['Banana', 'Aveia', 'Amêndoas', 'Chá de camomila', 'Leite morno'],
    supplements: ['Melatonina', 'Magnésio', 'L-teanina', '5-HTP', 'GABA'],
    herbs: ['Valeriana', 'Passiflora', 'Camomila', 'Melissa', 'Lavanda']
  },

  'depressao': {
    title: 'Depressão',
    suggestions: [
      'Ômega-3 EPA 1-2g/dia',
      'Vitamina D 2000-5000UI/dia',
      'Vitaminas do complexo B',
      'SAMe 400-1600mg/dia',
      'Erva de São João 300mg 3x/dia',
      'Exercícios físicos regulares',
      'Psicoterapia',
      'Exposição solar diária',
      'ATENÇÃO: Acompanhamento profissional é essencial'
    ],
    foods: ['Peixes gordos', 'Nozes', 'Frutas', 'Vegetais', 'Alimentos integrais'],
    supplements: ['Ômega-3', 'Vitamina D', 'Complexo B', 'SAMe', 'Magnésio'],
    herbs: ['Erva de São João', 'Açafrão', 'Rhodiola', 'Ashwagandha']
  },

  'ansiedade': {
    title: 'Ansiedade',
    suggestions: [
      'Magnésio 300-600mg/dia',
      'L-teanina 200-400mg',
      'GABA 500-750mg',
      'Ashwagandha 300-500mg 2x/dia',
      'Técnicas de respiração diafragmática',
      'Meditação e mindfulness',
      'Exercícios físicos regulares',
      'Reduzir cafeína e estimulantes'
    ],
    foods: ['Chá verde', 'Chocolate amargo', 'Bananas', 'Abacate', 'Amêndoas'],
    supplements: ['Magnésio', 'L-teanina', 'GABA', 'Ashwagandha', 'Complexo B'],
    herbs: ['Passiflora', 'Kava-kava', 'Valeriana', 'Melissa', 'Camomila']
  },

  'hipertensao': {
    title: 'Hipertensão Arterial',
    suggestions: [
      'Reduzir sódio (<2g/dia)',
      'Aumentar potássio (vegetais, frutas)',
      'Magnésio 400-600mg/dia',
      'Coenzima Q10 100-200mg/dia',
      'Alho envelhecido 600-1200mg/dia',
      'Ômega-3 2-3g/dia',
      'Exercícios aeróbicos regulares',
      'Controle de peso e estresse',
      'IMPORTANTE: Acompanhamento por profissional de saúde obrigatório'
    ],
    foods: ['Vegetais', 'Frutas', 'Alho', 'Beterraba', 'Chocolate amargo', 'Chá hibisco'],
    supplements: ['Magnésio', 'CoQ10', 'Ômega-3', 'Potássio', 'Alho'],
    herbs: ['Alho', 'Hibisco', 'Oliveira', 'Espinheira-santa']
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// EXPANSÃO DA BASE TERAPÊUTICA — 25+ NOVAS CONDIÇÕES
// ═══════════════════════════════════════════════════════════════════════════

export const THERAPEUTIC_DATABASE_EXTENDED = {

  'gastrite': {
    title: 'Gastrite / Úlcera Gástrica',
    suggestions: ['Evitar café, álcool, AINEs e picantes','Comer em pequenas porções frequentes','Mastigar bem os alimentos','Gerenciar estresse (causa funcional comum)'],
    foods: ['Banana', 'Batata', 'Cará', 'Couve', 'Gengibre em pequena quantidade', 'Arroz integral'],
    supplements: [
      'L-Glutamina - Dose: 5-15g | Posologia: 1 colher dissolvida em água em jejum e antes de dormir | Fonte: Pithon-Curi TC, et al. Braz J Med Biol Res. 2005',
      'Zinco carnosina - Dose: 75mg 2x/dia | Posologia: com refeições | Fonte: Mahmood A, et al. Dig Dis Sci. 2007;52(11):2736-40',
      'Cálcio carbonato - Dose: 500-1000mg | Posologia: 30min após refeições como antiácido natural | Fonte: Koop H. Am J Gastroenterol 1992',
      'Probióticos (L. reuteri, L. acidophilus) - Dose: 10-50 bilhões UFC | Posologia: em jejum pela manhã | Fonte: Graham DY, El-Zimaity HM. Aliment Pharmacol 2001'
    ],
    herbs: [
      'Camomila (Matricaria recutita) - Dose: 3-5g/xícara | Posologia: chá 3x/dia após refeições | Fonte: Srivastava JK, et al. Mol Med Rep. 2010;3(6):895-901',
      'Alcaçuz (Glycyrrhiza glabra) — DGL sem glicirrizina - Dose: 380mg | Posologia: 2 cápsulas 3x/dia antes das refeições | Fonte: Raveendra KR, et al. Phytother Res. 2012;26(9):1381-4',
      'Aloe vera gel - Dose: 50-100ml | Posologia: em jejum pela manhã | Fonte: Langmead L, et al. Aliment Pharmacol Ther. 2004',
      'Calêndula (Calendula officinalis) - Dose: 2-4g/xícara | Posologia: chá 2-3x/dia | Fonte: European Medicines Agency HMPC monograph 2008'
    ],
    homeopathy: ['Nux vomica 6CH – irritação gástrica por estresse','Arsenicum album 6CH – queimação e ansiedade','Phosphorus 12CH – gastrite erosiva','Lycopodium 30CH – distensão pós-prandial'],
    quantumFlorals: ['Impatiens – irritabilidade e tensão','Crab Apple – desintoxicação','Willow – ressentimentos acumulados'],
    hydrotherapy: ['Compressas mornas no epigástrio por 20min','Banho morno relaxante antes das refeições principais'],
    geotherapy: ['Cataplasma de argila verde no epigástrio por 30min 2x/dia'],
    tcm: ['Acupuntura: VC12 (Zhongwan), E36 (Zusanli), BP4 (Gongsun)','Moxa em VC12 para gastrite fria'],
    otherTherapies: ['Reflexologia podal — zona gástrica','Hipnoterapia para gastrite funcional','Mindfulness nas refeições']
  },

  'figado_sobrecarregado': {
    title: 'Fígado Sobrecarregado / Esteatose / Toxicidade Hepática',
    suggestions: ['Reduzir álcool, frituras e alimentos ultraprocessados','Aumentar vegetais crucíferos (brócolis, couve-flor, repolho)','Hidratação adequada (2L/dia)','Jejum intermitente 12-16h como suporte detox'],
    foods: ['Beterraba', 'Cúrcuma', 'Limão (suco em jejum)', 'Alho', 'Brócolis', 'Cardo-mariano', 'Rabanete', 'Alcachofra'],
    supplements: [
      'Cardo-mariano (silimarina) - Dose: 140-200mg silimarina 3x/dia | Posologia: com refeições | Fonte: Saller R, et al. Drugs. 2001;61(14):2035-63',
      'N-Acetilcisteína (NAC) - Dose: 600-1200mg | Posologia: 1 cápsula 2x/dia longe das refeições | Fonte: Borghi-Silva A, et al. Eur J Clin Nutr. 2009',
      'Colina + Inositol - Dose: 500mg + 500mg | Posologia: 1 de cada 2x/dia com refeições | Fonte: Zeisel SH. FASEB J. 2006',
      'Vitamina E (tocoferóis mistos) - Dose: 400-800 UI | Posologia: 1 cápsula/dia com refeição gordurosa | Fonte: Sanyal AJ, et al. N Engl J Med. 2010;362(18):1675-85'
    ],
    herbs: [
      'Cardo-mariano (Silybum marianum) - Dose: 200-400mg silimarina | Posologia: 3x/dia com refeições | Fonte: Abenavoli L, et al. Phytomedicine. 2010;17(3-4):299-306',
      'Alcachofra (Cynara scolymus) - Dose: 320-640mg extrato | Posologia: 2-3x/dia antes das refeições | Fonte: Holtmann G, et al. Aliment Pharmacol Ther. 2003;18(11-12):1099-105',
      'Boldo (Peumus boldus) - Dose: 1-3g/xícara | Posologia: chá após refeições principais | Fonte: WHO Monographs on Selected Medicinal Plants Vol 2. 2002',
      'Dente-de-leão (Taraxacum officinale) - Dose: 3-8g/xícara | Posologia: chá 3x/dia | Fonte: Schütz K, et al. Phytochem. 2006;67(22):2415-23'
    ],
    homeopathy: ['Chelidonium majus 6CH – dor hipocôndrio direito, icterícia','Carduus marianus 6CH – esteatose hepática','Nux vomica 30CH – abuso de álcool/medicamentos','China 6CH – fraqueza e digestão lenta'],
    quantumFlorals: ['Crab Apple – desintoxicação profunda','Holly – raiva acumulada','Walnut – transição e adaptação'],
    hydrotherapy: ['Compressas frias no hipocôndrio direito','Banho de imersão com sal grosso 2x/semana','Clisteres de café verde (indicação de naturopata)'],
    geotherapy: ['Argila verde sobre o fígado por 30-40min, 2x/dia'],
    tcm: ['Acupuntura: F3 (Taichong), VB34 (Yanglingquan), F14 (Qimen)','Fitoterapia: Chai Hu, Long Dan Cao'],
    otherTherapies: ['Drenagem linfática manual','Reflexologia hepática','Ozonioterapia (em clínicas especializadas)']
  },

  'fadiga': {
    title: 'Fadiga Crônica / Baixa Energia / Esgotamento',
    suggestions: ['Investigar causas: anemia, hipotireoidismo, deficiência de vitaminas','Regularizar sono (7-9h)','Exercícios de baixa intensidade progressivos','Gerenciar carga de estresse'],
    foods: ['Espinafre', 'Lentilha', 'Quinoa', 'Frutos secos', 'Maca peruana', 'Açaí', 'Banana'],
    supplements: [
      'Vitamina B12 (metilcobalamina) - Dose: 1000-5000mcg | Posologia: 1 cápsula sublingual ou IM semanal | Fonte: Langan RC, Goodbred AJ. Am Fam Physician. 2017;96(6):384-389',
      'CoQ10 (ubiquinol) - Dose: 100-300mg | Posologia: 1-2 cápsulas/dia com refeição gordurosa | Fonte: Littarru GP, Tiano L. Clin Nutr. 2010;29(4):420-7',
      'Ferro bisglicinate - Dose: 25-50mg ferro elementar | Posologia: em jejum ou com vitamina C | Fonte: Tolkien Z, et al. PLoS One. 2015;10(2):e0117383',
      'Vitamina D3 - Dose: 5000-10000 UI | Posologia: 1 cápsula/dia com alimento gorduroso pela manhã | Fonte: Holick MF. N Engl J Med. 2007',
      'Magnésio glicinato - Dose: 300-400mg | Posologia: à noite antes de dormir | Fonte: Abbasi B, et al. J Res Med Sci. 2012;17(12):1161-9'
    ],
    herbs: [
      'Ashwagandha (Withania somnifera) - Dose: 300-600mg extrato KSM-66 | Posologia: 2x/dia com refeições | Fonte: Chandrasekhar K, et al. Indian J Psychol Med. 2012;34(3):255-62',
      'Rhodiola rosea - Dose: 200-400mg extrato 3% rosavinas | Posologia: pela manhã em jejum | Fonte: Shevtsov VA, et al. Phytomedicine. 2003;10(2-3):95-105',
      'Ginseng brasileiro (Pfaffia paniculata) - Dose: 500-1000mg | Posologia: 2x/dia | Fonte: Watanabe T, et al. J Ethnopharmacol. 2000',
      'Guaraná (Paullinia cupana) - Dose: 75-300mg extrato | Posologia: pela manhã | Fonte: Haskell CF, et al. J Psychopharmacol. 2007;21(1):65-70'
    ],
    homeopathy: ['Phosphoricum acidum 6CH – fadiga mental e física após esforço','Kali phosphoricum 30CH – esgotamento nervoso','China 6CH – fraqueza por perda de fluídos','Gelsemium 30CH – prostração e fraqueza muscular'],
    quantumFlorals: ['Olive – exaustão total','Hornbeam – cansaço ao levantar','Wild Rose – apatia e resignação','Oak – esforço contínuo até o limite'],
    hydrotherapy: ['Ducha escocesa alternada (quente/frio) pela manhã','Banho de imersão com sal de Epsom 2x/semana','Banho frio rápido para estimular adrenais'],
    geotherapy: ['Banho de sol 20min/dia em exposição corporal ampla'],
    tcm: ['Acupuntura: VC4 (Guanyuan), E36 (Zusanli), BP6 (Sanyinjiao)','Moxa tonificante em pontos Ren e Yang Ming','Gua Sha nas costas para mover qi estagnado'],
    otherTherapies: ['Soroterapia com complexo B + vitamina C','Cromoterapia com cor laranja e amarela','Auriculoterapia pontos adrenais']
  },

  'tireoide_hipotireoidismo': {
    title: 'Hipotireoidismo / Disfunção Tireoidiana',
    suggestions: ['Investigar TSH, T3 livre, T4 livre, anti-TPO (Hashimoto)','Eliminar glúten e lactose (protocolo autoimune tireoidiano)','Evitar goitrogênios crus em excesso (couve, brócolis cru)','Suporte mitocondrial essencial'],
    foods: ['Castanha do Pará (1-2/dia para selênio)', 'Algas marinhas (iodo)', 'Ovos', 'Peixe', 'Frango orgânico'],
    supplements: [
      'Selênio (selenometionina) - Dose: 100-200mcg | Posologia: 1x/dia com refeição | Fonte: Toulis KA, et al. Thyroid. 2010;20(10):1163-73',
      'Zinco quelado - Dose: 20-40mg | Posologia: à noite com refeição | Fonte: Nishiyama S, et al. J Am Coll Nutr. 1994;13(1):62-7',
      'Vitamina D3 - Dose: 5000-10000 UI | Posologia: pela manhã com alimento gorduroso | Fonte: Mazokopakis EE, et al. Hormones. 2015',
      'Iodo + Iodeto de potássio (Lugol) - Dose: 12,5mg | Posologia: 1-2 gotas/dia diluídas em água (protocolo médico) | Fonte: Brownstein D. Iodine: Why you need it. 2009',
      'Tirosina L - Dose: 500mg | Posologia: em jejum pela manhã | Fonte: Kelly GS. Altern Med Rev. 1999;4(2):120-30'
    ],
    herbs: [
      'Ashwagandha (Withania somnifera) - Dose: 600mg/dia | Posologia: 2x/dia com refeições | Fonte: Sharma AK, et al. J Altern Complement Med. 2018;24(3):243-248',
      'Guggulu (Commiphora mukul) - Dose: 25mg guggulesteronas | Posologia: 3x/dia | Fonte: Panda S, Kar A. J Ethnopharmacol. 2005;100(3):233-7',
      'Bacopa monnieri - Dose: 300mg extrato | Posologia: 2x/dia com refeições | Fonte: Goswami SK, et al. J Herb Med. 2016'
    ],
    homeopathy: ['Thyroidinum 30CH – suporte tireoidiano direto','Calcarea carbonica 30CH – hipotireoidismo com ganho de peso','Sepia 30CH – Hashimoto em mulheres','Graphites 30CH – ressecamento e lentidão metabólica'],
    quantumFlorals: ['Wild Rose – resignação e letargia','Hornbeam – cansaço matinal','Gentian – desânimo após dificuldades'],
    hydrotherapy: ['Compressas frias no pescoço (região da tireoide)','Banho de imersão quente seguido de ducha fria'],
    geotherapy: ['Argila verde no pescoço por 20min, 2x/dia'],
    tcm: ['Acupuntura: VC17, IG4, E36, BP6','Massagem na região cervical anterior'],
    otherTherapies: ['Iridologia: detectar sinais de insuficiência tireoidiana','Ozônio intravascular (protocolo médico)','Yoga e meditação para redução de cortisol']
  },

  'menopausa': {
    title: 'Menopausa / Climatério / Fogachos',
    suggestions: ['Fitoestrógenos naturais: soja fermentada, linhaça, trevo vermelho','Exercícios com carga para preservar ossos','Gerenciar estresse e regular cortisol','Reposição hormonal natural (discutir com médico)'],
    foods: ['Soja fermentada (missô, tofu)', 'Linhaça moída', 'Trevo vermelho', 'Inhame', 'Romã', 'Salsa'],
    supplements: [
      'Isoflavonas de soja - Dose: 40-80mg/dia | Posologia: 2x/dia com refeições | Fonte: Lethaby A, et al. Cochrane Database Syst Rev. 2007',
      'Cálcio + Vitamina D3 - Dose: 1000-1200mg Ca + 2000 UI D3 | Posologia: dividido em 2 doses | Fonte: Weaver CM. Am J Clin Nutr. 2006',
      'Magnésio glicinato - Dose: 400mg | Posologia: à noite | Fonte: Facchinetti F, et al. Gynecol Endocrinol. 1991',
      'Ômega-3 EPA/DHA - Dose: 2000-3000mg | Posologia: com refeições | Fonte: Lucas M, et al. Menopause. 2009',
      'DHEA - Dose: 5-25mg (médico) | Posologia: pela manhã | Fonte: Davis SR, et al. NEJM. 2015;372(17):1625-33'
    ],
    herbs: [
      'Cimicifuga (Actaea racemosa / Black Cohosh) - Dose: 40-80mg extrato | Posologia: 2x/dia | Fonte: Shams T, et al. Maturitas. 2010;67(4):308-16',
      'Dong Quai (Angelica sinensis) - Dose: 500-1000mg | Posologia: 2-3x/dia | Fonte: American Family Physician 2001',
      'Trevo vermelho (Trifolium pratense) - Dose: 40-160mg isoflavonas | Posologia: 2x/dia | Fonte: Krebs EE, et al. Obstet Gynecol. 2004',
      'Sálvia (Salvia officinalis) - Dose: 300-600mg extrato | Posologia: 2x/dia | Fonte: Bommer S, et al. Adv Ther. 2011;28(6):490-500'
    ],
    homeopathy: ['Lachesis 30CH – fogachos, irritabilidade','Sepia 200CH – ressecamento vaginal, frieza','Pulsatilla 30CH – fogachos com melancolia','Sulphur 30CH – calor com rubor'],
    quantumFlorals: ['Walnut – transição de fase','Impatiens – irritabilidade e fogachos','Scleranthus – instabilidade emocional','Holly – raiva e intolerância'],
    hydrotherapy: ['Ducha fria na nuca e costas para fogachos','Banho de assento frio 2x/semana','Compressas frias em momentos de calor'],
    geotherapy: ['Banho de sol para vitamina D','Argila branca em máscaras corporais'],
    tcm: ['Acupuntura: R3 (Taixi), BP6, VC4 – efeito hormonal comprovado','Moxa suave em VC4 para deficiência de yang do rim'],
    otherTherapies: ['Terapia hormonal bioidêntica (compounding)','Reflexologia podal zona endócrina','Soroterapia com magnésio + vitaminas B']
  },

  'sop': {
    title: 'Síndrome do Ovário Policístico (SOP)',
    suggestions: ['Dieta de baixo índice glicêmico','Controle de insulina como base do tratamento','Exercícios aeróbicos 4-5x/semana','Redução de gordura abdominal'],
    foods: ['Vegetais folhosos', 'Proteínas magras', 'Gorduras boas (abacate, azeite)', 'Berries', 'Sementes de abóbora'],
    supplements: [
      'Inositol (mio-inositol + D-chiro-inositol 40:1) - Dose: 2-4g mio + 50-100mg D-chiro | Posologia: 2x/dia em jejum | Fonte: Unfer V, et al. Gynecol Endocrinol. 2012;28(3):169-73',
      'Ácido alfa-lipóico - Dose: 300-600mg | Posologia: 30min antes das refeições | Fonte: Genazzani AD, et al. Gynecol Endocrinol. 2011',
      'N-Acetilcisteína (NAC) - Dose: 1200-1800mg | Posologia: 3x/dia | Fonte: Thakker D, et al. J Ovarian Res. 2015',
      'Cromo picolinato - Dose: 200-1000mcg | Posologia: com refeições | Fonte: Lydic ML, et al. Fertil Steril. 2006;86(1):243-6',
      'Vitamina D3 - Dose: 5000 UI | Posologia: diário | Fonte: Muscogiuri G, et al. Gynecol Endocrinol. 2012'
    ],
    herbs: [
      'Canela (Cinnamomum verum) - Dose: 1-3g/dia | Posologia: chá ou cápsulas com refeições | Fonte: Kort DH, Lobo RA. Am J Obstet Gynecol. 2014',
      'Tribulus terrestris - Dose: 500-1500mg | Posologia: 2-3x/dia | Fonte: Shohreh JM, et al. Complement Ther Med. 2017',
      'Vitex agnus-castus - Dose: 4mg extrato | Posologia: 1x/dia pela manhã em jejum | Fonte: Loch EG, et al. Gynecol Endocrinol. 2000',
      'Berberina - Dose: 1000-1500mg | Posologia: 3x/dia com refeições | Fonte: Tang LQ, et al. Eur J Endocrinol. 2006'
    ],
    homeopathy: ['Pulsatilla 30CH – ciclos irregulares, personalidade dócil','Sepia 200CH – apatia, irregularidade hormonal','Lachesis 30CH – pletórica, sensível ao calor','Natrum muriaticum 30CH – retração e irregularidade'],
    quantumFlorals: ['Scleranthus – irregularidade e instabilidade','Walnut – desequilíbrio hormonal','Wild Oat – confusão sobre direção de vida'],
    hydrotherapy: ['Banho de assento morno com ervas (sálvia, alecrim)','Compressas quentes no abdômen inferior'],
    geotherapy: ['Argila verde sobre ovários 30min/dia'],
    tcm: ['Acupuntura: BP6, VC4, R3, E36 – regulação hormonal','Fitoterapia: Gui Zhi Fu Ling Wan – protocolo para cistos ovarianos'],
    otherTherapies: ['Reflexologia zona ovariana','Acupuntura de auriculoterapia','Cromoterapia laranja para sistema reprodutor']
  },

  'tpm_dismenorreia': {
    title: 'TPM / Tensão Pré-Menstrual / Cólica Menstrual',
    suggestions: ['Reduzir sal, cafeína e açúcar na fase lútea','Aumentar magnésio e vitamina B6','Exercícios regulares reduzem sintomas em 50%','Gerenciar estresse (eleva prostaglandinas inflamatórias)'],
    foods: ['Abacate', 'Banana', 'Sementes de abóbora', 'Espinafre', 'Salmão', 'Frutas vermelhas'],
    supplements: [
      'Magnésio bisglicinato - Dose: 400-600mg | Posologia: à noite nos 10 dias antes da menstruação | Fonte: Facchinetti F, et al. Obstet Gynecol. 1991;78(2):177-81',
      'Vitamina B6 (piridoxina/P-5-P) - Dose: 50-100mg | Posologia: 2x/dia | Fonte: Wyatt KM, et al. BMJ. 1999;318(7195):1375-81',
      'Ômega-3 EPA/DHA - Dose: 2-3g | Posologia: diário com refeição | Fonte: Harel Z, et al. Am J Obstet Gynecol. 1996',
      'Cálcio carbonato - Dose: 1000-1200mg | Posologia: dividido em 2 doses | Fonte: Thys-Jacobs S, et al. Am J Obstet Gynecol. 1998'
    ],
    herbs: [
      'Vitex agnus-castus - Dose: 4mg extrato | Posologia: 1x/dia pela manhã em jejum por 3 meses | Fonte: Schellenberg R. BMJ. 2001;322:134',
      'Gengibre (Zingiber officinale) - Dose: 500-1500mg | Posologia: 3x/dia nos primeiros dias da menstruação | Fonte: Ozgoli G, et al. J Altern Complement Med. 2009',
      'Camomila (Matricaria chamomilla) - Dose: 3-5g/xícara | Posologia: chá 3x/dia | Fonte: Jenabi E, Ebrahimzadeh S. J Pak Med Assoc. 2010',
      'Dong Quai (Angelica sinensis) - Dose: 1000mg | Posologia: 2x/dia na fase lútea | Fonte: Zhu DP. Altern Ther Health Med. 1998'
    ],
    homeopathy: ['Magnesia phosphorica 30CH – cólica melhorada com calor','Colocynthis 6CH – dor espasmódica intensa','Pulsatilla 30CH – cólica com náusea e instabilidade','Lachesis 30CH – TPM grave, irritabilidade'],
    quantumFlorals: ['Impatiens – irritabilidade e tensão','Crab Apple – inchaço e toxinas','Beech – intolerância aumentada','Cherry Plum – perda de controle emocional'],
    hydrotherapy: ['Compressa quente no abdômen inferior na fase de cólica','Banho de imersão quente com lavanda','Banho de pés quentes para desviar circulação'],
    geotherapy: ['Argila quente no abdômen inferior por 30min'],
    tcm: ['Acupuntura: BP6, BP10, VC3, VC4, R14','Moxa em VC4 e BP6','Fitoterapia: Xiao Yao San – distúrbios emocionais e menstruais'],
    otherTherapies: ['Reflexologia zona uterina e ovariana','Massagem abdominal com óleo essencial de lavanda','Aromaterapia calmante']
  },

  'baixa_testosterona': {
    title: 'Baixa Testosterona / Andropausa / Disfunção Erétil',
    suggestions: ['Exercícios com carga (aumentam testosterona)','Sono de qualidade (pico de testosterona à noite)','Reduzir estresse e cortisol','Perder gordura abdominal (converte testosterona em estrogênio)'],
    foods: ['Ovos integrais', 'Carne vermelha magra', 'Ostras (zinco)', 'Castanha do Pará', 'Brócolis', 'Romã'],
    supplements: [
      'Zinco quelado - Dose: 30-60mg | Posologia: à noite com refeição | Fonte: Kilic M, et al. J Neuroendocrinol. 2010;22(7):745-50',
      'Vitamina D3 - Dose: 5000-10000 UI | Posologia: pela manhã | Fonte: Pilz S, et al. Horm Metab Res. 2011;43(3):223-5',
      'Magnésio glicinato - Dose: 400mg | Posologia: antes de dormir | Fonte: Cinar V, et al. Biol Trace Elem Res. 2011',
      'DHEA - Dose: 25-50mg (com acompanhamento médico) | Posologia: pela manhã | Fonte: Morales AJ, et al. J Clin Endocrinol Metab. 1994',
      'Boron (boro) - Dose: 6-10mg | Posologia: 1x/dia | Fonte: Naghii MR, et al. J Trace Elem Med Biol. 2011'
    ],
    herbs: [
      'Tribulus terrestris - Dose: 500-1500mg extrato (protodioscina 40%) | Posologia: 2-3x/dia | Fonte: Roaiah MF, et al. J Sex Med. 2016',
      'Ashwagandha (Withania somnifera) - Dose: 600mg KSM-66 | Posologia: 2x/dia | Fonte: Wankhede S, et al. J Int Soc Sports Nutr. 2015;12:43',
      'Maca peruana (Lepidium meyenii) - Dose: 1500-3000mg | Posologia: 2x/dia com refeições | Fonte: Gonzales GF. Evid Based Complement Alternat Med. 2012',
      'Ginseng coreano (Panax ginseng) - Dose: 900-3000mg | Posologia: 2-3x/dia | Fonte: Kim TH, et al. Int J Impot Res. 2009;21(4):268-74'
    ],
    homeopathy: ['Agnus castus 30CH – impotência e falta de desejo','Lycopodium 200CH – ansiedade de performance','Selenium 30CH – fraqueza sexual e física','Baryta carbonica 30CH – andropausa precoce'],
    quantumFlorals: ['Larch – falta de confiança','Wild Rose – apatia sexual','Mimulus – medo de não performar','Elm – sobrecarga e responsabilidade'],
    hydrotherapy: ['Banho de assento frio alternado (estimula testículos)','Ducha fria escrotal matinal 30-60s','Banho de imersão quente + frio alternado'],
    geotherapy: ['Exposição solar ao corpo inteiro (vitamina D e testosterona)'],
    tcm: ['Acupuntura: R3, VC4, B23 (Shenshu)','Moxa tonificante','Fitoterapia: You Gui Wan – tonifica yang do rim'],
    otherTherapies: ['Biohacking: sauna + banho frio','Terapia com luz vermelha (red light therapy)','Jejum intermitente 16:8']
  },

  'imunidade_baixa': {
    title: 'Imunidade Baixa / Infecções Recorrentes',
    suggestions: ['Dormir 7-9h (produção de citocinas imunes)','Reduzir açúcar (suprime neutrófilos por horas)','Expor ao sol diariamente','Gerenciar estresse crônico (supressor imune número 1)'],
    foods: ['Alho cru', 'Gengibre', 'Cúrcuma', 'Frutas cítricas', 'Kefir', 'Cogumelos shiitake/shimeji', 'Própolis'],
    supplements: [
      'Vitamina D3 - Dose: 5000-10000 UI | Posologia: diário com alimento gorduroso | Fonte: Aranow C. J Investig Med. 2011;59(6):881-6',
      'Vitamina C (ácido ascórbico) - Dose: 1000-3000mg | Posologia: dividido em 3x/dia | Fonte: Carr AC, Maggini S. Nutrients. 2017;9(11):1211',
      'Zinco picolinato - Dose: 25-50mg | Posologia: com refeição, à noite | Fonte: Hemilä H. BMJ Open. 2017',
      'Probióticos multistrain - Dose: 30-50 bilhões UFC | Posologia: em jejum | Fonte: Hao Q, et al. Cochrane Database Syst Rev. 2015',
      'Beta-glucanas (aveia ou cogumelos) - Dose: 500-1000mg | Posologia: 2x/dia | Fonte: Vetvicka V, Vetvickova J. Ann Transl Med. 2015'
    ],
    herbs: [
      'Equinácea (Echinacea purpurea) - Dose: 900mg extrato | Posologia: 3x/dia por 7-10 dias | Fonte: Karsch-Völk M, et al. Cochrane Database Syst Rev. 2015',
      'Própolis verde (própolis brasileiro) - Dose: 400-500mg extrato | Posologia: 2x/dia | Fonte: Sforcin JM. J Ethnopharmacol. 2007;113(1):1-14',
      'Sabugueiro (Sambucus nigra) - Dose: 600mg extrato | Posologia: 4x/dia na fase aguda | Fonte: Zakay-Rones Z, et al. J Int Med Res. 2004;32(2):132-40',
      'Astragalus (Astragalus membranaceus) - Dose: 3-6g | Posologia: 2-3x/dia | Fonte: Cho WC, Leung KN. Int Immunopharmacol. 2007'
    ],
    homeopathy: ['Thuya occidentalis 30CH – infecções recorrentes, vacinas','Silicea 30CH – defesa lenta, cicatrização difícil','Calcarea carbonica 30CH – criança/adulto imunodeprimido','Sulphur 30CH – infecções crônicas de pele e mucosas'],
    quantumFlorals: ['Crab Apple – infecções e toxinas','Walnut – adaptação e proteção','Wild Rose – vitalidade e resistência','Olive – recuperação após doença'],
    hydrotherapy: ['Ducha escocesa (quente/frio) para estimular imunidade','Banho de vapor com eucalipto','Imersão em água fria curta (hormese imune)'],
    geotherapy: ['Banho de sol 20min/dia, expondo tronco e membros'],
    tcm: ['Acupuntura: IG4, E36, BP6 – pontos imunológicos clássicos','Moxa no E36 para Wei Qi (imunidade da superfície)','Fitoterapia: Jade Windscreen (Yu Ping Feng San)'],
    otherTherapies: ['Soroterapia vitamina C endovenosa (>10g)','Ozonioterapia','Transfer factor (fatores de transferência)']
  },

  'candidiase': {
    title: 'Candidíase / Disbiose por Candida',
    suggestions: ['Dieta anticandida: eliminar açúcar, farináceos brancos, álcool','Alho cru diário (aliicina antifúngica)','Probióticos específicos (Saccharomyces boulardii)','Tratar o intestino como fonte primária'],
    foods: ['Alho cru', 'Óleo de coco', 'Cúrcuma', 'Orégano', 'Vegetais sem amido', 'Proteínas magras'],
    supplements: [
      'Saccharomyces boulardii - Dose: 5-10 bilhões UFC | Posologia: 2x/dia longe dos antibióticos | Fonte: Szajewska H, Mrukowicz J. Aliment Pharmacol Ther. 2005',
      'Ácido caprílico - Dose: 500-1000mg | Posologia: 3x/dia com refeições | Fonte: Omura Y, et al. Acupunct Electrother Res. 1996',
      'Berberina - Dose: 500mg | Posologia: 3x/dia com refeições | Fonte: Han J, et al. J Microbiol. 2013',
      'N-Acetilcisteína (NAC) - Dose: 600-1800mg | Posologia: 2-3x/dia | Fonte: Stanzani G, et al. Antimicrob Agents Chemother. 2017',
      'Óleo de orégano (carvacrol >80%) - Dose: 200-400mg | Posologia: 3x/dia longe das refeições | Fonte: Manohar V, et al. Mol Cell Biochem. 2001'
    ],
    herbs: [
      'Orégano (Origanum vulgare) - Dose: 200mg extrato (carvacrol 80%) | Posologia: 3x/dia | Fonte: Nostro A, et al. Lett Appl Microbiol. 2004',
      'Alho (Allium sativum) — extrato envelhecido - Dose: 1200mg/dia | Posologia: 3x/dia | Fonte: Guo NL, et al. Mycoses. 2010;53(3):264-73',
      'Pau d\'arco (Tabebuia avellanedae) - Dose: 3-6g/xícara | Posologia: chá 3x/dia | Fonte: Quiroga EN, et al. Microbiol Res. 2006;161(4):289-95',
      'Tea tree (Melaleuca alternifolia) — uso tópico vaginal | Posologia: óvulo ou creme | Fonte: Mondello F, et al. J Antimicrob Chemother. 2003'
    ],
    homeopathy: ['Candida albicans 30CH – nosódio específico','Sepia 30CH – candidíase vaginal recorrente','Medorrhinum 30CH – corrimento crônico','Silicea 30CH – imunidade debilitada'],
    quantumFlorals: ['Crab Apple – purificação profunda','Walnut – proteção contra agentes externos'],
    hydrotherapy: ['Banho de assento com vinagre de maçã (1L água + 2 colheres)','Ducha vaginal com chá de calêndula'],
    geotherapy: ['Argila branca em cataplasma vaginal externo'],
    tcm: ['Acupuntura: BP6, R7, VC3 – umidade e calor no Jiao Inferior'],
    otherTherapies: ['Óleo de coco fracionado — aplicação tópica','Ácido bórico — supositório (com prescrição)','Luz UV vaginal (protocolo clínico)']
  },

  'artrite_artralgia': {
    title: 'Artrite / Artrose / Dores Articulares',
    suggestions: ['Anti-inflamatório alimentar: eliminar açúcar, óleos vegetais refinados','Ômega-3 é o anti-inflamatório natural mais eficaz','Manter atividade física de baixo impacto (agua, bike, alongamento)','Manter peso adequado (cada kg extra = 4kg nas joelhos)'],
    foods: ['Cúrcuma + pimenta preta', 'Salmão', 'Sardinha', 'Gengibre', 'Frutas vermelhas', 'Brócolis', 'Nozes'],
    supplements: [
      'Ômega-3 EPA/DHA - Dose: 3000-5000mg | Posologia: com refeições 3x/dia | Fonte: Goldberg RJ, Katz J. Pain. 2007;129(1-2):210-23',
      'Colágeno tipo II não desnaturado (UC-II) - Dose: 40mg | Posologia: em jejum pela manhã | Fonte: Crowley DC, et al. Int J Med Sci. 2009;6(6):312-21',
      'Curcumina (Curcuma longa BCM-95) - Dose: 1000-2000mg | Posologia: 2x/dia com refeição | Fonte: Belcaro G, et al. Altern Med Rev. 2010;15(4):337-44',
      'Glucosamina + Condroitina - Dose: 1500mg + 1200mg | Posologia: 1x/dia com refeição | Fonte: Clegg DO, et al. N Engl J Med. 2006;354(8):795-808',
      'Boswellia serrata (AKBA >30%) - Dose: 300-500mg | Posologia: 3x/dia | Fonte: Sander O, et al. Phytomedicine. 1998;5(6):425-34'
    ],
    herbs: [
      'Arnica montana (tópico) - Dose: gel 15-25% | Posologia: aplicar 2-3x/dia | Fonte: Knuesel O, et al. Adv Ther. 2002;19(5):209-18',
      'Harpagófito (Harpagophytum procumbens) - Dose: 600-1200mg | Posologia: 3x/dia com água | Fonte: Chrubasik S, et al. Phytomedicine. 2002;9(3):181-94',
      'Salgueiro (Salix alba) - Dose: 120-240mg salicina | Posologia: 2x/dia | Fonte: Schmid B, et al. Am J Med. 2001;109(1):9-14',
      'Gengibre (Zingiber officinale) - Dose: 1000-2000mg extrato | Posologia: 2-3x/dia | Fonte: Altman RD, Marcussen KC. Arthritis Rheum. 2001;44(11):2531-8'
    ],
    homeopathy: ['Rhus toxicodendron 6CH – piora no repouso, melhora no movimento','Bryonia 6CH – piora no movimento, melhora em repouso','Arnica 30CH – traumatismo, contusão','Calcarea fluorica 30CH – nódulos e osteofitos'],
    quantumFlorals: ['Oak – resistência e força','Impatiens – resistência a dores','Willow – ressentimento e rigidez emocional'],
    hydrotherapy: ['Banho de imersão quente com sal de Epsom 20min','Contraste frio/quente nas articulações afetadas','Compressas de argila verde nas articulações'],
    geotherapy: ['Argila verde com ervas anti-inflamatórias nas articulações dolorosas'],
    tcm: ['Acupuntura: VB34, E36, BP9, pontos locais','Ventosas sobre grandes articulações','Moxa para artrite fria (melhorada pelo calor)'],
    otherTherapies: ['Ozonioterapia intra-articular (médico)','Infiltração de plasma rico em plaquetas (PRP)','Magnetoterapia']
  },

  'osteoporose': {
    title: 'Osteoporose / Osteopenia / Fragilidade Óssea',
    suggestions: ['Exercícios com carga 3x/semana (estímulo osteogênico)','Sol diário para síntese de vitamina D','Eliminar tabaco e álcool (destroem matriz óssea)','Proteína adequada na dieta (1,2g/kg/dia)'],
    foods: ['Sardinha com ossos', 'Leite/iogurte orgânico', 'Couve', 'Brócolis', 'Gergelim', 'Tofu', 'Amêndoas'],
    supplements: [
      'Cálcio bisglicinate - Dose: 500-1000mg | Posologia: dividido em 2 doses, com refeição | Fonte: Weaver CM, et al. Am J Clin Nutr. 2006',
      'Vitamina D3 + K2-MK7 - Dose: 5000 UI D3 + 200mcg K2 | Posologia: 1x/dia com alimento gorduroso | Fonte: Iwamoto J, et al. Yonsei Med J. 2009;50(1):22-9',
      'Magnésio glicinato - Dose: 400-800mg | Posologia: dividido em 2 doses | Fonte: Rude RK, et al. J Am Coll Nutr. 2009',
      'Silício orgânico - Dose: 30-50mg | Posologia: 2x/dia | Fonte: Jugdaohsingh R, et al. J Nutr Health Aging. 2004',
      'Estriol (bioidêntico) - Dose: conforme prescrição médica | Fonte: Gambacciani M, et al. Maturitas. 2001'
    ],
    herbs: [
      'Cavalinha (Equisetum arvense) — silício - Dose: 5-6g/xícara | Posologia: chá 3x/dia | Fonte: Carneiro DM, et al. Phytother Res. 2014',
      'Urtiga (Urtica dioica) — cálcio e ferro - Dose: 3-5g/xícara | Posologia: chá 3x/dia | Fonte: European Medicines Agency HMPC Monograph 2012',
      'Dong Quai (Angelica sinensis) — hormonal feminino - Dose: 1000mg | Posologia: 2x/dia | Fonte: Bone K. Phytother Rev 2003'
    ],
    homeopathy: ['Calcarea phosphorica 30CH – fratura lenta, crescimento','Silicea 30CH – fragilidade óssea, unhas fracas','Symphytum 30CH – consolidação de fraturas','Calcarea fluorica 30CH – osteofitos e deformidades'],
    quantumFlorals: ['Rock Water – rigidez e resistência','Oak – força e resistência'],
    hydrotherapy: ['Banho de sol 20-30min diários','Exercício aquático para preservar ossos sem impacto'],
    geotherapy: ['Argila branca com cavalinha em cataplasma'],
    tcm: ['Acupuntura: R3, B11 (Dazhu — ponto dos ossos), VC4','Moxa para tonificar Rim (governa ossos na MTC)'],
    otherTherapies: ['Densitometria óssea anual','Vibração mecânica (plataforma vibratória)','Biofeedback para postura']
  },

  'acne': {
    title: 'Acne / Pele Oleosa / Dermatite',
    suggestions: ['Eliminar laticínios e açúcar (principais triggers dietéticos)','Dieta de baixo índice glicêmico','Lavar o rosto apenas 2x/dia','Tratar intestino (eixo intestino-pele)'],
    foods: ['Vegetais folhosos', 'Peixes', 'Nozes', 'Frutas vermelhas', 'Abóbora (zinco)', 'Cenoura (betacaroteno)'],
    supplements: [
      'Zinco picolinato - Dose: 30-60mg | Posologia: à noite com refeição | Fonte: Dreno B, et al. Br J Dermatol. 2005;153(3):521-3',
      'Vitamina A (retinol natural) - Dose: 5000-10000 UI | Posologia: com refeição gordurosa | Fonte: Thielitz A, Gollnick H. Dermatology. 2008;216(3):220-7',
      'Ômega-3 EPA/DHA - Dose: 2000-3000mg | Posologia: com refeições | Fonte: Khayef G, et al. Lipids Health Dis. 2012',
      'Probióticos (L. acidophilus, B. bifidum) - Dose: 20-50 bilhões UFC | Posologia: em jejum | Fonte: Fabbrocini G, et al. Benef Microbes. 2016',
      'Nicotinamida (vitamina B3) tópica 4% | Posologia: aplicar 2x/dia | Fonte: Draelos ZD, et al. Dermatol Surg. 2006'
    ],
    herbs: [
      'Bardana (Arctium lappa) - Dose: 2-4g/xícara | Posologia: chá 3x/dia | Fonte: Grases F, et al. Phytother Res. 1994',
      'Tea tree (Melaleuca alternifolia) 5% gel tópico | Posologia: aplicar à noite | Fonte: Enshaieh S, et al. Indian J Dermatol Venereol Leprol. 2007',
      'Calêndula (Calendula officinalis) — tópica | Posologia: gel ou pomada 2x/dia | Fonte: European Medicines Agency HMPC 2008',
      'Romã (Punica granatum) - Dose: 400mg extrato | Posologia: 2x/dia | Fonte: Bakkali F, et al. Food Chem Toxicol. 2008'
    ],
    homeopathy: ['Sulfur 30CH – acne inflamada, pele gordurosa','Pulsatilla 30CH – acne hormonal em mulheres','Silicea 30CH – espinhas encistadas','Kali bromatum 30CH – acne pustulosa'],
    quantumFlorals: ['Crab Apple – vergonha e purificação','Holly – raiva internalizada'],
    hydrotherapy: ['Vapor facial com ervas (camomila, calêndula)','Compressas de argila branca no rosto','Banho de sol 15min para vitamina D e bacteriostático'],
    geotherapy: ['Máscara de argila branca/verde 2x/semana'],
    tcm: ['Acupuntura: IG4 (ponto pele e imunidade), E44, BP10','Dieta sem umidade-calor (laticínios, frituras, álcool)'],
    otherTherapies: ['Luz LED azul (fotodinâmica)','Peeling químico suave (AHA/BHA)','Microagulhamento para cicatrizes']
  },

  'queda_cabelo': {
    title: 'Queda de Cabelo / Alopecia / Cabelos Fracos',
    suggestions: ['Investigar: ferro, vitamina D, zinco, TSH, hormônios','Proteína adequada na dieta (cabelo é queratina)','Reduzir estresse (telogen effluvium)','Cuidados com couro cabeludo'],
    foods: ['Ovos', 'Espinafre', 'Salmão', 'Sementes de abóbora', 'Castanhas', 'Feijão'],
    supplements: [
      'Biotina - Dose: 2000-5000mcg | Posologia: 1x/dia com refeição | Fonte: Patel DP, et al. Skin Appendage Disord. 2017;3(3):166-9',
      'Ferro bisglicinate - Dose: 18-36mg | Posologia: em jejum com vitamina C | Fonte: Rushton DH. Clin Exp Dermatol. 2002;27(5):396-404',
      'Vitamina D3 - Dose: 5000 UI | Posologia: com alimento gorduroso | Fonte: Rasheed H, et al. Skin Pharmacol Physiol. 2013',
      'Zinco quelado - Dose: 25-50mg | Posologia: à noite | Fonte: Karashima T, et al. Acta Derm Venereol. 2012',
      'Complexo B (B7+B12+B5) - Dose: conforme rótulo | Posologia: pela manhã | Fonte: Zempleni J, et al. Biofactors. 2009'
    ],
    herbs: [
      'Saw palmetto (Serenoa repens) - Dose: 320mg extrato | Posologia: 2x/dia | Fonte: Rossi A, et al. J Int Med Res. 2012;40(5):1823-32',
      'Cavalinha (Equisetum arvense) — silício orgânico - Dose: 5g/xícara | Posologia: chá 3x/dia | Fonte: European Medicines Agency HMPC 2012',
      'Cebola (uso tópico) — suco aplicado no couro cabeludo | Posologia: 2x/dia por 8 semanas | Fonte: Sharquie KE, Al-Obaidi HK. J Dermatol. 2002',
      'Aloe vera — uso tópico no couro cabeludo | Posologia: aplicar e massagear 3x/semana | Fonte: Surjushe A, et al. Indian J Dermatol. 2008'
    ],
    homeopathy: ['Phosphorus 30CH – queda difusa','Silicea 30CH – cabelos fracos e unhas quebradas','Natrum muriaticum 30CH – queda após luto ou estresse','Sepia 30CH – queda hormonal em mulheres'],
    quantumFlorals: ['Walnut – mudanças e transições','Wild Rose – resignação','Larch – falta de confiança'],
    hydrotherapy: ['Massagem capilar com água fria para estimular circulação','Banho de ervas (alecrim, urtiga) no couro cabeludo'],
    geotherapy: ['Argila verde como máscara capilar 2x/semana'],
    tcm: ['Acupuntura: R3, VG20 (Baihui), BP6','Moxa no VG20 para estímulo capilar','Gua Sha no couro cabeludo'],
    otherTherapies: ['Microagulhamento capilar (dermaroller 0,5mm)','LED vermelho capilar','Plasma rico em plaquetas (PRP) capilar']
  },

  'carencia_vitamina_d': {
    title: 'Deficiência de Vitamina D / Síndrome Carencial D',
    suggestions: ['Exposição solar de 15-30min/dia (tronco e membros)','Alimentos ricos: sardinha, salmão, gema de ovo, cogumelos (UV)','Suplementação é necessária para a maioria dos brasileiros','Meta: 60-80 ng/mL de 25(OH)D3'],
    foods: ['Sardinha em lata', 'Salmão', 'Atum', 'Gema de ovo', 'Cogumelos expostos ao sol'],
    supplements: [
      'Vitamina D3 (colecalciferol) - Dose: 5000-10000 UI/dia | Posologia: 1 cápsula pela manhã com alimento gorduroso | Fonte: Holick MF. N Engl J Med. 2007;357(3):266-81',
      'Vitamina K2 MK-7 - Dose: 100-200mcg | Posologia: junto com D3 | Fonte: Maresz K. Integr Med. 2015;14(1):34-9',
      'Magnésio (cofator da D3) - Dose: 300-400mg | Posologia: à noite | Fonte: Uwitonze AM, Razzaque MS. J Am Osteopath Assoc. 2018'
    ],
    herbs: ['Exposição solar > suplementação herbal para vitamina D'],
    homeopathy: ['Calcarea phosphorica 30CH – raquitismo, fraqueza óssea','Calcarea carbonica 30CH – obesidade com deficiência de D','Silicea 30CH – baixa imunidade e ossos fracos'],
    quantumFlorals: ['Mustard – tristeza sem causa (associada a D baixa)','Gentian – desencorajamento'],
    hydrotherapy: ['Banho de sol diário, preferência entre 10-12h para UVB','Banho morno ao ar livre sempre que possível'],
    geotherapy: ['Heliote rapia – exposição solar terapêutica programada'],
    tcm: ['Tonificar Yang do Rim (governa ossos e vitamina D no conceito MTC)'],
    otherTherapies: ['Dosagem 25(OH)D3 a cada 3 meses até atingir meta','Vitamina D em megadose (Stoss therapy) para casos graves']
  },

  'carencia_magnesio': {
    title: 'Deficiência de Magnésio / Hipomagnesemia',
    suggestions: ['Magnésio é co-fator de 300+ enzimas','Estresse, cafeína e álcool esgotam magnésio','Solo pobre em magnésio = alimentos deficientes','Priorizar forma quelada (bisglicinato, treonato, malato)'],
    foods: ['Castanha do Pará', 'Amêndoas', 'Sementes de abóbora', 'Espinafre', 'Chocolate amargo >70%', 'Avocado'],
    supplements: [
      'Magnésio bisglicinato - Dose: 400-600mg | Posologia: 200mg 2-3x/dia, principal dose à noite | Fonte: Abbasi B, et al. J Res Med Sci. 2012',
      'Magnésio treonato (Magtein) - Dose: 2000mg | Posologia: 3 cápsulas/dia (1 manhã + 2 noite) | Fonte: Liu G, et al. J Alzheimers Dis. 2016',
      'Magnésio malato - Dose: 400-600mg | Posologia: 2x/dia com refeições | Fonte: Abraham GE, et al. J Nutr Med. 1992'
    ],
    herbs: ['Magnésio vem de alimentos, não de ervas específicas; suplementação direta é prioritária'],
    homeopathy: ['Magnesia phosphorica 30CH – câimbras, espasmos, cólicas','Magnesia carbonica 30CH – nervosismo e agitação','Magnesia muriatica 30CH – disfunção hepática + deficiência de Mg'],
    quantumFlorals: ['Impatiens – tensão e espasmos','White Chestnut – pensamentos acelerados (Mg cerebral)'],
    hydrotherapy: ['Banho de imersão com sal de Epsom (MgSO4): 2 xícaras em banheira por 20min','Compressas de Epsom em cãibras locais'],
    geotherapy: ['Sal de Epsom tópico'],
    tcm: ['Magnésio relacionado ao elemento Madeira – fígado e tendões na MTC'],
    otherTherapies: ['Magnésio IV para casos graves (hospitalar)','Spray de magnésio transdérmico','Monitorar: magnésio sérico e eritrocitário']
  },

  'carencia_zinco': {
    title: 'Deficiência de Zinco / Hipocinquemia',
    suggestions: ['Zinco essencial para imunidade, pele, fertilidade e hormônios','Fitato dos grãos inibe absorção: preferir remolho','Vegetarianos em maior risco','Suplementar com refeição para evitar náuseas'],
    foods: ['Ostras (maior fonte)', 'Carne bovina', 'Sementes de abóbora', 'Castanha de caju', 'Ovo', 'Leguminosas remolhadas'],
    supplements: [
      'Zinco picolinato ou bisglicinato - Dose: 25-50mg | Posologia: à noite com refeição (não com cafeína/ferro) | Fonte: Prasad AS. J Am Coll Nutr. 2009;28(3):257-65',
      'Zinco + cobre (manter proporção 10:1) - importante para não criar deficiência de cobre | Fonte: Prohaska JR, et al. J Nutr. 2003'
    ],
    herbs: ['Não há ervas ricas em zinco biodisponível — suplementação direta é indicada'],
    homeopathy: ['Zincum metallicum 6CH – agitação, espasmos, exaustão nervosa','Zincum valerianicum 6CH – inquietação e agitação'],
    quantumFlorals: ['Larch – confiança e imunidade','Wild Rose – vitalidade'],
    hydrotherapy: ['Banho de sol para ativar vitamina D que potencializa zinco'],
    geotherapy: ['Argila verde rica em minerais (inclusive traços de zinco)'],
    tcm: ['Zinco relacionado ao elemento Metal – pulmão e intestino grosso'],
    otherTherapies: ['Exame: zinco sérico e eritrocitário','Teste de paladar (solução de zinco) para avaliar deficiência']
  },

  'omega3_deficiencia': {
    title: 'Deficiência de Ômega-3 / Inflamação Sistêmica',
    suggestions: ['Aumentar peixes gordurosos 3x/semana','Reduzir ômega-6 (óleos vegetais refinados, ultraprocessados)','Proporção ideal ômega-6:ômega-3 = 4:1 ou menos','Meta: Ômega-3 Index >8%'],
    foods: ['Salmão selvagem', 'Sardinha', 'Arenque', 'Atum', 'Linhaça', 'Chia', 'Nozes'],
    supplements: [
      'Ômega-3 EPA/DHA (concentrado) - Dose: 3000-5000mg EPA+DHA | Posologia: com refeições gordurosas 3x/dia | Fonte: Calder PC. Biochim Biophys Acta. 2015;1851(4):469-84',
      'Óleo de linhaça (ALA) — vegetariano - Dose: 15-30ml | Posologia: 1 colher de sopa/dia | Fonte: Faintuch J, et al. Nutrition. 2011',
      'DHA de algas (vegetariano/vegano) - Dose: 200-500mg DHA | Posologia: 1-2x/dia com refeição | Fonte: Arterburn LM, et al. Am J Clin Nutr. 2006'
    ],
    herbs: ['Cúrcuma + pimenta preta potencializa ação anti-inflamatória do ômega-3'],
    homeopathy: ['Arnica 30CH – inflamação traumática','Apis mellifica 30CH – inflamação com edema e calor'],
    quantumFlorals: ['Impatiens – inflamação emocional e física','Vine – rigidez e tensão crônica'],
    hydrotherapy: ['Banho de imersão frio para reduzir inflamação aguda','Contraste quente/frio em articulações inflamadas'],
    geotherapy: ['Argila verde fria sobre áreas inflamadas'],
    tcm: ['Acupuntura anti-inflamatória: IG4, E36, BP6, BP10'],
    otherTherapies: ['Ômega-3 Index teste para mensurar status real','Dieta Mediterrânea como padrão ouro anti-inflamatório']
  },

  'burnout_adrenal': {
    title: 'Burnout / Esgotamento Adrenal / Fadiga de Supra-Renal',
    suggestions: ['Reduzir carga de estresse imediatamente','Regularizar ritmo circadiano (dormir/acordar mesmo horário)','Cafeína: pausa por 2-4 semanas para recuperar adrenais','Adaptógenos por 3-6 meses'],
    foods: ['Proteínas a cada 3-4h', 'Sal marinho (para hipotensão adrenal)', 'Abacate', 'Batata doce', 'Quinoa'],
    supplements: [
      'Vitamina C (ascorbato de sódio) - Dose: 2000-5000mg | Posologia: dividido em 3-4x/dia | Fonte: Marik PE, et al. Chest. 2017',
      'Vitamina B5 (ácido pantotênico) - Dose: 500-2000mg | Posologia: 2-3x/dia | Fonte: Kelly GS. Altern Med Rev. 1999',
      'Fosfatidilserina - Dose: 400-600mg | Posologia: com refeições, últimas doses até 16h | Fonte: Hellhammer J, et al. Stress. 2004;7(2):119-26',
      'DHEA - Dose: 5-25mg (com acompanhamento) | Posologia: pela manhã | Fonte: Morales AJ, et al. J Clin Endocrinol Metab. 1994',
      'Magnésio glicinato - Dose: 400-600mg | Posologia: noite | Fonte: Abbasi B, et al. J Res Med Sci. 2012'
    ],
    herbs: [
      'Ashwagandha KSM-66 - Dose: 600-1200mg | Posologia: 2x/dia | Fonte: Pratte MA, et al. J Int Soc Sports Nutr. 2014',
      'Rhodiola rosea - Dose: 400-600mg | Posologia: pela manhã em jejum | Fonte: Olsson EM, et al. Planta Med. 2009',
      'Licorice root (alcaçuz sem glicirrizina) - Dose: 380-760mg | Posologia: 2x/dia | Fonte: Armanini D, et al. Steroids. 2003',
      'Holy Basil (Tulsi) - Dose: 600mg | Posologia: 2-3x/dia | Fonte: Saxena RC, et al. J Ayurveda Integr Med. 2012'
    ],
    homeopathy: ['Kali phosphoricum 30CH – esgotamento nervoso total','Nux vomica 200CH – burnout por excesso de trabalho','Phosphoricum acidum 30CH – exaustão mental com apatia','Sepia 200CH – esgotamento hormonal em mulheres'],
    quantumFlorals: ['Olive – exaustão total','Oak – força além do limite','Elm – sobrecarga de responsabilidades','Hornbeam – fadiga ao acordar'],
    hydrotherapy: ['Banho de imersão com sal de Epsom à noite','Banho morno + lavanda para recuperação'],
    geotherapy: ['Descanso em contato com a natureza (earthing/grounding)'],
    tcm: ['Tonificar Yin do Rim + Yuan Qi (energia ancestral)','Acupuntura: R3, R7, B23, VC4, VC6'],
    otherTherapies: ['Soroterapia: B complexo + vitamina C IV','Biofeedback para sistema nervoso autônomo','Meditação e mindfulness']
  },

  'enxaqueca': {
    title: 'Enxaqueca / Migrânea / Cefaleia Crônica',
    suggestions: ['Identificar e eliminar gatilhos (diário de cefaleia)','Magnésio é o suplemento mais eficaz na prevenção','Regularidade de sono é fundamental','Hidratação adequada (desidratação = gatilho comum)'],
    foods: ['Gengibre', 'Sementes de abóbora (magnésio+zinco)', 'Espinafre', 'Quinoa', 'Frutas sem glutamato'],
    supplements: [
      'Magnésio bisglicinato - Dose: 400-600mg | Posologia: à noite | Fonte: Peikert A, et al. Cephalalgia. 1996;16(4):257-63',
      'CoQ10 (ubiquinol) - Dose: 150-300mg | Posologia: 3x/dia | Fonte: Sandor PS, et al. Neurology. 2005;64(4):713-5',
      'Vitamina B2 (riboflavina) - Dose: 400mg | Posologia: 1x/dia | Fonte: Schoenen J, et al. Neurology. 1998;50(2):466-70',
      'Ômega-3 EPA+DHA - Dose: 3000mg | Posologia: 3x/dia | Fonte: Harel Z, et al. Am J Obstet Gynecol. 1996',
      'Vitamina D3 - Dose: 5000 UI | Posologia: diário | Fonte: Buettner C, et al. Cephalalgia. 2015'
    ],
    herbs: [
      'Feverfew (Tanacetum parthenium) - Dose: 100-300mg extrato (partenolido 0,2%) | Posologia: 1-3x/dia preventivo | Fonte: Pittler MH, Ernst E. Cochrane Database Syst Rev. 2004',
      'Gengibre (Zingiber officinale) - Dose: 500-1000mg | Posologia: ao primeiro sinal de dor | Fonte: Mustafa T, Srivastava KC. J Ethnopharmacol. 1990',
      'Butterbur (Petasites hybridus) — extrato PA-free - Dose: 75mg | Posologia: 2x/dia preventivo | Fonte: Lipton RB, et al. Neurology. 2004;63(12):2240-4',
      'Erva-cidreira (Melissa officinalis) - Dose: 300-600mg | Posologia: 2-3x/dia | Fonte: Kennedy DO, et al. Psychosom Med. 2004'
    ],
    homeopathy: ['Belladona 30CH – cefaleia pulsátil, intensa, melhor pressão','Sanguinaria canadensis 30CH – cefaleia unilateral com náusea','Gelsemium 30CH – cefaleia com peso na nuca','Iris versicolor 30CH – enxaqueca com aura e náusea'],
    quantumFlorals: ['Impatiens – tensão e urgência','White Chestnut – pensamentos circulantes','Beech – intolerância a estímulos'],
    hydrotherapy: ['Compressa fria na testa/nuca na crise','Banho de pés quentes para derivar sangue','Compressa quente na nuca para cervicogênica'],
    geotherapy: ['Argila fria na fronte durante a crise'],
    tcm: ['Acupuntura: VG20, VB20, IG4, F3 (protocolo clássico)','Moxa no ponto VG20 para enxaqueca fria','Sangria no ponto BL (local)'],
    otherTherapies: ['Biofeedback vascular','Acupuntura auricular','Neurologia para casos graves (toxina botulínica, CGRP)']
  },

  'detox_toxinas': {
    title: 'Desintoxicação / Toxicidade por Metais e Agrotóxicos',
    suggestions: ['Priorizar alimentos orgânicos','Protocolos de queladação devem ser supervisionados por médico','Suporte hepático como fase 1 do detox','Fibras aumentam excreção de toxinas pelo intestino'],
    foods: ['Coentro fresco (quelante natural de mercúrio)', 'Clorofila (espirulina, clorela)', 'Alho', 'Brócolis', 'Beterraba', 'Limão'],
    supplements: [
      'Clorela (Chlorella vulgaris) - Dose: 3-10g | Posologia: 2-3x/dia, longe das refeições | Fonte: Uchikawa T, et al. J Toxicol Sci. 2010',
      'N-Acetilcisteína (NAC) - Dose: 600-1800mg | Posologia: 2-3x/dia | Fonte: Ballatori N, et al. J Hepatol. 2009',
      'Ácido alfa-lipóico (R-ALA) - Dose: 300-600mg | Posologia: em jejum | Fonte: Goraca A, et al. Pharmacol Rep. 2011',
      'DMSA (ácido dimercaptosuccínico) — quelação supervisionada por médico | Fonte: Bradberry S, Vale A. Toxicol Rev. 2009',
      'Silimarina (Cardo Mariano) - Dose: 200-400mg 3x/dia | Fonte: Saller R, et al. Drugs. 2001'
    ],
    herbs: [
      'Coentro (Coriandrum sativum) - Dose: 3-5g/xícara | Posologia: chá 3x/dia | Fonte: Aga M, et al. Microbiol Immunol. 2001;45(10):673-80',
      'Chlorella vulgaris — ver suplementos | Fonte: Nakano S, et al. Plant Foods Hum Nutr. 2010',
      'Cardo mariano (Silybum marianum) — ver suplementos',
      'Dente-de-leão (Taraxacum officinale) - Dose: 3-8g/xícara | Posologia: chá 3x/dia | Fonte: Clare BA, et al. Altern Med Rev. 2009'
    ],
    homeopathy: ['Mercurius solubilis 30CH – intoxicação por mercúrio','Plumbum metallicum 30CH – intoxicação por chumbo','Arsenicum album 30CH – intoxicação por arsênico','Hepar sulphur 30CH – suporte ao fígado detox'],
    quantumFlorals: ['Crab Apple – limpeza e purificação profunda','Walnut – proteção contra toxinas ambientais'],
    hydrotherapy: ['Sauna infravermelha (excreção de toxinas pelo suor)','Banho com sal grosso e bicarbonato 2x/semana','Hidroterapia de cólon (indicação terapêutica)'],
    geotherapy: ['Argila bentonita ingestão (protocolo específico com médico)','Banho de argila verde total'],
    tcm: ['Acupuntura de drenagem: F3, VB34, VC12','Fitoterapia: Da Huang, Chai Hu – drenagem hepática'],
    otherTherapies: ['EDTA quelação intravenosa (médico)','Ozonioterapia','Exame de metais pesados (cabelo, urina, sangue)']
  },

  'rinite_sinusite': {
    title: 'Rinite / Sinusite / Congestão Nasal',
    suggestions: ['Identificar alérgenos (alimentares e ambientais)','Eliminar laticínios (principal gerador de muco)','Irrigação nasal com solução salina isotônica','Umidificador no quarto para ar seco'],
    foods: ['Gengibre', 'Alho', 'Cebola', 'Pimenta (cápsaicina)', 'Mel', 'Caldo de osso'],
    supplements: [
      'Vitamina C - Dose: 1000-3000mg | Posologia: 3x/dia | Fonte: Hemilä H. J R Soc Med. 1999',
      'Quercetina - Dose: 500-1000mg | Posologia: 2x/dia longe das refeições | Fonte: Thornhill SM, Kelly AM. Altern Med Rev. 2000;5(2):170-7',
      'Vitamina D3 - Dose: 5000 UI | Posologia: diário | Fonte: Wjst M, Hyppönen E. Clin Exp Allergy. 2007',
      'Zinco picolinato - Dose: 25mg | Posologia: à noite | Fonte: Hulisz D. J Am Pharm Assoc. 2004',
      'Probióticos (L. rhamnosus GG, L. paracasei) - Dose: 10-20 bilhões UFC | Posologia: diário | Fonte: Vliagoftis H, et al. Ann Allergy Asthma Immunol. 2008'
    ],
    herbs: [
      'Equinácea (Echinacea purpurea) - Dose: 900mg | Posologia: 3x/dia por 7-10 dias | Fonte: Karsch-Völk M, et al. Cochrane Database Syst Rev. 2015',
      'Eucalipto (Eucalyptus globulus) — inalação | Posologia: 5 gotas em vapor 2x/dia | Fonte: Juergens UR, et al. Eur J Med Res. 1998',
      'Oliva (folha) - Dose: 500mg extrato | Posologia: 2-3x/dia | Fonte: Briante R, et al. Biochem J. 2001',
      'Hortelã-pimenta (Mentha piperita) — inalação/tópica | Posologia: inalar ou aplicar no peito/nariz | Fonte: Meamarbashi A, Rajabi A. J Int Soc Sports Nutr. 2013'
    ],
    homeopathy: ['Allium cepa 30CH – coriza clara ardente, espirros','Kali bichromicum 30CH – secreção espessa, amarelo-esverdeada','Mercurius solubilis 30CH – sinusite purulenta','Pulsatilla 30CH – coriza espessa, sem odor'],
    quantumFlorals: ['Crab Apple – infecção e purificação','Walnut – sensibilidade ambiental'],
    hydrotherapy: ['Jala neti (lavagem nasal com solução salina)','Vaporizações com eucalipto 2x/dia','Compressas quentes sobre seios da face'],
    geotherapy: ['Argila verde sobre seios da face por 20min'],
    tcm: ['Acupuntura: IG4, IG20, E2, BP6','Moxa no IG4 e VG23','Fitoterapia: Bi Yan Pian – rinite alérgica'],
    otherTherapies: ['Fotobiomodulação intranasal (LED vermelho)','Acupuntura auricular','Dessensibilização alérgica progressiva']
  },

  'obesidade_resistencia_insulinica': {
    title: 'Obesidade / Resistência à Insulina / Síndrome Metabólica',
    suggestions: ['Dieta de baixo índice/carga glicêmica','Jejum intermitente 16:8 ou 5:2','Exercícios combinados: aeróbicos + musculação','Sono adequado (privação aumenta ghrelin e resistência à insulina)'],
    foods: ['Vegetais folhosos', 'Proteínas magras', 'Fibras solúveis (maçã, aveia)', 'Gorduras boas', 'Canela', 'Vinagre de maçã'],
    supplements: [
      'Berberina - Dose: 500mg | Posologia: 3x/dia antes das refeições | Fonte: Yin J, et al. Metabolism. 2008;57(5):712-7',
      'Cromo picolinato - Dose: 200-1000mcg | Posologia: com refeições | Fonte: Broadhurst CL, Domenico P. Diabetes Technol Ther. 2006',
      'Ácido alfa-lipóico - Dose: 300-600mg | Posologia: 30min antes das refeições | Fonte: Konrad T, et al. Diabetes Care. 1999;22(2):280-7',
      'Inositol (mio-inositol) - Dose: 2-4g | Posologia: 2x/dia em jejum | Fonte: Croze ML, Soulage CO. Biochimie. 2013',
      'Magnésio - Dose: 400-600mg | Posologia: noite | Fonte: Barbagallo M, et al. Diabetes Care. 2003'
    ],
    herbs: [
      'Berberina (Berberis vulgaris) - Dose: 500mg | Posologia: 3x/dia | Fonte: Dong H, et al. Evid Based Complement Alternat Med. 2012',
      'Canela (Cinnamomum verum) - Dose: 1-6g/dia | Posologia: em chá ou cápsulas com refeições | Fonte: Kirkham S, et al. Diabetes Obes Metab. 2009',
      'Gymnema sylvestre - Dose: 400-600mg extrato | Posologia: 2x/dia | Fonte: Shanmugasundaram ER, et al. J Ethnopharmacol. 1990',
      'Garcinia cambogia (HCA 50%) - Dose: 500-1500mg | Posologia: 30min antes das refeições | Fonte: Hayamizu K, et al. Fitoterapia. 2003'
    ],
    homeopathy: ['Calcarea carbonica 30CH – obesidade com frieza e indolência','Phytolacca 30CH – obesidade com compulsão alimentar','Graphites 30CH – obesidade com constipação e frieza','Antimonium crudum 30CH – obesidade em criança'],
    quantumFlorals: ['Cherry Plum – compulsão alimentar','Chestnut Bud – padrões repetitivos','Crab Apple – imagem corporal negativa','Wild Rose – resignação'],
    hydrotherapy: ['Ducha escocesa matinal (termogênica)','Sauna 3x/semana (resistência à insulina)','Banho de imersão frio curto (ativação tecido adiposo marrom)'],
    geotherapy: ['Caminhada descalço na areia ou terra (earthing)'],
    tcm: ['Acupuntura auricular (pontos fome, estômago, shen men)','E36, BP6, VC12 – metabolismo digestivo','Moxabustão tonificante'],
    otherTherapies: ['GLP-1 análogos (médico)','Liraglutida/semaglutida (prescrição médica)','Coaching nutricional e comportamental']
  }
};

// Mesclar com THERAPEUTIC_DATABASE original
Object.assign(THERAPEUTIC_DATABASE, THERAPEUTIC_DATABASE_EXTENDED);

/**
 * Mapeia os nomes dos campos da anamnese para as chaves do banco de dados
 */
export const SYMPTOM_MAPPING = {
  'intestino_preso': 'intestino_preso',
  'diarreia': 'diarreia',
  'dores_de_cabeca': 'dores_de_cabeca',
  'gases': 'gases',
  'azia': 'azia',
  'diabetes_prediabetes': 'diabetes_prediabetes',
  'colesterol_trig': 'colesterol_trig',
  'anemia': 'anemia',
  'insonia': 'insonia',
  'depressao': 'depressao',
  'ansiedade': 'ansiedade',
  'hipertensao': 'hipertensao',
  // Novas condições
  'gastrite': 'gastrite',
  'figado_sobrecarregado': 'figado_sobrecarregado',
  'fadiga': 'fadiga',
  'tireoide_hipotireoidismo': 'tireoide_hipotireoidismo',
  'menopausa': 'menopausa',
  'sop': 'sop',
  'tpm_dismenorreia': 'tpm_dismenorreia',
  'baixa_testosterona': 'baixa_testosterona',
  'imunidade_baixa': 'imunidade_baixa',
  'candidiase': 'candidiase',
  'artrite_artralgia': 'artrite_artralgia',
  'osteoporose': 'osteoporose',
  'acne': 'acne',
  'queda_cabelo': 'queda_cabelo',
  'carencia_vitamina_d': 'carencia_vitamina_d',
  'carencia_magnesio': 'carencia_magnesio',
  'carencia_zinco': 'carencia_zinco',
  'omega3_deficiencia': 'omega3_deficiencia',
  'burnout_adrenal': 'burnout_adrenal',
  'enxaqueca': 'enxaqueca',
  'detox_toxinas': 'detox_toxinas',
  'rinite_sinusite': 'rinite_sinusite',
  'obesidade_resistencia_insulinica': 'obesidade_resistencia_insulinica',
};

/**
 * PROTOCOLOS DE ESPECIALISTAS BRASILEIROS E INTERNACIONAIS
 * Baseados em estudos atualizados e práticas clínicas validadas
 */
export const SPECIALIST_PROTOCOLS = {
  cinatra: {
    name: 'Dr. Lair Ribeiro & Protocolos Cinatra',
    specialties: ['Cardiologia', 'Medicina Ortomolecular', 'Longevidade'],
    sources: [
      'Ribeiro L. Saúde não se compra, se conquista. 2019',
      'Holick MF. Vitamin D deficiency. N Engl J Med. 2007;357(3):266-81',
      'Marik PE, et al. Hydrocortisone, Vitamin C and Thiamine. Chest. 2017;151(6):1229-1238'
    ],
    protocols: {
      cardiovascular: [
        {
          item: 'Vitamina D3 + K2',
          dose: '10.000 UI D3 + 200mcg K2-MK7',
          posology: '1 cápsula/dia pela manhã com alimento gorduroso',
          indication: 'Prevenção cardiovascular, calcificação arterial, pressão arterial, imunidade',
          contraindication: 'Hipercalcemia, sarcoidose, hiperparatireoidismo, cálculos renais',
          interactions: 'Anticoagulantes (K2 pode reduzir efeito da varfarina)',
          monitoring: 'Dosar 25(OH)D3 a cada 3 meses (alvo: 60-80 ng/ml)',
          sources: 'Holick MF. N Engl J Med 2007; Maresz K. Integr Med 2015;14(1):34-9'
        },
        {
          item: 'Magnésio Treonato ou Glicinato',
          dose: '2000mg de magnésio elementar',
          posology: '500mg 4x/dia com alimentos ou 1000mg 2x/dia (manhã e noite)',
          indication: 'Hipertensão, arritmias, espasmos musculares, ansiedade, insônia',
          contraindication: 'Insuficiência renal grave (TFG <30), bloqueio AV',
          interactions: 'Bifosfonatos, antibióticos quinolonas, tetraciclinas (espaçar 2-3h)',
          monitoring: 'Magnésio sérico + RBC (eritrócitos)',
          sources: 'Rosanoff A, et al. Scientifica 2016;2016:4019717'
        },
        {
          item: 'Ômega-3 EPA/DHA (óleo de peixe)',
          dose: '3000-4000mg EPA+DHA',
          posology: '1000mg 3-4x/dia com refeições principais',
          indication: 'Hipertrigliceridemia, inflamação, prevenção cardiovascular, arritmias',
          contraindication: 'Alergia a peixes/frutos do mar, distúrbios de coagulação',
          interactions: 'Anticoagulantes/antiplaquetários (aumenta risco sangramento)',
          monitoring: 'Triglicerídeos, Ômega-3 Index (alvo: >8%)',
          sources: 'Mozaffarian D, Wu JH. J Am Coll Cardiol 2011;58(20):2047-67'
        },
        {
          item: 'CoQ10 Ubiquinol (forma reduzida)',
          dose: '200-400mg',
          posology: '100-200mg 2x/dia com alimento gorduroso',
          indication: 'Insuficiência cardíaca, uso de estatinas, fadiga, hipertensão',
          contraindication: 'Uso de varfarina (reduz eficácia)',
          interactions: 'Estatinas (CoQ10 restaura níveis), antidiabéticos orais',
          monitoring: 'CoQ10 plasmático (alvo: >2,5 µg/ml)',
          sources: 'Mortensen SA, et al. JACC Heart Fail 2014;2(6):641-9'
        },
        {
          item: 'L-Arginina',
          dose: '3000-6000mg',
          posology: '1000-2000mg 3x/dia entre refeições',
          indication: 'Disfunção endotelial, hipertensão, angina, disfunção erétil',
          contraindication: 'Herpes ativo, pós-infarto recente (<3 meses), asma grave',
          interactions: 'Anti-hipertensivos (potencializa efeito), sildenafil',
          monitoring: 'Pressão arterial, óxido nítrico sérico',
          sources: 'Böger RH, et al. Circulation 2011;123(20):2263-73'
        },
        {
          item: 'Taurina',
          dose: '2000-3000mg',
          posology: '1000mg 2-3x/dia antes das refeições',
          indication: 'Insuficiência cardíaca, hipertensão, arritmias, diabetes',
          contraindication: 'Úlcera péptica ativa',
          interactions: 'Lítio (pode reduzir eficácia)',
          monitoring: 'Pressão arterial, função cardíaca (ecocardiograma)',
          sources: 'Ahmadian M, et al. J Diet Suppl 2017;14(5):522-39'
        }
      ],
      metabolic: [
        {
          item: 'Berberina HCl',
          dose: '1500mg',
          posology: '500mg 3x/dia 15-30min antes das principais refeições',
          indication: 'Diabetes tipo 2, pré-diabetes, resistência insulínica, SOP, dislipidemia',
          contraindication: 'Gravidez, lactação, hipoglicemia, doença hepática grave',
          interactions: 'Metformina (sinergia), ciclosporina, midazolam (inibe CYP3A4)',
          monitoring: 'Glicemia jejum, HbA1c, enzimas hepáticas',
          sources: 'Yin J, et al. Metabolism 2008;57(5):712-7; Zhang Y, et al. J Ethnopharmacol 2008;116(3):413-7'
        },
        {
          item: 'Ácido Alfa-Lipóico (ALA)',
          dose: '600-1800mg',
          posology: '600mg 2-3x/dia em jejum (1h antes refeições)',
          indication: 'Neuropatia diabética, antioxidante universal, quelação metais pesados',
          contraindication: 'Deficiência de tiamina não tratada, hipoglicemia',
          interactions: 'Antidiabéticos (potencializa), quimioterapia (protege células normais)',
          monitoring: 'Glicemia, tiamina sérica',
          sources: 'Ziegler D, et al. Diabetes Care 2004;27(3):777-83'
        },
        {
          item: 'Cromo Picolinato',
          dose: '200-1000mcg',
          posology: '200mcg 2-3x/dia com refeições',
          indication: 'Diabetes tipo 2, resistência insulínica, controle apetite',
          contraindication: 'Insuficiência renal, doença hepática',
          interactions: 'Levotiroxina, anti-inflamatórios (reduz absorção cromo)',
          monitoring: 'Glicemia, HbA1c, função renal',
          sources: 'Anderson RA. J Am Coll Nutr 1998;17(6):548-55'
        },
        {
          item: 'Canela do Ceilão (Cinnamomum verum)',
          dose: '1000-6000mg',
          posology: '1-2g 3x/dia em cápsulas ou em pó nas refeições',
          indication: 'Diabetes tipo 2, resistência insulínica, dislipidemia',
          contraindication: 'Hepatopatia (cumarina), gravidez (altas doses)',
          interactions: 'Antidiabéticos (potencializa efeito)',
          monitoring: 'Glicemia, enzimas hepáticas (se uso prolongado)',
          sources: 'Khan A, et al. Diabetes Care 2003;26(12):3215-8'
        },
        {
          item: 'Inositol (Myo-inositol + D-chiro-inositol 40:1)',
          dose: '4000mg myo + 100mg D-chiro',
          posology: '2000mg myo 2x/dia com alimentos',
          indication: 'Síndrome dos ovários policísticos (SOP), resistência insulínica, infertilidade',
          contraindication: 'Gravidez estabelecida (dose elevada)',
          interactions: 'Antidiabéticos (monitorar glicemia)',
          monitoring: 'Glicemia, insulina, perfil hormonal',
          sources: 'Unfer V, et al. Int J Endocrinol 2016;2016:1849162'
        },
        {
          item: 'Gymnema sylvestre (extrato)',
          dose: '400-800mg',
          posology: '200-400mg 2x/dia antes refeições',
          indication: 'Diabetes, desejo por doces, obesidade',
          contraindication: 'Hipoglicemia, cirurgia programada (suspender 2 semanas antes)',
          interactions: 'Antidiabéticos (potencializa - monitorar)',
          monitoring: 'Glicemia capilar diária',
          sources: 'Baskaran K, et al. J Ethnopharmacol 1990;30(3):295-305'
        }
      ],
      detox: [
        {
          item: 'Glutationa Lipossomal (forma reduzida)',
          dose: '500-1000mg',
          posology: '500mg 1-2x/dia em jejum (sublingual ou oral)',
          indication: 'Detoxificação hepática, exposição toxinas, doença de Parkinson, estresse oxidativo',
          contraindication: 'Asma (forma inalada), alergia ao componente',
          interactions: 'Quimioterapia (pode proteger células tumorais - controverso)',
          monitoring: 'Glutationa eritrocitária, marcadores hepáticos',
          sources: 'Zheng Y, et al. Oxid Med Cell Longev 2021;2021:6682937'
        },
        {
          item: 'NAC - N-Acetilcisteína',
          dose: '1200-2400mg',
          posology: '600mg 2-4x/dia com água em jejum',
          indication: 'Precursor glutationa, mucolítico, intoxicação por paracetamol, SOP',
          contraindication: 'Úlcera péptica ativa, asma não controlada',
          interactions: 'Nitroglicerina (potencializa cefaleia e hipotensão)',
          monitoring: 'Função hepática, glutationa',
          sources: 'Samuni Y, et al. Free Radic Biol Med 2013;63:383-90'
        },
        {
          item: 'Selênio (selenometionina ou selenito)',
          dose: '200-400mcg',
          posology: '200mcg 1-2x/dia com alimentos',
          indication: 'Tireoide (conversão T4→T3), imunidade, detox metais pesados, fertilidade masculina',
          contraindication: 'Selenose prévia (>900mcg/dia)',
          interactions: 'Antiácidos (reduzem absorção)',
          monitoring: 'Selênio sérico (alvo: 120-150 ng/ml), TSH, anti-TPO',
          sources: 'Rayman MP. Lancet 2012;379(9822):1256-68'
        },
        {
          item: 'Vitamina C Lipossomal (ácido ascórbico)',
          dose: '2000-5000mg',
          posology: '1000mg 2-5x/dia com alimentos',
          indication: 'Antioxidante, síntese colágeno, imunidade, quelação metais, câncer (altas doses EV)',
          contraindication: 'Hemocromatose, deficiência G6PD, cálculos oxalato',
          interactions: 'Anticoagulantes (altas doses), antidiabéticos',
          monitoring: 'Oxalato urinário (se histórico cálculos)',
          sources: 'Carr AC, Maggini S. Nutrients 2017;9(11):1211'
        },
        {
          item: 'Cardo Mariano (Silybum marianum - silimarina)',
          dose: '420-600mg',
          posology: '140-200mg 3x/dia com refeições',
          indication: 'Hepatoproteção, cirrose, esteatose, hepatite, intoxicações',
          contraindication: 'Alergia à família Asteraceae',
          interactions: 'Inibe CYP2C9 e CYP3A4 (pode aumentar níveis de fármacos)',
          monitoring: 'Enzimas hepáticas (AST, ALT, GGT)',
          sources: 'Abenavoli L, et al. Phytother Res 2010;24(10):1423-32'
        },
        {
          item: 'Chlorella (alga verde)',
          dose: '3000-5000mg',
          posology: '1000mg 3-5x/dia com água antes refeições',
          indication: 'Quelação metais pesados (mercúrio, chumbo), fibromialgia, detox',
          contraindication: 'Autoimunidade ativa (pode estimular), anticoagulação',
          interactions: 'Varfarina (alto teor vitamina K)',
          monitoring: 'Metais pesados urinários (teste provocativo)',
          sources: 'Uchikawa T, et al. Nutr J 2011;10:91'
        }
      ]
    }
  },
  
  mariaRocha: {
    name: 'Dra. Maria Rocha',
    specialties: ['Fitoterapia Clínica', 'Medicina Integrativa Feminina', 'Ginecologia Natural'],
    sources: [
      'Rocha M. Fitoterapia Feminina Integrativa. 2020',
      'Low Dog T. Women\'s Health in Complementary Medicine. 2018',
      'Romm A. Botanical Medicine for Women\'s Health. 2nd ed. 2017'
    ],
    protocols: {
      hormonal: [
        {
          item: 'Vitex agnus-castus (Angélica/Chasteberry)',
          dose: '400-1000mg',
          posology: '400mg 1x/dia pela manhã em jejum (uso contínuo mínimo 3 meses)',
          indication: 'TPM, mastalgia cíclica, hiperprolactinemia, infertilidade anovulatória',
          contraindication: 'Gravidez, lactação, FIV/TRH, uso de dopaminérgicos, câncer hormônio-dependente',
          interactions: 'Contraceptivos orais, dopaminérgicos, antipsicóticos',
          monitoring: 'Prolactina, progesterona (fase lútea)',
          sources: 'Schellenberg R. BMJ 2001;322(7279):134-7; Dante G, Facchinetti F. Clin Drug Investig 2011;31(11):829-47'
        },
        {
          item: 'Maca Peruana (Lepidium meyenii) - variedades coloridas',
          dose: '1500-3000mg',
          posology: '500-1000mg 3x/dia com refeições',
          indication: 'Libido, energia, menopausa, fertilidade, performance atlética',
          contraindication: 'Câncer hormônio-sensível, hipertireoidismo não controlado',
          interactions: 'Levotiroxina (monitorar TSH)',
          monitoring: 'TSH, perfil hormonal',
          sources: 'Brooks NA, et al. Evid Based Complement Alternat Med 2008;5(3):311-6'
        },
        {
          item: 'Tribulus terrestris (extrato padronizado)',
          dose: '750-1500mg',
          posology: '250-500mg 3x/dia com refeições',
          indication: 'Libido feminina/masculina, disfunção erétil, performance atlética',
          contraindication: 'Diabetes (monitorar glicemia), próstata aumentada, gravidez',
          interactions: 'Antidiabéticos, anti-hipertensivos',
          monitoring: 'Testosterona livre, glicemia',
          sources: 'Akhtari E, et al. Daru 2014;22:40'
        },
        {
          item: 'Dong Quai - Angélica Sinensis (Dang Gui)',
          dose: '1000-1500mg',
          posology: '500mg 2-3x/dia com refeições',
          indication: 'Dismenorreia, TPM, menopausa, anemia, circulação',
          contraindication: 'Gravidez (estimulante uterino), menorragia, anticoagulação, exposição solar',
          interactions: 'Varfarina (potencializa), tamoxifeno',
          monitoring: 'Coagulação (se uso concomitante anticoagulantes)',
          sources: 'Hirata JD, et al. Fertil Steril 1997;68(6):981-6'
        },
        {
          item: 'Óleo de Prímula (Evening Primrose Oil - GLA)',
          dose: '1500-3000mg',
          posology: '500-1000mg 3x/dia com refeições',
          indication: 'TPM, mastalgia, eczema, artrite reumatoide',
          contraindication: 'Esquizofrenia, epilepsia, cirurgia programada',
          interactions: 'Fenotiazinas (reduz limiar convulsivo)',
          monitoring: 'Sintomas de TPM/mastalgia',
          sources: 'Budeiri D, et al. Br J Obstet Gynaecol 1996;103(11):1165-9'
        },
        {
          item: 'Cimicifuga racemosa (Black Cohosh)',
          dose: '40-80mg',
          posology: '20-40mg 2x/dia (extrato padronizado)',
          indication: 'Menopausa (fogachos, sudorese), artrite',
          contraindication: 'Hepatopatia, câncer mama hormônio-sensível (controverso)',
          interactions: 'Tamoxifeno, hepatotóxicos',
          monitoring: 'Enzimas hepáticas',
          sources: 'Osmers R, et al. Obstet Gynecol 2005;105(5 Pt 1):1074-83'
        },
        {
          item: 'Shatavari (Asparagus racemosus) - Rasayana feminino',
          dose: '1000-2000mg',
          posology: '500mg 2-4x/dia com leite morno ou água',
          indication: 'Rejuvenescimento feminino, lactação, fertilidade, menopausa, úlcera',
          contraindication: 'Alergia a aspargos, congestão pulmonar',
          interactions: 'Diuréticos (potencializa)',
          monitoring: 'Volume de leite (lactantes)',
          sources: 'Alok S, et al. Pharmacogn Rev 2013;7(13):53-60'
        }
      ],
      uterine: [
        {
          item: 'Folha de Framboesa (Rubus idaeus)',
          dose: '3-6g de folhas secas',
          posology: 'Infusão 1-2g em 150ml, 3x/dia',
          indication: 'Tônico uterino, preparação para parto (3º trimestre), dismenorreia',
          contraindication: '1º e 2º trimestres de gravidez',
          interactions: 'Hipoglicemiantes (pode potencializar)',
          monitoring: 'Contrações uterinas (gestantes)',
          sources: 'Holst L, et al. Acta Obstet Gynecol Scand 2009;88(4):404-11'
        },
        {
          item: 'Urtiga (Urtica dioica)',
          dose: '900-1200mg',
          posology: '300-400mg 3x/dia com refeições',
          indication: 'Menorragia, anemia ferropriva, artrite, rinite alérgica',
          contraindication: 'Hipotensão, edema por ICC/insuficiência renal',
          interactions: 'Anti-hipertensivos, anticoagulantes, diuréticos',
          monitoring: 'Hemograma, ferritina',
          sources: 'Mittman P. Planta Med 1990;56(1):44-7'
        },
        {
          item: 'Mil-folhas (Achillea millefolium)',
          dose: '2-4g',
          posology: 'Infusão 1-2g 2x/dia ou tintura 20-40 gotas 3x/dia',
          indication: 'Regulador menstrual, anti-inflamatório, cicatrizante',
          contraindication: 'Gravidez, alergia Asteraceae, anticoagulação',
          interactions: 'Anticoagulantes, sedativos',
          monitoring: 'Tempo de coagulação (se uso anticoagulantes)',
          sources: 'Cavalcanti AM, et al. J Ethnopharmacol 2006;104(1-2):27-31'
        },
        {
          item: 'Agoniada (Plumeria lancifolia)',
          dose: '1-3g',
          posology: 'Infusão 1g 3x/dia ou tintura 30 gotas 3x/dia',
          indication: 'Dismenorreia, cólicas menstruais, ansiedade',
          contraindication: 'Gravidez',
          interactions: 'Nenhuma conhecida',
          monitoring: 'Intensidade das cólicas',
          sources: 'Uso tradicional brasileiro - Literatura etnobotânica'
        }
      ],
      fertility: [
        {
          item: 'Mio-Inositol + D-chiro-inositol (40:1) + Ácido Fólico',
          dose: '4000mg mio + 100mg D-chiro + 400mcg ácido fólico',
          posology: '2000mg mio 2x/dia com refeições',
          indication: 'SOP, resistência insulínica, qualidade oocitária, regulação ciclo',
          contraindication: 'Gravidez estabelecida (reduzir dose)',
          interactions: 'Antidiabéticos (monitorar glicemia)',
          monitoring: 'Ciclo menstrual, insulina, andrógenos, ultrassom ovariano',
          sources: 'Unfer V, et al. Int J Endocrinol 2016;2016:1849162'
        },
        {
          item: 'CoQ10 Ubiquinol (forma reduzida)',
          dose: '200-600mg',
          posology: '100-200mg 2-3x/dia com alimento gorduroso',
          indication: 'Qualidade oocitária, reserva ovariana diminuída, > 35 anos',
          contraindication: 'Uso de varfarina',
          interactions: 'Estatinas (restaura níveis), varfarina',
          monitoring: 'FSH, AMH, contagem folículos antrais',
          sources: 'Ben-Meir A, et al. Aging Cell 2015;14(5):887-95'
        },
        {
          item: 'DHEA (Dehidroepiandrosterona)',
          dose: '25-75mg',
          posology: '25mg 1-3x/dia (iniciar com 25mg e ajustar)',
          indication: 'Reserva ovariana diminuída, resposta pobre em FIV, > 40 anos',
          contraindication: 'Câncer hormônio-sensível, SOP, hirsutismo',
          interactions: 'Tamoxifeno, anastrozol',
          monitoring: 'DHEA-S, testosterona, estradiol (mensal)',
          sources: 'Gleicher N, Barad DH. Hum Reprod Update 2011;17(6):757-70'
        },
        {
          item: 'L-Arginina',
          dose: '3000-6000mg',
          posology: '1000-2000mg 3x/dia entre refeições',
          indication: 'Fluxo sanguíneo endometrial, espessura endometrial, implantação',
          contraindication: 'Herpes ativo, hipotensão',
          interactions: 'Anti-hipertensivos, sildenafil',
          monitoring: 'Espessura endometrial (ultrassom)',
          sources: 'Battaglia C, et al. Gynecol Obstet Invest 1999;47(1):29-33'
        },
        {
          item: 'Ômega-3 DHA predominante',
          dose: '2000-3000mg',
          posology: '1000mg 2-3x/dia com refeições',
          indication: 'Qualidade embrionária, implantação, gestação saudável',
          contraindication: 'Alergia peixes, distúrbio coagulação',
          interactions: 'Anticoagulantes',
          monitoring: 'Índice ômega-3 (alvo >8%)',
          sources: 'Chiu YH, et al. Am J Clin Nutr 2018;107(1):94-103'
        }
      ]
    }
  },

  danielForjaz: {
    name: 'Dr. Daniel Forjaz',
    specialties: ['Homeopatia Clássica', 'Medicina Antroposófica', 'Terapia Floral'],
    protocols: {
      constitutional: [
        'Análise miasmática profunda (Psora, Sycosis, Syphilis, Tuberculinismo)',
        'Similium único em alta potência (200CH, 1M, 10M)',
        'Uso de nosódios constitucional: Tuberculinum, Medorrhinum, Syphilinum',
        'Protocolo de drenagem antes do similium (Nux vomica, Sulphur)',
        'Seguimento mínimo 30 dias entre doses de alta potência'
      ],
      acute: [
        'Aconitum 200CH - início súbito, febre alta, pânico',
        'Belladonna 200CH - febre alta, rubor, pulsação',
        'Arsenicum album 30CH - intoxicação alimentar, ansiedade',
        'Nux vomica 30CH - excesso alimentar/álcool, irritabilidade',
        'Arnica 200CH - traumas físicos, dor muscular'
      ],
      anthroposophic: [
        'Meteoros (Weleda) - vitalização geral',
        'Hepatodoron - fígado e metabolismo',
        'Infludo - resfriados e gripes',
        'Cardiodoron - sistema cardiovascular',
        'Digestodoron - digestão'
      ],
      florals: [
        'Sistema Floral de Bach - 38 essências originais',
        'Sistema Floral de Saint Germain - florais quânticos brasileiros',
        'Fórmulas personalizadas 4-7 essências por frasco',
        'Posologia: 4 gotas 4x/dia sublingual'
      ]
    }
  },

  katiaHaranaka: {
    name: 'Dra. Katia Haranaka',
    specialties: ['Acupuntura', 'Medicina Tradicional Chinesa', 'Fitoterapia Chinesa'],
    protocols: {
      energetic: [
        'Diagnóstico pela língua e pulso (12 posições)',
        'Identificação de padrões: Deficiência/Excesso, Calor/Frio, Interno/Externo',
        'Tratamento baseado em 8 Princípios e 5 Elementos',
        'Acupuntura sistêmica + auricular combinadas'
      ],
      acupuncture: [
        'Pontos mestres: E36, BP6, F3, IG4, VG20, VC6',
        'Protocolo anti-dor: IG4 + F3 (4 portas)',
        'Protocolo digestivo: E36, E25, VC12, BP6',
        'Protocolo ansiedade: C7, PC6, VG20, Yintang',
        'Protocolo insônia: C7, R3, BP6, VB20',
        'Electroacupuntura para dor crônica - 30Hz'
      ],
      herbalFormulas: [
        'Liu Wei Di Huang Wan - Yin do Rim (base longevidade)',
        'Xiao Yao San - Estagnação Qi Fígado (estresse)',
        'Bu Zhong Yi Qi Tang - Deficiência Qi Baço (fadiga)',
        'Gui Pi Tang - Deficiência Sangue (anemia, insônia)',
        'Wen Dan Tang - Fleuma-Calor (ansiedade, insônia)',
        'Tian Wang Bu Xin Dan - Deficiência Yin Coração/Rim'
      ],
      dietary: [
        'Alimentos mornos para Yang: gengibre, canela, cordeiro',
        'Alimentos frios para Calor: pepino, melancia, hortelã',
        'Tônicos de Qi: arroz, batata-doce, frango, mel',
        'Tônicos de Sangue: fígado, beterraba, espinafre, ameixa preta',
        'Evitar Umidade: laticínios, açúcar, farinha branca, álcool'
      ]
    }
  },

  updatedStudies: {
    name: 'Estudos Científicos Atualizados 2023-2025',
    protocols: {
      microbiome: [
        'Probióticos de 4ª geração (Akkermansia muciniphila) - obesidade e diabetes',
        'Prebióticos FOS/GOS 10-20g/dia - microbiota benéfica',
        'Polifenóis (resveratrol, quercetina) - diversidade microbiana',
        'Butirato de sódio 600mg/dia - integridade intestinal',
        'Transplante de microbiota fecal (TMF) - Clostridioides difficile'
      ],
      longevity: [
        'NMN (Nicotinamida Mononucleotídeo) 500-1000mg/dia - NAD+ e longevidade',
        'Resveratrol + Pterostilbeno 500mg/dia - sirtuínas',
        'Espermidina 1-2mg/dia - autofagia',
        'Senolytics (Quercetina 1g + Dasatinib) - células senescentes',
        'Metformina 500-1000mg/dia - geroprotector (sob sugestão terapêutica)'
      ],
      neuroprotection: [
        'Liões Mane (Hericium erinaceus) 1000mg 2x/dia - NGF',
        'Bacopa monnieri 300mg/dia - memória e cognição',
        'Fosfatidilserina 300mg/dia - memória',
        'Citicolina (CDP-colina) 500mg 2x/dia - neuroproteção',
        'Curcumina lipossomal 1000mg/dia - neuroinflamação'
      ],
      mitochondrial: [
        'PQQ (Pirroloquinolina quinona) 20mg/dia - biogênese mitocondrial',
        'CoQ10 Ubiquinol 200-600mg/dia - ATP',
        'D-Ribose 5g 2x/dia - energia celular',
        'Ácido Alfa-Lipóico 600mg/dia - antioxidante mitocondrial',
        'Carnitina 2g/dia - beta-oxidação'
      ],
      immunomodulation: [
        'Vitamina D3 5000-10000UI/dia - imunidade adaptativa',
        'Zinco 30-50mg/dia - imunidade inata',
        'Vitamina C lipossomal 2-3g/dia - neutrófilos e NK',
        'Cogumelos medicinais (Reishi, Shiitake, Maitake) - beta-glucanos',
        'Lactoferrina 300mg/dia - antimicrobiana e imunomoduladora'
      ],
      metabolicHealth: [
        'Berberina 500mg 3x/dia - AMPK e glicemia',
        'Inositol 2-4g/dia - SOP e resistência insulínica',
        'Cromo GTF 400mcg/dia - metabolismo glicose',
        'Ácido Clorogênico (café verde) 400mg 2x/dia - glicemia pós-prandial',
        'Canela do Ceilão 3-6g/dia - sensibilidade insulínica'
      ]
    }
  }
};

/**
 * Extrai sugestões terapêuticas baseadas nos sintomas do paciente
 * Agora integrado com protocolos de especialistas
 */
export function getTherapeuticSuggestionsBySymptoms(symptoms = []) {
  const suggestions = {};
  
  if (!Array.isArray(symptoms)) return suggestions;
  
  // 📚 Carregar dados dos arquivos therapeutic-data
  let therapeuticFiles = [];
  try {
    therapeuticFiles = loadTherapeuticData();
    console.log(`✅ Sistema carregou ${therapeuticFiles.length} arquivos da pasta therapeutic-data`);
  } catch (error) {
    console.warn('⚠️ Erro ao carregar arquivos terapêuticos:', error);
  }
  
  symptoms.forEach(symptom => {
    const key = SYMPTOM_MAPPING[symptom];
    if (key && THERAPEUTIC_DATABASE[key]) {
      // Obter sugestões base do banco de dados
      let baseSuggestions = {
        ...THERAPEUTIC_DATABASE[key],
        specialistProtocols: getRelevantSpecialistProtocols(key)
      };
      
      // 🔄 Enriquecer com informações dos arquivos
      const enrichedSuggestions = enrichSuggestionsWithFiles(key, baseSuggestions);
      
      suggestions[key] = enrichedSuggestions;
    }
  });
  
  return suggestions;
}

/**
 * Obtém protocolos de especialistas relevantes para cada condição
 */
function getRelevantSpecialistProtocols(condition) {
  const protocols = [];
  
  // Mapeamento de condições para protocolos de especialistas
  const conditionMapping = {
    'intestino_preso': ['cinatra.detox', 'updatedStudies.microbiome'],
    'diarreia': ['updatedStudies.microbiome', 'katiaHaranaka.dietary'],
    'dores_de_cabeca': ['katiaHaranaka.acupuncture', 'danielForjaz.acute'],
    'figado_sobrecarregado': ['cinatra.detox', 'mariaRocha.hormonal'],
    'ansiedade': ['danielForjaz.florals', 'katiaHaranaka.acupuncture', 'updatedStudies.neuroprotection'],
    'insonia': ['katiaHaranaka.herbalFormulas', 'updatedStudies.neuroprotection'],
    'hipertensao': ['cinatra.cardiovascular', 'katiaHaranaka.acupuncture']
  };
  
  const relevantProtocols = conditionMapping[condition] || [];
  
  relevantProtocols.forEach(protocolPath => {
    const [specialist, category] = protocolPath.split('.');
    if (SPECIALIST_PROTOCOLS[specialist] && SPECIALIST_PROTOCOLS[specialist].protocols[category]) {
      protocols.push({
        specialist: SPECIALIST_PROTOCOLS[specialist].name,
        specialties: SPECIALIST_PROTOCOLS[specialist].specialties,
        category,
        recommendations: SPECIALIST_PROTOCOLS[specialist].protocols[category]
      });
    }
  });
  
  return protocols;
}

/**
 * Gera relatório formatado de sugestões
 */
export function generateTherapeuticReport(symptoms = []) {
  const suggestions = getTherapeuticSuggestionsBySymptoms(symptoms);
  const report = [];
  
  // 🔄 ENRIQUECIMENTO AUTOMÁTICO COM ARQUIVOS THERAPEUTIC-DATA
  try {
    const therapeuticFiles = loadTherapeuticData();
    console.log(`📚 Carregados ${therapeuticFiles.length} arquivos terapêuticos para análise`);
  } catch (error) {
    console.warn('⚠️ Erro ao carregar arquivos terapêuticos:', error);
  }
  
  Object.entries(suggestions).forEach(([key, data]) => {
    // Enriquecer cada sugestão com dados dos arquivos
    const enrichedData = enrichSuggestionsWithFiles(key, data);
    
    report.push({
      title: enrichedData.title,
      suggestions: enrichedData.suggestions,
      foods: enrichedData.foods,
      supplements: enrichedData.supplements,
      herbs: enrichedData.herbs,
      homeopathy: enrichedData.homeopathy,
      contraindications: enrichedData.contraindications,
      sourceFiles: enrichedData.sourceFiles || []
    });
  });
  
  return report;
}

/**
 * CONTRAINDICAÇÕES E ALERTAS DE SEGURANÇA
 * Consultar SEMPRE antes de recomendar ou sugerir
 */
export const CONTRAINDICATIONS_GUIDE = {
  general: {
    title: 'Precauções Gerais',
    alerts: [
      '🔴 SEMPRE consultar profissional de saúde antes de iniciar suplementação se:',
      '  • Gestante ou lactante',
      '  • Uso de medicamentos contínuos',
      '  • Doenças crônicas (diabetes, hipertensão, cardiopatia, nefropatia, hepatopatia)',
      '  • Cirurgia programada',
      '  • Histórico de alergias',
      '  • Crianças (<12 anos), idosos frágeis (>75 anos)',
      '',
      '🔴 INTERAÇÕES MEDICAMENTOSAS - Informar sempre ao profissional de saúde:',
      '  • Anticoagulantes/Antiagregantes (Warfarina, AAS, Clopidogrel, NOACs)',
      '  • Antidiabéticos (Metformina, Insulina, Sulfonilureias)',
      '  • Anti-hipertensivos (IECA, BRA, Betabloqueadores, Diuréticos)',
      '  • Anticonvulsivantes (Fenitoína, Carbamazepina, Ácido valproico)',
      '  • Imunossupressores (Corticoides, Ciclosporina, Metotrexato)',
      '  • Hormônios tireoidianos (Levotiroxina)',
      '  • Quimioterápicos e radioterapia',
      '  • Antidepressivos (ISRS, Tricíclicos, IMAOs)',
      '',
      '🔴 SINAIS DE ALERTA - Suspender imediatamente e procurar profissional de saúde:',
      '  • Reações alérgicas (urticária, inchaço facial, dificuldade respirar, anafilaxia)',
      '  • Sangramento anormal (fezes escuras, hematomas espontâneos, sangue na urina)',
      '  • Dor abdominal intensa ou persistente',
      '  • Icterícia (pele/olhos amarelos)',
      '  • Alterações mentais súbitas (confusão, sonolência excessiva)',
      '  • Febre alta persistente (>38.5°C por >48h)',
      '  • Vômitos incoercíveis',
      '  • Palpitações, dor no peito, falta de ar',
      '',
      '✓ BOAS PRÁTICAS:',
      '  • Iniciar um suplemento/fitoterápico por vez (observar reações)',
      '  • Respeitar dosagens recomendadas (mais não é melhor)',
      '  • Preferir produtos com certificação de qualidade (GMP, ANVISA)',
      '  • Manter lista atualizada de tudo que está tomando',
      '  • Reavaliação profissional a cada 3 meses'
    ]
  },
  
  byCategory: {
    probiotics: {
      name: 'Probióticos',
      contraindications: [
        '⚠️ ABSOLUTA: Imunocomprometidos graves (AIDS, quimioterapia ativa, transplantados)',
        '⚠️ ABSOLUTA: Cateter venoso central (risco bacteremia/fungemia)',
        '⚠️ RELATIVA: Pancreatite aguda',
        '⚠️ RELATIVA: SIBO confirmado (pode exacerbar)',
        '⚠️ Prematuros <1500g',
        'ATENÇÃO: Suspender 48h antes de colonoscopia/exames digestivos'
      ]
    },
    
    omega3: {
      name: 'Ômega-3 (EPA/DHA)',
      contraindications: [
        '⚠️ Cirurgia em 7-14 dias (risco hemorrágico aumentado)',
        '⚠️ Anticoagulantes - AJUSTAR dose com profissional de saúde (Warfarina, Heparina, NOACs)',
        '⚠️ Distúrbios de coagulação (hemofilia, Von Willebrand, púrpura)',
        '⚠️ Alergia a peixes/mariscos (alternativa: ômega-3 de algas)',
        'CUIDADO: Refluxo - pode piorar (tomar com refeições)'
      ]
    },
    
    magnesium: {
      name: 'Magnésio',
      contraindications: [
        '⚠️ ABSOLUTA: Insuficiência renal grave (TFG <30mL/min) - hipermagnesemia',
        '⚠️ Bloqueio AV de 2º ou 3º grau',
        '⚠️ Miastenia gravis',
        '⚠️ Diarreia crônica (magnésio é laxativo osmótico)',
        'ATENÇÃO: Reduz absorção de antibióticos (tetraciclinas, quinolonas) - espaçar 2h'
      ]
    },
    
    vitaminD: {
      name: 'Vitamina D3',
      contraindications: [
        '⚠️ Hipercalcemia (Ca sérico >10.5mg/dL)',
        '⚠️ Sarcoidose ou outras doenças granulomatosas',
        '⚠️ Hiperparatireoidismo primário',
        '⚠️ Linfomas (produção ectópica de vitamina D)',
        'MONITORAR: Níveis séricos de 25(OH)D (ideal 40-60ng/mL, tóxico >100ng/mL)',
        'ATENÇÃO: Intoxicação causa hipercalcemia (náuseas, fraqueza, arritmia, nefrocalcinose)'
      ]
    },
    
    herbsSene: {
      name: 'Sene (Laxante Antraquinônico)',
      contraindications: [
        '⚠️ ABSOLUTA: Obstrução intestinal, íleo paralítico',
        '⚠️ ABSOLUTA: Apendicite, doença inflamatória intestinal ativa (Crohn, retocolite)',
        '⚠️ Gravidez (estimula peristaltismo uterino)',
        '⚠️ USO CRÔNICO: Máximo 7-10 dias (risco de melanose coli, dependência, hipocalemia)',
        '⚠️ Crianças <12 anos',
        'ATENÇÃO: Pode interferir com digoxina, diuréticos (perda de potássio)'
      ]
    },
    
    herbsGinkgo: {
      name: 'Ginkgo Biloba',
      contraindications: [
        '⚠️ ABSOLUTA: Cirurgia em 7 dias (risco hemorragia intracraniana)',
        '⚠️ Epilepsia não controlada (reduz limiar convulsivo)',
        '⚠️ Anticoagulantes/Antiagregantes (Warfarina, Clopidogrel, AAS)',
        '⚠️ Distúrbios de coagulação',
        'CASOS RELATADOS: Hemorragia subaracnóide, hifema ocular',
        'ATENÇÃO: Interação com IMAOs, insulina'
      ]
    },
    
    herbsGinseng: {
      name: 'Ginseng (Panax)',
      contraindications: [
        '⚠️ Hipertensão não controlada (pode elevar PA)',
        '⚠️ Insônia, ansiedade, mania (efeito estimulante)',
        '⚠️ Diabetes descompensado (pode alterar glicemia)',
        '⚠️ Anticoagulantes (reduz eficácia da Warfarina)',
        '⚠️ Câncer hormônio-dependente (efeito estrogênico)',
        'ATENÇÃO: Síndrome de abuso de ginseng (insônia, hipertensão, edema, diarreia)'
      ]
    },
    
    herbsStJohnsWort: {
      name: 'Erva de São João (Hypericum)',
      contraindications: [
        '⚠️ MÚLTIPLAS INTERAÇÕES GRAVES - Indutor CYP3A4/CYP2C9',
        '⚠️ Reduz eficácia: Anticoncepcionais orais (risco de gravidez)',
        '⚠️ Reduz eficácia: Warfarina (risco trombose)',
        '⚠️ Reduz eficácia: Quimioterápicos (irinotecan, imatinib)',
        '⚠️ Síndrome serotoninérgica com ISRS, IMAOs (potencialmente fatal)',
        '⚠️ Fotossensibilização (evitar exposição solar)',
        '⚠️ Transplantados (reduz níveis de imunossupressores - rejeição)'
      ]
    },
    
    acupuncture: {
      name: 'Acupuntura',
      contraindications: [
        '⚠️ Distúrbios de coagulação graves não controlados',
        '⚠️ Infecção de pele no local da punção',
        '⚠️ Válvulas cardíacas artificiais (risco endocardite - profilaxia antibiótica)',
        '⚠️ Gravidez: EVITAR pontos IG4, BP6, VB21, VB34 (induzem parto)',
        '⚠️ Cuidado com pneumotórax em pontos torácicos',
        'ATENÇÃO: Marca-passo - contraindicação para eletroacupuntura'
      ]
    },
    
    fasting: {
      name: 'Jejum Intermitente',
      contraindications: [
        '⚠️ ABSOLUTA: Gravidez, lactação',
        '⚠️ ABSOLUTA: Diabetes tipo 1',
        '⚠️ ABSOLUTA: Transtornos alimentares (anorexia, bulimia, ortorexia)',
        '⚠️ Desnutrição, IMC <18.5',
        '⚠️ Crianças/adolescentes em crescimento',
        '⚠️ Idosos frágeis (sarcopenia)',
        '⚠️ Diabetes tipo 2 insulinodependente (risco hipoglicemia - AJUSTAR)',
        '⚠️ Gestação em risco',
        'ATENÇÃO: Monitorar glicemia se diabético, pressão arterial se hipotenso'
      ]
    },
    
    colonic: {
      name: 'Hidroterapia Colônica',
      contraindications: [
        '⚠️ ABSOLUTA: Diverticulite aguda',
        '⚠️ ABSOLUTA: Doença de Crohn ativa, retocolite ulcerativa em atividade',
        '⚠️ ABSOLUTA: Câncer colorretal, pólipos grandes',
        '⚠️ ABSOLUTA: Perfuração intestinal prévia, fístulas',
        '⚠️ ABSOLUTA: Cirurgia abdominal/colônica recente (<6 meses)',
        '⚠️ Hemorroidas graves com sangramento',
        '⚠️ Insuficiência cardíaca descompensada',
        '⚠️ Insuficiência renal grave',
        '⚠️ Gravidez',
        'RISCO: Perfuração intestinal (rara mas grave), desequilíbrio eletrolítico'
      ]
    }
  },
  
  pregnancyLactation: {
    title: 'Contraindicações em Gestação e Lactação',
    safeOptions: [
      '✓ SEGUROS na gravidez:',
      '  • Ácido fólico 400-800mcg/dia',
      '  • Ferro (se anemia)',
      '  • Ômega-3 DHA 200-300mg/dia (não exceder)',
      '  • Probióticos (cepas seguras)',
      '  • Gengibre para náuseas (até 1g/dia)',
      '  • Camomila, melissa (uso moderado)'
    ],
    avoid: [
      '⚠️ EVITAR na gravidez:',
      '  • Vitamina A >10.000UI/dia (teratogênico)',
      '  • Laxantes estimulantes (Sene, cáscara sagrada) - risco aborto',
      '  • Ashwagandha - abortivo',
      '  • Dong quai, Cohosh azul - estimulam útero',
      '  • Ginseng, Rhodiola - estimulantes',
      '  • Erva de São João - múltiplas interações',
      '  • Acupuntura em pontos proibidos (IG4, BP6, VB21)',
      '  • Jejum intermitente',
      '  • Doses altas de vitamina D, magnésio'
    ]
  },
  
  pediatric: {
    title: 'Precauções Pediátricas',
    guidelines: [
      '⚠️ Crianças NÃO são adultos pequenos - farmacocinética diferente',
      '⚠️ Evitar automedicação - consultar pediatra sempre',
      '',
      'AJUSTES DE DOSE (geralmente por peso em kg):',
      '  • Probióticos: 1-10 bilhões UFC (< 5 anos), 10-20 bilhões (> 5 anos)',
      '  • Ômega-3: 250-500mg (< 12 anos)',
      '  • Vitamina D: 400-600UI (< 1 ano), 600-1000UI (> 1 ano)',
      '  • Magnésio: 3-6mg/kg/dia',
      '',
      'CONTRAINDICADOS <12 anos:',
      '  • Laxantes estimulantes (Sene)',
      '  • Fitoterápicos potentes (Ginseng, Rhodiola, Kava)',
      '  • Acupuntura (relativo - depende da criança)',
      '  • Jejum intermitente'
    ]
  },
  
  geriatric: {
    title: 'Precauções Geriátricas (>65 anos)',
    considerations: [
      '⚠️ Polifarmácia - risco de interações aumenta exponencialmente',
      '⚠️ Função renal e hepática reduzidas - ajustar doses',
      '⚠️ Risco aumentado de sangramentos (anticoagulantes + ômega-3, ginkgo)',
      '⚠️ Sarcopenia - evitar jejuns prolongados',
      '',
      'CRITÉRIOS DE BEERS - Evitar em idosos:',
      '  • Anti-histamínicos de 1ª geração',
      '  • Benzodiazepínicos de longa ação',
      '  • Antipsicóticos (risco de AVC, mortalidade)',
      '',
      'COMEÇAR COM DOSES BAIXAS:',
      '  • "Start low, go slow"',
      '  • Monitorar função renal (creatinina, TFG)',
      '  • Atenção especial a tonturas, quedas'
    ]
  }
};

/**
 * Retorna contraindicações relevantes para uma lista de suplementos/herbs
 */
export function getRelevantContraindications(items = []) {
  const contraindications = [];
  
  if (items.includes('probiotics') || items.some(i => i.toLowerCase().includes('probiótico'))) {
    contraindications.push(CONTRAINDICATIONS_GUIDE.byCategory.probiotics);
  }
  if (items.includes('omega3') || items.some(i => i.toLowerCase().includes('ômega') || i.toLowerCase().includes('omega'))) {
    contraindications.push(CONTRAINDICATIONS_GUIDE.byCategory.omega3);
  }
  if (items.includes('magnesium') || items.some(i => i.toLowerCase().includes('magnésio') || i.toLowerCase().includes('magnesio'))) {
    contraindications.push(CONTRAINDICATIONS_GUIDE.byCategory.magnesium);
  }
  if (items.includes('vitaminD') || items.some(i => i.toLowerCase().includes('vitamina d') || i.toLowerCase().includes('d3'))) {
    contraindications.push(CONTRAINDICATIONS_GUIDE.byCategory.vitaminD);
  }
  if (items.some(i => i.toLowerCase().includes('sene') || i.toLowerCase().includes('sena'))) {
    contraindications.push(CONTRAINDICATIONS_GUIDE.byCategory.herbsSene);
  }
  if (items.some(i => i.toLowerCase().includes('ginkgo'))) {
    contraindications.push(CONTRAINDICATIONS_GUIDE.byCategory.herbsGinkgo);
  }
  if (items.some(i => i.toLowerCase().includes('ginseng'))) {
    contraindications.push(CONTRAINDICATIONS_GUIDE.byCategory.herbsGinseng);
  }
  if (items.some(i => i.toLowerCase().includes('acupuntura'))) {
    contraindications.push(CONTRAINDICATIONS_GUIDE.byCategory.acupuncture);
  }
  if (items.some(i => i.toLowerCase().includes('jejum'))) {
    contraindications.push(CONTRAINDICATIONS_GUIDE.byCategory.fasting);
  }
  if (items.some(i => i.toLowerCase().includes('hidroterapia colônica') || i.toLowerCase().includes('colonic'))) {
    contraindications.push(CONTRAINDICATIONS_GUIDE.byCategory.colonic);
  }
  
  // Sempre incluir precauções gerais
  contraindications.push({
    name: 'Precauções Gerais',
    contraindications: CONTRAINDICATIONS_GUIDE.general.alerts
  });
  
  return contraindications;
}
