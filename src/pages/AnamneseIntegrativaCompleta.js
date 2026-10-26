import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Chip, Alert, Divider, Card, CardContent,
  LinearProgress, FormGroup, FormControlLabel, Checkbox, RadioGroup, Radio,
  FormLabel, FormControl, TextField, Grid, Table, TableBody, TableRow,
  TableCell, TableHead, TableContainer, Accordion, AccordionSummary,
  AccordionDetails, Slider, IconButton, Tooltip, Tabs, Tab,
  Select, MenuItem, InputAdornment, InputLabel, Snackbar,
} from '@mui/material';
import {
  NavigateNext as NextIcon, NavigateBefore as BackIcon,
  Print as PrintIcon, ExpandMore as ExpandMoreIcon,
  Warning as WarningIcon, CheckCircle as OkIcon,
  LocalPharmacy as PharmacyIcon, Spa as SpaIcon,
  Psychology as PsychologyIcon, Science as ScienceIcon,
  LocalFlorist as FloristIcon, Favorite as HeartIcon,
  Assignment as AssignmentIcon, RestartAlt as RestartIcon,
  Save as SaveIcon, PersonAdd as PersonAddIcon,
  Dashboard as DashboardIcon, Download as DownloadIcon,
} from '@mui/icons-material';
import SaveToPatientBar from '../components/SaveToPatientBar';
import TherapeuticBoard from '../components/TherapeuticBoard';
import CompleteTreatmentBoard from '../components/CompleteTreatmentBoard';
import BoarimProtocol from '../components/BoarimProtocol';
import PrescriptionHeader from '../components/PrescriptionHeader';
import PrescriptionFooter from '../components/PrescriptionFooter';
import { buildLetterheadHtml, openPrintWindow, downloadPdfFromHtml } from '../components/PrintTemplate';
import { generateTherapeuticReport } from '../config/therapeuticDatabase';
import { getBoarimProtocolsBySymptoms } from '../config/boarimProtocols';
import { evaluateProtocolSafety } from '../lib/clinicalSafety';
import { getNutritionalPlanForProfiles, PLANILHAS_NUTRICIONAIS, CARDAPIOS, RECEITAS_FUNCIONAIS } from '../data/nutritionalDatabase';
import {
  EXAMES_GRUPOS, HIPOTESES_CATEGORIAS,
  ATIVIDADE_TIPO as LC_ATIVIDADE_TIPO, ATIVIDADE_FREQUENCIA, ATIVIDADE_DURACAO, ATIVIDADE_INTENSIDADE, ATIVIDADE_SINAIS,
} from '../data/lucianaCaxitoData';

// ─────────────────────────────────────────────
// ANÁLISE AUTOMÁTICA DE HIPÓTESES DIAGNÓSTICAS
// ─────────────────────────────────────────────
function analyzeHipoteses(d) {
  const N = new Set(); // nutricional
  const M = new Set(); // metabolica
  const H = new Set(); // hormonal_diag
  const I = new Set(); // inflamacao
  const T = new Set(); // intoxicacao
  const ME = new Set(); // mental

  const peso = parseFloat(d.peso) || 0;
  const altura = parseFloat(d.altura) || 0;
  const imc = peso > 0 && altura > 0 ? peso / (altura * altura) : null;
  const paSis = Number(d.paSis) || 0;
  const paDia = Number(d.paDia) || 0;
  const ansiedadeN = Number(d.ansiedade) || 0;
  const estresseN = Number(d.estresse) || 0;

  // ── NUTRICIONAL ──────────────────────────────────
  if (d.vitdBaixaImun || d.vitdDorOssea || d.vitdFraqueza || d.vitdTristeza ||
      d.vitdInfeccoes || d.vitdPoucoSol || d.vitdOsteopenia || d.solPouco || d.exVitD)
    N.add('Deficiência de vitamina D');

  if (d.vitbFormigamento || d.vitbCansaco || d.vitbIrritab || d.vitbBocaRachada ||
      d.vitbMaMemoria || d.vitbQuedaCabelo || d.vitbLinguaArdida || d.snFormigamento || d.exB12)
    N.add('Deficiência de vitamina B12');

  if (d.vitbCansaco && (d.vitbMaMemoria || d.snFormigamento))
    N.add('Anemia megaloblástica (B12/folato)');

  if (d.ferroCansaco || d.ferroPalidez || d.ferroFaltaAr || d.ferroQuedaCabelo ||
      d.ferroTontura || d.ferroUnhasFracas || d.ferroMenstruacao || d.hfFluxoIntenso || d.exFerritina)
    N.add('Deficiência de ferro / anemia ferropriva');

  if (d.magCaimbras || d.magAnsiedade || d.magInsonia || d.magIrritab ||
      d.magPalpitacoes || d.magConstipacao || d.magDores || d.sosCaimbras)
    N.add('Deficiência de magnésio');

  if (d.zincoBaixaImun || d.zincoQuedaCabelo || d.zincoUnhasFracas || d.zincoAcne ||
      d.zincoCicatrizacao || d.zincoPaladar || d.zincoBaixaLibido)
    N.add('Deficiência de zinco');

  if (d.vitdBaixaImun && d.simInfeccoesFreq && !d.hpHipotireoidismo)
    N.add('Deficiência de selênio');

  if (d.seFrioSens && d.seGanhoPeso && !d.hpHipotireoidismo && !d.hpHipertireoidismo)
    N.add('Deficiência de iodo');

  if (d.om3Inflamacao || d.om3DorArticular || d.om3PeleSeca ||
      d.om3HumorDep || d.om3DifCognitiva || d.om3TgAltos)
    N.add('Deficiência de ômega-3');

  if (d.pcuPeleSeca && d.simInfeccoesFreq && d.pcuFeridasDemoram)
    N.add('Deficiência de vitamina A');

  if (d.simInfeccoesFreq && d.pcuFeridasDemoram && d.simHerpes)
    N.add('Deficiência de vitamina C');

  if (d.pcuFeridasDemoram && d.om3PeleSeca)
    N.add('Deficiência de vitamina E');

  if (d.vitbBocaRachada || d.vitbLinguaArdida || (d.vitbFormigamento && d.vitbCansaco))
    N.add('Deficiência de vitaminas do complexo B');

  if (d.consPoucaProteina || (imc && imc < 18.5))
    N.add('Desnutrição proteica (albumina baixa)');

  if (d.toxMercurio || d.toxChumbo)
    N.add('Intoxicação por metais pesados');

  if ((d.toxMercurio || d.toxChumbo) && d.zincoUnhasFracas)
    N.add('Excesso de cobre (estopilismo de cobre)');

  // ── METABÓLICA ──────────────────────────────────
  if (d.seResistencia || (d.seGanhoPeso && d.seVontadeDoces) ||
      (d.seSonolencia && d.seVontadeDoces) || (d.consAcucar && d.seGanhoPeso) || d.hfDiabetes)
    M.add('Resistência à insulina');

  if (d.hpDiab2 || d.seDiabetes)
    M.add('Diabetes tipo 2');

  if (!d.hpDiab2 && !d.seDiabetes && (d.seTremoresJejum || (d.seSede && d.seVontadeDoces) || d.hfDiabetes))
    M.add('Pré-diabetes');

  if (d.hpHipoglicemia || d.seTremoresJejum)
    M.add('Hipoglicemia reativa');

  if (d.seSindMetabolica || (d.seGanhoPeso && (paSis >= 130 || paDia >= 85) && imc && imc >= 25))
    M.add('Síndrome metabólica');

  if (d.exColesterol || d.exLDL || d.exTg || d.om3TgAltos || d.scColesterol)
    M.add('Dislipidemia aterogênica (LDL alto, HDL baixo, TG alto)');

  if (imc && imc >= 30) M.add('Obesidade (IMC > 30)');
  if (imc && imc >= 25 && imc < 30) M.add('Sobrepeso (IMC 25–30)');

  if (d.hpHipertensao || paSis >= 140 || paDia >= 90 || d.scPaAlta)
    M.add('Hipertensão arterial');

  if ((paSis > 0 && paSis < 90) || d.scPaBaixa)
    M.add('Hipotensão arterial');

  if ((d.sdGases && d.sdDistensao) || (d.sdGases && d.sdConstipacao && d.sdMaDigestao))
    M.add('SIBO (supercrescimento bacteriano)');

  if (d.sdGases || d.sdDistensao || d.sdAlternado || d.sdCandidiase || d.sdMuco)
    M.add('Disbiose intestinal');

  if (d.sdCandidiase || d.simCandidiase)
    M.add('Candidíase sistêmica (suspeita)');

  if ((d.intolGluten || d.intolLactose) && (d.sdDistensao || d.sdGases))
    M.add('Hiperpermeabilidade intestinal (Leaky Gut)');

  if (d.sdConstipacao || d.sdFI2dias || d.sdFIMenos3)
    M.add('Constipação crônica funcional');

  // ── HORMONAL ──────────────────────────────────
  if (d.hpHipotireoidismo || (d.seFrioSens && d.seGanhoPeso && d.seQuedaCabelo && d.seCansaco))
    H.add('Hipotireoidismo clínico');

  if (!d.hpHipotireoidismo && d.seFrioSens && d.seCansaco && d.seGanhoPeso)
    H.add('Hipotireoidismo subclínico');

  if (d.hpHipertireoidismo || (d.seCalorSens && d.seSudorese && d.scPalpitacoes))
    H.add('Hipertireoidismo');

  if (d.hfAutoimune || (d.hpHipotireoidismo && d.hfTireoide))
    H.add('Tireoidite de Hashimoto');

  if (d.hmBaixaLibido || d.hmDisfuncao || d.hmCansaco || d.hmPerdaMassa || d.hmBaixaTestost)
    H.add('Deficiência de testosterona');

  if (d.hfMenstrIrreg || (d.hfFluxoIntenso && d.hfDorMamas))
    H.add('Domínio estrogênico');

  if (d.hfTPM || (d.hfMenstrIrreg && d.hfColica))
    H.add('Deficiência de progesterona');

  if (d.hpSop || d.hfSop) H.add('SOP');
  if (d.hpEndometriose || d.hfEndometriose) H.add('Endometriose');

  if (d.hfMenopausa || d.hfFogachos || (d.hmGanhoBrriga && d.hmQuedaPelos && d.hmBaixaLibido))
    H.add('Menopausa / andropausa');

  if (d.emocBurnout || (estresseN >= 3 && d.seCansaco && d.sonoAcordaCansado))
    H.add('Fadiga adrenal (fase 1–2)');

  if (d.emocExaustao && d.emocBurnout && d.seCansaco)
    H.add('Insuficiência adrenal (fase 3)');

  if ((d.hfBaixaLibido || d.hmBaixaLibido) && d.seCansaco)
    H.add('Deficiência de DHEA');

  if (d.hfMenstrIrreg && d.hfDorMamas && d.hfFluxoIntenso)
    H.add('Hiperprolactinemia');

  // ── INFLAMAÇÃO ──────────────────────────────────
  if (d.exPCR || d.om3Inflamacao || (d.sosDorArticular && d.seCansaco && d.simInfeccoesFreq))
    I.add('Inflamação sistêmica crônica de baixo grau');

  if ((d.intolGluten || d.intolLactose) && (d.sdDistensao || d.sdMuco))
    I.add('Síndrome de hiperpermeabilidade intestinal');

  if (d.hpArtrite || (d.sosRigidez && d.sosDorArticular))
    I.add('Artrite reumatoide');

  if (d.hpLupus) I.add('Lúpus eritematoso sistêmico');

  if (d.hfAutoimune && d.hpHipotireoidismo) I.add('Tireoidite de Hashimoto');

  if (d.intolGluten && (d.sdDiarreia || d.sdDistensao) && d.snFormigamento)
    I.add('Doença celíaca');

  if (d.sdSangue && d.sdMuco && d.sdDiarreia) I.add('Doença de Crohn');
  if (d.sdSangue && d.sdDiarreia && !d.sdMuco) I.add('Retocolite ulcerativa');
  if (d.hpPsoriase || d.pcuPsoriase) I.add('Psoríase');

  if (d.hpFibromialgia || (d.dorGeneralizada && d.sosDorMuscular && d.sonoAcordaCansado))
    I.add('Fibromialgia');

  if (d.seCansaco && d.sonoAcordaCansado && d.emocExaustao && d.simInfeccoesFreq)
    I.add('Síndrome de fadiga crônica');

  if (d.intolGluten && d.sdDistensao && !d.hpFibromialgia)
    I.add('Sensibilidade ao glúten não celíaca');

  if (d.alerAlimentos && (d.sdMaDigestao || d.pcuCoceira || d.snDorCabeca))
    I.add('Intolerância à histamina');

  if (d.simAlergias && d.alerAlimentos && d.sdMaDigestao && d.pcuCoceira)
    I.add('Síndrome de ativação de mastócitos');

  // ── INTOXICAÇÃO ──────────────────────────────────
  if (d.shNauseasGord || d.shGostoAmargo || d.shDorDireita || d.shIctericia || d.hpEsteatose)
    T.add('Sobrecarga hepática / fase 2 comprometida');

  if (d.toxMercurio) T.add('Intoxicação por mercúrio');
  if (d.toxChumbo) T.add('Intoxicação por chumbo');
  if (d.toxAgrotoxicos) T.add('Sobrecarga de agrotóxicos');
  if (d.toxSolventes || d.toxTintas) T.add('Exposição a solventes orgânicos');
  if (d.toxPlasticos) T.add('Toxicidade por plásticos (BPA, ftalatos)');

  if (d.toxMercurio || d.toxChumbo || d.toxAgrotoxicos || d.emocBurnout || d.shGordura)
    T.add('Estresse oxidativo elevado');

  if (d.hpEsteatose || d.shGordura || d.toxMercurio || d.emocExaustao)
    T.add('Deficiência de glutationa');

  if (d.vitbMaMemoria && d.vitbFormigamento && (d.hpDepressao || d.hpAnsiedade))
    T.add('Polimorfismo MTHFR (homozigoto)');

  if (d.vitbFormigamento && (d.hpDepressao || d.emocDesanimo))
    T.add('Disfunção de metilação');

  // ── MENTAL / NEUROLÓGICO ──────────────────────────────────
  if (d.hpAnsiedade || d.emocPensAcel || d.emocMedo || d.emocPreocupacaoExcess || ansiedadeN >= 3)
    ME.add('Ansiedade generalizada');

  if (d.hpPanico || d.emocPanico) ME.add('Transtorno de pânico');

  if (d.hpDepressao || (d.emocDesanimo && d.emocPerda && d.emocIsolamento) || d.humorPredom === 'Deprimido')
    ME.add('Depressão maior');

  if (!d.hpDepressao && d.emocDesanimo && d.emocExaustao && d.emocBurnout)
    ME.add('Distimia (depressão crônica leve)');

  if (d.humorPredom === 'Instável' && d.emocCrises) ME.add('Transtorno bipolar');

  if (d.snConcentracao && d.emocIrritab && !d.hpDepressao) ME.add('TDAH');

  if (d.emocBurnout) ME.add('Burnout / esgotamento');

  if (d.traumaFisica || d.traumaPsico || d.traumaSexual || d.traumaBullying || d.traumaAbandono)
    ME.add('Trauma psicológico não resolvido (TEPT)');

  if (d.traumaLuto && d.emocLuto) ME.add('Luto complicado');

  if (d.snConcentracao || (d.snMaMemoria && d.seCansaco))
    ME.add('Névoa cerebral (brain fog)');

  if ((d.snMaMemoria || d.snConcentracao) && d.exPCR)
    ME.add('Neurinflamação crônica');

  if ((d.hpDepressao || d.hpAnsiedade) && (d.emocDesanimo || d.emocPensAcel))
    ME.add('Déficit de neurotransmissores (dopamina/serotonina)');

  if ((d.sonoDemora && d.sonoAcordaNoite) || d.sonoRemedio)
    ME.add('Insônia crônica');

  if (d.seCansaco && d.sonoAcordaCansado && d.simInfeccoesFreq)
    ME.add('Síndrome de fadiga crônica (SFC/ME)');

  return { nutricional: N, metabolica: M, hormonal_diag: H, inflamacao: I, intoxicacao: T, mental: ME };
}

// ─────────────────────────────────────────────
// ESTADO INICIAL
// ─────────────────────────────────────────────
const INIT = {
  // 1. Identificação
  nome:'', dataNasc:'', idade:'', sexo:'', telefone:'', profissao:'', cidade:'', estadoCivil:'',
  peso:'', altura:'', cintura:'', quadril:'',
  // Extra (Luciana Caxito)
  genero:'', escolaridade:'', renda:'', emailPaciente:'', indicacao:'', religiaoEsp:'',
  // 2. Queixa Principal
  queixaPrincipal:'', queixaOutro:'', melhoraOutro:'', pioraOutro:'',
  tempoDias:false, tempoSemanas:false, tempoMeses:false, tempoAnos:false,
  problemaMelhorando:false, problemaIgual:false, problemaPiorando:false, problemaVaiVolta:false,
  pioraEstresse:false, pioraAlim:false, pioraFrio:false, pioraCalor:false,
  pioraEsforco:false, pioraSono:false, pioraEmocoes:false, pioraOther:false,
  melhoraRepouso:false, melhoraAlim:false, melhoraMovimento:false,
  melhoraCalor:false, melhoraFrio:false, melhoraMed:false, melhoraOracaoMedit:false, melhoraOther:false,
  // 3. Sinais Vitais
  paSis:'', paDia:'', fc:'', sao2:'', temp:'', glicemia:'',
  alertaDorPeito:false, alertaFaltaAr:false, alertaConfusao:false, alertaDesmaio:false,
  // 4. Saúde Geral
  energia:'3', disposicao:'', dorAtual:'0',
  dorCabeca:false, dorPescoco:false, dorOmbros:false, dorCostas:false, dorLombar:false,
  dorQuadris:false, dorJoelhos:false, dorArticulacoes:false, dorMusculos:false,
  dorAbdome:false, dorGeneralizada:false, semDor:false,
  // 5. Histórico Familiar
  hfHipertensao:false, hfDiabetes:false, hfInfarto:false, hfAvc:false,
  hfCancer:false, hfAlzheimer:false, hfParkinson:false, hfDepressao:false,
  hfAnsiedade:false, hfOsteoporose:false, hfArtrite:false, hfObesidade:false,
  hfTireoide:false, hfAutoimune:false, hfAlergias:false, hfRenal:false, hfHepatica:false,
  paisAmbos:false, paisSoPai:false, paisSoMae:false, paisNenhum:false,
  // 6. Histórico Pessoal
  hpHipertensao:false, hpDiab1:false, hpDiab2:false, hpHipoglicemia:false,
  hpHipotireoidismo:false, hpHipertireoidismo:false, hpAsma:false, hpBronquite:false,
  hpRinite:false, hpGastrite:false, hpEsteatose:false, hpCalculoRenal:false,
  hpInfeccaoUrinaria:false, hpFibromialgia:false, hpArtrite:false, hpLupus:false,
  hpPsoriase:false, hpEndometriose:false, hpSop:false,
  hpAnsiedade:false, hpDepressao:false, hpPanico:false, hpNenhuma:false,
  // 7. Cirurgias e Internações
  cirApendice:false, cirVesicula:false, cirHernia:false, cirCesarea:false,
  cirGineco:false, cirUrolo:false, cirCardiaca:false, cirOrtopedica:false,
  cirCatarata:false, cirAmigdalas:false, cirBariatrica:false, cirOutra:false, cirNunca:false,
  internadoSim:false, internadoNao:false, motivoInternacao:'',
  // 8. Medicamentos
  medAntiHipert:false, medAntidiabet:false, medInsulina:false, medEstatina:false,
  medAnticoag:false, medAntidepress:false, medAnsiolitico:false, medCorticoide:false,
  medAntiInflam:false, medHormTireoide:false, medAnticoncepc:false, medReposHorm:false,
  medAntiAcido:false, medAnalgesico:false, medSuplementos:false, medFitoterapicos:false, medNao:false,
  medDetalhe:'',
  // 9. Alergias e Intolerâncias
  alerMedicamentos:false, alerAlimentos:false, alerPoeira:false, alerGramineas:false,
  alerAnimais:false, alerLatex:false, alerInsetos:false, alerCosmeticos:false, alerNao:false,
  intolLactose:false, intolGluten:false, intolOvo:false, intolSoja:false,
  intolCafe:false, intolCorantes:false, intolConservantes:false, intolNenhuma:false,
  // 9b. Restrições Dietéticas e Preferências Alimentares
  dietVegetariano:false, dietVegano:false, dietOvolactovegetariano:false,
  dietSemGluten:false, dietSemLactose:false, dietSemOvo:false, dietSemSoja:false,
  dietSemCarne:false, dietSemFrutosMar:false, dietSemCastanhas:false, dietSemAmendoim:false,
  dietSemGluten2:false, dietKetogenica:false, dietLowCarb:false, dietMediterranea:false,
  dietAIP:false, dietFODMAP:false, dietIntermittentFasting:false, dietSemAcucar:false,
  dietHalal:false, dietKosher:false, dietOutra:false,
  dietOutraDesc:'', dietObsAlimentar:'',
  // 10. Digestório
  sdAzia:false, sdRefluxo:false, sdMaDigestao:false, sdNauseas:false, sdGases:false,
  sdDistensao:false, sdDorAbdom:false, sdConstipacao:false, sdDiarreia:false,
  sdAlternado:false, sdFezesClars:false, sdFezesEscuras:false, sdMuco:false,
  sdSangue:false, sdMauHalito:false, sdBocaAmarga:false, sdCandidiase:false,
  sdFI1x:false, sdFIMais1x:false, sdFI2dias:false, sdFIMenos3:false, sdFIAlterna:false,
  // 11. Hepático
  shNauseasGord:false, shFrituras:false, shGostoAmargo:false, shDorDireita:false,
  shIctericia:false, shUrinaEscura:false, shCoceira:false, shMauHalito:false,
  shCansacoApos:false, shGordura:false,
  // 12. Urinário
  suUrinaEscura:false, suEspuma:false, suArdor:false, suDorLombar:false,
  suInchacoPosto:false, suInchacoMembros:false, suCalculo:false, suInfeccao:false,
  suAcordaNoite:false, suUrinaMuito:false, suUrinaPouco:false,
  // 13. Cardiovascular
  scPaAlta:false, scPaBaixa:false, scPalpitacoes:false, scArritmias:false,
  scDorPeito:false, scFaltaArEsforco:false, scCansacoFacil:false, scInchacoMembros:false,
  scVarizes:false, scMaosFrios:false, scTontura:false, scColesterol:false,
  // 14. Respiratório
  srFaltaAr:false, srTosseSeca:false, srTosseSecrecao:false, srChiado:false,
  srAsma:false, srBronquite:false, srRinite:false, srSinusite:false,
  srRonco:false, srApneia:false, srInfeccoesFreq:false,
  // 15. Neurológico
  snDorCabeca:false, snEnxaqueca:false, snTontura:false, snVertigem:false,
  snFormigamento:false, snDormencia:false, snTremores:false, snConvulsoes:false,
  snMaMemoria:false, snConfusao:false, snConcentracao:false,
  snZumbido:false, snVisaoTurva:false, snFraquezaMus:false,
  // 16. Osteomuscular
  sosDorMuscular:false, sosDorArticular:false, sosDorLombar:false, sosDorCervical:false,
  sosCaimbras:false, sosPernasInq:false, sosFraquezaMus:false, sosTendinite:false,
  sosFraturas:false, sosOsteopenia:false, sosOsteoporose:false, sosRigidez:false, sosPerda:false,
  // 17. Pele/Cabelo/Unhas
  pcuPeleSeca:false, pcuPeleOleosa:false, pcuAcne:false, pcuDermatite:false,
  pcuPsoriase:false, pcuRosacea:false, pcuManchasEscuras:false, pcuManchasBrancas:false,
  pcuFeridasDemoram:false, pcuCoceira:false, pcuQuedaCabelo:false, pcuCaspa:false,
  pcuUnhasFracas:false, pcuRachadurasLabios:false, pcuRachadurasCantos:false,
  // 18. Imunológico
  simInfeccoesFreq:false, simHerpes:false, simCandidiase:false, simGripe:false,
  simSinusite:false, simInfeccaoUrinaria:false, simAlergias:false, simFeridasDemoram:false,
  simFebreRecorrente:false, simLinfonodos:false,
  // 19. Endócrino/Metabólico
  seGanhoPeso:false, seDificEmagrecer:false, seFome:false, seVontadeDoces:false,
  seSonolencia:false, seTremoresJejum:false, seSede:false, seUrinaExcessiva:false,
  seFrioSens:false, seCalorSens:false, seSudorese:false, seQuedaCabelo:false,
  seCansaco:false, seSindMetabolica:false, seDiabetes:false, seResistencia:false,
  // 20. Hormonal Feminino
  hfMenstrIrreg:false, hfFluxoIntenso:false, hfColica:false, hfTPM:false,
  hfDorMamas:false, hfEndometriose:false, hfSop:false, hfInfertilidade:false,
  hfMenopausa:false, hfFogachos:false, hfRessecamento:false, hfBaixaLibido:false,
  hfAnticoncepc:false, hfReposHorm:false,
  // 21. Hormonal Masculino
  hmBaixaLibido:false, hmDisfuncao:false, hmEjaculacao:false, hmCansaco:false,
  hmPerdaMassa:false, hmGanhoBrriga:false, hmQuedaPelos:false, hmIrritab:false,
  hmSonoRuim:false, hmBaixaTestost:false, hmInfertilidade:false,
  // 22. Sono
  sono5h:false, sono5a6h:false, sono7a8h:false, sonoMais8h:false, qualSono:'3',
  sonoDemora:false, sonoAcordaNoite:false, sonoAcordaCedo:false, sonoPesadelos:false,
  sonoLeve:false, sonoRonco:false, sonoApneia:false, sonoSonolencia:false,
  sonoAcordaCansado:false, sonoRemedio:false,
  // Sono extra (Luciana Caxito)
  horaDormir:'', horaAcordar:'', horasSono:'', qualidadeSono:'',
  // 23. Alimentação
  refeicoesQuant:'', avalAlim:'',
  agua1L:false, agua1a2L:false, agua2a3L:false, aguaMais3L:false,
  consAcucar:false, consRefrigerante:false, consFrituras:false, consFastFood:false,
  consEmbutidos:false, consIndustrializados:false, consCafe:false, consAlcool:false,
  consPoucasVerduras:false, consPoucasFrutas:false, consPoucaProteina:false,
  restVegetariano:false, restVegano:false, restSemGluten:false, restSemLactose:false,
  restLowCarb:false, restCetogenica:false, restJejum:false, restSemRestricao:false,
  // 24. Hábitos
  tabacoNunca:false, tabacoEx:false, tabacoOcasional:false, tabacoDiario:false,
  alcoolNao:false, alcoolOcasional:false, alcoolFds:false, alcoolRegular:false,
  atividadeSedentario:false, atividadeLeve:false, atividadeMedia:false, atividadeIntensa:false,
  // Atividade Física extras (Luciana Caxito)
  atividadeFreqLC:'', atividadeDurLC:'', atividadeIntLC:'',
  atividadeTipoLC:{}, atividadeSinaisLC:{},
  solPouco:false, sol15a30:false, solFrequente:false, solExcessivo:false,
  // 25. Emocional
  estresse:'2', ansiedade:'1', humorPredom:'Normal',
  emocCrises:false, emocPanico:false, emocChoro:false, emocIrritab:false,
  emocMedo:false, emocPensAcel:false, emocDesanimo:false, emocPerda:false,
  emocIsolamento:false, emocCulpa:false, emocRaiva:false, emocLuto:false,
  emocAutoestima:false, emocExaustao:false, emocBurnout:false,
  emocSensacaoVazio:false, emocTensaoMuscular:false, emocPreocupacaoExcess:false,
  // Diagnóstico emocional avançado (do Questionário Anamnético)
  sobrecarrega:'', reacaoEstresse:'', alertaConstante:'',
  motivacaoScale:'5', difConcentracao:'', menteCofusa:'',
  apoioEmocional:'', alguemConversar:'',
  copingComida:false, copingAlcool:false, copingMedicamentos:false, copingRedesSociais:false,
  copingIsolamento:false, copingExercicio:false, copingNenhum:false, copingOutros:false,
  desaparecerSentimento:'',
  diagnosticoPsi:'', diagnosticoPsiDesc:'',
  qualidadeEmocional:'5',
  // 26. Segurança Emocional
  segNunca:false, segPassado:false, segAsVezes:false, segFrequente:false, segEmRisco:false,
  machNao:false, machPassado:false, machAtualmente:false,
  tentNao:false, tentSim:false,
  // 27. Trauma
  traumaFisica:false, traumaPsico:false, traumaSexual:false, traumaBullying:false,
  traumaAbandono:false, traumaLuto:false, traumaSeparacao:false, traumaAcidente:false,
  traumaFinanceiro:false, traumaAmbiente:false, traumaNenhum:false, traumaInterfere:'',
  // 28. Exposição Tóxica
  toxAgrotoxicos:false, toxTintas:false, toxSolventes:false, toxMofo:false,
  toxFumaca:false, toxMercurio:false, toxChumbo:false, toxLimpeza:false,
  toxCosmeticos:false, toxAguaSemFiltr:false, toxPlasticos:false, toxNenhum:false,
  // 29. Carências Nutricionais
  magCaimbras:false, magAnsiedade:false, magInsonia:false, magIrritab:false,
  magPalpitacoes:false, magConstipacao:false, magDores:false,
  vitdBaixaImun:false, vitdDorOssea:false, vitdFraqueza:false, vitdTristeza:false,
  vitdInfeccoes:false, vitdPoucoSol:false, vitdOsteopenia:false,
  vitbFormigamento:false, vitbCansaco:false, vitbIrritab:false, vitbBocaRachada:false,
  vitbMaMemoria:false, vitbQuedaCabelo:false, vitbLinguaArdida:false,
  ferroCansaco:false, ferroPalidez:false, ferroFaltaAr:false, ferroQuedaCabelo:false,
  ferroTontura:false, ferroUnhasFracas:false, ferroMenstruacao:false,
  zincoBaixaImun:false, zincoQuedaCabelo:false, zincoUnhasFracas:false, zincoAcne:false,
  zincoCicatrizacao:false, zincoPaladar:false, zincoBaixaLibido:false,
  om3Inflamacao:false, om3DorArticular:false, om3PeleSeca:false, om3HumorDep:false,
  om3DifCognitiva:false, om3TgAltos:false,
  // 30. Exames Recentes
  exHemograma:false, exGlicemia:false, exHbA1c:false, exInsulina:false,
  exColesterol:false, exHDL:false, exLDL:false, exTg:false,
  exTGOTGP:false, exGamaGT:false, exCreatinina:false, exUreia:false,
  exTSH:false, exT3T4:false, exVitD:false, exB12:false,
  exFerritina:false, exPCR:false, exUrina:false, exParasitol:false, exNenhum:false,
  // 31. Observações Finais
  obsPaciente:'', obsTerapeuta:'', condutaInicial:'',
  retorno7d:false, retorno15d:false, retorno30d:false, retorno60d:false,
  // 32. Bioimpedância (OkOK / Tanita / InBody / Omron)
  bioDataMedicao:'',
  bioPesoMed:'',
  bioGorduraPerc:'', bioGorduraKg:'',
  bioGorduraVisceral:'',
  bioMassaMuscular:'',
  bioMassaOssea:'',
  bioAguaPerc:'',
  bioProteinaPerc:'',
  bioMetabolismoBasal:'',
  bioIdadeMetabolica:'',
  bioMuscEsqueletico:'',
  bioGorduraSubcut:'',
  bioMassaMagra:'',
  bioPontuacaoCorp:'',
  // Segmental (InBody / escalas avançadas)
  bioSegMuscBrD:'', bioSegMuscBrE:'', bioSegMuscTronco:'', bioSegMuscPnD:'', bioSegMuscPnE:'',
  bioSegGordBrD:'', bioSegGordBrE:'', bioSegGordTronco:'', bioSegGordPnD:'', bioSegGordPnE:'',
  // Evolução / Comparação com medição anterior
  bioDataAnterior:'',
  bioGorduraPercAnt:'', bioMassaMuscularAnt:'', bioGorduraVisceralAnt:'',
  bioAguaPercAnt:'', bioMetabolismoBasalAnt:'',
  bioObsBio:'',
  // 33. Bem-estar subjetivo (Luciana Caxito)
  bemEstarGeral:'5', bemEstarEmocional:'5', bemEstarSocial:'5', bemEstarProposito:'5',
  // 34. Hipóteses Diagnósticas (por categoria)
  hipoteseNutricional:{}, hipoteseMetabolica:{}, hipoteseHormonal:{},
  hipoteseInflamacao:{}, hipoteseIntoxicacao:{}, hipoteseMental:{},
  planoTerapeutico:'',
  // 35. Receituário manual
  rxSuplementacao:'', rxFitoterapicos:'', rxNutricional:'',
  rxEstiloVida:'', rxEncaminhamentos:'', rxRetorno:'',
  // 36. Exames complementares detalhados (valores medidos)
  exameValores:{},
};

// ─────────────────────────────────────────────
// EXTRAÇÃO DE SINTOMAS PARA BASES TERAPÊUTICAS
// ─────────────────────────────────────────────
function buildSymptomsFromData(d) {
  const symptoms = new Set();

  // ── Digestório ──────────────────────────────────────────────────────────────
  if (d.sdConstipacao || d.sdFI2dias || d.sdFIMenos3) {
    symptoms.add('intestino_preso'); symptoms.add('intestino preso'); symptoms.add('constipação');
  }
  if (d.sdDiarreia || d.sdAlternado) { symptoms.add('diarreia'); }
  if (d.sdGases || d.sdDistensao) { symptoms.add('gases'); }
  if (d.sdAzia || d.sdRefluxo || d.hpGastrite || d.sdMaDigestao) {
    symptoms.add('azia'); symptoms.add('gastrite'); symptoms.add('gastrite');
  }
  if (d.sdCandidiase) { symptoms.add('candidiase'); }

  // ── Hepático ─────────────────────────────────────────────────────────────────
  if (d.shNauseasGord || d.shFrituras || d.shGostoAmargo || d.shCansacoApos || d.shGordura || d.hpEsteatose) {
    symptoms.add('figado_sobrecarregado');
  }
  if (d.shIctericia || d.shDorDireita) { symptoms.add('figado_sobrecarregado'); }

  // ── Urinário ─────────────────────────────────────────────────────────────────
  if (d.suInfeccao || d.suArdor || d.simInfeccaoUrinaria) {
    symptoms.add('infecção urinária'); symptoms.add('cistite');
  }

  // ── Cardiovascular ───────────────────────────────────────────────────────────
  if (d.scPaAlta || d.hpHipertensao) {
    symptoms.add('hipertensao'); symptoms.add('hipertensão'); symptoms.add('pressão alta');
  }
  if (d.scColesterol || d.om3TgAltos) { symptoms.add('colesterol_trig'); symptoms.add('colesterol'); }
  if (d.scPalpitacoes || d.scArritmias) { symptoms.add('arritmias'); }

  // ── Respiratório ─────────────────────────────────────────────────────────────
  if (d.srTosseSeca || d.srTosseSecrecao || d.srBronquite || d.hpBronquite) {
    symptoms.add('tosse'); symptoms.add('bronquite');
  }
  if (d.srRinite || d.srSinusite || d.hpRinite) { symptoms.add('rinite_sinusite'); }
  if (d.srAsma || d.srChiado || d.hpAsma) { symptoms.add('rinite_sinusite'); }
  if (d.simGripe || d.simInfeccoesFreq) { symptoms.add('gripe'); }

  // ── Neurológico ──────────────────────────────────────────────────────────────
  if (d.snDorCabeca) { symptoms.add('dores_de_cabeca'); }
  if (d.snEnxaqueca) { symptoms.add('enxaqueca'); symptoms.add('dores_de_cabeca'); }
  if (d.snFormigamento || d.snDormencia || d.vitbFormigamento) { symptoms.add('carencia_b12'); }
  if (d.snMaMemoria || d.snConcentracao || d.snConfusao || d.vitbMaMemoria) { symptoms.add('carencia_b12'); symptoms.add('fadiga'); }

  // ── Osteomuscular ────────────────────────────────────────────────────────────
  if (d.sosDorArticular || d.sosRigidez || d.om3DorArticular) { symptoms.add('artrite_artralgia'); }
  if (d.sosDorMuscular || d.sosCaimbras || d.magCaimbras) { symptoms.add('carencia_magnesio'); }
  if (d.sosOsteopenia || d.sosOsteoporose) { symptoms.add('osteoporose'); }

  // ── Pele / Cabelo / Unhas ────────────────────────────────────────────────────
  if (d.pcuAcne || d.pcuDermatite || d.pcuPsoriase || d.zincoAcne) { symptoms.add('acne'); }
  if (d.pcuQuedaCabelo || d.seQuedaCabelo || d.vitbQuedaCabelo) { symptoms.add('queda_cabelo'); }

  // ── Imunológico ──────────────────────────────────────────────────────────────
  if (d.simCandidiase) { symptoms.add('candidiase'); }
  if (d.simFeridasDemoram || d.zincoCicatrizacao || d.zincoBaixaImun || d.simAlergias || d.simLinfonodos) {
    symptoms.add('imunidade_baixa');
  }

  // ── Endócrino / Metabólico ───────────────────────────────────────────────────
  if (d.seDiabetes || d.seResistencia) { symptoms.add('diabetes_prediabetes'); symptoms.add('diabetes'); }
  if (d.seGanhoPeso || d.seDificEmagrecer || d.seSindMetabolica) {
    symptoms.add('obesidade_resistencia_insulinica');
  }
  if (d.seVontadeDoces || d.seSonolencia || d.seTremoresJejum) {
    symptoms.add('obesidade_resistencia_insulinica'); symptoms.add('diabetes_prediabetes');
  }
  if (d.seCansaco || d.vitdFraqueza || d.vitdTristeza || d.vitdBaixaImun) {
    symptoms.add('carencia_vitamina_d');
  }

  // ── Hormonal Feminino ────────────────────────────────────────────────────────
  if (d.hfColica || d.hfTPM) { symptoms.add('tpm_dismenorreia'); }
  if (d.hfEndometriose || d.hfSop || d.hpSop) { symptoms.add('sop'); }
  if (d.hfMenopausa || d.hfFogachos) { symptoms.add('menopausa'); }
  if (d.hpEndometriose) { symptoms.add('sop'); }

  // ── Hormonal Masculino ───────────────────────────────────────────────────────
  if (d.hmBaixaLibido || d.hmBaixaTestost) { symptoms.add('baixa_testosterona'); }
  if (d.hmDisfuncao) { symptoms.add('baixa_testosterona'); }

  // ── Sono ─────────────────────────────────────────────────────────────────────
  if (d.sonoDemora || d.sonoAcordaNoite || d.sonoAcordaCedo || d.sonoLeve) {
    symptoms.add('insonia'); symptoms.add('insônia');
  }
  if (d.magInsonia) { symptoms.add('insonia'); symptoms.add('carencia_magnesio'); }

  // ── Emocional ────────────────────────────────────────────────────────────────
  if (d.emocDesanimo || d.emocPerda || d.emocLuto || d.emocIsolamento || d.emocSensacaoVazio) { symptoms.add('depressao'); }
  if (d.sobrecarrega === 'Frequentemente' || d.sobrecarrega === 'Quase sempre') { symptoms.add('depressao'); symptoms.add('burnout_adrenal'); }
  if (d.desaparecerSentimento === 'Às vezes' || d.desaparecerSentimento === 'Frequentemente') { symptoms.add('depressao'); symptoms.add('burnout_adrenal'); }
  if (d.emocCrises || d.emocPanico || d.emocMedo || d.emocPensAcel || d.emocTensaoMuscular || d.emocPreocupacaoExcess || d.magAnsiedade) {
    symptoms.add('ansiedade');
  }
  if (d.alertaConstante === 'Sim') { symptoms.add('ansiedade'); symptoms.add('burnout_adrenal'); }
  if (d.emocExaustao || d.emocBurnout) {
    symptoms.add('burnout_adrenal'); symptoms.add('fadiga');
  }
  if (d.om3HumorDep) { symptoms.add('depressao'); symptoms.add('omega3_deficiencia'); }

  // ── Carências Nutricionais ───────────────────────────────────────────────────
  if (d.magCaimbras || d.magAnsiedade || d.magInsonia || d.magIrritab || d.magPalpitacoes) {
    symptoms.add('carencia_magnesio');
  }
  if (d.vitdBaixaImun || d.vitdDorOssea || d.vitdFraqueza || d.vitdTristeza) {
    symptoms.add('carencia_vitamina_d');
  }
  if (d.vitbFormigamento || d.vitbCansaco || d.vitbMaMemoria || d.vitbQuedaCabelo) {
    symptoms.add('carencia_b12');
  }
  if (d.ferroCansaco || d.ferroPalidez || d.ferroFaltaAr || d.ferroTontura) {
    symptoms.add('anemia');
  }
  if (d.zincoBaixaImun || d.zincoAcne || d.zincoCicatrizacao || d.zincoBaixaLibido) {
    symptoms.add('carencia_zinco');
  }
  if (d.om3Inflamacao || d.om3DorArticular || d.om3PeleSeca || d.om3HumorDep || d.om3TgAltos) {
    symptoms.add('omega3_deficiencia');
  }

  // ── Tireoide ─────────────────────────────────────────────────────────────────
  if (d.seCansaco || d.seGanhoPeso || d.sonoAcordaCansado) {
    if (d.vitdFraqueza || d.magInsonia || d.ferroTontura) { symptoms.add('tireoide_hipotireoidismo'); }
  }

  // ── Toxicidade ───────────────────────────────────────────────────────────────
  if (d.toxMercurio || d.toxChumbo || d.toxAgrotoxicos || d.toxMofo || d.toxPlasticos) {
    symptoms.add('detox_toxinas');
  }

  // ── Histórico / Hábitos ──────────────────────────────────────────────────────
  if (d.tabacoDiario) { symptoms.add('fadiga'); symptoms.add('rinite_sinusite'); }
  if (d.alcoolRegular) { symptoms.add('figado_sobrecarregado'); }
  if (d.consAcucar || d.consFrituras || d.consRefrigerante || d.atividadeSedentario) {
    symptoms.add('obesidade_resistencia_insulinica');
  }

  return Array.from(symptoms);
}

// ─────────────────────────────────────────────
// GERAÇÃO DE PROTOCOLO
// ─────────────────────────────────────────────
function generateProtocol(d) {
  const alerts = [];
  const sc = (keys) => keys.filter(k => d[k]).length;

  // Alertas vitais
  const paSis = Number(d.paSis); const paDia = Number(d.paDia);
  const fc = Number(d.fc); const sao2 = Number(d.sao2); const temp = Number(d.temp);
  if (paSis > 140 || paDia > 90) alerts.push({ s:'error', m:'Pressão arterial elevada (>140/90 mmHg) — encaminhar avaliação médica urgente.' });
  if ((paSis > 0 && paSis < 90) || (paDia > 0 && paDia < 60)) alerts.push({ s:'error', m:'Pressão arterial baixa (<90/60 mmHg) — hipotensão, investigar causas.' });
  if (sao2 > 0 && sao2 < 94) alerts.push({ s:'error', m:`Saturação O₂ baixa (${sao2}%) — avaliação médica imediata.` });
  if (temp > 37.8) alerts.push({ s:'warning', m:`Febre detectada (${temp}°C) — investigar causa infecciosa.` });
  if (fc > 0 && (fc < 50 || fc > 110)) alerts.push({ s:'warning', m:`Frequência cardíaca anormal (${fc} bpm) — avaliar causa.` });
  if (d.alertaDorPeito || d.scDorPeito) alerts.push({ s:'error', m:'Dor no peito relatada — descartar evento cardíaco. Encaminhar urgente.' });
  if (d.sdSangue) alerts.push({ s:'error', m:'Sangue nas fezes — avaliação gastroenterológica urgente.' });
  if (d.shIctericia) alerts.push({ s:'error', m:'Pele/olhos amarelados (icterícia) — avaliação médica urgente.' });
  if (d.segEmRisco || d.machAtualmente || d.tentSim) {
    alerts.push({ s:'error', m:'⚠️ RISCO PSICOLÓGICO GRAVE — Encaminhar IMEDIATAMENTE para atendimento psicológico/psiquiátrico de urgência. Não deixar o paciente sozinho.' });
  }
  if (d.segAsVezes || d.segFrequente) alerts.push({ s:'warning', m:'Pensamentos de não querer viver relatados — acompanhamento psicológico prioritário e urgente.' });

  // Scores por sistema
  const scores = {
    digestorio: sc(['sdAzia','sdRefluxo','sdMaDigestao','sdNauseas','sdGases','sdDistensao','sdDorAbdom','sdConstipacao','sdDiarreia','sdAlternado','sdMuco','sdSangue','sdMauHalito','sdBocaAmarga','sdCandidiase']),
    hepatico:   sc(['shNauseasGord','shFrituras','shGostoAmargo','shDorDireita','shIctericia','shUrinaEscura','shCoceira','shMauHalito','shCansacoApos','shGordura']),
    renal:      sc(['suUrinaEscura','suEspuma','suArdor','suDorLombar','suInchacoPosto','suInchacoMembros','suCalculo','suInfeccao','suAcordaNoite','suUrinaMuito','suUrinaPouco']),
    cardio:     sc(['scPaAlta','scPaBaixa','scPalpitacoes','scArritmias','scDorPeito','scFaltaArEsforco','scCansacoFacil','scInchacoMembros','scVarizes','scMaosFrios','scTontura','scColesterol']),
    respiratorio: sc(['srFaltaAr','srTosseSeca','srTosseSecrecao','srChiado','srAsma','srBronquite','srRinite','srSinusite','srRonco','srApneia','srInfeccoesFreq']),
    neurologico: sc(['snDorCabeca','snEnxaqueca','snTontura','snVertigem','snFormigamento','snDormencia','snTremores','snMaMemoria','snConfusao','snConcentracao','snZumbido','snVisaoTurva','snFraquezaMus']),
    osteomuscular: sc(['sosDorMuscular','sosDorArticular','sosDorLombar','sosDorCervical','sosCaimbras','sosPernasInq','sosFraquezaMus','sosTendinite','sosOsteopenia','sosOsteoporose','sosRigidez','sosPerda']),
    pele:       sc(['pcuPeleSeca','pcuAcne','pcuDermatite','pcuPsoriase','pcuRosacea','pcuFeridasDemoram','pcuCoceira','pcuQuedaCabelo','pcuUnhasFracas','pcuRachadurasLabios','pcuRachadurasCantos']),
    imunologico: sc(['simInfeccoesFreq','simHerpes','simCandidiase','simGripe','simSinusite','simInfeccaoUrinaria','simAlergias','simFeridasDemoram','simFebreRecorrente','simLinfonodos']),
    endocrino:  sc(['seGanhoPeso','seDificEmagrecer','seFome','seVontadeDoces','seSonolencia','seTremoresJejum','seSede','seUrinaExcessiva','seSudorese','seQuedaCabelo','seCansaco','seResistencia']),
    emocional:  sc(['emocCrises','emocPanico','emocChoro','emocIrritab','emocMedo','emocPensAcel','emocDesanimo','emocPerda','emocIsolamento','emocCulpa','emocRaiva','emocLuto','emocAutoestima','emocExaustao','emocBurnout','emocSensacaoVazio','emocTensaoMuscular','emocPreocupacaoExcess']),
    sono:       sc(['sonoDemora','sonoAcordaNoite','sonoAcordaCedo','sonoPesadelos','sonoLeve','sonoRonco','sonoApneia','sonoSonolencia','sonoAcordaCansado','sonoRemedio']),
  };

  const lvl = (n) => n <= 2 ? {label:'Normal', color:'success'} : n <= 5 ? {label:'Atenção', color:'warning'} : n <= 9 ? {label:'Alterado', color:'error'} : {label:'Prioridade', color:'error'};

  // Carências nutricionais
  const nutrScores = {
    magnesio: sc(['magCaimbras','magAnsiedade','magInsonia','magIrritab','magPalpitacoes','magConstipacao','magDores']),
    vitD:     sc(['vitdBaixaImun','vitdDorOssea','vitdFraqueza','vitdTristeza','vitdInfeccoes','vitdPoucoSol','vitdOsteopenia']),
    complexoB: sc(['vitbFormigamento','vitbCansaco','vitbIrritab','vitbBocaRachada','vitbMaMemoria','vitbQuedaCabelo','vitbLinguaArdida']),
    ferro:    sc(['ferroCansaco','ferroPalidez','ferroFaltaAr','ferroQuedaCabelo','ferroTontura','ferroUnhasFracas','ferroMenstruacao']),
    zinco:    sc(['zincoBaixaImun','zincoQuedaCabelo','zincoUnhasFracas','zincoAcne','zincoCicatrizacao','zincoPaladar','zincoBaixaLibido']),
    omega3:   sc(['om3Inflamacao','om3DorArticular','om3PeleSeca','om3HumorDep','om3DifCognitiva','om3TgAltos']),
  };

  const deficiencias = [];
  if (nutrScores.magnesio >= 3) deficiencias.push({
    nome:'Magnésio', escore:nutrScores.magnesio, prioridade: nutrScores.magnesio >= 5 ? 'Alta':'Média',
    suplementos:['Magnésio Quelato 300–400 mg/dia (noturno)','Malato de Magnésio 400 mg/dia'],
    alimentos:'Abóbora, sementes de girassol, amêndoas, espinafre, banana, cacau 70%+',
  });
  if (nutrScores.vitD >= 3) deficiencias.push({
    nome:'Vitamina D', escore:nutrScores.vitD, prioridade: nutrScores.vitD >= 5 ? 'Alta':'Média',
    suplementos:['Vitamina D3 2.000–5.000 UI/dia','Vitamina K2 100 mcg/dia (junto)','Sol 15–20 min/dia em braços e pernas'],
    alimentos:'Sardinha, salmão, atum, ovos, cogumelos expostos ao sol',
  });
  if (nutrScores.complexoB >= 3) deficiencias.push({
    nome:'Complexo B', escore:nutrScores.complexoB, prioridade: nutrScores.complexoB >= 5 ? 'Alta':'Média',
    suplementos:['B12 ativa (metilcobalamina) 1.000 mcg/dia','Metilfolato (B9 ativa) 400 mcg/dia','Piridoxal-5-fosfato (B6 ativa) 25 mg/dia'],
    alimentos:'Carnes, fígado, ovos, nozes, folhas verde-escuras, leguminosas',
  });
  if (nutrScores.ferro >= 3) deficiencias.push({
    nome:'Ferro', escore:nutrScores.ferro, prioridade: nutrScores.ferro >= 5 ? 'Alta':'Média',
    suplementos:['Bisglicinato de Ferro 14–28 mg/dia (longe de refeições principais)','Vitamina C 200–500 mg junto (melhora absorção)'],
    alimentos:'Carnes vermelhas, fígado, feijão, lentilha, brócolis, couve',
  });
  if (nutrScores.zinco >= 3) deficiencias.push({
    nome:'Zinco', escore:nutrScores.zinco, prioridade: nutrScores.zinco >= 5 ? 'Alta':'Média',
    suplementos:['Zinco Quelato (bisglicinato) 15–30 mg/dia','Separar de cálcio e ferro'],
    alimentos:'Carnes, ostras, sementes de abóbora, amendoim, feijão, cogumelos',
  });
  if (nutrScores.omega3 >= 3) deficiencias.push({
    nome:'Ômega-3 (EPA+DHA)', escore:nutrScores.omega3, prioridade: nutrScores.omega3 >= 5 ? 'Alta':'Média',
    suplementos:['Ômega-3 concentrado 1–3 g EPA+DHA/dia (peixe deep sea ou alga)'],
    alimentos:'Salmão, sardinha, atum, chia, linhaça, nozes',
  });

  // Fitoterapia por sistema
  const fito = [];
  if (scores.digestorio >= 3) fito.push({ sistema:'Digestório 🌿', ervas:[
    'Boldo-do-Chile (Peumus boldus) — 300 mg ext. seco 2×/dia (digestivo, colerético)',
    'Alcachofra (Cynara scolymus) — 300–600 mg/dia antes das refeições',
    'Gengibre (Zingiber officinale) — 1 g/dia (anti-náusea, digestivo)',
    'Camomila (Matricaria chamomilla) — chá 2–3×/dia (gases, cólicas)',
    'Espinheira-santa (Maytenus ilicifolia) — 300 mg ext. seco 3×/dia (gastrite/refluxo)',
  ]});
  if (scores.hepatico >= 3) fito.push({ sistema:'Hepático/Detox 🌿', ervas:[
    'Silimarina (Silybum marianum) — 200–400 mg/dia (hepatoprotetor)',
    'Alcachofra — 300–600 mg/dia (colerético, hepatoprotetor)',
    'Cúrcuma + piperina — 500 mg 3×/dia (anti-inflamatório hepático)',
    'Dente-de-leão (Taraxacum officinale) — chá 2×/dia (colerético)',
    'Bardana (Arctium lappa) — 500 mg/dia (depurativo hepático)',
  ]});
  if (scores.cardio >= 3) fito.push({ sistema:'Cardiovascular 🌿', ervas:[
    'Ginkgo biloba — 120 mg ext. seco/dia (circulação, memória)',
    'Hibisco (Hibiscus sabdariffa) — chá 2×/dia (pressão arterial)',
    'Oliveira (Olea europaea) — 500 mg ext. folha/dia (anti-hipertensivo natural)',
    'Alho (Allium sativum) — 600–1.200 mg ext. envelhecido/dia (colesterol, PA)',
    'Valeriana — 300–600 mg/dia (palpitações, estresse cardiovascular)',
  ]});
  if (scores.respiratorio >= 3) fito.push({ sistema:'Respiratório 🌿', ervas:[
    'Própolis ext. seco — 300–500 mg/dia (anti-infeccioso, anti-viral)',
    'Sabugueiro (Sambucus nigra) — 500 mg/dia (anti-viral, imuno)',
    'Tomilho (Thymus vulgaris) — xarope ou chá 2×/dia (tosse, bronquite)',
    'Guaco (Mikania glomerata) — xarope 10 mL 3×/dia (tosse, bronquite)',
    'Andrographis paniculata — 200–400 mg/dia (anti-viral, infecções)',
  ]});
  if (scores.neurologico >= 3) fito.push({ sistema:'Neurológico 🌿', ervas:[
    'Ginkgo biloba — 120 mg/dia (memória, concentração, circulação cerebral)',
    'Bacopa monnieri — 300 mg ext. seco/dia (memória, cognição)',
    'Melissa (Melissa officinalis) — 300–600 mg/dia (ansiedade, cognição)',
    'Valeriana — 300–600 mg/dia (cefaleia tensional, insônia)',
    'Lion\'s Mane (Hericium erinaceus) — 500 mg/dia (neurotrópico, cognição)',
  ]});
  if (scores.osteomuscular >= 3) fito.push({ sistema:'Osteomuscular 🌿', ervas:[
    'Harpagófito (Harpagophytum procumbens) — 2.400 mg/dia (artrite, lombalgia)',
    'Boswellia serrata — 300–400 mg 3×/dia (artrite, inflamação articular)',
    'Cúrcuma + piperina — 500 mg 3×/dia (anti-inflamatório sistêmico)',
    'Salgueiro-branco (Salix alba) — 400 mg/dia (analgésico natural)',
    'Arnica montana — uso externo em gel/creme (dores musculares)',
  ]});
  if (scores.imunologico >= 3) fito.push({ sistema:'Imunológico 🌿', ervas:[
    'Echinacea purpurea — 400 mg ext. seco 2×/dia por ciclos (imuno-estimulante)',
    'Própolis — 500 mg/dia (anti-infeccioso, anti-viral)',
    'Astragalus membranaceus — 500–1.000 mg/dia (imunomodulador)',
    'Cogumelo Reishi (Ganoderma lucidum) — 500 mg/dia (imunomodulador)',
    'Elderberry (Sambucus nigra) — 500 mg/dia (anti-viral)',
  ]});
  if (scores.emocional >= 4) fito.push({ sistema:'Emocional/Adaptogênico 🌿', ervas:[
    'Ashwagandha (Withania somnifera) — 300–600 mg/dia (adaptogênico, anti-estresse)',
    'Rhodiola rosea — 200–400 mg/dia (adaptogênico, fadiga mental)',
    'Passiflora incarnata — 300 mg ext. seco 2–3×/dia (ansiedade, insônia)',
    'Valeriana — 300–600 mg/dia (ansiedade, insônia)',
    'Melissa officinalis — 300–600 mg/dia (calmante, cognição)',
  ]});
  if (scores.endocrino >= 3) fito.push({ sistema:'Metabólico/Endócrino 🌿', ervas:[
    'Berberina — 500 mg 3×/dia (glicemia, colesterol, resistência insulínica)',
    'Canela (Cinnamomum verum) — 1–2 g/dia (glicemia, insulina)',
    'Gymnema sylvestre — 400 mg antes das refeições (vontade de doces, glicemia)',
    'Feno-grego — 500 mg/dia (glicemia, perfil lipídico)',
    'Cromo picolinato — 200 mcg/dia (resistência à insulina)',
  ]});
  const femCount = sc(['hfMenstrIrreg','hfFluxoIntenso','hfColica','hfTPM','hfEndometriose','hfSop','hfFogachos']);
  if (femCount >= 2) fito.push({ sistema:'Hormonal Feminino 🌿', ervas:[
    'Vitex agnus-castus — 20–40 mg ext. seco/dia (TPM, irregularidade, SOP)',
    'Óleo de prímula — 1–3 g/dia (TPM, dor mamária, inflamação)',
    'Cohosh negro (Actaea racemosa) — 20–40 mg/dia (menopausa, fogachos)',
    'Isoflavona de soja — 40–80 mg/dia (fogachos, estrogênio natural)',
    'Dong quai (Angelica sinensis) — 500 mg/dia (regulação menstrual)',
  ]});
  const mascCount = sc(['hmBaixaLibido','hmDisfuncao','hmCansaco','hmPerdaMassa','hmBaixaTestost']);
  if (mascCount >= 2) fito.push({ sistema:'Hormonal Masculino 🌿', ervas:[
    'Tribulus terrestris — 750–1.500 mg/dia (libido, testosterona)',
    'Maca peruana — 1,5–3 g/dia (libido, energia, fertilidade)',
    'Ashwagandha — 600 mg/dia (testosterona, vigor)',
    'Saw Palmetto (Serenoa repens) — 160–320 mg/dia (saúde prostática)',
    'Zinco quelato — 15–30 mg/dia (síntese de testosterona)',
  ]});

  // Homeopatia
  const homo = [];
  if (d.emocCrises || d.emocPanico || d.emocMedo) homo.push('Aconitum napellus 30CH — crises de pânico, medo intenso, ansiedade aguda');
  if (d.emocCrises || d.emocIrritab) homo.push('Arsenicum album 30CH — ansiedade com agitação, perfeccionismo, insegurança');
  if (d.emocDesanimo || d.emocPerda) homo.push('Natrum muriaticum 30CH — tristeza, isolamento, luto contido');
  if (d.humorPredom === 'Triste' || d.emocLuto) homo.push('Ignatia amara 30CH — luto agudo, choro fácil, perda recente');
  if (d.emocBurnout || d.emocExaustao) { homo.push('Nux vomica 30CH — esgotamento por excesso de trabalho, irritabilidade'); homo.push('Phosphoricum acidum 30CH — esgotamento profundo, fraqueza mental'); }
  if (d.emocIrritab || d.emocRaiva) homo.push('Staphysagria 30CH — raiva reprimida, humilhação, indignação');
  if (d.sonoDemora || d.sonoAcordaNoite) homo.push('Coffea cruda 30CH — insônia por pensamentos acelerados');
  if (d.sdAzia || d.sdRefluxo) homo.push('Lycopodium clavatum 30CH — flatulência, distensão, digestão lenta');
  if (d.scPalpitacoes) homo.push('Cactus grandiflorus 30CH — palpitações com sensação de constrição');
  if (d.sosDorArticular) homo.push('Rhus toxicodendron 30CH — dores que melhoram com movimento');
  if (d.sosDorMuscular) homo.push('Arnica montana 30CH — dores musculares, contusões, esforço físico');
  if (d.simInfeccoesFreq || d.simGripe) homo.push('Thymuline 9CH semanal — imunomodulação, preventivo de infecções');

  // Florais de Bach
  const flores = [];
  if (d.emocCrises || d.emocPanico) flores.push('Rescue Remedy — crises agudas, pânico, nervosismo intenso');
  if (d.emocMedo) flores.push('Mimulus — medo de situações específicas conhecidas');
  if (d.segAsVezes || d.segFrequente) flores.push('Rock Rose — terror, pânico extremo, pesadelos');
  if (d.emocDesanimo) flores.push('Mustard — tristeza sem causa aparente, melancolia profunda');
  if (d.emocDesanimo) flores.push('Gentian — desânimo após fracasso, falta de fé');
  if (d.emocExaustao || d.emocBurnout) flores.push('Olive — esgotamento total, sem reservas energéticas');
  if (d.sonoSonolencia && !d.emocExaustao) flores.push('Hornbeam — cansaço matinal, procrastinação');
  if (d.emocIrritab) flores.push('Holly — irritabilidade, raiva, intolerância');
  if (d.emocRaiva) flores.push('Willow — ressentimento, amargura, autopiedade');
  if (d.emocCulpa) flores.push('Pine — culpa excessiva, autocrítica intensa');
  if (d.emocLuto || d.traumaLuto) flores.push('Star of Bethlehem — trauma, choque emocional, luto');
  if (d.traumaSeparacao || d.traumaLuto) flores.push('Walnut — adaptação a mudanças, transições de vida');
  if (d.emocAutoestima) flores.push('Larch — falta de autoconfiança, medo do fracasso');
  if (d.emocPensAcel) flores.push('White Chestnut — pensamentos repetitivos, mente agitada');
  if (d.emocIsolamento) flores.push('Water Violet — isolamento voluntário, dificuldade de pedir ajuda');

  // Exames sugeridos
  const exames = [];
  if (!d.exHemograma) exames.push('Hemograma completo (rastreio anemia, infecções, inflamação)');
  if (!d.exVitD) exames.push('25-OH Vitamina D sérica (deficiência muito prevalente)');
  if (!d.exTSH && (d.seFrioSens || d.seGanhoPeso || d.emocDesanimo || d.hpHipotireoidismo)) exames.push('TSH + T4 livre + T3 livre (função tireoidiana)');
  if (!d.exGlicemia && (d.seVontadeDoces || d.seTremoresJejum || d.seSede)) exames.push('Glicemia em jejum + Insulina basal + HOMA-IR');
  if (!d.exColesterol && (d.scColesterol || d.hfInfarto)) exames.push('Perfil lipídico completo (CT, HDL, LDL, TG, não-HDL)');
  if (!d.exTGOTGP && scores.hepatico >= 2) exames.push('TGO, TGP, Gama-GT, Bilirrubinas (função hepática)');
  if (!d.exCreatinina && scores.renal >= 2) exames.push('Creatinina + Ureia + Microalbuminúria (função renal)');
  if (!d.exB12 && nutrScores.complexoB >= 2) exames.push('Vitamina B12 sérica');
  if (!d.exFerritina && nutrScores.ferro >= 2) exames.push('Ferritina + Ferro sérico + TIBC');
  if (!d.exPCR && (scores.osteomuscular >= 3 || d.om3Inflamacao)) exames.push('PCR ultrassensível + VHS (inflamação sistêmica)');
  if (scores.cardio >= 3) exames.push('Eletrocardiograma + Avaliação cardiológica');
  if (d.emocBurnout) exames.push('Cortisol sérico matinal (avaliação adrenal/estresse crônico)');
  if (d.sdSangue) exames.push('Endoscopia digestiva alta e baixa (urgente)');
  if (d.toxMercurio || d.toxChumbo) exames.push('Dosagem de metais pesados (mercúrio, chumbo, arsênio)');

  // Condutas gerais
  const condutas = [];
  if (d.agua1L || d.agua1a2L) condutas.push('💧 Hidratação: aumentar para 35 mL/kg/dia. Água filtrada ou alcalina.');
  if (d.atividadeSedentario) condutas.push('🏃 Atividade física: iniciar caminhadas 30 min/dia, 5×/semana. Progredir gradualmente.');
  if (d.solPouco || nutrScores.vitD >= 3) condutas.push('☀️ Sol: 15–20 min/dia sem protetor entre 10h–14h (braços e pernas).');
  if (d.consAcucar || d.consRefrigerante || d.consIndustrializados) condutas.push('🍎 Alimentação: eliminar açúcares refinados, refrigerantes e ultraprocessados. Priorizar alimentos reais.');
  if (d.tabacoDiario || d.tabacoOcasional) condutas.push('🚭 Tabagismo: encaminhar para programa de cessação do tabagismo. Prioridade alta.');
  if (d.alcoolRegular) condutas.push('🍷 Álcool: redução progressiva. Suporte especializado se necessário.');
  if (scores.sono >= 4 || d.sonoRemedio) condutas.push('😴 Higiene do sono: sem telas 1h antes de dormir, horários regulares, quarto escuro e fresco.');
  if (scores.emocional >= 5) condutas.push('🧠 Saúde emocional: encaminhar para acompanhamento psicológico. Meditação e respiração diária.');
  if (d.toxAgrotoxicos || d.toxMercurio) condutas.push('⚠️ Detox: reduzir exposição tóxica. Avaliar protocolo de quelação com especialista.');
  condutas.push('🥗 Dieta anti-inflamatória: vegetais coloridos, proteína de qualidade, azeite extra virgem, abacate, nozes.');
  condutas.push('🧘 Gestão do estresse: meditação, respiração diafragmática, contato com a natureza — mínimo 20 min/dia.');
  if (d.consAlcool || d.consAcucar) condutas.push('🦠 Microbioma: considerar probióticos (Lactobacillus + Bifidobacterium) e prebióticos (fibras, biomassa de banana verde).');

  // ── Protocolos derivados da Bioimpedância ─────────────────────────────────
  const bioAlerts = [];
  const bioCondutas = [];
  const bioSupl = [];
  const gVis = parseFloat(d.bioGorduraVisceral);
  const gPerc = parseFloat(d.bioGorduraPerc);
  const mMusc = parseFloat(d.bioMassaMuscular);
  const mOss  = parseFloat(d.bioMassaOssea);
  const aguaP = parseFloat(d.bioAguaPerc);
  const protP = parseFloat(d.bioProteinaPerc);
  const idMet = parseInt(d.bioIdadeMetabolica);
  const idReal = parseInt(d.idade);
  const pesoMed = parseFloat(d.bioPesoMed || d.peso);

  if (gVis > 0) {
    if (gVis >= 15) bioAlerts.push({ s:'error', m:`Gordura visceral MUITO ELEVADA (nível ${Math.round(gVis)}) — risco metabólico grave. Síndrome metabólica provável. Encaminhar avaliação médica.` });
    else if (gVis >= 10) bioAlerts.push({ s:'warning', m:`Gordura visceral elevada (nível ${Math.round(gVis)}) — risco cardiovascular e metabólico aumentado. Priorizar mudança de estilo de vida.` });
    if (gVis >= 10) {
      bioCondutas.push('🫀 Gordura Visceral Elevada: dieta hipocalórica anti-inflamatória, eliminar açúcares simples, farinhas refinadas e álcool. Meta: reduzir para nível ≤9.');
      bioCondutas.push('🏃 Exercício aeróbico mínimo 150 min/semana + treino de resistência 2–3×/semana (prioritário para redução de gordura visceral).');
      bioSupl.push('Berberina 500 mg 3×/dia (reduz gordura visceral, melhora sensibilidade à insulina)');
      bioSupl.push('Ômega-3 concentrado 3 g EPA+DHA/dia (anti-inflamatório, reduz TG)');
      bioSupl.push('Cromo Picolinato 200 mcg/dia (melhora resistência insulínica)');
      bioSupl.push('Silimarina 300 mg 2×/dia (hepatoprotetor, auxilia no metabolismo lipídico)');
      if (!fito.some(f => f.sistema.includes('Metabólico'))) {
        fito.push({ sistema:'Bioimpedância — Metabólico/Visceral 🌿', ervas:[
          'Berberina (Berberis vulgaris) — 500 mg 3×/dia antes das refeições (resistência insulínica, gordura visceral)',
          'Canela (Cinnamomum verum) — 2 g/dia (glicemia, perfil lipídico)',
          'Alcachofra (Cynara scolymus) — 600 mg/dia (detox hepático, colesterol)',
          'Cúrcuma + piperina — 500 mg 3×/dia (anti-inflamatório metabólico)',
          'Gymnema sylvestre — 400 mg antes das refeições (controle de glicemia e vontade de doces)',
        ]});
      }
    }
  }

  if (gPerc > 0) {
    const altPerc = d.sexo === 'Masculino' ? 25 : 32;
    if (gPerc >= altPerc) {
      bioCondutas.push(`💪 % Gordura Corporal Elevada (${gPerc}%): déficit calórico de 300–500 kcal/dia preservando proteína (1,6–2,0 g/kg/dia). Priorizar proteína em cada refeição.`);
      bioSupl.push('L-Carnitina Tartarato 2 g/dia em jejum (transporte de ácidos graxos para oxidação)');
      bioSupl.push('Chá verde (EGCG) 400 mg/dia (termogênese, oxidação de gordura)');
    }
    const baixoPerc = d.sexo === 'Masculino' ? 6 : 10;
    if (gPerc < baixoPerc) {
      bioAlerts.push({ s:'warning', m:`Percentual de gordura muito baixo (${gPerc}%) — pode indicar desnutrição ou distúrbio alimentar. Avaliar adequadamente.` });
    }
  }

  if (mMusc > 0 && pesoMed > 0) {
    const muscPct = (mMusc / pesoMed) * 100;
    const limBaixo = d.sexo === 'Masculino' ? 38 : 28;
    if (muscPct < limBaixo) {
      bioAlerts.push({ s:'warning', m:`Massa muscular baixa (${mMusc} kg / ${muscPct.toFixed(0)}%) — sarcopenia possível. Atenção especialmente em idosos.` });
      bioCondutas.push('💪 Massa Muscular Baixa: aumentar ingestão proteica para 1,6–2,2 g/kg/dia. Treino resistido 3×/semana com progressão de carga. Acompanhar com novo exame em 60 dias.');
      bioSupl.push('Whey Protein ou Proteína Vegetal Isolada — 20–40 g/dia (pós-treino e antes de dormir)');
      bioSupl.push('Creatina Monohidratada 3–5 g/dia (síntese proteica, força, massa muscular)');
      bioSupl.push('BCAA (leucina, isoleucina, valina) 5 g antes/durante treino (anticatabólico)');
      bioSupl.push('Vitamina D3 2.000–5.000 UI/dia (essencial para função muscular e síntese proteica)');
    }
  }

  if (mOss > 0 && pesoMed > 0) {
    let refOss = 2.0;
    if (pesoMed < 45) refOss = 1.5; else if (pesoMed < 60) refOss = 1.8; else if (pesoMed < 75) refOss = 2.2; else refOss = 2.5;
    if (mOss < refOss * 0.85) {
      bioAlerts.push({ s:'warning', m:`Massa óssea baixa (${mOss} kg — referência esperada ≈${refOss} kg). Investigar osteopenia/osteoporose. Solicitar densitometria óssea.` });
      bioCondutas.push('🦴 Massa Óssea Baixa: suplementar cálcio + D3 + K2. Exercícios de impacto e resistência. Considerar densitometria óssea (DEXA).');
      bioSupl.push('Cálcio Quelato (bisglicinato) 500 mg 2×/dia (longe do café e ferro)');
      bioSupl.push('Vitamina D3 4.000–5.000 UI/dia + Vitamina K2 (MK-7) 100–200 mcg/dia');
      bioSupl.push('Magnésio Quelato 300 mg/dia (cofator essencial para metabolismo ósseo)');
      bioSupl.push('Colágeno Tipo I hidrolisado 10 g/dia (estrutura óssea e articular)');
      if (!fito.some(f => f.sistema.includes('Osteomuscular'))) {
        fito.push({ sistema:'Bioimpedância — Saúde Óssea 🌿', ervas:[
          'Ipê-roxo (Tabebuia avellanedae) — 300 mg ext. seco/dia (mineralização óssea)',
          'Bambu (Bambusa vulgaris) — 300 mg/dia (rico em sílica orgânica, formação óssea)',
          'Cavalinha (Equisetum arvense) — 500 mg/dia (sílica, cálcio, remineralização)',
          'Cálcio de algas marinhas (Lithothamnium calcareum) — 500 mg/dia (cálcio altamente biodisponível)',
        ]});
      }
    }
  }

  if (aguaP > 0) {
    const loW = d.sexo === 'Masculino' ? 50 : 45;
    if (aguaP < loW) {
      bioCondutas.push(`💧 Hidratação Corporal Baixa (${aguaP}%): aumentar ingestão hídrica para 35–40 mL/kg/dia. Distribuir ao longo do dia. Considerar água com eletrólitos.`);
      bioSupl.push('Eletrólitos (sódio, potássio, magnésio) — reposição em casos de intensa transpiração ou deficit hídrico');
    }
  }

  if (protP > 0 && protP < 16) {
    bioAlerts.push({ s:'warning', m:`Proteína corporal baixa (${protP}%) — indica possível déficit proteico. Revisar ingestão alimentar.` });
    bioCondutas.push(`🥩 Proteína Corporal Baixa (${protP}%): aumentar ingestão para 1,6–2 g/kg/dia. Priorizar proteínas completas em cada refeição.`);
    bioSupl.push('Proteína Isolada (whey, ervilha ou arroz) 20–30 g/dia para complementar dieta');
  }

  if (idMet > 0 && idReal > 0 && idMet > idReal + 5) {
    bioAlerts.push({ s:'warning', m:`Idade metabólica ${idMet} anos (${idMet - idReal} anos acima da idade real) — metabolismo desfavorável. Priorizar mudanças de estilo de vida.` });
    bioCondutas.push(`⏱️ Idade Metabólica Elevada (${idMet} anos): foco em treino resistido, alimentação proteica, sono de qualidade e gestão do estresse para rejuvenescimento metabólico.`);
    bioSupl.push('Coenzima Q10 (Ubiquinol) 100–200 mg/dia (produção de energia mitocondrial)');
    bioSupl.push('NAD+ precursores (NMN ou NR) 250–500 mg/dia (longevidade celular)');
    bioSupl.push('Resveratrol 250–500 mg/dia (ativação de sirtuínas, saúde metabólica)');
  }

  // Adicionar suplementos de bioimpedância às deficiências se relevantes
  if (bioSupl.length > 0) {
    deficiencias.push({
      nome:'Bioimpedância — Composição Corporal',
      escore: bioAlerts.length + Math.floor(bioSupl.length / 2),
      prioridade: bioAlerts.some(a => a.s === 'error') ? 'Alta' : bioAlerts.some(a => a.s === 'warning') ? 'Média' : 'Baixa',
      suplementos: bioSupl,
      alimentos: 'Proteínas magras, vegetais crucíferos, gorduras boas (abacate, azeite, nozes), alimentos ricos em cálcio e magnésio',
    });
  }

  // Adicionar alertas de bioimpedância aos alertas gerais
  bioAlerts.forEach(a => alerts.push(a));
  bioCondutas.forEach(c => condutas.push(c));

  // Exames sugeridos por bioimpedância
  if (gVis >= 10 && !exames.some(e => e.includes('HOMA'))) exames.push('Glicemia em jejum + Insulina basal + HOMA-IR (resistência insulínica — gordura visceral elevada)');
  if (gVis >= 10) exames.push('Perfil lipídico completo + PCR ultrassensível (risco metabólico-cardiovascular)');
  if (mOss > 0 && parseFloat(mOss) < 2.0) exames.push('Densitometria óssea (DEXA) — massa óssea abaixo do esperado na bioimpedância');
  if (gPerc > 0 && parseFloat(gPerc) >= (d.sexo === 'Masculino' ? 25 : 32)) exames.push('Cortisol matinal + DHEA-S (adiposidade elevada pode indicar hipercortisolismo)');
  if (idMet > 0 && idReal > 0 && idMet > idReal + 10) exames.push('Painel metabólico completo (glicemia, insulina, lipídios, TSH, cortisol) — idade metabólica muito acima da real');

  // ── Dados terapêuticos completos (PDF/DOCX) ──
  const symptoms = buildSymptomsFromData(d);
  let therapeuticData = [];
  let boarimProtocols = [];
  try { therapeuticData = generateTherapeuticReport(symptoms); } catch (e) { /* ignore */ }
  try { boarimProtocols = getBoarimProtocolsBySymptoms(symptoms); } catch (e) { /* ignore */ }

  return { alerts, scores, lvl, deficiencias, fito, homo, flores, exames, condutas, symptoms, therapeuticData, boarimProtocols };
}

// ─────────────────────────────────────────────
// UTILITÁRIOS DE MÁSCARA E CLASSIFICAÇÃO
// ─────────────────────────────────────────────
const maskDate = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 8);
  if (d.length > 4) return d.slice(0,2) + '/' + d.slice(2,4) + '/' + d.slice(4);
  if (d.length > 2) return d.slice(0,2) + '/' + d.slice(2);
  return d;
};
const maskPhone = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length > 7) return '(' + d.slice(0,2) + ') ' + d.slice(2,7) + '-' + d.slice(7);
  if (d.length > 2) return '(' + d.slice(0,2) + ') ' + d.slice(2);
  if (d.length > 0) return '(' + d;
  return d;
};
const calcAge = (dateStr) => {
  if (!dateStr || dateStr.length < 10) return '';
  const [dd, mm, yyyy] = dateStr.split('/').map(Number);
  if (!dd || !mm || !yyyy || yyyy < 1900 || yyyy > new Date().getFullYear()) return '';
  const today = new Date();
  let age = today.getFullYear() - yyyy;
  if (today.getMonth() + 1 < mm || (today.getMonth() + 1 === mm && today.getDate() < dd)) age--;
  return (age > 0 && age < 130) ? String(age) : '';
};
const classifyIMC = (val) => {
  const v = parseFloat(val);
  if (v < 18.5) return { label: 'Baixo peso', color: 'warning' };
  if (v < 25)   return { label: 'Peso normal ✓', color: 'success' };
  if (v < 30)   return { label: 'Sobrepeso', color: 'warning' };
  if (v < 35)   return { label: 'Obesidade grau I', color: 'error' };
  if (v < 40)   return { label: 'Obesidade grau II', color: 'error' };
  return         { label: 'Obesidade grau III', color: 'error' };
};
const idealWeight = (alt) => {
  const a = parseFloat(alt);
  if (!a || a < 1) return null;
  return `${(18.5 * a * a).toFixed(1)}–${(24.9 * a * a).toFixed(1)} kg`;
};
const classifyRCQ = (val, sexo) => {
  const v = parseFloat(val);
  const m = sexo === 'Masculino';
  if (m) {
    if (v < 0.85) return { label: 'Baixo risco', color: 'success' };
    if (v < 0.90) return { label: 'Risco moderado', color: 'warning' };
    if (v < 0.95) return { label: 'Alto risco', color: 'error' };
    return         { label: 'Risco muito alto', color: 'error' };
  }
  if (v < 0.75) return { label: 'Baixo risco', color: 'success' };
  if (v < 0.80) return { label: 'Risco moderado', color: 'warning' };
  if (v < 0.85) return { label: 'Alto risco', color: 'error' };
  return         { label: 'Risco muito alto', color: 'error' };
};
const classifyCintura = (val, sexo) => {
  const v = Number(val);
  if (!v) return null;
  const m = sexo === 'Masculino';
  if (m) {
    if (v < 94)  return { label: 'Normal', color: 'success' };
    if (v < 102) return { label: 'Atenção', color: 'warning' };
    return        { label: 'Risco CV elevado', color: 'error' };
  }
  if (v < 80)  return { label: 'Normal', color: 'success' };
  if (v < 88)  return { label: 'Atenção', color: 'warning' };
  return        { label: 'Risco CV elevado', color: 'error' };
};
const classifyPA = (sis, dia) => {
  const s = Number(sis), d = Number(dia);
  if (!s && !d) return null;
  if (s > 0 && s < 90)  return { label: 'Hipotensão — verificar', color: 'error' };
  if (s < 120 && d < 80) return { label: 'Ótima', color: 'success' };
  if (s < 130 && d < 85) return { label: 'Normal', color: 'success' };
  if (s < 140 && d < 90) return { label: 'Pré-hipertensão', color: 'warning' };
  if (s < 160 && d < 100) return { label: 'HAS grau 1', color: 'error' };
  if (s < 180 && d < 110) return { label: 'HAS grau 2', color: 'error' };
  return { label: 'HAS grau 3 — urgência', color: 'error' };
};
const classifyFC = (val) => {
  const v = Number(val);
  if (!v) return null;
  if (v < 50)  return { label: 'Bradicardia', color: 'error' };
  if (v <= 100) return { label: 'Normal', color: 'success' };
  if (v <= 150) return { label: 'Taquicardia', color: 'warning' };
  return { label: 'Taquicardia grave', color: 'error' };
};
const classifySaO2 = (val) => {
  const v = Number(val);
  if (!v) return null;
  if (v >= 95) return { label: 'Normal', color: 'success' };
  if (v >= 90) return { label: 'Atenção', color: 'warning' };
  return { label: 'Crítico — avaliar urgente', color: 'error' };
};
const classifyTemp = (val) => {
  const v = Number(val);
  if (!v) return null;
  if (v < 35.5)  return { label: 'Hipotermia', color: 'error' };
  if (v <= 36.4) return { label: 'Hipotermia leve', color: 'warning' };
  if (v <= 37.4) return { label: 'Normal', color: 'success' };
  if (v <= 38.0) return { label: 'Subfebril', color: 'warning' };
  if (v <= 39.0) return { label: 'Febre', color: 'error' };
  return { label: 'Febre alta', color: 'error' };
};
const classifyGlicemia = (val) => {
  const v = Number(val);
  if (!v) return null;
  if (v < 70)  return { label: 'Hipoglicemia', color: 'error' };
  if (v < 100) return { label: 'Normal (jejum)', color: 'success' };
  if (v < 126) return { label: 'Pré-diabetes', color: 'warning' };
  return { label: 'Provável diabetes', color: 'error' };
};
const severityOf = (color) => color === 'success' ? 'success' : color === 'warning' ? 'warning' : 'error';

// ─────────────────────────────────────────────
// CLASSIFICAÇÕES DE BIOIMPEDÂNCIA
// ─────────────────────────────────────────────
const classifyBodyFat = (val, sexo) => {
  const v = parseFloat(val); if (!v || v <= 0) return null;
  const m = sexo === 'Masculino';
  if (m) {
    if (v < 6)   return { label:'Abaixo do essencial', color:'warning' };
    if (v < 14)  return { label:'Atlético', color:'success' };
    if (v < 18)  return { label:'Fitness', color:'success' };
    if (v < 25)  return { label:'Adequado', color:'success' };
    if (v < 30)  return { label:'Sobrepeso', color:'warning' };
    return        { label:'Obesidade', color:'error' };
  }
  if (v < 10)  return { label:'Abaixo do essencial', color:'warning' };
  if (v < 21)  return { label:'Atlética', color:'success' };
  if (v < 25)  return { label:'Fitness', color:'success' };
  if (v < 32)  return { label:'Adequado', color:'success' };
  if (v < 38)  return { label:'Sobrepeso', color:'warning' };
  return        { label:'Obesidade', color:'error' };
};
const classifyVisceral = (val) => {
  const v = parseFloat(val); if (!v || v <= 0) return null;
  if (v <= 9)  return { label:`Nível ${Math.round(v)} — Normal`, color:'success' };
  if (v <= 14) return { label:`Nível ${Math.round(v)} — Elevado`, color:'warning' };
  return        { label:`Nível ${Math.round(v)} — Alto risco metabólico`, color:'error' };
};
const classifyBodyWater = (val, sexo) => {
  const v = parseFloat(val); if (!v || v <= 0) return null;
  const m = sexo === 'Masculino';
  const [lo, hi] = m ? [50, 65] : [45, 60];
  if (v < lo)  return { label:`${v}% — Abaixo (ref. ${lo}–${hi}%)`, color:'warning' };
  if (v > hi)  return { label:`${v}% — Acima (ref. ${lo}–${hi}%)`, color:'warning' };
  return        { label:`${v}% — Adequado (ref. ${lo}–${hi}%)`, color:'success' };
};
const classifyProtein = (val) => {
  const v = parseFloat(val); if (!v || v <= 0) return null;
  if (v < 16)  return { label:`${v}% — Baixo (ref. ≥16%)`, color:'warning' };
  if (v < 20)  return { label:`${v}% — Adequado`, color:'success' };
  return        { label:`${v}% — Ótimo`, color:'success' };
};
const classifyMetabolicAge = (bioAge, realAge) => {
  const b = parseInt(bioAge), r = parseInt(realAge);
  if (!b || !r) return null;
  const diff = b - r;
  if (diff <= -5) return { label:`${b} anos (${Math.abs(diff)} anos a menos — Excelente)`, color:'success' };
  if (diff <= 0)  return { label:`${b} anos (equivalente à idade real — Bom)`, color:'success' };
  if (diff <= 5)  return { label:`${b} anos (+${diff} anos — Atenção)`, color:'warning' };
  return           { label:`${b} anos (+${diff} anos — Desfavorável)`, color:'error' };
};
const classifyMuscleMass = (val, peso, sexo) => {
  const v = parseFloat(val), p = parseFloat(peso); if (!v || v <= 0) return null;
  const pct = p > 0 ? (v / p) * 100 : 0;
  const m = sexo === 'Masculino';
  if (m) {
    if (pct < 38) return { label:`${v} kg (${pct.toFixed(0)}% — Baixo)`, color:'warning' };
    if (pct < 45) return { label:`${v} kg (${pct.toFixed(0)}% — Adequado)`, color:'success' };
    return         { label:`${v} kg (${pct.toFixed(0)}% — Elevado)`, color:'success' };
  }
  if (pct < 28) return { label:`${v} kg (${pct.toFixed(0)}% — Baixo)`, color:'warning' };
  if (pct < 36) return { label:`${v} kg (${pct.toFixed(0)}% — Adequado)`, color:'success' };
  return         { label:`${v} kg (${pct.toFixed(0)}% — Elevado)`, color:'success' };
};
const classifyBoneMass = (val, peso) => {
  const v = parseFloat(val), p = parseFloat(peso); if (!v || v <= 0) return null;
  let ref = 2.0;
  if (p < 45) ref = 1.5; else if (p < 60) ref = 1.8; else if (p < 75) ref = 2.2; else ref = 2.5;
  if (v < ref * 0.85) return { label:`${v} kg — Abaixo do esperado (ref. ≈${ref} kg)`, color:'error' };
  if (v < ref)        return { label:`${v} kg — Limítrofe (ref. ≈${ref} kg)`, color:'warning' };
  return               { label:`${v} kg — Adequado (ref. ≈${ref} kg)`, color:'success' };
};
const deltaBio = (curr, prev, unit='') => {
  const c = parseFloat(curr), p = parseFloat(prev);
  if (!c || !p) return null;
  const d = (c - p).toFixed(1);
  if (d > 0) return `+${d}${unit}`;
  if (d < 0) return `${d}${unit}`;
  return `0${unit} (sem alteração)`;
};

// ─────────────────────────────────────────────
// HELPERS UI
// ─────────────────────────────────────────────
const STEP_LABELS = [
  'Identificação','Queixa Principal','Sinais Vitais','Histórico',
  'Medicamentos e Alergias','Sistemas I','Sistemas II','Sistemas III',
  'Sono e Alimentação','Emocional e Segurança','Carências e Exames','Bioimpedância','Hipóteses Diagnósticas','Protocolo Final',
];

function SectionTitle({ children }) {
  return (
    <Typography variant="subtitle1" fontWeight={700} color="primary" sx={{ mb:1.5, mt:2, borderBottom:'2px solid', borderColor:'primary.light', pb:0.5 }}>
      {children}
    </Typography>
  );
}

function CheckGroup({ items, data, onChange }) {
  return (
    <FormGroup sx={{ display:'flex', flexDirection:'row', flexWrap:'wrap', gap:0 }}>
      {items.map(([key, label]) => (
        <FormControlLabel key={key} control={
          <Checkbox size="small" checked={!!data[key]} onChange={e => onChange(key, e.target.checked)} />
        } label={<Typography variant="body2">{label}</Typography>} sx={{ minWidth:200, mr:1 }} />
      ))}
    </FormGroup>
  );
}

function ProtocolCard({ icon, title, children, color = 'primary' }) {
  return (
    <Accordion defaultExpanded sx={{ mb:1, border:`1px solid`, borderColor:`${color}.light` }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor:`${color}.50`, '&.Mui-expanded': { minHeight:48 } }}>
        <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
          {icon}
          <Typography fontWeight={700}>{title}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────
export default function AnamneseIntegrativaCompleta() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(INIT);
  const [tabProtocol, setTabProtocol] = useState(0);
  const [savedId, setSavedId] = useState(null);
  const [saveSnack, setSaveSnack] = useState({ open: false, msg: '', severity: 'success' });

  // ── Restaurar dados do paciente ativo ou rascunho ao abrir ──────────────────
  useEffect(() => {
    // 1. Paciente ativo na consulta tem prioridade
    try {
      const currentPid = localStorage.getItem('currentPatientId');
      if (currentPid) {
        const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
        const patient = anamneses.find(a => String(a.id) === String(currentPid));
        if (patient) {
          // Prioriza anamneseIntegrativaData salvo
          const savedData = patient.anamneseIntegrativaData;
          if (savedData && savedData.nome) {
            setData({ ...INIT, ...savedData });
            setSavedId(patient.id);
            setSaveSnack({ open: true, msg: `👤 Anamnese de ${savedData.nome} carregada.`, severity: 'info' });
            return;
          }
          // Sem anamneseIntegrativaData — verifica se o rascunho é deste paciente
          const draft = localStorage.getItem('anamneseIntegrativaRascunho');
          if (draft) {
            const parsed = JSON.parse(draft);
            const nomePaciente = patient.nome || patient.q01_nome || '';
            if (parsed && nomePaciente && parsed.nome === nomePaciente) {
              setData(parsed);
              setSavedId(patient.id);
              setSaveSnack({ open: true, msg: `📋 Rascunho de ${nomePaciente} restaurado.`, severity: 'info' });
              return;
            }
          }
          // Pré-preenche apenas os campos básicos do paciente ativo
          const nomePaciente = patient.nome || patient.q01_nome || '';
          if (nomePaciente) {
            setData(prev => ({
              ...INIT,
              nome: nomePaciente,
              nascimento: patient.q02_nascimento || '',
              idade: patient.q03_idade || '',
              sexo: patient.q04_sexo || '',
            }));
            setSavedId(patient.id);
            setSaveSnack({ open: true, msg: `👤 Paciente em consulta: ${nomePaciente}. Preencha a anamnese completa.`, severity: 'info' });
            return;
          }
        }
      }
    } catch {}
    // 2. Sem paciente ativo — restaura último rascunho
    try {
      const draft = localStorage.getItem('anamneseIntegrativaRascunho');
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed && parsed.nome !== undefined) {
          setData(parsed);
          setSaveSnack({ open: true, msg: '📋 Rascunho anterior restaurado automaticamente.', severity: 'info' });
        }
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Auto-save rascunho a cada alteração ──────────────────────
  useEffect(() => {
    try { localStorage.setItem('anamneseIntegrativaRascunho', JSON.stringify(data)); } catch {}
  }, [data]);

  const handleSaveInteragente = () => {
    if (!data.nome.trim()) {
      setSaveSnack({ open: true, msg: 'Preencha o nome do interagente (Etapa 1) antes de salvar.', severity: 'warning' });
      return;
    }
    try {
      const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const now = new Date();
      const nowISO = now.toISOString();
      // Data local (evita offset UTC que faz aparecer dia errado no Brasil)
      const pad = (n) => String(n).padStart(2, '0');
      const localDate = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
      const localTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
      if (savedId) {
        const idx = anamneses.findIndex(a => String(a.id) === String(savedId));
        if (idx !== -1) {
          anamneses[idx] = {
            ...anamneses[idx],
            q01_nome: data.nome.trim(),
            q02_data_nasc: data.dataNasc || '',
            q03_idade: data.idade,
            q04_sexo: data.sexo,
            q05_telefone: data.telefone,
            q05_queixa_principal: data.queixaPrincipal,
            anamnesisIntegrativa: true,
            anamneseIntegrativaData: data,
            anamneseIntegrativaProtocol: protocol,
            updatedAt: nowISO,
          };
          localStorage.setItem('anamneses', JSON.stringify(anamneses));
          window.dispatchEvent(new CustomEvent('anamneses:updated'));
          setSaveSnack({ open: true, msg: `✅ ${data.nome.trim()} atualizado com sucesso!`, severity: 'success' });
          return;
        }
      }
      const newId = Date.now();
      const newEntry = {
        id: newId,
        q01_nome: data.nome.trim(),
        q02_data_nasc: data.dataNasc || '',
        q03_idade: data.idade,
        q04_sexo: data.sexo,
        q05_telefone: data.telefone,
        q05_queixa_principal: data.queixaPrincipal,
        q14_tipo_consulta: '1ª Consulta',
        createdAt: nowISO,
        date: localDate,
        time: localTime,
        anamnesisIntegrativa: true,
        anamneseIntegrativaData: data,
        anamneseIntegrativaProtocol: protocol,
      };
      anamneses.push(newEntry);
      localStorage.setItem('anamneses', JSON.stringify(anamneses));
      localStorage.setItem('currentPatientId', String(newId));
      window.dispatchEvent(new CustomEvent('anamneses:updated'));
      setSavedId(newId);
      setSaveSnack({ open: true, msg: `✅ ${data.nome.trim()} salvo nos Interagentes!`, severity: 'success' });
    } catch (e) {
      setSaveSnack({ open: true, msg: '❌ Erro ao salvar. Tente novamente.', severity: 'error' });
    }
  };

  const set = (key, val) => setData(p => ({ ...p, [key]: val }));
  const chk = (key, val) => setData(p => ({ ...p, [key]: val }));

  const protocol = useMemo(() => {
    try { return generateProtocol(data); }
    catch (e) { console.error('generateProtocol error:', e); return null; }
  }, [data]);

  // Detecção de perfis para plano nutricional
  const getNutricionalProfiles = () => {
    const p = [];
    if (data.insonia || data.depressao || data.burnout_adrenal) p.push('BURNOUT');
    if (data.ansiedade && !p.includes('BURNOUT')) p.push('ANSIOSO');
    if (data.intestino_preso || data.gases || data.diarreia || data.azia) p.push('DISBIOSE');
    if (data.artrite_artralgia || data.colesterol_trig || data.diabetes_prediabetes || data.obesidade_resistencia_insulinica) p.push('INFLAMATORIO');
    if (p.length === 0) p.push('ATENCAO_GERAL');
    return p;
  };

  const handlePrintProtocoloTimbre = async () => {
    if (!protocol) return;
    try {
      const bodyHtml = buildProtocolHtmlForPrint(data, protocol);
      const html = await buildLetterheadHtml({ title: 'Protocolo Terapêutico Integrativo', bodyHtml });
      openPrintWindow(html, true);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePrintNutricional = async () => {
    const nutProfiles = getNutricionalProfiles();
    try {
      const { planilhas, cardapios, receitas } = getNutritionalPlanForProfiles(nutProfiles);
      const restricoes = buildRestricoesDietéticas(data);
      const cardapiosAdaptados = adaptCardapiosToRestrictions(cardapios, restricoes);
      const receitasAdaptadas = adaptReceitasToRestrictions(receitas, restricoes);
      const bodyHtml = buildNutricionalHtmlForPrint(data.nome || 'Paciente', nutProfiles, planilhas, cardapiosAdaptados, receitasAdaptadas, restricoes);
      const html = await buildLetterheadHtml({ title: 'Plano Nutricional Integrativo', bodyHtml });
      openPrintWindow(html, true);
    } catch (e) {
      console.error(e);
    }
  };

  const buildCompleteExportHtml = async () => {
    if (!protocol) return null;
    const nutProfiles = getNutricionalProfiles();
    const { planilhas, cardapios, receitas } = getNutritionalPlanForProfiles(nutProfiles);
    const restricoes = buildRestricoesDietéticas(data);
    const cardapiosAdaptados = adaptCardapiosToRestrictions(cardapios, restricoes);
    const receitasAdaptadas = adaptReceitasToRestrictions(receitas, restricoes);
    const bodyHtml = buildCompleteProtocolHtmlForPrint(
      data, protocol, nutProfiles, planilhas, cardapiosAdaptados, receitasAdaptadas, restricoes,
    );
    return buildLetterheadHtml({ title: 'Protocolos Integrativos Completos', bodyHtml });
  };

  const handlePrintCompleteProtocols = async () => {
    try {
      const html = await buildCompleteExportHtml();
      if (html) openPrintWindow(html, true);
    } catch (e) {
      console.error('Erro ao imprimir protocolos completos:', e);
    }
  };

  const handleDownloadCompleteProtocols = async () => {
    try {
      const html = await buildCompleteExportHtml();
      if (html) {
        const safeName = (data.nome || 'paciente').replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '');
        await downloadPdfFromHtml(html, `protocolos_integrativos_${safeName || 'paciente'}.pdf`);
      }
    } catch (e) {
      console.error('Erro ao baixar protocolos completos:', e);
    }
  };

  // Cálculos automáticos
  const imc = useMemo(() => {
    const p = parseFloat(data.peso); const a = parseFloat(data.altura);
    if (p > 0 && a > 0) return (p / (a * a)).toFixed(1);
    return null;
  }, [data.peso, data.altura]);
  const rcq = useMemo(() => {
    const c = parseFloat(data.cintura); const q = parseFloat(data.quadril);
    if (c > 0 && q > 0) return (c / q).toFixed(2);
    return null;
  }, [data.cintura, data.quadril]);

  const hipotesesSugeridas = useMemo(() => analyzeHipoteses(data), [data]);

  const CK = ({ k, label }) => (
    <FormControlLabel control={<Checkbox size="small" checked={!!data[k]} onChange={e => chk(k, e.target.checked)} />}
      label={<Typography variant="body2">{label}</Typography>} sx={{ minWidth:190, mr:0.5 }} />
  );

  const RO = ({ name, value, label, currentVal, onChange }) => (
    <FormControlLabel value={value} control={<Radio size="small" checked={currentVal === value} onChange={() => onChange(value)} />}
      label={<Typography variant="body2">{label}</Typography>} />
  );

  // ── STEP 0: Identificação ──────────────────
  const renderStep0 = () => {
    const imcClass  = imc ? classifyIMC(imc) : null;
    const rcqClass  = (rcq && data.sexo) ? classifyRCQ(rcq, data.sexo) : null;
    const cintClass = data.cintura ? classifyCintura(data.cintura, data.sexo) : null;
    const pesoIdeal = data.altura ? idealWeight(data.altura) : null;
    return (
      <Box>
        <SectionTitle>1. Identificação do Paciente</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" label="Nome completo" value={data.nome} onChange={e => set('nome', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth size="small" label="Data de nascimento" placeholder="DD/MM/AAAA"
              value={data.dataNasc} inputProps={{ maxLength: 10 }}
              onChange={e => {
                const masked = maskDate(e.target.value);
                const age = calcAge(masked);
                setData(p => ({ ...p, dataNasc: masked, ...(age ? { idade: age } : {}) }));
              }} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth size="small" label="Idade" value={data.idade}
              onChange={e => set('idade', e.target.value)}
              InputProps={{ endAdornment: data.idade ? <InputAdornment position="end">anos</InputAdornment> : undefined }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Sexo</InputLabel>
              <Select label="Sexo" value={data.sexo} onChange={e => set('sexo', e.target.value)}>
                {['Feminino','Masculino','Não-binário','Prefiro não informar'].map(v => (
                  <MenuItem key={v} value={v}>{v}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth size="small" label="Telefone" placeholder="(00) 00000-0000"
              value={data.telefone} inputProps={{ maxLength: 15 }}
              onChange={e => set('telefone', maskPhone(e.target.value))} />
          </Grid>
          {[['profissao','Profissão'],['cidade','Cidade'],['estadoCivil','Estado Civil']].map(([k,l]) => (
            <Grid item xs={12} sm={4} key={k}>
              <TextField fullWidth size="small" label={l} value={data[k]} onChange={e => set(k, e.target.value)} />
            </Grid>
          ))}
          <Grid item xs={6} sm={3}>
            <TextField fullWidth size="small" label="Peso" type="number" value={data.peso}
              onChange={e => set('peso', e.target.value)}
              InputProps={{ endAdornment: <InputAdornment position="end">kg</InputAdornment> }} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth size="small" label="Altura" type="number" value={data.altura}
              onChange={e => set('altura', e.target.value)}
              InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth size="small" label="Cintura" type="number" value={data.cintura}
              onChange={e => set('cintura', e.target.value)}
              InputProps={{ endAdornment: <InputAdornment position="end">cm</InputAdornment> }} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth size="small" label="Quadril" type="number" value={data.quadril}
              onChange={e => set('quadril', e.target.value)}
              InputProps={{ endAdornment: <InputAdornment position="end">cm</InputAdornment> }} />
          </Grid>
          {imc && imcClass && (
            <Grid item xs={12} sm={6}>
              <Alert severity={severityOf(imcClass.color)} sx={{ py: 0.5 }}>
                <strong>IMC: {imc} kg/m²</strong> — {imcClass.label}
                {pesoIdeal && <> &nbsp;·&nbsp; Peso ideal: {pesoIdeal}</>}
              </Alert>
            </Grid>
          )}
          {rcq && rcqClass && (
            <Grid item xs={12} sm={3}>
              <Alert severity={severityOf(rcqClass.color)} sx={{ py: 0.5 }}>
                <strong>RCQ: {rcq}</strong> — {rcqClass.label}
              </Alert>
            </Grid>
          )}
          {cintClass && (
            <Grid item xs={12} sm={3}>
              <Alert severity={severityOf(cintClass.color)} sx={{ py: 0.5 }}>
                <strong>Cintura: {data.cintura} cm</strong> — {cintClass.label}
              </Alert>
            </Grid>
          )}
        </Grid>

        {/* ── Dados Socioeconômicos e de Contato (extras) ── */}
        <Box sx={{ mt: 2 }}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1565c0', mb: 1.5 }}>
            📋 Dados Complementares
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Identidade de Gênero</InputLabel>
                <Select label="Identidade de Gênero" value={data.genero} onChange={e => set('genero', e.target.value)}>
                  {['Mulher cisgênero','Homem cisgênero','Mulher transgênero','Homem transgênero','Não-binário','Outro','Prefiro não informar'].map(v => (
                    <MenuItem key={v} value={v}>{v}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Escolaridade</InputLabel>
                <Select label="Escolaridade" value={data.escolaridade} onChange={e => set('escolaridade', e.target.value)}>
                  {['Fundamental incompleto','Fundamental completo','Médio incompleto','Médio completo','Superior incompleto','Superior completo','Pós-graduação'].map(v => (
                    <MenuItem key={v} value={v}>{v}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Renda Familiar</InputLabel>
                <Select label="Renda Familiar" value={data.renda} onChange={e => set('renda', e.target.value)}>
                  {['Até 1 SM','1–3 SM','3–6 SM','6–10 SM','Acima de 10 SM','Prefiro não informar'].map(v => (
                    <MenuItem key={v} value={v}>{v}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth size="small" label="E-mail" value={data.emailPaciente} onChange={e => set('emailPaciente', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth size="small" label="Como nos conheceu?" value={data.indicacao} onChange={e => set('indicacao', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth size="small" label="Religião / Espiritualidade" value={data.religiaoEsp} onChange={e => set('religiaoEsp', e.target.value)} />
            </Grid>
          </Grid>
        </Box>

        {/* ── Dados do Oxímetro e Pressão Arterial ── */}
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#b71c1c', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            📟 Oxímetro e Pressão Arterial
          </Typography>
          <Grid container spacing={2}>
            {/* PA Sistólica */}
            <Grid item xs={6} sm={3}>
              <TextField fullWidth size="small" label="PA Sistólica" type="number" value={data.paSis || ''}
                onChange={e => set('paSis', e.target.value)}
                InputProps={{ endAdornment: <InputAdornment position="end">mmHg</InputAdornment> }} />
            </Grid>
            {/* PA Diastólica */}
            <Grid item xs={6} sm={3}>
              <TextField fullWidth size="small" label="PA Diastólica" type="number" value={data.paDia || ''}
                onChange={e => set('paDia', e.target.value)}
                InputProps={{ endAdornment: <InputAdornment position="end">mmHg</InputAdornment> }} />
            </Grid>
            {/* Resultado PA */}
            {classifyPA(data.paSis, data.paDia) && (() => { const c = classifyPA(data.paSis, data.paDia); return (
              <Grid item xs={12} sm={6}>
                <Alert severity={severityOf(c.color)} sx={{ py: 0.5 }}>
                  <strong>PA: {data.paSis}/{data.paDia} mmHg</strong> — {c.label}
                </Alert>
              </Grid>
            ); })()}
            {/* FC / Pulsação */}
            <Grid item xs={6} sm={3}>
              <TextField fullWidth size="small" label="Pulsação / FC" type="number" value={data.fc || ''}
                onChange={e => set('fc', e.target.value)}
                InputProps={{ endAdornment: <InputAdornment position="end">bpm</InputAdornment> }} />
            </Grid>
            {/* Resultado FC */}
            {classifyFC(data.fc) && (() => { const c = classifyFC(data.fc); return (
              <Grid item xs={6} sm={3}>
                <Alert severity={severityOf(c.color)} sx={{ py: 0.5 }}>
                  <strong>FC: {data.fc} bpm</strong> — {c.label}
                </Alert>
              </Grid>
            ); })()}
            {/* SpO2 / Oxigenação */}
            <Grid item xs={6} sm={3}>
              <TextField fullWidth size="small" label="Oxigenação (SpO₂)" type="number" value={data.sao2 || ''}
                onChange={e => set('sao2', e.target.value)}
                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} />
            </Grid>
            {/* Resultado SpO2 */}
            {classifySaO2(data.sao2) && (() => { const c = classifySaO2(data.sao2); return (
              <Grid item xs={6} sm={3}>
                <Alert severity={severityOf(c.color)} sx={{ py: 0.5 }}>
                  <strong>SpO₂: {data.sao2}%</strong> — {c.label}
                </Alert>
              </Grid>
            ); })()}
          </Grid>

          {/* Diagnóstico detalhado para cada valor preenchido */}
          {(classifyPA(data.paSis, data.paDia) || classifyFC(data.fc) || classifySaO2(data.sao2)) && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 1 }}>
                Diagnóstico clínico
              </Typography>

              {/* Diagnóstico PA */}
              {classifyPA(data.paSis, data.paDia) && (() => {
                const c = classifyPA(data.paSis, data.paDia);
                const details = {
                  'Hipotensão — verificar': {
                    icon: '⬇️',
                    desc: 'Pressão arterial abaixo do normal. Pode causar tontura, fadiga e desmaio. Investigar desidratação, deficiência de B12, hipotireoidismo ou medicamentos hipotensores.',
                    conduta: 'Avaliar hidratação, eletrólitos, função tireoidiana. Considerar suporte com magnésio, B12 e vitamina C.'
                  },
                  'Ótima': {
                    icon: '✅',
                    desc: 'Pressão arterial ideal (< 120/80 mmHg). Associada ao menor risco cardiovascular.',
                    conduta: 'Manter estilo de vida saudável: dieta equilibrada, exercícios regulares, controle de estresse.'
                  },
                  'Normal': {
                    icon: '✅',
                    desc: 'Pressão arterial dentro da faixa normal aceitável (< 130/85 mmHg).',
                    conduta: 'Manter hábitos saudáveis e monitorar periodicamente.'
                  },
                  'Pré-hipertensão': {
                    icon: '⚠️',
                    desc: 'Pressão limítrofe (130–139/85–89 mmHg). Alerta para mudança de estilo de vida antes de evoluir para hipertensão.',
                    conduta: 'Reduzir sódio, aumentar potássio (banana, abacate), magnésio 400 mg/dia. Exercícios aeróbicos 150 min/semana. Chá de hibisco.'
                  },
                  'HAS grau 1': {
                    icon: '🔴',
                    desc: 'Hipertensão estágio 1 (140–159/90–99 mmHg). Risco cardiovascular elevado.',
                    conduta: 'Encaminhar para avaliação médica. Dieta DASH, restrição de sódio (<1,5 g/dia), CoQ10 200 mg, ômega-3 2–3 g, alho 600 mg. Chá de hibisco.'
                  },
                  'HAS grau 2': {
                    icon: '🔴',
                    desc: 'Hipertensão estágio 2 (160–179/100–109 mmHg). Risco cardiovascular muito elevado. Pode requerer medicação.',
                    conduta: 'Avaliação médica urgente. Medidas intensivas de estilo de vida + suporte integrativo.'
                  },
                  'HAS grau 3 — urgência': {
                    icon: '🚨',
                    desc: 'Hipertensão grave (≥ 180/110 mmHg). Risco de emergência hipertensiva (AVC, infarto). Atendimento imediato.',
                    conduta: 'ENCAMINHAR PARA EMERGÊNCIA se acompanhado de dor no peito, cefaleia intensa, alteração visual ou confusão mental.'
                  },
                };
                const d = details[c.label] || { icon: '📊', desc: c.label, conduta: '' };
                return (
                  <Box sx={{ mt: 1.5, p: 2, bgcolor: c.color === 'success' ? '#e8f5e9' : c.color === 'warning' ? '#fff8e1' : '#ffebee', borderRadius: 2, border: `1px solid ${c.color === 'success' ? '#a5d6a7' : c.color === 'warning' ? '#ffe082' : '#ef9a9a'}` }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>{d.icon} Pressão Arterial: {data.paSis}/{data.paDia} mmHg — {c.label}</Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>{d.desc}</Typography>
                    {d.conduta && <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#555' }}><strong>Conduta:</strong> {d.conduta}</Typography>}
                  </Box>
                );
              })()}

              {/* Diagnóstico FC */}
              {classifyFC(data.fc) && (() => {
                const c = classifyFC(data.fc);
                const details = {
                  'Bradicardia': {
                    icon: '⬇️',
                    desc: 'Frequência cardíaca abaixo de 50 bpm. Pode ser normal em atletas; em sedentários, investigar hipotireoidismo, distúrbios eletrolíticos ou uso de beta-bloqueadores.',
                    conduta: 'Avaliar TSH, eletrólitos. CoQ10, L-carnitina, ginseng se sintomático. Encaminhar se < 50 bpm com tontura ou síncope.'
                  },
                  'Normal': {
                    icon: '✅',
                    desc: 'Frequência cardíaca de repouso saudável (50–100 bpm). Valores mais baixos indicam melhor condicionamento cardiovascular.',
                    conduta: 'Manter atividade física regular, ômega-3, magnésio e gerenciamento de estresse.'
                  },
                  'Taquicardia': {
                    icon: '⚠️',
                    desc: 'Frequência cardíaca elevada (101–150 bpm). Pode indicar ansiedade, desidratação, anemia, hipertireoidismo ou cafeína excessiva.',
                    conduta: 'Avaliar hidratação, hemograma, TSH. Reduzir cafeína. Magnésio 400 mg, taurina 2–3 g, técnicas de relaxamento. Encaminhar se persistente.'
                  },
                  'Taquicardia grave': {
                    icon: '🚨',
                    desc: 'Frequência cardíaca > 150 bpm em repouso. Pode indicar arritmia, crise hipertireoidiana ou descompensação cardíaca.',
                    conduta: 'ENCAMINHAR para avaliação cardiológica imediata. ECG urgente.'
                  },
                };
                const d = details[c.label] || { icon: '❤️', desc: c.label, conduta: '' };
                return (
                  <Box sx={{ mt: 1.5, p: 2, bgcolor: c.color === 'success' ? '#e8f5e9' : c.color === 'warning' ? '#fff8e1' : '#ffebee', borderRadius: 2, border: `1px solid ${c.color === 'success' ? '#a5d6a7' : c.color === 'warning' ? '#ffe082' : '#ef9a9a'}` }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>{d.icon} Pulsação / FC: {data.fc} bpm — {c.label}</Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>{d.desc}</Typography>
                    {d.conduta && <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#555' }}><strong>Conduta:</strong> {d.conduta}</Typography>}
                  </Box>
                );
              })()}

              {/* Diagnóstico SpO2 */}
              {classifySaO2(data.sao2) && (() => {
                const c = classifySaO2(data.sao2);
                const details = {
                  'Normal': {
                    icon: '✅',
                    desc: 'Oxigenação sanguínea adequada (≥ 95%). Sistema respiratório e circulatório funcionando bem.',
                    conduta: 'Manter exercícios aeróbicos, respiração diafragmática, ambiente ventilado. Antioxidantes: vitamina C, E, selênio.'
                  },
                  'Atenção': {
                    icon: '⚠️',
                    desc: 'Saturação levemente reduzida (90–94%). Pode indicar asma, bronquite, anemia ou tabagismo.',
                    conduta: 'Avaliar função pulmonar e hemograma. NAC 600 mg 2×/dia, vitamina D3, quercetina. Exercícios respiratórios. Parar de fumar.'
                  },
                  'Crítico — avaliar urgente': {
                    icon: '🚨',
                    desc: 'Hipoxemia grave (< 90%). EMERGÊNCIA RESPIRATÓRIA. Pode indicar pneumonia, embolia pulmonar, DPOC descompensado, insuficiência cardíaca.',
                    conduta: 'ENCAMINHAR para atendimento de urgência imediatamente. Evitar esforços físicos.'
                  },
                };
                const d = details[c.label] || { icon: '🫁', desc: c.label, conduta: '' };
                return (
                  <Box sx={{ mt: 1.5, p: 2, bgcolor: c.color === 'success' ? '#e8f5e9' : c.color === 'warning' ? '#fff8e1' : '#ffebee', borderRadius: 2, border: `1px solid ${c.color === 'success' ? '#a5d6a7' : c.color === 'warning' ? '#ffe082' : '#ef9a9a'}` }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>{d.icon} Oxigenação (SpO₂): {data.sao2}% — {c.label}</Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>{d.desc}</Typography>
                    {d.conduta && <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#555' }}><strong>Conduta:</strong> {d.conduta}</Typography>}
                  </Box>
                );
              })()}
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  // ── STEP 1: Queixa Principal ──────────────
  const renderStep1 = () => (
    <Box>
      <SectionTitle>2. Queixa Principal</SectionTitle>
      <TextField fullWidth multiline rows={3} size="small" label="Qual o principal motivo da consulta?" value={data.queixaPrincipal} onChange={e => set('queixaPrincipal', e.target.value)} sx={{ mb:2 }} />
      <SectionTitle>Há quanto tempo?</SectionTitle>
      <FormGroup row>
        {[['tempoDias','Dias'],['tempoSemanas','Semanas'],['tempoMeses','Meses'],['tempoAnos','Anos']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>O problema está:</SectionTitle>
      <FormGroup row>
        {[['problemaMelhorando','Melhorando'],['problemaIgual','Igual'],['problemaPiorando','Piorando'],['problemaVaiVolta','Vai e volta']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>O que piora?</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['pioraEstresse','Estresse'],['pioraAlim','Alimentação'],['pioraFrio','Frio'],['pioraCalor','Calor'],
          ['pioraEsforco','Esforço físico'],['pioraSono','Sono ruim'],['pioraEmocoes','Emoções'],['pioraOther','Outro']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>O que melhora?</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['melhoraRepouso','Repouso'],['melhoraAlim','Alimentação'],['melhoraMovimento','Movimento'],
          ['melhoraCalor','Calor'],['melhoraFrio','Frio'],['melhoraMed','Medicamento'],['melhoraOracaoMedit','Oração/meditação'],['melhoraOther','Outro']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
    </Box>
  );

  // ── STEP 2: Sinais Vitais ──────────────────
  const renderStep2 = () => (
    <Box>
      <SectionTitle>3. Sinais Vitais</SectionTitle>
      <Grid container spacing={2} sx={{ mb:2 }}>
        {/* Pressão Arterial */}
        <Grid item xs={6} sm={3}>
          <TextField fullWidth size="small" label="PA Sistólica" type="number" value={data.paSis}
            onChange={e => set('paSis', e.target.value)}
            InputProps={{ endAdornment: <InputAdornment position="end">mmHg</InputAdornment> }} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField fullWidth size="small" label="PA Diastólica" type="number" value={data.paDia}
            onChange={e => set('paDia', e.target.value)}
            InputProps={{ endAdornment: <InputAdornment position="end">mmHg</InputAdornment> }} />
        </Grid>
        {classifyPA(data.paSis, data.paDia) && (() => { const c = classifyPA(data.paSis, data.paDia); return (
          <Grid item xs={12} sm={6}>
            <Alert severity={severityOf(c.color)} sx={{ py:0.5 }}>
              <strong>PA {data.paSis}/{data.paDia} mmHg</strong> — {c.label}
            </Alert>
          </Grid>
        ); })()}
        {/* Pressão de Pulso (Luciana Caxito) */}
        {data.paSis && data.paDia && (() => {
          const pp = Number(data.paSis) - Number(data.paDia);
          if (isNaN(pp) || pp <= 0) return null;
          let ppLabel, ppSeverity;
          if (pp < 40) { ppLabel = '✅ Saudável (< 40 mmHg)'; ppSeverity = 'success'; }
          else if (pp < 50) { ppLabel = '⚠️ Início de rigidez arterial (40–49 mmHg)'; ppSeverity = 'warning'; }
          else if (pp < 60) { ppLabel = '⚠️ Baixa elasticidade arterial (50–59 mmHg)'; ppSeverity = 'warning'; }
          else { ppLabel = '🔴 Alta rigidez arterial (≥ 60 mmHg)'; ppSeverity = 'error'; }
          return (
            <Grid item xs={12} sm={6}>
              <Alert severity={ppSeverity} sx={{ py:0.5 }}>
                <strong>Pressão de Pulso: {pp} mmHg</strong> — {ppLabel}
                {pp >= 50 && <Typography variant="caption" display="block" sx={{ mt:0.5 }}>
                  Associada a maior risco cardiovascular. Avaliar saúde arterial e perfil lipídico.
                </Typography>}
              </Alert>
            </Grid>
          );
        })()}
        {/* Frequência Cardíaca */}
        <Grid item xs={6} sm={3}>
          <TextField fullWidth size="small" label="Frequência Cardíaca" type="number" value={data.fc}
            onChange={e => set('fc', e.target.value)}
            InputProps={{ endAdornment: <InputAdornment position="end">bpm</InputAdornment> }} />
        </Grid>
        {classifyFC(data.fc) && (() => { const c = classifyFC(data.fc); return (
          <Grid item xs={6} sm={3}>
            <Alert severity={severityOf(c.color)} sx={{ py:0.5 }}>
              <strong>FC: {data.fc} bpm</strong> — {c.label}
            </Alert>
          </Grid>
        ); })()}
        {/* Saturação O₂ */}
        <Grid item xs={6} sm={3}>
          <TextField fullWidth size="small" label="Saturação O₂" type="number" value={data.sao2}
            onChange={e => set('sao2', e.target.value)}
            InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} />
        </Grid>
        {classifySaO2(data.sao2) && (() => { const c = classifySaO2(data.sao2); return (
          <Grid item xs={6} sm={3}>
            <Alert severity={severityOf(c.color)} sx={{ py:0.5 }}>
              <strong>SpO₂: {data.sao2}%</strong> — {c.label}
            </Alert>
          </Grid>
        ); })()}
        {/* Temperatura */}
        <Grid item xs={6} sm={3}>
          <TextField fullWidth size="small" label="Temperatura" type="number" value={data.temp}
            onChange={e => set('temp', e.target.value)}
            InputProps={{ endAdornment: <InputAdornment position="end">°C</InputAdornment> }} />
        </Grid>
        {classifyTemp(data.temp) && (() => { const c = classifyTemp(data.temp); return (
          <Grid item xs={6} sm={3}>
            <Alert severity={severityOf(c.color)} sx={{ py:0.5 }}>
              <strong>Temp: {data.temp}°C</strong> — {c.label}
            </Alert>
          </Grid>
        ); })()}
        {/* Glicemia */}
        <Grid item xs={6} sm={3}>
          <TextField fullWidth size="small" label="Glicemia capilar" type="number" value={data.glicemia}
            onChange={e => set('glicemia', e.target.value)}
            InputProps={{ endAdornment: <InputAdornment position="end">mg/dL</InputAdornment> }} />
        </Grid>
        {classifyGlicemia(data.glicemia) && (() => { const c = classifyGlicemia(data.glicemia); return (
          <Grid item xs={6} sm={3}>
            <Alert severity={severityOf(c.color)} sx={{ py:0.5 }}>
              <strong>Glicemia: {data.glicemia} mg/dL</strong> — {c.label}
            </Alert>
          </Grid>
        ); })()}
      </Grid>
      <SectionTitle>Alertas adicionais (marque se presente)</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['alertaDorPeito','Dor no peito'],['alertaFaltaAr','Falta de ar'],['alertaConfusao','Confusão mental'],['alertaDesmaio','Desmaio recente']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>4. Nível Geral de Saúde</SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Energia diária (0=Nenhuma … 5=Excelente)</Typography></FormLabel>
          <Slider value={Number(data.energia)} min={0} max={5} step={1} marks valueLabelDisplay="on" onChange={(_, v) => set('energia', String(v))} sx={{ mt:2 }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Dor atual (0=Sem dor … 10=Insuportável)</Typography></FormLabel>
          <Slider value={Number(data.dorAtual)} min={0} max={10} step={1} marks valueLabelDisplay="on" onChange={(_, v) => set('dorAtual', String(v))} sx={{ mt:2 }} />
        </Grid>
        <Grid item xs={12}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Disposição ao acordar</Typography></FormLabel>
          <FormGroup row>
            {[['cansado','Acorda cansado'],['razoavel','Razoável'],['bem','Acorda bem'],['disposto','Muito disposto']].map(([v,l]) => (
              <FormControlLabel key={v} control={<Radio size="small" checked={data.disposicao===v} onChange={() => set('disposicao',v)} />} label={<Typography variant="body2">{l}</Typography>} />
            ))}
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Locais de dor</Typography></FormLabel>
          <FormGroup row sx={{ flexWrap:'wrap' }}>
            {[['dorCabeca','Cabeça'],['dorPescoco','Pescoço'],['dorOmbros','Ombros'],['dorCostas','Costas'],['dorLombar','Lombar'],
              ['dorQuadris','Quadris'],['dorJoelhos','Joelhos'],['dorArticulacoes','Articulações'],['dorMusculos','Músculos'],
              ['dorAbdome','Abdome'],['dorGeneralizada','Generalizada'],['semDor','Sem dor']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );

  // ── STEP 3: Histórico ─────────────────────
  const renderStep3 = () => (
    <Box>
      <SectionTitle>5. Histórico Familiar</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['hfHipertensao','Hipertensão'],['hfDiabetes','Diabetes'],['hfInfarto','Infarto'],['hfAvc','AVC'],
          ['hfCancer','Câncer'],['hfAlzheimer','Alzheimer'],['hfParkinson','Parkinson'],['hfDepressao','Depressão'],
          ['hfAnsiedade','Ansiedade'],['hfOsteoporose','Osteoporose'],['hfArtrite','Artrite/reumatismo'],['hfObesidade','Obesidade'],
          ['hfTireoide','Tireoide'],['hfAutoimune','Autoimune'],['hfAlergias','Alergias'],['hfRenal','Doença renal'],['hfHepatica','Doença hepática']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>Pais vivos?</SectionTitle>
      <FormGroup row>
        {[['paisAmbos','Ambos vivos'],['paisSoPai','Só pai'],['paisSoMae','Só mãe'],['paisNenhum','Nenhum']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>6. Histórico Pessoal (já teve ou tem)</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['hpHipertensao','Hipertensão'],['hpDiab1','Diabetes tipo 1'],['hpDiab2','Diabetes tipo 2'],['hpHipoglicemia','Hipoglicemia'],
          ['hpHipotireoidismo','Hipotireoidismo'],['hpHipertireoidismo','Hipertireoidismo'],['hpAsma','Asma'],['hpBronquite','Bronquite'],
          ['hpRinite','Rinite/sinusite'],['hpGastrite','Gastrite/refluxo'],['hpEsteatose','Esteatose hepática'],['hpCalculoRenal','Cálculo renal'],
          ['hpInfeccaoUrinaria','ITU recorrente'],['hpFibromialgia','Fibromialgia'],['hpArtrite','Artrite'],['hpLupus','Lúpus'],
          ['hpPsoriase','Psoríase'],['hpEndometriose','Endometriose'],['hpSop','SOP'],
          ['hpAnsiedade','Ansiedade'],['hpDepressao','Depressão'],['hpPanico','Síndrome do pânico'],['hpNenhuma','Nenhuma']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>7. Cirurgias</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['cirApendice','Apêndice'],['cirVesicula','Vesícula'],['cirHernia','Hérnia'],['cirCesarea','Cesárea'],
          ['cirGineco','Ginecológica'],['cirUrolo','Urológica'],['cirCardiaca','Cardíaca'],['cirOrtopedica','Ortopédica'],
          ['cirCatarata','Catarata'],['cirAmigdalas','Amígdalas'],['cirBariatrica','Bariátrica'],['cirOutra','Outra'],['cirNunca','Nunca']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <Box sx={{ mt:1, display:'flex', gap:2, alignItems:'center', flexWrap:'wrap' }}>
        <FormLabel><Typography variant="body2" fontWeight={600}>Internação:</Typography></FormLabel>
        {[['internadoSim','Sim'],['internadoNao','Não']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
        <TextField size="small" label="Motivo da internação" value={data.motivoInternacao} onChange={e => set('motivoInternacao', e.target.value)} sx={{ flex:1, minWidth:200 }} />
      </Box>
    </Box>
  );

  // ── STEP 4: Medicamentos e Alergias ────────
  const renderStep4 = () => (
    <Box>
      <SectionTitle>8. Medicamentos em Uso</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['medAntiHipert','Anti-hipertensivo'],['medAntidiabet','Antidiabético'],['medInsulina','Insulina'],['medEstatina','Estatina'],
          ['medAnticoag','Anticoagulante'],['medAntidepress','Antidepressivo'],['medAnsiolitico','Ansiolítico'],['medCorticoide','Corticoide'],
          ['medAntiInflam','Anti-inflamatório'],['medHormTireoide','Hormônio tireoidiano'],['medAnticoncepc','Anticoncepcional'],
          ['medReposHorm','Reposição hormonal'],['medAntiAcido','Antiácido/omeprazol'],['medAnalgesico','Analgésico freq.'],
          ['medSuplementos','Suplementos'],['medFitoterapicos','Fitoterápicos'],['medNao','Não uso']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <TextField fullWidth multiline rows={2} size="small" label="Nome, dose e horário dos medicamentos" value={data.medDetalhe} onChange={e => set('medDetalhe', e.target.value)} sx={{ mt:2 }} />
      <SectionTitle>9. Alergias</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['alerMedicamentos','Medicamentos'],['alerAlimentos','Alimentos'],['alerPoeira','Poeira'],['alerGramineas','Pólen/gramíneas'],
          ['alerAnimais','Pelo de animais'],['alerLatex','Látex'],['alerInsetos','Picadas de insetos'],['alerCosmeticos','Cosméticos'],['alerNao','Não tenho']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>Intolerâncias</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['intolLactose','Lactose'],['intolGluten','Glúten'],['intolOvo','Ovo'],['intolSoja','Soja'],
          ['intolCafe','Café'],['intolCorantes','Corantes'],['intolConservantes','Conservantes'],['intolNenhuma','Nenhuma']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <Divider sx={{ my:2 }} />
      <Alert severity="info" sx={{ mb:1.5 }}>
        <Typography variant="body2" fontWeight={700}>🥗 Restrições Dietéticas e Preferências Alimentares</Typography>
        <Typography variant="caption">Estas informações serão usadas para adaptar o cardápio e as receitas geradas no Plano Nutricional.</Typography>
      </Alert>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Tipo de Dieta / Estilo Alimentar:</Typography></FormLabel>
          <FormGroup row sx={{ flexWrap:'wrap' }}>
            {[['dietVegetariano','Vegetariano (sem carne/peixe)'],['dietVegano','Vegano (sem produtos animais)'],
              ['dietOvolactovegetariano','Ovolactovegetariano'],['dietSemCarne','Sem carnes vermelhas'],
              ['dietMediterranea','Mediterrânea'],['dietLowCarb','Low Carb'],
              ['dietKetogenica','Cetogênica (Keto)'],['dietIntermittentFasting','Jejum Intermitente'],
              ['dietAIP','AIP (Autoimune)'],['dietFODMAP','Low FODMAP'],
              ['dietSemAcucar','Sem açúcar/adoçantes'],['dietHalal','Halal'],
              ['dietKosher','Kosher'],['dietOutra','Outra']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
          </FormGroup>
          {data.dietOutra && (
            <TextField fullWidth size="small" label="Qual outra dieta?" value={data.dietOutraDesc}
              onChange={e => set('dietOutraDesc', e.target.value)} sx={{ mt:1 }} />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Restrições Específicas (além das intolerâncias acima):</Typography></FormLabel>
          <FormGroup row sx={{ flexWrap:'wrap' }}>
            {[['dietSemGluten','Sem Glúten'],['dietSemLactose','Sem Lactose'],
              ['dietSemOvo','Sem Ovos'],['dietSemSoja','Sem Soja'],
              ['dietSemFrutosMar','Sem Frutos do Mar'],['dietSemCastanhas','Sem Castanhas/Nozes'],
              ['dietSemAmendoim','Sem Amendoim']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
          </FormGroup>
          <FormLabel sx={{ mt:2, display:'block' }}><Typography variant="body2" fontWeight={600}>Observações alimentares adicionais:</Typography></FormLabel>
          <TextField fullWidth multiline rows={3} size="small"
            placeholder="Ex: não gosta de couve, alergia a corante vermelho, não come frango..."
            value={data.dietObsAlimentar}
            onChange={e => set('dietObsAlimentar', e.target.value)} sx={{ mt:0.5 }} />
        </Grid>
      </Grid>
    </Box>
  );

  // ── STEP 5: Sistemas I ─────────────────────
  const renderStep5 = () => (
    <Box>
      <SectionTitle>10a. Sistema Digestório</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['sdAzia','Azia'],['sdRefluxo','Refluxo'],['sdMaDigestao','Má digestão'],['sdNauseas','Náuseas'],['sdGases','Gases'],
          ['sdDistensao','Distensão abdominal'],['sdDorAbdom','Dor abdominal'],['sdConstipacao','Constipação'],['sdDiarreia','Diarreia'],
          ['sdAlternado','Intestino alternado'],['sdFezesClars','Fezes muito claras'],['sdFezesEscuras','Fezes muito escuras'],
          ['sdMuco','Muco nas fezes'],['sdSangue','Sangue nas fezes ⚠️'],['sdMauHalito','Mau hálito'],['sdBocaAmarga','Boca amarga'],['sdCandidiase','Candidíase recorrente']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <Box sx={{ mt:1 }}>
        <FormLabel><Typography variant="body2" fontWeight={600}>Funcionamento intestinal:</Typography></FormLabel>
        <FormGroup row>
          {[['sdFI1x','1×/dia'],['sdFIMais1x','Mais de 1×/dia'],['sdFI2dias','A cada 2 dias'],['sdFIMenos3','< 3×/semana'],['sdFIAlterna','Alterna']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
        </FormGroup>
      </Box>
      <SectionTitle>10b. Sistema Hepático e Detoxificação</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['shNauseasGord','Náusea após gordura'],['shFrituras','Intolerância a frituras'],['shGostoAmargo','Gosto amargo'],
          ['shDorDireita','Dor lado direito abdome'],['shIctericia','Pele/olhos amarelados ⚠️'],['shUrinaEscura','Urina escura'],
          ['shCoceira','Coceira sem causa'],['shMauHalito','Mau hálito frequente'],['shCansacoApos','Cansaço após comer'],['shGordura','Gordura no fígado']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>10c. Sistema Urinário e Renal</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['suUrinaEscura','Urina escura'],['suEspuma','Urina com espuma'],['suArdor','Ardor ao urinar'],
          ['suDorLombar','Dor lombar'],['suInchacoPosto','Inchaço no rosto'],['suInchacoMembros','Inchaço nas pernas'],
          ['suCalculo','Cálculo renal'],['suInfeccao','ITU recorrente'],['suAcordaNoite','Acorda à noite p/ urinar'],
          ['suUrinaMuito','Urina muitas vezes/dia'],['suUrinaPouco','Urina pouco']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
    </Box>
  );

  // ── STEP 6: Sistemas II ────────────────────
  const renderStep6 = () => (
    <Box>
      <SectionTitle>10d. Sistema Cardiovascular</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['scPaAlta','Pressão alta'],['scPaBaixa','Pressão baixa'],['scPalpitacoes','Palpitações'],['scArritmias','Arritmias'],
          ['scDorPeito','Dor no peito ⚠️'],['scFaltaArEsforco','Falta de ar ao esforço'],['scCansacoFacil','Cansaço fácil'],
          ['scInchacoMembros','Inchaço nas pernas'],['scVarizes','Varizes'],['scMaosFrios','Mãos e pés frios'],
          ['scTontura','Tontura ao levantar'],['scColesterol','Colesterol alto']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>10e. Sistema Respiratório</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['srFaltaAr','Falta de ar'],['srTosseSeca','Tosse seca'],['srTosseSecrecao','Tosse com secreção'],['srChiado','Chiado'],
          ['srAsma','Asma'],['srBronquite','Bronquite'],['srRinite','Rinite'],['srSinusite','Sinusite'],
          ['srRonco','Ronco'],['srApneia','Apneia do sono'],['srInfeccoesFreq','Infecções freq.']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>10f. Sistema Neurológico</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['snDorCabeca','Dor de cabeça'],['snEnxaqueca','Enxaqueca'],['snTontura','Tontura'],['snVertigem','Vertigem'],
          ['snFormigamento','Formigamento'],['snDormencia','Dormência'],['snTremores','Tremores'],['snConvulsoes','Convulsões'],
          ['snMaMemoria','Má memória'],['snConfusao','Confusão mental'],['snConcentracao','Dificuldade de concentração'],
          ['snZumbido','Zumbido'],['snVisaoTurva','Visão turva'],['snFraquezaMus','Fraqueza muscular']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
    </Box>
  );

  // ── STEP 7: Sistemas III ───────────────────
  const renderStep7 = () => (
    <Box>
      <SectionTitle>10g. Sistema Osteomuscular</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['sosDorMuscular','Dor muscular'],['sosDorArticular','Dor articular'],['sosDorLombar','Dor lombar'],['sosDorCervical','Dor cervical'],
          ['sosCaimbras','Cãibras'],['sosPernasInq','Pernas inquietas'],['sosFraquezaMus','Fraqueza muscular'],['sosTendinite','Tendinite'],
          ['sosFraturas','Fraturas freq.'],['sosOsteopenia','Osteopenia'],['sosOsteoporose','Osteoporose'],['sosRigidez','Rigidez matinal'],['sosPerda','Perda de massa']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>10h. Pele, Cabelo e Unhas</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['pcuPeleSeca','Pele seca'],['pcuPeleOleosa','Pele oleosa'],['pcuAcne','Acne'],['pcuDermatite','Dermatite'],
          ['pcuPsoriase','Psoríase'],['pcuRosacea','Rosácea'],['pcuManchasEscuras','Manchas escuras'],['pcuManchasBrancas','Manchas brancas'],
          ['pcuFeridasDemoram','Feridas demoram sarar'],['pcuCoceira','Coceira'],['pcuQuedaCabelo','Queda de cabelo'],['pcuCaspa','Caspa'],
          ['pcuUnhasFracas','Unhas fracas'],['pcuRachadurasLabios','Rachaduras nos lábios'],['pcuRachadurasCantos','Rachaduras no canto da boca']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>10i. Sistema Imunológico</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['simInfeccoesFreq','Infecções freq.'],['simHerpes','Herpes recorrente'],['simCandidiase','Candidíase recorrente'],
          ['simGripe','Gripe freq.'],['simSinusite','Sinusite freq.'],['simInfeccaoUrinaria','ITU recorrente'],
          ['simAlergias','Alergias freq.'],['simFeridasDemoram','Feridas demoram sarar'],['simFebreRecorrente','Febre recorrente'],['simLinfonodos','Linfonodos aumentados']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>10j. Sistema Endócrino e Metabólico</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['seGanhoPeso','Ganho de peso fácil'],['seDificEmagrecer','Dificuldade de emagrecer'],['seFome','Fome exagerada'],['seVontadeDoces','Vontade de doces'],
          ['seSonolencia','Sonolência após refeições'],['seTremoresJejum','Tremores ao ficar sem comer'],['seSede','Sede excessiva'],['seUrinaExcessiva','Urina excessiva'],
          ['seFrioSens','Sensibilidade ao frio'],['seCalorSens','Sensibilidade ao calor'],['seSudorese','Sudorese excessiva'],['seQuedaCabelo','Queda de cabelo'],
          ['seCansaco','Cansaço persistente'],['seSindMetabolica','Síndrome metabólica'],['seDiabetes','Diabetes'],['seResistencia','Resistência à insulina']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <Divider sx={{ my:2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <SectionTitle>10k. Saúde Hormonal Feminina</SectionTitle>
          <FormGroup sx={{ flexWrap:'wrap' }}>
            {[['hfMenstrIrreg','Menstruação irregular'],['hfFluxoIntenso','Fluxo intenso'],['hfColica','Cólica forte'],['hfTPM','TPM intensa'],
              ['hfDorMamas','Dor nas mamas'],['hfEndometriose','Endometriose'],['hfSop','Ovário policístico'],['hfInfertilidade','Infertilidade'],
              ['hfMenopausa','Menopausa'],['hfFogachos','Fogachos'],['hfRessecamento','Ressecamento vaginal'],['hfBaixaLibido','Baixa libido'],
              ['hfAnticoncepc','Usa anticoncepcional'],['hfReposHorm','Reposição hormonal']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SectionTitle>10l. Saúde Hormonal Masculina</SectionTitle>
          <FormGroup sx={{ flexWrap:'wrap' }}>
            {[['hmBaixaLibido','Baixa libido'],['hmDisfuncao','Disfunção erétil'],['hmEjaculacao','Ejaculação precoce'],['hmCansaco','Cansaço persistente'],
              ['hmPerdaMassa','Perda de massa muscular'],['hmGanhoBrriga','Ganho de barriga'],['hmQuedaPelos','Queda de pelos'],['hmIrritab','Irritabilidade'],
              ['hmSonoRuim','Sono ruim'],['hmBaixaTestost','Suspeita baixa testosterona'],['hmInfertilidade','Infertilidade']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );

  // ── STEP 8: Sono e Alimentação ─────────────
  const renderStep8 = () => (
    <Box>
      <SectionTitle>11. Sono e Repouso</SectionTitle>
      <FormGroup row sx={{ mb:1 }}>
        <FormLabel sx={{ mr:2, display:'flex', alignItems:'center' }}><Typography variant="body2" fontWeight={600}>Horas/noite:</Typography></FormLabel>
        {[['sono5h','<5h'],['sono5a6h','5–6h'],['sono7a8h','7–8h'],['sonoMais8h','>8h']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <Box sx={{ mb:2 }}>
        <FormLabel><Typography variant="body2" fontWeight={600}>Qualidade do sono (0=Péssima … 4=Excelente)</Typography></FormLabel>
        <Slider value={Number(data.qualSono)} min={0} max={4} step={1} marks valueLabelDisplay="on" onChange={(_, v) => set('qualSono', String(v))} sx={{ mt:2, maxWidth:400 }} />
      </Box>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['sonoDemora','Demora para dormir'],['sonoAcordaNoite','Acorda à noite'],['sonoAcordaCedo','Acorda muito cedo'],['sonoPesadelos','Pesadelos'],
          ['sonoLeve','Sono leve'],['sonoRonco','Ronco'],['sonoApneia','Apneia'],['sonoSonolencia','Sonolência diurna'],
          ['sonoAcordaCansado','Acorda cansado'],['sonoRemedio','Usa remédio para dormir']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <Grid container spacing={2} sx={{ mt:1 }}>
        <Grid item xs={6} sm={3}>
          <TextField fullWidth size="small" label="Hora de dormir" placeholder="22:30" value={data.horaDormir} onChange={e => set('horaDormir', e.target.value)} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField fullWidth size="small" label="Hora de acordar" placeholder="06:30" value={data.horaAcordar} onChange={e => set('horaAcordar', e.target.value)} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField fullWidth size="small" label="Total horas/noite" type="number" value={data.horasSono} onChange={e => set('horasSono', e.target.value)} InputProps={{ endAdornment: <InputAdornment position="end">h</InputAdornment> }} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Qualidade subjetiva</InputLabel>
            <Select label="Qualidade subjetiva" value={data.qualidadeSono} onChange={e => set('qualidadeSono', e.target.value)}>
              {['Péssima','Ruim','Regular','Boa','Excelente'].map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <SectionTitle>12. Alimentação</SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Refeições por dia:</Typography></FormLabel>
          <FormGroup row>
            {[['r12','1–2'],['r3','3'],['r45','4–5'],['r6','6+']].map(([v,l]) => (
              <FormControlLabel key={v} control={<Radio size="small" checked={data.refeicoesQuant===v} onChange={() => set('refeicoesQuant',v)} />} label={<Typography variant="body2">{l}</Typography>} />
            ))}
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Avaliação:</Typography></FormLabel>
          <FormGroup row>
            {[['ruim','Ruim'],['regular','Regular'],['boa','Boa'],['excelente','Excelente']].map(([v,l]) => (
              <FormControlLabel key={v} control={<Radio size="small" checked={data.avalAlim===v} onChange={() => set('avalAlim',v)} />} label={<Typography variant="body2">{l}</Typography>} />
            ))}
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Água por dia:</Typography></FormLabel>
          <FormGroup row>
            {[['agua1L','<1L'],['agua1a2L','1–2L'],['agua2a3L','2–3L'],['aguaMais3L','>3L']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Consumo frequente:</Typography></FormLabel>
          <FormGroup row sx={{ flexWrap:'wrap' }}>
            {[['consAcucar','Açúcar/doces'],['consRefrigerante','Refrigerante'],['consFrituras','Frituras'],['consFastFood','Fast food'],
              ['consEmbutidos','Embutidos'],['consIndustrializados','Industrializados'],['consCafe','Café em excesso'],['consAlcool','Álcool'],
              ['consPoucasVerduras','Poucas verduras'],['consPoucasFrutas','Poucas frutas'],['consPoucaProteina','Pouca proteína']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Restrições alimentares:</Typography></FormLabel>
          <FormGroup row sx={{ flexWrap:'wrap' }}>
            {[['restVegetariano','Vegetariano'],['restVegano','Vegano'],['restSemGluten','Sem glúten'],['restSemLactose','Sem lactose'],
              ['restLowCarb','Low carb'],['restCetogenica','Cetogênica'],['restJejum','Jejum intermitente'],['restSemRestricao','Sem restrições']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
          </FormGroup>
        </Grid>
      </Grid>
      <SectionTitle>13. Hábitos de Vida</SectionTitle>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Tabagismo:</Typography></FormLabel>
          <FormGroup row>
            {[['tabacoNunca','Nunca fumei'],['tabacoEx','Ex-fumante'],['tabacoOcasional','Ocasional'],['tabacoDiario','Diário']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Álcool:</Typography></FormLabel>
          <FormGroup row>
            {[['alcoolNao','Não bebo'],['alcoolOcasional','Ocasional'],['alcoolFds','Fins de semana'],['alcoolRegular','Regular']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Atividade física:</Typography></FormLabel>
          <FormGroup row sx={{ flexWrap:'wrap' }}>
            {[['atividadeSedentario','Sedentário'],['atividadeLeve','Leve 1–2×/sem'],['atividadeMedia','Moderada 3–4×/sem'],['atividadeIntensa','Intensa 5×+/sem']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
          </FormGroup>
          <Grid container spacing={2} sx={{ mt:1 }}>
            <Grid item xs={12}>
              <FormLabel><Typography variant="caption" fontWeight={600} color="text.secondary">Tipo de atividade praticada:</Typography></FormLabel>
              <FormGroup row sx={{ flexWrap:'wrap', mt:0.5 }}>
                {LC_ATIVIDADE_TIPO.map(t => (
                  <FormControlLabel key={t} sx={{ minWidth:'120px' }}
                    control={<Checkbox size="small" checked={!!(data.atividadeTipoLC||{})[t]} onChange={e => setData(p => ({...p, atividadeTipoLC: {...(p.atividadeTipoLC||{}), [t]: e.target.checked}}))} />}
                    label={<Typography variant="body2">{t}</Typography>} />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Frequência semanal</InputLabel>
                <Select label="Frequência semanal" value={data.atividadeFreqLC} onChange={e => set('atividadeFreqLC', e.target.value)}>
                  {ATIVIDADE_FREQUENCIA.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Duração por sessão</InputLabel>
                <Select label="Duração por sessão" value={data.atividadeDurLC} onChange={e => set('atividadeDurLC', e.target.value)}>
                  {ATIVIDADE_DURACAO.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Intensidade</InputLabel>
                <Select label="Intensidade" value={data.atividadeIntLC} onChange={e => set('atividadeIntLC', e.target.value)}>
                  {ATIVIDADE_INTENSIDADE.map(i => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormLabel><Typography variant="caption" fontWeight={600} color="text.secondary">Sinais durante/após exercício:</Typography></FormLabel>
              <FormGroup row sx={{ flexWrap:'wrap', mt:0.5 }}>
                {ATIVIDADE_SINAIS.map(s => (
                  <FormControlLabel key={s} sx={{ minWidth:'150px' }}
                    control={<Checkbox size="small" checked={!!(data.atividadeSinaisLC||{})[s]} onChange={e => setData(p => ({...p, atividadeSinaisLC: {...(p.atividadeSinaisLC||{}), [s]: e.target.checked}}))} />}
                    label={<Typography variant="body2">{s}</Typography>} />
                ))}
              </FormGroup>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Exposição solar:</Typography></FormLabel>
          <FormGroup row>
            {[['solPouco','Muito pouca'],['sol15a30','15–30 min/dia'],['solFrequente','Frequente'],['solExcessivo','Excessiva']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );

  // ── STEP 9: Emocional e Segurança ──────────
  const renderStep9 = () => (
    <Box>
      <SectionTitle>14. Saúde Emocional</SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Nível de estresse (0=Nenhum … 4=Muito alto)</Typography></FormLabel>
          <Slider value={Number(data.estresse)} min={0} max={4} step={1} marks valueLabelDisplay="on" onChange={(_, v) => set('estresse', String(v))} sx={{ mt:2 }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Ansiedade (0=Nenhuma … 4=Incapacitante)</Typography></FormLabel>
          <Slider value={Number(data.ansiedade)} min={0} max={4} step={1} marks valueLabelDisplay="on" onChange={(_, v) => set('ansiedade', String(v))} sx={{ mt:2 }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Humor predominante:</Typography></FormLabel>
          <FormGroup sx={{ mt:0.5 }}>
            {['Triste','Irritado','Ansioso','Desanimado','Normal','Bom','Muito bom'].map(v => (
              <FormControlLabel key={v} control={<Radio size="small" checked={data.humorPredom===v} onChange={() => set('humorPredom',v)} />} label={<Typography variant="body2">{v}</Typography>} />
            ))}
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Sintomas emocionais:</Typography></FormLabel>
          <FormGroup row sx={{ flexWrap:'wrap' }}>
            {[['emocCrises','Crises de ansiedade'],['emocPanico','Pânico'],['emocChoro','Choro fácil'],['emocIrritab','Irritabilidade'],
              ['emocMedo','Medo excessivo'],['emocPensAcel','Pensamentos acelerados'],['emocDesanimo','Desânimo'],['emocPerda','Perda de prazer'],
              ['emocIsolamento','Isolamento'],['emocCulpa','Culpa excessiva'],['emocRaiva','Raiva reprimida'],['emocLuto','Luto'],
              ['emocAutoestima','Baixa autoestima'],['emocExaustao','Exaustão emocional'],['emocBurnout','Burnout'],
              ['emocSensacaoVazio','Sensação de vazio'],['emocTensaoMuscular','Tensão muscular'],['emocPreocupacaoExcess','Preocupação excessiva']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
          </FormGroup>
        </Grid>
        {/* ── Diagnóstico emocional avançado ────────────────────── */}
        <Grid item xs={12} sm={6}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Com que frequência se sente sobrecarregado(a)?</Typography></FormLabel>
          <FormGroup row sx={{ flexWrap:'wrap' }}>
            {['Nunca','Raramente','Às vezes','Frequentemente','Quase sempre'].map(v => (
              <FormControlLabel key={v} control={<Radio size="small" checked={data.sobrecarrega===v} onChange={() => set('sobrecarrega',v)} />} label={<Typography variant="body2">{v}</Typography>} />
            ))}
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Como reage ao estresse?</Typography></FormLabel>
          <FormGroup row sx={{ flexWrap:'wrap' }}>
            {['Fico mais calmo(a)','Ansioso(a)','Irritado(a)','Evito ou me isolo'].map(v => (
              <FormControlLabel key={v} control={<Radio size="small" checked={data.reacaoEstresse===v} onChange={() => set('reacaoEstresse',v)} />} label={<Typography variant="body2">{v}</Typography>} />
            ))}
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Motivação para atividades do dia a dia (0=sem motivação … 10=muito motivado)</Typography></FormLabel>
          <Slider value={Number(data.motivacaoScale)} min={0} max={10} step={1} marks valueLabelDisplay="on" onChange={(_, v) => set('motivacaoScale', String(v))} sx={{ mt:2 }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Qualidade emocional geral (0=muito ruim … 10=muito bem)</Typography></FormLabel>
          <Slider value={Number(data.qualidadeEmocional)} min={0} max={10} step={1} marks valueLabelDisplay="on" onChange={(_, v) => set('qualidadeEmocional', String(v))} sx={{ mt:2 }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Estado de alerta constante?</Typography></FormLabel>
          <FormGroup row>
            {['Sim','Não'].map(v => (
              <FormControlLabel key={v} control={<Radio size="small" checked={data.alertaConstante===v} onChange={() => set('alertaConstante',v)} />} label={<Typography variant="body2">{v}</Typography>} />
            ))}
          </FormGroup>
          <FormLabel sx={{ mt:1, display:'block' }}><Typography variant="body2" fontWeight={600}>Dificuldade de concentração ou memória?</Typography></FormLabel>
          <FormGroup row>
            {['Sim','Não'].map(v => (
              <FormControlLabel key={v} control={<Radio size="small" checked={data.difConcentracao===v} onChange={() => set('difConcentracao',v)} />} label={<Typography variant="body2">{v}</Typography>} />
            ))}
          </FormGroup>
          <FormLabel sx={{ mt:1, display:'block' }}><Typography variant="body2" fontWeight={600}>Mente confusa ou lentidão mental?</Typography></FormLabel>
          <FormGroup row>
            {['Sim','Não'].map(v => (
              <FormControlLabel key={v} control={<Radio size="small" checked={data.menteCofusa===v} onChange={() => set('menteCofusa',v)} />} label={<Typography variant="body2">{v}</Typography>} />
            ))}
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel><Typography variant="body2" fontWeight={600}>O que usa para aliviar emoções difíceis?</Typography></FormLabel>
          <FormGroup row sx={{ flexWrap:'wrap' }}>
            {[['copingComida','Comida'],['copingAlcool','Álcool'],['copingMedicamentos','Medicamentos'],
              ['copingRedesSociais','Redes sociais'],['copingIsolamento','Isolamento'],['copingExercicio','Exercício'],
              ['copingNenhum','Nenhum'],['copingOutros','Outros']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Você se sente apoiado(a) emocionalmente?</Typography></FormLabel>
          <FormGroup row>
            {['Sim','Não'].map(v => (
              <FormControlLabel key={v} control={<Radio size="small" checked={data.apoioEmocional===v} onChange={() => set('apoioEmocional',v)} />} label={<Typography variant="body2">{v}</Typography>} />
            ))}
          </FormGroup>
          <FormLabel sx={{ mt:1, display:'block' }}><Typography variant="body2" fontWeight={600}>Tem alguém com quem conversar quando precisa?</Typography></FormLabel>
          <FormGroup row>
            {['Sim','Não'].map(v => (
              <FormControlLabel key={v} control={<Radio size="small" checked={data.alguemConversar===v} onChange={() => set('alguemConversar',v)} />} label={<Typography variant="body2">{v}</Typography>} />
            ))}
          </FormGroup>
          <FormLabel sx={{ mt:1, display:'block' }}><Typography variant="body2" fontWeight={600}>Diagnóstico psicológico ou psiquiátrico?</Typography></FormLabel>
          <FormGroup row>
            {['Não','Sim'].map(v => (
              <FormControlLabel key={v} control={<Radio size="small" checked={data.diagnosticoPsi===v} onChange={() => set('diagnosticoPsi',v)} />} label={<Typography variant="body2">{v}</Typography>} />
            ))}
          </FormGroup>
          {data.diagnosticoPsi === 'Sim' && (
            <TextField fullWidth size="small" label="Qual diagnóstico?" value={data.diagnosticoPsiDesc} onChange={e => set('diagnosticoPsiDesc', e.target.value)} sx={{ mt:1 }} />
          )}
        </Grid>
      </Grid>
      <Divider sx={{ my:2 }} />
      {/* ── Bem-estar subjetivo (Luciana Caxito) ── */}
      <SectionTitle>Escalas de Bem-estar Subjetivo (0–10)</SectionTitle>
      <Grid container spacing={2} sx={{ mb:2 }}>
        {[
          ['bemEstarGeral','😊 Bem-estar geral'],
          ['bemEstarEmocional','🧠 Equilíbrio emocional'],
          ['bemEstarSocial','👥 Qualidade dos relacionamentos'],
          ['bemEstarProposito','🌟 Sentido de propósito na vida'],
        ].map(([k,l]) => (
          <Grid item xs={12} sm={6} key={k}>
            <FormLabel><Typography variant="body2" fontWeight={600}>{l}</Typography></FormLabel>
            <Slider value={Number(data[k])} min={0} max={10} step={1} marks valueLabelDisplay="on"
              onChange={(_, v) => set(k, String(v))} sx={{ mt:2 }} />
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ my:2 }} />
      <Alert severity="warning" sx={{ mb:2 }}>
        <Typography fontWeight={700}>15. Segurança Emocional — Obrigatório</Typography>
      </Alert>
      <SectionTitle>Em momentos difíceis, você já desejou “desaparecer” ou fugir de tudo?</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {['Nunca','Raramente','Às vezes','Frequentemente'].map(v => (
          <FormControlLabel key={v} control={<Radio size="small" checked={data.desaparecerSentimento===v} onChange={() => set('desaparecerSentimento',v)} />} label={<Typography variant="body2">{v}</Typography>} />
        ))}
      </FormGroup>
      <SectionTitle>Já teve pensamentos de não querer viver?</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['segNunca','Nunca'],['segPassado','Já tive no passado'],['segAsVezes','Às vezes'],['segFrequente','Frequentemente'],['segEmRisco','Estou em risco agora ⚠️']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>Já pensou em se machucar?</SectionTitle>
      <FormGroup row>
        {[['machNao','Não'],['machPassado','Sim, no passado'],['machAtualmente','Sim, atualmente ⚠️']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>Tentativa de suicídio?</SectionTitle>
      <FormGroup row>
        {[['tentNao','Não'],['tentSim','Sim ⚠️']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      {(data.segEmRisco || data.machAtualmente || data.tentSim) && (
        <Alert severity="error" sx={{ mt:2 }}>
          ⚠️ <strong>ATENÇÃO IMEDIATA:</strong> Encaminhar para atendimento psicológico/psiquiátrico de URGÊNCIA. Não deixar o paciente sozinho.
        </Alert>
      )}
      <SectionTitle>16. Trauma e História de Vida</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['traumaFisica','Violência física'],['traumaPsico','Violência psicológica'],['traumaSexual','Violência sexual'],['traumaBullying','Bullying'],
          ['traumaAbandono','Abandono'],['traumaLuto','Luto importante'],['traumaSeparacao','Separação traumática'],['traumaAcidente','Acidente grave'],
          ['traumaFinanceiro','Perda financeira grave'],['traumaAmbiente','Ambiente familiar agressivo'],['traumaNenhum','Nenhum trauma relevante']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <Box sx={{ mt:1 }}>
        <FormLabel><Typography variant="body2" fontWeight={600}>Esse evento ainda interfere na sua vida?</Typography></FormLabel>
        <FormGroup row>
          {['Não','Pouco','Moderadamente','Muito','Intensamente'].map(v => (
            <FormControlLabel key={v} control={<Radio size="small" checked={data.traumaInterfere===v} onChange={() => set('traumaInterfere',v)} />} label={<Typography variant="body2">{v}</Typography>} />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );

  // ── STEP 10: Carências e Exames ────────────
  const renderStep10 = () => (
    <Box>
      <SectionTitle>17. Exposição Tóxica e Ambiental</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['toxAgrotoxicos','Agrotóxicos'],['toxTintas','Tintas'],['toxSolventes','Solventes'],['toxMofo','Mofo'],
          ['toxFumaca','Fumaça'],['toxMercurio','Mercúrio'],['toxChumbo','Chumbo'],['toxLimpeza','Produtos de limpeza fortes'],
          ['toxCosmeticos','Cosméticos em excesso'],['toxAguaSemFiltr','Água sem filtragem'],['toxPlasticos','Plásticos aquecidos'],['toxNenhum','Nenhum']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>
      <SectionTitle>18. Sinais de Possíveis Carências Nutricionais</SectionTitle>
      <Grid container spacing={1}>
        {[
          { titulo:'💊 Magnésio', campos:[['magCaimbras','Cãibras'],['magAnsiedade','Ansiedade'],['magInsonia','Insônia'],['magIrritab','Irritabilidade'],['magPalpitacoes','Palpitações'],['magConstipacao','Constipação'],['magDores','Dores musculares']] },
          { titulo:'☀️ Vitamina D', campos:[['vitdBaixaImun','Baixa imunidade'],['vitdDorOssea','Dor óssea'],['vitdFraqueza','Fraqueza'],['vitdTristeza','Tristeza'],['vitdInfeccoes','Infecções freq.'],['vitdPoucoSol','Pouco sol'],['vitdOsteopenia','Osteopenia/osteoporose']] },
          { titulo:'🅱️ Complexo B', campos:[['vitbFormigamento','Formigamento'],['vitbCansaco','Cansaço'],['vitbIrritab','Irritabilidade'],['vitbBocaRachada','Boca rachada'],['vitbMaMemoria','Má memória'],['vitbQuedaCabelo','Queda de cabelo'],['vitbLinguaArdida','Língua ardida']] },
          { titulo:'🩸 Ferro', campos:[['ferroCansaco','Cansaço'],['ferroPalidez','Palidez'],['ferroFaltaAr','Falta de ar'],['ferroQuedaCabelo','Queda de cabelo'],['ferroTontura','Tontura'],['ferroUnhasFracas','Unhas fracas'],['ferroMenstruacao','Menstruação intensa']] },
          { titulo:'🦴 Zinco', campos:[['zincoBaixaImun','Baixa imunidade'],['zincoQuedaCabelo','Queda de cabelo'],['zincoUnhasFracas','Unhas fracas'],['zincoAcne','Acne'],['zincoCicatrizacao','Cicatrização lenta'],['zincoPaladar','Alteração de paladar'],['zincoBaixaLibido','Baixa libido']] },
          { titulo:'🐟 Ômega-3', campos:[['om3Inflamacao','Inflamação'],['om3DorArticular','Dor articular'],['om3PeleSeca','Pele seca'],['om3HumorDep','Humor deprimido'],['om3DifCognitiva','Dificuldade cognitiva'],['om3TgAltos','Triglicerídeos altos']] },
        ].map(({ titulo, campos }) => (
          <Grid item xs={12} sm={6} md={4} key={titulo}>
            <Paper variant="outlined" sx={{ p:1.5, height:'100%' }}>
              <Typography variant="body2" fontWeight={700} sx={{ mb:0.5 }}>{titulo}</Typography>
              <FormGroup>
                {campos.map(([k,l]) => <CK key={k} k={k} label={l} />)}
              </FormGroup>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <SectionTitle>19. Exames Recentes (últimos 6 meses)</SectionTitle>
      <FormGroup row sx={{ flexWrap:'wrap' }}>
        {[['exHemograma','Hemograma'],['exGlicemia','Glicemia'],['exHbA1c','HbA1c'],['exInsulina','Insulina'],
          ['exColesterol','Colesterol total'],['exHDL','HDL'],['exLDL','LDL'],['exTg','Triglicerídeos'],
          ['exTGOTGP','TGO/TGP'],['exGamaGT','Gama GT'],['exCreatinina','Creatinina'],['exUreia','Ureia'],
          ['exTSH','TSH'],['exT3T4','T3/T4'],['exVitD','Vitamina D'],['exB12','B12'],
          ['exFerritina','Ferritina'],['exPCR','PCR'],['exUrina','Urina tipo 1'],['exParasitol','Parasitológico'],['exNenhum','Nenhum']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
      </FormGroup>

      {/* ── Exames com Valores e Referências Funcionais ── */}
      <SectionTitle>20. Exames com Valores e Referências Funcionais</SectionTitle>
      <Typography variant="caption" color="text.secondary" sx={{ mb:1, display:'block' }}>
        Para cada exame realizado, informe o valor encontrado. Os valores de referência funcional são exibidos como guia.
      </Typography>
      {Object.entries(EXAMES_GRUPOS).map(([gKey, grupo]) => (
        <Accordion key={gKey} sx={{ mb:1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2" fontWeight={700}>{grupo.label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              {grupo.itens.map(item => (
                <Grid item xs={12} sm={6} md={4} key={item.key}>
                  <TextField
                    fullWidth size="small"
                    label={item.label}
                    placeholder={`Ref: ${item.ref}`}
                    value={(data.exameValores||{})[item.key] || ''}
                    onChange={e => setData(p => ({
                      ...p,
                      exameValores: { ...(p.exameValores||{}), [item.key]: e.target.value }
                    }))}
                    helperText={`Ref: ${item.ref}`}
                    FormHelperTextProps={{ sx: { fontSize:'0.68rem', color:'text.secondary' } }}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
      <SectionTitle>22. Observações Finais</SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth multiline rows={3} size="small" label="Observações do paciente" value={data.obsPaciente} onChange={e => set('obsPaciente', e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth multiline rows={3} size="small" label="Observações do terapeuta" value={data.obsTerapeuta} onChange={e => set('obsTerapeuta', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline rows={2} size="small" label="Conduta inicial" value={data.condutaInicial} onChange={e => set('condutaInicial', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <FormLabel><Typography variant="body2" fontWeight={600}>Retorno recomendado:</Typography></FormLabel>
          <FormGroup row>
            {[['retorno7d','7 dias'],['retorno15d','15 dias'],['retorno30d','30 dias'],['retorno60d','60 dias']].map(([k,l]) => <CK key={k} k={k} label={l} />)}
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );

  // ── STEP 11: Protocolo Final ───────────────
  const renderProtocol = () => {
    if (!protocol) return (
      <Box>
        <Alert severity="warning" sx={{ mb: 2 }}>
          O protocolo não pôde ser gerado. Verifique se os dados foram preenchidos corretamente nas etapas anteriores e tente navegar para cá novamente.
        </Alert>
        <Button variant="outlined" startIcon={<BackIcon />} onClick={() => setStep(s => Math.max(0, s - 1))}>
          Voltar e verificar
        </Button>
      </Box>
    );
    const { alerts, scores, lvl, deficiencias, fito, homo, flores, exames, condutas, symptoms, therapeuticData, boarimProtocols } = protocol;
    const safetyReview = evaluateProtocolSafety(data, protocol);
    const sysNames = {
      digestorio:'Digestório', hepatico:'Hepático', renal:'Renal', cardio:'Cardiovascular',
      respiratorio:'Respiratório', neurologico:'Neurológico', osteomuscular:'Osteomuscular',
      pele:'Pele/Cabelo/Unhas', imunologico:'Imunológico', endocrino:'Endócrino/Metabólico',
      emocional:'Emocional', sono:'Sono',
    };
    const retorno = [data.retorno7d&&'7 dias', data.retorno15d&&'15 dias', data.retorno30d&&'30 dias', data.retorno60d&&'60 dias'].filter(Boolean).join(', ');

    return (
      <Box>
        <Alert severity={safetyReview.matchedRisks.some(item => item.risk === 'redFlag') ? 'error' : 'warning'} sx={{ mb: 2 }}>
          <Typography variant="body2" fontWeight={700}>Revisão de segurança obrigatória antes da conduta</Typography>
          {safetyReview.warnings.map((warning, index) => (
            <Typography variant="body2" key={index}>• {warning}</Typography>
          ))}
        </Alert>
        <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:2, flexWrap:'wrap', gap:1 }}>
          <Typography variant="h6" fontWeight={700} color="primary">Protocolo Terapêutico Gerado</Typography>
          <Box sx={{ display:'flex', gap:1, flexWrap:'wrap' }}>
            <Button
              variant="contained"
              color="success"
              startIcon={savedId ? <OkIcon /> : <PersonAddIcon />}
              onClick={handleSaveInteragente}
              size="small"
              sx={{ fontWeight:700 }}
            >
              {savedId ? 'Atualizar Interagente' : 'Salvar Interagente'}
            </Button>
            {savedId && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<DashboardIcon />}
                onClick={() => navigate('/dashboard')}
                size="small"
              >
                Ver no Dashboard
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              startIcon={<AssignmentIcon />}
              onClick={handlePrintProtocoloTimbre}
              size="small"
              sx={{ fontWeight: 700 }}
            >
              Receituário c/ Timbre
            </Button>
            <Button
              variant="outlined"
              color="success"
              startIcon={<SpaIcon />}
              onClick={handlePrintNutricional}
              size="small"
            >
              Plano Nutricional
            </Button>
          </Box>
        </Box>

        {/* Alertas */}
        {alerts.length > 0 && (
          <Box sx={{ mb:2 }}>
            <Typography variant="subtitle2" fontWeight={700} color="error" sx={{ mb:1 }}>⚠️ ALERTAS</Typography>
            {alerts.map((a,i) => <Alert key={i} severity={a.s} sx={{ mb:0.5 }}>{a.m}</Alert>)}
          </Box>
        )}

        <Tabs value={tabProtocol} onChange={(_, v) => setTabProtocol(v)} variant="scrollable" scrollButtons="auto" sx={{ mb:2, borderBottom:1, borderColor:'divider' }}>
          <Tab label="📊 Scores" />
          <Tab label="💊 Carências" />
          <Tab label="🌿 Fitoterapia" />
          <Tab label="⚗️ Homeopatia" />
          <Tab label="🌸 Florais" />
          <Tab label="🔬 Exames" />
          <Tab label="📋 Condutas" />
        </Tabs>

        {/* Tab 0: Scores */}
        {tabProtocol === 0 && (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb:2 }}>
              Pontuação por sistema baseada nos sintomas marcados. Normal: 0–2 | Atenção: 3–5 | Alterado: 6–9 | Prioridade: 10+
            </Typography>
            <Grid container spacing={1}>
              {Object.entries(scores).map(([sys, val]) => {
                const l = lvl(val);
                return (
                  <Grid item xs={6} sm={4} md={3} key={sys}>
                    <Card variant="outlined" sx={{ borderColor:`${l.color}.main` }}>
                      <CardContent sx={{ p:'12px !important' }}>
                        <Typography variant="caption" fontWeight={600} color="text.secondary">{sysNames[sys]}</Typography>
                        <Box sx={{ display:'flex', alignItems:'center', gap:1, mt:0.5 }}>
                          <Typography variant="h5" fontWeight={700} color={`${l.color}.main`}>{val}</Typography>
                          <Chip label={l.label} color={l.color} size="small" />
                        </Box>
                        <LinearProgress variant="determinate" value={Math.min(val * 8, 100)} color={l.color} sx={{ mt:1, height:6, borderRadius:3 }} />
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            {/* Resumo */}
            <Box sx={{ mt:3 }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb:1 }}>Resumo do paciente</Typography>
              <Paper variant="outlined" sx={{ p:2 }}>
                {data.nome && <Typography variant="body2"><strong>Nome:</strong> {data.nome}{data.idade ? ` · ${data.idade} anos` : ''}{data.sexo ? ` · ${data.sexo}` : ''}</Typography>}
                {imc && <Typography variant="body2"><strong>IMC:</strong> {imc} | <strong>RCQ:</strong> {rcq}</Typography>}
                {data.queixaPrincipal && <Typography variant="body2" sx={{ mt:0.5 }}><strong>Queixa principal:</strong> {data.queixaPrincipal}</Typography>}
                <Typography variant="body2" sx={{ mt:0.5 }}><strong>Sistemas prioritários:</strong> {Object.entries(scores).filter(([,v])=>v>=6).map(([k])=>sysNames[k]).join(', ') || 'Nenhum com alteração significativa'}</Typography>
                <Typography variant="body2"><strong>Sistemas em atenção:</strong> {Object.entries(scores).filter(([,v])=>v>=3&&v<6).map(([k])=>sysNames[k]).join(', ') || 'Nenhum'}</Typography>
                {retorno && <Typography variant="body2"><strong>Retorno:</strong> {retorno}</Typography>}
              </Paper>
            </Box>
          </Box>
        )}

        {/* Tab 1: Carências */}
        {tabProtocol === 1 && (
          <Box>
            {deficiencias.length === 0 ? (
              <Alert severity="success">Nenhuma carência nutricional significativa detectada com base nos sintomas marcados.</Alert>
            ) : deficiencias.map((def, i) => (
              <ProtocolCard key={i} icon={<ScienceIcon color="warning" />} title={`${def.nome} — Prioridade ${def.prioridade} (${def.escore} sinais)`} color="warning">
                <Typography variant="body2" fontWeight={700} sx={{ mb:0.5 }}>Suplementação sugerida:</Typography>
                {def.suplementos.map((s,j) => <Typography key={j} variant="body2">• {s}</Typography>)}
                <Typography variant="body2" fontWeight={700} sx={{ mt:1, mb:0.5 }}>Fontes alimentares:</Typography>
                <Typography variant="body2">{def.alimentos}</Typography>
              </ProtocolCard>
            ))}
          </Box>
        )}

        {/* Tab 2: Fitoterapia */}
        {tabProtocol === 2 && (
          <Box>
            {fito.length === 0 ? (
              <Alert severity="success">Nenhum sistema com alteração significativa detectada para indicação fitoterápica.</Alert>
            ) : fito.map((f, i) => (
              <ProtocolCard key={i} icon={<SpaIcon color="success" />} title={f.sistema} color="success">
                {f.ervas.map((e,j) => <Typography key={j} variant="body2">• {e}</Typography>)}
              </ProtocolCard>
            ))}
          </Box>
        )}

        {/* Tab 3: Homeopatia */}
        {tabProtocol === 3 && (
          <Box>
            {homo.length === 0 ? (
              <Alert severity="info">Nenhuma indicação homeopática específica baseada nos sintomas marcados.</Alert>
            ) : (
              <ProtocolCard icon={<PharmacyIcon color="info" />} title="Indicações Homeopáticas" color="info">
                {homo.map((h,i) => <Typography key={i} variant="body2" sx={{ mb:0.5 }}>• {h}</Typography>)}
                <Alert severity="info" sx={{ mt:1 }}>
                  Posologia geral: 5 glóbulos sublinguais 3×/dia. Ajustar conforme resposta. Consultar homeopata para prescrição individualizada.
                </Alert>
              </ProtocolCard>
            )}
          </Box>
        )}

        {/* Tab 4: Florais */}
        {tabProtocol === 4 && (
          <Box>
            {flores.length === 0 ? (
              <Alert severity="info">Nenhuma indicação de floral específica baseada nos sintomas emocionais marcados.</Alert>
            ) : (
              <ProtocolCard icon={<FloristIcon color="secondary" />} title="Florais de Bach" color="secondary">
                {flores.map((f,i) => <Typography key={i} variant="body2" sx={{ mb:0.5 }}>🌸 {f}</Typography>)}
                <Alert severity="info" sx={{ mt:1 }}>
                  Posologia: 4 gotas sublinguais 4×/dia (em água) ou 2 gotas direto na boca. Até 7 essências por fórmula.
                </Alert>
              </ProtocolCard>
            )}
          </Box>
        )}

        {/* Tab 5: Exames */}
        {tabProtocol === 5 && (
          <Box>
            {exames.length === 0 ? (
              <Alert severity="success">Exames em dia! Nenhuma solicitação adicional identificada.</Alert>
            ) : (
              <ProtocolCard icon={<ScienceIcon color="primary" />} title="Exames Sugeridos" color="primary">
                {exames.map((e,i) => <Typography key={i} variant="body2" sx={{ mb:0.5 }}>🔬 {e}</Typography>)}
              </ProtocolCard>
            )}
          </Box>
        )}

        {/* Tab 6: Condutas */}
        {tabProtocol === 6 && (
          <Box>
            <ProtocolCard icon={<AssignmentIcon color="primary" />} title="Condutas e Orientações Gerais" color="primary">
              {condutas.map((c,i) => <Typography key={i} variant="body2" sx={{ mb:1 }}>• {c}</Typography>)}
            </ProtocolCard>
            {data.condutaInicial && (
              <ProtocolCard icon={<AssignmentIcon />} title="Conduta do Terapeuta" color="success">
                <Typography variant="body2">{data.condutaInicial}</Typography>
              </ProtocolCard>
            )}
            {data.obsTerapeuta && (
              <ProtocolCard icon={<AssignmentIcon />} title="Observações do Terapeuta" color="warning">
                <Typography variant="body2">{data.obsTerapeuta}</Typography>
              </ProtocolCard>
            )}
          </Box>
        )}

        {/* ── Receituário Manual ─────────────── */}
        <Box sx={{ mt:3 }}>
          <Divider sx={{ mb:2 }} />
          <Typography variant="h6" fontWeight={700} color="primary.dark" sx={{ mb:2 }}>
            📝 Receituário / Orientações ao Paciente
          </Typography>
          <Grid container spacing={2}>
            {[
              ['rxSuplementacao','💊 Suplementação'],
              ['rxFitoterapicos','🌿 Fitoterápicos'],
              ['rxNutricional','🥗 Conduta Nutricional'],
              ['rxEstiloVida','🏃 Estilo de Vida / Orientações'],
              ['rxEncaminhamentos','🔗 Encaminhamentos'],
              ['rxRetorno','📅 Retorno previsto'],
            ].map(([k, l]) => (
              <Grid item xs={12} sm={k === 'rxRetorno' || k === 'rxEncaminhamentos' ? 6 : 12} key={k}>
                <TextField fullWidth multiline={k !== 'rxRetorno'} rows={k !== 'rxRetorno' ? 3 : 1} size="small"
                  label={l} value={data[k]} onChange={e => set(k, e.target.value)} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ── PROTOCOLOS COMPLETOS (PDF/DOCX) ─────────────── */}
        {therapeuticData && therapeuticData.length > 0 && (
          <Box sx={{ mt:4 }}>
            <Divider sx={{ mb:3 }} />
            <Typography variant="h6" fontWeight={700} color="success.dark" sx={{ mb:2 }}>
              📚 Protocolo Terapêutico Completo (Bases PDF/DOCX)
            </Typography>
            <TherapeuticBoard therapeuticData={therapeuticData} />
          </Box>
        )}

        {therapeuticData && therapeuticData.length > 0 && (
          <Box sx={{ mt:4 }}>
            <Typography variant="h6" fontWeight={700} color="primary" sx={{ mb:2 }}>
              📋 Quadro Completo de Tratamento
            </Typography>
            <CompleteTreatmentBoard
              patientData={{ nome: data.nome, idade: data.idade, sexo: data.sexo, queixaPrincipal: data.queixaPrincipal, sintomas: symptoms }}
              therapeuticData={therapeuticData}
            />
          </Box>
        )}

        {boarimProtocols && boarimProtocols.length > 0 && (
          <Box sx={{ mt:4 }}>
            <Divider sx={{ mb:3 }} />
            <Paper sx={{ p:3, background:'linear-gradient(135deg, #558b2f 0%, #33691e 100%)', color:'#fff', borderRadius:2 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb:1, textTransform:'uppercase', letterSpacing:1 }}>
                🌿 Manual Prático de Tratamentos Naturais
              </Typography>
              <Typography variant="caption" sx={{ opacity:0.85, fontStyle:'italic' }}>
                Dr. Daniel S. F. Boarim — 15ª Edição, 2014
              </Typography>
              <Alert severity="info" sx={{ mt:2, mb:2, bgcolor:'rgba(255,255,255,0.95)' }}>
                <Typography variant="body2">
                  Protocolos de tratamentos naturais baseados em hidroterapia, fitoterapia, alimentação terapêutica e práticas
                  integrativas selecionados com base nos sintomas relatados.
                </Typography>
              </Alert>
              {boarimProtocols.map((bp, idx) => (
                <Box key={idx} sx={{ mb:2 }}>
                  <BoarimProtocol protocol={bp} />
                </Box>
              ))}
            </Paper>
          </Box>
        )}

        <Paper className="no-print" variant="outlined" sx={{ mt:4, p:3, textAlign:'center', borderColor:'primary.main', background:'#f8fbff' }}>
          <Typography variant="subtitle1" fontWeight={700} color="primary.dark" sx={{ mb:0.5 }}>
            Exportar todos os protocolos gerados
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb:2 }}>
            Inclui todos os tratamentos, orientações e seções expandidas em um único documento.
          </Typography>
          <Box sx={{ display:'flex', justifyContent:'center', gap:1.5, flexWrap:'wrap' }}>
            <Button variant="contained" color="primary" startIcon={<PrintIcon />} onClick={handlePrintCompleteProtocols}>
              Imprimir todos os protocolos
            </Button>
            <Button variant="outlined" color="primary" startIcon={<DownloadIcon />} onClick={handleDownloadCompleteProtocols}>
              Baixar todos em PDF
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  };

  // ── STEP 11: Bioimpedância ─────────────────
  const renderStepBioimpedancia = () => {
    const BioField = ({ label, field, unit, hint }) => (
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth size="small"
          label={`${label}${unit ? ` (${unit})` : ''}`}
          value={data[field] || ''}
          onChange={e => set(field, e.target.value.replace(/[^0-9.,]/g, ''))}
          InputProps={hint ? { endAdornment: <Typography variant="caption" color="text.secondary" sx={{ whiteSpace:'nowrap' }}>{hint}</Typography> } : undefined}
        />
      </Grid>
    );
    const ClassChip = ({ val, fn, extra }) => {
      if (!val) return null;
      const res = fn ? fn() : null;
      if (!res) return null;
      return <Chip label={res.label} color={res.color === 'success' ? 'success' : res.color === 'warning' ? 'warning' : 'error'} size="small" sx={{ ml:1, mb:0.5 }} />;
    };
    const delta = (curr, prev, unit) => {
      const d = deltaBio(curr, prev, unit);
      if (!d) return null;
      const up = d.startsWith('+');
      return <Chip label={d} size="small" sx={{ ml:1 }} color={up ? 'error' : 'success'} icon={up ? undefined : undefined} />;
    };
    const bfClass = classifyBodyFat(data.bioGorduraPerc, data.sexo);
    const visClass = classifyVisceral(data.bioGorduraVisceral);
    const watClass = classifyBodyWater(data.bioAguaPerc, data.sexo);
    const proClass = classifyProtein(data.bioProteinaPerc);
    const metClass = classifyMetabolicAge(data.bioIdadeMetabolica, data.idade);
    const muscClass = classifyMuscleMass(data.bioMassaMuscular, data.bioPesoMed || data.peso, data.sexo);
    const ossClass = classifyBoneMass(data.bioMassaOssea, data.bioPesoMed || data.peso);

    return (
      <Box>
        <Box sx={{ display:'flex', alignItems:'center', gap:1, mb:1 }}>
          <Typography variant="body2" color="text.secondary">
            🔬 Registre os dados da balança de bioimpedância (OkOK, Tanita, InBody, Omron, Xiaomi, etc.). Todos os campos são opcionais — preencha os disponíveis no seu aparelho.
          </Typography>
        </Box>

        <SectionTitle>📅 Identificação da Medição</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="Data da medição" value={data.bioDataMedicao}
              onChange={e => set('bioDataMedicao', maskDate(e.target.value))} placeholder="DD/MM/AAAA" inputProps={{ maxLength:10 }} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="Peso medido pela balança (kg)" value={data.bioPesoMed}
              onChange={e => set('bioPesoMed', e.target.value.replace(/[^0-9.,]/g, ''))} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="Pontuação corporal / Score" value={data.bioPontuacaoCorp}
              onChange={e => set('bioPontuacaoCorp', e.target.value.replace(/[^0-9.,]/g, ''))}
              helperText="Ex: 0–100 (varia por fabricante)" />
          </Grid>
        </Grid>

        <SectionTitle>🫀 Gordura Corporal</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="% Gordura Corporal" value={data.bioGorduraPerc}
              onChange={e => set('bioGorduraPerc', e.target.value.replace(/[^0-9.,]/g, ''))} />
            {bfClass && <Chip label={bfClass.label} color={bfClass.color === 'success' ? 'success' : bfClass.color === 'warning' ? 'warning' : 'error'} size="small" sx={{ mt:0.5 }} />}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="Gordura Corporal (kg)" value={data.bioGorduraKg}
              onChange={e => set('bioGorduraKg', e.target.value.replace(/[^0-9.,]/g, ''))} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="Gordura Subcutânea (%)" value={data.bioGorduraSubcut}
              onChange={e => set('bioGorduraSubcut', e.target.value.replace(/[^0-9.,]/g, ''))} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField fullWidth size="small" label="Gordura Visceral (nível 1–25)" value={data.bioGorduraVisceral}
              onChange={e => set('bioGorduraVisceral', e.target.value.replace(/[^0-9.,]/g, ''))} />
            {visClass && <Chip label={visClass.label} color={visClass.color === 'success' ? 'success' : visClass.color === 'warning' ? 'warning' : 'error'} size="small" sx={{ mt:0.5 }} />}
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mt:0.5 }}>Normal ≤9 · Elevado 10–14 · Alto risco ≥15</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="body2" color="text.secondary" sx={{ mt:1.5, fontStyle:'italic' }}>
              <b>Referência % Gordura:</b><br/>
              Homem: Atlético 6–13% · Fitness 14–17% · Adequado 18–24% · Sobrepeso ≥25%<br/>
              Mulher: Atlética 14–20% · Fitness 21–24% · Adequada 25–31% · Sobrepeso ≥32%
            </Typography>
          </Grid>
        </Grid>

        <SectionTitle>💪 Massa Muscular</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="Massa Muscular (kg)" value={data.bioMassaMuscular}
              onChange={e => set('bioMassaMuscular', e.target.value.replace(/[^0-9.,]/g, ''))} />
            {muscClass && <Chip label={muscClass.label} color={muscClass.color === 'success' ? 'success' : muscClass.color === 'warning' ? 'warning' : 'error'} size="small" sx={{ mt:0.5 }} />}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="Músculo Esquelético (%)" value={data.bioMuscEsqueletico}
              onChange={e => set('bioMuscEsqueletico', e.target.value.replace(/[^0-9.,]/g, ''))} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="Massa Magra / Lean Mass (kg)" value={data.bioMassaMagra}
              onChange={e => set('bioMassaMagra', e.target.value.replace(/[^0-9.,]/g, ''))} />
          </Grid>
        </Grid>

        <SectionTitle>🦴 Osso · 💧 Água · 🧬 Proteína</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="Massa Óssea (kg)" value={data.bioMassaOssea}
              onChange={e => set('bioMassaOssea', e.target.value.replace(/[^0-9.,]/g, ''))} />
            {ossClass && <Chip label={ossClass.label} color={ossClass.color === 'success' ? 'success' : ossClass.color === 'warning' ? 'warning' : 'error'} size="small" sx={{ mt:0.5 }} />}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="% Água Corporal" value={data.bioAguaPerc}
              onChange={e => set('bioAguaPerc', e.target.value.replace(/[^0-9.,]/g, ''))} />
            {watClass && <Chip label={watClass.label} color={watClass.color === 'success' ? 'success' : watClass.color === 'warning' ? 'warning' : 'error'} size="small" sx={{ mt:0.5 }} />}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="% Proteína Corporal" value={data.bioProteinaPerc}
              onChange={e => set('bioProteinaPerc', e.target.value.replace(/[^0-9.,]/g, ''))} />
            {proClass && <Chip label={proClass.label} color={proClass.color === 'success' ? 'success' : proClass.color === 'warning' ? 'warning' : 'error'} size="small" sx={{ mt:0.5 }} />}
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mt:0.5 }}>Normal ≥16%</Typography>
          </Grid>
        </Grid>

        <SectionTitle>⚡ Metabolismo</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField fullWidth size="small" label="Metabolismo Basal / TMB (kcal/dia)" value={data.bioMetabolismoBasal}
              onChange={e => set('bioMetabolismoBasal', e.target.value.replace(/[^0-9.,]/g, ''))} />
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mt:0.5 }}>
              Energia mínima necessária em repouso completo (média: H 1.500–2.000 · M 1.200–1.600 kcal)
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField fullWidth size="small" label="Idade Metabólica (anos)" value={data.bioIdadeMetabolica}
              onChange={e => set('bioIdadeMetabolica', e.target.value.replace(/[^0-9]/g, ''))} />
            {metClass && <Chip label={metClass.label} color={metClass.color === 'success' ? 'success' : metClass.color === 'warning' ? 'warning' : 'error'} size="small" sx={{ mt:0.5 }} />}
          </Grid>
        </Grid>

        <SectionTitle>🗺️ Análise Segmental (InBody / escalas avançadas)</SectionTitle>
        <Typography variant="caption" color="text.secondary" sx={{ mb:1, display:'block' }}>
          Preencha se seu aparelho fornece análise por segmento corporal (braços, tronco e pernas separadamente).
        </Typography>
        <Grid container spacing={2}>
          {[
            ['bioSegMuscBrD','Músculo Braço Dir. (kg)'],
            ['bioSegMuscBrE','Músculo Braço Esq. (kg)'],
            ['bioSegMuscTronco','Músculo Tronco (kg)'],
            ['bioSegMuscPnD','Músculo Perna Dir. (kg)'],
            ['bioSegMuscPnE','Músculo Perna Esq. (kg)'],
          ].map(([k, l]) => (
            <Grid item xs={6} sm={4} md={2.4} key={k}>
              <TextField fullWidth size="small" label={l} value={data[k] || ''}
                onChange={e => set(k, e.target.value.replace(/[^0-9.,]/g, ''))} />
            </Grid>
          ))}
          {[
            ['bioSegGordBrD','Gordura Braço Dir. (%)'],
            ['bioSegGordBrE','Gordura Braço Esq. (%)'],
            ['bioSegGordTronco','Gordura Tronco (%)'],
            ['bioSegGordPnD','Gordura Perna Dir. (%)'],
            ['bioSegGordPnE','Gordura Perna Esq. (%)'],
          ].map(([k, l]) => (
            <Grid item xs={6} sm={4} md={2.4} key={k}>
              <TextField fullWidth size="small" label={l} value={data[k] || ''}
                onChange={e => set(k, e.target.value.replace(/[^0-9.,]/g, ''))} />
            </Grid>
          ))}
        </Grid>

        <SectionTitle>📈 Evolução — Comparação com Medição Anterior</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="Data da medição anterior" value={data.bioDataAnterior}
              onChange={e => set('bioDataAnterior', maskDate(e.target.value))} placeholder="DD/MM/AAAA" inputProps={{ maxLength:10 }} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="% Gordura anterior" value={data.bioGorduraPercAnt}
              onChange={e => set('bioGorduraPercAnt', e.target.value.replace(/[^0-9.,]/g, ''))} />
            {data.bioGorduraPerc && data.bioGorduraPercAnt && (
              <Box sx={{ mt:0.5, display:'flex', alignItems:'center' }}>
                <Typography variant="caption">Variação: </Typography>
                {(() => { const d = (parseFloat(data.bioGorduraPerc) - parseFloat(data.bioGorduraPercAnt)).toFixed(1); const up = d > 0; return <Chip label={`${up?'+':''}${d}%`} size="small" color={up?'error':'success'} sx={{ ml:0.5 }} />; })()}
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="Massa Muscular anterior (kg)" value={data.bioMassaMuscularAnt}
              onChange={e => set('bioMassaMuscularAnt', e.target.value.replace(/[^0-9.,]/g, ''))} />
            {data.bioMassaMuscular && data.bioMassaMuscularAnt && (
              <Box sx={{ mt:0.5, display:'flex', alignItems:'center' }}>
                <Typography variant="caption">Variação: </Typography>
                {(() => { const d = (parseFloat(data.bioMassaMuscular) - parseFloat(data.bioMassaMuscularAnt)).toFixed(1); const up = d > 0; return <Chip label={`${up?'+':''}${d} kg`} size="small" color={up?'success':'warning'} sx={{ ml:0.5 }} />; })()}
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="Gordura Visceral anterior" value={data.bioGorduraVisceralAnt}
              onChange={e => set('bioGorduraVisceralAnt', e.target.value.replace(/[^0-9.,]/g, ''))} />
            {data.bioGorduraVisceral && data.bioGorduraVisceralAnt && (
              <Box sx={{ mt:0.5, display:'flex', alignItems:'center' }}>
                <Typography variant="caption">Variação: </Typography>
                {(() => { const d = (parseFloat(data.bioGorduraVisceral) - parseFloat(data.bioGorduraVisceralAnt)).toFixed(1); const up = d > 0; return <Chip label={`${up?'+':''}${d} nív`} size="small" color={up?'error':'success'} sx={{ ml:0.5 }} />; })()}
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="% Água anterior" value={data.bioAguaPercAnt}
              onChange={e => set('bioAguaPercAnt', e.target.value.replace(/[^0-9.,]/g, ''))} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" label="Metabolismo Basal anterior (kcal)" value={data.bioMetabolismoBasalAnt}
              onChange={e => set('bioMetabolismoBasalAnt', e.target.value.replace(/[^0-9.,]/g, ''))} />
          </Grid>
        </Grid>

        <SectionTitle>📝 Observações da Bioimpedância</SectionTitle>
        <TextField fullWidth multiline rows={3} size="small"
          label="Observações, contexto da medição, orientações sobre o exame…"
          value={data.bioObsBio} onChange={e => set('bioObsBio', e.target.value)} />

        {/* Preview de alertas gerados */}
        {protocol && (() => {
          const bioAs = protocol.alerts.filter(a =>
            a.m.includes('visceral') || a.m.includes('Gordura') || a.m.includes('muscular') ||
            a.m.includes('óssea') || a.m.includes('metabólica') || a.m.includes('Proteína') ||
            a.m.includes('metabólico') || a.m.includes('Hidratação')
          );
          if (bioAs.length === 0) return null;
          return (
            <Box sx={{ mt:2 }}>
              <Typography variant="subtitle2" fontWeight={700} color="warning.dark" sx={{ mb:1 }}>
                ⚠️ Alertas gerados pela análise de bioimpedância:
              </Typography>
              {bioAs.map((a,i) => (
                <Alert key={i} severity={a.s === 'error' ? 'error' : 'warning'} sx={{ mb:1, py:0.5 }}>
                  <Typography variant="body2">{a.m}</Typography>
                </Alert>
              ))}
            </Box>
          );
        })()}
      </Box>
    );
  };

  // ── STEP 12: Hipóteses Diagnósticas ──────────────────────
  const renderStepHipoteses = () => {
    const hipMap = {
      nutricional: data.hipoteseNutricional||{},
      metabolica: data.hipoteseMetabolica||{},
      hormonal_diag: data.hipoteseHormonal||{},
      inflamacao: data.hipoteseInflamacao||{},
      intoxicacao: data.hipoteseIntoxicacao||{},
      mental: data.hipoteseMental||{},
    };
    const hipKeys = {
      nutricional:'hipoteseNutricional', metabolica:'hipoteseMetabolica',
      hormonal_diag:'hipoteseHormonal', inflamacao:'hipoteseInflamacao',
      intoxicacao:'hipoteseIntoxicacao', mental:'hipoteseMental',
    };

    const allConfirmed = Object.entries(hipMap).flatMap(([catKey, sel]) =>
      Object.entries(sel).filter(([,v]) => v).map(([item]) => ({ catKey, item }))
    );

    const allSugeridas = Object.entries(hipotesesSugeridas).flatMap(([catKey, set]) =>
      [...set].map(item => ({ catKey, item }))
    );

    const pendentes = allSugeridas.filter(({ catKey, item }) => !hipMap[catKey]?.[item]);

    const confirmarTodas = () => {
      setData(p => {
        const next = { ...p };
        allSugeridas.forEach(({ catKey, item }) => {
          next[hipKeys[catKey]] = { ...(next[hipKeys[catKey]]||{}), [item]: true };
        });
        return next;
      });
    };

    const confirmarUma = (catKey, item) =>
      setData(p => ({ ...p, [hipKeys[catKey]]: { ...(p[hipKeys[catKey]]||{}), [item]: true } }));

    const totalSugeridas = allSugeridas.length;
    const totalPendentes = pendentes.length;

    return (
      <Box>
        <SectionTitle>Hipóteses Diagnósticas</SectionTitle>

        {/* Banner informativo */}
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2" fontWeight={600}>🤖 Análise automática baseada na anamnese</Typography>
          <Typography variant="body2">
            O sistema identificou <strong>{totalSugeridas} hipótese(s)</strong> com base nas informações preenchidas
            nas etapas anteriores. Revise, confirme ou descarte cada sugestão. Você também pode marcar hipóteses
            adicionais manualmente nos acordeões abaixo.
          </Typography>
        </Alert>

        {/* Painel de sugestões automáticas */}
        {totalSugeridas > 0 && (
          <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: '#fffbf0', borderColor: '#f59e0b' }}>
            <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', mb: 1, flexWrap:'wrap', gap:1 }}>
              <Typography variant="subtitle2" fontWeight={700} color="warning.dark">
                ⚡ Hipóteses identificadas pelo sistema ({totalSugeridas})
              </Typography>
              {totalPendentes > 0 && (
                <Button size="small" variant="contained" color="warning" onClick={confirmarTodas}>
                  Confirmar todas ({totalPendentes} pendentes)
                </Button>
              )}
            </Box>
            {Object.entries(hipotesesSugeridas).map(([catKey, set]) => {
              if (set.size === 0) return null;
              const cat = HIPOTESES_CATEGORIAS[catKey];
              return (
                <Box key={catKey} sx={{ mb: 1.5 }}>
                  <Typography variant="caption" fontWeight={700} color="text.secondary" display="block">{cat.label}</Typography>
                  <Box sx={{ display:'flex', flexWrap:'wrap', gap:0.5, mt:0.3 }}>
                    {[...set].map(item => {
                      const isConfirmed = !!(hipMap[catKey]||{})[item];
                      return (
                        <Chip
                          key={item}
                          label={item}
                          size="small"
                          color={isConfirmed ? 'success' : 'warning'}
                          variant={isConfirmed ? 'filled' : 'outlined'}
                          icon={isConfirmed ? <OkIcon style={{ fontSize: 14 }} /> : undefined}
                          onClick={!isConfirmed ? () => confirmarUma(catKey, item) : undefined}
                          onDelete={isConfirmed
                            ? () => setData(p => ({ ...p, [hipKeys[catKey]]: { ...(p[hipKeys[catKey]]||{}), [item]: false } }))
                            : undefined}
                          sx={{ cursor: isConfirmed ? 'default' : 'pointer', fontSize:'0.72rem' }}
                        />
                      );
                    })}
                  </Box>
                </Box>
              );
            })}
            {totalPendentes === 0 && totalSugeridas > 0 && (
              <Typography variant="caption" color="success.main">✓ Todas as sugestões foram confirmadas</Typography>
            )}
          </Paper>
        )}

        {totalSugeridas === 0 && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Nenhuma hipótese identificada automaticamente para os dados preenchidos até o momento.
            Você pode adicionar hipóteses manualmente abaixo.
          </Alert>
        )}

        {/* Sumário das hipóteses confirmadas */}
        {allConfirmed.length > 0 && (
          <Paper variant="outlined" sx={{ p: 1.5, mb: 2, bgcolor: '#f0fdf4', borderColor: '#22c55e' }}>
            <Typography variant="caption" fontWeight={700} color="success.dark">
              ✓ Hipóteses confirmadas ({allConfirmed.length}):
            </Typography>
            <Box sx={{ display:'flex', flexWrap:'wrap', gap:0.5, mt:0.5 }}>
              {allConfirmed.map(({ catKey, item }) => (
                <Chip key={`${catKey}-${item}`} label={item} size="small" color="success" variant="outlined"
                  onDelete={() => setData(p => ({
                    ...p,
                    [hipKeys[catKey]]: { ...(p[hipKeys[catKey]]||{}), [item]: false }
                  }))} />
              ))}
            </Box>
          </Paper>
        )}

        {/* Acordeões por categoria — seleção manual ou confirmação individual */}
        <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 1, mb: 1 }}>
          Detalhamento por categoria:
        </Typography>
        {Object.entries(HIPOTESES_CATEGORIAS).map(([catKey, cat]) => {
          const sugestoes = hipotesesSugeridas[catKey] || new Set();
          const nConfirm = Object.values(hipMap[catKey]||{}).filter(Boolean).length;
          return (
            <Accordion key={catKey} sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body2" fontWeight={700}>{cat.label}</Typography>
                {sugestoes.size > 0 && (
                  <Chip size="small" label={`⚡ ${sugestoes.size}`} color="warning" sx={{ ml:1 }} />
                )}
                {nConfirm > 0 && (
                  <Chip size="small" label={`✓ ${nConfirm}`} color="success" sx={{ ml:0.5 }} />
                )}
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup row sx={{ flexWrap:'wrap' }}>
                  {cat.itens.map(item => {
                    const isSugerida = sugestoes.has(item);
                    const isConfirmed = !!(hipMap[catKey]||{})[item];
                    return (
                      <FormControlLabel key={item}
                        sx={{
                          minWidth: '240px', borderRadius: 1, px: 0.5, my: 0.2,
                          bgcolor: isSugerida ? 'rgba(245,158,11,0.08)' : 'transparent',
                          border: isSugerida && !isConfirmed ? '1px solid rgba(245,158,11,0.35)' : '1px solid transparent',
                        }}
                        control={<Checkbox size="small"
                          checked={isConfirmed}
                          color={isSugerida ? 'warning' : 'primary'}
                          onChange={e => setData(p => ({
                            ...p,
                            [hipKeys[catKey]]: { ...(p[hipKeys[catKey]]||{}), [item]: e.target.checked }
                          }))} />}
                        label={
                          <Box sx={{ display:'flex', alignItems:'center', gap:0.5, flexWrap:'wrap' }}>
                            <Typography variant="body2">{item}</Typography>
                            {isSugerida && (
                              <Chip label="⚡ sistema" size="small" color="warning" variant="outlined"
                                sx={{ height:16, fontSize:'0.6rem', cursor:'default' }} />
                            )}
                          </Box>
                        } />
                    );
                  })}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          );
        })}

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>📋 Plano Terapêutico Geral</Typography>
          <TextField
            fullWidth multiline rows={4} size="small"
            label="Plano terapêutico (texto livre)"
            placeholder="Descreva as condutas, encaminhamentos e orientações terapêuticas gerais..."
            value={data.planoTerapeutico}
            onChange={e => set('planoTerapeutico', e.target.value)}
          />
        </Box>
      </Box>
    );
  };

  const steps = [renderStep0, renderStep1, renderStep2, renderStep3, renderStep4, renderStep5, renderStep6, renderStep7, renderStep8, renderStep9, renderStep10, renderStepBioimpedancia, renderStepHipoteses, renderProtocol];

  return (
    <Box sx={{ maxWidth:1100, mx:'auto' }}>
      {/* Timbre do terapeuta */}
      <PrescriptionHeader />

      {/* Cabeçalho */}
      <Paper sx={{ p:2, mb:2, background:'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)', color:'white', borderRadius:2 }}>
        <Typography variant="h5" fontWeight={700}>🩺 Anamnese Integrativa Completa</Typography>
        <Typography variant="caption" sx={{ opacity:0.9 }}>
          Triagem terapêutica profissional · Rastreamento nutricional · Protocolo automático de tratamento
        </Typography>
      </Paper>

      {/* Progress */}
      <Box sx={{ mb:2 }}>
        <Box sx={{ display:'flex', justifyContent:'space-between', mb:0.5 }}>
          <Typography variant="caption" color="text.secondary">{STEP_LABELS[step]}</Typography>
          <Typography variant="caption" color="text.secondary">{step + 1} / {STEP_LABELS.length}</Typography>
        </Box>
        <LinearProgress variant="determinate" value={(step / (STEP_LABELS.length - 1)) * 100} sx={{ height:8, borderRadius:4 }} />
        <Box sx={{ display:'flex', gap:0.5, mt:0.5, flexWrap:'wrap' }}>
          {STEP_LABELS.map((l, i) => (
            <Chip key={i} label={i + 1} size="small"
              color={i === step ? 'primary' : i < step ? 'success' : 'default'}
              variant={i === step ? 'filled' : 'outlined'}
              onClick={() => setStep(i)}
              sx={{ cursor:'pointer', minWidth:32, fontSize:'0.7rem' }}
            />
          ))}
        </Box>
      </Box>

      {/* Conteúdo do step */}
      <Paper sx={{ p:3, mb:2, borderRadius:2 }}>
        {steps[step]()}
      </Paper>

      {/* Navegação */}
      <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:2 }}>
        <Button variant="outlined" startIcon={<BackIcon />} onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>
          Anterior
        </Button>
        <Box sx={{ display:'flex', gap:1 }}>
          <Button
            variant="outlined"
            color="success"
            startIcon={<SaveIcon />}
            onClick={handleSaveInteragente}
            size="small"
          >
            {savedId ? 'Atualizar' : 'Salvar Interagente'}
          </Button>
          <Tooltip title="Reiniciar formulário e apagar rascunho">
            <IconButton onClick={() => { setData(INIT); setStep(0); setSavedId(null); localStorage.removeItem('anamneseIntegrativaRascunho'); }} size="small" color="warning">
              <RestartIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {step < STEP_LABELS.length - 1 ? (
          <Button variant="contained" endIcon={<NextIcon />} onClick={() => setStep(s => s + 1)}>
            {step === STEP_LABELS.length - 2 ? 'Ver Protocolo' : 'Próximo'}
          </Button>
        ) : (
          <Button variant="outlined" color="primary" startIcon={<BackIcon />} onClick={() => setStep(s => Math.max(0, s - 1))}>
            Editar Respostas
          </Button>
        )}
      </Box>

      {/* Salvar no paciente */}
      <SaveToPatientBar
        moduleKey="anamneseIntegrativaCompleta"
        getData={() => ({ ...data, protocolGeradoEm: new Date().toISOString(), imc, rcq })}
        label="Salvar anamnese completa no interagente"
      />

      {/* Rodapé com carimbo */}
      <PrescriptionFooter />

      {/* Snackbar de feedback de salvamento */}
      <Snackbar
        open={saveSnack.open}
        autoHideDuration={5000}
        onClose={() => setSaveSnack(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSaveSnack(s => ({ ...s, open: false }))}
          severity={saveSnack.severity}
          sx={{ width: '100%' }}
          action={
            savedId && saveSnack.severity === 'success' ? (
              <Button color="inherit" size="small" onClick={() => navigate('/dashboard')}>
                Ver Dashboard
              </Button>
            ) : undefined
          }
        >
          {saveSnack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────
// ADAPTAÇÃO DE CARDÁPIOS POR RESTRIÇÕES ALIMENTARES
// ─────────────────────────────────────────────────────────────

/**
 * Extrai o perfil de restrições alimentares do formulário preenchido.
 * Combina intolerâncias, dieta e restrições específicas.
 */
function buildRestricoesDietéticas(data) {
  // Merge campos antigos (seção 23 Alimentação: rest*) com novos campos diet*
  const r = {
    semGluten:   data.intolGluten || data.dietSemGluten || data.dietAIP || data.restSemGluten,
    semLactose:  data.intolLactose || data.dietSemLactose || data.dietVegano || data.dietAIP || data.restSemLactose,
    semOvo:      data.intolOvo || data.dietSemOvo || data.dietVegano,
    semSoja:     data.intolSoja || data.dietSemSoja || data.dietAIP,
    semCarne:    data.dietVegetariano || data.dietVegano || data.dietSemCarne || data.dietOvolactovegetariano || data.restVegetariano || data.restVegano,
    semFrutosMar:data.dietSemFrutosMar,
    semCastanhas:data.dietSemCastanhas,
    semAmendoim: data.dietSemAmendoim,
    vegano:      data.dietVegano || data.restVegano,
    vegetariano: data.dietVegetariano || data.dietOvolactovegetariano || data.dietVegano || data.restVegetariano || data.restVegano,
    keto:        data.dietKetogenica || data.restCetogenica,
    lowCarb:     data.dietLowCarb || data.dietKetogenica || data.restLowCarb || data.restCetogenica,
    lowFODMAP:   data.dietFODMAP,
    AIP:         data.dietAIP,
    semAcucar:   data.dietSemAcucar,
    jejum:       data.dietIntermittentFasting || data.restJejum,
    obsExtra:    data.dietObsAlimentar || '',
    labels: [],
  };

  if (data.dietVegano || data.restVegano)               r.labels.push('Vegano');
  else if (data.dietOvolactovegetariano)                 r.labels.push('Ovolactovegetariano');
  else if (data.dietVegetariano || data.restVegetariano) r.labels.push('Vegetariano');
  if (data.dietKetogenica || data.restCetogenica) r.labels.push('Cetogênica');
  else if (data.dietLowCarb || data.restLowCarb)  r.labels.push('Low Carb');
  if (data.dietAIP)         r.labels.push('AIP');
  if (data.dietFODMAP)      r.labels.push('Low FODMAP');
  if (data.dietMediterranea) r.labels.push('Mediterrânea');
  if (data.dietIntermittentFasting || data.restJejum) r.labels.push('Jejum Intermitente');
  if (data.dietSemAcucar)   r.labels.push('Sem açúcar');
  if (data.intolGluten || data.dietSemGluten || data.restSemGluten) r.labels.push('Sem glúten');
  if (data.intolLactose || data.dietSemLactose || data.restSemLactose) r.labels.push('Sem lactose');
  if (data.intolOvo || data.dietSemOvo) r.labels.push('Sem ovos');
  if (data.intolSoja || data.dietSemSoja) r.labels.push('Sem soja');
  if (data.dietSemFrutosMar) r.labels.push('Sem frutos do mar');
  if (data.dietSemCastanhas) r.labels.push('Sem castanhas/nozes');
  if (data.dietSemAmendoim)  r.labels.push('Sem amendoim');
  if (data.dietHalal)  r.labels.push('Halal');
  if (data.dietKosher) r.labels.push('Kosher');
  if (data.dietOutra && data.dietOutraDesc) r.labels.push(data.dietOutraDesc);

  return r;
}

// Mapa de substituições: item proibido → substituto funcional
const SUBSTITUICOES = {
  // Glúten / cereais
  'aveia':              { semGluten: 'aveia sem glúten' },
  'pão':                { semGluten: 'pão sem glúten' },
  'pão integral':       { semGluten: 'pão de arroz sem glúten' },
  'tapioca':            {}, // já sem glúten
  'macarrão':           { semGluten: 'macarrão de arroz ou grão-de-bico' },
  'macarrão integral':  { semGluten: 'macarrão de arroz' },
  'macarrão de arroz':  {}, // ok
  'granola':            { semGluten: 'granola sem glúten' },
  // Lactose / laticínios
  'iogurte natural':    { semLactose: 'iogurte sem lactose ou de coco', vegano: 'iogurte de coco' },
  'kefir':              { semLactose: 'kefir de água', vegano: 'kefir de água' },
  'iogurte de coco':    {},
  'leite de amêndoas':  {},
  'leite de coco':      {},
  'leite vegetal':      {},
  // Ovos
  'ovo mexido':         { semOvo: 'tofu mexido (scrambled tofu) com cúrcuma', vegano: 'tofu mexido com cúrcuma' },
  'omelete':            { semOvo: 'omelete de tofu/grão-de-bico', vegano: 'omelete de grão-de-bico' },
  'ovo cozido':         { semOvo: 'tofu firme + molho shoyu', vegano: 'tofu firme + molho shoyu' },
  'ovo estrelado':      { semOvo: 'tofu grelhado com cúrcuma', vegano: 'tofu grelhado com cúrcuma' },
  'ovo pochê':          { semOvo: 'tofu macio marinado', vegano: 'tofu macio marinado' },
  // Carnes
  'frango':             { semCarne: 'tofu grelhado ou lentilha', vegetariano: 'tofu grelhado ou lentilha', vegano: 'tofu grelhado ou lentilha' },
  'frango grelhado':    { semCarne: 'tofu grelhado', vegetariano: 'tofu grelhado', vegano: 'tofu grelhado' },
  'frango orgânico':    { semCarne: 'grão-de-bico assado', vegetariano: 'grão-de-bico assado', vegano: 'grão-de-bico assado' },
  'frango desfiado':    { semCarne: 'jaca verde desfiada', vegetariano: 'jaca verde desfiada', vegano: 'jaca verde desfiada' },
  'frango assado':      { semCarne: 'grão-de-bico + batata-doce assada', vegetariano: 'grão-de-bico + batata-doce assada', vegano: 'grão-de-bico + batata-doce assada' },
  'carne bovina magra': { semCarne: 'lentilha vermelha + beterraba', vegetariano: 'lentilha vermelha + beterraba', vegano: 'lentilha vermelha + beterraba' },
  'atum':               { semCarne: 'grão-de-bico com limão', semFrutosMar: 'grão-de-bico com limão', vegetariano: 'grão-de-bico com limão', vegano: 'grão-de-bico com limão' },
  'salmão':             { semCarne: 'lentilha + cúrcuma', semFrutosMar: 'lentilha + cúrcuma', vegetariano: 'lentilha + cúrcuma', vegano: 'lentilha + cúrcuma' },
  'salmão grelhado':    { semCarne: 'tofu defumado grelhado', semFrutosMar: 'tofu defumado grelhado', vegetariano: 'tofu defumado grelhado', vegano: 'tofu defumado grelhado' },
  'sardinha':           { semCarne: 'cogumelos grelhados', semFrutosMar: 'cogumelos grelhados', vegetariano: 'cogumelos grelhados', vegano: 'cogumelos grelhados' },
  'peixe grelhado':     { semCarne: 'tofu com ervas', semFrutosMar: 'tofu com ervas', vegetariano: 'tofu com ervas', vegano: 'tofu com ervas' },
  'peixe assado':       { semCarne: 'lentilha assada com ervas', semFrutosMar: 'lentilha assada com ervas', vegetariano: 'lentilha assada com ervas', vegano: 'lentilha assada com ervas' },
  // Soja
  'tofu':               { semSoja: 'grão-de-bico ou cogumelo firme' },
  'miso branco':        { semSoja: 'caldo de legumes concentrado' },
  // Castanhas/nozes
  'castanha-do-pará':   { semCastanhas: 'semente de girassol (selênio)' },
  'castanhas':          { semCastanhas: 'sementes de abóbora' },
  'nozes':              { semCastanhas: 'sementes de abóbora ou girassol' },
  'amêndoas':           { semCastanhas: 'sementes de abóbora' },
  'amendoim':           { semAmendoim: 'semente de girassol' },
  // Low FODMAP
  'cebola':             { lowFODMAP: 'parte verde de cebolinha (tolerada)' },
  'alho':               { lowFODMAP: 'alho em azeite (infusão — low FODMAP)' },
  'grão-de-bico':       { lowFODMAP: 'tofu firme ou proteína de arroz' },
  'feijão':             { lowFODMAP: 'feijão-de-lima enlatado (lavado, porção 46g)' },
  'lentilha':           { lowFODMAP: 'lentilha enlatada e lavada (porção pequena)' },
  'maçã':               { lowFODMAP: 'morango ou kiwi' },
  // Keto / Low Carb
  'arroz integral':     { keto: 'couve-flor em grãos (arroz de couve-flor)', lowCarb: 'arroz de couve-flor ou arroz integral (1/2 porção)' },
  'batata-doce':        { keto: 'abobrinha grelhada', lowCarb: 'batata-doce (porção reduzida a 80g)' },
  'banana':             { keto: 'morangos (low carb)', lowCarb: 'banana verde (amido resistente — menor IG)' },
  'banana madura':      { keto: 'morangos', lowCarb: 'banana verde' },
  'tâmara':             { keto: 'azeite de oliva + nozes (omitir a tâmara)' },
  'granola sem açúcar': { keto: 'mix de sementes (chia + linhaça + coco ralado)' },
};

/**
 * Aplica substituições em uma string de refeição com base nas restrições.
 * Faz substituições de tokens em ordem de prioridade.
 */
function aplicarSubstituicoes(textoRefeicao, restricoes) {
  if (!textoRefeicao || !restricoes) return textoRefeicao;

  let texto = textoRefeicao;
  const restricoesAtivas = Object.keys(restricoes).filter(k => restricoes[k] === true);

  // Ordenar por comprimento descrescente para substituir tokens mais longos primeiro
  const tokens = Object.keys(SUBSTITUICOES).sort((a, b) => b.length - a.length);

  tokens.forEach(token => {
    const regex = new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    if (regex.test(texto)) {
      const subs = SUBSTITUICOES[token];
      // Pegar a primeira restrição ativa que tem substituição
      for (const r of restricoesAtivas) {
        if (subs[r]) {
          texto = texto.replace(new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), subs[r]);
          break;
        }
      }
    }
  });

  return texto;
}

/**
 * Adapta todos os cardápios com base nas restrições. Retorna cópia modificada.
 */
function adaptCardapiosToRestrictions(cardapios, restricoes) {
  if (!restricoes || restricoes.labels.length === 0) return cardapios;
  return (cardapios || []).map(cardapio => {
    if (!cardapio || !cardapio.dias) return cardapio;
    return {
      ...cardapio,
      label: cardapio.label,
      observacoes: cardapio.observacoes + (restricoes.labels.length > 0
        ? `\n⚠️ Adaptado para: ${restricoes.labels.join(', ')}.`
        : ''),
      dias: cardapio.dias.map(dia => ({
        ...dia,
        cafe:    aplicarSubstituicoes(dia.cafe, restricoes),
        lanche1: aplicarSubstituicoes(dia.lanche1, restricoes),
        almoco:  aplicarSubstituicoes(dia.almoco, restricoes),
        lanche2: aplicarSubstituicoes(dia.lanche2, restricoes),
        jantar:  aplicarSubstituicoes(dia.jantar, restricoes),
      })),
    };
  });
}

/**
 * Filtra/adapta receitas com base nas restrições.
 */
function adaptReceitasToRestrictions(receitas, restricoes) {
  if (!restricoes || restricoes.labels.length === 0) return receitas;
  return (receitas || []).map(r => ({
    ...r,
    ingredientes: (r.ingredientes || []).map(ing => aplicarSubstituicoes(ing, restricoes)),
    modo: aplicarSubstituicoes(r.modo || '', restricoes),
  }));
}

// ─────────────────────────────────────────────────────────────
// HTML BUILDERS PARA IMPRESSÃO COM TIMBRE
// ─────────────────────────────────────────────────────────────
function buildProtocolHtmlForPrint(data, protocol) {
  if (!protocol) return '<p>Protocolo não disponível.</p>';
  const { alerts, scores, deficiencias, fito, homo, flores, exames, condutas } = protocol;
  const date = new Date().toLocaleDateString('pt-BR');
  const tdS = 'padding:6px 10px;border:1px solid #ddd;font-size:0.88em;vertical-align:top;';
  const thS = 'background:#f0f4f8;padding:6px 10px;font-weight:bold;text-align:left;border:1px solid #ccc;font-size:0.88em;';
  const tblS = 'border-collapse:collapse;width:100%;margin-bottom:14px;';

  const sysNames = {
    digestorio:'Digestório', hepatico:'Hepático', renal:'Renal', cardio:'Cardiovascular',
    respiratorio:'Respiratório', neurologico:'Neurológico', osteomuscular:'Osteomuscular',
    pele:'Pele/Cabelo/Unhas', imunologico:'Imunológico', endocrino:'Endócrino/Metabólico',
    emocional:'Emocional', sono:'Sono',
  };

  const alertsHtml = alerts && alerts.length > 0
    ? `<h3 style="color:#c62828;margin:12px 0 6px">⚠️ Alertas Clínicos</h3>
       ${alerts.map(a => `<p style="background:${a.s==='error'?'#ffebee':a.s==='warning'?'#fff8e1':'#e8f5e9'};padding:8px 12px;border-radius:4px;border-left:4px solid ${a.s==='error'?'#f44336':a.s==='warning'?'#ff9800':'#4caf50'};margin-bottom:6px;font-size:0.9em">${a.m}</p>`).join('')}`
    : '';

  const scoresHtml = scores
    ? Object.entries(scores).map(([sys, sc]) => {
        const color = sc >= 10 ? '#c62828' : sc >= 6 ? '#e65100' : sc >= 3 ? '#f57f17' : '#2e7d32';
        const label = sc >= 10 ? 'Prioridade' : sc >= 6 ? 'Alterado' : sc >= 3 ? 'Atenção' : 'Normal';
        return `<tr><td style="${tdS}">${sysNames[sys]||sys}</td><td style="${tdS}font-weight:bold;color:${color}">${sc}</td><td style="${tdS}color:${color}">${label}</td></tr>`;
      }).join('')
    : '';

  const fitoHtml = fito && fito.length > 0
    ? `<h3 style="color:#2e7d32;margin:16px 0 6px;border-bottom:2px solid #4caf50;padding-bottom:4px">🌿 Fitoterápicos Indicados por Sistema</h3>
       ${fito.map(f => `
         <div style="margin-bottom:14px;border-left:3px solid #4caf50;padding-left:12px;page-break-inside:avoid">
           <b style="color:#2e7d32;font-size:0.95em">${f.sistema}</b>
           <ul style="margin:4px 0;padding-left:16px;font-size:0.87em">${(f.ervas||[]).map(e=>`<li style="margin-bottom:3px">${e}</li>`).join('')}</ul>
         </div>`).join('')}`
    : '';

  const deficienciasHtml = deficiencias && deficiencias.length > 0
    ? `<h3 style="color:#1565c0;margin:16px 0 6px;border-bottom:2px solid #1976d2;padding-bottom:4px">💊 Carências Nutricionais e Suplementação</h3>
       ${deficiencias.map(d => `
         <div style="margin-bottom:14px;border-left:3px solid #1976d2;padding-left:12px;page-break-inside:avoid">
           <b style="color:#1565c0;font-size:0.95em">${d.nome}</b>
           <span style="color:#888;font-size:0.82em"> — Prioridade ${d.prioridade} (${d.escore} sinais detectados)</span>
           <ul style="margin:4px 0;padding-left:16px;font-size:0.87em">${(d.suplementos||[]).map(s=>`<li style="margin-bottom:3px">${s}</li>`).join('')}</ul>
           <p style="font-size:0.85em;color:#555;margin:4px 0 0"><b>Fontes alimentares:</b> ${d.alimentos||''}</p>
         </div>`).join('')}`
    : '';

  const homoHtml = homo && homo.length > 0
    ? `<h3 style="color:#6a1b9a;margin:16px 0 6px;border-bottom:2px solid #9c27b0;padding-bottom:4px">⚗️ Homeopatia</h3>
       <ul style="margin:0;padding-left:16px;font-size:0.88em">${homo.map(h=>`<li style="margin-bottom:5px">${h}</li>`).join('')}</ul>`
    : '';

  const floresHtml = flores && flores.length > 0
    ? `<h3 style="color:#ad1457;margin:16px 0 6px;border-bottom:2px solid #e91e63;padding-bottom:4px">🌸 Florais de Bach</h3>
       <ul style="margin:0;padding-left:16px;font-size:0.88em">${flores.map(f=>`<li style="margin-bottom:5px">${f}</li>`).join('')}</ul>
       <p style="font-size:0.83em;color:#666;margin:6px 0 0"><em>Posologia: 4 gotas sublinguais 4×/dia. Até 7 essências por fórmula.</em></p>`
    : '';

  const examHtml = exames && exames.length > 0
    ? `<h3 style="color:#37474f;margin:16px 0 6px;border-bottom:2px solid #607d8b;padding-bottom:4px">🔬 Exames Sugeridos</h3>
       <ul style="margin:0;padding-left:16px;font-size:0.88em">${exames.map(e=>`<li style="margin-bottom:5px">${e}</li>`).join('')}</ul>`
    : '';

  const condutasHtml = condutas && condutas.length > 0
    ? `<h3 style="color:#4a148c;margin:16px 0 6px;border-bottom:2px solid #7b1fa2;padding-bottom:4px">📋 Condutas e Orientações</h3>
       <ul style="margin:0;padding-left:16px;font-size:0.88em">${condutas.map(c=>`<li style="margin-bottom:6px">${c}</li>`).join('')}</ul>`
    : '';

  const condutaTerapeuta = data.condutaInicial
    ? `<div style="background:#e8f5e9;border:2px solid #4caf50;border-radius:6px;padding:12px 16px;margin-top:16px;page-break-inside:avoid">
         <b style="color:#2e7d32;font-size:0.95em">Conduta Inicial do Terapeuta:</b>
         <p style="margin:6px 0 0;font-size:0.9em">${data.condutaInicial}</p>
       </div>` : '';

  const obsTerapeuta = data.obsTerapeuta
    ? `<div style="background:#fff8e1;border:2px solid #ff9800;border-radius:6px;padding:12px 16px;margin-top:10px;page-break-inside:avoid">
         <b style="color:#e65100;font-size:0.95em">Observações do Terapeuta:</b>
         <p style="margin:6px 0 0;font-size:0.9em">${data.obsTerapeuta}</p>
       </div>` : '';

  // Bioimpedância HTML
  const hasBio = data.bioGorduraPerc || data.bioGorduraVisceral || data.bioMassaMuscular || data.bioMassaOssea;
  const bioRow = (label, val, ref) => val ? `<tr><td style="${tdS}">${label}</td><td style="${tdS}font-weight:bold">${val}</td><td style="${tdS}color:#666;font-size:0.85em">${ref}</td></tr>` : '';
  const bfPrint = hasBio ? classifyBodyFat(data.bioGorduraPerc, data.sexo) : null;
  const visPrint = hasBio ? classifyVisceral(data.bioGorduraVisceral) : null;
  const musclePrint = hasBio ? classifyMuscleMass(data.bioMassaMuscular, data.bioPesoMed || data.peso, data.sexo) : null;
  const ossPrint = hasBio ? classifyBoneMass(data.bioMassaOssea, data.bioPesoMed || data.peso) : null;
  const watPrint = hasBio ? classifyBodyWater(data.bioAguaPerc, data.sexo) : null;
  const protPrint = hasBio ? classifyProtein(data.bioProteinaPerc) : null;
  const metAgePrint = hasBio ? classifyMetabolicAge(data.bioIdadeMetabolica, data.idade) : null;
  const bioHtml = hasBio ? `
    <h3 style="color:#004d40;margin:16px 0 6px;border-bottom:2px solid #009688;padding-bottom:4px">⚖️ Bioimpedância${data.bioDataMedicao ? ` — ${data.bioDataMedicao}` : ''}</h3>
    <table style="${tblS}">
      <tr><th style="${thS}">Parâmetro</th><th style="${thS}">Resultado</th><th style="${thS}">Referência / Classificação</th></tr>
      ${bioRow('Peso (balança)', data.bioPesoMed ? data.bioPesoMed + ' kg' : '', '–')}
      ${data.bioGorduraPerc ? `<tr><td style="${tdS}">% Gordura Corporal</td><td style="${tdS}font-weight:bold">${data.bioGorduraPerc}%</td><td style="${tdS}${bfPrint ? `color:${bfPrint.color==='success'?'#2e7d32':bfPrint.color==='warning'?'#e65100':'#c62828'}` : ''}">${bfPrint ? bfPrint.label : '–'}</td></tr>` : ''}
      ${data.bioGorduraKg ? `<tr><td style="${tdS}">Gordura Corporal (kg)</td><td style="${tdS}font-weight:bold">${data.bioGorduraKg} kg</td><td style="${tdS}">–</td></tr>` : ''}
      ${data.bioGorduraVisceral ? `<tr><td style="${tdS}">Gordura Visceral (nível)</td><td style="${tdS}font-weight:bold">Nível ${data.bioGorduraVisceral}</td><td style="${tdS}${visPrint ? `color:${visPrint.color==='success'?'#2e7d32':visPrint.color==='warning'?'#e65100':'#c62828'}` : ''}">${visPrint ? visPrint.label : '–'}</td></tr>` : ''}
      ${data.bioGorduraSubcut ? `<tr><td style="${tdS}">Gordura Subcutânea</td><td style="${tdS}font-weight:bold">${data.bioGorduraSubcut}%</td><td style="${tdS}">–</td></tr>` : ''}
      ${data.bioMassaMuscular ? `<tr><td style="${tdS}">Massa Muscular</td><td style="${tdS}font-weight:bold">${data.bioMassaMuscular} kg</td><td style="${tdS}${musclePrint ? `color:${musclePrint.color==='success'?'#2e7d32':'#e65100'}` : ''}">${musclePrint ? musclePrint.label : '–'}</td></tr>` : ''}
      ${data.bioMuscEsqueletico ? `<tr><td style="${tdS}">Músculo Esquelético</td><td style="${tdS}font-weight:bold">${data.bioMuscEsqueletico}%</td><td style="${tdS}">–</td></tr>` : ''}
      ${data.bioMassaMagra ? `<tr><td style="${tdS}">Massa Magra (Lean Mass)</td><td style="${tdS}font-weight:bold">${data.bioMassaMagra} kg</td><td style="${tdS}">–</td></tr>` : ''}
      ${data.bioMassaOssea ? `<tr><td style="${tdS}">Massa Óssea</td><td style="${tdS}font-weight:bold">${data.bioMassaOssea} kg</td><td style="${tdS}${ossPrint ? `color:${ossPrint.color==='success'?'#2e7d32':ossPrint.color==='warning'?'#e65100':'#c62828'}` : ''}">${ossPrint ? ossPrint.label : '–'}</td></tr>` : ''}
      ${data.bioAguaPerc ? `<tr><td style="${tdS}">% Água Corporal</td><td style="${tdS}font-weight:bold">${data.bioAguaPerc}%</td><td style="${tdS}${watPrint ? `color:${watPrint.color==='success'?'#2e7d32':'#e65100'}` : ''}">${watPrint ? watPrint.label : '–'}</td></tr>` : ''}
      ${data.bioProteinaPerc ? `<tr><td style="${tdS}">% Proteína</td><td style="${tdS}font-weight:bold">${data.bioProteinaPerc}%</td><td style="${tdS}${protPrint ? `color:${protPrint.color==='success'?'#2e7d32':'#e65100'}` : ''}">${protPrint ? protPrint.label : '–'}</td></tr>` : ''}
      ${data.bioMetabolismoBasal ? `<tr><td style="${tdS}">Metabolismo Basal (TMB)</td><td style="${tdS}font-weight:bold">${data.bioMetabolismoBasal} kcal/dia</td><td style="${tdS}">Média H:1.500–2.000 · M:1.200–1.600 kcal</td></tr>` : ''}
      ${data.bioIdadeMetabolica ? `<tr><td style="${tdS}">Idade Metabólica</td><td style="${tdS}font-weight:bold">${data.bioIdadeMetabolica} anos</td><td style="${tdS}${metAgePrint ? `color:${metAgePrint.color==='success'?'#2e7d32':metAgePrint.color==='warning'?'#e65100':'#c62828'}` : ''}">${metAgePrint ? metAgePrint.label : '–'}</td></tr>` : ''}
      ${data.bioPontuacaoCorp ? `<tr><td style="${tdS}">Pontuação / Score</td><td style="${tdS}font-weight:bold">${data.bioPontuacaoCorp}</td><td style="${tdS}">–</td></tr>` : ''}
    </table>
    ${(data.bioSegMuscBrD || data.bioSegGordTronco) ? `
      <p style="font-weight:bold;margin:6px 0 4px;font-size:0.9em">Análise Segmental:</p>
      <table style="${tblS}">
        <tr><th style="${thS}">Segmento</th><th style="${thS}">Músculo (kg)</th><th style="${thS}">Gordura (%)</th></tr>
        <tr><td style="${tdS}">Braço Direito</td><td style="${tdS}">${data.bioSegMuscBrD||'–'}</td><td style="${tdS}">${data.bioSegGordBrD||'–'}</td></tr>
        <tr><td style="${tdS}">Braço Esquerdo</td><td style="${tdS}">${data.bioSegMuscBrE||'–'}</td><td style="${tdS}">${data.bioSegGordBrE||'–'}</td></tr>
        <tr><td style="${tdS}">Tronco</td><td style="${tdS}">${data.bioSegMuscTronco||'–'}</td><td style="${tdS}">${data.bioSegGordTronco||'–'}</td></tr>
        <tr><td style="${tdS}">Perna Direita</td><td style="${tdS}">${data.bioSegMuscPnD||'–'}</td><td style="${tdS}">${data.bioSegGordPnD||'–'}</td></tr>
        <tr><td style="${tdS}">Perna Esquerda</td><td style="${tdS}">${data.bioSegMuscPnE||'–'}</td><td style="${tdS}">${data.bioSegGordPnE||'–'}</td></tr>
      </table>` : ''}
    ${(data.bioDataAnterior && (data.bioGorduraPercAnt || data.bioMassaMuscularAnt)) ? `
      <p style="font-weight:bold;margin:6px 0 4px;font-size:0.9em">Comparação com medição anterior (${data.bioDataAnterior}):</p>
      <table style="${tblS}">
        <tr><th style="${thS}">Parâmetro</th><th style="${thS}">Anterior</th><th style="${thS}">Atual</th><th style="${thS}">Variação</th></tr>
        ${data.bioGorduraPercAnt && data.bioGorduraPerc ? `<tr><td style="${tdS}">% Gordura</td><td style="${tdS}">${data.bioGorduraPercAnt}%</td><td style="${tdS}">${data.bioGorduraPerc}%</td><td style="${tdS}font-weight:bold;color:${parseFloat(data.bioGorduraPerc)-parseFloat(data.bioGorduraPercAnt)<=0?'#2e7d32':'#c62828'}">${((parseFloat(data.bioGorduraPerc)-parseFloat(data.bioGorduraPercAnt))>0?'+':'')+(parseFloat(data.bioGorduraPerc)-parseFloat(data.bioGorduraPercAnt)).toFixed(1)}%</td></tr>` : ''}
        ${data.bioMassaMuscularAnt && data.bioMassaMuscular ? `<tr><td style="${tdS}">Massa Muscular</td><td style="${tdS}">${data.bioMassaMuscularAnt} kg</td><td style="${tdS}">${data.bioMassaMuscular} kg</td><td style="${tdS}font-weight:bold;color:${parseFloat(data.bioMassaMuscular)-parseFloat(data.bioMassaMuscularAnt)>=0?'#2e7d32':'#c62828'}">${((parseFloat(data.bioMassaMuscular)-parseFloat(data.bioMassaMuscularAnt))>0?'+':'')+(parseFloat(data.bioMassaMuscular)-parseFloat(data.bioMassaMuscularAnt)).toFixed(1)} kg</td></tr>` : ''}
        ${data.bioGorduraVisceralAnt && data.bioGorduraVisceral ? `<tr><td style="${tdS}">Gordura Visceral</td><td style="${tdS}">Nív. ${data.bioGorduraVisceralAnt}</td><td style="${tdS}">Nív. ${data.bioGorduraVisceral}</td><td style="${tdS}font-weight:bold;color:${parseFloat(data.bioGorduraVisceral)-parseFloat(data.bioGorduraVisceralAnt)<=0?'#2e7d32':'#c62828'}">${((parseFloat(data.bioGorduraVisceral)-parseFloat(data.bioGorduraVisceralAnt))>0?'+':'')+(parseFloat(data.bioGorduraVisceral)-parseFloat(data.bioGorduraVisceralAnt)).toFixed(1)} nív</td></tr>` : ''}
      </table>` : ''}
    ${data.bioObsBio ? `<p style="font-size:0.88em;background:#e0f2f1;padding:8px 12px;border-radius:4px;margin-top:8px"><b>Obs. Bioimpedância:</b> ${data.bioObsBio}</p>` : ''}
  ` : '';

  return `
    <h2 style="color:#1565c0;margin-bottom:4px;font-size:1.3em">Protocolo Terapêutico Integrativo</h2>
    <p style="color:#666;margin-top:0;font-size:0.9em">
      <b>Interagente:</b> ${data.nome||'–'}
      ${data.idade ? ` &nbsp;|&nbsp; <b>Idade:</b> ${data.idade} anos` : ''}
      ${data.sexo ? ` &nbsp;|&nbsp; <b>Sexo:</b> ${data.sexo}` : ''}
      &nbsp;|&nbsp; <b>Data:</b> ${date}
    </p>
    ${data.queixaPrincipal ? `<p style="background:#e3f2fd;padding:8px 12px;border-radius:4px;border-left:4px solid #1976d2;font-size:0.9em;margin-bottom:8px"><b>Queixa Principal:</b> ${data.queixaPrincipal}</p>` : ''}
    <hr style="margin:10px 0"/>
    ${alertsHtml}
    ${bioHtml}
    ${scoresHtml ? `<h3 style="color:#333;margin:12px 0 6px;border-bottom:2px solid #90a4ae;padding-bottom:4px">📊 Pontuação por Sistema</h3><table style="${tblS}"><tr><th style="${thS}">Sistema</th><th style="${thS}">Pontos</th><th style="${thS}">Classificação</th></tr>${scoresHtml}</table>` : ''}
    ${fitoHtml}
    ${deficienciasHtml}
    ${homoHtml}
    ${floresHtml}
    ${examHtml}
    ${condutasHtml}
    ${condutaTerapeuta}
    ${obsTerapeuta}
    <p style="margin-top:24px;font-size:0.82em;color:#777;border-top:1px solid #ddd;padding-top:8px">
      ⚠️ Este protocolo é de uso exclusivo do terapeuta responsável e não substitui avaliação ou prescrição médica.
      As indicações são baseadas nos sintomas relatados pelo interagente.
    </p>
  `;
}

function escapeExportHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\n/g, '<br/>');
}

function exportList(title, items, color = '#1565c0') {
  if (!items || items.length === 0) return '';
  return `<section style="margin:0 0 14px;page-break-inside:avoid;break-inside:avoid">
    <h4 style="color:${color};border-bottom:1px solid ${color};padding-bottom:3px;margin:0 0 5px;font-size:1em">${escapeExportHtml(title)}</h4>
    <ul style="margin:0;padding-left:18px;font-size:.88em">${items.map(item => `<li style="margin-bottom:4px">${escapeExportHtml(item)}</li>`).join('')}</ul>
  </section>`;
}

function buildCompleteProtocolHtmlForPrint(data, protocol, profiles, planilhas, cardapios, receitas, restricoes) {
  const therapeuticData = protocol.therapeuticData || [];
  const boarimProtocols = protocol.boarimProtocols || [];
  const therapeuticHtml = therapeuticData.map(item => `
    <article style="border:1px solid #90caf9;border-left:4px solid #1976d2;padding:10px 12px;margin:0 0 12px;page-break-inside:avoid;break-inside:avoid">
      <h3 style="color:#1565c0;margin:0 0 8px;font-size:1.08em">${escapeExportHtml(item.title)}</h3>
      ${exportList('Orientações', item.suggestions, '#1565c0')}
      ${exportList('Alimentos', item.foods, '#e65100')}
      ${exportList('Suplementos nutricionais', item.supplements, '#2e7d32')}
      ${exportList('Fitoterápicos', item.herbs, '#7b1fa2')}
      ${exportList('Homeopatia', item.homeopathy, '#0277bd')}
      ${exportList('Florais quânticos', item.quantumFlorals, '#ad1457')}
      ${exportList('Hidroterapia', item.hydrotherapy, '#00838f')}
      ${exportList('Geoterapia', item.geotherapy, '#5d4037')}
      ${exportList('Medicina tradicional chinesa', item.tcm, '#ef6c00')}
      ${exportList('Outras terapias', item.otherTherapies, '#455a64')}
    </article>`).join('');

  const boarimHtml = boarimProtocols.map((item, index) => `
    <article style="border:1px solid #c5e1a5;border-left:4px solid #558b2f;padding:10px 12px;margin:0 0 12px;page-break-inside:avoid;break-inside:avoid">
      <h3 style="color:#33691e;margin:0 0 2px;font-size:1.08em">${index + 1}. ${escapeExportHtml(item.condicao)}</h3>
      ${item.referencia ? `<p style="color:#666;font-size:.82em;margin:0 0 8px">${escapeExportHtml(item.referencia)}</p>` : ''}
      ${exportList('Hidroterapia', item.hidroterapia, '#0288d1')}
      ${exportList('Fitoterapia (plantas medicinais)', item.fitoterapia, '#388e3c')}
      ${exportList('Orientações alimentares', item.alimentacao, '#ef6c00')}
      ${exportList('Suplementação natural', item.suplementacao, '#7b1fa2')}
      ${exportList('Hábitos de vida e exercícios', item.habitos, '#c62828')}
      ${item.observacoes ? `<p style="background:#fff8e1;border-left:3px solid #ff9800;padding:7px;margin:5px 0 0;font-size:.86em"><b>Observações importantes:</b> ${escapeExportHtml(item.observacoes)}</p>` : ''}
    </article>`).join('');

  const nutritionHtml = buildNutricionalHtmlForPrint(
    data.nome || 'Paciente', profiles, planilhas, cardapios, receitas, restricoes,
  );
  const manualHtml = [
    ['Suplementação', data.rxSuplementacao],
    ['Fitoterápicos', data.rxFitoterapicos],
    ['Conduta nutricional', data.rxNutricional],
    ['Estilo de vida / Orientações', data.rxEstiloVida],
    ['Encaminhamentos', data.rxEncaminhamentos],
    ['Retorno previsto', data.rxRetorno],
  ].filter(([, value]) => value).map(([label, value]) => `<p style="margin:5px 0;font-size:.88em"><b>${label}:</b> ${escapeExportHtml(value)}</p>`).join('');

  return `${buildProtocolHtmlForPrint(data, protocol)}
    ${therapeuticHtml ? `<div style="page-break-before:always"><h2 style="color:#1565c0;border-bottom:2px solid #1976d2;padding-bottom:5px">Protocolos terapêuticos completos</h2>${therapeuticHtml}</div>` : ''}
    ${boarimHtml ? `<div style="page-break-before:always"><h2 style="color:#33691e;border-bottom:2px solid #558b2f;padding-bottom:5px">Manual prático de tratamentos naturais</h2>${boarimHtml}</div>` : ''}
    ${manualHtml ? `<div style="margin-top:14px;page-break-inside:avoid"><h3 style="color:#1565c0">Receituário / orientações ao paciente</h3>${manualHtml}</div>` : ''}
    <div style="page-break-before:always">${nutritionHtml}</div>`;
}

function buildNutricionalHtmlForPrint(patientName, profiles, planilhas, cardapios, receitas, restricoes) {
  const date = new Date().toLocaleDateString('pt-BR');
  const thS = 'background:#f1f8e9;padding:5px 8px;text-align:left;border:1px solid #ddd;font-weight:bold;font-size:0.88em;';
  const tdS = 'padding:4px 8px;border:1px solid #ddd;font-size:0.86em;';
  const tblS = 'border-collapse:collapse;width:100%;margin-bottom:12px;';

  const shownPlans = planilhas && planilhas.length > 0
    ? planilhas
    : (typeof PLANILHAS_NUTRICIONAIS !== 'undefined' ? [PLANILHAS_NUTRICIONAIS.ATENCAO_GERAL].filter(Boolean) : []);

  const planilhasHtml = shownPlans.map(pl => {
    if (!pl) return '';
    const rows = (pl.nutrientesChave || []).map(nk =>
      `<tr><td style="${tdS}font-weight:bold">${nk.nutriente}</td><td style="${tdS}color:#4a148c">${nk.dose}</td><td style="${tdS}color:#2e7d32">${nk.alimentos}</td><td style="${tdS}">${nk.funcao}</td></tr>`
    ).join('');
    return `
      <div style="border:2px solid ${pl.cor||'#2e7d32'};border-radius:6px;padding:14px 18px;margin-bottom:16px;page-break-inside:avoid">
        <h3 style="color:${pl.cor||'#2e7d32'};margin:0 0 6px">${pl.label||''}</h3>
        <p style="font-style:italic;color:#555;margin:0 0 10px;font-size:0.88em">${pl.objetivo||''}</p>
        <table style="${tblS}">
          <tr><th style="${thS}">Nutriente</th><th style="${thS}">Dose/Porção</th><th style="${thS}">Fontes FLV</th><th style="${thS}">Função</th></tr>
          ${rows}
        </table>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div style="background:#fff8e1;padding:8px;border-radius:4px;border-left:3px solid #e65100;font-size:0.84em">
            <b style="color:#e65100">🚫 Evitar:</b><br/>${(pl.alimentosProibidos||[]).slice(0,5).map(a=>`• ${a}`).join('<br/>')}
          </div>
          <div style="background:#e8f5e9;padding:8px;border-radius:4px;border-left:3px solid #2e7d32;font-size:0.84em">
            <b style="color:#2e7d32">✅ Priorizar:</b><br/>${(pl.alimentosTerapeuticos||[]).slice(0,6).map(a=>`• ${a}`).join('<br/>')}
          </div>
        </div>
      </div>`;
  }).join('');

  const shownCardapios = cardapios && cardapios.length > 0
    ? cardapios
    : (typeof CARDAPIOS !== 'undefined' ? [CARDAPIOS.ATENCAO_GERAL].filter(Boolean) : []);

  const cardapiosHtml = shownCardapios.filter(Boolean).map(c => `
    <div style="margin-bottom:20px;page-break-inside:avoid">
      <h3 style="color:#e65100;margin:0 0 4px">${c.label||''}</h3>
      <p style="font-size:0.84em;color:#555;border-left:3px solid #4caf50;padding-left:8px;margin:0 0 8px">${c.observacoes||''}</p>
      <table style="${tblS}">
        <tr><th style="${thS}">Dia</th><th style="${thS}">Café</th><th style="${thS}">L.Manhã</th><th style="${thS}">Almoço</th><th style="${thS}">L.Tarde</th><th style="${thS}">Jantar</th></tr>
        ${(c.dias||[]).map(d => `<tr>
          <td style="${tdS}font-weight:bold;color:#2e7d32">${d.dia}</td>
          <td style="${tdS}">${d.cafe}</td><td style="${tdS}">${d.lanche1}</td>
          <td style="${tdS}">${d.almoco}</td><td style="${tdS}">${d.lanche2}</td>
          <td style="${tdS}">${d.jantar}</td>
        </tr>`).join('')}
      </table>
    </div>
  `).join('');

  const receitasHtml = receitas && receitas.length > 0 ? `
    <h3 style="color:#6a1b9a;border-bottom:2px solid #6a1b9a;padding-bottom:4px;margin-top:20px">Receitas Funcionais</h3>
    ${receitas.map(r => `
      <div style="border:1px solid #ce93d8;border-radius:6px;padding:12px 16px;margin-bottom:10px;page-break-inside:avoid">
        <h4 style="color:#4a148c;margin:0 0 4px">${r.nome} <span style="font-size:0.8em;color:#888">⏱ ${r.tempoPreparo}</span></h4>
        <p style="font-size:0.88em;margin:4px 0"><b>Ingredientes:</b> ${(r.ingredientes||[]).join(', ')}</p>
        <p style="font-size:0.88em;margin:4px 0"><b>Modo:</b> ${r.modo}</p>
        <p style="background:#fffde7;padding:5px 8px;border-radius:4px;font-size:0.85em"><b>Benefícios:</b> ${r.beneficios}</p>
      </div>
    `).join('')}
  ` : '';

  return `
    <h2 style="color:#2e7d32;margin-bottom:4px">🌿 Plano Nutricional Integrativo</h2>
    <p style="color:#555;margin:0 0 4px"><b>Interagente:</b> ${patientName||'–'} &nbsp;|&nbsp; <b>Data:</b> ${date}</p>
    <hr style="margin-bottom:16px"/>
    ${restricoes && restricoes.labels && restricoes.labels.length > 0 ? `
    <div style="background:#fff3e0;border:2px solid #e65100;border-radius:8px;padding:12px 16px;margin-bottom:16px">
      <p style="margin:0 0 6px;font-weight:700;color:#bf360c;font-size:1em">⚠️ Restrições e Preferências Alimentares Aplicadas</p>
      <p style="margin:0 0 6px;font-size:0.9em">
        ${restricoes.labels.map(l => `<span style="background:#e65100;color:#fff;padding:2px 8px;border-radius:12px;margin-right:5px;font-size:0.88em">${l}</span>`).join('')}
      </p>
      <p style="margin:0;font-size:0.84em;color:#555">✅ Os cardápios e receitas abaixo foram <b>adaptados automaticamente</b> para respeitar as restrições indicadas. Ingredientes proibidos foram substituídos por alternativas nutricionalmente equivalentes.</p>
      ${restricoes.obsExtra ? `<p style="margin:6px 0 0;font-size:0.84em;color:#555"><b>Observações adicionais:</b> ${restricoes.obsExtra}</p>` : ''}
    </div>` : ''}
    <h3 style="color:#4a148c;border-bottom:2px solid #4a148c;padding-bottom:4px">Planilha Nutricional Personalizada</h3>
    ${planilhasHtml}
    <h3 style="color:#e65100;border-bottom:2px solid #e65100;padding-bottom:4px;margin-top:20px">Cardápios Semanais</h3>
    ${cardapiosHtml}
    ${receitasHtml}
  `;
}
