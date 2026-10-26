import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  TextField,
  IconButton,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl } from './PrintTemplate';
import PrescriptionHeader from './PrescriptionHeader';
import PrescriptionFooter from './PrescriptionFooter';

/**
 * Componente de Quadro de Tratamento Completo
 * Editável, Imprimível e com Download
 */
export default function CompleteTreatmentBoard({ patientData, therapeuticData = [] }) {
  const [editMode, setEditMode] = useState(false);
  const [treatments, setTreatments] = useState({});

  useEffect(() => {
    // Initialize treatments from therapeutic data with full details
    const initialized = {};
    therapeuticData.forEach(item => {
      initialized[item.title] = {
        supplements: item.supplements || [],
        herbs: item.herbs || [],
        homeopathy: item.homeopathy || [],
        quantumFlorals: item.quantumFlorals || [],
        hydrotherapy: item.hydrotherapy || [],
        geotherapy: item.geotherapy || [],
        tcm: item.tcm || [],
        otherTherapies: item.otherTherapies || [],
        foods: item.foods || []
      };
    });
    setTreatments(initialized);
  }, [therapeuticData]);

  // Extract all patient symptoms and conditions from checkboxes and text fields
  const getPatientSymptoms = () => {
    if (!patientData) return [];
    
    const symptoms = [];
    
    // Collect all checked symptoms (boolean fields)
    Object.keys(patientData).forEach(key => {
      if (patientData[key] === true && !key.includes('confirm') && !key.includes('sim')) {
        symptoms.push({
          field: key,
          value: 'Sim',
          type: 'checkbox'
        });
      }
    });
    
    // Collect all text field data (questionnaire responses)
    Object.keys(patientData).forEach(key => {
      if (typeof patientData[key] === 'string' && patientData[key].trim() !== '' && 
          !key.includes('id') && !key.includes('createdAt') && !key.includes('modelUsed')) {
        symptoms.push({
          field: key,
          value: patientData[key],
          type: 'text'
        });
      }
    });
    
    return symptoms;
  };

  const addItem = (problem, category) => {
    const newTreatments = { ...treatments };
    if (!newTreatments[problem]) newTreatments[problem] = {};
    if (!newTreatments[problem][category]) newTreatments[problem][category] = [];
    newTreatments[problem][category].push('');
    setTreatments(newTreatments);
  };

  const updateItem = (problem, category, index, value) => {
    const newTreatments = { ...treatments };
    newTreatments[problem][category][index] = value;
    setTreatments(newTreatments);
  };

  const removeItem = (problem, category, index) => {
    const newTreatments = { ...treatments };
    newTreatments[problem][category].splice(index, 1);
    setTreatments(newTreatments);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('treatment-board-print-area');
    try {
      const bodyHtml = element.innerHTML;
      const title = `protocolo_tratamento_${patientData?.nome || 'paciente'}`;
      const qr = `${window.location.origin}/tratamento/${patientData?.id || ''}`;
      const qrUrl = await generateQrDataUrl(qr);
      const html = await buildLetterheadHtml({ title, bodyHtml, qrUrl });
      await downloadPdfFromHtml(html, `${title}.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
      window.print();
    }
  };

  const categories = [
    { key: 'supplements', label: 'A - Suplementos', icon: '💊', color: '#4caf50' },
    { key: 'herbs', label: 'B - Fitoterápicos', icon: '🌿', color: '#8bc34a' },
    { key: 'homeopathy', label: 'C - Homeopáticos', icon: '💧', color: '#2196f3' },
    { key: 'quantumFlorals', label: 'D - Florais Quânticos', icon: '🌸', color: '#9c27b0' },
    { key: 'hydrotherapy', label: 'E - Hidroterapia', icon: '💦', color: '#00bcd4' },
    { key: 'geotherapy', label: 'F - Geoterapia', icon: '🏔️', color: '#795548' },
    { key: 'tcm', label: 'G - MTC (Medicina Tradicional Chinesa)', icon: '☯️', color: '#ff9800' },
    { key: 'otherTherapies', label: 'H - Outras Terapias', icon: '🧘', color: '#607d8b' }
  ];

  return (
    <Box>
      {/* Action Buttons */}
      <Box className="no-print" sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'flex-end' }}>
        <Button
          variant={editMode ? 'contained' : 'outlined'}
          color={editMode ? 'success' : 'primary'}
          startIcon={editMode ? <SaveIcon /> : <EditIcon />}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Salvar Edições' : 'Editar Protocolo'}
        </Button>
        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
        >
          Imprimir
        </Button>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
      </Box>

      {/* Printable Area */}
      <Paper 
        id="treatment-board-print-area"
        sx={{ 
          p: 4,
          background: '#fff',
          border: '2px solid #1976d2',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 50%, #1976d2 100%)'
          }
        }}
      >
        {/* Professional Prescription Header */}
        <PrescriptionHeader entry={patientData} />

        {/* Page Title */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
            📋 Protocolo de Tratamento Integrativo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sugestão Terapêutica Natural Personalizada
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Patient Data Summary */}
        {patientData && (
          <Box sx={{ mb: 4, p: 3, background: '#f8f9fa', borderRadius: 2, pageBreakInside: 'avoid' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 600 }}>
              📊 Dados Coletados do Paciente
            </Typography>
            
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>
                  ✓ Sintomas e Condições Marcados
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 1 }}>
                  {patientData.sintomas && patientData.sintomas.length > 0 ? (
                    patientData.sintomas.map((symptom, idx) => (
                      <Chip 
                        key={idx}
                        label={symptom.replace(/_/g, ' ').toUpperCase()}
                        color="primary"
                        size="small"
                        sx={{ justifyContent: 'flex-start' }}
                      />
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">Nenhum sintoma marcado</Typography>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mt: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>
                  📝 Informações Escritas pelo Paciente
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      {Object.keys(patientData)
                        .filter(key => 
                          typeof patientData[key] === 'string' && 
                          patientData[key].trim() !== '' &&
                          !['id', 'createdAt', 'updatedAt', 'modelUsed', 'nome', 'data_nasc'].includes(key)
                        )
                        .map((key, idx) => (
                          <TableRow key={idx}>
                            <TableCell sx={{ fontWeight: 600, width: '40%', verticalAlign: 'top' }}>
                              {key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}:
                            </TableCell>
                            <TableCell sx={{ whiteSpace: 'pre-wrap' }}>
                              {patientData[key]}
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>

            {/* Health Metrics */}
            {(patientData.bmiInfo || patientData.whrInfo || patientData.altura_cm || patientData.peso_kg) && (
              <Accordion sx={{ mt: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600 }}>
                    📈 Dados Antropométricos e Saúde
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
                    {patientData.altura_cm && (
                      <Box>
                        <Typography variant="caption" color="text.secondary">Altura</Typography>
                        <Typography variant="body1">{patientData.altura_cm} cm</Typography>
                      </Box>
                    )}
                    {patientData.peso_kg && (
                      <Box>
                        <Typography variant="caption" color="text.secondary">Peso</Typography>
                        <Typography variant="body1">{patientData.peso_kg} kg</Typography>
                      </Box>
                    )}
                    {patientData.bmiInfo && (
                      <Box>
                        <Typography variant="caption" color="text.secondary">IMC</Typography>
                        <Typography variant="body1">{patientData.bmiInfo.bmi} - {patientData.bmiInfo.category}</Typography>
                      </Box>
                    )}
                    {patientData.whrInfo && (
                      <Box>
                        <Typography variant="caption" color="text.secondary">WHR (Cintura/Quadril)</Typography>
                        <Typography variant="body1">{patientData.whrInfo.ratio} - {patientData.whrInfo.risk}</Typography>
                      </Box>
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>
            )}
          </Box>
        )}

        {/* Treatment Tables by Problem */}
        {Object.entries(treatments).map(([problem, categories_data], problemIndex) => (
          <Box key={problemIndex} sx={{ mb: 4, pageBreakInside: 'avoid' }}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 2, 
                color: '#1976d2',
                fontWeight: 600,
                borderBottom: '2px solid #1976d2',
                pb: 1
              }}
            >
              {problem}
            </Typography>

            {categories.map(({ key, label, icon, color }) => {
              const items = categories_data[key] || [];
              if (items.length === 0 && !editMode) return null;

              return (
                <Accordion key={key} defaultExpanded sx={{ mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600, color }}>
                      {icon} {label}
                      <Chip 
                        label={items.length} 
                        size="small" 
                        sx={{ ml: 2 }} 
                      />
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 3 }}>
                    {editMode ? (
                      <Box>
                        {items.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                            <TextField
                              fullWidth
                              size="small"
                              value={item}
                              onChange={(e) => updateItem(problem, key, index, e.target.value)}
                              placeholder={`Adicionar ${label.toLowerCase()}`}
                            />
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => removeItem(problem, key, index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        ))}
                        <Button
                          size="small"
                          startIcon={<AddIcon />}
                          onClick={() => addItem(problem, key)}
                        >
                          Adicionar Item
                        </Button>
                      </Box>
                    ) : (
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600, background: '#f5f5f5' }}>
                                Tratamento
                              </TableCell>
                              <TableCell sx={{ fontWeight: 600, background: '#f5f5f5', width: '30%' }}>
                                Dosagem e Posologia
                              </TableCell>
                              <TableCell sx={{ fontWeight: 600, background: '#f5f5f5', width: '30%' }}>
                                Fonte de Pesquisa
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {items.map((item, index) => {
                              // Parse treatment, dosage, posology and source
                              const parts = item.split(' | ');
                              const treatment = parts[0] || item;
                              const dosage = parts[1] || '';
                              const posology = parts[2] || '';
                              const source = parts[3] || '';
                              
                              return (
                                <TableRow key={index}>
                                  <TableCell sx={{ borderBottom: '1px solid #f0f0f0' }}>
                                    • {treatment}
                                  </TableCell>
                                  <TableCell sx={{ 
                                    borderBottom: '1px solid #f0f0f0',
                                    fontSize: '0.8rem',
                                    color: '#555',
                                    whiteSpace: 'pre-wrap'
                                  }}>
                                    {dosage && <div><strong>Dose:</strong> {dosage.replace('Dose:', '').trim()}</div>}
                                    {posology && <div><strong>Posologia:</strong> {posology.replace('Posologia:', '').trim()}</div>}
                                  </TableCell>
                                  <TableCell sx={{ 
                                    borderBottom: '1px solid #f0f0f0',
                                    fontSize: '0.75rem',
                                    color: '#666',
                                    fontStyle: 'italic'
                                  }}>
                                    {source ? source.replace('Fonte:', '').trim() : '—'}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        ))}

        {/* Professional Prescription Footer with Stamp */}
        <PrescriptionFooter />
      </Paper>
    </Box>
  );
}
