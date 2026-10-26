import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PrintIcon from '@mui/icons-material/Print';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import LABORATORY_EXAMS_COMPLETE from '../data/laboratoryExamsComplete';
import { usePatientIntegration } from '../hooks/usePatientIntegration';
import PrescriptionHeader from '../components/PrescriptionHeader';
import PrescriptionFooter from '../components/PrescriptionFooter';
import PrescriptionActions from '../components/PrescriptionActions';

// Extrair categorias únicas dos exames
const getAllCategories = () => {
  const categories = new Set();
  Object.values(LABORATORY_EXAMS_COMPLETE).forEach(exam => {
    if (exam && exam.categoria) {
      categories.add(exam.categoria);
    }
  });
  return Array.from(categories).sort();
};

// Função auxiliar para obter exames por categoria
const getExamsByCategory = (category) => {
  const examsArray = [];
  Object.entries(LABORATORY_EXAMS_COMPLETE).forEach(([key, exam]) => {
    if (exam && exam.categoria === category) {
      examsArray.push({
        name: exam.nome || key,
        key: key,
        category: exam.categoria,
        objective: exam.interpretacao?.normal || exam.objetivo || 'Avaliação laboratorial',
        preparation: exam.preparo || 'Conforme orientação médica',
        material: exam.material || 'Sangue'
      });
    }
  });
  return examsArray;
};

const EXAM_CATEGORIES = getAllCategories();

const ExamRequestForm = () => {
  const contentRef = useRef(null);
  const { patientData: savedPatientData, saveToPatient, goToDashboard } = usePatientIntegration('examRequests');
  
  // Estado para informações do paciente
  const [patientData, setPatientData] = useState({
    name: '',
    birthDate: '',
    age: '',
    gender: '',
    cpf: '',
    phone: '',
    email: '',
    indication: ''
  });

  // Estado para exames selecionados
  const [selectedExams, setSelectedExams] = useState({});

  // Estado para busca
  const [searchTerm, setSearchTerm] = useState('');

  // Gerenciar expansão de acordeões
  const [expandedCategory, setExpandedCategory] = useState(false);

  // Carregar dados salvos do paciente
  useEffect(() => {
    if (savedPatientData) {
      setPatientData({
        name: savedPatientData.q1_nome_completo || '',
        birthDate: savedPatientData.q3_data_nascimento || '',
        age: savedPatientData.q4_idade?.toString() || '',
        gender: savedPatientData.q2_sexo || '',
        cpf: savedPatientData.q5_cpf || '',
        phone: savedPatientData.q6_telefone || '',
        email: savedPatientData.q7_email || '',
        indication: savedPatientData.examRequests?.indication || ''
      });
      
      if (savedPatientData.examRequests?.selectedExams) {
        setSelectedExams(savedPatientData.examRequests.selectedExams);
      }
    }
  }, [savedPatientData]);

  // Salvar dados automaticamente com informações detalhadas
  useEffect(() => {
    if (Object.keys(selectedExams).length > 0 && patientData.name) {
      const examsList = Object.entries(selectedExams).map(([key, exam]) => ({
        key,
        name: exam.name,
        category: exam.category,
        material: exam.material,
        preparation: exam.preparation
      }));

      saveToPatient({
        selectedExams,
        examsList, // Lista simplificada para histórico
        indication: patientData.indication,
        totalExams: Object.keys(selectedExams).length,
        patientName: patientData.name,
        requestDate: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // Informações para comparação futura
        categories: [...new Set(examsList.map(e => e.category))],
        summary: {
          totalExams: Object.keys(selectedExams).length,
          date: new Date().toLocaleDateString('pt-BR'),
          hasIndication: !!patientData.indication
        }
      });
    }
  }, [selectedExams, patientData.indication, patientData.name, saveToPatient]);

  // Calcular idade quando a data de nascimento é alterada
  const handleBirthDateChange = (e) => {
    const birthDate = e.target.value;
    setPatientData({ ...patientData, birthDate });
    
    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      setPatientData(prev => ({ ...prev, age: age.toString() }));
    }
  };

  // Alternar seleção de exame
  const toggleExam = (examKey, examData, category) => {
    setSelectedExams(prev => ({
      ...prev,
      [examKey]: prev[examKey] ? undefined : { ...examData, category }
    }));
  };

  // Selecionar/desselecionar todos da categoria
  const toggleCategory = (category, exams) => {
    const allSelected = exams.every(exam => selectedExams[exam.key]);
    
    if (allSelected) {
      // Desselecionar todos
      const updated = { ...selectedExams };
      exams.forEach(exam => {
        delete updated[exam.key];
      });
      setSelectedExams(updated);
    } else {
      // Selecionar todos
      const updated = { ...selectedExams };
      exams.forEach(exam => {
        updated[exam.key] = { ...exam, category };
      });
      setSelectedExams(updated);
    }
  };

  // Filtrar categorias e exames com base na busca
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return EXAM_CATEGORIES;
    
    const term = searchTerm.toLowerCase();
    return EXAM_CATEGORIES.filter(category => {
      // Verifica se o nome da categoria contém o termo
      if (category.toLowerCase().includes(term)) return true;
      
      // Verifica se algum exame da categoria contém o termo
      const categoryExams = getExamsByCategory(category);
      return categoryExams.some(exam => 
        exam.name.toLowerCase().includes(term) || 
        exam.objective.toLowerCase().includes(term)
      );
    });
  }, [searchTerm]);

  // Filtrar exames dentro de uma categoria
  const getFilteredExams = (category) => {
    const exams = getExamsByCategory(category);
    if (!searchTerm.trim()) return exams;
    
    const term = searchTerm.toLowerCase();
    return exams.filter(exam => 
      exam.name.toLowerCase().includes(term) || 
      exam.objective.toLowerCase().includes(term)
    );
  };

  // Contar exames selecionados
  const selectedCount = Object.keys(selectedExams).length;

  // Limpar todos os exames selecionados
  const clearAllExams = () => {
    setSelectedExams({});
  };

  // Limpar dados do paciente
  const clearPatientData = () => {
    setPatientData({
      name: '',
      birthDate: '',
      age: '',
      gender: '',
      cpf: '',
      phone: '',
      email: '',
      indication: ''
    });
  };

  // Imprimir solicitação
  const handlePrint = () => {
    window.print();
  };

  // Validação para impressão
  const canPrint = patientData.name && selectedCount > 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #print-request-area,
            #print-request-area * {
              visibility: visible;
            }
            #print-request-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .no-print {
              display: none !important;
            }
            @page {
              size: A4;
              margin: 1cm;
            }
          }
        `}
      </style>

      {/* Botões de ação no topo */}
      <Box className="no-print" sx={{ mb: 3 }}>
        <PrescriptionActions
          patientData={savedPatientData}
          contentRef={contentRef}
          contentTitle="Solicitacao_Exames"
          onBack={goToDashboard}
          printDisabled={!canPrint}
        />
      </Box>

      <Box className="no-print">
        <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', fontWeight: 600 }}>
            📋 Solicitação de Exames Laboratoriais
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Selecione os exames necessários e preencha os dados do paciente para gerar a solicitação médica.
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* SEÇÃO 1: Dados do Paciente */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 600, mb: 2 }}>
              👤 Dados do Paciente
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Nome Completo do Paciente *"
                  value={patientData.name}
                  onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Data de Nascimento *"
                  type="date"
                  value={patientData.birthDate}
                  onChange={handleBirthDateChange}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  fullWidth
                  label="Idade"
                  value={patientData.age}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  fullWidth
                  select
                  label="Sexo"
                  value={patientData.gender}
                  onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  <option value=""></option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="CPF"
                  value={patientData.cpf}
                  onChange={(e) => setPatientData({ ...patientData, cpf: e.target.value })}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Telefone"
                  value={patientData.phone}
                  onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Indicação Clínica / Hipótese Diagnóstica"
                  value={patientData.indication}
                  onChange={(e) => setPatientData({ ...patientData, indication: e.target.value })}
                  multiline
                  rows={2}
                  variant="outlined"
                  placeholder="Descreva brevemente a indicação clínica para os exames solicitados"
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<ClearIcon />}
                onClick={clearPatientData}
                size="small"
              >
                Limpar Dados do Paciente
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* SEÇÃO 2: Seleção de Exames */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>
                🔬 Seleção de Exames
              </Typography>
              <Box>
                <Chip 
                  label={`${selectedCount} exame(s) selecionado(s)`} 
                  color={selectedCount > 0 ? 'primary' : 'default'}
                  sx={{ mr: 1 }}
                />
                {selectedCount > 0 && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<ClearIcon />}
                    onClick={clearAllExams}
                    size="small"
                  >
                    Limpar Seleção
                  </Button>
                )}
              </Box>
            </Box>

            {/* Busca */}
            <TextField
              fullWidth
              placeholder="Buscar exame por nome ou finalidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
              sx={{ mb: 3 }}
            />

            {/* Acordeões de Categorias */}
            {filteredCategories.length === 0 ? (
              <Alert severity="info">
                Nenhum exame encontrado para "{searchTerm}".
              </Alert>
            ) : (
              filteredCategories.map(category => {
                const categoryExams = getFilteredExams(category);
                if (categoryExams.length === 0) return null;

                const allSelected = categoryExams.every(exam => selectedExams[exam.key]);
                const someSelected = categoryExams.some(exam => selectedExams[exam.key]);

                return (
                  <Accordion 
                    key={category}
                    expanded={expandedCategory === category}
                    onChange={(_, isExpanded) => setExpandedCategory(isExpanded ? category : false)}
                    sx={{ mb: 1 }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Checkbox
                          checked={allSelected}
                          indeterminate={someSelected && !allSelected}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCategory(category, categoryExams);
                          }}
                        />
                        <Typography sx={{ fontWeight: 600, flex: 1 }}>
                          {category}
                        </Typography>
                        <Chip 
                          label={`${categoryExams.filter(e => selectedExams[e.key]).length}/${categoryExams.length}`}
                          size="small"
                          color={categoryExams.some(e => selectedExams[e.key]) ? 'primary' : 'default'}
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box>
                        {categoryExams.map(exam => (
                          <Box 
                            key={exam.key} 
                            sx={{ 
                              p: 2, 
                              mb: 1, 
                              border: '1px solid #e0e0e0', 
                              borderRadius: 1,
                              backgroundColor: selectedExams[exam.key] ? '#e3f2fd' : 'white'
                            }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={!!selectedExams[exam.key]}
                                  onChange={() => toggleExam(exam.key, exam, category)}
                                />
                              }
                              label={
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    {exam.name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    <strong>Finalidade:</strong> {exam.objective}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    <strong>Preparo:</strong> {exam.preparation} • <strong>Material:</strong> {exam.material}
                                  </Typography>
                                </Box>
                              }
                              sx={{ width: '100%', alignItems: 'flex-start' }}
                            />
                          </Box>
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                );
              })
            )}
          </Box>
        </Paper>

        {/* PREVIEW DA REQUISIÇÃO - Exames Selecionados */}
        {selectedCount > 0 && patientData.name && (
          <Paper elevation={3} sx={{ p: 4, mt: 3 }} id="print-request-area" ref={contentRef}>
            {/* Cabeçalho - apenas na impressão */}
            <Box sx={{ display: 'none', '@media print': { display: 'block' } }}>
              <PrescriptionHeader entry={savedPatientData} />
              
              {/* Título da Solicitação */}
              <Box sx={{ textAlign: 'center', mb: 3, mt: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
                  SOLICITAÇÃO DE EXAMES LABORATORIAIS
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Data de Emissão: {new Date().toLocaleDateString('pt-BR', { 
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </Typography>
              </Box>
            </Box>

            {/* Título para tela */}
            <Box sx={{ '@media print': { display: 'none' } }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 600, mb: 3, textAlign: 'center' }}>
                📋 Prévia da Solicitação de Exames
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Box>

            {/* Dados do Paciente - Preview */}
            <Box sx={{ mb: 3, p: 2, border: '2px solid #1976d2', borderRadius: 2, backgroundColor: '#f8f9fa' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: '#1976d2', borderBottom: '1px solid #1976d2', pb: 0.5 }}>
                Dados do Paciente
              </Typography>
              <Grid container spacing={1.5}>
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: '0.95rem' }}>
                    <strong>Nome:</strong> {patientData.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ fontSize: '0.9rem' }}>
                    <strong>Data de Nascimento:</strong> {patientData.birthDate ? new Date(patientData.birthDate + 'T00:00:00').toLocaleDateString('pt-BR') : ''}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography sx={{ fontSize: '0.9rem' }}>
                    <strong>Idade:</strong> {patientData.age} anos
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography sx={{ fontSize: '0.9rem' }}>
                    <strong>Sexo:</strong> {patientData.gender}
                  </Typography>
                </Grid>
                {patientData.cpf && (
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: '0.9rem' }}>
                      <strong>CPF:</strong> {patientData.cpf}
                    </Typography>
                  </Grid>
                )}
                {patientData.phone && (
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: '0.9rem' }}>
                      <strong>Telefone:</strong> {patientData.phone}
                    </Typography>
                  </Grid>
                )}
                {patientData.indication && (
                  <Grid item xs={12}>
                    <Typography sx={{ fontSize: '0.9rem', mt: 1 }}>
                      <strong>Indicação Clínica:</strong> {patientData.indication}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>

            {/* Lista de Exames Solicitados - Preview */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: '#1976d2', borderBottom: '1px solid #1976d2', pb: 0.5 }}>
                Exames Solicitados ({selectedCount})
              </Typography>
              
              <TableContainer sx={{ border: '1px solid #ddd', borderRadius: 1 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                      <TableCell sx={{ fontWeight: 700, width: '40%' }}>Exame</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '25%' }}>Categoria</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '20%' }}>Material</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Preparo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(selectedExams).map(([examName, examData], index) => (
                      <TableRow key={examName} sx={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 600 }}>{examData.name}</TableCell>
                        <TableCell>{examData.category}</TableCell>
                        <TableCell>{examData.material}</TableCell>
                        <TableCell sx={{ fontSize: '0.85rem' }}>{examData.preparation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Instruções */}
            <Box sx={{ mb: 3, p: 2, backgroundColor: '#fff8e1', border: '1px solid #ffc107', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
                ⚠️ Instruções Importantes:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                • O paciente deve apresentar este documento no laboratório junto com documento de identificação com foto.<br />
                • Observe atentamente as instruções de preparo de cada exame.<br />
                • Este documento é válido somente com assinatura e carimbo do profissional solicitante.
                <span style={{ display: 'none' }} className="print-show">
                  <br />• Esta solicitação foi salva automaticamente e está disponível para consultas futuras.
                </span>
              </Typography>
            </Box>

            {/* Área de Assinatura e Carimbo - apenas na impressão */}
            <Box sx={{ display: 'none', '@media print': { display: 'block' }, mt: 5, pt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="body2" sx={{ mb: 0.5, fontSize: '0.85rem' }}>
                      {new Date().toLocaleDateString('pt-BR', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ borderTop: '2px solid #000', pt: 1, mt: 5, mx: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        Wander Pires Silva Coelho
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                        Terapeuta Integrativo Funcional
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                        CRTH: [Número de Registro]
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ 
                      border: '2px dashed #999', 
                      borderRadius: 1, 
                      p: 3, 
                      mt: 2,
                      mx: 2,
                      minHeight: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                        Espaço para Carimbo
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Rodapé - apenas na impressão */}
            <Box sx={{ display: 'none', '@media print': { display: 'block' }, mt: 4 }}>
              <PrescriptionFooter />
            </Box>

            {/* Informações de Salvamento - apenas na tela */}
            <Box sx={{ '@media print': { display: 'none' } }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  ✓ Solicitação salva automaticamente • {selectedCount} exame(s) selecionado(s) • 
                  Última atualização: {new Date().toLocaleString('pt-BR')}
                </Typography>
              </Alert>

              {/* Botão de Impressão */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<PrintIcon />}
                  onClick={handlePrint}
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Imprimir Solicitação de Exames
                </Button>
              </Box>
            </Box>
          </Paper>
        )}

        {!canPrint && selectedCount > 0 && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Preencha o nome do paciente para visualizar a prévia da solicitação e imprimir.
          </Alert>
        )}
      </Box>  {/* Fecha Box className="no-print" */}
    </Container>
  );
};

export default ExamRequestForm;
