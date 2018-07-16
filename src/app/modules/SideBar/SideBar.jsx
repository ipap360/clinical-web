import React from 'react';
import { Drawer, Toolbar } from '../../../components';

export default ({ className, content, variant, open, ...props }) => {
    return (
        <Drawer className={className} variant={variant} open={open}>
            <Toolbar></Toolbar>
            <Toolbar></Toolbar>
            {content}
        </Drawer>
    );
}