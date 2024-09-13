import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#81D4FA', // Light blue color
    },
    secondary: {
      main: '#FFC107', // Amber
    },
    success: {
      main: '#4CAF50', // Green
    },
    error: {
      main: '#F44336', // Red
    },
    background: {
      default: '#F5F5F5', // Light gray background
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1.1rem',
    },
    body1: {
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 12, // Rounded corners
  },
  shadows: [
    'none', // elevation = 0
    '0px 1px 3px rgba(0, 0, 0, 0.12)', // elevation = 1
    '0px 1px 5px rgba(0, 0, 0, 0.2)', // elevation = 2
    '0px 1px 8px rgba(0, 0, 0, 0.24)', // elevation = 3
    '0px 2px 4px rgba(0, 0, 0, 0.3)', // elevation = 4 (custom)
    '0px 3px 6px rgba(0, 0, 0, 0.2)', // elevation = 5 (and so on...)
    '0px 3px 6px rgba(0, 0, 0, 0.23)',
    '0px 4px 8px rgba(0, 0, 0, 0.25)',
    '0px 5px 10px rgba(0, 0, 0, 0.27)',
    '0px 6px 12px rgba(0, 0, 0, 0.29)',
    '0px 7px 14px rgba(0, 0, 0, 0.31)',
    '0px 8px 16px rgba(0, 0, 0, 0.33)',
    '0px 9px 18px rgba(0, 0, 0, 0.35)',
    '0px 10px 20px rgba(0, 0, 0, 0.37)',
    '0px 11px 22px rgba(0, 0, 0, 0.39)',
    '0px 12px 24px rgba(0, 0, 0, 0.41)',
    '0px 13px 26px rgba(0, 0, 0, 0.43)',
    '0px 14px 28px rgba(0, 0, 0, 0.45)',
    '0px 15px 30px rgba(0, 0, 0, 0.47)',
    '0px 16px 32px rgba(0, 0, 0, 0.49)',
    '0px 17px 34px rgba(0, 0, 0, 0.51)',
    '0px 18px 36px rgba(0, 0, 0, 0.53)',
    '0px 19px 38px rgba(0, 0, 0, 0.55)',
    '0px 20px 40px rgba(0, 0, 0, 0.57)',
    '0px 21px 42px rgba(0, 0, 0, 0.59)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Rounded corners for buttons
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Rounded corners for cards
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Rounded corners for text fields
        },
      },
    },
  },
});

export default theme;
