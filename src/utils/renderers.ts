import React from 'react';
import { materialRenderers } from '@jsonforms/material-renderers';
import ratingControlTester from '../ratingControlTester';
import numericInpuControlTester from '../testers/numericInpuControlTester';
import RatingControl from '../RatingControl';
import NumericInputControl from '../Controls/NumericInputControl';
import StepperLayout from '../Layouts/StepperLayout';
import { stepperLayoutTester } from '../Layouts/StepperLayout';

const renderers = [
  ...materialRenderers,
  { tester: ratingControlTester, renderer: RatingControl },
  {
    tester: numericInpuControlTester,
    renderer: NumericInputControl,
  },
  { tester: stepperLayoutTester, renderer: StepperLayout },
];

export default renderers;
