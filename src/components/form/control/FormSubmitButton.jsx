import React from "react";
import { AsyncButton } from "../../atoms";
import { FormSpy } from "react-final-form";

export default props => (
    <FormSpy subscription={{ submitting: true, pristine: true }}>
        {({ submitting }) => (
            <AsyncButton
                {...props}
                loading={submitting}
                disabled={props.disabled || submitting}
                variant="contained"
                color="primary"
                type="submit"
            />
        )}
    </FormSpy>
);
