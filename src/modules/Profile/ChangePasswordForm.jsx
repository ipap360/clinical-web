import React from "react";
import {
    Form,
    FormText,
    FormSubmitButton,
    FormResetButton,
    FormRow,
    FormError,
    FormButtonsContainer
} from "../../components";
import { profile } from "../../api";
import { consume } from "../../context";
import classNames from "classnames";
import { formStyles as styles } from "../../components";

const ChangePasswordForm = ({ t, classes, className, onSaveSuccess }) => (
    <Form
        save={(id, values) => profile.updatePwd(values)}
        className={classNames(classes.form, className)}
        formProps={{ noValidate: "novalidate" }}
        onSaveSuccess={onSaveSuccess}
    >
        <FormRow>
            <FormText
                name="oldPassword"
                inputProps={{
                    autoComplete: "current-password",
                    type: "password"
                }}
                label={t("Current Password")}
                fullWidth
                required
            />
        </FormRow>
        <FormRow>
            <FormText
                name="newPassword"
                inputProps={{ autoComplete: "new-password", type: "password" }}
                label={t("New Password")}
                fullWidth
                required
            />
        </FormRow>
        <FormButtonsContainer>
            <FormSubmitButton>{t("Update Password")}</FormSubmitButton>
            <FormResetButton>{t("Undo")}</FormResetButton>
        </FormButtonsContainer>
        <FormError />
    </Form>
);

export default consume({ styles })(ChangePasswordForm);
