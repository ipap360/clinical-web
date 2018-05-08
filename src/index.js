import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import RootStore from './RootStore'; // , { history }
import Root from './Root';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

import Cookies from 'js-cookie';
import locale2 from 'locale2';

// console.log(RootStore);

// initialize default language (read from client's system)
if (!Cookies.get('lang')) {
    Cookies.set('lang', locale2);
}

render(
    <Root store={RootStore} />, // history={history}
    document.getElementById('root')
);

registerServiceWorker();
