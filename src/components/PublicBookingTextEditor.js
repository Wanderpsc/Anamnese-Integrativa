import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

export default function PublicBookingTextEditor({ open, initial, onClose, onSave, readOnly = false }) {
  const [value, setValue] = useState(initial || '');

  React.useEffect(() => { setValue(initial || ''); }, [initial, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Editar texto de agendamento público</DialogTitle>
      <DialogContent>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Insira o texto que aparecerá na página pública de agendamento"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
        {!readOnly && <Button onClick={() => onSave(value)} variant="contained">Salvar</Button>}
      </DialogActions>
    </Dialog>
  );
}
