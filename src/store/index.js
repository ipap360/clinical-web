import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

export const APP_NAME = "MedCalendar";

export { default as connectForm } from './form/formRoot';
export { default as connect2form } from './form/formElement';

export { default as connectNewCalendarEvent } from './calendarEvent/newCalendarEvent';


const store = configureStore();
store.dispatch({ type: APP_NAME });

export default (Component) => (props) => (
    <Provider store={store}>
        <Component {...props} />
    </Provider>
);

// export const history = syncHistoryWithStore(browserHistory, store);