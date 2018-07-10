import React from 'react';
import { Button } from '../atoms';
import connect from './connect';

export default connect(({ submit, form, submitting, reset, error, ...props }) => (
    <Button onClick={reset(form)} disabled={submitting} {...props} />
));