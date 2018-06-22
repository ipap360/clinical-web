import React from 'react';
import { Icon } from 'semantic-ui-react';
import { FlexColCenter } from '../elements';

export default ({ message, icon = 'circle notch', color = null, size = 'huge', loading = false, children, ...props }) => (
    <FlexColCenter style={{
        'padding': '15px',
    }} {...props}>
        <div><Icon name={icon} size={size} color={color} loading={loading} /></div>
        <h2>{message}</h2>
        {children}
    </FlexColCenter>
);
