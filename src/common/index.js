import React from 'react';
import { Provider } from 'react-redux';

import reducerRegistry from './reducerRegistry';
import configureStore from './configureStore';
import history from './history';
import withDateUtils from './dates';
import applyTranslations from './i18n';
import applyTheme from './theme';
import connect from './connect';

export * from 'redux-saga/effects';
export * from './utils';
export * from './helpers';

export default (name, state, theme, translations) => {

    const { store, runSaga } = configureStore(state);
    store.dispatch({ type: name });

    const withTheme = applyTheme(theme);
    const withI18n = applyTranslations(name, translations);

    return {
        reducerRegistry,
        connect2store: connect(name),
        runSaga,
        history,
        withForce: (Component) => (props) => withDateUtils(withTheme(withI18n((
            <Provider store={store}>
                <Component {...props} />
            </Provider>
        ))))
    }
}

// export const history = syncHistoryWithStore(browserHistory, store);