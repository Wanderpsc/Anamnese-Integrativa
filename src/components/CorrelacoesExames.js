/**
 * Componente para exibir correlações funcionais e diagnósticos previstos
 * baseados em combinações de resultados de exames laboratoriais
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Collapse,
  Alert,
  AlertTitle,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  LocalHospital as LocalHospitalIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Link as LinkIcon,
  ExpandMore as ExpandMoreIcon,
  LocalFlorist as LocalFloristIcon,
  Restaurant as RestaurantIcon,
  FitnessCenter as FitnessCenterIcon,
  Biotech as ScienceIcon
} from '@mui/icons-material';
import { getCondutaTerapeutica } from '../data/condutasTerapeuticas';
import { buscarCorrelacoes } from '../data/examesAtualizadosPDF';

const CorrelacoesExames = ({ exames }) => {
  const [mostrarCorrelacoes, setMostrarCorrelacoes] = useState(false);
  const [correlacoes, setCorrelacoes] = useState([]);
  const [diagnosticosPrevistos, setDiagnosticosPrevistos] = useState([]);

  useEffect(() => {
    // Filtrar apenas exames com resultados preenchidos
    const examesPreenchidos = exames.filter(e => e.resultadoPaciente && e.resultadoPaciente.trim() !== '');
    
    if (examesPreenchidos.length >= 2) {
      // Buscar correlações entre os exames preenchidos
      const correlacoesEncontradas = buscarCorrelacoes(examesPreenchidos);
      setCorrelacoes(correlacoesEncontradas);
      
      // Gerar diagnósticos previstos
      const diagnosticos = gerarDiagnosticosPrevistos(examesPreenchidos);
      setDiagnosticosPrevistos(diagnosticos);
    } else {
      setCorrelacoes([]);
      setDiagnosticosPrevistos([]);
    }
  }, [exames]);

  const gerarDiagnosticosPrevistos = (examesPreenchidos) => {
    const diagnosticos = [];
    
    // Análise de padrões específicos baseados no PDF
    
    // 1. ANEMIA - múltiplos tipos
    const hemacias = examesPreenchidos.find(e => e.exame.toLowerCase().includes('hemácia'));
    const hemoglobina = examesPreenchidos.find(e => e.exame.toLowerCase().includes('hemoglobina') && !e.exame.toLowerCase().includes('glicada'));
    const vcm = examesPreenchidos.find(e => e.exame.toLowerCase() === 'vcm');
    const ferritina = examesPreenchidos.find(e => e.exame.toLowerCase().includes('ferritina'));
    const b12 = examesPreenchidos.find(e => e.exame.toLowerCase().includes('b12') || e.exame.toLowerCase().includes('vitamina b12'));
    
    if (hemoglobina && hemoglobina.interpretacao && hemoglobina.interpretacao.includes('BAIXO')) {
      if (vcm && vcm.interpretacao && vcm.interpretacao.includes('BAIXO')) {
        diagnosticos.push({
          condicao: 'Anemia Microcítica (possivelmente Ferropriva)',
          gravidade: 'moderada',
          evidencias: ['Hemoglobina baixa', 'VCM reduzido'],
          investigar: [
            'Dosagem de ferro sérico e saturação de transferrina',
            'Ferritina sérica',
            'Pesquisa de sangramento oculto nas fezes',
            'Endoscopia digestiva alta se necessário'
          ],
          conduta: [
            'Suplementação de ferro quelato: 30-60mg de ferro elementar/dia',
            'Vitamina C: 500mg junto com ferro para melhor absorção',
            'Dieta rica em ferro heme (carnes vermelhas magras, fígado)',
            'Evitar café, chá e leite próximo às refeições'
          ]
        });
      }
      
      if (vcm && vcm.interpretacao && vcm.interpretacao.includes('ALTO')) {
        diagnosticos.push({
          condicao: 'Anemia Megaloblástica (deficiência B12/Folato)',
          gravidade: 'moderada',
          evidencias: ['Hemoglobina baixa', 'VCM aumentado'],
          investigar: [
            'Dosagem de vitamina B12',
            'Dosagem de ácido fólico',
            'Homocisteína',
            'Ácido metilmalônico',
            'Endoscopia para gastrite atrófica/H. pylori'
          ],
          conduta: [
            'Vitamina B12 (metilcobalamina): 1000-2000mcg/dia sublingual',
            'Ácido fólico (5-MTHF): 400-1000mcg/dia',
            'Investigar e tratar causa base (má absorção, gastrite)',
            'Reavaliar em 60-90 dias'
          ]
        });
      }
      
      if (ferritina && ferritina.interpretacao && ferritina.interpretacao.includes('NORMAL') || 
          ferritina && ferritina.interpretacao && ferritina.interpretacao.includes('ALTO')) {
        diagnosticos.push({
          condicao: 'Anemia por Doença Crônica / Inflamação',
          gravidade: 'moderada',
          evidencias: ['Hemoglobina baixa', 'Ferritina normal ou elevada'],
          investigar: [
            'PCR ultrassensível',
            'VHS',
            'Proteínas de fase aguda',
            'Doenças autoimunes',
            'Infecções crônicas',
            'Neoplasias'
          ],
          conduta: [
            'Tratar doença de base',
            'Anti-inflamatórios naturais: curcumina, ômega-3, resveratrol',
            'Vitamina D: otimizar níveis (50-80 ng/mL)',
            'Evitar suplementação de ferro isolada'
          ]
        });
      }
    }
    
    // 2. RESISTÊNCIA INSULÍNICA / PRÉ-DIABETES
    const glicemia = examesPreenchidos.find(e => e.exame.toLowerCase().includes('glicemia') && e.exame.toLowerCase().includes('jejum'));
    const insulina = examesPreenchidos.find(e => e.exame.toLowerCase().includes('insulina'));
    const hba1c = examesPreenchidos.find(e => e.exame.toLowerCase().includes('glicada') || e.exame.toLowerCase().includes('hba1c'));
    
    if (glicemia && insulina) {
      const glicVal = parseFloat(glicemia.resultadoPaciente);
      const insVal = parseFloat(insulina.resultadoPaciente);
      
      if (!isNaN(glicVal) && !isNaN(insVal) && glicVal > 0 && insVal > 0) {
        const homaIR = (glicVal * insVal) / 405;
        
        if (homaIR >= 2.5) {
          diagnosticos.push({
            condicao: 'Resistência Insulínica',
            gravidade: homaIR >= 4.0 ? 'alta' : 'moderada',
            evidencias: [`HOMA-IR = ${homaIR.toFixed(2)} (ideal <2.5)`],
            investigar: [
              'Hemoglobina glicada (HbA1c)',
              'Perfil lipídico completo',
              'Circunferência abdominal',
              'Pressão arterial',
              'Ácido úrico',
              'Enzimas hepáticas (TGO, TGP, GGT)'
            ],
            conduta: [
              'Dieta baixo índice glicêmico (low carb)',
              'Exercício físico: 150min/semana (aeróbico + resistido)',
              'Berberina: 500mg 3x/dia ou Metformina 500-850mg/dia',
              'Cromo picolinato: 200-400mcg/dia',
              'Magnésio: 400-600mg/dia',
              'Ômega-3: 2-3g/dia',
              'Inositol: 2-4g/dia',
              'Perda de peso: meta 5-10% do peso corporal'
            ]
          });
        }
      }
    }
    
    if (hba1c && hba1c.interpretacao && (hba1c.interpretacao.includes('ALTO') || hba1c.interpretacao.includes('ACIMA'))) {
      const hba1cVal = parseFloat(hba1c.resultadoPaciente);
      
      if (hba1cVal >= 5.7 && hba1cVal < 6.5) {
        diagnosticos.push({
          condicao: 'Pré-Diabetes',
          gravidade: 'moderada',
          evidencias: [`HbA1c = ${hba1cVal}% (5.7-6.4%)`],
          investigar: [
            'Glicemia de jejum',
            'Teste oral de tolerância à glicose (TOTG)',
            'Insulina de jejum',
            'Peptídeo C',
            'Perfil lipídico'
          ],
          conduta: [
            'Intervenção intensiva no estilo de vida',
            'Dieta mediterrânea ou low carb',
            'Exercícios: 30min/dia, 5x/semana',
            'Canela de Ceilão: 1-3g/dia',
            'Berberina: 500mg 3x/dia',
            'Ácido alfa-lipóico: 600mg/dia',
            'Redução de peso: 5-7%'
          ]
        });
      } else if (hba1cVal >= 6.5) {
        diagnosticos.push({
          condicao: 'Diabetes Mellitus tipo 2',
          gravidade: 'alta',
          evidencias: [`HbA1c = ${hba1cVal}% (≥6.5%)`],
          investigar: [
            'Glicemia de jejum (confirmatória)',
            'Perfil lipídico completo',
            'Creatinina e TFG (função renal)',
            'Microalbuminúria',
            'Fundo de olho (retinopatia)',
            'Exame dos pés (neuropatia)'
          ],
          conduta: [
            '🚨 ENCAMINHAR para endocrinologista',
            'Metformina: iniciar conforme prescrição médica',
            'Monitorização glicêmica domiciliar',
            'Educação em diabetes',
            'Controle rigoroso de carboidratos',
            'Suplementação adjuvante: berberina, cromo, magnésio, ômega-3'
          ]
        });
      }
    }
    
    // 3. HIPOTIREOIDISMO
    const tsh = examesPreenchidos.find(e => e.exame.toLowerCase() === 'tsh');
    const t4livre = examesPreenchidos.find(e => e.exame.toLowerCase().includes('t4 livre'));
    const t3livre = examesPreenchidos.find(e => e.exame.toLowerCase().includes('t3 livre'));
    
    if (tsh && tsh.interpretacao && tsh.interpretacao.includes('ALTO')) {
      if (t4livre && t4livre.interpretacao && t4livre.interpretacao.includes('BAIXO')) {
        diagnosticos.push({
          condicao: 'Hipotireoidismo Primário',
          gravidade: 'moderada',
          evidencias: ['TSH elevado', 'T4 livre reduzido'],
          investigar: [
            'Anti-TPO (anticorpo anti-peroxidase)',
            'Anti-Tg (anticorpo anti-tireoglobulina)',
            'Ultrassom de tireoide',
            'Ferritina (deficiência pode piorar hipotireoidismo)',
            'Vitamina D',
            'Selênio'
          ],
          conduta: [
            'Levotiroxina: conforme prescrição médica (geralmente 1.6mcg/kg/dia)',
            'Tomar em jejum, 30-60min antes do café',
            'Selênio: 200mcg/dia (melhora conversão T4→T3)',
            'Zinco: 30mg/dia',
            'Evitar: soja, glúten (se sensibilidade), brassicas cruas em excesso',
            'Reavaliar TSH e T4L em 6-8 semanas'
          ]
        });
      } else if (!t4livre || t4livre.interpretacao && t4livre.interpretacao.includes('NORMAL')) {
        diagnosticos.push({
          condicao: 'Hipotireoidismo Subclínico',
          gravidade: 'leve',
          evidencias: ['TSH elevado', 'T4 livre normal'],
          investigar: [
            'Repetir TSH em 3 meses',
            'Anti-TPO e Anti-Tg',
            'T3 livre',
            'Ultrassom de tireoide',
            'Sintomas clínicos'
          ],
          conduta: [
            'Selênio: 200mcg/dia',
            'Zinco: 30mg/dia',
            'Vitamina D: otimizar (50-70 ng/mL)',
            'Iodo (se deficiência confirmada): 150-300mcg/dia',
            'Dieta anti-inflamatória',
            'Considerar tratamento se TSH >10 ou sintomas importantes'
          ]
        });
      }
    }
    
    if (t3livre && t3livre.interpretacao && t3livre.interpretacao.includes('BAIXO') &&
        t4livre && t4livre.interpretacao && t4livre.interpretacao.includes('NORMAL')) {
      diagnosticos.push({
        condicao: 'Hipotireoidismo Periférico / Má Conversão T4→T3',
        gravidade: 'moderada',
        evidencias: ['T4 livre normal', 'T3 livre reduzido'],
        investigar: [
          'T3 reverso (rT3)',
          'Cortisol',
          'Ferritina',
          'Zinco',
          'Selênio',
          'Estado inflamatório (PCR)',
          'Função hepática'
        ],
        conduta: [
          'Selênio: 200mcg/dia (essencial para deiodinase)',
          'Zinco: 30-50mg/dia',
          'Ferro (se deficiente): otimizar ferritina >70 ng/mL',
          'Reduzir estresse: adaptógenos (ashwagandha, rhodiola)',
          'Anti-inflamatórios: curcumina, ômega-3',
          'Suporte hepático: colina, NAC, cardo-mariano',
          'Considerar T3 + T4 combinados (prescrição médica)'
        ]
      });
    }
    
    // 4. INFLAMAÇÃO CRÔNICA
    const leucocitos = examesPreenchidos.find(e => e.exame.toLowerCase().includes('leucócito') && !e.exame.toLowerCase().includes('absoluto'));
    const neutrofilos = examesPreenchidos.find(e => e.exame.toLowerCase().includes('neutróf') && e.exame.toLowerCase().includes('%'));
    const linfocitos = examesPreenchidos.find(e => e.exame.toLowerCase().includes('linfócito') && e.exame.toLowerCase().includes('%'));
    
    if (neutrofilos && linfocitos) {
      const neutVal = parseFloat(neutrofilos.resultadoPaciente);
      const linfVal = parseFloat(linfocitos.resultadoPaciente);
      
      if (!isNaN(neutVal) && !isNaN(linfVal) && linfVal > 0) {
        const nlr = neutVal / linfVal;
        
        if (nlr >= 3.0) {
          diagnosticos.push({
            condicao: 'Inflamação Crônica de Baixo Grau',
            gravidade: nlr >= 5.0 ? 'alta' : 'moderada',
            evidencias: [`Relação Neutrófilos/Linfócitos = ${nlr.toFixed(2)} (ideal <2.0)`],
            investigar: [
              'PCR ultrassensível',
              'VHS',
              'Ferritina',
              'Perfil lipídico',
              'Glicemia e HbA1c',
              'Homocisteína',
              'Vitamina D',
              'Ômega-3 index'
            ],
            conduta: [
              'Dieta anti-inflamatória (mediterrânea)',
              'Ômega-3 (EPA+DHA): 2-4g/dia',
              'Curcumina (biodisponível): 1-2g/dia',
              'Resveratrol: 250-500mg/dia',
              'Vitamina D3: otimizar (50-70 ng/mL)',
              'Probióticos multi-cepas: 50-100 bilhões UFC/dia',
              'Eliminar: açúcar, trans fat, processados',
              'Exercício regular: antiinflamatório natural'
            ]
          });
        }
      }
    }
    
    // 5. DISBIOSE INTESTINAL
    const monocitos = examesPreenchidos.find(e => e.exame.toLowerCase().includes('monócito') && e.exame.toLowerCase().includes('%'));
    const eosinofilos = examesPreenchidos.find(e => e.exame.toLowerCase().includes('eosinóf') && e.exame.toLowerCase().includes('%'));
    const basofilos = examesPreenchidos.find(e => e.exame.toLowerCase().includes('basóf') && e.exame.toLowerCase().includes('%'));
    
    if (monocitos && eosinofilos && basofilos) {
      const monVal = parseFloat(monocitos.resultadoPaciente) || 0;
      const eosVal = parseFloat(eosinofilos.resultadoPaciente) || 0;
      const basVal = parseFloat(basofilos.resultadoPaciente) || 0;
      
      const indiceMEB = monVal + eosVal + basVal;
      
      if (indiceMEB > 9) {
        diagnosticos.push({
          condicao: 'Disbiose Intestinal Moderada a Severa',
          gravidade: indiceMEB > 12 ? 'alta' : 'moderada',
          evidencias: [`Índice MEB = ${indiceMEB.toFixed(1)}% (ideal <9%)`],
          investigar: [
            'Calprotectina fecal',
            'Parasitológico de fezes (3 amostras)',
            'Teste de intolerâncias alimentares (IgG)',
            'Zonulina sérica (permeabilidade intestinal)',
            'SIBO (breath test)',
            'Colonoscopia (se sintomas graves)'
          ],
          conduta: [
            'PROTOCOLO 5R:',
            '1. REMOVER: alergênicos, processados, açúcar, glúten, lácteos (teste 30 dias)',
            '2. REPOR: enzimas digestivas, HCl betaína (se hipocloridria)',
            '3. REINOCULAR: probióticos de amplo espectro 50-100bi UFC/dia',
            '4. REPARAR: L-glutamina 5g 2x/dia, zinco-carnosina, quercetina',
            '5. REEQUILIBRAR: gerenciar estresse, sono adequado',
            'Saccharomyces boulardii: 250-500mg 2x/dia',
            'Berberina ou alho (natural) se SIBO/sobrecarga bacteriana',
            'Dieta low FODMAP (fase inicial 2-6 semanas)'
          ]
        });
      }
    }
    
    return diagnosticos;
  };

  const getSeveridadeColor = (gravidade) => {
    switch(gravidade) {
      case 'alta': return 'error';
      case 'moderada': return 'warning';
      case 'leve': return 'info';
      default: return 'default';
    }
  };

  const getSeveridadeIcon = (gravidade) => {
    switch(gravidade) {
      case 'alta': return <WarningIcon />;
      case 'moderada': return <TrendingUpIcon />;
      case 'leve': return <TrendingDownIcon />;
      default: return <CheckCircleIcon />;
    }
  };

  const examesPreenchidos = exames.filter(e => e.resultadoPaciente && e.resultadoPaciente.trim() !== '');

  if (examesPreenchidos.length < 2) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AssessmentIcon />}
        onClick={() => setMostrarCorrelacoes(!mostrarCorrelacoes)}
        fullWidth
        sx={{ mb: 2, py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}
      >
        {mostrarCorrelacoes ? 'Ocultar' : 'Mostrar'} Correlações Funcionais e Diagnósticos Previstos
        <Chip 
          label={correlacoes.length + diagnosticosPrevistos.length} 
          size="small" 
          color="secondary" 
          sx={{ ml: 2 }} 
        />
      </Button>

      <Collapse in={mostrarCorrelacoes}>
        <Paper elevation={3} sx={{ p: 3, bgcolor: '#f5f5f5' }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 'bold' }}>
            <LocalHospitalIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            Análise Integr ativa de Exames
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <AlertTitle>Informação Importante</AlertTitle>
            Esta análise é baseada em correlações funcionais descritas no PDF "Guia dos Exames Laboratoriais - Medicina Funcional Integrativa". 
            As correlações e diagnósticos previstos são sugestões para investigação clínica e não substituem avaliação médica completa.
          </Alert>

          {/* DIAGNÓSTICOS PREVISTOS */}
          {diagnosticosPrevistos.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#d32f2f', fontWeight: 'bold' }}>
                🎯 Diagnósticos Previstos ({diagnosticosPrevistos.length})
              </Typography>
              
              {diagnosticosPrevistos.map((diag, index) => (
                <Paper 
                  key={index} 
                  elevation={2} 
                  sx={{ 
                    p: 3, 
                    mb: 3, 
                    borderLeft: `6px solid ${
                      diag.gravidade === 'alta' ? '#d32f2f' : 
                      diag.gravidade === 'moderada' ? '#f57c00' : 
                      '#1976d2'
                    }` 
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getSeveridadeIcon(diag.gravidade)}
                    <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                      {diag.condicao}
                    </Typography>
                    <Chip 
                      label={diag.gravidade.toUpperCase()} 
                      color={getSeveridadeColor(diag.gravidade)} 
                      size="small" 
                      sx={{ ml: 2 }} 
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                        📊 Evidências:
                      </Typography>
                      <List dense>
                        {diag.evidencias.map((ev, i) => (
                          <ListItem key={i}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CheckCircleIcon fontSize="small" color="success" />
                            </ListItemIcon>
                            <ListItemText primary={ev} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#f57c00', mb: 1 }}>
                        🔍 Investigar:
                      </Typography>
                      <List dense>
                        {diag.investigar.map((inv, i) => (
                          <ListItem key={i}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <WarningIcon fontSize="small" color="warning" />
                            </ListItemIcon>
                            <ListItemText primary={inv} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
                        💊 Conduta Terapêutica Sugerida:
                      </Typography>
                      <List dense>
                        {diag.conduta.map((cond, i) => (
                          <ListItem key={i}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CheckCircleIcon fontSize="small" color="success" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={cond}
                              primaryTypographyProps={{ fontSize: '0.9rem' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      
                      {/* CONDUTAS TERAPÊUTICAS DETALHADAS */}
                      {(() => {
                        const condutaDetalhada = getCondutaTerapeutica(diag.condicao);
                        if (!condutaDetalhada) return null;
                        
                        return (
                          <Box sx={{ mt: 3 }}>
                            <Alert severity="info" icon={<LocalFloristIcon />} sx={{ mb: 2 }}>
                              <AlertTitle sx={{ fontWeight: 'bold' }}>
                                🌿 PROTOCOLO INTEGRATIVO COMPLETO - {condutaDetalhada.titulo}
                              </AlertTitle>
                              Tratamento baseado em Medicina Funcional Integrativa com fitoterapia, suplementação ortomolecular, dietoterapia e mudanças de estilo de vida.
                            </Alert>

                            {/* FITOTERAPIA */}
                            {condutaDetalhada.fitoterapia && condutaDetalhada.fitoterapia.length > 0 && (
                              <Accordion defaultExpanded>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e8f5e9' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <LocalFloristIcon sx={{ mr: 1, color: '#2e7d32' }} />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                      Fitoterapia (Plantas Medicinais)
                                    </Typography>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                  {condutaDetalhada.fitoterapia.map((fito, idx) => (
                                    <Paper key={idx} elevation={1} sx={{ p: 2, mb: 2, bgcolor: '#f1f8e9' }}>
                                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                                        🌿 {fito.planta}
                                      </Typography>
                                      <Typography variant="body2" sx={{ mt: 1 }}>
                                        <strong>Parte usada:</strong> {fito.partUsada}
                                      </Typography>
                                      <Typography variant="body2">
                                        <strong>Dosagem:</strong> {fito.dosagem}
                                      </Typography>
                                      <Typography variant="body2">
                                        <strong>Como usar:</strong> {fito.posologia}
                                      </Typography>
                                      <Typography variant="body2">
                                        <strong>Duração:</strong> {fito.duracao}
                                      </Typography>
                                      <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: '#558b2f' }}>
                                        💡 {fito.propriedades}
                                      </Typography>
                                    </Paper>
                                  ))}
                                </AccordionDetails>
                              </Accordion>
                            )}

                            {/* PROBIÓTICOS */}
                            {condutaDetalhada.probioticos && condutaDetalhada.probioticos.length > 0 && (
                              <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e3f2fd' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ScienceIcon sx={{ mr: 1, color: '#1976d2' }} />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                      Probióticos (Restauração da Microbiota)
                                    </Typography>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                  {condutaDetalhada.probioticos.map((prob, idx) => (
                                    <Paper key={idx} elevation={1} sx={{ p: 2, mb: 2, bgcolor: '#e1f5fe' }}>
                                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0277bd' }}>
                                        🦠 {prob.cepa}
                                      </Typography>
                                      <Typography variant="body2" sx={{ mt: 1 }}>
                                        <strong>Dosagem:</strong> {prob.dosagem}
                                      </Typography>
                                      <Typography variant="body2">
                                        <strong>Como tomar:</strong> {prob.posologia}
                                      </Typography>
                                      <Typography variant="body2">
                                        <strong>Duração:</strong> {prob.duracao}
                                      </Typography>
                                      <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: '#01579b' }}>
                                        💡 Indicação: {prob.indicacao}
                                      </Typography>
                                    </Paper>
                                  ))}
                                </AccordionDetails>
                              </Accordion>
                            )}

                            {/* SUPLEMENTAÇÃO */}
                            {condutaDetalhada.suplementacao && condutaDetalhada.suplementacao.length > 0 && (
                              <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fff3e0' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FitnessCenterIcon sx={{ mr: 1, color: '#e65100' }} />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                      Suplementação Ortomolecular
                                    </Typography>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                  {condutaDetalhada.suplementacao.map((sup, idx) => (
                                    <Paper key={idx} elevation={1} sx={{ p: 2, mb: 2, bgcolor: '#fff8e1' }}>
                                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#e65100' }}>
                                        💊 {sup.nutriente}
                                      </Typography>
                                      <Typography variant="body2" sx={{ mt: 1 }}>
                                        <strong>Dosagem:</strong> {sup.dosagem}
                                      </Typography>
                                      <Typography variant="body2">
                                        <strong>Como tomar:</strong> {sup.posologia}
                                      </Typography>
                                      <Typography variant="body2">
                                        <strong>Duração:</strong> {sup.duracao}
                                      </Typography>
                                      <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: '#bf360c' }}>
                                        💡 {sup.observacao}
                                      </Typography>
                                    </Paper>
                                  ))}
                                </AccordionDetails>
                              </Accordion>
                            )}

                            {/* DIETOTERAPIA */}
                            {condutaDetalhada.dietoterapia && condutaDetalhada.dietoterapia.length > 0 && (
                              <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fce4ec' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <RestaurantIcon sx={{ mr: 1, color: '#c2185b' }} />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                      Dietoterapia Funcional
                                    </Typography>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <List dense>
                                    {condutaDetalhada.dietoterapia.map((dieta, idx) => (
                                      <ListItem key={idx}>
                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                          <RestaurantIcon fontSize="small" color="error" />
                                        </ListItemIcon>
                                        <ListItemText 
                                          primary={dieta}
                                          primaryTypographyProps={{ fontSize: '0.9rem' }}
                                        />
                                      </ListItem>
                                    ))}
                                  </List>
                                </AccordionDetails>
                              </Accordion>
                            )}

                            {/* ESTILO DE VIDA */}
                            {condutaDetalhada.estilo_vida && condutaDetalhada.estilo_vida.length > 0 && (
                              <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f3e5f5' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FitnessCenterIcon sx={{ mr: 1, color: '#7b1fa2' }} />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                      Mudanças de Estilo de Vida
                                    </Typography>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <List dense>
                                    {condutaDetalhada.estilo_vida.map((estilo, idx) => (
                                      <ListItem key={idx}>
                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                          <FitnessCenterIcon fontSize="small" color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText 
                                          primary={estilo}
                                          primaryTypographyProps={{ fontSize: '0.9rem' }}
                                        />
                                      </ListItem>
                                    ))}
                                  </List>
                                </AccordionDetails>
                              </Accordion>
                            )}

                            {/* ORIENTAÇÕES ADICIONAIS */}
                            {condutaDetalhada.orientacoes && condutaDetalhada.orientacoes.length > 0 && (
                              <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e0f2f1' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <WarningIcon sx={{ mr: 1, color: '#00695c' }} />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                      Orientações e Monitoramento
                                    </Typography>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <List dense>
                                    {condutaDetalhada.orientacoes.map((orient, idx) => (
                                      <ListItem key={idx}>
                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                          <WarningIcon fontSize="small" sx={{ color: '#00695c' }} />
                                        </ListItemIcon>
                                        <ListItemText 
                                          primary={orient}
                                          primaryTypographyProps={{ fontSize: '0.9rem' }}
                                        />
                                      </ListItem>
                                    ))}
                                  </List>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          </Box>
                        );
                      })()}
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>
          )}

          {/* CORRELAÇÕES FUNCIONAIS */}
          {correlacoes.length > 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 'bold' }}>
                <LinkIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Correlações Funcionais Identificadas ({correlacoes.length})
              </Typography>
              
              {correlacoes.map((corr, index) => (
                <Alert 
                  key={index} 
                  severity="info" 
                  sx={{ mb: 2 }}
                  icon={<LinkIcon />}
                >
                  <AlertTitle sx={{ fontWeight: 'bold' }}>
                    Correlação: {corr.examesEnvolvidos.join(' + ')}
                  </AlertTitle>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {corr.descricao}
                  </Typography>
                  <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                    {corr.interpretacao}
                  </Typography>
                </Alert>
              ))}
            </Box>
          )}

          {correlacoes.length === 0 && diagnosticosPrevistos.length === 0 && (
            <Alert severity="warning">
              <AlertTitle>Nenhuma correlação significativa encontrada</AlertTitle>
              Continue preenchendo os resultados dos exames para identificar padrões e correlações funcionais.
              Recomenda-se ter pelo menos 3-4 exames preenchidos de categorias diferentes para análise mais completa.
            </Alert>
          )}
        </Paper>
      </Collapse>
    </Box>
  );
};

export default CorrelacoesExames;
