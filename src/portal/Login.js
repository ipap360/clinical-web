import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import { Button, Checkbox, Form, Input, Image, Message } from 'semantic-ui-react';

import t from 'i18n';
import { FormTextInput, FormButton } from 'components';

const Login = (props) => {

    // i18n
    const emailTxt = t("Email");
    const passTxt = t("Password");
    const loginTxt = t("Login");
    const forgotTxt = t("Forgot your password?");

    const btn = { form: props };

    return (
        <Form size='large'>
            <Form.Field>
                <Field name='username' component={FormTextInput} icon='user' iconPosition='left' placeholder={emailTxt} />
            </Form.Field>
            <Form.Field>
                <Field name='password' component={FormTextInput} type="password" icon='lock' iconPosition='left' placeholder={passTxt} />
            </Form.Field>
            <FormButton action='REFRESH_TOKEN_REQUESTED' fluid primary size="large" content={loginTxt} {...btn} />
            <div style={{
                marginTop: '5px',
                fontSize: '12px',
                textAlign: 'right'
            }}>
                <Link to='/recover/init'>
                    {t("Forgotten credentials?")}
                </Link>
            </div>
        </Form>
    );
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onSubmit: (values) => {
//             return 
//         }
//     }
// }

// Login = connect(
//     null,
//     mapDispatchToProps
// )(Login);

export default reduxForm({ form: 'login' })(Login);