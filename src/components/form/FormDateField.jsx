import React from 'react';
import { Field } from 'redux-form';
import { DatePicker } from '../atoms';

// import createComponent from 'redux-form-material-ui/lib/createComponent';
// import mapError from 'redux-form-material-ui/lib/mapError';

// console.log(DatePicker);

const DateField = ({ input: { name, onBlur, onChange, value }, label, meta, renderDay, disabled, ...other }) => {
    return (
        <DatePicker
            label={label}
            value={value || null}
            // onBlur={(...props) => {console.log(props)}}
            onChange={(date) => {
                const v = (date) ? date.format("YYYY-MM-DD") : null;
                onChange(v);
            }}
            renderDay={renderDay}
            // disabled={disabled}
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
