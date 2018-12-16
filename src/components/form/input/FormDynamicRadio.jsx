import React from "react";
import { FormSpy } from "react-final-form";
import { Input } from "@material-ui/core";
import FormSimpleRadio from "./FormSimpleRadio";

class FormDynamicRadio extends React.Component {
    constructor(props) {
        super(props);
        const { formValue, initialValue, otherValues } = this.props;
        this.state = {
            value:
                formValue != null && otherValues.indexOf(formValue) < 0
                    ? formValue
                    : initialValue,
            isNumber: typeof initialValue === "number"
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        // this.parseValue = this.parseValue.bind(this);
    }

    parseValue(value) {
        // console.log(value);
        const { isNumber } = this.state;
        const { initialValue, otherValues } = this.props;
        if (isNumber) {
            if (value === null || value === "") {
                return initialValue;
            }
            const v = parseInt(value, 10);
            return otherValues.indexOf(v) >= 0 ? initialValue : v;
        }
        return value || "";
    }

    handleInputChange(evt) {
        const { isNumber } = this.state;
        const { name, form, otherValues } = this.props;
        this.setState(
            {
                value: this.parseValue(evt.target.value)
            },
            () => {
                form.change(name, this.state.value);
            }
        );
    }

    render() {
        const {
            disabled,
            formValue,
            initialValue,
            otherValues,
            InputProps,
            ...props
        } = this.props;
        const { value, isNumber } = this.state;
        const isInputDisabled = value !== formValue || disabled;
        return (
            <FormSimpleRadio
                {...props}
                value={value}
                label={
                    <Input
                        type={isNumber ? "number" : "text"}
                        {...InputProps}
                        disabled={isInputDisabled}
                        value={value}
                        onChange={this.handleInputChange}
                    />
                }
            />
        );
    }
}

export default ({ name, ...props }) => (
    <FormSpy subscription={{ values: true }}>
        {({ values, form }) => (
            <FormDynamicRadio
                {...props}
                name={name}
                formValue={values[name]}
                form={form}
            />
        )}
    </FormSpy>
);
