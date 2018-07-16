import React from 'react';
import { Field } from 'redux-form';
import { RadioGroup } from 'redux-form-material-ui';
import { InputLabel, FormControl, FormHelperText, withStyles, FormLabel, FormGroup } from '@material-ui/core';
// import classNames from 'classnames';

const styles = theme => ({
    root: {
        alignItems: 'center'
    },
    mini: {
        marginTop: 8,
    },
    inline: {
        marginRight: theme.spacing.unit * 3,
    },
})

const FormRadioLabel = withStyles(styles)(({ classes, label, variant, id, children, ...props }) => {

    if (!label) return children;

    switch (variant) {
        case "mini":
            return (
                <React.Fragment>
                    <InputLabel htmlFor={id} {...props} shrink>
                        {label}
                    </InputLabel>
                    <div className={classes.mini}>
                        {children}
                    </div>
                </React.Fragment>
            );
        default:
            return (
                <FormGroup className={classes.root} row>
                    <FormLabel className={classes.inline}>
                        {label}
                    </FormLabel>
                    {children}
                </FormGroup>
            )
    }
});

class FormRadioGroup extends React.Component {

    render() {
        const {
            classes,
            children,
            className,
            fullWidth,
            error,
            FormHelperTextProps,
            helperText,
            id,
            shrink,
            InputLabelProps,
            RadioGroupProps = { row: true },
            label,
            name,
            required,
            value,
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
                {...other}
            >
                <FormRadioLabel label={label} id={id} {...InputLabelProps}>
                    <Field
                        id={id}
                        name={name}
                        value={value}
                        component={RadioGroup}
                        {...RadioGroupProps}
                    >
                        {children}
                    </Field>
                </FormRadioLabel>
                {helperText && (
                    <FormHelperText id={helperTextId} {...FormHelperTextProps}>
                        {helperText}
                    </FormHelperText>
                )}
            </FormControl>
        );
    }
}

export default withStyles(styles)(FormRadioGroup);