import React from 'react'
import { AsyncButton } from '../atoms'
import { FormSpy } from 'react-final-form'

export default props => (
    <FormSpy subscription={{ submitting: true, pristine: true }}>
        {({ submitting }) => (
            <AsyncButton
                loading={submitting}
                disabled={submitting}
                variant="contained"
                color="primary"
                type="submit"
                {...props}
            />
        )}
    </FormSpy>
)
