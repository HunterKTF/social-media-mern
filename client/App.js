import * as React from 'react';

import { BrowserRouter as Router} from 'react-router-dom';
import MainRouter from './MainRouter';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </Router>
  );
}

export default App;
