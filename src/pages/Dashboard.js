import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { safeSaveAnamneses } from '../lib/localStorageSafe';
import { deleteAnamnese, listAnamneses } from '../lib/api';
import { Container, Typography, Button, Box, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tooltip, Chip, Divider, Stack } from '@mui/material';
import { Add as AddIcon, Visibility as VisibilityIcon, Delete as DeleteIcon, Edit as EditIcon, Assessment as AssessmentIcon, TableChart as TableChartIcon, Medication as MedicationIcon, CheckCircle as CheckCircleIcon, Cancel as CancelIcon, Science as ScienceIcon, WaterDrop as WaterDropIcon, Psychology as PsychologyIcon, History as HistoryIcon, RemoveRedEye as IrisIcon, Save as SaveIcon } from '@mui/icons-material';
import { getFullHistorico, getTipoColor } from '../lib/historicoUtils';

export default function Dashboard() {
  const navigate = useNavigate();
  const [anamneses, setAnamneses] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [historicoDialogOpen, setHistoricoDialogOpen] = useState(false);
  const [historicoPatient, setHistoricoPatient] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [activeBtn, setActiveBtn] = useState(null); // {rowId, btn}

  const loadAnamneses = async () => {
    let savedAnamneses;
    try {
      savedAnamneses = await listAnamneses();
      safeSaveAnamneses(savedAnamneses);
    } catch (error) {
      console.warn('Falha ao carregar interagentes do servidor; usando dados locais.', error);
      savedAnamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    }
    // Ordenar alfabeticamente por nome
    const sortedAnamneses = [...savedAnamneses].sort((a, b) => {
      const nomeA = (a.q01_nome || '').toLowerCase();
      const nomeB = (b.q01_nome || '').toLowerCase();
      return nomeA.localeCompare(nomeB);
    });
    setAnamneses(sortedAnamneses);
  };

  useEffect(() => {
    loadAnamneses();
    
    // Atualizar quando a janela recebe foco (volta de outra página)
    const handleFocus = () => loadAnamneses();
    const handleAnamnesesUpdated = () => loadAnamneses();
    window.addEventListener('focus', handleFocus);
    window.addEventListener('anamneses:updated', handleAnamnesesUpdated);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('anamneses:updated', handleAnamnesesUpdated);
    };
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteAnamnese(selectedId);
    } catch (error) {
      console.error('Falha ao excluir interagente do servidor.', error);
      alert('Não foi possível excluir o interagente do servidor. Tente novamente.');
      return;
    }
    // Ler do localStorage (lista completa) para não perder entradas filtradas do state
    const allStored = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const updatedAnamneses = allStored.filter(a => String(a.id) !== String(selectedId));
    try { if (!safeSaveAnamneses(updatedAnamneses)) console.warn('Failed to fully save anamneses locally'); } catch(e) { console.warn(e); }
    setAnamneses(prev => prev.filter(a => String(a.id) !== String(selectedId)));
    setDeleteDialogOpen(false);
    setSelectedId(null);
    // notify other components
    try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: { id: selectedId } })); } catch (e) { /* ignore */ }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedId(null);
  };

  const handleOpenHistorico = (row) => {
    setHistoricoPatient(row);
    setHistoricoDialogOpen(true);
  };

  const handleToggleComparecimento = (id) => {
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const index = anamneses.findIndex(a => a.id === id);
    
    if (index !== -1) {
      const novoStatus = !anamneses[index].q14_comparecimento_confirmado;
      const historico = anamneses[index].q14_historico_comparecimentos || [];
      
      if (novoStatus) {
        historico.push({
          data: new Date().toISOString(),
          tipo: 'confirmacao',
          observacao: 'Comparecimento confirmado'
        });
      }
      
      anamneses[index].q14_comparecimento_confirmado = novoStatus;
      anamneses[index].q14_historico_comparecimentos = historico;
      
      localStorage.setItem('anamneses', JSON.stringify(anamneses));
      loadAnamneses();
    }
  };

  const formatDateShort = (dateString) => {
    if (!dateString) return '-';
    // Já no formato DD/MM/AAAA — retorna direto (compactar para DD/MM/AA)
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      const [d, m, y] = dateString.split('/');
      return `${d}/${m}/${y.slice(-2)}`;
    }
    if (/^\d{2}\/\d{2}\/\d{2}$/.test(dateString)) return dateString;
    // ISO ou outro formato — usar local time para evitar offset UTC
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const formatTimeShort = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  };

  const columns = [
    { field: 'q01_nome', headerName: 'Nome', width: 160 },
    {
      field: 'q02_data_nasc',
      headerName: 'Nasc.',
      width: 80,
      renderCell: (params) => (
        <Box sx={{ fontSize: '0.75rem', lineHeight: 1.2 }}>
          <div>{params.value ? formatDateShort(params.value) : '-'}</div>
          {params.row.q03_idade ? <div style={{ fontSize: '0.65rem', opacity: 0.75 }}>{params.row.q03_idade} anos</div> : null}
        </Box>
      )
    },
    {
      field: 'q14_tipo_consulta',
      headerName: 'Tipo',
      width: 90,
      renderCell: (params) => {
        const tipo = params.value || '1ª Consulta';
        return (
          <Box sx={{ fontSize: '0.75rem', fontWeight: 600, color: tipo === '1ª Consulta' ? '#1976d2' : '#ed6c02' }}>
            {tipo}
          </Box>
        );
      }
    },
    {
      field: 'createdAt',
      headerName: '1ª Cons.',
      width: 100,
      renderCell: (params) => {
        const isActive = params.row.q14_tipo_consulta === '1ª Consulta';
        // Preferir createdAt (ISO com hora local) sobre date (pode ser UTC)
        const isoVal = params.value || params.row.created_at;
        const dateVal = params.row.q14_data_consulta || isoVal || params.row.date;
        const timeStr = isoVal ? formatTimeShort(isoVal) : (params.row.time || '');
        return (
          <Box sx={{ 
            bgcolor: isActive ? '#c8e6c9' : 'transparent',
            color: isActive ? '#1b5e20' : 'inherit',
            fontWeight: isActive ? 700 : 400,
            fontSize: '0.75rem',
            px: 0.5,
            py: 0.2,
            borderRadius: 0.5,
            lineHeight: 1.2
          }}>
            <div>{formatDateShort(dateVal)}</div>
            {timeStr && <div style={{ fontSize: '0.65rem', opacity: 0.85 }}>{timeStr}</div>}
          </Box>
        );
      }
    },
    {
      field: 'q14_data_retorno',
      headerName: 'Ret. 1',
      width: 75,
      renderCell: (params) => {
        const isActive = params.row.q14_tipo_consulta === 'Retorno 1';
        return (
          <Box sx={{ 
            bgcolor: isActive ? '#c8e6c9' : 'transparent',
            color: isActive ? '#1b5e20' : 'inherit',
            fontWeight: isActive ? 700 : 400,
            fontSize: '0.75rem',
            px: 0.5,
            py: 0.2,
            borderRadius: 0.5
          }}>
            {formatDateShort(params.value)}
          </Box>
        );
      }
    },
    {
      field: 'q14_data_retorno_2',
      headerName: 'Ret. 2',
      width: 75,
      renderCell: (params) => {
        const isActive = params.row.q14_tipo_consulta === 'Retorno 2';
        return (
          <Box sx={{ 
            bgcolor: isActive ? '#c8e6c9' : 'transparent',
            color: isActive ? '#1b5e20' : 'inherit',
            fontWeight: isActive ? 700 : 400,
            fontSize: '0.75rem',
            px: 0.5,
            py: 0.2,
            borderRadius: 0.5
          }}>
            {formatDateShort(params.value)}
          </Box>
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Ações',
      minWidth: 560,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', flexWrap: 'wrap', py: 0.5 }}>
          <Tooltip title="Ver" arrow componentsProps={{ tooltip: { sx: { fontSize: '0.7rem', py: 0.3, px: 0.8 } } }}>
            <Button
              component={Link}
              to={`/anamnese/${params.row.id}`}
              startIcon={<VisibilityIcon sx={{ fontSize: 14 }} />}
              size="small"
              variant={activeBtn?.rowId === params.row.id && activeBtn?.btn === 'ver' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setActiveBtn({ rowId: params.row.id, btn: 'ver' })}
              sx={{ minWidth: 'auto', px: 0.8, py: 0.3, fontSize: '0.65rem' }}
            >
              Ver
            </Button>
          </Tooltip>
          <Tooltip title="Editar dados pessoais" arrow componentsProps={{ tooltip: { sx: { fontSize: '0.7rem', py: 0.3, px: 0.8 } } }}>
            <Button
              component={Link}
              to={`/interagente/edit/${params.row.id}`}
              startIcon={<EditIcon sx={{ fontSize: 14 }} />}
              size="small"
              variant={activeBtn?.rowId === params.row.id && activeBtn?.btn === 'editar' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => { localStorage.setItem('currentPatientId', String(params.row.id)); setActiveBtn({ rowId: params.row.id, btn: 'editar' }); }}
              sx={{ minWidth: 'auto', px: 0.8, py: 0.3, fontSize: '0.65rem' }}
            >
              Editar
            </Button>
          </Tooltip>

          <Tooltip title="Pré-anamnese: questionário integrativo, respostas e protocolos" arrow componentsProps={{ tooltip: { sx: { fontSize: '0.7rem', py: 0.3, px: 0.8 } } }}>
            <Button
              component={Link}
              to={`/dialogo-anamnetico/${params.row.id}`}
              startIcon={<PsychologyIcon sx={{ fontSize: 14 }} />}
              size="small"
              variant="contained"
              onClick={() => setActiveBtn({ rowId: params.row.id, btn: 'preanamnese' })}
              sx={{
                minWidth: 'auto', px: 0.8, py: 0.3, fontSize: '0.65rem',
                bgcolor: params.row.anamnesisIntegrativa ? '#6a1b9a' : '#9c27b0',
                '&:hover': { bgcolor: '#4a148c' },
                outline: activeBtn?.rowId === params.row.id && activeBtn?.btn === 'preanamnese' ? '2px solid #4a148c' : 'none',
                outlineOffset: '1px',
                position: 'relative'
              }}
            >
              Pré-anamnese
              {params.row.anamnesisIntegrativa && (
                <Box component="span" sx={{
                  position: 'absolute', top: -4, right: -4,
                  width: 8, height: 8, borderRadius: '50%',
                  bgcolor: '#69f0ae', border: '1px solid #fff'
                }} />
              )}
            </Button>
          </Tooltip>

          <Tooltip title="Plano Nutricional — frutas, legumes, verduras, cardápio e receitas" arrow componentsProps={{ tooltip: { sx: { fontSize: '0.7rem', py: 0.3, px: 0.8 } } }}>
            <Button
              component={Link}
              to={`/plano-nutricional/${params.row.id}`}
              size="small"
              variant="contained"
              onClick={() => setActiveBtn({ rowId: params.row.id, btn: 'nutricional' })}
              sx={{
                minWidth: 'auto', px: 0.8, py: 0.3, fontSize: '0.65rem',
                bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' },
                outline: activeBtn?.rowId === params.row.id && activeBtn?.btn === 'nutricional' ? '2px solid #1b5e20' : 'none',
                outlineOffset: '1px',
              }}
            >
              🥦 Nutricional
            </Button>
          </Tooltip>
          <Tooltip title="Anamnese Subclínico" arrow componentsProps={{ tooltip: { sx: { fontSize: '0.7rem', py: 0.3, px: 0.8 } } }}>
              <Button
              component={Link}
              to={`/anamnese-subclinico/${params.row.id}`}
              startIcon={<ScienceIcon sx={{ fontSize: 14 }} />}
              size="small"
              variant="contained"
              color="info"
              onClick={() => setActiveBtn({ rowId: params.row.id, btn: 'subclinico' })}
              sx={{ minWidth: 'auto', px: 0.8, py: 0.3, fontSize: '0.65rem', outline: activeBtn?.rowId === params.row.id && activeBtn?.btn === 'subclinico' ? '2px solid #01579b' : 'none', outlineOffset: '1px' }}
            >
              Subclínico
            </Button>
          </Tooltip>
          <Tooltip title="Resultados de Exames de Urina" arrow componentsProps={{ tooltip: { sx: { fontSize: '0.7rem', py: 0.3, px: 0.8 } } }}>
              <Button
              component={Link}
              to={`/resultados-exames-urina/${params.row.id}`}
              startIcon={<WaterDropIcon sx={{ fontSize: 14 }} />}
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => setActiveBtn({ rowId: params.row.id, btn: 'urina' })}
              sx={{ minWidth: 'auto', px: 0.8, py: 0.3, fontSize: '0.65rem', outline: activeBtn?.rowId === params.row.id && activeBtn?.btn === 'urina' ? '2px solid #6a1b9a' : 'none', outlineOffset: '1px' }}
            >
              Urina
            </Button>
          </Tooltip>
          <Tooltip title="Resultados Iridológicos" arrow componentsProps={{ tooltip: { sx: { fontSize: '0.7rem', py: 0.3, px: 0.8 } } }}>
            <Button
              component={Link}
              to={`/iridology/${params.row.id}`}
              startIcon={<IrisIcon sx={{ fontSize: 14 }} />}
              size="small"
              variant="contained"
              onClick={() => setActiveBtn({ rowId: params.row.id, btn: 'iridologia' })}
              sx={{
                minWidth: 'auto', px: 0.8, py: 0.3, fontSize: '0.65rem',
                bgcolor: '#4a148c', '&:hover': { bgcolor: '#6a1b9a' },
                outline: activeBtn?.rowId === params.row.id && activeBtn?.btn === 'iridologia' ? '2px solid #4a148c' : 'none',
                outlineOffset: '1px',
              }}
            >
              👁️ Iridologia
            </Button>
          </Tooltip>
          <Tooltip title="Histórico do Interagente" arrow componentsProps={{ tooltip: { sx: { fontSize: '0.7rem', py: 0.3, px: 0.8 } } }}>
            <Button
              startIcon={<HistoryIcon sx={{ fontSize: 14 }} />}
              size="small"
              variant="contained"
              onClick={() => handleOpenHistorico(params.row)}
              sx={{ minWidth: 'auto', px: 0.8, py: 0.3, fontSize: '0.65rem', bgcolor: '#37474f', '&:hover': { bgcolor: '#263238' } }}
            >
              Histórico
            </Button>
          </Tooltip>
          <Tooltip title="Excluir" arrow componentsProps={{ tooltip: { sx: { fontSize: '0.7rem', py: 0.3, px: 0.8 } } }}>
            <Button
              startIcon={<DeleteIcon sx={{ fontSize: 14 }} />}
              size="small"
              variant="outlined"
              color="error"
              onClick={() => handleDeleteClick(params.row.id)}
              sx={{ minWidth: 'auto', px: 0.8, py: 0.3, fontSize: '0.65rem' }}
            >
              Excluir
            </Button>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" color="primary">
          Interagentes
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Exportar e importar backup dos dados" arrow>
            <Button
              component={Link}
              to="/backup"
              variant="outlined"
              startIcon={<SaveIcon />}
              sx={{ borderColor: '#1565c0', color: '#1565c0' }}
            >
              💾 Backup
            </Button>
          </Tooltip>
          <Tooltip title="Criar nova anamnese para um interagente" arrow>
          <Button 
            component={Link} 
            to="/anamnese-integrativa-completa" 
            variant="contained" 
            color="primary"
            startIcon={<AddIcon />}
          >
            Nova Anamnese
          </Button>
          </Tooltip>
        </Box>
      </Box>

      <Paper sx={{ height: 'calc(100vh - 150px)', width: '100%' }}>
        <DataGrid
          rows={anamneses}
          columns={columns}
          getRowHeight={() => 'auto'}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 20 },
            },
          }}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell': {
              fontSize: '0.8rem',
              padding: '4px 2px',
              alignItems: 'center',
              overflow: 'visible',
            },
            '& .MuiDataGrid-row': {
              alignItems: 'center',
            },
            '& .MuiDataGrid-columnHeader': {
              padding: '8px 2px',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontSize: '0.8rem',
              fontWeight: 600,
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none',
            },
          }}
        />
      </Paper>

      {/* Dialog de confirmação de exclusão */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir este interagente? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Histórico do Interagente */}
      <Dialog open={historicoDialogOpen} onClose={() => setHistoricoDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HistoryIcon color="action" />
            <Typography variant="h6" component="span">
              Histórico — {historicoPatient?.q01_nome || 'Interagente'}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          {historicoPatient && (() => {
            const eventos = getFullHistorico(historicoPatient);
            if (eventos.length === 0) {
              return (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">Nenhum registro encontrado.</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Use os botões "💾 Salvar no Histórico" nas páginas de análise para registrar atendimentos.
                  </Typography>
                </Box>
              );
            }
            return (
              <Box sx={{ px: 2, py: 1 }}>
                {eventos.map((ev, idx) => (
                  <Box key={ev.id || idx} sx={{ display: 'flex', gap: 2, py: 1.5, borderBottom: idx < eventos.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 40 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: getTipoColor(ev.tipo), mt: 0.4, flexShrink: 0 }} />
                      {idx < eventos.length - 1 && <Box sx={{ width: 2, flex: 1, bgcolor: '#e0e0e0', mt: 0.5 }} />}
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.3 }}>{ev.titulo}</Typography>
                      {ev.resumo && <Typography variant="caption" color="text.secondary" display="block">{ev.resumo}</Typography>}
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5, flexWrap: 'wrap' }}>
                        <Typography variant="caption" color="text.disabled">
                          {ev.data ? new Date(ev.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                        </Typography>
                        {ev.source === 'derived' && <Chip label="auto" size="small" sx={{ height: 16, fontSize: '0.6rem' }} />}
                      </Box>
                    </Box>
                    {ev.pagina && (
                      <Button size="small" variant="outlined" sx={{ fontSize: '0.6rem', py: 0.2, px: 0.8, minWidth: 'auto', alignSelf: 'center', flexShrink: 0 }}
                        onClick={() => { navigate(ev.pagina); setHistoricoDialogOpen(false); }}>
                        Abrir
                      </Button>
                    )}
                  </Box>
                ))}
              </Box>
            );
          })()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHistoricoDialogOpen(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
