import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl } from '../components/PrintTemplate';
import { extractSymptoms as libExtractSymptoms, computeConsolidatedSummary as libComputeConsolidatedSummary, buildConsolidatedHtml, consolidatedToCsvRow } from '../lib/symptoms';
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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  FiberManualRecord as DotIcon,
  MedicalServices as MedicalIcon,
  Psychology as PsychologyIcon,
  Restaurant as RestaurantIcon,
  Hotel as HotelIcon,
  FitnessCenter as FitnessIcon,
  Healing as HealingIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Warning as WarningIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { appendHistoricoEntry } from '../lib/historicoUtils';

export default function PatientSymptoms() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [allAnamneses, setAllAnamneses] = useState([]);
  const [selectedPatientName, setSelectedPatientName] = useState('');
  const [patientAnamneses, setPatientAnamneses] = useState([]);
  const [uniquePatients, setUniquePatients] = useState([]);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSaveHistorico = () => {
    const latest = patientAnamneses && patientAnamneses[0];
    if (!latest) return;
    const consolidated = libComputeConsolidatedSummary(patientAnamneses);
    const total = consolidated ? Object.values(consolidated).filter(Boolean).length : 0;
    appendHistoricoEntry(latest.id, {
      tipo: 'sintomas',
      titulo: '🩺 Sintomas Consolidados',
      resumo: `${total} campo(s) de sintomas registrados`,
      pagina: `/patient-symptoms/${latest.id}`,
    });
    setSavedMsg('Sintomas salvos no histórico!');
    setTimeout(() => setSavedMsg(''), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadPdf = async () => {
    const element = document.querySelector('.print-container');
    try {
      const bodyHtml = element.innerHTML;
      const qr = `${window.location.origin}/paciente/${selectedPatientName}`;
      const qrUrl = await generateQrDataUrl(qr);
      const title = `sintomas_${selectedPatientName?.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}`;
      const html = await buildLetterheadHtml({ title, bodyHtml, qrUrl });
      await downloadPdfFromHtml(html, `${title}.pdf`);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      window.print();
    }
  };

  useEffect(() => {
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    setAllAnamneses(anamneses);

    // Extrair lista única de pacientes
    const patients = [...new Set(anamneses.map(a => a.q01_nome))].filter(Boolean);
    setUniquePatients(patients.sort());

    if (id) {
      // Se tem ID, buscar pelo ID
      const anam = anamneses.find(a => String(a.id) === String(id));
      if (anam && anam.q01_nome) {
        setSelectedPatientName(anam.q01_nome);
      }
    } else if (patients.length > 0) {
      // Selecionar o primeiro paciente
      setSelectedPatientName(patients[0]);
    }
  }, [id]);

  useEffect(() => {
    if (selectedPatientName) {
      const filtered = allAnamneses
        .filter(a => a.q01_nome === selectedPatientName)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPatientAnamneses(filtered);
    } else {
      setPatientAnamneses([]);
    }
  }, [selectedPatientName, allAnamneses]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Data não informada';
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const Field = ({ label, value }) => (
    <Box sx={{ mb: 1 }}>
      <Typography variant="caption" color="text.secondary" display="block">
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: value ? 600 : 'normal', color: value ? 'text.primary' : 'text.disabled' }}>
        {value || 'Não informado'}
      </Typography>
    </Box>
  );

  const computeConsolidatedSummary = libComputeConsolidatedSummary;

  const downloadConsolidatedPdf = async () => {
    const consolidated = computeConsolidatedSummary(patientAnamneses);
    if (!consolidated) return;
    try {
      // Build a simple HTML body using similar Field layout for printing
      const bodyHtml = `
        <div style="font-family:sans-serif;">
          <h2>Resumo Consolidado de Sintomas - ${selectedPatientName}</h2>
          <hr />
          <div>
            <strong>Queixa Principal: </strong>${consolidated.queixa || 'Não informado'}<br/>
            <strong>Tempo: </strong>${consolidated.tempo || 'Não informado'}<br/>
          </div>
          <div style="margin-top:10px">
            <strong>Condições médicas:</strong><br/>
            <div>Doenças Crônicas: ${consolidated.doencasCronicas || 'Não informado'}</div>
            <div>Alergias: ${consolidated.alergias || 'Não informado'}</div>
            <div>Cirurgias: ${consolidated.cirurgias || 'Não informado'}</div>
            <div>Hospitalizações: ${consolidated.hospitalizacoes || 'Não informado'}</div>
            <div>Medicamentos: ${consolidated.medicamentos || 'Não informado'}</div>
          </div>
          <div style="margin-top:10px">
            <strong>Hábitos e Alimentação:</strong><br/>
            <div>Tabagismo: ${consolidated.tabagismo || 'Não informado'}</div>
            <div>Etilismo: ${consolidated.etilismo || 'Não informado'}</div>
            <div>Atividade física: ${consolidated.atividadeFisica || 'Não informado'} (${consolidated.frequenciaExercicio || 'Frequência não informada'})</div>
            <div>Café da manhã: ${consolidated.cafeManha || 'Não informado'}</div>
            <div>Almoço: ${consolidated.almoco || 'Não informado'}</div>
            <div>Jantar: ${consolidated.jantar || 'Não informado'}</div>
            <div>Lanches: ${consolidated.lanches || 'Não informado'}</div>
            <div>Água (copos/dia): ${consolidated.agua || 'Não informado'}</div>
            <div>Restrições alimentares: ${consolidated.restricoes || 'Não informado'}</div>
          </div>
          <div style="margin-top:10px">
            <strong>Sintomas (sintomas gerais):</strong><br/>
            <div>Dores: ${consolidated.dores || 'Não informado'}</div>
            <div>Cansaço: ${consolidated.cansaco || 'Não informado'}</div>
            <div>Estresse: ${consolidated.estresse || 'Não informado'}</div>
            <div>Ansiedade: ${consolidated.ansiedade || 'Não informado'}</div>
            <div>Observações: ${consolidated.observacoes || 'Não informado'}</div>
          </div>
        </div>`;

      const qr = `${window.location.origin}/paciente/${selectedPatientName}`;
      const qrUrl = await generateQrDataUrl(qr);
      const title = `sintomas_consolidado_${selectedPatientName?.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}`;
      const html = await buildLetterheadHtml({ title, bodyHtml, qrUrl });
      await downloadPdfFromHtml(html, `${title}.pdf`);
    } catch (err) {
      console.error('Erro ao gerar PDF consolidado:', err);
      window.print();
    }
  };

  const downloadConsolidatedCsv = () => {
    const consolidated = computeConsolidatedSummary(patientAnamneses);
    if (!consolidated) return;
    const latest = patientAnamneses[0];
    const { headers, row } = consolidatedToCsvRow(consolidated, { patientId: latest?.id, patientName: selectedPatientName, createdAt: latest?.createdAt });
    const csv = [headers.join(','), row].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sintomas_consolidado_${selectedPatientName?.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const extractSymptoms = libExtractSymptoms;

  if (allAnamneses.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Alert severity="info">
            <Typography variant="h6" sx={{ mb: 2 }}>
              Nenhuma Anamnese Encontrada
            </Typography>
            <Typography>
              Não há anamneses registradas ainda. Crie uma anamnese para começar.
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={() => navigate('/')}>
                Nova Anamnese
              </Button>
              <Button variant="outlined" onClick={() => navigate('/dashboard')}>
                Interagentes
              </Button>
            </Box>
          </Alert>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }} className="print-container">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <MedicalIcon /> Sintomas e Queixas
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#666' }}>
            Histórico completo de sintomas e queixas relatados nas anamneses
          </Typography>
        </Box>

        {/* Patient Selector */}
        <Box sx={{ mb: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Selecionar Paciente</InputLabel>
            <Select
              value={selectedPatientName}
              label="Selecionar Paciente"
              onChange={(e) => setSelectedPatientName(e.target.value)}
            >
              {uniquePatients.map((name) => (
                <MenuItem key={name} value={name}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon fontSize="small" />
                    {name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Patient Info */}
        {patientAnamneses.length > 0 && (
          <Card sx={{ mb: 4, bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">
                    Paciente
                  </Typography>
                  <Typography variant="h6">{selectedPatientName}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Total de Anamneses
                  </Typography>
                  <Typography variant="h6">{patientAnamneses.length}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Última Consulta
                  </Typography>
                  <Typography variant="h6">{formatDate(patientAnamneses[0]?.createdAt)}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Resumo Consolidado */}
        {patientAnamneses.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Card sx={{ mb: 2, bgcolor: '#f6f9f8' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#1976d2', mb: 1 }}>
                  Resumo Consolidado de Sintomas
                </Typography>
                {(() => {
                  const summary = computeConsolidatedSummary(patientAnamneses);
                  if (!summary) return null;
                  return (
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={8}>
                        <Field label="Queixa Principal" value={summary.queixa} />
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Field label="Tempo" value={summary.tempo} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field label="Doenças Crônicas" value={summary.doencasCronicas} />
                        <Field label="Alergias" value={summary.alergias} />
                        <Field label="Medicamentos" value={summary.medicamentos} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field label="Cirurgias" value={summary.cirurgias} />
                        <Field label="Hospitalizações" value={summary.hospitalizacoes} />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Field label="Tabagismo" value={summary.tabagismo} />
                        <Field label="Etilismo" value={summary.etilismo} />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Field label="Atividade Física" value={`${summary.atividadeFisica || ''} ${summary.frequenciaExercicio ? `(${summary.frequenciaExercicio})` : ''}`} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field label="Horas de Sono" value={summary.horasSono} />
                        <Field label="Qualidade do Sono" value={summary.qualidadeSono} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field label="Café da Manhã" value={summary.cafeManha} />
                        <Field label="Almoço" value={summary.almoco} />
                        <Field label="Jantar" value={summary.jantar} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field label="Lanches" value={summary.lanches} />
                        <Field label="Água (copos/dia)" value={summary.agua} />
                        <Field label="Restrições Alimentares" value={summary.restricoes} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field label="Dores" value={summary.dores} />
                        <Field label="Cansaço" value={summary.cansaco} />
                        <Field label="Estresse" value={summary.estresse} />
                        <Field label="Ansiedade" value={summary.ansiedade} />
                      </Grid>
                      <Grid item xs={12}>
                        <Field label="Observações" value={summary.observacoes} />
                      </Grid>
                    </Grid>
                  );
                })()}
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Anamneses History */}
        {patientAnamneses.length === 0 ? (
          <Alert severity="warning">
            Nenhuma anamnese encontrada para este paciente.
          </Alert>
        ) : (
          <Box>
            <Typography variant="h5" sx={{ mb: 3, color: '#1976d2' }}>
              Histórico de Consultas ({patientAnamneses.length})
            </Typography>

            {patientAnamneses.map((anamnese, index) => {
              const symptoms = extractSymptoms(anamnese);
              
              return (
                <Accordion key={anamnese.id} defaultExpanded={index === 0}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <TimeIcon color="primary" />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6">
                          Consulta de {formatDate(anamnese.createdAt)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {symptoms.queixa ? symptoms.queixa.substring(0, 80) + '...' : 'Sem queixa registrada'}
                        </Typography>
                      </Box>
                      {index === 0 && (
                        <Chip label="Mais Recente" color="primary" size="small" />
                      )}
                    </Box>
                  </AccordionSummary>
                  
                  <AccordionDetails>
                    <Grid container spacing={3}>
                      {/* Queixa Principal */}
                      {symptoms.queixa && (
                        <Grid item xs={12}>
                          <Card variant="outlined" sx={{ bgcolor: '#fff3e0', borderColor: '#ff9800' }}>
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <WarningIcon sx={{ color: '#ff9800' }} />
                                <Typography variant="h6" sx={{ color: '#ff9800' }}>
                                  Queixa Principal
                                </Typography>
                              </Box>
                              <Typography variant="body1" sx={{ mb: 2 }}>
                                {symptoms.queixa}
                              </Typography>
                              {symptoms.tempo && (
                                <Chip 
                                  label={`Tempo: ${symptoms.tempo}`} 
                                  size="small" 
                                  sx={{ bgcolor: 'white' }}
                                />
                              )}
                            </CardContent>
                          </Card>
                        </Grid>
                      )}

                      {/* Condições Médicas */}
                      <Grid item xs={12} md={6}>
                        <Card variant="outlined">
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                              <MedicalIcon color="primary" />
                              <Typography variant="h6">Condições Médicas</Typography>
                            </Box>
                            <List dense>
                              {symptoms.doencasCronicas && (
                                <ListItem>
                                  <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                  <ListItemText 
                                    primary="Doenças Crônicas" 
                                    secondary={symptoms.doencasCronicas}
                                  />
                                </ListItem>
                              )}
                              {symptoms.alergias && (
                                <ListItem>
                                  <ListItemIcon><DotIcon fontSize="small" color="error" /></ListItemIcon>
                                  <ListItemText 
                                    primary="Alergias" 
                                    secondary={symptoms.alergias}
                                  />
                                </ListItem>
                              )}
                              {symptoms.cirurgias && (
                                <ListItem>
                                  <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                  <ListItemText 
                                    primary="Cirurgias" 
                                    secondary={symptoms.cirurgias}
                                  />
                                </ListItem>
                              )}
                              {symptoms.medicamentos && (
                                <ListItem>
                                  <ListItemIcon><DotIcon fontSize="small" color="success" /></ListItemIcon>
                                  <ListItemText 
                                    primary="Medicamentos em Uso" 
                                    secondary={symptoms.medicamentos}
                                  />
                                </ListItem>
                              )}
                              {symptoms.hospitalizacoes && (
                                <ListItem>
                                  <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                  <ListItemText
                                    primary="Hospitalizações"
                                    secondary={symptoms.hospitalizacoes}
                                  />
                                </ListItem>
                              )}
                            </List>
                          </CardContent>
                        </Card>
                      </Grid>

                      {/* Alimentação */}
                      {(symptoms.cafeManha || symptoms.almoco || symptoms.jantar || symptoms.lanches || symptoms.restricoes || symptoms.agua) && (
                        <Grid item xs={12} md={6}>
                          <Card variant="outlined">
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <RestaurantIcon color="primary" />
                                <Typography variant="h6">Alimentação</Typography>
                              </Box>
                              <List dense>
                                {symptoms.cafeManha && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText primary="Café da Manhã" secondary={symptoms.cafeManha} />
                                  </ListItem>
                                )}
                                {symptoms.almoco && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText primary="Almoço" secondary={symptoms.almoco} />
                                  </ListItem>
                                )}
                                {symptoms.jantar && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText primary="Jantar" secondary={symptoms.jantar} />
                                  </ListItem>
                                )}
                                {symptoms.lanches && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText primary="Lanches" secondary={symptoms.lanches} />
                                  </ListItem>
                                )}
                                {symptoms.agua && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText primary="Copos de água / dia" secondary={symptoms.agua} />
                                  </ListItem>
                                )}
                                {symptoms.restricoes && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText primary="Restrições alimentares" secondary={symptoms.restricoes} />
                                  </ListItem>
                                )}
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>
                      )}

                      {/* Hábitos de Vida */}
                      <Grid item xs={12} md={6}>
                        <Card variant="outlined">
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                              <FitnessIcon color="primary" />
                              <Typography variant="h6">Hábitos de Vida</Typography>
                            </Box>
                            <List dense>
                              {symptoms.tabagismo && (
                                <ListItem>
                                  <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                  <ListItemText 
                                    primary="Tabagismo" 
                                    secondary={symptoms.tabagismo}
                                  />
                                </ListItem>
                              )}
                              {symptoms.etilismo && (
                                <ListItem>
                                  <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                  <ListItemText 
                                    primary="Etilismo" 
                                    secondary={symptoms.etilismo}
                                  />
                                </ListItem>
                              )}
                              {symptoms.atividadeFisica && (
                                <ListItem>
                                  <ListItemIcon><DotIcon fontSize="small" color="success" /></ListItemIcon>
                                  <ListItemText 
                                    primary="Atividade Física" 
                                    secondary={symptoms.atividadeFisica}
                                  />
                                </ListItem>
                              )}
                              {symptoms.frequenciaExercicio && (
                                <ListItem>
                                  <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                  <ListItemText
                                    primary="Frequência Exercício"
                                    secondary={symptoms.frequenciaExercicio}
                                  />
                                </ListItem>
                              )}
                            </List>
                          </CardContent>
                        </Card>
                      </Grid>

                      {/* Sistema Digestivo */}
                      {(symptoms.intestino || symptoms.gases || symptoms.azia || symptoms.nauseas) && (
                        <Grid item xs={12} md={6}>
                          <Card variant="outlined">
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <RestaurantIcon color="primary" />
                                <Typography variant="h6">Sistema Digestivo</Typography>
                              </Box>
                              <List dense>
                                {symptoms.intestino && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText 
                                      primary="Intestino" 
                                      secondary={symptoms.intestino}
                                    />
                                  </ListItem>
                                )}
                                {symptoms.gases && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText 
                                      primary="Gases" 
                                      secondary={symptoms.gases}
                                    />
                                  </ListItem>
                                )}
                                {symptoms.azia && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText 
                                      primary="Azia" 
                                      secondary={symptoms.azia}
                                    />
                                  </ListItem>
                                )}
                                {symptoms.nauseas && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText 
                                      primary="Náuseas" 
                                      secondary={symptoms.nauseas}
                                    />
                                  </ListItem>
                                )}
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>
                      )}

                      {/* Sono e Repouso */}
                      {(symptoms.horasSono || symptoms.qualidadeSono || symptoms.acordaNoite) && (
                        <Grid item xs={12} md={6}>
                          <Card variant="outlined">
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <HotelIcon color="primary" />
                                <Typography variant="h6">Sono e Repouso</Typography>
                              </Box>
                              <List dense>
                                {symptoms.horasSono && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText 
                                      primary="Horas de Sono" 
                                      secondary={symptoms.horasSono}
                                    />
                                  </ListItem>
                                )}
                                {symptoms.qualidadeSono && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText 
                                      primary="Qualidade" 
                                      secondary={symptoms.qualidadeSono}
                                    />
                                  </ListItem>
                                )}
                                {symptoms.acordaNoite && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText 
                                      primary="Acorda à Noite" 
                                      secondary={symptoms.acordaNoite}
                                    />
                                  </ListItem>
                                )}
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>
                      )}

                      {/* Tratamentos Anteriores */}
                      {symptoms.tratamentos && (
                        <Grid item xs={12}>
                          <Card variant="outlined" sx={{ bgcolor: '#e8f5e9' }}>
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <HealingIcon color="success" />
                                <Typography variant="h6">Tratamentos Anteriores</Typography>
                              </Box>
                              <Typography variant="body2">
                                {symptoms.tratamentos}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      )}

                      {/* Outros Sintomas e Observações */}
                      {(symptoms.dores || symptoms.cansaco || symptoms.estresse || symptoms.ansiedade || symptoms.observacoes) && (
                        <Grid item xs={12} md={6}>
                          <Card variant="outlined">
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <WarningIcon color="primary" />
                                <Typography variant="h6">Outros Sintomas e Observações</Typography>
                              </Box>
                              <List dense>
                                {symptoms.dores && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText primary="Dores" secondary={symptoms.dores} />
                                  </ListItem>
                                )}
                                {symptoms.cansaco && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText primary="Cansaço" secondary={symptoms.cansaco} />
                                  </ListItem>
                                )}
                                {symptoms.estresse && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText primary="Estresse" secondary={symptoms.estresse} />
                                  </ListItem>
                                )}
                                {symptoms.ansiedade && (
                                  <ListItem>
                                    <ListItemIcon><PsychologyIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText primary="Ansiedade" secondary={symptoms.ansiedade} />
                                  </ListItem>
                                )}
                                {symptoms.observacoes && (
                                  <ListItem>
                                    <ListItemIcon><DotIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText primary="Observações" secondary={symptoms.observacoes} />
                                  </ListItem>
                                )}
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>
                      )}

                      {/* NOVO: Questionário Abrangente de Saúde - Histórico Familiar */}
                      {(symptoms.doencasFamiliares || symptoms.paisVivos || symptoms.causaMortePais) && (
                        <Grid item xs={12}>
                          <Card variant="outlined" sx={{ bgcolor: '#f3e5f5', borderColor: '#7b1fa2' }}>
                            <CardContent>
                              <Typography variant="h6" sx={{ color: '#7b1fa2', mb: 2 }}>
                                👨‍👩‍👧‍👦 Histórico Familiar
                              </Typography>
                              <Grid container spacing={2}>
                                {symptoms.doencasFamiliares && (
                                  <Grid item xs={12} md={6}>
                                    <Typography variant="body2" color="text.secondary">
                                      Doenças na Família:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.doencasFamiliares}</Typography>
                                  </Grid>
                                )}
                                {symptoms.paisVivos && (
                                  <Grid item xs={12} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Pais Vivos:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.paisVivos}</Typography>
                                  </Grid>
                                )}
                                {symptoms.causaMortePais && (
                                  <Grid item xs={12} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Causa Morte:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.causaMortePais}</Typography>
                                  </Grid>
                                )}
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      )}

                      {/* NOVO: Dados Detalhados do Histórico Pessoal */}
                      {(symptoms.doencasCronicasDetalhadas || symptoms.alergiasDetalhadas || symptoms.medicamentosUsoDetalhados) && (
                        <Grid item xs={12}>
                          <Card variant="outlined" sx={{ bgcolor: '#fff3e0', borderColor: '#f57c00' }}>
                            <CardContent>
                              <Typography variant="h6" sx={{ color: '#f57c00', mb: 2 }}>
                                📝 Histórico Pessoal Detalhado
                              </Typography>
                              <Grid container spacing={2}>
                                {symptoms.doencasCronicasDetalhadas && (
                                  <Grid item xs={12} md={4}>
                                    <Typography variant="body2" color="text.secondary">
                                      Doenças Crônicas:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.doencasCronicasDetalhadas}</Typography>
                                  </Grid>
                                )}
                                {symptoms.alergiasDetalhadas && (
                                  <Grid item xs={12} md={4}>
                                    <Typography variant="body2" color="text.secondary">
                                      Alergias:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.alergiasDetalhadas}</Typography>
                                  </Grid>
                                )}
                                {symptoms.medicamentosUsoDetalhados && (
                                  <Grid item xs={12} md={4}>
                                    <Typography variant="body2" color="text.secondary">
                                      Medicamentos em Uso:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.medicamentosUsoDetalhados}</Typography>
                                  </Grid>
                                )}
                                {symptoms.cirurgiasDetalhadas && (
                                  <Grid item xs={12} md={6}>
                                    <Typography variant="body2" color="text.secondary">
                                      Cirurgias:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.cirurgiasDetalhadas}</Typography>
                                  </Grid>
                                )}
                                {symptoms.hospitalizacoesDetalhadas && (
                                  <Grid item xs={12} md={6}>
                                    <Typography variant="body2" color="text.secondary">
                                      Hospitalizações:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.hospitalizacoesDetalhadas}</Typography>
                                  </Grid>
                                )}
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      )}

                      {/* NOVO: Dados Detalhados de Alimentação */}
                      {(symptoms.qualidadeAlimentacao || symptoms.refeicoesDia || symptoms.consumoAgua || symptoms.consumoFrequente) && (
                        <Grid item xs={12}>
                          <Card variant="outlined" sx={{ bgcolor: '#e0f2f1', borderColor: '#00796b' }}>
                            <CardContent>
                              <Typography variant="h6" sx={{ color: '#00796b', mb: 2 }}>
                                🍽️ Alimentação Detalhada
                              </Typography>
                              <Grid container spacing={2}>
                                {symptoms.qualidadeAlimentacao && (
                                  <Grid item xs={12} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Qualidade:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.qualidadeAlimentacao}</Typography>
                                  </Grid>
                                )}
                                {symptoms.refeicoesDia && (
                                  <Grid item xs={12} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Refeições/Dia:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.refeicoesDia}</Typography>
                                  </Grid>
                                )}
                                {symptoms.consumoAgua && (
                                  <Grid item xs={12} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Consumo de Água:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.consumoAgua}</Typography>
                                  </Grid>
                                )}
                                {symptoms.restricoesAlimentares && (
                                  <Grid item xs={12} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Restrições:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.restricoesAlimentares}</Typography>
                                  </Grid>
                                )}
                                {symptoms.consumoFrequente && (
                                  <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary">
                                      Consumo Frequente:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.consumoFrequente}</Typography>
                                  </Grid>
                                )}
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      )}

                      {/* NOVO: Dados Detalhados de Sono */}
                      {(symptoms.horasSonoDetalhe || symptoms.qualidadeSonoDetalhe || symptoms.dificuldadeDormir) && (
                        <Grid item xs={12} md={6}>
                          <Card variant="outlined" sx={{ bgcolor: '#e8eaf6', borderColor: '#303f9f' }}>
                            <CardContent>
                              <Typography variant="h6" sx={{ color: '#303f9f', mb: 2 }}>
                                😴 Sono Detalhado
                              </Typography>
                              <Grid container spacing={2}>
                                {symptoms.horasSonoDetalhe && (
                                  <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary">
                                      Horas de Sono:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.horasSonoDetalhe}</Typography>
                                  </Grid>
                                )}
                                {symptoms.qualidadeSonoDetalhe && (
                                  <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary">
                                      Qualidade:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.qualidadeSonoDetalhe}</Typography>
                                  </Grid>
                                )}
                                {symptoms.dificuldadeDormir && (
                                  <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary">
                                      Dificuldades:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.dificuldadeDormir}</Typography>
                                  </Grid>
                                )}
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      )}

                      {/* NOVO: Sistema Digestório Detalhado */}
                      {(symptoms.funcionamentoIntestinal || symptoms.distensaoAbdominal) && (
                        <Grid item xs={12} md={6}>
                          <Card variant="outlined" sx={{ bgcolor: '#fce4ec', borderColor: '#c2185b' }}>
                            <CardContent>
                              <Typography variant="h6" sx={{ color: '#c2185b', mb: 2 }}>
                                🫃 Sistema Digestório Detalhado
                              </Typography>
                              <Grid container spacing={2}>
                                {symptoms.funcionamentoIntestinal && (
                                  <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary">
                                      Funcionamento Intestinal:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.funcionamentoIntestinal}</Typography>
                                  </Grid>
                                )}
                                {symptoms.distensaoAbdominal && (
                                  <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary">
                                      Distensão Abdominal:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.distensaoAbdominal}</Typography>
                                  </Grid>
                                )}
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      )}

                      {/* NOVO: Sintomas Gerais Detalhados */}
                      {(symptoms.nivelEnergia || symptoms.nivelEstresse || symptoms.nivelAnsiedade || symptoms.humor || symptoms.doresDetalhadas) && (
                        <Grid item xs={12}>
                          <Card variant="outlined" sx={{ bgcolor: '#fbe9e7', borderColor: '#e64a19' }}>
                            <CardContent>
                              <Typography variant="h6" sx={{ color: '#e64a19', mb: 2 }}>
                                💭 Sintomas Gerais Detalhados
                              </Typography>
                              <Grid container spacing={2}>
                                {symptoms.nivelEnergia && (
                                  <Grid item xs={12} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Nível de Energia:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.nivelEnergia}</Typography>
                                  </Grid>
                                )}
                                {symptoms.nivelEstresse && (
                                  <Grid item xs={12} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Nível de Estresse:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.nivelEstresse}</Typography>
                                  </Grid>
                                )}
                                {symptoms.nivelAnsiedade && (
                                  <Grid item xs={12} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Nível de Ansiedade:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.nivelAnsiedade}</Typography>
                                  </Grid>
                                )}
                                {symptoms.humor && (
                                  <Grid item xs={12} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Humor:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.humor}</Typography>
                                  </Grid>
                                )}
                                {symptoms.doresDetalhadas && (
                                  <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary">
                                      Dores Frequentes:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.doresDetalhadas}</Typography>
                                  </Grid>
                                )}
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      )}

                      {/* NOVO: Sintomas Selecionados e Carências Nutricionais */}
                      {(symptoms.sintomasSelecionados || symptoms.carenciasNutricionais) && (
                        <Grid item xs={12}>
                          <Card variant="outlined" sx={{ bgcolor: '#e8eaf6', borderColor: '#3f51b5' }}>
                            <CardContent>
                              <Typography variant="h6" sx={{ color: '#3f51b5', mb: 2 }}>
                                💊 Sintomas e Carências Nutricionais
                              </Typography>
                              <Grid container spacing={2}>
                                {symptoms.sintomasSelecionados && (
                                  <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary">
                                      Sintomas Selecionados:
                                    </Typography>
                                    <Typography variant="body1">{symptoms.sintomasSelecionados}</Typography>
                                  </Grid>
                                )}
                                {symptoms.carenciasNutricionais && (
                                  <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                      Carências Nutricionais Identificadas:
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#d32f2f', fontWeight: 500 }}>
                                      {symptoms.carenciasNutricionais}
                                    </Typography>
                                  </Grid>
                                )}
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      )}

                      {/* NOVO: Sinais Vitais */}
                      {(symptoms.pressaoArterial || symptoms.frequenciaCardiaca || symptoms.peso || symptoms.altura || symptoms.imc) && (
                        <Grid item xs={12}>
                          <Card variant="outlined" sx={{ bgcolor: '#e1f5fe', borderColor: '#0288d1' }}>
                            <CardContent>
                              <Typography variant="h6" sx={{ color: '#0288d1', mb: 2 }}>
                                📊 Sinais Vitais e Medidas Corporais
                              </Typography>
                              <Grid container spacing={2}>
                                {symptoms.pressaoArterial && (
                                  <Grid item xs={6} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Pressão Arterial:
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                      {symptoms.pressaoArterial}
                                    </Typography>
                                  </Grid>
                                )}
                                {symptoms.frequenciaCardiaca && (
                                  <Grid item xs={6} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Frequência Cardíaca:
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                      {symptoms.frequenciaCardiaca}
                                    </Typography>
                                  </Grid>
                                )}
                                {symptoms.saturacaoOxigenio && (
                                  <Grid item xs={6} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Saturação O2:
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                      {symptoms.saturacaoOxigenio}
                                    </Typography>
                                  </Grid>
                                )}
                                {symptoms.temperatura && (
                                  <Grid item xs={6} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Temperatura:
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                      {symptoms.temperatura}
                                    </Typography>
                                  </Grid>
                                )}
                                {symptoms.peso && (
                                  <Grid item xs={6} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Peso:
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                      {symptoms.peso}
                                    </Typography>
                                  </Grid>
                                )}
                                {symptoms.altura && (
                                  <Grid item xs={6} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Altura:
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                      {symptoms.altura}
                                    </Typography>
                                  </Grid>
                                )}
                                {symptoms.imc && (
                                  <Grid item xs={6} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      IMC:
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                      {symptoms.imc}
                                    </Typography>
                                  </Grid>
                                )}
                                {symptoms.circunferenciaCintura && (
                                  <Grid item xs={6} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Cintura:
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                      {symptoms.circunferenciaCintura}
                                    </Typography>
                                  </Grid>
                                )}
                                {symptoms.relacaoCinturaQuadril && (
                                  <Grid item xs={6} md={3}>
                                    <Typography variant="body2" color="text.secondary">
                                      Relação C/Q:
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                      {symptoms.relacaoCinturaQuadril}
                                    </Typography>
                                  </Grid>
                                )}
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      )}

                      {/* NOVO: Sinais Clínicos */}
                      {symptoms.sinaisClinicos && (
                        <Grid item xs={12}>
                          <Card variant="outlined" sx={{ bgcolor: '#f1f8e9', borderColor: '#689f38' }}>
                            <CardContent>
                              <Typography variant="h6" sx={{ color: '#689f38', mb: 2 }}>
                                🔍 Checklist de Sinais Clínicos
                              </Typography>
                              <Typography variant="body1">
                                {symptoms.sinaisClinicos}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      )}
                    </Grid>

                    {/* Actions */}
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                      <Button 
                        variant="outlined" 
                        size="small"
                        onClick={() => navigate(`/anamnese/${anamnese.id}`)}
                      >
                        Ver Anamnese Completa
                      </Button>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        )}

        {/* Actions */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }} className="no-print">
          <Button variant="outlined" onClick={() => navigate('/dashboard')}>
            Voltar aos Interagentes
          </Button>
          <Button variant="contained" color="success" startIcon={<SaveIcon />} onClick={handleSaveHistorico} disabled={!selectedPatientName}>
            💾 Salvar no Histórico
          </Button>
          {savedMsg && <Chip label={savedMsg} color="success" size="small" sx={{ alignSelf: 'center' }} />}
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint} disabled={!selectedPatientName}>
            Imprimir
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={downloadPdf} disabled={!selectedPatientName}>
            Download PDF
          </Button>
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={downloadConsolidatedPdf} disabled={!selectedPatientName}>
            Download Consolidado (PDF)
          </Button>
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={() => {
            const consolidated = computeConsolidatedSummary(patientAnamneses);
            if (!consolidated) return;
            // Use the latest anamnese metadata
            const latest = patientAnamneses && patientAnamneses[0];
            const { headers, row } = consolidatedToCsvRow(consolidated, { patientId: latest?.id, patientName: selectedPatientName, createdAt: latest?.createdAt });
            const csvContent = [headers.join(','), row].join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `sintomas_consolidado_${selectedPatientName?.replace(/\s/g, '_')}.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
          }} disabled={!selectedPatientName}>
            Download Consolidado (CSV)
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={downloadConsolidatedCsv} disabled={!selectedPatientName}>
            Download Consolidado (CSV)
          </Button>
          <Button variant="contained" onClick={() => navigate('/')}>
            Nova Anamnese
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
