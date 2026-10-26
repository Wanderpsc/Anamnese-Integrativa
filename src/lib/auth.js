/**
 * Sistema de Autenticação
 * Proprietário (admin) e Usuário (viewer)
 */

import supabase from './supabase';

// Configuração padrão - ALTERE ESTAS SENHAS!
const DEFAULT_CREDENTIALS = {
  owner: {
    username: 'wander',
    password: 'admin@2025', // ALTERAR ESTA SENHA
    role: 'owner',
    name: 'Wander Pires Silva Coelho'
  },
  user: {
    username: 'usuario',
    password: 'user@2025', // ALTERAR ESTA SENHA
    role: 'user',
    name: 'Usuário'
  }
};

// Simples hash para senha (em produção usar bcrypt)
function simpleHash(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

// Inicializar credenciais se não existirem
export function initializeAuth() {
  const stored = localStorage.getItem('app_credentials');
  if (!stored) {
    const credentials = {
      owner: {
        ...DEFAULT_CREDENTIALS.owner,
        password: simpleHash(DEFAULT_CREDENTIALS.owner.password)
      },
      user: {
        ...DEFAULT_CREDENTIALS.user,
        password: simpleHash(DEFAULT_CREDENTIALS.user.password)
      }
    };
    localStorage.setItem('app_credentials', JSON.stringify(credentials));
  }
}

// Login
export async function login(username, password) {
  // if Supabase is configured, try authenticating via Supabase Auth first (only when input looks like email)
  if (supabase && username.includes('@')) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: username, password });
      if (!error && data?.user) {
        const user = data.user;
        const role = user.user_metadata?.role || (user.email === process.env.REACT_APP_OWNER_EMAIL ? 'owner' : 'user');
        const session = {
          username: user.email,
          role,
          name: user.user_metadata?.name || user.email,
          id: user.id,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('app_session', JSON.stringify(session));
        return { success: true, session };
      }
    } catch (e) {
      // fall through to local credentials
    }
  }
  const credentials = JSON.parse(localStorage.getItem('app_credentials') || '{}');
  const hashedPassword = simpleHash(password);
  
  // Verificar proprietário
  if (credentials.owner && 
      username === credentials.owner.username && 
      hashedPassword === credentials.owner.password) {
    const session = {
      username: credentials.owner.username,
      role: 'owner',
      name: credentials.owner.name,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('app_session', JSON.stringify(session));
    return { success: true, session };
  }
  
  // Verificar usuário
  if (credentials.user && 
      username === credentials.user.username && 
      hashedPassword === credentials.user.password) {
    const session = {
      username: credentials.user.username,
      role: 'user',
      name: credentials.user.name,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('app_session', JSON.stringify(session));
    return { success: true, session };
  }
  
  return { success: false, error: 'Usuário ou senha inválidos' };
}

// Logout
export async function logout() {
  if (supabase) {
    try { await supabase.auth.signOut(); } catch (e) { /* ignore */ }
  }
  localStorage.removeItem('app_session');
}

// Verificar se está logado
export function isAuthenticated() {
  const session = localStorage.getItem('app_session');
  return !!session;
}

// Obter sessão atual
export function getCurrentSession() {
  const session = localStorage.getItem('app_session');
  if (!session) return null;
  return JSON.parse(session);
}

// Verificar se é proprietário
export function isOwner() {
  const session = getCurrentSession();
  return session?.role === 'owner';
}

// Verificar se é usuário
export function isUser() {
  const session = getCurrentSession();
  return session?.role === 'user';
}

// Alterar senha (apenas proprietário pode alterar ambas)
export function changePassword(role, newPassword, currentUserRole) {
  if (currentUserRole !== 'owner') {
    return { success: false, error: 'Apenas o proprietário pode alterar senhas' };
  }
  
  const credentials = JSON.parse(localStorage.getItem('app_credentials') || '{}');
  
  if (role === 'owner' || role === 'user') {
    credentials[role].password = simpleHash(newPassword);
    localStorage.setItem('app_credentials', JSON.stringify(credentials));
    return { success: true };
  }
  
  return { success: false, error: 'Tipo de usuário inválido' };
}

// Permissões por funcionalidade
export const PERMISSIONS = {
  CREATE_ANAMNESE: ['owner', 'user'],
  EDIT_ANAMNESE: ['owner', 'user'],
  DELETE_ANAMNESE: ['owner'],
  VIEW_ANAMNESE: ['owner', 'user'],
  MANAGE_APPOINTMENTS: ['owner', 'user'],
  DELETE_APPOINTMENTS: ['owner'],
  CHANGE_SETTINGS: ['owner'],
  EXPORT_DATA: ['owner'],
  IMPORT_DATA: ['owner']
};

// Verificar permissão
export function hasPermission(action) {
  const session = getCurrentSession();
  if (!session) return false;
  
  const allowedRoles = PERMISSIONS[action];
  if (!allowedRoles) return false;
  
  return allowedRoles.includes(session.role);
}
