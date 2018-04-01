import { createStore, applyMiddleware } from 'redux';
import defaultLogger from 'redux-logger';
import thunk from 'redux-thunk';

// generic reducer, transfers reducer responsibility to every action
// state passed is already a copy of the initial state (immutable)
const App = (state = {}, action) => {
  if (typeof action.reducer === 'function') {
    return action.reducer.apply(this, [Object.assign({}, {
      ...state,
    }), action]);
  }
  return state;
};

const configureStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(defaultLogger);
  }

  return createStore(
    App,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
