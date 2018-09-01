import React, { Component } from 'react';

import { Paper, NavButton, SmallCalendar, AddIcon } from '../../../components';

import Main from '../Main';
import { NEW_CALENDAR_EVENT } from '../paths';

import CalendarHeader from './CalendarHeader';
import CalendarEvent from './CalendarEvent';

import { withStyles, Icon } from '@material-ui/core';


const styles = theme => ({
    calendarContent: {
        position: 'relative',
        marginTop: 64,
        // height: '100%',
        flex: '1 auto',
        width: '100%',
        paddingTop: theme.spacing.unit,
        display: 'grid',
        // 14.2857% 1fr
        gridTemplateColumns: 'repeat(7, calc(14.2857% - 4px) [column])',
        gridAutoRows: '30px',
        gridColumnGap: `${theme.spacing.unit / 2}px`,
        gridRowGap: `${theme.spacing.unit / 2}px`,
        gridAutoFlow: 'dense'
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

        this.fetch();

        console.log(this.props);

    }

    fetch() {
        const { dates } = this.props;

        this.props.fetchAvailability({
            from: dates[0].iso,
            to: dates[6].iso
        });

        this.props.fetchCalendarEvents({
            from: dates[0].iso,
            to: dates[6].iso
        });
    }

    dayClick() {
        console.log(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { dates, events } = this.props;
        const changedEvents = JSON.stringify(events) !== JSON.stringify(nextProps.events);
        const changedDates = JSON.stringify(dates) !== JSON.stringify(nextProps.dates);
        return changedDates || changedEvents;
    }

    componentDidUpdate(prevProps) {
        const { dates } = this.props;
        if (dates[0].iso !== prevProps.dates[0].iso) {
            this.fetch();
        }
    }

    render() {

        const { classes, dates, selected, events, setSelectedDate } = this.props;

        const header = (<CalendarHeader dates={dates} />);
        const sidebar = (<SmallCalendar value={selected} onChange={(d) => { setSelectedDate(d) }} />);

        const isodates = dates.map(d => d.iso);
        
        console.log(isodates);
        console.log(events);

        const eventsUI = events.filter(e => {

            const checkin = isodates.indexOf(e.scheduled_date);
            const checkout = isodates.indexOf(e.scheduled_out);
            return checkin >= 0 || checkout > 0;

        }).map(e => {

            const checkin = isodates.indexOf(e.scheduled_date);
            const checkout = isodates.indexOf(e.scheduled_out);
            
            return {
                ...e,
                start: checkin + 1,
                end: (checkin === -1) ? checkout + 1 : checkin + 1 + e.scheduled_duration
            };

        });

        console.log(eventsUI);

        return (
            <Main header={header} sidebar={sidebar}>
                <Paper square className={classes.calendarContent}>
                    {eventsUI.map((e, i) => <CalendarEvent key={i} data={e} />)}
                </Paper>
                <NavButton variant="fab" className={classes.addBtn} color='secondary' to={NEW_CALENDAR_EVENT}>
                    <Icon>add</Icon>
                </NavButton>
            </Main>
        );
    }
}


export default withStyles(styles)(Home);