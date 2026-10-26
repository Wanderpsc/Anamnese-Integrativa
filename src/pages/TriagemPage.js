import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import {
  Container, Typography, Button, Box, Paper, Tooltip, Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  FilterList as TriagemIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import AnamneseForm from './AnamneseForm';

export default function TriagemPage() {
  const { id } = useParams();

  // Se há um id na rota (/triagem/:id), renderiza o formulário completo de triagem
  if (id) {
    return <AnamneseForm triagem />;
  }

  // Caso contrário, exibe a lista de interagentes para seleção de triagem
  return <TriagemList />;
}

function TriagemList() {
  const navigate = useNavigate();
  const [anamneses, setAnamneses] = useState([]);

  const loadAnamneses = () => {
    const savedAnamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const sortedAnamneses = savedAnamneses.sort((a, b) => {
      const nomeA = (a.q01_nome || '').toLowerCase();
      const nomeB = (b.q01_nome || '').toLowerCase();
      return nomeA.localeCompare(nomeB);
    });
    setAnamneses(sortedAnamneses);
  };

  useEffect(() => {
    loadAnamneses();
    const handleFocus = () => loadAnamneses();
    const handleAnamnesesUpdated = () => loadAnamneses();
    window.addEventListener('focus', handleFocus);
    window.addEventListener('anamneses:updated', handleAnamnesesUpdated);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('anamneses:updated', handleAnamnesesUpdated);
    };
  }, []);

  const handleStartTriagem = (id) => {
    localStorage.setItem('currentPatientId', String(id));
    navigate(`/triagem/${id}`);
  };

  const formatDateShort = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const columns = [
    { field: 'q01_nome', headerName: 'Nome', width: 200 },
    {
      field: 'q02_data_nasc',
      headerName: 'Nasc.',
      width: 80,
      valueFormatter: (params) => {
        if (!params.value) return '';
        return formatDateShort(params.value);
      },
    },
    { field: 'q04_sexo', headerName: 'Sexo', width: 80 },
    {
      field: 'q14_tipo_consulta',
      headerName: 'Tipo',
      width: 110,
      renderCell: (params) => {
        const tipo = params.value || '1ª Consulta';
        return (
          <Box sx={{ fontSize: '0.75rem', fontWeight: 600, color: tipo === '1ª Consulta' ? '#1976d2' : '#ed6c02' }}>
            {tipo}
          </Box>
        );
      },
    },
    {
      field: 'createdAt',
      headerName: '1ª Cons.',
      width: 80,
      renderCell: (params) => {
        const isActive = params.row.q14_tipo_consulta === '1ª Consulta';
        return (
          <Box sx={{
            bgcolor: isActive ? '#c8e6c9' : 'transparent',
            color: isActive ? '#1b5e20' : 'inherit',
            fontWeight: isActive ? 700 : 400,
            fontSize: '0.75rem',
            px: 0.5, py: 0.2, borderRadius: 0.5
          }}>
            {formatDateShort(params.value)}
          </Box>
        );
      },
    },
    {
      field: 'q15_queixa_principal',
      headerName: 'Queixa Principal',
      width: 250,
      renderCell: (params) => (
        <Box sx={{ fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {params.value || <span style={{ color: '#aaa', fontStyle: 'italic' }}>não preenchida</span>}
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 380,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
          <Tooltip title="Iniciar / Editar Triagem" arrow>
            <Button
              startIcon={<TriagemIcon sx={{ fontSize: 14 }} />}
              size="small"
              variant="contained"
              color="success"
              onClick={() => handleStartTriagem(params.row.id)}
              sx={{ minWidth: 'auto', px: 0.8, py: 0.3, fontSize: '0.65rem' }}
            >
              Triagem
            </Button>
          </Tooltip>
          <Tooltip title="Editar apenas dados pessoais" arrow>
            <Button
              component={Link}
              to={`/interagente/edit/${params.row.id}`}
              startIcon={<PersonIcon sx={{ fontSize: 14 }} />}
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => localStorage.setItem('currentPatientId', String(params.row.id))}
              sx={{ minWidth: 'auto', px: 0.8, py: 0.3, fontSize: '0.65rem' }}
            >
              Dados Pessoais
            </Button>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TriagemIcon fontSize="large" /> Triagem
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Selecione um interagente para iniciar ou continuar a triagem clínica
          </Typography>
        </Box>
        <Tooltip title="Cadastrar novo interagente e iniciar triagem" arrow>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Nova Triagem
          </Button>
        </Tooltip>
      </Box>

      <Paper sx={{ height: 'calc(100vh - 180px)', width: '100%' }}>
        <DataGrid
          rows={anamneses}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 20 },
            },
          }}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell': { fontSize: '0.8rem', padding: '8px 2px' },
            '& .MuiDataGrid-columnHeader': { padding: '8px 2px' },
            '& .MuiDataGrid-columnHeaderTitle': { fontSize: '0.8rem', fontWeight: 600 },
            '& .MuiDataGrid-columnSeparator': { display: 'none' },
          }}
        />
      </Paper>
    </Container>
  );
}
