import React from "react";
import warning from "warning";
import PropTypes from "prop-types";

import {
    FormControl,
    FormGroup,
    FormLabel,
    FormHelperText,
    RadioGroup,
    withStyles
} from "@material-ui/core";

const styles = theme => ({
    root: {
        alignItems: "center"
    },
    // mini: {
    //     marginTop: 8
    // },
    inline: {
        marginRight: theme.spacing.unit * 3
    },
    formHelper: {
        marginTop: -8
    }
});

class RadioField extends React.Component {
    constructor(props) {
        super(props);
        this.labelRef = React.createRef();
    }

    componentDidMount() {}

    render() {
        const {
            classes,
            children,
            className,
            error,
            fullWidth,
            FormHelperTextProps,
            helperText,
            id,
            InputLabelProps,
            RadioGroupProps,
            label,
            name,
            onBlur,
            onChange,
            onFocus,
            placeholder,
            required,
            value,
            valueType = "string",
            ...other
        } = this.props;

        const handleChange = (evt, value) => {
            onChange.apply(this, [parseValue(value)]);
        };

        const parseValue = value => {
            if (value === null) return value;
            if (valueType === "integer") return parseInt(value, 10);
            return value;
        };

        const formatValue = originalValue => {
            return originalValue === null ? originalValue : `${originalValue}`;
        };

        warning(
            Boolean(children),
            "Material-UI: `children` must be passed when using the `RadioGroup` component."
        );

        const helperTextId = helperText && id ? `${id}-helper-text` : undefined;

        return (
            <FormControl
                aria-describedby={helperTextId}
                className={className}
                error={error}
                fullWidth={fullWidth}
                required={required}
                // variant={variant}
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
                    <RadioGroup
                        id={id}
                        name={name}
                        value={formatValue(value)}
                        onChange={handleChange}
                        row
                        {...RadioGroupProps}
                    >
                        {children}
                    </RadioGroup>
                </FormGroup>
                {helperText && (
                    <FormHelperText
                        id={helperTextId}
                        className={classes.formHelper}
                        {...FormHelperTextProps}
                    >
                        {helperText}
                    </FormHelperText>
                )}
            </FormControl>
        );
    }
}

RadioField.propTypes = {
    /**
     * @ignore
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * If `true`, the input will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If `true`, the label will be displayed in an error state.
     */
    error: PropTypes.bool,
    /**
     * Properties applied to the [`FormHelperText`](/api/form-helper-text/) element.
     */
    FormHelperTextProps: PropTypes.object,
    /**
     * If `true`, the input will take up the full width of its container.
     */
    fullWidth: PropTypes.bool,
    /**
     * The helper text content.
     */
    helperText: PropTypes.node,
    /**
     * The id of the `input` element.
     * Use that property to make `label` and `helperText` accessible for screen readers.
     */
    id: PropTypes.string,
    /**
     * Properties applied to the [`InputLabel`](/api/input-label/) element.
     */
    InputLabelProps: PropTypes.object,
    /**
     * Properties applied to the `Input` element.
     */
    RadioGroupProps: PropTypes.object,
    /**
     * The label content.
     */
    label: PropTypes.node,
    /**
     * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
     */
    margin: PropTypes.oneOf(["none", "dense", "normal"]),
    /**
     * Name attribute of the `input` element.
     */
    name: PropTypes.string,
    /**
     * @ignore
     */
    onBlur: PropTypes.func,
    /**
     * Callback fired when the value is changed.
     *
     * @param {object} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value`.
     */
    onChange: PropTypes.func,
    /**
     * @ignore
     */
    onFocus: PropTypes.func,
    /**
     * If `true`, the label is displayed as required and the input will be required.
     */
    required: PropTypes.bool,
    /**
     * The value of the `Input` element, required for a controlled component.
     */
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ])
};

RadioField.defaultProps = {
    required: false
};

export default withStyles(styles)(RadioField);
