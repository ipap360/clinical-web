import React from 'react';
import {
    Form,
    FormTextField,
    FormSubmitButton,
    Link,
    Typography,
    FormRow,
    FormError,
    Spacer
} from '../../../components';
import { RECOVER_PWD_INIT } from '../paths';

export default ({ t, handleSubmit }) => (
    <Form onSubmit={handleSubmit}>
        <FormRow>
            <FormTextField name='username' inputProps={{ autoComplete: "username" }} label={t("Email")} fullWidth />
        </FormRow>
        <FormRow>
            <FormTextField name='password' inputProps={{ autoComplete: "current-password", type: "password" }} label={t("Password")} fullWidth />
        </FormRow>
        <Spacer />
        <FormSubmitButton fullWidth>
            {t("Log In")}
        </FormSubmitButton>
        <FormError />
        <Typography variant="caption" align="right">
            <Link to={RECOVER_PWD_INIT}>Forgot password?</Link>
        </Typography>
    </Form>
);