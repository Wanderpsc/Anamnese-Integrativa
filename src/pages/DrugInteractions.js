import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  TextField,
  Autocomplete,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl } from '../components/PrintTemplate';
import PrescriptionHeader from '../components/PrescriptionHeader';
import { DRUG_DEPLETIONS } from '../data/drugDepletionsData';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// Base de dados de interações medicamentosas
const DRUG_DATABASE = {
  // AAS
  'Ácido Acetilsalicílico (AAS)': {
    category: 'Anti-inflamatório/Antiagregante plaquetário',
    examples: ['AAS', 'Aspirina', 'Somalgin'],
    dosage: '100-500mg/dia',
    posology: 'Via oral, 1x ao dia (prevenção cardiovascular) ou a cada 4-6h (analgésico)',
    indications: ['Prevenção de eventos cardiovasculares', 'Antiagregação plaquetária', 'Dor leve a moderada', 'Febre', 'Artrite'],
    contraindications: ['Úlcera péptica ativa', 'Hemofilia', 'Dengue', 'Crianças com varicela (Síndrome de Reye)', 'Alergia a AINEs'],
    depletions: [
      { nutrient: 'Vitamina C', level: 'Alta', effect: 'negative', description: 'Aumento da excreção urinária' },
      { nutrient: 'Ácido fólico', level: 'Moderada', effect: 'negative', description: 'Interferência na absorção' },
      { nutrient: 'Ferro', level: 'Alta', effect: 'negative', description: 'Microhemorragias gastrointestinais' },
      { nutrient: 'Vitamina K', level: 'Moderada', effect: 'negative', description: 'Efeito anticoagulante' },
      { nutrient: 'Potássio', level: 'Leve', effect: 'negative', description: 'Aumento da excreção' },
      { nutrient: 'Zinco', level: 'Leve', effect: 'negative', description: 'Perda gastrointestinal' },
    ],
    interactions: [
      { type: 'Varfarina', effect: 'AUMENTA RISCO DE SANGRAMENTO - monitorar INR' },
      { type: 'Outros anticoagulantes', effect: 'Potencializa efeito anticoagulante' },
      { type: 'Álcool', effect: 'Aumenta risco de sangramento gastrointestinal' },
      { type: 'Corticoides', effect: 'Aumenta risco de úlcera gástrica' },
      { type: 'Vitamina E', effect: 'Aumenta risco de sangramento em altas doses' },
      { type: 'Ômega-3', effect: 'Potencializa efeito anticoagulante' },
    ],
    recommendations: [
      'Vitamina C 500-1000mg/dia',
      'Ácido fólico 400-800mcg/dia',
      'Ferro quelado se anemia',
      'Probióticos para proteção gástrica',
      'Tomar com alimento para reduzir irritação gástrica',
      'Evitar álcool',
      'Cuidado com suplementos anticoagulantes',
    ],
  },

  'Alendronato': {
    category: 'Bifosfonato (Osteoporose)',
    examples: ['Fosamax', 'Alendil'],
    dosage: '70mg/semana ou 10mg/dia',
    posology: 'Via oral, em jejum, 30min antes do café, com água. Permanecer em pé/sentado por 30min',
    indications: ['Osteoporose', 'Prevenção de fraturas', 'Doença de Paget'],
    contraindications: ['Hipocalcemia', 'Estenose esofágica', 'Incapacidade de permanecer em pé por 30min', 'Insuficiência renal grave'],
    depletions: [
      { nutrient: 'Cálcio', level: 'Alta', effect: 'negative', description: 'Quelação e interferência na absorção' },
      { nutrient: 'Magnésio', level: 'Alta', effect: 'negative', description: 'Quelação' },
      { nutrient: 'Ferro', level: 'Moderada', effect: 'negative', description: 'Quelação' },
      { nutrient: 'Vitamina D', level: 'Moderada', effect: 'negative', description: 'Necessária para otimizar efeito' },
    ],
    interactions: [
      { type: 'Cálcio suplementar', effect: 'Reduz absorção - tomar 2h de distância' },
      { type: 'Antiácidos', effect: 'Reduz absorção do bifosfonato' },
      { type: 'AINEs', effect: 'Aumenta irritação gastrointestinal' },
      { type: 'Café/chá', effect: 'Reduz absorção - aguardar 30min' },
    ],
    recommendations: [
      'Cálcio 1000-1500mg/dia (2h após dose)',
      'Vitamina D3 2000-4000 UI/dia',
      'Vitamina K2 MK-7 200mcg/dia',
      'Magnésio 400mg/dia (à noite)',
      'Tomar em jejum com água apenas',
      'Aguardar 30-60min para alimentos/suplementos',
    ],
  },

  'Alopurinol': {
    category: 'Antigotoso',
    examples: ['Zyloric', 'Alopurinol'],
    dosage: '100-300mg/dia',
    posology: 'Via oral, após refeições, dose única ou fracionada',
    indications: ['Gota', 'Hiperuricemia', 'Cálculos renais de ácido úrico', 'Quimioterapia (prevenção)'],
    contraindications: ['Crise aguda de gota (não iniciar)', 'Hipersensibilidade', 'Uso com azatioprina'],
    depletions: [
      { nutrient: 'Ferro', level: 'Moderada', effect: 'negative', description: 'Quelação e redução de absorção' },
      { nutrient: 'Vitamina B12', level: 'Leve', effect: 'negative', description: 'Interferência no metabolismo' },
      { nutrient: 'Ácido fólico', level: 'Leve', effect: 'negative', description: 'Pode reduzir níveis' },
    ],
    interactions: [
      { type: 'Vitamina C alta dose', effect: 'Pode acidificar urina e precipitar cálculos' },
      { type: 'Hidratação', effect: 'ESSENCIAL - 2-3L água/dia' },
      { type: 'Álcool', effect: 'EVITAR - aumenta ácido úrico' },
      { type: 'Azatioprina', effect: 'CONTRAINDICADO - toxicidade grave' },
    ],
    recommendations: [
      'Hidratação abundante (2-3L/dia)',
      'Ferro bisglicinato se anemia',
      'B-Complex',
      'Evitar alimentos ricos em purinas',
      'Evitar álcool completamente',
      'Cerejas/suco de cereja (efeito anti-gota)',
    ],
  },

  'Alprazolam': {
    category: 'Benzodiazepínico',
    examples: ['Frontal', 'Apraz'],
    dosage: '0,25-2mg/dia',
    posology: 'Via oral, 2-3x ao dia ou conforme necessário',
    indications: ['Ansiedade', 'Transtorno do pânico', 'Ansiedade associada à depressão'],
    contraindications: ['Miastenia gravis', 'Glaucoma de ângulo fechado', 'Insuficiência respiratória grave', 'Gravidez/lactação'],
    depletions: [
      { nutrient: 'Melatonina', level: 'Alta', effect: 'negative', description: 'Supressão da produção endógena' },
      { nutrient: 'GABA', level: 'Moderada', effect: 'negative', description: 'Downregulation de receptores' },
      { nutrient: 'Vitamina B6', level: 'Moderada', effect: 'negative', description: 'Interferência no metabolismo' },
      { nutrient: 'Magnésio', level: 'Moderada', effect: 'negative', description: 'Aumento da utilização' },
    ],
    interactions: [
      { type: 'Álcool', effect: 'CONTRAINDICADO - depressão SNC severa' },
      { type: 'Kava-kava', effect: 'Potencializa sedação' },
      { type: 'Valeriana', effect: 'Aumenta sedação' },
      { type: 'Opioides', effect: 'Risco de depressão respiratória' },
      { type: 'Dependência', effect: 'Alto risco - não suspender abruptamente' },
    ],
    recommendations: [
      'Magnésio glicinato 400mg/dia',
      'Taurina 500-1000mg/dia',
      'L-teanina 200mg/dia',
      'Ashwagandha para desmame gradual',
      'NÃO usar álcool',
      'Redução gradual obrigatória (não parar abruptamente)',
      'Considerar terapia cognitivo-comportamental',
    ],
  },

  'Amiodarona': {
    category: 'Antiarrítmico',
    examples: ['Ancoron', 'Atlansil'],
    dosage: '200-400mg/dia (manutenção)',
    posology: 'Via oral, dose única diária, preferencialmente com refeições',
    indications: ['Arritmias ventriculares graves', 'Fibrilação atrial', 'Taquicardia ventricular'],
    contraindications: ['Bradiarritmias sem marcapasso', 'Disfunção tireoidiana', 'Gestação', 'Hipersensibilidade ao iodo'],
    depletions: [
      { nutrient: 'Coenzima Q10', level: 'Muito Alta', effect: 'negative', description: 'Cardiotoxicidade mitocondrial' },
      { nutrient: 'Selênio', level: 'Alta', effect: 'negative', description: 'Interferência no metabolismo tireoidiano' },
      { nutrient: 'Vitamina E', level: 'Alta', effect: 'negative', description: 'Estresse oxidativo pulmonar' },
      { nutrient: 'L-Carnitina', level: 'Moderada', effect: 'negative', description: 'Redução da função mitocondrial' },
    ],
    interactions: [
      { type: 'Função tireoidiana', effect: 'Pode causar hipo ou hipertireoidismo' },
      { type: 'Toxicidade pulmonar', effect: 'Monitorar função pulmonar regularmente' },
      { type: 'Fotossensibilidade', effect: 'Usar protetor solar FPS 50+' },
      { type: 'Varfarina', effect: 'Potencializa efeito - ajustar dose' },
      { type: 'Toranja', effect: 'Aumenta níveis séricos' },
    ],
    recommendations: [
      'Coenzima Q10 300-400mg/dia (ESSENCIAL)',
      'Selênio 200mcg/dia',
      'Vitamina E 400 UI/dia',
      'L-Carnitina 2000mg/dia',
      'Magnésio 400-600mg/dia',
      'Protetor solar sempre',
      'Monitorar função tireoidiana (TSH) regularmente',
      'Raio-X de tórax periódico',
    ],
  },

  'Amitriptilina': {
    category: 'Antidepressivo tricíclico',
    examples: ['Tryptanol', 'Amytril'],
    dosage: '25-150mg/dia',
    posology: 'Via oral, dose única à noite',
    indications: ['Depressão', 'Dor neuropática', 'Enxaqueca profilaxia', 'Insônia', 'Fibromialgia'],
    contraindications: ['IAM recente', 'Glaucoma', 'Retenção urinária', 'Uso de IMAO'],
    depletions: [
      { nutrient: 'Coenzima Q10', level: 'Alta', effect: 'negative', description: 'Fadiga e disfunção mitocondrial' },
      { nutrient: 'Vitamina B2', level: 'Alta', effect: 'negative', description: 'Aumento da utilização' },
      { nutrient: 'Sódio', level: 'Moderada', effect: 'negative', description: 'Hiponatremia em idosos' },
      { nutrient: 'Magnésio', level: 'Moderada', effect: 'negative', description: 'Arritmias' },
    ],
    interactions: [
      { type: 'Anticolinérgico', effect: 'Boca seca, constipação, retenção urinária' },
      { type: 'Ganho de peso', effect: 'Muito comum' },
      { type: 'Sedação', effect: 'Pronunciada - tomar à noite' },
      { type: 'Álcool', effect: 'Potencializa sedação' },
      { type: 'IMAO', effect: 'CONTRAINDICADO' },
    ],
    recommendations: [
      'Coenzima Q10 200mg/dia',
      'Vitamina B2 400mg/dia',
      'B-Complex',
      'Magnésio 400mg/dia',
      'Fibras para constipação',
      'Hidratação adequada',
      'Evitar álcool',
    ],
  },

  // Anti-hipertensivos
  'Anlodipino': {
    category: 'Anti-hipertensivo (Bloqueador de canal de cálcio)',
    examples: ['Norvasc', 'Anlo'],
    dosage: '5-10mg/dia',
    posology: 'Via oral, dose única diária',
    indications: ['Hipertensão arterial', 'Angina estável', 'Angina vasoespástica'],
    contraindications: ['Hipotensão', 'Choque cardiogênico', 'Estenose aórtica grave'],
    depletions: [
      { nutrient: 'Potássio', level: 'Leve', effect: 'negative', description: 'Pode reduzir níveis séricos' },
      { nutrient: 'Vitamina D', level: 'Moderada', effect: 'negative', description: 'Interferência no metabolismo do cálcio' },
      { nutrient: 'Coenzima Q10', level: 'Moderada', effect: 'negative', description: 'Fadiga relacionada' },
    ],
    interactions: [
      { type: 'Cálcio suplementar', effect: 'Pode reduzir eficácia do medicamento' },
      { type: 'Toranja/Grapefruit', effect: 'CONTRAINDICADO - aumenta níveis séricos' },
      { type: 'Edema periférico', effect: 'Efeito colateral comum (tornozelos)' },
    ],
    recommendations: [
      'Evitar suplementos de cálcio em doses altas',
      'Vitamina D3 2000-4000 UI/dia',
      'Coenzima Q10 100-200mg/dia',
      'Evitar toranja e suco de toranja',
      'Magnésio 400mg/dia',
    ],
  },

  'Diuréticos tiazídicos': {
    category: 'Anti-hipertensivos',
    examples: ['Hidroclorotiazida', 'Clortalidona', 'Indapamida'],
    dosage: '12,5-50mg/dia',
    posology: 'Via oral, dose única pela manhã',
    indications: ['Hipertensão arterial', 'Edema', 'Insuficiência cardíaca'],
    contraindications: ['Anúria', 'Hipersensibilidade a sulfonamidas', 'Hipocalemia grave'],
    depletions: [
      { nutrient: 'Potássio', level: 'Alta', effect: 'negative', description: 'Aumenta excreção renal de potássio' },
      { nutrient: 'Magnésio', level: 'Alta', effect: 'negative', description: 'Perda urinária aumentada' },
      { nutrient: 'Zinco', level: 'Moderada', effect: 'negative', description: 'Aumento da excreção' },
      { nutrient: 'Coenzima Q10', level: 'Moderada', effect: 'negative', description: 'Redução da síntese' },
      { nutrient: 'Vitamina B1', level: 'Moderada', effect: 'negative', description: 'Aumento da excreção urinária' },
      { nutrient: 'Vitamina B6', level: 'Leve', effect: 'negative', description: 'Interferência no metabolismo' },
      { nutrient: 'Sódio', level: 'Alta', effect: 'negative', description: 'Perda aumentada (efeito terapêutico)' },
    ],
    interactions: [
      { type: 'Função renal', effect: 'Pode prejudicar em uso prolongado' },
      { type: 'Glicemia', effect: 'Pode aumentar glicose sanguínea' },
      { type: 'Ácido úrico', effect: 'Pode aumentar e precipitar gota' },
    ],
    recommendations: [
      'Suplementar potássio 99mg/dia ou aumentar consumo de alimentos ricos',
      'Magnésio quelado 400-600mg/dia',
      'Monitorar eletrólitos regularmente',
      'Coenzima Q10 100-200mg/dia',
      'Vitamina B-Complex',
    ],
  },
  'Inibidores da ECA': {
    category: 'Anti-hipertensivos',
    examples: ['Enalapril', 'Captopril', 'Lisinopril', 'Ramipril'],
    depletions: [
      { nutrient: 'Zinco', level: 'Alta', effect: 'negative', description: 'Quelação e aumento da excreção' },
      { nutrient: 'Sódio', level: 'Moderada', effect: 'negative', description: 'Retenção de potássio, perda de sódio' },
    ],
    interactions: [
      { type: 'Potássio', effect: 'PODE AUMENTAR - cuidado com suplementação' },
      { type: 'Tosse seca', effect: 'Efeito colateral comum (10-20%)' },
      { type: 'Função renal', effect: 'Monitorar creatinina' },
    ],
    recommendations: [
      'Zinco quelado 30mg/dia',
      'NÃO suplementar potássio sem orientação',
      'Monitorar função renal',
      'Considerar CoQ10 se fadiga',
    ],
  },
  'Bloqueadores dos canais de cálcio': {
    category: 'Anti-hipertensivos',
    examples: ['Anlodipino', 'Nifedipino', 'Verapamil', 'Diltiazem'],
    depletions: [
      { nutrient: 'Potássio', level: 'Leve', effect: 'negative', description: 'Pode reduzir níveis séricos' },
      { nutrient: 'Vitamina D', level: 'Moderada', effect: 'negative', description: 'Interferência no metabolismo do cálcio' },
    ],
    interactions: [
      { type: 'Cálcio suplementar', effect: 'Pode reduzir eficácia do medicamento' },
      { type: 'Toranja/Grapefruit', effect: 'CONTRAINDICADO - aumenta níveis séricos' },
      { type: 'Edema periférico', effect: 'Efeito colateral comum' },
    ],
    recommendations: [
      'Evitar suplementos de cálcio em doses altas',
      'Vitamina D3 2000-4000 UI/dia',
      'Evitar toranja e suco de toranja',
      'Coenzima Q10 para fadiga',
    ],
  },
  'Beta-bloqueadores': {
    category: 'Anti-hipertensivos',
    examples: ['Propranolol', 'Atenolol', 'Metoprolol', 'Carvedilol'],
    depletions: [
      { nutrient: 'Coenzima Q10', level: 'Alta', effect: 'negative', description: 'Bloqueio da síntese mitocondrial' },
      { nutrient: 'Melatonina', level: 'Alta', effect: 'negative', description: 'Redução da produção pineal' },
      { nutrient: 'Zinco', level: 'Moderada', effect: 'negative', description: 'Aumento da excreção' },
    ],
    interactions: [
      { type: 'Energia/Fadiga', effect: 'Comum - depleção de CoQ10' },
      { type: 'Insônia', effect: 'Comum - redução de melatonina' },
      { type: 'Glicemia', effect: 'Pode mascarar hipoglicemia' },
      { type: 'Libido', effect: 'Pode reduzir' },
    ],
    recommendations: [
      'Coenzima Q10 200-300mg/dia (ESSENCIAL)',
      'Melatonina 3-5mg antes de dormir',
      'L-Carnitina 1000mg/dia para energia',
      'Magnésio 400mg/dia',
    ],
  },

  // Estatinas
  'Estatinas': {
    category: 'Hipolipemiantes',
    examples: ['Sinvastatina', 'Atorvastatina', 'Rosuvastatina', 'Pravastatina'],
    depletions: [
      { nutrient: 'Coenzima Q10', level: 'Muito Alta', effect: 'negative', description: 'Bloqueio da via do mevalonato' },
      { nutrient: 'Vitamina K2', level: 'Alta', effect: 'negative', description: 'Interferência na síntese' },
      { nutrient: 'Vitamina D', level: 'Moderada', effect: 'negative', description: 'Redução da conversão' },
      { nutrient: 'Selênio', level: 'Moderada', effect: 'negative', description: 'Depleção progressiva' },
      { nutrient: 'Vitamina E', level: 'Leve', effect: 'negative', description: 'Redução de níveis' },
    ],
    interactions: [
      { type: 'Dor muscular/Mialgia', effect: 'Comum - depleção de CoQ10' },
      { type: 'Fadiga crônica', effect: 'Relacionada à CoQ10' },
      { type: 'Função hepática', effect: 'Monitorar enzimas (TGO/TGP)' },
      { type: 'Calcificação arterial', effect: 'Risco por depleção de K2' },
      { type: 'Diabetes', effect: 'Pode aumentar glicemia' },
    ],
    recommendations: [
      'Coenzima Q10 200-400mg/dia (OBRIGATÓRIO)',
      'Vitamina K2 MK-7 180-200mcg/dia',
      'Vitamina D3 4000-5000 UI/dia',
      'Selênio 200mcg/dia',
      'Magnésio 400mg/dia',
      'Ômega-3 2000mg/dia',
    ],
  },

  // Antidiabéticos
  'Metformina': {
    category: 'Antidiabéticos',
    examples: ['Glifage', 'Glucoformim'],
    depletions: [
      { nutrient: 'Vitamina B12', level: 'Muito Alta', effect: 'negative', description: 'Malabsorção intestinal' },
      { nutrient: 'Ácido fólico', level: 'Alta', effect: 'negative', description: 'Redução da absorção' },
      { nutrient: 'Coenzima Q10', level: 'Moderada', effect: 'negative', description: 'Interferência mitocondrial' },
      { nutrient: 'Vitamina B6', level: 'Moderada', effect: 'negative', description: 'Aumento da excreção' },
      { nutrient: 'Vitamina B1', level: 'Leve', effect: 'negative', description: 'Redução de absorção' },
    ],
    interactions: [
      { type: 'Anemia megaloblástica', effect: 'Por deficiência de B12' },
      { type: 'Neuropatia periférica', effect: 'Agravada por B12 baixa' },
      { type: 'Fadiga', effect: 'Comum por deficiências vitamínicas' },
      { type: 'Função cognitiva', effect: 'Pode ser afetada (B12)' },
    ],
    recommendations: [
      'Vitamina B12 sublingual 1000-2000mcg/dia (ESSENCIAL)',
      'Ácido fólico 800-1000mcg/dia',
      'B-Complex diariamente',
      'Coenzima Q10 100-200mg/dia',
      'Monitorar B12 sérica anualmente',
    ],
  },

  // IBP (Inibidores de Bomba de Prótons)
  'Omeprazol/IBP': {
    category: 'Antiácidos',
    examples: ['Omeprazol', 'Esomeprazol', 'Pantoprazol', 'Lansoprazol'],
    depletions: [
      { nutrient: 'Vitamina B12', level: 'Muito Alta', effect: 'negative', description: 'Necessita ácido para absorção' },
      { nutrient: 'Magnésio', level: 'Alta', effect: 'negative', description: 'Hipomagnesemia grave possível' },
      { nutrient: 'Cálcio', level: 'Alta', effect: 'negative', description: 'Redução da absorção' },
      { nutrient: 'Ferro', level: 'Alta', effect: 'negative', description: 'Necessita acidez gástrica' },
      { nutrient: 'Vitamina C', level: 'Moderada', effect: 'negative', description: 'Má absorção' },
      { nutrient: 'Zinco', level: 'Moderada', effect: 'negative', description: 'Absorção comprometida' },
      { nutrient: 'Vitamina D', level: 'Moderada', effect: 'negative', description: 'Interferência na absorção' },
    ],
    interactions: [
      { type: 'Osteoporose', effect: 'Risco aumentado (↓ Ca, Mg, D)' },
      { type: 'Fraturas ósseas', effect: 'Risco 30-40% maior' },
      { type: 'Anemia', effect: 'Por B12 e ferro baixos' },
      { type: 'Infecções intestinais', effect: 'Risco aumentado' },
      { type: 'Demência', effect: 'Associação com uso prolongado' },
    ],
    recommendations: [
      'Vitamina B12 1000mcg sublingual/dia',
      'Magnésio quelado 400-600mg/dia (IMPORTANTE)',
      'Cálcio citrato 1000mg/dia (não carbonato)',
      'Vitamina D3 4000 UI/dia',
      'Ferro bisglicinato se anemia',
      'Zinco 30mg/dia',
      'Considerar descontinuação após 8-12 semanas',
    ],
  },

  // Corticoides
  'Corticoides': {
    category: 'Anti-inflamatórios/Imunossupressores',
    examples: ['Prednisona', 'Prednisolona', 'Dexametasona', 'Hidrocortisona'],
    depletions: [
      { nutrient: 'Cálcio', level: 'Muito Alta', effect: 'negative', description: 'Aumenta excreção e reduz absorção' },
      { nutrient: 'Vitamina D', level: 'Muito Alta', effect: 'negative', description: 'Interferência no metabolismo' },
      { nutrient: 'Potássio', level: 'Alta', effect: 'negative', description: 'Aumento da excreção renal' },
      { nutrient: 'Magnésio', level: 'Alta', effect: 'negative', description: 'Perda aumentada' },
      { nutrient: 'Zinco', level: 'Alta', effect: 'negative', description: 'Redução de absorção' },
      { nutrient: 'Vitamina C', level: 'Alta', effect: 'negative', description: 'Aumento da utilização' },
      { nutrient: 'Selênio', level: 'Moderada', effect: 'negative', description: 'Depleção progressiva' },
      { nutrient: 'Vitamina A', level: 'Moderada', effect: 'negative', description: 'Redução de níveis' },
      { nutrient: 'Ácido fólico', level: 'Moderada', effect: 'negative', description: 'Interferência no metabolismo' },
    ],
    interactions: [
      { type: 'Osteoporose', effect: 'Risco muito alto' },
      { type: 'Hiperglicemia', effect: 'Resistência insulínica' },
      { type: 'Imunidade', effect: 'Supressão imunológica' },
      { type: 'Ganho de peso', effect: 'Comum' },
      { type: 'Insônia', effect: 'Muito comum' },
      { type: 'Humor', effect: 'Irritabilidade, ansiedade' },
    ],
    recommendations: [
      'Cálcio 1500mg/dia + Vitamina D3 5000 UI/dia (ESSENCIAL)',
      'Vitamina K2 MK-7 200mcg/dia',
      'Magnésio 600mg/dia',
      'Potássio (alimentar ou suplementar)',
      'Vitamina C 1000-2000mg/dia',
      'Zinco 30-50mg/dia',
      'Probióticos potentes',
      'DHEA se uso prolongado',
      'Densitometria óssea anual',
    ],
  },

  // Anticonvulsivantes
  'Anticonvulsivantes': {
    category: 'Neurológicos',
    examples: ['Fenitoína', 'Fenobarbital', 'Carbamazepina', 'Ácido valproico'],
    depletions: [
      { nutrient: 'Ácido fólico', level: 'Muito Alta', effect: 'negative', description: 'Bloqueio do metabolismo' },
      { nutrient: 'Vitamina D', level: 'Muito Alta', effect: 'negative', description: 'Aumento do catabolismo' },
      { nutrient: 'Vitamina K', level: 'Alta', effect: 'negative', description: 'Interferência na síntese' },
      { nutrient: 'Vitamina B12', level: 'Alta', effect: 'negative', description: 'Malabsorção' },
      { nutrient: 'Biotina', level: 'Alta', effect: 'negative', description: 'Inibição competitiva' },
      { nutrient: 'Cálcio', level: 'Alta', effect: 'negative', description: 'Secundário à deficiência de D' },
      { nutrient: 'Carnitina', level: 'Moderada', effect: 'negative', description: 'Redução de níveis' },
    ],
    interactions: [
      { type: 'Osteoporose', effect: 'Risco elevado' },
      { type: 'Defeitos no tubo neural', effect: 'Risco em gestantes' },
      { type: 'Anemia megaloblástica', effect: 'Por deficiência de folato' },
      { type: 'Fadiga', effect: 'Comum' },
      { type: 'Função cognitiva', effect: 'Pode ser comprometida' },
    ],
    recommendations: [
      'Ácido fólico 1-5mg/dia (dose terapêutica)',
      'Vitamina D3 4000-6000 UI/dia',
      'Vitamina K2 200mcg/dia',
      'B-Complex com B12',
      'Biotina 5-10mg/dia',
      'Cálcio 1000-1500mg/dia',
      'L-Carnitina 1000-2000mg/dia',
    ],
  },

  // Antibióticos
  'Fluoroquinolonas': {
    category: 'Antibióticos',
    examples: ['Ciprofloxacino', 'Levofloxacino', 'Norfloxacino'],
    depletions: [
      { nutrient: 'Magnésio', level: 'Alta', effect: 'negative', description: 'Quelação do medicamento' },
      { nutrient: 'Cálcio', level: 'Alta', effect: 'negative', description: 'Quelação e redução de absorção' },
      { nutrient: 'Ferro', level: 'Moderada', effect: 'negative', description: 'Quelação' },
      { nutrient: 'Zinco', level: 'Moderada', effect: 'negative', description: 'Quelação' },
      { nutrient: 'Probióticos', level: 'Muito Alta', effect: 'negative', description: 'Destruição da microbiota' },
    ],
    interactions: [
      { type: 'Tendões', effect: 'RISCO DE RUPTURA - especialmente com corticoides' },
      { type: 'Microbiota intestinal', effect: 'Disbiose severa' },
      { type: 'Neuropatia periférica', effect: 'Possível efeito permanente' },
      { type: 'Fotossensibilidade', effect: 'Aumentada' },
    ],
    recommendations: [
      'Probióticos 50-100 bilhões UFC (2h após dose)',
      'Magnésio (4h distante do antibiótico)',
      'Cálcio (4h distante do antibiótico)',
      'NÃO tomar junto com minerais',
      'Evitar sol direto',
      'Suplementar microbiota após término',
    ],
  },

  // Anticoagulantes
  'Varfarina': {
    category: 'Anticoagulantes',
    examples: ['Varfarina', 'Marevan'],
    depletions: [
      { nutrient: 'Vitamina K', level: 'Muito Alta', effect: 'negative', description: 'Antagonismo direto (mecanismo de ação)' },
    ],
    interactions: [
      { type: 'Vitamina K alimentar', effect: 'DEVE SER CONSTANTE - não evitar, mas manter regular' },
      { type: 'Suplementos', effect: 'Ômega-3, vitamina E, alho podem potencializar' },
      { type: 'INR', effect: 'Monitorar frequentemente' },
      { type: 'Sangramento', effect: 'Risco aumentado' },
    ],
    recommendations: [
      'Manter ingestão CONSTANTE de vitamina K',
      'NÃO suplementar vitamina K sem orientação',
      'Cuidado com chás e fitoterápicos',
      'Evitar altas doses de ômega-3',
      'Monitorar INR regularmente',
      'Lista de alimentos ricos em K para padronizar consumo',
    ],
  },

  // Antidepressivos
  'ISRS': {
    category: 'Antidepressivos',
    examples: ['Fluoxetina', 'Sertralina', 'Paroxetina', 'Escitalopram'],
    depletions: [
      { nutrient: 'Ácido fólico', level: 'Alta', effect: 'negative', description: 'Interferência no metabolismo' },
      { nutrient: 'Vitamina B12', level: 'Moderada', effect: 'negative', description: 'Redução de níveis' },
      { nutrient: 'Vitamina B6', level: 'Moderada', effect: 'negative', description: 'Aumento da utilização' },
      { nutrient: 'Coenzima Q10', level: 'Moderada', effect: 'negative', description: 'Fadiga associada' },
      { nutrient: 'Sódio', level: 'Moderada', effect: 'negative', description: 'Hiponatremia (principalmente em idosos)' },
    ],
    interactions: [
      { type: 'Libido', effect: 'Redução muito comum (60-70%)' },
      { type: 'Ganho de peso', effect: 'Comum (exceto fluoxetina)' },
      { type: 'Insônia/Sonolência', effect: 'Variável' },
      { type: 'Síndrome serotoninérgica', effect: 'Cuidado com 5-HTP, triptofano' },
    ],
    recommendations: [
      'Ácido metilfolato 1-5mg/dia',
      'Metilcobalamina 1000mcg/dia',
      'Vitamina B6 P5P 50mg/dia',
      'Ômega-3 EPA 2000mg/dia',
      'SAMe 400-800mg/dia (manhã)',
      'NÃO usar 5-HTP ou L-triptofano sem orientação',
      'Magnésio 400mg/dia',
    ],
  },

  // Antibióticos
  'Amoxicilina': {
    category: 'Antibiótico (Penicilina)',
    examples: ['Amoxil', 'Amoxicilina', 'Amoxil BD'],
    dosage: '500mg a cada 8h ou 875mg a cada 12h',
    posology: 'Via oral, pode ser tomado com ou sem alimento. Completar todo o ciclo prescrito',
    indications: ['Infecções bacterianas', 'Otite média', 'Sinusite', 'Faringite', 'Infecções urinárias', 'Pneumonia'],
    contraindications: ['Alergia a penicilinas', 'Mononucleose infecciosa', 'História de reação alérgica grave a betalactâmicos'],
    depletions: [
      { nutrient: 'Probióticos', level: 'Muito Alta', effect: 'negative', description: 'Destrói flora intestinal benéfica' },
      { nutrient: 'Vitamina K', level: 'Alta', effect: 'negative', description: 'Redução da síntese por bactérias intestinais' },
      { nutrient: 'Vitaminas do complexo B', level: 'Moderada', effect: 'negative', description: 'Interferência na síntese intestinal' },
      { nutrient: 'Biotina (B7)', level: 'Moderada', effect: 'negative', description: 'Redução da produção intestinal' },
    ],
    interactions: [
      { type: 'Contraceptivos orais', effect: 'Pode reduzir eficácia - usar método adicional' },
      { type: 'Probióticos', effect: 'Tomar 2-3h de distância do antibiótico' },
      { type: 'Anticoagulantes', effect: 'Pode potencializar efeito' },
      { type: 'Álcool', effect: 'Pode reduzir eficácia e aumentar efeitos colaterais' },
    ],
    recommendations: [
      'Probióticos 10-20 bilhões UFC/dia (2-3h após antibiótico)',
      'Vitamina K2 MK-7 100-200mcg/dia',
      'Complexo B durante e após tratamento',
      'Saccharomyces boulardii 250-500mg 2x/dia',
      'Continuar probióticos por 2-4 semanas após término',
      'Consumir alimentos fermentados (kefir, iogurte natural)',
      'Evitar álcool durante tratamento',
    ],
  },

  'Nitrofurantoína': {
    category: 'Antibiótico (Infecção Urinária)',
    examples: ['Macrodantina', 'Nitrofurantoína'],
    dosage: '100mg a cada 12h ou 50mg a cada 6h',
    posology: 'Via oral, com alimento ou leite para melhor absorção e reduzir náuseas',
    indications: ['Infecção urinária', 'Cistite', 'Profilaxia de ITU recorrente'],
    contraindications: ['Insuficiência renal (ClCr <60ml/min)', 'Gravidez no termo', 'Deficiência de G6PD', 'Lactentes <1 mês'],
    depletions: [
      { nutrient: 'Magnésio', level: 'Alta', effect: 'negative', description: 'Quelação e aumento da excreção' },
      { nutrient: 'Ácido fólico', level: 'Alta', effect: 'negative', description: 'Interferência no metabolismo' },
      { nutrient: 'Vitaminas do complexo B', level: 'Moderada', effect: 'negative', description: 'Especialmente B1, B2, B6' },
      { nutrient: 'Probióticos', level: 'Alta', effect: 'negative', description: 'Alteração da flora intestinal' },
      { nutrient: 'Vitamina K', level: 'Moderada', effect: 'negative', description: 'Redução da síntese intestinal' },
    ],
    interactions: [
      { type: 'Magnésio (antiácidos)', effect: 'Reduz absorção - tomar com 2-3h de distância' },
      { type: 'Função hepática', effect: 'Monitorar - risco de hepatotoxicidade' },
      { type: 'Função pulmonar', effect: 'Risco de fibrose pulmonar em uso prolongado' },
      { type: 'Probióticos', effect: 'Tomar separado por 2-3h' },
    ],
    recommendations: [
      'Magnésio quelado 400mg/dia (longe da medicação)',
      'Ácido fólico 400-800mcg/dia',
      'Complexo B de alta potência',
      'Probióticos específicos para ITU (2-3h após)',
      'D-Manose 2g/dia (prevenção)',
      'Cranberry 500mg 2x/dia',
      'Tomar com alimento para melhor tolerância',
      'Monitorar função hepática em uso prolongado',
    ],
  },

  'Noripurum (Ferro Sacarato)': {
    category: 'Suplemento de Ferro',
    examples: ['Noripurum', 'Ferro sacarato', 'Ferro polimaltosado'],
    dosage: '100-200mg de ferro elementar/dia',
    posology: 'Via oral, preferencialmente em jejum ou antes das refeições. Se houver intolerância, tomar com alimento',
    indications: ['Anemia ferropriva', 'Deficiência de ferro', 'Gravidez', 'Perda sanguínea crônica'],
    contraindications: ['Hemocromatose', 'Hemossiderose', 'Talassemia', 'Anemia hemolítica', 'Úlcera péptica ativa'],
    depletions: [
      { nutrient: 'Zinco', level: 'Alta', effect: 'negative', description: 'Competição pela absorção intestinal' },
      { nutrient: 'Cobre', level: 'Moderada', effect: 'negative', description: 'Interferência na absorção' },
      { nutrient: 'Cálcio', level: 'Alta', effect: 'negative', description: 'Competição pela absorção' },
      { nutrient: 'Magnésio', level: 'Moderada', effect: 'negative', description: 'Redução da absorção' },
      { nutrient: 'Vitamina E', level: 'Moderada', effect: 'negative', description: 'Oxidação pela suplementação de ferro' },
    ],
    interactions: [
      { type: 'Cálcio/Laticínios', effect: 'Reduz absorção - evitar consumo simultâneo' },
      { type: 'Chá/Café', effect: 'Taninos reduzem absorção - aguardar 2h' },
      { type: 'Antiácidos', effect: 'Reduz absorção do ferro' },
      { type: 'Levotiroxina', effect: 'Reduz absorção do hormônio - tomar com 4h de distância' },
      { type: 'Antibióticos (quinolonas/tetraciclinas)', effect: 'Reduz absorção de ambos - tomar com 2-3h de distância' },
      { type: 'Vitamina C', effect: 'AUMENTA absorção - tomar junto' },
    ],
    recommendations: [
      'Vitamina C 500mg junto com ferro (aumenta absorção em até 3x)',
      'Zinco quelado 15-30mg/dia (longe do ferro, à noite)',
      'Cobre 1-2mg/dia (se uso prolongado)',
      'Tomar em jejum para melhor absorção',
      'Se náusea, tomar com alimento leve',
      'Evitar laticínios, café, chá por 2h',
      'Monitorar ferritina a cada 3 meses',
      'Considerar vitamina E 200-400 UI/dia',
      'Aumentar consumo de fibras (pode causar constipação)',
    ],
  },

  // ========== MEDICAMENTOS ADICIONAIS DO DRUG_DEPLETIONS ==========
  
  'Carbamazepina': {
    category: 'Anticonvulsivante',
    examples: ['Tegretol', 'Carbamazepina', 'Tegrex'],
    dosage: '200-1200mg/dia',
    posology: 'Via oral, fracionado em 2-3 doses',
    indications: ['Epilepsia', 'Neuralgia do trigêmeo', 'Transtorno bipolar'],
    contraindications: ['Porfiria', 'Bloqueio AV', 'Uso de IMAO', 'Hipersensibilidade'],
    depletions: [
      { nutrient: 'Vitamina D', level: 'Alta', effect: 'negative', description: 'Indutor enzimático - metaboliza vitamina D' },
      { nutrient: 'Cálcio', level: 'Alta', effect: 'negative', description: 'Redução indireta pela depleção de vitamina D' },
      { nutrient: 'Vitamina B12', level: 'Moderada', effect: 'negative', description: 'Interferência na absorção' },
      { nutrient: 'Ácido fólico', level: 'Alta', effect: 'negative', description: 'Acelera metabolismo do folato' },
      { nutrient: 'Biotina', level: 'Moderada', effect: 'negative', description: 'Redução pela atividade enzimática' },
    ],
    interactions: [
      { type: 'Toranja', effect: 'Aumenta níveis - EVITAR' },
      { type: 'Erva de São João', effect: 'Reduz eficácia' },
      { type: 'Contraceptivos orais', effect: 'Reduz eficácia' },
      { type: 'Varfarina', effect: 'Reduz efeito anticoagulante' },
    ],
    recommendations: [
      'Vitamina D3 4000-8000 UI/dia',
      'Cálcio 1200-1500mg/dia',
      'Ácido fólico 1-5mg/dia',
      'Metilfolato 400-800mcg/dia',
      'Vitamina B12 1000mcg/dia',
      'Biotina 5mg/dia',
      'Monitorar densidade óssea anualmente',
      'Exposição solar adequada',
    ],
  },

  'Clonazepam': {
    category: 'Benzodiazepínico',
    examples: ['Rivotril', 'Clonazepam'],
    dosage: '0,5-4mg/dia',
    posology: 'Via oral, 1-3x ao dia',
    indications: ['Ansiedade', 'Síndrome do pânico', 'Epilepsia', 'Distúrbios do sono'],
    contraindications: ['Miastenia gravis', 'Glaucoma', 'Insuficiência respiratória grave', 'Dependência química'],
    depletions: [
      { nutrient: 'Melatonina', level: 'Alta', effect: 'negative', description: 'Suprime produção natural' },
      { nutrient: 'GABA', level: 'Moderada', effect: 'negative', description: 'Dessensibilização de receptores' },
      { nutrient: 'Magnésio', level: 'Moderada', effect: 'negative', description: 'Aumento da utilização' },
      { nutrient: 'Vitamina B6', level: 'Moderada', effect: 'negative', description: 'Interferência no metabolismo' },
    ],
    interactions: [
      { type: 'Álcool', effect: 'CONTRAINDICADO - depressão SNC grave' },
      { type: 'Opioides', effect: 'Risco de depressão respiratória' },
      { type: 'Dependência', effect: 'ALTO RISCO - não suspender abruptamente' },
      { type: 'Kava-kava', effect: 'Potencializa sedação' },
    ],
    recommendations: [
      'Magnésio glicinato 400-600mg/dia',
      'Taurina 500-1000mg/dia',
      'L-teanina 200-400mg/dia',
      'Ashwagandha 300-600mg (para desmame)',
      'NÃO usar álcool',
      'Redução gradual OBRIGATÓRIA',
      'Terapia cognitivo-comportamental',
    ],
  },

  'Fluoxetina': {
    category: 'ISRS (Antidepressivo)',
    examples: ['Prozac', 'Fluoxetina', 'Daforin'],
    dosage: '20-80mg/dia',
    posology: 'Via oral, dose única pela manhã',
    indications: ['Depressão', 'TOC', 'Bulimia', 'Transtorno do pânico'],
    contraindications: ['Uso de IMAO', 'Mania', 'Hipersensibilidade'],
    depletions: [
      { nutrient: 'Sódio', level: 'Moderada', effect: 'negative', description: 'Hiponatremia (principalmente em idosos)' },
      { nutrient: 'Melatonina', level: 'Moderada', effect: 'negative', description: 'Alteração do sono' },
      { nutrient: 'Iodo', level: 'Leve', effect: 'negative', description: 'Pode afetar função tireoidiana' },
    ],
    interactions: [
      { type: 'IMAO', effect: 'CONTRAINDICADO - síndrome serotoninérgica' },
      { type: 'Tramadol', effect: 'Risco de síndrome serotoninérgica' },
      { type: 'Triptofano/5-HTP', effect: 'Pode aumentar serotonina excessivamente' },
      { type: 'Erva de São João', effect: 'Risco de síndrome serotoninérgica' },
    ],
    recommendations: [
      'Ômega-3 (EPA) 1-2g/dia',
      'Vitamina D3 2000-4000 UI/dia',
      'Magnésio 400mg/dia',
      'Folato/Metilfolato 400-800mcg/dia',
      'Monitorar sódio em idosos',
      'Evitar 5-HTP e L-triptofano',
      'Terapia psicológica adjuvante',
    ],
  },

  'Levotiroxina': {
    category: 'Hormônio Tireoidiano',
    examples: ['Puran T4', 'Synthroid', 'Levotiroxina sódica'],
    dosage: '25-200mcg/dia',
    posology: 'Via oral, em jejum, 30-60min antes do café',
    indications: ['Hipotireoidismo', 'Tireoidite de Hashimoto', 'Bócio', 'Pós-tireoidectomia'],
    contraindications: ['Tireotoxicose', 'IAM recente', 'Insuficiência adrenal não tratada'],
    depletions: [
      { nutrient: 'Cálcio', level: 'Moderada', effect: 'negative', description: 'Quelação - reduz absorção do hormônio' },
      { nutrient: 'Ferro', level: 'Moderada', effect: 'negative', description: 'Quelação - reduz absorção do hormônio' },
      { nutrient: 'Magnésio', level: 'Leve', effect: 'negative', description: 'Interferência na absorção' },
    ],
    interactions: [
      { type: 'Cálcio', effect: 'Reduz absorção - tomar 4h de distância' },
      { type: 'Ferro', effect: 'Reduz absorção - tomar 4h de distância' },
      { type: 'Soja', effect: 'Reduz absorção' },
      { type: 'Café', effect: 'Pode reduzir absorção - aguardar 1h' },
      { type: 'Omeprazol', effect: 'Reduz absorção' },
    ],
    recommendations: [
      'Tomar SEMPRE em jejum',
      'Aguardar 1h para alimentos',
      'Aguardar 4h para cálcio e ferro',
      'Selênio 200mcg/dia (auxilia conversão T4→T3)',
      'Zinco 15-30mg/dia (longe do hormônio)',
      'Vitamina D3 2000-4000 UI/dia',
      'Iodo conforme necessidade',
      'Monitorar TSH a cada 6-8 semanas',
    ],
  },

  'Losartana': {
    category: 'Anti-hipertensivo (BRA)',
    examples: ['Cozaar', 'Losartana potássica', 'Aradois'],
    dosage: '50-100mg/dia',
    posology: 'Via oral, dose única diária',
    indications: ['Hipertensão arterial', 'Nefropatia diabética', 'Insuficiência cardíaca', 'Proteção cardiovascular'],
    contraindications: ['Gravidez', 'Hipercalemia', 'Estenose bilateral de artérias renais'],
    depletions: [
      { nutrient: 'Zinco', level: 'Moderada', effect: 'negative', description: 'Aumento da excreção urinária' },
      { nutrient: 'Sódio', level: 'Leve', effect: 'negative', description: 'Efeito natriurético' },
    ],
    interactions: [
      { type: 'Potássio', effect: 'PODE AUMENTAR - NÃO suplementar sem orientação' },
      { type: 'AINEs', effect: 'Reduz efeito anti-hipertensivo e prejudica função renal' },
      { type: 'Diuréticos poupadores de potássio', effect: 'Risco de hipercalemia' },
    ],
    recommendations: [
      'Zinco quelado 15-30mg/dia',
      'Magnésio 400mg/dia',
      'Coenzima Q10 100-200mg/dia',
      'Ômega-3 1-2g/dia',
      'NÃO suplementar potássio sem orientação',
      'Monitorar função renal e potássio',
      'Hidratação adequada',
    ],
  },

  'Metformina': {
    category: 'Antidiabético (Biguanida)',
    examples: ['Glifage', 'Glucoformim', 'Metformina'],
    dosage: '500-2550mg/dia',
    posology: 'Via oral, junto com refeições, fracionado 2-3x',
    indications: ['Diabetes tipo 2', 'Pré-diabetes', 'Síndrome dos ovários policísticos', 'Resistência insulínica'],
    contraindications: ['Insuficiência renal', 'Acidose metabólica', 'Insuficiência cardíaca descompensada', 'Cirurgias com contraste'],
    depletions: [
      { nutrient: 'Vitamina B12', level: 'Muito Alta', effect: 'negative', description: 'Reduz absorção intestinal - SUPLEMENTAÇÃO OBRIGATÓRIA' },
      { nutrient: 'Ácido fólico', level: 'Alta', effect: 'negative', description: 'Interferência na absorção' },
      { nutrient: 'Coenzima Q10', level: 'Moderada', effect: 'negative', description: 'Redução da síntese' },
      { nutrient: 'Testosterona', level: 'Moderada', effect: 'negative', description: 'Pode reduzir níveis em homens' },
    ],
    interactions: [
      { type: 'Álcool', effect: 'Aumenta risco de acidose láctica - EVITAR' },
      { type: 'Contraste iodado', effect: 'SUSPENDER 48h antes e após exame' },
      { type: 'Berberina', effect: 'Efeito sinérgico - ajustar doses' },
      { type: 'Insulina', effect: 'Risco de hipoglicemia' },
    ],
    recommendations: [
      'Vitamina B12 1000mcg/dia (OBRIGATÓRIO)',
      'Metilcobalamina sublingual preferível',
      'Ácido fólico 400-800mcg/dia',
      'Metilfolato 400mcg/dia',
      'Coenzima Q10 100-200mg/dia',
      'Monitorar B12 a cada 6-12 meses',
      'Tomar com refeições',
      'Monitorar função renal',
      'Evitar álcool',
    ],
  },

  'Omeprazol': {
    category: 'IBP (Inibidor de Bomba de Prótons)',
    examples: ['Losec', 'Omeprazol', 'Peprazol'],
    dosage: '20-40mg/dia',
    posology: 'Via oral, 30min antes do café da manhã',
    indications: ['Refluxo gastroesofágico', 'Úlcera péptica', 'Gastrite', 'Esofagite', 'Síndrome de Zollinger-Ellison'],
    contraindications: ['Hipersensibilidade', 'Uso prolongado sem indicação'],
    depletions: [
      { nutrient: 'Vitamina B12', level: 'Muito Alta', effect: 'negative', description: 'Reduz absorção - precisa ácido gástrico' },
      { nutrient: 'Magnésio', level: 'Alta', effect: 'negative', description: 'Hipomagnesemia severa em uso prolongado' },
      { nutrient: 'Cálcio', level: 'Alta', effect: 'negative', description: 'Reduz absorção - risco de osteoporose' },
      { nutrient: 'Ferro', level: 'Alta', effect: 'negative', description: 'Necessita pH ácido para absorção' },
      { nutrient: 'Zinco', level: 'Moderada', effect: 'negative', description: 'Redução da absorção' },
      { nutrient: 'Vitamina C', level: 'Moderada', effect: 'negative', description: 'Reduz absorção' },
      { nutrient: 'Vitamina D', level: 'Moderada', effect: 'negative', description: 'Interferência na ativação' },
    ],
    interactions: [
      { type: 'Microbiota', effect: 'DISBIOSE - aumenta risco de SIBO e C. difficile' },
      { type: 'Fraturas', effect: 'Aumenta risco em 30-40% (uso >1 ano)' },
      { type: 'Clopidogrel', effect: 'Reduz eficácia anticoagulante' },
      { type: 'Levotiroxina', effect: 'Reduz absorção' },
    ],
    recommendations: [
      'Vitamina B12 1000-2000mcg/dia (sublingual ou injetável)',
      'Magnésio quelado 400-600mg/dia (ESSENCIAL)',
      'Cálcio citrato 1200mg/dia',
      'Vitamina D3 4000-8000 UI/dia',
      'Ferro quelato 30mg/dia (longe do IBP)',
      'Zinco quelado 30mg/dia',
      'Probióticos de alta potência',
      'L-glutamina 5-15g/dia',
      'Betaína HCl (considerar desmame)',
      'USO MÍNIMO POSSÍVEL - máximo 8-12 semanas',
      'Monitorar magnésio e B12 regularmente',
      'Densitometria óssea se uso >1 ano',
    ],
  },

  'Sinvastatina': {
    category: 'Estatina (Hipolipemiante)',
    examples: ['Zocor', 'Sinvastatina', 'Vaslip'],
    dosage: '10-80mg/dia',
    posology: 'Via oral, à noite (síntese de colesterol é noturna)',
    indications: ['Hipercolesterolemia', 'Prevenção cardiovascular', 'Dislipidemia'],
    contraindications: ['Doença hepática ativa', 'Gravidez', 'Lactação', 'Rabdomiólise'],
    depletions: [
      { nutrient: 'Coenzima Q10', level: 'Muito Alta', effect: 'negative', description: 'SUPLEMENTAÇÃO OBRIGATÓRIA - mesma via de síntese' },
      { nutrient: 'Vitamina K2', level: 'Alta', effect: 'negative', description: 'Interferência na ativação' },
      { nutrient: 'Selênio', level: 'Moderada', effect: 'negative', description: 'Redução da atividade antioxidante' },
      { nutrient: 'Vitamina E', level: 'Moderada', effect: 'negative', description: 'Aumento do estresse oxidativo' },
      { nutrient: 'Vitamina D', level: 'Moderada', effect: 'negative', description: 'Pode reduzir níveis' },
    ],
    interactions: [
      { type: 'Toranja', effect: 'CONTRAINDICADO - aumenta níveis em 15x' },
      { type: 'Álcool', effect: 'Aumenta risco de hepatotoxicidade' },
      { nutrient: 'Fibras', effect: 'Tomar estatina 2h antes/depois de fibras' },
      { type: 'Miopatia', effect: 'Dor muscular, fraqueza - suplementar CoQ10' },
    ],
    recommendations: [
      'Coenzima Q10 200-400mg/dia (OBRIGATÓRIO)',
      'Vitamina K2 MK-7 200mcg/dia',
      'Vitamina D3 4000-8000 UI/dia',
      'Vitamina E 400 UI/dia',
      'Selênio 200mcg/dia',
      'Ômega-3 2-4g/dia',
      'Monitorar CK, TGO, TGP regularmente',
      'Tomar à noite',
      'NUNCA com toranja',
      'Evitar álcool',
      'Exercícios leves (CoQ10 ajuda fadiga)',
    ],
  },
};


// Escala de depleção
const DEPLETION_SCALE = {
  'Muito Alta': { color: '#d32f2f', priority: 1, icon: '🔴', recommendation: 'Suplementação obrigatória' },
  'Alta': { color: '#f57c00', priority: 2, icon: '🟠', recommendation: 'Suplementação altamente recomendada' },
  'Moderada': { color: '#fbc02d', priority: 3, icon: '🟡', recommendation: 'Suplementação recomendada' },
  'Leve': { color: '#689f38', priority: 4, icon: '🟢', recommendation: 'Considerar suplementação' },
};

export default function DrugInteractions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(null);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [consolidatedDepletions, setConsolidatedDepletions] = useState([]);
  const [consolidatedInteractions, setConsolidatedInteractions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (id) {
      const saved = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const found = saved.find((x) => String(x.id) === String(id));
      if (found) {
        setPatientData(found);
        if (found.drugInteractions) {
          setSelectedDrugs(found.drugInteractions.selectedDrugs || []);
        }
      }
    }
  }, [id]);

  useEffect(() => {
    if (selectedDrugs.length > 0) {
      consolidateData();
    }
  }, [selectedDrugs]);

  const consolidateData = () => {
    const depletionsMap = {};
    const interactionsList = [];

    selectedDrugs.forEach((drugName) => {
      const drug = DRUG_DATABASE[drugName];
      if (!drug) return;

      // Consolidar depletions
      drug.depletions.forEach((depl) => {
        if (!depletionsMap[depl.nutrient]) {
          depletionsMap[depl.nutrient] = {
            nutrient: depl.nutrient,
            maxLevel: depl.level,
            drugs: [drugName],
            descriptions: [depl.description],
          };
        } else {
          depletionsMap[depl.nutrient].drugs.push(drugName);
          depletionsMap[depl.nutrient].descriptions.push(depl.description);
          
          // Atualizar para o nível mais alto
          const currentPriority = DEPLETION_SCALE[depletionsMap[depl.nutrient].maxLevel].priority;
          const newPriority = DEPLETION_SCALE[depl.level].priority;
          if (newPriority < currentPriority) {
            depletionsMap[depl.nutrient].maxLevel = depl.level;
          }
        }
      });

      // Consolidar interactions
      drug.interactions.forEach((inter) => {
        interactionsList.push({
          drug: drugName,
          type: inter.type,
          effect: inter.effect,
        });
      });
    });

    const depletionsList = Object.values(depletionsMap).sort((a, b) => {
      return DEPLETION_SCALE[a.maxLevel].priority - DEPLETION_SCALE[b.maxLevel].priority;
    });

    setConsolidatedDepletions(depletionsList);
    setConsolidatedInteractions(interactionsList);
  };

  const handleDrugSelect = (event, newValue) => {
    setSelectedDrugs(newValue);
  };

  const handleSave = () => {
    if (!id) return;

    const saved = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const index = saved.findIndex((x) => String(x.id) === String(id));
    
    if (index !== -1) {
      saved[index].drugInteractions = {
        selectedDrugs,
        consolidatedDepletions,
        consolidatedInteractions,
        savedAt: new Date().toISOString(),
      };
          try { if (!safeSaveAnamneses(saved)) console.warn('Failed to fully save anamneses locally'); } catch(e) { console.warn(e); }
      try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: { id } })); } catch (e) { /* ignore */ }
      alert('Interações medicamentosas salvas!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    const element = document.getElementById('drug-interactions-content');
    try {
      const bodyHtml = element.innerHTML;
      const qr = `${window.location.origin}/interacoes/${id}`;
      const qrUrl = await generateQrDataUrl(qr);
      const title = `interacoes-medicamentosas-${patientData?.nome || 'paciente'}`;
      const html = await buildLetterheadHtml({ title, bodyHtml, qrUrl });
      await downloadPdfFromHtml(html, `${title}.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
      window.print();
    }
  };

  const getAllRecommendations = () => {
    const recsSet = new Set();
    selectedDrugs.forEach((drugName) => {
      const drug = DRUG_DATABASE[drugName];
      if (drug) {
        drug.recommendations.forEach((rec) => recsSet.add(rec));
      }
    });
    return Array.from(recsSet);
  };

  // Função para filtrar medicamentos pela busca
  const getFilteredDrugs = () => {
    if (!searchTerm.trim()) {
      return Object.keys(DRUG_DATABASE);
    }
    
    const search = searchTerm.toLowerCase();
    return Object.keys(DRUG_DATABASE).filter((drugName) => {
      const drug = DRUG_DATABASE[drugName];
      // Buscar no nome do medicamento
      if (drugName.toLowerCase().includes(search)) return true;
      // Buscar nos exemplos comerciais
      if (drug.examples && drug.examples.some(ex => ex.toLowerCase().includes(search))) return true;
      // Buscar na categoria
      if (drug.category && drug.category.toLowerCase().includes(search)) return true;
      return false;
    });
  };

  if (!id) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Interações Medicamentosas
          </Typography>
          <Alert severity="info">
            Selecione um interagente no Dashboard.
          </Alert>
          <Button variant="contained" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>
            Ir para Interagentes
          </Button>
        </Paper>
      </Container>
    );
  }

  const drugOptions = Object.keys(DRUG_DATABASE);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }} id="drug-interactions-content">
        <PrescriptionHeader
          patientName={patientData?.nome}
          patientAge={patientData?.idade}
          patientContact={patientData?.telefone}
        />

        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ color: '#d32f2f', fontWeight: 600 }}>
              ⚕️ Interações Medicamentosas
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Depleção de Nutrientes, Vitaminas e Minerais por Medicamentos
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }} className="no-print">
            <Button variant="outlined" startIcon={<SaveIcon />} onClick={handleSave} size="small">
              Salvar
            </Button>
            <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint} size="small">
              Imprimir
            </Button>
            <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleDownload} size="small">
              PDF
            </Button>
          </Box>
        </Box>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2" gutterBottom>
            <strong>⚠️ Importante:</strong> Esta ferramenta é informativa. Sempre consulte o profissional de saúde responsável antes de iniciar suplementação.
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
            Base de dados: <strong>{Object.keys(DRUG_DATABASE).length} medicamentos</strong> cadastrados com {Object.keys(DRUG_DEPLETIONS).length} registros adicionais no banco principal
          </Typography>
        </Alert>

        {/* Campo de Busca */}
        <Card sx={{ mb: 3, bgcolor: '#e3f2fd' }} className="no-print">
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SearchIcon /> Buscar Medicamentos
            </Typography>
            <TextField
              fullWidth
              placeholder="Digite o nome do medicamento, princípio ativo ou nome comercial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: '#1976d2' }} />,
                endAdornment: searchTerm && (
                  <ClearIcon
                    sx={{ cursor: 'pointer', color: '#999' }}
                    onClick={() => setSearchTerm('')}
                  />
                ),
              }}
              sx={{ mb: 1 }}
            />
            <Typography variant="caption" color="text.secondary">
              {searchTerm ? (
                <>
                  Mostrando <strong>{getFilteredDrugs().length}</strong> resultado(s) de <strong>{Object.keys(DRUG_DATABASE).length}</strong> medicamentos
                </>
              ) : (
                <>Total de <strong>{Object.keys(DRUG_DATABASE).length}</strong> medicamentos disponíveis</>
              )}
            </Typography>
          </CardContent>
        </Card>

        {/* Seleção de Medicamentos */}
        <Card sx={{ mb: 3, bgcolor: '#f5f5f5' }} className="no-print">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Selecione os medicamentos em uso:
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Clique nos medicamentos para adicionar ou remover:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {getFilteredDrugs().map((drug) => {
                  const drugInfo = DRUG_DATABASE[drug];
                  return (
                    <Chip
                      key={drug}
                      label={
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {drug}
                          </Typography>
                          {drugInfo.examples && (
                            <Typography variant="caption" sx={{ display: 'block', opacity: 0.8 }}>
                              {drugInfo.examples.join(', ')}
                            </Typography>
                          )}
                        </Box>
                      }
                      onClick={() => {
                        if (selectedDrugs.includes(drug)) {
                          setSelectedDrugs(selectedDrugs.filter(d => d !== drug));
                        } else {
                          setSelectedDrugs([...selectedDrugs, drug]);
                        }
                      }}
                      color={selectedDrugs.includes(drug) ? "primary" : "default"}
                      variant={selectedDrugs.includes(drug) ? "filled" : "outlined"}
                      sx={{ 
                        cursor: 'pointer',
                        fontWeight: selectedDrugs.includes(drug) ? 600 : 400,
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                    />
                  );
                })}
              </Box>
              {getFilteredDrugs().length === 0 && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Nenhum medicamento encontrado com o termo "{searchTerm}"
                </Alert>
              )}
            </Box>
          </CardContent>
        </Card>

        {selectedDrugs.length > 0 && (
          <>
            {/* Escala de Depleção */}
            <Card sx={{ mb: 3, bgcolor: '#fff3e0' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📊 Escala de Depleção de Nutrientes
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(DEPLETION_SCALE).map(([level, data]) => (
                    <Grid item xs={12} sm={6} md={3} key={level}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span style={{ fontSize: '1.5rem' }}>{data.icon}</span>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: data.color }}>
                            {level}
                          </Typography>
                          <Typography variant="caption">{data.recommendation}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Tabela de Depleções Consolidadas */}
            <Typography variant="h5" gutterBottom sx={{ color: '#d32f2f', mt: 4, mb: 2 }}>
              🧪 Nutrientes Depletados (Consolidado)
            </Typography>

            <TableContainer component={Paper} sx={{ mb: 4 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#ffebee' }}>
                    <TableCell><strong>Prioridade</strong></TableCell>
                    <TableCell><strong>Nutriente</strong></TableCell>
                    <TableCell><strong>Nível de Depleção</strong></TableCell>
                    <TableCell><strong>Medicamentos Envolvidos</strong></TableCell>
                    <TableCell><strong>Mecanismo</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {consolidatedDepletions.map((depl, index) => {
                    const scale = DEPLETION_SCALE[depl.maxLevel];
                    return (
                      <TableRow key={index} hover>
                        <TableCell>
                          <span style={{ fontSize: '1.5rem' }}>{scale.icon}</span>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {depl.nutrient}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={depl.maxLevel}
                            sx={{ bgcolor: scale.color, color: '#fff', fontWeight: 600 }}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {depl.drugs.map((drug, i) => (
                              <Chip key={i} label={drug} size="small" variant="outlined" />
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption">
                            {depl.descriptions[0]}
                            {depl.descriptions.length > 1 && ' (múltiplos mecanismos)'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Detalhes por Medicamento */}
            <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', mt: 4, mb: 2 }}>
              💊 Detalhes por Medicamento
            </Typography>

            {selectedDrugs.map((drugName) => {
              const drug = DRUG_DATABASE[drugName];
              if (!drug) return null;

              return (
                <Accordion key={drugName} defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <Typography variant="h6">{drugName}</Typography>
                      <Chip label={drug.category} size="small" color="primary" variant="outlined" />
                      <Typography variant="caption" color="text.secondary">
                        Exemplos: {drug.examples.join(', ')}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={3}>
                      {/* Depletions */}
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                          Nutrientes Depletados:
                        </Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Nutriente</TableCell>
                                <TableCell>Nível</TableCell>
                                <TableCell>Mecanismo</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {drug.depletions.map((depl, i) => (
                                <TableRow key={i}>
                                  <TableCell>{depl.nutrient}</TableCell>
                                  <TableCell>
                                    <Chip
                                      label={depl.level}
                                      size="small"
                                      sx={{
                                        bgcolor: DEPLETION_SCALE[depl.level].color,
                                        color: '#fff',
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Typography variant="caption">{depl.description}</Typography>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>

                      {/* Interactions */}
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                          Efeitos e Interações:
                        </Typography>
                        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                          {drug.interactions.map((inter, i) => (
                            <Box key={i} sx={{ mb: 1 }}>
                              <Typography variant="body2">
                                <strong>{inter.type}:</strong> {inter.effect}
                              </Typography>
                            </Box>
                          ))}
                        </Box>

                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
                          📋 Recomendações:
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                          {drug.recommendations.map((rec, i) => (
                            <li key={i}>
                              <Typography variant="body2">{rec}</Typography>
                            </li>
                          ))}
                        </ul>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              );
            })}

            {/* Protocolo de Suplementação Consolidado */}
            <Paper sx={{ p: 3, mt: 4, bgcolor: '#e8f5e9' }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#2e7d32' }}>
                ✅ Protocolo de Suplementação Recomendado
              </Typography>
              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  Baseado nos medicamentos selecionados, estas são as recomendações consolidadas:
                </Typography>
              </Alert>

              <Grid container spacing={2}>
                {getAllRecommendations().map((rec, index) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {index + 1}.
                      </Typography>
                      <Typography variant="body2">{rec}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Alert severity="warning">
                <Typography variant="body2">
                  <strong>⚠️ Avisos Importantes:</strong>
                </Typography>
                <ul style={{ marginTop: 8, marginBottom: 0 }}>
                  <li>Sempre consulte o profissional de saúde responsável antes de iniciar suplementação</li>
                  <li>Algumas interações podem reduzir a eficácia do medicamento</li>
                  <li>Respeite os intervalos entre medicamentos e suplementos quando necessário</li>
                  <li>Monitoramento laboratorial pode ser necessário</li>
                  <li>Doses terapêuticas podem ser diferentes das doses preventivas</li>
                </ul>
              </Alert>
            </Paper>
          </>
        )}
      </Paper>

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </Container>
  );
}
