import React from 'react';
import { AppBar, Toolbar, Typography, SimpleMenu, IconButton, AccountCircle } from '../../../components';

export default ({ name, logout }) => {

    const items = [];

    return (
        <AppBar position="fixed">
            <Toolbar>
                {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                     <MenuIcon />
                </IconButton> */}
                <Typography variant="title" color="inherit" style={{ flex: '1 auto' }}>
                    Title
                </Typography>
                <SimpleMenu label={<AccountCircle />} items={items} Component={IconButton} />
            </Toolbar>
        </AppBar>
    );

}

