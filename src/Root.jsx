import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Portal from 'portal/Portal';
import App from 'app/App';

// , history
const Root = ({store}) => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/app" component={App} />
                <Route path="/" component={Portal} />
            </Switch>
        </Router>
    </Provider>
);

export default Root;
