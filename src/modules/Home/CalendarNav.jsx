import React, { Component } from "react";
import { Typography, IconButton } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { TTypography, SimpleMenu, Link, NavButton } from "../../components";
import styles from "./styles";
import { consume } from "../../context";
import moment from "moment";
import { CALENDAR } from "../routes";

const ISO_FORMAT = "YYYY-MM-DD";
class CalendarTopBar extends Component {
    render() {
        const { classes, t, mode, date, title, history } = this.props;

        const { modeSwitch, periodTitle } = classes;

        const search = history.location.search;

        const modes = [
            {
                children: t("Week"),
                component: Link,
                to: {
                    pathname: CALENDAR.replace(":mode", "w").replace(
                        ":date",
                        date
                    ),
                    search
                }
            },
            {
                children: t("Day"),
                component: Link,
                to: {
                    pathname: CALENDAR.replace(":mode", "d").replace(
                        ":date",
                        date
                    ),
                    search
                }
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
                <NavButton
                    // variant="outlined"
                    color="inherit"
                    to={{ pathname: today, search }}
                >
                    {t("Today")}
                    {/* <TTypography color="inherit"></TTypography> */}
                </NavButton>
                <NavButton
                    Component={IconButton}
                    // variant="outlined"
                    // size="small"
                    color="inherit"
                    to={{ pathname: previous, search }}
                >
                    <KeyboardArrowLeft />
                    {/* <i
                        className="fas fa-chevron-left"
                        style={{ fontSize: 18 }}
                    /> */}
                </NavButton>
                <NavButton
                    Component={IconButton}
                    // size="small"
                    // variant="outlined"
                    color="inherit"
                    to={{ pathname: next, search }}
                >
                    <KeyboardArrowRight />
                    {/* <i
                        className="fas fa-chevron-right"
                        style={{ fontSize: 18 }}
                    /> */}
                </NavButton>
                <SimpleMenu
                    label={mode === "d" ? t("Day") : t("Week")}
                    labelProps={{
                        color: "inherit",
                        icon: "fas fa-caret-down",
                        iconPosition: "right"
                    }}
                    className={modeSwitch}
                    items={modes}
                />
                <Typography
                    className={periodTitle}
                    color="inherit"
                    variant="title"
                >
                    {title}
                </Typography>
            </React.Fragment>
        );
    }
}

export default consume({ store: false, styles, router: true })(CalendarTopBar);
