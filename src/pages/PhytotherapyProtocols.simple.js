import { Container, Paper, Typography, Box } from '@mui/material';

export default function PhytotherapyProtocols() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4">Teste - Protocolos de Fitoterapia</Typography>
        <Typography variant="body1">
          Se você está vendo esta mensagem, o componente está carregando corretamente.
        </Typography>
      </Paper>
    </Container>
  );
}
