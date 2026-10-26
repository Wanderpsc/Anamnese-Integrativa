/**
 * Base de Dados EXPANDIDA de Homeopatia
 * Mais de 100 condições de saúde com múltiplos remédios
 * Cobertura abrangente de problemas comuns
 * 
 * VALIDAÇÃO CIENTÍFICA:
 * - Guia Homeopático Dr. Nilo Cairo
 * - Repertório Clínico Homeopático por Patologias
 * - Homeopatia Essencial - José Maria Alves
 * - Apostila de Naturopatia Integrativa IVM 2.0
 * - Matéria Médica Homeopática
 * 
 * Fontes disponíveis em: src/assets/therapeutic-data/
 */

export const HOMEOPATHY_DATABASE_EXPANDED = {
  // Sistema Digestivo
  'Azia': {
    remedies: [{name: 'Nux Vomica 30CH', indications: 'Azia após refeições pesadas', dosage: '5 glóbulos 3x/dia', duration: '15 dias'}]
  },
  'Gastrite': {
    remedies: [{name: 'Arsenicum Album 30CH', indications: 'Gastrite, queimação estomacal', dosage: '5 glóbulos 3x/dia', duration: '30 dias'}]
  },
  'Úlcera': {
    remedies: [{name: 'Argentum Nitricum 30CH', indications: 'Úlcera péptica, gases', dosage: '5 glóbulos 2x/dia', duration: '60 dias'}]
  },
  'Constipação': {
    remedies: [{name: 'Bryonia 30CH', indications: 'Intestino preso, fezes ressecadas', dosage: '5 glóbulos 2x/dia', duration: '20 dias'}]
  },
  'Diarreia': {
    remedies: [{name: 'Podophyllum 30CH', indications: 'Diarreia explosiva, cólicas', dosage: '5 glóbulos de 2/2h', duration: '3 dias'}]
  },
  'Gases': {
    remedies: [{name: 'Carbo Vegetabilis 30CH', indications: 'Gases, distensão abdominal', dosage: '5 glóbulos 3x/dia', duration: '15 dias'}]
  },
  'Enjôo': {
    remedies: [{name: 'Cocculus 30CH', indications: 'Náusea, enjôo de viagem', dosage: '5 glóbulos antes de viajar', duration: 'SOS'}]
  },
  'Cólica': {
    remedies: [{name: 'Colocynthis 30CH', indications: 'Cólicas abdominais intensas', dosage: '5 glóbulos de 1/1h', duration: 'Até alívio'}]
  },
  
  // Sistema Hepático (Fígado)
  'Gordura no Fígado': {
    remedies: [
      {name: 'Chelidonium 6CH', potency: '6CH', indications: 'Esteatose hepática, gordura no fígado, fígado sobrecarregado', dosage: '10 gotas 3x/dia antes das refeições', duration: '90 dias'},
      {name: 'Lycopodium 30CH', potency: '30CH', indications: 'Fígado congesto, digestão lenta, gases após comer', dosage: '5 glóbulos 2x/dia', duration: '60 dias'},
      {name: 'Carduus Marianus 6CH', potency: '6CH', indications: 'Desintoxicação hepática, regeneração do fígado', dosage: '10 gotas 3x/dia', duration: '90 dias'}
    ],
    references: [
      'Guia Homeopático Dr. Nilo Cairo - Chelidonium majus: principal remédio para afecções hepáticas',
      'Repertório Clínico Homeopático - Lycopodium: congestão hepática, esteatose',
      'Matéria Médica - Carduus Marianus: regenerador hepático, esteatose'
    ],
    safety: 'Acompanhamento médico recomendado. Realizar exames laboratoriais periódicos (TGO, TGP, GGT).'
  },
  'Esteatose Hepática': {
    remedies: [{name: 'Chelidonium 6CH', potency: '6CH', indications: 'Gordura no fígado, fígado sobrecarregado', dosage: '10 gotas 3x/dia', duration: '90 dias'}]
  },
  'Fígado Gordo': {
    remedies: [{name: 'Chelidonium 6CH', potency: '6CH', indications: 'Esteatose hepática, fígado congesto', dosage: '10 gotas 3x/dia', duration: '90 dias'}]
  },
  'Hepatite': {
    remedies: [
      {name: 'Phosphorus 30CH', potency: '30CH', indications: 'Hepatite aguda, inflamação hepática', dosage: '5 glóbulos 3x/dia', duration: '30 dias com acompanhamento'},
      {name: 'Lycopodium 30CH', potency: '30CH', indications: 'Hepatite crônica, regeneração hepática', dosage: '5 glóbulos 2x/dia', duration: '90 dias'}
    ]
  },
  'Cirrose': {
    remedies: [{name: 'Phosphorus 200CH', potency: '200CH', indications: 'Cirrose hepática, regeneração celular (uso complementar)', dosage: '5 glóbulos 1x/semana', duration: 'Acompanhamento médico obrigatório'}]
  },
  'Pedra na Vesícula': {
    remedies: [
      {name: 'Chelidonium 6CH', potency: '6CH', indications: 'Cálculo biliar, dor sob costela direita', dosage: '10 gotas 3x/dia', duration: '90 dias'},
      {name: 'China Officinalis 30CH', potency: '30CH', indications: 'Cólica biliar, gases, distensão', dosage: '5 glóbulos 3x/dia', duration: '30 dias'}
    ]
  },
  'Colecistite': {
    remedies: [{name: 'Chelidonium 6CH', potency: '6CH', indications: 'Inflamação da vesícula biliar', dosage: '10 gotas de 2/2h (fase aguda)', duration: '3-7 dias + acompanhamento'}]
  },
  'Intoxicação Hepática': {
    remedies: [
      {name: 'Nux Vomica 30CH', potency: '30CH', indications: 'Intoxicação por álcool, medicamentos, alimentos', dosage: '5 glóbulos 4x/dia', duration: '7-15 dias'},
      {name: 'Carduus Marianus 6CH', potency: '6CH', indications: 'Desintoxicação hepática', dosage: '10 gotas 3x/dia', duration: '30 dias'}
    ]
  },
  
  // Sistema Respiratório
  'Gripe': {
    remedies: [{name: 'Oscillococcinum 200K', indications: 'Sintomas iniciais de gripe', dosage: '1 dose', duration: '1-3 dias'}]
  },
  'Resfriado': {
    remedies: [{name: 'Aconitum 30CH', indications: 'Início súbito de resfriado', dosage: '5 glóbulos de 2/2h', duration: '24-48h'}]
  },
  'Tosse Seca': {
    remedies: [{name: 'Bryonia 30CH', indications: 'Tosse seca, dor no peito', dosage: '5 glóbulos 4x/dia', duration: '7 dias'}]
  },
  'Tosse com Catarro': {
    remedies: [{name: 'Pulsatilla 30CH', indications: 'Tosse produtiva, catarro amarelo', dosage: '5 glóbulos 3x/dia', duration: '10 dias'}]
  },
  'Sinusite': {
    remedies: [{name: 'Kali Bichromicum 30CH', indications: 'Sinusite, secreção espessa', dosage: '5 glóbulos 3x/dia', duration: '15 dias'}]
  },
  'Rinite': {
    remedies: [{name: 'Allium Cepa 30CH', indications: 'Rinite alérgica, coriza', dosage: '5 glóbulos 3x/dia', duration: '15 dias'}]
  },
  'Asma': {
    remedies: [{name: 'Arsenicum Album 30CH', indications: 'Asma, dificuldade respiratória', dosage: '5 glóbulos 3x/dia', duration: '60 dias'}]
  },
  'Bronquite': {
    remedies: [{name: 'Antimonium Tartaricum 30CH', indications: 'Bronquite, catarro no peito', dosage: '5 glóbulos 4x/dia', duration: '10 dias'}]
  },
  
  // Sistema Nervoso e Emocional
  'Ansiedade': {
    remedies: [
      {name: 'Ignatia 30CH', indications: 'Ansiedade emocional, nó na garganta, hipersensibilidade', dosage: '5 glóbulos 3x/dia', duration: '30 dias'},
      {name: 'Aconitum Napellus 30CH', indications: 'Ansiedade súbita, pânico, medo intenso', dosage: '5 glóbulos de 1/1h', duration: 'SOS durante crise'},
      {name: 'Gelsemium 30CH', indications: 'Ansiedade antecipatória, tremores, fraqueza', dosage: '5 glóbulos 3x/dia', duration: '30 dias'}
    ],
    references: [
      'Guia Homeopático Dr. Nilo Cairo - Ignatia amara: ansiedade emocional',
      'Gelsemium - O Remédio das Grandes Sensibilidades (therapeutic-data)',
      'Apostila de Psicoterapia IVM - Protocolos Ansiedade'
    ],
    safety: 'Se sintomas persistirem >30 dias, buscar acompanhamento médico.'
  },
  'Estresse': {
    remedies: [
      {name: 'Nux Vomica 30CH', indications: 'Estresse, irritabilidade, excesso de trabalho', dosage: '5 glóbulos 3x/dia', duration: '30 dias'},
      {name: 'Phosphoricum Acidum 30CH', indications: 'Esgotamento mental por estresse, apatia', dosage: '5 glóbulos 2x/dia', duration: '30 dias'},
      {name: 'Kali Phosphoricum 6CH', indications: 'Fadiga nervosa, estresse com insônia', dosage: '10 gotas 3x/dia', duration: '30 dias'}
    ],
    references: [
      'Guia Homeopático Dr. Nilo Cairo - Nux vomica: estresse por excesso',
      'Repertório Clínico - Phosphoricum acidum: esgotamento',
      'Apostila Naturopatia IVM - Sistema Nervoso'
    ]
  },
  'Depressão': {
    remedies: [
      {name: 'Aurum Metallicum 30CH', indications: 'Depressão profunda, desânimo, pensamentos sombrios', dosage: '5 glóbulos 2x/dia', duration: '60 dias'},
      {name: 'Natrum Muriaticum 30CH', indications: 'Depressão por tristeza guardada, choro silencioso, isolamento', dosage: '5 glóbulos 2x/dia', duration: '60 dias'},
      {name: 'Sepia 30CH', indications: 'Depressão hormonal, indiferença afetiva, irritabilidade', dosage: '5 glóbulos 2x/dia', duration: '60 dias'}
    ],
    references: [
      'Guia Homeopático Dr. Nilo Cairo - Aurum metallicum: depressão melancólica',
      'Repertório Clínico - Natrum muriaticum: depressão por luto, tristeza',
      'Apostila Psicoterapia IVM - Protocolos Depressão',
      'E-book: Ansiedade e Depressão (therapeutic-data)'
    ],
    safety: '⚠️ ATENÇÃO: Depressão requer acompanhamento médico especializado. Homeopatia como terapia complementar.',
    emergency: 'Pensamentos suicidas: buscar atendimento de emergência imediatamente.'
  },
  'Insônia': {
    remedies: [
      {name: 'Coffea Cruda 30CH', indications: 'Insônia por mente ativa, hiperexcitação', dosage: '5 glóbulos antes de dormir', duration: '30 dias'},
      {name: 'Nux Vomica 30CH', indications: 'Insônia por excesso de trabalho, acorda 3-4h da manhã', dosage: '5 glóbulos antes de dormir', duration: '30 dias'},
      {name: 'Passiflora 6CH', indications: 'Insônia leve, dificuldade para adormecer', dosage: '10 gotas antes de dormir', duration: '15 dias'}
    ],
    references: [
      'Guia Homeopático Dr. Nilo Cairo - Coffea cruda: insônia',
      'Programa Viva Melhor 2.0 - Melhora do Sono (therapeutic-data)',
      'Apostila Naturopatia IVM - Protocolos Sono'
    ],
    safety: 'Higiene do sono essencial: evitar telas 1h antes, ambiente escuro e fresco.'
  },
  'Pânico': {
    remedies: [{name: 'Aconitum 200CH', indications: 'Ataques de pânico, medo intenso', dosage: '5 glóbulos dose única', duration: 'SOS'}]
  },
  'Irritabilidade': {
    remedies: [{name: 'Chamomilla 30CH', indications: 'Irritabilidade extrema, impaciência', dosage: '5 glóbulos 3x/dia', duration: '15 dias'}]
  },
  'Tristeza': {
    remedies: [{name: 'Natrum Muriaticum 30CH', indications: 'Tristeza, choro contido', dosage: '5 glóbulos 2x/dia', duration: '60 dias'}]
  },
  'Fadiga Mental': {
    remedies: [{name: 'Phosphoricum Acidum 30CH', indications: 'Esgotamento mental, apatia', dosage: '5 glóbulos 2x/dia', duration: '45 dias'}]
  },
  
  // Sistema Cardiovascular
  'Hipertensão': {
    remedies: [{name: 'Crataegus 6CH', indications: 'Pressão alta, palpitações', dosage: '10 gotas 3x/dia', duration: 'Contínuo'}]
  },
  'Palpitações': {
    remedies: [{name: 'Digitalis 30CH', indications: 'Palpitações, arritmia', dosage: '5 glóbulos 2x/dia', duration: '30 dias'}]
  },
  'Colesterol': {
    remedies: [{name: 'Cholesterinum 30CH', indications: 'Colesterol elevado', dosage: '5 glóbulos 2x/dia', duration: '90 dias'}]
  },
  'Varizes': {
    remedies: [{name: 'Hamamelis 30CH', indications: 'Varizes, veias dilatadas', dosage: '5 glóbulos 3x/dia', duration: '60 dias'}]
  },
  
  // Sistema Endócrino e Metabólico
  'Diabetes': {
    remedies: [{name: 'Syzygium Jambolanum 3X', indications: 'Diabetes tipo 2, glicemia alta', dosage: '10 gotas 3x/dia', duration: 'Contínuo'}]
  },
  'Tireoide (Hipo)': {
    remedies: [{name: 'Thyroidinum 30CH', indications: 'Hipotireoidismo, metabolismo lento', dosage: '5 glóbulos 2x/dia', duration: '90 dias'}]
  },
  'Tireoide (Hiper)': {
    remedies: [{name: 'Iodum 30CH', indications: 'Hipertireoidismo, taquicardia', dosage: '5 glóbulos 2x/dia', duration: '90 dias'}]
  },
  'Obesidade': {
    remedies: [{name: 'Fucus Vesiculosus 6CH', indications: 'Obesidade, metabolismo lento', dosage: '10 gotas 3x/dia', duration: '180 dias'}]
  },
  
  // Sistema Musculoesquelético
  'Artrite': {
    remedies: [{name: 'Rhus Toxicodendron 30CH', indications: 'Artrite, rigidez articular', dosage: '5 glóbulos 3x/dia', duration: '60 dias'}]
  },
  'Artrose': {
    remedies: [{name: 'Calcarea Fluorica 6X', indications: 'Artrose, desgaste articular', dosage: '5 comprimidos 3x/dia', duration: '180 dias'}]
  },
  'Bursite': {
    remedies: [{name: 'Ruta Graveolens 30CH', indications: 'Bursite, tendinite', dosage: '5 glóbulos 3x/dia', duration: '30 dias'}]
  },
  'Fibromialgia': {
    remedies: [{name: 'Arnica Montana 30CH', indications: 'Dores musculares difusas', dosage: '5 glóbulos 4x/dia', duration: '90 dias'}]
  },
  'Ciática': {
    remedies: [{name: 'Colocynthis 30CH', indications: 'Dor ciática, formigamento', dosage: '5 glóbulos 3x/dia', duration: '30 dias'}]
  },
  'Dor nas Costas': {
    remedies: [{name: 'Kalium Carbonicum 30CH', indications: 'Dor lombar, fraqueza', dosage: '5 glóbulos 3x/dia', duration: '45 dias'}]
  },
  'Osteoporose': {
    remedies: [{name: 'Calcarea Phosphorica 6X', indications: 'Fragilidade óssea, osteoporose', dosage: '5 comprimidos 3x/dia', duration: '180 dias'}]
  },
  'Cãibras': {
    remedies: [{name: 'Cuprum Metallicum 30CH', indications: 'Cãibras musculares', dosage: '5 glóbulos SOS', duration: 'Conforme necessidade'}]
  },
  
  // Sistema Urinário
  'Cistite': {
    remedies: [{name: 'Cantharis 30CH', indications: 'Cistite, ardência ao urinar', dosage: '5 glóbulos de 2/2h', duration: '3-5 dias'}]
  },
  'Pedra nos Rins': {
    remedies: [{name: 'Berberis Vulgaris 6CH', indications: 'Cálculo renal, cólica', dosage: '10 gotas 4x/dia', duration: '60 dias'}]
  },
  'Incontinência': {
    remedies: [{name: 'Causticum 30CH', indications: 'Incontinência urinária', dosage: '5 glóbulos 2x/dia', duration: '90 dias'}]
  },
  'Retenção Urinária': {
    remedies: [{name: 'Pareira Brava 6CH', indications: 'Dificuldade para urinar', dosage: '10 gotas 3x/dia', duration: '30 dias'}]
  },
  
  // Sistema Reprodutor
  'TPM': {
    remedies: [{name: 'Sepia 30CH', indications: 'TPM, irritabilidade, fadiga', dosage: '5 glóbulos 2x/dia', duration: '30 dias'}]
  },
  'Cólica Menstrual': {
    remedies: [{name: 'Magnesia Phosphorica 6X', indications: 'Cólicas menstruais intensas', dosage: '5 comprimidos de 1/1h', duration: 'Durante cólica'}]
  },
  'Menopausa': {
    remedies: [{name: 'Lachesis 30CH', indications: 'Ondas de calor, irritabilidade', dosage: '5 glóbulos 2x/dia', duration: '90 dias'}]
  },
  'Menstruação Irregular': {
    remedies: [{name: 'Pulsatilla 30CH', indications: 'Ciclo irregular, ausência', dosage: '5 glóbulos 2x/dia', duration: '60 dias'}]
  },
  'Candidíase': {
    remedies: [{name: 'Borax 30CH', indications: 'Candidíase vaginal, corrimento', dosage: '5 glóbulos 3x/dia', duration: '15 dias'}]
  },
  'Próstata': {
    remedies: [{name: 'Sabal Serrulata 6CH', indications: 'Hiperplasia prostática', dosage: '10 gotas 3x/dia', duration: '90 dias'}]
  },
  
  // Pele
  'Acne': {
    remedies: [{name: 'Antimonium Crudum 30CH', indications: 'Acne, cravos, pele oleosa', dosage: '5 glóbulos 2x/dia', duration: '60 dias'}]
  },
  'Eczema': {
    remedies: [{name: 'Graphites 30CH', indications: 'Eczema, rachaduras, secreção', dosage: '5 glóbulos 2x/dia', duration: '90 dias'}]
  },
  'Psoríase': {
    remedies: [{name: 'Arsenicum Album 30CH', indications: 'Psoríase, descamação', dosage: '5 glóbulos 2x/dia', duration: '180 dias'}]
  },
  'Urticária': {
    remedies: [{name: 'Apis Mellifica 30CH', indications: 'Urticária, coceira, inchaço', dosage: '5 glóbulos de 2/2h', duration: 'Até alívio'}]
  },
  'Herpes': {
    remedies: [{name: 'Rhus Toxicodendron 30CH', indications: 'Herpes labial, zoster', dosage: '5 glóbulos 4x/dia', duration: '10 dias'}]
  },
  'Verruga': {
    remedies: [{name: 'Thuja Occidentalis 30CH', indications: 'Verrugas, crescimentos', dosage: '5 glóbulos 2x/dia', duration: '90 dias'}]
  },
  'Queimadura': {
    remedies: [{name: 'Cantharis 30CH', indications: 'Queimaduras, bolhas', dosage: '5 glóbulos de 2/2h', duration: '5-7 dias'}]
  },
  'Cicatrização': {
    remedies: [{name: 'Calendula 6CH', indications: 'Feridas, cicatrização lenta', dosage: '5 glóbulos 3x/dia', duration: '15 dias'}]
  },
  'Melasma': {
    remedies: [
      {name: 'Sepia 30CH', potency: '30CH', indications: 'Melasma, manchas escuras no rosto (testa, bochechas, buço), cloasma gravídico, hiperpigmentação hormonal', dosage: '5 glóbulos 2x/dia', duration: '90 dias'},
      {name: 'Lycopodium 30CH', potency: '30CH', indications: 'Manchas escuras no rosto, pigmentação irregular, associada a problemas digestivos', dosage: '5 glóbulos 2x/dia', duration: '60 dias'},
      {name: 'Berberis Aquifolium 6CH', potency: '6CH', indications: 'Manchas na pele, melasma, acne, clareia a pele', dosage: '10 gotas 3x/dia', duration: '90 dias'}
    ],
    references: [
      'Guia Homeopático Dr. Nilo Cairo - Sepia officinalis: principal remédio para melasma e manchas hormonais',
      'Repertório Clínico Homeopático - Sepia: hiperpigmentação, cloasma gravídico, distúrbios hormonais femininos',
      'Matéria Médica - Berberis Aquifolium: clareador de pele, manchas, acne'
    ],
    safety: 'Uso prolongado necessário (mínimo 3 meses). Proteger pele do sol (FPS 50+). Resultados visíveis após 60-90 dias.',
    note: '⚠️ IMPORTANTE: Ignatia NÃO é indicada para melasma - é exclusivamente para ansiedade emocional.'
  },
  'Escurecimento da Pele': {
    remedies: [
      {name: 'Sepia 30CH', potency: '30CH', indications: 'Hiperpigmentação, manchas escuras, melasma', dosage: '5 glóbulos 2x/dia', duration: '90 dias'},
      {name: 'Thuja Occidentalis 30CH', potency: '30CH', indications: 'Manchas escuras, verrugas pigmentadas', dosage: '5 glóbulos 2x/dia', duration: '60 dias'}
    ]
  },
  'Manchas Escuras': {
    remedies: [
      {name: 'Sepia 30CH', potency: '30CH', indications: 'Manchas marrom-escuras no rosto, melasma', dosage: '5 glóbulos 2x/dia', duration: '90 dias'},
      {name: 'Berberis Aquifolium 6CH', potency: '6CH', indications: 'Manchas na pele, hiperpigmentação', dosage: '10 gotas 3x/dia', duration: '90 dias'}
    ]
  },
  'Cloasma Gravídico': {
    remedies: [{name: 'Sepia 200CH', potency: '200CH', indications: 'Manchas escuras na gravidez, melasma gestacional', dosage: '5 glóbulos 1x/semana', duration: 'Durante gestação com acompanhamento'}]
  },
  
  // Cabeça e Olhos
  'Enxaqueca': {
    remedies: [{name: 'Belladonna 30CH', indications: 'Enxaqueca pulsátil, fotofobia', dosage: '5 glóbulos de 1/1h', duration: 'Durante crise'}]
  },
  'Cefaleia Tensional': {
    remedies: [{name: 'Gelsemium 30CH', indications: 'Dor de cabeça por tensão', dosage: '5 glóbulos 3x/dia', duration: '15 dias'}]
  },
  'Conjuntivite': {
    remedies: [{name: 'Euphrasia 6CH', indications: 'Conjuntivite, olhos lacrimejantes', dosage: '5 glóbulos 4x/dia', duration: '7 dias'}]
  },
  'Terçol': {
    remedies: [{name: 'Staphysagria 30CH', indications: 'Terçol, inflamação palpebral', dosage: '5 glóbulos 3x/dia', duration: '5 dias'}]
  },
  'Tontura': {
    remedies: [{name: 'Cocculus 30CH', indications: 'Tontura, vertigem, náusea', dosage: '5 glóbulos 3x/dia', duration: '15 dias'}]
  },
  'Labirintite': {
    remedies: [{name: 'Conium Maculatum 30CH', indications: 'Labirintite, vertigem rotatória', dosage: '5 glóbulos 3x/dia', duration: '30 dias'}]
  },
  
  // Boca e Garganta
  'Afta': {
    remedies: [{name: 'Borax 30CH', indications: 'Aftas dolorosas na boca', dosage: '5 glóbulos 4x/dia', duration: '7 dias'}]
  },
  'Gengivite': {
    remedies: [{name: 'Mercurius Solubilis 30CH', indications: 'Gengivite, sangramento gengival', dosage: '5 glóbulos 3x/dia', duration: '15 dias'}]
  },
  'Dor de Garganta': {
    remedies: [{name: 'Belladonna 30CH', indications: 'Garganta vermelha, dor intensa', dosage: '5 glóbulos de 2/2h', duration: '3 dias'}]
  },
  'Amigdalite': {
    remedies: [{name: 'Hepar Sulphur 30CH', indications: 'Amigdalite, pus, dor', dosage: '5 glóbulos 3x/dia', duration: '10 dias'}]
  },
  'Rouquidão': {
    remedies: [{name: 'Phosphorus 30CH', indications: 'Rouquidão, laringite', dosage: '5 glóbulos 3x/dia', duration: '7 dias'}]
  },
  
  // Alergias
  'Alergia Respiratória': {
    remedies: [{name: 'Histaminum 30CH', indications: 'Alergias em geral, rinite', dosage: '5 glóbulos 2x/dia', duration: '60 dias'}]
  },
  'Alergia Alimentar': {
    remedies: [{name: 'Nux Vomica 30CH', indications: 'Intolerância alimentar, náusea', dosage: '5 glóbulos após refeições', duration: '30 dias'}]
  },
  'Alergia de Pele': {
    remedies: [{name: 'Sulphur 30CH', indications: 'Coceira, erupções alérgicas', dosage: '5 glóbulos 2x/dia', duration: '45 dias'}]
  },
  
  // Doenças Crônicas
  'Artrite Reumatoide': {
    remedies: [{name: 'Rhus Toxicodendron 30CH', indications: 'AR, rigidez matinal', dosage: '5 glóbulos 3x/dia', duration: '90 dias'}]
  },
  'Lúpus': {
    remedies: [{name: 'Arsenicum Album 200CH', indications: 'Lúpus eritematoso sistêmico', dosage: '5 glóbulos 1x/semana', duration: '6 meses'}]
  },
  'Esclerose Múltipla': {
    remedies: [{name: 'Phosphorus 200CH', indications: 'Esclerose múltipla, fadiga', dosage: '5 glóbulos 1x/semana', duration: 'Longo prazo'}]
  },
  
  // Vícios e Compulsões
  'Tabagismo': {
    remedies: [{name: 'Tabacum 30CH', indications: 'Parar de fumar, náusea', dosage: '5 glóbulos 3x/dia', duration: '60 dias'}]
  },
  'Alcoolismo': {
    remedies: [{name: 'Nux Vomica 30CH', indications: 'Desintoxicação de álcool', dosage: '5 glóbulos 3x/dia', duration: '90 dias'}]
  },
  'Compulsão Alimentar': {
    remedies: [{name: 'Antimonium Crudum 30CH', indications: 'Compulsão por doces', dosage: '5 glóbulos 2x/dia', duration: '60 dias'}]
  },
  
  // Traumas e Lesões
  'Contusão': {
    remedies: [{name: 'Arnica Montana 30CH', indications: 'Hematomas, contusões', dosage: '5 glóbulos 4x/dia', duration: '5 dias'}]
  },
  'Fratura': {
    remedies: [{name: 'Symphytum 30CH', indications: 'Consolidação de fraturas', dosage: '5 glóbulos 3x/dia', duration: '45 dias'}]
  },
  'Entorse': {
    remedies: [{name: 'Ruta Graveolens 30CH', indications: 'Entorse, lesão ligamentar', dosage: '5 glóbulos 4x/dia', duration: '15 dias'}]
  },
  'Corte': {
    remedies: [{name: 'Staphysagria 30CH', indications: 'Cortes cirúrgicos, lacerações', dosage: '5 glóbulos 3x/dia', duration: '10 dias'}]
  },
  
  // Crianças
  'Cólica do Bebê': {
    remedies: [{name: 'Chamomilla 30CH', indications: 'Cólica infantil, irritabilidade', dosage: '3 glóbulos de 2/2h', duration: 'Até alívio'}]
  },
  'Dentição': {
    remedies: [{name: 'Chamomilla 30CH', indications: 'Dor na dentição, febre leve', dosage: '3 glóbulos 3x/dia', duration: 'Durante fase'}]
  },
  'Assaduras': {
    remedies: [{name: 'Calendula pomada', indications: 'Assaduras, irritação', dosage: 'Aplicar a cada troca', duration: 'Até cura'}]
  },
  'Enurese': {
    remedies: [{name: 'Equisetum 30CH', indications: 'Xixi na cama', dosage: '5 glóbulos antes de dormir', duration: '90 dias'}]
  },
  
  // Sistema Imunológico
  'Imunidade Baixa': {
    remedies: [{name: 'Echinacea 6CH', indications: 'Fortalecer imunidade', dosage: '10 gotas 3x/dia', duration: '60 dias'}]
  },
  'Herpes Zoster': {
    remedies: [{name: 'Ranunculus Bulbosus 30CH', indications: 'Herpes zoster, dor', dosage: '5 glóbulos 4x/dia', duration: '21 dias'}]
  },
  'Mononucleose': {
    remedies: [{name: 'Mercurius Solubilis 30CH', indications: 'Mononucleose, fadiga', dosage: '5 glóbulos 3x/dia', duration: '60 dias'}]
  }
};

// Função de busca melhorada - PRIORIZA CORRESPONDÊNCIAS EXATAS
export function searchHomeopathy(searchTerm) {
  if (!searchTerm || searchTerm.trim().length === 0) return null;
  
  const term = searchTerm.toLowerCase().trim();
  
  // 1. BUSCA EXATA - prioridade máxima
  for (const [condition, data] of Object.entries(HOMEOPATHY_DATABASE_EXPANDED)) {
    if (condition.toLowerCase() === term) {
      return {
        remedies: data.remedies,
        condition
      };
    }
  }
  
  // 2. BUSCA CONTÉM A CONDIÇÃO COMPLETA
  for (const [condition, data] of Object.entries(HOMEOPATHY_DATABASE_EXPANDED)) {
    if (condition.toLowerCase().includes(term)) {
      return {
        remedies: data.remedies,
        condition
      };
    }
  }
  
  // 3. BUSCA ONDE O TERMO ESTÁ CONTIDO NA CONDIÇÃO
  for (const [condition, data] of Object.entries(HOMEOPATHY_DATABASE_EXPANDED)) {
    if (term.includes(condition.toLowerCase())) {
      return {
        remedies: data.remedies,
        condition
      };
    }
  }
  
  // 4. BUSCA POR PALAVRAS-CHAVE (última opção)
  const keywords = term.split(' ').filter(w => w.length > 3); // Ignora palavras pequenas como "no", "de", etc
  
  for (const [condition, data] of Object.entries(HOMEOPATHY_DATABASE_EXPANDED)) {
    const conditionWords = condition.toLowerCase().split(' ');
    
    // Verifica se pelo menos 70% das palavras-chave correspondem
    const matchCount = keywords.filter(kw => 
      conditionWords.some(cw => cw.includes(kw) || kw.includes(cw))
    ).length;
    
    if (matchCount >= Math.ceil(keywords.length * 0.7) && matchCount > 0) {
      return {
        remedies: data.remedies,
        condition
      };
    }
  }
  
  return null;
}

export default HOMEOPATHY_DATABASE_EXPANDED;
