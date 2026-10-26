import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl } from '../components/PrintTemplate';
import { gatherPatientExams, computeConsolidatedExams, buildConsolidatedExamsHtml, examsToCsvRows } from '../lib/exams';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  InsertDriveFile as FileIcon,
  Healing as HealingIcon,
  Science as ScienceIcon,
  MedicalServices as MedicalIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

export default function PatientExams() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [allAnamneses, setAllAnamneses] = useState([]);
  const [bloodTests, setBloodTests] = useState([]);
  const [uniquePatients, setUniquePatients] = useState([]);
  const [selectedPatientName, setSelectedPatientName] = useState('');
  const [patientExams, setPatientExams] = useState({ iridology: [], biorresonancia: [], bloodTests: [] });

  useEffect(() => {
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const blood = JSON.parse(localStorage.getItem('bloodTests') || '[]');
    setAllAnamneses(anamneses);
    setBloodTests(blood);
    const patientNamesFromAnamneses = anamneses.map(a => a.q01_nome).filter(Boolean);
    const patientNamesFromBlood = blood.map(b => b.patientName).filter(Boolean);
    const patients = [...new Set([...patientNamesFromAnamneses, ...patientNamesFromBlood])].filter(Boolean);
    setUniquePatients(patients.sort());
    if (id) {
      const anam = anamneses.find(a => String(a.id) === String(id));
      if (anam && anam.q01_nome) setSelectedPatientName(anam.q01_nome);
    } else if (patients.length > 0) {
      setSelectedPatientName(patients[0]);
    }
  }, [id]);

  useEffect(() => {
    if (!selectedPatientName) {
      setPatientExams({ iridology: [], biorresonancia: [], bloodTests: [] });
      return;
    }
    const gathered = gatherPatientExams(allAnamneses, bloodTests, selectedPatientName);
    setPatientExams(gathered);
  }, [selectedPatientName, allAnamneses, bloodTests]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Data não informada';
    if (!isNaN(Date.parse(dateStr))) return new Date(dateStr).toLocaleDateString('pt-BR');
    return dateStr;
  };

  const handlePrint = () => window.print();

  const downloadConsolidatedPdf = async () => {
    const consolidated = computeConsolidatedExams(patientExams);
    if (!consolidated) return;
    try {
      const bodyHtml = buildConsolidatedExamsHtml(selectedPatientName, consolidated);
      const qrUrl = await generateQrDataUrl(`${window.location.origin}/paciente/${selectedPatientName}`);
      const title = `exames_consolidado_${selectedPatientName?.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}`;
      const html = await buildLetterheadHtml({ title, bodyHtml, qrUrl });
      await downloadPdfFromHtml(html, `${title}.pdf`);
    } catch (err) {
      console.error('Erro ao gerar PDF consolidado de exames:', err);
      window.print();
    }
  };

  const downloadCsv = () => {
    const rows = examsToCsvRows(patientExams);
    const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exames_${selectedPatientName?.replace(/\s/g,'_')}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const consolidated = computeConsolidatedExams(patientExams);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }} className="print-container">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <ScienceIcon /> Exames
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#666' }}>
            Histórico e resultados de exames (Iridologia, Biorressonância, Exames de Sangue)
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Selecionar Paciente</InputLabel>
            <Select value={selectedPatientName} label="Selecionar Paciente" onChange={(e) => setSelectedPatientName(e.target.value)}>
              {uniquePatients.map(name => (
                <MenuItem key={name} value={name}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon fontSize="small" /> {name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Resumo Consolidado */}
        {(patientExams.iridology.length > 0 || patientExams.biorresonancia.length > 0 || patientExams.bloodTests.length > 0) && (
          <Card sx={{ mb: 3, bgcolor: '#f1f8e9' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#1976d2', mb: 1 }}>
                Resumo Consolidado de Exames
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Iridologia</Typography>
                  {consolidated?.latestIridology ? (
                    <div>
                      {typeof consolidated.latestIridology.analysis === 'string' ? (
                        <Typography variant="body2">{consolidated.latestIridology.analysis}</Typography>
                      ) : (
                        <Typography variant="body2">{consolidated.latestIridology.analysis.generalFindings}</Typography>
                      )}
                      <Typography variant="caption" color="text.secondary">{`Data: ${formatDate(consolidated.latestIridology.createdAt)}`}</Typography>
                    </div>
                  ) : (
                    <Typography variant="body2" color="text.secondary">Não há exame de Iridologia</Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Biorressonância</Typography>
                  {consolidated?.latestBior ? (
                    <div>
                      <Typography variant="body2">{consolidated.latestBior.analysis}</Typography>
                      {consolidated.latestBior.file?.name && <Typography variant="caption" color="text.secondary">Arquivo: {consolidated.latestBior.file.name}</Typography>}
                      <Typography variant="caption" display="block" color="text.secondary">{`Data: ${formatDate(consolidated.latestBior.createdAt)}`}</Typography>
                    </div>
                  ) : (
                    <Typography variant="body2" color="text.secondary">Não há exame de Biorressonância</Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Exames de Sangue</Typography>
                  {consolidated?.latestBlood ? (
                    <div>
                      <Typography variant="body2">Laboratório: {consolidated.latestBlood.laboratory || 'Não informado'}</Typography>
                      <Typography variant="caption" display="block" color="text.secondary">Data do exame: {formatDate(consolidated.latestBlood.testDate || consolidated.latestBlood.createdAt)}</Typography>
                    </div>
                  ) : (
                    <Typography variant="body2" color="text.secondary">Não há exames de sangue</Typography>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Histórico de Exames */}
        <Box>
          <Typography variant="h5" sx={{ mb: 2, color: '#1976d2' }}>Histórico de Exames</Typography>

          {/* Iridologia History */}
          {patientExams.iridology.length > 0 && (
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">👁️ Iridologia</Typography>
                <List dense>
                  {patientExams.iridology.map((ir) => (
                    <ListItem key={`ir-${ir.id}-${ir.createdAt}`}> 
                      <ListItemText primary={ir.analysis?.generalFindings || (typeof ir.analysis === 'string' ? ir.analysis : 'Análise')} secondary={`Data: ${formatDate(ir.createdAt)}`} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Biorresonancia History */}
          {patientExams.biorresonancia.length > 0 && (
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">📊 Biorressonância</Typography>
                <List dense>
                  {patientExams.biorresonancia.map((b) => (
                    <ListItem key={`bio-${b.id}-${b.createdAt}`}> 
                      <ListItemText primary={b.analysis || b.file?.name || 'Biorressonância'} secondary={`Tipo: ${b.type} • Data: ${formatDate(b.createdAt)}`} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Blood tests history */}
          {patientExams.bloodTests.length > 0 && (
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">🩸 Exames de Sangue</Typography>
                <List dense>
                  {patientExams.bloodTests.map((bt) => (
                    <ListItem key={`bt-${bt.id}-${bt.testDate || bt.createdAt}`}> 
                      <ListItemText primary={`Laboratório: ${bt.laboratory || 'Não informado'}`} secondary={`Data do exame: ${formatDate(bt.testDate || bt.createdAt)}`} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Box>

        {/* Actions */}
        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }} className="no-print">
          <Button variant="outlined" onClick={() => navigate('/dashboard')}>Voltar ao Dashboard</Button>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint} disabled={!selectedPatientName}>Imprimir</Button>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={downloadConsolidatedPdf} disabled={!selectedPatientName}>Download Consolidado (PDF)</Button>
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={downloadCsv} disabled={!selectedPatientName}>Download Consolidado (CSV)</Button>
        </Box>
      </Paper>
    </Container>
  );
}
