import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import dictionary from './dictionary.json';
import Cookies from 'js-cookie';
// import * as Cookies from 'js-cookie';

// https://github.com/alexei/sprintf.js
// sprintf usage
// 1. plain: sprintf('%s %s a %s', 'Polly', 'wants', 'cracker') 
// 2. ordered: sprintf('%2$s %3$s a %1$s', 'cracker', 'Polly', 'wants')    
const t = function (text, ...args) {

    const sourceLang = "en-US";
    const targetLang = Cookies.get('lang') || sourceLang;
    
    const l10n = dictionary[targetLang];
    if (!l10n || !l10n[text] || sourceLang === targetLang) {
        if (!l10n) {
            // console.warn(`We have no translation for "${targetLang}"`);
        } else if (!l10n[text] && sourceLang !== targetLang) {
            console.warn(`Translation of "${text}" is missing in "${targetLang}"`);
        }

        return sprintf(text, ...args);
    }
    
    return sprintf(l10n[text], ...args);
};

export default t;