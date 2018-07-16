import React from 'react';
import { Field } from 'redux-form';
import { RadioGroup } from 'redux-form-material-ui';
import { InputLabel, FormControl, FormHelperText, withStyles, FormLabel } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        alignItems: 'center'
    },
    withShrunkLabel: {
        marginTop: 8,
    },
    withInlineLabel: {
        
    },
    inlineLabel: {
        marginRight: theme.spacing.unit * 3,
    }
})

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

        const fieldClassName = classNames(
            classes.root,
            {
                [classes.withShrunkLabel]: label && shrink,
                [classes.withInlineLabel]: label && !shrink,
                // [classes.inline]: label && !shrink     
            }
        )

        return (
            <FormControl
                aria-describedby={helperTextId}
                className={className}
                error={error}
                fullWidth={fullWidth}
                required={required}
                {...other}
            >
                {shrink && label && (
                    <InputLabel htmlFor={id} {...InputLabelProps} shrink>
                        {label}
                    </InputLabel>
                )}
                <Field 
                    className={fieldClassName} 
                    id={id} 
                    name={name} 
                    value={value} 
                    component={RadioGroup} 
                    {...RadioGroupProps}
                >
                    {/* {!shrink && label && (
                        <FormLabel className={classes.inlineLabel}>
                            {label}
                        </FormLabel>
                    )} */}
                    {children}
                </Field>
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