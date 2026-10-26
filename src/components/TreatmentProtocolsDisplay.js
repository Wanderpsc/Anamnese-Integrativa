import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SpaIcon from '@mui/icons-material/Spa';
import ScienceIcon from '@mui/icons-material/Science';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PROTOCOLOS_POR_CONDICAO } from '../data/protocolosPorCondicao';
import { FLORAIS_FONTE_APOSTILAS, getFloraisPorCondicao } from '../data/floraisPorCondicao';
import { saveProtocol, removeProtocol, isProtocolSaved, getCurrentPatientId } from '../lib/savedProtocols';

/**
 * Componente que exibe protocolos de tratamento detalhados
 * para cada condição/sintoma marcado no questionário
 */
export default function TreatmentProtocolsDisplay({ selectedConditions, source = 'questionário', patientId: patientIdProp }) {
  const [savedKeys, setSavedKeys] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, msg: '' });

  const resolvePatientId = useCallback(() => patientIdProp || getCurrentPatientId(), [patientIdProp]);

  // Carregar estado inicial de protocolos salvos
  useEffect(() => {
    const patientId = resolvePatientId();
    if (!patientId || !selectedConditions) return;
    const initial = {};
    selectedConditions.forEach(c => {
      initial[c] = isProtocolSaved(patientId, c);
    });
    setSavedKeys(initial);
  }, [selectedConditions, resolvePatientId]);

  const handleSave = useCallback((condicao, protocolo) => {
    const patientId = resolvePatientId();
    if (!patientId) {
      setSnackbar({ open: true, msg: 'Nenhum interagente em atendimento. Selecione um paciente primeiro.' });
      return;
    }
    if (savedKeys[condicao]) {
      removeProtocol(patientId, condicao);
      setSavedKeys(prev => ({ ...prev, [condicao]: false }));
      setSnackbar({ open: true, msg: `Protocolo "${protocolo.nome}" removido.` });
    } else {
      saveProtocol(patientId, {
        conditionKey: condicao,
        conditionNome: protocolo.nome,
        source,
        fitoterapia: protocolo.fitoterapia || [],
        suplementacao: protocolo.suplementacao || [],
        homeopatia: protocolo.homeopatia || [],
        aromaterapia: protocolo.aromaterapia || [],
        orientacoesGerais: protocolo.orientacoesGerais || [],
      });
      setSavedKeys(prev => ({ ...prev, [condicao]: true }));
      setSnackbar({ open: true, msg: `Protocolo "${protocolo.nome}" salvo com sucesso!` });
    }
  }, [savedKeys, source, resolvePatientId]);

  if (!selectedConditions || selectedConditions.length === 0) {
    return null;
  }

  console.log('TreatmentProtocolsDisplay - Condições selecionadas:', selectedConditions);

  const getProtocolo = (condicao) => {
    const protocolo = PROTOCOLOS_POR_CONDICAO[condicao];
    console.log(`Protocolo para "${condicao}":`, protocolo);
    return protocolo;
  };

  const normalizeFlorais = (florais) => {
    if (!Array.isArray(florais)) return [];

    return florais.map((item) => {
      if (typeof item === 'string') {
        return {
          essencia: item,
          objetivo: 'Suporte floral complementar ao protocolo terapêutico principal.',
          posologia: '4 gotas sublinguais, 4x/dia, com reavaliação clínica periódica.',
        };
      }

      return {
        essencia: item.essencia || item.floral || item.nome || 'Floral complementar',
        objetivo: item.objetivo || item.indicacao || item.observacoes || 'Suporte emocional e energético integrativo.',
        posologia: item.posologia || '4 gotas sublinguais, 4x/dia, com reavaliação clínica periódica.',
      };
    });
  };

  return (
    <Box sx={{ mt: 4, mb: 4 }} className="treatment-protocols-section">
      <Paper sx={{ p: 3, bgcolor: '#f5f5f5', boxShadow: 3 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 3, 
            fontWeight: 700, 
            color: '#1976d2',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <LocalHospitalIcon fontSize="large" />
          Protocolos de Tratamento Integrativo
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 3, color: '#666' }}>
          Baseado nas condições selecionadas, seguem os protocolos terapêuticos detalhados:
        </Typography>

        {selectedConditions.map((condicao, index) => {
          const protocolo = getProtocolo(condicao);
          const florais = normalizeFlorais(protocolo?.florais || getFloraisPorCondicao(condicao));
          
          if (!protocolo) return null;

          return (
            <Box 
              key={index} 
              sx={{ 
                mb: 4, 
                pageBreakInside: 'avoid',
                border: '2px solid #1976d2',
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              {/* Cabeçalho do Protocolo */}
              <Box sx={{ 
                bgcolor: '#1976d2', 
                color: 'white', 
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {index + 1}. {protocolo.nome}
                </Typography>
              </Box>

              <Box sx={{ p: 3, bgcolor: 'white' }}>
                {/* Causas/Etiologia */}
                {protocolo.causas && protocolo.causas.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#d32f2f', mb: 1 }}>
                      🔍 Possíveis Causas:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {protocolo.causas.map((causa, idx) => (
                        <Chip 
                          key={idx} 
                          label={causa} 
                          size="small"
                          sx={{ bgcolor: '#ffebee' }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {/* FITOTERAPIA */}
                {protocolo.fitoterapia && protocolo.fitoterapia.length > 0 && (
                  <Accordion defaultExpanded sx={{ mb: 2, boxShadow: 2 }}>
                    <AccordionSummary 
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ bgcolor: '#e8f5e9', '&:hover': { bgcolor: '#c8e6c9' } }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SpaIcon sx={{ color: '#2e7d32' }} />
                        <Typography sx={{ fontWeight: 600, color: '#2e7d32' }}>
                          FITOTERAPIA
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600 }}>Fitoterápico</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Dosagem</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Posologia</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Duração</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Observações</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {protocolo.fitoterapia.map((fito, idx) => (
                              <TableRow key={idx}>
                                <TableCell sx={{ fontWeight: 500 }}>{fito.nome}</TableCell>
                                <TableCell>{fito.dosagem}</TableCell>
                                <TableCell>{fito.posologia}</TableCell>
                                <TableCell>{fito.duracao}</TableCell>
                                <TableCell sx={{ fontSize: '0.85rem' }}>{fito.observacoes}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                )}

                {/* SUPLEMENTAÇÃO NUTRICIONAL */}
                {protocolo.suplementacao && protocolo.suplementacao.length > 0 && (
                  <Accordion defaultExpanded sx={{ mb: 2, boxShadow: 2 }}>
                    <AccordionSummary 
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ bgcolor: '#fff3e0', '&:hover': { bgcolor: '#ffe0b2' } }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ScienceIcon sx={{ color: '#e65100' }} />
                        <Typography sx={{ fontWeight: 600, color: '#e65100' }}>
                          SUPLEMENTAÇÃO NUTRICIONAL
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600 }}>Nutriente/Suplemento</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Dosagem</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Posologia</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Duração</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Benefício</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {protocolo.suplementacao.map((sup, idx) => (
                              <TableRow key={idx}>
                                <TableCell sx={{ fontWeight: 500 }}>{sup.nutriente}</TableCell>
                                <TableCell>{sup.dosagem}</TableCell>
                                <TableCell>{sup.posologia}</TableCell>
                                <TableCell>{sup.duracao}</TableCell>
                                <TableCell sx={{ fontSize: '0.85rem' }}>{sup.beneficio}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                )}

                {/* HOMEOPATIA */}
                {protocolo.homeopatia && protocolo.homeopatia.length > 0 && (
                  <Accordion sx={{ mb: 2, boxShadow: 2 }}>
                    <AccordionSummary 
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ bgcolor: '#f3e5f5', '&:hover': { bgcolor: '#e1bee7' } }}
                    >
                      <Typography sx={{ fontWeight: 600, color: '#7b1fa2' }}>
                        💊 HOMEOPATIA
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600 }}>Medicamento</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Indicação</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Posologia</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {protocolo.homeopatia.map((homeo, idx) => (
                              <TableRow key={idx}>
                                <TableCell sx={{ fontWeight: 500 }}>{homeo.medicamento}</TableCell>
                                <TableCell>{homeo.indicacao}</TableCell>
                                <TableCell>{homeo.posologia}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                )}

                {/* AROMATERAPIA */}
                {protocolo.aromaterapia && protocolo.aromaterapia.length > 0 && (
                  <Accordion sx={{ mb: 2, boxShadow: 2 }}>
                    <AccordionSummary 
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ bgcolor: '#e0f2f1', '&:hover': { bgcolor: '#b2dfdb' } }}
                    >
                      <Typography sx={{ fontWeight: 600, color: '#00695c' }}>
                        🌿 AROMATERAPIA
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        {protocolo.aromaterapia.map((aroma, idx) => (
                          <Grid item xs={12} key={idx}>
                            <Paper sx={{ p: 2, bgcolor: '#e0f2f1' }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#00695c' }}>
                                {aroma.oleo}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Uso:</strong> {aroma.uso}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Diluição:</strong> {aroma.diluicao}
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                )}

                {/* FLORAIS */}
                {florais.length > 0 && (
                  <Accordion defaultExpanded sx={{ mb: 2, boxShadow: 2 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ bgcolor: '#fce4ec', '&:hover': { bgcolor: '#f8bbd0' } }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalFloristIcon sx={{ color: '#ad1457' }} />
                        <Typography sx={{ fontWeight: 600, color: '#ad1457' }}>
                          FLORAIS TERAPÊUTICOS
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600 }}>Essência Floral</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Objetivo Terapêutico</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Posologia</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {florais.map((floralItem, idx) => (
                              <TableRow key={idx}>
                                <TableCell sx={{ fontWeight: 500 }}>{floralItem.essencia}</TableCell>
                                <TableCell>{floralItem.objetivo}</TableCell>
                                <TableCell>{floralItem.posologia}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <Typography variant="caption" sx={{ mt: 1.5, display: 'block', color: '#6a1b9a' }}>
                        Fonte terapêutica: {FLORAIS_FONTE_APOSTILAS}
                      </Typography>
                      <Typography variant="caption" sx={{ mt: 0.5, display: 'block', color: '#6a1b9a' }}>
                        Uso complementar integrativo. Individualizar conforme avaliação profissional.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                )}

                {/* ORIENTAÇÕES GERAIS */}
                {protocolo.orientacoesGerais && protocolo.orientacoesGerais.length > 0 && (
                  <Box sx={{ mt: 3, p: 2, bgcolor: '#e3f2fd', borderRadius: 1, border: '1px solid #1976d2' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#0d47a1', mb: 2 }}>
                      📋 Orientações Gerais e Mudanças de Estilo de Vida:
                    </Typography>
                    <Grid container spacing={1}>
                      {protocolo.orientacoesGerais.map((orientacao, idx) => (
                        <Grid item xs={12} sm={6} key={idx}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 600 }}>
                              •
                            </Typography>
                            <Typography variant="body2">
                              {orientacao}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* BOTÃO SALVAR */}
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant={savedKeys[condicao] ? 'contained' : 'outlined'}
                    color={savedKeys[condicao] ? 'success' : 'primary'}
                    size="small"
                    startIcon={savedKeys[condicao] ? <CheckCircleIcon /> : <SaveIcon />}
                    onClick={() => handleSave(condicao, protocolo)}
                    sx={{ fontWeight: 600 }}
                  >
                    {savedKeys[condicao] ? 'Salvo ✓ (clique para remover)' : 'Salvar Protocolo'}
                  </Button>
                </Box>
              </Box>

              <Divider />
            </Box>
          );
        })}

        {/* Aviso Importante */}
        <Paper sx={{ p: 2, bgcolor: '#fff3e0', border: '2px solid #ff9800', mt: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#e65100', mb: 1 }}>
            ⚠️ IMPORTANTE:
          </Typography>
          <Typography variant="body2" sx={{ color: '#555' }}>
            • Estes protocolos são sugestões baseadas em evidências científicas e práticas integrativas.<br/>
            • A individualização é fundamental - ajustar conforme resposta do paciente.<br/>
            • Sempre considerar interações medicamentosas e contraindicações.<br/>
            • Exames complementares podem ser necessários para diagnóstico preciso.<br/>
            • Acompanhamento profissional é essencial durante todo o tratamento.
          </Typography>
        </Paper>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar(s => ({ ...s, open: false }))}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
