/**
 * PROTOCOLOS TERAPÊUTICOS AVANÇADOS
 * 
 * Baseado nos estudos e protocolos de:
 * - Dr. Idomar Santos (INNAP - Instituto de Naturopatia Aplicada)
 * - Dr. John Andrews (Medicina Funcional Integrativa)
 * - Dr. Lair Ribeiro (Medicina Ortomolecular e Cardiologia)
 * - Dra. Katia Haranaka (MTC e Acupuntura)
 * - Dr. Daniel Forjaz (Homeopatia Clássica e Antroposofia)
 * - Dra. Maria Rocha (Fitoterapia Feminina e Ginecologia Natural)
 * - Instituto Viva Melhor (Iridologia e Naturopatia)
 * 
 * Fontes: Arquivos therapeutic-data + Estudos científicos atualizados
 * Abordagem: Medicina Funcional Integrativa Holística
 */

export const ADVANCED_PROTOCOLS = {
  
  // ============= PROTOCOLOS DR. IDOMAR SANTOS (INNAP) =============
  idomar_santos: {
    name: 'Dr. Idomar Santos - INNAP',
    specialty: 'Naturopatia Aplicada, Fitoterapia Clínica',
    institution: 'Instituto de Naturopatia Aplicada',
    sources: [
      'Santos I. Naturopatia Integrativa. Instituto Viva Melhor, 2020',
      'Santos I. Fitoterapia Funcional Aplicada. INNAP, 2021',
      'Instituto Viva Melhor. Apostila de Naturopatia Aplicada. IVM 2022'
    ],
    
    protocols: {
      detoxification: [
        {
          name: 'Protocolo Detox Hepático-Linfático Completo',
          duration: '21 dias (ciclo completo)',
          phases: {
            preparacao: {
              duration: '3 dias',
              items: [
                {
                  item: 'Psyllium (Plantago ovata)',
                  dose: '15g',
                  posology: '5g 3x/dia em 300ml água, 30min antes das refeições',
                  indication: 'Limpeza intestinal, remoção toxinas, fibras solúveis',
                  mechanism: 'Aumenta bolo fecal, adsorve toxinas, melhora trânsito'
                },
                {
                  item: 'Probióticos multi-cepas',
                  dose: '50 bilhões UFC',
                  posology: '2 cápsulas pela manhã em jejum',
                  indication: 'Restauração microbiota, imunidade intestinal',
                  strains: 'Lactobacillus acidophilus, L. rhamnosus, Bifidobacterium lactis, B. longum'
                }
              ]
            },
            detox_ativa: {
              duration: '14 dias',
              items: [
                {
                  item: 'Cardo Mariano (Silybum marianum) - Silimarina 80%',
                  dose: '420mg silimarina',
                  posology: '140mg 3x/dia com refeições',
                  indication: 'Hepatoproteção, regeneração hepatócitos, fase I e II detox',
                  contraindication: 'Obstrução biliar, alergia Asteraceae',
                  interactions: 'Inibe CYP2C9, CYP3A4 - monitorar fármacos metabolizados',
                  monitoring: 'AST, ALT, GGT, bilirrubinas (baseline e após 14 dias)',
                  sources: 'Abenavoli L, et al. Phytother Res 2010;24(10):1423-32'
                },
                {
                  item: 'Alcachofra (Cynara scolymus) - Extrato seco 5% cinarina',
                  dose: '1500-2000mg',
                  posology: '500mg 3-4x/dia antes das refeições',
                  indication: 'Colerético, colagogo, dispepsia, colesterol',
                  contraindication: 'Obstrução vias biliares, cálculos biliares',
                  interactions: 'Anticoagulantes (monitorar)',
                  sources: 'Bundy R, et al. Phytomedicine 2008;15(9):668-75'
                },
                {
                  item: 'Dente-de-leão (Taraxacum officinale) - raiz',
                  dose: '3-6g',
                  posology: 'Decocção: 1-2g 3x/dia ou tintura 30-40 gotas 3x/dia',
                  indication: 'Diurético, depurativo, colerético, detox renal',
                  contraindication: 'Obstrução biliar, úlcera péptica ativa',
                  sources: 'Clare BA, et al. J Altern Complement Med 2009;15(8):929-34'
                },
                {
                  item: 'Glutationa Lipossomal',
                  dose: '500-1000mg',
                  posology: '500mg 2x/dia em jejum (sublingual preferencial)',
                  indication: 'Antioxidante mestre, conjugação fase II, metais pesados',
                  contraindication: 'Asma (via inalatória)',
                  sources: 'Sinha R, et al. Free Radic Biol Med 2018;127:144-155'
                },
                {
                  item: 'NAC - N-Acetilcisteína',
                  dose: '1800mg',
                  posology: '600mg 3x/dia em jejum',
                  indication: 'Precursor glutationa, mucolítico, quelação metais',
                  contraindication: 'Úlcera ativa',
                  interactions: 'Nitroglicerina (cefaleia)',
                  sources: 'Samuni Y, et al. Free Radic Biol Med 2013;63:383-90'
                }
              ]
            },
            manutencao: {
              duration: '7 dias',
              items: [
                {
                  item: 'Chlorella (Chlorella vulgaris)',
                  dose: '3000mg',
                  posology: '1000mg 3x/dia antes refeições',
                  indication: 'Quelação metais pesados, desintoxicação',
                  contraindication: 'Autoimunidade ativa',
                  sources: 'Uchikawa T, et al. Nutr J 2011;10:91'
                },
                {
                  item: 'Spirulina (Arthrospira platensis)',
                  dose: '3000-5000mg',
                  posology: '1000mg 3-5x/dia',
                  indication: 'Proteína completa, antioxidante, quelação arsênico',
                  sources: 'Khan Z, et al. Clin Toxicol 2006;44(2):135-41'
                }
              ]
            }
          },
          dietary_protocol: {
            eliminate: [
              'Glúten (trigo, centeio, cevada)',
              'Laticínios bovinos',
              'Açúcar refinado e adoçantes artificiais',
              'Álcool',
              'Café (reduzir para máx 1 xícara/dia)',
              'Alimentos processados e industrializados',
              'Carnes vermelhas (preferir orgânicas se consumir)'
            ],
            include: [
              'Vegetais crucíferos (brócolis, couve-flor, repolho) - 3-4 porções/dia',
              'Folhas verdes escuras (couve, espinafre, rúcula) - diariamente',
              'Beterraba crua ralada - 100g/dia (suporte fase II)',
              'Limão - suco 1 limão em água morna ao acordar',
              'Chá verde - 2-3 xícaras/dia (catequinas)',
              'Água filtrada - 35ml/kg/dia',
              'Oleaginosas (nozes, castanhas) - 30g/dia',
              'Peixes selvagens - 3x/semana (ômega-3)'
            ]
          },
          hydrotherapy: [
            'Banho de imersão quente (38-40°C) 20 min + ducha fria 1 min - alternado 3x',
            'Sauna seca ou úmida 15-20 min 3x/semana (sudorese)',
            'Hidroterapia colônica (opcional) - 1-2 sessões na fase ativa'
          ],
          contraindications: [
            'Gravidez e lactação',
            'Insuficiência renal grave (TFG <30)',
            'Hepatopatia aguda descompensada',
            'Obstrução biliar',
            'Úlcera péptica ativa sangrante'
          ],
          monitoring: [
            'Hemograma completo',
            'AST, ALT, GGT, FA, bilirrubinas',
            'Ureia, creatinina, TFG',
            'Metais pesados urinários (pré e pós - opcional)'
          ]
        }
      ],
      
      digestive_health: [
        {
          name: 'Protocolo 4R - Restauração Digestiva Completa',
          description: 'Remove, Replace, Reinoculate, Repair',
          duration: '8-12 semanas',
          
          phase1_remove: {
            name: 'REMOVER - Patógenos, Alérgenos, Estresse',
            duration: '2-4 semanas',
            items: [
              {
                item: 'Berberina HCl',
                dose: '1500mg',
                posology: '500mg 3x/dia 30min antes refeições',
                indication: 'Antimicrobiano amplo espectro (SIBO, Candida, H. pylori)',
                contraindication: 'Gravidez, lactação',
                sources: 'Yin J, et al. Metabolism 2008;57(5):712-7'
              },
              {
                item: 'Alho (Allium sativum) - Alicina padronizada',
                dose: '1200mg',
                posology: '600mg 2x/dia com alimentos',
                indication: 'Antimicrobiano, antifúngico, prebiótico',
                sources: 'Ankri S, Mirelman D. Microbes Infect 1999;1(2):125-9'
              },
              {
                item: 'Óleo de Orégano (Origanum vulgare) - Carvacrol >70%',
                dose: '600mg',
                posology: '200mg 3x/dia com alimentos',
                indication: 'Antifúngico, antibacteriano, anti-parasitário',
                duration: 'Máximo 14 dias consecutivos',
                sources: 'Force M, et al. J Med Food 2000;3(2):95-101'
              }
            ],
            dietary: 'Eliminar: glúten, laticínios, açúcar, álcool, alimentos processados'
          },
          
          phase2_replace: {
            name: 'REPOR - Enzimas e Ácido Gástrico',
            duration: '4-8 semanas',
            items: [
              {
                item: 'Betaína HCl + Pepsina',
                dose: '650mg betaína + 150mg pepsina',
                posology: '1-3 cápsulas no meio das refeições principais (aumentar gradualmente)',
                indication: 'Hipocloridria, digestão proteica, DRGE, disbiose',
                contraindication: 'Úlcera péptica ativa, gastrite erosiva',
                test: 'Teste de provocação: iniciar 1 cápsula, aumentar até sensação leve calor',
                sources: 'Wright JV. Why Stomach Acid is Good for You. M Evans, 2001'
              },
              {
                item: 'Complexo Enzimático Pancreático',
                dose: '10.000-40.000 USP lipase',
                posology: '1-2 cápsulas com cada refeição',
                indication: 'Insuficiência pancreática, má digestão, esteatorreia',
                components: 'Amilase, protease, lipase, lactase, celulase',
                sources: 'Layer P, et al. Gastroenterology 1997;113(2):383-9'
              }
            ]
          },
          
          phase3_reinoculate: {
            name: 'REINOCULAR - Probióticos e Prebióticos',
            duration: '4-12 semanas (manutenção contínua)',
            items: [
              {
                item: 'Probióticos Multi-cepas Alta Potência',
                dose: '100-200 bilhões UFC',
                posology: '2 cápsulas 2x/dia (manhã jejum e noite antes dormir)',
                strains: [
                  'Lactobacillus acidophilus NCFM',
                  'L. rhamnosus GG',
                  'L. plantarum 299v',
                  'Bifidobacterium lactis HN019',
                  'B. longum BB536',
                  'B. bifidum',
                  'Saccharomyces boulardii (levedura benéfica)'
                ],
                indication: 'Restauração microbiota, imunidade, síntese vitaminas',
                storage: 'Refrigeração obrigatória',
                sources: 'Suez J, et al. Cell 2018;174(6):1388-1405'
              },
              {
                item: 'Prebióticos FOS/Inulina',
                dose: '10-20g',
                posology: '5-10g 2x/dia dissolvido em água',
                indication: 'Alimento microbiota benéfica, produção AGCC',
                contraindication: 'SIBO ativo (pode piorar)',
                sources: 'Gibson GR, et al. Nat Rev Gastroenterol Hepatol 2017;14(8):491-502'
              }
            ]
          },
          
          phase4_repair: {
            name: 'REPARAR - Integridade da Mucosa',
            duration: '6-12 semanas',
            items: [
              {
                item: 'L-Glutamina',
                dose: '15-30g',
                posology: '5-10g 3x/dia dissolvido em água fria entre refeições',
                indication: 'Combustível enterócitos, tight junctions, intestino permeável',
                contraindication: 'Doença hepática grave, encefalopatia',
                sources: 'Coeffier M, et al. Lancet 2001;357(9266):1487-8'
              },
              {
                item: 'Zinco Carnosina',
                dose: '150mg',
                posology: '75mg 2x/dia com alimentos',
                indication: 'Cicatrização mucosa, úlceras, integridade barreira',
                sources: 'Hewlings S, Kalman DS. Nutrients 2020;12(6):1757'
              },
              {
                item: 'DGL - Alcaçuz Deglicirrizinado (Glycyrrhiza glabra)',
                dose: '760-1140mg',
                posology: '380mg 2-3x/dia mastigado 20min antes refeições',
                indication: 'Úlcera péptica, gastrite, DRGE, cicatrização',
                advantage: 'Sem efeitos hipertensivos do alcaçuz integral',
                sources: 'Kassir ZA. J Clin Gastroenterol 1985;7(4):286-9'
              },
              {
                item: 'Colágeno Hidrolisado Tipo I e III',
                dose: '10-20g',
                posology: '10g 1-2x/dia dissolvido em líquido frio',
                indication: 'Reparação mucosa, glicina e prolina (tight junctions)',
                sources: 'Chen Q, et al. Oxid Med Cell Longev 2017;2017:6123678'
              }
            ]
          }
        }
      ]
    }
  },

  // ============= PROTOCOLOS DR. JOHN ANDREWS =============
  john_andrews: {
    name: 'Dr. John Andrews',
    specialty: 'Medicina Funcional, Endocrinologia, Nutrologia',
    sources: [
      'Andrews J. Fundamentos e Princípios da Medicina Funcional. 2025',
      'Andrews J. Descobertas em Medicina Integrativa. 2024',
      'Institute for Functional Medicine. Clinical Practice Guidelines. 2023'
    ],
    
    protocols: {
      thyroid_optimization: [
        {
          name: 'Protocolo Otimização Tireoideana Completa',
          description: 'Suporte nutricional para função tireoidiana ótima',
          indication: 'Hipotireoidismo subclínico, Hashimoto, conversão T4→T3 deficiente',
          
          nutrients: [
            {
              item: 'Selênio (L-selenometionina)',
              dose: '200mcg',
              posology: '200mcg 1x/dia pela manhã com alimentos',
              mechanism: 'Cofator deiodinases (conversão T4→T3), antioxidante tireoideano',
              indication: 'Hashimoto, conversão T4→T3, anti-TPO elevado',
              contraindication: 'Selenose (>400mcg/dia)',
              monitoring: 'Selênio sérico (alvo: 120-150 ng/ml), TSH, T4 livre, T3 livre, anti-TPO',
              sources: 'Ventura M, et al. Eur Thyroid J 2017;6(1):2-15'
            },
            {
              item: 'Iodo (de algas kelp ou Lugol diluído)',
              dose: '225-1000mcg',
              posology: '225mcg/dia (se deficiência comprovada, sob supervisão)',
              mechanism: 'Substrato essencial síntese T3 e T4',
              contraindication: 'Hipertireoidismo, Hashimoto ativo (controverso)',
              warning: 'Dosar iodo urinário antes suplementar. Excesso pode piorar Hashimoto',
              monitoring: 'Iodo urinário 24h, TSH, anticorpos',
              sources: 'Leung AM, Braverman LE. Thyroid 2014;24(1):27-36'
            },
            {
              item: 'Zinco (quelato ou picolinato)',
              dose: '30-50mg',
              posology: '15-25mg 2x/dia com alimentos',
              mechanism: 'Conversão T4→T3, síntese TSH',
              indication: 'Hipotireoidismo, deficiência zinco',
              monitoring: 'Zinco sérico + eritrocitário',
              sources: 'Baltaci AK, Mogulkoc R. Biol Trace Elem Res 2017;176(1):92-106'
            },
            {
              item: 'Ferro (bisglicinato)',
              dose: '25-50mg ferro elementar',
              posology: '25mg 1-2x/dia em jejum com vitamina C',
              mechanism: 'Cofator peroxidase tireoidiana',
              indication: 'Hipotireoidismo + anemia ferropriva',
              contraindication: 'Hemocromatose, ferritina >200 ng/ml',
              monitoring: 'Ferritina (alvo: 70-100 ng/ml), saturação transferrina',
              sources: 'Hess SY, et al. Am J Clin Nutr 2002;75(4):734-9'
            },
            {
              item: 'Vitamina D3',
              dose: '5000-10000 UI',
              posology: '5000 UI/dia com K2 200mcg e alimento gorduroso',
              mechanism: 'Imunomodulação, redução anti-TPO',
              indication: 'Hashimoto, autoimunidade, deficiência D',
              monitoring: '25(OH)D3 (alvo: 60-80 ng/ml)',
              sources: 'Effraimidis G, Wiersinga WM. Eur J Endocrinol 2014;170(6):R183-95'
            },
            {
              item: 'Tirosina (L-tyrosine)',
              dose: '1000-2000mg',
              posology: '500-1000mg 2x/dia em jejum',
              mechanism: 'Precursor T3 e T4',
              contraindication: 'Hipertireoidismo, uso de levotiroxina (ajustar dose)',
              sources: 'Shomon M. Living Well with Hypothyroidism. Harper, 2005'
            }
          ],
          
          herbs: [
            {
              item: 'Ashwagandha (Withania somnifera) - Extrato KSM-66',
              dose: '600mg',
              posology: '300mg 2x/dia com alimentos',
              mechanism: 'Adaptógeno, estimula eixo HPA, aumenta T3/T4',
              indication: 'Hipotireoidismo subclínico, estresse, fadiga adrenal',
              contraindication: 'Hipertireoidismo',
              sources: 'Sharma AK, et al. J Evid Based Complementary Altern Med 2018;23:2156587217753865'
            },
            {
              item: 'Guggul (Commiphora mukul) - Guggulsteronas',
              dose: '750mg',
              posology: '250mg 3x/dia',
              mechanism: 'Estimula captação iodo, conversão T4→T3',
              indication: 'Hipotireoidismo, colesterol',
              sources: 'Panda S, Kar A. Pharmacol Res 1999;40(5):405-9'
            }
          ],
          
          lifestyle: [
            'Evitar goitrogênicos crus em excesso (brócolis, couve, soja)',
            'Cozinhar vegetais crucíferos (inativa goitrogênios)',
            'Evitar flúor (água, pasta de dente) e cloro em excesso',
            'Reduzir estresse (cortisol inibe conversão T4→T3)',
            'Sono 7-9h (pico TSH noturno)',
            'Exercício moderado (não extenuante)'
          ]
        }
      ],
      
      adrenal_support: [
        {
          name: 'Protocolo Fadiga Adrenal / HPA Axis Dysfunction',
          phases: {
            phase1_alarm: {
              name: 'Fase Alarme (Cortisol Alto)',
              adaptogenics: [
                {
                  item: 'Ashwagandha KSM-66',
                  dose: '600mg',
                  posology: '300mg 2x/dia (manhã e tarde)',
                  mechanism: 'Reduz cortisol, ansiedade, melhora sono',
                  sources: 'Chandrasekhar K, et al. Indian J Psychol Med 2012;34(3):255-62'
                },
                {
                  item: 'Rhodiola rosea (3% rosavinas, 1% salidrosida)',
                  dose: '400mg',
                  posology: '200mg 2x/dia (manhã e meio-dia)',
                  mechanism: 'Adaptógeno, anti-fadiga, clareza mental',
                  sources: 'Panossian A, Wikman G. Phytomedicine 2010;17(7):481-93'
                },
                {
                  item: 'Fosfatidilserina',
                  dose: '400mg',
                  posology: '200mg 2x/dia',
                  mechanism: 'Reduz cortisol pós-exercício, estresse',
                  sources: 'Monteleone P, et al. Eur J Clin Pharmacol 1992;42(4):385-8'
                }
              ]
            },
            
            phase2_exhaustion: {
              name: 'Fase Exaustão (Cortisol Baixo)',
              nutrients: [
                {
                  item: 'Vitamina C lipossomal',
                  dose: '2000-3000mg',
                  posology: '1000mg 2-3x/dia',
                  mechanism: 'Síntese cortisol, antioxidante adrenal',
                  sources: 'Padayatty SJ, et al. J Am Coll Nutr 2003;22(1):18-35'
                },
                {
                  item: 'Vitaminas B5 (ácido pantotênico) + B6 (P5P)',
                  dose: 'B5: 500mg + B6: 50mg',
                  posology: '2x/dia com refeições',
                  mechanism: 'Cofatores síntese hormônios esteroides',
                  sources: 'Tahiliani AG, Beinlich CJ. Biochem Int 1991;25(4):669-76'
                },
                {
                  item: 'DHEA',
                  dose: '25-50mg',
                  posology: '25mg pela manhã (ajustar conforme DHEA-S)',
                  indication: 'DHEA-S <200 mcg/dl',
                  contraindication: 'Câncer hormônio-sensível',
                  monitoring: 'DHEA-S sérico mensal',
                  sources: 'Arlt W, et al. N Engl J Med 1999;341(14):1013-20'
                }
              ],
              herbs: [
                {
                  item: 'Alcaçuz (Glycyrrhiza glabra) - Ácido glicirrízico',
                  dose: '400-800mg',
                  posology: '200-400mg 2x/dia',
                  mechanism: 'Inibe 11β-HSD2, prolonga meia-vida cortisol',
                  contraindication: 'Hipertensão, hipocalemia',
                  monitoring: 'PA, potássio sérico',
                  duration: 'Máximo 4-6 semanas',
                  sources: 'Walker BR, Edwards CR. Endocr Rev 1994;15(4):421-38'
                }
              ]
            }
          }
        }
      ]
    }
  }
};

export default ADVANCED_PROTOCOLS;
