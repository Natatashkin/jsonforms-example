import React, { ChangeEvent, useState } from 'react';
import Input, { InputProps } from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import CloseIcon from '@mui/icons-material/Close';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
} from '@mui/material';

interface INumericInputProps extends InputProps {
  updateValue: (value: string) => void;
  label?: string;
  helperText: string | string[];
  stringlength?: number;
  deximal?: boolean;
  required?: boolean;
}

export const NumericInput = ({
  value,
  id,
  updateValue,
  label,
  error,
  helperText,
  stringlength = 0,
  deximal = false,
  required = false,
}: INumericInputProps) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: innerValue } = e.target;
    const testPattern = deximal ? /^\d*\.?\d*$/ : /^\d*$/;
    const notValidLength = innerValue.length > stringlength;

    if (testPattern.test(innerValue)) {
      if (stringlength && notValidLength) {
        return;
      }
      if (deximal && /^00/.test(innerValue)) {
        const updatedValue = innerValue.replace('00', '0.');
        updateValue(updatedValue);
        setInputValue(updatedValue);
        return;
      }
      if (deximal && /\.\d{3}$/.test(innerValue)) {
        const toDeximalValue = parseFloat(innerValue).toFixed(2).toString();
        updateValue(toDeximalValue);
        setInputValue(toDeximalValue);
        return;
      }
      updateValue(innerValue);
      setInputValue(innerValue);
    }
  };

  return (
    <FormControl id={id} fullWidth>
      {label && (
        <InputLabel error={error} required={required}>
          {label}
        </InputLabel>
      )}
      <>
        <InputBase
          value={inputValue}
          onChange={handleChange}
          error={error}
          endAdornment={
            <IconButton children={<CloseIcon fontSize='medium' />} />
          }
        />
      </>
      {error && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};
