import React from 'react';
import { Field } from 'redux-form';
import createComponent from 'redux-form-material-ui/lib/createComponent';
import mapError from 'redux-form-material-ui/lib/mapError';
import { Async as AsyncSelect, components } from 'react-select';
import { withStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ClearIcon from "@material-ui/icons/Clear";
import Chip from "@material-ui/core/Chip";
import { TextField, MenuItem, FormControl, FormHelperText, InputLabel } from "@material-ui/core";

const ITEM_HEIGHT = 48;
const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250
    },
    chip: {
        margin: theme.spacing.unit / 4
    }
});

class Option extends React.Component {
    handleClick = event => {
        this.props.selectOption(this.props.data, event);
    };
    render() {
        const { children, isFocused, isSelected, onFocus } = this.props;
        return (
            <MenuItem
                onFocus={onFocus}
                selected={isFocused}
                onClick={this.handleClick}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400
                }}
            >
                {children}
            </MenuItem>
        );
    }
}

const ClearIndicator = (props) => {
    const { children = <ClearIcon />, getStyles, innerProps: { ref, ...restInnerProps } } = props;
    return (
        <div {...restInnerProps} ref={ref} style={getStyles('clearIndicator', props)}>
            <div style={{ padding: '0px 5px' }}>
                {children}
            </div>
        </div>
    );
};

const DropdownIndicator = (props) => {
    const { menuIsOpen } = props.selectProps;
    return components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
            {menuIsOpen ? <ArrowDropUpIcon /> : < ArrowDropDownIcon />}
        </components.DropdownIndicator>
    );
};

const customStyles = {
    container: (base, state) => {
        return {
            ...base,
            width: "100%",
            minWidth: 192
        }
    },
    dropdownIndicator: (base, state) => {
        return {
            ...base,
            padding: 4
        }
    },
    valueContainer: (base, state) => {
        return {
            ...base,
            padding: "2px 0"
        }
    },
    control: () => ({
        display: "flex",
        alignItems: "center",
        border: 0,
        height: "auto",
        background: "transparent",
        "&:hover": {
            boxShadow: "none"
        }
    }),
    menu: () => ({
        backgroundColor: "white",
        boxShadow: "1px 2px 6px #888888", // should be changed as material-ui
        position: "absolute",
        left: 0,
        top: `calc(100% + 1px)`,
        width: "100%",
        zIndex: 2,
        maxHeight: ITEM_HEIGHT * 4.5
    }),
    menuList: () => ({
        maxHeight: ITEM_HEIGHT * 4.5,
        overflowY: "auto"
    }),
    clearIndicator: (base, state) => ({
        ...base,
        cursor: 'pointer',
        padding: 4
        // color: state.isFocused ? 'blue' : 'black',
    })
};

class ReduxSelect extends React.Component {
    render() {
        // console.log(this.props);
        const { name, loadOptions, onChange, onBlur, onFocus, ...other } = this.props;
        console.log(other);
        return (
            <AsyncSelect
                components={{
                    Option,
                    // ClearIndicator,
                    DropdownIndicator,
                }}
                name={name}
                styles={customStyles}
                isClearable={true}
                defaultOptions={true}
                placeholder=""
                onChange={(data, meta) => {
                    // console.log(data);
                    // console.log(meta);
                    // console.log(onChange);
                    if (data) {
                        onChange(JSON.stringify(data));
                    } else {
                        onChange(null);
                    }                    
                }}
                onBlur={() => onBlur()}
                onFocus={onFocus}
                loadOptions={
                    (value) => new Promise((resolve, reject) => {
                        loadOptions(value, { resolve, reject });
                    })
                }
                // {...other}
            />
        )
    }
}

class MUISelect extends React.Component {
    render() {
        const {
            id,
            classes,
            loadOptions,
            name,
            label,
            fullWidth,
            value,
            isMulti,
            onChange,
            placeholder,
            InputLabelProps,
            InputProps,
            inputProps,
            ...other
        } = this.props;

        console.log(this.props);

        return (
            <TextField
                fullWidth={fullWidth}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                label={label}
                InputLabelProps={InputLabelProps}
                InputProps={{
                    inputComponent: ReduxSelect,
                    inputProps: {
                        classes,
                        isMulti,
                        // instanceId: 'react-select-chip-label',
                        id,
                        // simpleValue: true,
                        loadOptions,
                        ...inputProps
                    },
                    ...InputProps
                }}
                {...other}
            />
        )
    }
}

// export default MUISelect;

const SelectField = createComponent(MUISelect, ({
    defaultValue,
    ...props
}) => ({
    ...mapError(props)
}));

// export default SelectField;

export default ({ name, ...props }) => {
    console.log(props);
    return (
        <Field name={name} component={SelectField} {...props} />
    )
};

// function MUISelect(props) {
//     const {
//         loadOptions,
//         autoComplete,
//         autoFocus,
//         children,
//         className,
//         defaultValue,
//         disabled,
//         error,
//         FormHelperTextProps,
//         fullWidth,
//         helperText,
//         id,
//         InputLabelProps,
//         selectProps,
//         InputProps,
//         inputRef,
//         label,
//         multiline,
//         name,
//         onBlur,
//         onChange,
//         onFocus,
//         placeholder,
//         required,
//         value,
//         ...other
//     } = props;

//     const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
//     const InputElement = (
//         <Input
//             autoComplete={autoComplete}
//             autoFocus={autoFocus}
//             defaultValue={defaultValue}
//             disabled={disabled}
//             fullWidth={fullWidth}
//             inputComponent={ReduxSelect}
//             name={name}
//             value={value}
//             id={id}
//             onBlur={onBlur}
//             onChange={onChange}
//             onFocus={onFocus}
//             placeholder={placeholder}
//             inputProps={{
//                 loadOptions,
//                 ...selectProps
//             }}
//             {...InputProps}
//         />
//     );

//     return (
//         <FormControl
//             aria-describedby={helperTextId}
//             className={className}
//             error={error}
//             fullWidth={fullWidth}
//             required={required}
//             {...other}
//         >
//             {label && (
//                 <InputLabel htmlFor={id} {...InputLabelProps}>
//                     {label}
//                 </InputLabel>
//             )}
//             {InputElement}
//             {helperText && (
//                 <FormHelperText id={helperTextId} {...FormHelperTextProps}>
//                     {helperText}
//                 </FormHelperText>
//             )}
//         </FormControl>
//     );
// }


// const SelectField = createComponent(MUISelect, ({
//     defaultValue,
//     ...props
// }) => ({
//     ...mapError(props)
// }));

// export default SelectField;

// export default ({ name, ...props }) => (
//     <Field name={name} component={SelectField} {...props} />
// );


// https://stackoverflow.com/questions/43072867/use-async-react-select-with-redux-saga
// https://codesandbox.io/s/7k82j5j1qx
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/demos/autocomplete/IntegrationReactSelect.js
// https://deploy-preview-2289--react-select.netlify.com/props#api
// https://stackoverflow.com/questions/50640858/react-select-does-not-clear-value-when-redux-form-is-reset