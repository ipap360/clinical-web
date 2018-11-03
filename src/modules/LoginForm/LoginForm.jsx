import React from "react";
import {
    Form,
    FormText,
    FormSubmitButton,
    Link,
    TTypography,
    FormRow,
    FormError,
    FormButtonsContainer
} from "../../../components";
import { RECOVER_PWD_INIT } from "../routes";
import { sessions } from "../../api";
import { withI18n } from "../../context";

export default withI18n()(({ t, className, sessionUpdated }) => (
    <Form
        save={sessions.login}
        className={className}
        onSubmitSuccess={args => {
            console.log(args);
        }}
    >
        <FormRow>
            <FormText
                name="username"
                inputProps={{ autoComplete: "username" }}
                label={t("Email")}
                fullWidth
            />
        </FormRow>
        <FormRow>
            <FormText
                name="password"
                inputProps={{
                    autoComplete: "current-password",
                    type: "password"
                }}
                label={t("Password")}
                fullWidth
            />
        </FormRow>
        <FormButtonsContainer>
            <FormSubmitButton fullWidth>{t("Log In")}</FormSubmitButton>
        </FormButtonsContainer>
        <FormError />
        <TTypography variant="caption" align="right">
            <Link to={RECOVER_PWD_INIT}>Forgot password?</Link>
        </TTypography>
    </Form>
));
