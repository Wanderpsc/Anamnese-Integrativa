import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ExamesLaboratoriais = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4">
          ✅ Exames Laboratoriais - Teste Funcional
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Esta página está funcionando! O componente foi carregado com sucesso.
        </Typography>
      </Paper>
    </Box>
  );
};

export default ExamesLaboratoriais;
