import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import 'typeface-roboto';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

import withI18n from './i18n';
import withStore from './store';
import View from './view';

const Root = withI18n(withStore(View));

render(
    <Root />,
    document.getElementById('root')
);

registerServiceWorker();
