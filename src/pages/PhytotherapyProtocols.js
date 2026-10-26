import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MEDICINAL_PLANTS from '../data/medicinalPlants';
import { EXPANDED_PHYTOTHERAPY_DATABASE } from '../data/expandedPhytotherapyDatabase';
import { getAllSymptoms, convertSpreadsheetToProtocol } from '../data/phytotherapySpreadsheetData';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Autocomplete,
  Card,
  CardContent,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Stack,
  Badge,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl } from '../components/PrintTemplate';
import {
  ExpandMore as ExpandMoreIcon,
  LocalFlorist as FloristIcon,
  Healing as HealingIcon,
  Science as ScienceIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Search as SearchIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  ErrorOutline as ErrorOutlineIcon,
  MedicalServices as MedicalServicesIcon,
  Biotech as BiotechIcon,
  CheckCircle as CheckCircleIcon,
  TableChart as TableChartIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { usePatientIntegration } from '../hooks/usePatientIntegration';
import PrescriptionHeader from '../components/PrescriptionHeader';
import PrescriptionFooter from '../components/PrescriptionFooter';
import PrescriptionActions from '../components/PrescriptionActions';

// Base de dados de protocolos fitoterápicos (BANCO EXPANDIDO)
const PHYTOTHERAPY_DATABASE = EXPANDED_PHYTOTHERAPY_DATABASE;

// Manter compatibilidade com protocolos antigos se existirem
const LEGACY_PROTOCOLS = {
  // Sistema Digestivo
  'Gastrite e Úlcera': {
    category: 'Sistema Digestivo',
    indications: ['Gastrite aguda', 'Gastrite crônica', 'Úlcera péptica', 'Dispepsia', 'Hiperacidez'],
    protocol: [
      {
        plant: 'Espinheira-santa (Maytenus ilicifolia)',
        partUsed: 'Folhas',
        dosage: '3g folhas/dia',
        posology: 'Infusão: 1 colher sopa (3g) para 150ml água. Tomar 3x ao dia, 30min antes das refeições',
        duration: '4-8 semanas',
        properties: 'Antiulcerogênica, gastroprotetora, cicatrizante',
        evidenceLevel: 'Alta',
        drugInteractions: 'Pode potencializar efeitos de antiácidos',
        plantInteractions: 'Evitar uso concomitante com plantas adstringentes'
      },
      {
        plant: 'Camomila (Matricaria chamomilla)',
        partUsed: 'Flores',
        dosage: '3-6g flores/dia',
        posology: 'Infusão: 1 colher sopa para 200ml água. Tomar 3-4x ao dia',
        duration: '2-4 semanas',
        properties: 'Anti-inflamatória, antiespasmódica, calmante',
        evidenceLevel: 'Média',
        drugInteractions: 'Pode potencializar anticoagulantes',
        plantInteractions: 'Sinergia com melissa e hortelã'
      },
      {
        plant: 'Alcaçuz (Glycyrrhiza glabra)',
        partUsed: 'Raiz',
        dosage: '5-15g raiz/dia',
        posology: 'Decocção: 1-3 colheres de chá para 200ml. Tomar 3x ao dia',
        duration: 'Máximo 4 semanas',
        properties: 'Antiulcerogênico, anti-inflamatório',
        evidenceLevel: 'Alta',
        drugInteractions: 'ATENÇÃO: Potencializa corticoides, reduz efeito de anti-hipertensivos, pode causar hipocalemia',
        plantInteractions: 'Evitar com diuréticos vegetais'
      },
    ],
    contraindications: [
      'Alcaçuz: hipertensão, hipocalemia, gestação',
      'Espinheira-santa: gestação e lactação',
    ],
    interactions: [
      'Alcaçuz: pode potencializar corticoides e reduzir efeito de anti-hipertensivos',
      'Não usar com antiácidos (aguardar 2h)',
    ],
    observations: 'Evitar alimentos irritantes. H. pylori pode necessitar tratamento convencional associado.',
  },

  'Constipação Intestinal': {
    category: 'Sistema Digestivo',
    indications: ['Constipação crônica', 'Intestino preso', 'Síndrome do intestino lento'],
    protocol: [
      {
        plant: 'Psyllium (Plantago ovata)',
        dosage: '10-30g/dia',
        posology: '1-2 colheres de sopa em 200-300ml água. Tomar 2-3x ao dia com bastante líquido',
        duration: 'Uso contínuo permitido',
        properties: 'Laxante formador de bolo, prebiótico',
      },
      {
        plant: 'Linhaça (Linum usitatissimum)',
        dosage: '10-30g sementes/dia',
        posology: '1-2 colheres de sopa moídas. Misturar em água, iogurte ou frutas. 2-3x ao dia',
        duration: 'Uso prolongado',
        properties: 'Laxante, anti-inflamatório, fonte de ômega-3',
      },
      {
        plant: 'Sene (Cassia angustifolia)',
        dosage: '15-30mg sennosídeos/dia',
        posology: 'Infusão: 1-2g folhas para 150ml. Tomar à noite',
        duration: 'Máximo 1-2 semanas',
        properties: 'Laxante estimulante',
      },
    ],
    contraindications: [
      'Sene: gestação, lactação, doenças inflamatórias intestinais, obstrução intestinal',
      'Psyllium: obstrução intestinal, dificuldade de deglutição',
    ],
    interactions: [
      'Sene: pode reduzir absorção de medicamentos - tomar 2h de distância',
      'Fibras: podem interferir na absorção de minerais',
    ],
    observations: 'Hidratação adequada é essencial (2-3L água/dia). Sene apenas para uso pontual.',
  },

  'Síndrome do Intestino Irritável': {
    category: 'Sistema Digestivo',
    indications: ['SII', 'Cólon irritável', 'Distúrbios funcionais intestinais'],
    protocol: [
      {
        plant: 'Hortelã-pimenta (Mentha piperita)',
        dosage: '0,2-0,4ml óleo essencial/dia',
        posology: 'Cápsulas entéricas: 1-2 cápsulas 2-3x ao dia, 30min antes das refeições',
        duration: '4-8 semanas',
        properties: 'Antiespasmódica, carminativa',
      },
      {
        plant: 'Melissa (Melissa officinalis)',
        dosage: '3-6g folhas/dia',
        posology: 'Infusão: 1-2g para 150ml. Tomar 3x ao dia',
        duration: '4-12 semanas',
        properties: 'Antiespasmódica, ansiolítica, calmante',
      },
      {
        plant: 'Funcho (Foeniculum vulgare)',
        dosage: '5-7g sementes/dia',
        posology: 'Infusão: 1 colher de chá para 150ml. Tomar 3x ao dia',
        duration: 'Uso prolongado',
        properties: 'Carminativo, antiespasmódico',
      },
    ],
    contraindications: [
      'Hortelã: DRGE, gestação no 1º trimestre',
      'Melissa: hipotireoidismo (monitorar)',
    ],
    interactions: [
      'Hortelã: pode potencializar sedativos',
    ],
    observations: 'Dieta low FODMAP pode ser associada. Gerenciar estresse é fundamental.',
  },

  // Sistema Cardiovascular
  'Hipertensão Arterial': {
    category: 'Sistema Cardiovascular',
    indications: ['Hipertensão leve a moderada', 'Coadjuvante no tratamento da HAS'],
    protocol: [
      {
        plant: 'Alho (Allium sativum)',
        dosage: '600-1200mg extrato/dia (equivalente a 1-2 dentes)',
        posology: 'Extrato seco: 300-600mg 2x ao dia ou 1-2 dentes frescos/dia',
        duration: 'Uso prolongado (mínimo 12 semanas)',
        properties: 'Anti-hipertensivo, vasodilatador, antiagregante',
      },
      {
        plant: 'Hibisco (Hibiscus sabdariffa)',
        dosage: '1,5-3g flores/dia',
        posology: 'Infusão: 1,5g para 200ml. Tomar 2x ao dia',
        duration: '8-12 semanas',
        properties: 'Anti-hipertensivo, diurético, antioxidante',
      },
      {
        plant: 'Oliveira (Olea europaea)',
        dosage: '500-1000mg extrato folhas/dia',
        posology: 'Extrato padronizado: 250-500mg 2x ao dia',
        duration: 'Uso prolongado',
        properties: 'Anti-hipertensivo, vasodilatador',
      },
    ],
    contraindications: [
      'Alho: cirurgias (suspender 7 dias antes), uso de anticoagulantes',
      'Hibisco: hipotensão',
    ],
    interactions: [
      'Alho: POTENCIALIZA anticoagulantes e antiagregantes',
      'Hibisco: pode potencializar anti-hipertensivos',
    ],
    observations: 'Monitorar PA regularmente. Não suspender medicação sem orientação médica.',
  },

  'Hipercolesterolemia': {
    category: 'Sistema Cardiovascular',
    indications: ['Colesterol alto', 'Dislipidemia', 'Prevenção cardiovascular'],
    protocol: [
      {
        plant: 'Berberina (Berberis vulgaris)',
        dosage: '900-1500mg/dia',
        posology: '500mg 2-3x ao dia, antes das refeições',
        duration: '3-6 meses',
        properties: 'Hipolipemiante, hipoglicemiante',
      },
      {
        plant: 'Alcachofra (Cynara scolymus)',
        dosage: '600-1800mg extrato/dia',
        posology: 'Extrato seco: 300-600mg 3x ao dia, antes das refeições',
        duration: '6-12 semanas',
        properties: 'Hipolipemiante, hepatoprotetor, colerético',
      },
      {
        plant: 'Chá verde (Camellia sinensis)',
        dosage: '2-3 xícaras/dia',
        posology: 'Infusão: 2g folhas para 200ml. Tomar 2-3x ao dia',
        duration: 'Uso prolongado',
        properties: 'Antioxidante, hipolipemiante leve',
      },
    ],
    contraindications: [
      'Berberina: gestação, lactação',
      'Chá verde: insônia, ansiedade (cafeína)',
    ],
    interactions: [
      'Berberina: pode potencializar metformina e estatinas',
      'Chá verde: pode interferir com betabloqueadores',
    ],
    observations: 'Dieta e exercício são fundamentais. Monitorar lipidograma.',
  },

  // Sistema Nervoso
  'Ansiedade e Estresse': {
    category: 'Sistema Nervoso',
    indications: ['Ansiedade leve a moderada', 'Estresse', 'Tensão nervosa'],
    protocol: [
      {
        plant: 'Passiflora (Passiflora incarnata)',
        dosage: '4-8g planta seca/dia',
        posology: 'Infusão: 2-4g para 150ml. Tomar 2-3x ao dia. Tintura: 2-4ml 3x ao dia',
        duration: '4-8 semanas',
        properties: 'Ansiolítica, sedativa leve',
      },
      {
        plant: 'Valeriana (Valeriana officinalis)',
        dosage: '300-600mg extrato/dia',
        posology: 'Extrato seco: 300-600mg à noite. Para ansiedade: 150-300mg 2-3x ao dia',
        duration: '2-4 semanas',
        properties: 'Ansiolítica, sedativa, miorrelaxante',
      },
      {
        plant: 'Ashwagandha (Withania somnifera)',
        dosage: '300-600mg extrato/dia',
        posology: 'Extrato padronizado: 300mg 2x ao dia',
        duration: '8-12 semanas',
        properties: 'Adaptógena, ansiolítica, antistress',
      },
    ],
    contraindications: [
      'Valeriana: gestação, lactação, uso com álcool',
      'Passiflora: gestação no 1º trimestre',
      'Ashwagandha: hipertireoidismo não controlado',
    ],
    interactions: [
      'Valeriana e Passiflora: POTENCIALIZAM sedativos e benzodiazepínicos',
      'Não usar com álcool',
    ],
    observations: 'Evitar dirigir ao iniciar uso. Não suspender benzodiazepínicos abruptamente.',
  },

  'Insônia': {
    category: 'Sistema Nervoso',
    indications: ['Insônia inicial', 'Dificuldade para dormir', 'Sono não reparador'],
    protocol: [
      {
        plant: 'Valeriana (Valeriana officinalis)',
        dosage: '400-900mg extrato/dia',
        posology: 'Extrato seco: 400-900mg 30-60min antes de dormir',
        duration: '2-4 semanas',
        properties: 'Sedativa, indutora do sono',
      },
      {
        plant: 'Melissa (Melissa officinalis)',
        dosage: '300-600mg extrato/dia',
        posology: 'Extrato: 300mg 2x ao dia (última dose à noite)',
        duration: '4-8 semanas',
        properties: 'Sedativa leve, ansiolítica',
      },
      {
        plant: 'Lavanda (Lavandula angustifolia)',
        dosage: '80-160mg óleo essencial/dia',
        posology: 'Cápsulas: 80mg 1-2x ao dia. Aromaterapia: difusor no quarto',
        duration: '2-6 semanas',
        properties: 'Sedativa, ansiolítica, relaxante',
      },
    ],
    contraindications: [
      'Valeriana: gestação, hepatopatias graves',
      'Lavanda: hipotensão severa',
    ],
    interactions: [
      'Potencializa sedativos e álcool',
      'Pode aumentar efeito de benzodiazepínicos',
    ],
    observations: 'Higiene do sono é fundamental. Evitar telas 1h antes de dormir.',
  },

  // Sistema Imunológico
  'Imunidade Baixa': {
    category: 'Sistema Imunológico',
    indications: ['Imunodeficiência leve', 'Prevenção de infecções', 'Infecções recorrentes'],
    protocol: [
      {
        plant: 'Equinácea (Echinacea purpurea)',
        dosage: '900mg extrato/dia',
        posology: 'Extrato: 300mg 3x ao dia. Uso por 10 dias, pausa de 3 dias',
        duration: 'Ciclos de 8-12 semanas',
        properties: 'Imunoestimulante, antiviral, antibacteriana',
      },
      {
        plant: 'Própolis',
        dosage: '400-500mg extrato/dia',
        posology: 'Extrato padronizado: 200mg 2x ao dia ou 20-30 gotas tintura 3x ao dia',
        duration: 'Uso prolongado',
        properties: 'Imunomodulador, antimicrobiano, antioxidante',
      },
      {
        plant: 'Unha-de-gato (Uncaria tomentosa)',
        dosage: '20-350mg extrato/dia',
        posology: 'Extrato padronizado: 20-60mg 2x ao dia',
        duration: '6-12 semanas',
        properties: 'Imunomoduladora, anti-inflamatória',
      },
    ],
    contraindications: [
      'Equinácea: doenças autoimunes, HIV, tuberculose',
      'Própolis: alergia a produtos da colmeia',
      'Unha-de-gato: transplantados, doenças autoimunes',
    ],
    interactions: [
      'Equinácea: pode interferir com imunossupressores',
      'Própolis: pode potencializar anticoagulantes',
    ],
    observations: 'Vitamina C e D otimizam resultados. Avaliar causas subjacentes.',
  },

  // Sistema Respiratório
  'Gripes e Resfriados': {
    category: 'Sistema Respiratório',
    indications: ['Gripe', 'Resfriado', 'Sinusite', 'Rinite'],
    protocol: [
      {
        plant: 'Guaco (Mikania glomerata)',
        dosage: '1,5-4,5g folhas/dia',
        posology: 'Xarope: 5-15ml 3x ao dia. Infusão: 1,5g para 150ml, 3x ao dia',
        duration: '7-14 dias',
        properties: 'Expectorante, broncodilatador, antitussígeno',
      },
      {
        plant: 'Gengibre (Zingiber officinale)',
        dosage: '2-4g rizoma/dia',
        posology: 'Infusão: 1-2g para 200ml. Tomar 3-4x ao dia',
        duration: '5-10 dias',
        properties: 'Anti-inflamatório, antiviral, expectorante',
      },
      {
        plant: 'Sabugueiro (Sambucus nigra)',
        dosage: '15-30ml xarope/dia',
        posology: 'Xarope: 5-10ml 3x ao dia',
        duration: '5-7 dias',
        properties: 'Antiviral, imunoestimulante',
      },
    ],
    contraindications: [
      'Guaco: anticoagulantes (cumarina)',
      'Gengibre: cálculos biliares, uso pré-operatório',
    ],
    interactions: [
      'Guaco: ATENÇÃO com anticoagulantes',
      'Gengibre: pode potencializar anticoagulantes',
    ],
    observations: 'Hidratação abundante. Mel potencializa ação antitussígena.',
  },

  // Sistema Metabólico
  'Diabetes Tipo 2': {
    category: 'Sistema Metabólico',
    indications: ['Diabetes tipo 2 leve', 'Pré-diabetes', 'Resistência insulínica'],
    protocol: [
      {
        plant: 'Pata-de-vaca (Bauhinia forficata)',
        dosage: '2-6g folhas/dia',
        posology: 'Infusão: 2g para 150ml. Tomar 3x ao dia, antes das refeições',
        duration: 'Uso prolongado com monitoramento',
        properties: 'Hipoglicemiante',
      },
      {
        plant: 'Canela (Cinnamomum verum)',
        dosage: '1-6g/dia',
        posology: 'Pó: 1-3g 2x ao dia com alimentos',
        duration: 'Uso prolongado',
        properties: 'Hipoglicemiante, sensibilizador insulínico',
      },
      {
        plant: 'Jambolão (Syzygium cumini)',
        dosage: '2-4g sementes/dia',
        posology: 'Pó: 1-2g 2x ao dia antes das refeições',
        duration: 'Uso prolongado com acompanhamento',
        properties: 'Hipoglicemiante',
      },
    ],
    contraindications: [
      'Todos: hipoglicemia, cirurgia (suspender 2 semanas antes)',
      'Canela: hepatopatias (cumarina)',
    ],
    interactions: [
      'POTENCIALIZAM hipoglicemiantes orais e insulina',
      'Monitorar glicemia rigorosamente',
      'Ajustar doses de medicamentos',
    ],
    observations: 'NUNCA suspender medicação. Monitorar HbA1c. Dieta e exercício fundamentais.',
  },

  // Sistema Urinário
  'Infecção Urinária': {
    category: 'Sistema Urinário',
    indications: ['ITU de repetição (prevenção)', 'Cistite leve', 'Profilaxia'],
    protocol: [
      {
        plant: 'Cranberry (Vaccinium macrocarpon)',
        dosage: '500-1500mg extrato/dia',
        posology: 'Extrato: 500mg 2-3x ao dia ou 240-480ml suco/dia',
        duration: 'Uso prolongado (prevenção)',
        properties: 'Antiadesivo bacteriano, prevenção de ITU',
      },
      {
        plant: 'Cavalinha (Equisetum arvense)',
        dosage: '2-6g planta/dia',
        posology: 'Infusão: 2-3g para 150ml. Tomar 2-3x ao dia',
        duration: '2-3 semanas',
        properties: 'Diurética, remineralizante, anti-inflamatória',
      },
      {
        plant: 'Uva-ursi (Arctostaphylos uva-ursi)',
        dosage: '400-800mg extrato/dia',
        posology: 'Extrato: 400mg 2x ao dia por máximo 7 dias',
        duration: 'Máximo 7 dias, 5x ao ano',
        properties: 'Antisséptica urinária',
      },
    ],
    contraindications: [
      'Uva-ursi: gestação, lactação, crianças <12 anos, hepatopatias',
      'Cavalinha: edema por ICC ou insuficiência renal',
    ],
    interactions: [
      'Cavalinha: pode aumentar efeito de diuréticos',
      'Cranberry: pode potencializar varfarina (monitorar INR)',
    ],
    observations: 'Hidratação abundante (2-3L/dia). ITU aguda requer antibiótico.',
  },

  // Saúde da Mulher
  'Tensão Pré-Menstrual (TPM)': {
    category: 'Saúde da Mulher',
    indications: ['TPM', 'Dismenorreia', 'Sintomas pré-menstruais'],
    protocol: [
      {
        plant: 'Vitex (Vitex agnus-castus)',
        dosage: '20-40mg extrato/dia',
        posology: 'Extrato seco: 20-40mg pela manhã, em jejum',
        duration: 'Mínimo 3 ciclos (3 meses)',
        properties: 'Regulador hormonal, dopaminérgico',
      },
      {
        plant: 'Dong Quai (Angelica sinensis)',
        dosage: '3-6g raiz/dia',
        posology: 'Extrato: 500mg 3x ao dia',
        duration: '2-3 meses',
        properties: 'Regulador menstrual, antiespasmódico',
      },
      {
        plant: 'Camomila (Matricaria chamomilla)',
        dosage: '3-6g flores/dia',
        posology: 'Infusão: 2g para 150ml. Tomar 3x ao dia',
        duration: 'Durante sintomas',
        properties: 'Antiespasmódica, calmante, anti-inflamatória',
      },
    ],
    contraindications: [
      'Vitex: gestação, lactação, uso de contraceptivos hormonais',
      'Dong Quai: anticoagulantes, gestação',
    ],
    interactions: [
      'Vitex: pode interferir com dopaminérgicos e contraceptivos',
      'Dong Quai: POTENCIALIZA anticoagulantes',
    ],
    observations: 'Magnésio e B6 potencializam resultados. Reduzir cafeína e sal.',
  },
};

// Categoria de cores
const CATEGORY_COLORS = {
  'Sistema Digestivo': '#4caf50',
  'Sistema Cardiovascular': '#f44336',
  'Sistema Nervoso': '#9c27b0',
  'Sistema Imunológico': '#ff9800',
  'Sistema Respiratório': '#03a9f4',
  'Sistema Metabólico': '#ffeb3b',
  'Sistema Urinário': '#00bcd4',
  'Saúde da Mulher': '#e91e63',
  'Saúde do Homem': '#1565c0',
  'Sistema Musculoesquelético': '#795548',
  'Pele e Dermatologia': '#ff7043',
  'Saúde Ocular': '#00897b',
};

export default function PhytotherapyProtocols() {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const { patientData, saveToPatient, goToDashboard } = usePatientIntegration('phytotherapyProtocols');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [selectedProtocols, setSelectedProtocols] = useState([]); // Array de protocolos acumulados
  const [showPrescriptionPreview, setShowPrescriptionPreview] = useState(false);
  
  // Novos estados para busca de plantas individuais
  const [plantSearchQuery, setPlantSearchQuery] = useState('');
  const [plantSearchResults, setPlantSearchResults] = useState([]);
  const [selectedPlantId, setSelectedPlantId] = useState(null);
  const [exportingPlants, setExportingPlants] = useState(false);
  const [viewMode, setViewMode] = useState('protocols'); // 'protocols' ou 'plants'
  const [isPrinting, setIsPrinting] = useState(false);

  // Estado para modal do catálogo de plantas
  const [plantModalOpen, setPlantModalOpen] = useState(false);
  const [plantModalData, setPlantModalData] = useState(null);

  const handleOpenPlantModal = (plant) => {
    setPlantModalData(plant);
    setPlantModalOpen(true);
  };
  const handleClosePlantModal = () => {
    setPlantModalOpen(false);
    setPlantModalData(null);
  };

  // Log para debug
  useEffect(() => {
    console.log('PhytotherapyProtocols mounted');
    console.log('patientData:', patientData);
    console.log('viewMode:', viewMode);
    console.log('showPrescriptionPreview:', showPrescriptionPreview);
  }, [patientData, viewMode, showPrescriptionPreview]);

  // Carregar dados salvos do paciente
  useEffect(() => {
    if (patientData) {
      // Carregar dados salvos anteriormente
      if (patientData.phytotherapyProtocols) {
        const saved = patientData.phytotherapyProtocols;
        if (saved.selectedProtocols) setSelectedProtocols(saved.selectedProtocols);
        if (saved.selectedProtocol) setSelectedProtocol(saved.selectedProtocol);
      }
    }
  }, [patientData]);

  // Salvar dados automaticamente
  useEffect(() => {
    if (selectedProtocols.length > 0 || selectedProtocol) {
      saveToPatient({
        selectedProtocols,
        selectedProtocol,
        updatedAt: new Date().toISOString()
      });
    }
  }, [selectedProtocols, selectedProtocol, saveToPatient]);

  const categories = ['all', ...new Set(Object.values(PHYTOTHERAPY_DATABASE).map(p => p.category))];

  // Lista completa unificada: combina planilha + banco expandido
  const spreadsheetSymptomSet = new Set(getAllSymptoms());
  const expandedConditionSet = new Set(Object.keys(PHYTOTHERAPY_DATABASE));
  const spreadsheetConditions = Array.from(
    new Set([
      ...spreadsheetSymptomSet,
      ...expandedConditionSet,
    ])
  )
    .sort((a, b) => a.localeCompare(b, 'pt-BR'))
    .map((name) => {
      const inSpreadsheet = spreadsheetSymptomSet.has(name);
      const inExpanded = expandedConditionSet.has(name);
      let source = 'expanded';
      if (inSpreadsheet && inExpanded) source = 'both';
      else if (inSpreadsheet) source = 'spreadsheet';

      return { name, source };
    });

  const unifiedConditions = spreadsheetConditions
    .map((condition) => {
      const spreadsheetProtocol = convertSpreadsheetToProtocol(condition.name);
      const databaseProtocol = PHYTOTHERAPY_DATABASE[condition.name]
        ? { name: condition.name, ...PHYTOTHERAPY_DATABASE[condition.name] }
        : null;
      const protocol = databaseProtocol || spreadsheetProtocol;
      const category = protocol?.category || 'Não categorizado';
      const indications = protocol?.indications || [];
      const search = searchTerm.toLowerCase();
      const matchCategory = selectedCategory === 'all' || category === selectedCategory;
      const matchSearch = !search ||
        condition.name.toLowerCase().includes(search) ||
        indications.some((ind) => ind.toLowerCase().includes(search));

      return {
        ...condition,
        category,
        protocol,
        matchCategory,
        matchSearch
      };
    })
    .filter((item) => item.protocol && item.matchCategory && item.matchSearch);

  // Array de plantas para catálogo
  const plantsArr = Object.entries(MEDICINAL_PLANTS).map(([id, data]) => ({ id, ...data }));

  // Função de busca inteligente de plantas
  const handleSearchPlant = () => {
    if (!plantSearchQuery || plantSearchQuery.trim() === '') {
      setPlantSearchResults([]);
      return;
    }
    
    const query = plantSearchQuery.toLowerCase().trim();
    const tokens = query.split(/[,;\s]+/).filter(Boolean);
    
    // Busca avançada: nome, sintomas, indicações
    const scored = plantsArr.map(p => {
      let score = 0;
      
      // Nome da planta (peso 3)
      if (p.common?.toLowerCase().includes(query)) score += 30;
      if (p.scientific?.toLowerCase().includes(query)) score += 25;
      
      // Sintomas (peso 2)
      (p.symptoms || []).forEach(s => {
        const ss = s.toLowerCase();
        tokens.forEach(t => {
          if (ss.includes(t) || t.includes(ss)) score += 20;
        });
      });
      
      // Indicações (peso 2)
      (p.indications || []).forEach(ind => {
        const ii = ind.toLowerCase();
        tokens.forEach(t => {
          if (ii.includes(t) || t.includes(ii)) score += 15;
        });
      });
      
      // Palavras-chave gerais
      const allText = [
        p.common, p.scientific, 
        ...(p.symptoms || []), 
        ...(p.indications || []),
        p.posology, p.modeOfUse
      ].join(' ').toLowerCase();
      
      tokens.forEach(t => {
        if (allText.includes(t)) score += 5;
      });
      
      return { plant: p, score };
    }).filter(s => s.score > 0).sort((a, b) => b.score - a.score);

    setPlantSearchResults(scored.map(s => s.plant));
    if (scored.length > 0) {
      setSelectedPlantId(scored[0].plant.id); // Seleciona automaticamente a melhor correspondência
    }
  };

  // Adicionar protocolo à lista de selecionados
  const handleAddProtocol = (name, data) => {
    const protocolExists = selectedProtocols.some(p => p.name === name);
    if (!protocolExists) {
      setSelectedProtocols([...selectedProtocols, { name, ...data }]);
    }
  };

  // Remover protocolo da lista
  const handleRemoveProtocol = (name) => {
    setSelectedProtocols(selectedProtocols.filter(p => p.name !== name));
  };

  // Limpar todos os protocolos selecionados
  const handleClearProtocols = () => {
    setSelectedProtocols([]);
  };

  // Helper: parse plant string like "Camomila (Matricaria chamomilla)" into common and scientific
  function parsePlantString(plantStr) {
    const match = plantStr.match(/^\s*([^\(]+?)\s*(?:\(([^\)]+)\))?\s*$/);
    if (!match) return { common: plantStr, scientific: '' };
    const common = (match[1] || '').trim();
    const scientific = (match[2] || '').trim();
    return { common, scientific };
  }

  // helper: slugify a scientific name to a file name
  const slugify = (s) => s ? s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : '';

  function getPlantImage(scientific) {
    // Por enquanto retorna placeholder para evitar erros de require dinâmico
    // TODO: Implementar importação estática de imagens
    return '/assets/plants/placeholder.svg';
  }

  function getPlantMeta(plantStr) {
    const parsed = parsePlantString(plantStr || '');
    const scientificSlug = slugify(parsed.scientific || parsed.common);
    const meta = MEDICINAL_PLANTS[scientificSlug] || { common: parsed.common, scientific: parsed.scientific || '' };
    return meta;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Botões de ação no topo */}
      <Box sx={{ mb: 3 }}>
        <PrescriptionActions
          patientData={patientData}
          contentRef={contentRef}
          contentTitle="Protocolo_Fitoterapico"
          onBack={goToDashboard}
        />
      </Box>

      <Paper sx={{ p: 3 }} id="prescription-print-area" ref={contentRef}>
        {/* Cabeçalho do Receituário (apenas para impressão) */}
        <Box className="print-only">
          <PrescriptionHeader entry={patientData} />
        </Box>

        {/* Header */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <FloristIcon sx={{ fontSize: 48, color: '#4caf50' }} />
          <Box>
            <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 600 }}>
              🌿 Protocolos de Fitoterapia
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Protocolos terapêuticos com plantas medicinais - Posologia e Dosagens
            </Typography>
          </Box>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>ℹ️ Importante:</strong> Estes protocolos são baseados em evidências científicas e uso tradicional.
            Consulte um profissional habilitado antes de iniciar qualquer tratamento fitoterápico.
          </Typography>
        </Alert>

        {/* Botões de alternância de modo */}
        {!showPrescriptionPreview && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ textAlign: 'center', mb: 1 }}>
              Escolha o modo de navegação:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant={viewMode === 'protocols' ? 'contained' : 'outlined'}
                startIcon={<HealingIcon />}
                onClick={() => setViewMode('protocols')}
                size="large"
              >
                Protocolos + Planilha
              </Button>
              <Button
                variant={viewMode === 'plants' ? 'contained' : 'outlined'}
                startIcon={<FloristIcon />}
                onClick={() => setViewMode('plants')}
                size="large"
                color="success"
              >
                Busca por Plantas
              </Button>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
              {viewMode === 'protocols'
                ? 'Modo ativo: lista unificada de protocolos por condição'
                : 'Modo ativo: busca direta no catálogo de plantas'}
            </Typography>
          </Box>
        )}

        {/* Modo: Protocolo por Doença (com visualização unificada) */}
        {!showPrescriptionPreview && viewMode === 'protocols' && (
          <>
            {/* Filtros */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Buscar por condição ou planta"
                  placeholder="Ex: gastrite, alho, ansiedade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={categories}
                  value={selectedCategory}
                  onChange={(e, newValue) => setSelectedCategory(newValue || 'all')}
                  renderInput={(params) => <TextField {...params} label="Filtrar por sistema" />}
                  getOptionLabel={(option) => option === 'all' ? 'Todos os sistemas' : option}
                />
              </Grid>
            </Grid>

            <Alert severity="success" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>📊 Lista Unificada:</strong> Protocolo por Doença e Planilha Completa foram integrados em uma única lista.
                Use os filtros acima e clique em um item para ver as plantas indicadas.
              </Typography>
            </Alert>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Total exibido: {unifiedConditions.length}
            </Typography>

            <Grid container spacing={2}>
              {unifiedConditions.map((condition, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { boxShadow: 6 },
                      border: condition.source === 'both'
                        ? '2px solid #2e7d32'
                        : condition.source === 'spreadsheet'
                          ? '2px solid #0288d1'
                          : `2px solid ${CATEGORY_COLORS[condition.category] || '#7b1fa2'}`,
                      bgcolor: '#f1f8f4'
                    }}
                    onClick={() => setSelectedProtocol({ name: condition.name, ...condition.protocol })}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6">{condition.name}</Typography>
                        <MedicalServicesIcon sx={{ color: '#4caf50' }} />
                      </Box>
                      <Chip
                        size="small"
                        label={condition.category}
                        sx={{
                          mb: 1,
                          bgcolor: CATEGORY_COLORS[condition.category] || '#546e7a',
                          color: '#fff'
                        }}
                      />
                      <Box sx={{ mt: 1 }}>
                        <Chip
                          size="small"
                          label={
                            condition.source === 'both'
                              ? 'Planilha + Banco Expandido'
                              : condition.source === 'spreadsheet'
                                ? 'Planilha'
                                : 'Banco Expandido'
                          }
                          color={
                            condition.source === 'both'
                              ? 'success'
                              : condition.source === 'spreadsheet'
                                ? 'info'
                                : 'secondary'
                          }
                        />
                      </Box>
                      <Typography variant="caption" sx={{ display: 'block', mt: 2, fontWeight: 600 }}>
                        {condition.protocol?.protocol?.length || 0} planta(s) no protocolo
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {unifiedConditions.length === 0 && (
              <Alert severity="warning">
                Nenhum protocolo encontrado com os filtros selecionados.
              </Alert>
            )}

        {/* Dialog de Detalhes */}
        {selectedProtocol && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ my: 3 }} />
            <Paper sx={{ p: 3, bgcolor: '#f5f5f5' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">{selectedProtocol.name}</Typography>
                <Button variant="outlined" onClick={() => setSelectedProtocol(null)}>
                  Fechar
                </Button>
              </Box>

              <Chip
                label={selectedProtocol.category}
                sx={{ mb: 2, bgcolor: CATEGORY_COLORS[selectedProtocol.category], color: '#fff' }}
              />

              {/* Alertas Críticos de Segurança */}
              {selectedProtocol.drugInteractions && 
               selectedProtocol.drugInteractions.length > 0 && 
               typeof selectedProtocol.drugInteractions[0] === 'object' &&
               selectedProtocol.drugInteractions.some(int => int.severity === 'Muito Alta') && (
                <Alert severity="error" sx={{ mb: 3, border: '2px solid', borderColor: 'error.main' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    🚨 ATENÇÃO: Interações de Severidade MUITO ALTA Detectadas
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Este protocolo contém plantas com interações medicamentosas críticas. Revise cuidadosamente antes de prescrever:
                  </Typography>
                  <ul>
                    {selectedProtocol.drugInteractions
                      .filter(int => int.severity === 'Muito Alta')
                      .map((int, i) => (
                        <li key={i}>
                          <Typography variant="body2">
                            <strong>{int.herb}:</strong> {Array.isArray(int.drugs) ? int.drugs.join(', ') : int.drugs}
                            {int.cypInvolvement && ` (${int.cypInvolvement})`}
                          </Typography>
                        </li>
                      ))}
                  </ul>
                </Alert>
              )}

              <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
                <Tab label="Protocolo" />
                <Tab label="Contraindicações" />
                <Tab label="Interações" />
              </Tabs>

              {/* Tab Protocolo */}
              {tabValue === 0 && (
                <Box>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    📋 Indicações:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {selectedProtocol.indications.map((ind, i) => (
                      <Chip key={i} label={ind} />
                    ))}
                  </Box>

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    🌿 Plantas e Posologia:
                  </Typography>

                  {selectedProtocol.protocol.map((plant, index) => {
                    const parsed = parsePlantString(plant.plant || '');
                    const meta = getPlantMeta(plant.plant || '');
                    const plantImg = getPlantImage(meta.scientific || meta.common);
                    return (
                      <Accordion key={index} defaultExpanded={index === 0}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src={plantImg} alt={`${meta.common} ${meta.scientific ? `(${meta.scientific})` : ''}`} style={{ height: 64, width: 64, objectFit: 'cover', borderRadius: 8 }} />
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {index + 1}. {parsed.common}
                              </Typography>
                              {meta.scientific && (
                                <Typography variant="caption" sx={{ fontStyle: 'italic', display: 'block' }}>{meta.scientific}</Typography>
                              )}
                            </Box>
                          </Box>
                        </AccordionSummary>
                      <AccordionDetails>
                        <TableContainer>
                          <Table size="small">
                            <TableBody>
                                      {plant.partUsed && (
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 600 }}>Parte Utilizada:</TableCell>
                                  <TableCell>
                                    <Badge badgeContent={plant.partUsed} color="primary" sx={{ '& .MuiBadge-badge': { position: 'relative', transform: 'none' } }} />
                                  </TableCell>
                                </TableRow>
                              )}
                              <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Dosagem:</TableCell>
                                <TableCell>{plant.dosage}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Posologia:</TableCell>
                                <TableCell>{plant.posology}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Duração:</TableCell>
                                <TableCell>{plant.duration}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Propriedades:</TableCell>
                                <TableCell>{plant.properties}</TableCell>
                              </TableRow>
                              {plant.evidenceLevel && (
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 600 }}>Nível de Evidência:</TableCell>
                                  <TableCell>
                                    <Tooltip title={plant.evidenceLevel === 'Alta' ? 'Evidência científica robusta' : plant.evidenceLevel === 'Média' ? 'Evidência moderada' : 'Evidência preliminar'}>
                                      <Badge 
                                        badgeContent={plant.evidenceLevel} 
                                        color={plant.evidenceLevel === 'Alta' ? 'success' : plant.evidenceLevel === 'Média' ? 'warning' : 'default'} 
                                        sx={{ '& .MuiBadge-badge': { position: 'relative', transform: 'none' } }} 
                                      />
                                    </Tooltip>
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        
                        {/* Botão para adicionar planta ao receituário */}
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => {
                              const plantData = {
                                protocolName: selectedProtocol.name,
                                plant: plant.plant,
                                dosage: plant.dosage,
                                posology: plant.posology,
                                duration: plant.duration,
                                properties: plant.properties
                              };
                              // Verifica se já não foi adicionada
                              const exists = selectedProtocols.some(p => 
                                p.name === selectedProtocol.name && 
                                p.selectedPlants?.some(sp => sp.plant === plant.plant)
                              );
                              if (!exists) {
                                // Adiciona ou atualiza protocolo com plantas selecionadas
                                const protocolIndex = selectedProtocols.findIndex(p => p.name === selectedProtocol.name);
                                if (protocolIndex >= 0) {
                                  const updated = [...selectedProtocols];
                                  updated[protocolIndex] = {
                                    ...updated[protocolIndex],
                                    selectedPlants: [...(updated[protocolIndex].selectedPlants || []), plantData]
                                  };
                                  setSelectedProtocols(updated);
                                } else {
                                  setSelectedProtocols([...selectedProtocols, {
                                    name: selectedProtocol.name,
                                    category: selectedProtocol.category,
                                    indications: selectedProtocol.indications,
                                    contraindications: selectedProtocol.contraindications,
                                    observations: selectedProtocol.observations,
                                    selectedPlants: [plantData]
                                  }]);
                                }
                              }
                            }}
                          >
                            ✓ Adicionar ao Receituário
                          </Button>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                    )
                  })}
                </Box>
              )}

              {/* Tab Contraindicações */}
              {tabValue === 1 && (
                <Box>
                  {/* Contraindicações Estruturadas (Novo Formato) */}
                  {selectedProtocol.contraindications && selectedProtocol.contraindications.length > 0 && typeof selectedProtocol.contraindications[0] === 'object' && (
                    <Box>
                      <Alert severity="error" sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ErrorOutlineIcon /> Contraindicações Detalhadas
                        </Typography>
                      </Alert>
                      
                      {selectedProtocol.contraindications.map((contra, i) => (
                        <Paper key={i} sx={{ p: 2, mb: 2, border: '1px solid', borderColor: contra.severity === 'Absoluta' ? 'error.main' : 'warning.main' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="h6" color="error">{contra.substance}</Typography>
                            <Badge 
                              badgeContent={contra.severity} 
                              color={contra.severity === 'Absoluta' ? 'error' : contra.severity === 'Relativa' ? 'warning' : 'default'}
                              sx={{ ml: 'auto' }}
                            />
                          </Box>
                          
                          <List dense>
                            {contra.conditions && (
                              <ListItem>
                                <ListItemIcon><MedicalServicesIcon color="error" /></ListItemIcon>
                                <ListItemText 
                                  primary="Condições" 
                                  secondary={typeof contra.conditions === 'string' ? contra.conditions : (Array.isArray(contra.conditions) ? contra.conditions.join(', ') : '')}
                                />
                              </ListItem>
                            )}
                            
                            {contra.populations && (
                              <ListItem>
                                <ListItemIcon><WarningIcon color="warning" /></ListItemIcon>
                                <ListItemText 
                                  primary="Populações" 
                                  secondary={typeof contra.populations === 'string' ? contra.populations : (Array.isArray(contra.populations) ? contra.populations.join(', ') : '')}
                                />
                              </ListItem>
                            )}
                            
                            {contra.mechanism && (
                              <ListItem>
                                <ListItemIcon><BiotechIcon color="info" /></ListItemIcon>
                                <ListItemText 
                                  primary="Mecanismo" 
                                  secondary={contra.mechanism}
                                />
                              </ListItem>
                            )}
                          </List>
                        </Paper>
                      ))}
                    </Box>
                  )}
                  
                  {/* Contraindicações Simples (Formato Antigo) */}
                  {selectedProtocol.contraindications && selectedProtocol.contraindications.length > 0 && typeof selectedProtocol.contraindications[0] === 'string' && (
                    <Alert severity="error">
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        ⚠️ Contraindicações:
                      </Typography>
                      <ul style={{ marginTop: 8 }}>
                        {selectedProtocol.contraindications.map((contra, i) => (
                          <li key={i}>
                            <Typography variant="body2">{contra}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Alert>
                  )}
                </Box>
              )}

              {/* Tab Interações */}
              {tabValue === 2 && (
                <Box>
                  {/* Interações Medicamentosas Estruturadas (Novo Formato) */}
                  {selectedProtocol.drugInteractions && selectedProtocol.drugInteractions.length > 0 && typeof selectedProtocol.drugInteractions[0] === 'object' && (
                    <Box>
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BiotechIcon /> Interações Medicamentosas Detalhadas
                        </Typography>
                        <Typography variant="body2">
                          Informações sobre enzimas CYP450 e interações farmacológicas
                        </Typography>
                      </Alert>
                      
                      {selectedProtocol.drugInteractions.map((interaction, i) => {
                        const severityColor = 
                          interaction.severity === 'Muito Alta' ? 'error' : 
                          interaction.severity === 'Alta' ? 'warning' : 
                          interaction.severity === 'Moderada' ? 'info' : 
                          'default';
                        
                        return (
                          <Paper key={i} sx={{ p: 2, mb: 2, border: '2px solid', borderColor: `${severityColor}.main` }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                              <Typography variant="h6" color={severityColor}>{interaction.herb}</Typography>
                              <Badge 
                                badgeContent={interaction.severity} 
                                color={severityColor}
                                sx={{ ml: 'auto' }}
                              />
                            </Box>
                            
                            <List dense>
                              <ListItem>
                                <ListItemIcon><MedicalServicesIcon color="primary" /></ListItemIcon>
                                <ListItemText 
                                  primary="Medicamentos Envolvidos" 
                                  secondary={Array.isArray(interaction.drugs) ? interaction.drugs.join(', ') : interaction.drugs}
                                  secondaryTypographyProps={{ component: 'div' }}
                                />
                              </ListItem>
                              
                              {interaction.mechanism && (
                                <ListItem>
                                  <ListItemIcon><BiotechIcon color="info" /></ListItemIcon>
                                  <ListItemText 
                                    primary="Mecanismo de Interação" 
                                    secondary={interaction.mechanism}
                                  />
                                </ListItem>
                              )}
                              
                              {interaction.cypInvolvement && (
                                <ListItem>
                                  <ListItemIcon><ScienceIcon color="secondary" /></ListItemIcon>
                                  <ListItemText 
                                    primary="Enzimas CYP450 Envolvidas" 
                                    secondary={
                                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                                        {interaction.cypInvolvement.split(',').map((enzyme, idx) => (
                                          <Tooltip key={idx} title={`Enzima do citocromo P450: ${enzyme.trim()}`}>
                                            <Badge 
                                              badgeContent={enzyme.trim()} 
                                              color="secondary"
                                              sx={{ '& .MuiBadge-badge': { position: 'relative', transform: 'none' } }}
                                            />
                                          </Tooltip>
                                        ))}
                                      </Box>
                                    }
                                  />
                                </ListItem>
                              )}
                              
                              {interaction.management && (
                                <ListItem>
                                  <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                                  <ListItemText 
                                    primary="Conduta Recomendada" 
                                    secondary={interaction.management}
                                    secondaryTypographyProps={{ sx: { color: 'success.dark', fontWeight: 500 } }}
                                  />
                                </ListItem>
                              )}
                            </List>
                          </Paper>
                        );
                      })}
                      
                      {selectedProtocol.clinicalMonitoring && (
                        <Alert severity="info" sx={{ mt: 2 }}>
                          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <InfoIcon /> Monitoramento Clínico
                          </Typography>
                          <Typography variant="body2">{selectedProtocol.clinicalMonitoring}</Typography>
                        </Alert>
                      )}
                    </Box>
                  )}
                  
                  {/* Interações Simples (Formato Antigo) */}
                  {selectedProtocol.interactions && selectedProtocol.interactions.length > 0 && (
                    <Alert severity="warning">
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        🔄 Interações Medicamentosas:
                      </Typography>
                      <ul style={{ marginTop: 8 }}>
                        {selectedProtocol.interactions.map((interaction, i) => (
                          <li key={i}>
                            <Typography variant="body2">{interaction}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Alert>
                  )}

                  {selectedProtocol.observations && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                        📝 Observações:
                      </Typography>
                      <Typography variant="body2">{selectedProtocol.observations}</Typography>
                    </Alert>
                  )}
                </Box>
              )}
            </Paper>
          </Box>
        )}
          </>
        )}

        {/* Protocolos Selecionados - FORA do viewMode para sempre mostrar */}
        {!showPrescriptionPreview && selectedProtocols.length > 0 && (
          <Box sx={{ mt: 4, p: 3, bgcolor: '#e8f5e9', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#2e7d32' }}>
                📋 Protocolos Selecionados ({selectedProtocols.length})
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={handleClearProtocols}
                  size="small"
                >
                  Limpar Todos
                </Button>
                <Button 
                  variant="contained" 
                  color="success"
                  startIcon={<PrintIcon />}
                  onClick={() => setShowPrescriptionPreview(true)}
                  size="large"
                >
                  Gerar Sugestões Terapêuticas
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedProtocols.map((protocol, idx) => (
                <Chip
                  key={idx}
                  label={`${protocol.name} (${protocol.selectedPlants?.length || 0} planta${(protocol.selectedPlants?.length || 0) !== 1 ? 's' : ''})`}
                  onDelete={() => handleRemoveProtocol(protocol.name)}
                  color="success"
                  sx={{ fontSize: '0.9rem', py: 2.5 }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Modo: Busca por Plantas */}
        {!showPrescriptionPreview && viewMode === 'plants' && (
          <>
            {/* Sistema de Pesquisa Inteligente */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: '#f0f7ff', border: '2px solid #1976d2' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}>
                <SearchIcon /> Pesquisar Planta Medicinal
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Digite o sintoma, doença ou nome da planta para encontrar a melhor indicação terapêutica
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Digite sintoma, doença ou nome da planta"
                  placeholder="ex: dor de cabeça, diabetes, insônia, alho, camomila..."
                  value={plantSearchQuery}
                  onChange={(e) => setPlantSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchPlant()}
                  variant="outlined"
                />
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={handleSearchPlant}
                  disabled={!plantSearchQuery}
                  sx={{ minWidth: 150 }}
                >
                  Pesquisar
                </Button>
              </Box>
              
              {plantSearchResults.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', color: '#2e7d32' }}>
                    ✅ {plantSearchResults.length} planta(s) encontrada(s)
                  </Typography>
                  <Grid container spacing={2}>
                    {plantSearchResults.map((plant, idx) => (
                      <Grid item xs={12} sm={6} md={4} key={plant.id}>
                        <Card 
                          sx={{ 
                            cursor: 'pointer',
                            border: selectedPlantId === plant.id ? '2px solid #1976d2' : 'none',
                            bgcolor: selectedPlantId === plant.id ? '#e3f2fd' : 'white',
                            '&:hover': { boxShadow: 4 }
                          }}
                          onClick={() => setSelectedPlantId(plant.id)}
                        >
                          <CardContent>
                            <Typography variant="h6" color="primary">
                              {idx + 1}. {plant.common}
                            </Typography>
                            <Typography variant="caption" sx={{ fontStyle: 'italic', display: 'block', mb: 1 }}>
                              {plant.scientific}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Indicações:</strong> {(plant.indications || []).slice(0, 3).join(', ')}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Paper>
            
            <Divider sx={{ my: 3 }} />
            
            {/* Botões de impressão e download */}
            {plantSearchResults.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                  <Button 
                    variant="outlined" 
                    startIcon={<PrintIcon />} 
                    onClick={() => window.print()}
                  >
                    Imprimir
                  </Button>
                  <Button 
                    variant="contained" 
                    startIcon={<DownloadIcon />} 
                    onClick={async () => {
                      setExportingPlants(true);
                      try {
                        const html = generateDetailedPlantsHtml(plantSearchResults, plantSearchQuery);
                        const qrUrl = await generateQrDataUrl(window.location.href);
                        const built = await buildLetterheadHtml({ 
                          title: 'Plantas Medicinais Recomendadas', 
                          bodyHtml: html, 
                          qrUrl 
                        });
                        await downloadPdfFromHtml(built, `plantas_medicinais_${new Date().toISOString().split('T')[0]}.pdf`);
                      } catch (err) {
                        console.error(err);
                        alert('Erro ao gerar PDF: ' + err.message);
                      }
                      setExportingPlants(false);
                    }} 
                    disabled={exportingPlants}
                  >
                    {exportingPlants ? 'Gerando PDF...' : 'Download PDF'}
                  </Button>
                </Stack>
              </Box>
            )}
            
            {/* Catálogo Visual de Plantas */}
            <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>Catálogo Completo de Plantas Medicinais</Typography>
            <Grid container spacing={2}>
              {plantsArr.map((p, idx) => {
                let imgSrc = null;
                try { 
                  imgSrc = require(`../assets/plants/${p.image.split('/').pop()}`); 
                } catch (e) { 
                  try { 
                    imgSrc = require('../assets/plants/placeholder.svg'); 
                  } catch (e2) { 
                    imgSrc = ''; 
                  } 
                }
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                    <Card
                      sx={{ 
                        height: '100%',
                        cursor: 'pointer',
                        border: selectedPlantId === p.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                        bgcolor: selectedPlantId === p.id ? '#e3f2fd' : 'white',
                        '&:hover': { boxShadow: 6, borderColor: '#1976d2' },
                        transition: 'box-shadow 0.2s, border-color 0.2s'
                      }}
                      onClick={() => handleOpenPlantModal(p)}
                    >
                      <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        {imgSrc && <img src={imgSrc} alt={`${p.common} (${p.scientific})`} style={{ height: 80, width: 80, objectFit: 'cover', borderRadius: 8 }} />}
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{p.common}</Typography>
                          <Typography variant="caption" sx={{ fontStyle: 'italic' }}>{p.scientific}</Typography>
                          {plantSearchResults.find(sp => sp.id === p.id) && (
                            <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 0.5 }}>✓ Recomendado</Typography>
                          )}
                          <Typography variant="caption" color="primary" sx={{ display: 'block', mt: 0.5 }}>Clique para detalhes →</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            
            <Divider sx={{ my: 3 }} />
            
            {/* Detalhes da Planta Selecionada */}
            {selectedPlantId && (() => {
              const plant = plantsArr.find(p => p.id === selectedPlantId);
              if (!plant) return null;
              
              let imgSrc = null;
              try { 
                imgSrc = require(`../assets/plants/${plant.image.split('/').pop()}`); 
              } catch (e) { 
                try { 
                  imgSrc = require('../assets/plants/placeholder.svg'); 
                } catch (e2) { 
                  imgSrc = ''; 
                } 
              }
              
              return (
                <Box sx={{ mt: 2 }}>
                  <Paper sx={{ p: 3, bgcolor: '#f5f5f5' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h5">{plant.common}</Typography>
                      <Button variant="outlined" onClick={() => setSelectedPlantId(null)}>
                        Fechar
                      </Button>
                    </Box>
                    
                    {imgSrc && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <img src={imgSrc} alt={plant.common} style={{ maxHeight: 300, maxWidth: '100%', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      </Box>
                    )}
                    
                    <Typography variant="subtitle1" sx={{ fontStyle: 'italic', color: 'text.secondary', mb: 3 }}>
                      <strong>Nome científico:</strong> {plant.scientific}
                    </Typography>
                    
                    {plant.indications && plant.indications.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1, color: '#2e7d32' }}>📋 Indicações</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {plant.indications.map((ind, i) => (
                            <Chip key={i} label={ind} color="success" variant="outlined" />
                          ))}
                        </Box>
                      </Box>
                    )}
                    
                    {plant.symptoms && plant.symptoms.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>🩺 Sintomas Tratados</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {plant.symptoms.map((s, i) => (
                            <Chip key={i} label={s} variant="outlined" />
                          ))}
                        </Box>
                      </Box>
                    )}
                    
                    {plant.posology && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>💊 Posologia</Typography>
                        <Alert severity="info">
                          <Typography variant="body2">{plant.posology}</Typography>
                        </Alert>
                      </Box>
                    )}
                    
                    {plant.modeOfUse && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>🌿 Modo de Uso</Typography>
                        <Alert severity="info">
                          <Typography variant="body2">{plant.modeOfUse}</Typography>
                        </Alert>
                      </Box>
                    )}
                    
                    {plant.contraindications && plant.contraindications.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1, color: '#d32f2f' }}>⚠️ Contraindicações</Typography>
                        <Alert severity="error">
                          <ul style={{ margin: 0, paddingLeft: 20 }}>
                            {plant.contraindications.map((c, i) => (
                              <li key={i}><Typography variant="body2">{c}</Typography></li>
                            ))}
                          </ul>
                        </Alert>
                      </Box>
                    )}
                    
                    {plant.interactions && plant.interactions.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1, color: '#1976d2' }}>💊 Interações Medicamentosas</Typography>
                        <Alert severity="warning">
                          <ul style={{ margin: 0, paddingLeft: 20 }}>
                            {plant.interactions.map((i, idx) => (
                              <li key={idx}><Typography variant="body2">{i}</Typography></li>
                            ))}
                          </ul>
                        </Alert>
                      </Box>
                    )}
                    
                    {plant.warnings && plant.warnings.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1, color: '#d32f2f' }}>⚠️ Avisos Importantes</Typography>
                        <Alert severity="error">
                          <ul style={{ margin: 0, paddingLeft: 20 }}>
                            {plant.warnings.map((w, i) => (
                              <li key={i}><Typography variant="body2">{w}</Typography></li>
                            ))}
                          </ul>
                        </Alert>
                      </Box>
                    )}
                  </Paper>
                </Box>
              );
            })()}
          </>
        )}


        {/* Preview de Sugestões Terapêuticas */}
        {showPrescriptionPreview && selectedProtocols.length > 0 && (
          <Box sx={{ mt: 4 }} className="prescription-area">
            {/* Botão Voltar - apenas para tela */}
            <Box sx={{ mb: 3 }} className="no-print">
              <Button 
                variant="outlined" 
                onClick={() => setShowPrescriptionPreview(false)}
                size="large"
              >
                ← Voltar para Seleção de Protocolos
              </Button>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            <Paper sx={{ p: 4 }} id="therapeutic-suggestions-print">
              <Box className="print-only">
                {/* Cabeçalho Profissional para Impressão */}
                <Box sx={{ 
                  mb: 3, 
                  pb: 2, 
                  borderBottom: '3px solid #4caf50',
                  background: 'linear-gradient(to right, #f1f8f4, #ffffff)',
                  p: 2,
                  borderRadius: '8px 8px 0 0'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* Logo/Símbolo */}
                    <Box sx={{ 
                      width: 80, 
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Box
                        component="img"
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%234caf50' stroke='%232e7d32' stroke-width='2'/%3E%3Ctext x='50' y='65' font-size='50' text-anchor='middle' fill='white' font-family='Arial'%3E🌿%3C/text%3E%3C/svg%3E"
                        alt="Logo"
                        sx={{ width: '100%', height: '100%' }}
                      />
                    </Box>
                    {/* Informações do Terapeuta */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#2e7d32', mb: 0.3, lineHeight: 1.2 }}>
                        Wander Pires Silva Coelho
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: '#4caf50', fontWeight: 600, mb: 0.3, lineHeight: 1.2 }}>
                        Terapeuta Integrativo Funcional
                      </Typography>
                      <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#555', mb: 0.5, lineHeight: 1.2 }}>
                        Naturopatia e Iridologia
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#2e7d32', mb: 0.5 }}>
                        CRTH-BR 17821
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          📞 (89) 9 8139-8723
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          ✉️ wanderpsc@gmail.com
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Typography 
                variant="h4" 
                sx={{ 
                  textAlign: 'center', 
                  mb: 2, 
                  color: '#2e7d32', 
                  fontWeight: 700,
                  borderBottom: '2px solid #4caf50',
                  pb: 1,
                  textTransform: 'uppercase',
                  letterSpacing: 1
                }} 
                className="no-print"
              >
                🌿 Sugestões Terapêuticas
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  textAlign: 'center', 
                  mb: 2, 
                  mt: 1,
                  color: '#2e7d32', 
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 1.5
                }} 
                className="print-only"
              >
                SUGESTÕES TERAPÊUTICAS
              </Typography>

              {/* Dados do Paciente */}
              <Box sx={{ 
                mb: 3, 
                p: 2, 
                bgcolor: '#f8fdf9', 
                border: '1px solid #c8e6c9',
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography sx={{ fontSize: '1rem', color: '#333' }}>
                      <strong style={{ color: '#2e7d32' }}>Paciente:</strong> {patientData?.q1_nome_completo || '___________________________________'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography sx={{ fontSize: '1rem', color: '#333', textAlign: { md: 'right' } }}>
                      <strong style={{ color: '#2e7d32' }}>Data:</strong> {new Date().toLocaleDateString('pt-BR')}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Protocolos Separados por Problema */}
              {selectedProtocols.map((protocol, idx) => (
                <Box key={idx} sx={{ mb: 3, pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                  {/* Título do Protocolo - Destaque */}
                  <Box sx={{ 
                    bgcolor: '#e8f5e9', 
                    p: 1.5, 
                    borderRadius: 1,
                    borderLeft: '4px solid #4caf50',
                    mb: 2
                  }}>
                    <Typography variant="h6" sx={{ 
                      color: '#2e7d32', 
                      fontWeight: 700, 
                      textTransform: 'uppercase',
                      letterSpacing: 0.5
                    }}>
                      {idx + 1}. {protocol.name}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#666', mb: 1 }}>
                      📋 Indicações:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {protocol.indications.map((ind, i) => (
                        <Chip key={i} label={ind} size="small" color="success" variant="outlined" />
                      ))}
                    </Box>
                  </Box>

                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#666', mb: 2 }}>
                    🌿 Plantas Selecionadas:
                  </Typography>

                  {(protocol.selectedPlants || protocol.protocol).map((plant, plantIdx) => {
                    const parsed = parsePlantString(plant.plant || '');
                    const plantImage = getPlantImage(parsed.scientific || parsed.common);
                    return (
                      <Box key={plantIdx} sx={{ 
                        mb: 2, 
                        p: 2, 
                        bgcolor: '#ffffff', 
                        borderRadius: 2, 
                        border: '2px solid #c8e6c9',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                        pageBreakInside: 'avoid',
                        breakInside: 'avoid'
                      }}>
                        {/* Header da planta com foto */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-start' }}>
                          {/* Foto da planta */}
                          <Box sx={{ 
                            width: 80, 
                            height: 80, 
                            borderRadius: 2, 
                            overflow: 'hidden',
                            border: '2px solid #4caf50',
                            flexShrink: 0,
                            bgcolor: '#f5f5f5'
                          }}>
                            <img 
                              src={plantImage} 
                              alt={parsed.common} 
                              style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover' 
                              }} 
                            />
                          </Box>
                          
                          {/* Nome da planta */}
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2e7d32', mb: 0.5, fontSize: '1.1rem' }}>
                              {parsed.common}
                            </Typography>
                            {parsed.scientific && (
                              <Typography variant="caption" sx={{ fontStyle: 'italic', color: '#666', display: 'block' }}>
                                {parsed.scientific}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        
                        <Grid container spacing={1.5}>
                          {plant.partUsed && (
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2"><strong>Parte Utilizada:</strong> {plant.partUsed}</Typography>
                            </Grid>
                          )}
                          {plant.dosage && (
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2"><strong>Dosagem:</strong> {plant.dosage}</Typography>
                            </Grid>
                          )}
                          {plant.posology && (
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2"><strong>Posologia:</strong> {plant.posology}</Typography>
                            </Grid>
                          )}
                          {plant.duration && (
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2"><strong>Duração:</strong> {plant.duration}</Typography>
                            </Grid>
                          )}
                          {plant.properties && (
                            <Grid item xs={12}>
                              <Typography variant="body2" sx={{ color: '#666' }}>
                                <strong>Propriedades:</strong> {plant.properties}
                              </Typography>
                            </Grid>
                          )}
                          {plant.evidenceLevel && (
                            <Grid item xs={12}>
                              <Typography variant="body2">
                                <strong>Nível de Evidência:</strong> 
                                <Chip 
                                  label={plant.evidenceLevel} 
                                  size="small" 
                                  color={plant.evidenceLevel === 'Alta' ? 'success' : plant.evidenceLevel === 'Média' ? 'warning' : 'default'}
                                  sx={{ ml: 1 }}
                                />
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                        
                        {/* Interações medicamentosas - NOVO CAMPO */}
                        {(plant.drugInteractions || plant.plantInteractions) && (
                          <Alert severity="error" sx={{ mt: 2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                              ⚠️ Cuidados com Interações:
                            </Typography>
                            {plant.drugInteractions && (
                              <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
                                <strong>Medicamentos:</strong> {plant.drugInteractions}
                              </Typography>
                            )}
                            {plant.plantInteractions && (
                              <Typography variant="caption" display="block">
                                <strong>Outras Plantas:</strong> {plant.plantInteractions}
                              </Typography>
                            )}
                          </Alert>
                        )}
                      </Box>
                    );
                  })}

                  {/* Interações do Protocolo - NOVO */}
                  {protocol.interactions && protocol.interactions.length > 0 && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        ⚠️ Interações Medicamentosas/Plantas:
                      </Typography>
                      <ul style={{ margin: 0, paddingLeft: 20 }}>
                        {protocol.interactions.map((i, idx) => (
                          <li key={idx}><Typography variant="body2">{i}</Typography></li>
                        ))}
                      </ul>
                    </Alert>
                  )}
                  
                  {/* Contraindicações do Protocolo */}
                  {protocol.contraindications && protocol.contraindications.length > 0 && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        ⚠️ Contraindicações:
                      </Typography>
                      <ul style={{ margin: 0, paddingLeft: 20 }}>
                        {protocol.contraindications.map((c, i) => (
                          <li key={i}>
                            <Typography variant="body2">
                              {typeof c === 'string' ? c : `${c.substance}: ${c.conditions || ''} ${c.populations ? `- ${c.populations}` : ''}`}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </Alert>
                  )}

                  {/* Observações do Protocolo */}
                  {protocol.observations && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                      <Typography variant="body2">{protocol.observations}</Typography>
                    </Alert>
                  )}
                </Box>
              ))}

              {/* Observações Gerais */}
              <Box sx={{ mt: 4, p: 2, bgcolor: '#fff3cd', borderRadius: 1, border: '1px solid #ffc107' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  📝 Observações Importantes:
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Estas são sugestões terapêuticas baseadas em evidências científicas e uso tradicional de plantas medicinais.
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • O uso deve ser acompanhado por profissional habilitado.
                </Typography>
                <Typography variant="body2">
                  • Respeitar contraindicações e interações medicamentosas.
                </Typography>
              </Box>

              {/* Assinatura */}
              <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid #ddd' }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ borderTop: '2px solid #000', pt: 1, mt: 4, mx: 'auto', maxWidth: 300 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Assinatura do Terapeuta
                        </Typography>
                        <Typography variant="caption">CRTH-BR 17821</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ borderTop: '2px solid #000', pt: 1, mt: 4, mx: 'auto', maxWidth: 300 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Carimbo
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* Botões de Ação */}
              <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }} className="no-print">
                <Button
                  variant="outlined"
                  color="success"
                  size="large"
                  onClick={() => setShowPrescriptionPreview(false)}
                  sx={{ minWidth: 150 }}
                >
                  ← Voltar
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  startIcon={<PrintIcon />}
                  onClick={() => {
                    setIsPrinting(true);
                    setTimeout(() => {
                      window.print();
                      setIsPrinting(false);
                    }, 100);
                  }}
                  sx={{ 
                    minWidth: 200,
                    fontWeight: 700,
                    boxShadow: 3,
                    '&:hover': {
                      boxShadow: 6
                    }
                  }}
                >
                  🖨️ Imprimir PDF
                </Button>
              </Box>
            </Paper>
          </Box>
        )}

        {/* Rodapé do Receituário (apenas para impressão) */}
        <Box className="print-only">
          <PrescriptionFooter />
        </Box>

        {/* Botão voltar */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={() => navigate('/dashboard')}>
            Voltar para Interagentes
          </Button>
        </Box>
      </Paper>

      {/* Estilos para impressão */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          @page {
            size: A4;
            margin: 1.2cm 1.5cm;
          }
          
          /* Evitar quebras de página indesejadas */
          .prescription-area {
            page-break-inside: avoid;
          }
          
          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
            break-after: avoid;
          }
          
          /* Garantir que títulos fiquem com seu conteúdo */
          .MuiTypography-h5, .MuiTypography-h6 {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          
          /* Evitar quebra dentro dos boxes */
          .MuiBox-root {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          /* Melhorar legibilidade */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Remover sombras e efeitos desnecessários na impressão */
          .MuiPaper-root {
            box-shadow: none !important;
          }
          
          /* Otimizar espaçamento */
          .MuiContainer-root {
            padding: 0 !important;
          }
          
          /* Reduzir margens excessivas */
          .MuiGrid-item {
            padding: 4px !important;
          }
        }
        
        @media screen {
          .print-only {
            display: none !important;
          }
        }
      `}</style>

      {/* ─── Modal de Detalhes da Planta ─────────────────────────────────────── */}
      <Dialog
        open={plantModalOpen}
        onClose={handleClosePlantModal}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        {plantModalData && (
          <>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#f1f8e9' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                  🌿 {plantModalData.common}
                </Typography>
                {plantModalData.scientific && (
                  <Typography variant="caption" sx={{ fontStyle: 'italic', color: '#555' }}>
                    {plantModalData.scientific}
                  </Typography>
                )}
              </Box>
              <IconButton onClick={handleClosePlantModal} size="small">
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers>
              {/* Nome científico e parte utilizada */}
              <Box sx={{ mb: 2, p: 2, bgcolor: '#f9fbe7', borderRadius: 1 }}>
                <Grid container spacing={1}>
                  {plantModalData.scientific && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2"><strong>Nome científico:</strong> <em>{plantModalData.scientific}</em></Typography>
                    </Grid>
                  )}
                  {plantModalData.partUsed && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2"><strong>Partes utilizadas:</strong> {plantModalData.partUsed}</Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>

              {/* Indicações */}
              {plantModalData.indications && plantModalData.indications.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2e7d32', mb: 0.5 }}>📋 Indicações</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {plantModalData.indications.map((ind, i) => (
                      <Chip key={i} label={ind} size="small" color="success" variant="outlined" />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Como preparar */}
              {plantModalData.preparation && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1565c0', mb: 0.5 }}>🫖 Como preparar</Typography>
                  <Alert severity="info" icon={false} sx={{ py: 0.5 }}>
                    <Typography variant="body2">{plantModalData.preparation}</Typography>
                  </Alert>
                </Box>
              )}
              {!plantModalData.preparation && plantModalData.modeOfUse && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1565c0', mb: 0.5 }}>🌿 Modo de uso</Typography>
                  <Alert severity="info" icon={false} sx={{ py: 0.5 }}>
                    <Typography variant="body2">{plantModalData.modeOfUse}</Typography>
                  </Alert>
                </Box>
              )}

              {/* Dosagem + Posologia */}
              <Box sx={{ mb: 2 }}>
                <Grid container spacing={1}>
                  {plantModalData.dosage && (
                    <Grid item xs={12} sm={6}>
                      <Paper variant="outlined" sx={{ p: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>💊 Dosagem</Typography>
                        <Typography variant="body2">{plantModalData.dosage}</Typography>
                      </Paper>
                    </Grid>
                  )}
                  {plantModalData.posology && (
                    <Grid item xs={12} sm={6}>
                      <Paper variant="outlined" sx={{ p: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>⏱️ Posologia</Typography>
                        <Typography variant="body2">{plantModalData.posology}</Typography>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              </Box>

              {/* Princípios ativos */}
              {plantModalData.actives && plantModalData.actives.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#6a1b9a', mb: 0.5 }}>🔬 Princípios ativos</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {plantModalData.actives.map((a, i) => (
                      <Chip key={i} label={a} size="small" color="secondary" variant="outlined" />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Contraindicações */}
              {plantModalData.contraindications && plantModalData.contraindications.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#c62828', mb: 0.5 }}>⚠️ Contraindicações</Typography>
                  <Alert severity="error" icon={false} sx={{ py: 0.5 }}>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {plantModalData.contraindications.map((c, i) => (
                        <li key={i}><Typography variant="body2">{c}</Typography></li>
                      ))}
                    </ul>
                  </Alert>
                </Box>
              )}

              {/* Interações */}
              {plantModalData.interactions && plantModalData.interactions.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#e65100', mb: 0.5 }}>💊 Interações medicamentosas</Typography>
                  <Alert severity="warning" icon={false} sx={{ py: 0.5 }}>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {plantModalData.interactions.map((inter, i) => (
                        <li key={i}><Typography variant="body2">{inter}</Typography></li>
                      ))}
                    </ul>
                  </Alert>
                </Box>
              )}

              {/* Avisos */}
              {plantModalData.warnings && plantModalData.warnings.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#c62828', mb: 0.5 }}>🚨 Avisos importantes</Typography>
                  <Alert severity="error" icon={false} sx={{ py: 0.5 }}>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {plantModalData.warnings.map((w, i) => (
                        <li key={i}><Typography variant="body2">{w}</Typography></li>
                      ))}
                    </ul>
                  </Alert>
                </Box>
              )}

              {/* Toxicidade */}
              {plantModalData.toxicity && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#555', mb: 0.5 }}>☣️ Toxicidade</Typography>
                  <Alert severity="warning" icon={false} sx={{ py: 0.5 }}>
                    <Typography variant="body2">{plantModalData.toxicity}</Typography>
                  </Alert>
                </Box>
              )}

              {/* Proibições */}
              {plantModalData.prohibitions && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#555', mb: 0.5 }}>🚫 Proibições</Typography>
                  <Alert severity="error" icon={false} sx={{ py: 0.5 }}>
                    <Typography variant="body2">{plantModalData.prohibitions}</Typography>
                  </Alert>
                </Box>
              )}
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, bgcolor: '#f9fbe7' }}>
              <Button onClick={handleClosePlantModal} variant="outlined" color="success">
                Fechar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

    </Container>
  );
}

// Gera HTML do receituário para impressão/download
function generatePrescriptionHtml(patientName, items, notes, protocolName) {
  const itemsHtml = items.map((it, idx) => `
    <div style="margin-bottom:12px;">
      <strong>${idx + 1}. ${it.plant}</strong><br/>
      <span>Posologia: ${it.posology || '---'}</span><br/>
      <span>Dosagem: ${it.dosage || '---'}</span>
    </div>
  `).join('');

  return `
    <div style="font-family:Arial, sans-serif; padding:20px;">
      <h2 style="color:#1976d2;">Sugestões Terapêuticas Fitoterápicas</h2>
      <p><strong>Interagente:</strong> ${patientName}</p>
      <p><strong>Protocolo:</strong> ${protocolName}</p>
      <hr/>
      ${itemsHtml}
      <hr/>
      <p><strong>Observações do profissional:</strong></p>
      <p>${notes || '---'}</p>
      <p style="font-size:12px; color:#666; margin-top:20px;">Emitido por profissional habilitado. Seguir contraindicações e interações informadas no protocolo.</p>
    </div>
  `;
}

// Gera HTML detalhado das plantas encontradas
function generateDetailedPlantsHtml(plants, searchQuery) {
  const plantsHtml = plants.map((plant, idx) => `
    <div class="plant-card" style="page-break-inside: avoid; margin-bottom: 30px; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">
      <h3 style="color: #1976d2; margin-bottom: 10px;">${idx + 1}. ${plant.common}</h3>
      <p style="font-style: italic; color: #666; margin-bottom: 10px;"><strong>Nome científico:</strong> ${plant.scientific || '---'}</p>
      
      <div class="section" style="margin-bottom: 10px;">
        <span class="label" style="font-weight: bold;">Indicações:</span>
        <ul style="margin-top: 5px;">
          ${(plant.indications || []).map(ind => `<li class="indication" style="color: #2e7d32;">${ind}</li>`).join('')}
        </ul>
      </div>
      
      ${plant.symptoms && plant.symptoms.length > 0 ? `
        <div class="section" style="margin-bottom: 10px;">
          <span class="label" style="font-weight: bold;">Sintomas tratados:</span>
          <ul style="margin-top: 5px;">
            ${plant.symptoms.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      ${plant.posology ? `
        <div class="section" style="margin-bottom: 10px;">
          <span class="label" style="font-weight: bold;">Posologia:</span>
          <p style="margin-top: 5px;">${plant.posology}</p>
        </div>
      ` : ''}
      
      ${plant.modeOfUse ? `
        <div class="section" style="margin-bottom: 10px;">
          <span class="label" style="font-weight: bold;">Modo de uso:</span>
          <p style="margin-top: 5px;">${plant.modeOfUse}</p>
        </div>
      ` : ''}
      
      ${plant.contraindications && plant.contraindications.length > 0 ? `
        <div class="section" style="margin-bottom: 10px;">
          <span class="label" style="font-weight: bold;">Contraindicações:</span>
          <ul style="margin-top: 5px;">
            ${plant.contraindications.map(c => `<li class="contraindication" style="color: #d32f2f;">${c}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      ${plant.interactions && plant.interactions.length > 0 ? `
        <div class="section" style="margin-bottom: 10px;">
          <span class="label" style="font-weight: bold;">Interações medicamentosas:</span>
          <ul style="margin-top: 5px;">
            ${plant.interactions.map(i => `<li class="interaction" style="color: #1976d2;">${i}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      ${plant.warnings && plant.warnings.length > 0 ? `
        <div class="section" style="margin-bottom: 10px;">
          <span class="label warning" style="font-weight: bold; color: #d32f2f;">⚠️ Avisos importantes:</span>
          <ul style="margin-top: 5px;">
            ${plant.warnings.map(w => `<li class="warning" style="color: #d32f2f;">${w}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `).join('');

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #1976d2; margin-bottom: 20px;">Plantas Medicinais Recomendadas</h2>
      <p style="margin-bottom: 20px;"><strong>Busca realizada por:</strong> "${searchQuery}"</p>
      <p style="margin-bottom: 20px;"><strong>Total de plantas encontradas:</strong> ${plants.length}</p>
      <hr style="margin-bottom: 30px;"/>
      ${plantsHtml}
      <hr style="margin-top: 30px;"/>
      <p style="font-size: 12px; color: #666; margin-top: 20px;">
        <strong>Aviso:</strong> As informações contidas neste documento são baseadas em evidências científicas e uso tradicional. 
        Consulte sempre um profissional de saúde habilitado antes de iniciar qualquer tratamento fitoterápico.
      </p>
    </div>
  `;
}