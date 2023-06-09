import React from 'react';
import { createTheme } from '@mui/material';

const customTheme = createTheme({
  components: {
    MuiInputLabel: {
      defaultProps: {
        shrink: false,
        variant: 'standard',
      },
      styleOverrides: {
        root: ({ theme }) => {
          return {
            top: -6,
            transform: 'none',
          };
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            padding: theme.spacing(0.5, 1),
            margin: theme.spacing(2, 0, 2.5, 0),
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
            '& .MuiButtonBase-root': {
              position: 'absolute',
              right: 0,
            },
          };
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 12,
          borderRadius: '50%',
          '& svg': {
            borderRadius: '50%',
            backgroundColor: 'white',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            position: 'absolute',
            bottom: 0,
            marginLeft: 0,
          };
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          padding: '4px 40px 4px 8px',
        },
      },
    },
  },
});

export default customTheme;
