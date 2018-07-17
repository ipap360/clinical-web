import React from 'react';
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";

// import LanguageDetector from "i18next-browser-languagedetector";
// .use(LanguageDetector)
const DEFAULT_NS = "global";
export default (resources) => (Component) => (props) => {

    i18n.init({
        // initial language?
        lng: 'en-US',
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
        }

    });

    return (
        <I18nextProvider i18n={i18n}>
            <Component {...props} />
        </I18nextProvider>
    );
}

// export const translate = (name) => i18translate((props) => (props.namespaces) ? [name, ...props.namespaces] : [name]);