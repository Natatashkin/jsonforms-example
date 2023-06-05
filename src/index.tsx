import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom';
import App from './App';
import customTheme from './theme';

/**
 * Customize form so each control has more space
 */

ReactDOM.render(
  <ThemeProvider theme={customTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
