import React from "react";
import { patients } from "../../api";
import { withI18n } from "../../context";
import { data } from "../../utils";

import {
    Form,
    FormRow,
    FormText,
    FormSubmitButton,
    FormResetButton,
    FormRadioGroup,
    FormButtonsContainer,
    FormRadio,
    FormError,
    FormSelect,
    FormArea
} from "../../components";

const PatientForm = ({
    t,
    id = 0,
    modal = false,
    className,
    onSaveSuccess
}) => {
    return (
        <Form
            id={id}
            load={patients.view}
            save={patients.save}
            className={className}
            onSaveSuccess={onSaveSuccess}
            formProps={{ noValidate: "novalidate" }}
        >
            <FormRow>
                <FormText
                    name="name"
                    inputProps={{ maxLength: "255" }}
                    label={t("Name")}
                    fullWidth
                    required
                />
            </FormRow>
            <FormRow>
                <FormText
                    name="code"
                    inputProps={{ maxLength: "255" }}
                    label={t("Code")}
                    fullWidth
                />
            </FormRow>
            <FormRow>
                <FormArea name="notes" label={t("Notes")} fullWidth />
            </FormRow>
            <FormRow>
                <FormRadioGroup name="gender" fullWidth label={t("Gender")}>
                    <FormRadio value="MALE" label={t("Male")} />
                    <FormRadio value="FEMALE" label={t("Female")} />
                    {/* <FormRadio value="UNKNOWN" label={t("Other")} /> */}
                </FormRadioGroup>
            </FormRow>
            <FormRow>
                <FormSelect
                    name="birthYear"
                    menuPosition={modal ? "fixed" : "absolute"}
                    options={data
                        .range2array(1910, new Date().getFullYear())
                        .map(y => ({ value: y, label: y }))}
                    label={t("Year of birth")}
                    fullWidth
                />
            </FormRow>
            <FormButtonsContainer>
                <FormSubmitButton>{t("Insert")}</FormSubmitButton>
                <FormResetButton>{t("Reset")}</FormResetButton>
            </FormButtonsContainer>
            <FormError />
        </Form>
    );
};

export default withI18n()(PatientForm);
