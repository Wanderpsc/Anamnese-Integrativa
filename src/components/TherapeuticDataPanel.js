/**
 * Painel de Gerenciamento de Dados Terapêuticos Offline
 * Permite indexar, buscar e gerenciar os 342 arquivos locais
 */

import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  IconButton
} from '@mui/material';
import {
  CloudDownload as CloudDownloadIcon,
  Storage as StorageIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  ExpandMore as ExpandMoreIcon,
  Sync as SyncIcon,
  Delete as DeleteIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useTherapeuticData } from '../lib/useTherapeuticData';

export default function TherapeuticDataPanel() {
  const {
    isInitialized,
    isIndexing,
    stats,
    error,
    indexFiles,
    search,
    searchByCategory,
    isReady,
    categories
  } = useTherapeuticData();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedResult, setExpandedResult] = useState(null);
  const [showIndexPanel, setShowIndexPanel] = useState(false);

  /**
   * Inicia indexação
   */
  const handleIndex = async () => {
    try {
      await indexFiles();
      alert('✅ Indexação concluída com sucesso!');
    } catch (err) {
      alert(`❌ Erro na indexação: ${err.message}`);
    }
  };

  /**
   * Busca conteúdo
   */
  const handleSearch = async () => {
    if (!searchQuery || searchQuery.trim().length < 3) {
      alert('Digite pelo menos 3 caracteres para buscar');
      return;
    }

    try {
      setIsSearching(true);
      const results = await search(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    } catch (err) {
      alert(`❌ Erro na busca: ${err.message}`);
      setIsSearching(false);
    }
  };

  /**
   * Expande/colapsa resultado
   */
  const handleToggleResult = (index) => {
    setExpandedResult(expandedResult === index ? null : index);
  };

  /**
   * Calcula percentual indexado
   */
  const getIndexPercentage = () => {
    if (!stats || stats.totalFiles === 0) return 0;
    return Math.round((stats.indexedFiles / stats.totalFiles) * 100);
  };

  /**
   * Renderiza card de estatísticas
   */
  const renderStatsCard = () => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <StorageIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">
            Estatísticas do Banco
          </Typography>
        </Box>

        {stats ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Total de Arquivos
                </Typography>
                <Typography variant="h4">
                  {stats.totalFiles}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Indexados
                </Typography>
                <Typography variant="h4" color="success.main">
                  {stats.indexedFiles}
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Progresso
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {getIndexPercentage()}%
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={getIndexPercentage()} 
                sx={{ height: 8, borderRadius: 1 }}
              />
            </Box>

            {/* Categorias */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Categorias
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {Object.entries(stats.byCategory || {}).map(([category, count]) => (
                  <Chip
                    key={category}
                    label={`${category}: ${count}`}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          </>
        ) : (
          <Typography color="text.secondary">
            Carregando estatísticas...
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  /**
   * Renderiza painel de indexação
   */
  const renderIndexPanel = () => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CloudDownloadIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">
            Indexação de Dados
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            A indexação processa todos os 342 arquivos terapêuticos e cria um banco local para busca offline.
            Este processo pode levar alguns minutos na primeira vez.
          </Typography>
        </Alert>

        {stats && stats.indexedFiles === 0 ? (
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold">
              Nenhum arquivo indexado ainda.
            </Typography>
            <Typography variant="body2">
              Execute a indexação para começar a usar a busca offline.
            </Typography>
          </Alert>
        ) : stats && stats.indexedFiles < stats.totalFiles ? (
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="body2">
              {stats.totalFiles - stats.indexedFiles} arquivo(s) ainda não indexado(s).
            </Typography>
          </Alert>
        ) : stats && stats.indexedFiles === stats.totalFiles ? (
          <Alert severity="success" sx={{ mb: 2 }} icon={<CheckCircleIcon />}>
            <Typography variant="body2" fontWeight="bold">
              Todos os arquivos estão indexados!
            </Typography>
          </Alert>
        ) : null}

        <Button
          variant="contained"
          startIcon={isIndexing ? <SyncIcon /> : <CloudDownloadIcon />}
          onClick={handleIndex}
          disabled={isIndexing || !isInitialized}
          fullWidth
          size="large"
        >
          {isIndexing ? 'Indexando...' : 
           stats && stats.indexedFiles > 0 ? 'Reindexar Arquivos' : 'Iniciar Indexação'}
        </Button>

        {isIndexing && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress />
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              Processando arquivos terapêuticos...
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  /**
   * Renderiza painel de busca
   */
  const renderSearchPanel = () => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SearchIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">
            Busca de Tratamentos
          </Typography>
        </Box>

        {!isReady() ? (
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Execute a indexação primeiro para habilitar a busca.
            </Typography>
          </Alert>
        ) : null}

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Buscar sintomas, doenças, tratamentos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            disabled={!isReady() || isSearching}
            variant="outlined"
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={!isReady() || isSearching}
            sx={{ minWidth: 100 }}
          >
            {isSearching ? 'Buscando...' : 'Buscar'}
          </Button>
        </Box>

        {/* Resultados */}
        {searchResults.length > 0 && (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {searchResults.length} resultado(s) encontrado(s)
            </Typography>

            <List>
              {searchResults.map((result, index) => (
                <Box key={index}>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleToggleResult(index)}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body1" fontWeight="medium">
                              {result.fileName}
                            </Typography>
                            <Chip 
                              label={result.category} 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                            />
                            <Chip 
                              label={`Score: ${result.score}`} 
                              size="small" 
                              color="success"
                            />
                          </Box>
                        }
                        secondary={
                          result.snippets && result.snippets.length > 0
                            ? result.snippets[0].substring(0, 150) + '...'
                            : 'Clique para ver detalhes'
                        }
                      />
                      <IconButton edge="end">
                        <ExpandMoreIcon 
                          sx={{
                            transform: expandedResult === index ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s'
                          }}
                        />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>

                  <Collapse in={expandedResult === index}>
                    <Box sx={{ pl: 4, pr: 2, pb: 2 }}>
                      {result.snippets && result.snippets.map((snippet, i) => (
                        <Paper key={i} sx={{ p: 1.5, mb: 1, bgcolor: 'grey.50' }}>
                          <Typography variant="body2" color="text.secondary">
                            {snippet}
                          </Typography>
                        </Paper>
                      ))}
                      
                      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Tamanho: {(result.textLength / 1024).toFixed(1)} KB
                        </Typography>
                      </Box>
                    </Box>
                  </Collapse>

                  <Divider />
                </Box>
              ))}
            </List>
          </Box>
        )}

        {searchQuery && searchResults.length === 0 && !isSearching && (
          <Alert severity="info">
            <Typography variant="body2">
              Nenhum resultado encontrado para "{searchQuery}"
            </Typography>
          </Alert>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Gerenciamento de Dados Terapêuticos Offline
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sistema local de indexação e busca em 342 arquivos terapêuticos (PDFs, protocolos, fórmulas).
        </Typography>

        {!isInitialized && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Inicializando banco de dados...
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <Typography variant="body2" fontWeight="bold">
              Erro: {error}
            </Typography>
          </Alert>
        )}
      </Paper>

      {/* Stats + Index Panel */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          {renderStatsCard()}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderIndexPanel()}
        </Grid>
      </Grid>

      {/* Search Panel */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {renderSearchPanel()}
        </Grid>
      </Grid>

      {/* Info Footer */}
      <Paper sx={{ p: 2, mt: 3, bgcolor: 'info.light' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <InfoIcon color="info" />
          <Box>
            <Typography variant="body2" fontWeight="bold">
              Funcionamento Offline
            </Typography>
            <Typography variant="body2">
              Após a indexação, todas as buscas funcionam offline usando dados locais (IndexedDB).
              Quando online, o sistema pode enriquecer resultados com APIs externas.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
