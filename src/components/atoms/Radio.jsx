import React from "react";
import { FormControlLabel, Radio } from "@material-ui/core";

class RadioField extends React.Component {
    render() {
        const {
            name,
            value,
            label,
            onChange,
            checked,
            LabelProps,
            helperText,
            error,
            ...props
        } = this.props;

        const isNumber = typeof value === "number";

        const parseValue = value => (isNumber ? parseInt(value, 10) : value);

        const handleChange = evt => {
            onChange(parseValue(value));
        };

        const formatValue = originalValue =>
            originalValue === null ? originalValue : `${originalValue}`;

        return (
            <FormControlLabel
                value={formatValue(value)}
                control={
                    <Radio
                        value={formatValue(value)}
                        name={name}
                        onChange={handleChange}
                        checked={!!checked}
                        color="primary"
                        {...props}
                    />
                }
                label={label}
                {...LabelProps}
            />
        );
    }
}

export default RadioField;
