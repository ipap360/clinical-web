import { connect } from 'react-redux';
import { reducer, reduxForm, SubmissionError } from 'redux-form';

import { translate } from './i18n';
import reducerRegistry from './reducerRegistry';

reducerRegistry.register("form", reducer);

// (action) = 
const onSubmit = (values, dispatch, props) => new Promise((resolve, reject) => {
    // TODO: CHECK what is 'props'!
    console.log(props);
    // action({
    //     payload: values,
    //     resolve,
    //     reject
    // });
}).catch(({ data: { message, ...more }, status, statusText }) => {
    throw new SubmissionError({
        _error: message || statusText,
        ...more
    });
});

export default (name) => ({ s2p, d2p, form }) => (comp) => {
    let ret = translate(name)(comp);
    if (form) ret = reduxForm({ form, onSubmit })(ret);
    return connect(s2p, d2p)(ret);
};