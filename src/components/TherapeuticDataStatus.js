import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Chip, Alert, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { loadTherapeuticData } from '../lib/therapeuticDataLoader';

/**
 * Componente que exibe informações sobre os arquivos terapêuticos carregados
 * Útil para transparência e debugging
 */
export default function TherapeuticDataStatus({ showDetails = false }) {
  const [loadedFiles, setLoadedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const files = loadTherapeuticData();
      setLoadedFiles(files);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Carregando dados terapêuticos...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="warning" icon={<WarningIcon />}>
        Erro ao carregar arquivos terapêuticos: {error}
      </Alert>
    );
  }

  if (!showDetails) {
    return (
      <Chip 
        icon={<CheckCircleIcon />}
        label={`${loadedFiles.length} arquivos terapêuticos carregados`}
        color="success"
        size="small"
        sx={{ mb: 2 }}
      />
    );
  }

  return (
    <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <CheckCircleIcon color="success" sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ color: '#2e7d32' }}>
          Fontes de Conhecimento Terapêutico
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 2 }}>
        ✅ O sistema está analisando automaticamente <strong>{loadedFiles.length} arquivos</strong> da pasta therapeutic-data para enriquecer as sugestões terapêuticas.
      </Alert>

      {loadedFiles.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2">
              📚 Ver arquivos carregados ({loadedFiles.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {loadedFiles.map((file, idx) => (
                <Box 
                  key={idx} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 1, 
                    backgroundColor: '#fff',
                    borderRadius: 1,
                    border: '1px solid #e0e0e0'
                  }}
                >
                  <DescriptionIcon sx={{ mr: 1, color: '#1976d2', fontSize: 20 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {file.fileName}
                    </Typography>
                    {file.condition && (
                      <Chip 
                        label={file.condition.replace('_', ' ')} 
                        size="small" 
                        sx={{ mt: 0.5, fontSize: '0.7rem', height: 20 }}
                      />
                    )}
                  </Box>
                  {file.composition && file.composition.length > 0 && (
                    <Chip 
                      label={`${file.composition.length} compostos`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  )}
                </Box>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}

      <Box sx={{ mt: 2, p: 2, backgroundColor: '#fff3e0', borderRadius: 1 }}>
        <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600 }}>
          💡 Como funciona:
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', color: '#666' }}>
          • O sistema lê automaticamente todos os arquivos .txt da pasta therapeutic-data<br/>
          • Extrai composições, posologias e contraindicações<br/>
          • Integra essas informações nas sugestões terapêuticas geradas<br/>
          • Você pode adicionar novos arquivos e eles serão carregados automaticamente
        </Typography>
      </Box>
    </Paper>
  );
}
