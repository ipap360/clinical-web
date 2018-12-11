import React from "react";
import { Field } from "react-final-form";
import { ColorPicker } from "../../atoms";
import withAdapter from "./adapter";

const ColorPickerAdapter = withAdapter(ColorPicker);

export default ({ name, ...props }) => {
    return <Field name={name} component={ColorPickerAdapter} {...props} />;
};
