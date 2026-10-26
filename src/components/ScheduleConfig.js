/**
 * ScheduleConfig — Configuração da Agenda de Atendimentos
 * Permite ao terapeuta definir dias/horários disponíveis, duração de consultas,
 * intervalo de almoço e datas bloqueadas.
 * Os dados são gravados em localStorage + Supabase (via api.setSetting).
 */
import { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Button, Chip, Stack, Alert, TextField,
  Tabs, Tab, Grid, ToggleButton, ToggleButtonGroup, FormControlLabel,
  Switch, Divider, IconButton, Tooltip, Card, CardContent,
} from '@mui/material';
import {
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  Schedule as ScheduleIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { setSetting as apiSetSetting, getSetting as apiGetSetting } from '../lib/api';

// ─── Constantes ────────────────────────────────────────────────────────────────
const DAYS = [
  { value: 0, label: 'Dom', full: 'Domingo' },
  { value: 1, label: 'Seg', full: 'Segunda-feira' },
  { value: 2, label: 'Ter', full: 'Terça-feira' },
  { value: 3, label: 'Qua', full: 'Quarta-feira' },
  { value: 4, label: 'Qui', full: 'Quinta-feira' },
  { value: 5, label: 'Sex', full: 'Sexta-feira' },
  { value: 6, label: 'Sáb', full: 'Sábado' },
];

const DURATIONS = [
  { value: 30, label: '30 min' },
  { value: 45, label: '45 min' },
  { value: 60, label: '1 hora' },
  { value: 90, label: '1h30' },
  { value: 120, label: '2 horas' },
];

export const DEFAULT_SCHEDULE_CONFIG = {
  availableDays: [1, 2, 3, 4, 5],
  startTime: '08:00',
  endTime: '18:00',
  hasLunch: true,
  lunchStart: '12:00',
  lunchEnd: '14:00',
  interval: 60,
  blockedDates: [],
  blockedSlots: [],
  maxAdvanceDays: 60,
};

// ─── Funções utilitárias exportadas (usadas pelo BookingPage) ──────────────────
export function loadScheduleConfig() {
  try {
    const raw = localStorage.getItem('scheduleConfig');
    if (raw) return { ...DEFAULT_SCHEDULE_CONFIG, ...JSON.parse(raw) };
  } catch (e) { /* ignore */ }
  return { ...DEFAULT_SCHEDULE_CONFIG };
}

function toMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}
function toTime(minutes) {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0');
  const m = String(minutes % 60).padStart(2, '0');
  return `${h}:${m}`;
}

/** Retorna array de strings de horário disponíveis para a data informada. */
export function generateAvailableSlots(dateStr, config) {
  const cfg = config || loadScheduleConfig();
  const date = new Date(dateStr + 'T00:00:00');
  const dayOfWeek = date.getDay();

  if (!cfg.availableDays.includes(dayOfWeek)) return [];
  if ((cfg.blockedDates || []).includes(dateStr)) return [];

  const blockedSlots = cfg.blockedSlots || [];
  const start = toMinutes(cfg.startTime);
  const end = toMinutes(cfg.endTime);
  const lunchStart = cfg.hasLunch ? toMinutes(cfg.lunchStart) : null;
  const lunchEnd   = cfg.hasLunch ? toMinutes(cfg.lunchEnd)   : null;
  const iv = cfg.interval || 60;

  const slots = [];
  let cur = start;
  while (cur + iv <= end) {
    // Pula o almoço ou ajusta para depois
    if (lunchStart !== null) {
      if (cur >= lunchStart && cur < lunchEnd) { cur += iv; continue; }
      if (cur < lunchStart && cur + iv > lunchStart) { cur = lunchEnd; continue; }
    }
    const slotKey = `${dateStr} ${toTime(cur)}`;
    if (!blockedSlots.includes(slotKey)) slots.push(toTime(cur));
    cur += iv;
  }
  return slots;
}

// ─── Componente principal ──────────────────────────────────────────────────────
export default function ScheduleConfig({ appointments = [] }) {
  const [tab, setTab] = useState(0);
  const [config, setConfig] = useState(() => loadScheduleConfig());
  const [saved, setSaved] = useState(false);
  const [newBlockedDate, setNewBlockedDate] = useState('');

  // Tenta carregar config do Supabase ao montar
  useEffect(() => {
    apiGetSetting('scheduleConfig').then(remote => {
      if (!remote) return;
      try {
        const parsed = typeof remote === 'string' ? JSON.parse(remote) : remote;
        setConfig(prev => ({ ...DEFAULT_SCHEDULE_CONFIG, ...parsed }));
      } catch (e) { /* ignore */ }
    }).catch(() => {});
  }, []);

  const handleSave = async () => {
    const json = JSON.stringify(config);
    localStorage.setItem('scheduleConfig', json);
    try { await apiSetSetting('scheduleConfig', json); } catch (e) { /* ignore */ }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleToggleDay = (_, newDays) => {
    // ToggleButtonGroup com múltipla seleção retorna array ou null
    if (Array.isArray(newDays)) setConfig(prev => ({ ...prev, availableDays: newDays.sort() }));
  };

  const handleAddBlockedDate = () => {
    if (!newBlockedDate || config.blockedDates.includes(newBlockedDate)) return;
    setConfig(prev => ({ ...prev, blockedDates: [...prev.blockedDates, newBlockedDate].sort() }));
    setNewBlockedDate('');
  };

  const handleRemoveBlockedDate = (d) =>
    setConfig(prev => ({ ...prev, blockedDates: prev.blockedDates.filter(x => x !== d) }));

  const handleToggleSlot = async (slotKey) => {
    const current = config.blockedSlots || [];
    const updated = current.includes(slotKey)
      ? current.filter(s => s !== slotKey)
      : [...current, slotKey];
    const newConfig = { ...config, blockedSlots: updated };
    setConfig(newConfig);
    const json = JSON.stringify(newConfig);
    localStorage.setItem('scheduleConfig', json);
    try { await apiSetSetting('scheduleConfig', json); } catch (e) { /* ignore */ }
  };

  // Grade semanal — próximos 7 dias
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const apptsByDate = {};
  appointments.forEach(a => {
    if (!apptsByDate[a.date]) apptsByDate[a.date] = [];
    apptsByDate[a.date].push(a.time);
  });

  const dayLabels = config.availableDays
    .map(d => DAYS.find(x => x.value === d)?.label)
    .filter(Boolean).join(', ');

  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Tab icon={<ScheduleIcon />} label="Configurações" iconPosition="start" />
        <Tab icon={<EventIcon />} label="Grade da Semana" iconPosition="start" />
        <Tab
          icon={<BlockIcon />}
          label={`Datas Bloqueadas${config.blockedDates.length ? ` (${config.blockedDates.length})` : ''}`}
          iconPosition="start"
        />
      </Tabs>

      {/* ── TAB 0: Configurações ─────────────────────────────── */}
      {tab === 0 && (
        <Stack spacing={3}>

          {/* Dias disponíveis */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Dias da Semana Disponíveis para Atendimento
            </Typography>
            <ToggleButtonGroup
              value={config.availableDays}
              onChange={handleToggleDay}
              sx={{ flexWrap: 'wrap', gap: 1 }}
            >
              {DAYS.map(d => (
                <ToggleButton key={d.value} value={d.value}
                  sx={{
                    minWidth: 56, fontWeight: 600,
                    '&.Mui-selected': { bgcolor: '#1976d2', color: '#fff', '&:hover': { bgcolor: '#1565c0' } },
                  }}>
                  {d.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Selecionados: {dayLabels || '(nenhum)'}
            </Typography>
          </Paper>

          {/* Horário de atendimento */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Horário de Atendimento
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Início" type="time" fullWidth size="small"
                  value={config.startTime}
                  onChange={e => setConfig(prev => ({ ...prev, startTime: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Fim" type="time" fullWidth size="small"
                  value={config.endTime}
                  onChange={e => setConfig(prev => ({ ...prev, endTime: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <FormControlLabel
              control={
                <Switch
                  checked={config.hasLunch}
                  onChange={e => setConfig(prev => ({ ...prev, hasLunch: e.target.checked }))}
                />
              }
              label="Intervalo de Almoço / Pausa"
            />
            {config.hasLunch && (
              <Grid container spacing={2} alignItems="center" sx={{ mt: 0.5 }}>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Pausa: início" type="time" fullWidth size="small"
                    value={config.lunchStart}
                    onChange={e => setConfig(prev => ({ ...prev, lunchStart: e.target.value }))}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Pausa: fim" type="time" fullWidth size="small"
                    value={config.lunchEnd}
                    onChange={e => setConfig(prev => ({ ...prev, lunchEnd: e.target.value }))}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            )}
          </Paper>

          {/* Duração de cada consulta */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Duração de Cada Consulta
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {DURATIONS.map(d => (
                <Chip
                  key={d.value} label={d.label} clickable
                  color={config.interval === d.value ? 'primary' : 'default'}
                  variant={config.interval === d.value ? 'filled' : 'outlined'}
                  onClick={() => setConfig(prev => ({ ...prev, interval: d.value }))}
                  sx={{ fontSize: '0.95rem', py: 2.5, px: 1 }}
                />
              ))}
            </Box>
          </Paper>

          {/* Antecedência máxima */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Máximo de Dias para Agendamento Antecipado
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {[15, 30, 60, 90, 120].map(d => (
                <Chip
                  key={d} label={`${d} dias`} clickable
                  color={config.maxAdvanceDays === d ? 'primary' : 'default'}
                  variant={config.maxAdvanceDays === d ? 'filled' : 'outlined'}
                  onClick={() => setConfig(prev => ({ ...prev, maxAdvanceDays: d }))}
                  sx={{ fontSize: '0.9rem', py: 2, px: 1 }}
                />
              ))}
            </Box>
          </Paper>

          {/* Resumo */}
          <Alert severity="info" icon={<CheckCircleIcon />}>
            O link público <strong>/book</strong> exibirá horários de{' '}
            <strong>{config.startTime}</strong> às <strong>{config.endTime}</strong>
            {config.hasLunch
              ? ` (pausa das ${config.lunchStart} às ${config.lunchEnd})`
              : ''}
            , a cada <strong>{config.interval} min</strong>, nos dias:{' '}
            <strong>{dayLabels || '(nenhum selecionado)'}</strong>.
            Agendamentos aceitos com até{' '}
            <strong>{config.maxAdvanceDays} dias</strong> de antecedência.
          </Alert>

          <Button
            variant="contained" size="large" startIcon={<SaveIcon />}
            onClick={handleSave}
            color={saved ? 'success' : 'primary'}
            sx={{ alignSelf: 'flex-start', px: 4 }}
          >
            {saved ? '✓ Configurações Salvas!' : 'Salvar Configurações da Agenda'}
          </Button>
        </Stack>
      )}

      {/* ── TAB 1: Grade da Semana ─────────────────────────── */}
      {tab === 1 && (
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Próximos 7 Dias — Horários Disponíveis e Reservados
          </Typography>
          <Alert severity="info" sx={{ mb: 2, py: 0.5 }}>
            Clique em um horário <strong>verde</strong> para marcá-lo como <strong>Sem Disponibilidade</strong> (bloqueio manual). Clique novamente para desbloquear.
          </Alert>
          <Box sx={{ overflowX: 'auto', pb: 1 }}>
            <Grid container spacing={1} sx={{ minWidth: 560 }}>
              {weekDays.map(dateStr => {
                const date = new Date(dateStr + 'T00:00:00');
                const dayNum = date.getDay();
                const blockedSlots = config.blockedSlots || [];
                const isDateAvail = config.availableDays.includes(dayNum)
                  && !(config.blockedDates || []).includes(dateStr);
                // All generated slots (ignoring blockedSlots so we can show them as blocked)
                const allSlots = isDateAvail ? (() => {
                  const cfg = { ...config, blockedSlots: [] };
                  return generateAvailableSlots(dateStr, cfg);
                })() : [];
                const reserved = apptsByDate[dateStr] || [];
                const dayLabel = DAYS.find(d => d.value === dayNum)?.label || '';
                const dateLabel = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                const isToday = dateStr === new Date().toISOString().split('T')[0];

                return (
                  <Grid item xs key={dateStr} sx={{ minWidth: 90, flex: 1 }}>
                    <Paper
                      elevation={isToday ? 4 : 1}
                      sx={{
                        p: 1.5, minHeight: 180,
                        bgcolor: !isDateAvail ? '#f5f5f5' : isToday ? '#e3f2fd' : '#fff',
                        border: isToday ? '2px solid #1976d2' : '1px solid #e0e0e0',
                        opacity: !isDateAvail ? 0.65 : 1,
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight="bold" align="center">
                        {dayLabel}
                      </Typography>
                      <Typography variant="caption" align="center" display="block" color="text.secondary" sx={{ mb: 1 }}>
                        {dateLabel}{isToday ? ' (hoje)' : ''}
                      </Typography>

                      {!isDateAvail ? (
                        <Typography variant="caption" color="text.secondary" align="center" display="block">
                          {(config.blockedDates || []).includes(dateStr)
                            ? '🚫 Bloqueado'
                            : '— Fechado —'}
                        </Typography>
                      ) : allSlots.length === 0 ? (
                        <Typography variant="caption" color="text.secondary" align="center" display="block">
                          Sem horários
                        </Typography>
                      ) : (
                        <Stack spacing={0.4}>
                          {allSlots.map(time => {
                            const slotKey = `${dateStr} ${time}`;
                            const isReserved = reserved.includes(time);
                            const isBlocked = blockedSlots.includes(slotKey);
                            return (
                              <Tooltip
                                key={time}
                                title={isReserved ? 'Horário reservado por paciente' : isBlocked ? 'Clique para desbloquear' : 'Clique para bloquear (Sem Disponibilidade)'}
                                arrow
                              >
                                <Chip
                                  label={isBlocked ? `🚫 ${time}` : time}
                                  size="small"
                                  color={isReserved ? 'error' : isBlocked ? 'default' : 'success'}
                                  variant={isReserved ? 'filled' : isBlocked ? 'filled' : 'outlined'}
                                  onClick={isReserved ? undefined : () => handleToggleSlot(slotKey)}
                                  sx={{
                                    fontSize: '0.7rem', height: 22, borderRadius: 1,
                                    cursor: isReserved ? 'default' : 'pointer',
                                    bgcolor: isBlocked ? '#757575' : undefined,
                                    color: isBlocked ? '#fff' : undefined,
                                    '&:hover': isReserved ? {} : { opacity: 0.8 },
                                  }}
                                />
                              </Tooltip>
                            );
                          })}
                        </Stack>
                      )}
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Box display="flex" gap={2} mt={2} flexWrap="wrap">
            <Chip label="🟢 Disponível" color="success" variant="outlined" size="small" />
            <Chip label="🔴 Reservado" color="error" size="small" />
            <Chip label="🚫 Sem Disponibilidade" size="small" sx={{ bgcolor: '#757575', color: '#fff' }} />
            <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
              Clique nos horários verdes para bloquear/desbloquear manualmente.
            </Typography>
          </Box>
        </Box>
      )}

      {/* ── TAB 2: Datas Bloqueadas ─────────────────────────── */}
      {tab === 2 && (
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Datas Bloqueadas — Feriados, Férias, Compromissos
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Datas adicionadas aqui não aparecerão no link público de agendamento.
          </Typography>

          <Box display="flex" gap={1} alignItems="center" mb={3} flexWrap="wrap">
            <TextField
              type="date" label="Selecionar data para bloquear"
              value={newBlockedDate}
              onChange={e => setNewBlockedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size="small" sx={{ width: 240 }}
            />
            <Button
              variant="contained" startIcon={<BlockIcon />}
              onClick={handleAddBlockedDate}
              disabled={!newBlockedDate}
              color="error"
            >
              Bloquear Data
            </Button>
          </Box>

          {config.blockedDates.length === 0 ? (
            <Alert severity="info">Nenhuma data bloqueada. Todos os dias configurados estão disponíveis.</Alert>
          ) : (
            <Stack spacing={1} sx={{ maxWidth: 500 }}>
              {config.blockedDates.map(d => (
                <Paper key={d} variant="outlined" sx={{
                  p: 1.5, display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', borderColor: '#ef9a9a',
                }}>
                  <Typography variant="body2">
                    🚫{' '}
                    {new Date(d + 'T00:00:00').toLocaleDateString('pt-BR', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </Typography>
                  <Tooltip title="Remover bloqueio">
                    <IconButton size="small" color="error" onClick={() => handleRemoveBlockedDate(d)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Paper>
              ))}
            </Stack>
          )}

          {config.blockedDates.length > 0 && (
            <Button
              variant="contained" sx={{ mt: 2 }} startIcon={<SaveIcon />}
              onClick={handleSave}
              color={saved ? 'success' : 'error'}
            >
              {saved ? '✓ Salvo!' : 'Salvar Datas Bloqueadas'}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}
