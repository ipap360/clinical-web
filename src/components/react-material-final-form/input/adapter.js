import React from "react";

// ραδιο
// {...rest}
// name={name}
// InputProps={restInput}
// onChange={onChange}
// checked={!!checked}
// value={value}

// const DatePickerAdapter = ({
//     input: { name, onChange, value, ...restInput },
//     meta,
//     ...rest
// }) => (
//     <DatePicker
//         {...rest}
//         name={name}
//         helperText={meta.touched ? meta.error : undefined}
//         error={meta.error && meta.touched}
//         inputProps={restInput}
//         onChange={onChange}
//         value={value}
//     />
// );

function withAdapter(WrappedComponent) {
    class WithAdapter extends React.Component {
        render() {
            const { input, meta, type, helperText, ...rest } = this.props;

            const { submitError, error, touched, dirtySinceLastSubmit } = meta;

            const e1 =
                submitError && touched && !dirtySinceLastSubmit
                    ? submitError.toString()
                    : "";
            const e2 = touched ? error : "";

            const errorTxt = e1 || e2;
            const hasError = !!errorTxt;

            return (
                <WrappedComponent
                    {...input}
                    {...rest}
                    helperText={hasError ? errorTxt : helperText}
                    error={hasError}
                />
            );
        }
    }

    WithAdapter.displayName = `WithAdapter(${getDisplayName(
        WrappedComponent
    )})`;

    return WithAdapter;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAdapter;
