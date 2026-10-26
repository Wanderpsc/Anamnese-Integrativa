import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Divider,
  Badge,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Healing as HealingIcon,
  LocalPharmacy as PharmacyIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
  SINTOMAS_DEFICIENCIAS,
  DOSAGENS_SUPLEMENTACAO,
  CATEGORIAS_SINTOMAS
} from '../data/symptomsVitaminsDatabase';
import { usePatientIntegration } from '../hooks/usePatientIntegration';
import PrescriptionHeader from '../components/PrescriptionHeader';
import PrescriptionFooter from '../components/PrescriptionFooter';
import PrescriptionActions from '../components/PrescriptionActions';
import SaveToPatientBar from '../components/SaveToPatientBar';

export default function VitaminDeficiencyAnalyzer() {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const { patientData, saveToPatient, goToDashboard } = usePatientIntegration('vitaminDeficiencyAnalyzer');
  const [sintomasSelecionados, setSintomasSelecionados] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState('Pele, Cabelos e Unhas');

  // Carregar dados salvos do paciente
  useEffect(() => {
    if (patientData && patientData.vitaminDeficiencyAnalyzer) {
      const saved = patientData.vitaminDeficiencyAnalyzer;
      if (saved.sintomasSelecionados) {
        setSintomasSelecionados(saved.sintomasSelecionados);
      }
    }
  }, [patientData]);

  // Calcular deficiências baseadas nos sintomas selecionados
  const analiseDeficiencias = useMemo(() => {
    if (sintomasSelecionados.length === 0) return null;

    // Contar quantas vezes cada deficiência aparece
    const contagemDeficiencias = {};
    const severidadeMaxima = {};

    sintomasSelecionados.forEach(sintoma => {
      const dados = SINTOMAS_DEFICIENCIAS[sintoma];
      if (dados) {
        dados.deficiencias.forEach(deficiencia => {
          contagemDeficiencias[deficiencia] = (contagemDeficiencias[deficiencia] || 0) + 1;
          
          // Manter a severidade máxima
          const severidades = { leve: 1, moderada: 2, alta: 3 };
          const novaSeveridade = severidades[dados.severidade] || 1;
          const atualSeveridade = severidades[severidadeMaxima[deficiencia]] || 0;
          
          if (novaSeveridade > atualSeveridade) {
            severidadeMaxima[deficiencia] = dados.severidade;
          }
        });
      }
    });

    // Ordenar por frequência (mais sintomas = mais provável)
    const deficienciasOrdenadas = Object.entries(contagemDeficiencias)
      .map(([deficiencia, contagem]) => ({
        nome: deficiencia,
        contagem,
        severidade: severidadeMaxima[deficiencia],
        probabilidade: Math.min((contagem / sintomasSelecionados.length) * 100, 100),
        dosagem: DOSAGENS_SUPLEMENTACAO[deficiencia]
      }))
      .sort((a, b) => b.contagem - a.contagem);

    return {
      deficiencias: deficienciasOrdenadas,
      totalSintomas: sintomasSelecionados.length
    };
  }, [sintomasSelecionados]);

  // Salvar análise automaticamente quando mudar
  useEffect(() => {
    if (sintomasSelecionados.length > 0 && analiseDeficiencias) {
      saveToPatient({
        sintomasSelecionados,
        analiseDeficiencias,
        updatedAt: new Date().toISOString()
      });
    }
  }, [sintomasSelecionados, analiseDeficiencias, saveToPatient]);

  const toggleSintoma = (sintoma) => {
    setSintomasSelecionados(prev => 
      prev.includes(sintoma)
        ? prev.filter(s => s !== sintoma)
        : [...prev, sintoma]
    );
  };

  const limparSelecao = () => {
    setSintomasSelecionados([]);
  };

  const getSeveridadeColor = (severidade) => {
    switch (severidade) {
      case 'alta': return '#d32f2f';
      case 'moderada': return '#ff9800';
      case 'leve': return '#ffc107';
      default: return '#757575';
    }
  };

  const getProbabilidadeColor = (prob) => {
    if (prob >= 70) return '#d32f2f';
    if (prob >= 50) return '#ff9800';
    if (prob >= 30) return '#ffc107';
    return '#4caf50';
  };

  return (
    <Container maxWidth="xl">
      {/* Botões de ação no topo */}
      <Box sx={{ mb: 3 }}>
        <PrescriptionActions
          patientData={patientData}
          contentRef={contentRef}
          contentTitle="Analise_Deficiencias_Vitaminicas"
          onBack={goToDashboard}
        />
      </Box>

      {/* Área de impressão */}
      <Paper sx={{ p: 4, mt: 3 }} id="prescription-print-area" ref={contentRef}>
        {/* Cabeçalho do Receituário (apenas para impressão) */}
        <Box className="print-only">
          <PrescriptionHeader entry={patientData} />
        </Box>

        {/* Cabeçalho */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <HealingIcon sx={{ fontSize: 48, color: '#4caf50' }} />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                Análise de Deficiências por Sintomas
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Selecione seus sintomas e descubra possíveis deficiências de vitaminas e minerais
              </Typography>
            </Box>
          </Box>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Como usar:</strong> Clique nos sintomas que você apresenta. O sistema identificará automaticamente
              as possíveis deficiências de vitaminas e minerais, com dosagens recomendadas para suplementação.
            </Typography>
          </Alert>

          {/* Resumo da seleção */}
          {sintomasSelecionados.length > 0 && (
            <Card sx={{ mb: 3, bgcolor: '#e8f5e9', border: '2px solid #4caf50' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                      {sintomasSelecionados.length} sintomas selecionados
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {analiseDeficiencias?.deficiencias.length || 0} possíveis deficiências identificadas
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={limparSelecao}
                  >
                    Limpar Seleção
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>

        <Grid container spacing={3}>
          {/* Coluna Esquerda: Sintomas */}
          <Grid item xs={12} lg={6}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
              📋 Selecione seus Sintomas
            </Typography>

            {Object.entries(CATEGORIAS_SINTOMAS).map(([categoria, sintomas]) => (
              <Accordion
                key={categoria}
                expanded={expandedCategory === categoria}
                onChange={() => setExpandedCategory(expandedCategory === categoria ? null : categoria)}
                sx={{ mb: 1 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ bgcolor: '#f5f5f5' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, flex: 1 }}>
                      {categoria}
                    </Typography>
                    <Badge
                      badgeContent={sintomas.filter(s => sintomasSelecionados.includes(s)).length}
                      color="success"
                    >
                      <Box sx={{ width: 24 }} />
                    </Badge>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {sintomas.map(sintoma => {
                      const selecionado = sintomasSelecionados.includes(sintoma);
                      const dados = SINTOMAS_DEFICIENCIAS[sintoma];
                      
                      return (
                        <Chip
                          key={sintoma}
                          label={sintoma}
                          onClick={() => toggleSintoma(sintoma)}
                          color={selecionado ? 'success' : 'default'}
                          icon={selecionado ? <CheckCircleIcon /> : undefined}
                          sx={{
                            cursor: 'pointer',
                            borderColor: selecionado ? undefined : getSeveridadeColor(dados?.severidade),
                            borderWidth: selecionado ? undefined : 2,
                            '&:hover': {
                              transform: 'scale(1.05)',
                              boxShadow: 2
                            }
                          }}
                          variant={selecionado ? 'filled' : 'outlined'}
                        />
                      );
                    })}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>

          {/* Coluna Direita: Análise de Deficiências */}
          <Grid item xs={12} lg={6}>
            {analiseDeficiencias ? (
              <>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#d32f2f' }}>
                  🔬 Possíveis Deficiências Detectadas
                </Typography>

                {analiseDeficiencias.deficiencias.map((def, idx) => (
                  <Card 
                    key={idx}
                    sx={{ 
                      mb: 2, 
                      border: `3px solid ${getProbabilidadeColor(def.probabilidade)}`,
                      bgcolor: idx < 3 ? '#fff3e0' : '#ffffff'
                    }}
                  >
                    <CardContent>
                      {/* Cabeçalho da Deficiência */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <PharmacyIcon sx={{ fontSize: 32, color: getProbabilidadeColor(def.probabilidade) }} />
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                              {def.nome}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Relacionada a {def.contagem} de {analiseDeficiencias.totalSintomas} sintomas
                            </Typography>
                          </Box>
                        </Box>
                        <Chip
                          label={`${def.probabilidade.toFixed(0)}%`}
                          sx={{
                            bgcolor: getProbabilidadeColor(def.probabilidade),
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1rem'
                          }}
                        />
                      </Box>

                      <Divider sx={{ mb: 2 }} />

                      {/* Dosagens */}
                      {def.dosagem ? (
                        <Box>
                          {/* Fase de Reposição */}
                          <Card sx={{ mb: 2, bgcolor: '#ffebee' }}>
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#d32f2f', mb: 1 }}>
                                💊 FASE DE REPOSIÇÃO (Deficiência):
                              </Typography>
                              <List dense>
                                <ListItem>
                                  <ListItemText
                                    primary="Dose"
                                    secondary={def.dosagem.deficiencia.dose}
                                    primaryTypographyProps={{ fontWeight: 600 }}
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemText
                                    primary="Duração"
                                    secondary={def.dosagem.deficiencia.duracao}
                                    primaryTypographyProps={{ fontWeight: 600 }}
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemText
                                    primary="Forma"
                                    secondary={def.dosagem.deficiencia.forma}
                                    primaryTypographyProps={{ fontWeight: 600 }}
                                  />
                                </ListItem>
                                {def.dosagem.deficiencia.observacao && (
                                  <ListItem>
                                    <Alert severity="warning" sx={{ width: '100%' }}>
                                      <Typography variant="body2">
                                        <strong>⚠️ Atenção:</strong> {def.dosagem.deficiencia.observacao}
                                      </Typography>
                                    </Alert>
                                  </ListItem>
                                )}
                              </List>
                            </CardContent>
                          </Card>

                          {/* Fase de Manutenção */}
                          <Card sx={{ bgcolor: '#e8f5e9' }}>
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2e7d32', mb: 1 }}>
                                ✅ FASE DE MANUTENÇÃO (Após reposição):
                              </Typography>
                              <List dense>
                                <ListItem>
                                  <ListItemText
                                    primary="Dose"
                                    secondary={def.dosagem.manutencao.dose}
                                    primaryTypographyProps={{ fontWeight: 600 }}
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemText
                                    primary="Forma"
                                    secondary={def.dosagem.manutencao.forma}
                                    primaryTypographyProps={{ fontWeight: 600 }}
                                  />
                                </ListItem>
                              </List>
                            </CardContent>
                          </Card>
                        </Box>
                      ) : (
                        <Alert severity="info">
                          <Typography variant="body2">
                            Dosagem não disponível no banco de dados. Consulte um profissional de saúde.
                          </Typography>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {/* Resumo Final */}
                <Card sx={{ mt: 3, bgcolor: '#e3f2fd', border: '2px solid #2196f3' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <InfoIcon sx={{ color: '#1976d2' }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
                        Resumo da Análise
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      • <strong>{analiseDeficiencias.totalSintomas}</strong> sintomas selecionados
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      • <strong>{analiseDeficiencias.deficiencias.length}</strong> possíveis deficiências identificadas
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      • Deficiências mais prováveis (≥50%): <strong>
                        {analiseDeficiencias.deficiencias.filter(d => d.probabilidade >= 50).length}
                      </strong>
                    </Typography>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <HealingIcon sx={{ fontSize: 80, color: '#bdbdbd', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Selecione sintomas para ver as possíveis deficiências
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Quanto mais sintomas você selecionar, mais precisa será a análise
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>

        {/* Rodapé com avisos */}
        <Box sx={{ mt: 4 }}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>⚠️ IMPORTANTE:</strong> Esta ferramenta é apenas informativa e não substitui consulta médica ou exames laboratoriais.
              As deficiências sugeridas são baseadas em correlações clínicas conhecidas, mas apenas exames de sangue podem confirmar deficiências reais.
            </Typography>
          </Alert>

          <Alert severity="info">
            <Typography variant="body2">
              <strong>💡 DICA:</strong> Para confirmar deficiências, solicite ao seu médico: Hemograma completo, Ferritina, Vitamina D (25-OH),
              Vitamina B12, Ácido fólico, Zinco sérico, Magnésio, e outros conforme sintomas.
            </Typography>
          </Alert>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }} className="no-print">
            <Button
              variant="outlined"
              onClick={goToDashboard}
            >
              Voltar ao Dashboard
            </Button>
            <Button
              variant="contained"
              onClick={() => window.print()}
              disabled={!patientData}
            >
              Imprimir Análise
            </Button>
          </Box>
        </Box>

        {/* Rodapé do Receituário (apenas para impressão) */}
        <Box className="print-only">
          <PrescriptionFooter />
        </Box>
      </Paper>
      
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
        moduleKey="vitaminDeficiencyAnalyzer"
        getData={() => sintomasSelecionados.length > 0 && analiseDeficiencias
          ? { sintomasSelecionados, analiseDeficiencias, savedAt: new Date().toISOString() }
          : null}
        label="Salvar análise de deficiências vitamínicas no interagente"
      />
    </Container>
  );
}
