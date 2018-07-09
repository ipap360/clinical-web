import React from 'react';
import { CircularProgress, Typography } from '../atoms';

export default ({ size, color, ...props }) => (
    <React.Fragment>
        <CircularProgress color={color} size={size} />
        <br />
        <Typography color={color} {...props} />
    </React.Fragment>
);

