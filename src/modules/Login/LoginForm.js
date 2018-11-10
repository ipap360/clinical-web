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
} from "../../components";
import { RECOVER_PWD_INIT } from "../routes";
import { sessions } from "../../api";
import { consume } from "../../context";
import classNames from "classnames";
import { formStyles as styles } from "../../components";

const LoginForm = ({ t, classes, className, sessionUpdated }) => (
    <Form
        save={(id, values) => sessions.login(values)}
        className={classNames(classes.form, className)}
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
            <Link to={RECOVER_PWD_INIT}>{t("Forgot your password?")}</Link>
        </TTypography>
    </Form>
);

export default consume({ styles })(LoginForm);
