import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import {
  Save as SaveIcon,
  Print as PrintIcon,
} from '@mui/icons-material';

const ExamesLaboratoriaisSimple = () => {
  const navigate = useNavigate();
  const [pacienteNome, setPacienteNome] = useState('');
  const [dataExame, setDataExame] = useState(new Date().toISOString().split('T')[0]);
  const [exames, setExames] = useState([
    { id: 1, exame: 'Hemoglobina', referencia: 'H: 13.5-17.5 | M: 12.0-15.5 g/dL', resultado: '' },
    { id: 2, exame: 'Glicemia', referencia: '70-100 mg/dL', resultado: '' },
    { id: 3, exame: 'Colesterol Total', referencia: '< 200 mg/dL', resultado: '' },
  ]);

  const handleSalvar = () => {
    try {
      localStorage.setItem('examesLaboratoriais', JSON.stringify({
        pacienteNome,
        dataExame,
        exames
      }));
      alert('✅ Dados salvos com sucesso!');
    } catch (error) {
      alert('❌ Erro ao salvar: ' + error.message);
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('examesLaboratoriais');
      if (saved) {
        const data = JSON.parse(saved);
        setPacienteNome(data.pacienteNome || '');
        setDataExame(data.dataExame || new Date().toISOString().split('T')[0]);
        if (data.exames && data.exames.length > 0) {
          setExames(data.exames);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }, []);

  const handleResultadoChange = (id, value) => {
    setExames(prev => prev.map(ex => 
      ex.id === id ? { ...ex, resultado: value } : ex
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        🧪 Exames Laboratoriais
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Versão simplificada funcionando! Digite os resultados dos exames abaixo.
      </Alert>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Nome do Paciente"
            value={pacienteNome}
            onChange={(e) => setPacienteNome(e.target.value)}
            fullWidth
          />
          <TextField
            label="Data do Exame"
            type="date"
            value={dataExame}
            onChange={(e) => setDataExame(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 200 }}
          />
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Exame</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Valores de Referência</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Resultado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exames.map((exame) => (
              <TableRow key={exame.id}>
                <TableCell>{exame.exame}</TableCell>
                <TableCell>{exame.referencia}</TableCell>
                <TableCell>
                  <TextField
                    value={exame.resultado}
                    onChange={(e) => handleResultadoChange(exame.id, e.target.value)}
                    size="small"
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSalvar}>
          Salvar
        </Button>
        <Button variant="contained" color="success" startIcon={<PrintIcon />} onClick={() => window.print()}>
          Imprimir
        </Button>
      </Box>
    </Box>
  );
};

export default ExamesLaboratoriaisSimple;
