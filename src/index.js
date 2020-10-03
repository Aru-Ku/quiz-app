import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from './styles/GlobalStyles';
import { ProvideAuth } from './utils/auth';
import './utils/firebase';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProvideAuth>
        <GlobalStyle />
        <ToastContainer />
        <App />
      </ProvideAuth>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
