// Script para adicionar 5 novas entradas ao subclinicalIntegrativeData.json
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/subclinicalIntegrativeData.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const newEntries = [
  {
    "id": "sc-palma-mao",
    "categoria": "Sinais nas Mãos",
    "emoji": "✋",
    "title": "Palmas das Mãos — Fígado, Circulação e Carências",
    "image": "palma-mao.jpg",
    "sinais": [
      "Eritema palmar (avermelhamento das palmas)",
      "Palidez acentuada nas palmas e polpas dos dedos",
      "Dedos em baqueta de tambor (clubbing)",
      "Tremor fino de repouso ou postural",
      "Hiperhidrose palmar (suor excessivo)",
      "Linhas palmares escurecidas / hiperpigmentadas",
      "Pele seca e descamativa nas mãos",
      "Articulações dos dedos inchadas / nodosas",
      "Petéquias ou hemorragias subungueais",
      "Xantomas tendinosos nas mãos",
      "Mãos frias com cianose periférica",
      "Nódulos de Heberden ou Bouchard"
    ],
    "diagnostico": "As palmas são espelho do estado hepático, hematológico e neurológico. Eritema palmar indica sobrecarga hepática, cirrose ou hipertireoidismo. Palidez sugere anemia ferropriva ou megaloblástica. Dedos em baqueta relacionam-se a hipóxia crônica, doença inflamatória intestinal ou endocardite. Hiperhidrose palmar aponta para disfunção autonômica, ansiedade ou hipertireoidismo. Mãos frias com cianose apontam para insuficiência circulatória periférica ou doença de Raynaud.",
    "condutas": {
      "fitoterapia": [
        "Silybum marianum (cardo-mariano) 140mg silimarina 3x/dia com refeições — hepatoprotetor (eritema palmar por sobrecarga hepática); duração: 90 dias",
        "Taraxacum officinale (dente-de-leão) 300mg extrato seco 2x/dia — depurativo hepático e diurético suave; duração: 60 dias",
        "Ginkgo biloba 120mg extrato padronizado 2x/dia — melhora circulação periférica (mãos frias, cianose); contraindicado com anticoagulantes",
        "Passiflora incarnata 200mg 2x/dia — ansiolítico para hiperhidrose por ansiedade; duração: 30-60 dias",
        "Equisetum arvense (cavalinha) 300mg 2x/dia — remineralizante e tônico da pele seca; duração: 60 dias"
      ],
      "suplementacao": [
        "Ferro bisglicinato 30-60mg/dia em jejum + Vitamina C 500mg — anemia (palmas pálidas); duração: 90-180 dias conforme ferritina",
        "Vitamina B12 1000mcg/dia sublingual — anemia megaloblástica, tremores; duração: 90 dias",
        "Zinco quelado 30mg/dia após jantar — integridade da pele e imunidade; duração: 60 dias",
        "Vitamina E 400UI/dia com refeição gordurosa — circulação periférica e antioxidante",
        "Coenzima Q10 100-200mg/dia — energia celular e saúde cardiovascular (mãos frias, cianose)",
        "Magnésio glicinato 300-400mg/dia — relaxamento muscular, reduz tremor e ansiedade"
      ],
      "dietoterapia": [
        "Alimentos ricos em ferro heme: fígado bovino, carne vermelha magra, atum — 3-4x/semana",
        "Evitar álcool completamente (eritema palmar hepático)",
        "Aumentar vegetais verde-escuros: espinafre, couve, rúcula (ferro + ácido fólico)",
        "Ômega-3: sardinha, salmão, atum 3x/semana ou linhaça moída 30g/dia",
        "Reduzir alimentos ultraprocessados e frituras (sobrecarga hepática)",
        "Chá de gengibre 2x/dia — estimula circulação periférica"
      ],
      "estilo_vida": [
        "Evitar exposição a agrotóxicos, solventes e álcool industrial",
        "Exercício aeróbico moderado 150min/semana — melhora circulação",
        "Técnicas de relaxamento: respiração diafragmática, meditação (hiperhidrose por ansiedade)",
        "Hidratação corporal 35ml/kg/dia",
        "Banhos de contraste nas mãos (quente-frio alternado) para circulação"
      ],
      "orientacoes": [
        "Solicitar: Hemograma completo + ferro sérico + ferritina + vitamina B12",
        "TSH + T4L para tremor/hiperhidrose",
        "TGO + TGP + GGT + bilirrubinas para eritema palmar",
        "Reavaliar em 30 dias; controle laboratorial em 90 dias",
        "Encaminhar ao reumatologista se nódulos articulares"
      ],
      "contraindicacoes": [
        "Silybum marianum: gestação (1º trimestre), alergia a Asteraceae, litíase biliar obstrutiva",
        "Ginkgo biloba: anticoagulantes (varfarina, AAS, clopidogrel), ISRS, convulsões",
        "Ferro: hemocromatose, talassemia — NÃO usar sem diagnóstico confirmado de deficiência",
        "Vitamina E >400UI/dia: anticoagulantes — risco de sangramento; suspender 7 dias pré-cirurgia",
        "Coenzima Q10: potencializa anticoagulantes — monitorar INR"
      ]
    }
  },
  {
    "id": "sc-pele-corporal",
    "categoria": "Pele Corporal",
    "emoji": "🩹",
    "title": "Pele Corporal — Sinais Sistêmicos na Pele",
    "image": "pele-corporal.jpg",
    "sinais": [
      "Acantose nigricans (escurecimento em pescoço, axilas, virilha)",
      "Icterícia cutânea (pele amarelada)",
      "Cianose central ou periférica (pele azulada)",
      "Urticária crônica espontânea (> 6 semanas)",
      "Psoríase em placas (placas avermelhadas com escamas prateadas)",
      "Eczema/dermatite atópica (descamação, coceira, liquenificação)",
      "Ceratose pilar (bolinhas nos braços e coxas)",
      "Estrias violáceas / avermelhadas recentes",
      "Petéquias e equimoses espontâneas",
      "Vitiligo (manchas brancas despigmentadas)",
      "Rash eritematoso em borboleta (malar)",
      "Xantomas cutâneos (depósitos gordurosos amarelados)",
      "Pele acinzentada ou terrosa generalizada",
      "Líquen plano (pápulas violáceas brilhantes)"
    ],
    "diagnostico": "Acantose nigricans é marcador de resistência insulínica e hiperinsulinemia — rastrear síndrome metabólica. Vitiligo associa-se a autoimunidade (Hashimoto, DM tipo 1). Petéquias espontâneas alertam para trombocitopenia ou vasculite. Rash malar em borboleta é característico do lúpus eritematoso sistêmico (LES). Estrias violáceas largas podem indicar hipercortisolismo (síndrome de Cushing). Xantomas revelam dislipidemia grave.",
    "condutas": {
      "fitoterapia": [
        "Curcuma longa 500mg 3x/dia com pimenta-preta (piperina 5mg) — anti-inflamatório sistêmico (psoríase, eczema, LES); duração: 90 dias",
        "Uncaria tomentosa (unha-de-gato) 300mg 2x/dia — imunomodulador em condições autoimunes (vitiligo, LES); duração: 60 dias",
        "Arctium lappa (bardana) 300mg 2x/dia — depurativo cutâneo e anti-inflamatório; duração: 60 dias",
        "Aloe vera gel 200mg extrato 2x/dia — cicatrizante, anti-inflamatório em eczema; uso tópico complementar",
        "Silybum marianum 140mg silimarina 3x/dia — hepatoprotetor em icterícia e dislipidemia"
      ],
      "suplementacao": [
        "Vitamina D3 5000-10000UI/dia — imunomodulador fundamental em psoríase, vitiligo e LES; ajustar conforme 25-OH-D3",
        "Ômega-3 EPA+DHA 3g/dia — anti-inflamatório sistêmico em psoríase e eczema",
        "Zinco quelado 30-50mg/dia — imunidade, cicatrização e regulação autoimune",
        "Vitamina A 5000-10000UI/dia — regeneração epitelial em ceratose pilar e eczema",
        "Selênio 100-200mcg/dia — antioxidante, essencial em doenças autoimunes",
        "Quercetina 500mg 2x/dia — anti-histamínico natural (urticária) e anti-inflamatório",
        "Berberina 500mg 2-3x/dia — resistência insulínica (acantose nigricans), comparável à metformina",
        "Probióticos: Lactobacillus rhamnosus + L. acidophilus 10-20 bilhões UFC/dia — eixo intestino-pele"
      ],
      "dietoterapia": [
        "Dieta anti-inflamatória mediterrânea como base",
        "Excluir glúten 30-60 dias (eczema, psoríase, LES — protocolo eliminação)",
        "Excluir laticínios 30 dias (eczema atópico — caseína inflamatória)",
        "Reduzir açúcar e carboidratos refinados (acantose nigricans / resistência insulínica)",
        "Aumentar vegetais coloridos (carotenoides, polifenóis)",
        "Cúrcuma + gengibre diariamente em sucos ou refeições",
        "Evitar alimentos processados com corantes e conservantes (urticária)"
      ],
      "estilo_vida": [
        "Fotoproteção FPS 50+ diária (vitiligo, lúpus — fotossensibilidade)",
        "Hidratante corporal com ceramidas 2x/dia (eczema, ceratose pilar)",
        "Gestão do estresse: psoríase e urticária se agravam com cortisol elevado",
        "Banhos mornos (não quentes) e curtos em eczema",
        "Roupas de algodão orgânico em contato com pele sensível"
      ],
      "orientacoes": [
        "Acantose nigricans: solicitar glicemia jejum + insulina + HOMA-IR + perfil lipídico",
        "Rash malar: ANA + anti-DNA dupla fita + complemento (C3/C4) — rastrear LES",
        "Vitiligo: TSH + anti-TPO (Hashimoto), glicemia (DM1)",
        "Petéquias: hemograma urgente (plaquetometria) + coagulograma",
        "Estrias violáceas largas: cortisol urinário 24h + ACTH",
        "Encaminhar dermatologista para lesões suspeitas ou diagnóstico duvidoso"
      ],
      "contraindicacoes": [
        "Vitamina A >10000UI/dia: teratogênica — CONTRAINDICADA na gestação; hepatotóxica em dose alta crônica",
        "Uncaria tomentosa: gestação, imunossupressores, transplantados",
        "Selênio >400mcg/dia: toxicidade (selenose) — queda de cabelo, neuropatia",
        "Berberina: gestação, amamentação, não associar a imunossupressores sem monitoramento",
        "Quercetina: anticoagulantes, hipotireoidismo (pode reduzir conversão T4→T3)"
      ]
    }
  },
  {
    "id": "sc-cabelo-couro",
    "categoria": "Cabelo e Couro Cabeludo",
    "emoji": "💇",
    "title": "Cabelo e Couro Cabeludo — Carências e Alterações Hormonais",
    "image": "cabelo-couro.jpg",
    "sinais": [
      "Queda difusa de cabelo (eflúvio telógeno)",
      "Alopecia em placas bem delimitadas (areata)",
      "Recessão frontal / entradas (androgenética)",
      "Cabelos finos, opacos e sem brilho",
      "Cabelos quebradiços e ressecados",
      "Pontas duplas excessivas",
      "Canície precoce (embranquecimento antes dos 30 anos)",
      "Caspa seca excessiva (pitiriase)",
      "Caspa oleosa com aderência (dermatite seborreica)",
      "Couro cabeludo eritematoso e descamativo",
      "Foliculite no couro cabeludo",
      "Ausência de pelos nas sobrancelhas / cílios",
      "Tricorrexia nodosa (nódulos visíveis no fio)"
    ],
    "diagnostico": "A queda capilar difusa é o sinal mais frequente de hipotireoidismo, deficiência de ferritina (<30ng/mL), zinco ou vitamina D. A alopecia areata é autoimune (Th1). Dermatite seborreica envolve Malassezia furfur e inflamação cutânea. Canície precoce associa-se a deficiência de B12, cobre e estresse oxidativo crônico. Cabelo sem brilho e quebradiço aponta para deficiência proteica, biotina ou ômega-3.",
    "condutas": {
      "fitoterapia": [
        "Serenoa repens (palmeira-anã) 160mg 2x/dia — antiandrogênico em alopecia androgenética; duração: 6 meses",
        "Panax ginseng 200mg extrato padronizado (ginsenosídeos 5%)/dia — adaptógeno e estimulante capilar; duração: 90 dias",
        "Urtica dioica (urtiga) 300mg 2x/dia — rico em sílica, ferro e vitaminas capilares; duração: 60 dias",
        "Arctium lappa (bardana) 300mg 2x/dia — antifúngico em caspa seborreica, antipruriginoso",
        "Melaleuca alternifolia (tea tree) 5% xampú tópico — antifúngico efetivo contra Malassezia (caspa); uso 3x/semana"
      ],
      "suplementacao": [
        "Biotina (vitamina B7) 5000-10000mcg/dia — fortalecimento do fio; ATENÇÃO: avisa laboratório pois pode interferir nos exames",
        "Ferro bisglicinato 30-60mg/dia + Vitamina C 500mg (ferritina <30ng/mL = causa queda capilar)",
        "Zinco quelado 30-50mg/dia — crescimento e ciclo capilar (fase anágena); duração: 90 dias",
        "Vitamina D3 5000-10000UI/dia — ativação de folículos pilosos; ajustar conforme exame",
        "Cobre 2mg/dia — melanina e pigmentação do fio (canície precoce); não associar com zinco alto",
        "Colágeno hidrolisado tipo I + III 10g/dia — matriz extracelular do fio",
        "Ômega-3 EPA+DHA 2g/dia — brilho, elasticidade e hidratação do fio",
        "Vitamina B12 1000mcg/dia sublingual — canície precoce e metabolismo do folículo"
      ],
      "dietoterapia": [
        "Proteína 1,5-2g/kg/dia: ovos, peixe, frango, leguminosas — os fios são 95% queratina",
        "Ovos inteiros 2/dia — biotina, luteína, proteínas completas",
        "Sementes de abóbora 30g/dia — zinco, magnésio e ácidos graxos",
        "Vegetais verde-escuros: espinafre, couve (ferro não-heme + ácido fólico)",
        "Nozes e amêndoas — biotina, vitamina E, selênio",
        "Evitar dietas restritivas com calorias muito baixas (<1200kcal) — causa eflúvio telógeno"
      ],
      "estilo_vida": [
        "Massagem capilar 5 min/dia com ponta dos dedos — aumenta circulação folicular",
        "Evitar calor excessivo de chapinha/secador >150°C",
        "Escovar cabelo seco (úmido é mais frágil e quebra)",
        "Trocar fronha para material de cetim — reduz atrito noturno",
        "Gestão do estresse: eflúvio telógeno é diretamente causado por estresse agudo/crônico",
        "Dormir 7-9h/noite — GH noturno estimula crescimento capilar"
      ],
      "orientacoes": [
        "Solicitar: TSH + T4L (hipotireoidismo); Hemograma + ferritina + zinco sérico + vitamina D",
        "DHEA-S + testosterona livre + prolactina (alopecia androgenética feminina)",
        "ANA + anti-TPO (alopecia areata — autoimunidade)",
        "Tricoscopia: dermatologista para diagnóstico diferencial das alopecias",
        "Biotina exógena interfere nos exames: suspender 48-72h antes de coleta de TSH, troponina"
      ],
      "contraindicacoes": [
        "Serenoa repens: gestação e amamentação; pode interfere com anticoagulantes e hormônios",
        "Cobre >3mg/dia: toxicidade — náuseas, vômitos, dano hepático; não associar com zinco em alta dose",
        "Ferro: hemocromatose — CONTRAINDICADO sem deficiência confirmada",
        "Biotina alta dose: pode falsear exames de TSH, troponina e hormônios — avisar laboratório",
        "Zinco >50mg/dia: reduz absorção de cobre; pode causar náuseas se tomado sem alimento"
      ]
    }
  },
  {
    "id": "sc-dentes-gengiva",
    "categoria": "Saúde Oral",
    "emoji": "🦷",
    "title": "Dentes e Gengivas — Saúde Oral Sistêmica",
    "image": "dentes-gengiva.jpg",
    "sinais": [
      "Gengivas inflamadas com sangramento fácil",
      "Gengivas retraídas com exposição do colo dentário",
      "Gengivas pálidas (mucosa oral pálida)",
      "Candidíase oral (placas brancas removíveis)",
      "Aftas recorrentes (úlceras aftosas)",
      "Halitose (mau hálito persistente)",
      "Bruxismo (desgaste acentuado das cúspides)",
      "Erosão do esmalte dentário",
      "Língua geográfica (áreas irregulares de descamação)",
      "Queilite angular (feridas nos cantos da boca)",
      "Manchas esbranquiçadas na mucosa (leucoplasia)",
      "Petéquias na mucosa oral",
      "Xerostomia (boca seca persistente)",
      "Dentes com hipersensibilidade acentuada"
    ],
    "diagnostico": "Sangramento gengival espontâneo pode indicar deficiência de vitamina C (escorbuto subclínico), distúrbio de coagulação ou periodontite severa. Aftas recorrentes relacionam-se a deficiência de B12, ácido fólico, ferro e doença celíaca. Candidíase oral ocorre em imunodepressão, uso de antibióticos e diabetes descontrolada. Queilite angular é clássica de deficiência de riboflavina (B2) e zinco. Bruxismo associa-se a estresse, apneia do sono e deficiência de magnésio. Xerostomia é efeito colateral de mais de 500 medicamentos e indica síndrome de Sjögren.",
    "condutas": {
      "fitoterapia": [
        "Calendula officinalis tintura — bochechos: 5ml em 200ml água morna 3x/dia após escovação — cicatrizante e anti-inflamatório gengival; duração: 21 dias",
        "Própolis solução aquosa 30% — bochechos 10ml 2x/dia — antibacteriano e antifúngico oral amplo espectro; duração: 14-21 dias",
        "Thymus vulgaris (tomilho) chá — bochechos 2x/dia — antisséptico oral, eficaz em halitose",
        "Aloe vera gel puro — aplicar diretamente nas gengivas com cotonete 2x/dia — anti-inflamatório e cicatrizante",
        "Óleo de coco virgem — oil pulling 10ml por 15-20min em jejum 3x/semana — reduz Streptococcus mutans"
      ],
      "suplementacao": [
        "Vitamina C 1000-2000mg/dia — colágeno gengival, sangramento e imunidade oral; duração: 90 dias",
        "Vitamina B12 1000mcg/dia sublingual — aftas recorrentes, glossite, queilite",
        "Ácido fólico 400-800mcg/dia — saúde da mucosa oral; sempre associar com B12",
        "Zinco quelado 30mg/dia — cicatrização, imunidade e queilite angular",
        "Vitamina D3 5000UI/dia — microbioma oral, imunidade gengival e antimicrobiano",
        "Coenzima Q10 100mg/dia — saúde gengival e mitocôndria periodontal; duração: 60 dias",
        "Magnésio glicinato 400mg à noite — bruxismo e qualidade do sono",
        "Probióticos orais específicos: Lactobacillus reuteri DSM 17938 + ATCC PTA 5289 100M UFC 2x/dia — modulação do microbioma oral"
      ],
      "dietoterapia": [
        "Reduzir açúcar livre a <25g/dia (principal fator de risco para cárie e inflamação gengival)",
        "Aumentar frutas cítricas e pimentão vermelho (vitamina C para colágeno gengival)",
        "Mastigar bem os alimentos (estimula saliva e autolimpeza oral)",
        "Beber água entre as refeições (previne xerostomia e halitose)",
        "Evitar bebidas ácidas frequentes: suco de limão, refrigerante, vinagre (erosão do esmalte)",
        "Alimentos fibrosos crus: maçã, cenoura, aipo — limpeza mecânica natural dos dentes"
      ],
      "estilo_vida": [
        "Escovação 2x/dia mínimo (especialmente antes de dormir) com técnica de Bass modificada",
        "Fio dental 1x/dia — remove biofilme interdental inacessível à escova",
        "Protetor oclusal noturno moldado pelo dentista (bruxismo)",
        "Parar de fumar — tabagismo é o principal fator de risco para periodontite grave",
        "Profilaxia e raspagem profissional a cada 6 meses",
        "Reduzir álcool (ressequimento de mucosa e candidíase recorrente)"
      ],
      "orientacoes": [
        "Triagem para diabetes: glicemia jejum + HbA1c (candidíase oral recorrente)",
        "Solicitar sorologias celíacas: anti-transglutaminase IgA + IgA total (aftas com diarreia)",
        "Hemograma + vitamina B12 + folato + ferro em aftas recorrentes",
        "Leucoplasia persistente >2 semanas: biópsia incisional obrigatória (risco de carcinoma)",
        "Encaminhar ao periodontista se bolsas periodontais >4mm ou mobilidade dentária",
        "Xerostomia severa: investigar síndrome de Sjögren (anti-SSA/SSB, biópsia de glândula)"
      ],
      "contraindicacoes": [
        "Própolis: alergia a produtos apícolas (mel, cera de abelha, geleia real) — CONTRAINDICADO",
        "Vitamina C >2g/dia: cálculos renais de oxalato em predispostos; diarreia osmótica",
        "Ácido fólico isolado em alta dose: pode mascarar deficiência de B12 — sempre associar",
        "Coenzima Q10: potencializa anticoagulantes — monitorar INR se uso de varfarina",
        "Magnésio: insuficiência renal grave (creatinina >2mg/dL) — risco de hipermagnesemia"
      ]
    }
  },
  {
    "id": "sc-olhos-esclera",
    "categoria": "Sinais nos Olhos",
    "emoji": "👁️",
    "title": "Esclera e Branco dos Olhos — Fígado, Anemia e Tireoide",
    "image": "olhos-esclera.jpg",
    "sinais": [
      "Esclera amarelada (icterícia escleral)",
      "Esclera azulada (osteogênese imperfeita / deficiência de ferro)",
      "Arcus senilis (anel branco-acinzentado na periferia da córnea)",
      "Xantelasmas nas pálpebras (depósitos amarelos gordurosos)",
      "Hiperemia conjuntival (vasos vermelhos proeminentes)",
      "Hemorragia subconjuntival (mancha vermelha na esclera)",
      "Pterígio (membrana carnosa sobre a córnea)",
      "Olhos secos com sensação de areia e queimação",
      "Olheiras arroxeadas / escuras pronunciadas",
      "Edema palpebral (pálpebras inchadas)",
      "Conjuntiva pálida ao examinar pálpebra inferior (anemia)",
      "Exoftalmia (olhos protusos — protrusão do globo ocular)",
      "Ptose palpebral (queda de pálpebra)",
      "Pinguécula (nódulo amarelado na conjuntiva)"
    ],
    "diagnostico": "A icterícia escleral é sinal precoce de hiperbilirrubinemia (>2mg/dL) por doença hepática, hemólise ou colestase — precede o amarelamento da pele. Xantelasmas e arcus senilis antes dos 50 anos correlacionam-se fortemente com dislipidemia aterogênica. Conjuntiva pálida ao puxar a pálpebra inferior é sinal clínico clássico de anemia. Exoftalmia é marcador de hipertireoidismo (doença de Graves — oftalmopatia). Olheiras crônicas associam-se a deficiência de ferro, alergias respiratórias e acúmulo de fluido periorbital.",
    "condutas": {
      "fitoterapia": [
        "Silybum marianum 140-280mg silimarina 3x/dia — hepatoprotetor de primeira linha (icterícia hepática); duração: 90 dias",
        "Vaccinium myrtillus (mirtilo/bilberry) 80-160mg antocianinas 2x/dia — proteção da retina, reduz vasos avermelhados; duração: 60 dias",
        "Ginkgo biloba 120mg extrato EGb761 2x/dia — microcirculação ocular, olheiras, olho seco; NÃO usar com anticoagulantes",
        "Curcuma longa 500mg 3x/dia — anti-inflamatório e hepatoprotetor (icterícia + dislipidemia)",
        "Euphrasia officinalis (eufrásia) colírio ou chá — bochechos oculares (não internamente): anti-inflamatório conjuntival e olho seco"
      ],
      "suplementacao": [
        "Astaxantina 6-12mg/dia — antioxidante ocular mais potente conhecido (retina, fadiga visual, olho seco); duração: 60-90 dias",
        "Luteína 10-20mg/dia + Zeaxantina 2-4mg/dia — proteção macular; reduz risco de DMRI",
        "Ômega-3 EPA+DHA 2-3g/dia — síndrome do olho seco (aumenta produção de lágrimas de qualidade)",
        "Vitamina A 5000-10000UI/dia — saúde do epitélio conjuntival e córnea; essencial na cegueira noturna",
        "Zinco quelado 25-30mg/dia — metabolismo da vitamina A ocular e imunidade",
        "Vitamina C 1000mg/dia — integridade vascular ocular e síntese de colágeno escleral",
        "Ferro bisglicinato 30-60mg + vitamina C (conjuntiva pálida / anemia / olheiras)",
        "Riboflavina (B2) 400mg/dia — profilaxia de enxaqueca e saúde ocular"
      ],
      "dietoterapia": [
        "Alimentos ricos em luteína e zeaxantina: gema de ovo, couve, espinafre, milho",
        "Mirtilo e uva escura 1/2 xícara/dia — antocianinas para vasos oculares",
        "Peixe azul 3x/semana: sardinha, salmão, atum (ômega-3 para olho seco)",
        "Cenoura, batata-doce, manga (betacaroteno → vitamina A)",
        "Reduzir gordura saturada e trans (xantelasmas / dislipidemia)",
        "Evitar álcool completamente (hepatotoxicidade — icterícia)",
        "Brócolis, couve-de-bruxelas — sulforafano e luteína"
      ],
      "estilo_vida": [
        "Óculos de sol UV400 obrigatórios (pterígio, pinguécula, proteção macular)",
        "Regra 20-20-20: a cada 20 minutos de tela, olhar para um ponto a 6 metros por 20 segundos",
        "Piscar conscientemente durante uso de telas (reduz olho seco)",
        "Lágrimas artificiais sem conservantes 4-6x/dia em olho seco severo",
        "Compressas frias por 10min para olheiras e edema palpebral",
        "Umidificador de ar no quarto — ambiente seco piora olho seco",
        "Não fumar — aumenta risco de catarata, DMRI e doença ocular de Graves"
      ],
      "orientacoes": [
        "Icterícia escleral: solicitar bilirrubina total e frações + TGO + TGP + GGT + fosfatase alcalina + USG abdominal URGENTE",
        "Conjuntiva pálida: hemograma completo + ferro sérico + ferritina + B12 + folato",
        "Xantelasmas / arcus senilis <50 anos: perfil lipídico completo (colesterol total, LDL, HDL, TG, Lp(a))",
        "Exoftalmia: TSH + T4L + T3 + anticorpos anti-receptor TSH (TRAb) — investigar Graves",
        "Encaminhar ao oftalmologista em qualquer alteração visual, dor ocular ou hemorragia subconjuntival recorrente",
        "Pterígio >2mm sobre a córnea: avaliação cirúrgica oftalmológica"
      ],
      "contraindicacoes": [
        "Ginkgo biloba: anticoagulantes, AAS, clopidogrel, ISRS — risco hemorrágico aumentado",
        "Vitamina A >10000UI/dia: teratogênica na gestação — CONTRAINDICADO; hepatotóxica em dose alta crônica",
        "Silybum marianum: obstrução biliar, alergia a Asteraceae",
        "Ferro: hemocromatose, hemossiderose — NÃO usar sem deficiência confirmada",
        "Riboflavina alta dose: pode tornar a urina amarelo-intensa (normal, não é toxicidade)"
      ]
    }
  }
];

// Check for duplicates
const existingIds = new Set(data.map(e => e.id));
const toAdd = newEntries.filter(e => !existingIds.has(e.id));

console.log(`Existing entries: ${data.length}`);
console.log(`New entries to add: ${toAdd.length} (${toAdd.map(e => e.id).join(', ')})`);

const updated = [...data, ...toAdd];
fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');
console.log(`Done! Total entries: ${updated.length}`);
