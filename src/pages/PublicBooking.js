import { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, TextField, Button, Grid, Alert } from '@mui/material';
import { listAppointments, getSetting as apiGetSetting } from '../lib/api';
import { Chip } from '@mui/material';

export default function PublicBooking() {
  const [formData, setFormData] = useState({
    patient: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    notes: ''
  });
  const [error, setError] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [bookingText, setBookingText] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [reservedSlots, setReservedSlots] = useState([]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ownerKey = params.get('ownerKey');
      if (ownerKey && process.env.REACT_APP_OWNER_EDIT_KEY && ownerKey === process.env.REACT_APP_OWNER_EDIT_KEY) {
        setIsAdminMode(true);
        localStorage.setItem('isAdmin', 'true');
      }
    } catch (e) { /* ignore */ }
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const v = e?.detail;
      if (v) setBookingText(v);
    };
    window.addEventListener('publicBookingCopy:updated', handler);
    // Draft preview events not used in public view
    return () => {
      window.removeEventListener('publicBookingCopy:updated', handler);
      // no removal required for draft events
    };
  }, []);

  // If ownerKey is not present and localStorage has isAdmin set, clear it so public link does not show admin controls
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ownerKey = params.get('ownerKey');
      if (!ownerKey && localStorage.getItem('isAdmin') === 'true') {
        localStorage.removeItem('isAdmin');
        setIsAdminMode(false);
      }
    } catch (e) { /* ignore */ }
  }, []);

  useEffect(() => {
    // Load public booking text if set (from settings or localStorage)
    (async () => {
      try {
        const s = await apiGetSetting('publicBookingCopy');
        if (s) {
          setBookingText(typeof s === 'string' ? s : JSON.parse(s));
          localStorage.setItem('publicBookingCopy', typeof s === 'string' ? s : JSON.stringify(s));
          return;
        }
      } catch (e) { /* ignore */ }
      const stored = localStorage.getItem('publicBookingCopy');
      if (stored) setBookingText(stored);
    })();
  }, []);

  // Watch for date change and refresh reserved slots
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const appts = await listAppointments();
        if (cancelled) return;
        const reserved = (appts || []).filter(a => a.date === formData.date).map(a => a.time);
        setReservedSlots(reserved);
      } catch (e) {
        // fallback to local storage
        try {
          const ap = JSON.parse(localStorage.getItem('appointments') || '[]') || [];
          const reserved = ap.filter(a => a.date === formData.date).map(a => a.time);
          setReservedSlots(reserved);
        } catch (err) { setReservedSlots([]); }
      }
    })();
    return () => { cancelled = true; };
  }, [formData.date]);

  // Generate time slots for the selected date (default 07:00 - 22:00 every 30 min)
  const generateSlots = (start = '07:00', end = '22:00', intervalMinutes = 30) => {
    const toMinutes = t => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };
    const toTime = minutes => {
      const h = Math.floor(minutes / 60).toString().padStart(2, '0');
      const m = String(minutes % 60).padStart(2, '0');
      return `${h}:${m}`;
    };
    const slots = [];
    let cur = toMinutes(start);
    const endMin = toMinutes(end);
    while (cur <= endMin) {
      slots.push(toTime(cur));
      cur += intervalMinutes;
    }
    return slots;
  };

  // compute available slots by removing reserved and past times
  useEffect(() => {
    const slots = generateSlots();
    const now = new Date();
    const isSameDate = new Date(formData.date).toDateString() === now.toDateString();
    const filtered = slots.map(s => {
      const disabled = reservedSlots.includes(s) || (isSameDate && (() => {
        const [hh, mm] = s.split(':').map(Number);
        const slotDate = new Date(formData.date + 'T' + s + ':00');
        return slotDate <= now;
      })());
      return { time: s, disabled };
    });
    setAvailableSlots(filtered);
  }, [formData.date, reservedSlots]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.time) {
      setError('Por favor selecione um horário antes de enviar.');
      return;
    }
    // Check conflict: query server first (listAppointments) then fallback to localStorage
    let conflict = null;
    try {
      const appts = await listAppointments();
      conflict = (appts || []).find(a => a.date === formData.date && a.time === formData.time);
    } catch (err) {
      // ignore errors and fallback to local storage
    }
    if (!conflict) {
      const existing = JSON.parse(localStorage.getItem('appointments') || '[]');
      conflict = existing.find(a => a.date === formData.date && a.time === formData.time);
    }
    if (conflict) {
      setError('Já existe um agendamento neste dia e horário. Por favor, escolha outro horário.');
      return;
    }
    // Create appointment with 'scheduled' status for owner to confirm
    const appointment = { ...formData, id: Date.now(), status: 'scheduled' };
    existing.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(existing));
    alert('Agendamento recebido! Aguarde confirmação. Obrigado.');
    setFormData({ patient: '', date: new Date().toISOString().split('T')[0], time: '', notes: '' });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Agendamento — Solicitação
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, textAlign: 'justify' }}>
          {bookingText.split('\n')[0] || 'Preencha seus dados e aguarde confirmação da clínica.'}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, textAlign: 'justify' }}>
          {bookingText.split('\n').slice(1,3).join(' ')}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}
        {/* Draft preview removed from public page to avoid showing edit controls */}
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Nome" value={formData.patient} onChange={(e) => handleChange('patient', e.target.value)} fullWidth required />
            </Grid>
            <Grid item xs={6}>
              <TextField type="date" label="Data" value={formData.date} onChange={(e) => handleChange('date', e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Escolha um horário</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Chip label="Disponível" variant="outlined" size="small" />
                <Chip label="Selecionado" color="primary" size="small" />
                <Chip label="Indisponível" color="error" variant="outlined" size="small" />
              </Box>
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
            </Grid>
            <Grid item xs={12}>
              <TextField label="Observações" value={formData.notes} onChange={(e) => handleChange('notes', e.target.value)} fullWidth multiline rows={3} />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              <Button type="submit" variant="contained">Enviar Agendamento</Button>
              {/* Publish draft button removed from public booking view */}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
