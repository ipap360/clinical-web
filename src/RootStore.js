import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
// import { browserHistory  } from 'react-router';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import defaultLogger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';

import sagas from './sagas';
import { async } from 'actions';
import { appReducer } from 'app/AppStore';
import { portalReducer } from 'portal/Portal';

const state0 = {
    whoamiLoading: false,
    name: null,
    login: false
};

const START = (name) => name + "_REQUESTED";
const OK = (name) => name + "_SUCCEEDED";
const FAIL = (name) => name + "_FAILED";

const rootReducer = (state = state0, action) => {
    console.log(action.type);
    switch (action.type) {
        case START("ENTER"):
            return {
                ...state,
                whoamiLoading: true,
                name: null
            };
        case OK("ENTER"):
            return {
                ...state,
                whoamiLoading: false,
                ...action.payload
            };
        case FAIL("ENTER"):
            return {
                ...state,
                whoamiLoading: false,
                name: null
            };
        case OK("LOGIN"):
            return {
                ...state,
                whoamiLoading: false,
                ...action.payload.details
            };
        case OK("LOGOUT"):
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

const buttonsReducer = (state = {}, action) => {

    const start = async.map((e) => START(e.name)).indexOf(action.type);
    const ok = async.map((e) => OK(e.name)).indexOf(action.type);
    const failed = async.map((e) => FAIL(e.name)).indexOf(action.type);

    const name = action.type.split("_").pop();

    if (start) {
        return {
            ...state,
            [name]: true
        }
    } else if (ok || failed) {
        return {
            ...state,
            [name]: false
        }
    }

    return state;
}

const saga = createSagaMiddleware();

const middlewares = [saga, thunk];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(defaultLogger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        form: formReducer,
        buttons: buttonsReducer,
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