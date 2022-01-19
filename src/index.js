import React from 'react';
import { render } from 'react-dom';
import {SnackbarProvider} from 'notistack';
import App from './containers/App';
import 'bootstrap/dist/css/bootstrap.css';

render(
  <SnackbarProvider maxSnack={2} 
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
    TransitionComponent: "Slide",
  }}
  >
    <App />
  </SnackbarProvider>,
  document.getElementById('root')
);

