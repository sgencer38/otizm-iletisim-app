import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#64B5F6',
      light: '#90CAF9',
      dark: '#42A5F5',
    },
    secondary: {
      main: '#81C784',
      light: '#A5D6A7',
      dark: '#66BB6A',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#424242',
      secondary: '#616161',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90CAF9',
      light: '#BBDEFB',
      dark: '#64B5F6',
    },
    secondary: {
      main: '#A5D6A7',
      light: '#C8E6C9',
      dark: '#81C784',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E0E0E0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        },
      },
    },
  },
});
