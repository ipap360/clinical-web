import { connect } from 'react-redux';
import { reducer, reduxForm, SubmissionError } from 'redux-form';
import { translate } from "react-i18next";

import registerReducer from './registerReducer';
import { withTheme } from '@material-ui/core';

registerReducer("form", reducer);

const onSubmit = (values, dispatch, props) => new Promise((resolve, reject) => {
    const { submitActionCreator } = props;
    submitActionCreator(values, { resolve, reject });
}).catch(({ data: { message, ...more }, status, statusText }) => {
    throw new SubmissionError({
        _error: message || statusText,
        ...more
    });
});

export default (options = {}) => (comp) => {
    const { s2p, d2p, form, i18n } = options;
    let ret = translate(i18n)(comp);
    ret = withTheme()(ret);
    if (form) ret = reduxForm({ form, onSubmit })(ret);
    return connect(s2p, d2p)(ret);
};