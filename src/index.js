import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

// import 'typeface-roboto';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

import App from './app';

render(
    <App />,
    document.getElementById('root')
);

registerServiceWorker();
