import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Alert,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  DialogActions,
  Snackbar,
  TableHead
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { THERAPEUTIC_DATABASE } from '../config/therapeuticDatabase';
import { idbSet, idbGet } from '../lib/indexedDBHelper';

// Correlações físico-orgânicas para as 46 Áreas RAYID
// Fonte: Bernard Jensen (Iridologia Clássica), INNAP, Instituto Viva Melhor (IVM) / Prof. Gerson Cunha
// Posições de relógio → órgãos/sistemas correspondentes nos mapas iridológicos clássicos
const RAYID_PHYSICAL_MAP = {
  1:  { organs: 'Hipófise anterior, hipotálamo, córtex frontal', clinical: 'Cefaleia tensional, insônia, fadiga mental, disfunção hormonal pituitária' },
  2:  { organs: 'Hipófise posterior, córtex pré-frontal', clinical: 'Distúrbios de memória, regulação emocional, hormônios pós-hipofisários' },
  3:  { organs: 'Hemisfério cerebral direito, lobo temporal dir., tireóide (lobo dir.)', clinical: 'Hipotireoidismo funcional, rigidez cognitiva, disfunções do lobo temporal' },
  4:  { organs: 'Cervical direita, trapézio dir., tireóide', clinical: 'Tensão cervical, hipotireoidismo, disfagia, nevralgia cervical direita' },
  5:  { organs: 'Pulmão direito (lobo superior), brônquio direito', clinical: 'Asma, bronquite, suscetibilidade respiratória, déficit imune pulmonar' },
  6:  { organs: 'Pulmão direito (lobo médio), ombro direito', clinical: 'Tendinites no ombro direito, síndrome do ombro, pneumonia lobar recorrente' },
  7:  { organs: 'Fígado (lobo dir. superior), diafragma direito', clinical: 'Esteatose hepática, congestionamento hepático, tensão diafragmática direita' },
  8:  { organs: 'Vesícula biliar, fígado (zona portal)', clinical: 'Colelitíase, disfunção biliar, intolerância a gorduras, colesterol elevado' },
  9:  { organs: 'Rim direito, glândula adrenal direita', clinical: 'Litíase renal, edema, fadiga adrenal, hipertensão renovascular' },
  10: { organs: 'Rim direito (polo inferior), ureter direito', clinical: 'Infecções urinárias, hidronefrose, síndrome renal-adrenal direita' },
  11: { organs: 'Cólon ascendente, válvula ileocecal', clinical: 'SII, disbiose, constipação, SIBO (segmento ascendente)' },
  12: { organs: 'Intestino delgado (íleo), apêndice', clinical: 'Má absorção, intolerâncias alimentares, processo apendicular crônico' },
  13: { organs: 'Intestino delgado central, plexo mesentérico', clinical: 'Disbiose central, distensão abdominal, enxaqueca digestiva' },
  14: { organs: 'Cólon sigmoide superior, intestino delgado esquerdo', clinical: 'Constipação crônica, diverticulite inicial, SII esquerdo' },
  15: { organs: 'Cólon descendente, sigmoide', clinical: 'Colite, constipação, desequilíbrios de microbiota (colônia esquerda)' },
  16: { organs: 'Rim esquerdo, glândula adrenal esquerda', clinical: 'Fadiga adrenal esq., hipertensão, distúrbios eletrolíticos' },
  17: { organs: 'Rim esquerdo (corpo), ureter esquerdo', clinical: 'Infecções urinárias recorrentes, cálculos renais esquerdos, retenção hídrica' },
  18: { organs: 'Braço esquerdo, cólon esquerdo', clinical: 'Neuropatias do membro superior esq., disfunção cólica esquerda' },
  19: { organs: 'Pulmão esquerdo (lobo médio), ombro esquerdo', clinical: 'Asma esq., tendinite ombro esq., tensão escapular esquerda' },
  20: { organs: 'Pulmão esquerdo (lobo superior), pescoço esquerdo', clinical: 'Faringite recorrente, linfonodomegalia, bronquite esquerda' },
  21: { organs: 'Tireóide (lobo esq.), paratireóide, pescoço esq.', clinical: 'Distúrbios da tireóide, hiperparatireoidismo, hipocalcemia' },
  22: { organs: 'Cervical esq., esôfago, laringe', clinical: 'Disfagia, DRGE, disfonia, tensão cervical esquerda' },
  23: { organs: 'Hemisfério cerebral esq., lobo temporal esq.', clinical: 'Afasia, dislexia, distúrbios de linguagem, ansiedade cognitiva' },
  24: { organs: 'Glândula pineal, córtex cerebral esq. superior', clinical: 'Distúrbios do sono, depressão sazonal, disritmia circadiana' },
  25: { organs: 'Cólon transverso superior, plexo solar', clinical: 'Espasmos intestinais, tensão do plexo solar, síncope vasovagal' },
  26: { organs: 'Estômago (cárdia, fundo gástrico)', clinical: 'DRGE, gastrite, úlcera péptica, intolerância ao estresse alimentar' },
  27: { organs: 'Pericárdio, aurícula direita cardíaca', clinical: 'Palpitações, arritmias funcionais, estresse pericárdico' },
  28: { organs: 'Laringe, cordas vocais, tireóide (istmo)', clinical: 'Rouquidão crônica, nódulos vocais, hipotireoidismo central' },
  29: { organs: 'Vesícula biliar (fundo), ducto cístico', clinical: 'Dor biliar cólica, plenitude pós-prandial, náuseas matinais' },
  30: { organs: 'Duodeno, piloro, pâncreas (cabeça)', clinical: 'Úlcera duodenal, insuficiência pancreática, pré-diabetes latente' },
  31: { organs: 'Pâncreas (corpo), baço', clinical: 'Hipoglicemia reativa, disimunidade, inflamação crônica sistêmica' },
  32: { organs: 'Pâncreas (cauda), adrenal esq. (medula)', clinical: 'Resistência insulínica, episódios hipoglicêmicos, baixa adrenalina' },
  33: { organs: 'Sigmoide (zona interna), nervo vago esq.', clinical: 'Constipação funcional, disfunção vagal, síndrome do cólon pélvico' },
  34: { organs: 'Reto, ânus, assoalho pélvico', clinical: 'Hemorroidas, fissuras anais, síndrome do levantador do ânus' },
  35: { organs: 'Rim esq. (polo superior), adrenal esq. (córtex)', clinical: 'Fadiga adrenal profunda, hipotensão, baixo cortisol matinal' },
  36: { organs: 'Pleura esq., pericárdio esq.', clinical: 'Dor pleurítica, efusão pericárdica, tensão precordial esquerda' },
  37: { organs: 'Timo, mediastino, linfonodos mediastinais', clinical: 'Imunodeficiência relativa, linfadenopatia, fadiga imunológica' },
  38: { organs: 'Esfíncter pupilar, nervo oculomotor (III par craniano)', clinical: 'Anisocoria, cefaleia orbital, disfunção do III nervo craniano' },
  39: { organs: 'Corpo ciliar, humor aquoso, pressão intraocular', clinical: 'Glaucoma funcional, hipertensão intraocular, síndrome de exfoliação' },
  40: { organs: 'Músculo ciliar, acomodação visual', clinical: 'Presbiopia precoce, espasmo acomodativo, fadiga visual crônica' },
  41: { organs: 'Retina, nervo óptico, substância nigra', clinical: 'Neurite óptica, distrofia retiniana, Parkinson funcional latente' },
  42: { organs: 'Córtex visual (V1), lobo occipital', clinical: 'Enxaqueca com aura visual, fotofobia, distúrbios visuais corticais' },
  43: { organs: 'Tronco encefálico, formação reticular ativadora', clinical: 'Distúrbios de sono profundo (NREM), despertar noturno, cansaço refratário' },
  44: { organs: 'Cerebelo, vias proprioceptivas, equilíbrio', clinical: 'Ataxia funcional, tontura postural, síndrome de desequilíbrio' },
  45: { organs: 'Sistema límbico, amígdala, hipocampo', clinical: 'TEPT, ansiedade crônica, memória emocional traumática, depressão profunda' },
  46: { organs: 'Vias dopaminérgicas, núcleo accumbens', clinical: 'Dependência, anedonia, baixa motivação, depressão anêrgica' }
};

/**
 * Componente de Análise de Iridologia
 * Upload de imagens de íris e análise baseada em mapas iridológicos
 */
export default function IridologyAnalysis({ patientId, patientName, onAnalysisComplete, savedAnalysis }) {
  const [leftIris, setLeftIris] = useState(null);
  const [rightIris, setRightIris] = useState(null);
  const [leftIrisPreview, setLeftIrisPreview] = useState(null);
  const [rightIrisPreview, setRightIrisPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);
  const [zoomTitle, setZoomTitle] = useState('');
  const [highlightCache, setHighlightCache] = useState({});
  const [saving, setSaving] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [hydratingDraft, setHydratingDraft] = useState(false);
  
  // Camera states
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraSide, setCameraSide] = useState(null); // 'left' or 'right'
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const normalizePatientKey = (value) => (value === undefined || value === null ? '' : String(value));
  const storagePatientKey = normalizePatientKey(patientId) || 'modo-livre';

  const classifyFindingBySide = (finding, zoneName = '') => {
    const text = String(finding || '').trim();
    const normalized = text.toUpperCase();
    const normalizedZone = String(zoneName || '').toUpperCase();

    if (normalized.startsWith('DIREITA:') || normalized.includes(' ÍRIS DIREITA')) {
      return {
        side: 'right',
        text: text.replace(/^DIREITA:\s*/i, '').trim()
      };
    }

    if (normalized.startsWith('ESQUERDA:') || normalized.includes(' ÍRIS ESQUERDA')) {
      return {
        side: 'left',
        text: text.replace(/^ESQUERDA:\s*/i, '').trim()
      };
    }

    if (normalized.includes('BILATERAL') || normalizedZone.includes('BILATERAL')) {
      return { side: 'both', text };
    }

    return { side: 'both', text };
  };

  const getVisibleZoneFindings = (zone, leftEnabled, rightEnabled) => {
    if (!zone?.findings || !Array.isArray(zone.findings)) return [];

    const visible = [];
    zone.findings.forEach((finding) => {
      const classified = classifyFindingBySide(finding, zone.name);
      if (classified.side === 'left' && leftEnabled) {
        visible.push(`ESQUERDA: ${classified.text}`);
      } else if (classified.side === 'right' && rightEnabled) {
        visible.push(`DIREITA: ${classified.text}`);
      } else if (classified.side === 'both') {
        if (leftEnabled && rightEnabled) {
          visible.push(`BILATERAL: ${classified.text}`);
        } else if (leftEnabled) {
          visible.push(`ESQUERDA: ${classified.text}`);
        } else if (rightEnabled) {
          visible.push(`DIREITA: ${classified.text}`);
        }
      }
    });

    return visible;
  };

  const buildIrisSpecificFindings = (zones, leftEnabled, rightEnabled) => {
    const result = { left: [], right: [] };
    if (!Array.isArray(zones)) return result;

    zones.forEach((zone) => {
      if (!zone?.findings) return;
      zone.findings.forEach((finding) => {
        const classified = classifyFindingBySide(finding, zone.name);
        if ((classified.side === 'left' || classified.side === 'both') && leftEnabled) {
          result.left.push(`${zone.name}: ${classified.text}`);
        }
        if ((classified.side === 'right' || classified.side === 'both') && rightEnabled) {
          result.right.push(`${zone.name}: ${classified.text}`);
        }
      });
    });

    return result;
  };

  const getIrisSpecificFindingsForDisplay = (analysis) => {
    if (!analysis) return { left: [], right: [] };

    const leftEnabled = !!analysis.leftIrisAnalyzed;
    const rightEnabled = !!analysis.rightIrisAnalyzed;

    if (
      analysis.irisSpecificFindings &&
      Array.isArray(analysis.irisSpecificFindings.left) &&
      Array.isArray(analysis.irisSpecificFindings.right)
    ) {
      return {
        left: leftEnabled ? analysis.irisSpecificFindings.left : [],
        right: rightEnabled ? analysis.irisSpecificFindings.right : []
      };
    }

    return buildIrisSpecificFindings(analysis.zones || [], leftEnabled, rightEnabled);
  };

  const irisFindingsForDisplay = getIrisSpecificFindingsForDisplay(analysisResult);

  // Carregar análise salva anteriormente
  useEffect(() => {
    setHydratingDraft(true);
    setAnalysisResult(null);
    setLeftIris(null);
    setRightIris(null);
    setLeftIrisPreview(null);
    setRightIrisPreview(null);
    setHighlightCache({});

    if (savedAnalysis) {
      const currentPatientKey = normalizePatientKey(patientId);
      const analysisPatientKey = normalizePatientKey(savedAnalysis.patientId);
      const isPatientMatch = !analysisPatientKey || !currentPatientKey || analysisPatientKey === currentPatientKey;

      if (!isPatientMatch) {
        console.warn('Iridologia: análise salva ignorada por divergência de paciente.', {
          currentPatientKey,
          analysisPatientKey
        });
        setHydratingDraft(false);
        return;
      }

      // Restaurar análise completa
      setAnalysisResult(savedAnalysis);
      
      // Tentar buscar imagens do IndexedDB primeiro
      if (savedAnalysis.patientId || patientId) {
        const pid = savedAnalysis.patientId || patientId;
        const irisImagesKey = `iridology-iris-images-${pid}`;
        
        idbGet(irisImagesKey).then(imagesData => {
          if (imagesData) {
            // Imagens encontradas no IndexedDB
            if (imagesData.leftIrisImage) {
              setLeftIrisPreview(imagesData.leftIrisImage);
              if (imagesData.leftIrisFile) {
                setLeftIris({
                  name: imagesData.leftIrisFile.name,
                  type: imagesData.leftIrisFile.type,
                  size: imagesData.leftIrisFile.size
                });
              }
            }
            if (imagesData.rightIrisImage) {
              setRightIrisPreview(imagesData.rightIrisImage);
              if (imagesData.rightIrisFile) {
                setRightIris({
                  name: imagesData.rightIrisFile.name,
                  type: imagesData.rightIrisFile.type,
                  size: imagesData.rightIrisFile.size
                });
              }
            }
            setHydratingDraft(false);
          } else {
            // Fallback: usar imagens do savedAnalysis (podem estar no localStorage antigo)
            if (savedAnalysis.leftIrisImage) {
              setLeftIrisPreview(savedAnalysis.leftIrisImage);
              if (savedAnalysis.leftIrisFile) {
                setLeftIris({
                  name: savedAnalysis.leftIrisFile.name,
                  type: savedAnalysis.leftIrisFile.type,
                  size: savedAnalysis.leftIrisFile.size
                });
              }
            }
            if (savedAnalysis.rightIrisImage) {
              setRightIrisPreview(savedAnalysis.rightIrisImage);
              if (savedAnalysis.rightIrisFile) {
                setRightIris({
                  name: savedAnalysis.rightIrisFile.name,
                  type: savedAnalysis.rightIrisFile.type,
                  size: savedAnalysis.rightIrisFile.size
                });
              }
            }
            setHydratingDraft(false);
          }
        }).catch(err => {
          console.warn('Erro ao buscar imagens do IndexedDB:', err);
          // Fallback: usar imagens do savedAnalysis
          if (savedAnalysis.leftIrisImage) {
            setLeftIrisPreview(savedAnalysis.leftIrisImage);
          }
          if (savedAnalysis.rightIrisImage) {
            setRightIrisPreview(savedAnalysis.rightIrisImage);
          }
          setHydratingDraft(false);
        });
      } else {
        // Sem patientId, usar dados do savedAnalysis diretamente
        if (savedAnalysis.leftIrisImage) {
          setLeftIrisPreview(savedAnalysis.leftIrisImage);
          if (savedAnalysis.leftIrisFile) {
            setLeftIris({
              name: savedAnalysis.leftIrisFile.name,
              type: savedAnalysis.leftIrisFile.type,
              size: savedAnalysis.leftIrisFile.size
            });
          }
        }
        if (savedAnalysis.rightIrisImage) {
          setRightIrisPreview(savedAnalysis.rightIrisImage);
          if (savedAnalysis.rightIrisFile) {
            setRightIris({
              name: savedAnalysis.rightIrisFile.name,
              type: savedAnalysis.rightIrisFile.type,
              size: savedAnalysis.rightIrisFile.size
            });
          }
        }
        setHydratingDraft(false);
      }
    } else if (storagePatientKey) {
      const irisImagesKey = `iridology-iris-images-${storagePatientKey}`;
      idbGet(irisImagesKey).then(imagesData => {
        if (imagesData) {
          if (imagesData.leftIrisImage) {
            setLeftIrisPreview(imagesData.leftIrisImage);
            if (imagesData.leftIrisFile) {
              setLeftIris({
                name: imagesData.leftIrisFile.name,
                type: imagesData.leftIrisFile.type,
                size: imagesData.leftIrisFile.size
              });
            }
          }
          if (imagesData.rightIrisImage) {
            setRightIrisPreview(imagesData.rightIrisImage);
            if (imagesData.rightIrisFile) {
              setRightIris({
                name: imagesData.rightIrisFile.name,
                type: imagesData.rightIrisFile.type,
                size: imagesData.rightIrisFile.size
              });
            }
          }
        }
        setHydratingDraft(false);
      }).catch(err => {
        console.warn('Erro ao restaurar rascunho de íris:', err);
        setHydratingDraft(false);
      });
    } else {
      setHydratingDraft(false);
    }
  }, [savedAnalysis, patientId, storagePatientKey]);

  useEffect(() => {
    if (!storagePatientKey || hydratingDraft) return;
    if (!leftIrisPreview && !rightIrisPreview) return;

    const irisImagesKey = `iridology-iris-images-${storagePatientKey}`;
    const imagesData = {
      leftIrisImage: leftIrisPreview,
      rightIrisImage: rightIrisPreview,
      leftIrisFile: leftIris ? { name: leftIris.name, type: leftIris.type, size: leftIris.size } : null,
      rightIrisFile: rightIris ? { name: rightIris.name, type: rightIris.type, size: rightIris.size } : null,
      savedAt: new Date().toISOString()
    };

    idbSet(irisImagesKey, imagesData).catch((err) => {
      console.warn('Erro ao salvar rascunho das íris no IndexedDB:', err);
    });
  }, [storagePatientKey, hydratingDraft, leftIrisPreview, rightIrisPreview, leftIris, rightIris]);

  const handleImageUpload = (event, side) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (side === 'left') {
        setLeftIris(file);
        setLeftIrisPreview(e.target.result);
      } else {
        setRightIris(file);
        setRightIrisPreview(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (side) => {
    if (side === 'left') {
      setLeftIris(null);
      setLeftIrisPreview(null);
    } else {
      setRightIris(null);
      setRightIrisPreview(null);
    }
  };

  // Camera functions
  const openCamera = async (side) => {
    setCameraSide(side);
    setCameraOpen(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      setCameraStream(stream);
      
      // Wait for video element to be available
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      alert('Não foi possível acessar a câmera. Verifique as permissões do navegador.');
      setCameraOpen(false);
    }
  };

  const closeCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setCameraOpen(false);
    setCameraSide(null);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (!blob) return;

      // Create file from blob
      const file = new File([blob], `iris_${cameraSide}_${Date.now()}.jpg`, { type: 'image/jpeg' });
      
      // Get base64 for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (cameraSide === 'left') {
          setLeftIris(file);
          setLeftIrisPreview(e.target.result);
        } else {
          setRightIris(file);
          setRightIrisPreview(e.target.result);
        }
        
        closeCamera();
      };
      reader.readAsDataURL(blob);
    }, 'image/jpeg', 0.95);
  };

  const analyzeIris = async () => {
    if (!leftIris && !rightIris) {
      alert('Por favor, envie pelo menos uma imagem de íris');
      return;
    }

    setAnalyzing(true);

    // Simulate analysis (In production, this would call an AI API or image processing service)
    setTimeout(async () => {
      let mockAnalysis = generateMockAnalysis();
      // Precompute & attach highlight thumbnails for zones and specific signs
      mockAnalysis = await precomputeHighlightsForAnalysis(mockAnalysis);
      setAnalysisResult(mockAnalysis);
      setAnalyzing(false);
      
      // Save analysis to localStorage
      saveAnalysisToStorage(mockAnalysis);
      
      if (onAnalysisComplete) {
        // Strip thumbnails e imagens grandes antes de passar para o pai (evita quota exceeded)
        const { zoneThumbnails: _zt, signThumbnails: _st, ...safeAnalysis } = mockAnalysis;
        onAnalysisComplete(safeAnalysis);
      }
    }, 3000);
  };

  async function precomputeHighlightsForAnalysis(analysis) {
    const result = { ...analysis };
    result.zoneThumbnails = {};
    result.signThumbnails = {};
    if (result.zones && (leftIrisPreview || rightIrisPreview)) {
      for (let i = 0; i < result.zones.length; i++) {
        const zone = result.zones[i];
        const sector = computeSectorAnglesFromZoneName(zone.name) || { startDeg: -90, endDeg: -60 };
        const isPupillary = /pupila|pupilar|colarete|colarette|borda pipilar|borda pipilar/i.test(zone.name);
        const opts = isPupillary ? { innerRadiusPct: 0.02, outerRadiusPct: 0.22 } : { innerRadiusPct: 0.28, outerRadiusPct: 0.9, startDeg: sector.startDeg, endDeg: sector.endDeg };
        if (leftIrisPreview) {
          const h = await createHighlightImage(leftIrisPreview, { ...opts, maxDim: 512 });
          result.zoneThumbnails[`zone-${i}-left`] = h;
        }
        if (rightIrisPreview) {
          const h2 = await createHighlightImage(rightIrisPreview, { ...opts, maxDim: 512 });
          result.zoneThumbnails[`zone-${i}-right`] = h2;
        }
      }
    }
    if (result.specificSigns && result.specificSigns.structuralSigns && (leftIrisPreview || rightIrisPreview)) {
      for (let i = 0; i < result.specificSigns.structuralSigns.length; i++) {
        const sign = result.specificSigns.structuralSigns[i];
        // derive default options
        let opts = { innerRadiusPct: 0.28, outerRadiusPct: 0.9 };
        const n = sign.name.toLowerCase();
        if (/bord/i.test(n) || /colarete|colarette|pupila/i.test(n)) opts = { innerRadiusPct: 0.02, outerRadiusPct: 0.16 };
        if (/anel/i.test(n) || /nerve rings/i.test(n)) opts = { innerRadiusPct: 0.10, outerRadiusPct: 0.26 };
        if (/radii|raio|raios/i.test(n)) opts = { innerRadiusPct: 0.28, outerRadiusPct: 0.9 };
        if (leftIrisPreview) result.signThumbnails[`sign-${i}-left`] = await createHighlightImage(leftIrisPreview, { ...opts, maxDim: 600 });
        if (rightIrisPreview) result.signThumbnails[`sign-${i}-right`] = await createHighlightImage(rightIrisPreview, { ...opts, maxDim: 600 });
      }
    }
    // Persist thumbnails to a dedicated localStorage key for this patient/anamnese if ID available
    try {
      if (patientId) {
        const key = `iridology-thumbnails-${patientId}`;
        const payload = {
          zoneThumbnails: result.zoneThumbnails,
          signThumbnails: result.signThumbnails,
          generatedAt: Date.now()
        };
        // Store in IndexedDB to avoid localStorage quota issues
        idbSet(key, payload).catch((err) => console.warn('Could not persist iridology thumbnails (IndexedDB):', err));
      }
    } catch (e) {
      // ignore storage errors
      console.warn('Could not persist iridology thumbnails:', e);
    }
    return result;
  }

  // Utility: convert degrees to radians
  function deg2rad(d) { return d * Math.PI / 180; }

  // Compute center angle (deg) for a clock position like '12h00', or range '1h00-2h00'
  function computeSectorAnglesFromZoneName(zoneName) {
    // Extract hours
    const matches = [...zoneName.matchAll(/(\d{1,2})h/gi)].map(m => parseInt(m[1]));
    if (matches.length === 0) return null;
    // Compute center hour
    const minH = Math.min(...matches);
    const maxH = Math.max(...matches);
    const centerHour = (minH + maxH) / 2;
    const centerDeg = ((centerHour % 12) * 30) - 90; // 12h at -90 deg
    const span = (maxH - minH) * 30 || 30; // span degrees
    const startDeg = centerDeg - (span/2);
    const endDeg = centerDeg + (span/2);
    return { startDeg, endDeg, centerDeg };
  }

  // Highlight the area on iris image and return dataURL (cache-friendly)
  async function createHighlightImage(imageDataUrl, { startDeg = -90, endDeg = -60, innerRadiusPct = 0.2, outerRadiusPct = 0.9, color='rgba(255,0,0,0.35)', maxDim = 800 } = {}) {
    if (!imageDataUrl) return null;
    return await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const nativeW = img.width;
        const nativeH = img.height;
        let w = nativeW;
        let h = nativeH;
        if (maxDim && Math.max(nativeW, nativeH) > maxDim) {
          const s = maxDim / Math.max(nativeW, nativeH);
          w = Math.round(nativeW * s);
          h = Math.round(nativeH * s);
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const cx = w / 2;
        const cy = h / 2;
        const maxR = Math.min(cx, cy);
        const innerR = maxR * innerRadiusPct;
        const outerR = maxR * outerRadiusPct;
        
        // Draw wedge ring
        ctx.beginPath();
        const s = deg2rad(startDeg);
        const e = deg2rad(endDeg);
        // Outer arc
        ctx.moveTo(cx + outerR * Math.cos(s), cy + outerR * Math.sin(s));
        ctx.arc(cx, cy, outerR, s, e, false);
        // Inner arc (reverse)
        ctx.lineTo(cx + innerR * Math.cos(e), cy + innerR * Math.sin(e));
        ctx.arc(cx, cy, innerR, e, s, true);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        // Stroke
        ctx.beginPath();
        ctx.arc(cx, cy, outerR, s, e, false);
        ctx.strokeStyle = 'rgba(255,0,0,0.8)';
        ctx.lineWidth = Math.max(2, Math.round(w / 150));
        ctx.stroke();
        // optional inner stroke
        ctx.beginPath();
        ctx.arc(cx, cy, innerR, s, e, false);
        ctx.strokeStyle = 'rgba(255,0,0,0.65)';
        ctx.lineWidth = Math.max(1, Math.round(w / 300));
        ctx.stroke();
        
        // Adicionar setas indicadoras na região analisada
        const centerAngle = (s + e) / 2;
        const midRadius = (innerR + outerR) / 2;
        
        // Desenhar seta apontando para o centro da área analisada
        const arrowX = cx + (outerR + 30) * Math.cos(centerAngle);
        const arrowY = cy + (outerR + 30) * Math.sin(centerAngle);
        const targetX = cx + midRadius * Math.cos(centerAngle);
        const targetY = cy + midRadius * Math.sin(centerAngle);
        
        // Linha da seta
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(targetX, targetY);
        ctx.strokeStyle = 'rgba(255,215,0,1)'; // Amarelo dourado para destaque
        ctx.lineWidth = Math.max(3, Math.round(w / 100));
        ctx.stroke();
        
        // Cabeça da seta
        const arrowSize = Math.max(10, Math.round(w / 50));
        const angle = Math.atan2(targetY - arrowY, targetX - arrowX);
        ctx.beginPath();
        ctx.moveTo(targetX, targetY);
        ctx.lineTo(
          targetX - arrowSize * Math.cos(angle - Math.PI / 6),
          targetY - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          targetX - arrowSize * Math.cos(angle + Math.PI / 6),
          targetY - arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,215,0,1)';
        ctx.fill();
        
        // Adicionar círculo destacando o ponto central
        ctx.beginPath();
        ctx.arc(targetX, targetY, arrowSize / 2, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(255,215,0,1)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,215,0,0.3)';
        ctx.fill();
        
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(null);
      img.src = imageDataUrl;
    });
  }

  const generateMockAnalysis = () => {
    // Análise aprofundada baseada em mapas modernos:
    // - Universidade INNAP (Instituto Nacional de Naturologia e Práticas Alternativas)
    // - John Andrews (Mapa Iridológico Moderno)
    // - Idomar Santos (Iridologia Clínica Brasileira)
    // - Prof. Gerson Cunha — Método GPS (Genética, Padrões, Sinais) — Instituto Viva Melhor (IVM)
    // - Denny Johnson — Método Rayid — 46 Áreas Emocionais
    // Mapa Circular completo: 12 horas com correspondências orgânicas bilaterais
    
    const zones = [
      {
        name: 'Zona Pupilar - Colarete e Borda Pipilar Interna',
        findings: [
          'Borda pipilar hipertrófica (espessada) - possivelmente associada a estresse crônico e HPA disfunção',
          'Colarete mal definido, indica alterações neuro-hormonais e predisposição a distúrbios do SNC',
        ],
        organs: ['Sistema Nervoso Central', 'Eixo HPA - Hipófise e Adrenais', 'Glândulas endócrinas'],
        tcmCorrelation: 'Meridiano do Rim/Pâncreas (Níveis energéticos do HPA)',
        ayurvedaCorrelation: 'Desequilíbrio Vata-Pitta influenciando sistema hormonal',
        constitutionalMark: 'Perfil neuro-humoral com predisposição a ansiedade e fadiga',
        severity: 'Moderado',
        iridologicalSigns: [
          'Borda pipilar hipertrofiada: tendência a excitabilidade do SNC',
          'Colarete irregular: insuficiência adaptativa hormonal',
        ]
      },
      { 
        name: '12h00 - Zona Cerebral e Hipófise (Íris Bilateral)',
        findings: [
          'Lacunas radiais sugerem predisposição a enxaquecas',
          'Pigmentação indicando possível desequilíbrio hormonal hipofisário',
          'Anéis de tensão indicam estresse mental crônico'
        ],
        organs: ['Hipófise', 'Tálamo', 'Hipotálamo', 'Córtex cerebral'],
        tcmCorrelation: 'Meridiano Vaso Governador (Du Mai) - comando do Yang',
        ayurvedaCorrelation: 'Chakra Ajna (3º olho) - desequilíbrio Vata',
        constitutionalMark: 'Constituição neurogênica',
        severity: 'Moderado',
        iridologicalSigns: [
          'Criptas: indicam tendência hereditária a distúrbios neurológicos',
          'Manchas pigmentares: sobrecarga tóxica afetando função cerebral'
        ]
      },
      {
        name: '1h00-2h00 - Zona Cérebro/Frontal e Seios da Face (Íris Bilateral)',
        findings: [
          'Lacunas abertas sugerem sinusite crônica ou rinite alérgica',
          'Radii solares indicam inflamação aguda recorrente',
          'Densidade iridiana reduzida na região frontal'
        ],
        organs: ['Seios frontais', 'Seios maxilares', 'Córtex frontal'],
        tcmCorrelation: 'Meridiano da Vesícula Biliar - Calor no Fígado afetando cabeça',
        ayurvedaCorrelation: 'Kapha acumulado em Prana Vaha Srotas (canais respiratórios superiores)',
        severity: 'Leve a Moderado',
        iridologicalSigns: [
          'Lacunas: deficiência estrutural hereditária ou adquirida',
          'Anéis brancos: depósitos de toxinas e muco'
        ]
      },
      {
        name: '2h00-3h00 - Zona Ouvido, Garganta e Tireoide',
        findings: [
          'DIREITA: Ouvido direito, garganta, amígdalas - sinais inflamatórios',
          'ESQUERDA: Ouvido esquerdo, tireoide - possível hipotireoidismo subclínico',
          'Pigmentação amarronzada na área tireoidiana (esquerda)'
        ],
        organs: ['Ouvido', 'Faringe', 'Laringe', 'Tireoide (esquerda)', 'Paratireoide'],
        tcmCorrelation: 'Meridiano do Triplo Aquecedor - deficiência de Yang do Rim',
        ayurvedaCorrelation: 'Vishuddha Chakra bloqueado - Kapha elevado na tireoide',
        severity: 'Moderado',
        iridologicalSigns: [
          'Manchas toxínicas: inflamação crônica de vias aéreas',
          'Arco senil na região: distúrbio metabólico tireoidiano',
          'John Andrews: área 2h30 crítica para metabolismo'
        ]
      },
      {
        name: '3h00-4h00 - Zona Brônquios, Pulmões e Braços',
        findings: [
          'DIREITA: Pulmão direito - lacunas indicam histórico de bronquite',
          'ESQUERDA: Pulmão esquerdo, braço esquerdo, ombro',
          'Raios solares: inflamação pulmonar aguda ou crônica',
          'Anel neurovascular contraído: padrão respiratório restrito'
        ],
        organs: ['Pulmões', 'Brônquios', 'Ombros', 'Braços'],
        tcmCorrelation: 'Meridiano do Pulmão - Wei Qi (energia defensiva) enfraquecida',
        ayurvedaCorrelation: 'Prana Vaha Srotas comprometido - Vata e Kapha desequilibrados',
        severity: 'Moderado a Grave',
        iridologicalSigns: [
          'Criptas profundas: propensão a doenças respiratórias',
          'Depósitos de colesterol: asma de origem mista',
          'INNAP: região crítica para avaliação de vitalidade'
        ]
      },
      {
        name: '4h00-5h00 - Zona Coração e Sistema Circulatório',
        findings: [
          'ESQUERDA: Coração - arco senil precoce indica risco cardiovascular',
          'DIREITA: Sistema circulatório geral, veias, artérias',
          'Lacunas na zona cardíaca: predisposição genética',
          'Anéis de sódio: hipertensão arterial, rigidez vascular'
        ],
        organs: ['Coração (esquerda)', 'Artérias', 'Veias', 'Sistema cardiovascular'],
        tcmCorrelation: 'Meridiano do Coração - estase de Sangue e Qi',
        ayurvedaCorrelation: 'Avalambaka Kapha excessivo - ama bloqueando Rasa Dhatu',
        severity: 'URGENTE - Avaliação cardiológica recomendada',
        iridologicalSigns: [
          'Arco senil antes dos 50 anos: ALERTA cardiovascular',
          'Lacunas setoriais: áreas de fraqueza miocárdica',
          'John Andrews: monitorar pressão arterial e perfil lipídico',
          'Idomar Santos: correlação com Sinal de Frank auricular'
        ]
      },
      {
        name: '5h00-6h00 - Zona Renal e Sistema Urinário',
        findings: [
          'Manchas escuras na zona renal bilateral',
          'Lacunas indicam predisposição a cálculos renais',
          'Tonus fibrilar reduzido: filtração glomerular comprometida',
          'Sinais de retenção hídrica e toxinas acumuladas'
        ],
        organs: ['Rins', 'Ureteres', 'Bexiga', 'Sistema excretor'],
        tcmCorrelation: 'Meridiano do Rim - Jing (essência) deficiente, Yang do Rim fraco',
        ayurvedaCorrelation: 'Mūtra Vaha Srotas obstruído - ama nos canais renais',
        severity: 'Moderado',
        iridologicalSigns: [
          'Pigmentação amarronzada: toxemia renal crônica',
          'Lacunas fechadas: cistite recorrente ou IU crônica',
          'INNAP: avaliar creatinina, ureia e TFG',
          'John Andrews: zona 5h30 crítica para detoxificação'
        ]
      },
      {
        name: '6h00-7h00 - Zona Abdominal Baixa e Órgãos Reprodutores',
        findings: [
          'DIREITA: Apêndice, ovário direito/testículo direito, perna direita',
          'ESQUERDA: Ovário esquerdo/testículo esquerdo, perna esquerda',
          'Pigmentação hormonal sugere desregulação endócrina',
          'Lacunas na região pélvica: histórico inflamatório'
        ],
        organs: ['Ovários', 'Testículos', 'Útero', 'Próstata', 'Apêndice', 'Pernas'],
        tcmCorrelation: 'Meridiano Vaso Concepção (Ren Mai) - Yin deficiente',
        ayurvedaCorrelation: 'Shukra Dhatu (tecido reprodutivo) depletado - Apana Vayu bloqueado',
        severity: 'Moderado',
        iridologicalSigns: [
          'Manchas psoricas: toxinas metabólicas afetando reprodução',
          'INNAP: correlação com miomas, cistos, endometriose',
          'Idomar Santos: avaliar hormônios sexuais (FSH, LH, testosterona, estrogênio)'
        ]
      },
      {
        name: '7h00-8h00 - Zona Hepática e Metabolismo',
        findings: [
          'DIREITA: Fígado - sinais de esteatose hepática (fígado gorduroso)',
          'ESQUERDA: Baço-pâncreas - possível resistência insulínica',
          'Lacunas hepáticas: sobrecarga de fase I e II de detoxificação',
          'Manchas amareladas: icterícia subclínica ou bilirrubina elevada',
          'Radii solares: inflamação hepática crônica'
        ],
        organs: ['Fígado (direita)', 'Vesícula biliar', 'Baço', 'Pâncreas (esquerda)'],
        tcmCorrelation: 'Meridiano Fígado - estase de Qi, Calor-Umidade no Fígado/VB',
        ayurvedaCorrelation: 'Yakrit (fígado) congestionado - Pitta Dosha agravado, Ranjaka Pitta alterado',
        severity: 'GRAVE - Exames hepáticos urgentes (TGO, TGP, GGT, bilirrubinas)',
        iridologicalSigns: [
          'Manchas amareladas: alerta para hepatite ou colestase',
          'Lacunas abertas: cirrose em estágio inicial possível',
          'INNAP: correlacionar com ecografia hepática',
          'John Andrews: zona hepática é espelho da saúde metabólica geral',
          'Idomar Santos: avaliar glicemia, HbA1c, perfil lipídico completo'
        ]
      },
      {
        name: '8h00-9h00 - Zona Intestinal e Absorção',
        findings: [
          'Lacunas profundas: disbiose intestinal severa',
          'Criptas alveolares: permeabilidade intestinal aumentada (leaky gut)',
          'Pigmentação escura: acúmulo de toxinas intestinais',
          'Anéis de colesterol: síndrome metabólica associada'
        ],
        organs: ['Intestino delgado', 'Duodeno', 'Jejuno', 'Íleo'],
        tcmCorrelation: 'Meridiano Intestino Delgado - Calor-Umidade, Qi do Baço deficiente',
        ayurvedaCorrelation: 'Anna Vaha Srotas comprometido - Agni (fogo digestivo) baixo, Ama acumulado',
        severity: 'Grave',
        iridologicalSigns: [
          'Criptas: SIBO, candidíase intestinal, parasitoses',
          'Manchas psoricas: intoxicação intestinal crônica',
          'INNAP: teste de permeabilidade intestinal recomendado',
          'John Andrews: zona crucial para imunidade (70% no intestino)'
        ]
      },
      {
        name: '9h00-10h00 - Zona Glândulas Suprarrenais e Estresse',
        findings: [
          'Lacunas profundas bilaterais: fadiga adrenal crônica',
          'Anel contraído: hiperatividade simpática (fight-or-flight)',
          'Pigmentação escura: cortisol cronicamente elevado',
          'Criptas: burnout, exaustão do eixo HPA'
        ],
        organs: ['Glândulas suprarrenais', 'Rins (córtex adrenal)'],
        tcmCorrelation: 'Deficiência de Jing do Rim - Yang do Rim exaurido',
        ayurvedaCorrelation: 'Ojas (essência vital) depletado - Vata extremamente elevado',
        severity: 'CRÍTICO - Síndrome de Burnout',
        iridologicalSigns: [
          'Lacunas adrenais: insônia, ansiedade, depressão',
          'INNAP: dosagem de cortisol salivar em 4 tempos',
          'John Andrews: zona mais negligenciada e crucial da era moderna',
          'Idomar Santos: correlação com síndrome metabólica e autoimunidade'
        ]
      },
      {
        name: '10h00-11h00 - Zona Cólon Transverso e Eliminação',
        findings: [
          'Lacunas crônicas: constipação habitual ou SII',
          'Criptas: diverticulose, pólipos intestinais (investigar)',
          'Anéis de Assimilação (Crampings Ring): absorção deficiente',
          'Pigmentação: auto-intoxicação por putrefação'
        ],
        organs: ['Cólon transverso', 'Intestino grosso central'],
        tcmCorrelation: 'Meridiano Intestino Grosso - Secura, Calor, estagnação de Qi',
        ayurvedaCorrelation: 'Purisha Vaha Srotas bloqueado - Vata seco, Ama acumulado',
        severity: 'Moderado a Grave',
        iridologicalSigns: [
          'Anéis de contração: espasmo colônico crônico',
          'INNAP: colonoscopia após 50 anos obrigatória',
          'Idomar Santos: correlação com câncer colorretal (prevenção)'
        ]
      },
      {
        name: '11h00-12h00 - Zona Cólon Descendente e Desintoxicação Final',
        findings: [
          'ESQUERDA: Cólon descendente, sigmoide, reto',
          'Lacunas: hemorroidas, fissuras, doença inflamatória intestinal',
          'Manchas: toxemia final antes da eliminação',
          'Densidade reduzida: evacuação incompleta crônica'
        ],
        organs: ['Cólon descendente', 'Sigmoide', 'Reto', 'Ânus'],
        tcmCorrelation: 'Meridiano Intestino Grosso - Umidade-Calor baixo',
        ayurvedaCorrelation: 'Apana Vayu (energia descendente) bloqueada',
        severity: 'Moderado',
        iridologicalSigns: [
          'Lacunas retais: prolapso, hemorroidas internas',
          'INNAP: exame proctológico se sintomas persistentes'
        ]
      }
    ];

    // Análise Constitucional Avançada (Tipologia Iridológica Moderna)
    const constitutionTypes = {
      left: 'Linfática Pura (Fibromatose branca) - Predisposição: artrite, alergias, hiperacidez',
      right: 'Hematogênica Mista (Fibras castanho-acinzentadas) - Predisposição: distúrbios sanguíneos, anemia, circulação comprometida'
    };

    // Sinais Iridológicos Específicos (Análise Detalhada)
    const specificSigns = {
      structuralSigns: [
        {
          name: 'Lacunas (Lacunae)',
          description: 'Aberturas ou buracos nas fibras iridianas',
          significance: 'Fraqueza orgânica hereditária ou adquirida, predisposição a doenças',
          types: ['Fechadas (cicatriz)', 'Abertas (ativas)', 'Em folha (toxemia)', 'Lança (inflamação aguda)'],
          inapReference: 'Grau 1-4 conforme profundidade e extensão'
        },
        {
          name: 'Criptas (Crypts)',
          description: 'Depressões losangulares ou romboides na íris',
          significance: 'Deficiência nutricional, permeabilidade intestinal, disbiose',
          types: ['Alveolares (intestino)', 'Tipo C (candidíase)', 'Tipo V (viral)'],
          johnAndrewsNote: 'Correlação direta com síndrome do intestino permeável'
        },
        {
          name: 'Radii Solaris (Raios Solares)',
          description: 'Linhas escuras irradiando da pupila para periferia',
          significance: 'Inflamação aguda, dor, neuralgia na zona afetada',
          severity: 'Urgência terapêutica - processo inflamatório ativo',
          idomarSantosNote: 'Sempre investigar causa infecciosa ou autoimune'
        },
        {
          name: 'Anéis de Tensão (Nerve Rings)',
          description: 'Círculos concêntricos esbranquiçados ao redor da pupila',
          significance: 'Estresse crônico, tensão nervosa, hiperatividade simpática',
          inapClassification: 'Leve (1-2 anéis), Moderado (3-5), Grave (>5 anéis)',
          correlation: 'Ansiedade, insônia, distúrbios psicossomáticos'
        }
        ,
        {
          name: 'Borda Pipilar Interna (Colarete) - Tipos: hipertrófica/hipotrófica/atrófica/mista',
          description: 'Avaliação da borda interna pupilar e do colarete (colarinho iridiano)',
          significance: 'Associação com função do SNC, Eixo Hormonal e predisposição comportamental',
          types: ['Hipertrófica', 'Hipotrófica', 'Atrófica', 'Mista'],
          inapReference: 'Avaliar correlação com HPA e marcações de estresse crônico',
        }
      ],
      pigmentarySigns: [
        {
          name: 'Manchas Toxínicas (Toxin Spots)',
          description: 'Pigmentação amarronzada ou alaranjada',
          significance: 'Acúmulo de toxinas metabólicas, sobrecarga hepática/renal',
          distribution: 'Difusa (intoxicação sistêmica) ou localizada (órgão específico)',
          idomarSantosProtocol: 'Detoxificação profunda com fitoterapia drenante'
        },
        {
          name: 'Arco Senil (Arcus Senilis)',
          description: 'Anel esbranquiçado ou cinza na periferia da íris',
          significance: 'ALERTA: Colesterol elevado, aterosclerose, risco cardiovascular',
          urgency: 'Exames laboratoriais imediatos (perfil lipídico completo)',
          johnAndrewsCritical: 'Antes dos 50 anos = risco cardiovascular 3x maior'
        },
        {
          name: 'Anéis de Colesterol (Cholesterol Ring)',
          description: 'Deposição lipídica branca na zona ciliar',
          significance: 'Dislipidemia, síndrome metabólica, diabetes tipo 2',
          inapProtocol: 'Ômega-3, estatinas naturais, dieta mediterrânea'
        },
        {
          name: 'Manchas Psoricas (Psoric Spots)',
          description: 'Pontos amarelos/castanhos na zona ciliar',
          significance: 'Miasma psórico (homeopatia), toxemia crônica, carga genética',
          johnAndrewsInterpretation: 'Predisposição a doenças crônicas degenerativas'
        }
      ],
      autonomicNerveWreath: {
        name: 'Rosário Linfático / Anel Autonômico (ANW)',
        description: 'Borda entre zona pupilar e ciliar',
        normalPosition: 'Circular, regular, 1/3 do raio iridiano',
        deviations: [
          'Expandido: hiperatividade parassimpática (digestão lenta, hipotensão)',
          'Contraído: hiperatividade simpática (estresse, hipertensão)',
          'Irregular: desequilíbrio autonômico (disautonomia)',
          'Achatado em setor: disfunção orgânica no meridiano correspondente'
        ],
        inapClinicalCorrelation: 'Base da medicina psicossomática iridológica'
      },
      densityGrading: {
        description: 'Densidade e integridade das fibras iridianas',
        grades: [
          'Grau 1 (Seda): Fibras finas, resistência excelente',
          'Grau 2 (Linho): Fibras médias, resistência boa',
          'Grau 3 (Feltro-Linho): Fibras irregulares, resistência moderada',
          'Grau 4 (Rede-Feltro): Muitas lacunas, resistência baixa',
          'Grau 5 (Rede): Fibras muito fracas, múltiplas lacunas, resistência muito baixa'
        ],
        idomarSantosNote: 'Graus 4-5: predisposição genética a doenças graves'
      }
    };

    // ANÁLISE DA ESCLERA (Parte Branca do Olho)
    const scleraAnalysis = {
      overview: 'A esclera é a parte branca do olho que revela informações sobre saúde hepática, cardiovascular, inflamação sistêmica e exposição ambiental',
      
      colorAndTexture: {
        finding: 'Esclera com leve coloração amarelada (icterícia subclínica)',
        significance: 'Indica sobrecarga hepática e possível acúmulo de bilirrubina',
        severity: 'ATENÇÃO',
        organs: ['Fígado', 'Vesícula Biliar', 'Vias Biliares'],
        tcm: 'Estagnação de Qi do Fígado com Umidade-Calor',
        ayurveda: 'Agravamento de Pitta Dosha',
        recommendations: [
          'Cardo Mariano 900mg/dia (Silimarina 80%)',
          'Alcachofra 1000mg/dia (Cynara scolymus)',
          'Chá de Boldo (Peumus boldus) ou Dente-de-Leão',
          'Evitar álcool, frituras e gorduras saturadas',
          'Acupuntura: F3 (Taichong), F8 (Ququan), VB34 (Yanglingquan)',
          'Exames: Bilirrubinas totais e frações, TGO, TGP, GGT, Fosfatase Alcalina'
        ]
      },
      
      vascularPatterns: {
        finding: 'Vasos sanguíneos congestos e tortuosos na região nasal',
        significance: 'Indica congestão circulatória e possível hipertensão ou má circulação',
        severity: 'Moderado',
        organs: ['Coração', 'Sistema Cardiovascular', 'Pulmões'],
        tcm: 'Estase de Sangue com deficiência de Qi do Coração',
        ayurveda: 'Ama (toxinas) bloqueando Rasa Dhatu (plasma)',
        recommendations: [
          'Ômega-3 (EPA/DHA) 2-3g/dia',
          'Magnésio Treonato 400mg/dia',
          'Ginkgo Biloba 240mg/dia',
          'Nattokinase 2000FU/dia (fibrinolítico natural)',
          'Exercícios cardiovasculares 30min 5x/semana',
          'Verificar pressão arterial regularmente',
          'Acupuntura: C7 (Shenmen), PC6 (Neiguan), BP6 (Sanyinjiao)'
        ]
      },
      
      pingueculaAndPterygium: {
        finding: 'Pequena pinguécula (elevação amarelada) na região nasal da esclera',
        significance: 'Exposição solar crônica, ressecamento ocular, envelhecimento UV',
        severity: 'Leve',
        differential: 'Pinguécula = benigna | Pterígio = invasivo (requer cirurgia)',
        preventiveMeasures: [
          'Usar óculos de sol com proteção UV400 diariamente',
          'Colírios lubrificantes sem conservantes 4-6x/dia',
          'Ômega-3 para hidratação ocular interna',
          'Vitamina A 10.000UI + Luteína 20mg + Zeaxantina 4mg',
          'Evitar exposição direta ao vento e poeira',
          'Umidificador de ar em ambientes secos'
        ]
      },
      
      scleroticSpots: {
        finding: 'Manchas escuras (melanose) dispersas na esclera',
        significance: 'Acúmulo de resíduos metabólicos, pigmentação racial benigna ou melanose adquirida',
        severity: 'Observação',
        differential: [
          'Melanose primária adquirida (benigna na maioria dos casos)',
          'Acúmulo de metabólitos (ácido úrico, toxinas)',
          'Pigmentação racial fisiológica (comum em etnias de pele escura)',
          'ALERTA: Diferenciar de nevos ou lesões malignas (melanoma conjuntival é raro mas grave)'
        ],
        recommendations: [
          'Protocolo detoxificação: Glutationa lipossomal 500mg + NAC 1200mg',
          'Antioxidantes: Vitamina C 2g + Vitamina E 400UI + Selênio 200mcg',
          'Hidratação adequada (35ml/kg peso corporal)',
          'Chá verde (EGCG) 3 xícaras/dia',
          'Acompanhamento oftalmológico anual com biomicroscopia',
          'Fotografia para monitoramento de mudanças'
        ]
      },
      
      inflammatorySigns: {
        finding: 'Hiperemia leve (vermelhidão) dispersa na esclera',
        significance: 'Inflamação crônica de baixo grau, alergias ou irritação ambiental',
        severity: 'Leve',
        possibleCauses: [
          'Conjuntivite alérgica crônica',
          'Síndrome do olho seco',
          'Exposição a irritantes ambientais (poluição, ar condicionado)',
          'Deficiência de Ômega-3 e vitamina A',
          'Uso excessivo de telas (digital eye strain)'
        ],
        recommendations: [
          'Ômega-3 (DHA/EPA) 2-4g/dia',
          'Colírios de Euphrasia (Eufrasia) homeopático D3',
          'Evitar alérgenos conhecidos (ácaros, pólen, produtos químicos)',
          'Compressa fria com chá de camomila 2x/dia',
          'Probióticos 50 bilhões UFC (eixo intestino-olho)',
          'Regra 20-20-20: cada 20min olhar 20seg para 20 pés (6m) de distância',
          'Vitamina D3 5000UI/dia (imunomodulação)'
        ]
      },
      
      episcleritis: {
        finding: 'Sem sinais de episclerite ou esclerite no momento do exame',
        clinicalNote: 'Episclerite = inflamação superficial (benigna, autolimitada). Esclerite = inflamação profunda (GRAVE - pode causar perfuração ocular)',
        redFlags: [
          'Dor ocular intensa e fotofobia → Esclerite (URGÊNCIA)',
          'Esclera com tom azulado/violáceo → Afinamento escleral (GRAVE)',
          'Perda visual súbita → Uvite ou esclerite posterior'
        ]
      },
      
      conjunctivalChanges: {
        finding: 'Conjuntiva com leve espessamento e neovascularização periférica',
        significance: 'Irritação crônica ou resposta inflamatória prolongada',
        tcm: 'Calor no Fígado e deficiência de Sangue do Fígado (Gan Xue Xu)',
        ayurveda: 'Pitta agravada com Vata secundário',
        recommendations: [
          'Crisântemo (Ju Hua) + Sementes de Cássia (Jue Ming Zi) - chá 2x/dia',
          'Goji Berry (Gou Qi Zi) 15-20g/dia para nutrir Sangue do Fígado',
          'Reduzir tempo de tela e iluminação artificial',
          'Descanso visual adequado (sono 7-9h)',
          'Banho ocular com água filtrada fria pela manhã',
          'Homeopatia: Ruta graveolens 30CH (fadiga ocular)'
        ]
      },
      
      clinicalCorrelation: {
        hepaticOverload: 'Esclera amarelada + manchas → Sobrecarga hepática com toxemia',
        cardiovascular: 'Vasos congestos e tortuosos → Hipertensão ou má circulação periférica',
        dryEye: 'Pinguécula + hiperemia → Síndrome do olho seco severa',
        systemicInflammation: 'Múltiplos sinais inflamatórios → Inflamação sistêmica de baixo grau',
        metabolic: 'Amarelamento + congestão vascular → Possível síndrome metabólica',
        
        recommendedTests: [
          'Bilirrubinas (total, direta, indireta)',
          'Transaminases hepáticas (TGO, TGP, GGT, FA)',
          'Perfil lipídico completo (CT, LDL, HDL, TG)',
          'Hemograma completo com VHS e PCR ultrassensível',
          'Glicemia de jejum e HbA1c',
          'Função renal (ureia, creatinina, TFG)',
          'Ácido úrico sérico'
        ],
        
        specialistReferrals: [
          'Oftalmologia: Biomicroscopia com lâmpada de fenda (análise detalhada)',
          'Hepatologia: Se bilirrubinas alteradas ou transaminases elevadas',
          'Cardiologia: Se hipertensão confirmada ou vasos muito congestos',
          'Reumatologia: Se suspeita de esclerite ou doença autoimune'
        ]
      }
    };

    // Protocolo Terapêutico Integrado baseado na Iridologia
    const digestiveData = THERAPEUTIC_DATABASE['intestino_preso'];
    const hepaticData = THERAPEUTIC_DATABASE['figado_sobrecarregado'];
    const nervousData = THERAPEUTIC_DATABASE['ansiedade'];

    const recommendations = {
      supplements: [
        'Complexo Multivitamínico - Dose: 1 cápsula/dia | Posologia: Desjejum | Fonte: Suporte nutricional geral',
        'Ômega-3 (EPA/DHA) - Dose: 2g/dia | Posologia: Junto às refeições | Fonte: Anti-inflamatório cardiovascular',
        'Probióticos 10-50 bilhões UFC - Dose: 1-2 cápsulas | Posologia: Em jejum | Fonte: Restauração da microbiota',
        'NAC (N-acetilcisteína) - Dose: 600mg 2x/dia | Posologia: Manhã e tarde | Fonte: Detox hepático fase II',
        'Magnésio Dimalato - Dose: 400mg/dia | Posologia: Antes de dormir | Fonte: Relaxamento neuromuscular',
        'Vitamina D3 + K2 - Dose: 5000UI + 100mcg | Posologia: Junto ao almoço | Fonte: Imunidade e ossos',
        'Coenzima Q10 - Dose: 100-200mg/dia | Posologia: Manhã | Fonte: Energia mitocondrial, coração',
        ...(digestiveData?.supplements?.slice(0, 1) || []),
        ...(hepaticData?.supplements?.slice(0, 1) || [])
      ],
      herbs: [
        'Cardo Mariano (Silybum marianum) 300mg 3x/dia | Hepatoprotetor, regenerador hepático',
        'Alcachofra (Cynara scolymus) 500mg 2x/dia | Colerético, redutor de colesterol',
        'Dente-de-Leão (Taraxacum officinale) chá 3x/dia | Diurético, depurativo hepático-renal',
        'Cúrcuma (Curcuma longa) 1500mg/dia + pimenta preta | Anti-inflamatório sistêmico',
        'Rhodiola rosea 300mg 2x/dia | Adaptógeno para fadiga adrenal',
        'Ashwagandha 600mg 2x/dia | Equilibra cortisol, anti-estresse',
        'Ginkgo biloba 120mg 2x/dia | Circulação cerebral e periférica',
        ...(digestiveData?.herbs?.slice(0, 1) || []),
        ...(hepaticData?.herbs?.slice(0, 1) || [])
      ],
      homeopathy: [
        'Nux vomica 30CH - 5 glóbulos 2x/dia | Sobrecarga hepática, digestão lenta',
        'Lycopodium 200CH - dose única semanal | Disfunção hepato-digestiva crônica',
        'Sulphur 30CH - 5 glóbulos 3x/semana | Desintoxicação profunda',
        'Ignatia 200CH - ansiedade com somatização | Desequilíbrio emocional',
        'Phosphorus 30CH - 5 glóbulos/dia | Estresse oxidativo, fadiga',
        ...(nervousData?.homeopathy?.slice(0, 1) || [])
      ],
      hydrotherapy: [
        'Compressa quente no fígado (após refeições, 20min) | Estimula detoxificação',
        'Banho de contraste (quente-frio alternado) | Ativa circulação linfática',
        'Hidroterapia colônica mensal | Remove toxinas intestinais acumuladas',
        'Escalda-pés com sal grosso (antes de dormir) | Relaxa sistema nervoso',
        ...(digestiveData?.hydrotherapy?.slice(0, 1) || [])
      ],
      tcm: [
        'Acupuntura: F3 (Taichong), R3 (Taixi), E36 (Zusanli), BP6 (Sanyinjiao)',
        'Fitoterapia Chinesa: Liu Wei Di Huang Wan (Pílula dos 6 Ingredientes) | Nutre Yin do Rim',
        'Xiao Yao San (Pó da Peregrinação Livre) | Libera estagnação do Qi do Fígado',
        'Moxa: pontos VG4 (Mingmen) e VB20 (Fengchi) | Tonifica Yang',
        ...(digestiveData?.tcm?.slice(0, 1) || [])
      ],
      ayurveda: [
        'Triphala 1g antes de dormir | Limpeza intestinal tridoshica',
        'Brahmi (Bacopa monnieri) 300mg 2x/dia | Clareza mental, memória',
        'Shatavari 500mg 2x/dia | Rejuvenescedor, equilibra hormônios',
        'Abhyanga (automassagem) com óleo de gergelim morno | Pacifica Vata',
        'Pranayama: Nadi Shodhana 10min/dia | Equilibra sistema nervoso',
        'Dieta Sattvica: alimentos frescos, orgânicos, preparados com amor'
      ],
      lifestyleModifications: [
        'Jejum intermitente 16/8 | Autofagia celular, reset metabólico',
        'Exercício aeróbico moderado 30min 5x/semana | Melhora todos os sistemas',
        'Meditação mindfulness 20min/dia | Reduz cortisol 25-30%',
        'Sono reparador 7-9h (22h-6h) | Regeneração celular noturna',
        'Exposição solar 15-30min/dia | Vitamina D endógena, ritmo circadiano',
        'Redução de telas 2h antes de dormir | Melhora melatonina',
        'Contato com natureza (earthing/grounding) | Reduz inflamação',
        'Relações sociais positivas | Longevidade e bem-estar emocional'
      ],
      
      // CONTRAINDICAÇÕES E PRECAUÇÕES - SEGURANÇA DO PACIENTE
      contraindications: {
        supplements: [
          {
            name: 'Ômega-3 (EPA/DHA)',
            contraindications: [
              '⚠️ Cirurgia programada (suspender 7 dias antes - risco hemorrágico)',
              '⚠️ Uso de anticoagulantes (Warfarina, Heparina) - consultar profissional de saúde',
              '⚠️ Distúrbios de coagulação (hemofilia, púrpura)',
              '⚠️ Alergia a peixes/frutos do mar (usar ômega vegetal de algas)'
            ]
          },
          {
            name: 'Probióticos',
            contraindications: [
              '⚠️ Imunocomprometidos graves (HIV, quimioterapia) - risco de sepse',
              '⚠️ Cateter venoso central (risco de bacteremia)',
              '⚠️ Pancreatite aguda',
              '⚠️ SIBO (supercrescimento bacteriano) - pode piorar sintomas'
            ]
          },
          {
            name: 'NAC (N-acetilcisteína)',
            contraindications: [
              '⚠️ Asma grave - pode desencadear broncoespasmo',
              '⚠️ Úlcera péptica ativa',
              '⚠️ Gravidez e lactação (uso apenas com supervisão)',
              '⚠️ Uso com nitroglicerina - potencializa hipotensão'
            ]
          },
          {
            name: 'Magnésio',
            contraindications: [
              '⚠️ Insuficiência renal grave (hipermagnesemia)',
              '⚠️ Bloqueio AV cardíaco',
              '⚠️ Miastenia gravis',
              '⚠️ Diarreia crônica - magnésio tem efeito laxativo'
            ]
          },
          {
            name: 'Vitamina D3',
            contraindications: [
              '⚠️ Hipercalcemia',
              '⚠️ Sarcoidose (doença granulomatosa)',
              '⚠️ Hiperparatireoidismo',
              '⚠️ Monitorar níveis séricos (toxicidade >100ng/mL)'
            ]
          },
          {
            name: 'Coenzima Q10',
            contraindications: [
              '⚠️ Uso de Warfarina - reduz eficácia anticoagulante',
              '⚠️ Quimioterapia - pode interferir (discutir com oncologista)',
              '⚠️ Pressão arterial muito baixa',
              '⚠️ Cirurgia (suspender 2 semanas antes)'
            ]
          }
        ],
        
        herbs: [
          {
            name: 'Cardo Mariano (Silimarina)',
            contraindications: [
              '⚠️ Alergia a plantas da família Asteraceae (margarida)',
              '⚠️ Histórico de câncer hormônio-dependente (mama, útero) - efeito estrogênico leve',
              '⚠️ Gravidez e lactação - segurança não estabelecida',
              '⚠️ Pode interagir com estatinas, antidiabéticos'
            ]
          },
          {
            name: 'Ginkgo Biloba',
            contraindications: [
              '⚠️ CONTRAINDICAÇÃO ABSOLUTA: cirurgia em 7 dias (hemorragia)',
              '⚠️ Epilepsia - pode reduzir limiar convulsivo',
              '⚠️ Anticoagulantes - risco hemorrágico aumentado',
              '⚠️ Diabetes descompensado - pode alterar glicemia'
            ]
          },
          {
            name: 'Rhodiola rosea',
            contraindications: [
              '⚠️ Transtorno bipolar - pode desencadear mania',
              '⚠️ Hipertensão não controlada',
              '⚠️ Gravidez e lactação',
              '⚠️ Não usar à noite - pode causar insônia'
            ]
          },
          {
            name: 'Ashwagandha',
            contraindications: [
              '⚠️ Hipertireoidismo (aumenta T4)',
              '⚠️ Doenças autoimunes ativas (lúpus, artrite reumatoide) - estimula imunidade',
              '⚠️ Gravidez - pode induzir aborto',
              '⚠️ Sedativos/Benzodiazepínicos - potencializa sedação'
            ]
          },
          {
            name: 'Cúrcuma (Curcumina)',
            contraindications: [
              '⚠️ Obstrução de vias biliares ou cálculos biliares',
              '⚠️ Anticoagulantes - aumenta risco de sangramento',
              '⚠️ Cirurgia (suspender 2 semanas antes)',
              '⚠️ Úlcera gástrica ativa - pode irritar mucosa'
            ]
          },
          {
            name: 'Dente-de-Leão',
            contraindications: [
              '⚠️ Obstrução biliar',
              '⚠️ Alergia a Asteraceae',
              '⚠️ Úlcera péptica ativa',
              '⚠️ Diuréticos - potencializa perda de potássio'
            ]
          }
        ],
        
        homeopathy: [
          {
            name: 'Homeopatia em Geral',
            contraindications: [
              '✓ Sem contraindicações absolutas (doses ultradiluídas)',
              '⚠️ Evitar Nux vomica em hipertensão grave não controlada',
              '⚠️ Sulphur pode causar agravação inicial (reação curativa)',
              '⚠️ Respeitar período sem menta, café, cânfora (podem antidotar)'
            ]
          }
        ],
        
        hydrotherapy: [
          {
            name: 'Hidroterapia Colônica',
            contraindications: [
              '⚠️ CONTRAINDICAÇÃO ABSOLUTA: Diverticulite aguda, colite ulcerativa ativa',
              '⚠️ Doença de Crohn em atividade',
              '⚠️ Câncer colorretal',
              '⚠️ Cirurgia intestinal recente (<6 meses)',
              '⚠️ Hemorroidas graves com sangramento',
              '⚠️ Gravidez',
              '⚠️ Insuficiência cardíaca ou renal grave'
            ]
          },
          {
            name: 'Banho de Contraste',
            contraindications: [
              '⚠️ Trombose venosa profunda',
              '⚠️ Doença arterial periférica grave',
              '⚠️ Neuropatia diabética avançada',
              '⚠️ Fenômeno de Raynaud severo'
            ]
          }
        ],
        
        tcm: [
          {
            name: 'Acupuntura',
            contraindications: [
              '⚠️ Distúrbios de coagulação não controlados',
              '⚠️ Infecção de pele no local da punção',
              '⚠️ Gravidez - evitar pontos: IG4, BP6, VB21, E36 (induzem parto)',
              '⚠️ Válvulas cardíacas artificiais (risco de endocardite)',
              '⚠️ Marca-passo - contraindicação relativa para eletroacupuntura'
            ]
          },
          {
            name: 'Moxa (Moxabustão)',
            contraindications: [
              '⚠️ Febre alta',
              '⚠️ Hipertensão não controlada',
              '⚠️ Gravidez (região abdominal e lombar)',
              '⚠️ Diabetes com neuropatia - risco de queimadura'
            ]
          }
        ],
        
        ayurveda: [
          {
            name: 'Triphala',
            contraindications: [
              '⚠️ Gravidez e lactação',
              '⚠️ Diarreia aguda',
              '⚠️ Desidratação',
              '⚠️ Crianças <5 anos - usar com supervisão'
            ]
          },
          {
            name: 'Abhyanga (Massagem com Óleo)',
            contraindications: [
              '⚠️ Febre',
              '⚠️ Infecções de pele',
              '⚠️ Menstruação intensa',
              '⚠️ Logo após refeição pesada (aguardar 2h)',
              '⚠️ Trombose venosa profunda'
            ]
          }
        ],
        
        lifestyle: [
          {
            name: 'Jejum Intermitente',
            contraindications: [
              '⚠️ CONTRAINDICAÇÃO ABSOLUTA: Gravidez, lactação',
              '⚠️ Diabetes tipo 1',
              '⚠️ Histórico de transtornos alimentares (anorexia, bulimia)',
              '⚠️ Crianças e adolescentes em crescimento',
              '⚠️ Desnutrição, IMC <18.5',
              '⚠️ Hipotensão severa',
              '⚠️ Hipoglicemia - monitorar glicemia se diabético tipo 2'
            ]
          },
          {
            name: 'Exercício Intenso',
            contraindications: [
              '⚠️ Angina instável, infarto recente (<3 meses)',
              '⚠️ Arritmias não controladas',
              '⚠️ Hipertensão não controlada (>180/110)',
              '⚠️ Estenose aórtica severa',
              '⚠️ Febre ou infecção ativa',
              '⚠️ Iniciar gradualmente - avaliar com cardiologista se >40 anos sedentário'
            ]
          }
        ],
        
        generalPrecautions: [
          '🔴 SEMPRE consultar profissional de saúde antes de iniciar suplementação se:',
          '   • Gestante ou lactante',
          '   • Uso de medicamentos contínuos',
          '   • Doenças crônicas (diabetes, hipertensão, cardiopatia, nefropatia)',
          '   • Cirurgia programada',
          '   • Histórico de alergias',
          '   • Crianças, idosos frágeis',
          '',
          '🔴 INTERAÇÕES MEDICAMENTOSAS - Informar ao profissional de saúde:',
          '   • Anticoagulantes (Warfarina, Heparina, NOACs)',
          '   • Antidiabéticos (Metformina, Insulina)',
          '   • Anti-hipertensivos',
          '   • Anticonvulsivantes',
          '   • Imunossupressores',
          '   • Hormônios tireoidianos',
          '   • Quimioterápicos',
          '',
          '🔴 SINAIS DE ALERTA - Suspender e procurar profissional de saúde:',
          '   • Reações alérgicas (urticária, inchaço, dificuldade respirar)',
          '   • Sangramento anormal',
          '   • Dor abdominal intensa',
          '   • Icterícia (pele/olhos amarelos)',
          '   • Alterações mentais súbitas',
          '   • Febre persistente',
          '',
          '✓ RECOMENDAÇÃO: Trabalhar com profissional qualificado para individualização do tratamento'
        ]
      }
    };

    // PERFIL COMPORTAMENTAL - Modelo Rayid (Denny Johnson)
    const behavioralProfile = {
      model: 'Rayid Iridology - Denny Johnson',
      description: 'Análise de padrões estruturais da íris que revelam traços de personalidade, estilo emocional e modo de processar experiências',
      
      primaryType: {
        type: 'Joia (Jewel)',
        percentage: 60,
        characteristics: [
          'Personalidade analítica e pensadora',
          'Processa emoções internamente',
          'Perfeccionista e detalhista',
          'Tende a reprimir sentimentos',
          'Dificuldade em expressar vulnerabilidade',
          'Alta autocrítica e autocobrança'
        ],
        irisPattern: 'Fibras densas, lacunas fechadas, criptas profundas',
        emotionalTendency: 'Repressão emocional → Somatização (dores de cabeça, tensão muscular)',
        growthPath: 'Aprender a expressar emoções e aceitar imperfeições'
      },
      
      secondaryType: {
        type: 'Flor (Flower)',
        percentage: 40,
        characteristics: [
          'Sensibilidade emocional elevada',
          'Empatia e compaixão natural',
          'Processa mundo através dos sentimentos',
          'Tendência a absorver emoções alheias',
          'Dificuldade com limites pessoais',
          'Necessidade de harmonia e conexão'
        ],
        irisPattern: 'Lacunas abertas (pétalas), fibras arredondadas',
        emotionalTendency: 'Hipersensibilidade → Sobrecarga emocional (ansiedade, fadiga)',
        growthPath: 'Desenvolver proteção energética e assertividade'
      },
      
      tertiaryType: {
        type: 'Corrente (Stream)',
        percentage: 0,
        note: 'Não identificado nesta análise',
        description: 'Personalidade dinâmica, pioneira, focada em ação e resultados'
      },

      quaternaryType: {
        type: 'Agitador (Shaker)',
        percentage: 0,
        note: 'Não identificado nesta análise atual (pode aparecer em futuras capturas)',
        description: 'Perfil intenso, mobilizador, com grande iniciativa e tendência a impulsividade quando desregulado'
      },

      relationalDynamics: {
        oppositeSides: [
          'Jóia ↔ Flor: razão lógica versus afetividade expandida',
          'Corrente ↔ Agitador: fluidez adaptativa versus impulso de ruptura'
        ],
        attractiveSides: [
          'Jóia tende a se beneficiar do dinamismo da Corrente',
          'Flor tende a se beneficiar da objetividade da Jóia',
          'Corrente tende a se beneficiar da profundidade da Jóia',
          'Agitador tende a se beneficiar da suavidade da Flor e da estrutura da Jóia'
        ],
        integratedSummary: 'Nesta leitura há predominância Joia-Flor, sugerindo eixo analítico-sensível com necessidade de equilíbrio entre controle cognitivo e expressão emocional.'
      },

      advancedFunctionalSigns: [
        {
          sign: 'Lados sinestésicos',
          interpretation: 'Predomínio sensorial/emocional com hiperpercepção do ambiente.',
          conduct: 'Aterramento, higiene sensorial e regulação autonômica diária.'
        },
        {
          sign: 'Psoras/Piçoras (marcas psóricas)',
          interpretation: 'Terreno reativo crônico em leitura tradicional iridológica.',
          conduct: 'Foco em barreira intestinal, anti-inflamatórios naturais e redução de gatilhos.'
        },
        {
          sign: 'Raios solares',
          interpretation: 'Pode indicar irritação inflamatória funcional setorial.',
          conduct: 'Correlacionar sintomas com exames e modular inflamação de baixo grau.'
        },
        {
          sign: 'Pétalas/lacunas e profundidade',
          interpretation: 'Profundidade maior sugere menor reserva funcional em áreas específicas.',
          conduct: 'Suporte nutricional setorial, progressão terapêutica e acompanhamento.'
        },
        {
          sign: 'Cores iridianas e sobretons',
          interpretation: 'Contribuem para leitura constitucional e predisposição funcional.',
          conduct: 'Individualizar plano clínico com validação laboratorial.'
        },
        {
          sign: 'Hipo/Hipercloridria funcional',
          interpretation: 'Pode coexistir com dispepsia, refluxo funcional e disbiose.',
          conduct: 'Avaliação digestiva funcional, ajuste dietético e monitoramento clínico.'
        },
        {
          sign: 'Mamilações/Alergias',
          interpretation: 'Sugere hiperreatividade de mucosas em padrão tradicional.',
          conduct: 'Plano antialérgico integrativo com cuidado de microbiota e gatilhos.'
        }
      ],

      irisScleraCombinedHypotheses: [
        'Congestão escleral + raios solares amplos: hipótese de inflamação sistêmica funcional.',
        'Esclera amarelada + zona hepática alterada: hipótese de sobrecarga hepatometabólica.',
        'Hiperemia escleral + anéis de tensão: hipótese de hiperativação simpática e estresse crônico.',
        'Pinguécula + sinais digestivos: hipótese de eixo intestino-fígado-superfície ocular comprometido.'
      ],

      ringGenderAxis: {
        note: 'Leitura por anéis para eixo masculino/feminino é interpretativa e requer validação clínica.',
        masculine: 'Pode sugerir vulnerabilidade funcional androgênica/prostática/adrenal em padrões específicos.',
        feminine: 'Pode sugerir vulnerabilidade funcional ovariana/uterina/endócrina em padrões específicos.',
        validation: 'Confirmar com anamnese dirigida, exame físico e hormônios (FSH, LH, estradiol/testosterona, progesterona, prolactina, TSH/T4L).'
      },

      gestationalTraumaHypothesis: {
        note: 'Hipótese iridológica tradicional sobre memória de estresse gestacional; não é diagnóstico histórico definitivo.',
        phases: [
          'Fase inicial: insegurança adaptativa e hiperalerta basal',
          'Fase intermediária: sensibilidade neuroendócrina ao estresse',
          'Fase de crescimento fetal: tendência a tensão autonômica e oscilação emocional',
          'Fase perinatal: padrão de defesa luta/fuga e vigilância somática'
        ],
        conduct: 'Abordagem psicossomática integrativa com regulação autonômica, psicoterapia e acompanhamento longitudinal.'
      },
      
      combinedProfile: {
        summary: 'Perfil Joia-Flor (Analítico-Sensível)',
        strengths: [
          'Capacidade analítica profunda',
          'Empatia e compreensão humana',
          'Atenção aos detalhes',
          'Intuição desenvolvida',
          'Busca por excelência'
        ],
        challenges: [
          'Conflito interno: razão vs emoção',
          'Autocrítica excessiva',
          'Dificuldade em relaxar e "desligar"',
          'Absorção de estresse alheio',
          'Tendência a somatização'
        ],
        recommendations: [
          'Terapia: Gestalt, Bioenergética, Focusing (Eugene Gendlin)',
          'Meditação mindfulness 20min/dia',
          'Florais: White Chestnut (pensamentos repetitivos), Agrimony (máscara emocional)',
          'Acupuntura para liberar estagnação emocional: C7, PC6, F3, VB21',
          'Journaling emocional diário',
          'Práticas corporais: Yoga, Tai Chi, Dança Circular'
        ]
      },
      
      psychosomaticCorrelations: {
        mentalTension: 'Anéis de tensão → Tensão crônica, hipervigilância',
        emotionalRepression: 'Criptas profundas → Emoções não processadas',
        digestiveIssues: 'Zona intestinal comprometida → Ansiedade "engolida"',
        cardiovascular: 'Lacunas cardíacas → Mágoas não resolvidas, "coração partido"',
        interpretation: 'O corpo expressa o que a mente reprime'
      },
      
      clinicalNote: 'A iridologia comportamental é complementar à psicoterapia, não substitui avaliação psicológica ou médica profissional'
    };

    // HEREDITARIEDADE E MARCAS CONSTITUCIONAIS
    const hereditaryAnalysis = {
      overview: 'Análise de marcas genéticas transmitidas por linhagem familiar (miasmas, predisposições, resistência constitucional)',
      
      paternalLineage: {
        origin: 'Família Paterna (Pai)',
        dominantSigns: [
          'Arco Senil precoce (antes dos 50 anos)',
          'Lacunas no setor cardiovascular (4h-5h)',
          'Anéis de colesterol'
        ],
        inheritedConditions: [
          'Predisposição a doenças cardiovasculares',
          'Dislipidemia familiar (colesterol e triglicerídeos elevados)',
          'Hipertensão arterial',
          'Diabetes tipo 2 (resistência insulínica)',
          'Possível histórico de infarto ou AVC na linhagem paterna'
        ],
        miasmaticLoad: 'Miasma Sifilínico (homeopatia) - Degeneração cardiovascular',
        severity: 'ALTA - Requer monitoramento cardiometabólico rigoroso',
        preventiveProtocol: [
          'Perfil lipídico completo a cada 6 meses',
          'Ecocardiograma + Teste ergométrico anual',
          'Dieta mediterrânea estrita',
          'Ômega-3 3-4g/dia + CoQ10 200mg + Berberina 1500mg',
          'Exercício cardiovascular 150min/semana',
          'Controle de peso (IMC <25)'
        ]
      },
      
      maternalLineage: {
        origin: 'Família Materna (Mãe)',
        dominantSigns: [
          'Manchas toxínicas dispersas (zona ciliar)',
          'Criptas na zona intestinal (8h-9h)',
          'Densidade fibrilar reduzida (Grau 3-4)'
        ],
        inheritedConditions: [
          'Predisposição a distúrbios digestivos',
          'Síndrome do intestino irritável',
          'Alergias e sensibilidades alimentares',
          'Deficiência enzimática digestiva',
          'Possível histórico de doenças autoimunes',
          'Tendência a ansiedade e depressão'
        ],
        miasmaticLoad: 'Miasma Psórico (homeopatia) - Toxemia crônica, alergias',
        severity: 'Moderada - Requer cuidados com microbiota e detoxificação',
        preventiveProtocol: [
          'Teste de permeabilidade intestinal (Zonulina)',
          'Painel de alergias alimentares IgG',
          'Dieta low-FODMAP ou eliminação',
          'Probióticos 50-100 bilhões UFC',
          'L-Glutamina 5g 2x/dia (reparação intestinal)',
          'Enzimas digestivas antes de refeições principais'
        ]
      },
      
      combinedInheritance: {
        summary: 'Carga hereditária mista: Cardiovascular paterna + Digestivo-imune materna',
        synergisticRisk: 'Síndrome metabólica com componente inflamatório intestinal',
        criticalAreas: [
          'Eixo intestino-coração (disbiose → LPS → inflamação → aterosclerose)',
          'Resistência insulínica amplificada por permeabilidade intestinal',
          'Estresse oxidativo sistêmico'
        ],
        integratedApproach: [
          'Foco duplo: saúde cardiovascular + intestinal',
          'Anti-inflamatórios naturais: Cúrcuma 1500mg + Ômega-3 3g',
          'Controle glicêmico: Berberina + Cromo + Canela',
          'Restauração de barreira intestinal',
          'Modulação de microbiota',
          'Redução de marcadores inflamatórios (PCR, homocisteína)'
        ]
      },
      
      generationalPatterns: {
        grandparents: 'Avós (3ª geração)',
        observedPatterns: [
          'Diabetes tipo 2 em avô paterno (confirmado)',
          'Gastrite crônica em avó materna (confirmado)',
          'Longevidade reduzida na linhagem paterna (<70 anos)',
          'Histórico de transtornos de humor na linhagem materna'
        ],
        epigeneticConsideration: 'Modificação epigenética possível através de estilo de vida, nutrição e gestão de estresse',
        prognosticNote: 'Detecção precoce + intervenção integrativa pode alterar expressão genética desfavorável'
      },
      
      constitutionalStrength: {
        grade: 'Grau 3 (Feltro-Linho) - Resistência Moderada',
        interpretation: 'Constituição intermediária - não é frágil, mas requer cuidados preventivos',
        resilience: 'Boa capacidade de resposta terapêutica se intervenção for precoce',
        prognosis: 'Favorável com adesão ao plano terapêutico integrativo'
      },
      
      homeopathicMiasms: {
        primary: 'Sífilis (degeneração cardiovascular paterna)',
        secondary: 'Psora (toxemia, alergias maternas)',
        tertiary: 'Nenhum sinal de Sicose identificado',
        treatment: 'Nosódios: Syphilinum 200CH + Psorinum 200CH (sugestão homeopática)',
        constitutional: 'Avaliar similium individual (Sulphur, Lycopodium, Natrum muriaticum)'
      },
      
      familyHistoryQuestionnaire: {
        recommendation: 'Aprofundar histórico familiar com questionário detalhado:',
        questions: [
          'Idade de falecimento dos avós e bisavós?',
          'Causas de morte na família?',
          'Histórico de câncer (tipo e idade de diagnóstico)?',
          'Doenças crônicas em pais, tios, primos?',
          'Padrões emocionais familiares (depressão, ansiedade, vícios)?',
          'Longevidade na família (quem viveu >90 anos)?'
        ]
      },
      
      actionPlan: {
        immediate: [
          'Solicitar histórico de saúde detalhado dos pais',
          'Exames cardiometabólicos completos',
          'Avaliação de microbiota (teste de fezes funcional)'
        ],
        shortTerm: [
          'Implementar protocolo cardiovascular + intestinal',
          'Ajustar dieta conforme predisposições',
          'Iniciar suplementação preventiva'
        ],
        longTerm: [
          'Monitoramento anual de marcadores genéticos',
          'Manter estilo de vida anti-inflamatório',
          'Considerar testes genéticos (23andMe, AncestryDNA + análise nutrigenômica)'
        ]
      }
    };

    // MAPA EMOCIONAL RAYID - 46 ÁREAS (Denny Johnson)
    // Fonte: "Método Rayid de Denny Johnson - 46 Áreas Emocionais da Íris"
    // Instituto Viva Melhor / Prof. Gerson Cunha (método GPS integrado)
    // Referência: Abrangência das Atitudes - Sublinhado = lição a aprender; * = medo
    const rayidEmotionalAreas = [
      { number: 1,  name: 'CARINHO',       irisPosition: '12h00 - Superior',   positiveQualities: ['Capacidade para iniciar a afeição social', 'criatividade', 'confiabilidade', 'inteligência', 'autoconfiança', 'individualidade', 'vocabulário', 'estímulo', 'atendimento', 'prudência', 'cuidados incondicionais para com os outros', 'afeição'], challenges: ['Rejeição', 'negação', 'cinismo', 'queixas', 'dependência', 'depressão', 'retraimento', 'solidão', 'reclamação', 'reserva ou frieza'], fears: [] },
      { number: 2,  name: 'PERDÃO',        irisPosition: '12h30 - Superior',   positiveQualities: ['Capacidade de receber o amor', 'manifestação da criatividade e da habilidade social', 'planejamento', 'liderança', 'aventureiro', 'independente', 'precognição', 'humanitário', 'observador'], challenges: ['Ressentimento', 'fracasso', 'martírio', 'inquietude', 'vício', 'masoquista', 'manipulação', 'ansiedade', 'autoflagelação'], fears: [] },
      { number: 3,  name: 'GRAÇA',         irisPosition: '1h00 - Superior Dir.', positiveQualities: ['Capacidade de autocontrole', 'espontaneidade', 'expressão da paixão', 'envolvimento', 'teatralidade', 'santidade', 'romantismo', 'tranquilidade'], challenges: ['Raiva', 'sadismo', 'depressão', 'dúvida', 'frieza', 'desprezo', 'flertador', 'frigidez', 'hostil'], fears: ['medo de perder o amor'] },
      { number: 4,  name: 'REALIZAÇÃO',    irisPosition: '1h30 - Superior Dir.', positiveQualities: ['Competição', 'vontade de soltar-se', 'comemoração', 'ambição', 'memória', 'perdão', 'abundância'], challenges: ['Vingança', 'rivalidade', 'ausência de desejos', 'crueldade'], fears: ['medo de perder'] },
      { number: 5,  name: 'COMPARTILHAR', irisPosition: '2h00 - Superior Dir.', positiveQualities: ['Honra', 'magnanimidade', 'compartilhar seu mundo interior com os outros', 'fraternidade', 'camaradagem', 'generosidade', 'benevolência', 'justiça'], challenges: ['Ciúme', 'pobreza', 'inveja', 'cobiça', 'egoísmo', 'apatia', 'desconfiança'], fears: [] },
      { number: 6,  name: 'INDEPENDÊNCIA', irisPosition: '2h30 - Superior Dir.', positiveQualities: ['Auto-segurança', 'diligência', 'seriedade', 'vigor', 'trabalhador', 'atenção', 'alerta', 'coerência'], challenges: ['Possessividade', 'preguiça', 'falha', 'fracasso'], fears: ['punição'] },
      { number: 7,  name: 'PREOCUPAÇÃO',   irisPosition: '3h00 - Lateral Dir.', positiveQualities: ['Comoção', 'dedicação à família', 'protetor', 'força', 'carinho'], challenges: ['Excesso de encargos', 'sufocação', 'isolamento', 'dominador'], fears: ['entrega', 'desligamento'] },
      { number: 8,  name: 'ORIGINALIDADE', irisPosition: '3h30 - Lateral Dir.', positiveQualities: ['Concepção', 'criação', 'pertencer', 'manifestação', 'receptividade', 'inovação', 'observador'], challenges: ['Excesso de encargos', 'sufocação', 'isolamento', 'dominador'], fears: ['finalização'] },
      { number: 9,  name: 'NASCIMENTO',    irisPosition: '4h00 - Lateral Dir.', positiveQualities: ['Aprovação', 'convicção', 'ordenação', 'relaxamento', 'abrandamento'], challenges: ['Alta exigência', 'preocupação', 'presunção', 'pretensão'], fears: ['aceitabilidade'] },
      { number: 10, name: 'COMUNICAÇÃO',   irisPosition: '4h30 - Lateral Dir.', positiveQualities: ['Relação verbal com os outros', 'abundância', 'coordenação', 'integração', 'gestação'], challenges: ['Impaciência', 'frustração', 'rigidez'], fears: [] },
      { number: 11, name: 'PREDOMINÂNCIA', irisPosition: '5h00 - Inferior Dir.', positiveQualities: ['Fluir', 'decisão', 'certeza', 'exigência', 'clareza de comunicação com relacionamento aos outros', 'precisão'], challenges: ['Hiperativo', 'impaciente', 'indeciso', 'fútil'], fears: [] },
      { number: 12, name: 'HARMONIZAÇÃO', irisPosition: '5h30 - Inferior Dir.', positiveQualities: ['Tato', 'diplomacia', 'praticidade', 'sabedoria', 'esperteza', 'percepção', 'decisão', 'lealdade', 'análise', 'vocalização', 'articulação'], challenges: ['Julgamento', 'vaidade', 'narcisismo', 'preocupação', 'sarcasmo'], fears: [] },
      { number: 13, name: 'BOM SENSO',     irisPosition: '6h00 - Inferior',     positiveQualities: ['Meticulosidade', 'brilho', 'raciocínio', 'perfeição', 'observador', 'razão', 'aperfeiçoamento', 'realização'], challenges: ['Crítico', 'depreciativo', 'insultuoso'], fears: [] },
      { number: 14, name: 'PACIÊNCIA',     irisPosition: '6h30 - Inferior',     positiveQualities: ['Grandes habilidades motoras', 'sincronização do tempo', 'ritmo', 'equilíbrio', 'desembaraço de movimentos', 'habilidades manuais', 'paciência', 'destreza', 'música', 'resistência', 'serenidade', 'tranquilidade'], challenges: ['Agitação', 'impaciência', 'irritabilidade', 'sarcasmo', 'insolência'], fears: [] },
      { number: 15, name: 'PERFEIÇÃO',     irisPosition: '7h00 - Inferior Esq.', positiveQualities: ['Criatividade', 'palavras', 'escrita', 'estímulo', 'segurança', 'flexibilidade', 'tolerância', 'encorajamento'], challenges: ['Intolerância', 'repressão', 'impaciência'], fears: [] },
      { number: 16, name: 'ESPÍRITO',      irisPosition: '7h30 - Inferior Esq.', positiveQualities: ['Boa capacidade motora', 'criatividade na expressão pessoal', 'confiança', 'tranquilidade', 'destreza', 'auto-estima', 'imaginação', 'habilidades manuais', 'fé', 'desenho', 'timidez'], challenges: ['Depressão', 'suicídio', 'sentimento de culpa', 'humilhação'], fears: ['assaltos'] },
      { number: 17, name: 'CONFIANÇA',     irisPosition: '8h00 - Lateral Esq.', positiveQualities: ['Imaginação', 'pensamento abstrato', 'paz interior', 'confiança', 'coragem'], challenges: ['Inferioridade', 'indecisão', 'insegurança'], fears: ['morte', 'mudança'] },
      { number: 18, name: 'INFÂNCIA',      irisPosition: '8h30 - Lateral Esq.', positiveQualities: ['Medos infantis', 'traumas', 'criatividade mental', 'calma', 'paz', 'entusiasmo (0-2 anos de idade)'], challenges: ['Severidade'], fears: [] },
      { number: 19, name: 'SERENIDADE',    irisPosition: '9h00 - Lateral Esq.', positiveQualities: ['Segurança', 'auto-estima', 'disciplina', 'voz suave', 'quietude', 'serenidade', 'compostura (2-5 anos)'], challenges: ['Excesso de disciplina', 'omissão'], fears: ['violência', 'erros'] },
      { number: 20, name: 'GENTILEZA',     irisPosition: '9h30 - Lateral Esq.', positiveQualities: ['Bondade', 'inocência', 'humildade', 'quietude', 'capacidade de espanto', 'serenidade', 'placidez', 'compostura (5-7 anos)'], challenges: ['Desânimo', 'falta de humor', 'violência', 'severidade'], fears: ['escuro', 'demônio'] },
      { number: 21, name: 'CONHECIMENTO',  irisPosition: '10h00 - Superior Esq.', positiveQualities: ['Reverência', 'beleza', 'privacidade', 'esoterismo', 'introspecção', 'comunhão', 'crença em deidades', 'aquiescência', 'obediência'], challenges: ['Fobias', 'adultério', 'ardilosidade', 'dissimulação'], fears: ['falhar', 'queda'] },
      { number: 22, name: 'INTIMIDADE',    irisPosition: '10h30 - Superior Esq.', positiveQualities: ['Intimidade', 'sensualidade', 'união', 'atração', 'proximidade', 'carisma', 'autocontrole'], challenges: ['Perversidade', 'incesto', 'submissão', 'desonra contra si mesmo'], fears: ['promiscuidade'] },
      { number: 23, name: 'SOLIDÃO',       irisPosition: '11h00 - Superior Esq.', positiveQualities: ['Desenvolvimento espiritual', 'amor pela arte e beleza', 'isolamento', 'consciência', 'mistério', 'estado latente'], challenges: ['Reclusão', 'ambiguidade'], fears: [] },
      { number: 24, name: 'ILUMINAÇÃO',    irisPosition: '11h30 - Superior Esq.', positiveQualities: ['Amor pela natureza', 'intuição', 'compreensão', 'desenvolvimento espiritual e psíquico', 'glória', 'sabedoria', 'equilíbrio'], challenges: ['Fanatismo', 'obsessividade', 'autoglorificação', 'ambiguidade'], fears: ['loucura'] },
      { number: 25, name: 'AUTODIDATA',    irisPosition: '12h00 - Zona Interna', positiveQualities: ['Autoconfiança', 'aceleração', 'autodidatismo', 'conhecimento interior'], challenges: ['Resistência', 'impenetrabilidade', 'inacessibilidade'], fears: [] },
      { number: 26, name: 'ORGULHO',       irisPosition: '12h30 - Zona Interna', positiveQualities: ['Elasticidade', 'alegria', 'força', 'sobrevivência', 'flexibilidade', 'estabilidade', 'realização', 'revelação'], challenges: ['Orgulho', 'inflexibilidade', 'dureza', 'auto-orientação', 'tensão', 'depreciação'], fears: [] },
      { number: 27, name: 'ÊXTASE',        irisPosition: '1h30 - Zona Interna', positiveQualities: ['Câmara interior do coração', 'inspiração', 'síntese', 'revelação'], challenges: ['Conspurcação', 'macular', 'depreciação', 'punição'], fears: [] },
      { number: 28, name: 'VOZ',           irisPosition: '2h30 - Zona Interna', positiveQualities: ['Bem falante', 'influência', 'poder', 'energia', 'persuasão', 'conforto', 'capacidade para a cura com a voz', 'cantar', 'acalentar', 'advocacia'], challenges: ['Manipulação vocal', 'perfídia', 'trapaça', 'impostura'], fears: [] },
      { number: 29, name: 'SINCERIDADE',   irisPosition: '3h30 - Zona Interna', positiveQualities: ['Clareza', 'percepção', 'genialidade', 'autenticidade', 'pureza'], challenges: ['Confusão', 'esperteza'], fears: [] },
      { number: 30, name: 'DISCERNIMENTO', irisPosition: '4h30 - Zona Interna', positiveQualities: ['Genialidade', 'inspiração', 'domínio', 'sabedoria', 'observação', 'entusiasmo', 'êxtase', 'inteligência'], challenges: ['Tirania', 'aristocracia', 'vulgaridade', 'adulteração'], fears: [] },
      { number: 31, name: 'CONSELHO',      irisPosition: '5h30 - Zona Interna', positiveQualities: ['Aconselhamento', 'esclarecimento', 'consolação', 'narração', 'comunicação'], challenges: ['Astúcia', 'ardilosidade', 'malícia'], fears: [] },
      { number: 32, name: 'TESTEMUNHA',    irisPosition: '6h30 - Zona Interna', positiveQualities: ['Escuta', 'curiosidade', 'atenção', 'receptividade', 'observação'], challenges: ['Dependência', 'bloqueio', 'escárnio'], fears: [] },
      { number: 33, name: 'CONTEMPLAÇÃO',  irisPosition: '7h30 - Zona Interna', positiveQualities: ['Modéstia', 'humildade', 'meditação'], challenges: ['Vacilante', 'fraco', 'fraqueza de caráter', 'sonhador'], fears: [] },
      { number: 34, name: 'DOÇURA',        irisPosition: '8h30 - Zona Interna', positiveQualities: ['Gentil', 'instruído', 'obediente', 'tímido', 'estudioso'], challenges: ['Vacilante', 'fraco', 'fraqueza de caráter', 'sonhador'], fears: [] },
      { number: 35, name: 'SABEDORIA',     irisPosition: '9h30 - Zona Interna', positiveQualities: ['Estudioso', 'absorto', 'ponderação', 'distinção', 'reflexão', 'virtuosidade', 'desprendimento'], challenges: ['Afastamento', 'soberba', 'distanciamento', 'arrogância'], fears: [] },
      { number: 36, name: 'RECEPTIVIDADE', irisPosition: '10h30 - Zona Interna', positiveQualities: ['Desejo de dar e receber', 'nobreza', 'lealdade', 'caridade', 'majestade', 'gentileza', 'altruísmo'], challenges: ['Teimosia', 'inflexibilidade', 'resistência'], fears: [] },
      { number: 37, name: 'DIPLOMACIA',    irisPosition: '11h30 - Zona Interna', positiveQualities: ['Persistência', 'tenacidade', 'longevidade', 'força', 'compromisso'], challenges: ['Teimosia', 'inflexibilidade', 'resistência'], fears: [] },
      { number: 38, name: 'VIRTUDE',       irisPosition: '12h00 - Zona Pupilar', positiveQualities: ['Princípios espirituais', 'respeito', 'aceitação', 'reverência', 'admiração', 'honra', 'virtuosidade', 'integridade', 'probidade', 'decência'], challenges: ['Hipocrisia', 'intolerância', 'insolência', 'desrespeito', 'mediocridade', 'rudeza'], fears: [] },
      { number: 39, name: 'EGO (EU)',       irisPosition: '3h00 - Zona Pupilar', positiveQualities: ['Visão do mundo', 'visionário', 'enobrecimento', 'enaltecimento', 'glorificação', 'orgulho', 'intelectualismo', 'competência', 'modéstia', 'segurança'], challenges: ['Egoísmo', 'futilidade', 'pretensão', 'obsessividade'], fears: [] },
      { number: 40, name: 'FILOSOFIA',     irisPosition: '6h00 - Zona Pupilar', positiveQualities: ['Humanitarismo', 'presciência', 'sagacidade', 'prudência'], challenges: ['Retórica', 'compulsão'], fears: [] },
      { number: 41, name: 'IDEIAS',        irisPosition: '9h00 - Zona Pupilar', positiveQualities: ['Idealismo', 'aspirações', 'cumprimento dos deveres', 'otimismo', 'entusiasmo', 'inventividade', 'atinge os objetivos'], challenges: ['Utópico', 'caótico', 'fantasioso', 'não pragmático', 'obsessivo'], fears: [] },
      { number: 42, name: 'AUTORIDADE',    irisPosition: '10h00 - Zona Pupilar', positiveQualities: ['Segurança', 'judicioso', 'convincente', 'imponência', 'certeza'], challenges: ['Rebeldia', 'independência', 'dogmatismo'], fears: [] },
      { number: 43, name: 'VONTADE',       irisPosition: '11h00 - Zona Pupilar', positiveQualities: ['Cooperação', 'perseverança', 'entusiasmo', 'cordialidade', 'convicção', 'liderança', 'tenacidade', 'capacidade decisória', 'força de vontade', 'zelo'], challenges: ['Opiniático', 'voluntarioso', 'não cooperador', 'má vontade de compartilhar', 'desobediência', 'dominação', 'submissão'], fears: [] },
      { number: 44, name: 'COMPREENSÃO',   irisPosition: '1h00 - Zona Pupilar', positiveQualities: ['Combinação da vontade com o coração', 'tristeza', 'pesar', 'aceitação', 'entrega', 'aquiescência'], challenges: ['Desprendimento'], fears: ['abandono'] },
      { number: 45, name: 'CARIDADE',      irisPosition: '2h00 - Zona Pupilar', positiveQualities: ['Compromisso', 'verdade', 'alegria', 'honra', 'júbilo', 'felicidade', 'inspiração'], challenges: ['Idealismo nos relacionamentos', 'sobrecarga de ilusão', 'coração aventureiro', 'exagero'], fears: [] },
      { number: 46, name: 'COMPAIXÃO',     irisPosition: '4h00 - Zona Pupilar', positiveQualities: ['Bondade', 'compaixão', 'sensibilidade', 'empatia', 'choro fácil', 'celebração', 'ponderação', 'misericórdia', 'ternura'], challenges: ['Pesar', 'mágoas', 'arrependimento', 'angústia', 'anseios', 'sofrimento longo', 'melancolia'], fears: ['separação'] },
    ];

    // ============================================================
    // DICS ABLER — Tipologia Iridológica por Cor da Íris e Colarete
    // Referências: Instituto Viva Melhor (IVM) / Prof. Gerson Cunha — Método GPS | INNAP | Denny Johnson
    // D=Dominante I=Influente C=Calculista S=Sereno | A=Autônomo B=Base L=Líder E=Executor R=Relacional
    // ============================================================
    const dicsAblerProfile = {
      sistema: 'DICS ABLER — Tipologia Iridológica por Cor e Colarete',
      referencia: 'Instituto Viva Melhor (IVM) / Prof. Gerson Cunha — Método GPS | INNAP | Denny Johnson Rayid',
      descricao: 'Sistema que correlaciona a tonalidade iridiana e a disposição do colarete (anel autonômico) com perfis de personalidade, comportamento relacional, estilo de processamento e tendências de empregabilidade.',

      perfisCorIris: {
        azul: {
          rotulo: 'Íris Azul — Linfática Pura',
          dics: 'C (Calculista) + S (Sereno)',
          temperamento: 'Melancólico-Fleumático',
          constituicao: 'Linfática — sensibilidade imune aumentada, tendência inflamatória sistêmica',
          extroversaoIntroversao: 'Introvertido (7-8/10)',
          relacional: 'Vínculos seletivos e profundos; evita conflitos abertos; precisa de tempo antes de confiar; lealdade intensa quando estabelecida',
          processual: 'Analítico, sistemático, linear; orientado para detalhes e qualidade; processa devagar para garantir precisão',
          comportamental: 'Cauteloso, meticuloso, perfeccionista, sensível à estética, necessita de ordem e previsibilidade para funcionar bem',
          empregaticio: 'Pesquisa, análise, controle de qualidade, ciências, tecnologia, administração, finanças e contabilidade',
          abler: { A: 7, B: 5, L: 4, E: 8, R: 5 },
          florais: 'Water Violet (isolamento) + Pine (autocrítica) + Rock Water (rigidez)',
          clinico: 'Alta sensibilidade sistêmica; vulnerabilidade: disautonomia, ansiedade somática, alergias, doenças autoimunes'
        },
        verde: {
          rotulo: 'Íris Verde — Mista Biliar/Linfática',
          dics: 'S (Sereno) + I (Influente)',
          temperamento: 'Fleumático-Sanguíneo',
          constituicao: 'Mista — eixo hepato-digestivo predominante, sensibilidade emocional elevada',
          extroversaoIntroversao: 'Ambivertido (4-6/10)',
          relacional: 'Harmonizador e mediador; busca paz nos relacionamentos; alta empatia; evita extremos e polarizações',
          processual: 'Criativo e intuitivo; pensamento holístico; alterna entre detalhes e visão geral conforme contexto',
          comportamental: 'Adaptável, paciente, artístico; busca equilíbrio, harmonia e conexão com a natureza',
          empregaticio: 'Saúde integrativa, artes, educação, counseling, terapias, sustentabilidade e meio ambiente',
          abler: { A: 6, B: 5, L: 5, E: 6, R: 8 },
          florais: 'Centaury (dificuldade de limites) + Agrimony (máscara emocional) + Gentian (desânimo fácil)',
          clinico: 'Eixo digestivo-imune sensível; tendência a alergias alimentares, fígado sobrecarregado, ansiedade somática'
        },
        avela: {
          rotulo: 'Íris Avelã / Castanho Claro — Mista Neurógena',
          dics: 'I (Influente) + D (Dominante)',
          temperamento: 'Sanguíneo-Colérico',
          constituicao: 'Mista Neurógena — metabolismo acelerado, alta reatividade do SN',
          extroversaoIntroversao: 'Extrovertido (6-8/10)',
          relacional: 'Social, expressivo, entusiasta; ampla rede de vínculos; persuasivo e carismático; energizado por pessoas',
          processual: 'Intuitivo, rápido e criativo; prefere visão geral a detalhes; age pela inspiração e pelo entusiasmo',
          comportamental: 'Energético, espontâneo, impulsivo criativo; alta capacidade de influenciar e inspirar pessoas',
          empregaticio: 'Vendas, marketing, comunicação, liderança de pessoas, eventos, coaching, inovação e startups',
          abler: { A: 5, B: 4, L: 7, E: 6, R: 9 },
          florais: 'Impatiens (impaciência) + Vervain (entusiasmo excessivo) + Chicory (dependência afetiva)',
          clinico: 'Metabolismo acelerado; vulnerabilidade suprarrenal; instabilidade glicêmica; burnout por excesso de atividade'
        },
        castanhoEscuro: {
          rotulo: 'Íris Castanho Escuro / Marrom — Hematogênica',
          dics: 'D (Dominante) + C (Calculista)',
          temperamento: 'Colérico-Melancólico',
          constituicao: 'Hematogênica — eixo hepático-cardiovascular predominante, resiliência alta',
          extroversaoIntroversao: 'Extrovertido Assertivo (6-9/10)',
          relacional: 'Direto, autêntico, preserva espaço próprio; líder natural; exige reciprocidade e clareza',
          processual: 'Orientado a objetivos, decisivo, pragmático; foca em resultados mais que no processo ou detalhes',
          comportamental: 'Determinado, prático, protetor; pode ser controlador sob pressão; alta resiliência e capacidade de entrega',
          empregaticio: 'Gestão executiva, empreendedorismo, direito, estratégia, medicina, engenharia, liderança sênior',
          abler: { A: 8, B: 3, L: 9, E: 7, R: 5 },
          florais: 'Oak (excesso de força e obrigação) + Vine (controle/dominação) + Cherry Plum (explosão emocional sob pressão)',
          clinico: 'Carga hepática alta; tendência a dislipidemia, hipertensão arterial e doenças cardiovasculares por estresse crônico'
        },
        mista: {
          rotulo: 'Íris Mista / Bicolor — Constitucional Heterogênea',
          dics: 'Perfil combinado — analisar tonalidade predominante em cada setor',
          temperamento: 'Variável conforme a combinação de tons e setores predominantes',
          constituicao: 'Heterogênea — requer análise clínica presencial individualizada por setor iridológico',
          extroversaoIntroversao: 'Contextual (4-7/10 — variável por situação)',
          relacional: 'Multifacetado; adapta estilo relacional ao contexto; riqueza interpessoal e possível inconsistência aparente',
          processual: 'Integra lógica e intuição; pode oscilar entre estilos conforme energia e contexto disponíveis',
          comportamental: 'Rico em nuances; criativo e multidimensional; pode ser percebido como instável por ser complexo internamente',
          empregaticio: 'Alta versatilidade; excelência em papéis que requerem múltiplas competências e flexibilidade simultâneas',
          abler: { A: 6, B: 5, L: 6, E: 6, R: 7 },
          florais: 'Scleranthus (indecisão) + Wild Oat (busca de propósito) + Cerato (busca de validação externa)',
          clinico: 'Perfil constitucional heterogêneo; vulnerabilidades variáveis a cada setor iridológico'
        }
      },

      disposicoesColarete: {
        expandido: {
          rotulo: 'Colarete Expandido (Parassimpático)',
          posicao: 'Anel autonômico deslocado para periferia da íris',
          introExtro: 'Introvertido (7-9/10) — orientado ao mundo interno',
          relacional: 'Vínculos seletivos e profundos; necessita de privacidade para processar; lealdade intensa quando confia',
          processual: 'Reflexivo e deliberado; precisa de tempo para decidir; alta qualidade de processamento profundo',
          comportamental: 'Quieto, observador, introspectivo; recarrega em solidão ou ambientes com poucos estímulos sensoriais',
          empregaticio: 'Pesquisa, análise profunda, trabalho autônomo, projetos de longo prazo, especialização técnica profunda',
          sistemaNervoso: 'Predomínio parassimpático — digestão lenta, pressão tendendo à baixa, bradicardia funcional',
          clinico: 'Hipotireoidismo funcional, fadiga adrenal, digestão lenta, hipotensão ortostática'
        },
        contraido: {
          rotulo: 'Colarete Contraído (Simpático)',
          posicao: 'Anel autonômico deslocado para centro (pupila)',
          introExtro: 'Extrovertido (6-9/10) — orientado ao mundo externo e à ação',
          relacional: 'Sociável, rede ampla de contatos; energizado por interação; pode ter dificuldade com intimidade profunda',
          processual: 'Ativo, rápido e reativo; pensa fazendo; prefere ação a reflexão prolongada',
          comportamental: 'Energético, agitado; necessita de movimento e estímulo; pode ser impaciente e impulsivo',
          empregaticio: 'Liderança de equipe, vendas, papéis que exigem comunicação constante, agilidade e velocidade de resposta',
          sistemaNervoso: 'Predomínio simpático — pressão tendendo à alta, taquicardia funcional, hiperatividade autonômica',
          clinico: 'Hipertensão funcional, ansiedade, insônia, síndrome metabólica, gastrite por tensão, risco de burnout'
        },
        regular: {
          rotulo: 'Colarete Regular / Circular',
          posicao: 'Anel autonômico em posição medial equilibrada',
          introExtro: 'Ambivertido (4-6/10) — transita com fluidez entre os dois polos',
          relacional: 'Equilibrado; adapta seu estilo relacional ao contexto com naturalidade e flexibilidade',
          processual: 'Integra reflexão e ação; consegue alternar estilos conforme a necessidade situacional',
          comportamental: 'Estável, consistente, confiável; bom senso natural; adaptabilidade elevada',
          empregaticio: 'Versátil; adapta-se a múltiplos papéis e contextos; excelente mediador e integrador de equipes',
          sistemaNervoso: 'Equilíbrio simpático-parassimpático — boa variabilidade de frequência cardíaca (HRV elevada)',
          clinico: 'Boa resiliência geral; vulnerabilidades dependem de outros sinais iridológicos específicos por setor'
        },
        irregular: {
          rotulo: 'Colarete Irregular / Assimétrico',
          posicao: 'Anel autonômico com variações setoriais (expandido em alguns, contraído em outros)',
          introExtro: 'Contextual (3-8/10 variável) — comportamento oscilante conforme o setor orgânico afetado',
          relacional: 'Padrões relacionais complexos; pode parecer inconsistente; riqueza interior frequentemente subestimada',
          processual: 'Estilo variável; responde diferentemente em diferentes contextos e estados emocionais e físicos',
          comportamental: 'Cheio de contradições aparentes; criativo, mas pode ser errático; necessita de autoconhecimento profundo',
          empregaticio: 'Trabalhos por projeto, artes, criatividade, inovação; dificuldade com rotinas rígidas e microgerenciamento',
          sistemaNervoso: 'Disautonomia funcional — variabilidade imprevisível por setor orgânico e estado emocional',
          clinico: 'Disautonomia leve, fadiga variável, SII, fibromialgia, sensibilidades múltiplas e fatores desencadeantes variados'
        },
        hipertrofico: {
          rotulo: 'Colarete Hipertrófico (Espessado / Proeminente)',
          posicao: 'Borda pupilar interna espessa, elevada e bem definida',
          introExtro: 'Introvertido Estruturado (6-8/10) — forte senso de identidade e limites definidos',
          relacional: 'Limites claros e firmes; autoconfiante; pode parecer distante ou fechado inicialmente para novos vínculos',
          processual: 'Organizado, metódico; necessita de controle sobre seu ambiente e sobre seus próprios processos',
          comportamental: 'Disciplinado, independente, dificuldade em delegar; padrão interno de qualidade muito elevado',
          empregaticio: 'Especialista independente, líder técnico, consultor, acadêmico, pesquisador, profissões liberais',
          sistemaNervoso: 'Eixo HPA hiperativo — cortisol cronicamente elevado; resposta intensa ao estresse',
          clinico: 'Burnout latente, hipertensão, doenças psicossomáticas, tensão muscular crônica, síndrome de hipervigilância'
        },
        atrofico: {
          rotulo: 'Colarete Atrófico / Fino (Hiporeativo)',
          posicao: 'Borda pupilar interna fina, pouco visível ou fragmentada',
          introExtro: 'Poroso (3-5/10) — fronteiras difusas, alta permeabilidade ao ambiente e às emoções alheias',
          relacional: 'Alta empatia; absorve emoções alheias; dificuldade com limites saudáveis; cuida dos outros antes de si',
          processual: 'Sensitivo e receptivo; processa via sensações físicas, intuição emocional e corpo',
          comportamental: 'Cuidador natural, doador excessivo; pode se perder no outro; necessita de autocuidado intenso e constante',
          empregaticio: 'Saúde, assistência social, educação especial, arte-terapia, trabalho humanitário e voluntariado',
          sistemaNervoso: 'Eixo HPA hiporeativo — cortisol baixo; sistema nervoso hiper-reativo a estímulos externos',
          clinico: 'Fadiga adrenal profunda, alergias, autoimunidade, sensibilidades químicas múltiplas, síndrome de estresse oxidativo'
        }
      },

      escalaABLER: {
        descricao: 'Avaliação de tendências comportamentais no trabalho baseada em padrões iridológicos integrados (cor + colarete + densidade fibrilar)',
        dimensoes: {
          A: { rotulo: 'Autônomo', descricao: 'Capacidade de trabalhar de forma independente sem necessitar de supervisão constante' },
          B: { rotulo: 'Base/Estruturado', descricao: 'Necessidade de estrutura clara, procedimentos definidos e orientação direta' },
          L: { rotulo: 'Líder', descricao: 'Tendência natural para organizar, influenciar e guiar outras pessoas' },
          E: { rotulo: 'Executor', descricao: 'Capacidade de implementar planos, completar tarefas e entregar resultados concretos' },
          R: { rotulo: 'Relacional', descricao: 'Orientação para relacionamentos interpessoais, trabalho em equipe e comunicação humana' }
        }
      },

      avaliacaoAtual: {
        corIrisInferida: 'Castanho Misto com pigmentação heterogênea (avaliação clínica presencial necessária para confirmação da tonalidade exata)',
        perfilCorInferido: 'mista',
        tipoColareteInferido: 'irregular',
        dicsInferido: 'D (Dominante) — primário + I (Influente) — secundário',
        ablerInferido: { A: 7, B: 4, L: 7, E: 6, R: 7 },

        extroversaoIntroversao: {
          perfil: 'Extrovertido Variável / Contextual',
          score: 62,
          descricao: 'Tende à extroversão em contextos de liderança e projetos com propósito, alternando com introversão durante processamento interno profundo. O colarete irregular confirma essa oscilação situacional e orgânica.',
          orientacoes: [
            'Respeite seus ciclos naturais de expansão (extroversão) e recolhimento (introversão)',
            'Crie espaços de silêncio e descanso para recarregar o sistema nervoso entre períodos de alta exposição social',
            'Evite superexposição social prolongada sem períodos adequados de recuperação e solitude',
            'Identifique quais contextos ativam sua extroversão produtiva versus quais drenam sua energia vital'
          ]
        },

        relacional: {
          estilo: 'Líder Social com Profundidade Seletiva',
          caracteristicas: [
            'Amplia a rede social com facilidade, mas valoriza poucos vínculos verdadeiramente profundos',
            'Pode apresentar padrões de cuidado excessivo (caretaking) com pessoas próximas',
            'Necessita de reciprocidade clara e reconhecimento genuíno nos relacionamentos',
            'Tende a evitar conflitos diretos mesmo quando a clareza e a assertividade seriam mais saudáveis',
            'Empatia elevada pode causar sobrecarga emocional e absorção involuntária de tensões alheias'
          ],
          desenvolver: [
            'Prática de Comunicação Não-Violenta (CNV — Marshall Rosenberg)',
            'Assertividade e estabelecimento de limites saudáveis sem culpa',
            'Diferenciação entre empatia (sentir com) e simpatia (sentir pelo outro — Brené Brown)',
            'Florais de Bach: Centaury 15ml + Chicory 15ml na mesma fórmula fitoterápica'
          ]
        },

        processual: {
          estilo: 'Híbrido Intuitivo-Analítico',
          descricao: 'Processa informações de forma híbrida: alterna entre intuição rápida (modo Flor/Influente) e análise detalhada (modo Jóia/Calculista). Pode parecer indeciso quando ambos os sistemas internos conflitam.',
          pontosFortez: [
            'Visão sistêmica — percebe padrões e conexões profundas que outros costumam perder',
            'Criatividade analítica — combina rigor metodológico com inovação e síntese criativa',
            'Adaptabilidade — consegue mudar de abordagem processual conforme o contexto exige'
          ],
          pontosADesenvolver: [
            'Tolerância à incerteza — nem tudo precisa de análise completa antes de ser iniciado',
            'Velocidade de decisão em situações com prazo reduzido ou recursos limitados',
            'Confiança na própria intuição sem necessidade de validação externa constante'
          ]
        },

        comportamental: {
          padroesDominantes: [
            'Liderança por competência, exemplo e confiança conquistada progressivamente',
            'Alta exigência interna — perfeccionismo funcional que impulsiona a qualidade das entregas',
            'Resiliência com limite — pode entrar em colapso após ciclos longos de entrega intensa sem descanso',
            'Criatividade como recurso natural de adaptação e resolução criativa de problemas',
            'Sensibilidade somática às tensões emocionais que não são verbalizadas ou processadas conscientemente'
          ],
          sombreamentos: [
            'Controle excessivo quando há insegurança subjacente não reconhecida',
            'Dificuldade em pedir ajuda ou mostrar vulnerabilidade (máscara de força e competência)',
            'Tendência a somatizar o que não é comunicado verbalmente ao longo do tempo',
            'Oscilações de humor diretamente proporcionais ao nível de estresse acumulado não liberado'
          ],
          caminhoDeDesenvolvimento: [
            'Psicoterapia integrativa — Gestalt, Bioenergética ou Psicossomática',
            'Práticas corporais regulares: yoga, tai chi, biodança, biodecodificação sistêmica',
            'Diário emocional para externalizar o que é habitualmente internalizado e mantido em silêncio',
            'Trabalho com voz e expressão criativa: canto, teatro, leitura em voz alta, escrita criativa'
          ]
        },

        empregaticio: {
          perfil: 'Líder Executor com Alto Potencial Relacional e Técnico',
          melhorContexto: [
            'Papéis com autonomia real e responsabilidade concreta — não tolera microgerenciamento nem excesso de controle',
            'Projetos com impacto humano visível: saúde integrativa, educação transformadora, impacto social real',
            'Ambientes que valorizam simultaneamente competência técnica aprofundada e inteligência emocional',
            'Funções que integram criação estratégica, liderança humana e execução de qualidade'
          ],
          ambientesDesafiadores: [
            'Microgerenciamento excessivo — sufoca a iniciativa, a criatividade e a motivação intrínseca',
            'Rotinas altamente repetitivas sem possibilidade de crescimento, aprendizado ou inovação',
            'Ambientes altamente competitivos, impessoais e desprovidos de propósito ou missão elevada',
            'Ausência de reconhecimento do esforço e da qualidade do trabalho entregue com dedicação'
          ],
          ablerDetalhado: {
            A: { score: 7, interpretacao: 'Alta autonomia — funciona muito bem com objetivos claros e plena liberdade de método e abordagem' },
            B: { score: 4, interpretacao: 'Moderada necessidade de base — adapta-se a estruturas quando necessário, mas não é dependente delas' },
            L: { score: 7, interpretacao: 'Forte tendência de liderança — lidera por exemplo, competência e influência positiva, não por imposição' },
            E: { score: 6, interpretacao: 'Boa capacidade executora — entrega o que inicia, especialmente quando conectado ao propósito maior do trabalho' },
            R: { score: 7, interpretacao: 'Alta orientação relacional — o relacionamento com pessoas é central na sua expressão e satisfação profissional' }
          },
          carreirasSugeridas: [
            'Terapias integrativas e holísticas (naturopatia, iridologia, fitoterapia, aromaterapia)',
            'Coaching de saúde, bem-estar e desenvolvimento humano',
            'Liderança em organizações de saúde, educação ou impacto social',
            'Empreendedorismo em saúde integrativa e medicina funcional',
            'Pesquisa e docência em terapias complementares e ciências da saúde',
            'Consultoria em bem-estar corporativo e saúde organizacional'
          ]
        }
      }
    };

    const leftIrisAnalyzed = !!leftIris;
    const rightIrisAnalyzed = !!rightIris;
    const irisSpecificFindings = buildIrisSpecificFindings(zones, leftIrisAnalyzed, rightIrisAnalyzed);

    return {
      patientId,
      patientName,
      date: new Date().toISOString(),
      leftIrisAnalyzed,
      rightIrisAnalyzed,
      constitutionType: constitutionTypes,
      irisSpecificFindings,
      behavioralProfile,
      rayidEmotionalAreas,
      dicsAblerProfile,
      hereditaryAnalysis,
      zones,
      scleraAnalysis,
      specificSigns,
      recommendations,
      therapeuticPriorities: [
        '1. URGENTE: Sistema Cardiovascular (Arco senil, lacunas cardíacas)',
        '2. Sistema Hepático-Digestivo (Detoxificação e regeneração)',
        '3. Eixo HPA - Adrenais (Fadiga, estresse, burnout)',
        '4. Sistema Renal-Excretor (Filtração e eliminação)',
        '5. Microbiota Intestinal (Disbiose, permeabilidade)',
        '6. Sistema Nervoso (Ansiedade, insônia, tensão)'
      ],
      clinicalReferences: {
        innap: 'Universidade INNAP (Instituto Nacional de Naturologia e Práticas Alternativas) - Brasil',
        johnAndrews: 'Mapa Iridológico Moderno Revisado (2018)',
        idomarSantos: 'Iridologia Clínica Aplicada - Protocolos Brasileiros',
        gersonCunha: 'Prof. Gerson Cunha — Método GPS (Genética, Padrões, Sinais) — Instituto Viva Melhor (IVM)',
        institutoVivaMelhor: 'Instituto Viva Melhor (IVM) — Apostila de Iridologia Clínica e Mapas de Íris',
        dennyJohnson: 'Denny Johnson — Método Rayid — 46 Áreas Emocionais da Íris',
        additionalStudies: [
          'Bernard Jensen - Iridologia Clássica e Nutrição',
          'Denny Johnson - Rayid Model (Iridologia Comportamental) — 46 Áreas Emocionais',
          'Josef Angerer - Topografia Iridológica Expandida',
          'Farida Sharan - Iridologia Ayurvédica Integrada',
          'John Andrews - Mapa Iridológico Moderno',
          'Idomar Santos - Protocolos Brasileiros de Iridologia Clínica',
          'Universidade INNAP - Formação em Iridologia Integrativa',
          'Prof. Gerson Cunha / Instituto Viva Melhor (IVM) - Método GPS'
        ]
      }
    };
  };

  const saveAnalysisToStorage = (analysis) => {
    const key = `iridology-${patientId}-${Date.now()}`;
    // NÃO salvar imagens para evitar exceder quota do localStorage
    // Apenas salvar dados da análise (texto)
    const analysisData = {
      timestamp: Date.now(),
      patientId: patientId,
      patientName: patientName,
      zones: analysis.zones.map(z => ({
        name: z.name,
        severity: z.severity,
        organs: z.organs
      })),
      scleraAnalysis: analysis.scleraAnalysis,
      specificSigns: analysis.specificSigns,
      recommendations: {
        supplementsCount: analysis.recommendations.supplements?.length || 0,
        herbsCount: analysis.recommendations.herbs?.length || 0
      }
    };
    try {
      localStorage.setItem(key, JSON.stringify(analysisData));
    } catch (e) {
      console.warn('Não foi possível salvar análise no localStorage:', e);
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 3, backgroundColor: '#fff3e0', border: '2px solid #ff6f00', borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, color: '#ff6f00', fontWeight: 600 }}>
        👁️ Análise de Iridologia
      </Typography>

      {patientName && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Interagente: <strong>{patientName}</strong>
        </Alert>
      )}

      {/* Upload Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Left Iris */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: '2px dashed #1976d2' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                👁️ Íris Esquerda
              </Typography>
              
              {leftIrisPreview ? (
                <Box>
                  <CardMedia
                    component="img"
                    image={leftIrisPreview}
                    alt="Íris Esquerda"
                    sx={{ 
                      height: 300, 
                      objectFit: 'contain',
                      border: '1px solid #ddd',
                      borderRadius: 2,
                      mb: 2
                    }}
                  />
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Button
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => {
                        setZoomImage(leftIrisPreview);
                        setZoomTitle('Íris Esquerda');
                      }}
                    >
                      Ampliar
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleRemoveImage('left')}
                    >
                      Remover
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CloudUploadIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                  <Typography variant="body2" sx={{ mb: 3 }}>
                    Envie ou tire uma foto da íris esquerda
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<CloudUploadIcon />}
                    >
                      Selecionar Imagem
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'left')}
                      />
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<PhotoCameraIcon />}
                      onClick={() => openCamera('left')}
                    >
                      Tirar Foto
                    </Button>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Iris */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: '2px dashed #1976d2' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                👁️ Íris Direita
              </Typography>
              
              {rightIrisPreview ? (
                <Box>
                  <CardMedia
                    component="img"
                    image={rightIrisPreview}
                    alt="Íris Direita"
                    sx={{ 
                      height: 300, 
                      objectFit: 'contain',
                      border: '1px solid #ddd',
                      borderRadius: 2,
                      mb: 2
                    }}
                  />
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Button
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => {
                        setZoomImage(rightIrisPreview);
                        setZoomTitle('Íris Direita');
                      }}
                    >
                      Ampliar
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleRemoveImage('right')}
                    >
                      Remover
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CloudUploadIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                  <Typography variant="body2" sx={{ mb: 3 }}>
                    Envie ou tire uma foto da íris direita
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<CloudUploadIcon />}
                    >
                      Selecionar Imagem
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'right')}
                      />
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<PhotoCameraIcon />}
                      onClick={() => openCamera('right')}
                    >
                      Tirar Foto
                    </Button>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Analyze Button */}
      {(leftIris || rightIris) && !analysisResult && (
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={analyzing ? <CircularProgress size={20} color="inherit" /> : <AnalyticsIcon />}
            onClick={analyzeIris}
            disabled={analyzing}
            sx={{ minWidth: 200 }}
          >
            {analyzing ? 'Analisando...' : 'Analisar Íris'}
          </Button>
        </Box>
      )}

      {/* Re-analyze Button — shown when a previous result exists */}
      {analysisResult && !analyzing && (
        <Box sx={{ textAlign: 'center', mb: 2 }} className="no-print">
          <Button
            variant="outlined"
            color="warning"
            size="small"
            startIcon={<AnalyticsIcon />}
            onClick={() => setAnalysisResult(null)}
          >
            🔄 Nova Análise (reenviar imagens)
          </Button>
        </Box>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <Box id="iridology-analysis-full">
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
            📊 Resultado da Análise
          </Typography>

          <Alert severity="success" sx={{ mb: 3 }}>
            Análise concluída em {new Date(analysisResult.date).toLocaleString('pt-BR')}
          </Alert>

          {/* Constitution Type */}
          <Paper sx={{ p: 2, mb: 2, background: '#f5f5f5' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Tipo Constitucional:
            </Typography>
            <Grid container spacing={2}>
              {analysisResult.leftIrisAnalyzed && (
                <Grid item xs={12} md={6}>
                  <Chip label={`Íris Esquerda: ${analysisResult.constitutionType.left}`} color="primary" />
                </Grid>
              )}
              {analysisResult.rightIrisAnalyzed && (
                <Grid item xs={12} md={6}>
                  <Chip label={`Íris Direita: ${analysisResult.constitutionType.right}`} color="secondary" />
                </Grid>
              )}
            </Grid>
          </Paper>

          <Paper sx={{ p: 2.5, mb: 2, background: '#fffde7', border: '1px solid #ffe082' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
              Achados estritamente por íris
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Somente os achados da íris efetivamente analisada neste paciente são exibidos abaixo.
            </Typography>

            <Grid container spacing={2}>
              {analysisResult.leftIrisAnalyzed && (
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 1.5, height: '100%' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1565c0', mb: 1 }}>
                      Íris Esquerda
                    </Typography>
                    <ul style={{ marginTop: 0, marginBottom: 0, paddingLeft: 18 }}>
                      {irisFindingsForDisplay.left.map((finding, idx) => (
                        <li key={`left-finding-${idx}`}>
                          <Typography variant="body2">{finding}</Typography>
                        </li>
                      ))}
                      {irisFindingsForDisplay.left.length === 0 && (
                        <li>
                          <Typography variant="body2">Nenhum achado específico registrado para a íris esquerda.</Typography>
                        </li>
                      )}
                    </ul>
                  </Paper>
                </Grid>
              )}

              {analysisResult.rightIrisAnalyzed && (
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 1.5, height: '100%' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#6a1b9a', mb: 1 }}>
                      Íris Direita
                    </Typography>
                    <ul style={{ marginTop: 0, marginBottom: 0, paddingLeft: 18 }}>
                      {irisFindingsForDisplay.right.map((finding, idx) => (
                        <li key={`right-finding-${idx}`}>
                          <Typography variant="body2">{finding}</Typography>
                        </li>
                      ))}
                      {irisFindingsForDisplay.right.length === 0 && (
                        <li>
                          <Typography variant="body2">Nenhum achado específico registrado para a íris direita.</Typography>
                        </li>
                      )}
                    </ul>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Paper>

          {/* Perfil Comportamental - Modelo Rayid */}
          {analysisResult.behavioralProfile && (
            <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#7b1fa2', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                🧠 Perfil Comportamental e Emocional (Rayid Iridology)
              </Typography>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                <strong>Modelo:</strong> {analysisResult.behavioralProfile.model}<br/>
                {analysisResult.behavioralProfile.description}
              </Alert>

              {/* Tipo Primário */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography sx={{ fontWeight: 600 }}>
                      💎 Tipo Primário: {analysisResult.behavioralProfile.primaryType.type}
                    </Typography>
                    <Chip 
                      label={`${analysisResult.behavioralProfile.primaryType.percentage}%`} 
                      size="small"
                      sx={{ bgcolor: '#7b1fa2', color: '#fff' }}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Padrão Iridológico:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
                    {analysisResult.behavioralProfile.primaryType.irisPattern}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Características de Personalidade:
                  </Typography>
                  <ul>
                    {analysisResult.behavioralProfile.primaryType.characteristics.map((char, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{char}</Typography>
                      </li>
                    ))}
                  </ul>

                  <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>
                    <strong>Tendência Emocional:</strong> {analysisResult.behavioralProfile.primaryType.emotionalTendency}
                  </Alert>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Caminho de Desenvolvimento:
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#7b1fa2', fontWeight: 500 }}>
                    {analysisResult.behavioralProfile.primaryType.growthPath}
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Tipo Secundário */}
              {analysisResult.behavioralProfile.secondaryType.percentage > 0 && (
                <Accordion sx={{ mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <Typography sx={{ fontWeight: 600 }}>
                        🌸 Tipo Secundário: {analysisResult.behavioralProfile.secondaryType.type}
                      </Typography>
                      <Chip 
                        label={`${analysisResult.behavioralProfile.secondaryType.percentage}%`} 
                        size="small"
                        sx={{ bgcolor: '#e91e63', color: '#fff' }}
                      />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Padrão Iridológico:
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
                      {analysisResult.behavioralProfile.secondaryType.irisPattern}
                    </Typography>

                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Características:
                    </Typography>
                    <ul>
                      {analysisResult.behavioralProfile.secondaryType.characteristics.map((char, idx) => (
                        <li key={idx}>
                          <Typography variant="body2">{char}</Typography>
                        </li>
                      ))}
                    </ul>

                    <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
                      <strong>Tendência Emocional:</strong> {analysisResult.behavioralProfile.secondaryType.emotionalTendency}
                    </Alert>

                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Caminho de Desenvolvimento:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e91e63', fontWeight: 500 }}>
                      {analysisResult.behavioralProfile.secondaryType.growthPath}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              )}

              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#6a1b9a' }}>
                    🔁 Tipos complementares, lados opostos e lados atraentes
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Tipo terciário:</strong> {analysisResult.behavioralProfile.tertiaryType.type} ({analysisResult.behavioralProfile.tertiaryType.percentage}%)
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {analysisResult.behavioralProfile.tertiaryType.note}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {analysisResult.behavioralProfile.tertiaryType.description}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Tipo quaternário:</strong> {analysisResult.behavioralProfile.quaternaryType.type} ({analysisResult.behavioralProfile.quaternaryType.percentage}%)
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {analysisResult.behavioralProfile.quaternaryType.note}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {analysisResult.behavioralProfile.quaternaryType.description}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Lados opostos:
                  </Typography>
                  <ul>
                    {analysisResult.behavioralProfile.relationalDynamics.oppositeSides.map((item, idx) => (
                      <li key={idx}><Typography variant="body2">{item}</Typography></li>
                    ))}
                  </ul>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1.5, mb: 1 }}>
                    Lados atraentes:
                  </Typography>
                  <ul>
                    {analysisResult.behavioralProfile.relationalDynamics.attractiveSides.map((item, idx) => (
                      <li key={idx}><Typography variant="body2">{item}</Typography></li>
                    ))}
                  </ul>

                  <Alert severity="info" sx={{ mt: 1.5 }}>
                    {analysisResult.behavioralProfile.relationalDynamics.integratedSummary}
                  </Alert>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#6a1b9a' }}>
                    🔬 Sinais avançados e hipóteses funcionais (íris + esclera)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    Interpretação tradicional integrativa: usar como hipótese funcional e sempre validar por clínica, exame físico e exames complementares.
                  </Alert>

                  {analysisResult.behavioralProfile.advancedFunctionalSigns.map((item, idx) => (
                    <Paper key={idx} variant="outlined" sx={{ p: 1.2, mb: 1.2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#4a148c' }}>
                        {item.sign}
                      </Typography>
                      <Typography variant="body2"><strong>Leitura:</strong> {item.interpretation}</Typography>
                      <Typography variant="body2"><strong>Conduta:</strong> {item.conduct}</Typography>
                    </Paper>
                  ))}

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 1.5, mb: 0.8 }}>
                    Possíveis hipóteses ao somar sinais da esclera com as íris:
                  </Typography>
                  <ul>
                    {analysisResult.behavioralProfile.irisScleraCombinedHypotheses.map((item, idx) => (
                      <li key={idx}><Typography variant="body2">{item}</Typography></li>
                    ))}
                  </ul>

                  <Paper variant="outlined" sx={{ p: 1.2, mt: 1.2, mb: 1.2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#4a148c', mb: 0.6 }}>
                      Eixo masculino/feminino por anéis (interpretação funcional)
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.6 }}>
                      {analysisResult.behavioralProfile.ringGenderAxis.note}
                    </Typography>
                    <Typography variant="body2"><strong>Masculino:</strong> {analysisResult.behavioralProfile.ringGenderAxis.masculine}</Typography>
                    <Typography variant="body2"><strong>Feminino:</strong> {analysisResult.behavioralProfile.ringGenderAxis.feminine}</Typography>
                    <Typography variant="body2" sx={{ mt: 0.6 }}><strong>Validação:</strong> {analysisResult.behavioralProfile.ringGenderAxis.validation}</Typography>
                  </Paper>

                  <Paper variant="outlined" sx={{ p: 1.2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#4a148c', mb: 0.6 }}>
                      Fases de trauma gestacional (hipótese iridológica)
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.6 }}>
                      {analysisResult.behavioralProfile.gestationalTraumaHypothesis.note}
                    </Typography>
                    <ul>
                      {analysisResult.behavioralProfile.gestationalTraumaHypothesis.phases.map((phase, idx) => (
                        <li key={idx}><Typography variant="body2">{phase}</Typography></li>
                      ))}
                    </ul>
                    <Typography variant="body2"><strong>Conduta:</strong> {analysisResult.behavioralProfile.gestationalTraumaHypothesis.conduct}</Typography>
                  </Paper>
                </AccordionDetails>
              </Accordion>

              {/* Perfil Combinado */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#7b1fa2' }}>
                    🎯 Perfil Integrado e Recomendações
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Resumo: {analysisResult.behavioralProfile.combinedProfile.summary}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2e7d32', mt: 2, mb: 1 }}>
                    ✅ Pontos Fortes:
                  </Typography>
                  <ul>
                    {analysisResult.behavioralProfile.combinedProfile.strengths.map((str, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{str}</Typography>
                      </li>
                    ))}
                  </ul>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#d32f2f', mt: 2, mb: 1 }}>
                    ⚠️ Desafios:
                  </Typography>
                  <ul>
                    {analysisResult.behavioralProfile.combinedProfile.challenges.map((chal, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{chal}</Typography>
                      </li>
                    ))}
                  </ul>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mt: 2, mb: 1 }}>
                    💡 Recomendações Terapêuticas:
                  </Typography>
                  <ul>
                    {analysisResult.behavioralProfile.combinedProfile.recommendations.map((rec, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{rec}</Typography>
                      </li>
                    ))}
                  </ul>

                  <Alert severity="warning" sx={{ mt: 3 }}>
                    <strong>Correlações Psicossomáticas:</strong>
                    <ul style={{ marginTop: 8, marginBottom: 0 }}>
                      <li>{analysisResult.behavioralProfile.psychosomaticCorrelations.mentalTension}</li>
                      <li>{analysisResult.behavioralProfile.psychosomaticCorrelations.emotionalRepression}</li>
                      <li>{analysisResult.behavioralProfile.psychosomaticCorrelations.digestiveIssues}</li>
                      <li>{analysisResult.behavioralProfile.psychosomaticCorrelations.cardiovascular}</li>
                    </ul>
                    <Typography variant="caption" sx={{ mt: 1, display: 'block', fontStyle: 'italic' }}>
                      {analysisResult.behavioralProfile.psychosomaticCorrelations.interpretation}
                    </Typography>
                  </Alert>

                  <Alert severity="info" sx={{ mt: 2 }}>
                    {analysisResult.behavioralProfile.clinicalNote}
                  </Alert>
                </AccordionDetails>
              </Accordion>
            </Paper>
          )}

          {/* Mapa Emocional Rayid - 46 Áreas (Denny Johnson) */}
          {analysisResult.rayidEmotionalAreas && analysisResult.rayidEmotionalAreas.length > 0 && (
            <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #f3e5f5 0%, #e8eaf6 100%)', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, color: '#4a148c', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                🗺️ Mapa Emocional Rayid — 46 Áreas da Íris (Denny Johnson)
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                <strong>Método Rayid — Denny Johnson</strong> (integrado Instituto Viva Melhor / Prof. Gerson Cunha — Método GPS).<br/>
                Cada área da íris reflete uma qualidade emocional/comportamental herdada e expressada ao longo da vida.<br/>
                <em>Sublinhado = lição a ser aprendida &nbsp;|&nbsp; * = medo associado</em>
              </Alert>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {analysisResult.rayidEmotionalAreas.map((area) => (
                  <Chip
                    key={area.number}
                    label={`${area.number}. ${area.name}`}
                    size="small"
                    variant="outlined"
                    sx={{ color: '#4a148c', borderColor: '#7b1fa2', fontWeight: 600, fontSize: '0.7rem' }}
                  />
                ))}
              </Box>
              <Accordion sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#4a148c' }}>
                    📋 Ver todas as 46 áreas com qualidades e desafios
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 1.5 }}>
                    {analysisResult.rayidEmotionalAreas.map((area) => (
                      <Paper key={area.number} variant="outlined" sx={{ p: 1.5, borderColor: '#ce93d8', bgcolor: '#fff' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#6a1b9a', mb: 0.5 }}>
                          {area.number}. {area.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 0.8 }}>
                          📍 {area.irisPosition}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#2e7d32', fontWeight: 600, display: 'block', mb: 0.3 }}>
                          ✅ Qualidades positivas:
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#2e7d32', display: 'block', mb: 0.8 }}>
                          {area.positiveQualities.join(', ')}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#b71c1c', fontWeight: 600, display: 'block', mb: 0.3 }}>
                          ⚠️ Desafios / Sombras:
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#b71c1c', display: 'block' }}>
                          {area.challenges.join(', ')}
                        </Typography>
                        {area.fears && area.fears.length > 0 && (
                          <>
                            <Typography variant="caption" sx={{ color: '#e65100', fontWeight: 600, display: 'block', mt: 0.6, mb: 0.2 }}>
                              * Medos:
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#e65100', display: 'block' }}>
                              {area.fears.join(', ')}
                            </Typography>
                          </>
                        )}
                        {RAYID_PHYSICAL_MAP[area.number] && (
                          <>
                            <Typography variant="caption" sx={{ color: '#0277bd', fontWeight: 600, display: 'block', mt: 0.8, mb: 0.2 }}>
                              🫀 Correlação Físico-Orgânica (Jensen/INNAP):
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#0277bd', display: 'block', mb: 0.3 }}>
                              {RAYID_PHYSICAL_MAP[area.number].organs}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#00695c', display: 'block', fontStyle: 'italic' }}>
                              ⚕️ {RAYID_PHYSICAL_MAP[area.number].clinical}
                            </Typography>
                          </>
                        )}
                      </Paper>
                    ))}
                  </Box>
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    A correspondência exata de cada área à posição na íris requer avaliação clínica presencial com o mapa visual oficial do Método Rayid (Denny Johnson). As posições indicadas são referências aproximadas para orientação clínica.
                  </Alert>
                </AccordionDetails>
              </Accordion>
            </Paper>
          )}

          {/* DICS ABLER — Tipologia por Cor da Íris e Colarete */}
          {analysisResult.dicsAblerProfile && (
            <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #e8f5e9 0%, #f3e5f5 100%)', borderRadius: 2, border: '1px solid #a5d6a7' }}>
              <Typography variant="h6" sx={{ mb: 1, color: '#1b5e20', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                🎯 DICS ABLER — Tipologia por Cor da Íris e Colarete
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                <strong>{analysisResult.dicsAblerProfile.sistema}</strong><br/>
                {analysisResult.dicsAblerProfile.descricao}<br/>
                <em>Referência: {analysisResult.dicsAblerProfile.referencia}</em>
              </Alert>

              {/* Perfis por Cor da Íris */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#1b5e20' }}>🎨 Perfis de Personalidade por Cor da Íris — DICS</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    A cor da íris determina o tipo constitucional base (DICS) e as predisposições de personalidade. Tons intermediários combinam características de dois tipos adjacentes.
                  </Alert>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    {Object.values(analysisResult.dicsAblerProfile.perfisCorIris).map((perfil, idx) => (
                      <Paper key={idx} variant="outlined" sx={{ p: 2, borderColor: '#a5d6a7' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#1b5e20' }}>{perfil.rotulo}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}><strong>DICS:</strong> {perfil.dics}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}><strong>Temperamento:</strong> {perfil.temperamento}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: '#1565c0' }}><strong>Extro/Intro:</strong> {perfil.extroversaoIntroversao}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: '#2e7d32' }}><strong>Relacional:</strong> {perfil.relacional}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: '#6a1b9a' }}><strong>Processual:</strong> {perfil.processual}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: '#e65100' }}><strong>Comportamental:</strong> {perfil.comportamental}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.8, color: '#0277bd' }}><strong>Empregatício:</strong> {perfil.empregaticio}</Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 0.8 }}>
                          {Object.entries(perfil.abler).map(([k, v]) => (
                            <Chip key={k} label={`${k}: ${v}/10`} size="small" sx={{ fontSize: '0.65rem', fontWeight: 600 }} />
                          ))}
                        </Box>
                        <Typography variant="caption" sx={{ display: 'block', color: '#b71c1c', fontStyle: 'italic' }}>⚕️ {perfil.clinico}</Typography>
                      </Paper>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Disposições do Colarete */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#4a148c' }}>⭕ Disposições do Colarete — Extroversão / Introversão / SNA</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    O colarete (anel autonômico) indica o equilíbrio simpático-parassimpático e determina o grau de extroversão/introversão, estilo relacional, processual e empregabilidade do indivíduo.
                  </Alert>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 1.5 }}>
                    {Object.values(analysisResult.dicsAblerProfile.disposicoesColarete).map((disp, idx) => (
                      <Paper key={idx} variant="outlined" sx={{ p: 1.5, borderColor: '#ce93d8' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.8, fontSize: '0.78rem', color: '#4a148c' }}>{disp.rotulo}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.4, color: '#555', fontStyle: 'italic' }}>{disp.posicao}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.4, color: '#1565c0' }}><strong>Extro/Intro:</strong> {disp.introExtro}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.4, color: '#2e7d32' }}><strong>Relacional:</strong> {disp.relacional}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.4, color: '#6a1b9a' }}><strong>Processual:</strong> {disp.processual}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.4, color: '#e65100' }}><strong>Comportamental:</strong> {disp.comportamental}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.4, color: '#0277bd' }}><strong>Empregatício:</strong> {disp.empregaticio}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.4, color: '#555' }}><strong>SNA:</strong> {disp.sistemaNervoso}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', color: '#b71c1c', fontStyle: 'italic' }}>⚕️ {disp.clinico}</Typography>
                      </Paper>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Escala ABLER */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#0d47a1' }}>💼 Escala ABLER — Perfil de Empregabilidade</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 2 }}>{analysisResult.dicsAblerProfile.escalaABLER.descricao}</Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 1.5 }}>
                    {Object.entries(analysisResult.dicsAblerProfile.escalaABLER.dimensoes).map(([key, dim]) => (
                      <Paper key={key} variant="outlined" sx={{ p: 1.5, bgcolor: '#e3f2fd' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0d47a1', mb: 0.5 }}>
                          {key} — {dim.rotulo}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#333' }}>{dim.descricao}</Typography>
                      </Paper>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Avaliação Atual do Paciente */}
              {analysisResult.dicsAblerProfile.avaliacaoAtual && (
                <Paper sx={{ p: 2.5, bgcolor: '#f9fbe7', border: '2px solid #aed581', borderRadius: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#33691e', mb: 2 }}>
                    👤 Avaliação DICS ABLER — Perfil do Paciente
                  </Typography>

                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ mb: 0.5 }}><strong>Cor da Íris (inferida):</strong> {analysisResult.dicsAblerProfile.avaliacaoAtual.corIrisInferida}</Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}><strong>Tipo DICS:</strong> {analysisResult.dicsAblerProfile.avaliacaoAtual.dicsInferido}</Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}><strong>Tipo de Colarete:</strong> {analysisResult.dicsAblerProfile.avaliacaoAtual.tipoColareteInferido}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ mb: 0.8 }}><strong>ABLER Score (Empregabilidade):</strong></Typography>
                      <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
                        {Object.entries(analysisResult.dicsAblerProfile.avaliacaoAtual.ablerInferido).map(([k, v]) => (
                          <Chip key={k} label={`${k}: ${v}/10`} size="small" color="primary" sx={{ fontWeight: 700 }} />
                        ))}
                      </Box>
                    </Box>
                  </Box>

                  {/* Extroversão/Introversão */}
                  <Accordion sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#1565c0' }}>
                        🔄 Extroversão / Introversão — {analysisResult.dicsAblerProfile.avaliacaoAtual.extroversaoIntroversao.perfil} ({analysisResult.dicsAblerProfile.avaliacaoAtual.extroversaoIntroversao.score}%)
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" sx={{ mb: 1.5 }}>
                        {analysisResult.dicsAblerProfile.avaliacaoAtual.extroversaoIntroversao.descricao}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.8, color: '#1565c0' }}>Orientações:</Typography>
                      <ul>
                        {analysisResult.dicsAblerProfile.avaliacaoAtual.extroversaoIntroversao.orientacoes.map((o, i) => (
                          <li key={i}><Typography variant="body2">{o}</Typography></li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>

                  {/* Perfil Relacional */}
                  <Accordion sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#2e7d32' }}>
                        🤝 Perfil Relacional — {analysisResult.dicsAblerProfile.avaliacaoAtual.relacional.estilo}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.8 }}>Características:</Typography>
                      <ul>
                        {analysisResult.dicsAblerProfile.avaliacaoAtual.relacional.caracteristicas.map((c, i) => (
                          <li key={i}><Typography variant="body2">{c}</Typography></li>
                        ))}
                      </ul>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1.5, mb: 0.8, color: '#1976d2' }}>A Desenvolver:</Typography>
                      <ul>
                        {analysisResult.dicsAblerProfile.avaliacaoAtual.relacional.desenvolver.map((d, i) => (
                          <li key={i}><Typography variant="body2">{d}</Typography></li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>

                  {/* Estilo Processual */}
                  <Accordion sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#6a1b9a' }}>
                        🧩 Estilo Processual — {analysisResult.dicsAblerProfile.avaliacaoAtual.processual.estilo}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" sx={{ mb: 1.5 }}>
                        {analysisResult.dicsAblerProfile.avaliacaoAtual.processual.descricao}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.8, color: '#2e7d32' }}>Pontos Fortes:</Typography>
                      <ul>
                        {analysisResult.dicsAblerProfile.avaliacaoAtual.processual.pontosFortez.map((p, i) => (
                          <li key={i}><Typography variant="body2">{p}</Typography></li>
                        ))}
                      </ul>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1.5, mb: 0.8, color: '#e65100' }}>A Desenvolver:</Typography>
                      <ul>
                        {analysisResult.dicsAblerProfile.avaliacaoAtual.processual.pontosADesenvolver.map((p, i) => (
                          <li key={i}><Typography variant="body2">{p}</Typography></li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>

                  {/* Perfil Comportamental */}
                  <Accordion sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#e65100' }}>
                        🧠 Perfil Comportamental
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.8 }}>Padrões Dominantes:</Typography>
                      <ul>
                        {analysisResult.dicsAblerProfile.avaliacaoAtual.comportamental.padroesDominantes.map((p, i) => (
                          <li key={i}><Typography variant="body2">{p}</Typography></li>
                        ))}
                      </ul>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1.5, mb: 0.8, color: '#d32f2f' }}>Sombreamentos:</Typography>
                      <ul>
                        {analysisResult.dicsAblerProfile.avaliacaoAtual.comportamental.sombreamentos.map((s, i) => (
                          <li key={i}><Typography variant="body2">{s}</Typography></li>
                        ))}
                      </ul>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1.5, mb: 0.8, color: '#1976d2' }}>Caminho de Desenvolvimento:</Typography>
                      <ul>
                        {analysisResult.dicsAblerProfile.avaliacaoAtual.comportamental.caminhoDeDesenvolvimento.map((c, i) => (
                          <li key={i}><Typography variant="body2">{c}</Typography></li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>

                  {/* Perfil Empregatício */}
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#0d47a1' }}>
                        💼 Perfil Empregatício — {analysisResult.dicsAblerProfile.avaliacaoAtual.empregaticio.perfil}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.8, color: '#2e7d32' }}>Melhor Contexto de Trabalho:</Typography>
                      <ul>
                        {analysisResult.dicsAblerProfile.avaliacaoAtual.empregaticio.melhorContexto.map((m, i) => (
                          <li key={i}><Typography variant="body2">{m}</Typography></li>
                        ))}
                      </ul>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1.5, mb: 0.8, color: '#d32f2f' }}>Ambientes Desafiadores:</Typography>
                      <ul>
                        {analysisResult.dicsAblerProfile.avaliacaoAtual.empregaticio.ambientesDesafiadores.map((a, i) => (
                          <li key={i}><Typography variant="body2">{a}</Typography></li>
                        ))}
                      </ul>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1.5, mb: 0.8 }}>ABLER Detalhado:</Typography>
                      {Object.entries(analysisResult.dicsAblerProfile.avaliacaoAtual.empregaticio.ablerDetalhado).map(([k, v]) => (
                        <Box key={k} sx={{ mb: 0.8, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                          <Typography variant="body2">
                            <strong>{k} — {analysisResult.dicsAblerProfile.escalaABLER.dimensoes[k].rotulo} ({v.score}/10):</strong> {v.interpretacao}
                          </Typography>
                        </Box>
                      ))}
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1.5, mb: 0.8, color: '#0d47a1' }}>Carreiras Sugeridas pela Iridologia:</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {analysisResult.dicsAblerProfile.avaliacaoAtual.empregaticio.carreirasSugeridas.map((c, i) => (
                          <Chip key={i} label={c} size="small" color="primary" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              )}
            </Paper>
          )}

          {/* Hereditariedade e Marcas Familiares */}
          {analysisResult.hereditaryAnalysis && (
            <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#e65100', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                🧬 Análise de Hereditariedade e Predisposições Genéticas
              </Typography>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                {analysisResult.hereditaryAnalysis.overview}
              </Alert>

              {/* Linhagem Paterna */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography sx={{ fontWeight: 600 }}>👨 Linhagem Paterna (Família do Pai)</Typography>
                    <Chip 
                      label={analysisResult.hereditaryAnalysis.paternalLineage.severity} 
                      size="small"
                      color="error"
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Sinais Dominantes na Íris:
                  </Typography>
                  <ul>
                    {analysisResult.hereditaryAnalysis.paternalLineage.dominantSigns.map((sign, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{sign}</Typography>
                      </li>
                    ))}
                  </ul>

                  <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                    <strong>Condições Herdadas:</strong>
                    <ul style={{ marginTop: 8, marginBottom: 0 }}>
                      {analysisResult.hereditaryAnalysis.paternalLineage.inheritedConditions.map((cond, idx) => (
                        <li key={idx}>{cond}</li>
                      ))}
                    </ul>
                  </Alert>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Miasma Homeopático:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: '#d32f2f' }}>
                    {analysisResult.hereditaryAnalysis.paternalLineage.miasmaticLoad}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
                    Protocolo Preventivo:
                  </Typography>
                  <ul>
                    {analysisResult.hereditaryAnalysis.paternalLineage.preventiveProtocol.map((prot, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{prot}</Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>

              {/* Linhagem Materna */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography sx={{ fontWeight: 600 }}>👩 Linhagem Materna (Família da Mãe)</Typography>
                    <Chip 
                      label={analysisResult.hereditaryAnalysis.maternalLineage.severity} 
                      size="small"
                      color="warning"
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Sinais Dominantes na Íris:
                  </Typography>
                  <ul>
                    {analysisResult.hereditaryAnalysis.maternalLineage.dominantSigns.map((sign, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{sign}</Typography>
                      </li>
                    ))}
                  </ul>

                  <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>
                    <strong>Condições Herdadas:</strong>
                    <ul style={{ marginTop: 8, marginBottom: 0 }}>
                      {analysisResult.hereditaryAnalysis.maternalLineage.inheritedConditions.map((cond, idx) => (
                        <li key={idx}>{cond}</li>
                      ))}
                    </ul>
                  </Alert>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Miasma Homeopático:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: '#f57c00' }}>
                    {analysisResult.hereditaryAnalysis.maternalLineage.miasmaticLoad}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
                    Protocolo Preventivo:
                  </Typography>
                  <ul>
                    {analysisResult.hereditaryAnalysis.maternalLineage.preventiveProtocol.map((prot, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{prot}</Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>

              {/* Herança Combinada */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#e65100' }}>
                    ⚗️ Herança Combinada e Risco Sinérgico
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                    {analysisResult.hereditaryAnalysis.combinedInheritance.summary}
                  </Typography>

                  <Alert severity="error" sx={{ mb: 2 }}>
                    <strong>Risco Sinérgico:</strong> {analysisResult.hereditaryAnalysis.combinedInheritance.synergisticRisk}
                  </Alert>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Áreas Críticas de Atenção:
                  </Typography>
                  <ul>
                    {analysisResult.hereditaryAnalysis.combinedInheritance.criticalAreas.map((area, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{area}</Typography>
                      </li>
                    ))}
                  </ul>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2e7d32', mt: 2, mb: 1 }}>
                    Abordagem Integrativa:
                  </Typography>
                  <ul>
                    {analysisResult.hereditaryAnalysis.combinedInheritance.integratedApproach.map((app, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{app}</Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>

              {/* Padrões Geracionais */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600 }}>👴👵 Padrões Geracionais (Avós)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Observações na 3ª Geração:
                  </Typography>
                  <ul>
                    {analysisResult.hereditaryAnalysis.generationalPatterns.observedPatterns.map((pattern, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{pattern}</Typography>
                      </li>
                    ))}
                  </ul>

                  <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
                    <strong>Epigenética:</strong> {analysisResult.hereditaryAnalysis.generationalPatterns.epigeneticConsideration}
                  </Alert>

                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    <strong>Prognóstico:</strong> {analysisResult.hereditaryAnalysis.generationalPatterns.prognosticNote}
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Força Constitucional */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600 }}>💪 Força Constitucional</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Grau:</strong> {analysisResult.hereditaryAnalysis.constitutionalStrength.grade}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Interpretação:</strong> {analysisResult.hereditaryAnalysis.constitutionalStrength.interpretation}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Resiliência:</strong> {analysisResult.hereditaryAnalysis.constitutionalStrength.resilience}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 600 }}>
                    <strong>Prognóstico:</strong> {analysisResult.hereditaryAnalysis.constitutionalStrength.prognosis}
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Miasmas Homeopáticos */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600 }}>⚗️ Miasmas Homeopáticos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Primário:</strong> {analysisResult.hereditaryAnalysis.homeopathicMiasms.primary}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Secundário:</strong> {analysisResult.hereditaryAnalysis.homeopathicMiasms.secondary}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Terciário:</strong> {analysisResult.hereditaryAnalysis.homeopathicMiasms.tertiary}
                  </Typography>

                  <Alert severity="info" sx={{ mb: 2 }}>
                    <strong>Tratamento Nosódico:</strong> {analysisResult.hereditaryAnalysis.homeopathicMiasms.treatment}
                  </Alert>

                  <Typography variant="body2">
                    <strong>Constitucional:</strong> {analysisResult.hereditaryAnalysis.homeopathicMiasms.constitutional}
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Plano de Ação */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#d32f2f' }}>🎯 Plano de Ação</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#d32f2f', mb: 1 }}>
                    ⚡ Ações Imediatas:
                  </Typography>
                  <ul>
                    {analysisResult.hereditaryAnalysis.actionPlan.immediate.map((action, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{action}</Typography>
                      </li>
                    ))}
                  </ul>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#f57c00', mt: 2, mb: 1 }}>
                    📅 Curto Prazo (1-3 meses):
                  </Typography>
                  <ul>
                    {analysisResult.hereditaryAnalysis.actionPlan.shortTerm.map((action, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{action}</Typography>
                      </li>
                    ))}
                  </ul>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2e7d32', mt: 2, mb: 1 }}>
                    🔮 Longo Prazo (anual):
                  </Typography>
                  <ul>
                    {analysisResult.hereditaryAnalysis.actionPlan.longTerm.map((action, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{action}</Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>

              <Alert severity="warning" sx={{ mt: 3 }}>
                <strong>Questionário Familiar Recomendado:</strong>
                <ul style={{ marginTop: 8, marginBottom: 0 }}>
                  {analysisResult.hereditaryAnalysis.familyHistoryQuestionnaire.questions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </Alert>
            </Paper>
          )}

          {/* Zone Analysis */}
          {analysisResult.zones.map((zone, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <Typography sx={{ fontWeight: 600 }}>{zone.name}</Typography>
                  <Chip 
                    label={zone.severity} 
                    size="small"
                    color={zone.severity === 'Moderado' ? 'warning' : 'info'}
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Órgãos Relacionados:
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {zone.organs.map((organ, idx) => (
                    <Chip key={idx} label={organ} size="small" sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
                
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Achados:
                </Typography>
                <ul>
                  {getVisibleZoneFindings(zone, analysisResult.leftIrisAnalyzed, analysisResult.rightIrisAnalyzed).map((finding, idx) => (
                    <li key={idx}>
                      <Typography variant="body2">{finding}</Typography>
                    </li>
                  ))}
                </ul>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Imagem da Zona:</Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    {[{
                      side: 'left',
                      image: leftIrisPreview
                    }, {
                      side: 'right',
                      image: rightIrisPreview
                    }].map(({ side, image }, sidx) => (
                      <Box key={sidx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {image ? (
                          <img
                            src={(highlightCache[`${index}-${side}`]) || image}
                            alt={`Imagem zona ${zone.name} (${side})`}
                            style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee', cursor: 'pointer' }}
                            onClick={async () => {
                              // open zoom with the highlighted image if exists
                              if (highlightCache[`${index}-${side}`]) {
                                setZoomImage(highlightCache[`${index}-${side}`]);
                                setZoomTitle(`${zone.name} - Íris ${side}`);
                                return;
                              }
                              // generate it
                              const sector = computeSectorAnglesFromZoneName(zone.name) || { startDeg: -90, endDeg: -60 };
                              const isPupillary = /pupila|pupilar|colarete|borda/i.test(zone.name);
                              const opts = isPupillary ? { innerRadiusPct: 0.02, outerRadiusPct: 0.22, startDeg: sector.startDeg, endDeg: sector.endDeg } : { innerRadiusPct: 0.28, outerRadiusPct: 0.9, startDeg: sector.startDeg, endDeg: sector.endDeg };
                              const highlighted = await createHighlightImage(image, opts);
                              setHighlightCache(prev => ({ ...prev, [`${index}-${side}`]: highlighted || image }));
                              setZoomImage(highlighted || image);
                              setZoomTitle(`${zone.name} - Íris ${side}`);
                            }}
                          />
                        ) : (
                          <Box sx={{ width: 120, height: 120, bgcolor: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
                            <Typography variant="caption">Sem imagem</Typography>
                          </Box>
                        )}
                        <Typography variant="caption" sx={{ mt: 0.5 }}>{side === 'left' ? 'Íris Esquerda' : 'Íris Direita'}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}

          {/* Análise da Esclera */}
          {analysisResult.scleraAnalysis && (
            <Paper sx={{ p: 3, mt: 3, background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#0277bd', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                👁️ Análise da Esclera (Parte Branca do Olho)
              </Typography>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                {analysisResult.scleraAnalysis.overview}
              </Alert>

              {/* Cor e Textura da Esclera */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography sx={{ fontWeight: 600 }}>🟡 Coloração e Textura</Typography>
                    <Chip 
                      label={analysisResult.scleraAnalysis.colorAndTexture.severity} 
                      size="small"
                      sx={{ bgcolor: '#ff9800', color: '#fff' }}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Achado:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {analysisResult.scleraAnalysis.colorAndTexture.finding}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Significado Clínico:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {analysisResult.scleraAnalysis.colorAndTexture.significance}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Órgãos Relacionados:
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {analysisResult.scleraAnalysis.colorAndTexture.organs.map((organ, idx) => (
                      <Chip key={idx} label={organ} size="small" color="warning" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>

                  <Alert severity="warning" sx={{ mb: 2 }}>
                    <strong>MTC:</strong> {analysisResult.scleraAnalysis.colorAndTexture.tcm}<br/>
                    <strong>Ayurveda:</strong> {analysisResult.scleraAnalysis.colorAndTexture.ayurveda}
                  </Alert>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Recomendações:
                  </Typography>
                  <ul>
                    {analysisResult.scleraAnalysis.colorAndTexture.recommendations.map((rec, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{rec}</Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>

              {/* Padrões Vasculares */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography sx={{ fontWeight: 600 }}>🩸 Padrões Vasculares</Typography>
                    <Chip 
                      label={analysisResult.scleraAnalysis.vascularPatterns.severity} 
                      size="small"
                      color="warning"
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Achado:</strong> {analysisResult.scleraAnalysis.vascularPatterns.finding}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Significado:</strong> {analysisResult.scleraAnalysis.vascularPatterns.significance}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    {analysisResult.scleraAnalysis.vascularPatterns.organs.map((organ, idx) => (
                      <Chip key={idx} label={organ} size="small" color="error" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Recomendações:
                  </Typography>
                  <ul>
                    {analysisResult.scleraAnalysis.vascularPatterns.recommendations.map((rec, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{rec}</Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>

              {/* Pinguécula/Pterígio */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography sx={{ fontWeight: 600 }}>☀️ Pinguécula e Pterígio</Typography>
                    <Chip 
                      label={analysisResult.scleraAnalysis.pingueculaAndPterygium.severity} 
                      size="small"
                      color="info"
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Achado:</strong> {analysisResult.scleraAnalysis.pingueculaAndPterygium.finding}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Significado:</strong> {analysisResult.scleraAnalysis.pingueculaAndPterygium.significance}
                  </Typography>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    {analysisResult.scleraAnalysis.pingueculaAndPterygium.differential}
                  </Alert>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Medidas Preventivas:
                  </Typography>
                  <ul>
                    {analysisResult.scleraAnalysis.pingueculaAndPterygium.preventiveMeasures.map((rec, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{rec}</Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>

              {/* Manchas Escleróticas */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography sx={{ fontWeight: 600 }}>🔴 Manchas Escleróticas (Melanose)</Typography>
                    <Chip 
                      label={analysisResult.scleraAnalysis.scleroticSpots.severity} 
                      size="small"
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Achado:</strong> {analysisResult.scleraAnalysis.scleroticSpots.finding}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Significado:</strong> {analysisResult.scleraAnalysis.scleroticSpots.significance}
                  </Typography>

                  <Alert severity="warning" sx={{ mb: 2 }}>
                    <strong>Diagnóstico Diferencial:</strong>
                    <ul style={{ marginTop: 8 }}>
                      {analysisResult.scleraAnalysis.scleroticSpots.differential.map((diff, idx) => (
                        <li key={idx}>{diff}</li>
                      ))}
                    </ul>
                  </Alert>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Recomendações:
                  </Typography>
                  <ul>
                    {analysisResult.scleraAnalysis.scleroticSpots.recommendations.map((rec, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{rec}</Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>

              {/* Sinais Inflamatórios */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography sx={{ fontWeight: 600 }}>🔥 Sinais Inflamatórios (Hiperemia)</Typography>
                    <Chip 
                      label={analysisResult.scleraAnalysis.inflammatorySigns.severity} 
                      size="small"
                      color="error"
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Achado:</strong> {analysisResult.scleraAnalysis.inflammatorySigns.finding}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Significado:</strong> {analysisResult.scleraAnalysis.inflammatorySigns.significance}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Possíveis Causas:
                  </Typography>
                  <ul>
                    {analysisResult.scleraAnalysis.inflammatorySigns.possibleCauses.map((cause, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{cause}</Typography>
                      </li>
                    ))}
                  </ul>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
                    Recomendações:
                  </Typography>
                  <ul>
                    {analysisResult.scleraAnalysis.inflammatorySigns.recommendations.map((rec, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{rec}</Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>

              {/* Mudanças Conjuntivais */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600 }}>👁️ Alterações Conjuntivais</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Achado:</strong> {analysisResult.scleraAnalysis.conjunctivalChanges.finding}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Significado:</strong> {analysisResult.scleraAnalysis.conjunctivalChanges.significance}
                  </Typography>

                  <Alert severity="info" sx={{ mb: 2 }}>
                    <strong>MTC:</strong> {analysisResult.scleraAnalysis.conjunctivalChanges.tcm}<br/>
                    <strong>Ayurveda:</strong> {analysisResult.scleraAnalysis.conjunctivalChanges.ayurveda}
                  </Alert>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Recomendações:
                  </Typography>
                  <ul>
                    {analysisResult.scleraAnalysis.conjunctivalChanges.recommendations.map((rec, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{rec}</Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>

              {/* Correlação Clínica */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#d32f2f' }}>🎯 Correlação Clínica Integrada</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                    Interpretação Sistêmica:
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2"><strong>Sobrecarga Hepática:</strong> {analysisResult.scleraAnalysis.clinicalCorrelation.hepaticOverload}</Typography>
                    <Typography variant="body2"><strong>Cardiovascular:</strong> {analysisResult.scleraAnalysis.clinicalCorrelation.cardiovascular}</Typography>
                    <Typography variant="body2"><strong>Olho Seco:</strong> {analysisResult.scleraAnalysis.clinicalCorrelation.dryEye}</Typography>
                    <Typography variant="body2"><strong>Inflamação Sistêmica:</strong> {analysisResult.scleraAnalysis.clinicalCorrelation.systemicInflammation}</Typography>
                    <Typography variant="body2"><strong>Metabólico:</strong> {analysisResult.scleraAnalysis.clinicalCorrelation.metabolic}</Typography>
                  </Box>

                  <Alert severity="error" sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      ⚕️ Exames Laboratoriais Recomendados:
                    </Typography>
                    <ul style={{ marginTop: 8, marginBottom: 0 }}>
                      {analysisResult.scleraAnalysis.clinicalCorrelation.recommendedTests.map((test, idx) => (
                        <li key={idx}>{test}</li>
                      ))}
                    </ul>
                  </Alert>

                  <Alert severity="warning">
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      👨‍⚕️ Encaminhamento Especializado:
                    </Typography>
                    <ul style={{ marginTop: 8, marginBottom: 0 }}>
                      {analysisResult.scleraAnalysis.clinicalCorrelation.specialistReferrals.map((ref, idx) => (
                        <li key={idx}>{ref}</li>
                      ))}
                    </ul>
                  </Alert>
                </AccordionDetails>
              </Accordion>
            </Paper>
          )}

          {/* Sinais Iridológicos Específicos */}
          {analysisResult.specificSigns && (
            <Paper sx={{ p: 3, mt: 3, background: '#fff8e1' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#f57c00', fontWeight: 600 }}>
                🔬 Sinais Iridológicos Específicos Identificados
              </Typography>

              {/* Sinais Estruturais */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#d84315' }}>
                    🏗️ Sinais Estruturais
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {analysisResult.specificSigns.structuralSigns.map((sign, idx) => (
                    <Paper key={idx} sx={{ p: 2, mb: 2, bgcolor: '#fafafa' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#d84315', mb: 1 }}>
                        {sign.name}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Descrição:</strong> {sign.description}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Significado Clínico:</strong> {sign.significance}
                      </Typography>
                      {sign.types && (
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Tipos:</strong> {sign.types.join(', ')}
                        </Typography>
                      )}
                      {sign.severity && (
                        <Alert severity="warning" sx={{ mt: 1, fontSize: '0.85rem' }}>
                          {sign.severity}
                        </Alert>
                      )}
                      {sign.inapReference && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 1, fontStyle: 'italic', color: '#666' }}>
                          📚 INNAP: {sign.inapReference}
                        </Typography>
                      )}
                      {/* Image Highlight for Sign */}
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Imagem destacada (parte afetada):</Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {[{ side: 'left', img: leftIrisPreview }, { side: 'right', img: rightIrisPreview }].map(({ side, img }, i) => (
                            <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              {img ? (
                                <img
                                  src={(highlightCache[`${idx}-sign-${side}`]) || img}
                                  alt={`${sign.name} (${side})`}
                                  style={{ width: 110, height: 110, objectFit: 'cover', borderRadius: 6, cursor: 'pointer', border: '1px solid #eee' }}
                                  onClick={async () => {
                                    if (highlightCache[`${idx}-sign-${side}`]) { setZoomImage(highlightCache[`${idx}-sign-${side}`]); setZoomTitle(`${sign.name} - Íris ${side}`); return; }
                                    // compute highlight options based on sign name
                                    let opts = { innerRadiusPct: 0.28, outerRadiusPct: 0.9, startDeg: -90, endDeg: -60 };
                                    const n = sign.name.toLowerCase();
                                    if (/bord/i.test(n) || /colarete|colarette|pupila/i.test(n)) {
                                      opts = { innerRadiusPct: 0.02, outerRadiusPct: 0.16, startDeg: -90, endDeg: 270 };
                                    } else if (/radii|raios|radii|raios solar/i.test(n) || /radian/i.test(n)) {
                                      opts = { innerRadiusPct: 0.28, outerRadiusPct: 0.9, startDeg: -110, endDeg: -70 };
                                    } else if (/anel/i.test(n) || /ring/i.test(n) || /nerve rings/i.test(n)) {
                                      opts = { innerRadiusPct: 0.10, outerRadiusPct: 0.26, startDeg: -120, endDeg: -60 };
                                    }
                                    const highlighted = await createHighlightImage(img, opts);
                                    setHighlightCache(prev => ({ ...prev, [`${idx}-sign-${side}`]: highlighted || img }));
                                    setZoomImage(highlighted || img);
                                    setZoomTitle(`${sign.name} - Íris ${side}`);
                                  }}
                                />
                              ) : (
                                <Box sx={{ width: 110, height: 110, bgcolor: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
                                  <Typography variant="caption">Sem imagem</Typography>
                                </Box>
                              )}
                              <Typography variant="caption" sx={{ mt: 0.5 }}>{side === 'left' ? 'Íris Esquerda' : 'Íris Direita'}</Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                      {sign.johnAndrewsNote && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic', color: '#666' }}>
                          📚 John Andrews: {sign.johnAndrewsNote}
                        </Typography>
                      )}
                      {sign.idomarSantosNote && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic', color: '#666' }}>
                          📚 Idomar Santos: {sign.idomarSantosNote}
                        </Typography>
                      )}
                      {sign.inapClassification && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic', color: '#666' }}>
                          📊 Classificação: {sign.inapClassification}
                        </Typography>
                      )}
                      {sign.correlation && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: '#1976d2' }}>
                          🔗 Correlação: {sign.correlation}
                        </Typography>
                      )}
                    </Paper>
                  ))}
                </AccordionDetails>
              </Accordion>

              {/* Sinais Pigmentares */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#f57c00' }}>
                    🎨 Sinais Pigmentares
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {analysisResult.specificSigns.pigmentarySigns.map((sign, idx) => (
                    <Paper key={idx} sx={{ p: 2, mb: 2, bgcolor: sign.urgency ? '#ffebee' : '#fafafa' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#f57c00', mb: 1 }}>
                        {sign.name}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Descrição:</strong> {sign.description}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Significado Clínico:</strong> {sign.significance}
                      </Typography>
                      {sign.distribution && (
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Distribuição:</strong> {sign.distribution}
                        </Typography>
                      )}
                      {sign.urgency && (
                        <Alert severity="error" sx={{ mt: 1, fontSize: '0.85rem' }}>
                          ⚠️ {sign.urgency}
                        </Alert>
                      )}
                      {sign.johnAndrewsCritical && (
                        <Alert severity="warning" sx={{ mt: 1, fontSize: '0.85rem' }}>
                          🚨 John Andrews: {sign.johnAndrewsCritical}
                        </Alert>
                      )}
                      {sign.idomarSantosProtocol && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 1, fontStyle: 'italic', color: '#1976d2' }}>
                          💊 Protocolo Idomar Santos: {sign.idomarSantosProtocol}
                        </Typography>
                      )}
                      {sign.inapProtocol && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic', color: '#1976d2' }}>
                          💊 Protocolo INNAP: {sign.inapProtocol}
                        </Typography>
                      )}
                      {sign.johnAndrewsInterpretation && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic', color: '#666' }}>
                          📚 John Andrews: {sign.johnAndrewsInterpretation}
                        </Typography>
                      )}
                    </Paper>
                  ))}
                </AccordionDetails>
              </Accordion>

              {/* Anel Autonômico */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#7b1fa2' }}>
                    ⚡ Anel Autonômico (ANW) e Sistema Nervoso
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Paper sx={{ p: 2, bgcolor: '#fafafa' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#7b1fa2', mb: 1 }}>
                      {analysisResult.specificSigns.autonomicNerveWreath.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Descrição:</strong> {analysisResult.specificSigns.autonomicNerveWreath.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      <strong>Posição Normal:</strong> {analysisResult.specificSigns.autonomicNerveWreath.normalPosition}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Desvios e Interpretações:
                    </Typography>
                    <ul>
                      {analysisResult.specificSigns.autonomicNerveWreath.deviations.map((deviation, idx) => (
                        <li key={idx}>
                          <Typography variant="body2">{deviation}</Typography>
                        </li>
                      ))}
                    </ul>
                    <Alert severity="info" sx={{ mt: 2, fontSize: '0.85rem' }}>
                      📚 INNAP: {analysisResult.specificSigns.autonomicNerveWreath.inapClinicalCorrelation}
                    </Alert>
                  </Paper>
                </AccordionDetails>
              </Accordion>

              {/* Densidade Fibrilar */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#00796b' }}>
                    📊 Densidade e Resistência Fibrilar
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Paper sx={{ p: 2, bgcolor: '#fafafa' }}>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      <strong>Avaliação:</strong> {analysisResult.specificSigns.densityGrading.description}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Classificação por Graus:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {analysisResult.specificSigns.densityGrading.grades.map((grade, idx) => (
                        <li key={idx}>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>{grade}</Typography>
                        </li>
                      ))}
                    </Box>
                    <Alert severity="warning" sx={{ mt: 2, fontSize: '0.85rem' }}>
                      ⚠️ {analysisResult.specificSigns.densityGrading.idomarSantosNote}
                    </Alert>
                  </Paper>
                </AccordionDetails>
              </Accordion>
            </Paper>
          )}

          {/* Recommendations */}
          <Paper sx={{ p: 3, mt: 3, background: '#e3f2fd' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
              💡 Recomendações Terapêuticas para as Írises
            </Typography>
            
            {/* Supplements */}
            {analysisResult.recommendations.supplements?.length > 0 && (
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#1976d2' }}>
                    💊 Suplementos Recomendados
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table size="small">
                      <TableBody>
                        {analysisResult.recommendations.supplements.map((item, idx) => {
                          const parts = item.split(' | ');
                          const treatment = parts[0]?.split(' - ')[0] || item;
                          const dosage = parts[0]?.split(' - ')[1] || '';
                          const posology = parts[1] || '';
                          const source = parts[2] || '';
                          
                          return (
                            <TableRow key={idx}>
                              <TableCell>• {treatment}</TableCell>
                              <TableCell sx={{ fontSize: '0.8rem' }}>
                                {dosage && <div><strong>Dose:</strong> {dosage.replace('Dose:', '').trim()}</div>}
                                {posology && <div><strong>Posologia:</strong> {posology.replace('Posologia:', '').trim()}</div>}
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.75rem', fontStyle: 'italic' }}>
                                {source ? source.replace('Fonte:', '').trim() : '—'}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            )}

            {/* Herbs */}
            {analysisResult.recommendations.herbs?.length > 0 && (
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#2e7d32' }}>
                    🌿 Fitoterápicos Recomendados
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table size="small">
                      <TableBody>
                        {analysisResult.recommendations.herbs.map((item, idx) => {
                          const parts = item.split(' | ');
                          const treatment = parts[0]?.split(' - ')[0] || item;
                          const dosage = parts[0]?.split(' - ')[1] || '';
                          const posology = parts[1] || '';
                          const source = parts[2] || '';
                          
                          return (
                            <TableRow key={idx}>
                              <TableCell>• {treatment}</TableCell>
                              <TableCell sx={{ fontSize: '0.8rem' }}>
                                {dosage && <div><strong>Dose:</strong> {dosage.replace('Dose:', '').trim()}</div>}
                                {posology && <div><strong>Posologia:</strong> {posology.replace('Posologia:', '').trim()}</div>}
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.75rem', fontStyle: 'italic' }}>
                                {source ? source.replace('Fonte:', '').trim() : '—'}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            )}

            {/* Homeopathy */}
            {analysisResult.recommendations.homeopathy?.length > 0 && (
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#7b1fa2' }}>
                    ⚗️ Homeopáticos Recomendados
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul>
                    {analysisResult.recommendations.homeopathy.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{item}</Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            )}

            {/* Hydrotherapy */}
            {analysisResult.recommendations.hydrotherapy?.length > 0 && (
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#0288d1' }}>
                    💧 Hidroterapia Recomendada
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul>
                    {analysisResult.recommendations.hydrotherapy.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{item}</Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            )}

            {/* TCM */}
            {analysisResult.recommendations.tcm?.length > 0 && (
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#d84315' }}>
                    ☯️ Medicina Tradicional Chinesa
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul>
                    {analysisResult.recommendations.tcm.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{item}</Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            )}

            {/* Ayurveda */}
            {analysisResult.recommendations.ayurveda?.length > 0 && (
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#ff6f00' }}>
                    🕉️ Ayurveda (Medicina Indiana)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul>
                    {analysisResult.recommendations.ayurveda.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{item}</Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            )}

            {/* Lifestyle Modifications */}
            {analysisResult.recommendations.lifestyleModifications?.length > 0 && (
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#00695c' }}>
                    🌱 Modificações de Estilo de Vida
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul>
                    {analysisResult.recommendations.lifestyleModifications.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{item}</Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            )}
          </Paper>

          {/* CONTRAINDICAÇÕES E PRECAUÇÕES - SEGURANÇA */}
          {analysisResult.recommendations.contraindications && (
            <Paper sx={{ p: 3, mt: 3, background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)', borderRadius: 2, border: '2px solid #d32f2f' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#d32f2f', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                ⚠️ CONTRAINDICAÇÕES E PRECAUÇÕES DE SEGURANÇA
              </Typography>
              
              <Alert severity="error" sx={{ mb: 3 }}>
                <strong>IMPORTANTE:</strong> Leia atentamente antes de iniciar qualquer protocolo terapêutico. Em caso de dúvida, consulte seu profissional de saúde.
              </Alert>

              {/* Suplementos */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#d32f2f' }}>💊 Contraindicações - Suplementos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {analysisResult.recommendations.contraindications.supplements.map((item, idx) => (
                    <Box key={idx} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#c62828', mb: 1 }}>
                        {item.name}
                      </Typography>
                      <ul style={{ marginTop: 4 }}>
                        {item.contraindications.map((contra, cIdx) => (
                          <li key={cIdx}>
                            <Typography variant="body2">{contra}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>

              {/* Fitoterapia */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#d32f2f' }}>🌿 Contraindicações - Fitoterapia</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {analysisResult.recommendations.contraindications.herbs.map((item, idx) => (
                    <Box key={idx} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#c62828', mb: 1 }}>
                        {item.name}
                      </Typography>
                      <ul style={{ marginTop: 4 }}>
                        {item.contraindications.map((contra, cIdx) => (
                          <li key={cIdx}>
                            <Typography variant="body2">{contra}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>

              {/* Homeopatia */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#7b1fa2' }}>⚗️ Precauções - Homeopatia</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {analysisResult.recommendations.contraindications.homeopathy.map((item, idx) => (
                    <Box key={idx} sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#6a1b9a', mb: 1 }}>
                        {item.name}
                      </Typography>
                      <ul style={{ marginTop: 4 }}>
                        {item.contraindications.map((contra, cIdx) => (
                          <li key={cIdx}>
                            <Typography variant="body2">{contra}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>

              {/* Hidroterapia */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#d32f2f' }}>💧 Contraindicações - Hidroterapia</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {analysisResult.recommendations.contraindications.hydrotherapy.map((item, idx) => (
                    <Box key={idx} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#c62828', mb: 1 }}>
                        {item.name}
                      </Typography>
                      <Alert severity="error" sx={{ mb: 1 }}>
                        <ul style={{ marginTop: 4, marginBottom: 0 }}>
                          {item.contraindications.map((contra, cIdx) => (
                            <li key={cIdx}>{contra}</li>
                          ))}
                        </ul>
                      </Alert>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>

              {/* MTC */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#d32f2f' }}>☯️ Contraindicações - MTC (Acupuntura e Moxa)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {analysisResult.recommendations.contraindications.tcm.map((item, idx) => (
                    <Box key={idx} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#c62828', mb: 1 }}>
                        {item.name}
                      </Typography>
                      <ul style={{ marginTop: 4 }}>
                        {item.contraindications.map((contra, cIdx) => (
                          <li key={cIdx}>
                            <Typography variant="body2">{contra}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>

              {/* Ayurveda */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#d32f2f' }}>🕉️ Contraindicações - Ayurveda</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {analysisResult.recommendations.contraindications.ayurveda.map((item, idx) => (
                    <Box key={idx} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#c62828', mb: 1 }}>
                        {item.name}
                      </Typography>
                      <ul style={{ marginTop: 4 }}>
                        {item.contraindications.map((contra, cIdx) => (
                          <li key={cIdx}>
                            <Typography variant="body2">{contra}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>

              {/* Estilo de Vida */}
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: '#d32f2f' }}>🏃 Contraindicações - Modificações de Estilo de Vida</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {analysisResult.recommendations.contraindications.lifestyle.map((item, idx) => (
                    <Box key={idx} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#c62828', mb: 1 }}>
                        {item.name}
                      </Typography>
                      <Alert severity="error" sx={{ mb: 1 }}>
                        <ul style={{ marginTop: 4, marginBottom: 0 }}>
                          {item.contraindications.map((contra, cIdx) => (
                            <li key={cIdx}>{contra}</li>
                          ))}
                        </ul>
                      </Alert>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>

              {/* Precauções Gerais */}
              <Alert severity="error" sx={{ mt: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                  ⚠️ PRECAUÇÕES GERAIS - LEIA COM ATENÇÃO
                </Typography>
                {analysisResult.recommendations.contraindications.generalPrecautions.map((precaution, idx) => (
                  <Typography key={idx} variant="body2" sx={{ mb: 0.5, whiteSpace: 'pre-wrap' }}>
                    {precaution}
                  </Typography>
                ))}
              </Alert>

              <Alert severity="warning" sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  📞 Em caso de reação adversa, suspenda imediatamente o uso e procure assistência de saúde.
                  <br/>
                  🏥 Mantenha seu profissional de saúde informado sobre todos os suplementos e terapias que está utilizando.
                </Typography>
              </Alert>
            </Paper>
          )}

          {/* Therapeutic Priorities */}
          <Paper sx={{ p: 3, mt: 2, background: '#fff3e0' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              🎯 Prioridades de Tratamento:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {analysisResult.therapeuticPriorities.map((priority, idx) => (
                <Chip 
                  key={idx}
                  label={priority}
                  color={idx === 0 ? 'error' : 'warning'}
                  variant={idx === 0 ? 'filled' : 'outlined'}
                  sx={{ justifyContent: 'flex-start', height: 'auto', py: 1 }}
                />
              ))}
            </Box>
          </Paper>

          {/* Clinical References */}
          {analysisResult.clinicalReferences && (
            <Paper sx={{ p: 3, mt: 2, background: '#f3e5f5' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#7b1fa2' }}>
                📚 Referências Clínicas e Bibliográficas
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>🏛️ INNAP:</strong> {analysisResult.clinicalReferences.innap}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>🗺️ John Andrews:</strong> {analysisResult.clinicalReferences.johnAndrews}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>🔬 Idomar Santos:</strong> {analysisResult.clinicalReferences.idomarSantos}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Estudos Complementares:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {analysisResult.clinicalReferences.additionalStudies.map((study, idx) => (
                  <li key={idx}>
                    <Typography variant="body2">{study}</Typography>
                  </li>
                ))}
              </ul>
            </Paper>
          )}

          {/* RECEITUÁRIO - Formato Profissional para Impressão */}
          <Box id="iridology-prescription-printable" sx={{ mt: 4, pageBreakBefore: 'always' }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                border: '2px solid #1976d2',
                background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)'
              }}
            >
              {/* Cabeçalho do Receituário com Logo */}
              <Box sx={{ borderBottom: '3px solid #1976d2', pb: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <img 
                    src={`${process.env.PUBLIC_URL}/logo192.png`} 
                    alt="Logo" 
                    style={{ width: 80, height: 80, marginRight: 16 }}
                  />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2', textAlign: 'center', mb: 1 }}>
                      NATUROPATIA INTEGRATIVA
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: 'center', color: '#555', fontWeight: 600 }}>
                      Wander Pires Silva Coelho
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
                  Terapeuta Integrativo Funcional | Iridologia Clínica - CRTH-BR 17821
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', mt: 1 }}>
                  Análise Iridológica | Medicina Tradicional Chinesa | Ayurveda | Homeopatia
                </Typography>
              </Box>

              {/* Dados do Paciente */}
              <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#1976d2' }}>
                  DADOS DO PACIENTE
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                  <Typography variant="body2">
                    <strong>Nome:</strong> {patientName || 'Não informado'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}
                  </Typography>
                  <Typography variant="body2">
                    <strong>ID:</strong> {patientId || 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Tipo de Análise:</strong> Iridologia Clínica
                  </Typography>
                </Box>
              </Box>

              {/* Diagnóstico Iridológico */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#d32f2f' }}>
                  📋 DIAGNÓSTICO IRIDOLÓGICO - PONTOS CRÍTICOS
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {analysisResult.therapeuticPriorities.slice(0, 6).map((priority, idx) => (
                    <Typography key={idx} variant="body1" sx={{ mb: 0.5 }}>
                      • {priority}
                    </Typography>
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: '#fafafa' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: '#1976d2' }}>
                  👁️ ACHADOS ESTRITAMENTE POR ÍRIS (PACIENTE ATUAL)
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  {analysisResult.leftIrisAnalyzed && (
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8 }}>ÍRIS ESQUERDA</Typography>
                      <Box component="ul" sx={{ m: 0, pl: 2 }}>
                        {irisFindingsForDisplay.left.slice(0, 10).map((finding, idx) => (
                          <Typography component="li" key={`print-left-${idx}`} variant="body2" sx={{ mb: 0.4 }}>
                            {finding}
                          </Typography>
                        ))}
                        {irisFindingsForDisplay.left.length === 0 && (
                          <Typography component="li" variant="body2" sx={{ mb: 0.4 }}>
                            Nenhum achado específico registrado.
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  )}

                  {analysisResult.rightIrisAnalyzed && (
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8 }}>ÍRIS DIREITA</Typography>
                      <Box component="ul" sx={{ m: 0, pl: 2 }}>
                        {irisFindingsForDisplay.right.slice(0, 10).map((finding, idx) => (
                          <Typography component="li" key={`print-right-${idx}`} variant="body2" sx={{ mb: 0.4 }}>
                            {finding}
                          </Typography>
                        ))}
                        {irisFindingsForDisplay.right.length === 0 && (
                          <Typography component="li" variant="body2" sx={{ mb: 0.4 }}>
                            Nenhum achado específico registrado.
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* RECEITUÁRIO - Prescrição Completa */}
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1976d2', textAlign: 'center' }}>
                ℞ PRESCRIÇÃO TERAPÊUTICA IRIDOLÓGICA
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                      <TableCell sx={{ fontWeight: 700, width: '40%' }}>Produto/Intervenção</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '20%' }}>Dose</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '20%' }}>Frequência</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '20%' }}>Duração</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Suplementos */}
                    {analysisResult.recommendations.supplements?.length > 0 && (
                      <>
                        <TableRow>
                          <TableCell colSpan={4} sx={{ bgcolor: '#e3f2fd', fontWeight: 600 }}>
                            💊 SUPLEMENTOS NUTRICIONAIS
                          </TableCell>
                        </TableRow>
                        {analysisResult.recommendations.supplements.slice(0, 8).map((item, idx) => {
                          const parts = item.split(' | ');
                          const treatment = parts[0]?.split(' - ')[0] || item;
                          const dosage = parts[0]?.split(' - ')[1] || '';
                          const posology = parts[1]?.replace('Posologia:', '').trim() || '';
                          
                          return (
                            <TableRow key={`supl-${idx}`}>
                              <TableCell>{treatment}</TableCell>
                              <TableCell>{dosage.replace('Dose:', '').trim()}</TableCell>
                              <TableCell>{posology}</TableCell>
                              <TableCell>30-60 dias</TableCell>
                            </TableRow>
                          );
                        })}
                      </>
                    )}

                    {/* Fitoterápicos */}
                    {analysisResult.recommendations.herbs?.length > 0 && (
                      <>
                        <TableRow>
                          <TableCell colSpan={4} sx={{ bgcolor: '#e8f5e9', fontWeight: 600 }}>
                            🌿 FITOTERÁPICOS
                          </TableCell>
                        </TableRow>
                        {analysisResult.recommendations.herbs.slice(0, 8).map((item, idx) => {
                          const parts = item.split(' | ');
                          const treatment = parts[0]?.split(' - ')[0] || item;
                          const dosage = parts[0]?.split(' - ')[1] || '';
                          const posology = parts[1]?.replace('Posologia:', '').trim() || '';
                          
                          return (
                            <TableRow key={`herb-${idx}`}>
                              <TableCell>{treatment}</TableCell>
                              <TableCell>{dosage.replace('Dose:', '').trim()}</TableCell>
                              <TableCell>{posology}</TableCell>
                              <TableCell>30-90 dias</TableCell>
                            </TableRow>
                          );
                        })}
                      </>
                    )}

                    {/* Homeopatia */}
                    {analysisResult.recommendations.homeopathy?.length > 0 && (
                      <>
                        <TableRow>
                          <TableCell colSpan={4} sx={{ bgcolor: '#f3e5f5', fontWeight: 600 }}>
                            💧 HOMEOPATIA
                          </TableCell>
                        </TableRow>
                        {analysisResult.recommendations.homeopathy.slice(0, 6).map((item, idx) => {
                          const parts = item.split(' - ');
                          const treatment = parts[0] || item;
                          const posology = parts[1] || '';
                          const indication = parts[2] || '';
                          
                          return (
                            <TableRow key={`homeo-${idx}`}>
                              <TableCell>{treatment}</TableCell>
                              <TableCell>5 gotas/glóbulos</TableCell>
                              <TableCell>{posology}</TableCell>
                              <TableCell>30-60 dias</TableCell>
                            </TableRow>
                          );
                        })}
                      </>
                    )}

                    {/* Hidroterapia */}
                    {analysisResult.recommendations.hydrotherapy?.length > 0 && (
                      <>
                        <TableRow>
                          <TableCell colSpan={4} sx={{ bgcolor: '#e0f7fa', fontWeight: 600 }}>
                            💧 HIDROTERAPIA
                          </TableCell>
                        </TableRow>
                        {analysisResult.recommendations.hydrotherapy.slice(0, 4).map((item, idx) => {
                          const parts = item.split(' | ');
                          const treatment = parts[0] || item;
                          
                          return (
                            <TableRow key={`hydro-${idx}`}>
                              <TableCell>{treatment}</TableCell>
                              <TableCell>Conforme indicado</TableCell>
                              <TableCell>Diária/Semanal</TableCell>
                              <TableCell>Contínuo</TableCell>
                            </TableRow>
                          );
                        })}
                      </>
                    )}

                    {/* MTC - Acupuntura */}
                    {analysisResult.recommendations.tcm?.length > 0 && (
                      <>
                        <TableRow>
                          <TableCell colSpan={4} sx={{ bgcolor: '#fff3e0', fontWeight: 600 }}>
                            ☯️ MEDICINA TRADICIONAL CHINESA
                          </TableCell>
                        </TableRow>
                        {analysisResult.recommendations.tcm.slice(0, 4).map((item, idx) => {
                          return (
                            <TableRow key={`tcm-${idx}`}>
                              <TableCell>{item}</TableCell>
                              <TableCell>Conforme protocolo</TableCell>
                              <TableCell>Semanal</TableCell>
                              <TableCell>8-12 sessões</TableCell>
                            </TableRow>
                          );
                        })}
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Orientações de Estilo de Vida */}
              {analysisResult.recommendations.lifestyleModifications?.length > 0 && (
                <Box sx={{ mt: 3, p: 2, bgcolor: '#e8f5e9', borderRadius: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#2e7d32' }}>
                    🌱 MODIFICAÇÕES DE ESTILO DE VIDA
                  </Typography>
                  {analysisResult.recommendations.lifestyleModifications.slice(0, 6).map((item, idx) => (
                    <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                      • {item}
                    </Typography>
                  ))}
                </Box>
              )}

              {/* Orientações Ayurvédicas */}
              {analysisResult.recommendations.ayurveda?.length > 0 && (
                <Box sx={{ mt: 2, p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#f57c00' }}>
                    🕉️ ORIENTAÇÕES AYURVÉDICAS
                  </Typography>
                  {analysisResult.recommendations.ayurveda.slice(0, 4).map((item, idx) => (
                    <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                      • {item}
                    </Typography>
                  ))}
                </Box>
              )}

              {/* Rodapé do Receituário */}
              <Box sx={{ mt: 4, pt: 3, borderTop: '2px solid #ddd' }}>
                <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                  <strong>Observações:</strong> Protocolo gerado com base em análise iridológica completa utilizando 
                  mapas INNAP, John Andrews e Idomar Santos. Recomenda-se reavaliação após 30-60 dias. 
                  Em caso de dúvidas ou reações adversas, contatar o terapeuta imediatamente.
                </Typography>
                
                <Alert severity="warning" sx={{ mb: 2, fontSize: '0.85rem' }}>
                  <strong>⚠️ IMPORTANTE:</strong> Este protocolo é uma sugestão terapêutica baseada em análise iridológica. 
                  Consulte profissional de saúde antes de iniciar qualquer tratamento. Verifique contraindicações 
                  e interações medicamentosas. Gestantes, lactantes e pessoas com doenças crônicas devem 
                  buscar orientação médica especializada.
                </Alert>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      _______________________________
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Data: {new Date().toLocaleDateString('pt-BR')}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      _______________________________
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Wander Pires Silva Coelho
                    </Typography>
                    <Typography variant="caption">
                      CRTH-BR 17821
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Botões de Impressão */}
              <Box sx={{ mt: 3, textAlign: 'center', display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', '@media print': { display: 'none' } }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PrintIcon />}
                  onClick={() => {
                    document.body.classList.remove('print-mode-full');
                    document.body.classList.add('print-mode-protocols');
                    window.print();
                    const cleanup = () => {
                      document.body.classList.remove('print-mode-protocols');
                      window.removeEventListener('afterprint', cleanup);
                    };
                    window.addEventListener('afterprint', cleanup);
                  }}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontWeight: 600,
                    px: 4
                  }}
                >
                  🗒️ Imprimir Somente Protocolos
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PrintIcon />}
                  onClick={() => {
                    document.body.classList.remove('print-mode-protocols');
                    document.body.classList.add('print-mode-full');
                    window.print();
                    const cleanup = () => {
                      document.body.classList.remove('print-mode-full');
                      window.removeEventListener('afterprint', cleanup);
                    };
                    window.addEventListener('afterprint', cleanup);
                  }}
                  sx={{ fontWeight: 600, px: 4, borderColor: '#764ba2', color: '#764ba2' }}
                >
                  📋 Imprimir Tudo Relatado
                </Button>
              </Box>
            </Paper>
          </Box>

          {/* Estilos de impressão */}
          <style>
            {`
              @media print {
                /* ── SOMENTE PROTOCOLOS ── */
                body.print-mode-protocols * { visibility: hidden; }
                body.print-mode-protocols #iridology-prescription-printable,
                body.print-mode-protocols #iridology-prescription-printable * { visibility: visible; }
                body.print-mode-protocols #iridology-prescription-printable {
                  position: absolute; left: 0; top: 0; width: 100%;
                }

                /* ── TUDO RELATADO ── */
                body.print-mode-full * { visibility: hidden; }
                body.print-mode-full #iridology-analysis-full,
                body.print-mode-full #iridology-analysis-full * { visibility: visible; }
                body.print-mode-full #iridology-analysis-full {
                  position: absolute; left: 0; top: 0; width: 100%;
                }
                body.print-mode-full .iridology-no-print {
                  visibility: hidden !important;
                  height: 0 !important;
                  overflow: hidden !important;
                  padding: 0 !important;
                  margin: 0 !important;
                }

                /* ── LAYOUT A4 ── */
                @page { margin: 1cm; size: A4 portrait; }

                /* Tabela cabe em A4 */
                table { font-size: 9px !important; width: 100% !important; table-layout: fixed !important; }
                table td, table th { padding: 2px 4px !important; word-break: break-word !important; overflow-wrap: break-word !important; }
                thead { display: table-header-group; }
                tr { page-break-inside: avoid; }

                /* Imagens menores */
                img { max-width: 72px !important; max-height: 72px !important; }

                /* Textos print */
                body { font-size: 10px !important; }
                h4 { font-size: 13px !important; }
                h5 { font-size: 12px !important; }
                h6 { font-size: 11px !important; }

                /* Evitar corte de seções importantes */
                .MuiPaper-root { page-break-inside: avoid; }
                .print-avoid-break { page-break-inside: avoid; break-inside: avoid; }
              }
            `}
          </style>

          {/* Action Buttons */}
          <Box className="iridology-no-print" sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              onClick={async () => {
                try {
                  setSaving(true);
                  console.log('💾 Iniciando salvamento da análise de iridologia...');
                  
                  // Preparar dados para salvar — excluir campos grandes (thumbnails e imagens base64)
                  // para não exceder quota do localStorage
                  const {
                    zoneThumbnails: _zt,
                    signThumbnails: _st,
                    leftIrisImage: _li,
                    rightIrisImage: _ri,
                    ...safeAnalysisResult
                  } = analysisResult || {};

                  const dataToSave = {
                    ...safeAnalysisResult,
                    leftIrisFile: leftIris ? { name: leftIris.name, type: leftIris.type, size: leftIris.size } : null,
                    rightIrisFile: rightIris ? { name: rightIris.name, type: rightIris.type, size: rightIris.size } : null,
                    savedAt: new Date().toISOString(),
                    patientId: patientId,
                    patientName: patientName
                  };
                  
                  // Salvar imagens separadamente no IndexedDB
                  if (patientId) {
                    const irisImagesKey = `iridology-iris-images-${patientId}`;
                    const imagesData = {
                      leftIrisImage: leftIrisPreview,
                      rightIrisImage: rightIrisPreview,
                      leftIrisFile: leftIris ? { name: leftIris.name, type: leftIris.type, size: leftIris.size } : null,
                      rightIrisFile: rightIris ? { name: rightIris.name, type: rightIris.type, size: rightIris.size } : null,
                      savedAt: new Date().toISOString()
                    };
                    
                    await idbSet(irisImagesKey, imagesData);
                    console.log('✅ Imagens das írises salvas no IndexedDB');
                  }
                  
                  // Chamar callback do formulário pai (sem as imagens grandes)
                  if (onAnalysisComplete) {
                    onAnalysisComplete(dataToSave);
                  }
                  
                  console.log('✅ Análise de iridologia salva com sucesso!');
                  setSnackbarMessage('✅ Análise de iridologia salva com sucesso! As imagens e resultados foram armazenados.');
                  setSnackbarOpen(true);
                  
                } catch (error) {
                  console.error('❌ Erro ao salvar análise:', error);
                  setSnackbarMessage('❌ Erro ao salvar análise. Tente novamente.');
                  setSnackbarOpen(true);
                } finally {
                  setSaving(false);
                }
              }}
              disabled={saving}
            >
              {saving ? 'Salvando...' : 'Salvar Análise'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setAnalysisResult(null);
                setLeftIris(null);
                setRightIris(null);
                setLeftIrisPreview(null);
                setRightIrisPreview(null);
              }}
            >
              Nova Análise
            </Button>
          </Box>
        </Box>
      )}

      {/* Camera Dialog */}
      <Dialog 
        open={cameraOpen} 
        onClose={closeCamera}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CameraAltIcon />
            <Typography>
              Capturar Foto - Íris {cameraSide === 'left' ? 'Esquerda' : 'Direita'}
            </Typography>
          </Box>
          <IconButton onClick={closeCamera}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ position: 'relative', background: '#000' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            
            {/* Overlay guide circle */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                border: '3px solid rgba(25, 118, 210, 0.8)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }}
            />
          </Box>
          
          <Alert severity="info" sx={{ m: 2, mt: 3 }}>
            <Typography variant="body2">
              <strong>Dicas para melhor captura:</strong>
            </Typography>
            <Typography variant="caption" component="div" sx={{ mt: 1 }}>
              • Aproxime-se da câmera e centralize o olho no círculo<br/>
              • Use boa iluminação, de preferência natural<br/>
              • Mantenha o olho bem aberto<br/>
              • Evite reflexos e sombras<br/>
              • Fique imóvel ao capturar
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Button onClick={closeCamera} color="inherit">
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            size="large"
            startIcon={<PhotoCameraIcon />}
            onClick={capturePhoto}
          >
            Capturar Foto
          </Button>
        </DialogActions>
      </Dialog>

      {/* Zoom Dialog */}
      <Dialog 
        open={!!zoomImage} 
        onClose={() => setZoomImage(null)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {zoomTitle}
          <IconButton onClick={() => setZoomImage(null)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <img 
              src={zoomImage} 
              alt={zoomTitle}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '80vh', 
                objectFit: 'contain' 
              }} 
            />
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar for Save Feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarMessage.includes('❌') ? 'error' : 'success'}
          sx={{ width: '100%', fontSize: '1rem', fontWeight: 600 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Information */}
      <Paper sx={{ p: 2, mt: 3, background: '#f5f5f5' }}>
        <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
          <strong>📋 Instruções para melhor qualidade de análise:</strong>
        </Typography>
        <Typography variant="caption" component="div">
          • Você pode fazer upload de uma imagem ou tirar foto diretamente pela câmera<br/>
          • Use boa iluminação natural ou luz branca<br/>
          • Mantenha a câmera estável e próxima ao olho<br/>
          • Evite reflexos e sombras<br/>
          • Formato recomendado: JPG ou PNG<br/>
          • Resolução mínima: 1024x768 pixels<br/>
          • A análise é baseada nos mapas iridológicos da pasta therapeutic-data
        </Typography>
      </Paper>
    </Paper>
  );
}
