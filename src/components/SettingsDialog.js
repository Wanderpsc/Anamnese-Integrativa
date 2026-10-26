import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import { changePassword, getCurrentSession, isOwner } from '../lib/auth';
import PublicBookingTextEditor from './PublicBookingTextEditor';
import { getSetting, setSetting, getSettingDraft, setSettingDraft, publishSetting, getSettingsHistory } from '../lib/api';

export default function SettingsDialog({ open, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const [ownerPassword, setOwnerPassword] = useState('');
  const [ownerPasswordConfirm, setOwnerPasswordConfirm] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [bookingTextEditorOpen, setBookingTextEditorOpen] = useState(false);
  const [bookingTextValue, setBookingTextValue] = useState('');
  const [bookingDraftValue, setBookingDraftValue] = useState('');
  const [historyEntries, setHistoryEntries] = useState([]);
  const [bookingEditorReadOnly, setBookingEditorReadOnly] = useState(false);
  const [clinicName, setClinicName] = useState('Local de Atendimento Wander Pires');
  const [clinicSub, setClinicSub] = useState('Nutrição Funcional e Terapias Integrativas');
  const [therapistNameVal, setTherapistNameVal] = useState('Wander Pires Silva Coelho');
  const [therapistTitleVal, setTherapistTitleVal] = useState('Terapeuta Integrativo Funcional');
  const [therapistRegVal, setTherapistRegVal] = useState('CRTH-BR 17821');
  const [therapistSpecialtyVal, setTherapistSpecialtyVal] = useState('Naturopatia e Iridologia');
  const [clinicContactVal, setClinicContactVal] = useState('wanderpsc@gmail.com | (89) 9 8139-8723');

  const session = getCurrentSession();

  React.useEffect(() => {
    if (!open) return;
    if (session?.role !== 'owner') return;
    (async () => {
      try {
        const s = await getSetting('publicBookingCopy');
        if (s) setBookingTextValue(typeof s === 'string' ? s : JSON.parse(s));
      } catch (e) {
        const stored = JSON.parse(localStorage.getItem('settings') || '{}').publicBookingCopy;
        if (stored) setBookingTextValue(stored);
      }
      // load draft
      try {
        const d = await getSettingDraft('publicBookingCopy');
        if (d) setBookingDraftValue(typeof d === 'string' ? d : JSON.parse(d));
      } catch (e) {
        const dd = JSON.parse(localStorage.getItem('settings_draft') || '{}').publicBookingCopy;
        if (dd) setBookingDraftValue(dd);
      }
      // load clinic header settings
      try {
        const clinicS = await getSetting('clinicInfo');
        if (clinicS) {
          const parsed = typeof clinicS === 'string' ? JSON.parse(clinicS) : clinicS;
          setClinicName(parsed?.clinicName || clinicName);
          setClinicSub(parsed?.clinicSub || clinicSub);
          setTherapistNameVal(parsed?.therapistName || therapistNameVal);
          setTherapistTitleVal(parsed?.therapistTitle || therapistTitleVal);
          setTherapistSpecialtyVal(parsed?.therapistSpecialty || therapistSpecialtyVal);
          setTherapistRegVal(parsed?.therapistReg || therapistRegVal);
          setClinicContactVal(parsed?.contact || clinicContactVal);
        }
      } catch (e) { /* ignore */ }
      // load history
      try {
        const hist = await getSettingsHistory('publicBookingCopy');
        setHistoryEntries(hist);
      } catch (e) {
        const histLocal = JSON.parse(localStorage.getItem('settings_history') || '[]').filter(h => h.key === 'publicBookingCopy');
        setHistoryEntries(histLocal);
      }
    })();
  }, [open, session?.role]);

  const handleChangeOwnerPassword = () => {
    setMessage({ type: '', text: '' });

    if (!ownerPassword || !ownerPasswordConfirm) {
      setMessage({ type: 'error', text: 'Preencha todos os campos' });
      return;
    }

    if (ownerPassword !== ownerPasswordConfirm) {
      setMessage({ type: 'error', text: 'As senhas não conferem' });
      return;
    }

    if (ownerPassword.length < 6) {
      setMessage({ type: 'error', text: 'Senha deve ter no mínimo 6 caracteres' });
      return;
    }

    const result = changePassword('owner', ownerPassword, session.role);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Senha do proprietário alterada com sucesso!' });
      setOwnerPassword('');
      setOwnerPasswordConfirm('');
    } else {
      setMessage({ type: 'error', text: result.error });
    }
  };

  const handleChangeUserPassword = () => {
    setMessage({ type: '', text: '' });

    if (!userPassword || !userPasswordConfirm) {
      setMessage({ type: 'error', text: 'Preencha todos os campos' });
      return;
    }

    if (userPassword !== userPasswordConfirm) {
      setMessage({ type: 'error', text: 'As senhas não conferem' });
      return;
    }

    if (userPassword.length < 6) {
      setMessage({ type: 'error', text: 'Senha deve ter no mínimo 6 caracteres' });
      return;
    }

    const result = changePassword('user', userPassword, session.role);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Senha do usuário alterada com sucesso!' });
      setUserPassword('');
      setUserPasswordConfirm('');
    } else {
      setMessage({ type: 'error', text: result.error });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        ⚙️ Configurações do Sistema
      </DialogTitle>
      
      <DialogContent>
        {session?.role === 'owner' ? (
          <>
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mb: 3 }}>
              <Tab label="Senha Proprietário" />
              <Tab label="Senha Usuário" />
              <Tab label="Sobre" />
                <Tab label="Cabeçalho" />
                <Tab label="Texto Agendamento" />
            </Tabs>
              {activeTab === 3 && (
              <Box>
                <Typography variant="body2" sx={{ mb: 2 }}>Informações do Cabeçalho do Comprovante</Typography>
                <TextField fullWidth label="Local de Atendimento" value={clinicName} onChange={(e) => setClinicName(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth label="Subtítulo" value={clinicSub} onChange={(e) => setClinicSub(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth label="Nome do Terapeuta" value={therapistNameVal} onChange={(e) => setTherapistNameVal(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth label="Título do Terapeuta" value={therapistTitleVal} onChange={(e) => setTherapistTitleVal(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth label="Especialidade do Terapeuta" value={therapistSpecialtyVal} onChange={(e) => setTherapistSpecialtyVal(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth label="Registro do Terapeuta" value={therapistRegVal} onChange={(e) => setTherapistRegVal(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth label="Contato" value={clinicContactVal} onChange={(e) => setClinicContactVal(e.target.value)} sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="contained" onClick={async () => {
                    try {
                      const payload = { clinicName, clinicSub, therapistName: therapistNameVal, therapistTitle: therapistTitleVal, therapistSpecialty: therapistSpecialtyVal, therapistReg: therapistRegVal, contact: clinicContactVal };
                      await setSetting('clinicInfo', payload);
                      setMessage({ type: 'success', text: 'Informações salvas com sucesso' });
                    } catch (e) { setMessage({ type: 'error', text: 'Falha ao salvar' }); }
                  }}>Salvar</Button>
                </Box>
              </Box>
            )}

            {message.text && (
              <Alert severity={message.type} sx={{ mb: 2 }}>
                {message.text}
              </Alert>
            )}

            {activeTab === 0 && (
              <Box>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Alterar senha do proprietário (admin)
                </Typography>
                <TextField
                  fullWidth
                  label="Nova Senha"
                  type="password"
                  value={ownerPassword}
                  onChange={(e) => setOwnerPassword(e.target.value)}
                  sx={{ mb: 2 }}
                  helperText="Mínimo 6 caracteres"
                />
                <TextField
                  fullWidth
                  label="Confirmar Nova Senha"
                  type="password"
                  value={ownerPasswordConfirm}
                  onChange={(e) => setOwnerPasswordConfirm(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleChangeOwnerPassword}
                  fullWidth
                >
                  Alterar Senha Proprietário
                </Button>
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Alterar senha do usuário
                </Typography>
                <TextField
                  fullWidth
                  label="Nova Senha"
                  type="password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  sx={{ mb: 2 }}
                  helperText="Mínimo 6 caracteres"
                />
                <TextField
                  fullWidth
                  label="Confirmar Nova Senha"
                  type="password"
                  value={userPasswordConfirm}
                  onChange={(e) => setUserPasswordConfirm(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleChangeUserPassword}
                  fullWidth
                >
                  Alterar Senha Usuário
                </Button>
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Typography variant="body2" paragraph>
                  <strong>Sistema de Anamnese Integrativa</strong>
                </Typography>
                <Typography variant="body2" paragraph>
                  Desenvolvido para Wander Pires Silva Coelho<br/>
                  CRTH-BR 17821
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Versão:</strong> 2.0.0<br/>
                  <strong>Tipo:</strong> Progressive Web App (PWA)<br/>
                  <strong>Funciona:</strong> Online e Offline
                </Typography>
                <Alert severity="info">
                  Este aplicativo pode ser instalado em seu dispositivo e funciona mesmo sem internet!
                </Alert>
              </Box>
            )}

              {activeTab === 3 && (
                <Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>Texto exibido na página pública de agendamento</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Button variant="outlined" onClick={() => { setBookingEditorReadOnly(false); setBookingTextEditorOpen(true); }} >Editar Texto de Agendamento (Rascunho)</Button>
                    <Button variant="contained" color="success" onClick={async () => {
                      // publish draft
                      try {
                        const published = await publishSetting('publicBookingCopy', session?.id);
                        setMessage({ type: 'success', text: 'Texto publicado com sucesso.' });
                        // refresh local value
                        const s = await getSetting('publicBookingCopy');
                        setBookingTextValue(s);
                      } catch (e) {
                        setMessage({ type: 'error', text: 'Falha ao publicar' });
                      }
                    }}>Publicar</Button>
                    <Button variant="outlined" color="info" onClick={() => {
                      // preview
                      setBookingEditorReadOnly(true);
                      setBookingTextEditorOpen(true);
                      setBookingDraftValue(bookingDraftValue || bookingTextValue);
                    }}>Visualizar Rascunho</Button>
                  </Box>
                  {historyEntries.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant='body2' sx={{ mb: 1, fontWeight: 'bold' }}>Histórico de alterações</Typography>
                      <Box sx={{ maxHeight: 220, overflow: 'auto' }}>
                        {historyEntries.map(h => (
                          <Box key={h.id || h.changed_at} sx={{ p: 1, borderBottom: '1px dashed #eee' }}>
                            <Typography variant='caption'>{new Date(h.changed_at).toLocaleString()} — {h.action} — {h.changed_by || '—'}</Typography>
                            <Typography variant='body2'>{String(h.new_value).slice(0, 300)}{String(h.new_value).length > 300 ? '...' : ''}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                  <PublicBookingTextEditor readOnly={bookingEditorReadOnly} open={bookingTextEditorOpen} initial={bookingDraftValue || bookingTextValue} onClose={() => setBookingTextEditorOpen(false)} onSave={async (v) => {
                    setBookingDraftValue(v);
                    setBookingTextEditorOpen(false);
                    try {
                      await setSettingDraft('publicBookingCopy', v, session?.id);
                      setMessage({ type: 'success', text: 'Rascunho salvo' });
                    } catch (e) {
                      setMessage({ type: 'error', text: 'Falha ao salvar rascunho' });
                    }
                  }} />
                </Box>
              )}
          </>
        ) : (
          <Alert severity="warning">
            Apenas o proprietário pode acessar as configurações.
          </Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
