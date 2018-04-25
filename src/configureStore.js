import { createStore, applyMiddleware } from 'redux';
import defaultLogger from 'redux-logger';
import thunk from 'redux-thunk';

const configureStore = (rootReducer) => {

    // generic reducer, transfers reducer responsibility to every action
    // state passed is already a copy of the initial state (immutable)
    // const genericReducer = (state = {}, action) => {
    //     if (typeof action.reducer === 'function') {
    //         return action.reducer.apply(this, [Object.assign({}, {
    //             ...state,
    //         }), action]);
    //     }
    //     return state;
    // };

    const middlewares = [thunk];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(defaultLogger);
    }

    return createStore(
        rootReducer,
        applyMiddleware(...middlewares)
    );
};

export default configureStore;
