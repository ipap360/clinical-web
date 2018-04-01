import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './layout/Root';
import configureStore from './configureStore';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('root')
);

registerServiceWorker();
