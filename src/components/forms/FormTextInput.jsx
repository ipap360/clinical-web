import React from 'react';
import { Input, Message } from 'semantic-ui-react';

const FormTextInput = ({ input, meta: { touched, error }, ...custom }) => {
    const hasError = touched && error != undefined;
    return (
        <div>
            {hasError && <Message error content={error} visible={error != undefined} />}
            <Input
                type='text'
                error={hasError}
                {...input}
                {...custom} />
        </div>
    );
}

export default FormTextInput;