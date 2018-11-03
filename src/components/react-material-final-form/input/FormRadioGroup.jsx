import React from "react";
import { Field } from "react-final-form";
import { RadioGroup } from "../atoms";
import withAdapter from "./adapter";

const RadioGroupAdapter = withAdapter(RadioGroup);

export default ({ name, ...props }) => (
    <Field name={name} component={RadioGroupAdapter} {...props} />
);
