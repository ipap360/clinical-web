import React from 'react';
import { FormHelperText } from '.';
import connect from './connect';

export default connect(({ submit, form, submitting, reset, error, ...props }) => (
    <FormHelperText error={true} {...props}>
        {!submitting && error}
    </FormHelperText>
));