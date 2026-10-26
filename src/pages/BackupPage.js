import { useState, useRef } from 'react';
import {
  Container, Typography, Box, Paper, Button, Alert, Divider,
  List, ListItem, ListItemText, ListItemSecondaryAction, Chip, Stack
} from '@mui/material';
import {
  CloudDownload as DownloadIcon,
  CloudUpload as UploadIcon,
  Save as SaveIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const LS_KEYS_BACKUP = [
  'anamneses',
  'therapeutic_data',
  'boarim_protocols',
  'saved_protocols',
  'historico',
  'iridology-manual-patient-draft',
];

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getStorageInfo() {
  const items = [];
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const val = localStorage.getItem(key) || '';
    const size = new Blob([val]).size;
    total += size;
    items.push({ key, size });
  }
  items.sort((a, b) => b.size - a.size);
  return { items, total };
}

export default function BackupPage() {
  const [msg, setMsg] = useState(null); // { type: 'success'|'error'|'info', text: '' }
  const [storageInfo] = useState(() => getStorageInfo());
  const fileInputRef = useRef(null);

  const showMsg = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 5000);
  };

  // ─── Exportar TUDO (backup completo) ─────────────────────────────────────
  const handleExportAll = () => {
    const snapshot = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try { snapshot[key] = JSON.parse(localStorage.getItem(key)); }
      catch { snapshot[key] = localStorage.getItem(key); }
    }
    const payload = {
      _meta: {
        tipo: 'backup-completo',
        versao: '1.0',
        data: new Date().toISOString(),
        totalChaves: Object.keys(snapshot).length,
      },
      dados: snapshot,
    };
    download(JSON.stringify(payload, null, 2), `backup-completo-${dateStr()}.json`);
    showMsg('success', 'Backup completo exportado com sucesso!');
  };

  // ─── Exportar apenas pacientes ────────────────────────────────────────────
  const handleExportPacientes = () => {
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const payload = {
      _meta: {
        tipo: 'backup-pacientes',
        versao: '1.0',
        data: new Date().toISOString(),
        totalPacientes: anamneses.length,
      },
      anamneses,
    };
    download(JSON.stringify(payload, null, 2), `backup-pacientes-${dateStr()}.json`);
    showMsg('success', `${anamneses.length} paciente(s) exportado(s) com sucesso!`);
  };

  // ─── Importar backup ─────────────────────────────────────────────────────
  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        const tipo = parsed?._meta?.tipo;

        if (tipo === 'backup-completo') {
          const confirm = window.confirm(
            `⚠️ Isso irá SUBSTITUIR todos os dados atuais pelo backup de ${new Date(parsed._meta.data).toLocaleString('pt-BR')}.\n\nTotal de chaves: ${parsed._meta.totalChaves}\n\nDeseja continuar?`
          );
          if (!confirm) return;
          Object.entries(parsed.dados).forEach(([k, v]) => {
            localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
          });
          showMsg('success', 'Backup completo restaurado! Recarregue a página para ver as alterações.');

        } else if (tipo === 'backup-pacientes') {
          const incoming = parsed.anamneses || [];
          const existing = JSON.parse(localStorage.getItem('anamneses') || '[]');
          const existingIds = new Set(existing.map(a => String(a.id)));
          const novos = incoming.filter(a => !existingIds.has(String(a.id)));
          const merged = [...existing, ...novos];
          localStorage.setItem('anamneses', JSON.stringify(merged));
          showMsg('success', `${novos.length} paciente(s) novo(s) importado(s). ${incoming.length - novos.length} já existiam e foram preservados.`);
          window.dispatchEvent(new CustomEvent('anamneses:updated'));

        } else {
          // Tentar como array direto de anamneses (formato legado)
          if (Array.isArray(parsed)) {
            const confirm = window.confirm(
              `Arquivo contém ${parsed.length} registros de pacientes. Mesclar com os dados existentes?`
            );
            if (!confirm) return;
            const existing = JSON.parse(localStorage.getItem('anamneses') || '[]');
            const existingIds = new Set(existing.map(a => String(a.id)));
            const novos = parsed.filter(a => !existingIds.has(String(a.id)));
            localStorage.setItem('anamneses', JSON.stringify([...existing, ...novos]));
            showMsg('success', `${novos.length} paciente(s) importado(s).`);
            window.dispatchEvent(new CustomEvent('anamneses:updated'));
          } else {
            showMsg('error', 'Arquivo não reconhecido. Use um arquivo gerado por esta página de backup.');
          }
        }
      } catch {
        showMsg('error', 'Erro ao ler o arquivo. Verifique se é um JSON válido.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        💾 Backup de Dados
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Os dados do app ficam salvos no <strong>localStorage do navegador</strong>. Use esta página para exportar cópias de segurança e restaurar dados quando necessário.
      </Typography>

      {msg && (
        <Alert severity={msg.type} sx={{ mb: 3 }} onClose={() => setMsg(null)}>
          {msg.text}
        </Alert>
      )}

      {/* ── Exportar ── */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>📤 Exportar Backup</Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleExportPacientes}
            sx={{ bgcolor: '#1565c0', '&:hover': { bgcolor: '#0d47a1' } }}
            fullWidth
          >
            👥 Backup de Pacientes
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleExportAll}
            sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
            fullWidth
          >
            🗄️ Backup Completo do Programa
          </Button>
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          • <strong>Backup de Pacientes</strong>: exporta apenas as fichas de anamnese (mais leve e seguro para enviar).<br />
          • <strong>Backup Completo</strong>: exporta tudo — pacientes, protocolos, histórico e configurações.
        </Typography>
      </Paper>

      {/* ── Importar ── */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>📥 Restaurar Backup</Typography>
        <Divider sx={{ mb: 2 }} />
        <Alert severity="warning" sx={{ mb: 2 }}>
          <strong>Backup completo</strong> substitui todos os dados atuais. <strong>Backup de pacientes</strong> mescla com os existentes (sem duplicar).
        </Alert>
        <Button
          variant="outlined"
          startIcon={<UploadIcon />}
          onClick={handleImportClick}
          color="warning"
          fullWidth
        >
          📂 Selecionar arquivo de backup (.json)
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Paper>

      {/* ── Uso do armazenamento ── */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>📊 Uso do Armazenamento</Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          {storageInfo.total < 4 * 1024 * 1024
            ? <CheckCircleIcon color="success" fontSize="small" />
            : <WarningIcon color="warning" fontSize="small" />}
          <Typography variant="body2">
            Total usado: <strong>{formatBytes(storageInfo.total)}</strong> de ~5 MB disponíveis
          </Typography>
        </Box>
        <List dense>
          {storageInfo.items.slice(0, 10).map(({ key, size }) => (
            <ListItem key={key} sx={{ py: 0.3, px: 0 }}>
              <ListItemText
                primary={key}
                primaryTypographyProps={{ variant: 'body2', sx: { fontFamily: 'monospace', fontSize: '0.78rem' } }}
              />
              <ListItemSecondaryAction>
                <Chip label={formatBytes(size)} size="small" variant="outlined" />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        {storageInfo.items.length > 10 && (
          <Typography variant="caption" color="text.secondary">
            + {storageInfo.items.length - 10} chave(s) menores
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

function dateStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function download(content, filename) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type: 'application/json' }));
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
