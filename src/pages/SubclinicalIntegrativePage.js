import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  AddPhotoAlternate as AddPhotoIcon,
  AutoAwesome as AnalyzeIcon,
  CameraAlt as CameraAltIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  LocalPrintshop as LocalPrintshopIcon,
  MedicalServices as MedicalServicesIcon,
  Person as PersonIcon,
  PhotoLibrary as PhotoLibraryIcon,
  ZoomIn as ZoomInIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import subclinicalData from '../data/subclinicalIntegrativeData.json';
import { getPatientAge } from '../lib/ageUtils';
import { appendHistoricoEntry } from '../lib/historicoUtils';
import SaveToPatientBar from '../components/SaveToPatientBar';
import { buildLetterheadHtml, openPrintWindow, generateQrDataUrl } from '../components/PrintTemplate';

const STORAGE_KEY = 'anamneses';
const MODULE_KEY = 'subclinicalIntegrativeAnalysis';
const PHOTO_STORAGE_PREFIX = 'subclinicalPhotos_';

const BODY_PARTS = [
  { id: 'face', label: 'Face', icon: '😊', color: '#e0f2f1', relatedItems: ['sc-mapa-facial', 'sc-sinais-rosto', 'sc-sinais-emocionais-rosto', 'sc-espinhas-mapa-facial', 'sc-manchas-rugas', 'sc-sinais-faciais-gerais'] },
  { id: 'eyes', label: 'Olhos', icon: '👁️', color: '#e3f2fd', relatedItems: ['sc-sinais-olhos', 'sc-sinais-olhos-doencas', 'sc-olhos-esclera'] },
  { id: 'ears', label: 'Orelhas', icon: '👂', color: '#fff3e0', relatedItems: ['sc-sinais-ouvido'] },
  { id: 'tongue', label: 'Língua', icon: '👅', color: '#fce4ec', relatedItems: ['sc-lingua-colon', 'sc-lingua-homeopatia', 'sc-baco-pancreas'] },
  { id: 'nails_hands', label: 'Unhas das Mãos', icon: '💅', color: '#f1f8e9', relatedItems: ['sc-unhas-avisando', 'sc-disturbios-unhas-clinico', 'sc-palma-mao'] },
  { id: 'nails_feet', label: 'Unhas dos Pés', icon: '🦶', color: '#e8f5e9', relatedItems: ['sc-sinais-pes', 'sc-disturbios-unhas-clinico'] },
  { id: 'skin', label: 'Pele', icon: '🩹', color: '#fff8e1', relatedItems: ['sc-lesoes-pele-abcde', 'sc-manchas-rugas', 'sc-pele-corporal'] },
  { id: 'scalp', label: 'Cabelo / Couro', icon: '💇', color: '#f3e5f5', relatedItems: ['sc-calvicie-rins', 'sc-cabelo-couro'] },
  { id: 'mouth', label: 'Boca / Gengivas', icon: '🦷', color: '#fafafa', relatedItems: ['sc-dentes-gengiva', 'sc-lingua-colon', 'sc-lingua-homeopatia'] },
  { id: 'hands', label: 'Palma das Mãos', icon: '✋', color: '#e8eaf6', relatedItems: ['sc-palma-mao', 'sc-pescoco-circulacao'] },
  { id: 'other', label: 'Outros', icon: '📷', color: '#f5f5f5', relatedItems: [] },
];

const CATEGORY_COLORS = {
  'Língua e Digestão': '#e8f5e9',
  'Intestino': '#fff8e1',
  'Sistema Urinário': '#e3f2fd',
  'Fígado e Metabolismo': '#fff3e0',
  'Circulação e Metabolismo': '#fce4ec',
  'Rins e Hormônios': '#f3e5f5',
  'Circulação e Sistema Nervoso': '#e8eaf6',
  'Digestão e Energia': '#fffde7',
  'Mapeamento Facial': '#e0f2f1',
  'Tipos Constitucionais': '#fafafa',
  // Parte 1 — novas categorias
  'Sinais nos Pés': '#e8f5e9',
  'Sinais nos Olhos': '#e3f2fd',
  'Avaliação Dermatológica': '#fce4ec',
  'Sinais Nasais': '#e0f2f1',
  'Mapeamento de Acne': '#fff8e1',
  // Parte 2 — novas categorias
  'Mapa da Dor de Cabeça': '#f3e5f5',
  'Sinais Faciais': '#fafafa',
  'Sinais Emocionais': '#e8eaf6',
  'Deficiências Nutricionais': '#fffde7',
  'Sinais no Ouvido': '#fff3e0',
  'Sinais nas Unhas': '#f1f8e9',
  // Novas categorias 2026-07
  'Sinais nas Mãos': '#e0f7fa',
  'Pele Corporal': '#fff3e0',
  'Cabelo e Couro Cabeludo': '#f3e5f5',
  'Saúde Oral': '#f9fbe7',
  'Saúde Intestinal': '#efebe9',
};

const CATEGORY_BORDER_COLORS = {
  'Língua e Digestão': '#a5d6a7',
  'Intestino': '#ffcc02',
  'Sistema Urinário': '#90caf9',
  'Fígado e Metabolismo': '#ffb74d',
  'Circulação e Metabolismo': '#f48fb1',
  'Rins e Hormônios': '#ce93d8',
  'Circulação e Sistema Nervoso': '#9fa8da',
  'Digestão e Energia': '#fff176',
  'Mapeamento Facial': '#80cbc4',
  'Tipos Constitucionais': '#bdbdbd',
  // Parte 1 — novas categorias
  'Sinais nos Pés': '#66bb6a',
  'Sinais nos Olhos': '#64b5f6',
  'Avaliação Dermatológica': '#ef9a9a',
  'Sinais Nasais': '#4db6ac',
  'Mapeamento de Acne': '#ffd54f',
  // Parte 2 — novas categorias
  'Mapa da Dor de Cabeça': '#ba68c8',
  'Sinais Faciais': '#9e9e9e',
  'Sinais Emocionais': '#7986cb',
  'Deficiências Nutricionais': '#ffd54f',
  'Sinais no Ouvido': '#ffb74d',
  'Sinais nas Unhas': '#aed581',
  // Novas categorias 2026-07
  'Sinais nas Mãos': '#4db6ac',
  'Pele Corporal': '#ff8a65',
  'Cabelo e Couro Cabeludo': '#ab47bc',
  'Saúde Oral': '#c0ca33',
  'Saúde Intestinal': '#8d6e63',
};

// Map body-part id → display color (for category backgrounds)
const CATEGORY_COLORS_ALL = { ...CATEGORY_COLORS };


// Build items with sign IDs
const buildItems = () =>
  (subclinicalData || []).map((item) => ({
    ...item,
    imageUrl: `/assets/subclinico-biorressonancia/${item.image}`,
    signItems: (item.sinais || []).map((text, idx) => ({
      id: `${item.id}::s${idx}`,
      index: idx,
      text,
    })),
  }));

const ITEMS = buildItems();

const itemsById = ITEMS.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

const signsById = (() => {
  const map = {};
  ITEMS.forEach((item) => {
    (item.signItems || []).forEach((sign) => {
      map[sign.id] = { ...sign, itemId: item.id, itemTitle: item.title, itemCategoria: item.categoria };
    });
  });
  return map;
})();

// Group items by category
const ITEMS_BY_CATEGORY = ITEMS.reduce((acc, item) => {
  const cat = item.categoria || 'Outros';
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(item);
  return acc;
}, {});

export default function SubclinicalIntegrativePage() {
  const { id } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [selectedSignIds, setSelectedSignIds] = useState([]);
  const [savedMsg, setSavedMsg] = useState('');

  // Photo gallery state
  const [photoGallery, setPhotoGallery] = useState({}); // { bodyPartId: [{ id, base64, caption, timestamp }] }
  const [photoModalSrc, setPhotoModalSrc] = useState(null);
  const [photoModalCaption, setPhotoModalCaption] = useState('');
  const [activePhotoTab, setActivePhotoTab] = useState(0);
  const [photoAccordionOpen, setPhotoAccordionOpen] = useState(true);
  const [highlightedItems, setHighlightedItems] = useState([]); // item ids to highlight

  // Analysis dialog state
  const [analyzeDialogOpen, setAnalyzeDialogOpen] = useState(false);
  const [analyzeBodyPart, setAnalyzeBodyPart] = useState(null);

  // Signs and items derived from selections
  const selectedSigns = useMemo(
    () => selectedSignIds.map((sid) => signsById[sid]).filter(Boolean),
    [selectedSignIds]
  );

  const selectedItemIds = useMemo(
    () => Array.from(new Set(selectedSigns.map((s) => s.itemId))),
    [selectedSigns]
  );

  const selectedItems = useMemo(
    () => selectedItemIds.map((iid) => itemsById[iid]).filter(Boolean),
    [selectedItemIds]
  );

  // For each item, get its selected signs
  const selectedSignsByItem = useMemo(() => {
    const map = {};
    selectedSigns.forEach((sign) => {
      if (!map[sign.itemId]) map[sign.itemId] = [];
      map[sign.itemId].push(sign);
    });
    return map;
  }, [selectedSigns]);

  // Consolidated condutas (deduplicated by item)
  const consolidatedItems = useMemo(
    () =>
      selectedItems.map((item) => ({
        item,
        selectedSigns: selectedSignsByItem[item.id] || [],
      })),
    [selectedItems, selectedSignsByItem]
  );

  const saveModuleData = useCallback(
    (nextSignIds) => {
      if (!patientId) return;
      try {
        const anamneses = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const index = anamneses.findIndex((entry) => String(entry.id) === String(patientId));
        if (index === -1) return;

        const selectedSignEntries = nextSignIds.map((sid) => signsById[sid]).filter(Boolean);
        const selectedByItem = {};
        selectedSignEntries.forEach((sign) => {
          if (!selectedByItem[sign.itemId]) {
            const item = itemsById[sign.itemId];
            selectedByItem[sign.itemId] = {
              itemId: sign.itemId,
              itemTitle: item?.title || '',
              emoji: item?.emoji || '',
              categoria: item?.categoria || '',
              diagnostico: item?.diagnostico || '',
              condutas: item?.condutas || null,
              selectedSigns: [],
            };
          }
          selectedByItem[sign.itemId].selectedSigns.push(sign.text);
        });

        anamneses[index][MODULE_KEY] = {
          selectedSignIds: nextSignIds,
          selectedItems: Object.values(selectedByItem),
          updatedAt: new Date().toISOString(),
        };
        anamneses[index].subclinicalSelectedCount = nextSignIds.length;
        anamneses[index].subclinicalSelectedFigures = Object.keys(selectedByItem).length;
        anamneses[index].updatedAt = new Date().toISOString();

        localStorage.setItem(STORAGE_KEY, JSON.stringify(anamneses));
        setPatientData(anamneses[index]);

        try {
          window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: anamneses[index] }));
        } catch (_e) {}
      } catch (error) {
        console.error('Erro ao salvar dados Subclínico:', error);
      }
    },
    [patientId]
  );

  useEffect(() => {
    try {
      const anamneses = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!Array.isArray(anamneses) || anamneses.length === 0) return;

      const currentPatientId = id || localStorage.getItem('currentPatientId');
      let patient = null;

      if (currentPatientId) {
        patient = anamneses.find((entry) => String(entry.id) === String(currentPatientId)) || null;
      }

      if (!patient) {
        patient = [...anamneses].sort((a, b) => {
          const dateA = new Date(a?.updatedAt || a?.createdAt || 0).getTime();
          const dateB = new Date(b?.updatedAt || b?.createdAt || 0).getTime();
          return dateB - dateA;
        })[0];
        if (patient?.id) localStorage.setItem('currentPatientId', String(patient.id));
      }

      if (!patient) return;
      if (patient?.id && String(localStorage.getItem('currentPatientId')) !== String(patient.id)) {
        localStorage.setItem('currentPatientId', String(patient.id));
      }

      setPatientData(patient);
      setPatientId(patient.id);

      const saved = patient[MODULE_KEY];
      if (saved?.selectedSignIds && Array.isArray(saved.selectedSignIds)) {
        const valid = saved.selectedSignIds.filter((sid) => Boolean(signsById[sid]));
        setSelectedSignIds(valid);
      }
    } catch (error) {
      console.error('Erro ao carregar paciente Subclínico:', error);
    }
  }, [id]);

  // Load photos when patientId changes
  useEffect(() => {
    if (!patientId) return;
    try {
      const stored = localStorage.getItem(`${PHOTO_STORAGE_PREFIX}${patientId}`);
      if (stored) setPhotoGallery(JSON.parse(stored));
    } catch (_e) {}
  }, [patientId]);

  const handleOpenAnalysis = useCallback((bp) => {
    setAnalyzeBodyPart(bp);
    setAnalyzeDialogOpen(true);
  }, []);

  const handleApplyAnalysis = useCallback(() => {
    setAnalyzeDialogOpen(false);
  }, []);

  const savePhotos = useCallback((gallery) => {
    if (!patientId) return;
    try {
      localStorage.setItem(`${PHOTO_STORAGE_PREFIX}${patientId}`, JSON.stringify(gallery));
    } catch (e) {
      console.error('Erro ao salvar fotos:', e);
    }
  }, [patientId]);

  const handlePhotoUpload = useCallback((bodyPartId, files) => {
    const readers = Array.from(files).map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({
          id: `photo_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          base64: e.target.result,
          caption: file.name,
          bodyPart: bodyPartId,
          timestamp: new Date().toISOString(),
        });
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((newPhotos) => {
      setPhotoGallery((prev) => {
        const updated = { ...prev, [bodyPartId]: [...(prev[bodyPartId] || []), ...newPhotos] };
        savePhotos(updated);
        return updated;
      });
    });
  }, [savePhotos]);

  const handlePhotoDelete = useCallback((bodyPartId, photoId) => {
    setPhotoGallery((prev) => {
      const updated = { ...prev, [bodyPartId]: (prev[bodyPartId] || []).filter((p) => p.id !== photoId) };
      savePhotos(updated);
      return updated;
    });
  }, [savePhotos]);

  const totalPhotos = useMemo(
    () => Object.values(photoGallery).reduce((sum, arr) => sum + (arr?.length || 0), 0),
    [photoGallery]
  );

  const handleToggleSign = (signId) => {
    setSelectedSignIds((prev) => {
      const next = prev.includes(signId) ? prev.filter((s) => s !== signId) : [...prev, signId];
      if (patientId) saveModuleData(next);
      return next;
    });
  };

  const handleClearSelections = () => {
    setSelectedSignIds([]);
    if (patientId) saveModuleData([]);
  };

  const handleSaveHistorico = () => {
    if (!patientId) return;
    const resumo = `${selectedSigns.length} sinais observados em ${selectedItems.length} imagem(ns): ${selectedSigns
      .slice(0, 3)
      .map((s) => s.text)
      .join(', ')}${selectedSigns.length > 3 ? '...' : ''}`;
    appendHistoricoEntry(patientId, {
      id: `subclinico-${Date.now()}`,
      data: new Date().toISOString(),
      tipo: 'subclinico',
      titulo: `Análise Subclínica Integrativa — ${selectedSigns.length} sinais`,
      resumo,
      pagina: '/anamnese-subclinico',
    });
    setSavedMsg('Salvo no histórico!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handlePrintReceituario = async () => {
    if (consolidatedItems.length === 0) return;
    const patName = patientData?.q01_nome || patientData?.nome || 'Não identificado';
    const patAge = getPatientAge(patientData);
    const patSex = patientData?.q04_sexo || '';
    const dateStr = new Date().toLocaleDateString('pt-BR');

    const mkRows = (arr, color) =>
      arr.map(t => `<tr><td style="padding:1.5px 0 1.5px 8px;color:${color};font-size:8.5pt;line-height:1.35;vertical-align:top;">• ${t}</td></tr>`).join('');

    const section = (label, icon, arr, color, bgColor) => {
      if (!arr || arr.length === 0) return '';
      return `
        <div style="margin-top:5px;">
          <div style="background:${bgColor};padding:2px 6px;border-radius:3px;margin-bottom:2px;display:inline-block;">
            <span style="font-size:8pt;font-weight:700;color:${color};">${icon} ${label}</span>
          </div>
          <table style="width:100%;border-collapse:collapse;">${mkRows(arr, '#333')}</table>
        </div>`;
    };

    let itemsHtml = '';
    consolidatedItems.forEach(({ item, selectedSigns: signs }) => {
      if (!item.condutas && !item.diagnostico) return;
      const c = item.condutas || {};
      const sinais = signs.map(s => `<span style="display:inline-block;background:#e8f5e9;border:1px solid #a5d6a7;border-radius:3px;padding:1px 5px;margin:1px;font-size:8pt;color:#1b5e20;">✓ ${s.text}</span>`).join(' ');

      const leftCol = `
        ${c.fitoterapia?.length ? section('Fitoterapia', '🌿', c.fitoterapia, '#1b5e20', '#f1f8f1') : ''}
        ${c.suplementacao?.length ? section('Suplementação', '💊', c.suplementacao, '#0d47a1', '#f0f4ff') : ''}`;

      const rightCol = `
        ${c.dietoterapia?.length ? section('Dietoterapia', '🥗', c.dietoterapia, '#bf360c', '#fff8f5') : ''}
        ${c.estilo_vida?.length ? section('Estilo de Vida', '🏃', c.estilo_vida, '#4a148c', '#f9f0ff') : ''}
        ${c.orientacoes?.length ? section('Orientações Clínicas', '📋', c.orientacoes, '#4e342e', '#fdf6f0') : ''}`;

      const ctRow = c.contraindicacoes?.length ? `
        <div style="margin-top:5px;padding:4px 8px;background:#fff3e0;border-left:3px solid #f57c00;border-radius:2px;">
          <div style="font-size:8pt;font-weight:700;color:#e65100;margin-bottom:2px;">⚠️ Contraindicações e Cuidados</div>
          <table style="width:100%;border-collapse:collapse;">${mkRows(c.contraindicacoes, '#b71c1c')}</table>
        </div>` : '';

      itemsHtml += `
        <div class="proto-card" style="margin-bottom:10px;border:1px solid #c8e6c9;border-top:3px solid #2e7d32;border-radius:4px;padding:8px 10px;page-break-inside:avoid;background:#fafffe;">
          <div style="margin-bottom:5px;">
            <span style="font-size:10.5pt;font-weight:700;color:#1b5e20;">${item.emoji || '🔍'} ${item.title}</span>
            ${item.categoria ? `<span style="float:right;font-size:7.5pt;background:#e8f5e9;color:#388e3c;padding:1px 6px;border-radius:8px;font-weight:600;">${item.categoria}</span>` : ''}
          </div>
          ${item.diagnostico ? `<p style="margin:0 0 5px 0;font-style:italic;color:#555;font-size:8.5pt;line-height:1.4;border-bottom:1px solid #e0e0e0;padding-bottom:4px;">${item.diagnostico}</p>` : ''}
          ${signs.length > 0 ? `<div style="margin-bottom:5px;"><span style="font-size:8pt;font-weight:700;color:#2e7d32;">Sinais observados: </span>${sinais}</div>` : ''}
          <table style="width:100%;border-collapse:collapse;">
            <tr style="vertical-align:top;">
              <td style="width:50%;padding-right:6px;border-right:1px solid #e8f5e9;">${leftCol}</td>
              <td style="width:50%;padding-left:6px;">${rightCol}</td>
            </tr>
          </table>
          ${ctRow}
        </div>`;
    });

    const summaryLine = `${consolidatedItems.length} área(s) analisada(s) · ${consolidatedItems.reduce((acc, { selectedSigns }) => acc + selectedSigns.length, 0)} sinal(is) selecionado(s)`;

    // Build photo HTML for print
    const allPhotos = BODY_PARTS.flatMap((bp) =>
      (photoGallery[bp.id] || []).map((p) => ({ ...p, bodyPartLabel: bp.label, bodyPartIcon: bp.icon }))
    );
    const photosHtml = allPhotos.length > 0 ? `
      <div style="margin-bottom:12px;page-break-inside:avoid;">
        <div style="font-size:10pt;font-weight:700;color:#0d47a1;margin-bottom:6px;padding-bottom:3px;border-bottom:2px solid #90caf9;">
          📸 Registro Fotográfico do Exame Subclínico
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${allPhotos.map(p => `
            <div style="text-align:center;width:120px;">
              <img src="${p.base64}" style="width:120px;height:90px;object-fit:cover;border:1px solid #e0e0e0;border-radius:4px;" />
              <div style="font-size:7pt;color:#555;margin-top:2px;">${p.bodyPartIcon} ${p.bodyPartLabel}</div>
            </div>`).join('')}
        </div>
      </div>` : '';

    const bodyHtml = `
      <style>
        @page { size: A4 portrait; margin: 12mm 14mm 14mm 14mm; }
        body { font-family: 'Arial', 'Helvetica', sans-serif; font-size: 9pt; color: #1a1a1a; }
        .proto-card { break-inside: avoid; }
      </style>
      <div style="margin-bottom:10px;padding:6px 10px;background:linear-gradient(90deg,#1b5e20,#388e3c);border-radius:4px;color:#fff;display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:11pt;font-weight:700;">🧬 Análise Subclínica Integrativa — Protocolo de Tratamento</span>
        <span style="font-size:8.5pt;opacity:0.9;">${summaryLine}</span>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:10px;font-size:9pt;background:#f9fbe7;border:1px solid #c8e6c9;border-radius:4px;">
        <tr>
          <td style="padding:5px 10px;"><strong>Paciente:</strong> ${patName}</td>
          <td style="padding:5px 10px;"><strong>Idade:</strong> ${patAge || '—'}</td>
          ${patSex ? `<td style="padding:5px 10px;"><strong>Sexo:</strong> ${patSex}</td>` : ''}
          <td style="padding:5px 10px;"><strong>Data:</strong> ${dateStr}</td>
        </tr>
      </table>
      ${photosHtml}
      ${itemsHtml}
      <div style="margin-top:8px;padding:5px 10px;background:#fff8e1;border:1px solid #ffe082;border-radius:4px;font-size:8pt;color:#5d4037;">
        <strong>Nota:</strong> Este protocolo contém sugestões terapêuticas integrativas. Sempre respeitar as contraindicações listadas.
        Posologia indicativa — ajustar conforme resposta clínica individual e orientação profissional.
      </div>`;

    try {
      const qrUrl = await generateQrDataUrl(`${window.location.origin}/anamnese-subclinico`);
      const html = await buildLetterheadHtml({
        title: 'Análise Subclínica — Protocolo de Tratamento',
        bodyHtml,
        qrUrl,
      });
      openPrintWindow(html, true);
    } catch (e) {
      console.error('Erro ao gerar receituário:', e);
    }
  };

  const patientName = patientData?.q01_nome || patientData?.nome || 'Não identificado';
  const patientAge = getPatientAge(patientData);

  return (
    <Container maxWidth="xl">
      <Paper sx={{ p: { xs: 2, md: 3 }, mt: 3 }} id="subclinical-print-area">

        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}
          >
            🧬 Análise Subclínica Integrativa
          </Typography>
          <Alert severity="info" sx={{ mt: 1 }}>
            Observe o paciente e marque os sinais que ele apresenta. Ao selecionar, veja o possível problema e os protocolos de tratamento.
          </Alert>
        </Box>

        {/* Patient Card */}
        {patientData ? (
          <Card variant="outlined" sx={{ mb: 2, borderColor: '#90caf9', bgcolor: '#f8fbff' }}>
            <CardContent sx={{ py: 1.5 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <PersonIcon color="primary" fontSize="small" />
                <Typography variant="subtitle1" fontWeight={700}>
                  Paciente Ativo
                </Typography>
                {selectedSignIds.length > 0 && (
                  <Chip
                    size="small"
                    color="primary"
                    label={`${selectedSignIds.length} sinal(is) selecionado(s)`}
                  />
                )}
              </Stack>
              <Grid container spacing={1.5}>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2"><strong>Nome:</strong> {patientName}</Typography>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Typography variant="body2"><strong>Idade:</strong> {patientAge || '—'}</Typography>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Typography variant="body2"><strong>Sexo:</strong> {patientData?.q04_sexo || '—'}</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2"><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Nenhum paciente ativo. Abra Nova Anamnese Integrativa (Identificação), salve e retorne.
          </Alert>
        )}

        {/* Action Buttons */}
        <Box className="no-print" sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button
            variant="contained"
            startIcon={<LocalPrintshopIcon />}
            onClick={handlePrintReceituario}
            disabled={selectedSignIds.length === 0}
          >
            Imprimir Receituário
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<CloudUploadIcon />}
            onClick={handleSaveHistorico}
            disabled={!patientId || selectedSignIds.length === 0}
          >
            Salvar no Histórico
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleClearSelections}
            disabled={selectedSignIds.length === 0}
          >
            Limpar Seleção
          </Button>
          {savedMsg && (
            <Chip label={savedMsg} color="success" size="small" />
          )}
        </Box>

        {/* ===== PHOTO GALLERY SECTION ===== */}
        <Accordion
          expanded={photoAccordionOpen}
          onChange={() => setPhotoAccordionOpen((v) => !v)}
          className="no-print"
          sx={{ mb: 3, border: '1px solid #90caf9', borderRadius: '8px !important', '&:before': { display: 'none' } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e3f2fd', borderRadius: '8px' }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <CameraAltIcon color="primary" />
              <Typography fontWeight={700} color="primary.dark">
                📸 Galeria Fotográfica — Exame Subclínico Visual
              </Typography>
              {totalPhotos > 0 && (
                <Badge badgeContent={totalPhotos} color="primary" sx={{ ml: 1 }}>
                  <PhotoLibraryIcon fontSize="small" color="action" />
                </Badge>
              )}
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            <Alert severity="info" sx={{ mb: 2, fontSize: '0.82rem' }}>
              Fotografe ou importe imagens das diferentes partes do corpo. O sistema indicará quais análises subclínicas são relevantes para cada área.
              As fotos são salvas localmente e incluídas no receituário impresso.
            </Alert>

            {/* Body part tabs */}
            <Tabs
              value={activePhotoTab}
              onChange={(_, v) => setActivePhotoTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mb: 2, borderBottom: '1px solid #e0e0e0' }}
            >
              {BODY_PARTS.map((bp, idx) => (
                <Tab
                  key={bp.id}
                  label={
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <span style={{ fontSize: '1rem' }}>{bp.icon}</span>
                      <span>{bp.label}</span>
                      {(photoGallery[bp.id] || []).length > 0 && (
                        <Chip
                          size="small"
                          label={(photoGallery[bp.id] || []).length}
                          color="primary"
                          sx={{ height: 16, fontSize: '0.65rem', ml: 0.5 }}
                        />
                      )}
                    </Stack>
                  }
                  sx={{ textTransform: 'none', minHeight: 48, fontSize: '0.8rem' }}
                />
              ))}
            </Tabs>

            {BODY_PARTS.map((bp, idx) => (
              <Box key={bp.id} hidden={activePhotoTab !== idx}>
                {/* Related analyses hint */}
                {bp.relatedItems.length > 0 && (
                  <Box sx={{ mb: 2, p: 1.5, bgcolor: bp.color || '#f5f5f5', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                    <Typography variant="caption" fontWeight={700} color="primary.dark" sx={{ display: 'block', mb: 0.5 }}>
                      🔍 Análises subclínicas relacionadas a: {bp.icon} {bp.label}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 0.5 }}>
                      {bp.relatedItems.map((itemId) => {
                        const item = itemsById[itemId];
                        if (!item) return null;
                        return (
                          <Chip
                            key={itemId}
                            size="small"
                            label={`${item.emoji || '🔍'} ${item.title}`}
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              setHighlightedItems(bp.relatedItems);
                              setPhotoAccordionOpen(false);
                              setTimeout(() => {
                                const el = document.getElementById(`subclinical-item-${itemId}`);
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                setTimeout(() => setHighlightedItems([]), 4000);
                              }, 300);
                            }}
                            sx={{ cursor: 'pointer', fontSize: '0.7rem' }}
                          />
                        );
                      })}
                    </Stack>
                  </Box>
                )}

                {/* Analyze button */}
                {bp.relatedItems.length > 0 && (
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<AnalyzeIcon />}
                      onClick={() => handleOpenAnalysis(bp)}
                      sx={{
                        background: 'linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)',
                        color: '#fff',
                        borderRadius: 3,
                        px: 4,
                        py: 1.2,
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        boxShadow: '0 4px 14px rgba(123,31,162,0.35)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #6a1b9a 0%, #7b1fa2 100%)',
                          boxShadow: '0 6px 18px rgba(123,31,162,0.45)',
                        },
                      }}
                    >
                      🔬 Analisar Sinais — {bp.label}
                    </Button>
                  </Box>
                )}

                {/* Upload area */}
                <Box
                  sx={{
                    border: '2px dashed #90caf9',
                    borderRadius: 2,
                    p: 2,
                    textAlign: 'center',
                    bgcolor: '#f8fbff',
                    mb: 2,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#e3f2fd' },
                    transition: 'background 0.2s',
                  }}
                  onClick={() => document.getElementById(`photo-upload-${bp.id}`).click()}
                >
                  <input
                    id={`photo-upload-${bp.id}`}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    onChange={(e) => handlePhotoUpload(bp.id, e.target.files)}
                  />
                  <AddPhotoIcon sx={{ fontSize: 36, color: '#90caf9', mb: 1 }} />
                  <Typography variant="body2" color="primary" fontWeight={600}>
                    Clique para adicionar fotos de {bp.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    JPG, PNG, HEIC — múltiplas fotos permitidas
                  </Typography>
                </Box>

                {/* Photo thumbnails */}
                {(photoGallery[bp.id] || []).length > 0 && (
                  <Grid container spacing={1.5}>
                    {(photoGallery[bp.id] || []).map((photo) => (
                      <Grid item xs={6} sm={4} md={3} lg={2} key={photo.id}>
                        <Box
                          sx={{
                            position: 'relative',
                            border: '1px solid #e0e0e0',
                            borderRadius: 2,
                            overflow: 'hidden',
                            bgcolor: '#fff',
                            '&:hover .photo-actions': { opacity: 1 },
                          }}
                        >
                          <Box
                            component="img"
                            src={photo.base64}
                            alt={photo.caption}
                            sx={{ width: '100%', height: 120, objectFit: 'cover', display: 'block', cursor: 'pointer' }}
                            onClick={() => { setPhotoModalSrc(photo.base64); setPhotoModalCaption(`${bp.icon} ${bp.label} — ${photo.caption}`); }}
                          />
                          <Box
                            className="photo-actions"
                            sx={{
                              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                              bgcolor: 'rgba(0,0,0,0.45)', opacity: 0,
                              transition: 'opacity 0.2s', display: 'flex',
                              alignItems: 'center', justifyContent: 'center', gap: 1,
                            }}
                          >
                            <Tooltip title="Ampliar">
                              <IconButton
                                size="small"
                                sx={{ bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: '#fff' } }}
                                onClick={() => { setPhotoModalSrc(photo.base64); setPhotoModalCaption(`${bp.icon} ${bp.label} — ${photo.caption}`); }}
                              >
                                <ZoomInIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Excluir foto">
                              <IconButton
                                size="small"
                                sx={{ bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: '#fff' } }}
                                onClick={() => handlePhotoDelete(bp.id, photo.id)}
                              >
                                <DeleteIcon fontSize="small" color="error" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Box sx={{ p: 0.5, bgcolor: '#f9f9f9' }}>
                            <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#666', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {photo.caption}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}

                {(photoGallery[bp.id] || []).length === 0 && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                    Nenhuma foto de {bp.label} adicionada ainda.
                  </Typography>
                )}
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* ===== ANALYSIS DIALOG ===== */}
        <Dialog
          open={analyzeDialogOpen}
          onClose={() => setAnalyzeDialogOpen(false)}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <DialogTitle
            sx={{
              background: 'linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <AnalyzeIcon />
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2 }}>
                � Comparar Sinais — {analyzeBodyPart?.icon} {analyzeBodyPart?.label}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.85 }}>
                Compare a foto do paciente com a referência e marque os sinais presentes
              </Typography>
            </Box>
            <IconButton
              onClick={() => setAnalyzeDialogOpen(false)}
              sx={{ ml: 'auto', color: '#fff' }}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers sx={{ p: { xs: 2, md: 3 } }}>

            {/* Patient photos for this area */}
            {(photoGallery[analyzeBodyPart?.id] || []).length > 0 && (
              <Paper variant="outlined" sx={{ p: 1.5, mb: 2, bgcolor: '#f8f9fa', borderColor: '#90caf9' }}>
                <Typography variant="caption" fontWeight={700} color="primary.dark" sx={{ display: 'block', mb: 1 }}>
                  📸 Fotos do paciente — {analyzeBodyPart?.icon} {analyzeBodyPart?.label}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                  {(photoGallery[analyzeBodyPart?.id] || []).map((photo) => (
                    <Box key={photo.id} component="img" src={photo.base64} alt={photo.caption}
                      sx={{ width: 100, height: 75, objectFit: 'cover', borderRadius: 1.5, border: '2px solid #90caf9', cursor: 'pointer' }}
                      onClick={() => { setPhotoModalSrc(photo.base64); setPhotoModalCaption(`${analyzeBodyPart.icon} ${analyzeBodyPart.label} — ${photo.caption}`); }}
                    />
                  ))}
                </Box>
              </Paper>
            )}

            <Alert severity="info" sx={{ mb: 2, fontSize: '0.8rem' }}>
              Compare as fotos do paciente com as imagens de referência abaixo e marque os sinais observados.
            </Alert>

            {analyzeBodyPart?.relatedItems.length === 0 ? (
              <Alert severity="warning">Nenhuma análise subclínica mapeada para esta área.</Alert>
            ) : (
              analyzeBodyPart?.relatedItems.map((itemId) => {
                const item = itemsById[itemId];
                if (!item) return null;
                const itemSigns = item.signItems || [];
                const checkedCount = itemSigns.filter((s) => selectedSignIds.includes(s.id)).length;
                const bgColor = CATEGORY_COLORS[item.categoria] || '#fafafa';
                const borderColor = CATEGORY_BORDER_COLORS[item.categoria] || '#e0e0e0';
                return (
                  <Paper key={itemId} variant="outlined" sx={{ p: 2, mb: 2, bgcolor: bgColor, borderColor: checkedCount > 0 ? '#2e7d32' : borderColor, borderWidth: checkedCount > 0 ? 2 : 1, borderRadius: 2, transition: 'border-color 0.2s' }}>
                    <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mb: 1.5 }}>
                      <Typography sx={{ fontSize: '1.3rem', lineHeight: 1 }}>{item.emoji || '🔍'}</Typography>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                          <Typography variant="subtitle2" fontWeight={700}>{item.title}</Typography>
                          <Chip size="small" label={item.categoria} sx={{ fontSize: '0.65rem', height: 18, bgcolor: borderColor, color: '#333' }} />
                          {checkedCount > 0 && (
                            <Chip size="small" color="success" icon={<CheckCircleIcon sx={{ fontSize: '0.9rem !important' }} />} label={`${checkedCount} sinal(is)`} sx={{ fontSize: '0.68rem', height: 20 }} />
                          )}
                        </Stack>
                        {item.diagnostico && (
                          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', display: 'block', mt: 0.3 }}>{item.diagnostico}</Typography>
                        )}
                      </Box>
                    </Stack>

                    <Grid container spacing={2} sx={{ mb: 1.5 }}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" fontWeight={700} color="secondary.dark" sx={{ display: 'block', mb: 0.5 }}>🖼️ Referência do sistema</Typography>
                        <Box component="img" src={item.imageUrl} alt={item.title}
                          sx={{ width: '100%', maxHeight: 145, objectFit: 'contain', borderRadius: 1.5, border: '1px solid #e0e0e0', bgcolor: '#fff', cursor: 'pointer', display: 'block' }}
                          onClick={() => { setPhotoModalSrc(item.imageUrl); setPhotoModalCaption(item.title); }}
                          onError={(e) => { if (e.target.dataset.fb) return; e.target.dataset.fb = '1'; e.target.src = '/assets/subclinico-biorressonancia/placeholder.png'; }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>✅ Marque os sinais observados:</Typography>
                        <Grid container spacing={0.5}>
                          {itemSigns.map((sign) => {
                            const isChecked = selectedSignIds.includes(sign.id);
                            return (
                              <Grid item xs={12} key={sign.id}>
                                <FormControlLabel
                                  control={<Checkbox checked={isChecked} onChange={() => handleToggleSign(sign.id)} size="small" color="success" sx={{ p: 0.4 }} />}
                                  label={<Typography variant="caption" sx={{ fontSize: '0.78rem', fontWeight: isChecked ? 700 : 400, color: isChecked ? 'success.dark' : 'text.primary', lineHeight: 1.4 }}>{sign.text}</Typography>}
                                  sx={{ alignItems: 'flex-start', m: 0, mb: 0.3 }}
                                />
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                );
              })
            )}
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #e0e0e0', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => setAnalyzeDialogOpen(false)}
            >
              Fechar
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircleIcon />}
              onClick={handleApplyAnalysis}
              sx={{ fontWeight: 700 }}
            >
              Aplicar Resultados ao Protocolo
            </Button>
          </DialogActions>
        </Dialog>

        {/* Photo lightbox modal */}
        <Dialog
          open={!!photoModalSrc}
          onClose={() => setPhotoModalSrc(null)}
          maxWidth="md"
          fullWidth
        >
          <DialogContent sx={{ p: 0, bgcolor: '#000', position: 'relative' }}>
            <IconButton
              onClick={() => setPhotoModalSrc(null)}
              sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.85)', zIndex: 1 }}
            >
              <CloseIcon />
            </IconButton>
            {photoModalSrc && (
              <Box
                component="img"
                src={photoModalSrc}
                alt={photoModalCaption}
                sx={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', display: 'block' }}
              />
            )}
            {photoModalCaption && (
              <Box sx={{ p: 1.5, bgcolor: '#111', color: '#eee' }}>
                <Typography variant="caption">{photoModalCaption}</Typography>
              </Box>
            )}
          </DialogContent>
        </Dialog>

        {/* Cards Grid - flat continuous grid, all items 4 per row */}
        <Box id="subclinical-cards-grid" sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 2 }}>
        {Object.entries(ITEMS_BY_CATEGORY).flatMap(([categoria, categoryItems]) =>
          categoryItems.map((item) => {
                const itemSelectedSigns = selectedSignsByItem[item.id] || [];
                const hasSelections = itemSelectedSigns.length > 0;
                const bgColor = CATEGORY_COLORS[item.categoria] || '#ffffff';
                const borderColor = hasSelections
                  ? '#2e7d32'
                  : CATEGORY_BORDER_COLORS[item.categoria] || '#e0e0e0';

                const isHighlighted = highlightedItems.includes(item.id);

                return (
                  <Box key={item.id} id={`subclinical-item-${item.id}`} sx={{ minWidth: 0 }}>
                    <Card
                      variant="outlined"
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderColor: isHighlighted ? '#1565c0' : borderColor,
                        borderWidth: (hasSelections || isHighlighted) ? 2 : 1,
                        bgcolor: isHighlighted ? '#e3f2fd' : bgColor,
                        transition: 'border-color 0.2s, box-shadow 0.2s, background 0.3s',
                        boxShadow: isHighlighted
                          ? '0 0 0 3px rgba(21,101,192,0.3)'
                          : hasSelections ? '0 2px 12px rgba(46,125,50,0.15)' : undefined,
                      }}
                    >
                      {/* Image */}
                      <CardMedia
                        component="img"
                        image={item.imageUrl}
                        alt={item.title}
                        sx={{ width: '100%', height: 'auto', objectFit: 'contain', bgcolor: 'white', p: 0.5, display: 'block' }}
                        onError={(e) => {
                          if (e.target.dataset.fallbackApplied) return;
                          e.target.dataset.fallbackApplied = '1';
                          e.target.src = '/assets/subclinico-biorressonancia/placeholder.png';
                        }}
                      />

                      <CardContent sx={{ flexGrow: 1, pt: 1.5, pb: 1 }}>
                        {/* Title + badge */}
                        <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mb: 1 }}>
                          <Typography variant="caption" sx={{ fontSize: '1.1rem' }}>
                            {item.emoji || '🔍'}
                          </Typography>
                          <Box>
                            <Typography variant="body2" fontWeight={700} sx={{ lineHeight: 1.3 }}>
                              {item.title}
                            </Typography>
                            {hasSelections && (
                              <Chip
                                size="small"
                                color="success"
                                label={`${itemSelectedSigns.length} selecionado(s)`}
                                sx={{ mt: 0.5, height: 18, fontSize: '0.65rem' }}
                              />
                            )}
                          </Box>
                        </Stack>

                        <Divider sx={{ mb: 1 }} />

                        {/* Signs checkboxes */}
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 600 }}>
                          Observe e marque os sinais presentes:
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.1 }}>
                          {(item.signItems || []).map((sign) => (
                            <FormControlLabel
                              key={sign.id}
                              control={
                                <Checkbox
                                  checked={selectedSignIds.includes(sign.id)}
                                  onChange={() => handleToggleSign(sign.id)}
                                  size="small"
                                  color="success"
                                  sx={{ p: 0.3 }}
                                />
                              }
                              label={
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontSize: '0.72rem',
                                    fontWeight: selectedSignIds.includes(sign.id) ? 700 : 400,
                                    color: selectedSignIds.includes(sign.id) ? 'success.dark' : 'text.primary',
                                  }}
                                >
                                  {sign.text}
                                </Typography>
                              }
                              sx={{ alignItems: 'flex-start', m: 0, mb: 0.2 }}
                            />
                          ))}
                        </Box>

                        {/* Protocol Panel - shown when signs selected */}
                        {hasSelections && (
                          <Box
                            sx={{
                              mt: 1.5,
                              p: 1.5,
                              bgcolor: 'rgba(46,125,50,0.06)',
                              border: '1px solid',
                              borderColor: 'success.light',
                              borderRadius: 1,
                            }}
                            className="protocol-panel"
                          >
                            {/* Problem explanation */}
                            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 1 }}>
                              <MedicalServicesIcon fontSize="small" color="warning" />
                              <Typography variant="caption" fontWeight={700} color="warning.dark">
                                POSSÍVEL PROBLEMA
                              </Typography>
                            </Stack>
                            <Typography variant="caption" sx={{ display: 'block', mb: 1.5, lineHeight: 1.5 }}>
                              {item.diagnostico}
                            </Typography>

                            {/* Selected signs summary */}
                            <Typography variant="caption" fontWeight={700} color="success.dark" sx={{ display: 'block', mb: 0.5 }}>
                              Sinais observados:
                            </Typography>
                            {itemSelectedSigns.map((sign, idx) => (
                              <Typography key={sign.id} variant="caption" sx={{ display: 'block', pl: 1, mb: 0.2, color: 'success.dark' }}>
                                ✓ {sign.text}
                              </Typography>
                            ))}

                            {/* Protocol - always visible when signs are selected */}
                            {item.condutas && (
                              <Box sx={{ mt: 1.5 }}>
                                {item.condutas.fitoterapia?.length > 0 && (
                                  <Box sx={{ mb: 1 }}>
                                    <Typography variant="caption" fontWeight={700} sx={{ display: 'block', color: '#388e3c' }}>
                                      🌿 Fitoterapia:
                                    </Typography>
                                    {item.condutas.fitoterapia.map((f, i) => (
                                      <Typography key={i} variant="caption" sx={{ display: 'block', pl: 1, lineHeight: 1.6 }}>• {f}</Typography>
                                    ))}
                                  </Box>
                                )}
                                {item.condutas.suplementacao?.length > 0 && (
                                  <Box sx={{ mb: 1 }}>
                                    <Typography variant="caption" fontWeight={700} sx={{ display: 'block', color: '#1565c0' }}>
                                      💊 Suplementação:
                                    </Typography>
                                    {item.condutas.suplementacao.map((s, i) => (
                                      <Typography key={i} variant="caption" sx={{ display: 'block', pl: 1, lineHeight: 1.6 }}>• {s}</Typography>
                                    ))}
                                  </Box>
                                )}
                                {item.condutas.dietoterapia?.length > 0 && (
                                  <Box sx={{ mb: 1 }}>
                                    <Typography variant="caption" fontWeight={700} sx={{ display: 'block', color: '#e65100' }}>
                                      🥗 Dietoterapia:
                                    </Typography>
                                    {item.condutas.dietoterapia.map((d, i) => (
                                      <Typography key={i} variant="caption" sx={{ display: 'block', pl: 1, lineHeight: 1.6 }}>• {d}</Typography>
                                    ))}
                                  </Box>
                                )}
                                {item.condutas.estilo_vida?.length > 0 && (
                                  <Box sx={{ mb: 1 }}>
                                    <Typography variant="caption" fontWeight={700} sx={{ display: 'block', color: '#6a1b9a' }}>
                                      🏃 Estilo de Vida:
                                    </Typography>
                                    {item.condutas.estilo_vida.map((e, i) => (
                                      <Typography key={i} variant="caption" sx={{ display: 'block', pl: 1, lineHeight: 1.6 }}>• {e}</Typography>
                                    ))}
                                  </Box>
                                )}
                                {item.condutas.orientacoes?.length > 0 && (
                                  <Box sx={{ mb: 1 }}>
                                    <Typography variant="caption" fontWeight={700} sx={{ display: 'block', color: '#795548' }}>
                                      📋 Orientações:
                                    </Typography>
                                    {item.condutas.orientacoes.map((o, i) => (
                                      <Typography key={i} variant="caption" sx={{ display: 'block', pl: 1, lineHeight: 1.6 }}>• {o}</Typography>
                                    ))}
                                  </Box>
                                )}
                                {item.condutas.contraindicacoes?.length > 0 && (
                                  <Box sx={{ mt: 1, p: 1, bgcolor: '#fff3e0', borderLeft: '3px solid #f57c00', borderRadius: 1 }}>
                                    <Typography variant="caption" fontWeight={700} sx={{ display: 'block', color: '#e65100', mb: 0.5 }}>
                                      ⚠️ Contraindicações e Cuidados:
                                    </Typography>
                                    {item.condutas.contraindicacoes.map((ct, i) => (
                                      <Typography key={i} variant="caption" sx={{ display: 'block', pl: 1, lineHeight: 1.6, color: '#b71c1c' }}>• {ct}</Typography>
                                    ))}
                                  </Box>
                                )}
                              </Box>
                            )}
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Box>
                );
          })
        )}
        </Box>

        {/* Consolidated Final Treatment Plan */}
        {consolidatedItems.length > 0 && (
          <Box sx={{ mt: 4 }} id="consolidated-print-section">
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
              📋 Plano de Tratamento Final Consolidado
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              <strong>Paciente:</strong> {patientName} | <strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')} |{' '}
              <strong>Sinais observados:</strong> {selectedSigns.length} | <strong>Áreas envolvidas:</strong> {selectedItems.length}
            </Typography>

            {/* Selected signs list */}
            <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: '#f9f9f9' }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                Achados Clínicos Observados
              </Typography>
              {consolidatedItems.map(({ item, selectedSigns: signs }) => (
                <Box key={item.id} sx={{ mb: 1.5 }}>
                  <Typography variant="body2" fontWeight={700} color="primary.main">
                    {item.emoji} {item.title}
                  </Typography>
                  {signs.map((sign) => (
                    <Typography key={sign.id} variant="body2" sx={{ pl: 2 }}>
                      ✓ {sign.text}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Paper>

            {/* Protocols per affected area */}
            <Grid container spacing={2}>
              {consolidatedItems.map(({ item }) =>
                item.condutas ? (
                  <Grid item xs={12} md={6} key={`protocol-${item.id}`}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        height: '100%',
                        borderColor: CATEGORY_BORDER_COLORS[item.categoria] || '#e0e0e0',
                        borderWidth: 2,
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                        {item.emoji} {item.title}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', mb: 1.5, fontStyle: 'italic', color: 'text.secondary' }}>
                        {item.diagnostico}
                      </Typography>

                      {item.condutas.fitoterapia?.length > 0 && (
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="caption" fontWeight={700} color="#388e3c">🌿 Fitoterapia:</Typography>
                          {item.condutas.fitoterapia.map((f, i) => (
                            <Typography key={i} variant="caption" sx={{ display: 'block', pl: 1.5 }}>• {f}</Typography>
                          ))}
                        </Box>
                      )}
                      {item.condutas.suplementacao?.length > 0 && (
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="caption" fontWeight={700} color="#1565c0">💊 Suplementação:</Typography>
                          {item.condutas.suplementacao.map((s, i) => (
                            <Typography key={i} variant="caption" sx={{ display: 'block', pl: 1.5 }}>• {s}</Typography>
                          ))}
                        </Box>
                      )}
                      {item.condutas.dietoterapia?.length > 0 && (
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="caption" fontWeight={700} color="#e65100">🥗 Dietoterapia:</Typography>
                          {item.condutas.dietoterapia.map((d, i) => (
                            <Typography key={i} variant="caption" sx={{ display: 'block', pl: 1.5 }}>• {d}</Typography>
                          ))}
                        </Box>
                      )}
                      {item.condutas.estilo_vida?.length > 0 && (
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="caption" fontWeight={700} color="#6a1b9a">🏃 Estilo de Vida:</Typography>
                          {item.condutas.estilo_vida.map((e, i) => (
                            <Typography key={i} variant="caption" sx={{ display: 'block', pl: 1.5 }}>• {e}</Typography>
                          ))}
                        </Box>
                      )}
                      {item.condutas.orientacoes?.length > 0 && (
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="caption" fontWeight={700} color="#795548">📋 Orientações Clínicas:</Typography>
                          {item.condutas.orientacoes.map((o, i) => (
                            <Typography key={i} variant="caption" sx={{ display: 'block', pl: 1.5 }}>• {o}</Typography>
                          ))}
                        </Box>
                      )}
                      {item.condutas.contraindicacoes?.length > 0 && (
                        <Box sx={{ mt: 1, p: 1, bgcolor: '#fff3e0', borderLeft: '3px solid #f57c00', borderRadius: 1 }}>
                          <Typography variant="caption" fontWeight={700} color="#e65100">⚠️ Contraindicações:</Typography>
                          {item.condutas.contraindicacoes.map((ct, i) => (
                            <Typography key={i} variant="caption" sx={{ display: 'block', pl: 1.5, color: '#b71c1c' }}>• {ct}</Typography>
                          ))}
                        </Box>
                      )}
                    </Paper>
                  </Grid>
                ) : null
              )}
            </Grid>

            <Box className="no-print" sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<LocalPrintshopIcon />}
                onClick={handlePrintReceituario}
              >
                Imprimir Receituário
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          #subclinical-cards-grid { display: none !important; }
          .MuiPaper-root { box-shadow: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body { font-size: 11pt; }
        }
      `}</style>
      <SaveToPatientBar
        moduleKey="subclinicalIntegrativeAnalysis"
        getData={() => selectedItems.length > 0
          ? { selectedItems, savedAt: new Date().toISOString() }
          : null}
        label="Salvar análise integrativa subclínica no interagente"
      />    </Container>
  );
}
