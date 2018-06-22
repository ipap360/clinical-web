import React from 'react';

import { reduxForm } from 'redux-form';

import { Form } from 'semantic-ui-react';

import t from 'i18n';
import { FormTextInput, FormButton, Navigation } from 'components';

import { RECOVER_PWD_INIT } from 'common/paths';
import { LOGIN } from 'common/actions';

const LoginForm = ({ handleSubmit }) => {

    const emailTxt = t("Email");
    const passTxt = t("Password");
    const loginTxt = t("Log In");
    const forgotTxt = t("Did you forget your email or password?");

    return (
        <Form size='large'>
            <Form.Field>
                <FormTextInput name='username' autoComplete="username" icon='user' iconPosition='left' placeholder={emailTxt} />
            </Form.Field>
            <Form.Field>
                <FormTextInput name='password' autoComplete="current-password" type="password" icon='lock' iconPosition='left' placeholder={passTxt} />
            </Form.Field>
            <FormButton onClick={handleSubmit} fluid primary size="large">
                {loginTxt}
            </FormButton>
            <div style={{
                marginTop: '5px',
                fontSize: '12px',
                textAlign: 'right'
            }}>
                <Navigation to={RECOVER_PWD_INIT}>
                    {forgotTxt}
                </Navigation>
            </div>
        </Form>
    );
};

export default reduxForm({ form: LOGIN })(LoginForm);