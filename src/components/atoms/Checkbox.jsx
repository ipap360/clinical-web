import React from "react";
import {
    FormControl,
    FormGroup,
    FormLabel,
    FormHelperText,
    Checkbox,
    withStyles
} from "@material-ui/core";

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

class CheckboxField extends React.Component {
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
            checked,
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
                    <Checkbox
                        name={name}
                        onChange={onChange}
                        checked={checked}
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

export default withStyles(styles)(CheckboxField);
