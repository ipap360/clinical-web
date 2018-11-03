import React from "react";
import i18n from "i18next";
import { I18nextProvider, withNamespaces } from "react-i18next";
import XHR from "i18next-xhr-backend";

// import LanguageDetector from "i18next-browser-languagedetector";
// .use(LanguageDetector)

const DEFAULT_NS = "translations";
export default resources => Component => props => {
    i18n.use(XHR).init({
        // initial language?
        lng: "en-US",
        // we init with preloaded resources
        resources: resources,

        // key is the fallback
        fallbackLng: false,

        // debug if development
        // debug: process.env.NODE_ENV !== 'production',
        debug: false,

        // have a common namespace used around the full app
        ns: [],
        defaultNS: DEFAULT_NS,

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ","
        },

        react: {
            wait: true
        },

        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json"
        }
    });

    return (
        <I18nextProvider i18n={i18n}>
            <Component {...props} />
        </I18nextProvider>
    );
};

export const withI18n = (...namespaces) =>
    withNamespaces([DEFAULT_NS, ...namespaces]);
