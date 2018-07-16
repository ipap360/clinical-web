import React from 'react';
import { AppBar, Toolbar, Typography, SimpleMenu, IconButton, AccountCircle, MenuIcon, Paper, Link } from '../../../components';
import { PROFILE } from '../paths';

export default ({ classes, theme, name, logout, toggleSidebar, title = "Calendar", content }) => {

    const items = [
        {
            children: "Profile",
            component: Link,
            to: PROFILE,
            divider: true
        },
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
                <IconButton className={sideIcon} onClick={toggleSidebar} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography className={titleCss} variant="title" color="inherit" style={{ width: '260px' }}>
                    {title}
                </Typography>
                <Toolbar style={{ flex: '1 auto' }} disableGutters>
                    {/* {search input} */}
                </Toolbar>
                <SimpleMenu
                    label={<AccountCircle className={menuTrigger} />}
                    className={menuCss}
                    items={items}
                    Component={IconButton}
                    style={{minWidth: 180}}
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

