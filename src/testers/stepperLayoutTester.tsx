import React from 'react';
import {
  rankWith,
  RankedTester,
  and,
  uiTypeIs,
  categorizationHasCategory,
  optionIs,
} from '@jsonforms/core';

export const stepperLayoutTester: RankedTester = rankWith(
  3,
  and(
    uiTypeIs('Categorization'),
    categorizationHasCategory,
    optionIs('variant', 'stepper')
  )
);
