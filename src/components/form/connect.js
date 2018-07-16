import React from 'react';
import { connect } from 'react-redux';
import { FormName, getFormError, isSubmitting, submit, reset } from 'redux-form';

const mapS2P = (state, { form }) => ({
    error: getFormError(form)(state),
    submitting: isSubmitting(form)(state),
});

const mapD2P = (dispatch) => ({
    submit: (form) => () => dispatch(submit(form)),
    reset: (form) => () => dispatch(reset(form))
});

function withForm(Component) {
    return class extends React.Component {
        render() {
            return (
                <FormName>
                    {
                        ({ form }) => (<Component {...this.props} form={form} />)
                    }
                </FormName>
            );
        }
    }
}

export default (comp) => withForm(connect(mapS2P, mapD2P)(comp));