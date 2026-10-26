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
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ScienceIcon from '@mui/icons-material/Science';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import {
  ALL_PATHOLOGIES,
  PROBIOTIC_STRAINS,
  getProbioticsForMultiplePathologies,
  PROBIOTIC_GUIDELINES
} from '../data/probioticsDatabase';
import { usePatientIntegration } from '../hooks/usePatientIntegration';
import PrescriptionHeader from '../components/PrescriptionHeader';
import PrescriptionFooter from '../components/PrescriptionFooter';
import PrescriptionActions from '../components/PrescriptionActions';
import SaveToPatientBar from '../components/SaveToPatientBar';

const ProbioticsRecommendation = () => {
  const contentRef = useRef(null);
  const { patientData, saveToPatient, goToDashboard } = usePatientIntegration('probioticsRecommendation');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPathologies, setSelectedPathologies] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');

  // Paciente efetivo: usa dados do localStorage ou digitados manualmente
  const effectivePatient = patientData || (patientName ? { q1_nome_completo: patientName, q4_idade: patientAge } : null);

  // Debug: Log para verificar se o componente está renderizando
  useEffect(() => {
    console.log('ProbioticsRecommendation mounted');
    console.log('ALL_PATHOLOGIES:', ALL_PATHOLOGIES?.length);
    console.log('PROBIOTIC_STRAINS:', Object.keys(PROBIOTIC_STRAINS || {}).length);
  }, []);

  // Carregar dados salvos do paciente
  useEffect(() => {
    if (patientData) {
      if (patientData.q1_nome_completo) setPatientName(patientData.q1_nome_completo);
      if (patientData.q4_idade) setPatientAge(patientData.q4_idade.toString());
      if (patientData.probioticsRecommendation) {
        const saved = patientData.probioticsRecommendation;
        if (saved.selectedPathologies) setSelectedPathologies(saved.selectedPathologies);
      }
    }
  }, [patientData]);

  // Filtrar patologias por busca
  const filteredPathologies = useMemo(() => {
    if (!searchTerm) return ALL_PATHOLOGIES;
    const search = searchTerm.toLowerCase();
    return ALL_PATHOLOGIES.filter(p => p.toLowerCase().includes(search));
  }, [searchTerm]);

  // Gerar recomendações baseadas nas patologias selecionadas
  const recommendations = useMemo(() => {
    if (selectedPathologies.length === 0) return null;
    return getProbioticsForMultiplePathologies(selectedPathologies);
  }, [selectedPathologies]);

  // Salvar dados automaticamente
  useEffect(() => {
    if (selectedPathologies.length > 0 && recommendations) {
      saveToPatient({
        selectedPathologies,
        recommendations,
        patientName,
        patientAge,
        updatedAt: new Date().toISOString()
      });
    }
  }, [selectedPathologies, recommendations, patientName, patientAge, saveToPatient]);

  const handlePathologyToggle = (pathology) => {
    setSelectedPathologies(prev => {
      if (prev.includes(pathology)) {
        return prev.filter(p => p !== pathology);
      } else {
        return [...prev, pathology];
      }
    });
  };

  // Verificar se os dados estão carregados
  if (!ALL_PATHOLOGIES || !PROBIOTIC_STRAINS) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">
          Erro ao carregar banco de dados de probióticos. Por favor, recarregue a página.
        </Alert>
      </Container>
    );
  }

  // Calcular dosagem baseada em prioridade
  const calculateDosage = (strain, score) => {
    if (!strain) return '';
    
    const baseDosage = strain.dosage || '1-10 bilhões UFC/dia';
    
    // Se score alto (aparece em muitas patologias), usar dosagem mais alta
    if (score >= 3) {
      return baseDosage.replace(/(\d+)-(\d+)/, (match, min, max) => {
        const minNum = parseInt(min);
        const maxNum = parseInt(max);
        const recommended = Math.ceil(minNum + (maxNum - minNum) * 0.8);
        return `${recommended} bilhões UFC/dia (alta prioridade)`;
      });
    } else if (score === 2) {
      return baseDosage.replace(/(\d+)-(\d+)/, (match, min, max) => {
        const minNum = parseInt(min);
        const maxNum = parseInt(max);
        const recommended = Math.ceil((minNum + maxNum) / 2);
        return `${recommended} bilhões UFC/dia (prioridade média)`;
      });
    }
    
    return baseDosage;
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Botões de ação no topo */}
      <Box sx={{ mb: 3 }}>
        <PrescriptionActions
          patientData={effectivePatient}
          contentRef={contentRef}
          contentTitle="Recomendacao_Probioticos"
          onBack={goToDashboard}
          warningMessage="Digite o nome do paciente abaixo ou selecione um paciente no Dashboard para habilitar a impressão."
        />
      </Box>

      {/* Área de impressão */}
      <Box id="prescription-print-area" ref={contentRef}>
        {/* Cabeçalho do Receituário (apenas para impressão) */}
        <Box className="print-only">
          <PrescriptionHeader entry={patientData} />
        </Box>

        {/* Cabeçalho */}
        <Box sx={{ mb: 4, textAlign: 'center' }} className="no-print">
          <ScienceIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            🦠 Recomendação de Probióticos
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Sistema de Indicação Personalizada por Patologias
          </Typography>
        </Box>

      {/* Informações do Paciente */}
      <Card sx={{ mb: 3 }} className="no-print">
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Dados do Paciente
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Nome do Paciente"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Idade"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                variant="outlined"
                type="number"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Busca e Seleção de Patologias */}
      <Card sx={{ mb: 3 }} className="no-print">
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Selecione as Patologias/Condições do Paciente
          </Typography>
          
          <TextField
            fullWidth
            placeholder="Buscar patologia (ex: diabetes, intestino irritável, obesidade...)"
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
            sx={{ mb: 3 }}
          />

          <Box sx={{ mb: 2 }}>
            <Chip
              label={`${selectedPathologies.length} patologia(s) selecionada(s)`}
              color="primary"
              icon={<CheckCircleIcon />}
            />
          </Box>

          <Box sx={{ maxHeight: 400, overflow: 'auto', border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
            <Grid container spacing={1}>
              {filteredPathologies.map((pathology) => (
                <Grid item xs={12} sm={6} md={4} key={pathology}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedPathologies.includes(pathology)}
                        onChange={() => handlePathologyToggle(pathology)}
                        color="primary"
                      />
                    }
                    label={pathology}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Alertas Informativos */}
      <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 3 }} className="no-print">
        <strong>Importante:</strong> As recomendações são baseadas em evidências científicas. 
        O sistema calcula automaticamente as cepas mais indicadas conforme as patologias selecionadas.
        Probióticos com maior "score" aparecem em mais patologias do paciente.
      </Alert>

      {/* Receituário de Probióticos */}
      <Card sx={{ mb: 3, '@media print': { boxShadow: 'none', border: '2px solid #000' } }}>
            <CardContent>
              {/* Cabeçalho do Receituário */}
              <Box sx={{ textAlign: 'center', mb: 3, pb: 2, borderBottom: '2px solid #1976d2' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  RECEITUÁRIO DE PROBIÓTICOS
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Indicação Personalizada Baseada em Evidências
                </Typography>
              </Box>

              {/* Dados do Paciente no Receituário */}
              <Grid container spacing={2} sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Grid item xs={12} md={8}>
                  <Typography variant="body1">
                    <strong>Paciente:</strong> {patientName || '_________________________________________'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body1">
                    <strong>Idade:</strong> {patientAge || '______'} anos
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}
                  </Typography>
                </Grid>
              </Grid>

              {/* Patologias Identificadas */}
              {selectedPathologies.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    📋 Patologias/Condições Identificadas:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedPathologies.map((pathology) => (
                      <Chip
                        key={pathology}
                        label={pathology}
                        color="secondary"
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {selectedPathologies.length > 0 && <Divider sx={{ my: 3 }} />}

              {/* Tabela de Probióticos Recomendados */}
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                💊 Protocolo de Probióticos Recomendados:
              </Typography>

              {(!recommendations || recommendations.strains.length === 0) && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Selecione as patologias/condições do paciente acima para gerar automaticamente o protocolo de probióticos recomendados.
                </Alert>
              )}

              {recommendations && recommendations.strains.length > 0 && <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#1976d2' }}>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Probiótico (Cepa)</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Dosagem</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Horário</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Prioridade</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recommendations.strains.slice(0, 10).map((strain, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          backgroundColor: strain.score >= 3 ? '#e3f2fd' : 'inherit',
                          '&:nth-of-type(odd)': { backgroundColor: strain.score >= 3 ? '#e3f2fd' : '#fafafa' }
                        }}
                      >
                        <TableCell>
                          <strong>{strain.name}</strong>
                          <Typography variant="caption" display="block" color="text.secondary">
                            {strain.benefits?.slice(0, 2).join(', ')}
                          </Typography>
                        </TableCell>
                        <TableCell>{calculateDosage(strain, strain.score)}</TableCell>
                        <TableCell>{strain.timing}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={strain.score >= 3 ? 'ALTA' : strain.score === 2 ? 'MÉDIA' : 'BAIXA'}
                            color={strain.score >= 3 ? 'error' : strain.score === 2 ? 'warning' : 'default'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>}

              {/* Orientações Gerais */}
              <Box sx={{ mt: 3, p: 2, backgroundColor: '#fff3e0', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  📝 Orientações Gerais:
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Dosagem"
                      secondary={PROBIOTIC_GUIDELINES.dosage}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Horário"
                      secondary={PROBIOTIC_GUIDELINES.timing}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Duração do Tratamento"
                      secondary={PROBIOTIC_GUIDELINES.duration}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Armazenamento"
                      secondary={PROBIOTIC_GUIDELINES.storage}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Interações com Antibióticos"
                      secondary={PROBIOTIC_GUIDELINES.interactions}
                    />
                  </ListItem>
                </List>
              </Box>

              {/* Avisos e Contraindicações */}
              <Alert severity="warning" sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  ⚠️ Contraindicações e Precauções:
                </Typography>
                <Typography variant="body2">
                  {PROBIOTIC_GUIDELINES.contraindications}
                </Typography>
              </Alert>

              {/* Observações Adicionais */}
              <Box sx={{ mt: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Observações Adicionais:
                </Typography>
                <Box sx={{ minHeight: 60, borderBottom: '1px solid #ccc', mb: 1 }} />
                <Box sx={{ minHeight: 60, borderBottom: '1px solid #ccc', mb: 1 }} />
              </Box>

              {/* Assinatura */}
              <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #000' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center', pt: 4, borderTop: '1px solid #000', mt: 2 }}>
                      <Typography variant="body2">
                        Assinatura do Profissional
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2">
                        <strong>Nome:</strong> _____________________________
                      </Typography>
                      <Typography variant="body2">
                        <strong>Registro:</strong> _________________________
                      </Typography>
                      <Typography variant="body2">
                        <strong>CRM/CRTH:</strong> ________________________
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>

      {/* Informações sobre as Cepas */}
      <Accordion className="no-print">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            📚 Informações Detalhadas sobre as Cepas
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {Object.values(PROBIOTIC_STRAINS).map((strain, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      {strain.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>Benefícios:</strong> {strain.benefits?.join(', ')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Dosagem:</strong> {strain.dosage}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Horário:</strong> {strain.timing}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Rodapé com informações */}
      <Card sx={{ mt: 3, backgroundColor: '#e8f5e9' }} className="no-print">
        <CardContent>
          <Typography variant="body2" color="text.secondary" align="center">
            Este sistema utiliza banco de dados científico atualizado com 81 patologias e 35 cepas probióticas.
            As recomendações são baseadas em evidências clínicas e devem ser avaliadas por profissional qualificado.
          </Typography>
        </CardContent>
      </Card>

        {/* Rodapé do Receituário (apenas para impressão) */}
        <Box className="print-only">
          <PrescriptionFooter />
        </Box>
      </Box>

      {/* Estilos de impressão */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          body {
            background: white;
          }
          @page {
            size: A4;
            margin: 20mm;
          }
        }
        @media screen {
          .print-only {
            display: none !important;
          }
        }
      `}</style>

      <SaveToPatientBar
        moduleKey="probioticsRecommendation"
        getData={() => selectedPathologies.length > 0 && recommendations
          ? { selectedPathologies, recommendations, savedAt: new Date().toISOString() }
          : null}
        label="Salvar recomendações de probiticos no interagente"
      />
    </Container>
  );
};

export default ProbioticsRecommendation;
