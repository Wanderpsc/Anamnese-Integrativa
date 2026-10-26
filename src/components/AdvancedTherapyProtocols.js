import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Chip,
  Stack,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid,
  Checkbox,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  LocalPharmacy as PharmacyIcon,
  Spa as SpaIcon,
  Search as SearchIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import HOMEOPATHY_DATABASE, { searchRemedy, HOMEOPATHY_INSTRUCTIONS } from '../config/homeopathy';
import AROMATHERAPY_DATABASE, { searchOil, APPLICATION_METHODS, SAFETY_GUIDELINES } from '../config/aromatherapy';
import ESSENTIAL_OILS_DATABASE, { searchEssentialOil, ESSENTIAL_OILS_INSTRUCTIONS } from '../config/essential-oils';

/**
 * Componente de Protocolos Terapêuticos Avançados
 * Homeopatia, Aromaterapia e Óleos Essenciais
 */
export default function AdvancedTherapyProtocols({ 
  selectedConditions = [], 
  anamneseData = null,
  onAutoSearchResultsChange = () => {},
  onSearchResultsChange = () => {},
  onActiveTabChange = () => {}
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [autoSearchResults, setAutoSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [manualSelectedRemedies, setManualSelectedRemedies] = useState({});

  // Função para adicionar resultado manual aos tratamentos
  const handleAddManualResultToTreatment = () => {
    if (!searchResults) return;
    
    // Criar estrutura compatível com autoSearchResults
    const newItem = {
      condition: searchResults.condition || searchResults.category || searchResults.title || searchTerm,
      result: searchResults,
      isManual: true
    };
    
    // Adicionar ao array de resultados automáticos
    const updatedResults = [...autoSearchResults, newItem];
    setAutoSearchResults(updatedResults);
    
    // Marcar todos os remédios/óleos como selecionados por padrão
    const newSelectedItems = { ...selectedItems };
    const idx = updatedResults.length - 1;
    
    if (searchResults.remedies) {
      searchResults.remedies.forEach((remedy, rIdx) => {
        const key = `${activeTab}_${idx}_remedy_${rIdx}_${remedy.name}`;
        newSelectedItems[key] = true;
      });
    } else if (searchResults.oils) {
      searchResults.oils.forEach((oil, oIdx) => {
        const key = `${activeTab}_${idx}_remedy_${oIdx}_${oil.name}`;
        newSelectedItems[key] = true;
      });
    }
    
    setSelectedItems(newSelectedItems);
    
    // Notificar mudança
    onAutoSearchResultsChange(updatedResults);
    
    // Limpar busca
    setSearchResults(null);
    setSearchTerm('');
  };

  // Auto-busca baseada nas condições da anamnese
  useEffect(() => {
    if (selectedConditions.length > 0) {
      const results = [];
      
      selectedConditions.forEach(condition => {
        if (activeTab === 0) {
          // Busca homeopatia
          const result = searchRemedy(condition);
          if (result) {
            results.push({
              condition,
              result
            });
          }
        } else if (activeTab === 1) {
          // Busca aromaterapia
          const result = searchOil(condition);
          if (result) {
            results.push({
              condition,
              result
            });
          }
        } else if (activeTab === 2) {
          // Busca óleos essenciais
          const result = searchEssentialOil(condition);
          if (result) {
            results.push({
              condition,
              result
            });
          }
        }
      });
      
      setAutoSearchResults(results);
      
      // Inicializar estado de seleção para novos itens (remédios individuais)
      setSelectedItems(prevItems => {
        const newSelectedItems = { ...prevItems };
        results.forEach((item, idx) => {
          // Marcar remédios/óleos individuais
          if (item.result?.remedies) {
            item.result.remedies.forEach((remedy, rIdx) => {
              const key = `${activeTab}_${idx}_remedy_${rIdx}_${remedy.name}`;
              if (newSelectedItems[key] === undefined) {
                newSelectedItems[key] = true; // Marcar por padrão
              }
            });
          } else if (item.result?.oils) {
            item.result.oils.forEach((oil, oIdx) => {
              const key = `${activeTab}_${idx}_remedy_${oIdx}_${oil.name}`;
              if (newSelectedItems[key] === undefined) {
                newSelectedItems[key] = true; // Marcar por padrão
              }
            });
          }
        });
        return newSelectedItems;
      });
      
      // Passar apenas os itens selecionados
      setTimeout(() => {
        const selectedResults = results.filter((item, idx) => {
          const key = `${activeTab}_${idx}_${item.condition}`;
          const currentSelected = selectedItems[key];
          return currentSelected === undefined || currentSelected === true;
        });
        onAutoSearchResultsChange(selectedResults);
      }, 100);
    } else {
      setAutoSearchResults([]);
      setSelectedItems({});
      onAutoSearchResultsChange([]);
    }
  }, [selectedConditions, activeTab]);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    let result = null;
    if (activeTab === 0) {
      // Busca Homeopatia
      result = searchRemedy(searchTerm);
    } else if (activeTab === 1) {
      // Busca Aromaterapia
      result = searchOil(searchTerm);
    } else if (activeTab === 2) {
      // Busca Óleos Essenciais
      result = searchEssentialOil(searchTerm);
    }
    setSearchResults(result);
    onSearchResultsChange(result);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    onActiveTabChange(newValue);
    setSearchResults(null);
    onSearchResultsChange(null);
  };

  const handleToggleItem = (idx, condition) => {
    const key = `${activeTab}_${idx}_${condition}`;
    const newSelectedItems = {
      ...selectedItems,
      [key]: !selectedItems[key]
    };
    setSelectedItems(newSelectedItems);
    
    // Atualizar lista de itens selecionados
    const selectedResults = autoSearchResults.filter((item, itemIdx) => {
      const itemKey = `${activeTab}_${itemIdx}_${item.condition}`;
      return newSelectedItems[itemKey];
    });
    onAutoSearchResultsChange(selectedResults);
  };

  // Nova função para alternar seleção de remédio individual
  const handleToggleRemedy = (conditionIdx, remedyIdx, remedyName) => {
    const key = `${activeTab}_${conditionIdx}_remedy_${remedyIdx}_${remedyName}`;
    const newSelectedItems = {
      ...selectedItems,
      [key]: !selectedItems[key]
    };
    setSelectedItems(newSelectedItems);
    
    // Filtrar e retornar apenas os remédios selecionados
    const selectedResults = autoSearchResults.map((item, itemIdx) => {
      if (activeTab === 0 && item.result?.remedies) {
        // Homeopatia - filtrar remédios selecionados
        const selectedRemedies = item.result.remedies.filter((remedy, rIdx) => {
          const rKey = `${activeTab}_${itemIdx}_remedy_${rIdx}_${remedy.name}`;
          return newSelectedItems[rKey] !== false;
        });
        if (selectedRemedies.length > 0) {
          return {
            ...item,
            result: {
              ...item.result,
              remedies: selectedRemedies
            }
          };
        }
        return null;
      } else if ((activeTab === 1 || activeTab === 2) && item.result?.oils) {
        // Aromaterapia e Óleos - filtrar óleos selecionados
        const selectedOils = item.result.oils.filter((oil, oIdx) => {
          const oKey = `${activeTab}_${itemIdx}_remedy_${oIdx}_${oil.name}`;
          return newSelectedItems[oKey] !== false;
        });
        if (selectedOils.length > 0) {
          return {
            ...item,
            result: {
              ...item.result,
              oils: selectedOils
            }
          };
        }
        return null;
      }
      return item;
    }).filter(Boolean);
    
    onAutoSearchResultsChange(selectedResults);
  };

  const renderHomeopathy = () => {
    const relevantCategories = selectedConditions.length > 0
      ? selectedConditions
          .map(cond => HOMEOPATHY_DATABASE[cond])
          .filter(Boolean)
      : Object.values(HOMEOPATHY_DATABASE);

    return (
      <Box>
        {/* Resultados Automáticos da Anamnese */}
        {autoSearchResults.length > 0 && (
          <Paper sx={{ p: 2, mb: 3, bgcolor: 'success.lighter' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckIcon color="success" />
                Recomendações Baseadas na Anamnese
              </Typography>
              <Chip 
                label={`${Object.entries(selectedItems).filter(([key, value]) => key.includes('_remedy_') && value).length} remédios selecionados`}
                color="success"
                size="small"
              />
            </Box>
            <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 2 }}>
              <Typography variant="body2">
                ✅ <strong>Como usar:</strong> Clique no quadrado de cada remédio para selecionar/desselecionar.
                <br />
                🟢 <strong>Selecionado:</strong> Fica destacado em verde e será incluído na impressão
                <br />
                ⬜ <strong>Não selecionado:</strong> Fica em cinza e não será impresso
              </Typography>
            </Alert>
            
            <Stack spacing={2}>
              {autoSearchResults.map((item, idx) => {
                return (
                  <Alert 
                    key={idx} 
                    severity="info" 
                    sx={{ '& .MuiAlert-message': { width: '100%' } }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom color="primary">
                        📋 Condição: {item.condition}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      
                      {/* Remédios individuais com checkbox */}
                      {item.result?.remedies ? (
                        <Stack spacing={1.5} sx={{ mt: 2 }}>
                          {item.result.remedies.map((remedy, rIdx) => {
                            const remedyKey = `${activeTab}_${idx}_remedy_${rIdx}_${remedy.name}`;
                            const isRemedySelected = selectedItems[remedyKey] !== false;
                            
                            return (
                              <Box
                                key={rIdx}
                                sx={{
                                  display: 'flex',
                                  gap: 1.5,
                                  p: 2,
                                  borderRadius: 1,
                                  border: '2px solid',
                                  borderColor: isRemedySelected ? 'success.main' : 'grey.300',
                                  bgcolor: isRemedySelected ? 'success.lighter' : 'grey.50',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    borderColor: 'success.main',
                                    boxShadow: 2
                                  }
                                }}
                                onClick={() => handleToggleRemedy(idx, rIdx, remedy.name)}
                              >
                                <Checkbox
                                  checked={isRemedySelected}
                                  onChange={() => handleToggleRemedy(idx, rIdx, remedy.name)}
                                  onClick={(e) => e.stopPropagation()}
                                  color="success"
                                  sx={{ p: 0, alignSelf: 'flex-start' }}
                                />
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="body1" fontWeight={700} color={isRemedySelected ? 'success.dark' : 'text.primary'}>
                                    💊 {remedy.name}
                                  </Typography>
                                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                                    <strong>Potência:</strong> {remedy.potency}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Indicações:</strong> {remedy.indications}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Dosagem:</strong> {remedy.dosage}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Duração:</strong> {remedy.duration}
                                  </Typography>
                                </Box>
                              </Box>
                            );
                          })}
                        </Stack>
                      ) : (
                        // Remédio único (formato antigo)
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2">
                            <strong>Remédio:</strong> {item.result.name}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Potência:</strong> {item.result.potency}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Indicações:</strong> {item.result.indications}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Dosagem:</strong> {item.result.dosage}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Duração:</strong> {item.result.duration}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Alert>
                );
              })}
            </Stack>
          </Paper>
        )}

        {/* Busca Manual */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            🔍 Buscar Remédio por Problema de Saúde
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Digite o problema de saúde para encontrar remédios homeopáticos específicos
          </Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Ex: ansiedade, insônia, dor de cabeça, depressão..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              label="Problema de Saúde"
            />
            <Button variant="contained" startIcon={<SearchIcon />} onClick={handleSearch}>
              Buscar
            </Button>
          </Stack>

          {searchResults && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="success" sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      📋 Encontrado: {searchResults.condition || searchResults.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {searchResults.remedies?.length || 0} remédio(s) disponível(is)
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    color="success" 
                    size="small"
                    onClick={handleAddManualResultToTreatment}
                    startIcon={<CheckIcon />}
                  >
                    Adicionar aos Tratamentos
                  </Button>
                </Box>
              </Alert>

              {/* Renderizar cada remédio encontrado */}
              <Stack spacing={2}>
                {searchResults.remedies?.map((remedy, idx) => (
                  <Paper key={idx} elevation={2} sx={{ p: 2, bgcolor: 'success.lighter', borderLeft: '4px solid', borderColor: 'success.main' }}>
                    <Typography variant="h6" color="success.dark" gutterBottom>
                      💊 {remedy.name}
                    </Typography>
                    
                    {remedy.potency && (
                      <Chip 
                        label={`Potência: ${remedy.potency}`} 
                        size="small" 
                        color="success" 
                        sx={{ mb: 1, mr: 1 }} 
                      />
                    )}
                    
                    <Typography variant="body2" paragraph sx={{ mt: 1 }}>
                      <strong>Indicações:</strong> {remedy.indications}
                    </Typography>
                    
                    <Typography variant="body2" paragraph>
                      <strong>Dosagem:</strong> {remedy.dosage}
                    </Typography>
                    
                    {remedy.duration && (
                      <Typography variant="body2" paragraph>
                        <strong>Duração:</strong> {remedy.duration}
                      </Typography>
                    )}
                    
                    {remedy.contraindications && (
                      <Alert severity="warning" sx={{ mt: 1 }}>
                        <Typography variant="caption">
                          <strong>⚠️ Contraindicações:</strong> {remedy.contraindications}
                        </Typography>
                      </Alert>
                    )}
                  </Paper>
                ))}
              </Stack>
            </Box>
          )}
        </Paper>

        {/* Instruções Gerais */}
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'info.lighter' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InfoIcon color="info" />
            Instruções de Uso - Homeopatia
          </Typography>
          <List dense>
            {HOMEOPATHY_INSTRUCTIONS.general.map((instruction, idx) => (
              <ListItem key={idx}>
                <ListItemIcon>
                  <CheckIcon color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={instruction} />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Remédios por Categoria */}
        {relevantCategories.map((category, idx) => (
          <Accordion key={idx} defaultExpanded={idx === 0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PharmacyIcon color="primary" />
                <Typography variant="h6">{category.title}</Typography>
                <Chip label={`${category.remedies.length} remédios`} size="small" />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {category.remedies.map((remedy, rIdx) => (
                  <Grid item xs={12} md={6} key={rIdx}>
                    <Paper sx={{ p: 2, height: '100%', bgcolor: 'background.default' }}>
                      <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom>
                        {remedy.name}
                      </Typography>
                      <Chip label={remedy.potency} size="small" color="secondary" sx={{ mb: 1 }} />
                      
                      <Typography variant="body2" paragraph>
                        <strong>Indicações:</strong> {remedy.indications}
                      </Typography>
                      
                      <Typography variant="body2" paragraph>
                        <strong>Dosagem:</strong> {remedy.dosage}
                      </Typography>
                      
                      <Typography variant="body2" paragraph>
                        <strong>Duração:</strong> {remedy.duration}
                      </Typography>
                      
                      {remedy.contraindications && (
                        <Alert severity="warning" sx={{ mt: 1 }}>
                          <Typography variant="caption">
                            <strong>Contraindicações:</strong> {remedy.contraindications}
                          </Typography>
                        </Alert>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  };

  const renderAromatherapy = () => {
    const relevantCategories = selectedConditions.length > 0
      ? selectedConditions
          .map(cond => AROMATHERAPY_DATABASE[cond])
          .filter(Boolean)
      : Object.values(AROMATHERAPY_DATABASE);

    return (
      <Box>
        {/* Resultados Automáticos da Anamnese */}
        {autoSearchResults.length > 0 && (
          <Paper sx={{ p: 2, mb: 3, bgcolor: 'success.lighter' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckIcon color="success" />
              Recomendações Baseadas na Anamnese
            </Typography>
            <Chip 
              label={`${Object.entries(selectedItems).filter(([key, value]) => key.includes('_remedy_') && value).length} óleos selecionados`}
              color="success"
              size="small"
              sx={{ mb: 1 }}
            />
            <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 2 }}>
              <Typography variant="body2">
                ✅ <strong>Como usar:</strong> Clique no quadrado de cada óleo para selecionar/desselecionar.
                <br />
                🟢 <strong>Selecionado:</strong> Fica destacado em verde e será incluído na impressão
                <br />
                ⬜ <strong>Não selecionado:</strong> Fica em cinza e não será impresso
              </Typography>
            </Alert>
            
            <Stack spacing={2}>
              {autoSearchResults.map((item, idx) => {
                return (
                  <Alert 
                    key={idx} 
                    severity="info" 
                    sx={{ '& .MuiAlert-message': { width: '100%' } }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom color="primary">
                        📋 Condição: {item.condition}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      
                      {/* Óleos individuais com checkbox */}
                      {item.result?.oils ? (
                        <Stack spacing={1.5} sx={{ mt: 2 }}>
                          {item.result.oils.map((oil, oIdx) => {
                            const oilKey = `${activeTab}_${idx}_remedy_${oIdx}_${oil.name}`;
                            const isOilSelected = selectedItems[oilKey] !== false;
                            
                            return (
                              <Box
                                key={oIdx}
                                sx={{
                                  display: 'flex',
                                  gap: 1.5,
                                  p: 2,
                                  borderRadius: 1,
                                  border: '2px solid',
                                  borderColor: isOilSelected ? 'success.main' : 'grey.300',
                                  bgcolor: isOilSelected ? 'success.lighter' : 'grey.50',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    borderColor: 'success.main',
                                    boxShadow: 2
                                  }
                                }}
                                onClick={() => handleToggleRemedy(idx, oIdx, oil.name)}
                              >
                                <Checkbox
                                  checked={isOilSelected}
                                  onChange={() => handleToggleRemedy(idx, oIdx, oil.name)}
                                  onClick={(e) => e.stopPropagation()}
                                  color="success"
                                  sx={{ p: 0, alignSelf: 'flex-start' }}
                                />
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="body1" fontWeight={700} color={isOilSelected ? 'success.dark' : 'text.primary'}>
                                    🌸 {oil.name}
                                  </Typography>
                                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                                    <strong>Propriedades:</strong> {oil.properties}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Indicações:</strong> {oil.indications}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Uso:</strong> {oil.usage}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Dosagem:</strong> {oil.dosage}
                                  </Typography>
                                </Box>
                              </Box>
                            );
                          })}
                        </Stack>
                      ) : (
                        // Óleo único (formato antigo)
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2">
                            <strong>Óleo:</strong> {item.result.name}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Propriedades:</strong> {item.result.properties}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Indicações:</strong> {item.result.indications}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Uso:</strong> {item.result.usage}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Dosagem:</strong> {item.result.dosage}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Alert>
                );
              })}
            </Stack>
          </Paper>
        )}

        {/* Busca Manual */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            🔍 Buscar Óleo Essencial por Problema de Saúde
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Digite o problema de saúde para encontrar óleos essenciais específicos
          </Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Ex: ansiedade, insônia, dor muscular, stress..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              label="Problema de Saúde"
            />
            <Button variant="contained" startIcon={<SearchIcon />} onClick={handleSearch}>
              Buscar
            </Button>
          </Stack>

          {searchResults && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="success" sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      📋 Encontrado: {searchResults.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {searchResults.oils?.length || 0} óleo(s) essencial(is) disponível(is)
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    color="success" 
                    size="small"
                    onClick={handleAddManualResultToTreatment}
                    startIcon={<CheckIcon />}
                  >
                    Adicionar aos Tratamentos
                  </Button>
                </Box>
              </Alert>

              {/* Renderizar cada óleo encontrado */}
              <Stack spacing={2}>
                {searchResults.oils?.map((oil, idx) => (
                  <Paper key={idx} elevation={2} sx={{ p: 2, bgcolor: 'info.lighter', borderLeft: '4px solid', borderColor: 'info.main' }}>
                    <Typography variant="h6" color="info.dark" gutterBottom>
                      🌸 {oil.name}
                    </Typography>
                    
                    <Typography variant="body2" paragraph>
                      <strong>Propriedades:</strong> {oil.properties}
                    </Typography>
                    
                    <Typography variant="body2">
                      <strong>Usos:</strong>
                    </Typography>
                    <List dense>
                      {(Array.isArray(oil.uses) ? oil.uses : [oil.uses]).map((use, uIdx) => (
                        <ListItem key={uIdx}>
                          <ListItemIcon>
                            <CheckIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={use} />
                        </ListItem>
                      ))}
                    </List>
                    
                    {oil.contraindications && (
                      <Alert severity="warning" sx={{ mt: 1 }}>
                        <Typography variant="caption">
                          <strong>⚠️ Contraindicações:</strong> {oil.contraindications}
                        </Typography>
                      </Alert>
                    )}
                    
                    {oil.synergy && oil.synergy.length > 0 && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>Sinergia:</strong> {oil.synergy.join(', ')}
                      </Typography>
                    )}
                  </Paper>
                ))}
              </Stack>
            </Box>
          )}
        </Paper>

        {/* Avisos de Segurança */}
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'error.lighter' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningIcon color="error" />
            Segurança e Contraindicações
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">Orientações Gerais</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {SAFETY_GUIDELINES.general.map((item, idx) => (
                  <ListItem key={idx}>
                    <ListItemIcon>
                      <WarningIcon color="error" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">Gravidez</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {SAFETY_GUIDELINES.pregnancy.map((item, idx) => (
                  <ListItem key={idx}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">Crianças</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {SAFETY_GUIDELINES.children.map((item, idx) => (
                  <ListItem key={idx}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Paper>

        {/* Métodos de Aplicação */}
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'success.lighter' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InfoIcon color="success" />
            Métodos de Aplicação
          </Typography>
          {Object.entries(APPLICATION_METHODS).map(([key, method]) => (
            <Accordion key={key}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2">{method.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  {method.description}
                </Typography>
                {method.instructions && (
                  <List dense>
                    {method.instructions.map((inst, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={inst} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>

        {/* Óleos por Categoria */}
        {relevantCategories.map((category, idx) => (
          <Accordion key={idx} defaultExpanded={idx === 0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SpaIcon color="primary" />
                <Typography variant="h6">{category.title}</Typography>
                <Chip label={`${category.oils.length} óleos`} size="small" />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {category.oils.map((oil, oIdx) => (
                  <Grid item xs={12} md={6} key={oIdx}>
                    <Paper sx={{ p: 2, height: '100%', bgcolor: 'background.default' }}>
                      <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom>
                        {oil.name}
                      </Typography>
                      
                      <Typography variant="body2" paragraph>
                        <strong>Propriedades:</strong> {oil.properties}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Usos:</strong>
                      </Typography>
                      <List dense>
                        {oil.uses.map((use, uIdx) => (
                          <ListItem key={uIdx} sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CheckIcon color="success" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={use} 
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      
                      {oil.contraindications && (
                        <Alert severity="warning" sx={{ mt: 1 }}>
                          <Typography variant="caption">
                            <strong>Contraindicações:</strong> {oil.contraindications}
                          </Typography>
                        </Alert>
                      )}

                      {oil.synergy && oil.synergy.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="caption" fontWeight={600}>
                            Sinergia:
                          </Typography>
                          <Stack direction="row" spacing={0.5} sx={{ mt: 0.5, flexWrap: 'wrap' }}>
                            {oil.synergy.map((syn, sIdx) => (
                              <Chip key={sIdx} label={syn} size="small" variant="outlined" />
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  };

  const renderEssentialOils = () => {
    const relevantCategories = selectedConditions.length > 0
      ? selectedConditions
          .map(cond => ESSENTIAL_OILS_DATABASE[cond])
          .filter(Boolean)
      : Object.values(ESSENTIAL_OILS_DATABASE);

    return (
      <Box>
        {/* Resultados Automáticos da Anamnese */}
        {autoSearchResults.length > 0 && (
          <Paper sx={{ p: 2, mb: 3, bgcolor: 'success.lighter' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckIcon color="success" />
              Recomendações Baseadas na Anamnese
            </Typography>
            <Chip 
              label={`${Object.entries(selectedItems).filter(([key, value]) => key.includes('_remedy_') && value).length} óleos selecionados`}
              color="success"
              size="small"
              sx={{ mb: 1 }}
            />
            <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 2 }}>
              <Typography variant="body2">
                ✅ <strong>Como usar:</strong> Clique no quadrado de cada óleo para selecionar/desselecionar.
                <br />
                🟢 <strong>Selecionado:</strong> Fica destacado em verde e será incluído na impressão
                <br />
                ⬜ <strong>Não selecionado:</strong> Fica em cinza e não será impresso
              </Typography>
            </Alert>
            
            <Stack spacing={2}>
              {autoSearchResults.map((item, idx) => {
                return (
                  <Alert 
                    key={idx} 
                    severity="info" 
                    sx={{ '& .MuiAlert-message': { width: '100%' } }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom color="primary">
                        📋 Condição: {item.condition}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      
                      {/* Óleos essenciais individuais com checkbox */}
                      {item.result?.oils ? (
                        <Stack spacing={1.5} sx={{ mt: 2 }}>
                          {item.result.oils.map((oil, oIdx) => {
                            const oilKey = `${activeTab}_${idx}_remedy_${oIdx}_${oil.name}`;
                            const isOilSelected = selectedItems[oilKey] !== false;
                            
                            return (
                              <Box
                                key={oIdx}
                                sx={{
                                  display: 'flex',
                                  gap: 1.5,
                                  p: 2,
                                  borderRadius: 1,
                                  border: '2px solid',
                                  borderColor: isOilSelected ? 'success.main' : 'grey.300',
                                  bgcolor: isOilSelected ? 'success.lighter' : 'grey.50',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    borderColor: 'success.main',
                                    boxShadow: 2
                                  }
                                }}
                                onClick={() => handleToggleRemedy(idx, oIdx, oil.name)}
                              >
                                <Checkbox
                                  checked={isOilSelected}
                                  onChange={() => handleToggleRemedy(idx, oIdx, oil.name)}
                                  onClick={(e) => e.stopPropagation()}
                                  color="success"
                                  sx={{ p: 0, alignSelf: 'flex-start' }}
                                />
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="body1" fontWeight={700} color={isOilSelected ? 'success.dark' : 'text.primary'}>
                                    🌿 {oil.name}
                                  </Typography>
                                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                                    <strong>Propriedades:</strong> {oil.properties}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Indicações:</strong> {oil.indications}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Uso:</strong> {oil.usage}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Dosagem:</strong> {oil.dosage}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Duração:</strong> {oil.duration}
                                  </Typography>
                                  {oil.contraindications && (
                                    <Alert severity="warning" sx={{ mt: 1, py: 0.5 }}>
                                      <Typography variant="caption">
                                        <strong>⚠️ Contraindicações:</strong> {oil.contraindications}
                                      </Typography>
                                    </Alert>
                                  )}
                                </Box>
                              </Box>
                            );
                          })}
                        </Stack>
                      ) : (
                        // Óleo único (formato antigo)
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2">
                            <strong>Óleo Essencial:</strong> {item.result.name}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Propriedades:</strong> {item.result.properties}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Indicações:</strong> {item.result.indications}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Forma de Uso:</strong> {item.result.usage}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Dosagem:</strong> {item.result.dosage}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Duração:</strong> {item.result.duration}
                          </Typography>
                          {item.result.contraindications && (
                            <Alert severity="warning" sx={{ mt: 1 }}>
                              <Typography variant="caption">
                                <strong>Contraindicações:</strong> {item.result.contraindications}
                              </Typography>
                            </Alert>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Alert>
                );
              })}
            </Stack>
          </Paper>
        )}

        {/* Busca Manual */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            🔍 Buscar Óleo Essencial por Problema de Saúde
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Digite o problema de saúde para encontrar óleos essenciais terapêuticos
          </Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Ex: ansiedade, insônia, dor muscular, acne..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              label="Problema de Saúde"
            />
            <Button variant="contained" startIcon={<SearchIcon />} onClick={handleSearch}>
              Buscar
            </Button>
          </Stack>

          {searchResults && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="success" sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      📋 Encontrado: {searchResults.title || searchResults.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {searchResults.oils?.length || 0} óleo(s) essencial(is) disponível(is)
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    color="success" 
                    size="small"
                    onClick={handleAddManualResultToTreatment}
                    startIcon={<CheckIcon />}
                  >
                    Adicionar aos Tratamentos
                  </Button>
                </Box>
              </Alert>

              {/* Renderizar cada óleo encontrado */}
              <Stack spacing={2}>
                {searchResults.oils?.map((oil, idx) => (
                  <Paper key={idx} elevation={2} sx={{ p: 2, bgcolor: 'success.lighter', borderLeft: '4px solid', borderColor: 'success.main' }}>
                    <Typography variant="h6" color="success.dark" gutterBottom>
                      🌿 {oil.name}
                    </Typography>
                    
                    <Typography variant="body2" paragraph>
                      <strong>Propriedades:</strong> {oil.properties}
                    </Typography>
                    
                    <Typography variant="body2" paragraph>
                      <strong>Indicações:</strong> {oil.indications}
                    </Typography>
                    
                    <Typography variant="body2" paragraph>
                      <strong>Forma de Uso:</strong> {oil.usage}
                    </Typography>
                    
                    <Typography variant="body2" paragraph>
                      <strong>Dosagem:</strong> {oil.dosage}
                    </Typography>
                    
                    {oil.duration && (
                      <Typography variant="body2" paragraph>
                        <strong>Duração:</strong> {oil.duration}
                      </Typography>
                    )}
                    
                    {oil.contraindications && (
                      <Alert severity="warning" sx={{ mt: 1 }}>
                        <Typography variant="caption">
                          <strong>⚠️ Contraindicações:</strong> {oil.contraindications}
                        </Typography>
                      </Alert>
                    )}
                    
                    {oil.synergy && oil.synergy.length > 0 && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>Sinergia:</strong> {oil.synergy.join(', ')}
                      </Typography>
                    )}
                  </Paper>
                ))}
              </Stack>
            </Box>
          )}
        </Paper>

        {/* Instruções de Diluição */}
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'warning.lighter' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InfoIcon color="warning" />
            Guia de Diluição
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(ESSENTIAL_OILS_INSTRUCTIONS.dilution).map(([key, value]) => (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Paper sx={{ p: 1.5, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle2" fontWeight={600} textTransform="capitalize">
                    {key === 'facial' && '💆 Facial'}
                    {key === 'body' && '🧴 Corporal'}
                    {key === 'massage' && '💆‍♀️ Massagem'}
                    {key === 'pain' && '🩹 Dor'}
                    {key === 'children' && '👶 Crianças'}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Instruções Gerais */}
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'info.lighter' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InfoIcon color="info" />
            Instruções de Uso - Óleos Essenciais
          </Typography>
          <List dense>
            {ESSENTIAL_OILS_INSTRUCTIONS.general.map((instruction, idx) => (
              <ListItem key={idx}>
                <ListItemIcon>
                  <CheckIcon color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={instruction} />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Avisos de Segurança */}
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'error.lighter' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningIcon color="error" />
            ⚠️ Segurança e Precauções
          </Typography>
          <List dense>
            {ESSENTIAL_OILS_INSTRUCTIONS.safety.map((item, idx) => (
              <ListItem key={idx}>
                <ListItemIcon>
                  <WarningIcon color="error" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Óleos por Categoria */}
        {relevantCategories.map((category, idx) => (
          <Accordion key={idx} defaultExpanded={idx === 0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SpaIcon color="primary" />
                <Typography variant="h6">{category.title}</Typography>
                <Chip label={`${category.oils.length} óleos`} size="small" />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {category.oils.map((oil, oIdx) => (
                  <Grid item xs={12} md={6} key={oIdx}>
                    <Paper sx={{ p: 2, height: '100%', bgcolor: 'background.default' }}>
                      <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom>
                        {oil.name}
                      </Typography>
                      
                      <Typography variant="body2" paragraph>
                        <strong>🌿 Propriedades:</strong> {oil.properties}
                      </Typography>
                      
                      <Typography variant="body2" paragraph>
                        <strong>🎯 Indicações:</strong> {oil.indications}
                      </Typography>
                      
                      <Typography variant="body2" paragraph>
                        <strong>💧 Uso:</strong> {oil.usage}
                      </Typography>
                      
                      <Typography variant="body2" paragraph>
                        <strong>📊 Dosagem:</strong> {oil.dosage}
                      </Typography>
                      
                      <Typography variant="body2" paragraph>
                        <strong>⏱️ Duração:</strong> {oil.duration}
                      </Typography>
                      
                      {oil.contraindications && (
                        <Alert severity="warning" sx={{ mt: 1 }}>
                          <Typography variant="caption">
                            <strong>⚠️ Contraindicações:</strong> {oil.contraindications}
                          </Typography>
                        </Alert>
                      )}
                      
                      {oil.synergy && oil.synergy.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="caption" display="block" gutterBottom>
                            <strong>🔄 Sinergia com:</strong>
                          </Typography>
                          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                            {oil.synergy.map((syn, sIdx) => (
                              <Chip key={sIdx} label={syn} size="small" variant="outlined" />
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" paragraph>
        Homeopatia, Aromaterapia e Óleos Essenciais baseados em evidências clínicas
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="💊 Homeopatia" icon={<PharmacyIcon />} iconPosition="start" />
        <Tab label="🌸 Aromaterapia" icon={<SpaIcon />} iconPosition="start" />
        <Tab label="🌿 Óleos Essenciais" icon={<SpaIcon />} iconPosition="start" />
      </Tabs>

      {activeTab === 0 && renderHomeopathy()}
      {activeTab === 1 && renderAromatherapy()}
      {activeTab === 2 && renderEssentialOils()}
    </Box>
  );
}
