import React from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';

export default ({ value, label, ...props }) => (
    <FormControlLabel value={value} control={<Radio color="primary" />} label={label} {...props} />
);