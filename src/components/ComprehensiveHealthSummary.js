import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/**
 * Componente que exibe um resumo organizado das informações coletadas
 * no Questionário Abrangente de Saúde
 */
export default function ComprehensiveHealthSummary({ healthData }) {
  if (!healthData) {
    return null;
  }

  const hasSomeData = () => {
    return (
      (healthData.doencasFamiliares && healthData.doencasFamiliares.length > 0) ||
      (healthData.doencasCronicas && healthData.doencasCronicas.length > 0) ||
      (healthData.medicamentosUso && healthData.medicamentosUso.length > 0) ||
      healthData.tabagismo ||
      healthData.etilismo ||
      healthData.atividadeFisica ||
      healthData.qualidadeAlimentacao ||
      healthData.horasSono ||
      healthData.funcionamentoIntestinal
    );
  };

  if (!hasSomeData()) {
    return null;
  }

  return (
    <Box sx={{ mt: 4, mb: 3 }}>
      <Paper sx={{ 
        p: 3, 
        bgcolor: '#e8f5e9', 
        border: '2px solid #4caf50',
        borderRadius: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <CheckCircleIcon sx={{ color: '#2e7d32', fontSize: 32 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#2e7d32' }}>
            Resumo das Informações Coletadas
          </Typography>
        </Box>
        
        <Typography variant="body2" sx={{ mb: 3, color: '#555', fontStyle: 'italic' }}>
          Suas respostas estão sendo salvas automaticamente e serão enviadas para análise e geração do plano terapêutico.
        </Typography>

        <Divider sx={{ mb: 3, borderColor: '#4caf50' }} />

        <Grid container spacing={2}>
          {/* Histórico Familiar */}
          {healthData.doencasFamiliares && healthData.doencasFamiliares.length > 0 && (
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#7b1fa2', mb: 1 }}>
                  👨‍👩‍👧‍👦 Histórico Familiar:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {healthData.doencasFamiliares.map((doenca, idx) => (
                    <Chip 
                      key={idx} 
                      label={doenca} 
                      size="small"
                      sx={{ bgcolor: '#f3e5f5', fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          )}

          {/* Doenças Crônicas */}
          {healthData.doencasCronicas && healthData.doencasCronicas.length > 0 && (
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#e65100', mb: 1 }}>
                  🏥 Doenças Crônicas:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {healthData.doencasCronicas.map((doenca, idx) => (
                    <Chip 
                      key={idx} 
                      label={doenca} 
                      size="small"
                      sx={{ bgcolor: '#fff3e0', fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          )}

          {/* Medicamentos em Uso */}
          {healthData.medicamentosUso && healthData.medicamentosUso.length > 0 && (
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
                  💊 Medicamentos em Uso:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {healthData.medicamentosUso.map((med, idx) => (
                    <Chip 
                      key={idx} 
                      label={med} 
                      size="small"
                      sx={{ bgcolor: '#e3f2fd', fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          )}

          {/* Alergias */}
          {healthData.alergias && healthData.alergias.length > 0 && (
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#c62828', mb: 1 }}>
                  ⚠️ Alergias:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {healthData.alergias.map((alergia, idx) => (
                    <Chip 
                      key={idx} 
                      label={alergia} 
                      size="small"
                      sx={{ bgcolor: '#ffebee', fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          )}

          {/* Hábitos de Vida */}
          {(healthData.tabagismo || healthData.etilismo || healthData.atividadeFisica) && (
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#00695c', mb: 1 }}>
                  🏃 Hábitos de Vida:
                </Typography>
                {healthData.tabagismo && healthData.tabagismo !== 'Nunca fumei' && (
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    • Tabagismo: <strong>{healthData.tabagismo}</strong>
                  </Typography>
                )}
                {healthData.etilismo && healthData.etilismo !== 'Não consumo' && (
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    • Álcool: <strong>{healthData.etilismo}</strong>
                  </Typography>
                )}
                {healthData.atividadeFisica && (
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    • Atividade Física: <strong>{healthData.atividadeFisica}</strong>
                  </Typography>
                )}
              </Box>
            </Grid>
          )}

          {/* Alimentação */}
          {(healthData.qualidadeAlimentacao || healthData.consumoAgua) && (
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#f57f17', mb: 1 }}>
                  🍎 Alimentação:
                </Typography>
                {healthData.qualidadeAlimentacao && (
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    • Qualidade: <strong>{healthData.qualidadeAlimentacao}</strong>
                  </Typography>
                )}
                {healthData.consumoAgua && (
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    • Água: <strong>{healthData.consumoAgua}</strong>
                  </Typography>
                )}
                {healthData.restricoesAlimentares && healthData.restricoesAlimentares.length > 0 && (
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    • Restrições: <strong>{healthData.restricoesAlimentares.join(', ')}</strong>
                  </Typography>
                )}
              </Box>
            </Grid>
          )}

          {/* Sono */}
          {(healthData.horasSono || healthData.qualidadeSono) && (
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#283593', mb: 1 }}>
                  😴 Sono:
                </Typography>
                {healthData.horasSono && (
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    • Horas: <strong>{healthData.horasSono}</strong>
                  </Typography>
                )}
                {healthData.qualidadeSono && (
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    • Qualidade: <strong>{healthData.qualidadeSono}</strong>
                  </Typography>
                )}
              </Box>
            </Grid>
          )}

          {/* Sistema Digestório */}
          {(healthData.funcionamentoIntestinal || healthData.gases || healthData.azia) && (
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#880e4f', mb: 1 }}>
                  🫁 Sistema Digestório:
                </Typography>
                {healthData.funcionamentoIntestinal && (
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    • Intestino: <strong>{healthData.funcionamentoIntestinal}</strong>
                  </Typography>
                )}
                {healthData.gases && healthData.gases !== 'Nunca' && (
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    • Gases: <strong>{healthData.gases}</strong>
                  </Typography>
                )}
                {healthData.azia && healthData.azia !== 'Nunca' && (
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    • Azia: <strong>{healthData.azia}</strong>
                  </Typography>
                )}
              </Box>
            </Grid>
          )}

          {/* Sintomas Gerais */}
          {(healthData.nivelEnergia || healthData.nivelEstresse || healthData.nivelAnsiedade) && (
            <Grid item xs={12}>
              <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1565c0', mb: 1 }}>
                  📊 Sintomas Gerais:
                </Typography>
                <Grid container spacing={2}>
                  {healthData.nivelEnergia && (
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                        Energia: <strong>{healthData.nivelEnergia}</strong>
                      </Typography>
                    </Grid>
                  )}
                  {healthData.nivelEstresse && (
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                        Estresse: <strong>{healthData.nivelEstresse}</strong>
                      </Typography>
                    </Grid>
                  )}
                  {healthData.nivelAnsiedade && (
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                        Ansiedade: <strong>{healthData.nivelAnsiedade}</strong>
                      </Typography>
                    </Grid>
                  )}
                  {healthData.humor && (
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                        Humor: <strong>{healthData.humor}</strong>
                      </Typography>
                    </Grid>
                  )}
                  {healthData.dores && healthData.dores.length > 0 && !healthData.dores.includes('Sem dores') && (
                    <Grid item xs={12}>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                        Dores: <strong>{healthData.dores.filter(d => d !== 'Sem dores').join(', ')}</strong>
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Grid>
          )}
        </Grid>

        <Box sx={{ mt: 3, p: 2, bgcolor: '#fff9c4', borderRadius: 1, border: '1px solid #fbc02d' }}>
          <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#555' }}>
            ✅ <strong>Próximo passo:</strong> Estas informações serão processadas para gerar protocolos terapêuticos personalizados,
            que aparecerão na página de <strong>Sugestões Terapêuticas</strong>.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
