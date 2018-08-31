import React, { Component } from 'react';

import { Paper, NavButton, SmallCalendar, AddIcon } from '../../../components';

import Main from '../Main';
import { NEW_CALENDAR_EVENT } from '../paths';

import CalendarHeader from './CalendarHeader';
import CalendarEventBar from './CalendarEventBar';

import { withStyles, Icon } from '@material-ui/core';
import moment from 'moment';

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

    constructor(props) {
        super(props);
        // console.log(this.props);
        this.props.fetchCalendarEvents();
    }

    dayClick = () => {
        console.log(this)
    }

    render() {

        const { classes, dates, selected, events } = this.props;

        const header = (<CalendarHeader dates={dates} />);
        const sidebar = (<SmallCalendar value={selected} onChange={() => { }} />);

        // const events = [
        //     {
        //         name: "Β. Παπαδημητρίου",
        //         description: "CA Προστάτη",
        //         date: "2018-07-18",
        //         duration: 1
        //     }
        // ]

        const isodates = dates.map(d => moment.utc(d.value).format("YYYY-MM-DD"));
        // console.log(isodates);

        const eventsUI = events.map(e => ({
            ...e,
            left: isodates.indexOf(e.date) * 100 / 7,
            width: e.duration * 100 / 7
        }));
        console.log(eventsUI);

        return (
            <Main header={header} sidebar={sidebar}>
                <Paper square className={classes.calendarContent}>
                    {eventsUI.map((e, i) => <CalendarEventBar key={i} data={e} />)}
                </Paper>
                <NavButton variant="fab" className={classes.addBtn} color='secondary' to={NEW_CALENDAR_EVENT}>
                    <Icon>add</Icon>
                </NavButton>
            </Main>
        );
    }
}


export default withStyles(styles)(Home);