import React from "react";
import BaseField from "./BaseField";
import ColorPickerAdapter from "./ColorPickerAdapter";

export default ({
    name,
    onChange,
    value,
    disableAlpha,
    presetColors,
    ...other
}) => (
    <BaseField {...other}>
        <ColorPickerAdapter
            name={name}
            onChange={onChange}
            value={value}
            disableAlpha={disableAlpha}
            presetColors={presetColors}
        />
    </BaseField>
);
