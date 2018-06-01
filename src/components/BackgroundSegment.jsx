import React from 'react';
import { Segment } from 'semantic-ui-react';
import './component.styles.css';

const BackgroundSegment = ({url, style, ...custom}) => (
    <Segment 
        style={(url) ? {
            backgroundImage: `url(${url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            margin: 0,
            ...style
        } : {...style}}
        {...custom}
        />
);

export default BackgroundSegment;