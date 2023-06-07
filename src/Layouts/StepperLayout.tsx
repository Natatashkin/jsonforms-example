import React, { useMemo, useState, FormEvent } from 'react';
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
  useJsonForms,
  JsonFormsStateContext,
} from '@jsonforms/react';
import {
  StatePropsOfLayout,
  categorizationHasCategory,
  deriveLabelForUISchemaElement,
  RankedTester,
  and,
  rankWith,
  uiTypeIs,
  optionIs,
  Categorization,
  isVisible,
} from '@jsonforms/core';
import { Box, Step, StepButton, Stepper, Button } from '@mui/material';

export interface StepperLayoutProps
  extends StatePropsOfLayout,
    AjvProps,
    TranslateProps {
  data: any;
}

const COUNT_CONTROL = {
  increment: 'increment',
  decrement: 'decrement',
};

const StepperLayout = (props: StepperLayoutProps) => {
  const {
    uischema,
    config,
    data,
    ajv,
    t,
    schema,
    path,
    visible,
    renderers,
    cells,
  } = props;
  const categorization = uischema as Categorization;
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const context: JsonFormsStateContext = useJsonForms();
  console.log('errors in Stepper >>>', context?.core?.errors);

  const categories = useMemo(
    () =>
      categorization.elements.filter((category) => {
        return isVisible(category, data, path, ajv);
      }),
    [categorization, data, ajv]
  );

  const isLastCategory = categories.length - 1 === activeCategory;

  const handleStep = (step: number, type?: string) => {
    if (isLastCategory && type !== 'decrement') {
      return;
    }

    switch (type) {
      case 'increment':
        setActiveCategory(step + 1);
        break;
      case 'decrement':
        setActiveCategory(step - 1);
        break;
      default:
        setActiveCategory(step);
        break;
    }
  };

  const appliedUiSchemaOptions = { ...config, ...uischema.options };

  const childProps: MaterialLayoutRendererProps = {
    elements: categories[activeCategory].elements,
    schema,
    path,
    direction: 'column',
    visible,
    renderers,
    cells,
  };

  const tabLabels = useMemo(() => {
    return categories.map((schema) => deriveLabelForUISchemaElement(schema, t));
  }, [categories, t]);

  // need finish from https://github.com/eclipsesource/jsonforms/blob/master/packages/material-renderers/src/layouts/MaterialCategorizationStepperLayout.tsx

  const buttonLabel = isLastCategory ? 'Submit' : 'Next';
  const buttonType = isLastCategory ? 'submit' : 'button';

  return (
    <Box>
      <Stepper activeStep={activeCategory} nonLinear>
        {categories.map((_, idx: number) => {
          return (
            <Step key={tabLabels[idx]}>
              <StepButton onClick={() => handleStep(idx)}>
                {tabLabels[idx]}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <MaterialLayoutRenderer {...childProps} />
      {appliedUiSchemaOptions.showNavButtons && (
        <>
          {!!activeCategory && (
            <Button
              variant='contained'
              color='secondary'
              onClick={() =>
                handleStep(activeCategory, COUNT_CONTROL.decrement)
              }
            >
              Prev
            </Button>
          )}
          <Button
            type={buttonType}
            variant='contained'
            color='primary'
            onClick={() => handleStep(activeCategory, COUNT_CONTROL.increment)}
          >
            {buttonLabel}
          </Button>
        </>
      )}
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
