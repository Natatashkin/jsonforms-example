import { Categorization, ControlElement, JsonFormsCore } from '@jsonforms/core';
import { Control, JsonFormsStateContext } from '@jsonforms/react';
import { ErrorObject } from 'ajv';

export const compareErrors = (fieldNames: string[], errorsFromContext: any) => {
  return fieldNames.filter((error: any) => {
    return errorsFromContext.find(
      (item: any) => item.params?.missingProperty === error
    );
  });
};

export const getScopedName = (array: any) => {
  return array.map((item: Categorization | ControlElement) => {
    if (item.type === 'Control') {
      const arr = item.scope.split('/');
      return arr[arr.length - 1];
    }

    if (item.elements) {
      return getScopedName(item.elements);
    }

    return [];
  });
};
