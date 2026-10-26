import React, { useState, useEffect } from 'react';
import { buildLetterheadHtml, openPrintWindow, downloadPdfFromHtml, buildAppointmentBodyHtml, generateQrDataUrl } from '../components/PrintTemplate';
import letterhead from '../assets/letterhead.png';
import stampImg from '../assets/stamp.png';
import { useNavigate } from 'react-router-dom';
import { createAnamnese as apiCreateAnamnese, createAppointment as apiCreateAppointment, listAppointments } from '../lib/api';
import { Container, Paper, Typography, TextField, Button, Box, Grid, MenuItem, FormControl, InputLabel, Select, Checkbox, FormControlLabel, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SendIcon from '@mui/icons-material/Send';
import { getSetting as apiGetSetting, setSetting as apiSetSetting } from '../lib/api';
import { updateAnamnese as apiUpdateAnamnese } from '../lib/api';
import { isOwner, isAuthenticated, getCurrentSession } from '../lib/auth';
import { calculateAgeFromBirthDate } from '../lib/ageUtils';
import { QUESTIONNAIRE_BLOCKS } from '../data/integrativeAnamnesisQuestions'; // eslint-disable-line no-unused-vars
import { loadScheduleConfig, generateAvailableSlots } from '../components/ScheduleConfig';

export default function BookingPage() {
  const navigate = useNavigate();
  const therapistContactFallback = '(89) 9 8139-8723';
  const [createdAppointment, setCreatedAppointment] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState(null);
  // Booking step: 1=form, 3=done (step 2 questionnaire removed)
  const [bookingStep, setBookingStep] = useState(1);
  const [formData, setFormData] = useState({
    q01_nome: '',
    q02_data_nasc: '',
    q03_idade: '',
    q04_sexo: '',
    q05_estado_civil: '',
    q06_profissao: '',
    q07_endereco: '',
    q08_cidade: '',
    q09_estado: '',
    q10_cep: '',
    q11_telefone: '',
    q12_email: '',
    q13_rg: '',
    q14_cpf: '',
    q14_tipo_consulta: 'Atendimento Inicial',
    q14_data_retorno: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    notes: '',
    // no confirm here: public booking should be scheduled and later confirmed by owner
  });
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingText, setBookingText] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [reservedSlots, setReservedSlots] = useState([]);
  const [notificationLinks, setNotificationLinks] = useState({ email: '', whatsapp: '', sms: '' });
  const [deliveryStatus, setDeliveryStatus] = useState({
    attempted: false,
    emailOpened: false,
    whatsappOpened: false,
    smsOpened: false,
  });
  // Admin/editor disabled on public booking page
  // Only grant edit rights if the user is authenticated as owner OR if the page contains a valid ownerKey
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ownerKey = params.get('ownerKey');
      const isOwnerKey = ownerKey && process.env.REACT_APP_OWNER_EDIT_KEY && ownerKey === process.env.REACT_APP_OWNER_EDIT_KEY;
      return isOwner() || isOwnerKey;
    } catch (e) { return isOwner(); }
  });
  const session = getCurrentSession();

  useEffect(() => {
    // If query has owner key and it matches the env key, grant edit rights for this session
    try {
      const params = new URLSearchParams(window.location.search);
      const ownerKey = params.get('ownerKey');
      if (ownerKey && process.env.REACT_APP_OWNER_EDIT_KEY && ownerKey === process.env.REACT_APP_OWNER_EDIT_KEY) {
        localStorage.setItem('isAdmin', 'true');
        setIsAdmin(true);
      }
    } catch (e) { /* ignore for SSR */ }

    // Load booking text fallback/default and any draft text
    // load from server with fallback to localStorage
    (async () => {
      // Highest priority: text embedded in URL param ?msg= (set by admin when copying link)
      try {
        const params = new URLSearchParams(window.location.search);
        const msgParam = params.get('msg');
        if (msgParam) {
          const decoded = decodeURIComponent(escape(atob(msgParam)));
          setBookingText(decoded);
          localStorage.setItem('publicBookingCopy', decoded);
          return;
        }
      } catch (e) { /* ignore malformed param */ }

      try {
        const s = await apiGetSetting('publicBookingCopy');
        if (s) {
          setBookingText(typeof s === 'string' ? s : JSON.parse(s));
          localStorage.setItem('publicBookingCopy', typeof s === 'string' ? s : JSON.stringify(s));
          return;
        }
      } catch (e) {
        console.warn('Failed to load publicBookingCopy from server', e);
      }
      const stored = localStorage.getItem('publicBookingCopy');
      if (stored) {
        setBookingText(stored);
      } else {
        // also check stored draft
        const storedDraft = localStorage.getItem('settings_draft');
        try {
          const drafts = JSON.parse(storedDraft || '{}');
            if (drafts && drafts['publicBookingCopy']) {
              // draft exists; we do not use drafts in BookingPage public view
            } else {
            // default promotional copy provided by the user
            const defaultText = `✨ Desvende Seu Potencial Máximo: Agende Seu Atendimento com Wander Pires!\nCansado(a) de tratar apenas os sintomas? No ritmo acelerado da vida moderna, é fácil perder a conexão com o que o seu corpo realmente precisa.\nEu sou Wander Pires, Terapeuta Integrativo, e meu trabalho é ir além do superficial. Minha abordagem une a Nutrição Funcional com terapias Holísticas e Naturais para identificar a raiz dos seus desequilíbrios.\n• Não é Dieta, é Harmonia: Descubra como alimentos e hábitos funcionais podem ser a sua medicina natural.\n• Corpo, Mente e Espírito: Atendimento que enxerga você como um todo, promovendo a homeostase de dentro para fora.\n• Resultados Duradouros: Crie um plano de bem-estar 100% personalizado que se sustenta no tempo.\nSua saúde não é um quebra-cabeça, é um ecossistema. Vamos equilibrá-lo?\nSeu próximo passo para uma vida mais plena e energética começa agora. Clique abaixo e agende o seu horário!`;
            setBookingText(defaultText);
            localStorage.setItem('publicBookingCopy', defaultText);
          }
        } catch (e) {
          const defaultText = `✨ Desvende Seu Potencial Máximo: Agende Seu Atendimento com Wander Pires!\nCansado(a) de tratar apenas os sintomas? No ritmo acelerado da vida moderna, é fácil perder a conexão com o que o seu corpo realmente precisa.\nEu sou Wander Pires, Terapeuta Integrativo, e meu trabalho é ir além do superficial. Minha abordagem une a Nutrição Funcional com terapias Holísticas e Naturais para identificar a raiz dos seus desequilíbrios.\n• Não é Dieta, é Harmonia: Descubra como alimentos e hábitos funcionais podem ser a sua medicina natural.\n• Corpo, Mente e Espírito: Atendimento que enxerga você como um todo, promovendo a homeostase de dentro para fora.\n• Resultados Duradouros: Crie um plano de bem-estar 100% personalizado que se sustenta no tempo.\nSua saúde não é um quebra-cabeça, é um ecossistema. Vamos equilibrá-lo?\nSeu próximo passo para uma vida mais plena e energética começa agora. Clique abaixo e agende o seu horário!`;
          setBookingText(defaultText);
          localStorage.setItem('publicBookingCopy', defaultText);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const age = calculateAgeFromBirthDate(formData.q02_data_nasc);
    setFormData(prev => (prev.q03_idade === age ? prev : { ...prev, q03_idade: age }));
  }, [formData.q02_data_nasc]);
  
    useEffect(() => {
      const handleStorage = (e) => {
        if (e.key === 'app_session') {
          setIsAdmin(isOwner());
        }
        if (e.key === 'publicBookingCopy') {
          const v = localStorage.getItem('publicBookingCopy');
          if (v) setBookingText(v);
        }
        if (e.key === 'settings_draft') {
          const drafts = JSON.parse(localStorage.getItem('settings_draft') || '{}');
            if (drafts['publicBookingCopy']) {
              // draft exists; we do not use drafts in BookingPage public view
            }
        }
      };
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    }, []);

    useEffect(() => {
      let cancelled = false;
      (async () => {
        try {
          const appts = await listAppointments();
          if (cancelled) return;
          const reserved = (appts || []).filter(a => a.date === formData.date).map(a => a.time);
          setReservedSlots(reserved);
        } catch (e) {
          try {
            const ap = JSON.parse(localStorage.getItem('appointments') || '[]') || [];
            const reserved = ap.filter(a => a.date === formData.date).map(a => a.time);
            setReservedSlots(reserved);
          } catch (err) { setReservedSlots([]); }
        }
      })();
      return () => { cancelled = true; };
    }, [formData.date]);

    useEffect(() => {
      const cfg = loadScheduleConfig();
      const slots = generateAvailableSlots(formData.date, cfg);
      const now = new Date();
      const isSameDate = new Date(formData.date + 'T00:00:00').toDateString() === now.toDateString();
      if (!slots.length) {
        setAvailableSlots([{ time: '--', disabled: true, unavailableDay: true }]);
        return;
      }
      const filtered = slots.map(s => {
        const disabled = reservedSlots.includes(s) || (isSameDate && (() => {
          const slotDate = new Date(formData.date + 'T' + s + ':00');
          return slotDate <= now;
        })());
        return { time: s, disabled };
      });
      setAvailableSlots(filtered);
    }, [formData.date, reservedSlots]);

    // On mount, mark isBooked if an appointment already exists for the same patient/date/time
    useEffect(() => {
      try {
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]') || [];
        const found = appointments.find(a => a.date === formData.date && a.time === formData.time && a.patient === formData.q01_nome);
        if (found) {
          setCreatedAppointment(found);
          setIsBooked(true);
        }
      } catch (e) { /* ignore */ }
    }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatAppointmentDate = (dateValue) => {
    try {
      return new Date(dateValue).toLocaleDateString('pt-BR');
    } catch (e) {
      return dateValue || '-';
    }
  };

  const normalizePhoneForWhatsApp = (value) => {
    const digits = String(value || '').replace(/\D/g, '');
    if (!digits) return '';
    if (digits.startsWith('55')) return digits;
    return `55${digits}`;
  };

  const buildPatientNotificationLinks = (appointment, payload) => {
    const patientName = payload.q01_nome || appointment.patient || 'Paciente';
    const appointmentDate = formatAppointmentDate(appointment.date);
    const appointmentTime = appointment.time || '-';
    const appointmentType = payload.q14_tipo_consulta || appointment.q14_tipo_consulta || 'Atendimento';
    const therapistContact = therapistContactFallback;

    const anamnesisLink = appointment.anamneseId
      ? `${window.location.origin}/dialogo-publico?id=${appointment.anamneseId}&nome=${encodeURIComponent(patientName)}`
      : '';

    const message = [
      `Olá, ${patientName}!`,
      '',
      'Seu agendamento foi realizado com sucesso.',
      `Data: ${appointmentDate}`,
      `Horário: ${appointmentTime}`,
      `Tipo: ${appointmentType}`,
      '',
      '📌 IMPORTANTE — No dia da consulta, por favor traga:',
      '• Todos os seus exames laboratoriais e de imagem recentes (até 2 anos)',
      '• Lista de todos os medicamentos em uso (nome, dosagem e horário de uso)',
      '',
      anamnesisLink ? '📋 Para nos ajudar a preparar seu atendimento, por favor preencha sua Anamnese Integrativa antes da consulta:' : '',
      anamnesisLink ? anamnesisLink : '',
      '',
      'Se precisar reagendar, responda esta mensagem.',
      `Contato da clínica: ${therapistContact}`
    ].filter(line => line !== '').join('\n');

    const subject = encodeURIComponent(`Confirmação de agendamento - ${appointmentDate} ${appointmentTime}`);
    const encodedMessage = encodeURIComponent(message);

    const email = payload.q12_email
      ? `mailto:${encodeURIComponent(payload.q12_email)}?subject=${subject}&body=${encodedMessage}`
      : '';

    const normalizedPhone = normalizePhoneForWhatsApp(payload.q11_telefone);
    const whatsapp = normalizedPhone ? `https://wa.me/${normalizedPhone}?text=${encodedMessage}` : '';
    const sms = normalizedPhone ? `sms:${normalizedPhone}?body=${encodedMessage}` : '';

    return { email, whatsapp, sms };
  };

  const tryOpenLink = (url) => {
    if (!url) return false;
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    return !!opened;
  };

  const dispatchPatientNotifications = (appointment, payload) => {
    const links = buildPatientNotificationLinks(appointment, payload);
    setNotificationLinks(links);

    const emailOpened = tryOpenLink(links.email);
    const whatsappOpened = tryOpenLink(links.whatsapp);
    const smsOpened = tryOpenLink(links.sms);

    setDeliveryStatus({
      attempted: true,
      emailOpened,
      whatsappOpened,
      smsOpened,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);
    setIsSubmitting(true);
    if (!formData.time) {
      setError('Por favor selecione um horário antes de enviar.');
      setIsSubmitting(false);
      return;
    }

    // Create anamnese prefilled (use Supabase if configured)
    const newAnamnese = {
      ...formData,
      id: Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    let savedAnamnese = newAnamnese;
    try {
      savedAnamnese = await apiCreateAnamnese(newAnamnese);
    } catch (err) {
      console.warn('Supabase insert failed; falling back to localStorage', err.message || err);
    }

    // Create appointment
    const appointment = {
      id: Date.now() + 1,
      patient: formData.q01_nome,
      date: formData.date,
      time: formData.time,
      status: 'scheduled',
      notes: formData.notes || '',
      anamneseId: savedAnamnese.id,
      q14_tipo_consulta: formData.q14_tipo_consulta,
      q14_data_retorno: formData.q14_data_retorno
    };
    // Check conflict: ensure no appointment already exists on same date/time
    const existingAppointments = await listAppointments();
    const conflict = (existingAppointments || []).find(a => a.date === appointment.date && a.time === appointment.time);
    if (conflict) {
      setError('Já existe um agendamento neste dia e horário. Por favor escolha outro horário.');
      setIsSubmitting(false);
      return;
    }
    let savedAppointment = null;
    try {
      const created = await apiCreateAppointment(appointment);
      // ensure local fallback has it as well as the API's returned item
      const local = JSON.parse(localStorage.getItem('appointments') || '[]') || [];
      const exists = local.find(a => a.id === (created?.id || appointment.id));
      if (!exists) {
        local.push(created || appointment);
        localStorage.setItem('appointments', JSON.stringify(local));
      }
      savedAppointment = created || appointment;
      setCreatedAppointment(savedAppointment);
      console.log('BookingPage: created appointment', savedAppointment);
      try { window.dispatchEvent(new CustomEvent('appointments:updated', { detail: savedAppointment })); } catch (e) { /* ignore */ }
    } catch (err) {
      console.warn('Supabase appointment insert failed; saving locally', err.message || err);
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      appointments.push(appointment);
      localStorage.setItem('appointments', JSON.stringify(appointments));
      savedAppointment = appointment;
      setCreatedAppointment(savedAppointment);
      console.log('BookingPage: failed to save to supabase - appointment saved locally', appointment);
      try { window.dispatchEvent(new CustomEvent('appointments:updated', { detail: savedAppointment })); } catch (e) { /* ignore */ }
    }

    if (savedAppointment) {
      dispatchPatientNotifications(savedAppointment, formData);
    }

    setSuccess('Agendamento criado com sucesso!');
    setIsSubmitting(false);
    // Ir direto para confirmação final
    setTimeout(() => { setBookingStep(3); }, 800);
  };

  const handleAgendarClick = (e) => {
    // if appointment already created, show confirmation to change
    if (createdAppointment) {
      setConfirmOpen(true);
      return;
    }
    e?.preventDefault?.();
    // call handleSubmit directly (requestSubmit has browser compat issues)
    handleSubmit({ preventDefault: () => {} });
  };

  const handleConfirmChange = () => {
    // allow change: remove created appointment locally so user can resubmit a modified appointment
    if (createdAppointment) {
      try {
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const filtered = appointments.filter(a => a.id !== createdAppointment.id);
        localStorage.setItem('appointments', JSON.stringify(filtered));
      } catch (e) { /* ignore */ }
    }
    setCreatedAppointment(null);
    setIsBooked(false);
    setConfirmOpen(false);
  };

  const handleCancelChange = () => {
    setConfirmOpen(false);
  };

  const printAppointment = async (appt) => {
    const bodyHtml = buildAppointmentBodyHtml(appt);
    const clinicQr = `${window.location.origin}/appointment/${appt.id}`;
    const qrUrl = await generateQrDataUrl(clinicQr);
    const html = await buildLetterheadHtml({ title: 'Comprovante de Agendamento', bodyHtml, qrUrl });
    openPrintWindow(html, true);
  };

  const downloadAppointmentPdf = async (appt) => {
    const bodyHtml = buildAppointmentBodyHtml(appt);
    const clinicQr = `${window.location.origin}/appointment/${appt.id}`;
    const qrUrl = await generateQrDataUrl(clinicQr);
    const html = await buildLetterheadHtml({ title: 'Comprovante de Agendamento', bodyHtml, qrUrl });
    await downloadPdfFromHtml(html, `comprovante_${(appt.patient||'nome').replace(/\s/g,'_')}_${(new Date()).toISOString().split('T')[0]}.pdf`);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      {/* ── STEP 1: Booking form ── */}
      {bookingStep === 1 && (<>
      {/* Booking intro — text comes from bookingText and is editable by admin only */}
      <Paper elevation={0} sx={{ mb: 2, p: 3, borderRadius: 3, background: 'linear-gradient(135deg,#f6fff6 0%, #e8f8ff 100%)' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* Title */}
          <Typography variant="h4" fontWeight="bold" color="primary">{bookingText.split('\n')[0] || 'Agende sua consulta'}</Typography>
          {/* subtitle (first paragraph) */}
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5, textAlign: 'justify' }}>{bookingText.split('\n').slice(1, 3).join(' ')}</Typography>
          <Box sx={{ mt: 1, textAlign: 'justify' }}>
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {bookingText.split('\n').map((line, idx) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                  return (
                    <li key={idx} style={{ marginBottom: 6 }}>
                      <Typography variant="body2">{trimmed.replace(/^\s*[•-]\s*/, '')}</Typography>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </Box>
            {/* Admin edit buttons removed from public booking page */}
        </Box>
        {/* Editor removed */}
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Agendamento - 1ª Sessão</Typography>
        <Typography variant="body2" gutterBottom color="text.secondary">Preencha os dados abaixo para agendar seu atendimento</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Nome completo" required fullWidth value={formData.q01_nome} onChange={e => handleChange('q01_nome', e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Data de Nascimento" type="date" InputLabelProps={{ shrink: true }} fullWidth value={formData.q02_data_nasc} onChange={e => handleChange('q02_data_nasc', e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Idade" value={formData.q03_idade} fullWidth disabled InputProps={{ readOnly: true }} helperText="Calculada automaticamente" />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Sexo</InputLabel>
                <Select value={formData.q04_sexo} label="Sexo" onChange={e => handleChange('q04_sexo', e.target.value)}>
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Feminino">Feminino</MenuItem>
                  <MenuItem value="Outro">Outro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Telefone" fullWidth value={formData.q11_telefone} onChange={e => handleChange('q11_telefone', e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="E-mail" type="email" fullWidth value={formData.q12_email} onChange={e => handleChange('q12_email', e.target.value)} />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Atendimento</InputLabel>
                <Select value={formData.q14_tipo_consulta} label="Tipo de Atendimento" onChange={e => handleChange('q14_tipo_consulta', e.target.value)}>
                  <MenuItem value={'Atendimento Inicial'}>Atendimento Inicial</MenuItem>
                  <MenuItem value={'Retorno 1'}>Retorno 1</MenuItem>
                  <MenuItem value={'Retorno 2'}>Retorno 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField label="Data" type="date" InputLabelProps={{ shrink: true }} value={formData.date} fullWidth onChange={e => handleChange('date', e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Escolha um horário</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                <Chip label="Disponível" variant="outlined" size="small" />
                <Chip label="Selecionado" color="primary" size="small" />
                <Chip label="Indisponível" color="error" variant="outlined" size="small" />
              </Box>
              {availableSlots.length === 1 && availableSlots[0].unavailableDay ? (
                <Alert severity="warning" sx={{ mt: 1 }}>
                  Este dia não está disponível para agendamento. Por favor, selecione outra data.
                </Alert>
              ) : (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }, gap: 1 }}>
                  {availableSlots.map(slot => (
                    <Button
                      key={slot.time}
                      variant={formData.time === slot.time ? 'contained' : 'outlined'}
                      sx={{ minHeight: 44, justifyContent: 'center', whiteSpace: 'nowrap' }}
                      color={slot.disabled ? 'error' : (formData.time === slot.time ? 'primary' : 'secondary')}
                      disabled={slot.disabled}
                      onClick={() => handleChange('time', slot.time)}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{slot.time}</Typography>
                        {slot.disabled && <Typography variant="caption" sx={{ color: 'error.main' }}>Indisponível</Typography>}
                      </Box>
                    </Button>
                  ))}
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField label="Observações" fullWidth multiline rows={2} value={formData.notes} onChange={e => handleChange('notes', e.target.value)} />
            </Grid>

            {/* public booking does not auto-confirm; owner must confirm in the system */}

            {success && (
              <Grid item xs={12}>
                <Alert severity="success">{success}</Alert>
              </Grid>
            )}
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            {createdAppointment && (
              <Grid item xs={12}>
                <Paper sx={{ p: 2, mt: 1, background: 'linear-gradient(135deg, #f0fff4 0%, #f0fbff 100%)' }}>
                  <Typography variant="subtitle1" fontWeight="bold">Seu agendamento foi registrado</Typography>
                  <Typography variant="body2">Paciente: {createdAppointment.patient}</Typography>
                  <Typography variant="body2">Data: {new Date(createdAppointment.date).toLocaleDateString('pt-BR')} — Hora: {createdAppointment.time}</Typography>
                  <Typography variant="body2">Status: Agendado (aguardando confirmação)</Typography>
                  {createdAppointment.anamneseId && (
                    <Box sx={{ mt: 1.5, p: 1.5, bgcolor: '#e8f5e9', borderRadius: 1, border: '1px solid #a5d6a7' }}>
                      <Typography variant="body2" fontWeight="bold" color="success.dark">
                        📋 Anamnese Integrativa — envie o link abaixo ao paciente:
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5, wordBreak: 'break-all', color: '#1565c0', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                        {`${window.location.origin}/dialogo-publico?id=${createdAppointment.anamneseId}&nome=${encodeURIComponent(createdAppointment.patient || '')}`}
                      </Typography>
                      <Button size="small" variant="outlined" color="success" sx={{ mt: 0.5 }}
                        onClick={() => navigator.clipboard?.writeText(`${window.location.origin}/dialogo-publico?id=${createdAppointment.anamneseId}&nome=${encodeURIComponent(createdAppointment.patient || '')}`)}>
                        Copiar link
                      </Button>
                    </Box>
                  )}
                  {deliveryStatus.attempted && (
                    <Alert severity={(deliveryStatus.emailOpened || deliveryStatus.whatsappOpened || deliveryStatus.smsOpened) ? 'success' : 'warning'} sx={{ mt: 1.5 }}>
                      {(deliveryStatus.emailOpened || deliveryStatus.whatsappOpened || deliveryStatus.smsOpened)
                        ? 'Confirmação preparada para envio ao paciente por e-mail/WhatsApp/SMS.'
                        : 'O navegador bloqueou a abertura automática das mensagens. Use os botões abaixo para enviar manualmente.'}
                    </Alert>
                  )}
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Button size="small" variant="outlined" onClick={() => printAppointment(createdAppointment)}>Imprimir Comprovante</Button>
                    <Button size="small" variant="outlined" onClick={() => downloadAppointmentPdf(createdAppointment)}>Download PDF</Button>
                    <Button size="small" variant="text" onClick={() => { setCreatedAppointment(null); setIsBooked(false); }}>Fechar</Button>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                    {notificationLinks.email && (
                      <Button size="small" variant="outlined" component="a" href={notificationLinks.email}>
                        Enviar e-mail ao paciente
                      </Button>
                    )}
                    {notificationLinks.whatsapp && (
                      <Button size="small" variant="outlined" color="success" component="a" href={notificationLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                        Enviar WhatsApp ao paciente
                      </Button>
                    )}
                    {notificationLinks.sms && (
                      <Button size="small" variant="outlined" color="secondary" component="a" href={notificationLinks.sms}>
                        Enviar SMS ao paciente
                      </Button>
                    )}
                  </Box>
                </Paper>
              </Grid>
            )}

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={() => navigate('/')} startIcon={<span>↩</span>}>Voltar</Button>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="contained" type="button" color={isBooked ? 'success' : 'primary'} onClick={handleAgendarClick}>{isBooked ? 'Agendado' : 'Agendar'}</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Dialog open={confirmOpen} onClose={handleCancelChange}>
        <DialogTitle>Atendimento já agendado</DialogTitle>
        <DialogContent>
          <Typography>Atendimento já agendado. Deseja alterar o horário?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelChange}>Não</Button>
          <Button onClick={handleConfirmChange} autoFocus>Sim, alterar</Button>
        </DialogActions>
      </Dialog>
      </>)} {/* end step 1 */}

      {/* ── STEP 3: All done ── */}
      {bookingStep === 3 && (
        <Paper sx={{ p: 5, textAlign: 'center', background: 'linear-gradient(135deg,#e8f5e9 0%,#f1f8e9 100%)', borderRadius: 3 }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: '#2e7d32', mb: 2 }} />
          <Typography variant="h4" fontWeight="bold" color="success.dark" gutterBottom>
            Agendamento realizado!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Seu agendamento foi recebido com sucesso.
          </Typography>
          <Chip label={`📅 ${formData.date ? new Date(formData.date + 'T00:00:00').toLocaleDateString('pt-BR') : ''} às ${formData.time}`}
            color="success" variant="outlined" sx={{ fontSize: '1rem', py: 2.5, px: 1.5, mb: 3 }} />

          {/* Patient confirm/cancel link */}
          {createdAppointment && (
            <Alert severity="info" icon={false} sx={{ mb: 3, textAlign: 'left', borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                🔔 Confirme ou cancele sua presença pelo link abaixo:
              </Typography>
              <Typography variant="body2" sx={{ mb: 1.5, color: 'text.secondary' }}>
                <strong>Prazo:</strong> Use o link até <strong>3 horas antes</strong> da consulta para confirmar ou cancelar.
                Após esse prazo não será mais possível alterar.
              </Typography>
              <Box sx={{ p: 1.5, bgcolor: '#fff', borderRadius: 1, border: '1px solid #b3e5fc',
                wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '0.8rem', color: '#01579b', mb: 1.5 }}>
                {`${window.location.origin}/appointment/confirm?id=${createdAppointment.id}`}
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button size="small" variant="outlined" color="primary"
                  onClick={() => {
                    const link = `${window.location.origin}/appointment/confirm?id=${createdAppointment.id}`;
                    navigator.clipboard?.writeText(link).catch(() => {
                      const el = document.createElement('textarea');
                      el.value = link; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
                    });
                  }}>
                  Copiar link
                </Button>
                <Button size="small" variant="outlined" color="primary"
                  component="a"
                  href={`${window.location.origin}/appointment/confirm?id=${createdAppointment.id}`}
                  target="_blank" rel="noreferrer noopener">
                  Abrir link
                </Button>
              </Box>
            </Alert>
          )}

          <Alert severity="success" sx={{ mt: 1, textAlign: 'left' }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>📋 Orientações para a consulta:</Typography>
            <ul style={{ margin: 0, paddingLeft: '1.3rem' }}>
              <li>Chegue com <strong>10 minutos de antecedência</strong></li>
              <li>Traga <strong>exames laboratoriais e de imagem</strong> recentes (últimos 2 anos)</li>
              <li>Traga a <strong>lista de medicamentos</strong> em uso (nome, dosagem e horário)</li>
              <li>Para cancelar ou reagendar, use o link acima com pelo menos 3h de antecedência</li>
            </ul>
          </Alert>
        </Paper>
      )}
    </Container>
  );
}

// Dialog for existing appointment change confirmation
