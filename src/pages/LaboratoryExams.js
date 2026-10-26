import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Science as ScienceIcon,
  Save as SaveIcon,
  Print as PrintIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  CheckCircle as CheckCircleIcon,
  Search as SearchIcon,
  History as HistoryIcon,
  Timeline as TimelineIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import LABORATORY_EXAMS_COMPLETE, { analyzeExamResult, analyzeCorrelations } from '../data/laboratoryExamsComplete';
import { createDefaultUrocultureData } from '../data/urocultureIntegrativeData';
import { usePatientIntegration } from '../hooks/usePatientIntegration';
import PrescriptionHeader from '../components/PrescriptionHeader';
import DiagnosticReport from '../components/DiagnosticReport';
import PrescriptionFooter from '../components/PrescriptionFooter';
import PrescriptionActions from '../components/PrescriptionActions';
import UrocultureAntibiogramSection from '../components/UrocultureAntibiogramSection';

const URINE_BINARY_SHORTCUT_EXAMS = {
  nitritoUrina: { negativeValue: '0', positiveValue: '1' },
  floraBacterianaUrina: { negativeValue: '0', positiveValue: '1' },
  proteinuriaUrina: { negativeValue: '0', positiveValue: '30' },
  glicoseUrina: { negativeValue: '0', positiveValue: '50' }
};

export default function LaboratoryExams({ mode = 'general' }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef();
  
  // Hook de integração com paciente
  const { patientData, currentPatientId, loading: patientLoading, saveToPatient, goToDashboard } = usePatientIntegration('laboratoryExamsComplete');
  
  const [paciente, setPaciente] = useState(null);
  const [dataExame, setDataExame] = useState(new Date().toISOString().split('T')[0]);
  const [dataConsulta, setDataConsulta] = useState(new Date().toISOString().split('T')[0]);
  const [results, setResults] = useState({});
  const [analysis, setAnalysis] = useState({});
  const [correlations, setCorrelations] = useState([]);
  const [expandedExam, setExpandedExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [manualPatientName, setManualPatientName] = useState('');
  const [manualPatientSex, setManualPatientSex] = useState('');
  const [manualPatientAge, setManualPatientAge] = useState('');
  const [manualPatientBirthDate, setManualPatientBirthDate] = useState('');
  const [examHistory, setExamHistory] = useState([]);
  const [urocultureData, setUrocultureData] = useState(createDefaultUrocultureData());
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editingHistoryId, setEditingHistoryId] = useState(null);
  const [expandAllForPrint, setExpandAllForPrint] = useState(false);

  const activePatientId = id || currentPatientId;
  const hasLinkedPatient = Boolean(activePatientId);
  const isUrineMode = mode === 'urine';
  const urinePagePath = activePatientId ? `/resultados-exames-urina/${activePatientId}` : '/resultados-exames-urina';
  const laboratoryPagePath = activePatientId ? `/exames-laboratoriais/${activePatientId}` : '/exames-laboratoriais';

  // CSS de impressão profissional
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        @page {
          margin: 1.5cm;
          size: A4;
        }
        
        body * {
          visibility: hidden;
        }
        
        #printable-content,
        #printable-content * {
          visibility: visible;
        }
        
        #printable-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }

        .no-print {
          display: none !important;
        }

        .print-only {
          display: block !important;
        }

        .MuiPaper-root {
          box-shadow: none !important;
          border: none !important;
        }

        .MuiAccordion-root {
          page-break-inside: avoid;
        }

        .MuiAccordion-root .MuiCollapse-root,
        .MuiAccordion-root .MuiCollapse-root.MuiCollapse-hidden {
          height: auto !important;
          overflow: visible !important;
          visibility: visible !important;
        }

        .MuiAccordion-root .MuiAccordion-region {
          height: auto !important;
        }

        .MuiAccordionDetails-root {
          display: block !important;
        }

        .print-no-value,
        .print-no-uroculture {
          display: none !important;
        }

        .print-has-value,
        .print-has-uroculture,
        .print-relations-section,
        .print-relations-card,
        .print-result-details,
        .print-result-content {
          break-inside: avoid-page !important;
          page-break-inside: avoid !important;
        }

        .print-has-value .MuiAccordionSummary-root {
          min-height: 34px !important;
        }

        .print-has-value .MuiAccordionSummary-content {
          margin: 4px 0 !important;
        }

        .print-has-value .MuiCardContent-root,
        .print-relations-card .MuiCardContent-root {
          padding-top: 8px !important;
          padding-bottom: 8px !important;
        }

        .print-has-value .MuiListItem-root,
        .print-relations-card .MuiListItem-root {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }

        h1, h2, h3, h4, h5, h6 {
          page-break-after: avoid;
        }

        table {
          page-break-inside: auto;
        }

        tr {
          page-break-inside: avoid;
          page-break-after: auto;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const handleAfterPrint = () => setExpandAllForPrint(false);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, []);

  // Calcular idade automaticamente quando data de nascimento muda
  useEffect(() => {
    if (manualPatientBirthDate) {
      const idade = calcularIdade(manualPatientBirthDate);
      setManualPatientAge(idade.toString());
    }
  }, [manualPatientBirthDate]);

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return '';
    const hoje = new Date();
    const nasc = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const mes = hoje.getMonth() - nasc.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) {
      idade--;
    }
    return idade;
  };

  // Função para detectar automaticamente todas as correlações
  const detectCorrelations = () => {
    const detected = [];

    // PERFIL METABÓLICO E GLICÊMICO
    if (analysis['glicose'] && analysis['hemoglobinaGlicada']) {
      detected.push({
        title: 'Glicemia + HbA1c',
        description: 'Glicemia pontual vs média de 90 dias',
        values: `Glicemia: ${results['glicose']} | HbA1c: ${results['hemoglobinaGlicada']}%`,
        severity: analysis['hemoglobinaGlicada']?.quintil.id >= 'Q4' ? 'critical' : 'normal'
      });
    }

    if (analysis['insulina'] && analysis['glicose']) {
      const glicose = parseFloat(results['glicose']) || 0;
      const insulina = parseFloat(results['insulina']) || 0;
      const homaIR = (glicose * insulina) / 405;
      detected.push({
        title: 'HOMA-IR (Insulina + Glicose)',
        description: 'Resistência insulínica mesmo com glicose normal',
        values: `HOMA-IR: ${homaIR.toFixed(2)} ${homaIR > 2.7 ? '🚨 RESISTÊNCIA INSULÍNICA' : '✅ Normal'}`,
        severity: homaIR > 2.7 ? 'critical' : 'normal',
        protocol: homaIR > 2.7 ? 'Berberina 500mg 3x/dia + Canela 3g + Dieta low-carb + Musculação' : null
      });
    }

    if (analysis['triglicerideos'] && analysis['hdlColesterol']) {
      const tg = parseFloat(results['triglicerideos']) || 0;
      const hdl = parseFloat(results['hdlColesterol']) || 0;
      const ratio = hdl > 0 ? tg / hdl : 0;
      detected.push({
        title: 'Ratio TG/HDL',
        description: 'Ratio alta = LDL pequenas e densas (aterogênico)',
        values: `${ratio.toFixed(2)} ${ratio > 3 ? '🚨 ALTO RISCO' : ratio > 2 ? '⚠️ MODERADO' : '✅ Normal'}`,
        severity: ratio > 3 ? 'critical' : ratio > 2 ? 'warning' : 'normal',
        protocol: ratio > 3 ? 'Berberina 500mg 3x/dia + Ômega-3 3g + Niacina 1g' : null
      });
    }

    // FUNÇÃO RENAL
    if (analysis['creatinina']?.quintil.id === 'Q5' && analysis['ureia']?.quintil.id === 'Q5') {
      detected.push({
        title: 'Creatinina + Uréia elevadas',
        description: 'Comprometimento renal ou desidratação',
        values: `Creatinina: ${results['creatinina']} | Uréia: ${results['ureia']}`,
        severity: 'critical',
        protocol: 'Encaminhar nefrologista + Hidratação + NAC 1200mg 2x/dia'
      });
    }

    // FUNÇÃO HEPÁTICA
    if (analysis['tgo'] && analysis['tgp']) {
      const tgo = parseFloat(results['tgo']) || 0;
      const tgp = parseFloat(results['tgp']) || 0;
      const ratio = tgp > 0 ? tgo / tgp : 0;
      detected.push({
        title: 'AST (TGO) + ALT (TGP)',
        description: `Lesão celular. Ratio AST/ALT: ${ratio.toFixed(2)} ${ratio > 2 ? '(Alcoólica?)' : '(Hepática)'}`,
        values: `TGO: ${results['tgo']} | TGP: ${results['tgp']}`,
        severity: analysis['tgp']?.quintil.id >= 'Q4' ? 'warning' : 'normal'
      });
    }

    if (analysis['ggt'] && analysis['fosfataseAlcalina']) {
      detected.push({
        title: 'GGT + Fosfatase Alcalina',
        description: 'Colestase (fluxo biliar). GGT normal + FA alta = Causa óssea',
        values: `GGT: ${results['ggt']} | FA: ${results['fosfataseAlcalina']}`,
        severity: analysis['ggt']?.quintil.id >= 'Q4' ? 'warning' : 'normal'
      });
    }

    // EIXO TIREOIDIANO
    if (analysis['tsh']?.quintil.id === 'Q5' && analysis['t4Livre']?.quintil.id === 'Q1') {
      detected.push({
        title: 'TSH alto + T4 Livre baixo',
        description: '🚨 HIPOTIREOIDISMO PRIMÁRIO confirmado',
        values: `TSH: ${results['tsh']} | T4L: ${results['t4Livre']}`,
        severity: 'critical',
        protocol: 'Levotiroxina + Selênio 200mcg + Ashwagandha 600mg 2x/dia'
      });
    }

    if (analysis['t4Livre'] && analysis['t3Livre']) {
      detected.push({
        title: 'T4 Livre + T3 Livre',
        description: 'Avalia conversão periférica T4→T3',
        values: `T4L: ${results['t4Livre']} | T3L: ${results['t3Livre']}`,
        severity: analysis['t3Livre']?.quintil.id === 'Q1' ? 'warning' : 'normal',
        protocol: analysis['t3Livre']?.quintil.id === 'Q1' ? 'Selênio 200mcg + Zinco 30mg + Ashwagandha' : null
      });
    }

    // CINÉTICA DO FERRO
    if (analysis['ferritina']?.quintil.id === 'Q1' && analysis['ferro']) {
      detected.push({
        title: 'Ferritina baixa (primeiro sinal deficiência)',
        description: 'Estoque de ferro depletado',
        values: `Ferritina: ${results['ferritina']} | Ferro: ${results['ferro']}`,
        severity: 'critical',
        protocol: 'Ferro bisglicinato 30-60mg + Vitamina C 500mg + Spirulina 5g'
      });
    }

    if (analysis['vcm'] && analysis['hcm']) {
      const vcm = parseFloat(results['vcm']) || 0;
      const hcm = parseFloat(results['hcm']) || 0;
      let type = 'Normal';
      if (vcm < 80) type = 'Microcítica (Ferro)';
      if (vcm > 100) type = 'Macrocítica (B12/Folato)';
      detected.push({
        title: 'VCM + HCM',
        description: `Tipo de anemia: ${type}`,
        values: `VCM: ${results['vcm']} | HCM: ${results['hcm']}`,
        severity: vcm < 80 || vcm > 100 ? 'warning' : 'normal'
      });
    }

    // METABOLISMO ÓSSEO
    if (analysis['paratormonio']?.quintil.id === 'Q5' && analysis['vitaminaD']?.quintil.id === 'Q1') {
      detected.push({
        title: 'PTH alto + Vitamina D baixa',
        description: '⚠️ HIPERPARATIREOIDISMO SECUNDÁRIO',
        values: `PTH: ${results['paratormonio']} | Vit D: ${results['vitaminaD']}`,
        severity: 'critical',
        protocol: 'Vitamina D3 10.000 UI/dia 30d + Magnésio 400mg + K2 200mcg'
      });
    }

    // INFLAMAÇÃO E RISCO CARDIOVASCULAR
    if (analysis['proteina cReativaUltrassensivel']?.quintil.id >= 'Q4') {
      detected.push({
        title: 'PCR-ultrassensível elevada',
        description: 'Inflamação aguda/risco cardíaco',
        values: `PCR: ${results['proteina cReativaUltrassensivel']}`,
        severity: 'critical',
        protocol: 'Curcumina 1500mg 3x/dia + Ômega-3 3g + Resveratrol 500mg'
      });
    }

    if (analysis['homocisteina']?.quintil.id >= 'Q4') {
      detected.push({
        title: 'Homocisteína elevada',
        description: 'Risco vascular + Deficiência B6/B9/B12',
        values: `Homocisteína: ${results['homocisteina']}`,
        severity: 'critical',
        protocol: 'B12 1000mcg + Folato 5mg + B6 100mg + TMG 2g'
      });
    }

    // MARCADORES CARDÍACOS
    if (analysis['troponinaI']?.quintil.id === 'Q5' && analysis['ckMb']?.quintil.id === 'Q5') {
      detected.push({
        title: 'Troponina + CK-MB elevadas',
        description: '🚨🚨🚨 INFARTO AGUDO DO MIOCÁRDIO',
        values: `Troponina: ${results['troponinaI']} | CK-MB: ${results['ckMb']}`,
        severity: 'emergency',
        protocol: '🚑 CHAMAR SAMU 192 IMEDIATAMENTE - UTI CARDIOLÓGICA'
      });
    }

    if (analysis['amilase'] && analysis['lipase']) {
      detected.push({
        title: 'Amilase + Lipase',
        description: 'Lipase mais sensível para pancreatite',
        values: `Amilase: ${results['amilase']} | Lipase: ${results['lipase']}`,
        severity: analysis['lipase']?.quintil.id >= 'Q4' ? 'critical' : 'normal',
        protocol: analysis['lipase']?.quintil.id >= 'Q4' ? 'Jejum + Hidratação IV + Encaminhar gastro urgente' : null
      });
    }

    // ANEMIA FERROPRIVA
    if (analysis['hemoglobina']?.quintil.id === 'Q1' && analysis['ferritina']?.quintil.id === 'Q1') {
      detected.push({
        title: 'Hemoglobina + Ferritina baixas',
        description: '🚨 ANEMIA FERROPRIVA estabelecida',
        values: `Hb: ${results['hemoglobina']} | Ferritina: ${results['ferritina']}`,
        severity: 'critical',
        protocol: 'Spirulina 5g + Ferro bisglicinato 30-60mg + Vitamina C 500mg + Fígado bovino'
      });
    }

    // DISLIPIDEMIA
    if (analysis['ldlColesterol']?.quintil.id === 'Q5' && analysis['hdlColesterol']?.quintil.id === 'Q1') {
      detected.push({
        title: 'LDL alto + HDL baixo',
        description: '🚨 DISLIPIDEMIA ATEROGÊNICA - Risco CV 4-5x',
        values: `LDL: ${results['ldlColesterol']} | HDL: ${results['hdlColesterol']}`,
        severity: 'critical',
        protocol: 'Berberina 500mg 3x/dia + Alho 1200mg + Ômega-3 3-4g + Niacina 1g'
      });
    }

    // RAZÃO LDL/HDL (calculada automaticamente)
    if (results['ldl'] && results['hdl']) {
      const ldl = parseFloat(results['ldl']) || 0;
      const hdl = parseFloat(results['hdl']) || 0;
      if (hdl > 0) {
        const ratioLdlHdl = ldl / hdl;
        let severity = 'normal';
        let description = 'Razão LDL/HDL adequada';
        let protocol = null;

        if (ratioLdlHdl > 5) {
          severity = 'emergency';
          description = '🚨🚨 RISCO CARDIOVASCULAR MUITO ALTO';
          protocol = 'ATENÇÃO URGENTE - Berberina 500mg 3x/dia + Estatina + Ômega-3 4g + Exercícios diários';
        } else if (ratioLdlHdl > 3.5) {
          severity = 'critical';
          description = '🚨 ALTO RISCO CARDIOVASCULAR';
          protocol = 'Berberina 500mg 3x/dia + Ômega-3 3g + Niacina 1g + Exercícios 5x/semana';
        } else if (ratioLdlHdl > 2.5) {
          severity = 'warning';
          description = '⚠️ Risco cardiovascular moderado';
          protocol = 'Ômega-3 2g + Alho 1200mg + Exercícios regulares';
        }

        detected.push({
          title: 'Razão LDL/HDL',
          description: description,
          values: `LDL/HDL = ${ratioLdlHdl.toFixed(2)} ${ratioLdlHdl <= 2.5 ? '✅ Ótima' : ratioLdlHdl <= 3.5 ? '⚠️ Limítrofe' : '🚨 Alta'}`,
          severity: severity,
          protocol: protocol
        });
      }
    }

    // RAZÃO TG/HDL (calculada automaticamente - Marcador de Resistência Insulínica)
    if (results['triglicerideos'] && results['hdl']) {
      const tg = parseFloat(results['triglicerideos']) || 0;
      const hdl = parseFloat(results['hdl']) || 0;
      if (hdl > 0) {
        const ratioTgHdl = tg / hdl;
        let severity = 'normal';
        let description = 'Sensibilidade insulínica preservada';
        let protocol = null;

        if (ratioTgHdl > 5) {
          severity = 'critical';
          description = '🚨 RESISTÊNCIA INSULÍNICA SEVERA';
          protocol = 'Berberina 1500mg/dia + Canela 3g + Cromo 200mcg + Dieta low-carb rigorosa + Jejum intermitente';
        } else if (ratioTgHdl > 3) {
          severity = 'critical';
          description = '🚨 RESISTÊNCIA INSULÍNICA ESTABELECIDA';
          protocol = 'Berberina 500mg 3x/dia + Canela 3g + Inositol 2g + Dieta low-carb + Exercícios';
        } else if (ratioTgHdl > 2) {
          severity = 'warning';
          description = '⚠️ Resistência insulínica inicial';
          protocol = 'Berberina 500mg 2x/dia + Canela 1g + Reduzir carboidratos simples';
        }

        detected.push({
          title: 'Razão TG/HDL',
          description: description,
          values: `TG/HDL = ${ratioTgHdl.toFixed(2)} ${ratioTgHdl <= 2 ? '✅ Ótima' : ratioTgHdl <= 3 ? '⚠️ Atenção' : '🚨 Crítica'}`,
          severity: severity,
          protocol: protocol
        });
      }
    }

    // RAZÃO CT/HDL (Índice Aterogênico)
    if (results['colesterolTotal'] && results['hdl']) {
      const ct = parseFloat(results['colesterolTotal']) || 0;
      const hdl = parseFloat(results['hdl']) || 0;
      if (hdl > 0) {
        const ratioCtHdl = ct / hdl;
        let severity = 'normal';
        let description = 'Índice aterogênico adequado';
        let protocol = null;

        if (ratioCtHdl > 6) {
          severity = 'critical';
          description = '🚨 RISCO ATEROGÊNICO MUITO ALTO';
          protocol = 'Estatina + Ômega-3 4g + Berberina 1500mg/dia + Dieta mediterrânea rigorosa';
        } else if (ratioCtHdl > 5) {
          severity = 'warning';
          description = '⚠️ Risco aterogênico elevado';
          protocol = 'Ômega-3 3g + Berberina 1000mg/dia + Exercícios aeróbicos';
        } else if (ratioCtHdl > 4) {
          severity = 'warning';
          description = '⚠️ Risco aterogênico limítrofe';
          protocol = 'Ômega-3 2g + Gorduras saudáveis + Exercícios';
        }

        detected.push({
          title: 'Razão CT/HDL (Índice Aterogênico)',
          description: description,
          values: `CT/HDL = ${ratioCtHdl.toFixed(2)} ${ratioCtHdl <= 4 ? '✅ Desejável' : ratioCtHdl <= 5 ? '⚠️ Limítrofe' : '🚨 Alto'}`,
          severity: severity,
          protocol: protocol
        });
      }
    }

    // METAIS PESADOS
    if (analysis['chumboUrinario']?.quintil.id === 'Q5') {
      detected.push({
        title: 'Chumbo urinário elevado',
        description: '🚨 INTOXICAÇÃO POR CHUMBO',
        values: `Chumbo: ${results['chumboUrinario']}`,
        severity: 'emergency',
        protocol: 'DMSA 500mg 3x/dia + Glutationa + NAC 1200mg 2x/dia + Chlorella 5g'
      });
    }

    if (analysis['mercurioUrinario']?.quintil.id === 'Q5') {
      detected.push({
        title: 'Mercúrio urinário elevado',
        description: '🚨 INTOXICAÇÃO POR MERCÚRIO',
        values: `Mercúrio: ${results['mercurioUrinario']}`,
        severity: 'emergency',
        protocol: 'DMPS + Chlorella 10g + Coentro 1000mg 3x/dia + Glutationa IV'
      });
    }

    // NEUROLÓGICO
    if (analysis['betaAmiloide']?.quintil.id === 'Q1' && analysis['tau']?.quintil.id === 'Q5') {
      detected.push({
        title: 'Beta-amiloide baixo + TAU elevado',
        description: '🧠 RISCO ALZHEIMER - Placas e emaranhados',
        values: `β-amiloide: ${results['betaAmiloide']} | TAU: ${results['tau']}`,
        severity: 'critical',
        protocol: 'Ômega-3 DHA 2g + Curcumina 1000mg 3x/dia + Lion\'s Mane 3g + Bacopa 600mg'
      });
    }

    // GASTROINTESTINAL
    if (analysis['calprotectina']?.quintil.id === 'Q5' && analysis['lactoferrina']?.quintil.id === 'Q5') {
      detected.push({
        title: 'Calprotectina + Lactoferrina elevadas',
        description: '🚨 DOENÇA INFLAMATÓRIA INTESTINAL ativa',
        values: `Calprotectina: ${results['calprotectina']} | Lactoferrina: ${results['lactoferrina']}`,
        severity: 'critical',
        protocol: 'Colonoscopia urgente + Curcumina 2000mg 3x/dia + L-Glutamina 10g 2x/dia'
      });
    }

    // MICROBIOTA
    if (analysis['indiceSimpson']?.quintil.id === 'Q1' || analysis['razaoFirmicutesBacteroidetes']?.quintil.id === 'Q5') {
      detected.push({
        title: 'Disbiose intestinal',
        description: 'Diversidade reduzida ou microbiota obesogênica',
        values: `Simpson: ${results['indiceSimpson'] || 'N/A'} | F/B: ${results['razaoFirmicutesBacteroidetes'] || 'N/A'}`,
        severity: 'warning',
        protocol: 'Probióticos 100bi UFC + Prebióticos 15g + Butirato 1200mg 2x/dia'
      });
    }

    // D-DÍMERO + PCR
    if (analysis['ddimero']?.quintil.id === 'Q5' && analysis['proteina cReativaUltrassensivel']?.quintil.id === 'Q5') {
      detected.push({
        title: 'D-dímero + PCR elevados',
        description: '🚨 TROMBO-INFLAMAÇÃO - Risco TEP/TVP',
        values: `D-dímero: ${results['ddimero']} | PCR: ${results['proteina cReativaUltrassensivel']}`,
        severity: 'emergency',
        protocol: 'Encaminhar hematologista URGENTE + Nattokinase 2000 FU 2x/dia + Ômega-3 4g'
      });
    }

    // MARCADORES TUMORAIS
    if (analysis['ca199']?.quintil.id === 'Q5') {
      detected.push({
        title: 'CA 19-9 elevado',
        description: '🚨 SUSPEITA NEOPLASIA PANCREÁTICA',
        values: `CA 19-9: ${results['ca199']}`,
        severity: 'emergency',
        protocol: 'TC/RNM abdome URGENTE + Oncologista + Curcumina IV + Artemísia'
      });
    }

    if (analysis['afp']?.quintil.id === 'Q5') {
      detected.push({
        title: 'AFP elevada',
        description: '🚨 SUSPEITA CARCINOMA HEPATOCELULAR',
        values: `AFP: ${results['afp']}`,
        severity: 'emergency',
        protocol: 'Ultrassom + TC hepática URGENTE + Oncologista + Cardo mariano 900mg 3x/dia'
      });
    }

    if (analysis['cea']?.quintil.id === 'Q5') {
      detected.push({
        title: 'CEA elevado',
        description: '🚨 SUSPEITA NEOPLASIA (cólon, pulmão, mama)',
        values: `CEA: ${results['cea']}`,
        severity: 'emergency',
        protocol: 'Colonoscopia + TC tórax/abdome URGENTE + Oncologista'
      });
    }

    // MIELOGRAMA - Alterações críticas
    if (analysis['mielogramaSerieEritrocítica']?.quintil.id === 'Q1') {
      detected.push({
        title: 'Série eritrocítica diminuída',
        description: '🚨 HIPOPLASIA ERITROIDE - Risco anemia aplástica',
        values: `Série eritrocítica: ${results['mielogramaSerieEritrocítica']}%`,
        severity: 'critical',
        protocol: 'Hematologista URGENTE + Biópsia medula + B12 1000mcg + Folato 5mg'
      });
    }

    if (analysis['mielogramaSerieGranulocítica']?.quintil.id === 'Q5') {
      detected.push({
        title: 'Série granulocítica muito aumentada',
        description: '🚨 SUSPEITA LEUCEMIA MIELOIDE',
        values: `Série granulocítica: ${results['mielogramaSerieGranulocítica']}%`,
        severity: 'emergency',
        protocol: 'Hematologista URGENTE + Citogenética + BCR-ABL + Imunofenotipagem'
      });
    }

    if (analysis['mielogramaPlasmocitos']?.quintil.id === 'Q5') {
      detected.push({
        title: 'Plasmócitos muito elevados',
        description: '🚨 MIELOMA MÚLTIPLO',
        values: `Plasmócitos: ${results['mielogramaPlasmocitos']}%`,
        severity: 'emergency',
        protocol: 'Hematologista/Oncologista URGENTE + Eletroforese proteínas + PET-CT'
      });
    }

    // RAZÕES LIPÍDICAS
    if (analysis['ratioLdlHdl'] && parseFloat(results['ratioLdlHdl']) > 3.5) {
      detected.push({
        title: 'Razão LDL/HDL elevada',
        description: 'Alto risco cardiovascular',
        values: `LDL/HDL: ${results['ratioLdlHdl']}`,
        severity: 'critical',
        protocol: 'Ômega-3 3g + Exercícios + Berberina 500mg 3x/dia + Niacina 1g'
      });
    }

    if (analysis['ratioTgHdl'] && parseFloat(results['ratioTgHdl']) > 3) {
      detected.push({
        title: 'Razão TG/HDL elevada',
        description: 'Forte indicador de resistência insulínica',
        values: `TG/HDL: ${results['ratioTgHdl']}`,
        severity: 'critical',
        protocol: 'Dieta low-carb + Berberina 500mg 3x/dia + Ômega-3 3g + Exercícios'
      });
    }

    return detected;
  };

  useEffect(() => {
    const resetExamData = () => {
      setResults({});
      setAnalysis({});
      setCorrelations([]);
      setExamHistory([]);
      setUrocultureData(createDefaultUrocultureData());
      setDataExame(new Date().toISOString().split('T')[0]);
      setDataConsulta(new Date().toISOString().split('T')[0]);
      setExpandedExam(null);
      setEditingHistoryId(null);
      setExpandAllForPrint(false);
    };

    // Aguarda integração carregar quando a rota não traz :id
    if (!id && patientLoading) {
      return;
    }

    setEditingHistoryId(null);
    setExpandAllForPrint(false);

    if (!activePatientId) {
      // Modo sem paciente - criar paciente fictício para funcionar
      setPaciente({
        nome: '',
        sexo: '',
        idade: '',
        dataNascimento: ''
      });

      // Carregar dados standalone
      const standalone = JSON.parse(localStorage.getItem('laboratoryExamsStandalone') || 'null');
      if (standalone) {
        setResults(standalone.results || {});
        setAnalysis(standalone.analysis || {});
        setCorrelations(standalone.correlations || []);
        setDataExame(standalone.dataExame || new Date().toISOString().split('T')[0]);
        setDataConsulta(standalone.dataConsulta || new Date().toISOString().split('T')[0]);
        setExamHistory(standalone.history || []);
        setUrocultureData(standalone.urocultureData || createDefaultUrocultureData());
      } else {
        resetExamData();
      }
      return;
    }

    const saved = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const found = saved.find((x) => String(x.id) === String(activePatientId));
    const resolvedPatient =
      found ||
      (patientData && String(patientData.id) === String(activePatientId) ? patientData : null);

    if (!resolvedPatient) {
      setPaciente({
        nome: '',
        sexo: '',
        idade: '',
        dataNascimento: ''
      });
      resetExamData();
      return;
    }

    setPaciente(resolvedPatient);

    if (resolvedPatient.laboratoryExamsComplete) {
      const savedExams = resolvedPatient.laboratoryExamsComplete;
      setResults(savedExams.results || {});
      setAnalysis(savedExams.analysis || {});
      setCorrelations(savedExams.correlations || []);
      setDataExame(savedExams.dataExame || new Date().toISOString().split('T')[0]);
      setDataConsulta(savedExams.dataConsulta || new Date().toISOString().split('T')[0]);
      setExamHistory(savedExams.history || []);
      setUrocultureData(savedExams.urocultureData || createDefaultUrocultureData());
    } else {
      resetExamData();
    }
  }, [id, activePatientId, patientData, patientLoading]);

  // Calcular dados do paciente antes de usar nos useEffects
  const patientName = paciente?.nome || paciente?.q01_nome || manualPatientName || 'Não informado';
  const patientSex = paciente?.sexo || manualPatientSex || 'Não informado';
  const patientBirthDate = paciente?.dataNascimento || manualPatientBirthDate || '';
  const patientAge = paciente?.idade || manualPatientAge || (patientBirthDate ? calcularIdade(patientBirthDate) : '');
  const normalizedSex = patientSex === 'Masculino' ? 'homem' : patientSex === 'Feminino' ? 'mulher' : '';
  const patientAgeNumber = parseInt(patientAge) || 0;
  const analysisSex = patientAgeNumber > 0 && patientAgeNumber < 18 ? 'crianca' : (normalizedSex || 'geral');
  const hba1cValue = results['hemoglobinaGlicada'];
  const pageTitle = isUrineMode
    ? 'Resultados de Exames de Urina - Medicina Funcional'
    : 'Exames Laboratoriais - Medicina Funcional';
  const pageSubtitle = isUrineMode
    ? 'Urinálise e Urocultura com Interpretação Funcional'
    : 'Análise por Quintis com Interpretação Funcional';
  const contentTitle = isUrineMode ? 'Exames_de_Urina' : 'Exames_Laboratoriais';
  const registryTitle = isUrineMode ? '📋 Registro de Exames de Urina' : '📋 Registro de Exames Laboratoriais';

  const getValueBySex = (source) => {
    if (!source || typeof source !== 'object') return source ?? null;
    return source[analysisSex] || source.geral || source.homem || source.mulher || null;
  };

  const getIntegrativeRangeText = (exam) => {
    const quintisBySex = getValueBySex(exam.quintis);

    if (quintisBySex && typeof quintisBySex === 'object') {
      const idealQuintil = Object.values(quintisBySex).find((range) => {
        const level = String(range?.nivel || '').toLowerCase();
        return level.includes('ideal') || level.includes('ótimo') || level.includes('otimo') || level.includes('desejável') || level.includes('desejavel');
      });

      if (idealQuintil?.min !== undefined && idealQuintil?.max !== undefined) {
        return `${idealQuintil.min} - ${idealQuintil.max}`;
      }

      if (quintisBySex?.Q3?.min !== undefined && quintisBySex?.Q3?.max !== undefined) {
        return `${quintisBySex.Q3.min} - ${quintisBySex.Q3.max}`;
      }
    }

    const idealValue = getValueBySex(exam.ideal);
    if (idealValue === null || idealValue === undefined) return 'Não informado';

    if (typeof idealValue === 'object' && idealValue.min !== undefined && idealValue.max !== undefined) {
      return `${idealValue.min} - ${idealValue.max}`;
    }

    return String(idealValue);
  };

  const getIdealPointText = (exam) => {
    const idealValue = getValueBySex(exam.ideal);
    if (idealValue === null || idealValue === undefined) return 'Não informado';

    if (typeof idealValue === 'object' && idealValue.min !== undefined && idealValue.max !== undefined) {
      return `${idealValue.min} - ${idealValue.max}`;
    }

    return String(idealValue);
  };

  const matchesSearchTerm = (examKey, exam) => {
    const activeSearchTerm = expandAllForPrint ? '' : searchTerm;
    if (!activeSearchTerm) return true;

    const normalizedTerm = activeSearchTerm.toLowerCase();
    return (
      exam.nome.toLowerCase().includes(normalizedTerm) ||
      String(exam.categoria || '').toLowerCase().includes(normalizedTerm) ||
      examKey.toLowerCase().includes(normalizedTerm)
    );
  };

  const isUrinalysisExam = (examKey, exam) => {
    const normalizedKey = String(examKey || '').toLowerCase();
    const normalizedName = String(exam?.nome || '').toLowerCase();
    const normalizedCategory = String(exam?.categoria || '').toLowerCase();

    return (
      normalizedKey.includes('urin') ||
      normalizedKey.includes('uroculture') ||
      normalizedName.includes('urin') ||
      normalizedName.includes('urocultura') ||
      normalizedCategory.includes('urin')
    );
  };

  const matchesPageMode = (examKey, exam) => {
    const urineExam = isUrinalysisExam(examKey, exam);
    return isUrineMode ? urineExam : !urineExam;
  };

  const supportsBinaryUrineShortcut = (examKey) =>
    isUrineMode && Boolean(URINE_BINARY_SHORTCUT_EXAMS[examKey]);

  const filteredExamEntries = Object.entries(LABORATORY_EXAMS_COMPLETE)
    .filter(([examKey, exam]) => matchesPageMode(examKey, exam))
    .filter(([examKey, exam]) => matchesSearchTerm(examKey, exam));

  const hasRegisteredResult = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim() !== '';
    return true;
  };

  const hasUrocultureRegisteredData = Boolean(
    String(urocultureData?.selectedAgent || '').trim() ||
    String(urocultureData?.colonyCount || '').trim() ||
    Object.values(urocultureData?.susceptibility || {}).some((status) => String(status || '').trim() !== '')
  );

  // Analisar resultado quando valor muda
  useEffect(() => {
    const newAnalysis = {};
    Object.entries(results).forEach(([examKey, value]) => {
      if (value === '' || value === null || value === undefined) return;

      const parsedValue = parseFloat(value);
      const valueToAnalyze = Number.isNaN(parsedValue) ? value : parsedValue;
      const result = analyzeExamResult(examKey, valueToAnalyze, analysisSex);

      if (result) {
        newAnalysis[examKey] = result;
      }
    });

    setAnalysis(newAnalysis);

    // Analisar correlações
    const patterns = analyzeCorrelations(newAnalysis);
    setCorrelations(patterns);
  }, [results, analysisSex]);

  // Cálculo automático da Glicemia Média Estimada (eAG) a partir da HbA1c
  useEffect(() => {
    const hba1c = parseFloat(hba1cValue);

    if (Number.isNaN(hba1c) || hba1c <= 0) {
      setResults((prev) => {
        if (!prev['glicemiaMediaEstimada']) return prev;
        return {
          ...prev,
          glicemiaMediaEstimada: ''
        };
      });
      return;
    }

    const estimatedGlycemia = (28.7 * hba1c - 46.7).toFixed(1);
    setResults((prev) => {
      if (String(prev['glicemiaMediaEstimada'] || '') === estimatedGlycemia) {
        return prev;
      }

      return {
        ...prev,
        glicemiaMediaEstimada: estimatedGlycemia
      };
    });
  }, [hba1cValue]);

  const handleValueChange = (examKey, value) => {
    setResults(prev => ({
      ...prev,
      [examKey]: value
    }));
  };

  const buildImageUrocultureTemplate = () => ({
    selectedAgent: 'staphylococcusSaprophyticus',
    colonyCount: '100000',
    material: 'Urina 2º jato',
    susceptibility: {
      amoxiclav: 'S',
      amikacina: 'S',
      ampicilina: 'R',
      cefalexina: 'R',
      ceftriaxona: 'R',
      cefotaxima: 'R',
      cefoxitina: 'R',
      ciprofloxacino: 'R',
      fosfomicina: 'S',
      gentamicina: 'S',
      imipenem: 'S',
      levofloxacino: 'R',
      nitrofurantoina: 'R',
      norfloxacino: 'R',
      cefaclor: 'R',
      sulfatrimetoprim: 'S'
    }
  });

  const handleLoadImageUrocultureTemplate = () => {
    setUrocultureData(buildImageUrocultureTemplate());
  };

  const handleUrineExamShortcut = () => {
    if (!isUrineMode) {
      navigate(urinePagePath);
      return;
    }

    setSearchTerm('urin');
    setExpandedExam('densidadeUrinaria');

    const shouldLoadTemplate = window.confirm(
      'Deseja preencher automaticamente o modelo de Exame de Urina com os valores das imagens enviadas?'
    );

    if (!shouldLoadTemplate) return;

    setResults((prev) => ({
      ...prev,
      densidadeUrinaria: '1.025',
      phUrinario: '5.5',
      glicoseUrina: '50',
      nitritoUrina: '0',
      floraBacterianaUrina: '1',
      piocitosUrina: '30',
      hemaciasUrinaSedimento: '1',
      celulasEpiteliaisUrina: '8'
    }));

    handleLoadImageUrocultureTemplate();
  };

  const calculateAutomaticComparison = (currentAnalysis = {}, previousAnalysis = {}) => {
    const quintilScores = { Q1: 1, Q2: 2, Q3: 3, Q4: 4, Q5: 5 };

    const comparableKeys = Object.keys(currentAnalysis).filter((examKey) => {
      const currentQuintil = currentAnalysis[examKey]?.quintil?.id;
      const previousQuintil = previousAnalysis[examKey]?.quintil?.id;
      return Boolean(currentQuintil && previousQuintil);
    });

    let improved = 0;
    let worsened = 0;
    let stable = 0;

    comparableKeys.forEach((examKey) => {
      const currentScore = quintilScores[currentAnalysis[examKey]?.quintil?.id] || 3;
      const previousScore = quintilScores[previousAnalysis[examKey]?.quintil?.id] || 3;

      const currentDistanceFromIdeal = Math.abs(currentScore - 3);
      const previousDistanceFromIdeal = Math.abs(previousScore - 3);

      if (currentDistanceFromIdeal < previousDistanceFromIdeal) {
        improved += 1;
      } else if (currentDistanceFromIdeal > previousDistanceFromIdeal) {
        worsened += 1;
      } else {
        stable += 1;
      }
    });

    const isCritical = (item) => {
      const quintil = item?.quintil?.id;
      return quintil === 'Q1' || quintil === 'Q5';
    };

    const currentCriticalCount = Object.values(currentAnalysis).filter(isCritical).length;
    const previousCriticalCount = Object.values(previousAnalysis).filter(isCritical).length;

    return {
      totalCompared: comparableKeys.length,
      improved,
      worsened,
      stable,
      criticalDelta: currentCriticalCount - previousCriticalCount
    };
  };

  const loadHistoryEntry = (entry, editMode = false) => {
    if (!entry) return;

    setResults(entry.results || {});
    setDataExame(entry.dataExame || new Date().toISOString().split('T')[0]);
    setDataConsulta(entry.dataConsulta || new Date().toISOString().split('T')[0]);
    setUrocultureData(entry.urocultureData || createDefaultUrocultureData());
    setExpandedExam(null);
    setEditingHistoryId(editMode ? entry.id : null);
    setShowHistoryDialog(false);
  };

  const handleSave = () => {
    const existingEntry = editingHistoryId
      ? examHistory.find((entry) => entry.id === editingHistoryId)
      : null;

    // Criar ou atualizar entrada de histórico com dados do paciente
    const historyEntry = {
      id: existingEntry?.id || Date.now(),
      dataExame,
      dataConsulta,
      results: { ...results },
      analysis: { ...analysis },
      correlations: [...correlations],
      urocultureData: {
        ...urocultureData,
        susceptibility: { ...(urocultureData?.susceptibility || {}) }
      },
      // ADICIONAR DADOS DO PACIENTE
      patientData: {
        nome: paciente?.nome || paciente?.q01_nome || manualPatientName || 'Não informado',
        sexo: paciente?.sexo || manualPatientSex || 'Não informado',
        idade: paciente?.idade || manualPatientAge || '',
        dataNascimento: paciente?.dataNascimento || manualPatientBirthDate || ''
      },
      createdAt: existingEntry?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newHistory = existingEntry
      ? examHistory.map((entry) => (entry.id === existingEntry.id ? historyEntry : entry))
      : [historyEntry, ...examHistory];

    const previousEntry = existingEntry ? null : examHistory[0] || null;
    const comparisonSummary = previousEntry
      ? calculateAutomaticComparison(historyEntry.analysis, previousEntry.analysis || {})
      : null;

    const comparisonText =
      comparisonSummary && comparisonSummary.totalCompared > 0
        ? `\n\n📊 Comparação automática vs exame anterior:\n• Melhoraram: ${comparisonSummary.improved}\n• Pioraram: ${comparisonSummary.worsened}\n• Estáveis: ${comparisonSummary.stable}\n• Δ críticos: ${comparisonSummary.criticalDelta > 0 ? '+' : ''}${comparisonSummary.criticalDelta}`
        : '';

    const successMessage = existingEntry
      ? '✅ Exames atualizados com sucesso no histórico.'
      : `✅ Exames salvos com sucesso! Histórico atualizado.${comparisonText}`;

    if (!activePatientId) {
      // Sem ID de paciente - salvar apenas localmente no navegador
      const standaloneData = {
        patientName: manualPatientName,
        patientSex: manualPatientSex,
        patientAge: manualPatientAge,
        results,
        analysis,
        correlations,
        urocultureData,
        dataExame,
        dataConsulta,
        history: newHistory,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('laboratoryExamsStandalone', JSON.stringify(standaloneData));
      setExamHistory(newHistory);
      setEditingHistoryId(null);
      alert(successMessage);
      return;
    }

    const saved = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const index = saved.findIndex(x => String(x.id) === String(activePatientId));
    
    if (index !== -1) {
      saved[index] = {
        ...saved[index],
        laboratoryExamsComplete: {
          results,
          analysis,
          correlations,
          urocultureData,
          dataExame,
          dataConsulta,
          history: newHistory,
          updatedAt: new Date().toISOString()
        }
      };
      localStorage.setItem('anamneses', JSON.stringify(saved));
      setExamHistory(newHistory);
      setEditingHistoryId(null);
      
      // Salvar também via hook de integração
      saveToPatient({
        results,
        analysis,
        correlations,
        urocultureData,
        dataExame,
        dataConsulta,
        history: newHistory,
        updatedAt: new Date().toISOString()
      });
      
      alert(successMessage);
    } else {
      alert('❌ Paciente não encontrado para salvar os exames.');
    }
  };

  const handlePrint = () => {
    setExpandAllForPrint(true);
    window.setTimeout(() => {
      window.print();
    }, 150);
  };

  if (!paciente) {
    return (
      <Container>
        <Paper sx={{ p: 4, mt: 3, textAlign: 'center' }}>
          <LinearProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>Carregando...</Typography>
        </Paper>
      </Container>
    );
  }

  const getQuintilIcon = (quintil) => {
    if (!quintil) return null;
    if (quintil.id === 'Q3') return <CheckCircleIcon sx={{ color: quintil.cor }} />;
    if (quintil.id === 'Q1' || quintil.id === 'Q5') return <WarningIcon sx={{ color: quintil.cor }} />;
    if (quintil.id === 'Q2') return <TrendingDownIcon sx={{ color: quintil.cor }} />;
    if (quintil.id === 'Q4') return <TrendingUpIcon sx={{ color: quintil.cor }} />;
    return null;
  };

  return (
    <Container maxWidth="xl" id="printable-content">
      {/* CABEÇALHO DE IMPRESSÃO */}
      <Box className="print-only">
        <PrescriptionHeader entry={patientData} />
        
        {/* DADOS DO PACIENTE PARA IMPRESSÃO */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Paciente:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>{patientName}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="text.secondary">Idade:</Typography>
              <Typography variant="body1">{patientAge ? `${patientAge} anos` : '-'}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="text.secondary">Sexo:</Typography>
              <Typography variant="body1">{patientSex}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Data do Exame:</Typography>
              <Typography variant="body1">{new Date(dataExame).toLocaleDateString('pt-BR')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Data da Consulta:</Typography>
              <Typography variant="body1">{new Date(dataConsulta).toLocaleDateString('pt-BR')}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* CABEÇALHO COM DADOS DO PACIENTE */}
      <Paper sx={{ p: 4, mt: 3, mb: 3 }} ref={contentRef} className="no-print">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <ScienceIcon sx={{ fontSize: 48, color: '#1976d2' }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>
              {pageTitle}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {pageSubtitle}
            </Typography>
          </Box>
          <PrescriptionActions
            patientData={patientData}
            contentRef={contentRef}
            contentTitle={contentTitle}
            onBack={goToDashboard}
          />
        </Box>

        {/* DADOS DO PACIENTE */}
        <Card sx={{ bgcolor: '#f5f5f5', mb: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="body2" color="text.secondary">Nome do Paciente</Typography>
                {hasLinkedPatient ? (
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {patientName}
                  </Typography>
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Digite o nome do paciente"
                    value={manualPatientName}
                    onChange={(e) => setManualPatientName(e.target.value)}
                  />
                )}
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="body2" color="text.secondary">Sexo</Typography>
                {hasLinkedPatient ? (
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {patientSex}
                  </Typography>
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    select
                    value={manualPatientSex}
                    onChange={(e) => setManualPatientSex(e.target.value)}
                    SelectProps={{ native: true }}
                  >
                    <option value="">Selecione</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                  </TextField>
                )}
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="body2" color="text.secondary">Idade</Typography>
                {hasLinkedPatient ? (
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {patientAge ? `${patientAge} anos` : 'Não informado'}
                  </Typography>
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    placeholder="Idade"
                    value={manualPatientAge}
                    onChange={(e) => setManualPatientAge(e.target.value)}
                    disabled={!!manualPatientBirthDate}
                  />
                )}
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="body2" color="text.secondary">Data de Nascimento</Typography>
                {hasLinkedPatient ? (
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {patientBirthDate ? new Date(patientBirthDate).toLocaleDateString('pt-BR') : 'Não informado'}
                  </Typography>
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    value={manualPatientBirthDate}
                    onChange={(e) => setManualPatientBirthDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="body2" color="text.secondary">Data do Exame</Typography>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={dataExame}
                  onChange={(e) => setDataExame(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="body2" color="text.secondary">Data da Consulta</Typography>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={dataConsulta}
                  onChange={(e) => setDataConsulta(e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* AÇÕES */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }} className="no-print">
          <Button
            variant="contained"
            startIcon={editingHistoryId ? <EditIcon /> : <SaveIcon />}
            onClick={handleSave}
            sx={{ bgcolor: editingHistoryId ? '#fb8c00' : '#4caf50' }}
          >
            {editingHistoryId ? 'Salvar Edição' : 'Salvar Exames'}
          </Button>
          {editingHistoryId && (
            <Button
              variant="text"
              color="warning"
              onClick={() => setEditingHistoryId(null)}
            >
              Cancelar Edição
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<HistoryIcon />}
            onClick={() => setShowHistoryDialog(true)}
            disabled={examHistory.length === 0}
          >
            Ver Histórico ({examHistory.length})
          </Button>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
          >
            Imprimir Relatório
          </Button>
          <Button
            variant="outlined"
            startIcon={<ScienceIcon />}
            onClick={() => navigate(isUrineMode ? laboratoryPagePath : urinePagePath)}
          >
            {isUrineMode ? 'Exames Laboratoriais Gerais' : 'Resultados de Exames de Urina'}
          </Button>
          {hasLinkedPatient && (
            <Button
              variant="outlined"
              onClick={() => navigate(`/anamnese/${activePatientId}`)}
            >
              Voltar
            </Button>
          )}
        </Box>
      </Paper>

      {/* ALERTA SE SEXO NÃO FOI INFORMADO */}
      {!hasLinkedPatient && !manualPatientSex && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            ⚠️ Atenção: Preencha o sexo e idade do paciente para visualizar análises completas!
          </Typography>
          <Typography variant="body2">
            Muitos exames possuem valores de referência diferentes para:
          </Typography>
          <Typography variant="body2" component="div" sx={{ mt: 1 }}>
            • <strong>Homens e Mulheres</strong> (valores adultos diferentes)<br/>
            • <strong>Crianças e Adolescentes</strong> (&lt; 18 anos - valores pediátricos)<br/>
            Sem essas informações, os comentários interpretativos e quintis não serão exibidos corretamente.
          </Typography>
        </Alert>
      )}

      {/* ALERTAS DE CORRELAÇÕES CRÍTICAS */}
      {correlations.length > 0 && (
        <Paper className="print-relations-section" sx={{ p: 3, mb: 3, bgcolor: '#fff3e0', border: '2px solid #ff9800' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#e65100' }}>
            ⚠️ Padrões Clínicos Identificados ({correlations.length})
          </Typography>
          {correlations.map((pattern, idx) => (
            <Card className="print-relations-card" key={idx} sx={{ mb: 2, border: `2px solid ${pattern.severidade === 'alta' ? '#f44336' : '#ff9800'}` }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Chip 
                    label={pattern.severidade === 'alta' ? 'PRIORIDADE ALTA' : 'MODERADA'}
                    color={pattern.severidade === 'alta' ? 'error' : 'warning'}
                    sx={{ fontWeight: 700 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {pattern.nome}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Exames envolvidos:</strong> {pattern.exames.join(', ')}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {pattern.descricao}
                </Typography>
                <Card sx={{ bgcolor: '#e8f5e9', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#2e7d32' }}>
                    💊 PROTOCOLO TERAPÊUTICO:
                  </Typography>
                  <List dense>
                    {pattern.tratamento.map((item, i) => (
                      <ListItem key={i}>
                        <ListItemText primary={`• ${item}`} />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </CardContent>
            </Card>
          ))}
        </Paper>
      )}

      {/* LISTA DE EXAMES POR CATEGORIA */}
      <Paper sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          {registryTitle}
        </Typography>

        {/* CAMPO DE PESQUISA */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder={isUrineMode
              ? 'Pesquisar exame de urina... (ex: nitrito, pH, densidade)'
              : 'Pesquisar exame... (ex: hemoglobina, ferritina, glicose)'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ 
              bgcolor: 'white',
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              }
            }}
          />

          <Box sx={{ mt: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap' }} className="no-print">
            <Button
              size="small"
              variant="outlined"
              startIcon={<ScienceIcon />}
              onClick={handleUrineExamShortcut}
            >
              {isUrineMode ? 'Aplicar Modelo de Urina (Imagens)' : 'Ir para Exames de Urina'}
            </Button>
            {searchTerm && (
              <Button
                size="small"
                variant="text"
                onClick={() => setSearchTerm('')}
              >
                Limpar Filtro
              </Button>
            )}
          </Box>

          {searchTerm && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {filteredExamEntries.length} exame(s) encontrado(s)
            </Typography>
          )}
        </Box>

        {isUrineMode && (
          <Box className={hasUrocultureRegisteredData ? 'print-has-uroculture' : 'print-no-uroculture'}>
            <UrocultureAntibiogramSection
              urocultureData={urocultureData}
              setUrocultureData={setUrocultureData}
              onLoadImageTemplate={handleLoadImageUrocultureTemplate}
            />
          </Box>
        )}

        {filteredExamEntries.map(([examKey, exam]) => {
          const rawValue = results[examKey];
          const currentValue = rawValue === null || rawValue === undefined ? '' : String(rawValue);
          const currentAnalysis = analysis[examKey];
          const hasValue = hasRegisteredResult(rawValue);
          const binaryShortcut = supportsBinaryUrineShortcut(examKey)
            ? URINE_BINARY_SHORTCUT_EXAMS[examKey]
            : null;
          const showBinaryShortcuts = Boolean(binaryShortcut);

          return (
            <Accordion
              key={examKey}
              className={hasValue ? 'print-result-item print-has-value' : 'print-result-item print-no-value'}
              expanded={expandAllForPrint || expandedExam === examKey}
              onChange={() => {
                if (expandAllForPrint) return;
                setExpandedExam(expandedExam === examKey ? null : examKey);
              }}
              sx={{
                mb: 2,
                border: hasValue && currentAnalysis ? `2px solid ${currentAnalysis.quintil.cor}` : '1px solid #e0e0e0',
                bgcolor: hasValue && currentAnalysis?.quintil?.id === 'Q1' || currentAnalysis?.quintil?.id === 'Q5' ? '#ffebee' : '#fff'
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  {currentAnalysis && getQuintilIcon(currentAnalysis.quintil)}
                  <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                    {exam.nome}
                  </Typography>
                  {currentAnalysis && (
                    <Chip 
                      label={currentAnalysis.quintil.nivel}
                      sx={{ bgcolor: currentAnalysis.quintil.cor, color: 'white', fontWeight: 700 }}
                    />
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails className="print-result-details">
                <Grid container spacing={3} className="print-result-content">
                  {/* Coluna de entrada de valor */}
                  <Grid item xs={12} md={4}>
                    {exam.funcao && (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          ℹ️ Função do Exame:
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                          {exam.funcao}
                        </Typography>
                      </Alert>
                    )}
                    
                    <TextField
                      label={exam.unidade ? `Valor (${exam.unidade})` : 'Valor'}
                      type="number"
                      fullWidth
                      value={currentValue}
                      onChange={(e) => handleValueChange(examKey, e.target.value)}
                      inputProps={{ step: 'any' }}
                      disabled={examKey === 'glicemiaMediaEstimada'}
                      helperText={
                        examKey === 'glicemiaMediaEstimada'
                          ? 'Calculado automaticamente pela HbA1c.'
                          : examKey === 'nitritoUrina'
                            ? 'Escala: 0 = Negativo | 1 = Positivo'
                            : examKey === 'floraBacterianaUrina'
                              ? 'Escala: 0 = Negativo/Normal | 1 = Positivo/Aumentada'
                              : examKey === 'proteinuriaUrina'
                                ? 'Atalho: Negativo = 0 | Positivo = 30 mg/dL (faixa inicial)'
                                : examKey === 'glicoseUrina'
                                  ? 'Atalho: Negativo = 0 | Positivo = 50 mg/dL (faixa inicial)'
                              : ''
                      }
                    />
                    {showBinaryShortcuts && (
                      <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Button
                          size="small"
                          variant={String(currentValue) === binaryShortcut.negativeValue ? 'contained' : 'outlined'}
                          onClick={() => handleValueChange(examKey, binaryShortcut.negativeValue)}
                        >
                          Negativo
                        </Button>
                        <Button
                          size="small"
                          variant={String(currentValue) === binaryShortcut.positiveValue ? 'contained' : 'outlined'}
                          onClick={() => handleValueChange(examKey, binaryShortcut.positiveValue)}
                        >
                          Positivo
                        </Button>
                      </Box>
                    )}
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Referência Integrativa ({analysisSex}): {getIntegrativeRangeText(exam)} {exam.unidade}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 600, display: 'block' }}>
                      Alvo ideal integrativo: {getIdealPointText(exam)} {exam.unidade}
                    </Typography>
                  </Grid>

                  {currentAnalysis && (
                    <Grid item xs={12} md={8}>
                      <Card sx={{ bgcolor: `${currentAnalysis.quintil.cor}15`, border: `2px solid ${currentAnalysis.quintil.cor}` }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: currentAnalysis.quintil.cor }}>
                            {currentAnalysis.quintil.nivel} ({currentAnalysis.quintil.id})
                          </Typography>

                          {currentAnalysis.interpretacao && (
                            <>
                              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                                📊 Significado:
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                {currentAnalysis.interpretacao.significado}
                              </Typography>

                              {currentAnalysis.interpretacao.causas && (
                                <>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                                    🔍 Causas Possíveis:
                                  </Typography>
                                  <List dense>
                                    {currentAnalysis.interpretacao.causas.map((causa, i) => (
                                      <ListItem key={i}>
                                        <ListItemText primary={`• ${causa}`} />
                                      </ListItem>
                                    ))}
                                  </List>
                                </>
                              )}

                              {currentAnalysis.interpretacao.sintomas && (
                                <>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#f57c00' }}>
                                    ⚠️ Sintomas Relacionados:
                                  </Typography>
                                  <List dense>
                                    {currentAnalysis.interpretacao.sintomas.map((sintoma, i) => (
                                      <ListItem key={i}>
                                        <ListItemText primary={`• ${sintoma}`} />
                                      </ListItem>
                                    ))}
                                  </List>
                                </>
                              )}

                              {currentAnalysis.interpretacao.riscos && (
                                <>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#d32f2f' }}>
                                    🚨 Riscos:
                                  </Typography>
                                  <List dense>
                                    {currentAnalysis.interpretacao.riscos.map((risco, i) => (
                                      <ListItem key={i}>
                                        <ListItemText primary={`• ${risco}`} />
                                      </ListItem>
                                    ))}
                                  </List>
                                </>
                              )}

                              {currentAnalysis.interpretacao.orientacoes && (
                                <>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#2e7d32' }}>
                                    💡 Orientações Terapêuticas:
                                  </Typography>
                                  <List dense>
                                    {currentAnalysis.interpretacao.orientacoes.map((orientacao, i) => (
                                      <ListItem key={i}>
                                        <ListItemText primary={`• ${orientacao}`} />
                                      </ListItem>
                                    ))}
                                  </List>
                                </>
                              )}

                              {currentAnalysis.interpretacao.investigar && (
                                <Alert severity="info" sx={{ mt: 2 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    🔬 Investigar: {currentAnalysis.interpretacao.investigar.join(', ')}
                                  </Typography>
                                </Alert>
                              )}

                              {currentAnalysis.interpretacao.urgente && (
                                <Alert severity="error" sx={{ mt: 2 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                    🚨 ATENÇÃO: Este resultado requer avaliação médica urgente!
                                  </Typography>
                                </Alert>
                              )}
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Paper>

      {/* RESUMO EXECUTIVO */}
      {Object.keys(analysis).length > 0 && (
        <Paper sx={{ p: 3, mb: 3, bgcolor: '#e3f2fd', border: '2px solid #1976d2' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1565c0' }}>
            📋 RESUMO EXECUTIVO
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: '#fff', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1976d2' }}>
                    📊 Estatísticas
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Total de exames realizados:</strong> {Object.keys(results).filter(k => results[k]).length}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Exames analisados:</strong> {Object.keys(analysis).length}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Valores ideais (Q3):</strong> {Object.values(analysis).filter(a => a.quintil?.id === 'Q3').length}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: '#f57c00' }}>
                    <strong>Valores alterados:</strong> {Object.values(analysis).filter(a => a.quintil?.id !== 'Q3').length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#d32f2f' }}>
                    <strong>Valores críticos (Q1/Q5):</strong> {Object.values(analysis).filter(a => a.quintil?.id === 'Q1' || a.quintil?.id === 'Q5').length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card sx={{ bgcolor: '#fff', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#d32f2f' }}>
                    ⚠️ Exames Prioritários para Atenção
                  </Typography>
                  {Object.entries(analysis)
                    .filter(([key, data]) => data.quintil?.id === 'Q1' || data.quintil?.id === 'Q5')
                    .slice(0, 5)
                    .map(([key, data]) => (
                      <Alert 
                        key={key} 
                        severity={data.interpretacao?.urgente ? "error" : "warning"} 
                        sx={{ mb: 1 }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {data.exame}: {data.valor} {data.unidade} - {data.quintil.nivel}
                        </Typography>
                        {data.interpretacao?.significado && (
                          <Typography variant="caption">
                            {data.interpretacao.significado}
                          </Typography>
                        )}
                      </Alert>
                    ))}
                  {Object.values(analysis).filter(a => a.quintil?.id === 'Q1' || a.quintil?.id === 'Q5').length === 0 && (
                    <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                      ✅ Nenhum exame em faixa crítica!
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* RELATÓRIO DIAGNÓSTICO INTEGRADO */}
      {Object.keys(analysis).length > 0 && (
        <DiagnosticReport
          analysis={analysis}
          results={results}
          patientName={patientName}
          patientAge={patientAge}
          patientSex={patientSex}
          dataExame={dataExame}
        />
      )}

      {/* PROTOCOLO TERAPÊUTICO INTEGRADO */}
      {Object.keys(analysis).length > 0 && (
        <Paper sx={{ p: 3, mb: 3, bgcolor: '#e8f5e9', border: '2px solid #4caf50' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#2e7d32' }}>
            💊 PROTOCOLO TERAPÊUTICO INTEGRADO
          </Typography>
          
          {Object.entries(analysis)
            .filter(([key, data]) => data.interpretacao?.orientacoes && data.quintil?.id !== 'Q3')
            .map(([key, data]) => (
              <Card key={key} sx={{ mb: 2, bgcolor: '#fff' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#2e7d32' }}>
                    {data.exame} ({data.quintil.nivel})
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                    Valor atual: <strong>{data.valor} {data.unidade}</strong> | 
                    Ideal: <strong>{data.ideal}</strong>
                  </Typography>
                  
                  {data.interpretacao.orientacoes && (
                    <>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#1976d2' }}>
                        📝 Orientações Terapêuticas:
                      </Typography>
                      <List dense>
                        {data.interpretacao.orientacoes.map((orientacao, i) => (
                          <ListItem key={i}>
                            <ListItemText 
                              primary={`• ${orientacao}`}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}

                  {data.correlacoes && data.correlacoes.length > 0 && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        🔗 Correlações: Este exame se relaciona com {data.correlacoes.join(', ')}
                      </Typography>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}

          {Object.values(analysis).filter(a => a.interpretacao?.orientacoes && a.quintil?.id !== 'Q3').length === 0 && (
            <Alert severity="success">
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                ✅ Todos os exames estão em faixa ideal! Continue mantendo os hábitos saudáveis.
              </Typography>
            </Alert>
          )}
        </Paper>
      )}

      {/* INTERAÇÕES E PADRÕES CLÍNICOS - NO FINAL */}
      {Object.keys(analysis).length > 0 && (
        <Paper sx={{ p: 4, mb: 3, bgcolor: '#f3e5f5', border: '3px solid #9c27b0' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#6a1b9a' }}>
            🔗 INTERAÇÕES ENTRE EXAMES - PADRÕES CLÍNICOS
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            <strong>📚 Fonte:</strong> Manual Prático da Anamnese Integrativa - A conexão de tudo (Luciana Caxito Lopes) - 
            Correlações funcionais com protocolos de Fitoterápicos, Maria Rocha, Suplementação Ortomolecular e Fisioquântica.
          </Typography>

          {/* TABELA COMPLETA DE CORRELAÇÕES */}
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#6a1b9a' }}>
            📋 TODAS AS CORRELAÇÕES FUNCIONAIS (Luciana Caxito Lopes)
          </Typography>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>⚗️ MINERAIS, VITAMINAS E PARATORMÔNIO</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Exames Correlacionados</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Significado Clínico</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Protocolo Terapêutico</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ bgcolor: analysis['paratormonio']?.quintil.id === 'Q5' && analysis['vitaminaD']?.quintil.id === 'Q1' ? '#fff3e0' : 'inherit' }}>
                      <TableCell>PTH elevado + Vitamina D baixa</TableCell>
                      <TableCell>Estimulação compensatória - Hiperparatireoidismo secundário</TableCell>
                      <TableCell>Vit D3 10.000 UI/dia 30d + Magnésio 400mg + K2 200mcg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PTH elevado + Cálcio normal + Fadiga</TableCell>
                      <TableCell>Hiperparatireoidismo subclínico</TableCell>
                      <TableCell>Investigar causa + Vitamina D + Magnésio</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PTH elevado + Fósforo elevado</TableCell>
                      <TableCell>Possível disfunção renal</TableCell>
                      <TableCell>Encaminhar nefrologista + Controle fosfato dietético</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PTH baixo + Hipocalcemia</TableCell>
                      <TableCell>Hipoparatireoidismo ou deficiência magnésio</TableCell>
                      <TableCell>Magnésio 600mg + Cálcio + Vitamina D</TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: analysis['cobreHemacia']?.quintil.id === 'Q1' && analysis['zincoHemacia']?.quintil.id === 'Q1' ? '#fff3e0' : 'inherit' }}>
                      <TableCell>Cobre hemácia baixo + Zinco hemácia baixo</TableCell>
                      <TableCell>Disfunção antioxidante mitocondrial</TableCell>
                      <TableCell>Zinco 30mg + Cobre 2mg + CoQ10 200mg + PQQ 20mg</TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: analysis['cobreHemacia']?.quintil.id === 'Q5' && analysis['ferritina']?.quintil.id === 'Q5' ? '#fff3e0' : 'inherit' }}>
                      <TableCell>Cobre hemácia alto + Ferritina alta</TableCell>
                      <TableCell>Inflamação crônica latente</TableCell>
                      <TableCell>Curcumina 1500mg 3x/dia + Boswellia 400mg 3x/dia + Ômega-3 3g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cobre hemácia baixo + Queda cabelo + Unhas fracas</TableCell>
                      <TableCell>Deficiência estrutural de cobre</TableCell>
                      <TableCell>Cobre glicinato 2mg + Zinco 15mg + Biotina 5mg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cobre hemácia baixo + Anemia + Ceruloplasmina baixa</TableCell>
                      <TableCell>Disfunção metabólica do ferro</TableCell>
                      <TableCell>Cobre 3mg + Ferro bisglicinato 30mg + Vit C 500mg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cobre alto + PCR elevada</TableCell>
                      <TableCell>Inflamação crônica ativa</TableCell>
                      <TableCell>Anti-inflamatórios naturais + Investigar foco</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cobre alto + Ceruloplasmina alta</TableCell>
                      <TableCell>Fase aguda inflamatória</TableCell>
                      <TableCell>Curcumina + Ômega-3 + Investigação</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cobre baixo + Ceruloplasmina baixa</TableCell>
                      <TableCell>Deficiência real ou disfunção hepática</TableCell>
                      <TableCell>Avaliar função hepática + Suplementar cobre</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cobre alto + Sintomas neurológicos</TableCell>
                      <TableCell>Investigar toxicidade por cobre (Wilson)</TableCell>
                      <TableCell>Quelantes + Zinco alto dose + Encaminhar neurologista</TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: analysis['magnesio']?.quintil.id === 'Q1' ? '#fff3e0' : 'inherit' }}>
                      <TableCell>Magnésio baixo + Cãibras noturnas</TableCell>
                      <TableCell>Distúrbios excitabilidade neuromuscular</TableCell>
                      <TableCell>Magnésio treonato 2000mg + Taurina 1000mg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Magnésio baixo + Glicemia alterada</TableCell>
                      <TableCell>Impacto na sensibilidade insulínica</TableCell>
                      <TableCell>Magnésio 600mg + Cromo 500mcg + Berberina 500mg 3x/dia</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Magnésio baixo + Hipertensão</TableCell>
                      <TableCell>Prejuízo vasodilatação e função endotelial</TableCell>
                      <TableCell>Magnésio 600mg + Potássio 2g + Taurina 2g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Magnésio baixo + Estresse crônico</TableCell>
                      <TableCell>Consumo aumentado pelo eixo HPA</TableCell>
                      <TableCell>Magnésio 800mg + Ashwagandha 600mg 2x/dia + GABA</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mg intracelular alterado + Cãibras + TPM intensa</TableCell>
                      <TableCell>Resistência insulínica precoce</TableCell>
                      <TableCell>Magnésio + Vitamina B6 200mg + Berberina</TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: analysis['selenio']?.quintil.id === 'Q1' && analysis['t3Livre']?.quintil.id === 'Q1' ? '#fff3e0' : 'inherit' }}>
                      <TableCell>Selênio baixo + T3 livre reduzido</TableCell>
                      <TableCell>Prejuízo conversão T4→T3 (deiodinase)</TableCell>
                      <TableCell>Selênio 200mcg + Ashwagandha 600mg 2x/dia + Zinco 30mg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Selênio baixo + PCR elevada</TableCell>
                      <TableCell>Dificuldade controle estresse oxidativo</TableCell>
                      <TableCell>Selênio 200mcg + Vitamina E 800 UI + CoQ10</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Selênio baixo + Baixa imunidade</TableCell>
                      <TableCell>Falha resposta antioxidante</TableCell>
                      <TableCell>Selênio 200mcg + Zinco 30mg + Vitamina C 2g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Selênio baixo + Infertilidade</TableCell>
                      <TableCell>Impacto função espermática/oocitária</TableCell>
                      <TableCell>Selênio 200mcg + CoQ10 300mg + Ômega-3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Manganês baixo + Fadiga crônica</TableCell>
                      <TableCell>Prejuízo metabolismo energético mitocondrial</TableCell>
                      <TableCell>Manganês 10mg + CoQ10 200mg + ALA 600mg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Manganês baixo + Osteopenia</TableCell>
                      <TableCell>Impacto formação óssea e colágeno</TableCell>
                      <TableCell>Manganês 10mg + Vit K2 200mcg + Vit D + Colágeno</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Manganês elevado + Sintomas motores</TableCell>
                      <TableCell>Risco toxicidade neurológica</TableCell>
                      <TableCell>Suspender suplementação + Quelação + Neurologista</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Manganês baixo + Disfunções metabólicas</TableCell>
                      <TableCell>Resistência insulínica associada</TableCell>
                      <TableCell>Manganês 10mg + Cromo 500mcg + Berberina</TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: analysis['cromo']?.quintil.id === 'Q1' && analysis['glicose']?.quintil.id >= 'Q4' ? '#fff3e0' : 'inherit' }}>
                      <TableCell>Cromo baixo + Glicemia alta</TableCell>
                      <TableCell>Dificuldade sinalização insulínica</TableCell>
                      <TableCell>Picolinato cromo 500mcg 2x/dia + Canela 3g + Gymnema 800mg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cromo baixo + Resistência insulínica</TableCell>
                      <TableCell>Comprometimento metabolismo glicose</TableCell>
                      <TableCell>Cromo 500mcg 2x/dia + Berberina 500mg 3x/dia + ALA</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cromo baixo + Aumento peso central</TableCell>
                      <TableCell>Perfil síndrome metabólica</TableCell>
                      <TableCell>Cromo + Berberina + Dieta low-carb + Musculação</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cromo baixo + Cravings doce</TableCell>
                      <TableCell>Disfunção eixo insulina-dopamina</TableCell>
                      <TableCell>Cromo 500mcg 3x/dia + Gymnema + L-Tirosina 500mg</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>☢️ METAIS PESADOS (Chumbo, Mercúrio, Cádmio, Alumínio)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Exames Correlacionados</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Significado Clínico</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Protocolo Terapêutico</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ bgcolor: analysis['chumboUrinario']?.quintil.id === 'Q5' ? '#ffebee' : 'inherit' }}>
                      <TableCell><strong>Chumbo urinário elevado + Anemia microcítica</strong></TableCell>
                      <TableCell>Inibição síntese de heme</TableCell>
                      <TableCell>🚨 DMSA 500mg 3x/dia + Ferro + Glutationa + NAC 1200mg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Chumbo urinário elevado + Sintomas cognitivos</TableCell>
                      <TableCell>Disfunção neurológica associada</TableCell>
                      <TableCell>Quelação DMSA + NAC + Ômega-3 DHA + Fosfatidilserina</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Chumbo urinário elevado + Zinco baixo</TableCell>
                      <TableCell>Deficiência secundária à intoxicação</TableCell>
                      <TableCell>DMSA + Zinco 50mg + Vitamina C 2g 3x/dia</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Chumbo urinário elevado + ALA aumentado</TableCell>
                      <TableCell>Bloqueio metabólico clássico intoxicação</TableCell>
                      <TableCell>DMSA urgente + Glutationa IV + Cálcio 1000mg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Chumbo elevado + RDW aumentado</TableCell>
                      <TableCell>Alteração maturação hemácias</TableCell>
                      <TableCell>Quelação + Ferro + Ácido fólico + B12</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Chumbo elevado + Creatinina elevada</TableCell>
                      <TableCell>Toxicidade renal</TableCell>
                      <TableCell>DMSA + NAC + Hidratação + Monitorar TFG</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Chumbo elevado + Vitamina D baixa</TableCell>
                      <TableCell>Correlação toxicidade óssea</TableCell>
                      <TableCell>Quelação + Vitamina D 10.000 UI + Cálcio</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Chumbo elevado + Ferro sérico baixo</TableCell>
                      <TableCell>Anemia ferropriva mascarada</TableCell>
                      <TableCell>DMSA + Ferro bisglicinato + Vitamina C</TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: analysis['mercurioUrinario']?.quintil.id === 'Q5' ? '#ffebee' : 'inherit' }}>
                      <TableCell><strong>Mercúrio urinário elevado + Fadiga + Disbiose</strong></TableCell>
                      <TableCell>Toxicidade intestinal</TableCell>
                      <TableCell>🚨 DMPS + Chlorella 10g + Coentro 1000mg 3x/dia + Glutationa</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mercúrio urinário elevado + Baixa glutationa</TableCell>
                      <TableCell>Dificuldade conjugação hepática</TableCell>
                      <TableCell>Glutationa lipossomal 500mg 2x/dia + NAC 1200mg 2x/dia</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mercúrio urinário elevado + Transaminases altas</TableCell>
                      <TableCell>Sobrecarga hepática</TableCell>
                      <TableCell>DMPS + Silimarina 600mg + NAC + ALA 600mg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mercúrio urinário elevado + Imunossupressão</TableCell>
                      <TableCell>Modulação imune alterada</TableCell>
                      <TableCell>Quelação + Selênio 200mcg + Vitamina C 3g + Zinco</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mercúrio elevado + Alterações humor</TableCell>
                      <TableCell>Neurotoxicidade leve</TableCell>
                      <TableCell>DMPS + Ômega-3 DHA + 5-HTP 200mg + Fosfatidilserina</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mercúrio elevado + Creatinina elevada</TableCell>
                      <TableCell>Nefrotoxicidade incipiente</TableCell>
                      <TableCell>Quelação controlada + NAC + Hidratação + Monitorar TFG</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mercúrio elevado + T3 reverso elevado</TableCell>
                      <TableCell>Disfunção tireoidiana associada</TableCell>
                      <TableCell>DMPS + Selênio + Ashwagandha + Guggul</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cádmio urinário elevado + Microalbuminúria</TableCell>
                      <TableCell>Dano tubular renal inicial</TableCell>
                      <TableCell>Quelação + NAC + Vitamina E + Monitorar função renal</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cádmio urinário elevado + Zinco baixo</TableCell>
                      <TableCell>Competição e depleção minerais</TableCell>
                      <TableCell>Quelação + Zinco 50mg + Cálcio 1200mg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cádmio urinário elevado + Anemia microcítica</TableCell>
                      <TableCell>Toxicidade hematológica</TableCell>
                      <TableCell>Quelação + Ferro + Ácido fólico + B12</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cádmio urinário elevado + PCR alta</TableCell>
                      <TableCell>Inflamação metabólica associada</TableCell>
                      <TableCell>Quelação + Curcumina 1500mg 3x/dia + Ômega-3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Alumínio urinário elevado + Perda memória</TableCell>
                      <TableCell>Neurotoxicidade leve</TableCell>
                      <TableCell>Silício orgânico + Ômega-3 DHA + Fosfatidilserina + Magnésio</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Alumínio urinário elevado + Alterações Ca/P</TableCell>
                      <TableCell>Disfunção óssea</TableCell>
                      <TableCell>Silício + Cálcio + Vitamina D + K2 + Desferoxamina</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Alumínio urinário elevado + Fadiga crônica</TableCell>
                      <TableCell>Toxicidade mitocondrial</TableCell>
                      <TableCell>Silício + CoQ10 300mg + PQQ 40mg + ALA 600mg</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>🫘 FUNÇÃO RENAL (Creatinina, Uréia, Ácido Úrico)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Creatinina elevada + Uréia elevada</TableCell>
                      <TableCell>Comprometimento renal pré-renal ou intrínseco</TableCell>
                      <TableCell>Hidratação + NAC 1200mg 2x/dia + Encaminhar nefrologista</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Creatinina elevada + TFG reduzida</TableCell>
                      <TableCell>Disfunção glomerular progressiva</TableCell>
                      <TableCell>Encaminhar nefro + Dieta baixa proteína + NAC + Ômega-3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Creatinina baixa + Albumina baixa</TableCell>
                      <TableCell>Sarcopenia ou desnutrição proteica</TableCell>
                      <TableCell>Proteína 1.5g/kg + BCAA + Creatina 5g + Musculação</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Creatinina elevada + Ácido úrico elevado</TableCell>
                      <TableCell>Risco insuficiência renal metabólica</TableCell>
                      <TableCell>Alopurinol + Hidratação + Dieta baixa purinas</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Uréia elevada + Creatinina normal</TableCell>
                      <TableCell>Desidratação ou sangramento GI</TableCell>
                      <TableCell>Hidratação + Investigar sangramento + Eletrólitos</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Uréia baixa + Albumina baixa</TableCell>
                      <TableCell>Insuficiência hepática ou desnutrição</TableCell>
                      <TableCell>Avaliar função hepática + Proteína + BCAA</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Uréia elevada + PCR elevada</TableCell>
                      <TableCell>Inflamação sistêmica + catabolismo muscular</TableCell>
                      <TableCell>Anti-inflamatórios + Proteína + BCAA + Glutamina</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ácido úrico elevado + HOMA-IR elevado</TableCell>
                      <TableCell>Resistência insulínica + síndrome metabólica</TableCell>
                      <TableCell>Berberina 500mg 3x/dia + Alopurinol + Dieta low-carb</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ácido úrico elevado + PCR alta</TableCell>
                      <TableCell>Inflamação crônica subclínica</TableCell>
                      <TableCell>Curcumina + Ômega-3 + Cereja tart 500mg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ácido úrico baixo + Fadiga intensa</TableCell>
                      <TableCell>Estresse oxidativo severo ou deficiência purinas</TableCell>
                      <TableCell>Suporte antioxidante + Investigar xantina oxidase</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>🧬 HORMÔNIOS (ADH, Aldosterona, Renina, Angiotensina II)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>ADH elevada + Sódio baixo</TableCell>
                      <TableCell>SIADH (Síndrome secreção inapropriada ADH)</TableCell>
                      <TableCell>Restrição hídrica + Investigar causa + Sódio controlado</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ADH baixa + Sódio alto</TableCell>
                      <TableCell>Diabetes insipidus</TableCell>
                      <TableCell>Desmopressina + Hidratação + Encaminhar endócrino</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ADH elevada + Creatinina elevada</TableCell>
                      <TableCell>Insuficiência cardíaca congestiva</TableCell>
                      <TableCell>Encaminhar cardiologista + Diuréticos + IECA</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Aldosterona elevada + Potássio baixo</TableCell>
                      <TableCell>Hiperaldosteronismo primário</TableCell>
                      <TableCell>Espironolactona 100mg + Potássio + Encaminhar endócrino</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Aldosterona elevada + Sódio elevado</TableCell>
                      <TableCell>Risco hipertensão refratária</TableCell>
                      <TableCell>Espironolactona + Dieta baixa sódio + Anti-hipertensivos</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Aldosterona baixa + Hiponatremia</TableCell>
                      <TableCell>Insuficiência adrenal</TableCell>
                      <TableCell>Hidrocortisona + Fludrocortisona + Endocrinologista</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Aldosterona elevada + Renina baixa</TableCell>
                      <TableCell>Hiperaldosteronismo primário confirmado</TableCell>
                      <TableCell>Investigar adenoma adrenal + Espironolactona</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Renina elevada + Aldosterona elevada</TableCell>
                      <TableCell>Hiperatividade eixo renina-angiotensina</TableCell>
                      <TableCell>IECA ou BRA + Dieta DASH + Ômega-3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Renina elevada + Creatinina elevada</TableCell>
                      <TableCell>Disfunção renal</TableCell>
                      <TableCell>IECA + NAC + Encaminhar nefrologista</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Angiotensina II elevada + Pressão arterial elevada</TableCell>
                      <TableCell>Hipertensão renovascular</TableCell>
                      <TableCell>BRA + Magnésio 600mg + Alho 1200mg + Hibisco</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Angiotensina II elevada + Inflamação sistêmica</TableCell>
                      <TableCell>Ativação endotelial inflamatória</TableCell>
                      <TableCell>BRA + Curcumina + Ômega-3 + Resveratrol</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>🧠 MARCADORES NEUROLÓGICOS (Beta-amiloide, TAU, ApoE4, S100B, Nf-L)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow sx={{ bgcolor: analysis['betaAmiloide']?.quintil.id === 'Q1' && analysis['proteina cReativaUltrassensivel']?.quintil.id === 'Q5' ? '#f3e5f5' : 'inherit' }}>
                      <TableCell>Beta-amiloide baixo + PCR alta</TableCell>
                      <TableCell>Risco neuroinflamação crônica</TableCell>
                      <TableCell>Curcumina 1000mg 3x/dia + Ômega-3 DHA 2g + Resveratrol 500mg</TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: analysis['tau']?.quintil.id === 'Q5' && analysis['vitaminaD']?.quintil.id === 'Q1' ? '#f3e5f5' : 'inherit' }}>
                      <TableCell>TAU elevado + Vitamina D baixa</TableCell>
                      <TableCell>Relação com neurodegeneração</TableCell>
                      <TableCell>Vitamina D 10.000 UI + Ômega-3 DHA + Fosfatidilserina 300mg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>TAU elevado + Resistência insulínica (HOMA-IR alto)</TableCell>
                      <TableCell>Diabetes tipo 3 (Alzheimer resistência insulínica cerebral)</TableCell>
                      <TableCell>Berberina 500mg 3x/dia + Ômega-3 + Dieta cetogênica</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Beta-amiloide baixo + Homocisteína alta</TableCell>
                      <TableCell>Dano vascular cerebral + disfunção cognitiva</TableCell>
                      <TableCell>B12 1000mcg + Folato 5mg + B6 100mg + TMG 2g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ApoE4 + Resistência insulínica</TableCell>
                      <TableCell>Aumenta risco neurodegeneração</TableCell>
                      <TableCell>Dieta cetogênica + Berberina + Ômega-3 DHA 3g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ApoE4 + Inflamação elevada (PCR, IL-6)</TableCell>
                      <TableCell>Acelera progressão demência</TableCell>
                      <TableCell>Anti-inflamatórios potentes + Curcumina + Boswellia</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ApoE4 + Vitamina D baixa</TableCell>
                      <TableCell>Reduz proteção neurotrôfica</TableCell>
                      <TableCell>Vitamina D 10.000 UI + Magnésio + K2</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ApoE4 + Homocisteína elevada</TableCell>
                      <TableCell>Potencializa dano vascular cerebral</TableCell>
                      <TableCell>B12 + Folato + TMG + Ômega-3 DHA</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>S100B elevada + PCR elevada</TableCell>
                      <TableCell>Ativação inflamatória central aguda</TableCell>
                      <TableCell>Curcumina 2000mg 3x/dia + Ômega-3 + Resveratrol</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>S100B elevada + Cortisol alterado</TableCell>
                      <TableCell>Estresse crônico impactando neuroplasticidade</TableCell>
                      <TableCell>Ashwagandha 600mg 2x/dia + Fosfatidilserina + Magnésio</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>S100B elevada + Deficiência ômega-3</TableCell>
                      <TableCell>Perda neuroproteção antioxidante</TableCell>
                      <TableCell>Ômega-3 DHA 3g + Vitamina E 800 UI + Astaxantina</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Nf-L elevado + S100B elevado</TableCell>
                      <TableCell>Lesão ativa astrócitos e axônios</TableCell>
                      <TableCell>Neuroprotetores potentes + Lion's Mane 3g + Ômega-3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Nf-L elevado + TAU elevado</TableCell>
                      <TableCell>Alta correlação progressão Alzheimer</TableCell>
                      <TableCell>Protocolo Bredesen completo + Curcumina + Ômega-3 DHA</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Nf-L elevado + Baixa vitamina B12</TableCell>
                      <TableCell>Deficiência vitamínica contribui dano mielínico</TableCell>
                      <TableCell>B12 injetável 1000mcg IM semanal + Folato + B6</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Nf-L elevado + Homocisteína elevada</TableCell>
                      <TableCell>Danos vasculares e mielínicos simultâneos</TableCell>
                      <TableCell>B12 + Folato + TMG 3g + NAC + Ômega-3</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>🩺 GASTROINTESTINAL (Calprotectina, Lactoferrina, Gastrina, ASCA, ANCA)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow sx={{ bgcolor: analysis['calprotectina']?.quintil.id === 'Q5' ? '#ffebee' : 'inherit' }}>
                      <TableCell>Calprotectina elevada + Sintomas GI persistentes</TableCell>
                      <TableCell>Doença inflamatória ativa (Crohn, RCUI)</TableCell>
                      <TableCell>Encaminhar gastro + Curcumina 2000mg 3x/dia + Boswellia 800mg 3x/dia</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Calprotectina elevada + Permeabilidade intestinal aumentada</TableCell>
                      <TableCell>Risco endotoxemia metabólica</TableCell>
                      <TableCell>L-Glutamina 10g 2x/dia + Zinco carnosina 75mg + Probióticos</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Calprotectina elevada + Disbiose intestinal</TableCell>
                      <TableCell>Ativação imunológica contra disbiose</TableCell>
                      <TableCell>Probióticos 100bi UFC + Prebióticos + Butirato 1200mg 2x/dia</TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: analysis['calprotectina']?.quintil.id === 'Q5' && analysis['lactoferrina']?.quintil.id === 'Q5' ? '#ffebee' : 'inherit' }}>
                      <TableCell><strong>Lactoferrina elevada + Calprotectina elevada</strong></TableCell>
                      <TableCell>Forte suspeita DII ativa</TableCell>
                      <TableCell>🚨 Colonoscopia urgente + Curcumina 2000mg 3x/dia + Ômega-3 EPA 3g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Lactoferrina elevada + Fezes líquidas/frequentes</TableCell>
                      <TableCell>Inflamação aguda mucosa</TableCell>
                      <TableCell>Glutamina + Probióticos + Dieta baixa FODMAPs</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Lactoferrina elevada + Perda ponderal</TableCell>
                      <TableCell>Avaliar gravidade DII</TableCell>
                      <TableCell>Encaminhar gastro + Suporte nutricional + Glutamina</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gastrina elevada + Hipocloridria clínica</TableCell>
                      <TableCell>Digestão proteica deficiente, risco disbiose</TableCell>
                      <TableCell>Betaína HCl 500mg + Enzimas digestivas + Zinco</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gastrina elevada + Deficiência B12 e Ferro</TableCell>
                      <TableCell>Má absorção por baixa acidez gástrica</TableCell>
                      <TableCell>B12 sublingual 2000mcg + Ferro bisglicinato + Betaína HCl</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gastrina elevada + Uso crônico omeprazol</TableCell>
                      <TableCell>Adaptação estômago ao bloqueio ácido</TableCell>
                      <TableCell>Desmame gradual IBP + Betaína HCl + Glutamina + Zinco</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ASCA positivo + Sintomas diarréia crônica</TableCell>
                      <TableCell>Provável Crohn ileal</TableCell>
                      <TableCell>Encaminhar gastro + Curcumina + Boswellia + Ômega-3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ASCA positivo + Calprotectina aumentada</TableCell>
                      <TableCell>Inflamação ativa e dano mucoso intestinal</TableCell>
                      <TableCell>Glutamina 10g 2x/dia + Curcumina + Probióticos VSL#3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ANCA positivo + Calprotectina elevada</TableCell>
                      <TableCell>Inflamação intestinal ativa (colite)</TableCell>
                      <TableCell>Encaminhar gastro + Curcumina + Ômega-3 EPA + Butirato</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ANCA positivo + Sangue fezes</TableCell>
                      <TableCell>Diagnóstico diferencial colite ulcerativa</TableCell>
                      <TableCell>Colonoscopia + Curcumina + Boswellia + Aloe vera</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>🩸 CARDIOVASCULAR (D-dímero, Troponina, CK-MB, Mioglobina)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow sx={{ bgcolor: analysis['ddimero']?.quintil.id === 'Q5' && analysis['proteina cReativaUltrassensivel']?.quintil.id === 'Q5' ? '#ffebee' : 'inherit' }}>
                      <TableCell><strong>D-dímero elevado + PCR elevado</strong></TableCell>
                      <TableCell>🚨 Trombo-inflamação ou infecção grave</TableCell>
                      <TableCell>Encaminhar hematologista + Nattokinase 2000 FU 2x/dia + Ômega-3 4g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>D-dímero elevado + Plaquetas baixas</TableCell>
                      <TableCell>Possível CIVD (coagulação intravascular disseminada)</TableCell>
                      <TableCell>🚨 EMERGÊNCIA - UTI + Hematologista</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>D-dímero elevado + Ferritina elevada</TableCell>
                      <TableCell>Inflamação sistêmica severa</TableCell>
                      <TableCell>Investigar foco + Curcumina + Ômega-3 + Nattokinase</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>D-dímero persistentemente elevado</TableCell>
                      <TableCell>Risco sequelas vasculares pós-infecção (pós-COVID)</TableCell>
                      <TableCell>Nattokinase 4000 FU/dia + Curcumina + Ômega-3 + Natto</TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: analysis['troponinaI']?.quintil.id === 'Q5' && analysis['ckMb']?.quintil.id === 'Q5' ? '#ffebee' : 'inherit' }}>
                      <TableCell><strong>Troponina I elevada + CK-MB elevada</strong></TableCell>
                      <TableCell>🚨 INFARTO AGUDO DO MIOCÁRDIO</TableCell>
                      <TableCell>🚑 CHAMAR SAMU 192 - UTI Cardiológica - Cateterismo urgente</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Troponina I elevada + PCR elevada</TableCell>
                      <TableCell>Inflamação cardíaca (miocardite)</TableCell>
                      <TableCell>Encaminhar cardiologista + Curcumina + Ômega-3 + Repouso</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Troponina I elevada + Disfunção renal (TFG reduzida)</TableCell>
                      <TableCell>Falso positivo ou sobrecarga cardíaca</TableCell>
                      <TableCell>Repetir troponina + ECG + Avaliar função renal</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Troponina I elevada + D-dímero elevado</TableCell>
                      <TableCell>Possível trombose coronariana ou embolia</TableCell>
                      <TableCell>Cardiologista urgente + Angiografia + Anticoagulação</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Troponina T elevada + Eletrocardiograma alterado</TableCell>
                      <TableCell>Infarto agudo</TableCell>
                      <TableCell>🚨 EMERGÊNCIA - SAMU - Cateterismo</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Troponina T elevada + NT-proBNP elevado</TableCell>
                      <TableCell>Insuficiência cardíaca aguda</TableCell>
                      <TableCell>Cardiologista + Diuréticos + IECA + Carvedilol</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CK-MB elevada + CK total elevada</TableCell>
                      <TableCell>Possível rabdomiólise com lesão cardíaca</TableCell>
                      <TableCell>Hidratação IV + Bicarbonato + Monitorar mioglobina/creatinina</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mioglobina elevada + CK elevada</TableCell>
                      <TableCell>Rabdomiólise importante</TableCell>
                      <TableCell>Hidratação IV agressiva + Bicarbonato + Monitorar função renal</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mioglobina elevada + Creatinina elevada</TableCell>
                      <TableCell>Risco lesão renal aguda pós-rabdomiólise</TableCell>
                      <TableCell>UTI + Hidratação + Bicarbonato + Diálise se necessário</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>🎗️ MARCADORES TUMORAIS</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>AFP elevada + TGO/TGP alterados</TableCell>
                      <TableCell>Possível carcinoma hepatocelular</TableCell>
                      <TableCell>TC abdome + Encaminhar oncologista + Silimarina 600mg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Calcitonina elevada + Nódulo tireoidiano</TableCell>
                      <TableCell>Alto risco carcinoma medular tireoide</TableCell>
                      <TableCell>Punção PAAF + Cirurgia + Encaminhar oncologista</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>NSE elevada + Tosse crônica + Emagrecimento</TableCell>
                      <TableCell>Investigar carcinoma pulmonar pequenas células</TableCell>
                      <TableCell>TC tórax + Broncoscopia + Oncologista</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>NMP22 elevado + Hematúria</TableCell>
                      <TableCell>Alta suspeita neoplasia vesical</TableCell>
                      <TableCell>Cistoscopia urgente + Urologista + TC abdome</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PSA elevado + Densidade prostática elevada</TableCell>
                      <TableCell>Maior suspeita neoplasia</TableCell>
                      <TableCell>RNM próstata + Biópsia + Saw Palmetto 320mg 3x/dia</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tireoglobulina elevada + Anti-Tg positivo</TableCell>
                      <TableCell>Inflamação tireoidiana autoimune (Hashimoto)</TableCell>
                      <TableCell>Selênio 200mcg + Vitamina D + Dieta sem glúten</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tireoglobulina elevada pós-câncer</TableCell>
                      <TableCell>Suspeita recidiva</TableCell>
                      <TableCell>Cintilografia + PET-CT + Oncologista</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>HER2 superexpressão + Alto Ki-67</TableCell>
                      <TableCell>Tumor altamente proliferativo</TableCell>
                      <TableCell>Trastuzumab + Quimio + Curcumina IV 2000mg 3x/dia</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CA 15-3 elevado + Metástases ósseas</TableCell>
                      <TableCell>Típico câncer mama avançado</TableCell>
                      <TableCell>Oncologista + Bisfosfonatos + Protocolo Maria Rocha</TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: analysis['ca199']?.quintil.id === 'Q5' ? '#ffebee' : 'inherit' }}>
                      <TableCell><strong>CA 19-9 elevado + Icterícia</strong></TableCell>
                      <TableCell>🚨 Forte suspeita obstrução biliar por tumor</TableCell>
                      <TableCell>TC/RNM abdome urgente + Oncologista + Curcumina IV + Artemísia</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CEA elevado + Dor abdominal + Alteração hábito intestinal</TableCell>
                      <TableCell>Alerta câncer colorretal</TableCell>
                      <TableCell>Colonoscopia urgente + TC abdome + Oncologista</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CA 125 elevado + Dor pélvica</TableCell>
                      <TableCell>Possível tumor ovariano ou endometriose</TableCell>
                      <TableCell>USG transvaginal + RNM pelve + Ginecologista/Oncologista</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Beta-HCG elevado + Testículo alterado</TableCell>
                      <TableCell>Suspeita tumor germinativo</TableCell>
                      <TableCell>USG testicular + TC abdome/tórax + Urologista/Oncologista</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Beta-HCG elevado + Massa pélvica mulher</TableCell>
                      <TableCell>Doença trofoblástica gestacional</TableCell>
                      <TableCell>USG + RNM + Ginecologista/Oncologista + Quimio se necessário</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>🦠 MICROBIOTA INTESTINAL</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Índice Simpson baixo + Marcadores inflamatórios (PCR)</TableCell>
                      <TableCell>Risco inflamação crônica sistêmica</TableCell>
                      <TableCell>Probióticos 100bi UFC + Prebióticos 15g + Butirato 1200mg 2x/dia</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Índice baixo + Alergias ou doenças autoimunes</TableCell>
                      <TableCell>Perda tolerância imunológica intestinal</TableCell>
                      <TableCell>Probióticos multiespas + L-Glutamina 10g 2x/dia + Vitamina D</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Índice baixo + Permeabilidade intestinal (zonulina elevada)</TableCell>
                      <TableCell>Risco endotoxemia metabólica</TableCell>
                      <TableCell>Glutamina 10g 2x/dia + Zinco carnosina 75mg + Probióticos</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Riqueza baixa + Infecções repetição</TableCell>
                      <TableCell>Redução imunidade mucosa intestinal</TableCell>
                      <TableCell>Probióticos + IgG/IgA + Vitamina D + Zinco</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Riqueza baixa + Baixa produção butirato (SCFA)</TableCell>
                      <TableCell>Deficiência regeneração epitelial intestinal</TableCell>
                      <TableCell>Butirato sódio 1200mg 3x/dia + Prebióticos + Fibras 50g/dia</TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: analysis['razaoFirmicutesBacteroidetes']?.quintil.id === 'Q5' ? '#fff3e0' : 'inherit' }}>
                      <TableCell>F/B elevada + Aumento glicose e insulina</TableCell>
                      <TableCell>Resistência insulínica associada à disbiose</TableCell>
                      <TableCell>Berberina 500mg 3x/dia + Probióticos + Dieta low-carb</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>F/B elevada + Obesidade central</TableCell>
                      <TableCell>Microbiota obesogênica (extrai mais energia)</TableCell>
                      <TableCell>Probióticos Akkermansia + Prebióticos + Jejum intermitente</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>F/B elevada + Síndrome metabólica</TableCell>
                      <TableCell>Risco cardiovascular aumentado</TableCell>
                      <TableCell>Berberina + Probióticos + Ômega-3 3g + Dieta Mediterranean</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>SCFAs baixos + Zonulina elevada</TableCell>
                      <TableCell>Aumento permeabilidade intestinal</TableCell>
                      <TableCell>Butirato 1200mg 3x/dia + Glutamina 10g 2x/dia + Prebióticos</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>SCFAs baixos + Dislipidemia</TableCell>
                      <TableCell>Prejuízo modulação metabolismo lipídico</TableCell>
                      <TableCell>Butirato + Probióticos + Berberina 500mg 3x/dia</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Metaboloma pobre + Neurodegeneração precoce</TableCell>
                      <TableCell>Menor proteção contra radicais livres</TableCell>
                      <TableCell>Probióticos + Polifenóis + Ômega-3 DHA + Prebióticos</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Metaboloma pobre + Depressão</TableCell>
                      <TableCell>Disfunção eixo intestino-cérebro</TableCell>
                      <TableCell>Probióticos psicotrópicos + Triptofano 2g + Ômega-3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Indol/Escatol elevados + Permeabilidade intestinal</TableCell>
                      <TableCell>Risco endotoxemia (putrefação proteica)</TableCell>
                      <TableCell>Probióticos + Enzimas digestivas + Betaína HCl + Fibras</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Indol/Escatol elevados + Esteatose hepática</TableCell>
                      <TableCell>Toxinas bacterianas exacerbando disfunção hepática</TableCell>
                      <TableCell>Probióticos + Silimarina 600mg + NAC 1200mg + Butirato</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Indol/Escatol elevados + Sintomas depressivos</TableCell>
                      <TableCell>Desbalanço metabolismo triptofano</TableCell>
                      <TableCell>Probióticos + 5-HTP 200mg + Triptofano 2g + Prebióticos</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              <strong>💡 Legenda das cores:</strong><br/>
              • <span style={{ background: '#fff3e0', padding: '2px 8px' }}>Destacado em laranja</span> = Correlação detectada no paciente atual<br/>
              • <span style={{ background: '#ffebee', padding: '2px 8px' }}>Destacado em vermelho</span> = Correlação crítica detectada (requer atenção urgente)
            </Typography>
          </Alert>

          <Divider sx={{ my: 3 }} />

          {/* RELAÇÕES ENTRE EXAMES DETECTADOS */}
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#6a1b9a' }}>
            🔬 RELAÇÕES ENTRE EXAMES DETECTADOS
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Esta seção mostra automaticamente as <strong>relações funcionais</strong> entre os exames que você preencheu,
              conforme as <strong>"INTERAÇÕES ENTRE EXAMES - PADRÕES CLÍNICOS"</strong> descritas acima.
            </Typography>
          </Alert>

          {/* DETECÇÃO AUTOMÁTICA DE TODAS AS CORRELAÇÕES */}
          {(() => {
            const detectedCorrelations = detectCorrelations();
            return detectedCorrelations.length > 0 ? (
              <>
                {detectedCorrelations.map((corr, idx) => {
                  const severityConfig = {
                    emergency: { color: '#b71c1c', bgcolor: '#ffebee', chip: '🚨 EMERGÊNCIA', chipColor: 'error' },
                    critical: { color: '#d32f2f', bgcolor: '#ffebee', chip: '🚨 CRÍTICO', chipColor: 'error' },
                    warning: { color: '#f57c00', bgcolor: '#fff3e0', chip: '⚠️ ATENÇÃO', chipColor: 'warning' },
                    normal: { color: '#388e3c', bgcolor: '#e8f5e9', chip: '✅ NORMAL', chipColor: 'success' }
                  };
                  const config = severityConfig[corr.severity] || severityConfig.normal;

                  return (
                    <Card key={idx} sx={{ mb: 2, border: `2px solid ${config.color}`, bgcolor: config.bgcolor }}>
                      <CardContent>
                        <Chip label={config.chip} color={config.chipColor} sx={{ fontWeight: 700, mb: 1 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                          {corr.title}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                          {corr.description}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                          📊 {corr.values}
                        </Typography>
                        {corr.protocol && (
                          <Alert severity={corr.severity === 'emergency' || corr.severity === 'critical' ? 'error' : 'info'} sx={{ mt: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              💊 PROTOCOLO: {corr.protocol}
                            </Typography>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
                <Divider sx={{ my: 3 }} />
                <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary', fontStyle: 'italic' }}>
                  ℹ️ As correlações acima foram detectadas automaticamente com base no "Manual Prático da Anamnese Integrativa" (Luciana Caxito Lopes)
                </Typography>
              </>
            ) : (
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  ✅ Nenhuma correlação crítica detectada. Continue monitorando os exames periodicamente.
                </Typography>
              </Alert>
            );
          })()}

          {/* CARDS ESPECÍFICOS MANTIDOS PARA CASOS ESPECIAIS */}
          {analysis['hemoglobina']?.quintil.id === 'Q1' && analysis['ferritina']?.quintil.id === 'Q1' && (
            <Card sx={{ mb: 3, border: '3px solid #f44336' }}>
              <CardContent>
                <Chip label="🚨 PRIORIDADE ALTA" color="error" sx={{ fontWeight: 700, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Anemia Ferropriva</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Hemoglobina baixa + Ferritina baixa = Deficiência de ferro estabelecida
                </Typography>
                <Card sx={{ bgcolor: '#e8f5e9', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#2e7d32' }}>
                    💊 PROTOCOLO COMPLETO:
                  </Typography>
                  <List dense>
                    <ListItem><ListItemText primary="🌿 Spirulina 5g/dia + Chlorella 3g/dia" /></ListItem>
                    <ListItem><ListItemText primary="💊 Ferro bisglicinato 30-60mg + Vitamina C 500mg" /></ListItem>
                    <ListItem><ListItemText primary="🍽️ Fígado bovino 2x/semana, melado de cana, beterraba" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* PADRÃO 2: Dislipidemia */}
          {analysis['ldlColesterol']?.quintil.id === 'Q5' && analysis['hdlColesterol']?.quintil.id === 'Q1' && (
            <Card sx={{ mb: 3, border: '3px solid #ff5722' }}>
              <CardContent>
                <Chip label="🚨 ALTO RISCO CV" color="error" sx={{ fontWeight: 700, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Dislipidemia Aterogênica</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  LDL alto + HDL baixo = Risco cardiovascular aumentado em 4-5x
                </Typography>
                <Card sx={{ bgcolor: '#e8f5e9', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#2e7d32' }}>
                    💊 PROTOCOLO (Maria Rocha):
                  </Typography>
                  <List dense>
                    <ListItem><ListItemText primary="🌿 Berberina 500mg 3x/dia (igual estatina!)" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Alho envelhecido 1200mg/dia + Alcachofra 900mg/dia" /></ListItem>
                    <ListItem><ListItemText primary="💊 Ômega-3 3-4g/dia + Niacina 1000mg/dia" /></ListItem>
                    <ListItem><ListItemText primary="🍽️ Dieta Mediterranean, eliminar açúcar e trans" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* PADRÃO 3: Resistência Insulínica */}
          {analysis['glicose']?.quintil.id === 'Q4' && analysis['insulina']?.quintil.id === 'Q5' && (
            <Card sx={{ mb: 3, border: '3px solid #ff9800' }}>
              <CardContent>
                <Chip label="⚠️ PRÉ-DIABETES" color="warning" sx={{ fontWeight: 700, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Resistência Insulínica</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Glicose elevada + Insulina alta = Pré-diabetes / Síndrome Metabólica
                </Typography>
                <Card sx={{ bgcolor: '#e8f5e9', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#2e7d32' }}>
                    💊 PROTOCOLO GLICÊMICO:
                  </Typography>
                  <List dense>
                    <ListItem><ListItemText primary="🌿 Berberina 500mg 3x/dia + Canela 3g/dia + Gymnema 800mg/dia" /></ListItem>
                    <ListItem><ListItemText primary="💊 Cromo 500mcg + Magnésio 600mg + ALA 600mg/dia" /></ListItem>
                    <ListItem><ListItemText primary="🍽️ Dieta LOW-CARB + Jejum intermitente 16/8" /></ListItem>
                    <ListItem><ListItemText primary="🏃 Musculação 3-4x/semana (essencial!)" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* PADRÃO 4: PTH + Vitamina D */}
          {analysis['paratormonio']?.quintil.id === 'Q5' && analysis['vitaminaD']?.quintil.id === 'Q1' && (
            <Card sx={{ mb: 3, border: '2px solid #ff6f00' }}>
              <CardContent>
                <Chip label="⚠️ HIPERPARATIREOIDISMO SECUNDÁRIO" color="warning" sx={{ mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>PTH Elevado + Vitamina D Baixa</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>Estimulação compensatória - Deficiência de Vitamina D causando aumento do PTH</Typography>
                <Card sx={{ bgcolor: '#e8f5e9', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#2e7d32' }}>💊 PROTOCOLO:</Typography>
                  <List dense>
                    <ListItem><ListItemText primary="☀️ Vitamina D3 10.000 UI/dia por 30 dias, depois 5.000 UI manutenção" /></ListItem>
                    <ListItem><ListItemText primary="💊 Magnésio 400mg + Vitamina K2 MK7 200mcg (cofatores)" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Exposição solar 20-30min/dia (10h-14h)" /></ListItem>
                    <ListItem><ListItemText primary="📋 Reavaliar PTH e Vitamina D em 60 dias" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* PADRÃO 5: Cobre e Zinco Baixos */}
          {analysis['cobreHemacia']?.quintil.id === 'Q1' && analysis['zincoHemacia']?.quintil.id === 'Q1' && (
            <Card sx={{ mb: 3, border: '2px solid #d32f2f' }}>
              <CardContent>
                <Chip label="🚨 DISFUNÇÃO MITOCONDRIAL" color="error" sx={{ mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Cobre + Zinco Hemácia Baixos</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>Disfunção antioxidante mitocondrial - Enzimas SOD comprometidas</Typography>
                <Card sx={{ bgcolor: '#e8f5e9', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#2e7d32' }}>💊 PROTOCOLO:</Typography>
                  <List dense>
                    <ListItem><ListItemText primary="💊 Zinco quelado 30mg + Cobre glicinato 2mg (ratio 15:1)" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Suporte mitocondrial: CoQ10 200mg + PQQ 20mg + ALA 600mg" /></ListItem>
                    <ListItem><ListItemText primary="🍽️ Ostras, fígado bovino, sementes de abóbora, castanhas" /></ListItem>
                    <ListItem><ListItemText primary="⚡ Fisioquântica: Biofrequências para mitocôndrias" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* PADRÃO 6: Cobre Alto + Ferritina Alta */}
          {analysis['cobreHemacia']?.quintil.id === 'Q5' && analysis['ferritina']?.quintil.id === 'Q5' && (
            <Card sx={{ mb: 3, border: '2px solid #f57c00' }}>
              <CardContent>
                <Chip label="⚠️ INFLAMAÇÃO CRÔNICA" color="warning" sx={{ mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Cobre Hemácia Alto + Ferritina Alta</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>Inflamação crônica latente - Proteínas de fase aguda elevadas</Typography>
                <Card sx={{ bgcolor: '#e8f5e9', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#2e7d32' }}>💊 PROTOCOLO ANTI-INFLAMATÓRIO:</Typography>
                  <List dense>
                    <ListItem><ListItemText primary="🌿 Curcumina 1500mg 3x/dia + Boswellia 400mg 3x/dia" /></ListItem>
                    <ListItem><ListItemText primary="💊 Ômega-3 EPA/DHA 3g/dia + Resveratrol 500mg" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Protocolo Maria Rocha: Unha de gato 500mg 3x/dia" /></ListItem>
                    <ListItem><ListItemText primary="🔬 Investigar foco inflamatório (intestino, dental, autoimune)" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* PADRÃO 7: Magnésio Baixo + Cãibras */}
          {analysis['magnesio']?.quintil.id === 'Q1' && (
            <Card sx={{ mb: 3, border: '2px solid #7b1fa2' }}>
              <CardContent>
                <Chip label="⚠️ DEFICIÊNCIA NEUROMUSCULAR" color="warning" sx={{ mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Magnésio Baixo</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>Distúrbios na excitabilidade neuromuscular, impacto na sensibilidade insulínica e vasodilatação</Typography>
                <Card sx={{ bgcolor: '#e8f5e9', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#2e7d32' }}>💊 PROTOCOLO:</Typography>
                  <List dense>
                    <ListItem><ListItemText primary="💊 Magnésio treonato 2000mg/dia (melhor absorção cerebral)" /></ListItem>
                    <ListItem><ListItemText primary="💊 Alternativa: Magnésio dimalato 600mg + Taurina 1000mg" /></ListItem>
                    <ListItem><ListItemText primary="🍽️ Folhas verdes escuras, amêndoas, abacate, banana" /></ListItem>
                    <ListItem><ListItemText primary="🛁 Banhos com Sal de Epsom (absorção transdérmica)" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* PADRÃO 8: Selênio Baixo + T3 Reduzido */}
          {analysis['selenio']?.quintil.id === 'Q1' && analysis['t3Livre']?.quintil.id === 'Q1' && (
            <Card sx={{ mb: 3, border: '2px solid #0288d1' }}>
              <CardContent>
                <Chip label="⚠️ DISFUNÇÃO TIREOIDIANA" color="info" sx={{ mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Selênio Baixo + T3 Livre Reduzido</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>Prejuízo na conversão T4→T3 - Deiodinase dependente de selênio comprometida</Typography>
                <Card sx={{ bgcolor: '#e8f5e9', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#2e7d32' }}>💊 PROTOCOLO:</Typography>
                  <List dense>
                    <ListItem><ListItemText primary="💊 Selênio metionina 200mcg/dia (não exceder!)" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Ashwagandha 600mg 2x/dia (suporte tireoidiano)" /></ListItem>
                    <ListItem><ListItemText primary="💊 Zinco 30mg + Vitamina A 5000 UI (cofatores)" /></ListItem>
                    <ListItem><ListItemText primary="🍽️ Castanha-do-pará 2-3 unidades/dia, peixes selvagens" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* PADRÃO 9: Cromo Baixo + Glicemia Alta */}
          {analysis['cromo']?.quintil.id === 'Q1' && analysis['glicose']?.quintil.id >= 'Q4' && (
            <Card sx={{ mb: 3, border: '2px solid #e65100' }}>
              <CardContent>
                <Chip label="⚠️ RESISTÊNCIA INSULÍNICA" color="warning" sx={{ mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Cromo Baixo + Glicemia Alta</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>Dificuldade na sinalização insulínica - Cromo essencial para receptor de insulina</Typography>
                <Card sx={{ bgcolor: '#e8f5e9', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#2e7d32' }}>💊 PROTOCOLO:</Typography>
                  <List dense>
                    <ListItem><ListItemText primary="💊 Picolinato de cromo 500mcg 2x/dia (com refeições)" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Canela do Ceilão 3g/dia + Gymnema sylvestre 800mg" /></ListItem>
                    <ListItem><ListItemText primary="💊 Ácido alfa-lipóico 600mg + Biotina 5mg" /></ListItem>
                    <ListItem><ListItemText primary="🍽️ Brócolis, grãos integrais, levedo de cerveja" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* PADRÃO 10: Metais Pesados - Chumbo Alto */}
          {analysis['chumboUrinario']?.quintil.id === 'Q5' && (
            <Card sx={{ mb: 3, border: '3px solid #b71c1c' }}>
              <CardContent>
                <Chip label="🚨 INTOXICAÇÃO POR CHUMBO" color="error" sx={{ mb: 2, fontWeight: 700 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Chumbo Urinário Elevado</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>Inibição da síntese de heme, neurotoxicidade, nefrotoxicidade</Typography>
                <Card sx={{ bgcolor: '#ffebee', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#c62828' }}>🚨 PROTOCOLO URGENTE:</Typography>
                  <List dense>
                    <ListItem><ListItemText primary="⚕️ DMSA 500mg 3x/dia por 3 dias (quelante prescrito)" /></ListItem>
                    <ListItem><ListItemText primary="💊 Glutationa lipossomal 500mg 2x/dia + NAC 1200mg 2x/dia" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Chlorella 5g/dia + Coentro 500mg 3x/dia (quelação natural)" /></ListItem>
                    <ListItem><ListItemText primary="💊 Vitamina C 2g 3x/dia + Zinco 50mg + Cálcio 1000mg" /></ListItem>
                    <ListItem><ListItemText primary="🔬 Investigar fonte de exposição (água, tinta, ocupação)" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* PADRÃO 11: Mercúrio Elevado */}
          {analysis['mercurioUrinario']?.quintil.id === 'Q5' && (
            <Card sx={{ mb: 3, border: '3px solid #880e4f' }}>
              <CardContent>
                <Chip label="🚨 INTOXICAÇÃO POR MERCÚRIO" color="error" sx={{ mb: 2, fontWeight: 700 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Mercúrio Urinário Elevado</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>Toxicidade intestinal, neurotoxicidade, sobrecarga hepática</Typography>
                <Card sx={{ bgcolor: '#ffebee', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#c62828' }}>🚨 PROTOCOLO DETOX:</Typography>
                  <List dense>
                    <ListItem><ListItemText primary="⚕️ DMPS injetável (protocolo médico especializado)" /></ListItem>
                    <ListItem><ListItemText primary="💊 Glutationa IV 2000mg 3x/semana + Ácido alfa-lipóico 600mg" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Chlorella 10g/dia + Coentro 1000mg 3x/dia" /></ListItem>
                    <ListItem><ListItemText primary="💊 Selênio 200mcg + Vitamina E 800 UI + Vitamina C 3g/dia" /></ListItem>
                    <ListItem><ListItemText primary="🦷 Remover amálgamas dentárias (com proteção adequada)" /></ListItem>
                    <ListItem><ListItemText primary="🍽️ Evitar peixes grandes (atum, peixe-espada, cação)" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* PADRÃO 12: D-dímero + PCR Elevados */}
          {analysis['ddimero']?.quintil.id === 'Q5' && analysis['proteina cReativaUltrassensivel']?.quintil.id === 'Q5' && (
            <Card sx={{ mb: 3, border: '3px solid #c62828' }}>
              <CardContent>
                <Chip label="🚨 TROMBO-INFLAMAÇÃO" color="error" sx={{ mb: 2, fontWeight: 700 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>D-dímero + PCR Elevados</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>Risco trombótico + Inflamação sistêmica severa</Typography>
                <Card sx={{ bgcolor: '#ffebee', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#c62828' }}>🚨 PROTOCOLO URGENTE:</Typography>
                  <List dense>
                    <ListItem><ListItemText primary="⚕️ ENCAMINHAR HEMATOLOGISTA - Risco de TEP/TVP" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Nattokinase 2000 FU 2x/dia (fibrinolítico natural)" /></ListItem>
                    <ListItem><ListItemText primary="💊 Ômega-3 4g/dia + Curcumina 2000mg 3x/dia" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Protocolo Maria Rocha: Ginkgo biloba 240mg + Alho 1200mg" /></ListItem>
                    <ListItem><ListItemText primary="🏃 Movimentação ativa - evitar imobilização prolongada" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* PADRÃO 13: Troponina + CK-MB Elevadas */}
          {analysis['troponinaI']?.quintil.id === 'Q5' && analysis['ckMb']?.quintil.id === 'Q5' && (
            <Card sx={{ mb: 3, border: '4px solid #d32f2f' }}>
              <CardContent>
                <Chip label="🚨 EMERGÊNCIA - IAM" color="error" sx={{ mb: 2, fontWeight: 700, fontSize: '1.1rem' }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#d32f2f' }}>INFARTO AGUDO DO MIOCÁRDIO</Typography>
                <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                  Troponina I + CK-MB elevadas = Lesão miocárdica aguda confirmada
                </Typography>
                <Card sx={{ bgcolor: '#ffebee', p: 2, border: '2px solid #f44336' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#d32f2f', fontSize: '1.1rem' }}>
                    🚨 AÇÃO IMEDIATA:
                  </Typography>
                  <List dense>
                    <ListItem><ListItemText primary="🚑 CHAMAR SAMU 192 - EMERGÊNCIA CARDIOLÓGICA" primaryTypographyProps={{ fontWeight: 700, color: '#d32f2f' }} /></ListItem>
                    <ListItem><ListItemText primary="🏥 UTI Cardiológica - Cateterismo urgente" primaryTypographyProps={{ fontWeight: 700 }} /></ListItem>
                    <ListItem><ListItemText primary="💊 AAS 300mg (mastigar) + Clopidogrel 600mg" /></ListItem>
                    <ListItem><ListItemText primary="⚕️ Heparina + Nitroglicerina sublingual" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* PADRÃO 14: Marcadores Neurológicos - Alzheimer */}
          {analysis['betaAmiloide']?.quintil.id === 'Q1' && analysis['tau']?.quintil.id === 'Q5' && (
            <Card sx={{ mb: 3, border: '2px solid #6a1b9a' }}>
              <CardContent>
                <Chip label="🧠 RISCO NEURODEGENERATIVO" color="secondary" sx={{ mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Beta-amiloide Baixo + TAU Elevado</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>Padrão de neurodegeneração tipo Alzheimer - Acúmulo de placas e emaranhados neurofibrilares</Typography>
                <Card sx={{ bgcolor: '#f3e5f5', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#6a1b9a' }}>🧠 PROTOCOLO NEUROPROTETOR:</Typography>
                  <List dense>
                    <ListItem><ListItemText primary="💊 Ômega-3 DHA 2g/dia + Fosfolipídios (Fosfatidilserina 300mg)" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Curcumina lipossomal 1000mg 3x/dia + Resveratrol 500mg" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Lion's Mane 3g/dia + Bacopa monnieri 600mg" /></ListItem>
                    <ListItem><ListItemText primary="💊 Vitamina E 800 UI + CoQ10 400mg + PQQ 40mg" /></ListItem>
                    <ListItem><ListItemText primary="🧘 Meditação diária + Exercícios cognitivos + Sono 7-8h" /></ListItem>
                    <ListItem><ListItemText primary="⚡ Fisioquântica: Biofrequências cerebrais" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* PADRÃO 15: Calprotectina + Lactoferrina Elevadas */}
          {analysis['calprotectina']?.quintil.id === 'Q5' && analysis['lactoferrina']?.quintil.id === 'Q5' && (
            <Card sx={{ mb: 3, border: '3px solid #e64a19' }}>
              <CardContent>
                <Chip label="🚨 DOENÇA INFLAMATÓRIA INTESTINAL" color="error" sx={{ mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Calprotectina + Lactoferrina Elevadas</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>Forte suspeita de DII ativa (Crohn ou Retocolite Ulcerativa)</Typography>
                <Card sx={{ bgcolor: '#ffebee', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#c62828' }}>💊 PROTOCOLO ANTI-INFLAMATÓRIO INTESTINAL:</Typography>
                  <List dense>
                    <ListItem><ListItemText primary="🔬 ENCAMINHAR GASTROENTEROLOGISTA - Colonoscopia urgente" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Curcumina 2000mg 3x/dia + Boswellia 800mg 3x/dia" /></ListItem>
                    <ListItem><ListItemText primary="💊 L-Glutamina 10g 2x/dia + Zinco carnosina 75mg" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Aloe vera 200ml/dia + Slippery elm 1500mg" /></ListItem>
                    <ListItem><ListItemText primary="💊 Ômega-3 EPA 3g/dia + Vitamina D 10.000 UI" /></ListItem>
                    <ListItem><ListItemText primary="🍽️ Dieta baixa em FODMAPs + Evitar glúten e laticínios" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* PADRÃO 16: CA 19-9 Elevado + Icterícia */}
          {analysis['ca199']?.quintil.id === 'Q5' && (
            <Card sx={{ mb: 3, border: '3px solid #bf360c' }}>
              <CardContent>
                <Chip label="🚨 SUSPEITA NEOPLASIA PANCREÁTICA" color="error" sx={{ mb: 2, fontWeight: 700 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>CA 19-9 Elevado</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>Forte suspeita de obstrução biliar por tumor pancreático ou hepatobiliar</Typography>
                <Card sx={{ bgcolor: '#ffebee', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#c62828' }}>🚨 PROTOCOLO URGENTE:</Typography>
                  <List dense>
                    <ListItem><ListItemText primary="🏥 ENCAMINHAR ONCOLOGISTA - TC/RNM abdome com contraste" primaryTypographyProps={{ fontWeight: 700 }} /></ListItem>
                    <ListItem><ListItemText primary="🔬 Solicitar CEA, AFP, CA 125 (painel tumoral completo)" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Curcumina IV 2000mg 3x/dia + Artemísia annua 1000mg 3x/dia" /></ListItem>
                    <ListItem><ListItemText primary="💊 IP-6 com Inositol 6g/dia + Cogumelos medicinais 5g/dia" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Protocolo Maria Rocha anticâncer: Graviola 2000mg 3x/dia" /></ListItem>
                    <ListItem><ListItemText primary="⚡ Fisioquântica: Biofrequências antitumorais diárias" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* PADRÃO 17: Microbiota - Índice Simpson Baixo + F/B Elevado */}
          {(analysis['indiceSimpson']?.quintil.id === 'Q1' || analysis['razaoFirmicutesBacteroidetes']?.quintil.id === 'Q5') && (
            <Card sx={{ mb: 3, border: '2px solid #558b2f' }}>
              <CardContent>
                <Chip label="🦠 DISBIOSE INTESTINAL" color="warning" sx={{ mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Disbiose com Perda de Diversidade</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {analysis['indiceSimpson']?.quintil.id === 'Q1' && 'Diversidade microbiana reduzida - Risco de inflamação sistêmica'}
                  {analysis['razaoFirmicutesBacteroidetes']?.quintil.id === 'Q5' && ' + Ratio F/B elevado - Microbiota obesogênica'}
                </Typography>
                <Card sx={{ bgcolor: '#f1f8e9', p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#558b2f' }}>🦠 PROTOCOLO RESTAURAÇÃO MICROBIOTA:</Typography>
                  <List dense>
                    <ListItem><ListItemText primary="💊 Probióticos multiepas 100 bilhões UFC (Lactobacillus + Bifidobacterium + Saccharomyces)" /></ListItem>
                    <ListItem><ListItemText primary="🥬 Prebióticos: Inulina 10g + FOS 5g + Amido resistente 20g/dia" /></ListItem>
                    <ListItem><ListItemText primary="🌿 Butirato de sódio 1200mg 2x/dia + L-Glutamina 5g 2x/dia" /></ListItem>
                    <ListItem><ListItemText primary="🍽️ Dieta rica em fibras: 40-50g/dia (vegetais, leguminosas)" /></ListItem>
                    <ListItem><ListItemText primary="🥒 Alimentos fermentados: Kefir, kombucha, chucrute, kimchi" /></ListItem>
                    <ListItem><ListItemText primary="🚫 Eliminar: Açúcar, ultraprocessados, antibióticos desnecessários" /></ListItem>
                  </List>
                </Card>
              </CardContent>
            </Card>
          )}

          {/* RESUMO DE CORRELAÇÕES ADICIONAIS */}
          {(() => {
            // Verificar se há correlações para cada categoria
            const hasMinerais = analysis['paratormonio']?.quintil.id === 'Q5' || 
                               analysis['cobreHemacia']?.quintil.id === 'Q1' || 
                               analysis['manganes']?.quintil.id === 'Q1' || 
                               analysis['cromourinario']?.quintil.id === 'Q5';
            
            const hasFuncaoRenal = (analysis['creatinina']?.quintil.id === 'Q5' && analysis['ureia']?.quintil.id === 'Q5') ||
                                  (analysis['acidoUrico']?.quintil.id === 'Q5' && analysis['creatinina']?.quintil.id === 'Q5') ||
                                  (analysis['albumina']?.quintil.id === 'Q1' && analysis['creatinina']?.quintil.id === 'Q1');
            
            const hasHormonios = (analysis['aldosterona']?.quintil.id === 'Q5' && analysis['potassio']?.quintil.id === 'Q1') ||
                                (analysis['renina']?.quintil.id === 'Q5' && analysis['aldosterona']?.quintil.id === 'Q5') ||
                                analysis['gastrina']?.quintil.id === 'Q5';
            
            const hasMarcadoresTumorais = analysis['afp']?.quintil.id === 'Q5' ||
                                         analysis['calcitonina']?.quintil.id === 'Q5' ||
                                         analysis['nse']?.quintil.id === 'Q5' ||
                                         analysis['ca125']?.quintil.id === 'Q5';
            
            const hasAnyCorrelation = hasMinerais || hasFuncaoRenal || hasHormonios || hasMarcadoresTumorais;
            
            if (!hasAnyCorrelation) return null;
            
            return (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#6a1b9a' }}>
                  📊 CORRELAÇÕES FUNCIONAIS DETECTADAS
                </Typography>
                <Grid container spacing={2}>
                  {/* Minerais - só mostra se houver correlações */}
                  {hasMinerais && (
                    <Grid item xs={12} md={6}>
                      <Card sx={{ bgcolor: '#e3f2fd', p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>⚗️ MINERAIS E METAIS</Typography>
                        <List dense>
                          {analysis['paratormonio']?.quintil.id === 'Q5' && analysis['calcio']?.valor && (
                            <ListItem><ListItemText primary="• PTH alto + Cálcio normal + Fadiga = Hiperparatireoidismo subclínico" /></ListItem>
                          )}
                          {analysis['cobreHemacia']?.quintil.id === 'Q1' && (
                            <ListItem><ListItemText primary="• Cobre baixo + Queda cabelo/unhas fracas = Deficiência estrutural" /></ListItem>
                          )}
                          {analysis['manganes']?.quintil.id === 'Q1' && (
                            <ListItem><ListItemText primary="• Manganês baixo = Prejuízo metabolismo energético + Osteopenia" /></ListItem>
                          )}
                          {analysis['cromourinario']?.quintil.id === 'Q5' && (
                            <ListItem><ListItemText primary="• Cromo urinário elevado = Suplementação adequada ou eliminação transitória" /></ListItem>
                          )}
                        </List>
                      </Card>
                    </Grid>
                  )}

                  {/* Função Renal - só mostra se houver correlações */}
                  {hasFuncaoRenal && (
                    <Grid item xs={12} md={6}>
                      <Card sx={{ bgcolor: '#fff3e0', p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>🫘 FUNÇÃO RENAL</Typography>
                        <List dense>
                          {analysis['creatinina']?.quintil.id === 'Q5' && analysis['ureia']?.quintil.id === 'Q5' && (
                            <ListItem><ListItemText primary="• Creatinina + Uréia elevadas = Comprometimento renal ou desidratação" /></ListItem>
                          )}
                          {analysis['acidoUrico']?.quintil.id === 'Q5' && analysis['creatinina']?.quintil.id === 'Q5' && (
                            <ListItem><ListItemText primary="• Ácido úrico + Creatinina altos = Nefropatia gotosa" /></ListItem>
                          )}
                          {analysis['albumina']?.quintil.id === 'Q1' && analysis['creatinina']?.quintil.id === 'Q1' && (
                            <ListItem><ListItemText primary="• Creatinina + Albumina baixas = Sarcopenia ou desnutrição proteica" /></ListItem>
                          )}
                        </List>
                      </Card>
                    </Grid>
                  )}

                  {/* Hormônios - só mostra se houver correlações */}
                  {hasHormonios && (
                    <Grid item xs={12} md={6}>
                      <Card sx={{ bgcolor: '#f3e5f5', p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>🧬 HORMÔNIOS</Typography>
                        <List dense>
                          {analysis['aldosterona']?.quintil.id === 'Q5' && analysis['potassio']?.quintil.id === 'Q1' && (
                            <ListItem><ListItemText primary="• Aldosterona alta + Potássio baixo = Hiperaldosteronismo primário" /></ListItem>
                          )}
                          {analysis['renina']?.quintil.id === 'Q5' && analysis['aldosterona']?.quintil.id === 'Q5' && (
                            <ListItem><ListItemText primary="• Renina + Aldosterona elevadas = Hiperatividade eixo RAA" /></ListItem>
                          )}
                          {analysis['gastrina']?.quintil.id === 'Q5' && (
                            <ListItem><ListItemText primary="• Gastrina elevada = Hipocloridria, má absorção B12/Ferro" /></ListItem>
                          )}
                        </List>
                      </Card>
                    </Grid>
                  )}

                  {/* Marcadores Tumorais - só mostra se houver correlações */}
                  {hasMarcadoresTumorais && (
                    <Grid item xs={12} md={6}>
                      <Card sx={{ bgcolor: '#ffebee', p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>🎗️ MARCADORES TUMORAIS</Typography>
                        <List dense>
                          {analysis['afp']?.quintil.id === 'Q5' && (
                            <ListItem><ListItemText primary="• AFP elevada + TGO/TGP alterados = Suspeita carcinoma hepatocelular" /></ListItem>
                          )}
                          {analysis['calcitonina']?.quintil.id === 'Q5' && (
                            <ListItem><ListItemText primary="• Calcitonina elevada + Nódulo tireoidiano = Alto risco carcinoma medular" /></ListItem>
                          )}
                          {analysis['nse']?.quintil.id === 'Q5' && (
                            <ListItem><ListItemText primary="• NSE elevado = Investigar carcinoma pulmonar pequenas células" /></ListItem>
                          )}
                          {analysis['ca125']?.quintil.id === 'Q5' && (
                            <ListItem><ListItemText primary="• CA 125 elevado + Dor pélvica = Suspeita tumor ovariano" /></ListItem>
                          )}
                        </List>
                      </Card>
                    </Grid>
                  )}
                </Grid>

                <Alert severity="info" sx={{ mt: 3 }}>
                  <Typography variant="body2">
                    <strong>📚 Fonte:</strong> Correlações baseadas no documento "4 da página 242 à 424.docx" - 
                    Medicina Funcional Integrativa com protocolos de Fitoterápicos, Maria Rocha, Suplementação Ortomolecular e Fisioquântica.
                  </Typography>
                </Alert>
              </>
            );
          })()}
        </Paper>
      )}

      {/* PROTOCOLOS COMPLETOS DE TRATAMENTO */}
      {Object.keys(analysis).length > 0 && (() => {
        const criticalExams = Object.entries(analysis).filter(([key, data]) => 
          data?.quintil?.id === 'Q1' || data?.quintil?.id === 'Q5'
        );
        
        if (criticalExams.length === 0) return null;
        
        return (
          <Paper sx={{ p: 3, mb: 3, bgcolor: '#f3e5f5' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#6a1b9a' }}>
              💊 PROTOCOLOS COMPLETOS DE TRATAMENTO
            </Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                Protocolos integradores baseados em <strong>Medicina Funcional</strong> para os exames alterados detectados.
                Sempre consulte um profissional habilitado antes de iniciar qualquer tratamento.
              </Typography>
            </Alert>

            {criticalExams.map(([examKey, examData], idx) => {
              const exam = LABORATORY_EXAMS_COMPLETE[examKey];
              if (!exam || !examData.interpretacao) return null;
              
              const interp = examData.interpretacao;
              const isLow = examData.quintil.id === 'Q1';
              const isHigh = examData.quintil.id === 'Q5';
              
              return (
                <Card key={idx} sx={{ mb: 2, border: '2px solid #9c27b0' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Chip 
                        label={examData.quintil.nivel} 
                        sx={{ bgcolor: examData.quintil.cor, color: 'white', mr: 2 }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {exam.nome}
                      </Typography>
                    </Box>
                    
                    {exam.funcao && (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="body2">
                          <strong>📌 Para que serve:</strong> {exam.funcao}
                        </Typography>
                      </Alert>
                    )}

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: '#d32f2f' }}>
                      📋 Interpretação Clínica:
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {interp.significado}
                    </Typography>

                    {interp.causas && interp.causas.length > 0 && (
                      <>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                          🔍 Possíveis Causas:
                        </Typography>
                        <List dense>
                          {interp.causas.map((causa, i) => (
                            <ListItem key={i}>
                              <ListItemText primary={`• ${causa}`} />
                            </ListItem>
                          ))}
                        </List>
                      </>
                    )}

                    {interp.sintomas && interp.sintomas.length > 0 && (
                      <>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                          🩺 Sintomas Associados:
                        </Typography>
                        <List dense>
                          {interp.sintomas.map((sintoma, i) => (
                            <ListItem key={i}>
                              <ListItemText primary={`• ${sintoma}`} />
                            </ListItem>
                          ))}
                        </List>
                      </>
                    )}

                    {interp.orientacoes && interp.orientacoes.length > 0 && (
                      <Alert severity="success" sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                          💊 PROTOCOLO DE TRATAMENTO:
                        </Typography>
                        <List dense>
                          {interp.orientacoes.map((orient, i) => (
                            <ListItem key={i}>
                              <ListItemText primary={`${i + 1}. ${orient}`} />
                            </ListItem>
                          ))}
                        </List>
                      </Alert>
                    )}

                    {interp.investigar && interp.investigar.length > 0 && (
                      <Alert severity="warning" sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                          🔬 EXAMES COMPLEMENTARES RECOMENDADOS:
                        </Typography>
                        <List dense>
                          {interp.investigar.map((inv, i) => (
                            <ListItem key={i}>
                              <ListItemText primary={`• ${inv}`} />
                            </ListItem>
                          ))}
                        </List>
                      </Alert>
                    )}

                    {interp.urgente && (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                          ⚠️ ATENÇÃO: Este resultado requer avaliação médica URGENTE!
                        </Typography>
                      </Alert>
                    )}

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="caption" sx={{ display: 'block', color: '#666' }}>
                      <strong>Valor encontrado:</strong> {results[examKey]} {exam.unidade} | 
                      <strong> Ideal funcional:</strong> {exam.ideal?.geral || exam.ideal?.homem || exam.ideal?.mulher} {exam.unidade}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}

            <Alert severity="warning" sx={{ mt: 3 }}>
              <Typography variant="body2">
                <strong>⚠️ IMPORTANTE:</strong> Estes protocolos são baseados em <strong>Medicina Funcional Integrativa</strong> 
                (Livro: "Guia dos Exames Laboratoriais" - Luciana Caxito Lopes). 
                Devem ser interpretados por profissional habilitado. 
                <strong>NÃO substitui consulta médica.</strong>
              </Typography>
            </Alert>
          </Paper>
        );
      })()}

      {hasLinkedPatient && (
        <Paper className="no-print" sx={{ p: 3, mb: 3, bgcolor: '#e8f5e9', border: '1px solid #a5d6a7' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            📄 Gerador de Receituário e Relatório
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Ao finalizar os exames, gere o receituário terapêutico e o relatório sumário completo dos problemas.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(`/prescription/${activePatientId}`)}
            >
              Gerar Receituário
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(`/clinical-report/${activePatientId}`)}
            >
              Relatório Sumário Completo dos Problemas
            </Button>
          </Box>
        </Paper>
      )}

      {/* RODAPÉ */}
      <Paper sx={{ p: 3, bgcolor: '#fff9c4' }}>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          <strong>⚠️ Importante:</strong> Esta análise é baseada em medicina funcional integrativa e deve ser 
          interpretada por profissional habilitado. Os valores ideais podem variar conforme contexto clínico 
          individual. Sempre consulte um médico ou nutricionista para interpretação completa e conduta terapêutica.
        </Typography>
      </Paper>

      {/* RODAPÉ DE IMPRESSÃO */}
      <Box className="print-only" sx={{ mt: 4 }}>
        <PrescriptionFooter />
      </Box>

      {/* DIÁLOGO DE HISTÓRICO */}
      <Dialog 
        open={showHistoryDialog} 
        onClose={() => setShowHistoryDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TimelineIcon />
            <Typography variant="h6">Histórico de Exames</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {examHistory.length === 0 ? (
            <Alert severity="info">
              Nenhum histórico de exames encontrado. Salve os exames atuais para começar o histórico.
            </Alert>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Paciente</strong></TableCell>
                    <TableCell><strong>Idade/Sexo</strong></TableCell>
                    <TableCell><strong>Data do Exame</strong></TableCell>
                    <TableCell><strong>Data da Consulta</strong></TableCell>
                    <TableCell><strong>Exames</strong></TableCell>
                    <TableCell><strong>Críticos</strong></TableCell>
                    <TableCell><strong>Comparação</strong></TableCell>
                    <TableCell><strong>Ações</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {examHistory.map((entry, index) => {
                    const totalExams = Object.keys(entry.results || {}).filter(k => entry.results[k]).length;
                    const criticalCount = Object.values(entry.analysis || {}).filter(
                      a => a.quintil?.id === 'Q1' || a.quintil?.id === 'Q5'
                    ).length;
                    const previousEntry = examHistory[index + 1] || null;
                    const comparison = previousEntry
                      ? calculateAutomaticComparison(entry.analysis || {}, previousEntry.analysis || {})
                      : null;
                    const comparisonColor = comparison
                      ? comparison.worsened > comparison.improved
                        ? 'warning'
                        : comparison.improved > comparison.worsened
                          ? 'success'
                          : 'default'
                      : 'default';
                    
                    return (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {entry.patientData?.nome || 'Não informado'}
                          </Typography>
                          {index === 0 && <Chip label="Atual" size="small" color="primary" sx={{ mt: 0.5 }} />}
                          {editingHistoryId === entry.id && (
                            <Chip label="Em edição" size="small" color="warning" sx={{ mt: 0.5, ml: 0.5 }} />
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" display="block">
                            {entry.patientData?.idade ? `${entry.patientData.idade} anos` : '-'}
                          </Typography>
                          <Typography variant="caption" display="block">
                            {entry.patientData?.sexo || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>{new Date(entry.dataExame).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{new Date(entry.dataConsulta).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                          <Chip label={`${totalExams} exames`} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          {criticalCount > 0 ? (
                            <Chip label={`${criticalCount} crítico(s)`} color="error" size="small" />
                          ) : (
                            <Chip label="0" color="success" size="small" />
                          )}
                        </TableCell>
                        <TableCell>
                          {comparison && comparison.totalCompared > 0 ? (
                            <Box>
                              <Chip
                                label={`↑ ${comparison.improved} • ↓ ${comparison.worsened} • = ${comparison.stable}`}
                                size="small"
                                color={comparisonColor}
                                variant="outlined"
                              />
                              <Typography variant="caption" display="block" color="text.secondary">
                                vs exame anterior
                              </Typography>
                            </Box>
                          ) : (
                            <Typography variant="caption" color="text.secondary">-</Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button 
                              size="small"
                              variant="outlined"
                              onClick={() => loadHistoryEntry(entry, false)}
                            >
                              Visualizar
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              color="warning"
                              startIcon={<EditIcon fontSize="small" />}
                              onClick={() => loadHistoryEntry(entry, true)}
                            >
                              Editar
                            </Button>
                            <Tooltip title="Excluir este histórico">
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => {
                                  setItemToDelete(entry);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowHistoryDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* DIÁLOGO DE CONFIRMAÇÃO DE EXCLUSÃO */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DeleteIcon color="error" />
            <Typography variant="h6">Confirmar Exclusão</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Tem certeza que deseja excluir este histórico de exames?
          </Alert>
          {itemToDelete && (
            <Box>
              <Typography variant="body2"><strong>Paciente:</strong> {itemToDelete.patientData?.nome || 'Não informado'}</Typography>
              <Typography variant="body2"><strong>Data do Exame:</strong> {new Date(itemToDelete.dataExame).toLocaleDateString('pt-BR')}</Typography>
              <Typography variant="body2"><strong>Total de Exames:</strong> {Object.keys(itemToDelete.results || {}).filter(k => itemToDelete.results[k]).length}</Typography>
            </Box>
          )}
          <Alert severity="error" sx={{ mt: 2 }}>
            <Typography variant="body2"><strong>⚠️ ATENÇÃO:</strong> Esta ação não pode ser desfeita!</Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={() => {
              if (itemToDelete) {
                const updatedHistory = examHistory.filter(entry => entry.id !== itemToDelete.id);
                setExamHistory(updatedHistory);
                if (itemToDelete.id === editingHistoryId) {
                  setEditingHistoryId(null);
                }
                
                // Salvar no localStorage correto
                if (!activePatientId) {
                  // Modo standalone - atualizar laboratoryExamsStandalone
                  const standalone = JSON.parse(localStorage.getItem('laboratoryExamsStandalone') || '{}');
                  standalone.history = updatedHistory;
                  localStorage.setItem('laboratoryExamsStandalone', JSON.stringify(standalone));
                } else {
                  // Modo com paciente - atualizar anamneses
                  const saved = JSON.parse(localStorage.getItem('anamneses') || '[]');
                  const index = saved.findIndex((x) => String(x.id) === String(activePatientId));
                  if (index !== -1) {
                    if (!saved[index].laboratoryExamsComplete) {
                      saved[index].laboratoryExamsComplete = {};
                    }
                    saved[index].laboratoryExamsComplete.history = updatedHistory;
                    localStorage.setItem('anamneses', JSON.stringify(saved));
                  }
                }
                
                setDeleteDialogOpen(false);
                setItemToDelete(null);
              }
            }}
          >
            Excluir Definitivamente
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
