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

        const { id, fetchAvailability, loadCalendarEvent, fetchPersons } = this.props;

        const isNew = (id === 'new' || id == '0');

        if (!isNew) {
            loadCalendarEvent(id);
        }

        fetchAvailability({
            from: moment().format("YYYY-MM-DD"),
            to: moment().add(2, 'M').format("YYYY-MM-DD")
        });

        fetchPersons();

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
            selectedPerson,
            persons,
            // gender = "m",
            ...other
        } = this.props;

        const isNew = (id === 'new' || id == '0');

        const personIds = persons.map(p => p.id);
        const i = (selectedPerson) ? personIds.indexOf(JSON.parse(selectedPerson).value) : -1;
        // console.log(i);
        let gender = (i >= 0 && persons[i].gender) ? persons[i].gender.toLowerCase()[0] : "";
       
        const options = persons.map(p => ({
            value: p.id,
            label: p.name
        }));

        const renderDay = (day, selectedDate, dayInCurrentMonth, dayComponent) => {
            const date = day.format("YYYY-MM-DD");
            const indicator = availability[date] || { m: "", f: "" };
            const gi = indicator[gender] || "";
            return (<div className={classNames('day-indicator', {
                [gi.toLowerCase()] : !!gi
            })}>{dayComponent}</div>);
        }

        return (
            <Form onSubmit={handleSubmit} className={className}>
                <FormRow>
                    <FormSelect
                        name="person"
                        options={options}
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
                        disabled={!selectedPerson}
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