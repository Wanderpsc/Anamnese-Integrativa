/**
 * AppointmentConfirmPage — Página pública para o paciente confirmar ou cancelar a consulta.
 * Rota: /appointment/confirm?id=<appointmentId>
 * Regra: só permite ação com pelo menos 3 horas de antecedência.
 */
import { useState, useEffect } from 'react';
import {
  Container, Paper, Typography, Box, Button, Alert, Chip,
  Divider, CircularProgress, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { getAppointmentById, updateAppointmentFields } from '../lib/api';

const THERAPIST_PHONE = '(89) 9 8139-8723'; // mesmo fallback do BookingPage

function formatDateLong(dateStr) {
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR', {
      weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
    });
  } catch { return dateStr; }
}

function isWithin1Hour(appointment) {
  if (!appointment?.date || !appointment?.time) return true;
  const dt = new Date(`${appointment.date}T${appointment.time}:00`);
  return (dt - new Date()) <= 1 * 60 * 60 * 1000;
}

function isPastAppointment(appointment) {
  if (!appointment?.date || !appointment?.time) return true;
  return new Date(`${appointment.date}T${appointment.time}:00`) < new Date();
}

export default function AppointmentConfirmPage() {
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null); // 'confirmed' | 'cancelled'
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const params = new URLSearchParams(window.location.search);
  const appointmentId = params.get('id');

  // Bloqueia o botão "Voltar" do browser para que o paciente não acesse
  // as rotas internas do sistema do terapeuta.
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!appointmentId) {
      setError('Link inválido. Por favor, solicite um novo link ao terapeuta.');
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const appt = await getAppointmentById(appointmentId);
        if (!appt) throw new Error('not found');
        setAppointment(appt);
      } catch {
        setError('Agendamento não encontrado. O link pode ter expirado ou ser inválido.');
      } finally {
        setLoading(false);
      }
    })();
  }, [appointmentId]);

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      await updateAppointmentFields(appointmentId, {
        patientStatus: 'confirmed',
        patientActionAt: new Date().toISOString(),
        patientCancelReason: '',
      });
      setDone('confirmed');
    } catch {
      setError('Erro ao registrar confirmação. Tente novamente ou contate o terapeuta.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelConfirm = async () => {
    setCancelDialogOpen(false);
    setSubmitting(true);
    try {
      // Cancela o agendamento e libera o horário na agenda do terapeuta
      await updateAppointmentFields(appointmentId, {
        status: 'cancelled',
        patientStatus: 'cancelled',
        patientActionAt: new Date().toISOString(),
        patientCancelReason: cancelReason || 'Não informado',
      });
      setDone('cancelled');
    } catch {
      setError('Erro ao registrar cancelamento. Tente novamente ou contate o terapeuta.');
    } finally {
      setSubmitting(false);
      setCancelReason('');
    }
  };

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <CircularProgress size={50} />
        <Typography variant="body1" sx={{ mt: 2 }} color="text.secondary">
          Carregando agendamento...
        </Typography>
      </Container>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────────
  if (error && !appointment) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ fontSize: '1rem' }}>{error}</Alert>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
          Em caso de dúvidas, entre em contato pelo WhatsApp: <strong>{THERAPIST_PHONE}</strong>
        </Typography>
      </Container>
    );
  }

  const within1h = isWithin1Hour(appointment);
  const past = isPastAppointment(appointment);
  const alreadyActed = appointment.patientStatus === 'confirmed' || appointment.patientStatus === 'cancelled';
  const canAct = !within1h && !past && !alreadyActed;

  // ── Done screen ──────────────────────────────────────────────────────────────
  if (done) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper sx={{ p: { xs: 3, sm: 5 }, textAlign: 'center', borderRadius: 3,
          background: done === 'confirmed'
            ? 'linear-gradient(135deg,#e8f5e9 0%,#f1f8e9 100%)'
            : 'linear-gradient(135deg,#fff3e0 0%,#fce4ec 100%)' }}>
          {done === 'confirmed' ? (
            <>
              <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" fontWeight="bold" color="success.dark" gutterBottom>
                ✅ Presença Confirmada!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Sua presença foi confirmada para{' '}
                <strong>{formatDateLong(appointment.date)}</strong> às{' '}
                <strong>{appointment.time}</strong>.
              </Typography>
              <Alert severity="success" icon={false} sx={{ textAlign: 'left', mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>📋 Lembrete para a consulta:</Typography>
                <ul style={{ margin: 0, paddingLeft: '1.3rem' }}>
                  <li>Chegue com <strong>10 minutos de antecedência</strong></li>
                  <li>Traga <strong>exames laboratoriais e de imagem</strong> recentes (últimos 2 anos)</li>
                  <li>Traga a <strong>lista de medicamentos</strong> em uso (nome, dose e horário)</li>
                  <li>Vista roupas <strong>confortáveis</strong></li>
                </ul>
              </Alert>
              <Typography variant="body2" color="text.secondary">
                Dúvidas? WhatsApp: <strong>{THERAPIST_PHONE}</strong>
              </Typography>
            </>
          ) : (
            <>
              <CancelIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
              <Typography variant="h5" fontWeight="bold" color="error.dark" gutterBottom>
                Consulta Cancelada
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Seu cancelamento foi registrado. O terapeuta será notificado.
              </Typography>
              <Alert severity="warning" sx={{ textAlign: 'left', mb: 2 }}>
                Para reagendar, entre em contato pelo WhatsApp ou acesse o link de agendamento.
              </Alert>
              <Typography variant="body2" color="text.secondary">
                WhatsApp: <strong>{THERAPIST_PHONE}</strong>
              </Typography>
            </>
          )}
        </Paper>
      </Container>
    );
  }

  // ── Main Page ────────────────────────────────────────────────────────────────
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>

      {/* Header */}
      <Paper elevation={0} sx={{ mb: 3, p: 3, borderRadius: 3,
        background: 'linear-gradient(135deg,#e3f2fd 0%,#e8f5e9 100%)', textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          📅 Confirmação de Consulta
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Wander Pires — Terapeuta Integrativo Funcional
        </Typography>
      </Paper>

      {/* Appointment Details */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EventIcon color="primary" fontSize="small" /> Detalhes do Agendamento
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon color="action" fontSize="small" />
            <Typography variant="body1"><strong>Paciente:</strong> {appointment.patient}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EventIcon color="action" fontSize="small" />
            <Typography variant="body1"><strong>Data:</strong> {formatDateLong(appointment.date)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon color="action" fontSize="small" />
            <Typography variant="body1"><strong>Horário:</strong> {appointment.time}</Typography>
          </Box>
          {appointment.q14_tipo_consulta && (
            <Typography variant="body2" color="text.secondary">
              <strong>Tipo:</strong> {appointment.q14_tipo_consulta}
            </Typography>
          )}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
            <Chip
              label={appointment.status === 'confirmed' ? '✅ Confirmado pelo terapeuta'
                : appointment.status === 'scheduled' ? '📅 Consulta Agendada'
                : appointment.status === 'cancelled' ? '❌ Cancelado'
                : appointment.status}
              color={appointment.status === 'confirmed' ? 'success' : appointment.status === 'cancelled' ? 'error' : 'warning'}
              size="small"
            />
            {alreadyActed && (
              <Chip
                label={appointment.patientStatus === 'confirmed' ? '✅ Você confirmou' : '❌ Você cancelou'}
                color={appointment.patientStatus === 'confirmed' ? 'success' : 'error'}
                variant="outlined"
                size="small"
              />
            )}
          </Box>
        </Box>
      </Paper>

      {/* Action Panel */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InfoOutlinedIcon color="primary" fontSize="small" /> Sua Resposta
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Already acted */}
        {alreadyActed && (
          <>
            <Alert
              severity={appointment.patientStatus === 'confirmed' ? 'success' : 'warning'}
              sx={{ mb: 2 }}
            >
              {appointment.patientStatus === 'confirmed'
                ? '✅ Você já confirmou sua presença nesta consulta.'
                : '❌ Você já cancelou esta consulta. Para reagendar, entre em contato pelo WhatsApp.'}
            </Alert>
            {/* Permite cancelar mesmo após confirmação, se ainda for possível */}
            {appointment.patientStatus === 'confirmed' && !past && !within1h && (
              <Box sx={{ mt: 1, mb: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  size="medium"
                  startIcon={<CancelIcon />}
                  onClick={() => setCancelDialogOpen(true)}
                  disabled={submitting}
                  fullWidth
                  sx={{ py: 1.5, fontWeight: 700 }}
                >
                  Quero Cancelar esta Consulta
                </Button>
              </Box>
            )}
          </>
        )}

        {/* Past appointment */}
        {past && !alreadyActed && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Esta consulta já passou. Não é mais possível confirmar ou cancelar.
          </Alert>
        )}

        {/* Within 1 hour */}
        {within1h && !past && !alreadyActed && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            <strong>Prazo encerrado.</strong> Sua consulta está marcada para dentro de menos de 1 hora.
            O prazo para confirmação ou cancelamento já passou.{' '}
            Em caso de emergência, contate diretamente: <strong>{THERAPIST_PHONE}</strong>.
          </Alert>
        )}

        {/* Can act */}
        {canAct && (
          <>
            <Alert severity="info" icon={false} sx={{ mb: 3, py: 1.5 }}>
              <Typography variant="body2">
                ⏰ <strong>Prazo:</strong> Confirme ou cancele com pelo menos{' '}
                <strong>1 hora de antecedência</strong>.
                Após esse prazo os botões serão desabilitados automaticamente.
              </Typography>
            </Alert>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            )}

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={<CheckCircleIcon />}
                onClick={handleConfirm}
                disabled={submitting}
                fullWidth
                sx={{ py: 1.8, fontWeight: 700, fontSize: '1rem' }}
              >
                {submitting ? 'Processando...' : 'Confirmar Presença'}
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="large"
                startIcon={<CancelIcon />}
                onClick={() => setCancelDialogOpen(true)}
                disabled={submitting}
                fullWidth
                sx={{ py: 1.8, fontWeight: 700, fontSize: '1rem' }}
              >
                Cancelar Consulta
              </Button>
            </Box>
          </>
        )}

        {/* Always-visible instructions */}
        <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            📋 Orientações para a consulta:
          </Typography>
          <Typography variant="body2" component="ul" sx={{ pl: 2, m: 0, color: 'text.secondary' }}>
            <li>Chegue com <strong>10 minutos de antecedência</strong></li>
            <li>Traga <strong>exames laboratoriais e de imagem</strong> recentes (últimos 2 anos)</li>
            <li>Traga a <strong>lista de medicamentos</strong> em uso (nome, dose e horário)</li>
            <li>Vista roupas <strong>confortáveis</strong></li>
            <li>Dúvidas? WhatsApp: <strong>{THERAPIST_PHONE}</strong></li>
          </Typography>
        </Box>
      </Paper>

      {/* Cancel confirmation dialog */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>❌ Confirmar Cancelamento</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Tem certeza que deseja cancelar a consulta de <strong>{formatDateLong(appointment?.date)}</strong> às <strong>{appointment?.time}</strong>?
          </Typography>
          <TextField
            label="Motivo do cancelamento (opcional)"
            fullWidth
            multiline
            rows={2}
            value={cancelReason}
            onChange={e => setCancelReason(e.target.value)}
            placeholder="Ex.: Não poderei comparecer por compromisso de trabalho."
          />
          <Alert severity="warning" sx={{ mt: 2 }}>
            Esta ação não pode ser desfeita. Para reagendar, você precisará entrar em contato novamente.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setCancelDialogOpen(false)} variant="outlined">
            Voltar
          </Button>
          <Button onClick={handleCancelConfirm} variant="contained" color="error" startIcon={<CancelIcon />}>
            Confirmar Cancelamento
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
