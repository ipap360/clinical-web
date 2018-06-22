import React from 'react';
import { Button, Message } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { SubmissionError, FormName, getFormError, isSubmitting } from 'redux-form';


const submit = (form) => (values, dispatch) => new Promise((resolve, reject) => {
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

// , form: { anyTouched, handleSubmit, pristine, reset, submitting, error }
const FormButton = ({ onClick, form, submitting, error, noMessage, button }) => {
    return (
        <div>
            <Button
                onClick={onClick(submit(form))}
                loading={submitting}
                disabled={submitting}
                {...button}
            />
            {(!noMessage) ? <Message error content={error} visible={error !== undefined && !submitting} /> : null}
        </div>
    );
}

const mapS2P = (state, { form }) => {
    // console.log(state, form);
    return {
        error: getFormError(form)(state),
        submitting: isSubmitting(form)(state),
    }
}

const ConnectedButton = connect(mapS2P)(FormButton);

export default ({onClick, ...props}) => (<FormName children={({ form }) => (<ConnectedButton form={form} onClick={onClick} button={{...props}} />)} />);
