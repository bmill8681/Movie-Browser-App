import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { initializeIcons } from '@uifabric/icons';
import { loadTheme } from 'office-ui-fabric-react/lib/Styling';
import { theme } from './theme';

loadTheme(theme);

initializeIcons();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
