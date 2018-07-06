import React from 'react';
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui';

export default ({ name, ...props }) => (
    <Field name={name} component={TextField} multiline={true} {...props} />
);