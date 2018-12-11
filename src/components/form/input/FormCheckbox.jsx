import React from "react";
import { Field } from "react-final-form";
import { Checkbox } from "../../atoms";
import withAdapter from "./adapter";

// const CheckboxAdapter = ({
//     input: { checked, name, onChange, ...restInput },
//     meta,
//     ...rest
// }) => {
//     return (
//         <Checkbox
//             {...rest}
//             name={name}
//             InputProps={restInput}
//             onChange={onChange}
//             checked={!!checked}
//         />
//     );
// };

const CheckboxAdapter = withAdapter(Checkbox);

export default ({ name, ...props }) => {
    return (
        <Field
            name={name}
            component={CheckboxAdapter}
            {...props}
            type="checkbox"
        />
    );
};
