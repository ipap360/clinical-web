import React from 'react';
import { Toolbar, Paper } from '../../../components';
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

export default withStyles(styles)(({ classes, dates, history }) => (
    <Paper className={classes.root} square>
        <Toolbar disableGutters>
            {
                dates.map((d, i) => {
                    return (
                        <CalendarDayTitle
                            key={i}
                            history={history}
                            d={d}
                        />
                    );
                })
            }
        </Toolbar>
    </Paper>
));