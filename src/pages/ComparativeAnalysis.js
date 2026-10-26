import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl } from '../components/PrintTemplate';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Divider,
  Chip,
  Card,
  CardContent,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  ExpandMore as ExpandMoreIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { THERAPEUTIC_DATABASE } from '../config/therapeuticDatabase';
import ADVANCED_PROTOCOLS from '../config/advancedProtocols';
import PrescriptionHeader from '../components/PrescriptionHeader';

export default function ComparativeAnalysis() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anamnese, setAnamnese] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const found = anamneses.find(a => a.id === parseInt(id));
    setAnamnese(found);

    if (found) {
      performAnalysis(found);
    }
  }, [id]);

  const performAnalysis = (data) => {
    const complaints = [];
    const findings = [];
    const recommendations = [];

    // Análise de Queixas Principais
    if (data.queixaPrincipal) {
      complaints.push({
        type: 'Queixa Principal',
        description: data.queixaPrincipal,
        severity: 'high'
      });
    }

    // Análise de Sintomas
    const symptoms = [
      { key: 'dor', label: 'Dor' },
      { key: 'febre', label: 'Febre' },
      { key: 'tosse', label: 'Tosse' },
      { key: 'cansaco', label: 'Cansaço' },
      { key: 'faltaAr', label: 'Falta de Ar' },
      { key: 'narizEntupido', label: 'Nariz Entupido' },
      { key: 'dorGarganta', label: 'Dor de Garganta' },
      { key: 'nausea', label: 'Náusea' },
      { key: 'vomito', label: 'Vômito' },
      { key: 'diarreia', label: 'Diarreia' },
      { key: 'intestinoPreso', label: 'Intestino Preso' },
    ];

    symptoms.forEach(symptom => {
      if (data[symptom.key]) {
        complaints.push({
          type: 'Sintoma',
          description: symptom.label,
          severity: 'medium',
          key: symptom.key
        });
      }
    });

    // Análise de Exames
    if (data.exames) {
      const exameKeys = Object.keys(data.exames);
      exameKeys.forEach(key => {
        const exame = data.exames[key];
        if (exame && exame.data) {
          findings.push({
            type: 'Exame',
            name: formatExamName(key),
            date: exame.data,
            result: exame.resultado || 'Resultado não especificado',
            observations: exame.observacoes
          });
        }
      });
    }

    // Análise de Hábitos de Vida
    const lifestyleFactors = [];
    if (data.tabagismo === 'sim') lifestyleFactors.push('Tabagismo');
    if (data.etilismo === 'sim') lifestyleFactors.push('Etilismo');
    if (data.atividadeFisica === 'sedentario') lifestyleFactors.push('Sedentarismo');
    if (data.alimentacao === 'inadequada') lifestyleFactors.push('Alimentação Inadequada');

    // Análise de Medicamentos
    const medications = data.medicamentosUso ? data.medicamentosUso.split(',').map(m => m.trim()) : [];

    // Gerar Recomendações baseadas na análise
    recommendations.push(...generateRecommendations(complaints, findings, lifestyleFactors, data));

    setAnalysis({
      complaints,
      findings,
      lifestyleFactors,
      medications,
      recommendations
    });
  };

  const formatExamName = (key) => {
    const names = {
      hemograma: 'Hemograma Completo',
      glicemia: 'Glicemia',
      colesterol: 'Perfil Lipídico',
      tireoide: 'Função Tireoidiana',
      hepatico: 'Função Hepática',
      renal: 'Função Renal',
      urina: 'Exame de Urina',
      fezes: 'Exame de Fezes',
      raioX: 'Raio-X',
      ultrassom: 'Ultrassonografia',
      tomografia: 'Tomografia',
      ressonancia: 'Ressonância Magnética',
      endoscopia: 'Endoscopia',
      colonoscopia: 'Colonoscopia',
      ecocardiograma: 'Ecocardiograma',
      eletrocardiograma: 'Eletrocardiograma'
    };
    return names[key] || key;
  };

  const generateRecommendations = (complaints, findings, lifestyleFactors, data) => {
    const recs = [];

    // Protocolos baseados em sintomas específicos
    complaints.forEach(complaint => {
      if (complaint.key === 'intestinoPreso' && THERAPEUTIC_DATABASE['intestino_preso']) {
        recs.push({
          category: 'Protocolo Digestivo',
          protocol: THERAPEUTIC_DATABASE['intestino_preso'],
          priority: 'high'
        });
      }
      if (complaint.key === 'cansaco') {
        recs.push({
          category: 'Protocolo Fadiga Adrenal',
          protocol: ADVANCED_PROTOCOLS.john_andrews.protocols.adrenal_support[0],
          priority: 'high'
        });
      }
    });

    // Protocolo Detox se houver fatores de risco
    if (lifestyleFactors.length > 0 || (data.medicamentosUso && data.medicamentosUso.length > 20)) {
      recs.push({
        category: 'Protocolo Detoxificação',
        protocol: ADVANCED_PROTOCOLS.idomar_santos.protocols.detoxification[0],
        priority: 'high'
      });
    }

    // Protocolo Digestivo 4R se houver problemas digestivos
    const digestiveIssues = ['diarreia', 'intestinoPreso', 'nausea', 'vomito'];
    const hasDigestiveIssue = complaints.some(c => digestiveIssues.includes(c.key));
    if (hasDigestiveIssue) {
      recs.push({
        category: 'Protocolo Restauração Digestiva 4R',
        protocol: ADVANCED_PROTOCOLS.idomar_santos.protocols.digestive_health[0],
        priority: 'high'
      });
    }

    // Protocolo Tireoidiano se houver exame de tireoide
    if (findings.some(f => f.name.includes('Tireoid'))) {
      recs.push({
        category: 'Protocolo Otimização Tireoidiana',
        protocol: ADVANCED_PROTOCOLS.john_andrews.protocols.thyroid_optimization[0],
        priority: 'medium'
      });
    }

    return recs;
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadPdf = async () => {
    const element = document.querySelector('.print-container');
    if (!element) return;
    try {
      const bodyHtml = element.innerHTML;
      const qr = `${window.location.origin}/anamnese/${anamnese.id}`;
      const qrUrl = await generateQrDataUrl(qr);
      const title = `resumo_comparativo_${anamnese.nome?.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}`;
      const html = await buildLetterheadHtml({ title, bodyHtml, qrUrl });
      await downloadPdfFromHtml(html, `${title}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      window.print();
    }
  };

  if (!anamnese || !analysis) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5">Carregando análise...</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }} className="print-container">
        {/* Header com botões de ação */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }} className="no-print">
          <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 700 }}>
            📊 Sugestões Terapêuticas
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={() => navigate('/dashboard')}
              startIcon={<ArrowBackIcon />}
            >
              Voltar
            </Button>
            <Button
              onClick={handlePrint}
              variant="outlined"
              startIcon={<PrintIcon />}
            >
              Imprimir
            </Button>
            <Button
              onClick={downloadPdf}
              variant="contained"
              sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
              startIcon={<DownloadIcon />}
            >
              Download PDF
            </Button>
          </Box>
        </Box>

        {/* Cabeçalho de Atendimento */}
        <PrescriptionHeader entry={anamnese} />

        {/* Análise de Queixas e Sintomas */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32', fontWeight: 600 }}>
              🔍 Análise de Queixas e Sintomas do Interagente
            </Typography>
            {analysis.complaints.length > 0 ? (
              <Box sx={{ mt: 2 }}>
                {analysis.complaints.map((complaint, index) => (
                  <Alert
                    key={index}
                    severity={complaint.severity === 'high' ? 'error' : 'warning'}
                    icon={<WarningIcon />}
                    sx={{ mb: 1 }}
                  >
                    <strong>{complaint.type}:</strong> {complaint.description}
                  </Alert>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary">Nenhuma queixa registrada</Typography>
            )}
          </CardContent>
        </Card>

        {/* Análise de Exames */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              🧪 Análise de Exames Realizados
            </Typography>
            {analysis.findings.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Exame</strong></TableCell>
                      <TableCell><strong>Data</strong></TableCell>
                      <TableCell><strong>Resultado</strong></TableCell>
                      <TableCell><strong>Observações</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {analysis.findings.map((finding, index) => (
                      <TableRow key={index}>
                        <TableCell>{finding.name}</TableCell>
                        <TableCell>{new Date(finding.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{finding.result}</TableCell>
                        <TableCell>{finding.observations || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography color="text.secondary">Nenhum exame registrado</Typography>
            )}
          </CardContent>
        </Card>

        {/* Fatores de Estilo de Vida */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              🏃 Fatores de Estilo de Vida
            </Typography>
            {analysis.lifestyleFactors.length > 0 ? (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                {analysis.lifestyleFactors.map((factor, index) => (
                  <Chip
                    key={index}
                    label={factor}
                    color="warning"
                    icon={<WarningIcon />}
                  />
                ))}
              </Box>
            ) : (
              <Alert severity="success" icon={<CheckCircleIcon />}>
                Nenhum fator de risco identificado no estilo de vida
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Medicamentos em Uso */}
        {analysis.medications.length > 0 && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                💊 Medicamentos em Uso
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                {analysis.medications.map((med, index) => (
                  <Chip key={index} label={med} color="info" />
                ))}
              </Box>
            </CardContent>
          </Card>
        )}

        <Divider sx={{ my: 4 }} />

        {/* Protocolos Terapêuticos Recomendados */}
        <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4, mb: 3 }}>
          🌿 Protocolos Terapêuticos Recomendados
        </Typography>

        {analysis.recommendations.length > 0 ? (
          analysis.recommendations.map((rec, index) => (
            <Accordion key={index} defaultExpanded={rec.priority === 'high'}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <Typography variant="h6">
                    {rec.category}
                  </Typography>
                  <Chip
                    label={rec.priority === 'high' ? 'Alta Prioridade' : 'Média Prioridade'}
                    color={rec.priority === 'high' ? 'error' : 'warning'}
                    size="small"
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  {/* Protocolo Detox Hepático-Linfático */}
                  {rec.protocol.name && (
                    <>
                      <Typography variant="h6" gutterBottom color="primary">
                        {rec.protocol.name}
                      </Typography>
                      {rec.protocol.description && (
                        <Typography paragraph color="text.secondary">
                          {rec.protocol.description}
                        </Typography>
                      )}
                      {rec.protocol.duration && (
                        <Alert severity="info" sx={{ mb: 2 }}>
                          <strong>Duração:</strong> {rec.protocol.duration}
                        </Alert>
                      )}

                      {/* Fases do Protocolo */}
                      {rec.protocol.phases && (
                        <>
                          {Object.keys(rec.protocol.phases).map((phaseKey) => {
                            const phase = rec.protocol.phases[phaseKey];
                            return (
                              <Card key={phaseKey} sx={{ mb: 2, bgcolor: '#fafafa' }}>
                                <CardContent>
                                  <Typography variant="h6" color="primary" gutterBottom>
                                    {phase.name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Duração: {phase.duration}
                                  </Typography>

                                  {phase.items && phase.items.length > 0 && (
                                    <Box sx={{ mt: 2 }}>
                                      {phase.items.map((item, idx) => (
                                        <Paper key={idx} sx={{ p: 2, mb: 2, bgcolor: 'white' }}>
                                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                            {item.item || item.name}
                                          </Typography>
                                          
                                          <Grid container spacing={2} sx={{ mt: 1 }}>
                                            {item.dose && (
                                              <Grid item xs={12} sm={6}>
                                                <Typography variant="body2">
                                                  <strong>Dose:</strong> {item.dose}
                                                </Typography>
                                              </Grid>
                                            )}
                                            {item.posology && (
                                              <Grid item xs={12}>
                                                <Typography variant="body2">
                                                  <strong>Posologia:</strong> {item.posology}
                                                </Typography>
                                              </Grid>
                                            )}
                                            {item.indication && (
                                              <Grid item xs={12}>
                                                <Typography variant="body2">
                                                  <strong>Indicação:</strong> {item.indication}
                                                </Typography>
                                              </Grid>
                                            )}
                                            {item.mechanism && (
                                              <Grid item xs={12}>
                                                <Typography variant="body2" color="text.secondary">
                                                  <strong>Mecanismo:</strong> {item.mechanism}
                                                </Typography>
                                              </Grid>
                                            )}
                                            {item.contraindication && (
                                              <Grid item xs={12}>
                                                <Alert severity="warning" sx={{ mt: 1 }}>
                                                  <strong>Contraindicação:</strong> {item.contraindication}
                                                </Alert>
                                              </Grid>
                                            )}
                                            {item.interactions && (
                                              <Grid item xs={12}>
                                                <Typography variant="body2" color="warning.main">
                                                  <strong>Interações:</strong> {item.interactions}
                                                </Typography>
                                              </Grid>
                                            )}
                                            {item.monitoring && (
                                              <Grid item xs={12}>
                                                <Typography variant="body2" color="info.main">
                                                  <strong>Monitoramento:</strong> {item.monitoring}
                                                </Typography>
                                              </Grid>
                                            )}
                                            {item.sources && (
                                              <Grid item xs={12}>
                                                <Typography variant="caption" color="text.secondary">
                                                  <strong>Fonte:</strong> {item.sources}
                                                </Typography>
                                              </Grid>
                                            )}
                                          </Grid>
                                        </Paper>
                                      ))}
                                    </Box>
                                  )}
                                </CardContent>
                              </Card>
                            );
                          })}
                        </>
                      )}

                      {/* Nutrientes (para protocolo tireoide/adrenal) */}
                      {rec.protocol.nutrients && (
                        <Box sx={{ mt: 3 }}>
                          <Typography variant="h6" color="primary" gutterBottom>
                            Suplementos Nutricionais
                          </Typography>
                          {rec.protocol.nutrients.map((nutrient, idx) => (
                            <Paper key={idx} sx={{ p: 2, mb: 2 }}>
                              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                {nutrient.item}
                              </Typography>
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                  <Typography variant="body2"><strong>Dose:</strong> {nutrient.dose}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography variant="body2"><strong>Posologia:</strong> {nutrient.posology}</Typography>
                                </Grid>
                                {nutrient.mechanism && (
                                  <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary">
                                      <strong>Mecanismo:</strong> {nutrient.mechanism}
                                    </Typography>
                                  </Grid>
                                )}
                                {nutrient.indication && (
                                  <Grid item xs={12}>
                                    <Typography variant="body2"><strong>Indicação:</strong> {nutrient.indication}</Typography>
                                  </Grid>
                                )}
                                {nutrient.contraindication && (
                                  <Grid item xs={12}>
                                    <Alert severity="warning"><strong>Contraindicação:</strong> {nutrient.contraindication}</Alert>
                                  </Grid>
                                )}
                                {nutrient.monitoring && (
                                  <Grid item xs={12}>
                                    <Typography variant="body2" color="info.main">
                                      <strong>Monitoramento:</strong> {nutrient.monitoring}
                                    </Typography>
                                  </Grid>
                                )}
                                {nutrient.sources && (
                                  <Grid item xs={12}>
                                    <Typography variant="caption" color="text.secondary">
                                      <strong>Fonte:</strong> {nutrient.sources}
                                    </Typography>
                                  </Grid>
                                )}
                              </Grid>
                            </Paper>
                          ))}
                        </Box>
                      )}

                      {/* Protocolo Alimentar */}
                      {rec.protocol.dietary_protocol && (
                        <Card sx={{ mt: 2, bgcolor: '#e8f5e9' }}>
                          <CardContent>
                            <Typography variant="h6" color="primary" gutterBottom>
                              🥗 Protocolo Alimentar
                            </Typography>
                            <Grid container spacing={2}>
                              {rec.protocol.dietary_protocol.eliminate && (
                                <Grid item xs={12} md={6}>
                                  <Typography variant="subtitle2" color="error" gutterBottom>
                                    ❌ ELIMINAR:
                                  </Typography>
                                  <ul>
                                    {rec.protocol.dietary_protocol.eliminate.map((item, idx) => (
                                      <li key={idx}><Typography variant="body2">{item}</Typography></li>
                                    ))}
                                  </ul>
                                </Grid>
                              )}
                              {rec.protocol.dietary_protocol.include && (
                                <Grid item xs={12} md={6}>
                                  <Typography variant="subtitle2" color="success.main" gutterBottom>
                                    ✅ INCLUIR:
                                  </Typography>
                                  <ul>
                                    {rec.protocol.dietary_protocol.include.map((item, idx) => (
                                      <li key={idx}><Typography variant="body2">{item}</Typography></li>
                                    ))}
                                  </ul>
                                </Grid>
                              )}
                            </Grid>
                          </CardContent>
                        </Card>
                      )}

                      {/* Lifestyle */}
                      {rec.protocol.lifestyle && (
                        <Card sx={{ mt: 2 }}>
                          <CardContent>
                            <Typography variant="h6" color="primary" gutterBottom>
                              🏃 Recomendações de Estilo de Vida
                            </Typography>
                            <ul>
                              {rec.protocol.lifestyle.map((item, idx) => (
                                <li key={idx}><Typography variant="body2">{item}</Typography></li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}

                      {/* Contraindicações Gerais */}
                      {rec.protocol.contraindications && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            <strong>⚠️ CONTRAINDICAÇÕES GERAIS DO PROTOCOLO:</strong>
                          </Typography>
                          <ul style={{ margin: 0, paddingLeft: 20 }}>
                            {rec.protocol.contraindications.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </Alert>
                      )}

                      {/* Monitoramento */}
                      {rec.protocol.monitoring && (
                        <Alert severity="info" sx={{ mt: 2 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            <strong>🔬 EXAMES DE MONITORAMENTO:</strong>
                          </Typography>
                          <ul style={{ margin: 0, paddingLeft: 20 }}>
                            {rec.protocol.monitoring.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </Alert>
                      )}
                    </>
                  )}

                  {/* Protocolo Simples (do THERAPEUTIC_DATABASE) */}
                  {rec.protocol.suggestions && (
                    <>
                      <Typography variant="h6" gutterBottom>
                        {rec.protocol.title}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>Sugestões Gerais:</Typography>
                        <ul>
                          {rec.protocol.suggestions.map((suggestion, idx) => (
                            <li key={idx}><Typography variant="body2">{suggestion}</Typography></li>
                          ))}
                        </ul>
                      </Box>

                      {rec.protocol.supplements && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="primary" gutterBottom>
                            💊 Suplementos:
                          </Typography>
                          {rec.protocol.supplements.map((supp, idx) => {
                            const parts = supp.split('|');
                            return (
                              <Paper key={idx} sx={{ p: 2, mb: 1 }}>
                                <Typography variant="body2">{parts[0]}</Typography>
                                {parts.length > 1 && (
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    {parts.slice(1).join(' | ')}
                                  </Typography>
                                )}
                              </Paper>
                            );
                          })}
                        </Box>
                      )}

                      {rec.protocol.herbs && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="success.main" gutterBottom>
                            🌿 Fitoterapia:
                          </Typography>
                          {rec.protocol.herbs.map((herb, idx) => (
                            <Paper key={idx} sx={{ p: 2, mb: 1 }}>
                              <Typography variant="body2">{herb}</Typography>
                            </Paper>
                          ))}
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Alert severity="info" icon={<InfoIcon />}>
            Nenhum protocolo específico recomendado. Consulte um profissional de saúde para avaliação personalizada.
          </Alert>
        )}

        {/* Observações Finais */}
        <Card sx={{ 
          mt: 4, 
          background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
          border: '2px solid #ffb74d',
          '@media print': {
            WebkitPrintColorAdjust: 'exact',
            printColorAdjust: 'exact'
          }
        }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#e65100', fontWeight: 600 }} gutterBottom>
              ⚠️ Observações Importantes
            </Typography>
            <ul style={{ marginLeft: 20 }}>
              <li>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Este documento contém sugestões terapêuticas baseadas em análise integrativa dos dados fornecidos pelo interagente.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  As orientações são fundamentadas em literatura científica e protocolos de terapias integrativas reconhecidas.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  As sugestões devem ser avaliadas e adaptadas considerando as particularidades de cada interagente.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  As contraindicações e possíveis interações devem ser cuidadosamente observadas antes da implementação.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  O acompanhamento contínuo e monitoramento são essenciais para avaliar a eficácia e ajustar as orientações quando necessário.
                </Typography>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Rodapé para impressão */}
        <Box sx={{ 
          mt: 4, 
          pt: 2, 
          borderTop: '2px solid #81c784',
          textAlign: 'center',
          display: 'none',
          '@media print': {
            display: 'block'
          }
        }}>
          <Typography variant="caption" sx={{ color: '#2e7d32', fontWeight: 600 }}>
            Wander Pires Silva Coelho - Terapeuta Integrativo Funcional
          </Typography>
          <br />
          <Typography variant="caption" sx={{ color: '#558b2f' }}>
            CRTH-BR 17821 | (89) 9 8139-8723 | wanderpsc@gmail.com
          </Typography>
          <br />
          <Typography variant="caption" sx={{ color: '#33691e', fontStyle: 'italic', fontSize: '0.7rem' }}>
            "Cuidando da saúde de forma natural e integrativa"
          </Typography>
        </Box>
      </Paper>

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </Container>
  );
}
