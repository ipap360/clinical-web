import React from 'react';
import IconedMessage from './IconedMessage';

export default ({ size = 'massive', ...props }) => (
    <IconedMessage size={size} icon='check circle outline' color='green' {...props} />
);
