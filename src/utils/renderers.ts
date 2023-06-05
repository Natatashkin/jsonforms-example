import React from 'react';
import { materialRenderers } from '@jsonforms/material-renderers';
import ratingControlTester from '../ratingControlTester';
import numericInpuControlTester from '../testers/numericInpuControlTester';
import RatingControl from '../RatingControl';
import NumericInputControl from '../Controls/NumericInputControl';

const renderers = [
  ...materialRenderers,
  { tester: ratingControlTester, renderer: RatingControl },
  {
    tester: numericInpuControlTester,
    renderer: NumericInputControl,
  },
];

export default renderers;
