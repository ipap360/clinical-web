import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import {
    Form,
    FormRow,
    FormSubmitButton,
    FormResetButton,
    FormRadioGroup,
    FormButtonsContainer,
    FormRadio,
    FormError,
    FormSelect,
    FormAreaField,
    FormDateField,
    FormHelperText,
    FormLabel,
} from '../../../components';
import Typography from '../../../components/atoms/Typography';

class CopyEventForm extends React.Component {

    componentWillMount() {

        const { id, fetchAvailability, loadCalendarEvent } = this.props;

        fetchAvailability({
            from: moment().format("YYYY-MM-DD"),
            to: moment().add(2, 'M').format("YYYY-MM-DD")
        });

    }

    render() {

        const {
            t,
            handleSubmit,
            className,
            person,
            description,
            availability,
            gender = "m",
            ...other
        } = this.props;

        const renderDay = (day, selectedDate, dayInCurrentMonth, dayComponent) => {
            // moment object
            const date = day.format("YYYY-MM-DD");
            // console.log(date);
            const i = availability[date] || { m: "", f: "" };
            // console.log(i);
            return (<div className={classNames('day-indicator', i[gender].toLowerCase())}>{dayComponent}</div>);
        }

        return (
            <Form onSubmit={handleSubmit} className={className}>
                {/* <FormRow>
                    <div>
                        <FormLabel>{t("Patient")}</FormLabel>
                        <Typography>{person}</Typography>
                    </div>
                </FormRow> */}
                <FormRow>
                    <FormDateField
                        name="date"
                        label={t("Date")}
                        renderDay={renderDay}
                    // disabled={!hasPerson}
                    />
                </FormRow>
                {/* <FormRow>
                    <FormRadioGroup name="duration" fullWidth label={t("Night stay")}>
                        <FormRadio value="0" label={t("None")} />
                        <FormRadio value="1" label={t("One")} />
                        <FormRadio value="2" label={t("Two")} />
                        <FormRadio value="3" label={t("Three")} />
                    </FormRadioGroup>
                </FormRow> */}
                <FormRow>
                    <FormAreaField
                        name='description'
                        inputProps={{ maxLength: "255" }}
                        label={t("Notes")}
                        placeholder={description}
                        fullWidth
                    />
                </FormRow>
                {/* <FormRow>
                    <FormHelperText>{t("Default")}: {description}</FormHelperText>
                </FormRow> */}
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