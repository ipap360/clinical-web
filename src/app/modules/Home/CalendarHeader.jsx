import React from 'react';
import { AppBar, Toolbar, Typography, SimpleMenu, IconButton, AccountCircle, MenuIcon, Paper, Link } from '../../../components';
import CalendarDayTitle from './CalendarDayTitle';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
    root: { 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        background: 'transparent' 
    }
});

export default withStyles(styles)(({classes, dates}) => (
    <Paper className={classes.root} square>
        <Toolbar disableGutters>
            {
                dates.map(d => {
                    return (
                        <CalendarDayTitle text={d.text} number={d.number} />
                    );
                })
            }
        </Toolbar>
    </Paper>
));