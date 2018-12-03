import React, { Component } from "react";
import Media from "react-media";
import { Paper } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { NavButton } from "../../components";

import Main from "../Main";
import { CALENDAR_EVENT } from "../routes";

import PrintCalendar from "./PrintCalendar";
import CalendarHead from "./CalendarHead";
import CalendarNav from "./CalendarNav";
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

const getDatePeriodTitle = dates => {
    if (dates.length === 1) return dates[0].format("MMMM YYYY");

    let m1 = dates[0].format("MMM");
    let m2 = dates[6].format("MMM");

    const y1 = dates[0].format("YYYY");
    const y2 = dates[6].format("YYYY");

    m1 = y1 !== y2 ? m1 + " " + y1 : m1;
    m2 = m1 !== m2 ? " - " + m2 : "";
    m2 = y1 !== y2 ? m2 + " " + y2 : m2 + " " + y1;

    return m1 + m2;
};

const ISO_FORMAT = "YYYY-MM-DD";

class Home extends Component {
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
        const events = getEvents(dates);
        const title = getDatePeriodTitle(dates);

        return (
            <Media query="only print">
                {matches =>
                    !matches ? (
                        <React.Fragment>
                            <Main
                                title="Calendar"
                                nav={
                                    <CalendarNav
                                        title={title}
                                        date={date}
                                        mode={mode}
                                    />
                                }
                                head={<CalendarHead dates={dates} />}
                            >
                                <Paper
                                    square
                                    className={classNames(
                                        classes.calendarContent,
                                        classes.calendar,
                                        {
                                            [classes.calendarWeek]:
                                                mode === "w",
                                            [classes.calendarDay]: mode === "d"
                                        }
                                    )}
                                >
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
                                    <AddIcon />
                                </NavButton>
                            </Main>
                        </React.Fragment>
                    ) : (
                        <PrintCalendar
                            mode={mode}
                            dates={dates}
                            events={events}
                            title={title}
                        />
                    )
                }
            </Media>
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
