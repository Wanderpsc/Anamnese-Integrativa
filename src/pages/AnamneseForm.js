import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Alert,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
} from '@mui/material';
import {
  Save as SaveIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  OpenInNew as OpenInNewIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Print as PrintIcon,
  Science as ScienceIcon,
} from '@mui/icons-material';
import { ESTADOS_CIDADES } from '../data/estadosCidades';
import SPREADSHEETS from '../config/spreadsheets';
import IridologySequenceGuide from '../components/IridologySequenceGuide';
import ClinicalSignsChecklistForm from '../components/ClinicalSignsChecklistForm';
import VitalSignsAnalysis from '../components/VitalSignsAnalysis';
import ScrollToTop from '../components/ScrollToTop';
import BioresonanceResults from '../components/BioresonanceResults';
import { safeSaveAnamneses } from '../lib/localStorageSafe';
import { createAnamnese, updateAnamnese } from '../lib/api';
import {
  extractTextFromPDF,
  parseBioresonanceResults,
  categorizeParametersBySystem,
  generateResultsSummary
} from '../lib/bioresonancePdfParser';
// import GuiaCompletoDeB from '../assets/therapeutic-data/Guia Completo de Bioressonância.pdf';
import { sintomasCarencias, buscarMultiplasCarencias } from '../data/sintomasCarenciasData';
import { buildLetterheadHtml, downloadPdfFromHtml, buildAnamneseBodyHtml, generateQrDataUrl } from '../components/PrintTemplate';
import RealTimeTreatmentAnalysis from '../components/RealTimeTreatmentAnalysis';
import AnamnesisQuestionsSidebar from '../components/AnamnesisQuestionsSidebar';
import ComprehensiveHealthQuestionnaire from '../components/ComprehensiveHealthQuestionnaire';
import ComprehensiveHealthSummary from '../components/ComprehensiveHealthSummary';
import TreatmentProtocolsDisplay from '../components/TreatmentProtocolsDisplay';
import ComprehensiveFinalSummary from '../components/ComprehensiveFinalSummary';
import PrescriptionHeader from '../components/PrescriptionHeader';
import PrescriptionFooter from '../components/PrescriptionFooter';

export default function AnamneseForm({ personalOnly = false, triagem = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  // ID estável para novo paciente (antes de salvar), garante que protocolos sejam vinculados
  const pendingPatientIdRef = useRef(!id ? String(Date.now()) : null);
  // Destino após salvar: triagem volta para /triagem, personalOnly e padrão vão para /dashboard
  const navigateAfterSave = triagem ? '/triagem' : '/dashboard';
  const [savedSections, setSavedSections] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [mainButtonSaved, setMainButtonSaved] = useState(false);
  const [formData, setFormData] = useState({
    // Identificação
    q01_nome: '',
    q02_data_nasc: '',
    q03_idade: '',
    q04_sexo: '',
    q05_estado_civil: '',
    q06_profissao: '',
    q07_endereco: '',
    q08_cidade: '',
    q09_estado: '',
    q10_cep: '',
    q11_telefone: '',
    q12_email: '',
    q13_rg: '',
    q14_cpf: '',
    q14_tipo_consulta: '1ª Consulta',
    q14_data_retorno: '',
    q14_data_retorno_2: '',
    q14_data_retorno_3: '',
    q14_data_retorno_4: '',
    q14_comparecimento_confirmado: false,
    q14_historico_comparecimentos: [],
    
    // Queixa Principal
    q15_queixa_principal: '',
    q16_tempo_problema: '',
    q17_tratamentos_anteriores: '',
    
    // Sintomas e Carências Nutricionais
    q17a_sintomas_selecionados: [],
    q17b_carencias_identificadas: [],
    
    // Questionário Abrangente de Saúde
    comprehensiveHealthData: null,
    
    // Histórico Familiar
    q18_doencas_familia: '',
    q19_pais_vivos: '',
    q20_doencas_pais: '',
    
    // Histórico Pessoal
    q21_cirurgias: '',
    q22_hospitalizacoes: '',
    q23_alergias: '',
    q24_medicamentos_uso: '',
    q25_doencas_cronicas: '',
    
    // Hábitos de Vida
    q26_tabagismo: '',
    q27_etilismo: '',
    q28_atividade_fisica: '',
    q29_frequencia_exercicio: '',
    
    // Alimentação
    q30_cafe_manha: '',
    q31_almoco: '',
    q32_jantar: '',
    q33_lanches: '',
    q34_agua_dia: '',
    q35_restricoes_alimentares: '',
    
    // Sono e Repouso
    q36_horas_sono: '',
    q37_qualidade_sono: '',
    q38_acorda_noite: '',
    
    // Sistema Digestivo
    q39_intestino: '',
    q40_gases: '',
    q41_azia: '',
    q42_nauseas: '',
    
    // Sistema Urinário
    q43_urina_frequencia: '',
    q44_cor_urina: '',
    q45_ardor_urinar: '',
    
    // Outros Sintomas
    q46_dores: '',
    q47_cansaco: '',
    q48_estresse: '',
    q49_ansiedade: '',
    q50_observacoes: '',
    
    // Análise de Iridologia
    iridologyAnalysis: null,
    
    // Análise de Sinais Vitais
    vitalSignsAnalysis: null,
    
    // Checklist de Sinais Clínicos
    clinicalSignsChecklist: null,
    
    // Biorressonância
    biorresonanciaBarraFile: null,
    biorresonanciaBarraAnalysis: '',
    biorresonanciaBarraParsedResults: null,
    biorresonanciaBarraCategorized: null,
    biorresonanciaAuricularFile: null,
    biorresonanciaAuricularAnalysis: '',
    biorresonanciaAuricularParsedResults: null,
    biorresonanciaAuricularCategorized: null,
    
    // Tratamentos Avançados (Homeopatia, Aromaterapia, Óleos Essenciais)
    tratamentosHomeopatia: [],
    tratamentosAromaterapia: [],
    tratamentosOleosEssenciais: [],
  });

  const [selectedEstado, setSelectedEstado] = useState('');
  const [cidades, setCidades] = useState([]);
  const [uploadingBarra, setUploadingBarra] = useState(false);
  const [uploadingAuricular, setUploadingAuricular] = useState(false);
  const [analyzingBarra, setAnalyzingBarra] = useState(false);
  const [analyzingAuricular, setAnalyzingAuricular] = useState(false);
  const [guiaReference, setGuiaReference] = useState(null);
  
  // Estados para Sintomas e Carências Nutricionais
  const [sintomasSelecionados, setSintomasSelecionados] = useState([]);
  const [carenciasIdentificadas, setCarenciasIdentificadas] = useState([]);

  // Função auxiliar para extrair padrões do contexto
  const extractPatternsFromContext = (context, info) => {
    // Extrair possíveis causas (padrões expandidos)
    const causasPatterns = [
      /(?:possíveis\s+)?causas?[:\s]+([^.]+(?:\.|$))/gi,
      /etiologia[:\s]+([^.]+(?:\.|$))/gi,
      /origem[:\s]+([^.]+(?:\.|$))/gi,
      /devido\s+(?:a|à)[:\s]+([^.]+(?:\.|$))/gi,
      /pode\s+(?:ser\s+)?causad[oa]\s+por[:\s]+([^.]+(?:\.|$))/gi,
      /relacionad[oa]\s+(?:a|à|com)[:\s]+([^.]+(?:\.|$))/gi,
      /associad[oa]\s+(?:a|à|com)[:\s]+([^.]+(?:\.|$))/gi
    ];
    causasPatterns.forEach(pattern => {
      const matches = context.match(pattern);
      if (matches) {
        matches.forEach(m => {
          const cleaned = m.replace(/^[^:]*[:]+\s*/i, '').trim();
          if (cleaned.length > 10) info.causas.push(cleaned);
        });
      }
    });
    
    // Extrair observações (padrões expandidos)
    const obsPatterns = [
      /observa[çc][õo]es?[:\s]+([^.]+(?:\.|$))/gi,
      /nota[:\s]+([^.]+(?:\.|$))/gi,
      /importante[:\s]+([^.]+(?:\.|$))/gi,
      /aten[çc][ãa]o[:\s]+([^.]+(?:\.|$))/gi
    ];
    obsPatterns.forEach(pattern => {
      const matches = context.match(pattern);
      if (matches) {
        matches.forEach(m => {
          const cleaned = m.replace(/^[^:]*[:]+\s*/i, '').trim();
          if (cleaned.length > 10) info.observacoes.push(cleaned);
        });
      }
    });
    
    // Extrair indicações e tratamentos (muito expandido)
    const indPatterns = [
      /indica[çc][õo]es?[:\s]+([^.]+(?:\.|$))/gi,
      /tratamentos?[:\s]+([^.]+(?:\.|$))/gi,
      /terapias?[:\s]+([^.]+(?:\.|$))/gi,
      /suplementa[çc][ãa]o[:\s]+([^.]+(?:\.|$))/gi,
      /uso\s+de[:\s]+([^.]+(?:\.|$))/gi,
      /administrar[:\s]+([^.]+(?:\.|$))/gi,
      /recomenda-se[:\s]+([^.]+(?:\.|$))/gi,
      /utilizar[:\s]+([^.]+(?:\.|$))/gi,
      /aplicar[:\s]+([^.]+(?:\.|$))/gi,
      /(?:fitoterápico|nutracêutico|suplemento|vitamina|mineral)[^.]{0,100}(?:[.:,]\s*)?([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ][^.]+)/gi
    ];
    indPatterns.forEach(pattern => {
      const matches = context.match(pattern);
      if (matches) {
        matches.forEach(m => {
          const cleaned = m.replace(/^[^:]*[:]+\s*/i, '').trim();
          if (cleaned.length > 8) info.indicacoes.push(cleaned);
        });
      }
    });
    
    // Extrair posologia (muito expandido)
    const posPatterns = [
      /posologia[:\s]+([^.]+(?:\.|$))/gi,
      /modo\s+de\s+usar?[:\s]+([^.]+(?:\.|$))/gi,
      /como\s+tomar[:\s]+([^.]+(?:\.|$))/gi,
      /administra[çc][ãa]o[:\s]+([^.]+(?:\.|$))/gi,
      /tomar[:\s]+([^.]+(?:\.|$))/gi,
      /(\d+\s*(?:vez|vezes)\s*(?:ao|por)\s*dia[^.]*)/gi,
      /(\d+\s*(?:a|à)\s*\d+\s*(?:vez|vezes)[^.]*)/gi
    ];
    posPatterns.forEach(pattern => {
      const matches = context.match(pattern);
      if (matches) {
        matches.forEach(m => {
          const cleaned = m.replace(/^[^:]*[:]+\s*/i, '').trim();
          if (cleaned.length > 5) info.posologia.push(cleaned);
        });
      }
    });
    
    // Extrair dosagens (padrões MUITO expandidos)
    const dosePatterns = [
      /(\d+(?:[.,]\d+)?\s*(?:a|à)?\s*\d*\s*(?:mg|ml|mcg|µg|UI|u\.i\.|gotas?|gt|gts|cápsulas?|caps?|comprimidos?|comp|sachês?)(?:\s*(?:por|a|à|cada|\/)?s*(?:dia|hora|vez|dose|kg|kilo|refeição|ref|manhã|tarde|noite))?)/gi,
      /(\d+\s*a\s*\d+\s*(?:mg|ml|mcg|UI|gotas?))/gi,
      /dose[:\s]+([^.]{5,80}(?:mg|ml|mcg|UI|gotas|cápsulas|comprimidos)[^.]*)/gi
    ];
    dosePatterns.forEach(pattern => {
      const matches = context.match(pattern);
      if (matches) {
        matches.forEach(m => {
          const cleaned = m.trim();
          if (cleaned.length > 2) info.dosagem.push(cleaned);
        });
      }
    });
    
    // Extrair frequenciais quânticos (expandido)
    const freqPatterns = [
      /frequencial[:\s]+([^.]+(?:\.|$))/gi,
      /frequência[:\s]+([^.]+(?:\.|$))/gi,
      /quantum[:\s]+([^.]+(?:\.|$))/gi,
      /(\d+(?:[.,]\d+)?\s*(?:hz|khz|mhz|ghz))/gi,
      /ondas?[:\s]+([^.]+(?:hz|khz|mhz)[^.]*)/gi
    ];
    freqPatterns.forEach(pattern => {
      const matches = context.match(pattern);
      if (matches) {
        matches.forEach(m => {
          const cleaned = m.replace(/^[^:]*[:]+\s*/i, '').trim();
          if (cleaned.length > 3) info.frequenciais.push(cleaned);
        });
      }
    });
    
    // Extrair interações (expandido)
    const interPatterns = [
      /intera[çc][õo]es?[:\s]+([^.]+(?:\.|$))/gi,
      /interfere[:\s]+([^.]+(?:\.|$))/gi,
      /n[ãa]o\s+(?:associar|combinar|misturar)\s+com[:\s]+([^.]+(?:\.|$))/gi,
      /evitar\s+uso\s+(?:com|junto)[:\s]+([^.]+(?:\.|$))/gi,
      /cuidado\s+com[:\s]+([^.]+(?:\.|$))/gi
    ];
    interPatterns.forEach(pattern => {
      const matches = context.match(pattern);
      if (matches) {
        matches.forEach(m => {
          const cleaned = m.replace(/^[^:]*[:]+\s*/i, '').trim();
          if (cleaned.length > 10) info.interacoes.push(cleaned);
        });
      }
    });
    
    // Extrair contraindicações (muito expandido)
    const contraPatterns = [
      /contraindica[çc][õo]es?[:\s]+([^.]+(?:\.|$))/gi,
      /evitar[:\s]+([^.]+(?:\.|$))/gi,
      /n[ãa]o\s+(?:usar|utilizar|tomar)[:\s]+([^.]+(?:\.|$))/gi,
      /restri[çc][õo]es?[:\s]+([^.]+(?:\.|$))/gi,
      /proibido[:\s]+([^.]+(?:\.|$))/gi,
      /n[ãa]o\s+recomendado[:\s]+([^.]+(?:\.|$))/gi
    ];
    contraPatterns.forEach(pattern => {
      const matches = context.match(pattern);
      if (matches) {
        matches.forEach(m => {
          const cleaned = m.replace(/^[^:]*[:]+\s*/i, '').trim();
          if (cleaned.length > 10) info.contraindicacoes.push(cleaned);
        });
      }
    });
  };
  
  // Função para gerar termos relacionados ao parâmetro
  const generateRelatedTerms = (paramName) => {
    const terms = [paramName];
    
    // Mapeamento de termos relacionados
    const relatedMap = {
      'fígado': ['hepático', 'hepatobiliar', 'bile', 'vesícula', 'cirrose', 'esteatose'],
      'rim': ['renal', 'urinário', 'nefr'],
      'coração': ['cardíaco', 'cardiovascular', 'circulatório'],
      'pulmão': ['pulmonar', 'respiratório', 'brônquio'],
      'intestino': ['intestinal', 'cólon', 'digestivo', 'gastro'],
      'estômago': ['gástrico', 'digestão'],
      'tireoide': ['tireoidiano', 'hormonal', 'metabólico'],
      'pâncreas': ['pancreático', 'insulínico', 'glicemia'],
      'cérebro': ['cerebral', 'neurológico', 'cognitivo'],
      'osso': ['ósseo', 'articulação', 'osteo'],
      'pele': ['cutâneo', 'dermatológico', 'epidérmico'],
      'sangue': ['sanguíneo', 'hemat'],
      'linfático': ['linfa', 'imunológico'],
      'nervo': ['nervoso', 'neural', 'neuropático'],
      'hormônio': ['hormonal', 'endócrino'],
      'músculo': ['muscular', 'miofascial'],
      'inflamação': ['inflamatório', 'edema', 'inflam'],
      'estresse': ['ansiedade', 'tensão', 'cortisol'],
      'energia': ['fadiga', 'cansaço', 'metabólico', 'mitocôndria']
    };
    
    // Adicionar termos relacionados
    Object.keys(relatedMap).forEach(key => {
      if (paramName.includes(key)) {
        terms.push(...relatedMap[key]);
      }
    });
    
    return terms;
  };

  // Função para extrair informações do guia para um parâmetro específico
  const extractGuideInfoForParameter = (parameterName, guideText) => {
    if (!guideText || !parameterName) return null;

    try {
      const paramLower = parameterName.toLowerCase();
      const lines = guideText.split('\n');
      
      let info = {
        causas: [],
        observacoes: [],
        indicacoes: [],
        posologia: [],
        dosagem: [],
        frequenciais: [],
        interacoes: [],
        contraindicacoes: []
      };

      // Base de conhecimento complementar para parâmetros comuns
      const knowledgeBase = {
        'fígado': {
          indicacoes: ['Cárdo Mariano (Silybum marianum)', 'Alcáçofra', 'Boldo', 'Dente-de-leão', 'Curcúma'],
          posologia: ['Tomar 2 a 3 vezes ao dia, preferencialmente antes das refeições'],
          causas: ['Álcool', 'Medicações', 'Toxinas ambientais', 'Alimentação inadequada', 'Infecções virais'],
          observacoes: ['Evitar alimentos gordurosos e processados', 'Aumentar consumo de vegetais verdes']
        },
        'rins': {
          indicacoes: ['Quebra-pedra', 'Cavalinha', 'Chá verde', 'Uva-ursi', 'Cranberry'],
          posologia: ['Ingerir bastante água (2-3 litros/dia)', 'Chás diuréticos 3x ao dia'],
          causas: ['Desidratação', 'Dieta rica em sódio', 'Diabetes', 'Hipertensão', 'Infecções urinárias']
        },
        'coração': {
          indicacoes: ['Coenzima Q10', 'Magnésio', 'Ômega-3', 'Alho', 'Espinheiro-branco'],
          posologia: ['CoQ10: 100-300mg/dia', 'Magnésio: 400mg/dia', 'Ômega-3: 1000-2000mg/dia'],
          causas: ['Estresse', 'Sedentarismo', 'Hipertensão', 'Colesterol elevado', 'Tabagismo']
        },
        'digestão': {
          indicacoes: ['Probóticos', 'Enzimas digestivas', 'Gengibre', 'Hortelã', 'Camomila'],
          posologia: ['Probóticos: 1-2 bilhões UFC/dia', 'Enzimas: antes das principais refeições'],
          causas: ['Estresse', 'Alimentação inadequada', 'Falta de mastigação', 'Uso de antibióticos']
        },
        'sistema imunológico': {
          indicacoes: ['Vitamina C', 'Vitamina D3', 'Zinco', 'Equinácea', 'Própolis'],
          posologia: ['Vit C: 1000-2000mg/dia', 'Vit D3: 2000-5000 UI/dia', 'Zinco: 15-30mg/dia'],
          causas: ['Estresse crônico', 'Sono inadequado', 'Má alimentação', 'Falta de exercícios']
        },
        'tireoide': {
          indicacoes: ['Iodo', 'Selênio', 'Zinco', 'Vitamina D', 'Ashwagandha'],
          posologia: ['Selênio: 200mcg/dia', 'Iodo: 150-300mcg/dia', 'Zinco: 15mg/dia'],
          causas: ['Deficiência de iodo', 'Estresse', 'Autoimunidade', 'Toxinas ambientais']
        },
        'inflamação': {
          indicacoes: ['Curcúma', 'Ômega-3', 'Gengibre', 'Boswellia', 'Quercetina'],
          posologia: ['Curcúma: 500-1000mg 2x/dia', 'Ômega-3: 2000mg/dia'],
          causas: ['Dieta inflamatória', 'Estresse', 'Falta de sono', 'Toxinas', 'Infecções']
        },
        'estresse': {
          indicacoes: ['Ashwagandha', 'Rhodiola', 'Magnésio', 'GABA', 'L-teanina'],
          posologia: ['Ashwagandha: 300-600mg 2x/dia', 'Magnésio: 400mg antes de dormir'],
          causas: ['Sobrecarga de trabalho', 'Problemas emocionais', 'Falta de sono', 'Desequilíbrio hormonal']
        },
        'energia': {
          indicacoes: ['Coenzima Q10', 'Vitaminas do complexo B', 'Ferro', 'Ginseng', 'Maca peruana'],
          posologia: ['CoQ10: 100-200mg/dia', 'Complexo B: 1 cápsula/dia', 'Ferro: conforme deficiência'],
          causas: ['Anemia', 'Hipotireoidismo', 'Falta de sono', 'Deficiências nutricionais', 'Estresse']
        },
        'intestino': {
          indicacoes: ['Probóticos', 'L-glutamina', 'Fibras', 'Aloe vera', 'Óleo de coco'],
          posologia: ['Probóticos: 10-50 bilhões UFC/dia', 'L-glutamina: 5-10g/dia'],
          causas: ['Dieta pobre em fibras', 'Uso de antibióticos', 'Estresse', 'Intoxicação alimentar']
        }
      };

      // Buscar correspondências na base de conhecimento
      Object.keys(knowledgeBase).forEach(keyword => {
        if (paramLower.includes(keyword)) {
          const kb = knowledgeBase[keyword];
          if (kb.indicacoes) info.indicacoes.push(...kb.indicacoes);
          if (kb.posologia) info.posologia.push(...kb.posologia);
          if (kb.causas) info.causas.push(...kb.causas);
          if (kb.observacoes) info.observacoes.push(...kb.observacoes);
          if (kb.dosagem) info.dosagem.push(...kb.dosagem);
        }
      });

      // Buscar seções relacionadas ao parâmetro EM TODO O DOCUMENTO
      // Primeira passagem: contexto próximo (linhas vizinhas)
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].toLowerCase();
        
        if (line.includes(paramLower)) {
          // Capturar contexto próximo (20 linhas antes e 80 depois)
          const startIdx = Math.max(0, i - 20);
          const endIdx = Math.min(lines.length, i + 80);
          const context = lines.slice(startIdx, endIdx).join(' ');
          
          // Extrair com todos os padrões já definidos
          extractPatternsFromContext(context, info);
        }
      }
      
      // Segunda passagem: buscar termos relacionados em TODO o documento
      const fullText = guideText.toLowerCase();
      const relatedTerms = generateRelatedTerms(paramLower);
      
      relatedTerms.forEach(term => {
        if (fullText.includes(term)) {
          // Encontrar todas as ocorrências do termo
          const regex = new RegExp(`[^.\n]{0,100}${term}[^.\n]{0,200}`, 'gi');
          const matches = guideText.match(regex);
          
          if (matches) {
            matches.forEach(match => {
              extractPatternsFromContext(match, info);
            });
          }
        }
      });

      // Remover duplicatas e limpar
      Object.keys(info).forEach(key => {
        info[key] = [...new Set(info[key])]
          .map(item => item.trim())
          .map(item => item.replace(/\s+/g, ' ')) // Normalizar espaços
          .filter(item => item.length > 3 && item.length < 800) // Validar tamanho razoável
          .filter(item => !item.match(/^[:\s.,;-]+$/)) // Remover apenas pontuação
          .slice(0, 15); // Aumentado de 10 para 15 itens por categoria
      });

      return Object.values(info).some(arr => arr.length > 0) ? info : null;
    } catch (error) {
      console.error('Erro ao extrair info do guia:', error);
      return null;
    }
  };
  
  // Carregar dados da anamnese se estiver editando
  useEffect(() => {
    if (id) {
      const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const anamneseToEdit = anamneses.find(a => String(a.id) === String(id));
      
      if (anamneseToEdit) {
        setFormData(anamneseToEdit);
        if (anamneseToEdit.q09_estado) {
          setSelectedEstado(anamneseToEdit.q09_estado);
        }
        // Carregar sintomas e carências se existirem
        if (anamneseToEdit.q17a_sintomas_selecionados) {
          setSintomasSelecionados(anamneseToEdit.q17a_sintomas_selecionados);
          if (anamneseToEdit.q17b_carencias_identificadas) {
            setCarenciasIdentificadas(anamneseToEdit.q17b_carencias_identificadas);
          } else {
            // Reprocessar carências se não existirem
            const carencias = buscarMultiplasCarencias(anamneseToEdit.q17a_sintomas_selecionados);
            setCarenciasIdentificadas(carencias);
          }
        }
        // Registrar paciente atual para uso em outras páginas
        localStorage.setItem('currentPatientId', String(id));
      }
    } else if (pendingPatientIdRef.current) {
      // Novo paciente: registrar ID temporário para que protocolos possam ser salvos
      localStorage.setItem('currentPatientId', pendingPatientIdRef.current);
    }
  }, [id]);

  // Interceptar fechamento da janela/aba ou navegação
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'Você tem alterações não salvas. Deseja realmente sair?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  // Carregar cidades baseado no estado
  useEffect(() => {
    if (selectedEstado) {
      setCidades(ESTADOS_CIDADES[selectedEstado] || []);
    } else {
      setCidades([]);
    }
  }, [selectedEstado]);

  // Carregar dados da anamnese se estiver editando
  useEffect(() => {
    if (id) {
      const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const anamneseToEdit = anamneses.find(a => String(a.id) === String(id));
      
      if (anamneseToEdit) {
        setFormData(anamneseToEdit);
        if (anamneseToEdit.q09_estado) {
          setSelectedEstado(anamneseToEdit.q09_estado);
        }
      }
    }
  }, [id]);

  // Função para calcular idade a partir da data de nascimento
  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    
    const today = new Date();
    const birth = new Date(birthDate);
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    // Ajusta se ainda não fez aniversário este ano
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age >= 0 ? age : '';
  };

  const handleChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Calcula idade automaticamente quando a data de nascimento muda
      if (field === 'q02_data_nasc') {
        updated.q03_idade = calculateAge(value);
      }
      
      return updated;
    });
    
    // Marcar todas as seções como não salvas ao fazer alteração
    setSavedSections({});
    setMainButtonSaved(false);
    setHasUnsavedChanges(true);
  };

  // Estável entre renders para evitar re-renders desnecessários no questionário
  const handleComprehensiveChange = useCallback((data) => {
    setFormData(prev => ({ ...prev, comprehensiveHealthData: data }));
    setSavedSections({});
    setMainButtonSaved(false);
    setHasUnsavedChanges(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEstadoChange = (value) => {
    setSelectedEstado(value);
    handleChange('q09_estado', value);
    handleChange('q08_cidade', ''); // Limpa cidade ao mudar estado
  };

  // Função para lidar com seleção de sintomas
  const handleSintomaToggle = (sintomaId) => {
    setSintomasSelecionados(prev => {
      const isSelected = prev.includes(sintomaId);
      const newSelection = isSelected 
        ? prev.filter(id => id !== sintomaId)
        : [...prev, sintomaId];
      
      // Atualizar carências identificadas baseado na nova seleção
      const carencias = buscarMultiplasCarencias(newSelection);
      setCarenciasIdentificadas(carencias);
      
      // Salvar no formData
      handleChange('q17a_sintomas_selecionados', newSelection);
      handleChange('q17b_carencias_identificadas', carencias);
      
      return newSelection;
    });
  };

  const handleSaveSection = (sectionName) => {
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    
    // Sincronizar sintomas e carências com formData antes de salvar
    if (sectionName === 'sintomas_carencias') {
      formData.q17a_sintomas_selecionados = sintomasSelecionados;
      formData.q17b_carencias_identificadas = carenciasIdentificadas;
    }
    
    if (id) {
      // Modo edição: atualizar anamnese existente
      const index = anamneses.findIndex(a => String(a.id) === String(id));
      if (index !== -1) {
        anamneses[index] = {
          ...formData,
          id: anamneses[index].id,
          createdAt: anamneses[index].createdAt,
          updatedAt: new Date().toISOString(),
        };
        if (!safeSaveAnamneses(anamneses)) {
          alert('Erro: armazenamento local está cheio. Alguns dados grandes foram removidos para salvar a anamnese. Considere exportar ou limpar dados antigos.');
        }
        try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: { id } })); } catch (e) { /* ignore */ }
        setSavedSections(prev => ({ ...prev, [sectionName]: true }));
      }
    } else {
      // Modo criação: adicionar nova anamnese
      const existingId = formData.id || Date.now();
      const existingIndex = anamneses.findIndex(a => a.id === existingId);
      
      const anamneseData = {
        ...formData,
        id: existingId,
        createdAt: formData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      if (existingIndex !== -1) {
        anamneses[existingIndex] = anamneseData;
      } else {
        anamneses.push(anamneseData);
      }
      
      setFormData(anamneseData);
      if (!safeSaveAnamneses(anamneses)) {
        alert('Erro: armazenamento local está cheio. Alguns dados grandes foram removidos para salvar a anamnese. Considere exportar ou limpar dados antigos.');
      }
      try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: anamneseData })); } catch (e) { /* ignore */ }
      setSavedSections(prev => ({ ...prev, [sectionName]: true }));
      setHasUnsavedChanges(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    
    // Sincronizar sintomas e carências com formData antes de salvar
    const updatedFormData = {
      ...formData,
      q17a_sintomas_selecionados: sintomasSelecionados,
      q17b_carencias_identificadas: carenciasIdentificadas,
    };
    
    // Consolidar tratamentos avançados antes de salvar
    const consolidatedTherapies = [];
    if (updatedFormData.tratamentosHomeopatia && updatedFormData.tratamentosHomeopatia.length > 0) {
      consolidatedTherapies.push(...updatedFormData.tratamentosHomeopatia);
    }
    if (updatedFormData.tratamentosAromaterapia && updatedFormData.tratamentosAromaterapia.length > 0) {
      consolidatedTherapies.push(...updatedFormData.tratamentosAromaterapia);
    }
    if (updatedFormData.tratamentosOleosEssenciais && updatedFormData.tratamentosOleosEssenciais.length > 0) {
      consolidatedTherapies.push(...updatedFormData.tratamentosOleosEssenciais);
    }
    
    const dataToSave = {
      ...updatedFormData,
      advancedTherapiesData: consolidatedTherapies.length > 0 ? consolidatedTherapies : updatedFormData.advancedTherapiesData
    };
    
    if (id) {
      // Modo edição: atualizar anamnese existente
      const index = anamneses.findIndex(a => String(a.id) === String(id));
      if (index !== -1) {
        anamneses[index] = {
          ...dataToSave,
          id: anamneses[index].id,
          createdAt: anamneses[index].createdAt,
          updatedAt: new Date().toISOString(),
        };
        await updateAnamnese(id, anamneses[index]);
        if (!safeSaveAnamneses(anamneses)) {
          alert('Erro: armazenamento local está cheio. Alguns dados grandes foram removidos para salvar a anamnese. Considere exportar ou limpar dados antigos.');
        }
        try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: anamneses[index] })); } catch (e) { /* ignore */ }
        
        // Marcar todas as seções como salvas
        setSavedSections({
          identificacao: true,
          queixa: true,
          questionario_saude: true,
          sintomas_carencias: true,
          historico_familiar: true,
          historico_pessoal: true,
          habitos: true,
          alimentacao: true,
          sono: true,
          sistema_digestivo: true,
          sistema_urinario: true,
          sintomas_gerais: true,
          bioressonancia: true,
          iridologia: true,
          sinais_vitais: true,
          checklist_clinico: true
        });
        setMainButtonSaved(true);
        setHasUnsavedChanges(false);
        
      alert('Anamnese atualizada com sucesso!');
      }
    } else {
      // Modo criação: adicionar nova anamnese (reusar pendingPatientId para manter protocolos salvos)
      const newAnamnese = {
        ...dataToSave,
        id: pendingPatientIdRef.current ? Number(pendingPatientIdRef.current) : Date.now(),
        createdAt: new Date().toISOString(),
      };
      const savedAnamnese = await createAnamnese(newAnamnese);
      const existingIndex = anamneses.findIndex(a => String(a.id) === String(savedAnamnese.id));
      if (existingIndex !== -1) anamneses[existingIndex] = savedAnamnese;
      else anamneses.push(savedAnamnese);
      if (!safeSaveAnamneses(anamneses)) {
        alert('Erro: armazenamento local está cheio. Alguns dados grandes foram removidos para salvar a anamnese. Considere exportar ou limpar dados antigos.');
      }
      try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: savedAnamnese })); } catch (e) { /* ignore */ }
      
      // Marcar todas as seções como salvas
      setSavedSections({
        identificacao: true,
        queixa: true,
        questionario_saude: true,
        sintomas_carencias: true,
        historico_familiar: true,
        historico_pessoal: true,
        habitos: true,
        alimentacao: true,
        sono: true,
        sistema_digestivo: true,
        sistema_urinario: true,
        sintomas_gerais: true,
        bioressonancia: true,
        iridologia: true,
        sinais_vitais: true,
        checklist_clinico: true
      });
      setMainButtonSaved(true);
      setHasUnsavedChanges(false);
      
      alert('Anamnese salva com sucesso!');
    }
    
    setHasUnsavedChanges(false);
    navigate(navigateAfterSave);
  };

  const handleClear = () => {
    setFormData({
      q01_nome: '', q02_data_nasc: '', q03_idade: '', q04_sexo: '', q05_estado_civil: '',
      q06_profissao: '', q07_endereco: '', q08_cidade: '', q09_estado: '', q10_cep: '',
      q11_telefone: '', q12_email: '', q13_rg: '', q14_cpf: '', 
      q14_tipo_consulta: '1ª Consulta',
      q14_data_retorno: '', q14_data_retorno_2: '', q14_data_retorno_3: '', q14_data_retorno_4: '',
      q14_comparecimento_confirmado: false, q14_historico_comparecimentos: [],
      q15_queixa_principal: '',
      q16_tempo_problema: '', q17_tratamentos_anteriores: '', q18_doencas_familia: '',
      q19_pais_vivos: '', q20_doencas_pais: '', q21_cirurgias: '', q22_hospitalizacoes: '',
      q23_alergias: '', q24_medicamentos_uso: '', q25_doencas_cronicas: '', q26_tabagismo: '',
      q27_etilismo: '', q28_atividade_fisica: '', q29_frequencia_exercicio: '', q30_cafe_manha: '',
      q31_almoco: '', q32_jantar: '', q33_lanches: '', q34_agua_dia: '',
      q35_restricoes_alimentares: '', q36_horas_sono: '', q37_qualidade_sono: '',
      q38_acorda_noite: '', q39_intestino: '', q40_gases: '', q41_azia: '', q42_nauseas: '',
      q43_urina_frequencia: '', q44_cor_urina: '', q45_ardor_urinar: '', q46_dores: '',
      q47_cansaco: '', q48_estresse: '', q49_ansiedade: '', q50_observacoes: '',
      iridologyAnalysis: null,
      vitalSignsAnalysis: null,
      clinicalSignsChecklist: null,
      biorresonanciaBarraFile: null,
      biorresonanciaBarraAnalysis: '',
      biorresonanciaAuricularFile: null,
      biorresonanciaAuricularAnalysis: '',
    });
    setSelectedEstado('');
    setHasUnsavedChanges(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!formData.q01_nome) {
      alert('Por favor, preencha pelo menos o nome do paciente antes de gerar o PDF.');
      return;
    }

    try {
      const bodyHtml = buildAnamneseBodyHtml(formData);
      const qr = formData.id ? `${window.location.origin}/anamnese/${formData.id}` : '';
      const qrUrl = qr ? await generateQrDataUrl(qr) : '';
      const html = await buildLetterheadHtml({ 
        title: 'Anamnese Integrativa Completa', 
        bodyHtml, 
        qrUrl 
      });
      const fileName = `anamnese_${(formData.q01_nome || 'paciente').replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      await downloadPdfFromHtml(html, fileName);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tentando impressão direta...');
      window.print();
    }
  };



  const handleOpenSheet = (url) => {
    window.open(url, '_blank');
  };

  const handleImportSheet = (exportCsv) => {
    navigate(`/data-import?importUrl=${encodeURIComponent(exportCsv)}`);
  };

  const handleBiorresonanciaBarraUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingBarra(true);
    
    try {
      // Salvar informações do arquivo
      const fileInfo = {
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString()
      };
      
      handleChange('biorresonanciaBarraFile', fileInfo);

      // Salvar arquivo PDF para análise posterior
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        try {
          console.log('📄 Arquivo PDF carregado:', file.name);
          
          // Armazenar o arquivo para análise com botão
          handleChange('biorresonanciaBarraPdfFile', file);
          
          alert(`✅ Arquivo carregado!\n\nClique no botão "Fazer Análise" para processar os resultados.`);
        } catch (pdfError) {
          console.error('Erro ao processar PDF:', pdfError);
          
          // Fallback para análise básica
          const basicAnalysis = `Arquivo carregado: ${file.name}\n` +
                              `Tipo: Biorressonância I (BARRA)\n` +
                              `Tamanho: ${(file.size / 1024).toFixed(2)} KB\n` +
                              `Data: ${new Date().toLocaleString('pt-BR')}\n\n` +
                              `⚠️ Não foi possível extrair os dados automaticamente.\n` +
                              `Erro: ${pdfError.message}\n\n` +
                              `O arquivo foi salvo mas a análise automática falhou.`;
          
          handleChange('biorresonanciaBarraAnalysis', basicAnalysis);
          alert('Arquivo carregado, mas não foi possível extrair os dados automaticamente. Verifique o formato do PDF.');
        }
      } else {
        // Para arquivos não-PDF (TXT, CSV, etc)
        const reader = new FileReader();
        reader.onload = async (e) => {
          const content = e.target.result;
          
          // Análise básica
          const analysis = `Arquivo carregado: ${file.name}\n` +
                          `Tipo: Biorressonância I (BARRA)\n` +
                          `Tamanho: ${(file.size / 1024).toFixed(2)} KB\n` +
                          `Data: ${new Date().toLocaleString('pt-BR')}\n\n` +
                          `Conteúdo (primeiros 500 caracteres):\n${content.substring(0, 500)}...`;
          
          handleChange('biorresonanciaBarraAnalysis', analysis);
        };
        
        reader.readAsText(file);
        alert('Resultado de Biorressonância I (BARRA) carregado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao carregar arquivo:', error);
      alert('Erro ao carregar arquivo. Tente novamente.');
    } finally {
      setUploadingBarra(false);
    }
  };

  const handleBiorresonanciaAuricularUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingAuricular(true);
    
    try {
      // Salvar informações do arquivo
      const fileInfo = {
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString()
      };
      
      handleChange('biorresonanciaAuricularFile', fileInfo);

      // Salvar arquivo PDF para análise posterior
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        try {
          console.log('📄 Arquivo PDF carregado:', file.name);
          
          // Armazenar o arquivo para análise com botão
          handleChange('biorresonanciaAuricularPdfFile', file);
          
          alert(`✅ Arquivo carregado!\n\nClique no botão "Fazer Análise" para processar os resultados.`);
          
          // Categorizar por sistemas
          const categorized = categorizeParametersBySystem(parsedResults.parameters);
          console.log('✅ Categorização concluída');
          
          // Gerar resumo
          const summary = generateResultsSummary(parsedResults);
          console.log('✅ Resumo gerado');
          
          // Salvar resultados parseados
          handleChange('biorresonanciaAuricularParsedResults', parsedResults);
          handleChange('biorresonanciaAuricularCategorized', categorized);
          handleChange('biorresonanciaAuricularAnalysis', summary);
          
          alert(`✅ PDF processado com sucesso!\n\n📊 ${parsedResults.parameters.length} parâmetros identificados\n\nOs resultados aparecem logo abaixo do upload.`);
          
          alert(`✅ PDF processado com sucesso!\n\n${parsedResults.parameters.length} parâmetros identificados.`);
        } catch (pdfError) {
          console.error('Erro ao processar PDF:', pdfError);
          
          // Fallback para análise básica
          const basicAnalysis = `Arquivo carregado: ${file.name}\n` +
                              `Tipo: Biorressonância II (AURICULAR)\n` +
                              `Tamanho: ${(file.size / 1024).toFixed(2)} KB\n` +
                              `Data: ${new Date().toLocaleString('pt-BR')}\n\n` +
                              `⚠️ Não foi possível extrair os dados automaticamente.\n` +
                              `Erro: ${pdfError.message}\n\n` +
                              `O arquivo foi salvo mas a análise automática falhou.`;
          
          handleChange('biorresonanciaAuricularAnalysis', basicAnalysis);
          alert('Arquivo carregado, mas não foi possível extrair os dados automaticamente. Verifique o formato do PDF.');
        }
      } else {
        // Para arquivos não-PDF (TXT, CSV, etc)
        const reader = new FileReader();
        reader.onload = async (e) => {
          const content = e.target.result;
          
          // Análise básica
          const analysis = `Arquivo carregado: ${file.name}\n` +
                          `Tipo: Biorressonância II (AURICULAR)\n` +
                          `Tamanho: ${(file.size / 1024).toFixed(2)} KB\n` +
                          `Data: ${new Date().toLocaleString('pt-BR')}\n\n` +
                          `Conteúdo (primeiros 500 caracteres):\n${content.substring(0, 500)}...`;
          
          handleChange('biorresonanciaAuricularAnalysis', analysis);
        };
        
        reader.readAsText(file);
        alert('Resultado de Biorressonância II (AURICULAR) carregado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao carregar arquivo:', error);
      alert('Erro ao carregar arquivo. Tente novamente.');
    } finally {
      setUploadingAuricular(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          {personalOnly
            ? (id ? 'Editar Dados Pessoais do Interagente' : 'Novo Interagente — Dados Pessoais')
            : triagem
              ? (id ? 'Triagem Clínica — Editar' : 'Nova Triagem Clínica')
              : (id ? 'Editar Anamnese Integrativa' : 'Nova Anamnese Integrativa')}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {personalOnly
            ? 'Atualize os dados cadastrais e pessoais do interagente'
            : (id ? 'Atualize os campos necessários da avaliação do paciente' : 'Preencha todos os campos necessários para uma avaliação completa do paciente')}
        </Typography>

        {!personalOnly && (
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="button"
              variant="contained"
              color="info"
              startIcon={<ScienceIcon />}
              onClick={() => {
                if (!id) return;
                localStorage.setItem('currentPatientId', String(id));
                navigate(`/anamnese-subclinico/${id}`);
              }}
              disabled={!id}
              title={id ? 'Abrir Anamnese Subclínico deste paciente' : 'Salve a anamnese para liberar o Subclínico'}
            >
              Abrir Subclínico
            </Button>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          {/* Identificação - PRIMEIRO */}
          <Box sx={{ mb: 4, p: 3, borderRadius: 2, backgroundColor: '#e3f2fd', border: '2px solid #1976d2' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 600 }}>
              📋 Identificação
            </Typography>
            <Divider sx={{ mb: 2, borderColor: '#1976d2' }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Nome Completo *"
                  value={formData.q01_nome}
                  onChange={(e) => handleChange('q01_nome', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="date"
                  label="Data de Nascimento *"
                  InputLabelProps={{ shrink: true }}
                  value={formData.q02_data_nasc}
                  onChange={(e) => handleChange('q02_data_nasc', e.target.value)}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Idade"
                  type="number"
                  value={formData.q03_idade}
                  disabled
                  InputProps={{
                    readOnly: true,
                  }}
                  helperText="Calculado automaticamente"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Sexo</InputLabel>
                  <Select
                    value={formData.q04_sexo}
                    label="Sexo"
                    onChange={(e) => handleChange('q04_sexo', e.target.value)}
                  >
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Feminino">Feminino</MenuItem>
                    <MenuItem value="Outro">Outro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Estado Civil</InputLabel>
                  <Select
                    value={formData.q05_estado_civil}
                    label="Estado Civil"
                    onChange={(e) => handleChange('q05_estado_civil', e.target.value)}
                  >
                    <MenuItem value="Solteiro(a)">Solteiro(a)</MenuItem>
                    <MenuItem value="Casado(a)">Casado(a)</MenuItem>
                    <MenuItem value="Divorciado(a)">Divorciado(a)</MenuItem>
                    <MenuItem value="Viúvo(a)">Viúvo(a)</MenuItem>
                    <MenuItem value="União Estável">União Estável</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Profissão"
                  value={formData.q06_profissao}
                  onChange={(e) => handleChange('q06_profissao', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Endereço"
                  value={formData.q07_endereco}
                  onChange={(e) => handleChange('q07_endereco', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="CEP"
                  value={formData.q10_cep}
                  onChange={(e) => handleChange('q10_cep', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    value={selectedEstado}
                    label="Estado"
                    onChange={(e) => handleEstadoChange(e.target.value)}
                  >
                    {Object.keys(ESTADOS_CIDADES).map(uf => (
                      <MenuItem key={uf} value={uf}>{uf}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5}>
                <FormControl fullWidth disabled={!selectedEstado}>
                  <InputLabel>Cidade</InputLabel>
                  <Select
                    value={formData.q08_cidade}
                    label="Cidade"
                    onChange={(e) => handleChange('q08_cidade', e.target.value)}
                  >
                    {selectedEstado && ESTADOS_CIDADES[selectedEstado]?.map(cidade => (
                      <MenuItem key={cidade} value={cidade}>{cidade}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Telefone"
                  value={formData.q11_telefone}
                  onChange={(e) => handleChange('q11_telefone', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="E-mail"
                  type="email"
                  value={formData.q12_email}
                  onChange={(e) => handleChange('q12_email', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="RG"
                  value={formData.q13_rg}
                  onChange={(e) => handleChange('q13_rg', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="CPF"
                  value={formData.q14_cpf}
                  onChange={(e) => handleChange('q14_cpf', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#1976d2' }}>
                  📅 Tipo de Consulta e Datas de Retorno
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de Consulta *</InputLabel>
                  <Select
                    value={formData.q14_tipo_consulta}
                    label="Tipo de Consulta *"
                    onChange={(e) => handleChange('q14_tipo_consulta', e.target.value)}
                    required
                  >
                    <MenuItem value="1ª Consulta">✓ 1ª Consulta</MenuItem>
                    <MenuItem value="Retorno 1">✓ Retorno 1</MenuItem>
                    <MenuItem value="Retorno 2">✓ Retorno 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={2.2}>
                <TextField
                  fullWidth
                  type="date"
                  label="Retorno 1"
                  InputLabelProps={{ shrink: true }}
                  value={formData.q14_data_retorno}
                  onChange={(e) => handleChange('q14_data_retorno', e.target.value)}
                  size="small"
                />
              </Grid>
              
              <Grid item xs={12} md={2.2}>
                <TextField
                  fullWidth
                  type="date"
                  label="Retorno 2"
                  InputLabelProps={{ shrink: true }}
                  value={formData.q14_data_retorno_2}
                  onChange={(e) => handleChange('q14_data_retorno_2', e.target.value)}
                  size="small"
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={() => handleSaveSection('identificacao')}
                sx={{
                  bgcolor: savedSections.identificacao ? '#4caf50' : '#1976d2',
                  '&:hover': {
                    bgcolor: savedSections.identificacao ? '#45a049' : '#1565c0',
                  }
                }}
              >
                {savedSections.identificacao ? '✓ Salvo' : 'Salvar'}
              </Button>
            </Box>
          </Box>

          {/* Botões de Planilhas e Seções Clínicas — apenas na visão completa/triagem */}
          {!personalOnly && (<>

          {/* Botões de Planilhas */}
          <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }} aria-label="planilhas-panel">
            {SPREADSHEETS.map((sheet, index) => (
              <Button
                key={index}
                variant="outlined"
                startIcon={<OpenInNewIcon />}
                onClick={() => handleOpenSheet(sheet.url)}
                sx={{ 
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2
                }}
                aria-label={`open-sheet-${index}`}
              >
                {sheet.label}
              </Button>
            ))}
          </Box>

          {/* 2º - Sintomas Gerais */}
          <ComprehensiveHealthQuestionnaire
            value={formData.comprehensiveHealthData}
            includeSections={['sintomas_gerais']}
            onChange={handleComprehensiveChange}
            patientId={id || String(formData?.id || '') || pendingPatientIdRef.current || ''}
          />

          {/* Sintomas e Carências Nutricionais - NOVO QUADRO */}
          <Box sx={{ mb: 4, p: 3, borderRadius: 2, backgroundColor: '#e8eaf6', border: '2px solid #3f51b5' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#3f51b5', fontWeight: 600 }}>
              💊 Sintomas e Carências Nutricionais
            </Typography>
            <Divider sx={{ mb: 2, borderColor: '#3f51b5' }} />
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Selecione os sintomas apresentados pelo paciente. O sistema identificará automaticamente as possíveis carências nutricionais e suas dosagens terapêuticas.
            </Typography>

            {/* Lista de sintomas selecionáveis */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Selecione os sintomas:
              </Typography>
              <Grid container spacing={1}>
                {sintomasCarencias.map((sintoma) => (
                  <Grid item xs={12} sm={6} md={4} key={sintoma.id}>
                    <Box
                      onClick={() => handleSintomaToggle(sintoma.id)}
                      sx={{
                        p: 1.5,
                        border: '2px solid',
                        borderColor: sintomasSelecionados.includes(sintoma.id) ? '#3f51b5' : '#e0e0e0',
                        backgroundColor: sintomasSelecionados.includes(sintoma.id) ? '#e8eaf6' : '#ffffff',
                        borderRadius: 1,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: '#3f51b5',
                          backgroundColor: '#f5f5f5'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Box
                          sx={{
                            minWidth: 20,
                            minHeight: 20,
                            width: 20,
                            height: 20,
                            border: '2px solid',
                            borderColor: sintomasSelecionados.includes(sintoma.id) ? '#3f51b5' : '#9e9e9e',
                            backgroundColor: sintomasSelecionados.includes(sintoma.id) ? '#3f51b5' : 'transparent',
                            borderRadius: '4px',
                            mr: 1,
                            mt: 0.2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {sintomasSelecionados.includes(sintoma.id) && (
                            <Typography sx={{ color: 'white', fontSize: '14px', lineHeight: 1 }}>✓</Typography>
                          )}
                        </Box>
                        <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                          {sintoma.sintoma}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Resultados das carências identificadas */}
            {carenciasIdentificadas.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#d32f2f' }}>
                  ⚕️ Carências Nutricionais Identificadas:
                </Typography>
                
                {carenciasIdentificadas.map((sintomaData, index) => (
                  <Box key={index} sx={{ mb: 3, p: 2, backgroundColor: '#fff', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#1976d2' }}>
                      {sintomaData.sintoma}
                    </Typography>
                    
                    {sintomaData.carencias.map((carencia, idx) => (
                      <Box key={idx} sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#2e7d32', mb: 1 }}>
                          {carencia.nutriente}
                        </Typography>
                        
                        <Box sx={{ pl: 2 }}>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Posologia:</strong> {carencia.posologia}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 0.5, color: '#d32f2f' }}>
                            <strong>Dosagem máxima:</strong> {carencia.dosagem_maxima}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                            <strong>Observações:</strong> {carencia.observacoes}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            )}

            {/* Mensagem quando nenhum sintoma selecionado */}
            {sintomasSelecionados.length === 0 && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Selecione um ou mais sintomas acima para identificar as possíveis carências nutricionais e suas dosagens terapêuticas.
              </Alert>
            )}

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSaveSection('sintomas_carencias')}
                  sx={{
                    bgcolor: savedSections.sintomas_carencias ? '#4caf50' : '#1976d2',
                    '&:hover': {
                      bgcolor: savedSections.sintomas_carencias ? '#45a049' : '#1565c0',
                    }
                  }}
                >
                  {savedSections.sintomas_carencias ? '✓ Salvo' : 'Salvar'}
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* 4º - Análise de Sinais Vitais e Medidas Corporais */}
          <VitalSignsAnalysis
            showIridologyGuide={false}
            onAnalysisComplete={(analysis) => {
              setFormData(prev => ({ ...prev, vitalSignsAnalysis: analysis }));
            }}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => handleSaveSection('sinais_vitais')}
              sx={{
                bgcolor: savedSections.sinais_vitais ? '#4caf50' : '#1976d2',
                '&:hover': {
                  bgcolor: savedSections.sinais_vitais ? '#45a049' : '#1565c0',
                }
              }}
            >
              {savedSections.sinais_vitais ? '✓ Salvo' : 'Salvar'}
            </Button>
          </Box>

          {/* 5º - Checklist de Sinais Clínicos */}
          <ClinicalSignsChecklistForm
            bloodType={formData.q08_tipo_sanguineo}
            onAnalysisComplete={(analysis) => {
              setFormData(prev => ({ ...prev, clinicalSignsChecklist: analysis }));
            }}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => handleSaveSection('checklist_clinico')}
              sx={{
                bgcolor: savedSections.checklist_clinico ? '#4caf50' : '#1976d2',
                '&:hover': {
                  bgcolor: savedSections.checklist_clinico ? '#45a049' : '#1565c0',
                }
              }}
            >
              {savedSections.checklist_clinico ? '✓ Salvo' : 'Salvar'}
            </Button>
          </Box>

          {/* 6º ao 12º - Histórico e Sistemas */}
          <Typography variant="h5" gutterBottom sx={{ color: '#0d47a1', fontWeight: 700, mb: 3, mt: 4 }}>
            📋 Questionário Abrangente de Saúde
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: '#555' }}>
            Preencha os quadros de histórico e sistemas clínicos para completar a avaliação integrativa.
          </Typography>

          <ComprehensiveHealthQuestionnaire
            value={formData.comprehensiveHealthData}
            includeSections={[
              'historico_familiar',
              'historico_pessoal',
              'habitos_vida',
              'alimentacao',
              'sono_repouso',
              'sistema_digestorio',
              'sistema_urinario'
            ]}
            patientId={id || String(formData?.id || '') || pendingPatientIdRef.current || ''}
            onChange={(responses) => {
              handleChange('comprehensiveHealthData', responses);
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              onClick={() => handleSaveSection('questionario_saude')}
              sx={{
                bgcolor: savedSections.questionario_saude ? '#4caf50' : '#1976d2',
                '&:hover': {
                  bgcolor: savedSections.questionario_saude ? '#45a049' : '#1565c0',
                },
                fontWeight: 600
              }}
            >
              {savedSections.questionario_saude ? '✓ Questionário e Protocolos Salvos' : 'Salvar Questionário e Protocolos'}
            </Button>
          </Box>

          {/* 13º - Observações Adicionais */}
          <Box sx={{ mb: 4, p: 3, borderRadius: 2, backgroundColor: '#fbe9e7', border: '2px solid #e64a19' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#e64a19', fontWeight: 600 }}>
              💭 Observações Adicionais
            </Typography>
            <Divider sx={{ mb: 2, borderColor: '#e64a19' }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Observações adicionais"
                  placeholder="Anote qualquer informação adicional que considere relevante sobre o paciente..."
                  value={formData.q50_observacoes}
                  onChange={(e) => handleChange('q50_observacoes', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSaveSection('observacoes')}
                  sx={{
                    bgcolor: savedSections.observacoes ? '#4caf50' : '#1976d2',
                    '&:hover': {
                      bgcolor: savedSections.observacoes ? '#45a049' : '#1565c0',
                    }
                  }}
                >
                  {savedSections.observacoes ? '✓ Salvo' : 'Salvar'}
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* 14º - Sequência Iridológica Integrada aos Sinais Vitais */}
          <IridologySequenceGuide title="Sequência Iridológica Integrada aos Sinais Vitais" />

          </>)} {/* fim !personalOnly */}

          {/* Botões de Ação */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 4 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {!personalOnly && (
                <>
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    startIcon={<PrintIcon />}
                    onClick={handlePrint}
                    disabled={!formData.q01_nome}
                    title="Imprimir anamnese completa"
                  >
                    Imprimir
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownloadPdf}
                    disabled={!formData.q01_nome}
                    title="Baixar PDF com todos os dados da anamnese"
                  >
                    Download PDF
                  </Button>
                </>
              )}
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="button"
                variant="outlined"
                color="error"
                startIcon={<ClearIcon />}
                onClick={handleClear}
              >
                Limpar Formulário
              </Button>
              {!personalOnly && (
                <Button
                  type="button"
                  variant="outlined"
                  color="info"
                  startIcon={<ScienceIcon />}
                  onClick={() => {
                    if (!id) return;
                    localStorage.setItem('currentPatientId', String(id));
                    navigate(`/anamnese-subclinico/${id}`);
                  }}
                  disabled={!id}
                  title={id ? 'Abrir Anamnese Subclínico deste paciente' : 'Salve a anamnese para liberar o Subclínico'}
                >
                  Abrir Subclínico
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                sx={{
                  bgcolor: mainButtonSaved ? '#4caf50' : '#1976d2',
                  '&:hover': {
                    bgcolor: mainButtonSaved ? '#45a049' : '#1565c0',
                  }
                }}
              >
                {mainButtonSaved
                  ? (personalOnly ? '✓ Dados Salvos' : '✓ Anamnese Salva')
                  : (personalOnly
                      ? (id ? 'Atualizar Dados Pessoais' : 'Salvar Dados Pessoais')
                      : (id ? 'Atualizar Anamnese' : 'Salvar Anamnese'))}
              </Button>
            </Box>
          </Box>

          {/* SEÇÃO DE CONSOLIDAÇÃO DE INDICAÇÕES E ORIENTAÇÕES — apenas na visão completa/triagem, após salvar */}
          {!personalOnly && formData.q01_nome && mainButtonSaved && (
            <Paper 
              elevation={4} 
              sx={{ 
                mt: 6, 
                p: 4, 
                background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                color: 'white',
                borderRadius: 3
              }}
            >
              <Typography 
                variant="h4" 
                align="center" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  mb: 4
                }}
              >
                🌿 SUGESTÕES TERAPÊUTICAS
              </Typography>
              
              <Typography variant="h6" align="center" sx={{ mb: 4, opacity: 0.95 }}>
                Resumo de Indicações Integrativas com base na Anamnese
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<PrintIcon />}
                  onClick={() => {
                    const el = document.getElementById('sugestoes-terapeuticas-print');
                    if (!el) return;
                    const win = window.open('', '_blank');
                    win.document.write(`<!doctype html><html><head><meta charset="utf-8"/><title>Sugestões Terapêuticas — ${formData.q01_nome}</title><style>body{font-family:Georgia,serif;font-size:11.5px;color:#111;padding:20px;max-width:800px;margin:0 auto;}h1,h2,h3,h4,h5,h6{margin:.5em 0;}table{border-collapse:collapse;width:100%;}td,th{border:1px solid #ccc;padding:6px;}@media print{@page{size:A4 portrait;margin:12mm 15mm}html,body{margin:0;padding:0 10px;width:100%;overflow-x:hidden;max-width:100%;-webkit-print-color-adjust:exact;print-color-adjust:exact}button,.no-print{display:none!important}table{page-break-inside:auto}tr{page-break-inside:avoid}}</style></head><body>` + el.innerHTML + `</body></html>`);
                    win.document.close();
                    win.focus();
                    setTimeout(() => { win.print(); }, 600);
                  }}
                  sx={{ bgcolor: 'white', color: '#2e7d32', fontWeight: 700, '&:hover': { bgcolor: '#f1f8e9' } }}
                >
                  Imprimir Sugestões Terapêuticas
                </Button>
              </Box>

              <Box id="sugestoes-terapeuticas-print" sx={{ bgcolor: 'white', borderRadius: 2, p: 4, color: 'text.primary' }}>
                {/* Timbre padrão */}
                <PrescriptionHeader entry={formData} />
                
                {/* Identificação do Paciente */}
                <Box sx={{ mb: 4, pb: 3, borderBottom: '2px solid #e0e0e0' }}>
                  <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 600, mb: 2 }}>
                    👤 Identificação do Paciente
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1"><strong>Nome:</strong> {formData.q01_nome}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1"><strong>Idade:</strong> {formData.q03_idade || formData.q02_idade} anos</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1"><strong>Sexo:</strong> {formData.q04_sexo}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1"><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</Typography>
                    </Grid>
                  </Grid>
                </Box>

                {/* Queixa Principal */}
                {formData.q15_queixa_principal && (
                  <Box sx={{ mb: 4, pb: 3, borderBottom: '2px solid #e0e0e0' }}>
                    <Typography variant="h5" gutterBottom sx={{ color: '#d32f2f', fontWeight: 600, mb: 2 }}>
                      🎯 Queixa Principal
                    </Typography>
                    <Typography variant="body1" sx={{ pl: 2, borderLeft: '4px solid #d32f2f', bgcolor: '#ffebee', p: 2, borderRadius: 1 }}>
                      {formData.q15_queixa_principal}
                    </Typography>
                    {formData.q16_tempo_problema && (
                      <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                        <strong>Tempo de problema:</strong> {formData.q16_tempo_problema}
                      </Typography>
                    )}
                  </Box>
                )}

                {/* Carências Nutricionais Identificadas */}
                {carenciasIdentificadas.length > 0 && (
                  <Box sx={{ mb: 4, pb: 3, borderBottom: '2px solid #e0e0e0' }}>
                    <Typography variant="h5" gutterBottom sx={{ color: '#2e7d32', fontWeight: 600, mb: 2 }}>
                      💊 Deficiências Nutricionais Identificadas
                    </Typography>
                    
                    <Alert severity="warning" sx={{ mb: 3 }}>
                      <strong>Importante:</strong> As seguintes deficiências nutricionais foram identificadas com base nos sintomas relatados. Recomenda-se suplementação conforme protocolo abaixo.
                    </Alert>

                    {carenciasIdentificadas.map((sintomaData, index) => (
                      <Box key={index} sx={{ mb: 3, p: 3, backgroundColor: '#f1f8e9', borderRadius: 2, border: '2px solid #689f38' }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#33691e' }}>
                          📌 Sintoma: {sintomaData.sintoma}
                        </Typography>
                        
                        {sintomaData.carencias.map((carencia, idx) => (
                          <Box key={idx} sx={{ mb: 2, p: 2, backgroundColor: 'white', borderRadius: 1, border: '1px solid #aed581' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2e7d32', mb: 1 }}>
                              ➤ {carencia.nutriente}
                            </Typography>
                            
                            <Box sx={{ pl: 3 }}>
                              <Typography variant="body1" sx={{ mb: 0.5 }}>
                                <strong>📝 Posologia:</strong> {carencia.posologia}
                              </Typography>
                              <Typography variant="body1" sx={{ mb: 0.5, color: '#d32f2f' }}>
                                <strong>⚠️ Dosagem máxima:</strong> {carencia.dosagem_maxima}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#616161', fontStyle: 'italic', mt: 1, p: 1, bgcolor: '#fafafa', borderRadius: 1 }}>
                                <strong>📌 Observações:</strong> {carencia.observacoes}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Protocolos de Tratamento do Questionário Abrangente */}
                {formData.comprehensiveHealthData && (
                  <Box sx={{ mb: 4, pb: 3, borderBottom: '2px solid #e0e0e0' }}>
                    <Typography variant="h5" gutterBottom sx={{ color: '#0d47a1', fontWeight: 600, mb: 2 }}>
                      🌿 Protocolos Terapêuticos Personalizados
                    </Typography>
                    
                    <Alert severity="info" sx={{ mb: 3 }}>
                      <strong>Protocolos baseados em:</strong> Questionário Abrangente de Saúde - Condições identificadas e confirmadas durante a anamnese.
                    </Alert>

                    <ComprehensiveHealthSummary data={formData.comprehensiveHealthData} />
                    
                    <Box sx={{ mt: 3 }}>
                      <TreatmentProtocolsDisplay data={formData.comprehensiveHealthData} />
                    </Box>
                  </Box>
                )}

                {/* Análise de Sinais Vitais */}
                {formData.vitalSignsAnalysis && (
                  <Box sx={{ mb: 4, pb: 3, borderBottom: '2px solid #e0e0e0' }}>
                    <Typography variant="h5" gutterBottom sx={{ color: '#e64a19', fontWeight: 600, mb: 2 }}>
                      📊 Análise de Sinais Vitais e Medidas Antropométricas
                    </Typography>
                    
                    <Grid container spacing={2}>
                      {formData.vitalSignsAnalysis.interpretations && 
                       Object.entries(formData.vitalSignsAnalysis.interpretations).map(([key, interp]) => {
                        if (!interp || !interp.recommendation) return null;
                        
                        const getStatusColor = (status) => {
                          if (status === 'normal' || status === 'ideal') return '#4caf50';
                          if (status === 'elevado' || status === 'alto' || status === 'baixo') return '#ff9800';
                          return '#f44336';
                        };

                        return (
                          <Grid item xs={12} key={key}>
                            <Card variant="outlined" sx={{ borderColor: getStatusColor(interp.status), borderWidth: 2 }}>
                              <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <Box 
                                    sx={{ 
                                      width: 12, 
                                      height: 12, 
                                      borderRadius: '50%', 
                                      bgcolor: getStatusColor(interp.status),
                                      mr: 1 
                                    }} 
                                  />
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    {interp.measure}
                                  </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                  <strong>Status:</strong> {interp.status.toUpperCase()}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                  <strong>Recomendação:</strong> {interp.recommendation}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                )}

                {/* Análise de Iridologia */}
                {formData.iridologyAnalysis && (
                  <Box sx={{ mb: 4, pb: 3, borderBottom: '2px solid #e0e0e0' }}>
                    <Typography variant="h5" gutterBottom sx={{ color: '#673ab7', fontWeight: 600, mb: 2 }}>
                      👁️ Análise de Iridologia
                    </Typography>
                    
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Análise realizada através da observação da íris. Os sinais identificados indicam predisposições e desequilíbrios orgânicos.
                    </Alert>

                    {formData.iridologyAnalysis.findings && formData.iridologyAnalysis.findings.length > 0 && (
                      <Box>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Achados Principais:</Typography>
                        {formData.iridologyAnalysis.findings.map((finding, idx) => (
                          <Box key={idx} sx={{ mb: 2, p: 2, bgcolor: '#f3e5f5', borderRadius: 1, borderLeft: '4px solid #9c27b0' }}>
                            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                              {finding.organ || finding.area}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {finding.description || finding.interpretation}
                            </Typography>
                            {finding.recommendation && (
                              <Typography variant="body2" sx={{ mt: 1, p: 1, bgcolor: 'white', borderRadius: 1 }}>
                                <strong>Orientação:</strong> {finding.recommendation}
                              </Typography>
                            )}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                )}

                {/* Observações Adicionais */}
                {formData.q50_observacoes && (
                  <Box sx={{ mb: 4, pb: 3, borderBottom: '2px solid #e0e0e0' }}>
                    <Typography variant="h5" gutterBottom sx={{ color: '#795548', fontWeight: 600, mb: 2 }}>
                      💭 Observações Complementares
                    </Typography>
                    <Typography variant="body1" sx={{ pl: 2, borderLeft: '4px solid #795548', bgcolor: '#efebe9', p: 2, borderRadius: 1, whiteSpace: 'pre-wrap' }}>
                      {formData.q50_observacoes}
                    </Typography>
                  </Box>
                )}

                {/* Orientações Gerais */}
                <Box sx={{ mt: 4, p: 3, bgcolor: '#e3f2fd', borderRadius: 2, border: '2px solid #1976d2' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#0d47a1', fontWeight: 600 }}>
                    ⚕️ Orientações Gerais de Tratamento
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box component="ul" sx={{ pl: 3 }}>
                    <li>
                      <Typography variant="body2" paragraph>
                        <strong>Adesão ao Tratamento:</strong> É fundamental seguir rigorosamente as orientações e posologias indicadas para obter os melhores resultados terapêuticos.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" paragraph>
                        <strong>Acompanhamento:</strong> Agendar retorno conforme orientação para avaliação da evolução do quadro clínico e ajustes necessários no plano terapêutico.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" paragraph>
                        <strong>Estilo de Vida:</strong> Manter alimentação balanceada, hidratação adequada (mínimo 2L água/dia), sono regular (7-8h/noite) e prática de atividade física regular.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" paragraph>
                        <strong>Contraindicações:</strong> Em caso de gestação, lactação ou condições médicas especiais, consulte seu médico antes de iniciar qualquer suplementação.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        <strong>Reações Adversas:</strong> Caso apresente qualquer reação adversa, suspender o uso e entrar em contato imediatamente com o terapeuta.
                      </Typography>
                    </li>
                  </Box>
                </Box>

                {/* Rodapé com timbre padrão */}
                <PrescriptionFooter />
              </Box>
            </Paper>
          )}

          {/* RESUMO FINAL ABRANGENTE - Reúne todos os pontos críticos e gera protocolos */}
          {/* Temporariamente desabilitado para debug
          {showSummary && (
            <ComprehensiveFinalSummary 
              formData={formData}
              patientName={formData.q01_nome}
            />
          )}
          */}
        </form>

        <Alert severity="info" sx={{ mt: 3 }}>
          <strong>Dica:</strong> Use os botões "Imprimir" ou "Download PDF" para gerar um documento completo com TODOS os dados preenchidos na anamnese. O documento incluirá timbre profissional e será organizado por seções.
        </Alert>
      </Paper>
      <ScrollToTop />
    </Container>
  );
}