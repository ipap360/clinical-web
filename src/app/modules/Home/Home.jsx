import React, { Component } from 'react';

import { Paper, NavButton, SmallCalendar, AddIcon } from '../../../components';

import Main from '../Main';
import { NEW_CALENDAR_EVENT } from '../paths';

import CalendarHeader from './CalendarHeader';

import { withStyles, Icon } from '@material-ui/core';

const styles = theme => ({
    calendarContent: {
        position: 'relative',
        marginTop: 64,
        // height: '100%',
        flex: '1 auto',
        width: '100%',
        // display: 'flex',
        // flexDirection: 'row'
    },
    addBtn: {
        position: 'absolute',
        bottom: theme.spacing.unit * 4.5,
        right: theme.spacing.unit * 4.5,
    }
});

class Home extends Component {

    dayClick = () => {
        console.log(this)
    }

    render() {

        const { classes, dates } = this.props;

        const header = (<CalendarHeader dates={dates} />);
        const sidebar = (<SmallCalendar value={new Date()} onChange={() => { }} />);

        const events = [
            {
                name: "Β. Παπαδημητρίου",
                description: "CA Προστάτη",
                date: "2018-07-18",
                duration: 1
            }
        ]

        return (
            <Main header={header} sidebar={sidebar}>
                <Paper square className={classes.calendarContent}>
                    {
                        // dates.map(d => {
                        //     return (
                        //         <CalendarDayContent />
                        //     );
                        // })
                    }
                </Paper>
                <NavButton variant="fab" className={classes.addBtn} color='secondary' to={NEW_CALENDAR_EVENT}>
                    <Icon>add</Icon>
                </NavButton>
            </Main>
        );
    }
}


export default withStyles(styles)(Home);