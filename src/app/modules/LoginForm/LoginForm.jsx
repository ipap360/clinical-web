import React from 'react';
import {
    Form,
    FormTextField,
    FormSubmitButton,
    Link,
    Typography,
    FormRow,
    FormError
} from '../../../components';
import { RECOVER_PWD_INIT } from '../paths';
import styled from 'styled-components';

const Spacer = styled.div`
    height: 30px;
    width: 100%;
`;

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
        <Typography variant="caption">
            Did you forget your email or password? <Link to={RECOVER_PWD_INIT}>Reset</Link>
        </Typography>
    </Form>
);