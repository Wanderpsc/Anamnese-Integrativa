import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  Alert,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ScienceIcon from '@mui/icons-material/Science';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import { NUTRIENT_INTERACTIONS, getInteractionStats } from '../data/nutrientInteractions';
import { usePatientIntegration } from '../hooks/usePatientIntegration';
import PrescriptionHeader from '../components/PrescriptionHeader';
import PrescriptionFooter from '../components/PrescriptionFooter';
import PrescriptionActions from '../components/PrescriptionActions';
import SaveToPatientBar from '../components/SaveToPatientBar';

const NutrientInteractions = () => {
  const contentRef = useRef(null);
  const { patientData, saveToPatient, goToDashboard } = usePatientIntegration('nutrientInteractions');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('todos');

  // Carregar dados salvos
  useEffect(() => {
    if (patientData && patientData.nutrientInteractions) {
      const saved = patientData.nutrientInteractions;
      if (saved.searchTerm) setSearchTerm(saved.searchTerm);
      if (saved.filterType) setFilterType(saved.filterType);
    }
  }, [patientData]);

  // Salvar dados
  useEffect(() => {
    if (searchTerm || filterType !== 'todos') {
      saveToPatient({
        searchTerm,
        filterType,
        filteredCount: filteredInteractions.length,
        updatedAt: new Date().toISOString()
      });
    }
  }, [searchTerm, filterType, saveToPatient]);

  // Estatísticas
  const stats = useMemo(() => getInteractionStats(), []);

  // Filtrar interações
  const filteredInteractions = useMemo(() => {
    let filtered = NUTRIENT_INTERACTIONS;

    // Filtrar por tipo
    if (filterType !== 'todos') {
      filtered = filtered.filter(i => i.tipo.toLowerCase() === filterType);
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        i =>
          i.nutriente1.toLowerCase().includes(search) ||
          i.nutriente2.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [searchTerm, filterType]);

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilterType(newFilter);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Botões de ação no topo */}
      <Box sx={{ mb: 3 }}>
        <PrescriptionActions
          patientData={patientData}
          contentRef={contentRef}
          contentTitle="Interacoes_Nutrientes"
          onBack={goToDashboard}
        />
      </Box>

      {/* Área de impressão */}
      <Box id="prescription-print-area" ref={contentRef}>
        {/* Cabeçalho do Receituário (apenas para impressão) */}
        <Box className="print-only">
          <PrescriptionHeader entry={patientData} />
        </Box>

        {/* Cabeçalho */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <ScienceIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Interações entre Nutrientes
          </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Consulta de Sinergismo e Antagonismo Nutricional
        </Typography>
      </Box>

      {/* Alertas informativos */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Alert severity="success" icon={<CheckCircleIcon />}>
            <strong>Sinergismo:</strong> Nutrientes que potencializam a absorção e ação uns dos outros
          </Alert>
        </Grid>
        <Grid item xs={12} md={6}>
          <Alert severity="error" icon={<CancelIcon />}>
            <strong>Antagonismo:</strong> Nutrientes que competem e reduzem a absorção mútua
          </Alert>
        </Grid>
      </Grid>

      {/* Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {stats.total}
              </Typography>
              <Typography variant="body1">
                Total de Interações
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {stats.sinergismos}
              </Typography>
              <Typography variant="body1">
                Sinergismos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {stats.antagonismos}
              </Typography>
              <Typography variant="body1">
                Antagonismos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filtros e Busca */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Buscar por nutriente (ex: Vitamina D, Ferro, Magnésio...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ToggleButtonGroup
                  value={filterType}
                  exclusive
                  onChange={handleFilterChange}
                  aria-label="tipo de interação"
                >
                  <ToggleButton value="todos" aria-label="todos">
                    Todos
                  </ToggleButton>
                  <ToggleButton value="sinergismo" aria-label="sinergismo">
                    Sinergismo
                  </ToggleButton>
                  <ToggleButton value="antagonismo" aria-label="antagonismo">
                    Antagonismo
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Informações importantes */}
      <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 3 }}>
        <strong>Importante:</strong> Estas interações são consideradas automaticamente em todos os protocolos e receituários deste sistema. 
        Nutrientes com antagonismo devem ser administrados em horários diferentes (mínimo 2-3 horas de intervalo) para melhor absorção.
      </Alert>

      {/* Tabela de Interações */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Tabela de Interações
            <Chip
              label={`${filteredInteractions.length} resultado(s)`}
              color="primary"
              size="small"
              sx={{ ml: 2 }}
            />
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                    Nutriente 1
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                    Nutriente 2
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                    Tipo de Interação
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInteractions.length > 0 ? (
                  filteredInteractions.map((interaction, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                        '&:hover': { backgroundColor: '#f0f0f0' }
                      }}
                    >
                      <TableCell>{interaction.nutriente1}</TableCell>
                      <TableCell>{interaction.nutriente2}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={interaction.tipo}
                          color={interaction.tipo === 'Sinergismo' ? 'success' : 'error'}
                          icon={interaction.tipo === 'Sinergismo' ? <CheckCircleIcon /> : <CancelIcon />}
                          sx={{ fontWeight: 'bold' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">
                        Nenhuma interação encontrada para o filtro atual
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Rodapé com orientações */}
      <Card sx={{ mt: 3, backgroundColor: '#fff3e0' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            📋 Orientações Práticas
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Sinergismo:</strong> Estes nutrientes podem e devem ser administrados juntos para potencializar os efeitos terapêuticos.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Antagonismo:</strong> Separe a administração destes nutrientes em pelo menos 2-3 horas para evitar competição na absorção.
          </Typography>
          <Typography variant="body2">
            <strong>Exemplo prático:</strong> Cálcio e Ferro têm antagonismo - tome o Ferro pela manhã em jejum e o Cálcio à noite antes de dormir.
          </Typography>
        </CardContent>
      </Card>

        {/* Rodapé do Receituário (apenas para impressão) */}
        <Box className="print-only">
          <PrescriptionFooter />
        </Box>
      </Box>

      {/* Estilos para impressão */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
        }
        @media screen {
          .print-only { display: none !important; }
        }
      `}</style>

      <SaveToPatientBar
        moduleKey="nutrientInteractions"
        getData={() => ({ savedAt: new Date().toISOString() })}
        label="Salvar consulta de interações nutricionais no interagente"
      />
    </Container>
  );
};

export default NutrientInteractions;
