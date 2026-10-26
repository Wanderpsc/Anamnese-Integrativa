import { createTheme } from '@mui/material/styles';

/**
 * Cria tema dinâmico baseado no modo (light/dark)
 */
export function getTheme(mode) {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Modo Claro
            primary: {
              main: '#1976d2',
              light: '#42a5f5',
              dark: '#1565c0',
              contrastText: '#fff',
            },
            secondary: {
              main: '#9c27b0',
              light: '#ba68c8',
              dark: '#7b1fa2',
              contrastText: '#fff',
            },
            success: {
              main: '#2e7d32',
              light: '#4caf50',
              dark: '#1b5e20',
            },
            warning: {
              main: '#ed6c02',
              light: '#ff9800',
              dark: '#e65100',
            },
            error: {
              main: '#d32f2f',
              light: '#ef5350',
              dark: '#c62828',
            },
            info: {
              main: '#0288d1',
              light: '#03a9f4',
              dark: '#01579b',
            },
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
            text: {
              primary: 'rgba(0, 0, 0, 0.87)',
              secondary: 'rgba(0, 0, 0, 0.6)',
              disabled: 'rgba(0, 0, 0, 0.38)',
            },
            divider: 'rgba(0, 0, 0, 0.12)',
          }
        : {
            // Modo Escuro
            primary: {
              main: '#90caf9',
              light: '#e3f2fd',
              dark: '#42a5f5',
              contrastText: 'rgba(0, 0, 0, 0.87)',
            },
            secondary: {
              main: '#ce93d8',
              light: '#f3e5f5',
              dark: '#ab47bc',
              contrastText: 'rgba(0, 0, 0, 0.87)',
            },
            success: {
              main: '#66bb6a',
              light: '#81c784',
              dark: '#388e3c',
            },
            warning: {
              main: '#ffa726',
              light: '#ffb74d',
              dark: '#f57c00',
            },
            error: {
              main: '#f44336',
              light: '#e57373',
              dark: '#d32f2f',
            },
            info: {
              main: '#29b6f6',
              light: '#4fc3f7',
              dark: '#0288d1',
            },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: '#fff',
              secondary: 'rgba(255, 255, 255, 0.7)',
              disabled: 'rgba(255, 255, 255, 0.5)',
            },
            divider: 'rgba(255, 255, 255, 0.12)',
          }),
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.6,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
          elevation1: {
            boxShadow: mode === 'dark' 
              ? '0px 2px 4px rgba(0,0,0,0.5)'
              : '0px 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'dark'
              ? '0px 2px 8px rgba(0,0,0,0.5)'
              : '0px 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
          },
        },
      },
    },
  });
}

// Tema padrão (light)
const theme = getTheme('light');

export default theme;