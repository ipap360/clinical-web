import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Registration from 'registration';
import App from 'app';

import store from './store';

import { ROOT, SIGNUP } from 'common/paths';

const Root = () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path={SIGNUP} component={Registration} />
                <Route path={ROOT} component={App} />
            </Switch>
        </Router>
    </Provider>
);

export default Root;
