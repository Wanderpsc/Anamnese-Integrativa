import { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Button, 
  TextField,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useNavigate } from 'react-router-dom';

/**
 * Página para gerenciar dados terapêuticos
 * Permite importar informações dos arquivos de apoio
 */
export default function TherapeuticDataManager() {
  const navigate = useNavigate();
  const [uploadStatus, setUploadStatus] = useState(null);
  const [customData, setCustomData] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      setCustomData(text);
      setUploadStatus({ type: 'success', message: `Arquivo "${file.name}" carregado com sucesso!` });
    } catch (error) {
      setUploadStatus({ type: 'error', message: 'Erro ao ler arquivo. Tente novamente.' });
    }
  };

  const handleSaveCustomData = () => {
    try {
      // Save to localStorage for now (can be expanded to use backend)
      const existing = JSON.parse(localStorage.getItem('customTherapeuticData') || '[]');
      existing.push({
        id: Date.now(),
        data: customData,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('customTherapeuticData', JSON.stringify(existing));
      
      setUploadStatus({ type: 'success', message: 'Dados salvos com sucesso!' });
      setCustomData('');
    } catch (error) {
      setUploadStatus({ type: 'error', message: 'Erro ao salvar dados.' });
    }
  };

  const instructionsForImport = `
📁 Como importar seus arquivos de apoio:

1. Localize a pasta: E:\\1. Nova pasta\\WANDER PIRES\\1 - VIVA MELHOR - ORGANIZANDO\\APOIO PARA FAZER AS ANÁLISES

2. Copie os arquivos para dentro do projeto:
   - Crie uma pasta: src/assets/therapeutic-data/
   - Cole seus arquivos nesta pasta

3. Formatos aceitos:
   - Documentos de texto (.txt, .docx)
   - Planilhas (.xlsx, .csv)
   - PDFs (.pdf)

4. Estrutura recomendada dos arquivos:
   - Organize por problema de saúde
   - Liste alimentos recomendados
   - Liste suplementos
   - Liste fitoterápicos
   - Inclua dosagens quando aplicável

5. Após copiar os arquivos, você pode:
   - Usar o botão "Upload" abaixo para carregar conteúdo
   - Ou editar diretamente o arquivo: src/config/therapeuticDatabase.js
  `;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ color: '#1976d2' }}>
            Gerenciador de Dados Terapêuticos
          </Typography>
          <Button variant="outlined" onClick={() => navigate('/dashboard')}>
            Voltar
          </Button>
        </Box>

        {uploadStatus && (
          <Alert severity={uploadStatus.type} sx={{ mb: 3 }} onClose={() => setUploadStatus(null)}>
            {uploadStatus.message}
          </Alert>
        )}

        {/* Instructions */}
        <Accordion sx={{ mb: 3 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">📖 Instruções de Importação</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ whiteSpace: 'pre-line', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              {instructionsForImport}
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* File Upload Section */}
        <Paper sx={{ p: 3, mb: 3, background: '#f5f5f5' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            <UploadFileIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Upload de Arquivo
          </Typography>
          
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadFileIcon />}
            sx={{ mb: 2 }}
          >
            Selecionar Arquivo
            <input
              type="file"
              hidden
              accept=".txt,.doc,.docx,.pdf,.csv,.xlsx"
              onChange={handleFileUpload}
            />
          </Button>

          {customData && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Conteúdo do Arquivo"
                multiline
                rows={10}
                fullWidth
                value={customData}
                onChange={(e) => setCustomData(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button 
                variant="contained" 
                color="success" 
                onClick={handleSaveCustomData}
              >
                Salvar Dados
              </Button>
            </Box>
          )}
        </Paper>

        {/* Current Database Info */}
        <Paper sx={{ p: 3, background: '#e3f2fd' }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
            📊 Base de Dados Atual
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            O sistema já possui uma base de dados com sugestões terapêuticas para os seguintes problemas:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Intestino Preso" color="primary" size="small" />
            <Chip label="Diarreia" color="primary" size="small" />
            <Chip label="Dores de Cabeça" color="primary" size="small" />
            <Chip label="Gases" color="primary" size="small" />
            <Chip label="Azia" color="primary" size="small" />
            <Chip label="Diabetes" color="primary" size="small" />
            <Chip label="Colesterol" color="primary" size="small" />
            <Chip label="Anemia" color="primary" size="small" />
            <Chip label="Insônia" color="primary" size="small" />
            <Chip label="Depressão" color="primary" size="small" />
            <Chip label="Ansiedade" color="primary" size="small" />
            <Chip label="Hipertensão" color="primary" size="small" />
          </Box>
          <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
            Para adicionar mais condições ou editar as existentes, edite o arquivo:
            <code style={{ 
              display: 'block', 
              background: '#fff', 
              padding: '8px', 
              marginTop: '8px',
              borderRadius: '4px',
              fontFamily: 'monospace'
            }}>
              src/config/therapeuticDatabase.js
            </code>
          </Typography>
        </Paper>

        {/* Quick Actions */}
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/dashboard')}
          >
            Ver Anamneses
          </Button>
          <Button 
            variant="outlined" 
            color="secondary"
            onClick={() => {
              const path = 'src/config/therapeuticDatabase.js';
              alert(`Abra o arquivo no VS Code:\n${path}`);
            }}
          >
            Editar Base de Dados
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
