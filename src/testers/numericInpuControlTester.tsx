import React from 'react';
import {
  rankWith,
  uiTypeIs,
  schemaMatches,
  schemaTypeIs,
  and,
} from '@jsonforms/core';

//source: https://medium.com/@anand.ratna/how-to-create-custom-cell-render-in-json-forms-reactjs-1101dda165bf
// example for cells and renderers

export default rankWith(
  100,
  and(
    uiTypeIs('Control'),
    schemaTypeIs('string'),
    schemaMatches((schema) => {
      if (schema.hasOwnProperty('customRender')) {
        let cellschema: any = schema;
        return cellschema['customRender'] === 'numeric';
      }
      return false;
    })
  )
);
