import React from 'react';

import {
    Form,
    FormRow,
    FormSubmitButton,
    FormResetButton,
    FormRadioGroup,
    FormButtonsContainer,
    FormRadio,
    FormError,
    FormSelect,
    FormAreaField,
} from '../../../components';

import DatePickerWithAvailability from '../DatePickerWithAvailability';

class CalendarEventForm extends React.Component {

    componentWillMount() {

        const { id, loadCalendarEvent, fetchPatients } = this.props;

        // eslint-disable-next-line
        const isNew = (id === 'new' || id == '0');

        if (!isNew) {
            loadCalendarEvent(id);
        }

        fetchPatients();

    }

    // componentDidUpdate(prevProps) {
    //     const { submitSucceeded, onSuccess } = this.props;
    //     if (submitSucceeded !== prevProps.submitSucceeded) {
    //         if (typeof onSuccess === 'function') {
    //             onSuccess.apply(this);
    //         }
    //     }
    // }

    componentWillUnmount() {
        this.props.clearCalendarEvent();
    }

    render() {

        const {
            t,
            handleSubmit,
            className,
            id,
            disabledDate,
            patientOptions,
            gender,
            // ...other
        } = this.props;

        // eslint-disable-next-line
        const isNew = (id === 'new' || id == '0');

        return (
            <Form onSubmit={handleSubmit} className={className}>
                <FormRow>
                    <FormSelect
                        name="patient"
                        options={patientOptions}
                        label={t("Patient")}
                        fullWidth
                        isDisabled={!isNew}
                    />
                </FormRow>
                <FormRow>
                    <DatePickerWithAvailability
                        name="date"
                        label={t("Date")}
                        disabled={!disabledDate}
                        gender={gender}
                    />
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
                        name='notes'
                        label={t("Notes")}
                        fullWidth
                    />
                </FormRow>
                <FormButtonsContainer>
                    <FormSubmitButton>
                        {(isNew) ? t("Insert") : t("Save")}
                    </FormSubmitButton>
                    <FormResetButton>
                        {(isNew) ? t("Reset") : t("Undo")}
                    </FormResetButton>
                </FormButtonsContainer>
                <FormError />
            </Form>
        );
    }

}

export default CalendarEventForm; 