import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper,
  Stack,
  Chip,
  Alert,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Badge,
  Snackbar,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Event as EventIcon,
  Dashboard as DashboardIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  CalendarMonth as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  OpenInNew as OpenInNewIcon,
  ContentCopy as ContentCopyIcon,
  Assignment as AssignmentIcon,
  Psychology as PsychologyIcon,
  Settings as SettingsIcon,
  TableChart as GridIcon,
  NotificationsActive as NotificationsIcon,
  HowToReg as HowToRegIcon,
  PersonOff as PersonOffIcon,
  WhatsApp as WhatsAppIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { listAppointments as apiListAppointments, updateAppointmentStatus as apiUpdateStatus, deleteAppointment as apiDeleteAppointment, deleteAnamnese as apiDeleteAnamnese, setSetting as apiSetSetting, getSetting as apiGetSetting } from '../lib/api';
import ScheduleConfig from '../components/ScheduleConfig';

/** Gera o link público para o paciente confirmar/cancelar a consulta */
function buildPatientConfirmLink(appointment) {
  return `${window.location.origin}/appointment/confirm?id=${appointment.id}`;
}

/** Gera link WhatsApp com mensagem de confirmação para o paciente */
function buildWhatsAppConfirmMessage(appointment) {
  const confirmLink = buildPatientConfirmLink(appointment);
  const dateStr = appointment.date ? new Date(appointment.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' }) : '';
  const msg = [
    `Olá, ${appointment.patient}! 👋`,
    '',
    `✅ *SEU AGENDAMENTO FOI CONFIRMADO*`,
    '',
    `📅 *Data:* ${dateStr}`,
    `🕐 *Horário:* ${appointment.time}`,
    appointment.q14_tipo_consulta ? `📋 *Tipo:* ${appointment.q14_tipo_consulta}` : '',
    '',
    `⚠️ *IMPORTANTE — Confirme sua presença ou cancele pelo link abaixo com pelo menos 1 hora de antecedência:*`,
    confirmLink,
    '',
    `*Orientações para a consulta:*`,
    `• Chegue 10 minutos antes`,
    `• Traga exames laboratoriais/imagem recentes`,
    `• Traga lista de medicamentos em uso`,
    '',
    `Dúvidas? Responda esta mensagem. Até breve! 🌿`,
  ].filter(l => l !== undefined).join('\n');
  const phone = (appointment.q11_telefone || '').replace(/\D/g, '');
  const normalizedPhone = phone.startsWith('55') ? phone : phone ? `55${phone}` : '';
  return normalizedPhone ? `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(msg)}` : '';
}

export default function Appointments() {
  const navigate = useNavigate();
  const [anamneses, setAnamneses] = useState([]);
  const [mainTab, setMainTab] = useState(0);

  const loadAnamneses = () => {
    try {
      setAnamneses(JSON.parse(localStorage.getItem('anamneses') || '[]') || []);
    } catch (e) { setAnamneses([]); }
  };

  const getAnamnesisForAppt = (apt) => {
    if (!apt.anamneseId) return null;
    return anamneses.find(a => String(a.id) === String(apt.anamneseId)) || null;
  };

  const hasDialogFilled = (apt) => !!getAnamnesisForAppt(apt)?.anamnesisIntegrativa;
  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [openBookingCopyDialog, setOpenBookingCopyDialog] = useState(false);
  const [bookingCopy, setBookingCopy] = useState(() => localStorage.getItem('publicBookingCopy') || '');
  const [bookingCopySaved, setBookingCopySaved] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const [confirmFeedback, setConfirmFeedback] = useState(null); // appointment object after confirming

  const copyToClipboard = (text, label) => {
    navigator.clipboard?.writeText(text).catch(() => {
      const el = document.createElement('textarea');
      el.value = text; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
    });
    setSnackMsg(label || 'Link copiado!');
    setSnackOpen(true);
  };

  const handleSaveBookingCopy = async () => {
    localStorage.setItem('publicBookingCopy', bookingCopy);
    try { await apiSetSetting('publicBookingCopy', bookingCopy); } catch (e) { /* fallback local já salvo */ }
    window.dispatchEvent(new StorageEvent('storage', { key: 'publicBookingCopy', newValue: bookingCopy }));
    setBookingCopySaved(true);
    setTimeout(() => { setBookingCopySaved(false); setOpenBookingCopyDialog(false); }, 1200);
  };
  const [formData, setFormData] = useState({
    patient: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    status: 'confirmed', // Default set to confirmed by owner (Option A)
    notes: ''
  });

  const loadAppointmentsFromApi = async () => {
    try {
      const data = await apiListAppointments();
      console.log('Loaded appointments (from API or merged):', data);
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      const saved = JSON.parse(localStorage.getItem('appointments') || '[]');
      console.log('Loaded appointments (from localStorage fallback):', saved);
      setAppointments(saved);
    }
  };

  useEffect(() => {
    loadAppointmentsFromApi();
    loadAnamneses();

    // Update when the app has externally updated appointments
    const handleAppointmentsUpdated = (e) => {
      console.log('Appointments page received appointments:updated', e?.detail);
      loadAppointmentsFromApi();
    };
    window.addEventListener('appointments:updated', handleAppointmentsUpdated);
    const handleStorageEvent = (evt) => {
      if (evt.key === 'appointments') loadAppointmentsFromApi();
      if (evt.key === 'anamneses') loadAnamneses();
    };
    window.addEventListener('storage', handleStorageEvent);
    const handleAnamnesisUpdated = () => loadAnamneses();
    window.addEventListener('anamneses:updated', handleAnamnesisUpdated);

    return () => {
      window.removeEventListener('appointments:updated', handleAppointmentsUpdated);
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('anamneses:updated', handleAnamnesisUpdated);
    };
  }, []);

  const saveAppointments = (data) => {
    localStorage.setItem('appointments', JSON.stringify(data));
    setAppointments(data);
  };

  const handleOpenDialog = (appointment = null) => {
    if (appointment) {
      setEditingId(appointment.id);
      setFormData(appointment);
    } else {
      setEditingId(null);
      setFormData({
        patient: '',
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        status: 'confirmed',
        notes: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (editingId) {
      const updated = appointments.map(a => a.id === editingId ? { ...formData, id: editingId } : a);
      saveAppointments(updated);
    } else {
      // ensure we have an anamnese linked (minimal) so the appointment can open it
      let anamneseId = formData.anamneseId;
      if (!anamneseId) {
        const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
        const newAnamnese = {
          id: Date.now() + 1,
          q01_nome: formData.patient || '',
          q02_data_nasc: formData.date || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        anamneses.push(newAnamnese);
        localStorage.setItem('anamneses', JSON.stringify(anamneses));
        try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: newAnamnese })); } catch (e) { /* ignore */ }
        anamneseId = newAnamnese.id;
      }
      const newAppointment = { ...formData, id: Date.now(), anamneseId };
      saveAppointments([...appointments, newAppointment]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    const appointment = appointments.find(a => a.id === id);
    if (!appointment) return;
    let msg = 'Deseja realmente excluir este agendamento?';
    if (appointment.anamneseId) {
      msg += '\nIsso também excluirá a anamnese vinculada.';
    }
    if (window.confirm(msg)) {
      // Atualização otimista: remove localmente ANTES da chamada à API
      const updatedAppt = appointments.filter(a => a.id !== id);
      saveAppointments(updatedAppt);

      // Chama API de forma assíncrona sem reverter se falhar
      apiDeleteAppointment(id).catch(() => { /* ignore */ });

      if (appointment.anamneseId) {
        apiDeleteAnamnese(appointment.anamneseId).catch(() => {
          const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
          const updatedAnam = anamneses.filter(a => a.id !== appointment.anamneseId);
          localStorage.setItem('anamneses', JSON.stringify(updatedAnam));
          try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: { id: appointment.anamneseId } })); } catch (e) { /* ignore */ }
        });
      }
    }
  };

  const handleStatusChange = (id, newStatus) => {
    // Atualização otimista: muda estado local imediatamente
    const updated = appointments.map(a => a.id === id ? { ...a, status: newStatus } : a);
    saveAppointments(updated);
    // Sincroniza com API de forma assíncrona (sem reverter em caso de falha)
    apiUpdateStatus(id, newStatus).catch(() => { /* ignore */ });
    // Quando confirmar: exibe feedback com link para paciente
    if (newStatus === 'confirmed') {
      const appt = appointments.find(a => a.id === id);
      if (appt) setConfirmFeedback({ ...appt, status: 'confirmed' });
    }
  };

  const statusColors = {
    scheduled: 'primary',
    confirmed: 'success',
    completed: 'info',
    cancelled: 'error'
  };

  const statusLabels = {
    scheduled: 'Agendado',
    confirmed: 'Confirmado',
    completed: 'Realizado',
    cancelled: 'Cancelado'
  };

  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.date === today);
  const upcomingAppointments = appointments.filter(a => a.date > today).sort((a, b) => a.date.localeCompare(b.date));
  const pendingOverdue = appointments.filter(a => a.date < today && a.status === 'scheduled').sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>

      {/* ── Feedback Dialog: agendamento confirmado ─────────────────────── */}
      <Dialog
        open={!!confirmFeedback}
        onClose={() => setConfirmFeedback(null)}
        maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'success.main', color: '#fff', borderRadius: '12px 12px 0 0' }}>
          <NotificationsIcon /> Agendamento Confirmado!
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {confirmFeedback && (
            <>
              <Alert severity="success" sx={{ mb: 2 }}>
                ✅ Agendamento de <strong>{confirmFeedback.patient}</strong> confirmado para{' '}
                <strong>{new Date(confirmFeedback.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}</strong>{' '}
                às <strong>{confirmFeedback.time}</strong>.
              </Alert>

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                📲 Envie o link abaixo ao paciente
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                O paciente poderá <strong>reconfirmar a presença</strong> ou{' '}
                <strong>cancelar a consulta</strong> com pelo menos <strong>1 hora de antecedência</strong>
                diretamente pelo link.
              </Typography>

              <Box sx={{ p: 1.5, bgcolor: '#f5f5f5', borderRadius: 2, mb: 2, wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '0.82rem', color: '#1565c0' }}>
                {buildPatientConfirmLink(confirmFeedback)}
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => copyToClipboard(buildPatientConfirmLink(confirmFeedback), 'Link de confirmação copiado!')}
                  size="small"
                >
                  Copiar Link
                </Button>
                {buildWhatsAppConfirmMessage(confirmFeedback) && (
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<WhatsAppIcon />}
                    component="a"
                    href={buildWhatsAppConfirmMessage(confirmFeedback)}
                    target="_blank"
                    rel="noreferrer noopener"
                    size="small"
                  >
                    Enviar via WhatsApp
                  </Button>
                )}
                <Button
                  variant="outlined"
                  startIcon={<LinkIcon />}
                  component="a"
                  href={buildPatientConfirmLink(confirmFeedback)}
                  target="_blank"
                  rel="noreferrer noopener"
                  size="small"
                >
                  Abrir Link
                </Button>
              </Box>

              <Alert severity="info" icon={false} sx={{ fontSize: '0.82rem' }}>
                <strong>Como funciona:</strong> O paciente acessa o link, vê os detalhes da consulta e
                clica em "Confirmar Presença" ou "Cancelar Consulta". Cancelamentos feitos dentro de 1h
                antes da consulta são bloqueados automaticamente. Você verá o status de resposta do paciente
                no card do agendamento (chip verde/vermelho).
              </Alert>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirmFeedback(null)} variant="contained">Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <EventIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" color="primary" fontWeight="600">
              Agendamentos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gerencie consultas e retornos
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            sx={{ ml: 2 }}
            onClick={() => copyToClipboard(`${window.location.origin}/book`, 'Link de agendamento copiado! Envie ao paciente para ele marcar a consulta.')}
          >
            Copiar link público
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => {
              setBookingCopy(localStorage.getItem('publicBookingCopy') || '');
              setOpenBookingCopyDialog(true);
            }}
          >
            Editar texto do link
          </Button>
        </Box>
        <Button 
          variant="contained" 
          size="large"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ px: 3 }}
        >
          Novo Agendamento
        </Button>
      </Box>

      {/* MAIN TABS */}
      <Tabs
        value={mainTab} onChange={(_, v) => setMainTab(v)}
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
        variant="scrollable" scrollButtons="auto"
      >
        <Tab icon={<EventIcon />} label="Agendamentos" iconPosition="start" />
        <Tab icon={<SettingsIcon />} label="Configurar Agenda" iconPosition="start" />
      </Tabs>

      {mainTab === 1 && (
        <ScheduleConfig appointments={appointments} />
      )}

      {mainTab === 0 && (<>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold">{todayAppointments.length}</Typography>
              <Typography variant="body2">Hoje</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold">
                {appointments.filter(a => a.patientStatus === 'confirmed').length}
              </Typography>
              <Typography variant="body2">Confirmados</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'info.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold">{upcomingAppointments.length}</Typography>
              <Typography variant="body2">Próximos</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'warning.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold">
                {appointments.filter(a => !a.patientStatus && a.status !== 'cancelled').length}
              </Typography>
              <Typography variant="body2">Aguardando</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Today's Appointments */}
      {todayAppointments.length > 0 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarIcon /> Agendamentos de Hoje
          </Typography>
          <Grid container spacing={2}>
            {todayAppointments.map(apt => (
              <Grid item xs={12} md={6} key={apt.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon color="primary" />
                        <Typography variant="h6">{apt.patient}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
                        <Chip 
                          label={statusLabels[apt.status]} 
                          color={statusColors[apt.status]}
                          size="small"
                        />
                        {apt.anamneseId && hasDialogFilled(apt) && (
                          <Chip
                            size="small"
                            icon={<PsychologyIcon sx={{ fontSize: '0.9rem !important' }} />}
                            label="Diálogo ✓"
                            color="success"
                            variant="filled"
                          />
                        )}
                        {apt.patientStatus === 'confirmed' && (
                          <Chip size="small" icon={<HowToRegIcon sx={{ fontSize: '0.9rem !important' }} />}
                            label="Paciente confirmou" color="success" variant="outlined" />
                        )}
                        {apt.patientStatus === 'cancelled' && (
                          <Chip size="small" icon={<PersonOffIcon sx={{ fontSize: '0.9rem !important' }} />}
                            label="Paciente cancelou" color="error" variant="outlined" />
                        )}
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <TimeIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(apt.date + 'T00:00:00').toLocaleDateString('pt-BR')} às {apt.time}
                      </Typography>
                    </Box>
                    {apt.notes && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {apt.notes}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                    <Box>
                      {apt.status === 'scheduled' && (
                          <Tooltip title="Confirmar agendamento" arrow componentsProps={{ tooltip: { sx: { fontSize: '0.75rem', py: 0.3, px: 0.8 } } }}>
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              startIcon={<CheckIcon />}
                              onClick={() => handleStatusChange(apt.id, 'confirmed')}
                              sx={{ minWidth: 'auto', px: 0.8, py: 0.3, fontSize: '0.75rem' }}
                              aria-label={`Confirmar agendamento ${apt.patient || ''}`}
                            >
                              Confirmar
                            </Button>
                          </Tooltip>
                        )}
                      {apt.status === 'confirmed' && (
                        <Tooltip title="Marcar como Realizado">
                          <IconButton 
                            size="small" 
                            color="info"
                            onClick={() => handleStatusChange(apt.id, 'completed')}
                          >
                            <CheckIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                    <Box>
                      <Tooltip title="Editar">
                        <IconButton size="small" onClick={() => handleOpenDialog(apt)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton size="small" color="error" onClick={() => handleDelete(apt.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      {apt.anamneseId && (
                        <Tooltip title="Copiar link do questionário (enviar ao paciente)">
                          <IconButton size="small" color="secondary"
                            onClick={() => copyToClipboard(
                              `${window.location.origin}/dialogo-publico?id=${apt.anamneseId}&nome=${encodeURIComponent(apt.patient || '')}`,
                              `Link de questionário copiado para ${apt.patient || 'paciente'}`
                            )}>
                            <AssignmentIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {apt.anamneseId && hasDialogFilled(apt) && (
                        <Tooltip title="Ver Análise Clínica e Sugestões Terapêuticas">
                          <IconButton size="small" color="success"
                            onClick={() => navigate(`/dialogo-anamnetico/${apt.anamneseId}`)}>
                            <PsychologyIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {apt.status === 'confirmed' && (
                        <Tooltip title="Copiar link de confirmação/cancelamento para o paciente">
                          <IconButton size="small" color="primary"
                            onClick={() => copyToClipboard(buildPatientConfirmLink(apt), `Link de confirmação copiado para ${apt.patient || 'paciente'}`)}>
                            <NotificationsIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* Pending Overdue Appointments */}
      {pendingOverdue.length > 0 && (
        <Paper sx={{ p: 3, mb: 3, border: '2px solid', borderColor: 'warning.main' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'warning.dark' }}>
            ⚠️ Aguardando Confirmação (data passada)
          </Typography>
          <Alert severity="warning" sx={{ mb: 2 }}>Estes agendamentos não foram confirmados e a data já passou. Confirme, remarque ou cancele.</Alert>
          <Grid container spacing={2}>
            {pendingOverdue.map(apt => (
              <Grid item xs={12} md={6} lg={4} key={apt.id}>
                <Card variant="outlined" sx={{ borderColor: 'warning.main' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6">{apt.patient}</Typography>
                      <Chip label="Aguardando" color="warning" size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      📅 {new Date(apt.date + 'T00:00:00').toLocaleDateString('pt-BR')} às {apt.time}
                    </Typography>
                    {apt.notes && <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>📝 {apt.notes}</Typography>}
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', gap: 1, px: 2 }}>
                    <Button size="small" variant="contained" color="success" startIcon={<CheckIcon />}
                      onClick={() => handleStatusChange(apt.id, 'confirmed')}>Confirmar</Button>
                    <Button size="small" variant="outlined" color="error" startIcon={<CloseIcon />}
                      onClick={() => handleStatusChange(apt.id, 'cancelled')}>Cancelar</Button>
                    <IconButton size="small" onClick={() => handleOpenDialog(apt)}><EditIcon /></IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(apt.id)}><DeleteIcon /></IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* Upcoming Appointments */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EventIcon /> Próximos Agendamentos
        </Typography>
        {upcomingAppointments.length === 0 ? (
          <Alert severity="info">Nenhum agendamento futuro. Clique em "Novo Agendamento" para adicionar.</Alert>
        ) : (
          <Grid container spacing={2}>
            {upcomingAppointments.map(apt => (
              <Grid item xs={12} md={6} lg={4} key={apt.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6">{apt.patient}</Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
                        <Chip 
                          label={statusLabels[apt.status]} 
                          color={statusColors[apt.status]}
                          size="small"
                        />
                        {apt.anamneseId && hasDialogFilled(apt) && (
                          <Chip
                            size="small"
                            icon={<PsychologyIcon sx={{ fontSize: '0.9rem !important' }} />}
                            label="Diálogo ✓"
                            color="success"
                            variant="filled"
                          />
                        )}
                        {apt.patientStatus === 'confirmed' && (
                          <Chip size="small" icon={<HowToRegIcon sx={{ fontSize: '0.9rem !important' }} />}
                            label="Paciente confirmou" color="success" variant="outlined" />
                        )}
                        {apt.patientStatus === 'cancelled' && (
                          <Chip size="small" icon={<PersonOffIcon sx={{ fontSize: '0.9rem !important' }} />}
                            label="Paciente cancelou" color="error" variant="outlined" />
                        )}
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      📅 {new Date(apt.date + 'T00:00:00').toLocaleDateString('pt-BR')} às {apt.time}
                    </Typography>
                    {apt.notes && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        📝 {apt.notes}
                      </Typography>
                    )}
                    {apt.anamneseId && hasDialogFilled(apt) && (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<PsychologyIcon />}
                        onClick={() => navigate(`/dialogo-anamnetico/${apt.anamneseId}`)}
                        sx={{ mt: 1.5, fontSize: '0.75rem', fontWeight: 700 }}
                        fullWidth
                      >
                        Ver Análise + Sugestões Terapêuticas
                      </Button>
                    )}
                  </CardContent>
                  <CardActions>
                    <IconButton size="small" onClick={() => handleOpenDialog(apt)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(apt.id)}>
                      <DeleteIcon />
                    </IconButton>
                    {apt.anamneseId && (
                      <Tooltip title="Copiar link do questionário (enviar ao paciente)">
                        <IconButton size="small" color="secondary"
                          onClick={() => copyToClipboard(
                            `${window.location.origin}/dialogo-publico?id=${apt.anamneseId}&nome=${encodeURIComponent(apt.patient || '')}`,
                            `Link do questionário copiado para ${apt.patient || 'paciente'}`
                          )}>
                          <AssignmentIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {apt.anamneseId && hasDialogFilled(apt) && (
                      <Tooltip title="Ver Análise e Sugestões Terapêuticas">
                        <IconButton size="small" color="success"
                          onClick={() => navigate(`/dialogo-anamnetico/${apt.anamneseId}`)}>
                          <PsychologyIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {apt.status === 'confirmed' && (
                      <Tooltip title="Copiar link de confirmação/cancelamento para o paciente">
                        <IconButton size="small" color="primary"
                          onClick={() => copyToClipboard(buildPatientConfirmLink(apt), `Link de confirmação copiado para ${apt.patient || 'paciente'}`)}>
                          <NotificationsIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      </>)}

      {/* Dialog: Editar texto do link público */}
      <Dialog open={openBookingCopyDialog} onClose={() => setOpenBookingCopyDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Texto exibido na página de agendamento público</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Este texto aparece no topo da página <strong>anamneseintegrativa.surge.sh/book</strong> quando um paciente acessa o link de agendamento.
          </Typography>
          <TextField
            multiline
            rows={14}
            fullWidth
            value={bookingCopy}
            onChange={(e) => setBookingCopy(e.target.value)}
            placeholder="Digite o texto de apresentação / convite para agendamento..."
            inputProps={{ style: { fontFamily: 'monospace', fontSize: '0.85rem' } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBookingCopyDialog(false)}>Cancelar</Button>
          <Button
            variant="contained"
            color={bookingCopySaved ? 'success' : 'primary'}
            onClick={handleSaveBookingCopy}
          >
            {bookingCopySaved ? 'Salvo!' : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? 'Editar Agendamento' : 'Novo Agendamento'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Nome do Paciente"
              fullWidth
              value={formData.patient}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              required
            />
            <TextField
              label="Data"
              type="date"
              fullWidth
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Horário"
              type="time"
              fullWidth
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Status"
              select
              fullWidth
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              {Object.entries(statusLabels).map(([key, label]) => (
                <MenuItem key={key} value={key}>{label}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Observações"
              fullWidth
              multiline
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={!formData.patient}
          >
            {editingId ? 'Salvar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3500}
        onClose={() => setSnackOpen(false)}
        message={snackMsg}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
}
