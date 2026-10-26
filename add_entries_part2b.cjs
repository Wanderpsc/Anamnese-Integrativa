const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'src', 'data', 'subclinicalIntegrativeData.json');
let raw = fs.readFileSync(filePath, 'utf8');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const existing = JSON.parse(raw);

const newEntries = [
  {
    id: 'sc-sintomas-nutrientes',
    categoria: 'Deficiências Nutricionais',
    emoji: '💊',
    title: 'O que seu Corpo está Dizendo — Sintomas e Nutrientes',
    image: 'sintomas-nutrientes.jpg',
    sinais: [
      'Mãos frias (→ Deficiência de Ferro / anemia)',
      'Perda de apetite (→ Deficiência de Zinco)',
      'Olhos secos (→ Deficiência de Vitamina A)',
      'Falta de ar (→ Deficiência de Ferro / anemia)',
      'Queda de cabelo (→ Deficiência de Ferro / ferritina baixa)',
      'Boca seca (→ Deficiência de Vitamina A)',
      'Unhas quebradiças (→ Deficiência de Biotina / B7)',
      'Fadiga constante (→ Deficiência de Vitamina D)',
      'Irritabilidade e humor baixo (→ Deficiência de Vitamina B6)',
      'Problemas de memória e concentração (→ Deficiência de Ômega-3)',
      'Cãibras nas pernas (→ Deficiência de Magnésio)',
      'Névoa mental / brain fog (→ Deficiência de Vitamina B12)',
      'Fraqueza muscular (→ Deficiência de Potássio)',
      'Infecções frequentes (→ Deficiência de Vitamina C)',
      'Formigamento e adormecimento (→ Deficiência de Vitamina B6)',
      'Sono ruim (→ Deficiência de Magnésio)'
    ],
    diagnostico: 'Sintomas aparentemente difusos frequentemente têm origem em deficiências nutricionais subclínicas — baixas o suficiente para causar sintomas, mas não sempre detectadas em exames de rotina. A abordagem funcional investiga os níveis ótimos (não apenas "normais"). Ferro baixo (ferritina <30 em mulheres) causa fadiga, queda de cabelo e mãos frias mesmo sem anemia franca. B12 abaixo de 400 pg/mL causa névoa mental e formigamento. Vitamina D <30 ng/mL está associada a fadiga e infecções. Magnésio é o "mineral do estresse" — sua deficiência causa cãibras, insônia e ansiedade.',
    condutas: {
      fitoterapia: [
        'Urtica dioica (urtiga) — ferro, minerais e fortalecimento do organismo',
        'Silybum marianum (silimarina) — absorção de nutrientes e hepatoproteção',
        'Melissa officinalis + Passiflora — sono ruim e deficiência de magnésio',
        'Equisetum arvense (cavalinha) — minerais, sílica, unhas e cabelo',
        'Withania somnifera (Ashwagandha) — energia, cortisol e imunidade'
      ],
      suplementacao: [
        'Ferro bisglicinato 30mg (ferritina <30) + Vitamina C para absorção',
        'Vitamina D3 10.000 UI/dia por 30 dias (se <20 ng/mL); manutenção 5000 UI',
        'Zinco quelado 30mg — apetite, imunidade e metabolismo',
        'Vitamina A (retinol) 5000-10.000 UI — olhos secos e mucosas',
        'Vitamina B6 (piridoxina) 50-100mg — formigamento, humor e TPM',
        'Biotina 5-10mg/dia — unhas quebradiças e queda de cabelo',
        'Vitamina B12 (metilcobalamina) 1000mcg sublingual — névoa mental',
        'Ômega-3 DHA+EPA 2-3g — memória, concentração e anti-inflamatório',
        'Magnésio glicinato 400mg — cãibras, sono e ansiedade',
        'Vitamina C 1-2g — imunidade e absorção de ferro'
      ],
      dietoterapia: [
        'Ferro: carnes magras, feijão, lentilha, espinafre + vitamina C',
        'Vitamina A: cenoura, manga, batata-doce, gema de ovo',
        'Zinco: sementes de abóbora, carne de boi, leguminosas',
        'Magnésio: banana, abacate, sementes de girassol, cacau 70%',
        'B12: carnes, ovos, laticínios (veganos: suplementar obrigatoriamente)',
        'Vitamina C: acerola, goiaba, kiwi, pimentão cru',
        'Potássio: banana, batata-doce, feijão, espinafre'
      ],
      estilo_vida: [
        'Exposição solar 15-20min/dia (braços e pernas) — vitamina D natural',
        'Não tomar café junto com as refeições — inibe absorção de ferro',
        'Cozinhar em panela de ferro — incrementa ferro nos alimentos',
        'Dormir 7-9h — regeneração e síntese de nutrientes essenciais',
        'Reduzir álcool — interfere na absorção de B1, B12, magnésio e zinco'
      ],
      orientacoes: [
        'Solicitar: hemograma, ferritina, B12, 25-OH-D3, zinco sérico, magnésio',
        'Ferritina ideal em mulheres: >60 ng/mL (não apenas "normal")',
        'Vitamina D ideal: 40-80 ng/mL',
        'B12 funcional: >400 pg/mL',
        'Vegetarianos/veganos: monitorar B12, ferro, D3, zinco e ômega-3 trimestralmente',
        'Reavaliar exames após 90 dias de suplementação'
      ]
    }
  },
  {
    id: 'sc-sinais-ouvido',
    categoria: 'Sinais no Ouvido',
    emoji: '👂',
    title: 'O que seu Ouvido está Avisando',
    image: 'sinais-ouvido.jpg',
    sinais: [
      'Vinco no lóbulo da orelha (→ Alerta para o coração e artérias / risco cardiovascular)',
      'Pelos no ouvido interno (→ Ligado a hormônios e risco cardíaco em homens)',
      'Orelhas vermelhas (→ Sinal de estresse ou pressão arterial alta)',
      'Zumbido pulsátil (→ Prestar atenção ao fluxo sanguíneo / pressão e circulação)',
      'Coceira no ouvido (→ Alerta para o intestino ou imunidade comprometida)',
      'Orelha pálida (→ Má circulação e falta de oxigênio / anemia)'
    ],
    diagnostico: 'O ouvido externo e seus sinais são marcadores de saúde cardiovascular e metabólica. O sinal de Frank (vinco diagonal no lóbulo da orelha) tem correlação documentada com aterosclerose e risco cardiovascular aumentado. Pelos no ouvido interno em homens são marcadores de androgenização. Orelhas vermelhas indicam vasodilatação por estresse ou hipertensão — resposta autonômica ao cortisol. Zumbido pulsátil (sincrônico com o batimento cardíaco) pode indicar hipertensão, aterosclerose carotídea ou fístula arteriovenosa. Coceira crônica no ouvido correlaciona-se com candidíase sistêmica, disbiose e alergia alimentar. Orelha pálida indica vasoconstrição — típica de anemia ou baixa pressão.',
    condutas: {
      fitoterapia: [
        'Ginkgo biloba 120-240mg/dia — zumbido, circulação coclear e microvascular',
        'Cynara scolymus + Berberina — colesterol e proteção cardiovascular',
        'Ashwagandha + Rhodiola — cortisol e orelhas vermelhas por estresse',
        'Própolis 400mg — infecção fúngica de ouvido e imunidade',
        'Allium sativum (alho) — antifúngico e cardiovascular'
      ],
      suplementacao: [
        'Magnésio 400mg — proteção coclear e prevenção de zumbido',
        'Ômega-3 EPA+DHA 2-3g — anti-inflamatório cardiovascular',
        'Coenzima Q10 200mg — função cardíaca e energia mitocondrial coclear',
        'Zinco 30mg — imunidade do canal auditivo externo',
        'Vitamina B12 (se zumbido + dormência) — neuropatia auditiva',
        'Ferro quelado (se orelha pálida + anemia) — oxigenação tecidual',
        'Niacina B3 — vasodilatação e microcirculação coclear'
      ],
      dietoterapia: [
        'Dieta mediterrânea — proteção cardiovascular (sinal de Frank)',
        'Reduzir sal <2g/dia — controle da pressão arterial',
        'Probióticos e prebióticos — disbiose e coceira de ouvido',
        'Eliminar açúcar e laticínios — candidíase e coceira',
        'Mirtilo, romã, uva roxa — polifenóis protetores cardiovasculares'
      ],
      estilo_vida: [
        'Proteção auditiva em ambientes ruidosos — prevenção de zumbido',
        'Monitorar PA em casa — hipertensão e orelhas vermelhas',
        'Reduzir cafeína — pode agravar zumbido',
        'Exercício aeróbico regular — circulação e saúde cardiovascular',
        'Higiene: limpar apenas a parte externa do ouvido, nunca cotonete interno'
      ],
      orientacoes: [
        'Sinal de Frank (vinco no lóbulo): solicitar lipidograma, ECG, Lp(a), PCR-us',
        'Zumbido pulsátil: otorrinolaringologista + doppler de carótidas + PA',
        'Orelhas vermelhas persistentes: monitorar PA, cortisol salivar',
        'Coceira crônica refratária: investigar candidíase sistêmica e alergias alimentares',
        'Perda auditiva súbita: audiologista em 24-48h (janela terapêutica)'
      ]
    }
  },
  {
    id: 'sc-unhas-avisando',
    categoria: 'Sinais nas Unhas',
    emoji: '💅',
    title: 'Suas Unhas estão Avisando — Sinais de Saúde',
    image: 'unhas-avisando.jpg',
    sinais: [
      'Manchas brancas nas unhas (→ Deficiência de Zinco ou pequeno trauma)',
      'Unhas amareladas (→ Infecção fúngica ou problema na tireoide)',
      'Formato de colher / côncava / coiloníquia (→ Anemia grave por deficiência de ferro)',
      'Linhas verticais nas unhas (→ Envelhecimento normal ou deficiência de B12)',
      'Linhas horizontais / ranhuras / Linhas de Beau (→ Doença grave recente ou desnutrição)',
      'Unhas azuladas ou roxeadas (→ Baixo oxigênio / problema cardíaco ou pulmonar)',
      'Linha preta na unha (→ Aviso de Melanoma — procurar médico urgente)',
      'Unhas descamando / friáveis (→ Desidratação ou deficiência de Biotina)',
      'Unhas em baqueta / clubbing (→ Doença crônica pulmonar, cardíaca ou hepática)'
    ],
    diagnostico: 'As unhas são formadas por queratina e refletem o estado nutricional, metabólico e sistêmico ao longo de meses. Coiloníquia (forma de colher) é patognomônica de anemia ferropriva grave. Unhas azuladas (cianose periférica) indicam hipóxia — emergência se aguda. Linha preta longitudinal (melanoniquía) deve sempre ser avaliada dermatologicamente — pode ser melanoma subungueal. Unhas em baqueta (clubbing) indicam doença pulmonar crônica (DPOC, fibrose), cardiopatia cianótica ou cirrose. Linhas de Beau (sulcos horizontais) marcam o momento de um estresse sistêmico grave.',
    condutas: {
      fitoterapia: [
        'Equisetum arvense (cavalinha) — sílica orgânica para fortalecimento de unhas',
        'Urtica dioica (urtiga) — ferro, minerais e queratina',
        'Própolis tópico 11% — antifúngico natural para onicomicose',
        'Tea tree oil diluído 5% — antifúngico tópico para unhas amareladas'
      ],
      suplementacao: [
        'Zinco quelado 30-50mg — manchas brancas e imunidade das unhas',
        'Biotina 5-10mg/dia — unhas frágeis, quebradiças e descamando',
        'Ferro bisglicinato + vitamina C (coiloníquia) — reposição de ferro',
        'Vitamina B12 (metilcobalamina) 1000mcg — linhas verticais e neuropatia',
        'Colágeno hidrolisado 10g/dia — estrutura da matriz ungueal',
        'Ômega-3 EPA+DHA — hidratação e inflamação das unhas'
      ],
      dietoterapia: [
        'Gelatina natural e caldo de ossos — colágeno para estrutura ungueal',
        'Ovos, sementes e leguminosas — biotina, zinco e proteínas',
        'Carnes magras e folhas verde-escuras + vitamina C — ferro biodisponível',
        'Hidratação 35ml/kg/dia — unhas descamando e ressecadas',
        'Reduzir álcool — depleta zinco, B12 e biotina'
      ],
      estilo_vida: [
        'Usar luvas ao lavar louça ou usar produtos químicos',
        'Hidratante com ureia 10% nas unhas e cutículas',
        'Evitar acetona frequente — resseca e fragiliza a lâmina ungueal',
        'LINHA PRETA NA UNHA: dermatologista urgente',
        'UNHAS AZULADAS AGUDAS: emergência — oximetria imediata'
      ],
      orientacoes: [
        'Linha preta subungueal: biópsia ungueal urgente (melanoma subungueal)',
        'Unhas azuladas: oximetria de pulso imediata; SpO2 <94% → emergência',
        'Clubbing: Rx de tórax, espirometria, ecocardiograma',
        'Coiloníquia: hemograma, ferritina, ferro sérico',
        'Onicomicose resistente a tópico: encaminhar ao dermatologista para sistêmico'
      ]
    }
  },
  {
    id: 'sc-lingua-homeopatia',
    categoria: 'Língua e Digestão',
    emoji: '🌿',
    title: 'A Língua Fala — Leitura Funcional e Homeopática',
    image: 'sinais-lingua.jpg',
    sinais: [
      'Aspecto saudável: língua rosada, úmida, sem saburra ou fissuras',
      'Camada branca persistente / saburra (→ Desequilíbrio da microbiota / disbiose)',
      'Coloração muito clara ou pálida (→ Baixa oxigenação / anemia / deficiência de ferro ou B12)',
      'Tom amarelado na língua (→ Sobrecarga metabólica / fígado / resistência insulínica)',
      'Rachaduras ou fissuras (→ Desidratação / estresse crônico / alterações digestivas)',
      'Inchaço ou marcas laterais de dentes (→ Hipotireoidismo / inflamação / retenção hídrica)',
      'Vermelha brilhante e sensível (→ Inflamação sistêmica / déficit de vitaminas)',
      'Escurecida ou acinzentada (→ Antibióticos frequentes / tabagismo / metais pesados)'
    ],
    diagnostico: 'A língua é um órgão altamente vascularizado e de renovação celular rápida. Na medicina funcional e na MTC, é o espelho do estado digestivo e metabólico global. Saburra branca persistente indica disbiose intestinal. Língua pálida é marcador de anemia — deficiência de ferro, B12 ou folato. Língua amarela indica calor-umidade no estômago e intestinos (MTC) — estase hepática, SIBO e resistência insulínica. Fissuras crônicas ligam-se ao estresse crônico e desidratação. Língua inchada com marcas de dentes: acúmulo de fluídos — hipotireoidismo ou insuficiência renal. Língua vermelha brilhante sem saburra: inflamação crônica e esgotamento.',
    condutas: {
      fitoterapia: [
        'Antimonium crudum (homeopático) — saburra branca espessa e digestão lenta',
        'Nux vomica (homeopático) — língua amarelada posterior com toxemia digestiva',
        'Bryonia alba (homeopático) — língua seca, castanha ou rachada por desidratação',
        'Mercurius solubilis (homeopático) — língua flácida com marcas de dentes',
        'Curcuma longa + Cynara scolymus — detox hepático e digestão',
        'Probióticos + Saccharomyces boulardii — disbiose e saburra'
      ],
      suplementacao: [
        'Vitamina B12 (metilcobalamina) 1000mcg — língua pálida/clara e neuropatia',
        'Ferro quelado + vitamina C — língua pálida com anemia',
        'Zinco quelado 30mg — imunidade da mucosa oral',
        'Vitamina B2 (riboflavina) 50mg — língua sensível e fissuras',
        'Ácido fólico 800mcg — úlceras orais e língua pálida',
        'Probióticos de amplo espectro — microbiota oral e intestinal',
        'Magnésio glicinato 400mg — língua tensa e fissuras por estresse'
      ],
      dietoterapia: [
        'Eliminar açúcar e farináceos refinados — saburra e disbiose',
        'Aumentar hidratação: 35ml/kg/dia — fissuras e ressecamento',
        'Probióticos alimentares: kefir, iogurte natural, kombucha',
        'Vegetais fermentados — microbiota saudável',
        'Reduzir álcool e cigarro — língua escurecida e acinzentada',
        'Chá de erva-cidreira e hortelã-pimenta — digestão e mucosa oral'
      ],
      estilo_vida: [
        'Raspagem lingual com raspador de língua ao acordar — higiene e detox',
        'Óleo pulling (bochechar óleo de coco 10-15min) — detox oral e microbiota',
        'Não fumar — principal causa de língua escurecida e leucoplasia',
        'Hidratação regular ao longo do dia',
        'Reduzir estresse — língua tensa com fissuras e marcas de dentes'
      ],
      orientacoes: [
        'Saburra espessa persistente: investigar SIBO, H. pylori, disbiose',
        'Língua pálida: hemograma, ferritina, vitamina B12, folato',
        'Língua inchada com marcas de dentes: TSH, creatinina, albumina',
        'Língua vermelha lisa (glossite atrófica): B12, B2, ferro — urgente',
        'Manchas brancas não removíveis: encaminhar ao dentista (leucoplasia)',
        'Língua assimétrica ou com massa: avaliação médica urgente'
      ]
    }
  },
  {
    id: 'sc-disturbios-unhas-clinico',
    categoria: 'Sinais nas Unhas',
    emoji: '🔬',
    title: 'Sinais e Distúrbios das Unhas — Referência Clínica',
    image: 'disturbios-unhas-clinico.jpg',
    sinais: [
      'Linhas de Beau (sulcos horizontais profundos) (→ Estresse físico grave, doença sistêmica recente, quimioterapia)',
      'Onicorrexe (linhas longitudinais com fragilidade) (→ Envelhecimento, tireoide, deficiência de B12)',
      'Traquioníquia (unhas rugosas como lixa) (→ Líquen plano, alopecia areata, psoríase)',
      'Onicosquizia (unhas em camadas / laminação) (→ Desidratação, acetona frequente, deficiência de ferro)',
      'Onicólise (separação da lâmina do leito) (→ Hipotireoidismo, psoríase, infecção fúngica, trauma)',
      'Hemorragias em estilhaço (→ Endocardite bacteriana, vasculite, trauma local)',
      'Pontilhado psoriático / pitting (→ Psoríase, artrite psoriática)',
      'Unhas de Terry (base branca, extremidade rosa) (→ Cirrose, insuficiência cardíaca ou renal)',
      'Baqueteamento digital / clubbing (→ DPOC, fibrose pulmonar, cardiopatia cianótica, cirrose)',
      'Coiloníquia / formato colher (→ Anemia ferropriva grave, hemocromatose)',
      'Sinal de Hutchinson / linha preta subungueal (→ Melanoma subungueal — URGENTE)',
      'Síndrome da unha amarela (→ Linfedema, doenças respiratórias crônicas)'
    ],
    diagnostico: 'Os distúrbios ungueais são sinais clínicos de alta relevância diagnóstica. Hemorragias em estilhaço múltiplas sem trauma são alerta para endocardite bacteriana subaguda. Unhas de Terry (2/3 brancos + 1/3 rosa) indicam albumina baixa — cirrose, ICC ou IR. Baqueteamento digital com ângulo de Lovibond >180° indica hipóxia tecidual crônica — DPOC ou fibrose pulmonar. Onicólise bilateral sem trauma deve levantar suspeita de hipotireoidismo. Pitting associado a artralgia indica artrite psoriática. Sinal de Hutchinson (pigmento escuro que se estende da matriz às dobras ungueais) é sinal de melanoma subungueal — emergência dermatológica.',
    condutas: {
      fitoterapia: [
        'Equisetum arvense (cavalinha) — sílica e fortalecimento ungueal',
        'Uncaria tomentosa (Unha-de-gato) — imunomodulação (psoríase, líquen plano)',
        'Silybum marianum — hepatoproteção (unhas de Terry / cirrose)',
        'Curcuma longa — anti-inflamatório (artrite psoriática)',
        'Própolis + Tea tree oil tópico — onicomicose'
      ],
      suplementacao: [
        'Ferro bisglicinato + vitamina C — coiloníquia e anemia ferropriva',
        'Vitamina B12 (metilcobalamina) — onicorrexe e neuropatia',
        'Biotina 10mg/dia — onicosquizia e fragilidade',
        'Zinco 50mg — imunidade e formação da matriz ungueal',
        'Vitamina D3 + K2 — regulação imune (psoríase, líquen plano)',
        'Colágeno hidrolisado 10g + vitamina C — estrutura da lâmina',
        'Ômega-3 EPA+DHA 3g — anti-inflamatório psoríase e sistêmico'
      ],
      dietoterapia: [
        'Dieta anti-inflamatória — psoríase, líquen plano e condições autoimunes',
        'Testar eliminar glúten 60 dias — psoríase frequentemente associada',
        'Proteína de qualidade 1,5-2g/kg/dia — síntese de queratina',
        'Gelatina, caldo de ossos — colágeno e estrutura ungueal',
        'Vegetais fermentados e probióticos — microbiota e autoimunidade'
      ],
      estilo_vida: [
        'SINAL DE HUTCHINSON: dermatologista urgente — melanoma subungueal',
        'UNHAS DE TERRY + ICTERÍCIA: emergência hepática',
        'HEMORRAGIAS EM ESTILHAÇO MÚLTIPLAS: hemocultura urgente (endocardite)',
        'Luvas de proteção em tarefas úmidas',
        'Hidratante de ureia 10% para onicosquizia'
      ],
      orientacoes: [
        'Sinal de Hutchinson: biópsia ungueal urgente',
        'Unhas de Terry: albumina, TGO, TGP, creatinina, pro-BNP',
        'Hemorragias em estilhaço múltiplas: hemocultura, ecocardiograma',
        'Onicólise: TSH, T4 livre (hipotireoidismo), cultura fúngica',
        'Pitting ungueal + artralgia: encaminhar reumatologista (artrite psoriática)',
        'Clubbing progressivo: Rx tórax, espirometria, ecocardiograma'
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
