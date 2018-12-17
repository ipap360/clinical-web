import React from "react";
import BaseField from "./BaseField";
import { Checkbox } from "@material-ui/core";

export default ({ name, onChange, checked, ...other }) => (
    <BaseField {...other}>
        <Checkbox name={name} onChange={onChange} checked={checked} />
    </BaseField>
);
