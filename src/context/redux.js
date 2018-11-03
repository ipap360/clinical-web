import React from "react";
import { Provider, connect } from "react-redux";
import configureStore from "redux-dynamic-config";

const store = configureStore("iHM", {});

export default Component => props => (
    <Provider store={store}>
        <Component {...props} />
    </Provider>
);

export const withStore = connect;

// import { connect } from "react-redux";
// import { reducer, reduxForm, SubmissionError } from "redux-form";
// import { translate } from "react-i18next";

// import { registerReducer } from "redux-dynamic-config";
// import { withTheme } from "@material-ui/core";

// registerReducer("form", reducer);

// const onSubmit = (values, dispatch, props) =>
//     new Promise((resolve, reject) => {
//         const { submitActionCreator, id = 0 } = props;
//         // console.log(values);
//         submitActionCreator({ id, ...values }, { resolve, reject });
//     }).catch(
//         ({
//             data: { message = "", errors = {}, ...more },
//             status,
//             statusText
//         }) => {
//             throw new SubmissionError({
//                 _error:
//                     message == null && Object.keys(errors).length === 0
//                         ? statusText
//                         : message,
//                 ...errors
//             });
//         }
//     );

// export default (options = {}) => comp => {
//     const { s2p, d2p, form, i18n } = options;
//     let ret = translate(i18n)(comp);
//     ret = withTheme()(ret);
//     if (form) {
//         if (typeof form === "string") {
//             ret = reduxForm({ form, onSubmit, enableReinitialize: true })(ret);
//         } else if (typeof form === "object") {
//             ret = reduxForm({
//                 form: form.name,
//                 onSubmit,
//                 enableReinitialize: true
//             })(ret);
//         }
//     }
//     return connect(
//         s2p,
//         d2p
//     )(ret);
// };
