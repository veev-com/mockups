import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#3b82f6', // More vibrant blue
      light: '#60a5fa',
      dark: '#2563eb',
    },
    ...(mode === 'dark' ? {
      background: {
        default: '#0f172a', // Deeper blue-gray for "premium" dark mode
        paper: '#1e293b',
      },
      text: {
        primary: '#f8fafc',
        secondary: '#94a3b8',
      },
      divider: '#334155',
    } : {
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
      },
      text: {
        primary: '#0f172a',
        secondary: '#475569',
      },
      divider: '#e2e8f0',
    }),
  },
  typography: {
    fontFamily: '"Inter", "Outfit", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontSize: 14, // Slightly larger base size
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      letterSpacing: '0.025em',
    },
    body1: {
      fontSize: '0.9375rem',
    },
    body2: {
      fontSize: '0.875rem',
      color: mode === 'dark' ? '#94a3b8' : '#475569',
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '0.8125rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    }
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: mode === 'dark' ? '#334155 #0f172a' : '#cbd5e1 #f8fafc',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: mode === 'dark' ? '#334155' : '#cbd5e1',
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            backgroundColor: mode === 'dark' ? '#0f172a' : '#f8fafc',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: mode === 'dark' ? '#1e293b' : '#ffffff',
            transition: 'all 0.2s ease-in-out',
            '& fieldset': {
              borderColor: mode === 'dark' ? '#334155' : '#e2e8f0',
            },
            '&:hover fieldset': {
              borderColor: '#3b82f6',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3b82f6',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#1e293b' : '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 6,
        },
      },
    },
  },
});

export default getTheme;


