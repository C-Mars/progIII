import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material';
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#051f34',
      contrastText: '#bad6da',
    },
    secondary: {
      main: '#5699b1',
      contrastText: '#f6f9fb',
    },
    error: {
      main: '#ff6961',
    },
    warning: {
      main: '#f5a138',
    },
    success: {
      main: '#01c17a',
    },
    info: {
      main: '#bad6db',
    },
  },
  typography: {
    fontFamily: 'Fira Sans Condensed',
  },
  shape: {
    borderRadius: 4,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>

);
reportWebVitals();
