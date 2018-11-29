import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { TTypography, SimpleMenu, Link, NavButton } from "../../components";
import styles from "./styles";
import { consume } from "../../context";
import moment from "moment";
import { CALENDAR } from "../routes";

const ISO_FORMAT = "YYYY-MM-DD";
class CalendarTopBar extends Component {
    render() {
        const { classes, t, mode, date, title } = this.props;

        const { modeSwitch } = classes;

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
            <React.Fragment>
                <NavButton variant="outlined" color="inherit" to={today}>
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
        );
    }
}

export default consume({ store: false, styles })(CalendarTopBar);
