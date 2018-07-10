import configureStore from './configureStore';
import withDateUtils from './dates';
import applyTranslations from './i18n';
import applyTheme from './theme';

const DEFAULT_NAME = "Application";

export * from './utils';
export { default as registerSagas } from './registerSagas';
export { default as registerReducer } from './registerReducer';
export { default as connect2store } from './connect2store';

export default (name = DEFAULT_NAME, state = {}, theme = "", translations = []) => (Component) => {

    const withStore = configureStore(name, state);
    const withTheme = applyTheme(theme);
    const withI18n = applyTranslations(translations);

    return withDateUtils(withTheme(withI18n(withStore(Component))));
}