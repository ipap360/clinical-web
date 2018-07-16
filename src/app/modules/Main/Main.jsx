import React from 'react';

import { PageWrapper, MainWrapper } from '../../../components';

import Login from '../Login';
import TopBar from '../TopBar';
import SideBar from '../SideBar';

import styles from './mainStyles';
import { withStyles } from '@material-ui/core';

export default withStyles(styles)((props) => {

    const { classes, children, isSignedIn, isSidebarOpen, toggleSidebar, header = null, sidebar = null } = props;

    if (!isSignedIn) return <Login />;

    return (
        <div className={classes.root + (isSidebarOpen ? " " + " sidebar-open" : "")}>
            <TopBar classes={classes} toggleSidebar={sidebar && toggleSidebar} content={header} />
            <SideBar className={classes.sidebar} variant="persistent" open={sidebar && isSidebarOpen} content={sidebar} />
            {children}
        </div>
    );
});