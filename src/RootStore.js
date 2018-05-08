import { combineReducers, createStore, applyMiddleware } from 'redux';
// import { browserHistory  } from 'react-router';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import defaultLogger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';
import sagas from './sagas';
import { appReducer } from 'app/AppStore';
import { portalReducer } from 'portal/Portal';

const rootInitialState = {
    whoamiLoading: false,
    name: null
};

const rootReducer = (state = rootInitialState, action) => {
    switch (action.type) {
        case "CLIENT_IDENTIFICATION_REQUESTED":
            return {
                whoamiLoading: true,
                name: null
            };
        case "CLIENT_IDENTIFIED":
            return {
                whoamiLoading: false,
                ...action.payload
            };
        case "CLIENT_IDENTIFICATION_FAILED":
            return {
                whoamiLoading: false,
                name: null
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

const store = createStore(
    combineReducers({
        form: formReducer,
        root: rootReducer,
        portal: portalReducer,
        app: appReducer,
        // routing: routerReducer
    }),
    applyMiddleware(...middlewares)
);

saga.run(sagas);

store.dispatch({
    type: "STORE_INITIALIZED"
});

export default store;

// export const history = syncHistoryWithStore(browserHistory, store);