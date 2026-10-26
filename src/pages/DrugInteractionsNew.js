import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import SaveToPatientBar from '../components/SaveToPatientBar';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Chip,
  Card,
  CardContent,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MedicationIcon from '@mui/icons-material/Medication';
import WarningIcon from '@mui/icons-material/Warning';
import ScienceIcon from '@mui/icons-material/Science';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import InfoIcon from '@mui/icons-material/Info';
import { DRUG_DEPLETIONS, NUTRIENT_DOSAGES, NATURAL_ALTERNATIVES } from '../data/drugDepletionsData';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl, openPrintWindow } from '../components/PrintTemplate';

// Informações detalhadas dos medicamentos
const DRUG_DETAILS = {
  'Ácido Acetilsalicílico (AAS)': {
    comercialNames: ['AAS', 'Aspirina', 'Somalgin', 'Buferin'],
    activeIngredient: 'Ácido Acetilsalicílico',
    dosage: '100-500mg/dia',
    posology: 'Via oral, 1x ao dia (prevenção cardiovascular) ou a cada 4-6h (analgésico/antipirético)',
    indications: ['Prevenção de eventos cardiovasculares', 'Antiagregação plaquetária', 'Dor leve a moderada', 'Febre', 'Artrite', 'Inflamações'],
    contraindications: ['Úlcera péptica ativa', 'Hemofilia', 'Dengue', 'Crianças com varicela (risco de Síndrome de Reye)', 'Alergia a AINEs', 'Último trimestre de gravidez'],
  },
  'Alendronato': {
    comercialNames: ['Fosamax', 'Alendil', 'Ostenan'],
    activeIngredient: 'Alendronato de Sódio',
    dosage: '70mg/semana ou 10mg/dia',
    posology: 'Via oral, em jejum absoluto, 30-60min antes do café da manhã, com água. Permanecer em pé ou sentado por no mínimo 30min',
    indications: ['Osteoporose pós-menopausa', 'Osteoporose em homens', 'Prevenção de fraturas', 'Doença de Paget'],
    contraindications: ['Hipocalcemia', 'Estenose ou acalasia esofágica', 'Incapacidade de permanecer em pé/sentado por 30min', 'Insuficiência renal grave (ClCr <35ml/min)'],
  },
  'Alopurinol': {
    comercialNames: ['Zyloric', 'Alopurinol', 'Purinol'],
    activeIngredient: 'Alopurinol',
    dosage: '100-300mg/dia (pode chegar a 800mg em casos graves)',
    posology: 'Via oral, após refeições, dose única diária ou fracionada em 2-3 doses',
    indications: ['Gota', 'Hiperuricemia', 'Cálculos renais de ácido úrico', 'Prevenção de hiperuricemia na quimioterapia'],
    contraindications: ['Crise aguda de gota (não iniciar durante crise)', 'Hipersensibilidade', 'Uso concomitante com azatioprina ou mercaptopurina'],
  },
  'Alprazolam': {
    comercialNames: ['Frontal', 'Apraz', 'Alprazolam'],
    activeIngredient: 'Alprazolam',
    dosage: '0,25-4mg/dia (dividido em 2-3 doses)',
    posology: 'Via oral, 2-3x ao dia ou conforme necessidade (máximo 4mg/dia)',
    indications: ['Ansiedade generalizada', 'Transtorno do pânico', 'Ansiedade associada à depressão'],
    contraindications: ['Miastenia gravis', 'Glaucoma de ângulo fechado', 'Insuficiência respiratória grave', 'Gravidez/lactação', 'Dependência química prévia'],
  },
  'Amiodarona': {
    comercialNames: ['Ancoron', 'Atlansil', 'Miodaron'],
    activeIngredient: 'Cloridrato de Amiodarona',
    dosage: '200-400mg/dia (manutenção); dose de ataque 600-800mg/dia por 7-10 dias',
    posology: 'Via oral, dose única diária, preferencialmente com as refeições',
    indications: ['Arritmias ventriculares graves', 'Fibrilação atrial', 'Taquicardia ventricular', 'Arritmias refratárias a outros antiarrítmicos'],
    contraindications: ['Bradiarritmias sem marcapasso', 'Disfunção tireoidiana', 'Gestação', 'Hipersensibilidade ao iodo', 'Bloqueio AV de 2º ou 3º grau'],
  },
  'Amitriptilina': {
    comercialNames: ['Tryptanol', 'Amytril', 'Limbitryl'],
    activeIngredient: 'Cloridrato de Amitriptilina',
    dosage: '25-150mg/dia (pode chegar a 300mg em casos graves)',
    posology: 'Via oral, dose única à noite (devido ao efeito sedativo)',
    indications: ['Depressão', 'Dor neuropática', 'Enxaqueca (profilaxia)', 'Insônia', 'Fibromialgia', 'Síndrome do intestino irritável'],
    contraindications: ['IAM recente', 'Glaucoma de ângulo fechado', 'Retenção urinária', 'Uso de IMAO (aguardar 14 dias)', 'Arritmias cardíacas'],
  },
  'Anlodipino': {
    comercialNames: ['Norvasc', 'Anlo', 'Anlodipino'],
    activeIngredient: 'Besilato de Anlodipino',
    dosage: '5-10mg/dia',
    posology: 'Via oral, dose única diária, independente das refeições',
    indications: ['Hipertensão arterial', 'Angina estável', 'Angina vasoespástica (Prinzmetal)'],
    contraindications: ['Hipotensão grave', 'Choque cardiogênico', 'Estenose aórtica grave', 'Hipersensibilidade'],
  },
  'Atenolol': {
    comercialNames: ['Atenol', 'Ablok', 'Atenolol'],
    activeIngredient: 'Atenolol',
    dosage: '25-100mg/dia',
    posology: 'Via oral, dose única diária, pela manhã',
    indications: ['Hipertensão arterial', 'Angina pectoris', 'Arritmias cardíacas', 'Infarto do miocárdio (prevenção secundária)', 'Ansiedade'],
    contraindications: ['Bradicardia', 'Bloqueio AV de 2º/3º grau', 'Asma', 'DPOC grave', 'Insuficiência cardíaca descompensada', 'Choque cardiogênico'],
  },
  'Losartana': {
    comercialNames: ['Cozaar', 'Losartana', 'Aradois'],
    activeIngredient: 'Losartana Potássica',
    dosage: '50-100mg/dia',
    posology: 'Via oral, dose única diária, independente das refeições',
    indications: ['Hipertensão arterial', 'Nefropatia diabética', 'Insuficiência cardíaca', 'Redução do risco de AVE em hipertensos com HVE'],
    contraindications: ['Gravidez', 'Hipercalemia', 'Estenose bilateral de artérias renais', 'Hipotensão', 'Insuficiência hepática grave'],
  },
  'Metformina': {
    comercialNames: ['Glifage', 'Glucoformim', 'Metformina'],
    activeIngredient: 'Cloridrato de Metformina',
    dosage: '500-2550mg/dia (dividido em 2-3 doses)',
    posology: 'Via oral, junto com ou após as refeições, fracionado em 2-3 tomadas para melhor tolerância',
    indications: ['Diabetes tipo 2', 'Pré-diabetes', 'Síndrome dos ovários policísticos (SOP)', 'Resistência insulínica'],
    contraindications: ['Insuficiência renal (ClCr <30ml/min)', 'Acidose metabólica', 'Insuficiência cardíaca descompensada', 'Cirurgias com contraste iodado (suspender 48h antes)'],
  },
  'Omeprazol': {
    comercialNames: ['Losec', 'Omeprazol', 'Peprazol', 'Victrix'],
    activeIngredient: 'Omeprazol',
    dosage: '20-40mg/dia',
    posology: 'Via oral, 30-60min antes do café da manhã (em jejum), cápsula inteira (não mastigar)',
    indications: ['Refluxo gastroesofágico', 'Úlcera péptica', 'Gastrite', 'Esofagite erosiva', 'Síndrome de Zollinger-Ellison', 'Erradicação de H. pylori'],
    contraindications: ['Hipersensibilidade', 'Uso prolongado sem indicação (risco de efeitos adversos)'],
  },
  'Sinvastatina': {
    comercialNames: ['Zocor', 'Sinvastatina', 'Vaslip'],
    activeIngredient: 'Sinvastatina',
    dosage: '10-80mg/dia (dose máxima 40mg recomendada)',
    posology: 'Via oral, à noite (síntese de colesterol é noturna), independente de refeições',
    indications: ['Hipercolesterolemia', 'Prevenção de eventos cardiovasculares', 'Dislipidemia mista'],
    contraindications: ['Doença hepática ativa', 'Gravidez', 'Lactação', 'Rabdomiólise', 'Uso com inibidores potentes de CYP3A4'],
  },
  // Estatinas gerais
  'Estatinas': {
    comercialNames: ['Sinvastatina', 'Atorvastatina', 'Rosuvastatina', 'Pravastatina', 'Lovastatina'],
    activeIngredient: 'Vários (Estatinas)',
    dosage: 'Variável conforme o tipo: 10-80mg/dia',
    posology: 'Via oral, preferencialmente à noite',
    indications: ['Hipercolesterolemia', 'Prevenção cardiovascular', 'Dislipidemia'],
    contraindications: ['Doença hepática ativa', 'Gravidez', 'Lactação', 'Miopatia', 'Rabdomiólise'],
  },
  'Diuréticos tiazídicos': {
    comercialNames: ['Hidroclorotiazida', 'Clortalidona', 'Indapamida'],
    activeIngredient: 'Tiazídicos diversos',
    dosage: '12,5-50mg/dia',
    posology: 'Via oral, dose única pela manhã (evitar à noite)',
    indications: ['Hipertensão arterial', 'Edema', 'Insuficiência cardíaca'],
    contraindications: ['Anúria', 'Hipersensibilidade a sulfonamidas', 'Hipocalemia grave não corrigida'],
  },
  'Omeprazol/IBP': {
    comercialNames: ['Omeprazol', 'Esomeprazol', 'Pantoprazol', 'Lansoprazol'],
    activeIngredient: 'Inibidores de Bomba de Prótons',
    dosage: '20-40mg/dia',
    posology: 'Via oral, 30-60min antes do café da manhã',
    indications: ['Refluxo gastroesofágico', 'Úlcera péptica', 'Gastrite', 'Esofagite'],
    contraindications: ['Hipersensibilidade'],
  },
  'Corticoides': {
    comercialNames: ['Prednisona', 'Prednisolona', 'Dexametasona', 'Hidrocortisona'],
    activeIngredient: 'Corticosteroides',
    dosage: 'Variável: 5-60mg/dia (prednisona equivalente)',
    posology: 'Via oral, pela manhã ou conforme prescrição médica',
    indications: ['Doenças inflamatórias', 'Doenças autoimunes', 'Alergias graves', 'Asma', 'DPOC', 'Artrite reumatoide'],
    contraindications: ['Infecções sistêmicas não tratadas', 'Úlcera péptica ativa', 'Diabetes descompensado'],
  },
};

export default function DrugInteractionsNew() {
  const navigate = useNavigate();
  const { id: routeId } = useParams();
  const [searchParams] = useSearchParams();
  // Aceita ID via URL /:id, query string ?id= ou localStorage
  const patientId = routeId || searchParams.get('id') || localStorage.getItem('currentPatientId');

  const [patientData, setPatientData] = useState(null);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [allDepletions, setAllDepletions] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Organizar medicamentos por categoria e ordenar alfabeticamente
  const drugsByCategory = {};
  Object.entries(DRUG_DEPLETIONS).forEach(([drug, data]) => {
    const category = data.category;
    if (!drugsByCategory[category]) {
      drugsByCategory[category] = [];
    }
    drugsByCategory[category].push(drug);
  });

  // Ordenar categorias alfabeticamente e medicamentos dentro de cada categoria
  const sortedCategories = Object.keys(drugsByCategory).sort();
  sortedCategories.forEach(category => {
    drugsByCategory[category].sort();
  });

  // Função para filtrar medicamentos pela busca
  const getFilteredDrugs = (drugs) => {
    if (!searchTerm.trim()) {
      return drugs;
    }
    
    const search = searchTerm.toLowerCase();
    return drugs.filter((drugName) => {
      const drugData = DRUG_DEPLETIONS[drugName];
      const drugDetails = DRUG_DETAILS[drugName];
      
      // Buscar no nome do medicamento
      if (drugName.toLowerCase().includes(search)) return true;
      
      // Buscar nos nomes comerciais
      if (drugDetails?.comercialNames) {
        if (drugDetails.comercialNames.some(name => name.toLowerCase().includes(search))) {
          return true;
        }
      }
      
      // Buscar no princípio ativo
      if (drugDetails?.activeIngredient && drugDetails.activeIngredient.toLowerCase().includes(search)) {
        return true;
      }
      
      // Buscar na categoria
      if (drugData?.category && drugData.category.toLowerCase().includes(search)) {
        return true;
      }
      
      return false;
    });
  };

  // Função para obter depleções de medicamentos específicos de uma categoria
  const getDepletionsForCategory = (category) => {
    const categoryDrugs = drugsByCategory[category];
    const selectedInCategory = selectedDrugs.filter(drug => categoryDrugs.includes(drug));
    
    if (selectedInCategory.length === 0) return {};

    const consolidated = {};
    
    selectedInCategory.forEach(drug => {
      const drugData = DRUG_DEPLETIONS[drug];
      if (drugData && drugData.depletions) {
        drugData.depletions.forEach(nutrient => {
          if (!consolidated[nutrient]) {
            consolidated[nutrient] = {
              count: 0,
              drugs: [],
              explanations: [],
            };
          }
          consolidated[nutrient].count++;
          consolidated[nutrient].drugs.push(drug);
          if (drugData.explanation && !consolidated[nutrient].explanations.includes(drugData.explanation)) {
            consolidated[nutrient].explanations.push(drugData.explanation);
          }
        });
      }
    });

    return consolidated;
  };

  // Carregar dados do paciente
  useEffect(() => {
    if (patientId) {
      const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const patient = anamneses.find(a => String(a.id) === String(patientId));
      if (patient) {
        setPatientData(patient);
        
        // Auto-detectar medicamentos do campo q24_medicamentos_uso
        if (patient.q24_medicamentos_uso) {
          const detectedDrugs = detectDrugsFromText(patient.q24_medicamentos_uso);
          setSelectedDrugs(detectedDrugs);
        }
      }
    }
  }, [patientId]);

  // Auto-detectar medicamentos mencionados
  const detectDrugsFromText = (text) => {
    const detected = [];
    const lowerText = text.toLowerCase();
    
    Object.keys(DRUG_DEPLETIONS).forEach(drug => {
      const lowerDrug = drug.toLowerCase();
      if (lowerText.includes(lowerDrug.split('(')[0].trim().toLowerCase())) {
        detected.push(drug);
      }
    });
    
    return detected;
  };

  // Salvar dados de interações medicamentosas no localStorage
  useEffect(() => {
    if (patientId && selectedDrugs.length > 0) {
      const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const index = anamneses.findIndex(a => a.id === patientId);
      
      if (index !== -1) {
        // Salvar medicamentos selecionados e suas depleções
        anamneses[index].drugInteractions = {
          selectedDrugs: selectedDrugs,
          timestamp: new Date().toISOString(),
        };
        localStorage.setItem('anamneses', JSON.stringify(anamneses));
      }
    }
  }, [patientId, selectedDrugs]);

  // Atualizar depleções quando medicamentos mudarem
  useEffect(() => {
    if (selectedDrugs.length === 0) {
      setAllDepletions({});
      return;
    }

    // Consolidar todas as depleções
    const consolidated = {};
    
    selectedDrugs.forEach(drug => {
      const drugData = DRUG_DEPLETIONS[drug];
      if (drugData && drugData.depletions) {
        drugData.depletions.forEach(nutrient => {
          if (!consolidated[nutrient]) {
            consolidated[nutrient] = {
              count: 0,
              drugs: [],
              explanations: [],
            };
          }
          consolidated[nutrient].count++;
          consolidated[nutrient].drugs.push(drug);
          if (drugData.explanation && !consolidated[nutrient].explanations.includes(drugData.explanation)) {
            consolidated[nutrient].explanations.push(drugData.explanation);
          }
        });
      }
    });

    setAllDepletions(consolidated);
  }, [selectedDrugs]);

  const handleDrugToggle = (drug) => {
    setSelectedDrugs(prev => {
      if (prev.includes(drug)) {
        return prev.filter(d => d !== drug);
      } else {
        return [...prev, drug];
      }
    });
  };

  const handlePrint = async () => {
    if (selectedDrugs.length === 0) {
      window.print();
      return;
    }
    try {
      const bodyHtml = buildReportHtml();
      const qr = patientData?.id ? `${window.location.origin}/drug-interactions?id=${patientData.id}` : '';
      const qrUrl = qr ? await generateQrDataUrl(qr) : '';
      const html = await buildLetterheadHtml({
        title: 'Interações Medicamentosas e Depleções Nutricionais',
        bodyHtml,
        qrUrl,
      });
      openPrintWindow(html, true);
    } catch (error) {
      console.error('Erro ao imprimir:', error);
      window.print();
    }
  };

  const handleDownloadPdf = async () => {
    if (selectedDrugs.length === 0) {
      alert('Selecione ao menos um medicamento para gerar o PDF.');
      return;
    }

    try {
      const bodyHtml = buildReportHtml();
      const qr = patientData?.id ? `${window.location.origin}/drug-interactions?id=${patientData.id}` : '';
      const qrUrl = qr ? await generateQrDataUrl(qr) : '';
      const html = await buildLetterheadHtml({
        title: 'Interações Medicamentosas e Depleções Nutricionais',
        bodyHtml,
        qrUrl,
      });
      const fileName = `interacoes_medicamentosas_${patientData?.q01_nome || 'paciente'}_${new Date().toISOString().split('T')[0]}.pdf`;
      await downloadPdfFromHtml(html, fileName);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tentando impressão direta...');
      window.print();
    }
  };

  const buildReportHtml = () => {
    let html = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        ${patientData ? `
          <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2e7d32;">
            <h3 style="margin: 0 0 10px 0; color: #2e7d32;">Dados do Interagente</h3>
            <p style="margin: 5px 0;"><strong>Nome:</strong> ${patientData.q01_nome || 'Não informado'}</p>
            ${patientData.q24_medicamentos_uso ? `<p style="margin: 5px 0;"><strong>Medicamentos em uso:</strong> ${patientData.q24_medicamentos_uso}</p>` : ''}
            <p style="margin: 5px 0;"><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        ` : ''}

        <h2 style="color: #d32f2f; border-bottom: 3px solid #d32f2f; padding-bottom: 10px; margin-top: 30px;">
          💊 Medicamentos Selecionados (${selectedDrugs.length})
        </h2>
        
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0;">
          ${selectedDrugs.map(drug => `
            <span style="background: #d32f2f; color: white; padding: 8px 12px; border-radius: 16px; font-size: 13px;">
              ${drug}
            </span>
          `).join('')}
        </div>

        <h2 style="color: #d32f2f; border-bottom: 3px solid #d32f2f; padding-bottom: 10px; margin-top: 30px;">
          ⚠️ Depleções Nutricionais Identificadas
        </h2>

        ${Object.entries(allDepletions)
          .sort((a, b) => b[1].count - a[1].count)
          .map(([nutrient, data]) => {
            const dosageInfo = NUTRIENT_DOSAGES[nutrient];
            return `
              <div style="page-break-inside: avoid; margin: 20px 0; border: 2px solid #ff5722; border-radius: 8px; padding: 15px; background: #fff3e0;">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                  <div style="background: #ff5722; color: white; padding: 4px 12px; border-radius: 12px; font-weight: bold; margin-right: 10px;">
                    ${data.count}x
                  </div>
                  <h3 style="margin: 0; color: #d32f2f; font-size: 18px;">
                    ${nutrient}
                  </h3>
                </div>

                <div style="background: #fff; padding: 12px; border-radius: 6px; margin-bottom: 10px;">
                  <p style="margin: 0; font-size: 13px; color: #666;">
                    <strong style="color: #d32f2f;">Causado por:</strong> ${data.drugs.join(', ')}
                  </p>
                </div>

                ${dosageInfo ? `
                  <div style="background: #e8f5e9; padding: 12px; border-radius: 6px; margin-bottom: 10px;">
                    <p style="margin: 5px 0; font-size: 13px;"><strong style="color: #2e7d32;">💊 Dosagem:</strong> ${dosageInfo.dosage}</p>
                    <p style="margin: 5px 0; font-size: 13px;"><strong style="color: #2e7d32;">⏰ Posologia:</strong> ${dosageInfo.posology}</p>
                    <p style="margin: 5px 0; font-size: 13px;"><strong style="color: #2e7d32;">📅 Duração:</strong> ${dosageInfo.duration}</p>
                    ${dosageInfo.precautions ? `
                      <p style="margin: 5px 0; font-size: 12px; color: #f57c00;">
                        <strong>⚠️ Precauções:</strong> ${dosageInfo.precautions}
                      </p>
                    ` : ''}
                  </div>
                ` : ''}

                ${data.explanations.length > 0 ? `
                  <div style="background: #e3f2fd; padding: 10px; border-radius: 6px; font-size: 12px; color: #1565c0;">
                    <strong>📖 Explicação:</strong> ${data.explanations[0]}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}

        <h2 style="color: #2e7d32; border-bottom: 3px solid #2e7d32; padding-bottom: 10px; margin-top: 40px;">
          🌿 Alternativas Terapêuticas Naturais
        </h2>

        ${Object.entries(NATURAL_ALTERNATIVES).map(([category, alternatives]) => `
          <div style="page-break-inside: avoid; margin: 20px 0;">
            <h3 style="color: #2e7d32; margin-bottom: 10px;">${category}</h3>
            <ul style="margin: 5px 0; padding-left: 20px; font-size: 13px;">
              ${alternatives.map(alt => `<li style="margin: 5px 0;">${alt}</li>`).join('')}
            </ul>
          </div>
        `).join('')}

        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 30px; border-left: 4px solid #ff9800;">
          <p style="margin: 0; font-size: 12px; color: #f57c00;">
            <strong>⚠️ IMPORTANTE:</strong> Este documento é informativo e não substitui a orientação médica. 
            Qualquer alteração ou suspensão de medicamentos deve ser feita apenas com acompanhamento profissional. 
            A suplementação nutricional deve ser individualizada conforme exames laboratoriais e condição clínica.
          </p>
        </div>

        <div style="margin-top: 30px; padding: 15px; background: #f5f5f5; border-radius: 8px; text-align: center; font-size: 12px; color: #666;">
          <p style="margin: 0;">Documento baseado em evidências da Medicina Funcional Integrativa.</p>
          <p style="margin: 5px 0 0 0;">Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
        </div>
      </div>
    `;

    return html;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        {/* Cabeçalho */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }} className="no-print">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <MedicationIcon sx={{ fontSize: 40, color: '#d32f2f' }} />
            <Typography variant="h4" sx={{ color: '#d32f2f', fontWeight: 600 }}>
              Interações Medicamentosas
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Voltar
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              disabled={selectedDrugs.length === 0}
            >
              Imprimir
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadPdf}
              disabled={selectedDrugs.length === 0}
              sx={{
                bgcolor: '#d32f2f',
                '&:hover': { bgcolor: '#b71c1c' }
              }}
            >
              Baixar PDF
            </Button>
          </Box>
        </Box>

        {/* Dados do Paciente */}
        {patientData && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Interagente: {patientData.q01_nome}
            </Typography>
            {patientData.q24_medicamentos_uso && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Medicamentos relatados:</strong> {patientData.q24_medicamentos_uso}
              </Typography>
            )}
          </Alert>
        )}

        {/* Instruções */}
        <Alert severity="warning" icon={<WarningIcon />} sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Selecione os medicamentos que o interagente está tomando.</strong> O sistema identificará automaticamente 
            as depleções nutricionais e fornecerá dosagens terapêuticas para reposição, além de alternativas naturais 
            para redução gradual dos medicamentos.
          </Typography>
        </Alert>

        {/* Campo de Busca */}
        <Card sx={{ mb: 3, bgcolor: '#e3f2fd' }} className="no-print">
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <SearchIcon sx={{ color: '#1976d2', fontSize: 28 }} />
              <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>
                Buscar Medicamentos
              </Typography>
            </Box>
            <TextField
              fullWidth
              placeholder="Digite o nome do medicamento, princípio ativo ou nome comercial (ex: Losartana, Cozaar, AAS, Aspirina)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#1976d2' }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearchTerm('')}
                      edge="end"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                },
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              {searchTerm ? (
                <>
                  Mostrando medicamentos que correspondem a "<strong>{searchTerm}</strong>"
                </>
              ) : (
                <>
                  💡 <strong>Dica:</strong> Use o campo de busca para encontrar rapidamente medicamentos por nome genérico, 
                  comercial ou categoria (ex: "estatina", "pressão", "diabetes")
                </>
              )}
            </Typography>
          </CardContent>
        </Card>

        {/* Resumo de Seleção */}
        {selectedDrugs.length > 0 && (
          <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: '#d32f2f' }}>
              📋 Medicamentos Selecionados ({selectedDrugs.length}):
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedDrugs.map(drug => (
                <Chip
                  key={drug}
                  label={drug}
                  onDelete={() => handleDrugToggle(drug)}
                  sx={{
                    bgcolor: '#d32f2f',
                    color: 'white',
                    '& .MuiChip-deleteIcon': {
                      color: 'rgba(255,255,255,0.7)',
                      '&:hover': { color: 'white' }
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Medicamentos por Categoria */}
        <Typography variant="h6" sx={{ mb: 2, color: '#d32f2f', fontWeight: 600 }}>
          💊 Selecione os Medicamentos:
        </Typography>

        {sortedCategories.map((category) => {
          const drugs = drugsByCategory[category];
          const filteredDrugs = getFilteredDrugs(drugs);
          
          // Pular categoria se não houver medicamentos após o filtro
          if (filteredDrugs.length === 0) return null;
          
          const categoryDepletions = getDepletionsForCategory(category);
          const hasSelectedInCategory = filteredDrugs.some(d => selectedDrugs.includes(d));

          return (
            <Box key={category} sx={{ mb: 3 }}>
              {/* Categoria e Medicamentos em linha */}
              <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MedicationIcon sx={{ mr: 1, color: '#d32f2f' }} />
                  <Typography sx={{ fontWeight: 600, color: '#d32f2f' }}>
                    {category}
                  </Typography>
                  <Chip
                    size="small"
                    label={`${drugs.filter(d => selectedDrugs.includes(d)).length}/${filteredDrugs.length}${searchTerm ? ` (${drugs.length} total)` : ''}`}
                    sx={{ ml: 2 }}
                  />
                </Box>
                
                {/* Medicamentos em chips lado a lado */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {filteredDrugs.map(drug => {
                    const drugDetails = DRUG_DETAILS[drug];
                    return (
                      <Tooltip
                        key={drug}
                        title={
                          drugDetails ? (
                            <Box sx={{ p: 0.5 }}>
                              <Typography variant="caption" sx={{ display: 'block', fontWeight: 600 }}>
                                {drug}
                              </Typography>
                              {drugDetails.comercialNames && (
                                <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                                  💊 {drugDetails.comercialNames.join(', ')}
                                </Typography>
                              )}
                              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic' }}>
                                Clique para {selectedDrugs.includes(drug) ? 'remover' : 'adicionar'}
                              </Typography>
                            </Box>
                          ) : (
                            `Clique para ${selectedDrugs.includes(drug) ? 'remover' : 'adicionar'}`
                          )
                        }
                        arrow
                        placement="top"
                      >
                        <Chip
                          label={drug}
                          onClick={() => handleDrugToggle(drug)}
                          color={selectedDrugs.includes(drug) ? "error" : "default"}
                          variant={selectedDrugs.includes(drug) ? "filled" : "outlined"}
                          sx={{ 
                            cursor: 'pointer',
                            fontWeight: selectedDrugs.includes(drug) ? 600 : 400,
                            '&:hover': {
                              transform: 'scale(1.05)',
                              transition: 'transform 0.2s',
                            }
                          }}
                        />
                      </Tooltip>
                    );
                  })}
                </Box>
              </Box>

              {/* Informações Detalhadas dos Medicamentos Selecionados */}
              {hasSelectedInCategory && filteredDrugs.filter(d => selectedDrugs.includes(d)).length > 0 && (
                <Box sx={{ mb: 2 }}>
                  {filteredDrugs.filter(d => selectedDrugs.includes(d)).map(drug => {
                    const drugDetails = DRUG_DETAILS[drug];
                    if (!drugDetails) return null;
                    
                    return (
                      <Accordion key={`detail-${drug}`} sx={{ mb: 1, bgcolor: '#e8f5e9' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <InfoIcon sx={{ color: '#2e7d32' }} />
                            <Typography sx={{ fontWeight: 600 }}>
                              Informações Detalhadas: {drug}
                            </Typography>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <TableContainer>
                            <Table size="small">
                              <TableBody>
                                {drugDetails.comercialNames && (
                                  <TableRow>
                                    <TableCell sx={{ fontWeight: 600, width: '30%', bgcolor: '#f5f5f5' }}>
                                      💊 Nomes Comerciais:
                                    </TableCell>
                                    <TableCell>
                                      {drugDetails.comercialNames.join(', ')}
                                    </TableCell>
                                  </TableRow>
                                )}
                                {drugDetails.activeIngredient && (
                                  <TableRow>
                                    <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                                      🧪 Princípio Ativo:
                                    </TableCell>
                                    <TableCell>{drugDetails.activeIngredient}</TableCell>
                                  </TableRow>
                                )}
                                {drugDetails.dosage && (
                                  <TableRow>
                                    <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                                      ⚖️ Dosagem:
                                    </TableCell>
                                    <TableCell>{drugDetails.dosage}</TableCell>
                                  </TableRow>
                                )}
                                {drugDetails.posology && (
                                  <TableRow>
                                    <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                                      ⏰ Posologia:
                                    </TableCell>
                                    <TableCell>{drugDetails.posology}</TableCell>
                                  </TableRow>
                                )}
                                {drugDetails.indications && (
                                  <TableRow>
                                    <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                                      ✅ Indicações:
                                    </TableCell>
                                    <TableCell>
                                      <Box component="ul" sx={{ m: 0, pl: 2 }}>
                                        {drugDetails.indications.map((indication, idx) => (
                                          <li key={idx}>{indication}</li>
                                        ))}
                                      </Box>
                                    </TableCell>
                                  </TableRow>
                                )}
                                {drugDetails.contraindications && (
                                  <TableRow>
                                    <TableCell sx={{ fontWeight: 600, bgcolor: '#ffebee' }}>
                                      ⛔ Contraindicações:
                                    </TableCell>
                                    <TableCell>
                                      <Box component="ul" sx={{ m: 0, pl: 2, color: '#d32f2f' }}>
                                        {drugDetails.contraindications.map((contra, idx) => (
                                          <li key={idx}>{contra}</li>
                                        ))}
                                      </Box>
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Box>
              )}

              {/* Depleções desta categoria */}
              {hasSelectedInCategory && Object.keys(categoryDepletions).length > 0 && (
                <Box sx={{ mt: 2, p: 2, bgcolor: '#fff3e0', borderRadius: 2, border: '2px solid #ff5722' }}>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#d32f2f' }}>
                    ⚠️ Depleções Nutricionais - {category}:
                  </Typography>

                  {Object.entries(categoryDepletions)
                    .sort((a, b) => b[1].count - a[1].count)
                    .map(([nutrient, data]) => {
                      const dosageInfo = NUTRIENT_DOSAGES[nutrient];
                      return (
                        <Card key={nutrient} sx={{ mb: 2, border: '1px solid #ff9800' }}>
                          <CardContent sx={{ pb: '16px !important' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Chip
                                label={`${data.count}x`}
                                size="small"
                                sx={{
                                  bgcolor: '#ff5722',
                                  color: 'white',
                                  fontWeight: 'bold',
                                  mr: 1
                                }}
                              />
                              <Typography variant="subtitle2" sx={{ color: '#d32f2f', fontWeight: 600 }}>
                                {nutrient}
                              </Typography>
                            </Box>

                            <Typography variant="caption" sx={{ display: 'block', mb: 1, color: '#666' }}>
                              <strong>Causado por:</strong> {data.drugs.join(', ')}
                            </Typography>

                            {dosageInfo && (
                              <Box sx={{ bgcolor: '#e8f5e9', p: 1.5, borderRadius: 1, mt: 1 }}>
                                <Grid container spacing={1}>
                                  <Grid item xs={12} sm={4}>
                                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#2e7d32', display: 'block' }}>
                                      💊 Dosagem:
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{dosageInfo.dosage}</Typography>
                                  </Grid>
                                  <Grid item xs={12} sm={4}>
                                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#2e7d32', display: 'block' }}>
                                      ⏰ Posologia:
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{dosageInfo.posology}</Typography>
                                  </Grid>
                                  <Grid item xs={12} sm={4}>
                                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#2e7d32', display: 'block' }}>
                                      📅 Duração:
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{dosageInfo.duration}</Typography>
                                  </Grid>
                                </Grid>
                                {dosageInfo.precautions && (
                                  <Alert severity="warning" sx={{ mt: 1, py: 0.5 }}>
                                    <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>
                                      <strong>⚠️ Precauções:</strong> {dosageInfo.precautions}
                                    </Typography>
                                  </Alert>
                                )}
                              </Box>
                            )}

                            {data.explanations.length > 0 && (
                              <Accordion sx={{ mt: 1, boxShadow: 'none', '&:before': { display: 'none' } }}>
                                <AccordionSummary 
                                  expandIcon={<ExpandMoreIcon />}
                                  sx={{ minHeight: 'unset', p: 0.5, '& .MuiAccordionSummary-content': { my: 0.5 } }}
                                >
                                  <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                                    📖 Explicação Científica
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ p: 1, pt: 0 }}>
                                  <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem' }}>
                                    {data.explanations[0]}
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                </Box>
              )}
            </Box>
          );
        })}

        {/* Alternativas Terapêuticas */}
        {selectedDrugs.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32', fontWeight: 600 }}>
              🌿 Alternativas Terapêuticas Naturais:
            </Typography>

            <Alert severity="success" icon={<LocalHospitalIcon />} sx={{ mb: 3 }}>
              <Typography variant="body2">
                As opções abaixo podem ajudar a <strong>reduzir gradualmente a dependência de medicamentos</strong>, 
                sempre com acompanhamento profissional. Nunca suspenda medicamentos sem orientação médica.
              </Typography>
            </Alert>

            {Object.entries(NATURAL_ALTERNATIVES).map(([category, alternatives]) => (
              <Accordion key={category} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ScienceIcon sx={{ mr: 1, color: '#2e7d32' }} />
                    <Typography sx={{ fontWeight: 600 }}>{category}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {alternatives.map((alt, idx) => (
                      <Typography component="li" key={idx} variant="body2" sx={{ mb: 1 }}>
                        {alt}
                      </Typography>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}

        {/* Mensagem quando nada selecionado */}
        {selectedDrugs.length === 0 && (
          <Alert severity="info" sx={{ mt: 3 }}>
            Selecione os medicamentos que o interagente está tomando para identificar as depleções nutricionais 
            e receber recomendações terapêuticas personalizadas.
          </Alert>
        )}
      </Paper>

      <SaveToPatientBar
        moduleKey="drugInteractions"
        getData={() => selectedDrugs.length > 0 ? {
          selectedDrugs,
          depletions: allDepletions,
          savedAt: new Date().toISOString(),
        } : null}
        label="Salvar interações medicamentosas no interagente"
      />
    </Container>
  );
}
