import React from 'react'
import { FormControlLabel, Radio } from '@material-ui/core'

export default ({ value, label, ...props }) => {
    return (
        <FormControlLabel
            value={value}
            control={<Radio color="primary" />}
            label={label}
            {...props}
        />
    )
}
