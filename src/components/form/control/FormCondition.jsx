import React from "react";
import { Field } from "react-final-form";

const FormCondition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
        {({ input: { value } }) => (is(value) ? children : null)}
    </Field>
);

export default FormCondition;
