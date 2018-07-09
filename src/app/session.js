import momentTimezone from 'moment-timezone';
import moment from 'moment';
import 'moment/locale/el';
import Cookies from 'js-cookie';
import locale2 from 'locale2';
import { base64 } from '../common';

const SESSION_COOKIE_NAME = 'presence';
const LANG_COOKIE_NAME = 'lang';
const XSRF_COOKIE = "XSRF-TOKEN";

// these are set by the server and are defined only for logout
// const ACCESS_TOKEN_COOKIE_NAME = "p1z3a6";
const REFRESH_TOKEN_COOKIE_NAME = "iu2w";

// default session details based on client's system settings
export const session0 = {
    uuid: "",
    language: locale2,
    locale: locale2,
    name: null,
    timezone: momentTimezone.tz.guess(),
    expiresAt: null
};

export const get = () => {
    let session = Cookies.get(SESSION_COOKIE_NAME);
    if (session) {
        try {
            return { ...session0, ...JSON.parse(base64.decode(session)) };
        } catch (e) {
            console.warn("session cookie parsing failed!", session);
        }
    }

    const lang = Cookies.get(LANG_COOKIE_NAME) || locale2;
    return { ...session0, language: lang, locale: lang };
};

export const set = (obj) => {
    const expires = (obj.expiresAt) ? new Date(obj.expiresAt) : 0;
    Cookies.set(SESSION_COOKIE_NAME, base64.encode(JSON.stringify(obj)), {
        expires
    });
    const lang = obj.language || locale2;
    setLanguage(lang);
    // Cookies.set(LANG_COOKIE_NAME, lang);
}

export const clear = () => {
    Cookies.remove(SESSION_COOKIE_NAME);
    Cookies.remove(XSRF_COOKIE);
    Cookies.remove(REFRESH_TOKEN_COOKIE_NAME);
}

export const setLanguage = (lang = Cookies.get(LANG_COOKIE_NAME)) => {
    const language = lang || locale2;
    Cookies.set(LANG_COOKIE_NAME, language);
    const momentLanguage = language.split("-")[0];
    moment.locale(momentLanguage);
}