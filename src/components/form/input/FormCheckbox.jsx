import React from "react";
import { Field } from "react-final-form";
import { Checkbox } from "../../atoms";
import withAdapter from "./adapter";

const CheckboxAdapter = withAdapter(Checkbox);

export default ({ name, ...props }) => {
    return (
        <Field
            name={name}
            component={CheckboxAdapter}
            {...props}
            type="checkbox"
        />
    );
};
