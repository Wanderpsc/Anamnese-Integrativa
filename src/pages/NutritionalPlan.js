import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container, Paper, Typography, Box, Button, Divider, Tabs, Tab,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Stack, Accordion, AccordionSummary, AccordionDetails,
  Card, CardContent, Alert, Grid, LinearProgress, Tooltip,
  Checkbox, FormControlLabel, FormGroup, TextField, Collapse, Switch
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ScienceIcon from '@mui/icons-material/Science';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NatureIcon from '@mui/icons-material/Nature';
import SearchIcon from '@mui/icons-material/Search';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PrescriptionHeader from '../components/PrescriptionHeader';
import PrescriptionFooter from '../components/PrescriptionFooter';
import { buildLetterheadHtml, openPrintWindow } from '../components/PrintTemplate';
import {
  NUTRIENTES_IDR,
  ALIMENTOS_FUNCIONAIS,
  PLANILHAS_NUTRICIONAIS,
  CARDAPIOS,
  RECEITAS_FUNCIONAIS,
  getNutritionalPlanForProfiles,
} from '../data/nutritionalDatabase';
import { appendHistoricoEntry } from '../lib/historicoUtils';
import SaveToPatientBar from '../components/SaveToPatientBar';

// ─────────────────────────────────────────────────────────────────────────────
// MAPEAMENTO TEXTO → PERFIL
// ─────────────────────────────────────────────────────────────────────────────
const CONDICAO_TO_PERFIL = {
  'hashimoto': 'AUTOIMUNE', 'tireoidite': 'AUTOIMUNE', 'lúpus': 'AUTOIMUNE',
  'artrite': 'AUTOIMUNE', 'crohn': 'DISBIOSE', 'colite': 'DISBIOSE',
  'síndrome do intestino irritável': 'DISBIOSE', 'sii': 'DISBIOSE',
  'fadiga': 'FADIGA', 'cansaço': 'FADIGA', 'ansiedade': 'ANSIEDADE',
  'depressão': 'ANSIEDADE', 'inflamação': 'INFLAMATORIO', 'diabetes': 'INFLAMATORIO',
  'hipertensão': 'INFLAMATORIO', 'menopausa': 'HORMONAL', 'tpm': 'HORMONAL',
  'spco': 'HORMONAL', 'sop': 'HORMONAL', 'hipotireoidismo': 'HORMONAL',
  'fibromialgia': 'INFLAMATORIO', 'psoríase': 'AUTOIMUNE',
  'doença celíaca': 'DISBIOSE', 'celíaco': 'DISBIOSE',
};

function detectProfilesFromAnamnese(anamnese) {
  if (!anamnese) return ['ATENCAO_GERAL'];
  const ai = anamnese.anamnesisIntegrativa || {};
  const text = JSON.stringify(anamnese).toLowerCase();
  const found = new Set();

  // Baseado no texto geral
  Object.entries(CONDICAO_TO_PERFIL).forEach(([key, perfil]) => {
    if (text.includes(key)) found.add(perfil);
  });

  // Baseado em campos estruturados do questionário integrativo
  const sc = (v) => Number(v) || 0;
  const isYes = (v) => v === 'Sim';
  const hasItems = (arr) => Array.isArray(arr) && arr.some(v => v && v !== 'Nenhum');

  if (sc(ai.b2q1) <= 4) found.add('FADIGA');
  if (sc(ai.b6q1) >= 7 || isYes(ai.b6q2) || ai.b15q3 === 'Moderada' || ai.b15q3 === 'Intensa') found.add('ANSIEDADE');
  if (hasItems(ai.b5q1) || ai.b5q4 === 'Preso' || ai.b5q4 === 'Solto' || isYes(ai.b17q1)) found.add('DISBIOSE');
  if (isYes(ai.b9q3)) found.add('AUTOIMUNE');
  if (hasItems(ai.b8q1)) found.add('INFLAMATORIO');
  if (isYes(ai.b11q1)) found.add('INFLAMATORIO');
  const sexo = anamnese.q04_sexo || '';
  if (sexo === 'Feminino' && (text.includes('tpm') || text.includes('menopausa') || text.includes('sop') || text.includes('spco') || text.includes('hormonal'))) {
    found.add('HORMONAL');
  }

  if (found.size === 0) found.add('ATENCAO_GERAL');
  return Array.from(found);
}

// ─────────────────────────────────────────────────────────────────────────────
// ANÁLISE DETALHADA POR QUEIXAS DA ANAMNESE
// ─────────────────────────────────────────────────────────────────────────────
function analyzeAnamnesisForNutrition(anamnese) {
  if (!anamnese) return { issues: [], queixaPrincipal: '', resumoClinico: [] };
  const ai = anamnese.anamnesisIntegrativa || {};
  const sc = (v) => Number(v) || 0;
  const isYes = (v) => v === 'Sim';
  const hasItems = (arr) => Array.isArray(arr) && arr.some(v => v && v !== 'Nenhum');
  const getItems = (arr) => Array.isArray(arr) ? arr.filter(v => v && v !== 'Nenhum') : [];
  const issues = [];
  const resumoClinico = [];

  const queixaPrincipal = ai.b1q1 || anamnese.q25_doencas_cronicas || '';
  if (queixaPrincipal) resumoClinico.push({ label: 'Queixa principal', valor: queixaPrincipal });
  if (anamnese.q25_doencas_cronicas) resumoClinico.push({ label: 'Doenças crônicas', valor: anamnese.q25_doencas_cronicas });
  if (anamnese.q24_medicamentos_uso) resumoClinico.push({ label: 'Medicamentos', valor: anamnese.q24_medicamentos_uso });

  // ---- ENERGIA ----
  const energiaScore = sc(ai.b2q1);
  if (ai.b2q1 !== undefined && energiaScore <= 6) {
    const picoQueda = isYes(ai.b2q3);
    issues.push({
      sistema: 'Energia e Disposição', emoji: '⚡',
      severity: energiaScore <= 3 ? 'alta' : energiaScore <= 5 ? 'media' : 'baixa',
      descricao: `Energia ${energiaScore}/10${ai.b2q2 ? ' — pior: ' + ai.b2q2 : ''}${picoQueda ? ' — picos e quedas glicêmicas' : ''}`,
      nutrientesIndicados: [
        { n: 'Complexo B (B1, B2, B3, B5, B6, B12)', motivo: 'Ciclo de Krebs e produção de ATP mitocondrial' },
        { n: 'Ferro + Vitamina C (juntos)', motivo: 'Transporte de O₂ — anemia subclínica é causa frequente de fadiga' },
        { n: 'CoQ10 (50–200 mg/dia)', motivo: 'Cofator mitocondrial da cadeia transportadora de elétrons' },
        { n: 'Vitamina D (2.000–4.000 UI/dia)', motivo: 'Deficiência é causa subestimada de fadiga crônica' },
        { n: 'Magnésio bisglicinato (300–400 mg)', motivo: 'Cofator de 300+ enzimas; deficiência = cansaço + fraqueza muscular' },
        ...(picoQueda ? [{ n: 'Cromo (200 mcg) + Canela', motivo: 'Estabilização da glicemia; redução de picos e hipoglicemia reativa' }] : []),
        { n: 'Ashwagandha (300–600 mg, KSM-66)', motivo: 'Suporte adrenal; redução do cortisol crônico; vitalidade' },
      ],
      alimentosPrioritarios: ['espinafre', 'lentilha', 'quinoa', 'cogumelos shiitake', 'banana', 'abacate', 'batata-doce', 'castanha-do-pará (B1, selênio)'],
      alimentosEvitar: ['açúcar refinado', 'farinhas brancas', 'bebidas energéticas', 'cafeína em excesso após 14h', 'álcool', 'ultraprocessados'],
      estrategia: 'Refeições a cada 3–4h para estabilização glicêmica. Proteína + fibra + gordura boa em cada refeição. Café da manhã rico em proteínas. Evitar jejum prolongado em fadiga adrenal.',
    });
  }

  // ---- SONO ----
  const sonoScore = sc(ai.b3q1);
  const dormeDificil = isYes(ai.b3q2);
  const acordaNaNoite = isYes(ai.b3q3);
  const acordaCansado = ai.b3q4 === 'Não';
  if (ai.b3q1 !== undefined && (sonoScore <= 6 || dormeDificil || acordaNaNoite || acordaCansado)) {
    const probs = [];
    if (dormeDificil) probs.push('dificuldade para adormecer');
    if (acordaNaNoite) probs.push('acorda à noite');
    if (acordaCansado) probs.push('acorda sem disposição');
    const disturbiosSono = getItems(ai.b3q5);
    issues.push({
      sistema: 'Sono e Recuperação', emoji: '🌙',
      severity: sonoScore <= 3 ? 'alta' : 'media',
      descricao: `Sono ${sonoScore}/10 — ${probs.length ? probs.join(', ') : 'qualidade comprometida'}${disturbiosSono.length ? ' — distúrbios: ' + disturbiosSono.join(', ') : ''}`,
      nutrientesIndicados: [
        { n: 'Magnésio bisglicinato (300–400 mg ao deitar)', motivo: 'Ativa receptores GABA; relaxamento muscular e neural; reduz cortisol noturno' },
        { n: 'L-Triptofano (500 mg) ou 5-HTP (100–200 mg)', motivo: 'Precursor de serotonina → melatonina; sono mais profundo' },
        { n: 'Melatonina (0,5–3 mg sublingual, 30 min antes)', motivo: 'Regulação do ritmo circadiano; sem dependência' },
        { n: 'L-Teanina (200 mg ao deitar)', motivo: 'Alfa-ondas cerebrais; relaxamento sem sedação' },
        { n: 'Vitamina B6 P5P (50 mg)', motivo: 'Cofator na síntese de serotonina e melatonina' },
        { n: 'Ashwagandha (300 mg noturno)', motivo: 'Redução do cortisol; melhora qualidade do sono' },
        ...(disturbiosSono.includes('Ansiedade') ? [{ n: 'GABA (500 mg)', motivo: 'Neurotransmissor inibitório; ansiedade noturna' }] : []),
      ],
      alimentosPrioritarios: ['banana (triptofano + B6)', 'kiwi (2 frutos, 1h antes de dormir)', 'cereja ácida (melatonina natural)', 'nozes (melatonina + magnésio)', 'camomila (apigenina — agonista GABA)', 'melissa (chá)', 'alface (lactucina sedativa)'],
      alimentosEvitar: ['cafeína após 14h', 'álcool (fragmenta ciclo REM)', 'refeições volumosas à noite', 'açúcar refinado à noite', 'telas azuis 1–2h antes'],
      estrategia: 'Jantar leve 2–3h antes de dormir. Chá de melissa ou camomila 1h antes. Rotina fixa de dormir/acordar (+/-30 min). Quarto fresco e escuro.',
    });
  }

  // ---- DIGESTIVO ----
  const sintomasDigestivos = getItems(ai.b5q1);
  const alimentoPioraSintomas = isYes(ai.b5q2);
  const intestinoPreso = ai.b5q4 === 'Preso';
  const intestinoSolto = ai.b5q4 === 'Solto';
  const sintomasPosComer = getItems(ai.b17q2);
  const suspeintaIntol = isYes(ai.b17q1);
  if (sintomasDigestivos.length > 0 || alimentoPioraSintomas || intestinoPreso || intestinoSolto || suspeintaIntol || sintomasPosComer.length > 0) {
    issues.push({
      sistema: 'Sistema Digestório e Microbiota', emoji: '🦠',
      severity: (intestinoSolto && alimentoPioraSintomas) || suspeintaIntol ? 'alta' : 'media',
      descricao: `Sintomas: ${sintomasDigestivos.join(', ') || '—'} | Intestino: ${ai.b5q4 || '?'}${alimentoPioraSintomas ? ' | alimento piora' : ''}${suspeintaIntol ? ' | suspeita de intolerância' : ''}${sintomasPosComer.length ? ' | pós-refeição: ' + sintomasPosComer.join(', ') : ''}`,
      nutrientesIndicados: [
        { n: 'Probióticos (10–50 bil. UFC: Lactobacillus + Bifidobacterium)', motivo: 'Restauração da microbiota; modulação imune intestinal' },
        { n: 'L-Glutamina (5–10 g/dia, jejum)', motivo: 'Nutriente primário dos enterócitos; reparo da permeabilidade intestinal (leaky gut)' },
        { n: 'Fibras prebióticas (FOS/Inulina 5 g ou Psyllium 10 g)', motivo: 'Alimento das bifidobactérias; regularidade intestinal' },
        { n: 'Zinco carnosina (75 mg 2x/dia)', motivo: 'Suporte à mucosa gástrica; redução de refluxo e gastrite' },
        { n: 'Enzimas digestivas (bromelina, papaína, amilase, lipase)', motivo: 'Melhora digestão de proteínas, gorduras e amido' },
        ...(intestinoPreso ? [{ n: 'Magnésio citrato (200–400 mg à noite)', motivo: 'Efeito osmótico; melhora trânsito intestinal' }] : []),
        ...(sintomasDigestivos.includes('Azia/refluxo') ? [{ n: 'Ácido Hialurônico + Aloe vera', motivo: 'Proteção da mucosa esofágica e gástrica' }] : []),
      ],
      alimentosPrioritarios: ['kefir de leite ou água', 'iogurte natural (lactobacilos)', 'chucrute/kimchi (fermentados)', 'banana verde (amido resistente)', 'maçã com casca (pectina)', 'linhaça e chia', 'caldo de ossos (colágeno/glutamina)', 'alho e cebola (FOS)'],
      alimentosEvitar: intestinoPreso
        ? ['farinhas brancas', 'laticínios industrializados', 'alimentos processados', 'pouco líquido']
        : suspeintaIntol || sintomasPosComer.includes('Inchaço')
          ? ['glúten (triagem)', 'lactose (triagem)', 'FODMAP excessivo', 'aditivos artificiais', 'alimentos ricos em histamina (queijo curado, vinho, embutidos)']
          : ['ultraprocessados', 'frituras', 'açúcar refinado', 'álcool'],
      estrategia: intestinoPreso
        ? 'Hidratação mínima 2L/dia. Psyllium + água ao acordar. Ameixa seca, mamão, linhaça. Caminhada 30 min/dia. Horário fixo para evacuar (após refeição).'
        : 'Dieta de eliminação por 3–4 semanas. Registro alimentar com sintomas. Reintrodução sistemática. Investigar SIBO se inchaço persistente.',
    });
  }

  // ---- EMOCIONAL / ANSIEDADE / ESTRESSE ----
  const estresseScore = sc(ai.b6q1);
  const ansioso = isYes(ai.b6q2) || ai.b15q3 === 'Moderada' || ai.b15q3 === 'Intensa';
  const menteAcelerada = isYes(ai.b6q3);
  const concScore = sc(ai.b6q4);
  const desanimo = isYes(ai.b6q5) || (Array.isArray(ai.b15q5) && ai.b15q5.includes('Desânimo frequente'));
  const sintAnsiedade = getItems(ai.b15q4);
  const sintDepressivos = getItems(ai.b15q5);
  if ((ai.b6q1 !== undefined && estresseScore >= 5) || ansioso || menteAcelerada || desanimo || (ai.b6q4 !== undefined && concScore <= 5)) {
    issues.push({
      sistema: 'Saúde Emocional e Neurológica', emoji: '🧠',
      severity: estresseScore >= 8 || ai.b15q3 === 'Intensa' ? 'alta' : 'media',
      descricao: `Estresse ${estresseScore}/10, ansiedade: ${ai.b15q3 || (ansioso ? 'presente' : '—')}${sintAnsiedade.length ? ' (' + sintAnsiedade.join(', ') + ')' : ''}${desanimo ? ' | desânimo' : ''}${sintDepressivos.length ? ': ' + sintDepressivos.slice(0, 3).join(', ') : ''}${concScore <= 5 && ai.b6q4 !== undefined ? ' | concentração ' + concScore + '/10' : ''}`,
      nutrientesIndicados: [
        { n: 'Magnésio bisglicinato (300–400 mg)', motivo: 'Regula cortisol; ativa GABA; bloqueia receptor NMDA (glutamato excitotóxico)' },
        { n: 'Vitamina B6 P5P (50 mg) + B12 + Folato (metilfolato)', motivo: 'Metilação; síntese de serotonina, dopamina e GABA' },
        { n: 'Ômega-3 EPA/DHA (2–3 g/dia)', motivo: 'Anti-inflamatório cerebral; melhora de humor e cognição' },
        { n: 'Ashwagandha KSM-66 (300–600 mg)', motivo: 'Adaptógeno: −30% cortisol; reduz ansiedade e melhora cognição' },
        { n: 'L-Triptofano (500 mg) / 5-HTP (100 mg)', motivo: 'Precursor de serotonina; humor, ansiedade, compulsão alimentar' },
        { n: 'L-Teanina (200 mg)', motivo: 'Alfa-ondas; relaxamento sem sedação; sinérgico à cafeína' },
        { n: 'Vitamina D (2.000–4.000 UI)', motivo: 'Receptores VD no córtex e hipocampo; deficiência = depressão' },
        ...(concScore <= 5 && ai.b6q4 !== undefined ? [{ n: 'Bacopa monnieri (300 mg) + Citicoline (250 mg)', motivo: 'Cognição, memória e foco; neuroproteção' }] : []),
      ],
      alimentosPrioritarios: ['banana (B6 + triptofano)', 'nozes (ômega-3 + melatonina)', 'chocolate amargo 70%+ (magnésio + feniletilamina)', 'espinafre (magnésio + folato)', 'salmão/sardinha (EPA/DHA + B12)', 'kefir (GABA precursor via microbiota)', 'ovos (colina + B12)', 'mirtilo (neuropreteção)'],
      alimentosEvitar: ['cafeína em excesso (cortisol)', 'açúcar refinado (hipoglicemia reativa piora ansiedade)', 'álcool (depressor + rebote ansioso)', 'glutamato (MSG — excitotóxico)', 'ultraprocessados (inflamação sistêmica)'],
      estrategia: 'Dieta mediterrânea anti-inflamatória. Café da manhã proteico para estabilizar serotonina. Ashwagandha em ciclos de 8 semanas. Evitar jejum prolongado em adrenal fadiga. Ritmo circadiano regular.',
    });
  }

  // ---- CARDIOVASCULAR ----
  const sintomasCardio = getItems(ai.b8q1);
  if (sintomasCardio.length > 0) {
    const pressaoAlta = sintomasCardio.includes('Pressão alta');
    issues.push({
      sistema: 'Cardiovascular', emoji: '❤️',
      severity: pressaoAlta ? 'alta' : 'media',
      descricao: `Sintomas: ${sintomasCardio.join(', ')}${isYes(ai.b8q2) ? ' — piora com estresse' : ''}`,
      nutrientesIndicados: [
        { n: 'Ômega-3 EPA/DHA (2–4 g/dia)', motivo: 'Reduz triglicerídeos; anti-inflamatório vascular; antiagregante plaquetário' },
        { n: 'Magnésio (400 mg)', motivo: 'Vasodilatador; antiarrítmico; regula pressão arterial' },
        { n: 'CoQ10 (100–300 mg)', motivo: 'Função miocardíaca; redução de LDL oxidado; essencial se usa estatina' },
        { n: 'Vitamina K2 MK-7 (100–200 mcg)', motivo: 'Direciona cálcio para ossos; protege artérias da calcificação' },
        { n: 'Potássio (via alimentos, 3.000+ mg/dia)', motivo: 'Reduz PA sistólica; contrapõe sódio excessivo' },
        { n: 'Resveratrol (100–500 mg)', motivo: 'Proteção endotelial; ativação de sirtuínas; anti-inflamatório' },
        ...(pressaoAlta ? [{ n: 'Berberina (500 mg 2x/dia)', motivo: 'Reduz PA, LDL, glicemia e triglicerídeos' }, { n: 'Extrato de beterraba (nitratos)', motivo: 'Vasodilatação via óxido nítrico; redução de PA' }] : []),
      ],
      alimentosPrioritarios: ['azeite extravirgem', 'sardinha e salmão', 'nozes e amêndoas', 'abacate', 'alho', 'cúrcuma', 'uva preta (resveratrol)', 'espinafre (nitratos)', 'beterraba (óxido nítrico)', 'romã', 'tomate (licopeno)'],
      alimentosEvitar: ['sal excessivo (>2g Na/dia)', 'gordura trans', 'açúcar e carboidratos refinados', 'carne vermelha processada', 'álcool em excesso', 'fritos'],
      estrategia: 'Dieta DASH ou mediterrânea. Reduzir sódio para <2g/dia. Atividade aeróbica 150 min/semana. Hidratação 2–2,5L/dia. Gerenciar estresse (cortisol → vasoconstrição).',
    });
  }

  // ---- IMUNOLÓGICO / AUTOIMUNE ----
  const adoeceFreq = isYes(ai.b9q1);
  const infeccoesRecorr = isYes(ai.b9q2);
  const doencaAutoimune = isYes(ai.b9q3);
  const doencasAutoList = getItems(ai.b9q3a);
  if (adoeceFreq || infeccoesRecorr || doencaAutoimune) {
    issues.push({
      sistema: 'Sistema Imunológico', emoji: '🛡️',
      severity: doencaAutoimune ? 'alta' : infeccoesRecorr ? 'media' : 'baixa',
      descricao: `${doencaAutoimune ? 'Autoimune: ' + (doencasAutoList.join(', ') || 'presente') : ''}${adoeceFreq ? ' | adoece frequentemente' : ''}${infeccoesRecorr ? ' | infecções recorrentes' : ''}`,
      nutrientesIndicados: [
        { n: 'Vitamina D (3.000–5.000 UI/dia)', motivo: 'Imunomodulação; ativa peptídeos antimicrobianos (catelicidina); reduz autoimunidade' },
        { n: 'Vitamina C (1.000–3.000 mg/dia)', motivo: 'Função de neutrófilos; antioxidante; síntese de colágeno (barreira física)' },
        { n: 'Zinco (15–30 mg/dia)', motivo: 'Cofator de mais de 200 enzimas imunológicas; atividade antiviral' },
        { n: 'Selênio (100–200 mcg/dia)', motivo: 'Glutationa peroxidase; modulação Th1/Th2; específico para Hashimoto' },
        { n: 'Ômega-3 EPA/DHA (2–4 g/dia)', motivo: 'Modulação Th17/Treg; anti-inflamatório sistêmico' },
        { n: 'Probióticos especializados (L. rhamnosus, B. longum)', motivo: 'Eixo intestino-imune; reduz permeabilidade; tolerância oral' },
        { n: 'Quercetina (500–1.000 mg)', motivo: 'Anti-inflamatória; inibe histamina; antioxidante flavonoide' },
        { n: 'Vitamina A (5.000 UI/dia)', motivo: 'Diferenciação de células T regulatórias; integridade da barreira mucosa' },
      ],
      alimentosPrioritarios: ['alho e cebola (alicina + quercetina)', 'gengibre (gingerol)', 'cúrcuma + pimenta preta (curcumina)', 'cogumelos (beta-glucanas)', 'brócolis (sulforafano)', 'castanha-do-pará (1–2/dia = 100–200 mcg Se)', 'caldo de ossos (colágeno + glutamina)'],
      alimentosEvitar: doencaAutoimune
        ? ['glúten (protocolo AIP)', 'laticínios (se sensível)', 'solanáceas (batata, tomate, pimentão, beringela — protocolo AIP)', 'óleos refinados (ômega-6 excessivo)', 'açúcar refinado', 'álcool', 'aditivos artificiais']
        : ['açúcar refinado', 'ultraprocessados', 'óleos vegetais industriais', 'álcool'],
      estrategia: doencaAutoimune
        ? 'Protocolo AIP (Autoimmune Protocol) por 4–6 semanas. Eliminar grãos, leguminosas, laticínios, solanáceas e ovos. Reintroduzir 1 alimento a cada 5–7 dias. Monitorar marcadores inflamatórios (PCR-us, VHS).'
        : 'Dieta anti-inflamatória mediterrânea. Priorizar saúde intestinal como base imunológica. Vitamina D + Zinco como base.',
    });
  }

  // ---- MUSCULOESQUELÉTICO ----
  const dorMuscular = isYes(ai.b11q1);
  const recFisicaScore = sc(ai.b11q2);
  if (dorMuscular || (ai.b11q2 !== undefined && recFisicaScore <= 5)) {
    issues.push({
      sistema: 'Musculoesquelético', emoji: '💪',
      severity: dorMuscular && recFisicaScore <= 3 ? 'alta' : 'media',
      descricao: `${dorMuscular ? 'Dores musculares/articulares' : ''}${ai.b11q2 !== undefined ? ' | Recuperação física: ' + recFisicaScore + '/10' : ''}`,
      nutrientesIndicados: [
        { n: 'Magnésio (400 mg/dia)', motivo: 'Relaxamento muscular; síntese de ATP; redução de cãibras e tensão' },
        { n: 'Vitamina D + K2', motivo: 'Mineralização óssea; força muscular; redução de inflamação articular' },
        { n: 'Colágeno tipo II (40 mg/dia) ou hidrolisado (10–15 g)', motivo: 'Regeneração de cartilagem e ligamentos' },
        { n: 'Cúrcuma + Piperina (500–1.000 mg curcumina 3x/dia)', motivo: 'Anti-inflamatório articular com evidência clínica' },
        { n: 'Ômega-3 EPA/DHA (2–4 g/dia)', motivo: 'Anti-inflamatório; reduz rigidez matinal; dor articular' },
        { n: 'MSM — metilsulfonilmetano (1–3 g/dia)', motivo: 'Síntese de colágeno; anti-inflamatório articular; sinérgico com glucosamina' },
        { n: 'Proteína total (1,6–2,0 g/kg/dia)', motivo: 'Reparação e síntese muscular; prevenção de sarcopenia' },
      ],
      alimentosPrioritarios: ['abacaxi fresco (bromelina antiinflamatória)', 'cereja ácida (antioxidante)', 'gengibre', 'cúrcuma com pimenta preta e azeite', 'espinafre e couve (Ca + Mg)', 'caldo de ossos', 'leguminosas (proteína vegetal)', 'sardinha (EPA/DHA + Ca)'],
      alimentosEvitar: ['açúcar refinado (pró-inflamatório)', 'óleos refinados (ômega-6 excessivo)', 'álcool', 'ultraprocessados', 'glúten (se artrite reativa)'],
      estrategia: 'Proteína + vitamina C em cada refeição (síntese de colágeno). Caldo de ossos 200 mL/dia. Cúrcuma + pimenta preta + azeite para máxima absorção. Anti-inflamatório natural priorizado sobre AINEs.',
    });
  }

  // ---- ALERGIAS E INTOLERÂNCIAS ----
  const alergiasDiag = isYes(ai.b16q1);
  const sensibilidades = getItems(ai.b16q2);
  const sintomasPostComer = getItems(ai.b17q2);
  if (alergiasDiag || sensibilidades.length > 0 || (ai.b17q1 !== undefined && isYes(ai.b17q1)) || sintomasPostComer.length > 0) {
    issues.push({
      sistema: 'Alergias e Intolerâncias', emoji: '⚠️',
      severity: alergiasDiag ? 'alta' : 'media',
      descricao: `${alergiasDiag ? 'Alergia: ' + (ai.b16q1b || 'presente') : ''}${sensibilidades.length ? ' | sensível a: ' + sensibilidades.join(', ') : ''}${isYes(ai.b17q1) ? ' | intolerância suspeita' : ''}${sintomasPostComer.length ? ' | pós-refeição: ' + sintomasPostComer.join(', ') : ''}`,
      nutrientesIndicados: [
        { n: 'Vitamina C (1.000–2.000 mg)', motivo: 'Anti-histamínico natural; estabilizador de mastócitos' },
        { n: 'Quercetina (500 mg 2x/dia antes das refeições)', motivo: 'Inibição da liberação de histamina; anti-alérgico comprovado' },
        { n: 'Probióticos (L. rhamnosus GG 10 bil.)', motivo: 'Modulação imune mucosa; tolerância oral' },
        { n: 'Vitamina D (2.000–5.000 UI)', motivo: 'Tolerância imunológica; redução de atopia' },
        { n: 'Zinco (15–30 mg)', motivo: 'Barreira epitelial; tolerância imunológica' },
        ...(sintomasPostComer.includes('Inchaço') || sintomasPostComer.includes('Gases') ? [{ n: 'Enzima DAO (se intolerância à histamina)', motivo: 'Degradação de histamina dietética' }] : []),
      ],
      alimentosPrioritarios: ['gengibre', 'cebola e alho (quercetina)', 'brócolis', 'frutas vermelhas', 'chá verde (EGCG)', 'kefir'],
      alimentosEvitar: alergiasDiag
        ? ['alimento alergênico identificado (afastamento rigoroso)', 'ultraprocessados (contaminação cruzada)', 'aditivos artificiais (sulfitos, nitratos, tartrazina)']
        : ['glúten e lactose (triagem 3–4 semanas)', 'alimentos fermentados ricos em histamina', 'aditivos artificiais', 'FODMAP (se inchaço dominante)'],
      estrategia: 'Dieta de eliminação por 3–4 semanas. Registro alimentar com sintomas horários. Reintrodução sistemática (1 alimento/semana). Quercetina 20 min antes das refeições suspeitas.',
    });
  }

  // ---- SUPORTE HEPÁTICO / DETOX ----
  const usaAlcool = ai.b12q1 === 'Frequente';
  const usaMed = isYes(ai.b12q3) || (anamnese.q24_medicamentos_uso && anamnese.q24_medicamentos_uso.trim());
  const fuma = isYes(ai.b12q2);
  if (usaAlcool || fuma || usaMed) {
    issues.push({
      sistema: 'Suporte Hepático e Detox', emoji: '🫀',
      severity: usaAlcool || fuma ? 'alta' : 'baixa',
      descricao: `${usaAlcool ? 'Álcool frequente' : ''}${fuma ? ' | tabagismo' : ''}${usaMed ? ' | medicamentos: ' + (anamnese.q24_medicamentos_uso || 'presente') : ''}`,
      nutrientesIndicados: [
        { n: 'Silimarina (cardo-mariano, 140 mg 3x/dia)', motivo: 'Hepatoproteção; regeneração de hepatócitos; aumenta glutationa hepática' },
        { n: 'NAC — N-acetilcisteína (600–1.200 mg)', motivo: 'Precursor de glutationa; desintoxicação fase II (conjugação)' },
        { n: 'Glutationa reduzida (100–300 mg sublingual)', motivo: 'Principal antioxidante hepático; detox de xenobióticos' },
        { n: 'Complexo B (B1, B6, B12, Folato)', motivo: 'Depleção pelo álcool e tabaco; metilação e ciclo do folato' },
        { n: 'Vitamina C (1.000–2.000 mg)', motivo: 'Proteção de hepatócitos; síntese de glutationa; antioxidante' },
        { n: 'Probióticos', motivo: 'Eixo intestino-fígado: reduz LPS bacteriano (sobrecarrega hepatócitos)' },
        ...(fuma ? [{ n: 'Vitamina E (400 UI) + Selênio (100–200 mcg)', motivo: 'Proteção pulmonar do tabagismo; antioxidante lipofílico' }] : []),
      ],
      alimentosPrioritarios: ['cúrcuma', 'brócolis e couve-flor (glucosinolatos — ativam fase II)', 'alho e cebola (enxofre — glutationa)', 'beterraba (betaína — metilação)', 'maçã (pectina — captura toxinas no TGI)', 'chá-verde (EGCG)', 'limão em água morna em jejum'],
      alimentosEvitar: ['álcool', 'frituras', 'frutose industrial (HFCS — fígado gordo)', 'carnes processadas (nitrosaminas)', 'ultraprocessados'],
      estrategia: 'Cardo-mariano + NAC como base. Limão em água morna 30 min antes do café da manhã. Cúrcuma com azeite e pimenta preta (biodisponibilidade 2.000%). Hidratação 2–2,5L/dia. Ciclos de detox 30 dias a cada trimestre.',
    });
  }

  // ---- HORMONAL FEMININO ----
  const sexo = anamnese.q04_sexo || '';
  const textoGeral = JSON.stringify(anamnese).toLowerCase();
  if (sexo === 'Feminino' && (textoGeral.includes('tpm') || textoGeral.includes('menopausa') || textoGeral.includes('sop') || textoGeral.includes('spco') || textoGeral.includes('hormonal') || textoGeral.includes('ciclo') || textoGeral.includes('menstrual'))) {
    issues.push({
      sistema: 'Equilíbrio Hormonal Feminino', emoji: '🌸',
      severity: 'media',
      descricao: 'Desequilíbrio hormonal identificado — protocolo nutricional feminino',
      nutrientesIndicados: [
        { n: 'Mio-Inositol (2g) + D-chiro-inositol (250mg)', motivo: 'SOP: melhora insulino-resistência; restaura ovulação; reduz andrógenos' },
        { n: 'Vitamina B6 P5P (50–100 mg)', motivo: 'Síntese de progesterona; TPM; modulação de prolactina' },
        { n: 'Magnésio (400 mg)', motivo: 'Cólicas menstruais; ansiedade pré-menstrual; síntese de progesterona' },
        { n: 'Zinco (15–25 mg)', motivo: 'Síntese hormonal; ovulação; acne hormonal' },
        { n: 'Vitamina D (2.000–4.000 UI)', motivo: 'Regulação do ciclo; FSH/LH; fertilidade; redução de PCOS' },
        { n: 'Ômega-3 EPA/DHA (2–3 g)', motivo: 'Dismenorreia; equilíbrio de eicosanoides; antiinflamatório' },
        { n: 'Vitex agnus-castus (Sauzinho, 400 mg/dia)', motivo: 'Modulação de FSH/LH; redução de sintomas climatéricos e TPM' },
      ],
      alimentosPrioritarios: ['linhaça (fitoestrogênio + ômega-3)', 'brócolis + couve (DIM — clearance estrogênico hepático)', 'sementes de abóbora (zinco)', 'maca peruana (adaptógena hormonal)', 'salmão', 'aveia (beta-glucana + fibra)'],
      alimentosEvitar: ['plásticos BPA (xenoestrógenos)', 'pesticidas (disruptores endócrinos)', 'álcool (aumenta estrogênio circulante)', 'açúcar refinado (picos insulina → andrógenos)', 'soja em excesso (doses altas de isoflavonas)'],
      estrategia: 'Seed cycling: linhaça + sementes de abóbora (fase folicular); gergelim + sementes de girassol (fase lútea). Inositol ao acordar. Brócolis 100g/dia para DIM. Rastreio de vitamina D + zinco plasmático.',
    });
  }

  return { issues, queixaPrincipal, resumoClinico };
}

// ─────────────────────────────────────────────────────────────────────────────
// RESTRIÇÕES ALIMENTARES — OPÇÕES E MOTOR DE ADAPTAÇÃO
// ─────────────────────────────────────────────────────────────────────────────
const RESTRICTION_OPTIONS = [
  { key: 'vegetariano',   label: '🥕 Vegetariano',          group: 'Estilo Alimentar' },
  { key: 'vegano',        label: '🌱 Vegano',               group: 'Estilo Alimentar' },
  { key: 'lowCarb',       label: '🥑 Low Carb',             group: 'Estilo Alimentar' },
  { key: 'cetogenico',    label: '⚡ Cetogênico',           group: 'Estilo Alimentar' },
  { key: 'semGluten',     label: '🌾 Sem Glúten',           group: 'Intolerâncias / Alergias' },
  { key: 'semLactose',    label: '🥛 Sem Lactose',          group: 'Intolerâncias / Alergias' },
  { key: 'semOvos',       label: '🥚 Sem Ovos',             group: 'Intolerâncias / Alergias' },
  { key: 'semSoja',       label: '🫘 Sem Soja',             group: 'Intolerâncias / Alergias' },
  { key: 'semAmendoim',   label: '🥜 Sem Amendoim',         group: 'Intolerâncias / Alergias' },
  { key: 'semMariscos',   label: '🦞 Sem Frutos do Mar',    group: 'Intolerâncias / Alergias' },
  { key: 'semCarne',      label: '🥩 Sem Carne Vermelha',   group: 'Preferências' },
  { key: 'semFrango',     label: '🍗 Sem Frango',           group: 'Preferências' },
  { key: 'semPeixe',      label: '🐟 Sem Peixe',            group: 'Preferências' },
  { key: 'semAcucar',     label: '🍫 Sem Açúcar',           group: 'Preferências' },
];

const RESTRICTION_SUBS = {
  semGluten: [
    [/pão integral/gi, 'pão s/glúten (arroz/mandioca)'],
    [/pão \w+/gi, 'pão s/glúten'],
    [/macarrão/gi, 'macarrão de arroz ou mandioca'],
    [/aveia/gi, 'aveia certificada s/glúten'],
    [/biscoito de trigo/gi, 'biscoito de arroz'],
    [/wraps?/gi, 'wrap de arroz'],
    [/cuscuz/gi, 'quinoa'],
    [/trigo/gi, 'arroz integral ou quinoa'],
  ],
  semLactose: [
    [/leite desnatado/gi, 'leite vegetal (amêndoa/aveia/coco)'],
    [/leite \w+/gi, 'leite vegetal'],
    [/iogurte \w*/gi, 'iogurte de coco s/lactose'],
    [/queijo \w*/gi, 'queijo s/lactose ou vegano'],
    [/manteiga/gi, 'azeite extra virgem'],
    [/ricota/gi, 'tofu firme ou pasta de castanha'],
    [/whey/gi, 'proteína vegetal (ervilha/arroz)'],
  ],
  vegano: [
    [/frango/gi, 'tofu grelhado'],
    [/salmão/gi, 'linhaça+chia (ômega-3 vegetal)'],
    [/peixe/gi, 'tofu defumado ou tempeh'],
    [/atum/gi, 'tofu temperado com azeite+limão'],
    [/tilápia/gi, 'tofu firme grelhado'],
    [/carne \w*/gi, 'PTS (proteína texturizada de soja)'],
    [/bife/gi, 'hambúrguer de lentilha'],
    [/ovos?/gi, 'chia+água (gel: 1cs=1ovo) ou tofu mexido'],
    [/mel/gi, 'xarope de agave ou tâmaras'],
    [/iogurte \w*/gi, 'iogurte de coco vegano'],
    [/queijo \w*/gi, 'queijo vegano'],
    [/leite \w*/gi, 'leite vegetal'],
    [/manteiga/gi, 'pasta de amêndoa ou azeite'],
    [/whey/gi, 'proteína vegetal (ervilha/arroz)'],
  ],
  vegetariano: [
    [/frango/gi, 'grão de bico ou lentilha'],
    [/salmão/gi, 'ovo caipira + suplemento ômega-3 algae'],
    [/peixe/gi, 'ovo ou tofu firme'],
    [/atum/gi, 'ovo cozido ou cottage'],
    [/tilápia/gi, 'tofu grelhado'],
    [/carne \w*/gi, 'PTS ou feijão temperado'],
    [/bife/gi, 'proteína de ervilha grelhada'],
  ],
  semCarne: [
    [/carne vermelha/gi, 'frango ou peixe branco'],
    [/carne bovina/gi, 'frango grelhado'],
    [/carne/gi, 'frango ou peixe'],
    [/bife/gi, 'filé de frango grelhado'],
  ],
  semFrango: [
    [/frango/gi, 'peixe branco (tilápia ou merluza)'],
  ],
  semPeixe: [
    [/salmão/gi, 'frango + suplemento ômega-3'],
    [/peixe/gi, 'frango ou proteína vegetal'],
    [/atum/gi, 'peito de frango'],
    [/tilápia/gi, 'frango grelhado'],
  ],
  semOvos: [
    [/ovos?/gi, 'cottage ou queijo branco'],
  ],
  semSoja: [
    [/tofu/gi, 'frango grelhado ou ovo'],
    [/edamame/gi, 'ervilha fresca'],
    [/\bsoja\b/gi, 'grão de bico ou lentilha'],
  ],
  semAmendoim: [
    [/amendoim/gi, 'castanha-do-pará ou amêndoa'],
    [/pasta de amendoim/gi, 'pasta de amêndoa ou castanha de caju'],
  ],
  semMariscos: [
    [/camarão/gi, 'frango ou peixe branco'],
    [/mariscos?/gi, 'peixe branco'],
    [/frutos do mar/gi, 'frango grelhado'],
  ],
  lowCarb: [
    [/arroz integral/gi, 'arroz de couve-flor (½ porção)'],
    [/arroz/gi, 'couve-flor ralada refogada'],
    [/macarrão/gi, 'espaguete de abobrinha'],
    [/batata doce/gi, 'abobrinha ou brócolis'],
    [/banana/gi, 'morango ou framboesa (baixo IG)'],
    [/pão/gi, 'pão low carb (farinha de amêndoa)'],
    [/tapioca/gi, 'omelete fino (wrap low carb)'],
  ],
  cetogenico: [
    [/arroz \w*/gi, 'couve-flor ralada'],
    [/arroz/gi, 'couve-flor ralada'],
    [/macarrão/gi, 'espaguete de abobrinha'],
    [/batata doce/gi, 'abacate ou ovos'],
    [/banana/gi, 'framboesa (mínimo)'],
    [/pão \w*/gi, 'fatias de abacate ou omelete'],
    [/aveia/gi, 'sementes de chia ou linhaça'],
    [/tapioca/gi, 'omelete com queijo'],
  ],
  semAcucar: [
    [/mel/gi, 'stévia ou xilitol'],
    [/açúcar \w*/gi, 'stévia ou eritritol'],
    [/\baçúcar/gi, 'stévia'],
    [/xarope de \w+/gi, 'stévia líquida'],
    [/achocolatado/gi, 'cacau 70%+ s/açúcar'],
    [/suco de caixinha/gi, 'água com limão ou chá'],
  ],
};

function adaptCardapioForRestrictions(cardapios, restrictions) {
  const activeKeys = Object.keys(restrictions).filter(k => k !== 'alimentos_livres' && restrictions[k]);
  const livresRaw = restrictions.alimentos_livres || '';
  const exclusoesLivres = livresRaw.split(',').map(s => s.trim()).filter(Boolean);
  if (activeKeys.length === 0 && exclusoesLivres.length === 0) return cardapios;

  // Se vegano, não duplicar subs de vegetariano
  const toApply = restrictions.vegano ? activeKeys.filter(k => k !== 'vegetariano') : activeKeys;

  return cardapios.map(cardapio => {
    if (!cardapio || !cardapio.dias) return cardapio;
    return {
      ...cardapio,
      label: cardapio.label + ' (adaptado)',
      dias: cardapio.dias.map(dia => {
        const campos = ['cafe', 'lanche1', 'almoco', 'lanche2', 'jantar'];
        const adapted = { ...dia };
        campos.forEach(campo => {
          if (!adapted[campo]) return;
          let txt = adapted[campo];
          toApply.forEach(rKey => {
            (RESTRICTION_SUBS[rKey] || []).forEach(([pattern, repl]) => {
              txt = txt.replace(pattern, repl);
            });
          });
          exclusoesLivres.forEach(exc => {
            const rx = new RegExp(exc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            txt = txt.replace(rx, `⚠️[subst: ${exc}]`);
          });
          adapted[campo] = txt;
        });
        return adapted;
      }),
    };
  });
}

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ pt: 2 }}>{children}</Box> : null;
}

const SEVERITY_CONFIG = {
  alta: { color: '#b71c1c', bg: '#ffebee', label: 'Prioridade Alta', icon: '🔴' },
  media: { color: '#e65100', bg: '#fff3e0', label: 'Prioridade Média', icon: '🟠' },
  baixa: { color: '#2e7d32', bg: '#e8f5e9', label: 'Atenção', icon: '🟡' },
};

export default function NutritionalPlan() {
  const { id } = useParams();
  const [patientName, setPatientName] = useState('');
  const [anamnese, setAnamnese] = useState(null);
  const [tab, setTab] = useState(0);
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [itemSavedMsg, setItemSavedMsg] = useState('');
  const [restrictions, setRestrictions] = useState({ alimentos_livres: '' });
  const [showRestrictions, setShowRestrictions] = useState(false);

  const handleSaveHistorico = () => {
    if (!anamnese) return;
    appendHistoricoEntry(anamnese.id, {
      tipo: 'nutricional',
      titulo: '🥦 Plano Nutricional Integrativo',
      resumo: `Perfis: ${profiles.join(', ')}`,
      pagina: `/plano-nutricional/${anamnese.id}`,
    });
    setSavedMsg('Plano nutricional salvo no histórico!');
    setTimeout(() => setSavedMsg(''), 3500);
  };

  useEffect(() => {
    const pid = id || localStorage.getItem('currentPatientId');
    if (!pid) return;
    const saved = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const patient = saved.find(p => String(p.id) === String(pid));
    if (patient) {
      setPatientName(patient.q01_nome || '');
      setAnamnese(patient);
    }
  }, [id]);

  const profiles = useMemo(() => detectProfilesFromAnamnese(anamnese), [anamnese]);
  const activeProfiles = useMemo(
    () => selectedProfile ? [selectedProfile] : profiles,
    [profiles, selectedProfile]
  );
  const { planilhas, cardapios, receitas } = useMemo(
    () => getNutritionalPlanForProfiles(activeProfiles),
    [activeProfiles]
  );
  const analysis = useMemo(() => analyzeAnamnesisForNutrition(anamnese), [anamnese]);
  const adaptedCardapios = useMemo(
    () => adaptCardapioForRestrictions(cardapios, restrictions),
    [cardapios, restrictions]
  );

  useEffect(() => {
    if (selectedProfile && !profiles.includes(selectedProfile)) setSelectedProfile(null);
  }, [profiles, selectedProfile]);

  const saveNutritionalItem = (type, item) => {
    if (!anamnese) return;
    try {
      const list = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const index = list.findIndex(patient => String(patient.id) === String(anamnese.id));
      if (index === -1) return;
      const protocols = list[index].nutritionalProtocols || { cardapios: [], receitas: [] };
      const items = Array.isArray(protocols[type]) ? protocols[type] : [];
      const itemId = item.id || item.nome || item.label;
      const updatedItems = [
        ...items.filter(savedItem => (savedItem.id || savedItem.nome || savedItem.label) !== itemId),
        { ...item, savedAt: new Date().toISOString(), profile: selectedProfile || activeProfiles[0] },
      ];
      list[index].nutritionalProtocols = { ...protocols, [type]: updatedItems };
      list[index].updatedAt = new Date().toISOString();
      localStorage.setItem('anamneses', JSON.stringify(list));
      setAnamnese(list[index]);
      window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: list[index] }));
      setItemSavedMsg(`${type === 'cardapios' ? 'Cardápio' : 'Receita'} salvo no protocolo do interagente.`);
      setTimeout(() => setItemSavedMsg(''), 3500);
    } catch (error) {
      console.error('Erro ao salvar item nutricional:', error);
    }
  };

  const handlePrint = async (section) => {
    const html = buildNutritionalHtml(patientName, profiles, planilhas, adaptedCardapios, receitas, analysis, section, restrictions);
    const full = await buildLetterheadHtml({ title: 'Plano Nutricional Integrativo', bodyHtml: html });
    openPrintWindow(full);
  };

  const activeRestrictionsCount = Object.entries(restrictions)
    .filter(([k, v]) => k !== 'alimentos_livres' && v).length
    + (restrictions.alimentos_livres ? 1 : 0);

  const restrictionGroups = RESTRICTION_OPTIONS.reduce((acc, opt) => {
    if (!acc[opt.group]) acc[opt.group] = [];
    acc[opt.group].push(opt);
    return acc;
  }, {});

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <PrescriptionHeader />
      <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <NatureIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
          <Box>
            <Typography variant="h5" fontWeight={700} color="#1b5e20">
              Plano Nutricional Integrativo
            </Typography>
            {patientName && (
              <Typography variant="subtitle1" color="text.secondary">
                Paciente: <strong>{patientName}</strong>
              </Typography>
            )}
          </Box>
          <Box flex={1} />
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => handlePrint('analise')} color="success" size="small">
              Análise
            </Button>
            <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => handlePrint('planilha')} color="success" size="small">
              Planilha
            </Button>
            <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => handlePrint('cardapio')} color="success" size="small">
              Cardápio
            </Button>
            <Button variant="contained" startIcon={<PrintIcon />} onClick={() => handlePrint('completo')} color="success" size="small">
              Completo
            </Button>
            <Button variant="contained" startIcon={<SaveIcon />} color="info" onClick={handleSaveHistorico} disabled={!anamnese} size="small">
              💾 Histórico
            </Button>
            {savedMsg && <Chip label={savedMsg} color="success" size="small" sx={{ alignSelf: 'center' }} />}
            {itemSavedMsg && <Chip label={itemSavedMsg} color="success" size="small" sx={{ alignSelf: 'center' }} />}
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
          {profiles.map(pid => {
            const p = PLANILHAS_NUTRICIONAIS[pid];
            return p ? (
              <Chip
                key={pid}
                label={p.label}
                clickable
                onClick={() => setSelectedProfile(current => current === pid ? null : pid)}
                sx={{
                  backgroundColor: selectedProfile === pid ? '#1565c0' : p.cor,
                  color: '#fff',
                  fontWeight: 600,
                  outline: selectedProfile === pid ? '2px solid #0d47a1' : 'none',
                }}
              />
            ) : null;
          })}
          {analysis.issues.length > 0 && (
            <Chip
              icon={<SearchIcon sx={{ fontSize: 16 }} />}
              label={`${analysis.issues.length} área(s) identificada(s)`}
              sx={{ backgroundColor: '#1565c0', color: '#fff', fontWeight: 600 }}
            />
          )}
          {activeRestrictionsCount > 0 && (
            <Chip
              label={`⚠️ ${activeRestrictionsCount} restrição(ões) ativas`}
              sx={{ backgroundColor: '#e65100', color: '#fff', fontWeight: 600 }}
            />
          )}
        </Stack>

        {/* PAINEL DE RESTRIÇÕES ALIMENTARES */}
        <Box sx={{ mt: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Switch
              checked={showRestrictions}
              onChange={e => setShowRestrictions(e.target.checked)}
              color="warning"
              size="small"
            />
            <Typography variant="body2" fontWeight={600} color="#e65100" sx={{ cursor: 'pointer' }}
              onClick={() => setShowRestrictions(v => !v)}>
              ⚠️ Restrições e Adaptações Alimentares
              {activeRestrictionsCount > 0 && ` (${activeRestrictionsCount} ativa${activeRestrictionsCount > 1 ? 's' : ''})`}
            </Typography>
          </Stack>

          <Collapse in={showRestrictions}>
            <Paper variant="outlined" sx={{ mt: 1.5, p: 2, backgroundColor: '#fff8e1', borderColor: '#e65100', borderWidth: 2 }}>
              <Typography variant="subtitle2" fontWeight={700} color="#bf360c" gutterBottom>
                Selecione as restrições do paciente — os cardápios serão adaptados automaticamente:
              </Typography>
              {Object.entries(restrictionGroups).map(([group, opts]) => (
                <Box key={group} sx={{ mb: 1.5 }}>
                  <Typography variant="caption" fontWeight={700} color="#5d4037" sx={{ display: 'block', mb: 0.5 }}>
                    {group}
                  </Typography>
                  <FormGroup row>
                    {opts.map(opt => (
                      <FormControlLabel
                        key={opt.key}
                        control={
                          <Checkbox
                            size="small"
                            checked={!!restrictions[opt.key]}
                            onChange={e => setRestrictions(r => ({ ...r, [opt.key]: e.target.checked }))}
                            color="warning"
                          />
                        }
                        label={<Typography variant="body2">{opt.label}</Typography>}
                        sx={{ mr: 2, mb: 0.5 }}
                      />
                    ))}
                  </FormGroup>
                </Box>
              ))}
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="caption" fontWeight={700} color="#5d4037" sx={{ display: 'block', mb: 1 }}>
                Alimentos específicos a excluir (separados por vírgula):
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Ex: amendoim, leite de vaca, carne suína..."
                value={restrictions.alimentos_livres || ''}
                onChange={e => setRestrictions(r => ({ ...r, alimentos_livres: e.target.value }))}
                sx={{ backgroundColor: '#fff' }}
              />
              {activeRestrictionsCount > 0 && (
                <Alert severity="success" sx={{ mt: 1.5, py: 0.5, fontSize: '0.82em' }}>
                  ✅ Cardápios adaptados automaticamente. Veja a aba "Cardápios" e clique em Imprimir Cardápio.
                </Alert>
              )}
            </Paper>
          </Collapse>
        </Box>
      </Paper>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto"
        sx={{ mb: 2, '& .MuiTab-root': { fontWeight: 600 } }}>
        <Tab icon={<SearchIcon />} label="Análise por Queixas" iconPosition="start" />
        <Tab icon={<ScienceIcon />} label="Tabela IDR" iconPosition="start" />
        <Tab icon={<NatureIcon />} label="Alimentos Funcionais" iconPosition="start" />
        <Tab icon={<RestaurantIcon />} label="Planilha Nutricional" iconPosition="start" />
        <Tab icon={<MenuBookIcon />} label="Cardápios" iconPosition="start" />
        <Tab icon={<MenuBookIcon />} label="Receitas" iconPosition="start" />
      </Tabs>

      {/* TAB 0 — ANÁLISE POR QUEIXAS */}
      <TabPanel value={tab} index={0}>
        <Typography variant="h6" fontWeight={700} color="#1565c0" gutterBottom>
          Análise Nutricional por Queixas da Anamnese
        </Typography>

        {!anamnese && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Nenhum paciente selecionado. Acesse via Dashboard → Plano Nutricional de um paciente específico.
          </Alert>
        )}

        {anamnese && !anamnese.anamnesisIntegrativa && (
          <Alert severity="info" sx={{ mb: 2 }}>
            O Diálogo Anamnético Integrativo (17 blocos) ainda não foi preenchido para este paciente. A análise por queixas usará apenas dados da ficha clínica.
          </Alert>
        )}

        {analysis.resumoClinico.length > 0 && (
          <Paper variant="outlined" sx={{ p: 2, mb: 3, backgroundColor: '#e3f2fd', borderColor: '#1565c0' }}>
            <Typography variant="subtitle1" fontWeight={700} color="#1565c0" gutterBottom>
              📋 Resumo Clínico do Paciente
            </Typography>
            <Grid container spacing={2}>
              {analysis.resumoClinico.map((item, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Typography variant="caption" color="text.secondary">{item.label}</Typography>
                  <Typography variant="body2" fontWeight={600}>{item.valor}</Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {analysis.issues.length === 0 && anamnese && (
          <Alert severity="success" icon={<CheckCircleIcon />} sx={{ mb: 3 }}>
            Nenhum problema nutricional específico identificado — perfil preventivo geral. Protocolo mediterrâneo preventivo recomendado.
          </Alert>
        )}

        {analysis.issues.map((issue, idx) => {
          const sev = SEVERITY_CONFIG[issue.severity] || SEVERITY_CONFIG.media;
          return (
            <Card key={idx} variant="outlined" sx={{ mb: 3, borderColor: sev.color, borderWidth: 2 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                  <Typography variant="h6" sx={{ fontSize: '1.4em' }}>{issue.emoji}</Typography>
                  <Typography variant="h6" fontWeight={700} color={sev.color} flex={1}>
                    {issue.sistema}
                  </Typography>
                  <Chip
                    icon={issue.severity === 'alta' ? <WarningIcon /> : <CheckCircleIcon />}
                    label={sev.label}
                    size="small"
                    sx={{ backgroundColor: sev.bg, color: sev.color, fontWeight: 700, border: `1px solid ${sev.color}` }}
                  />
                </Stack>

                <Alert severity={issue.severity === 'alta' ? 'error' : issue.severity === 'media' ? 'warning' : 'success'}
                  sx={{ mb: 2, py: 0.5, fontSize: '0.85em' }}>
                  {issue.descricao}
                </Alert>

                <Grid container spacing={2}>
                  {/* Nutrientes indicados */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" fontWeight={700} color="#4a148c" sx={{ mb: 1 }}>
                      💊 Nutrientes e Suplementos Indicados
                    </Typography>
                    <TableContainer component={Paper} variant="outlined" sx={{ mb: 1 }}>
                      <Table size="small">
                        <TableHead sx={{ backgroundColor: '#f3e5f5' }}>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 700, width: '45%' }}>Nutriente / Suplemento</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Motivo Clínico</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {issue.nutrientesIndicados.map((ni, nii) => (
                            <TableRow key={nii} hover sx={{ '&:nth-of-type(even)': { backgroundColor: '#fafafa' } }}>
                              <TableCell sx={{ fontWeight: 600, fontSize: '0.82em', color: '#4a148c' }}>{ni.n}</TableCell>
                              <TableCell sx={{ fontSize: '0.78em', color: '#555' }}>{ni.motivo}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  {/* Alimentos e estratégia */}
                  <Grid item xs={12} md={6}>
                    <Paper variant="outlined" sx={{ p: 1.5, mb: 1.5, backgroundColor: '#e8f5e9', borderColor: '#2e7d32' }}>
                      <Typography variant="subtitle2" fontWeight={700} color="#2e7d32" sx={{ mb: 0.5 }}>
                        ✅ Alimentos Prioritários
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {issue.alimentosPrioritarios.map((a, ai) => (
                          <Chip key={ai} label={a} size="small"
                            sx={{ fontSize: '0.72em', backgroundColor: '#c8e6c9', color: '#1b5e20' }} />
                        ))}
                      </Box>
                    </Paper>
                    <Paper variant="outlined" sx={{ p: 1.5, mb: 1.5, backgroundColor: '#fff8e1', borderColor: '#e65100' }}>
                      <Typography variant="subtitle2" fontWeight={700} color="#e65100" sx={{ mb: 0.5 }}>
                        🚫 Alimentos a Evitar
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {issue.alimentosEvitar.map((a, ai) => (
                          <Chip key={ai} label={a} size="small"
                            sx={{ fontSize: '0.72em', backgroundColor: '#ffecb3', color: '#bf360c' }} />
                        ))}
                      </Box>
                    </Paper>
                    <Paper variant="outlined" sx={{ p: 1.5, backgroundColor: '#e3f2fd', borderColor: '#1565c0' }}>
                      <Typography variant="subtitle2" fontWeight={700} color="#1565c0" sx={{ mb: 0.5 }}>
                        🎯 Estratégia Dietética
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.83em' }}>{issue.estrategia}</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
        })}

        {analysis.issues.length > 0 && (
          <Paper variant="outlined" sx={{ p: 2, mt: 1, backgroundColor: '#f9fbe7', borderColor: '#827717' }}>
            <Typography variant="subtitle1" fontWeight={700} color="#827717" gutterBottom>
              🌿 Núcleos Nutricionais Transversais (prescrever em todos os perfis)
            </Typography>
            <Grid container spacing={1}>
              {[
                { n: 'Vitamina D (2.000–4.000 UI)', r: 'Base imunológica, hormonal, neurológica e anti-inflamatória' },
                { n: 'Magnésio bisglicinato (300–400 mg)', r: 'Cofator de 300+ enzimas; sono; estresse; energia' },
                { n: 'Ômega-3 EPA/DHA (1–3 g)', r: 'Anti-inflamatório sistêmico; cardiovascular; neurológico' },
                { n: 'Probiótico de amplo espectro', r: 'Microbiota como base da saúde sistêmica' },
                { n: 'Zinco (10–15 mg)', r: 'Imunidade; pele; síntese hormonal; cicatrização' },
              ].map((item, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <Stack direction="row" spacing={1} alignItems="flex-start">
                    <Typography sx={{ color: '#558b2f', fontWeight: 700, minWidth: 14 }}>•</Typography>
                    <Box>
                      <Typography variant="body2" fontWeight={700} color="#1b5e20">{item.n}</Typography>
                      <Typography variant="caption" color="text.secondary">{item.r}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
      </TabPanel>

      {/* TAB 1 — IDR */}
      <TabPanel value={tab} index={1}>
        <Typography variant="h6" fontWeight={700} color="#1565c0" gutterBottom>
          Ingestão Diária de Referência (IDR) — Vitaminas, Minerais e Nutrientes
        </Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          Valores baseados nas DRI (Dietary Reference Intakes) do IOM/USA e ANVISA RDC 269/2005 para adultos saudáveis. Ajustar conforme condição clínica.
        </Alert>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Nutriente</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>IDR</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Limite Superior</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Principais Fontes Naturais</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Função Principal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {NUTRIENTES_IDR.map((n, i) => (
                <TableRow key={i} hover sx={{ '&:nth-of-type(even)': { backgroundColor: '#f9fbe7' } }}>
                  <TableCell sx={{ fontWeight: 600 }}>{n.nutriente}</TableCell>
                  <TableCell>{n.idr}</TableCell>
                  <TableCell sx={{ color: '#b71c1c', fontSize: '0.82em' }}>{n.maximo}</TableCell>
                  <TableCell sx={{ fontSize: '0.82em', color: '#2e7d32' }}>{n.fontes}</TableCell>
                  <TableCell sx={{ fontSize: '0.82em' }}>{n.funcao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* TAB 2 — ALIMENTOS */}
      <TabPanel value={tab} index={2}>
        <Typography variant="h6" fontWeight={700} color="#1b5e20" gutterBottom>
          Banco de Alimentos Funcionais — Frutas, Legumes, Verduras e Sementes
        </Typography>
        {Object.entries(ALIMENTOS_FUNCIONAIS).map(([categoria, alimentos]) => (
          <Box key={categoria} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={700} color="#33691e" sx={{ textTransform: 'capitalize', mb: 1 }}>
              {categoria.replace(/_/g, ' ').toUpperCase()}
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead sx={{ backgroundColor: '#f1f8e9' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Alimento</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Nutrientes em Destaque</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Benefícios</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Porção Diária</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#b71c1c' }}>Contraindicações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {alimentos.map((a, i) => (
                    <TableRow key={i} hover sx={{ '&:nth-of-type(even)': { backgroundColor: '#fafff5' } }}>
                      <TableCell sx={{ fontWeight: 600, color: '#1b5e20' }}>{a.nome}</TableCell>
                      <TableCell sx={{ fontSize: '0.8em' }}>
                        {a.nutrientesDestaque.map((n, ni) => (
                          <Chip key={ni} label={n} size="small" sx={{ m: 0.2, fontSize: '0.7em', backgroundColor: '#e8f5e9' }} />
                        ))}
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.82em' }}>{a.beneficios}</TableCell>
                      <TableCell sx={{ fontSize: '0.82em', color: '#2e7d32', fontWeight: 600 }}>{a.porcao}</TableCell>
                      <TableCell sx={{ fontSize: '0.78em', color: '#b71c1c' }}>{a.contraindicacoes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </TabPanel>

      {/* TAB 3 — PLANILHA NUTRICIONAL */}
      <TabPanel value={tab} index={3}>
        <Typography variant="h6" fontWeight={700} color="#4a148c" gutterBottom>
          Planilha Nutricional Personalizada
        </Typography>
        {planilhas.length === 0 && (
          <Alert severity="info">Nenhum perfil clínico detectado. Mostrando protocolo preventivo geral.</Alert>
        )}
        {(planilhas.length > 0 ? planilhas : [PLANILHAS_NUTRICIONAIS.ATENCAO_GERAL]).map((pl, idx) => (
          <Paper key={idx} variant="outlined" sx={{ p: 2, mb: 3, borderColor: pl.cor, borderWidth: 2 }}>
            <Typography variant="h6" fontWeight={700} sx={{ color: pl.cor, mb: 1 }}>{pl.label}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>{pl.objetivo}</Typography>

            <Typography variant="subtitle2" fontWeight={700} color="#1565c0" sx={{ mb: 1 }}>Nutrientes-Chave e Alimentos Indicados</Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Nutriente</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Dose Terapêutica</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Alimentos Fontes</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Função Clínica</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pl.nutrientesChave.map((nk, ni) => (
                    <TableRow key={ni} hover sx={{ '&:nth-of-type(even)': { backgroundColor: '#f5f5f5' } }}>
                      <TableCell sx={{ fontWeight: 600 }}>{nk.nutriente}</TableCell>
                      <TableCell sx={{ fontSize: '0.82em', color: '#4a148c' }}>{nk.dose}</TableCell>
                      <TableCell sx={{ fontSize: '0.82em', color: '#2e7d32' }}>{nk.alimentos}</TableCell>
                      <TableCell sx={{ fontSize: '0.82em' }}>{nk.funcao}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 1.5, backgroundColor: '#fff8e1' }}>
                  <Typography variant="subtitle2" fontWeight={700} color="#e65100" sx={{ mb: 1 }}>
                    🚫 Alimentos a Evitar
                  </Typography>
                  {pl.alimentosProibidos.map((a, ai) => (
                    <Typography key={ai} variant="body2" sx={{ fontSize: '0.85em', mb: 0.5 }}>• {a}</Typography>
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 1.5, backgroundColor: '#e8f5e9' }}>
                  <Typography variant="subtitle2" fontWeight={700} color="#2e7d32" sx={{ mb: 1 }}>
                    ✅ Alimentos Terapêuticos Prioritários
                  </Typography>
                  {pl.alimentosTerapeuticos.map((a, ai) => (
                    <Typography key={ai} variant="body2" sx={{ fontSize: '0.85em', mb: 0.5 }}>• {a}</Typography>
                  ))}
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </TabPanel>

      {/* TAB 4 — CARDÁPIOS */}
      <TabPanel value={tab} index={4}>
        <Typography variant="h6" fontWeight={700} color="#e65100" gutterBottom>
          Cardápios Semanais Personalizados
        </Typography>
        {activeRestrictionsCount > 0 && (
          <Alert severity="warning" sx={{ mb: 2, fontSize: '0.85em' }}>
            ⚠️ Cardápios adaptados para: {Object.entries(restrictions).filter(([k,v]) => k !== 'alimentos_livres' && v).map(([k]) => RESTRICTION_OPTIONS.find(o => o.key === k)?.label).join(', ')}
            {restrictions.alimentos_livres && ` | Excluídos: ${restrictions.alimentos_livres}`}
          </Alert>
        )}
        {(adaptedCardapios.length > 0 ? adaptedCardapios : [CARDAPIOS.ATENCAO_GERAL]).filter(Boolean).map((cardapio, cidx) => (
          <Box key={cidx} sx={{ mb: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
              <Typography variant="h6" fontWeight={700} sx={{ color: '#1b5e20' }}>{cardapio.label}</Typography>
              <Button size="small" variant="outlined" color="success" startIcon={<SaveIcon />} onClick={() => saveNutritionalItem('cardapios', cardapio)}>
                Salvar cardápio
              </Button>
            </Stack>
            <Alert severity="success" sx={{ mb: 2, fontSize: '0.85em' }}>{cardapio.observacoes}</Alert>
            {cardapio.dias.map((dia, didx) => (
              <Accordion
                key={didx}
                expanded={expandedAccordion === `${cidx}-${didx}`}
                onChange={(_, open) => setExpandedAccordion(open ? `${cidx}-${didx}` : false)}
                sx={{ mb: 1 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#f1f8e9' }}>
                  <Typography fontWeight={700} color="#2e7d32">{dia.dia}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table size="small">
                      <TableBody>
                        {[
                          ['☀️ Café da Manhã', dia.cafe],
                          ['🍎 Lanche da Manhã', dia.lanche1],
                          ['🍽️ Almoço', dia.almoco],
                          ['🌿 Lanche da Tarde', dia.lanche2],
                          ['🌙 Jantar', dia.jantar],
                        ].map(([refeicao, desc], ri) => (
                          <TableRow key={ri} sx={{ '&:nth-of-type(even)': { backgroundColor: '#fafff5' } }}>
                            <TableCell sx={{ fontWeight: 600, width: 160, color: '#1b5e20' }}>{refeicao}</TableCell>
                            <TableCell sx={{ fontSize: '0.9em' }}>{desc}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))}
      </TabPanel>

      {/* TAB 5 — RECEITAS */}
      <TabPanel value={tab} index={5}>
        <Typography variant="h6" fontWeight={700} color="#6a1b9a" gutterBottom>
          Receitas Funcionais Terapêuticas
        </Typography>
        {(receitas.length > 0 ? receitas : RECEITAS_FUNCIONAIS.ATENCAO_GERAL || []).map((receita, ri) => (
          <Card key={ri} variant="outlined" sx={{ mb: 3, borderColor: '#ce93d8', borderWidth: 2 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={700} color="#4a148c">{receita.nome}</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip label={`⏱ ${receita.tempoPreparo}`} color="secondary" size="small" />
                  <Button size="small" variant="outlined" color="secondary" startIcon={<SaveIcon />} onClick={() => saveNutritionalItem('receitas', receita)}>
                    Salvar receita
                  </Button>
                </Stack>
              </Stack>
              <Chip label={receita.melhorMomento} size="small" sx={{ mb: 2, backgroundColor: '#e8f5e9', color: '#2e7d32', fontWeight: 600 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <Typography variant="subtitle2" fontWeight={700} color="#1565c0" gutterBottom>Ingredientes</Typography>
                  {receita.ingredientes.map((ing, ii) => (
                    <Typography key={ii} variant="body2" sx={{ fontSize: '0.85em' }}>• {ing}</Typography>
                  ))}
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography variant="subtitle2" fontWeight={700} color="#2e7d32" gutterBottom>Modo de Preparo</Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.85em', mb: 1 }}>{receita.modo}</Typography>
                  <Paper variant="outlined" sx={{ p: 1, backgroundColor: '#fffde7' }}>
                    <Typography variant="caption" color="#e65100" fontWeight={700}>💊 Benefícios Terapêuticos: </Typography>
                    <Typography variant="caption">{receita.beneficios}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </TabPanel>

      <PrescriptionFooter />

      <SaveToPatientBar
        moduleKey="nutritionalPlan"
        getData={() => anamnese ? { profiles, patientName, restrictions, generatedAt: new Date().toISOString() } : null}
        label="Salvar plano nutricional no interagente"
      />
    </Container>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BUILD HTML PARA IMPRESSÃO
// ─────────────────────────────────────────────────────────────────────────────
function buildNutritionalHtml(patientName, profiles, planilhas, cardapios, receitas, analysis, section = 'completo', restrictions = {}) {
  const date = new Date().toLocaleDateString('pt-BR');
  const thS = 'background:#f5f5f5;padding:5px 8px;text-align:left;border:1px solid #ddd;font-weight:bold;';

  const tdS = 'padding:4px 8px;border:1px solid #ddd;font-size:0.88em;';
  const tblS = 'border-collapse:collapse;width:100%;margin-bottom:12px;';

  const activeRestrLabels = RESTRICTION_OPTIONS
    .filter(o => restrictions[o.key])
    .map(o => o.label);
  if (restrictions.alimentos_livres) activeRestrLabels.push(`Excluídos: ${restrictions.alimentos_livres}`);

  const restrictionsHtml = activeRestrLabels.length > 0 ? `
    <div style="background:#fff8e1;border:2px solid #e65100;border-radius:6px;padding:10px 14px;margin-bottom:12px;font-size:0.88em">
      <b style="color:#bf360c">⚠️ Restrições Alimentares Aplicadas:</b><br/>
      ${activeRestrLabels.join(' &nbsp;·&nbsp; ')}
    </div>
  ` : '';

  const headerHtml = `
    <h2 style="color:#2e7d32;margin-bottom:4px">🌿 Plano Nutricional Integrativo</h2>
    <p style="color:#555;margin:0 0 4px"><b>Paciente:</b> ${patientName || '–'} &nbsp;|&nbsp; <b>Data:</b> ${date}</p>
    ${restrictionsHtml}
    <hr style="margin-bottom:16px"/>
  `;

  // --- ANÁLISE POR QUEIXAS ---
  const sevColor = { alta: '#b71c1c', media: '#e65100', baixa: '#2e7d32' };
  const sevBg = { alta: '#fff3f3', media: '#fff8f0', baixa: '#f0faf0' };
  const analiseHtml = (section === 'analise' || section === 'completo') && analysis && analysis.issues.length > 0 ? `
    <h3 style="color:#1565c0;border-bottom:2px solid #1565c0;padding-bottom:4px;margin-top:20px">🔍 Análise Nutricional por Queixas</h3>
    ${analysis.resumoClinico.length > 0 ? `<div style="background:#e3f2fd;padding:10px 14px;border-radius:4px;margin-bottom:14px;font-size:0.88em">
      ${analysis.resumoClinico.map(r => `<b>${r.label}:</b> ${r.valor} &nbsp;|&nbsp; `).join('')}
    </div>` : ''}
    ${analysis.issues.map(issue => `
      <div style="border:2px solid ${sevColor[issue.severity] || '#e65100'};border-radius:6px;padding:12px 16px;margin-bottom:14px;page-break-inside:avoid;background:${sevBg[issue.severity] || '#fff8f0'}">
        <div style="display:flex;align-items:center;margin-bottom:6px">
          <span style="font-size:1.3em;margin-right:8px">${issue.emoji}</span>
          <b style="font-size:1.05em;color:${sevColor[issue.severity] || '#e65100'}">${issue.sistema}</b>
          <span style="margin-left:auto;font-size:0.78em;background:${sevBg[issue.severity]};color:${sevColor[issue.severity]};padding:2px 8px;border-radius:12px;border:1px solid ${sevColor[issue.severity]}">${issue.severity === 'alta' ? '🔴 Prioridade Alta' : issue.severity === 'media' ? '🟠 Prioridade Média' : '🟡 Atenção'}</span>
        </div>
        <p style="font-size:0.85em;color:#555;margin:0 0 8px;border-left:3px solid ${sevColor[issue.severity]};padding-left:8px">${issue.descricao}</p>
        <table style="${tblS}">
          <tr><th style="${thS}">Nutriente / Suplemento</th><th style="${thS}">Motivo Clínico</th></tr>
          ${issue.nutrientesIndicados.map(ni => `<tr>
            <td style="${tdS}font-weight:600;color:#4a148c">${ni.n}</td>
            <td style="${tdS}color:#555">${ni.motivo}</td>
          </tr>`).join('')}
        </table>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px">
          <div style="background:#e8f5e9;padding:8px 10px;border-radius:4px">
            <b style="color:#2e7d32;font-size:0.85em">✅ Alimentos Prioritários:</b><br/>
            <span style="font-size:0.82em">${issue.alimentosPrioritarios.join(' • ')}</span>
          </div>
          <div style="background:#fff8e1;padding:8px 10px;border-radius:4px">
            <b style="color:#e65100;font-size:0.85em">🚫 Alimentos a Evitar:</b><br/>
            <span style="font-size:0.82em">${issue.alimentosEvitar.join(' • ')}</span>
          </div>
        </div>
        <div style="background:#e3f2fd;padding:8px 10px;border-radius:4px;margin-top:8px;font-size:0.83em">
          <b style="color:#1565c0">🎯 Estratégia:</b> ${issue.estrategia}
        </div>
      </div>
    `).join('')}
  ` : '';

  // --- IDR TABLE ---
  const idrHtml = section === 'completo' ? `
    <h3 style="color:#1565c0;border-bottom:2px solid #1565c0;padding-bottom:4px;margin-top:20px">Ingestão Diária de Referência (IDR)</h3>
    <table style="${tblS}">
      <tr><th style="${thS}">Nutriente</th><th style="${thS}">IDR</th><th style="${thS}">Limite</th><th style="${thS}">Fontes Naturais</th><th style="${thS}">Função</th></tr>
      ${NUTRIENTES_IDR.map(n => `<tr>
        <td style="${tdS}font-weight:bold">${n.nutriente}</td>
        <td style="${tdS}">${n.idr}</td>
        <td style="${tdS}color:#b71c1c">${n.maximo}</td>
        <td style="${tdS}color:#2e7d32">${n.fontes}</td>
        <td style="${tdS}">${n.funcao}</td>
      </tr>`).join('')}
    </table>
  ` : '';

  // --- PLANILHAS ---
  const planilhaHtml = (section === 'planilha' || section === 'completo') ? `
    <h3 style="color:#4a148c;border-bottom:2px solid #4a148c;padding-bottom:4px;margin-top:20px">Planilha Nutricional Personalizada</h3>
    ${(planilhas.length > 0 ? planilhas : [PLANILHAS_NUTRICIONAIS.ATENCAO_GERAL]).map(pl => `
      <div style="border:2px solid ${pl.cor};border-radius:6px;padding:14px 18px;margin-bottom:16px;page-break-inside:avoid">
        <h4 style="color:${pl.cor};margin:0 0 4px">${pl.label}</h4>
        <p style="font-style:italic;color:#555;margin:0 0 8px;font-size:0.88em">${pl.objetivo}</p>
        <table style="${tblS}">
          <tr><th style="${thS}">Nutriente</th><th style="${thS}">Dose Terapêutica</th><th style="${thS}">Alimentos Fontes</th><th style="${thS}">Função Clínica</th></tr>
          ${pl.nutrientesChave.map(nk => `<tr>
            <td style="${tdS}font-weight:bold">${nk.nutriente}</td>
            <td style="${tdS}color:#4a148c">${nk.dose}</td>
            <td style="${tdS}color:#2e7d32">${nk.alimentos}</td>
            <td style="${tdS}">${nk.funcao}</td>
          </tr>`).join('')}
        </table>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px">
          <div style="background:#fff8e1;padding:10px;border-radius:4px;border-left:3px solid #e65100">
            <b style="color:#e65100">🚫 Alimentos a Evitar:</b><br/>
            ${pl.alimentosProibidos.map(a => `• ${a}`).join('<br/>')}
          </div>
          <div style="background:#e8f5e9;padding:10px;border-radius:4px;border-left:3px solid #2e7d32">
            <b style="color:#2e7d32">✅ Alimentos Terapêuticos:</b><br/>
            ${pl.alimentosTerapeuticos.map(a => `• ${a}`).join('<br/>')}
          </div>
        </div>
      </div>
    `).join('')}
  ` : '';

  // --- CARDÁPIOS ---
  const cardapioHtml = (section === 'cardapio' || section === 'completo') ? `
    <h3 style="color:#e65100;border-bottom:2px solid #e65100;padding-bottom:4px;margin-top:20px">Cardápios Semanais Personalizados</h3>
    ${(cardapios.length > 0 ? cardapios : [CARDAPIOS.ATENCAO_GERAL]).filter(Boolean).map(c => `
      <div style="margin-bottom:20px;page-break-inside:avoid">
        <h4 style="color:#1b5e20;margin:0 0 6px">${c.label}</h4>
        <p style="font-size:0.85em;color:#555;margin:0 0 8px;border-left:3px solid #4caf50;padding-left:8px">${c.observacoes}</p>
        <table style="${tblS}">
          <tr><th style="${thS}">Dia</th><th style="${thS}">Café</th><th style="${thS}">Lanche 1</th><th style="${thS}">Almoço</th><th style="${thS}">Lanche 2</th><th style="${thS}">Jantar</th></tr>
          ${c.dias.map(d => `<tr>
            <td style="${tdS}font-weight:bold;color:#2e7d32">${d.dia}</td>
            <td style="${tdS}">${d.cafe}</td>
            <td style="${tdS}">${d.lanche1}</td>
            <td style="${tdS}">${d.almoco}</td>
            <td style="${tdS}">${d.lanche2}</td>
            <td style="${tdS}">${d.jantar}</td>
          </tr>`).join('')}
        </table>
      </div>
    `).join('')}
  ` : '';

  // --- RECEITAS ---
  const receitasHtml = (section === 'completo') ? `
    <h3 style="color:#6a1b9a;border-bottom:2px solid #6a1b9a;padding-bottom:4px;margin-top:20px">Receitas Funcionais Terapêuticas</h3>
    ${(receitas.length > 0 ? receitas : []).map(r => `
      <div style="border:1px solid #ce93d8;border-radius:6px;padding:12px 16px;margin-bottom:12px;page-break-inside:avoid">
        <h4 style="color:#4a148c;margin:0 0 4px">${r.nome} <span style="font-size:0.8em;color:#888">⏱ ${r.tempoPreparo} — ${r.melhorMomento}</span></h4>
        <div style="display:grid;grid-template-columns:1fr 2fr;gap:12px;margin-top:8px">
          <div>
            <b style="color:#1565c0">Ingredientes:</b><br/>
            ${r.ingredientes.map(i => `• ${i}`).join('<br/>')}
          </div>
          <div>
            <b style="color:#2e7d32">Modo de Preparo:</b><br/>
            <span style="font-size:0.9em">${r.modo}</span><br/><br/>
            <div style="background:#fffde7;padding:6px 8px;border-radius:4px;font-size:0.85em">
              <b style="color:#e65100">💊 Benefícios:</b> ${r.beneficios}
            </div>
          </div>
        </div>
      </div>
    `).join('')}
  ` : '';

  const footerHtml = `
    <p style="margin-top:30px;font-size:0.82em;color:#777;border-top:1px solid #ddd;padding-top:8px">
      Wander Pires Silva Coelho — Terapeuta Integrativo Funcional, Naturopatia e Iridologia — CRTH-BR 17821
    </p>
  `;

  return headerHtml + analiseHtml + idrHtml + planilhaHtml + cardapioHtml + receitasHtml + footerHtml;
}
