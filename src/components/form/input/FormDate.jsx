import React from "react";
import { Field } from "react-final-form";
import { DatePicker } from "../../atoms";
import withAdapter from "./adapter";

const DatePickerAdapter = withAdapter(DatePicker);

export default ({ name, ...props }) => (
    <Field
        name={name}
        component={DatePickerAdapter}
        {...props}
        parse={value => {
            return value ? value.format("YYYY-MM-DD") : null;
        }}
        format={value => {
            return value;
        }}
    />
);
