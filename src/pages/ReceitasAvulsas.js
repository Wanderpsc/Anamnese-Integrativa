import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Paper,
  CircularProgress,
  InputAdornment,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Chip,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import receitas from '../data/receitasAvulsas.json';
import { buildLetterheadHtml, openPrintWindow, downloadPdfFromHtml } from '../components/PrintTemplate';
import { appendHistoricoEntry } from '../lib/historicoUtils';
import SaveToPatientBar from '../components/SaveToPatientBar';

const CUSTOM_STORAGE_KEY = 'receitasPersonalizadas';

function loadCustomReceitas() {
  try { return JSON.parse(localStorage.getItem(CUSTOM_STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveCustomReceitas(list) {
  localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(list));
}

function getCurrentPatient() {
  try {
    const pid = localStorage.getItem('currentPatientId');
    if (!pid) return null;
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    return anamneses.find(a => String(a.id) === String(pid)) || null;
  } catch { return null; }
}

function textToHtml(text) {
  if (!text) return '';
  return text
    .split(/\n{2,}/)
    .map(para => `<p>${para.replace(/\n/g, '<br/>')}</p>`)
    .join('\n');
}

export default function ReceitasAvulsas() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientCpf, setPatientCpf] = useState('');
  const [issueDate, setIssueDate] = useState(
    new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  );
  const [busy, setBusy] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  // Custom prescriptions state
  const [customReceitas, setCustomReceitas] = useState(loadCustomReceitas);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draftName, setDraftName] = useState('');
  const [draftContent, setDraftContent] = useState('');

  // Auto-load current patient
  useEffect(() => {
    const patient = getCurrentPatient();
    if (patient) {
      setPatientName(patient.q01_nome || '');
      setPatientAge(String(patient.q03_idade || ''));
      setPatientCpf(patient.q14_cpf || '');
    }
  }, []);

  const showMsg = useCallback((msg) => {
    setSavedMsg(msg);
    setTimeout(() => setSavedMsg(''), 3000);
  }, []);

  // All list items: custom first, then standard
  const allItems = useMemo(
    () => [...customReceitas.map(r => ({ ...r, isCustom: true })), ...receitas],
    [customReceitas]
  );

  const filtered = useMemo(
    () => allItems.filter(r => r.displayName.toLowerCase().includes(search.toLowerCase())),
    [search, allItems]
  );

  // ── Dialog handlers ──
  function openCreateDialog() {
    setEditingId(null);
    setDraftName('');
    setDraftContent('');
    setDialogOpen(true);
  }

  function openEditDialog(receita) {
    setEditingId(receita.id);
    setDraftName(receita.displayName);
    setDraftContent(receita.textContent || '');
    setDialogOpen(true);
  }

  function handleSaveCustom() {
    if (!draftName.trim()) return;
    const htmlContent = textToHtml(draftContent);
    let updated;
    if (editingId) {
      updated = customReceitas.map(r =>
        r.id === editingId
          ? { ...r, displayName: draftName.trim(), textContent: draftContent, htmlContent, updatedAt: new Date().toISOString() }
          : r
      );
      if (selected?.id === editingId) {
        setSelected(prev => ({ ...prev, displayName: draftName.trim(), textContent: draftContent, htmlContent }));
      }
    } else {
      const newReceita = {
        id: `custom-${Date.now()}`,
        displayName: draftName.trim(),
        textContent: draftContent,
        htmlContent,
        isCustom: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      updated = [newReceita, ...customReceitas];
    }
    saveCustomReceitas(updated);
    setCustomReceitas(updated);
    setDialogOpen(false);
    showMsg(editingId ? 'Receita atualizada com sucesso!' : 'Receita criada com sucesso!');
  }

  function handleDeleteCustom(id, e) {
    e.stopPropagation();
    if (!window.confirm('Excluir esta receita personalizada?')) return;
    const updated = customReceitas.filter(r => r.id !== id);
    saveCustomReceitas(updated);
    setCustomReceitas(updated);
    if (selected?.id === id) setSelected(null);
  }

  // ── Print / PDF ──
  function buildPatientBlock() {
    const parts = [];
    if (patientName) parts.push(`<strong>Paciente:</strong> ${patientName}`);
    if (patientAge) parts.push(`<strong>Idade:</strong> ${patientAge} anos`);
    if (patientCpf) parts.push(`<strong>CPF:</strong> ${patientCpf}`);
    if (issueDate) parts.push(`<strong>Data:</strong> ${issueDate}`);
    if (parts.length === 0) return '';
    return `
      <div style="border:1px solid #a5d6a7;border-radius:4px;padding:8px 14px;
                  margin-bottom:14px;background:#f9fbe7;font-size:11px;line-height:1.8;">
        ${parts.join(' &nbsp;·&nbsp; ')}
      </div>`;
  }

  async function getFullHtml() {
    return buildLetterheadHtml({
      title: selected.displayName,
      bodyHtml: buildPatientBlock() + (selected.htmlContent || '<p>Conteúdo não disponível.</p>'),
    });
  }

  function recordInHistorico() {
    try {
      const pid = localStorage.getItem('currentPatientId');
      if (!pid || !selected) return;
      appendHistoricoEntry(pid, {
        tipo: 'receita_avulsa',
        titulo: `📋 Receita: ${selected.displayName}`,
        resumo: patientName ? `Emitida para ${patientName}` : 'Receita avulsa emitida',
        pagina: '/receitas-avulsas',
      });
    } catch { /* silent */ }
  }

  async function handlePrint() {
    if (!selected) return;
    setBusy(true);
    try {
      const html = await getFullHtml();
      openPrintWindow(html);
      recordInHistorico();
      if (localStorage.getItem('currentPatientId')) showMsg('Registrado no histórico do paciente!');
    } finally { setBusy(false); }
  }

  async function handleDownload() {
    if (!selected) return;
    setBusy(true);
    try {
      const html = await getFullHtml();
      const filename = patientName
        ? `${selected.displayName} - ${patientName}.pdf`
        : `${selected.displayName}.pdf`;
      await downloadPdfFromHtml(html, filename);
      recordInHistorico();
      if (localStorage.getItem('currentPatientId')) showMsg('Registrado no histórico do paciente!');
    } finally { setBusy(false); }
  }

  const isCustomSelected = selected?.isCustom;
  const accentColor = isCustomSelected ? '#e65100' : '#2e7d32';
  const accentLight = isCustomSelected ? '#fff3e0' : '#f9fbe7';

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 56px)', overflow: 'hidden' }}>

      {/* ── Left panel ── */}
      <Paper
        elevation={3}
        sx={{ width: 300, minWidth: 300, display: 'flex', flexDirection: 'column', borderRadius: 0, borderRight: '1px solid', borderColor: 'divider' }}
      >
        <Box sx={{ p: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '0.95rem', color: 'primary.main' }}>
              📋 Receitas Avulsas
            </Typography>
            <Tooltip title="Criar receita personalizada">
              <Button
                size="small"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={openCreateDialog}
                sx={{ fontSize: '0.7rem', px: 1, py: 0.4, bgcolor: '#e65100', '&:hover': { bgcolor: '#bf360c' } }}
              >
                Nova
              </Button>
            </Tooltip>
          </Box>
          <TextField
            fullWidth size="small" placeholder="Buscar receita..."
            value={search} onChange={e => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            {filtered.length} de {allItems.length} receitas
            {customReceitas.length > 0 && ` · ${customReceitas.length} pessoais`}
          </Typography>
        </Box>

        <List sx={{ overflow: 'auto', flex: 1, py: 0 }}>
          {filtered.map(r => r.isCustom ? (
            <ListItem
              key={r.id}
              disablePadding
              secondaryAction={
                <Box sx={{ display: 'flex', gap: 0 }}>
                  <Tooltip title="Editar">
                    <IconButton size="small" onClick={e => { e.stopPropagation(); openEditDialog(r); }} sx={{ p: 0.3 }}>
                      <EditIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton size="small" color="error" onClick={e => handleDeleteCustom(r.id, e)} sx={{ p: 0.3 }}>
                      <DeleteIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
              sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
            >
              <ListItemButton
                selected={selected?.id === r.id}
                onClick={() => setSelected(r)}
                sx={{
                  py: 0.6, pl: 1.5, pr: 8,
                  '&.Mui-selected': { background: 'linear-gradient(135deg,#fff3e0,#fbe9e7)', borderLeft: '3px solid #e65100' },
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography sx={{ fontSize: '0.78rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {r.displayName}
                      </Typography>
                      <Chip label="minha" size="small" sx={{ height: 14, fontSize: '0.58rem', bgcolor: '#e65100', color: '#fff', '& .MuiChip-label': { px: 0.5 } }} />
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem key={r.id} disablePadding sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
              <ListItemButton
                selected={selected?.id === r.id}
                onClick={() => setSelected(r)}
                sx={{
                  py: 0.75, px: 1.5,
                  '&.Mui-selected': { background: 'linear-gradient(135deg,#e8f5e9,#f1f8e9)', borderLeft: '3px solid #2e7d32' },
                }}
              >
                <ListItemText primary={r.displayName} primaryTypographyProps={{ fontSize: '0.78rem', noWrap: true }} />
              </ListItemButton>
            </ListItem>
          ))}
          {filtered.length === 0 && (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Nenhuma receita encontrada</Typography>
            </Box>
          )}
        </List>
      </Paper>

      {/* ── Right panel ── */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {savedMsg && <Alert severity="success" sx={{ borderRadius: 0, py: 0.5 }}>{savedMsg}</Alert>}

        {selected ? (
          <>
            {/* Form strip */}
            <Paper
              elevation={1}
              sx={{
                p: 1.5, borderRadius: 0, borderBottom: '2px solid',
                borderColor: isCustomSelected ? 'warning.light' : 'success.light',
                background: `linear-gradient(to right, ${accentLight}, #fff)`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: '0.85rem', flex: 1, color: accentColor }}>
                  {selected.displayName}
                  {isCustomSelected && <Chip label="Personalizada" size="small" sx={{ ml: 1, height: 16, fontSize: '0.6rem', bgcolor: '#e65100', color: '#fff', '& .MuiChip-label': { px: 0.6 } }} />}
                </Typography>
                {isCustomSelected && (
                  <Button size="small" variant="outlined" startIcon={<EditIcon />} onClick={() => openEditDialog(selected)}
                    sx={{ fontSize: '0.7rem', color: '#e65100', borderColor: '#e65100' }}>
                    Editar conteúdo
                  </Button>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField size="small" label="Paciente" value={patientName} onChange={e => setPatientName(e.target.value)} sx={{ flex: 2, minWidth: 160 }} />
                <TextField size="small" label="Idade" value={patientAge} onChange={e => setPatientAge(e.target.value)} sx={{ width: 70 }} inputProps={{ maxLength: 5 }} />
                <TextField size="small" label="CPF" value={patientCpf} onChange={e => setPatientCpf(e.target.value)} sx={{ width: 130 }} inputProps={{ maxLength: 14 }} />
                <TextField size="small" label="Data" value={issueDate} onChange={e => setIssueDate(e.target.value)} sx={{ width: 120 }} />
                <Divider orientation="vertical" flexItem />
                <Button
                  variant="contained" size="small"
                  startIcon={busy ? <CircularProgress size={14} color="inherit" /> : <PrintIcon />}
                  onClick={handlePrint} disabled={busy}
                  sx={{ bgcolor: accentColor, '&:hover': { bgcolor: isCustomSelected ? '#bf360c' : '#1b5e20' } }}
                >
                  Imprimir
                </Button>
                <Button
                  variant="outlined" size="small" startIcon={<DownloadIcon />}
                  onClick={handleDownload} disabled={busy}
                  sx={{ color: accentColor, borderColor: accentColor }}
                >
                  Baixar PDF
                </Button>
              </Box>
            </Paper>

            {/* Preview */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 2, bgcolor: '#f5f5f5' }}>
              <Paper
                elevation={3}
                sx={{
                  maxWidth: 820, mx: 'auto', p: '24px 32px',
                  borderTop: `4px solid ${accentColor}`,
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '0.82rem', lineHeight: 1.55, color: '#1a1a1a',
                  '& p': { marginBottom: '6px' },
                  '& h1,& h2,& h3,& h4': { color: isCustomSelected ? '#bf360c' : '#1b5e20', marginBottom: '6px', marginTop: '10px' },
                  '& table': { width: '100%', borderCollapse: 'collapse', marginBottom: '8px', fontSize: '0.78rem' },
                  '& td,& th': { border: '1px solid #c8e6c9', padding: '3px 7px', verticalAlign: 'top' },
                  '& th': { backgroundColor: '#e8f5e9', fontWeight: 'bold', color: '#1b5e20' },
                  '& ul,& ol': { paddingLeft: '20px', marginBottom: '6px' },
                  '& li': { marginBottom: '2px' },
                  '& strong': { color: isCustomSelected ? '#bf360c' : '#1b5e20' },
                }}
                dangerouslySetInnerHTML={{ __html: selected.htmlContent || '<p><em>Sem conteúdo.</em></p>' }}
              />
            </Box>
          </>
        ) : (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
            <ArticleIcon sx={{ fontSize: 72, color: 'text.disabled' }} />
            <Typography variant="h6" color="text.secondary">Selecione uma receita para visualizar</Typography>
            <Typography variant="body2" color="text.secondary">{allItems.length} receitas disponíveis</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={openCreateDialog}
              sx={{ mt: 1, bgcolor: '#e65100', '&:hover': { bgcolor: '#bf360c' } }}>
              Criar Receita Personalizada
            </Button>
          </Box>
        )}
      </Box>

      {/* ── Create / Edit Dialog ── */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: '#e65100', borderBottom: '2px solid #e65100', pb: 1.5 }}>
          {editingId ? '✏️ Editar Receita Personalizada' : '✏️ Nova Receita Personalizada'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2.5 }}>
          <TextField
            fullWidth autoFocus
            label="Título da receita *"
            value={draftName}
            onChange={e => setDraftName(e.target.value)}
            sx={{ mb: 2.5 }}
            placeholder="Ex: Fórmula Modulação Intestinal — Paciente Ansioso"
          />
          <TextField
            fullWidth
            label="Conteúdo da receita"
            multiline minRows={14} maxRows={26}
            value={draftContent}
            onChange={e => setDraftContent(e.target.value)}
            variant="outlined"
            placeholder={`Digite o conteúdo aqui...\n\nExemplo:\n\nFÓRMULA PERSONALIZADA\n\nL-Glutamina — 5.000 mg — em jejum\nZinco carnosina — 75 mg — 2x ao dia\nVitamina D3 — 5.000 UI — com almoço\n\nPOSOLOGIA\n1 cápsula pela manhã com água filtrada.\n\nOBSERVAÇÕES\nManter longe da luz e umidade. Uso por 60 dias.`}
            inputProps={{ style: { fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.6 } }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            Use linhas em branco para separar parágrafos. A formatação é preservada na impressão.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit">Cancelar</Button>
          <Button
            variant="contained" startIcon={<SaveIcon />}
            onClick={handleSaveCustom} disabled={!draftName.trim()}
            sx={{ bgcolor: '#e65100', '&:hover': { bgcolor: '#bf360c' } }}
          >
            Salvar Receita
          </Button>
        </DialogActions>
      </Dialog>

      <SaveToPatientBar
        moduleKey="receitasAvulsas"
        getData={() => selected ? {
          selectedRecipe: selected,
          customReceitas,
          savedAt: new Date().toISOString(),
        } : null}
        label="Salvar receita selecionada no interagente"
      />
    </Box>
  );
}
