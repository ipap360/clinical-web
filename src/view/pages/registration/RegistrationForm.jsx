import React from 'react';

import { Form, Typography, Link, FormTextInput } from '../../atoms';
import { TERMS } from '../../paths';

const RegistrationForm = ({ t, handleSubmit, ...props }) => (
    <Form>
        <Typography variant='title'>
            Sign Up
        </Typography>
        <Typography variant='subheader'>
            Easy peasy
        </Typography>
        <FormTextInput name='email' inputProps={{autoComplete: "username"}} label={t("Email")} />
        <FormTextInput name='password' inputProps={{autoComplete: "new-password", type: "password"}} label={t("Password")} />
        <Typography variant='body1'>
            By clicking <strong>Sign Up</strong>, you agree to our <Link to={TERMS}>Terms</Link>.
        </Typography>
        <FormButton onClick={handleSubmit} fluid positive size="large">
            {t("Sign Up")}
        </FormButton>
    </Form>
);

const getSession = (state) => state.session || {};
const getTimezone = (session) => session.timezone;
const getLocale = (session) => session.locale;

const mapS2P = (state, ownProps) => ({
    initialValues: {
        timezone: getTimezone(getSession(state)),
        locale: getLocale(getSession(state)),
        url: ownProps.callbackURL
    }
});

export default connect(RegistrationForm);