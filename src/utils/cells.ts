import React from 'react';
import { materialCells } from '@jsonforms/material-renderers';
import numericInputControlTester from '../testers/numericInpuControlTester';
import NumericInputCell from '../Cells/NumericInputCell';

//Use for custom cells

const cells = [
  ...materialCells,
  { tester: numericInputControlTester, cell: NumericInputCell },
];

export default cells;
