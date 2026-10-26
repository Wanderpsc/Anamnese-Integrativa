import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Stack,
  Card,
  CardContent,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Person as PersonIcon,
  Print as PrintIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import IridologyAnalysis from '../components/IridologyAnalysis';
import PrescriptionHeader from '../components/PrescriptionHeader';
import { primaryActionButtonSx, secondaryActionButtonSx } from '../styles/actionButtonStyles';
import { calculateAgeFromBirthDate, getPatientAge } from '../lib/ageUtils';
import SaveToPatientBar from '../components/SaveToPatientBar';

export default function IridologyAnalysisPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [allAnamneses, setAllAnamneses] = useState([]);
  const [selectedPatientName, setSelectedPatientName] = useState('');
  const [selectedAnamnese, setSelectedAnamnese] = useState(null);
  const [uniquePatients, setUniquePatients] = useState([]);
  const [savedMessage, setSavedMessage] = useState('');
  const [standaloneAnalysis, setStandaloneAnalysis] = useState(null);
  const [currentAnalysisData, setCurrentAnalysisData] = useState(null);
  const [savingToRecord, setSavingToRecord] = useState(false);
  const [manualPatientData, setManualPatientData] = useState({
    q01_nome: '',
    q02_data_nasc: '',
    q03_idade: '',
    q04_sexo: ''
  });

  const setTemporaryMessage = (message, timeout = 3500) => {
    setSavedMessage(message);
    setTimeout(() => setSavedMessage(''), timeout);
  };

  const normalizePatients = (anamneses) => {
    const patients = [...new Set(anamneses.map((a) => a.q01_nome))].filter(Boolean);
    return patients.sort((a, b) => a.localeCompare(b, 'pt-BR'));
  };

  const buildManualEntry = (analysis = null) => ({
    id: `iridology-manual-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    q01_nome: manualPatientData.q01_nome?.trim(),
    q02_data_nasc: manualPatientData.q02_data_nasc || '',
    q03_idade: calculateAgeFromBirthDate(manualPatientData.q02_data_nasc) || manualPatientData.q03_idade || '',
    q04_sexo: manualPatientData.q04_sexo || '',
    anamneseTipo: 'iridology-only',
    source: 'iridology-manual',
    observacoes: 'Ficha manual criada na página de Iridologia.',
    iridologyAnalysis: analysis
  });

  const applyAnamnesesState = (anamneses) => {
    setAllAnamneses(anamneses);
    setUniquePatients(normalizePatients(anamneses));
  };

  const syncManualDataFromAnamnese = (anam) => {
    if (!anam) return;
    setManualPatientData((prev) => ({
      ...prev,
      q01_nome: anam.q01_nome || prev.q01_nome || '',
      q02_data_nasc: anam.q02_data_nasc || prev.q02_data_nasc || '',
      q03_idade: getPatientAge(anam) || prev.q03_idade || '',
      q04_sexo: anam.q04_sexo || prev.q04_sexo || ''
    }));
  };

  useEffect(() => {
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const patientList = normalizePatients(anamneses);
    applyAnamnesesState(anamneses);

    if (id) {
      // Se tem ID, buscar pelo ID
      const anam = anamneses.find(a => String(a.id) === String(id));
      if (anam && anam.q01_nome) {
        setSelectedPatientName(anam.q01_nome);
        setSelectedAnamnese(anam);
        syncManualDataFromAnamnese(anam);
      }
    } else {
      const draft = JSON.parse(localStorage.getItem('iridology-manual-patient-draft') || '{}');
      if (draft && (draft.q01_nome || draft.q02_data_nasc || draft.q03_idade || draft.q04_sexo)) {
        setManualPatientData((prev) => ({ ...prev, ...draft }));
      }

      // Priorizar currentPatientId antes do primeiro da lista
      const currentPid = localStorage.getItem('currentPatientId');
      const anamByPid = currentPid ? anamneses.find(a => String(a.id) === String(currentPid)) : null;
      const startName = anamByPid ? anamByPid.q01_nome : (patientList.length > 0 ? patientList[0] : null);

      if (startName) {
        setSelectedPatientName(startName);
        const patientAnamneses = anamneses
          .filter(a => a.q01_nome === startName)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (patientAnamneses.length > 0) {
          setSelectedAnamnese(patientAnamneses[0]);
          syncManualDataFromAnamnese(patientAnamneses[0]);
        }
      }
    }
  }, [id]);

  useEffect(() => {
    if (selectedPatientName) {
      // Buscar a anamnese mais recente desse paciente
      const patientAnamneses = allAnamneses
        .filter(a => a.q01_nome === selectedPatientName)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      if (patientAnamneses.length > 0) {
        // Se há um ID na URL, preferir a entrada com esse ID específico
        const target = id
          ? (patientAnamneses.find(a => String(a.id) === String(id)) || patientAnamneses[0])
          : patientAnamneses[0];
        setSelectedAnamnese(target);
        syncManualDataFromAnamnese(target);
        // Carregar análise iridológica existente no estado de rastreamento
        if (target.iridologyAnalysis) {
          setCurrentAnalysisData(target.iridologyAnalysis);
        }
      } else {
        setSelectedAnamnese(null);
      }
    } else {
      setSelectedAnamnese(null);
    }
  }, [selectedPatientName, allAnamneses, id]);

  useEffect(() => {
    localStorage.setItem('iridology-manual-patient-draft', JSON.stringify(manualPatientData));
  }, [manualPatientData]);

  const handleAnalysisComplete = (analysis) => {
    // Rastrear a análise atual na página (para botão Salvar do cabeçalho)
    setCurrentAnalysisData(analysis);

    if (!selectedAnamnese) return;

    // Strip thumbnails grandes antes de salvar no localStorage (evita quota exceeded)
    const { zoneThumbnails, signThumbnails, leftIrisImage, rightIrisImage, ...safeAnalysis } = analysis || {};

    // Salvar a análise na anamnese: preferir o ID da URL se disponível
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const targetId = id || selectedAnamnese.id;
    const index = anamneses.findIndex(a => String(a.id) === String(targetId));
    
    if (index !== -1) {
      anamneses[index].iridologyAnalysis = safeAnalysis;
      anamneses[index].updatedAt = new Date().toISOString();
      localStorage.setItem('anamneses', JSON.stringify(anamneses));
      applyAnamnesesState(anamneses);
      setSelectedAnamnese(anamneses[index]);
      
      setTemporaryMessage('✅ Análise de iridologia salva com sucesso!');
    } else {
      // Entrada com esse ID não encontrada — salvar na anamnese selecionada
      const fallbackIndex = anamneses.findIndex(a => String(a.id) === String(selectedAnamnese.id));
      if (fallbackIndex !== -1) {
        anamneses[fallbackIndex].iridologyAnalysis = safeAnalysis;
        anamneses[fallbackIndex].updatedAt = new Date().toISOString();
        localStorage.setItem('anamneses', JSON.stringify(anamneses));
        applyAnamnesesState(anamneses);
        setSelectedAnamnese(anamneses[fallbackIndex]);
        setTemporaryMessage('✅ Análise de iridologia salva com sucesso!');
      }
    }
  };

  const handleSaveToInteragente = () => {
    const rawAnalysis = currentAnalysisData || selectedAnamnese?.iridologyAnalysis;
    if (!rawAnalysis) {
      setTemporaryMessage('⚠️ Nenhuma análise disponível para salvar. Realize a análise primeiro.', 4000);
      return;
    }

    // Strip thumbnails/imagens grandes antes de salvar no localStorage
    const { zoneThumbnails, signThumbnails, leftIrisImage, rightIrisImage, ...analysis } = rawAnalysis;

    setSavingToRecord(true);
    try {
      const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');

      if (selectedAnamnese) {
        const targetId = id || selectedAnamnese.id;
        const index = anamneses.findIndex(a => String(a.id) === String(targetId));
        if (index !== -1) {
          anamneses[index].iridologyAnalysis = analysis;
          anamneses[index].updatedAt = new Date().toISOString();
          localStorage.setItem('anamneses', JSON.stringify(anamneses));
          applyAnamnesesState(anamneses);
          setSelectedAnamnese(anamneses[index]);
          setTemporaryMessage('✅ Análise de iridologia salva no prontuário do interagente!');
        } else {
          setTemporaryMessage('⚠️ Interagente não encontrado. Tente selecionar novamente.', 4000);
        }
      } else if (manualPatientData.q01_nome?.trim()) {
        const manualEntry = buildManualEntry(analysis);
        const updatedAnamneses = [manualEntry, ...anamneses];
        localStorage.setItem('anamneses', JSON.stringify(updatedAnamneses));
        applyAnamnesesState(updatedAnamneses);
        setSelectedPatientName(manualEntry.q01_nome);
        setSelectedAnamnese(manualEntry);
        setTemporaryMessage('✅ Ficha criada e análise salva no prontuário do interagente!');
      } else {
        setTemporaryMessage('⚠️ Selecione ou informe o nome do interagente antes de salvar.', 4000);
      }
    } catch (e) {
      console.error('Erro ao salvar análise:', e);
      setTemporaryMessage('❌ Erro ao salvar. Tente novamente.', 4000);
    } finally {
      setSavingToRecord(false);
    }
  };

  const handlePatientChange = (event) => {
    setSelectedPatientName(event.target.value);
  };

  const handleStandaloneAnalysisComplete = (analysis) => {
    setStandaloneAnalysis(analysis);
    setCurrentAnalysisData(analysis);

    if (!manualPatientData.q01_nome?.trim()) {
      setTemporaryMessage('⚠️ Preencha o nome do interagente para salvar e reabrir esta anamnese futuramente.', 4500);
      return;
    }

    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const manualEntry = buildManualEntry(analysis);
    const updatedAnamneses = [manualEntry, ...anamneses];
    localStorage.setItem('anamneses', JSON.stringify(updatedAnamneses));

    applyAnamnesesState(updatedAnamneses);
    setSelectedPatientName(manualEntry.q01_nome);
    setSelectedAnamnese(manualEntry);
    setStandaloneAnalysis(null);

    setTemporaryMessage('✅ Anamnese manual criada e análise de iridologia salva para futuras reanálises.');
  };

  const handleManualPatientDataChange = (field, value) => {
    setManualPatientData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'q02_data_nasc') {
        updated.q03_idade = calculateAgeFromBirthDate(value);
      }
      return updated;
    });
  };

  const currentIridologyPatientId = selectedAnamnese?.id
    || (manualPatientData.q01_nome?.trim()
      ? `modo-livre-${manualPatientData.q01_nome.trim().toLowerCase().replace(/\s+/g, '-')}`
      : 'modo-livre');

  const handleCreateManualRecord = () => {
    if (!manualPatientData.q01_nome?.trim()) {
      setTemporaryMessage('⚠️ Informe o nome do interagente para criar a ficha manual.', 4500);
      return;
    }

    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const manualEntry = buildManualEntry(standaloneAnalysis || null);
    const updatedAnamneses = [manualEntry, ...anamneses];
    localStorage.setItem('anamneses', JSON.stringify(updatedAnamneses));

    applyAnamnesesState(updatedAnamneses);
    setSelectedPatientName(manualEntry.q01_nome);
    setSelectedAnamnese(manualEntry);
    setStandaloneAnalysis(null);

    setTemporaryMessage('✅ Ficha manual criada. Agora este interagente ficará disponível para revisão da anamnese.');
  };

  const handlePrintFullAnamnese = () => {
    if (!selectedAnamnese?.id) {
      setTemporaryMessage('⚠️ Selecione um interagente para imprimir a anamnese completa.', 4500);
      return;
    }
    navigate(`/patient-report/${selectedAnamnese.id}?print=true`);
  };

  const handleViewAnamnese = () => {
    if (selectedAnamnese) {
      navigate(`/anamnese/${selectedAnamnese.id}`);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 3 }} className="no-print">
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Typography variant="h4" component="h1" gutterBottom sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            👁️ Análise de Iridologia
          </Typography>
          
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="success"
              startIcon={savingToRecord ? <CircularProgress size={18} color="inherit" /> : <SaveIcon />}
              onClick={handleSaveToInteragente}
              disabled={savingToRecord || (!currentAnalysisData && !selectedAnamnese?.iridologyAnalysis)}
              sx={{ fontWeight: 700, minWidth: 200 }}
            >
              {savingToRecord ? 'Salvando...' : '💾 Salvar no Prontuário'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={() => {
                document.body.classList.remove('print-mode-full');
                document.body.classList.add('print-mode-protocols');
                window.print();
                const cleanup = () => { document.body.classList.remove('print-mode-protocols'); window.removeEventListener('afterprint', cleanup); };
                window.addEventListener('afterprint', cleanup);
              }}
              sx={secondaryActionButtonSx}
            >
              🗒️ Imprimir Protocolos
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={() => {
                document.body.classList.remove('print-mode-protocols');
                document.body.classList.add('print-mode-full');
                window.print();
                const cleanup = () => { document.body.classList.remove('print-mode-full'); window.removeEventListener('afterprint', cleanup); };
                window.addEventListener('afterprint', cleanup);
              }}
              sx={{ ...secondaryActionButtonSx, borderColor: '#764ba2', color: '#764ba2' }}
            >
              📋 Imprimir Tudo
            </Button>
            <Button
              variant="contained"
              startIcon={<PrintIcon />}
              onClick={handlePrintFullAnamnese}
              disabled={!selectedAnamnese?.id}
              sx={primaryActionButtonSx}
            >
              Imprimir Anamnese Completa
            </Button>
          </Stack>
        </Stack>

        {savedMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {savedMessage}
          </Alert>
        )}
      </Box>

      {/* Seleção de Paciente */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }} className="no-print">
        {uniquePatients.length === 0 ? (
          <Alert severity="info">
            Nenhum interagente com anamnese foi encontrado. Você pode preencher os dados manuais abaixo e criar uma ficha para começar.
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
                  <strong>Idade:</strong> {getPatientAge(selectedAnamnese) || 'Não informada'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }} className="no-print">
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>
          👤 Identificação do Interagente (Fallback Manual)
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nome completo"
              value={manualPatientData.q01_nome}
              onChange={(e) => handleManualPatientDataChange('q01_nome', e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label="Idade"
              value={manualPatientData.q03_idade}
              InputProps={{ readOnly: true }}
              fullWidth
              helperText="Calculado automaticamente pela data de nascimento"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label="Sexo"
              value={manualPatientData.q04_sexo}
              onChange={(e) => handleManualPatientDataChange('q04_sexo', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label="Nascimento"
              type="date"
              value={manualPatientData.q02_data_nasc}
              onChange={(e) => handleManualPatientDataChange('q02_data_nasc', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleCreateManualRecord}>
            Criar Ficha Manual
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            Use quando a identificação automática não carregar a partir da anamnese.
          </Typography>
        </Stack>
      </Paper>

      {/* Área de Análise de Iridologia */}
      <Box className="print-container">
        {/* Cabeçalho para impressão */}
        <Box className="only-print" sx={{ mb: 4 }}>
          <PrescriptionHeader 
            entry={selectedAnamnese || undefined}
          />
          <Typography variant="h5" align="center" sx={{ mt: 3, mb: 3, fontWeight: 'bold' }}>
            Análise de Iridologia
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 3 }}>
          {!selectedAnamnese && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Selecione um paciente para realizar ou visualizar a análise de iridologia.
            </Alert>
          )}

          <IridologyAnalysis
            patientId={currentIridologyPatientId}
            patientName={selectedAnamnese?.q01_nome || selectedPatientName || manualPatientData.q01_nome || ''}
            onAnalysisComplete={selectedAnamnese ? handleAnalysisComplete : handleStandaloneAnalysisComplete}
            savedAnalysis={selectedAnamnese?.iridologyAnalysis || standaloneAnalysis}
          />

          {selectedAnamnese && (
            <Box className="no-print" sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<VisibilityIcon />}
                onClick={handleViewAnamnese}
                sx={primaryActionButtonSx}
              >
                Rever anamnese deste interagente
              </Button>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Informações sobre Iridologia */}
      <Paper elevation={3} sx={{ p: 3, mt: 3 }} className="no-print">
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          ℹ️ Sobre a Análise de Iridologia
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="body2" paragraph>
                  <strong>O que é Iridologia?</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  A iridologia é uma técnica de análise que estuda a íris (parte colorida dos olhos) 
                  para identificar possíveis desequilíbrios orgânicos, predisposições e o estado geral 
                  de saúde do indivíduo.
                </Typography>
                
                <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                  <strong>Como funciona a análise?</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  1. <strong>Upload de Imagens:</strong> Faça upload de fotos de alta qualidade da íris esquerda e direita.<br/>
                  2. <strong>Análise Automática:</strong> O sistema identifica sinais iridológicos baseados em mapas tradicionais.<br/>
                  3. <strong>Relatório Detalhado:</strong> Receba informações sobre órgãos, sistemas e orientações terapêuticas.<br/>
                  4. <strong>Orientações:</strong> Sugestões de plantas medicinais, suplementos e mudanças de hábitos.
                </Typography>

                <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                  <strong>Dicas para melhores resultados:</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Use iluminação natural ou luz branca difusa<br/>
                  • Evite flash direto nos olhos<br/>
                  • Mantenha a câmera perpendicular à íris<br/>
                  • Aproxime-se o suficiente para capturar detalhes<br/>
                  • Imagens com boa resolução (mínimo 1280x720)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <SaveToPatientBar
        moduleKey="iridologyAnalysis"
        getData={() => selectedAnamnese?.iridologyAnalysis
          ? { ...selectedAnamnese.iridologyAnalysis, savedAt: new Date().toISOString() }
          : null}
        label="Salvar análise de iridologia no interagente"
      />
    </Container>
  );
}
