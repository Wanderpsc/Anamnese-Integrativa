/**
 * MOTOR DE DIAGNÓSTICO DE DOENÇAS POR EXAMES LABORATORIAIS
 * Baseado em:
 * - Luciana Caxito Lopes: "Manual Prático da Anamnese Integrativa" e "Guia dos Exames Laboratoriais"
 * - Medicina Funcional Integrativa
 * - Protocolos ortomoleculares, fitoterápicos e fisioquânticos
 *
 * Cada diagnóstico contém:
 * - Condição / doença
 * - Critérios de ativação (exames necessários e seus quintis)
 * - Grau de certeza (confirmado | provável | predisposição)
 * - CID-10 de referência
 * - Descrição clínica para paciente
 * - Protocolos terapêuticos integrativos completos
 * - Exames complementares recomendados
 */

// ─────────────────────────────────────────────────────────────────────────────
// HELPER INTERNO
// ─────────────────────────────────────────────────────────────────────────────

/** Retorna true se o exame possui quintil esperado */
const q = (analysis, key, ...quintilIds) => {
  const d = analysis[key];
  if (!d || !d.quintil) return false;
  return quintilIds.includes(d.quintil.id);
};

/** Valor numérico de um resultado */
const v = (results, key) => parseFloat(results[key]) || 0;

// ─────────────────────────────────────────────────────────────────────────────
// BANCO DE DOENÇAS / CONDIÇÕES
// ─────────────────────────────────────────────────────────────────────────────

export const DISEASE_CRITERIA = [

  // ══════════════════════════════════════════════════════════════════════
  // METABOLISMO GLICÍDICO
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'dm2',
    condition: 'Diabetes Mellitus Tipo 2',
    cid: 'E11',
    category: 'Metabolismo Glicídico',
    icon: '🍬',
    color: '#e65100',
    severity: 'critical',
    criteria: (a, r) =>
      (q(a, 'glicose', 'Q5') && q(a, 'hemoglobinaGlicada', 'Q5')) ||
      v(r, 'glicose') >= 126 ||
      v(r, 'hemoglobinaGlicada') >= 6.5,
    certainty: (a, r) =>
      v(r, 'hemoglobinaGlicada') >= 6.5 ? 'confirmado' : 'provável',
    description:
      'Glicemia cronicamente elevada por resistência insulínica ou falência de células beta pancreáticas. ' +
      'Elevação sustentada da glicose causa dano vascular, neuropatia, retinopatia e nefropatia progressiva.',
    patientExplanation:
      'Seus exames indicam que o açúcar do sangue está persistentemente alto, o que caracteriza o Diabetes. ' +
      'Sem tratamento adequado, esse excesso de açúcar danifica vasos sanguíneos, rins, olhos e nervos.',
    protocols: [
      {
        category: '🌿 Fitoterápicos (Luciana Caxito / Boarim)',
        items: [
          'Berberina 500mg 3×/dia às refeições (ação comparável à Metformina)',
          'Gymnema sylvestre 800mg 2×/dia (reduz absorção de glicose intestinal)',
          'Canela do Ceilão 3g/dia (sensibilizador insulínico)',
          'Ginkgo biloba 240mg/dia (proteção vascular diabética)',
          'Jambolão (Syzygium cumini) 500mg 3×/dia',
          'Graviola (Annona muricata) 1000mg 2×/dia',
        ],
      },
      {
        category: '💊 Ortomolecular',
        items: [
          'Cromo picolinato 500mcg 2×/dia (cofator receptor de insulina)',
          'Ácido alfa-lipóico (ALA) 600mg 2×/dia (antioxidante mitocondrial + sensibilizador)',
          'Magnésio dimalato 600mg/dia (essencial para sinalização insulínica)',
          'Vitamina D3 5.000-10.000 UI/dia + K2 MK7 200mcg',
          'Biotina 5mg/dia (síntese de ácidos graxos e glicose)',
          'Zinco quelado 30mg/dia',
          'Inositol 2g 2×/dia (sinalizador insulínico de segunda mensagem)',
          'Coenzima Q10 200mg/dia (proteção mitocondrial)',
        ],
      },
      {
        category: '🍽️ Alimentação',
        items: [
          'Dieta LOW-CARB ou cetogênica (< 50g carboidratos/dia)',
          'Jejum intermitente 16:8 diário',
          'Eliminar completamente açúcar, farinhas refinadas e ultraprocessados',
          'Priorizar: proteínas magras, gorduras saudáveis, vegetais verdes',
          'Vinagre de maçã 15ml antes das refeições (reduz pico glicêmico)',
          'Índice glicêmico baixo: aveia, leguminosas, batata-doce',
        ],
      },
      {
        category: '🏃 Estilo de Vida',
        items: [
          'Musculação 3–4×/semana (essencial — músculo consome glicose)',
          'Caminhada 30min após as refeições principais',
          'Controle do estresse (cortisol eleva glicemia)',
          'Sono 7-8h/noite',
          'Monitorar glicemia capilar em casa',
        ],
      },
      {
        category: '⚡ Fisioquântica / Bioressonância',
        items: [
          'Biofrequências para pâncreas e metabolismo glicídico',
          'Frequências de equilíbrio hormonal e redução inflamatória',
        ],
      },
    ],
    examsToInvestigate: [
      'HbA1c seriada a cada 3 meses',
      'Insulina de jejum + HOMA-IR',
      'Peptídeo C (reserva pancreática)',
      'Microalbuminúria (função renal)',
      'Fundo de olho anual',
      'Velocidade de condução nervosa (neuropatia)',
    ],
    references: 'Luciana Caxito Lopes - Manual Prático Anamnese Integrativa; ADA Standards 2024',
  },

  {
    id: 'prediabetes',
    condition: 'Pré-Diabetes / Resistência Insulínica',
    cid: 'R73.0',
    category: 'Metabolismo Glicídico',
    icon: '⚠️',
    color: '#ff9800',
    severity: 'warning',
    criteria: (a, r) => {
      const glicose = v(r, 'glicose');
      const hba1c = v(r, 'hemoglobinaGlicada');
      const insulina = v(r, 'insulina');
      const homaIR = (glicose * insulina) / 405;
      return (
        (glicose >= 100 && glicose < 126) ||
        (hba1c >= 5.7 && hba1c < 6.5) ||
        homaIR > 2.7
      );
    },
    certainty: () => 'provável',
    description:
      'Glicemia em faixa limítrofe ou resistência das células à insulina. As células precisam de doses cada vez maiores de insulina para metabolizar o açúcar, sobrecarregando o pâncreas.',
    patientExplanation:
      'Seus resultados mostram que seu organismo está com dificuldade para usar o açúcar corretamente. Isso pode evoluir para diabetes em poucos anos se não houver mudanças.',
    protocols: [
      {
        category: '🌿 Fitoterápicos',
        items: [
          'Berberina 500mg 2–3×/dia',
          'Gymnema sylvestre 400mg 2×/dia',
          'Canela do Ceilão 1–3g/dia',
          'Chá verde (EGCG) 500mg 2×/dia',
        ],
      },
      {
        category: '💊 Ortomolecular',
        items: [
          'Inositol mio-inositol 2g + D-chiro-inositol 200mg',
          'Cromo picolinato 200-500mcg/dia',
          'Magnésio 400-600mg/dia',
          'ALA 300-600mg/dia',
          'Vitamina D3 5.000 UI/dia',
          'Berberina ou Metformina fitofarmacológica',
        ],
      },
      {
        category: '🍽️ Alimentação',
        items: [
          'Reduzir carboidratos simples (não eliminar — apenas reduzir)',
          'Aumentar fibras solúveis: aveia, psyllium, linhaça',
          'Jejum intermitente 12:12 ou 14:10',
          'Proteína em cada refeição (âncora glicêmica)',
        ],
      },
      {
        category: '🏃 Estilo de Vida',
        items: [
          'Musculação 3×/semana',
          'Reduzir gordura abdominal (correlação direta)',
          'Meditação e manejo do estresse',
        ],
      },
    ],
    examsToInvestigate: [
      'Insulina de jejum + HOMA-IR',
      'HbA1c',
      'Peptídeo C',
      'TG/HDL ratio (>3 = RI)',
      'Vitamina D',
    ],
    references: 'Luciana Caxito Lopes - Guia dos Exames Laboratoriais; Dr. Jason Fung - The Diabetes Code',
  },

  // ══════════════════════════════════════════════════════════════════════
  // PERFIL LIPÍDICO / CARDIOVASCULAR
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'dislipidemia',
    condition: 'Dislipidemia Aterogênica',
    cid: 'E78.5',
    category: 'Cardiovascular',
    icon: '🫀',
    color: '#c62828',
    severity: 'critical',
    criteria: (a, r) =>
      (q(a, 'ldlColesterol', 'Q5') && q(a, 'hdlColesterol', 'Q1')) ||
      q(a, 'triglicerideos', 'Q5') ||
      v(r, 'ldlColesterol') > 160,
    certainty: (a, r) =>
      q(a, 'ldlColesterol', 'Q5') && q(a, 'hdlColesterol', 'Q1') ? 'confirmado' : 'provável',
    description:
      'LDL elevado + HDL baixo configura o perfil mais aterogênico. Risco de infarto e AVC aumentado em 4-5x. ' +
      'LDL pequeno e denso penetra a parede arterial formando placas de ateroma.',
    patientExplanation:
      'O colesterol "ruim" (LDL) está alto e o "bom" (HDL) está baixo. Esse desequilíbrio entope as artérias progressivamente, aumentando o risco de infarto e derrame.',
    protocols: [
      {
        category: '🌿 Fitoterápicos (Maria Rocha / Luciana Caxito)',
        items: [
          'Berberina 500mg 3×/dia (eficácia comparável à lovastatina)',
          'Alho envelhecido (Kyolic) 1200mg/dia',
          'Alcachofra 900mg 2×/dia (inibe síntese hepática colesterol)',
          'Gugulipídeo (Commiphora mukul) 500mg 3×/dia',
          'Psyllium 15g/dia (fibra solúvel reduz LDL)',
          'Levedo de cerveja vermelho (monacolina K) 10mg/dia',
        ],
      },
      {
        category: '💊 Ortomolecular',
        items: [
          'Ômega-3 EPA+DHA 3-4g/dia (reduz TG e LDL oxidado)',
          'Niacina (vitamina B3) 1g/dia (eleva HDL + reduz TG)',
          'Coenzima Q10 200-400mg/dia (se usar estatina)',
          'Vitamina E Tocoferol 800 UI/dia (antioxidante lipoprotéico)',
          'Vitamina C 2g/dia (síntese colágeno arterial)',
          'Magnésio 400mg/dia (vasodilatador)',
          'Tocotrienóis 300mg/dia (reduz síntese hepática colesterol)',
        ],
      },
      {
        category: '🍽️ Alimentação',
        items: [
          'Dieta mediterrânea ou anti-inflamatória',
          'Eliminar óleos vegetais (girassol, soja, canola) — usar azeite extravirgem',
          'Eliminar gorduras trans completamente',
          'Aumentar gorduras ômega-3: salmão selvagem, sardinha, chia, linhaça',
          'Fibras solúveis: aveia, maçã, psyllium, feijão',
          'Limitar carnes processadas (embutidos)',
          'Aumentar HDL: exercícios + vinho tinto moderado + oleico',
        ],
      },
      {
        category: '🏃 Estilo de Vida',
        items: [
          'Exercício aeróbico 150min/semana (essencial para HDL)',
          'Reduzir carboidratos simples (elevam TG e LDL denso)',
          'Parar tabagismo (reduz HDL 5-10%)',
          'Controle peso (cada 1kg perdido → +1mg/dL HDL)',
        ],
      },
    ],
    examsToInvestigate: [
      'LDL por ultracentrifugação (LDL pequeno e denso)',
      'Apolipoproteína B (ApoB)',
      'Lp(a) — fator de risco independente',
      'PCR-ultrassensível (risco cardiovascular)',
      'Homocisteína',
      'Escore de Cálcio Coronário (CAC)',
    ],
    references: 'Luciana Caxito Lopes - Guia dos Exames; Protocolo Maria Rocha',
  },

  {
    id: 'sindrome_metabolica',
    condition: 'Síndrome Metabólica',
    cid: 'E88.81',
    category: 'Metabolismo Glicídico',
    icon: '⚙️',
    color: '#e65100',
    severity: 'critical',
    criteria: (a, r) => {
      let criteria = 0;
      if (v(r, 'triglicerideos') >= 150) criteria++;
      if (v(r, 'hdlColesterol') < 40) criteria++;
      if (v(r, 'glicose') >= 100) criteria++;
      const tg = v(r, 'triglicerideos');
      const hdl = v(r, 'hdlColesterol');
      if (hdl > 0 && tg / hdl > 3) criteria++;
      if (q(a, 'insulina', 'Q5')) criteria++;
      return criteria >= 3;
    },
    certainty: () => 'confirmado',
    description:
      'Conjunto de alterações metabólicas — hiperglicemia, dislipidemia, hipertensão e obesidade abdominal — que juntos aumentam drasticamente o risco cardiovascular e de diabetes.',
    patientExplanation:
      'Há múltiplas alterações metabólicas simultâneas que trabalham juntas para aumentar o risco de doenças do coração, diabetes e AVC.',
    protocols: [
      {
        category: '🌿 Fitoterápicos',
        items: [
          'Berberina 500mg 3×/dia (atua em todos os critérios)',
          'Gymnema sylvestre 800mg/dia',
          'Canela do Ceilão 2g/dia',
          'Gengibre 1g 3×/dia (anti-inflamatório metabólico)',
          'Chá verde (EGCG 400mg 2×/dia)',
        ],
      },
      {
        category: '💊 Ortomolecular',
        items: [
          'Ômega-3 3g/dia',
          'Vitamina D3 10.000 UI/dia',
          'Magnésio 600mg/dia',
          'Cromo + Vanádio (sensibilizadores insulínicos)',
          'ALA 600mg/dia',
          'Resveratrol 500mg/dia',
          'Coenzima Q10 200mg/dia',
        ],
      },
      {
        category: '🍽️ Alimentação',
        items: [
          'Dieta low-carb + anti-inflamatória',
          'Restrição calórica 500kcal/dia abaixo do gasto',
          'Jejum intermitente (ABORDAGEM CENTRAL)',
          'Eliminar açúcar, farinha branca, refrigerantes',
          'Priorizar proteínas + gorduras + vegetais',
        ],
      },
    ],
    examsToInvestigate: [
      'HOMA-IR',
      'Insulina de jejum',
      'Medição abdominal (H: >102cm, M: >88cm)',
      'Pressão arterial',
      'PCR-us',
      'Ácido úrico',
    ],
    references: 'Luciana Caxito - Manual Integrativo; IDF Criteria 2006',
  },

  // ══════════════════════════════════════════════════════════════════════
  // TIREOIDE
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'hipotireoidismo_primario',
    condition: 'Hipotireoidismo Primário',
    cid: 'E03.9',
    category: 'Tireoide',
    icon: '🦋',
    color: '#1565c0',
    severity: 'critical',
    criteria: (a, r) =>
      (q(a, 'tsh', 'Q5') && q(a, 't4Livre', 'Q1')) ||
      (v(r, 'tsh') > 4.5 && v(r, 't4Livre') < 0.9),
    certainty: () => 'confirmado',
    description:
      'Glândula tireoide não produz hormônio suficiente. O organismo tenta compensar elevando o TSH. ' +
      'Causa lentidão do metabolismo, ganho de peso, fadiga intensa, depressão e perda de cabelo.',
    patientExplanation:
      'Sua glândula tireoide está trabalhando abaixo do ideal. Como resultado, o metabolismo fica lento: você engorda com facilidade, cansa com menos esforço e pode se sentir deprimido.',
    protocols: [
      {
        category: '🌿 Fitoterápicos (Luciana Caxito)',
        items: [
          'Ashwagandha (Withania somnifera) 600mg 2×/dia — estimula eixo tireoidiano',
          'Guggul (Commiphora mukul) 500mg 2×/dia — estimula conversão T4→T3',
          'Bladderwrack (Fucus vesiculosus) 150mg/dia — fonte natural de iodo',
          'Bacopa monnieri 300mg 2×/dia — suporte neurológico',
        ],
      },
      {
        category: '💊 Ortomolecular',
        items: [
          'Selênio metionina 200mcg/dia (conversão T4→T3)',
          'Zinco quelado 30mg/dia (cofator síntese T3)',
          'Vitamina D3 10.000 UI/dia (expressão de receptores tireoidianos)',
          'Vitamina A 5.000 UI/dia (cofator receptor hormônio tireoidiano)',
          'Tirosina 1g 2×/dia (substrato síntese T4)',
          'Iodo (kelp) 150-500mcg/dia (avaliar com TG e Anti-TPO)',
          'Ferro bisglicinato (deficiência prejudica síntese)',
          'Magnésio 400mg/dia',
        ],
      },
      {
        category: '🍽️ Alimentação',
        items: [
          'Reduzir bociogênios crus: couve, brócolis, repolho (cozinhar neutraliza)',
          'Fontes de iodo: peixe marinho, frutos do mar, sal marinho iodado',
          'Selênio: castanha-do-pará 2-3 unidades/dia',
          'Zinco: ostras, carne vermelha, sementes de abóbora',
          'Evitar glúten (associação Hashimoto-hipotireoidismo)',
        ],
      },
      {
        category: '⚕️ Médico (Convencional)',
        items: [
          'Levotiroxina (T4) — dose ajustada para TSH entre 1-2 mIU/L',
          'Considerar T4+T3 se persistir sintomas com T4 normal',
          'Monitorar a cada 6 meses',
        ],
      },
    ],
    examsToInvestigate: [
      'Anti-TPO (Hashimoto?)',
      'Anti-TG',
      'T3 Livre',
      'T3 Reverso (conversão periférica)',
      'Ultrassom de tireoide',
      'Selênio, Zinco, Vitamina D',
      'Ferritina',
    ],
    references: 'Luciana Caxito - Guia dos Exames Laboratoriais; Dr. Datis Kharrazian',
  },

  {
    id: 'hashimoto',
    condition: 'Tireoidite de Hashimoto (Hipotireoidismo Autoimune)',
    cid: 'E06.3',
    category: 'Tireoide',
    icon: '🦋',
    color: '#6a1b9a',
    severity: 'critical',
    criteria: (a, r) =>
      q(a, 'antiTpo', 'Q5') ||
      q(a, 'antiTireoglobulina', 'Q5') ||
      (q(a, 'tsh', 'Q5') && (q(a, 'antiTpo', 'Q4', 'Q5') || q(a, 'antiTireoglobulina', 'Q4', 'Q5'))),
    certainty: (a) =>
      q(a, 'antiTpo', 'Q5') ? 'confirmado' : 'provável',
    description:
      'O sistema imunológico ataca a tireoide progressivamente. É a causa mais comum de hipotireoidismo. ' +
      'Relacionada à permeabilidade intestinal aumentada (leaky gut), glúten, stress crônico e deficiências de selênio.',
    patientExplanation:
      'Seu sistema imunológico está atacando sua própria glândula tireoide. Isso é uma doença autoimune chamada Hashimoto, que destrói a tireoide progressivamente.',
    protocols: [
      {
        category: '🌿 Fitoterápicos Imunorreguladores',
        items: [
          'Ashwagandha 600mg 2×/dia (modulação imune)',
          'Nigella sativa (semente de cominho preto) 2g/dia (anti-autoimune)',
          'Curcumina 1500mg 3×/dia (reduz anti-TPO)',
          'Boswellia serrata 400mg 3×/dia',
          'Uncaria tomentosa (Unha de gato) 500mg 3×/dia',
        ],
      },
      {
        category: '💊 Ortomolecular',
        items: [
          'Selênio 200mcg/dia (reduz Anti-TPO em até 40%)',
          'Vitamina D3 10.000 UI/dia (imunomodulador)',
          'Zinco 30mg/dia',
          'Vitamina A 5.000 UI/dia',
          'Ômega-3 3g/dia (anti-inflamatório imunológico)',
          'L-Glutamina 5g 2×/dia (reparo intestinal — fundamental)',
          'Magnésio 400mg/dia',
          'Probióticos multiespécies 100bi UFC',
        ],
      },
      {
        category: '🍽️ Alimentação (ESSENCIAL)',
        items: [
          'ELIMINAR GLÚTEN COMPLETAMENTE por 3-6 meses (mimetismo molecular)',
          'Eliminar laticínios (caseína — mimética ao glúten)',
          'Dieta AIP (Autoimmune Protocol): elimina grãos, legumes, nightshades',
          'Reparar intestino: caldo de ossos, colágeno, glutamina',
          'Alimentos ricos em selênio: castanha-do-pará, peixes',
          'Reduzir açúcar e ultraprocessados',
        ],
      },
      {
        category: '🔬 Investigação Adicional',
        items: [
          'Teste de permeabilidade intestinal (zonulina)',
          'IgG de alimentos (intolerâncias que ativam autoimunidade)',
          'Cortisol (estresse perpetua autoimunidade)',
          'SIBO (supercrescimento bacteriano — leaky gut)',
        ],
      },
    ],
    examsToInvestigate: [
      'Anti-TPO seriado (a cada 6 meses)',
      'Anti-TireoglobulinaT',
      'T3 Livre e Reverso',
      'Zonulina (permeabilidade intestinal)',
      'IgG alimentar (cross-reatividade)',
      'Cortisol salivar 4 pontos',
      'Ultrassom tireoide (textura, volume)',
    ],
    references: 'Luciana Caxito; Dr. Datis Kharrazian - Why Do I Still Have Thyroid Symptoms?',
  },

  {
    id: 'hipertireoidismo',
    condition: 'Hipertireoidismo / Doença de Graves',
    cid: 'E05',
    category: 'Tireoide',
    icon: '🔥',
    color: '#d32f2f',
    severity: 'critical',
    criteria: (a, r) =>
      (q(a, 'tsh', 'Q1') && (q(a, 't4Livre', 'Q5') || q(a, 't3Livre', 'Q5'))) ||
      v(r, 'tsh') < 0.3,
    certainty: () => 'confirmado',
    description:
      'Tireoide hiperativa produzindo excesso de hormônios, acelerando o metabolismo. Pode causar arritmias, perda óssea acelerada, exoftalmia e crises tireotóxicas.',
    patientExplanation:
      'Sua tireoide está "acelerada", produzindo hormônios demais. Isso acelera tudo no seu corpo: coração, metabolismo, nervos — causando tremores, coração acelerado e perda de peso sem querer.',
    protocols: [
      {
        category: '🌿 Fitoterápicos (Caxito)',
        items: [
          'Melissa officinalis 600mg 3×/dia (inibe TSH e T4)',
          'Lemon balm: mesma planta, 600mg 3×/dia',
          'Bugleweed (Lycopus europaeus) 500mg 3×/dia',
          'Motherwort (Leonurus cardiaca) para taquicardia',
        ],
      },
      {
        category: '💊 Ortomolecular',
        items: [
          'Magnésio 600mg/dia (anti-arrítmico natural)',
          'L-Carnitina 2g/dia (antagonista periférico da T3)',
          'Vitamina D (imunomodulador se Graves)',
          'Ômega-3 3g/dia',
          'Evitar iodo extra (piora hipertireoidismo)',
        ],
      },
      {
        category: '⚕️ Médico (URGENTE)',
        items: [
          'Metimazol ou propiltiouracil (PTU) — uso médico',
          'Beta-bloqueador (para taquicardia)',
          'Avaliação de oftalmopatia de Graves',
          'Monitorar T3L, T4L e TSH mensalmente',
        ],
      },
    ],
    examsToInvestigate: [
      'TRAb (anticorpo receptor TSH — Graves)',
      'Anti-TPO',
      'T3 Total',
      'Captação de iodo radioativo',
      'Ultrassom com Doppler da tireoide',
      'ECG (arritmias)',
      'Densitometria óssea',
    ],
    references: 'Luciana Caxito - Guia dos Exames Laboratoriais',
  },

  // ══════════════════════════════════════════════════════════════════════
  // HEMATOLOGIA / ANEMIAS
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'anemia_ferropriva',
    condition: 'Anemia Ferropriva',
    cid: 'D50',
    category: 'Hematologia',
    icon: '🩸',
    color: '#b71c1c',
    severity: 'critical',
    criteria: (a, r) =>
      q(a, 'hemoglobina', 'Q1') &&
      (q(a, 'ferritina', 'Q1') || q(a, 'ferro', 'Q1') || q(a, 'saturacaoTransferrina', 'Q1')),
    certainty: (a) =>
      q(a, 'ferritina', 'Q1') && q(a, 'hemoglobina', 'Q1') ? 'confirmado' : 'provável',
    description:
      'Deficiência de ferro com redução dos glóbulos vermelhos. ' +
      'Ferritina baixa é o primeiro sinal — indica estoque zerado. ' +
      'Hemoglobina baixa = deficiência já instalada com sintomas.',
    patientExplanation:
      'Você está com falta de ferro no sangue. Isso faz seus glóbulos vermelhos diminuírem, transportando menos oxigênio para os tecidos. Resultado: cansaço intenso, palidez, falta de ar e queda de cabelo.',
    protocols: [
      {
        category: '🌿 Fitoterápicos',
        items: [
          'Spirulina 5g/dia (ferro heme biodisponível)',
          'Chlorella 3g/dia (fonte adicional de ferro e vitaminas)',
          'Urtiga (Urtica dioica) 1000mg 3×/dia (rica em ferro)',
          'Bardana 500mg 2×/dia',
        ],
      },
      {
        category: '💊 Ortomolecular',
        items: [
          'Ferro bisglicinato quelado 30-60mg/dia (alta absorção, sem efeitos GI)',
          'Vitamina C 500-1000mg junto com o ferro (potencializa absorção 3×)',
          'Vitamina B12 sublingual 2000mcg/dia',
          'Ácido fólico (metilfolato) 5mg/dia',
          'Vitamina B6 50mg/dia',
          'Cobre 2mg/dia (cofator para usar o ferro)',
          'Vitamina A 5.000 UI/dia (mobiliza ferro das reservas)',
        ],
      },
      {
        category: '🍽️ Alimentação',
        items: [
          'Fígado bovino 2-3×/semana (fonte mais biodisponível de ferro)',
          'Carnes vermelhas: 4-5×/semana',
          'Melado de cana 2 colheres/dia',
          'Beterraba + cenoura em sucos',
          'Feijão/lentilha + vitamina C junto',
          'Evitar café/chá preto junto às refeições (quelatam ferro)',
          'Evitar antiácidos (reduzem absorção)',
        ],
      },
      {
        category: '🔬 Investigação',
        items: [
          'Pesquisar causa: sangramento oculto (gastroduodenal), menstruação intensa',
          'Colonoscopia se > 50 anos ou suspeita de sangramento',
          'VEGF (crescimento tumoral como causa)',
          'Anticorpos anti-células parietais (gastrite atrófica)',
        ],
      },
    ],
    examsToInvestigate: [
      'Ferritina seriada (meta: 50-100 ng/mL)',
      'Reticulócitos (resposta ao tratamento)',
      'VCM + HCM (morfologia eritrocitária)',
      'Sangue oculto nas fezes',
      'Endoscopia/colonoscopia (se sem causa clara)',
      'Saturação de transferrina',
      'TIBC (capacidade de ligação do ferro)',
    ],
    references: 'Luciana Caxito - Manual Integrativo; WHO Anemia Guidelines',
  },

  {
    id: 'anemia_macrocitica',
    condition: 'Anemia Macrocítica (Megaloblástica)',
    cid: 'D52',
    category: 'Hematologia',
    icon: '🩸',
    color: '#c62828',
    severity: 'critical',
    criteria: (a, r) =>
      (q(a, 'vcm', 'Q5') || v(r, 'vcm') > 100) &&
      (q(a, 'vitaminaB12', 'Q1') || q(a, 'vitaminaB9', 'Q1') || q(a, 'acidoFolico', 'Q1')),
    certainty: () => 'confirmado',
    description:
      'Glóbulos vermelhos anormalmente grandes, mas em menor quantidade. Causada por deficiência de vitamina B12 ou ácido fólico. ' +
      'B12 baixa também causa neuropatia irreversível se não tratada.',
    patientExplanation:
      'Seus glóbulos vermelhos estão maiores do que o normal por falta de vitamina B12 ou ácido fólico. Além do cansaço, a falta de B12 pode danificar os nervos permanentemente.',
    protocols: [
      {
        category: '💊 Ortomolecular (PRIORITÁRIO)',
        items: [
          'Vitamina B12 (metilcobalamina) sublingual 2000-5000mcg/dia',
          'B12 intramuscular 1000mcg semanal por 4-6 semanas (se grave)',
          'Metilfolato (L-5-MTHF) 5mg/dia (NÃO ácido fólico sintético se MTHFR)',
          'Vitamina B6 (P5P) 50mg/dia',
          'Zinco 30mg/dia',
        ],
      },
      {
        category: '🌿 Fitoterápicos',
        items: [
          'Spirulina 5g/dia (vitaminas do complexo B)',
          'Levedo de cerveja 2 colheres/dia',
          'Chlorella 3g/dia',
        ],
      },
      {
        category: '🍽️ Alimentação',
        items: [
          'Fígado bovino (maior fonte de B12)',
          'Mariscos, ostras, sardinhas, salmão',
          'Ovos (especialmente gema)',
          'Folhas verdes escuras (folato)',
          'Leguminosas (lentilha, grão-de-bico)',
        ],
      },
      {
        category: '🔬 Investigação (Causa)',
        items: [
          'Anticorpos anti-fator intrínseco (anemia perniciosa)',
          'Anticorpos anti-células parietais (gastrite atrófica)',
          'Verificar uso de metformina, IBP (reduzem B12)',
          'MTHFR genético (metabolismo do folato)',
          'Teste de Schilling (absorção B12)',
        ],
      },
    ],
    examsToInvestigate: [
      'Vitamina B12 sérica',
      'Ácido fólico sérico e eritrocitário',
      'Homocisteína (marcador funcional B12)',
      'Ácido metilmalônico (marcador funcional B12)',
      'Anti-fator intrínseco',
      'Reticulócitos (resposta ao tratamento)',
    ],
    references: 'Luciana Caxito; Stabler SP - NEJM 2013',
  },

  // ══════════════════════════════════════════════════════════════════════
  // FUNÇÃO HEPÁTICA
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'esteatose_hepatica',
    condition: 'Esteatose Hepática (Fígado Gorduroso DHGNA)',
    cid: 'K76.0',
    category: 'Fígado',
    icon: '🟡',
    color: '#f57c00',
    severity: 'warning',
    criteria: (a, r) =>
      (q(a, 'tgp', 'Q4', 'Q5') || q(a, 'tgo', 'Q4', 'Q5') || q(a, 'ggt', 'Q4', 'Q5')) &&
      (q(a, 'triglicerideos', 'Q4', 'Q5') || q(a, 'glicose', 'Q4', 'Q5') || q(a, 'insulina', 'Q4', 'Q5')),
    certainty: (a) =>
      q(a, 'tgp', 'Q5') && q(a, 'triglicerideos', 'Q5') ? 'provável' : 'predisposição',
    description:
      'Acúmulo de gordura nas células do fígado, geralmente associado a síndrome metabólica. ' +
      'Pode evoluir para NASH (esteato-hepatite), fibrose e cirrose se não tratado.',
    patientExplanation:
      'Seu fígado está acumulando gordura em excesso. Assim como esteatose de músculos, o fígado fica sobrecarregado e inflamado, podendo progredir para danos mais sérios.',
    protocols: [
      {
        category: '🌿 Fitoterápicos (Hepatoprotetores)',
        items: [
          'Cardo mariano (Silimarina) 300mg 3×/dia — hepatoprotetor comprovado',
          'Alcachofra 900mg 2×/dia — estimula fluxo biliar',
          'Dente-de-leão 1000mg 2×/dia — diurético hepático',
          'Cúrcuma/Curcumina 1000mg 3×/dia — anti-inflamatório hepático',
          'Berberina 500mg 3×/dia — reduz gordura hepática até 15%',
          'Chá verde EGCG 400mg 2×/dia',
        ],
      },
      {
        category: '💊 Ortomolecular',
        items: [
          'N-Acetilcisteína (NAC) 1200mg 2×/dia (precursor glutationa)',
          'SAME (S-Adenosilmetionina) 400mg 2×/dia',
          'Colina 2g/dia (transporte lipídico hepático)',
          'Vitamina E 800 UI/dia (anti-inflamatório hepático)',
          'Ômega-3 3-4g/dia (reduz gordura hepática)',
          'Betaína (TMG) 3g/dia',
          'Vitamina D3 5.000 UI/dia',
          'Ácido alfa-lipóico 600mg/dia',
        ],
      },
      {
        category: '🍽️ Alimentação',
        items: [
          'Dieta LOW-CARB (reduz síntese de gordura hepática)',
          'Eliminar álcool completamente',
          'Eliminar frutose (refrig., sucos, mel em excesso) — causa direta',
          'Aumentar proteínas de qualidade',
          'Café sem açúcar (hepatoprotetor — 2-3 xícaras/dia)',
          'Brócolis e vegetais crucíferos',
        ],
      },
      {
        category: '🏃 Estilo de Vida',
        items: [
          'Perda de 7-10% do peso corporal reverte esteatose',
          'Exercício aeróbico 150min/semana',
          'Musculação (essencial para reversão)',
        ],
      },
    ],
    examsToInvestigate: [
      'Ultrassom de abdome (avalia grau de esteatose)',
      'Elastografia hepática (fibrose)',
      'TGO, TGP, GGT seriados',
      'Ácido úrico (correlacionado)',
      'Bilirrubinas',
      'Fosfatase alcalina',
      'NASH FibroTest',
    ],
    references: 'Luciana Caxito; EASL DHGNA Guidelines 2016',
  },

  // ══════════════════════════════════════════════════════════════════════
  // INFLAMAÇÃO / AUTOIMUNIDADE
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'inflamacao_cronica',
    condition: 'Inflamação Crônica de Baixo Grau',
    cid: 'R70',
    category: 'Inflamação',
    icon: '🔥',
    color: '#d84315',
    severity: 'warning',
    criteria: (a, r) =>
      q(a, 'proteinaCReativaUltrassensivel', 'Q4', 'Q5') ||
      (q(a, 'vhs', 'Q5') && q(a, 'proteinaCReativaUltrassensivel', 'Q4', 'Q5')) ||
      (q(a, 'ferritina', 'Q5') && q(a, 'proteinaCReativaUltrassensivel', 'Q4', 'Q5')),
    certainty: (a) =>
      q(a, 'proteinaCReativaUltrassensivel', 'Q5') ? 'confirmado' : 'provável',
    description:
      'Inflamação persistente e silenciosa que danifica progressivamente tecidos e órgãos. ' +
      'É o substrato patológico de praticamente todas as doenças crônicas: cardiovasculares, autoimunes, câncer, Alzheimer.',
    patientExplanation:
      'Há um incêndio silencioso no seu organismo. A inflamação crônica de baixo grau não dói, mas corrói vasos, articulações, neurônios e células ao longo do tempo.',
    protocols: [
      {
        category: '🌿 Anti-inflamatórios Naturais (Luciana Caxito)',
        items: [
          'Curcumina fitossomal 1500mg 3×/dia (potência similar ao ibuprofeno)',
          'Boswellia serrata (Incenso) 400mg 3×/dia — inibe 5-lipoxigenase',
          'Gengibre 2g/dia',
          'Pimenta-preta (piperina 20mg) — potencializa curcumina 2000%',
          'Resveratrol 500mg/dia',
          'Uncaria tomentosa (Unha-de-gato) 500mg 3×/dia',
          'Bromelina 500mg (entre refeições)',
        ],
      },
      {
        category: '💊 Ortomolecular',
        items: [
          'Ômega-3 EPA+DHA 3-4g/dia (prostaglandinas anti-inflamatórias)',
          'Vitamina D3 10.000 UI/dia (imunomodulador)',
          'Zinco 30mg/dia (anti-inflamatório)',
          'NAC 1200mg 2×/dia (antioxidante + glutationa)',
          'Vitamina C 2g 2×/dia',
          'Quercetina 1g 2×/dia',
          'Magnésio 400mg/dia',
          'Probióticos (eixo intestino-inflamação)',
        ],
      },
      {
        category: '🍽️ Alimentação Anti-inflamatória',
        items: [
          'Dieta mediterrânea ou anti-inflamatória de Wahls',
          'Aumentar frutas vermelhas (antocianinas)',
          'Ômega-3 (salmão, sardinha, chia, linhaça)',
          'Eliminar óleos de sementes (girassol, milho, soja) — pró-inflamatórios',
          'Eliminar glúten e laticínios por 30 dias (avaliar resposta)',
          'Eliminar açúcar — principal driver inflamatório',
          'Jejum intermitente (reduz NF-kB)',
        ],
      },
      {
        category: '🔬 Investigação da Causa',
        items: [
          'Investigar foco inflamatório: intestinal (disbiose), dental, infeccioso',
          'Rastreio de autoimunidade',
          'Cortisol (estresse perpetua)',
          'Metais pesados (trigger inflamatório)',
          'Glúten (anti-gliadina IgG)',
        ],
      },
    ],
    examsToInvestigate: [
      'PCR-ultrassensível seriado',
      'IL-6, TNF-alfa (citocinas inflamatórias)',
      'Homocisteína',
      'Ferritina (proteína fase aguda)',
      'FAN/ANA (autoimunidade)',
      'Microbiota intestinal',
      'Zinco, Magnésio, Vitamina D',
    ],
    references: 'Luciana Caxito; Mark Hyman - The UltraMind Solution',
  },

  {
    id: 'risco_cardiovascular',
    condition: 'Risco Cardiovascular Elevado',
    cid: 'I25.1',
    category: 'Cardiovascular',
    icon: '❤️',
    color: '#b71c1c',
    severity: 'critical',
    criteria: (a, r) => {
      const tg = v(r, 'triglicerideos');
      const hdl = v(r, 'hdlColesterol') || v(r, 'hdl');
      const ldl = v(r, 'ldlColesterol') || v(r, 'ldl');
      const ct = v(r, 'colesterolTotal');
      const ratioTgHdl = hdl > 0 ? tg / hdl : 0;
      const ratioLdlHdl = hdl > 0 ? ldl / hdl : 0;
      const ratioCtHdl = hdl > 0 ? ct / hdl : 0;
      return (
        ratioTgHdl > 3 ||
        ratioLdlHdl > 3.5 ||
        ratioCtHdl > 5 ||
        (q(a, 'homocisteina', 'Q5') && q(a, 'proteinaCReativaUltrassensivel', 'Q4', 'Q5'))
      );
    },
    certainty: () => 'provável',
    description:
      'Múltiplos marcadores indicam acúmulo de risco para eventos cardiovasculares (infarto, AVC). ' +
      'Razões lipídicas são melhores preditores que valores isolados de LDL.',
    patientExplanation:
      'Vários resultados juntos indicam que suas artérias estão sob risco progressivo. Agir agora pode evitar um infarto ou derrame nos próximos anos.',
    protocols: [
      {
        category: '🌿 Cardioprotetores',
        items: [
          'Berberina 500mg 3×/dia',
          'Alho envelhecido 1200mg/dia',
          'Hawthorn (Crataegus) 600mg 2×/dia',
          'Nattokinase 2000 FU/dia (fibrinolítico)',
          'Ômega-3 krill 2g/dia',
        ],
      },
      {
        category: '💊 Ortomolecular',
        items: [
          'Coenzima Q10 300mg/dia',
          'Magnésio 400mg/dia',
          'Vitamina K2 MK7 200mcg/dia',
          'Vitamina D3 5.000 UI/dia',
          'Niacina 1g/dia',
          'Folato 5mg + B12 1000mcg (homocisteína)',
          'L-Arginina 3g/dia (NO — vasodilatação)',
          'Trans-resveratrol 500mg/dia',
        ],
      },
      {
        category: '🏃 Estilo de Vida',
        items: [
          'Exercício aeróbico 150-300min/semana (ESSENCIAL)',
          'Pressão arterial < 120/80 (meta funcional)',
          'Parar tabagismo',
          'Controle do estresse (cortisol → adrenalina → hipertensão)',
          'Sono reparador 7-8h',
        ],
      },
    ],
    examsToInvestigate: [
      'Escore de cálcio coronário (CAC)',
      'ApoB / ApoA1',
      'Lp(a)',
      'Homocisteína',
      'PCR-us',
      'NT-proBNP (função cardíaca)',
      'Doppler de carótidas (espessura íntima-média)',
    ],
    references: 'Luciana Caxito; Dr. Mark Houston; ACC/AHA Cardiovascular Guidelines',
  },

  // ══════════════════════════════════════════════════════════════════════
  // FUNÇÃO RENAL
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'disfuncao_renal',
    condition: 'Disfunção Renal (DRC)',
    cid: 'N18',
    category: 'Rim',
    icon: '🫘',
    color: '#1565c0',
    severity: 'critical',
    criteria: (a, r) =>
      (q(a, 'creatinina', 'Q5') && q(a, 'ureia', 'Q5')) ||
      q(a, 'tfg', 'Q1') ||
      v(r, 'creatinina') > 1.5,
    certainty: (a) =>
      q(a, 'tfg', 'Q1') ? 'confirmado' : 'provável',
    description:
      'Os rins têm capacidade de filtração reduzida. Creatinina e uréia acumulam no sangue. ' +
      'Pode ser aguda (reversível) ou crônica (progressiva). Necessita acompanhamento nefrológico.',
    patientExplanation:
      'Seus rins estão com dificuldade para filtrar o sangue adequadamente. As toxinas que deveriam ser eliminadas ficam acumulando. É importante investigar a causa e proteger os rins.',
    protocols: [
      {
        category: '🌿 Nefroprotetores',
        items: [
          'Astragalus membranaceus 2g/dia (nefroprotetor comprovado)',
          'Dente-de-leão 1g 2×/dia (diurético suave)',
          'Cúrcuma 1000mg 2×/dia (anti-inflamatório renal)',
          'Cordyceps 1g 2×/dia (melhora TFG)',
        ],
      },
      {
        category: '💊 Ortomolecular',
        items: [
          'NAC 1200mg 2×/dia (antioxidante renal)',
          'Vitamina D 5.000 UI/dia (protetor renal)',
          'Ômega-3 3g/dia (anti-inflamatório renal)',
          'Vitamina E 400 UI/dia',
          'Ácido alfa-lipóico 600mg/dia',
          'Bicarbonato de sódio (médico — reduz acidose metabólica)',
        ],
      },
      {
        category: '🍽️ Alimentação',
        items: [
          'Dieta low protein (0.6-0.8g/kg) se TFG < 30',
          'Restrição de potássio e fósforo (estágio 3+)',
          'Hidratação adequada 2L/dia (água filtrada)',
          'Reduzir sal a < 2g/dia',
          'Evitar AINEs, contraste iodado, aminoglicosídeos',
          'Controlar pressão arterial rigorosamente',
        ],
      },
    ],
    examsToInvestigate: [
      'TFG calculada (CKD-EPI)',
      'Microalbuminúria/Proteinúria 24h',
      'Urina tipo I completo',
      'Sódio, Potássio, Fósforo, Cálcio',
      'PTH (hiperparatireoidismo secundário)',
      'Hemograma (anemia nefrogênica)',
      'Ultrassom renal bilateral',
    ],
    references: 'Luciana Caxito; KDIGO Guidelines',
  },

  // ══════════════════════════════════════════════════════════════════════
  // SAÚDE ÓSSEA
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'osteoporose_risco',
    condition: 'Predisposição à Osteoporose / Osteopenia',
    cid: 'M81',
    category: 'Saúde Óssea',
    icon: '🦴',
    color: '#795548',
    severity: 'warning',
    criteria: (a, r) =>
      (q(a, 'vitaminaD', 'Q1', 'Q2') && q(a, 'paratormonio', 'Q5')) ||
      (q(a, 'calcio', 'Q1') && q(a, 'vitaminaD', 'Q1')) ||
      q(a, 'osteocalcina', 'Q1'),
    certainty: () => 'predisposição',
    description:
      'Baixa densidade mineral óssea por deficiência de vitamina D, cálcio, magnésio ou desequilíbrio do PTH. ' +
      'Risco aumentado de fraturas, especialmente após menopausa e em idosos.',
    patientExplanation:
      'Seus ossos podem estar mais fracos do que deveriam. Isso aumenta o risco de fraturas por quedas, especialmente à medida que você envelhece.',
    protocols: [
      {
        category: '💊 Ortomolecular (ESSENCIAL)',
        items: [
          'Vitamina D3 10.000 UI/dia por 3 meses, depois 5.000 UI manutenção',
          'Vitamina K2 MK7 200mcg/dia (direciona cálcio para ossos)',
          'Cálcio citrato/malato 600mg + Magnésio 400mg à noite',
          'Boro 6-9mg/dia (estimula osteocalcina)',
          'Silício orgânico 50mg/dia (formação óssea)',
          'Strontium ranelate 680mg/dia',
          'Coenzima Q10 100mg/dia',
        ],
      },
      {
        category: '🌿 Fitoterápicos',
        items: [
          'Horsetail (Equisetum arvense) 400mg 2×/dia (sílica orgânica)',
          'Trébol vermelho (isoflavonas) 150mg/dia (mulheres)',
          'Lúpulo 200mg/dia (fitoestrogênio)',
          'Ashwagandha 600mg 2×/dia (anabólico ósseo)',
        ],
      },
      {
        category: '🍽️ Alimentação',
        items: [
          'Laticínios fermentados (kefir, iogurte)',
          'Sardinha com osso, salmão',
          'Leguminosas e vegetais verdes escuros',
          'Evitar excesso de café (lixivia cálcio)',
          'Evitar refrigerantes (fósforo competindo com cálcio)',
          'Reduzir álcool e sal (aumentam excreção de cálcio)',
        ],
      },
      {
        category: '🏃 Exercício',
        items: [
          'Musculação com carga (ESSENCIAL — força compressiva forma osso)',
          'Caminhada e exercícios de impacto',
          'Prevenir quedas: tai chi, yoga, equilíbrio',
          'Exposição solar diária',
        ],
      },
    ],
    examsToInvestigate: [
      'Densitometria óssea (DEXA)',
      'Vitamina D sérica (meta: 60-80 ng/mL)',
      'PTH intacto',
      'Cálcio ionizado',
      'Magnésio eritrocitário',
      'Osteocalcina (formação)',
      'CTX/NTX (reabsorção óssea)',
      'Cortisol (corticóides degradam osso)',
    ],
    references: 'Luciana Caxito; NOF Guidelines; Protocolo Maria Rocha',
  },

  // ══════════════════════════════════════════════════════════════════════
  // SISTEMA NERVOSO / NEUROLÓGICO
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'risco_alzheimer',
    condition: 'Predisposição à Neurodegeneração / Alzheimer',
    cid: 'G30',
    category: 'Neurológico',
    icon: '🧠',
    color: '#6a1b9a',
    severity: 'critical',
    criteria: (a, r) =>
      (q(a, 'betaAmiloide', 'Q1') && q(a, 'tau', 'Q5')) ||
      (q(a, 'vitaminaB12', 'Q1') && q(a, 'homocisteina', 'Q5')) ||
      (q(a, 'apoE4', 'Q5') && q(a, 'insulina', 'Q5')),
    certainty: (a) =>
      q(a, 'betaAmiloide', 'Q1') && q(a, 'tau', 'Q5') ? 'provável' : 'predisposição',
    description:
      'Marcadores de neurodegeneração alterados. A combinação de beta-amiloide baixo + TAU elevado indica acúmulo de placas e emaranhados neurofibrilares. ' +
      'Alzheimer é agora considerado "Diabetes Tipo 3" — resistência insulínica cerebral.',
    patientExplanation:
      'Alguns de seus exames indicam predisposição para doenças que afetam a memória e o raciocínio. Agir cedo pode retardar ou prevenir esse processo.',
    protocols: [
      {
        category: '🌿 Neuroprotetores (Luciana Caxito / Protocolo Bredesen)',
        items: [
          'Hericium erinaceus (Lion\'s Mane) 3g/dia — NGF (fator de crescimento nervoso)',
          'Bacopa monnieri 600mg/dia — melhora memória e reduz beta-amiloide',
          'Ashwagandha 600mg 2×/dia — clearance de amiloide',
          'Curcumina lipossomal 1000mg 3×/dia — dissolve placas amiloides',
          'Ginkgo biloba 240mg/dia — perfusão cerebral',
          'Rosmarinus officinalis 400mg/dia',
        ],
      },
      {
        category: '💊 Ortomolecular',
        items: [
          'DHA 2-3g/dia (70% do cérebro é gordura)',
          'Fosfatidilserina 300mg/dia',
          'Acetil-L-Carnitina 2g/dia',
          'CoQ10 400mg/dia (energia neuronal)',
          'PQQ 40mg/dia (neuroplasticidade)',
          'Vitamina B12 metilcobalamina 2000mcg/dia',
          'Metilfolato 5mg/dia',
          'TMG (Trimetilglicina) 2g/dia',
          'Vitamina D3 10.000 UI/dia (neurotrófico)',
          'Magnésio treonato 2g/dia (BDNF)',
          'NAD+ ou Nicotinamida Ribosídeo 500mg/dia',
        ],
      },
      {
        category: '🍽️ Alimentação',
        items: [
          'Dieta MIND (mediterrânea + DASH para o cérebro)',
          'Dieta cetogênica (cérebro usa corpos cetônicos — bypass resistência insulínica)',
          'Eliminar glúten e laticínios (neuroinflamação)',
          'Polpa de coco / óleo de coco MCT 2-3 colheres/dia',
          'Jejum intermitente (autofagia + neuroproteção)',
          'Resveratrol (vinho tinto, uvas escuras)',
          'Gorduras ômega-3: salmão, sardinha, nozes',
        ],
      },
      {
        category: '🧘 Neuroplasticidade',
        items: [
          'Meditação diária 20min (reduz cortisol + protege hipocampo)',
          'Exercício aeróbico (BDNF — fertilizante cerebral)',
          'Aprendizado contínuo (novo idioma, instrumento)',
          'Sono reparador 7-8h (clearance de amiloide ocorre no sono)',
          'Redução do estresse crónico',
        ],
      },
    ],
    examsToInvestigate: [
      'Beta-amiloide 1-42 e 1-40',
      'Proteína TAU total e fosfoTAU',
      'NfL (neurofilamento cadeia leve)',
      'ApoE4 genotipagem',
      'Homocisteína',
      'Insulina de jejum + HOMA-IR',
      'Vitamina B12 + ácido metilmalônico',
      'BDNF (fator neurotrófico)',
      'PCR-us',
      'Heavy metals (chumbo, mercúrio)',
    ],
    references: 'Luciana Caxito; Dr. Dale Bredesen - The End of Alzheimer\'s; ReCODE Protocol',
  },

  // ══════════════════════════════════════════════════════════════════════
  // DEFICIÊNCIAS NUTRICIONAIS
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'deficiencia_vitamina_d',
    condition: 'Deficiência / Insuficiência de Vitamina D',
    cid: 'E55',
    category: 'Deficiências Nutricionais',
    icon: '☀️',
    color: '#f9a825',
    severity: 'warning',
    criteria: (a, r) =>
      q(a, 'vitaminaD', 'Q1', 'Q2') || v(r, 'vitaminaD') < 30,
    certainty: (a, r) =>
      v(r, 'vitaminaD') < 10 ? 'confirmado' : v(r, 'vitaminaD') < 30 ? 'confirmado' : 'provável',
    description:
      'A vitamina D é na verdade um hormônio esteróide que regula > 200 genes. Sua deficiência é epidêmica e se associa a hipotireoidismo, autoimunidade, depressão, câncer, diabetes e infecções.',
    patientExplanation:
      'A vitamina D está baixa. Ela não é apenas para ossos: ela controla seu sistema imune, humor, hormônios e proteção contra doenças graves.',
    protocols: [
      {
        category: '💊 Reposição',
        items: [
          v(0, 'vitaminaD') < 10
            ? 'DEFICIÊNCIA GRAVE: Vitamina D3 50.000 UI semanais por 8 semanas (médico)'
            : 'Vitamina D3 10.000 UI/dia por 3 meses, depois 5.000 UI manutenção',
          'COFATORES ESSENCIAIS: Vitamina K2 MK7 200mcg/dia + Magnésio 400mg/dia',
          'Ômega-3 (melhora receptor VDR)',
          'Zinco 30mg/dia (melhora expressão do receptor)',
          'Tomar com refeição que contenha gordura saudável',
        ],
      },
      {
        category: '🌞 Estilo de Vida',
        items: [
          'Exposição solar: 20-30min/dia (10h-14h), mínimo braços e pernas',
          'Sem protetor solar durante a exposição terapêutica',
          'Pele mais escura precisa de mais tempo de exposição',
        ],
      },
      {
        category: '🍽️ Alimentação',
        items: [
          'Salmão selvagem, sardinha, atum (200-400 UI/porção)',
          'Gema de ovo caipira',
          'Fígado bovino',
          'Cogumelos expostos ao sol',
        ],
      },
    ],
    examsToInvestigate: [
      'Vitamina D 25-OH seriada (meta: 60-80 ng/mL)',
      'PTH intacto (eleva quando VitD baixa)',
      'Cálcio ionizado',
      'Fósforo',
      'Magnésio eritrocitário',
    ],
    references: 'Luciana Caxito - Guia dos Exames; Dr. Michael Holick',
  },

  {
    id: 'deficiencia_b12',
    condition: 'Deficiência de Vitamina B12',
    cid: 'E53.8',
    category: 'Deficiências Nutricionais',
    icon: '🔴',
    color: '#c62828',
    severity: 'warning',
    criteria: (a, r) =>
      q(a, 'vitaminaB12', 'Q1', 'Q2') || v(r, 'vitaminaB12') < 300,
    certainty: (a, r) =>
      v(r, 'vitaminaB12') < 200 ? 'confirmado' : 'provável',
    description:
      'B12 é essencial para mielinização neuronal, síntese de DNA e metabolismo de homocisteína. ' +
      'Deficiência causa neuropatia, anemia megaloblástica, demência e depressão. ' +
      'Comum em: vegetarianos, usuários de metformina, IBP, gastrite atrófica, idosos.',
    patientExplanation:
      'A vitamina B12 está baixa. Isso afeta seus nervos, produção de sangue e memória. Sem tratamento pode causar danos neurológicos permanentes.',
    protocols: [
      {
        category: '💊 Reposição',
        items: [
          'Metilcobalamina sublingual 5000mcg/dia (melhor absorção)',
          'B12 IM (intramuscular) 1000mcg 3×/semana por 4 semanas (se grave)',
          'Metilfolato 5mg/dia (cofundador anemia)',
          'B6 (P5P) 50mg/dia',
          'Complexo B metilado',
        ],
      },
      {
        category: '🍽️ Alimentação',
        items: [
          'Fígado bovino 3×/semana (maior fonte)',
          'Mariscos, ostras, salmão, sardinha',
          'Ovos (se vegetariano)',
          'Laticínios fermentados',
        ],
      },
      {
        category: '🔬 Investigação',
        items: [
          'Verificar uso de metformina (esgota B12)',
          'Verificar IBP/omeprazol (reduz absorção)',
          'Gastrite atrófica (anti-células parietais)',
          'Anemia perniciosa (anti-fator intrínseco)',
          'MTHFR (metabolismo do folato)',
        ],
      },
    ],
    examsToInvestigate: [
      'Ácido metilmalônico (marcador mais sensível)',
      'Homocisteína',
      'Anti-fator intrínseco',
      'Hemograma completo (macrocitose)',
      'VCM > 100 fL',
    ],
    references: 'Luciana Caxito; Stabler 2013 NEJM',
  },

  // ══════════════════════════════════════════════════════════════════════
  // INTESTINO / MICROBIOTA
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'disbiose_intestinal',
    condition: 'Disbiose Intestinal / Permeabilidade Aumentada',
    cid: 'K63.8',
    category: 'Microbiota',
    icon: '🦠',
    color: '#2e7d32',
    severity: 'warning',
    criteria: (a, r) =>
      q(a, 'indiceSimpson', 'Q1') ||
      q(a, 'razaoFirmicutesBacteroidetes', 'Q5') ||
      q(a, 'calprotectina', 'Q4', 'Q5') ||
      q(a, 'zonulina', 'Q5'),
    certainty: (a) =>
      q(a, 'calprotectina', 'Q5') && q(a, 'lactoferrina', 'Q5') ? 'provável' : 'predisposição',
    description:
      'Desequilíbrio da microbiota intestinal com redução de bactérias benéficas. ' +
      'O intestino doente gera endotoxemia metabólica, permeabilidade aumentada (leaky gut), inflamação sistêmica e ativação de autoimunidade.',
    patientExplanation:
      'Seu intestino tem desequilíbrio de bactérias. Isso parece simples, mas afeta tudo: imunidade, humor, digestão, peso e até o cérebro.',
    protocols: [
      {
        category: '🌿 Restauração da Microbiota',
        items: [
          'Probióticos multiespécies 100 bilhões UFC (Lactobacillus + Bifidobacterium + Saccharomyces)',
          'Probióticos psicotrópicos: L. rhamnosus + B. longum (eixo intestino-cérebro)',
          'Akkermansia muciniphila (prebiótico para ela: polifenóis + inulina)',
          'Tributirina (precursor de butirato) 600mg 3×/dia',
        ],
      },
      {
        category: '💊 Reparo Intestinal (4R)',
        items: [
          'REMOVER: eliminar disruptores (glúten, laticínios, açúcar, FODMAP)',
          'RESTAURAR: enzimas digestivas + betaína HCl (hipocloridria)',
          'REINOCULAR: probióticos 100bi UFC + fermentados',
          'REPARAR: L-Glutamina 10g 2×/dia + Zinco carnosina 75mg + Colágeno 20g',
          'Quercetina 1g 2×/dia (veda junções intestinais)',
          'Vitamina D3 10.000 UI (reparo mucosa)',
          'Aloe vera 200mL/dia (cicatrizante mucosa)',
        ],
      },
      {
        category: '🍽️ Alimentação',
        items: [
          'Fibras fermentáveis: 40-50g/dia',
          'Alimentos fermentados: kefir, kombucha, chucrute, kimchi',
          'Prebióticos: cebola, alho, banana verde, aspargos, alcachofra',
          'Caldo de ossos (colágeno, glutamina, glicina)',
          'Eliminar ultraprocessados, açúcar, corantes',
          'Dieta FODMAP (4-6 semanas) se SIBO confirmado',
        ],
      },
    ],
    examsToInvestigate: [
      'Calprotectina fecal',
      'Zonulina (permeabilidade intestinal)',
      'Microbioma fecal completo',
      'Teste de SIBO (hidrogênio)',
      'IgA secretória',
      'Parasitológico de fezes (3 amostras)',
      'Helicobacter pylori (antígeno fecal)',
    ],
    references: 'Luciana Caxito; Dr. Alessio Fasano (Zonulina); Funcional Gut Protocol',
  },

  // ══════════════════════════════════════════════════════════════════════
  // METAIS PESADOS
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'intoxicacao_metais',
    condition: 'Intoxicação por Metais Pesados',
    cid: 'T56',
    category: 'Toxicologia',
    icon: '☠️',
    color: '#880e4f',
    severity: 'critical',
    criteria: (a, r) =>
      q(a, 'chumboUrinario', 'Q4', 'Q5') ||
      q(a, 'mercurioUrinario', 'Q4', 'Q5') ||
      q(a, 'cadmioUrinario', 'Q4', 'Q5') ||
      q(a, 'arsenioUrinario', 'Q4', 'Q5'),
    certainty: (a) =>
      q(a, 'chumboUrinario', 'Q5') || q(a, 'mercurioUrinario', 'Q5') ? 'confirmado' : 'provável',
    description:
      'Níveis tóxicos de metais pesados detectados. Causam disfunção neurológica, renal, hepática e imunológica. ' +
      'Interferem em centenas de enzimas e bloqueiam cofatores minerais essenciais.',
    patientExplanation:
      'Metais tóxicos foram encontrados em excesso no seu organismo. Eles se acumulam silenciosamente, intoxicando o sistema nervoso, rins e fígado ao longo dos anos.',
    protocols: [
      {
        category: '🌿 Quelação Natural',
        items: [
          'Chlorella (parede celular quebrada) 10g/dia (liga-se a metais)',
          'Coentro fresco + suplemento 1000mg 3×/dia (quelante natural)',
          'Alga Spirulina 5g/dia',
          'Pectina de maçã 15g/dia',
          'Enxofre orgânico (MSM) 2g 2×/dia',
        ],
      },
      {
        category: '💊 Quelação Medicamentosa (com supervisão)',
        items: [
          'DMSA oral 500mg 3×/dia por 3 dias on/11 off (chumbo/mercúrio)',
          'DMPS injetável (mercúrio — protocolo médico)',
          'EDTA intravenoso (chumbo, cádmio)',
          'GLUTATIONA IV 2g 3×/semana + ALA 600mg',
          'NAC 1200mg 2×/dia (precursor glutationa)',
          'Vitamina C 3g 2×/dia',
        ],
      },
      {
        category: '🔬 Suporte ao Detox',
        items: [
          'Sauna infravermelho 30-45min/dia (excreção transdérmica)',
          'Exercício (suor mobiliza metais)',
          'Intestino funcionando (constipação retém metais)',
          'Filtro de água (remover chumbo e arsênio)',
          'Remover amálgamas dentárias com protocolo SMART (se mercúrio)',
          'Identificar e remover fonte de exposição',
        ],
      },
    ],
    examsToInvestigate: [
      'Painel completo de metais urinários 24h pós-quelação',
      'Painel de metais no cabelo',
      'Creatinina e TFG (toxicidade renal)',
      'Transaminases (toxicidade hepática)',
      'Hemograma (toxicidade hematológica)',
      'Glutationa eritrocitária',
    ],
    references: 'Luciana Caxito - Manual; Dr. Andrew Cutler; ACAM Mercury Protocol',
  },

  // ══════════════════════════════════════════════════════════════════════
  // PREDISPOSIÇÕES (sem critérios críticos mas com padrão sugestivo)
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'risco_autoimmune',
    condition: 'Predisposição a Doenças Autoimunes',
    cid: 'M35.9',
    category: 'Autoimunidade',
    icon: '🛡️',
    color: '#6a1b9a',
    severity: 'warning',
    criteria: (a, r) =>
      q(a, 'fan', 'Q5') ||
      q(a, 'antiDNA', 'Q5') ||
      q(a, 'asca', 'Q5') ||
      (q(a, 'proteinaCReativaUltrassensivel', 'Q5') && q(a, 'vhs', 'Q5') && q(a, 'ferritina', 'Q5')),
    certainty: (a) =>
      q(a, 'fan', 'Q5') ? 'provável' : 'predisposição',
    description:
      'Marcadores sugestivos de ativação autoimune. O sistema imune pode estar atacando tecidos próprios. ' +
      'Relacionado à disbiose intestinal, leaky gut, exposição a tóxicos e estresse crônico.',
    patientExplanation:
      'Seus exames sugerem que o sistema imunológico pode estar confuso, atacando células do próprio corpo. Isso precisa de investigação para identificar qual órgão está sendo afetado.',
    protocols: [
      {
        category: '🌿 Imunomoduladores',
        items: [
          'Vitamina D3 10.000 UI/dia (imunomodulador nº 1)',
          'Curcumina 1500mg 3×/dia',
          'Boswellia 400mg 3×/dia',
          'Nigella sativa 2g/dia',
          'Transfer Factor (Fatores de Transferência) 4Life — imunoregulador',
          'Cogumelos medicinais: Reishi 3g + Shiitake 2g/dia',
        ],
      },
      {
        category: '💊 Ortomolecular',
        items: [
          'Ômega-3 EPA 3g/dia (anti-inflamatório imunológico)',
          'Selênio 200mcg/dia',
          'Zinco 30mg/dia',
          'L-Glutamina 10g 2×/dia (reparo intestinal)',
          'Probióticos multiespécies',
          'Vitamina C 2g/dia',
        ],
      },
      {
        category: '🍽️ Alimentação AIP',
        items: [
          'Protocolo AIP (Autoimmune Protocol) por 60-90 dias',
          'ELIMINAR: grãos, legumes, nightshades, laticínios, ovos, nozes',
          'Priorizar: carnes qualidade, vegetais folhosos, batata-doce, abacate',
          'Caldo de ossos diário (reparador de mucosa)',
          'Reintrodução lenta e controlada após 60 dias',
        ],
      },
    ],
    examsToInvestigate: [
      'FAN com padrão nuclear',
      'Anti-DNA dupla fita',
      'Complemento C3 e C4',
      'FR (fator reumatoide)',
      'Anti-CCP (artrite reumatoide)',
      'Anti-TPO, Anti-TG (tireoide)',
      'ANA específicos (SS-A, SS-B, Scl-70)',
      'Zonulina (permeabilidade intestinal)',
    ],
    references: 'Luciana Caxito; Dr. Terry Wahls; Sarah Ballantyne AIP Protocol',
  },

  {
    id: 'estresse_oxidativo',
    condition: 'Estresse Oxidativo Elevado',
    cid: 'R70',
    category: 'Metabolismo',
    icon: '⚡',
    color: '#e65100',
    severity: 'warning',
    criteria: (a, r) =>
      (q(a, 'glutationa', 'Q1') && q(a, 'proteinaCReativaUltrassensivel', 'Q4', 'Q5')) ||
      (q(a, 'coq10', 'Q1') && q(a, 'homocisteina', 'Q4', 'Q5')) ||
      (q(a, 'vitaminaC', 'Q1') && q(a, 'vitaminaE', 'Q1')),
    certainty: () => 'predisposição',
    description:
      'Desequilíbrio entre produção de radicais livres e capacidade antioxidante. ' +
      'Causa dano a lipídios, proteínas e DNA. Substrato de envelhecimento acelerado, câncer e doenças crônicas.',
    patientExplanation:
      'Há um desequilíbrio entre "ferrugem" (radicais livres) e os protetores do seu organismo (antioxidantes). Isso envelhece as células mais rápido.',
    protocols: [
      {
        category: '💊 Antioxidantes Essenciais',
        items: [
          'Glutationa lipossomal 500mg 2×/dia (mestre antioxidante)',
          'NAC 1200mg 2×/dia (precursor glutationa)',
          'Vitamina C lipossomal 2g 2×/dia',
          'Vitamina E mista (tocoferóis + tocotrienóis) 400 UI',
          'CoQ10 ubiquinol 300mg/dia',
          'ALA (Ácido alfa-lipóico) 600mg/dia (antioxidante universal)',
          'Astaxantina 12mg/dia',
          'Resveratrol 500mg/dia',
        ],
      },
      {
        category: '🌿 Fitoterápicos Antioxidantes',
        items: [
          'Curcumina 1000mg 3×/dia',
          'Extrato de semente de uva OPC 300mg/dia',
          'Pycnogenol 150mg/dia',
          'Chá verde EGCG 400mg 2×/dia',
        ],
      },
    ],
    examsToInvestigate: [
      'Glutationa eritrocitária',
      'MDA (malondialdeído — dano lipídico)',
      '8-OHdG (dano ao DNA)',
      'CoQ10 plasmático',
      'Vitamina C sérica',
      'Vitamina E sérica',
    ],
    references: 'Luciana Caxito; Dr. Jeffrey Bland - Genetics, Nutrition and Health',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FUNÇÃO PRINCIPAL: AVALIAR DIAGNÓSTICOS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Avalia todos os critérios diagnósticos com base nos exames inseridos.
 * @param {Object} analysis - Resultado de analyzeExamResult para cada exame
 * @param {Object} results  - Valores brutos dos exames
 * @returns {Array} Lista de diagnósticos ativados com certeza e protocolos
 */
export function evaluateDiseases(analysis, results) {
  if (!analysis || Object.keys(analysis).length === 0) return [];

  const activated = [];

  for (const disease of DISEASE_CRITERIA) {
    try {
      if (disease.criteria(analysis, results)) {
        const certainty = disease.certainty ? disease.certainty(analysis, results) : 'provável';
        activated.push({
          ...disease,
          certainty,
          protocols: disease.protocols || [],
          examsToInvestigate: disease.examsToInvestigate || [],
        });
      }
    } catch (_) {
      // Critério falhou silenciosamente (exame ausente)
    }
  }

  // Ordenar: confirmado > provável > predisposição; severity: critical > warning > normal
  const order = { confirmado: 0, provável: 1, predisposição: 2 };
  const severityOrder = { critical: 0, warning: 1, normal: 2 };

  activated.sort((a, b) => {
    const certDiff = (order[a.certainty] ?? 3) - (order[b.certainty] ?? 3);
    if (certDiff !== 0) return certDiff;
    return (severityOrder[a.severity] ?? 3) - (severityOrder[b.severity] ?? 3);
  });

  return activated;
}

/**
 * Gera um texto de resumo diagnóstico para impressão.
 */
export function generateDiagnosticSummary(diseases) {
  if (!diseases || diseases.length === 0) {
    return 'Nenhum padrão diagnóstico significativo identificado. Continue monitorando periodicamente.';
  }

  const confirmed = diseases.filter((d) => d.certainty === 'confirmado');
  const probable = diseases.filter((d) => d.certainty === 'provável');
  const predisposition = diseases.filter((d) => d.certainty === 'predisposição');

  const lines = [];

  if (confirmed.length > 0) {
    lines.push(`DIAGNÓSTICOS IDENTIFICADOS (${confirmed.length}): ${confirmed.map((d) => d.condition).join('; ')}.`);
  }
  if (probable.length > 0) {
    lines.push(`PROVÁVEIS CONDIÇÕES (${probable.length}): ${probable.map((d) => d.condition).join('; ')}.`);
  }
  if (predisposition.length > 0) {
    lines.push(`PREDISPOSIÇÕES DETECTADAS (${predisposition.length}): ${predisposition.map((d) => d.condition).join('; ')}.`);
  }

  return lines.join(' ');
}
