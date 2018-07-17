import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
// import { Field } from 'redux-form';
// import { Select } from 'redux-form-material-ui';

// export default ({ name, ...props }) => (
//     <Field name={name} component={Select} {...props} />
// );

export default ({name, action, ...props}) => {
    // console.log(getList);
    return (
        <AsyncSelect defaultOptions={true} loadOptions={(value) => new Promise((resolve, reject) => {
            action(value, { resolve, reject });
        })}>

        </AsyncSelect>
    )
}


// https://stackoverflow.com/questions/43072867/use-async-react-select-with-redux-saga
// https://codesandbox.io/s/7k82j5j1qx
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/demos/autocomplete/IntegrationReactSelect.js
// https://deploy-preview-2289--react-select.netlify.com/props#api