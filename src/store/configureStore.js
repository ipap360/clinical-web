import { createStore, applyMiddleware, compose } from 'redux';
// import { browserHistory  } from 'react-router';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import defaultLogger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas';

import reducerRegistry from './reducerRegistry';
import initialState from './initialState';

const combine = (reducers) => {
    const reducerNames = Object.keys(reducers);
    Object.keys(initialState).forEach(item => {
        if (reducerNames.indexOf(item) === -1) {
            reducers[item] = (state = null) => state;
        }
    });
    return combineReducers(reducers);
};

const reducer = combine(reducerRegistry.getReducers());

const saga = createSagaMiddleware();

const middlewares = [saga, thunk];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(defaultLogger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        reducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...middlewares)
        )
    );
    
    reducerRegistry.setChangeListener(reducers => {
        store.replaceReducer(combine(reducers));
    });
    
    saga.run(sagas);
}
