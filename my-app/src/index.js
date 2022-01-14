import React from 'react';
import { render } from 'react-dom';
import {SnackbarProvider} from 'notistack';
import Zoom from '@material-ui/core/Zoom';
import App from './containers/App';
import 'bootstrap/dist/css/bootstrap.css';

render(
  <SnackbarProvider maxSnack={3} 
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
    TransitionComponent: {Zoom},
  }}
>
    <App />
  </SnackbarProvider>,
  document.getElementById('root')
);

