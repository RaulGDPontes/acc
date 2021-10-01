import './App.css';

import {
  Container,
  Grid,
} from '@material-ui/core';

import Grafics from './components/Grafics';
import TableComp from './components/TableComp';

function App() {
  return (
    <div className='mainDiv'>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      <Container className='mainContainer'>
        <Grid container spacing={8}>
          <Grid key='table' container item xs={12}>
            <TableComp />
          </Grid>
          <Grid key='grafics' container item xs={12}>
            <Grafics />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
