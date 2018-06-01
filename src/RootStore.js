import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
// import { browserHistory  } from 'react-router';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import defaultLogger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';

import sagas from './sagas';
import { appReducer } from 'app/AppStore';
import { portalReducer } from 'portal/Portal';

const state0 = {
    whoamiLoading: false,
    name: null,
    login: false
};

const rootReducer = (state = state0, action) => {
    switch (action.type) {
        case "CLIENT_IDENTIFICATION_REQUESTED":
            return {
                ...state,
                whoamiLoading: true,
                name: null
            };
        case "CLIENT_IDENTIFIED":
            return {
                ...state,
                whoamiLoading: false,
                ...action.payload
            };
        case "CLIENT_IDENTIFICATION_FAILED":
            return {
                ...state,
                whoamiLoading: false,
                name: null
            };
        case "OPEN_LOGIN":
            return {
                ...state,
                login: true
            };
        case "CLOSE_LOGIN":
            return {
                ...state,
                login: false
            };        
        default:
            return state;
    }
};

const saga = createSagaMiddleware();

const middlewares = [saga, thunk];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(defaultLogger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        form: formReducer,
        root: rootReducer,
        portal: portalReducer,
        app: appReducer,
        // routing: routerReducer
    }),
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
);

saga.run(sagas);

store.dispatch({
    type: "STORE_INITIALIZED"
});

export default store;

// export const history = syncHistoryWithStore(browserHistory, store);