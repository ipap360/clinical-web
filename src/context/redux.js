import React from "react";
import { Provider } from "react-redux";
import configureStore, { registerReducer } from "redux-dynamic-config";
import config from "../app.config";
// export { compose } from "redux";

const { appName } = config;

registerReducer(appName, (state = {}) => state);
const store = configureStore(appName, {});

export default Component => props => (
    <Provider store={store}>
        <Component {...props} />
    </Provider>
);

// export const withStore = connect;
