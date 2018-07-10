import ReactForce from '../common';
import name from './name';
import translations from './i18n';
import theme from './theme';
import state from './initialState';

const force = ReactForce(name, state, theme, translations);

export const {
    withForce,
    reducerRegistry,
    connect2store,
    runSaga,
    history
} = force;
