import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ContextProvider } from './context';
ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <CssBaseline />
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);