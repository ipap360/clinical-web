import React from 'react';
import Main from '../Main';
import { withStyles, Divider } from '@material-ui/core';
import { Typography, Toolbar, Paper, Icon, Button, HorizontalLinearSteps } from '../../../components';
import CalendarEventForm from '../CalendarEventForm';

const style = theme => ({
    root: {

    },
    paper: {
        flex: '1 auto',
        width: '100%',
        padding: theme.spacing.unit * 2
    },
    header: {
        flex: '1 auto',
        position: 'relative',
        backgroundColor: '#e4eb30',
        // color: theme.palette.getContrastText('#e4eb30'),
        padding: theme.spacing.unit * 2
    },
})

class NewCalendarEvent extends React.Component {

    render() {

        const {
            classes,
            t,
        } = this.props;

        const title = "" || t("New Calendar Event");

        const header = (
            <Toolbar className={classes.header} disableGutters>
                <Typography variant='headline'>{{ title }}</Typography>
            </Toolbar>
        );

        return (
            <Main header={header}>
                <Paper square className={classes.paper}>
                    <CalendarEventForm form="newCalendarEvent"/>
                </Paper>
            </Main>
        );
    }

}

export default withStyles(style)(NewCalendarEvent);