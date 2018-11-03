import React from 'react'
import { FormSpy } from 'react-final-form'
import { Button } from '@material-ui/core';

export default props => (
    <FormSpy subscription={{ submitting: true }}>
        {({ submitting, form }) => (
            <Button onClick={() => form.reset()} disabled={submitting} {...props} />
        )}
    </FormSpy>
)