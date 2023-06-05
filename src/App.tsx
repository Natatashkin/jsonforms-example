import { Fragment, useState, useMemo, FormEvent } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from './logo.svg';
import './App.css';
import { createAjvInstance } from './utils/ajv';
import schema from './mocks/schema.json';
import uischema from './mocks/uischema.json';
import renderers from './utils/renderers';
import { makeStyles } from '@mui/styles';

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
  price: '',
};

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState<any>(initialData);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);
  const ajv = createAjvInstance({
    formats: { date: true, year: true, price: true },
  });

  const clearData = () => {
    setData({});
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
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
          <form onSubmit={handleSubmit}>
            <Typography variant={'h4'} className={classes.title}>
              Rendered form
            </Typography>
            <div className={classes.demoform}>
              <JsonForms
                ajv={ajv}
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={renderers}
                // cells={cells}
                onChange={({ errors, data }) => {
                  setData(data);
                  console.log('hasErrors >>>', errors);
                }}
              />
              <Button
                className={classes.resetButton}
                color='primary'
                variant='contained'
                type='submit'
              >
                Submit data
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
