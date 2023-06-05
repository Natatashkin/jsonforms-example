import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { JsonSchema } from '@jsonforms/core';
import { NumericInput } from '../components/NumericInput/NumericInput';

interface NumericInputWithLengthControlProps {
  data: any;
  handleChange: (path: string, value: any) => void;
  path: string;
  label: string;
  errors: string | string[];
  length?: number | undefined;
  schema: JsonSchema;
}

const NumericInputControl = (props: NumericInputWithLengthControlProps) => {
  const { data, handleChange, label, path, errors, schema } = props;
  console.log('NumericInputWithLengthControlProp', schema);

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
    />
  );
};

export default withJsonFormsControlProps(NumericInputControl);
