import React from "react";
import { FormSpy } from "react-final-form";

class FormStateToRedux extends React.Component {
    componentWillUnmount() {
        const { form, updateFormState } = this.props;
        updateFormState(form, {});
    }
    render() {
        const { form, updateFormState } = this.props;
        return <FormSpy onChange={state => updateFormState(form, state)} />;
    }
}

export default FormStateToRedux;
