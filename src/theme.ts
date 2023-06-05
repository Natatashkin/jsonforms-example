import React from 'react';
import { createTheme } from '@mui/material';

const customTheme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {},
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: false,
        variant: 'standard',
      },
      styleOverrides: {
        root: ({ theme }) => {
          return {
            top: -24,
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
          };
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
  },
});

export default customTheme;
