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
  ListItemText,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Healing as HealingIcon,
  LocalPharmacy as PharmacyIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  Print as PrintIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
  VITAMIN_DEFICIENCY_DATABASE,
  VITAMINS_FULL_NAMES,
  SYMPTOM_CATEGORIES,
  RECOMMENDED_DOSAGES,
  CATEGORY_COLORS,
  THERAPEUTIC_PROTOCOLS,
  checkAntagonisms,
  checkSynergies
} from '../data/vitaminDeficiencyBySymptoms';
import { usePatientIntegration } from '../hooks/usePatientIntegration';
import PrescriptionHeader from '../components/PrescriptionHeader';
import PrescriptionFooter from '../components/PrescriptionFooter';
import PrescriptionActions from '../components/PrescriptionActions';
import SaveToPatientBar from '../components/SaveToPatientBar';

export default function VitaminDeficiencyBySymptoms() {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const { patientData, saveToPatient, goToDashboard } = usePatientIntegration('vitaminDeficiencyAnalysis');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState('Gastrointestinal');
  const [searchTerm, setSearchTerm] = useState('');

  // Carregar dados salvos do paciente
  useEffect(() => {
    if (patientData && patientData.vitaminDeficiencyAnalysis) {
      const saved = patientData.vitaminDeficiencyAnalysis;
      if (saved.selectedSymptoms) {
        setSelectedSymptoms(saved.selectedSymptoms);
      }
    }
  }, [patientData]);

  // Análise das deficiências baseada nos sintomas selecionados
  const deficiencyAnalysis = useMemo(() => {
    if (selectedSymptoms.length === 0) return null;

    // Contar ocorrências de cada vitamina/mineral
    const vitaminCount = {};
    const symptomsPerVitamin = {};

    selectedSymptoms.forEach(symptom => {
      const data = VITAMIN_DEFICIENCY_DATABASE[symptom];
      if (data && data.vitaminas) {
        data.vitaminas.forEach(vitamin => {
          vitaminCount[vitamin] = (vitaminCount[vitamin] || 0) + 1;
          
          if (!symptomsPerVitamin[vitamin]) {
            symptomsPerVitamin[vitamin] = [];
          }
          symptomsPerVitamin[vitamin].push(symptom);
        });
      }
    });

    // Ordenar vitaminas por frequência
    const sortedVitamins = Object.entries(vitaminCount)
      .map(([vitamin, count]) => ({
        codigo: vitamin,
        nome: VITAMINS_FULL_NAMES[vitamin] || vitamin,
        ocorrencias: count,
        percentual: Math.round((count / selectedSymptoms.length) * 100),
        sintomas: symptomsPerVitamin[vitamin],
        dosagem: RECOMMENDED_DOSAGES[vitamin] || 'Consulte profissional'
      }))
      .sort((a, b) => b.ocorrencias - a.ocorrencias);

    return {
      vitaminas: sortedVitamins,
      totalSintomas: selectedSymptoms.length
    };
  }, [selectedSymptoms]);

  // Salvar análise automaticamente quando mudar
  useEffect(() => {
    if (selectedSymptoms.length > 0 && deficiencyAnalysis) {
      const dataToSave = {
        selectedSymptoms,
        analysis: deficiencyAnalysis,
        updatedAt: new Date().toISOString()
      };
      saveToPatient(dataToSave);
    }
  }, [selectedSymptoms, deficiencyAnalysis, saveToPatient]);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const clearSelection = () => {
    setSelectedSymptoms([]);
    setSearchTerm('');
  };

  const handleCategoryChange = (category) => (event, isExpanded) => {
    setExpandedCategory(isExpanded ? category : false);
  };

  // Filtrar sintomas por categoria e termo de busca
  const getFilteredSymptoms = (category) => {
    const symptomsInCategory = Object.entries(VITAMIN_DEFICIENCY_DATABASE)
      .filter(([_, data]) => data.categoria === category)
      .map(([symptom, _]) => symptom);

    if (!searchTerm) return symptomsInCategory;

    return symptomsInCategory.filter(symptom =>
      symptom.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getPriorityColor = (percentual) => {
    if (percentual >= 70) return '#d32f2f';
    if (percentual >= 50) return '#ff9800';
    if (percentual >= 30) return '#ffc107';
    return '#4caf50';
  };

  const handlePrint = () => {
    window.print();
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PharmacyIcon sx={{ fontSize: 48, color: '#4caf50' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                  Deficiência de Vitaminas por Sintomas
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Identifique possíveis deficiências vitamínicas e minerais através dos sintomas
                </Typography>
              </Box>
            </Box>
          </Box>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Como usar:</strong> Selecione os sintomas que você ou seu paciente apresenta. 
              O sistema analisará automaticamente as possíveis deficiências de vitaminas e minerais, 
              mostrando as mais prováveis baseadas nos sintomas selecionados.
            </Typography>
          </Alert>

          {/* Campo de busca */}
          <TextField
            fullWidth
            placeholder="Buscar sintoma..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="no-print"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm('')}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          {/* Resumo da seleção */}
          {selectedSymptoms.length > 0 && (
            <Card sx={{ mb: 3, bgcolor: '#e8f5e9', border: '2px solid #4caf50' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                      {selectedSymptoms.length} sintoma{selectedSymptoms.length !== 1 ? 's' : ''} selecionado{selectedSymptoms.length !== 1 ? 's' : ''}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Clique nos sintomas abaixo para removê-los da análise
                    </Typography>
                  </Box>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    size="small"
                    onClick={clearSelection}
                    className="no-print"
                  >
                    Limpar Tudo
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedSymptoms.map(symptom => {
                    const categoryColor = CATEGORY_COLORS[VITAMIN_DEFICIENCY_DATABASE[symptom]?.categoria] || '#757575';
                    return (
                      <Chip
                        key={symptom}
                        label={symptom}
                        onDelete={() => toggleSymptom(symptom)}
                        sx={{ 
                          bgcolor: categoryColor,
                          color: 'white',
                          fontWeight: 500,
                          '& .MuiChip-deleteIcon': {
                            color: 'rgba(255,255,255,0.8)',
                            '&:hover': {
                              color: 'white'
                            }
                          }
                        }}
                        className="no-print-delete"
                      />
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>

        <Grid container spacing={3}>
          {/* Coluna Esquerda: Seleção de Sintomas */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1976d2' }}>
                📋 Selecione os Sintomas
              </Typography>

              {SYMPTOM_CATEGORIES.map(category => {
                const filteredSymptoms = getFilteredSymptoms(category);
                if (filteredSymptoms.length === 0) return null;

                return (
                  <Accordion
                    key={category}
                    expanded={expandedCategory === category}
                    onChange={handleCategoryChange(category)}
                    sx={{ mb: 1 }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        bgcolor: CATEGORY_COLORS[category],
                        color: 'white',
                        '&:hover': {
                          bgcolor: CATEGORY_COLORS[category],
                          opacity: 0.9
                        },
                        '& .MuiAccordionSummary-expandIconWrapper': {
                          color: 'white'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontWeight: 600 }}>{category}</Typography>
                        <Badge 
                          badgeContent={filteredSymptoms.filter(s => selectedSymptoms.includes(s)).length}
                          color="error"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {filteredSymptoms.map(symptom => (
                          <Chip
                            key={symptom}
                            label={symptom}
                            onClick={() => toggleSymptom(symptom)}
                            icon={selectedSymptoms.includes(symptom) ? <CheckCircleIcon /> : undefined}
                            color={selectedSymptoms.includes(symptom) ? 'success' : 'default'}
                            variant={selectedSymptoms.includes(symptom) ? 'filled' : 'outlined'}
                            sx={{ 
                              justifyContent: 'flex-start',
                              height: 'auto',
                              py: 1,
                              px: 2,
                              '& .MuiChip-label': {
                                whiteSpace: 'normal',
                                textAlign: 'left'
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Paper>
          </Grid>

          {/* Coluna Direita: Análise de Deficiências */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#4caf50' }}>
                🔬 Análise de Deficiências
              </Typography>

              {!deficiencyAnalysis ? (
                <Alert severity="info" icon={<InfoIcon />}>
                  <Typography variant="body2">
                    Selecione um ou mais sintomas na coluna à esquerda para ver a análise de possíveis deficiências.
                  </Typography>
                </Alert>
              ) : (
                <>
                  {/* Resumo estatístico */}
                  <Card sx={{ mb: 3, bgcolor: '#f5f5f5' }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Sintomas Analisados
                          </Typography>
                          <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
                            {deficiencyAnalysis.totalSintomas}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Deficiências Identificadas
                          </Typography>
                          <Typography variant="h4" sx={{ fontWeight: 600, color: '#d32f2f' }}>
                            {deficiencyAnalysis.vitaminas.length}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  {/* Tabela de deficiências */}
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                          <TableCell sx={{ fontWeight: 600 }}>Prioridade</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Vitamina/Mineral</TableCell>
                          <TableCell sx={{ fontWeight: 600 }} align="center">Ocorrências</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Dosagem Recomendada</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {deficiencyAnalysis.vitaminas.map((vitamin, index) => (
                          <TableRow 
                            key={vitamin.codigo}
                            sx={{ 
                              '&:hover': { bgcolor: '#f5f5f5' },
                              borderLeft: `4px solid ${getPriorityColor(vitamin.percentual)}`
                            }}
                          >
                            <TableCell>
                              <Chip
                                label={`${index + 1}º`}
                                size="small"
                                sx={{ 
                                  bgcolor: getPriorityColor(vitamin.percentual),
                                  color: 'white',
                                  fontWeight: 600
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Tooltip title={`${vitamin.percentual}% dos sintomas relacionados`}>
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {vitamin.codigo}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {vitamin.nome}
                                  </Typography>
                                </Box>
                              </Tooltip>
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={`${vitamin.ocorrencias}/${deficiencyAnalysis.totalSintomas}`}
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 500, color: '#1976d2' }}>
                                {vitamin.dosagem}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Detalhes expandidos */}
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Detalhes das Deficiências
                    </Typography>
                    
                    {deficiencyAnalysis.vitaminas.slice(0, 5).map((vitamin, index) => (
                      <Accordion key={vitamin.codigo} sx={{ mb: 1 }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          sx={{ bgcolor: index < 3 ? '#fff3e0' : 'inherit' }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            <Chip
                              label={`${index + 1}º`}
                              size="small"
                              sx={{ 
                                bgcolor: getPriorityColor(vitamin.percentual),
                                color: 'white'
                              }}
                            />
                            <Typography sx={{ fontWeight: 600, flex: 1 }}>
                              {vitamin.nome}
                            </Typography>
                            <Chip
                              label={`${vitamin.percentual}%`}
                              size="small"
                              color={vitamin.percentual >= 50 ? 'error' : 'warning'}
                            />
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                              Sintomas relacionados:
                            </Typography>
                            <List dense>
                              {vitamin.sintomas.map(sintoma => (
                                <ListItem key={sintoma}>
                                  <ListItemText 
                                    primary={sintoma}
                                    primaryTypographyProps={{ variant: 'body2' }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              <strong>Dosagem recomendada:</strong> {vitamin.dosagem}
                            </Typography>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>

                  {/* Aviso importante */}
                  <Alert severity="warning" sx={{ mt: 3 }}>
                    <Typography variant="body2">
                      <strong>⚠️ Importante:</strong> Esta análise é uma ferramenta de apoio diagnóstico. 
                      Sempre consulte um profissional de saúde qualificado antes de iniciar qualquer suplementação. 
                      Dosagens devem ser individualizadas conforme exames e avaliação clínica.
                    </Typography>
                  </Alert>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* PROTOCOLO DE TRATAMENTO E RECEITUÁRIO */}
        {deficiencyAnalysis && deficiencyAnalysis.vitaminas.length > 0 && (
          <Paper elevation={3} sx={{ p: 4, mt: 4, bgcolor: '#f8f9fa' }}>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
                📋 Protocolo de Tratamento Personalizado
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Receituário profissional baseado nas deficiências identificadas
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Informações do receituário */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Card sx={{ bgcolor: 'white' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
                      ℹ️ Informações do Protocolo
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Total de suplementos:</strong> {deficiencyAnalysis.vitaminas.length}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Sintomas avaliados:</strong> {deficiencyAnalysis.totalSintomas}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ bgcolor: 'white' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, color: '#d32f2f' }}>
                      ⚕️ Orientações Gerais
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      • Seguir dosagens e horários prescritos
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      • Reavaliação em 60-90 dias
                    </Typography>
                    <Typography variant="body2">
                      • Solicitar exames de controle
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Receituário detalhado */}
            <Card sx={{ bgcolor: 'white' }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#2e7d32' }}>
                  💊 Receituário Detalhado
                </Typography>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 600, width: '5%' }}>#</TableCell>
                        <TableCell sx={{ fontWeight: 600, width: '25%' }}>Suplemento</TableCell>
                        <TableCell sx={{ fontWeight: 600, width: '20%' }}>Forma Ativa</TableCell>
                        <TableCell sx={{ fontWeight: 600, width: '15%' }}>Dosagem</TableCell>
                        <TableCell sx={{ fontWeight: 600, width: '15%' }}>Posologia</TableCell>
                        <TableCell sx={{ fontWeight: 600, width: '20%' }}>Observações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {deficiencyAnalysis.vitaminas.map((vitamin, index) => {
                        const protocol = THERAPEUTIC_PROTOCOLS[vitamin.codigo];
                        if (!protocol) return null;

                        // Calcular dosagem baseada na prioridade
                        let dosagem;
                        if (vitamin.percentual >= 70) {
                          // Alta prioridade - usar dosagem próxima ao máximo
                          dosagem = Math.round(protocol.dosagemMin + (protocol.dosagemMax - protocol.dosagemMin) * 0.8);
                        } else if (vitamin.percentual >= 50) {
                          // Média-alta - usar dosagem média-alta
                          dosagem = Math.round(protocol.dosagemMin + (protocol.dosagemMax - protocol.dosagemMin) * 0.6);
                        } else if (vitamin.percentual >= 30) {
                          // Média - usar dosagem média
                          dosagem = Math.round((protocol.dosagemMin + protocol.dosagemMax) / 2);
                        } else {
                          // Baixa - usar dosagem mínima efetiva
                          dosagem = Math.round(protocol.dosagemMin + (protocol.dosagemMax - protocol.dosagemMin) * 0.3);
                        }

                        return (
                          <TableRow 
                            key={vitamin.codigo}
                            sx={{ 
                              '&:nth-of-type(odd)': { bgcolor: '#fafafa' },
                              borderLeft: `4px solid ${getPriorityColor(vitamin.percentual)}`
                            }}
                          >
                            <TableCell sx={{ fontWeight: 600 }}>
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {vitamin.codigo}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {vitamin.nome}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 500, color: '#1976d2' }}>
                                {protocol.formaAtiva}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={`${dosagem} ${protocol.unidade}`}
                                size="small"
                                color="primary"
                                sx={{ fontWeight: 600 }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                {protocol.frequencia}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {protocol.horario}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="caption" color="text.secondary">
                                {protocol.observacoes}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* ANÁLISE DE INTERAÇÕES NUTRICIONAIS */}
                {(() => {
                  const nutrientCodes = deficiencyAnalysis.vitaminas.map(v => v.codigo);
                  const antagonisms = checkAntagonisms(nutrientCodes);
                  const synergies = checkSynergies(nutrientCodes);

                  return (
                    <>
                      {/* Antagonismos - CRÍTICO */}
                      {antagonisms.length > 0 && (
                        <Alert severity="error" sx={{ mt: 3 }} icon={<WarningIcon />}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            ⚠️ ATENÇÃO: Antagonismos Detectados (SEPARAR HORÁRIOS)
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            Os seguintes nutrientes <strong>competem pela absorção</strong> e devem ser tomados em horários diferentes (intervalo mínimo de 2 horas):
                          </Typography>
                          <TableContainer>
                            <Table size="small">
                              <TableHead>
                                <TableRow sx={{ bgcolor: '#ffebee' }}>
                                  <TableCell sx={{ fontWeight: 600 }}>Nutriente 1</TableCell>
                                  <TableCell sx={{ fontWeight: 600 }}>Nutriente 2</TableCell>
                                  <TableCell sx={{ fontWeight: 600 }}>Recomendação</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {antagonisms.map((ant, index) => (
                                  <TableRow key={index}>
                                    <TableCell>
                                      <Chip 
                                        label={VITAMINS_FULL_NAMES[ant.nutriente1]} 
                                        size="small" 
                                        color="error"
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Chip 
                                        label={VITAMINS_FULL_NAMES[ant.nutriente2]} 
                                        size="small" 
                                        color="error"
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {ant.recomendacao}
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Alert>
                      )}

                      {/* Sinergismos - POSITIVO */}
                      {synergies.length > 0 && (
                        <Alert severity="success" sx={{ mt: 3 }} icon={<InfoIcon />}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            ✅ Sinergismos Identificados (POTENCIALIZAÇÃO)
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            Os seguintes nutrientes <strong>potencializam uns aos outros</strong> e podem/devem ser tomados juntos:
                          </Typography>
                          <TableContainer>
                            <Table size="small">
                              <TableHead>
                                <TableRow sx={{ bgcolor: '#e8f5e9' }}>
                                  <TableCell sx={{ fontWeight: 600 }}>Nutriente 1</TableCell>
                                  <TableCell sx={{ fontWeight: 600 }}>Nutriente 2</TableCell>
                                  <TableCell sx={{ fontWeight: 600 }}>Benefício</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {synergies.map((syn, index) => (
                                  <TableRow key={index}>
                                    <TableCell>
                                      <Chip 
                                        label={VITAMINS_FULL_NAMES[syn.nutriente1]} 
                                        size="small" 
                                        color="success"
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Chip 
                                        label={VITAMINS_FULL_NAMES[syn.nutriente2]} 
                                        size="small" 
                                        color="success"
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Typography variant="body2">
                                        {syn.recomendacao}
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Alert>
                      )}

                      {/* Sugestão de horários otimizados */}
                      {antagonisms.length > 0 && (
                        <Box sx={{ mt: 3, p: 3, bgcolor: '#fff3e0', borderRadius: 2, border: '2px solid #ff9800' }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#e65100' }}>
                            ⏰ Sugestão de Horários para Evitar Antagonismos
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Card sx={{ bgcolor: 'white' }}>
                                <CardContent>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#1976d2' }}>
                                    🌅 Manhã (em jejum ou café da manhã)
                                  </Typography>
                                  <Typography variant="body2" component="div">
                                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                                      {antagonisms.some(a => a.nutriente1 === 'Fe' || a.nutriente2 === 'Fe') && (
                                        <li><strong>Ferro</strong> + Vitamina C (potencializa absorção)</li>
                                      )}
                                      <li><strong>Vitaminas B</strong> (B1, B2, B3, B5, B6, B9, B12)</li>
                                      <li><strong>Vitamina D</strong> (com gordura)</li>
                                      <li><strong>Ômega 3</strong></li>
                                    </ul>
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Card sx={{ bgcolor: 'white' }}>
                                <CardContent>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#7b1fa2' }}>
                                    🌙 Noite (jantar ou antes de dormir)
                                  </Typography>
                                  <Typography variant="body2" component="div">
                                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                                      {antagonisms.some(a => a.nutriente1 === 'Ca' || a.nutriente2 === 'Ca') && (
                                        <li><strong>Cálcio</strong> + Vitamina K2 + Vitamina D</li>
                                      )}
                                      {antagonisms.some(a => a.nutriente1 === 'Zn' || a.nutriente2 === 'Zn') && (
                                        <li><strong>Zinco</strong> (após jantar)</li>
                                      )}
                                      <li><strong>Magnésio</strong> (auxilia sono)</li>
                                      <li><strong>L-Triptofano</strong> / <strong>Melatonina</strong></li>
                                    </ul>
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          </Grid>
                        </Box>
                      )}
                    </>
                  );
                })()}

                {/* Resumo de custos estimados */}
                <Box sx={{ mt: 3, p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
                    📊 Resumo do Protocolo
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">
                        Total de suplementos
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: '#1976d2' }}>
                        {deficiencyAnalysis.vitaminas.length}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">
                        Prioridade alta (≥70%)
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: '#d32f2f' }}>
                        {deficiencyAnalysis.vitaminas.filter(v => v.percentual >= 70).length}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">
                        Reavaliação
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                        60-90 dias
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                {/* Orientações complementares */}
                <Alert severity="info" sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    📝 Orientações Complementares:
                  </Typography>
                  <Typography variant="body2" component="div">
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      <li>Ingerir suplementos preferencialmente com alimentos</li>
                      <li>Manter hidratação adequada (2-3 litros de água/dia)</li>
                      <li>Evitar consumo de álcool durante tratamento</li>
                      <li>Manter alimentação equilibrada e variada</li>
                      <li>Praticar atividade física regular</li>
                      <li>Dormir 7-9 horas por noite</li>
                      <li>Gerenciar estresse (meditação, yoga, etc.)</li>
                      <li>Solicitar exames laboratoriais antes de iniciar</li>
                      <li>Reavaliar dosagens após exames de controle</li>
                      <li>Comunicar qualquer efeito adverso ao profissional</li>
                    </ul>
                  </Typography>
                </Alert>

                {/* Interações importantes */}
                <Alert severity="warning" sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    ⚠️ Atenção - Interações Importantes:
                  </Typography>
                  <Typography variant="body2" component="div">
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      <li><strong>Ferro:</strong> Evitar com chá, café, leite e antiácidos (espaçar 2h)</li>
                      <li><strong>Cálcio:</strong> Não tomar junto com ferro ou zinco (espaçar 2h)</li>
                      <li><strong>Zinco:</strong> Tomar longe de cobre e ferro</li>
                      <li><strong>Vitamina D:</strong> Tomar com refeição gordurosa para melhor absorção</li>
                      <li><strong>Magnésio:</strong> Pode causar diarreia em doses altas (iniciar gradualmente)</li>
                      <li><strong>Vitamina K2:</strong> Contraindicado para quem usa anticoagulantes orais</li>
                      <li><strong>Iodo:</strong> Monitorar função tireoidiana</li>
                    </ul>
                  </Typography>
                </Alert>

                {/* Contraindicações */}
                <Alert severity="error" sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    🚫 Contraindicações e Cuidados Especiais:
                  </Typography>
                  <Typography variant="body2" component="div">
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      <li><strong>Gestantes/Lactantes:</strong> Ajustar dosagens especialmente vitamina A</li>
                      <li><strong>Crianças:</strong> Dosagens pediátricas são diferentes</li>
                      <li><strong>Idosos:</strong> Atenção a interações medicamentosas</li>
                      <li><strong>Insuficiência renal:</strong> Ajustar magnésio, potássio e vitamina D</li>
                      <li><strong>Anticoagulantes:</strong> Cuidado com vitamina K2 e ômega 3</li>
                      <li><strong>Hemocromatose:</strong> Não suplementar ferro</li>
                      <li><strong>Hipercalcemia:</strong> Não suplementar cálcio e vitamina D</li>
                    </ul>
                  </Typography>
                </Alert>

                {/* Assinatura profissional */}
                <Box sx={{ mt: 4, pt: 3, borderTop: '2px solid #ddd' }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Data de emissão:</strong> {new Date().toLocaleDateString('pt-BR', { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Validade do receituário:</strong> 90 dias
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Retorno programado:</strong> 60-90 dias
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ textAlign: 'right' }}>
                        <Box sx={{ 
                          height: 80, 
                          borderBottom: '1px solid #000', 
                          mb: 1,
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'center'
                        }}>
                          <Typography variant="caption" color="text.secondary">
                            (Assinatura e carimbo do profissional)
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Profissional de Saúde
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Registro Profissional: ______________
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>

            {/* Botões de ação */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }} className="no-print">
              <Button
                variant="contained"
                color="primary"
                startIcon={<PrintIcon />}
                onClick={handlePrint}
                size="large"
              >
                Imprimir Protocolo Completo
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<SaveIcon />}
                size="large"
              >
                Salvar no Prontuário
              </Button>
            </Box>
          </Paper>
        )}

        {/* Rodapé do Receituário (apenas para impressão) */}
        <Box className="print-only">
          <PrescriptionFooter />
        </Box>
      </Paper>

      {/* Estilos para impressão */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          .no-print-delete .MuiChip-deleteIcon {
            display: none !important;
          }
          .printable-content {
            box-shadow: none !important;
          }
          @page {
            size: A4;
            margin: 1.5cm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
        @media screen {
          .print-only {
            display: none !important;
          }
        }
      `}</style>

      <SaveToPatientBar
        moduleKey="vitaminDeficiencyBySymptoms"
        getData={() => selectedSymptoms.length > 0
          ? { selectedSymptoms, savedAt: new Date().toISOString() }
          : null}
        label="Salvar análise de sintomas de vitaminas no interagente"
      />
    </Container>
  );
}
