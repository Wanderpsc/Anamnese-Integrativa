import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Button, 
  Divider, 
  Grid, 
  Chip, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  Autocomplete,
  TextField,
  Card,
  CardContent,
  Stack,
  Avatar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import PrescriptionHeader from '../components/PrescriptionHeader';
import { idbGet } from '../lib/indexedDBHelper';
import PrescriptionFooter from '../components/PrescriptionFooter';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl } from '../components/PrintTemplate';

const therapistFullTitle = 'Wander Pires Silva Coelho, Terapeuta Integrativo Funcional, Naturopatia e Iridologia - CRTH-BR 17821';

export default function PatientFullReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Estados
  const [allAnamneses, setAllAnamneses] = useState([]);
  const [uniquePatients, setUniquePatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientAnamneses, setPatientAnamneses] = useState([]);
  const [entry, setEntry] = useState(null);
  const [analysisThumbnails, setAnalysisThumbnails] = useState(null);
  const [analysisIrisImages, setAnalysisIrisImages] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState(null);
  const [examesLab, setExamesLab] = useState([]);

  const shouldPrint = searchParams.get('print') === 'true';
  const shouldDownload = searchParams.get('download') === 'true';

  // Carregar todos os pacientes
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('anamneses') || '[]');
    setAllAnamneses(saved);
    
    // Extrair lista única de pacientes
    const patientsMap = new Map();
    saved.forEach(anam => {
      if (anam.q01_nome && !patientsMap.has(anam.q01_nome)) {
        patientsMap.set(anam.q01_nome, {
          nome: anam.q01_nome,
          dataNascimento: anam.q02_data_nascimento,
          ultimaAnamnese: anam.createdAt
        });
      }
    });
    setUniquePatients(Array.from(patientsMap.values()));
    
    // Se veio ID na URL, carregar esse paciente
    if (id) {
      const found = saved.find((x) => String(x.id) === String(id));
      if (found) {
        const patient = { nome: found.q01_nome, dataNascimento: found.q02_data_nascimento };
        setSelectedPatient(patient);
      }
    }
  }, [id]);

  // Atualizar anamneses quando paciente for selecionado
  useEffect(() => {
    if (selectedPatient) {
      const anamList = allAnamneses
        .filter(a => a.q01_nome === selectedPatient.nome)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPatientAnamneses(anamList);
      
      // Selecionar a anamnese mais recente
      if (anamList.length > 0) {
        setEntry(anamList[0]);
        loadAnalysisThumbnails(anamList[0]);
      }
    } else {
      setPatientAnamneses([]);
      setEntry(null);
    }
  }, [selectedPatient, allAnamneses]);

  // Carregar exames laboratoriais do paciente
  useEffect(() => {
    if (entry && entry.id) {
      const examesData = JSON.parse(localStorage.getItem('examesLaboratoriais') || '{}');
      const patientExams = examesData[entry.id] || [];
      setExamesLab(patientExams);
    }
  }, [entry]);

  const loadAnalysisThumbnails = async (anamEntry) => {
    setAnalysisThumbnails(null);
    setAnalysisIrisImages(null);

    if (anamEntry && anamEntry.id) {
      try {
        const localRaw = localStorage.getItem(`iridology-thumbnails-${anamEntry.id}`) || null;
        if (localRaw) {
          setAnalysisThumbnails(JSON.parse(localRaw));
        } else {
          // fallback to indexedDB
          try {
            const dbData = await idbGet(`iridology-thumbnails-${anamEntry.id}`);
            if (dbData) setAnalysisThumbnails(dbData);
          } catch (err) {
            // ignore
          }
        }
      } catch (e) { /* ignore */ }

      try {
        const localIrisRaw = localStorage.getItem(`iridology-iris-images-${anamEntry.id}`) || null;
        if (localIrisRaw) {
          setAnalysisIrisImages(JSON.parse(localIrisRaw));
        } else {
          const dbIrisData = await idbGet(`iridology-iris-images-${anamEntry.id}`);
          if (dbIrisData) setAnalysisIrisImages(dbIrisData);
        }
      } catch (err) {
        // ignore
      }
    }
  };

  // Handle print action
  useEffect(() => {
    if (shouldPrint && entry) {
      setTimeout(() => window.print(), 1000);
    }
  }, [shouldPrint, entry]);

  // Handle download action
  useEffect(() => {
    if (shouldDownload && entry) {
      setTimeout(() => downloadPdf(), 1000);
    }
  }, [shouldDownload, entry]);

  async function downloadPdf() {
    const el = document.getElementById('full-report-print-area');
    if (!el) return;
    try {
      const bodyHtml = el.innerHTML;
      const patientName = entry?.q01_nome ? entry.q01_nome.replace(/\s+/g, '-').toLowerCase() : 'paciente';
      const qr = `${window.location.origin}/clinical-report`;
      const qrUrl = await generateQrDataUrl(qr);
      const html = await buildLetterheadHtml({ title: `${patientName}-relatorio-completo`, bodyHtml, qrUrl });
      await downloadPdfFromHtml(html, `${patientName}-relatorio-completo.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
      window.print();
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Não informado';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return 'Não informado';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age} anos`;
  };

  if (allAnamneses.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Alert severity="info">
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Nenhuma Anamnese Encontrada
            </Typography>
            <Typography>
              Não há anamneses registradas ainda. Crie pelo menos uma anamnese para gerar relatórios.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button variant="contained" onClick={() => navigate('/')}>
                Nova Anamnese
              </Button>
            </Box>
          </Alert>
        </Paper>
      </Container>
    );
  }

  const leftIrisImage = entry?.iridologyAnalysis?.leftIrisImage || analysisIrisImages?.leftIrisImage || null;
  const rightIrisImage = entry?.iridologyAnalysis?.rightIrisImage || analysisIrisImages?.rightIrisImage || null;

  return (
    <>
      {/* CSS de Impressão */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #full-report-print-area, #full-report-print-area * {
              visibility: visible;
            }
            #full-report-print-area {
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
            button {
              display: none !important;
            }
            .print-page-break {
              page-break-before: always;
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
        {/* Seletor de Paciente */}
        <Paper className="no-print" elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Box sx={{ 
            mb: 3, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            p: 3,
            borderRadius: 2,
            color: 'white'
          }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                <PersonIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Relatório Clínico Integrativo
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                  Todas as informações registradas sobre o paciente
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={uniquePatients}
                getOptionLabel={(option) => option.nome}
                value={selectedPatient}
                onChange={(event, newValue) => setSelectedPatient(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="1️⃣ Selecione o Paciente"
                    variant="outlined"
                    placeholder="Digite o nome do paciente..."
                    helperText="Escolha qual paciente deseja ver o relatório"
                  />
                )}
              />
            </Grid>

            {selectedPatient && patientAnamneses.length > 0 && (
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={patientAnamneses}
                  getOptionLabel={(option) => {
                    const date = formatDate(option.createdAt);
                    const queixa = option.queixaPrincipal || option.queixas?.join(', ') || 'Sem queixa registrada';
                    return `📅 ${date} - ${queixa.substring(0, 50)}${queixa.length > 50 ? '...' : ''}`;
                  }}
                  value={entry}
                  onChange={(event, newValue) => {
                    setEntry(newValue);
                    if (newValue) loadAnalysisThumbnails(newValue);
                  }}
                  renderOption={(props, option) => (
                    <Box component="li" {...props} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', py: 1.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                        📅 {formatDate(option.createdAt)}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        {option.queixaPrincipal || option.queixas?.join(', ') || 'Sem queixa registrada'}
                      </Typography>
                      {option.sintomas && option.sintomas.length > 0 && (
                        <Typography variant="caption" sx={{ color: '#999', fontStyle: 'italic' }}>
                          {option.sintomas.slice(0, 3).join(', ')}
                          {option.sintomas.length > 3 ? '...' : ''}
                        </Typography>
                      )}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="2️⃣ Data da Consulta"
                      variant="outlined"
                      placeholder="Escolha a data da consulta..."
                      helperText={`${patientAnamneses.length} consulta(s) registrada(s) para este paciente`}
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>

          {selectedPatient && entry && (
            <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large"
                startIcon={<PrintIcon />}
                onClick={() => window.print()}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  px: 4,
                  py: 1.5
                }}
              >
                Imprimir Relatório
              </Button>
              <Button 
                variant="contained" 
                size="large"
                color="success"
                startIcon={<DownloadIcon />}
                onClick={downloadPdf}
                sx={{ px: 4, py: 1.5 }}
              >
                Download PDF
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={() => navigate('/dashboard')}
                sx={{ px: 4, py: 1.5 }}
              >
                Voltar ao Dashboard
              </Button>
            </Box>
          )}

          {selectedPatient && !entry && patientAnamneses.length === 0 && (
            <Alert severity="warning" sx={{ mt: 3 }}>
              <Typography variant="body2">
                Nenhuma anamnese encontrada para <strong>{selectedPatient.nome}</strong>.
              </Typography>
            </Alert>
          )}

          {!selectedPatient && (
            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2">
                👆 Selecione um paciente acima para visualizar o relatório completo com todas as informações registradas no sistema.
              </Typography>
            </Alert>
          )}

          {selectedPatient && patientAnamneses.length > 1 && (
            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2">
                Este paciente possui <strong>{patientAnamneses.length} anamneses</strong> registradas. 
                Mostrando a mais recente ({formatDate(entry?.createdAt)}).
              </Typography>
            </Alert>
          )}
        </Paper>

        {/* Área de Impressão do Relatório */}
        {selectedPatient && entry && (
          <Paper id="full-report-print-area" elevation={3} sx={{ p: 4, borderRadius: 3, background: '#fff' }}>
            <PrescriptionHeader entry={entry} />

            <Divider sx={{ my: 3 }} />

            {/* Identificação do Paciente */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ color: '#667eea', fontWeight: 700, mb: 3 }}>
                📋 RELATÓRIO COMPLETO DO PACIENTE
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Dados Pessoais
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Nome:</strong> {entry.q01_nome || 'Não informado'}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Data de Nascimento:</strong> {formatDate(entry.q02_data_nascimento)}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Idade:</strong> {calculateAge(entry.q02_data_nascimento)}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Sexo:</strong> {entry.q03_sexo || 'Não informado'}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Estado Civil:</strong> {entry.q04_estado_civil || 'Não informado'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card sx={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Contato
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Telefone:</strong> {entry.q06_telefone || 'Não informado'}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Email:</strong> {entry.q07_email || 'Não informado'}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Endereço:</strong> {entry.q08_endereco || 'Não informado'}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Profissão:</strong> {entry.q05_profissao || 'Não informado'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} className="print-page-break" />

            {/* Histórico de Anamneses */}
            {patientAnamneses.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ color: '#667eea', fontWeight: 700, mb: 2 }}>
                  📅 Histórico de Consultas ({patientAnamneses.length})
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell><strong>Data</strong></TableCell>
                        <TableCell><strong>Queixa Principal</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {patientAnamneses.map((anam, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{formatDate(anam.createdAt)}</TableCell>
                          <TableCell>{anam.q15_queixa_principal || 'Não informada'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Queixa Principal e HDA */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ color: '#667eea', fontWeight: 700, mb: 2 }}>
                🩺 Queixa Principal e História da Doença Atual
              </Typography>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1, color: '#764ba2' }}>
                    Queixa Principal
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {entry.q15_queixa_principal || 'Não informada'}
                  </Typography>
                </CardContent>
              </Card>
              {entry.q16_historia_doenca_atual && (
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1, color: '#764ba2' }}>
                      História da Doença Atual
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                      {entry.q16_historia_doenca_atual}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>

            <Divider sx={{ my: 3 }} className="print-page-break" />

            {/* Exames Laboratoriais */}
            {examesLab.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ color: '#667eea', fontWeight: 700, mb: 2 }}>
                  🔬 Exames Laboratoriais ({examesLab.length})
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell><strong>Exame</strong></TableCell>
                        <TableCell><strong>Resultado</strong></TableCell>
                        <TableCell><strong>Referência</strong></TableCell>
                        <TableCell><strong>Unidade</strong></TableCell>
                        <TableCell><strong>Interpretação</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {examesLab.map((exame, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{exame.nome}</TableCell>
                          <TableCell sx={{ 
                            fontWeight: 600,
                            color: exame.resultado < exame.min || exame.resultado > exame.max ? '#d32f2f' : '#2e7d32'
                          }}>
                            {exame.resultado}
                          </TableCell>
                          <TableCell>{exame.min} - {exame.max}</TableCell>
                          <TableCell>{exame.unidade}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem' }}>
                            {exame.interpretacao || 'Normal'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Condutas Terapêuticas dos Exames */}
                {examesLab.some(e => e.conduta) && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" sx={{ color: '#764ba2', fontWeight: 600, mb: 2 }}>
                      💊 Condutas Terapêuticas Integrativas
                    </Typography>
                    {examesLab.filter(e => e.conduta).map((exame, idx) => (
                      <Card key={idx} variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            {exame.nome}
                          </Typography>
                          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                            {exame.conduta}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                )}
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Antecedentes Pessoais */}
            {(entry.q17_antecedentes_pessoais || entry.q18_medicamentos_uso || entry.q19_alergias) && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ color: '#667eea', fontWeight: 700, mb: 2 }}>
                  📝 Antecedentes Pessoais
                </Typography>
                
                {entry.q17_antecedentes_pessoais && (
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1, color: '#764ba2' }}>
                        Doenças Prévias
                      </Typography>
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                        {entry.q17_antecedentes_pessoais}
                      </Typography>
                    </CardContent>
                  </Card>
                )}

                {entry.q18_medicamentos_uso && (
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1, color: '#764ba2' }}>
                        Medicamentos em Uso
                      </Typography>
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                        {entry.q18_medicamentos_uso}
                      </Typography>
                    </CardContent>
                  </Card>
                )}

                {entry.q19_alergias && (
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1, color: '#d32f2f' }}>
                        ⚠️ Alergias
                      </Typography>
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                        {entry.q19_alergias}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>
            )}

            <Divider sx={{ my: 3 }} className="print-page-break" />

            {/* Antecedentes Familiares */}
            {entry.q20_antecedentes_familiares && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ color: '#667eea', fontWeight: 700, mb: 2 }}>
                  👨‍👩‍👧‍👦 Antecedentes Familiares
                </Typography>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                      {entry.q20_antecedentes_familiares}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Hábitos de Vida */}
            {(entry.q21_habitos_vida || entry.q22_atividade_fisica || entry.q23_alimentacao) && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ color: '#667eea', fontWeight: 700, mb: 2 }}>
                  🌱 Hábitos de Vida
                </Typography>
                <Grid container spacing={2}>
                  {entry.q21_habitos_vida && (
                    <Grid item xs={12}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 1, color: '#764ba2' }}>
                            Hábitos Gerais
                          </Typography>
                          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                            {entry.q21_habitos_vida}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                  {entry.q22_atividade_fisica && (
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 1, color: '#764ba2' }}>
                            Atividade Física
                          </Typography>
                          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                            {entry.q22_atividade_fisica}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                  {entry.q23_alimentacao && (
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 1, color: '#764ba2' }}>
                            Alimentação
                          </Typography>
                          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                            {entry.q23_alimentacao}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}

            <Divider sx={{ my: 3 }} className="print-page-break" />

            {/* Iridology Analysis */}
        {entry.iridologyAnalysis && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 600, mb: 3 }}>
              👁️ Análise Iridológica
            </Typography>
            
            {entry.iridologyAnalysis.generalFindings && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#0d47a1', fontWeight: 600, mb: 1 }}>
                  Achados Gerais
                </Typography>
                <Typography variant="body2" sx={{ pl: 2, whiteSpace: 'pre-line' }}>
                  {entry.iridologyAnalysis.generalFindings}
                </Typography>
              </Box>
            )}

            {entry.iridologyAnalysis.organSystems && Object.keys(entry.iridologyAnalysis.organSystems).length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#0d47a1', fontWeight: 600, mb: 1 }}>
                  Sistemas Orgânicos
                </Typography>
                {Object.entries(entry.iridologyAnalysis.organSystems).map(([system, data]) => (
                  <Box key={system} sx={{ mb: 2, pl: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#1565c0' }}>
                      {system}
                    </Typography>
                    <Typography variant="body2" sx={{ pl: 2 }}>
                      {data.findings || data}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {entry.iridologyAnalysis.constitution && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#0d47a1', fontWeight: 600, mb: 1 }}>
                  Constituição Iridológica
                </Typography>
                <Typography variant="body2" sx={{ pl: 2 }}>
                  <strong>Tipo:</strong> {entry.iridologyAnalysis.constitution.type || 'Não especificado'}
                </Typography>
                {entry.iridologyAnalysis.constitution.characteristics && (
                  <Typography variant="body2" sx={{ pl: 2, mt: 1 }}>
                    {entry.iridologyAnalysis.constitution.characteristics}
                  </Typography>
                )}
              </Box>
            )}

            {/* Iris Images (full) */}
            {(leftIrisImage || rightIrisImage) && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#0d47a1', fontWeight: 600, mb: 1 }}>
                  👁️ Imagens das Íris
                </Typography>
                <Grid container spacing={2}>
                  {leftIrisImage && (
                    <Grid item xs={12} sm={6} md={4}>
                      <Box sx={{ border: '1px solid #ddd', p: 1, borderRadius: 1, textAlign: 'center' }}>
                        <a href={leftIrisImage} target="_blank" rel="noopener noreferrer">
                          <img src={leftIrisImage} alt="Íris Esquerda" style={{ width: '100%', maxHeight: 220, objectFit: 'contain' }} />
                        </a>
                        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>Íris Esquerda</Typography>
                      </Box>
                    </Grid>
                  )}
                  {rightIrisImage && (
                    <Grid item xs={12} sm={6} md={4}>
                      <Box sx={{ border: '1px solid #ddd', p: 1, borderRadius: 1, textAlign: 'center' }}>
                        <a href={rightIrisImage} target="_blank" rel="noopener noreferrer">
                          <img src={rightIrisImage} alt="Íris Direita" style={{ width: '100%', maxHeight: 220, objectFit: 'contain' }} />
                        </a>
                        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>Íris Direita</Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
            {/* Photos of analyzed parts */}
            {(entry.iridologyAnalysis?.zoneThumbnails || analysisThumbnails?.zoneThumbnails || entry.iridologyAnalysis?.signThumbnails || analysisThumbnails?.signThumbnails) && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#0d47a1', fontWeight: 600, mb: 1 }}>
                  📸 Fotos das Partes Analisadas
                </Typography>
                <Grid container spacing={2}>
                  {((entry.iridologyAnalysis && entry.iridologyAnalysis.zoneThumbnails) || (analysisThumbnails && analysisThumbnails.zoneThumbnails)) && Object.entries((entry.iridologyAnalysis && entry.iridologyAnalysis.zoneThumbnails) || (analysisThumbnails && analysisThumbnails.zoneThumbnails)).map(([key, url]) => {
                    const m = key.match(/zone-(\d+)-(left|right)/);
                    const zoneIndex = m ? parseInt(m[1], 10) : null;
                    const side = m ? m[2] : 'left';
                    const zoneName = (entry.iridologyAnalysis.zones && entry.iridologyAnalysis.zones[zoneIndex] && entry.iridologyAnalysis.zones[zoneIndex].name) || `Zona ${zoneIndex}`;
                    return (
                      <Grid item xs={6} sm={3} md={2} key={key}>
                        <Box sx={{ border: '1px solid #ddd', p: 1, borderRadius: 1, textAlign: 'center' }}>
                          <Box sx={{ cursor: 'pointer' }} onClick={() => { setModalImageUrl(url); setModalOpen(true); }}>
                            <img src={url} alt={zoneName} style={{ width: '100%', height: 'auto', display: 'block' }} />
                          </Box>
                          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>{side === 'left' ? 'Esquerdo' : 'Direito'} - {zoneName}</Typography>
                          {entry.iridologyAnalysis.zones && zoneIndex !== null && entry.iridologyAnalysis.zones[zoneIndex] && entry.iridologyAnalysis.zones[zoneIndex].findings && (
                            <Typography variant="caption" sx={{ display: 'block', color:'#444', mt: 0.5 }}>
                              {entry.iridologyAnalysis.zones[zoneIndex].findings.slice(0,2).join('; ')}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                    );
                  })}
                  {((entry.iridologyAnalysis && entry.iridologyAnalysis.signThumbnails) || (analysisThumbnails && analysisThumbnails.signThumbnails)) && Object.entries((entry.iridologyAnalysis && entry.iridologyAnalysis.signThumbnails) || (analysisThumbnails && analysisThumbnails.signThumbnails)).map(([key, url]) => {
                    const m = key.match(/sign-(\d+)-(left|right)/);
                    const signIndex = m ? parseInt(m[1], 10) : null;
                    const side = m ? m[2] : 'left';
                    const signName = (entry.iridologyAnalysis.specificSigns && entry.iridologyAnalysis.specificSigns.structuralSigns && entry.iridologyAnalysis.specificSigns.structuralSigns[signIndex] && entry.iridologyAnalysis.specificSigns.structuralSigns[signIndex].name) || `Sinal ${signIndex}`;
                    return (
                      <Grid item xs={6} sm={3} md={2} key={key}>
                        <Box sx={{ border: '1px solid #ddd', p: 1, borderRadius: 1, textAlign: 'center' }}>
                          <Box sx={{ cursor: 'pointer' }} onClick={() => { setModalImageUrl(url); setModalOpen(true); }}>
                            <img src={url} alt={signName} style={{ width: '100%', height: 'auto', display: 'block' }} />
                          </Box>
                          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>{side === 'left' ? 'Esquerdo' : 'Direito'} - {signName}</Typography>
                          {entry.iridologyAnalysis.specificSigns && signIndex !== null && entry.iridologyAnalysis.specificSigns.structuralSigns && entry.iridologyAnalysis.specificSigns.structuralSigns[signIndex] && (
                            <Typography variant="caption" sx={{ display: 'block', color:'#444', mt: 0.5 }}>
                              {entry.iridologyAnalysis.specificSigns.structuralSigns[signIndex].description || entry.iridologyAnalysis.specificSigns.structuralSigns[signIndex].significance}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            )}
          </Box>
        )}

            <Divider sx={{ my: 3 }} className="print-page-break" />

            {/* Análise Iridológica */}
            {entry.iridologyAnalysis && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ color: '#667eea', fontWeight: 700, mb: 2 }}>
                  👁️ Análise Iridológica
                </Typography>
                
                {entry.iridologyAnalysis.generalFindings && (
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1, color: '#764ba2' }}>
                        Achados Gerais
                      </Typography>
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                        {entry.iridologyAnalysis.generalFindings}
                      </Typography>
                    </CardContent>
                  </Card>
                )}

                {entry.iridologyAnalysis.constitution && (
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1, color: '#764ba2' }}>
                        Constituição Iridológica
                      </Typography>
                      <Typography variant="body2">
                        <strong>Tipo:</strong> {entry.iridologyAnalysis.constitution.type || 'Não especificado'}
                      </Typography>
                      {entry.iridologyAnalysis.constitution.characteristics && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          <strong>Características:</strong> {entry.iridologyAnalysis.constitution.characteristics}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Fotos de Iridologia */}
                {(analysisThumbnails?.zoneThumbnails || analysisThumbnails?.signThumbnails) && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#764ba2' }}>
                      📸 Imagens Analisadas
                    </Typography>
                    <Grid container spacing={2}>
                      {analysisThumbnails?.zoneThumbnails && Object.entries(analysisThumbnails.zoneThumbnails).map(([key, url]) => (
                        <Grid item xs={6} sm={4} md={3} key={key}>
                          <Box 
                            sx={{ 
                              border: '1px solid #ddd', 
                              p: 1, 
                              borderRadius: 1, 
                              textAlign: 'center',
                              cursor: 'pointer'
                            }}
                            onClick={() => { setModalImageUrl(url); setModalOpen(true); }}
                          >
                            <img src={url} alt={key} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 4 }} />
                            <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                              {key.replace(/-/g, ' ').toUpperCase()}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Observações Adicionais */}
            {entry.observacoesAdicionais && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ color: '#667eea', fontWeight: 700, mb: 2 }}>
                  📝 Observações Adicionais
                </Typography>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                      {entry.observacoesAdicionais}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            )}

            {/* Rodapé Profissional */}
            <Divider sx={{ my: 3 }} />
            <PrescriptionFooter />
            
            <Box sx={{ mt: 3, p: 2, background: '#f5f5f5', borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
                Relatório gerado em: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
              </Typography>
              <Typography variant="caption" sx={{ color: '#999', mt: 1, display: 'block' }}>
                Este documento contém informações confidenciais e deve ser tratado com sigilo profissional.
              </Typography>
            </Box>
          </Paper>
        )}

        {/* Modal para Imagens */}
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Imagem Ampliada</DialogTitle>
          <DialogContent>
            {modalImageUrl && (
              <img src={modalImageUrl} alt="ampliada" style={{ width: '100%', height: 'auto', display: 'block' }} />
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}
