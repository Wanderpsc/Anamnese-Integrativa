import React from 'react';
import { Box, Typography, Paper, Grid, Chip, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MedicationIcon from '@mui/icons-material/Medication';
import SpaIcon from '@mui/icons-material/Spa';

/**
 * Componente de Quadro Terapêutico
 * Exibe sugestões organizadas por problema de saúde com formato profissional
 */
export default function TherapeuticBoard({ therapeuticData = [] }) {
  if (!therapeuticData || therapeuticData.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center', background: '#f5f5f5' }}>
        <Typography variant="body2" color="text.secondary">
          Nenhuma sugestão terapêutica específica disponível para os sintomas informados.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 600 }}>
        <LocalHospitalIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Protocolo Terapêutico Personalizado
      </Typography>

      <Grid container spacing={3}>
        {therapeuticData.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3, 
                height: '100%',
                border: '2px solid #e3f2fd',
                borderLeft: '6px solid #1976d2',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(25,118,210,0.15)'
                }
              }}
            >
              {/* Título do problema */}
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2, 
                  color: '#1976d2',
                  fontWeight: 600,
                  borderBottom: '2px solid #e3f2fd',
                  pb: 1
                }}
              >
                {item.title}
              </Typography>

              {/* Orientações Gerais */}
              {item.suggestions && item.suggestions.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mb: 1, 
                      color: '#555',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <LocalHospitalIcon fontSize="small" color="primary" />
                    Orientações:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {item.suggestions.slice(0, 5).map((suggestion, idx) => (
                      <Typography 
                        component="li" 
                        key={idx}
                        variant="body2"
                        sx={{ 
                          mb: 0.5,
                          color: '#333',
                          lineHeight: 1.6
                        }}
                      >
                        {suggestion}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              {/* Alimentos Recomendados */}
              {item.foods && item.foods.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mb: 1, 
                      color: '#555',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <RestaurantIcon fontSize="small" sx={{ color: '#ff9800' }} />
                    Alimentos:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {item.foods.map((food, idx) => (
                      <Chip 
                        key={idx}
                        label={food}
                        size="small"
                        sx={{ 
                          backgroundColor: '#fff3e0',
                          color: '#e65100',
                          fontWeight: 500
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Suplementos - Table Format */}
              {item.supplements && item.supplements.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mb: 1, 
                      color: '#555',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <MedicationIcon fontSize="small" sx={{ color: '#4caf50' }} />
                    💊 Suplementos Nutricionais:
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#e8f5e9' }}>
                          <TableCell sx={{ fontWeight: 600 }}>Suplemento</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Dosagem & Posologia</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {item.supplements.map((supp, idx) => {
                          // Parse supplement details
                          const parts = supp.split(' | ');
                          const name = parts[0] || supp;
                          const dosage = parts[1] || '';
                          const posology = parts[2] || '';
                          
                          return (
                            <TableRow key={idx}>
                              <TableCell sx={{ verticalAlign: 'top', fontWeight: 500 }}>
                                {name.replace(/ - Dose:.*/, '')}
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.85rem', color: '#555' }}>
                                {dosage && <div><strong>Dose:</strong> {dosage.replace('Dose:', '').trim()}</div>}
                                {posology && <div><strong>Como tomar:</strong> {posology.replace('Posologia:', '').trim()}</div>}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {/* Fitoterápicos - Table Format */}
              {item.herbs && item.herbs.length > 0 && (
                <Box>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mb: 1, 
                      color: '#555',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <SpaIcon fontSize="small" sx={{ color: '#9c27b0' }} />
                    🌿 Fitoterápicos:
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f3e5f5' }}>
                          <TableCell sx={{ fontWeight: 600 }}>Planta Medicinal</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Dosagem & Posologia</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {item.herbs.map((herb, idx) => {
                          // Parse herb details
                          const parts = herb.split(' | ');
                          const name = parts[0] || herb;
                          const dosage = parts[1] || '';
                          const posology = parts[2] || '';
                          
                          return (
                            <TableRow key={idx}>
                              <TableCell sx={{ verticalAlign: 'top', fontWeight: 500 }}>
                                {name.replace(/ - Dose:.*/, '')}
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.85rem', color: '#555' }}>
                                {dosage && <div><strong>Dose:</strong> {dosage.replace('Dose:', '').trim()}</div>}
                                {posology && <div><strong>Como usar:</strong> {posology.replace('Posologia:', '').trim()}</div>}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Aviso Importante */}
      <Paper 
        sx={{ 
          mt: 3, 
          p: 2, 
          background: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)',
          border: '2px solid #fbc02d'
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#f57f17',
            fontWeight: 600,
            mb: 0.5
          }}
        >
          ⚠️ Observações Importantes:
        </Typography>
        <Typography variant="caption" sx={{ color: '#f57f17', display: 'block', lineHeight: 1.6 }}>
          • As dosagens mencionadas são referências gerais e devem ser individualizadas.<br/>
          • Sempre considere interações medicamentosas e condições de saúde específicas.<br/>
          • Suplementos e fitoterápicos devem ser recomendados após avaliação completa.<br/>
          • Em casos graves ou persistentes, encaminhar para especialista.
        </Typography>
      </Paper>
    </Box>
  );
}
