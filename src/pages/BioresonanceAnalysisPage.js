import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Stack,
  Card,
  CardContent,
  Divider,
  Chip,
  Tab,
  Tabs
} from '@mui/material';
import {
  Person as PersonIcon,
  Print as PrintIcon,
  Upload as UploadIcon,
  Waves as WavesIcon,
  Assessment as AssessmentIcon,
  Visibility as VisibilityIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import BioresonanceResults from '../components/BioresonanceResults';
import BioresonanceAnalysis from '../components/BioresonanceAnalysis';
import PrescriptionHeader from '../components/PrescriptionHeader';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl } from '../components/PrintTemplate';
import { getPatientAge } from '../lib/ageUtils';
import { appendHistoricoEntry } from '../lib/historicoUtils';
import SaveToPatientBar from '../components/SaveToPatientBar';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function BioresonanceAnalysisPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [allAnamneses, setAllAnamneses] = useState([]);
  const [selectedPatientName, setSelectedPatientName] = useState('');
  const [selectedAnamnese, setSelectedAnamnese] = useState(null);
  const [uniquePatients, setUniquePatients] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [uploadingBarra, setUploadingBarra] = useState(false);
  const [uploadingAuricular, setUploadingAuricular] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const selectedPatientAge = getPatientAge(selectedAnamnese);

  const showSavedMsg = (msg) => {
    setSavedMsg(msg);
    setTimeout(() => setSavedMsg(''), 3500);
  };

  const handleSaveHistorico = (tipo) => {
    if (!selectedAnamnese) return;
    const label = tipo === 'barra' ? 'BARRA' : 'AURICULAR';
    const resumo = `Protocolo de biorressonância ${label} analisado`;
    appendHistoricoEntry(selectedAnamnese.id, {
      tipo: 'biorressonancia',
      titulo: `🌊 Biorressonância ${label} — Protocolo`,
      resumo,
      pagina: `/bioresonance/${selectedAnamnese.id}`,
    });
    showSavedMsg(`Protocolo ${label} salvo no histórico!`);
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadPdf = async () => {
    const element = document.querySelector('.print-container');
    if (!element || !selectedPatientName) return;
    
    try {
      const bodyHtml = element.innerHTML;
      const qr = `${window.location.origin}/bioresonance/${selectedAnamnese?.id}`;
      const qrUrl = await generateQrDataUrl(qr);
      const title = `biorressonancia_${selectedPatientName?.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}`;
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
        setSelectedAnamnese(anam);
      }
    } else {
      // Priorizar currentPatientId, depois primeiro da lista
      const currentPid = localStorage.getItem('currentPatientId');
      const anamByPid = currentPid ? anamneses.find(a => String(a.id) === String(currentPid)) : null;
      const startPatient = anamByPid ? anamByPid.q01_nome : (patients.length > 0 ? patients[0] : null);
      if (startPatient) {
        setSelectedPatientName(startPatient);
        const patientAnamneses = anamneses
          .filter(a => a.q01_nome === startPatient)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (patientAnamneses.length > 0) {
          setSelectedAnamnese(patientAnamneses[0]);
        }
      }
    }
  }, [id]);

  useEffect(() => {
    if (id) return;
    if (selectedPatientName) {
      // Buscar a anamnese mais recente desse paciente
      const patientAnamneses = allAnamneses
        .filter(a => a.q01_nome === selectedPatientName)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      if (patientAnamneses.length > 0) {
        setSelectedAnamnese(patientAnamneses[0]);
      } else {
        setSelectedAnamnese(null);
      }
    } else {
      setSelectedAnamnese(null);
    }
  }, [selectedPatientName, allAnamneses, id]);

  const handlePatientChange = (event) => {
    setSelectedPatientName(event.target.value);
  };

  const handleAnalysisComplete = (analysisType, analysisResult) => {
    if (!selectedAnamnese || !analysisResult) return;
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const index = anamneses.findIndex(a => String(a.id) === String(selectedAnamnese.id));
    if (index === -1) return;
    const field = analysisType === 'auricular'
      ? 'biorresonanciaAuricularAnalysis'
      : 'biorresonanciaBarraAnalysis';
    const previous = anamneses[index][field];
    if (previous?.uploadDate === analysisResult.uploadDate && previous?.rawText === analysisResult.rawText) return;
    anamneses[index][field] = {
      ...analysisResult,
      analysisType,
      analyzedAt: new Date().toISOString(),
    };
    anamneses[index].updatedAt = new Date().toISOString();
    localStorage.setItem('anamneses', JSON.stringify(anamneses));
    setAllAnamneses(anamneses);
    setSelectedAnamnese(anamneses[index]);
    window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: anamneses[index] }));
  };

  const handleViewAnamnese = () => {
    if (selectedAnamnese) {
      navigate(`/anamnese/${selectedAnamnese.id}`);
    }
  };

  const handleFileUploadBarra = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !selectedAnamnese) return;

    setUploadingBarra(true);
    try {
      // Converter PDF para base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result;
        
        // Salvar na anamnese
        const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
        const index = anamneses.findIndex(a => String(a.id) === String(selectedAnamnese.id));
        
        if (index !== -1) {
          anamneses[index].biorresonanciaBarraFile = {
            name: file.name,
            type: file.type,
            size: file.size,
            uploadDate: new Date().toISOString(),
            base64: base64 // Salvar base64 do PDF
          };
          
          localStorage.setItem('anamneses', JSON.stringify(anamneses));
          setAllAnamneses(anamneses);
          setSelectedAnamnese(anamneses[index]);
        }
        setUploadingBarra(false);
      };
      reader.readAsDataURL(file); // Ler como base64
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao processar arquivo: ' + error.message);
      setUploadingBarra(false);
    }
  };

  const handleFileUploadAuricular = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !selectedAnamnese) return;

    setUploadingAuricular(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result;
        
        // Salvar na anamnese
        const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
        const index = anamneses.findIndex(a => String(a.id) === String(selectedAnamnese.id));
        
        if (index !== -1) {
          anamneses[index].biorresonanciaAuricularFile = {
            name: file.name,
            type: file.type,
            size: file.size,
            uploadDate: new Date().toISOString(),
            base64: base64 // Salvar base64 do PDF
          };
          
          localStorage.setItem('anamneses', JSON.stringify(anamneses));
          setAllAnamneses(anamneses);
          setSelectedAnamnese(anamneses[index]);
        }
        setUploadingAuricular(false);
      };
      reader.readAsDataURL(file); // Ler como base64
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao processar arquivo: ' + error.message);
      setUploadingAuricular(false);
    }
  };

  const hasBarraResults = selectedAnamnese?.biorresonanciaBarraFile || selectedAnamnese?.biorresonanciaBarraAnalysis;
  const hasAuricularResults = selectedAnamnese?.biorresonanciaAuricularFile || selectedAnamnese?.biorresonanciaAuricularAnalysis;

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 3 }} className="no-print">
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Typography variant="h4" component="h1" gutterBottom sx={{ 
            background: 'linear-gradient(135deg, #00b4db 0%, #0083b0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            🌊 Resultados de Biorressonância
          </Typography>
          
          <Stack direction="row" spacing={1}>
            {savedMsg && <Chip label={savedMsg} color="success" size="small" sx={{ alignSelf: 'center' }} />}
            <Button
              variant="contained"
              color="success"
              startIcon={<CloudUploadIcon />}
              onClick={() => handleSaveHistorico(tabValue === 0 ? 'barra' : 'auricular')}
              disabled={!selectedAnamnese}
            >
              Salvar no Histórico
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
            >
              Imprimir
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Seleção de Paciente */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }} className="no-print">
        {uniquePatients.length === 0 ? (
          <Alert severity="info">
            Nenhum paciente cadastrado. Cadastre uma anamnese primeiro para usar esta funcionalidade.
          </Alert>
        ) : (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Selecione o Paciente</InputLabel>
                <Select
                  value={selectedPatientName}
                  label="Selecione o Paciente"
                  onChange={handlePatientChange}
                >
                  {uniquePatients.map((name) => (
                    <MenuItem key={name} value={name}>
                      <PersonIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          
            {selectedAnamnese && (
              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    startIcon={<VisibilityIcon />}
                    onClick={handleViewAnamnese}
                    fullWidth
                  >
                    Ver Anamnese Completa
                  </Button>
                </Stack>
              </Grid>
            )}
          </Grid>
        )}

        {selectedAnamnese && (
          <Box sx={{ mt: 2 }}>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Data da Anamnese:</strong>{' '}
                  {new Date(selectedAnamnese.createdAt).toLocaleDateString('pt-BR')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Idade:</strong> {selectedPatientAge || 'Não informada'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Área de Resultados de Biorressonância */}
      {selectedAnamnese ? (
        <Box className="print-container">
          {/* Cabeçalho para impressão */}
          <Box className="only-print" sx={{ mb: 4 }}>
            <PrescriptionHeader 
              patientName={selectedPatientName}
              date={new Date().toLocaleDateString('pt-BR')}
            />
            <Typography variant="h5" align="center" sx={{ mt: 3, mb: 3, fontWeight: 'bold' }}>
              Resultados de Biorressonância
            </Typography>
          </Box>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Box className="no-print">
              <Tabs 
                value={tabValue} 
                onChange={(e, v) => setTabValue(v)}
                sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
              >
                <Tab 
                  label="Biorressonância I - BARRA" 
                  icon={<WavesIcon />}
                  iconPosition="start"
                />
                <Tab 
                  label="Biorressonância II - AURICULAR" 
                  icon={<AssessmentIcon />}
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            {/* Tab 1: Biorressonância BARRA */}
            <TabPanel value={tabValue} index={0}>
              <Stack spacing={3}>
                <Box className="no-print">
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    disabled={uploadingBarra}
                    sx={{ mb: 2 }}
                  >
                    {uploadingBarra ? 'Processando...' : 'Carregar Arquivo de Resultados (BARRA)'}
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.txt,.json"
                      onChange={handleFileUploadBarra}
                    />
                  </Button>
                </Box>

                {hasBarraResults ? (
                  <Box>
                    {selectedAnamnese.biorresonanciaBarraFile && (
                      <Alert severity="success" sx={{ mb: 2 }}>
                        <strong>Arquivo carregado:</strong> {selectedAnamnese.biorresonanciaBarraFile.name}
                        <br />
                        <strong>Data:</strong> {new Date(selectedAnamnese.biorresonanciaBarraFile.uploadDate).toLocaleString('pt-BR')}
                      </Alert>
                    )}
                    
                    {/* Componente de Análise com PDF */}
                    {selectedAnamnese.biorresonanciaBarraFile?.base64 && (
                      <BioresonanceAnalysis 
                        analysisType="barra"
                        onAnalysisComplete={(result) => handleAnalysisComplete('barra', result)}
                        pdfData={{
                          base64: selectedAnamnese.biorresonanciaBarraFile.base64,
                          name: selectedAnamnese.biorresonanciaBarraFile.name,
                          uploadDate: selectedAnamnese.biorresonanciaBarraFile.uploadDate
                        }}
                        patientData={{
                          name: selectedPatientName,
                          nome: selectedPatientName,
                          idade: selectedPatientAge,
                          telefone: selectedAnamnese.q03_telefone,
                          q24_medicamentos_uso: selectedAnamnese.q24_medicamentos_uso,
                          q30_medicamentos_uso: selectedAnamnese.q30_medicamentos_uso,
                          q16_alergias: selectedAnamnese.q16_alergias,
                          q25_doencas_cronicas: selectedAnamnese.q25_doencas_cronicas,
                          anamnesisIntegrativaData: selectedAnamnese.anamnesisIntegrativaData
                        }}
                      />
                    )}
                  </Box>
                ) : (
                  <Alert severity="info">
                    Nenhum resultado de Biorressonância BARRA carregado ainda. 
                    Faça upload de um arquivo PDF para visualizar os resultados e gerar o protocolo terapêutico.
                  </Alert>
                )}
              </Stack>
            </TabPanel>

            {/* Tab 2: Biorressonância AURICULAR */}
            <TabPanel value={tabValue} index={1}>
              <Stack spacing={3}>
                <Box className="no-print">
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    disabled={uploadingAuricular}
                    sx={{ mb: 2 }}
                  >
                    {uploadingAuricular ? 'Processando...' : 'Carregar Arquivo de Resultados (AURICULAR)'}
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.txt,.json"
                      onChange={handleFileUploadAuricular}
                    />
                  </Button>
                </Box>

                {hasAuricularResults ? (
                  <Box>
                    {selectedAnamnese.biorresonanciaAuricularFile && (
                      <Alert severity="success" sx={{ mb: 2 }}>
                        <strong>Arquivo carregado:</strong> {selectedAnamnese.biorresonanciaAuricularFile.name}
                        <br />
                        <strong>Data:</strong> {new Date(selectedAnamnese.biorresonanciaAuricularFile.uploadDate).toLocaleString('pt-BR')}
                      </Alert>
                    )}
                    
                    {/* Componente de Análise com PDF */}
                    {selectedAnamnese.biorresonanciaAuricularFile?.base64 && (
                      <BioresonanceAnalysis 
                        analysisType="auricular"
                        onAnalysisComplete={(result) => handleAnalysisComplete('auricular', result)}
                        pdfData={{
                          base64: selectedAnamnese.biorresonanciaAuricularFile.base64,
                          name: selectedAnamnese.biorresonanciaAuricularFile.name,
                          uploadDate: selectedAnamnese.biorresonanciaAuricularFile.uploadDate
                        }}
                        patientData={{
                          name: selectedPatientName,
                          nome: selectedPatientName,
                          idade: selectedPatientAge,
                          telefone: selectedAnamnese.q03_telefone,
                          q24_medicamentos_uso: selectedAnamnese.q24_medicamentos_uso,
                          q30_medicamentos_uso: selectedAnamnese.q30_medicamentos_uso,
                          q16_alergias: selectedAnamnese.q16_alergias,
                          q25_doencas_cronicas: selectedAnamnese.q25_doencas_cronicas,
                          anamnesisIntegrativaData: selectedAnamnese.anamnesisIntegrativaData
                        }}
                      />
                    )}
                  </Box>
                ) : (
                  <Alert severity="info">
                    Nenhum resultado de Biorressonância AURICULAR carregado ainda. 
                    Faça upload de um arquivo PDF para visualizar os resultados e gerar o protocolo terapêutico.
                  </Alert>
                )}
              </Stack>
            </TabPanel>
          </Paper>
        </Box>
      ) : (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Alert severity="info">
            Selecione um paciente para visualizar ou adicionar resultados de biorressonância.
          </Alert>
        </Paper>
      )}

      {/* Informações sobre Biorressonância */}
      <Paper elevation={3} sx={{ p: 3, mt: 3 }} className="no-print">
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          ℹ️ Sobre a Biorressonância
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="body2" paragraph>
                  <strong>O que é Biorressonância?</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  A biorressonância é uma técnica terapêutica que utiliza frequências eletromagnéticas 
                  para detectar e harmonizar desequilíbrios energéticos no organismo. Baseia-se no princípio 
                  de que cada célula, órgão e sistema possui uma frequência vibratória própria.
                </Typography>
                
                <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                  <strong>Tipos de Análise:</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                  <Box component="ul" sx={{ pl: 2 }}>
                    <li><strong>Biorressonância I - BARRA:</strong> Análise através de eletrodos de barra, 
                    avaliando sistemas orgânicos, metabólicos e energéticos.</li>
                    <li><strong>Biorressonância II - AURICULAR:</strong> Análise através de pontos auriculares, 
                    baseada na auriculoterapia e mapeamento reflexológico da orelha.</li>
                  </Box>
                </Typography>

                <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                  <strong>Como usar esta página:</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  1. Selecione o paciente<br/>
                  2. Escolha o tipo de análise (BARRA ou AURICULAR)<br/>
                  3. Faça upload do arquivo de resultados (PDF, TXT ou JSON)<br/>
                  4. O sistema armazena e exibe os resultados automaticamente<br/>
                  5. Use o botão "Imprimir" para gerar relatório completo
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <SaveToPatientBar
        moduleKey="bioresonanceResults"
        getData={() => selectedAnamnese ? {
          patientId: selectedAnamnese.id,
          patientName: selectedAnamnese.q01_nome,
          hasBarra: Boolean(selectedAnamnese.biorresonanciaBarraFile),
          hasAuricular: Boolean(selectedAnamnese.biorresonanciaAuricularFile),
          barraAnalysis: selectedAnamnese.biorresonanciaBarraAnalysis || null,
          auricularAnalysis: selectedAnamnese.biorresonanciaAuricularAnalysis || null,
          savedAt: new Date().toISOString(),
        } : null}
        label="Salvar biorressonância no interagente"
      />
    </Container>
  );
}
