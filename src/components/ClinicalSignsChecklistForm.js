import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Alert,
  Button,
  Divider,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const CLINICAL_SIGNS_DATABASE = {
  unhas: {
    title: '💅 Unhas',
    color: '#e91e63',
    signs: [
      {
        id: 'unhas_quebradicas',
        label: 'Unhas quebradiças ou fracas',
        causes: 'Deficiência de biotina, zinco, ferro, proteínas. Problemas de tireoide, desidratação.',
        treatments: 'Suplementar biotina (2.5-5mg/dia), zinco (15-30mg), colágeno tipo I. Dieta rica em proteínas, ovos, nozes. Chás: cavalinha, urtiga.'
      },
      {
        id: 'unhas_manchas_brancas',
        label: 'Manchas brancas (leuconíquia)',
        causes: 'Deficiência de zinco, cálcio. Traumas na matriz ungueal. Possível deficiência proteica.',
        treatments: 'Zinco quelado 30mg/dia, cálcio + magnésio + vitamina D3. Chás: alfafa, hortelã. Evitar traumas repetidos.'
      },
      {
        id: 'unhas_linhas_verticais',
        label: 'Linhas verticais pronunciadas',
        causes: 'Envelhecimento natural, deficiência de vitamina B12, ferro. Má absorção intestinal.',
        treatments: 'B12 metilcobalamina sublingual, complexo B, ferro bisglicinato. Probióticos. Chás: dente-de-leão, alcachofra.'
      },
      {
        id: 'unhas_linhas_horizontais',
        label: 'Linhas horizontais (Linhas de Beau)',
        causes: 'Estresse grave, doença sistêmica recente, quimioterapia, desnutrição aguda, infecções.',
        treatments: 'Investigar causa base. Multivitamínico completo, omega-3, glutamina. Dieta anti-inflamatória. Chás: equinácea, gengibre.'
      },
      {
        id: 'unhas_amareladas',
        label: 'Unhas amareladas',
        causes: 'Fungos (onicomicose), tabagismo, uso de esmaltes. Problemas hepáticos, linfáticos, respiratórios.',
        treatments: 'Óleo de tea tree tópico, óleo de orégano. Probióticos. Chás: pau d\'arco, uva-ursi. Avaliar função hepática.'
      },
      {
        id: 'unhas_palidas',
        label: 'Unhas pálidas ou esbranquiçadas',
        causes: 'Anemia ferropriva, má circulação, problemas hepáticos (anemia), desnutrição.',
        treatments: 'Ferro + vitamina C, ácido fólico, B12. Melhorar circulação: ginkgo biloba, castanha-da-índia. Dieta rica em folhas verdes.'
      },
      {
        id: 'unhas_azuladas',
        label: 'Unhas azuladas (cianose)',
        causes: 'Falta de oxigenação (problemas cardíacos, pulmonares, circulatórios). Exposição ao frio.',
        treatments: 'URGENTE: Avaliar sistema cardiorrespiratório. Coenzima Q10, L-carnitina, magnésio. Chás: espinheira-santa, alho.'
      },
      {
        id: 'unhas_curvadas',
        label: 'Unhas em colher (coiloníquia)',
        causes: 'Anemia ferropriva grave, hemocromatose, doença celíaca, hipotireoidismo.',
        treatments: 'Ferro bisglicinato 30-60mg, investigar absorção intestinal. Avaliar tireoide. Chás: agrião, espinafre. Dieta sem glúten (teste).'
      },
      {
        id: 'unhas_grossas',
        label: 'Unhas grossas e opacas',
        causes: 'Psoríase ungueal, fungos, problemas circulatórios, diabetes não controlado.',
        treatments: 'Antifúngicos naturais (óleo melaleuca, orégano). Controlar glicemia. Biotina 5mg. Chás: aloe vera, unha-de-gato.'
      },
      {
        id: 'unhas_descamacao',
        label: 'Descamação ou lascas',
        causes: 'Deficiência de vitamina A, zinco, ácidos graxos essenciais. Exposição a químicos.',
        treatments: 'Vitamina A (retinol) 5000UI, omega-3 EPA/DHA, zinco. Óleo de coco/amêndoa tópico. Chás: cenoura, abóbora.'
      }
    ]
  },
  
  cabelos: {
    title: '💇 Cabelos',
    color: '#ff9800',
    signs: [
      {
        id: 'cabelo_queda_excessiva',
        label: 'Queda excessiva (>100 fios/dia)',
        causes: 'Deficiência de ferro, biotina, zinco, proteínas. Estresse, problemas de tireoide, hormônios (DHT).',
        treatments: 'Ferro + vitamina C, biotina 5mg, zinco 30mg, colágeno. Saw palmetto (anti-DHT). Chás: alecrim, urtiga, cavalinha.'
      },
      {
        id: 'cabelo_fino_ralo',
        label: 'Cabelo fino e rarefeito',
        causes: 'Hipotireoidismo, deficiências nutricionais, envelhecimento, genética, pós-parto.',
        treatments: 'Avaliar TSH/T4. Complexo B, biotina, metionina, cisteína. Minoxidil tópico. Chás: ginseng, fo-ti (he shou wu).'
      },
      {
        id: 'cabelo_branco_precoce',
        label: 'Cabelos brancos precoces (<30 anos)',
        causes: 'Deficiência de B12, cobre, catalase. Estresse oxidativo, genética, vitiligo, tireoide.',
        treatments: 'B12 sublingual, cobre 2mg, PABA, catalase. Antioxidantes: astaxantina, resveratrol. Chás: fo-ti, amla (groselha indiana).'
      },
      {
        id: 'cabelo_seco_opaco',
        label: 'Cabelo seco e opaco',
        causes: 'Deficiência de ácidos graxos essenciais, desidratação, hipotireoidismo, excesso de tratamentos químicos.',
        treatments: 'Omega-3/6/9, vitamina E, biotina. Hidratação adequada (2L água). Óleo de coco/argan tópico. Chás: linhaça, chia.'
      },
      {
        id: 'cabelo_oleoso',
        label: 'Cabelo muito oleoso',
        causes: 'Desequilíbrio hormonal (andrógenos), dieta rica em gorduras saturadas/açúcar, estresse.',
        treatments: 'Zinco 30mg, vitamina B6, saw palmetto. Reduzir açúcar/lácteos. Chás: bardana, hortelã-pimenta, alecrim. Argila verde.'
      },
      {
        id: 'cabelo_caspa',
        label: 'Caspa ou dermatite seborreica',
        causes: 'Fungo Malassezia, deficiência de zinco, B6, ácidos graxos. Estresse, baixa imunidade.',
        treatments: 'Zinco picolinato 30mg, B6, probióticos. Shampoo tea tree/enxofre. Chás: bardana, chapéu-de-couro. Reduzir açúcar.'
      },
      {
        id: 'cabelo_pontas_duplas',
        label: 'Pontas duplas e quebradiças',
        causes: 'Danos físicos/químicos, deficiência proteica, desidratação, falta de nutrientes.',
        treatments: 'Proteínas hidrolisadas, colágeno, biotina, queratina. Óleos nutritivos (argan, macadâmia). Chás: cavalinha, bambu.'
      },
      {
        id: 'cabelo_crescimento_lento',
        label: 'Crescimento muito lento',
        causes: 'Má circulação capilar, deficiências nutricionais, hipotireoidismo, fatores genéticos.',
        treatments: 'Biotina 5-10mg, MSM (enxofre orgânico), vitamina D3. Massagem capilar com alecrim. Chás: ginkgo biloba, gengibre.'
      },
      {
        id: 'cabelo_calvo_areas',
        label: 'Áreas calvas localizadas (alopecia areata)',
        causes: 'Doença autoimune, estresse extremo, desequilíbrio imunológico.',
        treatments: 'PROFISSIONAL DE SAÚDE: corticoides tópicos. Suporte: zinco, vitamina D3, omega-3, probióticos. Reduzir glúten. Chás: equinácea, cúrcuma.'
      }
    ]
  },

  olhos: {
    title: '👁️ Olhos',
    color: '#2196f3',
    signs: [
      {
        id: 'olhos_olheiras_escuras',
        label: 'Olheiras escuras pronunciadas',
        causes: 'Anemia, má circulação, alergias, falta de sono, desidratação, congestão nasal.',
        treatments: 'Ferro + vitamina C, vitamina K, hesperidina. Melhorar sono (melatonina). Chás: camomila, ginkgo biloba. Compressas frias.'
      },
      {
        id: 'olhos_amarelados',
        label: 'Olhos amarelados (icterícia)',
        causes: 'Problemas hepáticos (hepatite, cirrose, obstrução biliar), hemólise.',
        treatments: 'URGENTE: Avaliar função hepática (TGO/TGP, bilirrubinas). Suporte: cardo-mariano, alcachofra, dente-de-leão. Evitar álcool.'
      },
      {
        id: 'olhos_vermelhos',
        label: 'Olhos vermelhos constantemente',
        causes: 'Conjuntivite, alergias, síndrome do olho seco, irritação, alta pressão ocular.',
        treatments: 'Omega-3, vitamina A, luteína/zeaxantina. Colírios lubrificantes. Chás: camomila (compressas), euphrasia. Reduzir telas.'
      },
      {
        id: 'olhos_terco',
        label: 'Terçol recorrente',
        causes: 'Blefarite, baixa imunidade, diabetes, higiene inadequada, demodex.',
        treatments: 'Limpar pálpebras (shampoo neutro diluído). Vitamina A, zinco, probióticos. Compressas quentes. Chás: calêndula, malva.'
      },
      {
        id: 'olhos_inchados',
        label: 'Pálpebras inchadas',
        causes: 'Retenção de líquidos, alergias, problemas renais/cardíacos, hipotireoidismo, excesso de sal.',
        treatments: 'Reduzir sódio, dente-de-leão (diurético), potássio. Avaliar rins/tireoide. Chás: cavalinha, hibisco. Massagem linfática.'
      },
      {
        id: 'olhos_secos',
        label: 'Olhos muito secos',
        causes: 'Síndrome Sjögren, menopausa, deficiência vitamina A/omega-3, medicamentos, uso excessivo de telas.',
        treatments: 'Omega-3 (EPA/DHA) 2g/dia, vitamina A 10000UI, D3. Colírios sem conservantes. Chás: linhaça, chia. Umidificar ambiente.'
      },
      {
        id: 'olhos_anel_branco',
        label: 'Anel branco ao redor da íris',
        causes: 'Arco senil (colesterol alto, aterosclerose) ou arco juvenil (hipercolesterolemia familiar).',
        treatments: 'Avaliar perfil lipídico. Omega-3, lecitina de soja, alho, alcachofra. Dieta low-carb. Chás: chá verde, hibisco.'
      },
      {
        id: 'olhos_manchas_brancas',
        label: 'Manchas brancas na conjuntiva (Manchas de Bitot)',
        causes: 'Deficiência grave de vitamina A (xeroftalmia).',
        treatments: 'URGENTE: Vitamina A 25000UI/dia (sob supervisão de profissional de saúde). Dieta: fígado, cenoura, batata-doce, espinafre. Betacaroteno.'
      },
      {
        id: 'olhos_xantelasma',
        label: 'Xantelasma (placas amareladas nas pálpebras)',
        causes: 'Colesterol alto, triglicerídeos elevados, problemas hepáticos, diabetes.',
        treatments: 'Controlar lipídios: omega-3, niacina, berberina. Dieta cetogênica/low-carb. Chás: alcachofra, cardo-mariano. Avaliar fígado.'
      },
      {
        id: 'olhos_tremor_palpebras',
        label: 'Tremor nas pálpebras',
        causes: 'Deficiência de magnésio, estresse, fadiga, excesso de cafeína, falta de sono.',
        treatments: 'Magnésio glicinato 400mg (noite), complexo B, reduzir café. Técnicas relaxamento. Chás: valeriana, melissa, passiflora.'
      }
    ]
  },

  pele: {
    title: '🧴 Pele',
    color: '#ff5722',
    signs: [
      {
        id: 'pele_palida',
        label: 'Pele pálida ou esbranquiçada',
        causes: 'Anemia (ferro, B12, folato), má circulação, hipotireoidismo, falta de exposição solar.',
        treatments: 'Ferro bisglicinato + vitamina C, B12, ácido fólico. Avaliar TSH. Vitamina D3 (sol 15min/dia). Chás: urtiga, agrião.'
      },
      {
        id: 'pele_amarelada',
        label: 'Pele amarelada (icterícia)',
        causes: 'Problemas hepáticos, vesícula biliar, excesso de betacaroteno, anemia hemolítica.',
        treatments: 'URGENTE: Avaliar fígado (TGO/TGP/bilirrubinas). Cardo-mariano, alcachofra, boldo. Hidratação. Evitar álcool/frituras.'
      },
      {
        id: 'pele_seca_descamativa',
        label: 'Pele seca e descamativa',
        causes: 'Deficiência omega-3/6, vitamina A/E, desidratação, hipotireoidismo, clima seco.',
        treatments: 'Omega-3 EPA/DHA, vitamina E 400UI, A 10000UI. Hidratação 2-3L/dia. Óleos: coco, amêndoa. Chás: linhaça, borragem.'
      },
      {
        id: 'pele_oleosa_acne',
        label: 'Pele oleosa com acne',
        causes: 'Desequilíbrio hormonal (andrógenos), dieta rica em açúcar/lácteos, resistência insulina, estresse.',
        treatments: 'Zinco 30mg, vitamina A, probióticos, DIM. Reduzir açúcar/lácteos/glúten. Chás: bardana, dente-de-leão. Berberina.'
      },
      {
        id: 'pele_manchas_escuras',
        label: 'Manchas escuras (melasma/hiperpigmentação)',
        causes: 'Exposição solar, hormônios (gravidez, pílula), inflamação, envelhecimento.',
        treatments: 'Vitamina C tópica, niacinamida, ácido kójico. Protetor solar FPS 50+. Glutationa oral. Chás: rosa mosqueta, hibisco.'
      },
      {
        id: 'pele_eczema_dermatite',
        label: 'Eczema ou dermatite',
        causes: 'Alergias, sensibilidades alimentares, deficiência omega-3/probióticos, disbiose intestinal, estresse.',
        treatments: 'Probióticos 50bi, omega-3, vitamina D3, quercetina. Eliminar: glúten, lácteos, açúcar. Chás: camomila, calêndula, alcaçuz.'
      },
      {
        id: 'pele_rosácea',
        label: 'Rosácea (vermelhidão facial)',
        causes: 'Inflamação crônica, demodex, sensibilidade vascular, gatilhos: álcool, picantes, sol, estresse.',
        treatments: 'Niacinamida, azelaico tópico, probióticos, omega-3. Evitar gatilhos. Chás: camomila, chá verde (frios). MSM oral.'
      },
      {
        id: 'pele_psoríase',
        label: 'Psoríase (placas escamosas)',
        causes: 'Doença autoimune, predisposição genética, gatilhos: estresse, infecções, medicamentos.',
        treatments: 'Vitamina D3 (alta dose), omega-3, cúrcuma, probióticos. Dieta anti-inflamatória. Chás: cúrcuma, unha-de-gato. Luz UV-B.'
      },
      {
        id: 'pele_manchas_brancas',
        label: 'Manchas brancas (vitiligo/pitiríase)',
        causes: 'Vitiligo (autoimune), pitiríase alba, fungos (pano branco), deficiência vitaminas B12/D.',
        treatments: 'B12, ácido fólico, vitamina D3, cobre. Fototerapia UV-B. Antifúngicos (se fungo). Chás: ginkgo biloba, pimenta-preta.'
      },
      {
        id: 'pele_hematomas_faceis',
        label: 'Hematomas com facilidade',
        causes: 'Deficiência vitamina C/K, fragilidade capilar, uso de anticoagulantes, problemas de coagulação.',
        treatments: 'Vitamina C 1-2g/dia, vitamina K2, bioflavonoides, rutina. Chás: cavalinha, arnica. Avaliar plaquetas/coagulação.'
      },
      {
        id: 'pele_cicatrizacao_lenta',
        label: 'Cicatrização lenta',
        causes: 'Diabetes, deficiências (zinco, vitamina C, proteínas), má circulação, idade avançada.',
        treatments: 'Zinco 30-50mg, vitamina C 1g, proteínas (colágeno), vitamina A. Mel manuka tópico. Chás: centella asiática, confrei.'
      },
      {
        id: 'pele_elasticidade_rugas',
        label: 'Perda de elasticidade/rugas precoces',
        causes: 'Exposição solar, tabagismo, estresse oxidativo, deficiência colágeno/antioxidantes, desidratação.',
        treatments: 'Colágeno hidrolisado, vitamina C, E, resveratrol, ácido hialurônico. Protetor solar. Chás: chá verde, rooibos, rosa mosqueta.'
      }
    ]
  },

  orelhas: {
    title: '👂 Orelhas',
    color: '#9c27b0',
    signs: [
      {
        id: 'orelha_zumbido',
        label: 'Zumbido (tinnitus)',
        causes: 'Perda auditiva, circulação deficiente, excesso cera, medicamentos, estresse, B12 baixa.',
        treatments: 'Ginkgo biloba 120-240mg, magnésio, B12, zinco. Reduzir cafeína/sal. Chás: valeriana, melissa. Avaliar audição.'
      },
      {
        id: 'orelha_dor_recorrente',
        label: 'Dor de ouvido recorrente',
        causes: 'Otites repetidas, alergias, disfunção trompa de Eustáquio, acúmulo de cera, sinusite.',
        treatments: 'Probióticos, vitamina C, alho (antimicrobiano), xilitol nasal. Evitar lácteos. Chás: equinácea, gengibre. Vapor inalação.'
      },
      {
        id: 'orelha_coceira',
        label: 'Coceira constante no ouvido',
        causes: 'Eczema, psoríase, alergias, fungos, pele seca, acúmulo de cera.',
        treatments: 'Óleo de coco/tea tree (diluído), vitamina E tópica. Evitar cotonetes. Chás: camomila (anti-histamínico). Probióticos.'
      },
      {
        id: 'orelha_cera_excessiva',
        label: 'Produção excessiva de cera',
        causes: 'Genética, uso frequente de fones, pele oleosa, deficiência omega-3.',
        treatments: 'Omega-3, limpeza adequada (lavagem por profissional). Evitar cotonetes. Óleo de amêndoa (amolecer cera). Hidratação.'
      },
      {
        id: 'orelha_secrecao',
        label: 'Secreção ou mau cheiro',
        causes: 'Otite externa/média, perfuração timpânica, infecção bacteriana/fúngica, corpo estranho.',
        treatments: 'PROFISSIONAL DE SAÚDE: antibióticos se bacteriano. Suporte: alho, prata coloidal, vinagre de maçã diluído. Chás: equinácea, própolis.'
      },
      {
        id: 'orelha_perda_audicao',
        label: 'Perda de audição progressiva',
        causes: 'Envelhecimento (presbiacusia), exposição ruídos, cera impactada, doenças (Ménière), medicamentos.',
        treatments: 'Ginkgo biloba, magnésio, zinco, vitamina B12, ácido alfa-lipóico. Proteger de ruídos. Chás: ginseng. Avaliar otorrino.'
      },
      {
        id: 'orelha_tontura',
        label: 'Tontura ou vertigem',
        causes: 'Labirintite, Ménière, VPPB, problemas cervicais, pressão baixa/alta, deficiência B12.',
        treatments: 'Ginkgo biloba, betaistina, B6, B12, magnésio. Evitar sal (Ménière). Exercícios vestibulares. Chás: gengibre, hortelã.'
      },
      {
        id: 'orelha_sensibilidade_ruidos',
        label: 'Sensibilidade excessiva a ruídos',
        causes: 'Hiperacusia, enxaqueca, ansiedade, deficiência magnésio, estresse, trauma acústico.',
        treatments: 'Magnésio glicinato 400mg, vitamina B12, terapia sonora gradual. Chás: valeriana, camomila, passiflora. Reduzir cafeína.'
      },
      {
        id: 'orelha_pele_descamando',
        label: 'Pele da orelha descamando',
        causes: 'Dermatite seborreica, psoríase, eczema, exposição solar excessiva, alergias.',
        treatments: 'Hidratação: óleo coco/vitamina E. Zinco, omega-3, probióticos. Chás: bardana, calêndula. Protetor solar nas orelhas.'
      },
      {
        id: 'orelha_inclinacao_lobo',
        label: 'Dobra diagonal no lóbulo (Sinal de Frank)',
        causes: 'Possível marcador de doença cardiovascular (aterosclerose), envelhecimento.',
        treatments: 'Avaliar saúde cardiovascular: colesterol, pressão, glicemia. Omega-3, CoQ10, alho. Dieta mediterrânea. Chás: hibisco, alho.'
      }
    ]
  },

  lingua: {
    title: '👅 Língua',
    color: '#f44336',
    signs: [
      {
        id: 'lingua_saburra_branca',
        label: 'Saburra branca espessa',
        causes: 'Má higiene oral, candidíase, desidratação, digestão lenta, disbiose intestinal, refluxo.',
        treatments: 'Probióticos, raspador de língua 2x/dia, enzimas digestivas, hidratação. Chás: hortelã, gengibre. Reduzir açúcar/lácteos.'
      },
      {
        id: 'lingua_saburra_amarela',
        label: 'Saburra amarelada',
        causes: 'Calor/umidade na medicina chinesa, problemas digestivos, fígado sobrecarregado, tabagismo.',
        treatments: 'Desintoxicação hepática: cardo-mariano, dente-de-leão, alcachofra. Reduzir gorduras/álcool. Chás: boldo, picão.'
      },
      {
        id: 'lingua_saburra_marrom_preta',
        label: 'Saburra marrom ou preta',
        causes: 'Fungos, má higiene, antibióticos prolongados, tabagismo, desidratação severa, bismuto.',
        treatments: 'Antifúngicos: óleo orégano, própolis, pau d\'arco. Probióticos potentes. Higiene rigorosa. Chás: uva-ursi, alho.'
      },
      {
        id: 'lingua_vermelho_vivo',
        label: 'Língua vermelho vivo (glossite)',
        causes: 'Deficiência de B12, ácido fólico, ferro. Anemia perniciosa, doença celíaca, síndrome de Sjögren.',
        treatments: 'B12 metilcobalamina sublingual 1000mcg, ácido fólico 800mcg, ferro + vitamina C. Chás: alfafa, agrião. Avaliar absorção.'
      },
      {
        id: 'lingua_palida',
        label: 'Língua pálida',
        causes: 'Anemia (ferro, B12, folato), má circulação, deficiência de Yang (medicina chinesa), hipotireoidismo.',
        treatments: 'Ferro bisglicinato + vitamina C, B12, ácido fólico. Melhorar circulação: ginkgo, castanha-da-índia. Chás: dente-de-leão.'
      },
      {
        id: 'lingua_rachada_fissurada',
        label: 'Língua rachada ou fissurada',
        causes: 'Genética, deficiência B2/B3/B6, desidratação, síndrome de Sjögren, língua geográfica.',
        treatments: 'Complexo B (B2 riboflavina, B3 niacina, B6), hidratação intensa, omega-3. Evitar alimentos ácidos/picantes. Aloe vera gel.'
      },
      {
        id: 'lingua_geografica',
        label: 'Língua geográfica (manchas irregulares)',
        causes: 'Genética, deficiência B12/zinco, estresse, alergias alimentares, psoríase.',
        treatments: 'Zinco 30mg, B12, evitar alimentos ácidos/picantes/quentes. Probióticos. Chás: camomila, malva. Reduzir estresse.'
      },
      {
        id: 'lingua_inchada_marcas_dentes',
        label: 'Língua inchada com marcas dos dentes',
        causes: 'Deficiência de Qi do baço (medicina chinesa), retenção líquidos, hipotireoidismo, má digestão.',
        treatments: 'Avaliar tireoide (TSH). Reduzir sal, aumentar proteínas. Digestivos: gengibre, cardamomo. Chás: cavalinha, dente-de-leão.'
      },
      {
        id: 'lingua_queimacao',
        label: 'Sensação de queimação (síndrome boca ardente)',
        causes: 'Menopausa, deficiência B12/ferro/zinco, diabetes, ansiedade, candidíase, boca seca.',
        treatments: 'B12, ferro, zinco, ácido alfa-lipóico 600mg. Capsaicina oral (dessensibilização). Chás: camomila, melissa. Saliva artificial.'
      },
      {
        id: 'lingua_tremor',
        label: 'Tremor na língua',
        causes: 'Deficiência magnésio/B12, estresse, ansiedade, hipertireoidismo, Parkinson, esclerose múltipla.',
        treatments: 'Magnésio glicinato 400mg, B12, reduzir cafeína. Chás: valeriana, passiflora. URGENTE: avaliar neurológico se persistente.'
      },
      {
        id: 'lingua_aftas_recorrentes',
        label: 'Aftas recorrentes',
        causes: 'Deficiência ferro/B12/zinco, estresse, trauma, alergias (glúten, lácteos), imunidade baixa.',
        treatments: 'Zinco 30mg, B12, lisina 1000mg, vitamina C. Própolis spray, aloe vera gel tópico. Evitar glúten/lácteos (teste). Probióticos.'
      },
      {
        id: 'lingua_seca_saliva_pouca',
        label: 'Língua seca (xerostomia)',
        causes: 'Desidratação, Sjögren, medicamentos (anticolinérgicos), diabetes, respiração bucal.',
        treatments: 'Hidratação intensa, omega-3, vitamina C. Estimular saliva: limão, goma sem açúcar. Chás: malva, alteia. Saliva artificial.'
      },
      {
        id: 'lingua_manchas_brancas_persistentes',
        label: 'Manchas brancas persistentes (leucoplasia)',
        causes: 'Irritação crônica, tabagismo, atrito dental, HIV, candidíase crônica. ATENÇÃO: risco pré-canceroso.',
        treatments: 'URGENTE: Avaliação médica/biópsia. Parar tabaco. Beta-caroteno, vitamina A, licopeno. Chás: aloe vera, calêndula.'
      },
      {
        id: 'lingua_revestimento_peludo',
        label: 'Língua pilosa (pelos negros)',
        causes: 'Má higiene, antibióticos, tabaco, fungos, boca seca, bismuto.',
        treatments: 'Higiene rigorosa com raspador, probióticos, antifúngicos naturais. Evitar tabaco/café. Chás: hortelã, romã. Hidratação.'
      },
      {
        id: 'lingua_gosto_metalico',
        label: 'Gosto metálico persistente',
        causes: 'Medicamentos, deficiência zinco/B12, problemas renais/hepáticos, gravidez, amalgamas dentárias.',
        treatments: 'Zinco 30mg, B12, remover amalgamas. Desintoxicação: clorela, coentro. Chás: dente-de-leão, cardo-mariano. Avaliar rins/fígado.'
      }
    ]
  }
};

function ClinicalSignsChecklistForm({ bloodType, onAnalysisComplete }) {
  const [selectedSigns, setSelectedSigns] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});

  const handleSignToggle = (category, signId) => {
    setSelectedSigns(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [signId]: !prev[category]?.[signId]
      }
    }));
  };

  const handleCategoryToggle = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getSelectedCount = (category) => {
    return Object.values(selectedSigns[category] || {}).filter(Boolean).length;
  };

  const getTotalSelectedCount = () => {
    return Object.values(selectedSigns).reduce((total, category) => {
      return total + Object.values(category).filter(Boolean).length;
    }, 0);
  };

  const handleAnalyze = () => {
    // Compilar dados dos sinais selecionados
    const compiledData = {
      bloodType,
      timestamp: new Date().toISOString(),
      totalSigns: getTotalSelectedCount(),
      categories: {}
    };

    Object.keys(selectedSigns).forEach(category => {
      const categorySigns = [];
      Object.entries(selectedSigns[category]).forEach(([signId, isSelected]) => {
        if (isSelected) {
          const signData = CLINICAL_SIGNS_DATABASE[category].signs.find(s => s.id === signId);
          if (signData) {
            categorySigns.push(signData);
          }
        }
      });
      
      if (categorySigns.length > 0) {
        compiledData.categories[category] = {
          title: CLINICAL_SIGNS_DATABASE[category].title,
          signs: categorySigns
        };
      }
    });

    // Chamar callback com os dados compilados
    if (onAnalysisComplete) {
      onAnalysisComplete(compiledData);
    }
  };

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 3, mb: 3, backgroundColor: '#f3e5f5', border: '2px solid #9c27b0', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#9c27b0', fontWeight: 600 }}>
          <AnalyticsIcon sx={{ color: '#9c27b0' }} />
          Checklist de Sinais Clínicos
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Marque os sinais clínicos observados. Para cada sinal, são apresentadas possíveis causas e tratamentos.
        </Typography>

        {getTotalSelectedCount() > 0 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>{getTotalSelectedCount()} sinais</strong> selecionados
            {bloodType && ` • Tipo sanguíneo: ${bloodType}`}
          </Alert>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Categorias de Sinais */}
        {Object.entries(CLINICAL_SIGNS_DATABASE).map(([categoryKey, categoryData]) => (
          <Accordion
            key={categoryKey}
            expanded={expandedCategories[categoryKey] || false}
            onChange={() => handleCategoryToggle(categoryKey)}
            sx={{ mb: 2, boxShadow: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Typography variant="h6" sx={{ color: categoryData.color }}>
                  {categoryData.title}
                </Typography>
                {getSelectedCount(categoryKey) > 0 && (
                  <Chip
                    label={`${getSelectedCount(categoryKey)} selecionado(s)`}
                    size="small"
                    color="primary"
                    sx={{ ml: 'auto', mr: 2 }}
                  />
                )}
              </Box>
            </AccordionSummary>
            
            <AccordionDetails>
              <FormGroup>
                {categoryData.signs.map((sign) => (
                  <Paper
                    key={sign.id}
                    elevation={selectedSigns[categoryKey]?.[sign.id] ? 3 : 1}
                    sx={{
                      p: 2,
                      mb: 2,
                      backgroundColor: selectedSigns[categoryKey]?.[sign.id] ? '#e3f2fd' : 'white',
                      border: selectedSigns[categoryKey]?.[sign.id] ? '2px solid #2196f3' : '1px solid #e0e0e0'
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedSigns[categoryKey]?.[sign.id] || false}
                          onChange={() => handleSignToggle(categoryKey, sign.id)}
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {sign.label}
                        </Typography>
                      }
                    />

                    {selectedSigns[categoryKey]?.[sign.id] && (
                      <Box sx={{ mt: 2, ml: 4 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2, bgcolor: '#fff3e0' }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#e65100', mb: 1 }}>
                                🔍 Possíveis Causas:
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {sign.causes}
                              </Typography>
                            </Paper>
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2e7d32', mb: 1 }}>
                                💊 Tratamentos Sugeridos:
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {sign.treatments}
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Paper>
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Botão de Análise */}
        {getTotalSelectedCount() > 0 && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<AnalyticsIcon />}
              onClick={handleAnalyze}
              sx={{ px: 4 }}
            >
              Gerar Análise Completa ({getTotalSelectedCount()} sinais)
            </Button>
          </Box>
        )}

      </Paper>
    </Box>
  );
}

export default ClinicalSignsChecklistForm;
