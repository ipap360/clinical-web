import React, { Component } from "react";
import { Paper, Icon, Toolbar, Typography } from "@material-ui/core";
import { TTypography, SimpleMenu, Link, NavButton } from "../../components";
import TopBar from "../TopBar";
import CalendarDayTitle from "./CalendarDayTitle";
import styles from "./styles";
import { consume } from "../../context";
import moment from "moment";
import { CALENDAR, CALENDAR_EVENT } from "../routes";
import { getAvailability } from "../Rooms";

const ISO_FORMAT = "YYYY-MM-DD";
class CalendarTopBar extends Component {
    render() {
        const {
            classes,
            t,
            mode,
            date,
            dates,
            availability,
            title
        } = this.props;

        const { topbarBody, modeSwitch } = classes;

        const modes = [
            {
                children: t("Week"),
                component: Link,
                to: CALENDAR.replace(":mode", "w").replace(":date", date)
            },
            {
                children: t("Day"),
                component: Link,
                to: CALENDAR.replace(":mode", "d").replace(":date", date)
            }
        ];

        const previous = CALENDAR.replace(":mode", mode).replace(
            ":date",
            moment(date)
                .subtract(1, mode)
                .format(ISO_FORMAT)
        );
        const next = CALENDAR.replace(":mode", mode).replace(
            ":date",
            moment(date)
                .add(1, mode)
                .format(ISO_FORMAT)
        );
        const today = CALENDAR.replace(":mode", mode).replace(
            ":date",
            moment().format(ISO_FORMAT)
        );

        return (
            <TopBar
                title="Calendar"
                nav={
                    <React.Fragment>
                        <NavButton
                            variant="outlined"
                            color="inherit"
                            to={today}
                        >
                            <TTypography color="inherit">Today</TTypography>
                        </NavButton>
                        <NavButton
                            variant="outlined"
                            // size="small"
                            color="inherit"
                            to={previous}
                        >
                            <i
                                className="fas fa-chevron-left"
                                style={{ fontSize: 18 }}
                            />
                        </NavButton>
                        <NavButton
                            // size="small"
                            variant="outlined"
                            color="inherit"
                            to={next}
                        >
                            <i
                                className="fas fa-chevron-right"
                                style={{ fontSize: 18 }}
                            />
                        </NavButton>
                        <Typography color="inherit" variant="title">
                            {title}
                        </Typography>

                        <SimpleMenu
                            label={
                                <TTypography color="inherit">
                                    {mode === "d" ? "Day" : "Week"}
                                </TTypography>
                            }
                            labelProps={{
                                color: "inherit",
                                icon: "fas fa-caret-down",
                                iconPosition: "right"
                            }}
                            className={modeSwitch}
                            items={modes}
                        />
                    </React.Fragment>
                }
                body={
                    <Paper className={topbarBody} square>
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
                }
            />
        );
    }
}

const s2p = state => ({
    availability: getAvailability(state)
});

export default consume({ store: { s2p }, styles, router: true })(
    CalendarTopBar
);
