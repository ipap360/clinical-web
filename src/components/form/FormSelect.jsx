import React from 'react';
import { Field } from 'redux-form';
import { Select } from 'redux-form-material-ui';

export default ({ name, ...props }) => (
    <Field name={name} component={Select} {...props} />
);
