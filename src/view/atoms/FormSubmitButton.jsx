import React from 'react';
import { AsyncButton } from '.';
import { connect2form } from '../../store';

// import { connect } from 'react-redux';
// import { SubmissionError, FormName, getFormError, isSubmitting, submit } from 'redux-form';

// const submit = (form) => (values, dispatch) => new Promise((resolve, reject) => {
//     dispatch({
//         type: form,
//         payload: values,
//         resolve,
//         reject
//     });
// }).catch(({ data: { message, ...more }, status, statusText }) => {
//     throw new SubmissionError({
//         _error: message || statusText,
//         ...more
//     });
// });

export default connect2form(({ submit, form, submitting, ...props }) => (
    <AsyncButton onClick={submit(form)} loading={submitting} disabled={submitting} {...props} />
));