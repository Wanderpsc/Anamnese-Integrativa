// Script to add Bristol Stool Scale entry to subclinicalIntegrativeData.json
const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'src/data/subclinicalIntegrativeData.json');
const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

// Check if already exists
if (data.find(d => d.id === 'sc-escala-bristol')) {
  console.log('Entry already exists, skipping.');
  process.exit(0);
}

const bristolEntry = {
  "id": "sc-escala-bristol",
  "categoria": "Saúde Intestinal",
  "emoji": "💩",
  "title": "Escala de Bristol — Formato e Consistência das Fezes",
  "image": "escala-bristol.jpg",
  "sinais": [
    "Tipo 1 — Pequenos pedaços duros separados (bolinhas duras como noz) — Constipação grave",
    "Tipo 2 — Formato de linguiça endurecida e irregular — Constipação",
    "Tipo 3 — Formato de linguiça com rachaduras na superfície — Normal (limite inferior)",
    "Tipo 4 — Lisa, macia e alongada (cobra) — Ideal / Ótimo",
    "Tipo 5 — Pedaços macios separados com bordas definidas — Trânsito acelerado",
    "Tipo 6 — Fragmentos pastosos com bordas irregulares — Diarreia leve",
    "Tipo 7 — Totalmente líquida, sem partes sólidas — Diarreia intensa",
    "Fezes com sangue vivo (vermelho) — Hemorragia baixa",
    "Fezes pretas como piche (melena) — Hemorragia alta ou uso de ferro/bismuto",
    "Fezes com muco — Inflamação intestinal ou SII",
    "Fezes pálidas / esbranquiçadas — Colestase, icterícia obstrutiva",
    "Fezes com gordura (esteatorreia) — Má absorção, insuficiência pancreática",
    "Alternância diarreia-constipação — Síndrome do Intestino Irritável (SII)",
    "Urgência evacuatória intensa — Retocolite ulcerativa / Doença de Crohn",
    "Dor ao evacuar / tenesmo — Fissura anal, hemorroidas, colite"
  ],
  "diagnostico": "A Escala de Bristol (1997, Lewis & Heaton) classifica as fezes em 7 tipos correlacionados ao tempo de trânsito intestinal. Tipos 1-2: constipação (trânsito lento, >72h). Tipos 3-4: padrão ideal (24-72h). Tipos 5-7: diarreia (trânsito acelerado, <24h). Sinais adicionais como sangue, muco, gordura e cor alterada são marcadores de patologias específicas que requerem investigação imediata.",
  "condutas": {
    "fitoterapia": [
      "Psyllium (Plantago ovata) 5-10g/dia — fibra solúvel reguladora; normaliza tipos 1-2 E 5-6; tomar com bastante água",
      "Senna alexandrina — laxante estimulante para tipos 1-2 (uso máximo 7-10 dias); 15-30mg sennosídeos à noite",
      "Aloe vera 50-200mg extrato seco — laxante leve (constipação leve-moderada); evitar em gestação",
      "Melissa officinalis + Mentha piperita — antiespasmódico intestinal para SII e cólicas (tipos 5-6)",
      "Saccharomyces boulardii 5-10 bilhões UFC/dia — probiótico para diarreia associada a antibióticos (tipos 6-7)",
      "Tormentil (Potentilla tormentilla) — adstringente intestinal, diarreia crônica (tipos 6-7); 300mg 3x/dia",
      "Gengibre (Zingiber officinale) 250-500mg — antiemético e procinético leve; útil em trânsito lento"
    ],
    "suplementacao": [
      "Magnésio quelado ou citrato 300-400mg/dia — amolece fezes (tipos 1-2), relaxa musculatura intestinal; dose laxante: 600-800mg",
      "Probióticos multiestirpe 20-50 bilhões UFC — Lactobacillus + Bifidobacterium: normaliza flora em todos os tipos alterados; 60-90 dias",
      "Glutamina 5-15g/dia — reparo da mucosa intestinal (tipos 6-7 crônicos, Crohn, retocolite)",
      "Zinco quelado 20-30mg/dia — reduz duração e gravidade da diarreia infecciosa (OMS recomenda em diarreia aguda)",
      "Vitamina D3 2000-5000UI/dia — modulação imune intestinal; deficiência relacionada a DII (Crohn, retocolite)",
      "Ômega-3 EPA 1-3g/dia — anti-inflamatório intestinal; reduz atividade de DII",
      "Berberina 500mg 2-3x/dia — antimicrobiana e reguladora intestinal (diarreia tipos 6-7 + disbiose)",
      "Ferro bisglicinato 30mg/dia — apenas se fezes pretas por deficiência comprovada (verificar sangramento antes)"
    ],
    "dietoterapia": [
      "Tipos 1-2 (Constipação): aumentar fibras insolúveis — farelo de trigo, sementes de linhaça, ameixa seca, kiwi",
      "Tipos 1-2: hidratação 2,5-3L de água/dia; café e suco de ameixa têm efeito laxante natural",
      "Tipos 6-7 (Diarreia): dieta BRAT — banana, arroz branco, maçã sem casca, torrada; evitar lactose e gordura",
      "Tipos 6-7: caldo de ossos e arroz cozido repõem eletrólitos e protegem mucosa",
      "SII (alternância): dieta Low FODMAP — reduzir trigo, cebola, alho, leite, feijão, maçã, pêra",
      "Fezes com gordura: fracionar refeições, reduzir gordura total, enzimas digestivas com refeições",
      "Todos os tipos: evitar ultraprocessados, corantes, adoçantes artificiais (sorbitol causa diarreia osmótica)",
      "Fermentados naturais (kefir, iogurte, chucrute) para reequilíbrio da microbiota"
    ],
    "estilo_vida": [
      "Horário regular para evacuar (preferência após o café) — reflexo gastrocólico é mais forte pela manhã",
      "Posição de cócoras com apoio nos pés (banquinho) — alinha o reto, reduz esforço e hemorroidas",
      "Atividade física 30 min/dia — aumenta motilidade intestinal (eficaz em constipação tipos 1-2)",
      "Não ignorar a vontade de evacuar — inibição crônica leva a constipação progressiva",
      "Técnica de respiração diafragmática e massagem abdominal (sentido horário) para tipos 1-2",
      "Reduzir estresse e ansiedade — eixo cérebro-intestino: estresse piora SII, colite e diarreia funcional",
      "Higiene das mãos rigorosa antes de comer — prevenção de gastroenterites (tipos 6-7 infecciosos)"
    ],
    "orientacoes": [
      "URGÊNCIA MÉDICA: sangue nas fezes (vermelho vivo ou preto), perda de peso inexplicada, diarreia > 3 dias com febre",
      "Investigar: colonoscopia para mudança súbita do hábito intestinal após 50 anos ou histórico familiar de CCR",
      "Fezes pretas (melena): excluir sangramento antes de assumir que é ferro — endoscopia digestiva alta",
      "Fezes pálidas + urina escura: solicitar bilirrubinas + TGO/TGP + GGT + fosfatase alcalina + USG abdominal urgente",
      "Esteatorreia persistente: elastase fecal, teste de gordura fecal, amilase/lipase pancreática",
      "SII: critérios Roma IV — 3+ meses de dor abdominal relacionada à evacuação; encaminhar gastroenterologia",
      "Diarreia crônica > 4 semanas: coprocultura + parasitológico + pesquisa de Clostridioides difficile",
      "Registro fotográfico das fezes com a escala de Bristol é ferramenta de acompanhamento válida em consulta"
    ],
    "contraindicacoes": [
      "Senna: contraindicada em obstrução intestinal, apendicite, doença inflamatória intestinal ativa, gestação",
      "Magnésio em dose laxante: insuficiência renal — risco de hipermagnesemia",
      "Psyllium: pode reduzir absorção de medicamentos — tomar 2h separado de outros medicamentos",
      "Berberina: interação com ciclosporina e digoxina; contraindicada na gestação",
      "Ferro: NÃO usar sem confirmação de deficiência — pode mascarar sangramento e causar constipação (tipo 1-2)"
    ]
  }
};

data.push(bristolEntry);
fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
console.log(`✅ Escala de Bristol adicionada. Total de entradas: ${data.length}`);
console.log('⚠️  Salve a imagem da Escala de Bristol como:');
console.log('   public/assets/subclinico-biorressonancia/escala-bristol.jpg');
