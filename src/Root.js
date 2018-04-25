import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import configureStore from './configureStore';

import Portal, { portalReducer } from './classes/Portal';
import Login from './classes/Login';
import Register from './classes/Register';
import App, { appReducer } from './classes/App';

import Cookies from 'js-cookie';
import locale2 from 'locale2';
import axios from 'axios';

// initialize default language (read from client's system)
if (!Cookies.get('lang')) {
    Cookies.set('lang', locale2);
}

// initialize axios defaults (TODO: must read from configuration in production)
axios.defaults.baseURL = 'http://localhost:8081/api/v1';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const whoami = () => (dispatch, getState) => {
    // console.log(getState());
    // if (getIsFetching(, filter)) {
    //   return Promise.resolve();
    // }

    dispatch({
        type: 'WHOAMI_REQUEST'
    });
    axios.get("/whoami").then(response => {
        dispatch({
            type: 'LANGUAGE_SET',
            payload: response.data.lang,
        });
        dispatch({
            type: 'WHOAMI_OK',
            payload: response.data,
        });
    }).catch((error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
        dispatch({
            type: 'WHOAMI_FAIL'
        });
    });
};

const rootReducer = (state = {
    whoamiLoading: false,
    name: null
}, action) => {
    switch (action.type) {
        case "LANGUAGE_SET":
            Cookies.set('lang', action.payload);
            return state;
        case "WHOAMI_REQUEST":
            return {
                whoamiLoading: true,
                name: null
            };
        case "WHOAMI_OK":
            Cookies.get('lang')
            return {
                whoamiLoading: false,
                ...action.payload
            };
        case "WHOAMI_FAIL":
            return {
                whoamiLoading: false,
                name: null
            };
        default:
            return state;
    }
};

const Root = () => {

    const store = configureStore(
        combineReducers({
            root: rootReducer,
            portal: portalReducer,
            app: appReducer
        }));

    store.dispatch({
        type: 'LANGUAGE_INIT',
        payload: Cookies.get('lang')
    });
    store.dispatch(whoami());


    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Route path="/" exact component={Portal} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/app" component={App} />
                </div>
            </Router>
        </Provider>
    );
}

export default Root;
