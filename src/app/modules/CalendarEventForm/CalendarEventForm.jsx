import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

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
    FormDateField,
} from '../../../components';

class CalendarEventForm extends React.Component {

    componentWillMount() {

        const { id, fetchAvailability, loadCalendarEvent } = this.props;

        const isNew = (id === 'new' || id == '0');

        if (!isNew) {
            loadCalendarEvent(id);
        }

        fetchAvailability({
            from: moment().format("YYYY-MM-DD"),
            to: moment().add(2, 'M').format("YYYY-MM-DD")
        });

    }

    componentDidUpdate(prevProps) {
        const { submitSucceeded, onSuccess } = this.props;
        if (submitSucceeded !== prevProps.submitSucceeded) {
            if (typeof onSuccess === 'function') {
                onSuccess.apply(this);
            }
        }
        // console.log(prevProps);
        // console.log(this.props);
        // // Typical usage (don't forget to compare props):
        // if (this.props.userID !== prevProps.userID) {
        //     this.fetchData(this.props.userID);
        // }
    }

    componentWillUnmount() {
        this.props.clearCalendarEvent();
    }

    render() {

        const {
            t,
            handleSubmit,
            className,
            id,
            fetchPersons,
            availability,
            hasPerson,
            gender = "m",
            ...other
        } = this.props;

        const isNew = (id === 'new' || id == '0');

        // console.log("gender " + gender);

        const renderDay = (day, selectedDate, dayInCurrentMonth, dayComponent) => {
            // moment object
            const date = day.format("YYYY-MM-DD");
            // console.log(date);
            const i = availability[date] || { m: "", f: "" };
            // console.log(i);
            return (<div className={classNames('day-indicator', i[gender].toLowerCase())}>{dayComponent}</div>);
        }

        return (
            <Form onSubmit={handleSubmit} className={className}>
                <FormRow>
                    <FormSelect
                        name="person"
                        loadOptions={fetchPersons}
                        label={t("Patient")}
                        fullWidth
                        isDisabled={!isNew}
                    />
                </FormRow>
                <FormRow>
                    <FormDateField
                        name="date"
                        label={t("Date")}
                        renderDay={renderDay}
                        disabled={!hasPerson}
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
                        name='description'
                        inputProps={{ maxLength: "255" }}
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