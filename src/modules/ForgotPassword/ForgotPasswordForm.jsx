import React from "react";
import {
    Form,
    FormText,
    FormSubmitButton,
    // FormResetButton,
    FormRow,
    FormError,
    FormButtonsContainer
} from "../../components";
import { RESET_PASSWORD } from "../routes";
import { password } from "../../api";
import { consume } from "../../context";
import classNames from "classnames";
import { formStyles as styles } from "../../components";

const ForgotPasswordForm = ({ t, classes, onSaveSuccess, className }) => (
    <Form
        save={(id, values) =>
            password.forgot({
                ...values,
                url: window.location.origin + RESET_PASSWORD
            })
        }
        className={classNames(classes.form, className)}
        formProps={{ noValidate: "novalidate" }}
        onSaveSuccess={onSaveSuccess}
    >
        <FormRow>
            <FormText name="email" label={t("Email")} fullWidth required />
        </FormRow>
        <FormButtonsContainer>
            <FormSubmitButton fullWidth>{t("Submit")}</FormSubmitButton>
            {/* <FormResetButton>{t("Undo")}</FormResetButton> */}
        </FormButtonsContainer>
        <FormError />
    </Form>
);

export default consume({ styles })(ForgotPasswordForm);
