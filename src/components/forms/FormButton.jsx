import React from 'react';
import { Button, Message } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { SubmissionError, FormName, getFormError, isSubmitting } from 'redux-form';


const onSubmit = (action) => (values, dispatch) => new Promise((resolve, reject) => {
    dispatch({
        type: action,
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
const FormButton = ({ onClick, form, submitting, error, noMessage, ...custom }) => {
    return (
        <div>
            <Button
                // onClick={() => submit(form)}
                onClick={onClick(onSubmit(form))}
                loading={submitting}
                disabled={submitting}
                {...custom}
            />
            {(!noMessage) ? <Message error content={error} visible={error != undefined && !submitting} /> : null}
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

export default (props) => (<FormName children={({ form }) => (<ConnectedButton form={form} {...props} />)} />);
