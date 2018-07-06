import React from 'react';
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import dictionary from "./dictionary.json";

// import LanguageDetector from "i18next-browser-languagedetector";
// .use(LanguageDetector)

const BASE_NS = "base";

let resources = {};
for (let lang in dictionary) {
    resources[lang] = { [BASE_NS]: { ...dictionary[lang] } }
}

console.log(resources);

i18n.init({
    // initial language?
    lng: 'en-US',
    // we init with preloaded resources
    resources: resources,

    // key is the fallback
    fallbackLng: false,

    // debug if development
    debug: process.env.NODE_ENV !== 'production',

    // have a common namespace used around the full app
    ns: [BASE_NS],
    defaultNS: BASE_NS,

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

export default (Component) => (props) => (
    <I18nextProvider i18n={i18n}>
        <Component {...props} />
    </I18nextProvider>
);