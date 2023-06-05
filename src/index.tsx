import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom';
import App from './App';

/**
 * Customize form so each control has more space
 */
const customTheme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: '0.8em 0',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            padding: theme.spacing(0.5, 1),
            outline: '1px solid grey',
            borderRadius: 4,
            transformOrigin: 'top left',
            transition: `outline 250ms cubic-bezier(0.0, 0, 0.2, 1) 0ms`,
            '&:hover': {
              outline: '2px solid black',
            },
            '&.Mui-focused': {
              outline: `2px solid ${theme.palette.primary.main}`,
            },
            '&.Mui-error': {
              outline: `2px solid ${theme.palette.error.main}`,
            },
          };
        },
      },
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={customTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
