import React from 'react';
import { FormHelperText } from '.';
import connect from './connect';

export default connect(({ submit, reset, form, submitting, error, ...props }) => (
    <FormHelperText error={true} {...props}>
        {!submitting && error}
    </FormHelperText>
));