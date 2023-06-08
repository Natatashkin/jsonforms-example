import { Fragment, useState, useMemo, FormEvent } from 'react';
import {
  JsonForms,
  JsonFormsStateContext,
  useJsonForms,
} from '@jsonforms/react';
import { JsonFormsCore, Translator } from '@jsonforms/core';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from './logo.svg';
import ajv from './utils/ajv';
import schema from './mocks/schema.json';
import uischema from './mocks/uischema.json';
import renderers from './utils/renderers';
import createTranslator from './utils/createTranslator';

import { makeStyles } from '@mui/styles';
import './App.css';
import { ErrorObject } from 'ajv';

const useStyles = makeStyles({
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto !important',
    display: 'block !important',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
});

const initialData = {
  name: 'Send email to Adrian',
  description: 'Multilength field',
  done: true,
  recurrence: 'Daily',
  rating: 3,
  price: '45000',
};

const App = () => {
  const [data, setData] = useState<any>(initialData);
  const [formErrors, setFormErrors] = useState<ErrorObject[]>([]);
  const [locale, setLocale] = useState<'ua' | 'ru'>('ua');

  const classes = useStyles();
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const translation: Translator = useMemo(
    () => createTranslator(locale),
    [locale]
  );

  const clearData = () => {
    setData({});
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formErrors?.length) {
      console.log('you have errors!!');
      return;
    }
    console.log('submit data', data);
  };

  return (
    <Fragment>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to JSON Forms with React</h1>
          <p className='App-intro'>More Forms. Less Code.</p>
        </header>
      </div>

      <Grid
        container
        justifyContent={'center'}
        spacing={1}
        className={classes.container}
      >
        <Grid item sm={6}>
          <Typography variant={'h4'} className={classes.title}>
            Bound data
          </Typography>
          <div className={classes.dataContent}>
            <pre id='boundData'>{stringifiedData}</pre>
          </div>
          <Button
            className={classes.resetButton}
            onClick={clearData}
            color='primary'
            variant='contained'
          >
            Clear data
          </Button>
        </Grid>
        <Grid item sm={6}>
          <Typography variant={'h4'} className={classes.title}>
            Rendered form
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className={classes.demoform}>
              <JsonForms
                ajv={ajv}
                i18n={{
                  locale: locale,
                  translate: translation,
                }}
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={renderers}
                // cells={cells}
                onChange={({ errors, data }) => {
                  if (errors?.length) {
                    setFormErrors(errors);
                  } else {
                    setFormErrors([]);
                  }
                  setData(data);
                }}
              />
            </div>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
