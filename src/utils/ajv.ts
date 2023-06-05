import React from 'react';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

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
