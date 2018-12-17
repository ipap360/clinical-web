import React from "react";
import { Field } from "react-final-form";
import { BaseField } from "../../atoms";
import withAdapter from "./adapter";

const BaseFieldAdapter = withAdapter(BaseField);

export default ({ name, ...props }) => {
    return (
        <Field
            name={name}
            subscription={{
                touched: true,
                error: true,
                submitError: true,
                dirtySinceLastSubmit: true
            }}
        >
            {({ meta }) => <BaseFieldAdapter meta={meta} {...props} />}
        </Field>
    );
};
