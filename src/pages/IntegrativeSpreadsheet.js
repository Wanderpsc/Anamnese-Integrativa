import { safeSaveAnamneses } from '../lib/localStorageSafe';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  LinearProgress,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl } from '../components/PrintTemplate';
import PrescriptionHeader from '../components/PrescriptionHeader';

// MSQ - Medical Symptoms Questionnaire (Institute for Functional Medicine)
// Sistema de pontuação: 0 = Nunca/Raramente, 1 = Ocasionalmente, 2 = Frequentemente, 3 = Sempre/Grave

const MSQ_CATEGORIES = {
  head: {
    name: 'Cabeça',
    color: '#e91e63',
    symptoms: [
      'Dores de cabeça',
      'Sensação de cabeça pesada',
      'Tonturas',
      'Enxaquecas',
    ],
  },
  eyes: {
    name: 'Olhos',
    color: '#9c27b0',
    symptoms: [
      'Olhos lacrimejantes ou com coceira',
      'Olhos inchados, vermelhos ou grudados',
      'Bolsas ou círculos escuros sob os olhos',
      'Visão embaçada ou em túnel',
    ],
  },
  ears: {
    name: 'Ouvidos',
    color: '#673ab7',
    symptoms: [
      'Coceira nos ouvidos',
      'Dor de ouvido, infecções de ouvido',
      'Drenagem dos ouvidos',
      'Zumbido nos ouvidos, perda de audição',
    ],
  },
  nose: {
    name: 'Nariz',
    color: '#3f51b5',
    symptoms: [
      'Congestão nasal',
      'Problemas sinusais',
      'Febre do feno',
      'Espirros excessivos',
      'Excesso de formação de muco',
    ],
  },
  mouthThroat: {
    name: 'Boca/Garganta',
    color: '#2196f3',
    symptoms: [
      'Tosse crônica',
      'Necessidade frequente de limpar a garganta',
      'Dor de garganta, rouquidão, perda de voz',
      'Língua inchada ou descolorida, gengivas ou lábios',
      'Aftas',
    ],
  },
  skin: {
    name: 'Pele',
    color: '#03a9f4',
    symptoms: [
      'Acne',
      'Urticária, erupções cutâneas ou pele seca',
      'Perda de cabelo',
      'Rubor ou ondas de calor',
      'Sudorese excessiva',
    ],
  },
  heart: {
    name: 'Coração',
    color: '#00bcd4',
    symptoms: [
      'Batimento cardíaco irregular ou acelerado',
      'Batimentos cardíacos acelerados',
      'Dor no peito',
    ],
  },
  lungs: {
    name: 'Pulmões',
    color: '#009688',
    symptoms: [
      'Congestão no peito',
      'Asma, bronquite',
      'Falta de ar',
      'Dificuldade em respirar',
    ],
  },
  digestive: {
    name: 'Sistema Digestivo',
    color: '#4caf50',
    symptoms: [
      'Náusea, vômito',
      'Diarreia',
      'Constipação',
      'Inchaço',
      'Azia',
      'Dor ou cólica intestinal',
      'Gases excessivos',
      'Sensação de plenitude',
    ],
  },
  joints: {
    name: 'Articulações/Músculos',
    color: '#8bc34a',
    symptoms: [
      'Dor ou dores nas articulações',
      'Artrite',
      'Rigidez ou limitação de movimento',
      'Dor ou dores musculares',
      'Sensação de fraqueza ou cansaço',
    ],
  },
  weight: {
    name: 'Peso',
    color: '#cddc39',
    symptoms: [
      'Compulsão alimentar e/ou beber',
      'Alimentação excessiva',
      'Desejo por certos alimentos',
      'Sobrepeso',
      'Retenção de água',
      'Perda de peso inexplicada',
    ],
  },
  energy: {
    name: 'Energia/Atividade',
    color: '#ffeb3b',
    symptoms: [
      'Fadiga, lentidão',
      'Apatia, letargia',
      'Hiperatividade',
      'Inquietação',
    ],
  },
  mind: {
    name: 'Mente',
    color: '#ffc107',
    symptoms: [
      'Memória fraca',
      'Confusão, compreensão pobre',
      'Má concentração',
      'Má coordenação física',
      'Dificuldade em tomar decisões',
      'Fala gaguejada ou arrastada',
      'Aprendizagem prejudicada',
    ],
  },
  emotions: {
    name: 'Emoções',
    color: '#ff9800',
    symptoms: [
      'Mudanças de humor',
      'Ansiedade, medo, nervosismo',
      'Raiva, irritabilidade, agressividade',
      'Depressão',
    ],
  },
  other: {
    name: 'Outros',
    color: '#ff5722',
    symptoms: [
      'Micção frequente ou urgente',
      'Coceira genital ou corrimento',
      'Infecções frequentes',
      'Insônia',
    ],
  },
};

// Interpretação de scores
const SCORE_INTERPRETATION = {
  optimal: { min: 0, max: 10, label: 'Ótimo', color: '#4caf50', description: 'Saúde ótima, baixo nível de sintomas' },
  mild: { min: 11, max: 30, label: 'Leve', color: '#8bc34a', description: 'Sintomas leves, atenção preventiva recomendada' },
  moderate: { min: 31, max: 60, label: 'Moderado', color: '#ffeb3b', description: 'Sintomas moderados, intervenção nutricional recomendada' },
  severe: { min: 61, max: 100, label: 'Grave', color: '#ff9800', description: 'Sintomas graves, avaliação médica e nutricional urgente' },
  critical: { min: 101, max: 999, label: 'Crítico', color: '#f44336', description: 'Sintomas críticos, avaliação médica imediata necessária' },
};

export default function IntegrativeSpreadsheet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(null);
  const [responses, setResponses] = useState({});
  const [categoryScores, setCategoryScores] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [interpretation, setInterpretation] = useState(null);

  useEffect(() => {
    if (id) {
      const saved = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const found = saved.find((x) => String(x.id) === String(id));
      if (found) {
        setPatientData(found);
        loadExistingData(found);
      }
    }
  }, [id]);

  const loadExistingData = (data) => {
    // Carregar dados salvos anteriormente se existirem
    if (data.msqData) {
      setResponses(data.msqData.responses || {});
      calculateScores(data.msqData.responses || {});
    } else {
      // Inicializar com 0
      const initialResponses = {};
      Object.keys(MSQ_CATEGORIES).forEach((category) => {
        initialResponses[category] = {};
        MSQ_CATEGORIES[category].symptoms.forEach((symptom) => {
          initialResponses[category][symptom] = 0;
        });
      });
      setResponses(initialResponses);
    }
  };

  const handleResponseChange = (category, symptom, value) => {
    const newResponses = {
      ...responses,
      [category]: {
        ...responses[category],
        [symptom]: parseInt(value),
      },
    };
    setResponses(newResponses);
    calculateScores(newResponses);
  };

  const calculateScores = (data) => {
    const scores = {};
    let total = 0;

    Object.keys(MSQ_CATEGORIES).forEach((category) => {
      const categoryData = data[category] || {};
      const values = Object.values(categoryData);
      const score = values.reduce((sum, val) => sum + (parseInt(val) || 0), 0);
      scores[category] = score;
      total += score;
    });

    setCategoryScores(scores);
    setTotalScore(total);

    // Determinar interpretação
    let interp = null;
    Object.values(SCORE_INTERPRETATION).forEach((range) => {
      if (total >= range.min && total <= range.max) {
        interp = range;
      }
    });
    setInterpretation(interp);
  };

  const getCategoryInterpretation = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage === 0) return { label: 'Sem sintomas', color: '#4caf50' };
    if (percentage < 25) return { label: 'Leve', color: '#8bc34a' };
    if (percentage < 50) return { label: 'Moderado', color: '#ffeb3b' };
    if (percentage < 75) return { label: 'Grave', color: '#ff9800' };
    return { label: 'Crítico', color: '#f44336' };
  };

  const getRecommendations = (category, score) => {
    const recommendations = {
      head: {
        mild: ['Magnésio 400mg/dia', 'Hidratação adequada', 'Redução de estresse'],
        moderate: ['Coenzima Q10', 'Riboflavina B2', 'Avaliação de alergias alimentares'],
        severe: ['Avaliação neurológica', 'Exames de imagem', 'Protocolo anti-inflamatório'],
      },
      eyes: {
        mild: ['Omega-3', 'Vitamina A', 'Redução de tempo de tela'],
        moderate: ['Quercetina', 'Vitamina C', 'Avaliação oftalmológica'],
        severe: ['Exame oftalmológico completo', 'Teste de alergias', 'Protocolo antioxidante'],
      },
      digestive: {
        mild: ['Probióticos', 'Enzimas digestivas', 'Fibras'],
        moderate: ['Protocolo 4R', 'L-Glutamina 5g/dia', 'Dieta eliminação'],
        severe: ['Avaliação gastroenterológica', 'Endoscopia', 'Protocolo autoimune'],
      },
      joints: {
        mild: ['Cúrcuma', 'Gengibre', 'Colágeno tipo II'],
        moderate: ['Boswellia', 'MSM', 'Fisioterapia'],
        severe: ['Avaliação reumatológica', 'Exames inflamatórios', 'Protocolo antirreumático'],
      },
      mind: {
        mild: ['Ômega-3 DHA', 'B-Complex', 'Exercícios cognitivos'],
        moderate: ['Fosfatidilserina', 'Ginkgo biloba', 'Avaliação neuropsicológica'],
        severe: ['Avaliação neurológica completa', 'Ressonância magnética', 'Testes cognitivos'],
      },
      emotions: {
        mild: ['Magnésio', 'Vitamina D', 'Meditação'],
        moderate: ['5-HTP', 'L-teanina', 'Terapia psicológica'],
        severe: ['Avaliação psiquiátrica', 'Testes hormonais', 'Psicoterapia intensiva'],
      },
    };

    const maxScore = MSQ_CATEGORIES[category].symptoms.length * 3;
    const percentage = (score / maxScore) * 100;

    if (percentage < 25) return recommendations[category]?.mild || ['Manter hábitos saudáveis'];
    if (percentage < 50) return recommendations[category]?.moderate || ['Consultar profissional de saúde'];
    return recommendations[category]?.severe || ['Avaliação médica urgente'];
  };

  const handleSave = () => {
    if (!id) {
      alert('Selecione um interagente primeiro');
      return;
    }

    const saved = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const index = saved.findIndex((x) => String(x.id) === String(id));
    
    if (index !== -1) {
      saved[index].msqData = {
        responses,
        categoryScores,
        totalScore,
        interpretation,
        completedAt: new Date().toISOString(),
      };
      try { if (!safeSaveAnamneses(saved)) console.warn('Failed to fully save anamneses locally'); } catch(e) { console.warn(e); }
      try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: { id } })); } catch (e) { /* ignore */ }
      alert('MSQ salvo com sucesso!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    const element = document.getElementById('msq-content');
    const bodyHtml = element ? element.innerHTML : '';
    const qr = `${window.location.origin}/anamnese/${id}`;
    const qrUrl = await generateQrDataUrl(qr);
    const html = await buildLetterheadHtml({ title: `MSQ - ${patientData?.nome || 'anamnese'}`, bodyHtml, qrUrl });
    await downloadPdfFromHtml(html, `msq-${patientData?.nome || 'anamnese'}.pdf`);
  };

  if (!id) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            MSQ - Medical Symptoms Questionnaire
          </Typography>
          <Alert severity="info">
            Selecione um interagente no Dashboard para preencher o MSQ.
          </Alert>
          <Button
            variant="contained"
            onClick={() => navigate('/dashboard')}
            sx={{ mt: 2 }}
          >
            Ir para Interagentes
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }} id="msq-content">
        <PrescriptionHeader
          patientName={patientData?.nome}
          patientAge={patientData?.idade}
          patientContact={patientData?.telefone}
        />

        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 600 }}>
              MSQ - Questionário de Sintomas Clínicos
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Questionário de Sintomas Clínicos - Institute for Functional Medicine
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }} className="no-print">
            <Button
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              size="small"
            >
              Salvar
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              size="small"
            >
              Imprimir
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              size="small"
            >
              PDF
            </Button>
          </Box>
        </Box>

        {/* Instruções */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2" gutterBottom>
            <strong>Instruções:</strong> Avalie cada sintoma de acordo com a frequência e intensidade nos últimos 30 dias.
          </Typography>
          <Typography variant="body2">
            <strong>0</strong> = Nunca/Raramente | <strong>1</strong> = Ocasionalmente | <strong>2</strong> = Frequentemente | <strong>3</strong> = Sempre/Grave
          </Typography>
        </Alert>

        {/* Score Total em Tempo Real */}
        {totalScore > 0 && (
          <Card sx={{ mb: 3, bgcolor: interpretation?.color + '20', border: `2px solid ${interpretation?.color}` }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: interpretation?.color }}>
                    {totalScore}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pontuação Total
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Chip
                    label={interpretation?.label}
                    sx={{
                      bgcolor: interpretation?.color,
                      color: '#fff',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      height: 40,
                      px: 2,
                    }}
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {interpretation?.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  {interpretation?.label === 'Ótimo' && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#4caf50' }}>
                      <CheckCircleIcon />
                      <Typography variant="body2">Saúde em ótimo estado!</Typography>
                    </Box>
                  )}
                  {(interpretation?.label === 'Grave' || interpretation?.label === 'Crítico') && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#f44336' }}>
                      <WarningIcon />
                      <Typography variant="body2">Avaliação profissional recomendada</Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Questionário por Categorias */}
        <Box sx={{ mb: 4 }}>
          {Object.keys(MSQ_CATEGORIES).map((categoryKey) => {
            const category = MSQ_CATEGORIES[categoryKey];
            const score = categoryScores[categoryKey] || 0;
            const maxScore = category.symptoms.length * 3;
            const catInterp = getCategoryInterpretation(score, maxScore);
            const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

            return (
              <Accordion key={categoryKey} defaultExpanded={categoryKey === 'digestive'}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', pr: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: category.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 700,
                      }}
                    >
                      {score}
                    </Box>
                    <Typography variant="h6" sx={{ flex: 1 }}>
                      {category.name}
                    </Typography>
                    {score > 0 && (
                      <>
                        <Chip
                          label={catInterp.label}
                          size="small"
                          sx={{ bgcolor: catInterp.color, color: '#fff', fontWeight: 600 }}
                        />
                        <Box sx={{ width: 100 }}>
                          <LinearProgress
                            variant="determinate"
                            value={percentage}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              '& .MuiLinearProgress-bar': { bgcolor: catInterp.color },
                            }}
                          />
                        </Box>
                      </>
                    )}
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {category.symptoms.map((symptom, index) => (
                      <Grid item xs={12} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography variant="body2" sx={{ flex: 1, minWidth: 250 }}>
                            {symptom}
                          </Typography>
                          <RadioGroup
                            row
                            value={responses[categoryKey]?.[symptom] || 0}
                            onChange={(e) => handleResponseChange(categoryKey, symptom, e.target.value)}
                          >
                            <FormControlLabel value={0} control={<Radio size="small" />} label="0" />
                            <FormControlLabel value={1} control={<Radio size="small" />} label="1" />
                            <FormControlLabel value={2} control={<Radio size="small" />} label="2" />
                            <FormControlLabel value={3} control={<Radio size="small" />} label="3" />
                          </RadioGroup>
                        </Box>
                        {index < category.symptoms.length - 1 && <Divider sx={{ my: 1 }} />}
                      </Grid>
                    ))}
                  </Grid>

                  {/* Recomendações por Categoria */}
                  {score > 0 && (
                    <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                        📋 Recomendações para {category.name}:
                      </Typography>
                      <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                        {getRecommendations(categoryKey, score).map((rec, idx) => (
                          <li key={idx}>
                            <Typography variant="body2">{rec}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>

        {/* Tabela Resumo */}
        {totalScore > 0 && (
          <>
            <Divider sx={{ my: 4 }} />
            
            <Typography variant="h5" gutterBottom sx={{ color: '#2e7d32', mb: 3 }}>
              Resumo por Categoria
            </Typography>

            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f1f8e9' }}>
                    <TableCell><strong>Categoria</strong></TableCell>
                    <TableCell align="center"><strong>Pontuação</strong></TableCell>
                    <TableCell align="center"><strong>Máximo</strong></TableCell>
                    <TableCell align="center"><strong>%</strong></TableCell>
                    <TableCell align="center"><strong>Status</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(MSQ_CATEGORIES)
                    .sort((a, b) => (categoryScores[b] || 0) - (categoryScores[a] || 0))
                    .map((categoryKey) => {
                      const category = MSQ_CATEGORIES[categoryKey];
                      const score = categoryScores[categoryKey] || 0;
                      const maxScore = category.symptoms.length * 3;
                      const catInterp = getCategoryInterpretation(score, maxScore);
                      const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

                      return (
                        <TableRow key={categoryKey} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box
                                sx={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: '50%',
                                  bgcolor: category.color,
                                }}
                              />
                              {category.name}
                            </Box>
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: 600 }}>{score}</TableCell>
                          <TableCell align="center">{maxScore}</TableCell>
                          <TableCell align="center">{percentage.toFixed(0)}%</TableCell>
                          <TableCell align="center">
                            <Chip
                              label={catInterp.label}
                              size="small"
                              sx={{ bgcolor: catInterp.color, color: '#fff', fontWeight: 600 }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Interpretação Final */}
            <Paper sx={{ p: 3, bgcolor: '#e8f5e9' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32' }}>
                Interpretação e Recomendações Gerais
              </Typography>
              <Typography variant="body2" paragraph>
                Com uma pontuação total de <strong>{totalScore} pontos</strong>, seu perfil é classificado como{' '}
                <strong style={{ color: interpretation?.color }}>{interpretation?.label}</strong>.{' '}
                {interpretation?.description}
              </Typography>

              {interpretation?.label !== 'Ótimo' && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>Recomendações:</strong>
                  </Typography>
                  <ul style={{ marginTop: 8, marginBottom: 0 }}>
                    <li>Consulte um profissional de Medicina Funcional ou Integrativa</li>
                    <li>Considere investigar sensibilidades alimentares</li>
                    <li>Avalie saúde intestinal e microbioma</li>
                    <li>Exames laboratoriais funcionais podem ser úteis</li>
                    <li>Implemente protocolo anti-inflamatório</li>
                  </ul>
                </Alert>
              )}

              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Importante:</strong> Este questionário é uma ferramenta de triagem e não substitui
                  avaliação médica completa. Consulte sempre um profissional de saúde qualificado.
                </Typography>
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
