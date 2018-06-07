import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Portal from 'portal/Portal';
import App from 'app/App';

const Root = ({store}) => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/app" component={App} />
                <Route path="/" component={Portal} />
                {/* <Route path="/" render={() => {
                    const state = store.getState();
                    return (state.root.name === null) ? <Portal /> : <App />;
                }} /> */}
            </Switch>
        </Router>
    </Provider>
);

export default Root;
