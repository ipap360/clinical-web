import React from 'react';
import { Button, Message } from 'semantic-ui-react';
import { Field, reduxForm, SubmissionError } from 'redux-form';

const onSubmit = (action) => (values, dispatch) => new Promise((resolve, reject) => {
    dispatch({
        type: action,
        payload: values,
        resolve,
        reject
    });
}).catch(({data: {message, ...more}, status, statusText}) => {
    throw new SubmissionError({
        _error: message || statusText,
        ...more
    });
});

const FormButton = ({ action, form: { anyTouched, handleSubmit, pristine, reset, submitting, error }, noError, ...custom }) => {
    return (
        <div>
            <Button
                onClick={handleSubmit(onSubmit(action))}
                loading={submitting}
                disabled={submitting}
                {...custom}
            />
            <Message error content={error} visible={error != undefined && !noError && !submitting} />
        </div>
    );
}

export default FormButton;