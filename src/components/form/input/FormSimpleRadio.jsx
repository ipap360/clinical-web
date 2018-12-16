import React from "react";
import { Field } from "react-final-form";
import { Radio } from "../../atoms";
import withAdapter from "./adapter";

const RadioAdapter = withAdapter(Radio);

const FormSimpleRadio = ({ name, ...props }) => (
    <Field name={name} component={RadioAdapter} {...props} type="radio" />
);

export default FormSimpleRadio;
