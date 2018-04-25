import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './Root';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

render(
  <Root />,
  document.getElementById('root')
);

registerServiceWorker();
