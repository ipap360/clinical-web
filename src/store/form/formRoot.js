import reducerRegistry from '../reducerRegistry';
import { reducer, reduxForm, SubmissionError } from 'redux-form';

const onSubmit = (values, dispatch, props) => new Promise((resolve, reject) => {
    // TODO: CHECK what is 'props'!
    console.log(props);
    dispatch({
        type: form,
        payload: values,
        resolve,
        reject
    });
}).catch(({ data: { message, ...more }, status, statusText }) => {
    throw new SubmissionError({
        _error: message || statusText,
        ...more
    });
});

reducerRegistry.register("form", reducer);

export default (form) => reduxForm({ form, onSubmit });

