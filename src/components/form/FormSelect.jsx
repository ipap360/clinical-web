import React from 'react';
import { Field } from 'redux-form';
import createComponent from 'redux-form-material-ui/lib/createComponent';
import mapError from 'redux-form-material-ui/lib/mapError';

import { Select3 } from "../atoms";

const SelectField = createComponent(Select3, ({
    defaultValue,
    ...props
}) => ({
    ...mapError(props)
}));

export default ({ name, ...props }) => {
    return (
        <Field name={name} component={SelectField} {...props} />
    )
};

// https://stackoverflow.com/questions/43072867/use-async-react-select-with-redux-saga
// https://codesandbox.io/s/7k82j5j1qx
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/demos/autocomplete/IntegrationReactSelect.js
// https://deploy-preview-2289--react-select.netlify.com/props#api
// https://stackoverflow.com/questions/50640858/react-select-does-not-clear-value-when-redux-form-is-reset