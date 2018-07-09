import React from 'react';
import { Button } from '../atoms';
import connect from './connect';

export default connect(({ submit, form, submitting, ...props }) => (
    <Button onClick={submit(form)} disabled={submitting} {...props} />
));