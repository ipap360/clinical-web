import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// import { browserHistory  } from 'react-router';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import defaultLogger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import reducerRegistry from './reducerRegistry';

const combine = (state0, reducers) => {
    const reducerNames = Object.keys(reducers);
    Object.keys(state0).forEach(item => {
        if (reducerNames.indexOf(item) === -1) {
            reducers[item] = (state = null) => state;
        }
    });
    return combineReducers(reducers);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (state0) => {

    const reducer = combine(state0, reducerRegistry.getReducers());

    const saga = createSagaMiddleware();

    const middlewares = [saga, thunk];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(defaultLogger);
    }

    const store = createStore(
        reducer,
        state0,
        composeEnhancers(
            applyMiddleware(...middlewares)
        )
    );

    reducerRegistry.setChangeListener(reducers => {
        store.replaceReducer(combine(state0, reducers));
    });

    // saga.run(sagas);

    return {
        store,
        runSaga: saga.run
    };
}
