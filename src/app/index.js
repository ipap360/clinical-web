import App from './modules';
import theme from './theme';
import state from './initialState';
import { APP_NAME } from './constants';
import ReactPlay from '../common';

export default ReactPlay(APP_NAME, state, theme, [])(App);