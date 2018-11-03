import React from 'react'
import SelectAdapter from './SelectAdapter'
import { TextField } from '@material-ui/core'

class Select extends React.Component {
    render() {
        const {
            id,
            classes,
            options,
            loadOptions,
            children,
            name,
            value,
            label,
            fullWidth,
            isMulti,
            isDisabled,
            menuPosition,
            onChange,
            placeholder,
            InputLabelProps,
            InputProps,
            inputProps,
            ...other
        } = this.props

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
                    inputComponent: SelectAdapter,
                    inputProps: {
                        classes,
                        isMulti,
                        isDisabled,
                        menuPosition,
                        id,
                        options,
                        loadOptions,
                        children,
                        ...inputProps,
                    },
                    ...InputProps,
                }}
                {...other}
            />
        )
    }
}

Select.Option = SelectAdapter.Option

export default Select
