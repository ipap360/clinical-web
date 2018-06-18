import { createStore, applyMiddleware, compose } from 'redux';

// import { browserHistory  } from 'react-router';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import defaultLogger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import sagas from 'common/sagas';
import action, { STORE_INIT } from 'common/actions';

import reducer from './reducer';

const saga = createSagaMiddleware();

const middlewares = [saga, thunk];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(defaultLogger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
);

saga.run(sagas);

store.dispatch(action(STORE_INIT));

export default store;

// export const history = syncHistoryWithStore(browserHistory, store);