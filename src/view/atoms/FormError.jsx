import React from 'react';
import { FormHelperText } from '.';
import { connect2form } from '../../store';

export default connect2form(({ submit, reset, form, submitting, error, ...props }) => (
    <FormHelperText error={true} {...props}>
        {!submitting && error}
    </FormHelperText>
));