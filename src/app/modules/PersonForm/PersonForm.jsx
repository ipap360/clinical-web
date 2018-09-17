import React from 'react';

import {
    Form,
    FormRow,
    FormTextField,
    FormSubmitButton,
    FormResetButton,
    FormRadioGroup,
    FormButtonsContainer,
    FormRadio,
    FormError,
    FormSelect,
    FormAreaField,
} from '../../../components';

const PersonForm = ({ t, handleSubmit, modal = false, className, birthYears, ...props }) => {
    
    return (
        <Form onSubmit={handleSubmit} className={className}>
            <FormRow>
                <FormTextField
                    name='name'
                    inputProps={{ maxLength: "255" }}
                    label={t("Name")}
                    fullWidth
                />
            </FormRow>
            <FormRow>
                <FormTextField
                    name='code'
                    inputProps={{ maxLength: "255" }}
                    label={t("Code")}
                    fullWidth
                />
            </FormRow>
            <FormRow>
                <FormAreaField
                    name='notes'
                    label={t("Notes")}
                    fullWidth
                />
            </FormRow>
            <FormRow>
                <FormRadioGroup name="gender" fullWidth label={t("Gender")}>
                    <FormRadio value="MALE" label={t("Male")} />
                    <FormRadio value="FEMALE" label={t("Female")} />
                    <FormRadio value="UNKNOWN" label={t("Other")} />
                </FormRadioGroup>
            </FormRow>
            <FormRow>
                <FormSelect name="birthYear" menuPosition={(modal) ? 'fixed' : 'absolute'}
                    options={birthYears}
                    label={t("Year of birth")} fullWidth />
            </FormRow>
            <FormButtonsContainer>
                <FormSubmitButton>{t("Insert")}</FormSubmitButton>
                <FormResetButton>{t("Reset")}</FormResetButton>
            </FormButtonsContainer>
            <FormError />
        </Form>
    );
}

export default PersonForm; 