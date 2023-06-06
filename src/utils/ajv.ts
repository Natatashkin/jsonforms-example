import React from 'react';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

// need refactoring https://kukshalkanishka.medium.com/customising-json-forms-7fc75f627fff

export const createAjvInstance = (options: any) => {
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    strict: false,
    ...options,
  });

  ajv.addFormat('year', /^(19|20)\d{2}$/);
  ajv.addFormat('price', /^[0-9]*\.?[0-9]{2}$/);
  addFormats(ajv);
  addErrors(ajv);
  return ajv;
};
