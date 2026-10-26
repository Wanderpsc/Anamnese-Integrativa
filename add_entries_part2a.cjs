const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'src', 'data', 'subclinicalIntegrativeData.json');
let raw = fs.readFileSync(filePath, 'utf8');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const existing = JSON.parse(raw);

const newEntries = [
  {
    id: 'sc-dor-cabeca-tipos',
    categoria: 'Mapa da Dor de Cabeça',
    emoji: '🧠',
    title: 'O que sua Dor de Cabeça está Tentando Dizer',
    image: 'dor-cabeca-tipos.jpg',
    sinais: [
      'Dor na testa e bochechas (→ Sinusite / pressão dos seios da face / alergias)',
      'Faixa apertando a cabeça toda (→ Cefaleia tensional / estresse / tensão muscular)',
      'Dor só de um lado, latejante (→ Enxaqueca / origem neurológica / vascular)',
      'Dor atrás dos olhos (→ Sobrecarga visual / excesso de telas / desidratação)',
      'Dor na nuca subindo para o topo (→ Tensão cervical / postura inadequada)',
      'Dor difusa após longo tempo sem beber água (→ Cefaleia por desidratação)',
      'Dor ao acordar como pressão pesada (→ Noites mal dormidas / bruxismo / apneia)',
      'Dor que começa no pescoço e vai para a testa (→ Origem muscular e articular cervical)',
      'Dor associada a ciclos hormonais (→ Hormônios modulam vasos cerebrais / enxaqueca menstrual)'
    ],
    diagnostico: 'O padrão e localização da dor de cabeça é um guia clínico preciso de sua origem. Cefaleias frontais com pressão facial apontam para sinusite ou rinosinusite alérgica. A faixa que aperta toda a cabeça é a cefaleia tensional — a mais comum, relacionada ao estresse e tensão miofascial. Dor unilateral latejante com fotofobia ou náusea é padrão de enxaqueca. Dor cervicogênica começa na nuca e irradia para a fronte. Cefaleia matinal persistente associada a ronco pode indicar apneia do sono. Dor cíclica em mulheres associada ao período menstrual é enxaqueca hormonal — responde à modulação estrogênica.',
    condutas: {
      fitoterapia: [
        'Tanacetum parthenium (Matricária) 125mg/dia — prevenção de enxaqueca',
        'Petasites hybridus (Petácia) — redução da frequência de enxaquecas',
        'Lavandula angustifolia (aromaterapia) — cefaleia tensional e ansiedade',
        'Salix alba (salgueiro branco) — analgésico natural (salicilatos)',
        'Zingiber officinale (gengibre) — náusea da enxaqueca e anti-inflamatório',
        'Ginkgo biloba 120mg — melhora da circulação cerebral'
      ],
      suplementacao: [
        'Magnésio glicinato 400-600mg/dia — prevenção de enxaqueca (deficiência comprovada)',
        'Riboflavina (B2) 400mg/dia — reduz frequência de enxaquecas',
        'Coenzima Q10 100-300mg/dia — energética mitocondrial neuronal',
        'Vitamina D3 5000 UI — correlacionada com maior frequência de enxaquecas quando baixa',
        'Ômega-3 EPA+DHA 2g/dia — anti-inflamatório e modulação vascular cerebral',
        'Melatonina 3mg ao dormir — cefaleia matinal e regulação do sono'
      ],
      dietoterapia: [
        'Identificar e eliminar gatilhos: vinho tinto, queijo envelhecido, chocolate, glutamato',
        'Evitar hipoglicemia — manter refeições regulares (cefaleia por hipoglicemia)',
        'Aumentar ingestão de água: 35ml/kg/dia (cefaleia por desidratação)',
        'Cafeína controlada: retirada abrupta causa cefaleia',
        'Sementes de linhaça e chia — ômega-3 e lignanas anti-inflamatórias',
        'Evitar nitratos (embutidos) e aspartame — gatilhos vasculares'
      ],
      estilo_vida: [
        'Fisioterapia e osteopatia cervical — cefaleia cervicogênica e tensional',
        'Acupuntura — eficácia comprovada para enxaqueca e cefaleia tensional',
        'Técnicas de relaxamento muscular progressivo — tensão miofascial',
        'Óculos com filtro de luz azul — cefaleia por excesso de telas',
        'Horários regulares de sono, refeições e hidratação',
        'Higiene postural e ergonomia no trabalho — cefaleia cervical'
      ],
      orientacoes: [
        'Cefaleia de início súbito e intensa ("pior da vida"): emergência — descartar hemorragia subaracnoidea',
        'Cefaleia progressiva em piora ao longo de semanas: neuroimagem urgente',
        'Enxaqueca com aura: avaliar risco cardiovascular e ajustar contraceptivos',
        'Solicitar: hemograma, ferritina, TSH, B12, magnésio sérico, 25-OH-D3',
        'Bruxismo confirmado: placa miorrelaxante + fisioterapia'
      ]
    }
  },
  {
    id: 'sc-sinais-olhos-doencas',
    categoria: 'Sinais nos Olhos',
    emoji: '⚠️',
    title: 'Sinais de Alerta nos Olhos — Doenças Sistêmicas Graves',
    image: 'sinais-olhos-doencas.jpg',
    sinais: [
      'Anel cinza ou esbranquiçado ao redor da córnea (→ Colesterol alto / arco corneal)',
      'Cor amarelada na parte branca do olho / esclerótica (→ Problemas no fígado / icterícia)',
      'Vasos sanguíneos vermelhos ou rompidos na esclera (→ Hipertensão arterial)',
      'Olhos saltados, olhar fixo ou pálpebras retraídas (→ Tireoide / Doença de Graves)',
      'Queda súbita da pálpebra ou visão turva de início súbito (→ Alerta de AVC / Derrame)',
      'Dilatação assimétrica da pupila ou visão turva repentina (→ Aneurisma Cerebral — EMERGÊNCIA)'
    ],
    diagnostico: 'Estes sinais oculares apontam para condições sistêmicas graves que requerem avaliação médica urgente. O arco corneal (anel branco ao redor da córnea) em pacientes abaixo de 45 anos é marcador de hipercolesterolemia familiar. Icterícia escleral indica hiperbilirrubinemia — hepatite, cirrose ou obstrução biliar. Vasos rompidos na esclera podem indicar crise hipertensiva. Exoftalmia com olhar fixo é clássico de Doença de Graves. Ptose palpebral súbita ou diplopia de início agudo são sinais de AVC — emergência. Anisocoria de início súbito associada a cefaleia intensa indica aneurisma cerebral — EMERGÊNCIA ABSOLUTA.',
    condutas: {
      fitoterapia: [
        'Silybum marianum (silimarina) — hepatoproteção (olhos amarelados)',
        'Cynara scolymus (alcachofra) + Berberina — redução de colesterol LDL',
        'Melissa officinalis + Lycopus europaeus — modulação tireoidiana (Graves)',
        'Ginkgo biloba 240mg — circulação cerebrovascular e proteção neuronal',
        'Viscum album (visco europeu) — suporte anti-hipertensivo adjuvante'
      ],
      suplementacao: [
        'Ômega-3 EPA+DHA 3-4g/dia — redução de triglicérides e colesterol (arco corneal)',
        'Berberina 500mg 2x/dia — redução de colesterol e proteção cardiovascular',
        'Silimarina 300mg 3x/dia — hepatoproteção e regeneração (icterícia)',
        'Selênio 200mcg + Inositol (se Doença de Graves) — modulação autoimune tireoidiana',
        'CoQ10 200mg — proteção cardiovascular e anti-hipertensivo adjuvante',
        'Magnésio glicinato 400mg — relaxamento vascular e anti-hipertensivo'
      ],
      dietoterapia: [
        'Dieta mediterrânea — redução de colesterol e proteção cardiovascular',
        'Eliminar gorduras trans e saturadas em excesso',
        'Aveia, linhaça, feijão — fibras solúveis que reduzem colesterol',
        'Alho e cebola — aliicina cardiovascular',
        'Reduzir álcool — hepatoproteção',
        'Dieta de eliminação se autoimunidade (glúten, laticínios) na Doença de Graves'
      ],
      estilo_vida: [
        'QUALQUER SINAL SÚBITO: ligar 192 (SAMU) ou ir à emergência imediatamente',
        'AVC/Aneurisma: NÃO AGUARDAR — janela terapêutica de minutos a horas',
        'Monitorar PA em casa — alvo <130/80 mmHg',
        'Atividade aeróbica 150min/semana — controle do colesterol',
        'Exame oftalmológico anual — detecção precoce de sinais oculares'
      ],
      orientacoes: [
        'URGÊNCIA MÁXIMA: ptose palpebral súbita, visão turva, pupila assimétrica → EMERGÊNCIA',
        'Arco corneal <45 anos: lipidograma completo + Lp(a) urgente',
        'Olhos amarelados: TGO, TGP, GGT, bilirrubinas, sorologias virais',
        'Olhos saltados: TSH, T3 livre, T4 livre, anti-TPO, TRAb',
        'Encaminhar ao endocrinologista (Graves), hepatologista (icterícia), neurologista (AVC)'
      ]
    }
  },
  {
    id: 'sc-sinais-rosto',
    categoria: 'Sinais Faciais',
    emoji: '😶',
    title: 'Sinais do Rosto — O que o Rosto Revela sobre sua Saúde',
    image: 'sinais-rosto.jpg',
    sinais: [
      'Olheiras Escuras (→ Sobrecarga adrenal, intolerância alimentar ou sono ruim)',
      'Inchaço nos Olhos (→ Fígado sobrecarregado)',
      'Olho Amarelado (→ Excesso de bilirrubina, cirrose, hepatite ou problemas hepáticos)',
      'Acne Inflamada (→ Resistência insulínica, intestino desregulado ou desequilíbrio hormonal)',
      'Boca Ressecada (→ Falta de vitaminas do complexo B, ferro ou imunidade baixa)',
      'Gordura Facial (→ Má alimentação, inflamação ou disfunção metabólica)',
      'Mancha Escura na Pele (→ Estresse, inflamação, resistência insulínica ou hormônios)',
      'Rosto Inchado (→ Cortisol alto, retenção de líquido ou distúrbio da tireoide)'
    ],
    diagnostico: 'O rosto é um espelho do metabolismo interno. Olheiras escuras refletem sobrecarga suprarrenal e dificuldade hepática em processar toxinas — também aparecem em intolerâncias alimentares e sono fragmentado. Inchaço palpebral matinal é sinal clássico de filtração renal diminuída. Acne inflamada difusa remete a eixo intestino-pele com disbiose e hiperandrogenismo. Boca ressecada cronicamente indica deficiência de vitaminas do grupo B e baixa imunidade de mucosas. Gordura facial (bochechas e papada) é marcador de resistência insulínica. Manchas escuras (melasma, acanthosis nigricans) apontam para desequilíbrio hormonal. Rosto em lua cheia com estrias indica hipercortisolismo ou hipotireoidismo.',
    condutas: {
      fitoterapia: [
        'Withania somnifera (Ashwagandha) — modulação de cortisol e suprarrenais',
        'Silybum marianum (silimarina) — hepatoproteção e metabolismo hormonal',
        'Vitex agnus-castus — reequilíbrio hormonal (acne, manchas hormonais)',
        'Chá verde + Curcuma longa — anti-inflamatório metabólico e pele',
        'Arctium lappa (bardana) — depurativa hepática e cutânea'
      ],
      suplementacao: [
        'Complexo B (B1, B2, B3, B5, B6, B12) — boca ressecada, energia e imunidade',
        'Zinco quelado 30-50mg — acne, imunidade e metabolismo hormonal',
        'Vitamina C 1-2g/dia — síntese de colágeno e clareamento de manchas',
        'Ômega-3 EPA+DHA 2g — anti-inflamatório e regulação sebácea',
        'Magnésio glicinato 400mg — cortisol, sono e metabolismo',
        'Vitamina D3 5000 UI — imunidade e regulação metabólica',
        'Probióticos multiestirpe — eixo intestino-pele'
      ],
      dietoterapia: [
        'Eliminar laticínios e glúten por 30 dias — acne e inchaço',
        'Reduzir açúcar e índice glicêmico — resistência insulínica e manchas',
        'Vegetais verde-escuros — folato, ferro, clorofila',
        'Alimentos ricos em vitamina B: ovos, leguminosas, sementes, carnes magras',
        'Antioxidantes: açaí, mirtilo, tomate, cenoura',
        'Hidratação 35ml/kg — drenagem e metabolismo celular'
      ],
      estilo_vida: [
        'Sono de qualidade 7-9h — regeneração suprarrenal e hepática',
        'Gestão de estresse — cortisol alto = rosto inchado e manchas',
        'Exercício aeróbico regular — sensibilidade insulínica e gordura facial',
        'Protetor solar FPS 50 diariamente — prevenção de manchas',
        'Linfodrenagem facial — inchaço e circulação'
      ],
      orientacoes: [
        'Rosto em lua cheia + estrias roxas + ganho abdominal: investigar Síndrome de Cushing',
        'Rosto inchado + cansaço + ganho de peso: TSH, T4 livre (hipotireoidismo)',
        'Olho amarelado: TGO, TGP, GGT, bilirrubinas urgente',
        'Manchas escuras em pescoço/axilas (acanthosis): glicemia, insulina, HOMA-IR',
        'Reavaliar após 60 dias de protocolo integrado'
      ]
    }
  },
  {
    id: 'sc-sinais-emocionais-rosto',
    categoria: 'Sinais Emocionais',
    emoji: '🧘',
    title: 'O que seu Rosto está Tentando Contar — Sinais Emocionais',
    image: 'sinais-emocionais-rosto.jpg',
    sinais: [
      'Olheiras / olhos cansados (→ Rins sobrecarregados / energia vital baixa / cansaço emocional silencioso)',
      'Linhas ao redor da boca (→ Intestino sobrecarregado / sentimentos não expressos / emoções reprimidas)',
      'Marcas e linhas na testa (→ Sistema nervoso sobrecarregado / pensamento excessivo / preocupação constante)',
      'Nariz vermelho ou irritado (→ Coração sobrecarregado / sensibilidade emocional elevada / pressão interna)'
    ],
    diagnostico: 'A leitura emocional do rosto integra a psicossomática, a medicina tradicional chinesa (MTC) e a linguagem do corpo. Na MTC, os olhos espelham os Rins — órgão que armazena a energia vital (Jing) e governa o medo e a exaustão emocional. As linhas ao redor da boca refletem o estado do Intestino — que processa o que "não foi digerido emocionalmente". Linhas horizontais na testa associam-se ao Pulmão e ao Sistema Nervoso — ruminação e preocupação crônica. O nariz vermelho é sinal de calor no Coração — hipersensibilidade emocional e pressão interna não liberada.',
    condutas: {
      fitoterapia: [
        'Passiflora incarnata — ansiedade, ruminação e insônia por pensamentos',
        'Withania somnifera (Ashwagandha) — fadiga adrenal e esgotamento emocional',
        'Valeriana officinalis — tensão nervosa e agitação mental',
        'Hypericum perforatum (Hipérico) — humor baixo e processamento emocional',
        'Melissa officinalis — calma o sistema nervoso e coração agitado',
        'Schisandra chinensis — tonificante renal e adaptógeno emocional'
      ],
      suplementacao: [
        'Magnésio glicinato 400mg ao dormir — sistema nervoso, ruminação e sono',
        'L-Teanina 200mg — ansiedade sem sedação (pensamentos excessivos)',
        'Vitamina B6 100mg + Zinco 30mg — metabolismo da serotonina e dopamina',
        '5-HTP 100mg (sem ISRS) — serotonina e processamento emocional',
        'Ômega-3 DHA 1g — neurotransmissão e regulação emocional',
        'Vitamina D3 5000 UI — humor, energia e saúde suprarrenal',
        'Rhodiola rosea 300mg — adaptógeno, fadiga mental e resiliência emocional'
      ],
      dietoterapia: [
        'Probióticos e prebióticos — eixo intestino-cérebro e equilíbrio emocional',
        'Bananas, ovos, peru — triptofano (precursor da serotonina)',
        'Reduzir cafeína e açúcar — flutuações de humor e ansiedade',
        'Chá de camomila e erva-cidreira — sistema nervoso entérico',
        'Alimentos fermentados: kefir, kombucha, chucrute — microbiota e humor'
      ],
      estilo_vida: [
        'Psicoterapia (TCC, gestáltica, integrativa) — processamento emocional profundo',
        'Meditação mindfulness 10-20min/dia — regulação do pensamento excessivo',
        'Journaling (diário emocional) — expressão de sentimentos reprimidos',
        'Acupuntura — equilíbrio dos meridianos renais, cardíacos e intestinais',
        'Práticas corporais: ioga, tai chi, respiração holotrópica'
      ],
      orientacoes: [
        'Exaustão emocional crônica: avaliar burnout e síndrome de fadiga crônica',
        'Solicitar: cortisol salivar matinal e vespertino, DHEA-S, ferritina',
        'Emoções reprimidas crônicas: encaminhar para psicoterapia especializada',
        'Investigar déficit de vitamina D, B12 e magnésio como causas físicas de humor baixo',
        'Integrar abordagem psicossomática ao plano terapêutico global'
      ]
    }
  }
];

const existingIds = new Set(existing.map(e => e.id));
const toAdd = newEntries.filter(e => {
  if (existingIds.has(e.id)) { console.log(`Skipping duplicate: ${e.id}`); return false; }
  return true;
});

const combined = [...existing, ...toAdd];
fs.writeFileSync(filePath, JSON.stringify(combined, null, 2), 'utf8');
console.log(`Done! Added ${toAdd.length} entries. Total: ${combined.length}`);
