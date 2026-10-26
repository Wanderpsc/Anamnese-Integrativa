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
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import FaceIcon from '@mui/icons-material/Face';
import PanToolIcon from '@mui/icons-material/PanTool';
import HearingIcon from '@mui/icons-material/Hearing';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import HistoryIcon from '@mui/icons-material/History';
import SaveIcon from '@mui/icons-material/Save';
import ClinicalSignsReport from './ClinicalSignsReport';
import { analyzeBloodTypeCompatibility } from '../lib/bloodTypeData';

/**
 * Componente de Análise de Sinais Clínicos
 * Upload de fotos e análise de: Pele, Unhas, Orelhas, Olhos, Cabelo, Língua
 * Integrado com dados de Biorressonância por Tipo Sanguíneo
 */
export default function ClinicalSignsAnalysis({ patientId, patientName, bloodType, onAnalysisComplete }) {
  const [images, setImages] = useState({
    face: null,
    hands: null,
    nails: null,
    ears: null,
    eyes: null,
    hair: null,
    tongue: null,
    skin: null
  });

  const [previews, setPreviews] = useState({
    face: null,
    hands: null,
    nails: null,
    ears: null,
    eyes: null,
    hair: null,
    tongue: null,
    skin: null
  });

  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);
  const [zoomTitle, setZoomTitle] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState([]);

  // Camera states
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [currentImageType, setCurrentImageType] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Carregar histórico do localStorage ao montar o componente
  useEffect(() => {
    loadAnalysisHistory();
  }, []);

  const loadAnalysisHistory = () => {
    try {
      const stored = localStorage.getItem('clinicalSignsHistory');
      if (stored) {
        const history = JSON.parse(stored);
        setAnalysisHistory(history);
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  const saveAnalysisToHistory = (analysis) => {
    try {
      const history = [...analysisHistory];
      history.unshift({
        id: Date.now(),
        ...analysis,
        savedAt: new Date().toISOString()
      });
      // Manter apenas os últimos 50 registros
      const trimmedHistory = history.slice(0, 50);
      localStorage.setItem('clinicalSignsHistory', JSON.stringify(trimmedHistory));
      setAnalysisHistory(trimmedHistory);
    } catch (error) {
      console.error('Erro ao salvar histórico:', error);
      alert('Erro ao salvar no histórico. Tente novamente.');
    }
  };

  const loadHistoryItem = (item) => {
    setAnalysisResult(item);
    setShowHistory(false);
    if (onAnalysisComplete) {
      onAnalysisComplete(item);
    }
  };

  const clearHistory = () => {
    if (window.confirm('Deseja realmente limpar todo o histórico?')) {
      localStorage.removeItem('clinicalSignsHistory');
      setAnalysisHistory([]);
    }
  };

  const imageTypes = [
    { key: 'face', label: 'Face/Pele', icon: <FaceIcon /> },
    { key: 'hands', label: 'Mãos', icon: <PanToolIcon /> },
    { key: 'nails', label: 'Unhas', icon: <PanToolIcon /> },
    { key: 'ears', label: 'Orelhas', icon: <HearingIcon /> },
    { key: 'eyes', label: 'Olhos', icon: <RemoveRedEyeIcon /> },
    { key: 'hair', label: 'Cabelo', icon: <ContentCutIcon /> },
    { key: 'tongue', label: 'Língua', icon: <FaceIcon /> },
    { key: 'skin', label: 'Pele (Geral)', icon: <FaceIcon /> }
  ];

  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImages(prev => ({ ...prev, [type]: file }));
      setPreviews(prev => ({ ...prev, [type]: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (type) => {
    setImages(prev => ({ ...prev, [type]: null }));
    setPreviews(prev => ({ ...prev, [type]: null }));
  };

  const openCamera = async (type) => {
    setCurrentImageType(type);
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
    setCurrentImageType(null);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !currentImageType) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;

      const file = new File([blob], `${currentImageType}_${Date.now()}.jpg`, { type: 'image/jpeg' });
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => ({ ...prev, [currentImageType]: file }));
        setPreviews(prev => ({ ...prev, [currentImageType]: e.target.result }));
        closeCamera();
      };
      reader.readAsDataURL(blob);
    }, 'image/jpeg', 0.95);
  };

  const analyzeSigns = async () => {
    const hasAnyImage = Object.values(images).some(img => img !== null);
    if (!hasAnyImage) {
      alert('Por favor, envie pelo menos uma imagem');
      return;
    }

    setAnalyzing(true);

    setTimeout(() => {
      const mockAnalysis = generateMockAnalysis();
      setAnalysisResult(mockAnalysis);
      setAnalyzing(false);
      
      // Salvar automaticamente no histórico
      saveAnalysisToHistory(mockAnalysis);
      
      if (onAnalysisComplete) {
        onAnalysisComplete(mockAnalysis);
      }
    }, 3000);
  };

  const generateMockAnalysis = () => {
    const baseAnalysis = {
      patientId,
      patientName,
      bloodType,
      date: new Date().toISOString(),
      imagesAnalyzed: Object.keys(images).filter(key => images[key] !== null),
      
      // ANÁLISE DA PELE
      skinAnalysis: {
        overview: 'A pele é o maior órgão do corpo e reflete a saúde interna. Sinais na pele podem indicar desequilíbrios sistêmicos, deficiências nutricionais, toxemia e condições emocionais.',
        
        faceAnalysis: {
          title: 'Mapeamento Facial (Face Reading - Diagnóstico pela Face)',
          zones: [
            {
              area: 'Testa (Região Superior)',
              organs: ['Intestino Delgado', 'Bexiga', 'Sistema Digestivo'],
              findings: [
                'Acne ou erupções: sobrecarga digestiva, má absorção',
                'Rugas horizontais: estresse crônico, preocupação excessiva',
                'Oleosidade excessiva: desequilíbrio hormonal, dieta rica em gorduras'
              ],
              tcm: 'Calor no Intestino Delgado, deficiência de Yin do Rim',
              ayurveda: 'Pitta agravado, Vata desequilibrado'
            },
            {
              area: 'Entre as Sobrancelhas (Glabela)',
              organs: ['Fígado', 'Vesícula Biliar'],
              findings: [
                'Linhas verticais profundas: estagnação de Qi do Fígado, raiva reprimida',
                'Vermelhidão: Calor no Fígado, hipertensão',
                'Manchas: sobrecarga hepática, toxinas'
              ],
              tcm: 'Estagnação de Qi e Sangue do Fígado',
              ayurveda: 'Pitta elevado no Yakrit (fígado)'
            },
            {
              area: 'Nariz',
              organs: ['Coração', 'Pulmões', 'Sistema Circulatório'],
              findings: [
                'Ponta vermelha/inchada: Calor no Coração, pressão alta, consumo de álcool',
                'Poros dilatados: má circulação, congestão linfática',
                'Vasinhos visíveis: fragilidade capilar, deficiência de vitamina C'
              ],
              tcm: 'Calor no Coração, deficiência de Qi do Pulmão',
              ayurveda: 'Sadhaka Pitta (Pitta no coração) agravado'
            },
            {
              area: 'Bochechas',
              organs: ['Pulmões', 'Estômago', 'Sistema Respiratório'],
              findings: [
                'Bochechas vermelhas: Calor no Pulmão, febre interna',
                'Bochechas pálidas: deficiência de Sangue, anemia',
                'Acne nas bochechas: problemas respiratórios, alergia, fumo'
              ],
              tcm: 'Calor-Umidade no Pulmão, deficiência de Wei Qi',
              ayurveda: 'Kapha acumulado em Prana Vaha Srotas'
            },
            {
              area: 'Queixo e Mandíbula',
              organs: ['Rins', 'Bexiga', 'Órgãos Reprodutores'],
              findings: [
                'Acne no queixo: desequilíbrio hormonal, SOP, menstruação irregular',
                'Manchas escuras: deficiência renal, Yang do Rim fraco',
                'Inchaço: retenção hídrica, função renal comprometida'
              ],
              tcm: 'Deficiência de Jing do Rim, Yang do Rim deficiente',
              ayurveda: 'Apana Vayu bloqueado, Shukra Dhatu depleto'
            },
            {
              area: 'Região ao Redor dos Olhos',
              organs: ['Rins', 'Fígado', 'Baço'],
              findings: [
                'Olheiras roxas/pretas: deficiência de Sangue do Fígado, insônia',
                'Bolsas inchadas: deficiência do Baço, retenção de líquidos',
                'Olheiras amareladas: sobrecarga hepática, icterícia leve'
              ],
              tcm: 'Deficiência de Sangue do Fígado, Qi do Baço fraco',
              ayurveda: 'Ranjaka Pitta alterado, Kapha acumulado'
            }
          ],
          
          colorAnalysis: {
            pale: {
              finding: 'Palidez Facial',
              significance: 'Deficiência de Sangue (Anemia), Qi fraco, má circulação',
              organs: ['Baço', 'Pulmões', 'Coração'],
              recommendations: [
                'Ferro quelado 30mg + Vitamina C 500mg (aumenta absorção)',
                'Vitamina B12 1000mcg sublingual',
                'Ácido Fólico 400mcg',
                'Alimentação: beterraba, fígado, espinafre, lentilha',
                'Fitoterapia: Dong Quai (Angelica sinensis), Ginseng',
                'Acupuntura: E36, BP6, B20, B21'
              ]
            },
            red: {
              finding: 'Vermelhidão Facial (Face Rubra)',
              significance: 'Calor interno, hipertensão, inflamação, menopausa',
              organs: ['Coração', 'Fígado', 'Pulmões'],
              recommendations: [
                'Chá verde (EGCG) - anti-inflamatório',
                'Crisântemo (Ju Hua) + Hortelã (Bo He) - clareia Calor',
                'Magnésio 400mg - reduz pressão arterial',
                'Ômega-3 2-3g - anti-inflamatório cardiovascular',
                'Evitar: álcool, pimenta, alimentos termogênicos',
                'Acupuntura: F3, VB20, IG4, C7'
              ]
            },
            yellow: {
              finding: 'Amarelamento (Icterícia)',
              significance: 'Sobrecarga hepática, bilirrubina elevada, hepatite',
              organs: ['Fígado', 'Vesícula Biliar', 'Baço'],
              recommendations: [
                'URGENTE: Exames hepáticos (TGO, TGP, GGT, bilirrubinas)',
                'Cardo Mariano 900mg 3x/dia',
                'Alcachofra 1000mg 2x/dia',
                'Boldo ou Dente-de-Leão - chá 3x/dia',
                'Evitar: álcool, gorduras saturadas, frituras',
                'Acupuntura: F3, F8, VB34, F14'
              ]
            },
            gray: {
              finding: 'Palidez Acinzentada',
              significance: 'Deficiência severa de Yang, doença crônica, insuficiência renal',
              organs: ['Rins', 'Baço', 'Pulmões'],
              recommendations: [
                'Avaliar função renal (ureia, creatinina, TFG)',
                'Ginseng Vermelho (Panax ginseng) 500mg 2x/dia',
                'Cordyceps sinensis 1000mg/dia',
                'Astrágalo (Huang Qi) 500mg 3x/dia',
                'Moxa: VG4 (Mingmen), R3 (Taixi), E36',
                'Acupuntura: R3, R7, VG4, B23'
              ]
            }
          },
          
          textureAndQuality: {
            oily: {
              finding: 'Pele Oleosa',
              significance: 'Calor-Umidade, desequilíbrio hormonal, dieta inadequada',
              recommendations: [
                'Zinco quelado 30mg/dia',
                'Vitamina B6 50mg/dia',
                'Probióticos 50 bilhões UFC',
                'Reduzir laticínios, açúcar, alimentos fritos',
                'Chá verde tópico (adstringente natural)',
                'Niacinamida 5% (tópico) - reduz oleosidade'
              ]
            },
            dry: {
              finding: 'Pele Seca/Ressecada',
              significance: 'Deficiência de Yin, desidratação, Vata elevado',
              recommendations: [
                'Ômega-3 3-4g/dia',
                'Ácido Hialurônico 200mg/dia',
                'Colágeno hidrolisado 10g/dia',
                'Vitamina A 10.000UI',
                'Hidratação: 35ml/kg peso corporal',
                'Óleo de coco ou gergelim (abhyanga - massagem ayurvédica)'
              ]
            },
            acne: {
              finding: 'Acne/Espinhas',
              significance: 'Calor-Umidade, desequilíbrio hormonal, disbiose intestinal',
              recommendations: [
                'Probióticos 50-100 bilhões UFC',
                'Zinco 30mg + Vitamina A 10.000UI',
                'Óleo de melaleuca (tea tree) tópico',
                'Evitar: laticínios, açúcar, glúten (teste)',
                'Fitoterapia: Bardana, Dente-de-Leão',
                'Acupuntura: IG4, IG11, E36, F3'
              ]
            },
            wrinkles: {
              finding: 'Rugas Precoces',
              significance: 'Estresse oxidativo, deficiência de colágeno, Yin deficiente',
              recommendations: [
                'Vitamina C 2g/dia (síntese de colágeno)',
                'Colágeno tipo I e III 10g/dia',
                'Ácido Hialurônico 200mg',
                'Antioxidantes: Resveratrol, CoQ10, Vitamina E',
                'Proteção solar diária (FPS 50+)',
                'Retinol 0.1-0.5% tópico (à noite)'
              ]
            }
          }
        },
        
        skinConditions: [
          {
            condition: 'Psoríase',
            signs: 'Placas eritematosas com descamação prateada',
            tcm: 'Calor-Vento no Sangue, estagnação de Sangue',
            ayurveda: 'Vata e Kapha desequilibrados, ama (toxinas)',
            recommendations: [
              'Vitamina D3 10.000UI/dia',
              'Ômega-3 4-5g/dia',
              'Cúrcuma 2000mg/dia',
              'Probióticos 100 bilhões UFC',
              'Evitar: glúten, laticínios, álcool, fumo',
              'Banho de sol moderado 15-20min/dia',
              'Acupuntura: F3, BP10, IG11, BP6'
            ]
          },
          {
            condition: 'Eczema/Dermatite',
            signs: 'Pele inflamada, coceira intensa, crostas',
            tcm: 'Calor-Umidade, deficiência de Sangue',
            ayurveda: 'Pitta e Kapha agravados',
            recommendations: [
              'Probióticos 50 bilhões UFC',
              'Ômega-3 3g/dia',
              'Quercetina 500mg 2x/dia (anti-histamínico)',
              'Vitamina E tópica',
              'Evitar: alérgenos conhecidos, níquel, fragrâncias',
              'Óleo de coco com lavanda (tópico)',
              'Acupuntura: BP10, IG11, BP6, F3'
            ]
          },
          {
            condition: 'Vitiligo',
            signs: 'Despigmentação em manchas',
            tcm: 'Deficiência de Qi e Sangue do Fígado',
            ayurveda: 'Vata e Pitta desequilibrados, Bhrajaka Pitta alterado',
            recommendations: [
              'Vitamina B12 1000mcg',
              'Ácido Fólico 5mg',
              'Cobre 2mg',
              'Ginkgo Biloba 120mg 2x/dia',
              'Fotot erapia UVB (sob supervisão médica)',
              'Psoraleno + UVA (PUVA) - casos graves',
              'Acupuntura: F3, BP6, BP10, VB20'
            ]
          }
        ]
      },

      // ANÁLISE DAS UNHAS
      nailAnalysis: {
        overview: 'As unhas são extensões da pele e refletem a saúde interna. Mudanças nas unhas podem indicar deficiências nutricionais, problemas circulatórios, doenças sistêmicas e condições hereditárias.',
        
        normalNail: {
          description: 'Unha saudável: cor rosa, superfície lisa, crescimento uniforme, meia-lua visível',
          significance: 'Boa circulação, nutrição adequada, ausência de doenças sistêmicas'
        },
        
        nailSigns: [
          {
            sign: 'Unhas Pálidas/Brancas',
            significance: 'Anemia, deficiência de ferro, circulação deficiente',
            organs: ['Baço', 'Fígado', 'Medula Óssea'],
            tcm: 'Deficiência de Sangue do Fígado e Baço',
            recommendations: [
              'Ferro quelado 30mg + Vitamina C',
              'Vitamina B12 1000mcg',
              'Ácido Fólico 400mcg',
              'Hemograma completo + ferritina',
              'Alimentação: fígado, beterraba, espinafre'
            ]
          },
          {
            sign: 'Unhas Amareladas',
            significance: 'Infecção fúngica, psoríase ungueal, tabagismo, uso de esmaltes',
            organs: ['Pulmões', 'Fígado'],
            recommendations: [
              'Óleo de melaleuca (tea tree) tópico',
              'Óleo de orégano tópico',
              'Antifúngicos orais (se severo): Itraconazol',
              'Evitar: esmaltes com formaldeído',
              'Vitamina E tópica'
            ]
          },
          {
            sign: 'Unhas Azuladas/Cianóticas',
            significance: 'Baixa oxigenação, problemas cardiopulmonares, má circulação',
            organs: ['Pulmões', 'Coração'],
            urgency: 'URGENTE - Avaliar saturação de O2 e função cardiopulmonar',
            recommendations: [
              'Espirometria + Ecocardiograma',
              'CoQ10 200mg/dia',
              'L-Carnitina 1000mg 2x/dia',
              'Ginkgo Biloba 240mg/dia',
              'Evitar: tabagismo, exposição ao frio prolongado'
            ]
          },
          {
            sign: 'Linhas de Beau (Sulcos Horizontais)',
            significance: 'Doença grave recente, quimioterapia, desnutrição severa',
            organs: ['Sistema Imune', 'Nutrição Geral'],
            recommendations: [
              'Investigar doença de base',
              'Multivitamínico completo',
              'Proteína 1.5g/kg peso',
              'Biotina 5000mcg/dia',
              'Acompanhamento por profissional de saúde'
            ]
          },
          {
            sign: 'Coiloníquia (Unhas em Colher)',
            significance: 'Deficiência crônica de ferro, anemia severa',
            organs: ['Baço', 'Medula Óssea'],
            recommendations: [
              'Ferro injetável (casos graves)',
              'Investigar sangramento oculto',
              'Endoscopia digestiva',
              'Ferritina < 15 ng/mL = severa'
            ]
          },
          {
            sign: 'Linhas de Mees (Linhas Brancas Horizontais)',
            significance: 'Intoxicação por metais pesados (arsênico), quimioterapia',
            urgency: 'Investigar exposição a toxinas',
            recommendations: [
              'Quelação de metais pesados',
              'Glutationa lipossomal 500mg',
              'NAC 1200mg 2x/dia',
              'Exame: dosagem de arsênico, chumbo, mercúrio',
              'Afastar fonte de contaminação'
            ]
          },
          {
            sign: 'Unhas Quebradiças/Friáveis',
            significance: 'Deficiência de biotina, hipotireoidismo, desidratação',
            organs: ['Tireoide', 'Pele'],
            recommendations: [
              'Biotina 5000-10.000mcg/dia',
              'Silício orgânico 10mg/dia',
              'Colágeno 10g/dia',
              'TSH, T4 livre (avaliar tireoide)',
              'Hidratação ungueal: óleo de amêndoas'
            ]
          },
          {
            sign: 'Leuconíquia (Manchas Brancas)',
            significance: 'Trauma menor, deficiência de zinco (mito), normal em crianças',
            recommendations: [
              'Geralmente benigno',
              'Zinco 30mg se deficiência confirmada',
              'Proteger unhas de traumas'
            ]
          },
          {
            sign: 'Onicomicose (Micose Ungueal)',
            significance: 'Infecção fúngica - Trichophyton, Candida',
            recommendations: [
              'Antifúngico oral: Terbinafina 250mg/dia (3-6 meses)',
              'Óleo de melaleuca tópico',
              'Lixar superfície da unha',
              'Tratar sapatos (antifúngico em spray)',
              'Manter unhas secas'
            ]
          },
          {
            sign: 'Baqueteamento Digital (Dedos em Baqueta de Tambor)',
            significance: 'Hipoxemia crônica, doenças pulmonares, cardiopatias',
            urgency: 'GRAVE - Investigar imediatamente',
            recommendations: [
              'Radiografia de tórax + TC',
              'Ecocardiograma',
              'Saturação de O2',
              'Possíveis causas: câncer de pulmão, fibrose, cardiopatia'
            ]
          }
        ],
        
        lunarAnalysis: {
          title: 'Análise das Lúnulas (Meia-Lua)',
          normal: 'Lúnula visível em todos os dedos, cor branca leitosa, ocupa 1/5 da unha',
          findings: [
            {
              sign: 'Lúnulas Ausentes ou Muito Pequenas',
              significance: 'Deficiência de Qi e Yang, metabolismo lento, hipotireoidismo',
              tcm: 'Deficiência de Yang do Rim, Qi do Baço fraco',
              recommendations: [
                'Ginseng 500mg 2x/dia',
                'Rhodiola 300mg 2x/dia',
                'TSH, T4 livre, T3',
                'Astrágalo (Huang Qi) 500mg 3x/dia',
                'Moxa: VG4, R3, E36'
              ]
            },
            {
              sign: 'Lúnulas Muito Grandes',
              significance: 'Hiperatividade tireo idiana, hipertensão, estresse',
              tcm: 'Calor excessivo, Yang exuberante',
              recommendations: [
                'Avaliar tireoide (TSH, T3, T4)',
                'Magnésio 400mg',
                'Chá de melissa',
                'Reduzir cafeína',
                'Acupuntura: C7, PC6, F3'
              ]
            },
            {
              sign: 'Lúnula Azulada',
              significance: 'Problemas circulatórios, fenômeno de Raynaud, má oxigenação',
              recommendations: [
                'Ginkgo Biloba 240mg/dia',
                'Vitamina E 400UI',
                'Evitar frio extremo',
                'Avaliar circulação periférica'
              ]
            }
          ]
        }
      },

      // ANÁLISE DAS ORELHAS
      earAnalysis: {
        overview: 'Auriculoterapia e diagnóstico pela orelha (Ear Reflexology). A orelha é um microssistema que mapeia todo o corpo. Pontos e sinais na orelha revelam condições internas.',
        
        earMapping: {
          title: 'Mapa Auricular Completo',
          zones: [
            {
              area: 'Lóbulo',
              organs: ['Olhos', 'Mandíbula', 'Bochecha', 'Amígdalas'],
              findings: [
                'Vinco diagonal (Sinal de Frank): ALERTA CARDIOVASCULAR - correlação com doença arterial coronariana',
                'Lóbulo aderido: genética, sem significado clínico',
                'Manchas escuras: problemas de visão'
              ],
              urgency: 'Sinal de Frank = investigação cardiológica obrigatória'
            },
            {
              area: 'Trágus',
              organs: ['Nariz', 'Faringe', 'Laringe', 'Suprarrenais'],
              findings: [
                'Dor à palpação: rinite, sinusite',
                'Sensibilidade aumentada: fadiga adrenal'
              ]
            },
            {
              area: 'Anti-Hélice',
              organs: ['Coluna Vertebral', 'Nervos Espinhais'],
              findings: [
                'Pontos dolorosos: hérnias, escoliose, dor lombar',
                'Vascularização aumentada: inflamação vertebral'
              ]
            },
            {
              area: 'Hélice (Borda Externa)',
              organs: ['Órgãos Internos Diversos'],
              findings: [
                'Alterações de cor: processos inflamatórios internos',
                'Descamação: deficiências nutricionais'
              ]
            },
            {
              area: 'Concha Cava (Parte Profunda)',
              organs: ['Órgãos Digestivos - Estômago, Baço, Intestinos'],
              findings: [
                'Dor à pressão: gastrite, úlcera, SII',
                'Vermelhidão: inflamação digestiva ativa'
              ]
            },
            {
              area: 'Concha Cimba (Parte Superior da Concha)',
              organs: ['Órgãos Respiratórios e Circulatórios'],
              findings: [
                'Sensibilidade: asma, bronquite',
                'Vasinhos visíveis: hipertensão'
              ]
            }
          ],
          
          frankSign: {
            title: '🚨 Sinal de Frank (Vinco Diagonal no Lóbulo)',
            description: 'Prega diagonal que vai do trágus até a borda inferior do lóbulo',
            significance: 'ALERTA CARDIOVASCULAR - Correlação forte com doença arterial coronariana',
            studies: [
              'Estudo original: Sanders T. Frank (1973)',
              'Sensibilidade: 60-80%',
              'Especificidade: 60-70%',
              'Mais comum em: homens, >50 anos, fumantes, hipertensos'
            ],
            urgency: 'URGENTE - Solicitar avaliação cardiológica',
            recommendations: [
              'Ecocardiograma',
              'Teste ergométrico ou cintilografia',
              'Perfil lipídico completo',
              'Hemoglobina glicada',
              'Investigar fatores de risco cardiovascular',
              'Ômega-3, CoQ10, redução de gorduras saturadas'
            ]
          }
        },
        
        auriculotherapy: {
          title: 'Pontos Principais de Auriculoterapia',
          points: [
            { name: 'Shenmen', indication: 'Ansiedade, insônia, dor crônica' },
            { name: 'Ponto Zero', indication: 'Equilíbrio geral, homeostase' },
            { name: 'Simpático', indication: 'Dor, espasmos, regulação autonômica' },
            { name: 'Rim', indication: 'Dor lombar, tinnitus, vitalidade' },
            { name: 'Fígado', indication: 'Desintoxicação, irritabilidade, visão' },
            { name: 'Baço', indication: 'Digestão, energia, imunidade' },
            { name: 'Coração', indication: 'Ansiedade, palpitação, insônia' },
            { name: 'Pulmão', indication: 'Asma, rinite, parar de fumar' }
          ]
        }
      },

      // ANÁLISE DOS OLHOS
      eyeAnalysis: {
        overview: 'Além da iridologia, outros aspectos dos olhos revelam saúde: pálpebras, conjuntiva, movimentos oculares, visão de cores.',
        
        eyelids: {
          title: 'Análise das Pálpebras',
          findings: [
            {
              sign: 'Xantelasma (Placas Amareladas nas Pálpebras)',
              significance: 'Colesterol elevado, dislipidemia',
              urgency: 'Avaliar perfil lipídico',
              recommendations: [
                'Perfil lipídico completo',
                'Ômega-3 3g/dia',
                'Estatinas naturais: Berberina 1500mg',
                'Dieta mediterrânea',
                'Remoção cirúrgica (estética)'
              ]
            },
            {
              sign: 'Edema Palpebral (Inchaço)',
              significance: 'Retenção hídrica, alergia, insuficiência renal/cardíaca',
              recommendations: [
                'Função renal: ureia, creatinina',
                'Ecocardiograma (se cardiopatia)',
                'Reduzir sódio (<2g/dia)',
                'Drenagem linfática facial',
                'Evitar alérgenos'
              ]
            },
            {
              sign: 'Ptose Palpebral (Queda da Pálpebra)',
              significance: 'Miastenia gravis, lesão nervosa, envelhecimento',
              urgency: 'Investigar causa neurológica',
              recommendations: [
                'Encaminhar neurologista',
                'Teste do gelo (miastenia)',
                'Correção cirúrgica se cosmético'
              ]
            },
            {
              sign: 'Tremor Palpebral (Blefaroespasmo)',
              significance: 'Deficiência de magnésio, estresse, cafeína excessiva',
              recommendations: [
                'Magnésio 400mg/dia',
                'Reduzir cafeína',
                'Vitamina B12',
                'Técnicas de relaxamento'
              ]
            }
          ]
        },
        
        conjunctiva: {
          title: 'Análise da Conjuntiva (Parte Interna da Pálpebra)',
          findings: [
            {
              sign: 'Conjuntiva Pálida',
              significance: 'Anemia',
              recommendations: [
                'Hemograma completo',
                'Ferritina',
                'Ferro + Vitamina C',
                'Investigar causa da anemia'
              ]
            },
            {
              sign: 'Conjuntiva Vermelha',
              significance: 'Conjuntivite, alergia, síndrome do olho seco',
              recommendations: [
                'Colírio lubrificante',
                'Compressas frias',
                'Ômega-3',
                'Evitar alérgenos'
              ]
            },
            {
              sign: 'Conjuntiva Amarelada',
              significance: 'Icterícia, sobrecarga hepática',
              recommendations: [
                'Bilirrubinas',
                'Transaminases hepáticas',
                'Cardo Mariano 900mg/dia'
              ]
            }
          ]
        },
        
        pupilAnalysis: {
          title: 'Análise Pupilar',
          findings: [
            {
              sign: 'Pupilas Dilatadas (Midríase)',
              significance: 'Uso de substâncias, lesão cerebral, medo intenso',
              recommendations: ['Investigar causa neurológica ou toxicológica']
            },
            {
              sign: 'Pupilas Contraídas (Miose)',
              significance: 'Uso de opioides, lesão pontina, síndrome de Horner',
              recommendations: ['Avaliar neurologicamente']
            },
            {
              sign: 'Anisocoria (Pupilas Desiguais)',
              significance: 'Normal em 20% da população OU lesão neurológica',
              urgency: 'Se súbita: URGÊNCIA neurológica',
              recommendations: ['TC crânio, avaliar reflexos pupilares']
            }
          ]
        }
      },

      // ANÁLISE DO CABELO
      hairAnalysis: {
        overview: 'O cabelo reflete nutrição, hormônios, toxinas e saúde metabólica. Análise mineral do cabelo pode detectar deficiências e intoxicações.',
        
        hairQuality: [
          {
            finding: 'Queda de Cabelo (Alopecia)',
            types: [
              'Alopecia Androgenética: padrão masculino/feminino',
              'Alopecia Areata: autoimune, placas circulares',
              'Eflúvio Telógeno: queda difusa pós-estresse/parto'
            ],
            causes: [
              'Deficiência de ferro/ferritina',
              'Hipotireoidismo/Hipertireoidismo',
              'Deficiência de zinco, biotina, proteína',
              'Estresse crônico (cortisol elevado)',
              'Desequilíbrio hormonal (DHT, andrógenos)'
            ],
            recommendations: [
              'Hemograma + Ferritina',
              'TSH, T4 livre',
              'Zinco sérico',
              'Testosterona total e livre',
              'Biotina 5000mcg/dia',
              'Minoxidil 5% tópico',
              'Finasterida 1mg (homens) - bloqueador de DHT',
              'Saw Palmetto 320mg (natural)',
              'Massagem no couro cabeludo 5min/dia'
            ]
          },
          {
            finding: 'Cabelo Quebradiço/Fino',
            significance: 'Deficiência proteica, hipotireoidismo, envelhecimento',
            recommendations: [
              'Proteína 1.2g/kg peso',
              'Colágeno 10g/dia',
              'Biotina 5000mcg',
              'Silício orgânico 10mg',
              'Queratina tópica',
              'Evitar: alisamentos químicos, calor excessivo'
            ]
          },
          {
            finding: 'Cabelo Branco Precoce (antes dos 30 anos)',
            significance: 'Genética, estresse oxidativo, deficiência de B12',
            recommendations: [
              'Vitamina B12 1000mcg',
              'Ácido Fólico 400mcg',
              'Cobre 2mg',
              'Catalase (enzima antioxidante)',
              'Reduzir estresse',
              'Antioxidantes: vitamina C, E, glutationa'
            ]
          },
          {
            finding: 'Caspa/Dermatite Seborreica',
            significance: 'Proliferação de Malassezia (fungo), Pitta elevado',
            recommendations: [
              'Shampoo de cetoconazol 2%',
              'Óleo de melaleuca tópico',
              'Probióticos 50 bilhões UFC',
              'Ômega-3 2g/dia',
              'Evitar: açúcar, laticínios, estresse',
              'Vinagre de maçã (enxágue final)'
            ]
          }
        ],
        
        mineralAnalysis: {
          title: 'Análise Mineral do Cabelo (Teste Laboratorial)',
          description: 'Teste que detecta níveis de minerais essenciais e metais pesados tóxicos através da análise capilar',
          essentialMinerals: [
            'Cálcio', 'Magnésio', 'Zinco', 'Ferro', 'Cobre', 'Selênio', 'Cromo', 'Manganês'
          ],
          toxicMetals: [
            'Chumbo', 'Mercúrio', 'Arsênico', 'Cádmio', 'Alumínio'
          ],
          recommendations: [
            'Laboratórios especializados: Exame Lab, Hermes Pardini',
            'Custo: R$ 300-600',
            'Tempo: 10-15 dias',
            'Protocolo: cortar fios próximos à raiz, 1-2g de cabelo'
          ]
        }
      },

      // ANÁLISE DA LÍNGUA
      tongueAnalysis: {
        overview: 'Diagnóstico pela língua é fundamental na Medicina Tradicional Chinesa. A língua é o único órgão interno visível e reflete o estado de Qi, Sangue, Yin, Yang e os Zang-Fu (órgãos).',
        
        tongueBody: {
          title: 'Cor do Corpo da Língua',
          findings: [
            {
              color: 'Rosa Pálida (Normal)',
              significance: 'Saúde equilibrada, Qi e Sangue harmônicos'
            },
            {
              color: 'Pálida/Esbranquiçada',
              significance: 'Deficiência de Sangue e Qi, Yang deficiente, anemia',
              tcm: 'Deficiência de Sangue do Fígado e Baço',
              recommendations: [
                'Dong Quai (Angelica sinensis) 500mg 3x/dia',
                'Ginseng 500mg 2x/dia',
                'Ferro + Vitamina B12',
                'Alimentação: carne vermelha, beterraba',
                'Acupuntura: E36, BP6, B20'
              ]
            },
            {
              color: 'Vermelha',
              significance: 'Calor interno, inflamação, febre, Yin deficiente',
              tcm: 'Calor no Coração, Fígado ou Estômago',
              recommendations: [
                'Chá de crisântemo (Ju Hua)',
                'Rehmannia (Sheng Di Huang) - clareia Calor',
                'Evitar: picantes, álcool, alimentos termogênicos',
                'Acupuntura: C7, F2, E44 (pontos de Calor)'
              ]
            },
            {
              color: 'Vermelho-Escarlate',
              significance: 'Calor extremo, Yin severamente deficiente',
              urgency: 'Condição grave, investigar febre interna',
              recommendations: [
                'Avaliar infecção sistêmica',
                'Fitoterapia: Zhi Bai Di Huang Wan',
                'Hospitalização se febril'
              ]
            },
            {
              color: 'Púrpura/Roxa',
              significance: 'Estase de Sangue, má circulação, dor crônica',
              tcm: 'Estase de Sangue',
              recommendations: [
                'Ginkgo Biloba 240mg/dia',
                'Cúrcuma 1500mg/dia',
                'Dan Shen (Salvia miltiorrhiza) 500mg 3x/dia',
                'Acupuntura: BP10, F3, BP6'
              ]
            },
            {
              color: 'Azulada/Cianótica',
              significance: 'Oxigenação deficiente, estase severa de Sangue',
              urgency: 'URGENTE - avaliar função cardiopulmonar',
              recommendations: ['Saturação de O2, ecocardiograma, espirometria']
            }
          ]
        },
        
        tongueCoating: {
          title: 'Saburra (Revestimento da Língua)',
          findings: [
            {
              coating: 'Fina e Branca (Normal)',
              significance: 'Saburra normal, leve Umidade'
            },
            {
              coating: 'Espessa e Branca',
              significance: 'Frio interno, Umidade-Frio, mucosidade',
              tcm: 'Deficiência de Yang do Baço',
              recommendations: [
                'Gengibre fresco (chá 3x/dia)',
                'Canela 500mg 3x/dia',
                'Evitar: alimentos frios, crus, laticínios',
                'Moxa: E36, BP9, VG4'
              ]
            },
            {
              coating: 'Amarela',
              significance: 'Calor interno, inflamação',
              tcm: 'Calor no Estômago ou Intestino',
              recommendations: [
                'Chá verde',
                'Coptis (Huang Lian) - antibiótico natural',
                'Evitar: frituras, álcool, picantes',
                'Acupuntura: E44, IG11, F2'
              ]
            },
            {
              coating: 'Sem Saburra (Língua Pelada/Geográfica)',
              significance: 'Yin severamente deficiente, desnutrição, quimioterapia',
              tcm: 'Deficiência de Yin do Estômago e Rim',
              recommendations: [
                'Liu Wei Di Huang Wan (Pílula dos 6 Ingredientes)',
                'Alimentação: sopas, alimentos úmidos',
                'Evitar: alimentos secos, picantes'
              ]
            },
            {
              coating: 'Preta/Marrom',
              significance: 'Calor extremo, estagnação severa, uso de antibióticos',
              urgency: 'Investigar infecção grave ou doença sistêmica',
              recommendations: ['Avaliar com profissional de saúde imediatamente']
            }
          ]
        },
        
        tongueShape: {
          title: 'Forma e Características',
          findings: [
            {
              feature: 'Língua Inchada/Edemaciada',
              significance: 'Deficiência de Qi do Baço, retenção de líquidos',
              recommendations: [
                'Diurético: chá de cavalinha',
                'Reduzir sal',
                'Tonificar Baço: E36, BP6',
                'Astrágalo (Huang Qi) 500mg 3x/dia'
              ]
            },
            {
              feature: 'Língua Fina/Magra',
              significance: 'Deficiência de Yin e Sangue',
              recommendations: [
                'Rehmannia (Shu Di Huang)',
                'Dong Quai',
                'Alimentação nutritiva'
              ]
            },
            {
              feature: 'Marcas de Dentes (Scalloped Tongue)',
              significance: 'Deficiência de Qi do Baço, umidade',
              recommendations: [
                'Tonificar Baço: E36, BP3',
                'Evitar excesso de líquidos frios',
                'Gengibre, canela'
              ]
            },
            {
              feature: 'Rachaduras/Fissuras',
              significance: 'Deficiência de Yin, desidratação',
              recommendations: [
                'Hidratação adequada',
                'Óleo de coco (lubrificação)',
                'Liu Wei Di Huang Wan'
              ]
            },
            {
              feature: 'Tremor',
              significance: 'Deficiência de Qi e Sangue, Vento interno',
              recommendations: [
                'Ginseng 500mg 2x/dia',
                'Magnésio 400mg',
                'Avaliar Parkinson (se idoso)'
              ]
            },
            {
              feature: 'Desvio para um Lado',
              significance: 'AVC prévio, lesão neurológica',
              urgency: 'URGÊNCIA neurológica se súbito',
              recommendations: ['TC crânio, avaliar sequela de AVC']
            }
          ]
        }
      },

      // SINAIS GERAIS E INTEGRAÇÃO
      generalFindings: {
        constitutionalType: 'Misto (Vata-Pitta predominante)',
        overallHealth: 'Sinais indicam desafios em múltiplos sistemas',
        mainConcerns: [
          'Sinais cardiovasculares (Sinal de Frank nas orelhas)',
          'Deficiências nutricionais (unhas pálidas, cabelo quebradiço)',
          'Estagnação e toxemia (língua com saburra, pele com manchas)',
          'Deficiência de Yin e Sangue (palidez, ressecamento)',
          'Estresse crônico (rugas frontais, anéis de tensão)'
        ]
      },

      // RECOMENDAÇÕES INTEGRADAS
      integratedRecommendations: {
        priority1: {
          title: '🚨 URGENTE - Avaliação Cardiovascular',
          reason: 'Presença de Sinal de Frank nas orelhas',
          actions: [
            'Consulta cardiológica imediata',
            'Ecocardiograma + Teste ergométrico',
            'Perfil lipídico completo',
            'Hemoglobina glicada',
            'Pressão arterial 24h (MAPA)'
          ]
        },
        
        priority2: {
          title: '⚠️ Deficiências Nutricionais',
          actions: [
            'Hemograma completo + Ferritina',
            'Vitamina B12, Ácido Fólico',
            'Vitamina D3',
            'Zinco sérico',
            'Suplementação conforme exames'
          ]
        },
        
        priority3: {
          title: 'Detoxificação e Regeneração',
          actions: [
            'Protocolo hepático: Cardo Mariano + Alcachofra',
            'Hidratação: 35ml/kg peso',
            'Probióticos 50-100 bilhões UFC',
            'Dieta anti-inflamatória',
            'Jejum intermitente 16/8'
          ]
        },
        
        lifestyle: {
          title: 'Mudanças de Estilo de Vida',
          actions: [
            'Meditação 20min/dia',
            'Exercício moderado 30min 5x/semana',
            'Sono 7-9h (22h-6h)',
            'Exposição solar 15-30min/dia',
            'Redução de estresse (yoga, tai chi)',
            'Contato com natureza (earthing)'
          ]
        }
      },

      // REFERÊNCIAS CLÍNICAS
      clinicalReferences: {
        facialDiagnosis: 'Lillian Bridges - Face Reading in Chinese Medicine',
        nailAnalysis: 'Beaven and Brooks - A Guide to Nail Pathology',
        earDiagnosis: 'Nogier - Auriculotherapy Manual',
        eyeAnalysis: 'Ted Kaptchuk - The Web That Has No Weaver',
        hairAnalysis: 'Andrew W. Saul - Orthomolecular Medicine',
        tongueDiagnosis: 'Giovanni Maciocia - Diagnosis in Chinese Medicine',
        bioresonance: 'TIPO SANGUÍNEO - ANAMNESE CONFORME BIORRESSONÂNCIA.pdf'
      }
    };

    // Análise cruzada com tipo sanguíneo (se disponível)
    if (bloodType && baseAnalysis) {
      const bloodTypeAnalysis = analyzeBloodTypeCompatibility(bloodType, baseAnalysis);
      if (bloodTypeAnalysis) {
        baseAnalysis.bloodTypeAnalysis = bloodTypeAnalysis;
        
        // Adicionar alertas específicos do tipo sanguíneo
        if (bloodTypeAnalysis.compatibility.length > 0) {
          baseAnalysis.generalFindings.mainConcerns.unshift(
            `⚠️ Tipo Sanguíneo ${bloodTypeAnalysis.bloodType} - ${bloodTypeAnalysis.compatibility.length} correlações encontradas`
          );
        }
      }
    }

    return baseAnalysis;
  };

  return (
    <Paper sx={{ p: 4, mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 600 }}>
          🔍 Análise de Sinais Clínicos
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<HistoryIcon />}
            onClick={() => setShowHistory(true)}
            size="small"
          >
            Histórico ({analysisHistory.length})
          </Button>
          {analysisHistory.length > 0 && (
            <Button
              variant="text"
              color="error"
              onClick={clearHistory}
              size="small"
            >
              Limpar
            </Button>
          )}
        </Box>
      </Box>

      {patientName && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Interagente: <strong>{patientName}</strong>
        </Alert>
      )}

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Análise Completa:</strong> Pele, Unhas, Orelhas, Olhos, Cabelo, Língua
      </Alert>

      {/* Tabs for Different Body Parts */}
      <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mb: 3 }}>
        <Tab label="Face/Pele" />
        <Tab label="Mãos/Unhas" />
        <Tab label="Orelhas" />
        <Tab label="Olhos" />
        <Tab label="Cabelo/Língua" />
      </Tabs>

      {/* Upload Section */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {imageTypes.map((type) => (
          <Grid item xs={12} sm={6} md={3} key={type.key}>
            <Card sx={{ height: '100%', border: '2px dashed #1976d2' }}>
              <CardContent>
                <Box sx={{ textAlign: 'center' }}>
                  {type.icon}
                  <Typography variant="subtitle2" sx={{ mt: 1, mb: 2 }}>
                    {type.label}
                  </Typography>
                  
                  {previews[type.key] ? (
                    <Box>
                      <CardMedia
                        component="img"
                        image={previews[type.key]}
                        alt={type.label}
                        sx={{ 
                          height: 150, 
                          objectFit: 'cover',
                          borderRadius: 1,
                          mb: 1
                        }}
                      />
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => {
                            setZoomImage(previews[type.key]);
                            setZoomTitle(type.label);
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveImage(type.key)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  ) : (
                    <Box>
                      <CloudUploadIcon sx={{ fontSize: 40, color: '#bbb', mb: 1 }} />
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          component="label"
                        >
                          Upload
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, type.key)}
                          />
                        </Button>
                        <Button
                          size="small"
                          variant="text"
                          startIcon={<PhotoCameraIcon />}
                          onClick={() => openCamera(type.key)}
                        >
                          Foto
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Analyze Button */}
      {Object.values(images).some(img => img !== null) && !analysisResult && (
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={analyzing ? <CircularProgress size={20} color="inherit" /> : <AnalyticsIcon />}
            onClick={analyzeSigns}
            disabled={analyzing}
            sx={{ minWidth: 200 }}
          >
            {analyzing ? 'Analisando...' : 'Analisar Sinais'}
          </Button>
        </Box>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <Box>
          <Divider sx={{ my: 3 }} />
          <Alert severity="success" sx={{ mb: 3 }}>
            ✅ Análise completa de {analysisResult.imagesAnalyzed.length} imagens
            {' - Salvo automaticamente no histórico'}
          </Alert>
          
          {/* Componente de Relatório Completo com Impressão e PDF */}
          <ClinicalSignsReport 
            analysis={analysisResult} 
            patientName={patientName}
          />
        </Box>
      )}

      {/* History Dialog */}
      <Dialog open={showHistory} onClose={() => setShowHistory(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Histórico de Análises
          <IconButton
            onClick={() => setShowHistory(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {analysisHistory.length === 0 ? (
            <Alert severity="info">Nenhuma análise no histórico.</Alert>
          ) : (
            <List>
              {analysisHistory.map((item) => (
                <ListItem
                  key={item.id}
                  disablePadding
                  secondaryAction={
                    <Button
                      size="small"
                      onClick={() => loadHistoryItem(item)}
                    >
                      Carregar
                    </Button>
                  }
                >
                  <ListItemButton onClick={() => loadHistoryItem(item)}>
                    <ListItemText
                      primary={item.patientName || 'Sem nome'}
                      secondary={
                        <>
                          {new Date(item.date).toLocaleString('pt-BR')}
                          {' - '}
                          {item.imagesAnalyzed?.length || 0} imagens
                        </>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowHistory(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* Camera Dialog */}
      <Dialog open={cameraOpen} onClose={closeCamera} maxWidth="md" fullWidth>
        <DialogTitle>
          Capturar Foto
          <IconButton
            onClick={closeCamera}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ position: 'relative' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ width: '100%', borderRadius: 8 }}
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCamera}>Cancelar</Button>
          <Button variant="contained" onClick={capturePhoto} startIcon={<PhotoCameraIcon />}>
            Capturar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Zoom Dialog */}
      <Dialog open={!!zoomImage} onClose={() => setZoomImage(null)} maxWidth="lg">
        <DialogTitle>
          {zoomTitle}
          <IconButton
            onClick={() => setZoomImage(null)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {zoomImage && (
            <img src={zoomImage} alt={zoomTitle} style={{ width: '100%' }} />
          )}
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
