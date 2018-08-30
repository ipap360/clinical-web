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
    FormDateField,
} from '../../../components';

const CalendarEventForm = ({ t, handleSubmit, className, fetchPersons, ...props }) => {
    return (
        <Form onSubmit={handleSubmit} className={className}>
            <FormRow>
                <FormSelect name="personId" loadOptions={fetchPersons} label={t("Patient")} fullWidth/>
            </FormRow>
            <FormRow>
                <FormDateField name="date" label={t("Date")}/>
            </FormRow>
            <FormRow>
                <FormRadioGroup name="duration" fullWidth label={t("Night stay")}>
                    <FormRadio value="0" label={t("None")} />
                    <FormRadio value="1" label={t("One")} />
                    <FormRadio value="2" label={t("Two")} />
                    <FormRadio value="3" label={t("Three")} />
                </FormRadioGroup>
            </FormRow>
            <FormRow>
                <FormAreaField
                    name='description'
                    inputProps={{ maxLength: "255" }}
                    label={t("Notes")}
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
}

export default CalendarEventForm; 