import React from "react";
import {
    FormControl,
    FormGroup,
    FormLabel,
    FormHelperText,
    withStyles,
} from "@material-ui/core";

const styles = theme => ({
    root: {
        alignItems: "center",
    },
    inline: {
        marginRight: theme.spacing.unit * 3,
    },
    helperText: {
        marginTop: -8,
    },
});

class BaseField extends React.Component {
    render() {
        const {
            children,
            classes,
            className,
            error,
            fullWidth,
            FormHelperTextProps,
            helperText,
            id,
            LabelProps,
            label,
            required,
            disabled,
            ...other
        } = this.props;

        const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
        const labelId = label && id ? `${id}-label` : undefined;

        return (
            <FormControl
                aria-labelledby={labelId}
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
                            id={labelId}
                            htmlFor={id}
                            ref={this.labelRef}
                            className={classes.inline}
                            {...LabelProps}
                        >
                            {label}
                        </FormLabel>
                    )}
                    {children}
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

export default withStyles(styles)(BaseField);
