import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

/**
 * Componente para exibir resultados de biorressonância extraídos do PDF
 */
export default function BioresonanceResults({ parsedResults, categorizedResults, patientName }) {
  if (!parsedResults) {
    return null;
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal':
        return <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 20 }} />;
      case 'baixo':
      case 'alto':
        return <WarningIcon sx={{ color: '#ff9800', fontSize: 20 }} />;
      default:
        return <ErrorIcon sx={{ color: '#f44336', fontSize: 20 }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'success';
      case 'baixo':
      case 'alto':
        return 'warning';
      default:
        return 'error';
    }
  };

  const normalCount = parsedResults.parameters.filter(p => p.status === 'normal').length;
  const abnormalCount = parsedResults.parameters.length - normalCount;

  return (
    <Box sx={{ mt: 3, width: '100%' }}>
      {/* Cabeçalho com informações gerais */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: '#f3e5f5', borderLeft: '4px solid #9c27b0' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#9c27b0', fontWeight: 600 }}>
          📊 Análise de Biorressonância
        </Typography>
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Tipo de Exame
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {parsedResults.testType}
              </Typography>
            </Box>
          </Grid>
          
          {parsedResults.testDate && (
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Data do Exame
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {parsedResults.testDate}
                </Typography>
              </Box>
            </Grid>
          )}
          
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Parâmetros Analisados
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {parsedResults.parameters.length} parâmetro(s)
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                <Chip 
                  label={`${normalCount} Normal`} 
                  size="small" 
                  color="success" 
                  variant="outlined"
                />
                {abnormalCount > 0 && (
                  <Chip 
                    label={`${abnormalCount} Alterado${abnormalCount > 1 ? 's' : ''}`} 
                    size="small" 
                    color="warning" 
                    variant="outlined"
                  />
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Lista de Parâmetros em Cards Expansíveis */}
      {parsedResults.parameters.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1976d2' }}>
            📋 Resultados Detalhados ({parsedResults.parameters.length} parâmetros)
          </Typography>
          
          {parsedResults.parameters.map((param, index) => (
            <Accordion 
              key={index}
              sx={{ 
                mb: 2,
                border: param.status !== 'normal' ? '2px solid #ff9800' : '1px solid #e0e0e0',
                '&:before': { display: 'none' },
                boxShadow: param.status !== 'normal' ? 3 : 1
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ 
                  bgcolor: param.status !== 'normal' ? '#fff8e1' : '#fafafa',
                  '&:hover': { bgcolor: param.status !== 'normal' ? '#fff3cd' : '#f5f5f5' }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  {getStatusIcon(param.status)}
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {param.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 0.5, flexWrap: 'wrap' }}>
                      <Chip 
                        label={`Status: ${param.status.toUpperCase()}`} 
                        size="small" 
                        color={getStatusColor(param.status)}
                        sx={{ fontWeight: 600 }}
                      />
                      <Chip 
                        label={`Valor: ${param.value}`} 
                        size="small" 
                        variant="outlined"
                      />
                      <Chip 
                        label={`Ref: ${param.reference}`} 
                        size="small" 
                        variant="outlined"
                        color="default"
                      />
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>
              
              <AccordionDetails sx={{ p: 3, bgcolor: 'white' }}>
                <Grid container spacing={3}>
                  {/* Coluna 1: Resultados e Causas */}
                  <Grid item xs={12} md={6}>
                    {/* Resultado do Exame */}
                    <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: '#e3f2fd', border: '1px solid #90caf9' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1565c0', mb: 1 }}>
                        📊 Resultado do Exame
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Valor Encontrado:</strong> {param.value}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Referência:</strong> {param.reference}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Status:</strong> <Chip label={param.status} size="small" color={getStatusColor(param.status)} />
                      </Typography>
                    </Paper>

                    {/* Possíveis Causas */}
                    {param.guideInfo?.causas && param.guideInfo.causas.length > 0 && (
                      <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: '#fce4ec', border: '1px solid #f06292' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#c2185b', mb: 1 }}>
                          🔍 Possíveis Causas
                        </Typography>
                        {param.guideInfo.causas.map((causa, idx) => (
                          <Typography key={idx} variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                            • {causa}
                          </Typography>
                        ))}
                      </Paper>
                    )}

                    {/* Observações */}
                    {param.guideInfo?.observacoes && param.guideInfo.observacoes.length > 0 && (
                      <Paper elevation={0} sx={{ p: 2, bgcolor: '#f3e5f5', border: '1px solid #ce93d8' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#7b1fa2', mb: 1 }}>
                          📝 Observações Clínicas
                        </Typography>
                        {param.guideInfo.observacoes.map((obs, idx) => (
                          <Typography key={idx} variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                            • {obs}
                          </Typography>
                        ))}
                      </Paper>
                    )}
                  </Grid>

                  {/* Coluna 2: Tratamentos */}
                  <Grid item xs={12} md={6}>
                    {/* Fitoterápicos e Nutracêuticos */}
                    {param.guideInfo?.indicacoes && param.guideInfo.indicacoes.length > 0 && (
                      <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: '#e8f5e9', border: '1px solid #81c784' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2e7d32', mb: 1 }}>
                          🌿 Fitoterápicos / Nutracêuticos
                        </Typography>
                        {param.guideInfo.indicacoes.map((ind, idx) => (
                          <Typography key={idx} variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                            • {ind}
                          </Typography>
                        ))}
                      </Paper>
                    )}

                    {/* Posologia */}
                    {param.guideInfo?.posologia && param.guideInfo.posologia.length > 0 && (
                      <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: '#fff8e1', border: '1px solid #ffd54f' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f57f17', mb: 1 }}>
                          📋 Posologia
                        </Typography>
                        {param.guideInfo.posologia.map((pos, idx) => (
                          <Typography key={idx} variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                            • {pos}
                          </Typography>
                        ))}
                      </Paper>
                    )}

                    {/* Dosagem */}
                    {param.guideInfo?.dosagem && param.guideInfo.dosagem.length > 0 && (
                      <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: '#fff3e0', border: '1px solid #ffb74d' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#e65100', mb: 1 }}>
                          💉 Dosagens Recomendadas
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {param.guideInfo.dosagem.map((dose, idx) => (
                            <Chip
                              key={idx}
                              label={dose}
                              size="small"
                              color="warning"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Paper>
                    )}

                    {/* Frequenciais Quânticos */}
                    {param.guideInfo?.frequenciais && param.guideInfo.frequenciais.length > 0 && (
                      <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: '#e1f5fe', border: '1px solid #4fc3f7' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#01579b', mb: 1 }}>
                          ⚛️ Frequenciais Quânticos
                        </Typography>
                        {param.guideInfo.frequenciais.map((freq, idx) => (
                          <Typography key={idx} variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                            • {freq}
                          </Typography>
                        ))}
                      </Paper>
                    )}

                    {/* Interações Medicamentosas */}
                    {param.guideInfo?.interacoes && param.guideInfo.interacoes.length > 0 && (
                      <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: '#fff9c4', border: '1px solid #fbc02d' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f57f17', mb: 1 }}>
                          ⚠️ Interações Medicamentosas
                        </Typography>
                        {param.guideInfo.interacoes.map((inter, idx) => (
                          <Typography key={idx} variant="body2" sx={{ mb: 0.5, pl: 2, color: '#e65100' }}>
                            • {inter}
                          </Typography>
                        ))}
                      </Paper>
                    )}

                    {/* Contraindicações */}
                    {param.guideInfo?.contraindicacoes && param.guideInfo.contraindicacoes.length > 0 && (
                      <Paper elevation={0} sx={{ p: 2, bgcolor: '#ffebee', border: '1px solid #ef5350' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#c62828', mb: 1 }}>
                          🚫 Contraindicações
                        </Typography>
                        {param.guideInfo.contraindicacoes.map((contra, idx) => (
                          <Typography key={idx} variant="body2" sx={{ mb: 0.5, pl: 2, color: '#b71c1c' }}>
                            • {contra}
                          </Typography>
                        ))}
                      </Paper>
                    )}
                  </Grid>
                </Grid>

                {/* Mensagem se não houver informações do guia */}
                {!param.guideInfo && (
                  <Alert severity="info">
                    Informações detalhadas não disponíveis no Guia de Biorressonância para este parâmetro.
                  </Alert>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      {/* Parâmetros Categorizados por Sistema */}
      {categorizedResults && Object.keys(categorizedResults).length > 0 && (
        <Paper elevation={2} sx={{ mb: 3 }}>
          <Box sx={{ p: 2, bgcolor: '#e8f5e9', borderBottom: '1px solid #81c784' }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#2e7d32' }}>
              🏥 Parâmetros por Sistema Corporal
            </Typography>
          </Box>
          
          <Box sx={{ p: 2 }}>
            {Object.entries(categorizedResults).map(([system, params]) => (
              <Accordion key={system} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography variant="subtitle2" fontWeight={600} sx={{ textTransform: 'capitalize' }}>
                      {system}
                    </Typography>
                    <Chip 
                      label={`${params.length} parâmetro${params.length > 1 ? 's' : ''}`} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                    {params.some(p => p.status !== 'normal') && (
                      <Chip 
                        label={`${params.filter(p => p.status !== 'normal').length} alterado${params.filter(p => p.status !== 'normal').length > 1 ? 's' : ''}`}
                        size="small" 
                        color="warning"
                      />
                    )}
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Table size="small">
                    <TableBody>
                      {params.map((param, index) => (
                        <TableRow key={index}>
                          <TableCell width={40}>{getStatusIcon(param.status)}</TableCell>
                          <TableCell>{param.name}</TableCell>
                          <TableCell align="center" width={100}>
                            <strong>{param.value}</strong>
                          </TableCell>
                          <TableCell align="center" width={150} sx={{ color: 'text.secondary' }}>
                            Ref: {param.reference}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Paper>
      )}

      {/* Problemas Detectados */}
      {parsedResults.detectedIssues.length > 0 && (
        <Paper elevation={2} sx={{ mb: 3 }}>
          <Box sx={{ p: 2, bgcolor: '#fff3e0', borderBottom: '1px solid #ffb74d' }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#e65100' }}>
              ⚠️ Principais Achados e Alterações
            </Typography>
          </Box>
          
          <Box sx={{ p: 2 }}>
            {parsedResults.detectedIssues.map((issue, index) => (
              <Alert 
                key={index} 
                severity="warning" 
                sx={{ mb: 1 }}
                icon={<WarningIcon />}
              >
                {issue}
              </Alert>
            ))}
          </Box>
        </Paper>
      )}

      {/* Recomendações */}
      {parsedResults.recommendations.length > 0 && (
        <Paper elevation={2} sx={{ mb: 3 }}>
          <Box sx={{ p: 2, bgcolor: '#e1f5fe', borderBottom: '1px solid #4fc3f7' }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#01579b' }}>
              💡 Recomendações e Orientações
            </Typography>
          </Box>
          
          <Box sx={{ p: 2 }}>
            {parsedResults.recommendations.map((rec, index) => (
              <Alert 
                key={index} 
                severity="info" 
                sx={{ mb: 1 }}
              >
                {rec}
              </Alert>
            ))}
          </Box>
        </Paper>
      )}

      {/* Nota de Rodapé */}
      <Paper elevation={1} sx={{ p: 2, bgcolor: '#fafafa' }}>
        <Typography variant="caption" color="text.secondary">
          <strong>Nota:</strong> Estes resultados foram extraídos automaticamente do arquivo PDF enviado. 
          Para interpretação completa e conduta terapêutica, consulte sempre um profissional de saúde qualificado.
          Os valores de referência podem variar de acordo com o laboratório e a metodologia utilizada.
        </Typography>
      </Paper>
    </Box>
  );
}
