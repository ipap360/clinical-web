import React from "react";
import i18n from "i18next";
import {
    I18nextProvider,
    withNamespaces,
    NamespacesConsumer
} from "react-i18next";
import XHR from "i18next-xhr-backend";

// import LanguageDetector from "i18next-browser-languagedetector";
// .use(LanguageDetector)

const DEFAULT_NS = "translation";

// const greek = {
//     type: "postProcessor",
//     name: "greek",
//     process: function(value, key, options, translator) {
//         console.log(value, key, options, translator);
//         return value;
//     }
// };

i18n.use(XHR)
    // .use(greek)
    .init({
        // initial language?
        // lng: "en",
        // we init with preloaded resources
        // resources: resources,

        // key is the fallback
        fallbackLng: false,
        // fallbackLng: {
        //     "el-GR": ["el"],
        //     "en-US": ["en"],
        //     default: ["en"]
        // },

        // debug if development
        debug: process.env.NODE_ENV !== "production",
        // debug: false,

        // have a common namespace used around the full app
        ns: [],
        defaultNS: DEFAULT_NS,

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ","
        },

        react: {
            wait: true,
            withRef: true
        },

        // overloadTranslationOptionHandler: function(args) {
        //     return {
        //         postProcess: "greek",
        //         defaultValue: args[1]
        //     };
        // },

        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json"
        }
    });

export default Component => props => {
    return (
        <I18nextProvider i18n={i18n}>
            <Component {...props} />
        </I18nextProvider>
    );
};

export const changeLanguage = lng => {
    i18n.changeLanguage(lng);
};

export const withI18n = (namespaces = []) =>
    withNamespaces([DEFAULT_NS, ...namespaces]);

// const d = c => c.displayName || c.name || "Component";

// export const withI18n = (namespaces = []) => WrappedComponent => {
//     class WithI18n extends React.Component {
//         render() {
//             const { forwardedRef, ...rest } = this.props;

//             // Assign the custom prop "forwardedRef" as a ref
//             return (
//                 <NamespacesConsumer ns={[DEFAULT_NS, ...namespaces]}>
//                     {t => (
//                         <WrappedComponent ref={forwardedRef} t={t} {...rest} />
//                     )}
//                 </NamespacesConsumer>
//             );
//         }
//     }

//     function fwRef(props, ref) {
//         return React.createElement(WithI18n, { forwardedRef: ref, ...props });
//     }

//     fwRef.displayName = `WithI18n(${d(WrappedComponent)})`;

//     // Note the second param "ref" provided by React.forwardRef.
//     // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
//     // And it can then be attached to the Component.
//     return React.forwardRef(fwRef);
// };

// function logProps(Component) {
//     class LogProps extends React.Component {
//         // ...
//     }

//     function forwardRef(props, ref) {
//         return <LogProps {...props} forwardedRef={ref} />;
//     }

//     // Give this component a more helpful display name in DevTools.
//     // e.g. "ForwardRef(logProps(MyComponent))"
//     const name = Component.displayName || Component.name;
//     forwardRef.displayName = `logProps(${name})`;

//     return React.forwardRef(forwardRef);
// }
