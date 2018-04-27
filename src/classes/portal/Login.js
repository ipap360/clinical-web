import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Input, Image, Message } from 'semantic-ui-react';
import t from '../../i18n/i18n';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Axios from 'axios';

class Login extends Component {

    render() {
        // i18n
        const emailTxt = t("Email");
        const passTxt = t("Password");
        const loginTxt = t("Login");
        const forgotTxt = t("Forgot your password?");

        const { onSubmit, handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <Form size='large'>
                <Form.Field>
                    <Field name='email' component={Input} icon='user' iconPosition='left' placeholder={emailTxt} />
                </Form.Field>
                <Form.Field>
                    <Field name='password' component={Input} type="password" icon='lock' iconPosition='left' placeholder={passTxt} />
                </Form.Field>
                <Button onClick={handleSubmit(onSubmit)} fluid primary size="large" loading={submitting} disabled={pristine || submitting}>
                    {loginTxt}
                </Button>
                <Message error></Message>
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (values) => {
            return Axios.post("/tokens", values).then((response) => {
                // console.log(response);
                dispatch({
                    type: "LOGIN_OK",
                    payload: response.data
                });
            }).catch((error) => {
                throw new SubmissionError({
                    // password: 'Wrong password',
                    _error: error //'Login failed!'
                  })
            })
        }
    }
}

Login = connect(
    null,
    mapDispatchToProps
)(Login);

export default reduxForm({ form: 'login'})(Login);