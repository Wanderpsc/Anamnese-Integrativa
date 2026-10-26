/**
 * PROTOCOLOS TERAPÊUTICOS INTEGRATIVOS
 * Baseado em evidências científicas, biorressonância, fitoterapia, homeopatia, 
 * suplementação ortomolecular e medicina tradicional
 * 
 * Fontes: 
 * - Guia Completo de Biorressonância
 * - E-book Nutracêuticos e Fitoterápicos - Ortomolecular
 * - Guia de Fitoterapicos
 * - TIPO SANGUÍNEO - ANAMNESE CONFORME BIORRESSONÂNCIA
 * - Protocolos Soroterapia e IM - IEF
 * - Literatura científica atualizada (2020-2025)
 */

export const THERAPEUTIC_PROTOCOLS = {
  
  // ==================== SISTEMA CARDIOVASCULAR ====================
  
  hypertension: {
    name: 'Hipertensão Arterial',
    protocols: [
      {
        type: 'Fitoterapia',
        items: [
          'Hibiscus sabdariffa (Hibisco) - 1,5g de flores secas em infusão 2-3x/dia. Reduz PA sistólica em 7-13 mmHg (estudos 2020-2023)',
          'Allium sativum (Alho envelhecido) - 600-1200mg/dia padronizado em alicina. Reduz PA em 8-10 mmHg',
          'Olea europaea (Folha de Oliveira) - 500mg 2x/dia padronizado 20% oleuropeína. Efeito vasodilatador',
          'Crataegus oxyacantha (Espinheira-santa) - 900mg/dia extrato padronizado. Cardiotônico, antiarrítmico'
        ]
      },
      {
        type: 'Suplementação Ortomolecular',
        items: [
          'Magnésio (glicinato/treonato) - 400-600mg/dia. Relaxa musculatura vascular, regula canais de cálcio',
          'Coenzima Q10 (ubiquinol) - 200-300mg/dia. Melhora função endotelial, reduz estresse oxidativo',
          'Omega-3 (EPA/DHA) - 2-3g/dia. Anti-inflamatório, reduz triglicerídeos e PA',
          'Taurina - 3-6g/dia. Vasodilatador natural, regula volume sanguíneo',
          'L-Arginina - 3-6g/dia. Precursor de óxido nítrico, vasodilatação',
          'Potássio (citrato) - 2-4g/dia. Antagoniza sódio, regula PA'
        ]
      },
      {
        type: 'Homeopatia Constitucional',
        items: [
          'Aurum metallicum 200CH - Hipertensão com rubor facial, palpitações, tendência depressiva',
          'Baryta carbonica 30CH - Idosos com arteriosclerose, perda memória',
          'Nux vomica 30CH - Sedentários, estresse, hiperalimentação, irritabilidade',
          'Sulphur 30CH - Hipertensão com calor, rubor, congestões'
        ]
      },
      {
        type: 'Biorressonância',
        items: [
          'Frequências: 10 Hz, 20 Hz, 30 Hz - Vasodilatação arterial',
          'Programa cardiovascular: 30 min, 3x/semana',
          'Desintoxicação metais pesados (chumbo, cádmio)',
          'Harmonização sistema nervoso autônomo'
        ]
      },
      {
        type: 'Dieta DASH (Comprovada Cientificamente)',
        items: [
          'Reduzir sódio < 1,5g/dia (ideal) ou < 2g/dia',
          'Aumentar potássio: 4,7g/dia (banana, abacate, batata-doce, espinafre)',
          'Magnésio: 400-420mg/dia (castanhas, sementes, vegetais verde-escuros)',
          'Cálcio: 1200mg/dia (vegetais verdes, gergelim, sardinha)',
          'Fibras: 30-35g/dia (reduz absorção de colesterol)',
          'Evitar: açúcar, álcool, cafeína excessiva, gorduras trans'
        ]
      }
    ],
    contraindications: 'Hibisco contraindicado em hipotensão. Alho pode potencializar anticoagulantes. Magnésio contraindicado em insuficiência renal severa.',
    monitoring: 'Monitorar PA semanalmente. Exames: ionograma, creatinina, função hepática a cada 3 meses. Meta: < 130/80 mmHg',
    references: 'Cochrane Reviews 2023, JAMA 2022, Hypertension Journal 2024'
  },

  hypotension: {
    name: 'Hipotensão Arterial',
    protocols: [
      {
        type: 'Fitoterapia',
        items: [
          'Glycyrrhiza glabra (Alcaçuz) - 380mg 2x/dia. Aumenta retenção de sódio, eleva PA',
          'Panax ginseng (Ginseng coreano) - 200mg/dia padronizado. Adaptógeno, melhora tônus vascular',
          'Rosmarinus officinalis (Alecrim) - Chá 3x/dia. Estimulante circulatório',
          'Eleutherococcus senticosus (Ginseng siberiano) - 300mg 2x/dia. Aumenta resistência ao estresse'
        ]
      },
      {
        type: 'Suplementação',
        items: [
          'Vitamina B12 (metilcobalamina) - 1000mcg/dia sublingual. Essencial para produção de hemácias',
          'Ácido fólico - 800mcg/dia. Trabalha com B12 na eritropoiese',
          'Ferro bisglicinato - 30-60mg/dia (se anemia). Aumenta hemoglobina',
          'Tirosina - 500-1000mg 2x/dia. Precursor de noradrenalina',
          'Sal marinho integral - Aumentar ingestão gradualmente (se não hipertenso)'
        ]
      },
      {
        type: 'Hidratação e Eletrólitos',
        items: [
          'Água: 2,5-3L/dia mínimo. Expande volume sanguíneo',
          'Água de coco: 500ml/dia. Eletrólitos naturais',
          'Soro caseiro: 1L água + 3,5g sal + 20g açúcar/mel. Em crises',
          'Evitar jejum prolongado. Comer a cada 3-4h'
        ]
      },
      {
        type: 'Homeopatia',
        items: [
          'China officinalis 6CH - Hipotensão pós-hemorragia, perda fluidos',
          'Veratrum album 6CH - Colapso circulatório, sudorese fria',
          'Carbo vegetabilis 6CH - Debilidade circulatória, extremidades frias',
          'Gelsemium 30CH - Hipotensão com tremores, fraqueza muscular'
        ]
      }
    ],
    contraindications: 'Alcaçuz contraindicado em hipertensão, insuficiência renal, gestação. Uso máximo 6 semanas seguidas.',
    monitoring: 'Aferir PA 2x/dia (manhã e noite). Meta: > 90/60 mmHg. Avaliar sinais: tontura, síncope, fadiga.',
    references: 'European Heart Journal 2023, Clinical Nutrition 2024'
  },

  tachycardia: {
    name: 'Taquicardia e Arritmias',
    protocols: [
      {
        type: 'Fitoterapia Sedativa Cardíaca',
        items: [
          'Crataegus oxyacantha (Espinheiro-branco) - 900mg/dia. Regula ritmo, reduz palpitações',
          'Valeriana officinalis - 300-600mg antes dormir. Sedativo, reduz ansiedade',
          'Passiflora incarnata (Maracujá) - 300mg 2-3x/dia. Ansiolítico natural',
          'Melissa officinalis - Chá 3x/dia. Calmante, antiarrítmico leve',
          'Leonurus cardiaca (Erva-mãe) - 300mg 2x/dia. Específico para palpitações'
        ]
      },
      {
        type: 'Suplementação Mineral Cardíaca',
        items: [
          'Magnésio (glicinato) - 400-600mg/dia. Estabiliza membrana cardíaca, regula canais iônicos',
          'Taurina - 2-3g 2x/dia. Antiarrítmico, regula cálcio intracelular',
          'Coenzima Q10 - 200-300mg/dia. Energia mitocondrial cardíaca',
          'L-Carnitina - 2g/dia. Metabolismo energético do coração',
          'Potássio (citrato) - 300-500mg/dia. Essencial para despolarização cardíaca',
          'Omega-3 (EPA/DHA) - 2-3g/dia. Anti-inflamatório, estabiliza ritmo'
        ]
      },
      {
        type: 'Manejo de Gatilhos',
        items: [
          'Eliminar cafeína completamente (café, chá preto, refrigerantes, chocolate)',
          'Reduzir álcool drasticamente ou eliminar',
          'Técnicas de respiração: 4-7-8 (inspirar 4s, segurar 7s, expirar 8s)',
          'Meditação mindfulness: 20 min 2x/dia',
          'Sono regular: 7-9h/noite, mesmo horário',
          'Exercícios leves: caminhada, yoga (evitar HIIT inicial)'
        ]
      },
      {
        type: 'Homeopatia',
        items: [
          'Aconitum 200CH - Crise aguda com ansiedade, medo de morrer',
          'Digitalis 6CH - Palpitações com pulso irregular, fraqueza',
          'Spigelia 6CH - Palpitações violentas visíveis, dor precordial',
          'Iodum 30CH - Taquicardia com hipertireoidismo, emagrecimento'
        ]
      },
      {
        type: 'Biorressonância',
        items: [
          'Frequência 7,83 Hz (Schumann) - Sincronização cardíaca',
          'Programa sistema nervoso autônomo',
          'Redução de estresse eletromagnético',
          'Harmonização tireóide (se hipertireoidismo)'
        ]
      }
    ],
    contraindications: 'Valeriana pode potencializar sedativos. Taurina contraindicada em distúrbio bipolar não controlado.',
    monitoring: 'FC de repouso < 100 bpm. ECG + Holter 24h se FC > 120 bpm persistente. Avaliar TSH, eletrólitos.',
    references: 'Circulation 2023, Journal of Cardiovascular Pharmacology 2024'
  },

  // ==================== SISTEMA RESPIRATÓRIO ====================

  hypoxemia: {
    name: 'Hipoxemia e Insuficiência Respiratória',
    protocols: [
      {
        type: 'Suporte Respiratório Agudo',
        items: [
          'N-Acetilcisteína (NAC) - 600mg 2-3x/dia. Mucolítico potente, antioxidante pulmonar',
          'Vitamina C (alta dose) - 2-3g/dia dividido. Antioxidante, suporte imune',
          'Quercetina - 500mg 2-3x/dia. Antiinflamatório pulmonar, inibidor viral',
          'Vitamina D3 - 10.000UI/dia (curto prazo) depois 5.000UI/dia. Imunomodulador',
          'Zinco (picolinato) - 30-50mg/dia. Antiviral, suporte imune'
        ]
      },
      {
        type: 'Fitoterapia Pulmonar',
        items: [
          'Eucalyptus globulus - Inalação 3-4x/dia. Broncodilatador, antimicrobiano',
          'Mikania glomerata (Guaco) - 150mg 3x/dia. Broncodilatador, expectorante',
          'Thymus vulgaris (Tomilho) - Chá 3-4x/dia. Antibacteriano, expectorante',
          'Mentha piperita (Hortelã) - Inalação. Descongestionante nasal',
          'Propólis - 30 gotas 3x/dia. Antimicrobiano natural potente'
        ]
      },
      {
        type: 'Exercícios Respiratórios',
        items: [
          'Respiração diafragmática: 10 min 3x/dia. Melhora oxigenação',
          'Espirometria de incentivo: 10 repetições 4x/dia',
          'Drenagem postural: 15-20 min 2x/dia',
          'Exercícios de expansão torácica',
          'Técnica de tosse assistida'
        ]
      },
      {
        type: 'Oxigenoterapia e Suporte',
        items: [
          'SpO2 < 90%: URGÊNCIA MÉDICA - Oxigênio suplementar',
          'SpO2 90-94%: Acompanhamento intensivo, considerar oxigênio',
          'Umidificador ambiental: Manter umidade 40-60%',
          'Evitar poluentes: fumaça, produtos químicos, ácaros',
          'Posicionamento: decúbito elevado 45°'
        ]
      },
      {
        type: 'Homeopatia Respiratória',
        items: [
          'Antimonium tartaricum 6CH - Dispneia com estertores, mucosidade abundante',
          'Carbo vegetabilis 6CH - Dispneia extrema, cianose, necessidade ar',
          'Arsenicum album 30CH - Dispneia noturna 1-3h, ansiedade, fraqueza',
          'Phosphorus 30CH - Tosse seca, pneumonia, hemoptise'
        ]
      }
    ],
    contraindications: 'NAC pode interagir com nitroglicerina. Altas doses Vitamina C contraindicadas em cálculos renais.',
    monitoring: 'SpO2 contínuo. Se < 88%: EMERGÊNCIA. Gasometria arterial se disponível. Raio-X tórax.',
    references: 'Respiratory Medicine 2024, Chest Journal 2023, Critical Care 2024'
  },

  // ==================== SISTEMA METABÓLICO ====================

  obesity: {
    name: 'Obesidade e Síndrome Metabólica',
    protocols: [
      {
        type: 'Suplementação Metabolismo Lipídico',
        items: [
          'Berberina HCl - 500mg 3x/dia antes refeições. Ativa AMPK, reduz glicemia e lipídios (potência similar metformina)',
          'Ácido Alfa-Lipóico - 600mg 2x/dia. Sensibilidade insulina, antioxidante mitocondrial',
          'L-Carnitina tartarato - 2g 2x/dia. Transporte ácidos graxos, beta-oxidação',
          'CLA (Ácido Linoleico Conjugado) - 3-4g/dia. Reduz gordura corporal, preserva massa magra',
          'Cromo picolinato - 200-400mcg/dia. Regula glicemia e insulina',
          'Inositol (Mio-inositol) - 2g 2x/dia. Sensibilidade insulina, SOP'
        ]
      },
      {
        type: 'Fitoterapia Emagrecimento',
        items: [
          'Camellia sinensis (Chá verde) - 400-500mg EGCG/dia. Termogênico, oxidação gorduras',
          'Garcinia cambogia - 500mg 3x/dia (60% HCA). Inibe lipogênese, reduz apetite',
          'Coleus forskohlii - 250mg 2x/dia (10% forskolina). Ativa AMPc, lipólise',
          'Irvingia gabonensis - 300mg 2x/dia. Regula leptina, reduz gordura visceral',
          'Cynara scolymus (Alcachofra) - 600mg 2x/dia. Hepatoprotetor, reduz colesterol'
        ]
      },
      {
        type: 'Dieta Cetogênica Modificada',
        items: [
          'Carboidratos: < 50g/dia (20-30g ideal). Induz cetose',
          'Proteínas: 1,5-2g/kg peso. Preserva massa muscular',
          'Gorduras saudáveis: 70-75% calorias (abacate, coco, azeite, castanhas)',
          'Jejum intermitente 16:8 ou 18:6. Aumenta autofagia',
          'Refeições: 2-3x/dia sem lanches',
          'Hidratação: 3-4L/dia + eletrólitos'
        ]
      },
      {
        type: 'Atividade Física Estratégica',
        items: [
          'HIIT: 20-30 min 3x/semana. Máxima oxidação gorduras',
          'Musculação: 45-60 min 4-5x/semana. Aumenta taxa metabólica basal',
          'Caminhada pós-refeições: 15-20 min. Regula glicemia',
          'Exercícios compostos: agachamento, deadlift, supino',
          'Cardio em jejum (opcional): 30-40 min baixa intensidade'
        ]
      },
      {
        type: 'Manejo Hormonal',
        items: [
          'Cortisol: Ashwagandha 600mg 2x/dia, Rhodiola 400mg/dia',
          'Leptina: Zinco 30mg, Omega-3 3g, sono 8h',
          'Insulina: Berberina, cromo, jejum intermitente',
          'Tireoide: Avaliar TSH, T3, T4. Selênio 200mcg, iodo 150mcg',
          'Testosterona (se baixa): Tribulus 750mg, Zinco, Vitamina D3 5000UI'
        ]
      },
      {
        type: 'Homeopatia Constitucional Obesidade',
        items: [
          'Calcarea carbonica 200CH - Obeso fleumático, suores, metabolismo lento',
          'Graphites 30CH - Obesidade com constipação, pele seca, indecisão',
          'Antimonium crudum 30CH - Obesidade glutão, língua saburrosa branca',
          'Thyroidinum 6CH - Obesidade hipotireoidismo, metabolismo lento'
        ]
      }
    ],
    contraindications: 'Berberina contraindicada em gestação. Cetogênica contraindicada em insuficiência renal, hepática severa, diabetes tipo 1 sem supervisão.',
    monitoring: 'Peso semanal, circunferência abdominal mensal. Exames 3/3 meses: glicemia jejum, HbA1c, insulina jejum, perfil lipídico, TSH, vitamina D.',
    references: 'Obesity Reviews 2024, Diabetes Care 2023, Nutrients Journal 2024'
  },

  diabetes: {
    name: 'Diabetes Mellitus Tipo 1 e 2',
    protocols: [
      {
        type: 'Homeopatia Diabetes (Prof. Gerson Cunha)',
        items: [
          'Fórmula DM I e II: Calcarea carbonica 6CH + Natrum muriaticum 6CH + Iris versicolor 6CH + Phosphorus 6CH + Sulphur 6CH',
          'Posologia: 5 gotas 2x/dia sublingual',
          'Syzygium jambolanum TM - 20 gotas 3x/dia. Reduz glicemia, poliúria',
          'Uranium nitricum 6CH - Diabetes com emagrecimento, polifagia, glicosúria',
          'Phosphoric acidum 30CH - Diabetes com debilidade mental, apatia'
        ]
      },
      {
        type: 'Suplementação Glicêmica',
        items: [
          'Berberina - 500mg 3x/dia antes refeições. Reduz HbA1c 0,5-1,5% (equivalente metformina)',
          'Ácido Alfa-Lipóico - 600-800mg 2x/dia. Melhora sensibilidade insulina 25-30%',
          'Cromo picolinato - 400-600mcg/dia. Potencializa insulina',
          'Canela (Cinnamomum) - 3-6g/dia. Reduz glicemia 10-29%',
          'Gymnema sylvestre - 400mg 2x/dia. "Destruidor de açúcar", regenera células beta',
          'Bitter melon (Momordica) - 2.000mg/dia. Insulino-mimético natural',
          'Vanadyl sulfate - 30-60mg/dia. Ativa receptores insulina'
        ]
      },
      {
        type: 'Fitoterapia Hipoglicemiante',
        items: [
          'Bauhinia forficata (Pata-de-vaca) - 2-3g folhas infusão 3x/dia. Hipoglicemiante validado',
          'Baccharis trimera (Carqueja) - Chá 3x/dia. Hepatoprotetor, hipoglicemiante',
          'Trigonella foenum-graecum (Feno-grego) - 5-10g sementes/dia. Fibras solúveis, reduz glicemia',
          'Silybum marianum (Cardo-mariano) - 420mg/dia. Protege fígado, melhora glicemia'
        ]
      },
      {
        type: 'Dieta Low-Carb Rigorosa',
        items: [
          'Carboidratos líquidos: < 30g/dia para DM2, contar rigoroso para DM1',
          'IG < 55: Vegetais não-amiláceos, proteínas magras, gorduras boas',
          'Evitar 100%: Açúcar, farinha branca, arroz branco, batata, pão',
          'Fibras: 35-40g/dia. Reduz pico glicêmico',
          'Proteínas: 1,2-1,5g/kg. Preserva massa magra',
          'Gorduras: Omega-3, azeite, abacate, castanhas'
        ]
      },
      {
        type: 'Controle de Complicações',
        items: [
          'Neuropatia: Ácido Alfa-Lipóico 600mg, Vitaminas B1/B6/B12, Acetil-L-Carnitina',
          'Retinopatia: Luteína 20mg, Zeaxantina 4mg, Vitamina A, Bilberry',
          'Nefropatia: Reduzir proteína para 0,8g/kg, Omega-3, Coenzima Q10',
          'Cardiovascular: Magnésio, Coenzima Q10, L-Carnitina, Hawthorn'
        ]
      }
    ],
    contraindications: 'ATENÇÃO: Monitorar glicemia 4-6x/dia. Ajustar insulina conforme necessário. Berberina + metformina pode causar hipoglicemia.',
    monitoring: 'Glicemia capilar diária (4-6x), HbA1c mensal, microalbuminúria trimestral, fundo de olho anual. Meta HbA1c < 7% (DM2) ou < 7,5% (DM1).',
    references: 'Diabetes Care Guidelines 2024, Phytotherapy Research 2023, Journal of Ethnopharmacology 2024'
  },

  anemia: {
    name: 'Anemia Ferropriva e Megaloblástica',
    protocols: [
      {
        type: 'Suplementação Ferro',
        items: [
          'Ferro bisglicinato - 30-60mg/dia (manhã, estômago vazio). Melhor absorção, menos efeitos GI',
          'Vitamina C - 500mg junto com ferro. Aumenta absorção em 3-4x',
          'Ácido fólico - 800-1000mcg/dia. Essencial para síntese DNA',
          'Vitamina B12 (metilcobalamina) - 1000mcg/dia sublingual. Anemia megaloblástica',
          'Vitamina B6 (piridoxal-5-fosfato) - 50mg/dia. Síntese hemoglobina',
          'Cobre - 2mg/dia. Trabalha com ferro na eritropoiese'
        ]
      },
      {
        type: 'Fitoterapia Hematopoiética',
        items: [
          'Urtica dioica (Urtiga) - 900mg/dia ou chá 3x/dia. Rico ferro vegetal biodisponível',
          'Taraxacum officinale (Dente-de-leão) - Chá 3x/dia. Ferro, vitaminas B',
          'Nasturtium officinale (Agrião) - Suco fresco 50ml 2x/dia. Alto teor ferro',
          'Spinacia oleracea (Espinafre) - Suco verde diário. Ferro não-heme + ácido fólico',
          'Medicago sativa (Alfafa) - 500mg 3x/dia. Fonte vitamina K, clorofila'
        ]
      },
      {
        type: 'Dieta Rica em Ferro',
        items: [
          'Ferro heme (melhor absorção 15-35%): Fígado bovino, carne vermelha, frango, peixe',
          'Ferro não-heme: Feijão, lentilha, grão-de-bico, quinoa, aveia',
          'Vegetais verde-escuros: Espinafre, couve, brócolis, agrião',
          'Sementes: Abóbora, gergelim, girassol',
          'Evitar com ferro: Chá preto, café, cálcio (bloqueiam absorção)',
          'Combinar sempre com vitamina C: Laranja, limão, acerola, pimentão'
        ]
      },
      {
        type: 'Homeopatia Anemia',
        items: [
          'Ferrum metallicum 6CH - Anemia com palidez, fraqueza, face pálida mas ruboriza facilmente',
          'China officinalis 6CH - Anemia pós-hemorragia, debilidade extrema',
          'Natrum muriaticum 30CH - Anemia com emaciação, cefaleia pulsátil',
          'Calcarea phosphorica 30CH - Anemia em crianças, adolescentes, cansaço ósseo'
        ]
      },
      {
        type: 'Causas de Má Absorção (Investigar)',
        items: [
          'Gastrite atrófica: Testar H. pylori, avaliar acidez gástrica',
          'Doença celíaca: Sorologia + biópsia intestinal',
          'Parasitoses: Exame parasitológico fezes, tratamento antiparasitário',
          'Medicamentos: IBP crônico reduz absorção B12 e ferro',
          'Vegetarianismo: Suplementar B12 obrigatório'
        ]
      }
    ],
    contraindications: 'Ferro contraindicado em hemocromatose, talassemia major. Não tomar ferro com cálcio, chá, café.',
    monitoring: 'Hemograma completo mensal. Ferritina, ferro sérico, transferrina a cada 2 meses. Meta: Hemoglobina > 12 g/dL (mulher), > 13 g/dL (homem).',
    references: 'Blood Journal 2024, American Journal of Hematology 2023'
  },

  // ==================== AROMATERAPIA E ÓLEOS ESSENCIAIS ====================
  
  essential_oils_general: {
    name: 'Protocolos de Óleos Essenciais - Guia Completo',
    protocols: [
      {
        type: 'Óleos Essenciais para Sistema Respiratório',
        items: [
          '🌿 Eucalyptus globulus (Eucalipto) - Expectorante, antimicrobiano, descongestionante',
          '  • Indicações: Sinusite, bronquite, gripe, tosse produtiva, congestão nasal',
          '  • Contraindicações: Crianças < 3 anos, epilepsia, asma severa, gravidez',
          '  • Dosagem: 2-3 gotas em difusor ou 1-2 gotas diluídas em 10ml óleo vegetal',
          '  • Aplicação: Inalação (5-10 min 3x/dia), massagem torácica diluído 2%',
          '  • Posologia: Uso por até 7-10 dias consecutivos, pausa de 3 dias',
          '  • Riscos: Irritação mucosa se não diluído, neurotoxicidade em altas doses',
          '',
          '🌿 Lavandula angustifolia (Lavanda) - Ansiolítico, cicatrizante, anti-inflamatório',
          '  • Indicações: Ansiedade, insônia, queimaduras leves, eczema, enxaqueca',
          '  • Contraindicações: Hipotensão severa, primeiro trimestre gravidez',
          '  • Dosagem: 2-4 gotas em difusor, 2-3 gotas em banho, 1-2% tópico',
          '  • Aplicação: Difusão aromática, banho relaxante, massagem diluída',
          '  • Posologia: Uso contínuo seguro até 30 dias, reavaliação após',
          '  • Riscos: Sonolência excessiva, hipotensão se uso interno inadequado',
          '',
          '🌿 Melaleuca alternifolia (Tea Tree) - Antibacteriano, antifúngico, antiviral',
          '  • Indicações: Acne, candidíase, micoses, infecções cutâneas, caspa',
          '  • Contraindicações: Uso interno, pele lesionada aberta, alergia',
          '  • Dosagem: Tópico puro em pequenas áreas ou diluído 5-10% em carrier',
          '  • Aplicação: Aplicação local com cotonete, shampoo (5 gotas/dose)',
          '  • Posologia: 2-3x/dia em área afetada por 7-14 dias',
          '  • Riscos: Dermatite de contato em sensíveis, tóxico se ingerido',
          '',
          '🌿 Mentha piperita (Hortelã-pimenta) - Analgésico, digestivo, energizante',
          '  • Indicações: Cefaleia tensional, náuseas, SII, fadiga mental, dor muscular',
          '  • Contraindicações: < 6 anos, DRGE, gestação, epilepsia',
          '  • Dosagem: 1-2 gotas em difusor, diluir 1-2% para uso tópico',
          '  • Aplicação: Têmporas (cefaleia), abdômen (digestivo), inalação',
          '  • Posologia: 2-3x/dia conforme necessidade, máximo 14 dias contínuos',
          '  • Riscos: Queimação se não diluído, interação com antiácidos'
        ]
      },
      {
        type: 'Óleos Essenciais para Sistema Nervoso',
        items: [
          '🧠 Citrus bergamia (Bergamota) - Antidepressivo, ansiolítico, equilibrador',
          '  • Indicações: Depressão leve-moderada, ansiedade, estresse, insônia',
          '  • Contraindicações: Exposição solar (fotossensibilizante), gravidez',
          '  • Dosagem: 3-5 gotas em difusor, 1-2% em óleo carreador',
          '  • Aplicação: Difusão 20-30 min antes dormir, massagem em pulsos',
          '  • Posologia: 1-2x/dia, uso prolongado seguro (30-60 dias)',
          '  • Riscos: Manchas na pele se exposta ao sol, fototoxicidade',
          '',
          '🧠 Chamomilla recutita (Camomila romana) - Calmante, anti-espasmódico',
          '  • Indicações: Ansiedade infantil, cólicas, insônia, irritabilidade',
          '  • Contraindicações: Alergia a Asteraceae, gravidez (altas doses)',
          '  • Dosagem: 2-3 gotas em difusor, 0.5-1% tópico (crianças)',
          '  • Aplicação: Difusão noturna, massagem abdominal (cólicas)',
          '  • Posologia: Uso diário seguro, especialmente adequado para crianças',
          '  • Riscos: Reação alérgica em sensíveis a margarida/crisântemo',
          '',
          '🧠 Rosmarinus officinalis (Alecrim) - Estimulante cognitivo, memória',
          '  • Indicações: Fadiga mental, perda memória, concentração, hipotensão',
          '  • Contraindicações: Hipertensão, epilepsia, gravidez, lactação',
          '  • Dosagem: 1-2 gotas em difusor, diluir 1% para uso tópico',
          '  • Aplicação: Inalação durante estudo/trabalho, massagem capilar',
          '  • Posologia: Manhã e tarde (evitar noite), uso até 21 dias',
          '  • Riscos: Hipertensão, insônia se usado à noite, convulsões (altas doses)'
        ]
      },
      {
        type: 'Óleos Essenciais para Dor e Inflamação',
        items: [
          '💪 Zingiber officinale (Gengibre) - Anti-inflamatório, analgésico, circulatório',
          '  • Indicações: Artrite, dor muscular, náuseas, má circulação',
          '  • Contraindicações: Anticoagulantes, úlcera gástrica ativa, gravidez',
          '  • Dosagem: Diluir 2-3% em óleo vegetal (aquecente levemente)',
          '  • Aplicação: Massagem em articulações, compressa quente local',
          '  • Posologia: 2-3x/dia em área afetada, ciclos de 14 dias',
          '  • Riscos: Irritação cutânea se concentrado, sangramento (anticoag.)',
          '',
          '💪 Boswellia carterii (Incenso) - Anti-inflamatório potente, regenerador',
          '  • Indicações: Artrite, asma, inflamação crônica, cicatrização',
          '  • Contraindicações: Gravidez, anticoagulantes, cirurgia recente',
          '  • Dosagem: 2-3 gotas em difusor, diluir 2-5% tópico',
          '  • Aplicação: Massagem articular, difusão para vias aéreas',
          '  • Posologia: 2x/dia, uso prolongado seguro (60-90 dias)',
          '  • Riscos: Mínimos, pode aumentar sangramento se anticoagulante',
          '',
          '💪 Gaultheria procumbens (Wintergreen) - Analgésico forte (95% metil salicilato)',
          '  • Indicações: Dor muscular intensa, artrite, tendinite, contusões',
          '  • Contraindicações: Alergia aspirina, anticoagulantes, gravidez, < 12 anos',
          '  • Dosagem: Diluir 2-5% SEMPRE em óleo vegetal, NUNCA puro',
          '  • Aplicação: Massagem localizada em área dolorida',
          '  • Posologia: 2-3x/dia por no máximo 7-10 dias consecutivos',
          '  • Riscos: ALTA TOXICIDADE se ingerido, overdose = salicilismo'
        ]
      },
      {
        type: 'Óleos Essenciais para Sistema Digestivo',
        items: [
          '🌱 Zingiber officinale (Gengibre) - Antiemético, digestivo, carminativo',
          '  • Indicações: Náuseas, enjoo movimento, dispepsia, gases',
          '  • Contraindicações: Úlcera ativa, cálculos biliares, anticoagulantes',
          '  • Dosagem: 1 gota em cápsula vegetal ou diluir 1% massagem',
          '  • Aplicação: Cápsula oral 2-3x/dia ou massagem abdominal sentido horário',
          '  • Posologia: Conforme necessidade, uso seguro até 30 dias',
          '  • Riscos: Azia se dose excessiva, interação com anticoagulantes',
          '',
          '🌱 Mentha piperita (Hortelã) - Antiespasmódico, carminativo, colagogo',
          '  • Indicações: SII, gases, náuseas, dispepsia, cólica intestinal',
          '  • Contraindicações: DRGE, úlcera, gravidez, < 6 anos',
          '  • Dosagem: 1-2 gotas em cápsula entérica ou 0.5% tópico abdominal',
          '  • Aplicação: Cápsula 30 min antes refeições ou massagem abdominal',
          '  • Posologia: 2-3x/dia, ciclos de 2-4 semanas',
          '  • Riscos: Relaxamento esfíncter esofágico (refluxo)',
          '',
          '🌱 Foeniculum vulgare (Funcho) - Carminativo, galactagogo, digestivo',
          '  • Indicações: Cólica infantil, gases, lactação insuficiente, indigestão',
          '  • Contraindicações: Câncer hormônio-dependente, epilepsia, < 4 anos',
          '  • Dosagem: 1 gota diluída em óleo vegetal para massagem',
          '  • Aplicação: Massagem abdominal suave sentido horário',
          '  • Posologia: 2-3x/dia após refeições, máximo 14 dias',
          '  • Riscos: Efeito estrogênico (evitar em Ca mama), convulsões (overdose)'
        ]
      },
      {
        type: 'Métodos de Aplicação Seguros',
        items: [
          '📋 DIFUSÃO AROMÁTICA (método mais seguro)',
          '  • Difusor ultrassônico: 3-5 gotas em 100ml água, 15-30 minutos',
          '  • Difusor nebulizador: 5-10 gotas puro, 10-15 minutos',
          '  • Inalação direta: 1-2 gotas em lenço, inalar 5-10 respirações',
          '  • Frequência: 2-3x/dia, ambientes ventilados, pausas de 30-60 min',
          '',
          '📋 USO TÓPICO (sempre diluir)',
          '  • Óleo carreador: Coco fracionado, jojoba, amêndoas, semente uva',
          '  • Diluição adultos: 1-3% uso geral, 5-10% dor local aguda',
          '  • Diluição crianças: 0.25-0.5% (2-6 anos), 0.5-1% (6-12 anos)',
          '  • Diluição idosos: 1-2% (pele sensível)',
          '  • Teste cutâneo: Sempre testar em pequena área 24h antes',
          '  • Áreas seguras: Plantas pés, pulsos, nuca, abdômen, costas',
          '  • EVITAR: Olhos, ouvidos, mucosas, genitais, feridas abertas',
          '',
          '📋 USO INTERNO (CAUTELA - apenas óleos grau alimentício)',
          '  • Via oral: 1-2 gotas em cápsula vegetal vazia',
          '  • Com alimento: Misturar em 1 colher mel ou azeite',
          '  • Sublingual: NÃO - extremamente irritante',
          '  • Água: NÃO - óleos não se misturam, causam irritação',
          '  • Frequência: 1-3x/dia com alimento, máximo 7-14 dias',
          '  • ATENÇÃO: Hepatotóxico se uso prolongado, consultar aromaterapeuta'
        ]
      },
      {
        type: 'Cálculo de Diluição Segura',
        items: [
          '📊 FÓRMULA DE DILUIÇÃO',
          '  • 1% = 6 gotas OE em 30ml óleo carreador (uso geral adulto)',
          '  • 2% = 12 gotas OE em 30ml óleo carreador (uso terapêutico)',
          '  • 3% = 18 gotas OE em 30ml óleo carreador (dor aguda)',
          '  • 5% = 30 gotas OE em 30ml óleo carreador (dor severa, curto prazo)',
          '  • 10% = 60 gotas OE em 30ml óleo carreador (área pequena, máx 3 dias)',
          '',
          '📊 CONVERSÃO MEDIDAS',
          '  • 1ml = aproximadamente 20 gotas',
          '  • 5ml = 1 colher de chá',
          '  • 15ml = 1 colher de sopa',
          '  • 30ml = 2 colheres de sopa'
        ]
      },
      {
        type: 'Segurança e Contraindicações Gerais',
        items: [
          '⚠️ GRUPOS DE RISCO (evitar ou usar com extrema cautela)',
          '  • Gestantes: Evitar 1º trimestre, apenas lavanda/camomila diluídos após',
          '  • Lactantes: Evitar hortelã (reduz leite), usar lavanda/camomila',
          '  • Bebês 0-2 anos: Apenas difusão leve lavanda/camomila, longe do rosto',
          '  • Crianças 2-6 anos: Diluição máxima 0.5%, evitar eucalipto/hortelã',
          '  • Epilepsia: Evitar rosmarino, sálvia, funcho, cânfora, hissopo',
          '  • Hipertensão: Evitar alecrim, hissopo, sálvia',
          '  • Anticoagulantes: Evitar wintergreen, cravo, canela, gengibre (altas doses)',
          '',
          '⚠️ INTERAÇÕES MEDICAMENTOSAS',
          '  • Anticoagulantes: Wintergreen, cravo, canela (metil salicilato)',
          '  • Antidiabéticos: Canela, gerânio (hipoglicemia)',
          '  • Anti-hipertensivos: Lavanda, ylang-ylang (hipotensão)',
          '  • Sedativos: Lavanda, camomila, valeriana (potencialização)',
          '',
          '⚠️ ARMAZENAMENTO',
          '  • Frasco âmbar/azul escuro, bem fechado',
          '  • Temperatura ambiente (15-25°C), evitar calor/luz',
          '  • Longe de crianças e animais',
          '  • Validade: 1-2 anos (cítricos), 3-5 anos (madeiras/resinas)',
          '  • Descarte: Não jogar no esgoto, levar para descarte correto'
        ]
      }
    ],
    contraindications: 'SEMPRE fazer teste de sensibilidade cutânea 24h antes. NUNCA aplicar óleos puros na pele (exceto lavanda/tea tree em pequenas áreas). EVITAR exposição solar após uso de cítricos (bergamota, limão, laranja). NUNCA ingerir sem orientação profissional qualificado.',
    monitoring: 'Observar sinais de irritação cutânea, cefaleia, náusea ou tontura. Suspender uso imediatamente se reação adversa. Documentar óleos usados, diluições e frequência. Consultar aromaterapeuta certificado para uso prolongado ou condições crônicas.',
    references: 'Tisserand & Young - Essential Oil Safety 2nd Ed (2014), NAHA Guidelines 2024, Clinical Aromatherapy Journal 2023, Aromatic Medicine Database 2024'
  }

};

/**
 * Função para buscar protocolo por condição
 */
export function getProtocolByCondition(condition) {
  return THERAPEUTIC_PROTOCOLS[condition] || null;
}

/**
 * Função para buscar protocolos por categoria
 */
export function getProtocolsByCategory(category) {
  const categories = {
    cardiovascular: ['hypertension', 'hypotension', 'tachycardia'],
    respiratory: ['hypoxemia'],
    metabolic: ['obesity', 'diabetes', 'anemia']
  };
  
  const conditions = categories[category] || [];
  return conditions.map(cond => ({
    condition: cond,
    protocol: THERAPEUTIC_PROTOCOLS[cond]
  }));
}

/**
 * Função para formatar protocolo para exibição
 */
export function formatProtocol(protocol) {
  if (!protocol) return '';
  
  let formatted = `## ${protocol.name}\n\n`;
  
  protocol.protocols.forEach(section => {
    formatted += `### ${section.type}\n`;
    section.items.forEach(item => {
      formatted += `- ${item}\n`;
    });
    formatted += '\n';
  });
  
  if (protocol.contraindications) {
    formatted += `**⚠️ Contraindicações:** ${protocol.contraindications}\n\n`;
  }
  
  if (protocol.monitoring) {
    formatted += `**📊 Monitoramento:** ${protocol.monitoring}\n\n`;
  }
  
  if (protocol.references) {
    formatted += `**📚 Referências:** ${protocol.references}\n`;
  }
  
  return formatted;
}

export default THERAPEUTIC_PROTOCOLS;
