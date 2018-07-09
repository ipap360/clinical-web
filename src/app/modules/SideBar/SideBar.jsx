import React from 'react';
import { Drawer, List, Divider } from '../../../components';

export default () => (
    <Drawer variant="permanent">
        {/* <div className={classes.toolbar} /> */}
        <List>{}</List>
        <Divider />
        <List>{}</List>
    </Drawer>
);