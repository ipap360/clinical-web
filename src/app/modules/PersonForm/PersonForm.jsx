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
    FormSelect2,
    FormDateField,
} from '../../../components';

const PersonForm = ({ t, handleSubmit, modal = false, className, birthYears, ...props }) => {
    console.log(modal);
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
                <FormRadioGroup name="gender" fullWidth label={t("Gender")}>
                    <FormRadio value="MALE" label={t("Male")} />
                    <FormRadio value="FEMALE" label={t("Female")} />
                    <FormRadio value="UNKNOWN" label={t("Other")} />
                </FormRadioGroup>
            </FormRow>
            <FormRow>
                <FormSelect name="birthYear" menuPosition={(modal) ? 'fixed' : 'absolute'} loadOptions={birthYears} label={t("Year of birth")} fullWidth/>
            </FormRow>
            {/* <FormRow>
                <FormDateField name="date1" label={t("Date")}/>
            </FormRow> */}
            {/* <FormRow>
                <FormSelect2 
                    name="birthYear2" 
                    options={props.birthOptions} 
                    isLoading={props.birthLoading} 
                    onInputChange={birthYears} 
                    label={t("Year of birth")}
                />
            </FormRow> */}
            <FormButtonsContainer>
                <FormSubmitButton>{t("Insert")}</FormSubmitButton>
                <FormResetButton>{t("Reset")}</FormResetButton>
            </FormButtonsContainer>
            <FormError />
        </Form>
    );
}

export default PersonForm; 