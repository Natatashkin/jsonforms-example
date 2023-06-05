import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import Input, { InputProps } from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';

interface INumericInputProps extends InputProps {
  updateValue: (value: string) => void;
  label?: string;
  helperText: string | string[];
  length?: number;
  deximal?: boolean;
}

export const NumericInput = ({
  value,
  id,
  updateValue,
  label,
  error,
  helperText,
  length = 0,
  deximal = false,
}: INumericInputProps) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: innerValue } = e.target;

    if (/^\d*\.?\d*$/.test(innerValue)) {
      if (/^00/.test(innerValue)) {
        const updatedValue = innerValue.replace('00', '0.');
        updateValue(updatedValue);
        setInputValue(updatedValue);
        return;
      }
      if (/\.\d{3}$/.test(innerValue)) {
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
    <Box>
      {label && <InputLabel error={error}>{label}</InputLabel>}
      <Input value={inputValue} id={id} onChange={handleChange} error={error} />
      {error && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </Box>
  );
};

interface NumericControlProps {
  data: any;
  handleChange: (path: string, value: any) => void;
  path: string;
  label: string;
  errors: string | string[];
  length?: number | undefined;
}

const NumericControl = (props: NumericControlProps) => {
  const { data, handleChange, label, path, errors, length } = props;
  console.log('PriceControl', props);
  console.log('length', length);

  const onChange = (path: string, newValue: string) => {
    if (!newValue) {
      handleChange(path, undefined);
      return;
    }
    handleChange(path, newValue);
  };

  return (
    <NumericInput
      label={label}
      value={data}
      updateValue={(value: string) => onChange(path, value)}
      error={Boolean(errors)}
      helperText={errors}
      length={length}
    />
  );
};

export default withJsonFormsControlProps(NumericControl);
