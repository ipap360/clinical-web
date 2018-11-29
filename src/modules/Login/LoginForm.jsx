import React from "react";
import {
    Form,
    FormText,
    FormSubmitButton,
    Anchor,
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

const LoginForm = ({ t, classes, className }) => (
    <Form
        save={(id, values) => sessions.login(values)}
        className={classNames(classes.form, className)}
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
            <Anchor to={RECOVER_PWD_INIT}>{t("Forgot your password?")}</Anchor>
        </TTypography>
    </Form>
);

export default consume({ styles })(LoginForm);
