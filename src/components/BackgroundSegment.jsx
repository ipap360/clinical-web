import React from 'react';
import { Segment } from 'semantic-ui-react';
import './component.styles.css';

const BackgroundSegment = ({url, ...custom}) => (
    <Segment 
        style={(url) ? {
            backgroundImage: `url(${url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            margin: 0
        } : {}}
        {...custom}
        />
);

export default BackgroundSegment;