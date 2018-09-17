import React from 'react';
import { AppBar, Toolbar, Typography, SimpleMenu, IconButton, AccountCircle, HomeIcon, MenuIcon, Paper, Link } from '../../../components';
import { PROFILE, ROOT } from '../paths';
import NavButton from '../../../components/atoms/NavButton';

export default ({ classes, theme, name, logout, toggleSidebar, title = "Calendar", content, history, location, children, ...other }) => {


    const items = [
        // {
        //     children: "Profile",
        //     component: Link,
        //     to: PROFILE,
        //     divider: true
        // },
        {
            children: "Logout",
            onClick: logout
        }
    ];

    const { appBar, toolbar2, sideIcon, menuTrigger, titleCss, menuCss } = classes;

    // elevation={0}
    return (
        <AppBar className={appBar} position="fixed" >
            <Toolbar disableGutters>
                <IconButton className={sideIcon} color="inherit" onClick={() => history.push(ROOT)}>
                    <HomeIcon />
                </IconButton>
                {/* <IconButton className={sideIcon} onClick={toggleSidebar} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton> */}
                <Typography className={titleCss} variant="title" color="inherit" style={{ marginRight: 24 }}>
                    {title}
                </Typography>
                <Toolbar style={{ flex: '1 auto' }} disableGutters>
                    {children}
                </Toolbar>
                <SimpleMenu
                    label={<AccountCircle className={menuTrigger} />}
                    className={menuCss}
                    items={items}
                    Component={IconButton}
                    style={{ minWidth: 180 }}
                />
            </Toolbar>
            <Toolbar disableGutters className={toolbar2}>
                {/* <Toolbar style={{ flex: '1 auto', position: 'relative' }} disableGutters> */}
                {content}
                {/* </Toolbar> */}
            </Toolbar>
        </AppBar >
    );
}

