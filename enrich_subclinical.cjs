const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/subclinicalIntegrativeData.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Enrichment data: dosagens corrigidas + contraindicacoes para cada item
const enrichments = {
  'sc-lingua-colon': {
    fitoterapia: [
      'Curcuma longa (açafrão-da-terra) 500mg 2x/dia com refeições — anti-inflamatório intestinal',
      'Melissa officinalis (erva-cidreira) 300mg 2x/dia — antiespasmódico digestivo e calmante',
      'Camellia sinensis (chá-verde) 200mg 2x/dia — antioxidante e modulador intestinal',
      'Cynara scolymus (alcachofra) 500mg 3x/dia — colerético e hepatoprotetor digestivo'
    ],
    contraindicacoes: [
      'Curcuma longa: gestantes, lactantes, cálculos biliares, uso de anticoagulantes (warfarina)',
      'Melissa officinalis: hipotireoidismo — pode reduzir função tireoidiana',
      'Camellia sinensis (chá-verde): gravidez, anemia ferropriva (inibe absorção de ferro), hipotensão',
      'Cynara scolymus: obstrução do ducto biliar, alergia a Asteraceae/Compositae',
      'Magnésio: insuficiência renal grave (creatinina > 2,0 mg/dL)'
    ]
  },
  'sc-intestino-delgado': {
    fitoterapia: [
      'Glycyrrhiza glabra (alcaçuz) 300-500mg 2x/dia — gastroprotetor e anti-ulceroso; máx. 3 semanas contínuas',
      'Aloe vera (gel interno) 50-100ml em jejum — cicatrizante e anti-inflamatório da mucosa',
      'Matricaria recutita (camomila) 400mg 3x/dia ou chá 3x/dia — antiespasmódico e anti-inflamatório',
      'Melissa officinalis (erva-cidreira) 300mg 2x/dia — calmante digestivo e antiespasmódico'
    ],
    contraindicacoes: [
      'Glycyrrhiza glabra: hipertensão arterial, hipocalemia, gestantes, insuficiência renal ou hepática; não usar >4 semanas',
      'Aloe vera interno: gestantes (estimula contrações uterinas), crianças <12 anos, diarreia ativa',
      'L-Glutamina: epilepsia, encefalopatia hepática, neoplasias ativas',
      'Zinco carnosina: não usar com antibióticos quinolonas ou tetraciclinas sem espaçamento de 2h'
    ]
  },
  'sc-bexiga': {
    fitoterapia: [
      'Equisetum arvense (cavalinha) chá 3x/dia ou 300mg extrato seco — diurético e remineralizante',
      'Solidago virgaurea (solidago) 300mg 3x/dia — anti-inflamatório das vias urinárias',
      'Arctostaphylos uva-ursi 400mg 3x/dia por 7-10 dias — antisséptico urinário (arbutina)',
      'Hibiscus sabdariffa (hibisco) chá ou extrato 500mg — diurético e antioxidante urinário'
    ],
    contraindicacoes: [
      'Arctostaphylos uva-ursi: gestantes, lactantes, crianças, insuficiência renal, uso prolongado >10 dias (hepatotóxico)',
      'Equisetum arvense: alcoolismo (contém tiaminase), gestantes, insuficiência cardíaca grave',
      'D-Manose: diabetes mellitus descompensado (monitorar glicemia)',
      'Diuréticos em geral: cautela com anti-hipertensivos e diuréticos prescritos (potencialização)'
    ]
  },
  'sc-manchas-rugas': {
    fitoterapia: [
      'Silybum marianum (cardo-mariano) 300mg 3x/dia (silimarina 70%) — hepatoproteção e regeneração',
      'Taraxacum officinale (dente-de-leão) 300-500mg 2x/dia — colagogo e depurativo hepático',
      'Schisandra chinensis 500mg 2x/dia — adaptógeno hepatoprotetor e antioxidante',
      'Rosmarinus officinalis (alecrim) 300mg ou chá 2x/dia — antioxidante e estimulante hepático'
    ],
    contraindicacoes: [
      'Silybum marianum: alergia a Asteraceae; cautela com medicamentos metabolizados pela CYP450 (ajustar dose com médico)',
      'Taraxacum officinale: obstrução biliar, úlcera péptica ativa, alergia a Asteraceae',
      'Schisandra chinensis: gestantes, epilepsia, hipertensão não controlada',
      'NAC: asma brônquica (pode precipitar broncoespasmo), cautela com anticoagulantes',
      'Alpha-lipoico: hipoglicemia em diabéticos (potencializa efeito de insulina) — monitorar glicemia'
    ]
  },
  'sc-sinais-faciais-gerais': {
    fitoterapia: [
      'Panax ginseng 200-400mg/dia (extrato padronizado 4% ginsenosídeos) — adaptógeno energético e imune',
      'Eleutherococcus senticosus (eleuterococo) 300-600mg/dia — adaptógeno, fadiga e imunidade',
      'Rhodiola rosea 300-500mg/dia (rosavinas 3%) — fadiga mental e resistência ao estresse',
      'Astragalus membranaceus 500-1000mg/dia — imunomodulador e energizante renal'
    ],
    contraindicacoes: [
      'Panax ginseng: hipertensão grave, insônia, ansiedade aguda, gestantes, sangramento ativo; cautela com anticoagulantes e antidiabéticos',
      'Rhodiola rosea: transtorno bipolar (pode precipitar mania), cautela com antidepressivos ISRS',
      'Coenzima Q10: cautela com varfarina (pode reduzir efeito anticoagulante)',
      'Ferro quelado: hemocromatose, anemia não ferropriva — solicitar ferritina antes de suplementar',
      'Ômega-3: cautela com anticoagulantes (>3g/dia aumenta risco de sangramento)'
    ]
  },
  'sc-calvicie-rins': {
    fitoterapia: [
      'Tribulus terrestris 300-500mg 2x/dia — estímulo da função androgênica e renal',
      'Withania somnifera (ashwagandha) 300-600mg/dia (withanolídeos 5%) — adaptógeno renal e hormonal',
      'Rehmannia glutinosa 500mg 2x/dia — tônico renal da MTC e modulador do cortisol',
      'Urtica dioica (urtiga) 300-500mg 2x/dia — mineralizante, renal e androgênico suave'
    ],
    contraindicacoes: [
      'Tribulus terrestris: gestantes, lactantes, neoplasias hormônio-dependentes, cautela com anti-hipertensivos',
      'Ashwagandha: gestantes (estimula contrações), hipotireoidismo autoimune (cautela), cirurgia (descontinuar 2 semanas antes)',
      'Magnésio glicinato: insuficiência renal grave (TFG < 30 mL/min)',
      'Vitamina D3: hipercalcemia, sarcoidose, linfoma; monitorar calcidiol antes de doses altas'
    ]
  },
  'sc-pescoco-circulacao': {
    fitoterapia: [
      'Ginkgo biloba 120-240mg/dia (EGb761) — circulação cerebral e anti-agregação plaquetária',
      'Crataegus oxyacantha (espinheiro branco) 160-900mg/dia — cardiotônico e vasodilatador',
      'Allium sativum (alho) 600-1200mg/dia em pó seco — antiaterosclerótico e anti-hipertensivo suave',
      'Valeriana officinalis 300-600mg ao dormir — miorrelaxante cervical e ansiolítico'
    ],
    contraindicacoes: [
      'Ginkgo biloba: anticoagulantes (varfarina, AAS — potencializa efeito), gestantes, epilepsia, 2 semanas antes de cirurgia',
      'Crataegus oxyacantha: hipotensão, uso de digoxina ou outros cardiotônicos — cautela com potencialização',
      'Valeriana: não combinar com benzodiazepínicos ou álcool (potencialização sedativa)',
      'Vitamina K2 MK-7: anticoagulantes cumarínicos (varfarina) — antagonismo; orientar médico',
      'Ômega-3 >3g/dia: anticoagulantes e AAS — risco de sangramento aumentado'
    ]
  },
  'sc-baco-pancreas': {
    fitoterapia: [
      'Gentiana lutea (genciana) 200-400mg antes das refeições — amargo digestivo e estimulante biliar',
      'Zingiber officinale (gengibre) 250-500mg 3x/dia ou chá fresco — digestivo, antiemético e anti-inflamatório',
      'Taraxacum officinale (dente-de-leão) 300mg 2x/dia — colerético e estimulante digestivo',
      'Fumaria officinalis (fumária) 300mg 3x/dia — regulador biliar e antiespasmódico digestivo'
    ],
    contraindicacoes: [
      'Gentiana lutea: úlcera péptica ativa, gastrite erosiva, hipotensão',
      'Zingiber officinale: cálculos biliares (estimula fluxo biliar), gestantes (doses terapêuticas altas), anticoagulantes',
      'Fumaria officinalis: gestantes, hipotensão arterial, epilepsia',
      'Betaína HCl: úlcera péptica ativa, gastrite, esofagite de refluxo — contraindicada',
      'Cromo picolinato: insuficiência renal; cautela em combinação com insulina e hipoglicemiantes'
    ]
  },
  'sc-mapa-facial': {
    fitoterapia: [
      'Abordagem individualizada conforme região afetada — consultar protocolos específicos'
    ],
    contraindicacoes: [
      'Este item é didático — consultar protocolos específicos de cada região para contraindicações detalhadas'
    ]
  },
  'sc-tipo-neurogeico': {
    fitoterapia: [
      'Passiflora incarnata 200-400mg 2x/dia — ansiolítico, antiespasmódico e hipnótico leve',
      'Valeriana officinalis 300-600mg ao dormir — hipnótico e ansiolítico (actua em GABA)',
      'Hypericum perforatum (hipérico) 300mg 3x/dia (0,3% hipericina) — antidepressivo leve e ansiolítico',
      'Lavandula angustifolia (lavanda) 80mg/dia (Silexan) — ansiedade generalizada e insônia'
    ],
    contraindicacoes: [
      'Hypericum perforatum (hipérico): CONTRAINDICADO com antidepressivos ISRS/IRSN (síndrome serotonérgica), anticoagulantes, anticoncepcionais orais, imunossupressores, antiretrovirais (indutor CYP3A4)',
      'Passiflora incarnata: gestantes, sedativos prescritos (potencialização), operadores de máquinas pesadas',
      'Valeriana: não combinar com álcool, benzodiazepínicos, opioides; sonolência residual possível',
      'L-Triptofano / 5-HTP: CONTRAINDICADO com antidepressivos ISRS ou IMAO (síndrome serotonérgica)',
      'Ashwagandha: gestantes, hipotireoidismo autoimune, cirurgia iminente'
    ]
  },
  'sc-tipo-linfatico': {
    fitoterapia: [
      'Echinacea purpurea 400mg 3x/dia por 7-10 dias (não usar contínuo >8 semanas) — imunoestimulante',
      'Phytolacca decandra 30CH (homeopático) — drenagem linfática e inflamação ganglionar',
      'Galium aparine (amor-perfeito) 300mg 2x/dia ou chá — drenagem linfática e depurativo',
      'Astragalus membranaceus 500-1000mg/dia — imunomodulador de longo prazo'
    ],
    contraindicacoes: [
      'Echinacea: doenças autoimunes ativas (lúpus, EM, artrite reumatoide), imunossuprimidos (transplantados), uso de imunossupressores — CONTRAINDICADA',
      'Astragalus: imunossuprimidos, não usar durante uso de medicamentos imunossupressores',
      'Serrapeptase: anticoagulantes, plaquetopenia, cirurgia iminente',
      'Bromelina: alergia a abacaxi, anticoagulantes, plaquetopenia; cautela com AAS',
      'Quercetina: cautela com antibióticos fluoroquinolonas e ciclosporina (interação com CYP3A4)'
    ]
  },
  'sc-status-linfatico-iris': {
    fitoterapia: [
      'Galium aparine (amor-perfeito) 300mg 2x/dia — linfático, depurativo e anti-inflamatório',
      'Calendula officinalis 300mg 3x/dia — anti-inflamatória e drenante linfática',
      'Arctium lappa (bardana) 300-500mg 2x/dia — depurativa hepática e drenante linfática',
      'Sambucus nigra (sabugueiro) 400mg 2x/dia — drenante, imunomodulador e antioxidante'
    ],
    contraindicacoes: [
      'Arctium lappa: gestantes (estimulante uterino), alergia a Asteraceae, diabetes (pode potencializar hipoglicemia)',
      'Calendula officinalis: gestantes (abortiva em altas doses), alergia a Asteraceae',
      'Sambucus nigra: diabetes (monitorar glicemia — efeito hipoglicemiante), imunossuprimidos',
      'Silício orgânico: insuficiência renal grave',
      'Colágeno tipo II: alergia a frango ou derivados'
    ]
  },
  'sc-sinais-pes': {
    contraindicacoes: [
      'Ginkgo biloba: anticoagulantes, gestantes, epilepsia, 2 semanas antes de cirurgia',
      'Curcuma longa: gestantes, cálculos biliares, anticoagulantes; pode aumentar ácido gástrico',
      'Berberina: gestantes, lactantes, crianças; cautela com metformina (potencialização hipoglicêmica)',
      'Ferro quelado: hemocromatose, anemia não ferropriva — confirmar ferritina <30ng/mL antes',
      'Vitamina D3 >5000UI/dia: hipercalcemia, sarcoidose; monitorar calcidiol 25-OH-D3 a cada 90 dias'
    ]
  },
  'sc-sinais-olhos': {
    contraindicacoes: [
      'Silybum marianum: alergia a Asteraceae; pode interagir com CYP2C9 (ajustar anticoagulantes)',
      'Withania somnifera (Ashwagandha): gestantes, hipotireoidismo autoimune, cirurgia iminente',
      'Vitamina A >10.000UI/dia crônico: gestantes (teratogênico), hepatopatia',
      'Zinco >50mg/dia crônico: pode inibir absorção de cobre — suplementar 2mg cobre/dia',
      'Luteína/Zeaxantina: segura; cautela com altas doses em fumantes pesados (associação com câncer de pulmão com beta-caroteno)'
    ]
  },
  'sc-lesoes-pele-abcde': {
    contraindicacoes: [
      'Silybum marianum: alergia a Asteraceae; interação com CYP450 (quimioterápicos — orientar oncologista)',
      'Uncaria tomentosa: gestantes, lactantes, CONTRAINDICADA com imunossupressores (transplante)',
      'Vitamina D3 >5000UI/dia: hipercalcemia; monitorar calcidiol, cálcio sérico e calciúria',
      'Selênio >400mcg/dia: selenose (toxicidade), queda de cabelo, neuropatia',
      'Astaxantina: cautela com anticoagulantes; interação com 5-alfa-redutase (dados limitados)'
    ]
  },
  'sc-secrecao-nasal': {
    contraindicacoes: [
      'Echinacea purpurea: doenças autoimunes ativas, imunossuprimidos, transplantados',
      'Andrographis paniculata: gestantes (abortivo), lactantes, transplantados (imunomodulador)',
      'Zinco >40mg/dia crônico: inibição de absorção de cobre e ferro; náuseas em jejum',
      'NAC: asma grave (pode precipitar broncoespasmo), cautela com nitroglicerina (hipotensão)',
      'Própolis: alergia a própolis, abelhas ou mel — reação cruzada possível; asmáticos'
    ]
  },
  'sc-espinhas-mapa-facial': {
    contraindicacoes: [
      'Vitex agnus-castus: gestantes, lactantes, neoplasias hormônio-dependentes; não combinar com anticoncepcionais hormonais ou agonistas dopaminérgicos',
      'Silybum marianum: alergia a Asteraceae; interação com CYP450',
      'Zinco >50mg/dia: depleção de cobre; náuseas — tomar com alimento',
      'Inositol (mio-inositol): dados limitados na gestação — preferir evitar no 1º trimestre',
      'Vitamina B5 (ácido pantotênico) >2g/dia: diarreia e desconforto GI possíveis'
    ]
  },
  'sc-dor-cabeca-tipos': {
    contraindicacoes: [
      'Tanacetum parthenium (Matricária): gestantes (abortivo), não interromper abruptamente (síndrome de rebote — cefaleia mais intensa)',
      'Petasites hybridus (Petácia): usar apenas extratos sem alcalóides pirrolizidínicos certificados (risco hepatotóxico)',
      'Hypericum perforatum (hipérico): ISRS, anticoagulantes, anticoncepcionais (indutor CYP3A4)',
      'Salix alba: alergia a AAS/aspirina, úlcera péptica ativa, anticoagulantes, crianças <16 anos (risco de síndrome de Reye)',
      'Riboflavina (B2) 400mg/dia: urina pode ficar amarelo-intensa (normal); segura em geral'
    ]
  },
  'sc-sinais-olhos-doencas': {
    contraindicacoes: [
      'ATENÇÃO: sinais de AVC, aneurisma ou crise hipertensiva — PRIORIDADE É EMERGÊNCIA MÉDICA, não fitoterapia',
      'Ginkgo biloba: anticoagulantes (AAS, varfarina, heparina), gestantes, epilepsia',
      'Melissa officinalis + Lycopus europaeus (para Graves): não combinar com hormônio tireoidiano sintético sem monitoramento, gestantes',
      'Berberina: gestantes, lactantes, crianças; interação com metformina e ciclosporina',
      'Ômega-3 >3g/dia: anticoagulantes — risco de sangramento'
    ]
  },
  'sc-sinais-rosto': {
    contraindicacoes: [
      'Vitex agnus-castus: gestantes, lactantes, anticoncepcionais hormonais, neoplasias hormônio-dependentes',
      'Hypericum perforatum (hipérico): ISRS/IRSN, varfarina, anticoncepcionais — CONTRAINDICADO',
      'Ashwagandha: gestantes, hipotireoidismo autoimune (cautela), cirurgia iminente',
      'Zinco >50mg/dia crônico: depleção de cobre; hepatotoxicidade em altas doses prolongadas',
      'Probióticos: imunossuprimidos graves e prematuros — usar com orientação médica'
    ]
  },
  'sc-sinais-emocionais-rosto': {
    contraindicacoes: [
      '5-HTP: CONTRAINDICADO com antidepressivos ISRS, IRSN, IMAO (síndrome serotonérgica)',
      'Hypericum perforatum (hipérico): ISRS, anticoncepcionais, anticoagulantes, antiretrovirais — CONTRAINDICADO',
      'Rhodiola rosea: transtorno bipolar (pode induzir mania), ISRS (cautela por potencialização serotonérgica)',
      'Valeriana: benzodiazepínicos, álcool, opioides — potencialização sedativa',
      'L-Teanina: hipotensivos (potencialização de efeito anti-hipertensivo) — monitorar PA'
    ]
  },
  'sc-sintomas-nutrientes': {
    contraindicacoes: [
      'Ferro bisglicinato: hemocromatose, anemia falciforme, hemossiderose — CONTRAINDICADO; confirmar ferritina e CTLF antes',
      'Vitamina D3 >10.000UI/dia: hipercalcemia, hipercalciúria; monitorar 25-OH-D3 a cada 30-60 dias na dose de ataque',
      'Vitamina A >10.000UI/dia: teratogênico em gestantes; hepatotóxico em uso prolongado',
      'Biotina >5mg/dia: pode interferir em exames laboratoriais (TSH, troponina, beta-hCG) — descontinuar 24h antes de coleta',
      'B12 sublingual: segura; não interfere com medicamentos; monitorar B12 sérica após 90 dias'
    ]
  },
  'sc-sinais-ouvido': {
    contraindicacoes: [
      'Ginkgo biloba: anticoagulantes, gestantes, epilepsia, 2 semanas antes de cirurgia',
      'Niacina (B3): hepatopatia crônica, úlcera péptica ativa, gota — pode elevar ácido úrico; causa rubor (flushing) com nicotinic acid — preferir niacinamida para menos efeitos',
      'Ferro quelado: hemocromatose; não combinar com antibióticos quinolonas ou tetraciclinas sem 2h de espaçamento',
      'Zinco >40mg/dia crônico: depleção de cobre, inibição de ferro',
      'Própolis: alergia a própolis e abelhas'
    ]
  },
  'sc-unhas-avisando': {
    contraindicacoes: [
      'URGÊNCIA — linha preta subungueal: não iniciar protocolo fitoterápico antes de avaliação dermatológica',
      'URGÊNCIA — unhas azuladas agudas: emergência cardiopulmonar — não aguardar',
      'Ferro bisglicinato: hemocromatose; confirmar ferritina + CTLF antes',
      'Biotina >10mg/dia: interfere em exames de TSH, troponina, beta-hCG — suspender 24h antes de exames',
      'Tea tree oil tópico: tóxico se ingerido; não usar puro — diluir 5-10% em óleo carreador'
    ]
  },
  'sc-lingua-homeopatia': {
    contraindicacoes: [
      'Homeopáticos (Antimonium crudum, Nux vomica, Bryonia, Mercurius): contraindicação absoluta rara; cautela em hipersensibilidade ao veículo (lactose ou álcool)',
      'Zinco quelado >50mg/dia: depleção de cobre, inibição de absorção de ferro',
      'Vitamina B2 (riboflavina): urina amarelo-intensa normal; segura; rara hipersensibilidade',
      'Probióticos: imunossuprimidos graves (sepse, pós-transplante) — usar sob orientação médica',
      'Ácido fólico >1mg/dia: pode mascarar anemia megaloblástica por B12 — dosar B12 antes'
    ]
  },
  'sc-disturbios-unhas-clinico': {
    contraindicacoes: [
      'URGÊNCIA — Sinal de Hutchinson (linha preta): biópsia ungueal IMEDIATA — não iniciar protocolo sem avaliação',
      'URGÊNCIA — Hemorragias em estilhaço múltiplas: hemocultura (endocardite bacteriana)',
      'Uncaria tomentosa (Unha-de-gato): gestantes, lactantes, imunossuprimidos (transplantados)',
      'Vitamina D3 + K2: cautela com anticoagulantes cumarínicos (K2 antagoniza varfarina)',
      'Ômega-3 EPA+DHA >3g: anticoagulantes — risco de sangramento; suspender 7 dias antes de cirurgia'
    ]
  }
};

// Apply enrichments to data
const enriched = data.map(item => {
  const e = enrichments[item.id];
  if (!e) return item;

  const updatedCondutas = { ...item.condutas };

  // Update fitoterapia if provided in enrichment
  if (e.fitoterapia) {
    updatedCondutas.fitoterapia = e.fitoterapia;
  }

  // Add contraindicacoes
  if (e.contraindicacoes) {
    updatedCondutas.contraindicacoes = e.contraindicacoes;
  }

  return { ...item, condutas: updatedCondutas };
});

// Write back
fs.writeFileSync(filePath, JSON.stringify(enriched, null, 2), 'utf8');
console.log('Done! Enriched', enriched.length, 'items.');
enriched.forEach(it => {
  const cnt = it.condutas?.contraindicacoes?.length || 0;
  console.log(`  ${it.id}: ${cnt} contraindicações`);
});
