import React from 'react';
import i18n from "i18next";
import { I18nextProvider, translate as i18translate } from "react-i18next";

// import LanguageDetector from "i18next-browser-languagedetector";
// .use(LanguageDetector)

export default (name, resources) => (Component) => (props) => {

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
        // ns: [name],
        defaultNS: name,
    
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

export const translate = (name) => i18translate((props) => (props.namespaces) ? [name, ...props.namespaces] : [name]);