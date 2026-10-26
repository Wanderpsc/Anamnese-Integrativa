import { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, Button, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl } from '../components/PrintTemplate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import AdvancedTherapyProtocols from '../components/AdvancedTherapyProtocols';
import PrescriptionHeader from '../components/PrescriptionHeader';
import PrintSelectionDialog from '../components/PrintSelectionDialog';
import SaveToPatientBar from '../components/SaveToPatientBar';

/**
 * Página de Protocolos Terapêuticos Avançados
 * Homeopatia, Aromaterapia e Óleos Essenciais
 * Integrado automaticamente com dados da anamnese
 */
export default function AdvancedTherapies() {
  const navigate = useNavigate();
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [anamneseData, setAnamneseData] = useState(null);
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const [autoSearchResults, setAutoSearchResults] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  // Carregar dados da anamnese do paciente atual
  useEffect(() => {
    const currentPatientId = localStorage.getItem('currentPatientId');
    if (currentPatientId) {
      const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const anamnese = anamneses.find(a => String(a.id) === String(currentPatientId));
      
      if (anamnese) {
        setAnamneseData(anamnese);
        
        // Extrair condições/sintomas da anamnese
        const conditions = [];
        
        // Queixa principal
        if (anamnese.q15_queixa_principal) {
          conditions.push(anamnese.q15_queixa_principal);
        }
        
        // Sintomas e carências
        if (anamnese.q17a_sintomas_selecionados) {
          conditions.push(...anamnese.q17a_sintomas_selecionados);
        }
        
        // Histórico de saúde
        if (anamnese.q25_doencas_cronicas) {
          conditions.push(anamnese.q25_doencas_cronicas);
        }
        
        setSelectedConditions(conditions);
      }
    }
  }, []);

  // Salvar tratamentos automaticamente quando mudarem
  useEffect(() => {
    const currentPatientId = localStorage.getItem('currentPatientId');
    if (currentPatientId && autoSearchResults.length > 0) {
      const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const index = anamneses.findIndex(a => String(a.id) === String(currentPatientId));
      
      if (index !== -1) {
        // Separar por tipo de tratamento baseado na aba ativa
        if (activeTab === 0) {
          anamneses[index].tratamentosHomeopatia = autoSearchResults;
        } else if (activeTab === 1) {
          anamneses[index].tratamentosAromaterapia = autoSearchResults;
        } else if (activeTab === 2) {
          anamneses[index].tratamentosOleosEssenciais = autoSearchResults;
        }
        
        // Consolidar TODOS os tratamentos no campo advancedTherapiesData
        const consolidatedTherapies = [
          ...(anamneses[index].tratamentosHomeopatia || []),
          ...(anamneses[index].tratamentosAromaterapia || []),
          ...(anamneses[index].tratamentosOleosEssenciais || [])
        ];
        
        anamneses[index].advancedTherapiesData = consolidatedTherapies;
        anamneses[index].updatedAt = new Date().toISOString();
        
        console.log('✅ Tratamentos salvos:', {
          homeopatia: anamneses[index].tratamentosHomeopatia?.length || 0,
          aromaterapia: anamneses[index].tratamentosAromaterapia?.length || 0,
          oleosEssenciais: anamneses[index].tratamentosOleosEssenciais?.length || 0,
          total: consolidatedTherapies.length
        });
        
        localStorage.setItem('anamneses', JSON.stringify(anamneses));
        
        // Disparar evento para atualizar outras páginas
        try {
          window.dispatchEvent(new CustomEvent('anamneses:updated', { 
            detail: anamneses[index] 
          }));
        } catch (e) {
          console.error('Erro ao disparar evento:', e);
        }
      }
    }
  }, [autoSearchResults, activeTab]);

  const handleOpenPrintDialog = () => {
    setPrintDialogOpen(true);
  };

  const handleClosePrintDialog = () => {
    setPrintDialogOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }} className="print-container">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }} className="no-print">
          <Typography variant="h4" color="primary">
            🌿 Protocolos Terapêuticos Avançados
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="outlined" 
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Voltar
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<PrintIcon />}
              onClick={handleOpenPrintDialog}
            >
              Imprimir
            </Button>
            <Button 
              variant="contained" 
              startIcon={<DownloadIcon />}
              onClick={handleOpenPrintDialog}
            >
              Download PDF
            </Button>
          </Box>
        </Box>

        <AdvancedTherapyProtocols 
          selectedConditions={selectedConditions}
          anamneseData={anamneseData}
          onAutoSearchResultsChange={setAutoSearchResults}
          onSearchResultsChange={setSearchResults}
          onActiveTabChange={setActiveTab}
        />
      </Paper>

      <PrintSelectionDialog
        open={printDialogOpen}
        onClose={handleClosePrintDialog}
        autoSearchResults={autoSearchResults}
        searchResults={searchResults}
        activeTab={activeTab}
        patientData={anamneseData}
      />

      <SaveToPatientBar
        moduleKey="advancedTherapiesData"
        getData={() => autoSearchResults.length > 0 ? {
          homeopathy: autoSearchResults.filter(r => r.type === 'homeopathy' || r.result?.remedies),
          aromatherapy: autoSearchResults.filter(r => r.type === 'aromatherapy'),
          essentialOils: autoSearchResults.filter(r => r.type === 'essentialOils'),
          conditions: selectedConditions,
          savedAt: new Date().toISOString(),
        } : null}
        label="Salvar protocolos terapêuticos no interagente"
      />
    </Container>
  );
}
