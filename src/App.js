import { useState, useEffect, useMemo, useRef, lazy, Suspense } from 'react';
import { ThemeProvider, CssBaseline, Container, Typography, Box, Chip, Button, Stack, Menu, MenuItem, IconButton, Tooltip, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, CircularProgress, Snackbar, Alert, Badge } from '@mui/material';
import {
  Dashboard as DashboardIcon, 
  Upload as UploadIcon,
  Compare as CompareIcon,
  LocalPharmacy as LocalPharmacyIcon,
  LocalFlorist as FloristIcon,
  Psychology as PsychologyIcon,
  Article as ArticleIcon,
  MoreVert as MoreVertIcon,
  Event as EventIcon,
  Settings as SettingsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  MedicalServices as MedicalIcon,
  Bloodtype as BloodtypeIcon,
  Assessment as AssessmentIcon,
  TableChart as TableChartIcon,
  Medication as MedicationIcon,
  Warning as WarningIcon,
  FolderSpecial as FolderIcon,
  Science as ScienceIcon,
  Storage as StorageIcon,
  Visibility as VisibilityIcon,
  Waves as WavesIcon,
  Person as PersonIcon,
  Spa as SpaIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MenuBook as BookIcon,
  WifiOff as WifiOffIcon,
  Wifi as WifiIcon,
  Sync as SyncIcon,
  CloudDone as CloudDoneIcon,
} from '@mui/icons-material';
import { initSyncQueue, getPendingCount } from './lib/syncQueue';
import { useAiModel } from './context/AiModelContext';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

const DRAWER_WIDTH = 280;
const DRAWER_COLLAPSED_WIDTH = 64;

// Lazy loading: cada página é carregada somente quando visitada pela primeira vez
const AnamneseForm = lazy(() => import('./pages/AnamneseForm'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AnamneseView = lazy(() => import('./pages/AnamneseView'));
const DataImport = lazy(() => import('./pages/DataImport'));
const CompareAnamneses = lazy(() => import('./pages/CompareAnamneses'));
const TherapySuggestions = lazy(() => import('./pages/TherapySuggestions'));
const TherapeuticDataManager = lazy(() => import('./pages/TherapeuticDataManager'));
const TherapeuticPrescription = lazy(() => import('./pages/TherapeuticPrescription'));
const PatientFullReport = lazy(() => import('./pages/PatientFullReport'));
const Appointments = lazy(() => import('./pages/Appointments'));
const AdvancedTherapies = lazy(() => import('./pages/AdvancedTherapies'));
const BloodTestForm = lazy(() => import('./pages/BloodTestForm'));
const BloodTestsList = lazy(() => import('./pages/BloodTestsList'));
const PatientExams = lazy(() => import('./pages/PatientExams'));
const IntegrativeSpreadsheet = lazy(() => import('./pages/IntegrativeSpreadsheet'));
const DrugInteractionsNew = lazy(() => import('./pages/DrugInteractionsNew'));
const EmergencyAssistant = lazy(() => import('./pages/EmergencyAssistant'));
const LaboratoryExams = lazy(() => import('./pages/LaboratoryExams'));
const ProbioticsRecommendation = lazy(() => import('./pages/ProbioticsRecommendation'));
const VitaminDeficiencyAnalyzer = lazy(() => import('./pages/VitaminDeficiencyAnalyzer'));
const VitaminDeficiencyBySymptoms = lazy(() => import('./pages/VitaminDeficiencyBySymptoms'));
const NutrientInteractions = lazy(() => import('./pages/NutrientInteractions'));
const IridologyAnalysisPage = lazy(() => import('./pages/IridologyAnalysisPage'));
const BioresonanceAnalysisPage = lazy(() => import('./pages/BioresonanceAnalysisPage'));
const SubclinicalIntegrativePage = lazy(() => import('./pages/SubclinicalIntegrativePage'));
const ExamesLaboratoriais = lazy(() => import('./components/ExamesLaboratoriais'));
const RelatorioExames = lazy(() => import('./components/RelatorioExames'));
const AnaliseIntegrativa = lazy(() => import('./components/AnaliseIntegrativa'));
const PhytotherapyProtocols = lazy(() => import('./pages/PhytotherapyProtocolsV2'));
const TestPhyto = lazy(() => import('./pages/TestPhyto'));
const TherapeuticDataPanel = lazy(() => import('./components/TherapeuticDataPanel'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const ExamRequestForm = lazy(() => import('./pages/ExamRequestForm'));
const AnamnesisDialog = lazy(() => import('./pages/AnamnesisDialog')); // mantido temporariamente para redirect
const DetoxPage = lazy(() => import('./pages/DetoxPage'));
const PublicAnamnesisForm = lazy(() => import('./pages/PublicAnamnesisForm'));
const NutritionalPlan = lazy(() => import('./pages/NutritionalPlan'));
const BackupPage = lazy(() => import('./pages/BackupPage'));
const ReceitasAvulsas = lazy(() => import('./pages/ReceitasAvulsas'));
const AnamneseIntegrativaCompleta = lazy(() => import('./pages/AnamneseIntegrativaCompleta'));
const AnamneseLucianaCaxito = lazy(() => import('./pages/AnamneseLucianaCaxito'));
const AppointmentConfirmPage = lazy(() => import('./pages/AppointmentConfirmPage'));
const BibliotecaPage = lazy(() => import('./pages/BibliotecaPage'));

// Importações que ficam eager (usadas fora das rotas / no nível raiz)
import ErrorBoundary from './components/ErrorBoundary';
import LoginPage from './pages/LoginPage';
import SettingsDialog from './components/SettingsDialog';
import { initializeAuth, getCurrentSession, logout } from './lib/auth';
import { migrateIridologyThumbnailsFromLocalStorage } from './lib/indexedDBHelper';
import { getTheme } from './theme';
import { PatientContextProvider, usePatient } from './context/PatientContext';

// CONFIGURAÇÃO: Habilitar/Desabilitar autenticação
const AUTH_ENABLED = true; // Mude para false para desativar autenticação
// Permite forçar a tela de login mesmo quando já há sessão em localStorage
const FORCE_LOGIN_ON_START = process.env.REACT_APP_FORCE_LOGIN_ON_START === 'true';

function App() {
  const { model } = useAiModel();
  const navigate = useNavigate();
  const location = useLocation();
  const mainContentRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  // Read the session synchronously to avoid the login flicker on initial render
  const [currentUser, setCurrentUser] = useState(() => AUTH_ENABLED ? getCurrentSession() : null);
  // Quando true, a tela de login deve ficar visível até o usuário efetuar o login
  const [forceLoginRequired, setForceLoginRequired] = useState(() => FORCE_LOGIN_ON_START);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [themeMode, setThemeMode] = useState(() => {
    const saved = localStorage.getItem('theme-mode');
    return saved || 'light';
  });

  const theme = useMemo(() => getTheme(themeMode), [themeMode]);

  // Paciente atual em consulta — gerenciado pelo PatientContext
  const { currentPatient, setCurrentPatient } = usePatient();

  // ── Online / Offline detection ──────────────────────────────────────────────
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const isLocal = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const [pendingSync, setPendingSync] = useState(() => getPendingCount());
  const [syncSnack, setSyncSnack] = useState(null); // { synced, failed }

  useEffect(() => {
    const up   = () => setIsOnline(true);
    const down = () => setIsOnline(false);
    window.addEventListener('online',  up);
    window.addEventListener('offline', down);
    return () => { window.removeEventListener('online', up); window.removeEventListener('offline', down); };
  }, []);

  // Inicializa fila de sync offline→Supabase
  useEffect(() => {
    const cleanup = initSyncQueue();
    const onQueueChange = () => setPendingSync(getPendingCount());
    const onFlushed = (e) => {
      setPendingSync(getPendingCount());
      setSyncSnack(e.detail);
    };
    window.addEventListener('syncQueue:changed', onQueueChange);
    window.addEventListener('syncQueue:flushed', onFlushed);
    return () => {
      cleanup && cleanup();
      window.removeEventListener('syncQueue:changed', onQueueChange);
      window.removeEventListener('syncQueue:flushed', onFlushed);
    };
  }, []);
  // ─────────────────────────────────────────────────────────────────────────────

  const [drawerOpen, setDrawerOpen] = useState(() => {
    const saved = localStorage.getItem('drawer-open');
    return saved === null ? true : saved === 'true';
  });
  const toggleDrawer = () => {
    const next = !drawerOpen;
    setDrawerOpen(next);
    localStorage.setItem('drawer-open', String(next));
  };

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };
  
  useEffect(() => {
    if (AUTH_ENABLED) {
      initializeAuth();
      const user = getCurrentSession();
      setCurrentUser(user);
      // Se não houver sessão, forceLoginRequired permanece true
      // Se houver sessão e não quisermos forçar login, aceitamos a sessão automaticamente
      if (user && !FORCE_LOGIN_ON_START) setForceLoginRequired(false);
    }
    // Migrate large binary thumbnail keys from localStorage to IndexedDB to prevent space issues
    (async () => {
      try { await migrateIridologyThumbnailsFromLocalStorage(); } catch (e) { /* ignore */ }
    })();
  }, []);
  
  const handleLogin = (user) => {
    setCurrentUser(user);
    setForceLoginRequired(false);
  };
  
  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    navigate('/');
  };
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
  };

  // Rotas que aceitam /:id para carregar o interagente em consulta automaticamente
  const ROUTES_WITH_ID = [
    '/iridology', '/bioresonance', '/anamnese-subclinico',
    '/exames-laboratoriais', '/resultados-exames-urina',
    '/plano-nutricional', '/prescription',
    '/drug-interactions', '/integrative-spreadsheet',
    '/blood-test-form', '/patient-exams', '/laboratory-exams',
    '/compare', '/clinical-report',
  ];

  const handleDrawerNavigate = (path) => {
    const pid = localStorage.getItem('currentPatientId');
    const targetPath = (pid && ROUTES_WITH_ID.includes(path))
      ? `${path}/${pid}`
      : path;
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
  };

  // Resetar scroll ao mudar de rota
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [location.pathname]);
  
  // Se autenticação está habilitada e usuário não está logado (ou forçamos login), mostrar login
  // /book e /dialogo-publico são rotas públicas — não exigir login
  const isPublicBookingPage = location.pathname === '/book' || location.pathname.startsWith('/book?');
  const isPublicFormPage = location.pathname === '/dialogo-publico' || location.pathname.startsWith('/dialogo-publico?');
  const isPublicConfirmPage = location.pathname === '/appointment/confirm' || location.pathname.startsWith('/appointment/confirm?');
  const shouldShowLogin = AUTH_ENABLED && (!currentUser || forceLoginRequired) && !isPublicBookingPage && !isPublicFormPage && !isPublicConfirmPage;
  if (shouldShowLogin) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoginPage onLoginSuccess={handleLogin} initialUser={currentUser} onForceContinue={() => setForceLoginRequired(false)} />
      </ThemeProvider>
    );
  }
  
  let therapistImg = null;
  try { therapistImg = require('./assets/therapist-symbol.jpg'); } catch (e) { /* optional */ }
  const therapistFullTitle = 'Wander Pires Silva Coelho, Terapeuta Integrativo Funcional, Naturopatia e Iridologia - CRTH-BR 17821';
  
  const menuItems = [
    { text: '📚 Pesquisa Bibliográfica', icon: <BookIcon />, path: '/pesquisa-bibliografica', gradient: 'linear-gradient(135deg, #1a237e 0%, #4a148c 100%)' },
    { text: '🩺 Anamnese Integrativa Completa', icon: <AssessmentIcon />, path: '/anamnese-integrativa-completa', gradient: 'linear-gradient(135deg, #e65100 0%, #b71c1c 100%)' },
    { text: 'Interagentes', icon: <PersonIcon />, path: '/dashboard', gradient: 'linear-gradient(135deg, #e066f0 0%, #eb3d5c 100%)' },
    { text: '🥦 Plano Nutricional', icon: <SpaIcon />, path: '/plano-nutricional', gradient: 'linear-gradient(135deg, #43a047 0%, #1b5e20 100%)' },
{ text: '🚨 Emergência', icon: <WarningIcon />, path: '/emergency', gradient: 'linear-gradient(135deg, #f5507a 0%, #f0a030 100%)' },
    { text: 'Agendamentos', icon: <EventIcon />, path: '/appointments', gradient: 'linear-gradient(135deg, #70d8d0 0%, #f0a0c0 100%)' },
    { text: '🌿 Indicação Fitoterápica', icon: <LocalPharmacyIcon />, path: '/indicacao-fitoterapicos', gradient: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)' },
    { text: '🧹 Detoxificação', icon: <SpaIcon />, path: '/detoxificacao', gradient: 'linear-gradient(135deg, #006064 0%, #00897b 100%)' },
    { text: '👁️ Análise de Iridologia', icon: <VisibilityIcon />, path: '/iridology', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { text: '🌊 Resultados de Biorressonância', icon: <WavesIcon />, path: '/bioresonance', gradient: 'linear-gradient(135deg, #00b4db 0%, #0083b0 100%)' },
    { text: '🧬 Anamnese Subclínico', icon: <WavesIcon />, path: '/anamnese-subclinico', gradient: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)' },
    { text: 'Exames Laboratoriais', icon: <ScienceIcon />, path: '/exames-laboratoriais', gradient: 'linear-gradient(135deg, #50d0f0 0%, #4080e8 100%)' },
    { text: 'Resultados de Exames de Urina', icon: <BloodtypeIcon />, path: '/resultados-exames-urina', gradient: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)' },
    { text: '� Solicitação de Exames', icon: <AssessmentIcon />, path: '/exam-request', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { text: '�💊 Deficiências Vitamínicas', icon: <LocalPharmacyIcon />, path: '/vitamin-deficiency', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
    { text: '💊 Deficiência de Vitaminas por Sintomas', icon: <LocalPharmacyIcon />, path: '/vitamin-deficiency-symptoms', gradient: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)' },
    { text: '🧬 Interações entre Nutrientes', icon: <ScienceIcon />, path: '/nutrient-interactions', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { text: 'Comparar', icon: <CompareIcon />, path: '/compare', gradient: 'linear-gradient(135deg, #8070c0 0%, #e080d8 100%)' },
    { text: 'Resultados de Exames', icon: <PsychologyIcon />, path: '/therapy-suggestions', gradient: 'linear-gradient(135deg, #28d070 0%, #20c8b8 100%)' },
    { text: 'Homeopatia - Aromaterapia - Óleos essenciais', icon: <LocalPharmacyIcon />, path: '/advanced-therapies', gradient: 'linear-gradient(135deg, #20b0c8 0%, #4a1870 100%)' },
    { text: '🦠 Probióticos', icon: <ScienceIcon />, path: '/probiotics', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { text: 'Interações', icon: <MedicationIcon />, path: '/drug-interactions', gradient: 'linear-gradient(135deg, #f0b860 0%, #90d8e0 100%)' },
    { text: '📋 Receitas Avulsas', icon: <ArticleIcon />, path: '/receitas-avulsas', gradient: 'linear-gradient(135deg, #ff8f00 0%, #e65100 100%)' },
  ];

  const hideShell = location.pathname === '/book' || location.pathname.startsWith('/book?')
    || location.pathname === '/dialogo-publico' || location.pathname.startsWith('/dialogo-publico?')
    || location.pathname === '/appointment/confirm' || location.pathname.startsWith('/appointment/confirm?');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Hide Drawer/Sidebar for public booking page */}
        {!hideShell && (
        <Drawer
          variant="permanent"
          className="no-print"
          sx={{
            width: drawerOpen ? DRAWER_WIDTH : DRAWER_COLLAPSED_WIDTH,
            flexShrink: 0,
            transition: 'width 0.3s ease',
            '& .MuiDrawer-paper': {
              width: drawerOpen ? DRAWER_WIDTH : DRAWER_COLLAPSED_WIDTH,
              boxSizing: 'border-box',
              background: 'linear-gradient(180deg, #1a237e 0%, #0d47a1 100%)',
              borderRight: 'none',
              boxShadow: '4px 0 20px rgba(0,0,0,0.3)',
              overflowX: 'hidden',
              transition: 'width 0.3s ease',
            },
          }}
        >
          {/* Cabeçalho */}
          <Box sx={{ 
            p: drawerOpen ? 2 : 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderBottom: '2px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: drawerOpen ? 'space-between' : 'center',
            minHeight: 72,
          }}>
            {drawerOpen && (
              <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ color: 'white', textAlign: 'center', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', whiteSpace: 'nowrap' }}>
                  Anamnese Integrativa
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', display: 'block', textAlign: 'center', mt: 0.5 }}>
                  Menu Principal
                </Typography>
              </Box>
            )}
            <Tooltip title={drawerOpen ? 'Recolher menu' : 'Expandir menu'} placement="right">
              <IconButton onClick={toggleDrawer} size="small" sx={{ color: 'white', flexShrink: 0 }}>
                {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </Tooltip>
          </Box>
          
          {/* Controles do Topo */}
          <Box sx={{ p: 1.5, display: 'flex', gap: 1, justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', flexWrap: 'nowrap', overflow: 'hidden' }}>
            {drawerOpen && <Chip label={`${model}`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }} />}
            {drawerOpen && (
              <Tooltip title={isLocal ? 'Rodando localmente — todos os recursos disponíveis' : isOnline ? 'Conectado à internet' : 'Sem internet — dados locais'} placement="right">
                <Chip
                  icon={isLocal ? <HomeIcon sx={{ fontSize: '14px !important', color: '#a5d6a7 !important' }} /> : isOnline ? <WifiIcon sx={{ fontSize: '14px !important', color: '#90caf9 !important' }} /> : <WifiOffIcon sx={{ fontSize: '14px !important', color: '#ef9a9a !important' }} />}
                  label={isLocal ? 'Local' : isOnline ? 'Online' : 'Offline'}
                  size="small"
                  sx={{
                    bgcolor: isLocal ? 'rgba(76,175,80,0.25)' : isOnline ? 'rgba(33,150,243,0.25)' : 'rgba(244,67,54,0.25)',
                    color: isLocal ? '#a5d6a7' : isOnline ? '#90caf9' : '#ef9a9a',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    border: `1px solid ${isLocal ? 'rgba(76,175,80,0.5)' : isOnline ? 'rgba(33,150,243,0.5)' : 'rgba(244,67,54,0.5)'}`,
                  }}
                />
              </Tooltip>
            )}
            <Tooltip title={themeMode === 'light' ? 'Modo Escuro' : 'Modo Claro'}>
              <IconButton onClick={toggleTheme} size="small" sx={{ color: 'white' }}>
                {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
          
          {/* Menu Items com efeito 3D */}
          <List sx={{ pt: 2, px: drawerOpen ? 1 : 0.5, overflow: 'auto' }}>
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path + '/'));
              return (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <Tooltip title={!drawerOpen ? item.text : ''} placement="right">
                    <ListItemButton
                      onClick={() => handleDrawerNavigate(item.path)}
                      selected={isActive}
                      sx={{
                        borderRadius: 1.5,
                        background: item.gradient,
                        color: 'white',
                        textDecoration: 'none',
                        boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
                        transform: 'translateY(0)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        justifyContent: drawerOpen ? 'flex-start' : 'center',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                        },
                        '&.Mui-selected': {
                          background: item.gradient,
                          boxShadow: '0 6px 20px rgba(0,0,0,0.5), inset 4px 0 0 rgba(255,255,255,0.95)',
                          transform: 'translateY(-2px)',
                          filter: 'brightness(1.25)',
                          pl: drawerOpen ? 1.1 : undefined,
                          '&:hover': {
                            background: item.gradient,
                            transform: 'translateY(-2px)',
                          },
                        },
                        py: 1,
                        px: drawerOpen ? 1.5 : 1,
                        minWidth: 0,
                      }}
                    >
                      <ListItemIcon sx={{ 
                        color: 'white', 
                        minWidth: drawerOpen ? 35 : 'auto',
                        justifyContent: 'center',
                        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))',
                      }}>
                        {item.icon}
                      </ListItemIcon>
                      {drawerOpen && (
                        <ListItemText 
                          primary={item.text}
                          secondary={item.subtitle || undefined}
                          primaryTypographyProps={{
                            fontSize: '0.8rem',
                            fontWeight: isActive ? 700 : 600,
                            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                          }}
                          secondaryTypographyProps={{
                            fontSize: '0.68rem',
                            color: 'rgba(255,255,255,0.65)',
                          }}
                        />
                      )}
                      {isActive && drawerOpen && (
                        <Box sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: 'white',
                          boxShadow: '0 0 8px 3px rgba(255,255,255,0.8)',
                          flexShrink: 0,
                          ml: 0.5,
                        }} />
                      )}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        )}

        {/* Conteúdo Principal */}
        <Box
          ref={mainContentRef}
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            overflow: 'auto',
          }}
        >
          {/* Cabeçalho do Conteúdo — oculto na página pública de agendamento */}
          {!hideShell && <Box sx={{ 
            p: 2, 
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            boxShadow: 1,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {therapistImg && <img src={therapistImg} alt="Símbolo terapeuta" style={{ height: 50, cursor: 'pointer' }} onClick={() => navigate('/')} />}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {menuItems.find(item => location.pathname === item.path || location.pathname.startsWith(item.path + '/'))?.text || 'Anamnese Integrativa'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {therapistFullTitle}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {/* Online / Offline indicator */}
                <Tooltip title={isLocal ? 'Servidor local — Pesquisa Bibliográfica e todos os recursos disponíveis' : isOnline ? 'Conectado à internet — sincronizando com Supabase' : `Sem conexão — ${pendingSync > 0 ? `${pendingSync} operação(ões) pendente(s) para sincronizar quando voltar online` : 'operando com dados locais'}`} placement="bottom">
                  <Badge badgeContent={pendingSync > 0 && !isOnline ? pendingSync : 0} color="warning" max={99}>
                  <Chip
                    icon={isLocal ? <HomeIcon sx={{ fontSize: '14px !important' }} /> : isOnline ? <WifiIcon sx={{ fontSize: '14px !important' }} /> : <WifiOffIcon sx={{ fontSize: '14px !important' }} />}
                    label={isLocal ? '🏠 Local' : isOnline ? '🌐 Online' : '📴 Offline'}
                    size="small"
                    sx={{
                      bgcolor: isLocal ? '#e8f5e9' : isOnline ? '#e3f2fd' : '#ffebee',
                      color: isLocal ? '#1b5e20' : isOnline ? '#0d47a1' : '#b71c1c',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      border: `1px solid ${isLocal ? '#c8e6c9' : isOnline ? '#bbdefb' : '#ffcdd2'}`,
                      cursor: 'default',
                    }}
                  />
                  </Badge>
                </Tooltip>
                {AUTH_ENABLED && currentUser && (
                  <>
                    <Chip label={currentUser.name} size="small" color="secondary" />
                    <IconButton size="small" onClick={() => setSettingsOpen(true)}>
                      <SettingsIcon />
                    </IconButton>
                    <Button size="small" variant="outlined" onClick={handleLogout}>
                      Sair
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Box>}

          {/* Barra de contexto: interagente em consulta */}
          {currentPatient && (
            <Box sx={{
              px: 2, py: 0.75,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              borderBottom: '2px solid',
              borderColor: 'primary.dark',
            }}>
              <PersonIcon fontSize="small" />
              <Typography variant="body2" fontWeight={600} sx={{ flexGrow: 1 }}>
                Interagente em consulta:&nbsp;
                <strong>{currentPatient.q01_nome}</strong>
                {currentPatient.q03_idade ? ` · ${currentPatient.q03_idade} anos` : ''}
                {currentPatient.q04_sexo ? ` · ${currentPatient.q04_sexo}` : ''}
                {currentPatient.q14_tipo_consulta ? ` · ${currentPatient.q14_tipo_consulta}` : ''}
              </Typography>
              <Button
                size="small"
                variant="outlined"
                sx={{ color: 'inherit', borderColor: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', py: 0.2 }}
                onClick={() => { setCurrentPatient(null); }}
              >
                Encerrar consulta
              </Button>
            </Box>
          )}

          {/* Área de Conteúdo */}
          <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto', width: '100%' }}>
            <ErrorBoundary resetKey={location.pathname}>
            <Suspense fallback={
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress />
              </Box>
            }>
            <Routes>
                <Route path="/book" element={<BookingPage />} />
              <Route path="/appointment/confirm" element={<AppointmentConfirmPage />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/nova-anamnese" element={<Navigate to="/anamnese-integrativa-completa" replace />} />
              <Route path="/edit/:id" element={<AnamneseForm />} />
              <Route path="/interagente/edit/:id" element={<AnamneseForm personalOnly={true} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/backup" element={<BackupPage />} />
              <Route path="/dialogo-anamnetico" element={<Navigate to="/anamnese-integrativa-completa" replace />} />
              <Route path="/dialogo-anamnetico/:id" element={<Navigate to="/anamnese-integrativa-completa" replace />} />
              <Route path="/plano-nutricional" element={<NutritionalPlan />} />
              <Route path="/plano-nutricional/:id" element={<NutritionalPlan />} />
              <Route path="/anamnese/:id" element={<AnamneseView />} />
              <Route path="/therapeutic-data" element={<TherapeuticDataPanel />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/data-import" element={<DataImport />} />
              <Route path="/iridology" element={<IridologyAnalysisPage />} />
              <Route path="/iridology/:id" element={<IridologyAnalysisPage />} />
              <Route path="/bioresonance" element={<BioresonanceAnalysisPage />} />
              <Route path="/bioresonance/:id" element={<BioresonanceAnalysisPage />} />
              <Route path="/anamnese-subclinico" element={<SubclinicalIntegrativePage />} />
              <Route path="/anamnese-subclinico/:id" element={<SubclinicalIntegrativePage />} />
              <Route path="/patient-exams" element={<PatientExams />} />
              <Route path="/patient-exams/:id" element={<PatientExams />} />
              <Route path="/exames-laboratoriais" element={<LaboratoryExams mode="general" />} />
              <Route path="/exames-laboratoriais/:id" element={<LaboratoryExams mode="general" />} />
              <Route path="/resultados-exames-urina" element={<LaboratoryExams mode="urine" />} />
              <Route path="/resultados-exames-urina/:id" element={<LaboratoryExams mode="urine" />} />
              <Route path="/analise-integrativa" element={<AnaliseIntegrativa />} />
              <Route path="/exam-request" element={<ExamRequestForm />} />
              <Route path="/relatorio-exames" element={<RelatorioExames />} />
              <Route path="/indicacao-fitoterapicos" element={<ErrorBoundary><PhytotherapyProtocols /></ErrorBoundary>} />
              <Route path="/test-phyto" element={<TestPhyto />} />
              <Route path="/laboratory-exams/:id" element={<LaboratoryExams mode="general" />} />
              <Route path="/vitamin-deficiency" element={<VitaminDeficiencyAnalyzer />} />
              <Route path="/vitamin-deficiency-symptoms" element={<VitaminDeficiencyBySymptoms />} />
              <Route path="/nutrient-interactions" element={<NutrientInteractions />} />
              <Route path="/blood-tests-list" element={<BloodTestsList />} />
              <Route path="/blood-test-form" element={<BloodTestForm />} />
              <Route path="/blood-test-form/:id" element={<BloodTestForm />} />
              <Route path="/compare" element={<CompareAnamneses />} />
              <Route path="/compare/:id" element={<CompareAnamneses />} />
              <Route path="/integrative-spreadsheet" element={<IntegrativeSpreadsheet />} />
              <Route path="/integrative-spreadsheet/:id" element={<IntegrativeSpreadsheet />} />
              <Route path="/drug-interactions" element={<DrugInteractionsNew />} />
              <Route path="/drug-interactions/:id" element={<DrugInteractionsNew />} />
              <Route path="/emergency" element={<EmergencyAssistant />} />
              <Route path="/therapy-suggestions" element={<TherapySuggestions />} />
              <Route path="/clinical-report" element={<TherapySuggestions defaultSection="report" />} />
              <Route path="/clinical-report/:id" element={<TherapySuggestions defaultSection="report" />} />
              <Route path="/advanced-therapies" element={<AdvancedTherapies />} />
              <Route path="/prescription" element={<TherapeuticPrescription />} />
              <Route path="/prescription/:id" element={<TherapeuticPrescription />} />
              <Route path="/probiotics" element={<ErrorBoundary><ProbioticsRecommendation /></ErrorBoundary>} />
              <Route path="/detoxificacao" element={<ErrorBoundary><DetoxPage /></ErrorBoundary>} />
              <Route path="/patient-report/:id" element={<PatientFullReport />} />
              <Route path="/dialogo-publico" element={<PublicAnamnesisForm />} />
              <Route path="/receitas-avulsas" element={<ReceitasAvulsas />} />
              <Route path="/anamnese-integrativa-completa" element={<AnamneseIntegrativaCompleta />} />
              <Route path="/anamnese-luciana-caxito" element={<Navigate to="/anamnese-integrativa-completa" replace />} />
              <Route path="/pesquisa-bibliografica" element={<BibliotecaPage />} />
            </Routes>
            </Suspense>
            </ErrorBoundary>
          </Box>
        </Box>

        {/* Settings Dialog */}
        {AUTH_ENABLED && (
          <SettingsDialog
            open={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            currentUser={currentUser}
          />
        )}

        {/* Sync notification — aparece quando dados offline são enviados ao Supabase */}
        <Snackbar
          open={!!syncSnack}
          autoHideDuration={5000}
          onClose={() => setSyncSnack(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSyncSnack(null)}
            severity={syncSnack?.failed > 0 ? 'warning' : 'success'}
            icon={<CloudDoneIcon />}
            sx={{ alignItems: 'center' }}
          >
            {syncSnack?.failed > 0
              ? `Sincronizado: ${syncSnack.synced} registro(s). ${syncSnack.failed} falha(s) — serão reenviados.`
              : `✅ ${syncSnack?.synced} registro(s) offline sincronizados com a nuvem!`}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

// Wrapper para injetar o PatientContext antes do App
export default function AppWithProviders() {
  return (
    <PatientContextProvider>
      <App />
    </PatientContextProvider>
  );
}

