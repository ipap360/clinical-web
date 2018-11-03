import React from "react";
import { FormSpy } from "react-final-form";

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
    FormArea
} from "../../components";

import { withI18n } from "../../context";
import { calendarEvents } from "../../api";

import DatePickerWithAvailability from "../DatePickerWithAvailability";

class CalendarEventForm extends React.Component {
    componentDidMount() {
        const { fetchPatients } = this.props;
        fetchPatients();
    }

    render() {
        const { t, className, id, patients, ...props } = this.props;
        const isNew = id === 0;
        return (
            <Form
                id={id}
                save={calendarEvents.save}
                load={calendarEvents.view}
                className={className}
                {...props}
            >
                <FormRow>
                    <FormSelect
                        name="patient"
                        options={patients}
                        label={t("Patient")}
                        fullWidth
                        disabled={!isNew}
                    />
                </FormRow>
                <FormSpy subscription={{ values: true }}>
                    {values => {
                        // TODO: read patient and determin disabled + gender
                        console.log(values);
                        return (
                            <FormRow>
                                <DatePickerWithAvailability
                                    name="date"
                                    label={t("Date")}
                                    // disabled={!disabledDate}
                                    // gender={gender}
                                />
                            </FormRow>
                        );
                    }}
                </FormSpy>
                <FormRow>
                    <FormRadioGroup
                        name="duration"
                        fullWidth
                        label={t("Night stay")}
                    >
                        <FormRadio value="0" label={t("None")} />
                        <FormRadio value="1" label={t("One")} />
                        <FormRadio value="2" label={t("Two")} />
                        <FormRadio value="3" label={t("Three")} />
                    </FormRadioGroup>
                </FormRow>
                <FormRow>
                    <FormArea name="notes" label={t("Notes")} fullWidth />
                </FormRow>
                <FormButtonsContainer>
                    <FormSubmitButton>
                        {isNew ? t("Insert") : t("Save")}
                    </FormSubmitButton>
                    <FormResetButton>
                        {isNew ? t("Reset") : t("Undo")}
                    </FormResetButton>
                </FormButtonsContainer>
                <FormError />
            </Form>
        );
    }
}

export default withI18n()(CalendarEventForm);
