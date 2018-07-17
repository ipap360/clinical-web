import React from 'react';

import {
    Form,
    FormRow,
    FormTextField,
    FormSubmitButton,
    FormResetButton,
    FormRadioGroup,
    FormButtonsContainer,
    FormRadio,
    FormError,
    FormSelect,
} from '../../../components';

import { withStyles } from '@material-ui/core';


const style = theme => ({
    root: {
        width: 450,
        marginLeft: theme.spacing.unit + 2,
        padding: theme.spacing.unit * 2,
        borderLeft: `4px solid ${theme.palette.primary.main}`
    }
})

const PersonForm = ({ classes, t, handleSubmit, birthYears, ...props }) => (
    <Form onSubmit={handleSubmit} className={classes.root}>
        <FormRow>
            <FormTextField
                name='name'
                inputProps={{ maxLength: "255" }}
                label={t("Name")}
                fullWidth
            />
        </FormRow>
        <FormRow>
            <FormRadioGroup name="gender" fullWidth label={t("Gender")}>
                <FormRadio value="MALE" label={t("Male")} />
                <FormRadio value="FEMALE" label={t("Female")} />
                <FormRadio value="UNKNOWN" label={t("Other")} />
            </FormRadioGroup>
        </FormRow>
        <FormRow>
            <FormSelect action={birthYears} label={t("Year of birth")}>

            </FormSelect>
        </FormRow>
        <FormButtonsContainer>
            <FormSubmitButton>{t("Insert")}</FormSubmitButton>
            <FormResetButton>{t("Reset")}</FormResetButton>
        </FormButtonsContainer>
        <FormError />
    </Form>
);

export default withStyles(style)(PersonForm); 