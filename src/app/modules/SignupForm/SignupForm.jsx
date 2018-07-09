import React from 'react';

import { Form, Typography, Link, FormTextField, FormSubmitButton } from '../../../components';
import { TERMS } from '../paths';

export default ({ t, handleSubmit, ...props }) => (
    <Form onSubmit={handleSubmit}>
        <Typography variant='title'>
            Sign Up
        </Typography>
        <Typography variant='subheader'>
            Easy peasy
        </Typography>
        <FormTextField name='email' inputProps={{autoComplete: "username"}} label={t("Email")} />
        <FormTextField name='password' inputProps={{autoComplete: "new-password", type: "password"}} label={t("Password")} />
        <Typography variant='body1'>
            By clicking <strong>Sign Up</strong>, you agree to our <Link to={TERMS}>Terms</Link>.
        </Typography>
        <FormSubmitButton>
            {t("Sign Up")}
        </FormSubmitButton>
    </Form>
);