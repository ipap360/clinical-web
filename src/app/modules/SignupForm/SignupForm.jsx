import React from 'react';

import { Form, Typography, Link, FormTextField, FormSubmitButton, FormRow, Spacer } from '../../../components';
import { TERMS } from '../paths';

export default ({ t, handleSubmit, ...props }) => (
    <Form onSubmit={handleSubmit}>
        <FormRow>
            <FormTextField
                name='email'
                inputProps={{ autoComplete: "username" }}
                label={t("Email")}
                fullWidth
            />
        </FormRow>
        <FormRow>
            <FormTextField
                name='password'
                inputProps={{ autoComplete: "new-password", type: "password" }}
                label={t("Password")}
                fullWidth
            />
        </FormRow>
        <Spacer />
        <FormRow>
            <Typography variant='body1'>
                By clicking <strong>Sign Up</strong>, you agree to our <Link to={TERMS}>Terms</Link>.
            </Typography>
        </FormRow>
        <FormRow>
            <FormSubmitButton fullWidth>
                {t("Sign Up")}
            </FormSubmitButton>
        </FormRow>
    </Form>
);