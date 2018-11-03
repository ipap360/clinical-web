import React, { Component } from "react";
import { Paper, Icon, IconButton, Button } from "@material-ui/core";
import { NavButton, TTypography } from "../../components";

import Main from "../Main";
import { CALENDAR_EVENT } from "../routes";

import CalendarHeader from "./CalendarHeader";
import CalendarEventBar from "./CalendarEventBar";

import { withStyles } from "@material-ui/core";
import moment from "moment";
import styles from "./styles";

class Home extends Component {
    componentDidMount() {
        this.fetch();
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

    shouldComponentUpdate(nextProps, nextState) {
        const { dates, events, isLoggedIn } = this.props;
        const changedEvents =
            JSON.stringify(events) !== JSON.stringify(nextProps.events);
        const changedDates =
            JSON.stringify(dates) !== JSON.stringify(nextProps.dates);
        return (
            changedDates || changedEvents || nextProps.isLoggedIn !== isLoggedIn
        );
    }

    componentDidUpdate(prevProps) {
        const { dates, isLoggedIn } = this.props;
        if (
            dates[0].iso !== prevProps.dates[0].iso ||
            isLoggedIn !== prevProps.isLoggedIn
        ) {
            this.fetch();
        }
    }

    componentWillUnmount() {}

    render() {
        const {
            classes,
            dates,
            datePeriod,
            selected,
            events,
            history,
            setSelectedDate
        } = this.props;

        const header = <CalendarHeader dates={dates} history={history} />;

        const topbar = (
            <div className={classes.topbar}>
                <IconButton
                    variant="outlined"
                    color="inherit"
                    onClick={() =>
                        setSelectedDate(selected.clone().subtract(1, "w"))
                    }
                >
                    <Icon fontSize="inherit">arrow_left</Icon>
                </IconButton>
                <TTypography color="inherit" variant="title">
                    {datePeriod}
                </TTypography>
                <IconButton
                    variant="outlined"
                    color="inherit"
                    onClick={() =>
                        setSelectedDate(selected.clone().add(1, "w"))
                    }
                >
                    <Icon fontSize="inherit">arrow_right</Icon>
                </IconButton>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => setSelectedDate(moment())}
                >
                    <TTypography color="inherit">Today</TTypography>
                </Button>
            </div>
        );

        // sidebar={sidebar}
        return (
            <Main header={header} topbar={topbar}>
                <Paper square className={classes.calendarContent}>
                    {events.map((e, i) => (
                        <CalendarEventBar key={i} data={e} history={history} />
                    ))}
                </Paper>
                <NavButton
                    variant="fab"
                    className={classes.addBtn}
                    color="secondary"
                    to={CALENDAR_EVENT.replace(":id", "0")}
                >
                    <Icon>add</Icon>
                </NavButton>
            </Main>
        );
    }
}

export default withStyles(styles)(Home);
