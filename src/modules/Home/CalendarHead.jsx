import React, { Component } from "react";
import { Paper, Toolbar } from "@material-ui/core";

import CalendarDayTitle from "./CalendarDayTitle";
import styles from "./styles";
import { consume } from "../../context";
import { CALENDAR_EVENT } from "../routes";
import { getAvailability } from "../Rooms";

const ISO_FORMAT = "YYYY-MM-DD";
class CalendarHead extends Component {
    render() {
        const { classes, dates, availability } = this.props;
        return (
            <Paper className={classes.topbarBody} square>
                <Toolbar disableGutters>
                    {dates.map((d, i) => {
                        const iso = d.format(ISO_FORMAT);
                        const newURL = {
                            pathname: CALENDAR_EVENT.replace(":id", 0),
                            state: {
                                date: iso
                            }
                        };
                        const dailyAvailability = availability[iso];
                        return (
                            <CalendarDayTitle
                                key={"calendar-day-" + i}
                                d={d}
                                newURL={newURL}
                                availability={dailyAvailability}
                            />
                        );
                    })}
                </Toolbar>
            </Paper>
        );
    }
}

const s2p = state => ({
    availability: getAvailability(state)
});

export default consume({ store: { s2p }, styles, router: true })(CalendarHead);
