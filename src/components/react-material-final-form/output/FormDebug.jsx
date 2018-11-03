import React from 'react'
import { FormSpy } from 'react-final-form'

export default props => (
    <FormSpy>
        {(props) => (
            <pre>{JSON.stringify(props, 0, 4)}</pre>
        )}
    </FormSpy>
)
