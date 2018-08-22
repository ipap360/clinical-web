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
                <FormRadioGroup name="duration" fullWidth label={t("Will stay overnight")}>
                    <FormRadio value="0" label={t("No")} />
                    <FormRadio value="1" label={t("1 night")} />
                    <FormRadio value="2" label={t("2 nights")} />
                    <FormRadio value="3" label={t("3 nights")} />
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