import React, { Component } from "react";
import { Paper, Icon } from "@material-ui/core";
import { NavButton } from "../../components";

import Main from "../Main";
import { ROOT, CALENDAR_EVENT } from "../routes";

import CalendarTopBar from "./CalendarTopBar";
import CalendarEventBar from "./CalendarEventBar";

import styles from "./styles";
import moment from "moment";
import classNames from "classnames";

import {
    hasCalendarError,
    isCalendarLoading,
    fetchCalendarEvents,
    getCalendarEvents
} from "./store";

import { fetchRoomAvailability } from "../Rooms";

import { consume } from "../../context";

const getDatePeriod = (mode, date) => {
    const d0 = moment(date);
    if (mode === "d") return [d0];

    const d = d0.clone().startOf("week");
    let week = [];
    for (let i = 0; i < 7; i++) {
        week.push(d.clone().add(i, "d"));
    }
    return week;
};

const ISO_FORMAT = "YYYY-MM-DD";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    parseLocation = match => {
        const {
            params: { mode = "w", date }
        } = match;

        let m = moment(date);
        if (!m.isValid()) {
            m = moment();
        }

        return [mode, m.format(ISO_FORMAT)];
    };

    componentDidMount() {
        this.load();
    }

    load() {
        const {
            match,
            fetchCalendarEvents,
            fetchRoomAvailability
        } = this.props;
        const [mode, date] = this.parseLocation(match);
        const dates = getDatePeriod(mode, date);

        fetchCalendarEvents({
            from: dates[0].format(ISO_FORMAT),
            to: dates[dates.length - 1].format(ISO_FORMAT)
        });

        fetchRoomAvailability({
            from: moment()
                .startOf("week")
                .format(ISO_FORMAT),
            to: moment()
                .add(2, "M")
                .format(ISO_FORMAT)
        });
    }

    componentDidUpdate(prevProps) {
        const [mode, date] = this.parseLocation(this.props.match);
        const [prevMode, prevDate] = this.parseLocation(prevProps.match);
        if (mode !== prevMode || date !== prevDate) {
            this.load();
        }
    }

    render() {
        const { classes, getEvents, history, match } = this.props;

        const [mode, date] = this.parseLocation(match);
        const dates = getDatePeriod(mode, date);
        return (
            <React.Fragment>
                <CalendarTopBar
                    classes={classes}
                    dates={dates}
                    date={date}
                    mode={mode}
                />
                <Main>
                    <Paper
                        square
                        className={classNames(classes.calendarContent, {
                            [classes.calendarWeek]: mode === "w",
                            [classes.calendarDay]: mode === "d"
                        })}
                    >
                        {getEvents(dates).map((e, i) => (
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

const s2p = state => ({
    error: hasCalendarError(state),
    loading: isCalendarLoading(state),
    getEvents: getCalendarEvents(state)
});

const d2p = {
    fetchCalendarEvents,
    fetchRoomAvailability
};

const store = { s2p, d2p };
export default consume({ store, styles, router: true })(Home);
