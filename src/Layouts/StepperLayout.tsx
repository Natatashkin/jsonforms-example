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
  Category,
  JsonFormsCore,
} from '@jsonforms/core';
import { Box, Step, StepButton, Stepper, Button } from '@mui/material';
import { ErrorObject } from 'ajv';

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
    t,
    schema,
    path,
    visible,
    renderers,
    cells,
  } = props;
  const categorization = uischema as Categorization;
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [errors, setErrors] = useState<any[]>([]);
  const { onSubmit } = config;

  const handleStep = (step: number) => {
    setActiveCategory(step);
  };
  const appliedUiSchemaOptions = { ...config, ...uischema.options };
  const { core }: JsonFormsStateContext = useJsonForms();

  const categories = useMemo(
    () =>
      categorization.elements.filter((category) =>
        isVisible(category, data, path, ajv)
      ),
    [categorization, data, ajv]
  );

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
    return categories.map((e) => deriveLabelForUISchemaElement(e, t));
  }, [categories, t]);

  // need finish from https://github.com/eclipsesource/jsonforms/blob/master/packages/material-renderers/src/layouts/MaterialCategorizationStepperLayout.tsx

  const isLastCategory = categorization.elements.length - 1 === activeCategory;
  console.log(core?.errors);

  const handleNextClick = () => {
    if (core?.errors?.length) {
      setErrors([core?.errors]);
      return;
    }
    if (isLastCategory) {
      return;
    }
    handleStep(activeCategory + 1);
  };

  const handleBackClick = () => {
    setErrors([]);
    handleStep(activeCategory - 1);
  };

  return (
    <Box>
      <Stepper activeStep={activeCategory} nonLinear>
        {categories.map((_, idx: number) => (
          <Step key={tabLabels[idx]}>
            <StepButton onClick={() => handleStep(idx)}>
              {tabLabels[idx]}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <MaterialLayoutRenderer {...childProps} />
      {appliedUiSchemaOptions.showNavButtons && (
        <>
          {activeCategory > 0 && (
            <Button
              variant='contained'
              color='secondary'
              onClick={handleBackClick}
            >
              Prev
            </Button>
          )}
          <Button
            type={isLastCategory ? 'submit' : 'button'}
            variant='contained'
            color='primary'
            onClick={handleNextClick}
          >
            {isLastCategory ? 'Submit' : 'Next'}
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
