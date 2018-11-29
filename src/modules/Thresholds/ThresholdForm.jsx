import React from "react";
import { thresholds } from "../../api";
import { consume } from "../../context";

import {
    Form,
    FormRow,
    FormText,
    FormSubmitButton,
    FormResetButton,
    FormButtonsContainer,
    FormError
} from "../../components";

const ThresholdForm = ({ t, children, id = 0, className, onSaveSuccess }) => {
    const isNew = id === 0;
    return (
        <Form
            id={id}
            load={thresholds.view}
            save={thresholds.save}
            className={className}
            onSaveSuccess={onSaveSuccess}
            formProps={{ noValidate: "novalidate" }}
        >
            <FormRow>
                <FormText
                    name="description"
                    inputProps={{ maxLength: "255" }}
                    label={t("Description")}
                    fullWidth
                    required
                />
            </FormRow>
            <FormRow>
                <FormText
                    type="number"
                    name="threshold"
                    label={t("Threshold")}
                    fullWidth
                    required
                />
            </FormRow>
            <FormRow>
                <FormText
                    type="number"
                    name="indicator"
                    label={t("Indicator")}
                    fullWidth
                    required
                />
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
};

export default consume()(ThresholdForm);
