import React from 'react'
import { Field } from 'react-final-form'
import withAdapter from './adapter'
import { TextField } from '@material-ui/core'

const TextFieldAdapter = withAdapter(TextField)

export default ({ name, ...props }) => (
    <Field name={name} component={TextFieldAdapter} {...props} />
)
