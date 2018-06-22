import React from 'react';
import IconedMessage from './IconedMessage';

export default ({ size = 'massive', ...props }) => (
    <IconedMessage size={size} icon='frown outline' color='red' {...props} />
);