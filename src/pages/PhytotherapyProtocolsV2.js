import { useState, useMemo, useRef } from 'react';
import {
  Container, Paper, Typography, Box, Button, TextField, Card, CardContent, CardMedia,
  Grid, Chip, Tabs, Tab, Stack, Divider, Alert, Dialog, DialogTitle, DialogContent,
  DialogActions, LinearProgress, Accordion, AccordionSummary, AccordionDetails, List,
  ListItem, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Badge, Tooltip, IconButton, InputAdornment, Switch, FormControlLabel,
  Collapse
} from '@mui/material';
import {
  Search as SearchIcon, ExpandMore as ExpandMoreIcon, LocalFlorist as FloristIcon,
  Download as DownloadIcon, Print as PrintIcon, BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkFilledIcon, Info as InfoIcon, Warning as WarningIcon,
  CheckCircle as CheckCircleIcon, Science as ScienceIcon, Healing as HealingIcon,
  Visibility as VisibilityIcon, Favorite as FavoriteIcon, Share as ShareIcon,
  East as EastIcon, FolderOpen as FolderOpenIcon, Timeline as TimelineIcon,
  Description as DescriptionIcon, LocalPharmacy as PharmacyIcon,
  FilterList as FilterListIcon, Clear as ClearIcon
} from '@mui/icons-material';
import PHYTOTHERAPY_COMPLETE_DATABASE from '../data/phytotherapyExpandedDatabase';
import MEDICINAL_PLANTS from '../data/medicinalPlants';
import { usePatientIntegration } from '../hooks/usePatientIntegration';
import PrescriptionActions from '../components/PrescriptionActions';
import SaveToPatientBar from '../components/SaveToPatientBar';
import { buildLetterheadHtml, openPrintWindow, generateQrDataUrl } from '../components/PrintTemplate';

// Converte entradas de medicinalPlants.js para o formato V2
const convertToV2 = (id, p) => ({
  id,
  common: p.common || '',
  scientific: p.scientific || '',
  family: p.family || '',
  synonyms: [],
  indications: p.indications || [],
  partUsed: p.partUsed ? (Array.isArray(p.partUsed) ? p.partUsed : [p.partUsed]) : [],
  activeCompounds: p.actives || [],
  availableForms: p.modeOfUse || p.preparation ? [{
    type: 'Preparo tradicional',
    preparation: p.preparation || '',
    instructions: p.modeOfUse || p.posology || ''
  }] : [],
  dosage: {
    adults: {
      dailyDose: p.dosage || p.posology || '',
      frequency: ''
    }
  },
  properties: [],
  mechanism: '',
  contraindications: {
    absolute: p.prohibitions ? [p.prohibitions] : [],
    relative: Array.isArray(p.contraindications) ? p.contraindications : []
  },
  drugInteractions: (p.interactions || []).map(i => ({
    drug: i,
    severity: 'Moderada',
    description: i,
    management: 'Consultar profissional habilitado'
  })),
  herbInteractions: [],
  precautions: p.risks || [],
  evidenceLevel: 'Moderada',
  evidenceSource: 'Farmacoteca Brasileira / Uso Tradicional',
  howToBuy: [],
  homeGrowing: null,
  clinicalNotes: p.toxicity || '',
  sources: [],
  symptoms: p.symptoms || []
});

// Banco mesclado: medicinalPlants (94) + V2 detalhado (6 sobreescrevem se mesma chave)
const MERGED_PLANTS_DATABASE = {
  ...Object.fromEntries(Object.entries(MEDICINAL_PLANTS).map(([id, p]) => [id, convertToV2(id, p)])),
  ...PHYTOTHERAPY_COMPLETE_DATABASE
};

// Lista curada de condições de saúde por categoria
const CONDITION_GROUPS = [
  {
    category: '🌿 Sistema Digestivo', color: '#e8f5e9', accent: '#2e7d32',
    conditions: ['Gastrite', 'Úlcera gástrica', 'Refluxo', 'Dispepsia', 'Constipação', 'Diarreia', 'Intestino irritável', 'Náusea', 'Cólica intestinal', 'Flatulência', 'Digestão', 'Fígado', 'Hepatite', 'Hemorroida', 'Azia']
  },
  {
    category: '🧠 Sistema Nervoso', color: '#f3e5f5', accent: '#6a1b9a',
    conditions: ['Ansiedade', 'Insônia', 'Estresse', 'Depressão', 'Nervosismo', 'Cefaleia', 'Enxaqueca', 'Memória', 'Concentração', 'Agitação', 'Pânico']
  },
  {
    category: '🛡️ Imunidade e Infecções', color: '#fff3e0', accent: '#e65100',
    conditions: ['Imunidade', 'Gripe', 'Resfriado', 'Inflamação', 'Infecção bacteriana', 'Infecção viral', 'Alergia', 'Antioxidante', 'Fungos', 'Parasitas']
  },
  {
    category: '🫁 Sistema Respiratório', color: '#e3f2fd', accent: '#1565c0',
    conditions: ['Tosse', 'Bronquite', 'Sinusite', 'Rinite', 'Asma', 'Faringite', 'Laringite', 'Expectoração', 'Amigdalite', 'Catarro']
  },
  {
    category: '❤️ Sistema Cardiovascular', color: '#fce4ec', accent: '#b71c1c',
    conditions: ['Hipertensão', 'Colesterol', 'Triglicerídeos', 'Circulação', 'Varizes', 'Aterosclerose', 'Arritmia', 'Edema', 'Inchaço nas pernas', 'Pernas inchadas']
  },
  {
    category: '⚗️ Metabolismo', color: '#fffde7', accent: '#f57f17',
    conditions: ['Diabetes', 'Glicemia', 'Obesidade', 'Emagrecimento', 'Tireoide', 'Metabolismo', 'Insulina']
  },
  {
    category: '💧 Sistema Urinário', color: '#e0f7fa', accent: '#006064',
    conditions: ['Infecção urinária', 'Cistite', 'Pedra nos rins', 'Diurético', 'Próstata', 'Retenção urinária']
  },
  {
    category: '💪 Dor e Reumatismo', color: '#fbe9e7', accent: '#bf360c',
    conditions: ['Artrite', 'Artrose', 'Reumatismo', 'Dor muscular', 'Fibromialgia', 'Gota', 'Lombalgia', 'Febre', 'Câimbra']
  },
  {
    category: '🌸 Pele e Mucosas', color: '#fce4ec', accent: '#880e4f',
    conditions: ['Acne', 'Eczema', 'Dermatite', 'Psoríase', 'Feridas', 'Herpes', 'Candidíase', 'Queimadura', 'Cicatrização', 'Vitiligo', 'Vermelhidão', 'Ferida diabética']
  },
  {
    category: '🌺 Saúde Feminina', color: '#f8bbd0', accent: '#ad1457',
    conditions: ['TPM', 'Cólica menstrual', 'Menopausa', 'Irregularidade menstrual', 'Endometriose', 'Ovários policísticos', 'Libido', 'Climatério']
  },
];

// Paleta de cores por sistema
const SYSTEM_COLORS = {
  'Sistema Digestivo': { bg: '#c8e6c9', text: '#1b5e20', accent: '#4caf50' },
  'Sistema Nervoso': { bg: '#e1bee7', text: '#4a148c', accent: '#9c27b0' },
  'Sistema Imunológico': { bg: '#ffe0b2', text: '#e65100', accent: '#ff9800' },
  'Sistema Respiratório': { bg: '#b3e5fc', text: '#01579b', accent: '#03a9f4' },
  'Sistema Cardiovascular': { bg: '#ffcccc', text: '#b71c1c', accent: '#f44336' },
  'Sistema Metabólico': { bg: '#fff9c4', text: '#f57f17', accent: '#ffeb3b' },
};

// ============ COMPONENTE CARD DE PLANTA ==============
function PlantCard({ plant, onSelect, isBookmarked, onBookmark }) {
  return (
    <Card 
      sx={{ 
        cursor: 'pointer', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6
        },
        border: '2px solid',
        borderColor: 'divider'
      }}
      onClick={() => onSelect(plant)}
    >
      {/* Header com ID e ações */}
      <Box sx={{ p: 1.5, bgcolor: 'primary.light', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Chip label={plant.common || plant.plant?.split('(')[0]?.trim()} size="small" variant="outlined" />
        <Box>
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); onBookmark(plant.id); }}>
            {isBookmarked ? <BookmarkFilledIcon color="primary" /> : <BookmarkIcon />}
          </IconButton>
        </Box>
      </Box>

      {/* Conteúdo */}
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: '#1b5e20' }}>
          {plant.common || plant.plant?.split('(')[0]?.trim()}
        </Typography>
        <Typography variant="caption" sx={{ fontStyle: 'italic', display: 'block', mb: 1.5, color: 'text.secondary' }}>
          {plant.scientific || plant.plant?.split('(')[1]?.replace(')', '')}
        </Typography>

        {/* Badge de indicações */}
        <Box sx={{ mb: 2 }}>
          {plant.indications?.slice(0, 3).map((ind, i) => (
            <Chip key={i} label={ind} size="small" sx={{ mr: 0.5, mb: 0.5 }} variant="outlined" />
          ))}
          {plant.indications?.length > 3 && (
            <Typography variant="caption" color="primary" sx={{ display: 'block', mt: 0.5 }}>
              +{plant.indications.length - 3} outras
            </Typography>
          )}
        </Box>

        {/* Propriedades principais */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, fontSize: '0.85rem' }}>
          ✨ Propriedades:
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
          {plant.properties?.slice(0, 2).join(', ')}
        </Typography>
      </CardContent>

      {/* Footer */}
      <Box sx={{ p: 1.5, bgcolor: '#f9f9f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee' }}>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Evidência científica">
            <Badge badgeContent={plant.evidenceLevel} color="success" sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem' } }} />
          </Tooltip>
        </Box>
        <Button size="small" variant="text" endIcon={<EastIcon />}>
          Ver detalhes
        </Button>
      </Box>
    </Card>
  );
}

// ============ MODAL DETALHADO DA PLANTA ==============
function PlantDetailModal({ plant, open, onClose, onAddToCart }) {
  const [tabValue, setTabValue] = useState(0);

  if (!plant) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: '#f1f8f4', textAlign: 'center', fontWeight: 600, fontSize: '1.3rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5">{plant.common || plant.plant?.split('(')[0]?.trim()}</Typography>
            <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'text.secondary', display: 'block', mt: 0.5 }}>
              {plant.scientific || plant.plant?.split('(')[1]?.replace(')', '')}
            </Typography>
          </Box>
          <FloristIcon sx={{ fontSize: 40, color: '#4caf50' }} />
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} variant="scrollable" scrollButtonsDisplay="auto">
          <Tab icon={<HealingIcon />} label="Indicações" />
          <Tab icon={<PharmacyIcon />} label="Dosagem" />
          <Tab icon={<WarningIcon />} label="Contraindicações" />
          <Tab icon={<ScienceIcon />} label="Ativos" />
          <Tab icon={<TimelineIcon />} label="Preparo" />
          <Tab icon={<FolderOpenIcon />} label="Fontes" />
        </Tabs>

        {/* TAB 1: INDICAÇÕES */}
        {tabValue === 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1b5e20' }}>
              🎯 Indicações Terapêuticas
            </Typography>
            <List>
              {plant.indications?.map((ind, i) => (
                <ListItem key={i} sx={{ display: 'list-item', ml: 2 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText primary={ind} />
                </ListItem>
              ))}
            </List>

            {plant.properties && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1b5e20' }}>
                  ✨ Propriedades Farmacológicas
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {plant.properties.map((prop, i) => (
                    <Chip key={i} label={prop} variant="outlined" color="success" />
                  ))}
                </Box>
              </>
            )}

            {plant.mechanism && (
              <>
                <Divider sx={{ my: 2 }} />
                <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    📊 Mecanismo de Ação:
                  </Typography>
                  <Typography variant="body2">{plant.mechanism}</Typography>
                </Paper>
              </>
            )}
          </Box>
        )}

        {/* TAB 2: DOSAGEM */}
        {tabValue === 1 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1b5e20' }}>
              💊 Dosagem e Posologia
            </Typography>

            {plant.availableForms && plant.availableForms.length > 0 && (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Formas de Apresentação:
                </Typography>
                {plant.availableForms.map((form, i) => (
                  <Accordion key={i} defaultExpanded={i === 0}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 600 }}>{form.type}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Preparo:</strong> {form.preparation}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Como usar:</strong> {form.instructions}
                        </Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            )}

            {plant.dosage && (
              <>
                <Divider sx={{ my: 2 }} />
                <TableContainer>
                  <Table size="small">
                    <TableHead sx={{ bgcolor: '#f1f8f4' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Grupo</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Dose</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Frequência</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {plant.dosage.adults && (
                        <TableRow>
                          <TableCell>Adultos</TableCell>
                          <TableCell>{typeof plant.dosage.adults.dailyDose === 'object' ? '(Vide detalhes abaixo)' : plant.dosage.adults.dailyDose}</TableCell>
                          <TableCell>{plant.dosage.adults.frequency}</TableCell>
                        </TableRow>
                      )}
                      {plant.dosage.children && (
                        <TableRow>
                          <TableCell>Crianças</TableCell>
                          <TableCell>Conforme idade</TableCell>
                          <TableCell>{plant.dosage.children.above6 || 'Reduzida'}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
        )}

        {/* TAB 3: CONTRAINDICAÇÕES */}
        {tabValue === 2 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#d32f2f' }}>
              ⚠️ Contraindicações e Precauções
            </Typography>

            {plant.contraindications && (
              <Box>
                {plant.contraindications.absolute && plant.contraindications.absolute.length > 0 && (
                  <>
                    <Alert severity="error" sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        ❌ Contraindicações Absolutas:
                      </Typography>
                      <ul style={{ marginTop: 0, marginBottom: 0 }}>
                        {plant.contraindications.absolute.map((c, i) => (
                          <li key={i}><Typography variant="body2">{c}</Typography></li>
                        ))}
                      </ul>
                    </Alert>
                  </>
                )}

                {plant.contraindications.relative && plant.contraindications.relative.length > 0 && (
                  <>
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        ⚠️ Contraindicações Relativas:
                      </Typography>
                      <ul style={{ marginTop: 0, marginBottom: 0 }}>
                        {plant.contraindications.relative.map((c, i) => (
                          <li key={i}><Typography variant="body2">{c}</Typography></li>
                        ))}
                      </ul>
                    </Alert>
                  </>
                )}
              </Box>
            )}

            {plant.precautions && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#ff6f00' }}>
                  🛡️ Precauções:
                </Typography>
                <List>
                  {plant.precautions.map((prec, i) => (
                    <ListItem key={i} sx={{ display: 'list-item', ml: 2 }}>
                      <ListItemText primary={prec} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Box>
        )}

        {/* TAB 4: ATIVOS */}
        {tabValue === 3 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1b5e20' }}>
              🧪 Compostos Ativos Principais
            </Typography>
            {plant.activeCompounds && (
              <List>
                {plant.activeCompounds.map((compound, i) => (
                  <ListItem key={i} sx={{ display: 'list-item', ml: 2 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <ScienceIcon sx={{ fontSize: 18, color: '#1b5e20' }} />
                    </ListItemIcon>
                    <ListItemText primary={compound} />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        )}

        {/* TAB 5: PREPARO */}
        {tabValue === 4 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1b5e20' }}>
              👨‍🍳 Como Preparar e Adquirir
            </Typography>

            {plant.partUsed && (
              <>
                <Paper sx={{ p: 2, bgcolor: '#f1f8f4', mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Partes Utilizadas:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {plant.partUsed.map((part, i) => (
                      <Chip key={i} label={part} variant="outlined" color="success" />
                    ))}
                  </Box>
                </Paper>
              </>
            )}

            {plant.howToBuy && (
              <>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  💰 Onde Adquirir:
                </Typography>
                <List>
                  {plant.howToBuy.map((source, i) => (
                    <ListItem key={i}>
                      <ListItemText primary={source} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            {plant.homeGrowing && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  🌱 Cultivo Caseiro:
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Clima</TableCell>
                        <TableCell>{plant.homeGrowing.climate}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Solo</TableCell>
                        <TableCell>{plant.homeGrowing.soil}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Rega</TableCell>
                        <TableCell>{plant.homeGrowing.watering}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Colheita</TableCell>
                        <TableCell>{plant.homeGrowing.harvest}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
        )}

        {/* TAB 6: FONTES */}
        {tabValue === 5 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1b5e20' }}>
              📚 Fontes de Pesquisa
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              <strong>Nível de Evidência:</strong> {plant.evidenceLevel}
            </Typography>
            {plant.evidenceSource && (
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                <strong>Fonte primária:</strong> {plant.evidenceSource}
              </Typography>
            )}

            {plant.sources && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Referências Científicas:
                </Typography>
                <List>
                  {plant.sources.map((source, i) => (
                    <ListItem key={i}>
                      <ListItemText
                        primary={source.title}
                        secondary={`${source.authors || ''} ${source.year || ''} - ${source.link || ''}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: '#f9f9f9' }}>
        <Button onClick={onClose} variant="outlined">Fechar</Button>
        <Button 
          onClick={() => {
            onAddToCart(plant);
            onClose();
          }} 
          variant="contained" 
          color="success"
          startIcon={<PharmacyIcon />}
        >
          Adicionar ao Receituário
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ============ PÁGINA PRINCIPAL ==============
export default function PhytotherapyProtocolsV2() {
  const contentRef = useRef(null);
  const { patientData, saveToPatient, goToDashboard } = usePatientIntegration('phytotherapyProtocols');
  
  // Estados
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSystem, setSelectedSystem] = useState('all');
  const [bookmarkedPlants, setBookmarkedPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterMode, setFilterMode] = useState('all'); // all, bookmarked, cart
  const [cartItems, setCartItems] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [conditionPanelOpen, setConditionPanelOpen] = useState(false);

  // Dados das plantas (banco mesclado: 94 medicinalPlants + 6 V2 detalhado)
  const plants = useMemo(() => Object.values(MERGED_PLANTS_DATABASE), []);

  // Índice: quantas plantas cobrem cada condição
  const plantsPerCondition = useMemo(() => {
    const map = {};
    CONDITION_GROUPS.forEach(group => {
      group.conditions.forEach(cond => {
        const condLower = cond.toLowerCase();
        map[cond] = plants.filter(plant => {
          const allTexts = [...(plant.indications || []), ...(plant.symptoms || [])];
          return allTexts.some(t => t.toLowerCase().includes(condLower));
        }).length;
      });
    });
    return map;
  }, [plants]);

  const toggleCondition = (cond) => {
    setSelectedConditions(prev =>
      prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
    );
  };

  // Filtro e busca
  const filteredPlants = useMemo(() => {
    let filtered = plants;

    // Filtrar por modo
    if (filterMode === 'bookmarked') {
      filtered = filtered.filter(p => bookmarkedPlants.includes(p.id));
    }

    // Filtrar por condição de saúde selecionada
    if (selectedConditions.length > 0) {
      filtered = filtered.filter(plant => {
        const allTexts = [...(plant.indications || []), ...(plant.symptoms || [])];
        return selectedConditions.some(cond =>
          allTexts.some(t => t.toLowerCase().includes(cond.toLowerCase()))
        );
      });
    }

    // Buscar por texto
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        (p.common && p.common.toLowerCase().includes(query)) ||
        (p.scientific && p.scientific.toLowerCase().includes(query)) ||
        (p.indications && p.indications.some(ind => ind.toLowerCase().includes(query)))
      );
    }

    return filtered;
  }, [plants, searchTerm, selectedSystem, filterMode, bookmarkedPlants, selectedConditions]);

  const handleSelectPlant = (plant) => {
    setSelectedPlant(plant);
    setModalOpen(true);
  };

  const handleAddToCart = (plant) => {
    if (!cartItems.find(item => item.id === plant.id)) {
      setCartItems([...cartItems, plant]);
      saveToPatient({ cartItems: [...cartItems, plant] });
    }
  };

  const handleRemoveFromCart = (plantId) => {
    const updated = cartItems.filter(item => item.id !== plantId);
    setCartItems(updated);
    saveToPatient({ cartItems: updated });
  };

  const handleBookmark = (plantId) => {
    if (bookmarkedPlants.includes(plantId)) {
      setBookmarkedPlants(bookmarkedPlants.filter(id => id !== plantId));
    } else {
      setBookmarkedPlants([...bookmarkedPlants, plantId]);
    }
  };

  const handleExportPrescription = async () => {
    if (cartItems.length === 0) return;
    const patName = patientData?.q01_nome || patientData?.nome || 'Paciente';
    const dateStr = new Date().toLocaleDateString('pt-BR');

    const itemsHtml = cartItems.map(plant => {
      const formsForms = (plant.availableForms || []).map(f =>
        `<div style="padding-left:12px;margin-bottom:4px;">
          <strong>${f.type}:</strong> ${f.preparation || ''}
          ${f.instructions ? `<br><span style="color:#555;">${f.instructions}</span>` : ''}
        </div>`
      ).join('');
      const dosage = plant.dosage?.adults?.dailyDose
        ? `<div style="margin-top:6px;font-size:10pt;"><strong style="color:#1565c0;">Dose adulto:</strong> <span style="padding-left:6px;">${plant.dosage.adults.dailyDose}${plant.dosage.adults.frequency ? ' — ' + plant.dosage.adults.frequency : ''}</span></div>`
        : '';
      const contraindications = (plant.contraindications || []).length > 0
        ? `<div style="margin-top:6px;font-size:9pt;color:#b71c1c;"><strong>⚠️ Contraindicações:</strong> ${plant.contraindications.join('; ')}</div>`
        : '';
      return `
        <div style="margin-bottom:18px;border:1px solid #c8e6c9;border-left:4px solid #2e7d32;padding:12px;border-radius:4px;page-break-inside:avoid;">
          <h3 style="margin:0 0 4px 0;color:#1b5e20;font-size:12pt;">🌿 ${plant.common}${plant.scientific ? ` <em style="color:#555;font-size:10pt;">(${plant.scientific})</em>` : ''}</h3>
          ${plant.indications?.length ? `<div style="font-size:10pt;color:#388e3c;margin-bottom:6px;">Indicações: ${plant.indications.slice(0,5).join(', ')}${plant.indications.length > 5 ? '...' : ''}</div>` : ''}
          ${formsForms ? `<div style="margin-top:6px;font-size:10pt;"><strong style="color:#388e3c;">Formas de uso:</strong>${formsForms}</div>` : ''}
          ${dosage}
          ${contraindications}
        </div>`;
    }).join('');

    const bodyHtml = `
      <div style="background:#e8f5e9;padding:10px 14px;border-radius:6px;margin-bottom:16px;font-size:10pt;">
        <strong>Paciente:</strong> ${patName} &nbsp;|&nbsp; <strong>Data:</strong> ${dateStr}
      </div>
      <h2 style="color:#2e7d32;border-bottom:2px solid #4caf50;padding-bottom:8px;margin-bottom:16px;">🌿 Receituário Fitoterápico — ${cartItems.length} planta${cartItems.length !== 1 ? 's' : ''}</h2>
      ${itemsHtml}
      <div style="margin-top:20px;padding:10px;background:#fff3e0;border-radius:6px;font-size:9pt;color:#e65100;">
        ⚠️ Uso orientado por profissional habilitado. Suspender em caso de reações adversas e consultar o profissional responsável.
      </div>`;

    try {
      const qrUrl = await generateQrDataUrl(`${window.location.origin}/indicacao-fitoterapicos`);
      const html = await buildLetterheadHtml({
        title: 'Receituário Fitoterápico',
        bodyHtml,
        qrUrl,
      });
      openPrintWindow(html, true);
    } catch (e) {
      console.error('Erro ao gerar receituário:', e);
    }
  };

  return (
    <>
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Ações no topo */}
      <Box sx={{ mb: 3 }}>
        <PrescriptionActions
          patientData={patientData}
          contentRef={contentRef}
          contentTitle="Protocolo_Fitoterápico_Integrado"
          onBack={goToDashboard}
        />
      </Box>

      <Paper sx={{ p: 4 }} ref={contentRef}>
        {/* HEADER */}
        <Box sx={{ 
          mb: 4, 
          p: 3, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
          color: '#fff'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <FloristIcon sx={{ fontSize: 48 }} />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                🌿 Protocolos Fitoterápicos Integrados
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 400, opacity: 0.95 }}>
                Base de dados completa com informações detalhadas, posologia, contraindicações e receituário médico
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ALERTA IMPORTANTE */}
        <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
          <Typography variant="body2">
            <strong>⚠️ IMPORTANTE:</strong> Os protocolos fitoterápicos aqui descritos devem ser prescritos por profissional habilitado (farmacêutico clínico, naturopata, médico integrativo). Não replace medicação convencional sem supervisão médica.
          </Typography>
        </Alert>

        {/* CONTROLES E FILTROS */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Buscar planta, indicação, condição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#4caf50' }} />
                    </InputAdornment>
                  )
                }}
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': { borderColor: '#4caf50' },
                    '&.Mui-focused fieldset': { borderColor: '#4caf50' }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                startIcon={<DownloadIcon />}
                onClick={handleExportPrescription}
                disabled={cartItems.length === 0}
                sx={{ height: '100%' }}
              >
                Gerar Receituário ({cartItems.length})
              </Button>
            </Grid>
          </Grid>

          {/* PAINEL DE CONDIÇÕES DE SAÚDE */}
          <Paper
            variant="outlined"
            sx={{ mb: 2, borderColor: conditionPanelOpen ? '#4caf50' : '#c8e6c9', borderRadius: 2, overflow: 'hidden' }}
          >
            {/* Cabeçalho do painel */}
            <Box
              onClick={() => setConditionPanelOpen(v => !v)}
              sx={{
                px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                cursor: 'pointer', bgcolor: conditionPanelOpen ? '#e8f5e9' : '#f9fbe7',
                '&:hover': { bgcolor: '#e8f5e9' }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterListIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1b5e20' }}>
                  Filtrar por Doenças / Sintomas / Condição de Saúde
                </Typography>
                {selectedConditions.length > 0 && (
                  <Chip
                    size="small"
                    label={`${selectedConditions.length} selecionada${selectedConditions.length > 1 ? 's' : ''}`}
                    color="success"
                    sx={{ height: 20, fontSize: '0.72rem' }}
                  />
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {selectedConditions.length > 0 && (
                  <Button
                    size="small" color="error" startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
                    onClick={(e) => { e.stopPropagation(); setSelectedConditions([]); }}
                    sx={{ fontSize: '0.75rem', py: 0.25 }}
                  >
                    Limpar
                  </Button>
                )}
                <ExpandMoreIcon
                  sx={{
                    color: '#4caf50', fontSize: 20,
                    transform: conditionPanelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s'
                  }}
                />
              </Box>
            </Box>

            {/* Conteúdo: grid de colunas por categoria */}
            <Collapse in={conditionPanelOpen}>
              <Box sx={{ p: 2 }}>
                {selectedConditions.length > 0 && (
                  <Box sx={{ mb: 2, p: 1.5, bgcolor: '#e8f5e9', borderRadius: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#2e7d32', width: '100%', mb: 0.5 }}>
                      Filtrando por:
                    </Typography>
                    {selectedConditions.map(cond => (
                      <Chip
                        key={cond}
                        label={cond}
                        size="small"
                        onDelete={() => toggleCondition(cond)}
                        color="success"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    ))}
                  </Box>
                )}
                <Grid container spacing={1.5}>
                  {CONDITION_GROUPS.map(group => {
                    const available = group.conditions.filter(c => (plantsPerCondition[c] || 0) > 0);
                    if (available.length === 0) return null;
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={group.category}>
                        <Box
                          sx={{
                            p: 1.25, border: `1px solid ${group.accent}30`,
                            borderRadius: 1.5, bgcolor: group.color, height: '100%'
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 700, color: group.accent, display: 'block', mb: 1, fontSize: '0.78rem' }}
                          >
                            {group.category}
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {available
                              .sort((a, b) => (plantsPerCondition[b] || 0) - (plantsPerCondition[a] || 0))
                              .map(cond => {
                                const isSelected = selectedConditions.includes(cond);
                                return (
                                  <Chip
                                    key={cond}
                                    label={`${cond} (${plantsPerCondition[cond]})`}
                                    size="small"
                                    onClick={() => toggleCondition(cond)}
                                    sx={{
                                      fontSize: '0.72rem', cursor: 'pointer', height: 22,
                                      bgcolor: isSelected ? group.accent : 'white',
                                      color: isSelected ? 'white' : group.accent,
                                      border: `1px solid ${group.accent}`,
                                      fontWeight: isSelected ? 700 : 400,
                                      '&:hover': { bgcolor: isSelected ? group.accent : `${group.accent}20` }
                                    }}
                                  />
                                );
                              })}
                          </Box>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Collapse>
          </Paper>

          {/* Abas de filtro */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant={filterMode === 'all' ? 'contained' : 'outlined'}
              color="success"
              onClick={() => setFilterMode('all')}
            >
              Todos ({plants.length})
            </Button>
            <Button
              variant={filterMode === 'bookmarked' ? 'contained' : 'outlined'}
              color="success"
              onClick={() => setFilterMode('bookmarked')}
              startIcon={<BookmarkFilledIcon />}
            >
              Favoritos ({bookmarkedPlants.length})
            </Button>
            <Button
              variant={filterMode === 'cart' ? 'contained' : 'outlined'}
              color="success"
              onClick={() => setFilterMode('cart')}
              startIcon={<PharmacyIcon />}
            >
              No Receituário ({cartItems.length})
            </Button>
          </Box>
        </Box>

        {/* GRID DE PLANTAS */}
        <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
          Exibindo {filteredPlants.length} planta(s)
        </Typography>

        {filterMode === 'cart' && cartItems.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#1b5e20' }}>
              📋 Receituário Atual
            </Typography>
            <Box sx={{ mb: 4, p: 2, bgcolor: '#f1f8f4', borderRadius: 2 }}>
              <List>
                {cartItems.map((item, i) => (
                  <ListItem key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {item.common || item.plant?.split('(')[0]?.trim()}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {item.scientific || item.plant?.split('(')[1]?.replace(')', '')}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remover
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Divider sx={{ my: 3 }} />
          </>
        )}

        <Grid container spacing={3}>
          {filteredPlants.length > 0 ? (
            filteredPlants.map((plant) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={plant.id}>
                <PlantCard
                  plant={plant}
                  onSelect={handleSelectPlant}
                  isBookmarked={bookmarkedPlants.includes(plant.id)}
                  onBookmark={handleBookmark}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Alert severity="info" sx={{ textAlign: 'center' }}>
                Nenhuma planta encontrada com esses critérios. Tente refinar sua busca.
              </Alert>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* MODAL DETALHADO */}
      <PlantDetailModal
        plant={selectedPlant}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* RODAPÉ COM FONTES */}
      <Box sx={{ mt: 6, p: 3, bgcolor: '#f9f9f9', borderRadius: 2, borderTop: '3px solid #4caf50' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          📚 Fontes de Pesquisa Científica
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Os dados deste sistema foram compilados de bases científicas reconhecidas internacionalmente:
        </Typography>
        <Stack spacing={1}>
          <Typography variant="caption">
            • <strong>PhytoKey 3.5</strong> - Sistema de classificação de fitoterápicos (NAPRALERT, University of Illinois)
          </Typography>
          <Typography variant="caption">
            • <strong>PubMed/MEDLINE</strong> - Busca de ensaios clínicos e revisões sistemáticas
          </Typography>
          <Typography variant="caption">
            • <strong>Cochrane Library</strong> - Revisões sistemáticas de fitoterapia
          </Typography>
          <Typography variant="caption">
            • <strong>WHO Monographs</strong> - Organização Mundial da Saúde
          </Typography>
          <Typography variant="caption">
            • <strong>Pharmacopeia Brasileira (5ª ed.)</strong> - ANVISA
          </Typography>
          <Typography variant="caption">
            • <strong>European Medicines Agency (EMA)</strong> - Monografias de plantas medicinais
          </Typography>
        </Stack>
      </Box>
    </Container>

      <SaveToPatientBar
        moduleKey="phytotherapyProtocols"
        getData={() => cartItems.length > 0
          ? { cartItems, savedAt: new Date().toISOString() }
          : null}
        label="Salvar receituário fitoterapêutico no interagente"
      />
    </>
  );
}
