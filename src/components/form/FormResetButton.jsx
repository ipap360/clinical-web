import React from 'react';
import { Button } from '../atoms';
import connect from './connect';

export default connect(({ submit, form, submitting, reset, error, ...props }) => {
    const resetForm = reset(form);
    return (
        <Button onClick={resetForm} disabled={submitting} {...props} />
    );
});