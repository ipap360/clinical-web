import React, { Component } from "react";

import {
    Paper,
    NavButton,
    // SmallCalendar,
    Icon,
    IconButton,
    Typography,
    Button
} from "../../../components";

import Main from "../Main";
import { NEW_CALENDAR_EVENT } from "../paths";

import CalendarHeader from "./CalendarHeader";
import CalendarEventBar from "./CalendarEventBar";

import { withStyles } from "@material-ui/core";
import moment from "moment";

const styles = theme => ({
    calendarContent: {
        position: "relative",
        marginTop: 64,
        // height: '100%',
        flex: "1 auto",
        width: "100%",
        paddingTop: theme.spacing.unit,
        display: "grid",
        // 14.2857% 1fr
        gridTemplateColumns: "repeat(7, calc(14.2857% - 4px) [column])",
        gridAutoRows: "30px",
        gridColumnGap: `${theme.spacing.unit / 2}px`,
        gridRowGap: `${theme.spacing.unit / 2}px`,
        gridAutoFlow: "dense"
        // display: 'flex',
        // flexDirection: 'row'
    },
    addBtn: {
        position: "fixed",
        bottom: theme.spacing.unit * 4.5,
        right: theme.spacing.unit * 4.5
    },
    topbar: {
        display: "flex",
        alignItems: "center",
        color: theme.palette.getContrastText(theme.palette.primary.main),
        "& > p": {
            textAlign: "center",
            width: 120
        },
        "& > button": {
            fontSize: 36
        },
        "& > *": {
            marginRight: 5
        }
    }
});

class Home extends Component {
    componentWillMount() {
        // console.log("componentWillMount");
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
        // console.log("componentDidUpdate");
        const { dates, isLoggedIn } = this.props;
        if (
            dates[0].iso !== prevProps.dates[0].iso ||
            isLoggedIn !== prevProps.isLoggedIn
        ) {
            this.fetch();
        }
    }

    componentWillUnmount() {
        // console.log("componentWillUnmount")
    }

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
        // const sidebar = (<SmallCalendar value={selected} onChange={(d) => { setSelectedDate(d) }} />);

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
                <Typography color="inherit" variant="title">
                    {datePeriod}
                </Typography>
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
                    <Typography color="inherit">Today</Typography>
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
                    to={NEW_CALENDAR_EVENT}
                >
                    <Icon>add</Icon>
                </NavButton>
            </Main>
        );
    }
}

export default withStyles(styles)(Home);
