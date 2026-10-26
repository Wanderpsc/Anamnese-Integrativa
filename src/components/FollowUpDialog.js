import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  Chip
} from '@mui/material';
import { scheduleFollowUp, confirmFollowUp } from '../lib/storage';

export default function FollowUpDialog({ open, onClose, patient, onSuccess }) {
  const [followUpDate, setFollowUpDate] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSchedule = () => {
    if (!followUpDate) {
      setError('Por favor, selecione uma data para o retorno');
      return;
    }

    const selectedDate = new Date(followUpDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError('A data do retorno não pode ser no passado');
      return;
    }

    const success = scheduleFollowUp(patient.id, followUpDate, notes);
    if (success) {
      onSuccess && onSuccess();
      handleClose();
    } else {
      setError('Erro ao agendar retorno. Tente novamente.');
    }
  };

  const handleConfirm = () => {
    const success = confirmFollowUp(patient.id);
    if (success) {
      onSuccess && onSuccess();
      handleClose();
    } else {
      setError('Erro ao confirmar retorno. Tente novamente.');
    }
  };

  const handleClose = () => {
    setFollowUpDate('');
    setNotes('');
    setError('');
    onClose();
  };

  const hasExistingFollowUp = patient?.followUp?.scheduled;
  const followUpStatus = patient?.followUp?.status;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {hasExistingFollowUp ? '📅 Gerenciar Retorno' : '📅 Agendar Retorno'}
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          {/* Patient Info */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Paciente: {patient?.nome || 'Não informado'}
          </Typography>

          {/* Existing Follow-up Info */}
          {hasExistingFollowUp && (
            <Alert 
              severity={
                followUpStatus === 'confirmed' ? 'success' :
                followUpStatus === 'pending' ? 'warning' : 'info'
              }
              sx={{ mb: 3 }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Retorno {followUpStatus === 'confirmed' ? 'Confirmado' : 'Agendado'}
              </Typography>
              <Typography variant="body2">
                <strong>Data:</strong> {new Date(patient.followUp.date).toLocaleDateString('pt-BR')}
              </Typography>
              {patient.followUp.notes && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Observações:</strong> {patient.followUp.notes}
                </Typography>
              )}
              <Box sx={{ mt: 2 }}>
                <Chip 
                  label={followUpStatus === 'confirmed' ? 'Confirmado' : 'Aguardando Confirmação'}
                  color={followUpStatus === 'confirmed' ? 'success' : 'warning'}
                  size="small"
                />
              </Box>
            </Alert>
          )}

          {/* Schedule/Reschedule Form */}
          <TextField
            label="Data do Retorno"
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
            helperText="Selecione a data para a próxima consulta"
          />

          <TextField
            label="Observações"
            multiline
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            placeholder="Ex: Reavaliação dos sintomas, verificar resultados de exames, ajuste de tratamento..."
            helperText="Opcional: Adicione observações sobre o retorno"
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose}>
          Cancelar
        </Button>
        
        {hasExistingFollowUp && followUpStatus !== 'confirmed' && (
          <Button 
            variant="outlined" 
            color="success"
            onClick={handleConfirm}
          >
            Confirmar Retorno
          </Button>
        )}
        
        <Button 
          variant="contained" 
          onClick={handleSchedule}
          disabled={!followUpDate}
        >
          {hasExistingFollowUp ? 'Reagendar' : 'Agendar Retorno'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
