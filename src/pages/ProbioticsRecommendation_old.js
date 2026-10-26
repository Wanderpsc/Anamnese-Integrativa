import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Chip,
  Grid,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ExpandMore as ExpandMoreIcon,
  Science as ScienceIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  LocalPharmacy as PharmacyIcon
} from '@mui/icons-material';
import { PROBIOTIC_STRAINS, SYMPTOM_TO_STRAINS, GENERAL_GUIDELINES } from '../data/probioticsData';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl } from '../components/PrintTemplate';

export default function ProbioticsRecommendation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('id');
  
  const [patientData, setPatientData] = useState(null);
  const [detectedSymptoms, setDetectedSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [showGuidelines, setShowGuidelines] = useState(true);

  // Carregar dados do paciente
  useEffect(() => {
    if (patientId) {
      const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const patient = anamneses.find(a => String(a.id) === String(patientId));
      if (patient) {
        setPatientData(patient);
        const detected = extractSymptomsFromAnamnese(patient);
        setDetectedSymptoms(detected);
        setSelectedSymptoms(detected); // Auto-selecionar sintomas detectados
      }
    }
  }, [patientId]);

  // Extrair sintomas da anamnese
  const extractSymptomsFromAnamnese = (data) => {
    const symptoms = new Set();

    // Queixa principal
    const queixa = (data.q15_queixa_principal || '').toLowerCase();
    
    // Mapeamento de palavras-chave para sintomas
    const keywordMap = {
      'constipação': ['constip', 'intestino preso', 'prisão de ventre'],
      'diarreia': ['diarreia', 'diarréia', 'fezes líquidas', 'evacuação líquida'],
      'sii': ['síndrome do intestino irritável', 'sii', 'intestino irritável'],
      'ansiedade': ['ansiedade', 'ansioso', 'nervoso', 'agitação'],
      'depressão': ['depressão', 'deprimido', 'tristeza', 'melancolia'],
      'estresse': ['estresse', 'stress', 'tensão'],
      'insônia': ['insônia', 'não consigo dormir', 'dificuldade para dormir'],
      'obesidade': ['obesidade', 'sobrepeso', 'excesso de peso'],
      'gordura abdominal': ['barriga', 'gordura abdominal', 'gordura na barriga'],
      'diabetes': ['diabetes', 'açúcar alto', 'glicose alta'],
      'hipertensão': ['pressão alta', 'hipertensão'],
      'candidíase': ['candidíase', 'candida', 'fungo vaginal'],
      'vaginose': ['vaginose', 'corrimento'],
      'infecções respiratórias': ['gripe', 'resfriado', 'tosse', 'sinusite', 'bronquite'],
      'alergia': ['alergia', 'alérgico', 'rinite'],
      'dermatite': ['dermatite', 'eczema', 'pele irritada'],
      'permeabilidade intestinal': ['permeabilidade', 'leaky gut', 'intestino permeável'],
      'inflamação intestinal': ['inflamação intestinal', 'intestino inflamado', 'colite'],
      'disbiose': ['disbiose', 'flora intestinal'],
      'gases': ['gases', 'flatulência', 'inchaço'],
      'distensão': ['distensão', 'barriga inchada', 'estufamento'],
      'h. pylori': ['h. pylori', 'helicobacter', 'bactéria no estômago'],
      'gastrite': ['gastrite', 'estômago irritado'],
      'intolerância à lactose': ['intolerância à lactose', 'não tolera leite'],
      'dor de garganta': ['dor de garganta', 'garganta inflamada'],
      'amigdalite': ['amigdalite', 'amígdalas'],
      'infecção urinária': ['infecção urinária', 'cistite'],
      'fígado gorduroso': ['fígado gorduroso', 'esteatose']
    };

    // Buscar na queixa principal
    Object.entries(keywordMap).forEach(([symptom, keywords]) => {
      if (keywords.some(keyword => queixa.includes(keyword))) {
        symptoms.add(symptom);
      }
    });

    // Campos específicos da anamnese
    if (data.q39_intestino?.toLowerCase().includes('constip') || 
        data.q39_intestino?.toLowerCase().includes('preso')) {
      symptoms.add('constipação');
    }
    if (data.q39_intestino?.toLowerCase().includes('diarr')) {
      symptoms.add('diarreia');
    }
    if (data.q40_gases?.toLowerCase().includes('freq')) {
      symptoms.add('gases');
    }
    if (data.q48_estresse?.toLowerCase().includes('sim') || 
        data.q48_estresse?.toLowerCase().includes('alto')) {
      symptoms.add('estresse');
    }
    if (data.q49_ansiedade?.toLowerCase().includes('sim') || 
        data.q49_ansiedade?.toLowerCase().includes('alta')) {
      symptoms.add('ansiedade');
    }
    if (data.q37_qualidade_sono?.toLowerCase().includes('ruim') || 
        data.q37_qualidade_sono?.toLowerCase().includes('regular')) {
      symptoms.add('insônia');
    }

    return Array.from(symptoms);
  };

  // Gerar recomendações
  useEffect(() => {
    if (selectedSymptoms.length === 0) {
      setRecommendations([]);
      return;
    }

    // Encontrar cepas recomendadas
    const strainScores = {};
    
    selectedSymptoms.forEach(symptom => {
      const strains = SYMPTOM_TO_STRAINS[symptom.toLowerCase()] || [];
      strains.forEach(strain => {
        strainScores[strain] = (strainScores[strain] || 0) + 1;
      });
    });

    // Ordenar por relevância
    const sortedStrains = Object.entries(strainScores)
      .sort((a, b) => b[1] - a[1])
      .map(([strain]) => strain);

    // Buscar dados completos
    const recommended = sortedStrains
      .map(strain => PROBIOTIC_STRAINS[strain])
      .filter(Boolean);

    setRecommendations(recommended);
  }, [selectedSymptoms]);

  // Gerar recomendações por categoria
  const getRecommendationsForSymptoms = (symptoms) => {
    const strainScores = {};
    
    symptoms.filter(s => selectedSymptoms.includes(s)).forEach(symptom => {
      const strains = SYMPTOM_TO_STRAINS[symptom.toLowerCase()] || [];
      strains.forEach(strain => {
        strainScores[strain] = (strainScores[strain] || 0) + 1;
      });
    });

    const sortedStrains = Object.entries(strainScores)
      .sort((a, b) => b[1] - a[1])
      .map(([strain]) => strain);

    return sortedStrains
      .map(strain => PROBIOTIC_STRAINS[strain])
      .filter(Boolean)
      .slice(0, 5); // Top 5 por categoria
  };

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptom)) {
        return prev.filter(s => s !== symptom);
      } else {
        return [...prev, symptom];
      }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (selectedSymptoms.length === 0) {
      alert('Por favor, selecione ao menos um sintoma antes de gerar o PDF.');
      return;
    }

    try {
      const bodyHtml = buildProbioticsReportHtml();
      const qr = patientData?.id ? `${window.location.origin}/probiotics?id=${patientData.id}` : '';
      const qrUrl = qr ? await generateQrDataUrl(qr) : '';
      const html = await buildLetterheadHtml({ 
        title: 'Recomendação de Probióticos', 
        bodyHtml, 
        qrUrl 
      });
      const fileName = `probioticos_${(patientData?.q01_nome || 'recomendacao').replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      await downloadPdfFromHtml(html, fileName);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tentando impressão direta...');
      window.print();
    }
  };

  const buildProbioticsReportHtml = () => {
    let html = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        ${patientData ? `
          <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2e7d32;">
            <h3 style="margin: 0 0 10px 0; color: #2e7d32;">Dados do Interagente</h3>
            <p style="margin: 5px 0;"><strong>Nome:</strong> ${patientData.q01_nome || 'Não informado'}</p>
            ${patientData.q15_queixa_principal ? `<p style="margin: 5px 0;"><strong>Queixa Principal:</strong> ${patientData.q15_queixa_principal}</p>` : ''}
            <p style="margin: 5px 0;"><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        ` : ''}
        
        <h2 style="color: #2e7d32; border-bottom: 3px solid #2e7d32; padding-bottom: 10px; margin-top: 30px;">
          💊 Recomendação de Probióticos
        </h2>
        
        <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff9800;">
          <h3 style="margin: 0 0 10px 0; color: #f57c00;">⚠️ Orientações Importantes</h3>
          <p style="margin: 5px 0; font-size: 14px;">${GENERAL_GUIDELINES.introduction}</p>
          <p style="margin: 10px 0 5px 0; font-weight: 600;">Duração da Suplementação:</p>
          <ul style="margin: 5px 0; padding-left: 20px; font-size: 14px;">
            <li><strong>Fase Aguda (4-8 semanas):</strong> ${GENERAL_GUIDELINES.duration.acute}</li>
            <li><strong>Fase de Transição (8-12 semanas):</strong> ${GENERAL_GUIDELINES.duration.transition}</li>
            <li><strong>Fase de Manutenção (12-24+ semanas):</strong> ${GENERAL_GUIDELINES.duration.maintenance}</li>
          </ul>
        </div>
        
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #1976d2;">📋 Sintomas Selecionados (${selectedSymptoms.length})</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${selectedSymptoms.map(s => `
              <span style="background: #2e7d32; color: white; padding: 6px 12px; border-radius: 16px; font-size: 13px; display: inline-block;">
                ${s.charAt(0).toUpperCase() + s.slice(1)}
              </span>
            `).join('')}
          </div>
        </div>
    `;

    // Adicionar recomendações por categoria
    Object.entries(symptomCategories).forEach(([category, symptoms]) => {
      const categoryRecommendations = getRecommendationsForSymptoms(symptoms);
      const hasSelectedSymptoms = symptoms.some(s => selectedSymptoms.includes(s));
      
      if (hasSelectedSymptoms && categoryRecommendations.length > 0) {
        html += `
          <div style="page-break-inside: avoid; margin: 30px 0;">
            <h3 style="color: #2e7d32; border-bottom: 2px solid #2e7d32; padding-bottom: 8px; margin-bottom: 15px;">
              ${category}
            </h3>
            
            ${categoryRecommendations.map(strain => `
              <div style="border: 2px solid #e0e0e0; border-radius: 8px; padding: 15px; margin-bottom: 20px; page-break-inside: avoid; background: #fafafa;">
                <div style="background: #2e7d32; color: white; padding: 10px; border-radius: 6px; margin-bottom: 12px;">
                  <h4 style="margin: 0; font-size: 16px;">🦠 ${strain.name}</h4>
                  <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">${strain.category}</p>
                </div>
                
                <div style="background: #e3f2fd; padding: 10px; border-radius: 6px; margin-bottom: 12px;">
                  <p style="margin: 0; font-size: 13px;"><strong>Bio-MAMPs:</strong> ${strain.bioMamps}</p>
                </div>
                
                <div style="background: #fff3e0; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                  <div style="margin-bottom: 8px;">
                    <strong style="color: #d32f2f;">💊 Dosagem:</strong>
                    <p style="margin: 3px 0 0 0;">${strain.dosage}</p>
                  </div>
                  <div style="margin-bottom: 8px;">
                    <strong style="color: #d32f2f;">⏰ Posologia:</strong>
                    <p style="margin: 3px 0 0 0;">${strain.posology}</p>
                  </div>
                  <div>
                    <strong style="color: #d32f2f;">📅 Duração:</strong>
                    <p style="margin: 3px 0 0 0;">${strain.duration}</p>
                  </div>
                </div>
                
                <div style="margin-bottom: 12px;">
                  <strong style="color: #1976d2;">✅ Principais Benefícios:</strong>
                  <ul style="margin: 5px 0; padding-left: 20px; font-size: 13px;">
                    ${strain.benefits.slice(0, 4).map(b => `<li>${b}</li>`).join('')}
                  </ul>
                </div>
                
                <div style="margin-bottom: 12px;">
                  <strong style="color: #1976d2;">🎯 Indicações:</strong>
                  <p style="margin: 5px 0; font-size: 13px;">${strain.indications.slice(0, 5).join(', ')}</p>
                </div>
                
                <div style="background: #fff3cd; padding: 10px; border-radius: 6px; border-left: 4px solid #ff9800;">
                  <strong style="color: #f57c00;">⚠️ Contraindicações:</strong>
                  <ul style="margin: 5px 0; padding-left: 20px; font-size: 12px;">
                    ${strain.contraindications.map(c => `<li>${c}</li>`).join('')}
                  </ul>
                </div>
                
                ${strain.precautions ? `
                  <div style="background: #e3f2fd; padding: 10px; border-radius: 6px; margin-top: 8px;">
                    <strong style="color: #1976d2;">💡 Precauções:</strong>
                    <p style="margin: 5px 0; font-size: 12px;">${strain.precautions}</p>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        `;
      }
    });

    html += `
      <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 30px; border-left: 4px solid #2e7d32;">
        <h3 style="margin: 0 0 10px 0; color: #2e7d32;">📊 Monitoramento Clínico</h3>
        <ul style="margin: 5px 0; padding-left: 20px; font-size: 13px;">
          ${GENERAL_GUIDELINES.monitoring.map(m => `<li>${m}</li>`).join('')}
        </ul>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f5f5f5; border-radius: 8px; text-align: center; font-size: 12px; color: #666;">
        <p style="margin: 0;">Este documento contém recomendações baseadas em evidências da Medicina Funcional Integrativa.</p>
        <p style="margin: 5px 0 0 0;">Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
      </div>
    </div>
    `;

    return html;
  };

  const allSymptomsList = Object.keys(SYMPTOM_TO_STRAINS).sort();

  // Organizar sintomas por categoria
  const symptomCategories = {
    'Digestivos': ['constipação', 'diarreia', 'sii', 'gases', 'distensão', 'h. pylori', 'gastrite', 'permeabilidade intestinal', 'inflamação intestinal', 'disbiose', 'intolerância à lactose'],
    'Emocionais/Neurológicos': ['ansiedade', 'depressão', 'estresse', 'insônia'],
    'Metabólicos': ['obesidade', 'gordura abdominal', 'diabetes', 'hipertensão', 'fígado gorduroso'],
    'Imunológicos': ['infecções respiratórias', 'alergia', 'dermatite', 'imunidade baixa'],
    'Urogenitais': ['candidíase', 'vaginose', 'infecção urinária'],
    'Outros': ['dor de garganta', 'amigdalite']
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }} className="print-container">
        {/* Cabeçalho */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }} className="no-print">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PharmacyIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
            <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 600 }}>
              Recomendação de Probióticos
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
              disabled={selectedSymptoms.length === 0}
            >
              Imprimir
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadPdf}
              disabled={selectedSymptoms.length === 0}
              sx={{
                bgcolor: '#2e7d32',
                '&:hover': { bgcolor: '#1b5e20' }
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
            {patientData.q15_queixa_principal && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Queixa Principal: {patientData.q15_queixa_principal}
              </Typography>
            )}
          </Alert>
        )}

        {/* Orientações Gerais */}
        {showGuidelines && (
          <Accordion defaultExpanded className="no-print">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
                📚 Orientações Gerais sobre Probióticos
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                {GENERAL_GUIDELINES.introduction}
              </Typography>
              
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
                Duração da Suplementação:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Fase Aguda (4-8 semanas)"
                    secondary={GENERAL_GUIDELINES.duration.acute}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Fase de Transição (8-12 semanas)"
                    secondary={GENERAL_GUIDELINES.duration.transition}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Fase de Manutenção (12-24 semanas+)"
                    secondary={GENERAL_GUIDELINES.duration.maintenance}
                  />
                </ListItem>
              </List>

              <Alert severity="warning" sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Contraindicações Gerais:
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {GENERAL_GUIDELINES.contraindications.map((item, idx) => (
                    <li key={idx}><Typography variant="body2">{item}</Typography></li>
                  ))}
                </ul>
              </Alert>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Seleção de Sintomas */}
        <Box sx={{ mb: 4, mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#2e7d32' }}>
            🔍 Selecione os Sintomas do Interagente
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              Marque os sintomas apresentados pelo interagente. Os sintomas detectados automaticamente da anamnese já vêm selecionados.
              <strong> SII = Síndrome do Intestino Irritável</strong>
            </Typography>
          </Alert>

          {/* Sintomas organizados por categoria */}
          {Object.entries(symptomCategories).map(([category, symptoms]) => {
            const categoryRecommendations = getRecommendationsForSymptoms(symptoms);
            const hasSelectedSymptoms = symptoms.some(s => selectedSymptoms.includes(s));
            
            return (
              <Box key={category} sx={{ mb: 3 }}>
                <Accordion defaultExpanded={category === 'Digestivos'}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {category} ({symptoms.filter(s => selectedSymptoms.includes(s)).length}/{symptoms.length})
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      <Grid container spacing={1}>
                        {symptoms.map((symptom) => (
                          <Grid item xs={12} sm={6} md={4} key={symptom}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={selectedSymptoms.includes(symptom)}
                                  onChange={() => handleSymptomToggle(symptom)}
                                  color="primary"
                                />
                              }
                              label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Typography variant="body2">
                                    {symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                                  </Typography>
                                  {detectedSymptoms.includes(symptom) && (
                                    <Chip 
                                      label="Auto" 
                                      size="small" 
                                      color="primary"
                                      sx={{ height: 18, fontSize: '0.65rem' }}
                                    />
                                  )}
                                </Box>
                              }
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>

                {/* Recomendações para esta categoria */}
                {hasSelectedSymptoms && categoryRecommendations.length > 0 && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, border: '2px solid #e8f5e9' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2e7d32', mb: 2 }}>
                      💊 Probióticos Recomendados para {category} ({categoryRecommendations.length})
                    </Typography>
                    
                    <Grid container spacing={2}>
                      {categoryRecommendations.map((strain, idx) => (
                        <Grid item xs={12} key={idx}>
                          <Card sx={{ border: '1px solid #e0e0e0' }}>
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <ScienceIcon sx={{ mr: 1, color: '#2e7d32', fontSize: 20 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                                  {strain.name}
                                </Typography>
                                <Chip 
                                  label={strain.category} 
                                  size="small" 
                                  sx={{ ml: 1, height: 20, fontSize: '0.7rem', bgcolor: '#e8f5e9', color: '#2e7d32' }}
                                />
                              </Box>

                              <Alert severity="info" sx={{ mb: 1, py: 0.5 }}>
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                  Bio-MAMPs: {strain.bioMamps}
                                </Typography>
                              </Alert>

                              <Grid container spacing={1} sx={{ mb: 1 }}>
                                <Grid item xs={12} sm={6}>
                                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#d32f2f' }}>
                                    💊 Dosagem:
                                  </Typography>
                                  <Typography variant="caption" display="block">{strain.dosage}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#d32f2f' }}>
                                    ⏰ Posologia:
                                  </Typography>
                                  <Typography variant="caption" display="block">{strain.posology}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#d32f2f' }}>
                                    📅 Duração:
                                  </Typography>
                                  <Typography variant="caption" display="block">{strain.duration}</Typography>
                                </Grid>
                              </Grid>

                              <Accordion sx={{ boxShadow: 'none', '&:before': { display: 'none' } }}>
                                <AccordionSummary 
                                  expandIcon={<ExpandMoreIcon />}
                                  sx={{ minHeight: 'auto', p: 0, '& .MuiAccordionSummary-content': { my: 0.5 } }}
                                >
                                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#1976d2' }}>
                                    Ver detalhes completos
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ p: 1, pt: 0 }}>
                                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#1976d2', display: 'block', mb: 0.5 }}>
                                    ✅ Benefícios:
                                  </Typography>
                                  <ul style={{ marginTop: 0, paddingLeft: 16, marginBottom: 8 }}>
                                    {strain.benefits.slice(0, 3).map((benefit, i) => (
                                      <li key={i}>
                                        <Typography variant="caption">{benefit}</Typography>
                                      </li>
                                    ))}
                                  </ul>

                                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#1976d2', display: 'block', mb: 0.5 }}>
                                    🎯 Indicações:
                                  </Typography>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                                    {strain.indications.slice(0, 4).map((indication, i) => (
                                      <Chip 
                                        key={i} 
                                        label={indication} 
                                        size="small"
                                        sx={{ height: 18, fontSize: '0.65rem', bgcolor: '#e3f2fd', color: '#1976d2' }}
                                      />
                                    ))}
                                  </Box>

                                  <Alert severity="warning" sx={{ py: 0.5, mb: 1 }}>
                                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                                      ⚠️ Contraindicações:
                                    </Typography>
                                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                                      {strain.contraindications.map((contra, i) => (
                                        <li key={i}>
                                          <Typography variant="caption">{contra}</Typography>
                                        </li>
                                      ))}
                                    </ul>
                                  </Alert>

                                  {strain.precautions && (
                                    <Alert severity="info" sx={{ py: 0.5 }}>
                                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                        💡 Precauções:
                                      </Typography>
                                      <Typography variant="caption" display="block">{strain.precautions}</Typography>
                                    </Alert>
                                  )}
                                </AccordionDetails>
                              </Accordion>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Box>
            );
          })}

          {/* Resumo dos selecionados */}
          {selectedSymptoms.length > 0 && (
            <Box sx={{ mt: 2, p: 2, bgcolor: '#e8f5e9', borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#2e7d32' }}>
                ✅ Total de Sintomas Selecionados: {selectedSymptoms.length}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedSymptoms.map((symptom, idx) => (
                  <Chip
                    key={idx}
                    label={symptom}
                    onDelete={() => handleSymptomToggle(symptom)}
                    color={detectedSymptoms.includes(symptom) ? 'primary' : 'secondary'}
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* Mensagem se não houver seleções */}
        {selectedSymptoms.length === 0 && (
          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body1">
              ℹ️ Selecione os sintomas acima para ver as recomendações de probióticos personalizadas.
            </Typography>
          </Alert>
        )}

        {/* Monitoramento */}
        {recommendations.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Alert severity="success">
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                📊 Monitoramento Clínico:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {GENERAL_GUIDELINES.monitoring.map((item, idx) => (
                  <li key={idx}>
                    <Typography variant="body2">{item}</Typography>
                  </li>
                ))}
              </ul>
            </Alert>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
