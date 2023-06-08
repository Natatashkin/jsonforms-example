import React from 'react';
import i18n from '../i18n.json';

const translations: Record<string, Record<string, string>> = i18n;

const createTranslator =
  (locale: string) => (key: string, defaultMessage?: string) => {
    // console.log(key, translations[locale][key]);
    return translations[locale][key] ?? defaultMessage;
  };

export default createTranslator;
