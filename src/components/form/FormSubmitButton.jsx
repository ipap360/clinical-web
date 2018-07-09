import React from 'react';
import { AsyncButton } from '../atoms';
import connect from './connect';

export default connect(({ submit, form, submitting, ...props }) => (
    <AsyncButton onClick={submit(form)} loading={submitting} disabled={submitting} {...props} />
));