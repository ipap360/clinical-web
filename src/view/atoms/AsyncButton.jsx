import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';

const sizeMap = {
    'small': 10,
    'medium': 14,
    'large': 18
}

export default ({ loading, children, size, ...props }) => (
    <Button size={size}>
        {loading ? <CircularProgress size={sizeMap[size]} /> : { children }}
    </Button>
);