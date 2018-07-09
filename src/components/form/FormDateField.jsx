import React from 'react';
import { Field } from 'redux-form';
import DatePicker from 'material-ui-pickers/DatePicker';
import createComponent from 'redux-form-material-ui/lib/createComponent';
import mapError from 'redux-form-material-ui/lib/mapError';

const DateField = createComponent(DatePicker, ({
    defaultValue,
    ...props
}) => ({
    ...mapError(props)
}));

export default ({ name, ...props }) => (
    <Field name={name} component={DateField} {...props} />
);
