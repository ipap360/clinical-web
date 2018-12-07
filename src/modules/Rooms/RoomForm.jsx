import React from "react";
import { rooms } from "../../api";
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

const RoomForm = ({ t, children, id = 0, className, onSaveSuccess }) => {
    const isNew = id === 0;
    return (
        <Form
            id={id}
            load={rooms.view}
            save={rooms.save}
            className={className}
            onSaveSuccess={onSaveSuccess}
            formProps={{ noValidate: "novalidate" }}
        >
            <FormRow>
                <FormText
                    name="name"
                    inputProps={{ maxLength: "255" }}
                    label={t("Name")}
                    fullWidth
                    required
                />
            </FormRow>
            <FormRow>
                <FormText
                    type="number"
                    name="capacity"
                    label={t("Capacity")}
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

export default consume()(RoomForm);
