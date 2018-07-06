import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Registration from './pages/registration';
import App from './pages';
import Login from './pages/login';
import { App } from './pages/login';

import { ROOT, SIGNUP, SIGNUP_EMAIL, SIGNUP_CONFIRM, LOGIN } from './paths';

import withTheme from './theme';
import withDateUtils from './dates';

const Root = () => (
    <Router>
        <Switch>
            <Route path={LOGIN} component={Login} />
            <Route path={SIGNUP_CONFIRM} component={Re} />
            <Route path={SIGNUP_EMAIL} component={RegistrationEmail} />
            <Route path={SIGNUP} component={Registration} />
            <Route path={ROOT} component={App} />
        </Switch>
    </Router>
);

export default withDateUtils(withTheme(Root));