import React from "react";
import { FormSpy } from "react-final-form";
import { Field } from "react-final-form";

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

import { consume } from "../../context";
import { calendarEvents } from "../../api";

import DatePickerWithAvailability from "../DatePickerWithAvailability";
import { fetchPatients, getPatients, getGenderInitial } from "../PatientsList";

const FieldValues = ({ names = [], children, values = {} }) => {
    const [name, ...rest] = names;
    return name ? (
        <Field name={name}>
            {({ input: { value } }) => {
                return (
                    <FieldValues
                        names={rest}
                        children={children}
                        values={{ [name]: value, ...values }}
                    />
                );
            }}
        </Field>
    ) : (
        children(values)
    );
};

class CalendarEventForm extends React.Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
    }

    componentDidMount() {
        const { fetchPatients } = this.props;
        fetchPatients();
    }

    render() {
        const {
            t,
            className,
            id,
            patients,
            getGender,
            onSaveSuccess,
            children,
            disabled,
            ...props
        } = this.props;

        const isNew = id === 0;

        return (
            <Form
                id={id}
                save={calendarEvents.save}
                load={calendarEvents.view}
                className={className}
                onSaveSuccess={onSaveSuccess}
                formProps={{ noValidate: "novalidate" }}
                ref={this.form}
                {...props}
            >
                {/* <FieldValues names={["isPostponed", "isCopied"]}>
                    {({ isPostponed, isCopied }) => {
                        return (
                            <React.Fragment> */}
                <FormRow>
                    <FormSelect
                        name="patient"
                        options={patients}
                        label={t("Patient")}
                        fullWidth
                        required
                        disabled={!isNew || disabled}
                    />
                </FormRow>
                <FormSpy subscription={{ values: true }}>
                    {({ values }) => {
                        return (
                            <FormRow>
                                <DatePickerWithAvailability
                                    name="date"
                                    label={t("Date")}
                                    gender={getGender(values.patient)}
                                    required
                                    disabled={disabled}
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
                        valueType="integer"
                        disabled={disabled}
                    >
                        <FormRadio value="0" label={t("None")} />
                        <FormRadio value="1" label={t("One")} />
                        <FormRadio value="2" label={t("Two")} />
                        <FormRadio value="3" label={t("Three")} />
                    </FormRadioGroup>
                </FormRow>
                <FormRow>
                    <FormArea
                        name="notes"
                        label={t("Notes")}
                        fullWidth
                        disabled={disabled}
                    />
                </FormRow>
                <FormButtonsContainer>
                    <FormSubmitButton disabled={disabled}>
                        {isNew ? t("Insert") : t("Save")}
                    </FormSubmitButton>
                    <FormResetButton disabled={disabled}>
                        {isNew ? t("Reset") : t("Undo")}
                    </FormResetButton>
                </FormButtonsContainer>
                <FormError />
                {children}
                {/* </React.Fragment>
                        );
                    }}
                </FieldValues> */}
            </Form>
        );
    }
}

const s2p = state => ({
    // title: getCalendarEventTitle(state),
    patients: getPatients(state).map(p => ({
        value: p.id,
        label: [p.name, p.code, p.notes].join(" ")
    })),
    getGender: id => getGenderInitial(state, id)
});

const d2p = {
    fetchPatients
};

const store = { s2p, d2p };
export default consume({ store, ref: true })(CalendarEventForm);
