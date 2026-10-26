import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { safeSetItem } from '../lib/localStorageSafe';

const BloodTestsList = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, testId: null });

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = () => {
    const storedTests = JSON.parse(localStorage.getItem('bloodTests') || '[]');
    setTests(storedTests);
  };

  const handleNew = () => {
    navigate('/blood-test-form');
  };

  const handleEdit = (id) => {
    navigate(`/blood-test-form/${id}`);
  };

  const handleDeleteClick = (id) => {
    setDeleteDialog({ open: true, testId: id });
  };

  const handleDeleteConfirm = () => {
    const updatedTests = tests.filter(t => t.id !== deleteDialog.testId);
    if (!safeSetItem('bloodTests', updatedTests)) console.warn('Failed to save bloodTests to localStorage (quota exceeded)');
    setTests(updatedTests);
    setDeleteDialog({ open: false, testId: null });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, testId: null });
  };

  const columns = [
    {
      field: 'patientName',
      headerName: 'Paciente',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'testDate',
      headerName: 'Data do Exame',
      width: 130,
      valueGetter: (value) => {
        if (!value) return '';
        const date = new Date(value);
        return date.toLocaleDateString('pt-BR');
      },
    },
    {
      field: 'laboratory',
      headerName: 'Laboratório',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'requestingDoctor',
      headerName: 'Solicitante',
      flex: 1,
      minWidth: 180,
    },
    {
      field: 'createdAt',
      headerName: 'Cadastrado em',
      width: 150,
      valueGetter: (value) => {
        if (!value) return '';
        const date = new Date(value);
        return date.toLocaleDateString('pt-BR');
      },
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEdit(params.row.id)}
            title="Editar"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDeleteClick(params.row.id)}
            title="Excluir"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ color: '#d32f2f', fontWeight: 600 }}>
            🩸 Exames de Sangue
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleNew}
          >
            Novo Exame
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={tests}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          />
        </Box>
      </Paper>

      {/* Dialog de confirmação de exclusão */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir este exame de sangue?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BloodTestsList;
