import React, { memo } from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { JsonSchema } from '@jsonforms/core';
import { NumericInput } from '../components/NumericInput/NumericInput';
import { useDebouncedCallback } from 'use-debounce';
// import { useJsonForms } from '@jsonforms/react';

interface NumericInputControlProps {
  data: any;
  handleChange: (path: string, value: any) => void;
  path: string;
  label: string;
  errors: string | string[];
  length?: number | undefined;
  schema: JsonSchema;
  required?: boolean | undefined;
  id: string;
}

const NumericInputControl = (props: NumericInputControlProps) => {
  const { data, handleChange, label, path, errors, schema, required, id } =
    props;
  const { stringlength, deximal } = schema as {
    stringlength: number;
    deximal: boolean;
  };
  console.log(data);

  // just testing how to get Form context
  // const context = useJsonForms();
  // console.log(context);

  const onChange = (path: string, newValue: string) => {
    if (!newValue) {
      // clear less property from formData
      handleChange(path, undefined);
      return;
    }
    handleChange(path, newValue);
  };
  const debouncedChange = useDebouncedCallback(onChange, 250);

  return (
    <NumericInput
      label={label}
      value={data}
      updateValue={(value: string) => debouncedChange(path, value)}
      error={Boolean(errors)}
      helperText={errors}
      stringlength={stringlength}
      deximal={deximal}
      required={required}
      id={id}
    />
  );
};

export default withJsonFormsControlProps(NumericInputControl);
