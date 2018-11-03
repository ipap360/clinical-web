import React from 'react'
import { Field } from 'react-final-form'
import { Select } from '../atoms'
import withAdapter from './adapter'

const SelectAdapter = withAdapter(Select)

class FormSelect extends React.Component {
    render() {
        const { name, ...props } = this.props
        return <Field name={name} component={SelectAdapter} {...props} />
    }
}

FormSelect.Option = Select.Option

export default FormSelect
