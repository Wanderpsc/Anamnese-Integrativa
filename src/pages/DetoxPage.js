import { useState, useRef, useMemo } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent, CardActionArea,
  Chip, Button, Stack, Divider, Dialog, DialogTitle, DialogContent,
  DialogActions, Paper, TextField, InputAdornment, MenuItem, Select,
  FormControl, InputLabel, Accordion, AccordionSummary, AccordionDetails,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Alert, AlertTitle, Tooltip, IconButton, Badge, LinearProgress,
  Autocomplete
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  LocalPharmacy as PharmacyIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Science as ScienceIcon,
  FilterList as FilterIcon,
  Spa as SpaIcon,
  AccessTime as TimeIcon,
  Assignment as AssignmentIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

import DETOX_PROTOCOLS, { DETOX_CATEGORIAS } from '../data/detoxData';
import PrescriptionActions from '../components/PrescriptionActions';
import { usePatientIntegration } from '../hooks/usePatientIntegration';
import SaveToPatientBar from '../components/SaveToPatientBar';

// ─────────────────────────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────────────────────────
function getPatientList() {
  try {
    return JSON.parse(localStorage.getItem('anamneses') || '[]');
  } catch {
    return [];
  }
}

function PatientName(p) {
  return p?.q01_nome || p?.q1_nome_completo || p?.nome || 'Sem nome';
}

// ─────────────────────────────────────────────────────────────────────────────
//  Card de protocolo (tela inicial)
// ─────────────────────────────────────────────────────────────────────────────
function ProtocolCard({ protocol, onClick }) {
  return (
    <Card
      sx={{
        height: '100%',
        border: `2px solid ${protocol.cor}30`,
        borderRadius: 3,
        transition: 'all 0.25s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: `0 12px 30px ${protocol.cor}40`,
          border: `2px solid ${protocol.cor}80`,
        },
      }}
    >
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <Box
          sx={{
            px: 2,
            pt: 2,
            pb: 1,
            background: `linear-gradient(135deg, ${protocol.cor}18 0%, ${protocol.corClara} 100%)`,
            borderBottom: `1px solid ${protocol.cor}30`,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h2" sx={{ lineHeight: 1 }}>
              {protocol.emoji}
            </Typography>
            <Chip
              label={protocol.duracao}
              size="small"
              icon={<TimeIcon sx={{ fontSize: 14 }} />}
              sx={{
                bgcolor: `${protocol.cor}20`,
                color: protocol.cor,
                fontWeight: 700,
                border: `1px solid ${protocol.cor}40`,
                height: 'auto',
                maxWidth: '68%',
                '& .MuiChip-label': {
                  whiteSpace: 'normal',
                  py: '4px',
                  lineHeight: 1.3,
                },
              }}
            />
          </Stack>
        </Box>
        <CardContent sx={{ pb: 2 }}>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ color: protocol.cor, mb: 0.5, lineHeight: 1.3 }}
          >
            {protocol.nome}
          </Typography>
          <Chip
            label={protocol.categoria}
            size="small"
            variant="outlined"
            sx={{ mb: 1, borderColor: `${protocol.cor}60`, color: protocol.cor, fontSize: '0.7rem' }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
            {protocol.objetivo.slice(0, 100)}...
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.5} mt={1.5}>
            {protocol.indicacoes.slice(0, 3).map((ind, i) => (
              <Chip
                key={i}
                label={ind}
                size="small"
                sx={{
                  bgcolor: `${protocol.cor}10`,
                  color: 'text.secondary',
                  fontSize: '0.68rem',
                }}
              />
            ))}
            {protocol.indicacoes.length > 3 && (
              <Chip
                label={`+${protocol.indicacoes.length - 3}`}
                size="small"
                sx={{ fontSize: '0.68rem', color: protocol.cor, fontWeight: 700 }}
              />
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Área de impressão do receituário
// ─────────────────────────────────────────────────────────────────────────────
function PrintableProtocol({ protocol, patient, observacoes }) {
  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Box id="prescription-print-area" sx={{ p: 3, fontFamily: 'Arial, sans-serif' }}>
      {/* Cabeçalho paciente */}
      {patient && (
        <Box
          sx={{
            mb: 2,
            p: 2,
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            border: '1px solid #ddd',
          }}
        >
          <Typography variant="subtitle2" fontWeight={700}>
            Interagente: {PatientName(patient)}
          </Typography>
          {patient.q03_idade && (
            <Typography variant="body2">Idade: {patient.q03_idade} anos</Typography>
          )}
          {patient.q04_sexo && (
            <Typography variant="body2">Sexo: {patient.q04_sexo}</Typography>
          )}
          <Typography variant="body2">Data: {today}</Typography>
        </Box>
      )}
      {!patient && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Data: {today}
        </Typography>
      )}

      {/* Título protocolo */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          {protocol.emoji} {protocol.nome}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {protocol.categoria}
        </Typography>
      </Box>

      <Divider sx={{ my: 1.5 }} />

      {/* Objetivo */}
      <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 1.5, mb: 0.5 }}>
        🎯 Objetivo Terapêutico
      </Typography>
      <Typography variant="body2">{protocol.objetivo}</Typography>

      {/* Duração */}
      <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 1.5, mb: 0.5 }}>
        ⏱ Duração
      </Typography>
      <Typography variant="body2">{protocol.duracao}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {protocol.fase}
      </Typography>

      <Divider sx={{ my: 1.5 }} />

      {/* Formulações */}
      {protocol.formulacoes.map((form, fi) => (
        <Box key={fi} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>
            💊 {form.nome}
          </Typography>

          <TableContainer component={Paper} variant="outlined" sx={{ mb: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                  <TableCell>
                    <strong>Componente</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Dose</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {form.componentes.map((c, ci) => (
                  <TableRow key={ci}>
                    <TableCell>{c.nome}</TableCell>
                    <TableCell align="right">{c.dose}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body2">
            <strong>Quantidade:</strong> {form.quantidade}
          </Typography>
          <Typography variant="body2">
            <strong>Posologia:</strong> {form.posologia}
          </Typography>
          {form.observacao && (
            <Alert severity="warning" sx={{ mt: 0.5, py: 0.2 }}>
              <Typography variant="caption">{form.observacao}</Typography>
            </Alert>
          )}
        </Box>
      ))}

      <Divider sx={{ my: 1.5 }} />

      {/* Cuidados */}
      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>
        ⚠️ Cuidados e Orientações
      </Typography>
      {protocol.cuidados.map((c, i) => (
        <Typography key={i} variant="body2" sx={{ ml: 1 }}>
          • {c}
        </Typography>
      ))}

      {/* Contraindicações */}
      <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 1.5, mb: 0.5 }}>
        🚫 Contraindicações
      </Typography>
      {protocol.contraindicacoes.map((c, i) => (
        <Typography key={i} variant="body2" sx={{ ml: 1 }}>
          • {c}
        </Typography>
      ))}

      {/* Efeitos esperados */}
      <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 1.5, mb: 0.5 }}>
        ✅ Efeitos Esperados
      </Typography>
      {protocol.efeitos.map((e, i) => (
        <Typography key={i} variant="body2" sx={{ ml: 1 }}>
          • {e}
        </Typography>
      ))}

      {/* Observações do profissional */}
      {observacoes && (
        <>
          <Divider sx={{ my: 1.5 }} />
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>
            📝 Observações do Profissional
          </Typography>
          <Typography variant="body2">{observacoes}</Typography>
        </>
      )}

      {/* Rodapé */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="caption" color="text.secondary" display="block" textAlign="center">
        Fonte: {protocol.fonte}
      </Typography>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Dialog detalhado / receituário
// ─────────────────────────────────────────────────────────────────────────────
function ProtocolDialog({ protocol, open, onClose, onAttach }) {
  const { patientData } = usePatientIntegration('detox');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [observacoes, setObservacoes] = useState('');
  const [attachMessage, setAttachMessage] = useState('');
  const [showPrint, setShowPrint] = useState(false);
  const printRef = useRef(null);
  const patients = useMemo(() => getPatientList(), []);

  if (!protocol) return null;

  const handleAttach = () => {
    if (!selectedPatient) {
      setAttachMessage('Selecione um interagente para anexar este protocolo.');
      return;
    }
    const saved = onAttach?.(selectedPatient, { protocol, observacoes, savedAt: new Date().toISOString() });
    setAttachMessage(saved ? `Protocolo anexado a ${PatientName(selectedPatient)}.` : 'Não foi possível anexar o protocolo.');
  };

  const handleShare = () => {
    const text = `${protocol.emoji} ${protocol.nome}\n\nDuração: ${protocol.duracao}\n\nFonte: ${protocol.fonte}\n\n⚠️ Prescrição individualizada – consulte seu terapeuta.`;
    if (navigator.share) {
      navigator.share({ title: protocol.nome, text });
    } else {
      navigator.clipboard.writeText(text).then(() => alert('Texto copiado!'));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, overflow: 'hidden' },
      }}
    >
      {/* Header colorido */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${protocol.cor} 0%, ${protocol.cor}cc 100%)`,
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography variant="h3" sx={{ lineHeight: 1 }}>
            {protocol.emoji}
          </Typography>
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ color: 'white', lineHeight: 1.2 }}>
              {protocol.nome}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              {protocol.categoria}
            </Typography>
          </Box>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {/* Informações rápidas */}
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={1}
          sx={{ px: 3, py: 2, bgcolor: `${protocol.cor}08` }}
        >
          <Chip
            icon={<TimeIcon />}
            label={`Duração: ${protocol.duracao}`}
            sx={{ bgcolor: `${protocol.cor}20`, color: protocol.cor, fontWeight: 600 }}
          />
          <Chip
            icon={<AssignmentIcon />}
            label={`${protocol.formulacoes.length} fórmula(s)`}
            sx={{ bgcolor: `${protocol.cor}20`, color: protocol.cor, fontWeight: 600 }}
          />
          <Chip
            icon={<ScienceIcon />}
            label={protocol.fonte.slice(0, 35) + (protocol.fonte.length > 35 ? '…' : '')}
            variant="outlined"
            size="small"
          />
        </Stack>

        <Box sx={{ px: 3, pb: 3 }}>
          {/* Objetivo */}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: 2,
              bgcolor: `${protocol.cor}08`,
              borderColor: `${protocol.cor}30`,
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle2" fontWeight={700} color={protocol.cor} gutterBottom>
              🎯 Objetivo Terapêutico
            </Typography>
            <Typography variant="body2">{protocol.objetivo}</Typography>
          </Paper>

          {/* Indicações */}
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
            📋 Indicações
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.5} mb={2}>
            {protocol.indicacoes.map((ind, i) => (
              <Chip
                key={i}
                label={ind}
                size="small"
                icon={<CheckCircleIcon sx={{ fontSize: 14, color: `${protocol.cor} !important` }} />}
                sx={{ bgcolor: `${protocol.cor}12`, border: `1px solid ${protocol.cor}30` }}
              />
            ))}
          </Stack>

          {/* Fase / linha do tempo */}
          <Paper
            variant="outlined"
            sx={{ p: 2, mb: 2, borderRadius: 2, bgcolor: '#fafafa' }}
          >
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              ⏱ Duração e Fases
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {protocol.duracao}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {protocol.fase}
            </Typography>
          </Paper>

          {/* Formulações */}
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
            💊 Formulações
          </Typography>
          {protocol.formulacoes.map((form, fi) => (
            <Accordion
              key={fi}
              defaultExpanded={fi === 0}
              sx={{ mb: 1, border: `1px solid ${protocol.cor}30`, borderRadius: '8px !important', '&:before': { display: 'none' } }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  bgcolor: `${protocol.cor}10`,
                  borderRadius: '8px',
                  '&.Mui-expanded': { borderRadius: '8px 8px 0 0' },
                }}
              >
                <Typography variant="subtitle2" fontWeight={700}>
                  {fi + 1}. {form.nome}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 2 }}>
                {/* Tabela de componentes */}
                <TableContainer component={Paper} variant="outlined" sx={{ mb: 1.5 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: `${protocol.cor}10` }}>
                        <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
                          Componente
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
                          Dose
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {form.componentes.map((c, ci) => (
                        <TableRow
                          key={ci}
                          sx={{ '&:last-child td': { border: 0 }, '&:hover': { bgcolor: `${protocol.cor}05` } }}
                        >
                          <TableCell sx={{ fontSize: '0.8rem' }}>{c.nome}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.8rem', color: protocol.cor }}>
                            {c.dose}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Stack spacing={0.5}>
                  <Typography variant="body2">
                    <strong>Quantidade:</strong> {form.quantidade}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Posologia:</strong> {form.posologia}
                  </Typography>
                  {form.observacao && (
                    <Alert severity={form.observacao.startsWith('⚠️') ? 'warning' : 'info'} sx={{ mt: 0.5 }}>
                      <Typography variant="caption">{form.observacao}</Typography>
                    </Alert>
                  )}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}

          {/* Cuidados */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: '#fff8e1', borderColor: '#ffe082', borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight={700} color="#f57f17" gutterBottom>
              ⚠️ Cuidados e Orientações
            </Typography>
            <Stack spacing={0.5}>
              {protocol.cuidados.map((c, i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                  <Typography variant="body2" color="#f57f17">•</Typography>
                  <Typography variant="body2">{c}</Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>

          {/* Contraindicações */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: '#ffebee', borderColor: '#ef9a9a', borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight={700} color="#c62828" gutterBottom>
              🚫 Contraindicações
            </Typography>
            <Stack spacing={0.5}>
              {protocol.contraindicacoes.map((c, i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                  <Typography variant="body2" color="#c62828">•</Typography>
                  <Typography variant="body2">{c}</Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>

          {/* Efeitos esperados */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: '#e8f5e9', borderColor: '#a5d6a7', borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight={700} color="#2e7d32" gutterBottom>
              ✅ Efeitos Esperados
            </Typography>
            <Stack spacing={0.5}>
              {protocol.efeitos.map((e, i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                  <Typography variant="body2" color="#2e7d32">•</Typography>
                  <Typography variant="body2">{e}</Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>

          <Divider sx={{ my: 2 }} />

          {/* Seleção de paciente */}
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
            <PersonIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
            Selecionar Interagente para o Receituário
          </Typography>
          <Autocomplete
            options={patients}
            getOptionLabel={(p) => PatientName(p)}
            value={selectedPatient}
            onChange={(_, v) => setSelectedPatient(v)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar interagente cadastrado"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <PersonIcon fontSize="small" />
                      </InputAdornment>
                      {params.InputProps.startAdornment}
                    </>
                  ),
                }}
              />
            )}
            sx={{ mb: 2 }}
          />

          {/* Observações adicionais */}
          <TextField
            label="Observações adicionais do profissional (opcional)"
            multiline
            rows={3}
            fullWidth
            size="small"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Ex.: ajuste de dose, associações recomendadas, orientações dietéticas específicas…"
            sx={{ mb: 2 }}
          />

          {/* Alerta legal */}
          <Alert severity="warning" icon={<WarningIcon />} sx={{ mt: 1 }}>
            <AlertTitle>Aviso de Segurança</AlertTitle>
            Este receituário é de uso exclusivo terapêutico e deve ser prescrito por profissional
            habilitado. Dosagens, contraindicações e interações são individuais. Verifique sempre
            com o paciente alergias e uso de outros medicamentos antes de prescrever.
          </Alert>
          {attachMessage && (
            <Alert severity={attachMessage.startsWith('Protocolo') ? 'success' : 'info'} sx={{ mt: 2 }}>
              {attachMessage}
            </Alert>
          )}
        </Box>

        {/* Área oculta de impressão */}
        <Box ref={printRef} sx={{ display: 'none' }}>
          <PrintableProtocol
            protocol={protocol}
            patient={selectedPatient || patientData}
            observacoes={observacoes}
          />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        <Button variant="outlined" onClick={onClose} startIcon={<CloseIcon />}>
          Fechar
        </Button>
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          onClick={handleShare}
        >
          Compartilhar
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<SaveIcon />}
          onClick={handleAttach}
        >
          Anexar ao interagente
        </Button>
        <PrescriptionActions
          patientData={selectedPatient || patientData}
          contentRef={printRef}
          contentTitle={`Detox_${protocol.nome.replace(/\s+/g, '_')}`}
          onBack={onClose}
          showWarning={false}
          customButtons={null}
        />
      </DialogActions>
    </Dialog>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Página principal
// ─────────────────────────────────────────────────────────────────────────────
export default function DetoxPage() {
  const [search, setSearch] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todos');
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const attachProtocolToPatient = (patient, data) => {
    try {
      const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const index = anamneses.findIndex(item => String(item.id) === String(patient.id));
      if (index === -1) return false;

      anamneses[index].detoxProtocol = data;
      delete anamneses[index].detoxProtocols;
      anamneses[index].updatedAt = new Date().toISOString();
      localStorage.setItem('anamneses', JSON.stringify(anamneses));
      window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: anamneses[index] }));
      return true;
    } catch (error) {
      console.error('Erro ao anexar protocolo detox ao interagente:', error);
      return false;
    }
  };

  const filtered = useMemo(() => {
    return DETOX_PROTOCOLS.filter((p) => {
      const matchCat =
        categoriaFiltro === 'todos' || p.categoria === categoriaFiltro;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.nome.toLowerCase().includes(q) ||
        p.objetivo.toLowerCase().includes(q) ||
        p.indicacoes.some((i) => i.toLowerCase().includes(q)) ||
        p.categoria.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, categoriaFiltro]);

  const openProtocol = (protocol) => {
    setSelectedProtocol(protocol);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero banner */}
      <Box
        sx={{
          background:
            'linear-gradient(135deg, #1a237e 0%, #0d47a1 40%, #006064 100%)',
          color: 'white',
          px: { xs: 2, md: 4 },
          py: 4,
          mb: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Círculos decorativos */}
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.04)',
              width: [200, 350, 500][i],
              height: [200, 350, 500][i],
              top: [-50, -80, -120][i],
              right: [-50, -80, -120][i],
              pointerEvents: 'none',
            }}
          />
        ))}

        <Stack direction="row" spacing={2} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
          <SpaIcon sx={{ fontSize: 48 }} />
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              Detoxificação Integrativa
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Protocolos clínicos de depuração, limpeza e reequilíbrio orgânico
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          mt={3}
          sx={{ position: 'relative', zIndex: 1 }}
        >
          {[
            { label: `${DETOX_PROTOCOLS.length} Protocolos`, sub: 'base de dados' },
            { label: 'Formulações', sub: 'para manipulação' },
            { label: 'Receituário', sub: 'imprimível / PDF' },
          ].map((item, i) => (
            <Paper
              key={i}
              sx={{
                px: 2,
                py: 1.5,
                bgcolor: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 2,
                flex: 1,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ color: 'white' }}>
                {item.label}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)' }}>
                {item.sub}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Box>

      <Container maxWidth="xl" sx={{ pb: 6 }}>
        {/* Aviso legal no topo */}
        <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 3, borderRadius: 2 }}>
          <AlertTitle>Uso Profissional</AlertTitle>
          Estes protocolos são destinados a uso supervisionado por profissional habilitado.
          Dosagens, contraindicações e interações devem ser avaliadas individualmente.
          Não prescreva sem avaliação completa do interagente.
        </Alert>

        {/* Barra de filtros */}
        <Paper
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', md: 'center' }}
          >
            <TextField
              size="small"
              placeholder="Buscar por nome, indicação, objetivo…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 1, minWidth: 220 }}
            />

            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel>
                <FilterIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                Filtrar por categoria
              </InputLabel>
              <Select
                value={categoriaFiltro}
                label="Filtrar por categoria"
                onChange={(e) => setCategoriaFiltro(e.target.value)}
              >
                {DETOX_CATEGORIAS.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Chip
              label={`${filtered.length} protocolo(s)`}
              color="primary"
              variant="outlined"
            />
          </Stack>
        </Paper>

        {/* Grade de protocolos */}
        {filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <SpaIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Nenhum protocolo encontrado
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => { setSearch(''); setCategoriaFiltro('todos'); }}
            >
              Limpar filtros
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filtered.map((protocol) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={protocol.id}>
                <ProtocolCard protocol={protocol} onClick={() => openProtocol(protocol)} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Legenda de segurança */}
        <Paper
          variant="outlined"
          sx={{ mt: 5, p: 3, borderRadius: 3, bgcolor: '#fafafa' }}
        >
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            📚 Fontes Utilizadas
          </Typography>
          <Stack spacing={0.5}>
            {[
              'Guia de Formulações Maria Rocha Farmácia de Manipulação – Fascículo 2 (Depuração)',
              'Apostila de Naturopatia Aplicada – Instituto Viva Melhor (IVM)',
              'Protocolos de Detoxificação e Desparasitação Funcional – Aula 7 (curso IVM)',
              'Protocolo Detox Intramuscular – Instituto de Estudos Farmacêuticos (IEF)',
              'Conceito de Limpeza Hepatobiliar – Dra. Andreas Moritz',
              'Protocolo Quarteto Hepático – Dr. José Maria Cardesin',
            ].map((s, i) => (
              <Typography key={i} variant="body2" color="text.secondary">
                • {s}
              </Typography>
            ))}
          </Stack>
        </Paper>
      </Container>

      {/* Dialog de detalhes e receituário */}
      <ProtocolDialog
        protocol={selectedProtocol}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAttach={attachProtocolToPatient}
      />

      <SaveToPatientBar
        moduleKey="detoxProtocol"
        getData={() => selectedProtocol
          ? { selectedProtocol, savedAt: new Date().toISOString() }
          : null}
        label="Salvar protocolo detox no interagente"
      />
    </Box>
  );
}
