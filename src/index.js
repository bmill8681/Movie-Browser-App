import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { initializeIcons } from '@uifabric/icons';
import { loadTheme } from 'office-ui-fabric-react/lib/Styling';
import { theme } from './theme';

loadTheme(theme);

initializeIcons();

ReactDOM.render(
  <HashRouter basename="/">
    <App />
  </HashRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
