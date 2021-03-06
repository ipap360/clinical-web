import moment from "moment";
import locale2 from "locale2";
import Cookies from "js-cookie";
import { base64 } from "../utils";
import { changeLanguage } from "../context";

const SESSION_COOKIE_NAME = "presence";
const LANG_COOKIE_NAME = "lang";
const XSRF_COOKIE = "XSRF-TOKEN";

const REFRESH_TOKEN_COOKIE_NAME = process.env.REACT_APP_COOKIE || "cli3ntRT";

// default session details based on client's system settings
const session0 = {
    uuid: "",
    locale: locale2,
    name: null,
    timezone: "Europe/London",
    expiresAt: null,
};

// cookie session storage
const cookie = {
    get: () => {
        let session = Cookies.get(SESSION_COOKIE_NAME);
        if (session) {
            try {
                return { ...session0, ...JSON.parse(base64.decode(session)) };
            } catch (e) {
                console.warn("session cookie parsing failed!", session);
            }
        }

        const lang = Cookies.get(LANG_COOKIE_NAME) || locale2;
        return { ...session0, locale: lang };
    },
    set: obj => {
        const expires = obj.expiresAt ? new Date(obj.expiresAt) : 0;
        Cookies.set(SESSION_COOKIE_NAME, base64.encode(JSON.stringify(obj)), {
            expires,
        });
        const locale = obj.locale || locale2;
        cookie.setLanguage(locale);
    },
    clear: () => {
        console.trace("Cleared Cookie!");
        Cookies.remove(SESSION_COOKIE_NAME);
        Cookies.remove(XSRF_COOKIE);
        Cookies.remove(REFRESH_TOKEN_COOKIE_NAME);
    },
    setLanguage: (lang = Cookies.get(LANG_COOKIE_NAME)) => {
        const c = cookie.get();
        if (c.locale !== lang) {
            cookie.set({
                ...c,
                locale: lang,
            });
            return;
        }
        const language = lang || locale2;
        Cookies.set(LANG_COOKIE_NAME, language);
        moment.locale(language);
        changeLanguage(language);
    },
};

cookie.setLanguage();

export default cookie;
