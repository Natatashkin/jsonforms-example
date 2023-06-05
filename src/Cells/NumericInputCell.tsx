import React from 'react';
import { CellProps, WithClassname } from '@jsonforms/core';
import { withJsonFormsCellProps } from '@jsonforms/react';
import { NumericInput } from '../components/NumericInput/NumericInput';

//source: https://medium.com/@anand.ratna/how-to-create-custom-cell-render-in-json-forms-reactjs-1101dda165bf

const NumericInputCell = (props: CellProps & WithClassname) => {
  const { data, handleChange, path, errors } = props;
  console.log('NumericInputCell', props);

  const onChange = (path: string, newValue: string) => {
    if (!newValue) {
      handleChange(path, undefined);
      return;
    }
    handleChange(path, newValue);
  };

  return (
    <NumericInput
      value={data}
      updateValue={(value: string) => onChange(path, value)}
      error={Boolean(errors)}
      helperText={errors}
    />
  );
};

export default withJsonFormsCellProps(NumericInputCell);
