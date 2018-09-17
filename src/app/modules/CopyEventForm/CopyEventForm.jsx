import React from 'react';

import {
    Form,
    FormRow,
    FormSubmitButton,
    FormResetButton,
    FormButtonsContainer,
    FormError,
    FormAreaField,
} from '../../../components';

import DatePickerWithAvailability from '../DatePickerWithAvailability';

class CopyEventForm extends React.Component {

    componentWillMount() {

    }

    render() {

        const {
            t,
            handleSubmit,
            className,
            description,
            gender = "",
        } = this.props;

        return (
            <Form onSubmit={handleSubmit} className={className}>
                <FormRow>
                    <DatePickerWithAvailability
                        name="date"
                        label={t("Date")}
                        gender={gender}
                    />
                </FormRow>
                <FormRow>
                    <FormAreaField
                        name='description'
                        inputProps={{ maxLength: "255" }}
                        label={t("Notes")}
                        placeholder={description}
                        fullWidth
                    />
                </FormRow>
                <FormButtonsContainer>
                    <FormSubmitButton>
                        {t("Insert")}
                    </FormSubmitButton>
                    <FormResetButton>
                        {t("Reset")}
                    </FormResetButton>
                </FormButtonsContainer>
                <FormError />
            </Form>
        );
    }

}

export default CopyEventForm; 