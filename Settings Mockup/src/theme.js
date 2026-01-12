import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#0078d4',
    },
    ...(mode === 'dark' ? {
      background: {
        default: '#1e1e1e',
        paper: '#252526',
      },
      text: {
        primary: '#cccccc',
        secondary: '#9d9d9d',
      },
      divider: '#3c3c3c',
    } : {
      background: {
        default: '#ffffff',
        paper: '#f3f3f3',
      },
      text: {
        primary: '#333333',
        secondary: '#616161',
      },
      divider: '#e5e5e5',
    }),
  },
  typography: {
    fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontSize: 13,
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
    },
    body2: {
      fontSize: '0.8125rem',
      color: mode === 'dark' ? '#9d9d9d' : '#616161',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: mode === 'dark' ? '#424242 #1e1e1e' : '#c1c1c1 #ffffff',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 10,
            height: 10,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 0,
            backgroundColor: mode === 'dark' ? '#424242' : '#c1c1c1',
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
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
            backgroundColor: mode === 'dark' ? '#3c3c3c' : '#ffffff',
            '& fieldset': {
              borderColor: mode === 'dark' ? '#3c3c3c' : '#cecece',
            },
            '&:hover fieldset': {
              borderColor: '#007acc',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#007acc',
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
          backgroundColor: mode === 'dark' ? '#3c3c3c' : '#ffffff',
        },
      },
    },
  },
});

export default getTheme;

