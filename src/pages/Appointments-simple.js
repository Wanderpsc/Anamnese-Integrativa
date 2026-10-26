import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Appointments() {
  const navigate = useNavigate();
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Agendamentos</Typography>
      <Button variant="contained" onClick={() => navigate('/anamnese/new')}>
        Nova Anamnese
      </Button>
      <Typography sx={{ mt: 2 }}>
        Sistema de agendamentos (versão simplificada temporária)
      </Typography>
    </Box>
  );
}
