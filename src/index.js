import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
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
        <App />
      </ProvideAuth>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
