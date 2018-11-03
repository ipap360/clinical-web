import React from 'react'
import Select from 'react-select'
import DropdownIndicator from './DropdownIndicator'
import Option from './Option'
import customStyles from './Styles'

class SelectAdapter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: [],
        }
    }

    // componentDidMount(...args) {
    //     const { loadOptions } = this.props;
    //     console.log(this.props, args);
    // }

    handleChange(value, meta) {
        const { onChange } = this.props
        if (Array.isArray(value)) {
            onChange.apply(this, [value.map(o => o.value)])
        } else {
            onChange.apply(this, [value && value.value])
        }
    }

    handleInputChange(value, meta) {
        // console.log(value, meta);
    }

    handleMenuOpen(value, meta) {
        // console.log(value, meta, this.props);
    }

    handleMenuClose(value, meta) {
        // console.log(value, meta);
    }

    getChildOptions() {
        const { children } = this.props
        return (
            React.Children.map(children, child => {
                const { value, children } = child.props
                return {
                    value,
                    label: children,
                }
            }) || []
        )
    }

    getOptions() {
        const { options = [] } = this.props
        return [...options, ...this.getChildOptions(), ...this.state.options]
    }

    getValue() {
        const { value } = this.props
        return this.getOptions().filter(v => {
            if (Array.isArray(value)) {
                return value.indexOf(v.value) >= 0
            } else {
                return v.value === value
            }
        })
    }

    render() {
        const {
            name,
            // children,
            // options = [],
            onBlur,
            onFocus,
            // value,
            isMulti,
            isDisabled,
            menuPosition = 'absolute',
            // ...other
        } = this.props

        return (
            <Select
                value={this.getValue()}
                components={{
                    Option,
                    DropdownIndicator,
                }}
                name={name}
                isMulti={isMulti}
                menuPosition={menuPosition}
                styles={customStyles}
                isClearable={true}
                cacheOptions={false}
                defaultOptions={true}
                options={this.getOptions()}
                placeholder=""
                onChange={this.handleChange.bind(this)}
                onMenuOpen={this.handleMenuOpen.bind(this)}
                onMenuClose={this.handleMenuClose.bind(this)}
                onInputChange={this.handleInputChange.bind(this)}
                onBlur={() => onBlur()}
                onFocus={onFocus}
                isDisabled={isDisabled}
                menuPlacement="auto"
            />
        )
    }
}

SelectAdapter.Option = () => null

// TODO!!!
// https://stackoverflow.com/questions/48564764/load-options-on-the-first-open-of-the-async-drop-down-menu
// https://codesandbox.io/s/o51yw14l59

// https://stackoverflow.com/questions/43072867/use-async-react-select-with-redux-saga
// https://codesandbox.io/s/7k82j5j1qx
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/demos/autocomplete/IntegrationReactSelect.js
// https://deploy-preview-2289--react-select.netlify.com/props#api
// https://stackoverflow.com/questions/50640858/react-select-does-not-clear-value-when-redux-form-is-reset

export default SelectAdapter
