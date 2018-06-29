import React from 'react';
import { TextArea, Message } from 'semantic-ui-react';
import { Field } from 'redux-form';

const InnerArea = ({ input, meta: { touched, error }, ...custom }) => {
    const hasError = touched && !!error;
    return (
        <div>
            {hasError && <Message error content={error} visible={!!error} />}
            <TextArea
                {...input}
                {...custom} />
        </div>
    );
}

export default ({...custom}) => (<Field component={InnerArea} {...custom} />);