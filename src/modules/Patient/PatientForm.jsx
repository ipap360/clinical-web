import React from "react";
import { patients } from "../../api";
import { consume } from "../../context";
import { data } from "../../utils";

import { Button } from "@material-ui/core";

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
    FormArea,
} from "../../components";

const PatientForm = ({
    t,
    children,
    id = 0,
    modal = false,
    className,
    onSaveSuccess,
    onCancel,
}) => {
    const isNew = id === 0;
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
                />
            </FormRow>
            <FormRow>
                <FormRadioGroup
                    name="gender"
                    fullWidth
                    label={t("Gender")}
                    required
                >
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
                />
            </FormRow>
            <FormRow>
                <FormArea name="notes" label={t("Notes")} fullWidth />
            </FormRow>
            <FormButtonsContainer>
                <FormSubmitButton>
                    {isNew ? t("Insert") : t("Save")}
                </FormSubmitButton>
                {modal ? (
                    <Button onClick={onCancel}>{t("Cancel")}</Button>
                ) : (
                    <FormResetButton>
                        {isNew ? t("Reset") : t("Undo")}
                    </FormResetButton>
                )}
            </FormButtonsContainer>
            <FormError />
            {children}
        </Form>
    );
};

export default consume()(PatientForm);
