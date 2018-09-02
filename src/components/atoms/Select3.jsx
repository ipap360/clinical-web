import React from 'react';
import { Async as AsyncSelect, components } from 'react-select';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { TextField, MenuItem } from "@material-ui/core";

const ITEM_HEIGHT = 48;

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

// const ClearIndicator = (props) => {
//     const { children = <ClearIcon />, getStyles, innerProps: { ref, ...restInnerProps } } = props;
//     return (
//         <div {...restInnerProps} ref={ref} style={getStyles('clearIndicator', props)}>
//             <div style={{ padding: '0px 5px' }}>
//                 {children}
//             </div>
//         </div>
//     );
// };

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


// TODO!!!
// https://stackoverflow.com/questions/48564764/load-options-on-the-first-open-of-the-async-drop-down-menu
// https://codesandbox.io/s/o51yw14l59

class ReduxSelect extends React.Component {
    render() {
        const { name, loadOptions, onChange, onBlur, onFocus, value, isMulti, isDisabled, menuPosition='absolute', ...other } = this.props;
        // console.log(menuPosition);
        return (
            <AsyncSelect
                value={value ? JSON.parse(value) : ''}
                components={{
                    Option,
                    // ClearIndicator,
                    DropdownIndicator,
                }}
                name={name}
                isMulti={isMulti}
                menuPosition={menuPosition}
                styles={customStyles}
                isClearable={true}
                cacheOptions={false}
                defaultOptions={true}
                placeholder=""
                onChange={(data, meta) => {
                    if (data) {
                        onChange(JSON.stringify(data));
                    } else {
                        onChange(null);
                    }
                }}
                onBlur={() => onBlur()}
                onFocus={onFocus}
                isDisabled={isDisabled}
                menuPlacement="auto"
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

export default class Select3 extends React.Component {
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
            isDisabled,
            menuPosition,
            onChange,
            placeholder,
            InputLabelProps,
            InputProps,
            inputProps,
            ...other
        } = this.props;

        // console.log(this.props);

        return (
            <TextField
                fullWidth={fullWidth}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                label={label}
                disabled={isDisabled}
                InputLabelProps={InputLabelProps}
                InputProps={{
                    inputComponent: ReduxSelect,
                    inputProps: {
                        classes,
                        isMulti,
                        isDisabled,
                        menuPosition,
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