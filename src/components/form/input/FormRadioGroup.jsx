import React from "react";
import { Field } from "react-final-form";
import { RadioGroup } from "../../atoms";
import withAdapter from "./adapter";

const RadioGroupAdapter = withAdapter(RadioGroup);

const FormRadioGroup = ({ name, ...props }) => (
    <Field name={name} component={RadioGroupAdapter} {...props} />
);

export default FormRadioGroup;
