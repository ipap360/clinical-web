import React from 'react';
import { Input, Message } from 'semantic-ui-react';
import { Field } from 'redux-form';

const InnerInput = ({ input, meta: { touched, error }, ...custom }) => {
    const hasError = touched && !!error;
    return (
        <div>
            {hasError && <Message error content={error} visible={!!error} />}
            <Input
                type='text'
                error={hasError}
                {...input}
                {...custom} />
        </div>
    );
}

const FormTextInput = ({...custom}) => (<Field component={InnerInput} {...custom} />);

export default FormTextInput;