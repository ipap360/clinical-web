import React from "react";
import { thresholds } from "../../api";
import { consume } from "../../context";

import {
    Form,
    FormRow,
    FormText,
    FormColorPicker,
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
                    required
                />
            </FormRow>
            <FormRow>
                <FormColorPicker
                    name="indicator"
                    label={t("Color")}
                    required
                    disableAlpha={true}
                    presetColors={[
                        "#F44336",
                        "#E91E63",
                        "#9C27B0",
                        "#673AB7",
                        "#3F51B5",
                        "#2196F3",
                        "#FFEB3B",
                        "#FFC107",
                        "#FF9800",
                        "#FF5722",
                        "#4CAF50",
                        "#607D8B"
                    ]}
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
