import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import RESPONSES from '../config/bloodTypeResponses';

export default function BloodTypeDiagnosis({ bloodType }) {
  const key = String(bloodType || '').trim().toUpperCase();
  const r = RESPONSES[key];

  if (!key) {
    return (
      <Paper sx={{ p: 2, minWidth: 260 }} elevation={0} aria-label="bloodtype-diagnosis-empty">
        <Typography variant="subtitle2"><strong>Diagnóstico por tipo sanguíneo</strong></Typography>
        <Typography variant="body2" color="text.secondary">Informe o tipo sanguíneo para receber uma orientação diagnóstica rápida.</Typography>
      </Paper>
    );
  }

  if (!r) {
    return (
      <Paper sx={{ p: 2, minWidth: 260 }} elevation={0} aria-label="bloodtype-diagnosis-unknown">
        <Typography variant="subtitle2"><strong>Diagnóstico por tipo sanguíneo</strong></Typography>
        <Typography variant="body2" color="text.secondary">Tipo "{key}" não encontrado no banco de respostas. Verifique o valor ou atualize as respostas.</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, minWidth: 260 }} elevation={0} aria-label={`bloodtype-diagnosis-${key}`}>
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle2"><strong>{r.title}</strong></Typography>
        <Typography variant="body2" color="text.secondary">{r.synopsis}</Typography>
      </Box>
      <Typography variant="caption" color="text.secondary">{r.details}</Typography>
    </Paper>
  );
}
