import React from 'react';
import { Field } from 'redux-form';
import { DatePicker } from '../atoms';

// import createComponent from 'redux-form-material-ui/lib/createComponent';
// import mapError from 'redux-form-material-ui/lib/mapError';

// console.log(DatePicker);

const DateField = ({ input: { name, onBlur, onChange, value }, label, meta, ...other }) => {
    return (
        <DatePicker
            label={label}
            value={value || null}
            // onBlur={(...props) => {console.log(props)}}
            onChange={(date) => {
                // console.log(date);
                onChange(date);
            }}
        />
    )
}

// const DateField = createComponent(DatePicker, ({
//     defaultValue,
//     ...props
// }) => ({
//     ...mapError(props)
// }));

// console.log(DateField);

export default ({ name, ...props }) => {
    // console.log(name);
    // console.log(props);
    return (
        <Field name={name} component={DateField} {...props} />
    );
}
