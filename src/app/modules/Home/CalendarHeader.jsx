import React from 'react';
import { AppBar, Toolbar, Typography, SimpleMenu, IconButton, AccountCircle, MenuIcon, Paper, Link } from '../../../components';
import CalendarDayTitle from './CalendarDayTitle';
import { withStyles } from '@material-ui/core';
// import moment from 'moment';

const styles = (theme) => ({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        background: 'transparent'
    }
});

export default withStyles(styles)(({ classes, dates }) => (
    <Paper className={classes.root} square>
        <Toolbar disableGutters>
            {
                dates.map((d, i) => {
                    return (
                        <CalendarDayTitle
                            key={i}
                            text={d.short}
                            number={d.num}
                            availability={d.availability}
                        />
                    );
                })
            }
        </Toolbar>
    </Paper>
));