import { useState } from 'react';
import { Box, Button, Typography, Chip, Alert, Snackbar, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { usePatient } from '../context/PatientContext';

/**
 * Barra de salvar dados no interagente em consulta.
 *
 * Props:
 *  moduleKey  {string}    — chave no registro da anamnese (ex: 'iridologyAnalysis')
 *  getData    {function}  — retorna o objeto/dado a salvar
 *  label      {string}    — texto do botão (opcional)
 *  disabled   {boolean}   — desabilita o botão (opcional)
 *  sx         {object}    — estilos extras do container (opcional)
 */
export default function SaveToPatientBar({
  moduleKey,
  getData,
  label = 'Salvar dados nesta consulta',
  disabled = false,
  sx = {},
}) {
  const { currentPatient, saveModuleData } = usePatient();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');

  const hasPatient = Boolean(currentPatient);

  const handleSave = () => {
    if (!hasPatient) {
      setSnackMsg('Nenhum interagente em consulta. Inicie uma consulta no Dashboard.');
      setSnackSeverity('warning');
      setSnackOpen(true);
      return;
    }
    const data = getData ? getData() : null;
    if (data === null || data === undefined) {
      setSnackMsg('Nenhum dado para salvar ainda.');
      setSnackSeverity('info');
      setSnackOpen(true);
      return;
    }
    const ok = saveModuleData(moduleKey, data);
    if (ok) {
      setSnackMsg(`✅ Dados salvos no interagente ${currentPatient.q01_nome || ''}!`);
      setSnackSeverity('success');
    } else {
      setSnackMsg('❌ Erro ao salvar. Tente novamente.');
      setSnackSeverity('error');
    }
    setSnackOpen(true);
  };

  const patientLabel = currentPatient
    ? `${currentPatient.q01_nome || 'Interagente'}${currentPatient.q03_idade ? ` · ${currentPatient.q03_idade} anos` : ''}`
    : 'Nenhum interagente em consulta';

  return (
    <>
      <Box
        className="no-print"
        sx={{
          mt: 4,
          p: 2,
          borderRadius: 2,
          border: '1.5px solid',
          borderColor: hasPatient ? 'primary.light' : 'warning.light',
          bgcolor: hasPatient ? 'primary.50' : 'warning.50',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          ...sx,
        }}
      >
        <PersonIcon color={hasPatient ? 'primary' : 'warning'} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            Interagente em consulta
          </Typography>
          <Typography variant="body1" fontWeight={600} color={hasPatient ? 'primary.main' : 'warning.main'}>
            {patientLabel}
          </Typography>
        </Box>
        <Tooltip
          title={hasPatient ? `Salvar em: ${patientLabel}` : 'Inicie uma consulta primeiro'}
          arrow
        >
          <span>
            <Button
              variant="contained"
              color={hasPatient ? 'primary' : 'warning'}
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={disabled || !hasPatient}
              sx={{ fontWeight: 700, px: 3 }}
            >
              {label}
            </Button>
          </span>
        </Tooltip>
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3500}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          icon={snackSeverity === 'success' ? <CheckCircleIcon /> : undefined}
          sx={{ width: '100%' }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
