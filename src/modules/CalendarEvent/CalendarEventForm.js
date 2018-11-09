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

import { withI18n, withStore, compose } from "../../context";
import { calendarEvents } from "../../api";

import DatePickerWithAvailability from "../DatePickerWithAvailability";
import { fetchPatients, getPatients, getGenderInitial } from "../PatientsList";

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
            t = s => s,
            className,
            id,
            patients,
            getGender,
            onSaveSuccess,
            children,
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
                <FormRow>
                    <FormSelect
                        name="patient"
                        options={patients}
                        label={t("Patient")}
                        fullWidth
                        required
                        disabled={!isNew}
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
                {children}
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

// export default withI18n()(
//     withStore(s2p, d2p, null, { withRef: true })()
// );
// export default withStore(s2p, d2p, null, { withRef: true })(CalendarEventForm);

export default compose(
    withStore(s2p, d2p, null, { withRef: true }),
    withI18n()
)(CalendarEventForm);
