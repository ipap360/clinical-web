import React from 'react';
import { Form, FormTextField, FormSubmitButton, Link, Typography } from '../../../components';
import { RECOVER_PWD_INIT } from '../paths';

export default ({ t, handleSubmit }) => (
    <Form onSubmit={handleSubmit}>
        <FormTextField name='username' inputProps={{ autocomplete: "username" }} label={t("Email")} />
        <FormTextField name='password' inputProps={{ autocomplete: "current-password", type: "password" }} label={t("Password")} />
        <FormSubmitButton>
            t("Log In")
        </FormSubmitButton>
        <Typography variant="caption">
            Did you forget your email or password? <Link to={RECOVER_PWD_INIT}>Reset</Link>
        </Typography>
    </Form>
);