import React from "react";
import { FormSpy } from "react-final-form";
import { FormHelperText } from "@material-ui/core";

export default props => (
    <FormSpy
        subscription={{ submitting: true, error: true, submitError: true }}
    >
        {({ submitting, error, submitError }) => {
            return (
                <FormHelperText error={true} {...props}>
                    {!submitting && (error || submitError)}
                </FormHelperText>
            );
        }}
    </FormSpy>
);
