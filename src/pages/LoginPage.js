import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link
} from '@mui/material';
import { Visibility, VisibilityOff, LoginOutlined, LockReset } from '@mui/icons-material';
import { login, logout } from '../lib/auth';

export default function LoginPage({ onLoginSuccess, initialUser, onForceContinue }) {
  const [username, setUsername] = useState(initialUser?.username || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('owner');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      onLoginSuccess(result.session);
    } else {
      setError(result.error);
    }
  };

  const handleQuickLogin = (type) => {
    if (type === 'owner') {
      setUsername('wander');
      setUserType('owner');
    } else {
      setUsername('usuario');
      setUserType('user');
    }
  };

  const handleContinueAs = () => {
    if (initialUser) {
      onLoginSuccess(initialUser);
      if (onForceContinue) onForceContinue();
    }
  };

  const handleLogoutFromSession = () => {
    logout();
    // Ensure the login form is reset
    setUsername('');
    setPassword('');
    if (onForceContinue) onForceContinue();
    // dispatch a storage event to notify other tabs
    try { window.dispatchEvent(new StorageEvent('storage', { key: 'app_session', newValue: null })); } catch (e) { /* ignore */ }
  };

  const handleForgotPassword = async () => {
    setError('');
    setResetSuccess('');
    
    if (!resetEmail) {
      setError('Por favor, informe o email ou usuário cadastrado');
      return;
    }

    // Tentar recuperação via Supabase se configurado
    try {
      const supabase = require('../lib/supabase').default;
      if (supabase) {
        const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);
        if (error) {
          setError('Email não encontrado ou erro ao enviar recuperação');
        } else {
          setResetSuccess('Email de recuperação enviado! Verifique sua caixa de entrada.');
          setTimeout(() => {
            setForgotPasswordOpen(false);
            setResetEmail('');
            setResetSuccess('');
          }, 3000);
        }
        return;
      }
    } catch (e) {
      // Supabase não configurado, usar sistema local
    }

    // Sistema local: mostrar informações de contato do admin
    setResetSuccess('Entre em contato com o administrador pelo email: wanderpsc@gmail.com para recuperar sua senha.');
  };

  // Obter logo do terapeuta
  let therapistImg = null;
  try { therapistImg = require('../assets/therapist-symbol.jpg'); } catch (e) { /* opcional */ }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Logo e Título */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            {therapistImg && (
              <img 
                src={therapistImg} 
                alt="Logo" 
                style={{ height: 80, marginBottom: 16 }}
              />
            )}
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#667eea', mb: 1 }}>
              Anamnese Integrativa
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Wander Pires Silva Coelho - CRTH-BR 17821
            </Typography>
          </Box>

          {/* Alerta de erro */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Tipo de Acesso</InputLabel>
              <Select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                label="Tipo de Acesso"
              >
                <MenuItem value="owner">👨‍⚕️ Proprietário (Admin)</MenuItem>
                <MenuItem value="user">👤 Usuário (Visualizador)</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
              autoComplete="username"
            />

            <TextField
              fullWidth
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              startIcon={<LoginOutlined />}
              sx={{
                py: 1.5,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
                }
              }}
            >
              Entrar
            </Button>
          </form>

          {/* Link de Esqueceu a senha */}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => setForgotPasswordOpen(true)}
              sx={{
                color: '#667eea',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Esqueceu a senha?
            </Link>
          </Box>

          {/* Botões de acesso rápido para desenvolvimento */}
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e0e0e0' }}>
            <Typography variant="caption" display="block" sx={{ mb: 1, color: 'text.secondary', textAlign: 'center' }}>
              Acesso rápido (desenvolvimento):
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleQuickLogin('owner')}
                sx={{ flex: 1 }}
              >
                Admin
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleQuickLogin('user')}
                sx={{ flex: 1 }}
              >
                Usuário
              </Button>
            </Box>
          </Box>
          {initialUser && (
            <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
              <Button variant="outlined" size="small" onClick={handleContinueAs}>
                Continuar como {initialUser.name || initialUser.username}
              </Button>
              <Button variant="contained" size="small" color="error" onClick={handleLogoutFromSession}>
                Sair e trocar conta
              </Button>
            </Box>
          )}
        </Paper>

        {/* Diálogo de Recuperação de Senha */}
        <Dialog
          open={forgotPasswordOpen}
          onClose={() => {
            setForgotPasswordOpen(false);
            setResetEmail('');
            setError('');
            setResetSuccess('');
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LockReset />
              Recuperar Senha
            </Box>
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {resetSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {resetSuccess}
              </Alert>
            )}
            <Typography variant="body2" sx={{ mb: 2 }}>
              Informe seu email ou nome de usuário para recuperar sua senha:
            </Typography>
            <TextField
              fullWidth
              label="Email ou Usuário"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              autoFocus
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={() => {
                setForgotPasswordOpen(false);
                setResetEmail('');
                setError('');
                setResetSuccess('');
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleForgotPassword}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
                }
              }}
            >
              Recuperar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
