import React from 'react';

import { Button, Checkbox, Form, Input, Image, Message } from 'semantic-ui-react';

import t from 'i18n';
import { connectForm, FormTextInput, FormButton, Navigation } from 'components';

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
                <FormTextInput name='username' icon='user' iconPosition='left' placeholder={emailTxt} />
            </Form.Field>
            <Form.Field>
                <FormTextInput name='password' type="password" icon='lock' iconPosition='left' placeholder={passTxt} />
            </Form.Field>
            <FormButton action='LOGIN' fluid primary size="large" {...btn}>
                {loginTxt}
            </FormButton>
            <div style={{
                marginTop: '5px',
                fontSize: '12px',
                textAlign: 'right'
            }}>
                <Navigation to='/recover/init'>
                    {t("Forgotten credentials?")}
                </Navigation>
            </div>
        </Form>
    );
}

export default connectForm({ form: 'login' })(Login);