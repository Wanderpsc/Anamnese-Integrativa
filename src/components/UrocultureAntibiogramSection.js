import React, { useMemo } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Science as ScienceIcon
} from '@mui/icons-material';
import {
  ANTIBIOTIC_ORDER,
  ANTIBIOTIC_PROFILES,
  UROCULTURE_PATHOGENS,
  UROCULTURE_STATUS_OPTIONS,
  buildUrocultureIntegrativeAnalysis
} from '../data/urocultureIntegrativeData';

export default function UrocultureAntibiogramSection({
  urocultureData,
  setUrocultureData,
  onLoadImageTemplate
}) {
  const analysis = useMemo(
    () => buildUrocultureIntegrativeAnalysis(urocultureData),
    [urocultureData]
  );

  const handleFieldChange = (field, value) => {
    setUrocultureData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAntibioticStatusChange = (antibioticKey, status) => {
    setUrocultureData((prev) => ({
      ...prev,
      susceptibility: {
        ...prev.susceptibility,
        [antibioticKey]: status
      }
    }));
  };

  const selectedPathogen = UROCULTURE_PATHOGENS[urocultureData.selectedAgent];

  const getStatusColor = (status) => {
    if (status === 'S') return 'success';
    if (status === 'I') return 'warning';
    if (status === 'R') return 'error';
    return 'default';
  };

  return (
    <Paper sx={{ p: 3, mb: 3, bgcolor: '#f3f8ff', border: '2px solid #90caf9' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#0d47a1' }}>
        🧫 Urocultura com Antibiograma (Análise Integrativa)
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            select
            label="Agente isolado"
            value={urocultureData.selectedAgent}
            onChange={(e) => handleFieldChange('selectedAgent', e.target.value)}
            SelectProps={{ native: true }}
          >
            <option value="">Selecione o agente</option>
            {Object.entries(UROCULTURE_PATHOGENS).map(([key, agent]) => (
              <option key={key} value={key}>{agent.nome} ({agent.tipo})</option>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            type="number"
            label="Contagem de colônias"
            value={urocultureData.colonyCount}
            onChange={(e) => handleFieldChange('colonyCount', e.target.value)}
            inputProps={{ step: '1', min: '0' }}
            helperText="UFC/mL"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Material biológico"
            value={urocultureData.material || ''}
            onChange={(e) => handleFieldChange('material', e.target.value)}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }} className="no-print">
        <Button
          size="small"
          variant="outlined"
          startIcon={<ScienceIcon />}
          onClick={onLoadImageTemplate}
        >
          Carregar Modelo das Imagens
        </Button>
      </Box>

      <Alert severity={analysis.colony.severity} sx={{ mb: 2 }}>
        {analysis.colony.mensagem}
      </Alert>

      {selectedPathogen && (
        <Accordion defaultExpanded sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 700 }}>
              Agente contaminador: {selectedPathogen.nome}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>O que pode causar</Typography>
                    <List dense>
                      {selectedPathogen.manifestacoes.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${item}`} />
                        </ListItem>
                      ))}
                    </List>

                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, mt: 1 }}>Riscos clínicos</Typography>
                    <List dense>
                      {selectedPathogen.riscos.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${item}`} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Observações integrativas</Typography>
                    <List dense>
                      {selectedPathogen.observacoesIntegrativas.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${item}`} />
                        </ListItem>
                      ))}
                    </List>

                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, mt: 1 }}>Tratamento adjuvante</Typography>
                    <List dense>
                      {selectedPathogen.protocoloIntegrativo.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${item}`} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        Antibiograma: ação no agente, impacto na pessoa e reposição
      </Typography>

      <TableContainer sx={{ mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Antibiótico</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Ação contra o agente</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Impacto na pessoa</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Reposição e probióticos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ANTIBIOTIC_ORDER.map((antibioticKey) => {
              const antibiotic = ANTIBIOTIC_PROFILES[antibioticKey];
              const status = urocultureData.susceptibility?.[antibioticKey] || '';
              return (
                <TableRow key={antibioticKey}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{antibiotic.nome}</Typography>
                    <Typography variant="caption" color="text.secondary">{antibiotic.classe}</Typography>
                  </TableCell>

                  <TableCell>
                    <TextField
                      select
                      size="small"
                      value={status}
                      onChange={(e) => handleAntibioticStatusChange(antibioticKey, e.target.value)}
                      SelectProps={{ native: true }}
                      sx={{ minWidth: 110 }}
                    >
                      <option value="">-</option>
                      {UROCULTURE_STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </TextField>
                    {status && (
                      <Chip
                        size="small"
                        color={getStatusColor(status)}
                        label={UROCULTURE_STATUS_OPTIONS.find((x) => x.value === status)?.label || status}
                        sx={{ mt: 0.5 }}
                      />
                    )}
                  </TableCell>

                  <TableCell>
                    <Typography variant="caption">{antibiotic.acaoNoAgente}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="caption">{antibiotic.impactoNaPessoa}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="caption" sx={{ display: 'block' }}>{antibiotic.reposicao}</Typography>
                    <Typography variant="caption" sx={{ color: '#2e7d32', fontWeight: 600 }}>
                      {antibiotic.probioticos}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Alert severity="success">
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>Sensíveis ({analysis.sensitive.length})</Typography>
            <Typography variant="caption">{analysis.sensitive.length > 0 ? analysis.sensitive.join(', ') : 'Não informado'}</Typography>
          </Alert>
        </Grid>
        <Grid item xs={12} md={4}>
          <Alert severity="warning">
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>Intermediários ({analysis.intermediate.length})</Typography>
            <Typography variant="caption">{analysis.intermediate.length > 0 ? analysis.intermediate.join(', ') : 'Não informado'}</Typography>
          </Alert>
        </Grid>
        <Grid item xs={12} md={4}>
          <Alert severity="error">
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>Resistentes ({analysis.resistant.length})</Typography>
            <Typography variant="caption">{analysis.resistant.length > 0 ? analysis.resistant.join(', ') : 'Não informado'}</Typography>
          </Alert>
        </Grid>
      </Grid>

      {analysis.probioticStack.length > 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
            Probióticos de reposição sugeridos no pós-antibiótico
          </Typography>
          <List dense>
            {analysis.probioticStack.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={`• ${item}`} />
              </ListItem>
            ))}
          </List>
        </Alert>
      )}

      {selectedPathogen?.referenciasIntegrativas?.length > 0 && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
            Referências integrativas utilizadas na interpretação
          </Typography>
          <List dense>
            {selectedPathogen.referenciasIntegrativas.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={`• ${item}`} />
              </ListItem>
            ))}
          </List>
          <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
            Uso educacional e de apoio clínico integrativo. A conduta antimicrobiana final depende de avaliação médica, quadro clínico e antibiograma formal.
          </Typography>
        </Alert>
      )}
    </Paper>
  );
}
