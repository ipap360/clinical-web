import React, { Component } from "react";
import { Paper, Icon } from "@material-ui/core";
import { NavButton } from "../../components";

import Main from "../Main";
import { CALENDAR_EVENT } from "../routes";

import CalendarTopBar from "./CalendarTopBar";
// import CalendarHeader from "./CalendarHeader";
import CalendarEventBar from "./CalendarEventBar";

import { withStyles } from "@material-ui/core";
// import moment from "moment";
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
        const { dates, events } = this.props;
        const changedEvents =
            JSON.stringify(events) !== JSON.stringify(nextProps.events);
        const changedDates =
            JSON.stringify(dates) !== JSON.stringify(nextProps.dates);
        return changedDates || changedEvents;
    }

    componentDidUpdate(prevProps) {
        const { dates } = this.props;
        if (dates[0].iso !== prevProps.dates[0].iso) {
            this.fetch();
        }
    }

    componentWillUnmount() {}

    render() {
        const {
            classes,
            dates,
            periodTitle,
            nextWeek,
            prevWeek,
            thisWeek,
            events,
            history
        } = this.props;

        return (
            <React.Fragment>
                <CalendarTopBar
                    classes={classes}
                    dates={dates}
                    periodTitle={periodTitle}
                    nextWeek={nextWeek}
                    prevWeek={prevWeek}
                    thisWeek={thisWeek}
                />
                <Main>
                    <Paper square className={classes.calendarContent}>
                        {events.map((e, i) => (
                            <CalendarEventBar
                                key={i}
                                data={e}
                                history={history}
                            />
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
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Home);
