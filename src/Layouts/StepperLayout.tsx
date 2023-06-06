import React, { useMemo, useState } from 'react';
import {
  MaterialLayoutRenderer,
  MaterialLayoutRendererProps,
  AjvProps,
  withAjvProps,
} from '@jsonforms/material-renderers';
import {
  withJsonFormsLayoutProps,
  TranslateProps,
  withTranslateProps,
} from '@jsonforms/react';
import {
  StatePropsOfLayout,
  categorizationHasCategory,
  RankedTester,
  and,
  rankWith,
  uiTypeIs,
  optionIs,
  Categorization,
  isVisible,
  Category,
} from '@jsonforms/core';
import { Box, Step, StepButton, Stepper } from '@mui/material';

export interface StepperLayoutProps
  extends StatePropsOfLayout,
    AjvProps,
    TranslateProps {
  data: any;
}

const StepperLayout = (props: StepperLayoutProps) => {
  console.log(props);
  const {
    uischema,
    config,
    data,
    ajv,
    schema,
    path,
    visible,
    renderers,
    cells,
  } = props;
  const categorization = uischema as Categorization;
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const handleStep = (step: number) => {
    setActiveCategory(step);
  };
  const appliedUiSchemaOptions = { ...config, ...uischema.options };

  // console.log(categorization);

  const categories = useMemo(
    () =>
      categorization.elements.filter(
        (category) => category.type === 'Category'
      ),
    [categorization, data]
  );

  console.log(categories);

  const childProps: MaterialLayoutRendererProps = {
    elements: categories[activeCategory].elements,
    schema,
    path,
    direction: 'column',
    visible,
    renderers,
    cells,
  };

  return (
    <Box>
      should be stepper layout
      {/* <Stepper activeStep={activeCategory} nonLinear>
        {categories.map((_: Category, idx: number) => (
          <Step key={tabLabels[idx]}>
            <StepButton onClick={() => handleStep(idx)}>
              {tabLabels[idx]}
            </StepButton>
          </Step>
        ))}
      </Stepper> */}
      <MaterialLayoutRenderer {...childProps} />
    </Box>
  );
};

export default withAjvProps(
  withTranslateProps(withJsonFormsLayoutProps(StepperLayout))
);

export const stepperLayoutTester: RankedTester = rankWith(
  3,
  and(
    uiTypeIs('Categorization'),
    categorizationHasCategory,
    optionIs('variant', 'stepper')
  )
);