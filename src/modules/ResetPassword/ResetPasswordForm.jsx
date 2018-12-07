import React from "react";
import {
    Form,
    FormText,
    FormSubmitButton,
    FormRow,
    FormError,
    FormButtonsContainer
} from "../../components";
import { password } from "../../api";
import { consume } from "../../context";
import classNames from "classnames";
import { formStyles as styles } from "../../components";

const ResetPasswordForm = ({ t, classes, className, onSaveSuccess, token }) => (
    <Form
        save={(id, values) =>
            password.reset({
                token,
                ...values
            })
        }
        className={classNames(classes.form, className)}
        formProps={{ noValidate: "novalidate" }}
        onSaveSuccess={onSaveSuccess}
    >
        <FormRow>
            <FormText
                name="password"
                inputProps={{ autoComplete: "new-password", type: "password" }}
                label={t("New Password")}
                fullWidth
                required
            />
        </FormRow>
        <FormButtonsContainer>
            <FormSubmitButton fullWidth>
                {t("Set New Password")}
            </FormSubmitButton>
        </FormButtonsContainer>
        <FormError />
    </Form>
);

export default consume({ styles })(ResetPasswordForm);
