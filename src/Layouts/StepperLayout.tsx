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
  deriveLabelForUISchemaElement,
  Categorization,
  isVisible,
} from '@jsonforms/core';
import { compareErrors, getScopedName } from '../utils/helpers';
import {
  Box,
  Step,
  StepButton,
  Stepper,
  Button,
  StepLabel,
} from '@mui/material';

// help from https://github.com/eclipsesource/jsonforms/blob/master/packages/material-renderers/src/layouts/MaterialCategorizationStepperLayout.tsx

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

  const categories = useMemo(
    () =>
      categorization.elements.filter((category) => {
        return isVisible(category, data, path, ajv);
      }),
    [categorization, data, ajv]
  );

  const isActiveLastCategory = categories.length - 1 === activeCategory;

  const handleStep = (step: number, type?: string) => {
    if (isActiveLastCategory && type && type !== 'decrement') {
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

  const buttonLabel = isActiveLastCategory ? 'Submit' : 'Next';
  const buttonType = isActiveLastCategory ? 'submit' : 'button';

  return (
    <Box>
      <Stepper activeStep={activeCategory} nonLinear>
        {categories.map((category, idx: number) => {
          const categoryElementsNames = getScopedName(category.elements).flat(
            Infinity
          );
          const currentErrors = compareErrors(
            categoryElementsNames,
            context?.core?.errors
          );
          const hasErrors = Boolean(currentErrors?.length);

          return (
            <Step key={tabLabels[idx]}>
              <StepButton onClick={() => handleStep(idx)}>
                <StepLabel error={hasErrors}>{tabLabels[idx]}</StepLabel>
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
