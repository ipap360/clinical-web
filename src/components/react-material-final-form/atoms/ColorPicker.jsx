import React from "react";
import {
    FormControl,
    FormGroup,
    FormLabel,
    FormHelperText,
    withStyles
} from "@material-ui/core";

import ColorPickerAdapter from "./ColorPickerAdapter";

const styles = theme => ({
    root: {
        alignItems: "center"
    },
    inline: {
        marginRight: theme.spacing.unit * 3
    },
    helperText: {
        marginTop: -8
    }
});

class ColorPicker extends React.Component {
    render() {
        const {
            classes,
            className,
            error,
            fullWidth,
            FormHelperTextProps,
            helperText,
            id,
            InputLabelProps,
            InputProps,
            label,
            name,
            onBlur,
            onChange,
            onFocus,
            placeholder,
            required,
            disabled,
            value,
            disableAlpha,
            presetColors,
            ...other
        } = this.props;

        const helperTextId = helperText && id ? `${id}-helper-text` : undefined;

        return (
            <FormControl
                aria-describedby={helperTextId}
                className={className}
                error={error}
                fullWidth={fullWidth}
                required={required}
                disabled={disabled}
                {...other}
            >
                <FormGroup className={classes.root} row>
                    {label && (
                        <FormLabel
                            htmlFor={id}
                            ref={this.labelRef}
                            className={classes.inline}
                            {...InputLabelProps}
                        >
                            {label}
                        </FormLabel>
                    )}
                    <ColorPickerAdapter
                        name={name}
                        onChange={onChange}
                        value={value}
                        disableAlpha={disableAlpha}
                        presetColors={presetColors}
                    />
                </FormGroup>
                {helperText && (
                    <FormHelperText
                        id={helperTextId}
                        className={classes.helperText}
                        {...FormHelperTextProps}
                    >
                        {helperText}
                    </FormHelperText>
                )}
            </FormControl>
        );
    }
}

export default withStyles(styles)(ColorPicker);
