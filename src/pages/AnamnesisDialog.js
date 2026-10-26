import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container, Paper, Typography, Box, Button, Divider, Alert, Chip,
  TextField, Accordion, AccordionSummary, AccordionDetails, Stack,
  FormControlLabel, Checkbox, ToggleButtonGroup, ToggleButton, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PrescriptionHeader from '../components/PrescriptionHeader';
import PrescriptionFooter from '../components/PrescriptionFooter';
import { QUESTIONNAIRE_BLOCKS } from '../data/integrativeAnamnesisQuestions';
import { AUTOIMUNE_PROTOCOLS, getAutoimuneProtocol } from '../data/autoimuneProtocols';
import { buildLetterheadHtml, openPrintWindow } from '../components/PrintTemplate';
import { PLANILHAS_NUTRICIONAIS, CARDAPIOS, RECEITAS_FUNCIONAIS, NUTRIENTES_IDR, getNutritionalPlanForProfiles } from '../data/nutritionalDatabase';

// ─────────────────────────────────────────────────────────────
// SCORING ENGINE
// ─────────────────────────────────────────────────────────────
function computeScores(a) {
  const int = (v, def = 0) => Math.min(10, parseInt(v ?? def, 10) || def);

  // Energia / Sono (0–26)
  const energyInv   = 10 - int(a.b2q1, 10);
  const sleepInv    = 10 - int(a.b3q1, 10);
  const wakeTired   = a.b3q4 === 'Não' ? 2 : 0;
  const nightWaking = a.b3q3 === 'Sim'  ? 2 : 0;
  const peaksEnergy = a.b2q3 === 'Sim'  ? 2 : 0;
  const energySleep = energyInv + sleepInv + wakeTired + nightWaking + peaksEnergy;

  // Digestivo (0–15+)
  const digestSymptoms = (a.b5q1 || []).filter(s => s !== 'Nenhum').length;
  const foodWorsen  = a.b5q2 === 'Sim' ? 2 : 0;
  const postMeal    = a.b5q3 === 'Sim' ? 2 : 0;
  const bowel       = a.b5q4 !== 'Regular' && a.b5q4 ? 2 : 0;
  const intolerance = a.b17q1 === 'Sim' ? 2 : 0;
  const digestive   = digestSymptoms + foodWorsen + postMeal + bowel + intolerance;

  // Emocional (0–35+)
  const stress    = int(a.b6q1, 0);
  const anxMap    = { 'Não': 0, 'Leve': 1, 'Moderada': 2, 'Intensa': 3 };
  const anxScore  = anxMap[a.b15q3] !== undefined ? anxMap[a.b15q3] : (a.b6q2 === 'Sim' ? 2 : 0);
  const depItems  = (a.b15q5 || []).filter(s => s !== 'Nenhum').length;
  const motivInv  = 10 - int(a.b15q6, 10);
  const concInv   = 10 - int(a.b6q4, 10);
  const overMap   = { 'Nunca': 0, 'Raramente': 1, 'Às vezes': 2, 'Frequentemente': 3, 'Quase sempre': 4 };
  const overload  = overMap[a.b15q2] !== undefined ? overMap[a.b15q2] : 0;
  const emotional = stress + anxScore + depItems + motivInv + concInv + overload;

  // Risco Emocional (0–15)
  const disMap    = { 'Nunca': 0, 'Raramente': 1, 'Às vezes': 2, 'Frequentemente': 3 };
  const disappear = disMap[a.b15q16] !== undefined ? disMap[a.b15q16] : 0;
  const lwMap     = { 'Nunca': 0, 'Raramente': 1, 'Às vezes': 2, 'Frequentemente': 3, 'Prefiro não responder': 0 };
  const lifeWorth = lwMap[a.b15q17] !== undefined ? lwMap[a.b15q17] : 0;
  const noSupport = (a.b15q13 === 'Não' || a.b13q3 === 'Não') ? 2 : 0;
  const copingDys = (a.b15q15 || []).filter(s => ['Álcool', 'Isolamento', 'Medicamentos'].includes(s)).length;
  const risk      = disappear + lifeWorth + noSupport + copingDys;

  // Inflamação / Imunidade (0–15+)
  const frequentIll  = a.b9q1 === 'Sim' ? 2 : 0;
  const recurrentInf = a.b9q2 === 'Sim' ? 2 : 0;
  const autoimmune   = a.b9q3 === 'Sim' ? 3 : 0;
  const allergies    = a.b16q1 === 'Sim' ? 2 : 0;
  const cardioSympt  = (a.b8q1 || []).filter(s => s !== 'Nenhum').length;
  const intolerSymp  = (a.b17q2 || []).length;
  const inflammation = frequentIll + recurrentInf + autoimmune + allergies + cardioSympt + intolerSymp;

  // Estilo de Vida (0–12)
  const alcohol      = a.b12q1 === 'Frequente' ? 2 : 0;
  const smoking      = a.b12q2 === 'Sim' ? 3 : 0;
  const sedentary    = a.b7q1 === 'Não' ? 2 : 0;
  const survivalMode = a.b13q1 === 'Modo sobrevivência' ? 3 : 0;
  const noSelfCare   = a.b13q2 === 'Não' ? 2 : 0;
  const lifestyle    = alcohol + smoking + sedentary + survivalMode + noSelfCare;

  return { energySleep, digestive, emotional, risk, inflammation, lifestyle };
}

function interpretBlock(label, score, ranges) {
  for (const [max, level, text] of ranges) {
    if (score <= max) return { label, score, level, text };
  }
  return { label, score, level: 'error', text: 'Disfunção significativa' };
}

function interpretScores(s) {
  return [
    interpretBlock('Energia / Sono', s.energySleep, [[8,'success','Adequado'], [16,'warning','Alerta leve — possível disfunção energética'], [99,'error','Disfunção significativa — suspeita eixo HPA / burnout']]),
    interpretBlock('Sistema Digestório', s.digestive, [[5,'success','Funcional'], [10,'warning','Disbiose leve — monitorar'], [99,'error','Disfunção intestinal relevante — protocolo de restauração']]),
    interpretBlock('Emocional / Mental', s.emotional, [[10,'success','Estável'], [20,'warning','Sobrecarga moderada — intervenção recomendada'], [99,'error','Risco emocional elevado — ação prioritária']]),
    interpretBlock('Risco Emocional ⚠', s.risk, [[3,'success','Baixo risco'], [7,'warning','Atenção — investigar profundamente'], [99,'error','ALTO RISCO — avaliação clínica aprofundada e possível encaminhamento']]),
    interpretBlock('Inflamação / Imunidade', s.inflammation, [[5,'success','Baixa carga inflamatória'], [10,'warning','Moderada — suporte anti-inflamatório'], [99,'error','Alta — inflamação crônica sistêmica suspeita']]),
    interpretBlock('Estilo de Vida', s.lifestyle, [[4,'success','Hábitos satisfatórios'], [8,'warning','Ajustes necessários'], [99,'error','Alto impacto negativo sobre a saúde']]),
  ];
}

function detectProfiles(scores, a) {
  const p = [];
  if (scores.risk >= 8) p.push('RISCO_EMOCIONAL');
  if (scores.energySleep >= 17 && scores.emotional >= 11) p.push('BURNOUT');
  else if (scores.emotional >= 15 && (a.b15q3 === 'Moderada' || a.b15q3 === 'Intensa' || a.b6q2 === 'Sim')) p.push('ANSIOSO');
  if (scores.digestive >= 11) p.push('DISBIOSE');
  else if (scores.digestive >= 6 && scores.inflammation >= 6) p.push('INFLAMATORIO');
  if (p.length === 0 && (scores.energySleep >= 10 || scores.emotional >= 10 || scores.digestive >= 6)) p.push('ATENCAO_GERAL');
  return p;
}

// ─────────────────────────────────────────────────────────────
// THERAPEUTIC SUGGESTIONS DATABASE
// ─────────────────────────────────────────────────────────────
const SUGGESTIONS = {
  RISCO_EMOCIONAL: {
    label: '\u26a0\ufe0f Risco Emocional Elevado', color: '#b71c1c',
    alerta: 'Score de risco emocional elevado. Considere encaminhamento para avaliação psicológica ou psiquiátrica. A abordagem integrativa atua como suporte complementar.',
    fitoterapicos: [
      { nome: 'Erythrina mulungu', dose: '500 mg 2–3\u00d7/dia', indicacao: 'Ansiedade intensa, crises de pânico, insônia' },
      { nome: 'Passiflora incarnata', dose: '400 mg 3\u00d7/dia', indicacao: 'Agitação mental, ansiedade, insônia' },
      { nome: 'Melissa officinalis', dose: '300 mg 2\u00d7/dia', indicacao: 'Palpitações nervosas, lentidão mental' },
    ],
    plantas: ['Chá de valeriana + melissa (noite)', 'Maracujá (fruta e chá)', 'Banana (triptofano)', 'Espinafre e couve (magnésio)'],
    suplementos: [
      { nome: 'Magnésio treonato', dose: '144 mg Mg elementar/dia', indicacao: 'Neuroproteção, ansiedade, sono' },
      { nome: 'Ômega-3 DHA', dose: '2 g DHA/dia', indicacao: 'Neuroproteção, modulação do humor' },
      { nome: 'L-Triptofano', dose: '500 mg antes de dormir', indicacao: 'Precursor de serotonina' },
      { nome: 'Vitamina D3', dose: '5.000 UI/dia', indicacao: 'Proteção neurológica e modulação do humor' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Neuro-Emocional Noturna',
        posologia: '1 cápsula 30 min antes de dormir',
        componentes: [
          { nome: 'Magnésio treonato', dose: '2.000 mg (144 mg Mg)' },
          { nome: 'L-Triptofano', dose: '500 mg' },
          { nome: 'Vitamina B6 (P-5-P)', dose: '25 mg' },
          { nome: 'Melatonina', dose: '1 mg' },
          { nome: 'Passiflora incarnata extrato seco', dose: '300 mg' },
        ],
      },
    ],
    bioquanticos: ['Cherry Plum (Bach) — perda de controle', 'Sweet Chestnut (Bach) — angústia extrema', 'Star of Bethlehem (Bach) — trauma não processado', 'Rescue Remedy (Bach) — estabilização em crises agudas'],
    detox: ['Suporte ao eixo intestino-cérebro (microbiota → serotonina)', 'Redução de estimulantes (cafeína, açúcar refinado)', 'Técnicas de regulação nervosa: respiração 4-7-8, EFT', 'NAC 600 mg 2×/dia — suporte ao eixo glutamato/GABA'],
    conduta: 'Prioridade: segurança emocional do paciente. Abordagem integrativa como suporte. Investigar origem do risco.',
    exames: ['Vitamina D sérica', 'Ômega-3 index', 'Cortisol matinal', 'Ferritina sérica', 'TSH e T4L'],
  },
  BURNOUT: {
    label: '\ud83d\udd25 Perfil Burnout', color: '#e65100',
    alerta: null,
    fitoterapicos: [
      { nome: 'Ashwagandha KSM-66', dose: '300–600 mg/dia', indicacao: 'Adaptógeno — fadiga adrenal, estresse crônico, equilíbrio do cortisol' },
      { nome: 'Rhodiola rosea', dose: '200–400 mg (pela manhã)', indicacao: 'Fadiga mental e física, resistência ao estresse' },
      { nome: 'Panax ginseng', dose: '200–400 mg/dia', indicacao: 'Energia vital, adaptação ao estresse' },
      { nome: 'Schisandra chinensis', dose: '500 mg 2\u00d7/dia', indicacao: 'Adaptógeno, suporte hepático e energético' },
    ],
    plantas: ['Maca peruana (1 colher de chá em suco/dia)', 'Gengibre fresco (chá ou raiz)', 'Beterraba (nitrato → energia celular)', 'Frutas vermelhas (antioxidantes)', 'Oleaginosas: castanhas, amêndoas (B vitaminas, Mg)'],
    suplementos: [
      { nome: 'CoQ10 (Ubiquinol)', dose: '100–200 mg/dia', indicacao: 'Energia mitocondrial, fadiga celular' },
      { nome: 'Vitamina D3 + K2', dose: '5.000–10.000 UI/dia (conforme exame)', indicacao: 'Imunidade, humor, energia' },
      { nome: 'Complexo B metilado', dose: '1 cápsula/dia (manhã)', indicacao: 'Energia celular, sistema nervoso' },
      { nome: 'Ferro bisglicinato', dose: 'Conforme ferritina sérica', indicacao: 'Indicado se ferritina < 50 ng/mL' },
      { nome: 'NAD+ precursor (NMN ou NR)', dose: '250–500 mg/dia', indicacao: 'Restauração mitocondrial, energia celular' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Restauração HPA — Manhã',
        posologia: '1 cápsula pela manhã com o café',
        componentes: [
          { nome: 'Ashwagandha KSM-66', dose: '300 mg' },
          { nome: 'Rhodiola rosea extrato seco (3% rosavinas)', dose: '200 mg' },
          { nome: 'Vitamina D3', dose: '5.000 UI' },
          { nome: 'Vitamina K2 MK-7', dose: '100 mcg' },
          { nome: 'Complexo B metilado (B6-P5P + B12 metil + Folato 5-MTHF)', dose: 'Dose padrão' },
          { nome: 'CoQ10 (Ubiquinol)', dose: '100 mg' },
        ],
      },
      {
        nome: 'Fórmula Restauração Mitocondrial — Tarde',
        posologia: '1 cápsula à tarde (14–16h)',
        componentes: [
          { nome: 'NAD+ precursor (NMN)', dose: '250 mg' },
          { nome: 'NAC (N-Acetil-Cisteína)', dose: '600 mg' },
          { nome: 'Silimarina', dose: '140 mg' },
          { nome: 'Ômega-3 EPA+DHA', dose: '1.000 mg' },
        ],
      },
    ],
    bioquanticos: ['Olive (Bach) — exaustão total', 'Hornbeam (Bach) — cansaço ao acordar', 'Oak (Bach) — persistência excessiva sem recuperação', 'Elm (Bach) — sobrecarga e sensação de não dar conta'],
    detox: ['NAC (N-Acetil-Cisteína) 600 mg 2\u00d7/dia — antioxidante e suporte hepático', 'Silymarin 140 mg 3\u00d7/dia (proteção hepática)', 'Redução de carga tóxica: plásticos, pesticidas, álcool', 'Detox linfático (30 dias) — redução de acúmulo de metabólitos de estresse'],
    conduta: 'Restauração do eixo HPA. Priorizar ciclo circadiano, sono reparador e redução de carga alostática.',
    exames: ['Cortisol salivar 4 pontos', 'DHEA-S', 'Ferritina sérica', 'Vitamina D', 'Hemograma completo', 'TSH e T4L', 'B12 e folato'],
  },
  ANSIOSO: {
    label: '\ud83d\ude30 Perfil Ansioso', color: '#ad1457',
    alerta: null,
    fitoterapicos: [
      { nome: 'Passiflora incarnata', dose: '300–600 mg extrato seco 3\u00d7/dia', indicacao: 'Ansiedade, insônia, agitação mental' },
      { nome: 'Valeriana officinalis', dose: '300–600 mg antes de dormir', indicacao: 'Insônia por ansiedade, tensão nervosa' },
      { nome: 'Melissa officinalis', dose: '160–300 mg 2–3\u00d7/dia', indicacao: 'Agitação, palpitações nervosas, digestivo' },
      { nome: 'Erythrina mulungu', dose: '300 mg 2–3\u00d7/dia', indicacao: 'Ansiedade intensa, espasmos nervosos' },
    ],
    plantas: ['Chá de camomila', 'Maracujá (fruta e chá da folha)', 'Espinafre e couve (magnésio)', 'Nozes e amêndoas (Mg + B6)', 'Banana (triptofano)', 'Brócolis (sulforafano + magnésio)'],
    suplementos: [
      { nome: 'Magnésio glicilato', dose: '300–400 mg/dia (à noite)', indicacao: 'Relaxamento do sistema nervoso, sono, ansiedade' },
      { nome: 'L-Teanina', dose: '200 mg 1–2\u00d7/dia', indicacao: 'Calma sem sedação, melhora o foco' },
      { nome: 'Vitamina B6 (P-5-P)', dose: '50–100 mg/dia', indicacao: 'Síntese de GABA, serotonina e dopamina' },
      { nome: '5-HTP', dose: '50–100 mg antes de dormir', indicacao: 'Precursor de serotonina, melhora do sono e humor' },
      { nome: 'GABA lipossomal', dose: '250–500 mg conforme necessário', indicacao: 'Redução da hiperexcitabilidade neural' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Ansiedade — Relaxante Diurno',
        posologia: '1 cápsula pela manhã e 1 à tarde',
        componentes: [
          { nome: 'L-Teanina', dose: '200 mg' },
          { nome: 'Passiflora incarnata extrato seco', dose: '300 mg' },
          { nome: 'Vitamina B6 (P-5-P)', dose: '50 mg' },
          { nome: 'Magnésio glicinato', dose: '200 mg' },
          { nome: 'Melissa officinalis extrato seco', dose: '160 mg' },
        ],
      },
      {
        nome: 'Fórmula Ansiedade — Sono Reparador',
        posologia: '1 cápsula 30 min antes de dormir',
        componentes: [
          { nome: 'GABA lipossomal', dose: '250 mg' },
          { nome: '5-HTP (Griffonia)', dose: '100 mg' },
          { nome: 'Valeriana officinalis extrato seco', dose: '300 mg' },
          { nome: 'Magnésio treonato', dose: '1.000 mg' },
          { nome: 'Melatonina', dose: '1 mg' },
        ],
      },
    ],
    bioquanticos: ['Passiflora 6CH (ansiedade difusa)', 'Rescue Remedy (Bach) — crises agudas', 'Agrimony (Bach) — emoções reprimidas', 'Mimulus (Bach) — medos conhecidos', 'Aspen (Bach) — medo difuso e indefinido'],
    detox: ['Redução de cafeína, álcool e estimulantes', 'Suporte adrenal: vitamina C (2 g/dia) + B5 (500 mg) + magnésio', 'Respiração diafragmática 10 min/dia (ativação parassimpática)', 'Detox do eixo intestino-cérebro: probióticos + L-glutamina + fibras solúveis'],
    conduta: 'Redução da ativação do sistema nervoso simpático. Suporte ao eixo HPA e à síntese de GABA/serotonina.',
    exames: ['Cortisol matinal', 'Vitaminas B6 e B12', 'Magnésio eritrocitário', 'Vitamina D', 'TSH e T4L'],
  },
  DISBIOSE: {
    label: '\ud83e\udda0 Perfil Disbiose Intestinal', color: '#2e7d32',
    alerta: null,
    fitoterapicos: [
      { nome: 'Aloe vera (gel puro)', dose: '30–50 mL 2\u00d7/dia em jejum', indicacao: 'Permeabilidade intestinal, inflamação da mucosa' },
      { nome: 'Berberina', dose: '500 mg 2–3\u00d7/dia (com refeição)', indicacao: 'Disbiose, candida, controle glicêmico' },
      { nome: 'Óleo de orégano (carvacrol \u2265 70%)', dose: '150 mg 2\u00d7/dia', indicacao: 'Antimicrobiano de amplo espectro' },
      { nome: 'Artemisia annua', dose: 'Conforme protocolo clínico', indicacao: 'Disbiose fúngica ou parasitária' },
    ],
    plantas: ['Alho cru (allicina — prebiótico e antimicrobiano)', 'Cebola e alho-poró (FOS, inulina)', 'Alcachofra (prebiótico, hepatoprotetor)', 'Aspargos (inulina)', 'Linhaça dourada moída (fibra solúvel)', 'Kefir e iogurte natural'],
    suplementos: [
      { nome: 'Probiótico multi-cepa', dose: '10–50 bilhões UFC/dia', indicacao: 'Restauração da microbiota (Lactobacillus + Bifidobacterium)' },
      { nome: 'L-Glutamina', dose: '5–10 g/dia em jejum', indicacao: 'Restauração da mucosa intestinal, tight junctions' },
      { nome: 'Zinco carnosina', dose: '37 mg 2\u00d7/dia', indicacao: 'Reparação epitelial intestinal' },
      { nome: 'Vitamina D3', dose: '5.000 UI/dia', indicacao: 'Imunidade intestinal, modulação da microbiota' },
      { nome: 'Saccharomyces boulardii', dose: '500 mg 2\u00d7/dia', indicacao: 'Candida, diarreia, pós-antibióticos' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Restauração Intestinal — Protocolo 5R',
        posologia: '1 medida (pó) em jejum pela manhã e à noite',
        componentes: [
          { nome: 'L-Glutamina', dose: '5.000 mg' },
          { nome: 'Zinco carnosina', dose: '75 mg' },
          { nome: 'Slippery Elm (Ulmus rubra)', dose: '400 mg' },
          { nome: 'Aloe vera extrato seco (200:1)', dose: '100 mg' },
          { nome: 'Vitamina D3', dose: '2.000 UI' },
        ],
      },
    ],
    bioquanticos: ['Nux vomica 30CH (intestino irritável, excessos)', 'Lycopodium 30CH (gases, distensão vespertina)', 'Carbo vegetabilis 30CH (fermentação intestinal)', 'Agrimony (Bach) — tensão emocional no digestivo'],
    detox: ['Protocolo 5R: Remove → Replace → Re-inocula → Repara → Reequilibra', 'Psyllium 10 g/dia (fibra solúvel)', 'Dieta de eliminação: retirada de glúten e lácteos por 21 dias', 'Jejum intermitente 14–16 h (autofagia intestinal)', 'Detox hepático leve: silimarina + alcachofra + dente-de-leão'],
    conduta: 'Restauração da barreira intestinal e do equilíbrio da microbiota. Abordar eixo intestino-cérebro.',
    exames: ['Calprotectina fecal', 'Zonulina sérica', 'Mapeamento da microbiota intestinal', 'Vitamina D', 'Zinco sérico'],
  },
  INFLAMATORIO: {
    label: '\ud83d\udd34 Perfil Inflamatório', color: '#b71c1c',
    alerta: null,
    fitoterapicos: [
      { nome: 'Cúrcuma (Curcuma longa + piperina)', dose: '500–1.000 mg curcumina 2\u00d7/dia', indicacao: 'Anti-inflamatório sistêmico, antioxidante' },
      { nome: 'Boswellia serrata', dose: '300–500 mg 2–3\u00d7/dia', indicacao: 'Inflamação articular e intestinal' },
      { nome: 'Uncaria tomentosa (Unha-de-gato)', dose: '300 mg 2\u00d7/dia', indicacao: 'Imunomodulação, inflamação crônica' },
      { nome: 'Zingiber officinale (Gengibre)', dose: '250–500 mg extrato seco 3\u00d7/dia', indicacao: 'Anti-inflamatório, digestivo, antioxidante' },
    ],
    plantas: ['Cúrcuma com pimenta preta (ouro líquido)', 'Gengibre fresco', 'Alho cru (allicina)', 'Cebola roxa (quercetina)', 'Brócolis e couve (sulforafano)', 'Mirtilo e açaí (antocianinas)', 'Romã (ellagitanins)'],
    suplementos: [
      { nome: 'Ômega-3 (EPA + DHA)', dose: '2–4 g EPA+DHA/dia', indicacao: 'Resolução da inflamação, cardiovascular, neurológico' },
      { nome: 'Vitamina D3 + K2', dose: '5.000–10.000 UI/dia', indicacao: 'Imunomodulação, anti-inflamatório' },
      { nome: 'Zinco picolinato', dose: '30 mg/dia', indicacao: 'Imunidade, cicatrização, anti-inflamatório' },
      { nome: 'Quercetina', dose: '500–1.000 mg/dia', indicacao: 'Anti-inflamatório, antialérgico, antiviral' },
      { nome: 'Vitamina C lipossomal', dose: '1–2 g/dia', indicacao: 'Antioxidante, colágeno, imunidade' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Anti-Inflamatória Sistêmica',
        posologia: '1 cápsula ao almoço e 1 ao jantar',
        componentes: [
          { nome: 'Curcumina fitossoma (Meriva)', dose: '500 mg' },
          { nome: 'Boswellia serrata extrato seco (65%)', dose: '200 mg' },
          { nome: 'Quercetina', dose: '250 mg' },
          { nome: 'Ômega-3 EPA+DHA', dose: '1.000 mg' },
          { nome: 'Vitamina D3', dose: '5.000 UI' },
          { nome: 'Zinco quelado (Albion)', dose: '15 mg' },
        ],
      },
      {
        nome: 'Fórmula Detox Antioxidante',
        posologia: '1 cápsula pela manhã',
        componentes: [
          { nome: 'Glutationa reduzida', dose: '250 mg' },
          { nome: 'NAC (N-Acetil-Cisteína)', dose: '600 mg' },
          { nome: 'Vitamina C lipossomal', dose: '500 mg' },
          { nome: 'Silimarina', dose: '140 mg' },
          { nome: 'Ácido Alfa-Lipóico (ALA)', dose: '100 mg' },
        ],
      },
    ],
    bioquanticos: ['Árnica 30CH (inflamação geral)', 'Centáurea (tonificante e antifebril)', 'Calendula 6CH (regeneração tecidual)', 'Willow (Bach) — rigidez e dor crônica', 'Crab Apple (Bach) — depuração'],
    detox: ['Glutationa reduzida 500 mg/dia', 'Silymarin 140 mg 3\u00d7/dia (proteção hepática)', 'Clorela 3 g/dia (quelatação de metais pesados)', 'Jejum intermitente 16:8', 'Detox hepático fase I e II — NAC + ALA + silimarina'],
    conduta: 'Redução da carga inflamatória sistêmica. Eliminar açúcar refinado, óleos vegetais processados e estresse crônico.',
    exames: ['PCR ultrassensível', 'Homocisteína', 'Ferritina sérica', 'Vitamina D', 'Perfil lipídico', 'Glicemia + insulina em jejum', 'Ômega-3 index'],
  },
  ATENCAO_GERAL: {
    label: '\ud83d\udfe1 Atenção Geral — Ajuste Preventivo', color: '#f57f17',
    alerta: null,
    fitoterapicos: [
      { nome: 'Astragalus membranaceus', dose: '400 mg/dia', indicacao: 'Imunoestimulante, adaptógeno, antienvelhecimento' },
      { nome: 'Ginkgo biloba', dose: '120 mg/dia', indicacao: 'Circulação cerebral, cognição, memória' },
      { nome: 'Panax ginseng', dose: '200 mg/dia', indicacao: 'Vitalidade, energia, adaptação' },
    ],
    plantas: ['Chá verde (catequinas — antioxidante)', 'Romero (circulação, memória)', 'Cúrcuma diária', 'Alho e cebola', 'Frutas cítricas (vitamina C)'],
    suplementos: [
      { nome: 'Vitamina D3', dose: '3.000–5.000 UI/dia', indicacao: 'Imunidade, humor, saúde óssea' },
      { nome: 'Ômega-3', dose: '1–2 g EPA+DHA/dia', indicacao: 'Prevenção cardiovascular e inflamatória' },
      { nome: 'Magnésio glicilato', dose: '200–300 mg/dia', indicacao: 'Qualidade do sono, sistema nervoso' },
      { nome: 'Complexo B metilado', dose: '1 cápsula/dia', indicacao: 'Energia celular, neurológico' },
    ],
    manipulados: [
      {
        nome: 'Fórmula Preventiva Geral',
        posologia: '1 cápsula pela manhã com o café',
        componentes: [
          { nome: 'Vitamina D3', dose: '3.000 UI' },
          { nome: 'Vitamina K2 MK-7', dose: '100 mcg' },
          { nome: 'Ômega-3 EPA+DHA', dose: '1.000 mg' },
          { nome: 'Magnésio glicinato', dose: '200 mg' },
          { nome: 'Complexo B metilado (B6-P5P + B12 metil + Folato 5-MTHF)', dose: 'Dose padrão' },
          { nome: 'Zinco quelado', dose: '15 mg' },
        ],
      },
    ],
    bioquanticos: ['Clematis (Bach) — vitalidade e presença', 'Larch (Bach) — confiança e motivação', 'Wild Rose (Bach) — entusiasmo e engajamento com a saúde'],
    detox: ['Hidratação adequada (2–2,5 L de água filtrada/dia)', 'Redução de alimentos ultraprocessados', 'Sono regular de 7–8 h com horário fixo', 'Detox de rotina: clorela 2 g/dia + vitamina C 1 g/dia — manutenção'],
    conduta: 'Prevenção e otimização do estado de saúde. Focar em higiene do sono, alimentação anti-inflamatória e gestão do estresse.',
    exames: ['Hemograma completo', 'Vitamina D', 'Vitamina B12', 'Glicemia em jejum', 'Perfil lipídico', 'TSH'],
  },
};

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────
export default function AnamnesisDialog() {
  const { id } = useParams();
  const [answers, setAnswers] = useState({});
  const [patientName, setPatientName] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [savedOk, setSavedOk] = useState(false);
  const [expanded, setExpanded] = useState('b1');

  useEffect(() => {
    if (!id) return;
    const saved = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const patient = saved.find(p => String(p.id) === String(id));
    if (patient) {
      setPatientName(patient.q01_nome || '');
      if (patient.anamnesisIntegrativa) setAnswers(patient.anamnesisIntegrativa);
    }
  }, [id]);

  const setAnswer = (qId, value) => setAnswers(prev => ({ ...prev, [qId]: value }));
  const setCheckbox = (qId, opt, checked) => setAnswers(prev => {
    const cur = prev[qId] || [];
    return { ...prev, [qId]: checked ? [...cur, opt] : cur.filter(v => v !== opt) };
  });

  const scores = useMemo(() => computeScores(answers), [answers]);
  const interpretations = useMemo(() => interpretScores(scores), [scores]);
  const profiles = useMemo(() => detectProfiles(scores, answers), [scores, answers]);

  const handleSave = () => {
    if (!id) return;
    try {
      const saved = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const idx = saved.findIndex(p => String(p.id) === String(id));
      if (idx !== -1) {
        saved[idx].anamnesisIntegrativa = answers;
        saved[idx].anamnesisIntegrativaUpdated = new Date().toISOString();
        localStorage.setItem('anamneses', JSON.stringify(saved));
        setSavedOk(true);
        setTimeout(() => setSavedOk(false), 3000);
      }
    } catch (e) { console.warn(e); }
  };

  const handlePrint = async () => {
    const laudoHtml = buildLaudoHtml(answers, scores, interpretations, profiles, patientName);
    const html = await buildLetterheadHtml({ title: 'Diálogo Anamnético Integrativo', bodyHtml: laudoHtml });
    openPrintWindow(html, true);
  };

  const handlePrintSugestao = async () => {
    const sugestaoHtml = buildSugestaoHtml(answers, profiles, patientName);
    const html = await buildLetterheadHtml({ title: 'Sugestão Terapêutica Integrativa', bodyHtml: sugestaoHtml });
    openPrintWindow(html, true);
  };

  const handlePrintNutricional = async () => {
    const { planilhas, cardapios, receitas } = getNutritionalPlanForProfiles(profiles.length > 0 ? profiles : ['ATENCAO_GERAL']);
    const bodyHtml = buildNutritionalSectionHtml(patientName, profiles, planilhas, cardapios, receitas);
    const html = await buildLetterheadHtml({ title: 'Plano Nutricional Integrativo', bodyHtml });
    openPrintWindow(html, true);
  };

  const renderQuestion = (q) => {
    if (q.showIf && answers[q.showIf.id] !== q.showIf.value) return null;

    if (q.type === 'text') {
      return (
        <TextField
          fullWidth multiline minRows={2} size="small" variant="outlined"
          value={answers[q.id] || ''} onChange={e => setAnswer(q.id, e.target.value)}
          placeholder="Descreva aqui..."
          sx={{ mt: 0.5 }}
        />
      );
    }
    if (q.type === 'scale') {
      return (
        <Box mt={0.5}>
          {q.hint && <Typography variant="caption" color="text.secondary">{q.hint}</Typography>}
          <Box mt={0.5}>
            <ToggleButtonGroup
              value={answers[q.id] !== undefined ? String(answers[q.id]) : ''}
              exclusive
              onChange={(_, v) => { if (v !== null) setAnswer(q.id, v); }}
              size="small"
              sx={{ flexWrap: 'wrap' }}
            >
              {Array.from({ length: 11 }, (_, i) => (
                <ToggleButton key={i} value={String(i)}
                  sx={{ minWidth: 34, px: 0.5, fontWeight: 600,
                    '&.Mui-selected': { bgcolor: '#1976d2', color: '#fff' } }}>
                  {i}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Box>
      );
    }
    if (q.type === 'radio') {
      return (
        <Box mt={0.5}>
          <ToggleButtonGroup
            value={answers[q.id] || ''}
            exclusive
            onChange={(_, v) => { if (v !== null) setAnswer(q.id, v); }}
            size="small"
            sx={{ flexWrap: 'wrap', gap: 0.5 }}
          >
            {q.options.map(opt => (
              <ToggleButton key={opt} value={opt}
                sx={{ fontSize: '0.72rem', py: 0.5, px: 1.2, whiteSpace: 'normal', textAlign: 'left',
                  '&.Mui-selected': { bgcolor: '#1976d2', color: '#fff' } }}>
                {opt}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      );
    }
    if (q.type === 'checkbox') {
      return (
        <Box display="flex" flexWrap="wrap" mt={0.5}>
          {q.options.map(opt => (
            <FormControlLabel key={opt}
              control={
                <Checkbox size="small"
                  checked={(answers[q.id] || []).includes(opt)}
                  onChange={e => setCheckbox(q.id, opt, e.target.checked)}
                  sx={{ py: 0.3 }}
                />
              }
              label={<Typography variant="body2">{opt}</Typography>}
              sx={{ mr: 2 }}
            />
          ))}
        </Box>
      );
    }
    return null;
  };

  const totalAnswered = Object.keys(answers).filter(k => {
    const v = answers[k];
    return v !== '' && v !== undefined && v !== null && (!Array.isArray(v) || v.length > 0);
  }).length;
  const totalQuestions = QUESTIONNAIRE_BLOCKS.reduce((sum, b) => sum + b.questions.filter(q => !q.showIf).length, 0);
  const progress = Math.round((totalAnswered / totalQuestions) * 100);

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <PrescriptionHeader patientId={id} />

      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Diálogo Anamnético Integrativo
        </Typography>
        {patientName && (
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Paciente: <strong>{patientName}</strong>
          </Typography>
        )}
        <Box display="flex" alignItems="center" gap={2} mt={1}>
          <Box flex={1}>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
          </Box>
          <Typography variant="caption" color="text.secondary">{progress}% preenchido</Typography>
        </Box>
      </Paper>

      {/* QUESTIONNAIRE BLOCKS */}
      {QUESTIONNAIRE_BLOCKS.map(block => (
        <Accordion
          key={block.id}
          expanded={expanded === block.id}
          onChange={(_, open) => setExpanded(open ? block.id : false)}
          sx={{ mb: 0.5 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: expanded === block.id ? '#fff' : undefined }} />}
            sx={{
              bgcolor: expanded === block.id ? block.color : '#fafafa',
              color: expanded === block.id ? '#fff' : 'inherit',
              borderRadius: '4px 4px 0 0',
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold">{block.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2.5}>
              {block.questions.map(q => {
                if (q.showIf && answers[q.showIf.id] !== q.showIf.value) return null;
                return (
                  <Box key={q.id}>
                    <Typography variant="body2" fontWeight={500} mb={0.5}>{q.text}</Typography>
                    {renderQuestion(q)}
                  </Box>
                );
              })}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* ACTION BUTTONS */}
      <Box display="flex" gap={1} mt={2.5} flexWrap="wrap">
        {id && (
          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} color="success">
            Salvar Respostas
          </Button>
        )}
        <Button
          variant="contained" color="secondary" startIcon={<AssessmentIcon />}
          onClick={() => setShowReport(r => !r)}
        >
          {showReport ? 'Ocultar' : 'Gerar'} Análise Clínica e Laudo
        </Button>
        {showReport && (
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint}>
            Imprimir Laudo Completo
          </Button>
        )}
        {showReport && profiles.length > 0 && (
          <Button variant="contained" color="success" startIcon={<PrintIcon />} onClick={handlePrintSugestao}>
            Imprimir Sugestão Terapêutica
          </Button>
        )}
        {showReport && (
          <Button variant="outlined" color="success" startIcon={<PrintIcon />} onClick={handlePrintNutricional}>
            Imprimir Plano Nutricional
          </Button>
        )}
      </Box>

      {savedOk && <Alert severity="success" sx={{ mt: 1 }}>Respostas salvas com sucesso!</Alert>}

      {/* CLINICAL ANALYSIS — THERAPIST ONLY */}
      {showReport && (
        <Box mt={3}>
          <Paper sx={{ p: 3, border: '2px solid #1976d2' }}>
            <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
              Análise Clínica — Uso Exclusivo do Terapeuta
            </Typography>

            {/* SCORE TABLE */}
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                    <TableCell><strong>Bloco Clínico</strong></TableCell>
                    <TableCell align="center"><strong>Score</strong></TableCell>
                    <TableCell><strong>Interpretação</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {interpretations.map(row => (
                    <TableRow key={row.label}>
                      <TableCell>{row.label}</TableCell>
                      <TableCell align="center">
                        <Chip label={row.score} size="small"
                          color={row.level === 'success' ? 'success' : row.level === 'warning' ? 'warning' : 'error'} />
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption"
                          color={row.level === 'success' ? 'success.main' : row.level === 'warning' ? 'warning.main' : 'error.main'}>
                          {row.text}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* PROFILES */}
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Perfis Identificados</Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
              {profiles.length === 0
                ? <Chip label="Sem perfil de risco detectado" color="success" />
                : profiles.map(p => (
                  <Chip key={p} label={SUGGESTIONS[p]?.label || p}
                    sx={{ bgcolor: SUGGESTIONS[p]?.color, color: '#fff', fontWeight: 700 }} />
                ))
              }
            </Box>

            {/* PROTOCOL PER PROFILE */}
            {profiles.map(profileId => {
              const s = SUGGESTIONS[profileId];
              if (!s) return null;
              return (
                <Box key={profileId} mb={3} sx={{ border: `2px solid ${s.color}`, borderRadius: 2, p: 2 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: s.color, mb: 1 }}>{s.label}</Typography>

                  {s.alerta && (
                    <Alert severity="error" icon={<WarningAmberIcon />} sx={{ mb: 2 }}>
                      <strong>Alerta Clínico:</strong> {s.alerta}
                    </Alert>
                  )}

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
                    Conduta: {s.conduta}
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  <Typography variant="subtitle2" fontWeight="bold" color="success.dark" gutterBottom>
                    Fitoterápicos Indicados
                  </Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ bgcolor: '#f1f8e9' }}>
                          <TableCell><strong>Planta Medicinal</strong></TableCell>
                          <TableCell><strong>Posologia</strong></TableCell>
                          <TableCell><strong>Indicação</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {s.fitoterapicos.map((f, i) => (
                          <TableRow key={i}>
                            <TableCell sx={{ fontStyle: 'italic' }}>{f.nome}</TableCell>
                            <TableCell>{f.dose}</TableCell>
                            <TableCell>{f.indicacao}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Typography variant="subtitle2" fontWeight="bold" color="success.main" gutterBottom>
                    Plantas e Alimentos Funcionais
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
                    {s.plantas.map((p, i) => <Chip key={i} label={p} size="small" variant="outlined" color="success" />)}
                  </Box>

                  <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                    Suplementação
                  </Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                          <TableCell><strong>Suplemento</strong></TableCell>
                          <TableCell><strong>Dose</strong></TableCell>
                          <TableCell><strong>Objetivo</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {s.suplementos.map((sup, i) => (
                          <TableRow key={i}>
                            <TableCell>{sup.nome}</TableCell>
                            <TableCell>{sup.dose}</TableCell>
                            <TableCell>{sup.indicacao}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {s.manipulados && s.manipulados.length > 0 && (
                    <>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#4a148c' }} gutterBottom>
                        Manipulados — Fórmulas para Farmácia de Manipulação
                      </Typography>
                      {s.manipulados.map((m, mi) => (
                        <Box key={mi} mb={1.5} sx={{ border: '1px solid #ce93d8', borderRadius: 1, p: 1.5, bgcolor: '#fdf6ff' }}>
                          <Typography variant="body2" fontWeight="bold" sx={{ color: '#4a148c' }}>{m.nome}</Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Posologia: {m.posologia}
                          </Typography>
                          <TableContainer component={Paper} variant="outlined">
                            <Table size="small">
                              <TableHead>
                                <TableRow sx={{ bgcolor: '#f3e5f5' }}>
                                  <TableCell><strong>Componente</strong></TableCell>
                                  <TableCell><strong>Dose</strong></TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {m.componentes.map((c, ci) => (
                                  <TableRow key={ci}>
                                    <TableCell sx={{ fontStyle: 'italic' }}>{c.nome}</TableCell>
                                    <TableCell>{c.dose}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      ))}
                    </>
                  )}

                  <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#7b1fa2' }} gutterBottom>
                    Bioquânticos / Florais Quânticos
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
                    {s.bioquanticos.map((b, i) => <Chip key={i} label={b} size="small" sx={{ bgcolor: '#f3e5f5', color: '#6a1b9a' }} />)}
                  </Box>

                  <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#e65100' }} gutterBottom>
                    Detoxificação e Protocolos de Suporte
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2, mb: 2 }}>
                    {s.detox.map((d, i) => <Typography component="li" key={i} variant="body2">{d}</Typography>)}
                  </Box>

                  <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#37474f' }} gutterBottom>
                    Exames Sugeridos
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={0.5}>
                    {s.exames.map((e, i) => <Chip key={i} label={e} size="small" variant="outlined" sx={{ color: '#37474f' }} />)}
                  </Box>
                </Box>
              );
            })}

            {answers.b9q3 === 'Sim' && (
              <Box mt={3}>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#ad1457' }} gutterBottom>
                  🛡️ Protocolos Autoimunes
                </Typography>
                {(answers.b9q3a || []).length === 0 && !answers.b9q3b && (
                  <Alert severity="info">Paciente declarou doença autoimune mas não especificou qual. Solicitar durante a consulta.</Alert>
                )}
                {(answers.b9q3a || []).map((doenca, di) => {
                  const proto = getAutoimuneProtocol(doenca);
                  return (
                    <Box key={di} mb={3} sx={{ border: '2px solid #ad1457', borderRadius: 2, p: 2 }}>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: '#ad1457', mb: 1 }}>{proto.label}</Typography>

                      <Typography variant="subtitle2" fontWeight="bold" color="success.dark" gutterBottom>Fitoterápicos</Typography>
                      <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ bgcolor: '#f1f8e9' }}>
                              <TableCell><strong>Planta Medicinal</strong></TableCell>
                              <TableCell><strong>Posologia</strong></TableCell>
                              <TableCell><strong>Indicação</strong></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {proto.fitoterapicos.map((f, i) => (
                              <TableRow key={i}>
                                <TableCell sx={{ fontStyle: 'italic' }}>{f.nome}</TableCell>
                                <TableCell>{f.dose}</TableCell>
                                <TableCell>{f.indicacao}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#4a148c' }} gutterBottom>
                        Manipulados — Fórmulas para Farmácia de Manipulação
                      </Typography>
                      {proto.manipulados.map((m, mi) => (
                        <Box key={mi} mb={1.5} sx={{ border: '1px solid #ce93d8', borderRadius: 1, p: 1.5, bgcolor: '#fdf6ff' }}>
                          <Typography variant="body2" fontWeight="bold" sx={{ color: '#4a148c' }}>{m.nome}</Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Posologia: {m.posologia}
                          </Typography>
                          <TableContainer component={Paper} variant="outlined">
                            <Table size="small">
                              <TableHead>
                                <TableRow sx={{ bgcolor: '#f3e5f5' }}>
                                  <TableCell><strong>Componente</strong></TableCell>
                                  <TableCell><strong>Dose</strong></TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {m.componentes.map((c, ci) => (
                                  <TableRow key={ci}>
                                    <TableCell sx={{ fontStyle: 'italic' }}>{c.nome}</TableCell>
                                    <TableCell>{c.dose}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      ))}

                      <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#7b1fa2' }} gutterBottom>
                        Florais Quânticos
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
                        {proto.florais.map((f, i) => (
                          <Chip key={i} label={`${f.essencia} — ${f.objetivo}`} size="small"
                            sx={{ bgcolor: '#f3e5f5', color: '#6a1b9a' }} />
                        ))}
                      </Box>

                      <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#e65100' }} gutterBottom>
                        Detoxificação e Suporte Autoimune
                      </Typography>
                      <Box component="ul" sx={{ m: 0, pl: 2, mb: 1 }}>
                        {proto.detox.map((d, i) => (
                          <Typography component="li" key={i} variant="body2">{d}</Typography>
                        ))}
                      </Box>
                    </Box>
                  );
                })}
                {answers.b9q3b && (
                  <Box mt={1} p={1.5} sx={{ bgcolor: '#fce4ec', borderRadius: 1, border: '1px solid #f48fb1' }}>
                    <Typography variant="body2"><strong>Outra doença autoimune declarada:</strong> {answers.b9q3b}</Typography>
                    <Typography variant="caption" color="text.secondary">Consultar protocolo específico conforme diagnóstico médico.</Typography>
                  </Box>
                )}
              </Box>
            )}
            {(answers.b14q3 || answers.b14q4) && (
              <Box mt={2} p={2} sx={{ bgcolor: '#fff8e1', borderRadius: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Objetivos do Paciente</Typography>
                {answers.b14q3 && <Typography variant="body2">• O que deseja melhorar: {answers.b14q3}</Typography>}
                {answers.b14q4 && <Typography variant="body2">• Objetivos com o tratamento: {answers.b14q4}</Typography>}
              </Box>
            )}

            {/* ─── SEÇÃO NUTRICIONAL ─── */}
            {(() => {
              const activeProfiles = profiles.length > 0 ? profiles : ['ATENCAO_GERAL'];
              const { planilhas } = getNutritionalPlanForProfiles(activeProfiles);
              const shownPlans = planilhas.length > 0 ? planilhas : [PLANILHAS_NUTRICIONAIS.ATENCAO_GERAL];
              return (
                <Box mt={3}>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: '#2e7d32', borderBottom: '2px solid #2e7d32', pb: 1, mb: 2 }}>
                    🌿 Plano Nutricional — Frutas, Legumes e Verduras Indicados
                  </Typography>
                  {shownPlans.map((pl, idx) => (
                    <Box key={idx} mb={2} sx={{ border: `2px solid ${pl.cor}`, borderRadius: 2, p: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ color: pl.cor, mb: 0.5 }}>{pl.label}</Typography>
                      <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#555', mb: 1.5 }}>{pl.objetivo}</Typography>
                      <TableContainer component={Paper} variant="outlined" sx={{ mb: 1.5 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ bgcolor: '#f1f8e9' }}>
                              <TableCell><strong>Nutriente / Alimento</strong></TableCell>
                              <TableCell><strong>Dose / Porção</strong></TableCell>
                              <TableCell><strong>Fontes em FLV</strong></TableCell>
                              <TableCell><strong>Função</strong></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pl.nutrientesChave.map((nk, ni) => (
                              <TableRow key={ni} hover sx={{ '&:nth-of-type(even)': { bgcolor: '#fafff5' } }}>
                                <TableCell sx={{ fontWeight: 600 }}>{nk.nutriente}</TableCell>
                                <TableCell sx={{ color: '#4a148c', fontSize: '0.85em' }}>{nk.dose}</TableCell>
                                <TableCell sx={{ color: '#2e7d32', fontSize: '0.82em' }}>{nk.alimentos}</TableCell>
                                <TableCell sx={{ fontSize: '0.82em' }}>{nk.funcao}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Box display="flex" gap={2} flexWrap="wrap">
                        <Box flex={1} minWidth={220} p={1.5} sx={{ bgcolor: '#fff8e1', borderRadius: 1, borderLeft: '3px solid #e65100' }}>
                          <Typography variant="caption" fontWeight="bold" color="#e65100">🚫 Evitar:</Typography>
                          {pl.alimentosProibidos.slice(0, 4).map((a, ai) => (
                            <Typography key={ai} variant="caption" display="block" sx={{ fontSize: '0.8em' }}>• {a}</Typography>
                          ))}
                        </Box>
                        <Box flex={1} minWidth={220} p={1.5} sx={{ bgcolor: '#e8f5e9', borderRadius: 1, borderLeft: '3px solid #2e7d32' }}>
                          <Typography variant="caption" fontWeight="bold" color="#2e7d32">✅ Priorizar:</Typography>
                          {pl.alimentosTerapeuticos.slice(0, 6).map((a, ai) => (
                            <Typography key={ai} variant="caption" display="block" sx={{ fontSize: '0.8em' }}>• {a}</Typography>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              );
            })()}
          </Paper>
        </Box>
      )}

      <Box mt={2}><PrescriptionFooter /></Box>
    </Container>
  );
}

// ─────────────────────────────────────────────────────────────
// PRINT LAUDO HTML BUILDER
// ─────────────────────────────────────────────────────────────
function buildLaudoHtml(answers, scores, interpretations, profiles, patientName) {
  const date = new Date().toLocaleDateString('pt-BR');
  const scoreRows = interpretations.map(r =>
    `<tr><td>${r.label}</td><td align="center"><b>${r.score}</b></td><td style="color:${r.level==='success'?'#2e7d32':r.level==='warning'?'#e65100':'#b71c1c'}">${r.text}</td></tr>`
  ).join('');
  const profileTags = profiles.map(p => SUGGESTIONS[p]?.label || p).join(' &nbsp;|&nbsp; ');

  const renderManipuladosHtml = (manipulados) => {
    if (!manipulados || !manipulados.length) return '';
    return manipulados.map(m => {
      const rows = m.componentes.map(c =>
        `<tr><td style="font-style:italic;padding:4px 6px;border:1px solid #ddd">${c.nome}</td><td style="padding:4px 6px;border:1px solid #ddd">${c.dose}</td></tr>`
      ).join('');
      return `
        <div style="border:1px solid #ce93d8;border-radius:4px;padding:10px 12px;margin-bottom:8px;background:#fdf6ff">
          <b style="color:#4a148c">${m.nome}</b><br/>
          <span style="font-size:0.85em;color:#666">Posologia: ${m.posologia}</span>
          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:0.85em;margin-top:6px">
            <tr style="background:#f3e5f5"><th style="padding:4px 6px;text-align:left;border:1px solid #ddd">Componente</th><th style="padding:4px 6px;text-align:left;border:1px solid #ddd">Dose</th></tr>
            ${rows}
          </table>
        </div>
      `;
    }).join('');
  };

  const renderAutoimuneHtml = () => {
    if (answers.b9q3 !== 'Sim') return '';
    const doencas = answers.b9q3a || [];
    if (!doencas.length && !answers.b9q3b) return '';
    const sections = doencas.map(doenca => {
      const proto = getAutoimuneProtocol(doenca);
      const fitoRows = proto.fitoterapicos.map(f =>
        `<tr><td style="font-style:italic;padding:4px 6px;border:1px solid #ddd">${f.nome}</td><td style="padding:4px 6px;border:1px solid #ddd">${f.dose}</td><td style="padding:4px 6px;border:1px solid #ddd">${f.indicacao}</td></tr>`
      ).join('');
      const floraisHtml = proto.florais.map(f => `${f.essencia} — ${f.objetivo} (${f.posologia})`).join('<br/>');
      const detoxHtml = proto.detox.map(d => `<li>${d}</li>`).join('');
      return `
        <div style="border:2px solid #ad1457;border-radius:6px;padding:14px 16px;margin-bottom:16px;page-break-inside:avoid">
          <h3 style="color:#ad1457;margin:0 0 10px;border-bottom:1px solid #ad1457;padding-bottom:6px">${proto.label}</h3>
          <h4 style="color:#2e7d32;margin:8px 0 4px">Fitoterápicos</h4>
          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:0.88em;margin-bottom:8px">
            <tr style="background:#f1f8e9"><th style="padding:4px 6px;text-align:left;border:1px solid #ddd">Planta</th><th style="padding:4px 6px;text-align:left;border:1px solid #ddd">Posologia</th><th style="padding:4px 6px;text-align:left;border:1px solid #ddd">Indicação</th></tr>
            ${fitoRows}
          </table>
          <h4 style="color:#4a148c;margin:8px 0 4px">Manipulados</h4>
          ${renderManipuladosHtml(proto.manipulados)}
          <h4 style="color:#7b1fa2;margin:8px 0 4px">Florais Quânticos</h4>
          <p style="font-size:0.88em;margin:0 0 8px">${floraisHtml}</p>
          <h4 style="color:#e65100;margin:8px 0 4px">Detoxificação / Suporte Autoimune</h4>
          <ul style="margin:0 0 8px;padding-left:18px;font-size:0.88em">${detoxHtml}</ul>
        </div>
      `;
    }).join('');
    const outraHtml = answers.b9q3b
      ? `<p style="background:#fce4ec;padding:8px;border-radius:4px;border-left:4px solid #e91e63"><b>Outra doença autoimune:</b> ${answers.b9q3b}</p>`
      : '';
    return `
      <h3 style="color:#ad1457;margin-top:20px;border-bottom:1px solid #ad1457;padding-bottom:4px">🛡️ Protocolos Autoimunes</h3>
      ${sections}${outraHtml}
    `;
  };

  const protocolSections = profiles.map(pid => {
    const s = SUGGESTIONS[pid];
    if (!s) return '';
    const fitos = s.fitoterapicos.map(f => `<li><i>${f.nome}</i> — ${f.dose} — ${f.indicacao}</li>`).join('');
    const sups = s.suplementos.map(sup => `<li>${sup.nome} — ${sup.dose} — ${sup.indicacao}</li>`).join('');
    const detoxList = s.detox.map(d => `<li>${d}</li>`).join('');
    const examList = s.exames.join(', ');
    const manipuladosHtml = renderManipuladosHtml(s.manipulados);
    return `
      <h3 style="color:${s.color};margin-top:20px;border-bottom:1px solid ${s.color};padding-bottom:4px">${s.label}</h3>
      ${s.alerta ? `<p style="background:#ffebee;padding:8px;border-radius:4px;border-left:4px solid #b71c1c"><b>Alerta Clínico:</b> ${s.alerta}</p>` : ''}
      <p style="font-style:italic;color:#555">Conduta: ${s.conduta}</p>
      <h4 style="color:#2e7d32">Fitoterápicos</h4><ul>${fitos}</ul>
      <h4 style="color:#558b2f">Plantas e Alimentos Funcionais</h4>
      <p>${s.plantas.join(' &nbsp;•&nbsp; ')}</p>
      <h4 style="color:#1565c0">Suplementação</h4><ul>${sups}</ul>
      ${manipuladosHtml ? `<h4 style="color:#4a148c">Manipulados — Farmácia de Manipulação</h4>${manipuladosHtml}` : ''}
      <h4 style="color:#7b1fa2">Bioquânticos / Florais Quânticos</h4>
      <p>${s.bioquanticos.join(' &nbsp;•&nbsp; ')}</p>
      <h4 style="color:#e65100">Detoxificação</h4><ul>${detoxList}</ul>
      <h4 style="color:#37474f">Exames Sugeridos</h4><p>${examList}</p>
    `;
  }).join('<hr style="border:1px solid #ddd;margin:16px 0"/>');

  const objectives = [
    answers.b14q3 ? `<li>O que deseja melhorar: ${answers.b14q3}</li>` : '',
    answers.b14q4 ? `<li>Objetivos com o tratamento: ${answers.b14q4}</li>` : '',
  ].filter(Boolean).join('');

  const autoimuneBlock = renderAutoimuneHtml();

  return `
    <h2 style="color:#1565c0;margin-bottom:4px">Laudo Integrativo — ${patientName || 'Paciente'}</h2>
    <p style="color:#666;margin-top:0"><b>Data:</b> ${date} &nbsp;|&nbsp; Uso exclusivo do terapeuta</p>
    <hr/>
    ${autoimuneBlock}
    <h3 style="color:#333">Análise Clínica por Blocos</h3>
    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:0.9em">
      <tr style="background:#f5f5f5"><th align="left">Bloco</th><th align="center">Score</th><th align="left">Interpretação</th></tr>
      ${scoreRows}
    </table>
    <h3 style="margin-top:20px">Perfis Clínicos Identificados</h3>
    <p style="font-weight:bold;font-size:1.05em">${profileTags || 'Nenhum perfil de risco detectado'}</p>
    <h3>Protocolo Terapêutico Integrativo Personalizado</h3>
    ${protocolSections || '<p>Nenhum protocolo específico identificado. Estratégia de manutenção preventiva recomendada.</p>'}
    ${objectives ? `<h3>Objetivos e Expectativas do Paciente</h3><ul>${objectives}</ul>` : ''}
    <p style="margin-top:30px;font-size:0.82em;color:#777;border-top:1px solid #ddd;padding-top:8px">
      Este laudo é de uso exclusivo do terapeuta responsável pelo atendimento. Não deve ser entregue ao paciente.<br/>
      Wander Pires Silva Coelho — Terapeuta Integrativo Funcional, Naturopatia e Iridologia — CRTH-BR 17821
    </p>
  `;
}

// ─────────────────────────────────────────────────────────────
// PRINT — SUGESTÃO TERAPÊUTICA (sem scores, para uso clínico)
// ─────────────────────────────────────────────────────────────
function buildSugestaoHtml(answers, profiles, patientName) {
  const date = new Date().toLocaleDateString('pt-BR');

  const renderManipuladosHtmlS = (manipulados) => {
    if (!manipulados || !manipulados.length) return '';
    return manipulados.map(m => {
      const rows = m.componentes.map(c =>
        `<tr><td style="font-style:italic;padding:4px 6px;border:1px solid #ddd">${c.nome}</td><td style="padding:4px 6px;border:1px solid #ddd">${c.dose}</td></tr>`
      ).join('');
      return `
        <div style="border:1px solid #ce93d8;border-radius:4px;padding:10px 12px;margin-bottom:8px;background:#fdf6ff">
          <b style="color:#4a148c">${m.nome}</b><br/>
          <span style="font-size:0.85em;color:#666">Posologia: ${m.posologia}</span>
          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:0.85em;margin-top:6px">
            <tr style="background:#f3e5f5"><th style="padding:4px 6px;text-align:left;border:1px solid #ddd">Componente</th><th style="padding:4px 6px;text-align:left;border:1px solid #ddd">Dose</th></tr>
            ${rows}
          </table>
        </div>
      `;
    }).join('');
  };

  const renderAutoimuneHtmlS = () => {
    if (answers.b9q3 !== 'Sim') return '';
    const doencas = answers.b9q3a || [];
    if (!doencas.length && !answers.b9q3b) return '';
    const sections = doencas.map(doenca => {
      const proto = getAutoimuneProtocol(doenca);
      const fitoRows = proto.fitoterapicos.map(f =>
        `<tr><td style="font-style:italic;padding:4px 6px;border:1px solid #ddd">${f.nome}</td><td style="padding:4px 6px;border:1px solid #ddd">${f.dose}</td><td style="padding:4px 6px;border:1px solid #ddd">${f.indicacao}</td></tr>`
      ).join('');
      const floraisHtml = proto.florais.map(f => `${f.essencia} — ${f.objetivo} (${f.posologia})`).join('<br/>');
      const detoxHtml = proto.detox.map(d => `<li>${d}</li>`).join('');
      return `
        <div style="border:2px solid #ad1457;border-radius:6px;padding:14px 18px;margin-bottom:16px;page-break-inside:avoid">
          <h3 style="color:#ad1457;margin:0 0 10px;border-bottom:1px solid #ad1457;padding-bottom:6px">${proto.label}</h3>
          <h4 style="color:#2e7d32;margin:8px 0 4px">Fitoterápicos</h4>
          <table border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:0.88em;margin-bottom:8px">
            <tr style="background:#f1f8e9"><th style="padding:4px 8px">Planta</th><th style="padding:4px 8px">Posologia</th><th style="padding:4px 8px">Indicação</th></tr>
            ${fitoRows}
          </table>
          <h4 style="color:#4a148c;margin:8px 0 4px">Manipulados — Farmácia de Manipulação</h4>
          ${renderManipuladosHtmlS(proto.manipulados)}
          <h4 style="color:#7b1fa2;margin:8px 0 4px">Florais Quânticos</h4>
          <p style="font-size:0.88em;margin:0 0 8px">${floraisHtml}</p>
          <h4 style="color:#e65100;margin:8px 0 4px">Detoxificação / Suporte Autoimune</h4>
          <ul style="margin:0 0 8px;padding-left:18px;font-size:0.88em">${detoxHtml}</ul>
        </div>
      `;
    }).join('');
    const outraHtml = answers.b9q3b
      ? `<p style="background:#fce4ec;padding:8px;border-radius:4px;border-left:4px solid #e91e63"><b>Outra doença autoimune:</b> ${answers.b9q3b}</p>`
      : '';
    return `
      <h3 style="color:#ad1457;margin-top:20px;border-bottom:1px solid #ad1457;padding-bottom:4px">🛡️ Protocolos Autoimunes</h3>
      ${sections}${outraHtml}
    `;
  };

  const protocolSections = profiles.map(pid => {
    const s = SUGGESTIONS[pid];
    if (!s) return '';
    const fitos = s.fitoterapicos.map(f =>
      `<tr><td style="font-style:italic;padding:4px 8px;border:1px solid #ddd">${f.nome}</td><td style="padding:4px 8px;border:1px solid #ddd">${f.dose}</td><td style="padding:4px 8px;border:1px solid #ddd">${f.indicacao}</td></tr>`
    ).join('');
    const sups = s.suplementos.map(sup =>
      `<tr><td style="padding:4px 8px;border:1px solid #ddd">${sup.nome}</td><td style="padding:4px 8px;border:1px solid #ddd">${sup.dose}</td><td style="padding:4px 8px;border:1px solid #ddd">${sup.indicacao}</td></tr>`
    ).join('');
    const detoxList = s.detox.map(d => `<li>${d}</li>`).join('');
    const examList = s.exames.join(' &nbsp;•&nbsp; ');
    const tableStyle = 'border-collapse:collapse;width:100%;font-size:0.88em;margin-bottom:8px';
    const thStyle = 'background:#f5f5f5;padding:5px 8px;text-align:left;border:1px solid #ddd';
    const manipuladosHtml = renderManipuladosHtmlS(s.manipulados);

    return `
      <div style="page-break-inside:avoid;border:2px solid ${s.color};border-radius:6px;padding:14px 18px;margin-bottom:20px">
        <h3 style="color:${s.color};margin:0 0 10px 0;border-bottom:1px solid ${s.color};padding-bottom:6px">${s.label}</h3>
        ${s.alerta ? `<p style="background:#ffebee;padding:8px;border-radius:4px;border-left:4px solid #b71c1c;margin-bottom:10px"><b>Alerta Clínico:</b> ${s.alerta}</p>` : ''}
        <p style="font-style:italic;color:#555;margin-bottom:12px"><b>Conduta:</b> ${s.conduta}</p>

        <h4 style="color:#2e7d32;margin:8px 0 4px">Fitoterápicos Indicados</h4>
        <table border="1" cellpadding="0" cellspacing="0" style="${tableStyle}">
          <tr><th style="${thStyle}">Planta Medicinal</th><th style="${thStyle}">Posologia</th><th style="${thStyle}">Indicação</th></tr>
          ${fitos}
        </table>

        <h4 style="color:#558b2f;margin:10px 0 4px">Plantas e Alimentos Funcionais</h4>
        <p style="font-size:0.88em;margin:0 0 10px">${s.plantas.join(' &nbsp;•&nbsp; ')}</p>

        <h4 style="color:#1565c0;margin:10px 0 4px">Suplementação</h4>
        <table border="1" cellpadding="0" cellspacing="0" style="${tableStyle}">
          <tr><th style="${thStyle}">Suplemento</th><th style="${thStyle}">Dose</th><th style="${thStyle}">Objetivo</th></tr>
          ${sups}
        </table>

        ${manipuladosHtml ? `<h4 style="color:#4a148c;margin:10px 0 4px">Manipulados — Farmácia de Manipulação</h4>${manipuladosHtml}` : ''}

        <h4 style="color:#7b1fa2;margin:10px 0 4px">Bioquânticos / Florais Quânticos</h4>
        <p style="font-size:0.88em;margin:0 0 10px">${s.bioquanticos.join(' &nbsp;•&nbsp; ')}</p>

        <h4 style="color:#e65100;margin:10px 0 4px">Detoxificação e Protocolos de Suporte</h4>
        <ul style="margin:0 0 10px;padding-left:18px;font-size:0.88em">${detoxList}</ul>

        <h4 style="color:#37474f;margin:10px 0 4px">Exames Sugeridos</h4>
        <p style="font-size:0.88em;margin:0">${examList}</p>
      </div>
    `;
  }).join('');

  const objectives = [
    answers.b14q3 ? `<li>O que deseja melhorar: ${answers.b14q3}</li>` : '',
    answers.b14q4 ? `<li>Objetivos com o tratamento: ${answers.b14q4}</li>` : '',
  ].filter(Boolean).join('');

  const autoimuneBlockS = renderAutoimuneHtmlS();

  return `
    <h2 style="color:#1565c0;margin-bottom:4px">Sugestão Terapêutica Integrativa</h2>
    <p style="color:#555;margin:0 0 4px"><b>Paciente:</b> ${patientName || '–'} &nbsp;|&nbsp; <b>Data:</b> ${date}</p>
    <hr style="margin-bottom:16px"/>
    ${autoimuneBlockS}
    ${protocolSections || '<p>Nenhum protocolo específico identificado. Estratégia de manutenção preventiva recomendada.</p>'}
    ${objectives ? `<h3 style="margin-top:16px">Objetivos do Paciente</h3><ul>${objectives}</ul>` : ''}
    <p style="margin-top:30px;font-size:0.82em;color:#777;border-top:1px solid #ddd;padding-top:8px">
      Wander Pires Silva Coelho — Terapeuta Integrativo Funcional, Naturopatia e Iridologia — CRTH-BR 17821
    </p>
  `;
}

// ─────────────────────────────────────────────────────────────
// PRINT — PLANO NUTRICIONAL
// ─────────────────────────────────────────────────────────────
function buildNutritionalSectionHtml(patientName, profiles, planilhas, cardapios, receitas) {
  const date = new Date().toLocaleDateString('pt-BR');
  const thS = 'background:#f1f8e9;padding:5px 8px;text-align:left;border:1px solid #ddd;font-weight:bold;font-size:0.88em;';
  const tdS = 'padding:4px 8px;border:1px solid #ddd;font-size:0.86em;';
  const tblS = 'border-collapse:collapse;width:100%;margin-bottom:12px;';

  const shownPlans = planilhas.length > 0 ? planilhas : [PLANILHAS_NUTRICIONAIS.ATENCAO_GERAL];

  const planilhasHtml = shownPlans.map(pl => `
    <div style="border:2px solid ${pl.cor};border-radius:6px;padding:14px 18px;margin-bottom:16px;page-break-inside:avoid">
      <h3 style="color:${pl.cor};margin:0 0 6px">${pl.label}</h3>
      <p style="font-style:italic;color:#555;margin:0 0 10px;font-size:0.88em">${pl.objetivo}</p>
      <table style="${tblS}">
        <tr><th style="${thS}">Nutriente / Alimento</th><th style="${thS}">Dose / Porção</th><th style="${thS}">Fontes em FLV</th><th style="${thS}">Função Clínica</th></tr>
        ${pl.nutrientesChave.map(nk => `<tr>
          <td style="${tdS}font-weight:bold">${nk.nutriente}</td>
          <td style="${tdS}color:#4a148c">${nk.dose}</td>
          <td style="${tdS}color:#2e7d32">${nk.alimentos}</td>
          <td style="${tdS}">${nk.funcao}</td>
        </tr>`).join('')}
      </table>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div style="background:#fff8e1;padding:8px;border-radius:4px;border-left:3px solid #e65100;font-size:0.85em">
          <b style="color:#e65100">🚫 Evitar:</b><br/>
          ${pl.alimentosProibidos.map(a => `• ${a}`).join('<br/>')}
        </div>
        <div style="background:#e8f5e9;padding:8px;border-radius:4px;border-left:3px solid #2e7d32;font-size:0.85em">
          <b style="color:#2e7d32">✅ Priorizar:</b><br/>
          ${pl.alimentosTerapeuticos.map(a => `• ${a}`).join('<br/>')}
        </div>
      </div>
    </div>
  `).join('');

  const cardapiosHtml = (cardapios.length > 0 ? cardapios : [CARDAPIOS.ATENCAO_GERAL]).filter(Boolean).map(c => `
    <div style="margin-bottom:20px;page-break-inside:avoid">
      <h3 style="color:#e65100;margin:0 0 4px">${c.label}</h3>
      <p style="font-size:0.84em;color:#555;border-left:3px solid #4caf50;padding-left:8px;margin:0 0 8px">${c.observacoes}</p>
      <table style="${tblS}">
        <tr>
          <th style="${thS}">Dia</th><th style="${thS}">Café</th><th style="${thS}">L. Manhã</th>
          <th style="${thS}">Almoço</th><th style="${thS}">L. Tarde</th><th style="${thS}">Jantar</th>
        </tr>
        ${c.dias.map(d => `<tr>
          <td style="${tdS}font-weight:bold;color:#2e7d32">${d.dia}</td>
          <td style="${tdS}">${d.cafe}</td><td style="${tdS}">${d.lanche1}</td>
          <td style="${tdS}">${d.almoco}</td><td style="${tdS}">${d.lanche2}</td>
          <td style="${tdS}">${d.jantar}</td>
        </tr>`).join('')}
      </table>
    </div>
  `).join('');

  const receitasHtml = receitas.length > 0 ? `
    <h3 style="color:#6a1b9a;border-bottom:2px solid #6a1b9a;padding-bottom:4px;margin-top:20px">Receitas Funcionais</h3>
    ${receitas.map(r => `
      <div style="border:1px solid #ce93d8;border-radius:6px;padding:12px 16px;margin-bottom:10px;page-break-inside:avoid">
        <h4 style="color:#4a148c;margin:0 0 4px">${r.nome} <span style="font-size:0.8em;color:#888">⏱ ${r.tempoPreparo} — ${r.melhorMomento}</span></h4>
        <div style="display:grid;grid-template-columns:1fr 2fr;gap:10px;margin-top:6px;font-size:0.88em">
          <div><b style="color:#1565c0">Ingredientes:</b><br/>${r.ingredientes.map(i => `• ${i}`).join('<br/>')}</div>
          <div>
            <b style="color:#2e7d32">Modo de Preparo:</b><br/>${r.modo}<br/><br/>
            <div style="background:#fffde7;padding:5px 8px;border-radius:4px">
              <b style="color:#e65100">💊 Benefícios:</b> ${r.beneficios}
            </div>
          </div>
        </div>
      </div>
    `).join('')}
  ` : '';

  return `
    <h2 style="color:#2e7d32;margin-bottom:4px">🌿 Plano Nutricional Integrativo</h2>
    <p style="color:#555;margin:0 0 4px"><b>Paciente:</b> ${patientName || '–'} &nbsp;|&nbsp; <b>Data:</b> ${date}</p>
    <hr style="margin-bottom:16px"/>
    <h3 style="color:#4a148c;border-bottom:2px solid #4a148c;padding-bottom:4px">Planilha Nutricional Personalizada</h3>
    ${planilhasHtml}
    <h3 style="color:#e65100;border-bottom:2px solid #e65100;padding-bottom:4px;margin-top:20px">Cardápios Semanais</h3>
    ${cardapiosHtml}
    ${receitasHtml}
    <p style="margin-top:30px;font-size:0.82em;color:#777;border-top:1px solid #ddd;padding-top:8px">
      Wander Pires Silva Coelho — Terapeuta Integrativo Funcional, Naturopatia e Iridologia — CRTH-BR 17821
    </p>
  `;
}
