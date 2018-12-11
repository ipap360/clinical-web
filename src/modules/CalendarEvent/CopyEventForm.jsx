import React from "react";

import {
    Form,
    FormRow,
    FormSubmitButton,
    FormResetButton,
    FormButtonsContainer,
    FormError,
    FormArea
} from "../../components";
import { consume } from "../../context";

import { getFormValue } from "../FormStateToRedux";
import { getGenderInitial } from "../PatientsList";
import DatePickerWithAvailability from "../DatePickerWithAvailability";

class CopyEventForm extends React.Component {
    render() {
        const { t, save, className, gender, onSaveSuccess } = this.props;
        return (
            <Form
                save={save}
                className={className}
                onSaveSuccess={onSaveSuccess}
            >
                <FormRow>
                    <DatePickerWithAvailability
                        name="date"
                        label={t("Date")}
                        gender={gender}
                    />
                </FormRow>
                <FormRow>
                    <FormArea
                        name="notes"
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
}

const s2p = (state, { mainForm }) => ({
    gender: getGenderInitial(state, getFormValue(state, mainForm, "patient"))
});

export default consume({ store: { s2p } })(CopyEventForm);
