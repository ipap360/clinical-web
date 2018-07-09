import ReactForce from '../common';

import translations from './i18n';
import theme from './theme';
import App from './modules';
import state from './initialState';

export const APP_NAME = "MedCalendar";

console.log(process);

export const { 
    withForce, 
    reducerRegistry, 
    connect2store, 
    runSaga, 
    history
} = ReactForce(APP_NAME, state, theme, translations);

export default withForce(App);