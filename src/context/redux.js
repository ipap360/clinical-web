import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import defaultLogger from "redux-logger";
import thunk from "redux-thunk";
import reducerRegistry from "./reducerRegistry";

const state = {};

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

reducerRegistry.register("APP", (state = {}) => state);

const reducer = combine(state, reducerRegistry.getReducers());

const middlewares = [thunk];
if (process.env.NODE_ENV !== "production") {
    middlewares.push(defaultLogger);
}

const store = createStore(
    reducer,
    state,
    composeEnhancers(applyMiddleware(...middlewares))
);

reducerRegistry.setChangeListener(reducers => {
    store.replaceReducer(combine(state, reducers));
});

export default Component => props => (
    <Provider store={store}>
        <Component {...props} />
    </Provider>
);

export const registerReducer = (name, reducer) =>
    reducerRegistry.register(name, reducer);
