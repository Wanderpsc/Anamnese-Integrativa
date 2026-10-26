import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl } from '../components/PrintTemplate';
import PrescriptionHeader from '../components/PrescriptionHeader';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  TextField,
  Avatar,
  Stack
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PrintIcon from '@mui/icons-material/Print';
import { compareAnamneses } from '../lib/storage';

export default function CompareAnamneses() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [allAnamneses, setAllAnamneses] = useState([]);
  const [uniquePatients, setUniquePatients] = useState([]);
  
  // Seleção de pacientes e anamneses independentes (até 3)
  const [selectedPatient1, setSelectedPatient1] = useState(null);
  const [selectedPatient2, setSelectedPatient2] = useState(null);
  const [selectedPatient3, setSelectedPatient3] = useState(null);
  const [anamnesesPatient1, setAnamnesesPatient1] = useState([]);
  const [anamnesesPatient2, setAnamnesesPatient2] = useState([]);
  const [anamnesesPatient3, setAnamnesesPatient3] = useState([]);
  const [selectedAnamnese1, setSelectedAnamnese1] = useState(null);
  const [selectedAnamnese2, setSelectedAnamnese2] = useState(null);
  const [selectedAnamnese3, setSelectedAnamnese3] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [comparison2, setComparison2] = useState(null);

  // Modo evolução: quando há id na URL, mostra histórico do paciente
  const [evolutionMode, setEvolutionMode] = useState(false);
  const [evolutionAnamneses, setEvolutionAnamneses] = useState([]);
  const [evolutionComparisons, setEvolutionComparisons] = useState([]);

  const downloadPdf = async () => {
    const element = document.querySelector('.print-container');
    try {
      const bodyHtml = element.innerHTML;
      const title = `comparacao_${selectedPatient1?.q01_nome || 'paciente'}_${new Date().toISOString().split('T')[0]}`;
      const qr = `${window.location.origin}/comparacao`;
      const qrUrl = await generateQrDataUrl(qr);
      const html = await buildLetterheadHtml({ title, bodyHtml, qrUrl });
      await downloadPdfFromHtml(html, `${title}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      window.print();
    }
  };

  useEffect(() => {
    // Carregar todas as anamneses
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    setAllAnamneses(anamneses);
    
    // Extrair lista única de pacientes
    const patientsMap = new Map();
    anamneses.forEach(anam => {
      if (anam.q01_nome && !patientsMap.has(anam.q01_nome)) {
        patientsMap.set(anam.q01_nome, {
          nome: anam.q01_nome,
          dataNascimento: anam.q02_data_nascimento,
          ultimaAnamnese: anam.createdAt
        });
      }
    });
    setUniquePatients(Array.from(patientsMap.values()));

    // Modo evolução: se há id na URL, carrega histórico do paciente correspondente
    if (id) {
      const target = anamneses.find(a => String(a.id) === String(id));
      if (target) {
        const patientName = target.q01_nome || target.nome;
        const sorted = anamneses
          .filter(a => (a.q01_nome || a.nome) === patientName)
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setEvolutionAnamneses(sorted);
        setEvolutionMode(true);
      }
    }
  }, [id]);

  // Atualizar anamneses quando paciente 1 for selecionado
  useEffect(() => {
    if (selectedPatient1) {
      const anamList = allAnamneses
        .filter(a => a.q01_nome === selectedPatient1.nome)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAnamnesesPatient1(anamList);
      
      // Auto-selecionar a mais recente
      if (anamList.length > 0 && !selectedAnamnese1) {
        setSelectedAnamnese1(anamList[0]);
      }
    } else {
      setAnamnesesPatient1([]);
      setSelectedAnamnese1(null);
    }
  }, [selectedPatient1, allAnamneses]);

  // Atualizar anamneses quando paciente 2 for selecionado
  useEffect(() => {
    if (selectedPatient2) {
      const anamList = allAnamneses
        .filter(a => a.q01_nome === selectedPatient2.nome)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAnamnesesPatient2(anamList);
      
      // Auto-selecionar a mais recente
      if (anamList.length > 0 && !selectedAnamnese2) {
        setSelectedAnamnese2(anamList[0]);
      }
    } else {
      setAnamnesesPatient2([]);
      setSelectedAnamnese2(null);
    }
  }, [selectedPatient2, allAnamneses]);

  // Atualizar anamneses quando paciente 3 for selecionado
  useEffect(() => {
    if (selectedPatient3) {
      const anamList = allAnamneses
        .filter(a => a.q01_nome === selectedPatient3.nome)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAnamnesesPatient3(anamList);
      
      // Auto-selecionar a mais recente
      if (anamList.length > 0 && !selectedAnamnese3) {
        setSelectedAnamnese3(anamList[0]);
      }
    } else {
      setAnamnesesPatient3([]);
      setSelectedAnamnese3(null);
    }
  }, [selectedPatient3, allAnamneses]);

  // Calcular comparações entre sessões consecutivas para o modo evolução
  useEffect(() => {
    if (evolutionAnamneses.length >= 2) {
      const comps = [];
      for (let i = 0; i < evolutionAnamneses.length - 1; i++) {
        comps.push(compareAnamneses(evolutionAnamneses[i], evolutionAnamneses[i + 1]));
      }
      setEvolutionComparisons(comps);
    } else {
      setEvolutionComparisons([]);
    }
  }, [evolutionAnamneses]);

  // Gerar comparação quando anamneses estiverem selecionadas
  useEffect(() => {
    if (selectedAnamnese1 && selectedAnamnese2) {
      const comp = compareAnamneses(selectedAnamnese1, selectedAnamnese2);
      setComparison(comp);
    } else {
      setComparison(null);
    }
    
    // Comparação 1 vs 3
    if (selectedAnamnese1 && selectedAnamnese3) {
      const comp2 = compareAnamneses(selectedAnamnese1, selectedAnamnese3);
      setComparison2(comp2);
    } else {
      setComparison2(null);
    }
  }, [selectedAnamnese1, selectedAnamnese2, selectedAnamnese3]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Data não informada';
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getChangeIcon = (change) => {
    if (!change.improved) return <TrendingFlatIcon sx={{ color: 'gray' }} />;
    if (change.improved === 'improved') return <TrendingUpIcon sx={{ color: 'green' }} />;
    if (change.improved === 'worsened') return <TrendingDownIcon sx={{ color: 'red' }} />;
    return <TrendingFlatIcon sx={{ color: 'gray' }} />;
  };

  const getFieldLabel = (field) => {
    // Se o field já contém emoji/formatação, retorna direto
    if (field && typeof field === 'string' && (field.includes('💊') || field.includes('⚕️') || field.includes('📊') || field.includes('👨‍👩‍👧‍👦'))) {
      return field;
    }

    const labels = {
      peso: 'Peso',
      altura: 'Altura',
      imc: 'IMC',
      pressaoArterial: 'Pressão Arterial',
      frequenciaCardiaca: 'Frequência Cardíaca',
      circunferenciaCintura: 'Circunferência da Cintura',
      circunferenciaQuadril: 'Circunferência do Quadril',
      whr: 'Relação Cintura/Quadril',
      queixaPrincipal: 'Queixa Principal',
      sintomas: 'Sintomas',
      medicamentosEmUso: 'Medicamentos em Uso',
      alergias: 'Alergias',
      atividadeFisica: 'Atividade Física',
      alimentacao: 'Alimentação',
      qualidadeSono: 'Qualidade do Sono',
      nivelEstresse: 'Nível de Estresse',
      'Queixa Principal': '🩺 Queixa Principal',
      'Tempo do Problema': '⏱️ Tempo do Problema',
      'Tratamentos Anteriores': '💉 Tratamentos Anteriores',
      'Doenças Crônicas': '🏥 Doenças Crônicas',
      'Alergias': '⚠️ Alergias',
      'Medicamentos em Uso': '💊 Medicamentos em Uso',
      'Tabagismo': '🚬 Tabagismo',
      'Etilismo': '🍺 Etilismo',
      'Atividade Física': '🏃 Atividade Física',
      'Horas de Sono': '😴 Horas de Sono',
      'Qualidade do Sono': '🌙 Qualidade do Sono',
      'Dores': '🤕 Dores',
      'Cansaço': '😫 Cansaço',
      'Estresse': '😰 Estresse',
      'Ansiedade': '😥 Ansiedade'
    };
    return labels[field] || field;
  };

  const formatValue = (value) => {
    if (value === null || value === undefined) return 'Não informado';
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(', ') : 'Nenhum';
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  };

  // ── MODO EVOLUÇÃO: exibido quando id está na URL ──────────────────────────
  if (evolutionMode) {
    const patientName = evolutionAnamneses[0]?.q01_nome || evolutionAnamneses[0]?.nome || 'Paciente';
    const totalMelhoras = evolutionComparisons.reduce((acc, c) => acc + c.changes.filter(ch => ch.improved === 'improved').length, 0);
    const totalPioras = evolutionComparisons.reduce((acc, c) => acc + c.changes.filter(ch => ch.improved === 'worsened').length, 0);
    const totalAlteracoes = evolutionComparisons.reduce((acc, c) => acc + c.changes.filter(ch => !ch.improved).length, 0);

    return (
      <>
        <style>{`
          @media print {
            body * { visibility: hidden; }
            .print-container, .print-container * { visibility: visible; }
            .print-container { position: absolute; left: 0; top: 0; width: 100%; }
            .no-print, .no-print * { display: none !important; }
          }
        `}</style>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Header */}
          <Box className="no-print" sx={{
            mb: 4, background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
            p: 4, borderRadius: 3, color: 'white',
            boxShadow: '0 8px 32px rgba(26,35,126,0.3)'
          }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                <TrendingUpIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>📈 Evolução Clínica</Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>{patientName}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.75 }}>
                  {evolutionAnamneses.length} consulta(s) registrada(s) · {evolutionComparisons.length} período(s) comparado(s)
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }} className="no-print">
              <Button variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }} onClick={() => window.print()}>
                🖨️ Imprimir
              </Button>
              <Button variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }} onClick={() => navigate('/dashboard')}>
                ← Dashboard
              </Button>
            </Stack>
          </Box>

          <Box className="print-container">
            {/* Resumo de Evolução */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 3, background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)', borderRadius: 2, textAlign: 'center' }}>
                  <TrendingUpIcon sx={{ fontSize: 40, color: '#2e7d32', mb: 1 }} />
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#2e7d32' }}>{totalMelhoras}</Typography>
                  <Typography variant="body2" sx={{ color: '#388e3c', fontWeight: 600 }}>✅ Melhoras Identificadas</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 3, background: 'linear-gradient(135deg, #ffebee, #ffcdd2)', borderRadius: 2, textAlign: 'center' }}>
                  <TrendingDownIcon sx={{ fontSize: 40, color: '#c62828', mb: 1 }} />
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#c62828' }}>{totalPioras}</Typography>
                  <Typography variant="body2" sx={{ color: '#d32f2f', fontWeight: 600 }}>⚠️ Pioras Identificadas</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 3, background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)', borderRadius: 2, textAlign: 'center' }}>
                  <TrendingFlatIcon sx={{ fontSize: 40, color: '#1565c0', mb: 1 }} />
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#1565c0' }}>{totalAlteracoes}</Typography>
                  <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 600 }}>→ Alterações Neutras</Typography>
                </Card>
              </Grid>
            </Grid>

            {/* Timeline de consultas */}
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1a237e' }}>
                📅 Histórico de Consultas
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {evolutionAnamneses.map((anam, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Card sx={{ p: 2, borderRadius: 2, bgcolor: '#e8eaf6', border: '2px solid #3f51b5', minWidth: 160 }}>
                      <Typography variant="caption" sx={{ color: '#7986cb', fontWeight: 700, display: 'block' }}>
                        Consulta {idx + 1}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#1a237e' }}>
                        {formatDate(anam.createdAt)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                        {(anam.q15_queixa_principal || 'Sem queixa')?.substring(0, 40)}
                      </Typography>
                    </Card>
                    {idx < evolutionAnamneses.length - 1 && (
                      <ArrowForwardIcon sx={{ color: '#7986cb', fontSize: 28 }} />
                    )}
                  </Box>
                ))}
              </Box>
            </Paper>

            {/* Apenas uma consulta: sem comparação possível */}
            {evolutionAnamneses.length === 1 && (
              <Alert severity="info" sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Apenas uma consulta registrada</Typography>
                <Typography>Para ver a evolução, é necessário ter pelo menos duas consultas registradas para este paciente.</Typography>
              </Alert>
            )}

            {/* Comparações entre sessões consecutivas */}
            {evolutionComparisons.map((comp, compIdx) => {
              const anam1 = evolutionAnamneses[compIdx];
              const anam2 = evolutionAnamneses[compIdx + 1];
              const melhorasP = comp.changes.filter(c => c.improved === 'improved').length;
              const piorasP = comp.changes.filter(c => c.improved === 'worsened').length;

              return (
                <Paper key={compIdx} elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
                  <Box sx={{
                    background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
                    p: 2.5, borderRadius: 2, color: 'white', mb: 3,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      📊 Consulta {compIdx + 1} → Consulta {compIdx + 2}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip label={`${formatDate(anam1.createdAt)}`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }} />
                      <ArrowForwardIcon fontSize="small" />
                      <Chip label={`${formatDate(anam2.createdAt)}`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }} />
                      {melhorasP > 0 && <Chip label={`✅ ${melhorasP} melhora(s)`} size="small" sx={{ bgcolor: '#2e7d32', color: 'white' }} />}
                      {piorasP > 0 && <Chip label={`⚠️ ${piorasP} piora(s)`} size="small" sx={{ bgcolor: '#c62828', color: 'white' }} />}
                    </Stack>
                  </Box>

                  {comp.changes.length === 0 ? (
                    <Alert severity="success">Nenhuma mudança identificada entre estas consultas.</Alert>
                  ) : (
                    <Grid container spacing={2}>
                      {comp.changes.map((change, cIdx) => (
                        <Grid item xs={12} key={cIdx}>
                          <Card sx={{
                            borderRadius: 2, border: '2px solid',
                            borderColor: change.improved === 'improved' ? '#4caf50' : change.improved === 'worsened' ? '#f44336' : '#e0e0e0',
                          }}>
                            <CardContent sx={{ p: 2.5 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                                {getChangeIcon(change)}
                                <Typography variant="subtitle1" sx={{ flex: 1, fontWeight: 600 }}>
                                  {getFieldLabel(change.field)}
                                </Typography>
                                {change.improved === 'improved' && <Chip label="✅ Melhora" size="small" sx={{ bgcolor: '#4caf50', color: 'white' }} />}
                                {change.improved === 'worsened' && <Chip label="⚠️ Piora" size="small" sx={{ bgcolor: '#f44336', color: 'white' }} />}
                                {!change.improved && <Chip label="→ Alterado" size="small" sx={{ bgcolor: '#9e9e9e', color: 'white' }} />}
                              </Box>
                              <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={5}>
                                  <Box sx={{ p: 2, bgcolor: '#f5f7fa', borderRadius: 2, border: '1px solid #dde' }}>
                                    <Typography variant="caption" sx={{ color: '#666', fontWeight: 700, display: 'block', mb: 0.5 }}>
                                      Consulta {compIdx + 1} — {formatDate(anam1.createdAt)}:
                                    </Typography>
                                    <Typography variant="body2">{formatValue(change.previous)}</Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={2} sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                                  <ArrowForwardIcon sx={{ color: change.improved === 'improved' ? '#4caf50' : change.improved === 'worsened' ? '#f44336' : '#667eea', fontSize: 28 }} />
                                </Grid>
                                <Grid item xs={12} md={5}>
                                  <Box sx={{
                                    p: 2, borderRadius: 2, border: '1px solid',
                                    bgcolor: change.improved === 'improved' ? '#e8f5e9' : change.improved === 'worsened' ? '#ffebee' : '#f3e5f5',
                                    borderColor: change.improved === 'improved' ? '#a5d6a7' : change.improved === 'worsened' ? '#ffcdd2' : '#ce93d8',
                                  }}>
                                    <Typography variant="caption" sx={{ color: '#666', fontWeight: 700, display: 'block', mb: 0.5 }}>
                                      Consulta {compIdx + 2} — {formatDate(anam2.createdAt)}:
                                    </Typography>
                                    <Typography variant="body2">{formatValue(change.current)}</Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Paper>
              );
            })}

            {/* Resumo Final */}
            {evolutionComparisons.length > 0 && (
              <Paper elevation={3} sx={{
                p: 4, borderRadius: 3,
                background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)', color: 'white'
              }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>📋 Resumo Geral da Evolução</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ p: 2, bgcolor: 'rgba(76,175,80,0.25)', borderRadius: 2, border: '1px solid rgba(76,175,80,0.4)' }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#a5d6a7' }}>{totalMelhoras}</Typography>
                      <Typography variant="body2" sx={{ color: '#c8e6c9' }}>Indicadores de melhora</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ p: 2, bgcolor: 'rgba(244,67,54,0.25)', borderRadius: 2, border: '1px solid rgba(244,67,54,0.4)' }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#ef9a9a' }}>{totalPioras}</Typography>
                      <Typography variant="body2" sx={{ color: '#ffcdd2' }}>Indicadores de piora</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>{evolutionAnamneses.length}</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Consultas registradas</Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Typography variant="caption" sx={{ display: 'block', mt: 3, opacity: 0.7 }}>
                  Gerado em: {new Date().toLocaleDateString('pt-BR')} · {patientName}
                </Typography>
              </Paper>
            )}
          </Box>
        </Container>
      </>
    );
  }
  // ── FIM DO MODO EVOLUÇÃO ──────────────────────────────────────────────────

  if (allAnamneses.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Nenhuma Anamnese Encontrada
            </Typography>
            <Typography>
              Não há anamneses registradas ainda. Crie pelo menos duas anamneses para realizar comparações.
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                Nova Anamnese
              </Button>
              <Button variant="outlined" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
            </Box>
          </Alert>
        </Paper>
      </Container>
    );
  }

  if (allAnamneses.length === 1) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Alert severity="warning" sx={{ borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Apenas Uma Anamnese Encontrada
            </Typography>
            <Typography>
              É necessário ter pelo menos duas anamneses para realizar comparações.
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                Criar Segunda Anamnese
              </Button>
              <Button variant="outlined" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
            </Box>
          </Alert>
        </Paper>
      </Container>
    );
  }

  return (
    <>
      {/* CSS de Impressão */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-container, .print-container * {
              visibility: visible;
            }
            .print-container {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .no-print, .no-print * {
              display: none !important;
            }
            .MuiButton-root, 
            .MuiAutocomplete-root,
            .MuiSelect-root,
            .MuiFormControl-root,
            button {
              display: none !important;
            }
            .print-container {
              box-shadow: none !important;
              border: none !important;
              padding: 20px !important;
            }
            h4, h5, h6 {
              color: #000 !important;
              page-break-after: avoid;
            }
            .MuiCard-root {
              break-inside: avoid;
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }
          }
        `}
      </style>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header Moderno */}
        <Box className="no-print" sx={{ 
          mb: 4, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          p: 4,
          borderRadius: 3,
          color: 'white',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
        }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
              <CompareArrowsIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                Comparar Anamneses
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Compare anamneses de diferentes pacientes ou do mesmo paciente para avaliar evolução
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Seleção de Pacientes e Anamneses */}
        <Paper className="no-print" elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#667eea' }}>
            Selecione os Pacientes e Anamneses para Comparar (até 3)
          </Typography>

          <Grid container spacing={3}>
            {/* Paciente 1 */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                p: 3, 
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                borderRadius: 2,
                border: '2px solid',
                borderColor: selectedPatient1 ? '#667eea' : 'transparent',
                transition: 'all 0.3s'
              }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#667eea' }}>
                    <PersonIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Paciente 1
                  </Typography>
                </Stack>

                <Autocomplete
                  options={uniquePatients}
                  getOptionLabel={(option) => option.nome}
                  value={selectedPatient1}
                  onChange={(event, newValue) => {
                    setSelectedPatient1(newValue);
                    setSelectedAnamnese1(null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecione o Paciente"
                      variant="outlined"
                      sx={{ bgcolor: 'white', borderRadius: 1 }}
                    />
                  )}
                  sx={{ mb: 2 }}
                />

                {anamnesesPatient1.length > 0 && (
                  <FormControl fullWidth>
                    <InputLabel>Selecione a Anamnese</InputLabel>
                    <Select
                      value={selectedAnamnese1?.id || ''}
                      label="Selecione a Anamnese"
                      onChange={(e) => {
                        const anam = anamnesesPatient1.find(a => a.id === e.target.value);
                        setSelectedAnamnese1(anam);
                      }}
                      sx={{ bgcolor: 'white', borderRadius: 1 }}
                    >
                      {anamnesesPatient1.map((anam) => (
                        <MenuItem key={anam.id} value={anam.id}>
                          {formatDate(anam.createdAt)} - {anam.q15_queixa_principal?.substring(0, 40) || 'Sem queixa'}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {selectedAnamnese1 && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Selecionado:</strong> {selectedPatient1.nome}
                    </Typography>
                    <Typography variant="caption">
                      Data: {formatDate(selectedAnamnese1.createdAt)}
                    </Typography>
                  </Alert>
                )}
              </Card>
            </Grid>

            {/* Paciente 2 */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                p: 3, 
                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                borderRadius: 2,
                border: '2px solid',
                borderColor: selectedPatient2 ? '#764ba2' : 'transparent',
                transition: 'all 0.3s'
              }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#764ba2' }}>
                    <PersonIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Paciente 2
                  </Typography>
                </Stack>

                <Autocomplete
                  options={uniquePatients}
                  getOptionLabel={(option) => option.nome}
                  value={selectedPatient2}
                  onChange={(event, newValue) => {
                    setSelectedPatient2(newValue);
                    setSelectedAnamnese2(null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecione o Paciente"
                      variant="outlined"
                      sx={{ bgcolor: 'white', borderRadius: 1 }}
                    />
                  )}
                  sx={{ mb: 2 }}
                />

                {anamnesesPatient2.length > 0 && (
                  <FormControl fullWidth>
                    <InputLabel>Selecione a Anamnese</InputLabel>
                    <Select
                      value={selectedAnamnese2?.id || ''}
                      label="Selecione a Anamnese"
                      onChange={(e) => {
                        const anam = anamnesesPatient2.find(a => a.id === e.target.value);
                        setSelectedAnamnese2(anam);
                      }}
                      sx={{ bgcolor: 'white', borderRadius: 1 }}
                    >
                      {anamnesesPatient2.map((anam) => (
                        <MenuItem key={anam.id} value={anam.id}>
                          {formatDate(anam.createdAt)} - {anam.q15_queixa_principal?.substring(0, 40) || 'Sem queixa'}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {selectedAnamnese2 && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Selecionado:</strong> {selectedPatient2.nome}
                    </Typography>
                    <Typography variant="caption">
                      Data: {formatDate(selectedAnamnese2.createdAt)}
                    </Typography>
                  </Alert>
                )}
              </Card>
            </Grid>

            {/* Paciente 3 */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                p: 3, 
                background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
                borderRadius: 2,
                border: '2px solid',
                borderColor: selectedPatient3 ? '#10b981' : 'transparent',
                transition: 'all 0.3s'
              }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#10b981' }}>
                    <PersonIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Paciente 3 (Opcional)
                  </Typography>
                </Stack>

                <Autocomplete
                  options={uniquePatients}
                  getOptionLabel={(option) => option.nome}
                  value={selectedPatient3}
                  onChange={(event, newValue) => {
                    setSelectedPatient3(newValue);
                    setSelectedAnamnese3(null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecione o Paciente (Opcional)"
                      variant="outlined"
                      sx={{ bgcolor: 'white', borderRadius: 1 }}
                    />
                  )}
                  sx={{ mb: 2 }}
                />

                {anamnesesPatient3.length > 0 && (
                  <FormControl fullWidth>
                    <InputLabel>Selecione a Anamnese</InputLabel>
                    <Select
                      value={selectedAnamnese3?.id || ''}
                      label="Selecione a Anamnese"
                      onChange={(e) => {
                        const anam = anamnesesPatient3.find(a => a.id === e.target.value);
                        setSelectedAnamnese3(anam);
                      }}
                      sx={{ bgcolor: 'white', borderRadius: 1 }}
                    >
                      {anamnesesPatient3.map((anam) => (
                        <MenuItem key={anam.id} value={anam.id}>
                          {formatDate(anam.createdAt)} - {anam.q15_queixa_principal?.substring(0, 40) || 'Sem queixa'}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {selectedAnamnese3 && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Selecionado:</strong> {selectedPatient3.nome}
                    </Typography>
                    <Typography variant="caption">
                      Data: {formatDate(selectedAnamnese3.createdAt)}
                    </Typography>
                  </Alert>
                )}
              </Card>
            </Grid>
          </Grid>

          {/* Botões de Ação */}
          <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              size="large"
              disabled={!selectedAnamnese1 || !selectedAnamnese2}
              onClick={() => {
                const comp = compareAnamneses(selectedAnamnese1, selectedAnamnese2);
                setComparison(comp);
              }}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                px: 4,
                py: 1.5,
                fontWeight: 600
              }}
            >
              <CompareArrowsIcon sx={{ mr: 1 }} />
              Comparar Agora
            </Button>

            <Button 
              variant="outlined" 
              size="large"
              startIcon={<PrintIcon />}
              onClick={() => window.print()}
              disabled={!comparison}
              sx={{ px: 4, py: 1.5 }}
            >
              Imprimir Comparação
            </Button>

            <Button 
              variant="outlined" 
              size="large"
              startIcon={<DownloadIcon />}
              onClick={downloadPdf}
              disabled={!comparison}
              sx={{ px: 4, py: 1.5 }}
            >
              Download PDF
            </Button>

            <Button 
              variant="text" 
              size="large"
              onClick={() => navigate('/dashboard')}
              sx={{ px: 4, py: 1.5 }}
            >
              Voltar ao Dashboard
            </Button>
          </Box>
        </Paper>

        {/* Área de Comparação */}
        {comparison && (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }} className="print-container">
            {/* Timeline de Comparação */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ 
                mb: 3, 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center'
              }}>
                📊 Resultado da Comparação
              </Typography>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={selectedAnamnese3 ? 4 : 5}>
                  <Card sx={{ 
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    borderRadius: 2,
                    boxShadow: 3
                  }}>
                    <CardContent>
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <Avatar sx={{ bgcolor: '#667eea' }}>
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="overline" sx={{ color: '#666', fontWeight: 600 }}>
                            Paciente 1
                          </Typography>
                          <Typography variant="h6" sx={{ color: '#667eea', fontWeight: 700 }}>
                            {selectedAnamnese1.q01_nome}
                          </Typography>
                        </Box>
                      </Stack>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2" sx={{ color: '#555' }}>
                        📅 {formatDate(selectedAnamnese1.createdAt)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
                        🩺 {selectedAnamnese1.q15_queixa_principal?.substring(0, 50) || 'Sem queixa principal'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {!selectedAnamnese3 && (
                  <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
                    <CompareArrowsIcon sx={{ 
                      fontSize: 60, 
                      color: '#667eea',
                      animation: 'pulse 2s infinite'
                    }} />
                    <style>
                      {`
                        @keyframes pulse {
                          0%, 100% { opacity: 1; }
                          50% { opacity: 0.5; }
                        }
                      `}
                    </style>
                  </Grid>
                )}

                <Grid item xs={12} md={selectedAnamnese3 ? 4 : 5}>
                  <Card sx={{ 
                    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                    borderRadius: 2,
                    boxShadow: 3
                  }}>
                    <CardContent>
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <Avatar sx={{ bgcolor: '#764ba2' }}>
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="overline" sx={{ color: '#666', fontWeight: 600 }}>
                            Paciente 2
                          </Typography>
                          <Typography variant="h6" sx={{ color: '#764ba2', fontWeight: 700 }}>
                            {selectedAnamnese2.q01_nome}
                          </Typography>
                        </Box>
                      </Stack>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2" sx={{ color: '#555' }}>
                        📅 {formatDate(selectedAnamnese2.createdAt)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
                        🩺 {selectedAnamnese2.q15_queixa_principal?.substring(0, 50) || 'Sem queixa principal'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {selectedAnamnese3 && (
                  <Grid item xs={12} md={4}>
                    <Card sx={{ 
                      background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
                      borderRadius: 2,
                      boxShadow: 3
                    }}>
                      <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                          <Avatar sx={{ bgcolor: '#10b981' }}>
                            <PersonIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="overline" sx={{ color: '#666', fontWeight: 600 }}>
                              Paciente 3
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#10b981', fontWeight: 700 }}>
                              {selectedAnamnese3.q01_nome}
                            </Typography>
                          </Box>
                        </Stack>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="body2" sx={{ color: '#555' }}>
                          📅 {formatDate(selectedAnamnese3.createdAt)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
                          🩺 {selectedAnamnese3.q15_queixa_principal?.substring(0, 50) || 'Sem queixa principal'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Changes Summary */}
            {comparison.changes.length > 0 ? (
              <>
                <Typography variant="h5" sx={{ 
                  mb: 3, 
                  fontWeight: 700,
                  color: '#667eea',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  🔍 Mudanças Identificadas 
                  <Chip 
                    label={comparison.changes.length} 
                    color="primary" 
                    sx={{ fontWeight: 700 }}
                  />
                </Typography>

                <Grid container spacing={3}>
                  {comparison.changes.map((change, idx) => (
                    <Grid item xs={12} key={idx}>
                      <Card sx={{ 
                        borderRadius: 2,
                        border: '2px solid',
                        borderColor: change.improved === 'improved' ? '#4caf50' : 
                                    change.improved === 'worsened' ? '#f44336' : '#e0e0e0',
                        transition: 'all 0.3s',
                        '&:hover': { 
                          boxShadow: 6,
                          transform: 'translateY(-2px)'
                        }
                      }}>
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            {getChangeIcon(change)}
                            <Typography variant="h6" sx={{ ml: 2, flex: 1, fontWeight: 600 }}>
                              {getFieldLabel(change.field)}
                            </Typography>
                            {change.improved === 'improved' && (
                              <Chip 
                                label="✓ Melhora" 
                                sx={{ 
                                  bgcolor: '#4caf50', 
                                  color: 'white',
                                  fontWeight: 600 
                                }} 
                                size="small" 
                              />
                            )}
                            {change.improved === 'worsened' && (
                              <Chip 
                                label="↓ Piora" 
                                sx={{ 
                                  bgcolor: '#f44336', 
                                  color: 'white',
                                  fontWeight: 600 
                                }} 
                                size="small" 
                              />
                            )}
                            {!change.improved && (
                              <Chip 
                                label="→ Alterado" 
                                sx={{ 
                                  bgcolor: '#9e9e9e', 
                                  color: 'white',
                                  fontWeight: 600 
                                }} 
                                size="small" 
                              />
                            )}
                          </Box>

                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={5}>
                              <Box sx={{ 
                                p: 2.5, 
                                background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
                                borderRadius: 2,
                                border: '1px solid #d0d7de'
                              }}>
                                <Typography variant="caption" sx={{ 
                                  color: '#666', 
                                  display: 'block', 
                                  mb: 1,
                                  fontWeight: 600,
                                  textTransform: 'uppercase',
                                  letterSpacing: 0.5
                                }}>
                                  {selectedAnamnese1.q01_nome}:
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                  {formatValue(change.previous)}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={2} sx={{ 
                              textAlign: 'center', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center' 
                            }}>
                              <ArrowForwardIcon sx={{ 
                                color: change.improved === 'improved' ? '#4caf50' : 
                                       change.improved === 'worsened' ? '#f44336' : '#667eea',
                                fontSize: 32
                              }} />
                            </Grid>
                            <Grid item xs={12} md={5}>
                              <Box sx={{ 
                                p: 2.5, 
                                background: 'linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%)',
                                borderRadius: 2,
                                border: '1px solid #ffd0d0'
                              }}>
                                <Typography variant="caption" sx={{ 
                                  color: '#666', 
                                  display: 'block', 
                                  mb: 1,
                                  fontWeight: 600,
                                  textTransform: 'uppercase',
                                  letterSpacing: 0.5
                                }}>
                                  {selectedAnamnese2.q01_nome}:
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                  {formatValue(change.current)}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <Alert severity="info" sx={{ mt: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Nenhuma Mudança Significativa
                </Typography>
                <Typography>
                  Não foram identificadas mudanças nos campos comparados entre as duas anamneses.
                </Typography>
              </Alert>
            )}

            {/* Comparação 1 vs 3 (se existir) */}
            {comparison2 && selectedAnamnese3 && (
              <>
                <Divider sx={{ my: 4 }} />
                
                <Typography variant="h5" sx={{ 
                  mb: 3, 
                  fontWeight: 700,
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  🔍 Comparação: {selectedAnamnese1.q01_nome} vs {selectedAnamnese3.q01_nome}
                  <Chip 
                    label={comparison2.changes.length} 
                    sx={{ bgcolor: '#10b981', color: 'white', fontWeight: 700 }}
                  />
                </Typography>

                {comparison2.changes.length > 0 ? (
                  <Grid container spacing={3}>
                    {comparison2.changes.slice(0, 5).map((change, idx) => (
                      <Grid item xs={12} key={idx}>
                        <Card sx={{ 
                          borderRadius: 2,
                          border: '2px solid',
                          borderColor: change.improved === 'improved' ? '#10b981' : 
                                      change.improved === 'worsened' ? '#f44336' : '#e0e0e0',
                          transition: 'all 0.3s',
                          '&:hover': { boxShadow: 6 }
                        }}>
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              {getChangeIcon(change)}
                              <Typography variant="h6" sx={{ ml: 2, flex: 1, fontWeight: 600 }}>
                                {getFieldLabel(change.field)}
                              </Typography>
                              {change.improved === 'improved' && (
                                <Chip label="✓ Melhora" sx={{ bgcolor: '#10b981', color: 'white', fontWeight: 600 }} size="small" />
                              )}
                              {change.improved === 'worsened' && (
                                <Chip label="↓ Piora" sx={{ bgcolor: '#f44336', color: 'white', fontWeight: 600 }} size="small" />
                              )}
                            </Box>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={12} md={5}>
                                <Box sx={{ p: 2.5, background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)', borderRadius: 2 }}>
                                  <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 1, fontWeight: 600 }}>
                                    {selectedAnamnese1.q01_nome}:
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {formatValue(change.previous)}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={12} md={2} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ArrowForwardIcon sx={{ color: '#10b981', fontSize: 32 }} />
                              </Grid>
                              <Grid item xs={12} md={5}>
                                <Box sx={{ p: 2.5, background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)', borderRadius: 2 }}>
                                  <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 1, fontWeight: 600 }}>
                                    {selectedAnamnese3.q01_nome}:
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {formatValue(change.current)}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Alert severity="info" sx={{ borderRadius: 2 }}>
                    <Typography>Nenhuma mudança significativa entre estes pacientes.</Typography>
                  </Alert>
                )}
              </>
            )}

            {/* Treatment Evolution */}
            <Divider sx={{ my: 4 }} />
            
            <Typography variant="h5" sx={{ 
              mb: 3, 
              fontWeight: 700,
              color: '#667eea',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              💊 Tratamento e Medicamentos de Todos os Pacientes
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={selectedAnamnese3 ? 4 : 6}>
                <Card sx={{
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
                  borderRadius: 2,
                  boxShadow: 2
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#667eea' }}>
                        {selectedAnamnese1.q01_nome}
                      </Typography>
                    </Stack>
                    <Divider sx={{ mb: 2 }} />
                    {selectedAnamnese1.medicamentosEmUso ? (
                      <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                        {formatValue(selectedAnamnese1.medicamentosEmUso)}
                      </Typography>
                    ) : (
                      <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#999' }}>
                        Nenhum medicamento registrado
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={selectedAnamnese3 ? 4 : 6}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%)',
                  borderRadius: 2,
                  boxShadow: 2
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#764ba2' }}>
                        {selectedAnamnese2.q01_nome}
                      </Typography>
                    </Stack>
                    <Divider sx={{ mb: 2 }} />
                    {selectedAnamnese2.medicamentosEmUso ? (
                      <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                        {formatValue(selectedAnamnese2.medicamentosEmUso)}
                      </Typography>
                    ) : (
                      <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#999' }}>
                        Nenhum medicamento registrado
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {selectedAnamnese3 && (
                <Grid item xs={12} md={4}>
                  <Card sx={{ 
                    background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
                    borderRadius: 2,
                    boxShadow: 2
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#10b981' }}>
                          {selectedAnamnese3.q01_nome}
                        </Typography>
                      </Stack>
                      <Divider sx={{ mb: 2 }} />
                      {selectedAnamnese3.medicamentosEmUso ? (
                        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                          {formatValue(selectedAnamnese3.medicamentosEmUso)}
                        </Typography>
                      ) : (
                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#999' }}>
                          Nenhum medicamento registrado
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>

            {/* Resumo Estatístico */}
            <Divider sx={{ my: 4 }} />
            
            <Box sx={{ 
              p: 3, 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 2,
              color: 'white'
            }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                📈 Resumo Estatístico das Comparações
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={selectedAnamnese3 ? 3 : 4}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {comparison.changes.length}
                    </Typography>
                    <Typography variant="body2">
                      Mudanças (1 vs 2)
                    </Typography>
                  </Box>
                </Grid>
                {selectedAnamnese3 && comparison2 && (
                  <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(16,185,129,0.3)', borderRadius: 1 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700 }}>
                        {comparison2.changes.length}
                      </Typography>
                      <Typography variant="body2">
                        Mudanças (1 vs 3)
                      </Typography>
                    </Box>
                  </Grid>
                )}
                <Grid item xs={12} md={selectedAnamnese3 ? 3 : 4}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(76,175,80,0.3)', borderRadius: 1 }}>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {comparison.changes.filter(c => c.improved === 'improved').length + (comparison2 ? comparison2.changes.filter(c => c.improved === 'improved').length : 0)}
                    </Typography>
                    <Typography variant="body2">
                      Total de Melhorias
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={selectedAnamnese3 ? 3 : 4}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(244,67,54,0.3)', borderRadius: 1 }}>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {comparison.changes.filter(c => c.improved === 'worsened').length + (comparison2 ? comparison2.changes.filter(c => c.improved === 'worsened').length : 0)}
                    </Typography>
                    <Typography variant="body2">
                      Total de Pioras
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* NOVA SEÇÃO: Análise Detalhada por Categoria */}
            <Divider sx={{ my: 4 }} />
            
            {/* Indicadores de Evolução */}
            <Typography variant="h5" sx={{ 
              mb: 3, 
              fontWeight: 700,
              color: '#667eea',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              📊 Indicadores de Evolução do Paciente
            </Typography>

            <Grid container spacing={2} sx={{ mb: 4 }}>
              {/* Taxa de Melhoria Geral */}
              <Grid item xs={12} md={3}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                  color: 'white',
                  textAlign: 'center',
                  p: 2
                }}>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {comparison.changes.length > 0 
                      ? Math.round((comparison.changes.filter(c => c.improved === 'improved').length / comparison.changes.length) * 100)
                      : 0}%
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Taxa de Melhoria
                  </Typography>
                </Card>
              </Grid>

              {/* Sintomas Reduzidos */}
              {(() => {
                const sintomasChange = comparison.changes.find(c => c.fieldKey === 'sintomas_selecionados');
                if (sintomasChange) {
                  const prevCount = sintomasChange.previous.split(',').filter(s => s.trim()).length;
                  const currCount = sintomasChange.current.split(',').filter(s => s.trim()).length;
                  const reduction = prevCount - currCount;
                  
                  return (
                    <Grid item xs={12} md={3}>
                      <Card sx={{ 
                        background: 'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)',
                        color: 'white',
                        textAlign: 'center',
                        p: 2
                      }}>
                        <Typography variant="h3" sx={{ fontWeight: 700 }}>
                          {reduction >= 0 ? `-${reduction}` : `+${Math.abs(reduction)}`}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Sintomas {reduction >= 0 ? 'Reduzidos' : 'Novos'}
                        </Typography>
                      </Card>
                    </Grid>
                  );
                }
                return null;
              })()}

              {/* Carências Resolvidas */}
              {(() => {
                const carenciasChange = comparison.changes.find(c => c.fieldKey === 'carencias_nutricionais');
                if (carenciasChange) {
                  const prevMatch = carenciasChange.previous.match(/(\d+)/);
                  const currMatch = carenciasChange.current.match(/(\d+)/);
                  const prevCount = prevMatch ? parseInt(prevMatch[1]) : 0;
                  const currCount = currMatch ? parseInt(currMatch[1]) : 0;
                  const resolved = prevCount - currCount;
                  
                  return (
                    <Grid item xs={12} md={3}>
                      <Card sx={{ 
                        background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
                        color: 'white',
                        textAlign: 'center',
                        p: 2
                      }}>
                        <Typography variant="h3" sx={{ fontWeight: 700 }}>
                          {resolved >= 0 ? `-${resolved}` : `+${Math.abs(resolved)}`}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Carências {resolved >= 0 ? 'Resolvidas' : 'Novas'}
                        </Typography>
                      </Card>
                    </Grid>
                  );
                }
                return null;
              })()}

              {/* Sinais Clínicos Melhorados */}
              {(() => {
                const clinicalChanges = comparison.changes.filter(c => 
                  c.fieldKey && c.fieldKey.startsWith('sinais_clinicos_') && c.improved === 'improved'
                );
                if (clinicalChanges.length > 0) {
                  return (
                    <Grid item xs={12} md={3}>
                      <Card sx={{ 
                        background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
                        color: 'white',
                        textAlign: 'center',
                        p: 2
                      }}>
                        <Typography variant="h3" sx={{ fontWeight: 700 }}>
                          {clinicalChanges.length}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Sinais Clínicos Melhorados
                        </Typography>
                      </Card>
                    </Grid>
                  );
                }
                return null;
              })()}

              {/* Bem-estar Mental */}
              {(() => {
                const mentalChanges = comparison.changes.filter(c => 
                  (c.fieldKey === 'nivel_estresse_detalhado' || 
                   c.fieldKey === 'nivel_ansiedade_detalhado' ||
                   c.fieldKey === 'nivel_energia') && 
                  c.improved === 'improved'
                );
                if (mentalChanges.length > 0) {
                  return (
                    <Grid item xs={12} md={3}>
                      <Card sx={{ 
                        background: 'linear-gradient(135deg, #00bcd4 0%, #4dd0e1 100%)',
                        color: 'white',
                        textAlign: 'center',
                        p: 2
                      }}>
                        <Typography variant="h3" sx={{ fontWeight: 700 }}>
                          {mentalChanges.length}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Aspectos Mentais Melhorados
                        </Typography>
                      </Card>
                    </Grid>
                  );
                }
                return null;
              })()}
            </Grid>

            <Divider sx={{ my: 4 }} />
            
            <Typography variant="h5" sx={{ 
              mb: 3, 
              fontWeight: 700,
              color: '#667eea',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              📋 Análise Detalhada por Categoria
            </Typography>

            <Grid container spacing={3}>
              {/* Sintomas e Carências */}
              {(() => {
                const sintomasChanges = comparison.changes.filter(c => 
                  c.fieldKey === 'sintomas_selecionados' || c.fieldKey === 'carencias_nutricionais'
                );
                if (sintomasChanges.length > 0) {
                  return (
                    <Grid item xs={12} md={6}>
                      <Card sx={{ 
                        background: 'linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%)',
                        borderRadius: 2,
                        height: '100%'
                      }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#d32f2f' }}>
                            💊 Sintomas e Carências
                          </Typography>
                          <Divider sx={{ mb: 2 }} />
                          {sintomasChanges.map((change, idx) => (
                            <Box key={idx} sx={{ mb: 2 }}>
                              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {change.field}
                                </Typography>
                                {change.improved && (
                                  <Chip 
                                    label={change.improved === 'improved' ? '✓ Melhora' : '↓ Piora'} 
                                    size="small"
                                    sx={{ 
                                      bgcolor: change.improved === 'improved' ? '#4caf50' : '#f44336',
                                      color: 'white',
                                      fontSize: '0.7rem'
                                    }} 
                                  />
                                )}
                              </Stack>
                              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                                {change.previous} → {change.current}
                              </Typography>
                            </Box>
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                }
                return null;
              })()}

              {/* Sinais Vitais */}
              {(() => {
                const vitalChanges = comparison.changes.filter(c => 
                  c.fieldKey && c.fieldKey.startsWith('vital_')
                );
                if (vitalChanges.length > 0) {
                  return (
                    <Grid item xs={12} md={6}>
                      <Card sx={{ 
                        background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
                        borderRadius: 2,
                        height: '100%'
                      }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#2e7d32' }}>
                            📊 Sinais Vitais
                          </Typography>
                          <Divider sx={{ mb: 2 }} />
                          {vitalChanges.map((change, idx) => (
                            <Box key={idx} sx={{ mb: 2 }}>
                              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {change.field}
                                </Typography>
                                {change.improved && (
                                  <Chip 
                                    label={change.improved === 'improved' ? '✓ Melhora' : '↓ Piora'} 
                                    size="small"
                                    sx={{ 
                                      bgcolor: change.improved === 'improved' ? '#4caf50' : '#f44336',
                                      color: 'white',
                                      fontSize: '0.7rem'
                                    }} 
                                  />
                                )}
                              </Stack>
                              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                                {change.previous} → {change.current}
                              </Typography>
                            </Box>
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                }
                return null;
              })()}

              {/* Sinais Clínicos */}
              {(() => {
                const clinicalChanges = comparison.changes.filter(c => 
                  c.fieldKey && c.fieldKey.startsWith('sinais_clinicos_')
                );
                if (clinicalChanges.length > 0) {
                  return (
                    <Grid item xs={12} md={6}>
                      <Card sx={{ 
                        background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                        borderRadius: 2,
                        height: '100%'
                      }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#e65100' }}>
                            👁️ Sinais Clínicos
                          </Typography>
                          <Divider sx={{ mb: 2 }} />
                          {clinicalChanges.map((change, idx) => (
                            <Box key={idx} sx={{ mb: 2 }}>
                              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {change.field}
                                </Typography>
                                {change.improved && (
                                  <Chip 
                                    label={change.improved === 'improved' ? '✓ Melhora' : '↓ Piora'} 
                                    size="small"
                                    sx={{ 
                                      bgcolor: change.improved === 'improved' ? '#4caf50' : '#f44336',
                                      color: 'white',
                                      fontSize: '0.7rem'
                                    }} 
                                  />
                                )}
                              </Stack>
                              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                                {change.previous} → {change.current}
                              </Typography>
                            </Box>
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                }
                return null;
              })()}

              {/* Histórico de Saúde */}
              {(() => {
                const healthChanges = comparison.changes.filter(c => 
                  c.fieldKey === 'doencas_familiares' || 
                  c.fieldKey === 'doencas_cronicas_detalhadas' ||
                  c.fieldKey && (c.fieldKey.includes('qualidade_sono') || c.fieldKey.includes('nivel_'))
                );
                if (healthChanges.length > 0) {
                  return (
                    <Grid item xs={12} md={6}>
                      <Card sx={{ 
                        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                        borderRadius: 2,
                        height: '100%'
                      }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1565c0' }}>
                            🏥 Histórico e Bem-Estar
                          </Typography>
                          <Divider sx={{ mb: 2 }} />
                          {healthChanges.map((change, idx) => (
                            <Box key={idx} sx={{ mb: 2 }}>
                              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {change.field}
                                </Typography>
                                {change.improved && (
                                  <Chip 
                                    label={change.improved === 'improved' ? '✓ Melhora' : '↓ Piora'} 
                                    size="small"
                                    sx={{ 
                                      bgcolor: change.improved === 'improved' ? '#4caf50' : '#f44336',
                                      color: 'white',
                                      fontSize: '0.7rem'
                                    }} 
                                  />
                                )}
                              </Stack>
                              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                                {change.previous} → {change.current}
                              </Typography>
                            </Box>
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                }
                return null;
              })()}

              {/* Estilo de Vida e Hábitos */}
              {(() => {
                const lifestyleChanges = comparison.changes.filter(c => 
                  c.fieldKey && (
                    c.fieldKey.includes('dificuldades_dormir') ||
                    c.fieldKey.includes('qualidade_alimentacao') ||
                    c.fieldKey.includes('funcionamento_intestinal') ||
                    c.fieldKey.includes('dores_frequentes')
                  )
                );
                if (lifestyleChanges.length > 0) {
                  return (
                    <Grid item xs={12} md={6}>
                      <Card sx={{ 
                        background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
                        borderRadius: 2,
                        height: '100%'
                      }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#6a1b9a' }}>
                            🌿 Estilo de Vida
                          </Typography>
                          <Divider sx={{ mb: 2 }} />
                          {lifestyleChanges.map((change, idx) => (
                            <Box key={idx} sx={{ mb: 2 }}>
                              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {change.field}
                                </Typography>
                                {change.improved && (
                                  <Chip 
                                    label={change.improved === 'improved' ? '✓ Melhora' : '↓ Piora'} 
                                    size="small"
                                    sx={{ 
                                      bgcolor: change.improved === 'improved' ? '#4caf50' : '#f44336',
                                      color: 'white',
                                      fontSize: '0.7rem'
                                    }} 
                                  />
                                )}
                              </Stack>
                              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                                {change.previous} → {change.current}
                              </Typography>
                            </Box>
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                }
                return null;
              })()}
            </Grid>
          </Paper>
        )}

        {/* Botões finais (não imprime) */}
        {comparison && (
          <Box className="no-print" sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/dashboard')}
              sx={{ px: 4, py: 1.5 }}
            >
              Voltar para Dashboard
            </Button>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => {
                if (selectedAnamnese1?.id) {
                  navigate(`/anamnese/${selectedAnamnese1.id}`);
                }
              }}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                px: 4,
                py: 1.5
              }}
            >
              Ver Anamnese Completa
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}
