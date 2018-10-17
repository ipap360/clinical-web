import React from 'react';

import Login from '../Login';
import TopBar from '../TopBar';
import SideBar from '../SideBar';

import styles from './mainStyles';
import { withStyles } from '@material-ui/core';

class Main extends React.Component {

    render () {
        const { classes, children, isSignedIn, isSidebarOpen, toggleSidebar, header = null, sidebar = null, topbar = null } = this.props;

        if (!isSignedIn) return <Login />;
    
        return (
            <div className={classes.root + (sidebar && isSidebarOpen ? " sidebar-open" : "")}>
                <TopBar classes={classes} toggleSidebar={sidebar && toggleSidebar} content={header}>
                    {topbar}
                </TopBar>
                <SideBar className={classes.sidebar} variant="persistent" open={sidebar && isSidebarOpen} content={sidebar} />
                {children}
            </div>
        );
    }

}

export default withStyles(styles)(Main);